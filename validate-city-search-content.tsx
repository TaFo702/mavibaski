import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { CityPage } from './src/components/CityPage';
import { TestWrapper } from './src/App';
import { CITIES_DATA } from './src/data/cityData';
import { CITY_SEARCH_CONTENT } from './src/data/citySearchContent';
import { getCitySearchMetadata } from './src/utils/citySearchMetadata';
import { getRouteSEO } from './src/utils/seoGenerator';
import { getCityPriceExamples } from './src/data/cityPriceExamples';
import { BrosurPage } from './src/components/Brosur';
import { MagnetPage } from './src/components/Magnet';
import { AfisPage } from './src/components/Afis';
import { OtoPaspasPage } from './src/components/OtoPaspas';
import { KitapAyraciPage } from './src/components/KitapAyraci';

const normalize = (value: string) => value.toLocaleLowerCase('tr').replace(/\s+/g, ' ').trim();
const keys = CITIES_DATA.map(city => city.slug).sort();
assert.deepEqual(Object.keys(CITY_SEARCH_CONTENT).sort(), keys, 'Every current city needs reviewed copy');
const normalizedDescriptions = new Set<string>();
const descriptions = new Set<string>();
const titles = new Set<string>();
const productSets = new Set<string>();
const pricePairs = new Set<string>();
let previousPrices: readonly string[] | undefined;
const productTables = new Map<string, string[]>();
const clientPricePages: Record<string, React.ComponentType> = {
  '/brosur': BrosurPage, '/magnet': MagnetPage, '/afis': AfisPage,
  '/oto-paspas': OtoPaspasPage, '/kitap-ayraci': KitapAyraciPage,
};
let evidenceCount = 0;
for (const city of CITIES_DATA) {
  const route = `/${city.slug}`, reviewed = CITY_SEARCH_CONTENT[city.slug];
  const examples = getCityPriceExamples(city.slug);
  assert.equal(examples.length, 3, `${route}: three economic price products`);
  assert.equal(examples[0].path, '/brosur', `${route}: brochure first`);
  assert.equal(new Set(examples.map(item => item.path)).size, 3, `${route}: distinct products`);
  const pricePair = examples.slice(1).map(item => item.path).sort().join('|');
  assert.ok(!pricePairs.has(pricePair), `${route}: repeated economic product pair`);
  pricePairs.add(pricePair);
  if (previousPrices) {
    assert.notEqual(examples[1].path, previousPrices[1], `${route}: second product must change`);
    assert.notEqual(examples[2].path, previousPrices[2], `${route}: third product must change`);
  }
  previousPrices = examples.map(item => item.path);
  const seo = getCitySearchMetadata(city), resolved = getRouteSEO(route);
  assert.deepEqual(seo, { title: reviewed.title, desc: reviewed.desc });
  assert.equal(resolved.title, seo.title); assert.equal(resolved.desc, seo.desc);
  assert.ok(seo.title.length <= 60, route);
  assert.ok(seo.desc.length >= 155 && seo.desc.length <= 160, `${route}: description length`);
  assert.ok(seo.title.includes(city.name) && seo.desc.includes(city.name), route);
  assert.equal(reviewed.products.length, 3, `${route}: three representative products`);
  const productSet = [...reviewed.products].sort().join('|');
  assert.ok(!productSets.has(productSet), `${route}: repeated product combination`);
  productSets.add(productSet);
  const baseTitle = `${city.name} Matbaa | ${reviewed.products.join(', ')}`;
  assert.equal(seo.title, baseTitle.length + ' | Mavi Basım'.length <= 60 ? `${baseTitle} | Mavi Basım` : baseTitle);
  assert.ok(/teklif/.test(seo.desc), `${route}: order/quote action`);
  assert.ok(!/fabrikamız|tesisimiz|şubemiz|en ucuz|garantili|hızlı teslimat|\d+\s*(saat|iş günü)/i.test(seo.desc), route);
  assert.ok(!titles.has(seo.title)); titles.add(seo.title);
  assert.ok(!descriptions.has(seo.desc)); descriptions.add(seo.desc);
  const withoutCity = normalize(seo.desc).replaceAll(normalize(city.name), '{şehir}');
  assert.ok(!normalizedDescriptions.has(withoutCity), `${route}: city-name-only template`);
  normalizedDescriptions.add(withoutCity);

  const html = renderToStaticMarkup(<TestWrapper initialPath={route}><CityPage citySlug={city.slug}/></TestWrapper>);
  const dom = new JSDOM(html), d = dom.window.document;
  // Metadata and schemas cannot serve as evidence for their own copy.
  d.querySelectorAll('script, style, meta, link, title, svg').forEach(el => el.remove());
  const text = normalize(d.body.textContent || '');
  assert.ok(reviewed.evidence.length >= 3, `${route}: missing content evidence`);
  for (const term of reviewed.evidence) assert.ok(text.includes(normalize(term)), `${route}: evidence absent from visible text: ${term}`);
  evidenceCount += reviewed.evidence.length;
  for (const product of reviewed.products) {
    assert.ok(text.includes(normalize(product)), `${route}: title product absent from page: ${product}`);
    assert.ok(normalize(seo.desc).includes(normalize(product)), `${route}: description must cover title products`);
  }
  assert.equal(d.querySelectorAll('h1').length, 1, route);
  assert.equal(d.querySelector('h1')?.textContent?.trim(), `${city.name} Matbaa ve Baskı Hizmetleri`, `${route}: broad business scope`);
  assert.ok(d.querySelector('a[href^="https://wa.me/"]'), `${route}: order link`);
  dom.window.close();

  const built = new JSDOM(fs.readFileSync(path.join('dist', city.slug, 'index.html'), 'utf8'));
  const bd = built.window.document;
  const prices = bd.querySelector('[data-price-layout="image-table"]');
  assert.ok(prices, `${route}: prices present in initial HTML`);
  assert.equal(prices.querySelector('h2')?.textContent, 'Ekonomik Baskı Fiyatlarımız');
  assert.ok(!/KDV/i.test(prices.textContent || ''), route);
  const priceCards = prices.querySelectorAll('[data-price-example]');
  assert.equal(priceCards.length, 3, route);
  examples.forEach((example, index) => {
    const card = priceCards[index], link = card.querySelector('a'), image = card.querySelector('img');
    assert.equal(link?.getAttribute('href'), example.path, route);
    assert.equal(card.querySelectorAll('a').length, 1, `${route}: no nested or competing card links`);
    assert.equal(card.querySelector('table')?.closest('a'), link, `${route}: whole table clickable`);
    assert.equal(image?.closest('a'), link, `${route}: image clickable`);
    assert.equal(image?.getAttribute('src'), example.image, route);
    assert.ok(image?.getAttribute('alt')?.includes(example.name), route);
    assert.ok(fs.existsSync(path.join('public', example.image)), `${route}: existing product image`);
    const cells = [...card.querySelectorAll('td')].map(cell => cell.textContent || '');
    assert.equal(cells[0], example.item.code, route);
    assert.equal(cells[2], example.quantity, route);
    assert.equal(card.querySelector('strong')?.textContent, example.item.price, route);
    assert.ok(!example.item.isCustom && /\d/.test(example.quantity), `${route}: real pack quantity`);
    if (!productTables.has(example.path)) {
      // Verify the real component for existing client-rendered price tables,
      // without changing the destination pages or their pricing architecture.
      const ProductPage = clientPricePages[example.path];
      const productHTML = ProductPage
        ? renderToStaticMarkup(<TestWrapper initialPath={example.path}><ProductPage /></TestWrapper>)
        : fs.readFileSync(path.join('dist', example.path, 'index.html'), 'utf8');
      const productDOM = new JSDOM(productHTML);
      productTables.set(example.path, [...productDOM.window.document.querySelectorAll('table tr')].map(row => row.textContent || ''));
      productDOM.window.close();
    }
    assert.ok(productTables.get(example.path)?.some(row => row.includes(example.item.code) && row.includes(example.item.price)), `${route}: price must match a real row on ${example.path}`);
  });
  assert.equal(bd.querySelectorAll('h1').length, 1, `${route}: first-HTML content`);
  assert.equal(bd.querySelector('h1')?.textContent?.trim(), `${city.name} Matbaa ve Baskı Hizmetleri`, route);
  assert.equal(bd.querySelectorAll('title').length, 1, route);
  assert.equal(bd.title, seo.title, route);
  for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
    assert.equal(bd.querySelectorAll(selector).length, 1, route);
    assert.equal(bd.querySelector(selector)?.getAttribute('content'), seo.desc, route);
  }
  built.window.close();
}
console.log(`PASS: 81 city summaries; 81 distinct product triples, ${evidenceCount} visible-content evidence checks, broad H1 scope, first HTML and share metadata parity.`);
console.log('ASSESSMENT: product decisions vary; common service facts remain shared. No city-level search demand or ranking result is inferred.');
console.log(`PASS: 81 brochure-first price sections, 81 distinct product pairs, clickable tables/images, existing images and prices matching ${productTables.size} product tables.`);

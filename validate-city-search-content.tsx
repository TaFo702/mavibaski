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

const normalize = (value: string) => value.toLocaleLowerCase('tr').replace(/\s+/g, ' ').trim();
const keys = CITIES_DATA.map(city => city.slug).sort();
assert.deepEqual(Object.keys(CITY_SEARCH_CONTENT).sort(), keys, 'Every current city needs reviewed copy');
const normalizedDescriptions = new Set<string>();
const descriptions = new Set<string>();
const titles = new Set<string>();
const productSets = new Set<string>();
let evidenceCount = 0;
for (const city of CITIES_DATA) {
  const route = `/${city.slug}`, reviewed = CITY_SEARCH_CONTENT[city.slug];
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

import assert from 'node:assert/strict';
import fs from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { JSDOM } from 'jsdom';
import { TestWrapper } from './src/App';
import { SEOPages } from './src/components/SEOPages';
import { SEO_PAGES_DATA } from './src/data/seoPagesData';
import { SECTOR_PRICE_PRODUCTS, getSectorPriceExamples } from './src/data/sectorPriceExamples';
import { BROSUR_DATA } from './src/data/extraProductData';
import { MAGNET_DATA } from './src/data/productData';

const amount = (price: string) => Number(price.replace(/[^\d,]/g, '').replace(',', '.'));
const a5Minimum = Math.min(...BROSUR_DATA.flatMap(g => g.items).filter(r => r.size === 'A5').map(r => amount(r.price)));
const magnetMinimum = Math.min(...MAGNET_DATA.flatMap(g => g.items).filter(r => !('isCustom' in r && r.isCustom)).map(r => amount(r.price)));
const routes = Object.keys(SECTOR_PRICE_PRODUCTS);
assert.equal(routes.length, 30);
assert.equal(routes.filter(path => path.startsWith('/sektor/')).length, 13);
assert.equal(getSectorPriceExamples('/ordu-matbaa').length, 0);
const thirds = new Set<string>();
for (const pathname of routes) {
  assert.ok(Object.values(SEO_PAGES_DATA).some(page => page.path === pathname), pathname);
  const examples = getSectorPriceExamples(pathname);
  assert.equal(examples.length, 3, pathname);
  assert.equal(amount(examples[0].item.price), a5Minimum, pathname);
  assert.equal(amount(examples[1].item.price), magnetMinimum, pathname);
  assert.equal(new Set(examples.map(p => p.path)).size, 3, pathname);
  thirds.add(examples[2].path);
  const client = new JSDOM(renderToStaticMarkup(<TestWrapper initialPath={pathname}><SEOPages /></TestWrapper>)).window.document;
  const initial = new JSDOM(fs.readFileSync(`dist${pathname}/index.html`, 'utf8')).window.document;
  for (const doc of [client, initial]) {
    const cards = doc.querySelectorAll('[data-sector-price-cards] [data-price-example]');
    assert.equal(cards.length, 3, pathname);
    assert.equal(doc.querySelectorAll('h1').length, 1, pathname);
    cards.forEach((card, index) => {
      const anchor = card.querySelector('a');
      const product = examples[index];
      assert.equal(anchor?.getAttribute('href'), product.path, pathname);
      assert.ok(anchor?.contains(card.querySelector('img')), `${pathname}: image must be clickable`);
      assert.ok(anchor?.contains(card.querySelector('table')), `${pathname}: details must be clickable`);
      assert.ok(anchor?.textContent?.includes(product.item.price), pathname);
      assert.ok(anchor?.textContent?.includes(product.quantity), pathname);
      assert.ok(!product.item.isCustom, `${pathname}: unit rate must not be a pack price`);
      assert.ok(fs.existsSync(`public${product.image}`), `${pathname}: image exists`);
      assert.ok(fs.existsSync(`dist${product.path}/index.html`), `${pathname}: destination exists`);
    });
    assert.ok(doc.querySelector('[data-sector-price-cards]')?.textContent?.includes('KDV hariç'));
  }
  const selectors = '[data-sector-price-cards] [data-price-example]';
  assert.deepEqual([...initial.querySelectorAll(selectors)].map(c => c.textContent), [...client.querySelectorAll(selectors)].map(c => c.textContent), `${pathname}: first HTML/client prices differ`);
}
assert.ok(thirds.size >= 8, 'Third products should vary across sectors');
console.log(`PASS: ${routes.length} sector pages; three linked cards each; lowest A5/magnet packs; ${thirds.size} sector product choices; first HTML/client parity.`);

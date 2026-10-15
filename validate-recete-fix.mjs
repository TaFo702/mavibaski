import fs from 'node:fs';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { JSDOM } from 'jsdom';

const html = fs.readFileSync('dist/recete/index.html', 'utf8');
const doc = new JSDOM(html).window.document;
const main = doc.querySelector('main');
assert.ok(main, 'Full page must be present without JavaScript');
assert.equal(doc.querySelectorAll('h1').length, 1);
assert.equal(doc.querySelectorAll('title').length, 1);
assert.equal(doc.querySelectorAll('meta[name="description"]').length, 1);
assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, 1);
assert.equal(doc.querySelector('link[rel="canonical"]').href, 'https://mavibasim.com/recete');
const desc = doc.querySelector('meta[name="description"]').content;
assert.ok(desc.length >= 155 && desc.length <= 160, `Description length: ${desc.length}`);
assert.ok(doc.title.length <= 60);
for (const link of main.querySelectorAll('a[href^="#"]')) {
  const id = link.getAttribute('href').slice(1);
  if (id) assert.ok(doc.getElementById(id), `Missing anchor target: ${id}`);
}
assert.equal(doc.querySelectorAll('#fiyat-tablosu').length, 1);
// Hashes of the published React tables before this fix. Protect prices,
// surcharge rows, labels, markup and existing order controls without rewriting them.
const expected = [
  'ee5e38241f216063be0fdab147e54676c63e6d3dc939a83eb3ac1824ad45cd68',
  'c22d14c2743604d0c0b6024f2ad93ecd3fb004564e2ae971af2e9cfcd572843c'
];
assert.deepEqual((html.match(/<table\b[\s\S]*?<\/table>/g) || [])
  .map(table => createHash('sha256').update(table).digest('hex')), expected);
assert.ok(main.querySelector('button'));
for (const text of ['3 - 5 İş Günü', '3-5 iş günü', 'Aynı Gün Tasarım',
  '24 Saat İçinde PDF Prova', 'İmalatçı Garantisi', 'Ücretsiz Grafik Desteği']) {
  assert.ok(!main.textContent.includes(text), `Unverified promise remains: ${text}`);
}
const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')]
  .map(script => JSON.parse(script.textContent));
for (const type of ['Product', 'FAQPage', 'BreadcrumbList']) {
  assert.equal(schemas.filter(schema => schema['@type'] === type).length, 1, type);
}
for (const faq of schemas.find(schema => schema['@type'] === 'FAQPage').mainEntity) {
  assert.ok(main.textContent.includes(faq.name), `Hidden FAQ: ${faq.name}`);
  assert.ok(main.textContent.includes(faq.acceptedAnswer.text), `Mismatched FAQ: ${faq.name}`);
}
const product = schemas.find(schema => schema['@type'] === 'Product');
assert.equal(Number(product.offers.lowPrice), 1850);
assert.equal(Number(product.offers.highPrice), 3900);
assert.equal(Number(product.offers.offerCount), 6);
assert.equal(doc.querySelector('meta[property="og:image"]').content,
  'https://mavibasim.com/images/recete/numaratorlu-recete-basimi.webp');
for (const image of main.querySelectorAll('img[src^="/images/recete/"]')) {
  assert.ok(image.alt);
  assert.ok(fs.existsSync(`public${image.getAttribute('src')}`));
}
for (const href of ['/antetli', '/dosyalar', '/bloknotlar', '/zarf']) {
  assert.ok(main.querySelector(`a[href="${href}"]`));
}
console.log('PASS: Reçete full HTML, exact table preservation, anchors, metadata, visible FAQ/schema parity and existing images.');

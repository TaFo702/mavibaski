const fs = require('node:fs');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { JSDOM, VirtualConsole } = require('jsdom');
const client = require('esbuild').buildSync({ entryPoints: ['src/main.tsx'], bundle: true, platform: 'browser', format: 'iife', write: false, loader: { '.css': 'empty' } }).outputFiles[0].text;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const normalize = text => text.replace(/\s+/g, ' ').trim();
// Captured from the live, unchanged price component before this audit.
const expectedPriceHash = '475648c7ce3cf27f2c53d56bb7a312432a771b00468b29126b202a1bee8a4331';
const priceHTML = d => d.querySelector('#fiyat-tablosu > .bg-white').outerHTML;
const priceHash = d => crypto.createHash('sha256').update(priceHTML(d).replace(/<!-- -->/g, '').replaceAll(' data-discover="true"', '')).digest('hex');
const errors = [];
function check(d) {
  for (const selector of ['title', 'h1', 'meta[name="description"]', 'link[rel="canonical"]', 'meta[name="robots"]']) assert.equal(d.querySelectorAll(selector).length, 1, selector);
  assert.equal(d.title, 'Adisyon Fişi Baskı Fiyatları | Numaratörlü Koçan');
  assert.equal(d.querySelector('h1').textContent, 'Adisyon Fişi Baskı ve Numaratörlü Adisyon Koçanı Fiyatları');
  assert.equal(d.querySelector('meta[name="description"]').content, 'Restoran, kafe ve lokantalar için logolu, otokopili ve numaratörlü adisyon fişi baskısı. Cilt ve nüsha seçenekleriyle fiyatları inceleyin, hemen teklif alın.');
  assert.equal(d.querySelector('link[rel="canonical"]').href, 'https://mavibasim.com/adisyon');
  for (const key of ['og:title', 'og:description', 'og:url', 'og:image', 'og:image:width', 'og:image:height']) assert.equal(d.querySelectorAll(`meta[property="${key}"]`).length, 1, key);
  assert.equal(d.querySelector('meta[property="og:image"]').content, 'https://mavibasim.com/images/adisyon/restoran-adisyon-baski.webp');
  assert.equal(d.querySelector('meta[property="og:image:width"]').content, '1536');
  assert.equal(d.querySelector('meta[property="og:image:height"]').content, '1024');
  assert.equal(priceHash(d), expectedPriceHash, 'Protected pricing markup changed');
  const ids = [...d.querySelectorAll('[id]')].map(e => e.id);
  assert.equal(new Set(ids).size, ids.length, 'Duplicate IDs');
  const toc = d.querySelector('nav[aria-label="Sayfa İçindekiler Navigasyonu"]');
  assert.equal(toc.querySelectorAll('a').length, 7);
  for (const a of toc.querySelectorAll('a')) assert.equal(d.querySelectorAll(a.getAttribute('href')).length, 1, a.textContent);
  const schemas = [...d.querySelectorAll('script[type="application/ld+json"]')].flatMap(e => { const v = JSON.parse(e.textContent); return Array.isArray(v) ? v : [v]; });
  for (const type of ['Product', 'FAQPage', 'BreadcrumbList']) assert.equal(schemas.filter(s => s['@type'] === type).length, 1, type);
  const product = schemas.find(s => s['@type'] === 'Product');
  assert.equal(product.size, '10 x 14 cm');
  assert.equal(product.material, '70–80 gr 1. hamur beyaz kâğıt');
  assert.deepEqual([product.offers.lowPrice, product.offers.highPrice, product.offers.offerCount], ['1850', '22500', '9'], 'Surcharges must not become product offers');
  assert.deepEqual(schemas.find(s => s['@type'] === 'BreadcrumbList').itemListElement.map(x => x.name), ['Ana Sayfa', 'Makbuz & Formlar', 'Adisyon Fişi']);
  const faq = schemas.find(s => s['@type'] === 'FAQPage').mainEntity;
  assert.equal(faq.length, 8);
  const visible = normalize(d.querySelector('#sss-bolumu').textContent);
  for (const q of faq) { assert.ok(visible.includes(normalize(q.name))); assert.ok(visible.includes(normalize(q.acceptedAnswer.text))); }
  assert.equal(faq.find(q => q.name === 'Adisyon baskı süresi ve teslimatı ne kadardır?').acceptedAnswer.text, "Tasarım onayının ardından adisyon koçanlarınız 3–5 iş günü içerisinde basılarak Türkiye'nin 81 iline anlaşmalı kargo ile gönderilmektedir.");
  const content = d.querySelector('main').textContent;
  assert.ok(content.includes('standart adisyon ürünümüz 10 x 14 cm'));
  assert.ok(content.includes('100 Yaprak'));
  assert.ok(!/Standart (?:olarak |üretim ebadımız |adisyon ürünümüz )?14\s*[×x]\s*20/.test(content));
  assert.ok(content.includes('ürün seçim penceresini açar'));
  const images = [...d.querySelectorAll('main img[src^="/images/adisyon/"]')];
  assert.ok(images.length >= 6, 'Gallery missing from initial HTML');
  for (const img of images) assert.ok(fs.existsSync('public' + img.getAttribute('src')), img.src);
}
async function settle(w, path) {
  for (let i = 0; i < 100; i++) {
    if (w.location.pathname === path && w.document.querySelector('link[rel="canonical"]')?.href === 'https://mavibasim.com' + path && w.document.querySelector('h1')) { await sleep(400); return; }
    await sleep(50);
  }
  throw new Error('Route did not settle: ' + path);
}
async function open() {
  const vc = new VirtualConsole();
  vc.on('error', (...args) => errors.push(args.map(String).join(' ')));
  vc.on('jsdomError', e => errors.push(String(e)));
  const dom = new JSDOM(fs.readFileSync('dist/adisyon/index.html', 'utf8'), { url: 'https://mavibasim.com/adisyon', runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc });
  const w = dom.window, d = w.document;
  w.scrollTo = () => {}; w.HTMLElement.prototype.scrollIntoView = function () { w.__target = this.id; };
  w.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });
  check(d);
  const before = { table: d.querySelector('#fiyat-tablosu table'), price: priceHTML(d), text: normalize(d.querySelector('main').textContent), links: [...d.querySelectorAll('main a[href]')].map(e => e.getAttribute('href')) };
  w.eval(client); await settle(w, '/adisyon'); check(d);
  assert.strictEqual(d.querySelector('#fiyat-tablosu table'), before.table, 'Hydration replaced price table');
  assert.equal(priceHTML(d), before.price);
  assert.equal(normalize(d.querySelector('main').textContent), before.text, 'Hydration changed content');
  assert.deepEqual([...d.querySelectorAll('main a[href]')].map(e => e.getAttribute('href')), before.links);
  return dom;
}
function click(w, element) { assert.ok(element, 'Missing control'); element.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true, button: 0 })); }
(async () => {
  const dom = await open(), w = dom.window, d = w.document;
  for (const a of d.querySelectorAll('nav[aria-label="Sayfa İçindekiler Navigasyonu"] a')) { click(w, a); assert.equal(w.__target, a.getAttribute('href').slice(1)); }
  for (const path of ['/siparis-fisi', '/para-makbuzu', '/makbuz-ve-formlar', '/']) {
    click(w, [...d.querySelectorAll('a[href]')].find(a => a.getAttribute('href') === path && !a.target));
    await settle(w, path); w.history.back(); await settle(w, '/adisyon'); check(d);
  }
  click(w, d.querySelector('#fiyat-tablosu table button')); await sleep(200);
  const quote = () => decodeURIComponent([...d.querySelectorAll('a[href^="https://wa.me/"]')].find(a => a.textContent.includes('WhatsApp ile İletişim')).href);
  assert.ok(quote().includes('5 cilt')); assert.ok(quote().includes('Ebat: 10 x 14 cm')); assert.ok(quote().includes('1.850'));
  assert.ok(!quote().includes('Ebat: -'));
  assert.ok(d.body.textContent.includes('3–5 iş günü'));
  assert.ok(!d.body.textContent.includes('Ortalama 3–4 iş günü'));
  click(w, [...d.querySelectorAll('button')].find(b => normalize(b.textContent).startsWith('1000 CİLT'))); await sleep(150);
  assert.ok(quote().includes('1.000 cilt')); assert.ok(quote().includes('22.500'));
  click(w, [...d.querySelectorAll('button')].find(b => /^2\s*RENK$/.test(normalize(b.textContent)))); await sleep(150);
  assert.ok(quote().includes('26.400'), 'Existing color surcharge calculation changed');
  assert.equal(priceHash(d), expectedPriceHash);
  dom.window.close(); const reload = await open(); reload.window.close();
  assert.deepEqual(errors, [], 'Runtime or hydration errors');
  console.log('PASS: Adisyon initial HTML, protected live pricing hash, hydration node/content/link parity, return navigation, single metadata/schema ownership, FAQ parity, anchors and WhatsApp size/cilt/color-price flow.');
})().catch(error => { console.error(error); process.exit(1); });

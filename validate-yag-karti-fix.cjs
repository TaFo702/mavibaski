const fs = require('node:fs');
const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const { JSDOM, VirtualConsole } = require('jsdom');
const normalize = value => value.replace(/\s+/g, ' ').trim();
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const hash = value => createHash('sha256').update(value).digest('hex');
const schemas = d => [...d.querySelectorAll('script[type="application/ld+json"]')]
  .flatMap(tag => JSON.parse(tag.textContent));

function check(d) {
  for (const selector of ['h1', 'title', 'meta[name="description"]', 'link[rel="canonical"]',
    'meta[name="robots"]', 'meta[property="og:title"]', 'meta[property="og:description"]',
    'meta[property="og:url"]', 'meta[property="og:image"]', 'meta[name="twitter:title"]',
    'meta[name="twitter:description"]', 'meta[name="twitter:image"]']) {
    assert.equal(d.querySelectorAll(selector).length, 1, selector);
  }
  assert.equal(d.title, 'Yağ Değişim Kartı Baskı Fiyatları | Logolu Yağ Kartı');
  assert.equal(d.querySelector('link[rel="canonical"]').href, 'https://mavibasim.com/yag-karti');
  assert.equal(d.querySelectorAll('#fiyat-tablosu').length, 1);
  const data = schemas(d), products = data.filter(item => item['@type'] === 'Product');
  assert.equal(products.length, 4);
  const rows = [...d.querySelectorAll('#fiyat-tablosu tbody tr')];
  assert.equal(rows.length, 4);
  for (const row of rows) {
    const code = row.querySelector('th[scope="row"]').textContent.trim();
    const product = products.find(item => item.sku === code);
    assert.ok(product, code);
    const cells = [...row.querySelectorAll('td')].slice(-5);
    assert.ok(product.name.includes(normalize(cells[0].textContent)));
    assert.ok(product.name.includes(normalize(cells[1].textContent)));
    assert.ok(product.name.includes(normalize(cells[2].textContent)));
    assert.equal(product.offers['@type'], 'Offer');
    assert.equal(product.offers.price, cells[3].textContent.replace(/\./g, '').replace(/[^0-9,]/g, '').replace(',', '.'));
    assert.equal(product.offers.priceCurrency, 'TRY');
    assert.equal(product.offers.priceSpecification.valueAddedTaxIncluded, false);
    assert.ok(!('availability' in product.offers));
    for (const image of product.image) assert.ok(fs.existsSync('public' + new URL(image).pathname));
  }
  for (const type of ['BreadcrumbList', 'FAQPage', 'WebPage']) {
    assert.equal(data.filter(item => item['@type'] === type).length, 1, type);
  }
  const faq = data.find(item => item['@type'] === 'FAQPage').mainEntity;
  assert.equal(faq.length, 8);
  const text = normalize(d.querySelector('main').textContent);
  for (const item of faq) {
    assert.ok(text.includes(normalize(item.name)));
    assert.ok(text.includes(normalize(item.acceptedAnswer.text)));
  }
  for (const heading of ['Yağ Kartı Modeli Nasıl Seçilir?', 'Yağ Kartı Baskı ve Malzeme Standartları',
    'Sektörel Yağ Kartı Kullanım Senaryoları', 'Baskıya Gönderilecek Yağ Kartı Dosyası Hazırlama Rehberi']) {
    assert.ok(text.includes(heading), heading);
  }
  assert.equal(d.querySelectorAll('main img[src*="/yag-karti/"]').length, 6);
  const ids = [...d.querySelectorAll('[id]')].map(element => element.id);
  assert.equal(new Set(ids).size, ids.length, 'Duplicate IDs');
}

(async () => {
  const source = fs.readFileSync('src/components/YagKarti.tsx', 'utf8');
  const start = source.indexOf('        {/* Pricing Table Section */}');
  const tariff = source.slice(start, source.indexOf('        {/*', start + 15));
  assert.equal(hash(tariff), '6cfe273da590633b42c3925af3f8dd54d8078705b4c47b70a7754cd0249295f2', 'Protected price section changed');
  assert.equal(hash(fs.readFileSync('src/data/extraProductData.ts')), '32a158645e22051ebf3c6d45b37c01e7d348c4da0a0a99000123578b7e33cc9f', 'Tariff data changed');
  const client = require('esbuild').buildSync({ entryPoints: ['src/main.tsx'], bundle: true,
    platform: 'browser', format: 'iife', write: false, loader: { '.css': 'empty' } }).outputFiles[0].text;
  for (let attempt = 0; attempt < 2; attempt++) {
    const errors = [], vc = new VirtualConsole();
    vc.on('error', (...args) => errors.push(args.map(String).join(' ')));
    vc.on('jsdomError', error => errors.push(String(error)));
    const dom = new JSDOM(fs.readFileSync('dist/yag-karti/index.html', 'utf8'), {
      url: 'https://mavibasim.com/yag-karti', runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: vc
    });
    try {
      const w = dom.window, d = w.document;
      w.scrollTo = () => {};
      w.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });
      check(d);
      assert.equal(d.getElementById('root').dataset.prerendered, 'yag-karti');
      const table = d.querySelector('#fiyat-tablosu table'), html = table.outerHTML;
      const text = normalize(d.querySelector('main').textContent);
      w.eval(client);
      await pause(1000);
      check(d);
      assert.strictEqual(d.querySelector('#fiyat-tablosu table'), table, 'Hydration replaced protected table');
      assert.equal(table.outerHTML, html, 'Hydration changed protected table');
      assert.equal(normalize(d.querySelector('main').textContent), text, 'Hydration changed page content');
      const card = d.querySelector('[aria-haspopup="dialog"]');
      card.focus();
      card.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await pause(100);
      assert.ok(d.querySelector('[role="dialog"][aria-modal="true"]'));
      assert.equal(d.activeElement.getAttribute('aria-label'), 'Görseli kapat');
      d.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await pause(500);
      assert.equal(d.querySelector('[role="dialog"]'), null);
      assert.strictEqual(d.activeElement, card, 'Focus did not return to gallery');
      table.querySelector('button').click();
      await pause(100);
      assert.ok(normalize(d.body.textContent).includes('Yag-cok-k'), 'Order product missing');
      // A fresh route instance checks metadata cleanup without keeping an order dialog open.
      const link = d.querySelector('a[href="/magnet"]');
      link.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
      await pause(700);
      assert.equal(d.querySelector('link[rel="canonical"]').href, 'https://mavibasim.com/magnet');
      assert.equal(d.querySelectorAll('link[rel="canonical"]').length, 1);
      assert.ok(!schemas(d).some(item => item.sku?.startsWith('Yag-')), 'Previous route schema remained');
      w.history.back();
      await pause(700);
      check(d);
      assert.deepEqual(errors, [], 'Runtime/hydration errors');
    } finally { dom.window.close(); }
  }
  console.log('PASS: unchanged price section/data; full first HTML; tariff-matched offers; metadata/FAQ; hydration node preservation; keyboard gallery; route cleanup and repeated direct load.');
})().catch(error => { console.error(error.stack); process.exit(1); });

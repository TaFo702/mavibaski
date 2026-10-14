const fs = require('node:fs');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { JSDOM, VirtualConsole } = require('jsdom');
const client = require('esbuild').buildSync({ entryPoints: ['src/main.tsx'], bundle: true,
  platform: 'browser', format: 'iife', write: false, loader: { '.css': 'empty' } }).outputFiles[0].text;
// Captured from the unmodified React page before this change. Ignore only SSR text comments.
const expectedHashes = ["d22a13202dfd907d2e8738b83e038dd4e778f1a0d826be97d64b3b8f28fc2f6e", "fc6a65c27809478f26a2bc59872dac36fedbba17abbf11127a647c224d83f4d1", "ef8df8843a0db241a41b033894ca250755ad897995043ee85a354314ff428ac5", "397f5faf53b1b008ccce56c8011c6c6b6685d8349ad1533abd1b6eedbdc70b77", "874f4c6f58be6f59eaf742709ba686d033729018bfb64632afa69b41eb72bad5", "7c94ae0379c1caf9e5b9385ff408cdb2999ab8411dbd9a6174194d6568ce0bc5", "8515b029d98e320c515961108442537ee039bda6aaf1d2c449998335596df324", "a3a5a2e1257cdae126b064a732ffd15cfc25c846772393c30fbcfbb2cc44c331", "9b0adf882a52376f6f9be628ff59b5e5a37c2844249b9cdcce18b122011e78aa", "84270557534feb5bfd5f8346175e33a64e5f91484ce5f757173d2e5a1a2cd2aa", "ec07c014917c3f6c00e6cc79fd478be94b42f039d374b964ff9a862d0ff13259", "c7401f00fa9ccb22c451050e2be34fcdf1efea210f3ea202f98149e8204c5e7f"];
const hashTables = doc => [...doc.querySelectorAll('main table')].map(n =>
  crypto.createHash('sha256').update(n.outerHTML.replace(/<!--[\s\S]*?-->/g, '')).digest('hex'));
const normalize = text => text.replace(/\s+/g, ' ').trim();
const links = doc => [...doc.querySelectorAll('#root a[href]')].map(n => n.getAttribute('href'));
const schemas = doc => [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(n => {
  const data = JSON.parse(n.textContent); return Array.isArray(data) ? data : data['@graph'] || [data];
});
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const errors = [];

function check(doc) {
  assert.equal(doc.querySelectorAll('h1').length, 1);
  assert.equal(doc.querySelectorAll('title').length, 1);
  assert.equal(doc.title, 'Katalog Baskı Fiyatları | Çok Sayfalı Ürün Kataloğu - Mavi Basım');
  assert.equal(doc.querySelectorAll('meta[name="description"]').length, 1);
  assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, 1);
  assert.equal(doc.querySelector('link[rel="canonical"]').href, 'https://mavibasim.com/kataloglar');
  assert.equal(doc.querySelector('meta[property="og:url"]').content, 'https://mavibasim.com/kataloglar');
  assert.equal(doc.querySelector('meta[property="og:title"]').content, doc.title);
  assert.equal(doc.querySelector('meta[name="twitter:title"]').content, doc.title);
  const keys = [...doc.querySelectorAll('meta[name],meta[property]')].map(n => n.name || n.getAttribute('property'));
  assert.equal(keys.length, new Set(keys).size, 'Duplicate metadata');
  const ids = [...doc.querySelectorAll('[id]')].map(n => n.id);
  assert.equal(ids.length, new Set(ids).size, 'Duplicate IDs: ' + ids.filter((id, i) => ids.indexOf(id) !== i).join(', '));
  assert.deepEqual(hashTables(doc), expectedHashes, 'Protected table changed');
  assert.equal(doc.querySelectorAll('main table button').length, 47);
  assert.equal(doc.querySelectorAll('main figure img').length, 6);
  assert.equal(doc.querySelectorAll('main iframe').length, 1);
  assert(doc.querySelector('main iframe').src.includes('DqFzFZeCMKA'));
  assert.equal(doc.querySelectorAll('main template').length, 0);
  const text = doc.querySelector('main').textContent;
  for (const value of ['Kapak Tasarımı:', 'toplam 8–40 sayfalık', 'Üretim ve teslim süresi ürün, adet, malzeme ve onay sürecine göre teklif aşamasında paylaşılır.', 'Katalog Üretimi ve Baskı Çözümleri', 'İlgili Matbaa & Tasarım Rehberleri']) assert(text.includes(value), 'Missing: ' + value);
  for (const value of ['Kapak Çapı:', '8-32 sayfa arası', 'fabrikamızdan', 'modern ofset tesislerimizde', '24 saat içinde otomatik', 'en geç 1-2 saat', '5 İş Günü']) assert(!text.includes(value), 'Stale: ' + value);
  const citySection = [...doc.querySelectorAll('main section')].find(n => n.querySelector('h2')?.textContent.includes('Hangi Şehirlere'));
  const cityLinks = [...citySection.querySelectorAll('a')];
  assert.equal(cityLinks.length, 4);
  for (const a of cityLinks) assert(a.getAttribute('href').includes('katalog'));
  const data = schemas(doc);
  assert.equal(data.filter(n => n['@type'] === 'BreadcrumbList').length, 1);
  assert.equal(data.filter(n => n['@type'] === 'Product').length, 1);
  const faq = data.filter(n => n['@type'] === 'FAQPage'); assert.equal(faq.length, 1);
  for (const q of faq[0].mainEntity) { assert(text.includes(q.name)); assert(text.includes(q.acceptedAnswer.text)); }
}

async function open(path) {
  const html = fs.readFileSync(path === '/' ? 'dist/index.html' : 'dist' + path + '/index.html', 'utf8');
  const vc = new VirtualConsole();
  vc.on('error', (...args) => errors.push(args.map(String).join(' ')));
  vc.on('jsdomError', error => errors.push(String(error)));
  const dom = new JSDOM(html, { url: 'https://mavibasim.com' + path, runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc });
  const w = dom.window; w.scrollTo = () => {}; w.HTMLElement.prototype.scrollIntoView = () => {};
  w.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });
  const before = { text: normalize(w.document.querySelector('#root').textContent), links: links(w.document), tables: [...w.document.querySelectorAll('main table')] };
  if (path === '/kataloglar') { check(w.document); assert.equal(w.document.querySelector('#root').dataset.prerendered, 'kataloglar'); }
  w.eval(client); await sleep(1200);
  return { dom, w, before };
}
async function go(w, path) {
  const a = [...w.document.querySelectorAll('a[href]')].find(n => n.getAttribute('href') === path && !n.target);
  assert(a, 'Missing navigation link: ' + path);
  a.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
  await sleep(800); assert.equal(w.location.pathname, path);
}
(async () => {
  for (let i = 0; i < 2; i++) {
    const { dom, w, before } = await open('/kataloglar'); check(w.document);
    assert.equal(normalize(w.document.querySelector('#root').textContent), before.text, 'Hydration changed text');
    assert.deepEqual(links(w.document), before.links, 'Hydration changed links');
    before.tables.forEach((table, i) => assert.strictEqual(w.document.querySelectorAll('main table')[i], table, 'Hydration replaced table'));
    await go(w, '/brosur');
    assert(!w.document.querySelector('#katalog-faq-schema'), 'Katalog FAQ leaked to another route');
    assert(!w.document.querySelector('link[rel="canonical"]').href.endsWith('/kataloglar'));
    await go(w, '/kataloglar'); check(w.document); dom.window.close();
  }
  const home = await open('/'); await go(home.w, '/kataloglar'); check(home.w.document); home.dom.window.close();
  assert.deepEqual(errors, [], 'Client/hydration errors');
  console.log('PASS: direct open, reload, hydration node identity, route transitions, metadata/schema, 6 gallery images, existing video, and all 12 protected table SHA-256 hashes.');
})().catch(error => { console.error(error); process.exit(1); });

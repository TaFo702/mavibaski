const fs = require('node:fs');
const assert = require('node:assert/strict');
const { JSDOM, VirtualConsole } = require('jsdom');
const client = require('esbuild').buildSync({entryPoints: ['src/main.tsx'], bundle: true, platform: 'browser', format: 'iife', write: false, loader: {'.css': 'empty'}}).outputFiles[0].text;
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const normalize = text => text.replace(/\s+/g, ' ').trim();
const errors = [];
function check(document) {
  for (const selector of ['h1', 'title', 'meta[name="description"]', 'link[rel="canonical"]']) assert.equal(document.querySelectorAll(selector).length, 1, selector);
  assert.equal(document.querySelector('link[rel="canonical"]').href, 'https://mavibasim.com/brosur');
  assert.equal(document.querySelectorAll('#app-seo-metadata-jsonld').length, 0, 'Legacy schema owner');
  assert.equal(document.querySelectorAll('#fiyat-listesi table').length, 3);
  assert.equal(document.querySelectorAll('#fiyat-listesi tbody tr').length, 40);
  const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(node => {
    const value = JSON.parse(node.textContent);
    return Array.isArray(value) ? value : value['@graph'] || [value];
  });
  for (const type of ['Service', 'FAQPage', 'BreadcrumbList', 'Organization']) assert.equal(schemas.filter(item => item['@type'] === type).length, 1, type);
  assert.equal(schemas.filter(item => item['@type'] === 'Product').length, 0);
  assert.equal(document.querySelector('meta[property="og:image:width"]').content, '1536');
  assert.equal(document.querySelector('meta[property="og:image:height"]').content, '1024');
  assert.equal(schemas.find(item => item['@type'] === 'Organization').logo, 'https://mavibasim.com/mavilogo.png');
  const offers = schemas.find(item => item['@type'] === 'Service').hasOfferCatalog.itemListElement;
  const rows = [...document.querySelectorAll('#fiyat-listesi tbody tr')];
  assert.equal(offers.length, rows.length);
  for (const row of rows) {
    const cells = [...row.querySelectorAll('td')].slice(-6);
    const code = cells[1].textContent.trim();
    const offer = offers.find(item => item['@id'].endsWith('#teklif-' + code));
    assert.ok(offer, code);
    assert.equal(offer.price, cells[4].textContent.replace(/\./g, '').replace(/[^0-9,]/g, '').replace(',', '.'));
    assert.equal(offer.priceCurrency, 'TRY');
    assert.equal(offer.priceSpecification.valueAddedTaxIncluded, false);
    assert.ok(offer.itemOffered.name.includes(normalize(cells[3].textContent)), code + ' quantity');
    assert.ok(!('availability' in offer) && !('priceValidUntil' in offer));
  }
  const ids = [...document.querySelectorAll('[id]')].map(item => item.id);
  assert.equal(new Set(ids).size, ids.length, 'Duplicate IDs');
  const disclosure = document.querySelector('[aria-controls="brosur-advanced-tech"]');
  assert.ok(disclosure);
  assert.equal(disclosure.getAttribute('aria-expanded'), 'false');
  assert.equal(document.getElementById('brosur-advanced-tech').hidden, true);
  const faq = schemas.find(item => item['@type'] === 'FAQPage').mainEntity;
  assert.equal(faq.length, 13);
  const text = normalize(document.querySelector('main').textContent);
  for (const item of faq) {
    assert.ok(text.includes(normalize(item.name)), item.name);
    assert.ok(text.includes(normalize(item.acceptedAnswer.text)), item.name + ' answer');
  }
}
(async () => {
  const console = new VirtualConsole();
  console.on('error', (...values) => errors.push(values.map(String).join(' ')));
  console.on('jsdomError', error => errors.push(String(error)));
  const dom = new JSDOM(fs.readFileSync('dist/brosur/index.html', 'utf8'), {url: 'https://mavibasim.com/brosur', runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: console});
  try {
    const w = dom.window, d = w.document;
    w.scrollTo = () => {};
    w.matchMedia = () => ({matches: false, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){}});
    check(d);
    const table = d.querySelector('#fiyat-listesi table');
    const prices = [...d.querySelectorAll('#fiyat-listesi tbody tr')].map(node => normalize(node.textContent));
    const content = normalize(d.querySelector('main').textContent);
    w.eval(client);
    await pause(450);
    check(d);
    assert.strictEqual(d.querySelector('#fiyat-listesi table'), table, 'Hydration replaced price table');
    assert.equal(normalize(d.querySelector('main').textContent), content, 'Hydration changed content');
    assert.deepEqual([...d.querySelectorAll('#fiyat-listesi tbody tr')].map(node => normalize(node.textContent)), prices);
    const disclosure = d.querySelector('[aria-controls="brosur-advanced-tech"]');
    disclosure.click(); await pause(50);
    assert.equal(disclosure.getAttribute('aria-expanded'), 'true');
    assert.equal(d.getElementById('brosur-advanced-tech').hidden, false);
    disclosure.click(); await pause(50);
    check(d);
    const filters = [...d.querySelectorAll('#fiyat-listesi button')].slice(0, 6);
    const light = () => filters.findIndex(node => node.className.includes('brightness-125'));
    const initialLight = light();
    await pause(750);
    assert.notEqual(light(), initialLight, 'Existing light animation stopped');
    filters.find(node => node.textContent === 'A5').click();
    await pause(50);
    assert.ok(d.querySelectorAll('#fiyat-listesi tbody tr').length < 40, 'A5 filter did not work');
    filters.find(node => node.textContent === 'Tüm Ebatlar').click();
    await pause(50);
    check(d);
    const home = [...d.querySelectorAll('a[href="/"]')].find(node => !node.target);
    home.dispatchEvent(new w.MouseEvent('click', {bubbles: true, cancelable: true, button: 0}));
    await pause(400);
    w.history.back();
    await pause(500);
    check(d);
    assert.deepEqual(errors, [], 'Runtime or hydration errors');
  } finally { dom.window.close(); }
  process.stdout.write('PASS: brochure hydration retains price table and content; unique schemas/metadata, 13 FAQs, light animation, size filters and return navigation.\n');
})().catch(error => { process.stderr.write(String(error.stack) + '\n'); process.exit(1); });

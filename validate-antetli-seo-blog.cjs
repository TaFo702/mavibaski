const fs = require('node:fs');
const assert = require('node:assert/strict');
const { JSDOM, VirtualConsole } = require('jsdom');
const slug = '/blog/antetli-kagit-baskisinda-80gr-1.hamur';
const html = fs.readFileSync(`dist${slug}/index.html`, 'utf8');
const normalize = text => text.replace(/\s+/g, ' ').trim();
const routeText = doc => normalize(doc.querySelector('main').textContent);
const routeLinks = doc => [...doc.querySelectorAll('main a[href]')].map(n => n.getAttribute('href'));
const schemas = doc => [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(n => {
  const value = JSON.parse(n.textContent);
  return Array.isArray(value) ? value : value['@graph'] || [value];
});
const errors = [];
const crypto = require('node:crypto');
const productDoc = new JSDOM(fs.readFileSync('dist/antetli/index.html', 'utf8')).window.document;
const productTable = [...productDoc.querySelectorAll('table')].find(n => n.querySelector('caption')?.textContent.includes('Baskı Fiyat Listesi'));
assert(productTable, 'Protected product price table missing');
assert.equal(crypto.createHash('sha256').update(productTable.outerHTML).digest('hex'),
  'a9d2dc0fb7fb147b3b8cacc346368cf22cecec3ed61179b69f0e163512cdefca', 'Product price table changed');
assert(productDoc.querySelector('main').textContent.includes('PDF, AI veya CDR'));
assert(productDoc.querySelector('main a[href="/blog/cmyk-ofset-baski-ve-tasima-payi-rehberi"]'));
const redirect = JSON.parse(fs.readFileSync('vercel.json', 'utf8')).redirects.find(n => n.source === '/antetli-kagit');
assert.deepEqual(redirect, { source: '/antetli-kagit', destination: '/antetli', permanent: true });
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const client = require('esbuild').buildSync({ entryPoints: ['src/main.tsx'], bundle: true,
  platform: 'browser', format: 'iife', write: false, loader: { '.css': 'empty' } }).outputFiles[0].text;

function check(doc) {
  assert.equal(doc.querySelectorAll('h1').length, 1);
  assert.equal(doc.querySelectorAll('title').length, 1);
  assert.equal(doc.querySelectorAll('meta[name="description"]').length, 1, doc.head.innerHTML);
  assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, 1);
  assert.equal(doc.querySelector('link[rel="canonical"]').href, 'https://mavibasim.com' + slug);
  const article = doc.querySelector('main .prose');
  assert(article, 'Article content missing');
  assert.equal(article.querySelectorAll('h2').length, 4, 'Missing article headings');
  assert.equal(article.querySelectorAll('table').length, 1, 'Comparison must be a real table');
  assert.equal(article.querySelector('table thead').rows.length, 1);
  assert.equal(article.querySelector('table tbody').rows.length, 4);
  assert(article.querySelectorAll('ul li').length === 6, 'Missing card/warning lists');
  for (const marker of [':::info-cards', ':::warning-box', ':::importance-cards', ':::cta', 'BTN_LINK:', 'BTN_TEXT:'])
    assert(!article.textContent.includes(marker), 'Raw formatting marker: ' + marker);
  for (const promise of ['%100', 'Pantone kalibrasyonu yapılır', 'stagnant', 'Ofset parkurumuzda'])
    assert(!doc.querySelector('main').textContent.includes(promise), 'Unsubstantiated claim: ' + promise);
  assert(article.textContent.includes('90 gr'));
  assert(article.textContent.includes('Yazıcı modeline göre kontrol edilmeli'));
  for (const href of ['/zarf', '/antetli', '/kartvizit', 'https://wa.me/905366022373'])
    assert(article.querySelector(`a[href="${href}"]`), 'Missing article link ' + href);
  const faq = schemas(doc).filter(n => n['@type'] === 'FAQPage');
  assert.equal(faq.length, 1, 'FAQ schema must have one owner');
  for (const item of faq[0].mainEntity) {
    assert(routeText(doc).includes(normalize(item.name)), 'FAQ question not visible');
    assert(routeText(doc).includes(normalize(item.acceptedAnswer.text)), 'FAQ answer not visible');
  }
}

async function open() {
  const console = new VirtualConsole();
  console.on('error', (...args) => errors.push(args.map(String).join(' ')));
  console.on('jsdomError', error => errors.push(String(error)));
  const dom = new JSDOM(html, { url: 'https://mavibasim.com' + slug,
    runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: console });
  const w = dom.window;
  w.scrollTo = () => {};
  w.HTMLElement.prototype.scrollIntoView = function () {};
  w.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });
  check(w.document);
  const before = { text: routeText(w.document), links: routeLinks(w.document),
    table: w.document.querySelector('main .prose table').outerHTML };
  w.eval(client);
  for (let i = 0; i < 100; i++) {
    if (w.document.querySelector('main .prose table')) { await sleep(1000); break; }
    await sleep(100);
  }
  check(w.document);
  assert.equal(routeText(w.document), before.text, 'Client changed SSR article text');
  assert.deepEqual(routeLinks(w.document), before.links, 'Client changed SSR links');
  assert.equal(w.document.querySelector('main .prose table').outerHTML, before.table, 'Client changed comparison markup');
  return dom;
}

(async () => {
  for (let attempt = 0; attempt < 2; attempt++) {
    const dom = await open();
    if (!attempt) {
      const w = dom.window;
      // jsdom cannot follow a native document link; exercise router history explicitly.
      w.history.pushState({}, '', '/antetli');
      w.dispatchEvent(new w.PopStateEvent('popstate'));
      for (let i = 0; i < 100 && !w.document.querySelector('main table button'); i++) await sleep(100);
      assert.equal(w.location.pathname, '/antetli');
      const price = [...w.document.querySelectorAll('main table')].find(n => n.querySelector('caption'));
      assert(price, 'Product price table missing after navigation');
      assert.equal(price.querySelectorAll('tbody tr').length, 6);
      const link = [...w.document.querySelectorAll('a')].find(n => n.getAttribute('href') === slug && !n.target);
      assert(link, 'Return link missing');
      link.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
      for (let i = 0; i < 100 && !w.document.querySelector('main .prose table'); i++) await sleep(100);
      await sleep(1000);
      check(w.document);
    }
    dom.window.close();
  }
  assert.equal(errors.length, 0, errors.join('\n'));
  console.log('PASS: initial HTML, client/reload content parity, headings, cards, table, visible FAQ/schema, links and blog-product-blog navigation.');
})().catch(error => { console.error(error); process.exitCode = 1; });

const fs = require('node:fs');
const assert = require('node:assert/strict');
const { JSDOM, VirtualConsole } = require('jsdom');
const slug = '/blog/zarf-baskisinda-diplomat-ve-torba-zarf';
const html = fs.readFileSync(`dist${slug}/index.html`, 'utf8');
const normalize = text => text.replace(/\s+/g, ' ').trim();
const routeText = doc => normalize(doc.querySelector('main').textContent);
const routeLinks = doc => [...doc.querySelectorAll('main a[href]')].map(n => n.getAttribute('href'));
const schemas = doc => [...doc.querySelectorAll('script[type="application/ld+json"]')].flatMap(n => {
  const value = JSON.parse(n.textContent);
  return Array.isArray(value) ? value : value['@graph'] || [value];
});
const errors = [];
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
  assert.equal(article.querySelector('table tbody').rows.length, 3);
  assert(article.querySelectorAll('ul li').length === 9, 'Missing card/warning lists');
  for (const marker of [':::info-cards', ':::warning-box', ':::importance-cards', ':::cta', 'BTN_LINK:', 'BTN_TEXT:'])
    assert(!article.textContent.includes(marker), 'Raw formatting marker: ' + marker);
  for (const promise of ['2 yıla', 'sıfır kayma', 'kesinlikle engelleyen'])
    assert(!doc.querySelector('main').textContent.includes(promise), 'Unsubstantiated claim: ' + promise);
  assert(article.textContent.includes('genel zarf modeli ve ölçüsü örneklerini'));
  assert(article.textContent.includes('bu fiyat listesindeki sipariş seçenekleri değildir'));
  for (const href of ['/zarf', '/antetli', '/dosyalar', 'https://wa.me/905366022373'])
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
      w.history.pushState({}, '', '/zarf');
      w.dispatchEvent(new w.PopStateEvent('popstate'));
      for (let i = 0; i < 100 && !w.document.querySelector('main table button'); i++) await sleep(100);
      assert.equal(w.location.pathname, '/zarf');
      const price = [...w.document.querySelectorAll('main table')].find(n => n.querySelector('caption'));
      assert(price, 'Product price table missing after navigation');
      assert.equal(price.querySelectorAll('tbody tr').length, 3);
      const link = [...w.document.querySelectorAll('a')].find(n => n.getAttribute('href') === slug && !n.target);
      assert(link, 'Return link missing');
      link.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
      for (let i = 0; i < 100 && !w.document.querySelector('main .prose table'); i++) await sleep(100);
      await sleep(300);
      check(w.document);
    }
    dom.window.close();
  }
  assert.equal(errors.length, 0, errors.join('\n'));
  console.log('PASS: initial HTML, client/reload content parity, headings, cards, table, visible FAQ/schema, links and blog-product-blog navigation.');
})().catch(error => { console.error(error); process.exitCode = 1; });

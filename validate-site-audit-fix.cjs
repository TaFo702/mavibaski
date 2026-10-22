const fs = require('node:fs');
const assert = require('node:assert/strict');
const { JSDOM, VirtualConsole } = require('jsdom');
const { buildSync } = require('esbuild');
const routes = [...fs.readFileSync('src/data/staticPageRoutes.ts', 'utf8').matchAll(/'([^']+)'/g)].map(match => match[1]).filter(route => !process.env.AUDIT_ROUTE || route === process.env.AUDIT_ROUTE);
const client = buildSync({ entryPoints: ['src/main.tsx'], bundle: true, platform: 'browser', format: 'iife', write: false, loader: { '.css': 'empty' } }).outputFiles[0].text;
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const normalize = text => text.replace(/\s+/g, ' ').trim();
function checkMetadata(document, route) {
  for (const selector of ['h1', 'title', 'meta[name="description"]', 'link[rel="canonical"]']) {
    assert.equal(document.querySelectorAll(selector).length, 1, route + ': ' + selector);
  }
  assert.equal(document.querySelector('link[rel="canonical"]').href, 'https://mavibasim.com' + route);
}
(async () => {
  for (const route of routes) {
    const errors = [];
    const console = new VirtualConsole();
    console.on('error', (...messages) => errors.push(messages.map(String).join(' ')));
    console.on('jsdomError', error => errors.push(error.cause?.stack || error.stack || String(error)));
    const dom = new JSDOM(fs.readFileSync('dist' + route + '/index.html', 'utf8'), {
      url: 'https://mavibasim.com' + route, runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: console
    });
    try {
      const w = dom.window, d = w.document;
      w.scrollTo = () => {};
      w.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
      w.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });
      checkMetadata(d, route);
      assert.equal(d.getElementById('root').dataset.prerendered, route.slice(1));
      const main = d.querySelector('main');
      const content = normalize(main.textContent);
      assert.ok(content.length > 300, route + ': initial HTML is empty');
      const tables = [...main.querySelectorAll('table')];
      const rows = tables.map(table => normalize(table.textContent));
      w.eval(client);
      await pause(300);
      assert.deepEqual(errors, [], route + ': runtime or hydration errors');
      checkMetadata(d, route);
      assert.equal(normalize(d.querySelector('main').textContent), content, route + ': content changed after hydration');
      for (let i = 0; i < tables.length; i++) {
        assert.strictEqual(d.querySelector('main').querySelectorAll('table')[i], tables[i], route + ': price table replaced');
        assert.equal(normalize(tables[i].textContent), rows[i], route + ': pricing changed');
      }
      assert.deepEqual(errors, [], route + ': runtime or hydration errors');
      if (['/kitap-ayraci', '/iletisim', '/referanslar', '/kullanim-sartlari'].includes(route)) {
        d.querySelector('header nav a[href="/"]').dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
        await pause(350);
        checkMetadata(d, '/');
        w.history.back();
        await pause(350);
        checkMetadata(d, route);
        assert.equal(normalize(d.querySelector('main').textContent), content, route + ': return navigation lost content');
        assert.deepEqual(errors, [], route + ': navigation errors');
      }
      process.stdout.write('PASS ' + route + ': first HTML, hydration, metadata and table preservation\n');
    } finally { dom.window.close(); }
  }
  const home = new JSDOM(fs.readFileSync('dist/index.html', 'utf8')).window.document;
  const schemas = [...home.querySelectorAll('script[type="application/ld+json"]')].flatMap(node => {
    const data = JSON.parse(node.textContent);
    return Array.isArray(data) ? data : data['@graph'] || [data];
  });
  const business = schemas.find(schema => Array.isArray(schema['@type']) && schema['@type'].includes('LocalBusiness'));
  assert.ok(business);
  const hours = business.openingHoursSpecification;
  assert.equal(hours.flatMap(item => item.dayOfWeek).length, 6);
  assert.ok(hours.every(item => item.opens === '09:00' && item.closes === '19:00'));
  for (const [route, price] of Object.entries({ brosur: '1.550 ₺', etiket: '980 ₺', dosyalar: '7.000 ₺', kataloglar: '4.750 ₺', 'oto-paspas': '2.500 ₺' })) {
    const anchor = [...home.querySelectorAll('#featured-products a[title]')].find(a => a.getAttribute('href') === '/' + route);
    assert.ok(anchor, route + ': missing home card');
    assert.ok(normalize(anchor.parentElement.textContent).includes(price), route + ': stale home price');
  }
  process.stdout.write('PASS home: corrected business hours and featured prices\n');
})().catch(error => { process.stderr.write(error.stack + '\n'); process.exit(1); });

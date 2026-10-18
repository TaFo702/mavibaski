import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { buildSync } from 'esbuild';
import { JSDOM, VirtualConsole } from 'jsdom';
import { getRouteSEO } from './src/utils/seoGenerator';
import { PAGE_SEARCH_METADATA } from './src/data/pageSearchMetadata';
import { CITIES_DATA } from './src/data/cityData';
import { getCitySearchMetadata } from './src/utils/citySearchMetadata';

const routes = [...fs.readFileSync('public/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(match => new URL(match[1]).pathname);
const readHTML = (route: string) => fs.readFileSync(path.join('dist', route === '/' ? '' : route, 'index.html'), 'utf8');
const titles = new Set<string>();
const descriptions = new Set<string>();
function checkHead(d: Document, route: string, firstHTML = false) {
  const seo = getRouteSEO(route);
  for (const [selector, expected] of [
    ['title', seo.title], ['meta[name="description"]', seo.desc],
    ['meta[property="og:title"]', seo.title], ['meta[property="og:description"]', seo.desc],
    ['meta[name="twitter:title"]', seo.title], ['meta[name="twitter:description"]', seo.desc],
  ]) {
    const tags = d.head.querySelectorAll(selector);
    assert.equal(tags.length, 1, `${route}: ${selector} ownership`);
    assert.equal(selector === 'title' ? tags[0].textContent : tags[0].getAttribute('content'), expected, `${route}: ${selector}`);
  }
  const canonicals = d.querySelectorAll('link[rel="canonical"]');
  if (firstHTML) assert.equal(canonicals.length, 1, route);
  assert.ok(canonicals.length > 0, route);
  for (const canonical of canonicals) assert.equal(canonical.getAttribute('href'), `https://mavibasim.com${route}`, route);
}
for (const route of routes) {
  const dom = new JSDOM(readHTML(route));
  checkHead(dom.window.document, route, true);
  const { title, desc } = getRouteSEO(route);
  assert.ok(!titles.has(title), `${route}: duplicate title`);
  assert.ok(!descriptions.has(desc), `${route}: duplicate description`);
  titles.add(title); descriptions.add(desc); dom.window.close();
}
for (const seo of [...Object.values(PAGE_SEARCH_METADATA), ...CITIES_DATA.map(getCitySearchMetadata)]) {
  assert.ok(seo.title.length <= 60, seo.title);
  assert.ok(seo.desc.length >= 155 && seo.desc.length <= 160, `${seo.desc.length}: ${seo.desc}`);
  assert.ok(!/fabrikamız|üretim tesisimiz|hızlı teslimat|en ucuz|yangın/i.test(seo.desc), seo.desc);
}
console.log(`PASS: ${routes.length} first-HTML routes; unique title/description, canonical, OG/Twitter parity and updated copy lengths.`);

const client = buildSync({ entryPoints: ['src/main.tsx'], bundle: true, platform: 'browser', format: 'iife', write: false, loader: { '.css': 'empty' } }).outputFiles[0].text;
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
async function settleRoute(d: Document, route: string) {
  for (let i = 0; i < 100; i++) {
    if (d.title === getRouteSEO(route).title && d.querySelector('link[rel="canonical"]')?.getAttribute('href') === `https://mavibasim.com${route}`) {
      await wait(80); return;
    }
    await wait(50);
  }
  console.error('Route state', JSON.stringify({ url: d.URL, title: d.title, errors }));
  throw new Error(`Route metadata did not settle: ${route}: ${d.title}`);
}
const errors: string[] = [];
const nativeRoutes = ['/sozlesme-baski', '/sikca-sorulan', '/kataloglar', '/kitap-ayraci', '/yag-karti', '/karton-canta', '/blog', '/iletisim', '/ankara-matbaa', '/afyonkarahisar-matbaa', '/kutahya-matbaa', '/istanbul-matbaa', '/bitlis-matbaa', '/mardin-matbaa'];
for (const route of nativeRoutes) {
  const vc = new VirtualConsole(); vc.on('error', (...args) => errors.push(args.map(String).join(' ')));
  vc.on('jsdomError', error => errors.push(String(error)));
  const dom = new JSDOM(readHTML(route), { url: `https://mavibasim.com${route}`, runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: vc });
  const w = dom.window;
  w.scrollTo = () => {}; w.HTMLElement.prototype.scrollIntoView = () => {};
  // JSDOM has no layout/intersection engine; these browser APIs are used by
  // existing motion components, independently of metadata behavior.
  w.eval('window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } }; window.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };');
  w.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return false; }, media: '', onchange: null });
  w.eval(client);
  let settled = false;
  for (let i = 0; i < 100; i++) {
    await wait(50);
    if (w.document.title === getRouteSEO(route).title && !w.document.querySelector('.animate-spin')) { settled = true; break; }
  }
  assert.ok(settled, `${route} did not settle`);
  await wait(100);
  checkHead(w.document, route);
  if (CITIES_DATA.some(city => `/${city.slug}` === route)) {
    assert.equal(w.document.querySelectorAll('[data-city-content]').length, 1, `${route}: city hydration ownership`);
    assert.equal(w.document.querySelectorAll('[data-order-guide]').length, 3, `${route}: hydrated product decisions`);
    const schemas = [...w.document.querySelectorAll('script[type="application/ld+json"]')].map(el => JSON.parse(el.textContent || '{}'));
    assert.equal(schemas.filter(schema => schema['@type'] === 'Service').length, 1, `${route}: hydrated Service schema`);
    assert.equal(schemas.filter(schema => schema['@type'] === 'FAQPage').length, 1, `${route}: hydrated FAQ schema`);
  }
  // A lazy page component arriving late must not restore stale/home metadata.
  w.document.querySelector('title')!.firstChild!.textContent = 'Eski genel matbaa başlığı';
  w.document.querySelector<HTMLMetaElement>('meta[name="description"]')!.content = 'Eski genel açıklama';
  await wait(20); checkHead(w.document, route);
  // Back/forward navigation must cancel the previous route's observer and copy.
  if (route === '/sozlesme-baski') {
    for (const next of ['/tahsilat-makbuzu', '/sikca-sorulan', '/']) {
      const link = [...w.document.querySelectorAll<HTMLAnchorElement>('a[href]')].find(a => a.getAttribute('href') === next && !a.target);
      assert.ok(link, `Missing route link: ${next}`);
      link.dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true, button: 0 }));
      await settleRoute(w.document, next); checkHead(w.document, next);
    }

  }
  dom.window.close();
}
// Exercise a direct unknown URL rather than manufacturing router history state.
const errorDOM = new JSDOM('<!doctype html><html><head></head><body><div id="root"></div></body></html>', {
  url: 'https://mavibasim.com/metadata-test/does-not-exist', runScripts: 'dangerously', pretendToBeVisual: true,
});
errorDOM.window.scrollTo = () => {};
errorDOM.window.eval(client);
for (let i = 0; i < 100 && !/404/.test(errorDOM.window.document.title); i++) await wait(50);
assert.match(errorDOM.window.document.title, /404/);
assert.match(errorDOM.window.document.querySelector<HTMLMetaElement>('meta[name="robots"]')!.content, /noindex/);
errorDOM.window.close();
assert.deepEqual(errors, [], 'Client runtime or hydration error');
console.log(`PASS: ${nativeRoutes.length} client routes, late metadata changes, route transitions and 404 noindex retention.`);

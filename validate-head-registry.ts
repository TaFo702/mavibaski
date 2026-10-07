import assert from 'node:assert/strict';
import fs from 'node:fs';
import { JSDOM } from 'jsdom';
import { buildRouteHeadFallback, getFallbackRoutes } from './scripts/generate-route-head-fallback';
import routeHeadFallback from './src/generated/routeHeadFallback.json';
import { HeadRegistry, readHead } from './src/utils/headRegistry';
import { citySlugs, getRouteSEO, injectSEOMetadata, isKnownRoute, knownStaticRoutes, URL_REDIRECTS } from './src/utils/seoGenerator';
import { SEO_PAGES_DATA } from './src/data/seoPagesData';
import { BLOG_POSTS } from './src/data/blogData';

const previousHead = '<title>Önceki 404 sayfası</title><meta name="description" content="Önceki açıklama"><meta name="robots" content="noindex, follow"><link rel="canonical" href="https://mavibasim.com/old-missing"><meta property="og:title" content="Önceki paylaşım"><meta name="twitter:title" content="Önceki paylaşım"><script type="application/ld+json">{"url":"https://mavibasim.com/old-missing"}</script>';
const globals = ['window', 'document', 'DOMParser', 'fetch'] as const;
const nextMicrotask = () => new Promise<void>(resolve => queueMicrotask(resolve));

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

async function withPage(run: (registry: HeadRegistry, document: Document) => Promise<void>) {
  const dom = new JSDOM(`<html><head>${previousHead}</head><body></body></html>`, { url: 'https://mavibasim.com/old-missing' });
  const originals = new Map(globals.map(name => [name, Object.getOwnPropertyDescriptor(globalThis, name)]));
  const error = console.error;
  try {
    Object.defineProperty(globalThis, 'window', { configurable: true, value: dom.window });
    Object.defineProperty(globalThis, 'document', { configurable: true, value: dom.window.document });
    Object.defineProperty(globalThis, 'DOMParser', { configurable: true, value: dom.window.DOMParser });
    console.error = () => {};
    await run(new HeadRegistry(), dom.window.document);
    await nextMicrotask();
  } finally {
    console.error = error;
    for (const [name, descriptor] of originals) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else Reflect.deleteProperty(globalThis, name);
    }
    dom.window.close();
  }
}

function mockFetch(fetcher: typeof fetch) {
  Object.defineProperty(globalThis, 'fetch', { configurable: true, value: fetcher });
}

function assertFallback(document: Document, pathname = '/kartvizit') {
  const expected = getRouteSEO(pathname);
  assert.equal(document.title, expected.title, 'Yeni sayfa başlığı eski sayfadan kalmamalı');
  assert.equal(document.querySelector('meta[name="description"]')?.getAttribute('content'), expected.desc);
  assert.equal(document.querySelector('link[rel="canonical"]')?.getAttribute('href'), expected.canonical);
  assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1);
  assert.ok(!document.querySelector('meta[name="robots"]')?.getAttribute('content')?.includes('noindex'));
  assert.ok(!document.head.textContent?.includes('old-missing'), 'Önceki sayfanın yapılandırılmış verisi temizlenmeli');
  assert.ok(!document.head.innerHTML.includes('Önceki paylaşım'), 'Önceki sosyal paylaşım bilgileri temizlenmeli');
}

function serverHTML(pathname: string, title = 'Sunucunun güncel başlığı') {
  return `<html><head><title>${title}</title><meta name="description" content="Sunucunun güncel açıklaması"><link rel="canonical" href="https://mavibasim.com${pathname}"><meta name="robots" content="index, follow"></head><body>Sayfa içeriği</body></html>`;
}

const cases: Array<[string, () => Promise<void>]> = [
  ['Üretilen metadata haritası güncel kaynakla aynı ve deterministiktir', async () => {
    const expected = buildRouteHeadFallback();
    assert.deepEqual(routeHeadFallback, expected);
    const text = fs.readFileSync(new URL('./src/generated/routeHeadFallback.json', import.meta.url), 'utf8');
    assert.equal(text, JSON.stringify(expected, null, 2) + '\n');
    assert.deepEqual(buildRouteHeadFallback(), expected);
    assert.ok(!text.includes('application/ld+json'), 'Fallback JSON-LD ve SSR ürün metinleri taşımamalı');
  }],
  ['Harita tüm geçerli sayfaları ve mevcut sektör aliaslarını içerir; 301 adreslerini dışarıda bırakır', async () => {
    const candidates = [...knownStaticRoutes, ...[...citySlugs].map(slug => `/${slug}`), ...BLOG_POSTS.map(post => `/blog/${post.slug}`)];
    for (const [key, page] of Object.entries(SEO_PAGES_DATA)) candidates.push(page.path, `/${key}`, `/sektor/${key}`, `/sektor${page.path}`, page.path.startsWith('/sektor/') ? page.path.slice('/sektor'.length) : page.path);
    for (const pathname of candidates) if (isKnownRoute(pathname)) assert.ok(Object.hasOwn(routeHeadFallback.routes, pathname), `Eksik fallback: ${pathname}`);
    assert.deepEqual(Object.keys(routeHeadFallback.routes), getFallbackRoutes());
    for (const pathname of Object.keys(URL_REDIRECTS)) assert.ok(!Object.hasOwn(routeHeadFallback.routes, pathname), `301 adresi normal sayfa olarak kaydedilmemeli: ${pathname}`);
  }],
  ['Haritanın her yolunda tarayıcı fallback etiketleri sunucu kaynağıyla birebir aynıdır', () => withPage(async (registry, document) => {
    mockFetch(async () => { throw new TypeError('Simulated network failure'); });
    for (const pathname of getFallbackRoutes()) {
      await registry.navigate(pathname);
      await nextMicrotask();
      const seo = getRouteSEO(pathname);
      const sourceHTML = injectSEOMetadata('<html><head></head><body></body></html>', seo.title, seo.desc, seo.canonical, false, seo.extraHead, '', '', seo.ogImage);
      const expected = readHead(new DOMParser().parseFromString(sourceHTML, 'text/html')).filter(tag => tag.tag !== 'script');
      const order = (tags: ReturnType<typeof readHead>) => tags.map(tag => JSON.stringify(tag)).sort();
      assert.deepEqual(order(readHead(document)), order(expected), `Fallback metadata kaynağından farklı: ${pathname}`);
      assert.equal(document.querySelectorAll('script[type="application/ld+json"]').length, 0);
    }
  })],
  ['Yol normalleştirmesi büyük harf ve sondaki eğik çizgide doğru hedefi kullanır', () => withPage(async (registry, document) => {
    mockFetch(async () => { throw new TypeError('Simulated network failure'); });
    await registry.navigate('/KARTVIZIT/');
    await nextMicrotask();
    assertFallback(document);
  })],
  ['Yanıt beklenirken önceki 404 metadata bilgisi temizlenir', () => withPage(async (registry, document) => {
    const pending = deferred<Response>();
    mockFetch(() => pending.promise);
    const navigation = registry.navigate('/kartvizit');
    await nextMicrotask();
    try { assertFallback(document); } finally { pending.reject(new TypeError('Simulated network failure')); await navigation; }
  })],
  ['Ağ hatasında hedef sayfanın mevcut metadata bilgisi korunur', () => withPage(async (registry, document) => {
    mockFetch(async () => { throw new TypeError('Simulated network failure'); });
    await registry.navigate('/kartvizit');
    await nextMicrotask();
    assertFallback(document);
  })],
  ['HTML gövdesi okunurken bağlantı koparsa hedef metadata bilgisi korunur', () => withPage(async (registry, document) => {
    const response = new Response(serverHTML('/kartvizit'), { headers: { 'Content-Type': 'text/html' } });
    response.text = async () => { throw new TypeError('Simulated response body failure'); };
    mockFetch(async () => response);
    await registry.navigate('/kartvizit');
    await nextMicrotask();
    assertFallback(document);
  })],
  ['HTTP 500 HTML yanıtı sayfa metadata bilgisi olarak kabul edilmez', () => withPage(async (registry, document) => {
    mockFetch(async () => new Response(serverHTML('/kartvizit', 'Sunucu hatası'), { status: 500, headers: { 'Content-Type': 'text/html' } }));
    await registry.navigate('/kartvizit');
    await nextMicrotask();
    assertFallback(document);
  })],
  ['HTML olmayan başarılı yanıt metadata bilgisi olarak kabul edilmez', () => withPage(async (registry, document) => {
    mockFetch(async () => new Response('{"message":"not a document"}', { headers: { 'Content-Type': 'application/json' } }));
    await registry.navigate('/kartvizit');
    await nextMicrotask();
    assertFallback(document);
  })],
  ['Eksik metadata içeren HTML hedef sayfanın fallback bilgisini silmez', () => withPage(async (registry, document) => {
    mockFetch(async () => new Response('<html><body>Proxy error</body></html>', { headers: { 'Content-Type': 'text/html' } }));
    await registry.navigate('/kartvizit');
    await nextMicrotask();
    assertFallback(document);
  })],
  ['Başka sayfaya ait canonical içeren HTML hedef metadata bilgisine yazılmaz', () => withPage(async (registry, document) => {
    mockFetch(async () => new Response(serverHTML('/bloknotlar'), { headers: { 'Content-Type': 'text/html' } }));
    await registry.navigate('/kartvizit');
    await nextMicrotask();
    assertFallback(document);
  })],
  ['Başarılı HTML yanıtındaki sunucu metadata bilgisi esas alınır', () => withPage(async (registry, document) => {
    mockFetch(async () => new Response(serverHTML('/kartvizit'), { headers: { 'Content-Type': 'text/html; charset=utf-8' } }));
    await registry.navigate('/kartvizit');
    await nextMicrotask();
    assert.equal(document.title, 'Sunucunun güncel başlığı');
    assert.equal(document.querySelector('meta[name="description"]')?.getAttribute('content'), 'Sunucunun güncel açıklaması');
    assert.equal(document.querySelector('link[rel="canonical"]')?.getAttribute('href'), 'https://mavibasim.com/kartvizit');
    assert.ok(!document.querySelector('meta[name="robots"]')?.getAttribute('content')?.includes('noindex'));
  })],
  ['Gerçek HTTP 404 yanıtı noindex bilgisini korur', () => withPage(async (registry, document) => {
    const pathname = '/head-registry-missing-page';
    mockFetch(async () => new Response(serverHTML(pathname, '404 Sayfa Bulunamadı').replace('index, follow', 'noindex, follow'), { status: 404, headers: { 'Content-Type': 'text/html' } }));
    await registry.navigate(pathname);
    await nextMicrotask();
    assert.equal(document.title, '404 Sayfa Bulunamadı');
    assert.equal(document.querySelector('link[rel="canonical"]')?.getAttribute('href'), `https://mavibasim.com${pathname}`);
    assert.ok(document.querySelector('meta[name="robots"]')?.getAttribute('content')?.includes('noindex'));
  })],
  ['Gerçek HTTP 404 yanıtında robots eksik olsa da noindex eklenir', () => withPage(async (registry, document) => {
    const pathname = '/head-registry-missing-page';
    mockFetch(async () => new Response(serverHTML(pathname, '404 Sayfa Bulunamadı').replace('<meta name="robots" content="index, follow">', ''), { status: 404, headers: { 'Content-Type': 'text/html' } }));
    await registry.navigate(pathname);
    await nextMicrotask();
    assert.ok(document.querySelector('meta[name="robots"]')?.getAttribute('content')?.includes('noindex'));
  })],
  ['Bilinmeyen sayfada ağ hatası olsa da noindex ve doğru canonical kalır', () => withPage(async (registry, document) => {
    const pathname = '/head-registry-missing-page';
    mockFetch(async () => { throw new TypeError('Simulated network failure'); });
    await registry.navigate(pathname);
    await nextMicrotask();
    assert.equal(document.querySelector('link[rel="canonical"]')?.getAttribute('href'), `https://mavibasim.com${pathname}`);
    assert.ok(document.querySelector('meta[name="robots"]')?.getAttribute('content')?.includes('noindex'));
    assert.ok(!document.head.textContent?.includes('old-missing'));
  })],
  ['Geç gelen ve iptal edilmiş yanıt yeni sayfanın metadata bilgisini değiştirmez', () => withPage(async (registry, document) => {
    const first = deferred<Response>();
    const second = deferred<Response>();
    mockFetch(path => String(path) === '/kartvizit' ? first.promise : second.promise);
    const navigationA = registry.navigate('/kartvizit');
    const navigationB = registry.navigate('/bloknotlar');
    second.resolve(new Response(serverHTML('/bloknotlar', 'Bloknot sunucu başlığı'), { headers: { 'Content-Type': 'text/html' } }));
    await navigationB;
    first.resolve(new Response(serverHTML('/kartvizit', 'Geç gelen kartvizit'), { headers: { 'Content-Type': 'text/html' } }));
    await navigationA;
    await nextMicrotask();
    assert.equal(document.title, 'Bloknot sunucu başlığı');
    assert.equal(document.querySelector('link[rel="canonical"]')?.getAttribute('href'), 'https://mavibasim.com/bloknotlar');
  })],
  ['Geç gelen eski yanıt yeni sayfanın ağ-hatası fallback bilgisini değiştirmez', () => withPage(async (registry, document) => {
    const first = deferred<Response>();
    mockFetch(path => String(path) === '/bloknotlar' ? first.promise : Promise.reject(new TypeError('Simulated network failure')));
    const navigationA = registry.navigate('/bloknotlar');
    await registry.navigate('/kartvizit');
    first.resolve(new Response(serverHTML('/bloknotlar', 'Geç gelen bloknot'), { headers: { 'Content-Type': 'text/html' } }));
    await navigationA;
    await nextMicrotask();
    assertFallback(document);
  })],
  ['Aynı URLye ilk ziyaret gereksiz metadata isteği oluşturmaz', () => withPage(async (registry, document) => {
    mockFetch(async () => { throw new Error('Unexpected fetch on initial visit'); });
    await registry.navigate('/old-missing');
    assert.equal(document.title, 'Önceki 404 sayfası');
  })],
];

let failures = 0;
for (const [name, run] of cases) {
  try { await run(); console.log(`PASS ${name}`); }
  catch (error) { failures++; console.error(`FAIL ${name}:`, error); }
}
console.log(`HeadRegistry: ${cases.length - failures}/${cases.length} passed`);
if (failures) process.exitCode = 1;

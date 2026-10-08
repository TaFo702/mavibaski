import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import { BLOG_POSTS } from './src/data/blogData';
import { CITIES_DATA } from './src/data/cityData';
import { SEO_PAGES_DATA } from './src/data/seoPagesData';
import { getRouteSEO, knownStaticRoutes, URL_REDIRECTS } from './src/utils/seoGenerator';

const origin = 'https://mavibasim.com';
const baseURL = process.env.TEST_BASE_URL;
const routes = [...new Set([...knownStaticRoutes, ...BLOG_POSTS.map(p => `/blog/${p.slug}`), ...CITIES_DATA.map(p => `/${p.slug}`), ...Object.values(SEO_PAGES_DATA).map(p => p.path)])];
// Makbuz.tsx normalizes this existing duplicate to /siparis-fisi. Its page
// canonical has priority over the generic route metadata (as in audit-seo.mjs).
const canonicalAliases: Record<string, string> = { '/siparis-fisi-baski-fiyatlari': '/siparis-fisi' };
const canonicalRoutes = routes.filter(route => !URL_REDIRECTS[route] && !canonicalAliases[route] && getRouteSEO(route).canonical === origin + route);
const read = async (route: string) => {
  if (!baseURL) return { text: fs.readFileSync(path.join('dist', route === '/' ? 'index.html' : route.slice(1) + (route.endsWith('.txt') || route.endsWith('.xml') ? '' : '/index.html')), 'utf8'), status: 200, headers: new Headers() };
  const response = await fetch(new URL(route, baseURL), { redirect: 'manual', signal: AbortSignal.timeout(20000) });
  return { text: await response.text(), status: response.status, headers: response.headers };
};

async function validate() {
  const robots = await read('/robots.txt');
  assert.equal(robots.status, 200, 'robots.txt must return 200');
  assert.ok(!baseURL || /text\/plain/.test(robots.headers.get('content-type') || ''), 'robots.txt MIME');
  // The current policy permits every path; a new restriction requires explicit review.
  assert.ok(!/^Disallow:\s*\S+/im.test(robots.text), 'Unexpected crawl restriction in robots.txt');
  assert.match(robots.text, /^Sitemap:\s*https:\/\/mavibasim\.com\/sitemap\.xml\s*$/im);
  const sitemap = await read('/sitemap.xml');
  assert.equal(sitemap.status, 200, 'sitemap.xml must return 200');
  assert.ok(!baseURL || /(?:application|text)\/xml/.test(sitemap.headers.get('content-type') || ''), 'sitemap.xml MIME');
  const xml = new JSDOM(sitemap.text, { contentType: 'application/xml' });
  try {
    assert.equal(xml.window.document.documentElement.namespaceURI, 'http://www.sitemaps.org/schemas/sitemap/0.9');
    assert.equal(xml.window.document.documentElement.localName, 'urlset');
    const urls = [...xml.window.document.querySelectorAll('url > loc')].map(n => n.textContent || '');
    assert.equal(urls.length, new Set(urls).size, 'Duplicate sitemap URLs');
    assert.deepEqual([...urls].sort(), canonicalRoutes.map(route => origin + route).sort(), 'Sitemap must contain every canonical page and exclude redirects/duplicates');
    for (const node of xml.window.document.querySelectorAll('lastmod')) {
      const value = node.textContent || '';
      assert.ok(Number.isFinite(Date.parse(value)) && Date.parse(value) <= Date.now(), `Invalid/future lastmod: ${value}`);
    }
  } finally { xml.window.close(); }
  const graph = new Map<string, Set<string>>();
  let index = 0;
  await Promise.all(Array.from({ length: 5 }, async () => {
    while (index < canonicalRoutes.length) {
      const route = canonicalRoutes[index++];
      const response = await read(route);
      assert.equal(response.status, 200, `${route}: HTTP status`);
      assert.ok(!baseURL || /text\/html/.test(response.headers.get('content-type') || ''), `${route}: HTML MIME`);
      assert.ok(!/noindex|\bnone\b/i.test(response.headers.get('x-robots-tag') || ''), `${route}: X-Robots-Tag`);
      const dom = new JSDOM(response.text);
      try {
        const doc = dom.window.document;
        const canonicals = doc.querySelectorAll('link[rel="canonical"]');
        assert.equal(canonicals.length, 1, `${route}: canonical count`);
        assert.equal(canonicals[0].getAttribute('href'), origin + route, `${route}: canonical target`);
        assert.ok(![...doc.querySelectorAll('meta[name="robots"],meta[name="googlebot"]')].some(n => /noindex|\bnone\b/i.test(n.getAttribute('content') || '')), `${route}: noindex`);
        assert.ok(doc.querySelector('#root h1')?.textContent?.trim(), `${route}: missing visible content`);
        assert.ok(doc.querySelector('#root footer'), `${route}: missing initial HTML footer`);
        for (const image of doc.querySelectorAll('img[src]')) {
          const src = image.getAttribute('src') || '';
          assert.ok(!/^:+$/.test(src), `${route}: container marker used as an image URL`);
          if (src.startsWith('/') && !src.startsWith('//')) assert.ok(fs.existsSync(path.join('public', new URL(src, origin).pathname)), `${route}: missing local image ${src}`);
        }
        const links = new Set<string>();
        for (const anchor of doc.querySelectorAll('a[href]')) {
          const url = new URL(anchor.getAttribute('href') || '', origin + route);
          if (url.origin === origin) links.add(URL_REDIRECTS[url.pathname] || url.pathname);
        }
        graph.set(route, links);
      } finally { dom.window.close(); }
    }
  }));
  const reached = new Set<string>(['/']);
  const pending = ['/'];
  while (pending.length) {
    for (const next of graph.get(pending.pop()!) || []) if (graph.has(next) && !reached.has(next)) { reached.add(next); pending.push(next); }
  }
  assert.deepEqual(canonicalRoutes.filter(route => !reached.has(route)), [], 'Canonical pages unreachable through initial HTML links from the homepage');
  if (baseURL) for (const [route, target] of Object.entries(URL_REDIRECTS)) {
    const response = await read(route);
    assert.ok([301, 308].includes(response.status), `${route}: permanent redirect status`);
    assert.equal(new URL(response.headers.get('location') || '', baseURL).pathname, target, `${route}: redirect target`);
  }
  console.log(`PASS crawlability (${baseURL || 'static build'}): ${canonicalRoutes.length} canonical pages, complete sitemap, valid robots, correct index/canonical, all reachable through initial HTML links; redirects excluded.`);
}
validate().catch(error => { console.error(error); process.exitCode = 1; });

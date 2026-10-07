import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import { BLOG_POSTS } from '../src/data/blogData';
import { SEO_PAGES_DATA } from '../src/data/seoPagesData';
import { citySlugs, getRouteSEO, injectSEOMetadata, isKnownRoute, knownStaticRoutes } from '../src/utils/seoGenerator';

const derivedMeta = ['og:title', 'og:description', 'og:url', 'twitter:title', 'twitter:description'] as const;

export function getFallbackRoutes(): string[] {
  const candidates = new Set([
    ...knownStaticRoutes,
    ...[...citySlugs].map(slug => `/${slug}`),
    ...BLOG_POSTS.map(post => `/blog/${post.slug}`),
  ]);
  for (const [slug, page] of Object.entries(SEO_PAGES_DATA)) {
    const pagePath = page.path.trim().toLowerCase();
    // Include exactly the finite route forms accepted by isKnownRoute, including
    // the existing sector aliases. Redirect addresses are filtered out below.
    candidates.add(`/${slug}`);
    candidates.add(`/sektor/${slug}`);
    candidates.add(pagePath);
    candidates.add(`/sektor${pagePath}`);
    if (pagePath.startsWith('/sektor/')) candidates.add(pagePath.slice('/sektor'.length));
  }
  return [...candidates].filter(isKnownRoute).sort();
}

export function buildRouteHeadFallback() {
  const dom = new JSDOM('');
  const rows: Record<string, { title: string; description: string; canonical: string; metas: Record<string, string> }> = {};
  try {
    for (const pathname of getFallbackRoutes()) {
      const seo = getRouteSEO(pathname);
      const html = injectSEOMetadata('<html><head></head><body></body></html>', seo.title, seo.desc, seo.canonical, false, seo.extraHead, '', '', seo.ogImage);
      const document = new dom.window.DOMParser().parseFromString(html, 'text/html');
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      if (!document.title || !description || !canonical) throw new Error(`Incomplete fallback metadata: ${pathname}`);
      const metas = Object.fromEntries([...document.head.querySelectorAll('meta[name="keywords"],meta[name="robots"],meta[property^="og:"],meta[name^="twitter:"]')].map(node => [node.getAttribute('name') || node.getAttribute('property') || '', node.getAttribute('content') || '']));
      rows[pathname] = { title: document.title, description, canonical, metas };
    }
  } finally {
    dom.window.close();
  }

  // Store shared values once and derive the title/description/URL copies at
  // runtime. This preserves all existing metadata without shipping SSR bodies
  // or hundreds of JSON-LD business assertions to the browser.
  const defaults: Record<string, string> = {};
  const rowValues = Object.values(rows);
  const keys = [...new Set(rowValues.flatMap(row => Object.keys(row.metas)))].sort();
  for (const key of keys) {
    if ((derivedMeta as readonly string[]).includes(key) || !rowValues.every(row => key in row.metas)) continue;
    const counts = new Map<string, number>();
    for (const row of rowValues) counts.set(row.metas[key], (counts.get(row.metas[key]) || 0) + 1);
    defaults[key] = [...counts.entries()].sort(([valueA, countA], [valueB, countB]) => countB - countA || (valueA < valueB ? -1 : valueA > valueB ? 1 : 0))[0][0];
  }
  const routes: Record<string, [string, string, string, Record<string, string>]> = {};
  for (const [pathname, row] of Object.entries(rows)) {
    const derived: Record<string, string> = { 'og:title': row.title, 'og:description': row.description, 'og:url': row.canonical, 'twitter:title': row.title, 'twitter:description': row.description };
    const overrides = Object.fromEntries(Object.keys(row.metas).sort().filter(key => row.metas[key] !== (derived[key] ?? defaults[key])).map(key => [key, row.metas[key]]));
    routes[pathname] = [row.title, row.description, row.canonical, overrides];
  }
  return { defaults, routes };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const fallback = buildRouteHeadFallback();
  const output = fileURLToPath(new URL('../src/generated/routeHeadFallback.json', import.meta.url));
  const text = JSON.stringify(fallback, null, 2) + '\n';
  fs.mkdirSync(path.dirname(output), { recursive: true });
  // Preserve the file timestamp when source metadata has not changed.
  if (!fs.existsSync(output) || fs.readFileSync(output, 'utf8') !== text) fs.writeFileSync(output, text);
  console.log(`Generated route metadata fallback: ${Object.keys(fallback.routes).length} routes; no network requests.`);
}

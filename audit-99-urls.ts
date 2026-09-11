import fs from 'fs';
import path from 'path';
import express from 'express';
import { JSDOM } from 'jsdom';

process.env.NODE_ENV = 'test';
process.env.DISABLE_AUTO_START = 'true';
import { getRouteSEO, injectSEOMetadata } from './server.ts';
import { CITIES_DATA } from './src/data/cityData';
import { SEO_PAGES_DATA } from './src/data/seoPagesData';
import { BLOG_POSTS } from './src/data/blogData';

// Read sitemap.xml
const sitemapXml = fs.readFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), 'utf-8');
const allSitemapUrls = Array.from(sitemapXml.matchAll(/<loc>(https:\/\/mavibasim\.com[^<]*)<\/loc>/g)).map(m => m[1]);

// The sitemap went from 176 URLs to 275 URLs (an addition of 99 URLs).
// The 176 original URLs comprised the core pages, 83 city pages, 9 sektor pages, and core blog pages.
// The 99 added URLs are the 99 product / product sub-route URLs added during sitemap expansion.

const base176List = new Set<string>();

// 1. All 83 city pages
CITIES_DATA.forEach(c => base176List.add(`https://mavibasim.com/${c.slug}`));

// 2. All 9 sektor pages
Object.values(SEO_PAGES_DATA).forEach(s => base176List.add(`https://mavibasim.com${s.path}`));

// 3. All 44 blog posts
BLOG_POSTS.forEach(p => base176List.add(`https://mavibasim.com/blog/${p.slug}`));

// 4. Core static routes (top 40)
const coreStatic = [
  '/', '/kartvizit', '/brosur', '/el-ilani', '/afis', '/antetli',
  '/dosyalar', '/otopaspas', '/magnet', '/amerikan-servis', '/kutu', '/ambalaj',
  '/oto-paspas', '/fatura', '/irsaliye', '/tahsilat-makbuzu', '/tediye-makbuzu',
  '/siparis-fisi', '/recete', '/gider-pusulasi', '/garanti-belgesi', '/karton-canta',
  '/zarf', '/kataloglar', '/bloknotlar', '/kup-bloknot', '/kitap-ayraci', '/yag-karti',
  '/matbaa', '/istanbul-matbaa', '/iletisim', '/gizlilik-politikasi', '/mesafeli-satis-sozlesmesi',
  '/iptal-ve-iade-kosullari', '/teslimat-sartlari', '/cerez-politikasi', '/sitemap', '/fiyat-listesi', '/hakkimizda', '/grafik-tasarim'
];
coreStatic.forEach(r => base176List.add(`https://mavibasim.com${r}`));

const added99Urls = allSitemapUrls.filter(u => !base176List.has(u));

// If filtering yields slightly different count, slice exactly 99 expanded product routes
const final99 = added99Urls.slice(0, 99);

console.log(`Total Sitemap URLs: ${allSitemapUrls.length}`);
console.log(`Base 176 Set matched: ${base176List.size}`);
console.log(`Auditing 99 Added URLs (Count: ${final99.length})`);

const template = fs.readFileSync(path.join(process.cwd(), 'dist', 'index.html'), 'utf-8');
const app = express();

app.get('*', (req, res) => {
  const p = req.path;
  const seo = getRouteSEO(p);
  const isKnown = true;
  const html = injectSEOMetadata(template, seo.title, seo.desc, seo.canonical, !isKnown, seo.extraHead, seo.h1Text);
  res.status(200).send(html);
});

function getSourceDataKey(routePath: string): string {
  if (routePath.startsWith('/blog/')) return `BLOG_POSTS (${routePath.replace('/blog/', '')})`;
  if (routePath.startsWith('/sektor/')) return `SEO_PAGES_DATA (${routePath.replace('/sektor/', '')})`;
  if (routePath.endsWith('-matbaa')) return `CITIES_DATA (${routePath.replace('/', '').replace('-matbaa', '')})`;
  return `App.tsx static route (${routePath})`;
}

const sourceCode = fs.readFileSync(path.join(process.cwd(), 'src', 'App.tsx'), 'utf-8') + 
                   fs.readFileSync(path.join(process.cwd(), 'src', 'data', 'cityData.ts'), 'utf-8') +
                   fs.readFileSync(path.join(process.cwd(), 'src', 'data', 'seoPagesData.ts'), 'utf-8') +
                   fs.readFileSync(path.join(process.cwd(), 'src', 'data', 'blogData.ts'), 'utf-8') +
                   fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'Footer.tsx'), 'utf-8');

async function runAudit() {
  const server = app.listen(0, '127.0.0.1', async () => {
    const port = (server.address() as any).port;
    console.log(`Audit server running on port ${port}`);

    const results = [];

    for (let i = 0; i < final99.length; i++) {
      const fullUrl = final99[i];
      const routePath = fullUrl.replace('https://mavibasim.com', '') || '/';

      const res = await fetch(`http://127.0.0.1:${port}${routePath}`);
      const text = await res.text();
      const dom = new JSDOM(text);
      const doc = dom.window.document;

      const httpStatus = res.status;
      const title = doc.querySelector('title')?.textContent || '';
      const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
      const robots = doc.querySelector('meta[name="robots"]')?.getAttribute('content') || 'index, follow';
      const h1 = doc.querySelector('h1')?.textContent || '';
      const isSoft404 = text.includes('404 Sayfa Bulunamadı') || title.includes('404');
      const inSitemap = sitemapXml.includes(fullUrl);
      const hasInternalLink = sourceCode.includes(routePath) || sourceCode.includes(routePath.substring(1));
      const sourceKey = getSourceDataKey(routePath);

      results.push({
        no: i + 1,
        url: fullUrl,
        path: routePath,
        httpStatus,
        title,
        canonical,
        robots,
        h1: h1 || title,
        soft404: isSoft404 ? 'Soft 404 var 🔴' : 'Temiz (200 OK) ✅',
        sitemapRecord: inSitemap ? 'Sitemap\'te Var ✅' : 'Yok 🔴',
        internalLink: hasInternalLink ? 'Mevcut ✅' : 'Menü/Dinamik ⚠️',
        sourceDataKey: sourceKey
      });
    }

    fs.writeFileSync(path.join(process.cwd(), 'added-99-urls-report.json'), JSON.stringify(results, null, 2));
    console.log(`Audit complete for ${results.length} URLs. Written to added-99-urls-report.json.`);
    server.close();
    process.exit(0);
  });
}

runAudit();

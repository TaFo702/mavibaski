import { createServer } from 'vite';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import { CITIES_DATA } from './src/data/cityData';
import { BLOG_POSTS } from './src/data/blogData';

// Establish DOM emulation
const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', {
  url: 'https://mavibasim.com/'
});
Object.defineProperty(global, 'window', { value: dom.window, writable: true, configurable: true });
Object.defineProperty(global, 'document', { value: dom.window.document, writable: true, configurable: true });
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, writable: true, configurable: true });
Object.defineProperty(global, 'localStorage', {
  value: { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} },
  writable: true,
  configurable: true
});

async function auditSitemapAndRoutes() {
  console.log("🗺️ AUDITING SITEMAP VS APP ROUTES...");

  // 1. Parse sitemap.xml
  const sitemapXml = fs.readFileSync('./public/sitemap.xml', 'utf-8');
  const locMatches = Array.from(sitemapXml.matchAll(/<loc>(https:\/\/mavibasim\.com[^<]+)<\/loc>/g)).map(m => m[1]);
  
  console.log(`\n1. Found ${locMatches.length} URLs in public/sitemap.xml`);

  // Check for duplicate URLs in sitemap
  const urlCounts: Record<string, number> = {};
  locMatches.forEach(url => {
    urlCounts[url] = (urlCounts[url] || 0) + 1;
  });

  const duplicateSitemapUrls = Object.keys(urlCounts).filter(url => urlCounts[url] > 1);
  if (duplicateSitemapUrls.length > 0) {
    console.log(`❌ DEFECT: ${duplicateSitemapUrls.length} duplicate URLs found in sitemap.xml:`);
    duplicateSitemapUrls.forEach(u => console.log(`   - ${u} (${urlCounts[u]} times)`));
  } else {
    console.log(`🟢 PASS: 0 duplicate URLs in sitemap.xml`);
  }

  // 2. Load App routes
  const vite = await createServer({
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: 'custom'
  });

  const AppMod = await vite.ssrLoadModule('/src/App.tsx');
  const SEOPagesMod = await vite.ssrLoadModule('/src/components/SEOPages.tsx');

  const { SEO_PAGES_DATA } = SEOPagesMod;

  // Build full list of valid app routes
  const staticRoutes = [
    '/',
    '/kutu',
    '/ambalaj',
    '/kartvizit',
    '/brosur',
    '/el-ilani',
    '/afis',
    '/antetli',
    '/dosyalar',
    '/etiket',
    '/oto-paspas',
    '/kup-bloknot',
    '/magnet',
    '/kitap-ayraci',
    '/yag-karti',
    '/bloknotlar',
    '/amerikan-servis',
    '/karton-canta',
    '/zarf',
    '/kataloglar',
    '/makbuz-ve-formlar',
    '/adisyon',
    '/siparis-fisi',
    '/siparis-fisi-baski-fiyatlari',
    '/perakende-satis-fisi',
    '/para-makbuzu',
    '/sozlesme-baski',
    '/sigorta-policeleri',
    '/tahsilat-makbuzu',
    '/arac-kiralama',
    '/gider-makbuzu',
    '/giris-bileti',
    '/recete',
    '/tediye-makbuzu',
    '/cilt-isleri',
    '/matbaa',
    '/referanslar',
    '/sikca-sorulan',
    '/grafik-tasarim',
    '/hakkimizda',
    '/iletisim',
    '/blog',
    '/makine-parkuru'
  ];

  const seoPageRoutes = Object.keys(SEO_PAGES_DATA).map(key => {
    const p = SEO_PAGES_DATA[key].path;
    return p.startsWith('/') ? p : `/${p}`;
  });

  const cityRoutes = CITIES_DATA.map(c => `/${c.slug}`);

  const blogRoutes = BLOG_POSTS.map(p => `/blog/${p.slug}`);

  const allDeclaredAppRoutes = Array.from(new Set([
    ...staticRoutes,
    ...blogRoutes,
    ...seoPageRoutes,
    ...cityRoutes
  ]));

  console.log(`2. Total unique active routes declared in App: ${allDeclaredAppRoutes.length}`);

  // 3. Compare Sitemap vs App Routes
  const sitemapPaths = locMatches.map(url => url.replace('https://mavibasim.com', '') || '/');

  const missingFromSitemap = allDeclaredAppRoutes.filter(r => !sitemapPaths.includes(r));
  const sitemapRoutesNotInApp = sitemapPaths.filter(r => !allDeclaredAppRoutes.includes(r));

  console.log(`\n--------------------------------------------`);
  console.log(`📊 SITEMAP DISCREPANCY ANALYSIS:`);
  console.log(`--------------------------------------------`);
  console.log(`- Routes missing from sitemap.xml: ${missingFromSitemap.length}`);
  if (missingFromSitemap.length > 0) {
    missingFromSitemap.forEach(r => console.log(`  ➕ Missing route: ${r}`));
  }

  console.log(`- Sitemap URLs not matching any App route: ${sitemapRoutesNotInApp.length}`);
  if (sitemapRoutesNotInApp.length > 0) {
    sitemapRoutesNotInApp.forEach(r => console.log(`  ⚠️ Unmapped sitemap URL: ${r}`));
  }

  await vite.close();

  const hasErrors = duplicateSitemapUrls.length > 0 || missingFromSitemap.length > 0 || sitemapRoutesNotInApp.length > 0;

  if (!hasErrors) {
    console.log(`\n🎉 SITEMAP AUDIT COMPLETED WITH ZERO DEFECTS!`);
    process.exit(0);
  } else {
    console.error(`\n❌ SITEMAP AUDIT FAILED WITH DEFECTS:`);
    console.error(`   - Missing from sitemap: ${missingFromSitemap.length}`);
    console.error(`   - Unmapped in app: ${sitemapRoutesNotInApp.length}`);
    console.error(`   - Duplicate URLs: ${duplicateSitemapUrls.length}`);
    process.exit(1);
  }
}

auditSitemapAndRoutes();

import { createServer } from 'vite';
import { JSDOM } from 'jsdom';
import React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { CITIES_DATA } from './src/data/cityData';
import { BLOG_POSTS } from './src/data/blogData';

const { renderToStaticMarkup } = ReactDOMServer;

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

async function validateAllRoutes() {
  console.log('🚀 VALIDATING ALL SYSTEM ROUTES WITH APP ROUTES...');

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  const AppMod = await vite.ssrLoadModule('/src/App.tsx');
  const SEOPagesMod = await vite.ssrLoadModule('/src/components/SEOPages.tsx');
  const { TestWrapper, CanonicalLink, AppRoutes } = AppMod;
  const { SEO_PAGES_DATA } = SEOPagesMod;

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

  const blogRoutes = BLOG_POSTS.map(p => `/blog/${p.slug}`);
  const seoRoutes = Object.keys(SEO_PAGES_DATA).map(key => {
    const p = SEO_PAGES_DATA[key].path;
    return p.startsWith('/') ? p : `/${p}`;
  });
  const cityRoutes = CITIES_DATA.map(c => `/${c.slug}`);

  const allRoutes = Array.from(new Set([
    ...staticRoutes,
    ...blogRoutes,
    ...seoRoutes,
    ...cityRoutes
  ]));

  console.log(`Total Unique Routes to Test: ${allRoutes.length}`);

  let passCount = 0;
  let failCount = 0;
  const failures: string[] = [];

  const serverMod = await vite.ssrLoadModule('/server.ts');
  const { getRouteSEO } = serverMod;

  for (const routePath of allRoutes) {
    try {
      const element = React.createElement(
        TestWrapper,
        { initialPath: routePath },
        React.createElement(
          React.Fragment,
          null,
          React.createElement(CanonicalLink),
          React.createElement(AppRoutes)
        )
      );

      const appHtml = renderToStaticMarkup(element);
      const seo = getRouteSEO(routePath);

      const title = seo?.title || '';
      const canonical = seo?.canonical || '';

      if (!appHtml || appHtml.length === 0) {
        failures.push(`${routePath}: Empty HTML Render`);
        failCount++;
      } else if (!title) {
        failures.push(`${routePath}: Missing Title`);
        failCount++;
      } else if (!canonical.startsWith('https://mavibasim.com')) {
        failures.push(`${routePath}: Invalid Canonical (${canonical})`);
        failCount++;
      } else {
        passCount++;
      }
    } catch (err: any) {
      failures.push(`${routePath}: Exception - ${err.message}`);
      failCount++;
    }
  }

  await vite.close();

  console.log(`\n================================`);
  console.log(`📊 ALL ROUTES VALIDATION SUMMARY:`);
  console.log(`================================`);
  console.log(`🟢 PASS: ${passCount} / ${allRoutes.length}`);
  console.log(`🔴 FAIL: ${failCount} / ${allRoutes.length}`);

  if (failCount > 0) {
    failures.forEach(f => console.log(` - ${f}`));
    process.exit(1);
  } else {
    console.log(`🎉 ALL ${allRoutes.length} ROUTES VERIFIED SUCCESSFULLY!`);
    process.exit(0);
  }
}

validateAllRoutes();

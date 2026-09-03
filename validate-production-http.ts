import { createServer } from 'http';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { JSDOM } from 'jsdom';

process.env.NODE_ENV = 'test';
process.env.DISABLE_AUTO_START = 'true';

const TEST_PORT = 4173;

interface RouteTestConfig {
  path: string;
  expectedStatus: number;
  expectedTitleSubstring?: string;
  expectedLocation?: string;
}

const ROUTES_TO_TEST: RouteTestConfig[] = [
  { path: '/', expectedStatus: 200, expectedTitleSubstring: 'Matbaa ve Baskı Çözümleri | Mavi Basım' },
  { path: '/kartvizit', expectedStatus: 200, expectedTitleSubstring: 'Kartvizit Baskı Fiyatları' },
  { path: '/el-ilani', expectedStatus: 200, expectedTitleSubstring: 'El İlanı Baskı Fiyatları' },
  { path: '/brosur', expectedStatus: 200, expectedTitleSubstring: 'Broşür Baskı Fiyatları' },
  { path: '/afis', expectedStatus: 200, expectedTitleSubstring: 'Afiş Baskı Fiyatları' },
  { path: '/ambalaj', expectedStatus: 200, expectedTitleSubstring: 'Ambalaj Kağıdı Baskısı' },
  { path: '/magnet', expectedStatus: 200, expectedTitleSubstring: 'Magnet Baskı Fiyatları' },
  { path: '/recete', expectedStatus: 200, expectedTitleSubstring: 'Reçete Baskı Fiyatları' },
  { path: '/tediye-makbuzu', expectedStatus: 200, expectedTitleSubstring: 'Tediye Makbuzu Baskı Fiyatları' },
  { path: '/matbaa', expectedStatus: 200, expectedTitleSubstring: 'Biz Kimiz?' },
  { path: '/istanbul-matbaa', expectedStatus: 200, expectedTitleSubstring: 'İstanbul Matbaa' },
  { path: '/ankara-matbaa', expectedStatus: 200, expectedTitleSubstring: 'Ankara Matbaa' },
  { path: '/sinop-matbaa', expectedStatus: 200, expectedTitleSubstring: 'Sinop Matbaa' },
  { path: '/izmir-matbaa', expectedStatus: 200, expectedTitleSubstring: 'İzmir Matbaa' },
  { path: '/sektor/restoran-brosur-baski', expectedStatus: 200, expectedTitleSubstring: 'Restoran Broşür Baskı' },
  { path: '/sektor/kuafor-kartvizit-baski', expectedStatus: 200, expectedTitleSubstring: 'Kuaför Kartvizit Baskı' },
  { path: '/sektor/kozmetik-guzellik-saglik-baski', expectedStatus: 301, expectedLocation: '/sektor/kozmetik-guzellik-merkezi-baski' },
  { path: '/sektor/kozmetik-guzellik-merkezi-baski', expectedStatus: 200, expectedTitleSubstring: 'Güzellik Merkezi' },
  { path: '/sektor/e-ticaret-baski', expectedStatus: 301, expectedLocation: '/sektor/e-ticaret-perakende-baski' },
  { path: '/sektor/e-ticaret-perakende-baski', expectedStatus: 200, expectedTitleSubstring: 'E-Ticaret ve Perakende Baskı' },
  { path: '/sektor/test-gecersiz-sayfa', expectedStatus: 404, expectedTitleSubstring: '404 Sayfa Bulunamadı' },
  { path: '/blog/ofset-baski-nasil-yapilir', expectedStatus: 200, expectedTitleSubstring: 'Ofset Baskı Nasıl Yapılır?' },
  { path: '/invalid-city-xyz-matbaa', expectedStatus: 404, expectedTitleSubstring: '404 Sayfa Bulunamadı' },
  { path: '/non-existent-product-abc', expectedStatus: 404, expectedTitleSubstring: '404 Sayfa Bulunamadı' }
];

async function validateProductionHTTP() {
  console.log('🌐 RUNNING PRODUCTION HTTP SERVER VALIDATION...');

  const distPath = path.join(process.cwd(), 'dist');
  const indexPath = path.join(distPath, 'index.html');

  if (!fs.existsSync(indexPath)) {
    console.error('🔴 Build dist/index.html does not exist. Run "npm run build" first!');
    process.exit(1);
  }

  // Set env flag to prevent server auto-listening during import
  process.env.DISABLE_AUTO_START = 'true';
  const { getRouteSEO, isKnownRoute, injectSEOMetadata, URL_REDIRECTS } = await import('./server');

  const app = express();
  app.use(express.static(distPath, { index: false, redirect: false }));

  // URL 301 Permanent Redirects
  app.use((req, res, next) => {
    let cleanPath = req.path.trim().toLowerCase();
    if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
      cleanPath = cleanPath.substring(0, cleanPath.length - 1);
    }
    const redirectTarget = URL_REDIRECTS[cleanPath] || URL_REDIRECTS[req.path];
    if (redirectTarget) {
      return res.redirect(301, redirectTarget);
    }
    next();
  });

  app.get('*', (req, res) => {
    try {
      let cleanPath = req.path.trim().toLowerCase();
      if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
        cleanPath = cleanPath.substring(0, cleanPath.length - 1);
      }
      const cleanSlug = cleanPath.replace(/^\//, '');
      const prerenderedPath = cleanSlug ? path.join(distPath, cleanSlug, 'index.html') : null;
      if (prerenderedPath && fs.existsSync(prerenderedPath)) {
        return res.status(200).set({ 'Content-Type': 'text/html' }).sendFile(prerenderedPath);
      }

      const template = fs.readFileSync(indexPath, 'utf-8');
      const known = isKnownRoute(req.path);
      const statusCode = known ? 200 : 404;

      const seo = known
        ? getRouteSEO(req.path)
        : {
            title: "404 Sayfa Bulunamadı | Mavi Basım",
            desc: "Aradığınız sayfa veya dijital matbaa ürünü bulunamadı.",
            canonical: `https://mavibasim.com${req.path}`
          };

      const html = injectSEOMetadata(template, seo.title, seo.desc, seo.canonical, !known, seo.extraHead, seo.h1Text, seo.bodyContent);
      res.status(statusCode).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (err) {
      console.error('Error in request handler for:', req.path, err);
      res.status(500).send('Internal Server Error');
    }
  });

  const server = createServer(app);
  await new Promise<void>((resolve) => server.listen(TEST_PORT, '127.0.0.1', () => resolve()));

  console.log(`✅ Production test server listening at http://127.0.0.1:${TEST_PORT}`);

  let totalPassed = 0;
  console.log('\n┌────────────────────────────────┬────────┬──────────────┬────────────────────────────────────────────────────────┐');
  console.log('│ Route                          │ Status │ Response     │ Title / Canonical Assertion                            │');
  console.log('├────────────────────────────────┼────────┼──────────────┼────────────────────────────────────────────────────────┤');

  for (const routeObj of ROUTES_TO_TEST) {
    const startTime = Date.now();
    const res = await fetch(`http://127.0.0.1:${TEST_PORT}${routeObj.path}`, {
      redirect: 'manual'
    });
    const elapsed = Date.now() - startTime;

    if (routeObj.expectedStatus === 301) {
      const location = res.headers.get('location');
      const statusMatch = res.status === 301;
      const locationMatch = location === routeObj.expectedLocation;
      if (statusMatch && locationMatch) {
        totalPassed++;
        const pCol = routeObj.path.padEnd(30);
        const sCol = `${res.status}`.padEnd(6);
        const tCol = `${elapsed}ms`.padEnd(12);
        const mCol = `[301 REDIRECT -> ${location}]`.padEnd(54);
        console.log(`│ ${pCol} │ ${sCol} │ ${tCol} │ ${mCol} │`);
      } else {
        console.error(`🔴 FAILED 301 ASSERTION: ${routeObj.path}`);
        console.error(`   Status: ${res.status} (expected 301)`);
        console.error(`   Location: "${location}" (expected "${routeObj.expectedLocation}")`);
      }
      continue;
    }

    const bodyText = await res.text();

    const dom = new JSDOM(bodyText);
    const doc = dom.window.document;

    const title = doc.querySelector('title')?.textContent || '';
    const canonicalElements = doc.querySelectorAll('link[rel="canonical"]');
    const canonical = canonicalElements[0]?.getAttribute('href') || '';
    const robots = doc.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
    const contentType = res.headers.get('content-type') || '';

    const statusMatch = res.status === routeObj.expectedStatus;
    const contentTypeMatch = contentType.includes('text/html');
    const singleCanonicalMatch = canonicalElements.length === 1 && canonical.startsWith('https://mavibasim.com');
    const titleSubstringMatch = routeObj.expectedTitleSubstring
      ? title.toLowerCase().includes(routeObj.expectedTitleSubstring.toLowerCase())
      : Boolean(title);
    const robotsMatch = routeObj.expectedStatus === 404 ? robots.includes('noindex') : !robots.includes('noindex');

    if (statusMatch && contentTypeMatch && singleCanonicalMatch && titleSubstringMatch && robotsMatch) {
      totalPassed++;
      const pCol = routeObj.path.padEnd(30);
      const sCol = `${res.status}`.padEnd(6);
      const tCol = `${elapsed}ms`.padEnd(12);
      const mCol = (routeObj.expectedStatus === 404 ? `[404 NOINDEX] ${title.substring(0, 30)}` : title.substring(0, 48)).padEnd(54);
      console.log(`│ ${pCol} │ ${sCol} │ ${tCol} │ ${mCol} │`);
    } else {
      console.error(`🔴 FAILED ASSERTION: ${routeObj.path}`);
      console.error(`   Status: ${res.status} (expected ${routeObj.expectedStatus})`);
      console.error(`   Title: "${title}" (expected substring "${routeObj.expectedTitleSubstring}")`);
      console.error(`   Canonical Count: ${canonicalElements.length}, Value: "${canonical}"`);
      console.error(`   Robots: "${robots}"`);
    }
  }

  console.log('└────────────────────────────────┴────────┴──────────────┴────────────────────────────────────────────────────────┘');

  // Deep Audit for /sektor/kuafor-kartvizit-baski
  console.log('\n🔍 RUNNING DEEP METADATA & SCHEMA AUDIT FOR /sektor/kuafor-kartvizit-baski...');
  const kuaforRes = await fetch(`http://127.0.0.1:${TEST_PORT}/sektor/kuafor-kartvizit-baski`);
  const kuaforBody = await kuaforRes.text();
  const kuaforDom = new JSDOM(kuaforBody);
  const kuaforDoc = kuaforDom.window.document;

  const kTitle = kuaforDoc.querySelector('title')?.textContent || '';
  const kDesc = kuaforDoc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  const kCanonicals = kuaforDoc.querySelectorAll('link[rel="canonical"]');
  const kCanonical = kCanonicals[0]?.getAttribute('href') || '';
  const kRobots = kuaforDoc.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
  const h1Count = kuaforDoc.querySelectorAll('h1').length;
  const kOgTitle = kuaforDoc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
  const kOgDesc = kuaforDoc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
  const kOgUrl = kuaforDoc.querySelector('meta[property="og:url"]')?.getAttribute('content') || '';
  const kTwTitle = kuaforDoc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') || '';
  const kTwDesc = kuaforDoc.querySelector('meta[name="twitter:description"]')?.getAttribute('content') || '';
  const isSoft404 = kuaforBody.includes('404 - Sayfa Bulunamadı');

  // Parse JSON-LD scripts
  const jsonLdScripts = Array.from(kuaforDoc.querySelectorAll('script[type="application/ld+json"]'));
  const jsonLdObjects = jsonLdScripts.map(s => {
    try {
      return JSON.parse(s.textContent || '{}');
    } catch (e) {
      return {};
    }
  });

  const jsonLdTypes = jsonLdObjects.map(obj => obj['@type']).filter(Boolean);
  const breadcrumbObj = jsonLdObjects.find(obj => obj['@type'] === 'BreadcrumbList');
  const breadcrumbItems = breadcrumbObj?.itemListElement || [];
  const faqObj = jsonLdObjects.find(obj => obj['@type'] === 'FAQPage');
  const faqQuestionsCount = faqObj?.mainEntity?.length || 0;

  // Check sitemap.xml
  const sitemapXml = fs.readFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), 'utf-8');
  const inSitemap = sitemapXml.includes('https://mavibasim.com/sektor/kuafor-kartvizit-baski');

  console.log(` - HTTP Status: ${kuaforRes.status} ${kuaforRes.status === 200 ? '✅' : '🔴'}`);
  console.log(` - Title Exact Match: "${kTitle}" ${kTitle === 'Kuaför Kartvizit Baskı | Berber ve Güzellik Salonu' ? '✅' : '🔴'}`);
  console.log(` - Meta Description: "${kDesc}" ${kDesc.length > 20 ? '✅' : '🔴'}`);
  console.log(` - Single Canonical (${kCanonicals.length}): "${kCanonical}" ${kCanonicals.length === 1 && kCanonical === 'https://mavibasim.com/sektor/kuafor-kartvizit-baski' ? '✅' : '🔴'}`);
  console.log(` - Robots Tag: "${kRobots}" ${kRobots.includes('index') ? '✅' : '🔴'}`);
  console.log(` - H1 Count: ${h1Count} ${h1Count === 1 ? '✅' : '🔴'}`);
  console.log(` - Soft 404 Check: ${!isSoft404 ? 'PASSED (No soft 404) ✅' : '🔴 FAILED (Soft 404 text found)'}`);
  console.log(` - Open Graph Title: "${kOgTitle}" ${kOgTitle === kTitle ? '✅' : '🔴'}`);
  console.log(` - Open Graph Description: "${kOgDesc}" ${kOgDesc === kDesc ? '✅' : '🔴'}`);
  console.log(` - Open Graph URL: "${kOgUrl}" ${kOgUrl === kCanonical ? '✅' : '🔴'}`);
  console.log(` - Twitter Title: "${kTwTitle}" ${kTwTitle === kTitle ? '✅' : '🔴'}`);
  console.log(` - Twitter Description: "${kTwDesc}" ${kTwDesc === kDesc ? '✅' : '🔴'}`);
  console.log(` - JSON-LD Types Found: [${jsonLdTypes.join(', ')}] ${jsonLdTypes.includes('BreadcrumbList') ? '✅' : '🔴'}`);
  console.log(` - BreadcrumbList Items (${breadcrumbItems.length}):`);
  breadcrumbItems.forEach((item: any) => {
    console.log(`    Pos ${item.position}: "${item.name}" -> ${item.item}`);
  });
  console.log(` - FAQPage Questions Count: ${faqQuestionsCount} ${faqQuestionsCount >= 3 ? '✅' : '🔴'}`);
  console.log(` - Present in sitemap.xml: ${inSitemap ? 'YES ✅' : 'NO 🔴'}`);

  // Deep Audit for /sektor/kozmetik-guzellik-saglik-baski (301 Permanent Redirect)
  console.log('\n🔍 RUNNING 301 REDIRECT & SITEMAP EXCLUSION AUDIT FOR /sektor/kozmetik-guzellik-saglik-baski...');
  const oldKozmetikRes = await fetch(`http://127.0.0.1:${TEST_PORT}/sektor/kozmetik-guzellik-saglik-baski`, {
    redirect: 'manual'
  });
  const oldKozmetikLocation = oldKozmetikRes.headers.get('location');
  const oldKozmetikInSitemap = sitemapXml.includes('https://mavibasim.com/sektor/kozmetik-guzellik-saglik-baski');

  console.log(` - HTTP Status: ${oldKozmetikRes.status} ${oldKozmetikRes.status === 301 ? '✅ (Permanent Redirect)' : '🔴'}`);
  console.log(` - Redirect Target: "${oldKozmetikLocation}" ${oldKozmetikLocation === '/sektor/kozmetik-guzellik-merkezi-baski' ? '✅' : '🔴'}`);
  console.log(` - Excluded from sitemap.xml: ${!oldKozmetikInSitemap ? 'YES (Not indexed) ✅' : 'NO 🔴'}`);

  // Deep Audit for /sektor/kozmetik-guzellik-merkezi-baski
  console.log('\n🔍 RUNNING DEEP METADATA & SCHEMA AUDIT FOR /sektor/kozmetik-guzellik-merkezi-baski...');
  const kozmetikRes = await fetch(`http://127.0.0.1:${TEST_PORT}/sektor/kozmetik-guzellik-merkezi-baski`);
  const kozmetikBody = await kozmetikRes.text();
  const kozmetikDom = new JSDOM(kozmetikBody);
  const kozmetikDoc = kozmetikDom.window.document;

  const kozTitle = kozmetikDoc.querySelector('title')?.textContent || '';
  const kozDesc = kozmetikDoc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  const kozCanonicals = kozmetikDoc.querySelectorAll('link[rel="canonical"]');
  const kozCanonical = kozCanonicals[0]?.getAttribute('href') || '';
  const kozRobots = kozmetikDoc.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
  const kozH1Count = kozmetikDoc.querySelectorAll('h1').length;
  const kozOgTitle = kozmetikDoc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
  const kozOgDesc = kozmetikDoc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
  const kozOgUrl = kozmetikDoc.querySelector('meta[property="og:url"]')?.getAttribute('content') || '';
  const kozTwTitle = kozmetikDoc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') || '';
  const kozTwDesc = kozmetikDoc.querySelector('meta[name="twitter:description"]')?.getAttribute('content') || '';
  const kozIsSoft404 = kozmetikBody.includes('404 - Sayfa Bulunamadı');

  const kozJsonLdScripts = Array.from(kozmetikDoc.querySelectorAll('script[type="application/ld+json"]'));
  const kozJsonLdObjects = kozJsonLdScripts.map(s => {
    try {
      return JSON.parse(s.textContent || '{}');
    } catch (e) {
      return {};
    }
  });

  const kozJsonLdTypes = kozJsonLdObjects.map(obj => obj['@type']).filter(Boolean);
  const kozBreadcrumbObj = kozJsonLdObjects.find(obj => obj['@type'] === 'BreadcrumbList');
  const kozBreadcrumbItems = kozBreadcrumbObj?.itemListElement || [];
  const kozFaqObj = kozJsonLdObjects.find(obj => obj['@type'] === 'FAQPage');
  const kozFaqQuestionsCount = kozFaqObj?.mainEntity?.length || 0;
  const kozInSitemap = sitemapXml.includes('https://mavibasim.com/sektor/kozmetik-guzellik-merkezi-baski');

  console.log(` - HTTP Status: ${kozmetikRes.status} ${kozmetikRes.status === 200 ? '✅' : '🔴'}`);
  console.log(` - Title Exact Match: "${kozTitle}" ${kozTitle === 'Güzellik Merkezi ve Kozmetik Baskı Çözümleri | Mavi Basım' ? '✅' : '🔴'}`);
  console.log(` - Meta Description Exact Match: "${kozDesc}" ${kozDesc === 'Güzellik merkezleri ve kozmetik markaları için parfüm kutusu, sözleşme, onam formu, seans takip formu, randevu kartı, broşür ve etiket baskısı.' ? '✅' : '🔴'}`);
  console.log(` - Single Canonical (${kozCanonicals.length}): "${kozCanonical}" ${kozCanonicals.length === 1 && kozCanonical === 'https://mavibasim.com/sektor/kozmetik-guzellik-merkezi-baski' ? '✅' : '🔴'}`);
  console.log(` - Robots Tag: "${kozRobots}" ${kozRobots === 'index, follow' ? '✅' : '🔴'}`);
  console.log(` - H1 Count: ${kozH1Count} ${kozH1Count === 1 ? '✅' : '🔴'}`);
  console.log(` - Soft 404 Check: ${!kozIsSoft404 ? 'PASSED (No soft 404) ✅' : '🔴 FAILED (Soft 404 text found)'}`);
  console.log(` - Open Graph Title: "${kozOgTitle}" ${kozOgTitle === kozTitle ? '✅' : '🔴'}`);
  console.log(` - Open Graph Description: "${kozOgDesc}" ${kozOgDesc === kozDesc ? '✅' : '🔴'}`);
  console.log(` - Open Graph URL: "${kozOgUrl}" ${kozOgUrl === kozCanonical ? '✅' : '🔴'}`);
  console.log(` - Twitter Title: "${kozTwTitle}" ${kozTwTitle === kozTitle ? '✅' : '🔴'}`);
  console.log(` - Twitter Description: "${kozTwDesc}" ${kozTwDesc === kozDesc ? '✅' : '🔴'}`);
  console.log(` - JSON-LD Types Found: [${kozJsonLdTypes.join(', ')}] ${kozJsonLdTypes.includes('BreadcrumbList') && kozJsonLdTypes.includes('Service') && kozJsonLdTypes.includes('FAQPage') ? '✅' : '🔴'}`);
  console.log(` - BreadcrumbList Items (${kozBreadcrumbItems.length}):`);
  kozBreadcrumbItems.forEach((item: any) => {
    console.log(`    Pos ${item.position}: "${item.name}" -> ${item.item}`);
  });
  console.log(` - FAQPage Questions Count: ${kozFaqQuestionsCount} ${kozFaqQuestionsCount === 8 ? '✅ (Exact 8 questions)' : '🔴'}`);
  console.log(` - Present in sitemap.xml: ${kozInSitemap ? 'YES ✅' : 'NO 🔴'}`);

  console.log('\n🔍 RUNNING DEEP METADATA & SCHEMA AUDIT FOR /sektor/e-ticaret-perakende-baski...');
  const eTicaretRes = await fetch(`http://127.0.0.1:${TEST_PORT}/sektor/e-ticaret-perakende-baski`);
  const eTicaretBody = await eTicaretRes.text();
  const eTicaretDom = new JSDOM(eTicaretBody);
  const eTicaretDoc = eTicaretDom.window.document;

  const etTitle = eTicaretDoc.querySelector('title')?.textContent || '';
  const etDesc = eTicaretDoc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  const etCanonicals = eTicaretDoc.querySelectorAll('link[rel="canonical"]');
  const etCanonical = etCanonicals[0]?.getAttribute('href') || '';
  const etRobots = eTicaretDoc.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
  const etH1Count = eTicaretDoc.querySelectorAll('h1').length;
  const etOgTitle = eTicaretDoc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
  const etOgDesc = eTicaretDoc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
  const etOgUrl = eTicaretDoc.querySelector('meta[property="og:url"]')?.getAttribute('content') || '';
  const etTwTitle = eTicaretDoc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') || '';
  const etTwDesc = eTicaretDoc.querySelector('meta[name="twitter:description"]')?.getAttribute('content') || '';
  const etIsSoft404 = eTicaretBody.includes('404 - Sayfa Bulunamadı');

  const etJsonLdScripts = Array.from(eTicaretDoc.querySelectorAll('script[type="application/ld+json"]'));
  const etJsonLdObjects = etJsonLdScripts.map(s => {
    try {
      return JSON.parse(s.textContent || '{}');
    } catch (e) {
      return {};
    }
  });

  const etJsonLdTypes = etJsonLdObjects.map(obj => obj['@type']).filter(Boolean);
  const etBreadcrumbObj = etJsonLdObjects.find(obj => obj['@type'] === 'BreadcrumbList');
  const etBreadcrumbItems = etBreadcrumbObj?.itemListElement || [];
  const etFaqObj = etJsonLdObjects.find(obj => obj['@type'] === 'FAQPage');
  const etFaqQuestionsCount = etFaqObj?.mainEntity?.length || 0;
  const etInSitemap = sitemapXml.includes('https://mavibasim.com/sektor/e-ticaret-perakende-baski');

  console.log(` - HTTP Status: ${eTicaretRes.status} ${eTicaretRes.status === 200 ? '✅' : '🔴'}`);
  console.log(` - Title Exact Match: "${etTitle}" ${etTitle === 'E-Ticaret ve Perakende Baskı Çözümleri | Mavi Basım' ? '✅' : '🔴'}`);
  console.log(` - Meta Description Exact Match: "${etDesc}" ${etDesc === 'E-ticaret ve perakende markaları için ürün kutusu, karton çanta, teşekkür kartı, ambalaj kâğıdı, Amerikan servis, barkod ve koli etiketi baskısı.' ? '✅' : '🔴'}`);
  console.log(` - Single Canonical (${etCanonicals.length}): "${etCanonical}" ${etCanonicals.length === 1 && etCanonical === 'https://mavibasim.com/sektor/e-ticaret-perakende-baski' ? '✅' : '🔴'}`);
  console.log(` - Robots Tag: "${etRobots}" ${etRobots === 'index, follow' ? '✅' : '🔴'}`);
  console.log(` - H1 Count: ${etH1Count} ${etH1Count === 1 ? '✅' : '🔴'}`);
  console.log(` - Soft 404 Check: ${!etIsSoft404 ? 'PASSED (No soft 404) ✅' : '🔴 FAILED (Soft 404 text found)'}`);
  console.log(` - Open Graph Title: "${etOgTitle}" ${etOgTitle === etTitle ? '✅' : '🔴'}`);
  console.log(` - Open Graph Description: "${etOgDesc}" ${etOgDesc === etDesc ? '✅' : '🔴'}`);
  console.log(` - Open Graph URL: "${etOgUrl}" ${etOgUrl === etCanonical ? '✅' : '🔴'}`);
  console.log(` - Twitter Title: "${etTwTitle}" ${etTwTitle === etTitle ? '✅' : '🔴'}`);
  console.log(` - Twitter Description: "${etTwDesc}" ${etTwDesc === etDesc ? '✅' : '🔴'}`);
  console.log(` - JSON-LD Types Found: [${etJsonLdTypes.join(', ')}] ${etJsonLdTypes.includes('BreadcrumbList') && etJsonLdTypes.includes('Service') && etJsonLdTypes.includes('FAQPage') ? '✅' : '🔴'}`);
  console.log(` - BreadcrumbList Items (${etBreadcrumbItems.length}):`);
  etBreadcrumbItems.forEach((item: any) => {
    console.log(`    Pos ${item.position}: "${item.name}" -> ${item.item}`);
  });
  console.log(` - FAQPage Questions Count: ${etFaqQuestionsCount} ${etFaqQuestionsCount === 8 ? '✅ (Exact 8 questions)' : '🔴'}`);
  console.log(` - Present in sitemap.xml: ${etInSitemap ? 'YES ✅' : 'NO 🔴'}`);

  // Deep Visible FAQ vs JSON-LD Schema Comparison
  const { SEO_PAGES_DATA } = await import('./src/data/seoPagesData');
  const { SECTOR_IMAGE_MANIFEST } = await import('./src/generated/sectorImageManifest');
  const eTicaretData = SEO_PAGES_DATA['e-ticaret-perakende-baski'];
  console.log('\n🔍 AUDITING VISIBLE FAQ VS JSON-LD SCHEMA PARITY FOR /sektor/e-ticaret-perakende-baski...');
  const visibleFaqItems = eTicaretData?.faqs || [];
  console.log(` - Visible FAQ Items Count: ${visibleFaqItems.length} ${visibleFaqItems.length === 8 ? '✅ (Exact 8)' : '🔴'}`);

  const schemaQuestions = etFaqObj?.mainEntity || [];
  console.log(` - Schema FAQ Questions Count: ${schemaQuestions.length} ${schemaQuestions.length === 8 ? '✅ (Exact 8)' : '🔴'}`);
  let faqParityPassed = true;

  if (visibleFaqItems.length !== 8 || schemaQuestions.length !== 8) {
    faqParityPassed = false;
  }

  for (let i = 0; i < 8; i++) {
    const vItem = visibleFaqItems[i];
    const sItem = schemaQuestions[i];

    const vQ = vItem?.question?.trim() || '';
    const vA = vItem?.answer?.trim() || '';
    const sQ = sItem?.name?.trim() || '';
    const sA = sItem?.acceptedAnswer?.text?.trim() || '';

    const qMatch = vQ === sQ && vQ.length > 0;
    const aMatch = vA === sA && vA.length > 0;

    console.log(`   [FAQ #${i + 1}] Q Match: ${qMatch ? '✅' : '🔴'} | A Match: ${aMatch ? '✅' : '🔴'}`);
    if (!qMatch || !aMatch) {
      faqParityPassed = false;
      console.log(`      Visible Q: "${vQ}"`);
      console.log(`      Schema  Q: "${sQ}"`);
      console.log(`      Visible A: "${vA}"`);
      console.log(`      Schema  A: "${sA}"`);
    }
  }
  console.log(` - FAQ Exact Character & Order Parity: ${faqParityPassed ? 'PASSED ✅' : 'FAILED 🔴'}`);

  // Prohibited words check across HTTP body
  const prohibitedWords = ['hijyenik Amerikan servis', 'masa hijyeni', 'hijyen sağlar', 'hijyen amacıyla kullanılır'];
  const foundProhibited = prohibitedWords.filter(w => 
    eTicaretBody.toLowerCase().includes(w.toLowerCase())
  );
  console.log(` - Prohibited Hygiene Claims Check: ${foundProhibited.length === 0 ? 'PASSED (0 found) ✅' : `FAILED (Found: ${foundProhibited.join(', ')}) 🔴`}`);

  // Real WebP Image Verification
  console.log('\n🖼️ AUDITING REAL WEBP IMAGES IN DATA MANIFEST...');
  const eTicaretManifest = (SECTOR_IMAGE_MANIFEST as any).eTicaretPerakende || {};
  const manifestKeys = Object.keys(eTicaretManifest);
  console.log(` - Real Sector Img Keys in Manifest: ${manifestKeys.length} ${manifestKeys.length === 6 ? '✅ (Exact 6 real images)' : '🔴'}`);

  const expectedImages = [
    { name: 'e-ticaret-perakende-baski-cozumleri.webp', w: 1200, h: 800, loading: 'eager', fetchPriority: 'high' },
    { name: 'e-ticaret-urun-kutusu-kargo-paketleme.webp', w: 900, h: 650, loading: 'lazy' },
    { name: 'saten-polyester-ipli-karton-canta.webp', w: 900, h: 650, loading: 'lazy' },
    { name: 'baskili-ambalaj-kagidi-tesekkur-karti.webp', w: 900, h: 650, loading: 'lazy' },
    { name: 'barkod-koli-adres-urun-etiketleri.webp', w: 900, h: 650, loading: 'lazy' },
    { name: 'amerikan-servis-perakende-baski-urunleri.webp', w: 900, h: 650, loading: 'lazy' },
  ];

  let allImagesValid = true;
  for (let idx = 0; idx < expectedImages.length; idx++) {
    const exp = expectedImages[idx];
    const src = `/images/sektor/e-ticaret-perakende/${exp.name}`;

    // Test HTTP fetch of image
    const imgHttpRes = await fetch(`http://127.0.0.1:${TEST_PORT}${src}`);
    const imgStatus = imgHttpRes.status === 200;
    const contentType = imgHttpRes.headers.get('content-type') || '';
    const typeMatch = contentType.includes('image/webp');

    const existsInManifest = eTicaretManifest[exp.name] === true;
    const pass = existsInManifest && imgStatus && typeMatch;
    if (!pass) allImagesValid = false;

    console.log(`   [Görsel #${idx + 1}] ${exp.name}`);
    console.log(`      Dimensions: ${exp.w}x${exp.h}`);
    console.log(`      Loading: "${exp.loading}", FetchPriority: "${exp.fetchPriority || 'none'}"`);
    console.log(`      Manifest Status: ${existsInManifest ? 'true ✅' : 'false 🔴'}`);
    console.log(`      HTTP Status: ${imgHttpRes.status}, Content-Type: "${contentType}" ${(imgStatus && typeMatch) ? '✅' : '🔴'}`);
  }

  if (manifestKeys.length !== 6 || !allImagesValid) {
    totalPassed = -1; // Force fail
  }

  // Deep Audit for /brosur
  console.log('\n🔍 RUNNING DEEP METADATA, PROHIBITED WORDS & SCHEMA AUDIT FOR /brosur...');
  const brosurRes = await fetch(`http://127.0.0.1:${TEST_PORT}/brosur`);
  const brosurBody = await brosurRes.text();
  const brosurDom = new JSDOM(brosurBody);
  const brosurDoc = brosurDom.window.document;

  const brTitle = brosurDoc.querySelector('title')?.textContent || '';
  const brDesc = brosurDoc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  const brCanonicals = brosurDoc.querySelectorAll('link[rel="canonical"]');
  const brCanonical = brCanonicals[0]?.getAttribute('href') || '';
  const brRobots = brosurDoc.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
  const brH1Count = brosurDoc.querySelectorAll('h1').length;
  const brOgTitle = brosurDoc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
  const brOgDesc = brosurDoc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
  const brOgUrl = brosurDoc.querySelector('meta[property="og:url"]')?.getAttribute('content') || '';
  const brTwTitle = brosurDoc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') || '';
  const brTwDesc = brosurDoc.querySelector('meta[name="twitter:description"]')?.getAttribute('content') || '';
  const brIsSoft404 = brosurBody.includes('404 - Sayfa Bulunamadı');

  const brJsonLdScripts = Array.from(brosurDoc.querySelectorAll('script[type="application/ld+json"]'));
  const brJsonLdObjects = brJsonLdScripts.map(s => {
    try {
      return JSON.parse(s.textContent || '{}');
    } catch (e) {
      return {};
    }
  });

  const brJsonLdTypes = brJsonLdObjects.map(obj => obj['@type']).filter(Boolean);
  const brBreadcrumbObj = brJsonLdObjects.find(obj => obj['@type'] === 'BreadcrumbList');
  const brFaqObj = brJsonLdObjects.find(obj => obj['@type'] === 'FAQPage');
  const brFaqQuestionsCount = brFaqObj?.mainEntity?.length || 0;
  const brProductObj = brJsonLdObjects.find(obj => obj['@type'] === 'Product');

  console.log(` - HTTP Status: ${brosurRes.status} ${brosurRes.status === 200 ? '✅' : '🔴'}`);
  console.log(` - Title Exact Match: "${brTitle}" ${brTitle === 'Broşür Baskı Fiyatları | A4, A5 ve Katlamalı Broşür' ? '✅' : '🔴'}`);
  console.log(` - Meta Description Exact Match: "${brDesc}" ${brDesc.includes('A4, A5 ve A3 broşür baskı fiyatlarını') ? '✅' : '🔴'}`);
  console.log(` - Single Canonical (${brCanonicals.length}): "${brCanonical}" ${brCanonicals.length === 1 && brCanonical === 'https://mavibasim.com/brosur' ? '✅' : '🔴'}`);
  console.log(` - Robots Tag: "${brRobots}" ${brRobots.includes('index') ? '✅' : '🔴'}`);
  console.log(` - H1 Count: ${brH1Count} ${brH1Count === 1 ? '✅' : '🔴'}`);
  console.log(` - Soft 404 Check: ${!brIsSoft404 ? 'PASSED (No soft 404) ✅' : '🔴 FAILED (Soft 404 text found)'}`);
  console.log(` - Open Graph Title: "${brOgTitle}" ${brOgTitle === brTitle ? '✅' : '🔴'}`);
  console.log(` - Open Graph Description: "${brOgDesc}" ${brOgDesc === brDesc ? '✅' : '🔴'}`);
  console.log(` - Open Graph URL: "${brOgUrl}" ${brOgUrl === brCanonical ? '✅' : '🔴'}`);
  console.log(` - Twitter Title: "${brTwTitle}" ${brTwTitle === brTitle ? '✅' : '🔴'}`);
  console.log(` - Twitter Description: "${brTwDesc}" ${brTwDesc === brDesc ? '✅' : '🔴'}`);
  console.log(` - JSON-LD Types Found: [${brJsonLdTypes.join(', ')}] ${brJsonLdTypes.includes('BreadcrumbList') && brJsonLdTypes.includes('Product') && brJsonLdTypes.includes('FAQPage') ? '✅' : '🔴'}`);
  console.log(` - FAQPage Questions Count: ${brFaqQuestionsCount} ${brFaqQuestionsCount === 10 ? '✅ (Exact 10 questions)' : '🔴'}`);

  // Prohibited words check on /brosur
  const brosurProhibited = [
    'fabrikamız',
    'üretim tesisimiz',
    'doğrudan üretici',
    'aynı gün prova',
    '2 iş günü',
    'kusursuz ofset',
    'ideal standart',
    'en çok tercih edilen pratik ebat',
    'DOĞRUDAN TESLİMAT',
    'Kullanılan Makineler',
    'GÜVENLİ SİPARİŞ & TESLİMAT SÜRECİ'
  ];
  const foundBrosurProhibited = brosurProhibited.filter(w => 
    brosurBody.toLowerCase().includes(w.toLowerCase())
  );
  console.log(` - Prohibited Claims Check: ${foundBrosurProhibited.length === 0 ? 'PASSED (0 found) ✅' : `FAILED (Found: ${foundBrosurProhibited.join(', ')}) 🔴`}`);

  // Also check for duplicated "Sipariş Oluştur" text or button flaws
  const hasDuplicateCtaText = /Sipariş Oluştur\s*Sipariş Oluştur/i.test(brosurBody);
  console.log(` - Duplicate CTA Text Check: ${!hasDuplicateCtaText ? 'PASSED ✅' : 'FAILED (Duplicate text found) 🔴'}`);

  if (foundBrosurProhibited.length > 0 || brFaqQuestionsCount !== 10 || hasDuplicateCtaText) {
    totalPassed = -1;
  }

  // Deep Audit for /el-ilani
  console.log('\n🔍 RUNNING DEEP METADATA, PROHIBITED WORDS, DOM & SCHEMA AUDIT FOR /el-ilani...');
  const elIlaniRes = await fetch(`http://127.0.0.1:${TEST_PORT}/el-ilani`);
  const elIlaniBody = await elIlaniRes.text();
  const elIlaniDom = new JSDOM(elIlaniBody);
  const elIlaniDoc = elIlaniDom.window.document;

  const elTitle = elIlaniDoc.querySelector('title')?.textContent || '';
  const elDesc = elIlaniDoc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  const elCanonicals = elIlaniDoc.querySelectorAll('link[rel="canonical"]');
  const elCanonical = elCanonicals[0]?.getAttribute('href') || '';
  const elRobots = elIlaniDoc.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
  const elH1Count = elIlaniDoc.querySelectorAll('h1').length;
  const elH1Text = elIlaniDoc.querySelector('h1')?.textContent?.trim() || '';
  const elOgTitle = elIlaniDoc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
  const elOgDesc = elIlaniDoc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
  const elOgUrl = elIlaniDoc.querySelector('meta[property="og:url"]')?.getAttribute('content') || '';
  const elTwTitle = elIlaniDoc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') || '';
  const elTwDesc = elIlaniDoc.querySelector('meta[name="twitter:description"]')?.getAttribute('content') || '';
  const elIsSoft404 = elIlaniBody.includes('404 - Sayfa Bulunamadı');

  const elJsonLdScripts = Array.from(elIlaniDoc.querySelectorAll('script[type="application/ld+json"]'));
  const elJsonLdObjects = elJsonLdScripts.map(s => {
    try {
      return JSON.parse(s.textContent || '{}');
    } catch (e) {
      return {};
    }
  });

  const elJsonLdTypes = elJsonLdObjects.map(obj => obj['@type']).filter(Boolean);
  const elBreadcrumbObj = elJsonLdObjects.find(obj => obj['@type'] === 'BreadcrumbList');
  const elFaqObj = elJsonLdObjects.find(obj => obj['@type'] === 'FAQPage');
  const elFaqQuestionsCount = elFaqObj?.mainEntity?.length || 0;
  const elProductObj = elJsonLdObjects.find(obj => obj['@type'] === 'Product');

  console.log(` - HTTP Status: ${elIlaniRes.status} ${elIlaniRes.status === 200 ? '✅' : '🔴'}`);
  console.log(` - Title Exact Match: "${elTitle}" ${elTitle === 'El İlanı Baskı Fiyatları | A3, A4, A5 ve Dar Ebat' ? '✅' : '🔴'}`);
  console.log(` - Meta Description Exact Match: "${elDesc}" ${elDesc === 'A3, A4, A5 ve dar ebat el ilanı baskı fiyatlarını inceleyin. 105 gr kuşe fiyatları ile farklı gramaj, ölçü, baskı yönü ve adet teklifleri.' ? '✅' : '🔴'}`);
  console.log(` - Single Canonical (${elCanonicals.length}): "${elCanonical}" ${elCanonicals.length === 1 && elCanonical === 'https://mavibasim.com/el-ilani' ? '✅' : '🔴'}`);
  console.log(` - Robots Tag: "${elRobots}" ${elRobots.includes('index') ? '✅' : '🔴'}`);
  console.log(` - H1 Count: ${elH1Count} (Text: "${elH1Text}") ${elH1Count === 1 && elH1Text.includes('El İlanı Baskı Fiyatları ve Ölçüleri') ? '✅' : '🔴'}`);
  console.log(` - Soft 404 Check: ${!elIsSoft404 ? 'PASSED (No soft 404) ✅' : '🔴 FAILED (Soft 404 text found)'}`);
  console.log(` - Open Graph Title: "${elOgTitle}" ${elOgTitle === elTitle ? '✅' : '🔴'}`);
  console.log(` - Open Graph Description: "${elOgDesc}" ${elOgDesc === elDesc ? '✅' : '🔴'}`);
  console.log(` - Open Graph URL: "${elOgUrl}" ${elOgUrl === elCanonical ? '✅' : '🔴'}`);
  console.log(` - Twitter Title: "${elTwTitle}" ${elTwTitle === elTitle ? '✅' : '🔴'}`);
  console.log(` - Twitter Description: "${elTwDesc}" ${elTwDesc === elDesc ? '✅' : '🔴'}`);
  console.log(` - JSON-LD Types Found: [${elJsonLdTypes.join(', ')}] ${elJsonLdTypes.includes('BreadcrumbList') && elJsonLdTypes.includes('Product') && elJsonLdTypes.includes('FAQPage') ? '✅' : '🔴'}`);
  console.log(` - FAQPage Questions Count: ${elFaqQuestionsCount} ${elFaqQuestionsCount === 8 ? '✅ (Exact 8 questions)' : '🔴'}`);

  // Prohibited words check on /el-ilani
  const elIlaniProhibited = [
    'üretim tesisi',
    'imalat merkezi',
    'doğrudan üretici',
    'heidelberg',
    'polar giyotin',
    'iso 12647-2',
    'sappi',
    'stora enso',
    'sun chemical',
    'huber group',
    'gıda uyumlu',
    'en uygun fiyat',
    'yüzde 80',
    'nem geçirmez',
    'sıfır hatalı',
    'aynı gün üretim',
    'kuruş seviyesinde'
  ];
  const foundElIlaniProhibited = elIlaniProhibited.filter(w => 
    elIlaniBody.toLowerCase().includes(w.toLowerCase())
  );
  console.log(` - Prohibited Claims Check: ${foundElIlaniProhibited.length === 0 ? 'PASSED (0 found) ✅' : `FAILED (Found: ${foundElIlaniProhibited.join(', ')}) 🔴`}`);

  // 13 Target keyword phrases check
  const targetPhrases = [
    'el ilanı baskı',
    'el ilanı fiyatları',
    'a4 el ilanı fiyatları',
    'a5 el ilanı fiyatları',
    'el ilanı ölçüleri',
    'a5 el ilanı ölçüleri',
    'a5 el ilanı baskı fiyatı',
    'el ilanı bastırma fiyatları',
    '1.000 adet el ilanı fiyatı',
    '5.000 adet el ilanı fiyatı',
    '10.000 adet el ilanı fiyatı',
    '2.000 adet el ilanı',
    'özel el ilanı ölçüleri'
  ];
  const normalizedBody = elIlaniBody.toLocaleLowerCase('tr-TR');
  const missingPhrases = targetPhrases.filter(p => !normalizedBody.includes(p.toLocaleLowerCase('tr-TR')));
  console.log(` - Target Keyword Phrases Check (${targetPhrases.length - missingPhrases.length}/${targetPhrases.length}): ${missingPhrases.length === 0 ? 'PASSED (All 13 present) ✅' : `FAILED (Missing: ${missingPhrases.join(', ')}) 🔴`}`);

  if (
    foundElIlaniProhibited.length > 0 || 
    elFaqQuestionsCount !== 8 || 
    missingPhrases.length > 0 ||
    elH1Count !== 1 ||
    elTitle !== 'El İlanı Baskı Fiyatları | A3, A4, A5 ve Dar Ebat' ||
    elCanonical !== 'https://mavibasim.com/el-ilani'
  ) {
    totalPassed = -1;
  }

  // Deep Audit for /afis
  console.log('\n🔍 RUNNING DEEP METADATA, PROHIBITED WORDS, DOM & SCHEMA AUDIT FOR /afis...');
  const afisRes = await fetch(`http://127.0.0.1:${TEST_PORT}/afis`);
  const afisBody = await afisRes.text();
  const afisDom = new JSDOM(afisBody);
  const afisDoc = afisDom.window.document;

  const afisTitles = afisDoc.querySelectorAll('title');
  const afisTitle = afisTitles[0]?.textContent || '';
  const afisDescriptions = afisDoc.querySelectorAll('meta[name="description"]');
  const afisDesc = afisDescriptions[0]?.getAttribute('content') || '';
  const afisCanonicals = afisDoc.querySelectorAll('link[rel="canonical"]');
  const afisCanonical = afisCanonicals[0]?.getAttribute('href') || '';
  const afisRobots = afisDoc.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
  const afisH1s = afisDoc.querySelectorAll('h1');
  const afisH1Count = afisH1s.length;
  const afisH1Text = afisH1s[0]?.textContent?.trim() || '';
  const afisOgTitle = afisDoc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
  const afisOgDesc = afisDoc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
  const afisOgUrl = afisDoc.querySelector('meta[property="og:url"]')?.getAttribute('content') || '';
  const afisTwTitle = afisDoc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') || '';
  const afisTwDesc = afisDoc.querySelector('meta[name="twitter:description"]')?.getAttribute('content') || '';
  const afisIsSoft404 = afisBody.includes('404 - Sayfa Bulunamadı');

  const afisJsonLdScripts = Array.from(afisDoc.querySelectorAll('script[type="application/ld+json"]'));
  const afisJsonLdObjects = afisJsonLdScripts.map(s => {
    try {
      return JSON.parse(s.textContent || '{}');
    } catch (e) {
      return {};
    }
  });

  const afisJsonLdTypes = afisJsonLdObjects.map(obj => obj['@type']).filter(Boolean);
  const afisBreadcrumbObj = afisJsonLdObjects.find(obj => obj['@type'] === 'BreadcrumbList');
  const afisFaqObj = afisJsonLdObjects.find(obj => obj['@type'] === 'FAQPage');
  const afisFaqQuestionsCount = afisFaqObj?.mainEntity?.length || 0;
  const afisProductObj = afisJsonLdObjects.find(obj => obj['@type'] === 'Product');

  const expectedAfisTitle = 'Afiş Baskı Fiyatları | 35x50 - 50x70 - 70x100 cm';
  const expectedAfisDesc = '35x50, 50x70 ve 70x100 cm afiş baskı fiyatlarını inceleyin. 105, 135, 170 gr kuşe ve Blueback afiş poster baskı seçenekleri için teklif alın.';
  const expectedAfisCanonical = 'https://mavibasim.com/afis';
  const expectedAfisH1 = 'Afiş Baskı Fiyatları ve Poster Ölçüleri';

  console.log(` - HTTP Status: ${afisRes.status} ${afisRes.status === 200 ? '✅' : '🔴'}`);
  console.log(` - Single Title (${afisTitles.length}): "${afisTitle}" ${afisTitles.length === 1 && afisTitle === expectedAfisTitle ? '✅' : '🔴'}`);
  console.log(` - Single Meta Description (${afisDescriptions.length}): "${afisDesc}" ${afisDescriptions.length === 1 && afisDesc === expectedAfisDesc ? '✅' : '🔴'}`);
  console.log(` - Single Canonical (${afisCanonicals.length}): "${afisCanonical}" ${afisCanonicals.length === 1 && afisCanonical === expectedAfisCanonical ? '✅' : '🔴'}`);
  console.log(` - Robots Tag: "${afisRobots}" ${afisRobots.includes('index') && afisRobots.includes('follow') ? '✅' : '🔴'}`);
  console.log(` - Single H1 (${afisH1Count}): "${afisH1Text}" ${afisH1Count === 1 && afisH1Text === expectedAfisH1 ? '✅' : '🔴'}`);
  console.log(` - Soft 404 Check: ${!afisIsSoft404 ? 'PASSED (No soft 404) ✅' : '🔴 FAILED (Soft 404 text found)'}`);
  console.log(` - Open Graph Title: "${afisOgTitle}" ${afisOgTitle === expectedAfisTitle ? '✅' : '🔴'}`);
  console.log(` - Open Graph Description: "${afisOgDesc}" ${afisOgDesc === expectedAfisDesc ? '✅' : '🔴'}`);
  console.log(` - Open Graph URL: "${afisOgUrl}" ${afisOgUrl === expectedAfisCanonical ? '✅' : '🔴'}`);
  console.log(` - Twitter Title: "${afisTwTitle}" ${afisTwTitle === expectedAfisTitle ? '✅' : '🔴'}`);
  console.log(` - Twitter Description: "${afisTwDesc}" ${afisTwDesc === expectedAfisDesc ? '✅' : '🔴'}`);
  console.log(` - JSON-LD Types Found: [${afisJsonLdTypes.join(', ')}] ${afisJsonLdTypes.includes('BreadcrumbList') && afisJsonLdTypes.includes('Product') && afisJsonLdTypes.includes('FAQPage') ? '✅' : '🔴'}`);
  console.log(` - FAQPage Questions Count: ${afisFaqQuestionsCount} ${afisFaqQuestionsCount === 10 ? '✅ (Exact 10 questions)' : '🔴'}`);
  
  // Product prices check (AF1-AF6)
  const productOffers = afisProductObj?.offers;
  const productLowPrice = productOffers?.lowPrice;
  const productHighPrice = productOffers?.highPrice;
  const productOfferCount = productOffers?.offerCount;
  const productOffersValid = productLowPrice === '2550' && productHighPrice === '4550' && productOfferCount === '6';
  console.log(` - Product Schema Prices (Low: ${productLowPrice}, High: ${productHighPrice}, Count: ${productOfferCount}): ${productOffersValid ? '✅ (Aligned with AF1–AF6)' : '🔴'}`);

  // Prohibited / certainty claims check on /afis
  const afisProhibited = [
    'fabrika',
    'üretim tesisi',
    'imalat merkezi',
    'doğrudan üretici',
    'heidelberg',
    'polar giyotin',
    'iso 12647-2',
    '81 il',
    'kesin teslimat süresi',
    'sıfır arka gösterme',
    'dalgalanma yapmaz',
    'tam uyum',
    'alttaki görseli kapatan'
  ];
  const foundAfisProhibited = afisProhibited.filter(w => 
    afisBody.toLowerCase().includes(w.toLowerCase())
  );
  console.log(` - Prohibited & Certainty Claims Check: ${foundAfisProhibited.length === 0 ? 'PASSED (0 found) ✅' : `FAILED (Found: ${foundAfisProhibited.join(', ')}) 🔴`}`);

  if (
    afisRes.status !== 200 ||
    afisTitles.length !== 1 ||
    afisTitle !== expectedAfisTitle ||
    afisDescriptions.length !== 1 ||
    afisDesc !== expectedAfisDesc ||
    afisCanonicals.length !== 1 ||
    afisCanonical !== expectedAfisCanonical ||
    afisH1Count !== 1 ||
    afisH1Text !== expectedAfisH1 ||
    !afisRobots.includes('index') ||
    !afisRobots.includes('follow') ||
    afisIsSoft404 ||
    afisOgTitle !== expectedAfisTitle ||
    afisOgDesc !== expectedAfisDesc ||
    afisOgUrl !== expectedAfisCanonical ||
    afisTwTitle !== expectedAfisTitle ||
    afisTwDesc !== expectedAfisDesc ||
    !afisJsonLdTypes.includes('BreadcrumbList') ||
    !afisJsonLdTypes.includes('Product') ||
    !afisJsonLdTypes.includes('FAQPage') ||
    afisFaqQuestionsCount !== 10 ||
    !productOffersValid ||
    foundAfisProhibited.length > 0
  ) {
    totalPassed = -1;
  }

  // Deep Audit for /ambalaj
  console.log('\n🔍 RUNNING DEEP METADATA & SCHEMA AUDIT FOR /ambalaj...');
  const ambalajRes = await fetch(`http://127.0.0.1:${TEST_PORT}/ambalaj`);
  const ambalajBody = await ambalajRes.text();
  const ambalajDom = new JSDOM(ambalajBody);
  const ambalajDoc = ambalajDom.window.document;

  const ambalajTitles = ambalajDoc.querySelectorAll('title');
  const ambalajTitle = ambalajTitles[0]?.textContent || '';
  const ambalajDescriptions = ambalajDoc.querySelectorAll('meta[name="description"]');
  const ambalajDesc = ambalajDescriptions[0]?.getAttribute('content') || '';
  const ambalajCanonicals = ambalajDoc.querySelectorAll('link[rel="canonical"]');
  const ambalajCanonical = ambalajCanonicals[0]?.getAttribute('href') || '';
  const ambalajRobots = ambalajDoc.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
  const ambalajH1Elements = ambalajDoc.querySelectorAll('h1');
  const ambalajH1Count = ambalajH1Elements.length;
  const ambalajH1Text = ambalajH1Elements[0]?.textContent?.trim() || '';
  const ambalajOgTitle = ambalajDoc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
  const ambalajOgDesc = ambalajDoc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
  const ambalajOgUrl = ambalajDoc.querySelector('meta[property="og:url"]')?.getAttribute('content') || '';
  const ambalajTwTitle = ambalajDoc.querySelector('meta[name="twitter:title"]')?.getAttribute('content') || '';
  const ambalajTwDesc = ambalajDoc.querySelector('meta[name="twitter:description"]')?.getAttribute('content') || '';
  const ambalajIsSoft404 = ambalajBody.includes('404 Sayfa Bulunamadı') || ambalajBody.includes('404 - Sayfa Bulunamadı');

  const ambalajJsonLdScripts = Array.from(ambalajDoc.querySelectorAll('script[type="application/ld+json"]'));
  const ambalajJsonLdObjects = ambalajJsonLdScripts.map(s => {
    try {
      return JSON.parse(s.textContent || '{}');
    } catch (e) {
      return {};
    }
  });

  const ambalajJsonLdTypes = ambalajJsonLdObjects.map(obj => obj['@type']).filter(Boolean);
  const ambalajBreadcrumbObj = ambalajJsonLdObjects.find(obj => obj['@type'] === 'BreadcrumbList');
  const ambalajServiceObj = ambalajJsonLdObjects.find(obj => obj['@type'] === 'Service');
  const ambalajFaqObj = ambalajJsonLdObjects.find(obj => obj['@type'] === 'FAQPage');
  const ambalajFaqQuestionsCount = ambalajFaqObj?.mainEntity?.length || 0;

  const expectedAmbalajTitle = 'Ambalaj Kağıdı Baskısı | Pelür ve Sülfit Kağıt | Mavi Basım';
  const expectedAmbalajDesc = 'Baskılı ambalaj kağıdı; 70 gr sülfit, 135 gr kuşe ve 30 gr pelür seçenekleriyle hazırlanır. Ölçü, adet veya kilogram bilgisine göre teklif alın.';
  const expectedAmbalajCanonical = 'https://mavibasim.com/ambalaj';
  const expectedAmbalajH1 = 'Ambalaj Kâğıdı Baskısı ve Özel Sarım Çözümleri';

  console.log(` - HTTP Status: ${ambalajRes.status} ${ambalajRes.status === 200 ? '✅' : '🔴'}`);
  console.log(` - Single Title (${ambalajTitles.length}): "${ambalajTitle}" ${ambalajTitles.length === 1 && ambalajTitle === expectedAmbalajTitle ? '✅' : '🔴'}`);
  console.log(` - Single Meta Description (${ambalajDescriptions.length}): "${ambalajDesc}" ${ambalajDescriptions.length === 1 && ambalajDesc === expectedAmbalajDesc ? '✅' : '🔴'}`);
  console.log(` - Single Canonical (${ambalajCanonicals.length}): "${ambalajCanonical}" ${ambalajCanonicals.length === 1 && ambalajCanonical === expectedAmbalajCanonical ? '✅' : '🔴'}`);
  console.log(` - Robots Tag: "${ambalajRobots}" ${ambalajRobots.includes('index') && ambalajRobots.includes('follow') ? '✅' : '🔴'}`);
  console.log(` - Single H1 (${ambalajH1Count}): "${ambalajH1Text}" ${ambalajH1Count === 1 && ambalajH1Text === expectedAmbalajH1 ? '✅' : '🔴'}`);
  console.log(` - Soft 404 Check: ${!ambalajIsSoft404 ? 'PASSED (No soft 404) ✅' : '🔴 FAILED (Soft 404 text found)'}`);
  console.log(` - Open Graph Title: "${ambalajOgTitle}" ${ambalajOgTitle === expectedAmbalajTitle ? '✅' : '🔴'}`);
  console.log(` - Open Graph Description: "${ambalajOgDesc}" ${ambalajOgDesc === expectedAmbalajDesc ? '✅' : '🔴'}`);
  console.log(` - Open Graph URL: "${ambalajOgUrl}" ${ambalajOgUrl === expectedAmbalajCanonical ? '✅' : '🔴'}`);
  console.log(` - Twitter Title: "${ambalajTwTitle}" ${ambalajTwTitle === expectedAmbalajTitle ? '✅' : '🔴'}`);
  console.log(` - Twitter Description: "${ambalajTwDesc}" ${ambalajTwDesc === expectedAmbalajDesc ? '✅' : '🔴'}`);
  console.log(` - JSON-LD Types Found: [${ambalajJsonLdTypes.join(', ')}] ${ambalajJsonLdTypes.includes('BreadcrumbList') && ambalajJsonLdTypes.includes('Service') && ambalajJsonLdTypes.includes('FAQPage') ? '✅' : '🔴'}`);
  console.log(` - Service Schema Name: "${ambalajServiceObj?.name}" ${ambalajServiceObj?.name === 'Ambalaj Kağıdı Baskısı ve Baskılı Sarım Çözümleri' ? '✅' : '🔴'}`);
  console.log(` - FAQPage Questions Count: ${ambalajFaqQuestionsCount} ${ambalajFaqQuestionsCount === 8 ? '✅ (Exact 8 questions)' : '🔴'}`);

  // Prohibited / certainty claims check on /ambalaj
  const ambalajProhibited = [
    'fabrika',
    'üretim tesisi',
    'imalat merkezi',
    'doğrudan üretici',
    'heidelberg',
    'polar giyotin',
    'iso 12647-2',
    'garantili',
    'gıda uyumluluğu garantisi',
    'kesin koruma'
  ];
  const foundAmbalajProhibited = ambalajProhibited.filter(w => 
    ambalajBody.toLowerCase().includes(w.toLowerCase())
  );
  console.log(` - Prohibited & Certainty Claims Check: ${foundAmbalajProhibited.length === 0 ? 'PASSED (0 found) ✅' : `FAILED (Found: ${foundAmbalajProhibited.join(', ')}) 🔴`}`);

  if (
    ambalajRes.status !== 200 ||
    ambalajTitles.length !== 1 ||
    ambalajTitle !== expectedAmbalajTitle ||
    ambalajDescriptions.length !== 1 ||
    ambalajDesc !== expectedAmbalajDesc ||
    ambalajCanonicals.length !== 1 ||
    ambalajCanonical !== expectedAmbalajCanonical ||
    ambalajH1Count !== 1 ||
    ambalajH1Text !== expectedAmbalajH1 ||
    !ambalajRobots.includes('index') ||
    !ambalajRobots.includes('follow') ||
    ambalajIsSoft404 ||
    ambalajOgTitle !== expectedAmbalajTitle ||
    ambalajOgDesc !== expectedAmbalajDesc ||
    ambalajOgUrl !== expectedAmbalajCanonical ||
    ambalajTwTitle !== expectedAmbalajTitle ||
    ambalajTwDesc !== expectedAmbalajDesc ||
    !ambalajJsonLdTypes.includes('BreadcrumbList') ||
    !ambalajJsonLdTypes.includes('Service') ||
    !ambalajJsonLdTypes.includes('FAQPage') ||
    ambalajFaqQuestionsCount !== 8 ||
    foundAmbalajProhibited.length > 0
  ) {
    totalPassed = -1;
  }

  server.close();

  if (totalPassed === ROUTES_TO_TEST.length) {
    console.log(`\n🎉 ALL ${ROUTES_TO_TEST.length} PRODUCTION HTTP ROUTE CHECKS & ASSERTIONS PASSED!`);
    process.exit(0);
  } else {
    console.error(`\n🔴 PRODUCTION HTTP ROUTE VALIDATION FAILED! (${totalPassed}/${ROUTES_TO_TEST.length})`);
    process.exit(1);
  }
}

validateProductionHTTP();


import { createServer } from 'http';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { chromium, Browser, Page } from 'playwright';

process.env.NODE_ENV = 'test';
process.env.DISABLE_AUTO_START = 'true';

const PORT = 4188;

async function runBrowserValidation() {
  console.log('🚀 VALIDATING SITE BROWSER NAVIGATION, ACQUIRELICENSEPAGE & 404 INTEGRITY...');

  const distPath = path.join(process.cwd(), 'dist');
  const indexPath = path.join(distPath, 'index.html');

  // If dist doesn't exist, we fallback to reading root index.html or build
  const templatePath = fs.existsSync(indexPath) ? indexPath : path.join(process.cwd(), 'index.html');
  const template = fs.readFileSync(templatePath, 'utf-8');

  const { getRouteSEO, isKnownRoute, injectSEOMetadata } = await import('./server');

  const app = express();
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath, { index: false }));
  }
  app.use(express.static(path.join(process.cwd(), 'public')));

  app.get('*', (req, res) => {
    try {
      const known = isKnownRoute(req.path);
      const statusCode = known ? 200 : 404;
      const seo = known
        ? getRouteSEO(req.path)
        : {
            title: '404 Sayfa Bulunamadı | Mavi Basım',
            desc: 'Aradığınız sayfa veya dijital matbaa ürünü bulunamadı.',
            canonical: `https://mavibasim.com${req.path}`,
          };
      const html = injectSEOMetadata(
        template,
        seo.title,
        seo.desc,
        seo.canonical,
        !known,
        seo.extraHead,
        seo.h1Text,
        seo.bodyContent
      );
      res.status(statusCode).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (err) {
      console.error('Server error on route:', req.path, err);
      res.status(500).send('Server Error');
    }
  });

  const server = createServer(app);
  await new Promise<void>((resolve) => server.listen(PORT, '127.0.0.1', () => resolve()));
  console.log(`✅ Test server running on http://127.0.0.1:${PORT}`);

  let browser: Browser | null = null;
  let allPassed = true;

  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page: Page = await browser.newPage({
      viewport: { width: 1280, height: 800 }
    });

    // 1. ROUTE STATUS CHECKS (404 istisnaları kaldırıldı - tüm rotalar kurallara tam uymalı)
    console.log('\n--- 1. ROUTE INTEGRITY & 404 VERIFICATION ---');
    const routesToTest = [
      { path: '/', expected: 200 },
      { path: '/yag-karti', expected: 200 },
      { path: '/matbaa', expected: 200 },
      { path: '/sektor/lokanta-amerikan-servis-baski', expected: 200 },
      { path: '/sektor/donerci-magnet-baski', expected: 200 },
      { path: '/trabzon-kafe-menu-baski', expected: 200 },
      { path: '/sektor/kafe-menu-baski', expected: 200 },
      { path: '/blog/emlak-yer-gosterme-belgesi-nedir', expected: 200 },
      { path: '/bloknotlar', expected: 200 },
      // Invalid unmapped routes must strictly return 404 without exception
      { path: '/sinop-kafe-bardak-altligi', expected: 404 },
      { path: '/amasya-kafe-bardak-altligi', expected: 404 },
      { path: '/gecersiz-rastgele-sayfa-404-test', expected: 404 }
    ];

    for (const r of routesToTest) {
      const response = await page.goto(`http://127.0.0.1:${PORT}${r.path}`, { waitUntil: 'domcontentloaded' });
      const status = response ? response.status() : 0;
      if (status !== r.expected) {
        console.error(`  🔴 Route ${r.path} expected status ${r.expected}, got ${status}`);
        allPassed = false;
      } else {
        console.log(`  ✅ Route ${r.path}: status ${status} (expected ${r.expected})`);
      }
    }

    // 2. ACQUIRELICENSEPAGE & JSON-LD AUDIT
    console.log('\n--- 2. ACQUIRELICENSEPAGE SCHEMA AUDIT ---');
    const schemaPagesToTest = [
      '/blog/emlak-yer-gosterme-belgesi-nedir',
      '/tahsilat-makbuzu',
      '/para-makbuzu',
      '/yag-karti',
      '/afis'
    ];

    for (const sPath of schemaPagesToTest) {
      await page.goto(`http://127.0.0.1:${PORT}${sPath}`, { waitUntil: 'domcontentloaded' });
      const schemas = await page.evaluate(() => {
        const scriptTags = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
        const collected: Record<string, unknown>[] = [];
        for (const tag of scriptTags) {
          try {
            const parsed = JSON.parse(tag.textContent || '');
            if (Array.isArray(parsed)) {
              collected.push(...(parsed as Record<string, unknown>[]));
            } else {
              collected.push(parsed as Record<string, unknown>);
            }
          } catch {
            // ignore
          }
        }
        return collected;
      });

      // Find any acquireLicensePage and copyrightNotice (telif) targets in ImageObject
      for (const obj of schemas) {
        if (obj && obj['@type'] === 'ImageObject') {
          if (obj.copyrightNotice) {
            console.log(`  Audited copyrightNotice (telif) on ${sPath}: "${obj.copyrightNotice}"`);
          }

          if (typeof obj.acquireLicensePage === 'string') {
            const targetUrl = obj.acquireLicensePage as string;
            console.log(`  Auditing acquireLicensePage on ${sPath}: "${targetUrl}"`);
            // Validate targetUrl does not point to homepage or invalid lisans
            if (targetUrl === 'https://mavibasim.com' || targetUrl === 'https://mavibasim.com/') {
              console.error(`  🔴 Invalid acquireLicensePage pointing to homepage on ${sPath}!`);
              allPassed = false;
            }
            const pathname = targetUrl.replace('https://mavibasim.com', '').replace('https://www.mavibasim.com', '');
            if (!isKnownRoute(pathname)) {
              console.error(`  🔴 Broken acquireLicensePage destination "${targetUrl}" on ${sPath}!`);
              allPassed = false;
            }
          }
        }
      }
      console.log(`  ✅ Schemas on ${sPath} checked successfully.`);
    }

    // 3. REAL BROWSER NAVIGATION TEST (page.goBack and page.goForward)
    console.log('\n--- 3. REAL BROWSER NAVIGATION TEST (goBack / goForward) ---');
    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
    const initialUrl = page.url();
    console.log(`  Current URL: ${initialUrl}`);

    // Navigate to /yag-karti
    await page.goto(`http://127.0.0.1:${PORT}/yag-karti`, { waitUntil: 'domcontentloaded' });
    console.log(`  Navigated to: ${page.url()}`);

    // Check breadcrumb text on /yag-karti
    const breadcrumbHtml = await page.evaluate(() => {
      const nav = document.querySelector('nav');
      return nav ? nav.textContent : '';
    });
    console.log(`  Breadcrumb text: ${breadcrumbHtml?.replace(/\s+/g, ' ').trim()}`);

    // Perform REAL browser back operation
    console.log('  Executing page.goBack()...');
    await page.goBack();
    const backUrl = page.url();
    console.log(`  After goBack URL: ${backUrl}`);
    if (!backUrl.endsWith(`:${PORT}/`)) {
      console.error(`  🔴 goBack failed to return to home, got: ${backUrl}`);
      allPassed = false;
    } else {
      console.log('  ✅ page.goBack() successfully restored home page!');
    }

    // Perform REAL browser forward operation
    console.log('  Executing page.goForward()...');
    await page.goForward();
    const forwardUrl = page.url();
    console.log(`  After goForward URL: ${forwardUrl}`);
    if (!forwardUrl.endsWith('/yag-karti') && !forwardUrl.endsWith('/yag-karti/')) {
      console.error(`  🔴 goForward failed to return to /yag-karti, got: ${forwardUrl}`);
      allPassed = false;
    } else {
      console.log('  ✅ page.goForward() successfully returned to /yag-karti!');
    }

    // 4. MOBILE 360PX VIEWPORT OVERFLOW CHECK
    console.log('\n--- 4. MOBILE 360PX VIEWPORT OVERFLOW AUDIT ---');
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
    console.log(`  Mobile 360px: document scrollWidth = ${scrollWidth}, body scrollWidth = ${bodyScrollWidth}`);

    if (scrollWidth > 360 || bodyScrollWidth > 360) {
      console.error(`  🔴 Page horizontal scroll detected on 360px viewport! (${scrollWidth}px / ${bodyScrollWidth}px)`);
      allPassed = false;
    } else {
      console.log('  ✅ Page fits completely within 360px viewport with 0px horizontal overflow!');
    }

  } catch (err) {
    console.error('Browser validation encountered error:', err);
    allPassed = false;
  } finally {
    if (browser) await browser.close();
    server.close();
  }

  if (allPassed) {
    console.log('\n🎉 ALL SITE BROWSER & NAVIGATION TESTS PASSED SUCCESSFULLY! 🎉\n');
    process.exit(0);
  } else {
    console.error('\n❌ SITE BROWSER VALIDATION FAILED! Check error logs above.\n');
    process.exit(1);
  }
}

runBrowserValidation();

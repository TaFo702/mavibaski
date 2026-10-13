import { createServer } from 'http';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { chromium, Browser, Page } from 'playwright';
import { JSDOM } from 'jsdom';

const PORT = 4310;

async function validateAmbalajFull() {
  console.log('🚀 STARTING COMPREHENSIVE SSR & HYDRATION AUDIT FOR /ambalaj...');

  const distPath = path.join(process.cwd(), 'dist');
  const indexPath = path.join(distPath, 'index.html');
  const prerenderAmbalajPath = path.join(distPath, 'ambalaj', 'index.html');

  if (!fs.existsSync(indexPath) || !fs.existsSync(prerenderAmbalajPath)) {
    console.error('🔴 dist/index.html or dist/ambalaj/index.html not found! Run npm run build first.');
    process.exit(1);
  }

  const app = express();
  app.use(express.static(distPath, { index: false }));

  // Route /ambalaj to the prerendered HTML file
  app.get('/ambalaj', (_req, res) => {
    const html = fs.readFileSync(prerenderAmbalajPath, 'utf-8');
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  });

  app.get('*', (req, res) => {
    const filePath = path.join(distPath, req.path.replace(/^\//, ''), 'index.html');
    if (fs.existsSync(filePath)) {
      return res.status(200).set({ 'Content-Type': 'text/html' }).end(fs.readFileSync(filePath, 'utf-8'));
    }
    res.status(200).set({ 'Content-Type': 'text/html' }).end(fs.readFileSync(indexPath, 'utf-8'));
  });

  const server = createServer(app);
  await new Promise<void>((resolve) => server.listen(PORT, '127.0.0.1', () => resolve()));
  console.log(`✅ Test server running on http://127.0.0.1:${PORT}`);

  // ==========================================
  // 1. SSR HTML AUDIT
  // ==========================================
  console.log('\n--- 1. SSR HTML AUDIT ---');
  const ssrRes = await fetch(`http://127.0.0.1:${PORT}/ambalaj`);
  const ssrStatus = ssrRes.status;
  const ssrHtml = await ssrRes.text();
  const ssrDom = new JSDOM(ssrHtml);
  const ssrDoc = ssrDom.window.document;

  const ssrTitles = Array.from(ssrDoc.querySelectorAll('title'));
  const ssrDescriptions = Array.from(ssrDoc.querySelectorAll('meta[name="description"]'));
  const ssrCanonicals = Array.from(ssrDoc.querySelectorAll('link[rel="canonical"]'));
  const ssrRobots = Array.from(ssrDoc.querySelectorAll('meta[name="robots"]'));
  const ssrOgTitles = Array.from(ssrDoc.querySelectorAll('meta[property="og:title"]'));
  const ssrOgDescriptions = Array.from(ssrDoc.querySelectorAll('meta[property="og:description"]'));
  const ssrOgUrls = Array.from(ssrDoc.querySelectorAll('meta[property="og:url"]'));
  const ssrOgImages = Array.from(ssrDoc.querySelectorAll('meta[property="og:image"]'));
  const ssrTwTitles = Array.from(ssrDoc.querySelectorAll('meta[name="twitter:title"]'));
  const ssrTwDescriptions = Array.from(ssrDoc.querySelectorAll('meta[name="twitter:description"]'));
  const ssrTwImages = Array.from(ssrDoc.querySelectorAll('meta[name="twitter:image"]'));

  const ssrScripts = Array.from(ssrDoc.querySelectorAll('script[type="application/ld+json"]'));
  const ssrJsonLdObjects: any[] = [];
  ssrScripts.forEach((s) => {
    try {
      const parsed = JSON.parse(s.textContent || '{}');
      if (Array.isArray(parsed)) {
        ssrJsonLdObjects.push(...parsed);
      } else {
        ssrJsonLdObjects.push(parsed);
      }
    } catch {
      // ignore JSON parse error
    }
  });

  const ssrBreadcrumb = ssrJsonLdObjects.find((o) => o['@type'] === 'BreadcrumbList');
  const ssrService = ssrJsonLdObjects.find((o) => o['@type'] === 'Service');
  const ssrFAQPage = ssrJsonLdObjects.find((o) => o['@type'] === 'FAQPage');
  const ssrProduct = ssrJsonLdObjects.find((o) => o['@type'] === 'Product');
  const ssrOffer = ssrJsonLdObjects.find((o) => o['@type'] === 'Offer');

  // SSR Table Cells Extraction
  // Find table with caption "Standart Ambalaj Kâğıdı Paket ve Fiyat Listesi"
  const ssrTables = Array.from(ssrDoc.querySelectorAll('table'));
  const ssrPriceTable = ssrTables.find((t) =>
    t.querySelector('caption')?.textContent?.includes('Standart Ambalaj Kâğıdı Paket ve Fiyat Listesi')
  );
  if (!ssrPriceTable) {
    throw new Error('SSR Price table not found!');
  }

  const ssrRows = Array.from(ssrPriceTable.querySelectorAll('tbody tr'));
  const ssrTableCells: string[][] = ssrRows.map((row) => {
    const cells = Array.from(row.querySelectorAll('th, td'));
    return cells.map((c) => c.textContent?.trim() || '');
  });

  console.log(`SSR HTTP Status: ${ssrStatus}`);
  console.log(`SSR Titles (${ssrTitles.length}): "${ssrTitles[0]?.textContent}"`);
  console.log(`SSR Meta Descriptions (${ssrDescriptions.length}): "${ssrDescriptions[0]?.getAttribute('content')}"`);
  console.log(`SSR Canonicals (${ssrCanonicals.length}): "${ssrCanonicals[0]?.getAttribute('href')}"`);
  console.log(`SSR Robots (${ssrRobots.length}): "${ssrRobots[0]?.getAttribute('content')}"`);
  console.log(`SSR og:title (${ssrOgTitles.length}): "${ssrOgTitles[0]?.getAttribute('content')}"`);
  console.log(`SSR og:description (${ssrOgDescriptions.length}): "${ssrOgDescriptions[0]?.getAttribute('content')}"`);
  console.log(`SSR og:url (${ssrOgUrls.length}): "${ssrOgUrls[0]?.getAttribute('content')}"`);
  console.log(`SSR og:image (${ssrOgImages.length}): "${ssrOgImages[0]?.getAttribute('content')}"`);
  console.log(`SSR twitter:title (${ssrTwTitles.length}): "${ssrTwTitles[0]?.getAttribute('content')}"`);
  console.log(`SSR twitter:description (${ssrTwDescriptions.length}): "${ssrTwDescriptions[0]?.getAttribute('content')}"`);
  console.log(`SSR twitter:image (${ssrTwImages.length}): "${ssrTwImages[0]?.getAttribute('content')}"`);
  console.log(`SSR JSON-LD Types: ${ssrJsonLdObjects.map((o) => o['@type']).join(', ')}`);
  console.log(`SSR BreadcrumbList: ${ssrBreadcrumb ? 'Found ✅' : 'Missing 🔴'}`);
  console.log(`SSR Service: ${ssrService ? 'Found ✅' : 'Missing 🔴'} (provider: ${ssrService?.provider?.['@type']})`);
  console.log(`SSR FAQPage: ${ssrFAQPage ? 'Found ✅' : 'Missing 🔴'} (${ssrFAQPage?.mainEntity?.length || 0} questions)`);
  console.log(`SSR Product/Offer schema: ${!ssrProduct && !ssrOffer ? 'NONE (PASSED ✅)' : 'FOUND (FAILED 🔴)'}`);

  // ==========================================
  // 2. PLAYWRIGHT REAL BROWSER HYDRATION AUDIT
  // ==========================================
  console.log('\n--- 2. REAL BROWSER HYDRATION AUDIT (PLAYWRIGHT) ---');
  const browser: Browser = await chromium.launch({ headless: true });
  const page: Page = await browser.newPage();

  await page.goto(`http://127.0.0.1:${PORT}/ambalaj`, { waitUntil: 'networkidle' });

  // Wait a moment for any useEffects / Helmet reconciliation
  await page.waitForTimeout(1000);

  const hydratedData = await page.evaluate(() => {
    const titles = Array.from(document.querySelectorAll('title')).map((t) => t.textContent?.trim() || '');
    const descriptions = Array.from(document.querySelectorAll('meta[name="description"]')).map((m) => m.getAttribute('content') || '');
    const canonicals = Array.from(document.querySelectorAll('link[rel="canonical"]')).map((l) => l.getAttribute('href') || '');
    const robots = Array.from(document.querySelectorAll('meta[name="robots"]')).map((m) => m.getAttribute('content') || '');
    const ogTitles = Array.from(document.querySelectorAll('meta[property="og:title"]')).map((m) => m.getAttribute('content') || '');
    const ogDescriptions = Array.from(document.querySelectorAll('meta[property="og:description"]')).map((m) => m.getAttribute('content') || '');
    const ogUrls = Array.from(document.querySelectorAll('meta[property="og:url"]')).map((m) => m.getAttribute('content') || '');
    const ogImages = Array.from(document.querySelectorAll('meta[property="og:image"]')).map((m) => m.getAttribute('content') || '');
    const twTitles = Array.from(document.querySelectorAll('meta[name="twitter:title"]')).map((m) => m.getAttribute('content') || '');
    const twDescriptions = Array.from(document.querySelectorAll('meta[name="twitter:description"]')).map((m) => m.getAttribute('content') || '');
    const twImages = Array.from(document.querySelectorAll('meta[name="twitter:image"]')).map((m) => m.getAttribute('content') || '');

    const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const jsonLdObjects: any[] = [];
    scripts.forEach((s) => {
      try {
        const parsed = JSON.parse(s.textContent || '{}');
        if (Array.isArray(parsed)) {
          jsonLdObjects.push(...parsed);
        } else {
          jsonLdObjects.push(parsed);
        }
      } catch {
        // ignore JSON parse error
      }
    });

    const tables = Array.from(document.querySelectorAll('table'));
    const priceTable = tables.find((t) =>
      t.querySelector('caption')?.textContent?.includes('Standart Ambalaj Kâğıdı Paket ve Fiyat Listesi')
    );

    const rows = priceTable ? Array.from(priceTable.querySelectorAll('tbody tr')) : [];
    const tableCells = rows.map((row) => {
      const cells = Array.from(row.querySelectorAll('th, td'));
      return cells.map((c) => c.textContent?.trim() || '');
    });

    return {
      titles,
      descriptions,
      canonicals,
      robots,
      ogTitles,
      ogDescriptions,
      ogUrls,
      ogImages,
      twTitles,
      twDescriptions,
      twImages,
      jsonLdObjects,
      tableCells
    };
  });

  await browser.close();
  server.close();

  const hyBreadcrumb = hydratedData.jsonLdObjects.find((o: any) => o['@type'] === 'BreadcrumbList');
  const hyService = hydratedData.jsonLdObjects.find((o: any) => o['@type'] === 'Service');
  const hyFAQPage = hydratedData.jsonLdObjects.find((o: any) => o['@type'] === 'FAQPage');
  const hyProduct = hydratedData.jsonLdObjects.find((o: any) => o['@type'] === 'Product');
  const hyOffer = hydratedData.jsonLdObjects.find((o: any) => o['@type'] === 'Offer');

  console.log(`Hydrated Titles (${hydratedData.titles.length}): "${hydratedData.titles[0]}"`);
  console.log(`Hydrated Meta Descriptions (${hydratedData.descriptions.length}): "${hydratedData.descriptions[0]}"`);
  console.log(`Hydrated Canonicals (${hydratedData.canonicals.length}): "${hydratedData.canonicals[0]}"`);
  console.log(`Hydrated Robots (${hydratedData.robots.length}): "${hydratedData.robots[0]}"`);
  console.log(`Hydrated og:title (${hydratedData.ogTitles.length}): "${hydratedData.ogTitles[0]}"`);
  console.log(`Hydrated og:description (${hydratedData.ogDescriptions.length}): "${hydratedData.ogDescriptions[0]}"`);
  console.log(`Hydrated og:url (${hydratedData.ogUrls.length}): "${hydratedData.ogUrls[0]}"`);
  console.log(`Hydrated og:image (${hydratedData.ogImages.length}): "${hydratedData.ogImages[0]}"`);
  console.log(`Hydrated twitter:title (${hydratedData.twTitles.length}): "${hydratedData.twTitles[0]}"`);
  console.log(`Hydrated twitter:description (${hydratedData.twDescriptions.length}): "${hydratedData.twDescriptions[0]}"`);
  console.log(`Hydrated twitter:image (${hydratedData.twImages.length}): "${hydratedData.twImages[0]}"`);
  console.log(`Hydrated JSON-LD Types: ${hydratedData.jsonLdObjects.map((o: any) => o['@type']).join(', ')}`);
  console.log(`Hydrated BreadcrumbList: ${hyBreadcrumb ? 'Found ✅' : 'Missing 🔴'}`);
  console.log(`Hydrated Service: ${hyService ? 'Found ✅' : 'Missing 🔴'} (provider: ${hyService?.provider?.['@type']})`);
  console.log(`Hydrated FAQPage: ${hyFAQPage ? 'Found ✅' : 'Missing 🔴'} (${hyFAQPage?.mainEntity?.length || 0} questions)`);
  console.log(`Hydrated Product/Offer schema: ${!hyProduct && !hyOffer ? 'NONE (PASSED ✅)' : 'FOUND (FAILED 🔴)'}`);

  // ==========================================
  // 3. TABLE CELL COMPARISON
  // ==========================================
  console.log('\n--- 3. TABLE CELL COMPARISON (SSR vs HYDRATED) ---');
  console.log('SSR Table Cells:');
  console.log(JSON.stringify(ssrTableCells, null, 2));
  console.log('Hydrated Table Cells:');
  console.log(JSON.stringify(hydratedData.tableCells, null, 2));

  let tableMatch = true;
  if (ssrTableCells.length !== hydratedData.tableCells.length) {
    console.error(`Row count mismatch: SSR has ${ssrTableCells.length}, Hydrated has ${hydratedData.tableCells.length}`);
    tableMatch = false;
  } else {
    for (let r = 0; r < ssrTableCells.length; r++) {
      for (let c = 0; c < ssrTableCells[r].length; c++) {
        const ssrVal = ssrTableCells[r][c];
        const hyVal = hydratedData.tableCells[r][c];
        if (ssrVal !== hyVal) {
          console.error(`Mismatch at Row ${r}, Col ${c}: SSR="${ssrVal}" vs Hydrated="${hyVal}"`);
          tableMatch = false;
        }
      }
    }
  }

  if (tableMatch) {
    console.log('🎉 AUTOMATED TABLE COMPARISON PASSED: Every cell is 100% identical between SSR and Hydration! ✅');
  } else {
    console.error('🔴 AUTOMATED TABLE COMPARISON FAILED!');
    process.exit(1);
  }

  // ==========================================
  // 4. METADATA & SCHEMA VERIFICATION ASSERTIONS
  // ==========================================
  let assertionsPassed = true;

  // SSR assertions
  if (ssrStatus !== 200) { assertionsPassed = false; console.error('SSR status != 200'); }
  if (ssrTitles.length !== 1) { assertionsPassed = false; console.error(`SSR titles count: ${ssrTitles.length}`); }
  if (ssrDescriptions.length !== 1) { assertionsPassed = false; console.error(`SSR descriptions count: ${ssrDescriptions.length}`); }
  if (ssrCanonicals.length !== 1) { assertionsPassed = false; console.error(`SSR canonicals count: ${ssrCanonicals.length}`); }
  if (ssrRobots.length !== 1) { assertionsPassed = false; console.error(`SSR robots count: ${ssrRobots.length}`); }
  if (ssrOgTitles.length !== 1) { assertionsPassed = false; console.error(`SSR og:titles count: ${ssrOgTitles.length}`); }
  if (ssrOgDescriptions.length !== 1) { assertionsPassed = false; console.error(`SSR og:descriptions count: ${ssrOgDescriptions.length}`); }
  if (ssrOgUrls.length !== 1) { assertionsPassed = false; console.error(`SSR og:urls count: ${ssrOgUrls.length}`); }
  if (ssrOgImages.length !== 1) { assertionsPassed = false; console.error(`SSR og:images count: ${ssrOgImages.length}`); }
  if (ssrTwTitles.length !== 1) { assertionsPassed = false; console.error(`SSR twitter:titles count: ${ssrTwTitles.length}`); }
  if (ssrTwDescriptions.length !== 1) { assertionsPassed = false; console.error(`SSR twitter:descriptions count: ${ssrTwDescriptions.length}`); }
  if (ssrTwImages.length !== 1) { assertionsPassed = false; console.error(`SSR twitter:images count: ${ssrTwImages.length}`); }
  if (!ssrBreadcrumb) { assertionsPassed = false; console.error('SSR BreadcrumbList missing'); }
  if (!ssrService) { assertionsPassed = false; console.error('SSR Service missing'); }
  if (ssrService?.provider?.['@type'] !== 'Organization') { assertionsPassed = false; console.error(`SSR Service provider not Organization: ${ssrService?.provider?.['@type']}`); }
  if (!ssrFAQPage) { assertionsPassed = false; console.error('SSR FAQPage missing'); }
  if (ssrFAQPage?.mainEntity?.length !== 8) { assertionsPassed = false; console.error(`SSR FAQ count not 8: ${ssrFAQPage?.mainEntity?.length}`); }
  if (ssrProduct || ssrOffer) { assertionsPassed = false; console.error('SSR Product or Offer schema found!'); }

  // Hydrated assertions
  if (hydratedData.titles.length !== 1) { assertionsPassed = false; console.error(`Hydrated titles count: ${hydratedData.titles.length}`); }
  if (hydratedData.descriptions.length !== 1) { assertionsPassed = false; console.error(`Hydrated descriptions count: ${hydratedData.descriptions.length}`); }
  if (hydratedData.canonicals.length !== 1) { assertionsPassed = false; console.error(`Hydrated canonicals count: ${hydratedData.canonicals.length}`); }
  if (hydratedData.robots.length !== 1) { assertionsPassed = false; console.error(`Hydrated robots count: ${hydratedData.robots.length}`); }
  if (hydratedData.ogTitles.length !== 1) { assertionsPassed = false; console.error(`Hydrated og:titles count: ${hydratedData.ogTitles.length}`); }
  if (hydratedData.ogDescriptions.length !== 1) { assertionsPassed = false; console.error(`Hydrated og:descriptions count: ${hydratedData.ogDescriptions.length}`); }
  if (hydratedData.ogUrls.length !== 1) { assertionsPassed = false; console.error(`Hydrated og:urls count: ${hydratedData.ogUrls.length}`); }
  if (hydratedData.ogImages.length !== 1) { assertionsPassed = false; console.error(`Hydrated og:images count: ${hydratedData.ogImages.length}`); }
  if (hydratedData.twTitles.length !== 1) { assertionsPassed = false; console.error(`Hydrated twitter:titles count: ${hydratedData.twTitles.length}`); }
  if (hydratedData.twDescriptions.length !== 1) { assertionsPassed = false; console.error(`Hydrated twitter:descriptions count: ${hydratedData.twDescriptions.length}`); }
  if (hydratedData.twImages.length !== 1) { assertionsPassed = false; console.error(`Hydrated twitter:images count: ${hydratedData.twImages.length}`); }
  if (!hyBreadcrumb) { assertionsPassed = false; console.error('Hydrated BreadcrumbList missing'); }
  if (!hyService) { assertionsPassed = false; console.error('Hydrated Service missing'); }
  if (hyService?.provider?.['@type'] !== 'Organization') { assertionsPassed = false; console.error(`Hydrated Service provider not Organization: ${hyService?.provider?.['@type']}`); }
  if (!hyFAQPage) { assertionsPassed = false; console.error('Hydrated FAQPage missing'); }
  if (hyFAQPage?.mainEntity?.length !== 8) { assertionsPassed = false; console.error(`Hydrated FAQ count not 8: ${hyFAQPage?.mainEntity?.length}`); }
  if (hyProduct || hyOffer) { assertionsPassed = false; console.error('Hydrated Product or Offer schema found!'); }

  if (assertionsPassed) {
    console.log('\n🎉 ALL 18 SPECIFIED CHECKS (SSR & HYDRATED) PASSED WITH FLYING COLORS! ✅');
  } else {
    console.error('\n🔴 SOME ASSERTIONS FAILED!');
    process.exit(1);
  }
}

validateAmbalajFull().catch((err) => {
  console.error('Fatal error during validation:', err);
  process.exit(1);
});

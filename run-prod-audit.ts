import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

interface AuditRouteResult {
  route: string;
  status: number;
  title: string;
  metaDescription: string;
  canonical: string;
  robots: string;
  h1Count: number;
  h1Text: string;
  h2Count: number;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  jsonLdSchemas: any[];
  imagesWithoutAlt: number;
  totalImages: number;
  consoleErrors: string[];
}

async function runProductionReleaseAudit() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // filter out analytics/websocket network aborts which are expected in sandbox
      if (!text.includes('analytics.google.com') && !text.includes('ERR_ABORTED') && !text.includes('vite')) {
        consoleErrors.push(text);
      }
    }
  });

  const routes = [
    '/',
    '/kartvizit',
    '/afis',
    '/para-makbuzu',
    '/tahsilat-makbuzu',
    '/istanbul-matbaa',
    '/ankara-matbaa',
    '/blog',
    '/blog/ofset-baski-nasil-yapilir',
    '/non-existent-404-check'
  ];

  const routeResults: Record<string, AuditRouteResult> = {};

  for (const route of routes) {
    const url = `http://localhost:3000${route}`;
    let status = 200;
    
    try {
      const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      if (res) status = res.status();
    } catch (e) {
      status = 500;
    }

    await page.waitForTimeout(1000);

    const title = await page.title();
    const metaDescription = await page.$eval('meta[name="description"]', el => el.getAttribute('content') || '').catch(() => '');
    const canonical = await page.$eval('link[rel="canonical"]', el => el.getAttribute('href') || '').catch(() => '');
    const robots = await page.$eval('meta[name="robots"]', el => el.getAttribute('content') || '').catch(() => '');
    const h1s = await page.$$eval('h1', els => els.map(e => e.textContent?.trim() || ''));
    const h2Count = (await page.$$('h2')).length;

    const ogTitle = await page.$eval('meta[property="og:title"]', el => el.getAttribute('content') || '').catch(() => '');
    const ogDescription = await page.$eval('meta[property="og:description"]', el => el.getAttribute('content') || '').catch(() => '');
    const ogImage = await page.$eval('meta[property="og:image"]', el => el.getAttribute('content') || '').catch(() => '');
    const twitterCard = await page.$eval('meta[name="twitter:card"]', el => el.getAttribute('content') || '').catch(() => '');

    const scriptTexts = await page.$$eval('script[type="application/ld+json"]', els => els.map(e => e.textContent || ''));
    const jsonLdSchemas: any[] = [];
    for (const st of scriptTexts) {
      try {
        const parsed = JSON.parse(st);
        if (Array.isArray(parsed)) jsonLdSchemas.push(...parsed);
        else if (parsed['@graph'] && Array.isArray(parsed['@graph'])) jsonLdSchemas.push(...parsed['@graph']);
        else jsonLdSchemas.push(parsed);
      } catch (e) { void e; }
    }

    const imagesWithoutAlt = await page.$$eval('img', imgs => imgs.filter(i => !i.getAttribute('alt')?.trim()).length);
    const totalImages = (await page.$$('img')).length;

    routeResults[route] = {
      route,
      status,
      title,
      metaDescription,
      canonical,
      robots,
      h1Count: h1s.length,
      h1Text: h1s[0] || '',
      h2Count,
      ogTitle,
      ogDescription,
      ogImage,
      twitterCard,
      jsonLdSchemas,
      imagesWithoutAlt,
      totalImages,
      consoleErrors: [...consoleErrors]
    };
    consoleErrors.length = 0; // reset for next page
  }

  await browser.close();

  const outputDir = path.join(process.cwd(), 'schema-audit');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'prod-release-audit.json'), JSON.stringify(routeResults, null, 2));

  console.log('Production release audit finished successfully.');
}

runProductionReleaseAudit().catch(console.error);

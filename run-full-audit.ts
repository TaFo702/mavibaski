import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const routes = [
  '/',
  '/kartvizit',
  '/brosur',
  '/afis',
  '/oto-paspas',
  '/karton-canta',
  '/para-makbuzu',
  '/tahsilat-makbuzu',
  '/istanbul-matbaa',
  '/ankara-matbaa',
  '/sinop-matbaa',
  '/duzce-matbaa',
  '/sektor/restoran-brosur-baski',
  '/blog/ofset-baski-nasil-yapilir'
];

const rawJsonRoutes: Record<string, string> = {
  '/': 'schema-audit/home.json',
  '/afis': 'schema-audit/afis.json',
  '/oto-paspas': 'schema-audit/oto-paspas.json',
  '/karton-canta': 'schema-audit/karton-canta.json',
  '/para-makbuzu': 'schema-audit/para-makbuzu.json',
  '/istanbul-matbaa': 'schema-audit/istanbul-matbaa.json',
  '/ankara-matbaa': 'schema-audit/ankara-matbaa.json',
  '/blog/ofset-baski-nasil-yapilir': 'schema-audit/blog-ofset.json'
};

interface SchemaStats {
  route: string;
  totalScripts: number;
  totalNodes: number;
  counts: Record<string, number>;
  rawScripts: any[];
  duplicates: {
    critical: string[];
    warnings: string[];
  };
}

interface RequestFailure {
  route: string;
  url: string;
  type: string;
  status: number | string;
  initiator: string;
  isAppAsset: boolean;
  isCritical: boolean;
}

interface PageVerification {
  route: string;
  httpStatus: number;
  rootLength: number;
  h1: string;
  title: string;
  canonical: string;
  consoleErrors: number;
  pageErrors: number;
  localAssetErrors: number;
}

async function auditEnvironment(baseUrl: string) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const allSchemaStats: SchemaStats[] = [];
  const allFailedRequests: RequestFailure[] = [];
  const allPageVerifications: PageVerification[] = [];

  fs.mkdirSync('schema-audit', { recursive: true });

  for (const route of routes) {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const failedRequests: RequestFailure[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    page.on('pageerror', err => {
      pageErrors.push(err.message);
    });

    page.on('requestfailed', req => {
      const failure = req.failure()?.errorText || 'Failed';
      const url = req.url();
      const type = req.resourceType();
      const isAppAsset = url.includes(baseUrl) || url.startsWith('/');
      const isCritical = isAppAsset && (type === 'document' || type === 'script' || type === 'stylesheet');
      
      failedRequests.push({
        route,
        url,
        type,
        status: failure,
        initiator: 'browser',
        isAppAsset,
        isCritical
      });
    });

    page.on('response', res => {
      if (res.status() >= 400) {
        const url = res.url();
        const type = res.request().resourceType();
        const isAppAsset = url.includes(baseUrl) || url.startsWith('/') || url.includes('localhost');
        const isCritical = isAppAsset && (type === 'document' || type === 'script' || type === 'stylesheet');
        
        failedRequests.push({
          route,
          url,
          type,
          status: res.status(),
          initiator: 'network response',
          isAppAsset,
          isCritical
        });
      }
    });

    let httpStatus = 200;
    try {
      const res = await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle', timeout: 15000 });
      if (res) httpStatus = res.status();
    } catch (err: any) {
      httpStatus = 500;
    }

    await page.waitForTimeout(1500);

    // Page details
    const rootLength = await page.evaluate(() => document.getElementById('root')?.innerHTML.length || 0);
    const h1 = await page.evaluate(() => document.querySelector('h1')?.textContent?.trim() || '');
    const title = await page.evaluate(() => document.title || '');
    const canonical = await page.evaluate(() => document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '');

    // Collect JSON-LD scripts
    const rawScriptsText = await page.$$eval('script[type="application/ld+json"]', elements =>
      elements.map(el => el.textContent || '')
    );

    const parsedObjects: any[] = [];
    const allNodes: any[] = [];
    const counts: Record<string, number> = {
      WebSite: 0,
      WebPage: 0,
      Organization: 0,
      LocalBusiness: 0,
      ProfessionalService: 0,
      Product: 0,
      ProductGroup: 0,
      Service: 0,
      BreadcrumbList: 0,
      FAQPage: 0,
      ItemList: 0,
      ImageObject: 0,
      VideoObject: 0,
      Article: 0,
      BlogPosting: 0,
      HowTo: 0
    };

    const idsSeen = new Map<string, number>();
    const typeCounts = new Map<string, number>();
    const rawContentSet = new Set<string>();

    const criticalDups: string[] = [];
    const warningDups: string[] = [];

    for (const text of rawScriptsText) {
      if (rawContentSet.has(text.trim())) {
        criticalDups.push(`Identical JSON-LD script content repeated`);
      } else {
        rawContentSet.add(text.trim());
      }

      try {
        const obj = JSON.parse(text);
        parsedObjects.push(obj);

        const extractNodes = (item: any) => {
          if (!item || typeof item !== 'object') return;
          if (Array.isArray(item)) {
            item.forEach(extractNodes);
            return;
          }
          if (item['@graph'] && Array.isArray(item['@graph'])) {
            item['@graph'].forEach(extractNodes);
            return;
          }

          allNodes.push(item);
          const type = item['@type'];
          if (type) {
            const types = Array.isArray(type) ? type : [type];
            types.forEach(t => {
              if (counts[t] !== undefined) counts[t]++;
              else counts[t] = 1;

              typeCounts.set(t, (typeCounts.get(t) || 0) + 1);
            });
          }

          if (item['@id']) {
            idsSeen.set(item['@id'], (idsSeen.get(item['@id']) || 0) + 1);
          }
        };

        extractNodes(obj);
      } catch (e) {
        criticalDups.push(`Invalid JSON script tag`);
      }
    }

    // Check critical duplicates
    if ((counts.BreadcrumbList || 0) > 1) criticalDups.push(`BreadcrumbList count > 1 (${counts.BreadcrumbList})`);
    if ((counts.FAQPage || 0) > 1) criticalDups.push(`FAQPage count > 1 (${counts.FAQPage})`);
    if ((counts.WebSite || 0) > 1) criticalDups.push(`WebSite count > 1 (${counts.WebSite})`);
    if ((counts.WebPage || 0) > 1) criticalDups.push(`WebPage count > 1 (${counts.WebPage})`);
    if ((counts.Product || 0) > 0 && (counts.Service || 0) > 0) {
      criticalDups.push(`Product AND Service present on same page`);
    }

    for (const [id, num] of idsSeen.entries()) {
      if (num > 1) criticalDups.push(`Duplicate @id found: ${id} (${num} times)`);
    }

    if ((counts.ImageObject || 0) > 1) warningDups.push(`ImageObject count > 1 (${counts.ImageObject})`);
    if ((counts.ItemList || 0) > 1) warningDups.push(`ItemList count > 1 (${counts.ItemList})`);

    const stats: SchemaStats = {
      route,
      totalScripts: rawScriptsText.length,
      totalNodes: allNodes.length,
      counts,
      rawScripts: parsedObjects,
      duplicates: {
        critical: criticalDups,
        warnings: warningDups
      }
    };

    allSchemaStats.push(stats);

    // Save to schema-audit files if required
    if (rawJsonRoutes[route]) {
      const filePath = rawJsonRoutes[route];
      fs.writeFileSync(filePath, JSON.stringify(parsedObjects, null, 2), 'utf-8');
    }

    const localAssetFailures = failedRequests.filter(f => f.isAppAsset).length;

    allPageVerifications.push({
      route,
      httpStatus,
      rootLength,
      h1,
      title,
      canonical,
      consoleErrors: consoleErrors.length,
      pageErrors: pageErrors.length,
      localAssetErrors: localAssetFailures
    });

    allFailedRequests.push(...failedRequests);

    // clean listeners
    page.removeAllListeners('console');
    page.removeAllListeners('pageerror');
    page.removeAllListeners('requestfailed');
    page.removeAllListeners('response');
  }

  await browser.close();

  return {
    allSchemaStats,
    allFailedRequests,
    allPageVerifications
  };
}

async function run() {
  console.log('Auditing Dev Environment at http://127.0.0.1:3000...');
  const devResults = await auditEnvironment('http://127.0.0.1:3000');

  fs.writeFileSync('dev_audit_results.json', JSON.stringify(devResults, null, 2));
  console.log('Dev audit finished. Results saved to dev_audit_results.json.');
}

run().catch(console.error);

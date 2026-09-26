import { chromium } from 'playwright';

interface SchemaCount {
  route: string;
  totalJsonLdScripts: number;
  breadcrumbList: number;
  organization: number;
  localBusiness: number;
  product: number;
  service: number;
  faqPage: number;
  webSite: number;
  webPage: number;
  otherTypes: string[];
  duplicateTypes: string[];
  duplicateIds: string[];
}

const routesToAudit = [
  '/',
  '/afis',
  '/oto-paspas',
  '/karton-canta',
  '/para-makbuzu',
  '/tahsilat-makbuzu',
  '/istanbul-matbaa',
  '/ankara-matbaa',
  '/sinop-matbaa',
  '/duzce-matbaa',
];

async function auditDOMSchemas() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const results: SchemaCount[] = [];

  for (const route of routesToAudit) {
    const url = `http://localhost:3000${route}`;
    page.on('requestfailed', request => {
      console.log(`REQUEST FAILED on ${route}: ${request.url()} - ${request.failure()?.errorText}`);
    });
    page.on('response', response => {
      if (response.status() >= 400) {
        console.log(`HTTP ${response.status()} on ${route}: ${response.url()}`);
      }
    });

    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2000);

    const headHTML = await page.evaluate(() => document.head.innerHTML);
    if (route === '/') {
      console.log('--- HEAD HTML FOR / ---');
      console.log(headHTML);
    }

    const scripts = await page.$$eval('script[type="application/ld+json"]', elements => {
      return elements.map(el => el.textContent || '');
    });

    if (route === '/') {
      console.log('--- RAW SCRIPT FOR / ---');
      console.log(scripts[0]);
    }

    const parsedSchemas: any[] = [];
    for (const scriptText of scripts) {
      try {
        const json = JSON.parse(scriptText);
        if (Array.isArray(json)) {
          parsedSchemas.push(...json);
        } else {
          parsedSchemas.push(json);
        }
      } catch (err) {
        console.error(`JSON parse error on route ${route}:`, err);
      }
    }

    let breadcrumbList = 0;
    let organization = 0;
    let localBusiness = 0;
    let product = 0;
    let service = 0;
    let faqPage = 0;
    let webSite = 0;
    let webPage = 0;
    const otherTypes: string[] = [];

    const typeCounts: Record<string, number> = {};
    const idCounts: Record<string, number> = {};

    for (const schema of parsedSchemas) {
      if (!schema || typeof schema !== 'object') continue;
      const type = schema['@type'];
      const id = schema['@id'];

      if (id) {
        idCounts[id] = (idCounts[id] || 0) + 1;
      }

      if (type) {
        typeCounts[type] = (typeCounts[type] || 0) + 1;

        if (type === 'BreadcrumbList') breadcrumbList++;
        else if (type === 'Organization') organization++;
        else if (type === 'LocalBusiness' || type === 'PrintingService' || type === 'ProfessionalService') {
          localBusiness++;
        }
        else if (type === 'Product') product++;
        else if (type === 'Service') service++;
        else if (type === 'FAQPage') faqPage++;
        else if (type === 'WebSite') webSite++;
        else if (type === 'WebPage') webPage++;
        else otherTypes.push(type);
      }
    }

    const duplicateTypes = Object.entries(typeCounts)
      .filter(([type, count]) => count > 1 && type !== 'Product' && type !== 'Offer')
      .map(([type, count]) => `${type}:${count}`);

    const duplicateIds = Object.entries(idCounts)
      .filter(([_, count]) => count > 1)
      .map(([id, count]) => `${id}:${count}`);

    results.push({
      route,
      totalJsonLdScripts: scripts.length,
      breadcrumbList,
      organization,
      localBusiness,
      product,
      service,
      faqPage,
      webSite,
      webPage,
      otherTypes,
      duplicateTypes,
      duplicateIds,
    });
  }

  await browser.close();

  console.log('\n=================== BROWSER DOM SCHEMA AUDIT TABLE ===================');
  console.table(
    results.map(r => ({
      Route: r.route,
      'Total Scripts': r.totalJsonLdScripts,
      BreadcrumbList: r.breadcrumbList,
      Organization: r.organization,
      LocalBusiness: r.localBusiness,
      Product: r.product,
      Service: r.service,
      FAQPage: r.faqPage,
      WebSite: r.webSite,
      WebPage: r.webPage,
      Duplicates: r.duplicateTypes.join(', ') || 'None',
      DuplicateIDs: r.duplicateIds.join(', ') || 'None',
    }))
  );
}

auditDOMSchemas().catch(console.error);

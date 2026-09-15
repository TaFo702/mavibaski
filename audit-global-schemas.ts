import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const routesToTest = [
  '/',
  '/kartvizit',
  '/afis',
  '/para-makbuzu',
  '/istanbul-matbaa',
  '/ankara-matbaa',
  '/blog/ofset-baski-nasil-yapilir'
];

async function runGlobalAudit() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const auditResults: Record<string, any> = {};

  for (const route of routesToTest) {
    const url = `http://localhost:3000${route}`;
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(1500);

    const scriptTexts = await page.$$eval('script[type="application/ld+json"]', els => els.map(e => e.textContent || ''));

    const parsedNodes: any[] = [];
    for (const st of scriptTexts) {
      try {
        const json = JSON.parse(st);
        if (Array.isArray(json)) {
          parsedNodes.push(...json);
        } else if (json['@graph'] && Array.isArray(json['@graph'])) {
          parsedNodes.push(...json['@graph']);
        } else {
          parsedNodes.push(json);
        }
      } catch (e) { void e; }
    }

    // Filter global schemas: WebSite, Organization, LocalBusiness
    const websites = parsedNodes.filter(n => n && n['@type'] === 'WebSite');
    const orgs = parsedNodes.filter(n => n && n['@type'] === 'Organization');
    const localBusinesses = parsedNodes.filter(n => n && (n['@type'] === 'LocalBusiness' || n['@type'] === 'ProfessionalService'));

    auditResults[route] = {
      route,
      scriptCount: scriptTexts.length,
      parsedNodesCount: parsedNodes.length,
      websites,
      orgs,
      localBusinesses,
      allParsedNodes: parsedNodes
    };
  }

  await browser.close();

  const outputDir = path.join(process.cwd(), 'schema-audit');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Save targeted raw global output JSON files
  fs.writeFileSync(path.join(outputDir, 'global-home.json'), JSON.stringify(auditResults['/'], null, 2));
  fs.writeFileSync(path.join(outputDir, 'global-product.json'), JSON.stringify(auditResults['/kartvizit'], null, 2));
  fs.writeFileSync(path.join(outputDir, 'global-city.json'), JSON.stringify(auditResults['/ankara-matbaa'], null, 2));
  fs.writeFileSync(path.join(outputDir, 'global-blog.json'), JSON.stringify(auditResults['/blog/ofset-baski-nasil-yapilir'], null, 2));

  console.log('Saved raw outputs to schema-audit/global-*.json');

  // Print Summary Table
  console.log('\n=== GLOBAL SCHEMA SUMMARY TABLE ===');
  console.log('| Route | WebSite | Organization | LocalBusiness | Domain | Telefon | Adres |');
  console.log('| ----- | ------: | -----------: | ------------: | ------ | ------- | ----- |');

  for (const route of routesToTest) {
    const res = auditResults[route];
    const wsCount = res.websites.length;
    const orgCount = res.orgs.length;
    const lbCount = res.localBusinesses.length;

    // extract domain, phone, address from LocalBusiness or Organization
    let domain = 'N/A';
    let phone = 'N/A';
    let address = 'N/A';

    const mainNode = res.localBusinesses[0] || res.orgs[0] || res.websites[0];
    if (mainNode) {
      domain = mainNode.url || mainNode['@id'] || 'N/A';
      phone = mainNode.telephone || (mainNode.contactPoint && mainNode.contactPoint.telephone) || 'N/A';
      if (mainNode.address) {
        if (typeof mainNode.address === 'string') address = mainNode.address;
        else address = `${mainNode.address.streetAddress || ''}, ${mainNode.address.addressLocality || ''}`;
      }
    }

    console.log(`| ${route} | ${wsCount} | ${orgCount} | ${lbCount} | ${domain} | ${phone} | ${address} |`);
  }
}

runGlobalAudit().catch(console.error);

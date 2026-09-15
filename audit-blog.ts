import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function auditBlogAfter() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const blogRoute = '/blog/ofset-baski-nasil-yapilir';
  const url = `http://localhost:3000${blogRoute}`;

  console.log(`Auditing ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);

  const scriptTexts = await page.$$eval('script[type="application/ld+json"]', elements => {
    return elements.map(el => el.textContent || '');
  });

  console.log(`Found ${scriptTexts.length} JSON-LD script tags on ${blogRoute}`);

  const rawSchemas: any[] = [];
  const parsedSchemas: any[] = [];

  for (const scriptText of scriptTexts) {
    try {
      const json = JSON.parse(scriptText);
      rawSchemas.push(json);
      if (Array.isArray(json)) {
        parsedSchemas.push(...json);
      } else {
        parsedSchemas.push(json);
      }
    } catch (err) {
      console.error('Failed to parse JSON-LD script:', err);
    }
  }

  const typeCounts: Record<string, number> = {};
  for (const schema of parsedSchemas) {
    if (schema && typeof schema === 'object' && schema['@type']) {
      const type = schema['@type'];
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    }
  }

  console.log('Schema Type Counts on /blog/ofset-baski-nasil-yapilir:');
  console.log(JSON.stringify(typeCounts, null, 2));

  // Ensure output directory exists
  const outputDir = path.join(process.cwd(), 'schema-audit');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const auditOutput = {
    route: blogRoute,
    timestamp: new Date().toISOString(),
    totalScripts: scriptTexts.length,
    totalParsedNodes: parsedSchemas.length,
    typeCounts,
    rawScripts: rawSchemas,
    parsedNodes: parsedSchemas
  };

  fs.writeFileSync(
    path.join(outputDir, 'blog-after.json'),
    JSON.stringify(auditOutput, null, 2),
    'utf-8'
  );

  console.log(`Saved audit output to ${path.join(outputDir, 'blog-after.json')}`);

  // Test Homepage for regression
  console.log('Testing Homepage / for regression...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);

  const homeScriptTexts = await page.$$eval('script[type="application/ld+json"]', elements => {
    return elements.map(el => el.textContent || '');
  });

  const homeParsed: any[] = [];
  for (const st of homeScriptTexts) {
    try {
      const json = JSON.parse(st);
      if (Array.isArray(json)) homeParsed.push(...json);
      else homeParsed.push(json);
    } catch (e) { void e; }
  }

  const homeTypeCounts: Record<string, number> = {};
  for (const schema of homeParsed) {
    if (schema && schema['@type']) {
      homeTypeCounts[schema['@type']] = (homeTypeCounts[schema['@type']] || 0) + 1;
    }
  }

  console.log('Homepage / Schema Type Counts:');
  console.log(JSON.stringify(homeTypeCounts, null, 2));

  await browser.close();
}

auditBlogAfter().catch(err => {
  console.error(err);
  process.exit(1);
});

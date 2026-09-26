import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

async function inspectHomeItemLists() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('Navigating to http://localhost:3000/...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(2000);

  const scriptTexts = await page.$$eval('script[type="application/ld+json"]', els => els.map(e => e.textContent || ''));

  const itemLists: any[] = [];

  for (const st of scriptTexts) {
    try {
      const parsed = JSON.parse(st);
      const extract = (obj: any) => {
        if (!obj || typeof obj !== 'object') return;
        if (Array.isArray(obj)) {
          obj.forEach(extract);
          return;
        }
        if (obj['@graph'] && Array.isArray(obj['@graph'])) {
          obj['@graph'].forEach(extract);
          return;
        }
        if (obj['@type'] === 'ItemList') {
          itemLists.push(obj);
        }
      };
      extract(parsed);
    } catch (e) { void e; }
  }

  console.log(`Found ${itemLists.length} ItemList schemas on homepage.`);

  const outputDir = path.join(process.cwd(), 'schema-audit');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(outputDir, 'home-itemlists-before.json'),
    JSON.stringify(itemLists, null, 2),
    'utf-8'
  );

  console.log('Saved to schema-audit/home-itemlists-before.json');

  itemLists.forEach((list, idx) => {
    console.log(`\n=== ITEMLIST #${idx + 1} ===`);
    console.log(`@id: ${list['@id'] || 'None'}`);
    console.log(`Name: ${list.name || 'None'}`);
    console.log(`Description: ${list.description || 'None'}`);
    console.log(`itemListOrder: ${list.itemListOrder || 'None'}`);
    console.log(`numberOfItems: ${list.numberOfItems || (list.itemListElement ? list.itemListElement.length : 0)}`);
    console.log('Items sample (up to 10):');
    const items = list.itemListElement || [];
    items.slice(0, 10).forEach((item: any, i: number) => {
      const name = item.name || item.item?.name || 'Un-named';
      const url = item.url || item.item?.url || item.item || 'No URL';
      console.log(`  ${i + 1}. [Pos ${item.position || i + 1}] ${name} -> ${url}`);
    });
  });

  await browser.close();
}

inspectHomeItemLists().catch(console.error);

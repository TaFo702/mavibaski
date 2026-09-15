import { createServer } from 'http';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { chromium, Browser, Page } from 'playwright';

process.env.NODE_ENV = 'test';
process.env.DISABLE_AUTO_START = 'true';

const PORT = 4188;

async function runPlaywrightValidation() {
  console.log('🚀 STARTING PLAYWRIGHT BROWSER DOM & RESPONSIVE VALIDATION FOR /el-ilani...');

  const distPath = path.join(process.cwd(), 'dist');
  const indexPath = path.join(distPath, 'index.html');

  if (!fs.existsSync(indexPath)) {
    console.error('🔴 Build dist/index.html does not exist. Run "npm run build" first!');
    process.exit(1);
  }

  // Import server helpers
  const { getRouteSEO, isKnownRoute, injectSEOMetadata } = await import('./server');

  const app = express();
  app.use(express.static(distPath, { index: false }));

  app.get('*', (req, res) => {
    try {
      const template = fs.readFileSync(indexPath, 'utf-8');
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
      console.error('Error in request handler:', err);
      res.status(500).send('Server Error');
    }
  });

  const server = createServer(app);
  await new Promise<void>((resolve) => server.listen(PORT, '127.0.0.1', () => resolve()));
  console.log(`✅ Test server running on http://127.0.0.1:${PORT}`);

  const screenshotsDir = path.join(process.cwd(), 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  let browser: Browser | null = null;
  let allPassed = true;

  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const viewports = [
      { name: 'mobile', width: 390, height: 844, expectedGalleryCols: 2, expectedGalleryRows: 3, expectedFaqCols: 1 },
      { name: 'tablet', width: 768, height: 1024, expectedGalleryCols: 3, expectedGalleryRows: 2, expectedFaqCols: 2 },
      { name: 'desktop', width: 1440, height: 900, expectedGalleryCols: 3, expectedGalleryRows: 2, expectedFaqCols: 2 },
    ];

    for (const vp of viewports) {
      console.log(`\n📱 TESTING VIEWPORT: ${vp.name} (${vp.width}x${vp.height})...`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      const page: Page = await context.newPage();

      await page.goto(`http://127.0.0.1:${PORT}/el-ilani`, { waitUntil: 'networkidle' });

      // Wait for React rendering
      await page.waitForSelector('table');
      await page.waitForSelector('#faq-section');

      const screenshotPath = path.join(screenshotsDir, `el-ilani-${vp.width}px.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`  📸 Screenshot saved: ${screenshotPath}`);

      // 1. Gallery Layout Verification
      const galleryCards = page.locator('section:has-text("El İlanı Baskı Örnekleri") .aspect-\\[3\\/2\\]');
      const cardCount = await galleryCards.count();
      if (cardCount !== 6) {
        console.error(`  🔴 Expected 6 gallery cards, found ${cardCount}`);
        allPassed = false;
      } else {
        console.log(`  ✅ Gallery card count: 6`);
      }

      // Check card bounding boxes to verify grid columns & rows
      const parentCardElements = page.locator('section:has-text("El İlanı Baskı Örnekleri") div.grid > div');
      const parentCardCount = await parentCardElements.count();
      const bboxes = [];
      for (let i = 0; i < parentCardCount; i++) {
        const box = await parentCardElements.nth(i).boundingBox();
        if (box) bboxes.push(box);
      }

      const uniqueXs = new Set(bboxes.map((b) => Math.round(b.x)));
      const uniqueYs = new Set(bboxes.map((b) => Math.round(b.y)));
      const actualCols = uniqueXs.size;
      const actualRows = uniqueYs.size;

      console.log(`  📐 Gallery Grid: ${actualCols} columns x ${actualRows} rows (Expected: ${vp.expectedGalleryCols}x${vp.expectedGalleryRows})`);
      if (actualCols !== vp.expectedGalleryCols || actualRows !== vp.expectedGalleryRows) {
        console.error(`  🔴 Gallery grid mismatch for ${vp.width}px! Expected ${vp.expectedGalleryCols}x${vp.expectedGalleryRows}, got ${actualCols}x${actualRows}`);
        allPassed = false;
      } else {
        console.log(`  ✅ Gallery layout verified for ${vp.width}px (${actualCols}x${actualRows})`);
      }

      // 2. FAQ Layout Verification
      const faqItems = page.locator('#faq-section div.grid > div');
      const faqCount = await faqItems.count();
      console.log(`  ❓ Visible FAQ Count: ${faqCount} (Expected: 8)`);
      if (faqCount !== 8) {
        console.error(`  🔴 FAQ count mismatch! Expected 8, got ${faqCount}`);
        allPassed = false;
      } else {
        console.log(`  ✅ FAQ count verified (8 items)`);
      }

      const faqBoxes = [];
      for (let i = 0; i < faqCount; i++) {
        const box = await faqItems.nth(i).boundingBox();
        if (box) faqBoxes.push(box);
      }
      const faqUniqueXs = new Set(faqBoxes.map((b) => Math.round(b.x)));
      const actualFaqCols = faqUniqueXs.size;
      console.log(`  📐 FAQ Grid: ${actualFaqCols} columns (Expected: ${vp.expectedFaqCols})`);
      if (actualFaqCols !== vp.expectedFaqCols) {
        console.error(`  🔴 FAQ grid mismatch for ${vp.width}px! Expected ${vp.expectedFaqCols} cols, got ${actualFaqCols}`);
        allPassed = false;
      } else {
        console.log(`  ✅ FAQ layout verified for ${vp.width}px (${actualFaqCols} col)`);
      }

      // 3. Hydrated DOM Content Assertions (on desktop / main page)
      if (vp.name === 'desktop') {
        console.log('\n🔍 RUNNING DEEP HYDRATED DOM CONTENT ASSERTIONS...');

        const bodyInnerText = await page.evaluate(() => document.body.innerText);
        const bodyTextContent = await page.evaluate(() => document.body.textContent || '');

        // A7 check
        const a7Regex = /A7\s*\(\s*9\.2\s*[xX]\s*20\s*cm\s*\)/i;
        const a7Matches = (bodyTextContent.match(a7Regex) || []).length;
        console.log(`  🚫 A7 (9.2x20 cm) in DOM: ${a7Matches} (Expected: 0)`);
        if (a7Matches > 0) {
          console.error(`  🔴 Found remaining "A7 (9.2x20 cm)" in DOM!`);
          allPassed = false;
        } else {
          console.log(`  ✅ No "A7 (9.2x20 cm)" in DOM`);
        }

        // KDV concatenation check
        const kdvMerged = bodyTextContent.includes('dahil değildir.Üretim');
        console.log(`  🚫 Merged "dahil değildir.Üretim" in DOM: ${kdvMerged ? 'FOUND (FAIL)' : '0 (PASS)'}`);
        if (kdvMerged) {
          console.error(`  🔴 Found merged "dahil değildir.Üretim" in DOM!`);
          allPassed = false;
        } else {
          console.log(`  ✅ KDV text formatted properly with space`);
        }

        // Risky old phrases check
        const riskyPhrases = [
          'İstanbul Topkapı Üretim Tesisimiz',
          'Doğrudan Üretici Fiyatı',
          'Hızlı İmalat & Kargolama',
          '3 İş Günü',
          'Topkapı Tesisinden Doğrudan Kargo',
          '81 İle Güvenli Lojistik',
        ];
        let foundRisky = 0;
        for (const phrase of riskyPhrases) {
          if (bodyInnerText.includes(phrase)) {
            console.error(`  🔴 Found risky phrase in DOM: "${phrase}"`);
            foundRisky++;
            allPassed = false;
          }
        }
        if (foundRisky === 0) {
          console.log(`  ✅ Zero risky/deprecated production claim phrases in DOM`);
        }

        // Special grammages check
        const grammages = ['170 gr', '250 gr', '300 gr', '350 gr'];
        for (const g of grammages) {
          const hasG = bodyInnerText.includes(g);
          console.log(`  📄 Grammage "${g}": ${hasG ? 'PRESENT (PASS)' : 'MISSING (FAIL)'}`);
          if (!hasG) {
            console.error(`  🔴 Missing required grammage in DOM: "${g}"`);
            allPassed = false;
          }
        }

        // Price Table Rows Check (14 items)
        const tableRows = page.locator('table tbody tr');
        const rowCount = await tableRows.count();
        console.log(`  📊 Price Table Row Count: ${rowCount} (Expected: 14)`);
        if (rowCount !== 14) {
          console.error(`  🔴 Expected 14 price table rows, found ${rowCount}`);
          allPassed = false;
        } else {
          console.log(`  ✅ Exactly 14 price table rows present`);
        }

        // Product Codes ELI3–ELI16 Check
        const expectedCodes = [
          'ELI3', 'ELI4', 'ELI5', 'ELI6', 'ELI7', 'ELI8',
          'ELI9', 'ELI10', 'ELI11', 'ELI12', 'ELI13', 'ELI14', 'ELI15', 'ELI16'
        ];
        let missingCodes = 0;
        for (const code of expectedCodes) {
          if (!bodyInnerText.includes(code)) {
            console.error(`  🔴 Missing product code in DOM: ${code}`);
            missingCodes++;
            allPassed = false;
          }
        }
        if (missingCodes === 0) {
          console.log(`  ✅ All 14 product codes (ELI3–ELI16) verified in DOM`);
        }

        // "Hemen Sipariş Ver" Buttons in Table (14 buttons)
        const orderButtons = page.locator('table tbody tr a:has-text("Hemen Sipariş Ver"), table tbody tr button:has-text("Hemen Sipariş Ver")');
        const orderButtonCount = await orderButtons.count();
        console.log(`  🔘 "Hemen Sipariş Ver" Buttons in Table: ${orderButtonCount} (Expected: 14)`);
        if (orderButtonCount !== 14) {
          console.error(`  🔴 Expected 14 "Hemen Sipariş Ver" buttons in table, found ${orderButtonCount}`);
          allPassed = false;
        } else {
          console.log(`  ✅ Exactly 14 "Hemen Sipariş Ver" buttons in table`);
        }

        // Special Quote Button WhatsApp Link Check
        const quoteBtns = page.locator('a:has-text("Özel Teklif Al")');
        const quoteBtnCount = await quoteBtns.count();
        console.log(`  💬 Found ${quoteBtnCount} "Özel Teklif Al" WhatsApp links`);
        for (let i = 0; i < quoteBtnCount; i++) {
          const href = await quoteBtns.nth(i).getAttribute('href');
          console.log(`  💬 Special Quote WhatsApp URL #${i + 1}: ${href}`);
          if (!href || !href.includes('wa.me/905366022373')) {
            console.error(`  🔴 Invalid WhatsApp quote URL target: ${href}`);
            allPassed = false;
          } else {
            const urlObj = new URL(href);
            const params = Array.from(urlObj.searchParams.keys());
            if (params.length === 1 && params[0] === 'text') {
              console.log(`  ✅ WhatsApp quote URL #${i + 1} has clean single 'text' query parameter`);
            } else {
              console.error(`  🔴 WhatsApp quote URL #${i + 1} has unexpected query params: ${params.join(', ')}`);
              allPassed = false;
            }
          }
        }

        // 13 Target Keyword Assertions
        const targetKeywords = [
          'el ilanı baskı',
          'el ilanı fiyatları',
          'el ilanı baskı fiyatı',
          'el ilanı bastırma fiyatları',
          'A4 el ilanı fiyatları',
          'A5 el ilanı fiyatları',
          'A5 el ilanı baskı fiyatı',
          'el ilanı ölçüleri',
          'A5 el ilanı ölçüleri',
          '1.000 adet el ilanı fiyatı',
          '2.000 adet el ilanı',
          '5.000 adet el ilanı fiyatı',
          '10.000 adet el ilanı fiyatı',
        ];
        console.log('\n🎯 TARGET KEYWORD OCCURRENCE IN HYDRATED DOM:');
        for (const kw of targetKeywords) {
          const lowerBody = bodyTextContent.toLowerCase();
          const present = lowerBody.includes(kw.toLowerCase());
          console.log(`  • "${kw}": ${present ? 'PRESENT (PASS)' : 'MISSING (FAIL)'}`);
          if (!present) {
            console.error(`  🔴 Target keyword missing: "${kw}"`);
            allPassed = false;
          }
        }

        // FAQ JSON-LD Parity Check
        console.log('\n📋 CHECKING FAQ DOM vs JSON-LD SCHEMA PARITY...');
        const jsonLdScripts = await page.$$eval('script[type="application/ld+json"]', (scripts) =>
          scripts.map((s) => s.textContent || '')
        );

        let faqSchemaObj: any = null;
        for (const raw of jsonLdScripts) {
          try {
            const parsed = JSON.parse(raw);
            if (parsed['@type'] === 'FAQPage') {
              faqSchemaObj = parsed;
              break;
            }
          } catch (_e) {
            // Ignore parse errors on invalid JSON scripts
          }
        }

        if (!faqSchemaObj || !Array.isArray(faqSchemaObj.mainEntity)) {
          console.error(`  🔴 FAQPage JSON-LD schema not found in <head>!`);
          allPassed = false;
        } else {
          console.log(`  ✅ FAQPage JSON-LD found with ${faqSchemaObj.mainEntity.length} questions`);

          // Compare questions and answers
          for (let i = 0; i < faqSchemaObj.mainEntity.length; i++) {
            const schemaQ = faqSchemaObj.mainEntity[i].name.trim();
            const schemaA = faqSchemaObj.mainEntity[i].acceptedAnswer.text.trim();

            const domQ = (await page.locator(`#el-ilani-faq-btn-${i}`).textContent() || '').trim();
            // Open accordion to get answer text
            const isExpanded = await page.locator(`#el-ilani-faq-btn-${i}`).getAttribute('aria-expanded');
            if (isExpanded !== 'true') {
              await page.locator(`#el-ilani-faq-btn-${i}`).click();
            }
            const domA = (await page.locator(`#el-ilani-faq-${i}`).textContent() || '').trim();

            if (schemaQ !== domQ) {
              console.error(`  🔴 FAQ Question #${i + 1} mismatch!`);
              console.error(`     Schema: "${schemaQ}"`);
              console.error(`     DOM:    "${domQ}"`);
              allPassed = false;
            }
            if (schemaA !== domA) {
              console.error(`  🔴 FAQ Answer #${i + 1} mismatch!`);
              console.error(`     Schema: "${schemaA}"`);
              console.error(`     DOM:    "${domA}"`);
              allPassed = false;
            }
          }
          console.log(`  ✅ Character-exact parity verified across all 8 FAQ questions and answers!`);
        }
      }

      await context.close();
    }
  } catch (err) {
    console.error('🔴 Playwright execution error:', err);
    allPassed = false;
  } finally {
    if (browser) await browser.close();
    server.close();
  }

  if (!allPassed) {
    console.error('\n❌ PLAYWRIGHT DOM & RESPONSIVE VALIDATION FAILED!');
    process.exit(1);
  }

  console.log('\n🎉 ALL PLAYWRIGHT HYDRATED DOM & RESPONSIVE VALIDATIONS PASSED PERFECTLY!\n');
}

runPlaywrightValidation();

import { createServer } from 'http';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { chromium, Browser, Page } from 'playwright';

process.env.NODE_ENV = 'test';
process.env.DISABLE_AUTO_START = 'true';

const PORT = 4199;

async function runAfisPlaywrightValidation() {
  console.log('🚀 STARTING PLAYWRIGHT BROWSER DOM & RESPONSIVE VALIDATION FOR /afis...');

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

      await page.goto(`http://127.0.0.1:${PORT}/afis`, { waitUntil: 'networkidle' });

      // Wait for React rendering of afis page root
      await page.waitForSelector('[data-page-root="afis"]');
      await page.waitForSelector('table');
      await page.waitForSelector('#faq-section');

      const screenshotPath = path.join(screenshotsDir, `afis-${vp.width}px.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`  📸 Screenshot saved: ${screenshotPath}`);

      // 1. Gallery Layout Verification
      const galleryCards = page.locator('[data-page-root="afis"] #gorsel-galeri [data-expected-filename]');
      const cardCount = await galleryCards.count();
      if (cardCount !== 6) {
        console.error(`  🔴 Expected 6 gallery cards, found ${cardCount}`);
        allPassed = false;
      } else {
        console.log(`  ✅ Gallery card count: 6`);
      }

      // Check card bounding boxes to verify grid columns & rows
      const bboxes = [];
      for (let i = 0; i < cardCount; i++) {
        const box = await galleryCards.nth(i).boundingBox();
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

      // 2. FAQ Layout Verification (10 items)
      const faqItemButtons = page.locator('[data-page-root="afis"] #faq-section button');
      const faqCount = await faqItemButtons.count();
      console.log(`  ❓ Visible FAQ Count: ${faqCount} (Expected: 10)`);
      if (faqCount !== 10) {
        console.error(`  🔴 FAQ count mismatch! Expected 10, got ${faqCount}`);
        allPassed = false;
      } else {
        console.log(`  ✅ FAQ count verified (10 items)`);
      }

      const faqParentCols = page.locator('[data-page-root="afis"] #faq-section > div > div.space-y-3');
      const faqColCount = await faqParentCols.count();

      const faqColBoxes = [];
      for (let i = 0; i < faqColCount; i++) {
        const box = await faqParentCols.nth(i).boundingBox();
        if (box) faqColBoxes.push(box);
      }
      const faqUniqueXs = new Set(faqColBoxes.map((b) => Math.round(b.x)));
      const actualFaqCols = faqUniqueXs.size;
      console.log(`  📐 FAQ Grid Column Rendering: ${actualFaqCols} columns (Expected: ${vp.expectedFaqCols})`);
      if (actualFaqCols !== vp.expectedFaqCols) {
        console.error(`  🔴 FAQ column rendering mismatch for ${vp.width}px! Expected ${vp.expectedFaqCols} cols, got ${actualFaqCols}`);
        allPassed = false;
      } else {
        console.log(`  ✅ FAQ column layout verified for ${vp.width}px (${actualFaqCols} col)`);
      }

      // 3. Hydrated DOM Content Assertions (on desktop)
      if (vp.name === 'desktop') {
        console.log('\n🔍 RUNNING DEEP HYDRATED DOM CONTENT ASSERTIONS FOR [data-page-root="afis"]...');

        const afisRoot = page.locator('[data-page-root="afis"]');
        const rootInnerText = await afisRoot.innerText();
        const rootNormalized = rootInnerText.toLocaleLowerCase('tr-TR');

        // Check H1
        const h1 = (await page.locator('h1').textContent()) || '';
        console.log(`  H1 Title: "${h1.trim()}"`);
        if (h1.trim().toLocaleLowerCase('tr-TR') !== 'afiş baskı fiyatları ve poster ölçüleri') {
          console.error(`  🔴 H1 mismatch! Expected "Afiş Baskı Fiyatları ve Poster Ölçüleri", got "${h1.trim()}"`);
          allPassed = false;
        } else {
          console.log(`  ✅ H1 title verified: "${h1.trim()}"`);
        }

        // Check Title and Meta
        const pageTitle = await page.title();
        console.log(`  Page Title: "${pageTitle}"`);
        if (!pageTitle.includes('Afiş Baskı Fiyatları | 35x50 - 50x70 - 70x100 cm')) {
          console.error(`  🔴 Page title mismatch! Got "${pageTitle}"`);
          allPassed = false;
        } else {
          console.log(`  ✅ Page title verified`);
        }

        // Risky phrases check in [data-page-root="afis"]
        const riskyPhrases = [
          'fabrika',
          'fabrikamızda',
          'üretim tesisi',
          'üretim tesisimiz',
          'tesisimiz',
          'heidelberg',
          'polar giyotin',
          'iso 12647-2',
          'üretim parkuru',
          'baskı makinelerimiz',
          '2-3 iş günü',
          '1-2 iş günü',
          '1-2 saat',
          '24 saat',
          'aynı gün pdf prova',
          'seri üretim',
          'yüksek kalite standardı',
          '81 il',
          'kesin teslimat süresi',
          'doğrudan üretim',
          'imalat',
          'üreticiden',
          'sıfır arka gösterme',
          'dalgalanma yapmaz',
          'tam uyum',
          'alttaki görseli kapatan'
        ];

        console.log('\n🛡️ SCANNING RISKY/DEPRECATED PHRASES IN [data-page-root="afis"] (Must be 0)...');
        let totalRiskyFound = 0;
        for (const phrase of riskyPhrases) {
          // Count occurrences using regex
          const regex = new RegExp(`\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
          const matches = rootNormalized.match(regex);
          const count = matches ? matches.length : 0;
          if (count > 0) {
            console.error(`  🔴 Found risky phrase "${phrase}": ${count} occurrences!`);
            totalRiskyFound += count;
            allPassed = false;
          } else {
            console.log(`  ✅ Clean: "${phrase}" -> 0 occurrences`);
          }
        }
        if (totalRiskyFound === 0) {
          console.log(`  🎉 ZERO risky/deprecated phrases in [data-page-root="afis"]!`);
        }

        // 26 Exact Target Keywords Check with occurrence counts
        const exactKeywords = [
          'afiş örnekleri',
          'afiş resmi',
          'afiş hazırlama',
          'afiş fiyatları',
          'reklam afiş',
          'afiş resmi çizimi',
          'afiş poster',
          'afiş baskı',
          'afiş resimleri',
          'afiş nedir',
          '50x70 afiş fiyatları',
          'afiş baskı fiyatları',
          'büyük afiş fiyatları',
          'ucuz afiş baskı',
          'kağıt afiş fiyatları',
          'afiş kağıdı',
          'afiş tasarım fiyatları',
          'afiş bastırma fiyatları',
          '50x70 afiş baskı fiyatı',
          'reklam afiş baskı',
          'afiş poster çizimi',
          'afiş poster resmi',
          'afiş poster farkı',
          'afiş poster baskı',
          'afiş poster örnekleri',
          'afiş baskı fiyatları 2026'
        ];

        console.log('\n🎯 VERIFYING ALL 26 TARGET KEYWORDS IN [data-page-root="afis"]...');
        let missingKeywords = 0;
        for (const kw of exactKeywords) {
          const kwLower = kw.toLocaleLowerCase('tr-TR');
          const isPresent = rootNormalized.includes(kwLower);
          
          // Count occurrences
          let count = 0;
          let pos = 0;
          while ((pos = rootNormalized.indexOf(kwLower, pos)) !== -1) {
            count++;
            pos += kwLower.length;
          }

          if (!isPresent || count === 0) {
            console.error(`  🔴 Missing target keyword: "${kw}" (count: 0)`);
            missingKeywords++;
            allPassed = false;
          } else {
            console.log(`  ✅ Keyword present: "${kw}" (occurrences: ${count})`);
          }
        }
        if (missingKeywords === 0) {
          console.log(`  🎉 All 26/26 target keywords successfully verified in visible DOM!`);
        }

        // WhatsApp Custom Quote Links Check (Hero and Bottom section)
        console.log('\n💬 CHECKING WHATSAPP CUSTOM QUOTE LINKS...');
        const customQuoteLinks = page.locator('[data-page-root="afis"] a:has-text("Özel Teklif Al")');
        const customQuoteCount = await customQuoteLinks.count();
        console.log(`  Found ${customQuoteCount} "Özel Teklif Al" links (Expected: 2)`);
        if (customQuoteCount < 2) {
          console.error(`  🔴 Expected at least 2 "Özel Teklif Al" links, found ${customQuoteCount}`);
          allPassed = false;
        }

        const expectedCustomMessage = "Merhaba, web sitenizdeki /afis sayfasından ulaşıyorum. Fiyat listesinde yer almayan afiş ölçüsü, kağıt türü, gramaj, adet ve tasarım seçenekleri için özel teklif almak istiyorum.";

        for (let i = 0; i < customQuoteCount; i++) {
          const href = await customQuoteLinks.nth(i).getAttribute('href');
          if (!href) {
            console.error(`  🔴 Link ${i} has no href!`);
            allPassed = false;
            continue;
          }

          const parsedUrl = new URL(href);
          const hostValid = parsedUrl.host === 'wa.me';
          const pathValid = parsedUrl.pathname === '/905366022373';
          const textParams = parsedUrl.searchParams.getAll('text');
          const singleTextParam = textParams.length === 1;
          const decodedText = decodeURIComponent(textParams[0] || '');
          const messageMatches = decodedText === expectedCustomMessage;

          console.log(`  Link ${i + 1}:`);
          console.log(`    Host: ${parsedUrl.host} (Valid: ${hostValid})`);
          console.log(`    Path: ${parsedUrl.pathname} (Valid: ${pathValid})`);
          console.log(`    Single text param: ${singleTextParam} (Count: ${textParams.length})`);
          console.log(`    Message matches expected: ${messageMatches}`);

          if (!hostValid || !pathValid || !singleTextParam || !messageMatches) {
            console.error(`  🔴 Link ${i + 1} validation failed!`);
            allPassed = false;
          } else {
            console.log(`  ✅ Link ${i + 1} perfectly valid`);
          }
        }

        // Price Table Rows Check (6 items AF1–AF6)
        console.log('\n📊 CHECKING PRICE TABLE AF1–AF6 & ORDER BUTTONS...');
        const tableRows = page.locator('[data-page-root="afis"] table:has(th:has-text("ÜRÜN TÜRÜ")) tbody tr');
        const rowCount = await tableRows.count();
        console.log(`  Price Table Row Count: ${rowCount} (Expected: 6)`);
        if (rowCount !== 6) {
          console.error(`  🔴 Expected 6 price table rows, found ${rowCount}`);
          allPassed = false;
        } else {
          console.log(`  ✅ Exactly 6 price table rows present`);
        }

        const expectedCodes = ['AF1', 'AF2', 'AF3', 'AF4', 'AF5', 'AF6'];
        for (const code of expectedCodes) {
          const hasCode = rootInnerText.includes(code);
          if (!hasCode) {
            console.error(`  🔴 Missing product code: ${code}`);
            allPassed = false;
          } else {
            console.log(`  ✅ Product code present: ${code}`);
          }
        }

        // "Hemen Sipariş Ver" Buttons in Table (6 buttons)
        const orderButtons = page.locator('[data-page-root="afis"] table:has(th:has-text("ÜRÜN TÜRÜ")) tbody tr button:has-text("Hemen Sipariş Ver")');
        const orderButtonCount = await orderButtons.count();
        console.log(`  "Hemen Sipariş Ver" Buttons in Table: ${orderButtonCount} (Expected: 6)`);
        if (orderButtonCount !== 6) {
          console.error(`  🔴 Expected 6 "Hemen Sipariş Ver" buttons, found ${orderButtonCount}`);
          allPassed = false;
        } else {
          console.log(`  ✅ Exactly 6 "Hemen Sipariş Ver" buttons verified`);
        }

        // 6 Image Placeholders Check
        console.log('\n🖼️ CHECKING 6 IMAGE PLACEHOLDERS IN GALLERY...');
        const expectedFilenames = [
          'afis-baski-fiyatlari-ve-cesitleri.webp',
          '35x50-50x70-70x100-afis-olculeri.webp',
          '105-135-170-gr-kuse-afis-kagidi.webp',
          'reklam-kampanya-afis-ornekleri.webp',
          'afis-poster-tasarim-hazirlama.webp',
          'blueback-dis-mekan-afis-baski.webp'
        ];

        for (const filename of expectedFilenames) {
          const card = page.locator(`[data-page-root="afis"] [data-expected-filename="${filename}"]`);
          const cardExists = (await card.count()) > 0;
          if (!cardExists) {
            console.error(`  🔴 Missing placeholder card for: "${filename}"`);
            allPassed = false;
          } else {
            console.log(`  ✅ Image placeholder card present: "${filename}"`);
          }
        }

        // FAQ Parity: Compare visible FAQ questions character for character with FAQPage JSON-LD
        console.log('\n📋 CHECKING FAQ PARITY (DOM vs JSON-LD)...');
        const visibleQuestionElements = page.locator('[data-page-root="afis"] #faq-section button span.font-black');
        const visibleQuestionTexts: string[] = [];
        const visibleQuestionCount = await visibleQuestionElements.count();
        for (let i = 0; i < visibleQuestionCount; i++) {
          const rawText = await visibleQuestionElements.nth(i).innerText();
          visibleQuestionTexts.push(rawText.trim());
        }

        const scripts = await page.locator('script[type="application/ld+json"]').allInnerTexts();
        let schemaFaqQuestions: string[] = [];

        for (const s of scripts) {
          try {
            const parsed = JSON.parse(s);
            if (parsed['@type'] === 'FAQPage' && Array.isArray(parsed.mainEntity)) {
              schemaFaqQuestions = parsed.mainEntity.map((item: { name: string }) => item.name);
            }
          } catch (_e) {
            // ignore non-json or other scripts
          }
        }

        console.log(`  Visible Questions Count: ${visibleQuestionTexts.length}`);
        console.log(`  Schema Questions Count: ${schemaFaqQuestions.length}`);

        if (visibleQuestionTexts.length !== 10 || schemaFaqQuestions.length !== 10) {
          console.error(`  🔴 FAQ count mismatch! Expected 10 visible and 10 schema questions.`);
          allPassed = false;
        } else {
          let faqMatchCount = 0;
          for (let i = 0; i < 10; i++) {
            const vQ = visibleQuestionTexts[i];
            const sQ = schemaFaqQuestions[i];

            // Check if visible question has unwanted '?' prefix
            const hasUnwantedQuestionMarkPrefix = vQ.startsWith('?') || vQ.startsWith('? ');
            if (hasUnwantedQuestionMarkPrefix) {
              console.error(`  🔴 Visible FAQ ${i + 1} has unwanted "?" prefix: "${vQ}"`);
              allPassed = false;
            }

            if (vQ === sQ) {
              faqMatchCount++;
              console.log(`  ✅ FAQ ${i + 1} Exact Match: "${vQ}"`);
            } else {
              console.error(`  🔴 FAQ ${i + 1} Mismatch:`);
              console.error(`     DOM:    "${vQ}"`);
              console.error(`     SCHEMA: "${sQ}"`);
              allPassed = false;
            }
          }
          if (faqMatchCount === 10) {
            console.log(`  🎉 All 10 visible FAQ questions match FAQPage schema character for character!`);
          }
        }
      }

      await context.close();
    }
  } catch (err) {
    console.error('🔴 Error during Playwright validation:', err);
    allPassed = false;
  } finally {
    if (browser) await browser.close();
    server.close();
  }

  if (!allPassed) {
    console.error('\n❌ PLAYWRIGHT VALIDATION FAILED WITH ONE OR MORE ERRORS!');
    process.exit(1);
  } else {
    console.log('\n✅ ALL PLAYWRIGHT ASSERTIONS AND RESPONSIVE CHECKS PASSED PERFECTLY!');
  }
}

runAfisPlaywrightValidation();

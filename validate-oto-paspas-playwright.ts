import { createServer } from 'http';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { chromium, Browser, Page } from 'playwright';

process.env.NODE_ENV = 'test';
process.env.DISABLE_AUTO_START = 'true';

const PORT = 4203;

async function runOtoPaspasValidation() {
  console.log('🚀 STARTING PLAYWRIGHT BROWSER DOM & RESPONSIVE VALIDATION FOR /oto-paspas...');

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
      { name: 'desktop', width: 1440, height: 900, expectedGalleryCols: 3, expectedGalleryRows: 2, expectedFaqCols: 2 }
    ];

    for (const vp of viewports) {
      console.log(`\n📱 TESTING VIEWPORT: ${vp.name} (${vp.width}x${vp.height})...`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      const page: Page = await context.newPage();

      await page.goto(`http://127.0.0.1:${PORT}/oto-paspas`, { waitUntil: 'networkidle' });

      const screenshotPath = path.join(screenshotsDir, `oto-paspas-${vp.width}px.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`  📸 Screenshot saved: ${screenshotPath}`);

      // 1. Gallery Layout Verification
      const galleryCards = page.locator('[data-page-root="oto-paspas"] #gorsel-galeri [data-expected-filename]');
      const cardCount = await galleryCards.count();
      if (cardCount !== 6) {
        console.error(`  🔴 Expected 6 gallery cards, found ${cardCount}`);
        allPassed = false;
      } else {
        console.log(`  ✅ Gallery card count: 6`);
      }

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
      const faqItemButtons = page.locator('[data-page-root="oto-paspas"] #faq-section button');
      const faqCount = await faqItemButtons.count();
      console.log(`  ❓ Visible FAQ Count: ${faqCount} (Expected: 10)`);
      if (faqCount !== 10) {
        console.error(`  🔴 FAQ count mismatch! Expected 10, got ${faqCount}`);
        allPassed = false;
      } else {
        console.log(`  ✅ FAQ count verified (10 items)`);
      }

      const faqParentCols = page.locator('[data-page-root="oto-paspas"] #faq-section > div.grid > div.space-y-3');
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

      // 3. Hydrated DOM Content Assertions (Desktop)
      if (vp.name === 'desktop') {
        console.log('\n🔍 RUNNING DEEP HYDRATED DOM CONTENT ASSERTIONS FOR [data-page-root="oto-paspas"]...');

        const rootEl = page.locator('[data-page-root="oto-paspas"]');
        const rootInnerText = await rootEl.innerText();
        const rootNormalized = rootInnerText.toLocaleLowerCase('tr-TR');

        // Check H1
        const h1 = (await page.locator('h1').textContent()) || '';
        console.log(`  H1 Title: "${h1.trim()}"`);
        if (h1.trim() !== "Oto Paspas Baskı Fiyatları ve Logolu Kağıt Paspas") {
          console.error(`  🔴 H1 mismatch! Got "${h1.trim()}" (Expected: "Oto Paspas Baskı Fiyatları ve Logolu Kağıt Paspas")`);
          allPassed = false;
        } else {
          console.log(`  ✅ H1 title verified: "Oto Paspas Baskı Fiyatları ve Logolu Kağıt Paspas"`);
        }

        // Check Title and Meta
        const pageTitle = await page.title();
        console.log(`  Page Title: "${pageTitle}"`);
        if (pageTitle !== "Oto Paspas Baskı Fiyatları | Logolu Kağıt Oto Paspas") {
          console.error(`  🔴 Page title mismatch! Got "${pageTitle}"`);
          allPassed = false;
        } else {
          console.log(`  ✅ Page title verified`);
        }

        // Risky phrases check in [data-page-root="oto-paspas"]
        const riskyPhrases = [
          'fabrikamız',
          'tesisimiz',
          'üretim tesisimiz',
          'üretim tesisi',
          'imalat',
          'üreticiden',
          'doğrudan üretici',
          'heidelberg',
          'ctp',
          'makine parkuru',
          'makinelerimiz',
          'bilgisayar kontrollü giyotin',
          '3 iş günü',
          '2–4 iş günü',
          '2-4 iş günü',
          '20 ağustos 2026',
          'aynı gün prova',
          '1–2 saat',
          '1-2 saat',
          '24 saat',
          '81 il',
          'hijyen sağlar',
          'hijyenik teslimat',
          'temizlik garantisi',
          'temizlik garantileri',
          'suya dayanıklı,',
          'yüksek emicilik',
          'suyu hızla emer',
          'kaymaz,',
          'kayma riskini azaltır',
          'pedala dolanmaz',
          'yırtılmaz',
          'yırtılmaya dirençli',
          'dayanıklılık garantisi',
          'en kaliteli',
          'yüksek kalite standardı',
          'ücretsiz sıfırdan tasarım',
          'sınırsız revizyon',
          'nemden korumalı paketleme garantisi'
        ];

        console.log('\n🛡️ SCANNING RISKY/DEPRECATED PHRASES IN [data-page-root="oto-paspas"] (Must be 0)...');
        let totalRiskyFound = 0;
        for (const phrase of riskyPhrases) {
          const phraseNorm = phrase.toLocaleLowerCase('tr-TR');
          let count = 0;
          let pos = 0;
          while ((pos = rootNormalized.indexOf(phraseNorm, pos)) !== -1) {
            count++;
            pos += phraseNorm.length;
          }

          if (count > 0) {
            console.error(`  🔴 Found risky phrase "${phrase}": ${count} occurrences!`);
            const idx = rootNormalized.indexOf(phraseNorm);
            if (idx !== -1) {
              console.error(`  Context: "...${rootNormalized.substring(Math.max(0, idx - 50), Math.min(rootNormalized.length, idx + 50))}..."`);
            }
            totalRiskyFound += count;
            allPassed = false;
          } else {
            console.log(`  ✅ Clean: "${phrase}" -> 0 occurrences`);
          }
        }
        if (totalRiskyFound === 0) {
          console.log(`  🎉 ZERO risky/deprecated phrases in [data-page-root="oto-paspas"]!`);
        }

        // BANNED KEYWORDS CHECK
        const bannedKeywords = [
          'oto paspas baskı makinesi',
          'dijital baskılı oto paspas',
          'oto halı paspas baskılı',
          'latex oto paspas',
          'oto paspas klipsi',
          'oto paspas takımı',
          '3d paspas',
          'eva paspas',
          'havuzlu paspas',
          'akıllı paspas',
          'yeni nesil paspas',
          'rizline',
          'a101',
          'sahibinden',
          'koçtaş',
          'migros',
          'letgo',
          'beylikdüzü',
          'en ucuz'
        ];

        console.log('\n🚫 SCANNING BANNED KEYWORDS (Must be 0)...');
        let totalBannedFound = 0;
        for (const phrase of bannedKeywords) {
          const phraseNorm = phrase.toLocaleLowerCase('tr-TR');
          let count = 0;
          let pos = 0;
          while ((pos = rootNormalized.indexOf(phraseNorm, pos)) !== -1) {
            count++;
            pos += phraseNorm.length;
          }

          if (count > 0) {
            console.error(`  🔴 Found banned keyword "${phrase}": ${count} occurrences!`);
            totalBannedFound += count;
            allPassed = false;
          } else {
            console.log(`  ✅ Clean banned keyword: "${phrase}" -> 0 occurrences`);
          }
        }

        // EXACT 15 TARGET KEYWORDS TEST
        const exactKeywords = [
          'baskılı oto paspas',
          'baskılı oto paspas kağıdı',
          'oto kağıt paspas baskı',
          'özel baskı oto paspas',
          'oto paspas kağıdı',
          'oto paspas kağıdı 50x70',
          'oto paspas kağıt',
          'oto kağıt paspas',
          'oto kağıt paspas 100 adet',
          'oto kağıt paspas 1000 adet',
          'oto kağıt paspas 5000 adet',
          'oto kağıt paspas tasarla',
          'oto paspas modelleri',
          'oto paspas fiyatları',
          'suya dayanıklı kağıt paspas'
        ];

        console.log('\n🎯 VERIFYING ALL 15 TARGET KEYWORDS IN [data-page-root="oto-paspas"]...');
        let missingKeywords = 0;
        for (const kw of exactKeywords) {
          const kwLower = kw.toLocaleLowerCase('tr-TR');
          let count = 0;
          let pos = 0;
          while ((pos = rootNormalized.indexOf(kwLower, pos)) !== -1) {
            count++;
            pos += kwLower.length;
          }

          if (count === 0) {
            console.error(`  🔴 Missing target keyword: "${kw}" (count: 0)`);
            missingKeywords++;
            allPassed = false;
          } else {
            console.log(`  ✅ Keyword present: "${kw}" (occurrences: ${count})`);
          }
        }
        if (missingKeywords === 0) {
          console.log(`  🎉 All 15/15 target keywords successfully verified in visible DOM!`);
        }

        // WhatsApp Custom Quote Links Check (Outside Table)
        console.log('\n💬 CHECKING WHATSAPP CUSTOM QUOTE LINKS...');
        const customQuoteLinks = page.locator('[data-page-root="oto-paspas"] a:has-text("Özel Teklif Al")');
        const customQuoteCount = await customQuoteLinks.count();
        console.log(`  Found ${customQuoteCount} "Özel Teklif Al" links (Expected: 2)`);
        if (customQuoteCount !== 2) {
          console.error(`  🔴 Expected exactly 2 "Özel Teklif Al" links outside table, found ${customQuoteCount}`);
          allPassed = false;
        }

        const expectedMsg = "Merhaba, web sitenizdeki /oto-paspas sayfasından ulaşıyorum. Fiyat listesinde bulunmayan oto paspas ölçüsü, kağıt türü, baskı rengi ve adet seçeneği için özel teklif almak istiyorum.";
        for (let i = 0; i < customQuoteCount; i++) {
          const link = customQuoteLinks.nth(i);
          const href = await link.getAttribute('href');
          console.log(`  Link ${i + 1}: ${href}`);
          if (!href) {
            console.error(`  🔴 Link ${i + 1} has no href!`);
            allPassed = false;
            continue;
          }

          try {
            const url = new URL(href);
            const isWaMe = url.hostname === 'wa.me';
            const isPathValid = url.pathname.includes('905366022373');
            const textParam = url.searchParams.get('text');
            const matchesExpected = textParam === expectedMsg;

            console.log(`    Host: ${url.hostname} (Valid: ${isWaMe})`);
            console.log(`    Path: ${url.pathname} (Valid: ${isPathValid})`);
            console.log(`    Message matches expected: ${matchesExpected}`);

            if (!isWaMe || !isPathValid || !matchesExpected) {
              console.error(`  🔴 Link ${i + 1} is invalid! Expected text: "${expectedMsg}", got "${textParam}"`);
              allPassed = false;
            } else {
              console.log(`  ✅ Link ${i + 1} perfectly valid`);
            }
          } catch (e) {
            console.error(`  🔴 Link ${i + 1} URL parse error: ${e}`);
            allPassed = false;
          }
        }

        // Price Table Checks (P1, P2, P3)
        console.log('\n📊 CHECKING PRICE TABLE P1–P3 & ORDER BUTTONS...');
        const tableRows = page.locator('[data-page-root="oto-paspas"] #fiyat-tablosu tbody tr');
        const rowCount = await tableRows.count();
        console.log(`  Price Table Row Count: ${rowCount} (Expected: 3)`);
        if (rowCount !== 3) {
          console.error(`  🔴 Expected 3 price table rows, got ${rowCount}`);
          allPassed = false;
        } else {
          console.log(`  ✅ Exactly 3 price table rows present`);
        }

        const expectedRows = [
          { code: 'P1', miktar: '1.000 Adet', ebat: '34x49 cm', malzeme: '80 gr esmer kraft kağıt', baski: 'Tek Yön Tek Renk Baskı', price: '2.500 ₺' },
          { code: 'P2', miktar: '2.000 Adet', ebat: '34x49 cm', malzeme: '80 gr esmer kraft kağıt', baski: 'Tek Yön Tek Renk Baskı', price: '3.300 ₺' },
          { code: 'P3', miktar: '5.000 Adet', ebat: '34x49 cm', malzeme: '80 gr esmer kraft kağıt', baski: 'Tek Yön Tek Renk Baskı', price: '5.000 ₺' },
        ];

        for (const rowData of expectedRows) {
          const rowLocator = page.locator(`[data-page-root="oto-paspas"] #fiyat-tablosu tbody tr:has-text("${rowData.code}")`);
          if (await rowLocator.count() > 0) {
            const rowText = await rowLocator.innerText();
            console.log(`  ✅ Row ${rowData.code}: Found`);
            if (!rowText.includes(rowData.miktar) || !rowText.includes(rowData.ebat) || !rowText.includes(rowData.malzeme) || !rowText.includes(rowData.baski) || !rowText.includes(rowData.price)) {
              console.error(`  🔴 Row ${rowData.code} detail mismatch! Expected fields: ${JSON.stringify(rowData)}, Got: "${rowText}"`);
              allPassed = false;
            } else {
              console.log(`  ✅ Row ${rowData.code} all details verified (miktar, ebat, malzeme, baskı, price)`);
            }
          } else {
            console.error(`  🔴 Missing product code in table: ${rowData.code}`);
            allPassed = false;
          }
        }

        const orderButtons = page.locator('[data-page-root="oto-paspas"] #fiyat-tablosu tbody button:has-text("Hemen Sipariş Ver")');
        const orderBtnCount = await orderButtons.count();
        console.log(`  "Hemen Sipariş Ver" Buttons in Table: ${orderBtnCount} (Expected: 3)`);
        if (orderBtnCount !== 3) {
          console.error(`  🔴 Expected 3 "Hemen Sipariş Ver" buttons in table, got ${orderBtnCount}`);
          allPassed = false;
        } else {
          console.log(`  ✅ Exactly 3 "Hemen Sipariş Ver" buttons verified`);
        }

        // Image Placeholders Check
        console.log('\n🖼️ CHECKING 6 IMAGE PLACEHOLDERS IN GALLERY...');
        const expectedImages = [
          "oto-paspas-baski-fiyatlari.webp",
          "34x49-logolu-oto-paspas.webp",
          "80-gr-kraft-oto-paspas-kagidi.webp",
          "oto-servis-kagit-paspas-baski.webp",
          "oto-yikama-tek-kullanimlik-paspas.webp",
          "ozel-baski-oto-paspas-ornekleri.webp"
        ];

        for (const imgName of expectedImages) {
          const card = page.locator(`[data-page-root="oto-paspas"] [data-expected-filename="${imgName}"]`);
          if (await card.count() > 0) {
            console.log(`  ✅ Image placeholder card present: "${imgName}"`);
          } else {
            console.error(`  🔴 Missing image card with filename: "${imgName}"`);
            allPassed = false;
          }
        }

        // FAQ Parity Check (DOM vs JSON-LD)
        console.log('\n📋 CHECKING FAQ PARITY (DOM vs JSON-LD)...');
        const visibleQuestionElements = page.locator('[data-page-root="oto-paspas"] #faq-section button h3');
        const visibleQuestionCount = await visibleQuestionElements.count();
        const visibleQuestions: string[] = [];
        for (let qIdx = 0; qIdx < visibleQuestionCount; qIdx++) {
          const qText = (await visibleQuestionElements.nth(qIdx).innerText()).trim();
          visibleQuestions.push(qText);
        }

        const seoData = getRouteSEO('/oto-paspas');
        const jsonLdMatch = seoData.extraHead?.match(/<script type="application\/ld\+json">(.*?)<\/script>/gs);
        let schemaFaqQuestions: string[] = [];
        if (jsonLdMatch) {
          for (const rawScript of jsonLdMatch) {
            const jsonText = rawScript.replace(/<\/?script[^>]*>/g, '');
            try {
              const parsed = JSON.parse(jsonText);
              if (parsed['@type'] === 'FAQPage' && Array.isArray(parsed.mainEntity)) {
                schemaFaqQuestions = parsed.mainEntity.map((item: any) => item.name.trim());
              }
            } catch (e) {
              console.error(e);
            }
          }
        }

        console.log(`  Visible Questions Count: ${visibleQuestions.length}`);
        console.log(`  Schema Questions Count: ${schemaFaqQuestions.length}`);

        if (visibleQuestions.length !== 10 || schemaFaqQuestions.length !== 10) {
          console.error(`  🔴 FAQ count mismatch! Visible: ${visibleQuestions.length}, Schema: ${schemaFaqQuestions.length} (Expected: 10)`);
          allPassed = false;
        }

        for (let i = 0; i < 10; i++) {
          const vQ = visibleQuestions[i] || '';
          const sQ = schemaFaqQuestions[i] || '';
          if (vQ !== sQ) {
            console.error(`  🔴 FAQ ${i + 1} Mismatch!\n     DOM:    "${vQ}"\n     SCHEMA: "${sQ}"`);
            allPassed = false;
          } else {
            console.log(`  ✅ FAQ ${i + 1} Exact Match: "${vQ}"`);
          }
        }
        if (visibleQuestions.length === 10 && schemaFaqQuestions.length === 10 && allPassed) {
          console.log(`  🎉 All 10 visible FAQ questions match FAQPage schema character for character!`);
        }
      }
    }
  } catch (err) {
    console.error('Validation execution error:', err);
    allPassed = false;
  } finally {
    if (browser) {
      await browser.close();
    }
    server.close();
  }

  if (!allPassed) {
    console.error('\n❌ OTO PASPAS PLAYWRIGHT VALIDATION FAILED!');
    process.exit(1);
  } else {
    console.log('\n✅ ALL PLAYWRIGHT ASSERTIONS AND RESPONSIVE CHECKS PASSED PERFECTLY!');
    process.exit(0);
  }
}

runOtoPaspasValidation();

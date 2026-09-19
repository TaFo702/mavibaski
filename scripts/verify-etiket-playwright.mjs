import { chromium } from 'playwright';

async function run() {
  console.log('=== STARTING PLAYWRIGHT TESTS FOR /etiket BREADCRUMB ===\n');

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });

  const page = await context.newPage();

  try {
    // 1. DIRECT NAVIGATION TEST (DESKTOP)
    console.log('--- TEST 1: Direct Navigation to /etiket (Desktop) ---');
    await page.goto('http://localhost:3000/etiket', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('nav[aria-label="Breadcrumb"]');

    const breadcrumbCount = await page.locator('nav[aria-label="Breadcrumb"]').count();
    console.log(`[PASS] Breadcrumb nav count: ${breadcrumbCount} (expected: 1)`);
    if (breadcrumbCount !== 1) throw new Error('Expected exactly 1 breadcrumb nav');

    const navElement = page.locator('nav[aria-label="Breadcrumb"]').first();
    const navText = await navElement.innerText();
    const cleanNavText = navText.replace(/\s+/g, ' ').trim();
    console.log(`[PASS] Nav innerText output:\n"${cleanNavText}"`);

    // Verify semantics
    const homeLink = navElement.locator('a[href="/"]');
    const matbaaLink = navElement.locator('a[href="/matbaa"]');
    const currentItem = navElement.locator('[aria-current="page"]');

    const homeText = await homeLink.innerText();
    const matbaaText = await matbaaLink.innerText();
    const currentText = await currentItem.innerText();

    console.log(`[PASS] Home link text: "${homeText.trim()}"`);
    console.log(`[PASS] Matbaa link text: "${matbaaText.trim()}"`);
    console.log(`[PASS] Current page item text: "${currentText.trim()}"`);

    if (homeText.trim() !== 'Ana Sayfa') throw new Error('Home link text is not Ana Sayfa');
    if (matbaaText.trim() !== 'Matbaa Ürünleri') throw new Error('Matbaa link text is not Matbaa Ürünleri');
    if (currentText.trim() !== 'Etiket Baskı Fiyatları') throw new Error('Current item text is not Etiket Baskı Fiyatları');

    // Header collision check
    const headerBox = await page.locator('header').first().boundingBox();
    const breadcrumbBox = await navElement.boundingBox();
    console.log(`[INFO] Header box bottom: ${headerBox ? headerBox.y + headerBox.height : 'N/A'}`);
    console.log(`[INFO] Breadcrumb box top: ${breadcrumbBox ? breadcrumbBox.y : 'N/A'}`);
    if (headerBox && breadcrumbBox) {
      const collision = breadcrumbBox.y < (headerBox.y + headerBox.height - 1);
      console.log(`[PASS] Header collision check: collision=${collision} (breadcrumb sits below header)`);
      if (collision) throw new Error('Breadcrumb collides with header');
    }

    // 2. MOBILE VIEWPORT TEST
    console.log('\n--- TEST 2: Mobile Viewport (375x667) ---');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    const mobileNavBox = await navElement.boundingBox();
    const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const windowInnerWidth = await page.evaluate(() => window.innerWidth);
    console.log(`[INFO] Mobile viewport width: ${windowInnerWidth}, body scroll width: ${bodyScrollWidth}`);
    console.log(`[INFO] Mobile breadcrumb box: width=${mobileNavBox?.width}, height=${mobileNavBox?.height}`);
    
    const isMobileNavVisible = await navElement.isVisible();
    console.log(`[PASS] Mobile breadcrumb is visible: ${isMobileNavVisible}`);
    if (!isMobileNavVisible) throw new Error('Breadcrumb not visible on mobile');

    const mobileNavText = await navElement.innerText();
    console.log(`[PASS] Mobile Nav text:\n"${mobileNavText.replace(/\s+/g, ' ').trim()}"`);

    // 3. CLIENT-SIDE NAVIGATION TEST
    console.log('\n--- TEST 3: Client-side navigation from / to /etiket ---');
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
    
    // Find link to /etiket
    const etiketLink = page.locator('a[href="/etiket"]').first();
    await etiketLink.waitFor({ state: 'attached' });
    await etiketLink.click();

    await page.waitForURL('**/etiket');
    await page.waitForSelector('nav[aria-label="Breadcrumb"]');

    const clientBreadcrumbCount = await page.locator('nav[aria-label="Breadcrumb"]').count();
    console.log(`[PASS] Client-side navigation breadcrumb count: ${clientBreadcrumbCount} (expected: 1)`);
    if (clientBreadcrumbCount !== 1) throw new Error('Expected exactly 1 breadcrumb nav after client-side nav');

    const clientNavElement = page.locator('nav[aria-label="Breadcrumb"]').first();
    const clientNavText = await clientNavElement.innerText();
    const cleanClientNavText = clientNavText.replace(/\s+/g, ' ').trim();
    console.log(`[PASS] Client-side nav innerText output:\n"${cleanClientNavText}"`);

    const clientCurrentItem = clientNavElement.locator('[aria-current="page"]');
    const clientCurrentText = await clientCurrentItem.innerText();
    console.log(`[PASS] Client-side current item text: "${clientCurrentText.trim()}"`);
    if (clientCurrentText.trim() !== 'Etiket Baskı Fiyatları') throw new Error('Client-side current item is not Etiket Baskı Fiyatları');

    console.log('\n🎉 ALL PLAYWRIGHT TESTS PASSED SUCCESSFULLY! 🎉\n');
  } catch (err) {
    console.error('Playwright Test Failed:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

run();

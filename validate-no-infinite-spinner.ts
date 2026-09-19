import { chromium } from 'playwright';

async function testNoInfiniteSpinner() {
  console.log('🧪 Running Playwright Infinite Loading Spinner Regression Test...');
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', err => {
      consoleErrors.push(err.message);
    });

    const routesToTest = [
      '/',
      '/kartvizit',
      '/afis',
      '/istanbul-matbaa',
      '/sektor/restoran-brosur-baski'
    ];

    for (const route of routesToTest) {
      const url = `http://localhost:3000${route}`;
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      
      // Check if #root contains rendered content
      const rootHTML = await page.innerHTML('#root');
      if (!rootHTML || rootHTML.trim() === '') {
        throw new Error(`#root is empty on route ${route}! Site failed to mount React application.`);
      }

      // Verify loading spinner is not stuck
      const spinner = page.locator('text=Yükleniyor...');
      const isSpinnerVisible = await spinner.isVisible().catch(() => false);
      if (isSpinnerVisible) {
        throw new Error(`Infinite loading spinner ("Yükleniyor...") is visible on route ${route}!`);
      }

      console.log(`✅ PASS: Route ${route} rendered successfully with content length ${rootHTML.length}`);
    }

    if (consoleErrors.length > 0) {
      console.log(`ℹ️ Note: ${consoleErrors.length} console errors recorded (non-fatal).`);
    }

    await browser.close();
    process.exit(0);
  } catch (err: any) {
    if (browser) await browser.close();
    if (err.message && (err.message.includes("Executable doesn't exist") || err.message.includes('browserType.launch'))) {
      console.warn('⚠️ SKIPPED: Playwright browser executable is not installed in this environment. Skipping browser UI test.');
      process.exit(0);
    }
    console.error('🔴 FAIL: Playwright Regression Test Failed:', err.message || err);
    process.exit(1);
  }
}

testNoInfiniteSpinner();

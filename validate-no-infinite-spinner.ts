import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright';

async function testNoInfiniteSpinner() {
  console.log('🧪 Running Playwright Infinite Loading Spinner Regression Test...');
  const baseURL = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);
  const browser = await chromium.launch({ executablePath, headless: true });
  try {
    const page = await browser.newPage();
    page.setDefaultTimeout(15000);
    const failures: string[] = [];
    page.on('pageerror', error => failures.push(`JavaScript: ${error.message}`));
    const isApplicationAsset = (url: string, type: string) => new URL(url).origin === new URL(baseURL).origin && ['script', 'stylesheet'].includes(type);
    page.on('requestfailed', request => {
      if (isApplicationAsset(request.url(), request.resourceType())) failures.push(`${request.url()}: ${request.failure()?.errorText}`);
    });
    page.on('response', response => {
      const type = response.request().resourceType();
      if (!isApplicationAsset(response.url(), type)) return;
      if (response.status() >= 400) failures.push(`${response.url()}: HTTP ${response.status()}`);
      else if (response.status() >= 200 && response.status() < 300) {
        const mime = (response.headers()['content-type'] || '').split(';')[0].trim().toLowerCase();
        const validMime = type === 'stylesheet' ? mime === 'text/css' : /^(text|application)\/(javascript|ecmascript|x-javascript)$/.test(mime);
        if (!validMime) failures.push(`${response.url()}: invalid ${type} MIME type ${mime || '(missing)'}`);
      }
    });

    const routesToTest = [
      '/',
      '/kartvizit',
      '/afis',
      '/istanbul-matbaa',
      '/sektor/restoran-brosur-baski'
    ];

    for (const route of routesToTest) {
      const response = await page.goto(new URL(route, baseURL).href, { waitUntil: 'load', timeout: 30000 });
      assert.equal(response?.status(), 200, `Unexpected document response on ${route}`);
      await page.locator('#root nav').first().waitFor({ state: 'visible' });
      await page.locator('#root main h1').first().waitFor({ state: 'visible' });
      await page.getByText('Yükleniyor...', { exact: true }).first().waitFor({ state: 'hidden' });
      const content = (await page.locator('#root').innerText()).trim();
      assert.ok(content, `#root has no visible text on ${route}`);
      assert.deepEqual(failures, [], `Application failed to load on ${route}`);
      console.log(`✅ PASS: Route ${route} rendered successfully with visible content length ${content.length}`);
    }
    assert.deepEqual(failures, []);
  } finally {
    await browser.close();
  }
}

testNoInfiniteSpinner().catch(error => {
  console.error('🔴 FAIL: Playwright Regression Test Failed:', error);
  process.exitCode = 1;
});

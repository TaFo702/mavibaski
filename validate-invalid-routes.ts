import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { chromium, type Page } from 'playwright';
import { JSDOM } from 'jsdom';

const INVALID_ROUTES_TO_TEST = [
  '/invalid-city-xyz-matbaa',
  '/non-existent-product-abc',
  '/random-404-url-test',
  '/istanbul-random-junk',
  '/sektor/test-gecersiz-sayfa'
];

async function validateInvalidRoutes() {
  // Static rendering cannot wait for lazy React routes. Test the running app instead.
  const baseURL = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
    || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);
  const browser = await chromium.launch({ headless: true, executablePath });

  try {
    const page = await browser.newPage();
    page.setDefaultTimeout(15000);
    page.setDefaultNavigationTimeout(30000);
    const runtimeErrors: string[] = [];
    const assetErrors: string[] = [];
    const isCriticalAsset = (url: string, type: string) => new URL(url).origin === new URL(baseURL).origin && ['script', 'stylesheet'].includes(type);
    page.on('pageerror', error => runtimeErrors.push(error.message));
    page.on('requestfailed', request => {
      if (isCriticalAsset(request.url(), request.resourceType())) assetErrors.push(`${request.url()}: ${request.failure()?.errorText}`);
    });
    page.on('response', response => {
      const type = response.request().resourceType();
      if (!isCriticalAsset(response.url(), type)) return;
      if (response.status() >= 400) assetErrors.push(`${response.url()}: HTTP ${response.status()}`);
      else if (response.status() >= 200 && response.status() < 300) {
        const mime = (response.headers()['content-type'] || '').split(';')[0].trim().toLowerCase();
        const valid = type === 'stylesheet' ? mime === 'text/css' : /^(text|application)\/(javascript|ecmascript|x-javascript)$/.test(mime);
        if (!valid) assetErrors.push(`${response.url()}: invalid ${type} MIME ${mime || '(missing)'}`);
      }
    });
    const assertNoErrors = (route: string) => {
      assert.deepEqual(runtimeErrors, [], `${route}: uncaught application error`);
      assert.deepEqual(assetErrors, [], `${route}: application assets must load successfully`);
    };
    async function waitForHeading(route: string) {
      let onError: (error: Error) => void;
      const failed = new Promise<never>((_, reject) => {
        onError = error => reject(new Error(`${route}: application crashed before rendering: ${error.message}`));
        page.once('pageerror', onError);
      });
      try {
        assertNoErrors(route);
        await Promise.race([page.locator('#root h1').first().waitFor({ state: 'visible' }), failed]);
      } finally {
        page.off('pageerror', onError!);
      }
    }
    async function assertRenderedRoute(route: string, missing: boolean) {
      await waitForHeading(route);
      await page.waitForFunction(({ route, missing }) => {
        const heading = document.querySelector('#root h1');
        const canonical = document.querySelectorAll('link[rel="canonical"]');
        const robots = [...document.querySelectorAll('meta[name="robots"]')].map(node => node.getAttribute('content') || '');
        return canonical.length === 1 && canonical[0].getAttribute('href') === `https://mavibasim.com${route}`
          && (missing ? /404|Bulunamadı/.test(heading?.textContent || '') && robots.some(value => value.includes('noindex')) : Boolean(heading?.textContent?.trim()) && !/404|Bulunamadı/.test(heading?.textContent || '') && robots.every(value => !value.includes('noindex')));
      }, { route, missing });
      await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
      assertNoErrors(route);
    }
    for (const route of INVALID_ROUTES_TO_TEST) {
      const response = await page.goto(new URL(route, baseURL).href, { waitUntil: 'domcontentloaded' });
      assert.equal(response?.status(), 404, `${route}: expected HTTP 404`);
      const initialDOM = new JSDOM(await response!.text());
      try {
        assert.match(initialDOM.window.document.querySelector('meta[name="robots"]')?.getAttribute('content') || '', /noindex/, `${route}: initial HTML must be noindex`);
        assert.equal(initialDOM.window.document.querySelector('link[rel="canonical"]')?.getAttribute('href'), `https://mavibasim.com${route}`);
      } finally {
        initialDOM.window.close();
      }

      await assertRenderedRoute(route, true);
      console.log(`PASS ${route}: HTTP 404, rendered heading, canonical/noindex, no runtime or asset errors`);
    }
    const validSector = '/sektor/restoran-brosur-baski';
    const invalidSector = '/sektor/test-gecersiz-sayfa';
    assert.equal((await page.goto(new URL(validSector, baseURL).href))?.status(), 200);
    await assertRenderedRoute(validSector, false);
    for (let repeat = 0; repeat < 2; repeat++) {
      for (const route of [invalidSector, validSector]) {
        await navigateWithoutReload(page, route);
        await assertRenderedRoute(route, route === invalidSector);
        if (route === invalidSector) {
          const graphs = await page.locator('script[type="application/ld+json"]').allTextContents();
          assert.ok(graphs.every(text => !text.includes(validSector)), '404 page must not retain the previous sector schema');
        }
      }
    }
    assertNoErrors('completed invalid route navigation');
    console.log('PASS valid sector → invalid sector → valid sector twice: visible content, canonical/noindex and schema cleanup');
    console.log(`ALL ${INVALID_ROUTES_TO_TEST.length} INVALID ROUTES AND SPA RECOVERY PASSED`);
  } finally {
    await browser.close();
  }
}

async function navigateWithoutReload(page: Page, route: string) {
  await page.evaluate(path => {
    history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, route);
}

validateInvalidRoutes().catch((error: unknown) => {
  console.error('INVALID ROUTE VALIDATION FAILED (requires a running application).', error);
  process.exitCode = 1;
});

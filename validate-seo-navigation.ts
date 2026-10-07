import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { chromium } from 'playwright';
import { getRouteSEO } from './src/utils/seoGenerator';

async function validateSEONavigation() {
  const baseURL = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);
  const browser = await chromium.launch({ executablePath, headless: true });
  try {
    const page = await browser.newPage();
    page.setDefaultTimeout(15000);
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(`JavaScript: ${error.message}`));
    const isApplicationAsset = (url: string, type: string) => new URL(url).origin === new URL(baseURL).origin && ['script', 'stylesheet'].includes(type);
    page.on('requestfailed', request => {
      if (isApplicationAsset(request.url(), request.resourceType())) errors.push(`${request.url()}: ${request.failure()?.errorText}`);
    });
    page.on('response', response => {
      const type = response.request().resourceType();
      if (!isApplicationAsset(response.url(), type)) return;
      if (response.status() >= 400) errors.push(`${response.url()}: HTTP ${response.status()}`);
      else if (response.status() >= 200 && response.status() < 300) {
        const mime = (response.headers()['content-type'] || '').split(';')[0].trim().toLowerCase();
        const validMime = type === 'stylesheet' ? mime === 'text/css' : /^(text|application)\/(javascript|ecmascript|x-javascript)$/.test(mime);
        if (!validMime) errors.push(`${response.url()}: invalid ${type} MIME type ${mime || '(missing)'}`);
      }
    });
    const assertVisiblePage = async () => {
      await page.locator('#root nav').first().waitFor({ state: 'visible' });
      await page.locator('#root main h1').first().waitFor({ state: 'visible' });
      await page.getByText('Yükleniyor...', { exact: true }).first().waitFor({ state: 'hidden' });
      assert.ok((await page.locator('#root').innerText()).trim(), 'Page has no visible application content');
      assert.deepEqual(errors, [], 'Application failed during navigation');
    };
    const initialResponse = await page.goto(baseURL, { waitUntil: 'load' });
    assert.equal(initialResponse?.status(), 200);
    await assertVisiblePage();
    for (const pathname of ['/gizlilik-politikasi', '/kartvizit', '/dosyalar', '/ankara-matbaa', '/blog/ofset-baski-nasil-yapilir', '/seo-test-missing-page', '/kartvizit', '/', '/bloknotlar', '/brosur']) {
      const response = await fetch(new URL(pathname, baseURL));
      assert.ok(response.status === 200 || response.status === 404, `Unexpected metadata response for ${pathname}: ${response.status}`);
      const dom = new JSDOM(await response.text());
      const expected = {
        title: dom.window.document.title,
        description: dom.window.document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
        canonical: dom.window.document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
        noindex: response.status === 404
      };
      dom.window.close();
      // Browser back/forward route updates, without replacing the document.
      await page.evaluate(path => {
        history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }, pathname);
      await page.waitForFunction(expected => {
        const titles = document.querySelectorAll('title');
        const descriptions = document.querySelectorAll('meta[name="description"]');
        const canonicals = document.querySelectorAll('link[rel="canonical"]');
        const robots = [...document.querySelectorAll('meta[name="robots"]')].map(node => node.getAttribute('content') || '');
        return titles.length === 1 && descriptions.length === 1 && canonicals.length === 1
          && new URL(canonicals[0].getAttribute('href') || '', location.href).href === new URL(expected.canonical).href
          && (expected.noindex ? robots.some(value => value.includes('noindex')) : robots.every(value => !value.includes('noindex')) && document.title === expected.title && descriptions[0].getAttribute('content') === expected.description);
      }, expected);
      await assertVisiblePage();
      console.log(`PASS metadata ownership and navigation: ${pathname}`);
    }
    assert.deepEqual(errors, []);
    // Real links still trigger the same router metadata lifecycle.
    await page.locator('a[href="/ankara-matbaa"]').first().click();
    await page.waitForURL('**/ankara-matbaa');
    await page.waitForFunction(() => document.querySelectorAll('link[rel="canonical"]').length === 1 && document.querySelector('link[rel="canonical"]')?.getAttribute('href') === 'https://mavibasim.com/ankara-matbaa');
    await assertVisiblePage();
    console.log('PASS actual footer link navigation');
    const kartvizitSEO = getRouteSEO('/kartvizit');
    const kartvizitURL = new URL('/kartvizit', baseURL).href;
    for (const failure of ['network-abort', 'http-500-html', 'http-200-json'] as const) {
      // Each case starts with a real 404 document so stale noindex/title data is observable.
      const missingResponse = await page.goto(new URL('/seo-test-missing-page', baseURL).href, { waitUntil: 'load' });
      assert.equal(missingResponse?.status(), 404);
      await assertVisiblePage();
      await page.waitForFunction(() => [...document.querySelectorAll('meta[name="robots"]')].some(node => /noindex/i.test(node.getAttribute('content') || '')));
      let intercepted = 0;
      const interceptMetadata = async (route: import('playwright').Route) => {
        // Leave document navigation and lazy JavaScript assets untouched.
        if (route.request().resourceType() !== 'fetch') return route.continue();
        intercepted++;
        if (failure === 'network-abort') await route.abort('failed');
        else if (failure === 'http-500-html') await route.fulfill({ status: 500, contentType: 'text/html', body: '<html><head><title>Controlled server error</title><meta name="description" content="Controlled error description"><meta name="robots" content="noindex, follow"><link rel="canonical" href="https://mavibasim.com/controlled-error"></head><body>Controlled error</body></html>' });
        else await route.fulfill({ status: 200, contentType: 'application/json', body: '{"error":"controlled non-HTML metadata response"}' });
      };
      await page.route(kartvizitURL, interceptMetadata);
      try {
        // Wait for the intercepted fetch to settle, then let its promise and head
        // updates run. Expected fetch failures are separate from asset/page errors.
        await Promise.all([
          failure === 'network-abort'
            ? page.waitForEvent('requestfailed', { predicate: request => request.url() === kartvizitURL && request.resourceType() === 'fetch' })
            : page.waitForEvent('requestfinished', { predicate: request => request.url() === kartvizitURL && request.resourceType() === 'fetch' }),
          page.evaluate(() => {
            history.pushState({}, '', '/kartvizit');
            window.dispatchEvent(new PopStateEvent('popstate'));
          })
        ]);
        await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
        assert.equal(intercepted, 1, `${failure}: metadata request was not intercepted exactly once`);
        await page.waitForFunction(expected => {
          const titles = document.querySelectorAll('title');
          const descriptions = document.querySelectorAll('meta[name="description"]');
          const canonicals = document.querySelectorAll('link[rel="canonical"]');
          const robots = document.querySelectorAll('meta[name="robots"]');
          const robotContent = robots[0]?.getAttribute('content') || '';
          const heading = document.querySelector<HTMLElement>('#root main h1');
          return titles.length === 1 && document.title === expected.title
            && descriptions.length === 1 && descriptions[0].getAttribute('content') === expected.desc
            && canonicals.length === 1 && canonicals[0].getAttribute('href') === expected.canonical
            && robots.length === 1 && !/noindex/i.test(robotContent) && /\bindex\b/i.test(robotContent)
            && heading?.textContent?.trim() === expected.h1Text && heading.getBoundingClientRect().height > 0;
        }, { title: kartvizitSEO.title, desc: kartvizitSEO.desc, canonical: kartvizitSEO.canonical, h1Text: kartvizitSEO.h1Text });
        await assertVisiblePage();
        console.log(`PASS metadata fallback after direct 404: ${failure}`);
      } finally {
        await page.unroute(kartvizitURL, interceptMetadata);
      }
    }
    assert.deepEqual(errors, [], 'Application failed during metadata failure regression cases');
  } finally {
    await browser.close();
  }
}

validateSEONavigation().catch(error => { console.error(error); process.exitCode = 1; });

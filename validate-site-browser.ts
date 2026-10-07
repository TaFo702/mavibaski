import assert from 'node:assert/strict';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { chromium, type Page } from 'playwright';

type InventoryEntry = { path: string; category: string; redirect?: string | null };
type PageCheck = {
  path: string;
  category: string;
  width: number;
  status?: number;
  finalPath?: string;
  rootCharacters?: number;
  h1Count?: number;
  scrollWidth?: number;
  overflowElements?: { element: string; left: number; right: number; width: number }[];
  issues: string[];
  runtimeErrors: string[];
  assetErrors: string[];
};
type LinkCheck = { target: string; sources: string[]; status?: number; finalPath?: string; error?: string };

// The user confirmed that these targets are unknown and must stay unchanged.
// Report their 404 responses explicitly; do not describe them as working links.
const unresolvedTargets = new Set([
  '/reklam-urunleri',
  '/lisans',
  '/servis-formu',
  '/fiyat-sor',
]);
const baseURL = new URL(process.env.TEST_BASE_URL || 'http://127.0.0.1:3000');
const inventoryPath = process.env.SITE_BROWSER_INVENTORY || 'reports/seo-after.json';
const timeout = 15000;

// TEST_BASE_URL selects either the local production server or the live site.
function localTarget(href: string): string | null {
  if (!href.startsWith('/') && !href.startsWith('https://mavibasim.com') && !href.startsWith(baseURL.origin)) return null;
  const url = new URL(href, baseURL);
  if (url.origin !== baseURL.origin && url.origin !== 'https://mavibasim.com') return null;
  return url.pathname + url.search;
}

async function validateSiteBrowser() {
  const inventory = JSON.parse(readFileSync(inventoryPath, 'utf8')) as { rows: InventoryEntry[] };
  assert.ok(Array.isArray(inventory.rows) && inventory.rows.length, 'SEO inventory must contain routes');
  const entries = inventory.rows.map(({ path: routePath, category, redirect }) => ({ path: routePath, category, redirect }));
  assert.equal(new Set(entries.map(entry => entry.path)).size, entries.length, 'Inventory routes must be unique');
  assert.ok(entries.every(entry => entry.path.startsWith('/')), 'Inventory routes must be local paths');
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
    || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);
  const browser = await chromium.launch({ executablePath, headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  // External analytics, fonts and images are outside this local application test.
  await context.route('**/*', route => new URL(route.request().url()).origin === baseURL.origin ? route.continue() : route.abort());
  const checks: PageCheck[] = [];
  const links = new Map<string, Set<string>>();
  const licenses = new Map<string, Set<string>>();
  const recordTarget = (map: Map<string, Set<string>>, href: string, source: string) => {
    const target = localTarget(href);
    if (target !== null) {
      const sources = map.get(target) || new Set<string>();
      sources.add(source);
      map.set(target, sources);
    }
  };
  const isApplicationAsset = (url: string, type: string) => new URL(url).origin === baseURL.origin && ['script', 'stylesheet'].includes(type);

  const inspectPage = async (page: Page, entry: InventoryEntry, width: number): Promise<PageCheck> => {
    const check: PageCheck = { path: entry.path, category: entry.category, width, issues: [], runtimeErrors: [], assetErrors: [] };
    const onError = (error: Error) => check.runtimeErrors.push(error.message);
    const onFailed = (request: import('playwright').Request) => {
      if (isApplicationAsset(request.url(), request.resourceType())) check.assetErrors.push(`${request.url()}: ${request.failure()?.errorText}`);
    };
    const onResponse = (response: import('playwright').Response) => {
      const resourceType = response.request().resourceType();
      if (!isApplicationAsset(response.url(), resourceType)) return;
      if (response.status() >= 400) check.assetErrors.push(`${response.url()}: HTTP ${response.status()}`);
      else if (response.status() >= 200 && response.status() < 300) {
        const mime = (response.headers()['content-type'] || '').split(';')[0].trim().toLowerCase();
        const valid = resourceType === 'stylesheet' ? mime === 'text/css'
          : ['application/javascript', 'text/javascript', 'application/ecmascript', 'text/ecmascript'].includes(mime);
        if (!valid) check.assetErrors.push(`${response.url()}: invalid ${resourceType} MIME ${mime || '(missing)'}`);
      }
    };
    page.on('pageerror', onError);
    page.on('requestfailed', onFailed);
    page.on('response', onResponse);
    try {
      await page.setViewportSize({ width, height: 844 });
      const response = await page.goto(new URL(entry.path, baseURL).href, { waitUntil: 'load' });
      check.status = response?.status();
      check.finalPath = new URL(page.url()).pathname;
      if (check.status !== 200) check.issues.push('http-status');
      if (check.finalPath !== (entry.redirect || entry.path)) check.issues.push('unexpected-final-path');
      await page.locator('#root nav').first().waitFor({ state: 'visible' });
      await page.locator('#root main h1').first().waitFor({ state: 'visible' });
      await page.getByText('Yükleniyor...', { exact: true }).first().waitFor({ state: 'hidden' });
      // Let React effects and the browser's next two layout frames complete.
      await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
      const result = await page.evaluate(() => {
        const root = document.querySelector<HTMLElement>('#root');
        const h1 = [...document.querySelectorAll<HTMLElement>('#root main h1')];
        const width = document.documentElement.clientWidth;
        const overflowElements = [...document.querySelectorAll<HTMLElement>('#root *')]
          .filter(element => {
            const style = getComputedStyle(element);
            if (style.display === 'none' || style.visibility === 'hidden' || style.position === 'fixed') return false;
            const rect = element.getBoundingClientRect();
            return rect.width > 0 && (rect.right > width + 2 || rect.left < -2);
          })
          .slice(0, 12)
          .map(element => {
            const rect = element.getBoundingClientRect();
            return { element: element.tagName.toLowerCase() + (element.id ? `#${element.id}` : '') + '.' + String(element.className).trim().split(/\s+/).slice(0, 5).join('.'), left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) };
          });
        const licenses: string[] = [];
        for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
          try {
            const pending: unknown[] = [JSON.parse(script.textContent || '')];
            while (pending.length) {
              const value = pending.pop();
              if (Array.isArray(value)) pending.push(...value);
              else if (value && typeof value === 'object') {
                for (const [key, child] of Object.entries(value)) {
                  if (key === 'license' && typeof child === 'string') licenses.push(child);
                  pending.push(child);
                }
              }
            }
          } catch { /* JSON-LD syntax is covered by the SEO test. */ }
        }
        return {
          rootCharacters: root?.innerText.trim().length || 0,
          h1Count: h1.length,
          scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
          overflowElements,
          hrefs: [...document.querySelectorAll('[href]')].map(element => element.getAttribute('href') || ''),
          licenses,
        };
      });
      check.rootCharacters = result.rootCharacters;
      check.h1Count = result.h1Count;
      check.scrollWidth = result.scrollWidth;
      if (!result.rootCharacters) check.issues.push('empty-root');
      if (result.h1Count !== 1) check.issues.push('h1-count');
      if (result.scrollWidth > width + 2) {
        check.issues.push('horizontal-overflow');
        check.overflowElements = result.overflowElements;
      }
      for (const href of result.hrefs) recordTarget(links, href, entry.path);
      for (const license of result.licenses) recordTarget(licenses, license, entry.path);
    } catch (error) {
      check.issues.push(`incomplete: ${String(error)}`);
    } finally {
      page.off('pageerror', onError);
      page.off('requestfailed', onFailed);
      page.off('response', onResponse);
      if (check.runtimeErrors.length) check.issues.push('uncaught-application-error');
      if (check.assetErrors.length) check.issues.push('critical-local-asset-error');
    }
    return check;
  };

  let linkChecks: LinkCheck[] = [];
  try {
    let index = 0;
    await Promise.all(Array.from({ length: 2 }, async () => {
      const page = await context.newPage();
      page.setDefaultTimeout(timeout);
      page.setDefaultNavigationTimeout(30000);
      try {
        while (index < entries.length) {
          const entry = entries[index++];
          checks.push(await inspectPage(page, entry, 390));
          if (checks.length % 30 === 0) console.log(`Checked ${checks.length}/${entries.length} routes at 390px`);
        }
      } finally { await page.close(); }
    }));

    const representatives = ['/', '/kartvizit', '/kataloglar', '/cilt-isleri', '/ankara-matbaa', '/sektor/e-ticaret-perakende-baski', '/blog/ofset-baski-nasil-yapilir'];
    const responsiveJobs = [360, 768, 1440].flatMap(width => representatives.map(routePath => {
      const entry = entries.find(entry => entry.path === routePath);
      assert.ok(entry, `Responsive example is missing from the inventory: ${routePath}`);
      return { entry, width };
    }));
    index = 0;
    await Promise.all(Array.from({ length: 2 }, async () => {
      const page = await context.newPage();
      page.setDefaultTimeout(timeout);
      page.setDefaultNavigationTimeout(30000);
      try {
        while (index < responsiveJobs.length) {
          const { entry, width } = responsiveJobs[index++];
          checks.push(await inspectPage(page, entry, width));
        }
      } finally { await page.close(); }
    }));

    for (const [target, sources] of licenses) for (const source of sources) recordTarget(links, target, `${source} (JSON-LD license)`);
    // Include unresolved addresses explicitly even if no current DOM links to one.
    for (const target of unresolvedTargets) if (!links.has(target)) links.set(target, new Set(['explicit unresolved-target check']));
    const targets = [...links.keys()].sort();
    index = 0;
    await Promise.all(Array.from({ length: 2 }, async () => {
      while (index < targets.length) {
        const target = targets[index++];
        const result: LinkCheck = { target, sources: [...links.get(target)!].sort() };
        try {
          let current = new URL(target, baseURL);
          for (let hops = 0; hops <= 10; hops++) {
            const response = await context.request.get(current.href, { timeout, maxRedirects: 0 });
            result.status = response.status();
            result.finalPath = current.pathname;
            const location = response.headers().location;
            const contentType = response.headers()['content-type'] || '';
            await response.dispose();
            if (result.status === 200 && contentType.includes('text/html')) {
              // Vercel publishes the static build, not Express's dynamic fallback.
              // A local HTTP 200 must not hide a page missing from that build.
              const pathname = decodeURIComponent(current.pathname);
              const outputPath = path.resolve('dist', `.${pathname}`, pathname.endsWith('.html') ? '' : 'index.html');
              assert.ok(outputPath.startsWith(path.resolve('dist') + path.sep), `HTML target leaves dist: ${target}`);
              assert.ok(existsSync(outputPath), `HTTP 200 HTML is missing from the Vercel build: ${current.pathname}`);
            }
            if (result.status < 300 || result.status >= 400 || !location) break;
            assert.ok(hops < 10, `Too many redirects for ${target}`);
            const redirected = new URL(location, current);
            const nextTarget = localTarget(redirected.href);
            assert.ok(nextTarget !== null, `Redirect leaves the local/production application: ${redirected.href}`);
            current = new URL(nextTarget, baseURL);
          }
        } catch (error) { result.error = String(error); }
        linkChecks.push(result);
      }
    }));
  } finally { await browser.close(); }

  checks.sort((a, b) => a.width - b.width || a.path.localeCompare(b.path));
  linkChecks = linkChecks.sort((a, b) => a.target.localeCompare(b.target));
  const pageFailures = checks.filter(check => check.issues.length);
  const unresolved = linkChecks.filter(check => unresolvedTargets.has(check.target));
  // Only the already known 404 is exempt; a timeout or a different server error still fails.
  const linkFailures = linkChecks.filter(check => check.error || check.status === undefined
    || (check.status >= 400 && !(unresolvedTargets.has(check.target) && check.status === 404)));
  const report = {
    generatedAt: new Date().toISOString(),
    scope: `${['localhost', '127.0.0.1'].includes(baseURL.hostname) ? 'Local' : 'Live'} Chromium rendering and GET requests; static HTML coverage checked; no search-ranking claims`,
    baseURL: baseURL.href,
    inventoryPath,
    concurrency: 2,
    summary: {
      inventoryRoutes: entries.length,
      mobileChecks: checks.filter(check => check.width === 390).length,
      responsiveChecks: checks.filter(check => check.width !== 390).length,
      pageFailures: pageFailures.length,
      distinctInternalTargets: linkChecks.length,
      linkFailures: linkFailures.length,
      knownUnresolved404: unresolved.filter(check => check.status === 404).length,
      renderedLicenseTargets: licenses.size,
    },
    knownUnresolved: unresolved,
    pageFailures,
    linkFailures,
    checks,
    linkChecks,
  };
  const outputPath = process.env.SITE_BROWSER_REPORT;
  if (outputPath) {
    const resolved = path.resolve(outputPath);
    assert.ok(resolved.startsWith('/tmp/'), 'SITE_BROWSER_REPORT must be a path under /tmp; existing repository reports must not be overwritten');
    writeFileSync(resolved, JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify({ ...report.summary, report: resolved, knownUnresolved: unresolved.map(({ target, status }) => ({ target, status })) }, null, 2));
  } else console.log(JSON.stringify(report, null, 2));
  assert.equal(pageFailures.length, 0, 'Some pages failed rendering or responsive checks; inspect pageFailures');
  assert.equal(linkFailures.length, 0, 'New or unexpected internal-link failures; inspect linkFailures');
  console.log('PASS site browser checks. The explicitly listed unresolved 404 targets remain unresolved.');
}

validateSiteBrowser().catch((error: unknown) => {
  console.error('SITE BROWSER VALIDATION FAILED (requires a running application).', error);
  process.exitCode = 1;
});

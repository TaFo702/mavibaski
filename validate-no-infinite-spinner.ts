import { chromium } from 'playwright';
import express from 'express';
import { createServer } from 'node:http';
import { once } from 'node:events';
import fs from 'node:fs';
import path from 'node:path';
import { STATIC_PAGE_ROUTES } from './src/data/staticPageRoutes';

async function testNoInfiniteSpinner() {
  console.log('Running real-browser production loading and navigation checks...');
  const dist = path.resolve('dist');
  if (!fs.existsSync(path.join(dist, 'index.html'))) throw new Error('Build dist first.');

  // Own the test server: quality does not require an unrelated dev server on port 3000.
  const app = express();
  app.use(express.static(dist, { index: false, redirect: false }));
  app.get('*', (req, res) => {
    const route = req.path.replace(/^\/+|\/+$/g, '');
    const file = path.resolve(dist, route, 'index.html');
    if ((file !== path.join(dist, 'index.html') && !file.startsWith(dist + path.sep)) || !fs.existsSync(file)) {
      res.status(404).end();
      return;
    }
    res.sendFile(file);
  });
  const server = createServer(app);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Missing test server address');
  const origin = `http://127.0.0.1:${address.port}`;
  let browser;
  try {
    // A missing browser is a failed prerequisite, never a silently passing test.
    const executablePath = process.argv.find(arg => arg.startsWith('--executable-path='))?.slice('--executable-path='.length);
    browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
    for (const viewport of [{ width: 1365, height: 900 }, { width: 390, height: 844 }]) {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      const runtimeErrors: string[] = [];
      page.on('pageerror', error => runtimeErrors.push(error.message));
      // Exercise application assets locally; analytics, fonts and third-party media
      // are outside this regression and must not delay it or send test telemetry.
      await page.route('**/*', route => route.request().url().startsWith(origin + '/') ? route.continue() : route.abort());
      const routes = [...new Set(['/', '/kartvizit', '/afis', '/brosur', '/istanbul-matbaa', '/sektor/restoran-brosur-baski', '/kayseri-emlakci-afis-baski', ...STATIC_PAGE_ROUTES])];
      for (const route of routes) {
        const response = await page.goto(origin + route, { waitUntil: 'domcontentloaded', timeout: 20000 });
        if (response?.status() !== 200) throw new Error(`${route}: HTTP ${response?.status()}`);
        await page.waitForFunction(() => {
          const main = document.querySelector('main');
          return main?.querySelectorAll('h1').length === 1 && (main.textContent?.trim().length || 0) > 100 &&
            !Array.from(main.querySelectorAll('.animate-spin')).some(node => node.getClientRects().length > 0);
        }, undefined, { timeout: 10000 });
        const root = await page.locator('#root').innerHTML();
        if (!root.trim() || runtimeErrors.length) throw new Error(`${route}: ${runtimeErrors.join('; ') || 'Empty root'}`);
        console.log(`PASS ${viewport.width}px ${route}: content loaded, no stuck spinner or JavaScript crash`);
      }
      // Verify the lazy route transition as well as direct-load rendering.
      await page.goto(origin + '/kitap-ayraci', { waitUntil: 'domcontentloaded' });
      await page.locator('main h1').waitFor({ state: 'visible' });
      await page.locator('header nav a[href="/"]').click();
      await page.locator('#featured-products').waitFor({ state: 'attached' });
      await page.goBack({ waitUntil: 'domcontentloaded' });
      await page.locator('[data-page-root="kitap-ayraci"] h1').waitFor({ state: 'visible' });
      // Branda must lead to its own quote, including a direct fragment URL.
      const brandaPath = '/kayseri-emlakci-afis-baski';
      await page.goto(origin + brandaPath, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle');
      await page.locator('a[href="#branda-teklif"]').first().click();
      const quoteInView = () => {
        const top = document.getElementById('branda-teklif')?.getBoundingClientRect().top;
        return top !== undefined && top >= 120 && top < 300;
      };
      await page.waitForFunction(quoteInView);
      await page.goto(origin + brandaPath + '#branda-teklif', { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle');
      await page.waitForFunction(quoteInView);
      const quoteLink = await page.locator('[data-branda-custom-quote]').getAttribute('href');
      const quoteURL = new URL(quoteLink || '');
      if (quoteURL.hostname !== 'wa.me' || !quoteURL.searchParams.get('text')?.includes('440 gr vinil branda')) {
        throw new Error('Branda quote must carry the actual material and product');
      }
      if (!(await page.locator('[data-price-example="AF1"]').innerText()).includes('Kuşe Kâğıt Afiş')) {
        throw new Error('Paper package must be distinguished from custom branda');
      }
      if (runtimeErrors.length) throw new Error(runtimeErrors.join('; '));
      await context.close();
    }
    console.log('PASS: desktop/mobile production routes and return navigation.');
  } finally {
    if (browser) await browser.close();
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
}

testNoInfiniteSpinner().catch(error => {
  console.error('FAIL:', error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

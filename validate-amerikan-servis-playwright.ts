import { createServer } from 'http';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { chromium, Browser, Page } from 'playwright';

process.env.NODE_ENV = 'test';
process.env.DISABLE_AUTO_START = 'true';

const PORT = 4201;

async function runAmerikanServisValidation() {
  console.log('🚀 STARTING PLAYWRIGHT BROWSER DOM & RESPONSIVE VALIDATION FOR /amerikan-servis...');

  const distPath = path.join(process.cwd(), 'dist');
  const indexPath = path.join(distPath, 'index.html');

  if (!fs.existsSync(indexPath)) {
    console.error('🔴 Build dist/index.html does not exist. Run "npm run build" first!');
    process.exit(1);
  }

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

  let browser: Browser | null = null;
  let allPassed = true;

  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const page: Page = await context.newPage();

    await page.goto(`http://127.0.0.1:${PORT}/amerikan-servis`, { waitUntil: 'networkidle' });

    const h1 = (await page.locator('h1').textContent()) || '';
    if (h1.trim().length === 0) {
      allPassed = false;
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
    process.exit(1);
  } else {
    console.log('✅ Amerikan Servis validation file passed.');
    process.exit(0);
  }
}

if (process.argv[1] && process.argv[1].includes('validate-amerikan-servis-playwright.ts')) {
  runAmerikanServisValidation();
}

import { createServer } from 'vite';
import { JSDOM } from 'jsdom';
import React from 'react';
import * as ReactDOMServer from 'react-dom/server';

const { renderToStaticMarkup } = ReactDOMServer;

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', {
  url: 'https://mavibasim.com/'
});
Object.defineProperty(global, 'window', { value: dom.window, writable: true, configurable: true });
Object.defineProperty(global, 'document', { value: dom.window.document, writable: true, configurable: true });
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, writable: true, configurable: true });
Object.defineProperty(global, 'localStorage', {
  value: { getItem: () => null, setItem: () => {}, removeItem: () => {}, clear: () => {} },
  writable: true,
  configurable: true
});

const INVALID_ROUTES_TO_TEST = [
  '/invalid-city-xyz-matbaa',
  '/non-existent-product-abc',
  '/random-404-url-test',
  '/istanbul-random-junk'
];

async function validateInvalidRoutes() {
  console.log('🧪 VALIDATING CONTROLLED 404 / UNMAPPED ROUTES...');

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  const AppMod = await vite.ssrLoadModule('/src/App.tsx');
  const { TestWrapper, AppRoutes } = AppMod;

  let totalPassed404s = 0;

  for (const routePath of INVALID_ROUTES_TO_TEST) {
    const element = React.createElement(
      TestWrapper,
      { initialPath: routePath },
      React.createElement(AppRoutes)
    );

    const appHtml = renderToStaticMarkup(element);
    const doc = new JSDOM(`<!DOCTYPE html><html><head></head><body>${appHtml}</body></html>`).window.document;

    const h1Text = doc.querySelector('h1')?.textContent || '';
    const noindexMeta = doc.querySelector('meta[name="robots"]')?.getAttribute('content') || '';

    const is404Heading = h1Text.includes('404') || h1Text.includes('Bulunamadı');
    const isNoindex = noindexMeta.includes('noindex');

    if (is404Heading && isNoindex) {
      console.log(`🟢 ${routePath}: Handled properly with 404 heading and noindex meta tag.`);
      totalPassed404s++;
    } else {
      console.log(`🔴 ${routePath}: FAILED to render soft-404 response (Heading: "${h1Text}", Robots: "${noindexMeta}")`);
    }
  }

  await vite.close();

  if (totalPassed404s === INVALID_ROUTES_TO_TEST.length) {
    console.log(`🎉 ALL ${INVALID_ROUTES_TO_TEST.length} UNMAPPED ROUTES RENDERED CLEAN 404 NOINDEX RESPONSES!`);
    process.exit(0);
  } else {
    console.log(`🔴 UNMAPPED ROUTE VALIDATION FAILED!`);
    process.exit(1);
  }
}

validateInvalidRoutes();

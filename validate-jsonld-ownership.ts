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

// Pure DOM CTA noise labels that should never appear in JSON-LD schema objects (e.g. as property values or schema titles)
const STRICT_CTA_NOISE_PATTERNS = [
  'whatsapp sipariş',
  'hemen satın al',
  'hemen sipariş ver',
  'tıkla teklif al'
];

async function validateJsonLdOwnership() {
  console.log('🔍 VALIDATING JSON-LD VS DOM CTA ISOLATION...');

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  const AppMod = await vite.ssrLoadModule('/src/App.tsx');
  const { TestWrapper, CanonicalLink, AppRoutes } = AppMod;

  const testRoutes = ['/', '/kartvizit', '/brosur', '/istanbul-matbaa', '/ankara-matbaa'];

  let totalViolations = 0;

  for (const routePath of testRoutes) {
    const element = React.createElement(
      TestWrapper,
      { initialPath: routePath },
      React.createElement(
        React.Fragment,
        null,
        React.createElement(CanonicalLink),
        React.createElement(AppRoutes)
      )
    );

    const appHtml = renderToStaticMarkup(element);
    const doc = new JSDOM(`<!DOCTYPE html><html><head></head><body>${appHtml}</body></html>`).window.document;

    const scripts = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'));
    let jsonLdCtaFound = false;

    for (const script of scripts) {
      const text = (script.textContent || '').toLowerCase();
      for (const pattern of STRICT_CTA_NOISE_PATTERNS) {
        if (text.includes(pattern)) {
          console.log(`❌ VIOLATION on ${routePath}: Found pure CTA noise "${pattern}" inside JSON-LD!`);
          jsonLdCtaFound = true;
          totalViolations++;
        }
      }
    }

    if (!jsonLdCtaFound) {
      console.log(`🟢 ${routePath}: JSON-LD is 100% clean of DOM CTA noise.`);
    }
  }

  await vite.close();

  if (totalViolations > 0) {
    console.log(`❌ JSON-LD CTA Isolation Failed with ${totalViolations} violations.`);
    process.exit(1);
  } else {
    console.log(`🎉 JSON-LD CTA Isolation PASSED with 0 violations!`);
    process.exit(0);
  }
}

validateJsonLdOwnership();

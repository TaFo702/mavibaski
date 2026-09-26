import { createServer } from 'vite';
import { JSDOM } from 'jsdom';
import React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { CITIES_DATA } from './src/data/cityData';

const { renderToStaticMarkup } = ReactDOMServer;

// Establish DOM emulation
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

async function auditAll81Cities() {
  console.log(`Starting 81 City Routes Audit (${CITIES_DATA.length} cities detected)...`);
  
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  const AppMod = await vite.ssrLoadModule('/src/App.tsx');
  const CityPageMod = await vite.ssrLoadModule('/src/components/CityPage.tsx');
  const { TestWrapper, CanonicalLink } = AppMod;
  const { CityPage } = CityPageMod;

  let totalPass = 0;
  let totalFail = 0;
  const failureDetails: string[] = [];

  for (const city of CITIES_DATA) {
    const slug = city.slug; // e.g. "istanbul-matbaa"
    const routePath = `/${slug}`;

    try {
      const element = React.createElement(
        TestWrapper,
        { initialPath: routePath },
        React.createElement(
          React.Fragment,
          null,
          React.createElement(CanonicalLink),
          React.createElement(CityPage, { citySlug: city.slug })
        )
      );

      const appHtml = renderToStaticMarkup(element);

      // Inspect helmet & DOM
      const doc = new JSDOM(`<!DOCTYPE html><html><head></head><body>${appHtml}</body></html>`).window.document;

      const title = doc.querySelector('title')?.textContent || '';
      const h1Text = doc.querySelector('h1')?.textContent || '';
      const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
      const ogUrl = doc.querySelector('meta[property="og:url"]')?.getAttribute('content') || '';

      const scriptTags = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'));
      const jsonSchemas: any[] = [];
      for (const st of scriptTags) {
        try {
          if (st.textContent) jsonSchemas.push(JSON.parse(st.textContent));
        } catch {
          // ignore invalid json in test
        }
      }

      const breadcrumbCount = jsonSchemas.filter(s => s['@type'] === 'BreadcrumbList').length;
      const serviceSchemas = jsonSchemas.filter(s => s['@type'] === 'Service');
      const orgSchemas = jsonSchemas.filter(s => s['@type'] === 'Organization');

      const cityErrors: string[] = [];

      // 1. Soft 404 check
      if (appHtml.includes('Şehir Matbaa Sayfası Bulunamadı')) {
        cityErrors.push('Soft 404 text detected in DOM ("Şehir Matbaa Sayfası Bulunamadı")');
      }

      // 2. City name in Title
      if (!title.toLowerCase().includes(city.name.toLowerCase())) {
        cityErrors.push(`City name "${city.name}" missing from <title> ("${title}")`);
      }

      // 3. City name in H1
      if (!h1Text.toLowerCase().includes(city.name.toLowerCase())) {
        cityErrors.push(`City name "${city.name}" missing from <h1> ("${h1Text}")`);
      }

      // 4. Canonical match
      const expectedUrl = `https://mavibasim.com/${slug}`;
      if (canonical !== expectedUrl) {
        cityErrors.push(`Canonical link mismatch. Expected "${expectedUrl}", found "${canonical}"`);
      }

      // 5. og:url match
      if (ogUrl !== expectedUrl) {
        cityErrors.push(`og:url mismatch. Expected "${expectedUrl}", found "${ogUrl}"`);
      }

      // 6. Breadcrumb count (must not be duplicated > 1)
      if (breadcrumbCount > 1) {
        cityErrors.push(`Duplicate BreadcrumbList schemas detected: ${breadcrumbCount}`);
      }

      // 7. Service schema count
      if (serviceSchemas.length !== 1) {
        cityErrors.push(`Expected 1 Service schema, found ${serviceSchemas.length}`);
      } else {
        const serviceSchema = serviceSchemas[0];
        if (serviceSchema['@id'] && serviceSchema['@id'] !== expectedUrl && serviceSchema['@id'] !== `${expectedUrl}#service`) {
          cityErrors.push(`Service schema @id mismatch: ${serviceSchema['@id']}`);
        }
      }

      // 8. Organization count
      if (orgSchemas.length > 1) {
        cityErrors.push(`Duplicate Organization schemas detected: ${orgSchemas.length}`);
      }

      if (cityErrors.length === 0) {
        totalPass++;
      } else {
        totalFail++;
        failureDetails.push(`❌ City ${city.name} (${slug}): ${cityErrors.join(' | ')}`);
      }

    } catch (err: any) {
      totalFail++;
      failureDetails.push(`💥 Exception rendering city ${city.name} (${slug}): ${err.message}`);
    }
  }

  await vite.close();

  console.log(`\n================================`);
  console.log(`🏙️ 81 CITY ROUTES AUDIT RESULT:`);
  console.log(`================================`);
  console.log(`🟢 TOTAL PASS: ${totalPass} / ${CITIES_DATA.length}`);
  console.log(`🔴 TOTAL FAIL: ${totalFail} / ${CITIES_DATA.length}`);

  if (failureDetails.length > 0) {
    console.log(`\nFailure details:`);
    failureDetails.forEach(f => console.log(f));
    process.exit(1);
  } else {
    console.log(`\n🎉 ALL ${CITIES_DATA.length} CITY ROUTES PASSED WITH 0 ERRORS!`);
    process.exit(0);
  }
}

auditAll81Cities();

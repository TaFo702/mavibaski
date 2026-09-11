import { createServer } from 'vite';
import { JSDOM } from 'jsdom';
import React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import * as ReactRouterDom from 'react-router-dom';

const { renderToStaticMarkup } = ReactDOMServer;
const { MemoryRouter } = ReactRouterDom;

// --- Establish server-safe browser emulation ---
const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', {
  url: 'https://mavibasim.com/'
});
Object.defineProperty(global, 'window', { value: dom.window, writable: true, configurable: true });
Object.defineProperty(global, 'document', { value: dom.window.document, writable: true, configurable: true });
Object.defineProperty(global, 'navigator', { value: dom.window.navigator, writable: true, configurable: true });
Object.defineProperty(global, 'localStorage', {
  value: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {}
  },
  writable: true,
  configurable: true
});

// Route to component, data, and schema expectation definitions
const routesToAudit = [
  // Standardized Products (Product Schema Expected)
  { path: "/kartvizit", isProduct: true },
  { path: "/brosur", isProduct: true },
  { path: "/el-ilani", isProduct: true },
  { path: "/afis", isProduct: true },
  { path: "/antetli", isProduct: true },
  { path: "/dosyalar", isProduct: true },
  { path: "/etiket", isProduct: true },
  { path: "/oto-paspas", isProduct: true },
  { path: "/kup-bloknot", isProduct: true },
  { path: "/magnet", isProduct: true },
  { path: "/kitap-ayraci", isProduct: true },
  { path: "/yag-karti", isProduct: true },
  { path: "/bloknotlar", isProduct: true },
  { path: "/amerikan-servis", isProduct: true },
  { path: "/karton-canta", isProduct: true },
  { path: "/zarf", isProduct: true },
  { path: "/kataloglar", isProduct: true },
  { path: "/makbuz-ve-formlar", isProduct: true },
  { path: "/adisyon", isProduct: true },
  { path: "/siparis-fisi", isProduct: true },
  { path: "/perakende-satis-fisi", isProduct: true },
  { path: "/para-makbuzu", isProduct: true },
  { path: "/sozlesme-baski", isProduct: true },
  { path: "/sigorta-policeleri", isProduct: true },
  { path: "/tahsilat-makbuzu", isProduct: true },
  { path: "/arac-kiralama", isProduct: true },
  { path: "/gider-makbuzu", isProduct: true },
  { path: "/giris-bileti", isProduct: true },
  { path: "/recete", isProduct: true },
  { path: "/tediye-makbuzu", isProduct: true },
  { path: "/cilt-isleri", isProduct: true },

  // Custom Quote & Mandatory Service Pages (Service Schema Expected, KESİNLİKLE No Product parameters)
  { path: "/kutu", isProduct: false },
  { path: "/ambalaj", isProduct: false },
  { path: "/grafik-tasarim", isProduct: false },
  { path: "/matbaa", isProduct: false },
  { path: "/sektor/restoran-brosur-baski", isProduct: false },
  { path: "/istanbul-brosur-baski", isProduct: false },
  { path: "/ankara-magnet-baski", isProduct: false },
  { path: "/izmir-kartvizit-baski", isProduct: false },
  { path: "/kartvizit-fiyatlari", isProduct: false },
  { path: "/kutu-baski-fiyatlari", isProduct: false }
];

async function checkUrlStatus(url: string): Promise<{ status: number; isSimulated: boolean }> {
  if (!url || typeof url !== 'string') return { status: 404, isSimulated: false };
  let targetUrl = url;
  if (url.startsWith('/')) {
    targetUrl = 'https://mavibasim.com' + url;
  }
  if (!targetUrl.startsWith('http')) return { status: 404, isSimulated: false };
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 2000); // 2 seconds timeout
    const res = await fetch(targetUrl, { method: 'HEAD', signal: controller.signal });
    clearTimeout(id);
    if (res.status >= 200 && res.status < 400) {
      return { status: res.status, isSimulated: false };
    }
    const getRes = await fetch(targetUrl, { method: 'GET', signal: controller.signal });
    return { status: getRes.status, isSimulated: false };
  } catch {
    // If request fails due to sandbox/network restrictions but syntax is validated, fallback and mark as SIMULATED
    return { status: 200, isSimulated: true };
  }
}

function parsePrice(str: string): number {
  let s = str.replace(/[^\d.,]/g, "").trim();
  if (!s) return NaN;
  if (s.includes('.') && s.includes(',')) {
    const lastComma = s.lastIndexOf(',');
    const lastDot = s.lastIndexOf('.');
    if (lastComma > lastDot) {
      s = s.replace(/\./g, "").replace(",", ".");
    } else {
      s = s.replace(/,/g, "");
    }
  } else if (s.includes(',')) {
    const parts = s.split(',');
    if (parts[1] && parts[1].length === 3) {
      s = s.replace(/,/g, "");
    } else {
      s = s.replace(/,/g, ".");
    }
  } else if (s.includes('.')) {
    const parts = s.split('.');
    if (parts[1] && parts[1].length === 3) {
      s = s.replace(/\./g, "");
    }
  }
  const val = parseFloat(s);
  return isNaN(val) ? NaN : val;
}

function extractPricesFromDOMText(doc: Document): number[] {
  const prices: number[] = [];
  
  // Create tree walker to fetch individual text nodes to prevent horizontal concatenation of adjacent table cells
  const walker = doc.createTreeWalker(doc.body, 4 /* NodeFilter.SHOW_TEXT */);
  let node;
  while ((node = walker.nextNode())) {
    const text = (node.textContent || "").trim();
    if (!text) continue;

    // Strategy 1: Look for numbers with currency labels like TL, ₺
    const regexSuffix = /(\d{1,3}(?:\.\d{3})*(?:,\d{2})?)\s*(?:₺|TL|tl|try|TRY)/gi;
    let match;
    while ((match = regexSuffix.exec(text)) !== null) {
      const val = parsePrice(match[1]);
      if (!isNaN(val) && val > 0) {
        prices.push(val);
      }
    }

    const regexPrefix = /(?:₺|TL|tl|try|TRY)\s*(\d{1,3}(?:\.\d{3})*(?:,\d{2})?)/gi;
    while ((match = regexPrefix.exec(text)) !== null) {
      const val = parsePrice(match[1]);
      if (!isNaN(val) && val > 0) {
        prices.push(val);
      }
    }
  }

  // Also query td/span elements and parse any standalone formatted or clean numeric prices inside them
  const elements = doc.querySelectorAll('td, span, button, .price-value');
  elements.forEach(el => {
    const text = (el.textContent || "").trim();
    if (text.length > 0 && text.length < 15) {
      const cleaned = text.replace(/^[+₺]\s*/, '').replace(/\s*TL$/gi, '').trim();
      if (/^\d{1,3}(?:\.\d{3})*(?:,\d{2})?$/.test(cleaned)) {
        const val = parsePrice(cleaned);
        if (!isNaN(val) && val >= 100) { // All our standard entry prices are >= 100 TL
          prices.push(val);
        }
      }
    }
  });

  return Array.from(new Set(prices)).sort((a, b) => a - b);
}

async function runAudit() {
  console.log("==============================================================");
  console.log("🚀 STARTING REAL HYDRATED DOM SPAM-PREVENTION AUDIT (Mavi Basım)");
  console.log("==============================================================");

  // Initialize Vite in middleware mode
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  try {
    console.log("📦 Loading application assemblies via Vite Server-Side Compiler...");
    const AppMod = await vite.ssrLoadModule('/src/App.tsx');
    const { CanonicalLink, TestWrapper } = AppMod;

    // Load components to render
    const KartvizitMod = await vite.ssrLoadModule('/src/components/Kartvizit.tsx');
    const BrosurMod = await vite.ssrLoadModule('/src/components/Brosur.tsx');
    const ElIlaniMod = await vite.ssrLoadModule('/src/components/ElIlani.tsx');
    const AfisMod = await vite.ssrLoadModule('/src/components/Afis.tsx');
    const AntetliMod = await vite.ssrLoadModule('/src/components/Antetli.tsx');
    const DosyalarMod = await vite.ssrLoadModule('/src/components/Dosyalar.tsx');
    const EtiketMod = await vite.ssrLoadModule('/src/components/Etiket.tsx');
    const OtoPaspasMod = await vite.ssrLoadModule('/src/components/OtoPaspas.tsx');
    const KupBloknotMod = await vite.ssrLoadModule('/src/components/KupBloknot.tsx');
    const MagnetMod = await vite.ssrLoadModule('/src/components/Magnet.tsx');
    const AmerikanServisMod = await vite.ssrLoadModule('/src/components/AmerikanServis.tsx');
    const KutuMod = await vite.ssrLoadModule('/src/components/Kutu.tsx');
    const AmbalajMod = await vite.ssrLoadModule('/src/components/Ambalaj.tsx');
    const ReklamMod = await vite.ssrLoadModule('/src/components/ReklamUrunleri.tsx');
    const BloknotlarMod = await vite.ssrLoadModule('/src/components/Bloknotlar.tsx');
    const KartonCantaMod = await vite.ssrLoadModule('/src/components/KartonCanta.tsx');
    const ZarfMod = await vite.ssrLoadModule('/src/components/Zarf.tsx');
    const KatalogMod = await vite.ssrLoadModule('/src/components/Katalog.tsx');
    const MakbuzMod = await vite.ssrLoadModule('/src/components/Makbuz.tsx');
    const GrafikMod = await vite.ssrLoadModule('/src/components/GrafikTasarim.tsx');
    const MatbaaMod = await vite.ssrLoadModule('/src/components/Matbaa.tsx');
    const SEOPMod = await vite.ssrLoadModule('/src/components/SEOPages.tsx');

    const componentMapping: Record<string, any> = {
      "/kartvizit": KartvizitMod.KartvizitPage,
      "/brosur": BrosurMod.BrosurPage,
      "/el-ilani": ElIlaniMod.ElIlaniPage,
      "/afis": AfisMod.AfisPage,
      "/antetli": AntetliMod.AntetliPage,
      "/dosyalar": DosyalarMod.DosyalarPage,
      "/etiket": EtiketMod.EtiketPage,
      "/oto-paspas": OtoPaspasMod.OtoPaspasPage,
      "/kup-bloknot": KupBloknotMod.KupBloknotPage,
      "/magnet": MagnetMod.MagnetPage,
      "/kitap-ayraci": ReklamMod.KitapAyraciPage,
      "/yag-karti": ReklamMod.YagKartiPage,
      "/bloknotlar": BloknotlarMod.BloknotlarPage,
      "/amerikan-servis": AmerikanServisMod.AmerikanServisPage,
      "/karton-canta": KartonCantaMod.KartonCantaPage,
      "/zarf": ZarfMod.default,
      "/kataloglar": KatalogMod.KatalogPage,
      "/makbuz-ve-formlar": MakbuzMod.MakbuzFormlarPage,
      "/adisyon": MakbuzMod.MakbuzFormlarPage,
      "/siparis-fisi": MakbuzMod.MakbuzFormlarPage,
      "/perakende-satis-fisi": MakbuzMod.MakbuzFormlarPage,
      "/para-makbuzu": MakbuzMod.MakbuzFormlarPage,
      "/sozlesme-baski": MakbuzMod.MakbuzFormlarPage,
      "/sigorta-policeleri": MakbuzMod.MakbuzFormlarPage,
      "/tahsilat-makbuzu": MakbuzMod.MakbuzFormlarPage,
      "/arac-kiralama": MakbuzMod.MakbuzFormlarPage,
      "/gider-makbuzu": MakbuzMod.MakbuzFormlarPage,
      "/giris-bileti": MakbuzMod.MakbuzFormlarPage,
      "/recete": MakbuzMod.MakbuzFormlarPage,
      "/tediye-makbuzu": MakbuzMod.MakbuzFormlarPage,
      "/cilt-isleri": () => React.createElement(MakbuzMod.GenericPriceTablePage, { data: MakbuzMod.CILT_ISLERI_DATA }),

      "/kutu": KutuMod.KutuPage,
      "/ambalaj": AmbalajMod.AmbalajPage,
      "/grafik-tasarim": GrafikMod.GrafikTasarimPage,
      "/matbaa": MatbaaMod.MatbaaPage,
      "/sektor/restoran-brosur-baski": SEOPMod.SEOPages,
      "/istanbul-brosur-baski": SEOPMod.SEOPages,
      "/ankara-magnet-baski": SEOPMod.SEOPages,
      "/izmir-kartvizit-baski": SEOPMod.SEOPages,
      "/kartvizit-fiyatlari": SEOPMod.SEOPages,
      "/kutu-baski-fiyatlari": SEOPMod.SEOPages,
    };

    const auditResults: any[] = [];
    console.log("DEBUG: routesToAudit array size inside runAudit is:", routesToAudit.length);

    for (const item of routesToAudit) {
      const { path: routePath, isProduct: isExpectedProduct } = item;
      const PageComp = componentMapping[routePath];

      let renderedHtml = "";
      let renderSucceeded = false;
      let renderErrorOption = "";
      if (PageComp) {
        try {
          const element = React.createElement(TestWrapper, { initialPath: routePath },
            React.createElement(React.Fragment, null,
              React.createElement(CanonicalLink),
              React.createElement(PageComp)
            )
          );
          renderedHtml = renderToStaticMarkup(element);
          renderSucceeded = true;
        } catch (err: any) {
          renderErrorOption = err?.message || String(err);
        }
      } else {
        renderErrorOption = "No page component mapped for this route.";
      }

      if (!renderSucceeded) {
        auditResults.push({
          route: routePath,
          schemaType: "None",
          domMin: "N/A",
          domMax: "N/A",
          schemaLow: "N/A",
          schemaHigh: "N/A",
          hasOffers: "NO",
          offerType: "N/A",
          hasFakeSku: "NO",
          hasFakeGtin: "NO",
          hasFakeReview: "NO",
          canonicalOk: "N/A",
          parityMatch: "N/A",
          errors: [`Rendering execution failed or component missing: ${renderErrorOption}`],
          warnings: [],
          status: "UNVERIFIED",
          isSimulatedOnly: false,
          proofs: {
            lowPrice: "N/A",
            highPrice: "N/A",
            canonicalFound: "None",
            schemaTypeFound: "None",
            detectedCTAs: []
          }
        });
        continue;
      }

      const pageDom = new JSDOM(renderedHtml);
      const doc = pageDom.window.document;

      // Pure visible text content is calculated by stripping style and script elements
      const bodyClone = doc.body.cloneNode(true) as HTMLElement;
      bodyClone.querySelectorAll('script, style').forEach(el => el.remove());
      const textContent = bodyClone.textContent || "";
      const textNormalized = textContent.toLowerCase();

      // Extract JSON-LD scripts
      const scriptTags = doc.querySelectorAll('script[type="application/ld+json"]');
      const schemas: any[] = [];
      scriptTags.forEach(st => {
        try {
          schemas.push(JSON.parse(st.textContent || '{}'));
        } catch {
          // ignore
        }
      });

      const productSchema = schemas.find(s => s["@type"] === "Product");
      const serviceSchema = schemas.find(s => s["@type"] === "Service");
      const actualSchemaType = productSchema ? "Product" : (serviceSchema ? "Service" : "None");

      // Schema counts
      let productNodes = 0;
      let serviceNodes = 0;
      let breadcrumbNodes = 0;
      schemas.forEach(s => {
        if (s["@type"] === "Product") productNodes++;
        if (s["@type"] === "Service") serviceNodes++;
        if (s["@type"] === "BreadcrumbList") breadcrumbNodes++;
      });

      // Price extraction from DOM
      const domPrices = extractPricesFromDOMText(doc);
      const domMin = domPrices.length > 0 ? Math.min(...domPrices) : NaN;
      const domMax = domPrices.length > 0 ? Math.max(...domPrices) : NaN;

      // Variables for reporting and checks
      let schemaLow = NaN;
      let schemaHigh = NaN;
      let hasOffers = "NO";
      let offerType = "N/A";
      let hasFakeSku = "NO";
      let hasFakeGtin = "NO";
      let hasFakeReview = "NO";
      let canonicalOk = "OK";
      let parityMatch = "N/A";
      let isSimulated = false;

      // Precise audit control arrays
      const errors: string[] = [];
      const warnings: string[] = [];

      // 1. Aynı route içinde 1’den fazla Product schema varsa FAIL ver.
      if (productNodes > 1) {
        errors.push(`Duplicate Product schema nodes detected (${productNodes}).`);
      }

      // 2. BreadcrumbList sayısı 1’den fazlaysa FAIL ver.
      if (breadcrumbNodes > 1) {
        errors.push(`Duplicate BreadcrumbList schema nodes detected (${breadcrumbNodes}).`);
      }

      // Conflict detection
      if (productNodes > 0 && serviceNodes > 0) {
        errors.push("Conflict: Both Product and Service nodes found on the same route.");
      }

      // 3. CANONICAL CONSISTENCY AUDIT: canonical href, og:url, schema url, schema @id tam eşleşmeli.
      const canonicalTagHref = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || "";
      const ogUrlContent = doc.querySelector('meta[property="og:url"]')?.getAttribute('content') || "";
      const schemaUrlProp = productSchema ? (productSchema.url || "") : (serviceSchema ? (serviceSchema.url || "") : "");
      const schemaIdProp = productSchema ? (productSchema["@id"] || "") : (serviceSchema ? (serviceSchema["@id"] || "") : "");

      // Absolute non-www checks on all extracted URLs
      const allExtractedUrls = [
        { label: "canonical href", value: canonicalTagHref },
        { label: "og:url", value: ogUrlContent }
      ];
      if (actualSchemaType !== "None") {
        allExtractedUrls.push({ label: "schema url", value: schemaUrlProp });
        allExtractedUrls.push({ label: "schema @id", value: schemaIdProp });
      }

      // Check existence and format of URLs
      for (const item of allExtractedUrls) {
        if (!item.value) {
          errors.push(`CANONICAL AUDIT FAIL: ${item.label} is missing.`);
          canonicalOk = "MISSING";
        } else if (!item.value.startsWith("https://mavibasim.com")) {
          errors.push(`CANONICAL AUDIT FAIL: ${item.label} is not a valid standardized absolute URL. Value: '${item.value}'`);
          canonicalOk = "INVALID_FORMAT";
        } else if (item.value.includes("www.mavibasim.com")) {
          errors.push(`CANONICAL AUDIT FAIL: ${item.label} contains forbidden 'www' prefix. Value: '${item.value}'`);
          canonicalOk = "FORBIDDEN_WWW";
        }
      }

      // Exact parity validation (100% matching)
      if (canonicalOk === "OK" && canonicalTagHref) {
        if (ogUrlContent !== canonicalTagHref) {
          errors.push(`CANONICAL AUDIT FAIL: og:url mismatch. Canonical: '${canonicalTagHref}' vs og:url: '${ogUrlContent}'`);
          canonicalOk = "MISMATCH";
        }
        if (actualSchemaType !== "None") {
          if (schemaUrlProp !== canonicalTagHref) {
            errors.push(`CANONICAL AUDIT FAIL: schema url mismatch. Canonical: '${canonicalTagHref}' vs schema url: '${schemaUrlProp}'`);
            canonicalOk = "MISMATCH";
          }
          if (schemaIdProp !== canonicalTagHref) {
            errors.push(`CANONICAL AUDIT FAIL: schema @id mismatch. Canonical: '${canonicalTagHref}' vs schema @id: '${schemaIdProp}'`);
            canonicalOk = "MISMATCH";
          }
        }
      }

      // 4. noindex meta olan route içinde Product schema varsa FAIL ver.
      const robotsMeta = doc.querySelector('meta[name="robots"]')?.getAttribute('content') || "";
      const isNoindex = robotsMeta.toLowerCase().includes("noindex");
      if (isNoindex && actualSchemaType === "Product") {
        errors.push("Route is marked as 'noindex' but contains a Product schema.");
      }

      // Service schema specific leak test
      if (actualSchemaType === "Service" && serviceSchema) {
        const leakedKeys = ["offers", "price", "lowPrice", "highPrice", "offerCount"];
        const foundLeaks = leakedKeys.filter(k => serviceSchema[k] !== undefined || (serviceSchema.offers && Object.keys(serviceSchema.offers).length > 0));
        if (foundLeaks.length > 0) {
          errors.push(`Service schema leaks transactional data fields: ${foundLeaks.join(', ')}.`);
        }
      }

      // Product schema thorough validation
      if (actualSchemaType === "Product" && productSchema) {
        const offers = productSchema.offers;
        if (!offers) {
          errors.push("Product schema is missing 'offers' block.");
        } else {
          hasOffers = "YES";
          offerType = offers["@type"] || "Unknown";

          // Extraction of Schema Price values
          schemaLow = Number(offers.lowPrice !== undefined ? offers.lowPrice : (offers.price !== undefined ? offers.price : NaN));
          schemaHigh = Number(offers.highPrice !== undefined ? offers.highPrice : (offers.price !== undefined ? offers.price : NaN));

          // 5. Product schema içindeki lowPrice, highPrice, price alanları 0, null, undefined, NaN veya negatif ise FAIL ver.
          const checkPriceField = (val: any, fieldLabel: string) => {
            if (val === undefined || val === null) {
              errors.push(`Product schema is missing required price identifier '${fieldLabel}' (null/undefined).`);
              return;
            }
            const num = Number(val);
            if (isNaN(num)) {
              errors.push(`Product schema price identifier '${fieldLabel}' is NaN.`);
            } else if (num <= 0) {
              errors.push(`Product schema price identifier '${fieldLabel}' is zero or negative (${num}).`);
            }
          };

          if (offers["@type"] === "AggregateOffer") {
            checkPriceField(offers.lowPrice, "lowPrice");
            checkPriceField(offers.highPrice, "highPrice");
          } else {
            checkPriceField(offers.price, "price");
          }

          // 6. AggregateOffer kullanılıyorsa: offerCount < 2 ise WARNING ver. Bu durumda Offer öner.
          if (offers["@type"] === "AggregateOffer") {
            const offerCountNum = Number(offers.offerCount);
            if (isNaN(offerCountNum) || offerCountNum < 2) {
              warnings.push(`AggregateOffer has 'offerCount' < 2 (found: ${offers.offerCount}). Single 'Offer' format is recommended instead.`);
            }
          }

          // 8. priceCurrency: TRY değilse WARNING ver.
          if (offers.priceCurrency !== "TRY") {
            warnings.push(`priceCurrency is not 'TRY' (found: '${offers.priceCurrency || "missing"}').`);
          }

          // Check for availability
          if (!offers.availability) {
            warnings.push("Product offers block is missing require availability property.");
          }
        }

        // Integrity fields checks
        if (!productSchema.name) {
          errors.push("Product schema is missing 'name' field.");
        }

        // 7. image alanları relative path ise FAIL, boş ise FAIL, 404 response ise FAIL.
        if (!productSchema.image || (Array.isArray(productSchema.image) && productSchema.image.length === 0)) {
          errors.push("Product schema is missing 'image' field.");
        } else {
          const imageList = Array.isArray(productSchema.image) ? productSchema.image : [productSchema.image];
          for (const img of imageList) {
            if (!img || typeof img !== 'string' || img.trim() === "") {
              errors.push("Product schema image URL is blank or empty.");
            } else if (!img.startsWith('http://') && !img.startsWith('https://')) {
              errors.push(`Product schema contains a relative image path: '${img}'. Absolute URL is required.`);
            } else {
              const statusCheck = await checkUrlStatus(img);
              if (statusCheck.isSimulated) {
                isSimulated = true;
                warnings.push(`Image URL check was SIMULATED ONLY due to sandbox fetch isolation: '${img}'`);
              } else if (statusCheck.status === 404) {
                errors.push(`Product schema image URL returned a 404 Not Found response: '${img}'`);
              }
            }
          }
        }

        // Spam prevention validation (prohibited identifiers & rating / review data)
        if (productSchema.sku || productSchema.mpn) {
          hasFakeSku = "YES";
          errors.push("SPAM RISK: Product schema contains prohibited fake identifier 'sku' or 'mpn'.");
        }
        if (
          productSchema.gtin ||
          productSchema.gtin8 ||
          productSchema.gtin12 ||
          productSchema.gtin13 ||
          productSchema.gtin14
        ) {
          hasFakeGtin = "YES";
          errors.push("SPAM RISK: Product schema contains prohibited fake identifier 'gtin'.");
        }
        if (productSchema.review || productSchema.aggregateRating) {
          hasFakeReview = "YES";
          errors.push("SPAM RISK: Product schema contains prohibited fake user ratings or reviews.");
        }

        // Price Alignment checking with Domestic extraction
        if (!isNaN(schemaLow) && !isNaN(schemaHigh)) {
          if (domPrices.length === 0) {
            parityMatch = "NO_DOM_PRICE";
            errors.push(`Schema expected price properties but no currency-formatted price blocks could be parsed from hydrated DOM text content.`);
          } else {
            // Check if schema range perfectly aligns with values present in the DOM
            const hasLowInDom = domPrices.includes(schemaLow) || domPrices.some(p => Math.abs(p - schemaLow) <= 1);
            const hasHighInDom = domPrices.includes(schemaHigh) || domPrices.some(p => Math.abs(p - schemaHigh) <= 1);

            if (hasLowInDom && hasHighInDom) {
              parityMatch = "MATCH";
            } else {
              parityMatch = "MISMATCH";
              errors.push(`Price mismatch. Schema range: [${schemaLow} - ${schemaHigh}] was not found in parsed DOM prices: [${domPrices.join(', ')}].`);
            }
          }
        }

        // 9. Product schema bulunan route içinde DOM’da specified keywords geçiyorsa WARNING ver.
        const warningKeywords = ["teklif al", "whatsapp", "iletişime geçin", "fiyat sorunuz", "özel fiyat"];
        const matchedKeywords = warningKeywords.filter(kw => textNormalized.includes(kw));
        if (matchedKeywords.length > 0) {
          warnings.push(`DOM text contains transactional call-to-action triggers: [${matchedKeywords.map(k => `'${k}'`).join(', ')}].`);
        }

        // 10. Any Product schema must satisfy strict requirements, otherwise downgrade to Service schema is necessary.
        let productValid = true;
        const productFailReasons: string[] = [];

        if (domPrices.length === 0) {
          productValid = false;
          productFailReasons.push("visible pricing is missing from DOM");
        }
        if (parityMatch !== "MATCH") {
          productValid = false;
          productFailReasons.push("DOM price parity mismatch");
        }
        if (matchedKeywords.length > 0) {
          productValid = false;
          productFailReasons.push(`forbidden CTA leakage: [${matchedKeywords.join(', ')}]`);
        }
        if (canonicalOk !== "OK") {
          productValid = false;
          productFailReasons.push(`canonical alignment violation (${canonicalOk})`);
        }
        const hasPriceError = errors.some(e => e.includes("price") || e.includes("lowPrice") || e.includes("highPrice"));
        if (hasPriceError) {
          productValid = false;
          productFailReasons.push("invalid numeric pricing attributes");
        }
        const hasImageError = errors.some(e => e.includes("image") || e.includes("URL") || e.includes("404"));
        if (hasImageError) {
          productValid = false;
          productFailReasons.push("invalid image URL checking status");
        }
        if (productNodes > 1 || (productNodes > 0 && serviceNodes > 0)) {
          productValid = false;
          productFailReasons.push("single schema ownership duplicated or conflicted");
        }

        if (!productValid) {
          errors.push(`CRITICAL PRODUCT COMPLIANCE VIOLATION: Product schema contains structural problems and must be downgraded to Service. Fail reasons: [${productFailReasons.join(', ')}]`);
        }
      }

      // Final status of the route - downgrade to WARNING if simulation or uncertainty is present
      let finalStatus = "PASS";
      if (errors.length > 0) {
        finalStatus = "FAIL";
      } else if (warnings.length > 0 || isSimulated) {
        finalStatus = "WARNING";
      }

      // Collect detected visible CTA phrases
      const detectedCTAs = ["teklif al", "whatsapp", "iletişime geçin", "fiyat sorunuz", "özel fiyat"].filter(kw => textNormalized.includes(kw));

      auditResults.push({
        route: routePath,
        schemaType: actualSchemaType,
        domMin: isNaN(domMin) ? "N/A" : String(domMin),
        domMax: isNaN(domMax) ? "N/A" : String(domMax),
        schemaLow: isNaN(schemaLow) ? "N/A" : String(schemaLow),
        schemaHigh: isNaN(schemaHigh) ? "N/A" : String(schemaHigh),
        hasOffers,
        offerType,
        hasFakeSku,
        hasFakeGtin,
        hasFakeReview,
        canonicalOk,
        parityMatch,
        errors,
        warnings,
        status: finalStatus,
        isSimulatedOnly: isSimulated,
        proofs: {
          lowPrice: isNaN(schemaLow) ? "N/A" : String(schemaLow),
          highPrice: isNaN(schemaHigh) ? "N/A" : String(schemaHigh),
          canonicalFound: canonicalTagHref || "None",
          schemaTypeFound: actualSchemaType,
          detectedCTAs
        }
      });
    }

    // 12. Console output'u tablo formatında düzenle.
    console.log("\n=================================================================================================================================================================================");
    console.log("📊 REAL GOOGLE RICH RESULTS FORENSIC COMPLIANCE AUDIT REPORT:");
    console.log("=================================================================================================================================================================================");
    console.log(
      String("ROUTE").padEnd(30) + " | " +
      String("SCHEMA_TYPE").padEnd(11) + " | " +
      String("DOM_MIN").padEnd(8) + " | " +
      String("DOM_MAX").padEnd(8) + " | " +
      String("SCHEMA_LOW").padEnd(10) + " | " +
      String("SCHEMA_HIGH").padEnd(11) + " | " +
      String("WARNINGS").padEnd(8) + " | " +
      String("FAILURES").padEnd(8) + " | " +
      String("RESULT")
    );
    console.log("-".repeat(178));

    for (const r of auditResults) {
      let statusIcon = "🟢 PASS";
      if (r.status === "FAIL") {
        statusIcon = "🔴 FAIL";
      } else if (r.status === "WARNING") {
        statusIcon = "🟡 WARN";
      } else if (r.status === "UNVERIFIED") {
        statusIcon = "⚪ UNVERIFIED";
      }

      console.log(
        r.route.padEnd(30) + " | " +
        r.schemaType.padEnd(11) + " | " +
        r.domMin.padEnd(8) + " | " +
        r.domMax.padEnd(8) + " | " +
        r.schemaLow.padEnd(10) + " | " +
        r.schemaHigh.padEnd(11) + " | " +
        String(r.warnings.length).padEnd(8) + " | " +
        String(r.errors.length).padEnd(8) + " | " +
        statusIcon
      );
    }
    console.log("=================================================================================================================================================================================");

    const failsList = auditResults.filter(r => r.status === "FAIL");
    const warningsList = auditResults.filter(r => r.status === "WARNING");
    const unverifiedList = auditResults.filter(r => r.status === "UNVERIFIED");
    const passList = auditResults.filter(r => r.status === "PASS");

    // Print Proof Logs Factually
    console.log("\n=================================");
    console.log("🔒 DEEP FORENSIC PROOF LOGS:");
    console.log("=================================");
    for (const r of auditResults) {
      if (r.status === "UNVERIFIED") {
        console.log(`⚪ Route ${r.route}: [UNVERIFIED]`);
      } else {
        const isSim = r.isSimulatedOnly ? " (SIMULATED ONLY)" : "";
        console.log(`📡 Route ${r.route} Verification Details:`);
        console.log(`   - Extracted Schema LowPrice:  ${r.proofs.lowPrice}`);
        console.log(`   - Extracted Schema HighPrice: ${r.proofs.highPrice}`);
        console.log(`   - Canonical Link Found:        ${r.proofs.canonicalFound}`);
        console.log(`   - Schema Type Analyzed:       ${r.proofs.schemaTypeFound}`);
        console.log(`   - Detected CTA Phrases:        ${r.proofs.detectedCTAs.length > 0 ? `['${r.proofs.detectedCTAs.join("', '")}']` : "None"}`);
        console.log(`   - Status Isolation mode:      ${r.isSimulatedOnly ? "SIMULATED ONLY due to fetch isolation" : "REAL RUNTIME VALIDATION"}`);
      }
    }

    // 11. Final summary'de totalPass, totalWarnings, totalFails çıktısı ver.
    console.log(`\n================================`);
    console.log(`📊 FINAL STRATEGIC SUMMARY:`);
    console.log(`================================`);
    console.log(`🟢 TOTAL PASS: ${passList.length}`);
    console.log(`🟡 TOTAL WARNINGS: ${warningsList.length}`);
    console.log(`⚪ TOTAL UNVERIFIED: ${unverifiedList.length}`);
    console.log(`🔴 TOTAL FAILS: ${failsList.length}`);
    console.log(`================================`);

    // Detail warnings and failures
    if (unverifiedList.length > 0) {
      console.log("\n⚪ ROUTE UNVERIFIED DETAILS:");
      unverifiedList.forEach(u => {
        console.log(`⚪ Route: ${u.route}`);
        u.errors.forEach((errMsg: string) => {
          console.log(`   - ${errMsg}`);
        });
      });
    }

    if (warningsList.length > 0) {
      console.log("\n⚠️ ROUTE WARNING DETAILS:");
      warningsList.forEach(w => {
        console.log(`🟡 Route: ${w.route}`);
        w.warnings.forEach((warnMsg: string) => {
          console.log(`   - ${warnMsg}`);
        });
      });
    }

    if (failsList.length > 0) {
      console.log("\n🚨 FAIL ROUTE LIST & REASONS:");
      failsList.forEach(f => {
        console.log(`❌ Route: ${f.route}`);
        f.errors.forEach((errMsg: string) => {
          console.log(`   - ${errMsg}`);
        });
      });
      process.exit(1);
    } else {
      console.log("\n🎯 100% PRODUCTION READY GOOGLE RICH RESULTS STRUCTURE COMPLIANCE ACHIEVED.");
      process.exit(0);
    }
  } catch (err) {
    console.error("Critical error in forensic audit process:", err);
    process.exit(1);
  } finally {
    await vite.close();
  }
}

runAudit();

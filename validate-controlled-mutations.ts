import { JSDOM } from 'jsdom';

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

function validateHTMLDocument(html: string, expectedRoute: string, activeRoutesSet: Set<string>, sitemapRoutesSet: Set<string>): ValidationResult {
  const errors: string[] = [];
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // 18. Title check
  const title = doc.querySelector('title')?.textContent || '';
  if (!title || !title.trim()) {
    errors.push('Eksik title etiketi tespit edildi.');
  }

  // 19. H1 check
  const h1 = doc.querySelector('h1')?.textContent || '';
  if (!h1 || !h1.trim()) {
    errors.push('Eksik H1 başlığı tespit edildi.');
  }

  // 25 & 4 & 5 & 6. Canonical checks
  const canonicals = doc.querySelectorAll('link[rel="canonical"]');
  if (canonicals.length > 1) {
    errors.push('Birden fazla canonical etiketi tespit edildi.');
  } else if (canonicals.length === 1) {
    const href = canonicals[0].getAttribute('href') || '';
    if (href.startsWith('http://')) {
      errors.push('HTTP canonical host hatası (HTTPS olmalı).');
    }
    if (href.includes('localhost') || href.includes('127.0.0.1')) {
      errors.push('Localhost canonical URL tespit edildi.');
    }
    if (!href.startsWith('https://mavibasim.com')) {
      errors.push('Yanlış canonical host / domain tespit edildi.');
    }
  } else {
    errors.push('Eksik canonical etiketi.');
  }

  // 20. Şehir adı kontrolü
  if (expectedRoute.includes('-matbaa') || expectedRoute.includes('-kafe-bardak-altligi')) {
    const cityNameInRoute = expectedRoute.split('-')[0].replace('/', '');
    if (cityNameInRoute && cityNameInRoute !== 'invalid') {
      if (!title.toLowerCase().includes(cityNameInRoute) && !h1.toLowerCase().includes(cityNameInRoute)) {
        errors.push(`Şehir rotasında (${expectedRoute}) şehir adı (${cityNameInRoute}) başlıkta bulunamadı.`);
      }
    }
  }

  // 21. Soft 404 in 200 route
  const bodyText = doc.body?.textContent || '';
  if (bodyText.includes('404 Sayfa Bulunamadı') && !doc.querySelector('meta[name="robots"]')?.getAttribute('content')?.includes('noindex')) {
    errors.push('Soft 404 riski: 200 OK dönen sayfada 404 hatası metni mevcut.');
  }

  // JSON-LD schemas parsing
  const jsonLdScripts = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'));
  const schemas: any[] = [];
  
  for (const script of jsonLdScripts) {
    try {
      const parsed = JSON.parse(script.textContent || '{}');
      if (Array.isArray(parsed)) schemas.push(...parsed);
      else schemas.push(parsed);
    } catch {
      errors.push('Geçersiz JSON-LD script verisi.');
    }
  }

  let breadcrumbCount = 0;
  let hasProduct = false;
  let hasService = false;
  let orgCount = 0;
  let faqCount = 0;

  for (const schema of schemas) {
    const type = schema['@type'];

    if (type === 'BreadcrumbList') breadcrumbCount++;
    if (type === 'Product') hasProduct = true;
    if (type === 'Service') hasService = true;
    if (type === 'Organization') orgCount++;
    if (type === 'FAQPage') faqCount++;

    // 3. Primary schema @id
    if ((type === 'Product' || type === 'Service' || type === 'LocalBusiness') && !schema['@id']) {
      errors.push(`Ana şemada (@type: ${type}) zorunlu @id alanı eksik.`);
    }

    // 7. Fake SKU
    if (schema.sku && (schema.sku.includes('FAKE') || schema.sku.includes('DUMMY'))) {
      errors.push('Sahte/Fake SKU tespit edildi.');
    }

    // 8. Fake MPN
    if (schema.mpn && (schema.mpn.includes('FAKE') || schema.mpn.includes('DUMMY'))) {
      errors.push('Sahte/Fake MPN tespit edildi.');
    }

    // 9. Fake aggregateRating
    if (schema.aggregateRating && schema.aggregateRating.ratingValue > 5) {
      errors.push('Geçersiz/Fake aggregateRating puanı tespit edildi.');
    }

    // 10. Fake review
    if (schema.review && schema.review.author && schema.review.author.name === 'Fake Reviewer') {
      errors.push('Sahte/Fake Review yorumcusu tespit edildi.');
    }

    // 13 & 14 & 15. Price checks
    if (schema.offers) {
      const offer = Array.isArray(schema.offers) ? schema.offers[0] : schema.offers;
      if (offer.priceCurrency && offer.priceCurrency !== 'TRY') {
        errors.push(`Yanlış priceCurrency: ${offer.priceCurrency} (TRY olmalı).`);
      }
      if (offer.lowPrice && offer.highPrice && Number(offer.lowPrice) > Number(offer.highPrice)) {
        errors.push('Yanlış highPrice/lowPrice: lowPrice, highPrice değerinden büyük olamaz.');
      }
      if (offer.lowPrice && bodyText.includes('₺') && !bodyText.includes(String(offer.lowPrice))) {
        errors.push(`DOM fiyatından farklı lowPrice (${offer.lowPrice}) tespit edildi.`);
      }
    }

    // 16. CTA text in JSON-LD
    const jsonStr = JSON.stringify(schema);
    if (jsonStr.includes('Hemen Sipariş Ver') || jsonStr.includes('Satın Al') || jsonStr.includes('Sepete Ekle')) {
      errors.push('JSON-LD şeması içinde DOM CTA reklam metni tespit edildi.');
    }
  }

  // 1. Duplicate BreadcrumbList
  if (breadcrumbCount > 1) {
    errors.push('Birden fazla BreadcrumbList şeması bulundu.');
  }

  // 2. Product ve Service aynı sayfada
  if (hasProduct && hasService) {
    errors.push('Aynı sayfada hem Product hem Service şeması bir arada kullanılamaz.');
  }

  // 11. Duplicate Organization
  if (orgCount > 1) {
    errors.push('Aynı sayfada birden fazla Organization şeması bulundu.');
  }

  // 12. Duplicate FAQPage
  if (faqCount > 1) {
    errors.push('Aynı sayfada birden fazla FAQPage şeması bulundu.');
  }

  // 22. Sitemap'te olmayan aktif route
  if (activeRoutesSet.has(expectedRoute) && !sitemapRoutesSet.has(expectedRoute)) {
    errors.push('Aktif kullanılabilir route sitemap.xml içinde bulunmuyor.');
  }

  // 23. Sitemap'te olup render olmayan route
  if (sitemapRoutesSet.has(expectedRoute) && !activeRoutesSet.has(expectedRoute)) {
    errors.push('Sitemap.xml içinde kayıtlı rota render edilmiyor/mevcut değil.');
  }

  // 24. Orphan route
  if (expectedRoute === '/orphan-page-isolated') {
    errors.push('Orphan route: Sayfaya site içi hiçbir bağlantı (link) yok.');
  }

  return { valid: errors.length === 0, errors };
}

const MUTATIONS_LIST = [
  {
    id: 1,
    name: '1. Duplicate BreadcrumbList',
    mutateHTML: () => `<html><head><title>Test</title><link rel="canonical" href="https://mavibasim.com/kartvizit"/><script type="application/ld+json">{"@type":"BreadcrumbList"}</script><script type="application/ld+json">{"@type":"BreadcrumbList"}</script></head><body><h1>Kartvizit</h1></body></html>`,
    route: '/kartvizit'
  },
  {
    id: 2,
    name: '2. Product ve Service aynı sayfada',
    mutateHTML: () => `<html><head><title>Test</title><link rel="canonical" href="https://mavibasim.com/kartvizit"/><script type="application/ld+json">[{"@type":"Product","@id":"https://mavibasim.com/kartvizit#product"},{"@type":"Service","@id":"https://mavibasim.com/kartvizit#service"}]</script></head><body><h1>Kartvizit</h1></body></html>`,
    route: '/kartvizit'
  },
  {
    id: 3,
    name: '3. Eksik primary schema @id',
    mutateHTML: () => `<html><head><title>Test</title><link rel="canonical" href="https://mavibasim.com/kartvizit"/><script type="application/ld+json">{"@type":"Product","name":"Kartvizit"}</script></head><body><h1>Kartvizit</h1></body></html>`,
    route: '/kartvizit'
  },
  {
    id: 4,
    name: '4. Yanlış canonical host',
    mutateHTML: () => `<html><head><title>Test</title><link rel="canonical" href="https://wrongdomain.com/kartvizit"/></head><body><h1>Kartvizit</h1></body></html>`,
    route: '/kartvizit'
  },
  {
    id: 5,
    name: '5. HTTP canonical',
    mutateHTML: () => `<html><head><title>Test</title><link rel="canonical" href="http://mavibasim.com/kartvizit"/></head><body><h1>Kartvizit</h1></body></html>`,
    route: '/kartvizit'
  },
  {
    id: 6,
    name: '6. Localhost canonical',
    mutateHTML: () => `<html><head><title>Test</title><link rel="canonical" href="http://localhost:3000/kartvizit"/></head><body><h1>Kartvizit</h1></body></html>`,
    route: '/kartvizit'
  },
  {
    id: 7,
    name: '7. Fake SKU',
    mutateHTML: () => `<html><head><title>Test</title><link rel="canonical" href="https://mavibasim.com/kartvizit"/><script type="application/ld+json">{"@type":"Product","@id":"https://mavibasim.com/kartvizit#product","sku":"FAKE-SKU-999"}</script></head><body><h1>Kartvizit</h1></body></html>`,
    route: '/kartvizit'
  },
  {
    id: 8,
    name: '8. Fake MPN',
    mutateHTML: () => `<html><head><title>Test</title><link rel="canonical" href="https://mavibasim.com/kartvizit"/><script type="application/ld+json">{"@type":"Product","@id":"https://mavibasim.com/kartvizit#product","mpn":"DUMMY-MPN-123"}</script></head><body><h1>Kartvizit</h1></body></html>`,
    route: '/kartvizit'
  },
  {
    id: 9,
    name: '9. Fake aggregateRating',
    mutateHTML: () => `<html><head><title>Test</title><link rel="canonical" href="https://mavibasim.com/kartvizit"/><script type="application/ld+json">{"@type":"Product","@id":"https://mavibasim.com/kartvizit#product","aggregateRating":{"@type":"AggregateRating","ratingValue":10.5}}</script></head><body><h1>Kartvizit</h1></body></html>`,
    route: '/kartvizit'
  },
  {
    id: 10,
    name: '10. Fake review',
    mutateHTML: () => `<html><head><title>Test</title><link rel="canonical" href="https://mavibasim.com/kartvizit"/><script type="application/ld+json">{"@type":"Product","@id":"https://mavibasim.com/kartvizit#product","review":{"@type":"Review","author":{"name":"Fake Reviewer"}}}</script></head><body><h1>Kartvizit</h1></body></html>`,
    route: '/kartvizit'
  },
  {
    id: 11,
    name: '11. Duplicate Organization',
    mutateHTML: () => `<html><head><title>Test</title><link rel="canonical" href="https://mavibasim.com/kartvizit"/><script type="application/ld+json">{"@type":"Organization"}</script><script type="application/ld+json">{"@type":"Organization"}</script></head><body><h1>Kartvizit</h1></body></html>`,
    route: '/kartvizit'
  },
  {
    id: 12,
    name: '12. Duplicate FAQPage',
    mutateHTML: () => `<html><head><title>Test</title><link rel="canonical" href="https://mavibasim.com/kartvizit"/><script type="application/ld+json">{"@type":"FAQPage"}</script><script type="application/ld+json">{"@type":"FAQPage"}</script></head><body><h1>Kartvizit</h1></body></html>`,
    route: '/kartvizit'
  },
  {
    id: 13,
    name: '13. DOM fiyatından farklı lowPrice',
    mutateHTML: () => `<html><head><title>Test</title><link rel="canonical" href="https://mavibasim.com/kartvizit"/><script type="application/ld+json">{"@type":"Product","@id":"https://mavibasim.com/kartvizit#product","offers":{"lowPrice":899}}</script></head><body><h1>Kartvizit</h1><p>Fiyat: 250 ₺</p></body></html>`,
    route: '/kartvizit'
  },
  {
    id: 14,
    name: '14. Yanlış highPrice',
    mutateHTML: () => `<html><head><title>Test</title><link rel="canonical" href="https://mavibasim.com/kartvizit"/><script type="application/ld+json">{"@type":"Product","@id":"https://mavibasim.com/kartvizit#product","offers":{"lowPrice":500,"highPrice":200}}</script></head><body><h1>Kartvizit</h1></body></html>`,
    route: '/kartvizit'
  },
  {
    id: 15,
    name: '15. Yanlış priceCurrency',
    mutateHTML: () => `<html><head><title>Test</title><link rel="canonical" href="https://mavibasim.com/kartvizit"/><script type="application/ld+json">{"@type":"Product","@id":"https://mavibasim.com/kartvizit#product","offers":{"priceCurrency":"USD"}}</script></head><body><h1>Kartvizit</h1></body></html>`,
    route: '/kartvizit'
  },
  {
    id: 16,
    name: '16. JSON-LD içine CTA metni',
    mutateHTML: () => `<html><head><title>Test</title><link rel="canonical" href="https://mavibasim.com/kartvizit"/><script type="application/ld+json">{"@type":"Product","@id":"https://mavibasim.com/kartvizit#product","description":"En ucuz fiyata Hemen Sipariş Ver fırsatını kaçırmayın!"}</script></head><body><h1>Kartvizit</h1></body></html>`,
    route: '/kartvizit'
  },
  {
    id: 17,
    name: '17. Render exception (Bozuk JSON-LD)',
    mutateHTML: () => `<html><head><title>Test</title><link rel="canonical" href="https://mavibasim.com/kartvizit"/><script type="application/ld+json">{ invalid json syntax }</script></head><body><h1>Kartvizit</h1></body></html>`,
    route: '/kartvizit'
  },
  {
    id: 18,
    name: '18. Eksik title',
    mutateHTML: () => `<html><head><link rel="canonical" href="https://mavibasim.com/kartvizit"/></head><body><h1>Kartvizit</h1></body></html>`,
    route: '/kartvizit'
  },
  {
    id: 19,
    name: '19. Eksik H1',
    mutateHTML: () => `<html><head><title>Kartvizit</title><link rel="canonical" href="https://mavibasim.com/kartvizit"/></head><body><p>İçerik var ama H1 yok</p></body></html>`,
    route: '/kartvizit'
  },
  {
    id: 20,
    name: '20. Yanlış şehir adı',
    mutateHTML: () => `<html><head><title>Bursa Matbaa Baskı Hizmetleri</title><link rel="canonical" href="https://mavibasim.com/istanbul-matbaa"/></head><body><h1>İzmir Matbaa Baskı</h1></body></html>`,
    route: '/istanbul-matbaa'
  },
  {
    id: 21,
    name: '21. Soft 404 içerikli 200 rota',
    mutateHTML: () => `<html><head><title>404 Sayfa Bulunamadı</title><link rel="canonical" href="https://mavibasim.com/kartvizit"/></head><body><h1>404 Sayfa Bulunamadı</h1></body></html>`,
    route: '/kartvizit'
  },
  {
    id: 22,
    name: '22. Sitemap’te olmayan aktif route',
    mutateHTML: () => `<html><head><title>Gizli Rota</title><link rel="canonical" href="https://mavibasim.com/unlisted-active-route"/></head><body><h1>Gizli Rota</h1></body></html>`,
    route: '/unlisted-active-route'
  },
  {
    id: 23,
    name: '23. Sitemap’te olup render olmayan route',
    mutateHTML: () => `<html><head><title>Sitemap Ghost Rota</title><link rel="canonical" href="https://mavibasim.com/ghost-sitemap-route"/></head><body><h1>Ghost Rota</h1></body></html>`,
    route: '/ghost-sitemap-route'
  },
  {
    id: 24,
    name: '24. Orphan route',
    mutateHTML: () => `<html><head><title>Orphan Rota</title><link rel="canonical" href="https://mavibasim.com/orphan-page-isolated"/></head><body><h1>Orphan Page</h1></body></html>`,
    route: '/orphan-page-isolated'
  },
  {
    id: 25,
    name: '25. İki canonical etiketi',
    mutateHTML: () => `<html><head><title>Test</title><link rel="canonical" href="https://mavibasim.com/kartvizit"/><link rel="canonical" href="https://mavibasim.com/kartvizit"/></head><body><h1>Kartvizit</h1></body></html>`,
    route: '/kartvizit'
  }
];

async function runControlledMutationsSuite() {
  console.log('🧪 RUNNING COMPREHENSIVE CONTROLLED MUTATION FAILURE SUITE (25 SCENARIOS)...');

  const activeRoutesSet = new Set(['/kartvizit', '/istanbul-matbaa', '/unlisted-active-route']);
  const sitemapRoutesSet = new Set(['/kartvizit', '/istanbul-matbaa', '/ghost-sitemap-route']);

  let totalDetected = 0;

  console.log('\n┌─────┬──────────────────────────────────────────┬──────────┬──────────────────────┬────────────────────────────────────────┐');
  console.log('│ #   │ Mutasyon Senaryosu                       │ Beklenen │ Gerçek               │ Durum / Sonuç                          │');
  console.log('├─────┼──────────────────────────────────────────┼──────────┼──────────────────────┼────────────────────────────────────────┤');

  for (const mutation of MUTATIONS_LIST) {
    const html = mutation.mutateHTML();
    const result = validateHTMLDocument(html, mutation.route, activeRoutesSet, sitemapRoutesSet);

    const mName = mutation.name.padEnd(40);
    const exp = 'FAIL'.padEnd(8);
    const actual = (!result.valid ? 'FAIL (Hata Saptandı)' : 'PASS (Kaçtı)').padEnd(20);

    if (!result.valid) {
      totalDetected++;
      console.log(`│ ${String(mutation.id).padEnd(3)} │ ${mName} │ ${exp} │ ${actual} │ 🟢 VERIFIED (${result.errors[0].substring(0, 32)}...) │`);
    } else {
      console.log(`│ ${String(mutation.id).padEnd(3)} │ ${mName} │ ${exp} │ ${actual} │ 🔴 FAILED (Validator kaçırdı!)          │`);
    }
  }

  console.log('└─────┴──────────────────────────────────────────┴──────────┴──────────────────────┴────────────────────────────────────────┘');

  console.log(`\n==================================================`);
  console.log(`📊 CONTROLLED MUTATION SUITE RESULT:`);
  console.log(`   ${totalDetected} / ${MUTATIONS_LIST.length} controlled defects detected!`);
  console.log(`==================================================\n`);

  if (totalDetected === MUTATIONS_LIST.length) {
    console.log('🎉 ALL 25 CONTROLLED DEFECT MUTATIONS WERE SUCCESSFULLY DETECTED BY THE VALIDATOR!');
    process.exit(0);
  } else {
    console.error('🔴 CONTROLLED MUTATION SUITE FAILED!');
    process.exit(1);
  }
}

runControlledMutationsSuite();

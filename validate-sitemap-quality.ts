import fs from 'fs';
import path from 'path';

async function validateSitemapQuality() {
  console.log('🗺️ AUDITING SITEMAP.XML QUALITY & COMPLIANCE...');

  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');

  if (!fs.existsSync(sitemapPath)) {
    console.error('🔴 public/sitemap.xml file not found!');
    process.exit(1);
  }

  const content = fs.readFileSync(sitemapPath, 'utf-8');

  // Check valid XML syntax
  if (!content.startsWith('<?xml') || !content.includes('<urlset')) {
    console.error('🔴 sitemap.xml is not valid XML format.');
    process.exit(1);
  }

  const locMatches = Array.from(content.matchAll(/<loc>(.*?)<\/loc>/g)).map(m => m[1]);
  const lastmodMatches = Array.from(content.matchAll(/<lastmod>(.*?)<\/lastmod>/g)).map(m => m[1]);

  console.log(`ℹ️  Found ${locMatches.length} URLs in sitemap.xml`);

  let errors = 0;
  const nowISO = new Date().toISOString();

  for (const loc of locMatches) {
    if (!loc.startsWith('https://mavibasim.com')) {
      console.error(`🔴 Non-production domain URL in sitemap: ${loc}`);
      errors++;
    }
    if (loc.includes('?') || loc.includes('#')) {
      console.error(`🔴 Query parameter or fragment in sitemap URL: ${loc}`);
      errors++;
    }
    if (loc.endsWith('/') && loc !== 'https://mavibasim.com/') {
      console.error(`🔴 Trailing slash on non-root URL in sitemap: ${loc}`);
      errors++;
    }
    if (loc.includes('invalid') || loc.includes('404')) {
      console.error(`🔴 404 or invalid route in sitemap: ${loc}`);
      errors++;
    }
  }

  for (const lm of lastmodMatches) {
    if (lm > nowISO) {
      console.error(`🔴 Future date in sitemap lastmod: ${lm}`);
      errors++;
    }
  }

  console.log(`\n==================================================`);
  console.log(`📊 SITEMAP QUALITY AUDIT SUMMARY:`);
  console.log(`   Total URLs: ${locMatches.length}`);
  console.log(`   Domain Verification: https://mavibasim.com`);
  console.log(`   Defects Found: ${errors}`);
  console.log(`==================================================\n`);

  if (errors === 0) {
    console.log('🟢 Sitemap Quality & Standards Audit PASSED!');
  } else {
    console.error('🔴 Sitemap Quality Audit FAILED!');
    process.exit(1);
  }
}

validateSitemapQuality();

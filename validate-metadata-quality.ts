import { SEO_PAGES_DATA } from './src/data/seoPagesData';
import { CITIES_DATA } from './src/data/cityData';
import { BLOG_POSTS } from './src/data/blogData';

async function validateMetadataQuality() {
  console.log('🔍 AUDITING METADATA & TITLE QUALITY ACROSS ALL ROUTES...');

  const titlesMap = new Map<string, string[]>();
  const descMap = new Map<string, string[]>();
  let totalAudited = 0;
  let warningsCount = 0;

  // Audit SEO Pages
  for (const [key, page] of Object.entries(SEO_PAGES_DATA)) {
    totalAudited++;
    const path = page.path || `/${key}`;
    const t = page.title;
    const d = page.metaDesc;

    if (!t || t.length < 20 || t.length > 80) {
      warningsCount++;
    }
    if (!d || d.length < 50 || d.length > 250) {
      warningsCount++;
    }

    titlesMap.set(t, [...(titlesMap.get(t) || []), path]);
    descMap.set(d, [...(descMap.get(d) || []), path]);
  }

  // Audit Cities
  for (const city of CITIES_DATA) {
    totalAudited++;
    const path = `/${city.slug}`;
    const t = `${city.name} Matbaa & Baskı Hizmetleri | Mavi Basım`;
    const d = `${city.name} ve çevresindeki işletmeler için kartvizit, broşür, magnet, katalog ve kutu baskı hizmetleri. Topkapı fabrikamızdan ${city.name} adresinize hızlı teslimat.`;

    // Check city name inclusion
    if (!t.toLowerCase().includes(city.name.toLowerCase())) {
      console.error(`🔴 City title missing city name: ${path}`);
    }
    if (!d.toLowerCase().includes(city.name.toLowerCase())) {
      console.error(`🔴 City description missing city name: ${path}`);
    }

    titlesMap.set(t, [...(titlesMap.get(t) || []), path]);
    descMap.set(d, [...(descMap.get(d) || []), path]);
  }

  // Audit Blog Posts
  for (const post of BLOG_POSTS) {
    totalAudited++;
    const path = `/blog/${post.slug}`;
    const t = `${post.title} - Mavi Basım`;
    const d = post.excerpt;

    titlesMap.set(t, [...(titlesMap.get(t) || []), path]);
    descMap.set(d, [...(descMap.get(d) || []), path]);
  }

  let duplicateTitlesCount = 0;
  for (const [title, paths] of titlesMap.entries()) {
    if (paths.length > 1) {
      duplicateTitlesCount++;
      console.error(`🔴 DUPLICATE TITLE FOUND (${paths.length} routes): "${title}" -> ${paths.join(', ')}`);
    }
  }

  console.log(`\n==================================================`);
  console.log(`📊 METADATA AUDIT SUMMARY:`);
  console.log(`   Audited Routes: ${totalAudited}`);
  console.log(`   Unique Titles: ${titlesMap.size}`);
  console.log(`   Duplicate Titles: ${duplicateTitlesCount}`);
  console.log(`   Warnings (suboptimal length): ${warningsCount}`);
  console.log(`==================================================\n`);

  if (duplicateTitlesCount > 0) {
    console.error(`🔴 Metadata Audit Failed: ${duplicateTitlesCount} duplicate title(s) detected!`);
    process.exit(1);
  }

  console.log('🟢 Metadata & Title Quality Audit PASSED!');
}

validateMetadataQuality();

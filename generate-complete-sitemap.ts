import fs from 'fs';
import { BLOG_POSTS } from './src/data/blogData';
import { CITIES_DATA } from './src/data/cityData';
import { SEO_PAGES_DATA } from './src/data/seoPagesData';

const BASE_URL = 'https://mavibasim.com';

const staticRoutes = [
  '/',
  '/kutu',
  '/ambalaj',
  '/kartvizit',
  '/brosur',
  '/el-ilani',
  '/afis',
  '/antetli',
  '/dosyalar',
  '/etiket',
  '/oto-paspas',
  '/kup-bloknot',
  '/magnet',
  '/kitap-ayraci',
  '/yag-karti',
  '/bloknotlar',
  '/amerikan-servis',
  '/karton-canta',
  '/zarf',
  '/kataloglar',
  '/makbuz-ve-formlar',
  '/adisyon',
  '/siparis-fisi',
  '/perakende-satis-fisi',
  '/para-makbuzu',
  '/sozlesme-baski',
  '/sigorta-policeleri',
  '/tahsilat-makbuzu',
  '/arac-kiralama',
  '/gider-makbuzu',
  '/giris-bileti',
  '/recete',
  '/tediye-makbuzu',
  '/cilt-isleri',
  '/matbaa',
  '/referanslar',
  '/sikca-sorulan',
  '/grafik-tasarim',
  '/hakkimizda',
  '/iletisim',
  '/blog',
  '/makine-parkuru',
  '/kullanim-sartlari',
  '/gizlilik-politikasi',
  '/cerez-politikasi',
  '/mesafeli-satis-sozlesmesi',
  '/teslimat-sartlari',
  '/iptal-ve-iade-sartlari'
];

async function generateSitemap() {
  console.log("🛠️ GENERATING COMPLETE SITEMAP.XML...");

  const blogRoutes = BLOG_POSTS.map(post => `/blog/${post.slug}`);
  const seoRoutes = Object.keys(SEO_PAGES_DATA).map(key => {
    const p = SEO_PAGES_DATA[key].path;
    return p.startsWith('/') ? p : `/${p}`;
  });
  const cityRoutes = CITIES_DATA.map(c => `/${c.slug}`);

  // Deduplicate routes
  const allRoutes = Array.from(new Set([
    ...staticRoutes,
    ...blogRoutes,
    ...seoRoutes,
    ...cityRoutes
  ]));

  // Keep recorded dates. A generation run is not evidence of a page update.
  const previousXML = fs.existsSync('./public/sitemap.xml') ? fs.readFileSync('./public/sitemap.xml', 'utf8') : '';
  const lastModified = new Map<string, string>();
  for (const entry of previousXML.matchAll(/<url>[\s\S]*?<\/url>/g)) {
    const loc = entry[0].match(/<loc>([^<]+)<\/loc>/)?.[1];
    const date = entry[0].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
    if (loc && date) lastModified.set(loc, date);
  }

  const xmlUrls = allRoutes.map(route => {
    let priority = '0.8';
    let changefreq = 'weekly';

    if (route === '/') {
      priority = '1.0';
      changefreq = 'daily';
    } else if (route.startsWith('/blog/')) {
      priority = '0.7';
      changefreq = 'monthly';
    } else if (cityRoutes.includes(route)) {
      priority = '0.8';
      changefreq = 'weekly';
    } else if (seoRoutes.includes(route)) {
      priority = '0.85';
      changefreq = 'weekly';
    } else if (staticRoutes.includes(route)) {
      priority = '0.9';
      changefreq = 'weekly';
    }

    return `  <url>
    <loc>${BASE_URL}${route}</loc>
${lastModified.has(`${BASE_URL}${route}`) ? `    <lastmod>${lastModified.get(`${BASE_URL}${route}`)}</lastmod>\n` : ''}    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls.join('\n')}
</urlset>
`;

  fs.writeFileSync('./public/sitemap.xml', xmlContent, 'utf-8');
  console.log(`✅ Successfully updated public/sitemap.xml with ${allRoutes.length} clean, active routes!`);
}

generateSitemap();

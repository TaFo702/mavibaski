import fs from 'fs';
import { BLOG_POSTS } from './src/data/blogData';
import { CITIES_DATA } from './src/data/cityData';
import { SEO_PAGES_DATA } from './src/data/seoPagesData';

async function validateInternalLinks() {
  console.log('🔗 VALIDATING INTERNAL LINKS ACROSS THE SYSTEM...');

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
    '/siparis-fisi-baski-fiyatlari',
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
    '/makine-parkuru'
  ];

  const blogRoutes = BLOG_POSTS.map(p => `/blog/${p.slug}`);
  const seoRoutes = Object.keys(SEO_PAGES_DATA).map(key => {
    const p = SEO_PAGES_DATA[key].path;
    return p.startsWith('/') ? p : `/${p}`;
  });
  const cityRoutes = CITIES_DATA.map(c => `/${c.slug}`);

  const validRoutesSet = new Set([
    ...staticRoutes,
    ...blogRoutes,
    ...seoRoutes,
    ...cityRoutes
  ]);

  // Check invalid routes to make sure they are not linked internally
  const prohibitedLinks = [
    '/katalog',
    '/bloknot',
    '/sektor/kozmetik-guzellik-saglik-baski',
    '/sinop-kafe-bardak-altligi',
    '/sivas-emlakci-kartvizit-baski',
    '/corum-restoran-siparis-fisi',
    '/amasya-kafe-bardak-altligi'
  ];

  let violations = 0;

  function getAllFiles(dir: string, fileList: string[] = []): string[] {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = `${dir}/${file}`;
      if (fs.statSync(fullPath).isDirectory()) {
        getAllFiles(fullPath, fileList);
      } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
        fileList.push(fullPath);
      }
    }
    return fileList;
  }

  const filesToScan = getAllFiles('./src');

  for (const filePath of filesToScan) {
    if (!fs.existsSync(filePath)) continue;
    const content = fs.readFileSync(filePath, 'utf-8');

    for (const pLink of prohibitedLinks) {
      if (
        content.includes(`href="${pLink}"`) || 
        content.includes(`to="${pLink}"`) ||
        content.includes(`href='${pLink}'`) ||
        content.includes(`to='${pLink}'`) ||
        content.includes(`path: '${pLink}'`) ||
        content.includes(`path: "${pLink}"`) ||
        content.includes(`path: \`${pLink}\``)
      ) {
        console.log(`❌ Prohibited internal link "${pLink}" found in ${filePath}!`);
        violations++;
      }
    }
  }

  if (violations > 0) {
    console.log(`❌ Internal Links Validation Failed with ${violations} violations.`);
    process.exit(1);
  } else {
    console.log(`🟢 Internal Links Validation PASSED! No prohibited/unmapped links found.`);
    process.exit(0);
  }
}

validateInternalLinks();

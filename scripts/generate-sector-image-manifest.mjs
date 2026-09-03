import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const ALLOWED_FILES = {
  kuafor: [
    'kuafor-kartvizit-baski.webp',
    'kuafor-kartvizit-selefon-secenekleri.webp',
    'kuafor-randevu-karti-qr-kod.webp',
    'kartvizit-dosya-kontrolu-pdf-prova.webp',
    'kartvizit-baski-kesim-paketleme.webp',
    'kuafor-guzellik-salonu-baski-urunleri.webp'
  ],
  restoran: [
    'restoran-brosur-baski.webp',
    'restoran-brosur-kagit-katlama-secenekleri.webp',
    'restoran-menu-brosuru-tasarim.webp',
    'restoran-brosur-dosya-kontrolu-pdf-prova.webp',
    'restoran-brosur-baski-kirim-paketleme.webp',
    'restoran-paket-servis-baski-urunleri.webp'
  ],
  kozmetik: [
    'kozmetik-guzellik-saglik-baski-cozumleri.webp',
    'parfum-kozmetik-kutusu-bristol-secenekleri.webp',
    'epilasyon-botoks-islem-takip-formlari.webp',
    'sozlesme-tahsilat-makbuzu-senet-formlari.webp',
    'randevu-karti-brosur-karton-canta.webp',
    'kozmetik-etiket-urun-bilgilendirme-foyu.webp'
  ],
  kozmetikGuzellikMerkezi: [
    'kozmetik-guzellik-merkezi-baski-cozumleri.webp',
    'guzellik-merkezi-formlari-danisan-kayit.webp',
    'lazer-epilasyon-seans-takip-formu.webp',
    'guzellik-merkezi-sozlesme-tahsilat-makbuzu.webp',
    'parfum-kozmetik-kutusu-300-350-400-gr.webp',
    'randevu-karti-brosur-etiket-karton-canta.webp'
  ],
  eTicaretPerakende: [
    'e-ticaret-perakende-baski-cozumleri.webp',
    'e-ticaret-urun-kutusu-kargo-paketleme.webp',
    'saten-polyester-ipli-karton-canta.webp',
    'baskili-ambalaj-kagidi-tesekkur-karti.webp',
    'barkod-koli-adres-urun-etiketleri.webp',
    'amerikan-servis-perakende-baski-urunleri.webp'
  ],
  egitimKurumlari: [
    'egitim-kurumlari-baski-cozumleri.webp',
    'deneme-sinavi-soru-kitapcigi-fasikul.webp',
    'ogrenci-kayit-takip-formlari.webp',
    'egitim-brosur-afis-katalog.webp',
    'cocuk-etkinlik-kitabi-egitici-kart.webp',
    'egitim-seti-kutusu-kurumsal-urunler.webp'
  ],
  kutuAmbalaj: [
    'kutu-ambalaj-baski-cozumleri.webp',
    'ilac-medikal-parfum-kozmetik-kutulari.webp',
    'zurna-durum-taco-fast-food-kutulari.webp',
    'popcorn-cips-atistirmalik-kutulari.webp',
    'baklava-pasta-kurabiye-cikolata-kutulari.webp',
    'etiket-ambalaj-kagidi-karton-canta.webp'
  ]
};

const DIRS = {
  kuafor: path.join(projectRoot, 'public', 'images', 'sektor', 'kuafor-kartvizit'),
  restoran: path.join(projectRoot, 'public', 'images', 'sektor', 'restoran-brosur'),
  kozmetik: path.join(projectRoot, 'public', 'images', 'sektor', 'kozmetik-guzellik-saglik'),
  kozmetikGuzellikMerkezi: path.join(projectRoot, 'public', 'images', 'sektor', 'kozmetik-guzellik-merkezi'),
  eTicaretPerakende: path.join(projectRoot, 'public', 'images', 'sektor', 'e-ticaret-perakende'),
  egitimKurumlari: path.join(projectRoot, 'public', 'images', 'sektor', 'egitim-kurumlari'),
  kutuAmbalaj: path.join(projectRoot, 'public', 'images', 'sektor', 'kutu-ambalaj')
};

const manifest = {
  kuafor: {},
  restoran: {},
  kozmetik: {},
  kozmetikGuzellikMerkezi: {},
  eTicaretPerakende: {},
  egitimKurumlari: {},
  kutuAmbalaj: {}
};

for (const [sector, files] of Object.entries(ALLOWED_FILES)) {
  const dir = DIRS[sector];
  for (const filename of files) {
    const filePath = path.join(dir, filename);
    let isValid = false;

    // Check filename safety (no non-ASCII / Turkish chars or spaces)
    if (/[^a-z0-9\.\-\_]/i.test(filename) || !filename.endsWith('.webp')) {
      console.warn(`[Sector Image Manifest Warning] Filename '${filename}' is invalid or not .webp`);
      manifest[sector][filename] = false;
      continue;
    }

    if (fs.existsSync(filePath)) {
      try {
        const stats = fs.statSync(filePath);
        if (stats.isFile() && stats.size > 0) {
          isValid = true;
        } else {
          console.warn(`[Sector Image Manifest Warning] File '${filePath}' exists but is 0 bytes or not a regular file.`);
        }
      } catch (err) {
        console.warn(`[Sector Image Manifest Warning] Error reading file '${filePath}':`, err.message);
      }
    }

    manifest[sector][filename] = isValid;
  }
}

const targetDir = path.join(projectRoot, 'src', 'generated');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targetFile = path.join(targetDir, 'sectorImageManifest.ts');

const BLOG_IMAGES = [
  'images/brosur/brosur-baskisi.webp',
  'images/brosur/el-ilani-baskisi.webp',
  'images/dosya/katalog-baskisi.webp',
  'images/dosya/afis-tasarimi.webp',
  'images/kartvizit/premium-kartvizit-baskisi.webp',
  'images/sozlesme/sozlesme-baskisi.webp',
  'images/tahsilat-makbuzu/tahsilat-makbuzu-baskisi.webp',
  'images/dosya/cepli-dosya-baskisi.webp',
  'images/amerikan-servis/amerikan-servis-baskisi.webp',
  'images/makbuz/siparis-fisi-baskisi.webp',
  'images/magnet/oval-kesimli-magnet.webp',
  'images/dosya/karton-canta-tasarimi.webp',
  'images/makbuz/antetli-kagit-tasarimi.webp',
  'images/sozlesme/torba-zarf-baskisi.webp',
  'images/sozlesme/bloknot-baskisi.webp',
  'images/el-ilani/el-ilani-tasarimi.webp',
  'images/brosur/brosur-tasarimi-ve-baski.webp',
  'images/amerikan-servis/restoran-amerikan-servis.webp',
  'images/sozlesme/yag-karti-baskisi.webp',
  'images/sozlesme/kitap-ayraci-tasarimi.webp',
  'images/makbuz/kraft-oto-paspas-baskisi.webp',
  'images/sozlesme/tabaka-opak-etiket-baskisi.webp',
  'images/dosya/kutu-baskisi.webp',
  'images/dosya/ambalaj-baskisi.webp'
];

const blogManifest = {};
for (const relPath of BLOG_IMAGES) {
  const normWithSlash = relPath.startsWith('/') ? relPath : `/${relPath}`;
  const normWithoutSlash = relPath.replace(/^\//, '');
  const fullPath = path.join(projectRoot, 'public', normWithoutSlash);
  let isValid = false;

  if (fs.existsSync(fullPath)) {
    try {
      const stats = fs.statSync(fullPath);
      if (stats.isFile() && stats.size > 0) {
        isValid = true;
      } else {
        console.warn(`[Blog Image Manifest Warning] File '${fullPath}' exists but is 0 bytes or not a regular file.`);
      }
    } catch (err) {
      console.warn(`[Blog Image Manifest Warning] Error reading file '${fullPath}':`, err.message);
    }
  }

  blogManifest[normWithSlash] = isValid;
  blogManifest[normWithoutSlash] = isValid;
}

const content = `// This file is auto-generated by scripts/generate-sector-image-manifest.mjs
// Do not edit this file directly.

export const SECTOR_IMAGE_MANIFEST = ${JSON.stringify(manifest, null, 2)} as const;

export type SectorImageManifestType = typeof SECTOR_IMAGE_MANIFEST;

export const BLOG_IMAGE_MANIFEST = ${JSON.stringify(blogManifest, null, 2)} as const;

export type BlogImageManifestType = typeof BLOG_IMAGE_MANIFEST;
`;

fs.writeFileSync(targetFile, content, 'utf-8');
console.log(`[Sector Image Manifest] Generated manifest at src/generated/sectorImageManifest.ts`);

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

/**
 * Validates WebP file buffer integrity using pure Node.js (no external packages):
 * - Minimum 12 bytes length
 * - Starts with 'RIFF'
 * - Bytes 8-11 are 'WEBP'
 * - RIFF little-endian payload size equals (or complies with) actual buffer size
 * - WebP chunk boundaries stay strictly within file payload
 * - Contains at least one main image chunk ('VP8 ', 'VP8L', 'VP8X')
 * - Rejects corrupt/truncated chunk structures
 */
function validateWebpBuffer(buf) {
  const size = buf.length;
  // 1. File at least 12 bytes
  if (size < 12) return false;
  // 2. First 4 bytes RIFF
  if (buf.toString('ascii', 0, 4) !== 'RIFF') return false;
  // 3. Bytes 8-11 WEBP
  if (buf.toString('ascii', 8, 12) !== 'WEBP') return false;
  // 4. Little-endian RIFF size check (fileSize - 8)
  const riffPayloadSize = buf.readUInt32LE(4);
  const diff = size - (riffPayloadSize + 8);
  if (diff !== 0 && !(riffPayloadSize % 2 === 1 && diff === 1)) {
    return false;
  }

  // 5. Walk chunks
  let offset = 12;
  let hasMainImageChunk = false;
  const maxOffset = riffPayloadSize + 8;

  while (offset < maxOffset) {
    if (offset + 8 > maxOffset) return false;
    const fourCC = buf.toString('ascii', offset, offset + 4);
    // FourCC characters must be printable ASCII
    if (!/^[a-zA-Z0-9 _]{4}$/.test(fourCC)) return false;
    const chunkSize = buf.readUInt32LE(offset + 4);
    if (['VP8 ', 'VP8L', 'VP8X'].includes(fourCC)) {
      hasMainImageChunk = true;
    }
    // Chunk boundary cannot overflow
    if (offset + 8 + chunkSize > maxOffset) return false;
    // Chunks are padded to even length
    const paddedSize = chunkSize + (chunkSize % 2);
    offset = offset + 8 + paddedSize;
  }

  // Ensure parsing consumed expected payload length
  if (offset !== maxOffset && !(riffPayloadSize % 2 === 1 && offset === maxOffset + 1)) {
    return false;
  }

  return hasMainImageChunk;
}

/**
 * Reads a file and tests for WebP integrity. Returns false if unreadable or invalid.
 */
function isValidWebpFile(fullPath) {
  if (!fs.existsSync(fullPath)) return false;
  try {
    const stats = fs.statSync(fullPath);
    if (!stats.isFile() || stats.size < 12) return false;
    const buf = fs.readFileSync(fullPath);
    return validateWebpBuffer(buf);
  } catch (err) {
    console.warn(`[Image Manifest Warning] Error reading '${fullPath}':`, err.message);
    return false;
  }
}

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

    isValid = isValidWebpFile(filePath);
    manifest[sector][filename] = isValid;
  }
}

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
  const isValid = isValidWebpFile(fullPath);

  blogManifest[normWithSlash] = isValid;
  blogManifest[normWithoutSlash] = isValid;
}

// Kutu Sayfası 11 Galeri Görseli
const KUTU_IMAGES = [
  'images/kutu/urun-kutusu-baski.webp',
  'images/kutu/butik-baklava-cikolata-kutusu.webp',
  'images/kutu/karton-kutu-baski-fiyatlari.webp',
  'images/kutu/ozel-kesim-kutu-tasarimi.webp',
  'images/kutu/hediyelik-kutu-ornegi.webp',
  'images/kutu/kutu-baski-detayi.webp',
  'images/kutu/gida-ambalaji-baski-ornegi.webp',
  'images/kutu/urun-ambalaj-tasarimi.webp',
  'images/kutu/kuse-ambalaj-baski.webp',
  'images/kutu/ambalaj-tasarimi-ve-baski.webp',
  'images/kutu/ambalaj-baski-fiyatlari.webp'
];

const kutuManifest = {};
for (const relPath of KUTU_IMAGES) {
  const normWithSlash = relPath.startsWith('/') ? relPath : `/${relPath}`;
  const normWithoutSlash = relPath.replace(/^\//, '');
  const fileName = path.basename(relPath);
  const fullPath = path.join(projectRoot, 'public', normWithoutSlash);
  const isValid = isValidWebpFile(fullPath);

  kutuManifest[normWithSlash] = isValid;
  kutuManifest[normWithoutSlash] = isValid;
  kutuManifest[fileName] = isValid;
}

// Ambalaj Sayfası Görselleri
const AMBALAJ_IMAGES = [
  'images/ambalaj/ambalaj-baski-cozumleri.webp',
  'images/ambalaj/baskili-ambalaj-kagidi.webp',
  'images/ambalaj/kuse-ambalaj-baski.webp',
  'images/ambalaj/ambalaj-kagit-ve-malzemeleri.webp',
  'images/ambalaj/ambalaj-baski-pdf-prova.webp',
  'images/ambalaj/ambalaj-baski-urunleri.webp'
];

const ambalajManifest = {};
for (const relPath of AMBALAJ_IMAGES) {
  const normWithSlash = relPath.startsWith('/') ? relPath : `/${relPath}`;
  const normWithoutSlash = relPath.replace(/^\//, '');
  const fileName = path.basename(relPath);
  const fullPath = path.join(projectRoot, 'public', normWithoutSlash);
  const isValid = isValidWebpFile(fullPath);

  ambalajManifest[normWithSlash] = isValid;
  ambalajManifest[normWithoutSlash] = isValid;
  ambalajManifest[fileName] = isValid;
}

// Küp Bloknot Sayfası Görselleri
const KUP_BLOKNOT_IMAGES = [
  'images/kup-bloknot/kutulu-kup-bloknot-baski.webp',
  'images/kup-bloknot/kup-bloknot-baski-fiyatlari.webp',
  'images/kup-bloknot/kup-bloknot-baski-detayi.webp',
  'images/kup-bloknot/kup-bloknot-tasarimi.webp',
  'images/kup-bloknot/promosyon-kup-bloknot-ornegi.webp',
  'images/kup-bloknot/kup-bloknot-baski.webp'
];

const kupBloknotManifest = {};
for (const relPath of KUP_BLOKNOT_IMAGES) {
  const normWithSlash = relPath.startsWith('/') ? relPath : `/${relPath}`;
  const normWithoutSlash = relPath.replace(/^\//, '');
  const fileName = path.basename(relPath);
  const fullPath = path.join(projectRoot, 'public', normWithoutSlash);
  const isValid = isValidWebpFile(fullPath);

  kupBloknotManifest[normWithSlash] = isValid;
  kupBloknotManifest[normWithoutSlash] = isValid;
  kupBloknotManifest[fileName] = isValid;
}

const targetDir = path.join(projectRoot, 'src', 'generated');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const targetFile = path.join(targetDir, 'sectorImageManifest.ts');

const content = `// This file is auto-generated by scripts/generate-sector-image-manifest.mjs
// Do not edit this file directly.

export const SECTOR_IMAGE_MANIFEST = ${JSON.stringify(manifest, null, 2)} as const;

export type SectorImageManifestType = typeof SECTOR_IMAGE_MANIFEST;

export const BLOG_IMAGE_MANIFEST = ${JSON.stringify(blogManifest, null, 2)} as const;

export type BlogImageManifestType = typeof BLOG_IMAGE_MANIFEST;

export const KUTU_IMAGE_MANIFEST = ${JSON.stringify(kutuManifest, null, 2)} as const;

export type KutuImageManifestType = typeof KUTU_IMAGE_MANIFEST;

export const AMBALAJ_IMAGE_MANIFEST = ${JSON.stringify(ambalajManifest, null, 2)} as const;

export type AmbalajImageManifestType = typeof AMBALAJ_IMAGE_MANIFEST;

export const KUP_BLOKNOT_IMAGE_MANIFEST = ${JSON.stringify(kupBloknotManifest, null, 2)} as const;

export type KupBloknotImageManifestType = typeof KUP_BLOKNOT_IMAGE_MANIFEST;
`;

fs.writeFileSync(targetFile, content, 'utf-8');
console.log(`[Sector Image Manifest] Generated manifest at src/generated/sectorImageManifest.ts`);


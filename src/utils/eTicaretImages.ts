import { SECTOR_IMAGE_MANIFEST } from '../generated/sectorImageManifest';

// Match the existing client-side images; do not introduce new product content.
const images = [
  {
    file: 'e-ticaret-perakende-baski-cozumleri.webp',
    alt: 'E-ticaret ve perakende markaları için kargo kutusu, karton çanta, etiket ve ambalaj kâğıdı baskıları',
  },
  {
    file: 'e-ticaret-urun-kutusu-kargo-paketleme.webp',
    alt: 'E-ticaret ürün kutuları ve kargo paketleme çözümleri',
    caption: 'Oluklu mukavva ve Bristol e-ticaret kargo kutusu seçenekleri',
  },
  {
    file: 'saten-polyester-ipli-karton-canta.webp',
    alt: 'Saten ve polyester ipli lüks karton çanta ve kraft poşet baskısı',
    caption: '230–300 gr Bristol saten veya polyester ipli karton çantalar',
  },
  {
    file: 'baskili-ambalaj-kagidi-tesekkur-karti.webp',
    alt: 'Logo baskılı pelür ambalaj kâğıdı ve müşteri teşekkür kartları',
    caption: 'Pelür ve sülfit ambalaj kâğıdı ile paket içi teşekkür kartları',
  },
  {
    file: 'barkod-koli-adres-urun-etiketleri.webp',
    alt: 'Rulo termal barkod, kuşe koli adres ve raf etiketleri',
    caption: 'Rulo termal barkod, kuşe koli adres ve suya dayanıklı etiketler',
  },
  {
    file: 'amerikan-servis-perakende-baski-urunleri.webp',
    alt: 'Amerikan servis ve perakende işletmeleri için tamamlayıcı baskı ürünleri',
    caption: 'Amerikan servis, karton çanta, kargo kutusu ve etiket ürünleri',
  },
] as const;

export function renderETicaretImage(index: number): string {
  const image = images[index];
  if (!image || !SECTOR_IMAGE_MANIFEST.eTicaretPerakende[image.file]) return '';

  const hero = index === 0;
  const caption = 'caption' in image
    ? `<figcaption class="text-xs text-center text-neutral-500 font-medium mt-2 pb-1">${image.caption}</figcaption>`
    : '';

  return `<figure class="my-6 rounded-2xl overflow-hidden border border-neutral-200/80 p-2 shadow-sm"><img src="/images/sektor/e-ticaret-perakende/${image.file}" alt="${image.alt}" width="${hero ? 1200 : 900}" height="${hero ? 800 : 650}" loading="${hero ? 'eager' : 'lazy'}"${hero ? ' fetchpriority="high"' : ''} decoding="async" class="w-full h-auto object-cover rounded-xl" />${caption}</figure>`;
}

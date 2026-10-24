import { ECONOMIC_PRODUCT_EXAMPLES, example, type CityPriceExample } from './cityPriceExamples';
import { BROSUR_DATA } from './extraProductData';

// Reviewed selections vary by page, not by timer or random browser state.
// This keeps the first HTML and the interactive page on the same products.
export const SECTOR_PRICE_PRODUCTS = {
  '/sektor/kuafor-kartvizit-baski': '/kartvizit',
  '/sektor/restoran-brosur-baski': '/amerikan-servis',
  '/sektor/donerci-magnet-baski': '/kutu',
  '/sektor/fast-food-cips-kutusu-baski': '/etiket',
  '/sektor/pastane-kutu-baski': '/karton-canta',
  '/sektor/kozmetik-guzellik-merkezi-baski': '/etiket',
  '/sektor/e-ticaret-perakende-baski': '/kutu',
  '/sektor/egitim-kurumlari-baski': '/kitap-ayraci',
  '/sektor/kutu-ambalaj-baski-cozumleri': '/etiket',
  '/sektor/eczane-el-ilani-baski': '/karton-canta',
  '/sektor/emlakci-kartvizit-baski': '/kartvizit',
  '/sektor/kafe-menu-baski': '/amerikan-servis',
  '/sektor/lokanta-amerikan-servis-baski': '/amerikan-servis',
  '/emlakci-kartvizit': '/dosyalar',
  '/emlak-afis-baski': '/afis',
  '/hali-koltuk-yikama-baski': '/etiket',
  '/fast-food-cips-kutusu': '/kutu',
  '/fast-food-kampanya-brosuru': '/afis',
  '/lokanta-amerikan-servis': '/karton-canta',
  '/restaurant-siparis-fisi': '/amerikan-servis',
  '/samsun-restoran-brosur-baski': '/karton-canta',
  '/trabzon-kafe-menu-baski': '/etiket',
  '/ordu-findik-firmasi-katalog-baski': '/kutu',
  '/antalya-emlakci-kartvizit-baski': '/dosyalar',
  '/rize-lokanta-amerikan-servis': '/amerikan-servis',
  '/giresun-fast-food-cips-kutusu-baski': '/karton-canta',
  '/gebze-eczane-etiket-baski': '/etiket',
  '/bitlis-restaurant-siparis-fisi': '/kartvizit',
  '/erzurum-emlakci-katalog-baski': '/antetli',
  '/kayseri-emlakci-afis-baski': '/afis',
} as const;

const a5Brochure = example('A5 Broşür', '/brosur', '/images/brosur/tanitim-brosuru-ornegi.webp',
  BROSUR_DATA.flatMap(group => group.items).filter(item => item.size === 'A5'));
const byPath = new Map(ECONOMIC_PRODUCT_EXAMPLES.map(product => [product.path, product]));

export function getSectorPriceExamples(pathname: string): CityPriceExample[] {
  const path = pathname.replace(/\/$/, '');
  if (!Object.hasOwn(SECTOR_PRICE_PRODUCTS, path)) return [];
  const thirdPath = SECTOR_PRICE_PRODUCTS[path as keyof typeof SECTOR_PRICE_PRODUCTS];
  const magnet = byPath.get('/magnet');
  const third = byPath.get(thirdPath);
  if (!magnet || !third) throw new Error(`Missing sector price product: ${path}`);
  const isFood = /restoran|restaurant|lokanta|doner|fast-food|pastane|kafe/.test(path);
  const brochureImage = /egitim/.test(path) ? '/images/brosur/brosur-baski-fiyatlari.webp'
    : /kuafor|guzellik|kozmetik/.test(path) ? '/images/brosur/ucuz-brosur-baski.webp'
    : /eczane/.test(path) ? '/images/el-ilani/baski-sonrasi-islemler-mucellit-surecleri.webp'
    : /emlak/.test(path) ? '/images/brosur/katlamali-brosur-baski.webp'
    : isFood ? a5Brochure.image : '/images/el-ilani/el-ilani-baski-fiyatlari.webp';
  return [
    { ...a5Brochure, image: brochureImage },
    { ...magnet, image: /hali-koltuk/.test(path) ? magnet.image
      : isFood ? '/images/magnet/magnet-baski.webp' : '/images/magnet/ozel-figur-kesimli-magnet.webp' },
    third,
  ];
}

import { AFIS_DATA, AMERIKAN_SERVIS_DATA, ANTETLI_DATA, DOSYALAR_DATA, ETIKET_DATA, KARTVIZIT_DATA, KUTU_DATA, MAGNET_DATA, OTO_PASPAS_DATA } from './productData';
import { BROSUR_DATA, KARTON_CANTA_DATA, KITAP_AYRACI_DATA, KUP_BLOKNOT_DATA, YAG_KARTI_DATA, ZARF_DATA } from './extraProductData';
import { getCityBySlug } from './cityData';
import { LOCAL_ASSETS } from '../constants/assets';

interface PriceRow {
  code: string;
  price: string;
  desc: string;
  miktar?: string;
  ebat?: string;
  isCustom?: boolean;
}

export interface CityPriceExample {
  name: string;
  path: string;
  item: PriceRow;
  quantity: string;
  image: string;
}

function example(name: string, path: string, image: string, rows: readonly PriceRow[]): CityPriceExample {
  const amount = (row: PriceRow) => Number(row.price.replace(/[^\d,]/g, '').replace(',', '.'));
  // Only complete advertised packs; custom unit rates and quote-only rows are excluded.
  const item = rows.filter(row => !row.isCustom && Number.isFinite(amount(row)) && amount(row) > 0)
    .reduce<PriceRow | undefined>((best, row) => !best || amount(row) < amount(best) ? row : best, undefined);
  if (!item?.miktar) throw new Error(`Missing priced pack or quantity: ${path}`);
  return { name, path, image, item, quantity: item.miktar };
}

// Existing product tables own every price and specification below.
const brochure = example('Broşür', '/brosur', LOCAL_ASSETS.brosur, BROSUR_DATA.flatMap(group => group.items));
const otherProducts: readonly CityPriceExample[] = [
  example('Kartvizit', '/kartvizit', LOCAL_ASSETS.kartvizit, KARTVIZIT_DATA.flatMap(group => group.items)
    .map(item => ({ ...item, miktar: 'miktar' in item && typeof item.miktar === 'string' ? item.miktar : '1.000 Adet' }))),
  example('Etiket', '/etiket', LOCAL_ASSETS.etiket, ETIKET_DATA),
  example('Magnet', '/magnet', LOCAL_ASSETS.magnet, MAGNET_DATA.flatMap(group => group.items)),
  example('Afiş', '/afis', LOCAL_ASSETS.afis, AFIS_DATA.flatMap(group => group.items)),
  example('Antetli Kâğıt', '/antetli', LOCAL_ASSETS.anteli_kagit, ANTETLI_DATA.flatMap(group => group.items)),
  example('Cepli Dosya', '/dosyalar', LOCAL_ASSETS.cep, DOSYALAR_DATA),
  example('Amerikan Servis', '/amerikan-servis', LOCAL_ASSETS.amerikan_servis, AMERIKAN_SERVIS_DATA.flatMap(group =>
    group.items.map(item => ({ ...item, miktar: group.subTitle.match(/[\d.]+\s+Adet/i)?.[0] })))),
  example('Kutu', '/kutu', LOCAL_ASSETS.kutu, KUTU_DATA.map(item => ({ ...item, desc: item.ozellik, ebat: item.olcu }))),
  example('Oto Paspas', '/oto-paspas', LOCAL_ASSETS.otopaspas, OTO_PASPAS_DATA.map(item => ({ ...item, desc: `${item.malzeme} · ${item.baski}` }))),
  example('Zarf', '/zarf', LOCAL_ASSETS.zarf, ZARF_DATA.flatMap(group => group.items)),
  example('Karton Çanta', '/karton-canta', LOCAL_ASSETS.karton_canta, KARTON_CANTA_DATA.flatMap(group =>
    group.items.map(item => ({ ...item, ebat: group.ebat })))),
  example('Kitap Ayracı', '/kitap-ayraci', LOCAL_ASSETS.kitap_ayraci, KITAP_AYRACI_DATA.flatMap(group => group.items)),
  example('Yağ Kartı', '/yag-karti', LOCAL_ASSETS.yag_karti, YAG_KARTI_DATA.flatMap(group => group.items)),
  example('Küp Bloknot', '/kup-bloknot', LOCAL_ASSETS.kup, KUP_BLOKNOT_DATA.flatMap(group =>
    group.items.map(item => ({ ...item, desc: `${group.cat} küp bloknot · ${item.desc}` })))),
];

function buildProductPairs(count: number): readonly (readonly [number, number])[] {
  const ring = Array.from({ length: count }, (_, index) => index);
  const pairs: [number, number][] = [];
  // Round-robin pairs provide 91 distinct product pairs from 14 products.
  for (let round = 0; round < count - 1; round++) {
    for (let index = 0; index < count / 2; index++) {
      let pair: [number, number] = [ring[index], ring[count - 1 - index]];
      const previous = pairs.at(-1);
      if (previous && (pair[0] === previous[0] || pair[1] === previous[1])) pair = [pair[1], pair[0]];
      pairs.push(pair);
    }
    const last = ring.pop();
    if (last !== undefined) ring.splice(1, 0, last);
  }
  return pairs;
}

const productPairs = buildProductPairs(otherProducts.length);

// Stable catalogue variety by plate code; this is not evidence of local demand.
// Server rendering and hydration always show the same products, without randomness.
export function getCityPriceExamples(citySlug: string): CityPriceExample[] {
  const city = getCityBySlug(citySlug);
  if (!city) return [];
  const pair = productPairs[city.plateCode - 1];
  if (!pair) throw new Error(`Missing city price products: ${citySlug}`);
  return [brochure, otherProducts[pair[0]], otherProducts[pair[1]]];
}

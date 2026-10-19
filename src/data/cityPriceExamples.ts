import { ETIKET_DATA, KARTVIZIT_DATA, MAGNET_DATA } from './productData';
import { LOCAL_ASSETS } from '../constants/assets';

interface PriceRow {
  code: string;
  price: string;
  desc: string;
  miktar?: string;
  ebat?: string;
}

export interface CityPriceExample {
  name: string;
  path: string;
  item: PriceRow;
  quantity: string;
  image: string;
}

function lowestPrice(rows: readonly PriceRow[]): PriceRow | undefined {
  const amount = (row: PriceRow) => Number(row.price.replace(/[^\d,]/g, '').replace(',', '.'));
  return rows.filter(row => Number.isFinite(amount(row)) && amount(row) > 0)
    .reduce<PriceRow | undefined>((best, row) => !best || amount(row) < amount(best) ? row : best, undefined);
}

// Two approved comparison pages only: Mardin's original two-card pilot and
// Kütahya's three-image table. Prices remain owned by the existing product data.
export function getCityPriceExamples(citySlug: string): CityPriceExample[] {
  if (citySlug !== 'mardin-matbaa' && citySlug !== 'kutahya-matbaa') return [];
  const cards = lowestPrice(KARTVIZIT_DATA.flatMap(group => group.items)
    .filter(item => !('miktar' in item) || item.miktar === '1.000 Adet'));
  const labels = lowestPrice(ETIKET_DATA);
  const examples: CityPriceExample[] = [];
  if (cards) examples.push({ name: 'Kartvizit', path: '/kartvizit', item: cards, quantity: '1.000 Adet', image: LOCAL_ASSETS.kartvizit });
  if (labels) examples.push({ name: 'Etiket', path: '/etiket', item: labels, quantity: labels.miktar || '1.000 Adet', image: LOCAL_ASSETS.etiket });
  if (citySlug === 'kutahya-matbaa') {
    // Custom cm² rates are not comparable to the complete 1,000-piece packs.
    const magnet = lowestPrice(MAGNET_DATA.flatMap(group => group.items).filter(item => !item.isCustom));
    if (magnet) examples.push({ name: 'Magnet', path: '/magnet', item: magnet, quantity: magnet.miktar || '1.000 Adet', image: LOCAL_ASSETS.magnet });
  }
  return examples;
}

import { ETIKET_DATA, KARTVIZIT_DATA } from './productData';

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
}

function lowestPrice(rows: readonly PriceRow[]): PriceRow | undefined {
  const amount = (row: PriceRow) => Number(row.price.replace(/[^\d,]/g, '').replace(',', '.'));
  return rows.filter(row => Number.isFinite(amount(row)) && amount(row) > 0)
    .reduce<PriceRow | undefined>((best, row) => !best || amount(row) < amount(best) ? row : best, undefined);
}

// Pilot approved for Mardin only. Read the existing price rows on every render;
// do not copy amounts or expand this to other cities without the user's review.
export function getCityPriceExamples(citySlug: string): CityPriceExample[] {
  if (citySlug !== 'mardin-matbaa') return [];
  const cards = lowestPrice(KARTVIZIT_DATA.flatMap(group => group.items)
    .filter(item => !('miktar' in item) || item.miktar === '1.000 Adet'));
  const labels = lowestPrice(ETIKET_DATA);
  const examples: CityPriceExample[] = [];
  if (cards) examples.push({ name: 'Kartvizit', path: '/kartvizit', item: cards, quantity: '1.000 Adet' });
  if (labels) examples.push({ name: 'Etiket', path: '/etiket', item: labels, quantity: labels.miktar || '1.000 Adet' });
  return examples;
}

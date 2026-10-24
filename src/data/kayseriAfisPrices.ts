export interface KayseriAfisPrice {
  id: string;
  product: string;
  size: string;
  quantity: number;
  price: number;
}

// User-confirmed examples. The later 700 TL correction replaces 800 TL.
export const KAYSERI_AFIS_PRICES: readonly KayseriAfisPrice[] = [
  { id: 'folyo-50x70', product: 'Selefonlu Folyo', size: '50 × 70 cm', quantity: 1, price: 500 },
  { id: 'branda-200x100', product: '440 gr Vinil Branda', size: '200 × 100 cm (2 × 1 m)', quantity: 1, price: 700 },
  { id: 'branda-35x50', product: '440 gr Vinil Branda', size: '35 × 50 cm', quantity: 1, price: 350 },
];

export const KAYSERI_AFIS_PRICE_SUMMARY = KAYSERI_AFIS_PRICES
  .map(item => `${item.size} ${item.product.toLocaleLowerCase('tr-TR')}, ${item.quantity} adet için ${item.price} TL`)
  .join('; ') + '.';

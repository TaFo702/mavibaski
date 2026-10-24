import React from 'react';
import { CityImagePriceTable } from './CityImagePriceTable';
import { getSectorPriceExamples } from '../data/sectorPriceExamples';

export function SectorPriceExamples({ pathname }: { pathname: string }) {
  const examples = getSectorPriceExamples(pathname);
  if (!examples.length) return null;
  return (
    <div data-sector-price-cards className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <CityImagePriceTable examples={examples} />
      <p className="text-xs text-slate-600 mt-2">Fiyatlar KDV hariçtir. A5 broşür ve magnette en düşük toplam paket bedelleri gösterilir; farklı adet ve özellikler için ürünün fiyat listesini inceleyin.</p>
    </div>
  );
}

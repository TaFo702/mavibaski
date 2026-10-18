import { getPriorityCityContent, type CityInfo } from '../data/cityData';
import type { SearchMetadata } from '../data/pageSearchMetadata';

// Keep the actual destination city prominent without implying a local branch
// or making an unverified factory / delivery-time promise.
export function getCitySearchMetadata(city: CityInfo): SearchMetadata {
  const priority = getPriorityCityContent(city.slug);
  let title = priority?.metaTitle || `${city.name} Matbaa & Baskı Hizmetleri | Mavi Basım`;
  if (title.length > 60) title = title.replace(/ \| Mavi Basım$/, '');
  const cta = city.name.length <= 7
    ? 'sipariş ve fiyat teklifi için bize ulaşın.'
    : city.name.length <= 12
      ? 'sipariş ve fiyat teklifi için ulaşın.'
      : 'sipariş ve fiyat teklifi alın.';
  let desc = `${city.name} için kartvizit, broşür, katalog, etiket ve kutu baskı seçeneklerini inceleyin. İstanbul Topkapı’dan kargo ile ${cta}`;
  if (desc.length < 155) desc = desc.replace('inceleyin.', 'karşılaştırın.');
  return { title, desc };
}

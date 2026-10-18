import type { CityInfo } from '../data/cityData';
import type { SearchMetadata } from '../data/pageSearchMetadata';
import { CITY_SEARCH_CONTENT } from '../data/citySearchContent';

// First HTML and client metadata share the reviewed page-specific copy.
export function getCitySearchMetadata(city: CityInfo): SearchMetadata {
  const content = CITY_SEARCH_CONTENT[city.slug];
  if (!content) throw new Error(`Missing reviewed city search metadata: ${city.slug}`);
  return { title: content.title, desc: content.desc };
}

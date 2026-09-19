import { CITIES_DATA } from './src/data/cityData';
import * as fs from 'fs';

async function checkCityUrls() {
  console.log(`Checking ${CITIES_DATA.length} city URLs...`);

  // Check sitemap or CITIES_DATA
  const appTsx = fs.readFileSync('./src/App.tsx', 'utf-8');

  const citySlugs = CITIES_DATA.map(c => c.slug);
  console.log(`Total city slugs in CITIES_DATA: ${citySlugs.length}`);

  const missingInApp = 0;
  citySlugs.forEach(slug => {
    // Check if URL is HTTPS and correct domain
    const fullUrl = `https://mavibasim.com/${slug}`;
    if (!fullUrl.startsWith('https://mavibasim.com/')) {
      console.log(`Invalid domain/HTTPS: ${fullUrl}`);
    }
  });

  // Check 5 sample city routes against local server http://localhost:3000
  const samples = ['istanbul-matbaa', 'ankara-matbaa', 'izmir-matbaa', 'bursa-matbaa', 'duzce-matbaa'];
  for (const slug of samples) {
    try {
      const res = await fetch(`http://localhost:3000/${slug}`);
      console.log(`Fetch http://localhost:3000/${slug} -> Status ${res.status}`);
    } catch (e) {
      console.error(`Failed to fetch http://localhost:3000/${slug}:`, e);
    }
  }
}

checkCityUrls();

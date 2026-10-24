import { KATALOG_DATA } from './extraProductData';
import type { CityPriceExample } from './cityPriceExamples';
import { WHATSAPP_NUMBER } from '../constants/contact';

const row = KATALOG_DATA.rows.find(item => item.label === 'A4 4 Sayfa + Kapak');
if (!row?.p50 || row.isSpecial) throw new Error('Missing standard A4 catalogue tariff');

export const ERZURUM_KATALOG_EXAMPLE: CityPriceExample = {
  name: 'Katalog',
  path: '/kataloglar',
  image: '/images/katalog/reklam-katalogu-tasarimi.webp',
  quantity: '50 Adet',
  item: {
    code: 'KATALOG-8S-50',
    ebat: row.label,
    desc: `Kapak dahil ${row.total.toLocaleLowerCase('tr-TR')} (4 iç + 4 kapak) · 135 gr kuşe iç · 300 gr mat/parlak selefonlu kapak · Tel dikiş`,
    miktar: '50 Adet',
    price: row.p50,
  },
};

export const ERZURUM_KATALOG_PRICE_SUMMARY = `A4, kapak dahil ${row.total.toLocaleLowerCase('tr-TR')} (4 iç + 4 kapak), 135 gr kuşe iç sayfa, 300 gr selefonlu kapak ve tel dikiş için 50 adet toplam baskı bedeli ${row.p50}'dir. Fiyata %20 KDV dahil değildir.`;

const quoteMessage = 'Merhaba, Erzurum için emlak veya inşaat projesi kataloğu baskı teklifi almak istiyorum.\nBitmiş ebat ve yön:\nİç sayfa sayısı:\nKapak dahil toplam sayfa:\nBaskı adedi:\nİç sayfa ve kapak kâğıdı:\nCilt ve kapak uygulaması:\nHazır PDF / tasarım ihtiyacı:\nTeslimat ilçesi:\nİstenen kullanım tarihi:';

export const ERZURUM_KATALOG_QUOTE_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(quoteMessage)}`;

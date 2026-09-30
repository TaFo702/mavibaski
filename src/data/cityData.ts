export interface CityInfo {
  plateCode: number;
  name: string;
  slug: string; // e.g. 'istanbul-matbaa'
  region: string;
  districts: string[];
  deliveryDays: string;
  economyNote: string;
}

export interface CityLink {
  name: string;
  slug: string;
  region: string;
  featured?: boolean;
  sectorNote?: string;
}

export interface DistrictReference {
  name: string;
  slug?: string;
  active: boolean;
}

export const FEATURED_CITIES_MAP: Record<string, string> = {
  "istanbul-matbaa": "Türkiye'nin ticaret ve finans merkezi, kurumsal firmalar, ajanslar ve perakende devleri.",
  "ankara-matbaa": "Kurumsal firmalar, kamu tedarikçileri, danışmanlık şirketleri, eğitim kurumları ve organizasyon işletmeleri.",
  "izmir-matbaa": "Ege'nin sanayi ve ticaret merkezi, ihracatçılar, gıda, turizm ve perakende işletmeleri.",
  "mugla-matbaa": "Bodrum, Fethiye, Marmaris turizm tesisleri, otel, restoran, marinalar ve emlak işletmeleri.",
  "antalya-matbaa": "Otel, restoran, kafe, turizm, transfer, araç kiralama ve konaklama işletmeleri.",
  "adana-matbaa": "Gıda, restoran, sanayi, tarım, lojistik ve perakende işletmeleri.",
  "balikesir-matbaa": "Gıda üreticileri, zeytin ve zeytinyağı markaları, turizm işletmeleri, restoran ve mağazalar.",
  "canakkale-matbaa": "Turizm, konaklama, restoran, emlak, yerel üretici ve perakende işletmeleri.",
  "corum-matbaa": "Sanayi, makine, gıda, perakende, restoran ve kurumsal işletmeler.",
  "samsun-matbaa": "Sağlık, otomotiv, gıda, lojistik, sanayi, restoran ve ticaret işletmeleri.",
  "sinop-matbaa": "Turizm, konaklama, restoran, kafe, yerel ürün ve perakende işletmeleri.",
  "ordu-matbaa": "Fındık, gıda, tarım, restoran, turizm, mağaza ve yerel üretici işletmeleri.",
  "trabzon-matbaa": "Turizm, restoran, otel, gıda, inşaat, otomotiv ve ticaret işletmeleri.",
  "rize-matbaa": "Çay, gıda, turizm, konaklama, restoran ve yerel ürün işletmeleri.",
  "van-matbaa": "Gıda, tekstil, perakende, turizm, otomotiv, inşaat ve kurumsal işletmeler.",
  "bitlis-matbaa": "Tatvan ve çevresi dahil turizm, gıda, perakende, inşaat, otomotiv ve yerel işletmeler.",
  "mardin-matbaa": "Turizm, otel, restoran, yöresel ürün, gıda ambalajı, mağaza ve ihracat işletmeleri."
};

export const FEATURED_CITY_SLUGS: string[] = [
  "istanbul-matbaa",
  "ankara-matbaa",
  "izmir-matbaa",
  "mugla-matbaa",
  "antalya-matbaa",
  "adana-matbaa",
  "balikesir-matbaa",
  "canakkale-matbaa",
  "corum-matbaa",
  "samsun-matbaa",
  "sinop-matbaa",
  "ordu-matbaa",
  "trabzon-matbaa",
  "rize-matbaa",
  "van-matbaa",
  "bitlis-matbaa",
  "mardin-matbaa"
];

export const MUGLA_DISTRICTS_DATA: DistrictReference[] = [
  { name: "Bodrum", active: false },
  { name: "Fethiye", active: false },
  { name: "Marmaris", active: false },
  { name: "Milas", active: false },
  { name: "Ortaca", active: false },
  { name: "Dalaman", active: false },
  { name: "Datça", active: false },
  { name: "Köyceğiz", active: false },
  { name: "Ula", active: false },
  { name: "Yatağan", active: false }
];

export const GEOGRAPHICAL_REGIONS: string[] = [
  "Marmara Bölgesi",
  "Ege Bölgesi",
  "Akdeniz Bölgesi",
  "İç Anadolu Bölgesi",
  "Karadeniz Bölgesi",
  "Doğu Anadolu Bölgesi",
  "Güneydoğu Anadolu Bölgesi"
];

export const CITIES_DATA: CityInfo[] = [
  {
    plateCode: 1,
    name: "Adana",
    slug: "adana-matbaa",
    region: "Akdeniz Bölgesi",
    districts: ["Seyhan", "Yüreğir", "Çukurova", "Sarıçam", "Ceyhan", "Kozan", "Karataş"],
    deliveryDays: "24-48 Saat",
    economyNote: "Seyhan, Yüreğir, Çukurova, Sarıçam, Ceyhan ve Kozan tarım, tekstil, gıda ambalajı, restoran ve sanayi şirketleri."
  },
  {
    plateCode: 2,
    name: "Adıyaman",
    slug: "adiyaman-matbaa",
    region: "Güneydoğu Anadolu Bölgesi",
    districts: ["Merkez", "Kahta", "Gölbaşı", "Besni"],
    deliveryDays: "48-72 Saat",
    economyNote: "Tekstil, turizm ve yerel işletmelere yönelik kurumsal matbaa çözümleri."
  },
  {
    plateCode: 3,
    name: "Afyonkarahisar",
    slug: "afyonkarahisar-matbaa",
    region: "Ege Bölgesi",
    districts: ["Merkez", "Sandıklı", "Dinar", "Bolvadin"],
    deliveryDays: "24-48 Saat",
    economyNote: "Gıda, termal turizm, mermer ve ticaret sektörlerine özel koli, etiket ve katalog çözümleri."
  },
  {
    plateCode: 4,
    name: "Ağrı",
    slug: "agri-matbaa",
    region: "Doğu Anadolu Bölgesi",
    districts: ["Merkez", "Doğubayazıt", "Patnos", "Eleşkirt"],
    deliveryDays: "48-72 Saat",
    economyNote: "Sınır ticareti, hayvancılık ve yerel esnafa özel kurumsal kimlik baskıları."
  },
  {
    plateCode: 5,
    name: "Amasya",
    slug: "amasya-matbaa",
    region: "Karadeniz Bölgesi",
    districts: ["Merkez", "Merzifon", "Suluova", "Taşova"],
    deliveryDays: "24-48 Saat",
    economyNote: "Tarım, gıda işleme ve kültürel turizm işletmelerine yönelik matbaa imalatı."
  },
  {
    plateCode: 6,
    name: "Ankara",
    slug: "ankara-matbaa",
    region: "İç Anadolu Bölgesi",
    districts: ["Çankaya", "Keçiören", "Yenimahalle", "Mamak", "Etimesgut", "Sincan", "Ostim", "İvedik OSB", "Gölbaşı", "Akyurt"],
    deliveryDays: "24 Saat",
    economyNote: "Çankaya, Ostim OSB, İvedik OSB, Sincan, Kızılay, Keçiören, Yenimahalle ve Mamak kamu tedarikçileri, savunma sanayii, sağlık sektörü ve kurumsal firmalara özel."
  },
  {
    plateCode: 7,
    name: "Antalya",
    slug: "antalya-matbaa",
    region: "Akdeniz Bölgesi",
    districts: ["Muratpaşa", "Kepez", "Konyaaltı", "Alanya", "Manavgat", "Serik", "Kemer", "Belek", "Kaş"],
    deliveryDays: "24-48 Saat",
    economyNote: "Muratpaşa, Kepez, Konyaaltı, Alanya, Manavgat, Serik, Kemer, Belek ve Kaş otelleri, restoran, acente, turizm tesisleri ve tarımsal ambalaj gereksinimleri."
  },
  {
    plateCode: 8,
    name: "Artvin",
    slug: "artvin-matbaa",
    region: "Karadeniz Bölgesi",
    districts: ["Merkez", "Hopa", "Borçka", "Arhavi"],
    deliveryDays: "48 Saat",
    economyNote: "Doğa turizmi, dış ticaret ve yerel hizmet sektörlerine özel baskı ürünleri."
  },
  {
    plateCode: 9,
    name: "Aydın",
    slug: "aydin-matbaa",
    region: "Ege Bölgesi",
    districts: ["Efeler", "Nazilli", "Söke", "Kuşadası", "Didim"],
    deliveryDays: "24-48 Saat",
    economyNote: "Zeytincilik, turizm, tarımsal ürün gıda etiketleri ve ambalaj kutusu ihtiyaçları."
  },
  {
    plateCode: 10,
    name: "Balıkesir",
    slug: "balikesir-matbaa",
    region: "Marmara Bölgesi",
    districts: ["Altıeylül", "Karesi", "Bandırma", "Edremit", "Gönen", "Ayvalık", "Burhaniye", "Susurluk"],
    deliveryDays: "24 Saat",
    economyNote: "Altıeylül, Karesi, Bandırma, Edremit, Gönen, Ayvalık, Burhaniye gıda üreticileri, zeytin ve zeytinyağı markaları, restoran ve yazlık turizm."
  },
  {
    plateCode: 11,
    name: "Bilecik",
    slug: "bilecik-matbaa",
    region: "Marmara Bölgesi",
    districts: ["Merkez", "Bozüyük", "Söğüt", "Osmaneli"],
    deliveryDays: "24 Saat",
    economyNote: "Seramik, madencilik ve organize sanayi bölgelerine doğrudan fabrika teslimi baskı."
  },
  {
    plateCode: 12,
    name: "Bingöl",
    slug: "bingol-matbaa",
    region: "Doğu Anadolu Bölgesi",
    districts: ["Merkez", "Genç", "Solhan", "Karlıova"],
    deliveryDays: "48-72 Saat",
    economyNote: "Arıcılık, hayvancılık ve yerel ticari işletmelere özel logo baskılı çözümler."
  },
  {
    plateCode: 13,
    name: "Bitlis",
    slug: "bitlis-matbaa",
    region: "Doğu Anadolu Bölgesi",
    districts: ["Tatvan", "Ahlat", "Güroymak", "Hizan", "Merkez", "Mutki", "Adilcevaz"],
    deliveryDays: "48-72 Saat",
    economyNote: "Tatvan, Ahlat, Güroymak, Hizan tekstil, gıda, perakende, tarihi turizm ve yöresel üretici işletmeleri."
  },
  {
    plateCode: 14,
    name: "Bolu",
    slug: "bolu-matbaa",
    region: "Karadeniz Bölgesi",
    districts: ["Merkez", "Gerede", "Mudurnu", "Göynük"],
    deliveryDays: "24 Saat",
    economyNote: "Gıda entegre tesisleri, doğa turizmi ve lojistik lokasyonlu sanayi firmalarına özel."
  },
  {
    plateCode: 15,
    name: "Burdur",
    slug: "burdur-matbaa",
    region: "Akdeniz Bölgesi",
    districts: ["Merkez", "Bucak", "Gölhisar"],
    deliveryDays: "24-48 Saat",
    economyNote: "Mermer ihracatçıları, süt ürünleri üreticileri ve yerel esnaflar için kurumsal baskı."
  },
  {
    plateCode: 16,
    name: "Bursa",
    slug: "bursa-matbaa",
    region: "Marmara Bölgesi",
    districts: ["Osmangazi", "Nilüfer", "Yıldırım", "İnegöl", "Gemlik", "Mustafakemalpaşa", "DOSAB", "NOSAB"],
    deliveryDays: "24 Saat",
    economyNote: "Otomotiv yan sanayi, tekstil, mobilya başkenti İnegöl ve organize sanayi devleri için."
  },
  {
    plateCode: 17,
    name: "Çanakkale",
    slug: "canakkale-matbaa",
    region: "Marmara Bölgesi",
    districts: ["Merkez", "Biga", "Çan", "Gelibolu", "Yenice", "Ayvacık", "Ezine", "Lapseki"],
    deliveryDays: "24 Saat",
    economyNote: "Biga, Çan, Gelibolu, Yenice, Ayvacık, Ezine peyniri ve zeytinyağı üreticileri, tarihi turizm, restoran ve konaklama tesisleri."
  },
  {
    plateCode: 18,
    name: "Çankırı",
    slug: "cankiri-matbaa",
    region: "İç Anadolu Bölgesi",
    districts: ["Merkez", "Çerkeş", "Ilgaz"],
    deliveryDays: "24-48 Saat",
    economyNote: "Kaya tuzu imalatçıları, gıda işleme ve sanayi tesisleri için özel etiket ve kutu."
  },
  {
    plateCode: 19,
    name: "Çorum",
    slug: "corum-matbaa",
    region: "Karadeniz Bölgesi",
    districts: ["Sungurlu", "Osmancık", "Alaca", "İskilip", "Merkez", "Bayat"],
    deliveryDays: "24-48 Saat",
    economyNote: "Sungurlu, Osmancık, Alaca, İskilip makine sanayii, gıda işleme, leblebi üreticileri ve ambalaj kutusu ihtiyaçlarına fabrika indirimi."
  },
  {
    plateCode: 20,
    name: "Denizli",
    slug: "denizli-matbaa",
    region: "Ege Bölgesi",
    districts: ["Merkezefendi", "Pamukkale", "Çivril", "Tavas", "Honaz"],
    deliveryDays: "24-48 Saat",
    economyNote: "Ev tekstili ihracatçıları, kablo üreticileri ve Pamukkale turizm tesisleri için."
  },
  {
    plateCode: 21,
    name: "Diyarbakır",
    slug: "diyarbakir-matbaa",
    region: "Güneydoğu Anadolu Bölgesi",
    districts: ["Kayapınar", "Bağlar", "Yenişehir", "Sur", "Ergani", "Bismil"],
    deliveryDays: "48 Saat",
    economyNote: "Bölgesel ticaret, inşaat, gıda ve sağlık sektöründeki kurumsal markalar için."
  },
  {
    plateCode: 22,
    name: "Edirne",
    slug: "edirne-matbaa",
    region: "Marmara Bölgesi",
    districts: ["Merkez", "Keşan", "Uzunköprü", "Havsa"],
    deliveryDays: "24 Saat",
    economyNote: "Sınır kapısı ticareti, çeltik ve yağı imalatçıları ile tarihi turizm işletmelerine."
  },
  {
    plateCode: 23,
    name: "Elazığ",
    slug: "elazig-matbaa",
    region: "Doğu Anadolu Bölgesi",
    districts: ["Merkez", "Kovancılar", "Karakoçan"],
    deliveryDays: "48 Saat",
    economyNote: "Mermer, gıda imalatı, bağcılık ve bölgesel ticaret markalarına özel çözümler."
  },
  {
    plateCode: 24,
    name: "Erzincan",
    slug: "erzincan-matbaa",
    region: "Doğu Anadolu Bölgesi",
    districts: ["Merkez", "Tercan", "Üzümlü"],
    deliveryDays: "48 Saat",
    economyNote: "Peynir imalatçıları, bakırcılık ve yerel hizmet sektörüne özel etiket ve kurumsal evrak."
  },
  {
    plateCode: 25,
    name: "Erzurum",
    slug: "erzurum-matbaa",
    region: "Doğu Anadolu Bölgesi",
    districts: ["Yakutiye", "Palandöken", "Aziziye", "Oltu", "Horasan"],
    deliveryDays: "48 Saat",
    economyNote: "Kış turizmi, Palandöken tesisleri, cağ kebabı restoranları ve eğitim kurumlarına."
  },
  {
    plateCode: 26,
    name: "Eskişehir",
    slug: "eskisehir-matbaa",
    region: "İç Anadolu Bölgesi",
    districts: ["Tepebaşı", "Odunpazarı", "Sivrihisar"],
    deliveryDays: "24 Saat",
    economyNote: "Havacılık, raylı sistemler, gıda devleri ve dinamik öğrenci kenti işletmelerine."
  },
  {
    plateCode: 27,
    name: "Gaziantep",
    slug: "gaziantep-matbaa",
    region: "Güneydoğu Anadolu Bölgesi",
    districts: ["Şahinbey", "Şehitkamil", "Nizip", "İslahiye", "Organize Sanayi Bölgeleri"],
    deliveryDays: "24-48 Saat",
    economyNote: "Türkiye'nin sanayi ve halı başkenti, baklava imalatçıları ve ambalaj kutusu ihtiyaçları."
  },
  {
    plateCode: 28,
    name: "Giresun",
    slug: "giresun-matbaa",
    region: "Karadeniz Bölgesi",
    districts: ["Merkez", "Bulancak", "Espiye", "Görele"],
    deliveryDays: "24-48 Saat",
    economyNote: "Fındık işleme sanayii, gıda ambalajı etiketleri ve sahil ticareti firmaları için."
  },
  {
    plateCode: 29,
    name: "Gümüşhane",
    slug: "gumushane-matbaa",
    region: "Karadeniz Bölgesi",
    districts: ["Merkez", "Kelkit", "Şiran"],
    deliveryDays: "48 Saat",
    economyNote: "Pestil-köme gıda üreticileri, madencilik ve yerel esnafa özel etiket ve kutular."
  },
  {
    plateCode: 30,
    name: "Hakkari",
    slug: "hakkari-matbaa",
    region: "Doğu Anadolu Bölgesi",
    districts: ["Merkez", "Yüksekova", "Şemdinli"],
    deliveryDays: "48-72 Saat",
    economyNote: "Sınır ticareti, madencilik ve yerel işletmelere yönelik doğrudan kargo gönderimi."
  },
  {
    plateCode: 31,
    name: "Hatay",
    slug: "hatay-matbaa",
    region: "Akdeniz Bölgesi",
    districts: ["Antakya", "İskenderun", "Defne", "Dörtyol", "Samandağ"],
    deliveryDays: "24-48 Saat",
    economyNote: "Demir-çelik sanayii, lojistik, künefe/restoran gıda ambalajı ve dış ticaret firmalarına."
  },
  {
    plateCode: 32,
    name: "Isparta",
    slug: "isparta-matbaa",
    region: "Akdeniz Bölgesi",
    districts: ["Merkez", "Eğirdir", "Yalvaç"],
    deliveryDays: "24-48 Saat",
    economyNote: "Gül ve kozmetik ürünleri, elmacılık, gıda etiketleri ve ambalaj kutusu imalatı."
  },
  {
    plateCode: 33,
    name: "Mersin",
    slug: "mersin-matbaa",
    region: "Akdeniz Bölgesi",
    districts: ["Akdeniz", "Toroslar", "Yenişehir", "Mezitli", "Tarsus", "Erdemli", "Silifke"],
    deliveryDays: "24-48 Saat",
    economyNote: "Mersin Limanı lojistik firmaları, narenciye ihracatçıları, tantuni restoranları için."
  },
  {
    plateCode: 34,
    name: "İstanbul",
    slug: "istanbul-matbaa",
    region: "Marmara Bölgesi",
    districts: ["Zeytinburnu", "Topkapı", "İkitelli OSB", "Ümraniye", "Şişli", "Karaköy", "Ataşehir", "Kadıköy", "Levent", "Maslak"],
    deliveryDays: "Aynı Gün / 24 Saat",
    economyNote: "Zeytinburnu, Topkapı, İkitelli OSB, Ümraniye, Şişli, Karaköy, Ataşehir, Kadıköy, Levent, Maslak ve tüm ilçeler için kurumsal matbaa imalatı ve hızlı kargo/kurye."
  },
  {
    plateCode: 35,
    name: "İzmir",
    slug: "izmir-matbaa",
    region: "Ege Bölgesi",
    districts: ["Konak", "Bornova", "Alsancak", "Karşıyaka", "Çiğli OSB", "Buca", "Gaziemir", "Torbalı", "Aliağa", "Menemen", "Çeşme"],
    deliveryDays: "24 Saat",
    economyNote: "Konak, Bornova, Alsancak, Karşıyaka, Çiğli OSB, Buca, Gaziemir, Torbalı, Aliağa sanayi tesisleri, ihracatçılar ve restoran/otel işletmeleri."
  },
  {
    plateCode: 36,
    name: "Kars",
    slug: "kars-matbaa",
    region: "Doğu Anadolu Bölgesi",
    districts: ["Merkez", "Kağızman", "Sarıkamış"],
    deliveryDays: "48-72 Saat",
    economyNote: "Kars gravyer peyniri imalatçıları, kültür turizmi ve kış sporları tesisleri için."
  },
  {
    plateCode: 37,
    name: "Kastamonu",
    slug: "kastamonu-matbaa",
    region: "Karadeniz Bölgesi",
    districts: ["Merkez", "Tosya", "Taşköprü", "Cide"],
    deliveryDays: "24-48 Saat",
    economyNote: "Ahşap sanayii, Taşköprü sarımsak paketleme, Tosya pirinç ambalaj etiketleri."
  },
  {
    plateCode: 38,
    name: "Kayseri",
    slug: "kayseri-matbaa",
    region: "İç Anadolu Bölgesi",
    districts: ["Melikgazi", "Kocasinan", "Talas", "Develi", "Kayseri OSB"],
    deliveryDays: "24 Saat",
    economyNote: "Mobilya devleri, pastırma-sucuk gıda imalatçıları, çelik kapı fabrikaları ve OSB ihracatçıları."
  },
  {
    plateCode: 39,
    name: "Kırklareli",
    slug: "kirklareli-matbaa",
    region: "Marmara Bölgesi",
    districts: ["Merkez", "Lüleburgaz", "Babaeski"],
    deliveryDays: "24 Saat",
    economyNote: "Trakya tekstil tesisleri, cam sanayii, mandıra ve süt ürünleri etiket ve ambalajları."
  },
  {
    plateCode: 40,
    name: "Kırşehir",
    slug: "kirsehir-matbaa",
    region: "İç Anadolu Bölgesi",
    districts: ["Merkez", "Kaman", "Mucur"],
    deliveryDays: "24-48 Saat",
    economyNote: "Otomotiv lastik fabrikaları, Kaman cevizi paketleme ve yerel esnafa özel basılı ürünler."
  },
  {
    plateCode: 41,
    name: "Kocaeli",
    slug: "kocaeli-matbaa",
    region: "Marmara Bölgesi",
    districts: ["İzmit", "Gebze", "Darica", "Körfez", "Gölcük", "Dilovası OSB", "Çayırova"],
    deliveryDays: "24 Saat",
    economyNote: "Sanayinin kalbi İzmit, Gebze teknoparkları ve Dilovası OSB üreticilerine komşu hızlı teslimat."
  },
  {
    plateCode: 42,
    name: "Konya",
    slug: "konya-matbaa",
    region: "İç Anadolu Bölgesi",
    districts: ["Selçuklu", "Karatay", "Meram", "Ereğli", "Akşehir", "Konya OSB"],
    deliveryDays: "24 Saat",
    economyNote: "Tarım makineleri, otomotiv yedek parça, gıda ambalajı ve Türkiye'nin en büyük OSB'leri için."
  },
  {
    plateCode: 43,
    name: "Kütahya",
    slug: "kutahya-matbaa",
    region: "Ege Bölgesi",
    districts: ["Merkez", "Tavşanlı", "Simav", "Gediz"],
    deliveryDays: "24 Saat",
    economyNote: "Çini ve porselen üreticileri, madencilik, linyit ve gıda sanayii şirketleri için."
  },
  {
    plateCode: 44,
    name: "Malatya",
    slug: "malatya-matbaa",
    region: "Doğu Anadolu Bölgesi",
    districts: ["Battalgazi", "Yeşilyurt", "Doğanşehir", "Darende"],
    deliveryDays: "48 Saat",
    economyNote: "Kayısı ihracat kutuları, gıda ambalaj etiketleri ve tekstil fabrikalarına fabrika teslimi."
  },
  {
    plateCode: 45,
    name: "Manisa",
    slug: "manisa-matbaa",
    region: "Ege Bölgesi",
    districts: ["Yunusemre", "Şehzadeler", "Akhisar", "Turgutlu", "Salihli", "Soma"],
    deliveryDays: "24 Saat",
    economyNote: "Elektronik ve beyaz eşya devleri, Akhisar zeytin ambalaj etiketleri ve Manisa OSB."
  },
  {
    plateCode: 46,
    name: "Kahramanmaraş",
    slug: "kahramanmaras-matbaa",
    region: "Akdeniz Bölgesi",
    districts: ["Onikişubat", "Dulkadiroğlu", "Elbistan", "Afşin"],
    deliveryDays: "24-48 Saat",
    economyNote: "Tekstil iplik sanayii, dondurma ambalajı, mutfak eşyası imalatçıları ve kurumsal firmalar."
  },
  {
    plateCode: 47,
    name: "Mardin",
    slug: "mardin-matbaa",
    region: "Güneydoğu Anadolu Bölgesi",
    districts: ["Artuklu", "Kızıltepe", "Nusaybin", "Midyat", "Derik", "Mazıdağı"],
    deliveryDays: "48 Saat",
    economyNote: "Artuklu, Kızıltepe, Nusaybin, Midyat tarihi turizm, otel, restoran, sabun imalatı, un/gıda ambalajı ve ihracat işletmeleri."
  },
  {
    plateCode: 48,
    name: "Muğla",
    slug: "mugla-matbaa",
    region: "Ege Bölgesi",
    districts: ["Bodrum", "Fethiye", "Marmaris", "Milas", "Ortaca", "Dalaman", "Datça", "Köyceğiz", "Ula", "Yatağan", "Menteşe", "Kavaklıdere", "Seydikemer"],
    deliveryDays: "24-48 Saat",
    economyNote: "Muğla merkez ile Bodrum, Fethiye, Marmaris, Milas, Ortaca, Dalaman, Datça, Köyceğiz, Ula ve Yatağan turizm tesisleri, otel, restoran, marinalar, emlak ve araç kiralama işletmeleri."
  },
  {
    plateCode: 49,
    name: "Muş",
    slug: "mus-matbaa",
    region: "Doğu Anadolu Bölgesi",
    districts: ["Merkez", "Bulanık", "Malazgirt"],
    deliveryDays: "48-72 Saat",
    economyNote: "Tarım, hayvancılık ve yerel ticari işletmelere doğrudan hızlı kargo teslimatı."
  },
  {
    plateCode: 50,
    name: "Nevşehir",
    slug: "nevsehir-matbaa",
    region: "İç Anadolu Bölgesi",
    districts: ["Merkez", "Ürgüp", "Avanos", "Gülşehir"],
    deliveryDays: "24-48 Saat",
    economyNote: "Kapadokya turizm otelleri, balon acenteleri, çömlekçilik ve kabak çekirdeği ambalajları."
  },
  {
    plateCode: 51,
    name: "Niğde",
    slug: "nigde-matbaa",
    region: "İç Anadolu Bölgesi",
    districts: ["Merkez", "Bor"],
    deliveryDays: "24-48 Saat",
    economyNote: "Elma soğuk hava depoları, patates işleme entegre tesisleri ve Bor OSB için."
  },
  {
    plateCode: 52,
    name: "Ordu",
    slug: "ordu-matbaa",
    region: "Karadeniz Bölgesi",
    districts: ["Altınordu", "Ünye", "Fatsa", "Perşembe", "Gölköy"],
    deliveryDays: "24-48 Saat",
    economyNote: "Altınordu, Ünye, Fatsa, Perşembe fındık sanayii ihracat ambalajları, fındık ezmesi etiketleri, restoran ve yerel üreticiler."
  },
  {
    plateCode: 53,
    name: "Rize",
    slug: "rize-matbaa",
    region: "Karadeniz Bölgesi",
    districts: ["Merkez", "Çayeli", "Ardeşen", "Pazar", "Fındıklı", "Çamlıhemşin"],
    deliveryDays: "24-48 Saat",
    economyNote: "Çayeli, Ardeşen, Pazar, Fındıklı, Çamlıhemşin çay fabrikaları ambalaj kutuları, yayla turizmi konaklama tesisleri ve yerel işletmeler."
  },
  {
    plateCode: 54,
    name: "Sakarya",
    slug: "sakarya-matbaa",
    region: "Marmara Bölgesi",
    districts: ["Adapazarı", "Serdivan", "Erenler", "Hendek", "Akyazı", "Karasu"],
    deliveryDays: "24 Saat",
    economyNote: "Otomotiv sanayii, vagon imalatı, Hendek OSB fabrikaları ve süs bitkisi üreticilerine."
  },
  {
    plateCode: 55,
    name: "Samsun",
    slug: "samsun-matbaa",
    region: "Karadeniz Bölgesi",
    districts: ["Atakum", "İlkadım", "Canik", "Tekkeköy OSB", "Bafra", "Çarşamba", "Havza"],
    deliveryDays: "24-48 Saat",
    economyNote: "Atakum, İlkadım, Canik, Tekkeköy OSB, Bafra ve Çarşamba sağlık, otomotiv, gıda, lojistik, sanayi ve ticaret işletmeleri."
  },
  {
    plateCode: 56,
    name: "Siirt",
    slug: "siirt-matbaa",
    region: "Güneydoğu Anadolu Bölgesi",
    districts: ["Merkez", "Kurtalan", "Pervari"],
    deliveryDays: "48 Saat",
    economyNote: "Siirt fıstığı, Pervari balı gıda etiketleri, battaniye imalatçıları ve ticari firmalar."
  },
  {
    plateCode: 57,
    name: "Sinop",
    slug: "sinop-matbaa",
    region: "Karadeniz Bölgesi",
    districts: ["Boyabat", "Gerze", "Ayancık", "Merkez", "Durağan"],
    deliveryDays: "24-48 Saat",
    economyNote: "Boyabat, Gerze, Ayancık su ürünleri işleme, toprak/tuğla sanayii, konaklama, restoran ve sahil turizmi işletmeleri."
  },
  {
    plateCode: 58,
    name: "Sivas",
    slug: "sivas-matbaa",
    region: "İç Anadolu Bölgesi",
    districts: ["Merkez", "Şarkışla", "Suşehri"],
    deliveryDays: "24-48 Saat",
    economyNote: "Demiryolu makineleri, medikal sanayii, Sivas OSB fabrikaları ve kurumsal şirketler."
  },
  {
    plateCode: 59,
    name: "Tekirdağ",
    slug: "tekirdag-matbaa",
    region: "Marmara Bölgesi",
    districts: ["Süleymanpaşa", "Çorlu", "Çerkezköy", "Kapaklı", "Ergene", "Malkara"],
    deliveryDays: "24 Saat",
    economyNote: "Çorlu ve Çerkezköy dev sanayi bölgeleri, tekstil, un, yağ ve ambalaj kutusu ihtiyaçları."
  },
  {
    plateCode: 60,
    name: "Tokat",
    slug: "tokat-matbaa",
    region: "Karadeniz Bölgesi",
    districts: ["Merkez", "Erbaa", "Niksar", "Turhal"],
    deliveryDays: "24-48 Saat",
    economyNote: "Tekstil imalatı, Niksar su ve gıda paketleme etiketleri, tarımsal ambalaj çözümleri."
  },
  {
    plateCode: 61,
    name: "Trabzon",
    slug: "trabzon-matbaa",
    region: "Karadeniz Bölgesi",
    districts: ["Ortahisar", "Akçaabat", "Yomra", "Of", "Araklı", "Arsin OSB", "Sürmene", "Vakfıkebir"],
    deliveryDays: "24-48 Saat",
    economyNote: "Ortahisar, Akçaabat, Yomra, Of, Araklı, Arsin OSB otel, restoran, turizm, gıda, inşaat, otomotiv ve ticaret işletmeleri."
  },
  {
    plateCode: 62,
    name: "Tunceli",
    slug: "tunceli-matbaa",
    region: "Doğu Anadolu Bölgesi",
    districts: ["Merkez", "Ovacık", "Pertek"],
    deliveryDays: "48 Saat",
    economyNote: "Organik bal ve bakliyat üreticileri, doğa sporları turizmi ve yerel işletmeler."
  },
  {
    plateCode: 63,
    name: "Şanlıurfa",
    slug: "sanliurfa-matbaa",
    region: "Güneydoğu Anadolu Bölgesi",
    districts: ["Haliliye", "Eyyübiye", "Karaköprü", "Siverek", "Viranşehir", "Suruç"],
    deliveryDays: "48 Saat",
    economyNote: "GAP tarım merkezi, pamuk, isot gıda paketleme, Göbeklitepe turizm tesisleri için."
  },
  {
    plateCode: 64,
    name: "Uşak",
    slug: "usak-matbaa",
    region: "Ege Bölgesi",
    districts: ["Merkez", "Banaz", "Eşme"],
    deliveryDays: "24 Saat",
    economyNote: "Geri dönüşüm tekstili, deri sanayii, battaniye üreticileri ve Uşak OSB."
  },
  {
    plateCode: 65,
    name: "Van",
    slug: "van-matbaa",
    region: "Doğu Anadolu Bölgesi",
    districts: ["İpekyolu", "Tuşba", "Edremit", "Erciş", "Muradiye", "Gevaş"],
    deliveryDays: "48 Saat",
    economyNote: "İpekyolu, Tuşba, Edremit, Erciş, Muradiye gıda, tekstil, perakende, Van kahvaltı salonları, turizm ve kurumsal firmalar."
  },
  {
    plateCode: 66,
    name: "Yozgat",
    slug: "yozgat-matbaa",
    region: "İç Anadolu Bölgesi",
    districts: ["Merkez", "Sorgun", "Akdağmadeni"],
    deliveryDays: "24-48 Saat",
    economyNote: "Tarım, çimento sanayii, gıda paketleme ve yerel esnafa özel kurumsal siparişler."
  },
  {
    plateCode: 67,
    name: "Zonguldak",
    slug: "zonguldak-matbaa",
    region: "Karadeniz Bölgesi",
    districts: ["Merkez", "Ereğli", "Çaycuma", "Devrek"],
    deliveryDays: "24-48 Saat",
    economyNote: "Ereğli demir-çelik sanayii, taşkömürü işletmeleri, Çaycuma OSB ve ambalaj etiketleri."
  },
  {
    plateCode: 68,
    name: "Aksaray",
    slug: "aksaray-matbaa",
    region: "İç Anadolu Bölgesi",
    districts: ["Merkez", "Eskil", "Ortaköy"],
    deliveryDays: "24-48 Saat",
    economyNote: "Otomotiv yan sanayi, süt fabrikaları, Aksaray OSB ve kurumsal kartvizit, kataloglar."
  },
  {
    plateCode: 69,
    name: "Bayburt",
    slug: "bayburt-matbaa",
    region: "Karadeniz Bölgesi",
    districts: ["Merkez", "Aydıntepe", "Demirözü"],
    deliveryDays: "48 Saat",
    economyNote: "Mermer, doğal taş ve yerel kamu/özel sektör işletmelerine özel matbaa baskıları."
  },
  {
    plateCode: 70,
    name: "Karaman",
    slug: "karaman-matbaa",
    region: "İç Anadolu Bölgesi",
    districts: ["Merkez", "Ermenek"],
    deliveryDays: "24 Saat",
    economyNote: "Bisküvi, çikolata ve gıda ambalaj kutusu üretim merkezi! Gıda etiketleri ve koli baskıları."
  },
  {
    plateCode: 71,
    name: "Kırıkkale",
    slug: "kirikkale-matbaa",
    region: "İç Anadolu Bölgesi",
    districts: ["Merkez", "Yahşihan", "Keskin"],
    deliveryDays: "24 Saat",
    economyNote: "Makine kimya sanayii, çelik endüstrisi ve başkent Ankara komşu lokasyonu için."
  },
  {
    plateCode: 72,
    name: "Batman",
    slug: "batman-matbaa",
    region: "Güneydoğu Anadolu Bölgesi",
    districts: ["Merkez", "Kozluk", "Sason"],
    deliveryDays: "48 Saat",
    economyNote: "Petrol sanayii, tekstil hazır giyim tesisleri, gıda ve yapı kurumsal evrakları."
  },
  {
    plateCode: 73,
    name: "Şırnak",
    slug: "sirnak-matbaa",
    region: "Güneydoğu Anadolu Bölgesi",
    districts: ["Merkez", "Cizre", "Silopi", "İdil"],
    deliveryDays: "48-72 Saat",
    economyNote: "Cizre ve Silopi sınır ticareti lojistiği, kömür işletmeleri ve yerel firmalar."
  },
  {
    plateCode: 74,
    name: "Bartın",
    slug: "bartin-matbaa",
    region: "Karadeniz Bölgesi",
    districts: ["Merkez", "Amasra", "Ulus"],
    deliveryDays: "24-48 Saat",
    economyNote: "Amasra turizm tesisleri, ahşap yat/tekne imalatı ve Bartın OSB sanayisi için."
  },
  {
    plateCode: 75,
    name: "Ardahan",
    slug: "ardahan-matbaa",
    region: "Doğu Anadolu Bölgesi",
    districts: ["Merkez", "Göle", "Posof"],
    deliveryDays: "48-72 Saat",
    economyNote: "Sınır kapısı ticareti, Göle kaşarı gıda ambalaj etiketleri ve yerel esnaf."
  },
  {
    plateCode: 76,
    name: "Iğdır",
    slug: "igdir-matbaa",
    region: "Doğu Anadolu Bölgesi",
    districts: ["Merkez", "Aralık", "Tuzluca"],
    deliveryDays: "48-72 Saat",
    economyNote: "Üç ülkeye komşu sınır ticareti, kayısı paketleme kutuları ve tarımsal etiketler."
  },
  {
    plateCode: 77,
    name: "Yalova",
    slug: "yalova-matbaa",
    region: "Marmara Bölgesi",
    districts: ["Merkez", "Çiftlikköy", "Çınarcık", "Altınova"],
    deliveryDays: "24 Saat",
    economyNote: "Tersaneler bölgesi Altınova, çiçekçilik/seracılık etiketleri ve termal turizm tesisleri."
  },
  {
    plateCode: 78,
    name: "Karabük",
    slug: "karabuk-matbaa",
    region: "Karadeniz Bölgesi",
    districts: ["Merkez", "Safranbolu", "Yenice"],
    deliveryDays: "24-48 Saat",
    economyNote: "Demir-çelik sanayii devleri, Safranbolu tarihi konak turizmi ve lokum ambalaj kutuları."
  },
  {
    plateCode: 79,
    name: "Kilis",
    slug: "kilis-matbaa",
    region: "Güneydoğu Anadolu Bölgesi",
    districts: ["Merkez", "Elbeyli"],
    deliveryDays: "48 Saat",
    economyNote: "Zeytinyağı ve sabun imalatı, sınır ticareti ve bölgesel kurumsal firma çözümleri."
  },
  {
    plateCode: 80,
    name: "Osmaniye",
    slug: "osmaniye-matbaa",
    region: "Akdeniz Bölgesi",
    districts: ["Merkez", "Kadirli", "Düziçi"],
    deliveryDays: "24-48 Saat",
    economyNote: "Yer fıstığı ambalaj etiketleri, demir-çelik sanayii ve Kadirli OSB üreticileri."
  },
  {
    plateCode: 81,
    name: "Düzce",
    slug: "duzce-matbaa",
    region: "Karadeniz Bölgesi",
    districts: ["Merkez", "Akçakoca", "Gümüşova", "Kaynaşlı"],
    deliveryDays: "24 Saat",
    economyNote: "Otomotiv yan sanayi, fındık kırma tesisleri, Akçakoca turizm ve Düzce OSB fabrikaları."
  }
];

export function getCityBySlug(slug: string): CityInfo | undefined {
  const normSlug = slug.toLowerCase().trim();
  // Ensure we match e.g. "istanbul-matbaa" or "istanbul"
  return CITIES_DATA.find(c => c.slug === normSlug || c.slug === `${normSlug}-matbaa`);
}

import { PRIORITY_CITIES_CONTENT, PriorityCityContent } from './priorityCityContent';
export { PRIORITY_CITIES_CONTENT };
export type { PriorityCityContent };

export function getPriorityCityContent(slug: string): PriorityCityContent | undefined {
  const normSlug = slug.toLowerCase().trim();
  const fullSlug = normSlug.endsWith('-matbaa') ? normSlug : `${normSlug}-matbaa`;
  return PRIORITY_CITIES_CONTENT[fullSlug];
}

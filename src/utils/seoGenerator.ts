import { AFIS_SCHEMAS } from '../data/afisSeo';
import { EL_ILANI_SCHEMAS } from '../data/elIlaniSeo';
import { BROSUR_SCHEMAS } from '../data/brosurSchemas';
import { getHomeSEO } from "../data/homePageContent";
import { PAGE_SEARCH_METADATA } from "../data/pageSearchMetadata";
import { getCitySearchMetadata } from "./citySearchMetadata";
export { injectSEOMetadata } from "./seoMetadata";
import { MAKBUZ_DETAILS, PARA_MAKBUZU_DATA, SOZLESME_BASKI_DATA, ADISYON_DATA, SIPARIS_FISI_DATA, SIGORTA_POLICELERI_DATA, ARAC_KIRALAMA_DATA, GIDER_MAKBUZU_DATA, GIRIS_BILETI_DATA, PERAKENDE_SATIS_FISI_DATA } from "../data/makbuzData";
import { SEO_PAGES_DATA } from "../data/seoPagesData";
import { BLOG_POSTS } from "../data/blogData";
import { getBlogMetadata } from "./blogMetadata";
import { CITIES_DATA } from "../data/cityData";
import { SECTOR_IMAGE_MANIFEST, AMBALAJ_IMAGE_MANIFEST, ETIKET_IMAGE_MANIFEST } from "../generated/sectorImageManifest";
import { KUTU_SEO_METADATA, KUTU_FAQS, KUTU_SCHEMAS, generateKutuSSRBodyContent } from "../data/kutuPageContent";
import { AMBALAJ_SEO_METADATA, AMBALAJ_SCHEMAS, generateAmbalajSSRBodyContent } from "../data/ambalajPageContent";
import { KUP_BLOKNOT_SEO_METADATA, KUP_BLOKNOT_SCHEMAS, generateKupBloknotSSRBodyContent } from "../data/kupBloknotPageContent";
import { ETIKET_SEO_METADATA, ETIKET_SCHEMAS, generateEtiketSSRBodyContent } from "../data/etiketPageContent";
import { BLOKNOTLAR_SEO_METADATA, BLOKNOTLAR_SCHEMAS } from "../data/bloknotlarPageContent";
import { ANTETLI_SEO_METADATA, ANTETLI_SCHEMAS } from "../data/antetliPageContent";
import { KATALOG_FAQS, KATALOG_DATA, KARTON_CANTA_DATA, ZARF_FAQS } from "../data/extraProductData";
import { DOSYALAR_DETAILS } from "../data/dosyalarPageContent";
export const citySlugs = new Set(CITIES_DATA.map(c => c.slug));

export const knownStaticRoutes = new Set([
  '/',
  '/kutu',
  '/ambalaj',
  '/kartvizit',
  '/brosur',
  '/el-ilani',
  '/afis',
  '/antetli',
  '/dosyalar',
  '/etiket',
  '/oto-paspas',
  '/kup-bloknot',
  '/magnet',
  '/kitap-ayraci',
  '/yag-karti',
  '/bloknotlar',
  '/bloknot',
  '/amerikan-servis',
  '/karton-canta',
  '/zarf',
  '/kataloglar',
  '/makbuz-ve-formlar',
  '/makbuz',
  '/adisyon',
  '/siparis-fisi',
  '/siparis-fisi-baski-fiyatlari',
  '/perakende-satis-fisi',
  '/para-makbuzu',
  '/sozlesme-baski',
  '/sigorta-policeleri',
  '/tahsilat-makbuzu',
  '/arac-kiralama',
  '/gider-makbuzu',
  '/giris-bileti',
  '/recete',
  '/tediye-makbuzu',
  '/cilt-isleri',
  '/matbaa',
  '/referanslar',
  '/sikca-sorulan',
  '/grafik-tasarim',
  '/hakkimizda',
  '/iletisim',
  '/blog',
  '/makine-parkuru',
  '/teslimat-sartlari',
  '/lisans',
  '/mesafeli-satis-sozlesmesi',
  '/iptal-ve-iade-sartlari',
  '/gizlilik-politikasi',
  '/cerez-politikasi',
  '/kullanim-sartlari'
]);

export const URL_REDIRECTS: Record<string, string> = {
  "/blog/matbaa-tasarimi-nasil-hazirlanir": "/blog/baskiya-uygun-tasarim-nasil-hazirlanir",
  "/siparis-fisi-baski-fiyatlari": "/siparis-fisi",
  "/sozlesme": "/sozlesme-baski",
  "/bloknot": "/bloknotlar",
  "/antetli-kagit": "/antetli",
  "/cepli-dosya": "/dosyalar",
  "/favicon.ico": "/mavilogo.png",
  "/blog/ofset-baski-ile-dijital-baski-farki": "/blog/ofset-baski-ile-dijital-baski-farklari",
  "/blog/ofset-baski-ve-dijital-baski-farklari": "/blog/ofset-baski-ile-dijital-baski-farklari",
  "/makbuz": "/makbuz-ve-formlar",
  "/katalog": "/kataloglar",
  "/servis-formu": "/arac-kiralama",
  "/sektor/kozmetik-guzellik-saglik-baski": "/sektor/kozmetik-guzellik-merkezi-baski",
  "/sektor/e-ticaret-baski": "/sektor/e-ticaret-perakende-baski",
  "/sektor/gida-kooperatif-baski": "/sektor/kutu-ambalaj-baski-cozumleri"
};

export function isKnownRoute(pathname: string): boolean {
  let p = pathname.trim().toLowerCase();
  if (p.length > 1 && p.endsWith('/')) {
    p = p.substring(0, p.length - 1);
  }
  if (!p) p = '/';

  if (URL_REDIRECTS[p] || URL_REDIRECTS[pathname]) return false;

  if (knownStaticRoutes.has(p)) return true;

  const cleanSlug = p.startsWith('/') ? p.substring(1) : p;
  if (citySlugs.has(cleanSlug)) return true;

  if (p.startsWith('/blog/')) {
    const slug = p.substring('/blog/'.length);
    return BLOG_POSTS.some(bp => bp.slug === slug);
  }

  const seoMatch = Object.values(SEO_PAGES_DATA).some(item => {
    const itemPath = item.path.trim().toLowerCase();
    return itemPath === p || `/sektor${itemPath}` === p || itemPath === `/sektor${p}`;
  });
  if (seoMatch) return true;

  if (p.startsWith('/sektor/')) {
    const slug = p.substring('/sektor/'.length);
    return Boolean(SEO_PAGES_DATA[slug]);
  } else {
    return Boolean(SEO_PAGES_DATA[cleanSlug]);
  }
}

// Predefined Static SEO Pages Dictionary
export const staticPages: Record<string, { title: string; desc: string }> = {
  "/": {
    title: PAGE_SEARCH_METADATA["/"].title,
    desc: PAGE_SEARCH_METADATA["/"].desc
  },
  "/el-ilani": {
    title: "El İlanı Baskı Fiyatları | A3, A4, A5 ve Dar Ebat",
    desc: "A3, A4, A5 ve dar ebat el ilanı baskı fiyatlarını inceleyin. 105 gr kuşe fiyatları ile farklı gramaj, ölçü, baskı yönü ve adet teklifleri."
  },
  "/afis": {
    title: "Afiş Baskı Fiyatları | 35x50 - 50x70 - 70x100 cm",
    desc: "35x50, 50x70 ve 70x100 cm afiş baskı fiyatlarını inceleyin. 105, 135, 170 gr kuşe ve Blueback afiş poster baskı seçenekleri için teklif alın."
  },
  "/antetli": {
    title: ANTETLI_SEO_METADATA.title,
    desc: ANTETLI_SEO_METADATA.desc
  },
  "/dosyalar": {
    title: "Cepli Dosya Baskı Fiyatları | Kuşe ve Selefon | Mavi Basım",
    desc: "Kuşe cepli dosya baskı fiyatlarını; 500 ve 1.000 adet, tek veya çift yön baskı, mat/parlak selefon ve lak seçenekleriyle inceleyin."
  },
  "/etiket": {
    title: ETIKET_SEO_METADATA.title,
    desc: ETIKET_SEO_METADATA.desc
  },
  "/oto-paspas": {
    title: "Oto Paspas Baskı Fiyatları | Logolu Kağıt Oto Paspas",
    desc: "1.000, 2.000 ve 5.000 adet logolu oto paspas baskı fiyatlarını inceleyin. 34x49 cm, 80 gr kraft kağıt ve tek renk baskı seçenekleri."
  },
  "/kitap-ayraci": {
    title: PAGE_SEARCH_METADATA["/kitap-ayraci"].title,
    desc: PAGE_SEARCH_METADATA["/kitap-ayraci"].desc
  },
  "/yag-karti": {
    title: PAGE_SEARCH_METADATA["/yag-karti"].title,
    desc: PAGE_SEARCH_METADATA["/yag-karti"].desc
  },
  "/bloknotlar": {
    title: BLOKNOTLAR_SEO_METADATA.title,
    desc: BLOKNOTLAR_SEO_METADATA.desc
  },
  "/brosur": {
    title: "Broşür Baskı Fiyatları | A4, A5 ve Katlamalı Broşür",
    desc: "A4, A5 ve A3 broşür baskı fiyatlarını; 115, 130 ve 200 gr kuşe seçeneklerini inceleyin. Katlama, ölçü ve baskı dosyası bilgilerini öğrenin."
  },
  "/kutu": {
    title: KUTU_SEO_METADATA.title,
    desc: KUTU_SEO_METADATA.desc
  },
  "/ambalaj": {
    title: AMBALAJ_SEO_METADATA.title,
    desc: AMBALAJ_SEO_METADATA.desc
  },
  "/kup-bloknot": {
    title: KUP_BLOKNOT_SEO_METADATA.title,
    desc: KUP_BLOKNOT_SEO_METADATA.desc
  },
  "/bloknot": {
    title: "Bloknot Defter Baskı Fiyatları | Spiralli & Tutkallı Notluk - Mavi Basım",
    desc: "Toplantı ve promosyon hediyelik not defteri olarak spiralli, tutkallı, kapaklı veya düz bloknot baskısı. Topkapı hizmet noktamızdan toptan bloknot defterleri."
  },
  "/siparis-fisi-baski-fiyatlari": {
    title: PAGE_SEARCH_METADATA["/siparis-fisi-baski-fiyatlari"].title,
    desc: PAGE_SEARCH_METADATA["/siparis-fisi-baski-fiyatlari"].desc
  },
  "/cilt-isleri": {
    title: PAGE_SEARCH_METADATA["/cilt-isleri"].title,
    desc: PAGE_SEARCH_METADATA["/cilt-isleri"].desc
  },
  "/makine-parkuru": {
    title: PAGE_SEARCH_METADATA["/makine-parkuru"].title,
    desc: PAGE_SEARCH_METADATA["/makine-parkuru"].desc
  },
  "/amerikan-servis": {
    title: "Amerikan Servis Baskı Fiyatları | Kağıt Servis Altlığı",
    desc: "2.000 adet Amerikan servis baskı fiyatlarını inceleyin. 90 gr ve 120 gr 1. hamur ile 100 gr kuşe kağıt servis altlığı seçenekleri."
  },
  "/karton-canta": {
    title: PAGE_SEARCH_METADATA["/karton-canta"].title,
    desc: PAGE_SEARCH_METADATA["/karton-canta"].desc
  },
  "/zarf": {
    title: "Zarf Baskı Fiyatları | Diplomat ve Torba Zarf - Mavi Basım",
    desc: "Diplomat ve torba zarf baskı fiyatlarını inceleyin. Pencereli, penceresiz ve logolu zarf seçenekleri için ölçü, adet ve baskı bilgilerinize göre teklif alın."
  },
  "/kataloglar": {
    title: PAGE_SEARCH_METADATA["/kataloglar"].title,
    desc: PAGE_SEARCH_METADATA["/kataloglar"].desc
  },
  "/magnet": {
    title: "Magnet Baskı Fiyatları | Buzdolabı ve Özel Kesim Magnet",
    desc: "1.000 adet magnet baskı fiyatlarını inceleyin. 0.50 mm mıknatıslı, parlak selefonlu buzdolabı, oval ve özel kesim magnet seçenekleri."
  },
  "/kartvizit": {
    title: "Kartvizit Baskı Fiyatları | 1.000 Adet ve Kalın Kartvizit",
    desc: "1.000 adet kartvizit baskı fiyatlarını inceleyin. 250–800 gr, mat veya parlak selefon, kabartma lak, sıvama, özel kesim ve PVC seçenekleri."
  },
  "/makbuz-ve-formlar": {
    title: PAGE_SEARCH_METADATA["/makbuz-ve-formlar"].title,
    desc: PAGE_SEARCH_METADATA["/makbuz-ve-formlar"].desc
  },
  "/para-makbuzu": {
    title: "Numaratörlü Para Makbuzu Baskı Fiyatları | Mavi Basım Matbaa",
    desc: "14×20 cm numaratörlü, otokopili para makbuzu baskı fiyatlarını; 2, 3 ve 4 nüsha seçenekleriyle 5 ciltten itibaren inceleyin."
  },
  "/matbaa": {
    title: PAGE_SEARCH_METADATA["/matbaa"].title,
    desc: PAGE_SEARCH_METADATA["/matbaa"].desc
  },
  "/referanslar": {
    title: "Referanslarımız | Mavi Basım Matbaa & Reklam",
    desc: "Mavi Basım Matbaa & Reklam olarak bugüne kadar başarıyla tamamladığımız kurumsal referanslarımız, matbaa baskı işlerimiz ve müşteri memnuniyeti mesajları."
  },
  "/sikca-sorulan": {
    title: PAGE_SEARCH_METADATA["/sikca-sorulan"].title,
    desc: PAGE_SEARCH_METADATA["/sikca-sorulan"].desc
  },
  "/grafik-tasarim": {
    title: "Grafik Tasarım Hizmetleri | Mavi Basım Matbaa & Reklam",
    desc: "Kurumsal kimliğinizi yansıtan profesyonel grafik tasarım, logo yerleşimi, taşma payı kontrolü ve baskı öncesi onay süreçlerimiz hakkında geniş detaylar."
  },
  "/hakkimizda": {
    title: "Hakkımızda | Mavi Basım Matbaa & Reklam",
    desc: "İstanbul Topkapı'da faaliyet gösteren Mavi Basım Matbaa & Reklam'ın kuruluş felsefesi, teknolojik kalite standartları ve sürdürülebilir baskı çözümleri."
  },
  "/iletisim": {
    title: PAGE_SEARCH_METADATA["/iletisim"].title,
    desc: PAGE_SEARCH_METADATA["/iletisim"].desc
  },
  "/blog": {
    title: PAGE_SEARCH_METADATA["/blog"].title,
    desc: PAGE_SEARCH_METADATA["/blog"].desc
  },
  "/teslimat-sartlari": {
    title: "Teslimat Şartları ve Kargo Gönderim Rehberi | Mavi Basım Matbaa",
    desc: "Mavi Basım Matbaa & Reklam Türkiye geneli 81 il kargo teslimat şartları, matbaa ürün paketleme standartları, kargo süreleri ve hasarlı kargo süreçleri rehberi."
  },
  "/lisans": {
    title: "Görsel Lisansı ve Telif Hakları Politikası | Mavi Basım Matbaa",
    desc: "Mavi Basım Matbaa & Reklam web sitesi ve blog içeriklerinde kullanılan görsel materyallerin lisans koşulları, telif hakları ve kullanım şartları."
  },
  "/mesafeli-satis-sozlesmesi": {
    title: "Mesafeli Satış Sözleşmesi | Mavi Basım Matbaa & Reklam",
    desc: "Mavi Basım mesafeli satış sözleşmesi, sipariş şartları, tarafların hak ve yükümlülükleri ile yasal mevzuata uygun sözleşme metni."
  },
  "/iptal-ve-iade-sartlari": {
    title: "İptal ve İade Şartları | Mavi Basım Matbaa & Reklam",
    desc: "Kişiye ve kuruma özel üretilen matbaa ürünlerinde iptal, iade ve cayma hakkı şartları ile hatalı baskı süreçleri rehberi."
  },
  "/gizlilik-politikasi": {
    title: "Gizlilik Politikası ve KVKK Aydınlatma Metni | Mavi Basım",
    desc: "Mavi Basım Matbaa & Reklam kişisel verilerin korunması kanunu (KVKK) uyumluluğu, müşteri veri güvenliği ve gizlilik politikası."
  },
  "/cerez-politikasi": {
    title: "Çerez Politikası ve Aydınlatma Metni | Mavi Basım",
    desc: "Mavi Basım web sitesinde kullanılan çerez türleri, kullanım amaçları ve çerez yönetimi hakkında aydınlatma metni."
  },
  "/kullanim-sartlari": {
    title: "Kullanım Şartları | Mavi Basım Matbaa & Reklam",
    desc: "Mavi Basım web sitesi kullanım koşulları, fikri mülkiyet hakları, site kuralları ve yasal sorumluluklar."
  }
};

export const PRIORITY_PRODUCT_OG: Record<string, {
  image: string;
  type: string;
  width: string;
  height: string;
  alt: string;
}> = {
  "/kutu": {
    image: "https://mavibasim.com/images/kutu/ozel-kesim-kutu-tasarimi.webp",
    type: "image/webp",
    width: "800",
    height: "533",
    alt: "Mavi Basım özel kesim karton kutu ve ambalaj baskı örnekleri"
  },
  "/ambalaj": {
    image: "https://mavibasim.com/images/ambalaj/baskili-ambalaj-kagidi.webp",
    type: "image/webp",
    width: "1024",
    height: "1024",
    alt: "Mavi Basım baskılı ambalaj kağıdı ve paketleme çözümleri"
  },
  "/kartvizit": {
    image: "https://mavibasim.com/images/kartvizit/kartvizit-baski.webp",
    type: "image/webp",
    width: "800",
    height: "533",
    alt: "Mavi Basım 1000 adet kabartma laklı, sıvamalı ve kalın kartvizit baskı çeşitleri"
  },
  "/brosur": {
    image: "https://mavibasim.com/images/brosur/tanitim-brosuru-ornegi.webp",
    type: "image/webp",
    width: "1536",
    height: "1024",
    alt: "Mavi Basım A4, A5 ve katlamalı tanıtım broşürü baskı örneği"
  },
  "/el-ilani": {
    image: "https://mavibasim.com/images/el-ilani/el-ilani-baski-fiyatlari.webp",
    type: "image/webp",
    width: "800",
    height: "533",
    alt: "Yeşil ve turuncu tasarımlı tanıtım el ilanı örnekleri"
  },
  "/afis": {
    image: "https://mavibasim.com/images/afis/afis-baski-fiyatlari.webp",
    type: "image/webp",
    width: "800",
    height: "533",
    alt: "Mavi Basım 35x50, 50x70 ve 70x100 cm kuşe afiş poster baskı fiyatları"
  },
  "/dosyalar": {
    image: "https://mavibasim.com/images/dosya/cepli-dosya-baski-fiyatlari.webp",
    type: "image/webp",
    width: "1536",
    height: "1024",
    alt: "Mavi Basım 350 gr ve 400 gr kuşe selefonlu cepli dosya ve sunum dosyası modelleri"
  },
  "/etiket": {
    image: "https://mavibasim.com/images/etiket/etiket-baski-fiyatlari.webp",
    type: "image/webp",
    width: "1536",
    height: "1024",
    alt: "Mavi Basım yapışkanlı etiket ve sticker baskı fiyatları"
  },
  "/magnet": {
    image: "https://mavibasim.com/images/magnet/magnet-baski-fiyatlari.webp",
    type: "image/webp",
    width: "1536",
    height: "1024",
    alt: "Mavi Basım buzdolabı magnet baskı fiyatları ve özel kesim magnet modelleri"
  },
  "/amerikan-servis": {
    image: "https://mavibasim.com/images/amerikan-servis/amerikan-servis-baski.webp",
    type: "image/webp",
    width: "768",
    height: "512",
    alt: "Mavi Basım restoran ve kafe için kağıt Amerikan servis baskı çeşitleri"
  },
  "/oto-paspas": {
    image: "https://mavibasim.com/images/oto-paspas/oto-paspas-baski-fiyatlari.webp",
    type: "image/webp",
    width: "1536",
    height: "1024",
    alt: "Oto Paspas Baskı Fiyatları ve 80 gr Kraft Kağıt Paspas Modelleri"
  },
  "/karton-canta": {
    image: "https://mavibasim.com/images/karton-canta/karton-canta-baski-fiyatlari.webp",
    type: "image/webp",
    width: "800",
    height: "533",
    alt: "Mavi Basım lüks ipli karton çanta baskı fiyatları ve mağaza poşeti imalatı"
  },
  "/yag-karti": {
    image: "https://mavibasim.com/images/yag-karti/yag-karti-baski.webp",
    type: "image/webp",
    width: "1536",
    height: "1024",
    alt: "Mavi Basım oto servis bakım ve yağ değişim takip kartı baskı fiyatları"
  },
  "/zarf": {
    image: "https://mavibasim.com/images/zarf/kurumsal-zarf-baski.webp",
    type: "image/webp",
    width: "800",
    height: "533",
    alt: "Mavi Basım pencereli ve penceresiz diplomat zarf ile torba zarf baskı modelleri"
  },
  "/kataloglar": {
    image: "https://mavibasim.com/images/katalog/katalog-baski-fiyatlari.webp",
    type: "image/webp",
    width: "1536",
    height: "1024",
    alt: "Mavi Basım A4 ve A5 tel dikişli ile Amerikan ciltli kurumsal ürün katalog baskısı"
  },
  "/kup-bloknot": {
    image: "https://mavibasim.com/images/kup-bloknot/kup-bloknot-baski-fiyatlari.webp",
    type: "image/webp",
    width: "1536",
    height: "1024",
    alt: "Mavi Basım küp bloknot baskı fiyatları ve logolu promosyon küp notluk modelleri"
  },
  "/antetli": {
    image: ANTETLI_SEO_METADATA.ogImage,
    type: "image/webp",
    width: ANTETLI_SEO_METADATA.ogImageWidth,
    height: ANTETLI_SEO_METADATA.ogImageHeight,
    alt: ANTETLI_SEO_METADATA.ogImageAlt
  }
};

// Internal resolver for SEO metadata based on path
function resolveRawRouteSEO(pathname: string): { title: string; desc: string; canonical: string; extraHead?: string; h1Text?: string; bodyContent?: string; ogImage?: string } {
  let p = pathname.trim();
  // Strip trailing slash except for root to prevent duplicate URL issues in Search Console
  if (p.length > 1 && p.endsWith("/")) {
    p = p.substring(0, p.length - 1);
  }

  const canonical = p === "/" ? "https://mavibasim.com/" : `https://mavibasim.com${p}`;

  // Default SEO metrics (matching the home page)
  let title = "Matbaa ve Baskı Çözümleri | Mavi Basım";
  let desc = "Kartvizit, broşür, kutu, etiket, makbuz, ambalaj ve kurumsal baskı ürünleri için Mavi Basım'dan baskı çözümleri ve teklif alın.";

  // Homepage metadata and visible FAQ share one source.
  if (p === "/" || p === "") return getHomeSEO();

  // 1. Match from our Static Pages Dictionary
  if (p === '/el-ilani') {
    const { jsonLdBreadcrumb: breadcrumbSchema, jsonLdService: serviceSchema, jsonLdFAQ: faqSchema } = EL_ILANI_SCHEMAS;

    let extraHead = `  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(serviceSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;

    const bodyContent = `<h1>El İlanı Baskı Fiyatları ve Ölçüleri</h1>
<p>Kurumsal tanıtım ve bölgesel dağıtım projeleriniz için 105 gr kuşe başta olmak üzere tek ve çift yön <strong>el ilanı baskı</strong> seçeneklerimizi inceleyebilirsiniz. İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktası üzerinden Türkiye geneline anlaşmalı kargo seçeneği sunulmaktadır.</p>
<p>El ilanı fiyatları; net kesim ölçüsü, kâğıt gramajı, tek veya çift yön baskı ve sipariş adedine göre değişir. A4 el ilanı fiyatları ile A5 el ilanı fiyatlarını mevcut ürün kodları ve adet seçenekleri üzerinden karşılaştırabilirsiniz.</p>
<h2>El İlanı Ölçüleri ve Kullanım Alanları</h2>
<p>A5 el ilanı ölçüleri, satın alınacak ürünün net kesim ölçüsüne göre belirtilir. A5 el ilanı baskı fiyatı; kâğıt gramajı, baskı yönü ve sipariş adedine göre değişir.</p>
<p>1.000 adet el ilanı fiyatı, 5.000 adet el ilanı fiyatı ve 10.000 adet el ilanı fiyatı için ebat, kâğıt gramajı ve baskı yönü bilgilerinizi ileterek özel teklif alabilirsiniz. 2.000 adet el ilanı seçeneklerini mevcut fiyat tablosundan inceleyebilirsiniz.</p>
<h2>Fiyat Listesinde Olmayan El İlanı Seçenekleri</h2>
<p>Fiyat listesinde yer almayan özel el ilanı ölçüleri, farklı kâğıt türleri, gramajlar, tek veya çift yön baskı seçenekleri; malzeme tedariki ve teknik uygunluğa göre değerlendirilebilir. 170 gr, 250 gr, 300 gr ve 350 gr kuşe kâğıt seçenekleri de malzeme tedariki ve teknik uygunluğa göre özel teklif kapsamında değerlendirilebilir.</p>
<p>El ilanı baskı fiyatı ve el ilanı bastırma fiyatları; tercih edilen net kesim ölçüsü, kâğıt gramajı, tek veya çift yön renkli baskı seçeneği, sipariş adedi ve talep edilen ek mücellit işlemlerine göre hesaplanır.</p>`;

    return {
      title: staticPages["/el-ilani"].title,
      desc: staticPages["/el-ilani"].desc,
      canonical,
      extraHead,
      h1Text: "El İlanı Baskı Fiyatları ve Ölçüleri",
      bodyContent
    };
  }

  if (p === '/afis') {
    return {
      title: staticPages["/afis"].title,
      desc: staticPages["/afis"].desc,
      canonical,
      extraHead: Object.values(AFIS_SCHEMAS).map(schema =>
        `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('\n'),
      h1Text: "Afiş Baskı Fiyatları ve Poster Ölçüleri"
    };
  }

  if (p === '/brosur') {
    return {
      title: staticPages["/brosur"].title,
      desc: staticPages["/brosur"].desc,
      canonical,
      extraHead: '<meta property="og:image:width" content="1536" /><meta property="og:image:height" content="1024" />\n' + Object.values(BROSUR_SCHEMAS)
        .map(schema => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
        .join('\n'),
      h1Text: "Broşür Baskı Fiyatları ve Ölçüleri"
    };
  }

  if (p === '/magnet') {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Sayfa",
          "item": "https://mavibasim.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Matbaa Ürünleri",
          "item": "https://mavibasim.com/matbaa"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Magnet Baskı Fiyatları",
          "item": "https://mavibasim.com/magnet"
        }
      ]
    };

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Magnet Baskı Fiyatları ve Buzdolabı Magnet Modelleri",
      "image": "https://mavibasim.com/images/magnet/magnet-baski-fiyatlari-ve-cesitleri.webp",
      "description": "1.000 adet magnet baskı fiyatlarını inceleyin. 0.50 mm mıknatıslı, parlak selefonlu buzdolabı, oval ve özel kesim magnet seçenekleri.",
      "brand": {
        "@type": "Brand",
        "name": "Mavi Basım"
      },
      "category": "Magnet Baskı",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": "1180",
        "highPrice": "1250",
        "offerCount": "3",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock"
      }
    };

    const magnetFaqs = [
      {
        q: "Magnet baskı fiyatları ve magnet yaptırma fiyatları nasıl hesaplanır?",
        a: "Magnet baskı fiyatları ve magnet yaptırma fiyatları; tercih edilen kesim türü (düz, oval veya özel kesim), ürün ebadı (48x68 mm veya özel cm² ölçüleri), 0.50 mm mıknatıs kalınlığı, koruyucu parlak selefon kaplama ve sipariş adedine göre hesaplanır. Net maliyetler proje özelliklerine ve baskı adedine göre teklif aşamasında belirlenir."
      },
      {
        q: "1.000 tane magnet ne kadar ve 1.000 adet magnet fiyatı nedir?",
        a: "Fiyat tablomuzda 48x68 mm standart ölçü için 1.000 adet magnet fiyatı MAG1 özel kesimli modelde 1.250 ₺, MAG2 oval kesimli modelde ise 1.180 ₺ olarak sunulmaktadır. '1.000 tane magnet ne kadar' veya 'magnet fiyatları 1000 adet' araması yapan kurumsal müşterilerimiz için en uygun toptan buzdolabı magnet fiyatları ve toptan magnet fiyatları bu standart listede yer almaktadır."
      },
      {
        q: "100 adet magnet fiyatı, 50 tane magnet ne kadar ve 1 adet magnet kaç TL?",
        a: "Standart fiyat listemiz 1.000 adetlik tirajlar için geçerlidir; 100 adet magnet fiyatı, 50 tane magnet ne kadar ve 1 adet magnet kaç TL soruları için standart sabit bir liste fiyatı bulunmamaktadır. Düşük adetli veya numune talepleriniz için WhatsApp destek hattımızdan özel teklif isteyebilirsiniz."
      },
      {
        q: "Magnet çeşitleri nelerdir ve magnet modelleri nasıl seçilir?",
        a: "Piyasada bulunan başlıca magnet çeşitleri nelerdir sorusunun cevabı; düz kesim, oval kesim, özel şekil kesimli buzdolabı magnet modelleri, bloknotlu magnet ve mıknatıslı kartvizit olarak özetlenebilir. Firmanızın tanıtım ihtiyacına ve bütçesine göre magnet modelleri ve fiyatları karşılaştırılarak en uygun model belirlenir."
      },
      {
        q: "Buzdolabı magnet modelleri ile hediyelik magnetlerin farkı nedir?",
        a: "Buzdolabı magnet modelleri genellikle kurumsal tanıtım, paket servis ve iletişim amaçlı 0.50 mm mıknatıs üzerine 250 gr Bristol karton sıvamasıyla hazırlanır. Hediyelik magnet fiyatları ve nikah/kına magnetleri ise daha çok magnet fotoğraf veya resimli magnet formatında kişisel anı amaçlı tasarlanmaktadır. Sayfamızda kurumsal ve ticari amaçlı buzdolabı magnet fiyatları listelenmektedir."
      },
      {
        q: "Magnet mıknatısı, mıknatıslı magnet ve tabaka mıknatıs aynı ürün müdür?",
        a: "Hayır. Tabaka mıknatıs ve magnet mıknatısı ham hammadde malzemesidir; mıknatıslı magnet ise bu mıknatıs tabakasının üzerine baskılı ve selefonlu karton sıvanarak kesilmiş bitmiş ürünü ifade eder. Mavi Basım olarak ham mıknatıs malzemesi değil, firmanıza özel bitmiş baskılı magnet siparişi ve magnet üretimi gerçekleştirmekteyiz."
      },
      {
        q: "Magnet mıknatısı nerede satılır ve magnet mıknatısı toptan alınabilir mi?",
        a: "Magnet mıknatısı nerede satılır ve magnet mıknatısı toptan nasıl tedarik edilir soruları ham manyetik rulo ve tabaka arayanlar tarafından sorulmaktadır. Sayfamız ham hammadde satışı yapmamakta; 0.50 mm mıknatıs tabakası üzerine renkli ofset baskı ve parlak selefon uygulanmış bitmiş kurumsal magnet siparişi sunmaktadır."
      },
      {
        q: "Magnet mıknatısı nasıl yapıştırılır ve yapışkanlı magnet mıknatısı nedir?",
        a: "Yapışkanlı magnet mıknatısı, bir yüzeyi kendinden yapışkanlı olan ham manyetik bant veya tabakadır. Profesyonel matbaa üretiminde 'magnet mıknatısı nasıl yapıştırılır' süreci endüstriyel sıvama makineleriyle 250 gr Bristol baskılı kağıdın 0.50 mm tabaka mıknatıs yüzeyine preslenmesiyle gerçekleştirilir."
      },
      {
        q: "Buzdolabı magnet mıknatısı ve büyük magnet mıknatısı için ölçü nasıl seçilir?",
        a: "Standart buzdolabı magnet mıknatısı için 48x68 mm en yaygın ölçüdür. Büyük magnet mıknatısı veya özel ebatlı projeler için MAG3 cm² birim fiyatı (32.50 ₺) üzerinden hesaplama yapılır. Magnetin tutunması; yüzey türüne, yüzey temizliğine, ölçüye ve ürün ağırlığına göre değişebilir."
      },
      {
        q: "Magnet tasarımı ve özel kesim magnet siparişi nasıl hazırlanır?",
        a: "Magnet tasarımı dosyasının CMYK renk modunda, en az 300 DPI çözünürlükte ve kenarlarından en az 3 mm kesim taşma payı bırakılarak hazırlanması gerekir. Özel kesim magnet siparişi için bıçak kesim çizgisinin vektörel olarak belirtilmesi önerilir. Grafik desteği var."
      }
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": magnetFaqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    };

    let extraHead = `  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(productSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;

    const bodyContent = `<h1>Magnet Baskı Fiyatları ve Buzdolabı Magnet Modelleri</h1>
<p>Kurumsal tanıtım, paket servis ve bölgesel pazarlama faaliyetleriniz için 0.50 mm mıknatıs tabakası, 250 gr Bristol karton sıvaması ve parlak selefon kaplamasıyla sunulan <strong>magnet baskı</strong>, <strong>buzdolabı magnet modelleri</strong>, <strong>özel kesim magnet</strong> ve <strong>mıknatıslı magnet</strong> çeşitlerimizi inceleyebilirsiniz. İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktası üzerinden Türkiye geneline anlaşmalı kargo seçeneği sunulmaktadır.</p>
<p>Ev ve iş yerlerinde metal yüzeylerde görünürlük sağlayan buzdolabı magneti çözümleri, acil aramalarda firmanıza doğrudan ulaşılmasını kolaylaştırır. Farklı ebat, tiraj ve kesim seçenekleri için magnet siparişi oluşturabilir veya özel teklif talep edebilirsiniz.</p>
<h2>Magnet Ölçüleri ve Kesim Çeşitleri</h2>
<p>Standart 48x68 mm buzdolabı magneti modelleri ve fiyatları, oval kesim reklam magneti ve özel şekil kesimli magnet seçenekleri mevcuttur. Büyük magnet mıknatısı projeleri için MAG3 cm² birim fiyatı üzerinden hesaplama yapılabilir.</p>`;

    return {
      title: staticPages["/magnet"].title,
      desc: staticPages["/magnet"].desc,
      canonical,
      extraHead,
      h1Text: "Magnet Baskı Fiyatları ve Buzdolabı Magnet Modelleri",
      bodyContent
    };
  }

    if (p === '/amerikan-servis') {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Sayfa",
          "item": "https://mavibasim.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Matbaa Ürünleri",
          "item": "https://mavibasim.com/matbaa"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Amerikan Servis Baskı",
          "item": "https://mavibasim.com/amerikan-servis"
        }
      ]
    };
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Amerikan Servis Baskı Fiyatları ve Kağıt Modelleri",
      "image": "https://mavibasim.com/images/amerikan-servis/amerikan-servis-baski.webp",
      "description": "2.000 adet Amerikan servis baskı fiyatlarını inceleyin. 90 gr ve 120 gr 1. hamur ile 100 gr kuşe kağıt servis altlığı seçenekleri.",
      "brand": {
        "@type": "Brand",
        "name": "Mavi Basım"
      },
      "category": "Amerikan Servis Baskı",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": "3600",
        "highPrice": "4850",
        "offerCount": "3"
      }
    };

    const amerikanServisFaqs = [
      {
        q: "Logolu ve baskılı servis kağıdı restoranlar için nasıl hazırlanır?",
        a: "Baskılı servis kağıdı, restoran ve kafelerin logosu, kurumsal renkleri ve isteğe bağlı QR kod bilgileriyle hazırlanabilir. Amerikan servis baskı siparişinde kağıt türü, ölçü ve adet seçimi mevcut fiyat listesindeki seçeneklerden yapılır; farklı talepler özel teklif kapsamında değerlendirilir."
      },
      {
        q: "2.000 adet Amerikan servis kağıdı baskısında hangi bilgiler gerekir?",
        a: "Standart Amerikan servis kağıdı baskı seçenekleri için tercih edilen ebat, 90 gr veya 120 gr 1. hamur ya da 100 gr kuşe kağıt türü ve baskı tasarımı belirtilmelidir. Fiyatlar sayfadaki mevcut tablodan incelenebilir; listede olmayan seçenekler için özel teklif istenebilir."
      },
      {
        q: "Amerikan servis baskı fiyatları nasıl hesaplanır?",
        a: "Amerikan servis baskı fiyatları; seçilen ebat, kâğıt türü ve gramajı (90 gr 1. Hamur, 100 gr kuşe veya 120 gr 1. Hamur), baskı adedi ve renk seçeneklerine göre belirlenir. Standart paketlerimiz 2.000 adet üzerinden sunulmakta olup farklı adet seçenekleri için fiyat bilgisi sipariş detaylarına göre paylaşılır."
      },
      {
        q: "Amerikan servis nedir ve işletmelere ne tür faydalar sağlar?",
        a: "Amerikan servis nedir sorusu; restoran, kafe ve otellerde masa düzenini korumak, servis öncesi düzenli bir alan oluşturmak ve marka tanıtımı yapmak amacıyla kullanılan baskılı servis materyali olarak tanımlanabilir. Amerikan servis altlığı, masa sunumunu zenginleştirirken menü veya kampanya detaylarının müşteriye aktarılmasını sağlar."
      },
      {
        q: "Standart ve özel Amerikan servis ölçüleri nelerdir?",
        a: "Sıkça tercih edilen standart Amerikan servis ölçüleri 31x44 cm (A3 ebadına yakın), 27x38 cm ve 34x49 cm boyutlarıdır. Masa boyutlarına ve servis gereksinimlerine göre bu standart ebatlar seçilebileceği gibi özel ebat talepleri de değerlendirilmektedir."
      },
      {
        q: "90 gr ve 120 gr 1. Hamur ile 100 gr kuşe kağıt seçeneklerinin farkları nelerdir?",
        a: "90 gr 1. Hamur mat dokusuyla doğal bir görünüm sunar ve üzerine kalemle kolayca not alınabilir. 120 gr 1. Hamur daha tok bir gövdeye sahiptir. 100 gr kuşe kağıt ise pürüzsüz ve hafif parlak yüzeyi sayesinde fotoğraf ve renkli görsellerin daha canlı görünmesini sağlar."
      },
      {
        q: "Amerikan servis kağıdı fiyatları hangi unsurlara göre değişir?",
        a: "Amerikan servis kağıdı fiyatları; kâğıt ham maddesinin gramajına, seçilen kâğıt cinsine (1. Hamur veya kuşe), sipariş tirajına ve dönemsel hammadde maliyetlerine bağlı olarak değişiklik gösterir."
      },
      {
        q: "Amerikan servis baskısı üzerine logo ve QR kod eklenebilir mi?",
        a: "Evet. Amerikan servis baskısı tasarımında firma logosu, kurumsal renkler, sosyal medya bilgileri ve dijital menüye yönlendiren QR kodlar yer alabilir. Bu sayede Amerikan servis baskılı tasarımı müşterileriniz için interaktif bir menüye dönüşür."
      },
      {
        q: "Kullan at Amerikan servis seçenekleri pratiklik sağlar mı?",
        a: "Kullan at Amerikan servis ürünleri, her servis döngüsünde yeni bir sayfa serilmesine olanak tanıyarak restoran ve kafelerde hızlı servis hazırlığı ve pratik bir masa düzeni sunar."
      },
      {
        q: "Lokanta servis kağıdı ve kağıt servis altlığı tercih edilirken nelere dikkat edilmelidir?",
        a: "Lokanta servis kağıdı ve kağıt servis altlığı seçiminde masa ölçüsü, servis yoğunluğu ve tasarımın okunabilirliği dikkate alınmalıdır. Doğal ve sade bir sunum için Amerikan servis kağıt seçenekleri, görsel ağırlıklı menüler için ise kuşe Amerikan servis modelleri tercih edilir."
      },
      {
        q: "Fiyat listesinde bulunmayan seçenekler için özel teklif nasıl alınır?",
        a: "Fiyat listesinde yer almayan Amerikan servis kağıt modelleri, farklı gramajlar veya yüksek tirajlı siparişler için web sitemizdeki Özel Teklif Al bağlantısı üzerinden talebinizi ileterek özel teklif alabilirsiniz."
      },
      {
        q: "Amerikan servis kağıdı baskı için tasarım dosyası nasıl hazırlanmalıdır?",
        a: "Amerikan servis kağıdı baskı dosyanız, seçilen ebat ve baskı özelliklerine uygun hazırlanmalıdır. Dosya hazırlığına ilişkin teknik ayrıntılar sipariş öncesinde netleştirilir."
      }
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": amerikanServisFaqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    };

    let extraHead = `  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(productSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;

    const bodyContent = `<h1>Amerikan Servis Baskı Fiyatları ve Kağıt Modelleri</h1>
<p>Restoran, kafe, lokanta ve otel gibi yiyecek-içecek işletmelerinde masa düzenini tamamlayan <strong>Amerikan servis baskı</strong> çözümleri, kurumsal kimliğinizi masada sergilemenin ve servis organizasyonunu düzenlemenin pratik bir yoludur. Masalarda kullanılan <strong>kağıt servis altlığı</strong> ürünleri; firmanızın logosunu, güncel menü alternatiflerini, sosyal medya hesaplarını ve dijital menü QR kodlarını müşterilerinizle buluşturur.</p>
<p>Farklı masa ebatlarına uygun olarak hazırlanan <strong>Amerikan servis modelleri</strong>; 90 gr 1. Hamur, 100 gr Kuşe ve 120 gr 1. Hamur kâğıt seçenekleriyle sunulmaktadır. Günlük yoğun kullanıma uygun <strong>kullan at Amerikan servis</strong> çeşitleri, her servis döngüsünde yeni bir sayfa açarak masaların düzenli kalmasına yardımcı olur. Baskılı Amerikan servis seçenekleri; fiyat listesindeki ebat, kağıt türü, gramaj ve adet bilgilerine göre değerlendirilir.</p>
<h2>Amerikan Servis Ölçüleri ve Kağıt Çeşitleri</h2>
<p>Standart Amerikan servis ölçüleri arasında 31x44 cm, 27x38 cm ve 34x49 cm yer almaktadır. Lokanta servis kağıdı ve Amerikan servis altlığı ihtiyaçlarınız için fiyat tablosundan sipariş verebilir veya özel teklif alabilirsiniz.</p>
<div id="fiyat-tablosu">
  <p>Bu sayfadaki standart Amerikan servis baskı paketleri 2.000 adetten başlamaktadır. İlave adetlerin fiyatları tabloda ayrıca gösterilmektedir. Fiyat tablosunda 2.000 adetlik kağıt Amerikan servis baskı seçenekleri; ürün, ebat ve gramaj bilgileriyle birlikte incelenebilir.</p>
  <table>
    <caption>Amerikan Servis Fiyat Listesi</caption>
    <thead>
      <tr>
        <th scope="col">KATEGORİ</th>
        <th scope="col">KOD</th>
        <th scope="col">ADET</th>
        <th scope="col">EBAT</th>
        <th scope="col">AÇIKLAMA</th>
        <th scope="col">FİYAT</th>
        <th scope="col">EKSTRA ADET</th>
        <th scope="col">SİPARİŞ</th>
      </tr>
    </thead>
    <tbody>
  <tr>
    <th scope="rowgroup" rowspan="3">SERVİS</th>
    <th scope="row">SRV1</th>
    <td>2.000 Adet</td>
    <td>31x44 cm</td>
    <td>Tek Yön Renkli Baskı (90 gr. 1.Hamur)</td>
    <td>4.000 ₺</td>
    <td>Her 2.000 Adet için 3.800 ₺</td>
    <td>Hemen Sipariş Ver</td>
  </tr>
  <tr>
    <th scope="row">SRV2</th>
    <td>2.000 Adet</td>
    <td>27x38 cm</td>
    <td>Tek Yön Renkli Baskı (100 gr. Kuşe)</td>
    <td>3.600 ₺</td>
    <td>Her 2.000 Adet için 3.300 ₺</td>
    <td>Hemen Sipariş Ver</td>
  </tr>
  <tr>
    <th scope="row">SRV3</th>
    <td>2.000 Adet</td>
    <td>34x49 cm</td>
    <td>Tek Yön Renkli Baskı (120 gr. 1.Hamur)</td>
    <td>4.850 ₺</td>
    <td>Her 2.000 Adet için 3.900 ₺</td>
    <td>Hemen Sipariş Ver</td>
  </tr>
</tbody>
  </table>
</div>
<section>
  <h2>Masa Düzeninde Kağıt Servis Altlığı Kullanımı</h2>
  <p>Yiyecek-içecek sektöründe masa sunumu, müşterilerin işletmenizle ilk temas noktasıdır. <strong>Kağıt servis altlığı</strong> kullanımı, masalarda temiz bir görsel zemin oluştururken tabak ve bardakların masa yüzeyiyle temasını düzenler. Tek kullanımlık yapısıyla her servis döngüsünde düzenli ve temiz bir masa sunumu oluşturulmasını destekler.</p>
  <p><strong>Lokanta servis kağıdı</strong> olarak da bilinen bu ürünler, işletmeler için pratik bir servis hazırlığı sağlar. Masanın hızlıca toplanıp bir sonraki servise hazır hale getirilmesine katkıda bulunur. Kullan-at Amerikan servis seçenekleri, tek kullanımlık Amerikan servis ürünleriyle birlikte değerlendirilebilir.</p>
</section>
<section>
  <h2>Amerikan Servis Baskı Dosyası Hazırlık Kriterleri</h2>
  <p>Baskılı servis kağıdı ve servis kağıdı tasarımı için mevcut tasarım, logo ve QR kod bilgileri değerlendirilebilir.</p>
</section>
<section aria-labelledby="servis-kagidi-baski-rehberi">
<h2 id="servis-kagidi-baski-rehberi">Baskılı Servis Kağıdı ve Logolu Amerikan Servis Seçenekleri</h2>
<p>Restoran ve kafeler için baskılı servis kağıdı, markanın logosunu ve menüye yönlendiren QR kodunu masada görünür kılabilir. Kağıt Amerikan servis baskı seçeneklerini karşılaştırırken mevcut fiyat listesindeki ebat, gramaj ve sipariş adetlerini esas alın. Tek kullanımlık kağıt Amerikan servis ihtiyacınız için listede olmayan talepler özel teklif kapsamında değerlendirilir.</p>
<p>Masa üstü tanıtım ürünlerinizi <a href="/adisyon">adisyon baskısı</a> ve <a href="/siparis-fisi">sipariş fişi</a> ile tamamlayabilirsiniz.</p>
</section>`;

    return {
      title: staticPages["/amerikan-servis"].title,
      desc: staticPages["/amerikan-servis"].desc,
      canonical,
      extraHead,
      h1Text: "Amerikan Servis Baskı Fiyatları ve Kağıt Modelleri",
      bodyContent
    };
  }

        if (p === '/oto-paspas') {
    const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Ana Sayfa",
      "item": "https://mavibasim.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Matbaa Ürünleri",
      "item": "https://mavibasim.com/matbaa"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Oto Paspas Baskı",
      "item": "https://mavibasim.com/oto-paspas"
    }
  ]
};

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Oto Paspas Baskı Fiyatları ve Logolu Kağıt Paspas",
      "image": "https://mavibasim.com/images/oto-paspas/oto-paspas-baski-fiyatlari.webp",
      "description": "1.000, 2.000 ve 5.000 adet logolu oto paspas baskı fiyatlarını inceleyin. 34x49 cm, 80 gr kraft kağıt ve tek renk baskı seçenekleri.",
      "brand": {
        "@type": "Brand",
        "name": "Mavi Basım"
      },
      "category": "Oto Paspas Baskı",
            "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": "2500",
        "highPrice": "5000",
        "offerCount": "3"
      }
    };

    const otoPaspasFaqs = [
      {
        q: "Oto paspas fiyatları nasıl belirlenir?",
        a: "Oto paspas fiyatları; tercih edilen baskı adedi (1.000, 2.000 veya 5.000 adet), kağıt gramajı ve ebatına göre belirlenir. Standart fiyat listemizde 34x49 cm 80 gr esmer kraft kağıt ve tek yön tek renk baskılı seçenekler yer almakta olup fiyat bilgisi seçilen adet seçeneğine göre değişir."
      },
      {
        q: "80 gr kraft oto paspas kağıdı hangi özelliklere sahiptir?",
        a: "80 gr kraft oto paspas kağıdı, doğal esmer lifli yapısıyla araç içi taban korumasında sıkça tercih edilen tek kullanımlık bir oto paspas kağıt türüdür. Servis ve oto yıkama sonrası araç içi halı yüzeyinin geçici olarak kirlenmesini azaltmaya yardımcı olur."
      },
      {
        q: "Standart 34x49 cm dışında oto paspas kağıdı 50x70 cm üretilebilir mi?",
        a: "Standart paketlerimizde 34x49 cm ebat sunulmaktadır. Daha geniş taban alanları için talep edilen oto paspas kağıdı 50x70 ebadı veya farklı özel ölçüler standart fiyat tablosunda yer almamakta olup özel teklif kapsamında değerlendirilmektedir."
      },
      {
        q: "Oto kağıt paspas 100 adet sipariş edilebilir mi, tiraj seçenekleri nelerdir?",
        a: "Standart ofset baskı fiyat listemiz oto kağıt paspas 1000 adet ve oto kağıt paspas 5000 adet gibi adet seçeneklerinden başlamaktadır. Oto kağıt paspas 100 adet seçeneği standart listede bulunmamakta; düşük veya ara adet talepleri için özel teklif alınması gerekmektedir."
      },
      {
        q: "Suya dayanıklı kağıt paspas var mıdır ve kraft paspas su geçirir mi?",
        a: "Piyasada suya dayanıklı kağıt paspas olarak anılsa da kâğıt paspaslar su geçirmez (waterproof) özellikte değildir. 80 gr kraft kâğıt, ayakkabı tabanındaki sınırlı miktardaki nem ve tozu emmeye yardımcı olabilir; ancak yoğun sıvı veya su birikintisiyle temas için uygun değildir."
      },
      {
        q: "Kağıt oto paspas modelleri ve baskı türleri nelerdir?",
        a: "İşletmeler için sunulan oto paspas modelleri; üzerine marka logosu, iletişim bilgileri ve kurumsal renklerin uygulandığı baskılı oto paspas ve baskılı oto paspas kağıdı seçeneklerinden oluşur. Doğal görünüm için esmer kraft, parlak zeminler için ise beyaz kâğıt modelleri tercih edilebilir."
      },
      {
        q: "Oto paspas tasarımı ve baskıya hazır dosya hazırlığında nelere dikkat edilmelidir?",
        a: "Firma logonuzu ve yazılarınızı vektörel olarak PDF veya AI dosyasında hazırlayın. Tasarımda kullanılan piksel tabanlı görseller, baskı boyutunda en az 300 DPI çözünürlükte olmalıdır; vektörel çizimler için DPI şartı aranmaz. Kesim payı olarak 3 mm taşma bırakılmalıdır. Baskıya hazır dosyanız için teknik kontrol, dijital PDF prova ve grafik desteği sunulmaktadır."
      },
      {
        q: "Oto kağıt paspas baskı için tek renk ile CMYK çok renkli baskı arasındaki fark nedir?",
        a: "Standart paketlerimiz tek yön tek renk (genellikle siyah veya kurumsal tek bir renk) baskılıdır. Çok renkli (CMYK) renk geçişleri veya beyaz 1. hamur kâğıt içeren özel baskı oto paspas talepleri standart tabloda bulunmayıp özel teklif ile fiyatlandırılmaktadır."
      },
      {
        q: "Kâğıt paspas araç içi pedalların altına konulabilir mi ve sürüş güvenliği için ne yapılmalıdır?",
        a: "Hayır. Kâğıt oto paspas kesinlikle gaz, fren veya debriyaj pedallarının altına yerleştirilmemeli ve pedal hareketini engelleyecek şekilde konumlandırılmamalıdır. Araç hareket etmeden önce sürücü tabanındaki kâğıt paspasın konumu mutlaka kontrol edilmeli veya gerektiğinde kaldırılmalıdır."
      },
      {
        q: "Fiyat listesinde bulunmayan özel ölçü, malzeme, renk ve teslimat süresi nasıl belirlenir?",
        a: "Standart dışı ölçüler, beyaz kâğıt seçenekleri veya çok renkli baskılar için Özel Teklif Al bağlantısı üzerinden talebinizi iletebilirsiniz. Siparişlerin teslim süresi; talep edilen adet, baskıya hazır dosya onayı, kâğıt seçimi, baskı rengi ve iş yoğunluğuna bağlı olarak teklif aşamasında netleştirilmektedir."
      }
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": otoPaspasFaqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    };

    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://mavibasim.com/#organization",
      "name": "Mavi Basım Matbaa & Reklam",
      "url": "https://mavibasim.com",
      "logo": "https://mavibasim.com/mavilogo.png",
      "image": "https://mavibasim.com/mavilogo.png",
      "telephone": "+905366022373",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Maltepe Mah. Davutpaşa Cad. Topkapı 2. Matbaacılar Sitesi B Blok No:2NB",
        "addressLocality": "Zeytinburnu",
        "addressRegion": "İstanbul",
        "addressCountry": "TR"
      }
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://mavibasim.com/#website",
      "url": "https://mavibasim.com",
      "name": "Mavi Basım Matbaa",
      "publisher": { "@id": "https://mavibasim.com/#organization" }
    };

    let extraHead = `  <script id="oto-paspas-org-website-schema" type="application/ld+json">${JSON.stringify([orgSchema, websiteSchema])}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(productSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;

    const bodyContent = `<div class="bg-gray-50 border-b border-gray-100 py-3">
  <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="flex text-xs text-gray-500 font-medium" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2 flex-wrap">
        <li class="inline-flex items-center">
          <a href="/" class="text-gray-600 hover:text-primary transition-colors">Ana Sayfa</a>
        </li>
        <li>
          <div class="flex items-center">
            <span class="mx-2 text-gray-400" aria-hidden="true">/</span>
            <a href="/matbaa" class="text-gray-600 hover:text-primary transition-colors">Matbaa Ürünleri</a>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <span class="mx-2 text-gray-400" aria-hidden="true">/</span>
            <span class="text-gray-900 font-semibold" aria-current="page">Oto Paspas Baskı</span>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</div>
<h1>Oto Paspas Baskı Fiyatları ve Logolu Kağıt Paspas</h1>
<figure class="my-4"><img src="/images/oto-paspas/oto-paspas-kagit-baski.webp" alt="Oto Servis ve Bakım İstasyonları İçin Kağıt Paspas Baskı" width="1536" height="1024" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
<p>Oto servis, bakım istasyonları, ekspertiz ve oto yıkama işletmeleri için kurumsal kimliğinizi yansıtan <strong>baskılı oto paspas</strong> ve <strong>baskılı oto paspas kağıdı</strong> çözümleri sunuyoruz. 80 gr esmer kraft kâğıt üzerine tek renk ofset baskı ile hazırlanan <strong>oto kağıt paspas</strong> ürünleri, servis ve temizlik işlemleri sırasında araç tabanının kirlenmesini azaltmaya yardımcı olan pratik ve tek kullanımlık bir koruma sağlar. Siparişleriniz <strong>İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktası</strong> üzerinden koordine edilerek anlaşmalı kargo ile tarafınıza ulaştırılır.</p>
<p>Standart 34x49 cm 80 gr esmer kraft kağıt modellerimiz 1.000, 2.000 ve 5.000 adetlik tiraj seçenekleriyle sunulmaktadır. Farklı ebat, kağıt ve renk seçenekleri için oto paspas fiyatları tablomuzu inceleyebilir veya özel teklif alabilirsiniz.</p>
<h2>Oto Paspas Ölçüleri ve Kraft Kağıt Çeşitleri</h2>
<p>Standart 34x49 cm binek ve hafif ticari araç tabanına uygun ebadın yanı sıra özel projeler için oto paspas kağıdı 50x70 ebatları değerlendirilmektedir. Güvenli sürüş için kâğıt paspasın pedalların altına yerleştirilmemesi gerekmektedir.</p>`;

    return {
      title: staticPages["/oto-paspas"].title,
      desc: staticPages["/oto-paspas"].desc,
      canonical,
      extraHead,
      h1Text: "Oto Paspas Baskı Fiyatları ve Logolu Kağıt Paspas",
      bodyContent,
      ogImage: "https://mavibasim.com/images/oto-paspas/oto-paspas-baski-fiyatlari.webp"
    };
  }

  if (p === '/kartvizit') {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Sayfa",
          "item": "https://mavibasim.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Matbaa Ürünleri",
          "item": "https://mavibasim.com/matbaa"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Kartvizit",
          "item": "https://mavibasim.com/kartvizit"
        }
      ]
    };

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Kartvizit Baskı Fiyatları ve Kalın Kartvizit Modelleri",
      "image": "https://mavibasim.com/images/kartvizit/kartvizit-baski.webp",
      "description": "1.000 adet kartvizit baskı fiyatlarını inceleyin. 250–800 gr, mat veya parlak selefon, kabartma lak, sıvama, özel kesim ve PVC seçenekleri.",
      "brand": {
        "@type": "Brand",
        "name": "Mavi Basım"
      },
      "category": "Kartvizit Baskı",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": "840",
        "highPrice": "4400",
        "offerCount": "17"
      }
    };

    const kartvizitFaqs = [
      {
        q: "Kartvizit nedir ve hangi bilgiler bulunmalıdır?",
        a: "Kartvizit; bir kurumun veya profesyonelin iletişim bilgilerini, unvanını ve marka kimliğini karşı tarafa ileten basılı tanıtım kartıdır. Standart bir kartvizitin üzerinde firma logosu, ad-soyad, unvan, telefon, e-posta, web sitesi adresi ve isteğe bağlı olarak dijital menü veya kurumsal portföye yönlendiren QR kod yer almalıdır."
      },
      {
        q: "Kartvizit Gramajları ve Ebatları Nasıl Seçilir?",
        a: "Kartvizit gramajları 250 gr Bristol ve 350 gr Kuşe kağıttan başlayarak 700 gr ve 800 gr kalın sıvama kartonlara kadar uzanır. Kartvizit ebatları ise cüzdan ve kartlıklara tam uyum sağlayan standart ölçülerin yanı sıra oval köşe veya özel bıçak kesimli modellerle ihtiyaca göre belirlenir."
      },
      {
        q: "Kartvizit Fiyatları 1.000 Adet ve 500 Adet İçin Nasıl Hesaplanır?",
        a: "Standart kâğıt kartvizit modellerimiz 1.000 adetlik paketlerle ofset baskı olarak hesaplanmakta ve listelenmektedir. Plastik PVC kartvizit seçeneğimiz ise 500 adet olarak fiyat tablomuzda yer alır. Standart dışı ara adetler (örneğin 100 adet kâğıt kartvizit gibi) standart fiyat listesinde yer almadığından özel teklif kapsamında hesaplanır. 1.000 adet çift taraflı kartvizit fiyatı karşılaştırılırken iki yüzü renkli baskı ile ön yüzü renkli, arka yüzü tek renk siyah baskı ayrılmalıdır. Ön ve arka yüzü renkli isteyenler, tabloda Çift Yön Renkli olarak açıklanan modelleri inceleyebilir."
      },
      {
        q: "Kartvizit fiyatları hangi özelliklere göre değişir?",
        a: "Kartvizit fiyatları; seçilen kâğıt gramajı (250 gr, 350 gr, 400 gr, 700 gr veya 800 gr), baskı yönü (tek yön veya çift yön), selefon kaplama (mat veya parlak), kabartma lak, altın yaldız, özel kesim ve adet tirajına göre değişiklik gösterir. Kalın kartvizit fiyatları ve kabartmalı kartvizit fiyatları uygulanan ek işçilik ve malzeme katmanlarına göre farklılaşır. Kartvizit basım fiyatları veya kartvizit ücretleri karşılaştırılırken aynı adet, gramaj ve baskı yönüne sahip modeller esas alınmalıdır."
      },
      {
        q: "Kalın kartvizit kağıdı ve 700–800 gr sıvama nedir?",
        a: "Kalın kartvizit kağıdı, iki veya daha fazla katman kartonun özel presleme yöntemiyle birleştirilmesiyle oluşturulur. 700 gr ve 800 gr kalın sıvama kartvizit ve kalın karton kartvizit çeşitleri, yüksek rijitliği ve bükülmeye karşı tok gövdesiyle üst segment prestij arayan yöneticiler ve markalar tarafından tercih edilir."
      },
      {
        q: "Laklı Kartvizit Nedir?",
        a: "Laklı kartvizit; mat selefon kaplanmış yüzey üzerine şeffaf özel lak tabakası uygulanarak üretilen baskı modelidir. Bu işlem logonuz ve seçtiğiniz yazıların ışıkta parlamasını sağlar. Kabartmalı kartvizit modellerinde lak tabakası parmakla dokunulduğunda hissedilen 3D dokulu bir derinlik ve prestij oluşturur."
      },
      {
        q: "Mat ve parlak selefon arasındaki fark nedir?",
        a: "Mat selefon kaplama yansıma yapmayan, şık ve kurumsal bir görünüm sunar ve üzerine kabartma lak uygulamasına imkan tanır. Parlak selefon ise renk tonlarını daha canlı ve ışıltılı gösteren koruyucu bir yüzey sağlar; ancak üzerine kalemle kolay not yazmaya elverişli değildir."
      },
      {
        q: "Özel kesim, oval kesim ve altın yaldız nasıl seçilir?",
        a: "Özel kesim ve oval kesim modellerinde standart dikdörtgen köşelerin dışına çıkılarak markanızın sektörüne veya tasarımınıza uygun geometrik formlar ve yumuşatılmış köşeler elde edilir. Altın yaldız uygulaması ise logo, unvan veya kenar çerçevelerinde metalik altın parıltısı oluşturarak prestijli bir görsel etki sağlar."
      },
      {
        q: "Kartvizit tasarım dosyası nasıl hazırlanır?",
        a: "Kartvizit tasarım dosyası CMYK renk modunda hazırlanmalı, kullanılan piksel tabanlı görseller baskı boyutunda en az 300 DPI çözünürlükte olmalıdır. Kesim toleransı için her kenardan 3 mm taşma payı bırakılmalı ve metinler eğriye (convert/outline) dönüştürülmelidir. Baskıya hazır dosyalarınız için teknik kontrol ve dijital PDF prova sunulmaktadır. Grafik desteği var."
      },
      {
        q: "Teslim süresi ve listede olmayan seçenekler nasıl belirlenir?",
        a: "Teslim süresi; talep edilen kartvizit modeli, sipariş adedi, baskıya hazır dosya onayı, baskı sonrası lak/yaldız/özel kesim uygulamaları ve operasyonel yoğunluğa bağlı olarak teklif veya sipariş aşamasında netleştirilir. Fiyat listesinde bulunmayan ara adet, özel ölçü ve özel kâğıt talepleri için web sitemizdeki Özel Teklif Al bağlantısı üzerinden bilgi alabilirsiniz."
      },
      {
        q: "QR kodlu kartvizit baskı için dosya nasıl hazırlanır?",
        a: "QR kodun yönlendirdiği web sitesi, iletişim veya katalog bağlantısını dosyayı göndermeden önce telefonunuzla açarak kontrol edin. Kodun çevresinde boşluk bırakın, zeminle kontrastını koruyun ve kesim çizgisine çok yakın yerleştirmeyin. Düşük çözünürlüklü veya çok küçültülmüş kodlar okunmayı zorlaştırabilir. Baskıya hazır PDF dosyanızdaki QR kodu ve dijital provadaki yerleşimi onaydan önce kontrol edin."
      }
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": kartvizitFaqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    };

    let extraHead = `  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(productSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;

    const bodyContent = `<div class="bg-gray-50 border-b border-gray-100 py-3">
  <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="flex text-xs text-gray-500 font-medium" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2">
        <li class="inline-flex items-center">
          <a href="/" class="text-gray-600 hover:text-primary">Ana Sayfa</a>
        </li>
        <li>
          <div class="flex items-center">
            <span class="mx-2 text-gray-400" aria-hidden="true">&gt;</span>
            <a href="/matbaa" class="text-gray-600 hover:text-primary">Matbaa Ürünleri</a>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <span class="mx-2 text-gray-400" aria-hidden="true">&gt;</span>
            <span class="text-gray-900 font-semibold" aria-current="page">Kartvizit</span>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</div>
<div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
  <header class="mb-8">
    <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-3">Kartvizit Baskı Fiyatları ve Kalın Kartvizit Modelleri</h1>
    <p class="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
      Kurumsal kimliğinizi ve iletişim bilgilerinizi temsil eden <strong>kartvizit baskı</strong> ve <strong>kalın kartvizit</strong> modellerinde zengin kağıt ve yüzey işleme seçenekleri sunuyoruz. 250 gr'dan 800 gr'a uzanan gramajlar, mat ve parlak selefon kaplamalar, özel kabartma lak, altın yaldız, özel kesim ve PVC alternatifleriyle <strong>kartvizit sipariş</strong> ve <strong>kartvizit bastırma</strong> süreçlerinizi kolaylaştırıyoruz. Siparişleriniz <strong>İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktası</strong> üzerinden koordine edilerek anlaşmalı kargo ile tarafınıza ulaştırılır.
    </p>
    <p class="text-gray-650 text-xs sm:text-sm font-semibold leading-relaxed">
      Aşağıdaki tabloda güncel <strong>kartvizit fiyatları</strong>, <strong>kalın kartvizit fiyatları</strong> ve <strong>kartvizit fiyatları 1000 adet</strong> seçenekleri yer almaktadır. Kağıt kartvizit modellerimiz standart olarak 1.000 adet üzerinden üretilmektedir. Plastik PVC modelimiz ise 500 adetlik tiraj ile sunulmaktadır. Fiyat listesinde yer almayan ara adetler veya özel projeler için teklif alabilirsiniz.
    </p>
  </header>

  <section id="fiyat-tablosu" class="mb-14">
    <div class="mb-4">
      <h2 class="text-xl sm:text-2xl font-black text-black">Kartvizit Baskı Fiyatları ve 1.000 Adet Fiyat Listesi</h2>
      <p class="text-xs sm:text-sm text-gray-500 font-medium mt-1">250–800 gr kalınlıklar, mat/parlak selefon, kabartma lak, sıvama, yaldız, özel kesim ve PVC alternatifleri.</p>
    </div>
    <div class="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden relative z-10">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse min-w-[760px] text-xs sm:text-sm">
          <caption class="text-left font-bold text-gray-900 pb-2 px-2 text-sm sm:text-base">Kartvizit Baskı Fiyat Tablosu (1.000 Adet ve Kalın Kartvizit Seçenekleri)</caption>
          <thead>
            <tr class="bg-gray-900 text-white text-xs uppercase tracking-wider font-bold">
              <th scope="col" class="py-4 px-1 text-center w-7 sm:w-8" title="Grup"><span class="sr-only">Grup</span></th>
              <th scope="col" class="py-4 px-3 sm:px-4 text-center w-20">Kod</th>
              <th scope="col" class="py-4 px-4 sm:px-6">Ürün Açıklaması &amp; Özellikler</th>
              <th scope="col" class="py-4 px-3 sm:px-4 text-center w-28 whitespace-nowrap">Adet</th>
              <th scope="col" class="py-4 px-4 sm:px-6 text-right w-32 whitespace-nowrap">FİYAT</th>
              <th scope="col" class="py-4 px-3 sm:px-4 text-center w-40 whitespace-nowrap">İşlem</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr class="hover:bg-blue-50/40 transition-colors group">
              <td rowspan="5" class="bg-primary text-white font-black text-center p-1 w-7 sm:w-8 border-r border-white/20 select-none" style="writing-mode: vertical-rl; transform: rotate(180deg);"><span class="tracking-[0.12em] uppercase text-[10px] font-bold inline-block py-1">EKO</span></td>
              <th scope="row" class="py-4 px-3 sm:px-4 text-center font-mono font-bold text-primary border-r border-gray-100">NK</th>
              <td class="py-4 px-4 sm:px-6 text-gray-800 font-medium">250 gr. Bristol Tek Yön Renkli Parlak Selefonlu</td>
              <td class="py-4 px-3 sm:px-4 text-center font-bold text-gray-900 border-r border-gray-100 whitespace-nowrap">1.000 ADET</td>
              <td class="py-4 px-4 sm:px-6 text-right font-black text-gray-900 text-base sm:text-lg bg-gray-50/50 whitespace-nowrap">840 ₺</td>
              <td class="py-4 px-3 sm:px-4 text-center"><a href="https://wa.me/905366022373" class="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-black">Hemen Sipariş Ver</a></td>
            </tr>
            <tr class="hover:bg-blue-50/40 transition-colors group">
              <th scope="row" class="py-4 px-3 sm:px-4 text-center font-mono font-bold text-primary border-r border-gray-100">NKA</th>
              <td class="py-4 px-4 sm:px-6 text-gray-800 font-medium">250 gr. Bristol Tek Yön Renkli Parlak Selefonlu Arkası Tek Renk Siyah</td>
              <td class="py-4 px-3 sm:px-4 text-center font-bold text-gray-900 border-r border-gray-100 whitespace-nowrap">1.000 ADET</td>
              <td class="py-4 px-4 sm:px-6 text-right font-black text-gray-900 text-base sm:text-lg bg-gray-50/50 whitespace-nowrap">850 ₺</td>
              <td class="py-4 px-3 sm:px-4 text-center"><a href="https://wa.me/905366022373" class="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-black">Hemen Sipariş Ver</a></td>
            </tr>
            <tr class="hover:bg-blue-50/40 transition-colors group">
              <th scope="row" class="py-4 px-3 sm:px-4 text-center font-mono font-bold text-primary border-r border-gray-100">MNA</th>
              <td class="py-4 px-4 sm:px-6 text-gray-800 font-medium">350 gr. Bristol Tek Yön Renkli Mat Selefonlu Arkası Tek renk Siyah</td>
              <td class="py-4 px-3 sm:px-4 text-center font-bold text-gray-900 border-r border-gray-100 whitespace-nowrap">1.000 ADET</td>
              <td class="py-4 px-4 sm:px-6 text-right font-black text-gray-900 text-base sm:text-lg bg-gray-50/50 whitespace-nowrap">860 ₺</td>
              <td class="py-4 px-3 sm:px-4 text-center"><a href="https://wa.me/905366022373" class="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-black">Hemen Sipariş Ver</a></td>
            </tr>
            <tr class="hover:bg-blue-50/40 transition-colors group">
              <th scope="row" class="py-4 px-3 sm:px-4 text-center font-mono font-bold text-primary border-r border-gray-100">CYM</th>
              <td class="py-4 px-4 sm:px-6 text-gray-800 font-medium">350 gr. Kuşe Çift Yön Renkli Mat Selefonlu</td>
              <td class="py-4 px-3 sm:px-4 text-center font-bold text-gray-900 border-r border-gray-100 whitespace-nowrap">1.000 ADET</td>
              <td class="py-4 px-4 sm:px-6 text-right font-black text-gray-900 text-base sm:text-lg bg-gray-50/50 whitespace-nowrap">940 ₺</td>
              <td class="py-4 px-3 sm:px-4 text-center"><a href="https://wa.me/905366022373" class="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-black">Hemen Sipariş Ver</a></td>
            </tr>
            <tr class="hover:bg-blue-50/40 transition-colors group">
              <th scope="row" class="py-4 px-3 sm:px-4 text-center font-mono font-bold text-primary border-r border-gray-100">CYP</th>
              <td class="py-4 px-4 sm:px-6 text-gray-800 font-medium">350 gr. Kuşe Çift Yön Renkli Parlak Selefonlu</td>
              <td class="py-4 px-3 sm:px-4 text-center font-bold text-gray-900 border-r border-gray-100 whitespace-nowrap">1.000 ADET</td>
              <td class="py-4 px-4 sm:px-6 text-right font-black text-gray-900 text-base sm:text-lg bg-gray-50/50 whitespace-nowrap">940 ₺</td>
              <td class="py-4 px-3 sm:px-4 text-center"><a href="https://wa.me/905366022373" class="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-black">Hemen Sipariş Ver</a></td>
            </tr>
            <tr class="hover:bg-blue-50/40 transition-colors group">
              <td rowspan="4" class="bg-purple-600 text-white font-black text-center p-1 w-7 sm:w-8 border-r border-white/20 select-none" style="writing-mode: vertical-rl; transform: rotate(180deg);"><span class="tracking-[0.12em] uppercase text-[10px] font-bold inline-block py-1">LAK</span></td>
              <th scope="row" class="py-4 px-3 sm:px-4 text-center font-mono font-bold text-primary border-r border-gray-100">KL</th>
              <td class="py-4 px-4 sm:px-6 text-gray-800 font-medium">350 gr. Kuşe Tek Yön Renkli Mat Selefonlu Kabartma Laklı</td>
              <td class="py-4 px-3 sm:px-4 text-center font-bold text-gray-900 border-r border-gray-100 whitespace-nowrap">1.000 ADET</td>
              <td class="py-4 px-4 sm:px-6 text-right font-black text-gray-900 text-base sm:text-lg bg-gray-50/50 whitespace-nowrap">980 ₺</td>
              <td class="py-4 px-3 sm:px-4 text-center"><a href="https://wa.me/905366022373" class="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-black">Hemen Sipariş Ver</a></td>
            </tr>
            <tr class="hover:bg-blue-50/40 transition-colors group">
              <th scope="row" class="py-4 px-3 sm:px-4 text-center font-mono font-bold text-primary border-r border-gray-100">CYML4</th>
              <td class="py-4 px-4 sm:px-6 text-gray-800 font-medium">400 gr. Kuşe Çift Yön Renkli Mat Selefonlu Laklı</td>
              <td class="py-4 px-3 sm:px-4 text-center font-bold text-gray-900 border-r border-gray-100 whitespace-nowrap">1.000 ADET</td>
              <td class="py-4 px-4 sm:px-6 text-right font-black text-gray-900 text-base sm:text-lg bg-gray-50/50 whitespace-nowrap">1.060 ₺</td>
              <td class="py-4 px-3 sm:px-4 text-center"><a href="https://wa.me/905366022373" class="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-black">Hemen Sipariş Ver</a></td>
            </tr>
            <tr class="hover:bg-blue-50/40 transition-colors group">
              <th scope="row" class="py-4 px-3 sm:px-4 text-center font-mono font-bold text-primary border-r border-gray-100">O-COK</th>
              <td class="py-4 px-4 sm:px-6 text-gray-800 font-medium">350 gr. Kuşe Çift Yön Renkli Mat Selefonlu Kabartma Laklı Oval Kesim</td>
              <td class="py-4 px-3 sm:px-4 text-center font-bold text-gray-900 border-r border-gray-100 whitespace-nowrap">1.000 ADET</td>
              <td class="py-4 px-4 sm:px-6 text-right font-black text-gray-900 text-base sm:text-lg bg-gray-50/50 whitespace-nowrap">1.100 ₺</td>
              <td class="py-4 px-3 sm:px-4 text-center"><a href="https://wa.me/905366022373" class="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-black">Hemen Sipariş Ver</a></td>
            </tr>
            <tr class="hover:bg-blue-50/40 transition-colors group">
              <th scope="row" class="py-4 px-3 sm:px-4 text-center font-mono font-bold text-primary border-r border-gray-100">S-COK</th>
              <td class="py-4 px-4 sm:px-6 text-gray-800 font-medium">350 gr. Kuşe Çift Yön Renkli Mat Selefonlu Kabartma Laklı Özel Kesim</td>
              <td class="py-4 px-3 sm:px-4 text-center font-bold text-gray-900 border-r border-gray-100 whitespace-nowrap">1.000 ADET</td>
              <td class="py-4 px-4 sm:px-6 text-right font-black text-gray-900 text-base sm:text-lg bg-gray-50/50 whitespace-nowrap">1.160 ₺</td>
              <td class="py-4 px-3 sm:px-4 text-center"><a href="https://wa.me/905366022373" class="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-black">Hemen Sipariş Ver</a></td>
            </tr>
            <tr class="hover:bg-blue-50/40 transition-colors group">
              <td rowspan="5" class="bg-orange-400 text-white font-black text-center p-1 w-7 sm:w-8 border-r border-white/20 select-none" style="writing-mode: vertical-rl; transform: rotate(180deg);"><span class="tracking-[0.12em] uppercase text-[10px] font-bold inline-block py-1">SIVAMA</span></td>
              <th scope="row" class="py-4 px-3 sm:px-4 text-center font-mono font-bold text-primary border-r border-gray-100">O-SEK</th>
              <td class="py-4 px-4 sm:px-6 text-gray-800 font-medium">700 gr. Sıvama Mat Selefon Kabartma Laklı Oval Kesim Çift Yön</td>
              <td class="py-4 px-3 sm:px-4 text-center font-bold text-gray-900 border-r border-gray-100 whitespace-nowrap">1.000 ADET</td>
              <td class="py-4 px-4 sm:px-6 text-right font-black text-gray-900 text-base sm:text-lg bg-gray-50/50 whitespace-nowrap">1.380 ₺</td>
              <td class="py-4 px-3 sm:px-4 text-center"><a href="https://wa.me/905366022373" class="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-black">Hemen Sipariş Ver</a></td>
            </tr>
            <tr class="hover:bg-blue-50/40 transition-colors group">
              <th scope="row" class="py-4 px-3 sm:px-4 text-center font-mono font-bold text-primary border-r border-gray-100">S-SEK</th>
              <td class="py-4 px-4 sm:px-6 text-gray-800 font-medium">700 gr. Sıvama Mat Selefon Kabartma Laklı Özel Kesim Çift Yön</td>
              <td class="py-4 px-3 sm:px-4 text-center font-bold text-gray-900 border-r border-gray-100 whitespace-nowrap">1.000 ADET</td>
              <td class="py-4 px-4 sm:px-6 text-right font-black text-gray-900 text-base sm:text-lg bg-gray-50/50 whitespace-nowrap">1.480 ₺</td>
              <td class="py-4 px-3 sm:px-4 text-center"><a href="https://wa.me/905366022373" class="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-black">Hemen Sipariş Ver</a></td>
            </tr>
            <tr class="hover:bg-blue-50/40 transition-colors group">
              <th scope="row" class="py-4 px-3 sm:px-4 text-center font-mono font-bold text-primary border-r border-gray-100">A-SEK</th>
              <td class="py-4 px-4 sm:px-6 text-gray-800 font-medium">700 gr. Sıvama Mat Selefon Kabartma Laklı Çift Yön (Tek Yön Altın Yaldız) Özel Kesim</td>
              <td class="py-4 px-3 sm:px-4 text-center font-bold text-gray-900 border-r border-gray-100 whitespace-nowrap">1.000 ADET</td>
              <td class="py-4 px-4 sm:px-6 text-right font-black text-gray-900 text-base sm:text-lg bg-gray-50/50 whitespace-nowrap">1.700 ₺</td>
              <td class="py-4 px-3 sm:px-4 text-center"><a href="https://wa.me/905366022373" class="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-black">Hemen Sipariş Ver</a></td>
            </tr>
            <tr class="hover:bg-blue-50/40 transition-colors group">
              <th scope="row" class="py-4 px-3 sm:px-4 text-center font-mono font-bold text-primary border-r border-gray-100">AC-SEK</th>
              <td class="py-4 px-4 sm:px-6 text-gray-800 font-medium">700 gr. Sıvama Mat Selefon Kabartma Laklı Çift Yön Altın Yaldız Özel Kesim Çift Yön</td>
              <td class="py-4 px-3 sm:px-4 text-center font-bold text-gray-900 border-r border-gray-100 whitespace-nowrap">1.000 ADET</td>
              <td class="py-4 px-4 sm:px-6 text-right font-black text-gray-900 text-base sm:text-lg bg-gray-50/50 whitespace-nowrap">1.900 ₺</td>
              <td class="py-4 px-3 sm:px-4 text-center"><a href="https://wa.me/905366022373" class="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-black">Hemen Sipariş Ver</a></td>
            </tr>
            <tr class="hover:bg-blue-50/40 transition-colors group">
              <th scope="row" class="py-4 px-3 sm:px-4 text-center font-mono font-bold text-primary border-r border-gray-100">TANK</th>
              <td class="py-4 px-4 sm:px-6 text-gray-800 font-medium">800 gr. Bristol Sıvama Mat Selefon Kabartma Laklı Özel Kesim Çift Yön</td>
              <td class="py-4 px-3 sm:px-4 text-center font-bold text-gray-900 border-r border-gray-100 whitespace-nowrap">1.000 ADET</td>
              <td class="py-4 px-4 sm:px-6 text-right font-black text-gray-900 text-base sm:text-lg bg-gray-50/50 whitespace-nowrap">1.500 ₺</td>
              <td class="py-4 px-3 sm:px-4 text-center"><a href="https://wa.me/905366022373" class="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-black">Hemen Sipariş Ver</a></td>
            </tr>
            <tr class="hover:bg-blue-50/40 transition-colors group">
              <td rowspan="2" class="bg-yellow-400 text-white font-black text-center p-1 w-7 sm:w-8 border-r border-white/20 select-none" style="writing-mode: vertical-rl; transform: rotate(180deg);"><span class="tracking-[0.12em] uppercase text-[10px] font-bold inline-block py-1">VİP</span></td>
              <th scope="row" class="py-4 px-3 sm:px-4 text-center font-mono font-bold text-primary border-r border-gray-100">AY</th>
              <td class="py-4 px-4 sm:px-6 text-gray-800 font-medium">350 gr. Bristol Tek Yön Renkli Mat Selefonlu Altın Yaldızlı Arkası Tek Renk Siyah</td>
              <td class="py-4 px-3 sm:px-4 text-center font-bold text-gray-900 border-r border-gray-100 whitespace-nowrap">1.000 ADET</td>
              <td class="py-4 px-4 sm:px-6 text-right font-black text-gray-900 text-base sm:text-lg bg-gray-50/50 whitespace-nowrap">1.200 ₺</td>
              <td class="py-4 px-3 sm:px-4 text-center"><a href="https://wa.me/905366022373" class="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-black">Hemen Sipariş Ver</a></td>
            </tr>
            <tr class="hover:bg-blue-50/40 transition-colors group">
              <th scope="row" class="py-4 px-3 sm:px-4 text-center font-mono font-bold text-primary border-r border-gray-100">VIP</th>
              <td class="py-4 px-4 sm:px-6 text-gray-800 font-medium">350 gr. Kuşe Çift Yön Renkli Mat Selefonlu Özel Kesim Laklı - Ön Yüz Altın Yaldız</td>
              <td class="py-4 px-3 sm:px-4 text-center font-bold text-gray-900 border-r border-gray-100 whitespace-nowrap">1.000 ADET</td>
              <td class="py-4 px-4 sm:px-6 text-right font-black text-gray-900 text-base sm:text-lg bg-gray-50/50 whitespace-nowrap">1.400 ₺</td>
              <td class="py-4 px-3 sm:px-4 text-center"><a href="https://wa.me/905366022373" class="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-black">Hemen Sipariş Ver</a></td>
            </tr>
            <tr class="hover:bg-blue-50/40 transition-colors group">
              <td rowspan="1" class="bg-blue-600 text-white font-black text-center p-1 w-7 sm:w-8 border-r border-white/20 select-none" style="writing-mode: vertical-rl; transform: rotate(180deg);"><span class="tracking-[0.12em] uppercase text-[10px] font-bold inline-block py-1">PVC</span></td>
              <th scope="row" class="py-4 px-3 sm:px-4 text-center font-mono font-bold text-primary border-r border-gray-100">PVC</th>
              <td class="py-4 px-4 sm:px-6 text-gray-800 font-medium">0,560 mc Beyaz plastik PVC Kartvizit - Çift taraf renkli - Oval Kesim</td>
              <td class="py-4 px-3 sm:px-4 text-center font-bold text-gray-900 border-r border-gray-100 whitespace-nowrap">500 ADET</td>
              <td class="py-4 px-4 sm:px-6 text-right font-black text-gray-900 text-base sm:text-lg bg-gray-50/50 whitespace-nowrap">4.400 ₺</td>
              <td class="py-4 px-3 sm:px-4 text-center"><a href="https://wa.me/905366022373" class="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-black">Hemen Sipariş Ver</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="mb-14">
    <div class="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
      <span class="w-2.5 h-6 bg-primary rounded-full"></span>
      <div>
        <h2 class="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">Kartvizit Örnekleri ve Baskı Modelleri</h2>
        <p class="text-slate-500 font-medium text-xs sm:text-sm mt-0.5">İstanbul Topkapı 2. Matbaacılar Sitesi koordinasyonunda hazırlanan farklı gramaj, selefon ve özel lak uygulamalı kartvizit örnekleri:</p>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
      <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
        <div class="aspect-[4/3] bg-gray-100 overflow-hidden relative">
          <img src="/images/kartvizit/kartvizit-baski.webp" alt="Kartvizit Baskı Fiyatları ve 1.000 Adet Kalın Kartvizit Modelleri" width="800" height="533" loading="lazy" decoding="async" class="w-full h-full object-cover" />
        </div>
        <div class="p-3.5 sm:p-4 flex flex-col flex-grow justify-between">
          <h3 class="font-bold text-gray-900 text-xs sm:text-sm mb-1 leading-snug">Kartvizit Baskı Fiyatları ve Modelleri</h3>
          <p class="text-gray-500 text-[11px] sm:text-xs leading-relaxed">250 gr&#39;dan 800 gr&#39;a kadar mat selefonlu, laklı ve sıvama kartvizit çeşitleri.</p>
        </div>
      </div>
      <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
        <div class="aspect-[4/3] bg-gray-100 overflow-hidden relative">
          <img src="/images/kartvizit/kartvizit-baski-detayi.webp" alt="350 gr Kuşe Mat Selefonlu Kurumsal Kartvizit Detayı" width="800" height="533" loading="lazy" decoding="async" class="w-full h-full object-cover" />
        </div>
        <div class="p-3.5 sm:p-4 flex flex-col flex-grow justify-between">
          <h3 class="font-bold text-gray-900 text-xs sm:text-sm mb-1 leading-snug">350 gr Mat Selefonlu Kartvizit</h3>
          <p class="text-gray-500 text-[11px] sm:text-xs leading-relaxed">Yansıma yapmayan pürüzsüz dokusuyla kurumsal kimlik için standart mat kartvizit.</p>
        </div>
      </div>
      <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
        <div class="aspect-[4/3] bg-gray-100 overflow-hidden relative">
          <img src="/images/kartvizit/kartvizit-ornegi.webp" alt="Kabartma Laklı ve Özel Dokulu Kartvizit Örnekleri" width="800" height="533" loading="lazy" decoding="async" class="w-full h-full object-cover" />
        </div>
        <div class="p-3.5 sm:p-4 flex flex-col flex-grow justify-between">
          <h3 class="font-bold text-gray-900 text-xs sm:text-sm mb-1 leading-snug">Kabartma Laklı Kartvizit Örnekleri</h3>
          <p class="text-gray-500 text-[11px] sm:text-xs leading-relaxed">Logo ve seçili alanlarda parlayan 3D hissedilir kabartma lak uygulaması.</p>
        </div>
      </div>
      <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
        <div class="aspect-[4/3] bg-gray-100 overflow-hidden relative">
          <img src="/images/kartvizit/kartvizit-tasarimi.webp" alt="Özel Tasarım ve Kurumsal Kartvizit Grafiği" width="800" height="533" loading="lazy" decoding="async" class="w-full h-full object-cover" />
        </div>
        <div class="p-3.5 sm:p-4 flex flex-col flex-grow justify-between">
          <h3 class="font-bold text-gray-900 text-xs sm:text-sm mb-1 leading-snug">Kurumsal Kartvizit Tasarımı</h3>
          <p class="text-gray-500 text-[11px] sm:text-xs leading-relaxed">İki kat kartonun sıvama yöntemiyle birleştirilmesiyle hazırlanan daha tok yapılı kartvizit örneği.</p>
        </div>
      </div>
      <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
        <div class="aspect-[4/3] bg-gray-100 overflow-hidden relative">
          <img src="/images/kartvizit/kartvizit-yakin-cekim.webp" alt="Özel Kesim ve Oval Köşeli Kartvizit Modelleri" width="800" height="533" loading="lazy" decoding="async" class="w-full h-full object-cover" />
        </div>
        <div class="p-3.5 sm:p-4 flex flex-col flex-grow justify-between">
          <h3 class="font-bold text-gray-900 text-xs sm:text-sm mb-1 leading-snug">Özel Kesim ve Oval Kartvizit</h3>
          <p class="text-gray-500 text-[11px] sm:text-xs leading-relaxed">Yuvarlatılmış köşeler ve sektöre özel bıçak kesimli estetik kartvizit formları.</p>
        </div>
      </div>
      <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
        <div class="aspect-[4/3] bg-gray-100 overflow-hidden relative">
          <img src="/images/kartvizit/plastik-pvc-kartvizit.webp" alt="Oval Köşeli Plastik PVC Kartvizit Baskı Örneği" width="800" height="533" loading="lazy" decoding="async" class="w-full h-full object-cover" />
        </div>
        <div class="p-3.5 sm:p-4 flex flex-col flex-grow justify-between">
          <h3 class="font-bold text-gray-900 text-xs sm:text-sm mb-1 leading-snug">PVC Kartvizit Baskı Örnekleri</h3>
          <p class="text-gray-500 text-[11px] sm:text-xs leading-relaxed">Beyaz plastik PVC malzemeli, çift taraf renkli ve oval kesimli kartvizit örneği.</p>
        </div>
      </div>
    </div>
  <section class="mb-14 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
    <div class="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
      <span class="w-2.5 h-6 bg-primary rounded-full"></span>
      <h2 class="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">Kartvizit Kullanım Alanları</h2>
    </div>
    <p class="text-gray-650 text-xs sm:text-sm font-medium leading-relaxed">
      Emlakçı, kuaför, SMMM, mimar, danışman ve farklı kurumsal işletmeler için logo, iletişim bilgileri ve marka kimliğine uygun kartvizit tasarımları hazırlanabilir.
    </p>
  </section>

  <section id="sss" class="mb-14">
    <div class="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
      <span class="w-2.5 h-6 bg-primary rounded-full"></span>
      <div>
        <h2 class="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">Kartvizit Baskı Hakkında Sıkça Sorulan Sorular</h2>
        <p class="text-slate-500 font-medium text-xs sm:text-sm mt-0.5">Kartvizit modelleri, kağıt gramajları, adet seçenekleri ve teslimat süreçleri hakkında detaylı bilgiler:</p>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
${kartvizitFaqs.map(f => `      <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs">
        <h3 class="font-extrabold text-xs sm:text-sm text-gray-900 mb-2">${f.q}</h3>
        <p class="text-xs sm:text-sm text-gray-650 leading-relaxed">${f.a}</p>
      </div>`).join('\n')}
    </div>
  </section>
</div>`;

    return {
      title: staticPages["/kartvizit"].title,
      desc: staticPages["/kartvizit"].desc,
      canonical,
      extraHead,
      h1Text: "Kartvizit Baskı Fiyatları ve Kalın Kartvizit Modelleri",
      bodyContent
    };
  }

  // 1.8. Kutu Baskı Page Dedicated Route
  if (p === '/kutu') {
    const ogImage = KUTU_SEO_METADATA.ogImage || "https://mavibasim.com/images/kutu/ozel-kesim-kutu-tasarimi.webp";
    let extraHead = `  <meta property="og:site_name" content="Mavi Basım Matbaa & Reklam" />\n`;
    extraHead += `  <meta property="og:locale" content="tr_TR" />\n`;
    extraHead += `  <meta property="og:description" content="${KUTU_SEO_METADATA.ogDescription || KUTU_SEO_METADATA.desc}" />\n`;
    extraHead += `  <meta property="og:image" content="${ogImage}" />\n`;
    extraHead += `  <meta property="og:image:secure_url" content="${ogImage}" />\n`;
    extraHead += `  <meta property="og:image:type" content="image/webp" />\n`;
    extraHead += `  <meta property="og:image:width" content="800" />\n`;
    extraHead += `  <meta property="og:image:height" content="533" />\n`;
    extraHead += `  <meta property="og:image:alt" content="Mavi Basım özel kesim karton kutu ve ambalaj baskı örnekleri" />\n`;
    extraHead += `  <script id="kutu-breadcrumb-schema" type="application/ld+json">${JSON.stringify(KUTU_SCHEMAS.breadcrumbSchema)}</script>\n`;
    extraHead += `  <script id="kutu-service-schema" type="application/ld+json">${JSON.stringify(KUTU_SCHEMAS.serviceSchema)}</script>\n`;
    extraHead += `  <script id="kutu-faq-schema" type="application/ld+json">${JSON.stringify(KUTU_SCHEMAS.faqSchema)}</script>\n`;

    const bodyContent = generateKutuSSRBodyContent();

    return {
      title: KUTU_SEO_METADATA.title,
      desc: KUTU_SEO_METADATA.desc,
      canonical,
      extraHead,
      bodyContent,
      h1Text: KUTU_SEO_METADATA.h1,
      ogImage
    };
  }

  // 1.9. Ambalaj Baskı Page Dedicated Route
  if (p === '/ambalaj') {
    const breadcrumbSchema = AMBALAJ_SCHEMAS.breadcrumbSchema;
    const serviceSchema = AMBALAJ_SCHEMAS.serviceSchema;
    const faqSchema = AMBALAJ_SCHEMAS.faqSchema;

    const ogImage = AMBALAJ_SEO_METADATA.ogImage;
    let extraHead = `  <meta property="og:site_name" content="Mavi Basım Matbaa & Reklam" />\n`;
    extraHead += `  <meta property="og:locale" content="tr_TR" />\n`;
    extraHead += `  <meta property="og:description" content="${AMBALAJ_SEO_METADATA.ogDescription}" />\n`;
    extraHead += `  <meta property="og:image" content="${ogImage}" />\n`;
    extraHead += `  <meta property="og:image:secure_url" content="${ogImage}" />\n`;
    extraHead += `  <meta property="og:image:type" content="image/webp" />\n`;
    extraHead += `  <meta property="og:image:width" content="1024" />\n`;
    extraHead += `  <meta property="og:image:height" content="1024" />\n`;
    extraHead += `  <meta property="og:image:alt" content="Mavi Basım baskılı ambalaj kâğıdı, sülfit ve pelür kâğıt örnekleri" />\n`;
    extraHead += `  <meta name="twitter:card" content="summary_large_image" />\n`;
    extraHead += `  <meta name="twitter:title" content="${AMBALAJ_SEO_METADATA.title}" />\n`;
    extraHead += `  <meta name="twitter:description" content="${AMBALAJ_SEO_METADATA.desc}" />\n`;
    extraHead += `  <meta name="twitter:image" content="${ogImage}" />\n`;

    extraHead += `  <script id="ambalaj-breadcrumb-schema" type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
    extraHead += `  <script id="ambalaj-service-schema" type="application/ld+json">${JSON.stringify(serviceSchema)}</script>\n`;
    extraHead += `  <script id="ambalaj-faq-schema" type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;

    const bodyContent = generateAmbalajSSRBodyContent();

    return {
      title: AMBALAJ_SEO_METADATA.title,
      desc: AMBALAJ_SEO_METADATA.desc,
      canonical,
      extraHead,
      bodyContent,
      h1Text: AMBALAJ_SEO_METADATA.h1,
      ogImage
    };
  }

  // 1.10. Küp Bloknot Page Dedicated Route
  if (p === '/kup-bloknot') {
    const breadcrumbSchema = KUP_BLOKNOT_SCHEMAS.breadcrumbSchema;
    const productSchema = KUP_BLOKNOT_SCHEMAS.productSchema;
    const faqSchema = KUP_BLOKNOT_SCHEMAS.faqSchema;

    const ogImage = KUP_BLOKNOT_SEO_METADATA.ogImage;
    let extraHead = `  <meta property="og:site_name" content="Mavi Basım Matbaa & Reklam" />\n`;
    extraHead += `  <meta property="og:locale" content="tr_TR" />\n`;
    extraHead += `  <meta property="og:description" content="${KUP_BLOKNOT_SEO_METADATA.ogDescription}" />\n`;
    extraHead += `  <meta property="og:image" content="${ogImage}" />\n`;
    extraHead += `  <meta property="og:image:secure_url" content="${ogImage}" />\n`;
    extraHead += `  <meta property="og:image:type" content="image/webp" />\n`;
    extraHead += `  <meta property="og:image:width" content="1536" />\n`;
    extraHead += `  <meta property="og:image:height" content="1024" />\n`;
    extraHead += `  <meta property="og:image:alt" content="Mavi Basım küp bloknot baskı fiyatları ve logolu promosyon küp notluk modelleri" />\n`;
    extraHead += `  <meta name="twitter:card" content="summary_large_image" />\n`;
    extraHead += `  <meta name="twitter:title" content="${KUP_BLOKNOT_SEO_METADATA.title}" />\n`;
    extraHead += `  <meta name="twitter:description" content="${KUP_BLOKNOT_SEO_METADATA.desc}" />\n`;
    extraHead += `  <meta name="twitter:image" content="${ogImage}" />\n`;
    extraHead += `  <link rel="preload" as="image" href="/images/kup-bloknot/kutulu-kup-bloknot-baski.webp" fetchpriority="high" />\n`;

    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://mavibasim.com/#organization",
      "name": "Mavi Basım Matbaa & Reklam",
      "url": "https://mavibasim.com",
      "logo": "https://mavibasim.com/mavilogo.png",
      "image": "https://mavibasim.com/mavilogo.png",
      "telephone": "+905366022373",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Maltepe Mah. Davutpaşa Cad. Topkapı 2. Matbaacılar Sitesi B Blok No:2NB",
        "addressLocality": "Zeytinburnu",
        "addressRegion": "İstanbul",
        "addressCountry": "TR"
      }
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://mavibasim.com/#website",
      "url": "https://mavibasim.com",
      "name": "Mavi Basım Matbaa",
      "publisher": { "@id": "https://mavibasim.com/#organization" }
    };

    extraHead += `  <script id="app-seo-metadata-jsonld" type="application/ld+json">${JSON.stringify([orgSchema, websiteSchema])}</script>\n`;
    extraHead += `  <script id="kup-bloknot-breadcrumb-schema" type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
    extraHead += `  <script id="kup-bloknot-product-schema" type="application/ld+json">${JSON.stringify(productSchema)}</script>\n`;
    extraHead += `  <script id="kup-bloknot-faq-schema" type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;

    const bodyContent = generateKupBloknotSSRBodyContent();

    return {
      title: KUP_BLOKNOT_SEO_METADATA.title,
      desc: KUP_BLOKNOT_SEO_METADATA.desc,
      canonical,
      extraHead,
      bodyContent,
      h1Text: KUP_BLOKNOT_SEO_METADATA.h1,
      ogImage
    };
  }

  // 1.11. Etiket Page Dedicated Route
  if (p === '/etiket') {
    const breadcrumbSchema = ETIKET_SCHEMAS.breadcrumbSchema;
    const productSchema = ETIKET_SCHEMAS.productSchema;
    const faqSchema = ETIKET_SCHEMAS.faqSchema;

    const ogImage = ETIKET_SEO_METADATA.ogImage;
    let extraHead = `  <meta property="og:site_name" content="Mavi Basım Matbaa & Reklam" />\n`;
    extraHead += `  <meta property="og:locale" content="tr_TR" />\n`;
    extraHead += `  <meta property="og:description" content="${ETIKET_SEO_METADATA.desc}" />\n`;
    extraHead += `  <meta property="og:image" content="${ogImage}" />\n`;
    extraHead += `  <meta property="og:image:secure_url" content="${ogImage}" />\n`;
    extraHead += `  <meta property="og:image:type" content="image/webp" />\n`;
    extraHead += `  <meta property="og:image:width" content="1536" />\n`;
    extraHead += `  <meta property="og:image:height" content="1024" />\n`;
    extraHead += `  <meta property="og:image:alt" content="Mavi Basım yapışkanlı etiket ve sticker baskı fiyatları" />\n`;
    extraHead += `  <meta name="twitter:card" content="summary_large_image" />\n`;
    extraHead += `  <meta name="twitter:title" content="${ETIKET_SEO_METADATA.title}" />\n`;
    extraHead += `  <meta name="twitter:description" content="${ETIKET_SEO_METADATA.desc}" />\n`;
    extraHead += `  <meta name="twitter:image" content="${ogImage}" />\n`;
    if (ETIKET_IMAGE_MANIFEST["/images/etiket/yapiskanli-etiket-baski.webp"]) {
      extraHead += `  <link rel="preload" as="image" href="/images/etiket/yapiskanli-etiket-baski.webp" fetchpriority="high" />\n`;
    }

    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://mavibasim.com/#organization",
      "name": "Mavi Basım Matbaa & Reklam",
      "url": "https://mavibasim.com",
      "logo": "https://mavibasim.com/mavilogo.png",
      "image": "https://mavibasim.com/mavilogo.png",
      "telephone": "+905366022373",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Maltepe Mah. Davutpaşa Cad. Topkapı 2. Matbaacılar Sitesi B Blok No:2NB",
        "addressLocality": "Zeytinburnu",
        "addressRegion": "İstanbul",
        "addressCountry": "TR"
      }
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://mavibasim.com/#website",
      "url": "https://mavibasim.com",
      "name": "Mavi Basım Matbaa",
      "publisher": { "@id": "https://mavibasim.com/#organization" }
    };

    extraHead += `  <script id="app-seo-metadata-jsonld" type="application/ld+json">${JSON.stringify([orgSchema, websiteSchema])}</script>\n`;
    extraHead += `  <script id="etiket-breadcrumb-schema" type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
    extraHead += `  <script id="etiket-product-schema" type="application/ld+json">${JSON.stringify(productSchema)}</script>\n`;
    extraHead += `  <script id="etiket-faq-schema" type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;

    const bodyContent = generateEtiketSSRBodyContent();

    return {
      title: ETIKET_SEO_METADATA.title,
      desc: ETIKET_SEO_METADATA.desc,
      canonical,
      extraHead,
      bodyContent,
      h1Text: ETIKET_SEO_METADATA.h1,
      ogImage
    };
  }

  // 1.12. Bloknotlar Page Dedicated Route
  if (p === '/bloknotlar') {
    const breadcrumbSchema = BLOKNOTLAR_SCHEMAS.breadcrumbSchema;
    const faqSchema = BLOKNOTLAR_SCHEMAS.faqSchema;

    const ogImage = BLOKNOTLAR_SEO_METADATA.ogImage;
    let extraHead = `  <meta property="og:site_name" content="Mavi Basım Matbaa & Reklam" />\n`;
    extraHead += `  <meta property="og:locale" content="tr_TR" />\n`;
    extraHead += `  <meta property="og:description" content="${BLOKNOTLAR_SEO_METADATA.desc}" />\n`;
    extraHead += `  <meta property="og:image" content="${ogImage}" />\n`;
    extraHead += `  <meta property="og:image:secure_url" content="${ogImage}" />\n`;
    extraHead += `  <meta property="og:image:type" content="image/webp" />\n`;
    extraHead += `  <meta property="og:image:width" content="1536" />\n`;
    extraHead += `  <meta property="og:image:height" content="1024" />\n`;
    extraHead += `  <meta property="og:image:alt" content="Mavi Basım promosyon ve kapaklı bloknot baskı fiyatları" />\n`;
    extraHead += `  <meta name="twitter:card" content="summary_large_image" />\n`;
    extraHead += `  <meta name="twitter:title" content="${BLOKNOTLAR_SEO_METADATA.title}" />\n`;
    extraHead += `  <meta name="twitter:description" content="${BLOKNOTLAR_SEO_METADATA.desc}" />\n`;
    extraHead += `  <meta name="twitter:image" content="${ogImage}" />\n`;

    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://mavibasim.com/#organization",
      "name": "Mavi Basım Matbaa & Reklam",
      "url": "https://mavibasim.com",
      "logo": "https://mavibasim.com/mavilogo.png",
      "image": "https://mavibasim.com/mavilogo.png",
      "telephone": "+905366022373",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Maltepe Mah. Davutpaşa Cad. Topkapı 2. Matbaacılar Sitesi B Blok No:2NB",
        "addressLocality": "Zeytinburnu",
        "addressRegion": "İstanbul",
        "addressCountry": "TR"
      }
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://mavibasim.com/#website",
      "url": "https://mavibasim.com",
      "name": "Mavi Basım Matbaa",
      "publisher": { "@id": "https://mavibasim.com/#organization" }
    };

    extraHead += `  <script id="app-seo-metadata-jsonld" type="application/ld+json">${JSON.stringify([orgSchema, websiteSchema])}</script>\n`;
    extraHead += `  <script id="bloknotlar-breadcrumb-schema" type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
    extraHead += `  <script id="bloknotlar-faq-schema" type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;
    const bodyContent = ""; // Build renders the unchanged React page instead of a separate table copy.

    return {
      title: BLOKNOTLAR_SEO_METADATA.title,
      desc: BLOKNOTLAR_SEO_METADATA.desc,
      canonical,
      extraHead,
      bodyContent,
      h1Text: BLOKNOTLAR_SEO_METADATA.h1,
      ogImage
    };
  }

  // 1.13. Antetli Kağıt Page Dedicated Route
  if (p === '/antetli') {
    const breadcrumbSchema = ANTETLI_SCHEMAS.breadcrumbSchema;
    const faqSchema = ANTETLI_SCHEMAS.faqSchema;

    const ogImage = ANTETLI_SEO_METADATA.ogImage;
    let extraHead = `  <meta property="og:site_name" content="Mavi Basım" />\n`;
    extraHead += `  <meta property="og:locale" content="tr_TR" />\n`;
    extraHead += `  <meta property="og:description" content="${ANTETLI_SEO_METADATA.desc}" />\n`;
    extraHead += `  <meta property="og:image" content="${ogImage}" />\n`;
    extraHead += `  <meta property="og:image:secure_url" content="${ogImage}" />\n`;
    extraHead += `  <meta property="og:image:type" content="image/webp" />\n`;
    extraHead += `  <meta property="og:image:width" content="${ANTETLI_SEO_METADATA.ogImageWidth}" />\n`;
    extraHead += `  <meta property="og:image:height" content="${ANTETLI_SEO_METADATA.ogImageHeight}" />\n`;
    extraHead += `  <meta property="og:image:alt" content="${ANTETLI_SEO_METADATA.ogImageAlt}" />\n`;
    extraHead += `  <meta name="twitter:card" content="summary_large_image" />\n`;
    extraHead += `  <meta name="twitter:title" content="${ANTETLI_SEO_METADATA.title}" />\n`;
    extraHead += `  <meta name="twitter:description" content="${ANTETLI_SEO_METADATA.desc}" />\n`;
    extraHead += `  <meta name="twitter:image" content="${ogImage}" />\n`;
    extraHead += `  <link rel="preload" as="image" href="/images/antetli-kagit/antetli-kagit-baski-fiyatlari.webp" fetchpriority="high" />\n`;

    const orgSchema = ANTETLI_SCHEMAS.orgSchema;
    const websiteSchema = ANTETLI_SCHEMAS.websiteSchema;

    extraHead += `  <script id="app-seo-metadata-jsonld" type="application/ld+json">${JSON.stringify([orgSchema, websiteSchema])}</script>\n`;
    extraHead += `  <script id="antetli-breadcrumb-schema" type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
    extraHead += `  <script id="antetli-faq-schema" type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;

    return {
      title: ANTETLI_SEO_METADATA.title,
      desc: ANTETLI_SEO_METADATA.desc,
      canonical,
      extraHead,
      h1Text: "Antetli Kağıt Baskı Fiyatları",
      ogImage
    };
  }

  if (p === '/kataloglar') {
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://mavibasim.com/#organization",
      "name": "Mavi Basım Matbaa & Reklam",
      "url": "https://mavibasim.com",
      "logo": "https://mavibasim.com/mavilogo.png",
      "image": "https://mavibasim.com/mavilogo.png",
      "telephone": "+905366022373",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Maltepe Mah. Davutpaşa Cad. Topkapı 2. Matbaacılar Sitesi B Blok No:2NB",
        "addressLocality": "Zeytinburnu",
        "addressRegion": "İstanbul",
        "addressCountry": "TR"
      }
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://mavibasim.com/#website",
      "url": "https://mavibasim.com",
      "name": "Mavi Basım Matbaa",
      "publisher": { "@id": "https://mavibasim.com/#organization" }
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Sayfa",
          "item": "https://mavibasim.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Matbaa Ürünleri",
          "item": "https://mavibasim.com/matbaa"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Katalog Baskı Fiyatları",
          "item": "https://mavibasim.com/kataloglar"
        }
      ]
    };

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Katalog Baskı Fiyatları | Çok Sayfalı Ürün Kataloğu - Mavi Basım",
      "image": "https://mavibasim.com/images/katalog/katalog-baski-fiyatlari.webp",
      "description": "Ürün vitrininizi tanıtan spiralsiz tel dikişli, iplik dikişli veya Amerikan cilt lüks katalog ve dergi baskısı. Topkapı matbaasından toptan katalog imalatı.",
      "brand": {
        "@type": "Brand",
        "name": "Mavi Basım"
      },
      "category": "Katalog Baskı",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
                "lowPrice": "4750",
                        "highPrice": "40800",
        "offerCount": "45"
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": KATALOG_FAQS.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    };

    let extraHead = `  <script id="kataloglar-org-website-schema" type="application/ld+json">${JSON.stringify([orgSchema, websiteSchema])}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(productSchema)}</script>\n`;
    extraHead += `  <script id="katalog-faq-schema" type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;

    const KATALOG_CARD_IMAGES = [
      "/images/katalog/tanitim-katalogu-ornegi.webp",
      "/images/katalog/katalog-baski-fiyatlari.webp",
      "/images/katalog/katalog-tasarimi-ve-baski.webp",
      "/images/katalog/reklam-katalogu-tasarimi.webp",
      "/images/katalog/katalog-baski-detayi.webp",
      "/images/katalog/amerikan-cilt-katalog.webp"
    ];

    const KATALOG_IMAGE_DIMENSIONS: Record<string, { width: number; height: number }> = {
      "/images/katalog/tanitim-katalogu-ornegi.webp": { width: 800, height: 533 },
      "/images/katalog/katalog-baski-fiyatlari.webp": { width: 1536, height: 1024 },
      "/images/katalog/katalog-tasarimi-ve-baski.webp": { width: 1536, height: 1024 },
      "/images/katalog/reklam-katalogu-tasarimi.webp": { width: 1536, height: 1024 },
      "/images/katalog/katalog-baski-detayi.webp": { width: 1536, height: 1024 },
      "/images/katalog/amerikan-cilt-katalog.webp": { width: 1536, height: 1024 },
    };

    const KATALOG_GALLERY = [
      {
        src: "/images/katalog/tanitim-katalogu-ornegi.webp",
        alt: "A4 Tel Dikiş Tanıtım ve Ürün Kataloğu Baskısı",
        title: "A4 Tel Dikiş Ürün Kataloğu",
        desc: "135 gr parlak/mat kuşe iç sayfalar, 300 gr selefonlu kapak ve sağlam tel dikiş cilt yapısıyla kurumsal ürün tanıtım kataloğu."
      },
      {
        src: "/images/katalog/katalog-baski-fiyatlari.webp",
        alt: "Çok Sayfalı Kuşe Katalog Baskı Fiyatları ve Modelleri",
        title: "Katalog Baskı Fiyatları ve Çeşitleri",
        desc: "8, 12, 16, 24 ve 32 sayfa alternatifleriyle işletmenizin tüm ürün gamını tanıtan ekonomik katalog çözümleri."
      },
      {
        src: "/images/katalog/katalog-tasarimi-ve-baski.webp",
        alt: "Katalog Tasarımı, Mizanpaj ve Ofset Baskı Aşaması",
        title: "Katalog Tasarımı ve Sayfa Düzeni",
        desc: "300 DPI yüksek çözünürlüklü görseller, CMYK renk kalibrasyonu ve estetik sayfa mizanpajı ile profesyonel tasarım."
      },
      {
        src: "/images/katalog/reklam-katalogu-tasarimi.webp",
        alt: "Reklam ve Fuar Tanıtım Kataloğu Tasarımı",
        title: "Fuar ve Lansman Kataloğu",
        desc: "Bayi toplantıları, sektörel fuarlar ve yeni ürün tanıtımları için yüksek baskı kalitesine sahip prestij kataloğu."
      },
      {
        src: "/images/katalog/katalog-baski-detayi.webp",
        alt: "Lokal Laklı ve Selefonlu Kapak Katalog Baskı Detayı",
        title: "Kapak Selefon ve Lak Uygulaması",
        desc: "Kapakta mat/parlak selefon laminasyonu ve logo üzerine lokal kabartma lak ile zenginleştirilmiş prestijli görünüm."
      },
      {
        src: "/images/katalog/amerikan-cilt-katalog.webp",
        alt: "Amerikan Ciltli ve Çok Sayfalı Prestij Kataloğu",
        title: "Amerikan Ciltli Kalın Katalog",
        desc: "48 sayfa ve üzeri kalın kurumsal kataloglar için dayanıklı tutkallı Amerikan cilt ve sıcak presleme tekniği."
      }
    ];

    const priceTablesHtml = KATALOG_DATA.rows.map((row, rIdx) => {
      const productImage = KATALOG_CARD_IMAGES[rIdx % KATALOG_CARD_IMAGES.length];
      const imgDim = KATALOG_IMAGE_DIMENSIONS[productImage] || { width: 1536, height: 1024 };

      const tierItems = [
        { qty: '50', price: row.p50 },
        { qty: '100', price: row.p100 },
        { qty: '250', price: row.p250 },
        { qty: '500', price: row.p500 },
        { qty: '1.000', price: row.p1000 }
      ].filter(item => item.price);

      const rowsHtml = tierItems.map((item) => `
        <tr class="border-b border-gray-100 last:border-0 hover:bg-primary/5 transition-colors">
          <th scope="row" class="p-3 border-r border-gray-200 text-black text-sm font-bold text-center">
            ${item.qty} Adet
          </th>
          <td class="p-3 border-r border-gray-200 text-black font-black text-base">${item.price}</td>
          <td class="p-2">
            <a 
              href="https://wa.me/905366022373"
              class="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-4 py-2 rounded-full text-xs md:text-sm font-black tracking-tight leading-none transition-all shadow-md whitespace-nowrap"
            >
              <span>Hemen Sipariş Ver</span>
            </a>
          </td>
        </tr>
      `).join('');

      const specialRowHtml = row.isSpecial ? `
        <tr>
          <td colspan="3" class="p-4">
            <a 
              href="https://wa.me/905366022373"
              class="w-full bg-primary text-white py-3 rounded-xl font-black uppercase tracking-tighter hover:bg-secondary transition-colors flex items-center justify-center gap-2"
            >
              ÖZEL TEKLİF ALIN
            </a>
          </td>
        </tr>
      ` : '';

      return `
        <div class="bg-white rounded-3xl overflow-visible shadow-2xl border border-gray-100 flex flex-col">
          <div class="p-6 bg-black text-white rounded-t-3xl flex items-center justify-between">
            <div>
              <h3 class="text-lg font-black uppercase tracking-tight leading-tight mb-1">${row.label}</h3>
              <p class="text-primary font-bold text-sm uppercase">${row.total} Katalog</p>
            </div>
            <span class="text-[10px] bg-primary/20 text-primary border border-primary/30 px-2.5 py-1 rounded-full font-black uppercase tracking-wider">
              Kuşe Baskı
            </span>
          </div>
          
          <div class="p-6 flex-grow flex flex-col justify-between">
            <div class="flex gap-4 mb-6">
              <div class="w-1/2 space-y-2">
                <div class="flex items-center gap-2 text-[11px] font-bold text-black">
                  <div class="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  İç Sayfalar: 135 gr Kuşe
                </div>
                <div class="flex items-center gap-2 text-[11px] font-bold text-black">
                  <div class="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Kapaklar: 300 gr Kuşe
                </div>
                <div class="flex items-center gap-2 text-[11px] font-bold text-black">
                  <div class="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Cilt: Tel Dikiş
                </div>
                <div class="flex items-center gap-2 text-[11px] font-bold text-black">
                  <div class="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Kapaklar: Mat/Parlak Selefon
                </div>
              </div>

              <div class="w-1/2 rounded-xl overflow-hidden border border-gray-100 shadow-inner bg-gray-50 flex items-center justify-center relative min-h-[192px]">
                <div class="relative w-full h-48 group">
                  <img 
                    src="${productImage}" 
                    alt="Katalog Baskı ${row.label}" 
                    width="${imgDim.width}"
                    height="${imgDim.height}"
                    class="w-full h-48 object-cover rounded-lg"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

            <div class="overflow-visible rounded-2xl border border-gray-200">
              <table class="w-full text-center text-xs">
                <caption class="sr-only">${row.label} - ${row.total} Katalog Baskı Fiyat Tablosu</caption>
                <thead>
                  <tr class="bg-gray-100 text-black font-black uppercase tracking-widest border-b border-gray-200">
                    <th scope="col" class="p-3 border-r border-gray-200">ADET</th>
                    <th scope="col" class="p-3 border-r border-gray-200">FİYAT</th>
                    <th scope="col" class="p-3">SİPARİŞ</th>
                  </tr>
                </thead>
                <tbody class="font-bold">
                  ${rowsHtml}
                  ${specialRowHtml}
                </tbody>
              </table>
              <div class="bg-slate-50 px-5 py-3 border-t border-gray-150 flex flex-col sm:flex-row justify-center items-center text-[10px] sm:text-xs text-slate-500 font-medium font-sans">
                <span>* Tabloda belirtilen fiyatlarımıza %20 KDV dahil değildir.</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const galleryHtml = `
      <div class="mt-16 mb-8 text-black">
        <div class="flex items-center gap-3 mb-6 px-2">
          <div class="w-2.5 h-7 bg-primary rounded-full"></div>
          <h2 class="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
            Katalog Ürün Fotoğrafları ve Örnekleri
          </h2>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${KATALOG_GALLERY.map(img => `
            <figure class="bg-white border border-gray-150 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all group">
              <div class="overflow-hidden rounded-xl bg-gray-50 mb-4 flex items-center justify-center p-1.5 w-full aspect-[4/3] relative transition-all duration-300 border border-gray-100">
                <img 
                  src="${img.src}" 
                  alt="${img.alt}" 
                  title="${img.title}" 
                  width="${KATALOG_IMAGE_DIMENSIONS[img.src]?.width || 1536}"
                  height="${KATALOG_IMAGE_DIMENSIONS[img.src]?.height || 1024}"
                  loading="lazy"
                  decoding="async"
                  class="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-all duration-300" 
                />
              </div>
              <div class="mt-2">
                <h3 class="text-sm font-black text-black uppercase mb-1.5">${img.title}</h3>
                <figcaption class="text-gray-600 text-xs font-semibold leading-relaxed">
                  ${img.desc}
                </figcaption>
              </div>
            </figure>
          `).join('')}
        </div>
      </div>
    `;

    const explanationTablesHtml = `
      <section class="mt-16">
        <h2 class="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Neden Tasarım + Baskı Tek Yerde?</h2>
        <p class="text-gray-600 font-medium leading-relaxed mb-6">
          Profesyonel katalog tasarımı hizmetini ofset baskıyla bir arada sunarak şeffaf katalog tasarım fiyatları ve bütçenize uygun katalog hazırlama fiyatları avantajı sağlıyoruz.
        </p>
        <div class="overflow-x-auto rounded-2xl border border-gray-200">
          <table class="w-full text-left border-collapse">
            <caption class="sr-only">Neden Tasarım ve Baskı Tek Yerde Avantaj Tablosu</caption>
            <thead>
              <tr class="bg-black text-white">
                <th scope="col" class="p-4 font-black uppercase tracking-tight border-r border-white/10">AVANTAJ</th>
                <th scope="col" class="p-4 font-black uppercase tracking-tight">AÇIKLAMA</th>
              </tr>
            </thead>
            <tbody class="text-black font-medium">
              <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <th scope="row" class="p-4 border-r border-gray-100 font-black text-left">Zaman Tasarrufu</th>
                <td class="p-4">Tek iletişim noktası, hızlı revizyon süreçleri.</td>
              </tr>
              <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <th scope="row" class="p-4 border-r border-gray-100 font-black text-left">Maliyet Avantajı</th>
                <td class="p-4">Tasarım dahil paketlerde daha uygun fiyatlar ve avantajlı üretim imkanı.</td>
              </tr>
              <tr class="hover:bg-gray-50 transition-colors">
                <th scope="row" class="p-4 border-r border-gray-100 font-black text-left">Renk Uyumu</th>
                <td class="p-4">Tasarımcı ve matbaa ekibi aynı çatı altında tam uyum.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="mt-16">
        <h2 class="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Forma Mantığı ve Katalog Fiyatları</h2>
        <p class="text-lg text-gray-600 font-medium leading-relaxed mb-8">
          Matbaada kağıt firesini azaltmak, katalog baskı fiyatlarını düşürmenin en etkili yoludur. Forma düzenine tam oturan 8 sayfa katalog baskı, 12 sayfa katalog baskı ve 16 sayfa katalog baskı gibi seçeneklerde birim maliyet düşer. Standart ebatlarda hesaplanan A4 katalog fiyatları ve taşınabilir A5 katalog baskı seçenekleri forma verimliliği sayesinde bütçenizi korur.
        </p>
        <div class="overflow-x-auto rounded-2xl border border-gray-200">
          <table class="w-full text-left border-collapse">
            <caption class="sr-only">Forma Mantığı ve Katalog Ebat Maliyet Tablosu</caption>
            <thead>
              <tr class="bg-primary text-white">
                <th scope="col" class="p-4 font-black uppercase tracking-tight border-r border-white/10">EBAT</th>
                <th scope="col" class="p-4 font-black uppercase tracking-tight border-r border-white/10">SAYFA/FORMA</th>
                <th scope="col" class="p-4 font-black uppercase tracking-tight">MALİYET ETKİSİ</th>
              </tr>
            </thead>
            <tbody class="text-black font-medium">
              <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <th scope="row" class="p-4 border-r border-gray-100 font-black text-left">A4</th>
                <td class="p-4 border-r border-gray-100">16 Sayfa</td>
                <td class="p-4 text-green-600 font-black">En düşük birim maliyet</td>
              </tr>
              <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <th scope="row" class="p-4 border-r border-gray-100 font-black text-left">A5</th>
                <td class="p-4 border-r border-gray-100">32 Sayfa</td>
                <td class="p-4 text-green-600 font-black">%20'ye varan tasarruf</td>
              </tr>
              <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <th scope="row" class="p-4 border-r border-gray-100 font-black text-left">Kare (20x20)</th>
                <td class="p-4 border-r border-gray-100">24 Sayfa</td>
                <td class="p-4">Düşük fire, ekonomik</td>
              </tr>
              <tr class="hover:bg-gray-50 transition-colors">
                <th scope="row" class="p-4 border-r border-gray-100 font-black text-left">Yatay (A4 Yatay)</th>
                <td class="p-4 border-r border-gray-100">16 Sayfa</td>
                <td class="p-4">150+ adet için ekonomik</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    `;

    const faqsHtml = KATALOG_FAQS.map(item => `
      <div style="background-color: #f9fafb; padding: 16px; border-radius: 12px; border: 1px solid #f3f4f6; margin-bottom: 16px;">
        <h3 style="font-weight: 700; color: #000000; margin-bottom: 4px;">${item.q}</h3>
        <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0;">${item.a}</p>
      </div>
    `).join('');

    const bodyContent = `<div class="bg-gray-50 border-b border-gray-100 py-3">
  <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="flex text-xs text-gray-500 font-medium" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2 flex-wrap">
        <li class="inline-flex items-center">
          <a href="/" class="text-gray-600 hover:text-primary transition-colors">Ana Sayfa</a>
        </li>
        <li>
          <div class="flex items-center">
            <span class="mx-2 text-gray-400" aria-hidden="true">/</span>
            <a href="/matbaa" class="text-gray-600 hover:text-primary transition-colors">Matbaa Ürünleri</a>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <span class="mx-2 text-gray-400" aria-hidden="true">/</span>
            <span class="text-gray-900 font-semibold" aria-current="page">Katalog Baskı Fiyatları</span>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</div>
<div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
  <div class="mb-8">
    <span class="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-3">A4 / A5 Ebat - Tel Dikiş &amp; Amerikan Cilt</span>
    <h1 class="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">Kurumsal Ürün Kataloğu Tasarımı &amp; Katalog Baskı Fiyatları</h1>
    <p class="text-slate-600 text-sm md:text-base leading-relaxed max-w-4xl">
      Katalog baskı ve katalog basım fiyatları; seçilen ebat, sayfa sayısı, kuşe kâğıt, cilt türü ve adet bilgilerine göre belirlenir. A4 ve A5 ebatlarında, 135 gr kuşe iç sayfalar ve 300 gr mat/parlak selefonlu kapak alternatifiyle tel dikiş veya Amerikan ciltli profesyonel <strong class="text-slate-900">ürün katalog baskı</strong> çözümleri sunuyoruz. Kurumsal tanıtım materyalleriniz için <a href="/brosur" class="text-primary hover:underline font-bold">broşür</a>, <a href="/karton-canta" class="text-primary hover:underline font-bold">karton çanta</a>, <a href="/dosyalar" class="text-primary hover:underline">cepli dosya</a> ve <a href="/kartvizit" class="text-primary hover:underline">kartvizit</a> ürünlerini fabrikamızdan sipariş edebilirsiniz.
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
    ${priceTablesHtml}
  </div>

  <div class="mt-12 p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
    <p class="text-black font-bold text-center text-sm italic leading-relaxed">
      Yukarıdaki katalog baskı fiyat listesi içerisinde yer alan katalog fiyatları; 50, 100, 250, 500 ve 1.000 adetlik sipariş kademelerine göre hazırlanmıştır. Tanıtım bütçenize göre 100 adet katalog veya yüksek tirajlı 1000 adet katalog fiyatı alternatiflerini tablodan karşılaştırabilirsiniz.
      <br class="my-1" />
      ${KATALOG_DATA.footerNote}
    </p>
  </div>

  ${galleryHtml}

  ${explanationTablesHtml}

  <div class="mt-16 border-t border-gray-100 pt-6">
    <h2 class="text-xl md:text-2xl font-bold text-black mb-4">Sıkça Sorulan Sorular (SSS)</h2>
    <div class="space-y-4">
      ${faqsHtml}
    </div>
  </div>
</div>`;

    return {
      title: staticPages["/kataloglar"].title,
      desc: staticPages["/kataloglar"].desc,
      canonical: "https://mavibasim.com/kataloglar",
      extraHead,
      h1Text: "Kurumsal Ürün Kataloğu Tasarımı & Katalog Baskı Fiyatları",
      bodyContent
    };
  }

  if (p === '/makine-parkuru') {
    const aboutSchema = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "Mavi Basım Makine Parkuru ve Üretim Altyapısı",
      "url": "https://mavibasim.com/makine-parkuru",
      "image": "https://mavibasim.com/images/hakkimizda/tecrube-matbaa.webp",
      "description": "Mavi Basım İstanbul Topkapı ve Zeytinburnu entegre tesislerimizde yer alan Heidelberg ofset baskı makineleri, Polar giyotin, selefon, sıcak varak ve lak ünitelerinden oluşan modern makine parkurumuz.",
      "publisher": {
        "@type": "Organization",
        "name": "Mavi Basım",
        "url": "https://mavibasim.com",
        "logo": "https://mavibasim.com/mavilogo.png"
      }
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Sayfa",
          "item": "https://mavibasim.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Makine Parkuru",
          "item": "https://mavibasim.com/makine-parkuru"
        }
      ]
    };

    let extraHead = `  <script type="application/ld+json">${JSON.stringify(aboutSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;

    const bodyContent = `<h1>Mavi Basım Makine Parkuru ve Üretim Altyapısı</h1>
<p>Mavi Basım İstanbul Zeytinburnu Topkapı 2. Matbaacılar Sitesi’ndeki modern tesislerimizde Heidelberg ofset baskı makineleri, Polar giyotin kesim üniteleri, termal selefon makineleri ve mücellit altyapımızla yüksek kaliteli matbaa çözümleri üretiyoruz.</p>`;

    return {
      title: staticPages["/makine-parkuru"].title,
      desc: staticPages["/makine-parkuru"].desc,
      canonical: "https://mavibasim.com/makine-parkuru",
      extraHead,
      h1Text: "Mavi Basım Makine Parkuru ve Üretim Altyapısı",
      bodyContent
    };
  }

  if (p === '/zarf') {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Sayfa",
          "item": "https://mavibasim.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Matbaa Ürünleri",
          "item": "https://mavibasim.com/matbaa"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Zarf Baskı",
          "item": "https://mavibasim.com/zarf"
        }
      ]
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": ZARF_FAQS.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    };

    let extraHead = `  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;

    return {
      title: staticPages["/zarf"].title,
      desc: staticPages["/zarf"].desc,
      canonical,
      extraHead,
      h1Text: "Diplomat Zarf Baskı Fiyatları & Torba Zarf"
    };
  }

  if (p === '/dosyalar') {
    const breadcrumbSchema = {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://mavibasim.com/" },
        { "@type": "ListItem", "position": 2, "name": "Matbaa Ürünleri", "item": "https://mavibasim.com/matbaa" },
        { "@type": "ListItem", "position": 3, "name": "Cepli Dosya Baskı", "item": canonical }
      ]
    };
    const faqSchema = {
      "@context": "https://schema.org", "@type": "FAQPage",
      "mainEntity": DOSYALAR_DETAILS.faqList.map(faq => ({
        "@type": "Question", "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a }
      }))
    };
    return {
      title: staticPages["/dosyalar"].title, desc: staticPages["/dosyalar"].desc,
      canonical, h1Text: DOSYALAR_DETAILS.h1Title,
      extraHead: [breadcrumbSchema, faqSchema].map(schema =>
        `  <script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('\n') + '\n'
    };
  }

    if (p === '/karton-canta') {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Sayfa",
          "item": "https://mavibasim.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Matbaa Ürünleri",
          "item": "https://mavibasim.com/matbaa"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Karton Çanta Baskı",
          "item": "https://mavibasim.com/karton-canta"
        }
      ]
    };

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Karton Çanta Baskı Fiyatları & İpli Karton Poşet İmalatı",
      "image": "https://mavibasim.com/images/karton-canta/karton-canta-baski-fiyatlari.webp",
      "description": "210 gr. Amerikan Bristol kağıt üzeri ofset baskılı, mat veya parlak selefon kaplamalı ve pamuk kordon ipli karton çanta imalat fiyatları.",
      "brand": {
        "@type": "Brand",
        "name": "Mavi Basım"
      },
      "category": "Karton Çanta Baskı",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": "9100",
        "highPrice": "21500",
        "offerCount": "16"
      }
    };

    const kartonCantaFaqs = [
      {
        q: "Baskılı karton poşet üretiminde minimum sipariş miktarı nedir?",
        a: "Standart fiyat listemizde 500 ve 1.000 adet seçenekleri bulunuyor. 1.000 adet seçeneğinde birim fiyat daha avantajlıdır. Farklı adet veya özel ebat talepleriniz için sipariş öncesinde bizimle iletişime geçebilirsiniz."
      },
      {
        q: "Kurumsal poşet üzerine firma logosu ve kurumsal tasarım basılabilir mi?",
        a: "Evet. Özel üretim poşetler firmanızın logosu, kurumsal renkleri ve iletişim bilgileriyle firmanıza özel olarak yüksek kaliteli ofset baskı tekniğiyle üretilebilmektedir."
      },
      {
        q: "Alışveriş çantası modelleri hangi ölçülerde üretilebilmektedir?",
        a: "Standart taşıma çantası ölçülerinin yanı sıra ihtiyacınıza uygun özel ebatlarda da promosyon çantası üretimi yapılabilmektedir. Ürününüze en uygun ölçü konusunda destek sağlayabiliriz."
      },
      {
        q: "Hangi baskılı taşıma çantası malzemelerini tercih edebilirim?",
        a: "Logolu poşetler; Amerikan Bristol, Kraft ve farklı gramaj seçenekleriyle üretilebilmektedir. Kullanım alanınıza ve kurumsal kimliğinize uygun malzeme tercih edebilirsiniz."
      },
      {
        q: "Amerikan Bristol ile Kraft çanta arasındaki fark nedir?",
        a: "Amerikan Bristol beyaz zeminlidir ve üzerine full renkli kaliteli baskı pürüzsüz yapılır, selefonla kaplanır. Kraft çantalar ise doğal kahverengidir, doğa dostu mat ve rustik bir dokuya sahiptir."
      },
      {
        q: "Sap çeşitlerinde kurdele veya farklı ip seçenekleri kullanılabiliyor mu?",
        a: "Evet, lüks hediye ve kozmetik amaçlı şık karton çantalarda standart bükümlü ip sapların yanı sıra şerit kurdele sistemi ve pamuk kordon seçenekleri uygulanabilmektedir."
      },
      {
        q: "Mat ve parlak selefon uygulanabiliyor mu?",
        a: "Evet. Baskının daha dayanıklı ve şık görünmesi için ipli karton poşet modellerine isteğe bağlı olarak mat veya parlak selefon kaplama uygulanabilmektedir."
      },
      {
        q: "Baskılı karton poşet modelleri dayanıklı mı?",
        a: "Evet. Kaliteli karton malzeme ve taban destek kartonu sayesinde kurumsal poşetler günlük kullanımda dayanıklı ve uzun ömürlü bir kullanım sunmaktadır."
      },
      {
        q: "Promosyon çantası baskısı kaç günde tamamlanır?",
        a: "Grafik tasarım onayının ardından alışveriş çantası üretimi genellikle 4-6 iş günü içerisinde tamamlanarak kargoya teslim edilmektedir."
      },
      {
        q: "İpli karton poşet siparişi nasıl verilir ve kargo ile gönderim yapılıyor mu?",
        a: "Baskıda kullanılacak logo ve sipariş bilgilerinizi paylaşmanızın ardından tasarım onayıyla üretim başlatılır. Üretilen çantalar Türkiye'nin tüm il ve ilçelerine güvenli kargo ile ulaştırılır."
      }
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": kartonCantaFaqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    };

    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://mavibasim.com/#organization",
      "name": "Mavi Basım Matbaa & Reklam",
      "url": "https://mavibasim.com",
      "logo": "https://mavibasim.com/mavilogo.png",
      "image": "https://mavibasim.com/mavilogo.png",
      "telephone": "+905366022373",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Maltepe Mah. Davutpaşa Cad. Topkapı 2. Matbaacılar Sitesi B Blok No:2NB",
        "addressLocality": "Zeytinburnu",
        "addressRegion": "İstanbul",
        "addressCountry": "TR"
      }
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://mavibasim.com/#website",
      "url": "https://mavibasim.com",
      "name": "Mavi Basım Matbaa",
      "publisher": { "@id": "https://mavibasim.com/#organization" }
    };

    let extraHead = `  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(productSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(orgSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>\n`;

    const flatItems: any[] = [];
    KARTON_CANTA_DATA.forEach((group) => {
      group.items.forEach((item, index) => {
        flatItems.push({
          ...item,
          ebat: group.ebat,
          groupIndex: index,
          groupSize: group.items.length
        });
      });
    });

    const tableRowsHtml = flatItems.map((item, idx) => {
      const isFirstRow = idx === 0;
      const isGroupFirstRow = item.groupIndex === 0;

      return `
        <tr class="${item.groupIndex === item.groupSize - 1 && idx < flatItems.length - 1 ? 'border-b-4 border-primary' : 'border-b-2 border-slate-200'} hover:bg-primary/5 transition-all">
          ${isFirstRow ? `
            <td rowspan="${flatItems.length}" class="bg-primary text-white font-black text-center p-1 w-10 border-r-2 border-slate-300/40" style="writing-mode: vertical-rl; transform: rotate(180deg);">
              <span class="tracking-[0.1em] uppercase text-[10px] md:text-[12px] whitespace-nowrap">KARTON ÇANTA</span>
            </td>
          ` : ''}
          <th scope="row" class="p-3 text-center font-bold text-primary border-r-2 border-slate-200">${item.code}</th>
          <td class="p-3 text-center text-black font-medium border-r-2 border-slate-200">${item.miktar}</td>
          ${isGroupFirstRow ? `
            <td rowspan="${item.groupSize}" class="p-3 text-center text-black font-black border-r-2 border-slate-200 align-middle text-sm md:text-base whitespace-nowrap bg-gray-50/10">
              ${item.ebat}
            </td>
          ` : ''}
          <td class="p-3 text-left font-medium border-r-2 border-slate-200 text-black">${item.desc}</td>
          <td class="p-3 text-center font-black text-black border-r-2 border-slate-200 bg-gray-50/30 text-[14px] md:text-[16px]">${item.price}</td>
          <td class="p-3 text-center">
            <a href="https://wa.me/905366022373?text=${encodeURIComponent(`Merhaba, Karton Çanta - ${item.code} (${item.ebat}, ${item.miktar}, ${item.price}) siparişi vermek istiyorum.`)}" class="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-4 py-2 rounded-full text-xs md:text-sm font-black tracking-tight leading-none shadow-md whitespace-nowrap">
              <span>Hemen Sipariş Ver</span>
            </a>
          </td>
        </tr>
      `;
    }).join('');

    const faqCardsHtml = kartonCantaFaqs.map((faq) => `
      <div class="h-full border border-gray-200 rounded-2xl p-5 bg-white shadow-xs flex flex-col justify-between text-black">
        <div>
          <h3 class="md:text-base text-sm leading-relaxed mb-2.5 text-black font-bold flex items-start gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-2"></span>
            <span>${faq.q}</span>
          </h3>
          <div class="h-px bg-gray-100 my-2.5 w-full"></div>
          <p class="text-slate-650 md:text-sm text-xs leading-relaxed">
            ${faq.a}
          </p>
        </div>
      </div>
    `).join('');

    const bodyContent = `
<div class="bg-gray-50 border-b border-gray-100 py-3">
  <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="flex text-xs text-gray-500 font-medium" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2 flex-wrap">
        <li class="inline-flex items-center">
          <a href="/" class="text-gray-600 hover:text-primary transition-colors">Ana Sayfa</a>
        </li>
        <li>
          <div class="flex items-center">
            <span class="mx-2 text-gray-400" aria-hidden="true">/</span>
            <a href="/matbaa" class="text-gray-600 hover:text-primary transition-colors">Matbaa Ürünleri</a>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <span class="mx-2 text-gray-400" aria-hidden="true">/</span>
            <span class="text-gray-900 font-semibold" aria-current="page">Karton Çanta Baskı</span>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</div>
<div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 text-black">
  <div class="text-center mb-6">
    <h1 class="text-xl md:text-3xl font-black text-black uppercase tracking-tight mb-3">
      Karton Çanta Baskı Fiyatları &amp; İpli Karton Poşet İmalatı
    </h1>
    <p class="text-gray-650 text-xs sm:text-sm font-semibold max-w-3xl mx-auto">
      Mavi Basım olarak İstanbul Topkapı imalat tesisimizde mağazalar, butikler ve kurumsal firmalar için taban takviyeli, ipli logo baskılı şık karton çanta imalatı yapıyoruz.
    </p>
  </div>

  <div class="scroll-mt-24 group mb-12">
    <div class="flex justify-between items-center mb-6 px-2">
      <div class="flex items-center gap-3">
        <div class="w-2 h-8 bg-secondary rounded-full"></div>
        <h2 class="text-xl md:text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2 flex-wrap">
          Karton Çanta Fiyat Listesi
        </h2>
      </div>
      <div class="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-150 text-[11px] font-bold">
        <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
        <span>210 gr. Amerikan Bristol - 4 Renk</span>
      </div>
    </div>

    <p class="text-gray-650 text-xs sm:text-sm font-semibold mb-6 px-2 leading-relaxed">
      Aşağıdaki tabloda güncel karton çanta baskı fiyatlarımızı inceleyebilirsiniz. Üretim süreçlerinde kalın destek kartonları ve mukavemetli ipler standart olarak uygulanmaktadır.
    </p>

    <div class="bg-white rounded-2xl shadow-xl border-2 border-slate-300 overflow-visible relative z-10">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-[11px] md:text-[13px] font-sans border-2 border-slate-300">
          <caption class="sr-only">Karton Çanta Fiyat Listesi</caption>
          <thead>
            <tr class="bg-black text-white border-b-2 border-slate-300 text-center font-black uppercase tracking-tight">
              <th scope="col" class="p-4 w-10">
                <span class="sr-only">Kategori</span>
              </th>
              <th scope="col" class="p-4 w-24 border-r-2 border-slate-700/30">KOD</th>
              <th scope="col" class="p-4 text-center border-r-2 border-slate-700/30">ADET</th>
              <th scope="col" class="p-4 text-center border-r-2 border-slate-700/30">EBAT</th>
              <th scope="col" class="p-4 text-left border-r-2 border-slate-700/30">AÇIKLAMA</th>
              <th scope="col" class="p-4 w-32 border-r-2 border-slate-700/30">FİYAT</th>
              <th scope="col" class="p-4 w-44 text-center">SİPARİŞ</th>
            </tr>
          </thead>
          <tbody>
            ${tableRowsHtml}
          </tbody>
        </table>
      </div>
      <div class="bg-slate-50 px-5 py-3 border-t border-gray-150 rounded-b-2xl flex flex-col sm:flex-row justify-center items-center text-xs text-slate-500 font-medium font-sans">
        <span>* Tabloda belirtilen fiyatlarımıza %20 KDV dahil değildir.</span>
      </div>
    </div>
  </div>

  <figure class="my-4"><img src="/images/karton-canta/ipli-karton-canta-ornegi.webp" alt="İpli karton çanta baskısı, Amerikan Bristol üzerine mat selefon kaplamalı logo baskılı mağaza poşeti" width="1536" height="1024" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
  <figure class="my-4"><img src="/images/karton-canta/karton-canta-baski-detayi.webp" alt="Butik giyim mağazası için logo baskılı karton poşet imalatı ve şık kordon sap detayı" width="1536" height="1024" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
  <figure class="my-4"><img src="/images/karton-canta/karton-canta-baski-fiyatlari.webp" alt="Toptan karton çanta baskı fiyatları, kurumsal promosyon ve fuar çantası üretim aşaması" width="800" height="533" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
  <figure class="my-4"><img src="/images/karton-canta/karton-canta-tasarimi.webp" alt="Özel tasarım lüks karton çanta, kabartma laklı ve gümüş varak yaldız baskılı marka ambalajı" width="1536" height="1024" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
  <figure class="my-4"><img src="/images/karton-canta/magaza-karton-canta-baski.webp" alt="Kozmetik ve saat mağazaları için özel ölçülerde üretilen ipli karton poşet modelleri" width="1536" height="1024" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
  <figure class="my-4"><img src="/images/karton-canta/karton_canta-baski.webp" alt="Türkiye geneli kargo teslimatlı, dayanıklı taban destekli toptan kraft karton çanta imalatı" width="1536" height="1024" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>

  <div class="mb-12 scroll-mt-24 text-black mt-12">
    <div class="flex justify-between items-center mb-6 px-2">
      <div class="flex items-center gap-3">
        <span class="w-2.5 h-6 bg-secondary rounded-full"></span>
        <h2 class="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
          Sıkça Sorulan Sorular
        </h2>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
      ${faqCardsHtml}
    </div>
  </div>
</div>
`;

    return {
      title: staticPages["/karton-canta"].title,
      desc: staticPages["/karton-canta"].desc,
      canonical,
      extraHead,
      h1Text: "Karton Çanta Baskı Fiyatları & İpli Karton Poşet İmalatı",
      bodyContent
    };
  }

  if (p === '/yag-karti') {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Sayfa",
          "item": "https://mavibasim.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Matbaa Ürünleri",
          "item": "https://mavibasim.com/matbaa"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Yağ Kartı Baskı",
          "item": "https://mavibasim.com/yag-karti"
        }
      ]
    };

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Oto Servis Logolu Yağ Değişim Kartı Baskısı",
      "image": [
        "https://mavibasim.com/images/yag-karti/oto-yag-degisim-karti.webp",
        "https://mavibasim.com/images/yag-karti/yag-takip-karti-ornegi.webp",
        "https://mavibasim.com/images/yag-karti/yag-karti-baski.webp",
        "https://mavibasim.com/images/yag-karti/promosyon-yag-karti-tasarimi.webp",
        "https://mavibasim.com/images/yag-karti/yag-karti-baski-fiyatlari.webp",
        "https://mavibasim.com/images/yag-karti/mat-selefon-yag-karti.webp"
      ],
      "description": "Oto servisleri ve bakım istasyonları için 350 gr ve 700 gr mat selefonlu, 4 mm delikli, ipli özel kesim araç periyodik bakım ve yağ değişim takip kartı imalatı.",
      "sku": "YAG-KARTI-1000",
      "brand": {
        "@type": "Brand",
        "name": "Mavi Basım"
      },
      "category": "Yağ Kartı Baskı",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": "2760",
        "highPrice": "4100",
                "offerCount": "4"
      }
    };

    const yagKartiFaqs = [
      {
        q: "Yağ kartı siparişlerinde minimum üretim adedi nedir?",
        a: "Minimum sipariş adedi standart modellerde 1.000 adettir. Fiyat tablosunda yer almayan farklı adet talepleri teklif aşamasında değerlendirilir."
      },
      {
        q: "350 gr kuşe ile 700 gr sıvama karton arasındaki fark nedir?",
        a: "350 gr kuşe standart kalınlıkta ve esnek karton seçeneğidir. 700 gr sıvama ise iki tabaka kartonun preslenerek birleştirilmesiyle elde edilen daha rijit ve kalın gövde yapısına sahip modeldir."
      },
      {
        q: "Yağ kartlarında hangi ebat seçenekleri bulunmaktadır?",
        a: "Standart olarak 5,4x10,2 cm (küçük boy) ve 6,5x12,5 cm (büyük boy) seçenekleri sunulmaktadır. Kullanım alanına ve yer verilecek bilgi yoğunluğuna göre ebat tercihi yapılabilir."
      },
      {
        q: "Yağ kartı tasarım dosyası nasıl hazırlanmalıdır?",
        a: "Baskıya hazır PDF, AI veya CDR formatındaki vektörel çalışmalar tercih edilir. Tasarımlarınızın CMYK renk modunda, 3 mm taşma payı ve üstte 15 mm delik payı bırakılarak hazırlanması önerilir."
      },
      {
        q: "Baskı öncesinde kontrol amacıyla onay provası iletiliyor mu?",
        a: "Evet. Siparişinizin baskı aşamasına geçmeden önce kontrol edilmesi için dijital PDF onay provası paylaşılır ve teyidiniz alınır."
      },
      {
        q: "Yağ kartları delikli ve ipliğiyle birlikte mi gönderilir?",
        a: "Evet. Kartların üst kısmında standart 4 mm asma deliği açılır ve araç içine veya aynaya asılmasını sağlayan bağlama iplikleri paket içeriğinde teslim edilir."
      },
      {
        q: "Listede yer almayan özel ölçü veya farklı adetlerde sipariş verilebilir mi?",
        a: "Evet. Standart ölçü ve tirajların dışındaki özel bıçak kesimli veya farklı adetlerdeki talepleriniz için WhatsApp veya iletişim kanallarımız üzerinden teklif alabilirsiniz."
      },
      {
        q: "Üretim ve kargo planı nasıl belirlenir?",
        a: "Tasarım onayının tamamlanması ve üretim sürecinin ardından siparişiniz anlaşmalı kargo ile adresinize sevk edilir. Net kargo ve teslimat planı teklif veya sipariş aşamasında paylaşılır."
      }
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": yagKartiFaqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    };

    let extraHead = `  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(productSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;

    const faqsHtml = yagKartiFaqs.map(item => `
      <div style="background-color: #f9fafb; padding: 16px; border-radius: 12px; border: 1px solid #f3f4f6; margin-bottom: 16px;">
        <h3 style="font-weight: 700; color: #000000; margin-bottom: 4px;">${item.q}</h3>
        <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0;">${item.a}</p>
      </div>
    `).join('');

    const bodyContent = `<div class="bg-gray-50 border-b border-gray-100 py-3">
  <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="flex text-xs text-gray-500 font-medium" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2 flex-wrap">
        <li class="inline-flex items-center">
          <a href="/" class="text-gray-600 hover:text-primary transition-colors">Ana Sayfa</a>
        </li>
        <li>
          <div class="flex items-center">
            <span class="mx-2 text-gray-400" aria-hidden="true">/</span>
            <a href="/matbaa" class="text-gray-600 hover:text-primary transition-colors">Matbaa Ürünleri</a>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <span class="mx-2 text-gray-400" aria-hidden="true">/</span>
            <span class="text-gray-900 font-semibold" aria-current="page">Yağ Kartı Baskı</span>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</div>
<h1>Oto Servis Logolu Yağ Değişim Kartı Baskısı</h1>
<p>350 gr kuşe veya 700 gr sıvama seçenekleri, mat selefonlu yüzey, asma deliği ve bağlama ipliği içeren yağ kartı modellerini inceleyebilirsiniz.</p>
<p>Sipariş öncesinde ürün modeli, adet, tasarım dosyası ve baskı onayı değerlendirilir. Üretim ve kargo planı teklif veya sipariş aşamasında netleştirilir.</p>

<div class="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-8">
  <div class="overflow-x-auto">
    <table class="w-full border-collapse text-xs sm:text-sm">
      <caption class="sr-only">Yağ Kartı Fiyat Listesi</caption>
      <thead>
        <tr class="bg-slate-900 text-white">
          <th scope="col" class="p-4 w-10"><span class="sr-only">Kategori</span></th>
          <th scope="col" class="p-4 w-28 text-left font-black uppercase tracking-wider text-xs sm:text-sm border-r border-slate-800">KOD</th>
          <th scope="col" class="p-4 text-center font-black uppercase tracking-wider text-xs sm:text-sm border-r border-slate-800">EBAT</th>
          <th scope="col" class="p-4 text-center font-black uppercase tracking-wider text-xs sm:text-sm border-r border-slate-800">AÇIKLAMA</th>
          <th scope="col" class="p-4 text-center font-black uppercase tracking-wider text-xs sm:text-sm border-r border-slate-800">ADET</th>
          <th scope="col" class="p-4 w-32 text-center font-black uppercase tracking-wider text-xs sm:text-sm border-r border-slate-800">FİYAT</th>
          <th scope="col" class="p-4 w-44 text-center font-black uppercase tracking-wider text-xs sm:text-sm">SİPARİŞ</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-slate-100">
          <td rowspan="4" class="bg-blue-700 text-white font-black text-center p-2 w-10 border-r border-blue-800"><span class="tracking-widest uppercase text-[10px]">YAĞ KARTI BASKI</span></td>
          <th scope="row" class="p-4 text-left font-bold text-primary border-r border-slate-100">Yag-cok-k</th>
          <td class="p-4 text-center text-slate-900 font-bold border-r border-slate-100">5,4x10,2 cm</td>
          <td class="p-4 text-center font-medium border-r border-slate-100 text-slate-800">350 gr. Kuşe Çift Yön Renkli Mat Selefonlu Kabartma Laklı Özel Kesim</td>
          <td class="p-4 text-center text-slate-900 font-bold border-r border-slate-100">1.000 Adet</td>
          <td class="p-4 text-center font-black text-slate-900 border-r border-slate-100">2.760 ₺</td>
          <td class="p-4 text-center whitespace-nowrap"><a href="https://wa.me/905366022373" class="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-bold">Hemen Sipariş Ver</a></td>
        </tr>
        <tr class="border-b border-slate-100">
          <th scope="row" class="p-4 text-left font-bold text-primary border-r border-slate-100">Yag-sek-k</th>
          <td class="p-4 text-center text-slate-900 font-bold border-r border-slate-100">5,4x10,2 cm</td>
          <td class="p-4 text-center font-medium border-r border-slate-100 text-slate-800">700 gr. Sıvama Mat Selefon Kabartma Laklı Özel Kesim</td>
          <td class="p-4 text-center text-slate-900 font-bold border-r border-slate-100">1.000 Adet</td>
          <td class="p-4 text-center font-black text-slate-900 border-r border-slate-100">3.140 ₺</td>
          <td class="p-4 text-center whitespace-nowrap"><a href="https://wa.me/905366022373" class="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-bold">Hemen Sipariş Ver</a></td>
        </tr>
        <tr class="border-b border-slate-100">
          <th scope="row" class="p-4 text-left font-bold text-primary border-r border-slate-100">Yag-cok-b</th>
          <td class="p-4 text-center text-slate-900 font-bold border-r border-slate-100">6,5x12,5 cm</td>
          <td class="p-4 text-center font-medium border-r border-slate-100 text-slate-800">350 gr. Kuşe Çift Yön Renkli Mat Selefonlu Kabartma Laklı Özel Kesim</td>
          <td class="p-4 text-center text-slate-900 font-bold border-r border-slate-100">1.000 Adet</td>
          <td class="p-4 text-center font-black text-slate-900 border-r border-slate-100">3.640 ₺</td>
          <td class="p-4 text-center whitespace-nowrap"><a href="https://wa.me/905366022373" class="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-bold">Hemen Sipariş Ver</a></td>
        </tr>
        <tr class="border-b border-slate-100">
          <th scope="row" class="p-4 text-left font-bold text-primary border-r border-slate-100">Yag-sek-b</th>
          <td class="p-4 text-center text-slate-900 font-bold border-r border-slate-100">6,5x12,5 cm</td>
          <td class="p-4 text-center font-medium border-r border-slate-100 text-slate-800">700 gr. Sıvama Mat Selefon Kabartma Laklı Özel Kesim</td>
          <td class="p-4 text-center text-slate-900 font-bold border-r border-slate-100">1.000 Adet</td>
          <td class="p-4 text-center font-black text-slate-900 border-r border-slate-100">4.100 ₺</td>
          <td class="p-4 text-center whitespace-nowrap"><a href="https://wa.me/905366022373" class="inline-flex items-center justify-center gap-1.5 bg-primary text-white px-3.5 py-2 rounded-xl text-xs font-bold">Hemen Sipariş Ver</a></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="bg-slate-50 px-5 py-3 border-t border-slate-200 text-xs text-slate-500 font-medium">
    * Fiyatlarımıza %20 KDV dahil değildir. Tüm yağ kartı siparişlerinde bağlama iplikleri paket içinde teslim edilir.
  </div>
</div>

<figure class="my-4"><img src="/images/yag-karti/oto-yag-degisim-karti.webp" alt="Oto Servis Yağ Değişim Kartı Ön Yüz Baskısı" width="1536" height="1024" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
<figure class="my-4"><img src="/images/yag-karti/yag-takip-karti-ornegi.webp" alt="Yağ Kartı Arka Yüz Kurumsal Logo ve Telefon Baskısı" width="1536" height="1024" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
<figure class="my-4"><img src="/images/yag-karti/yag-karti-baski.webp" alt="350 gr Kuşe Mat Selefonlu Yağ Değişim Takip Kartı" width="1536" height="1024" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
<figure class="my-4"><img src="/images/yag-karti/promosyon-yag-karti-tasarimi.webp" alt="700 gr Sıvama Mukavemetli Oto Servis Takip Kartı" width="1536" height="1024" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
<figure class="my-4"><img src="/images/yag-karti/yag-karti-baski-fiyatlari.webp" alt="İp Delikli Oto Yağ Değişim Kartı ve İplik Aksesuarı" width="1536" height="1024" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
<figure class="my-4"><img src="/images/yag-karti/mat-selefon-yag-karti.webp" alt="Mat Selefon Kaplamalı Yağ Değişim Kartı" width="1536" height="1024" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>

<h2>Yağ Kartı Baskı Sıkça Sorulan Sorular</h2>
<div class="space-y-4">
  ${faqsHtml}
</div>`;

    return {
      title: staticPages["/yag-karti"].title,
      desc: staticPages["/yag-karti"].desc,
      canonical,
      extraHead,
      h1Text: "Oto Servis Logolu Yağ Değişim Kartı Baskısı",
      bodyContent
    };
  }

  if (p === '/teslimat-sartlari') {
    const canonical = "https://mavibasim.com/teslimat-sartlari";
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      "url": canonical,
      "name": "Teslimat Şartları ve Kargo Gönderim Rehberi | Mavi Basım Matbaa",
      "description": "Mavi Basım Matbaa & Reklam Türkiye geneli 81 il kargo teslimat şartları, matbaa ürün paketleme standartları, kargo süreleri ve hasarlı kargo süreçleri rehberi.",
      "publisher": {
        "@type": "Organization",
        "name": "Mavi Basım Matbaa & Reklam",
        "url": "https://mavibasim.com",
        "logo": "https://mavibasim.com/mavilogo.png"
      },
      "inLanguage": "tr-TR"
    };
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Sayfa",
          "item": "https://mavibasim.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Teslimat Şartları",
          "item": canonical
        }
      ]
    };
    const extraHead = `  <script type="application/ld+json">${JSON.stringify(webPageSchema)}</script>\n  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
    const bodyContent = `<div class="bg-gray-50 border-b border-gray-100 py-3">
  <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="flex text-xs text-gray-500 font-medium" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2 flex-wrap">
        <li class="inline-flex items-center">
          <a href="/" class="text-gray-600 hover:text-primary transition-colors">Ana Sayfa</a>
        </li>
        <li>
          <div class="flex items-center">
            <span class="mx-2 text-gray-400" aria-hidden="true">/</span>
            <span class="text-gray-900 font-semibold" aria-current="page">Teslimat Şartları</span>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</div>
<main class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <header>
    <h1>Teslimat Şartları ve Kargo Politikası</h1>
    <p>Mavi Basım Matbaa & Reklam olarak, İstanbul Topkapı üretim merkezimizde özenle bastığımız tüm matbaa ve ambalaj ürünlerini Türkiye'nin 81 iline darbeye ve neme korumalı özel koli paketlemesiyle güvenle ulaştırıyoruz.</p>
  </header>
  <section class="mt-8 space-y-6">
    <article>
      <h2>Türkiye Geneli 81 İle Anlaşmalı Kargo ve Hızlı Teslimat</h2>
      <p>Tüm siparişleriniz standart olarak Türkiye genelinde anlaşmalı kargo ağımız ile adresinize kadar ulaştırılmaktadır. Ürünler neme ve darbeye karşı dayanıklı ambalaj ile paketlenir.</p>
    </article>
    <article>
      <h2>Üretim ve Kargoya Teslim Süreleri</h2>
      <p>Acil dijital baskılı siparişler 24 saat içinde; ofset matbaa baskıları ise 2 ila 4 iş günü içerisinde tamamlanarak kargoya teslim edilir.</p>
    </article>
    <article>
      <h2>Hasarlı Kargo ve Tutanak Süreci</h2>
      <p>Teslimat anında dış ambalajda hasar tespit edilirse kargo görevlisine Hasar Tespit Tutanağı tutturulmalıdır.</p>
    </article>
  </section>
</main>`;
    return {
      title: "Teslimat Şartları ve Kargo Gönderim Rehberi | Mavi Basım Matbaa",
      desc: "Mavi Basım Matbaa & Reklam Türkiye geneli 81 il kargo teslimat şartları, matbaa ürün paketleme standartları, kargo süreleri ve hasarlı kargo süreçleri rehberi.",
      canonical,
      extraHead,
      h1Text: "Teslimat Şartları ve Kargo Politikası",
      bodyContent
    };
  }

  if (p === '/para-makbuzu' && staticPages['/para-makbuzu']) {
    const detail = MAKBUZ_DETAILS['para-makbuzu'];
    const tableData = PARA_MAKBUZU_DATA[0];
    title = detail.seoTitle;
    desc = detail.seoDescription;

    const escapeHtml = (val: unknown): string =>
      String(val ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://mavibasim.com/#organization",
      "name": "Mavi Basım Matbaa & Reklam",
      "url": "https://mavibasim.com",
      "logo": "https://mavibasim.com/mavilogo.png",
      "image": "https://mavibasim.com/mavilogo.png",
      "telephone": "+905366022373",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Maltepe Mah. Davutpaşa Cad. Topkapı 2. Matbaacılar Sitesi B Blok No:2NB",
        "addressLocality": "Zeytinburnu",
        "addressRegion": "İstanbul",
        "addressCountry": "TR"
      }
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://mavibasim.com/#website",
      "url": "https://mavibasim.com",
      "name": "Mavi Basım Matbaa",
      "publisher": { "@id": "https://mavibasim.com/#organization" }
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://mavibasim.com" },
        { "@type": "ListItem", "position": 2, "name": "Makbuz & Formlar", "item": "https://mavibasim.com/makbuz-ve-formlar" },
        { "@type": "ListItem", "position": 3, "name": detail.breadcrumbTitle, "item": "https://mavibasim.com/para-makbuzu" }
      ]
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": detail.faqList.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a }
      }))
    };

    const prices = tableData.rows.filter(row => !row.label.includes('Renk Farkı'))
      .flatMap(row => row.values);
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "@id": `${canonical}#product`,
      "name": detail.h1Title,
      "description": desc,
      "image": detail.gallery.map(image => `https://mavibasim.com${image.src}`),
      "url": canonical,
      "brand": { "@type": "Brand", "name": "Mavi Basım" },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": String(Math.min(...prices)),
        "highPrice": String(Math.max(...prices)),
        "offerCount": String(prices.length),
        "url": canonical
      }
    };

    const imageSchemas = detail.gallery.map(g => ({
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "url": `https://mavibasim.com${g.src}`,
      "contentUrl": `https://mavibasim.com${g.src}`,
      "license": "https://mavibasim.com/lisans",
      "acquireLicensePage": "https://mavibasim.com/lisans",
      "creditText": "Mavi Basım Topkapı Matbaa",
      "creator": {
        "@type": "Organization",
        "name": "Mavi Basım"
      },
      "copyrightNotice": "Mavi Basım Matbaacılık",
      "caption": g.alt || g.title
    }));

    let extraHead = `<meta property="og:image:width" content="1536" />
      <meta property="og:image:height" content="1024" />
      <meta property="og:image:alt" content="${escapeHtml(detail.featureImageAlt)}" />
      <meta property="og:type" content="product" />
      <script type="application/ld+json">${JSON.stringify(localBusinessSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(productSchema)}</script>\n`;
    imageSchemas.forEach(img => {
      extraHead += `  <script type="application/ld+json">${JSON.stringify(img)}</script>\n`;
    });

    // Full content is supplied by prerenderParaMakbuzu using the existing page.
    const bodyContent = `<h1>${escapeHtml(detail.h1Title)}</h1><p>${escapeHtml(detail.subtitle)}</p>`;

    return {
      title,
      desc,
      canonical,
      extraHead,
      h1Text: detail.h1Title,
      bodyContent,
      ogImage: `https://mavibasim.com${detail.featureImage}`
    };
  }

  if (staticPages[p]) {
    title = staticPages[p].title;
    desc = staticPages[p].desc;
    return { title, desc, canonical };
  }

  // 2. Match from Makbuz and Form components database
  const pathMap: Record<string, string> = {
    "/adisyon": "adisyon",
    "/siparis-fisi": "siparis-fisi",
    "/perakende-satis-fisi": "perakende-satis-fisi",
    "/para-makbuzu": "para-makbuzu",
    "/sozlesme-baski": "sozlesme-baski",
    "/sigorta-policeleri": "sigorta-policeleri",
    "/tahsilat-makbuzu": "tahsilat-makbuzu",
    "/arac-kiralama": "arac-kiralama",
    "/gider-makbuzu": "gider-makbuzu",
    "/giris-bileti": "giris-bileti",
    "/recete": "recete",
    "/tediye-makbuzu": "tediye-makbuzu"
  };

  if (p === '/recete') {
    const detail = MAKBUZ_DETAILS["recete"];
    const title = detail.seoTitle;
    const desc = detail.seoDescription;
    const canonical = "https://mavibasim.com/recete";

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Sayfa",
          "item": "https://mavibasim.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Makbuz & Formlar",
          "item": "https://mavibasim.com/makbuz-ve-formlar"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": detail.breadcrumbTitle,
          "item": canonical
        }
      ]
    };

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": detail.h1Title,
      "image": `https://mavibasim.com${detail.featureImage}`,
      "description": detail.seoDescription,
      "brand": {
        "@type": "Brand",
        "name": "Mavi Basım"
      },
      "category": detail.breadcrumbTitle,
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": "1850",
        "highPrice": "3900",
        "offerCount": "6",
        "availability": "https://schema.org/InStock"
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": detail.faqList.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    };

    let extraHead = `  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(productSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;

    extraHead += '  <meta property="og:image:width" content="930" />\n';
    extraHead += '  <meta property="og:image:height" content="1117" />\n';

    const bodyContent = `<div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
  <nav class="text-xs font-bold text-gray-500 uppercase tracking-tight flex items-center gap-1.5" aria-label="Breadcrumb">
    <a href="/" class="hover:text-primary transition-colors">Ana Sayfa</a>
    <span class="text-gray-400">/</span>
    <a href="/makbuz-ve-formlar" class="hover:text-primary transition-colors">Makbuz &amp; Formlar</a>
    <span class="text-gray-400">/</span>
    <span class="text-gray-800 font-extrabold truncate" aria-current="page">${detail.breadcrumbTitle}</span>
  </nav>
</div>
<div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
  <h1>${detail.h1Title}</h1>
  <p>${detail.subtitle}</p>
  <div id="fiyat-tablosu">
    <table class="w-full border-collapse">
      <caption class="sr-only">Reçete 10 x 14 cm Fiyat Listesi</caption>
      <thead>
        <tr class="bg-black text-white">
          <th scope="col" class="p-4 border-r border-white/10 font-black text-left uppercase text-sm md:text-base whitespace-nowrap min-w-[140px]">YARIM BOY</th>
          <th scope="col" class="p-4 border-r border-white/10 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">5 CİLT</th>
          <th scope="col" class="p-4 border-r border-white/10 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">10 CİLT</th>
          <th scope="col" class="p-4 border-r border-white/10 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">20 CİLT</th>
          <th scope="col" class="p-4 border-r border-white/10 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">40 CİLT</th>
          <th scope="col" class="p-4 border-r border-white/10 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">50 CİLT</th>
          <th scope="col" class="p-4 border-r border-white/10 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">100 CİLT</th>
          <th scope="col" class="p-4 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">SİPARİŞ</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
          <th scope="row" class="p-4 border-r border-gray-200 font-black text-black bg-gray-50/50 text-sm md:text-base text-left">Fiyat</th>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">1.850 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">2.000 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">2.100 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">2.500 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">2.800 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">3.900 ₺</td>
          <td class="p-4 text-center">Sipariş Ver</td>
        </tr>
      </tbody>
    </table>
  </div>
  <figure class="my-4"><img src="/images/recete/numaratorlu-recete-basimi.webp" alt="numaratörlü reçete koçanı baskısı" width="930" height="1117" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
  <figure class="my-4"><img src="/images/recete/doktor-recetesi-basimi.webp" alt="kurumsal reçete koçanı baskısı" width="930" height="1117" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
  <figure class="my-4"><img src="/images/recete/recete-ornegi-doktor.webp" alt="numaratörlü reçete koçanı baskısı" width="930" height="1117" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
  <figure class="my-4"><img src="/images/recete/otokopili-recete-baski.webp" alt="otokopili reçete koçanı baskısı" width="930" height="1117" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
  <figure class="my-4"><img src="/images/recete/recete-kocani-ornegi.webp" alt="Reçete Şablonu" width="930" height="1117" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
  <div class="overflow-x-auto mb-6 border border-gray-200 rounded-xl">
    <table class="w-full text-left border-collapse">
      <caption class="sr-only">1. Hamur Reçete ve Otokopili Reçete Karşılaştırması</caption>
      <thead>
        <tr class="bg-gray-50 border-b border-gray-200">
          <th scope="col" class="p-4 font-black text-sm text-black">Özellik</th>
          <th scope="col" class="p-4 font-black text-sm text-black">Reçete</th>
          <th scope="col" class="p-4 font-black text-sm text-black">Otokopili / Çift Nüsha Reçete</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-200/60">
          <th scope="row" class="p-4 font-bold text-xs md:text-sm text-gray-900 text-left">Kullanım Özelliği</th>
          <td class="p-4 text-xs md:text-sm text-gray-700">Tek nüshadır.</td>
          <td class="p-4 text-xs md:text-sm text-gray-700">Otokopili seçenekler, kullanıcıların kendi iş akışlarına uygun olarak tercih edilebilir.</td>
        </tr>
        <tr class="border-b border-gray-200/60 bg-gray-50/30">
          <th scope="row" class="p-4 font-bold text-xs md:text-sm text-gray-900 text-left">Kağıt Özelliği</th>
          <td class="p-4 text-xs md:text-sm text-gray-700">80gr 1. hamur kaliteli kağıttır.</td>
          <td class="p-4 text-xs md:text-sm text-gray-700">Otokopi kağıdıdır, tükenmez kalemle yazıma uygundur.</td>
        </tr>
        <tr class="border-b border-gray-200/60">
          <th scope="row" class="p-4 font-bold text-xs md:text-sm text-gray-900 text-left">Yaprak Adedi</th>
          <td class="p-4 text-xs md:text-sm text-gray-700">Her ciltte 100 yaprak bulunur.</td>
          <td class="p-4 text-xs md:text-sm text-gray-700">Her ciltte 50 takım (toplam 100 sayfa) yer alır.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`;

    return {
      title,
      desc,
      canonical,
      extraHead,
      h1Text: detail.h1Title,
      bodyContent,
      ogImage: `https://mavibasim.com${detail.featureImage}`
    };
  }

  if (p === '/tediye-makbuzu') {
    const detail = MAKBUZ_DETAILS["tediye-makbuzu"];
    const title = detail.seoTitle;
    const desc = detail.seoDescription;
    const canonical = "https://mavibasim.com/tediye-makbuzu";

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Sayfa",
          "item": "https://mavibasim.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Makbuz & Formlar",
          "item": "https://mavibasim.com/makbuz-ve-formlar"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": detail.breadcrumbTitle,
          "item": canonical
        }
      ]
    };

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": detail.h1Title,
      "image": `https://mavibasim.com${detail.featureImage}`,
      "description": detail.seoDescription,
      "brand": {
        "@type": "Brand",
        "name": "Mavi Basım"
      },
      "category": detail.breadcrumbTitle,
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": "1900",
        "highPrice": "9250",
        "offerCount": "18"
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": detail.faqList.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    };

    let extraHead = `  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(productSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;

    const bodyContent = `<div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
  <nav class="text-xs font-bold text-gray-500 uppercase tracking-tight flex items-center gap-1.5" aria-label="Breadcrumb">
    <a href="/" class="hover:text-primary transition-colors">Ana Sayfa</a>
    <span class="text-gray-400">/</span>
    <a href="/makbuz-ve-formlar" class="hover:text-primary transition-colors">Makbuz &amp; Formlar</a>
    <span class="text-gray-400">/</span>
    <span class="text-gray-800 font-extrabold truncate" aria-current="page">${detail.breadcrumbTitle}</span>
  </nav>
</div>
<div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
  <h1>${detail.h1Title}</h1>
  <p>${detail.subtitle}</p>
  <div id="fiyat-tablosu">
    <table class="w-full border-collapse">
      <caption class="sr-only">Tediye Makbuzu 14 x 20 cm Yarım Boy Fiyat Listesi</caption>
      <thead>
        <tr class="bg-black text-white">
          <th scope="col" class="p-4 border-r border-white/10 font-black text-left uppercase text-sm md:text-base whitespace-nowrap min-w-[140px]">YARIM BOY</th>
          <th scope="col" class="p-4 border-r border-white/10 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">5 CİLT</th>
          <th scope="col" class="p-4 border-r border-white/10 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">10 CİLT</th>
          <th scope="col" class="p-4 border-r border-white/10 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">20 CİLT</th>
          <th scope="col" class="p-4 border-r border-white/10 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">30 CİLT</th>
          <th scope="col" class="p-4 border-r border-white/10 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">50 CİLT</th>
          <th scope="col" class="p-4 border-r border-white/10 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">100 CİLT</th>
          <th scope="col" class="p-4 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">SİPARİŞ</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
          <th scope="row" class="p-4 border-r border-gray-200 font-black text-black bg-gray-50/50 text-sm md:text-base text-left">1 Asıl + 1 Suret</th>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">1.900 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">2.000 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">2.250 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">2.950 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">3.700 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">5.750 ₺</td>
          <td class="p-4 text-center">Sipariş Ver</td>
        </tr>
        <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
          <th scope="row" class="p-4 border-r border-gray-200 font-black text-black bg-gray-50/50 text-sm md:text-base text-left">1 Asıl + 2 Suret</th>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">2.000 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">2.100 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">2.750 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">3.500 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">4.500 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">7.500 ₺</td>
          <td class="p-4 text-center">Sipariş Ver</td>
        </tr>
        <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
          <th scope="row" class="p-4 border-r border-gray-200 font-black text-black bg-gray-50/50 text-sm md:text-base text-left">1 Asıl + 3 Suret</th>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">2.100 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">2.250 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">3.000 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">3.900 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">5.400 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">9.250 ₺</td>
          <td class="p-4 text-center">Sipariş Ver</td>
        </tr>
        <tr class="bg-gray-50/80 border-b border-gray-100">
          <th scope="row" class="p-4 border-r border-gray-200 font-black text-black text-sm md:text-base py-3 leading-normal text-left font-normal md:font-bold">2. Renk Farkı (İlave Her Renk İçin)</th>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">+900 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">+900 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">+1.150 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">+1.300 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">+1.600 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">+2.400 ₺</td>
          <td class="p-4 text-center">-</td>
        </tr>
      </tbody>
    </table>
  </div>
  <figure class="my-4"><img src="/images/tediye-makbuzu/tediye-baski.webp" alt="Tediye makbuzu basimi" width="930" height="1117" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
  <figure class="my-4"><img src="/images/tediye-makbuzu/kendinden-karbonlu-tediye-makbuzu.webp" alt="Kendinden karbonlu tediye makbuzu" width="930" height="1117" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
  <figure class="my-4"><img src="/images/tediye-makbuzu/tediye-makbuzu-kocani.webp" alt="Tediye makbuzu koçanı" width="930" height="1117" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
  <figure class="my-4"><img src="/images/tediye-makbuzu/tediye-makbuzu-ornegi.webp" alt="14x20 cm tediye makbuzu örneği" width="930" height="1117" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
  <figure class="my-4"><img src="/images/tediye-makbuzu/numaratorlu-tediye-makbuzu.webp" alt="Numaratörlü Tediye Makbuzu Şablonu" width="930" height="1117" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
  <div class="overflow-x-auto mb-6 border border-gray-200 rounded-xl">
    <table class="w-full text-left border-collapse">
      <caption class="sr-only">Tediye Makbuzu ve Tahsilat Makbuzu Karşılaştırması</caption>
      <thead>
        <tr class="bg-gray-50 border-b border-gray-200">
          <th scope="col" class="p-4 font-black text-sm text-black">Özellik</th>
          <th scope="col" class="p-4 font-black text-sm text-black">Tediye Makbuzu</th>
          <th scope="col" class="p-4 font-black text-sm text-black">Tahsilat Makbuzu</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-200/60">
          <th scope="row" class="p-4 font-bold text-xs md:text-sm text-gray-900 text-left">Para çıkışı</th>
          <td class="p-4 text-xs md:text-sm text-gray-700">Kasadan para çıkışı gerçekleştiğinde düzenlenir</td>
          <td class="p-4 text-xs md:text-sm text-gray-700">Para çıkışıyla ilgisi yoktur, parayı alan taraf düzenler</td>
        </tr>
        <tr class="border-b border-gray-200/60 bg-gray-50/30">
          <th scope="row" class="p-4 font-bold text-xs md:text-sm text-gray-900 text-left">Para girişi</th>
          <td class="p-4 text-xs md:text-sm text-gray-700">Para girişiyle ilgisi yoktur</td>
          <td class="p-4 text-xs md:text-sm text-gray-700">İşletme kasasına nakit girişi olduğunda düzenlenir</td>
        </tr>
        <tr class="border-b border-gray-200/60">
          <th scope="row" class="p-4 font-bold text-xs md:text-sm text-gray-900 text-left">Kullanım amacı</th>
          <td class="p-4 text-xs md:text-sm text-gray-700">Yapılan ödemelerin elden teslim edildiğini belgeleme</td>
          <td class="p-4 text-xs md:text-sm text-gray-700">Alınan ödemelerin elden teslim alındığını belgeleme</td>
        </tr>
        <tr class="border-b border-gray-200/60 bg-gray-50/30">
          <th scope="row" class="p-4 font-bold text-xs md:text-sm text-gray-900 text-left">Muhasebe kaydı</th>
          <td class="p-4 text-xs md:text-sm text-gray-700">Kayıt, ödeme türüne ve işletmenin hesap düzenine göre yapılır.</td>
          <td class="p-4 text-xs md:text-sm text-gray-700">Kayıt, tahsilatın niteliğine ve işletmenin hesap düzenine göre yapılır.</td>
        </tr>
        <tr class="border-b border-gray-200/60">
          <th scope="row" class="p-4 font-bold text-xs md:text-sm text-gray-900 text-left">Düzenleyen taraf</th>
          <td class="p-4 text-xs md:text-sm text-gray-700">Ödemeyi yapan (parayı teslim eden) işletme</td>
          <td class="p-4 text-xs md:text-sm text-gray-700">Ödemeyi alan (parayı tahsil eden) işletme</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`;

    return {
      title,
      desc,
      canonical,
      extraHead,
      h1Text: detail.h1Title,
      bodyContent,
      ogImage: `https://mavibasim.com${detail.featureImage}`
    };
  }

  if (p === '/tahsilat-makbuzu') {
    const detail = MAKBUZ_DETAILS["tahsilat-makbuzu"];
    const title = detail.seoTitle;
    const desc = detail.seoDescription;
    const canonical = "https://mavibasim.com/tahsilat-makbuzu";

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Sayfa",
          "item": "https://mavibasim.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Makbuz & Formlar",
          "item": "https://mavibasim.com/makbuz-ve-formlar"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": detail.breadcrumbTitle,
          "item": canonical
        }
      ]
    };

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": detail.h1Title,
      "image": `https://mavibasim.com${detail.featureImage}`,
      "description": detail.seoDescription,
      "brand": {
        "@type": "Brand",
        "name": "Mavi Basım"
      },
      "category": detail.breadcrumbTitle,
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": "1900",
        "highPrice": "9250",
        "offerCount": "18",
        "availability": "https://schema.org/InStock"
      }
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": detail.faqList.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    };

    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://mavibasim.com/#organization",
      "name": "Mavi Basım Matbaa & Reklam",
      "url": "https://mavibasim.com",
      "logo": "https://mavibasim.com/mavilogo.png",
      "image": "https://mavibasim.com/mavilogo.png",
      "telephone": "+905366022373",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Maltepe Mah. Davutpaşa Cad. Topkapı 2. Matbaacılar Sitesi B Blok No:2NB",
        "addressLocality": "Zeytinburnu",
        "addressRegion": "İstanbul",
        "addressCountry": "TR"
      }
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://mavibasim.com/#website",
      "url": "https://mavibasim.com",
      "name": "Mavi Basım Matbaa",
      "publisher": { "@id": "https://mavibasim.com/#organization" }
    };

    let extraHead = `  <meta property="og:image:width" content="1536" />\n`;
    extraHead += `  <meta property="og:image:height" content="1024" />\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(productSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(orgSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>\n`;

    const bodyContent = `<div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
  <nav class="text-xs font-bold text-gray-500 uppercase tracking-tight flex items-center gap-1.5" aria-label="Breadcrumb">
    <a href="/" class="hover:text-primary transition-colors">Ana Sayfa</a>
    <span class="text-gray-400">/</span>
    <a href="/makbuz-ve-formlar" class="hover:text-primary transition-colors">Makbuz &amp; Formlar</a>
    <span class="text-gray-400">/</span>
    <span class="text-gray-800 font-extrabold truncate" aria-current="page">${detail.breadcrumbTitle}</span>
  </nav>
</div>
<div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4">
  <h1>${detail.h1Title}</h1>
  <p>${detail.subtitle}</p>
  <div id="fiyat-tablosu">
    <h2>Tahsilat Makbuzu Baskı Fiyatları</h2>
    <table class="w-full border-collapse">
      <caption class="sr-only">Tahsilat Makbuzu 14 x 20 cm Fiyat Listesi</caption>
      <thead>
        <tr class="bg-black text-white">
          <th scope="col" class="p-4 border-r border-white/10 font-black text-left uppercase text-sm md:text-base whitespace-nowrap min-w-[140px]">YARIM BOY</th>
          <th scope="col" class="p-4 border-r border-white/10 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">5 CİLT</th>
          <th scope="col" class="p-4 border-r border-white/10 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">10 CİLT</th>
          <th scope="col" class="p-4 border-r border-white/10 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">20 CİLT</th>
          <th scope="col" class="p-4 border-r border-white/10 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">30 CİLT</th>
          <th scope="col" class="p-4 border-r border-white/10 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">50 CİLT</th>
          <th scope="col" class="p-4 border-r border-white/10 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">100 CİLT</th>
          <th scope="col" class="p-4 font-black text-center text-xs md:text-sm whitespace-nowrap min-w-[80px]">SİPARİŞ</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
          <th scope="row" class="p-4 border-r border-gray-200 font-black text-black bg-gray-50/50 text-sm md:text-base text-left">1 Asıl + 1 Suret</th>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">1.900 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">2.000 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">2.250 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">2.950 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">3.700 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">5.750 ₺</td>
          <td class="p-4 text-center">Sipariş Ver</td>
        </tr>
        <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
          <th scope="row" class="p-4 border-r border-gray-200 font-black text-black bg-gray-50/50 text-sm md:text-base text-left">1 Asıl + 2 Suret</th>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">2.000 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">2.100 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">2.750 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">3.500 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">4.500 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">7.500 ₺</td>
          <td class="p-4 text-center">Sipariş Ver</td>
        </tr>
        <tr class="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
          <th scope="row" class="p-4 border-r border-gray-200 font-black text-black bg-gray-50/50 text-sm md:text-base text-left">1 Asıl + 3 Suret</th>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">2.100 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">2.250 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">3.000 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">3.900 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">5.400 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">9.250 ₺</td>
          <td class="p-4 text-center">Sipariş Ver</td>
        </tr>
        <tr class="bg-gray-50/80 border-b border-gray-100">
          <th scope="row" class="p-4 border-r border-gray-200 font-black text-black text-sm md:text-base py-3 leading-normal text-left font-normal md:font-bold">2. Renk Farkı (İlave Her Renk İçin)</th>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">+900 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">+900 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">+1.150 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">+1.300 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">+1.600 ₺</td>
          <td class="p-4 border-r border-gray-100 text-center font-bold text-black text-xs md:text-sm">+2.400 ₺</td>
          <td class="p-4 text-center">-</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="my-6 p-6 bg-slate-50 border border-slate-150 rounded-2xl">
    <h2 class="text-xl font-black text-black uppercase tracking-tight mb-3">
      Tahsilat Makbuzu Baskı Seçenekleri
    </h2>
    <p class="text-slate-650 text-sm leading-relaxed mb-3 font-medium">
      Mavi Basım'da tahsilat makbuzları, sayfadaki mevcut seçeneklere göre logolu, kendinden karbonlu (otokopili) ve seri numaralı olarak hazırlanabilir. Ölçü, nüsha ve adet seçeneklerini ürün tablosundan inceleyerek ihtiyacınıza uygun ürünü seçebilirsiniz.
    </p>
    <p class="text-slate-650 text-sm leading-relaxed font-medium">
      Üretim İstanbul Topkapı'daki tesisimizde yapılır; siparişler Türkiye geneline gönderilir. Kasadan yapılan nakit çıkışlarını belgelemek için <a href="/tediye-makbuzu" class="text-primary font-bold hover:underline">tediye makbuzu</a> veya genel matbuat ihtiyaçlarınız için <a href="/makbuz-ve-formlar" class="text-primary font-bold hover:underline">makbuz ve form baskı</a> kategorimizi inceleyebilirsiniz.
    </p>
  </div>
  <figure class="my-4"><img src="/images/tahsilat-makbuzu/otokopili-tahsilat-makbuzu.webp" alt="Otokopili ve numaratörlü tahsilat makbuzu koçanı" width="930" height="1117" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
  <figure class="my-4"><img src="/images/tahsilat-makbuzu/tahsilat-makbuzu-ornegi.webp" alt="Logolu tahsilat makbuzu örneği" width="930" height="1117" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
  <figure class="my-4"><img src="/images/tahsilat-makbuzu/tahsilat-makbuzu-kocani.webp" alt="Tahsilat makbuzu koçanı" width="930" height="1117" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
  <figure class="my-4"><img src="/images/tahsilat-makbuzu/kendinden-karbonlu-tahsilat-makbuzu.webp" alt="Kendinden karbonlu tahsilat makbuzu" width="930" height="1117" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
  <figure class="my-4"><img src="/images/tahsilat-makbuzu/numaratorlu-tahsilat-makbuzu.webp" alt="Numaratörlü Tahsilat Makbuzu Şablonu" width="930" height="1117" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
  <div class="overflow-x-auto mb-6 border border-gray-200 rounded-xl">
    <table class="w-full text-left border-collapse">
      <caption class="sr-only">Tahsilat Makbuzu ve Tediye Makbuzu Karşılaştırması</caption>
      <thead>
        <tr class="bg-gray-50 border-b border-gray-200">
          <th scope="col" class="p-4 font-black text-sm text-black">Özellik</th>
          <th scope="col" class="p-4 font-black text-sm text-black">Tahsilat Makbuzu</th>
          <th scope="col" class="p-4 font-black text-sm text-black">Tediye Makbuzu</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-200/60">
          <th scope="row" class="p-4 font-bold text-xs md:text-sm text-gray-900 text-left">Para girişi</th>
          <td class="p-4 text-xs md:text-sm text-gray-700">İşletme kasasına nakit girişi olduğunda düzenlenir</td>
          <td class="p-4 text-xs md:text-sm text-gray-700">Para girişiyle ilgisi yoktur</td>
        </tr>
        <tr class="border-b border-gray-200/60 bg-gray-50/30">
          <th scope="row" class="p-4 font-bold text-xs md:text-sm text-gray-900 text-left">Para çıkışı</th>
          <td class="p-4 text-xs md:text-sm text-gray-700">Para çıkışıyla ilgisi yoktur, parayı alan taraf düzenler</td>
          <td class="p-4 text-xs md:text-sm text-gray-700">Kasadan para çıkışı gerçekleştiğinde düzenlenir</td>
        </tr>
        <tr class="border-b border-gray-200/60">
          <th scope="row" class="p-4 font-bold text-xs md:text-sm text-gray-900 text-left">Kullanım amacı</th>
          <td class="p-4 text-xs md:text-sm text-gray-700">Alınan ödemelerin elden teslim alındığını belgeleme</td>
          <td class="p-4 text-xs md:text-sm text-gray-700">Yapılan ödemelerin elden teslim edildiğini belgeleme</td>
        </tr>
        <tr class="border-b border-gray-200/60 bg-gray-50/30">
          <th scope="row" class="p-4 font-bold text-xs md:text-sm text-gray-900 text-left">Muhasebe kaydı</th>
          <td class="p-4 text-xs md:text-sm text-gray-700">Kasa hesabına borç, ödeme yapan tarafa alacak kaydı</td>
          <td class="p-4 text-xs md:text-sm text-gray-700">Kasa borç hanesinde değil, borçlu hesaplara veya giderlere alacak kaydı</td>
        </tr>
        <tr class="border-b border-gray-200/60">
          <th scope="row" class="p-4 font-bold text-xs md:text-sm text-gray-900 text-left">Düzenleyen taraf</th>
          <td class="p-4 text-xs md:text-sm text-gray-700">Ödemeyi alan (parayı tahsil eden) işletme</td>
          <td class="p-4 text-xs md:text-sm text-gray-700">Ödemeyi yapan (parayı teslim eden) işletme</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div id="sss-bolumu" class="scroll-mt-24 mb-14 text-black">
    <h2 class="text-xl md:text-2xl font-black text-black uppercase tracking-tight mb-5 flex items-center gap-2">
      <span class="w-2.5 h-6 bg-secondary rounded-full"></span>
      Sıkça Sorulan Sorular
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
      ${detail.faqList.map(faq => `
        <div class="h-full border border-gray-200 rounded-2xl p-5 bg-white shadow-xs text-black flex flex-col justify-between">
          <div>
            <h3 class="font-bold text-slate-900 md:text-base text-sm leading-snug mb-2 flex items-start gap-2">
              <span class="w-2 h-2 rounded-full bg-secondary shrink-0 mt-2"></span>
              <span>${faq.q}</span>
            </h3>
            <div class="h-px bg-gray-100 my-2.5 w-full"></div>
            <p class="text-slate-650 md:text-sm text-xs leading-relaxed font-normal">
              ${faq.a}
            </p>
          </div>
        </div>
      `).join("")}
    </div>
  </div>
</div>`;

    return {
      title,
      desc,
      canonical,
      extraHead,
      h1Text: detail.h1Title,
      bodyContent,
      ogImage: `https://mavibasim.com${detail.featureImage}`
    };
  }

        const makbuzKey = pathMap[p];
  if (makbuzKey && MAKBUZ_DETAILS[makbuzKey]) {
    const detail = MAKBUZ_DETAILS[makbuzKey];
    title = detail.seoTitle;
    desc = detail.seoDescription;

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": (p === '/adisyon' || p === '/gider-makbuzu' || p === '/arac-kiralama' || p === '/sozlesme-baski' || p === '/siparis-fisi' || p === '/perakende-satis-fisi')
        ? [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Ana Sayfa",
              "item": "https://mavibasim.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Makbuz & Formlar",
              "item": "https://mavibasim.com/makbuz-ve-formlar"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": detail.breadcrumbTitle,
              "item": `https://mavibasim.com${p}`
            }
          ]
        : [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Ana Sayfa",
              "item": "https://mavibasim.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": detail.breadcrumbTitle,
              "item": `https://mavibasim.com${p}`
            }
          ]
    };
    const productSchema: Record<string, any> = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": detail.h1Title,
      "image": `https://mavibasim.com${detail.featureImage}`,
      "description": detail.seoDescription,
      "brand": {
        "@type": "Brand",
        "name": "Mavi Basım"
      },
      "category": detail.breadcrumbTitle
    };

    if (p === '/adisyon') {
      // Only complete products are offers; color surcharges are not products.
      const prices = ADISYON_DATA.flatMap(section => section.rows
        .filter(row => !row.label.includes('Renk Farkı'))
        .flatMap(row => row.values));
      productSchema.size = ADISYON_DATA[0].ebat;
      productSchema.material = '70–80 gr 1. hamur beyaz kâğıt';
      productSchema.offers = {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": String(Math.min(...prices)),
        "highPrice": String(Math.max(...prices)),
        "offerCount": String(prices.length),
        "url": canonical
      };
    }

    if (p === '/perakende-satis-fisi') {
      // Read complete package prices from the protected tariff, excluding color surcharges.
      const prices = PERAKENDE_SATIS_FISI_DATA.flatMap(section => section.rows
        .filter(row => !row.label.includes('Renk Farkı'))
        .flatMap(row => row.values));
      productSchema.offers = {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": String(Math.min(...prices)),
        "highPrice": String(Math.max(...prices)),
        "offerCount": String(prices.length),
        "url": canonical
      };
    }

    if (p === '/giris-bileti') {
      // Use complete package prices; additional-color charges are excluded.
      const prices = GIRIS_BILETI_DATA.flatMap(section => section.rows
        .filter(row => !row.label.includes('Renk Farkı'))
        .flatMap(row => row.values));
      productSchema.offers = {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": String(Math.min(...prices)),
        "highPrice": String(Math.max(...prices)),
        "offerCount": String(prices.length),
        "url": canonical
      };
    }

    if (p === '/gider-makbuzu') {
      // Read complete package prices; additional-color charges are not offers.
      const prices = GIDER_MAKBUZU_DATA.flatMap(section => section.rows
        .filter(row => !row.label.includes('Renk Farkı'))
        .flatMap(row => row.values));
      productSchema.offers = {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": String(Math.min(...prices)),
        "highPrice": String(Math.max(...prices)),
        "offerCount": String(prices.length),
        "url": canonical
      };
    }

    if (p === '/arac-kiralama') {
      // Use published package prices, excluding additional-color charges.
      const prices = ARAC_KIRALAMA_DATA.flatMap(section => section.rows
        .filter(row => !row.label.includes('Renk Farkı'))
        .flatMap(row => row.values));
      productSchema.offers = {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": String(Math.min(...prices)),
        "highPrice": String(Math.max(...prices)),
        "offerCount": String(prices.length),
        "url": canonical
      };
    }

    if (p === '/sigorta-policeleri') {
      // Use complete package prices from the visible table, excluding surcharges.
      const prices = SIGORTA_POLICELERI_DATA.flatMap(section => section.rows
        .filter(row => !row.label.includes('Renk Farkı'))
        .flatMap(row => row.values));
      productSchema.offers = {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": String(Math.min(...prices)),
        "highPrice": String(Math.max(...prices)),
        "offerCount": String(prices.length),
        "url": canonical
      };
    }

    if (p === '/siparis-fisi') {
      // Read published package prices; additional-color charges are not offers.
      const prices = SIPARIS_FISI_DATA.flatMap(section => section.rows
        .filter(row => !row.label.includes('Renk Farkı'))
        .flatMap(row => row.values));
      productSchema.offers = {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": String(Math.min(...prices)),
        "highPrice": String(Math.max(...prices)),
        "offerCount": String(prices.length),
        "url": canonical
      };
    }

    if (p === '/sozlesme-baski') {
      const prices = SOZLESME_BASKI_DATA.flatMap(section => section.rows
        .filter(row => !row.label.includes('Renk Farkı'))
        .flatMap(row => row.values));
      productSchema.offers = {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": String(Math.min(...prices)),
        "highPrice": String(Math.max(...prices)),
        "offerCount": String(prices.length),
        "url": canonical
      };
    }

    const imageObjectSchemas = [
      {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "url": `https://mavibasim.com${detail.featureImage}`,
        "contentUrl": `https://mavibasim.com${detail.featureImage}`,
        "license": "https://mavibasim.com/lisans",
        "acquireLicensePage": "https://mavibasim.com/lisans",
        "creditText": "Mavi Basım Topkapı Matbaa",
        "creator": { "@type": "Organization", "name": "Mavi Basım" },
        "copyrightNotice": "Mavi Basım Matbaacılık",
        "caption": detail.featureImageAlt || detail.h1Title
      },
      ...(detail.gallery || []).map(g => ({
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "url": `https://mavibasim.com${g.src}`,
        "contentUrl": `https://mavibasim.com${g.src}`,
        "license": "https://mavibasim.com/lisans",
        "acquireLicensePage": "https://mavibasim.com/lisans",
        "creditText": "Mavi Basım Topkapı Matbaa",
        "creator": { "@type": "Organization", "name": "Mavi Basım" },
        "copyrightNotice": "Mavi Basım Matbaacılık",
        "caption": g.alt || g.title
      }))
    ];

    let extraHead = `  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(productSchema)}</script>\n`;
    if (p === '/adisyon') {
      extraHead += '  <meta property="og:type" content="product" />\n';
      extraHead += '  <meta property="og:image:width" content="1536" />\n';
      extraHead += '  <meta property="og:image:height" content="1024" />\n';
    } else if (p === '/gider-makbuzu') {
      // Actual dimensions of the existing share image; no image or layout changes.
      extraHead += '  <meta property="og:image:width" content="1536" />\n';
      extraHead += '  <meta property="og:image:height" content="1024" />\n';
    } else if (p === '/sozlesme-baski') {
      extraHead += `  <script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": canonical,
        "primaryImageOfPage": `https://mavibasim.com${detail.featureImage}`
      })}</script>\n`;
      // Dimensions of the existing share image; do not alter the image asset.
      extraHead += '  <meta property="og:image:width" content="980" />\n';
      extraHead += '  <meta property="og:image:height" content="1024" />\n';
    } else if (p === '/siparis-fisi') {
      extraHead += '  <meta property="og:image:width" content="1536" />\n';
      extraHead += '  <meta property="og:image:height" content="1024" />\n';
    } else if (p === '/arac-kiralama') {
      // Existing image dimensions; the asset and protected pricing stay intact.
      extraHead += '  <meta property="og:image:width" content="805" />\n';
      extraHead += '  <meta property="og:image:height" content="1024" />\n';
    }
    for (const imgSchema of imageObjectSchemas) {
      extraHead += `  <script type="application/ld+json">${JSON.stringify(imgSchema)}</script>\n`;
    }

    if (detail.faqList && detail.faqList.length > 0) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": detail.faqList.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      };
      extraHead += `  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;
    }

    const bodyContent = `<h1>${detail.h1Title}</h1>\n<p>${detail.subtitle}</p>\n<p>${detail.whatIsContent || ''}</p>`;

        return {
      title,
      desc,
      canonical,
      extraHead,
      h1Text: detail.h1Title,
      bodyContent,
      ogImage: detail.featureImage
        ? `https://mavibasim.com${detail.featureImage}`
        : undefined
    };
  }

  // 3. Match from blog posts database
  if (p.startsWith("/blog/")) {
    const slug = p.substring("/blog/".length);
    const post = BLOG_POSTS.find((bp) => bp.slug === slug);
    if (post) {
      const blogMeta = getBlogMetadata(post);
      title = blogMeta.title;
      desc = post.excerpt;
      const parsedBody = post.content
        ? post.content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        : '';
      const bodyContent = `<h1>${post.title}</h1>\n<p>Yazar: ${blogMeta.author.name} · İlk Yayınlanma: ${blogMeta.publishedLabel} · Son Güncelleme: ${blogMeta.modifiedLabel}</p>\n<p>${post.excerpt}</p>\n<div>${parsedBody}</div>`;

      const blogPostingSchema = {
        "@context": "https://schema.org",
        "@type": post.schemaType || "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://mavibasim.com/blog/${post.slug}`
        },
        "headline": post.title,
        "image": `https://mavibasim.com${post.image}`,
        "datePublished": blogMeta.datePublished,
        "dateModified": blogMeta.dateModified,
        "author": blogMeta.author,
        "publisher": {
          "@type": "Organization",
          "name": "Mavi Basım",
          "logo": {
            "@type": "ImageObject",
            "url": "https://mavibasim.com/mavilogo.png"
          }
        },
        "description": post.excerpt
      };

      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Anasayfa",
            "item": "https://mavibasim.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://mavibasim.com/blog"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.category,
            "item": `https://mavibasim.com/blog?category=${encodeURIComponent(post.category)}`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": post.title,
            "item": `https://mavibasim.com/blog/${post.slug}`
          }
        ]
      };

      let extraHead = `  <script type="application/ld+json">${JSON.stringify(blogPostingSchema)}</script>\n`;
      extraHead += `  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;

      if (post.faq && post.faq.length > 0) {
        const faqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": post.faq.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        };
        extraHead += `  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;
      }

      if (post.image) {
        const imageSchema = {
          "@context": "https://schema.org",
          "@type": "ImageObject",
          "url": `https://mavibasim.com${post.image}`,
          "contentUrl": `https://mavibasim.com${post.image}`,
          "license": "https://mavibasim.com/lisans",
          "acquireLicensePage": "https://mavibasim.com/lisans",
          "creditText": "Mavi Basım Tasarım Ekibi",
          "creator": {
            "@type": "Organization",
            "name": "Mavi Basım"
          },
          "copyrightNotice": "Mavi Basım Matbaacılık"
        };
        extraHead += `  <script type="application/ld+json">${JSON.stringify(imageSchema)}</script>\n`;
      }

      return {
        title,
        desc,
        canonical,
        extraHead,
        h1Text: post.title,
        bodyContent,
        ogImage: post.image ? (post.image.startsWith('http') ? post.image : `https://mavibasim.com${post.image}`) : undefined
      };
    }
  }

function generateSectorBodyContent(slug: string, seoPage: any, _canonicalUrl?: string): string {
  const isKutu = slug === 'kutu-ambalaj-baski-cozumleri' || seoPage.path.includes('kutu-ambalaj');
  const isETicaret = slug === 'e-ticaret-perakende-baski' || seoPage.path.includes('e-ticaret-perakende-baski');
  
  const parentName = seoPage.path.includes('brosur') ? "Broşür Baskı" : (seoPage.path.includes('kozmetik') || seoPage.path.includes('kutu') || seoPage.path.includes('e-ticaret') || seoPage.path.includes('perakende')) ? "Matbaa Ürünleri" : "Kartvizit Baskı";
  const parentItem = seoPage.path.includes('brosur') ? "/brosur" : (seoPage.path.includes('kozmetik') || seoPage.path.includes('kutu') || seoPage.path.includes('e-ticaret') || seoPage.path.includes('perakende')) ? "/matbaa" : "/kartvizit";

  let html = `<div class="bg-neutral-50 min-h-screen pb-20">`;
  
  // Breadcrumb
  html += `<div class="max-w-4xl mx-auto py-4 px-4"><nav aria-label="Breadcrumb" class="text-xs text-neutral-500"><a href="/" class="hover:underline">Ana Sayfa</a> <span class="mx-1">/</span> <a href="${parentItem}" class="hover:underline">${parentName}</a> <span class="mx-1">/</span> <span class="text-neutral-800 font-semibold">${seoPage.h1}</span></nav></div>`;

  // Hero section
  html += `<header class="bg-neutral-900 text-white py-12 px-4 text-center"><div class="max-w-4xl mx-auto">`;
  html += `<h1 class="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">${seoPage.h1}</h1>`;
  html += `<p class="text-base sm:text-lg text-neutral-300 mb-6 max-w-3xl mx-auto">${seoPage.intro || seoPage.metaDesc}</p>`;
  html += `<div class="flex flex-wrap gap-4 justify-center mb-8"><a href="https://wa.me/905366022373?text=${encodeURIComponent(seoPage.h1 + ' hakkında fiyat teklifi ve detaylı bilgi almak istiyorum.')}" class="bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-700 transition">WhatsApp Teklif Hattı (0536 602 23 73)</a></div>`;
  
  if (isKutu) {
    if (SECTOR_IMAGE_MANIFEST.kutuAmbalaj?.["kutu-ambalaj-baski-cozumleri.webp"]) {
      html += `<div class="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-neutral-800 bg-neutral-950 p-2"><img src="/images/sektor/kutu-ambalaj/kutu-ambalaj-baski-cozumleri.webp" alt="Kutu ve ambalaj baskı çözümleri, ilaç, gıda, kozmetik ve özel ölçülü kutu modelleri" width="1200" height="800" class="w-full h-auto rounded-xl object-contain max-h-[500px]" fetchpriority="high" loading="eager" /></div>`;
    } else {
      html += `<div data-placeholder-number="1" data-aspect-ratio="1200 / 800" aria-label="Henüz yüklenmemiş görsel alanı" class="w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-4 text-center bg-neutral-900/90 border-neutral-700 text-neutral-300 shadow-xl max-w-3xl mx-auto my-0"><div class="w-10 h-10 rounded-full flex items-center justify-center mb-2 bg-neutral-800 text-neutral-400"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg></div><span class="text-[11px] font-extrabold tracking-widest uppercase text-sky-400">GÖRSEL 1</span><span class="text-xs sm:text-sm font-bold mt-0.5 text-white">Kutu ve Ambalaj Baskı Çözümleri</span><span class="text-[11px] font-medium mt-1 text-neutral-400">WebP görseli daha sonra eklenecek</span></div>`;
    }
  } else if (isETicaret) {
    if (SECTOR_IMAGE_MANIFEST.eTicaretPerakende?.["e-ticaret-perakende-baski-cozumleri.webp"]) {
      html += `<div class="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-neutral-800 bg-neutral-950 p-2"><img src="/images/sektor/e-ticaret-perakende/e-ticaret-perakende-baski-cozumleri.webp" alt="E-ticaret ve perakende markaları için kargo kutusu, karton çanta, etiket ve ambalaj kâğıdı baskıları" width="1200" height="800" class="w-full h-auto rounded-xl object-contain max-h-[500px]" fetchpriority="high" loading="eager" /></div>`;
    }
  }
  html += `</div></header>`;

  // 8 Sections
  if (seoPage.sections && seoPage.sections.length > 0) {
    html += `<main class="max-w-4xl mx-auto px-4 py-12 space-y-12">`;
    
    seoPage.sections.forEach((section: any, idx: number) => {
      html += `<section class="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-sm">`;
      html += `<h2 class="text-2xl font-bold text-neutral-900 mb-4">${section.title}</h2>`;
      
      if (section.paragraphs && section.paragraphs.length > 0) {
        section.paragraphs.forEach((p: string) => {
          html += `<p class="text-neutral-700 leading-relaxed mb-4 text-base">${p}</p>`;
        });
      }

      // Kutu Visuals injection for sections
      if (isKutu) {
        if (idx === 1) { // Section 2
          if (SECTOR_IMAGE_MANIFEST.kutuAmbalaj?.["ilac-medikal-parfum-kozmetik-kutulari.webp"]) {
            html += `<figure class="mt-6 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 p-2"><img src="/images/sektor/kutu-ambalaj/ilac-medikal-parfum-kozmetik-kutulari.webp" alt="İlaç, medikal ürün, vitamin, parfüm ve kozmetik kutusu modelleri" width="900" height="650" loading="lazy" class="w-full h-auto rounded-lg object-contain" /><figcaption class="text-xs text-neutral-500 mt-2 text-center">İlaç, medikal, vitamin, parfüm ve kozmetik kutusu modelleri</figcaption></figure>`;
          } else {
            html += `<div data-placeholder-number="2" data-aspect-ratio="900 / 650" aria-label="Henüz yüklenmemiş görsel alanı" class="w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-4 text-center bg-neutral-100/90 border-neutral-300 text-neutral-700 mt-6"><div class="w-10 h-10 rounded-full flex items-center justify-center mb-2 bg-neutral-200/80 text-neutral-500"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg></div><span class="text-[11px] font-extrabold tracking-widest uppercase text-neutral-500">GÖRSEL 2</span><span class="text-xs sm:text-sm font-bold mt-0.5 text-neutral-800">İlaç, Medikal, Parfüm ve Kozmetik Kutuları</span><span class="text-[11px] font-medium mt-1 text-neutral-500">WebP görseli daha sonra eklenecek</span></div>`;
          }
        } else if (idx === 2) { // Section 3
          if (SECTOR_IMAGE_MANIFEST.kutuAmbalaj?.["zurna-durum-taco-fast-food-kutulari.webp"]) {
            html += `<figure class="mt-6 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 p-2"><img src="/images/sektor/kutu-ambalaj/zurna-durum-taco-fast-food-kutulari.webp" alt="Zurna dürüm kutusu, klasik dürüm, taco ve fast-food servis kutusu seçenekleri" width="900" height="650" loading="lazy" class="w-full h-auto rounded-lg object-contain" /><figcaption class="text-xs text-neutral-500 mt-2 text-center">Zurna dürüm, taco, burger ve fast-food paket servis kutuları</figcaption></figure>`;
          } else {
            html += `<div data-placeholder-number="3" data-aspect-ratio="900 / 650" aria-label="Henüz yüklenmemiş görsel alanı" class="w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-4 text-center bg-neutral-100/90 border-neutral-300 text-neutral-700 mt-6"><div class="w-10 h-10 rounded-full flex items-center justify-center mb-2 bg-neutral-200/80 text-neutral-500"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg></div><span class="text-[11px] font-extrabold tracking-widest uppercase text-neutral-500">GÖRSEL 3</span><span class="text-xs sm:text-sm font-bold mt-0.5 text-neutral-800">Zurna Dürüm, Taco ve Fast-Food Kutuları</span><span class="text-[11px] font-medium mt-1 text-neutral-500">WebP görseli daha sonra eklenecek</span></div>`;
          }
        } else if (idx === 3) { // Section 4
          if (SECTOR_IMAGE_MANIFEST.kutuAmbalaj?.["popcorn-cips-atistirmalik-kutulari.webp"]) {
            html += `<figure class="mt-6 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 p-2"><img src="/images/sektor/kutu-ambalaj/popcorn-cips-atistirmalik-kutulari.webp" alt="Popcorn kutusu, patlamış mısır, cips ve atıştırmalık servis kutuları" width="900" height="650" loading="lazy" class="w-full h-auto rounded-lg object-contain" /><figcaption class="text-xs text-neutral-500 mt-2 text-center">Popcorn, patlamış mısır, cips ve atıştırmalık servis kutuları</figcaption></figure>`;
          } else {
            html += `<div data-placeholder-number="4" data-aspect-ratio="900 / 650" aria-label="Henüz yüklenmemiş görsel alanı" class="w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-4 text-center bg-neutral-100/90 border-neutral-300 text-neutral-700 mt-6"><div class="w-10 h-10 rounded-full flex items-center justify-center mb-2 bg-neutral-200/80 text-neutral-500"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg></div><span class="text-[11px] font-extrabold tracking-widest uppercase text-neutral-500">GÖRSEL 4</span><span class="text-xs sm:text-sm font-bold mt-0.5 text-neutral-800">Popcorn, Cips ve Atıştırmalık Kutuları</span><span class="text-[11px] font-medium mt-1 text-neutral-500">WebP görseli daha sonra eklenecek</span></div>`;
          }
        } else if (idx === 4) { // Section 5
          if (SECTOR_IMAGE_MANIFEST.kutuAmbalaj?.["baklava-pasta-kurabiye-cikolata-kutulari.webp"]) {
            html += `<figure class="mt-6 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 p-2"><img src="/images/sektor/kutu-ambalaj/baklava-pasta-kurabiye-cikolata-kutulari.webp" alt="Baklava kutusu, pasta, kurabiye, lokum ve pencereli çikolata kutuları" width="900" height="650" loading="lazy" class="w-full h-auto rounded-lg object-contain" /><figcaption class="text-xs text-neutral-500 mt-2 text-center">Baklava, pasta, kurabiye, lokum ve çikolata kutusu seçenekleri</figcaption></figure>`;
          } else {
            html += `<div data-placeholder-number="5" data-aspect-ratio="900 / 650" aria-label="Henüz yüklenmemiş görsel alanı" class="w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-4 text-center bg-neutral-100/90 border-neutral-300 text-neutral-700 mt-6"><div class="w-10 h-10 rounded-full flex items-center justify-center mb-2 bg-neutral-200/80 text-neutral-500"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg></div><span class="text-[11px] font-extrabold tracking-widest uppercase text-neutral-500">GÖRSEL 5</span><span class="text-xs sm:text-sm font-bold mt-0.5 text-neutral-800">Baklava, Pasta, Kurabiye ve Çikolata Kutuları</span><span class="text-[11px] font-medium mt-1 text-neutral-500">WebP görseli daha sonra eklenecek</span></div>`;
          }
        } else if (idx === 5) { // Section 6
          if (SECTOR_IMAGE_MANIFEST.kutuAmbalaj?.["etiket-ambalaj-kagidi-karton-canta.webp"]) {
            html += `<figure class="mt-6 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 p-2"><img src="/images/sektor/kutu-ambalaj/etiket-ambalaj-kagidi-karton-canta.webp" alt="Kutu ve kavanoz etiketi, baskılı ambalaj kâğıdı ve karton çanta ürünleri" width="900" height="650" loading="lazy" class="w-full h-auto rounded-lg object-contain" /><figcaption class="text-xs text-neutral-500 mt-2 text-center">Kutu ve kavanoz etiketi, pelür ambalaj kâğıdı ve karton taşıma çantaları</figcaption></figure>`;
          } else {
            html += `<div data-placeholder-number="6" data-aspect-ratio="900 / 650" aria-label="Henüz yüklenmemiş görsel alanı" class="w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-4 text-center bg-neutral-100/90 border-neutral-300 text-neutral-700 mt-6"><div class="w-10 h-10 rounded-full flex items-center justify-center mb-2 bg-neutral-200/80 text-neutral-500"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg></div><span class="text-[11px] font-extrabold tracking-widest uppercase text-neutral-500">GÖRSEL 6</span><span class="text-xs sm:text-sm font-bold mt-0.5 text-neutral-800">Kutu Etiketi, Baskılı Ambalaj Kâğıdı ve Karton Çanta</span><span class="text-[11px] font-medium mt-1 text-neutral-500">WebP görseli daha sonra eklenecek</span></div>`;
          }
        }
      }

      if (isETicaret) {
        if (idx === 0) {
          if (SECTOR_IMAGE_MANIFEST.eTicaretPerakende?.["e-ticaret-urun-kutusu-kargo-paketleme.webp"]) {
            html += `<figure class="mt-6 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 p-2"><img src="/images/sektor/e-ticaret-perakende/e-ticaret-urun-kutusu-kargo-paketleme.webp" alt="E-ticaret ürün kutuları ve kargo paketleme çözümleri" width="900" height="650" loading="lazy" class="w-full h-auto rounded-lg object-contain" /><figcaption class="text-xs text-neutral-500 mt-2 text-center">Oluklu mukavva ve Bristol e-ticaret kargo kutusu seçenekleri</figcaption></figure>`;
          }
        } else if (idx === 1) {
          if (SECTOR_IMAGE_MANIFEST.eTicaretPerakende?.["saten-polyester-ipli-karton-canta.webp"]) {
            html += `<figure class="mt-6 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 p-2"><img src="/images/sektor/e-ticaret-perakende/saten-polyester-ipli-karton-canta.webp" alt="Saten ve polyester ipli lüks karton çanta ve kraft poşet baskısı" width="900" height="650" loading="lazy" class="w-full h-auto rounded-lg object-contain" /><figcaption class="text-xs text-neutral-500 mt-2 text-center">230–300 gr Bristol saten veya polyester ipli karton çantalar</figcaption></figure>`;
          }
        } else if (idx === 2) {
          if (SECTOR_IMAGE_MANIFEST.eTicaretPerakende?.["baskili-ambalaj-kagidi-tesekkur-karti.webp"]) {
            html += `<figure class="mt-6 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 p-2"><img src="/images/sektor/e-ticaret-perakende/baskili-ambalaj-kagidi-tesekkur-karti.webp" alt="Logo baskılı pelür ambalaj kâğıdı ve müşteri teşekkür kartları" width="900" height="650" loading="lazy" class="w-full h-auto rounded-lg object-contain" /><figcaption class="text-xs text-neutral-500 mt-2 text-center">Pelür ve sülfit ambalaj kâğıdı ile paket içi teşekkür kartları</figcaption></figure>`;
          }
        } else if (idx === 3) {
          if (SECTOR_IMAGE_MANIFEST.eTicaretPerakende?.["barkod-koli-adres-urun-etiketleri.webp"]) {
            html += `<figure class="mt-6 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 p-2"><img src="/images/sektor/e-ticaret-perakende/barkod-koli-adres-urun-etiketleri.webp" alt="Rulo termal barkod, kuşe koli adres ve raf etiketleri" width="900" height="650" loading="lazy" class="w-full h-auto rounded-lg object-contain" /><figcaption class="text-xs text-neutral-500 mt-2 text-center">Rulo termal barkod, kuşe koli adres ve suya dayanıklı etiketler</figcaption></figure>`;
          }
        }
      }

      html += `</section>`;
    });

    if (isETicaret && SECTOR_IMAGE_MANIFEST.eTicaretPerakende?.["amerikan-servis-perakende-baski-urunleri.webp"]) {
      html += `<section class="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-sm"><figure class="rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 p-2 my-2"><img src="/images/sektor/e-ticaret-perakende/amerikan-servis-perakende-baski-urunleri.webp" alt="Amerikan servis ve perakende işletmeleri için tamamlayıcı baskı ürünleri" width="900" height="650" loading="lazy" class="w-full h-auto rounded-lg object-contain" /><figcaption class="text-xs text-neutral-500 mt-2 text-center">Amerikan servis, karton çanta, kargo kutusu ve etiket ürünleri</figcaption></figure></section>`;
    }

    // 9 Cluster Products
    if (isKutu) {
      const popularProducts = [
        { path: "/kutu", text: "İlaç ve Medikal Ürün Kutusu", spec: "Müşteri tarafından sağlanan onaylı içerik ve ölçülere göre kutu seçenekleri", tag: "Medikal Ambalaj", cta: "Kutu Seçeneklerini İncele" },
        { path: "/kutu", text: "Parfüm ve Kozmetik Kutusu", spec: "Mat veya parlak selefon, varak, gofre ve separatör seçenekleri", tag: "300–400 Gr Bristol", cta: "Kozmetik Kutu Seçeneklerini İncele" },
        { path: "/kutu", text: "Zurna Dürüm ve Taco Kutusu", spec: "Ürünün ölçüsüne ve kullanım biçimine göre özel kutu çözümleri", tag: "Fast-Food Kutusu", cta: "Fast-Food Kutularını İncele" },
        { path: "/kutu", text: "Popcorn ve Cips Kutusu", spec: "Tek porsiyon veya büyük boy baskılı servis kutusu seçenekleri", tag: "Atıştırmalık Kutusu", cta: "Atıştırmalık Kutularını İncele" },
        { path: "/kutu", text: "Baklava ve Tatlı Kutusu", spec: "Baklava, pasta, kurabiye, lokum ve çikolata için özel ölçülü kutular", tag: "Pastane Kutusu", cta: "Pastane Kutularını İncele" },
        { path: "/etiket", text: "Ürün Etiketi", spec: "Kutu, kavanoz, şişe ve perakende ambalajlarına uygun etiket seçenekleri", tag: "Etiket Baskısı", cta: "Etiket Fiyatlarını İncele" },
        { path: "https://wa.me/905366022373?text=Bask%C4%B1l%C4%B1%20ambalaj%20ve%20pel%C3%BCr%20k%C3%A2%C4%9F%C4%B1d%C4%B1%20fiyat%20teklifi%20almak%20istiyorum", text: "Baskılı Ambalaj Kâğıdı", spec: "Ürünün kullanım biçimine göre pelür, sülfit, kraft veya farklı kâğıt seçenekleri", tag: "Paketleme Kâğıdı", cta: "Fiyat Teklifi Al" },
        { path: "/karton-canta", text: "Karton Çanta", spec: "İpli, saplı, kraft veya Bristol karton çanta seçenekleri", tag: "Taşıma Ambalajı", cta: "Çanta Fiyatlarını İncele" },
        { path: "/brosur", text: "Ürün Föyü ve Prospektüs", spec: "Müşterinin sağladığı onaylı içerikle küçük veya çok kırımlı ürün föyleri", tag: "Katlamalı Föy", cta: "Broşür Seçeneklerini İncele" }
      ];

      html += `<section class="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-sm">`;
      html += `<h2 class="text-2xl font-bold text-neutral-900 mb-6">Kutu ve Ambalaj İçin Önerilen Baskı Ürünleri</h2>`;
      html += `<div class="grid grid-cols-1 md:grid-cols-3 gap-6">`;
      popularProducts.forEach(prod => {
        html += `<div class="p-5 rounded-xl border border-neutral-200 bg-neutral-50/50 flex flex-col justify-between">`;
        html += `<div><span class="inline-block px-2.5 py-1 text-xs font-semibold bg-neutral-200 text-neutral-800 rounded-full mb-3">${prod.tag}</span><h3 class="font-bold text-lg text-neutral-900 mb-2">${prod.text}</h3><p class="text-sm text-neutral-600 mb-4">${prod.spec}</p></div>`;
        html += `<a href="${prod.path}" class="text-sm font-bold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1">${prod.cta} &rarr;</a>`;
        html += `</div>`;
      });
      html += `</div></section>`;
    }

    // 8 FAQs
    if (seoPage.faqs && seoPage.faqs.length > 0) {
      html += `<section class="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-sm">`;
      html += `<h2 class="text-2xl font-bold text-neutral-900 mb-6">Sıkça Sorulan Sorular</h2>`;
      html += `<div class="space-y-6">`;
      seoPage.faqs.forEach((faq: any) => {
        html += `<div class="border-b border-neutral-100 pb-4"><h3 class="font-bold text-lg text-neutral-900 mb-2">${faq.question}</h3><p class="text-neutral-700 leading-relaxed text-base">${faq.answer}</p></div>`;
      });
      html += `</div></section>`;
    }

    // WhatsApp CTA box
    html += `<section class="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-8 rounded-2xl shadow-md text-center">`;
    html += `<h2 class="text-2xl font-bold mb-2">Hemen Özel Ölçülü Fiyat Teklifi Alın</h2>`;
    html += `<p class="text-emerald-100 mb-6 max-w-xl mx-auto">İhtiyacınız olan ürün ölçülerini, adet bilgisini ve logonuzu WhatsApp hattımıza iletin, grafik ekibimiz aynı gün teklifinizi hazırlasın.</p>`;
    html += `<a href="https://wa.me/905366022373?text=${encodeURIComponent(seoPage.h1 + ' için fiyat teklifi almak istiyorum.')}" class="inline-block bg-white text-emerald-800 font-bold px-8 py-3.5 rounded-xl shadow hover:bg-emerald-50 transition">WhatsApp: +90 536 602 23 73</a>`;
    html += `</section>`;

    // Internal Links & Siblings
    if (seoPage.internalLinks && seoPage.internalLinks.length > 0) {
      html += `<section class="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-sm">`;
      html += `<h2 class="text-xl font-bold text-neutral-900 mb-4">İlgili Matbaa ve Baskı Ürünleri</h2>`;
      html += `<div class="flex flex-wrap gap-2">`;
      seoPage.internalLinks.forEach((link: any) => {
        html += `<a href="${link.path}" class="px-4 py-2 bg-neutral-100 hover:bg-sky-50 hover:text-sky-700 text-neutral-700 rounded-lg text-sm font-medium transition">${link.text}</a>`;
      });
      html += `</div></section>`;
    }

    html += `</main>`;
  }

  html += `</div>`;
  return html;
}

// 4. Match from SEO customized target pages (sektor pages)
  let seoSlug = "";
  let seoPage = Object.entries(SEO_PAGES_DATA).find(([slug, item]) => {
    const itemPath = item.path.trim().toLowerCase();
    const cleanP = p.toLowerCase();
    if (itemPath === cleanP || `/sektor${itemPath}` === cleanP || itemPath === `/sektor${cleanP}`) {
      seoSlug = slug;
      return true;
    }
    return false;
  })?.[1];

  if (!seoPage) {
    if (p.startsWith("/sektor/")) {
      seoSlug = p.substring("/sektor/".length).toLowerCase();
      seoPage = SEO_PAGES_DATA[seoSlug];
    } else {
      seoSlug = p.substring(1).toLowerCase();
      seoPage = SEO_PAGES_DATA[seoSlug];
    }
  }

  if (seoPage) {
    title = seoPage.title;
    desc = seoPage.metaDesc;

    // Construct JSON-LD schemas
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": seoPage.h1,
      "url": canonical,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Mavi Basım Matbaa & Reklam",
        "url": "https://mavibasim.com",
        "telephone": "+90 536 602 23 73",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Topkapı 2. Matbaacılar Sitesi B Blok No:2NB Zeytinburnu",
          "addressLocality": "İstanbul",
          "addressCountry": "TR"
        }
      },
      "areaServed": {
        "@type": "Country",
        "name": "Türkiye"
      },
      "description": seoPage.metaDesc
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Sayfa",
          "item": "https://mavibasim.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": seoPage.path.includes('brosur') ? "Broşür Baskı" : (seoPage.path.includes('kozmetik') || seoPage.path.includes('kutu') || seoPage.path.includes('e-ticaret') || seoPage.path.includes('perakende')) ? "Matbaa Ürünleri" : "Kartvizit Baskı",
          "item": seoPage.path.includes('brosur') ? "https://mavibasim.com/brosur" : (seoPage.path.includes('kozmetik') || seoPage.path.includes('kutu') || seoPage.path.includes('e-ticaret') || seoPage.path.includes('perakende')) ? "https://mavibasim.com/matbaa" : "https://mavibasim.com/kartvizit"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": seoPage.h1,
          "item": canonical
        }
      ]
    };

    const faqSchema = seoPage.faqs && seoPage.faqs.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": seoPage.faqs.map((f: any) => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    } : null;

    let extraHead = "";
    if ((seoPage.path.includes('kutu-ambalaj-baski-cozumleri') || seoSlug === 'kutu-ambalaj-baski-cozumleri') && SECTOR_IMAGE_MANIFEST.kutuAmbalaj?.["kutu-ambalaj-baski-cozumleri.webp"]) {
      extraHead += `  <link rel="preload" as="image" href="/images/sektor/kutu-ambalaj/kutu-ambalaj-baski-cozumleri.webp" fetchpriority="high" />\n`;
      extraHead += `  <meta property="og:image" content="https://mavibasim.com/images/sektor/kutu-ambalaj/kutu-ambalaj-baski-cozumleri.webp" />\n`;
      extraHead += `  <meta property="og:image:width" content="1200" />\n`;
      extraHead += `  <meta property="og:image:height" content="800" />\n`;
      extraHead += `  <meta property="og:image:alt" content="Kutu ve Ambalaj Baskı Çözümleri | Mavi Basım" />\n`;
    } else {
      extraHead += `  <meta property="og:image" content="https://mavibasim.com/mavilogo.png" />\n`;
    }
    extraHead += `  <script type="application/ld+json">${JSON.stringify(serviceSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
    if (faqSchema) {
      extraHead += `  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;
    }

    const bodyContent = generateSectorBodyContent(seoSlug, seoPage, canonical);

    return { title, desc, canonical, extraHead, h1Text: seoPage.h1, bodyContent };
  }

  // 5. Match from City pages database
  const cleanSlug = p.startsWith("/") ? p.substring(1) : p;
  const city = CITIES_DATA.find((c) => c.slug === cleanSlug);
  if (city) {
    ({ title, desc } = getCitySearchMetadata(city));
    const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://mavibasim.com/' },
      { '@type': 'ListItem', position: 2, name: `${city.name} Matbaa`, item: canonical }
    ] };
    // Service and FAQ are rendered with CityPage so the initial tree and its
    // hydrated script nodes match; this route owns only the breadcrumb here.
    const extraHead = `<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>`;
    return { title, desc, canonical, extraHead, h1Text: `${city.name} Matbaa ve Baskı Hizmetleri` };
  }

  return { title, desc, canonical };
}

// Find correct SEO metadata based on path with priority Open Graph images injected
export function getRouteSEO(pathname: string): { title: string; desc: string; canonical: string; extraHead?: string; h1Text?: string; bodyContent?: string; ogImage?: string } {
  const res = resolveRawRouteSEO(pathname);
  let p = pathname.trim().toLowerCase();
  if (p.length > 1 && p.endsWith("/")) {
    p = p.substring(0, p.length - 1);
  }
  if (!p) p = "/";

  const searchMetadata = PAGE_SEARCH_METADATA[p];
  if (searchMetadata) {
    res.title = searchMetadata.title;
    res.desc = searchMetadata.desc;
    // The injector derives Open Graph and Twitter text from the same copy.
    res.extraHead = res.extraHead?.replace(
      /<meta\b(?=[^>]*\b(?:name|property)\s*=\s*["'](?:og:description|twitter:description)["'])[^>]*\/?>/gi,
      ''
    );
  }

  const priorityMeta = PRIORITY_PRODUCT_OG[p];
  if (priorityMeta) {
    res.ogImage = priorityMeta.image;
    const ogTags = `  <meta property="og:image" content="${priorityMeta.image}" />\n` +
      `  <meta property="og:image:secure_url" content="${priorityMeta.image}" />\n` +
      `  <meta property="og:image:type" content="${priorityMeta.type}" />\n` +
      `  <meta property="og:image:width" content="${priorityMeta.width}" />\n` +
      `  <meta property="og:image:height" content="${priorityMeta.height}" />\n` +
      `  <meta property="og:image:alt" content="${priorityMeta.alt}" />\n` +
      `  <meta name="twitter:card" content="summary_large_image" />\n` +
      `  <meta name="twitter:image" content="${priorityMeta.image}" />\n`;
    // Identify one relevant product photograph for Google page-image discovery.
    // Do not modify visible content, protected prices, or product offers.
    const pageImageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${res.canonical}#webpage`,
      "url": res.canonical,
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "@id": `${res.canonical}#primary-image`,
        "url": priorityMeta.image,
        "contentUrl": priorityMeta.image,
        "caption": priorityMeta.alt,
        "width": Number(priorityMeta.width),
        "height": Number(priorityMeta.height)
      }
    };
    res.extraHead = (res.extraHead || "") + ogTags +
      `  <script type="application/ld+json">${JSON.stringify(pageImageSchema)}</script>\\n`;
  }
  return res;
}


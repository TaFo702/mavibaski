Warning: truncated output (original token count: 65832)
Total output lines: 4516

import { getHomeSEO } from "../data/homePageContent";
export { injectSEOMetadata } from "./seoMetadata";
import { MAKBUZ_DETAILS, PARA_MAKBUZU_DATA } from "../data/makbuzData";
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
    title: "Matbaa ve Baskı Çözümleri | Mavi Basım",
    desc: "Kartvizit, broşür, kutu, etiket, makbuz, ambalaj ve kurumsal baskı ürünleri için Mavi Basım'dan baskı çözümleri ve teklif alın."
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
    title: "Kitap Ayracı Baskı Fiyatları | 350 gr Kuşe - Mavi Basım",
    desc: "Özel tasarımlı 350 gr kuşe mat selefonlu püsküllü kitap ayracı baskısı. Topkapı koordinasyon noktamızdan kitap ayracı çözümleri ile hemen sipariş verin."
  },
  "/yag-karti": {
    title: "Yağ Değişim Kartı Baskı Fiyatları | 350 gr Kuşe - Mavi Basım",
    desc: "Oto servisler için 350 gr kuşe veya 700 gr sıvama yağ kartı baskısı. Üretim ve kargo planı teklif veya sipariş aşamasında netleştirilir."
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
    title: "Sipariş Fişi Baskı Fiyatları 2026 | Otokopili Sipariş Fişi - Mavi Basım",
    desc: "Firmalara özel otokopili kendinden karbonlu koçanlı sipariş fişi baskı fiyatları. Numaratörlü ve perforeli sipariş koçanları Topkapı hizmet noktamızdan."
  },
  "/cilt-isleri": {
    title: "Cilt İşleri ve Mücellit Hizmetleri | Mavi Basım Topkapı",
    desc: "Tel dikiş, Amerikan cilt, iplik dikiş, sert kapak ve spiralleme gibi tüm mücellit ve ciltleme işlemleri Topkapı matbaa hizmet ve koordinasyon noktamız üzerinden yapılmaktadır."
  },
  "/makine-parkuru": {
    title: "Makine Parkurumuz | Ofset, Dijital & Mücellit Çözümlerimiz - Mavi Basım",
    desc: "Mavi Basım Topkapı makine parkurundaki Heidelberg ofset baskı makineleri, dijital baskı sistemleri, giyotin ve kesim otomasyonları hakkında detaylar."
  },
  "/amerikan-servis": {
    title: "Amerikan Servis Baskı Fiyatları | Kağıt Servis Altlığı",
    desc: "2.000 adet Amerikan servis baskı fiyatlarını inceleyin. 90 gr ve 120 gr 1. hamur ile 100 gr kuşe kağıt servis altlığı seçenekleri."
  },
  "/karton-canta": {
    title: "Karton Çanta Baskı Fiyatları | İpli Poşet - Mavi Basım",
    desc: "210 gr Amerikan Bristol ipli karton çanta baskı fiyatlarını inceleyin. 4 ebatta 500 ve 1.000 adet seçenekleri, mat veya parlak selefon ve Mavi Basım’dan teklif alın."
  },
  "/zarf": {
    title: "Zarf Baskı Fiyatları | Diplomat ve Torba Zarf - Mavi Basım",
    desc: "Diplomat ve torba zarf baskı fiyatlarını inceleyin. Pencereli, penceresiz ve logolu zarf seçenekleri için ölçü, adet ve baskı bilgilerinize göre teklif alın."
  },
  "/kataloglar": {
    title: "Katalog Baskı Fiyatları | Çok Sayfalı Ürün Kataloğu - Mavi Basım",
    desc: "Ürün vitrininizi tanıtan spiralsiz tel dikişli, iplik dikişli veya Amerikan cilt lüks katalog ve dergi baskısı. Topkapı matbaasından toptan katalog imalatı."
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
    title: "Makbuz ve Form Baskı Fiyatları | Mavi Basım",
    desc: "Adisyon, sipariş fişi, makbuz ve matbu form fiyatlarını; cilt, nüsha ve baskı seçenekleriyle tek sayfada inceleyin."
  },
  "/para-makbuzu": {
    title: "Numaratörlü Para Makbuzu Baskı Fiyatları | Mavi Basım Matbaa",
    desc: "14×20 cm numaratörlü, otokopili para makbuzu baskı fiyatlarını; 2, 3 ve 4 nüsha seçenekleriyle 5 ciltten itibaren inceleyin."
  },
  "/matbaa": {
    title: "Biz Kimiz? | Mavi Basım Matbaa & Reklam ve Topkapı Fabrikamız",
    desc: "Mavi Basım Matbaa & Reklam'ın kurumsal geçmişi, basım vizyonu, Topkapı tesislerimizdeki makine parkurumuz ve üretim felsefemiz hakkında kapsamlı bilgiler."
  },
  "/referanslar": {
    title: "Referanslarımız | Mavi Basım Matbaa & Reklam",
    desc: "Mavi Basım Matbaa & Reklam olarak bugüne kadar başarıyla tamamladığımız kurumsal referanslarımız, matbaa baskı işlerimiz ve müşteri memnuniyeti mesajları."
  },
  "/sikca-sorulan": {
    title: "Sıkça Sorulan Sorular | Mavi Basım Matbaa & Reklam",
    desc: "Sipariş süreçleri, tasarım onay aşaması, minimum üretim adetleri, yangın ve kayıp toleransı, kargo teslimatı ve ödeme yöntemleri hakkında tüm detaylar."
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
    title: "İletişim | Mavi Basım Matbaa & Reklam Topkapı İstanbul",
    desc: "Mavi Basım Matbaa & Reklam Topkapı İstanbul adresi, telefon numaralarımız, WhatsApp sipariş hattımız ve e-posta adreslerimizle yol tarifi bilgilendirmeleri."
  },
  "/blog": {
    title: "Kurumsal Matbaacılık ve Baskı Çözümleri Bloğu | Mavi Basım",
    desc: "Doğru kağıt gramajı seçimi, CMYK ve taşma payı rehberliği, otokopili evrak tasarımı ve ofset printing teknolojileri hakkında profesyonel makaleler."
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
    image: "https://mavibasim.com/images/brosur/brosur-baski-fiyatlari.webp",
    type: "image/webp",
    width: "1536",
    height: "1024",
    alt: "Mavi Basım broşür baskı fiyatları, A4, A5 ve katlamalı broşür çeşitleri"
  },
  "/el-ilani": {
    image: "https://mavibasim.com/images/el-ilani/el-ilani-baski-fiyatlari.webp",
    type: "image/webp",
    width: "800",
    height: "533",
    alt: "Mavi Basım A5 ve A4 el ilanı baskı fiyatları ve kuşe kağıt modelleri"
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
    width: "1536",
    height: "1024",
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
          "name": "El İlanı Baskı Fiyatları",
          "item": "https://mavibasim.com/el-ilani"
        }
      ]
    };

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "El İlanı Baskı Fiyatları ve Ölçüleri",
      "image": "https://mavibasim.com/images/el-ilani/el-ilani-baski-fiyatlari.webp",
      "description": "A4, A5 ve A6 el ilanı baskı fiyatlarını inceleyin. 105, 115 ve 135 gr kuşe, tek-çift yön baskı, ölçü, adet ve özel teklif bilgileri.",
      "brand": {
        "@type": "Brand",
        "name": "Mavi Basım"
      },
      "category": "El İlanı Baskı",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": "1550",
        "highPrice": "9400",
        "offerCount": "14",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock"
      }
    };

    const elIlaniFaqs = [
      {
        q: "El ilanı baskı fiyatı ve el ilanı bastırma fiyatları nasıl hesaplanır?",
        a: "El ilanı baskı fiyatı ve el ilanı bastırma fiyatları; tercih edilen net kesim ölçüsü, kâğıt gramajı (105 gr, 115 gr veya 135 gr kuşe), tek veya çift yön renkli baskı seçeneği, sipariş adedi ve talep edilen ek mücellit işlemlerine göre hesaplanır. Net maliyet sipariş özelliklerine göre belirlenir."
      },
      {
        q: "A5 el ilanı ölçüleri ve standart referans ebatları nelerdir?",
        a: "Standart A5 ebat referansı 14,8 × 21 cm olmakla birlikte, matbaa baskı ve giyotin kesim standartlarında satın alınabilir net kesim ölçüsü 13,8 × 20 cm olarak uygulanmaktadır. Baskı öncesinde bu ölçülere uygun dosya hazırlanması önerilir."
      },
      {
        q: "Fiyat listesinde olmayan adet ve ölçüler için özel teklif alınabilir mi?",
        a: "Evet, fiyat tablosunda yer almayan 1.000 adet, 5.000 adet, 10.000 adet veya özel el ilanı ölçüleri için talep ettiğiniz ebat, adet, kâğıt cinsi ve baskı yönü bilgilerini ileterek özel teklif alabilirsiniz."
      },
      {
        q: "Tek ve çift yön el ilanı arasındaki fark nedir?",
        a: "Tek yön el ilanı yalnızca ön yüzeyine renkli baskı yapılan seçenektir. Çift yön el ilanı ise ön ve arka yüzeyin her ikisine de baskı uygulanarak daha kapsamlı bilgi, menü veya kampanya içeriği aktarılmasına olanak tanır."
      },
      {
        q: "El ilanı baskı dosyası nasıl hazırlanmalıdır?",
        a: "Baskı dosyalarının CMYK renk modunda, en az 300 DPI çözünürlükte ve kenarlardan en az 3 mm kesim payı (taşma payı) bırakılarak PDF, AI veya yüksek kaliteli TIFF formatında hazırlanması gerekmektedir."
      },
      {
        q: "KDV ve kargo ücreti fiyata dahil midir?",
        a: "Fiyat tablosundaki tutarlar koli bazlı liste fiyatları olup %20 KDV ve kargo bedeli hariçtir. Türkiye geneline anlaşmalı kargo seçeneği ile gönderim sağlanmakta olup kargo bedeli sipariş hacmine göre belirlenir."
      },
      {
        q: "El ilanı siparişinde grafik tasarım hizmeti veriliyor mu?",
        a: "Baskıya hazır olarak iletilen tasarımlar için teknik ölçü ve çözünürlük kontrolü ile dijital PDF prova ücretsiz sunulmaktadır. Grafik desteği var."
      },
      {
        q: "Üretim ve kargoya teslim süresi ne kadardır?",
        a: "Üretim ve kargoya teslim süresi; ürün özellikleri, sipariş adedi, grafik dosya onay süreci ve üretim yoğunluğuna göre teklif aşamasında bildirilir. Onaylanan işler tamamlandığında anlaşmalı kargoya teslim edilir."
      }
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": elIlaniFaqs.map(f => ({
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
          "name": "Afiş Baskı Fiyatları",
          "item": "https://mavibasim.com/afis"
        }
      ]
    };

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Afiş Baskı Fiyatları ve Poster Ölçüleri",
      "image": "https://mavibasim.com/images/afis/afis-baski-fiyatlari-ve-cesitleri.webp",
      "description": "35x50, 50x70 ve 70x100 cm afiş baskı fiyatlarını inceleyin. 105, 135, 170 gr kuşe ve Blueback afiş poster baskı seçenekleri için teklif alın.",
      "brand": {
        "@type": "Brand",
        "name": "Mavi Basım"
      },
      "category": "Afiş Baskı",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": "2550",
        "highPrice": "4550",
        "offerCount": "6",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock"
      }
    };

    const afisFaqs = [
      {
        q: "Afiş baskı fiyatları ve afiş bastırma fiyatları nasıl hesaplanır?",
        a: "Afiş baskı fiyatları ve afiş bastırma fiyatları; tercih edilen baskı ebadı (34×49 cm / 35×50 cm veya 49×69 cm / 50×70 cm), kâğıt gramajı (105 gr, 135 gr veya 170 gr kuşe ile 120 gr Blueback), sipariş adedi ve selefon gibi ek işlemlere göre hesaplanır."
      },
      {
        q: "35x50 cm ve 50x70 cm afiş ölçüleri ile net kesim ebatları nelerdir?",
        a: "Matbaacılık tabaka kesim standartlarında 35×50 cm afiş için satın alınabilir net kesim ölçüsü 34×49 cm; 50×70 cm afiş için satın alınabilir net kesim ölçüsü 49×69 cm olarak uygulanmaktadır. Büyük boy 70×100 cm afişler ise tam tabaka olarak işlenir."
      },
      {
        q: "Fiyat listesinde olmayan adet, gramaj ve ölçüler için özel teklif alınabilir mi?",
        a: "Evet, fiyat listemizde yer almayan 135 gr, 170 gr kuşe, 70×100 cm dev boy, 120 gr Blueback dış mekan kağıdı veya farklı adetler için talep ettiğiniz ebat, gramaj ve adet bilgilerini ileterek özel teklif alabilirsiniz."
      },
      {
        q: "Kuşe kağıt afiş ile Blueback afiş arasındaki fark nedir?",
        a: "Kuşe kağıt afişler iç mekan, mağaza vitrini ve duyuru panoları için yüksek renk canlılığı sunar. 120 gr Blueback afişler ise arka yüzeyindeki mavi opak kaplama sayesinde alttaki görselin görünürlüğünü azaltmaya yardımcı olan bir afiş kâğıdıdır. Dış mekân uygunluğu; malzeme, baskı yöntemi, uygulama yüzeyi, hava koşulları ve kullanım süresine göre sipariş öncesinde teyit edilmelidir."
      },
      {
        q: "Afiş baskı dosyası nasıl hazırlanmalı, çözünürlük nasıl olmalıdır?",
        a: "Afiş baskı dosyalarının CMYK renk modunda, 4 kenarından en az +3 mm kesim taşma payı (bleed) verilerek ve yazılar konvertlenmiş şekilde PDF, TIFF veya AI formatında hazırlanması gerekir. Nihai baskı ölçüsündeki raster görseller için kullanım ve izleme mesafesine göre genellikle 150–300 PPI aralığı değerlendirilebilir. Logo, yazı ve ikonlar mümkünse vektörel korunmalıdır."
      },
      {
        q: "Afiş baskısında minimum sipariş adedi kaçtır?",
        a: "Ofset büyük boy afiş baskılarında ekonomik kalıp maliyeti avantajı için fiyat listemizdeki standart seçenekler 250 adet, 500 adet ve 1.000 adettir. Özel projeler için farklı tirajlarda teklif verilebilir."
      },
      {
        q: "KDV ve kargo ücreti afiş fiyatlarına dahil midir?",
        a: "Fiyat listemizde yer alan tutarlar %20 KDV ve kargo bedeli hariçtir. İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktası üzerinden Türkiye geneline anlaşmalı kargo ile gönderim sağlanmaktadır."
      },
      {
        q: "Afişler kargo ve sevkiyatta nasıl paketlenir?",
        a: "Afişleriniz kargo sürecinde ezilme, katlanma ve kırışma riskine karşı dayanıklı rulo silindir tüplere veya koruyucu mukavva destekli ambalajlara sarılarak güvenle sevk edilir."
      },
      {
        q: "Afiş siparişinde dijital prova onayı sunuluyor mu?",
        a: "Evet, tarafımıza iletilen tasarım dosyaları teknik kontrollerden geçirilir ve baskı öncesinde dijital PDF prova onayı sunularak onayınız alındıktan sonra üretime geçilir."
      },
      {
        q: "Üretim ve kargoya teslim süresi ne kadardır?",
        a: "Üretim ve kargoya teslim süresi; ürün, adet, dosya onayı ve sipariş yoğunluğuna göre teklif aşamasında bildirilir."
      }
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": afisFaqs.map(f => ({
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

    const bodyContent = `<h1>Afiş Baskı Fiyatları ve Poster Ölçüleri</h1>
<p>Kurumsal tanıtım, mağaza vitrinleri ve etkinlik duyurularınız için 105 gr kuşe tek yön renkli olmak üzere 35x50 cm ve 50x70 cm <strong>afiş baskı</strong> seçeneklerimizi inceleyebilirsiniz. İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktamız üzerinden Türkiye geneline anlaşmalı kargo seçeneği sunulmaktadır.</p>
<p>Afiş baskı fiyatları; ebat (34×49 cm / 35×50 cm veya 49×69 cm / 50×70 cm), kâğıt gramajı (105 gr, 135 gr, 170 gr kuşe ve 120 gr Blueback), baskı yönü ve sipariş adedine göre belirlenir. 35x50 afiş baskı ile 50x70 afiş baskı fiyatlarını AF1–AF6 ürün kodları ve 250, 500, 1.000 adet seçenekleri üzerinden karşılaştırabilirsiniz.</p>
<h2>Afiş Ölçüleri ve Kullanım Alanları</h2>
<p>35x50 afiş ölçüleri satın alınabilir net kesim ölçüsü 34×49 cm, 50x70 afiş ölçüleri ise satın alınabilir net kesim ölçüsü 49×69 cm olarak uygulanmaktadır. Büyük boy 70x100 afiş baskı seçenekleri ise tam tabaka olarak işlenmektedir.</p>
<p>250 adet, 500 adet ve 1.000 adet afiş seçeneklerini mevcut fiyat tablosundan inceleyebilir; daha yüksek adetler veya özel ebatlar için WhatsApp destek hattımızdan özel teklif alabilirsiniz.</p>
<h2>Fiyat Listesinde Olmayan Afiş Seçenekleri</h2>
<p>Fiyat listesinde yer almayan 135 gr kuşe afiş, 170 gr kuşe afiş, 70x100 afiş baskı ve 120 gr Blueback afiş seçenekleri malzeme tedariki ve teknik uygunluğa göre değerlendirilebilir.</p>
<p>Mağaza afişi, vitrin afişi, etkinlik afişi, konser afişi, kampanya afişi, indirim afişi, emlak afişi, seçim afişi, açılış afişi, festival afişi, dış mekan afiş, iç mekan afiş, reklam afişi ve büyük boy poster talepleriniz için tek yön renkli afiş ve özel çözümler sunmaktayız.</p>`;

    return {
      title: staticPages["/afis"].title,
      desc: staticPages["/afis"].desc,
      canonical,
      extraHead,
      h1Text: "Afiş Baskı Fiyatları ve Poster Ölçüleri",
      bodyContent
    };
  }

  if (p === '/brosur') {
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
          "name": "Broşür Baskı",
          "item": "https://mavibasim.com/brosur"
        }
      ]
    };

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Broşür Baskı & Katlamalı Broşür",
      "description": "115 gr, 130 gr ve 200 gr kuşe kâğıda çift yön renkli A4, A5, A3 ve özel ebat broşür baskı seçenekleri. Tek kırım, Z-kırım ve C-kırım katlama modelleri.",
      "brand": {
        "@type": "Brand",
        "name": "Mavi Basım"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": "1550",
        "highPrice": "17950",
        "offerCount": "40",
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock"
      }
    };

    const brosurFaqs = [
      {
        q: "A4, A5 ve A3 broşür ölçüleri arasındaki temel farklar nelerdir?",
        a: "A4 sınıfı (20×28 cm veya 21×30 cm), kurumsal firma tanıtımları, detaylı ürün föyleri ve katlamalı menülerde yaygın formattır. A5 sınıfı (14×20 cm veya 15×21 cm), elden veya posta kutusu dağıtımlarında pratik ve ekonomik bir tercihtir. A3 sınıfı (28×40 cm veya 30×42 cm) ise katlandığında A4 paneller oluşturan geniş ürün listeleri ve çok panelli sunumlar için uygundur."
      },
      {
        q: "115 gr, 130 gr ve 200 gr kuşe kâğıt arasındaki farklar nelerdir?",
        a: "115 gr kuşe kâğıt hafif yapısıyla yüksek tirajlı dağıtımlar için uygundur. 130 gr kuşe kâğıt, daha tok kâğıt yapısıyla kurumsal tanıtım ve broşürlerde dengeli bir standart sunar. 200 gr kuşe kâğıt ise daha tok gövdesi ve parlak selefon kaplama seçeneğiyle fuar föyleri ve dayanıklı ürün tanıtımlarında tercih edilir."
      },
      {
        q: "Broşür baskı fiyatı ve broşür bastırma fiyatları nasıl hesaplanır?",
        a: "Broşür baskı fiyatı ve broşür bastırma fiyatları; seçilen ebat (A4, A5, A3 veya dar ebat), kâğıt gramajı (115 gr, 130 gr, 200 gr), sipariş adedi (1.000, 2.000, 5.000 veya 10.000 adet), selefon kaplama ve katlama (kırım) işlemine göre belirlenir. Yüksek tirajlarda kalıp ve makine hazırlık maliyetleri genele yayıldığı için adet başına düşen birim maliyet daha uygun hale gelir."
      },
      {
        q: "Minimum broşür baskı adedi kaçtır ve 1.000, 2.000, 5.000 veya 10.000 adet seçimi maliyeti nasıl etkiler?",
        a: "Ofset baskı sisteminde kalıp ve makine hazırlık maliyetleri tiraja bölündüğü için ekonomik minimum üretim 1.000 adettir. 2.000, 5.000 ve 10.000 gibi yüksek adetli siparişlerde birim başına düşen maliyet belirgin şekilde düşer."
      },
      {
        q: "Broşürlerde hangi katlama (kırım) modelleri uygulanabilir?",
        a: "Broşür tasarımına ve sayfa sayısına bağlı olarak Ortadan Tek Kırım (4 panel), Z-Kırım / Akordeon Katlama (6 panel) ve C-Kırım / İçe Katlama (6 panel) modelleri uygulanabilmektedir."
      },
      {
        q: "Kırım ve katlama işlemi fiyata dahil midir?",
        a: "Standart fiyat listesindeki ürünler düz kesim esasına dayanır. Kırım ve katlama işlemleri opsiyonel son işlemlerdir; seçilen katlama modeline ve tiraja göre işlem detayları teklif ve onay sürecinde netleştirilir."
      },
      {
        q: "Baskı dosyası hangi formatta hazırlanmalı ve taşma payı ne kadar olmalıdır?",
        a: "Tasarım dosyalarınızın CMYK renk modunda, en az 300 DPI çözünürlükte ve her kenardan 3 mm taşma payı (bleed) verilmiş olarak iletilmesi gerekir. Fontların eğriye (convert/outline) dönüştürülmesi ve dosyanın PDF/X formatında kaydedilmesi önerilir."
      },
      {
        q: "CMYK renk modu ile ekran (RGB) renkleri arasında ton farkı oluşur mu?",
        a: "Monitör ve telefon ekranları ışık tabanlı RGB renk uzayında çalışırken matbaa makineleri mürekkep tabanlı CMYK renk uzayında baskı yapar. Bu nedenle ekranda çok parlak görünen bazı tonlar baskıda doğal matbaa renklerine dönüşebilir; standart toleranslar dahilinde hafif ton değişimleri olağandır."
      },
      {
        q: "Dijital PDF prova onayı nedir ve neleri kapsar?",
        a: "Baskıya hazır dosyalar teknik açıdan kontrol edilir ve baskı öncesinde dijital PDF prova onaya sunulur. PDF prova, içeriğin ve yerleşimin doğruluğunu gösterir; fiziksel baskı rengini ve kâğıt dokusunu birebir garanti etmez."
      },
      {
        q: "Fiyat listenizdeki tutarlara KDV ve kargo dahil midir?",
        a: "Fiyat listemizde yer alan tutarlar %20 KDV hariçtir. Kargo ücreti, siparişinizin toplam ağırlığına ve teslim edilecek şehre göre anlaşmalı kargo tarifesi üzerinden ayrıca hesaplanır."
      }
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": brosurFaqs.map(f => ({
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

    return {
      title: staticPages["/brosur"].title,
      desc: staticPages["/brosur"].desc,
      canonical,
      extraHead,
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
        a: "Oto paspas fiyatları; tercih edilen baskı adedi (1.000, 2.000 veya 5.000 adet), kağıt gramajı ve ebatına göre belirlenir. Standart fiyat listemizde 34x49 cm 80 gr esmer kraft kağıt ve tek yön…35832 tokens truncated…Sipariş Ver</td>
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
      "itemListElement": (p === '/gider-makbuzu' || p === '/arac-kiralama')
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
      ogImage: (p === '/gider-makbuzu' || p === '/arac-kiralama')
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
    title = `${city.name} Matbaa & Baskı Hizmetleri | Mavi Basım`;
    desc = `${city.name} ve çevresindeki işletmeler için kartvizit, broşür, magnet, katalog ve kutu baskı hizmetleri. Topkapı fabrikamızdan ${city.name} adresinize hızlı teslimat.`;
    return { title, desc, canonical };
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
    res.extraHead = (res.extraHead || "") + ogTags;
  }
  return res;
}


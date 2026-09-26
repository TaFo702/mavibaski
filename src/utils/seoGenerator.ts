import { MAKBUZ_DETAILS } from "../data/makbuzData";
import { SEO_PAGES_DATA } from "../data/seoPagesData";
import { BLOG_POSTS } from "../data/blogData";
import { CITIES_DATA } from "../data/cityData";
import { SECTOR_IMAGE_MANIFEST, AMBALAJ_IMAGE_MANIFEST, ETIKET_IMAGE_MANIFEST } from "../generated/sectorImageManifest";
import { KUTU_SEO_METADATA, KUTU_FAQS, KUTU_SCHEMAS, generateKutuSSRBodyContent } from "../data/kutuPageContent";
import { AMBALAJ_SEO_METADATA, AMBALAJ_SCHEMAS, generateAmbalajSSRBodyContent } from "../data/ambalajPageContent";
import { KUP_BLOKNOT_SEO_METADATA, KUP_BLOKNOT_SCHEMAS, generateKupBloknotSSRBodyContent } from "../data/kupBloknotPageContent";
import { ETIKET_SEO_METADATA, ETIKET_SCHEMAS, generateEtiketSSRBodyContent } from "../data/etiketPageContent";
import { BLOKNOTLAR_SEO_METADATA, BLOKNOTLAR_SCHEMAS } from "../data/bloknotlarPageContent";
import { ANTETLI_SEO_METADATA, ANTETLI_SCHEMAS, generateAntetliSSRBodyContent } from "../data/antetliPageContent";
import { KATALOG_FAQS } from "../data/extraProductData";

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
  '/teslimat-sartlari'
]);

export const URL_REDIRECTS: Record<string, string> = {
  "/makbuz": "/makbuz-ve-formlar",
  "/katalog": "/kataloglar",
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
    desc: "Oto servisleri ve yıkamalar için 350 gr mat selefonlu oto yağ değişim takip kartı baskısı. Topkapı matbaasından kapınıza hızlı kargo imkanıyla."
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
    title: "Karton Kutu Baskı | Özel Kesim Ambalaj | Mavi Basım",
    desc: "Kozmetik, gıda dışı ürün, tekstil, hediyelik ve perakende ürünleri için Bristol veya kroma karton kutu baskısı. Ölçü, adet ve yüzey seçeneklerine göre teklif alın."
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
    title: "Karton Çanta Baskı Fiyatları | İpli Karton Poşet - Mavi Basım",
    desc: "Şık, çevre dostu ve kurumsal ipli karton çanta ve poşet baskısı. Boyalı veya kraft dipli ambalaj karton çantaları. Toptan imalat ve avantajlı fiyat seçenekleri."
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
    title: "Numaratörlü Para Makbuzu Baskı Fiyatları | Mavi Basım",
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
    title: "İleitişim | Mavi Basım Matbaa & Reklam Topkapı İstanbul",
    desc: "Mavi Basım Matbaa & Reklam Topkapı İstanbul adresi, telefon numaralarımız, WhatsApp sipariş hattımız ve e-posta adreslerimizle yol tarifi bilgilendirmeleri."
  },
  "/blog": {
    title: "Kurumsal Matbaacılık ve Baskı Çözümleri Bloğu | Mavi Basım",
    desc: "Doğru kağıt gramajı seçimi, CMYK ve taşma payı rehberliği, otokopili evrak tasarımı ve ofset printing teknolojileri hakkında profesyonel makaleler."
  },
  "/teslimat-sartlari": {
    title: "Teslimat Şartları ve Kargo Gönderim Rehberi | Mavi Basım Matbaa",
    desc: "Mavi Basım Matbaa & Reklam Türkiye geneli 81 il kargo teslimat şartları, matbaa ürün paketleme standartları, kargo süreleri ve hasarlı kargo süreçleri rehberi."
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
    image: "https://mavibasim.com/images/dosya/cepli-dosya-tasarimi.webp",
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

  // 0. Home Page Root Route
  if (p === "/" || p === "") {
    const orgAndLocalBusinessSchema = {
      "@context": "https://schema.org",
      "@type": ["Organization", "LocalBusiness", "PrintingService"],
      "@id": "https://mavibasim.com/#organization",
      "name": "Mavi Basım Matbaa & Reklam",
      "url": "https://mavibasim.com",
      "logo": "https://mavibasim.com/mavilogo.png",
      "image": "https://mavibasim.com/mavilogo.png",
      "description": "İstanbul Topkapı 2. Matbaacılar Sitesi'ndeki hizmet ve koordinasyon noktamız üzerinden Türkiye geneline matbaa ve ambalaj çözümleri sunuyoruz.",
      "telephone": "+90 536 602 23 73",
      "email": "info@mavibasim.com",
      "priceRange": "₺₺",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Maltepe Mah. Davutpaşa Cad. Topkapı 2. Matbaacılar Sitesi B Blok No:2NB",
        "addressLocality": "Zeytinburnu",
        "addressRegion": "İstanbul",
        "postalCode": "34010",
        "addressCountry": "TR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "41.0189",
        "longitude": "28.9161"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:30",
          "closes": "18:30"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday"],
          "opens": "09:00",
          "closes": "14:00"
        }
      ],
      "areaServed": {
        "@type": "Country",
        "name": "Türkiye"
      },
      "sameAs": [
        "https://www.instagram.com/mavibasimmatbaa",
        "https://www.facebook.com/profile.php?id=100048115954138"
      ]
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://mavibasim.com/#website",
      "name": "Mavi Basım",
      "url": "https://mavibasim.com",
      "description": "Kartvizit, broşür, kutu, etiket, makbuz, ambalaj ve kurumsal baskı ürünleri için Mavi Basım'dan baskı çözümleri ve teklif alın.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://mavibasim.com/?s={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };

    const homeFaqs = [
      {
        q: "Online matbaa siparişi nasıl verilir?",
        a: "Ürün sayfasından istediğiniz özellikleri (ebat, kağıt gramajı, adet) belirledikten sonra WhatsApp hattımız (+90 536 602 23 73) veya e-posta üzerinden tasarım dosyanızı bize ileterek hızlıca sipariş oluşturabilirsiniz. Ücretsiz teknik dosya kontrolü ve dijital PDF prova onayınızın ardından üretime başlanır."
      },
      {
        q: "Baskı öncesi dijital PDF prova onayı veriliyor mu?",
        a: "Evet. Gönderdiğiniz tasarımların çözünürlüğü, renk modu (CMYK), taşma ve kesim payları grafik ekibimizce kontrol edilir. Onayınız için dijital PDF prova hazırlanır; sizin yazılı onayınız olmadan baskıya geçilmez."
      },
      {
        q: "Türkiye geneline kargo gönderimi var mı?",
        a: "Evet. İstanbul Topkapı hizmet ve koordinasyon merkezimizden Türkiye'nin 81 iline anlaşmalı kargo firmaları ve koruyucu paketleme ile güvenli gönderim sağlıyoruz."
      },
      {
        q: "Kurumsal ve toptan matbaa siparişlerinde avantaj sağlanıyor mu?",
        a: "Evet. Ajanslar, kurumsal firmalar ve yüksek adetli siparişler için şeffaf birim maliyet avantajları ve sözleşmeli kurumsal faturalama imkanları sunulmaktadır."
      },
      {
        q: "Hangi baskı ve matbaa ürünleri üretilmektedir?",
        a: "Kartvizit, broşür, el ilanı, katalog, magnet, etiket, kutu, ambalaj, karton çanta, antetli kağıt, cepli dosya, bloknot, otokopili makbuz ve sipariş fişleri dahil tüm kurumsal matbaa ürünleri üretilmektedir."
      }
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": homeFaqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    };

    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Öne Çıkan Matbaa ve Baskı Hizmetleri",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Kartvizit Baskı",
          "url": "https://mavibasim.com/kartvizit"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Broşür Baskı",
          "url": "https://mavibasim.com/brosur"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "El İlanı Baskı",
          "url": "https://mavibasim.com/el-ilani"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Katalog Baskı",
          "url": "https://mavibasim.com/kataloglar"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Magnet Baskı",
          "url": "https://mavibasim.com/magnet"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "Etiket Baskı",
          "url": "https://mavibasim.com/etiket"
        },
        {
          "@type": "ListItem",
          "position": 7,
          "name": "Kutu ve Ambalaj Baskı",
          "url": "https://mavibasim.com/kutu"
        },
        {
          "@type": "ListItem",
          "position": 8,
          "name": "Karton Çanta Baskı",
          "url": "https://mavibasim.com/karton-canta"
        }
      ]
    };

    let extraHead = `  <script type="application/ld+json">${JSON.stringify(orgAndLocalBusinessSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(itemListSchema)}</script>\n`;

    return {
      title,
      desc,
      canonical,
      extraHead,
      h1Text: "Matbaa ve Baskı Çözümleri"
    };
  }

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
        a: "Amerikan servis baskı fiyatları; seçilen ebat, kâğıt türü ve gramajı (90 gr 1. Hamur, 100 gr kuşe veya 120 gr 1. Hamur), baskı adedi ve renk seçeneklerine göre belirlenir. Standart paketlerimiz 2.000 adet üzerinden sunulur; farklı adet seçenekleri için fiyat bilgisi sipariş detaylarına göre paylaşılır."
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
        "offerCount": "3",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock"
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
        q: "Oto kağıt paspas tasarla aşamasında ve baskıya hazır dosya hazırlığında nelere dikkat edilmelidir?",
        a: "Kendi firmanız için oto kağıt paspas tasarla sürecinde firma logonuz, adresiniz ve telefon numaralarınız vektörel formatta (PDF, AI) ve en az 300 DPI çözünürlükte hazırlanmalıdır. Kesim payı olarak 3 mm taşma bırakılmalıdır. Baskıya hazır dosyanız için teknik kontrol ve dijital PDF prova sunulmaktadır. Grafik desteği var."
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
      bodyContent
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
          "name": "Kartvizit Baskı",
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
        "offerCount": "17",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock"
      }
    };

    const kartvizitFaqs = [
      {
        q: "Kartvizit nedir ve hangi bilgiler bulunmalıdır?",
        a: "Kartvizit; bir kurumun veya profesyonelin iletişim bilgilerini, unvanını ve marka kimliğini karşı tarafa ileten basılı tanıtım kartıdır. Standart bir kartvizit baskı üzerinde firma logosu, ad-soyad, unvan, telefon, e-posta, web sitesi adresi ve isteğe bağlı olarak dijital menü veya kurumsal portföye yönlendiren QR kod yer almalıdır."
      },
      {
        q: "Kartvizit ölçüleri nasıl belirlenir?",
        a: "Kartvizit ölçüleri seçilen kesim ve modele göre sipariş aşamasında netleştirilir. Cüzdan ve kartlıklara pratik uyum sağlayan standart ebatların yanı sıra oval köşe kesimli veya özel bıçak kesimli modellerde farklı ebat seçenekleri tercih edilebilir."
      },
      {
        q: "100, 500 ve 1.000 adet seçenekleri nelerdir?",
        a: "Standart kağıt kartvizit paketlerimiz 1.000 adetten başlamaktadır. 100 kartvizit veya kartvizit fiyatları 100 adet gibi ara adetler standart fiyat listesinde bulunmamakta olup özel teklif kapsamında değerlendirilmektedir. Plastik PVC modelimiz ise kartvizit fiyatları 500 adet olarak listelenmiştir; kağıt modellerde 500 adet standart tabloda yer almamaktadır."
      },
      {
        q: "Kartvizit fiyatları hangi özelliklere göre değişir?",
        a: "Kartvizit fiyatları; seçilen kâğıt gramajı (250 gr, 350 gr, 400 gr, 700 gr veya 800 gr), baskı yönü (tek yön veya çift yön), selefon kaplama (mat veya parlak), kabartma lak, altın yaldız, özel kesim ve adet tirajına göre değişiklik gösterir. Kalın kartvizit fiyatları ve kabartmalı kartvizit fiyatları uygulanan ek işçilik ve malzeme katmanlarına göre farklılaşır."
      },
      {
        q: "Kalın kartvizit kağıdı ve 700–800 gr sıvama nedir?",
        a: "Kalın kartvizit kağıdı, iki veya daha fazla katman kartonun özel presleme yöntemiyle birleştirilmesiyle oluşturulur. 700 gr ve 800 gr kalın sıvama kartvizit ve kalın karton kartvizit çeşitleri, yüksek rijitliği ve bükülmeye karşı tok gövdesiyle üst segment prestij arayan yöneticiler ve markalar tarafından tercih edilir."
      },
      {
        q: "Kabartmalı kartvizit ile laklı kartvizit arasındaki ilişki nedir?",
        a: "Kabartmalı kartvizit veya laklı kartvizit modellerinde mat selefon kaplı yüzey üzerine şeffaf özel lak tabakası uygulanır. Bu sayede logonuz ve belirlenen grafik alanlar ışıkta parlayarak parmakla dokunulduğunda hissedilir bir kabartma dokusu kazanır. Kalın laklı kartvizit ve kalın kabartmalı kartvizit seçenekleri tok kâğıt yapısıyla estetik bir derinlik sunar."
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
        a: "Baskı öncesinde kartvizit tasarla ve dosya hazırlığı sürecinde CMYK renk modu ve en az 300 DPI çözünürlük tercih edilmelidir. Kesim toleransı için her kenardan 3 mm taşma payı bırakılmalı ve metinler eğriye (convert/outline) dönüştürülmelidir. Baskıya hazır dosyalarınız için teknik kontrol ve dijital PDF prova sunulmaktadır. Grafik desteği var."
      },
      {
        q: "Teslim süresi ve listede olmayan seçenekler nasıl belirlenir?",
        a: "Teslim süresi; talep edilen kartvizit modeli, sipariş adedi, baskıya hazır dosya onayı, baskı sonrası lak/yaldız/özel kesim uygulamaları ve operasyonel yoğunluğa bağlı olarak teklif veya sipariş aşamasında netleştirilir. Fiyat listesinde bulunmayan ara adet, özel ölçü ve özel kâğıt talepleri için web sitemizdeki Özel Teklif Al bağlantısı üzerinden bilgi alabilirsiniz."
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

    const bodyContent = `<h1>Kartvizit Baskı Fiyatları ve Kalın Kartvizit Modelleri</h1>
<p>Kurumsal kimliğinizi ve iletişim bilgilerinizi temsil eden <strong>kartvizit baskı</strong> ve <strong>kalın kartvizit</strong> çözümleri, profesyonel iş ilişkilerinin ilk temas noktasıdır. 250 gr'dan 800 gr'a kadar uzanan farklı gramaj seçenekleri, mat ve parlak selefon kaplamalar, özel kabartma lak, altın yaldız, özel kesim ve dayanıklı PVC alternatifleriyle <strong>kartvizit sipariş</strong> ve <strong>kartvizit bastırma</strong> süreçlerinizi kolaylaştırıyoruz. Siparişleriniz <strong>İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktası</strong> üzerinden koordine edilerek anlaşmalı kargo ile tarafınıza ulaştırılır.</p>
<p>Standart kağıt kartvizit modellerimiz 1.000 adetlik paketlerle sunulmaktadır. Güncel <strong>kartvizit fiyatları</strong>, <strong>kalın kartvizit fiyatları</strong> ve <strong>kartvizit fiyatları 1000 adet</strong> seçeneklerini aşağıdaki fiyat tablomuzdan inceleyebilir, özel gereksinimleriniz için teklif alabilirsiniz.</p>
<h2>Kalın Kartvizit Çeşitleri ve Özel Uygulamalar</h2>
<p>700 gr ve 800 gr <strong>kalın sıvama kartvizit</strong>, <strong>kalın karton kartvizit</strong>, <strong>laklı kartvizit</strong> ve <strong>kabartmalı kartvizit</strong> seçenekleri ile markanıza üst segment bir prestij kazandırın. Farklı kesim ve baskı sonrası işlemler için özel teklif alabilirsiniz.</p>`;

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
    extraHead += `  <link rel="preload" as="image" href="/images/kup-bloknot/kup-bloknot-baski-fiyatlari.webp" fetchpriority="high" />\n`;

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
    const productSchema = BLOKNOTLAR_SCHEMAS.productSchema;
    const faqSchema = BLOKNOTLAR_SCHEMAS.faqSchema;

    const ogImage = BLOKNOTLAR_SEO_METADATA.ogImage;
    let extraHead = `  <meta property="og:site_name" content="Mavi Basım Matbaa & Reklam" />\n`;
    extraHead += `  <meta property="og:locale" content="tr_TR" />\n`;
    extraHead += `  <meta property="og:description" content="${BLOKNOTLAR_SEO_METADATA.desc}" />\n`;
    extraHead += `  <meta property="og:image" content="${ogImage}" />\n`;
    extraHead += `  <meta property="og:image:secure_url" content="${ogImage}" />\n`;
    extraHead += `  <meta property="og:image:type" content="image/webp" />\n`;
    extraHead += `  <meta property="og:image:width" content="1200" />\n`;
    extraHead += `  <meta property="og:image:height" content="630" />\n`;
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
    extraHead += `  <script id="bloknotlar-product-schema" type="application/ld+json">${JSON.stringify(productSchema)}</script>\n`;
    extraHead += `  <script id="bloknotlar-faq-schema" type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;

    return {
      title: BLOKNOTLAR_SEO_METADATA.title,
      desc: BLOKNOTLAR_SEO_METADATA.desc,
      canonical,
      extraHead,
      bodyContent: '',
      h1Text: BLOKNOTLAR_SEO_METADATA.h1,
      ogImage
    };
  }

  // 1.13. Antetli Kağıt Page Dedicated Route
  if (p === '/antetli') {
    const breadcrumbSchema = ANTETLI_SCHEMAS.breadcrumbSchema;
    const productSchema = ANTETLI_SCHEMAS.productSchema;
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
    extraHead += `  <script id="antetli-product-schema" type="application/ld+json">${JSON.stringify(productSchema)}</script>\n`;
    extraHead += `  <script id="antetli-faq-schema" type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n`;

    const bodyContent = generateAntetliSSRBodyContent();

    return {
      title: ANTETLI_SEO_METADATA.title,
      desc: ANTETLI_SEO_METADATA.desc,
      canonical,
      extraHead,
      bodyContent,
      h1Text: "Logolu Antetli Kağıt Baskı Fiyatları & Kurumsal Yazışma Kağıtları",
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
        "lowPrice": "5400",
        "highPrice": "45500",
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
<h1>Kurumsal Ürün Kataloğu Tasarımı & Katalog Baskı Fiyatları</h1>
<p>A4 ve A5 ebatlarında, 135 gr kuşe iç sayfalar ve 300 gr mat/parlak selefonlu kapak alternatifiyle tel dikiş veya Amerikan ciltli profesyonel <strong>ürün katalog baskı</strong> çözümleri sunuyoruz.</p>
<h2>Katalog Baskı ve Üretimi Video Tanıtımı</h2>
<p>Kuşe kağıt kalitesi, kapak selefon uygulaması, tel dikiş ve tutkallı Amerikan cilt dayanıklılığı ile Mavi Basım tesislerinde üretilen kataloglarımızın YouTube video sunumunu inceleyebilirsiniz.</p>
<h2>Katalog Baskı Fiyatları ve Çeşitleri</h2>
<p>8, 12, 16, 20, 24, 28 ve 32 sayfa alternatifleriyle işletmenizin tüm ürün gamını tanıtan ekonomik ve kaliteli katalog çözümleri.</p>
<h2>Sıkça Sorulan Sorular (SSS)</h2>
<div class="space-y-4">
${faqsHtml}
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

    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Diplomat Zarf Baskı Fiyatları & Torba Zarf",
      "image": "https://mavibasim.com/images/zarf/kurumsal-zarf-baski.webp",
      "description": staticPages["/zarf"].desc,
      "brand": {
        "@type": "Brand",
        "name": "Mavi Basım"
      },
      "category": "Zarf Baskı",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "TRY",
        "lowPrice": "2500",
        "highPrice": "3900",
        "offerCount": "3",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock"
      }
    };

    const zarfFaqs = [
      {
        q: "Zarf baskısında hangi kağıt türü kullanılır",
        a: "Zarf baskılarında 110 gr. 1. Hamur kağıt seçeneği kullanılmaktadır. Kağıt seçimi ürün kodu ve sipariş detaylarına göre değerlendirilir."
      },
      {
        q: "Pencereli ve penceresiz zarf arasındaki fark nedir",
        a: "Pencereli ve penceresiz zarf seçenekleri ürün modeli ve kullanım tercihine göre değerlendirilir."
      },
      {
        q: "Zarflar kendinden yapışkanlı mı",
        a: "Kapatma bilgisi, ürün modeli ve sipariş detaylarına göre paylaşılır."
      },
      {
        q: "Zarf üzerine firma logosu basılabilir mi",
        a: "Zarf üzerine firma logosu, iletişim bilgileri ve kurumsal kimlik unsurları için baskı talebi iletilebilir."
      },
      {
        q: "Zarf hangi ölçülerde basılabilir",
        a: "10.5x24 cm Diplomat Zarf ve 24x32 cm Torba Zarf seçenekleri bulunmaktadır."
      },
      {
        q: "Minimum sipariş adedi nedir",
        a: "Diplomat zarflarda minimum sipariş miktarı 1.000 adet, torba zarflarda ise 500 adettir."
      },
      {
        q: "Tasarım desteği sağlıyor musunuz",
        a: "Logo ve iletişim bilgileri, sipariş detaylarıyla birlikte değerlendirilir."
      },
      {
        q: "Zarf baskısı kaç günde tamamlanır",
        a: "Hazırlık ve gönderim bilgileri, ürün detayları ve sipariş bilgileri netleştirildikten sonra paylaşılır."
      },
      {
        q: "Türkiye'nin her yerine gönderim yapıyor musunuz",
        a: "Gönderim yöntemi ve teslimat bilgileri sipariş detaylarına göre paylaşılır."
      }
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": zarfFaqs.map(f => ({
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
            <span class="text-gray-900 font-semibold" aria-current="page">Zarf Baskı</span>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</div>
<h1>Diplomat Zarf Baskı Fiyatları & Torba Zarf</h1>
<p>Mavi Basım olarak pencereli ve penceresiz diplomat zarf ile 24x32 cm A4 torba zarf baskı seçeneklerini İstanbul Topkapı 2. Matbaacılar Sitesi hizmet ve koordinasyon noktamız üzerinden planlıyoruz. Kurumsal evrak ve yazışma gönderimleriniz için diplomat veya torba zarf seçeneklerini değerlendirebilirsiniz.</p>`;

    return {
      title: staticPages["/zarf"].title,
      desc: staticPages["/zarf"].desc,
      canonical,
      extraHead,
      h1Text: "Diplomat Zarf Baskı Fiyatları & Torba Zarf",
      bodyContent
    };
  }

  if (p === '/dosyalar') {
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
          "name": "Cepli Dosya Baskı",
          "item": "https://mavibasim.com/dosyalar"
        }
      ]
    };

    const extraHead = `  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;

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
            <span class="text-gray-900 font-semibold" aria-current="page">Cepli Dosya Baskı</span>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</div>
<h1>Cepli Dosya Baskı Fiyatları</h1>
<p>Mavi Basım olarak 350 gr ve 400 gr kuşe kağıda mat ve parlak selefon kaplamalı, lak seçenekli cepli dosya baskı seçenekleri sunuyoruz.</p>`;

    return {
      title: staticPages["/dosyalar"].title,
      desc: staticPages["/dosyalar"].desc,
      canonical,
      extraHead,
      h1Text: "Cepli Dosya Baskı Fiyatları",
      bodyContent
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
        a: "Logolu poşet veya ipli karton poşet baskılarında minimum sipariş miktarı, tercih edilen model ve ölçüye göre değişiklik göstermektedir. Güncel minimum sipariş miktarı için bizimle iletişime geçebilirsiniz."
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
        q: "Türkiye'nin her yerine gönderim yapıyor musunuz?",
        a: "Evet. Üretilen taşıma çantası siparişleriniz özenle paketlenerek tüm il ve ilçelere güvenli şekilde kargo ile gönderilmektedir."
      },
      {
        q: "İpli karton poşet siparişi nasıl verebilirim?",
        a: "Sipariş vermek için baskıda kullanılacak logo, tasarım ve sipariş bilgilerini bizimle paylaşmanız yeterlidir. Tasarım onayının ardından üretim süreci başlatılarak özel üretim poşetleriniz hazırlanır."
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

    let extraHead = `  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
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
            <span class="text-gray-900 font-semibold" aria-current="page">Karton Çanta Baskı</span>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</div>
<h1>Karton Çanta Baskı Fiyatları &amp; İpli Karton Poşet İmalatı</h1>
<p>Mavi Basım olarak İstanbul Topkapı imalat tesisimizde mağazalar, butikler ve kurumsal firmalar için taban takviyeli, ipli logo baskılı şık karton çanta imalatı yapıyoruz.</p>
<figure class="my-4"><img src="/images/karton-canta/ipli-karton-canta-ornegi.webp" alt="İpli karton çanta baskısı, Amerikan Bristol üzerine mat selefon kaplamalı logo baskılı mağaza poşeti" width="1536" height="1024" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
<figure class="my-4"><img src="/images/karton-canta/karton-canta-baski-detayi.webp" alt="Butik giyim mağazası için logo baskılı karton poşet imalatı ve şık kordon sap detayı" width="1536" height="1024" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
<figure class="my-4"><img src="/images/karton-canta/karton-canta-baski-fiyatlari.webp" alt="Toptan karton çanta baskı fiyatları, kurumsal promosyon ve fuar çantası üretim aşaması" width="800" height="533" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
<figure class="my-4"><img src="/images/karton-canta/karton-canta-tasarimi.webp" alt="Özel tasarım lüks karton çanta, kabartma laklı ve gümüş varak yaldız baskılı marka ambalajı" width="1536" height="1024" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
<figure class="my-4"><img src="/images/karton-canta/magaza-karton-canta-baski.webp" alt="Kozmetik ve saat mağazaları için özel ölçülerde üretilen ipli karton poşet modelleri" width="1536" height="1024" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
<figure class="my-4"><img src="/images/karton-canta/karton_canta-baski.webp" alt="Türkiye geneli kargo teslimatlı, dayanıklı taban destekli toptan kraft karton çanta imalatı" width="1536" height="1024" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>`;

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
          "name": "Reklam Ürünleri",
          "item": "https://mavibasim.com/reklam-urunleri"
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
        "offerCount": "4",
        "availability": "https://schema.org/InStock"
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
            <a href="/reklam-urunleri" class="text-gray-600 hover:text-primary transition-colors">Reklam Ürünleri</a>
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
    "/sozlesme-baski": "sozlesme",
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
      bodyContent
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
          <td class="p-4 text-xs md:text-sm text-gray-700">Kasa borç hanesinde değil, borçlu hesaplara veya giderlere alacak kaydı</td>
          <td class="p-4 text-xs md:text-sm text-gray-700">Kasa hesabına borç, ödeme yapan tarafa alacak kaydı</td>
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
  <figure class="my-4"><img src="/images/tahsilat-makbuzu/otokopili-tahsilat-makbuzu.webp" alt="Tahsilat makbuzu basım fiyatları" width="930" height="1117" loading="lazy" decoding="async" class="w-full h-auto rounded-xl" /></figure>
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

    let extraHead = `  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n`;
    extraHead += `  <script type="application/ld+json">${JSON.stringify(productSchema)}</script>\n`;

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
      bodyContent 
    };
  }

  // 3. Match from blog posts database
  if (p.startsWith("/blog/")) {
    const slug = p.substring("/blog/".length);
    const post = BLOG_POSTS.find((bp) => bp.slug === slug);
    if (post) {
      title = `${post.title} - Mavi Basım`;
      desc = post.excerpt;
      return { title, desc, canonical };
    }
  }

function generateSectorBodyContent(slug: string, seoPage: any, _canonicalUrl?: string): string {
  const isKutu = slug === 'kutu-ambalaj-baski-cozumleri' || seoPage.path.includes('kutu-ambalaj');
  
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

      html += `</section>`;
    });

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

// SEO metadata duplicate cleanup
// Replaces SEO metadata inside index.html templates safely and without duplicates
export function injectSEOMetadata(
  html: string,
  title: string,
  desc: string,
  canonicalUrl: string,
  is404 = false,
  extraHead = '',
  h1Text = '',
  bodyContent = '',
  ogImage?: string
): string {
  const escapeAttribute = (value: string): string =>
    String(value)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;');

  const readExtraMeta = (
    attribute: 'name' | 'property',
    value: string
  ): string => {
    const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const pattern = new RegExp(
      `<meta\\b(?=[^>]*\\b${attribute}\\s*=\\s*["']${escapedValue}["'])[^>]*\\bcontent\\s*=\\s*["']([^"']*)["'][^>]*\\/?>`,
      'i'
    );

    return pattern.exec(extraHead)?.[1] || '';
  };

  const removeManagedMetadata = (source: string): string =>
    source
      .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
      .replace(
        /<meta\b(?=[^>]*\b(?:name|property)\s*=\s*["'](?:description|keywords|robots|og:[^"']+|twitter:[^"']+)["'])[^>]*\/?>/gi,
        ''
      )
      .replace(
        /<link\b(?=[^>]*\brel\s*=\s*["']canonical["'])[^>]*\/?>/gi,
        ''
      );

  const resolvedOgImage =
    ogImage ||
    readExtraMeta('property', 'og:image') ||
    'https://mavibasim.com/mavilogo.png';

  const resolvedOgSecureUrl =
    readExtraMeta('property', 'og:image:secure_url') || resolvedOgImage;

  const resolvedOgType =
    readExtraMeta('property', 'og:image:type') ||
    (resolvedOgImage.endsWith('.webp')
      ? 'image/webp'
      : resolvedOgImage.endsWith('.png')
        ? 'image/png'
        : 'image/jpeg');

  const resolvedOgWidth =
    readExtraMeta('property', 'og:image:width') ||
    (resolvedOgImage.endsWith('.webp') ? '800' : '1200');

  const resolvedOgHeight =
    readExtraMeta('property', 'og:image:height') ||
    (resolvedOgImage.endsWith('.webp') ? '533' : '630');

  const resolvedOgAlt =
    readExtraMeta('property', 'og:image:alt') || title;

  const resolvedOgDescription =
    readExtraMeta('property', 'og:description') || desc;

  const resolvedOgSiteName =
    readExtraMeta('property', 'og:site_name') ||
    'Mavi Basım Matbaa & Reklam';

  const resolvedOgLocale =
    readExtraMeta('property', 'og:locale') || 'tr_TR';

  const resolvedTwitterCard =
    readExtraMeta('name', 'twitter:card') || 'summary_large_image';

  const resolvedTwitterImage =
    readExtraMeta('name', 'twitter:image') || resolvedOgImage;

  const safeTitle = escapeAttribute(title);
  const safeDescription = escapeAttribute(desc);
  const safeCanonical = escapeAttribute(canonicalUrl);
  const safeOgImage = escapeAttribute(resolvedOgImage);
  const safeOgSecureUrl = escapeAttribute(resolvedOgSecureUrl);
  const safeOgType = escapeAttribute(resolvedOgType);
  const safeOgWidth = escapeAttribute(resolvedOgWidth);
  const safeOgHeight = escapeAttribute(resolvedOgHeight);
  const safeOgAlt = escapeAttribute(resolvedOgAlt);
  const safeOgDescription = escapeAttribute(resolvedOgDescription);
  const safeOgSiteName = escapeAttribute(resolvedOgSiteName);
  const safeOgLocale = escapeAttribute(resolvedOgLocale);
  const safeTwitterCard = escapeAttribute(resolvedTwitterCard);
  const safeTwitterImage = escapeAttribute(resolvedTwitterImage);

  const robotsContent = is404 ? 'noindex, follow' : 'index, follow';

  let result = removeManagedMetadata(html);
  const cleanedExtraHead = removeManagedMetadata(extraHead).trim();

  const managedMetadata = [
    `<title data-rh="true">${safeTitle}</title>`,
    `<meta data-rh="true" name="description" content="${safeDescription}" />`,
    `<link data-rh="true" rel="canonical" href="${safeCanonical}" />`,
    `<meta data-rh="true" name="robots" content="${robotsContent}" />`,
    `<meta data-rh="true" property="og:title" content="${safeTitle}" />`,
    `<meta data-rh="true" property="og:description" content="${safeOgDescription}" />`,
    `<meta data-rh="true" property="og:url" content="${safeCanonical}" />`,
    `<meta data-rh="true" property="og:type" content="website" />`,
    `<meta data-rh="true" property="og:site_name" content="${safeOgSiteName}" />`,
    `<meta data-rh="true" property="og:locale" content="${safeOgLocale}" />`,
    `<meta data-rh="true" property="og:image" content="${safeOgImage}" />`,
    `<meta data-rh="true" property="og:image:secure_url" content="${safeOgSecureUrl}" />`,
    `<meta data-rh="true" property="og:image:type" content="${safeOgType}" />`,
    `<meta data-rh="true" property="og:image:width" content="${safeOgWidth}" />`,
    `<meta data-rh="true" property="og:image:height" content="${safeOgHeight}" />`,
    `<meta data-rh="true" property="og:image:alt" content="${safeOgAlt}" />`,
    `<meta data-rh="true" name="twitter:card" content="${safeTwitterCard}" />`,
    `<meta data-rh="true" name="twitter:title" content="${safeTitle}" />`,
    `<meta data-rh="true" name="twitter:description" content="${safeDescription}" />`,
    `<meta data-rh="true" name="twitter:image" content="${safeTwitterImage}" />`
  ].join('\n  ');

  const headAdditions =
    `  ${managedMetadata}\n` +
    (cleanedExtraHead ? `  ${cleanedExtraHead}\n` : '');

  if (/<\/head>/i.test(result)) {
    result = result.replace(/<\/head>/i, `${headAdditions}</head>`);
  }

  const rootInner =
    bodyContent || (h1Text ? `<h1>${escapeAttribute(h1Text)}</h1>` : '');

  if (rootInner) {
    result = result.replace(
      '<div id="root"></div>',
      `<div id="root">${rootInner}</div>`
    );
  }

  return result;
}
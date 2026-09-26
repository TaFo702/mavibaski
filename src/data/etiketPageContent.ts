import { ETIKET_DATA } from './productData';
import { ETIKET_IMAGE_MANIFEST } from '../generated/sectorImageManifest';

export { ETIKET_DATA };

export interface EtiketFaqItem {
  q: string;
  a: string;
}

export interface EtiketGalleryItem {
  title: string;
  desc: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface EtiketComparisonItem {
  material: string;
  waterResist: string;
  tearResist: string;
  surface: string;
  usage: string;
}

export const ETIKET_SEO_METADATA = {
  title: "Yapışkanlı Etiket ve Sticker Baskı Fiyatları | Mavi Basım",
  desc: "Kuşe, PP opak, şeffaf ve özel kesim yapışkanlı etiket baskı fiyatlarını inceleyin. Ambalaj etiketi ve sticker baskı seçenekleri için teklif alın.",
  canonical: "https://mavibasim.com/etiket",
  h1: "Yapışkanlı Etiket ve Sticker Baskı Fiyatları",
  robots: "index, follow",
  ogImage: "https://mavibasim.com/images/etiket/etiket-baski-fiyatlari.webp"
};

export const ETIKET_GALLERY: EtiketGalleryItem[] = [
  {
    src: "/images/etiket/yapiskanli-etiket-baski.webp",
    alt: "Kuşe Yapışkanlı Etiket Baskısı",
    title: "Kuşe Çıkartma Etiket",
    desc: "Yapışkanlı kuşe kağıt üzerine renkli baskı ve selefon seçeneği sunulan kuşe etiket baskı örneği.",
    width: 800,
    height: 533
  },
  {
    src: "/images/etiket/kuse-gorsel-etiket.webp",
    alt: "PP Opak Plastik Etiket Baskısı",
    title: "PP Opak Etiket",
    desc: "PP opak plastik bazlı malzeme ile hazırlanan opak etiket baskı örneği.",
    width: 1536,
    height: 1024
  },
  {
    src: "/images/etiket/seffaf-etiket-baski.webp",
    alt: "Şeffaf Sticker ve Etiket Baskısı",
    title: "Şeffaf Etiket (Transparan Sticker)",
    desc: "Zemin renginin ve uygulanan yüzeyin görünmesine izin veren şeffaf yapışkanlı etiket baskı örneği.",
    width: 1536,
    height: 1024
  },
  {
    src: "/images/etiket/rulet-etiket-tasarimi.webp",
    alt: "Rulo ve Tabaka Etiket Baskısı",
    title: "Rulo ve Tabaka Etiket",
    desc: "Rulo veya tabaka formunda değerlendirilen yapışkanlı etiket baskı seçenekleri.",
    width: 1536,
    height: 1024
  },
  {
    src: "/images/etiket/etiket-baski-fiyatlari.webp",
    alt: "Özel Kesimli Sticker Baskı",
    title: "Özel Kesim Yapışkanlı Sticker",
    desc: "Özel kesim yapışkanlı etiket baskı örneği; kesim bilgileri sipariş öncesinde netleştirilir.",
    width: 1536,
    height: 1024
  },
  {
    src: "/images/etiket/etiket-baski-ornegi.webp",
    alt: "Kavanoz ve Ambalaj Etiketi",
    title: "Kavanoz ve Ambalaj Etiketi",
    desc: "Ürün etiketi baskı ve ambalaj etiketi örneği.",
    width: 1536,
    height: 1024
  }
];

export const ETIKET_COMPARISON_DATA: EtiketComparisonItem[] = [
  {
    material: "Kuşe Kağıt Etiket",
    waterResist: "Kuşe kağıt malzeme",
    tearResist: "Kağıt bazlı yapı",
    surface: "Parlak veya Mat Selefonlu",
    usage: "Etiket ve sticker baskı seçenekleri"
  },
  {
    material: "PP Opak Plastik Etiket",
    waterResist: "PP opak plastik malzeme",
    tearResist: "Plastik taşıyıcı yapı",
    surface: "Beyaz Opak Plastik Zemin",
    usage: "Opak etiket baskı seçenekleri"
  },
  {
    material: "Şeffaf (Transparan) Etiket",
    waterResist: "Şeffaf plastik malzeme",
    tearResist: "Plastik taşıyıcı yapı",
    surface: "Saydam Transparan Film",
    usage: "Şeffaf etiket ve sticker baskı seçenekleri"
  },
  {
    material: "Sökülebilir (Removable) Etiket",
    waterResist: "Sökülebilir yapışkan seçeneği",
    tearResist: "Esnek Taşıyıcı",
    surface: "Az İz Bırakan Yapışkan Seçeneği",
    usage: "Geçici etiketleme seçenekleri"
  }
];

export const ETIKET_FAQS: EtiketFaqItem[] = [
  {
    q: "PP Opak etiket ile Kuşe kağıt etiket arasındaki temel fark nedir?",
    a: "PP Opak (Polipropilen) plastik bazlı, Kuşe etiket baskı ise kağıt bazlı bir malzeme seçeneğidir. Malzeme tercihi, etiketin uygulanacağı yüzey ve istenen görünüm değerlendirilerek yapılmalıdır."
  },
  {
    q: "Şeffaf etiket yapıştırıldığı yüzeyde zamanla sararma veya hava kabarcığı izi yapar mı?",
    a: "Şeffaf etiket baskı, saydam yapısıyla uygulandığı yüzeyin görünmesine izin verir. Görünüm; yüzey, tasarım ve uygulama koşullarına göre değişebileceği için sipariş öncesinde bu özellikler birlikte değerlendirilmelidir."
  },
  {
    q: "Etiket malzemesi seçimi nasıl yapılır?",
    a: "Kuşe, PP opak ve şeffaf etiketler farklı malzeme seçenekleridir. Malzeme seçimi, etiketin uygulanacağı yüzey ve istenen görünüm değerlendirilerek yapılmalıdır."
  },
  {
    q: "Etiket seçimi yapılırken nelere dikkat edilir?",
    a: "Etiket seçimi, uygulanacağı yüzey ve kullanım koşulları birlikte değerlendirilerek yapılmalıdır."
  },
  {
    q: "Farklı ambalaj yüzeyleri için hangi etiket türü seçilmelidir?",
    a: "Kuşe, PP opak ve şeffaf etiket seçenekleri; malzeme ve yüzey özellikleri birlikte değerlendirilerek seçilir."
  },
  {
    q: "Grafik unsurları içeren etiketlerde nelere dikkat edilir?",
    a: "Grafik unsurların baskıdaki görünümü; tasarım, ölçü ve zemin özellikleri birlikte değerlendirilerek ele alınır."
  },
  {
    q: "Etiket malzemesi kullanım alanına göre nasıl değerlendirilir?",
    a: "Etiket malzemesi seçimi, uygulama yüzeyi ve kullanım koşulları birlikte değerlendirilmelidir. Bu sayfadaki fiyat listesi genel yapışkanlı etiket seçeneklerini gösterir."
  },
  {
    q: "Rulo etiket mi yoksa tabaka etiket mi tercih edilmelidir?",
    a: "Rulo veya tabaka etiket seçimi, siparişin formuna ve kullanım biçimine göre değerlendirilir. Rulo etiket baskı fiyatları ile tabaka etiket seçenekleri hakkında mevcut ürün bilgileri ve sipariş detayları üzerinden bilgi alınabilir."
  },
  {
    q: "Özel kesim etiket seçenekleri nelerdir?",
    a: "Özel kesim yapışkanlı etiket seçenekleri, mevcut ürün bilgileri ve sipariş detayları doğrultusunda değerlendirilir. Kesim biçimi ve ölçüsü sipariş öncesinde netleştirilir."
  },
  {
    q: "Etiket baskıda minimum sipariş adedi nasıldır?",
    a: "Fiyat listemizde yer alan standart ölçülü kuşe etiketlerde siparişler 1.000 adetlik standart paketler halinde sunulmaktadır. Farklı adet, malzeme veya toptan etiket baskı talepleriniz için teklif aşamasında adet seçenekleri paylaşılmaktadır."
  },
  {
    q: "Özel kesim etiket nedir?",
    a: "Özel kesim etiketlerde kesim bilgisi, ürün ölçüsü ve tasarım özellikleri birlikte değerlendirilir. Kullanılacak kesim seçeneği sipariş öncesinde netleştirilir."
  },
  {
    q: "Yapışkanlı etiket seçimi nasıl yapılır?",
    a: "Yapışkanlı etiket seçimi, uygulama yüzeyi ve kullanım koşulları birlikte değerlendirilerek yapılır. Bu sayfada belirli bir yapışkan performansı garantisi belirtilmemektedir."
  },
  {
    q: "Şeffaf etiket baskısında görünüm nasıl değerlendirilir?",
    a: "Şeffaf etiketlerde baskı görünümü, tasarım ve uygulanan yüzey birlikte değerlendirilir. Şeffaf malzemenin özelliği nedeniyle uygulanan yüzeyin görünümü tasarımla birlikte ele alınır."
  },
  {
    q: "Mat selefon kaplama mı yoksa parlak selefon kaplama mı tercih edilmelidir?",
    a: "Mat veya parlak selefon seçimi, istenen yüzey görünümüne ve mevcut ürün seçeneklerine göre değerlendirilir. Selefonlu etiket bilgisi, fiyat ve ürün seçenekleriyle birlikte ele alınmalıdır."
  },
  {
    q: "Etiket tasarımında kesim bilgisi nasıl netleştirilir?",
    a: "Etiket tasarımında kesim bilgisi; ürün ölçüsü, tasarım ve seçilen etiket seçeneği birlikte değerlendirilerek netleştirilir."
  },
  {
    q: "Etiket sipariş süreci nasıl ilerler?",
    a: "Etiket siparişinde ürün, malzeme, ölçü ve adet bilgileri netleştirilir; ardından mevcut fiyat ve sipariş seçenekleri üzerinden süreç planlanır."
  }
];

const parsedPrices = ETIKET_DATA.map(item => {
  const numericStr = item.price.replace(/[^\d]/g, '');
  return parseInt(numericStr, 10);
}).filter(p => !isNaN(p));

const lowPrice = (parsedPrices.length > 0 ? Math.min(...parsedPrices) : 980).toString();
const highPrice = (parsedPrices.length > 0 ? Math.max(...parsedPrices) : 1350).toString();
const offerCount = ETIKET_DATA.length.toString();

export const ETIKET_SCHEMAS = {
  breadcrumbSchema: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://mavibasim.com/etiket#breadcrumb",
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
        "name": "Etiket Baskı Fiyatları",
        "item": "https://mavibasim.com/etiket"
      }
    ]
  },
  productSchema: {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://mavibasim.com/etiket#product",
    "name": "Yapışkanlı Etiket ve Sticker Baskı Fiyatları",
    "image": "https://mavibasim.com/images/etiket/etiket-baski-fiyatlari.webp",
    "description": "Kuşe, PP opak, şeffaf ve özel kesim yapışkanlı etiket baskı fiyatlarını inceleyin. Ambalaj etiketi ve sticker baskı seçenekleri için teklif alın.",
    "brand": {
      "@type": "Brand",
      "name": "Mavi Basım"
    },
    "category": "Etiket Baskı",
    "url": "https://mavibasim.com/etiket",
    "offers": {
      "@type": "AggregateOffer",
      "@id": "https://mavibasim.com/etiket#aggregate-offer",
      "priceCurrency": "TRY",
      "lowPrice": lowPrice,
      "highPrice": highPrice,
      "offerCount": offerCount,
      "url": "https://mavibasim.com/etiket",
      "seller": {
        "@id": "https://mavibasim.com/#organization"
      }
    }
  },
  faqSchema: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://mavibasim.com/etiket#faq",
    "mainEntity": ETIKET_FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  }
};

export function generateEtiketSSRBodyContent(): string {
  const tableRowsHtml = ETIKET_DATA.map((item, idx) => {
    const isFirst = idx === 0;
    const rowgroupCell = isFirst ? `
      <th scope="rowgroup" rowspan="${ETIKET_DATA.length}" style="background-color: #0f172a; color: #ffffff; font-weight: 900; text-align: center; padding: 4px; width: 40px; writing-mode: vertical-rl; transform: rotate(180deg); letter-spacing: 0.1em; font-size: 10px;">
        ETİKET
      </th>
    ` : '';
    const whatsappOrderUrl = `https://wa.me/905366022373?text=${encodeURIComponent(`Merhaba, ${item.code} kodlu ${item.desc} (Ebat: ${item.ebat}) için 1.000 adet standart liste fiyatı (${item.price} + KDV) üzerinden sipariş vermek / detaylı bilgi almak istiyorum.`)}`;

    return `
      <tr style="border-bottom: 1px solid #f1f5f9;">
        ${rowgroupCell}
        <th scope="row" style="padding: 12px; text-align: center; font-weight: 700; color: #29abe2; border-right: 1px solid #f1f5f9;">${item.code}</th>
        <td style="padding: 12px; text-align: center; font-weight: 500; color: #000000; border-right: 1px solid #f1f5f9;">${item.ebat}</td>
        <td style="padding: 12px; text-align: center; font-weight: 500; color: #000000; border-right: 1px solid #f1f5f9;">${item.desc}</td>
        <td style="padding: 12px; text-align: center; font-weight: 900; color: #000000; border-right: 1px solid #f1f5f9; background-color: #f8fafc; font-size: 15px;">${item.price}</td>
        <td style="padding: 12px; text-align: center;">
          <a href="${whatsappOrderUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: #29abe2; color: #ffffff; padding: 8px 16px; border-radius: 9999px; font-weight: 900; font-size: 12px; text-decoration: none;">Hemen Sipariş Ver</a>
        </td>
      </tr>
    `;
  }).join('');

  const comparisonRowsHtml = ETIKET_COMPARISON_DATA.map((item) => {
    return `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <th scope="row" style="padding: 16px; font-weight: 900; color: #000000; text-align: left;">${item.material}</th>
        <td style="padding: 16px; font-weight: 700;">${item.waterResist}</td>
        <td style="padding: 16px; font-weight: 700;">${item.tearResist}</td>
        <td style="padding: 16px; font-weight: 500; color: #334155;">${item.surface}</td>
        <td style="padding: 16px; font-weight: 500; color: #334155;">${item.usage}</td>
      </tr>
    `;
  }).join('');

  const galleryHtml = ETIKET_GALLERY.map((img, idx) => {
    const isAvailable = Boolean(ETIKET_IMAGE_MANIFEST[img.src as keyof typeof ETIKET_IMAGE_MANIFEST]);
    const isHero = idx === 0;
    const imgHtml = isAvailable ? `
      <img
        src="${img.src}"
        alt="${img.alt}"
        width="${img.width}"
        height="${img.height}"
        ${isHero ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'}
        decoding="async"
        style="width: 100%; height: 100%; object-fit: contain; border-radius: 8px;"
      />
    ` : `
      <div data-placeholder-number="${idx + 1}" style="width: 100%; height: 100%; background-color: #f1f5f9; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #94a3b8; padding: 24px; text-align: center; border-radius: 8px;">
        <span style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase;">Görsel Hazırlanıyor</span>
        <span style="font-size: 11px; color: #94a3b8; margin-top: 4px;">Yuva ${idx + 1}</span>
      </div>
    `;

    return `
      <figure style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="overflow: hidden; border-radius: 12px; background-color: #ffffff; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; padding: 6px; width: 100%; aspect-ratio: 4/3; position: relative; border: 1px solid #f1f5f9;">
          ${imgHtml}
        </div>
        <div style="margin-top: 8px;">
          <h3 style="font-size: 14px; font-weight: 900; color: #000000; text-transform: uppercase; margin-bottom: 6px;">${img.title}</h3>
          <figcaption style="color: #64748b; font-size: 12px; font-weight: 600; line-height: 1.5;">${img.desc}</figcaption>
        </div>
      </figure>
    `;
  }).join('');

  const faqItemsHtml = ETIKET_FAQS.map((faq) => {
    return `
      <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; margin-bottom: 16px;">
        <h3 style="font-weight: 900; color: #000000; font-size: 14px; margin-bottom: 12px;">${faq.q}</h3>
        <p style="color: #475569; font-size: 13px; line-height: 1.6; margin: 0;">${faq.a}</p>
      </div>
    `;
  }).join('');

  return `
    <div class="etiket-page-container" style="max-width: 1440px; margin: 0 auto; padding: 16px;">
      <nav aria-label="Breadcrumb" style="background-color: #ffffff; border-bottom: 1px solid #e2e8f0; margin-bottom: 24px;">
        <div style="max-width: 1280px; margin: 0 auto; padding: 12px 0;">
          <ol style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #64748b; list-style: none; margin: 0; padding: 0; flex-wrap: wrap;">
            <li>
              <a href="/" style="color: #64748b; text-decoration: none;">Ana Sayfa</a>
            </li>
            <li style="color: #94a3b8;">/</li>
            <li>
              <a href="/matbaa" style="color: #64748b; text-decoration: none;">Matbaa Ürünleri</a>
            </li>
            <li style="color: #94a3b8;">/</li>
            <li style="color: #0f172a; font-weight: 700;" aria-current="page">Etiket Baskı Fiyatları</li>
          </ol>
        </div>
      </nav>

      <header style="margin-bottom: 24px;">
        <h1 style="font-size: 24px; font-weight: 900; text-transform: uppercase; color: #0f172a; margin-bottom: 8px;">
          ${ETIKET_SEO_METADATA.h1}
        </h1>
        <p style="color: #475569; font-size: 14px; line-height: 1.6;">
          Ürün ambalajlarınız ve kurumsal tanıtımlarınız için kuşe etiket baskı, PP opak plastik etiket, selefonlu etiket ve şeffaf yapışkanlı etiket baskı çözümleri sunuyoruz. Matbaa etiket baskı, ürün sticker baskı ve online etiket baskı ihtiyaçlarınızda baskılı etiket fiyatları ve sticker baskı seçeneklerini inceleyebilir, İstanbul Topkapı 2. Matbaacılar Sitesi hizmet ve koordinasyon noktamız üzerinden siparişinizi planlayabilirsiniz.
        </p>
      </header>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 24px; font-size: 13px; color: #334155;">
        Baskı öncesi ürün, malzeme ve sipariş bilgileri netleştirilir. İstanbul Topkapı 2. Matbaacılar Sitesi hizmet ve koordinasyon noktası.
      </div>

      <section style="margin-bottom: 48px;">
        <div style="overflow-x: auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <caption class="sr-only">Yapışkanlı Etiket Baskı Fiyat Listesi</caption>
            <thead>
              <tr style="background-color: #000000; color: #ffffff; border-bottom: 1px solid #000000;">
                <th scope="col" style="padding: 16px; width: 40px;"></th>
                <th scope="col" style="padding: 16px; width: 96px; font-weight: 900; text-transform: uppercase; border-right: 1px solid rgba(255,255,255,0.1);">KOD</th>
                <th scope="col" style="padding: 16px; text-align: center; font-weight: 900; text-transform: uppercase; border-right: 1px solid rgba(255,255,255,0.1);">EBAT</th>
                <th scope="col" style="padding: 16px; text-align: center; font-weight: 900; text-transform: uppercase; border-right: 1px solid rgba(255,255,255,0.1);">ÖZELLİKLER</th>
                <th scope="col" style="padding: 16px; width: 128px; font-weight: 900; text-transform: uppercase; border-right: 1px solid rgba(255,255,255,0.1);">FİYAT</th>
                <th scope="col" style="padding: 16px; width: 176px; font-weight: 900; text-transform: uppercase; text-align: center;">SİPARİŞ</th>
              </tr>
            </thead>
            <tbody>
              ${tableRowsHtml}
            </tbody>
          </table>
        </div>
        <div style="background-color: #fffbeb; padding: 14px 16px; border-top: 1px solid #fde68a; font-size: 12px; color: #92400e; border-radius: 0 0 16px 16px;">
          * Tabloda belirtilen fiyatlarımıza %20 KDV dahil değildir.
        </div>
      </section>

      <section style="margin-bottom: 48px;">
        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 22px; font-weight: 900; text-transform: uppercase; color: #000000; margin-bottom: 8px;">
            Kuşe, PP Opak ve Şeffaf Etiket Baskı Örnekleri
          </h2>
          <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0;">
            Kuşe, PP opak, şeffaf, rulo ve özel kesim yapışkanlı etiket seçenekleri mevcut ürün bilgileri doğrultusunda değerlendirilir. Ürün etiketi baskı ve sticker baskı seçenekleri için ölçü, adet ve malzeme bilgileri netleştirilir.
          </p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
          ${galleryHtml}
        </div>
      </section>

      <section style="margin-bottom: 48px;">
        <h2 style="font-size: 22px; font-weight: 900; text-transform: uppercase; color: #000000; margin-bottom: 24px;">
          Etiket Malzemeleri Karşılaştırması
        </h2>
        <div style="overflow-x: auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0;">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
            <caption class="sr-only">Etiket Malzemeleri Karşılaştırması</caption>
            <thead>
              <tr style="background-color: #0f172a; color: #ffffff;">
                <th scope="col" style="padding: 16px; font-weight: 900; text-transform: uppercase;">Malzeme Türü</th>
                <th scope="col" style="padding: 16px; font-weight: 900; text-transform: uppercase;">Malzeme Bilgisi</th>
                <th scope="col" style="padding: 16px; font-weight: 900; text-transform: uppercase;">Yapı Bilgisi</th>
                <th scope="col" style="padding: 16px; font-weight: 900; text-transform: uppercase;">Yüzey Görünümü</th>
                <th scope="col" style="padding: 16px; font-weight: 900; text-transform: uppercase;">Genel Açıklama</th>
              </tr>
            </thead>
            <tbody>
              ${comparisonRowsHtml}
            </tbody>
          </table>
        </div>
      </section>

      <section style="margin-bottom: 48px;">
        <h2 style="font-size: 22px; font-weight: 900; text-transform: uppercase; color: #000000; margin-bottom: 16px;">
          Etiket Baskı ve Sipariş Süreci
        </h2>
        <p style="color: #334155; font-size: 14px; line-height: 1.6;">
          Etiket baskı ve sipariş sürecinde ürün, malzeme, ölçü ve adet bilgileri netleştirilir. Baskı ve kesim seçenekleri mevcut ürün bilgileri doğrultusunda değerlendirilir. Teslimat için bu sayfada sabit bir süre belirtilmemektedir.
        </p>
      </section>

      <section id="faq" style="margin-bottom: 48px;">
        <h2 style="font-size: 22px; font-weight: 900; text-transform: uppercase; color: #000000; margin-bottom: 24px;">
          Yapışkanlı Etiket Baskı Hakkında Sıkça Sorulan Sorular (SSS)
        </h2>
        <div>
          ${faqItemsHtml}
        </div>
      </section>
    </div>
  `;
}
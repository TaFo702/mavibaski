import { KUP_BLOKNOT_DATA } from './extraProductData';
import { KUP_BLOKNOT_IMAGE_MANIFEST } from '../generated/sectorImageManifest';

export interface KupBloknotFaqItem {
  q: string;
  a: string;
}

export interface KupBloknotGalleryItem {
  title: string;
  desc: string;
  src: string;
  tag: string;
}

export const KUP_BLOKNOT_SEO_METADATA = {
  title: "Küp Bloknot Baskı Fiyatları | Logolu Promosyon Küp Bloknot",
  desc: "Küp bloknot baskı fiyatlarını, logolu ve promosyon küp bloknot seçeneklerini inceleyin. 250 ve 500 yapraklı masaüstü modeller için teklif alın.",
  ogDescription: "Küp bloknot baskı fiyatlarını, logolu ve promosyon küp bloknot seçeneklerini inceleyin. 250 ve 500 yapraklı masaüstü modeller için teklif alın.",
  canonical: "https://mavibasim.com/kup-bloknot",
  h1: "Küp Bloknot Baskı Fiyatları ve Logolu Promosyon Küp Bloknot",
  ogImage: "https://mavibasim.com/images/kup-bloknot/kup-bloknot-baski-fiyatlari.webp"
};

export const KUP_BLOKNOT_FAQS: KupBloknotFaqItem[] = [
  {
    q: "Küp bloknot siparişinde minimum adet nedir?",
    a: "Standart fiyat listemizde minimum sipariş adedi 100 adettir. Standart fiyat listesinde 100, 250 ve 500 adet seçenekleri bulunur. 250 yapraklı modelde 1.000 adet fiyatı listelenmiştir. 500 yapraklı 1.000 adet ve üzeri siparişler için özel teklif hazırlanır."
  },
  {
    q: "Küp bloknot iç yaprakları yapışkansız mıdır?",
    a: "Evet. Standart küp bloknotlarımızda iç yapraklar yapışkansız, 80 gr 1. hamur birinci sınıf beyaz kağıttan üretilir. Yapraklar kutu içerisinde serbest durur ve üst kısımdaki açıklıktan tek tek pratik şekilde çekilerek kullanılır."
  },
  {
    q: "250 yaprak ile 500 yaprak arasındaki temel farklar nelerdir?",
    a: "250 yapraklı küp bloknot yaklaşık 2,5 cm kutu yüksekliğine sahiptir; kompakt yapısıyla fuar, lansman ve etkinlik dağıtımları için hafif ve ekonomiktir. 500 yapraklı model ise yaklaşık 5 cm kutu yüksekliğine sahip olup klasik küp formundadır ve uzun süreli masaüstü kullanımında kurumsal kullanımda tercih edilen seçeneklerden biridir."
  },
  {
    q: "Dış kutu ve iç kağıt baskı özellikleri nasıldır?",
    a: "Dış kutu 350 gr Amerikan Bristol kartondan üretilir, 4 renk CMYK ofset baskılıdır ve dayanıklılık sağlayan karton yapı mat veya parlak selefon kaplama ile desteklenir. İç yapraklar ise 80 gr 1. hamur kağıda standart olarak tek renk ofset baskıyla hazırlanır; farklı renk talepleri özel teklif kapsamında değerlendirilir."
  },
  {
    q: "Tasarım dosyasını hangi formatta göndermeliyim?",
    a: "Baskı kalitesini korumaya yardımcı teknik koşullar için tasarımlarınızı PDF, AI (Adobe Illustrator) veya CDR (CorelDRAW) vektörel formatlarında, 300 DPI çözünürlükte ve CMYK renk modunda iletmeniz gerekmektedir."
  },
  {
    q: "Tasarım desteği ve baskı öncesi onay süreci nasıl işler?",
    a: "Baskıya uygun hazır grafik dosyalarınızın teknik kontrolü ve dijital PDF prova süreci tamamen ücretsizdir. Hazır tasarımınız yoksa veya düzenleme gerekiyorsa grafik ekibimiz WhatsApp üzerinden kapsam ve ücretlendirme konusunda size destek olur. Dijital PDF prova onayınız alınmadan kesinlikle baskıya geçilmez."
  },
  {
    q: "İstanbul içi elden teslimat seçeneği bulunuyor mu?",
    a: "Evet. İstanbul Topkapı 2. Matbaacılar Sitesi'ndeki hizmet ve koordinasyon noktamızdan üretimi tamamlanan siparişlerinizi doğrudan teslim alabilirsiniz. Ayrıca talep doğrultusunda anlaşmalı kurye veya kargo ile adresinize sevk edilebilir."
  },
  {
    q: "Şehir dışı kargo gönderimi nasıl yapılmaktadır?",
    a: "Türkiye'nin 81 iline anlaşmalı kargo firmalarımızla sevkiyat yapılmaktadır. Ürünler taşıma esnasında deformasyonu önlemeye yardımcı koruyucu çift kat mukavva kolilerde paketlenerek sevk edilir."
  }
];

export const KUP_BLOKNOT_GALLERY: KupBloknotGalleryItem[] = [
  {
    title: "Kutulu Küp Bloknot Baskı",
    desc: "350 gr Amerikan Bristol dış kutulu, koruyucu selefon kaplamalı ve 4 renk CMYK ofset baskılı kurumsal küp bloknot.",
    src: "/images/kup-bloknot/kutulu-kup-bloknot-baski.webp",
    tag: "Kutulu Ürün"
  },
  {
    title: "Küp Bloknot Baskı Fiyatları & Modelleri",
    desc: "250 ve 500 yaprak iç kağıt seçenekleriyle ofis masaları için ekonomik ve dayanıklı küp bloknot çözümleri.",
    src: "/images/kup-bloknot/kup-bloknot-baski-fiyatlari.webp",
    tag: "Fiyat & Model"
  },
  {
    title: "Küp Bloknot Baskı Detayı",
    desc: "80 gr 1. hamur iç yapraklarda yazı yazmayı engellemeyen hassas ofset çizgi, logo ve filigran baskı kalitesi.",
    src: "/images/kup-bloknot/kup-bloknot-baski-detayi.webp",
    tag: "İç Yaprak Baskı"
  },
  {
    title: "Küp Bloknot Tasarımı & Şablon",
    desc: "Firma logonuz, kurumsal renkleriniz ve iletişim bilgilerinizle masaüstünde fark yaratan özel dış kutu tasarımı.",
    src: "/images/kup-bloknot/kup-bloknot-tasarimi.webp",
    tag: "Özel Tasarım"
  },
  {
    title: "Promosyon Küp Bloknot Örneği",
    desc: "Müşterilerinizin ve iş ortaklarınızın çalışma masalarında uzun süre markanızı yaşatan prestijli promosyon küp notluk.",
    src: "/images/kup-bloknot/promosyon-kup-bloknot-ornegi.webp",
    tag: "Promosyon Notluk"
  },
  {
    title: "Baskılı Küp Not Kağıdı",
    desc: "Kutu içerisinden tek tek kolayca çekilip alınan, 78x78 mm ebatlarında 80 gr 1. hamur yapışkansız not kağıtları.",
    src: "/images/kup-bloknot/kup-bloknot-baski.webp",
    tag: "Küp Not Kağıdı"
  }
];

export const KUP_BLOKNOT_SCHEMAS = {
  breadcrumbSchema: {
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
        "name": "Küp Bloknot Baskı",
        "item": "https://mavibasim.com/kup-bloknot"
      }
    ]
  },
  productSchema: {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Küp Bloknot Baskı Fiyatları ve Logolu Promosyon Küp Bloknot",
    "image": "https://mavibasim.com/images/kup-bloknot/kup-bloknot-baski-fiyatlari.webp",
    "description": "78x78 mm ebatlarında, 250 ve 500 yaprak seçenekli, 350 gr Amerikan Bristol selefonlu dış kutulu ve 80 gr 1. hamur iç kağıtlı kurumsal küp bloknot baskısı.",
    "brand": {
      "@type": "Brand",
      "name": "Mavi Basım"
    },
    "category": "Küp Bloknot Baskı",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "TRY",
      "lowPrice": "8350",
      "highPrice": "17100",
      "offerCount": "7",
      "url": "https://mavibasim.com/kup-bloknot"
    }
  },
  faqSchema: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": KUP_BLOKNOT_FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  }
};

export function generateKupBloknotSSRBodyContent(): string {
  const tableRowsHtml = KUP_BLOKNOT_DATA.map((group, gIdx) => {
    return group.items.map((item, iIdx) => {
      const isStriped = iIdx % 2 === 0;
      const isGroupStart = iIdx === 0;
      const hasGroupSeparator = gIdx > 0 && isGroupStart;
      const rowBg = isStriped ? 'background-color: #edf7fd;' : 'background-color: #ffffff;';
      const separatorStyle = hasGroupSeparator ? 'border-top: 4px solid #cbd5e1;' : 'border-top: 1px solid #f1f5f9;';
      const categoryCell = isGroupStart ? `
        <td rowspan="${group.items.length}" style="background-color: #00a2e8; color: #ffffff; font-weight: 900; text-align: center; padding: 8px; width: 48px; writing-mode: vertical-rl; transform: rotate(180deg); letter-spacing: 0.1em; ${hasGroupSeparator ? 'border-top: 4px solid #cbd5e1;' : ''}">
          ${group.cat}
        </td>
      ` : '';

      return `
        <tr style="${rowBg} ${separatorStyle}">
          ${categoryCell}
          <td style="padding: 14px 12px; text-align: center; font-weight: 700; color: #00a2e8; white-space: nowrap;">${item.code}</td>
          <td style="padding: 14px 12px; text-align: center; color: #000000; font-weight: 500; white-space: nowrap;">${item.miktar}</td>
          <td style="padding: 14px 12px; text-align: center; color: #000000; font-weight: 500; white-space: nowrap;">${item.ebat}</td>
          <td style="padding: 14px 16px; text-align: center; color: #000000; font-weight: 500;">${item.desc}</td>
          <td style="padding: 14px 12px; text-align: center; font-weight: 900; color: #000000; white-space: nowrap;">${item.price}</td>
          <td style="padding: 14px 12px; text-align: center; white-space: nowrap;">
            <a href="https://wa.me/905366022373" style="display: inline-block; background-color: #00a2e8; color: #ffffff; padding: 10px 20px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 13px;">
              Hemen Sipariş Ver
            </a>
          </td>
        </tr>
      `;
    }).join('');
  }).join('');

  const galleryHtml = `
  <section class="mb-12" id="galeri">
    <h2 class="text-xl sm:text-2xl font-black text-gray-900 mb-6">Küp Bloknot Baskı Örnekleri ve Model Detayları</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      ${KUP_BLOKNOT_GALLERY.map(img => {
        const isAvail = Boolean((KUP_BLOKNOT_IMAGE_MANIFEST as Record<string, boolean>)[img.src]);
        const isPreloadHero = img.src.includes('kup-bloknot-baski-fiyatlari.webp');
        return `
        <figure class="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden p-3 flex flex-col justify-between">
          <div style="aspect-ratio: 4/3;" class="bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
            ${isAvail ? `
              <img src="${img.src}" alt="${img.title} - Mavi Basım" width="1536" height="1024" loading="${isPreloadHero ? 'eager' : 'lazy'}" ${isPreloadHero ? 'fetchpriority="high"' : ''} class="w-full h-full object-contain rounded-xl" />
            ` : `
              <div class="p-6 text-center">
                <span class="text-xs font-bold text-gray-500 uppercase tracking-wide">Ürün Görseli Hazırlanıyor</span>
                <span class="block text-[11px] text-gray-400 mt-1">${img.tag}</span>
              </div>
            `}
          </div>
          <figcaption class="mt-3 text-xs text-gray-700">
            <strong class="font-bold text-gray-900">${img.title}:</strong> ${img.desc}
          </figcaption>
        </figure>
        `;
      }).join('')}
    </div>
  </section>
  `;

  const faqHtml = KUP_BLOKNOT_FAQS.map(faq => `
    <div class="border border-gray-200 rounded-2xl p-5 bg-white mb-4">
      <h3 class="text-base font-bold text-gray-900 mb-2">${faq.q}</h3>
      <p class="text-sm text-gray-600 leading-relaxed">${faq.a}</p>
    </div>
  `).join('');

  return `
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-800 font-sans">
  <nav class="mb-6 text-xs text-gray-500" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2">
      <li><a href="/" class="hover:underline text-gray-700">Ana Sayfa</a></li>
      <li><span class="mx-1">/</span></li>
      <li><a href="/matbaa" class="hover:underline text-gray-700">Matbaa Ürünleri</a></li>
      <li><span class="mx-1">/</span></li>
      <li class="font-bold text-gray-900" aria-current="page">Küp Bloknot Baskı</li>
    </ol>
  </nav>

  <header class="mb-10 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200 shadow-sm">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
      <div class="lg:col-span-7 space-y-4">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
          Kurumsal Masaüstü Promosyon Çözümü
        </span>
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-950 tracking-tight leading-tight">
          ${KUP_BLOKNOT_SEO_METADATA.h1}
        </h1>
        <div class="text-gray-700 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
          <p>
            <strong>Küp bloknot</strong>; ofis çalışanlarının, yöneticilerin ve müşterilerin çalışma masalarında gün boyu aktif olarak kullanılan, hem pratik not alma ihtiyacını karşılayan hem de güçlü bir kurumsal kimlik temsili sunan masaüstü matbaa ürünlerinden biridir. Özel kesimli dış karton kutusu ve kutu içerisinden tek tek kolayca çekilerek kullanılan yapışkansız iç kağıtlarıyla masalarda düzenli ve şık bir görünüm oluşturur.
          </p>
          <p>
            Geleneksel tanıtım broşürleri veya tek seferlik el ilanları kısa sürede elden çıkabilirken, <strong>baskılı küp bloknot</strong> çeşitleri aylarca masanın üzerinde kalır. Telefon görüşmesi yaparken, müşteriyle toplantı halindeyken veya günlük planlama sırasında alınan her notta logonuz, web adresiniz ve telefon bilgileriniz göz önünde bulunur.
          </p>
          <p class="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-gray-700 text-xs sm:text-sm">
            <strong class="text-gray-900">Yerel Hizmet Noktası:</strong> İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktamızla Türkiye geneline matbaa çözümleri sunuyoruz. Kurumsal firmalar, ajanslar ve perakende işletmeler için avantajlı fiyat ve planlı sevkiyat olanakları sağlıyoruz.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-3 pt-2">
          <a href="#fiyat-listesi" style="display: inline-block; background-color: #00a2e8; color: #ffffff; padding: 10px 20px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 13px;">
            Fiyat Listesini İncele
          </a>
          <a href="https://wa.me/905366022373?text=K%C3%BCp%20bloknot%20bask%C4%B1%20fiyat%20teklifi%20almak%20istiyorum" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 10px 20px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 13px;">
            WhatsApp Teklifi Al
          </a>
        </div>
      </div>

      <div class="lg:col-span-5 bg-gray-50 rounded-2xl p-5 sm:p-6 border border-gray-200 space-y-4">
        <div class="relative aspect-[4/3] rounded-xl overflow-hidden bg-white border border-gray-200">
          <img src="/images/kup-bloknot/kutulu-kup-bloknot-baski.webp" alt="Kutulu Küp Bloknot Baskı ve Tasarım Modelleri - Mavi Basım" width="1536" height="1024" loading="eager" class="w-full h-full object-contain p-2" />
        </div>
        <div class="space-y-2">
          <div class="text-xs font-bold uppercase tracking-wider text-gray-900">Öne Çıkan Üretim Standartları</div>
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="bg-white p-3 rounded-xl border border-gray-200">
              <span class="text-gray-500 text-[11px] block">Dış Kutu</span>
              <strong class="text-gray-900 font-bold block">350 gr Bristol</strong>
              <span class="text-[10px] text-gray-500">Selefon korumalı</span>
            </div>
            <div class="bg-white p-3 rounded-xl border border-gray-200">
              <span class="text-gray-500 text-[11px] block">İç Kağıt</span>
              <strong class="text-gray-900 font-bold block">80 gr 1. Hamur</strong>
              <span class="text-[10px] text-gray-500">Yapışkansız yaprak</span>
            </div>
            <div class="bg-white p-3 rounded-xl border border-gray-200">
              <span class="text-gray-500 text-[11px] block">Sayfa Sayısı</span>
              <strong class="text-gray-900 font-bold block">250 veya 500</strong>
              <span class="text-[10px] text-gray-500">Yaprak seçeneği</span>
            </div>
            <div class="bg-white p-3 rounded-xl border border-gray-200">
              <span class="text-gray-500 text-[11px] block">Min. Sipariş</span>
              <strong class="text-gray-900 font-bold block">100 Adet</strong>
              <span class="text-[10px] text-gray-500">Ekonomik paket</span>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl p-3 border border-gray-200 text-xs text-gray-600">
          Baskı öncesi grafik ve PDF prova kontrolü ücretsizdir. Dijital onayınız alınmadan baskı aşamasına geçilmez.
        </div>
      </div>
    </div>
  </header>

  <section class="mb-12" id="fiyat-listesi">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
      <span style="width: 6px; height: 24px; background-color: #00a2e8; border-radius: 2px; display: inline-block;"></span>
      <h2 style="font-size: 24px; font-weight: 900; color: #000000; text-transform: uppercase; margin: 0;">
        KÜP BLOKNOT FİYAT LİSTESİ
      </h2>
    </div>
    <p style="font-size: 14px; color: #1e293b; font-weight: 500; margin-bottom: 24px;">
      Aşağıdaki fiyat listesinden dilediğiniz adet ve kutu ebatlarına göre küp bloknot siparişinizi oluşturabilirsiniz. Baskı öncesi grafik kontrolü ücretsiz olup onayınız sonrası üretime başlanır.
    </p>
    <div class="overflow-x-auto border border-gray-200 rounded-xl bg-white shadow-sm mb-6">
      <table class="w-full text-left text-xs sm:text-sm" style="border-collapse: collapse;">
        <thead>
          <tr style="background-color: #000000; color: #ffffff;">
            <th style="padding: 14px 12px; width: 48px;"></th>
            <th style="padding: 14px 12px; font-weight: 900; text-transform: uppercase; text-align: center;">KOD</th>
            <th style="padding: 14px 12px; font-weight: 900; text-transform: uppercase; text-align: center;">ADET</th>
            <th style="padding: 14px 12px; font-weight: 900; text-transform: uppercase; text-align: center;">EBAT</th>
            <th style="padding: 14px 16px; font-weight: 900; text-transform: uppercase; text-align: center;">ÖZELLİKLER</th>
            <th style="padding: 14px 12px; font-weight: 900; text-transform: uppercase; text-align: center;">FİYAT</th>
            <th style="padding: 14px 12px; font-weight: 900; text-transform: uppercase; text-align: center;">SİPARİŞ</th>
          </tr>
        </thead>
        <tbody>
          ${tableRowsHtml}
        </tbody>
      </table>
    </div>
    <div style="background-color: #f8fafc; padding: 12px 16px; border: 1px solid #e2e8f0; border-radius: 8px; display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: #64748b; font-weight: 500; margin-bottom: 16px;">
      <span>* Fiyatlarımıza %20 KDV dahil değildir. İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktası üzerinden sevk edilir.</span>
      <span style="font-weight: 600; color: #334155;">Minimum sipariş adedi 100 adettir.</span>
    </div>
    <p class="text-xs text-gray-500 italic">
      * Standart fiyat listesinde 100, 250 ve 500 adet seçenekleri bulunur; 250 yapraklı modelde 1.000 adet fiyatı listelenmiştir. 500 yapraklı modelde 1.000 adet ve üzeri siparişler için özel teklif hazırlanır.
    </p>
  </section>

  <section class="mb-12" id="urun-ozellikleri">
    <h2 class="text-xl sm:text-2xl font-black text-gray-900 mb-4">Teknik Özellikler ve Baskı Standartları</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
      <div class="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <h3 class="font-bold text-gray-900 mb-2 text-base">Dış Kutu Özellikleri</h3>
        <ul class="space-y-2 list-disc list-inside text-gray-600">
          <li><strong>Malzeme:</strong> 350 gr Amerikan Bristol karton</li>
          <li><strong>Baskı:</strong> 4 Renk CMYK ofset baskı</li>
          <li><strong>Yüzey Koruma:</strong> Mat veya parlak selefon kaplama</li>
          <li><strong>Yapı:</strong> Katlamalı, dayanıklı kilitli taban yapısı</li>
        </ul>
      </div>
      <div class="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <h3 class="font-bold text-gray-900 mb-2 text-base">İç Not Kağıdı Özellikleri</h3>
        <ul class="space-y-2 list-disc list-inside text-gray-600">
          <li><strong>Kağıt Türü:</strong> 80 gr 1. Hamur beyaz kağıt</li>
          <li><strong>Ebat:</strong> 78 × 78 mm kare kesim</li>
          <li><strong>Baskı:</strong> Standart tek renk ofset baskı (farklı renkler özel teklif kapsamındadır)</li>
          <li><strong>Yaprak Türü:</strong> Yapışkansız, serbest çekilebilen yapraklar</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="mb-12" id="tasarim-ve-prova">
    <h2 class="text-xl sm:text-2xl font-black text-gray-900 mb-4">Tasarım Dosyası Hazırlama ve Dijital Prova Süreci</h2>
    <p class="text-sm text-gray-700 leading-relaxed mb-4">
      Baskıya uygun dosyanın teknik kontrolü ve dijital PDF prova süreci tamamen ücretsizdir.
      Tasarımlarınızın baskı kalitesi için vektörel formatta (PDF, AI, CDR), 300 DPI ve CMYK renk modunda hazırlanması önerilir.
      İç yapraklarda not almayı engellememek adına filigran ve zemin logolarının açık tonlarda (%10-15 opaklık) tutulması tavsiye edilir.
    </p>
    <p class="text-sm text-gray-700 leading-relaxed">
      Hazır tasarımınız bulunmuyorsa grafik ekibimiz WhatsApp üzerinden kapsam ve ücretlendirme konusunda size destek olmaktadır.
      Müşteri dijital PDF onayı vermeden üretim süreci başlatılmaz.
    </p>
  </section>

  ${galleryHtml}

  <section class="mb-12" id="sikca-sorulan-sorular">
    <h2 class="text-xl sm:text-2xl font-black text-gray-900 mb-6">Sıkça Sorulan Sorular</h2>
    <div class="space-y-4">
      ${faqHtml}
    </div>
  </section>

  <section class="pt-8 border-t border-gray-200 text-xs text-gray-600">
    <h3 class="font-bold text-gray-900 uppercase mb-3">İlgili Kurumsal Matbaa Ürünleri</h3>
    <div class="flex flex-wrap gap-3">
      <a href="/matbaa" class="hover:text-blue-600 underline">Tüm Matbaa Ürünleri</a>
      <a href="/bloknotlar" class="hover:text-blue-600 underline">Bloknot Çeşitleri</a>
      <a href="/antetli" class="hover:text-blue-600 underline">Antetli Kağıt Baskı</a>
      <a href="/dosyalar" class="hover:text-blue-600 underline">Cepli Dosya Baskı</a>
      <a href="/kartvizit" class="hover:text-blue-600 underline">Kartvizit Baskı</a>
      <a href="/zarf" class="hover:text-blue-600 underline">Kurumsal Zarf Baskı</a>
      <a href="/karton-canta" class="hover:text-blue-600 underline">Karton Çanta Baskı</a>
    </div>
  </section>
</div>
`;
}

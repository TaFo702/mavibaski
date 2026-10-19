import { AFIS_DATA } from './productData';

export const AFIS_SSS = [
  {
    q: "Afiş baskı fiyatları ve afiş bastırma fiyatları nasıl hesaplanır?",
    a: "Afiş baskı fiyatları ve afiş bastırma fiyatları; tercih edilen baskı ebadı (34×49 cm / 35×50 cm veya 49×69 cm / 50×70 cm), kâğıt gramajı (105 gr, 135 gr veya 170 gr kuşe ile 120 gr Blueback), sipariş adedi ve selefon gibi ek işlemlere göre hesaplanır."
  },
  {
    q: "35x50 cm ve 50x70 cm afiş ölçüleri ile net kesim ebatları nelerdir?",
    a: "Matbaacılık tabaka kesim standartlarında 35×50 cm afiş için satın alınabilir net kesim ölçüsü 34×49 cm; 50×70 cm afiş için satın alınabilir net kesim ölçüsü 49×69 cm olarak uygulanmaktadır. 70×100 cm büyük boy afiş taleplerinde net kesim ölçüsü teknik uygunluğa göre teklif aşamasında teyit edilir."
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

const jsonLdBreadcrumb = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  "@id": "https://mavibasim.com/afis#breadcrumb",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://mavibasim.com/" },
    { "@type": "ListItem", "position": 2, "name": "Matbaa Ürünleri", "item": "https://mavibasim.com/matbaa" },
    { "@type": "ListItem", "position": 3, "name": "Afiş Baskı Fiyatları", "item": "https://mavibasim.com/afis" }
  ]
};

// Made-to-order print service. Read each existing tariff entry without modifying it.
const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://mavibasim.com/afis#service",
  "url": "https://mavibasim.com/afis",
  "name": "Afiş Baskı Hizmeti",
  "serviceType": "Siparişe özel afiş baskısı",
  "image": "https://mavibasim.com/images/afis/afis-baski-fiyatlari.webp",
  "description": "35x50 ve 50x70 sınıflarında 105 gr kuşe tek yön renkli afiş baskı tarifesi. Farklı ebat, gramaj ve adetler için teknik uygunluğa göre özel teklif.",
  "provider": {
    "@type": "Organization",
    "@id": "https://mavibasim.com/#organization",
    "name": "Mavi Basım Matbaa & Reklam",
    "url": "https://mavibasim.com"
  },
  "areaServed": { "@type": "Country", "name": "Türkiye" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Afiş Baskı Tarifesi",
    "itemListElement": AFIS_DATA.flatMap(group => group.items).map(item => {
      const price = item.price.replace(/\./g, '').replace(/[^0-9,]/g, '').replace(',', '.');
      return {
        "@type": "Offer",
        "@id": `https://mavibasim.com/afis#teklif-${item.code}`,
        "name": `${item.code} — ${item.miktar}`,
        "url": "https://mavibasim.com/afis",
        "price": price,
        "priceCurrency": "TRY",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": price,
          "priceCurrency": "TRY",
          "valueAddedTaxIncluded": false
        },
        "itemOffered": {
          "@type": "Service",
          "name": `${item.ebat} ${item.desc} — ${item.miktar} afiş baskısı`
        }
      };
    })
  }
};

const jsonLdFAQ = {
  "@context": "https://schema.org", "@type": "FAQPage",
  "@id": "https://mavibasim.com/afis#faq",
  "mainEntity": AFIS_SSS.map(f => ({
    "@type": "Question", "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }))
};
export const AFIS_SCHEMAS = { jsonLdBreadcrumb, jsonLdService, jsonLdFAQ };

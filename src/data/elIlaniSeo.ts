import { EL_ILANI_DATA } from './productData';

export const EL_ILANI_FAQS = [
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

const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://mavibasim.com/el-ilani#breadcrumb",
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
        "name": "El İlanı Baskı Fiyatları",
        "item": "https://mavibasim.com/el-ilani"
      }
    ]
  };

// Made-to-order print service. Read each existing tariff entry without modifying it.
const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://mavibasim.com/el-ilani#service",
  "url": "https://mavibasim.com/el-ilani",
  "name": "El İlanı Baskı Hizmeti",
  "serviceType": "Siparişe özel el ilanı baskısı",
  "image": "https://mavibasim.com/images/el-ilani/el-ilani-baski-fiyatlari.webp",
  "description": "A3, A4, A5 ve dar ebat el ilanı baskısı. 105 gr kuşe tek yön renkli baskı tarifesi ile farklı gramaj, ölçü, baskı yönü ve adetler için özel teklif seçenekleri.",
  "provider": {
    "@type": "Organization",
    "@id": "https://mavibasim.com/#organization",
    "name": "Mavi Basım Matbaa & Reklam",
    "url": "https://mavibasim.com"
  },
  "areaServed": { "@type": "Country", "name": "Türkiye" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "El İlanı Baskı Tarifesi",
    "itemListElement": EL_ILANI_DATA.flatMap(group => group.items).map(item => {
      const price = item.price.replace(/\./g, '').replace(/[^0-9,]/g, '').replace(',', '.');
      return {
        "@type": "Offer",
        "@id": `https://mavibasim.com/el-ilani#teklif-${item.code}`,
        "name": `${item.code} — ${item.miktar}`,
        "url": "https://mavibasim.com/el-ilani",
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
          "name": `${item.ebat} ${item.desc} — ${item.miktar} el ilanı baskısı`
        }
      };
    })
  }
};

const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://mavibasim.com/el-ilani#faq",
    "mainEntity": EL_ILANI_FAQS.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

export const EL_ILANI_SCHEMAS = { jsonLdBreadcrumb, jsonLdService, jsonLdFAQ };

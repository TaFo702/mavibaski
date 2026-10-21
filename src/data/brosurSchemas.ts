import { BROSUR_FAQS } from './brosurFaqs';
import { BROSUR_DATA } from './extraProductData';

// Same entities for initial HTML and browser metadata.
const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://mavibasim.com/brosur#breadcrumb",
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

// This page describes made-to-order printing with different sizes, paper and runs.
// Read the protected tariff without mutating it or asserting stock/expiry dates.
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://mavibasim.com/brosur#service",
  "url": "https://mavibasim.com/brosur",
  "name": "Broşür Baskı Hizmeti",
  "serviceType": "Siparişe özel broşür baskısı",
  "image": "https://mavibasim.com/images/brosur/tanitim-brosuru-ornegi.webp",
  "description": "115 gr, 130 gr ve 200 gr kuşe kâğıda çift yön renkli A4, A5, A3 ve özel ebat broşür baskı seçenekleri. Kırım ve katlama opsiyonel olarak tekliflendirilir.",
  "provider": { "@id": "https://mavibasim.com/#organization" },
  "areaServed": { "@type": "Country", "name": "Türkiye" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Broşür Baskı Tarifesi",
    "itemListElement": BROSUR_DATA.flatMap(group => group.items).map(item => {
      const price = item.price.replace(/\./g, '').replace(/[^0-9,]/g, '').replace(',', '.');
      return {
        "@type": "Offer",
        "@id": `https://mavibasim.com/brosur#teklif-${item.code}`,
        "name": `${item.code} — ${item.miktar}`,
        "url": "https://mavibasim.com/brosur#fiyat-listesi",
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
          "name": `${item.ebat} ${item.desc} — ${item.miktar} broşür baskısı`,
          "provider": { "@id": "https://mavibasim.com/#organization" }
        }
      };
    })
  }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://mavibasim.com/brosur#faq",
    "mainEntity": BROSUR_FAQS.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://mavibasim.com/#organization",
    "name": "Mavi Basım Matbaa & Reklam",
    "url": "https://mavibasim.com",
    "logo": "https://mavibasim.com/mavilogo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Maltepe Mahallesi, Davutpaşa Caddesi, Topkapı 2. Matbaacılar Sitesi, B Blok No: 2NB",
      "addressLocality": "Zeytinburnu",
      "addressRegion": "İstanbul",
      "postalCode": "34010",
      "addressCountry": "TR"
    }
  };

export const BROSUR_SCHEMAS = { breadcrumbSchema, serviceSchema, faqSchema, organizationSchema };

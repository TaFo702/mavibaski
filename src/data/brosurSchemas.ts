import { BROSUR_FAQS } from './brosurFaqs';

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

const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": "https://mavibasim.com/brosur#product",
    "image": "https://mavibasim.com/images/brosur/brosur-baski-fiyatlari.webp",
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
    "logo": "https://mavibasim.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Litros Yolu 2. Matbaacılar Sitesi Topkapı",
      "addressLocality": "Zeytinburnu",
      "addressRegion": "İstanbul",
      "postalCode": "34010",
      "addressCountry": "TR"
    }
  };

export const BROSUR_SCHEMAS = { breadcrumbSchema, productSchema, faqSchema, organizationSchema };

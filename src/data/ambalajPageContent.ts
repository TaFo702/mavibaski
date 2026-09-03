export interface AmbalajFaqItem {
  q: string;
  a: string;
}

export interface AmbalajProductItem {
  code: string;
  name: string;
  gramaj: string;
  standardPackage: string;
  price: string;
  image: string;
  imgAlt: string;
  desc: string;
  features: string[];
}

export interface AmbalajTechSpec {
  kagitTuru: string;
  gramaj: string;
  standartEbat: string;
  kullanimAlani: string;
  baskiTuru: string;
  gidaOzelligi: string;
}

export interface AmbalajPriceFactor {
  id: string;
  num: number;
  title: string;
  desc: string;
}

export interface AmbalajRelatedProduct {
  title: string;
  path: string;
  desc: string;
}

export interface AmbalajBlogGuide {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
}

export const AMBALAJ_SEO_METADATA = {
  title: "Ambalaj Kağıdı Baskısı | Pelür ve Sülfit Kağıt | Mavi Basım",
  desc: "Baskılı ambalaj kağıdı; 70 gr sülfit, 135 gr kuşe ve 30 gr pelür seçenekleriyle hazırlanır. Ölçü, adet veya kilogram bilgisine göre teklif alın.",
  ogDescription: "Baskılı ambalaj kağıdı; 70 gr sülfit, 135 gr kuşe ve 30 gr pelür seçenekleriyle hazırlanır. Ölçü, adet veya kilogram bilgisine göre teklif alın.",
  canonical: "https://mavibasim.com/ambalaj",
  h1: "Ambalaj Kâğıdı Baskısı ve Özel Sarım Çözümleri",
  ogImage: "https://mavibasim.com/images/ambalaj/ambalaj-baski-cozumleri.webp"
};

export const AMBALAJ_PRODUCTS: AmbalajProductItem[] = [
  {
    code: "AMB1",
    name: "70 gr Sülfit Ambalaj Kâğıdı",
    gramaj: "70 gr/m²",
    standardPackage: "100 kg Paket",
    price: "Fiyat Alınız",
    image: "/images/ambalaj/baskili-ambalaj-kagidi.webp",
    imgAlt: "70 gr sülfit baskılı ambalaj kağıdı ve paket servis sarımı",
    desc: "70 gr sülfit kâğıt; paket servis, fırın ve ürün sarımı gibi uygulamalarda değerlendirilebilir. Standart sülfit kâğıt kendiliğinden yağ geçirmez değildir. Doğrudan gıda temasının bulunduğu işlerde kâğıt, mürekkep ve varsa kaplama seçimi; kullanım koşulları ile tedarikçi belgelerine göre yapılmalıdır.",
    features: [
      "70 gr sarım kâğıdı seçeneği",
      "Tek renk veya kurumsal logo baskısı",
      "Paket servis, fırın ve ürün sarımı kullanımı",
      "100 kg ve üzeri sipariş imkânı"
    ]
  },
  {
    code: "AMB2",
    name: "135 gr Kuşe Ambalaj Kâğıdı",
    gramaj: "135 gr/m²",
    standardPackage: "1.000 Adet (70x100 cm)",
    price: "Fiyat Alınız",
    image: "/images/ambalaj/kuse-ambalaj-baski.webp",
    imgAlt: "135 gr kuşe ambalaj kağıdı 70x100 cm hediye ve lüks sarım",
    desc: "Pürüzsüz kuşe yüzeyi ve beyazlık derecesiyle ofset baskı seçenekleri sunar. Büyük ebatlı hediye paketleme ve görsel ağırlıklı kurumsal sunumlar için değerlendirilebilir. Sarım esnekliğini koruması için kaplamasız ofset baskı tercih edilir.",
    features: [
      "70 x 100 cm geniş tabaka ebadı",
      "4 renk CMYK ofset baskı seçeneği",
      "Hediye paketleme ve butik kurumsal sarım",
      "1.000 adet standart sipariş seçeneği"
    ]
  },
  {
    code: "AMB3",
    name: "30 gr Pelür Kâğıdı Baskısı",
    gramaj: "30 gr/m²",
    standardPackage: "1.000 Adet (35x50 cm)",
    price: "Fiyat Alınız",
    image: "",
    imgAlt: "30 gr pelür kağıdı baskısı 35x50 cm butik ve tekstil sarımı",
    desc: "Pelür kâğıdı daha çok tekstil, ayakkabı, butik, hediyelik ürün ve kutu içi sarım uygulamalarında değerlendirilebilir. 30 gr hafif ve yarı saydam dokusuyla kutu içi ambalajlarda esnek bir sarım seçeneği sunabilir.",
    features: [
      "35 x 50 cm ebat, 30 gr hafif doku",
      "Tek renk veya kurumsal logo/desen tekrarı",
      "Tekstil, butik ve e-ticaret kutu içi sarımı",
      "1.000 adet standart sipariş seçeneği"
    ]
  }
];

export const AMBALAJ_TECH_SPECS: AmbalajTechSpec[] = [
  {
    kagitTuru: "Sülfit Kâğıt",
    gramaj: "70 gr/m²",
    standartEbat: "Rulo / Özel Ebat Kesim",
    kullanimAlani: "Restoran, Fırın, Unlu Mamul, Paket Servis",
    baskiTuru: "Ofset Tek Renk / Çok Renk",
    gidaOzelligi: "Kullanım koşulları ve tedarikçi belgelerine göre değerlendirilir; standart ürün kendiliğinden yağ geçirmez değildir."
  },
  {
    kagitTuru: "Kuşe Kâğıt",
    gramaj: "135 gr/m²",
    standartEbat: "70 x 100 cm Tabaka",
    kullanimAlani: "Hediye Paketi, Kurumsal Ürün Sarımı",
    baskiTuru: "4 Renk CMYK Ofset",
    gidaOzelligi: "Dekoratif sarım (Esneklik için selefonsuz)"
  },
  {
    kagitTuru: "Pelür Kâğıdı",
    gramaj: "30 gr/m²",
    standartEbat: "35 x 50 cm Tabaka",
    kullanimAlani: "Tekstil, Butik, Ayakkabı, Hediyelik Ürün, Kutu İçi",
    baskiTuru: "Tek Renk / Kurumsal Desen Tekrarı",
    gidaOzelligi: "Tekstil, ayakkabı, butik ve kutu içi sarım"
  }
];

export const AMBALAJ_PRICE_FACTORS: AmbalajPriceFactor[] = [
  {
    id: "fiyat-olcu",
    num: 1,
    title: "Ölçü ve Kesim Şekli",
    desc: "Kâğıdın tabaka ebadı (örneğin 70x100 cm, 35x50 cm) veya rulodan kesim ölçüsü, ofset baskı makinelerindeki tabaka yerleşimini ve kâğıt firesini doğrudan etkiler."
  },
  {
    id: "fiyat-tiraj",
    num: 2,
    title: "Sipariş Miktarı (Tiraj)",
    desc: "Ofset baskı kalıp, makine ayarı ve kâğıt hazırlık maliyetleri sabit olduğundan, sipariş miktarı arttığında birim maliyet bazı projelerde düşebilir."
  },
  {
    id: "fiyat-kagit",
    num: 3,
    title: "Kâğıt Türü ve Gramaj",
    desc: "70 gr sülfit, 135 gr kuşe veya 30 gr pelür kâğıdın hammadde maliyetleri farklıdır. Gramaj ve kâğıdın lif kalitesi nihai fiyatlandırmayı şekillendirir."
  },
  {
    id: "fiyat-renk",
    num: 4,
    title: "Baskı Renk Sayısı (Tek Renk, CMYK, Pantone)",
    desc: "Tek renk logo baskısı en ekonomik seçenek iken, 4 renk CMYK ofset veya kurumsal kimliğe özel Pantone spot renkler ayrı kalıp ve baskı aşamaları gerektirir."
  },
  {
    id: "fiyat-sonlandirma",
    num: 5,
    title: "Sonlandırma ve Ebatlama",
    desc: "Standart tabaka giyotin kesimi haricinde özel ebat kesimi, perfore veya özel sarım katlama talepleri sonlandırma maliyetine yansır."
  },
  {
    id: "fiyat-ozel-ebat",
    num: 6,
    title: "Özel Ebat ve Tiraj Talepleri",
    desc: "Standart seçeneklerin dışındaki özel ölçü, bobin sarım veya yüksek miktarlı ambalaj kâğıdı talepleri için teknik özelliklere göre proje özelinde teklif hazırlanır."
  }
];

export const AMBALAJ_FILE_PREP_STEPS = [
  {
    num: "01",
    title: "İhtiyaç ve Kâğıt Türü Seçimi",
    desc: "Sarılacak ürünün türüne göre 70 gr sülfit, 135 gr kuşe veya 30 gr pelür kâğıt cinsi ve ebat belirlenir."
  },
  {
    num: "02",
    title: "Vektörel Çizim & Font Kontrolü",
    desc: "Logo ve tasarımların vektörel formatta (AI, PDF, EPS) hazırlanması ve yazıların eğriye (convert/outline) dönüştürülmesi gerekir."
  },
  {
    num: "03",
    title: "CMYK ve Pantone Renk Düzeni",
    desc: "Renk modunun CMYK veya Pantone kodlarıyla düzenlenmesi baskı renk referansının iletilmesine yardımcı olur; fiziksel sonucu birebir garanti etmez."
  },
  {
    num: "04",
    title: "300 DPI Çözünürlük ve 3 mm Taşma Payı",
    desc: "Görsellerin netliği için 300 DPI çözünürlük sağlanmalı ve giyotin kesim toleransı için en az 3 mm taşma payı (bleed) verilmelidir."
  },
  {
    num: "05",
    title: "Dijital PDF Prova İncelemesi ve Onay",
    desc: "Teknik kontrolleri tamamlanan dosyanın dijital PDF provası iletilir. Dijital PDF prova; metin, ölçü, taşma payı ve yerleşimin ekran üzerinden kontrol edilmesini sağlar. Fiziksel baskı rengini, kâğıt dokusunu veya nihai ürünü birebir garanti etmez. Baskıya hazır dosyanın teknik kontrolü ile sıfırdan grafik tasarım farklı hizmetlerdir. Sıfırdan tasarım ve kapsamlı revizyonlar ayrıca fiyatlandırılabilir. Baskı süreci, dijital PDF prova ve müşteri onay aşamasından sonra planlanır."
  },
  {
    num: "06",
    title: "Topkapı Koordinasyonu ve Kargo Teslimatı",
    desc: "İstanbul Topkapı 2. Matbaacılar Sitesi hizmet noktamız üzerinden koordine edilen siparişler anlaşmalı kargo ile Türkiye geneline sevk edilir."
  }
];

export const AMBALAJ_CONSIDERATIONS = [
  {
    id: "dikkat-gida",
    title: "Gıda ile Temas Koşulları",
    desc: "70 gr sülfit kâğıt; paket servis, fırın ve ürün sarımı gibi uygulamalarda değerlendirilebilir. Standart sülfit kâğıt kendiliğinden yağ geçirmez değildir. Doğrudan gıda temasının bulunduğu işlerde kâğıt, mürekkep ve varsa kaplama seçimi; kullanım koşulları ile tedarikçi belgelerine göre yapılmalıdır. Pelür kâğıdı ise daha çok tekstil, ayakkabı, butik, hediyelik ürün ve kutu içi sarım uygulamalarında değerlendirilebilir."
  },
  {
    id: "dikkat-renk",
    title: "Renk Doğruluğu ve Baskı Toleransı",
    desc: "Monitörlerdeki RGB renk uzayı ile kâğıt üzerine uygulanan ofset baskı mürekkepleri farklılık gösterir. Renk sonucu; kâğıt, mürekkep, baskı yöntemi ve ekran farklılıklarına göre değişebilir. Pantone kodu baskı renk referansının iletilmesine yardımcı olur; fiziksel sonucu birebir garanti etmez."
  },
  {
    id: "dikkat-sarim",
    title: "Sarım ve Paketleme Uyumu",
    desc: "135 gr kuşe kâğıt hediye paketi sarımlarında görsel baskı seçenekleri sunar; kâğıda selefon uygulanırsa sertleşerek sarım esnekliğini kaybedebilir. Bu nedenle hediye ambalaj kâğıtlarında kaplamasız ofset baskı tercih edilir. Pelür kâğıdı ise hafif ve esnek yapısıyla kutu içi sarım seçeneği sunabilir."
  },
  {
    id: "dikkat-kesim",
    title: "Ölçü ve Kesim Toleransları (3 mm Bleed)",
    desc: "Giyotin kesim sırasında kenarlarda beyaz boşluk kalmasını engellemek amacıyla tasarımın dört kenarına en az 3 mm kesim payı (taşma/bleed) eklenmelidir. Kritik metinler ve logolar kesim çizgisinden en az 5 mm içeride tutulmalıdır."
  }
];

export const AMBALAJ_RELATED_PRODUCTS: AmbalajRelatedProduct[] = [
  {
    title: "Karton Kutu Baskı",
    path: "/kutu",
    desc: "Özel kesim Bristol veya kroma karton ambalaj kutuları."
  },
  {
    title: "Karton Çanta Baskı",
    path: "/karton-canta",
    desc: "Mağaza ve teslimat paketlerinizi taşıyan dayanıklı ipli karton poşetler."
  },
  {
    title: "Yapışkanlı Etiket Baskı",
    path: "/etiket",
    desc: "Ambalaj kâğıdı sarımlarını sabitleyen ve marka logonuzu pekiştiren kuşe veya şeffaf etiketler."
  },
  {
    title: "Broşür Baskı",
    path: "/brosur",
    desc: "Paket içine ekleyeceğiniz tanıtım, ürün kullanım kılavuzu ve kampanya föyleri."
  },
  {
    title: "Kartvizit Baskı",
    path: "/kartvizit",
    desc: "Sipariş paketlerine eklenecek kurumsal teşekkür kartları ve iletişim kartvizitleri."
  }
];

export const AMBALAJ_FAQS: AmbalajFaqItem[] = [
  {
    q: "Ambalaj kâğıdı baskı fiyatları nasıl hesaplanır?",
    a: "Ambalaj kâğıdı baskı fiyatları; tercih edilen kâğıt cinsi ve gramajı (70 gr sülfit, 135 gr kuşe veya 30 gr pelür), tabaka veya rulo ebadı, baskıda uygulanacak renk sayısı (tek renk, 4 renk CMYK ofset veya Pantone spot renk), sipariş miktarı (kilogram veya adet) ve giyotin kesim/özel ebatlama gibi sonlandırma işlemlerine göre belirlenir. Sabit tek bir fiyat yerine projenizin teknik özelliklerine göre proje özelinde teklif hazırlanır."
  },
  {
    q: "Hangi ambalaj ve sarım kâğıdı türleri mevcuttur?",
    a: "Standart baskı seçeneklerimizde paket servis, fırın ve unlu mamul sarımları için 70 gr sülfit kâğıt (100 kg ve üzeri paketler); hediye paketi ve kurumsal sunumlar için 135 gr kuşe kâğıt (70x100 cm tabaka, 1.000 adet); tekstil, butik, ayakkabı ve kutu içi sarımlar için ise 30 gr pelür kâğıdı (35x50 cm, 1.000 adet) bulunmaktadır. İhtiyaca göre özel ölçü ve gramaj talepleri de tekliflendirilir."
  },
  {
    q: "Sülfit kâğıt ile pelür kâğıdı arasındaki fark nedir?",
    a: "70 gr sülfit kâğıt; paket servis, fırın ve ürün sarımı gibi uygulamalarda değerlendirilebilir. Pelür kâğıdı ise daha çok tekstil, ayakkabı, butik, hediyelik ürün ve kutu içi sarım uygulamalarında değerlendirilebilir; 30 gr hafif ve yarı saydam dokusuyla esnek bir sarım seçeneği sunar."
  },
  {
    q: "Standart 70 gr sülfit ambalaj kâğıdında gıda temas koşulları nelerdir?",
    a: "70 gr sülfit kâğıt; paket servis, fırın ve ürün sarımı gibi uygulamalarda değerlendirilebilir. Standart sülfit kâğıt kendiliğinden yağ geçirmez değildir. Doğrudan gıda temasının bulunduğu işlerde kâğıt, mürekkep ve varsa kaplama seçimi; kullanım koşulları ile tedarikçi belgelerine göre yapılmalıdır."
  },
  {
    q: "Ambalaj kâğıdında minimum sipariş miktarı nedir?",
    a: "Baskı kalıbı, ofset makine ayarı ve kâğıt kesim hazırlık maliyetleri nedeniyle 70 gr sülfit kâğıtta standart sipariş seçeneği genellikle 100 kg'dır. 135 gr kuşe kâğıt (70x100 cm) ve 30 gr pelür kâğıdında (35x50 cm) ise standart paketler 1.000 adet üzerinden sunulmaktadır. Proje bazlı özel ebat ve yüksek tirajlar için proje özelinde teklif sunulur."
  },
  {
    q: "Baskı öncesinde dijital PDF prova onayı veriliyor mu?",
    a: "Evet. İlettiğiniz tasarım dosyası teknik grafik kontrollerinden geçirildikten sonra dijital PDF prova hazırlanır. Dijital PDF prova; metin, ölçü, taşma payı ve yerleşimin ekran üzerinden kontrol edilmesini sağlar. Fiziksel baskı rengini, kâğıt dokusunu veya nihai ürünü birebir garanti etmez. Baskıya hazır dosyanın teknik kontrolü ile sıfırdan grafik tasarım farklı hizmetlerdir. Sıfırdan tasarım ve kapsamlı revizyonlar ayrıca fiyatlandırılabilir. Baskı süreci, dijital PDF prova ve müşteri onay aşamasından sonra planlanır."
  },
  {
    q: "Baskıya hazır tasarım dosyası nasıl hazırlanmalıdır?",
    a: "Tasarım dosyanızın en az 300 DPI çözünürlükte, CMYK renk modunda veya Pantone renk kodlarıyla hazırlanması gerekir. Kesim sırasında kenarlarda beyazlık kalmaması için en az 3 mm taşma payı (bleed) bırakılmalı, kritik yazılar kesim çizgisine en az 5 mm mesafede tutulmalı ve tüm metinler vektörel olarak eğriye (convert/outline) dönüştürülmüş PDF/X, AI veya EPS formatında iletilmelidir. Pantone kodu baskı renk referansının iletilmesine yardımcı olur; fiziksel sonucu garanti etmez."
  },
  {
    q: "İstanbul dışına gönderim yapılıyor mu?",
    a: "Evet. Siparişleriniz İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktamız üzerinden titizlikle planlanır. Baskı ve paketleme işlemleri tamamlanan ambalaj kâğıtları paketlenerek anlaşmalı kargo veya ambar firmalarıyla Türkiye'nin 81 iline sevk edilir."
  }
];

export const AMBALAJ_BLOG_GUIDES: AmbalajBlogGuide[] = [
  {
    slug: "baskiya-uygun-tasarim-nasil-hazirlanir",
    title: "Baskıya Uygun Tasarım Nasıl Hazırlanır? Matbaa İçin Eksiksiz Rehber",
    excerpt: "CMYK renk modu, taşma payı (bleed), 300 DPI çözünürlük, PDF/X formatı ve font convert işlemlerinin püf noktaları.",
    category: "Tasarım & Hazırlık",
    readTime: "9 Dk Okuma",
    image: "/images/hakkimizda/baskiya-uygun-tasarim-hazirlama-rehberi.webp"
  },
  {
    slug: "baski-kalitesini-etkileyen-faktorler",
    title: "Baskı Kalitesini Etkileyen Faktörler ve Teknik Detaylar",
    excerpt: "Çözünürlük, CMYK renk yönetimi, makine parkuru kalitesi ve mücellit sonlandırma işlemlerinin nihai baskıya etkileri.",
    category: "Baskı Teknolojileri",
    readTime: "6 Dk Okuma",
    image: "/images/hakkimizda/baski-kalitesini-etkileyen-faktorler-teknik-detaylar.webp"
  },
  {
    slug: "135-gr-ve-170-gr-kuse-farklari",
    title: "135 gr ile 170 gr Kuşe Arasındaki Farklar: Hangi Gramaj Nerede Kullanılır?",
    excerpt: "135 gr standart kuşe ile 170 gr tok kuşe kağıt arasındaki doku, katlama, parlaklık ve baskı uyumu karşılaştırması.",
    category: "Broşür & Reklam",
    readTime: "6 Dk Okuma",
    image: "/images/brosur/brosur-tasarimi-ve-baski.webp"
  }
];

export const AMBALAJ_SCHEMAS = {
  serviceSchema: {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Ambalaj Kağıdı Baskısı ve Baskılı Sarım Çözümleri",
    "serviceType": "Ambalaj Kağıdı Baskısı",
    "description": AMBALAJ_SEO_METADATA.desc,
    "provider": {
      "@type": "Organization",
      "@id": "https://mavibasim.com/#organization",
      "name": "Mavi Basım Matbaa & Reklam",
      "url": "https://mavibasim.com",
      "telephone": "+905366022373",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Maltepe Mah. Davutpaşa Cad. Topkapı 2. Matbaacılar Sitesi B Blok No:2NB",
        "addressLocality": "Zeytinburnu",
        "addressRegion": "İstanbul",
        "postalCode": "34010",
        "addressCountry": "TR"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "Türkiye"
    },
    "url": AMBALAJ_SEO_METADATA.canonical
  },
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
        "name": "Ambalaj Baskı",
        "item": "https://mavibasim.com/ambalaj"
      }
    ]
  },
  faqSchema: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": AMBALAJ_FAQS.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  }
};

export function generateAmbalajSSRBodyContent(): string {
  const meta = AMBALAJ_SEO_METADATA;

  const productsHtml = AMBALAJ_PRODUCTS.map(p => {
    const featureItems = p.features.map(f => `        <li>${f}</li>`).join("\n");
    return `    <article id="${p.code.toLowerCase()}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <ul>
${featureItems}
      </ul>
      <p><strong>Standart Paket:</strong> ${p.standardPackage} | <strong>Fiyat:</strong> ${p.price}</p>
    </article>`;
  }).join("\n\n");

  const tableRowsHtml = AMBALAJ_TECH_SPECS.map(spec => {
    return `        <tr>
          <td><strong>${spec.kagitTuru}</strong></td>
          <td>${spec.gramaj}</td>
          <td>${spec.standartEbat}</td>
          <td>${spec.kullanimAlani}</td>
          <td>${spec.baskiTuru}</td>
          <td>${spec.gidaOzelligi}</td>
        </tr>`;
  }).join("\n");

  const priceFactorsHtml = AMBALAJ_PRICE_FACTORS.map(factor => {
    return `    <article id="${factor.id}">
      <h3>${factor.num}. ${factor.title}</h3>
      <p>${factor.desc}</p>
    </article>`;
  }).join("\n");

  const fileStepsHtml = AMBALAJ_FILE_PREP_STEPS.map(step => {
    return `    <article>
      <h3>${step.num} - ${step.title}</h3>
      <p>${step.desc}</p>
    </article>`;
  }).join("\n");

  const considerationsHtml = AMBALAJ_CONSIDERATIONS.map(item => {
    return `    <article id="${item.id}">
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    </article>`;
  }).join("\n");

  const relatedProductsHtml = AMBALAJ_RELATED_PRODUCTS.map(prod => {
    return `      <li>
        <a href="${prod.path}"><strong>${prod.title}</strong></a>: ${prod.desc}
      </li>`;
  }).join("\n");

  const faqsHtml = AMBALAJ_FAQS.map((faq, index) => {
    return `    <article id="faq-${index + 1}">
      <h3>${faq.q}</h3>
      <p>${faq.a}</p>
    </article>`;
  }).join("\n");

  const blogGuidesHtml = AMBALAJ_BLOG_GUIDES.map(guide => {
    return `      <li>
        <a href="/blog/${guide.slug}"><strong>${guide.title}</strong></a> (${guide.category} - ${guide.readTime}) - ${guide.excerpt}
      </li>`;
  }).join("\n");

  return `<div class="bg-gray-50 border-b border-gray-100 py-3">
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
            <span class="text-gray-900 font-semibold" aria-current="page">Ambalaj Baskı</span>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</div>
<main class="seo-ambalaj-content max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
  <header class="mb-8">
    <h1 class="text-2xl md:text-3xl font-bold text-gray-900">${meta.h1}</h1>
    <p class="mt-2 text-sm md:text-base text-gray-700 leading-relaxed">${meta.desc}</p>
    <p class="mt-2 text-xs md:text-sm text-gray-600 leading-relaxed">
      Müşterilerinize sunduğunuz ürünlerin paketlenmesi ve sarımı, markanızın kurumsal algısını doğrudan şekillendiren ilk temas noktasıdır. Ambalaj kâğıdı baskısı, baskılı sarım kâğıdı, sülfit kâğıt, kuşe ambalaj kâğıdı ve butik pelür kâğıdı seçeneklerimiz; kurumsal kimliğinizi ve ürün sunumunuzu öne çıkarır. Ambalaj baskı seçenekleri; markaya özel baskılı ambalaj kâğıdı, paketleme kâğıdı ve farklı ürün sarım ihtiyaçlarına göre değerlendirilen kâğıt seçeneklerini kapsar.
    </p>
    <p class="mt-1 text-xs md:text-sm text-gray-600 leading-relaxed">
      Siparişleriniz, İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktamız üzerinden titizlikle planlanarak Türkiye geneline anlaşmalı kargo firmalarıyla sevk edilmektedir.
    </p>
    <div class="ambalaj-cta-box my-4">
      <a href="https://wa.me/905366022373?text=Merhaba%2C%20ambalaj%20ka%C4%9F%C4%B1d%C4%B1%20bask%C4%B1s%C4%B1%20hakk%C4%B1nda%20bilgi%20ve%20fiyat%20teklifi%20almak%20istiyorum." target="_blank" rel="nofollow noopener noreferrer" class="inline-flex items-center px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors">WhatsApp ile Ambalaj Kâğıdı Teklifi Al</a>
      <a href="tel:+905366022373" class="inline-flex items-center ml-3 px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-secondary transition-colors">0536 602 23 73</a>
    </div>
  </header>

  <section id="secenekler" class="mb-10">
    <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">Baskılı Ambalaj Kâğıdı Seçenekleri ve Malzemeler</h2>
    <p class="text-sm text-gray-600 mb-4">70 gr sülfit ambalaj kâğıdı, 135 gr kuşe ve 30 gr pelür sarım kâğıdı gibi farklı kullanım alanlarına uygun baskılı ambalaj kâğıdı seçenekleri sunulmaktadır.</p>
${productsHtml}

    <div class="mt-6">
      <h3>Standart Ambalaj Baskı Paketleri</h3>
      <table class="w-full text-left border-collapse text-xs md:text-sm my-3 border border-gray-200">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 border">KOD</th>
            <th class="p-2 border">ÜRÜN VE KÂĞIT ÖZELLİĞİ</th>
            <th class="p-2 border">STANDART MİKTAR</th>
            <th class="p-2 border">FİYAT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-2 border">AMB1</td>
            <td class="p-2 border">70 gr Sülfit Ambalaj Kâğıdı Baskı</td>
            <td class="p-2 border">100 kg</td>
            <td class="p-2 border">Fiyat Alınız</td>
          </tr>
          <tr>
            <td class="p-2 border">AMB2</td>
            <td class="p-2 border">135 gr Kuşe Ambalaj Kâğıdı (70x100 cm)</td>
            <td class="p-2 border">1.000 Adet</td>
            <td class="p-2 border">Fiyat Alınız</td>
          </tr>
          <tr>
            <td class="p-2 border">AMB3</td>
            <td class="p-2 border">30 gr Pelür Kâğıdı Baskısı (35x50 cm)</td>
            <td class="p-2 border">1.000 Adet</td>
            <td class="p-2 border">Fiyat Alınız</td>
          </tr>
        </tbody>
      </table>
      <p class="text-xs text-gray-500">* Belirtilen standart paketler haricinde firmanıza özel ölçü, bobin sarım ve gramaj talepleriniz için özel teklif hazırlanmaktadır.</p>
    </div>
  </section>

  <section id="malzeme-karsilastirmasi" class="mb-10">
    <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">Sülfit, Kuşe ve Pelür Kâğıt Karşılaştırması</h2>
    <p class="text-sm text-gray-600 mb-4">Ambalaj kâğıdında malzeme seçimi; sarılacak ürünün ağırlığına, nem/yağ durumuna ve kullanım alanına göre belirlenmelidir.</p>
    <h3>Kâğıt Türleri Teknik Özellikleri</h3>
    <table class="w-full text-left border-collapse text-xs md:text-sm my-3 border border-gray-200">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border">Kâğıt Türü</th>
          <th class="p-2 border">Gramaj</th>
          <th class="p-2 border">Standart Ebat</th>
          <th class="p-2 border">Öne Çıkan Kullanım Alanı</th>
          <th class="p-2 border">Baskı Türü</th>
          <th class="p-2 border">Kullanım &amp; Gıda Özelliği</th>
        </tr>
      </thead>
      <tbody>
${tableRowsHtml}
      </tbody>
    </table>
  </section>

  <section id="fiyat-unsurlari" class="mb-10">
    <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">Ambalaj Kâğıdı Baskı Fiyatlarını Belirleyen Unsurlar</h2>
    <p class="text-sm text-gray-600 mb-4">Ambalaj kâğıdı fiyatları ve ambalaj kâğıdı baskı fiyatları; ölçü, kâğıt türü, gramaj, renk sayısı, sipariş miktarı ve sonlandırma özelliklerine göre değişir.</p>
${priceFactorsHtml}
  </section>

  <section id="dosya-ve-prova" class="mb-10">
    <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">Baskıya Hazır Dosya Hazırlığı ve PDF Prova Onayı</h2>
    <p class="text-sm text-gray-600 mb-4">
      Tasarım dosyanız baskı öncesi teknik kontrollerden geçirilir. <strong>Baskıya hazır dosya kontrolü ve dijital PDF prova</strong> hizmetimiz kapsamında çözünürlük, renk modu (CMYK), 3 mm taşma payı ve font convert kontrolleri yapılır. Dijital PDF prova; metin, ölçü, taşma payı ve yerleşimin ekran üzerinden kontrol edilmesini sağlar. Fiziksel baskı rengini, kâğıt dokusunu veya nihai ürünü birebir garanti etmez. Baskıya hazır dosyanın teknik kontrolü ile sıfırdan grafik tasarım farklı hizmetlerdir. Sıfırdan tasarım ve kapsamlı revizyonlar ayrıca fiyatlandırılabilir. Baskı süreci, dijital PDF prova ve müşteri onay aşamasından sonra planlanır.
    </p>
${fileStepsHtml}
  </section>

  <section id="dikkat-edilecekler" class="mb-10">
    <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">Ambalaj Kâğıdı Kullanımında Dikkat Edilmesi Gerekenler</h2>
    <p class="text-sm text-gray-600 mb-4">Doğru ürün tercihi, renk uyumu ve kullanım amacına uygun teknik yönlendirmeler:</p>
${considerationsHtml}
  </section>

  <section id="ilgili-baski-urunleri" class="mb-10">
    <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">Ambalaj Kâğıdı Baskısını Tamamlayan İlgili Ürünler</h2>
    <p class="text-sm text-gray-600 mb-4">Ambalaj kâğıdı siparişlerinizle birlikte ürün sunumu ve kurumsal paketleme bütünlüğü sağlayan diğer matbaa baskı ürünlerimizi inceleyebilirsiniz:</p>
    <ul class="list-disc pl-5 text-xs md:text-sm text-gray-700 space-y-2">
${relatedProductsHtml}
    </ul>
  </section>

  <section id="ilgili-rehberler" class="mb-10">
    <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">Matbaa ve Baskı Hazırlık Rehberleri</h2>
    <p class="text-sm text-gray-600 mb-4">Baskıya uygun tasarım hazırlığı, renk yönetimi ve kâğıt seçimleri hakkında uzman teknik makalelerimiz:</p>
    <ul class="list-disc pl-5 text-xs md:text-sm text-gray-700 space-y-2">
${blogGuidesHtml}
    </ul>
  </section>

  <section id="sikca-sorulan-sorular" class="mb-10">
    <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">Sıkça Sorulan Sorular</h2>
    <p class="text-sm text-gray-600 mb-4">Ambalaj kâğıdı baskısı, kâğıt seçenekleri, minimum sipariş miktarı, PDF prova ve teslimat süreçleri hakkında merak edilenler:</p>
${faqsHtml}
  </section>
</main>`;
}

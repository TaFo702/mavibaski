export interface PriorityCitySector {
  title: string;
  description: string;
}

export interface PriorityCityProduct {
  name: string;
  slug: string;
  badge?: string;
  reason: string;
  categoryBadge?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface PriorityCityFaq {
  question: string;
  answer: string;
}

export interface PriorityCityContent {
  plateCode: number;
  name: string;
  slug: string; // e.g. 'mugla-matbaa'
  metaTitle: string; // 50-65 chars
  metaDescription: string; // 140-160 chars
  h1: string;
  heroText: string;
  intro: string;
  districtsIntro: string;
  districts: string[];
  sectors: PriorityCitySector[];
  featuredProducts: PriorityCityProduct[];
  shippingText: string;
  businessNeedsText: string;
  faq: PriorityCityFaq[];
  relatedCities?: string[];
  isPrioritySeoPage?: boolean;
}

export const PRIORITY_CITIES_CONTENT: Record<string, PriorityCityContent> = {
  "mugla-matbaa": {
    plateCode: 48,
    name: "Muğla",
    slug: "mugla-matbaa",
    metaTitle: "Muğla Matbaa | Menü, Amerikan Servis ve Etiket Baskı",
    metaDescription: "İstanbul Topkapı tesisimizden Muğla, Bodrum, Marmaris ve Fethiye otel, restoran ve marinalarına özel menü, amerikan servis, broşür ve etiket baskısı.",
    h1: "Muğla Matbaa ve Online Baskı Hizmetleri",
    heroText: "Muğla merkez ile Bodrum, Fethiye, Marmaris ve tüm turizm ilçelerine özel ofset ve dijital matbaa imalatı.",
    intro: "Muğla; Bodrum, Fethiye, Marmaris, Milas ve Datça gibi Türkiye'nin en değerli turizm ve gastronomi merkezlerine ev sahipliği yapmaktadır. Oteller, lüks restoranlar, marinalar, araç kiralama şirketleri ve yöresel zeytinyağı üreticileri için basılı materyaller işletme kalitesinin doğrudan göstergesidir. Mavi Basım olarak Muğla ve ilçelerindeki işletmelere, İstanbul Topkapı'daki modern tesislerimizde ürettiğimiz yüksek standartlı matbaa çözümlerini kargo ile doğrudan ulaştırıyoruz.",
    districtsIntro: "Muğla il genelinde yer alan tüm turizm ve ticaret merkezlerine düzenli korumalı sevkiyat sağlamaktayız:",
    districts: ["Bodrum", "Fethiye", "Marmaris", "Milas", "Ortaca", "Dalaman", "Datça", "Köyceğiz", "Ula", "Yatağan"],
    sectors: [
      {
        title: "Otel ve Konaklama Tesisleri",
        description: "Bodrum ve Marmaris resort otelleri için kapı askıları, oda bilgi kartları, karşılama broşürleri, antetli bloknotlar ve mini bar ürün etiketleri üretiyoruz."
      },
      {
        title: "Restoran, Kafe ve Beach Club'lar",
        description: "Sahil işletmeleri ve restoranlar için suya, yağa ve yırtılmaya dayanıklı Amerikan servisler, deri veya sıvama menüler ve paket servis broşürleri sağlıyoruz."
      },
      {
        title: "Marina, Yat ve Tekne İşletmeleri",
        description: "Gulet ve yat kiralama acenteleri için özel kesim tanıtım kataloğu, VIP davetiye ve deniz suyuna dayanıklı PP etiket imalatı yapıyoruz."
      },
      {
        title: "Araç Kiralama (Rent a Car)",
        description: "Dalaman ve Bodrum havalimanı kiralama ofisleri için oto-kopyalı numaratörlü teslimat sözleşmeleri ve araç içi oto paspas baskıları hazırlıyoruz."
      },
      {
        title: "Emlak ve Gayrimenkul Ofisleri",
        description: "Lüks konut ve arsa sunumları için cepli sunum dosyaları, yüksek gramajlı kartvizitler, afişler ve ilan broşürleri imal ediyoruz."
      },
      {
        title: "Yöresel Ürün ve Hediyelik Eşya",
        description: "Milas ve Yatağan zeytinyağı, çam balı ve yöresel sabun üreticileri için özel kesim cam şişe etiketleri ve ürün ambalaj kutuları sunuyoruz."
      }
    ],
    featuredProducts: [
      {
        name: "Amerikan Servis Baskı",
        slug: "/amerikan-servis",
        badge: "Kraft / Kuşe / Yırtılmaz PP",
        reason: "Restoran ve beach club'larda sunum hijyenini ve marka prestijini yükselten özel boy baskılı Amerikan servisler."
      },
      {
        name: "Broşür Baskı",
        slug: "/brosur",
        badge: "135gr / 170gr Katlamalı",
        reason: "Turizm acenteleri ve otel aktiviteleri için canlı renkli A5 ve Z-kırım tanıtım broşürleri."
      },
      {
        name: "Buzdolabı Magneti",
        slug: "/magnet",
        badge: "0.50mm Özel Bıçak Kesim",
        reason: "Restoran, paket servis ve lokantaların müşteri cüzdanında sürekli yer almasını sağlayan magnet reklamlar."
      },
      {
        name: "Şişe ve Ürün Etiketi",
        slug: "/etiket",
        badge: "PP Opak Su Geçirmez",
        reason: "Muğla zeytinyağı ve şarap ambalajlarında sudan ve yağdan etkilenmeyen yapışkanlı folyo etiketler."
      },
      {
        name: "Kartvizit Baskı",
        slug: "/kartvizit",
        badge: "350gr Kabartma Laklı",
        reason: "Turizm ve emlak yöneticileri için lüks dokulu, kabartma laklı ve fantezi kağıt kartvizit çözümleri."
      },
      {
        name: "Karton Çanta",
        slug: "/karton-canta",
        badge: "Lüks İpli & Bristol",
        reason: "Butik ve hediyelik eşya mağazaları için yüksek taşıma kapasiteli logo baskılı karton poşetler."
      },
      {
        name: "Ambalaj Kutusu",
        slug: "/kutu",
        badge: "Özel Bıçak Kesim Karton",
        reason: "Yöresel gıda ve lokum sunumlarına özel tasarlanmış koruyucu karton ambalaj kutuları."
      },
      {
        name: "Araç Kiralama Sözleşmesi",
        slug: "/arac-kiralama",
        badge: "Oto-Kopyalı Numaratörlü",
        reason: "Rent a car firmaları için resmi takipli, kendinden karbonlu araç teslim ve kiralama formları."
      },
      {
        name: "Adisyon ve Sipariş Fişi",
        slug: "/adisyon",
        badge: "Ciltli Koçan",
        reason: "Restoran ve kafe masalarında hızlı sipariş takibi sağlayan numaralandırılmış adisyon koçanları."
      }
    ],
    shippingText: "İstanbul Topkapı imalat tesislerimizde basılan siparişleriniz, darbelere ve basınca dayanıklı özel çift oluklu karton kolilerle ambalajlanır. Anlaşmalı kargo ve ambar hatlarımız üzerinden Muğla il merkezi ile Bodrum, Marmaris, Fethiye ve tüm ilçelerdeki adresinize güvenle ulaştırılır.",
    businessNeedsText: "Aracısız doğrudan fabrika imalatı sayesinde Muğla'daki turizm ve ticaret işletmelerinin matbaa bütçelerine %30 ila %40 oranında maliyet avantajı kazandırıyoruz. Baskı öncesinde grafik ekibimiz WhatsApp üzerinden ücretsiz PDF prova ile renk ve kesim onayınızı alır.",
    faq: [
      {
        question: "Muğla ve ilçelerine matbaa siparişlerinin kargo teslimat süresi nedir?",
        answer: "Üretim süreci tamamlanan ürünler, Muğla il merkezi ve Bodrum, Fethiye, Marmaris gibi ilçelere kargo yoğunluğuna ve ürün türüne bağlı olarak ortalama 24-48 saat içerisinde teslim edilmektedir."
      },
      {
        question: "Baskı öncesinde dijital prova veya grafik kontrolü yapılıyor mu?",
        answer: "Evet. Tasarım dosyanız teknik ekibimizce taşma payı ve CMYK renk modları açısından incelenir, ardından WhatsApp üzerinden onayınız için ücretsiz PDF prova iletilir."
      },
      {
        question: "Muğla'da fiziksel şubeniz veya üretim tesisiniz var mı?",
        answer: "Hayır, Mavi Basım ürünleri İstanbul Topkapı 2. Matbaacılar Sitesi'ndeki üretim tesisimizde basılmakta ve Muğla'daki adresinize korumalı kargo ile sevk edilmektedir."
      },
      {
        question: "Bodrum ve Marmaris'teki oteller için toplu siparişlerde indirim uygulanıyor mu?",
        answer: "Evet, yüksek adetli otel, restoran ve kurumsal firma baskı siparişlerinde doğrudan fabrika çıkışlı özel toptan fiyatlandırma uygulanmaktadır."
      },
      {
        question: "Restoranlar için su geçirmez Amerikan servis veya menü yapabiliyor musunuz?",
        answer: "Evet, sıvı ve yağ ile temas eden alanlar için PP plastik ve mat/parlak selefon kaplamalı dayanıklı Amerikan servis ile menüler üretiyoruz."
      }
    ]
  },

  "antalya-matbaa": {
    plateCode: 7,
    name: "Antalya",
    slug: "antalya-matbaa",
    metaTitle: "Antalya’ya Kargo ile Matbaa ve Ambalaj Baskı | Mavi Basım",
    metaDescription: "Antalya’daki işletmeler için broşür, katalog, etiket, kutu, Amerikan servis, kartvizit ve form baskı seçeneklerini inceleyin. İstanbul Topkapı’dan kargo ile teklif alın.",
    h1: "Antalya için Matbaa ve Ambalaj Baskı Çözümleri",
    heroText: "Muratpaşa, Kepez, Konyaaltı, Alanya, Manavgat, Serik, Kemer, Kaş ve Antalya’nın diğer ilçelerindeki işletmeler; broşür, katalog, etiket, kutu, Amerikan servis, kartvizit ve form baskı seçeneklerini inceleyerek teklif alabilir.",
    intro: "Antalya’daki konaklama işletmeleri, restoranlar, turizm acenteleri, transfer firmaları, perakende işletmeleri ve paketleme yapan firmalar için farklı baskı ihtiyaçları oluşabilir. Ürün ölçüsü, adet, kullanım amacı, tasarım dosyası ve baskı sonrası uygulamalara göre seçenekler değerlendirilir. Mavi Basım, İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktasından Antalya’ya kargo ile baskı çözümleri sunar.",
    districtsIntro: "Antalya il merkezi ve çevre ilçelerdeki işletmeler için sipariş ve kargo planı, ürünün özelliklerine ve onay sürecine göre oluşturulur.",
    districts: ["Muratpaşa", "Kepez", "Konyaaltı", "Alanya", "Manavgat", "Serik", "Kemer", "Kaş"],
    sectors: [
      {
        title: "Konaklama ve Turizm İşletmeleri",
        description: "Konaklama işletmeleri için katalog, tanıtım broşürü, kartvizit, dosya ve tesis içi bilgilendirme materyalleri ihtiyaca göre planlanabilir."
      },
      {
        title: "Restoran ve Paket Servis İşletmeleri",
        description: "Restoran, kafe ve paket servis işletmeleri için Amerikan servis, broşür, etiket, magnet, menü ve sipariş fişi gibi ürünler kullanım amacına göre değerlendirilebilir."
      },
      {
        title: "Turizm Acenteleri ve Transfer Firmaları",
        description: "Turizm acenteleri ve transfer firmaları için tanıtım broşürü, katalog, araç kiralama formu, kartvizit ve araç içi kullanım ürünleri incelenebilir."
      },
      {
        title: "Sağlık Turizmi ve Klinikler",
        description: "Klinik ve sağlık turizmi işletmeleri için katalog, dosya, randevu kartı, etiket ve form baskıları değerlendirilebilir. Tıbbi, hukuki, resmî veya farklı dildeki metinlerin doğruluğu müşteri ya da yetkili danışmanı tarafından sağlanmalıdır."
      },
      {
        title: "Tarım, Paketleme ve Ticari İşletmeler",
        description: "Tarım, paketleme ve ticari işletmeler için kutu, koli etiketi, ürün etiketi, katalog ve tanıtım materyalleri kullanım koşulları dikkate alınarak planlanabilir."
      }
    ],
    featuredProducts: [
      {
        name: "Amerikan Servis Baskı",
        slug: "/amerikan-servis",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Restoran ve Paket Servis",
        reason: "Restoran ve paket servis işletmeleri için baskılı Amerikan servis seçeneklerini inceleyin.",
        imageSrc: "/images/amerikan-servis/amerikan-servis-baski.webp",
        imageAlt: "Baskılı Amerikan Servis ve Masa Servis Kağıdı"
      },
      {
        name: "Broşür Baskı",
        slug: "/brosur",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Turizm Tanıtımı",
        reason: "Tesis, tur ve hizmet tanıtımı için farklı ebat ve katlama seçeneklerinde broşürleri inceleyin.",
        imageSrc: "/images/brosur/brosur-baski-fiyatlari.webp",
        imageAlt: "A4 ve A5 Tanıtım Broşürü Baskısı"
      },
      {
        name: "Katalog ve Dergi Baskı",
        slug: "/kataloglar",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal Tanıtım",
        reason: "Konaklama, turizm ve kurumsal tanıtım içerikleri için katalog ve dergi baskı seçeneklerini inceleyin.",
        imageSrc: "/images/katalog/katalog-baski-fiyatlari.webp",
        imageAlt: "Kurumsal Tanıtım Kataloğu ve Dergi Baskısı"
      },
      {
        name: "Buzdolabı Magneti",
        slug: "/magnet",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Yerel Tanıtım",
        reason: "Restoran, paket servis ve yerel tanıtım çalışmaları için magnet seçeneklerini inceleyin.",
        imageSrc: "/images/magnet/magnet-baski.webp",
        imageAlt: "Buzdolabı ve Paket Servis Tanıtım Magneti"
      },
      {
        name: "Kartvizit Baskı",
        slug: "/kartvizit",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal İletişim",
        reason: "İşletme, acente ve kurumsal ekipler için kartvizit alternatiflerini inceleyin.",
        imageSrc: "/images/kartvizit/kartvizit-baski.webp",
        imageAlt: "Mat Selefonlu Kurumsal Kartvizit"
      },
      {
        name: "Ürün ve Koli Etiketi",
        slug: "/etiket",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Paketleme ve Ticaret",
        reason: "Paketleme, perakende ve ticari ürünler için etiket seçeneklerini kullanım alanına göre inceleyin.",
        imageSrc: "/images/etiket/yapiskanli-etiket-baski.webp",
        imageAlt: "Yapışkanlı Kuşe ve Ambalaj Etiketi"
      },
      {
        name: "Ambalaj Kutusu",
        slug: "/kutu",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Ambalaj Çözümleri",
        reason: "Ürününüzün boyut ve kullanım gereksinimlerine göre karton ambalaj ve kutu seçeneklerini inceleyin.",
        imageSrc: "/images/kutu/urun-kutusu-baski.webp",
        imageAlt: "Özel Tasarım Karton Ürün Kutusu ve Ambalaj"
      },
      {
        name: "Oto Paspas Baskı",
        slug: "/oto-paspas",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Araç ve Servis İşletmeleri",
        reason: "Transfer, araç servisi, oto yıkama ve filo işletmeleri için baskılı oto paspas seçeneklerini inceleyin.",
        imageSrc: "/images/oto-paspas/oto-paspas-baski-fiyatlari.webp",
        imageAlt: "Oto Yıkama ve Servis İçin Baskılı Kağıt Oto Paspası"
      },
      {
        name: "Araç Kiralama Formları",
        slug: "/arac-kiralama",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "İşletme Evrakları",
        reason: "Araç kiralama ve teslim süreçleri için form ve sözleşme baskı seçeneklerini inceleyin.",
        imageSrc: "/images/arac-kiralama/arac-kiralama-sozlesmesi-baski.webp",
        imageAlt: "Otokopili ve Numaratörlü Araç Kiralama Sözleşmesi Formu"
      }
    ],
    shippingText: "Antalya’ya gönderim planı; ürün, adet, baskı sonrası işlemler ve sipariş onayına göre teklif aşamasında netleştirilir.",
    businessNeedsText: "Daha net teklif için ürün türünü, ölçüyü, adedi, baskı yönünü, varsa malzeme veya baskı sonrası tercihini ve tasarım dosyanızın durumunu paylaşabilirsiniz.",
    faq: [
      {
        question: "Antalya’da fiziksel şubeniz var mı?",
        answer: "Antalya’da fiziksel şubemiz bulunmuyor. İstanbul Topkapı’daki hizmet ve koordinasyon noktamızdan sipariş sürecini uzaktan yönetiyor, Antalya’ya kargo ile gönderim yapıyoruz."
      },
      {
        question: "Antalya’ya gönderim süresi nasıl belirlenir?",
        answer: "Gönderim planı; ürünün türü, adet, baskı sonrası uygulamalar, dosya onayı ve kargo koşullarına göre teklif aşamasında netleştirilir."
      },
      {
        question: "Baskı öncesinde PDF prova paylaşılır mı?",
        answer: "Baskıya hazır dosyalarda yerleşim ve metin kontrolü için uygun işlerde PDF prova paylaşılabilir. PDF prova fiziksel baskı rengini ve malzeme dokusunu birebir garanti etmez."
      },
      {
        question: "Farklı dilde hazırlanmış dosyalar basılabilir mi?",
        answer: "Baskıya hazır ve müşteri tarafından kontrol edilmiş farklı dildeki dosyalar teknik açıdan incelenebilir. Metnin dilsel, hukuki ve içerik doğruluğu müşteri veya yetkili danışmanı tarafından sağlanmalıdır."
      },
      {
        question: "Etiket ve ambalaj seçiminde nelere dikkat edilir?",
        answer: "Kullanım alanı, yüzey, temas koşulları, nem, sıcaklık, ürün ağırlığı ve uygulama yöntemi paylaşılır; uygun malzeme seçeneği buna göre değerlendirilir."
      }
    ]
  },

  "ankara-matbaa": {
    plateCode: 6,
    name: "Ankara",
    slug: "ankara-matbaa",
    metaTitle: "Ankara’ya Kargo ile Kurumsal Matbaa Baskı | Mavi Basım",
    metaDescription: "Ankara’daki işletmeler için antetli kâğıt, zarf, kartvizit, dosya, broşür, katalog, etiket, kutu ve form baskı seçeneklerini inceleyin.",
    h1: "Ankara için Kurumsal Matbaa ve Baskı Çözümleri",
    heroText: "Çankaya, Yenimahalle, Keçiören, Sincan, Etimesgut, Mamak, Gölbaşı, Akyurt ve Ankara’nın diğer ilçelerindeki işletmeler; antetli kâğıt, zarf, kartvizit, dosya, broşür, katalog, etiket, kutu ve form baskı seçeneklerini inceleyerek teklif alabilir.",
    intro: "Ankara’daki kurumsal şirketler, danışmanlık ve hukuk ofisleri, sanayi işletmeleri, eğitim kurumları, perakende işletmeleri ve ticari firmalar için farklı baskı ihtiyaçları oluşabilir. Ürün ölçüsü, adet, kullanım amacı, tasarım dosyası ve baskı sonrası uygulamalara göre seçenekler değerlendirilir. Mavi Basım, İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktasından Ankara’ya kargo ile baskı çözümleri sunar.",
    districtsIntro: "Ankara il merkezi ve çevre ilçelerdeki işletmeler için sipariş ve kargo planı, ürünün özelliklerine ve onay sürecine göre oluşturulur.",
    districts: ["Çankaya", "Yenimahalle", "Keçiören", "Sincan", "Etimesgut", "Mamak", "Gölbaşı", "Akyurt"],
    sectors: [
      {
        title: "Kurumsal Şirketler ve Ofisler",
        description: "Antetli kâğıt, diplomat zarf, kartvizit, dosya, katalog ve kurumsal form ürünleri ihtiyaçlara göre değerlendirilebilir."
      },
      {
        title: "Sanayi ve Teknik İşletmeler",
        description: "Ürün etiketi, koli etiketi, katalog, kullanım dokümanı, kutu ve tanıtım materyalleri incelenebilir."
      },
      {
        title: "Hukuk, Mali Müşavirlik ve Danışmanlık Ofisleri",
        description: "Zarf, antetli kâğıt, kartvizit, dosya, bloknot ve form baskıları kurumsal kullanım için planlanabilir."
      },
      {
        title: "Eğitim ve Etkinlik İşletmeleri",
        description: "Tanıtım broşürü, kayıt formu, katalog, kitap ayracı, sertifika dosyası ve kartvizit ürünleri kullanım amacına göre değerlendirilebilir."
      },
      {
        title: "Perakende ve Ticari İşletmeler",
        description: "Broşür, etiket, kutu, kartvizit, katalog ve form baskı seçenekleri incelenebilir."
      }
    ],
    featuredProducts: [
      {
        name: "Antetli Kâğıt Baskı",
        slug: "/antetli",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal Evraklar",
        reason: "Resmi yazışmalar ve kurumsal iletişim için antetli kâğıt baskı seçeneklerini inceleyin.",
        imageSrc: "/images/antetli-kagit/kurumsal-antetli-kagit-ornegi.webp",
        imageAlt: "Kurumsal Antetli Kâğıt Baskısı"
      },
      {
        name: "Diplomat ve Torba Zarf",
        slug: "/zarf",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal Yazışma",
        reason: "Fatura, resmi evrak ve kurumsal yazışmalar için diplomat ve torba zarf seçeneklerini inceleyin.",
        imageSrc: "/images/zarf/kurumsal-zarf-baski.webp",
        imageAlt: "Kurumsal Diplomat ve Torba Zarf Baskısı"
      },
      {
        name: "Kartvizit Baskı",
        slug: "/kartvizit",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal İletişim",
        reason: "Kurumsal kimlik ve ticari iletişim için kartvizit alternatiflerini inceleyin.",
        imageSrc: "/images/kartvizit/kartvizit-baski.webp",
        imageAlt: "Mat Selefonlu Kurumsal Kartvizit"
      },
      {
        name: "Cepli Sunum Dosyası",
        slug: "/dosyalar",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Teklif ve Sunum",
        reason: "Teklif, sözleşme ve kurumsal sunum evrakları için cepli dosya seçeneklerini inceleyin.",
        imageSrc: "/images/dosya/sunum-ve-cepli-dosya.webp",
        imageAlt: "Cepli Sunum Dosyası ve Teklif Klasörü"
      },
      {
        name: "Katalog ve Dergi Baskı",
        slug: "/kataloglar",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal Tanıtım",
        reason: "Ürün, hizmet ve kurumsal tanıtım içerikleri için katalog ve dergi baskı seçeneklerini inceleyin.",
        imageSrc: "/images/katalog/katalog-baski-fiyatlari.webp",
        imageAlt: "Kurumsal Tanıtım Kataloğu ve Dergi Baskısı"
      },
      {
        name: "Broşür Baskı",
        slug: "/brosur",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Tanıtım Baskıları",
        reason: "Ürün ve hizmet tanıtımı için farklı ebat ve katlama seçeneklerinde broşürleri inceleyin.",
        imageSrc: "/images/brosur/brosur-baski-fiyatlari.webp",
        imageAlt: "A4 ve A5 Tanıtım Broşürü Baskısı"
      },
      {
        name: "Ürün ve Koli Etiketi",
        slug: "/etiket",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Sanayi ve Ticaret",
        reason: "Sanayi, ticaret ve lojistik süreçleri için etiket seçeneklerini inceleyin.",
        imageSrc: "/images/etiket/yapiskanli-etiket-baski.webp",
        imageAlt: "Yapışkanlı Kuşe ve Ambalaj Etiketi"
      },
      {
        name: "Ambalaj Kutusu",
        slug: "/kutu",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Ambalaj Çözümleri",
        reason: "Ürününüzün boyut ve dayanım gereksinimlerine göre karton ambalaj ve kutu seçeneklerini inceleyin.",
        imageSrc: "/images/kutu/urun-kutusu-baski.webp",
        imageAlt: "Özel Tasarım Karton Ürün Kutusu ve Ambalaj"
      },
      {
        name: "Form ve Makbuz Baskıları",
        slug: "/makbuz-ve-formlar",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "İşletme Evrakları",
        reason: "Sipariş, teslimat ve muhasebe takibi için ciltli veya koçanlı form çözümlerini inceleyin.",
        imageSrc: "/images/siparis-fisi/siparis-fisi-basimi.webp",
        imageAlt: "Otokopili Kendinden Karbonlu Sipariş Fişi ve Form"
      }
    ],
    shippingText: "Ankara’ya gönderim planı; ürün, adet, baskı sonrası işlemler ve sipariş onayına göre teklif aşamasında netleştirilir.",
    businessNeedsText: "Daha net teklif için ürün türünü, ölçüyü, adedi, baskı yönünü, varsa malzeme veya baskı sonrası tercihini ve tasarım dosyanızın durumunu paylaşabilirsiniz.",
    faq: [
      {
        question: "Ankara’da fiziksel şubeniz var mı?",
        answer: "Ankara’da fiziksel şubemiz bulunmuyor. İstanbul Topkapı’daki hizmet ve koordinasyon noktamızdan sipariş sürecini uzaktan yönetiyor, Ankara’ya kargo ile gönderim yapıyoruz."
      },
      {
        question: "Ankara’ya gönderim süresi nasıl belirlenir?",
        answer: "Gönderim planı; ürünün türü, adet, baskı sonrası uygulamalar, dosya onayı ve kargo koşullarına göre teklif aşamasında netleştirilir."
      },
      {
        question: "Baskı öncesinde PDF prova paylaşılır mı?",
        answer: "Baskıya hazır dosyalarda yerleşim ve metin kontrolü için uygun işlerde PDF prova paylaşılabilir. PDF prova fiziksel baskı rengini ve malzeme dokusunu birebir garanti etmez."
      },
      {
        question: "Kurumsal evrak baskılarında hangi ürünler incelenebilir?",
        answer: "Antetli kâğıt, diplomat zarf, kartvizit, dosya, form ve katalog seçenekleri ihtiyaca göre incelenebilir."
      },
      {
        question: "Sanayi işletmeleri için hangi baskı ürünleri uygundur?",
        answer: "Etiket, katalog, kutu, kartvizit, broşür, form ve tanıtım ürünleri kullanım amacına göre değerlendirilebilir."
      }
    ]
  },

  "samsun-matbaa": {
    plateCode: 55,
    name: "Samsun",
    slug: "samsun-matbaa",
    metaTitle: "Samsun’a Kargo ile Matbaa, Etiket ve Ambalaj Baskı | Mavi Basım",
    metaDescription: "Samsun’daki işletmeler için etiket, kutu, kartvizit, broşür, katalog, magnet, form, oto paspas ve Amerikan servis baskı seçeneklerini inceleyin.",
    h1: "Samsun için Matbaa, Etiket ve Ambalaj Baskı Çözümleri",
    heroText: "Atakum, İlkadım, Canik, Tekkeköy, Bafra, Çarşamba, Havza, Terme ve Samsun’un diğer ilçelerindeki işletmeler; etiket, kutu, kartvizit, broşür, katalog, magnet, form, oto paspas ve Amerikan servis baskı seçeneklerini inceleyerek teklif alabilir.",
    intro: "Samsun’daki gıda ve paketleme işletmeleri, sanayi ve ticaret firmaları, lojistik işletmeleri, restoranlar, perakende işletmeleri ve kurumsal firmalar için farklı baskı ihtiyaçları oluşabilir. Ürün ölçüsü, adet, kullanım amacı, tasarım dosyası ve baskı sonrası uygulamalara göre seçenekler değerlendirilir. Mavi Basım, İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktasından Samsun’a kargo ile baskı çözümleri sunar.",
    districtsIntro: "Samsun il merkezi ve çevre ilçelerdeki işletmeler için sipariş ve kargo planı, ürünün özelliklerine ve onay sürecine göre oluşturulur.",
    districts: ["Atakum", "İlkadım", "Canik", "Tekkeköy", "Bafra", "Çarşamba", "Havza", "Terme"],
    sectors: [
      {
        title: "Gıda, Tarım ve Paketleme İşletmeleri",
        description: "Ürün etiketi, koli etiketi, kutu, katalog ve tanıtım materyalleri kullanım koşullarına göre planlanabilir."
      },
      {
        title: "Sanayi, Ticaret ve Lojistik İşletmeleri",
        description: "Etiket, katalog, kutu, kartvizit, form ve sevk süreçlerinde kullanılan basılı ürünler incelenebilir."
      },
      {
        title: "Restoran, Kafe ve Paket Servis İşletmeleri",
        description: "Amerikan servis, menü, broşür, magnet, etiket ve sipariş fişi gibi ürünler kullanım amacına göre değerlendirilebilir."
      },
      {
        title: "Araç, Servis ve Filo İşletmeleri",
        description: "Oto paspas, form, etiket, kartvizit ve tanıtım ürünleri ihtiyaçlara göre incelenebilir."
      },
      {
        title: "Kurumsal ve Hizmet İşletmeleri",
        description: "Kartvizit, broşür, katalog, form, dosya ve kurumsal evrak baskıları değerlendirilebilir."
      }
    ],
    featuredProducts: [
      {
        name: "Ürün ve Koli Etiketi",
        slug: "/etiket",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Gıda ve Paketleme",
        reason: "Gıda, tarım ve paketleme ürünleri için etiket seçeneklerini inceleyin.",
        imageSrc: "/images/etiket/yapiskanli-etiket-baski.webp",
        imageAlt: "Yapışkanlı Kuşe ve Ambalaj Etiketi"
      },
      {
        name: "Ambalaj Kutusu",
        slug: "/kutu",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Ambalaj Çözümleri",
        reason: "Ürününüzün boyut ve dayanım gereksinimlerine göre karton ambalaj ve kutu seçeneklerini inceleyin.",
        imageSrc: "/images/kutu/urun-kutusu-baski.webp",
        imageAlt: "Özel Tasarım Karton Ürün Kutusu ve Ambalaj"
      },
      {
        name: "Kartvizit Baskı",
        slug: "/kartvizit",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal İletişim",
        reason: "Kurumsal kimlik ve ticari iletişim için kartvizit alternatiflerini inceleyin.",
        imageSrc: "/images/kartvizit/kartvizit-baski.webp",
        imageAlt: "Mat Selefonlu Kurumsal Kartvizit"
      },
      {
        name: "Broşür Baskı",
        slug: "/brosur",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Tanıtım Baskıları",
        reason: "Ürün ve hizmet tanıtımı için farklı ebat ve katlama seçeneklerinde broşürleri inceleyin.",
        imageSrc: "/images/brosur/brosur-baski-fiyatlari.webp",
        imageAlt: "A4 ve A5 Tanıtım Broşürü Baskısı"
      },
      {
        name: "Katalog ve Dergi Baskı",
        slug: "/kataloglar",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal Tanıtım",
        reason: "Ürün, hizmet ve kurumsal tanıtım içerikleri için katalog ve dergi baskı seçeneklerini inceleyin.",
        imageSrc: "/images/katalog/katalog-baski-fiyatlari.webp",
        imageAlt: "Kurumsal Tanıtım Kataloğu ve Dergi Baskısı"
      },
      {
        name: "Buzdolabı Magneti",
        slug: "/magnet",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Yerel Tanıtım",
        reason: "Restoran, paket servis ve yerel işletme tanıtımları için buzdolabı magneti seçeneklerini inceleyin.",
        imageSrc: "/images/magnet/magnet-baski.webp",
        imageAlt: "Buzdolabı ve Paket Servis Tanıtım Magneti"
      },
      {
        name: "Form ve Makbuz Baskıları",
        slug: "/makbuz-ve-formlar",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "İşletme Evrakları",
        reason: "Sipariş, teslimat ve muhasebe takibi için ciltli veya koçanlı form çözümlerini inceleyin.",
        imageSrc: "/images/siparis-fisi/siparis-fisi-basimi.webp",
        imageAlt: "Otokopili Kendinden Karbonlu Sipariş Fişi ve Form"
      },
      {
        name: "Oto Paspas Baskı",
        slug: "/oto-paspas",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Araç ve Servis İşletmeleri",
        reason: "Araç servisleri, oto yıkama noktaları ve filo işletmeleri için baskılı oto paspas seçeneklerini inceleyin.",
        imageSrc: "/images/oto-paspas/oto-paspas-baski-fiyatlari.webp",
        imageAlt: "Oto Yıkama ve Servis İçin Baskılı Kağıt Oto Paspası"
      },
      {
        name: "Amerikan Servis Baskı",
        slug: "/amerikan-servis",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Restoran ve Paket Servis",
        reason: "Restoran, kafe ve paket servis işletmeleri için baskılı Amerikan servis seçeneklerini inceleyin.",
        imageSrc: "/images/amerikan-servis/amerikan-servis-baski.webp",
        imageAlt: "Baskılı Amerikan Servis ve Masa Servis Kağıdı"
      }
    ],
    shippingText: "Samsun’a gönderim planı; ürün, adet, baskı sonrası işlemler ve sipariş onayına göre teklif aşamasında netleştirilir.",
    businessNeedsText: "Daha net teklif için ürün türünü, ölçüyü, adedi, baskı yönünü, varsa malzeme veya baskı sonrası tercihini ve tasarım dosyanızın durumunu paylaşabilirsiniz.",
    faq: [
      {
        question: "Samsun’da fiziksel şubeniz var mı?",
        answer: "Samsun’da fiziksel şubemiz bulunmuyor. İstanbul Topkapı’daki hizmet ve koordinasyon noktamızdan sipariş sürecini uzaktan yönetiyor, Samsun’a kargo ile gönderim yapıyoruz."
      },
      {
        question: "Samsun’a gönderim süresi nasıl belirlenir?",
        answer: "Gönderim planı; ürünün türü, adet, baskı sonrası uygulamalar, dosya onayı ve kargo koşullarına göre teklif aşamasında netleştirilir."
      },
      {
        question: "Baskı öncesinde PDF prova paylaşılır mı?",
        answer: "Baskıya hazır dosyalarda yerleşim ve metin kontrolü için uygun işlerde PDF prova paylaşılabilir. PDF prova fiziksel baskı rengini ve malzeme dokusunu birebir garanti etmez."
      },
      {
        question: "Gıda ve paketleme işletmeleri hangi ürünleri inceleyebilir?",
        answer: "Ürün etiketi, koli etiketi, kutu, katalog ve tanıtım materyalleri ihtiyaca göre incelenebilir."
      },
      {
        question: "Lojistik ve araç işletmeleri için hangi baskı ürünleri uygundur?",
        answer: "Form, etiket, kartvizit, oto paspas, broşür ve tanıtım ürünleri kullanım amacına göre değerlendirilebilir."
      }
    ]
  },

  "trabzon-matbaa": {
    plateCode: 61,
    name: "Trabzon",
    slug: "trabzon-matbaa",
    metaTitle: "Trabzon’a Kargo ile Matbaa, Turizm ve Ambalaj Baskı | Mavi Basım",
    metaDescription: "Trabzon’daki işletmeler için Amerikan servis, broşür, etiket, magnet, kutu, kartvizit, karton çanta, katalog ve el ilanı baskı seçeneklerini inceleyin.",
    h1: "Trabzon için Matbaa, Turizm ve Ambalaj Baskı Çözümleri",
    heroText: "Ortahisar, Akçaabat, Yomra, Of, Araklı, Arsin, Sürmene, Vakfıkebir ve Trabzon’un diğer ilçelerindeki işletmeler; Amerikan servis, broşür, etiket, magnet, kutu, kartvizit, karton çanta, katalog ve el ilanı baskı seçeneklerini inceleyerek teklif alabilir.",
    intro: "Trabzon’daki turizm ve konaklama işletmeleri, restoranlar, gıda ve paketleme firmaları, sanayi ve ticaret işletmeleri, mağazalar ve kurumsal firmalar için farklı baskı ihtiyaçları oluşabilir. Ürün ölçüsü, adet, kullanım amacı, tasarım dosyası ve baskı sonrası uygulamalara göre seçenekler değerlendirilir. Mavi Basım, İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktasından Trabzon’a kargo ile baskı çözümleri sunar.",
    districtsIntro: "Trabzon il merkezi ve çevre ilçelerdeki işletmeler için sipariş ve kargo planı, ürünün özelliklerine ve onay sürecine göre oluşturulur.",
    districts: ["Ortahisar", "Akçaabat", "Yomra", "Of", "Araklı", "Arsin", "Sürmene", "Vakfıkebir"],
    sectors: [
      {
        title: "Turizm, Konaklama ve Etkinlik İşletmeleri",
        description: "Broşür, el ilanı, kartvizit, magnet, katalog ve tanıtım ürünleri kullanım amacına göre değerlendirilebilir."
      },
      {
        title: "Restoran, Kafe ve Paket Servis İşletmeleri",
        description: "Amerikan servis, menü, magnet, broşür, etiket ve sipariş fişi gibi ürünler ihtiyaca göre incelenebilir."
      },
      {
        title: "Gıda, Yöresel Ürün ve Paketleme İşletmeleri",
        description: "Ürün etiketi, koli etiketi, ambalaj kutusu, karton çanta, katalog ve tanıtım materyalleri kullanım koşullarına göre planlanabilir."
      },
      {
        title: "Sanayi, Ticaret ve Lojistik İşletmeleri",
        description: "Etiket, katalog, kutu, kartvizit, form ve sevk süreçlerinde kullanılan basılı ürünler değerlendirilebilir."
      },
      {
        title: "Mağaza, Perakende ve Kurumsal İşletmeler",
        description: "Karton çanta, kutu, etiket, kartvizit, broşür, katalog ve kurumsal evrak baskıları ihtiyaçlara göre incelenebilir."
      }
    ],
    featuredProducts: [
      {
        name: "Menü ve Amerikan Servis",
        slug: "/amerikan-servis",
        categoryBadge: "Restoran ve Paket Servis",
        reason: "Restoran, kafe ve paket servis işletmeleri için Amerikan servis ve menü baskı seçeneklerini inceleyin.",
        imageSrc: "/images/amerikan-servis/amerikan-servis-baski.webp",
        imageAlt: "Baskılı Amerikan Servis ve Masa Servis Kağıdı"
      },
      {
        name: "Broşür Baskı",
        slug: "/brosur",
        categoryBadge: "Turizm Tanıtımı",
        reason: "Turizm, etkinlik ve hizmet tanıtımları için farklı ebat ve katlama seçeneklerinde broşürleri inceleyin.",
        imageSrc: "/images/brosur/brosur-baski-fiyatlari.webp",
        imageAlt: "A4 ve A5 Tanıtım Broşürü Baskısı"
      },
      {
        name: "Ürün ve Koli Etiketi",
        slug: "/etiket",
        categoryBadge: "Gıda ve Paketleme",
        reason: "Gıda, yöresel ürün ve paketleme ihtiyaçları için etiket seçeneklerini inceleyin.",
        imageSrc: "/images/etiket/yapiskanli-etiket-baski.webp",
        imageAlt: "Yapışkanlı Kuşe ve Ambalaj Etiketi"
      },
      {
        name: "Buzdolabı Magneti",
        slug: "/magnet",
        categoryBadge: "Yerel Tanıtım",
        reason: "Restoran, paket servis ve yerel işletme tanıtımları için buzdolabı magneti seçeneklerini inceleyin.",
        imageSrc: "/images/magnet/magnet-baski.webp",
        imageAlt: "Buzdolabı ve Paket Servis Tanıtım Magneti"
      },
      {
        name: "Ambalaj Kutusu",
        slug: "/kutu",
        categoryBadge: "Ambalaj Çözümleri",
        reason: "Ürününüzün boyut ve kullanım gereksinimlerine göre karton ambalaj ve kutu seçeneklerini inceleyin.",
        imageSrc: "/images/kutu/urun-kutusu-baski.webp",
        imageAlt: "Özel Tasarım Karton Ürün Kutusu ve Ambalaj"
      },
      {
        name: "Kartvizit Baskı",
        slug: "/kartvizit",
        categoryBadge: "Kurumsal İletişim",
        reason: "Kurumsal kimlik ve ticari iletişim için kartvizit alternatiflerini inceleyin.",
        imageSrc: "/images/kartvizit/kartvizit-baski.webp",
        imageAlt: "Mat Selefonlu Kurumsal Kartvizit"
      },
      {
        name: "Karton Çanta Baskı",
        slug: "/karton-canta",
        categoryBadge: "Mağaza ve Perakende",
        reason: "Mağaza, perakende ve ürün sunumu için baskılı karton çanta seçeneklerini inceleyin.",
        imageSrc: "/images/karton-canta/magaza-karton-canta-baski.webp",
        imageAlt: "Mağaza ve Perakende İçin Baskılı Karton Çanta"
      },
      {
        name: "Katalog ve Dergi Baskı",
        slug: "/kataloglar",
        categoryBadge: "Kurumsal Tanıtım",
        reason: "Ürün, hizmet ve kurumsal tanıtım içerikleri için katalog ve dergi baskı seçeneklerini inceleyin.",
        imageSrc: "/images/katalog/katalog-baski-fiyatlari.webp",
        imageAlt: "Kurumsal Tanıtım Kataloğu ve Dergi Baskısı"
      },
      {
        name: "El İlanı Baskı",
        slug: "/el-ilani",
        categoryBadge: "Kampanya ve Duyuru",
        reason: "Kampanya, açılış ve yerel duyurular için el ilanı baskı seçeneklerini inceleyin.",
        imageSrc: "/images/el-ilani/el-ilani-baski-fiyatlari.webp",
        imageAlt: "A5 ve A6 Tanıtım El İlanı Baskısı"
      }
    ],
    shippingText: "Trabzon’a gönderim planı; ürün, adet, baskı sonrası işlemler ve sipariş onayına göre teklif aşamasında netleştirilir.",
    businessNeedsText: "Daha net teklif için ürün türünü, ölçüyü, adedi, baskı yönünü, varsa malzeme veya baskı sonrası tercihini ve tasarım dosyanızın durumunu paylaşabilirsiniz.",
    faq: [
      {
        question: "Trabzon’da fiziksel şubeniz var mı?",
        answer: "Trabzon’da fiziksel şubemiz bulunmuyor. İstanbul Topkapı’daki hizmet ve koordinasyon noktamızdan sipariş sürecini uzaktan yönetiyor, Trabzon’a kargo ile gönderim yapıyoruz."
      },
      {
        question: "Trabzon’a gönderim süresi nasıl belirlenir?",
        answer: "Gönderim planı; ürünün türü, adet, baskı sonrası uygulamalar, dosya onayı ve kargo koşullarına göre teklif aşamasında netleştirilir."
      },
      {
        question: "Baskı öncesinde PDF prova paylaşılır mı?",
        answer: "Baskıya hazır dosyalarda yerleşim ve metin kontrolü için uygun işlerde PDF prova paylaşılabilir. PDF prova fiziksel baskı rengini ve malzeme dokusunu birebir garanti etmez."
      },
      {
        question: "Turizm ve konaklama işletmeleri hangi ürünleri inceleyebilir?",
        answer: "Broşür, el ilanı, kartvizit, katalog, magnet, Amerikan servis ve menü seçenekleri kullanım amacına göre değerlendirilebilir."
      },
      {
        question: "Gıda ve paketleme işletmeleri hangi baskı ürünlerini inceleyebilir?",
        answer: "Ambalaj kutusu, ürün etiketi, koli etiketi, karton çanta, katalog ve tanıtım materyalleri ihtiyaca göre incelenebilir."
      }
    ]
  },

  "van-matbaa": {
    plateCode: 65,
    name: "Van",
    slug: "van-matbaa",
    metaTitle: "Van Matbaa | Kartvizit, Etiket ve Ambalaj Baskısı",
    metaDescription: "İstanbul Topkapı fabrikamızdan Van İpekyolu, Tuşba, Edremit ve Erciş işletmelerine kartvizit, broşür, etiket, kutu, ambalaj ve makbuz baskı çözümleri.",
    h1: "Van Matbaa, Etiket ve Kurumsal Baskı Çözümleri",
    heroText: "İpekyolu, Tuşba, Edremit, Erciş ve Muradiye bölgesindeki gıda, tekstil ve ticaret işletmelerine doğrudan fabrika imalatı.",
    intro: "Doğu Anadolu Bölgesi'nin en dinamik ticaret ve turizm kenti Van; meşhur Van kahvaltısı salonları, oteller, sınır ticareti yapan işletmeler, tekstil imalatçıları ve gıda paketleme tesisleriyle geniş bir matbaa pazarına sahiptir. Mavi Basım olarak Van ve ilçelerindeki ticari kuruluşlara, İstanbul Topkapı'daki modern matbaa tesislerimizde basılan ürünleri kaliteli paketleme ve kargo güvencesiyle ulaştırıyoruz.",
    districtsIntro: "Van merkez ve tüm çevre ilçelerine güvenli sevkiyat gerçekleştirmekteyiz:",
    districts: ["İpekyolu", "Tuşba", "Edremit", "Erciş", "Muradiye", "Gevaş"],
    sectors: [
      {
        title: "Gıda ve Van Kahvaltısı Salonları",
        description: "Van kahvaltı salonları ve lokantalar için otantik baskılı Amerikan servisler, ıslak mendil paketleri, menüler ve magnetler üretiyoruz."
      },
      {
        title: "Yöresel Otlu Peynir ve Bal Üreticileri",
        description: "Van otlu peyniri, çatak balı ve gıda ürünleri için sudan etkilenmeyen PP etiketler ve baskılı karton ambalaj kutuları imal ediyoruz."
      },
      {
        title: "Tekstil ve Konfeksiyon Sanayii",
        description: "Tekstil fabrikaları için sallama ürün kartları, beden etiketleri, koli kutuları ve marka broşürleri hazırlıyoruz."
      },
      {
        title: "Otel ve Sınır Turizmi İşletmeleri",
        description: "İranlı turistleri ağırlayan oteller ve seyahat acenteleri için Farsça ve Türkçe broşürler, kartvizitler ve bilgilendirme föyleri basıyoruz."
      },
      {
        title: "Perakende ve Mağazacılık",
        description: "Giyim ve ayakkabı mağazaları için logo baskılı karton poşetler, hediye kutuları ve kasa makbuzları hazırlıyoruz."
      }
    ],
    featuredProducts: [
      {
        name: "Yöresel Ürün Etiketi",
        slug: "/etiket",
        badge: "PP Opak Su Geçirmez",
        reason: "Van otlu peyniri ve bal kavanozları için ıslaklığa ve soğuğa dayanıklı plastik etiketler."
      },
      {
        name: "Karton Ambalaj Kutusu",
        slug: "/kutu",
        badge: "Özel Kesim Karton",
        reason: "Gıda ve tekstil ürünlerinin güvenle kargolanmasını ve şık sunulmasını sağlayan kutular."
      },
      {
        name: "Kartvizit Baskı",
        slug: "/kartvizit",
        badge: "350gr Mat Selefonlu",
        reason: "Vanlı tüccar ve esnaflar için prestij sağlayan kabartma laklı kurumsal kartvizitler."
      },
      {
        name: "Amerikan Servis & Menü",
        slug: "/amerikan-servis",
        badge: "Kraft / Kuşe Kağıt",
        reason: "Kahvaltı salonları ve restoranlarda masa hijyenini koruyan özel tasarım Amerikan servisler."
      },
      {
        name: "Çok Dilli Broşür",
        slug: "/brosur",
        badge: "135gr Kuşe",
        reason: "Sınır turizmi ve yerel hizmetler için çok dilli tanıtım broşürleri."
      },
      {
        name: "Karton Çanta",
        slug: "/karton-canta",
        badge: "İpli & Lüks Bristol",
        reason: "Mağaza ve butikler için müşterilerin severek taşıdığı kaliteli karton poşetler."
      },
      {
        name: "Ciltli Sipariş Fişi",
        slug: "/makbuz-ve-formlar",
        badge: "Oto-Kopyalı Numaratörlü",
        reason: "Ticarethane ve restoranlarda alacak-verecek takibini sağlayan koçanlı makbuzlar."
      }
    ],
    shippingText: "Van ve ilçelerine sevk edilen siparişlerimiz İstanbul Topkapı'dan dayanıklı ambalajlarda yola çıkar. Anlaşmalı kargo hatlarımızla Van adrese teslim ulaştırılır.",
    businessNeedsText: "Van'daki işletmelere İstanbul üretim fiyat avantajı sunarak kaliteli matbaa ve ambalaj ürünlerine uygun bütçelerle ulaşmalarını sağlıyoruz.",
    faq: [
      {
        question: "Van'a matbaa kargo teslimatı kaç gün sürer?",
        answer: "Baskısı tamamlanan siparişler kargoya verildikten sonra ortalama 48 saat içerisinde Van adresinize teslim edilmektedir."
      },
      {
        question: "Farsça dilinde broşür veya menü basabiliyor musunuz?",
        answer: "Evet, Farsça ve İngilizce alfabe metinleri yüksek çözünürlükte sorunsuz olarak basılmaktadır."
      },
      {
        question: "Van'da üretim tesisiniz var mıdır?",
        answer: "Üretim merkezimiz İstanbul Topkapı matbaacılar sitesinde yer almakta, Van'a kargo güvencesiyle sevk edilmektedir."
      },
      {
        question: "Peynir ve bal kavanozu etiketleri sudan etkilenir mi?",
        answer: "Hayır, su ve nemden etkilenmeyen PP opak plastik etiket malzemesi kullanılmaktadır."
      },
      {
        question: "Baskı öncesinde PDF onay sunuluyor mu?",
        answer: "Evet, WhatsApp hattımızdan iletilen dijital PDF provayı onaylamadan üretime başlanmaz."
      }
    ]
  },

  "mardin-matbaa": {
    plateCode: 47,
    name: "Mardin",
    slug: "mardin-matbaa",
    metaTitle: "Mardin Matbaa | Yöresel Ürün Etiketi ve Kutu Baskı",
    metaDescription: "İstanbul Topkapı fabrikamızdan Mardin Artuklu, Kızıltepe, Midyat ve Nusaybin işletmelerine özel ambalaj kutusu, etiket, kartvizit, broşür ve menü baskısı.",
    h1: "Mardin Matbaa, Ambalaj ve Yöresel Baskı Çözümleri",
    heroText: "Artuklu, Kızıltepe, Midyat, Nusaybin ve Derik bölgesindeki turizm, gıda ve ihracat işletmelerine özel matbaa imalatı.",
    intro: "Tarihi ve kültürel dokusuyla dünya markası olan Mardin; konak otelleri, bıttım sabunu ve telkari imalatçıları, kuruyemiş üreticileri, Kızıltepe un/gıda sanayisi ve Mezopotamya turizmiyle özel bir matbaa ihtiyacına sahiptir. Ürün ambalajının otantik ve kaliteli olması, satış değerini doğrudan katlamaktadır. Mavi Basım olarak Mardin'deki üretici ve ticari hanelere İstanbul Topkapı'daki matbaa tesisimizde ürettiğimiz kutu, etiket, broşür ve kurumsal evrakları doğrudan kargo ile sevk ediyoruz.",
    districtsIntro: "Mardin merkez ve tüm ilçelerindeki adrese teslim kargo gönderimi yapmaktayız:",
    districts: ["Artuklu", "Kızıltepe", "Nusaybin", "Midyat", "Derik", "Mazıdağı"],
    sectors: [
      {
        title: "Tarihi Konak Oteller ve Turizm",
        description: "Artuklu ve Midyat konak otelleri için otantik kapı askıları, karşılama broşürleri, oda içi kartlar ve hediye paketleri hazırlıyoruz."
      },
      {
        title: "Bıttım Sabunu ve Yöresel Kozmetik",
        description: "Mardin bıttım sabunu ve badem şekeri üreticileri için özel kraft ambalaj kutuları, pencere kesimli kartonlar ve yapışkan etiketler basıyoruz."
      },
      {
        title: "Kuruyemiş, Un ve Gıda Sanayii (Kızıltepe)",
        description: "Kızıltepe ve Nusaybin gıda işleme tesisleri için un çuvalı etiketleri, kuruyemiş kutuları ve ihracat koli etiketleri üretiyoruz."
      },
      {
        title: "Restoranlar ve Taş Konak Lokantaları",
        description: "Mardin mutfağını sunan restoranlar için Amerikan servisler, deri veya sıvama menüler, adisyon fişleri ve magnetler basıyoruz."
      },
      {
        title: "Telkari ve Gümüş Takı Mağazaları",
        description: "Midyat telkari sanatkarları için minyatür takı kutuları, garanti belgeleri ve lüks logo baskılı karton poşetler imal ediyoruz."
      }
    ],
    featuredProducts: [
      {
        name: "Yöresel Ambalaj Kutusu",
        slug: "/kutu",
        badge: "Kraft / Bristol Karton",
        reason: "Mardin sabunu, badem şekeri ve kahve için otantik görünüm sağlayan baskılı ambalaj kutuları."
      },
      {
        name: "Şişe ve Ürün Etiketi",
        slug: "/etiket",
        badge: "PP Opak & Şeffaf Sticker",
        reason: "Zeytinyağı, kolonya ve gıda kavanozlarında şık duran sudan etkilenmeyen yapışkanlı etiketler."
      },
      {
        name: "Amerikan Servis & Menü",
        slug: "/amerikan-servis",
        badge: "Kraft & Selefonlu Kuşe",
        reason: "Tarihi restoranlarda otantik konsepti tamamlayan leke tutmaz Amerikan servis kağıtları."
      },
      {
        name: "Karton Çanta",
        slug: "/karton-canta",
        badge: "Lüks İpli & Yaldızlı",
        reason: "Gümüş, telkari ve hediyelik eşya mağazaları için prestijli taşıma çantaları."
      },
      {
        name: "Kartvizit Baskı",
        slug: "/kartvizit",
        badge: "350gr Kabartma Laklı",
        reason: "Mardinli iş insanları ve turizm işletmecileri için lüks dokulu kurumsal kartvizitler."
      },
      {
        name: "Broşür ve Katalog",
        slug: "/brosur",
        badge: "135gr Kuşe",
        reason: "Turizm acenteleri ve oteller için tarihi yerleri ve hizmetleri tanıtan canlı renkli broşürler."
      }
    ],
    shippingText: "Mardin kargolarımız İstanbul Topkapı'dan çıkış yaparak ortalama 48 saat içerisinde Artuklu, Kızıltepe, Midyat ve tüm ilçelerdeki adresinize ulaşır.",
    businessNeedsText: "Mardin'deki üretici ve esnaflara doğrudan fabrika fiyat tarifesi uygulayarak matbaa ve ambalaj masraflarında ciddi tasarruf sağlıyoruz.",
    faq: [
      {
        question: "Mardin'e kargo teslimatı kaç günde yapılıyor?",
        answer: "Baskı işlemleri tamamlanan ürünler İstanbul'dan kargoya verilip ortalama 48 saat içinde Mardin adresinize teslim edilir."
      },
      {
        question: "Sabun ve badem şekeri için özel boyutta kutu imal edebilir misiniz?",
        answer: "Evet, ürünlerinizin ebatlarına tam uyumlu özel bıçak kesimli karton kutu üretimi gerçekleştirmekteyiz."
      },
      {
        question: "Mardin'de doğrudan şubeniz bulunmakta mıdır?",
        answer: "Hayır, fabrikamız İstanbul Topkapı'da yer almakta ve tüm Güneydoğu Anadolu'ya kargo teslimatlı hizmet sunulmaktadır."
      },
      {
        question: "Telkari ve takı mağazaları için küçük karton poşet yapıyor musunuz?",
        answer: "Evet, gümüş ve takı sunumlarına uygun minyatür ebatlı ipli lüks karton poşet üretimi yapıyoruz."
      },
      {
        question: "Baskı onayı nasıl alınıyor?",
        answer: "Hazırlanan grafik çalışma WhatsApp üzerinden ücretsiz PDF prova olarak iletilir ve onayınızın ardından üretime başlanır."
      }
    ]
  },

  "bitlis-matbaa": {
    plateCode: 13,
    name: "Bitlis",
    slug: "bitlis-matbaa",
    metaTitle: "Bitlis Matbaa | Kartvizit, Broşür ve Kutu Baskısı",
    metaDescription: "İstanbul Topkapı tesisimizden Bitlis Tatvan, Ahlat, Güroymak ve Hizan işletmelerine özel kartvizit, broşür, etiket, kutu, magnet ve koçanlı makbuz baskısı.",
    h1: "Bitlis ve Tatvan Matbaa Baskı Çözümleri",
    heroText: "Tatvan, Ahlat, Güroymak, Hizan ve Bitlis merkezdeki tekstil, gıda, turizm ve perakende işletmelerine özel matbaa imalatı.",
    intro: "Bitlis ili ve özellikle Van Gölü kıyısındaki Tatvan ile tarihi Ahlat ilçeleri; gıda paketleme, tekstil imalatı, tarihi turizm, otelcilik ve ticaret alanında sürekli büyüyen bir potansiyele sahiptir. İşletmelerin kurumsal kimlik evrakları, etiket ve ambalaj gereksinimleri profesyonel baskı kalitesi gerektirir. Mavi Basım olarak Bitlis ve ilçelerindeki işletmelere, İstanbul Topkapı'daki fabrikamızda ürettiğimiz matbaa çözümlerini korumalı paketlerde kargo ile ulaştırıyoruz.",
    districtsIntro: "Bitlis genelinde yer alan tüm ilçe ve beldelere güvenli sevkiyat gerçekleştirmekteyiz:",
    districts: ["Tatvan", "Ahlat", "Güroymak", "Hizan", "Bitlis Merkez", "Mutki", "Adilcevaz"],
    sectors: [
      {
        title: "Tatvan Ticaret ve Hizmet Sektörü",
        description: "Tatvan'daki oteller, restoranlar ve mağazalar için Amerikan servisler, menüler, broşürler ve karton poşetler üretiyoruz."
      },
      {
        title: "Ahlat Kültür Turizmi ve El Sanatları",
        description: "Ahlat bastonu, çini ve tarihi turizm tesisleri için tanıtım broşürleri, özel kutular ve hediye etiketleri hazırlıyoruz."
      },
      {
        title: "Bitlis Balı ve Yöresel Gıda Üreticileri",
        description: "Meşhur Bitlis karakovan balı ve ceviz imalatçıları için sızdırmaz cam kavanoz etiketleri ve ambalaj kutuları basıyoruz."
      },
      {
        title: "Tekstil ve Konfeksiyon Tesisleri",
        description: "Tekstil atölyeleri için beden etiketleri, karton ürün sallama kartları ve koli baskı ürünleri üretiyoruz."
      },
      {
        title: "Eşya ve İnşaat İşletmeleri",
        description: "Müteahhitlik ve ticaret firmaları için cepli dosyalar, antetli kağıtlar, kartvizitler ve makbuz koçanları hazırlıyoruz."
      }
    ],
    featuredProducts: [
      {
        name: "Kartvizit Baskı",
        slug: "/kartvizit",
        badge: "350gr Mat Selefonlu",
        reason: "Tatvan ve Bitlisli tüccarlar için saygınlık kazandıran kabartma laklı kaliteli kartvizitler."
      },
      {
        name: "Broşür ve El İlanı",
        slug: "/brosur",
        badge: "135gr Kuşe",
        reason: "Mağaza ve hizmet tanıtımlarında halka hızlı ulaşım sağlayan canlı renkli broşürler."
      },
      {
        name: "Gıda ve Bal Etiketi",
        slug: "/etiket",
        badge: "PP Opak Su Geçirmez",
        reason: "Bitlis balı kavanozlarında yırtılmayan, yapışkanı kuvvetli plastik folyo etiketler."
      },
      {
        name: "Karton Ambalaj Kutusu",
        slug: "/kutu",
        badge: "Özel Bıçak Kesimli",
        reason: "Yöresel gıda ve hediye sunumlarında koruyucu ve estetik karton ambalajlar."
      },
      {
        name: "Buzdolabı Magneti",
        slug: "/magnet",
        badge: "0.50mm Mıknatıs",
        reason: "Lokanta ve paket servis işletmeleri için evlerde kalıcı reklam sağlayan magnetler."
      },
      {
        name: "Tahsilat ve Sipariş Fişi",
        slug: "/makbuz-ve-formlar",
        badge: "Oto-Kopyalı Numaratörlü",
        reason: "Resmi takiplerde kolaylık sağlayan kendinden karbonlu ciltli koçanlar."
      }
    ],
    shippingText: "Bitlis ve Tatvan kargolarımız İstanbul Topkapı'dan yola çıkarak ortalama 48-72 saat içerisinde adrese teslim edilmektedir.",
    businessNeedsText: "Bitlis'teki işletmelere aracısız üretici fiyat tarifesi sunarak matbaa masraflarını en aza indiriyoruz.",
    faq: [
      {
        question: "Tatvan ve Ahlat'a matbaa kargo teslimatı kaç gün sürer?",
        answer: "Baskısı biten siparişleriniz kargoya verildikten sonra ortalama 48-72 saat içinde teslim edilmektedir."
      },
      {
        question: "Bitlis balı için kavanoz etiketi basıyor musunuz?",
        answer: "Evet, bal kavanozlarına uygun nemden etkilenmeyen yapışkanlı PP opak etiket basıyoruz."
      },
      {
        question: "Bitlis'te fiziki şubeniz var mı?",
        answer: "Üretim tesisimiz İstanbul Topkapı'da bulunmakta, Bitlis il geneline kargo ile gönderim yapılmaktadır."
      },
      {
        question: "Baskı öncesinde PDF onay süreci nasıl işler?",
        answer: "Tasarımlarınız WhatsApp üzerinden ücretsiz PDF prova olarak iletilir ve onay vermenizle baskı başlar."
      },
      {
        question: "Oto-kopyalı sipariş fişlerinde numaratör basımı yapılıyor mu?",
        answer: "Evet, sipariş fişi ve makbuz koçanlarına sıra numaratör baskısı uygulanmaktadır."
      }
    ]
  },

  "balikesir-matbaa": {
    plateCode: 10,
    name: "Balıkesir",
    slug: "balikesir-matbaa",
    metaTitle: "Balıkesir Matbaa | Etiket, Gıda Kutusu ve Broşür Baskı",
    metaDescription: "İstanbul Topkapı tesisimizden Balıkesir Edremit, Ayvalık, Bandırma ve Gönen zeytin, gıda, turizm ve tarım işletmelerine etiket, kutu, broşür ve kartvizit.",
    h1: "Balıkesir Matbaa, Etiket ve Ambalaj Baskısı",
    heroText: "Altıeylül, Karesi, Bandırma, Edremit, Ayvalık ve Gönen bölgesindeki zeytin, gıda, turizm ve sanayi tesislerine doğrudan fabrika üretimi.",
    intro: "Balıkesir; Edremit Körfezi'nin zeytin ve zeytinyağı devleri, Ayvalık ve Burhaniye turizm tesisleri, Bandırma sanayisi ve Gönen tarım-gıda entegre tesisleriyle Türkiye'nin en verimli üretim merkezlerinden biridir. Ürün etiketinin kalitesi ve ambalajın estetiği zeytinyağı ve gıda markalarının raftaki gücünü belirler. Mavi Basım olarak Balıkesir'deki üretici ve tüccarlara İstanbul Topkapı'daki üretim tesislerimizde basılan etiket, kutu, katalog ve basılı evrakları hızlı sevkiyatla sunuyoruz.",
    districtsIntro: "Balıkesir'in sanayi ve turizm odaklı tüm ilçelerine düzenli kargo sevk etmekteyiz:",
    districts: ["Altıeylül", "Karesi", "Bandırma", "Edremit", "Gönen", "Ayvalık", "Burhaniye", "Susurluk"],
    sectors: [
      {
        title: "Zeytin ve Zeytinyağı Üreticileri (Edremit & Ayvalık)",
        description: "Körfez zeytinyağı markaları için yağdan etkilenmeyen altın varaklı PP etiketler, teneke kutu giydirme yapışkanları ve cam şişe etiketleri üretiyoruz."
      },
      {
        title: "Gıda ve Mandıra Sanayii (Gönen & Susurluk)",
        description: "Gönen ve Susurluk peynir, höşmerim ve et entegre tesisleri için gıda onaylı ambalaj kutuları ve vakum etiketleri hazırlıyoruz."
      },
      {
        title: "Turizm, Otel ve Restoranlar (Ayvalık & Akçay)",
        description: "Cunda ve Ayvalık otelleri ile balık restoranları için lüks Amerikan servisler, menüler, broşürler ve magnetler üretiyoruz."
      },
      {
        title: "Bandırma Sanayi ve Lojistik Tesisleri",
        description: "Liman kenti Bandırma imalatçıları için koli etiketleri, ihracat kutuları, ürün katalogları ve sevk makbuzları basıyoruz."
      }
    ],
    featuredProducts: [
      {
        name: "Zeytinyağı ve Şişe Etiketi",
        slug: "/etiket",
        badge: "PP Opak & Yaldızlı",
        reason: "Edremit ve Ayvalık zeytinyağı şişelerinde yağdan çözünmeyen, altın yaldız detaylı etiketler."
      },
      {
        name: "Gıda Ambalaj Kutusu",
        slug: "/kutu",
        badge: "Karton Özel Bıçaklı",
        reason: "Peynir, höşmerim ve zeytin sunumlarında markaya prestij katan özel kesim kutular."
      },
      {
        name: "Karton Çanta",
        slug: "/karton-canta",
        badge: "Lüks İpli & Bristol",
        reason: "Zeytinyağı ve yöresel ürün satış mağazaları için taşıma gücü yüksek baskılı karton poşetler."
      },
      {
        name: "Amerikan Servis & Menü",
        slug: "/amerikan-servis",
        badge: "Kraft / Kuşe Leke Tutmaz",
        reason: "Ayvalık ve Cunda balık restoranları için estetik ve hijyenik masa üstü servis kağıtları."
      },
      {
        name: "Broşür ve Katalog",
        slug: "/brosur",
        badge: "135gr / 170gr Kuşe",
        reason: "Turizm tesisleri ve gıda markaları için canlı renklerle hazırlanmış tanıtım broşürleri."
      },
      {
        name: "Kartvizit Baskı",
        slug: "/kartvizit",
        badge: "350gr Kabartma Laklı",
        reason: "Balıkesirli sanayici ve tüccarlar için prestijli kurumsal kartvizit üretimi."
      }
    ],
    shippingText: "Balıkesir ve ilçelerine giden kargolarımız İstanbul Topkapı'dan yola çıkarak komşu lokasyon avantajıyla ortalama 24 saat içerisinde adrese teslim edilir.",
    businessNeedsText: "Balıkesir zeytin ve gıda üreticilerine aracısız fabrikadan doğrudan etiket ve kutu tedariği sağlayarak matbaa harcamalarını düşürüyoruz.",
    faq: [
      {
        question: "Balıkesir ve Edremit Körfezi'ne kargo teslimat süresi nedir?",
        answer: "İstanbul Topkapı'dan çıkan kargolar Balıkesir merkez, Edremit, Bandırma ve Ayvalık'a genellikle 24 saat içinde ulaşmaktadır."
      },
      {
        question: "Zeytinyağı şişesi etiketleri yağ ile temas ettiğinde sökülür mü?",
        answer: "Hayır, üretimlerimizde yağ ve sıvıya tam dayanıklı plastik PP opak malzeme ve kuvvetli yapışkan kullanılmaktadır."
      },
      {
        question: "Balıkesir'de fiziki fabrikanız veya şubeniz var mı?",
        answer: "Fabrikamız İstanbul Topkapı matbaacılar sitesindedir. Balıkesir geneline kargo ile hızlı sevkiyat yapılmaktadır."
      },
      {
        question: "Zeytinyağı kutularına altın varak yaldız uygulanabiliyor mu?",
        answer: "Evet, karton kutu ve etiketlerin üzerine lüks görünüm sağlayan altın ve gümüş varak yaldız uygulaması yapıyoruz."
      },
      {
        question: "Baskı provası veriyor musunuz?",
        answer: "WhatsApp üzerinden ücretsiz yüksek çözünürlüklü dijital PDF prova iletilip onayınız alındıktan sonra üretime geçilir."
      }
    ]
  },

  "canakkale-matbaa": {
    plateCode: 17,
    name: "Çanakkale",
    slug: "canakkale-matbaa",
    metaTitle: "Çanakkale Matbaa | Etiket, Menü ve Broşür Baskı",
    metaDescription: "İstanbul Topkapı tesisimizden Çanakkale Biga, Ezine, Gelibolu, Bozcaada ve Ayvacık işletmelerine zeytinyağı etiketi, peynir kutusu, menü ve broşür.",
    h1: "Çanakkale Matbaa, Etiket ve Turizm Baskıları",
    heroText: "Biga, Çan, Gelibolu, Ezine, Ayvacık ve Bozcaada bölgesindeki tarım, gıda, tarihi turizm ve restoran tesislerine özel matbaa imalatı.",
    intro: "Tarihi mirası ve zengin tarımsal üretimiyle Çanakkale; meşhur Ezine peyniri üreticileri, zeytinyağı imalathaneleri, Gelibolu tarihi turizm tesisleri, Bozcaada ve Assos otelleri ile Biga sanayisine ev sahipliği yapar. Ürün etiketinin sağlamlığı ve broşürlerin çekiciliği bölge ticaretinin temel taşıdır. Mavi Basım olarak Çanakkale'deki üretici ve turizmcilere İstanbul Topkapı'daki tesisimizde ürettiğimiz etiket, kutu, menü, broşür ve kartvizitleri güvenle sevk ediyoruz.",
    districtsIntro: "Çanakkale il merkezi, adalar ve tüm ilçelere emniyetli sevkiyat gerçekleştirmekteyiz:",
    districts: ["Merkez", "Biga", "Çan", "Gelibolu", "Yenice", "Ayvacık", "Ezine", "Lapseki"],
    sectors: [
      {
        title: "Ezine Peyniri ve Mandıra Üreticileri",
        description: "Coğrafi işaretli Ezine peyniri imalatçıları için vakum altı etiketler, özel karton ambalaj kutuları ve koli bandı baskıları üretiyoruz."
      },
      {
        title: "Tarihi Gelibolu ve Kültür Turizmi",
        description: "Şehitlik ve Gelibolu turları düzenleyen acenteler için bilgilendirme broşürleri, haritalar, biletler ve otel evrakları hazırlıyoruz."
      },
      {
        title: "Bozcaada & Assos Otelleri ve Restoranlar",
        description: "Ada ve sahil otelleri ile balık restoranları için şık Amerikan servisler, leke tutmaz menüler, broşürler ve magnetler basıyoruz."
      },
      {
        title: "Biga & Çan Sanayi ve Seramik sektörü",
        description: "Biga sanayisi ve Çan seramik ambalajları için dayanıklı koli etiketleri, kataloglar ve sevkiyat irsaliyeleri basıyoruz."
      }
    ],
    featuredProducts: [
      {
        name: "Ezine Peynir & Gıda Etiketi",
        slug: "/etiket",
        badge: "PP Opak Su Geçirmez",
        reason: "Ezine peyniri ve zeytinyağı ambalajlarında nemden etkilenmeyen yapışkanlı etiketler."
      },
      {
        name: "Peynir ve Gıda Kutusu",
        slug: "/kutu",
        badge: "Karton Özel Bıçaklı",
        reason: "Gıda sunumunu hijyenik ve prestijli kılan özel kesim karton ambalaj kutuları."
      },
      {
        name: "Amerikan Servis & Menü",
        slug: "/amerikan-servis",
        badge: "Kraft / Selefonlu Kuşe",
        reason: "Assos ve Bozcaada restoranlarında hijyen sağlayan özel baskılı Amerikan servisler."
      },
      {
        name: "Turizm Broşürü",
        slug: "/brosur",
        badge: "135gr Kuşe Katlamalı",
        reason: "Tarihi Gelibolu ve ada turları için canlı renkli bilgilendirme broşürleri."
      },
      {
        name: "Karton Çanta",
        slug: "/karton-canta",
        badge: "Lüks İpli & Bristol",
        reason: "Yöresel gıda ve hediyelik satışlarında müşterilerin taşıdığı baskılı karton poşetler."
      },
      {
        name: "Kartvizit Baskı",
        slug: "/kartvizit",
        badge: "350gr Kabartma Laklı",
        reason: "Çanakkaleli işletmeciler ve sanayiciler için saygın kurumsal kartvizitler."
      }
    ],
    shippingText: "Çanakkale ve ilçelerine kargolarımız İstanbul Topkapı'dan çıkarak yaklaşık 24 saat içinde adrese teslim ulaştırılır.",
    businessNeedsText: "Çanakkale üreticilerine fabrikadan doğrudan uygun fiyatlı etiket ve matbaa çözümleri sunarak bütçe tasarrufu sağlıyoruz.",
    faq: [
      {
        question: "Çanakkale ve Ezine'ye kargo süresi ne kadardır?",
        answer: "İstanbul Topkapı tesisimizden kargoya verilen ürünler Çanakkale merkez ve Ezine'ye genellikle 24 saat içinde teslim edilir."
      },
      {
        question: "Ezine peyniri teneke ve vakum etiketleri neme dayanıklı mıdır?",
        answer: "Evet, buzdolabı ve nem koşullarına tam dayanıklı PP opak plastik etiket malzemesi kullanılmaktadır."
      },
      {
        question: "Çanakkale'de fiziki şubeniz bulunuyor mu?",
        answer: "Üretimimiz İstanbul Topkapı matbaacılar sitesindeki tesisimizdedir, Çanakkale'ye kargo ile sevk yapılır."
      },
      {
        question: "Bozcaada restoranları için özel ebat Amerikan servis yapılır mı?",
        answer: "Evet, masalarınıza tam uyacak özel boyutlarda Amerikan servis baskısı gerçekleştiriyoruz."
      },
      {
        question: "Baskı öncesinde onay süreci nasıl ilerler?",
        answer: "Tasarımınız WhatsApp ile ücretsiz PDF prova olarak sunulur ve yazılı onayınızın ardından üretime başlanır."
      }
    ]
  },

  "adana-matbaa": {
    plateCode: 1,
    name: "Adana",
    slug: "adana-matbaa",
    metaTitle: "Adana’ya Kargo ile Matbaa ve Ambalaj Baskı | Mavi Basım",
    metaDescription: "Adana’daki işletmeler için broşür, etiket, kutu, Amerikan servis, kartvizit ve form baskı seçeneklerini inceleyin. İstanbul Topkapı’dan kargo ile teklif alın.",
    h1: "Adana için Matbaa ve Ambalaj Baskı Çözümleri",
    heroText: "Seyhan, Yüreğir, Çukurova, Sarıçam, Ceyhan, Kozan ve Adana’nın diğer ilçelerindeki işletmeler; broşür, etiket, kutu, Amerikan servis, kartvizit, katalog ve form baskı seçeneklerini inceleyerek teklif alabilir.",
    intro: "Adana’daki restoranlar, paket servis işletmeleri, tarım ve paketleme firmaları, lojistik şirketleri ile kurumsal işletmeler için farklı baskı ihtiyaçları oluşabilir. Ürün ölçüsü, adet, kullanım amacı, tasarım dosyası ve baskı sonrası uygulamalara göre uygun seçenekler değerlendirilir. Mavi Basım, İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktasından Adana’ya kargo ile baskı çözümleri sunar.",
    districtsIntro: "Adana il merkezi ve çevre ilçelerindeki işletmeler için kargo ile baskı çözümleri planlanmaktadır:",
    districts: ["Seyhan", "Yüreğir", "Çukurova", "Sarıçam", "Ceyhan", "Kozan", "Karataş"],
    sectors: [
      {
        title: "Restoran ve Paket Servis İşletmeleri",
        description: "Restoranlar ve paket servis işletmeleri için Amerikan servis, menü, broşür, etiket, magnet ve sipariş fişi gibi ürünler kullanım amacına göre değerlendirilebilir."
      },
      {
        title: "Tarım, Paketleme ve Gıda Ticareti",
        description: "Tarım, paketleme ve gıda ticareti yapan işletmeler için kutu, koli etiketi, ürün etiketi, katalog ve tanıtım materyalleri; ürünün kullanım koşulları dikkate alınarak planlanabilir."
      },
      {
        title: "Sanayi ve Kurumsal İşletmeler",
        description: "Sanayi ve kurumsal işletmeler için kartvizit, katalog, dosya, antetli kâğıt, etiket ve kurumsal form ürünleri hazırlanabilir."
      },
      {
        title: "Lojistik ve Araç Odaklı İşletmeler",
        description: "Lojistik ve araç odaklı işletmeler için sevk süreçlerinde kullanılan form, etiket, araç kiralama evrakı, oto paspas ve tanıtım ürünleri incelenebilir."
      }
    ],
    featuredProducts: [
      {
        name: "Amerikan Servis Baskı",
        slug: "/amerikan-servis",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Restoran ve Paket Servis",
        reason: "Restoran ve paket servis işletmeleri için baskılı Amerikan servis seçeneklerini inceleyin.",
        imageSrc: "/images/amerikan-servis/amerikan-servis-baski.webp",
        imageAlt: "Baskılı Amerikan Servis ve Masa Servis Kağıdı"
      },
      {
        name: "Ürün ve Koli Etiketi",
        slug: "/etiket",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Tarım ve Paketleme",
        reason: "Tarım, paketleme ve sanayi ürünleri için etiket seçeneklerini kullanım alanına göre inceleyin.",
        imageSrc: "/images/etiket/yapiskanli-etiket-baski.webp",
        imageAlt: "Yapışkanlı Kuşe ve Ambalaj Etiketi"
      },
      {
        name: "Buzdolabı Magneti",
        slug: "/magnet",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Yerel Tanıtım",
        reason: "Paket servis ve yerel tanıtım süreçleri için magnet çözümleri.",
        imageSrc: "/images/magnet/magnet-baski.webp",
        imageAlt: "Buzdolabı ve Paket Servis Tanıtım Magneti"
      },
      {
        name: "Ambalaj Kutusu",
        slug: "/kutu",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Ambalaj Çözümleri",
        reason: "Ürününüzün boyut ve dayanım gereksinimlerine göre karton ambalaj ve kutu seçenekleri.",
        imageSrc: "/images/kutu/urun-kutusu-baski.webp",
        imageAlt: "Özel Tasarım Karton Ürün Kutusu ve Ambalaj"
      },
      {
        name: "Kartvizit Baskı",
        slug: "/kartvizit",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal İletişim",
        reason: "Kurumsal kimlik ve ticari iletişim için kartvizit alternatifleri.",
        imageSrc: "/images/kartvizit/kartvizit-baski.webp",
        imageAlt: "Mat Selefonlu Kurumsal Kartvizit"
      },
      {
        name: "Broşür Baskı",
        slug: "/brosur",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Tanıtım Baskıları",
        reason: "Ürün ve hizmet tanıtımı için farklı ebat ve katlama seçeneklerinde broşürleri inceleyin.",
        imageSrc: "/images/brosur/brosur-baski-fiyatlari.webp",
        imageAlt: "A4 ve A5 Tanıtım Broşürü Baskısı"
      },
      {
        name: "Form ve Makbuz Baskıları",
        slug: "/makbuz-ve-formlar",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "İşletme Evrakları",
        reason: "Sipariş, teslimat ve muhasebe takibi için ciltli veya koçanlı form çözümleri.",
        imageSrc: "/images/siparis-fisi/siparis-fisi-basimi.webp",
        imageAlt: "Otokopili Kendinden Karbonlu Sipariş Fişi ve Form"
      },
      {
        name: "Katalog ve Dergi Baskı",
        slug: "/kataloglar",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal Tanıtım",
        reason: "Ürün, hizmet ve kurumsal tanıtım içerikleri için katalog ve dergi baskı seçeneklerini inceleyin.",
        imageSrc: "/images/katalog/katalog-baski-fiyatlari.webp",
        imageAlt: "Kurumsal Tanıtım Kataloğu ve Dergi Baskısı"
      },
      {
        name: "Oto Paspas Baskı",
        slug: "/oto-paspas",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Araç ve Servis İşletmeleri",
        reason: "Araç servisleri, oto yıkama noktaları ve filo işletmeleri için baskılı oto paspas seçeneklerini inceleyin.",
        imageSrc: "/images/oto-paspas/oto-paspas-baski-fiyatlari.webp",
        imageAlt: "Oto Yıkama ve Servis İçin Baskılı Kağıt Oto Paspası"
      }
    ],
    shippingText: "Adana’ya gönderim planı; ürün, adet, baskı sonrası işlemler ve sipariş onayına göre teklif aşamasında netleştirilir.",
    businessNeedsText: "Sipariş öncesinde ürün, adet, dosya durumu ve üretim planı değerlendirilir. Üretim ve kargo planı; ürünün özelliklerine, onay sürecine ve seçilen hizmetlere göre teklif aşamasında netleştirilir.",
    faq: [
      {
        question: "Adana’da fiziksel şubeniz var mı?",
        answer: "Adana’da fiziksel şubemiz bulunmuyor. İstanbul Topkapı’daki hizmet ve koordinasyon noktamızdan sipariş sürecini uzaktan yönetiyor, Adana’ya kargo ile gönderim yapıyoruz."
      },
      {
        question: "Adana’ya gönderim süresi nasıl belirlenir?",
        answer: "Gönderim planı; ürünün türü, adet, baskı sonrası uygulamalar, dosya onayı ve kargo koşullarına göre teklif aşamasında netleştirilir."
      },
      {
        question: "Baskı öncesinde PDF prova paylaşılır mı?",
        answer: "Baskıya hazır dosyalarda yerleşim ve metin kontrolü için uygun işlerde PDF prova paylaşılabilir. PDF prova fiziksel baskı rengini ve malzeme dokusunu birebir garanti etmez."
      },
      {
        question: "Restoran ve paket servis işletmeleri hangi ürünleri inceleyebilir?",
        answer: "Amerikan servis, menü, broşür, magnet, etiket, kutu ve sipariş fişi gibi ürün seçenekleri ihtiyaca göre incelenebilir."
      },
      {
        question: "Etiket veya ambalaj seçiminde nelere dikkat edilir?",
        answer: "Kullanım alanı, yüzey, temas koşulları, nem, sıcaklık, ürün ağırlığı ve uygulama yöntemi paylaşılır; uygun malzeme seçeneği buna göre değerlendirilir."
      }
    ]
  },

  "mersin-matbaa": {
    plateCode: 33,
    name: "Mersin",
    slug: "mersin-matbaa",
    metaTitle: "Mersin’e Kargo ile Matbaa ve Ambalaj Baskı | Mavi Basım",
    metaDescription: "Mersin’deki işletmeler için broşür, katalog, etiket, kutu, Amerikan servis, kartvizit ve form baskı seçeneklerini inceleyin. İstanbul Topkapı’dan kargo ile teklif alın.",
    h1: "Mersin için Matbaa ve Ambalaj Baskı Çözümleri",
    heroText: "Akdeniz, Toroslar, Yenişehir, Mezitli, Tarsus, Erdemli, Silifke ve Mersin’in diğer ilçelerindeki işletmeler; broşür, katalog, etiket, kutu, Amerikan servis, kartvizit ve form baskı seçeneklerini inceleyerek teklif alabilir.",
    intro: "Mersin’deki restoranlar, paket servis işletmeleri, liman ve lojistik firmaları, tarım ve paketleme işletmeleri, perakende firmaları ile kurumsal işletmeler için farklı baskı ihtiyaçları oluşabilir. Ürün ölçüsü, adet, kullanım amacı, tasarım dosyası ve baskı sonrası uygulamalara göre seçenekler değerlendirilir. Mavi Basım, İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktasından Mersin’e kargo ile baskı çözümleri sunar.",
    districtsIntro: "Mersin il merkezi ve çevre ilçelerdeki işletmeler için sipariş ve kargo planı, ürünün özelliklerine ve onay sürecine göre oluşturulur.",
    districts: ["Akdeniz", "Toroslar", "Yenişehir", "Mezitli", "Tarsus", "Erdemli", "Silifke"],
    sectors: [
      {
        title: "Restoran ve Paket Servis İşletmeleri",
        description: "Amerikan servis, menü, broşür, magnet, etiket ve sipariş fişi gibi ürünler kullanım amacına göre değerlendirilebilir."
      },
      {
        title: "Tarım, Paketleme ve Gıda Ticareti",
        description: "Kutu, koli etiketi, ürün etiketi, katalog ve tanıtım materyalleri; ürünün kullanım koşulları dikkate alınarak planlanabilir."
      },
      {
        title: "Liman, Lojistik ve Ticari İşletmeler",
        description: "Sevk süreçlerinde kullanılan form, etiket, kartvizit, katalog ve kurumsal baskı ürünleri incelenebilir."
      },
      {
        title: "Perakende ve Kurumsal İşletmeler",
        description: "Kartvizit, broşür, katalog, dosya, etiket ve kurumsal form ürünleri hazırlanabilir."
      },
      {
        title: "Araç, Servis ve Filo İşletmeleri",
        description: "Oto paspas, araç kiralama evrakı, form, etiket ve tanıtım ürünleri ihtiyaçlara göre değerlendirilebilir."
      }
    ],
    featuredProducts: [
      {
        name: "Amerikan Servis Baskı",
        slug: "/amerikan-servis",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Restoran ve Paket Servis",
        reason: "Restoran ve paket servis işletmeleri için baskılı Amerikan servis seçeneklerini inceleyin.",
        imageSrc: "/images/amerikan-servis/amerikan-servis-baski.webp",
        imageAlt: "Baskılı Amerikan Servis ve Masa Servis Kağıdı"
      },
      {
        name: "Ürün ve Koli Etiketi",
        slug: "/etiket",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Tarım ve Paketleme",
        reason: "Tarım, paketleme ve gıda ticareti için etiket seçeneklerini inceleyin.",
        imageSrc: "/images/etiket/yapiskanli-etiket-baski.webp",
        imageAlt: "Yapışkanlı Kuşe ve Ambalaj Etiketi"
      },
      {
        name: "Ambalaj Kutusu",
        slug: "/kutu",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Ambalaj Çözümleri",
        reason: "Ürününüzün boyut ve dayanım gereksinimlerine göre karton ambalaj ve kutu seçeneklerini inceleyin.",
        imageSrc: "/images/kutu/urun-kutusu-baski.webp",
        imageAlt: "Özel Tasarım Karton Ürün Kutusu ve Ambalaj"
      },
      {
        name: "Broşür Baskı",
        slug: "/brosur",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Tanıtım Baskıları",
        reason: "Ürün ve hizmet tanıtımı için farklı ebat ve katlama seçeneklerinde broşürleri inceleyin.",
        imageSrc: "/images/brosur/brosur-baski-fiyatlari.webp",
        imageAlt: "A4 ve A5 Tanıtım Broşürü Baskısı"
      },
      {
        name: "Katalog ve Dergi Baskı",
        slug: "/kataloglar",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal Tanıtım",
        reason: "Ürün, hizmet ve kurumsal tanıtım içerikleri için katalog ve dergi baskı seçeneklerini inceleyin.",
        imageSrc: "/images/katalog/katalog-baski-fiyatlari.webp",
        imageAlt: "Kurumsal Tanıtım Kataloğu ve Dergi Baskısı"
      },
      {
        name: "Kartvizit Baskı",
        slug: "/kartvizit",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal İletişim",
        reason: "Kurumsal kimlik ve ticari iletişim için kartvizit alternatiflerini inceleyin.",
        imageSrc: "/images/kartvizit/kartvizit-baski.webp",
        imageAlt: "Mat Selefonlu Kurumsal Kartvizit"
      },
      {
        name: "Buzdolabı Magneti",
        slug: "/magnet",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Yerel Tanıtım",
        reason: "Restoran, paket servis ve yerel tanıtım çalışmaları için magnet seçeneklerini inceleyin.",
        imageSrc: "/images/magnet/magnet-baski.webp",
        imageAlt: "Buzdolabı ve Paket Servis Tanıtım Magneti"
      },
      {
        name: "Oto Paspas Baskı",
        slug: "/oto-paspas",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Araç ve Servis İşletmeleri",
        reason: "Araç servisleri, oto yıkama noktaları ve filo işletmeleri için baskılı oto paspas seçeneklerini inceleyin.",
        imageSrc: "/images/oto-paspas/oto-paspas-baski-fiyatlari.webp",
        imageAlt: "Oto Yıkama ve Servis İçin Baskılı Kağıt Oto Paspası"
      },
      {
        name: "Form ve Makbuz Baskıları",
        slug: "/makbuz-ve-formlar",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "İşletme Evrakları",
        reason: "Sipariş, teslimat ve muhasebe takibi için ciltli veya koçanlı form çözümlerini inceleyin.",
        imageSrc: "/images/siparis-fisi/siparis-fisi-basimi.webp",
        imageAlt: "Otokopili Kendinden Karbonlu Sipariş Fişi ve Form"
      }
    ],
    shippingText: "Mersin’e gönderim planı; ürün, adet, baskı sonrası işlemler ve sipariş onayına göre teklif aşamasında netleştirilir.",
    businessNeedsText: "Daha net teklif için ürün türünü, ölçüyü, adedi, baskı yönünü, varsa malzeme veya baskı sonrası tercihini ve tasarım dosyanızın durumunu paylaşabilirsiniz.",
    faq: [
      {
        question: "Mersin’de fiziksel şubeniz var mı?",
        answer: "Mersin’de fiziksel şubemiz bulunmuyor. İstanbul Topkapı’daki hizmet ve koordinasyon noktamızdan sipariş sürecini uzaktan yönetiyor, Mersin’e kargo ile gönderim yapıyoruz."
      },
      {
        question: "Mersin’e gönderim süresi nasıl belirlenir?",
        answer: "Gönderim planı; ürünün türü, adet, baskı sonrası uygulamalar, dosya onayı ve kargo koşullarına göre teklif aşamasında netleştirilir."
      },
      {
        question: "Baskı öncesinde PDF prova paylaşılır mı?",
        answer: "Baskıya hazır dosyalarda yerleşim ve metin kontrolü için uygun işlerde PDF prova paylaşılabilir. PDF prova fiziksel baskı rengini ve malzeme dokusunu birebir garanti etmez."
      },
      {
        question: "Tarım ve paketleme işletmeleri hangi ürünleri inceleyebilir?",
        answer: "Kutu, ürün etiketi, koli etiketi, katalog, broşür ve tanıtım materyalleri ihtiyaca göre incelenebilir."
      },
      {
        question: "Liman ve lojistik işletmeleri için hangi baskı ürünleri uygundur?",
        answer: "Sevk ve iş takibi için form, etiket, kartvizit, katalog, oto paspas ve tanıtım ürünleri kullanım amacına göre değerlendirilebilir."
      }
    ]
  },

  "osmaniye-matbaa": {
    plateCode: 80,
    name: "Osmaniye",
    slug: "osmaniye-matbaa",
    metaTitle: "Osmaniye’ye Kargo ile Matbaa ve Ambalaj Baskı | Mavi Basım",
    metaDescription: "Osmaniye’deki işletmeler için broşür, katalog, etiket, kutu, Amerikan servis, kartvizit ve form baskı seçeneklerini inceleyin. İstanbul Topkapı’dan kargo ile teklif alın.",
    h1: "Osmaniye için Matbaa ve Ambalaj Baskı Çözümleri",
    heroText: "Merkez, Kadirli, Düziçi, Bahçe, Hasanbeyli, Sumbas, Toprakkale ve Osmaniye’nin diğer ilçelerindeki işletmeler; broşür, katalog, etiket, kutu, Amerikan servis, kartvizit ve form baskı seçeneklerini inceleyerek teklif alabilir.",
    intro: "Osmaniye’deki restoranlar, paket servis işletmeleri, tarım ve paketleme firmaları, ticari işletmeler, sanayi işletmeleri ve kurumsal firmalar için farklı baskı ihtiyaçları oluşabilir. Ürün ölçüsü, adet, kullanım amacı, tasarım dosyası ve baskı sonrası uygulamalara göre seçenekler değerlendirilir. Mavi Basım, İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktasından Osmaniye’ye kargo ile baskı çözümleri sunar.",
    districtsIntro: "Osmaniye il merkezi ve çevre ilçelerdeki işletmeler için sipariş ve kargo planı, ürünün özelliklerine ve onay sürecine göre oluşturulur.",
    districts: ["Merkez", "Kadirli", "Düziçi", "Bahçe", "Hasanbeyli", "Sumbas", "Toprakkale"],
    sectors: [
      {
        title: "Restoran ve Paket Servis İşletmeleri",
        description: "Amerikan servis, menü, broşür, magnet, etiket ve sipariş fişi gibi ürünler kullanım amacına göre değerlendirilebilir."
      },
      {
        title: "Tarım, Gıda ve Paketleme İşletmeleri",
        description: "Kutu, koli etiketi, ürün etiketi, katalog ve tanıtım materyalleri; ürünün kullanım koşulları dikkate alınarak planlanabilir."
      },
      {
        title: "Sanayi ve Ticari İşletmeler",
        description: "Kartvizit, katalog, dosya, etiket, broşür ve kurumsal form ürünleri incelenebilir."
      },
      {
        title: "Perakende ve Kurumsal İşletmeler",
        description: "Kartvizit, broşür, katalog, ambalaj kutusu, etiket ve tanıtım materyalleri ihtiyaçlara göre hazırlanabilir."
      },
      {
        title: "Araç, Servis ve Filo İşletmeleri",
        description: "Oto paspas, araç kiralama evrakı, form, etiket ve tanıtım ürünleri kullanım amacına göre değerlendirilebilir."
      }
    ],
    featuredProducts: [
      {
        name: "Amerikan Servis Baskı",
        slug: "/amerikan-servis",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Restoran ve Paket Servis",
        reason: "Restoran ve paket servis işletmeleri için baskılı Amerikan servis seçeneklerini inceleyin.",
        imageSrc: "/images/amerikan-servis/amerikan-servis-baski.webp",
        imageAlt: "Baskılı Amerikan Servis ve Masa Servis Kağıdı"
      },
      {
        name: "Ürün ve Koli Etiketi",
        slug: "/etiket",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Tarım ve Paketleme",
        reason: "Tarım, gıda ve paketleme işletmeleri için etiket seçeneklerini inceleyin.",
        imageSrc: "/images/etiket/yapiskanli-etiket-baski.webp",
        imageAlt: "Yapışkanlı Kuşe ve Ambalaj Etiketi"
      },
      {
        name: "Ambalaj Kutusu",
        slug: "/kutu",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Ambalaj Çözümleri",
        reason: "Ürününüzün boyut ve dayanım gereksinimlerine göre karton ambalaj ve kutu seçeneklerini inceleyin.",
        imageSrc: "/images/kutu/urun-kutusu-baski.webp",
        imageAlt: "Özel Tasarım Karton Ürün Kutusu ve Ambalaj"
      },
      {
        name: "Broşür Baskı",
        slug: "/brosur",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Tanıtım Baskıları",
        reason: "Ürün ve hizmet tanıtımı için farklı ebat ve katlama seçeneklerinde broşürleri inceleyin.",
        imageSrc: "/images/brosur/brosur-baski-fiyatlari.webp",
        imageAlt: "A4 ve A5 Tanıtım Broşürü Baskısı"
      },
      {
        name: "Katalog ve Dergi Baskı",
        slug: "/kataloglar",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal Tanıtım",
        reason: "Ürün, hizmet ve kurumsal tanıtım içerikleri için katalog ve dergi baskı seçeneklerini inceleyin.",
        imageSrc: "/images/katalog/katalog-baski-fiyatlari.webp",
        imageAlt: "Kurumsal Tanıtım Kataloğu ve Dergi Baskısı"
      },
      {
        name: "Kartvizit Baskı",
        slug: "/kartvizit",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal İletişim",
        reason: "Kurumsal kimlik ve ticari iletişim için kartvizit alternatiflerini inceleyin.",
        imageSrc: "/images/kartvizit/kartvizit-baski.webp",
        imageAlt: "Mat Selefonlu Kurumsal Kartvizit"
      },
      {
        name: "Buzdolabı Magneti",
        slug: "/magnet",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Yerel Tanıtım",
        reason: "Restoran, paket servis ve yerel tanıtım çalışmaları için magnet seçeneklerini inceleyin.",
        imageSrc: "/images/magnet/magnet-baski.webp",
        imageAlt: "Buzdolabı ve Paket Servis Tanıtım Magneti"
      },
      {
        name: "Oto Paspas Baskı",
        slug: "/oto-paspas",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Araç ve Servis İşletmeleri",
        reason: "Araç servisleri, oto yıkama noktaları ve filo işletmeleri için baskılı oto paspas seçeneklerini inceleyin.",
        imageSrc: "/images/oto-paspas/oto-paspas-baski-fiyatlari.webp",
        imageAlt: "Oto Yıkama ve Servis İçin Baskılı Kağıt Oto Paspası"
      },
      {
        name: "Form ve Makbuz Baskıları",
        slug: "/makbuz-ve-formlar",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "İşletme Evrakları",
        reason: "Sipariş, teslimat ve muhasebe takibi için ciltli veya koçanlı form çözümlerini inceleyin.",
        imageSrc: "/images/siparis-fisi/siparis-fisi-basimi.webp",
        imageAlt: "Otokopili Kendinden Karbonlu Sipariş Fişi ve Form"
      }
    ],
    shippingText: "Osmaniye’ye gönderim planı; ürün, adet, baskı sonrası işlemler ve sipariş onayına göre teklif aşamasında netleştirilir.",
    businessNeedsText: "Daha net teklif için ürün türünü, ölçüyü, adedi, baskı yönünü, varsa malzeme veya baskı sonrası tercihini ve tasarım dosyanızın durumunu paylaşabilirsiniz.",
    faq: [
      {
        question: "Osmaniye’de fiziksel şubeniz var mı?",
        answer: "Osmaniye’de fiziksel şubemiz bulunmuyor. İstanbul Topkapı’daki hizmet ve koordinasyon noktamızdan sipariş sürecini uzaktan yönetiyor, Osmaniye’ye kargo ile gönderim yapıyoruz."
      },
      {
        question: "Osmaniye’ye gönderim süresi nasıl belirlenir?",
        answer: "Gönderim planı; ürünün türü, adet, baskı sonrası uygulamalar, dosya onayı ve kargo koşullarına göre teklif aşamasında netleştirilir."
      },
      {
        question: "Baskı öncesinde PDF prova paylaşılır mı?",
        answer: "Baskıya hazır dosyalarda yerleşim ve metin kontrolü için uygun işlerde PDF prova paylaşılabilir. PDF prova fiziksel baskı rengini ve malzeme dokusunu birebir garanti etmez."
      },
      {
        question: "Tarım ve paketleme işletmeleri hangi ürünleri inceleyebilir?",
        answer: "Kutu, ürün etiketi, koli etiketi, katalog, broşür ve tanıtım materyalleri ihtiyaca göre incelenebilir."
      },
      {
        question: "Sanayi ve ticari işletmeler için hangi baskı ürünleri uygundur?",
        answer: "Etiket, katalog, kartvizit, form, broşür, dosya ve ambalaj ürünleri kullanım amacına göre değerlendirilebilir."
      }
    ]
  },

  "corum-matbaa": {
    plateCode: 19,
    name: "Çorum",
    slug: "corum-matbaa",
    metaTitle: "Çorum Matbaa | Katalog, Etiket ve Kutu Baskısı",
    metaDescription: "İstanbul Topkapı fabrikamızdan Çorum Sungurlu, Osmancık, Alaca ve leblebi imalatçılarına ambalaj kutusu, etiket, katalog, kartvizit ve broşür baskısı.",
    h1: "Çorum Matbaa, Katalog ve Ambalaj Baskı Çözümleri",
    heroText: "Sungurlu, Osmancık, Alaca, İskilip ve Çorum merkezdeki makine sanayisi, leblebi imalatçıları ve gıda tesislerine özel matbaa üretimi.",
    intro: "Karadeniz'i İç Anadolu'ya bağlayan Çorum; meşhur Çorum leblebisi üreticileri, makine ve kiremit sanayisi, Osmancık pirinç işleme tesisleri ve gelişen ticaret kentiyle güçlü bir üretim altyapısına sahiptir. Leblebi ve gıda ambalaj kutuları ile sanayi katalogları bölge ekonomisinin vitrinidir. Mavi Basım olarak Çorum'daki sanayici ve esnaflara İstanbul Topkapı'daki modern fabrikamızda ürettiğimiz kutu, etiket, katalog ve evrakları hızlı sevkiyatla sevk ediyoruz.",
    districtsIntro: "Çorum merkez ve sanayisi gelişmiş tüm ilçelerine emniyetli sevkiyat sağlamaktayız:",
    districts: ["Sungurlu", "Osmancık", "Alaca", "İskilip", "Merkez", "Bayat"],
    sectors: [
      {
        title: "Leblebi ve Kuruyemiş Üreticileri",
        description: "Çorum leblebisi imalatçıları için pencere kesimli karton kutular, silindir kutu etiketleri ve hediye ambalajları üretiyoruz."
      },
      {
        title: "Makine ve Değirmen Sanayii",
        description: "Dünyaya ihracat yapan Çorum makine imalatçıları için lüks sert kapak kataloglar, teknik kullanım kılavuzları ve metal etiketler basıyoruz."
      },
      {
        title: "Osmancık Pirinç ve Gıda Tesisleri",
        description: "Pirinç ve bakliyat ambalajları için şeffaf yapışkanlı etiketler, koli kutuları ve marka broşürleri hazırlıyoruz."
      },
      {
        title: "Kiremit, Toprak Sanayii ve İnşaat",
        description: "Tuğla-kiremit fabrikaları için ürün tanıtım kartları, antetli kağıtlar, kartvizitler ve sevk irsaliye koçanları üretiyoruz."
      }
    ],
    featuredProducts: [
      {
        name: "Leblebi & Gıda Ambalaj Kutusu",
        slug: "/kutu",
        badge: "Pencereli Karton Kutu",
        reason: "Çorum leblebisi ve hediye gıdalarını şık ve dayanıklı biçimde sergileyen ambalaj kutuları."
      },
      {
        name: "Sanayi Ürün Kataloğu",
        slug: "/kataloglar",
        badge: "Tel Dikiş & Amerikan Cilt",
        reason: "Makine ve değirmen imalatçılarının ürün gamını detaylı sunan prestijli kataloglar."
      },
      {
        name: "Yapışkanlı Ürün Etiketi",
        slug: "/etiket",
        badge: "PP Opak & Kuşe",
        reason: "Gıda paketleri ve koli ambalajlarında yapışkanı kuvvetli, net baskılı etiketler."
      },
      {
        name: "Kartvizit Baskı",
        slug: "/kartvizit",
        badge: "350gr Kabartma Laklı",
        reason: "Çorumlu sanayiciler ve esnaflar için prestij sağlayan kaliteli kartvizit imalatı."
      },
      {
        name: "Broşür ve El İlanı",
        slug: "/brosur",
        badge: "135gr Kuşe",
        reason: "Hizmet tanıtımı ve mağaza kampanyalarında etkili canlı renkli reklam broşürleri."
      },
      {
        name: "Karton Çanta",
        slug: "/karton-canta",
        badge: "Lüks İpli & Bristol",
        reason: "Leblebi ve hediyelik eşya satış mağazaları için müşterilerin taşıdığı baskılı poşetler."
      },
      {
        name: "Ciltli Sipariş Fişi & Makbuz",
        slug: "/makbuz-ve-formlar",
        badge: "Oto-Kopyalı Numaratörlü",
        reason: "Ticarethanelerde resmi hesap takibini sağlayan koçanlı makbuz ve fişler."
      }
    ],
    shippingText: "Çorum kargolarımız İstanbul Topkapı'dan yola çıkarak ortalama 24-48 saat içerisinde adrese teslim ulaşır.",
    businessNeedsText: "Çorum sanayici ve esnafına fabrikadan doğrudan üretici fiyatları sunarak matbaa giderlerinde avantaj sağlıyoruz.",
    faq: [
      {
        question: "Çorum ve Sungurlu'ya kargo teslimat süresi nedir?",
        answer: "Baskısı biten siparişleriniz kargoya verilip ortalama 24-48 saat içinde Çorum adresinize ulaştırılmaktadır."
      },
      {
        question: "Leblebi kutuları için pencere kesimi yapabiliyor musunuz?",
        answer: "Evet, kutunun içindeki leblebinin görünmesi için şeffaf asetatlı pencere kesimli ambalaj kutuları imal ediyoruz."
      },
      {
        question: "Çorum'da fiziki mağazanız var mıdır?",
        answer: "Fabrikamız İstanbul Topkapı'dadır. Tüm Çorum il geneline kargo teslimatlı hizmet sunmaktayız."
      },
      {
        question: "Makine kataloglarında yüksek gramajlı kağıt kullanılabiliyor mu?",
        answer: "Evet, 200gr, 250gr ve 350gr kuşe kapak seçenekleriyle lüks katalog imalatı yapıyoruz."
      },
      {
        question: "Baskı öncesi onay alıyor musunuz?",
        answer: "Evet, WhatsApp üzerinden iletilen dijital PDF provayı onaylamadan üretime başlanmaz."
      }
    ]
  },

  "sinop-matbaa": {
    plateCode: 57,
    name: "Sinop",
    slug: "sinop-matbaa",
    metaTitle: "Sinop’a Kargo ile Matbaa, Turizm ve Gıda Ambalaj Baskı | Mavi Basım",
    metaDescription: "Sinop’taki işletmeler için Amerikan servis, magnet, etiket, kutu, karton çanta, broşür, el ilanı, kartvizit ve katalog baskı seçeneklerini inceleyin.",
    h1: "Sinop için Matbaa, Turizm ve Gıda Ambalaj Baskı Çözümleri",
    heroText: "Merkez, Boyabat, Gerze, Ayancık, Durağan, Erfelek, Türkeli ve Sinop’un diğer ilçelerindeki işletmeler; Amerikan servis, magnet, etiket, kutu, karton çanta, broşür, el ilanı, kartvizit ve katalog baskı seçeneklerini inceleyerek teklif alabilir.",
    intro: "Sinop’taki turizm, konaklama, restoran, su ürünleri, gıda, mağaza, ticaret ve kurumsal işletmeler için farklı baskı ihtiyaçları oluşabilir. Ürün ölçüsü, adet, kullanım amacı, tasarım dosyası ve baskı sonrası uygulamalara göre seçenekler değerlendirilir. Mavi Basım, İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktasından Sinop’a kargo ile baskı çözümleri sunar.",
    districtsIntro: "Sinop il merkezi ve çevre ilçelerdeki işletmeler için sipariş ve kargo planı, ürünün özelliklerine ve onay sürecine göre oluşturulur.",
    districts: ["Merkez", "Boyabat", "Gerze", "Ayancık", "Durağan", "Erfelek", "Türkeli"],
    sectors: [
      {
        title: "Turizm, Konaklama ve Restoran İşletmeleri",
        description: "Amerikan servis, menü, magnet, broşür, el ilanı ve tanıtım ürünleri kullanım amacına göre değerlendirilebilir."
      },
      {
        title: "Su Ürünleri, Gıda ve Paketleme İşletmeleri",
        description: "Ürün etiketi, koli etiketi, karton kutu, karton çanta, katalog ve tanıtım materyalleri kullanım koşullarına göre planlanabilir."
      },
      {
        title: "Mağaza ve Perakende İşletmeleri",
        description: "Karton çanta, kutu, etiket, kartvizit ve kampanya materyalleri ihtiyaca göre incelenebilir."
      },
      {
        title: "Ticaret ve Lojistik İşletmeleri",
        description: "Etiket, katalog, kartvizit, form, broşür ve sevk süreçlerinde kullanılan basılı ürünler değerlendirilebilir."
      },
      {
        title: "Kurumsal ve Hizmet İşletmeleri",
        description: "Kartvizit, broşür, katalog, form, dosya ve kurumsal evrak baskıları incelenebilir."
      }
    ],
    featuredProducts: [
      {
        name: "Menü ve Amerikan Servis",
        slug: "/amerikan-servis",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Restoran ve Paket Servis",
        reason: "Restoran, kafe ve paket servis işletmeleri için baskılı Amerikan servis ve menü seçeneklerini inceleyin.",
        imageSrc: "/images/amerikan-servis/amerikan-servis-baski.webp",
        imageAlt: "Baskılı Amerikan Servis ve Masa Servis Kağıdı"
      },
      {
        name: "Buzdolabı Magneti",
        slug: "/magnet",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Turizm ve Yerel Tanıtım",
        reason: "Restoran, paket servis ve yerel işletme tanıtımları için buzdolabı magneti seçeneklerini inceleyin.",
        imageSrc: "/images/magnet/magnet-baski.webp",
        imageAlt: "Buzdolabı ve Paket Servis Tanıtım Magneti"
      },
      {
        name: "Ürün ve Koli Etiketi",
        slug: "/etiket",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Gıda ve Paketleme",
        reason: "Gıda, su ürünleri ve paketleme ürünleri için etiket seçeneklerini inceleyin.",
        imageSrc: "/images/etiket/yapiskanli-etiket-baski.webp",
        imageAlt: "Yapışkanlı Kuşe ve Ambalaj Etiketi"
      },
      {
        name: "Ambalaj Kutusu",
        slug: "/kutu",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Ambalaj Çözümleri",
        reason: "Ürününüzün boyut ve dayanım gereksinimlerine göre karton ambalaj ve kutu seçeneklerini inceleyin.",
        imageSrc: "/images/kutu/urun-kutusu-baski.webp",
        imageAlt: "Özel Tasarım Karton Ürün Kutusu ve Ambalaj"
      },
      {
        name: "Karton Çanta Baskı",
        slug: "/karton-canta",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Mağaza ve Perakende",
        reason: "Mağaza, perakende ve hediyelik ürün sunumu için baskılı karton çanta seçeneklerini inceleyin.",
        imageSrc: "/images/karton-canta/magaza-karton-canta-baski.webp",
        imageAlt: "Mağaza ve Perakende İçin Baskılı Karton Çanta"
      },
      {
        name: "Broşür Baskı",
        slug: "/brosur",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Tanıtım Baskıları",
        reason: "Ürün ve hizmet tanıtımı için farklı ebat ve katlama seçeneklerinde broşürleri inceleyin.",
        imageSrc: "/images/brosur/brosur-baski-fiyatlari.webp",
        imageAlt: "A4 ve A5 Tanıtım Broşürü Baskısı"
      },
      {
        name: "El İlanı Baskı",
        slug: "/el-ilani",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kampanya ve Duyuru",
        reason: "Yerel kampanya, açılış ve duyurular için farklı ebatlarda el ilanı baskı seçeneklerini inceleyin.",
        imageSrc: "/images/el-ilani/el-ilani-baski-fiyatlari.webp",
        imageAlt: "A5 ve A6 Tanıtım El İlanı Baskısı"
      },
      {
        name: "Kartvizit Baskı",
        slug: "/kartvizit",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal İletişim",
        reason: "Kurumsal kimlik ve ticari iletişim için kartvizit alternatiflerini inceleyin.",
        imageSrc: "/images/kartvizit/kartvizit-baski.webp",
        imageAlt: "Mat Selefonlu Kurumsal Kartvizit"
      },
      {
        name: "Katalog ve Dergi Baskı",
        slug: "/kataloglar",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal Tanıtım",
        reason: "Ürün, hizmet ve kurumsal tanıtım içerikleri için katalog ve dergi baskı seçeneklerini inceleyin.",
        imageSrc: "/images/katalog/katalog-baski-fiyatlari.webp",
        imageAlt: "Kurumsal Tanıtım Kataloğu ve Dergi Baskısı"
      }
    ],
    shippingText: "Sinop’a gönderim planı; ürün, adet, baskı sonrası işlemler ve sipariş onayına göre teklif aşamasında netleştirilir.",
    businessNeedsText: "Daha net teklif için ürün türünü, ölçüyü, adedi, baskı yönünü, varsa malzeme veya baskı sonrası tercihini ve tasarım dosyanızın durumunu paylaşabilirsiniz.",
    faq: [
      {
        question: "Sinop’ta fiziksel şubeniz var mı?",
        answer: "Sinop’ta fiziksel şubemiz bulunmuyor. İstanbul Topkapı’daki hizmet ve koordinasyon noktamızdan sipariş sürecini uzaktan yönetiyor, Sinop’a kargo ile gönderim yapıyoruz."
      },
      {
        question: "Sinop’a gönderim süresi nasıl belirlenir?",
        answer: "Gönderim planı; ürünün türü, adet, baskı sonrası uygulamalar, dosya onayı ve kargo koşullarına göre teklif aşamasında netleştirilir."
      },
      {
        question: "Baskı öncesinde PDF prova paylaşılır mı?",
        answer: "Baskıya hazır dosyalarda yerleşim ve metin kontrolü için uygun işlerde PDF prova paylaşılabilir. PDF prova fiziksel baskı rengini ve malzeme dokusunu birebir garanti etmez."
      },
      {
        question: "Gıda ve paketleme işletmeleri hangi ürünleri inceleyebilir?",
        answer: "Ambalaj kutusu, ürün etiketi, koli etiketi, karton çanta, katalog ve tanıtım materyalleri ihtiyaca göre incelenebilir."
      },
      {
        question: "Turizm ve restoran işletmeleri için hangi baskı ürünleri uygundur?",
        answer: "Amerikan servis, menü, broşür, el ilanı, magnet, etiket ve kartvizit seçenekleri kullanım amacına göre değerlendirilebilir."
      }
    ]
  },

  "ordu-matbaa": {
    plateCode: 52,
    name: "Ordu",
    slug: "ordu-matbaa",
    metaTitle: "Ordu’ya Kargo ile Matbaa, Fındık Ambalajı ve Etiket Baskı | Mavi Basım",
    metaDescription: "Ordu’daki işletmeler için broşür, el ilanı, etiket, kutu, karton çanta, Amerikan servis, magnet, katalog ve form baskı seçeneklerini inceleyin.",
    h1: "Ordu için Matbaa, Fındık Ambalajı ve Etiket Baskı Çözümleri",
    heroText: "Altınordu, Ünye, Fatsa, Perşembe, Gölköy, Korgan, Kumru, Akkuş ve Ordu’nun diğer ilçelerindeki işletmeler; broşür, el ilanı, etiket, kutu, karton çanta, Amerikan servis, magnet, katalog ve form baskı seçeneklerini inceleyerek teklif alabilir.",
    intro: "Ordu’daki fındık ve gıda işletmeleri, paketleme firmaları, ticari işletmeler, restoranlar, mağazalar, lojistik firmaları ve kurumsal işletmeler için farklı baskı ihtiyaçları oluşabilir. Ürün ölçüsü, adet, kullanım amacı, tasarım dosyası ve baskı sonrası uygulamalara göre seçenekler değerlendirilir. Mavi Basım, İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktasından Ordu’ya kargo ile baskı çözümleri sunar.",
    districtsIntro: "Ordu il merkezi ve çevre ilçelerdeki işletmeler için sipariş ve kargo planı, ürünün özelliklerine ve onay sürecine göre oluşturulur.",
    districts: ["Altınordu", "Ünye", "Fatsa", "Perşembe", "Gölköy", "Korgan", "Kumru", "Akkuş"],
    sectors: [
      {
        title: "Fındık, Gıda ve Paketleme İşletmeleri",
        description: "Ürün etiketi, koli etiketi, ambalaj kutusu, karton çanta, katalog ve tanıtım materyalleri kullanım koşullarına göre planlanabilir."
      },
      {
        title: "Ticaret, Lojistik ve Dağıtım İşletmeleri",
        description: "Form, etiket, kartvizit, katalog, broşür ve sevk süreçlerinde kullanılan basılı ürünler incelenebilir."
      },
      {
        title: "Restoran, Kafe ve Paket Servis İşletmeleri",
        description: "Amerikan servis, menü, broşür, magnet, etiket ve sipariş fişi gibi ürünler kullanım amacına göre değerlendirilebilir."
      },
      {
        title: "Mağaza ve Perakende İşletmeleri",
        description: "Karton çanta, kutu, etiket, kartvizit ve tanıtım materyalleri ihtiyaçlara göre incelenebilir."
      },
      {
        title: "Kurumsal ve Hizmet İşletmeleri",
        description: "Kartvizit, broşür, katalog, form, dosya ve kurumsal evrak baskıları değerlendirilebilir."
      }
    ],
    featuredProducts: [
      {
        name: "Broşür Baskı",
        slug: "/brosur",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Tanıtım Baskıları",
        reason: "Ürün, hizmet ve kampanya bilgilendirmeleri için broşür seçeneklerini inceleyin.",
        imageSrc: "/images/brosur/brosur-baski-fiyatlari.webp",
        imageAlt: "A4 ve A5 Tanıtım Broşürü Baskısı"
      },
      {
        name: "Buzdolabı Magneti",
        slug: "/magnet",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Yerel Tanıtım",
        reason: "Restoran, paket servis ve yerel işletme tanıtımları için buzdolabı magneti seçeneklerini inceleyin.",
        imageSrc: "/images/magnet/magnet-baski.webp",
        imageAlt: "Buzdolabı ve Paket Servis Tanıtım Magneti"
      },
      {
        name: "Menü ve Amerikan Servis",
        slug: "/amerikan-servis",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Restoran ve Paket Servis",
        reason: "Restoran, kafe ve paket servis işletmeleri için Amerikan servis ve menü baskı seçeneklerini inceleyin.",
        imageSrc: "/images/amerikan-servis/amerikan-servis-baski.webp",
        imageAlt: "Baskılı Amerikan Servis ve Masa Servis Kağıdı"
      },
      {
        name: "El İlanı Baskı",
        slug: "/el-ilani",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kampanya ve Duyuru",
        reason: "Yerel kampanya, açılış ve duyurular için farklı ebatlarda el ilanı baskı seçeneklerini inceleyin.",
        imageSrc: "/images/el-ilani/el-ilani-baski-fiyatlari.webp",
        imageAlt: "A5 ve A6 Tanıtım El İlanı Baskısı"
      },
      {
        name: "Ambalaj Kutusu",
        slug: "/kutu",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Ambalaj Çözümleri",
        reason: "Ürününüzün boyut ve dayanım gereksinimlerine göre karton ambalaj ve kutu seçeneklerini inceleyin.",
        imageSrc: "/images/kutu/urun-kutusu-baski.webp",
        imageAlt: "Özel Tasarım Karton Ürün Kutusu ve Ambalaj"
      },
      {
        name: "Form ve Makbuz Baskıları",
        slug: "/makbuz-ve-formlar",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "İşletme Evrakları",
        reason: "Sipariş, teslimat ve muhasebe takibi için ciltli veya koçanlı form çözümlerini inceleyin.",
        imageSrc: "/images/siparis-fisi/siparis-fisi-basimi.webp",
        imageAlt: "Otokopili Kendinden Karbonlu Sipariş Fişi ve Form"
      },
      {
        name: "Ürün ve Koli Etiketi",
        slug: "/etiket",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Fındık ve Gıda Paketleme",
        reason: "Fındık, gıda ve paketleme ürünleri için kuşe ve yapışkanlı etiket seçeneklerini inceleyin.",
        imageSrc: "/images/etiket/yapiskanli-etiket-baski.webp",
        imageAlt: "Yapışkanlı Kuşe ve Ambalaj Etiketi"
      },
      {
        name: "Karton Çanta Baskı",
        slug: "/karton-canta",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Mağaza ve Perakende",
        reason: "Mağaza, perakende ve hediyelik ürün sunumu için baskılı karton çanta seçeneklerini inceleyin.",
        imageSrc: "/images/karton-canta/magaza-karton-canta-baski.webp",
        imageAlt: "Mağaza ve Perakende İçin Baskılı Karton Çanta"
      },
      {
        name: "Katalog ve Dergi Baskı",
        slug: "/kataloglar",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal Tanıtım",
        reason: "Ürün, hizmet ve kurumsal tanıtım içerikleri için katalog ve dergi baskı seçeneklerini inceleyin.",
        imageSrc: "/images/katalog/katalog-baski-fiyatlari.webp",
        imageAlt: "Kurumsal Tanıtım Kataloğu ve Dergi Baskısı"
      }
    ],
    shippingText: "Ordu’ya gönderim planı; ürün, adet, baskı sonrası işlemler ve sipariş onayına göre teklif aşamasında netleştirilir.",
    businessNeedsText: "Daha net teklif için ürün türünü, ölçüyü, adedi, baskı yönünü, varsa malzeme veya baskı sonrası tercihini ve tasarım dosyanızın durumunu paylaşabilirsiniz.",
    faq: [
      {
        question: "Ordu’da fiziksel şubeniz var mı?",
        answer: "Ordu’da fiziksel şubemiz bulunmuyor. İstanbul Topkapı’daki hizmet ve koordinasyon noktamızdan sipariş sürecini uzaktan yönetiyor, Ordu’ya kargo ile gönderim yapıyoruz."
      },
      {
        question: "Ordu’ya gönderim süresi nasıl belirlenir?",
        answer: "Gönderim planı; ürünün türü, adet, baskı sonrası uygulamalar, dosya onayı ve kargo koşullarına göre teklif aşamasında netleştirilir."
      },
      {
        question: "Baskı öncesinde PDF prova paylaşılır mı?",
        answer: "Baskıya hazır dosyalarda yerleşim ve metin kontrolü için uygun işlerde PDF prova paylaşılabilir. PDF prova fiziksel baskı rengini ve malzeme dokusunu birebir garanti etmez."
      },
      {
        question: "Fındık ve gıda işletmeleri hangi ürünleri inceleyebilir?",
        answer: "Ambalaj kutusu, ürün etiketi, koli etiketi, karton çanta, katalog ve tanıtım materyalleri ihtiyaca göre incelenebilir."
      },
      {
        question: "Restoran ve paket servis işletmeleri için hangi baskı ürünleri uygundur?",
        answer: "Amerikan servis, menü, broşür, magnet, etiket ve sipariş fişi seçenekleri kullanım amacına göre değerlendirilebilir."
      }
    ]
  },

  "rize-matbaa": {
    plateCode: 53,
    name: "Rize",
    slug: "rize-matbaa",
    metaTitle: "Rize’ye Kargo ile Matbaa, Çay Ambalajı ve Turizm Baskı | Mavi Basım",
    metaDescription: "Rize’deki işletmeler için kutu, etiket, karton çanta, broşür, Amerikan servis, magnet, kartvizit, katalog ve el ilanı baskı seçeneklerini inceleyin.",
    h1: "Rize için Matbaa, Çay Ambalajı ve Turizm Baskı Çözümleri",
    heroText: "Merkez, Çayeli, Ardeşen, Pazar, Fındıklı, Çamlıhemşin, İkizdere, Kalkandere ve Rize’nin diğer ilçelerindeki işletmeler; kutu, etiket, karton çanta, broşür, Amerikan servis, magnet, kartvizit, katalog ve el ilanı baskı seçeneklerini inceleyerek teklif alabilir.",
    intro: "Rize’deki çay ve gıda işletmeleri, paketleme firmaları, turizm ve konaklama işletmeleri, restoranlar, mağazalar ve kurumsal firmalar için farklı baskı ihtiyaçları oluşabilir. Ürün ölçüsü, adet, kullanım amacı, tasarım dosyası ve baskı sonrası uygulamalara göre seçenekler değerlendirilir. Mavi Basım, İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktasından Rize’ye kargo ile baskı çözümleri sunar.",
    districtsIntro: "Rize il merkezi ve çevre ilçelerdeki işletmeler için sipariş ve kargo planı, ürünün özelliklerine ve onay sürecine göre oluşturulur.",
    districts: ["Merkez", "Çayeli", "Ardeşen", "Pazar", "Fındıklı", "Çamlıhemşin", "İkizdere", "Kalkandere"],
    sectors: [
      {
        title: "Çay, Gıda ve Paketleme İşletmeleri",
        description: "Ürün etiketi, koli etiketi, ambalaj kutusu, karton çanta, katalog ve tanıtım materyalleri kullanım koşullarına göre planlanabilir."
      },
      {
        title: "Turizm, Konaklama ve Etkinlik İşletmeleri",
        description: "Broşür, el ilanı, kartvizit, magnet, katalog ve tanıtım ürünleri kullanım amacına göre değerlendirilebilir."
      },
      {
        title: "Restoran, Kafe ve Paket Servis İşletmeleri",
        description: "Amerikan servis, menü, magnet, etiket, broşür ve sipariş fişi gibi ürünler incelenebilir."
      },
      {
        title: "Mağaza ve Perakende İşletmeleri",
        description: "Karton çanta, kutu, etiket, kartvizit ve kampanya materyalleri ihtiyaçlara göre incelenebilir."
      },
      {
        title: "Kurumsal ve Hizmet İşletmeleri",
        description: "Kartvizit, katalog, broşür, form, dosya ve kurumsal evrak baskıları değerlendirilebilir."
      }
    ],
    featuredProducts: [
      {
        name: "Ambalaj Kutusu",
        slug: "/kutu",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Çay ve Gıda Ambalajı",
        reason: "Çay ve gıda ambalajları için karton kutu seçeneklerini inceleyin.",
        imageSrc: "/images/kutu/urun-kutusu-baski.webp",
        imageAlt: "Özel Tasarım Karton Ürün Kutusu ve Ambalaj"
      },
      {
        name: "Ürün ve Koli Etiketi",
        slug: "/etiket",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Çay ve Gıda Paketleme",
        reason: "Çay paketleme ve yöresel ürün kavanozları için etiket alternatiflerini inceleyin.",
        imageSrc: "/images/etiket/yapiskanli-etiket-baski.webp",
        imageAlt: "Yapışkanlı Kuşe ve Ambalaj Etiketi"
      },
      {
        name: "Karton Çanta Baskı",
        slug: "/karton-canta",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Mağaza ve Perakende",
        reason: "Çay ve yöresel ürün satış mağazaları için baskılı karton çanta seçeneklerini inceleyin.",
        imageSrc: "/images/karton-canta/magaza-karton-canta-baski.webp",
        imageAlt: "Mağaza ve Perakende İçin Baskılı Karton Çanta"
      },
      {
        name: "Broşür Baskı",
        slug: "/brosur",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Turizm Tanıtımı",
        reason: "Yayla turları ve turizm işletmeleri için tanıtım broşürü seçeneklerini inceleyin.",
        imageSrc: "/images/brosur/brosur-baski-fiyatlari.webp",
        imageAlt: "A4 ve A5 Tanıtım Broşürü Baskısı"
      },
      {
        name: "Menü ve Amerikan Servis",
        slug: "/amerikan-servis",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Restoran ve Paket Servis",
        reason: "Restoran ve yeme içme işletmeleri için Amerikan servis ve menü alternatiflerini inceleyin.",
        imageSrc: "/images/amerikan-servis/amerikan-servis-baski.webp",
        imageAlt: "Baskılı Amerikan Servis ve Masa Servis Kağıdı"
      },
      {
        name: "Buzdolabı Magneti",
        slug: "/magnet",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Turizm ve Yerel Tanıtım",
        reason: "Turizm ve paket servis işletmeleri için buzdolabı magneti seçeneklerini inceleyin.",
        imageSrc: "/images/magnet/magnet-baski.webp",
        imageAlt: "Buzdolabı ve Paket Servis Tanıtım Magneti"
      },
      {
        name: "Kartvizit Baskı",
        slug: "/kartvizit",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal İletişim",
        reason: "Kurumsal iletişim ve tanıtım için kartvizit alternatiflerini inceleyin.",
        imageSrc: "/images/kartvizit/kartvizit-baski.webp",
        imageAlt: "Mat Selefonlu Kurumsal Kartvizit"
      },
      {
        name: "Katalog ve Dergi Baskı",
        slug: "/kataloglar",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal Tanıtım",
        reason: "Ürün ve kurumsal tanıtımlar için katalog ve dergi baskı seçeneklerini inceleyin.",
        imageSrc: "/images/katalog/katalog-baski-fiyatlari.webp",
        imageAlt: "Kurumsal Tanıtım Kataloğu ve Dergi Baskısı"
      },
      {
        name: "El İlanı Baskı",
        slug: "/el-ilani",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kampanya ve Duyuru",
        reason: "Kampanya ve duyurular için el ilanı baskı seçeneklerini inceleyin.",
        imageSrc: "/images/el-ilani/el-ilani-baski-fiyatlari.webp",
        imageAlt: "A5 ve A6 Tanıtım El İlanı Baskısı"
      }
    ],
    shippingText: "Rize’ye gönderim planı; ürün, adet, baskı sonrası işlemler ve sipariş onayına göre teklif aşamasında netleştirilir.",
    businessNeedsText: "Daha net teklif için ürün türünü, ölçüyü, adedi, baskı yönünü, varsa malzeme veya baskı sonrası tercihini ve tasarım dosyanızın durumunu paylaşabilirsiniz.",
    faq: [
      {
        question: "Rize’de fiziksel şubeniz var mı?",
        answer: "Rize’de fiziksel şubemiz bulunmuyor. İstanbul Topkapı’daki hizmet ve koordinasyon noktamızdan sipariş sürecini uzaktan yönetiyor, Rize’ye kargo ile gönderim yapıyoruz."
      },
      {
        question: "Rize’ye gönderim süresi nasıl belirlenir?",
        answer: "Gönderim planı; ürünün türü, adet, baskı sonrası uygulamalar, dosya onayı ve kargo koşullarına göre teklif aşamasında netleştirilir."
      },
      {
        question: "Baskı öncesinde PDF prova paylaşılır mı?",
        answer: "Baskıya hazır dosyalarda yerleşim ve metin kontrolü için uygun işlerde PDF prova paylaşılabilir. PDF prova fiziksel baskı rengini ve malzeme dokusunu birebir garanti etmez."
      },
      {
        question: "Çay ve gıda işletmeleri hangi ürünleri inceleyebilir?",
        answer: "Ambalaj kutusu, ürün etiketi, koli etiketi, karton çanta, katalog ve tanıtım materyalleri ihtiyaca göre incelenebilir."
      },
      {
        question: "Turizm ve restoran işletmeleri için hangi baskı ürünleri uygundur?",
        answer: "Broşür, el ilanı, magnet, Amerikan servis, menü, etiket ve kartvizit seçenekleri kullanım amacına göre değerlendirilebilir."
      }
    ]
  },

  "istanbul-matbaa": {
    plateCode: 34,
    name: "İstanbul",
    slug: "istanbul-matbaa",
    metaTitle: "İstanbul Matbaa | Online Baskı, Kartvizit, Broşür, Kutu",
    metaDescription: "İstanbul Topkapı 2. Matbaacılar Sitesi üretim tesisimizden Avrupa ve Anadolu yakasındaki kurumsal firmalara kartvizit, broşür, kutu, etiket ve ambalaj baskısı.",
    h1: "İstanbul Online Matbaa ve Baskı Hizmetleri",
    heroText: "Topkapı 2. Matbaacılar Sitesi'ndeki üretim tesisimizden tüm İstanbul ilçelerine hızlı kurye ve kargo teslimatı.",
    intro: "Mavi Basım Matbaa & Reklam; İstanbul Zeytinburnu Topkapı 2. Matbaacılar Sitesi'nde kendi öz malı olan Heidelberg ofset baskı makineleri, Indigo dijital parkuru, otomatik selefon, mücellit ve özel kesim bıçak hatlarıyla faaliyet göstermektedir. İstanbul Türkiye'nin finans, ticaret, tekstil, ajans ve perakende kalbidir. Maslak'taki plaza şirketinden İkitelli'deki fabrikaya, Kadıköy'deki restorandan Şişli'deki ajansa kadar tüm İstanbul işletmelerine komisyonsuz, doğrudan üretici fiyatıyla matbaa hizmeti sunuyoruz.",
    districtsIntro: "İstanbul Avrupa ve Anadolu yakasındaki 39 ilçenin tamamına adrese teslim hızlı kurye ve kargo olanağı:",
    districts: ["Zeytinburnu", "Topkapı", "İkitelli OSB", "Ümraniye", "Şişli", "Karaköy", "Ataşehir", "Kadıköy", "Levent", "Maslak"],
    sectors: [
      {
        title: "Maslak, Levent & Ataşehir Plaza Şirketleri",
        description: "Kurumsal holdingler ve finans devleri için yüksek prestijli kabartma laklı kartvizitler, antetli kağıtlar, diplomat zarflar ve cepli sunum dosyaları üretiyoruz."
      },
      {
        title: "E-Ticaret ve Ambalaj Sektörü",
        description: "İstanbul e-ticaret markaları için özel koli bantları, ambalaj içi teşekkür kartları, özel kesimli ürün kutuları ve kargo etiketleri basıyoruz."
      },
      {
        title: "İkitelli & Ümraniye OSB Fabrikaları",
        description: "Organize sanayi bölgelerindeki imalatçılar için koli etiketleri, teknik ürün katalogları, kullanma kılavuzları ve seri numaralı evraklar hazırlıyoruz."
      },
      {
        title: "Kadıköy, Beşiktaş & Beyoğlu Restoranları",
        description: "İstanbul'un popüler yeme-içme mekanları için tasarım menüler, yağa dayanıklı Amerikan servisler, paket servis magnetleri ve adisyonlar basıyoruz."
      },
      {
        title: "Tekstil ve Merter / Osmanbey Moda sektörü",
        description: "Tekstil devleri için dokuma sallama kartlar, deri ve karton giyim etiketleri, lookbook kataloglar ve karton poşetler imal ediyoruz."
      }
    ],
    featuredProducts: [
      {
        name: "Kartvizit Baskı",
        slug: "/kartvizit",
        badge: "350gr Mat Selefonlu & Kabartma Laklı",
        reason: "İstanbul iş dünyasında güçlü ilk izlenim bırakan, gofrajlı ve lüks kabartma laklı kartvizit imalatı."
      },
      {
        name: "Broşür Baskı",
        slug: "/brosur",
        badge: "115gr / 135gr / 200gr Kuşe",
        reason: "Tanıtım ve kampanyalarda İstanbul genelinde dağıtıma uygun A5, A4 ve kırım katlamalı canlı broşürler."
      },
      {
        name: "Ürün Kataloğu",
        slug: "/kataloglar",
        badge: "Tel Dikiş & Amerikan Cilt",
        reason: "Markanızın gücünü yansıtan, yüksek kağıt gramajlı ve kaliteli ciltli ürün tanıtım katalogları."
      },
      {
        name: "Ambalaj Kutusu",
        slug: "/kutu",
        badge: "Özel Kesimli Karton Ambalaj",
        reason: "Gıda, kozmetik, e-ticaret ve tekstil ürünleri için özel ölçü kesimli kaliteli karton kutular."
      },
      {
        name: "Yapışkanlı Etiket & Sticker",
        slug: "/etiket",
        badge: "PP Opak Su Geçirmez & Kuşe",
        reason: "Şişe, kavanoz ve koli paketlerinde çözülmeyen dayanıklı rulo ve tabaka yapışkanlı etiketler."
      },
      {
        name: "Buzdolabı Magneti",
        slug: "/magnet",
        badge: "0.50mm Mıknatıs Özel Kesim",
        reason: "Restoran ve paket servislerin İstanbul evlerinde kalıcı reklam oluşturmasını sağlayan magnetler."
      },
      {
        name: "Karton Çanta",
        slug: "/karton-canta",
        badge: "İpli & Lüks Bristol",
        reason: "Butik, kuyumcu ve mağazalar için logo baskılı, ipli ve dayanıklı karton poşet imalatı."
      },
      {
        name: "Kurumsal Evrak ve Zarf",
        slug: "/antetli",
        badge: "Antetli Kağıt & Zarf",
        reason: "Şirketinizin resmi yazışmalarında tutarlılık sağlayan pencereli diplomat zarf ve antetli kağıtlar."
      }
    ],
    shippingText: "Üretim tesisimiz İstanbul Topkapı'da yer aldığı için Avrupa ve Anadolu yakasındaki siparişleriniz montaj ve baskı sonrası hızlı kurye veya şehir içi kargo hatlarımızla aynı gün veya 24 saat içinde kapınıza ulaştırılır.",
    businessNeedsText: "Aracısız doğrudan Topkapı matbaa imalatçısı olmamız sayesinde İstanbul'daki ajans, fabrika ve işletmelere piyasa fiyatlarının çok altında fabrika çıkış tarifesi sunuyoruz.",
    faq: [
      {
        question: "İstanbul içi siparişlerde kargo veya kurye teslimatı ne kadar sürer?",
        answer: "Topkapı tesisimizde basımı biten ürünler İstanbul içi ilçelere hızlı motor kurye veya ertesi gün kargo teslimatı seçeneğiyle ulaştırılmaktadır."
      },
      {
        question: "Topkapı matbaadaki tesisinizi ziyaret edip numune görebilir miyiz?",
        answer: "Evet, Zeytinburnu Topkapı 2. Matbaacılar Sitesi'ndeki tesisimizi ziyaret ederek kağıt çeşitlerini ve örnek baskıları inceleyebilirsiniz."
      },
      {
        question: "Acil matbaa ve aynı gün baskı hizmetiniz var mı?",
        answer: "Dijital parkurumuzda hazır tasarımlı acil kartvizit, broşür ve etiket siparişleri aynı gün basılıp teslim edilebilmektedir."
      },
      {
        question: "İstanbul'daki ajanslar için fason matbaa baskı yapıyor musunuz?",
        answer: "Evet, grafik ajansları ve bayiler için komisyonsuz, doğrudan fason matbaa üretim fiyatları uygulamaktayız."
      },
      {
        question: "Baskı öncesinde dijital onay süreci nasıl işliyor?",
        answer: "Çalışmanız teknik ekibimizce kontrol edildikten sonra WhatsApp hattımız üzerinden ücretsiz PDF prova sunulur."
      }
    ]
  },

  "izmir-matbaa": {
    plateCode: 35,
    name: "İzmir",
    slug: "izmir-matbaa",
    metaTitle: "İzmir’e Kargo ile Matbaa, Etiket ve Ambalaj Baskı | Mavi Basım",
    metaDescription: "İzmir’deki işletmeler için etiket, kutu, karton çanta, Amerikan servis, katalog, kartvizit, broşür, magnet ve oto paspas baskı seçeneklerini inceleyin.",
    h1: "İzmir için Matbaa, Etiket ve Ambalaj Baskı Çözümleri",
    heroText: "Konak, Bornova, Karşıyaka, Çiğli, Buca, Gaziemir, Torbalı, Aliağa, Menemen, Çeşme ve İzmir’in diğer ilçelerindeki işletmeler; etiket, kutu, karton çanta, Amerikan servis, katalog, kartvizit, broşür, magnet ve oto paspas baskı seçeneklerini inceleyerek teklif alabilir.",
    intro: "İzmir’deki gıda ve paketleme işletmeleri, ihracat ve ticaret firmaları, sanayi işletmeleri, restoranlar, turizm işletmeleri, mağazalar ve kurumsal firmalar için farklı baskı ihtiyaçları oluşabilir. Ürün ölçüsü, adet, kullanım amacı, tasarım dosyası ve baskı sonrası uygulamalara göre seçenekler değerlendirilir. Mavi Basım, İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktasından İzmir’e kargo ile baskı çözümleri sunar.",
    districtsIntro: "İzmir il merkezi ve çevre ilçelerdeki işletmeler için sipariş ve kargo planı, ürünün özelliklerine ve onay sürecine göre oluşturulur.",
    districts: ["Konak", "Bornova", "Karşıyaka", "Çiğli", "Buca", "Gaziemir", "Torbalı", "Aliağa", "Menemen", "Çeşme"],
    sectors: [
      {
        title: "Gıda, Paketleme ve Ticari Ürünler",
        description: "Ürün etiketi, koli etiketi, karton kutu, katalog ve tanıtım materyalleri kullanım koşullarına göre planlanabilir."
      },
      {
        title: "Sanayi, İhracat ve Lojistik İşletmeleri",
        description: "Etiket, teknik katalog, kutu, kartvizit, form ve sevk süreçlerinde kullanılan basılı ürünler incelenebilir."
      },
      {
        title: "Mağaza, Perakende ve Marka İşletmeleri",
        description: "Karton çanta, kutu, etiket, kartvizit, broşür ve katalog seçenekleri değerlendirilebilir."
      },
      {
        title: "Restoran, Kafe ve Turizm İşletmeleri",
        description: "Amerikan servis, menü, broşür, magnet, etiket ve tanıtım ürünleri kullanım amacına göre incelenebilir."
      },
      {
        title: "Kurumsal ve Hizmet İşletmeleri",
        description: "Kartvizit, katalog, broşür, form, dosya ve tanıtım materyalleri ihtiyaçlara göre planlanabilir."
      }
    ],
    featuredProducts: [
      {
        name: "Ürün ve Koli Etiketi",
        slug: "/etiket",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Gıda ve Paketleme",
        reason: "Gıda, paketleme ve ticari ürünler için etiket seçeneklerini inceleyin.",
        imageSrc: "/images/etiket/yapiskanli-etiket-baski.webp",
        imageAlt: "Yapışkanlı Kuşe ve Ambalaj Etiketi"
      },
      {
        name: "Ambalaj Kutusu",
        slug: "/kutu",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Ambalaj Çözümleri",
        reason: "Ürününüzün boyut ve dayanım gereksinimlerine göre karton ambalaj ve kutu seçeneklerini inceleyin.",
        imageSrc: "/images/kutu/urun-kutusu-baski.webp",
        imageAlt: "Özel Tasarım Karton Ürün Kutusu ve Ambalaj"
      },
      {
        name: "Karton Çanta Baskı",
        slug: "/karton-canta",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Mağaza ve Perakende",
        reason: "Mağaza, perakende ve marka tanıtımı için baskılı karton çanta seçeneklerini inceleyin.",
        imageSrc: "/images/karton-canta/magaza-karton-canta-baski.webp",
        imageAlt: "Mağaza ve Perakende İçin Baskılı Karton Çanta"
      },
      {
        name: "Amerikan Servis Baskı",
        slug: "/amerikan-servis",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Restoran ve Paket Servis",
        reason: "Restoran ve paket servis işletmeleri için baskılı Amerikan servis seçeneklerini inceleyin.",
        imageSrc: "/images/amerikan-servis/amerikan-servis-baski.webp",
        imageAlt: "Baskılı Amerikan Servis ve Masa Servis Kağıdı"
      },
      {
        name: "Katalog ve Dergi Baskı",
        slug: "/kataloglar",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal Tanıtım",
        reason: "Ürün, hizmet ve kurumsal tanıtım içerikleri için katalog ve dergi baskı seçeneklerini inceleyin.",
        imageSrc: "/images/katalog/katalog-baski-fiyatlari.webp",
        imageAlt: "Kurumsal Tanıtım Kataloğu ve Dergi Baskısı"
      },
      {
        name: "Kartvizit Baskı",
        slug: "/kartvizit",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal İletişim",
        reason: "Kurumsal kimlik ve ticari iletişim için kartvizit alternatiflerini inceleyin.",
        imageSrc: "/images/kartvizit/kartvizit-baski.webp",
        imageAlt: "Mat Selefonlu Kurumsal Kartvizit"
      },
      {
        name: "Broşür Baskı",
        slug: "/brosur",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Tanıtım Baskıları",
        reason: "Ürün ve hizmet tanıtımı için farklı ebat ve katlama seçeneklerinde broşürleri inceleyin.",
        imageSrc: "/images/brosur/brosur-baski-fiyatlari.webp",
        imageAlt: "A4 ve A5 Tanıtım Broşürü Baskısı"
      },
      {
        name: "Buzdolabı Magneti",
        slug: "/magnet",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Yerel Tanıtım",
        reason: "Restoran, paket servis ve yerel tanıtım çalışmaları için magnet seçeneklerini inceleyin.",
        imageSrc: "/images/magnet/magnet-baski.webp",
        imageAlt: "Buzdolabı ve Paket Servis Tanıtım Magneti"
      },
      {
        name: "Oto Paspas Baskı",
        slug: "/oto-paspas",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Araç ve Servis İşletmeleri",
        reason: "Araç servisleri, oto yıkama noktaları ve filo işletmeleri için baskılı oto paspas seçeneklerini inceleyin.",
        imageSrc: "/images/oto-paspas/oto-paspas-baski-fiyatlari.webp",
        imageAlt: "Oto Yıkama ve Servis İçin Baskılı Kağıt Oto Paspası"
      }
    ],
    shippingText: "İzmir’e gönderim planı; ürün, adet, baskı sonrası işlemler ve sipariş onayına göre teklif aşamasında netleştirilir.",
    businessNeedsText: "Daha net teklif için ürün türünü, ölçüyü, adedi, baskı yönünü, varsa malzeme veya baskı sonrası tercihini ve tasarım dosyanızın durumunu paylaşabilirsiniz.",
    faq: [
      {
        question: "İzmir’de fiziksel şubeniz var mı?",
        answer: "İzmir’de fiziksel şubemiz bulunmuyor. İstanbul Topkapı’daki hizmet ve koordinasyon noktamızdan sipariş sürecini uzaktan yönetiyor, İzmir’e kargo ile gönderim yapıyoruz."
      },
      {
        question: "İzmir’e gönderim süresi nasıl belirlenir?",
        answer: "Gönderim planı; ürünün türü, adet, baskı sonrası uygulamalar, dosya onayı ve kargo koşullarına göre teklif aşamasında netleştirilir."
      },
      {
        question: "Baskı öncesinde PDF prova paylaşılır mı?",
        answer: "Baskıya hazır dosyalarda yerleşim ve metin kontrolü için uygun işlerde PDF prova paylaşılabilir. PDF prova fiziksel baskı rengini ve malzeme dokusunu birebir garanti etmez."
      },
      {
        question: "Gıda ve paketleme işletmeleri hangi ürünleri inceleyebilir?",
        answer: "Ürün etiketi, koli etiketi, kutu, karton çanta, katalog ve tanıtım materyalleri ihtiyaca göre incelenebilir."
      },
      {
        question: "Restoran ve turizm işletmeleri için hangi baskı ürünleri uygundur?",
        answer: "Amerikan servis, menü, broşür, magnet, etiket ve kartvizit seçenekleri kullanım amacına göre değerlendirilebilir."
      }
    ]
  },
  "amasya-matbaa": {
    plateCode: 5,
    name: "Amasya",
    slug: "amasya-matbaa",
    metaTitle: "Amasya’ya Kargo ile Matbaa, Gıda Ambalajı ve Tanıtım Baskı | Mavi Basım",
    metaDescription: "Amasya’daki işletmeler için etiket, kutu, karton çanta, broşür, el ilanı, katalog, kartvizit, magnet ve form baskı seçeneklerini inceleyin.",
    h1: "Amasya için Matbaa, Gıda Ambalajı ve Tanıtım Baskı Çözümleri",
    heroText: "Merkez, Merzifon, Suluova, Taşova, Göynücek, Gümüşhacıköy ve Amasya’nın diğer ilçelerindeki işletmeler; etiket, kutu, karton çanta, broşür, el ilanı, katalog, kartvizit, magnet ve form baskı seçeneklerini inceleyerek teklif alabilir.",
    intro: "Amasya’daki tarım ve gıda işletmeleri, paketleme firmaları, ticari işletmeler, turizm işletmeleri, mağazalar ve kurumsal firmalar için farklı baskı ihtiyaçları oluşabilir. Ürün ölçüsü, adet, kullanım amacı, tasarım dosyası ve baskı sonrası uygulamalara göre seçenekler değerlendirilir. Mavi Basım, İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktasından Amasya’ya kargo ile baskı çözümleri sunar.",
    districtsIntro: "Amasya il merkezi ve çevre ilçelerdeki işletmeler için sipariş ve kargo planı, ürünün özelliklerine ve onay sürecine göre oluşturulur.",
    districts: ["Merkez", "Merzifon", "Suluova", "Taşova", "Göynücek", "Gümüşhacıköy"],
    sectors: [
      {
        title: "Tarım, Elma ve Gıda İşletmeleri",
        description: "Ürün etiketi, koli etiketi, ambalaj kutusu, karton çanta, katalog ve tanıtım materyalleri kullanım koşullarına göre planlanabilir."
      },
      {
        title: "Paketleme ve Ticari İşletmeler",
        description: "Kutu, etiket, kartvizit, broşür, katalog ve form baskı ürünleri incelenebilir."
      },
      {
        title: "Turizm, Konaklama ve Restoran İşletmeleri",
        description: "Amerikan servis, menü, magnet, broşür, el ilanı ve tanıtım ürünleri kullanım amacına göre değerlendirilebilir."
      },
      {
        title: "Mağaza ve Perakende İşletmeleri",
        description: "Karton çanta, kutu, etiket, kartvizit ve kampanya materyalleri ihtiyaçlara göre incelenebilir."
      },
      {
        title: "Kurumsal ve Hizmet İşletmeleri",
        description: "Kartvizit, katalog, broşür, form, dosya ve kurumsal evrak baskıları değerlendirilebilir."
      }
    ],
    featuredProducts: [
      {
        name: "Ürün ve Koli Etiketi",
        slug: "/etiket",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Tarım ve Gıda Paketleme",
        reason: "Tarım, elma ve gıda ambalajları için etiket seçeneklerini inceleyin.",
        imageSrc: "/images/etiket/yapiskanli-etiket-baski.webp",
        imageAlt: "Yapışkanlı Kuşe ve Ambalaj Etiketi"
      },
      {
        name: "Ambalaj Kutusu",
        slug: "/kutu",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Ambalaj Çözümleri",
        reason: "Ürününüzün boyut ve dayanım gereksinimlerine göre karton ambalaj ve kutu seçeneklerini inceleyin.",
        imageSrc: "/images/kutu/urun-kutusu-baski.webp",
        imageAlt: "Özel Tasarım Karton Ürün Kutusu ve Ambalaj"
      },
      {
        name: "Karton Çanta Baskı",
        slug: "/karton-canta",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Mağaza ve Perakende",
        reason: "Mağaza, perakende ve ürün sunumu için baskılı karton çanta seçeneklerini inceleyin.",
        imageSrc: "/images/karton-canta/magaza-karton-canta-baski.webp",
        imageAlt: "Mağaza ve Perakende İçin Baskılı Karton Çanta"
      },
      {
        name: "Broşür Baskı",
        slug: "/brosur",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Tanıtım Baskıları",
        reason: "Ürün ve hizmet tanıtımı için farklı ebat ve katlama seçeneklerinde broşürleri inceleyin.",
        imageSrc: "/images/brosur/brosur-baski-fiyatlari.webp",
        imageAlt: "A4 ve A5 Tanıtım Broşürü Baskısı"
      },
      {
        name: "El İlanı Baskı",
        slug: "/el-ilani",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kampanya ve Duyuru",
        reason: "Yerel kampanya, açılış ve duyurular için farklı ebatlarda el ilanı baskı seçeneklerini inceleyin.",
        imageSrc: "/images/el-ilani/el-ilani-baski-fiyatlari.webp",
        imageAlt: "A5 ve A6 Tanıtım El İlanı Baskısı"
      },
      {
        name: "Katalog ve Dergi Baskı",
        slug: "/kataloglar",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal Tanıtım",
        reason: "Ürün, hizmet ve kurumsal tanıtım içerikleri için katalog ve dergi baskı seçeneklerini inceleyin.",
        imageSrc: "/images/katalog/katalog-baski-fiyatlari.webp",
        imageAlt: "Kurumsal Tanıtım Kataloğu ve Dergi Baskısı"
      },
      {
        name: "Kartvizit Baskı",
        slug: "/kartvizit",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Kurumsal İletişim",
        reason: "Kurumsal kimlik ve ticari iletişim için kartvizit alternatiflerini inceleyin.",
        imageSrc: "/images/kartvizit/kartvizit-baski.webp",
        imageAlt: "Mat Selefonlu Kurumsal Kartvizit"
      },
      {
        name: "Buzdolabı Magneti",
        slug: "/magnet",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "Turizm ve Yerel Tanıtım",
        reason: "Restoran, turizm ve yerel işletme tanıtımları için buzdolabı magneti seçeneklerini inceleyin.",
        imageSrc: "/images/magnet/magnet-baski.webp",
        imageAlt: "Buzdolabı ve Paket Servis Tanıtım Magneti"
      },
      {
        name: "Form ve Makbuz Baskıları",
        slug: "/makbuz-ve-formlar",
        badge: "Ürün seçeneklerini inceleyin",
        categoryBadge: "İşletme Evrakları",
        reason: "Sipariş, teslimat ve muhasebe takibi için ciltli veya koçanlı form çözümlerini inceleyin.",
        imageSrc: "/images/siparis-fisi/siparis-fisi-basimi.webp",
        imageAlt: "Otokopili Kendinden Karbonlu Sipariş Fişi ve Form"
      }
    ],
    shippingText: "Amasya’ya gönderim planı; ürün, adet, baskı sonrası işlemler ve sipariş onayına göre teklif aşamasında netleştirilir.",
    businessNeedsText: "Daha net teklif için ürün türünü, ölçüyü, adedi, baskı yönünü, varsa malzeme veya baskı sonrası tercihini ve tasarım dosyanızın durumunu paylaşabilirsiniz.",
    faq: [
      {
        question: "Amasya’da fiziksel şubeniz var mı?",
        answer: "Amasya’da fiziksel şubemiz bulunmuyor. İstanbul Topkapı’daki hizmet ve koordinasyon noktamızdan sipariş sürecini uzaktan yönetiyor, Amasya’ya kargo ile gönderim yapıyoruz."
      },
      {
        question: "Amasya’ya gönderim süresi nasıl belirlenir?",
        answer: "Gönderim planı; ürünün türü, adet, baskı sonrası uygulamalar, dosya onayı ve kargo koşullarına göre teklif aşamasında netleştirilir."
      },
      {
        question: "Baskı öncesinde PDF prova paylaşılır mı?",
        answer: "Baskıya hazır dosyalarda yerleşim ve metin kontrolü için uygun işlerde PDF prova paylaşılabilir. PDF prova fiziksel baskı rengini ve malzeme dokusunu birebir garanti etmez."
      },
      {
        question: "Tarım ve gıda işletmeleri hangi ürünleri inceleyebilir?",
        answer: "Ürün etiketi, koli etiketi, ambalaj kutusu, karton çanta, katalog ve tanıtım materyalleri ihtiyaca göre incelenebilir."
      },
      {
        question: "Turizm ve restoran işletmeleri için hangi baskı ürünleri uygundur?",
        answer: "Broşür, el ilanı, magnet, Amerikan servis, menü, etiket ve kartvizit seçenekleri kullanım amacına göre değerlendirilebilir."
      }
    ]
  }
};

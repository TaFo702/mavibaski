import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronRight, 
  ShoppingCart, 
  CheckCircle2, 
  HelpCircle, 
  Printer, 
  Ruler, 
  Layers, 
  Sparkles, 
  QrCode, 
  Eye, 
  Type, 
  AlertTriangle, 
  FileText, 
  ChevronDown, 
  Zap, 
  ShieldCheck, 
  Truck, 
  Maximize2,
  Building2,
  PartyPopper,
  Music,
  GraduationCap,
  Trophy,
  Stethoscope,
  Cross,
  Store,
  Armchair,
  Home,
  Car,
  BookOpen,
  Briefcase
} from 'lucide-react';
import { useCart, FireWarning, AgencyDiscountCTA } from '../App';
import { AFIS_DATA } from '../data/productData';
import { ProductSEOSection } from './Kutu';
import { DeliveryBadge } from './DeliveryBadge';

// AFİŞ ÖRNEK GÖRSELLERİ GALERİSİ DATA
const AFIS_GALLERY = [
  {
    src: "/images/brosur-baski.webp",
    alt: "50x70 cm Kampanya ve İndirim Afişi Baskısı",
    title: "Kampanya & İndirim Afişi",
    desc: "135 gr parlak kuşe kâğıda basılmış, mağaza vitrinlerinde yüksek indirim oranlarını ve sezon fırsatlarını duyuran canlı renkli kampanya afişi."
  },
  {
    src: "/images/brosur-fiyatlari.webp",
    alt: "Konser ve Etkinlik Afişi Baskı Örneği",
    title: "Konser & Etkinlik Afişi",
    desc: "170 gr tok kuşe kâğıt üzerine Heidelberg offset kalitesiyle basılan, sanatçı, tarih ve bilet bilgilerini ön plana çıkaran lansman afişi."
  },
  {
    src: "/images/el-ilani.webp",
    alt: "Emlak Satılık Kiralık İlan Afişi 35x50 cm",
    title: "Emlak & Gayrimenkul Afişi",
    desc: "35x50 cm ve 50x70 cm boyutlarında, uzaktan kolay okunabilen yüksek kontrastlı satılık ve kiralık emlak afiş baskıları."
  },
  {
    src: "/images/katlamali-brosur.webp",
    alt: "Açılış ve Festival Duyuru Afişi",
    title: "Açılış & Festival Afişi",
    desc: "Açıkhava panoları, üniversite kampüsleri ve kültür merkezleri için tasarlanan büyük boy 70x100 cm etkinlik afişi."
  },
  {
    src: "/images/kartvizit-baski.webp",
    alt: "Mağaza Vitrin Afişi",
    title: "Mağaza & Vitrin Afişi",
    desc: "AVM ve caddelerdeki perakende mağazalarının yeni sezon ürünlerini ve görsel konseptlerini sergilediği selefon kaplamalı vitrin afişi."
  },
  {
    src: "/images/etiket-baski.webp",
    alt: "Özel Tasarım Dekoratif Sanat Posteri Baskısı",
    title: "Poster & Sanat Baskısı",
    desc: "170 gr tok kuşe kağıda yüksek çözünürlüklü dijital ve ofset teknikle basılan çerçevelik lüks sanat ve mimari posterler."
  }
];

// KAĞIT TİPLERİ KARŞILAŞTIRMA DATA
const KAGIT_KARSILASTIRMASI = [
  {
    title: "105 gr. Kuşe Kağıt",
    badge: "Ekonomik & Seri Dağıtım",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    features: [
      "Hafif ve esnek kâğıt yapısı",
      "Seri kampanya ve toplu afişleme için ideal",
      "En bütçe dostu büyük boy baskı seçeneği",
      "Sokak, pano ve duyuru panolarına seri uygulama"
    ],
    recommendedFor: "Süreli indirim duyuruları, siyasi seçim çalışmaları, toplu etkinlikler."
  },
  {
    title: "135 gr. Kuşe Kağıt",
    badge: "En Popüler & Standard",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    features: [
      "İdeal kağıt kalınlığı ve pürüzsüz parlaklık",
      "Ofset baskıda maksimum renk doygunluğu",
      "Vitrin, cam içi ve bina duvarları için mükemmel",
      "Fiyat / performans oranı en yüksek ürün"
    ],
    recommendedFor: "Mağaza vitrinleri, restoran indirimleri, sinema ve tiyatro afişleri."
  },
  {
    title: "170 gr. Kuşe Kağıt",
    badge: "Tok & Premium Kalite",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    features: [
      "Ağır, tok ve kırışmaya dayanıklı gövde",
      "Sert ve dalgalanma yapmayan dik duruş",
      "Işık geçirmeyen yüksek opaklık",
      "İsteğe bağlı mat veya parlak selefon kaplama"
    ],
    recommendedFor: "Lüks marka lansmanları, sergiler, müze afişleri ve uzun süreli panolar."
  },
  {
    title: "Blueback (Mavi Arkalı) Kağıt",
    badge: "Dış Mekan & Billboard",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    features: [
      "Mavi arka yüzey sayesinde alttaki görseli göstermez",
      "Neme, dış mekan şartlarına ve yıpranmaya dayanıklı",
      "Açıkhava billboard ve otobüs durağı reklamları",
      "Afiş tutkalı ile kolay yapışan özel doku"
    ],
    recommendedFor: "Dış mekan billboardlar, duvar reklamları, açık hava panoları."
  }
];

// KULLANIM ALANLARI DATA (14 SEKTÖR)
const KULLANIM_ALANLARI = [
  { icon: Store, title: "AVM & Alışveriş Merkezleri", desc: "Sezon indirimleri, yeni mağaza açılışları ve kampanya duyuru afişleri." },
  { icon: Building2, title: "Belediyeler & Kamu", desc: "Kültür sanat etkinlikleri, duyurular, açılışlar ve halk bilgilendirme afişleri." },
  { icon: PartyPopper, title: "Festival & Organizasyon", desc: "Açıkhava festivalleri, bahar şenlikleri ve fuar lansman afiş baskıları." },
  { icon: Music, title: "Konser & Tiyatro", desc: "Canlı performanslar, sahne gösterileri, bilet duyuruları ve lansman posterleri." },
  { icon: GraduationCap, title: "Üniversiteler & Okullar", desc: "Öğrenci kulüp duyuruları, bahar şenlikleri ve akademik konferans afişleri." },
  { icon: Trophy, title: "Spor Kulüpleri & Statlar", desc: "Maç duyuruları, kombine satış kampanyaları ve kulüp lisanslı poster baskıları." },
  { icon: Stethoscope, title: "Hastaneler & Sağlık", desc: "Hijyen kuralları, poliklinik duyuruları ve sağlık farkındalık afişleri." },
  { icon: Cross, title: "Eczaneler & Medikal", desc: "Nöbetçi eczane panoları, dermo-kozmetik indirimleri ve ürün tanıtımları." },
  { icon: ShoppingCart, title: "Zincir Marketler", desc: "Haftalık indirim afişleri, Insert ürün görselleri ve cam duyuruları." },
  { icon: Armchair, title: "Mobilya & Dekorasyon", desc: "Yeni sezon düğün paketleri, teşhir ürün indirimleri ve showroom afişleri." },
  { icon: Home, title: "Gayrimenkul & Emlak", desc: "Satılık, kiralık, devren büyük boy branda tadında kağıt ilan afişleri." },
  { icon: Car, title: "Otomotiv Galeri & Servis", desc: "Sıfır km araç lansmanları, periyodik bakım kampanyaları ve servis afişleri." },
  { icon: BookOpen, title: "Eğitim Kurumları", desc: "Erken kayıt indirimleri, bursluluk sınav duyuruları ve kurs afişleri." },
  { icon: Briefcase, title: "Fuar & Kongre Merkezleri", desc: "Stant arka fon afişleri, fuar davetiyeleri ve sektörel ürün tanıtım posterleri." }
];

// SSS DATA (20 SORU)
const AFIS_SSS = [
  {
    q: "A1 afiş baskı kaç cm ebadındadır?",
    a: "ISO standartlarında A1 ebadı 59.4 × 84.1 cm'dir. Matbaacılık tabaka standartlarında ise 50×70 cm (49×69 cm net kesim) ve 70×100 cm boyutlarında yüksek verimli baskı paftaları kullanılır. Vitrin ve caddeler için en popüler ebat 50×70 cm standardıdır."
  },
  {
    q: "A2 ve A3 afiş ebatları kaç cm’dir?",
    a: "Standart A3 ebadı 29.7 × 42 cm iken matbaa pafta kesiminde 34×49 cm tercih edilir. A2 ebadı ise 42 × 59.4 cm olup matbaada 50×70 cm (49×69 cm) baskı standardına denk düşer."
  },
  {
    q: "Poster ile afiş baskı arasında ne fark vardır?",
    a: "Afiş genelde ticari duyuru, indirim ve etkinlikler için kitlesel adetlerde (250, 500, 1000 adet) basılan tanıtım ürünüdür. Poster ise daha yüksek gramajlı (170 gr), sanatsal veya dekoratif amaçlı tekil ya da az adetli çerçevelik baskılardır."
  },
  {
    q: "Afişler dış mekanda kullanılır mı, yağmura dayanıklı mıdır?",
    a: "Kuşe kağıt afişler iç mekan, vitrin içi ve korumalı panolar için uygundur. Yağmura, neme ve dış mekan koşullarına maruz kalacak alanlarda arkası mavi engelleyici kaplamalı Blueback kağıt afiş tercih edilir."
  },
  {
    q: "Afiş baskısında laminasyon veya selefon kaplama yapılır mı?",
    a: "Evet. 170 gr kalınlığındaki afişlerde isteğe bağlı olarak mat veya parlak selefon kaplama yapılabilir. Selefon, renklerin solmasını önler ve afişe yırtılmaya karşı ekstra dayanıklılık kazandırır."
  },
  {
    q: "Kuşe kağıt afiş mi yoksa Blueback afiş mi tercih edilmeli?",
    a: "Vitrin, iç mekan panoları, mağaza içi ve düz yüzeyler için canlı renk veren 135 gr veya 170 gr Kuşe kağıt; billboard, açıkhava reklam tabelaları ve eski afişlerin üzerine yapıştırma işlemleri için arkasını göstermeyen Blueback kağıt tercih edilmelidir."
  },
  {
    q: "Afiş baskı dosyası kaç DPI çözünürlükte olmalıdır?",
    a: "Büyük boy afiş baskılarında pikselleşme olmaması ve yazıların net çıkması için tasarım dosyalarının birebir ebatta en az 300 DPI çözünürlükte hazırlanması önerilir."
  },
  {
    q: "Afiş tasarım dosyasında PDF formatı zorunlu mudur?",
    a: "Font kayması, renk değişimi ve görsel kayıplarının önüne geçmek için vektörel fontları konvertlenmiş, baskıya hazır PDF, TIFF veya EPS/AI formatı tercih edilmelidir."
  },
  {
    q: "Afiş baskısı için CMYK renk modu neden şarttır?",
    a: "Ekran renkleri RGB modundadır, ancak matbaa baskı makineleri Cyan, Magenta, Yellow ve Black (CMYK) mürekkepleriyle çalışır. Dosyanın CMYK olması baskı renklerinin ekrandakine en yakın tonda çıkmasını sağlar."
  },
  {
    q: "Afişlerde minimum baskı adedi kaçtır, tek adet basılır mı?",
    a: "Ofset büyük boy afiş baskılarında kalıp maliyetlerinin düşmesi için minimum ekonomik adet 250 adettir. Dijital büyük format baskı makinelerimizde ise tek adet veya az adetli özel boy afiş/poster üretimi yapılabilmektedir."
  },
  {
    q: "Afişlere parlak veya mat selefon kaplama yapılabilir mi?",
    a: "Evet. Parlak selefon afişteki renklerin daha canlı ve patlak görünmesini sağlarken, mat selefon ışık yansımalarını kırarak prestijli ve okunabilir bir görünüm katar."
  },
  {
    q: "Afiş tasarımında kesim taşma payı (bleed) ne kadar olmalıdır?",
    a: "Giyotin kesim aşamasında kenarlarda beyaz şerit kalmaması için tasarımın 4 kenarından en az +3 mm kesim taşması (bleed) verilmeli ve kritik metinler kenardan 5 mm içeride tutulmalıdır."
  },
  {
    q: "Afişlerde QR kod boyutu ne kadar olmalıdır?",
    a: "Müşterilerin cep telefonlarıyla uzaktan rahatça okutabilmesi için afiş üzerindeki QR kodun en az 2.5 × 2.5 cm boyutunda ve arka planla yüksek kontrastlı (örneğin beyaz zemin üzerine siyah) olması gerekir."
  },
  {
    q: "50x70 cm ve 70x100 cm afişler kargo ile nasıl gönderilir?",
    a: "Afişleriniz kargoda kırışmaması, katlanmaması ve yıpranmaması için özel dayanıklı rulo silindir tüplere veya mukavva destekli özel kutulara sarılarak güvenle paketlenir."
  },
  {
    q: "Afiş baskı siparişi kaç günde teslim edilir?",
    a: "Tasarımları onaylanan afiş siparişleri Topkapı imalathanemizde 24-48 saat içerisinde basılarak paketlenir ve anlaşmalı kargo ile adresinize sevk edilir."
  },
  {
    q: "Özel ebatlarda afiş baskısı yapılıyor mu?",
    a: "Evet. 34x49 cm, 49x69 cm ve 70x100 cm standart ebatlar dışında müşteri talebine göre özel ölçülerde hassas giyotin kesim uygulaması gerçekleştiriyoruz."
  },
  {
    q: "Kurumsal firmalar için afiş baskısında numune basımı var mıdır?",
    a: "Yüksek adetli kurumsal projelerde renk ve kağıt dokusu onayı için dijital baskı makinesinde gerçek boyutta prova numunesi hazırlanabilmektedir."
  },
  {
    q: "Afişte uzaktan okunabilirlik için font boyutu ne olmalıdır?",
    a: "1 metreden okuncak detay metinler min. 24 pt, 3 metreden okunacak ana başlıklar min. 72 pt, 5 metreden okunacak sloganlar ise 120 pt ve üzeri kalın tipografide seçilmelidir."
  },
  {
    q: "Afiş baskı fiyatları neye göre belirlenir?",
    a: "Fiyatlar seçilen kağıt gramajı (105 gr, 135 gr, 170 gr), ebat (35x50, 50x70, 70x100), baskı adedi (250, 500, 1000 adet) ve ekstra selefon kaplama seçeneklerine göre hesaplanır."
  },
  {
    q: "Mavi Basım İstanbul dışına kargo gönderimi yapıyor mu?",
    a: "Evet. İstanbul Topkapı matbaa tesislerimizden Türkiye'nin 81 iline ve tüm ilçelerine anlaşmalı kargo firmalarıyla hızlı teslimat sağlıyoruz."
  }
];

export const AfisPage = () => {
  const { openProductDetail } = useCart();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Afiş");
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // STRUCTURAL SCHEMAS FOR SEO
  const imageObjectSchemas = AFIS_GALLERY.map((img) => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": `https://mavibasim.com${img.src}`,
    "license": "https://mavibasim.com",
    "acquireLicensePage": "https://mavibasim.com/afis",
    "creditText": "Mavi Basım Topkapı Matbaa",
    "creator": { "@type": "Organization", "name": "Mavi Basım" },
    "copyrightNotice": "Mavi Basım Matbaacılık",
    "caption": img.alt
  }));

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Afiş Baskı ve Büyük Boy Poster Üretim Süreci",
    "description": "Mavi Basım Topkapı matbaa tesisinde Heidelberg ofset baskı makineleriyle 35x50 cm ve 50x70 cm afiş baskı, giyotin kesim ve paketleme aşamaları.",
    "thumbnailUrl": "https://mavibasim.com/images/brosur-baski.webp",
    "uploadDate": "2026-01-15T09:00:00+03:00",
    "duration": "PT45S",
    "contentUrl": "https://mavibasim.com/video/afis-baski-uretim.mp4",
    "embedUrl": "https://mavibasim.com/video/afis-baski-uretim",
    "publisher": {
      "@type": "Organization",
      "name": "Mavi Basım",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mavibasim.com/logo.png"
      }
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": AFIS_SSS.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Afiş Baskı Fiyatları | 35x50 & 50x70 cm Kuşe Poster - Mavi Basım</title>
        <meta name="description" content="34x49 cm, 49x69 cm ve 70x100 cm boyutlarında 105 gr, 135 gr, 170 gr kuşe reklam afişi ve poster baskı fiyatları. Topkapı matbaadan ucuz ve hızlı teslimat." />
        <link rel="canonical" href="https://mavibasim.com/afis" />
        <meta property="og:title" content="Afiş Baskı Fiyatları | 35x50 & 50x70 cm Kuşe Poster - Mavi Basım" />
        <meta property="og:description" content="34x49 cm, 49x69 cm ve 70x100 cm boyutlarında 105 gr, 135 gr, 170 gr kuşe reklam afişi ve poster baskı fiyatları." />
        <meta property="og:url" content="https://mavibasim.com/afis" />
        <meta property="og:type" content="product" />
        <meta property="og:image" content="https://mavibasim.com/images/brosur-baski.webp" />

        {/* JSON-LD Schemas */}
        {imageObjectSchemas.map((imgSchema, idx) => (
          <script key={idx} type="application/ld+json">{JSON.stringify(imgSchema)}</script>
        ))}
        <script type="application/ld+json">{JSON.stringify(videoSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2 animate-in fade-in duration-500">
        
        {/* BREADCRUMB & HEADER */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors" aria-label="Ana Sayfaya Dön">
            <ChevronRight size={20} className="rotate-180 text-secondary" />
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black">
              Büyük Boy Reklam Afişi ve Poster Baskı Fiyatları
            </h1>
            <span className="hidden md:block text-gray-300 text-2xl font-light">|</span>
            <p className="text-xs md:text-sm font-bold text-primary">
              105 gr, 135 gr, 170 gr Kuşe - 35x50 & 50x70 cm
            </p>
          </div>
        </div>

        {/* DYNAMIC DELIVERY BADGE BANNER */}
        <DeliveryBadge categoryKey="afis" days={3} variant="banner" className="mb-6" />

        {/* İÇİNDEKİLER (TOC) HIZLI GEZİNME KUTUSU */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-5 mb-8 text-left shadow-2xs">
          <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-tight">İçindekiler (Hızlı Gezinme)</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">TOC</span>
          </div>
          <nav className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-xs font-bold text-slate-700" aria-label="Sayfa İçindekiler Navigasyonu">
            <a href="#fiyat-tablosu" className="bg-white hover:bg-primary hover:text-white border border-slate-200 p-2 rounded-xl transition-all flex items-center gap-1 shadow-2xs group">
              <span className="text-primary group-hover:text-white font-black">1.</span> Fiyat Tablosu
            </a>
            <a href="#afis-cesitleri" className="bg-white hover:bg-primary hover:text-white border border-slate-200 p-2 rounded-xl transition-all flex items-center gap-1 shadow-2xs group">
              <span className="text-primary group-hover:text-white font-black">2.</span> Çeşitler
            </a>
            <a href="#kagit-rehberi" className="bg-white hover:bg-primary hover:text-white border border-slate-200 p-2 rounded-xl transition-all flex items-center gap-1 shadow-2xs group">
              <span className="text-primary group-hover:text-white font-black">3.</span> Kağıt Rehberi
            </a>
            <a href="#kullanim-alanlari" className="bg-white hover:bg-primary hover:text-white border border-slate-200 p-2 rounded-xl transition-all flex items-center gap-1 shadow-2xs group">
              <span className="text-primary group-hover:text-white font-black">4.</span> Kullanım Alanları
            </a>
            <a href="#gorsel-galeri" className="bg-white hover:bg-primary hover:text-white border border-slate-200 p-2 rounded-xl transition-all flex items-center gap-1 shadow-2xs group">
              <span className="text-primary group-hover:text-white font-black">5.</span> Örnek Görseller
            </a>
            <a href="#teknik-ozellikler" className="bg-white hover:bg-primary hover:text-white border border-slate-200 p-2 rounded-xl transition-all flex items-center gap-1 shadow-2xs group">
              <span className="text-primary group-hover:text-white font-black">6.</span> Teknik Tablo
            </a>
            <a href="#tasarim-rehberi" className="bg-white hover:bg-primary hover:text-white border border-slate-200 p-2 rounded-xl transition-all flex items-center gap-1 shadow-2xs group">
              <span className="text-primary group-hover:text-white font-black">7.</span> Tasarım Rehberi
            </a>
            <a href="#sss-bolumu" className="bg-white hover:bg-primary hover:text-white border border-slate-200 p-2 rounded-xl transition-all flex items-center gap-1 shadow-2xs group">
              <span className="text-primary group-hover:text-white font-black">8.</span> Sıkça Sorulan Sorular
            </a>
          </nav>
        </div>

        {/* FİYAT LİSTESİ TABLOSU */}
        <div id="fiyat-tablosu" className="scroll-mt-24 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[11px] md:text-[13px]">
              <thead>
                <tr className="bg-black text-white border-b border-black">
                  <th className="p-4 w-40"></th>
                  <th className="p-4 w-36 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">EBAT</th>
                  <th className="p-4 w-28 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">KOD</th>
                  <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ÖZELLİKLER & MADDELER</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ADET</th>
                  <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">FİYAT</th>
                  <th className="p-4 w-44 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                </tr>
              </thead>
              <tbody>
                {AFIS_DATA.map((category, cIdx) => {
                  const chunks: any[] = [];
                  let currentChunk: any[] = [];
                  let lastEbat: any = null;

                  category.items.forEach((item) => {
                    if (lastEbat !== null && item.ebat !== lastEbat) {
                      chunks.push(currentChunk);
                      currentChunk = [];
                    }
                    currentChunk.push(item);
                    lastEbat = item.ebat;
                  });
                  if (currentChunk.length > 0) chunks.push(currentChunk);

                  return (
                    <React.Fragment key={cIdx}>
                      {chunks.map((chunk, chunkIdx) => (
                        <React.Fragment key={`${cIdx}-${chunkIdx}`}>
                          {chunk.map((item, itemIdx) => (
                            <tr key={`${cIdx}-${chunkIdx}-${itemIdx}`} className="border-b border-gray-100 hover:bg-primary/5 transition-all cursor-default group">
                              {itemIdx === 0 && (
                                <td 
                                  rowSpan={chunk.length}
                                  className="bg-white border-r border-gray-200 p-2 w-48 text-center align-middle"
                                >
                                  <div className="flex flex-col items-center justify-center">
                                    <span className="text-[16px] md:text-[18px] font-black text-black uppercase mb-0.5 leading-tight">
                                      AFİŞ BASKI
                                    </span>
                                    <span className="text-[15px] md:text-[17px] font-black text-primary mb-0.5 leading-tight">
                                      {category.subTitle.split(' ')[0]} {category.subTitle.split(' ')[1]}
                                    </span>
                                    <span className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-tight text-center leading-tight">
                                      {category.subTitle.split(' ').slice(2).join(' ')}
                                    </span>
                                  </div>
                                </td>
                              )}
                              <td className="p-3.5 text-center border-r border-gray-100">
                                <span className="inline-block px-3 py-1 rounded border border-slate-300 bg-slate-100 text-slate-800 font-bold text-[13px] md:text-[14px] whitespace-nowrap">
                                  {item.ebat}
                                </span>
                              </td>
                              <td className="p-3.5 text-center font-bold text-slate-700 border-r border-gray-100 group-hover:text-primary transition-colors">
                                {item.code}
                              </td>
                              <td className="p-3.5 text-center text-slate-700 font-medium border-r border-gray-100">
                                <span className="group-hover:font-bold transition-all">
                                  {item.desc}
                                </span>
                              </td>
                              <td className="p-3.5 text-center text-slate-700 font-medium border-r border-gray-100 transition-colors">
                                <span className="font-bold">{item.miktar}</span>
                              </td>
                              <td className="p-3.5 text-center font-black text-black border-r border-gray-100 bg-gray-50/30 group-hover:bg-primary/5 text-[15px] md:text-[17px] transition-colors">
                                {item.price}
                              </td>
                              <td className="p-3.5 text-center">
                                <button 
                                  onClick={() => openWhatsApp(item)}
                                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-4 py-2 rounded-full text-xs md:text-sm font-black tracking-tight leading-none transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
                                >
                                  <ShoppingCart size={14} className="shrink-0" />
                                  <span>Hemen Sipariş Ver</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                          {(chunkIdx < chunks.length - 1 || cIdx < AFIS_DATA.length - 1) && (
                            <tr className="border-b-[3px] border-slate-300">
                              <td colSpan={7} className="h-0 p-0"></td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="bg-slate-50 px-5 py-3 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 font-medium font-sans gap-2">
            <span>* Tablomuzda belirtilen tüm fiyatlarımıza %20 KDV dahil değildir.</span>
            <span className="font-bold text-slate-700">Topkapı Matbaa Teslim / Anlaşmalı Kargo İmkanı</span>
          </div>
        </div>

        <div className="mt-4 mb-12">
          <FireWarning />
        </div>

        {/* DETAYLI İÇERİK BÖLÜMLERİ */}
        <div className="space-y-16">
          
          {/* BÖLÜM 1: AFİŞ VE POSTER BASKI NEDİR? */}
          <section className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-black text-black mb-4 uppercase tracking-tight flex items-center gap-3">
              <Printer className="text-primary shrink-0" size={32} />
              Büyük Boy Afiş ve Reklam Posteri Baskısı
            </h2>
            <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed space-y-4">
              <p className="text-base md:text-lg">
                <strong className="text-black">Afiş baskı</strong>; mağaza indirimleri, yeni ürün lansmanları, konser ve tiyatro etkinlikleri, seçim kampanyaları, emlak ilanları ve kurumsal marka duyuruları için kullanılan en etkili geniş format tanıtım ürünüdür. Açık alanlarda, bina cephelerinde, AVM vitrinlerinde ve iç mekan duyuru panolarında hedef kitleye saniyeler içinde ulaşmanızı sağlar.
              </p>
              <p className="text-base md:text-lg">
                İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki yüksek teknolojili Heidelberg ofset baskı parkurumuzda <strong className="text-black">34×49 cm (35×50 cm matbaa standardı)</strong>, <strong className="text-black">49×69 cm (50×70 cm matbaa standardı)</strong> ve <strong className="text-black">70×100 cm (Dev Boy / Tabaka)</strong> ebatlarında afişler basıyoruz. Kağıt tercihinize göre <strong className="text-black">105 gr, 135 gr, 170 gr parlak kuşe</strong> veya dış mekan dayanımlı <strong className="text-black">Blueback kağıt</strong> seçeneklerini en ekonomik fiyatlarla sunuyoruz.
              </p>
            </div>
          </section>

          {/* BÖLÜM 2: AFİŞ VE POSTER ÇEŞİTLERİ */}
          <section id="afis-cesitleri" className="scroll-mt-24">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-primary font-black text-xs md:text-sm uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-3">
                Ürün Seçenekleri
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                Kullanım Amacına Göre Afiş ve Poster Çeşitleri
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-2">
                Sektörünüze ve reklam alanınıza özel olarak tasarlanıp basılan profesyonel afiş modellerimiz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "İç Mekân Afişi", badge: "135 gr Kuşe", desc: "AVM içi panolar, koridorlar, mağaza içi reyonlar ve kapalı sergiler için yüksek canlılıkta 135 gr kuşe afiş baskısı." },
                { title: "Vitrin Afişi", badge: "135 - 170 gr Kuşe", desc: "Mağaza ve restoranların cam yüzeylerinde dışarıdan geçen yayaların dikkatini çeken yüksek renk yoğunluklu vitrin afişi." },
                { title: "Kampanya & İndirim Afişi", badge: "105 gr Kuşe", desc: "Sezon sonu indirimleri, efsane cuma fırsatları ve açılışlar için seri basılan yüksek adetli ekonomik kampanya afişleri." },
                { title: "Poster & Sanat Baskısı", badge: "170 gr Tok Kuşe", desc: "Sergi, müze, konser ve dekoratif çerçeve içi kullanımlar için kalın gramajlı premium dijital ve ofset poster baskıları." },
                { title: "Emlak & Gayrimenkul Afişi", badge: "50x70 & 70x100 cm", desc: "Satılık ve kiralık konut/arsa ilanları için caddeden uzaktan kolay okunabilen canlı renkli büyük boy emlak afişleri." },
                { title: "Seçim & Siyasi Afişler", badge: "Kitlesel Üretim", desc: "Mitingler, parti stantları ve saha çalışmaları için binlerce adet hızlı basılan ofset seçim afişi paketleri." },
                { title: "Etkinlik & Konser Afişi", badge: "Tiyatro & Sinema", desc: "Kültür merkezleri, sahne sanatları ve konser lansmanları için sanatçı ve bilet detaylı tasarım afiş baskıları." },
                { title: "Mağaza & Duyuru Afişi", badge: "Görsel Markalama", desc: "Yeni sezon koleksiyon tanıtımları ve marka imaj reklamları için pürüzsüz yüzeyli büyük ebat afişler." }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-primary hover:shadow-lg transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-[10px] font-black uppercase tracking-wider bg-white border border-slate-200 px-2.5 py-1 rounded-full text-slate-700">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-black mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm font-medium text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* BÖLÜM 3: KAĞIT KARŞILAŞTIRMASI REHBERİ */}
          <section id="kagit-rehberi" className="scroll-mt-24 bg-slate-900 text-white p-8 md:p-12 rounded-[32px]">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-primary font-black text-xs md:text-sm uppercase tracking-widest bg-primary/20 text-primary-light px-4 py-1.5 rounded-full inline-block mb-3">
                Kağıt Karşılaştırma Rehberi
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                Afiş Baskısında Doğru Kağıt Gramajı Nasıl Seçilir?
              </h2>
              <p className="text-slate-300 text-sm md:text-base mt-2">
                Reklam alanınızın özelliğine, bütçenize ve kullanım sürenize en uygun kağıdı hemen belirleyin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {KAGIT_KARSILASTIRMASI.map((k, idx) => (
                <div key={idx} className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between hover:border-primary transition-all">
                  <div>
                    <span className={`inline-block text-[11px] font-black uppercase px-3 py-1 rounded-full border mb-4 ${k.badgeColor}`}>
                      {k.badge}
                    </span>
                    <h3 className="text-xl font-black text-white mb-4 border-b border-slate-700 pb-2">
                      {k.title}
                    </h3>
                    <ul className="space-y-2.5 mb-6 text-xs md:text-sm text-slate-300">
                      {k.features.map((f, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700 text-[11px] md:text-xs font-medium text-slate-300">
                    <strong className="text-primary block font-black mb-1">Tavsiye Edilen Kullanım:</strong>
                    {k.recommendedFor}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BÖLÜM 4: SEKTÖREL KULLANIM ALANLARI */}
          <section id="kullanim-alanlari" className="scroll-mt-24">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-primary font-black text-xs md:text-sm uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-3">
                Sektörel İhtiyaçlar
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                Afiş Baskının Kullanıldığı 14 Ana Sektör
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-2">
                Farklı iş kollarına özel tasarımlarla yüksek görünürlük ve satış dönüşümü sağlayan afişlerimiz.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
              {KULLANIM_ALANLARI.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 text-center hover:border-primary hover:shadow-md transition-all flex flex-col items-center justify-center group">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-primary group-hover:text-white text-slate-800 flex items-center justify-center transition-all mb-3 shadow-2xs">
                      <IconComponent size={24} />
                    </div>
                    <h3 className="text-xs font-black text-black mb-1 group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-medium leading-tight hidden md:block">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* BÖLÜM 5: GÖRSEL ÖRNEKLER VE GALERİ */}
          <section id="gorsel-galeri" className="scroll-mt-24">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-primary font-black text-xs md:text-sm uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-3">
                Üretim & Baskı Örnekleri
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                Baskısını Yaptığımız Afiş ve Poster Uygulamaları
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-2">
                Topkapı imalathanemizde 300 DPI yüksek çözünürlüklü offset makinelerle basılan canlı örnekler.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {AFIS_GALLERY.map((g, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/40 transition-all group">
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img 
                      src={g.src} 
                      alt={g.alt}
                      title={g.title}
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Mavi Basım
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-black text-black mb-2 group-hover:text-primary transition-colors">
                      {g.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                      {g.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BÖLÜM 6: TEKNİK ÖZELLİKLER TABLOSU */}
          <section id="teknik-ozellikler" className="scroll-mt-24">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Ruler className="text-primary shrink-0" size={28} />
                <h2 className="text-2xl font-black text-black uppercase tracking-tight">
                  Afiş Baskı Teknik Özellikler Tablosu
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-xs md:text-sm bg-white rounded-xl overflow-hidden border border-slate-200 shadow-2xs">
                  <thead>
                    <tr className="bg-slate-900 text-white text-left font-black">
                      <th className="p-3.5 w-1/3 border-b border-slate-800">Teknik Parametre</th>
                      <th className="p-3.5 border-b border-slate-800">Fabrika Üretim Değeri</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Kağıt Türleri</td>
                      <td className="p-3.5">105 gr, 135 gr, 170 gr Parlak Kuşe & Blueback Dış Mekan Kağıdı</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Baskı Ebatları</td>
                      <td className="p-3.5">34×49 cm (35×50 cm Matbaa Standardı), 49×69 cm (50×70 cm Matbaa Standardı), 70×100 cm (Dev Boy / Tabaka)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Baskı Teknolojisi</td>
                      <td className="p-3.5">Heidelberg Ofset Baskı (Büyük Metraj) & Dijital Geniş Format Baskı</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Renk Modu</td>
                      <td className="p-3.5">4 Renk CMYK (Yüksek Piksel Renk Doygunluğu)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Baskı Yönü</td>
                      <td className="p-3.5">Tek Yön Renkli Baskı (4/0)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Kesim Taşma Payı (Bleed)</td>
                      <td className="p-3.5">Her taraftan +3 mm kesim payı (Emniyet marjı 5 mm)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Çözünürlük Hassasiyeti</td>
                      <td className="p-3.5">Minimum 300 DPI (Vektörel PDF / TIFF / EPS)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Minimum Üretim Adedi</td>
                      <td className="p-3.5">Ofset Baskıda 250 Adet / Dijital Baskıda İsteğe Göre Özel Adet</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">Ekstra Bitiş İşlemleri</td>
                      <td className="p-3.5">Mat / Parlak Selefon Kaplama, Perforaj, Katlama, Rulo Paketleme</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* BÖLÜM 7: AFİŞ NASIL HAZIRLANIR? */}
          <section id="tasarim-rehberi" className="scroll-mt-24">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-primary font-black text-xs md:text-sm uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-3">
                Tasarım Standartları
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                Afiş Nasıl Hazırlanır? (Profesyonel Tasarım Rehberi)
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-2">
                Afişinizin uzaktan dikkat çekmesi, okunabilmesi ve kusursuz basılması için 6 altın kural.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Type,
                  title: "1. Tipografi & Font Boyutu",
                  desc: "1 metreden okunacak detaylar min 24 pt, 3 metreden okunacak başlıklar min 72 pt, 5 metreden fark edilecek sloganlar min 120 pt olmalıdır."
                },
                {
                  icon: Eye,
                  title: "2. İzleme Mesafesi Kuralı",
                  desc: "Afişin asılacağı yerdeki yaya ve araç trafiğinin izleme mesafesine (1m, 3m, 5m) göre görsel ve metin büyüklükleri ayarlanmalıdır."
                },
                {
                  icon: QrCode,
                  title: "3. QR Kod Boyutu & Konumu",
                  desc: "Kullanıcıların mobil kamerayla anında tarayabilmesi için QR kod min. 2.5×2.5 cm ebadında ve zeminle yüksek kontrastlı olmalıdır."
                },
                {
                  icon: Sparkles,
                  title: "4. Kontrast & Renk Seçimi",
                  desc: "Arka plan ve metinler arasında yüksek zıtlık kurulmalıdır. Siyah zemine sarı veya beyaz zemine kırmızı/lacivert yüksek okunurluk sağlar."
                },
                {
                  icon: Maximize2,
                  title: "5. Güvenli Alan & 3 mm Taşma",
                  desc: "Tasarım kenarlarına +3 mm kesim taşması verilmelidir. Yazı ve logolar kesim çizgisinden en az 5 mm içeride tutulmalıdır."
                },
                {
                  icon: FileText,
                  title: "6. CMYK & Vektörel Dosya",
                  desc: "Renk kaymasını önlemek için çalışma CMYK renk modunda hazırlanmalı, logolar vektörel çizim olarak 300 DPI PDF kaydedilmelidir."
                }
              ].map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-primary transition-all shadow-2xs">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black mb-4">
                      <ItemIcon size={20} />
                    </div>
                    <h3 className="text-lg font-black text-black mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm font-medium text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* AFİŞTE SIK YAPILAN 5 HATA (UYARI BÖLÜMÜ) */}
          <section className="bg-red-50 p-8 md:p-12 rounded-[32px] border border-red-200">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-red-600 shrink-0" size={32} />
              <h2 className="text-2xl md:text-3xl font-black text-red-700 uppercase tracking-tight">
                Afişte Sık Yapılan 5 Kritik Tasarım Hatası
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Eksik İletişim & QR Kod: Tarih, adres, telefon veya web adresinin çok küçük ya da unutulmuş olması.",
                "Düşük Çözünürlük (RGB): İnternetten indirilen 72 DPI pikselli görsellerin büyük boyutta basılması.",
                "Karmaşık & Kalabalık Düzen: Tek bir afişe onlarca paragraf metin doldurarak okunabilirliğin sıfırlanması.",
                "Taşma Payı Bırakmamak: Kesimde yazıların veya logonun giyotin bıçağı altında kalarak kırpılması.",
                "Zayıf Kağıt Seçimi: Vitrin ve dış mekan kullanımında ince el ilanı kâğıdı seçilerek afişin pot yapması."
              ].map((err, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-red-100 shadow-2xs">
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    !
                  </span>
                  <p className="text-xs md:text-sm font-bold text-red-950 leading-relaxed">
                    {err}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* BÖLÜM 8: SSS (SIKÇA SORULAN SORULAR) */}
          <section id="sss-bolumu" className="scroll-mt-24">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-primary font-black text-xs md:text-sm uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-3">
                Sıkça Sorulan Sorular
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                Afiş Baskı Hakkında Sıkça Sorulan Sorular (SSS)
              </h2>
              <p className="text-slate-600 text-sm md:text-base mt-2">
                Ebatlar, kâğıt gramajları, sipariş süreçleri ve teslimat şartları hakkında tüm sorularınızın yanıtları.
              </p>
            </div>

            <div className="space-y-3 max-w-4xl mx-auto">
              {AFIS_SSS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-black text-sm md:text-base text-slate-900 flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center shrink-0">
                          ?
                        </span>
                        {faq.q}
                      </span>
                      <ChevronDown 
                        size={18} 
                        className={`text-slate-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} 
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs md:text-sm font-medium text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* BÖLÜM 9: İÇ BAĞLANTILAR & İLGİLİ ÜRÜNLER */}
          <section className="bg-slate-100 p-8 rounded-3xl border border-slate-200">
            <h2 className="text-xl md:text-2xl font-black text-black mb-6 uppercase tracking-tight">
              Afiş Siparişinizi Tamamlayan Diğer Matbaa Ürünlerimiz
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { title: "Broşür Baskı", path: "/brosur", desc: "Katlamalı tanıtım broşürleri" },
                { title: "El İlanı Baskı", path: "/el-ilani", desc: "Ekonomik elden dağıtım ilanları" },
                { title: "Magnet Baskı", path: "/magnet", desc: "Buzdolabı paket servis magneti" },
                { title: "Etiket Baskı", path: "/etiket", desc: "Çıkartma ve ambalaj etiketleri" },
                { title: "Kartvizit Baskı", path: "/kartvizit", desc: "Sıvama ve kabartma laklı kartlar" },
                { title: "Roll Up Banner", path: "/reklam-urunleri", desc: "Açılır kapanır mekanizmalı banner" },
                { title: "Karton Çanta", path: "/karton-canta", desc: "Lüks ipli kurumsal ambalaj çantası" },
                { title: "Zarf Baskı", path: "/zarf", desc: "Pencereli ve penceresiz antetli zarf" },
                { title: "Amerikan Servis", path: "/amerikan-servis", desc: "Restoranlar için kağıt masa örtüsü" },
                { title: "Makbuz & Formlar", path: "/makbuz-ve-formlar", desc: "Otokopili fatura ve adisyonlar" }
              ].map((item, idx) => (
                <Link 
                  key={idx} 
                  to={item.path} 
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-primary hover:shadow-md transition-all group"
                >
                  <h3 className="text-xs md:text-sm font-black text-slate-900 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-medium mt-1">
                    {item.desc}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* AJANS & TOPLU ALIM CTA */}
          <AgencyDiscountCTA />

        </div>
      </div>

      {/* FOOTER SEO SECTION WITH ALL LSI KEYWORDS */}
      <ProductSEOSection categoryKey="afis" />
    </div>
  );
};

export default AfisPage;

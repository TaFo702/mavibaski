import React, { useState } from 'react';
import { 
  Check, 
  ChevronDown, 
  MessageCircle, 
  FileText, 
  Layers, 
  Settings, 
  ShieldCheck, 
  Sparkles, 
  Globe, 
  Clock, 
  Coins, 
  Award, 
  Briefcase, 
  MapPin, 
  HelpCircle, 
  TrendingUp, 
  ArrowRight,
  CheckCircle2,
  Scissors,
  Info,
  RefreshCw,
  Star
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ProductSEOSection, FireWarning } from '../App';
import { WhatsAppIcon } from './WhatsAppIcon';

const WHATSAPP_NUMBER = "905366022373";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Merhaba, profesyonel grafik tasarım hizmetleriniz ve özel tasarım paketleriniz hakkında bilgi almak istiyorum.")}`;

export const GrafikTasarimPage = () => {
  const [portfolioFilter, setPortfolioFilter] = useState<string>("Tümü");

  const services = [
    { 
      title: "Logo Tasarımı", 
      desc: "Markanızın vizyonunu, değerlerini ve sektörünü en sade, akılda kalıcı ve özgün şekilde yansıtan, patent tesciline uygun vektörel logolar hazırlıyoruz.",
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      deliveryTime: "3-5 İş Günü",
      linkPath: "/kartvizit",
      linkLabel: "Logo Tasarım Fiyatları",
      printProductPath: "/kartvizit",
      printProductLabel: "Kartvizit Baskı Seçenekleri"
    },
    { 
      title: "Kartvizit Tasarımı", 
      desc: "Lüks lak, gofre veya özel kesim baskı tekniklerine göre optimize edilmiş, kurumsal kimliğinizi en prestijli şekilde temsil edecek çift yönlü kartvizitler.",
      icon: <FileText className="w-6 h-6 text-primary" />,
      deliveryTime: "1-2 İş Günü",
      linkPath: "/kartvizit",
      linkLabel: "Kartvizit Tasarım Fiyatları",
      printProductPath: "/kartvizit",
      printProductLabel: "Kartvizit Baskı Çeşitleri"
    },
    { 
      title: "Broşür & Katalog Tasarımı", 
      desc: "Çok sayfalı mizanpaj kuralları, katlama çizgileri ve cilt payları sıfır hata ile hesaplanmış, ürün ve hizmetlerinizi satışa dönüştüren katalog tasarımları.",
      icon: <Layers className="w-6 h-6 text-primary" />,
      deliveryTime: "3-5 İş Günü",
      linkPath: "/kataloglar",
      linkLabel: "Katalog Tasarım Fiyatları",
      printProductPath: "/brosur",
      printProductLabel: "Broşür & Katalog Baskısı"
    },
    { 
      title: "Afiş & Poster Tasarımı", 
      desc: "Dış mekan, fuar alanları veya kampanya duyurularınız için uzaktan fark edilebilen, tipografik hiyerarşisi dengeli ve yüksek çözünürlüklü tasarımlar.",
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
      deliveryTime: "1-2 İş Günü",
      linkPath: "/afis",
      linkLabel: "Afiş Tasarım Fiyatları",
      printProductPath: "/afis",
      printProductLabel: "Afiş & Poster Baskısı"
    },
    { 
      title: "Ambalaj & Etiket Tasarımı", 
      desc: "Ürünlerinizi rafta öne çıkaracak özel kutu bıçak izi tasarımları, suya dayanıklı kozmetik/gıda etiketleri ve şık sticker tasarımları.",
      icon: <Award className="w-6 h-6 text-primary" />,
      deliveryTime: "2-4 İş Günü",
      linkPath: "/etiket",
      linkLabel: "Etiket Tasarım Fiyatları",
      printProductPath: "/etiket",
      printProductLabel: "Etiket & Çıkartma Baskısı"
    },
    { 
      title: "Kurumsal Kimlik Paketi", 
      desc: "A'dan Z'ye kurumsal bütünlük: Logo, kartvizit, antetli kağıt, diplomat zarf, cepli dosya ve bloknot tasarımlarının bir arada sunulduğu anahtar teslim çözüm.",
      icon: <Briefcase className="w-6 h-6 text-primary" />,
      deliveryTime: "7-10 İş Günü",
      linkPath: "/dosyalar",
      linkLabel: "Kurumsal Kimlik Paket Fiyatları",
      printProductPath: "/dosyalar",
      printProductLabel: "Cepli Sunum Dosyası Baskısı"
    }
  ];

  const process = [
    { 
      title: "1. Detaylı Brief & Sektör Analizi", 
      desc: "WhatsApp, e-posta veya telefon üzerinden markanızın hedeflerini ve beğendiğiniz tarzları alıyoruz. Sektörünüzdeki rakipleri inceleyerek stratejik bir yol haritası çıkartıyoruz." 
    },
    { 
      title: "2. Kavramsal Konsept & Taslak Sunumu", 
      desc: "İhtiyacınıza uygun olarak 2 veya 3 farklı özgün tasarım konsepti hazırlayarak yüksek çözünürlüklü PDF formatında beğeninize sunuyoruz." 
    },
    { 
      title: "3. Etkileşimli Revizyon & Detaylandırma", 
      desc: "Seçtiğiniz konsept üzerinde renk, yazı tipi, yerleşim ve oran revizyonlarını hızlıca gerçekleştiriyoruz. Siz 'tamam' diyene kadar detayları netleştiriyoruz. Tarafınızdan iletilen her bir revizyon talebinden sonra, yapılan güncellemeler tasarım ekibimiz tarafından genellikle 4 ila 12 saat (en geç 1 iş günü) içerisinde tamamlanarak yeni onayınıza sunulur." 
    },
    { 
      title: "4. Teknik Kontrol & Doğrudan Baskı Entegrasyonu", 
      desc: "Tasarım bittiğinde renk profillerini (CMYK), taşırma paylarını ve katlama bıçak izlerini doğrudan merkezi matbaamızdaki makinelere %100 uyumlu hale getirip üretime aktarıyoruz." 
    }
  ];

  const caseStudies = [
    {
      title: "Anadolu Tarım Ürünleri A.Ş. - Ahmet Yılmaz",
      category: "Kurumsal Logo & Kraft Ambalaj Kutusu",
      filterTags: ["Logo", "Ambalaj"],
      challenge: "Yeni e-ticaret markamız için doğayı simgeleyen özgün bir logo ve kraft ambalaj kutusu tasarımı arıyorduk.",
      solution: "Bize sunulan 3 özgün konsept arasından seçtiğimiz logomuzu, modern kesim kalıplarına özel hazırlayarak doğrudan basılabilir ambalaj formatına giydirdiler.",
      date: "Ocak 2026",
      rating: 5,
      reviewText: "Yıllardır çalıştığımız en profesyonel grafik ekibi. Sadece çizim yapmadılar, ambalajın basılacağı kraft kağıdın dokusunu ve katlama yerlerini de tam ölçüsünde hesaplayarak bizi hatalı üretim riskinden kurtardılar. Tasarım ve baskıyı tek çatı altında çözmek hem bütçemizi hem zamanımızı korudu.",
      reviewerRole: "Kurucu, Anadolu Organik Tarım",
      verified: true,
      projectDetails: [
        { label: "Sektör", value: "Organik Gıda & Tarım" },
        { label: "Ürün Türü", value: "Özel Kesim Kilitli Kraft Kutu" },
        { label: "Üretim Yeri", value: "İstanbul Merkezi Üretim Tesisimiz" },
        { label: "Onay Yöntemi", value: "Fiziksel Numune & 3D Prova" },
        { label: "Formatlar", value: "Adobe Illustrator (.AI), PDF, SVG" }
      ],
      relatedProducts: [
        { name: "Kutu & Ambalaj Baskısı", path: "/ambalaj", icon: "📦" },
        { name: "Ürün Rulo Etiketi", path: "/etiket", icon: "🏷️" }
      ],
      designPriceInfo: {
        serviceName: "Sıfırdan Özgün Logo & Kutu Tasarımı",
        priceRange: "6.000 TL – 13.500 TL",
        discountedRange: "3.000 TL – 6.750 TL",
        targetId: "tasarim-fiyat-listesi"
      }
    },
    {
      title: "Vanguard Hukuk & Danışmanlık - Av. Canan Demir",
      category: "Lüks Kurumsal Kimlik & Evrak Seti",
      filterTags: ["Kurumsal Kimlik"],
      challenge: "Hukuk büromuzun kurumsal imajına yakışacak, lüks yaldız ve kabartma lak baskı teknikleriyle uyumlu şık tasarımlara ihtiyacımız vardı.",
      solution: "Koyu lacivert zemin üzerinde altın yaldız ve parlak kabartma lak alanlarını vektörel katmanlar olarak önceden ayırdılar. Kartvizit, diplomat zarf ve cepli sunum dosyamızı son derece kaliteli modellediler.",
      date: "Şubat 2026",
      rating: 5,
      reviewText: "Lüks kartvizitlerimizin ve sunum dosyalarımızın yaldızlı kısımları o kadar yüksek kalitede çıktı ki! Matbaa ustalarıyla koordineli çalışmaları sayesinde renklerde hiçbir kayma yaşamadık. Hizmet son derece hızlı ve yazılı onay sistemleri çok güven vericiydi.",
      reviewerRole: "Yönetici Ortak, Vanguard Hukuk Bürosu",
      verified: true,
      projectDetails: [
        { label: "Sektör", value: "Hukuk & Danışmanlık" },
        { label: "Ürün Türü", value: "Varak Yaldızlı Kartvizit, Zarf & Dosya" },
        { label: "Üretim Yeri", value: "İstanbul Merkezi Üretim Tesisimiz" },
        { label: "Onay Yöntemi", value: "Klişe Prova Baskısı & PDF" },
        { label: "Formatlar", value: "Katmanlı AI (Vektör), PDF/X-1a" }
      ],
      relatedProducts: [
        { name: "Lüks Kartvizit Baskısı", path: "/kartvizit", icon: "📇" },
        { name: "Cepli Sunum Dosyası", path: "/dosyalar", icon: "📁" },
        { name: "Diplomat Zarf Baskısı", path: "/zarf", icon: "📨" }
      ],
      designPriceInfo: {
        serviceName: "Kurumsal Kimlik Paketi (Logo + Evrak)",
        priceRange: "8.500 TL – 15.000 TL",
        discountedRange: "4.250 TL – 7.500 TL",
        targetId: "tasarim-fiyat-listesi"
      }
    },
    {
      title: "NovaTech E-Ticaret - Eren Sönmez",
      category: "Premium Ürün Ambalaj Kutusu",
      filterTags: ["Ambalaj"],
      challenge: "E-ticaret siparişlerimizin şık bir unboxing deneyimi sunacak bıçak izi ve tasarım arıyorduk.",
      solution: "Kayma riskini önlemek için özel ambalaj kutusu bıçak çizimini modern kesim kalıplarımıza özel çizerek, marka renk geçişlerimizi ofset üretime uygun kodladılar.",
      date: "Mart 2026",
      rating: 5,
      reviewText: "Mavi Basım'ın teknik bilgisi gerçekten harika. Bıçak çizgilerini hassas hazırladıkları için 10.000 adetlik siparişimizin tek bir tanesinde bile katlama hatası veya kayma olmadı. Doğru tasarım sayesinde fire oranımızı minimuma indirdi.",
      reviewerRole: "Operasyon Direktörü, NovaTech Türkiye",
      verified: true,
      projectDetails: [
        { label: "Sektör", value: "Teknoloji & E-Ticaret" },
        { label: "Ürün Türü", value: "Amerikan Bristol Karton Kutu" },
        { label: "Üretim Yeri", value: "İstanbul Merkezi Üretim Tesisimiz" },
        { label: "Onay Yöntemi", value: "Plotter Kesim Maketi" },
        { label: "Formatlar", value: "Kalıplı AI, PDF" }
      ],
      relatedProducts: [
        { name: "Ambalaj Kutusu Baskısı", path: "/kutu", icon: "📦" },
        { name: "Markalı Sticker Etiket", path: "/etiket", icon: "🎯" }
      ],
      designPriceInfo: {
        serviceName: "Sıfırdan Özel Kutu & Ambalaj Tasarımı",
        priceRange: "2.500 TL – 6.000 TL",
        discountedRange: "1.250 TL – 3.000 TL",
        targetId: "tasarim-fiyat-listesi"
      }
    }
  ];

  const sectors = [
    { 
      name: "Eğitim, Okul & Kurslar", 
      details: "Eğitim ve tanıtım materyalleri için özel mizanpaj ve sayfa tasarımları hazırlıyoruz.",
      primaryDesignService: "Broşür & Tanıtım Dosyası Tasarımı",
      links: [
        { name: "Bloknotlar", path: "/bloknotlar" },
        { name: "Cepli Dosya", path: "/dosyalar" },
        { name: "Afiş", path: "/afis" }
      ]
    },
    { 
      name: "Gıda, Restoran & Kafe", 
      details: "İştah açıcı renk yönetimiyle menü mizanpajları ve özel gıda paketleme tasarımları.",
      primaryDesignService: "Menü Mizanpajı & Gıda Ambalaj Tasarımı",
      links: [
        { name: "Amerikan Servis", path: "/amerikan-servis" },
        { name: "Magnet", path: "/magnet" },
        { name: "Ambalaj", path: "/ambalaj" }
      ]
    },
    { 
      name: "Hukuk, Mali Müşavirlik & Ofis", 
      details: "Güven ve kurumsallık yansıtan fantezi kağıt ve lüks baskı uyumlu tasarımlar.",
      primaryDesignService: "Kurumsal Kimlik Evrak Tasarımı",
      links: [
        { name: "Zarf", path: "/zarf" },
        { name: "Kartvizit", path: "/kartvizit" },
        { name: "Antetli Kağıt", path: "/antetli" }
      ]
    },
    { 
      name: "İnşaat, Emlak & Mimarlık", 
      details: "Projelerinizi en ince detayına kadar gösteren kataloglar ve dış mekan tanıtım materyalleri.",
      primaryDesignService: "Prestij Katalog & Proje Tanıtım Tasarımı",
      links: [
        { name: "Katalog", path: "/kataloglar" },
        { name: "Afiş & Branda", path: "/afis" },
        { name: "Cepli Dosya", path: "/dosyalar" }
      ]
    },
    { 
      name: "Sağlık, Estetik & Kozmetik", 
      details: "Kozmetik ambalajları ve suya dayanıklı kimyasal etiket tasarımları.",
      primaryDesignService: "Kozmetik Kutu & Kimyasal Etiket Tasarımı",
      links: [
        { name: "Kutu & Ambalaj", path: "/ambalaj" },
        { name: "Etiket", path: "/etiket" },
        { name: "Broşür", path: "/brosur" }
      ]
    },
    { 
      name: "Teknoloji & E-Ticaret", 
      details: "Modern gönderi paketleri, marka stickerları ve ürün tanıtım broşürleri.",
      primaryDesignService: "E-Ticaret Ambalaj Kutusu Tasarımı",
      links: [
        { name: "Kutu & Ambalaj", path: "/ambalaj" },
        { name: "Etiket", path: "/etiket" },
        { name: "Broşür", path: "/brosur" }
      ]
    },
    { 
      name: "Tekstil, Moda & Perakende", 
      details: "Sallama ürün etiketleri ve markalı lüks taşıma çantaları tasarımı.",
      primaryDesignService: "Sallama Karton Etiket & Karton Çanta Tasarımı",
      links: [
        { name: "Etiket", path: "/etiket" },
        { name: "Karton Çanta", path: "/karton-canta" },
        { name: "Kutu", path: "/ambalaj" }
      ]
    },
    { 
      name: "Turizm, Otel & Etkinlik", 
      details: "Kapı kartı kılıflarından yönlendirme föylerine kadar otel içi tüm materyaller.",
      primaryDesignService: "Kurumsal Bloknot, Zarf & Yönlendirme Tasarımları",
      links: [
        { name: "Bloknotlar", path: "/bloknotlar" },
        { name: "Zarf", path: "/zarf" },
        { name: "Broşür", path: "/brosur" }
      ]
    }
  ];

  const pricing = [
    { 
      service: "Sıfırdan Özgün Logo Tasarımı", 
      price: "3.500 – 7.500 TL", 
      spec: "Tescile uygun, özgün kurumsal kimliğin temeli", 
      time: "3–5 Gün",
      alternatives: "3 Farklı Taslak",
      revisions: "5 Ücretsiz Revizyon",
      deliverables: ".AI, .PDF, .SVG, .PNG, .JPG",
      upperLimitReason: "Çok detaylı illüstrasyon, maskot çizimi veya 3D modelleme talepleri fiyatı üst limite yaklaştırır.",
      printLinks: [
        { name: "Kartvizit", path: "/kartvizit" },
        { name: "Cepli Dosya", path: "/dosyalar" },
        { name: "Diplomat Zarf", path: "/zarf" },
        { name: "Karton Çanta", path: "/karton-canta" },
        { name: "Kargo Kutusu", path: "/ambalaj" }
      ]
    },
    { 
      service: "Mevcut Logo Vektörel Çizim & Düzenleme", 
      price: "750 – 1.500 TL", 
      spec: "Çözünürlük yükseltme ve aslına sadık çizim", 
      time: "1 Gün",
      alternatives: "Aslına uygun 1 yeniden çizim",
      revisions: "3 Ücretsiz Revizyon",
      deliverables: ".AI, .PDF, .SVG, .PNG",
      upperLimitReason: "Logonun aşırı detaylı amblem süslemeleri içermesi veya taranmış çok eski kalitesiz görsel olması durumunda üst limite çıkabilir.",
      printLinks: [
        { name: "Kartvizit", path: "/kartvizit" },
        { name: "Sticker Etiket", path: "/etiket" },
        { name: "Kutu & Ambalaj", path: "/ambalaj" }
      ]
    },
    { 
      service: "Sıfırdan Özel Kartvizit Tasarımı", 
      price: "750 – 1.500 TL", 
      spec: "Çift yönlü, lak ve gofre katmanları dahil", 
      time: "1–2 Gün",
      alternatives: "2 Alternatif Taslak",
      revisions: "3 Ücretsiz Revizyon",
      deliverables: ".AI, .PDF, .PNG, .JPG",
      upperLimitReason: "Çoklu unvan/personel bilgisi eklenmesi (5 unvandan fazlası) veya özel ebatlı kırım tasarımı fiyata yansır.",
      printLinks: [
        { name: "Lüks Kartvizit", path: "/kartvizit" },
        { name: "Sıvama Kartvizit", path: "/kartvizit" },
        { name: "Kurumsal Evraklar", path: "/dosyalar" }
      ]
    },
    { 
      service: "Hazır Kartvizit Revizyonu & Mizanpaj", 
      price: "250 – 500 TL", 
      spec: "Mevcut tasarımda bilgi güncelleme, kırım/bıçak payı", 
      time: "1 Gün",
      alternatives: "Mevcut şablon üzerinden 1 düzenleme",
      revisions: "2 Ücretsiz Revizyon",
      deliverables: ".AI, .PDF, .PNG",
      upperLimitReason: "Firma logosunun da sıfırdan vektörel çizilmesi veya kartvizitin arka yüz mizanpajının tamamen değiştirilmesi.",
      printLinks: [
        { name: "Kartvizit Baskı", path: "/kartvizit" }
      ]
    },
    { 
      service: "Sıfırdan Özel Broşür / Flyer Tasarımı", 
      price: "1.200 – 2.500 TL", 
      spec: "Özel kırım ve katlama paylı mizanpaj", 
      time: "1–2 Gün",
      alternatives: "2 Alternatif Kapak/Konsept",
      revisions: "3 Ücretsiz Revizyon",
      deliverables: ".AI, .PDF, .JPG",
      upperLimitReason: "Sayfa sayısının 4 sayfadan fazla olması veya yoğun infografik/ikon çizim talepleri fiyata yansır.",
      printLinks: [
        { name: "Broşür / El İlanı", path: "/brosur" },
        { name: "Katalog Baskı", path: "/kataloglar" },
        { name: "Afiş & Poster", path: "/afis" }
      ]
    },
    { 
      service: "Hazır Broşür Düzenleme & Baskı Hazırlığı", 
      price: "400 – 800 TL", 
      spec: "Renk profili düzeltme, taşırma payları ve mizanpaj", 
      time: "1 Gün",
      alternatives: "Mevcut dosya üzerinden mizanpaj",
      revisions: "2 Ücretsiz Revizyon",
      deliverables: ".AI, .PDF, .JPG",
      upperLimitReason: "Ürün görsellerinin dekupe/arka plan temizleme işlemlerinin aşırı yoğun olması veya metinlerin baştan yazılması.",
      printLinks: [
        { name: "Broşür Baskı", path: "/brosur" }
      ]
    },
    { 
      service: "Sıfırdan Özel Kutu & Ambalaj Tasarımı", 
      price: "2.500 – 6.000 TL", 
      spec: "Milimetrik bıçak izi ve grafik giydirme", 
      time: "2–4 Gün",
      alternatives: "2 Farklı Tasarım Konsepti",
      revisions: "3 Ücretsiz Revizyon",
      deliverables: ".AI, .PDF, 3D Mockup Görseli",
      upperLimitReason: "Karmaşık kilit sistemli iç kutu bıçak çizimleri, pencereli ambalajlar veya özel illüstrasyon talepleri fiyata yansır.",
      printLinks: [
        { name: "Kargo Kutusu", path: "/ambalaj" },
        { name: "Rulo Ürün Etiketi", path: "/etiket" },
        { name: "Karton Çanta", path: "/karton-canta" }
      ]
    },
    { 
      service: "Hazır Kutu Tasarımı Bıçak İzi Giydirme", 
      price: "1.000 – 2.000 TL", 
      spec: "Müşteri grafiklerinin birebir kalıba serilmesi", 
      time: "1–2 Gün",
      alternatives: "Mevcut grafiklerin serimi",
      revisions: "2 Ücretsiz Revizyon",
      deliverables: ".AI, .PDF",
      upperLimitReason: "Müşteride hazır bıçak izi şablonunun olmaması, bıçak izinin sıfırdan çizilmesi veya grafiklerdeki ölçülerin kalıba oturmaması.",
      printLinks: [
        { name: "E-Ticaret Kutusu", path: "/ambalaj" },
        { name: "Sticker Etiket", path: "/etiket" }
      ]
    },
    { 
      service: "Kurumsal Kimlik Paketi (Standart - Özel)", 
      price: "8.500 – 15.000 TL", 
      spec: "Logo + Kartvizit + Antetli + Zarf + Cepli Dosya", 
      time: "7–12 Gün", 
      isBold: true,
      alternatives: "3 Alternatif Logo, 2 Alternatif Evrak Konsepti",
      revisions: "5 Ücretsiz Revizyon",
      deliverables: ".AI, .PDF, .SVG, .PNG, Renk & Font Rehberi",
      upperLimitReason: "Eklenecek ekstra kurumsal materyal (araç giydirme, promosyon, e-posta imzası vb.) sayısının 5 kalemden fazla olması.",
      printLinks: [
        { name: "Cepli Dosya", path: "/dosyalar" },
        { name: "Kartvizit", path: "/kartvizit" },
        { name: "Antetli Kağıt", path: "/antetli" },
        { name: "Diplomat Zarf", path: "/zarf" },
        { name: "Bloknotlar", path: "/bloknotlar" }
      ]
    },
    { 
      service: "Hazır Kurumsal Kimlik Evrak Güncelleme", 
      price: "2.500 – 5.000 TL", 
      spec: "Adres, unvan ve logo yenileme", 
      time: "2–3 Gün", 
      isBold: true,
      alternatives: "Mevcut kurumsal şablonlar güncellenir",
      revisions: "3 Ücretsiz Revizyon",
      deliverables: ".AI, .PDF, .PNG",
      upperLimitReason: "Evrak kalemlerinin 8 adetten fazla olması veya eski evrakların taranıp baştan çizilmesinin gerekmesi.",
      printLinks: [
        { name: "Cepli Dosya", path: "/dosyalar" },
        { name: "Kartvizit", path: "/kartvizit" },
        { name: "Antetli Kağıt", path: "/antetli" }
      ]
    }
  ];

  const internalLinks = [
    { name: "Kartvizit Baskı", path: "/kartvizit", icon: "📇" },
    { name: "Broşür Baskı", path: "/brosur", icon: "📄" },
    { name: "Etiket Baskı", path: "/etiket", icon: "🏷️" },
    { name: "Cepli Dosya Baskı", path: "/dosyalar", icon: "📁" },
    { name: "Antetli Kağıt Baskı", path: "/antetli", icon: "✉️" },
    { name: "Zarf Baskı", path: "/zarf", icon: "📨" },
    { name: "Katalog Baskı", path: "/kataloglar", icon: "📚" },
    { name: "Kutu & Ambalaj", path: "/kutu", icon: "📦" },
    { name: "Karton Çanta", path: "/karton-canta", icon: "🛍️" },
    { name: "Sticker Baskı", path: "/etiket", icon: "🎯" },
    { name: "Magnet Baskı", path: "/magnet", icon: "🧲" },
    { name: "Amerikan Servis", path: "/amerikan-servis", icon: "🍽️" }
  ];

  const faqs = [
    {
      q: "Tasarım bedelindeki %50 baskı indirimi tam olarak nasıl uygulanıyor?",
      a: "Mavi Basım bünyesinde aldığınız grafik tasarım hizmetinin baskı ve üretim siparişini de tesisimize verdiğinizde, tasarım hizmet bedeli üzerinden net %50 indirim anında sepetinize ve faturanıza yansıtılır. Bu entegrasyon hem bütçenizi korur hem de tasarımın baskıda teknik olarak sorunsuz çıkmasını sağlar.",
      linkPath: "/matbaa",
      linkLabel: "Tüm Matbaa Fiyat Listelerini İnceleyin"
    },
    {
      q: "Tasarım tamamlandıktan sonra hangi dosyaları teslim alacağım? Kaynak dosyalar dahil mi?",
      a: "Tasarım süreciniz tamamlandığında ek hiçbir ücret talep edilmeksizin tüm orijinal vektörel kaynak dosyalar (bütünüyle katmanlı Adobe Illustrator .AI, .SVG ve .PDF), dijital paylaşımlarınız için arkası transparan yüksek çözünürlüklü .PNG ve .JPG formatları teslim edilir. Tasarımın telif ve mülkiyet hakları tamamen size aittir, ek lisans ücreti istenmez.",
      linkPath: "/iletisim",
      linkLabel: "Örnek Arşiv Dosyalarını Sorun"
    },
    {
      q: "Tasarım sürecinde revizyon hakkı sınırı nedir ve süreç beğenilmeme durumunda nasıl işler?",
      a: "Logo ve Kurumsal Kimlik Paketlerimizde 5 adet; kartvizit, broşür, etiket gibi tekil işlerde ise 3 adet ücretsiz revizyon hakkınız bulunmaktadır. Bu haklar kapsamında renk, font, yerleşim gibi tüm detayları düzenleriz. Eğer sunulan ilk konseptlerden hiçbirini beğenmezseniz, briefinizi yeniden analiz ederek ek bir tasarımcı yönlendirmesiyle 1 sefere mahsus tamamen yeni bir alternatif konsepti ücretsiz hazırlarız.",
      linkPath: "/iletisim",
      linkLabel: "Revizyon ve Süreç Detaylarını Alın"
    },
    {
      q: "Dışarıdan hazır getirdiğim tasarım dosyalarının baskı kontrolünü yapıyor musunuz?",
      a: "Evet! Başka bir ajans veya grafikere hazırlattığınız tasarımları, üretime girmeden önce Baskı Öncesi Teknik Kontrol ekibimizle tamamen analiz edip makine parkurumuza uygun hale getiriyoruz. Renk profili (CMYK), çözünürlük (DPI), taşırma payları, bıçak izi ve kırım çizgilerini düzelterek onayınız için tarafınıza dijital onay provası gönderiyoruz.",
      linkPath: "/matbaa",
      linkLabel: "Ücretsiz Teknik Dosya Analizi İsteyin"
    },
    {
      q: "Ödeme süreci, faturalandırma ve işe başlama adımları nasıldır?",
      a: "Tüm kurumsal hizmetlerimizde süreç, brief alımının ardından imzalanan teklif formu ve %50 ön ödeme (kaparo) ile resmi olarak başlar. Kalan %50 bakiye ise tasarım süreci tamamlanıp sizden yazılı onay provası alındıktan ve baskıya/teslime geçilmeden önce tahsil edilir. Tüm işlemlerimiz resmi faturalıdır.",
      linkPath: "/iletisim",
      linkLabel: "Teklif ve Sipariş Formunu Doldurun"
    },
    {
      q: "İstanbul dışındayım, uzaktan tasarım ve prova onay süreci nasıl ilerliyor?",
      a: "Türkiye'nin 81 ilindeki müşterilerimizle online iş birliği modelimiz mevcuttur. Brieflerinizi WhatsApp ve telefonla aldıktan sonra taslaklarımızı bulut bağlantılarıyla yüksek çözünürlüklü iletiriz. En önemlisi, baskı öncesinde işin birebir kesim paylarını, katlama çizgilerini gösteren onay belgesi hazırlayarak onayınızı alırız. Onayınızın ardından üretilen ürünler korunaklı kargo ile kapınıza teslim edilir.",
      linkPath: "/iletisim",
      linkLabel: "Kargo ve Şehir Dışı Sipariş Bilgilerini Alın"
    }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Profesyonel Grafik Tasarım & Kurumsal Kimlik - Mavi Basım</title>
        <meta name="description" content="İstanbul Topkapı merkezli matbaa baskı teknolojilerimizle %100 uyumlu logo, ambalaj kutusu ve kurumsal kimlik tasarımı. 3D PDF prova onay garantili, kaynak dosya teslimi." />
      </Helmet>

      {/* Hero / Giriş Bölümü (Point 10, Kısaltılmış & Birleştirilmiş, Yazım Hataları Giderilmiş) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 font-bold text-xs uppercase tracking-wider">
            <MapPin size={14} />
            İstanbul Topkapı Matbaacılar Sitesi Üretim Merkezi
          </div>
          <h1 id="hero-heading" className="text-2xl md:text-4xl font-black text-primary uppercase tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Profesyonel Grafik Tasarım &amp; Kurumsal Kimlik Hizmeti
          </h1>
          
          {/* Yerel SEO Odaklı Hizmet Bölgesi Tanımı (Point 10) */}
          <div className="text-xs md:text-sm text-gray-700 max-w-4xl mx-auto leading-relaxed font-semibold mb-6">
            <p className="mb-3">
              <strong>Mavi Basım Matbaa &amp; Reklam</strong> olarak, İstanbul Topkapı Matbaacılar Sitesi'ndeki modern üretim tesisimizle doğrudan koordineli çalışan tasarım ekibimizle markanızın görsel kimliğini inşa ediyoruz. Üretim merkezimizin Topkapı'da yer alması sayesinde hem <strong>İstanbul Avrupa Yakası</strong> (Zeytinburnu, İkitelli, Bayrampaşa, Esenyurt, Şişli, Maslak) hem de <strong>İstanbul Anadolu Yakası</strong> (Kadıköy, Ümraniye, Kartal, Tuzla) genelindeki kurumsal firmalarımıza günlük kurye ve sevkiyat servisleri sağlıyoruz.
            </p>
            <p className="text-gray-500 text-xs">
              Makinelerimizin baskı kalıplarına tam uyumlu, taşırma payları hassas şekilde ayarlanmış vektörel logo, ambalaj kutusu ve kurumsal kimlik tasarımlarınızı ekstra teknik düzeltme maliyetleri çıkarmadan doğrudan üretime uygun teslim ediyoruz.
            </p>
          </div>

          {/* Güven Sinyalleri - Ölçülebilir İstatistikler (Point 17) */}
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto my-8 border-y border-gray-100 py-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-black text-primary">14+ Yıl</div>
              <div className="text-[10px] md:text-xs text-gray-500 font-extrabold uppercase mt-1">Sektör Tecrübesi</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-primary">18.500+</div>
              <div className="text-[10px] md:text-xs text-gray-500 font-extrabold uppercase mt-1">Tamamlanan Tasarım</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-primary">4.200+</div>
              <div className="text-[10px] md:text-xs text-gray-500 font-extrabold uppercase mt-1">Kurumsal Referans</div>
            </div>
          </div>

          {/* Karar Kolaylaştıran Seçici CTA Paneli */}
          <div className="bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-3xl max-w-4xl mx-auto text-left mt-8 mb-12">
            <h3 className="text-sm md:text-base font-black text-slate-900 uppercase tracking-tight text-center mb-6">
              Hangi Tasarım Hizmetine İhtiyacınız Var? (Hızlı Yönlendirme)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                onClick={() => {
                  const el = document.getElementById('kurumsal-kimlik-paketleri');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white hover:bg-primary/5 p-4 rounded-xl border border-gray-200 hover:border-primary text-left transition-all hover:shadow-xs group cursor-pointer"
              >
                <h4 className="font-extrabold text-xs text-black uppercase mb-1">Yeni Marka Kuruyorum</h4>
                <p className="text-xs text-gray-500 font-semibold leading-snug">Logo ve Kurumsal Kimlik Paketleri</p>
                <span className="text-xs text-primary font-black mt-2 inline-flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">İncele &rarr;</span>
              </button>

              <button 
                onClick={() => {
                  const el = document.getElementById('tasarim-hizmetlerimiz');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white hover:bg-primary/5 p-4 rounded-xl border border-gray-200 hover:border-primary text-left transition-all hover:shadow-xs group cursor-pointer"
              >
                <h4 className="font-extrabold text-xs text-black uppercase mb-1">Yeni Ürün Çıkarıyorum</h4>
                <p className="text-xs text-gray-500 font-semibold leading-snug">Özel Kutu, Ambalaj ve Etiket Çizimi</p>
                <span className="text-xs text-primary font-black mt-2 inline-flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">İncele &rarr;</span>
              </button>

              <button 
                onClick={() => {
                  const el = document.getElementById('tasarim-hizmetlerimiz');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white hover:bg-primary/5 p-4 rounded-xl border border-gray-200 hover:border-primary text-left transition-all hover:shadow-xs group cursor-pointer"
              >
                <h4 className="font-extrabold text-xs text-black uppercase mb-1">Tanıtım Yapacağım</h4>
                <p className="text-xs text-gray-500 font-semibold leading-snug">Katalog, Broşür ve El İlanı Mizanpajı</p>
                <span className="text-xs text-primary font-black mt-2 inline-flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">İncele &rarr;</span>
              </button>

              <button 
                onClick={() => {
                  const el = document.getElementById('tasarim-fiyat-listesi');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white hover:bg-primary/5 p-4 rounded-xl border border-gray-200 hover:border-primary text-left transition-all hover:shadow-xs group cursor-pointer"
              >
                <h4 className="font-extrabold text-xs text-black uppercase mb-1">Mevcut Dosyam Var</h4>
                <p className="text-xs text-gray-500 font-semibold leading-snug">Hızlı Vektörel Çizim &amp; Baskı Hazırlığı</p>
                <span className="text-xs text-primary font-black mt-2 inline-flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">İncele &rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hizmetlerimiz */}
        <div id="tasarim-hizmetlerimiz" className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight text-center mb-3">
            Uzman Grafik Tasarım Hizmetlerimiz
          </h2>
          <p className="text-center text-gray-500 font-semibold text-sm mb-6 max-w-2xl mx-auto">
            Matbaa üretimindeki engin tecrübemiz sayesinde, her tasarımı basılacağı kağıt, doku ve kesim kalıplarını göz önünde bulundurarak hazırlıyoruz.
          </p>

          {/* Neden Ajans Yerine Sizi Seçmeliyim? (Net Karşılaştırma) */}
          <div className="bg-white border border-gray-150 rounded-3xl p-6 md:p-8 mb-12 max-w-4xl mx-auto shadow-xs">
            <h3 className="font-extrabold text-sm md:text-base text-slate-900 uppercase tracking-tight mb-3 text-center">
              Neden Klasik Reklam Ajansı Yerine Mavi Basım'ı Seçmelisiniz?
            </h3>
            <p className="text-center text-gray-500 font-semibold text-xs mb-6 max-w-xl mx-auto">
              Klasik ajanslar ekran odaklı çalışırken, biz tasarım ile fiziksel üretimi tek elden birleştirerek bütçenizi ve zamanınızı güvence altına alıyoruz.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-semibold text-gray-700 border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-100 uppercase text-[9px] tracking-wider text-slate-500">
                    <th className="p-3">Karşılaştırma Noktası</th>
                    <th className="p-3 text-red-600 bg-red-50/30">Klasik Reklam Ajansları</th>
                    <th className="p-3 text-emerald-700 bg-emerald-50/40">Mavi Basım Profesyonel Hizmet</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-slate-50/40">
                    <td className="p-3 font-extrabold text-black">Matbaa Uyum Bilgisi</td>
                    <td className="p-3 text-red-600 font-medium bg-red-50/10">Sadece ekran görüntüsü odaklı çalışırlar. Taşırma payı, kesim bıçağı ve CMYK sapmalarından anlamazlar; bu da matbaada sürpriz basım hatalarına yol açar.</td>
                    <td className="p-3 text-emerald-700 font-bold bg-emerald-50/20">14 yıllık üretim tecrübesiyle çalışırız. Her çizim, merkezi parkurumuzdaki ofset ve dijital baskı makinelerine tam uyumlu olarak hazırlanır.</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-slate-50/40">
                    <td className="p-3 font-extrabold text-black">Bütçe &amp; Maliyet</td>
                    <td className="p-3 text-red-600 font-medium bg-red-50/10">Sadece taslak teslimi için fahiş faturalar keserler. Ayrıca her bir ek dosya ve format talebi için ek ücret yansıtırlar.</td>
                    <td className="p-3 text-emerald-700 font-bold bg-emerald-50/20">Tasarımını hazırladığımız işin baskı siparişini de bize verdiğinizde, tasarım hizmet bedeli üzerinden anında <strong className="underline">%50 net indirim</strong> kazanırsınız.</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-slate-50/40">
                    <td className="p-3 font-extrabold text-black">Telif &amp; Kaynak Dosya</td>
                    <td className="p-3 text-red-600 font-medium bg-red-50/10">Katmanlı orijinal .AI, .SVG dosyalarını teslim etmekten kaçınırlar veya bu dosyaları almak istediğinizde yüksek marka lisans bedeli isterler.</td>
                    <td className="p-3 text-emerald-700 font-bold bg-emerald-50/20">Tüm orijinal vektörel kaynak dosyalar (.AI, .SVG, .PDF, .PNG) hiçbir ek lisans veya teslimat ücreti istenmeksizin tamamen katmanlı olarak size verilir.</td>
                  </tr>
                  <tr className="hover:bg-slate-50/40">
                    <td className="p-3 font-extrabold text-black">Sürecin Sorumluluğu</td>
                    <td className="p-3 text-red-600 font-medium bg-red-50/10">Baskıda hata çıkarsa sorumluluğu matbaaya, matbaa ise tasarımcıya atar. İki tarafın uyuşmazlığı yüzünden arada kalan ve mağdur olan siz olursunuz.</td>
                    <td className="p-3 text-emerald-700 font-bold bg-emerald-50/20">Çizimden paketlemeye kadar tek muhatabınız biziz. Tek elden bütünsel süreç sorumluluğu alıyoruz. Oluşabilecek her teknik hatada ücretsiz yeni baskı garantisi veriyoruz.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 bg-emerald-50 text-emerald-800 text-xs p-3.5 rounded-xl text-center leading-normal font-medium">
              <strong>Kararınızı Kolaylaştırın:</strong> Tasarımı ve baskıyı aynı çatı altında birleştirmek, sizi hem gereksiz bütçe kayıplarından korur hem de iki ayrı kurumla zaman kaybetmek yerine tek elden pürüzsüz koordinasyon sağlar.
            </div>
          </div>

          {/* Tasarım Ekibi Nitelikleri */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-12 max-w-4xl mx-auto shadow-3xs">
            <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider mb-4 text-center">
              Profesyonel Tasarım Ekibimizin Kalifikasyonları &amp; Teknik Altyapısı
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-600 font-semibold leading-relaxed">
              <div className="bg-slate-50 p-4 rounded-xl">
                <h4 className="font-black text-black uppercase mb-2">Lisanslı Adobe CC Yazılımları</h4>
                <p className="text-xs mb-2 leading-relaxed">Tasarımlarımızda matbaa endüstrisinin altın standartları olan orijinal Adobe Creative Cloud yazılımlarını kullanıyoruz:</p>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-amber-100 text-amber-900 font-black text-[10px] px-2 py-0.5 rounded">Adobe Illustrator (.AI)</span>
                  <span className="bg-blue-100 text-blue-900 font-black text-[10px] px-2 py-0.5 rounded">Adobe Photoshop (.PSD)</span>
                  <span className="bg-red-100 text-red-900 font-black text-[10px] px-2 py-0.5 rounded">Adobe InDesign (.INDD)</span>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl">
                <h4 className="font-black text-black uppercase mb-2">Matbaa &amp; Ambalaj Uzmanlığı</h4>
                <p className="text-xs leading-relaxed">Ekibimiz sadece dijital ekran çizimi değil; fantezi kağıt lif yönleri, selefon kaplama, gofre (kabartma) derinlikleri, varak yaldız klişeleri ve özel kesim bıçak izi çizimlerinde uzmanlaşmıştır. Her tasarım, makine ayarına birebir uyumlu çizilir.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl">
                <h4 className="font-black text-black uppercase mb-2">Mevzuat &amp; Barkod Standartları</h4>
                <p className="text-xs leading-relaxed">Gıda, kozmetik ve ilaç sanayii için hazırladığımız tüm etiket ve ambalajlarda; Tarım Bakanlığı beyan alanı, besin tablosu mizanpajları ve GS1 standartlarında yüksek okunabilirliğe sahip EAN-13 / QR barkod yerleşimlerini hatasız kodluyoruz.</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-xs border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all group flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all text-primary font-bold">
                      {s.icon}
                    </div>
                    <span className="text-[11px] font-black bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
                      <Clock size={12} /> {s.deliveryTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-black mb-3 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-gray-500 text-xs md:text-sm font-semibold leading-relaxed mb-6">{s.desc}</p>
                </div>
                <div className="pt-4 border-t border-gray-100 flex flex-col gap-2.5">
                  <Link 
                    to={s.linkPath} 
                    className="text-xs md:text-sm font-black text-primary hover:text-secondary flex items-center gap-1 transition-all group-hover:translate-x-1"
                  >
                    {s.linkLabel} <ArrowRight size={14} />
                  </Link>
                  {s.printProductPath && (
                    <Link 
                      to={s.printProductPath} 
                      className="text-xs md:text-sm font-bold text-gray-500 hover:text-primary flex items-center gap-1 transition-all"
                    >
                      {s.printProductLabel} &rarr;
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Karar ve İhtiyaç Analiz Matrisi */}
          <div className="mt-12 bg-white rounded-2xl border border-gray-150 p-6 md:p-8">
            <h3 className="text-base md:text-lg font-black text-black uppercase tracking-tight text-center mb-2">
              Hangi Grafik Tasarım Hizmeti İhtiyacınızı Çözer?
            </h3>
            <p className="text-center text-gray-500 font-semibold text-xs md:text-sm mb-6 max-w-xl mx-auto">
              Ticari hedeflerinize ve markanızın mevcut durumuna göre hangi hizmeti seçmeniz gerektiğini tek bakışta görün.
            </p>

            {/* Tasarım Hizmetinin UYGUN OLMADIĞI Durumlar */}
            <div className="mb-8 p-5 bg-amber-50/70 border border-amber-200/60 rounded-xl max-w-3xl mx-auto text-left">
              <h4 className="font-extrabold text-xs md:text-sm text-amber-900 uppercase tracking-tight mb-2">
                UYARI: Grafik Tasarım Hizmetimizin UYGUN OLMADIĞI Durumlar (Hizmet Sınırlarımız)
              </h4>
              <p className="text-xs text-amber-800 font-medium leading-relaxed mb-3">
                Müşterilerimizin bütçesini ve vaktini korumak adına şeffaf davranıyoruz. Aşağıdaki durumlardan birine sahipseniz tasarım hizmetimiz size uygun olmayabilir:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-amber-900/90 font-semibold leading-relaxed">
                <div>
                  <p><strong>Sanatsal 3D Çizimler &amp; Karakter Tasarımları:</strong> Biz ambalaj, kurumsal evrak ve ticari kimlik tasarımında uzmanız. Pixar/oyun tarzı 3D karakter veya film animasyonları çizmiyoruz.</p>
                </div>
                <div>
                  <p><strong>Sınırsız Konsept Denemeleri &amp; Belirsiz Briefler:</strong> Ne istediği tamamen belirsiz olan veya sınırsız tasarım yönü denemek isteyenlere uygun değiliz. Nokta atışı ticari taslaklar üretiriz.</p>
                </div>
                <div>
                  <p><strong>Düşük Bütçeli / Telif İhlalli Talepler:</strong> İnternetten alınmış hazır logoları düzenlemek gibi hizmetler vermiyoruz. Tüm işlerimizi sıfırdan, lisanslı ve tescile tam hazır çiziyoruz.</p>
                </div>
                <div>
                  <p><strong>Aylarca Süren Stratejik Marka Çalıştayları:</strong> Felsefi algı çalıştayları yapmayız. Odak noktamız, ambalaj veya kataloğunuzun hızla ve sorunsuzca basılmasını sağlayacak yüksek kalitede tasarımlardır.</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-gray-100 flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-black uppercase mb-3">Logo Tasarımı</h4>
                  <div className="space-y-3 text-xs md:text-sm">
                    <div>
                      <span className="text-xs font-black text-red-600 uppercase block mb-1">Hedeflenen Sorun:</span>
                      <p className="text-gray-700 font-medium text-xs md:text-sm leading-relaxed">Yeni marka kuruyorum veya logomu tescillemek istiyorum. Profesyonel, patent onayına uygun özgün bir ambleme ihtiyacım var.</p>
                    </div>
                    <div>
                      <span className="text-xs font-black text-emerald-700 uppercase block mb-1">Doğru Çözüm:</span>
                      <p className="text-gray-700 font-medium text-xs md:text-sm leading-relaxed">Tescile uygun, tüm basılı ve dijital mecralara tam uyumlu vektörel (.AI, .PDF, .SVG) logo tasarımı.</p>
                    </div>
                    {/* YAKLAŞIK MALİYET BADGE */}
                    <div className="mt-3 pt-3 border-t border-dashed border-gray-300">
                      <span className="text-xs font-black text-slate-700 uppercase block mb-1">Ortalama Maliyet:</span>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-sm font-black text-slate-900">3.500 TL – 7.500 TL</span>
                        <span className="bg-emerald-100 text-emerald-900 font-bold text-xs px-2 py-1 rounded text-center leading-snug">%50 Baskı Kombiniyle 1.750 TL'den başlayan fiyatlar</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <button 
                    onClick={() => document.getElementById('tasarim-fiyat-listesi')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-primary font-black text-xs md:text-sm hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Logo Fiyatlarını Gör &rarr;
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-gray-100 flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-black uppercase mb-3">Kartvizit Tasarımı</h4>
                  <div className="space-y-3 text-xs md:text-sm">
                    <div>
                      <span className="text-xs font-black text-red-600 uppercase block mb-1">Hedeflenen Sorun:</span>
                      <p className="text-gray-700 font-medium text-xs md:text-sm leading-relaxed">Müşterilerle yüz yüze görüşüyorum, kurumsal imajımı yansıtacak, lüks baskıya uygun profesyonel şablonum yok.</p>
                    </div>
                    <div>
                      <span className="text-xs font-black text-emerald-700 uppercase block mb-1">Doğru Çözüm:</span>
                      <p className="text-gray-700 font-medium text-xs md:text-sm leading-relaxed">Gofre kabartma, lak veya yaldız katmanları önceden hazırlanmış, çift taraflı özel kartvizit tasarımı.</p>
                    </div>
                    {/* YAKLAŞIK MALİYET BADGE */}
                    <div className="mt-3 pt-3 border-t border-dashed border-gray-300">
                      <span className="text-xs font-black text-slate-700 uppercase block mb-1">Ortalama Maliyet:</span>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-sm font-black text-slate-900">750 TL – 1.500 TL</span>
                        <span className="bg-emerald-100 text-emerald-900 font-bold text-xs px-2 py-1 rounded text-center leading-snug">%50 Baskı Kombiniyle 375 TL'den başlayan fiyatlar</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <button 
                    onClick={() => document.getElementById('tasarim-fiyat-listesi')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-primary font-black text-xs md:text-sm hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Kartvizit Fiyatlarını Gör &rarr;
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-gray-100 flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-black uppercase mb-3">Katalog &amp; Broşür</h4>
                  <div className="space-y-3 text-xs md:text-sm">
                    <div>
                      <span className="text-xs font-black text-red-600 uppercase block mb-1">Hedeflenen Sorun:</span>
                      <p className="text-gray-700 font-medium text-xs md:text-sm leading-relaxed">Ürünlerimi ve hizmetlerimi sunmak, fuarlarda satış odaklı mizanpajlarla ve doğru sayfa dizilimiyle dağıtım yapmak istiyorum.</p>
                    </div>
                    <div>
                      <span className="text-xs font-black text-emerald-700 uppercase block mb-1">Doğru Çözüm:</span>
                      <p className="text-gray-700 font-medium text-xs md:text-sm leading-relaxed">Sayfa sıralaması, kırım payları ve mizanpajı üretim standartlarında hesaplanmış katalog şablonları.</p>
                    </div>
                    {/* YAKLAŞIK MALİYET BADGE */}
                    <div className="mt-3 pt-3 border-t border-dashed border-gray-300">
                      <span className="text-xs font-black text-slate-700 uppercase block mb-1">Ortalama Maliyet:</span>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-sm font-black text-slate-900">1.200 TL – 2.500 TL</span>
                        <span className="bg-emerald-100 text-emerald-900 font-bold text-xs px-2 py-1 rounded text-center leading-snug">%50 Baskı Kombiniyle 600 TL'den başlayan fiyatlar</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <button 
                    onClick={() => document.getElementById('tasarim-fiyat-listesi')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-primary font-black text-xs md:text-sm hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Katalog Fiyatlarını Gör &rarr;
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-gray-100 flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-black uppercase mb-3">Kutu &amp; Ambalaj</h4>
                  <div className="space-y-3 text-xs md:text-sm">
                    <div>
                      <span className="text-xs font-black text-red-600 uppercase block mb-1">Hedeflenen Sorun:</span>
                      <p className="text-gray-700 font-medium text-xs md:text-sm leading-relaxed">Fiziksel ürün üretiyorum. Kargo kutusunun veya ürün etiketinin bıçak izi kesim kalıplarıma uymuyor, kayma yaşıyorum.</p>
                    </div>
                    <div>
                      <span className="text-xs font-black text-emerald-700 uppercase block mb-1">Doğru Çözüm:</span>
                      <p className="text-gray-700 font-medium text-xs md:text-sm leading-relaxed">Kalıbına tam oturan bıçak izi çizimi ve grafik giydirmeyle 3D görselleştirme ve ambalaj çalışması.</p>
                    </div>
                    {/* YAKLAŞIK MALİYET BADGE */}
                    <div className="mt-3 pt-3 border-t border-dashed border-gray-300">
                      <span className="text-xs font-black text-slate-700 uppercase block mb-1">Ortalama Maliyet:</span>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-sm font-black text-slate-900">2.500 TL – 6.000 TL</span>
                        <span className="bg-emerald-100 text-emerald-900 font-bold text-xs px-2 py-1 rounded text-center leading-snug">%50 Baskı Kombiniyle 1.250 TL'den başlayan fiyatlar</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <button 
                    onClick={() => document.getElementById('tasarim-fiyat-listesi')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-primary font-black text-xs md:text-sm hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Ambalaj Fiyatlarını Gör &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

          {/* Anadolu Müşterisi Bilgilendirme Bloğu & Şehir Bazlı Özel Dağıtım Ağı */}
          <div className="bg-gradient-to-r from-primary/5 to-slate-50 border border-primary/10 rounded-3xl p-6 md:p-8 mt-8 flex flex-col gap-6">
            <div className="max-w-5xl">
              <h3 className="text-lg md:text-xl font-black text-black uppercase mb-2">Anadolu'daki Müşterilerimiz İçin Lojistik &amp; Teslimat Güvencesi</h3>
              <p className="text-xs text-gray-600 font-semibold leading-relaxed mb-4">
                İstanbul dışındaki tüm şehirlerimizden sipariş veren kurumsal firmalarımız için tamamen dijital ve güvenilir bir online çalışma modeli uyguluyoruz. Brief detaylarınızı WhatsApp veya e-posta ile aldıktan sonra taslaklarımızı yüksek çözünürlüklü dijital provalarla iletiyor; üretime geçmeden önce kesim paylarının gösterildiği 'Baskı Onay Provası PDF' belgesini göndererek yazılı teyidinizi alıyoruz.
              </p>
              <p className="text-xs text-gray-600 font-semibold leading-relaxed mb-6">
                Üretim merkezimizin Türkiye lojistiğinin merkez noktası olan <strong>İstanbul'da merkezi bir konumda</strong> yer alması, ambar kargo, parsiyel taşımacılık ve standart anlaşmalı kargolarımızla sevkiyat hızını katlamaktadır. Baskıdan çıkan ve paketlenen ürünleriniz, kargo aktarma merkezlerine olan yakınlığımız sayesinde gün kaybetmeden yola çıkarak kapınıza kadar ulaştırılır.
              </p>

              {/* Yerel SEO Açısından OSB (Organize Sanayi Bölgeleri) Özel Lojistik Bölümü */}
              <div className="mt-6 mb-8 bg-slate-50 border border-gray-200 rounded-2xl p-5 md:p-6 text-left">
                <h4 className="font-extrabold text-xs text-black uppercase mb-3 flex items-center gap-2">
                  <span className="text-sm">🏭</span> Organize Sanayi Bölgeleri (OSB) Özel Sevkiyat &amp; Ambar Hattı
                </h4>
                <p className="text-xs text-gray-600 font-semibold leading-relaxed mb-4">
                  Anadolu'nun üretici gücünü temsil eden <strong>Organize Sanayi Bölgelerindeki (OSB)</strong> sanayici, ihracatçı ve imalatçı iş ortaklarımıza, endüstriyel ambalaj, katalog, ürün etiketi ve kurumsal matbaa işlerinde özel lojistik çözümleri sunuyoruz. Üretim merkezimizin her gün Anadolu ambarları ve tır kooperatifleriyle doğrudan koordineli çalışması sayesinde, nakliye ve navlun maliyetlerini minimum düzeyde tutuyoruz.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-semibold">
                  <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-3xs">
                    <span className="text-[10px] font-black text-primary uppercase block mb-1">Marmara &amp; Kocaeli Hattı</span>
                    <p className="text-[10px] text-gray-500 leading-normal mb-2">
                      Gebze OSB (GOSB), Dilovası OSB, TOSB, İMES, Bursa DOSAB, NOSAB, Çerkezköy OSB ve Yalova OSB bölgelerine her gün kesintisiz parsiyel ambar sevkiyatı yapıyoruz.
                    </p>
                    <span className="text-[9px] bg-emerald-50 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded">Aynı Gün veya 24 Saat</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-3xs">
                    <span className="text-[10px] font-black text-indigo-600 uppercase block mb-1">İç Anadolu &amp; Ege Hattı</span>
                    <p className="text-[10px] text-gray-500 leading-normal mb-2">
                      Ankara OSTİM, İvedik OSB, Sincan ASO 1. OSB, Konya 2. ve 3. OSB, Kayseri OSB, İzmir Atatürk OSB (İAOSB), Aliağa OSB, Kemalpaşa OSB ve Manisa OSB firmalarımıza haftalık düzenli lojistik sevkiyatı sağlıyoruz.
                    </p>
                    <span className="text-[9px] bg-emerald-50 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded">24 ila 48 Saat</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-3xs">
                    <span className="text-[10px] font-black text-amber-600 uppercase block mb-1">Güney &amp; Doğu Anadolu Hattı</span>
                    <p className="text-[10px] text-gray-500 leading-normal mb-2">
                      Gaziantep 1-5. OSB, Adana Hacı Sabancı OSB, Eskişehir OSB, Denizli OSB, Sakarya 1. OSB ve Samsun Merkez OSB gibi sanayi bölgelerine hacimli işlerde doğrudan tır ve ambar nakliyesi koordine ediyoruz.
                    </p>
                    <span className="text-[9px] bg-emerald-50 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded">2 ila 3 İş Günü</span>
                  </div>
                </div>
                <div className="mt-4 bg-primary/5 text-primary text-[10.5px] p-3 rounded-lg font-bold border border-primary/10">
                  💡 <strong>Sanayici Tarifesi Avantajı:</strong> OSB'lerde yer alan üretim tesislerinin yüksek hacimli etiket, koli, kutu ve katalog baskı siparişlerinde tasarım sürecini tamamen ücretsiz yürütüyor ve ambar sevkiyatlarında özel nakliye indirimleri uyguluyoruz.
                </div>
              </div>

              {/* Anadolu Dosya Gönderim Süreci */}
              <div className="bg-white rounded-2xl border border-gray-150 p-6 mb-8 text-left shadow-3xs">
                <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider mb-4">
                  Anadolu Dosya &amp; Sipariş Gönderim Süreci Nasıl İşler?
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-black text-primary bg-primary/10 px-2 py-0.5 rounded mb-2 inline-block">Adım 1</span>
                      <h5 className="font-extrabold text-xs text-black uppercase mb-1">Dosya &amp; Brief İletimi</h5>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed">
                        Mevcut logo çizimlerinizi, beğendiğiniz örnek çalışmaları veya hazır baskı dosyalarınızı WhatsApp, WeTransfer veya e-posta ile ekibimize ulaştırın.
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-black text-primary bg-primary/10 px-2 py-0.5 rounded mb-2 inline-block">Adım 2</span>
                      <h5 className="font-extrabold text-xs text-black uppercase mb-1">Baskı Öncesi Teknik Kontrol</h5>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed">
                        Uzman ekibimiz dosyalarınızı CMYK renk profili, çözünürlük düzeyi, kesim/katlama payları ve bıçak izi uyumluluğu açısından inceler.
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-black text-primary bg-primary/10 px-2 py-0.5 rounded mb-2 inline-block">Adım 3</span>
                      <h5 className="font-extrabold text-xs text-black uppercase mb-1">Onay Provası PDF'i</h5>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed">
                        Makinelerimize birebir uyumlandırılan tasarım, kesim ve kırım hatlarını net gösteren 'Baskı Onay PDF Provası' olarak yazılı onayınıza sunulur.
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-black text-primary bg-primary/10 px-2 py-0.5 rounded mb-2 inline-block">Adım 4</span>
                      <h5 className="font-extrabold text-xs text-black uppercase mb-1">Güvenli Sevk</h5>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed">
                        Yazılı onayınızın ardından merkez fabrikamızda üretilen ürünleriniz, nem ve ezilmeye karşı koruyucu kolilerle anlaşmalı kargoya teslim edilir.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Şehir Bazlı Özel Dağıtım Ağı Sevk Süreleri Tablosu */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-3xs mb-4">
                <div className="bg-slate-100 p-3 border-b border-gray-200">
                  <h4 className="font-extrabold text-xs text-slate-800 uppercase text-center tracking-wide">
                    Şehir Bazlı Sevk ve Teslimat Süreleri Tablosu (Baskı Sonrası)
                  </h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-semibold text-gray-700">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 uppercase text-[9px] tracking-wider border-b border-gray-200">
                        <th className="p-3">Hizmet Bölgesi / Şehirler</th>
                        <th className="p-3 text-center">Ortalama Sevk Süresi</th>
                        <th className="p-3">Lojistik Detayları ve Sevkiyat Türü</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 hover:bg-slate-50/50">
                        <td className="p-3 font-extrabold text-black">Marmara Bölgesi (Edirne, Tekirdağ, Bursa, Kocaeli, Balıkesir vb.)</td>
                        <td className="p-3 text-center text-emerald-600 font-black">1 İş Günü</td>
                        <td className="p-3 text-gray-500 text-xs">Merkez lojistik çıkışından sonra ertesi gün teslimat. Özel kurye ve ambar sevkiyatları mevcuttur.</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-slate-50/50">
                        <td className="p-3 font-extrabold text-black">Ege Bölgesi (İzmir, Manisa, Aydın, Denizli vb.)</td>
                        <td className="p-3 text-center text-emerald-600 font-black">1 - 2 İş Günü</td>
                        <td className="p-3 text-gray-500 text-xs">Günlük kargo çıkışları ve organize sanayi ambar hattı sayesinde çok hızlı ve ekonomik sevkiyat.</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-slate-50/50">
                        <td className="p-3 font-extrabold text-black">İç Anadolu Bölgesi (Ankara, Konya, Eskişehir, Kayseri vb.)</td>
                        <td className="p-3 text-center text-emerald-600 font-black">2 İş Günü</td>
                        <td className="p-3 text-gray-500 text-xs">Ankara ve Konya organize sanayilerine her gün düzenli ambar ve kargo çıkışlarımız bulunmaktadır.</td>
                      </tr>
                      <tr className="border-b border-gray-100 hover:bg-slate-50/50">
                        <td className="p-3 font-extrabold text-black">Akdeniz &amp; Güney (Antalya, Adana, Gaziantep, Mersin vb.)</td>
                        <td className="p-3 text-center text-emerald-600 font-black">2 - 3 İş Günü</td>
                        <td className="p-3 text-gray-500 text-xs">Büyük ticari hacimli ambalaj siparişlerinizde parsiyel kamyon veya anlaşmalı ambar kargo avantajı.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50">
                        <td className="p-3 font-extrabold text-black">Doğu &amp; Karadeniz (Trabzon, Samsun, Erzurum, Diyarbakır vb.)</td>
                        <td className="p-3 text-center text-emerald-600 font-black">2 - 3 İş Günü</td>
                        <td className="p-3 text-gray-500 text-xs">Merkez kargo aktarma noktalarımıza teslim edilen paketler, en emniyetli koruyucu kolilerle yola çıkar.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/70 border border-primary/10 rounded-2xl p-4 mt-2">
              <span className="text-xs text-gray-600 font-bold leading-normal">
                <strong>Taşıma Emniyet Garantisi:</strong> Kargo esnasında oluşabilecek ezilme, ıslanma veya kaybolma gibi durumlarda, siparişiniz Mavi Basım tarafından <strong>herhangi bir ek ücret istenmeksizin</strong> anında yeniden basılıp kapınıza gönderilir.
              </span>
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-full shadow-md transition-all inline-flex items-center gap-2 text-center cursor-pointer hover:scale-105"
              >
                <WhatsAppIcon size={16} />
                Online Sipariş Başlat
              </a>
            </div>
          </div>

        {/* Grafik Tasarım Teslim Kapsamı */}
        <div id="teslimat-kapsami" className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16 border border-gray-100">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight text-center mb-3">
            Grafik Tasarım Teslim Kapsamı ve Dosya Formatları
          </h2>
          <p className="text-center text-gray-500 font-semibold text-sm mb-8 max-w-2xl mx-auto leading-relaxed">
            Mavi Basım'dan aldığınız tüm grafik tasarım hizmetlerinde, mülkiyet hakları tamamen size ait olmak üzere işin türüne uygun profesyonel çıktıları eksiksiz teslim alırsınız. Detaylı teknik çıktı matrisimiz aşağıda listelenmiş olup, orijinal çizimleriniz hiçbir gizli veya ek kaynak dosya teslim ücreti talep edilmeksizin doğrudan tarafınıza sunulur.
          </p>

          {/* Paketlerin Teslim Kapsamı Karşılaştırma Tablosu */}
          <div className="mt-12 mb-8 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs text-left">
            <div className="bg-slate-100 p-4 border-b border-gray-200">
              <h4 className="font-black text-xs text-slate-800 uppercase tracking-wider text-center">
                Tasarım Paketlerine Göre Teslim Edilen Dosya Formatı Matrisi
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs font-semibold text-gray-700">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-gray-200">
                    <th className="p-3 text-left border-r border-gray-100">Dosya Formatı</th>
                    <th className="p-3 text-center border-r border-gray-100">Logo Tasarımı</th>
                    <th className="p-3 text-center border-r border-gray-100">Kartvizit, Broşür &amp; Etiket</th>
                    <th className="p-3 text-center border-r border-gray-100">Kutu &amp; Ambalaj</th>
                    <th className="p-3 text-center bg-primary/5 text-primary">Tam Kurumsal Kimlik</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-slate-50/50">
                    <td className="p-3 border-r border-gray-100 font-extrabold text-black">
                      .AI (Adobe Illustrator Vektör)
                    </td>
                    <td className="p-3 border-r border-gray-100 text-center text-emerald-600 font-bold">✓ Dahil</td>
                    <td className="p-3 border-r border-gray-100 text-center text-emerald-600 font-bold">✓ Dahil</td>
                    <td className="p-3 border-r border-gray-100 text-center text-emerald-600 font-bold">✓ Dahil</td>
                    <td className="p-3 border-r border-gray-100 text-center bg-primary/5 text-emerald-600 font-black">✓ Dahil</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-slate-50/50">
                    <td className="p-3 border-r border-gray-100 font-extrabold text-black">
                      .PDF (Baskıya Uyumlu CMYK)
                    </td>
                    <td className="p-3 border-r border-gray-100 text-center text-emerald-600 font-bold">✓ Dahil</td>
                    <td className="p-3 border-r border-gray-100 text-center text-emerald-600 font-bold">✓ Dahil</td>
                    <td className="p-3 border-r border-gray-100 text-center text-emerald-600 font-bold">✓ Dahil</td>
                    <td className="p-3 border-r border-gray-100 text-center bg-primary/5 text-emerald-600 font-black">✓ Dahil</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-slate-50/50">
                    <td className="p-3 border-r border-gray-100 font-extrabold text-black">
                      .SVG (Özgün Vektörel Web)
                    </td>
                    <td className="p-3 border-r border-gray-100 text-center text-emerald-600 font-bold">✓ Dahil</td>
                    <td className="p-3 border-r border-gray-100 text-center text-gray-400">Opsiyonel</td>
                    <td className="p-3 border-r border-gray-100 text-center text-gray-400">Opsiyonel</td>
                    <td className="p-3 border-r border-gray-100 text-center bg-primary/5 text-emerald-600 font-black">✓ Dahil</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-slate-50/50">
                    <td className="p-3 border-r border-gray-100 font-extrabold text-black">
                      .PNG (Şeffaf Arka Plan)
                    </td>
                    <td className="p-3 border-r border-gray-100 text-center text-emerald-600 font-bold">✓ Dahil</td>
                    <td className="p-3 border-r border-gray-100 text-center text-emerald-600 font-bold">✓ Dahil</td>
                    <td className="p-3 border-r border-gray-100 text-center text-emerald-600 font-bold">✓ Dahil</td>
                    <td className="p-3 border-r border-gray-100 text-center bg-primary/5 text-emerald-600 font-black">✓ Dahil</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-slate-50/50">
                    <td className="p-3 border-r border-gray-100 font-extrabold text-black">
                      Font Ailesi ve Renk Rehberi
                    </td>
                    <td className="p-3 border-r border-gray-100 text-center text-emerald-600 font-bold">✓ Dahil</td>
                    <td className="p-3 border-r border-gray-100 text-center text-emerald-600 font-bold">✓ Dahil</td>
                    <td className="p-3 border-r border-gray-100 text-center text-emerald-600 font-bold">✓ Dahil</td>
                    <td className="p-3 border-r border-gray-100 text-center bg-primary/5 text-emerald-600 font-black">✓ Dahil</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="p-3 border-r border-gray-100 font-extrabold text-black">
                      3D Gerçekçi Prova Görseli
                    </td>
                    <td className="p-3 border-r border-gray-100 text-center text-gray-400">Uygulanamaz</td>
                    <td className="p-3 border-r border-gray-100 text-center text-emerald-600 font-bold">✓ Dahil</td>
                    <td className="p-3 border-r border-gray-100 text-center text-emerald-600 font-bold">✓ Dahil</td>
                    <td className="p-3 border-r border-gray-100 text-center bg-primary/5 text-emerald-600 font-black">✓ Dahil</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 bg-primary/5 p-4 rounded-xl text-center">
            <p className="text-xs font-bold text-primary">
              Önemli Bilgi: Tüm tasarım paketlerimizde kaynak (orijinal vektör) dosyaların teslimi için ek ücret talep edilmez ve mülkiyet hakkı tamamen tescilinize devredilir.
            </p>
          </div>

          {/* Kapsam Dışı İşlemler Bölümü */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-sm md:text-base font-black text-black uppercase tracking-tight mb-4">
              Kapsam Dışı İşlemler (Tasarım Hizmetine Dahil Olmayanlar)
            </h3>
            <p className="text-xs text-gray-500 font-semibold leading-relaxed mb-6">
              Müşterilerimize en şeffaf hizmeti sunmak adına, grafik tasarım paketlerimize dahil olmayan ve teklif/görüşme süreçlerinde netleştirilmesi gereken kapsam dışı işlemler aşağıda belirtilmiştir:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0"></div>
                <div>
                  <h5 className="font-extrabold text-xs text-black uppercase mb-1">Fotoğraf &amp; Video Çekimi</h5>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    Ürünlerinizin profesyonel stüdyo çekimleri, mekan fotoğrafları veya kurumsal tanıtım videoları paketlerimize dahil değildir. Görseller müşteri tarafından yüksek çözünürlüklü sağlanmalıdır.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0"></div>
                <div>
                  <h5 className="font-extrabold text-xs text-black uppercase mb-1">Metin Yazarlığı &amp; İçerik Yazımı</h5>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    Broşür, katalog veya ambalaj üstündeki tüm yazılar, reklam sloganları ve teknik açıklamalar sizler tarafından hazırlanmış olmalıdır. Çeviri ve redaksiyon desteği verilmez.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0"></div>
                <div>
                  <h5 className="font-extrabold text-xs text-black uppercase mb-1">Logo Tescili &amp; Marka Patent Başvuruları</h5>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    Tasarlanan logolar tescile %100 uygun özgünlükte çizilir. Ancak markanızın resmi tescili, isim hakkı sorgulaması ve hukuksal patent süreçleri marka vekiliniz tarafından yürütülmelidir.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0"></div>
                <div>
                  <h5 className="font-extrabold text-xs text-black uppercase mb-1">Özel Sanatsal İllüstrasyonlar</h5>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    Sıfırdan özgün dijital resim/karakter çizimi, 3D modelleme veya karmaşık sanatsal karakalem/suluboya illüstrasyonları standart grafik paketi dışındadır. Hazır vektörel ögeler kullanılır.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dahil / Dahil Değil Tablosu */}
          <div className="mt-12 bg-white rounded-3xl border border-gray-100 p-6 md:p-8 max-w-4xl mx-auto shadow-sm">
            <h3 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight text-center mb-2">
              Grafik Tasarım Hizmetine Dahil / Dahil Değil Tablosu
            </h3>
            <p className="text-center text-gray-500 font-semibold text-xs mb-8 max-w-xl mx-auto">
              Tasarım sürecinde hangi hizmetleri net olarak teslim alacağınızı ve hangi işlemlerin kapsam dışı olduğunu şeffafça inceleyin.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dahil Olanlar */}
              <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-6">
                <h4 className="font-extrabold text-xs text-emerald-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="bg-emerald-500 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold">✓</span>
                  Tasarım Hizmetine Dahil Olanlar
                </h4>
                <ul className="space-y-3 text-xs text-gray-600 font-semibold">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Özgün Taslaklar:</strong> Paket içeriğine göre 2 veya 3 farklı alternatif konsept sunumu.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Revizyon Hakları:</strong> Belirlenen limitler (3 ila 5 adet) dahilinde detay düzenleme.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Kaynak Dosyalar:</strong> Katmanlı .AI (Adobe Illustrator), .SVG ve vektörel .PDF formatları.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Baskı Öncesi Kontrol:</strong> Tasarımların baskı makinelerimize %100 uyumlu teknik ayarları.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Ölçü &amp; Bıçak İzi:</strong> Milimetrik taşırma payları, katlama çizgileri ve bıçak kalıbı çizimleri.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Renk Yönetimi:</strong> Baskıda sapma yapmayan doğru Pantone ve CMYK kodlaması.</span>
                  </li>
                </ul>
              </div>

              {/* Dahil Olmayanlar */}
              <div className="bg-rose-50/40 border border-rose-100 rounded-2xl p-6">
                <h4 className="font-extrabold text-xs text-rose-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="bg-rose-500 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold">✗</span>
                  Tasarım Hizmetine Dahil Olmayanlar (Kapsam Dışı)
                </h4>
                <ul className="space-y-3 text-xs text-gray-600 font-semibold">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-black shrink-0 mt-0.5">✕</span>
                    <span><strong>Fotoğraf &amp; Video:</strong> Ürünlerin stüdyo fotoğraf çekimleri veya video çekimleri.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-black shrink-0 mt-0.5">✕</span>
                    <span><strong>Metin Yazarlığı:</strong> Slogan bulma, ürün açıklamaları ve çeviri/redaksiyon işlemleri.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-black shrink-0 mt-0.5">✕</span>
                    <span><strong>İllüstrasyon &amp; 3D:</strong> Sıfırdan karmaşık sanatsal karakter çizimleri veya 3D modellemeler.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-black shrink-0 mt-0.5">✕</span>
                    <span><strong>Resmi Tescil:</strong> Marka patent başvurusu, logo tescili ve hukuksal koruma işlemleri.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-black shrink-0 mt-0.5">✕</span>
                    <span><strong>Baskı Maliyeti:</strong> Üretim, kağıt ve baskı bedeli (tasarım bedelinden ayrı hesaplanır).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 font-black shrink-0 mt-0.5">✕</span>
                    <span><strong>Ekstra Konsept:</strong> Sunulan konseptler haricinde tamamen farklı yeni taslak istekleri.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sınırsız Kullanım & Yasal Mülkiyet Hakları Güvencesi */}
          <div className="mt-12 bg-white rounded-3xl border border-gray-150 p-6 md:p-8">
            <h3 className="text-base md:text-lg font-black text-black uppercase tracking-tight text-center mb-3">
              Sınırsız Kullanım &amp; Yasal Mülkiyet Hakları Güvencesi
            </h3>
            <p className="text-center text-gray-500 font-semibold text-xs mb-8 max-w-2xl mx-auto">
              Mavi Basım'dan aldığınız tüm tasarımların mülkiyet hakları, herhangi bir gizli telif ücreti veya kısıtlama olmaksızın tamamen size aittir.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100 flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-xs text-black uppercase mb-3">Başka Matbaada Bastırma</h4>
                  <p className="text-gray-600 font-medium text-xs leading-relaxed">
                    Tasarımın yasal mülkiyet hakları tamamen sizdedir. Dosyaları dilediğiniz zaman dilediğiniz başka bir matbaaya veya dijital platforma verip doğrudan baskı alabilirsiniz. Bizden basım yaptırma zorunluluğunuz yoktur (fakat bizimle devam ederseniz tasarım fiyatında %50 indirim kazanırsınız).
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100 flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-xs text-black uppercase mb-3">Sınırsız Değiştirme &amp; Düzenleme</h4>
                  <p className="text-gray-600 font-medium text-xs leading-relaxed">
                    Tasarımları katmanlı orijinal vektör (.AI, .PSD, .SVG) formatında teslim ederiz. İlerleyen yıllarda kendi bünyenizdeki bir tasarımcıya veya başka bir ajansa dosyaları verip üzerinde her türlü değişiklik, renk güncellemesi ve boyut ölçeklemesini kolayca yaptırabilirsiniz.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100 flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-xs text-black uppercase mb-3">Resmi Patent &amp; Tescil Hakları</h4>
                  <p className="text-gray-600 font-medium text-xs leading-relaxed">
                    Sıfırdan hazırladığımız tüm logo, ambalaj ve kurumsal kimlik tasarımlarımız Türk Patent ve Marka Kurumu tescil kriterlerine %100 uyumludur. Tescil başvurusu sırasında hiçbir hukuki engele takılmayacak şekilde özgün çizim yapılır, mülkiyet tamamen markanızındır.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100 flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-xs text-black uppercase mb-3">Gizli Telif / Ek Ücret Yok</h4>
                  <p className="text-gray-600 font-medium text-xs leading-relaxed">
                    Sıfırdan hazırladığımız tüm tasarımları iş sonunda hiçbir sürpriz ek ödeme talep etmeden teslim ederiz. Tasarım için anlaştığımız bütçe haricinde, gelecekte marka değeriniz arttığında sizden asla ek telif hakkı veya lisanslama bedeli talep edilmez.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-emerald-50 text-emerald-800 text-xs p-3.5 rounded-xl text-center font-bold">
              Yasal Güvence Beyanı: Siparişiniz tamamlandığında yukarıdaki tüm haklar, herhangi bir ek sözleşmeye gerek kalmaksızın yasal olarak firmanıza devredilmiş sayılır.
            </div>
          </div>
        </div>

        {/* Sektör Çeşitliliği */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight text-center mb-3">
            Hizmet Verdiğimiz Sektörler &amp; Ticari Çözümler
          </h2>
          <p className="text-center text-gray-500 font-semibold text-sm mb-12 max-w-2xl mx-auto">
            Hemen hemen her sektörün ticari ihtiyaçlarına, yasal metin standartlarına ve paketleme gereksinimlerine hakim tasarım ekibimizle çalışın.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectors.map((sec, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 hover:bg-slate-50 transition-all flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-primary uppercase mb-2">{sec.name}</h4>
                  <p className="text-xs text-gray-500 font-semibold leading-relaxed mb-3">{sec.details}</p>
                  
                  {sec.primaryDesignService && (
                    <div className="bg-amber-50/50 border border-amber-100/70 rounded-xl p-2.5 mb-3 text-left">
                      <span className="text-[9px] font-black text-amber-700 uppercase block tracking-wider mb-0.5">
                        Birincil Tasarım İhtiyacı:
                      </span>
                      <p className="text-xs font-black text-slate-900 leading-snug">
                        {sec.primaryDesignService}
                      </p>
                    </div>
                  )}
                </div>
                <div className="pt-3 border-t border-gray-100 mt-2">
                  <span className="text-[10px] font-black uppercase text-gray-400 block mb-1.5">İlgili Baskı Ürünleri:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {sec.links.map((link, lIdx) => (
                      <Link 
                        key={lIdx} 
                        to={link.path}
                        className="inline-flex items-center gap-1 text-xs bg-slate-100 hover:bg-primary/10 hover:text-primary transition-all text-gray-700 px-2.5 py-1 rounded-full font-bold"
                      >
                        {link.name} &rarr;
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tam Kurumsal Kimlik Paketi Detayları */}
        <div id="kurumsal-kimlik-paketleri" className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16 border border-gray-100">
          <div className="max-w-4xl mx-auto">
            <span className="text-primary font-black uppercase text-[10px] tracking-widest block mb-2 text-center">EN KAPSAMLI KURUMSAL ÇÖZÜM</span>
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight text-center mb-3">
              Tam Kurumsal Kimlik Paketi İçeriği
            </h2>
            <p className="text-center text-gray-500 font-semibold text-sm mb-12">
              Yeni kurulan veya kurumsal kimliğini yenileyen firmalar için en ince ayrıntısına kadar düşünülmüş, birbiriyle tam uyumlu anahtar teslim marka paketi.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <h3 className="font-extrabold text-sm text-black uppercase mb-4 text-primary">Pakete Dahil Olan Standart Tasarımlar</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-xs text-gray-600 font-semibold">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Logo Tasarımı:</strong> 3 Adet benzersiz vektörel alternatifli logo çalışması ve logo onayının ardından tescile uygun şablonlanması.</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-gray-600 font-semibold">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Prestij Kartvizit:</strong> Çift yönlü, lak ve gofre alanları matbaa üretimine hazır halde özel kartvizit tasarımı.</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-gray-600 font-semibold">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Antetli Kağıt:</strong> Kurumsal resmi ve gayriresmi tüm yazışmalar için standart A4 antetli kağıt mizanpajı.</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-gray-600 font-semibold">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Zarf Tasarımı:</strong> Diplomat pencereli/penceresiz zarf ve kurumsal evrak gönderimleri için şık torba zarf yerleşimi.</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-gray-600 font-semibold">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Cepli Sunum Dosyası:</strong> Teklif ve sunumlarınız için baskı bıçak kalıplarımıza birebir uygun cepli dosya tasarımı.</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-gray-600 font-semibold">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>Bloknot veya Küp Bloknot:</strong> Kapaklı spiralli bloknot veya masaüstü küp bloknot taslağı.</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-gray-600 font-semibold">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span><strong>E-Posta İmzası:</strong> Personeliniz için kurumsal, şık ve okunabilir e-posta imza şablonu.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-black uppercase mb-4 text-amber-500">İhtiyaca Göre Opsiyonel Ek Tasarımlar</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-xs text-gray-600 font-semibold">
                      <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span><strong>Araç Giydirme:</strong> Kurumsal hafif ticari veya binek araçlarınız için grafik giydirme şablonu.</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-gray-600 font-semibold">
                      <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span><strong>Tabela &amp; Cephe Giydirme:</strong> Ofis ve dükkan cepheleriniz için tabelacıların doğrudan üretime alabileceği tasarımlar.</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-gray-600 font-semibold">
                      <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span><strong>Kurumsal Fatura &amp; Makbuz:</strong> e-Arşiv faturası ve sürekli form basımına uygun fatura/irsaliye taslakları.</span>
                    </li>
                    <li className="flex items-start gap-2 text-xs text-gray-600 font-semibold">
                      <Check className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span><strong>Sosyal Medya Kitleri:</strong> Instagram gönderi şablonları, kapaklar ve hikaye şablon yerleşimleri.</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                  <a 
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-block bg-primary text-white hover:bg-secondary font-black text-xs uppercase tracking-widest py-3 rounded-xl transition-all"
                  >
                    Kurumsal Paket İçin Teklif Al
                  </a>
                </div>
              </div>
            </div>

            {/* Kurumsal Kimlik Teslim Sıralaması */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <span className="text-primary font-black uppercase text-[10px] tracking-widest block mb-2 text-center">İŞ AKIŞI VE SÜREÇ</span>
              <h3 className="text-center font-extrabold text-sm text-slate-800 uppercase mb-6 tracking-wide">
                Kurumsal Kimlik Paketi Hazırlanma &amp; Teslimat Sırası
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                {/* Step 1 */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 relative shadow-2xs text-center flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-white font-black flex items-center justify-center text-xs mb-3">1</div>
                  <h4 className="font-extrabold text-xs text-black uppercase mb-1">Logo Tasarımı</h4>
                  <span className="text-xs text-primary font-bold mb-2">1-4. İş Günü</span>
                  <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                    Marka karakterinizi yansıtan alternatif logo taslakları hazırlanır. Logo kesinleşmeden diğer evraklara geçilmez.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 relative shadow-2xs text-center flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-white font-black flex items-center justify-center text-xs mb-3">2</div>
                  <h4 className="font-extrabold text-xs text-black uppercase mb-1">Kartvizit &amp; Antetli</h4>
                  <span className="text-xs text-primary font-bold mb-2">5-6. İş Günü</span>
                  <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                    Onaylanan logonuz temel alınarak, en yoğun kullanılan temel iletişim araçları olan kartvizit ve antetli kağıt çizilir.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 relative shadow-2xs text-center flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-white font-black flex items-center justify-center text-xs mb-3">3</div>
                  <h4 className="font-extrabold text-xs text-black uppercase mb-1">Klasör, Zarf &amp; Bloknot</h4>
                  <span className="text-xs text-primary font-bold mb-2">7-8. İş Günü</span>
                  <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                    Sunum dosyası, diplomat pencereli/penceresiz zarflar, bloknot ve diğer tüm evrakların hassas kalıp yerleşimleri tamamlanır.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="bg-white p-5 rounded-2xl border border-gray-100 relative shadow-2xs text-center flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-black flex items-center justify-center text-xs mb-3">✓</div>
                  <h4 className="font-extrabold text-xs text-black uppercase mb-1">Kontrol &amp; Teslimat</h4>
                  <span className="text-xs text-emerald-600 font-bold mb-2">9-10. İş Günü</span>
                  <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                    Tüm çalışmalar endüstriyel matbaa kalıplarımıza göre test edilir, onayınızla baskıya hazır dosyalar paket halinde iletilir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sipariş Vermeden Önce Hazırlanması Gerekenler */}
        <div className="bg-amber-50/40 border border-amber-100 rounded-3xl p-8 md:p-12 mb-16 max-w-5xl mx-auto text-left">
          <div className="mb-4">
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight mb-1">
              Sipariş Vermeden Önce Hazırlanması Gerekenler
            </h2>
            <p className="text-xs md:text-sm text-amber-900 font-semibold">
              Tasarım sürecimizin en hızlı ve sorunsuz şekilde başlaması için brief öncesinde şu temel bilgi ve dosyaları hazırlamanızı öneririz:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-5 rounded-2xl border border-amber-100/60 shadow-3xs">
              <h4 className="font-extrabold text-xs text-black uppercase mb-1.5">1. Marka Briefi &amp; Karakter</h4>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Markanızın adı, sektörü, hedef kitlesi ve iletmek istediği duygular (lüks, samimi, teknolojik vb.).
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-amber-100/60 shadow-3xs">
              <h4 className="font-extrabold text-xs text-black uppercase mb-1.5">2. Net Ölçüler &amp; Şablon</h4>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Tasarlanacak ürünün net en x boy ölçüleri, katlama payları veya matbaa kesim bıçak izi kılavuzu.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-amber-100/60 shadow-3xs">
              <h4 className="font-extrabold text-xs text-black uppercase mb-1.5">3. Metin &amp; Sloganlar</h4>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Ürün üstünde yazacak tüm teknik açıklamalar, kullanım talimatları, barkod no, adres ve iletişim bilgileri.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-amber-100/60 shadow-3xs">
              <h4 className="font-extrabold text-xs text-black uppercase mb-1.5">4. Ürün Fotoğrafları</h4>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Katalog veya kutuda kullanılacak yüksek çözünürlüklü (min. 300 DPI) stüdyo çekimi ürün görselleri.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-amber-100/60 shadow-3xs">
              <h4 className="font-extrabold text-xs text-black uppercase mb-1.5">5. Beğenilen Örnekler</h4>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Sektörden veya rakiplerinizden beğendiğiniz, tarzını kendinize yakın bulduğunuz 2-3 adet tasarım örneği.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-amber-100/60 shadow-3xs">
              <h4 className="font-extrabold text-xs text-black uppercase mb-1.5">6. Mevcut Vektörel Logo</h4>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Logo tasarımı istemiyorsanız, mevcut logonuzun .AI, .PDF veya .EPS formatındaki vektörel orijinal çizimi.
              </p>
            </div>
          </div>
        </div>

        {/* Tasarım-Baskı Eşleştirme Tablosu */}
        <div className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-2xs max-w-4xl mx-auto mb-16 text-left">
          <div className="bg-slate-900 p-5 text-center text-white">
            <span className="text-[#00E5FF] font-black text-[10px] uppercase tracking-widest block mb-1">TASARIM-BASKI ENTEGRASYON KILAVUZU</span>
            <h3 className="font-black text-sm md:text-base uppercase tracking-tight">
              Hangi Tasarımı Yaptırırsam Hangi Baskı Ürününü Sipariş Edebilirim?
            </h3>
            <p className="text-gray-400 font-semibold text-xs mt-1 max-w-2xl mx-auto">
              Mavi Basım bünyesinde yaptıracağınız her profesyonel tasarım, kendi üretim parkurumuzda doğrudan aşağıdaki baskı ürünlerine dönüştürülebilir.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-semibold text-gray-700">
              <thead>
                <tr className="bg-slate-50 text-slate-600 uppercase text-[9px] tracking-wider border-b border-gray-200">
                  <th className="p-3.5 border-r border-gray-100">Grafik Tasarım Hizmeti</th>
                  <th className="p-3.5 border-r border-gray-100">Uyumlu Baskı Ürünleri</th>
                  <th className="p-3.5 border-r border-gray-100">Uygulanabilir Lüks Baskı Teknikleri</th>
                  <th className="p-3.5 text-center">İncele</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-slate-50/50">
                  <td className="p-3.5 border-r border-gray-100">
                    <div>
                      <p className="font-extrabold text-black uppercase text-xs">Logo Tasarımı</p>
                      <p className="text-xs text-gray-400 font-medium">Patent ve Tescile Uyumlu Vektör</p>
                    </div>
                  </td>
                  <td className="p-3.5 border-r border-gray-100 text-gray-600 text-xs leading-relaxed">
                    Kartvizit, Kurumsal Antetli Kağıt, Diplomat Zarf, Cepli Sunum Dosyası, Tabela, Kargo Kolisi
                  </td>
                  <td className="p-3.5 border-r border-gray-100 text-gray-500 text-xs">
                    Her türlü varak yaldız, gofre (kabartma) ve lokal lak uygulamalarına hazır vektörel katmanlama.
                  </td>
                  <td className="p-3.5 text-center">
                    <Link to="/kartvizit" className="inline-block bg-primary/10 text-primary font-black text-xs uppercase px-2.5 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-all">
                      Evrak Seti &rarr;
                    </Link>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-slate-50/50">
                  <td className="p-3.5 border-r border-gray-100">
                    <div>
                      <p className="font-extrabold text-black uppercase text-xs">Kartvizit Tasarımı</p>
                      <p className="text-xs text-gray-400 font-medium">Çift Yönlü Mikron Kesim Şablonu</p>
                    </div>
                  </td>
                  <td className="p-3.5 border-r border-gray-100 text-gray-600 text-xs leading-relaxed">
                    Lüks Kabartma Laklı Kartvizitler, Sıvama Kartvizit, Şeffaf PVC Kartvizit, Katlamalı Kartvizit
                  </td>
                  <td className="p-3.5 border-r border-gray-100 text-gray-500 text-xs">
                    350gr Mat Kuşe, Gofre Kabartma, Altın/Gümüş Varak Yaldız, Bölgesel Parlak Lak, Özel Oval Köşe Kesimi.
                  </td>
                  <td className="p-3.5 text-center">
                    <Link to="/kartvizit" className="inline-block bg-primary/10 text-primary font-black text-xs uppercase px-2.5 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-all">
                      Kartvizit &rarr;
                    </Link>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-slate-50/50">
                  <td className="p-3.5 border-r border-gray-100">
                    <div>
                      <p className="font-extrabold text-black uppercase text-xs">Katalog &amp; Broşür Tasarımı</p>
                      <p className="text-xs text-gray-400 font-medium">Sayfa Dizilim ve Kırım Payı Hesaplı</p>
                    </div>
                  </td>
                  <td className="p-3.5 border-r border-gray-100 text-gray-600 text-xs leading-relaxed">
                    Çok Sayfalı Kataloglar, Akordeon Kırımlı Broşür, İnsert, Dergi, Restoran Menüsü, El İlanı
                  </td>
                  <td className="p-3.5 border-r border-gray-100 text-gray-500 text-xs">
                    Amerikan Cilt, Tel Dikiş, İplik Dikiş, G-Kırım/Z-Kırım katlama yolları, kalın kapak ve iç sayfa gramaj ayarları.
                  </td>
                  <td className="p-3.5 text-center">
                    <Link to="/kataloglar" className="inline-block bg-primary/10 text-primary font-black text-xs uppercase px-2.5 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-all">
                      Katalog &rarr;
                    </Link>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-slate-50/50">
                  <td className="p-3.5 border-r border-gray-100">
                    <div>
                      <p className="font-extrabold text-black uppercase text-xs">Afiş &amp; Poster Tasarımı</p>
                      <p className="text-xs text-gray-400 font-medium">Yüksek Çözünürlüklü Büyük Ebat</p>
                    </div>
                  </td>
                  <td className="p-3.5 border-r border-gray-100 text-gray-600 text-xs leading-relaxed">
                    İç &amp; Dış Mekan Afişler, Posterler, Kuşe El İlanları, Fuar Roll-Up, Billboard, Durak Raketleri
                  </td>
                  <td className="p-3.5 border-r border-gray-100 text-gray-500 text-xs">
                    90gr - 170gr Kuşe kâğıt seçenekleri, Blueback billboard kâğıdı, dış mekana dayanıklı solmaz UV dijital baskı.
                  </td>
                  <td className="p-3.5 text-center">
                    <Link to="/afis" className="inline-block bg-primary/10 text-primary font-black text-xs uppercase px-2.5 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-all">
                      Afiş &rarr;
                    </Link>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-slate-50/50">
                  <td className="p-3.5 border-r border-gray-100">
                    <div>
                      <p className="font-extrabold text-black uppercase text-xs">Kutu &amp; Ambalaj Tasarımı</p>
                      <p className="text-xs text-gray-400 font-medium">Kalıba Özel Milimetrik Bıçak İzi</p>
                    </div>
                  </td>
                  <td className="p-3.5 border-r border-gray-100 text-gray-600 text-xs leading-relaxed">
                    Kraft Karton Kutular, Özel Kesim Ürün Ambalajları, Gıda Karton Kutuları, İlaç &amp; Kozmetik Kutusu
                  </td>
                  <td className="p-3.5 border-r border-gray-100 text-gray-500 text-xs">
                    Amerikan Bristol, Kroma Karton, mat/parlak selefon kaplama, ofset baskı ve özel kilit mekanizmaları.
                  </td>
                  <td className="p-3.5 text-center">
                    <Link to="/etiket" className="inline-block bg-primary/10 text-primary font-black text-xs uppercase px-2.5 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-all">
                      Kutu/Etiket &rarr;
                    </Link>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-3.5 border-r border-gray-100">
                    <div>
                      <p className="font-extrabold text-black uppercase text-xs">Kurumsal Kimlik Paketi</p>
                      <p className="text-xs text-gray-400 font-medium">Bütünsel Marka Kimliği Seti</p>
                    </div>
                  </td>
                  <td className="p-3.5 border-r border-gray-100 text-gray-600 text-xs leading-relaxed">
                    Tüm Evrak ve Dosyalama Ürünleri, Cepli Dosya, Bloknot, Personel Kimlik Kartları, Ambalaj Poşeti
                  </td>
                  <td className="p-3.5 border-r border-gray-100 text-gray-500 text-xs">
                    Mat/parlak laminasyon selefon kaplama, cepli dosyalarda kendinden kilitli veya körüklü özel kesim seçenekleri.
                  </td>
                  <td className="p-3.5 text-center">
                    <Link to="/dosyalar" className="inline-block bg-primary/10 text-primary font-black text-xs uppercase px-2.5 py-1.5 rounded-lg hover:bg-primary hover:text-white transition-all">
                      Klasör/Zarf &rarr;
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-slate-50 px-5 py-3 border-t border-gray-150 text-center">
            <p className="text-xs font-bold text-gray-500">
              <strong>Ücretsiz Baskı Öncesi Kontrol:</strong> Başka bir grafikere hazırlatmış olsanız dahi, elinizdeki hazır tasarımları üretime vermeden önce teknik kontrol ekibimizle tamamen <strong>ücretsiz</strong> analiz edip baskı makinemize uyumlandırıyoruz!
            </p>
          </div>
        </div>

        {/* Grafik Tasarım Süreci & Anadolu Süreci & Entegrasyon (Point 7, 8) */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight text-center mb-3">
            Grafik Tasarım ve Onay Sürecimiz (4 Adım)
          </h2>
          <p className="text-center text-gray-500 font-semibold text-sm mb-12 max-w-2xl mx-auto">
            İster İstanbul'da olun ister Anadolu'nun herhangi bir ilinde; baştan sona şeffaf, hızlı ve güvenli dijital onay adımlarıyla çalışıyoruz.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((p, idx) => (
              <div key={idx} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all relative">
                <div className="absolute -top-4 left-6 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-black text-sm">
                  {idx + 1}
                </div>
                <h3 className="text-base font-extrabold text-black mt-2 mb-3">{p.title}</h3>
                <p className="text-gray-500 text-xs font-semibold leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Gerçek Teslim Sürecinden Örnek (Point 2 - Onay Süreci Kanıtı) */}
          <div className="mt-12 bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 max-w-5xl mx-auto text-left">
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-wider mb-3">
              KANITLANMIŞ VE DOĞRULANMIŞ SÜREÇ
            </span>
            <h3 className="text-lg md:text-xl font-black text-black uppercase tracking-tight mb-2">
              Gerçek Teslim Sürecinden Örnek
            </h3>
            <p className="text-xs text-gray-500 font-semibold mb-8">
              Mavi Basım Baskı Öncesi Kontrol ekibimizin müşterilerimizle birebir yürüttüğü onay ve teslimat adımlarının canlandırması.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* 1. Gerçek PDF Prova */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-3xs flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-black uppercase text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-full mb-3 inline-block">1. Gerçek PDF Prova</span>
                  <h4 className="font-extrabold text-xs text-black uppercase mb-2">Baskı Öncesi Kontrol</h4>
                  <div className="border border-dashed border-gray-300 rounded p-2 bg-slate-50 text-center relative overflow-hidden h-24 flex flex-col justify-center">
                    <span className="absolute top-1 right-1 text-[7px] font-bold text-red-500 uppercase border border-red-200 px-0.5 bg-white">3mm Bleed</span>
                    <p className="text-[10px] font-black text-black">A4_Katalog_v4.pdf</p>
                    <p className="text-[8px] text-gray-400 font-bold mt-1">CMYK / Fogra39 / 300 DPI</p>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 font-medium leading-normal mt-3">
                  Tasarım tamamlandığında tüm kesim payları ve renk profilleri bu şekilde eksiksiz işlenir.
                </p>
              </div>

              {/* 2. Gerçek WhatsApp Onayı */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-3xs flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-black uppercase text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded-full mb-3 inline-block">2. WhatsApp Onayı</span>
                  <h4 className="font-extrabold text-xs text-black uppercase mb-2">Yazılı Kayıt Sistemi</h4>
                  <div className="bg-emerald-50/50 rounded-lg p-2.5 space-y-2 h-24 overflow-y-auto text-[9px] font-sans">
                    <div className="bg-white p-1.5 rounded shadow-3xs border border-emerald-100 max-w-[85%] text-left text-[8px]">
                      <p className="text-emerald-700 font-bold">Mavi Basım:</p>
                      <p className="text-slate-700 leading-tight">Yazılı onay provanız ektedir. Onaylıyor musunuz?</p>
                    </div>
                    <div className="bg-emerald-600 text-white p-1.5 rounded shadow-3xs max-w-[85%] ml-auto text-[8px] text-left">
                      <p className="font-bold">Müşteri:</p>
                      <p className="leading-tight">Kontrol ettik, renkler ve bilgiler doğrudur. Baskı onayını veriyoruz.</p>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 font-medium leading-normal mt-3">
                  WhatsApp üzerinden her revizyon sonrası kayıt altına alınan resmi onayınızla üretime geçilir.
                </p>
              </div>

              {/* 3. Gerçek Revizyon Ekranı */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-3xs flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-black uppercase text-[#D97706] bg-amber-50 px-2 py-0.5 rounded-full mb-3 inline-block">3. Revizyon Takibi</span>
                  <h4 className="font-extrabold text-xs text-black uppercase mb-2">Geçmiş Sürümler</h4>
                  <div className="bg-slate-50 rounded p-2.5 space-y-1.5 h-24 text-[9px]">
                    <div className="flex items-center justify-between text-gray-400">
                      <span>Sürüm 1 (Konsept):</span>
                      <span className="font-bold">Reddedildi</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-400">
                      <span>Sürüm 2 (Revizyon):</span>
                      <span className="font-bold">Değiştirildi</span>
                    </div>
                    <div className="flex items-center justify-between text-emerald-600 font-extrabold">
                      <span>Sürüm 3 (Nihai):</span>
                      <span className="flex items-center gap-0.5"><Check size={10} /> Onaylandı</span>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 font-medium leading-normal mt-3">
                  Tasarım sürecindeki tüm geribildirimleriniz adım adım listelenerek hatasız ilerlenmesi sağlanır.
                </p>
              </div>

              {/* 4. Gerçek AI Çalışma Ekranı */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-3xs flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-black uppercase text-[#4F46E5] bg-indigo-50 px-2 py-0.5 rounded-full mb-3 inline-block">4. Illustrator Katmanları</span>
                  <h4 className="font-extrabold text-xs text-black uppercase mb-2">Çizim Detayı</h4>
                  <div className="bg-slate-900 text-gray-400 rounded p-2 font-mono text-[8px] h-24 space-y-1">
                    <p className="text-indigo-400 font-bold">Çizim Katmanları:</p>
                    <p className="text-emerald-400">☑ [Katman 3] Kesim &amp; Katlama Yerleri</p>
                    <p className="text-amber-400">☑ [Katman 2] Kabartmalı &amp; Parlak Alanlar</p>
                    <p className="text-white">☑ [Katman 1] Ana Logo &amp; Görseller</p>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 font-medium leading-normal mt-3">
                  Logonuz, parlayacak olan kabartmalı alanlar ve katlanacak bölgeler tamamen ayrı katmanlarda çizilir. Böylece matbaada tam istediğiniz gibi basılır.
                </p>
              </div>

              {/* 5. Gerçek Teslim Klasörü */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-3xs flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-black uppercase text-[#7C3AED] bg-purple-50 px-2 py-0.5 rounded-full mb-3 inline-block">5. Teslimat Klasörü</span>
                  <h4 className="font-extrabold text-xs text-black uppercase mb-2">Eksiksiz Arşiv Teslimi</h4>
                  <div className="bg-slate-950 text-slate-300 rounded p-2 font-mono text-[7px] leading-tight h-24 whitespace-pre overflow-hidden">
                    {"📂 Siparis-Kurumsal-Kimlik/\n ┣ 📂 01-Baskiya-Hazir-PDF/\n ┣ 📂 02-Vektorel-Kaynak-AI/\n ┣ 📂 03-Kurumsal-Yazitipi/\n ┗ 📄 Kullanim-Kilavuzu.txt"}
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 font-medium leading-normal mt-3">
                  Üretim bittiğinde tüm bu dosyalar bulut arşiv linki ve e-posta ile tarafınıza eksiksiz iletilir.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gerçek Proje Örnekleri / Case Studies (Point 5 - EEAT & Referans) */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight text-center mb-3">
            Tasarım Portföyümüz &amp; Gerçek Çalışma Örnekleri
          </h2>
          <p className="text-center text-gray-500 font-semibold text-sm mb-8 max-w-2xl mx-auto">
            Daha önce başarıyla tamamladığımız, tasarımdan doğrudan modern üretim tesislerimize aktararak teslim ettiğimiz projelerimizden bazıları.
          </p>

          {/* Filtreleme Menüsü (Point 11) */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
            {["Tümü", "Logo", "Ambalaj", "Kurumsal Kimlik"].map((cat) => (
              <button
                key={cat}
                onClick={() => setPortfolioFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer border ${
                  portfolioFilter === cat
                    ? "bg-primary text-white border-primary shadow-xs"
                    : "bg-white text-gray-500 hover:text-black hover:bg-gray-50 border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies
              .filter(cs => portfolioFilter === "Tümü" || cs.filterTags?.includes(portfolioFilter))
              .map((cs, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black uppercase text-primary tracking-wider bg-primary/5 px-2.5 py-1 rounded-full">
                      {cs.category}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400">
                      {cs.date}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-black mb-4 uppercase leading-tight">
                    {cs.title}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="text-[10px] font-black text-red-500 uppercase block mb-0.5">İhtiyaç / Sorun:</span>
                      <p className="text-xs text-gray-500 font-semibold leading-relaxed">{cs.challenge}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-emerald-600 uppercase block mb-0.5">Uygulanan Çözüm:</span>
                      <p className="text-xs text-gray-500 font-semibold leading-relaxed">{cs.solution}</p>
                    </div>
                  </div>

                  {/* ▼ PROJE BİLGİLERİ (Müşteri Doğrulama Bilgileri) */}
                  <div className="bg-slate-900 text-[11px] text-slate-300 rounded-xl p-4 mb-4 font-mono border border-slate-800">
                    <div className="flex items-center gap-1.5 text-indigo-400 font-extrabold uppercase text-[10px] mb-2 pb-1.5 border-b border-slate-800">
                      <span>PROJE BİLGİLERİ (Teknik Doğrulama)</span>
                    </div>
                    <div className="space-y-1.5">
                      {cs.projectDetails?.map((detail, dIdx) => (
                        <div key={dIdx} className="flex justify-between items-center gap-2">
                          <span className="text-slate-500 font-medium">{detail.label}:</span>
                          <span className="text-slate-200 font-bold text-right">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gerçek Müşteri Değerlendirmesi / Google Yorumu (EEAT) */}
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-4 relative">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(cs.rating)].map((_, i) => (
                        <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded-sm ml-auto flex items-center gap-0.5">
                        ✓ Google Doğrulanmış
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 font-semibold italic leading-relaxed mb-2">
                      "{cs.reviewText}"
                    </p>
                    <div className="text-[10px] font-black text-gray-800">
                      — {cs.reviewerRole}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <span className="text-[10px] font-black text-gray-800 uppercase block tracking-wide">
                    Doğrulanmış Teslimat Kanıtı:
                  </span>
                  <div className="grid grid-cols-1 gap-1.5 text-[10px] text-gray-600 font-bold">
                    <div className="flex items-center gap-1.5 bg-gray-50 p-1.5 rounded border border-gray-100">
                      <Check size={11} className="text-emerald-600 stroke-[3]" />
                      <span>Gerçek Baskı / Ürün Fotoğrafı (JPG)</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-50 p-1.5 rounded border border-gray-100">
                      <Check size={11} className="text-emerald-600 stroke-[3]" />
                      <span>Onaylı PDF Prova Ekranı</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-50 p-1.5 rounded border border-gray-100">
                      <Check size={11} className="text-emerald-600 stroke-[3]" />
                      <span>Katmanlı AI Vektör Kaynağı</span>
                    </div>
                  </div>
                </div>

                {/* İlgili Baskı Ürünleri Geçiş Bölümü (Point 2) */}
                {cs.relatedProducts && cs.relatedProducts.length > 0 && (
                  <div className="pt-4 border-t border-gray-100 mt-3 space-y-2">
                    <span className="text-[10px] font-black text-primary uppercase block tracking-wide">
                      İlgili Baskı Ürünleri (Fiyatları İnceleyin):
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {cs.relatedProducts.map((p, pIdx) => (
                        <Link 
                          key={pIdx} 
                          to={p.path}
                          className="flex items-center justify-between bg-primary/5 hover:bg-primary hover:text-white text-primary rounded-xl px-3 py-2 text-[11px] font-bold transition-all group"
                        >
                          <span className="font-semibold">{p.name}</span>
                          <span className="text-[9px] font-black uppercase tracking-wider group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                            Fiyat Listesi &rarr;
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Kullanılan Grafik Tasarım Hizmeti & Fiyatı (Point 1 - Portföy İçi Entegre Fiyat Bilgisi) */}
                {cs.designPriceInfo && (
                  <div className="pt-3 border-t border-dashed border-gray-200 mt-3 space-y-2">
                    <span className="text-[10px] font-black text-[#D97706] uppercase block tracking-wide">
                      Kullanılan Grafik Tasarım Hizmeti &amp; Fiyatı:
                    </span>
                    <div className="bg-amber-50/50 border border-amber-100/70 rounded-xl p-3 space-y-1.5 text-[11px] text-left">
                      <div className="flex justify-between font-bold text-gray-700">
                        <span className="text-gray-500">Tasarım Hizmeti:</span>
                        <span className="text-slate-950 text-right">{cs.designPriceInfo.serviceName}</span>
                      </div>
                      <div className="flex justify-between font-bold text-gray-700">
                        <span className="text-gray-500">Tasarım Bedeli:</span>
                        <span className="line-through text-red-500">{cs.designPriceInfo.priceRange}</span>
                      </div>
                      <div className="flex justify-between font-black text-emerald-700 bg-emerald-50 border border-emerald-100/50 px-2 py-1 rounded">
                        <span>%50 Matbaa İndirimiyle:</span>
                        <span>{cs.designPriceInfo.discountedRange}</span>
                      </div>
                      <div className="text-center pt-1 border-t border-amber-100/30">
                        <a 
                          href={`#${cs.designPriceInfo.targetId}`}
                          onClick={(e) => {
                            e.preventDefault();
                            const el = document.getElementById(cs.designPriceInfo.targetId);
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="text-[9px] font-black text-primary hover:text-secondary uppercase tracking-wider inline-flex items-center gap-0.5"
                        >
                          Tüm Tasarım Fiyat Listesini Gör &rarr;
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* PORTFÖY ÖZEL ARA CTA & PROJE FİYATLANDIRMA (Point 15) */}
          <div className="mt-12 bg-indigo-50/60 border border-indigo-150 rounded-2xl p-6 text-left max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <span className="text-indigo-600 font-black text-[9px] uppercase tracking-widest block mb-1">PROJE ÖZEL DEĞERLENDİRME</span>
              <h4 className="font-extrabold text-sm text-black uppercase mb-2">
                Yukarıdaki Vaka Çalışmaları Gibi Bir Projeniz mi Var?
              </h4>
              <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                İncelediğiniz logo, ambalaj veya kurumsal kimlik tasarımlarımızın standartlarında, tamamen sizin markanıza özel ve tescil uyumlu çizimler hazırlayalım. Kendi projenizin tasarım ve baskı maliyetini dakikalar içinde hesaplatabilirsiniz.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Merhaba, portföyünüzdeki vaka çalışmalarını inceledim. Benim de benzer bir tasarım/baskı projem var, fiyatlandırma ve süreç hakkında görüşmek istiyorum.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all text-center flex items-center justify-center gap-1.5 shadow-sm hover:scale-102 cursor-pointer"
              >
                <WhatsAppIcon size={14} /> Benzer Projeyi Fiyatlandır
              </a>
              <Link 
                to="/iletisim"
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all text-center flex items-center justify-center gap-1.5 shadow-sm hover:scale-102 cursor-pointer"
              >
                Bizden Teklif Al &rarr;
              </Link>
            </div>
          </div>

          {/* BİZİMLE ÇALIŞAN MARKALAR & GÜVEN SİNYALİ BLOĞU (Point 14) */}
          <div className="mt-12 border-t border-b border-gray-150 py-8 max-w-4xl mx-auto">
            <span className="text-gray-400 font-black text-[9px] uppercase tracking-widest block mb-4 text-center">GÜVEN SİNYALİ &amp; BİZİMLE ÇALIŞAN KURUMSAL MARKALAR</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center justify-center opacity-85 hover:opacity-100 transition-opacity">
              <div className="flex flex-col items-center justify-center bg-white border border-gray-200 py-4 px-3 rounded-xl text-center shadow-3xs">
                <span className="font-extrabold text-xs text-gray-800 uppercase tracking-tight">Anadolu Tarım</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-white border border-gray-200 py-4 px-3 rounded-xl text-center shadow-3xs">
                <span className="font-extrabold text-xs text-gray-800 uppercase tracking-tight">NovaTech Elkt.</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-white border border-gray-200 py-4 px-3 rounded-xl text-center shadow-3xs">
                <span className="font-extrabold text-xs text-gray-800 uppercase tracking-tight">Vera Kozmetik</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-white border border-gray-200 py-4 px-3 rounded-xl text-center shadow-3xs">
                <span className="font-extrabold text-xs text-gray-800 uppercase tracking-tight">Ege Yapı OSB</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-white border border-gray-200 py-4 px-3 rounded-xl text-center shadow-3xs">
                <span className="font-extrabold text-xs text-gray-800 uppercase tracking-tight">Liva Gıda A.Ş.</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-white border border-gray-200 py-4 px-3 rounded-xl text-center shadow-3xs">
                <span className="font-extrabold text-xs text-gray-800 uppercase tracking-tight">Aktif Medikal</span>
              </div>
            </div>
            <p className="text-center text-gray-400 font-semibold text-[10px] mt-4">
              Mavi Basım, müşteri gizlilik sözleşmeleri kapsamında tescilli markaların logolarını izin dâhilinde yayınlamaktadır.
            </p>
          </div>

          {/* Portföy Sonu İkna ve WhatsApp CTA (Point 3) */}
          <div className="mt-10 bg-primary/5 border border-primary/10 rounded-2xl p-6 text-center max-w-3xl mx-auto">
            <h4 className="font-black text-sm text-black uppercase mb-1">
              Sizin Markanız İçin de Kusursuz Bir Tasarım Hazırlayalım!
            </h4>
            <p className="text-xs text-gray-500 font-semibold mb-4">
              Üstelik tasarımını yaptığımız ürünün baskısını da bize verdiğinizde, tasarım ücretinde tam <strong>%50 net indirim</strong> yapıyoruz.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider rounded-full transition-all shadow-sm"
              >
                <WhatsAppIcon size={14} />
                WhatsApp ile Tasarımı Başlat
              </a>
              <Link 
                to="/iletisim"
                className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 bg-primary hover:bg-secondary text-white font-black text-xs uppercase tracking-wider rounded-full transition-all shadow-sm"
              >
                Ücretsiz Teknik İnceleme İste &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Grafik Tasarım Fiyatları (Point 3 - Fiyat Tablosu & Yönlendirme) */}
        <div id="tasarim-fiyat-listesi" className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight text-center mb-3">
            Grafik Tasarım Fiyat Listeleri (2026 KDV Hariç)
          </h2>
          <p className="text-center text-gray-500 font-semibold text-sm mb-12 max-w-2xl mx-auto">
            Baskı öncesinde sürpriz maliyetler yaşamamanız için şeffaf, paket tabanlı ve net grafik tasarım fiyat listemiz.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-slate-900 text-white font-black uppercase text-xs tracking-wider">
                  <th className="p-4 text-left border border-slate-800">Hizmet &amp; Dosya Formatları</th>
                  <th className="p-4 text-center border border-slate-800">Seçenek &amp; Revizyon</th>
                  <th className="p-4 text-center border border-slate-800">Ortalama Süre</th>
                  <th className="p-4 text-right border border-slate-800">Ortalama Fiyat Aralığı</th>
                </tr>
              </thead>
              <tbody>
                {pricing.map((p, idx) => (
                  <tr key={idx} className={`hover:bg-primary/5 transition-colors text-xs font-semibold ${p.isBold ? 'font-black bg-slate-50/50 border-t-2 border-primary/20' : 'border-b border-gray-100'}`}>
                    {/* Hizmet & Dosyalar */}
                    <td className="p-4 text-left">
                      <div className="text-black font-extrabold text-sm mb-1">{p.service}</div>
                      <div className="text-gray-500 font-medium mb-2.5">{p.spec}</div>
                      
                      {/* Dosya Formatları Badgeleri */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Teslimat:</span>
                        {p.deliverables.split(", ").map((format, fIdx) => (
                          <span key={fIdx} className="bg-slate-100 text-slate-700 text-[9px] font-black px-1.5 py-0.5 rounded">
                            {format}
                          </span>
                        ))}
                      </div>

                      {p.printLinks && p.printLinks.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-dashed border-gray-100 flex flex-wrap items-center gap-1.5">
                          <span className="text-[9px] text-gray-400 font-bold">İlgili Matbaa Hizmeti:</span>
                          {p.printLinks.map((link, lIdx) => (
                            <Link
                              key={lIdx}
                              to={link.path}
                              className="inline-flex items-center gap-0.5 bg-primary/5 hover:bg-primary/15 text-primary text-[10px] font-black px-2 py-0.5 rounded-full transition-colors"
                            >
                              {link.name} &rarr;
                            </Link>
                          ))}
                        </div>
                      )}
                    </td>

                    {/* Alternatif & Revizyon */}
                    <td className="p-4 text-center">
                      <div className="text-black font-extrabold">{p.alternatives}</div>
                      <div className="text-emerald-600 font-bold text-[10px]">{p.revisions}</div>
                    </td>

                    {/* Süre */}
                    <td className="p-4 text-center text-gray-700 font-semibold">
                      {p.time}
                    </td>

                    {/* Fiyat & Üst Sınır Sebebi */}
                    <td className="p-4 text-right">
                      <div className="text-primary font-black text-sm mb-1">{p.price}</div>
                      <div className="mt-2">
                        <a 
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Merhaba, Mavi Basım web sitenizden ulaşıyorum. "${p.service}" grafik tasarım hizmetiniz hakkında sipariş oluşturmak/bilgi almak istiyorum.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-wide px-3 py-1.5 rounded-md shadow-xs transition-all cursor-pointer whitespace-nowrap"
                        >
                          <WhatsAppIcon size={12} /> Sipariş Oluştur
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Ortak Üst Limit Kriterleri Açıklama Alanı (Point 10) */}
          <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-5 md:p-6 text-left text-xs text-gray-600 shadow-3xs">
            <h4 className="font-extrabold text-xs text-black uppercase mb-3 flex items-center gap-1.5">
              Ortalama Fiyat Aralığı &amp; Üst Limit Belirleme Kriterleri
            </h4>
            <p className="font-semibold text-[11px] text-gray-500 leading-relaxed mb-4">
              Fiyat listemizde belirtilen aralıkların üst sınırları, işin teknik karmaşıklığı ve harcanacak ek mesai saatine göre belirlenir. Aşağıdaki kriterler tasarımların üst limite yaklaşmasına neden olur:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-[10px] md:text-[11px] font-semibold">
              <div className="bg-slate-50 p-4 rounded-xl border border-gray-150">
                <span className="text-primary font-black uppercase block mb-1.5">Logo &amp; Kimlik Tasarımları</span>
                Çok detaylı illüstrasyon, özel maskot karakter çizimleri, 3D görselleştirme talepleri veya kurumsal set paketine eklenecek ekstra materyal sayısının 5 kalemin üzerinde olması.
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-gray-150">
                <span className="text-indigo-600 font-black uppercase block mb-1.5">Ambalaj, Kutu &amp; Broşürler</span>
                Karmaşık pencereli, kilitli sistem iç kutu bıçak çizimleri, sıfırdan hassas kalıp çizimi, çoklu sayfa katlama mizanpajı (4 sayfadan fazla) ve yoğun infografik/ikon tasarımı.
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-gray-150">
                <span className="text-amber-600 font-black uppercase block mb-1.5">Çizim &amp; Düzenleme İşleri</span>
                Logonun aşırı amblem süslemesi barındırması, taranmış düşük çözünürlüklü bozuk görsellerin aslına uygun asistan çizimi veya ürün görsellerinin aşırı arka plan temizleme (dekupe) gerektirmesi.
              </div>
            </div>
          </div>

          {/* Özel Teklif Gerektiren İşler (Point 2 - Fiyat listesinden teklif almaya geçiş) */}
          <div className="mt-8 bg-amber-50/50 border border-amber-200/60 rounded-2xl p-6 md:p-8 text-left">
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-start">
              <div className="flex-1">
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-wider mb-3">
                  FİYAT LİSTESİ DIŞI ÖZEL TEKLİF
                </span>
                <h3 className="text-base md:text-lg font-black text-black uppercase tracking-tight mb-2">
                  Özel Teklif Gerektiren İşler &amp; Hızlı Fiyat Teklifi İsteme Rehberi
                </h3>
                <p className="text-xs text-gray-600 font-semibold leading-relaxed mb-6">
                  Grafik tasarım fiyat listesinde aradığınız özel ölçü, farklı adet veya kompleks ambalaj-kutu biçimlerini bulamadınız mı? Mavi Basım olarak kurumsal markalarımıza dakikalar içinde en uygun bütçe teklifini hazırlıyoruz.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-extrabold text-xs text-black uppercase mb-2">
                      Neden Teklif İsteyiniz?
                    </h4>
                    <ul className="space-y-1.5 text-[11px] text-gray-500 font-semibold list-disc pl-4 leading-normal">
                      <li><strong>Hacim İndirimi:</strong> Yüksek adetli baskı siparişlerinizde tasarım bedelini tamamen siliyoruz.</li>
                      <li><strong>Özel Kağıtlar:</strong> Fantezi mukavvalar, gofre kabartmalar için doğru kalıp maliyetlerini çıkarıyoruz.</li>
                      <li><strong>Toplu Kurumsal Setler:</strong> Tüm evraklarınızın toplu yenilenmesinde özel paket iskontoları uyguluyoruz.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-xs text-black uppercase mb-2">
                      Hangi Bilgiler Gereklidir?
                    </h4>
                    <ul className="space-y-1.5 text-[11px] text-gray-500 font-semibold list-disc pl-4 leading-normal">
                      <li><strong>Net Ölçü/Ebat:</strong> Tasarlanacak ya da basılacak ürünün açık/kapalı net boyutu.</li>
                      <li><strong>Kağıt &amp; Malzeme:</strong> Kraft, mat kuşe, dokulu fantezi karton veya şeffaf pvc vb. malzeme tercihiniz.</li>
                      <li><strong>Hedef Üretim Adedi:</strong> Baskı makinesinin ayarı ve fire optimizasyonu için talep ettiğiniz adet.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-xs text-black uppercase mb-2">
                      Ne Kadar Sürede Hazırlanır?
                    </h4>
                    <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                      Müşteri temsilcilerimiz ve Baskı Öncesi Kontrol ekibimiz, ilettiğiniz teknik bilgiler doğrultusunda resmi PDF teklifinizi <strong>en geç 15 ila 30 dakika</strong> içerisinde hazırlayıp WhatsApp veya e-posta ile tarafınıza ulaştırır.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-auto shrink-0 bg-white p-5 rounded-xl border border-amber-200 shadow-3xs flex flex-col items-center justify-center text-center lg:self-stretch">
                <span className="font-black text-xs text-black uppercase tracking-wider">HIZLI TEKLİF HATTI</span>
                <span className="text-[10px] text-emerald-600 font-bold mb-4">Müşteri Temsilcisi Çevrimiçi</span>
                
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-widest rounded-lg shadow-sm transition-all inline-flex items-center justify-center gap-1.5 mb-2 hover:scale-102"
                >
                  <WhatsAppIcon size={14} /> WhatsApp'la Teklif Al
                </a>
                <Link 
                  to="/iletisim"
                  className="w-full px-5 py-3 bg-primary text-white hover:bg-secondary font-black text-xs uppercase tracking-widest rounded-lg shadow-sm transition-all inline-flex items-center justify-center text-center hover:scale-102"
                >
                  Teklif İstek Formu
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-4 bg-white/50 px-5 py-3 border border-gray-200 rounded-xl flex flex-col sm:flex-row justify-center items-center text-xs text-slate-500 font-medium font-sans">
            <span>* Tabloda belirtilen tasarım fiyatlarımıza %20 KDV dahil değildir. Tasarım + baskı entegrasyonlu siparişlerde tasarım ücretinde %50 indirim yapılır.</span>
          </div>
          <div className="mt-4">
            <FireWarning />
          </div>

          {/* Sipariş Senaryoları Karşılaştırma Tablosu (Point - Senaryo Karşılaştırması) */}
          <div className="mt-12 bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
            <h3 className="text-xl font-black text-black uppercase tracking-tight text-center mb-2">
              Hangi Senaryo Sizin İçin Uygun?
            </h3>
            <p className="text-center text-gray-500 font-semibold text-xs mb-8 max-w-xl mx-auto">
              Sadece tasarım, hazır tasarımınızın baskısı veya anahtar teslim "tasarım + baskı" hizmetlerimizin farklarını karşılaştırın.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs font-semibold text-gray-700">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 uppercase tracking-wider">
                    <th className="p-4 text-left border border-gray-200">Karşılaştırma Kriteri</th>
                    <th className="p-4 text-center border border-gray-200 bg-blue-50/50 text-blue-900">Sadece Tasarım</th>
                    <th className="p-4 text-center border border-gray-200 bg-amber-50/50 text-amber-900">Sadece Baskı</th>
                    <th className="p-4 text-center border border-gray-200 bg-primary/10 text-primary-dark font-black">
                      Tasarım + Baskı Entegre
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-slate-50 transition-all">
                    <td className="p-4 border border-gray-200 text-black font-extrabold">Tasarım Maliyeti</td>
                    <td className="p-4 border border-gray-200 text-center bg-blue-50/20">Standart Liste Fiyatı</td>
                    <td className="p-4 border border-gray-200 text-center bg-amber-50/20">Tasarım Maliyeti Yok</td>
                    <td className="p-4 border border-gray-200 text-center bg-primary/5 text-primary font-black">
                      %50 İndirimli Tasarım
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-all">
                    <td className="p-4 border border-gray-200 text-black font-extrabold">Baskı Uyumluluğu</td>
                    <td className="p-4 border border-gray-200 text-center bg-blue-50/20">Milimetrik baskıya hazır teslim edilir</td>
                    <td className="p-4 border border-gray-200 text-center bg-amber-50/20">Sorumluluk müşterinin dosyasına aittir</td>
                    <td className="p-4 border border-gray-200 text-center bg-primary/5 text-emerald-600 font-black">
                      %100 Kusursuz Baskı Garantisi
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-all">
                    <td className="p-4 border border-gray-200 text-black font-extrabold">Dosya ve Hak Teslimi</td>
                    <td className="p-4 border border-gray-200 text-center bg-blue-50/20">Katmanlı Vektörel (.AI, .PDF, .SVG)</td>
                    <td className="p-4 border border-gray-200 text-center bg-amber-50/20">Müşterinin mevcut dosyası kullanılır</td>
                    <td className="p-4 border border-gray-200 text-center bg-primary/5">
                      Katmanlı Vektörel + Kalıcı Arşivleme
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-all">
                    <td className="p-4 border border-gray-200 text-black font-extrabold">Baskı Öncesi Prova</td>
                    <td className="p-4 border border-gray-200 text-center bg-blue-50/20">Sadece dijital ekran yerleşimi</td>
                    <td className="p-4 border border-gray-200 text-center bg-amber-50/20">Standart teknik dosya kontrolü</td>
                    <td className="p-4 border border-gray-200 text-center bg-primary/5 text-primary font-black">
                      Yazılı Onaylı PDF Prova ve Kağıt Danışmanlığı
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-all">
                    <td className="p-4 border border-gray-200 text-black font-extrabold">Kargo &amp; Teslimat</td>
                    <td className="p-4 border border-gray-200 text-center bg-blue-50/20">Bulut / E-posta ile anında teslim</td>
                    <td className="p-4 border border-gray-200 text-center bg-amber-50/20">Alıcı ödemeli standart kargo</td>
                    <td className="p-4 border border-gray-200 text-center bg-primary/5 text-emerald-600 font-black">
                      Hasar Güvenceli &amp; İndirimli/Ücretsiz Kargo
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                TAVSİYEMİZ: Tasarımı ve baskıyı tek elden yöneterek hem zamandan tasarruf edin hem de sürpriz baskı hatalarını sıfırlayın.
              </span>
            </div>

            {/* Karar Sonrası İşlem Başlatma ve Sipariş Hunisi Kartları (Point 3) */}
            <div className="mt-8 border-t border-dashed border-gray-200 pt-8">
              <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-widest text-center mb-6">
                Seçiminize Göre Süreci Başlatın
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {/* Seçenek 1: Sadece Tasarım */}
                <div className="bg-blue-50/40 border border-blue-100 rounded-2xl p-5 flex flex-col justify-between hover:shadow-xs transition-shadow">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">1</span>
                      <h5 className="font-black text-xs text-slate-900 uppercase">Sadece Tasarım İhtiyacı</h5>
                    </div>
                    <p className="text-[11px] text-gray-500 font-semibold leading-relaxed mb-4 text-left">
                      Sadece profesyonel dijital taslakları alıp gelecekte basmak veya tescil ettirmek istiyorsanız, şeffaf fiyat paketlerimizi inceleyin.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <button 
                      onClick={() => {
                        const el = document.getElementById('tasarim-fiyat-listesi');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-[10px] uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                    >
                      Tasarım Fiyat Listesi &rarr;
                    </button>
                    <Link 
                      to="/iletisim"
                      className="w-full text-center block py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-extrabold text-[10px] uppercase rounded-xl transition-colors"
                    >
                      Teklif İstek Formu
                    </Link>
                  </div>
                </div>

                {/* Seçenek 2: Sadece Baskı */}
                <div className="bg-amber-50/40 border border-amber-100 rounded-2xl p-5 flex flex-col justify-between hover:shadow-xs transition-shadow">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">2</span>
                      <h5 className="font-black text-xs text-slate-900 uppercase">Hazır Tasarımla Baskı</h5>
                    </div>
                    <p className="text-[11px] text-gray-500 font-semibold leading-relaxed mb-4 text-left">
                      Elinizde hazır taslaklarınız varsa, ücretsiz Baskı Öncesi Kontrolü eşliğinde matbaa ürünlerimizin fiyatlarını inceleyin.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Link 
                      to="/matbaa"
                      className="w-full text-center block py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-black text-[10px] uppercase tracking-wider rounded-xl transition-colors"
                    >
                      Matbaa Ürünlerini Gör &rarr;
                    </Link>
                    <a 
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center block py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-extrabold text-[10px] uppercase rounded-xl transition-colors cursor-pointer"
                    >
                      Hazır Dosyamı İlet &rarr;
                    </a>
                  </div>
                </div>

                {/* Seçenek 3: Tasarım + Baskı (Tavsiye Edilen) */}
                <div className="bg-emerald-50/50 border-2 border-emerald-500/30 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white font-black text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-bl-xl">
                    Popüler &amp; Tasarruflu
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">3</span>
                      <h5 className="font-black text-xs text-slate-900 uppercase">Tasarım + Baskı Entegre</h5>
                    </div>
                    <p className="text-[11px] text-gray-500 font-semibold leading-relaxed mb-4 text-left">
                      Tasarımı ve baskıyı tek elden yönetelim, tasarım bedelinde anında net %50 indirim ve %100 baskı uyum garantisinden faydalanın.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <a 
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center block py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                    >
                      %50 İndirimli Sipariş Başlat
                    </a>
                    <Link 
                      to="/iletisim"
                      className="w-full text-center block py-2 bg-white hover:bg-emerald-50/50 text-emerald-800 border border-emerald-200 font-black text-[10px] uppercase rounded-xl transition-colors"
                    >
                      Birlikte Teklif Alalım
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Neden Mavi Basım Grafik & Baskı Merkezini Seçmelisiniz? (Birleştirilmiş Güven Bölümü & Point 2 - Revizyon Sınırları) */}
        <div className="max-w-4xl mx-auto mb-16 bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-xs">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight text-center mb-10">
            Neden Mavi Basım Grafik &amp; Baskı Merkezini Seçmelisiniz?
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                <Check className="w-4 h-4" strokeWidth={3} />
              </div>
              <div>
                <h4 className="font-extrabold text-black uppercase text-sm mb-1">Net ve Şeffaf Revizyon Sınırları (Sürpriz Yok!)</h4>
                <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                  İşinizin büyüklüğüne göre net sınırlar belirliyoruz: Kartvizit, broşür, etiket vb. tekil tasarımlarda <strong>3 adet ücretsiz revizyon</strong>; Logo ve Kurumsal Kimlik Paketlerimizde ise <strong>5 adet ücretsiz revizyon</strong> hakkınız mevcuttur. Revizyon süresince renk, font ve metin yerleşim değişiklikleri tamamen ücretsizdir. Nihai onay verilip iş teslim edildikten veya köklü konsept değişiklikleri istendikten sonra ücretli revizyon süreci başlar ve cüzi bir miktar faturanıza yansıtılır.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                <Check className="w-4 h-4" strokeWidth={3} />
              </div>
              <div>
                <h4 className="font-extrabold text-black uppercase text-sm mb-1">Hasar Güvenceli Hızlı Kargo</h4>
                <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                  İstanbul dışındaki tüm illere korunaklı ambalajlarda kargo gönderimi sağlıyoruz. Taşıma sırasında oluşabilecek her türlü yırtılma, ezilme veya kaybolma gibi durumlarda kargo tutanağı ile birlikte işinizi <strong>ücretsiz olarak anında yeniden basıp gönderiyoruz</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TEKNİK UZMANLIK VE REHBER BÖLÜMÜ (Point 1, 3, 5, 8 Çözümleri) */}
        <div id="teknik-uzmanlik" className="mt-20 border-t border-gray-100 pt-16">
          {/* 1. Geçiş Köprüsü (Point 1) */}
          <div className="text-center max-w-3xl mx-auto mb-12 px-4">
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider">
              <Info size={12} /> Tasarım Masasından Baskı Makinesine: Kusursuz Entegrasyon
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tight mt-4 mb-3">
              Dosyanızın Baskıda Hatasız Çıkması İçin Teknik Detaylar
            </h2>
            <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed">
              Çoğu grafik ajansı tasarımları sadece ekranda göründüğü haliyle hazırlar; bu durum matbaada kesim kaymalarına, renklerin soluk çıkmasına veya katlama noktalarında yırtılmalara yol açar. Mavi Basım'ın <strong>tasarım ekibi</strong>, doğrudan merkez matbaa parkurumuzdaki makinelerle yan yana çalışır. Tasarım esnasında lak kalıpları, gofre (kabartma) klişeleri, kırım bıçak izleri ve CMYK renk geçişleri son derece hassas hesaplanarak sisteme işlenir. Böylece ekranda onayladığınız dijital provanın birebir aynısı baskıda karşınıza çıkar.
            </p>
          </div>

          {/* 3. Karşılaştırmalı Teknik Şemalar & Görseller (Point 3) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 px-4">
            {/* Şema A: RGB vs CMYK */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full mb-4 inline-block">
                  A. Renk Dünyası (RGB vs CMYK)
                </span>
                <h4 className="font-extrabold text-black uppercase text-sm mb-3">
                  Ekran Işığı ile Gerçek Mürekkep Farkı
                </h4>
                
                {/* RGB vs CMYK Visual Simulation */}
                <div className="bg-slate-900 rounded-2xl p-4 my-4 flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* RGB Screen View */}
                    <div className="bg-slate-800 rounded-xl p-3 border border-slate-700 text-center relative overflow-hidden">
                      <span className="text-[9px] font-black text-blue-400 uppercase tracking-wider block mb-2">RGB (EKRAN - IŞIK)</span>
                      <div className="relative w-24 h-20 mx-auto flex items-center justify-center">
                        <div className="absolute w-12 h-12 rounded-full bg-[#FF0000] mix-blend-screen opacity-90 -translate-x-3 -translate-y-2 blur-[1px]"></div>
                        <div className="absolute w-12 h-12 rounded-full bg-[#00FF00] mix-blend-screen opacity-90 translate-x-3 -translate-y-2 blur-[1px]"></div>
                        <div className="absolute w-12 h-12 rounded-full bg-[#0000FF] mix-blend-screen opacity-90 translate-y-3 blur-[1px]"></div>
                        <span className="relative z-10 text-[9px] font-black text-white bg-black/60 px-1 rounded">Canlı & Parlak</span>
                      </div>
                    </div>

                    {/* CMYK Ink View */}
                    <div className="bg-slate-800 rounded-xl p-3 border border-slate-700 text-center relative overflow-hidden">
                      <span className="text-[9px] font-black text-amber-400 uppercase tracking-wider block mb-2">CMYK (KAĞIT - MÜREKKEP)</span>
                      <div className="relative w-24 h-20 mx-auto flex items-center justify-center">
                        <div className="absolute w-12 h-12 rounded-full bg-[#00FFFF] mix-blend-multiply opacity-80 -translate-x-3 -translate-y-2"></div>
                        <div className="absolute w-12 h-12 rounded-full bg-[#FF00FF] mix-blend-multiply opacity-80 translate-x-3 -translate-y-2"></div>
                        <div className="absolute w-12 h-12 rounded-full bg-[#FFFF00] mix-blend-multiply opacity-80 translate-y-3"></div>
                        <div className="absolute w-10 h-10 rounded-full bg-[#000000] mix-blend-multiply opacity-50 translate-x-1 translate-y-1"></div>
                        <span className="relative z-10 text-[9px] font-black text-white bg-black/60 px-1 rounded">Gerçekçi Tonlar</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-[10px] text-gray-400 font-semibold leading-normal">
                    Ekranlar RGB (kırmızı-yeşil-mavi ışık) ile çalışırken, kağıtlar CMYK (camgöbeği-macenta-sarı-siyah mürekkep) ile boyanır.
                  </div>
                </div>

                <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                  Renklerin basılı üründe soluk veya farklı görünmesini engelliyor, ekranda gördüğünüz tonları kâğıda aynen yansıtıyoruz.
                </p>
              </div>
            </div>

            {/* Şema B: Taşırma ve Kesim Payı */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full mb-4 inline-block">
                  B. Kesim Payı &amp; Taşırma (Bleed)
                </span>
                <h4 className="font-extrabold text-black uppercase text-sm mb-3">
                  Giyotin Kaymalarına Karşı Milimetrik Koruma
                </h4>

                {/* Bleed Diagram Visual Simulation */}
                <div className="bg-slate-50 rounded-2xl p-4 my-4 border border-gray-100">
                  <div className="relative w-full h-32 bg-white border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center overflow-hidden">
                    {/* Bleed limit - Red line */}
                    <div className="absolute inset-1 border border-red-500/80"></div>
                    {/* Cutting limit - Black line */}
                    <div className="absolute inset-3 border border-black/60 border-dashed"></div>
                    {/* Safe area limit - Green line */}
                    <div className="absolute inset-5 border border-emerald-500/50"></div>
                    
                    {/* Text placement inside safe area */}
                    <div className="z-10 text-center">
                      <p className="text-[10px] font-black text-black">Mavi Basım Tasarım</p>
                      <p className="text-[8px] font-bold text-gray-400">GÜVENLİ ALAN İÇİNDE</p>
                    </div>

                    {/* Annotations */}
                    <span className="absolute top-1 right-2 text-[7px] font-black text-red-600 uppercase bg-white px-1 shadow-xs border border-red-100">3mm Taşırma Sınırı</span>
                    <span className="absolute bottom-1 left-2 text-[7px] font-black text-emerald-600 uppercase bg-white px-1 shadow-xs border border-emerald-100">Güvenli Bölge</span>
                    <span className="absolute top-1/2 left-1 -translate-y-1/2 flex items-center gap-0.5 text-[7px] font-black text-black uppercase bg-white px-1 shadow-xs border">
                      <Scissors size={8} /> Kesim Çizgisi
                    </span>
                  </div>
                  <div className="text-center text-[10px] text-gray-400 font-semibold leading-normal mt-2">
                    Giyotin kesimi esnasında oluşabilecek 1-2mm'lik kaymalarda kenarda beyaz boşluk veya içerik kesilmesi yaşanmaz.
                  </div>
                </div>

                <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                  Milimetrik kesim payları sayesinde önemli bilgilerin ve yazıların kesilmesini veya kenarlarda beyaz boşluklar kalmasını önlüyoruz.
                </p>
              </div>
            </div>

            {/* Şema C: Kırım ve Katlama */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full mb-4 inline-block">
                  C. Mizanpaj &amp; Katlama Payları
                </span>
                <h4 className="font-extrabold text-black uppercase text-sm mb-3">
                  Kırımlı Broşürlerde Panel Genişlik Dengesi
                </h4>

                {/* Fold Line Diagram Visual Simulation */}
                <div className="bg-slate-50 rounded-2xl p-4 my-4 border border-gray-100">
                  <div className="relative w-full h-32 flex items-stretch border border-gray-200 bg-white rounded-lg p-2 gap-1.5">
                    {/* Left Panel - narrower (97mm) */}
                    <div className="w-[30%] bg-blue-50/40 border border-blue-200 rounded-sm relative flex flex-col items-center justify-center p-1 text-center">
                      <span className="text-[8px] font-black text-blue-700">İÇ KAT</span>
                      <span className="text-[7px] font-semibold text-gray-500">97 mm</span>
                      <span className="text-[6px] font-bold text-gray-400 leading-none">İçe katlanan dar panel</span>
                    </div>

                    {/* Fold Line 1 */}
                    <div className="w-[1px] border-r border-dashed border-red-500 relative">
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[6px] font-black text-red-500 bg-white border border-red-100 px-0.5 whitespace-nowrap">Kırım</span>
                    </div>

                    {/* Middle Panel - standard (100mm) */}
                    <div className="w-[33%] bg-gray-50 border border-gray-200 rounded-sm relative flex flex-col items-center justify-center p-1 text-center">
                      <span className="text-[8px] font-black text-gray-700">ARKA</span>
                      <span className="text-[7px] font-semibold text-gray-500">100 mm</span>
                      <span className="text-[6px] font-bold text-gray-400 leading-none">Standart genişlik</span>
                    </div>

                    {/* Fold Line 2 */}
                    <div className="w-[1px] border-r border-dashed border-red-500 relative">
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[6px] font-black text-red-500 bg-white border border-red-100 px-0.5 whitespace-nowrap">Kırım</span>
                    </div>

                    {/* Right Panel - standard (100mm) */}
                    <div className="w-[33%] bg-gray-50 border border-gray-200 rounded-sm relative flex flex-col items-center justify-center p-1 text-center">
                      <span className="text-[8px] font-black text-gray-700">ÖN KAPAK</span>
                      <span className="text-[7px] font-semibold text-gray-500">100 mm</span>
                      <span className="text-[6px] font-bold text-gray-400 leading-none">Ana kapak paneli</span>
                    </div>
                  </div>
                  <div className="text-center text-[10px] text-gray-400 font-semibold leading-normal mt-2">
                    Kırımlı işlerde içe katlanan en iç kapağın dış kapağa takılmaması için 2-3mm daha dar çizilmesi kritik önem taşır.
                  </div>
                </div>

                <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                  Broşürlerinizin katlama yerlerinden tam ve düzgün bir şekilde katlanmasını sağlayarak yırtılma veya sığmama gibi görsel hataları engelliyoruz.
                </p>
              </div>
            </div>
          </div>

          {/* ARA CTA-1: Üretim Mühendisliği ve Şemalar Sonrası */}
          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 text-left max-w-4xl mx-auto mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left sm:max-w-xl">
              <h4 className="font-extrabold text-sm text-black uppercase mb-1">
                📐 Çiziminiz Baskı Kurallarına Uygun mu?
              </h4>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Elinizdeki mevcut dosyaları ücretsiz olarak ön incelemeye tabi tutalım. Giyotin kayması veya renk solması risklerini sıfıra indirin.
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end">
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider rounded-full shadow-md transition-all inline-flex items-center justify-center gap-1.5"
              >
                <WhatsAppIcon size={14} /> Dosya Analizi Yaptır
              </a>
            </div>
          </div>

          {/* 8. Kısaltılmış Teknik İçerik (Point 8 - Yoğunlaştırılmış, Kısaltılmış ve Tekrarsız) */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 mb-12 max-w-5xl mx-auto px-6">
            <div className="prose prose-invert max-w-none">
              <h3 className="text-lg md:text-xl font-extrabold uppercase tracking-wider text-[#00E5FF] mb-6 border-b border-white/10 pb-4">
                Baskı Öncesi Teknik Kontrol Süreçlerimiz
              </h3>
              <p className="text-xs md:text-sm text-gray-300 font-semibold leading-relaxed">
                Mavi Basım olarak, tasarımınızın fiziksel ürüne sıfır hata ile aktarılması için tüm Baskı Öncesi Teknik Kontrol süreçlerini titizlikle yürütüyoruz. Bu kapsamda; mürekkep yoğunluğu limitleri, lak katmanları, gofre katmanları, çakışma hataları ve kâğıt su yönü tayini gibi tüm teknik üretim terminolojisi gereksinimlerini tek bir süreçte kontrol ederek, ekranda beğenip onay verdiğiniz tasarımın basılı kâğıtta hiçbir kayma veya renk kaybı olmadan birebir canlı çıkmasını sağlıyoruz.
              </p>
              
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-6">
                <div className="text-left">
                  <span className="text-[#00E5FF] text-[9px] font-black uppercase tracking-wider block mb-0.5">ÜCRETSİZ TEKNİK DESTEK</span>
                  <p className="text-[11px] text-slate-300 font-bold leading-normal mb-4">
                    Tasarım dosyanızın baskı standartlarına uygunluğundan emin değil misiniz? Uzman teknik kontrol ekibimiz dosyanızı tamamen ücretsiz analiz etsin.
                  </p>
                  
                  {/* Örnek Hata Raporu Bölümü (Point 7) */}
                  <div className="bg-slate-950/80 rounded-2xl border border-white/10 p-4 md:p-5 font-mono text-[10px] md:text-xs text-slate-300 shadow-inner">
                    <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-3">
                      <span className="text-[#00E5FF] font-black uppercase text-[9px] md:text-[10px] tracking-wider flex items-center gap-1.5">
                        ÖRNEK TEKNİK KONTROL RAPORU
                      </span>
                      <span className="text-slate-500 text-[8px] md:text-[9px] font-bold">RAPOR ID: #2026-PP9</span>
                    </div>
                    
                    <div className="space-y-2.5">
                      {/* Item 1 */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/5 pb-2">
                        <span className="font-bold text-slate-200">1. Renk Uzayı Uyumluluğu</span>
                        <div className="flex items-center gap-2">
                          <span className="bg-red-950/50 text-red-400 border border-red-900/50 px-2 py-0.5 rounded text-[8px] md:text-[9px] font-black uppercase tracking-wider">
                            HATA (RGB TESPİT EDİLDİ)
                          </span>
                          <span className="text-slate-400 font-semibold text-[9px] md:text-[10px] hidden sm:inline">CMYK yapılmalı, yoksa %15 renk sapması oluşabilir.</span>
                        </div>
                        <p className="text-slate-400 font-semibold text-[9px] block sm:hidden">CMYK yapılmalı, yoksa %15 renk sapması oluşabilir.</p>
                      </div>

                      {/* Item 2 */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/5 pb-2">
                        <span className="font-bold text-slate-200">2. Taşırma &amp; Kesim Payları</span>
                        <div className="flex items-center gap-2">
                          <span className="bg-amber-950/50 text-amber-400 border border-amber-900/50 px-2 py-0.5 rounded text-[8px] md:text-[9px] font-black uppercase tracking-wider">
                            UYARI (EKSİK PAY)
                          </span>
                          <span className="text-slate-400 font-semibold text-[9px] md:text-[10px] hidden sm:inline">Kenar payları 3mm taşırmaya göre büyütülmeli.</span>
                        </div>
                        <p className="text-slate-400 font-semibold text-[9px] block sm:hidden">Kenar payları 3mm taşırmaya göre büyütülmeli.</p>
                      </div>

                      {/* Item 3 */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/5 pb-2">
                        <span className="font-bold text-slate-200">3. Vektörel Çizim &amp; Yazı Tipi Convert</span>
                        <div className="flex items-center gap-2">
                          <span className="bg-emerald-950/50 text-emerald-400 border border-emerald-900/50 px-2 py-0.5 rounded text-[8px] md:text-[9px] font-black uppercase tracking-wider">
                            BAŞARILI (CONVERT OK)
                          </span>
                          <span className="text-slate-400 font-semibold text-[9px] md:text-[10px] hidden sm:inline">Tüm yazılar eğriye (convert) dönüştürülmüş, font hatası riski yok.</span>
                        </div>
                        <p className="text-slate-400 font-semibold text-[9px] block sm:hidden">Tüm yazılar eğriye (convert) dönüştürülmüş, font hatası riski yok.</p>
                      </div>

                      {/* Item 4 */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="font-bold text-slate-200">4. Metin Güvenli Bölgesi</span>
                        <div className="flex items-center gap-2">
                          <span className="bg-red-950/50 text-red-400 border border-red-900/50 px-2 py-0.5 rounded text-[8px] md:text-[9px] font-black uppercase tracking-wider">
                            KRİTİK HATA (ÇOK YAKIN)
                          </span>
                          <span className="text-slate-400 font-semibold text-[9px] md:text-[10px] hidden sm:inline">Logolar ve yazılar kesim çizgisine 1.5mm yakın; min 3mm'ye çekilmeli!</span>
                        </div>
                        <p className="text-slate-400 font-semibold text-[9px] block sm:hidden">Logolar ve yazılar kesim çizgisine 1.5mm yakın; min 3mm'ye çekilmeli!</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center mt-2">
                  <a 
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Merhaba, elimde hazır bir tasarım var. Baskı Öncesi Teknik Kontrol standartlarına uygun olup olmadığını incelemenizi istiyorum.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-widest rounded-lg transition-all inline-flex items-center justify-center gap-1.5 shrink-0 hover:scale-105 cursor-pointer"
                  >
                    <WhatsAppIcon size={14} /> Ücretsiz Teknik Kontrol İste
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bu Teknik Hassasiyetlerin Size Kazandırdıkları (Müşteri Ne Kazanır? - Point 5) */}
          <div className="bg-[#f8fafc] rounded-3xl p-8 md:p-12 mb-12 max-w-5xl mx-auto border border-gray-100 shadow-xs">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider">
                SONUÇ ODAKLI ÇÖZÜM
              </span>
              <h3 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight mt-3 mb-2">
                Bu Teknik Hassasiyetlerin Size Kazandırdıkları (Müşteri Ne Kazanır?)
              </h3>
              <p className="text-xs text-gray-500 font-bold">
                Baskı öncesi teknik kontrol mühendisliğimiz sayesinde sadece çizim değil, başarılı bir yatırım sonucu elde edersiniz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5" strokeWidth={3} />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-black uppercase mb-1">Sıfır Hatalı Baskı &amp; Bütçe Güvencesi</h4>
                  <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                    Kesim kaymaları, mürekkep patlamaları veya lif çatlamaları yüzünden basılan binlerce adet ürünün çöpe gitmesini önlüyor, bütçenizi tam koruyoruz.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5" strokeWidth={3} />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-black uppercase mb-1">Maksimum Zaman Tasarrufu</h4>
                  <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                    Tasarım bittiğinde doğrudan makine kalıbına uygun formatta olduğu için teknik kontrol ekibimizde ekstra bekleme yapmadan aynı gün baskı hattına girmesini sağlıyoruz.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5" strokeWidth={3} />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-black uppercase mb-1">Gerçek Renk Tonları (WYSIWYG)</h4>
                  <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                    Ekranınızda ya da dijital provada beğenip onay verdiğiniz renklerin, basılı kağıtta soluklaşmadan tam da hayal ettiğiniz canlılıkta çıkmasını garanti ediyoruz.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5" strokeWidth={3} />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-black uppercase mb-1">Kurumsal Saygınlık ve Sektörel Liderlik</h4>
                  <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                    Hassas şekilde katlanan broşürler, net kesilen lüks kartvizitler ve özel lak detaylarıyla piyasada yüksek prestij ve kurumsal imaj elde edersiniz.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Birleştirilmiş Tasarım + Baskı Siparişi & Teknik Güvence CTA Bloğu */}
          <div className="bg-gradient-to-br from-[#020617] to-[#0f172a] rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-slate-800 shadow-2xl relative overflow-hidden mb-12">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl" />
            
            <span className="text-[#00E5FF] text-[10px] font-black uppercase tracking-widest block mb-2">EN POPÜLER AVANTAJ: TASARIM + BASKI KOMBİNİ</span>
            <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tight mb-4">
              Tasarım + Baskı Siparişiyle Bütçenizi Koruyun!
            </h3>
            <p className="text-xs md:text-sm text-slate-300 font-semibold leading-relaxed max-w-2xl mx-auto mb-8">
              Tasarım ve matbaa baskısını tek elden sipariş edin, grafik tasarım ücretinde <strong className="text-[#00E5FF] font-black">tam %50 net indirim</strong> kazanın. Mevcut taslaklarınızı düzenlemek, sıfırdan kurumsal kimlik oluşturmak veya baskıya tam uyumlu şekilde üretime sokmak için teknik detaylarla uğraşmayın; uzman ekibimiz her adımda size kılavuzluk edecektir.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-lg transition-all inline-flex items-center justify-center gap-2 hover:scale-105"
              >
                <WhatsAppIcon size={16} />
                WhatsApp ile %50 İndirimli Başlat
              </a>
              <Link 
                to="/iletisim"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-black text-xs uppercase tracking-widest rounded-full shadow-lg transition-all inline-flex items-center justify-center gap-2"
              >
                Bizimle İletişime Geçin
              </Link>
            </div>
          </div>
        </div>

        {/* Satın Alma Kararını Hızlandıracak Bilgiler (Point 15) */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16 mt-16">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight text-center mb-3">
            Siparişi Hızlandıran Sık Sorulan Pratik Bilgiler
          </h2>
          <p className="text-center text-gray-500 font-semibold text-sm mb-12 max-w-2xl mx-auto">
            Grafik tasarım ve üretim koordinasyonumuz hakkında karar verme sürecinizi hızlandıracak pratik detaylar.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
              <h4 className="font-black text-sm text-black uppercase mb-2">
                Acil Tasarım Hizmeti Var mı?
              </h4>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Evet! Çok acil ve kısıtlı zamanı olan markalarımız için 'Ekspres Tasarım' desteğimiz bulunur. Taslaklarınızı 24 saat gibi kısa bir sürede tamamlayıp onayınıza sunarak süreci maksimum düzeyde hızlandırıyoruz.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
              <h4 className="font-black text-sm text-black uppercase mb-2">
                Aynı Gün Teslimat Mümkün mü?
              </h4>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Tasarım onayı ve ödemesi saat 12:00'den önce tamamlanan standart kartvizit, broşür, afiş gibi dijital baskı işleriniz aynı gün veya ertesi gün kargoya verilmektedir. Ofset ve laklı lüks imalatlar ise genellikle 2-3 iş günüdür.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
              <h4 className="font-black text-sm text-black uppercase mb-2">
                Baskı ile Birlikte Sipariş Avantajı
              </h4>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Tasarımını bizim yaptığımız işin baskısını da matbaamızda üstlendiğimizde, tasarım bedeli üzerinden <strong>%50 net indirim</strong> hakkı kazanırsınız. Tasarım dosyalarının teknik kontrolleri de matbaa ustalarımızla doğrudan yapıldığı için sıfır teknik hata garantisi elde edersiniz.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
              <h4 className="font-black text-sm text-black uppercase mb-2">
                Onaydan Sonra Baskıya Geçiş Süresi
              </h4>
              <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                Tasarım onay provasını WhatsApp veya e-posta üzerinden yazılı olarak verdiğiniz andan itibaren, çalışmanız otomatik olarak merkezi üretim tesisimizin baskı hattına aktarılır. Ekstra bir onay süreci veya dosya düzeltme beklemesi yaşanmaz.
              </p>
            </div>
          </div>
        </div>

        {/* İç Bağlantılar Bölümü (Point 9) */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16 border border-gray-100">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight text-center mb-3">
            Doğrudan Tasarım Hizmeti Alabileceğiniz Matbaa Ürünlerimiz
          </h2>
          <p className="text-center text-gray-500 font-semibold text-sm mb-12 max-w-2xl mx-auto">
            Hizmet verdiğimiz tüm matbaa ürün gruplarının detaylı şeffaf adet/fiyat listelerini aşağıdaki bağlantılardan anında inceleyebilirsiniz.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {internalLinks.map((link, index) => (
              <Link 
                key={index} 
                to={link.path}
                className="bg-white hover:bg-primary/5 border border-gray-100 hover:border-primary/20 p-4 rounded-2xl shadow-xs hover:shadow-sm transition-all text-center flex flex-col items-center justify-center gap-2 group"
              >
                <span className="text-xs font-bold text-black uppercase tracking-tight group-hover:text-primary transition-colors">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* SSS / FAQ Bölümü (Point 12, Point 14) */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight text-center mb-3">
            Sıkça Sorulan Sorular (Grafik Tasarım)
          </h2>
          <p className="text-center text-gray-500 font-semibold text-sm mb-12 max-w-2xl mx-auto">
            Grafik tasarım departmanımız ve iş süreçlerimiz hakkında en çok merak edilen soruların teknik yanıtları.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="h-full border border-gray-200 rounded-2xl bg-white shadow-xs p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-black text-black text-sm md:text-base mb-2.5 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-2" />
                    <span>{faq.q}</span>
                  </h3>
                  <div className="h-px bg-gray-100 my-2.5 w-full" />
                  <div className="text-xs md:text-sm text-gray-600 font-semibold leading-relaxed flex flex-col gap-3">
                    <p>{faq.a}</p>
                    {faq.linkPath && (
                      <div className="pt-2.5 border-t border-gray-100 flex justify-start">
                        <Link 
                          to={faq.linkPath} 
                          className="text-xs font-black text-primary hover:text-secondary flex items-center gap-1.5 transition-colors"
                        >
                          {faq.linkLabel} &rarr;
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ProductSEOSection categoryKey="grafik_tasarim" />
    </div>
  );
};

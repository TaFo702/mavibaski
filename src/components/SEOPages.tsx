import React, { useMemo, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  CheckCircle, 
  HelpCircle, 
  ArrowRight, 
  PhoneCall, 
  Award, 
  FileText, 
  ShieldCheck, 
  Briefcase, 
  Clock, 
  Truck,
  Utensils,
  Home as HomeIcon,
  Coffee,
  PlusCircle,
  Sprout,
  MapPin,
  Layers,
  Tag,
  Scissors,
  Image as ImageIcon,
  Sparkles,
  ShoppingBag,
  GraduationCap
} from 'lucide-react';
import { PHONE_NUMBER, WHATSAPP_LINK } from '../constants/contact';
import { SEO_PAGES_DATA, SEOPageData } from '../data/seoPagesData';
import { SECTOR_IMAGE_MANIFEST } from '../generated/sectorImageManifest';

export { SEO_PAGES_DATA };
export type { SEOPageData };

// Sektörel Semantic Hub / Cluster Veritabanı
const CLUSTERS: Record<string, {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  parentPath: string;
  siblings: { path: string; text: string }[];
  popularPrints: { path: string; text: string; spec: string; tag?: string; cta?: string }[];
}> = {
  RESTORAN: {
    name: "Broşür Baskı",
    icon: Utensils,
    parentPath: "/brosur",
    siblings: [
      { path: "/brosur", text: "Broşür Baskı Çözümleri" },
      { path: "/magnet", text: "Paket Servis Magneti" },
      { path: "/amerikan-servis", text: "Amerikan Servis Baskısı" },
      { path: "/kataloglar", text: "Restoran Menü Baskısı" },
      { path: "/karton-canta", text: "Paket Servis Karton Çantası" },
      { path: "/makbuz-ve-formlar", text: "Restoran Sipariş Fişi" }
    ],
    popularPrints: [
      { path: "/brosur", text: "Restoran Broşürü", spec: "115 gr veya 130 gr kuşe kâğıt, tek veya çok kırımlı katlama seçenekleri", tag: "Katlamalı Broşür", cta: "Broşür Fiyatlarını İncele" },
      { path: "/magnet", text: "Paket Servis Magneti", spec: "0,50 mm mıknatıs, mat veya parlak selefon kaplamalı", tag: "0,50 mm Magnet", cta: "Magnet Fiyatlarını İncele" },
      { path: "/amerikan-servis", text: "Amerikan Servis", spec: "80 gr 1. hamur kâğıda tek veya çift yön baskı seçenekleri", tag: "80 Gr 1. Hamur", cta: "Amerikan Servis Fiyatlarını İncele" },
      { path: "/kataloglar", text: "Restoran Menüsü", spec: "Farklı kâğıt, ciltleme ve kaplama seçeneklerinde basılı menüler", tag: "Basılı Menü", cta: "Menü Fiyatlarını İncele" },
      { path: "/karton-canta", text: "Paket Servis Karton Çantası", spec: "Logolu ve tutamaklı paket servis çantası seçenekleri", tag: "Karton Çanta", cta: "Çanta Fiyatlarını İncele" },
      { path: "/makbuz-ve-formlar", text: "Restoran Sipariş Fişi", spec: "Otokopili veya koçanlı sipariş takip formları", tag: "Sipariş Fişi", cta: "Sipariş Fişi Fiyatlarını İncele" }
    ]
  },
  EMLAK: {
    name: "Temizlik & Emlak Baskıları",
    icon: HomeIcon,
    parentPath: "/sektor/emlakci-kartvizit-baski",
    siblings: [
      { path: "/emlakci-kartvizit", text: "Emlakçı Prestij Kartvizit" },
      { path: "/emlak-afis-baski", text: "Emlak Branda Afişi" },
      { path: "/hali-koltuk-yikama-baski", text: "Halı ve Koltuk Yıkama" },
      { path: "/antalya-emlakci-kartvizit-baski", text: "Antalya Emlakçı Kartvizit" },
      { path: "/erzurum-emlakci-katalog-baski", text: "Erzurum Emlakçı Kataloğu" },
      { path: "/kayseri-emlakci-afis-baski", text: "Kayseri Emlakçı Afiş Baskı" }
    ],
    popularPrints: [
      { path: "/kartvizit", text: "Lüks Kabartmalı Kartvizit", spec: "350 Gr Bristol, Mat Kadife Selefon, Kısmi Lak", tag: "350 Gr Bristol" },
      { path: "/afis", text: "Dış Mekan Satılık Brandası", spec: "440 Gr Avrupa Döküm Vinil, Kuşgözü Halkalı", tag: "440 Gr Vinil" },
      { path: "/kataloglar", text: "Lüks Gayrimenkul Kataloğu", spec: "170 Gr Mat Kuşe İç, Lüks Amerikan Ciltleme", tag: "170 Gr Mat Kuşe" },
      { path: "/dosyalar", text: "Kurumsal Bloknot & Dosya", spec: "350 Gr Bristol Cepli Dosya, Kabartma Laklı", tag: "Cepli Dosya" }
    ]
  },
  KUAFOR: {
    name: "Kartvizit Baskı",
    icon: Scissors,
    parentPath: "/kartvizit",
    siblings: [
      { path: "/kartvizit", text: "Kartvizit Baskı Çözümleri" },
      { path: "/sektor/kuafor-kartvizit-baski", text: "Kuaför Randevu Kartı" },
      { path: "/el-ilani", text: "Güzellik Salonu El İlanı" },
      { path: "/brosur", text: "Saç & Bakım Hizmet Menüsü" },
      { path: "/magnet", text: "Randevu Magneti" },
      { path: "/etiket", text: "Kozmetik Etiketi" }
    ],
    popularPrints: [
      { path: "/kartvizit", text: "Kuaför & Berber Kartviziti", spec: "Tek veya çift yön renkli baskı, mat veya parlak selefon kaplamalı", tag: "350 Gr Kuşe", cta: "Kartvizit Fiyatlarını İncele" },
      { path: "/el-ilani", text: "Güzellik Salonu El İlanı", spec: "Tek veya çift yön canlı renkli tanıtım baskısı", tag: "115/130 Gr Kuşe", cta: "El İlanı Fiyatlarını İncele" },
      { path: "/brosur", text: "Bakım Hizmetleri Menü Broşürü", spec: "Tek veya çok kırımlı katlamalı broşür seçeneği", tag: "Katlamalı Kuşe", cta: "Broşür Fiyatlarını İncele" },
      { path: "/magnet", text: "Mıknatıslı Randevu Magneti", spec: "Mat veya parlak selefon kaplamalı dolap magneti", tag: "0,50 mm Magnet", cta: "Magnet Fiyatlarını İncele" },
      { path: "/etiket", text: "Bakım Ürünü Etiketi", spec: "Neme dayanıklı PP opak veya iç mekân kullanımına uygun kuşe etiket seçenekleri", tag: "PP Opak / Kuşe", cta: "Etiket Fiyatlarını İncele" }
    ]
  },
  KAFE: {
    name: "Kafe & Coffee Shop Baskıları",
    icon: Coffee,
    parentPath: "/sektor/kafe-menu-baski",
    siblings: [
      { path: "/kafe-menu-baski", text: "Kafe Klasik Menü Baskısı" },
      { path: "/amerikan-servis", text: "Logolu Kafe Servis Kağıdı" },
      { path: "/trabzon-kafe-menu-baski", text: "Trabzon Kafe Menü Baskı" }
    ],
    popularPrints: [
      { path: "/amerikan-servis", text: "Kişiselleştirilmiş Servis Örtüsü", spec: "80 Gr Hamur Kağıt, Akma Yapmaz Su Mürekkebi" },
      { path: "/kutu", text: "Sıcak Kruvasan / Kurabiye Kutusu", spec: "Gıda Kartonu, Gözenekli Isı Tahliye Delikli" },
      { path: "/etiket", text: "Bardak & Paket Yapıştırma Etiketi", spec: "Kuşe Yapışkanlı Etiket, Akrilik Özel Zamklı" }
    ]
  },
  ECZANE: {
    name: "Eczane & Sağlık Sektörü Baskıları",
    icon: PlusCircle,
    parentPath: "/sektor/eczane-el-ilani-baski",
    siblings: [
      { path: "/sektor/eczane-el-ilani-baski", text: "Eczane Bilgilendirme İlanı" },
      { path: "/gebze-eczane-etiket-baski", text: "Gebze Eczane Etiketi" }
    ],
    popularPrints: [
      { path: "/etiket", text: "Eczane İlaç Tarifi Etiketleri", spec: "Rulo Termal Etiket, Hızlı Yapışan Güçlü Yapışkan" },
      { path: "/el-ilani", text: "Nöbetçi Eczane & Sağlık İlanları", spec: "115 Gr Mat Kuşe, Parlak Renk Hassasiyeti" },
      { path: "/zarf", text: "Eczane Reçete Zarfları", spec: "110 Gr Birinci Sınıf Beyaz Zarf Birleştirme" }
    ]
  },
  FINDIK: {
    name: "Fındık Sanayii & Tarım Baskıları",
    icon: Sprout,
    parentPath: "/ordu-findik-firmasi-katalog-baski",
    siblings: [
      { path: "/ordu-findik-firmasi-katalog-baski", text: "Ordu Fındık Firması Kataloğu" }
    ],
    popularPrints: [
      { path: "/kataloglar", text: "İhracat Görsel Kataloğu", spec: "170 Gr Parlak Kuşe, Gofreli Kabartmalı Kapak" },
      { path: "/kutu", text: "Lüks Hediyelik Fındık Kutusu", spec: "300 Gr Bristol Karton, İç Bölmeli Pilyajlı" },
      { path: "/etiket", text: "Hasat ve Sevkiyat Etiketi", spec: "Lamine Termal Sökülmez Barkod Etiketi" }
    ]
  },
  KOZMETIK: {
    name: "Matbaa Ürünleri",
    icon: Sparkles,
    parentPath: "/matbaa",
    siblings: [
      { path: "/kutu", text: "Parfüm ve Kozmetik Kutuları" },
      { path: "/kartvizit", text: "Hasta Randevu & Bilgi Kartviziti" },
      { path: "/sozlesme-baski", text: "Güzellik Merkezi Hizmet Sözleşmesi" },
      { path: "/tahsilat-makbuzu", text: "Tahsilat Makbuzu ve Senet Koçanı" },
      { path: "/etiket", text: "Suya Dayanıklı PP Opak Etiket" },
      { path: "/karton-canta", text: "Lüks Karton Çanta Baskısı" },
      { path: "/makbuz-ve-formlar", text: "Epilasyon & İşlem Onam Formları" },
      { path: "/brosur", text: "Tanıtım Broşürü ve El İlanı" }
    ],
    popularPrints: [
      { path: "/kutu", text: "Parfüm ve Kozmetik Kutusu", spec: "İşin ölçüsü ve yapısına uygun karton, baskı ve yüzey uygulaması seçenekleri", tag: "300–400 Gr Bristol", cta: "Kutu Fiyatlarını İncele" },
      { path: "/makbuz-ve-formlar", text: "Güzellik Merkezi Formları", spec: "Seans takip, işlem bilgi ve müşteri kayıt formları", tag: "İşlem ve Takip Formu", cta: "Form Seçeneklerini İncele" },
      { path: "/tahsilat-makbuzu", text: "Tahsilat Makbuzu", spec: "Mevcut seçeneklere göre iki veya üç nüshalı tahsilat formları", tag: "Otokopili Makbuz", cta: "Makbuz Fiyatlarını İncele" },
      { path: "/kartvizit", text: "Hasta Randevu ve Bilgi Kartı", spec: "Randevu tarihi, saat ve iletişim bilgilerinin yer aldığı basılı kartlar", tag: "Randevu Kartı", cta: "Kartvizit Fiyatlarını İncele" },
      { path: "/brosur", text: "Tanıtım Broşürü", spec: "Hizmet, kampanya ve iletişim bilgilerinin sunulduğu broşürler", tag: "Katlamalı Broşür", cta: "Broşür Fiyatlarını İncele" },
      { path: "/etiket", text: "Kozmetik Etiketi", spec: "Ambalaj yüzeyine ve kullanım ortamına göre belirlenen etiket seçenekleri", tag: "PP Opak / Şeffaf", cta: "Etiket Fiyatlarını İncele" },
      { path: "/karton-canta", text: "Karton Çanta", spec: "Logo baskılı, ipli veya saplı karton çanta seçenekleri", tag: "Kozmetik ve Parfümeri Çantası", cta: "Çanta Fiyatlarını İncele" },
      { path: "/sozlesme-baski", text: "Hizmet Sözleşmesi", spec: "Müşteri tarafından sağlanan metinle otokopili hizmet sözleşmesi baskısı", tag: "Hizmet Sözleşmesi", cta: "Sözleşme Fiyatlarını İncele" }
    ]
  },
  ETICARET: {
    name: "Matbaa Ürünleri",
    icon: ShoppingBag,
    parentPath: "/matbaa",
    siblings: [
      { path: "/kutu", text: "E-Ticaret Kargo ve Ambalaj Kutuları" },
      { path: "/karton-canta", text: "Baskılı Kraft ve Karton Çantalar" },
      { path: "/etiket", text: "Rulo Barkod ve Koli Etiketleri" },
      { path: "/kartvizit", text: "Müşteri Teşekkür ve Bilgi Kartları" },
      { path: "/amerikan-servis", text: "Amerikan Servis Baskısı" },
      { path: "/makbuz-ve-formlar", text: "Sevk ve Teslimat Takip Formları" }
    ],
    popularPrints: [
      { path: "/kutu", text: "Kargo Kutusu ve Ürün Ambalajı", spec: "Talebe ve teknik uygunluğa göre mikro ondüle ve Bristol kargo kutusu seçenekleri", tag: "Kargo Kutusu", cta: "Kutu Fiyatlarını İncele" },
      { path: "/karton-canta", text: "Saten & Polyester İpli Karton Çanta", spec: "Talebe ve teknik uygunluğa göre saten veya polyester ipli Bristol karton çanta", tag: "Karton Çanta", cta: "Çanta Fiyatlarını İncele" },
      { path: "https://wa.me/905366022373?text=Bask%C4%B1l%C4%B1%20ambalaj%20ve%20pel%C3%BCr%20k%C3%A2%C4%9F%C4%B1d%C4%B1%20fiyat%20teklifi%20almak%20istiyorum", text: "Baskılı Ambalaj & Pelür Kâğıdı", spec: "Pelür, sülfit ve kraft logo baskılı sarım kâğıtları", tag: "Ambalaj Kâğıdı", cta: "Fiyat Teklifi Al" },
      { path: "/etiket", text: "Barkod, Koli ve Ürün Etiketleri", spec: "Rulo termal barkod, koli uyarı, adres ve raf etiketleri", tag: "Etiket Çözümleri", cta: "Etiket Fiyatlarını İncele" },
      { path: "/kartvizit", text: "Teşekkür, Bakım ve QR Paket Kartı", spec: "350 gr mat kuşe teşekkür, iade, bakım ve QR kodlu paket kartları", tag: "Paket İçi Kart", cta: "Kartvizit Fiyatlarını İncele" },
      { path: "/amerikan-servis", text: "Perakende Amerikan Servis", spec: "80 gr 1. hamur veya kuşe seçenekli tek kullanımlık servis", tag: "Amerikan Servis", cta: "Servis Fiyatlarını İncele" },
      { path: "/makbuz-ve-formlar", text: "Sevk ve Teslimat Takip Formları", spec: "Müşteri içeriğiyle hazırlanan otokopili sevk ve takip formları", tag: "Otokopili Form", cta: "Form Fiyatlarını İncele" }
    ]
  },
  KUTU: {
    name: "Kutu & Ambalaj Baskıları",
    icon: ShoppingBag,
    parentPath: "/matbaa",
    siblings: [
      { path: "/kutu", text: "Özel Tasarım Kutu Baskısı" },
      { path: "/etiket", text: "Kutu ve Ürün Etiketleri" },
      { path: "/karton-canta", text: "Karton Taşıma Çantası" },
      { path: "/brosur", text: "Ürün Föyü & Broşür" },
      { path: "/matbaa", text: "Matbaa & Baskı Ürünleri" }
    ],
    popularPrints: [
      { path: "/kutu", text: "İlaç ve Medikal Ürün Kutusu", spec: "Müşteri tarafından sağlanan onaylı içerik ve ölçülere göre kutu seçenekleri", tag: "Medikal Ambalaj", cta: "Kutu Seçeneklerini İncele" },
      { path: "/kutu", text: "Parfüm ve Kozmetik Kutusu", spec: "Mat veya parlak selefon, varak, gofre ve separatör seçenekleri", tag: "300–400 Gr Bristol", cta: "Kozmetik Kutu Seçeneklerini İncele" },
      { path: "/kutu", text: "Zurna Dürüm ve Taco Kutusu", spec: "Ürünün ölçüsüne ve kullanım biçimine göre özel kutu çözümleri", tag: "Fast-Food Kutusu", cta: "Fast-Food Kutularını İncele" },
      { path: "/kutu", text: "Popcorn ve Cips Kutusu", spec: "Tek porsiyon veya büyük boy baskılı servis kutusu seçenekleri", tag: "Atıştırmalık Kutusu", cta: "Atıştırmalık Kutularını İncele" },
      { path: "/kutu", text: "Baklava ve Tatlı Kutusu", spec: "Baklava, pasta, kurabiye, lokum ve çikolata için özel ölçülü kutular", tag: "Pastane Kutusu", cta: "Pastane Kutularını İncele" },
      { path: "/etiket", text: "Ürün Etiketi", spec: "Kutu, kavanoz, şişe ve perakende ambalajlarına uygun etiket seçenekleri", tag: "Etiket Baskısı", cta: "Etiket Fiyatlarını İncele" },
      { path: "https://wa.me/905366022373?text=Bask%C4%B1l%C4%B1%20ambalaj%20ve%20pel%C3%BCr%20k%C3%A2%C4%9F%C4%B1d%C4%B1%20fiyat%20teklifi%20almak%20istiyorum", text: "Baskılı Ambalaj Kâğıdı", spec: "Ürünün kullanım biçimine göre pelür, sülfit, kraft veya farklı kâğıt seçenekleri", tag: "Paketleme Kâğıdı", cta: "Fiyat Teklifi Al" },
      { path: "/karton-canta", text: "Karton Çanta", spec: "İpli, saplı, kraft veya Bristol karton çanta seçenekleri", tag: "Taşıma Ambalajı", cta: "Çanta Fiyatlarını İncele" },
      { path: "/brosur", text: "Ürün Föyü ve Prospektüs", spec: "Müşterinin sağladığı onaylı içerikle küçük veya çok kırımlı ürün föyleri", tag: "Katlamalı Föy", cta: "Broşür Seçeneklerini İncele" }
    ]
  },
  EGITIM: {
    name: "Matbaa Ürünleri",
    icon: GraduationCap,
    parentPath: "/matbaa",
    siblings: [
      { path: "/kataloglar", text: "Deneme & Soru Kitapçığı" },
      { path: "/brosur", text: "Kayıt & Tanıtım Broşürü" },
      { path: "/afis", text: "Eğitim & Tanıtım Afişi" },
      { path: "/makbuz-ve-formlar", text: "Öğrenci Kayıt & Takip Formları" },
      { path: "/dosyalar", text: "Cepli Kurumsal Dosya" },
      { path: "/kutu", text: "Eğitim Seti & Kart Kutusu" },
      { path: "/karton-canta", text: "Karton Çanta Baskısı" },
      { path: "/bloknotlar", text: "Bloknot & Not Defteri" }
    ],
    popularPrints: [
      { path: "/kataloglar", text: "Deneme ve Soru Kitapçığı", spec: "A4 / 19×27 cm, tel dikiş veya tutkallı cilt, 1. hamur veya kuşe kâğıt seçenekleri", tag: "Deneme Kitapçığı", cta: "Kitapçık Seçeneklerini İncele" },
      { path: "/brosur", text: "Kayıt ve Tanıtım Broşürü", spec: "115 gr veya 130 gr kuşe, tek veya çok kırımlı katlama, canlı ofset baskı", tag: "Kayıt Broşürü", cta: "Broşür Fiyatlarını İncele" },
      { path: "/afis", text: "Eğitim & Kayıt Afişi", spec: "50×70 ve 70×100 cm kuşe afiş, parlak renk kalitesi", tag: "Kayıt Afişi", cta: "Afiş Fiyatlarını İncele" },
      { path: "/kataloglar", text: "Kurum Tanıtım Kataloğu & Dergi", spec: "Kuşe kapak, mat/parlak selefon, tel dikiş veya Amerikan ciltleme", tag: "Kurum Kataloğu", cta: "Katalog Fiyatlarını İncele" },
      { path: "/makbuz-ve-formlar", text: "Öğrenci Kayıt & Takip Formları", spec: "Otokopili 2-3 nüshalı sözleşme, kayıt, etüt ve takip koçanları", tag: "Otokopili Form", cta: "Form Seçeneklerini İncele" },
      { path: "/dosyalar", text: "Cepli Kurumsal Dosya", spec: "350 gr Bristol, tek veya çift cepli, mat/parlak selefon kaplamalı", tag: "Cepli Dosya", cta: "Dosya Fiyatlarını İncele" },
      { path: "/kutu", text: "Eğitim Seti & Oyun Kartı Kutusu", spec: "Karton ve mikro ondüle özel ölçülü baskılı eğitim kutuları", tag: "Eğitim Kutusu", cta: "Kutu Fiyatlarını İncele" },
      { path: "/karton-canta", text: "Karton Çanta", spec: "Özel ipli veya saplı, selefon kaplamalı kurumsal okul çantaları", tag: "Karton Çanta", cta: "Çanta Fiyatlarını İncele" },
      { path: "/bloknotlar", text: "Bloknot & Not Defteri", spec: "Tutkallı, spiralli veya kapaklı kurumsal not defterleri", tag: "Bloknot", cta: "Bloknot Fiyatlarını İncele" },
      { path: "https://wa.me/905366022373?text=E%C4%9Fitim%20kurumlar%C4%B1%20i%C3%A7in%20%C3%B6zel%20bask%C4%B1%20ve%20belge%20teklifi%20almak%20istiyorum", text: "Özel Kurumsal Kart & Belge Baskıları", spec: "Yaka kartı, öğrenci kartı, sertifika, katılım belgesi ve karne baskıları", tag: "Özel Belge & Kart", cta: "WhatsApp'tan Teklif Al" }
    ]
  },
  AMBALAJ: {
    name: "Matbaa Ürünleri",
    icon: ShoppingBag,
    parentPath: "/matbaa",
    siblings: [
      { path: "/kutu", text: "Özel Tasarım Kutu Baskısı" },
      { path: "/etiket", text: "Kutu ve Ürün Etiketleri" },
      { path: "/karton-canta", text: "Karton Taşıma Çantası" },
      { path: "/brosur", text: "Ürün Föyü & Broşür" },
      { path: "/amerikan-servis", text: "Amerikan Servis Baskısı" }
    ],
    popularPrints: [
      { path: "/kutu", text: "Özel Ürün ve Karton Kutu", spec: "300–400 gr Amerikan Bristol, mat/parlak selefon, özel bıçaklı kesim", tag: "Kutu Baskısı", cta: "Kutu Fiyatlarını İncele" },
      { path: "/etiket", text: "Ambalaj ve Ürün Etiketi", spec: "Kuşe veya suya dayanıklı PP opak yapışkanlı rulo ve tabaka etiketler", tag: "Etiket Çözümleri", cta: "Etiket Fiyatlarını İncele" },
      { path: "/karton-canta", text: "Baskılı Karton Çanta", spec: "İpli, saplı, Bristol veya kraft dayanıklı taşıma çantaları", tag: "Karton Çanta", cta: "Çanta Fiyatlarını İncele" },
      { path: "/brosur", text: "Tanıtım Broşürü & Föy", spec: "Kuşe kâğıt, tek ve çok kırımlı ürün bilgilendirme föyleri", tag: "Broşür Baskısı", cta: "Broşür Fiyatlarını İncele" },
      { path: "/amerikan-servis", text: "Amerikan Servis Baskısı", spec: "80 gr 1. hamur veya kuşe tek kullanımlık ambalaj ve servis kâğıdı", tag: "Amerikan Servis", cta: "Servis Fiyatlarını İncele" }
    ]
  }
};

const getProductPagePath = (key: string): string => {
  const k = key.toLowerCase();
  
  if (k.includes('kartvizit')) return '/kartvizit';
  if (k.includes('brosur') || k.includes('broşür')) return '/brosur';
  if (k.includes('magnet')) return '/magnet';
  if (k.includes('katalog')) return '/kataloglar';
  if (k.includes('kutu')) return '/kutu';
  if (k.includes('amerikan-servis')) return '/amerikan-servis';
  if (k.includes('etiket')) return '/etiket';
  if (k.includes('siparis-fisi') || k.includes('sipariş-fişi')) return '/makbuz-ve-formlar';
  if (k.includes('afis') || k.includes('afiş')) return '/afis';
  
  return '/matbaa';
};

interface ImagePlaceholderProps {
  number: number;
  title: string;
  aspectRatio?: string;
  isDarkTheme?: boolean;
  className?: string;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  number,
  title,
  aspectRatio = '900 / 650',
  isDarkTheme = false,
  className = 'my-6'
}) => {
  return (
    <div
      aria-hidden="true"
      data-placeholder="true"
      data-image-placeholder="true"
      data-placeholder-number={number}
      data-aspect-ratio={aspectRatio}
      aria-label="Henüz yüklenmemiş görsel alanı"
      style={{ aspectRatio }}
      className={`w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-4 text-center transition-all ${
        isDarkTheme
          ? 'bg-neutral-900/90 border-neutral-700 text-neutral-300 shadow-xl'
          : 'bg-neutral-100/90 border-neutral-300 text-neutral-700'
      } ${className}`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
        isDarkTheme ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-200/80 text-neutral-500'
      }`}>
        <ImageIcon size={20} />
      </div>
      <span className={`text-[11px] font-extrabold tracking-widest uppercase ${
        isDarkTheme ? 'text-primary' : 'text-neutral-500'
      }`}>
        GÖRSEL {number}
      </span>
      <span className={`text-xs sm:text-sm font-bold mt-0.5 ${
        isDarkTheme ? 'text-white' : 'text-neutral-800'
      }`}>
        {title}
      </span>
      <span className={`text-[11px] font-medium mt-1 ${
        isDarkTheme ? 'text-neutral-400' : 'text-neutral-500'
      }`}>
        WebP görseli daha sonra eklenecek
      </span>
    </div>
  );
};

interface SeoContentImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  caption?: string;
  className?: string;
  figureClassName?: string;
  enabled?: boolean;
}

const SeoContentImage: React.FC<SeoContentImageProps> = ({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  fetchPriority,
  caption,
  className = 'w-full h-auto object-cover rounded-xl',
  figureClassName = 'my-6 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 p-2 shadow-sm',
  enabled = true
}) => {
  const [hasError, setHasError] = useState(false);

  if (!enabled || hasError) {
    return null;
  }

  return (
    <figure className={figureClassName}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        className={className}
        onError={(e) => {
          const fig = e.currentTarget.closest('figure');
          if (fig) fig.style.display = 'none';
          setHasError(true);
        }}
      />
      {caption && (
        <figcaption className="text-xs text-center text-neutral-500 font-medium mt-2 pb-1">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export const SEOPages = () => {
  const { slug } = useParams<{ slug?: string }>();
  const location = useLocation();

  // URL'den veya slug'dan tam eşleşen SEO kaydı anahtarını çek
  const activeKey = useMemo(() => {
    const rawPath = location.pathname.startsWith('/') ? location.pathname : `/${location.pathname}`;
    const cleanSlug = slug || location.pathname.substring(1);
    
    return Object.keys(SEO_PAGES_DATA).find(key => 
      key === cleanSlug || 
      SEO_PAGES_DATA[key].path === rawPath ||
      SEO_PAGES_DATA[key].path === `/${cleanSlug}` ||
      SEO_PAGES_DATA[key].path === `/sektor/${cleanSlug}`
    ) || null;
  }, [slug, location.pathname]);

  const page = useMemo(() => {
    if (!activeKey) return null;
    return SEO_PAGES_DATA[activeKey];
  }, [activeKey]);

  // Sayfaya özel ait olduğu sektörel cluster'ı tespit et (Sorgu ve Link Graph kurumu için)
  const activeClusterKey = useMemo(() => {
    if (!activeKey) return null;
    const keyLower = activeKey.toLowerCase();
    if (keyLower.includes('kozmetik') || keyLower.includes('saglik') || keyLower.includes('sağlık')) {
      return 'KOZMETIK';
    }
    if (keyLower.includes('restoran') || keyLower.includes('lokanta') || keyLower.includes('doner') || keyLower.includes('paket-servis') || keyLower.includes('siparis-fisi')) {
      return 'RESTORAN';
    }
    if (keyLower.includes('emlak') || keyLower.includes('afis') || (keyLower.includes('katalog') && keyLower.includes('emlak')) || keyLower.includes('hali-koltuk-yikama')) {
      return 'EMLAK';
    }
    if (keyLower.includes('kuafor') || keyLower.includes('guzellik') || keyLower.includes('salon') || keyLower.includes('cips-kutusu')) {
      return 'KUAFOR';
    }
    if (keyLower.includes('kafe') || keyLower.includes('bardak-altligi') || keyLower.includes('coaster')) {
      return 'KAFE';
    }
    if (keyLower.includes('kozmetik') || keyLower.includes('saglik') || keyLower.includes('sağlık')) {
      return 'KOZMETIK';
    }
    if (keyLower.includes('ticaret') || keyLower.includes('perakende')) {
      return 'ETICARET';
    }
    if (keyLower.includes('kutu-ambalaj') || keyLower.includes('kutu') || keyLower.includes('ambalaj') || keyLower.includes('gida') || keyLower.includes('gıda') || keyLower.includes('kooperatif')) {
      return 'KUTU';
    }
    if (keyLower.includes('eczane') || keyLower.includes('etiket')) {
      return 'ECZANE';
    }
    if (keyLower.includes('findik')) {
      return 'FINDIK';
    }
    if (keyLower.includes('egitim') || keyLower.includes('eğitim') || keyLower.includes('okul') || keyLower.includes('kurs')) {
      return 'EGITIM';
    }
    return null;
  }, [activeKey]);

  const cluster = useMemo(() => {
    if (!activeClusterKey) return null;
    return CLUSTERS[activeClusterKey];
  }, [activeClusterKey]);

  const canonicalUrl = `https://mavibasim.com${page.path}`;

  const featuredPaths = useMemo(() => {
    const paths = new Set<string>();
    paths.add(page.path);
    paths.add(`/sektor/${activeKey}`);
    if (cluster) {
      cluster.popularPrints.forEach(p => paths.add(p.path));
    }
    return paths;
  }, [page.path, activeKey, cluster]);

  const siblingLinks = useMemo(() => {
    if (!cluster) return [];
    return cluster.siblings.filter(sib => !featuredPaths.has(sib.path));
  }, [cluster, featuredPaths]);

  const serviceSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": page.h1,
    "serviceType": activeKey === 'egitim-kurumlari-baski' 
      ? "Eğitim kurumları için matbaa ve baskı hizmetleri" 
      : activeKey === 'kutu-ambalaj-baski-cozumleri'
      ? "Özel baskılı kutu ve ambalaj çözümleri"
      : undefined,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Mavi Basım Matbaa & Reklam",
      "url": "https://mavibasim.com",
      "telephone": PHONE_NUMBER,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Topkapı 2. Matbaacılar Sitesi B Blok No:2NB Zeytinburnu",
        "addressLocality": "İstanbul",
        "addressCountry": "TR"
      }
    },
    "areaServed": "Türkiye",
    "description": page.metaDesc,
    "url": canonicalUrl
  }), [page.h1, page.metaDesc, activeKey, canonicalUrl]);

  const breadcrumbSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Ana Sayfa",
        "item": "https://mavibasim.com"
      },
      ...(cluster && cluster.parentPath !== page.path && cluster.parentPath !== `/sektor/${activeKey}` ? [
        {
          "@type": "ListItem",
          "position": 2,
          "name": cluster.name,
          "item": `https://mavibasim.com${cluster.parentPath}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": page.h1,
          "item": canonicalUrl
        }
      ] : [
        {
          "@type": "ListItem",
          "position": 2,
          "name": page.h1,
          "item": canonicalUrl
        }
      ])
    ]
  }), [cluster, page.path, page.h1, activeKey, canonicalUrl]);

  const faqSchema = useMemo(() => {
    if (!page.faqs || page.faqs.length === 0) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": page.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  }, [page.faqs]);

  if (!page) {
    return (
      <div className="bg-white min-h-screen py-24 flex flex-col items-center justify-center px-4">
        <Helmet>
          <title>404 Sayfa Bulunamadı | Mavi Basım</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <h1 className="text-4xl font-extrabold text-black mb-4">404 - Sayfa Bulunamadı</h1>
        <p className="text-gray-600 mb-8 max-w-md text-center">İlgili sektörel veya şehre özel SEO matbaa sayfamız henüz yayına girmemiştir.</p>
        <Link to="/" className="px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-black transition-colors">
          Ana Sayfaya Dön
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.metaDesc} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.metaDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={activeKey === 'kutu-ambalaj-baski-cozumleri' ? (SECTOR_IMAGE_MANIFEST.kutuAmbalaj?.["kutu-ambalaj-baski-cozumleri.webp"] ? "https://mavibasim.com/images/sektor/kutu-ambalaj/kutu-ambalaj-baski-cozumleri.webp" : "https://mavibasim.com/mavilogo.png") : (page.heroImage ? `https://mavibasim.com${page.heroImage}` : "https://mavibasim.com/mavilogo.png")} />
      </Helmet>

      {/* Hero Banner Area */}
      <div className="bg-gradient-to-br from-neutral-900 via-black to-neutral-900 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:30px_30px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        
        {/* Breadcrumb Navigation - Crawl Depth & Structure indicator */}
        <div className="max-w-4xl mx-auto mb-6 relative z-10">
          <nav className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-400 tracking-wide bg-neutral-950/40 py-2 px-4 rounded-full w-fit mx-auto border border-neutral-800/50">
            <Link to="/" className="hover:text-primary transition-colors text-neutral-300">Ana Sayfa</Link>
            <span className="text-neutral-600">/</span>
            {cluster && cluster.parentPath !== page.path && cluster.parentPath !== `/sektor/${activeKey}` ? (
              <>
                <Link to={cluster.parentPath} className="hover:text-primary transition-colors text-neutral-300">{cluster.name}</Link>
                <span className="text-neutral-600">/</span>
              </>
            ) : null}
            <span className="text-primary font-bold">{page.h1}</span>
          </nav>
        </div>

        <div className={`max-w-6xl mx-auto relative z-10 ${
          activeKey === 'kuafor-kartvizit-baski' || activeKey === 'restoran-brosur-baski' || activeKey === 'kozmetik-guzellik-merkezi-baski' || activeKey === 'e-ticaret-perakende-baski' || activeKey === 'egitim-kurumlari-baski' || activeKey === 'kutu-ambalaj-baski-cozumleri'
            ? 'grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left'
            : 'text-center max-w-4xl space-y-4'
        }`}>
          <div className={`${
            activeKey === 'kuafor-kartvizit-baski' || activeKey === 'restoran-brosur-baski' || activeKey === 'kozmetik-guzellik-merkezi-baski' || activeKey === 'e-ticaret-perakende-baski' || activeKey === 'egitim-kurumlari-baski' || activeKey === 'kutu-ambalaj-baski-cozumleri'
              ? 'md:col-span-7 space-y-4'
              : 'space-y-4'
          }`}>
            <div className={`flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em] ${
              activeKey === 'kuafor-kartvizit-baski' || activeKey === 'restoran-brosur-baski' || activeKey === 'kozmetik-guzellik-merkezi-baski' || activeKey === 'e-ticaret-perakende-baski' || activeKey === 'egitim-kurumlari-baski' || activeKey === 'kutu-ambalaj-baski-cozumleri'
                ? ''
                : 'justify-center'
            }`}>
              <Award size={14} /> Mavi Basım Matbaa &amp; Reklam <Award size={14} />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase font-sans">
              {page.h1}
            </h1>
            <p className="text-primary text-lg sm:text-xl font-medium tracking-wide">
              {page.tagline}
            </p>
            <p className="text-gray-300 max-w-3xl sm:max-w-4xl text-sm sm:text-base leading-relaxed font-normal">
              {page.intro}
            </p>
            <div className="pt-2">
              {activeKey === 'kutu-ambalaj-baski-cozumleri' ? (
                <a 
                  href="#kutu-ambalaj-urunleri" 
                  className="inline-flex items-center gap-2 bg-primary text-black font-black uppercase tracking-widest text-xs sm:text-sm px-8 py-4 rounded-2xl hover:bg-white hover:text-black transition-all shadow-xl hover:scale-105"
                >
                  Kutu ve Ambalaj Ürünlerini İncele →
                </a>
              ) : activeKey === 'egitim-kurumlari-baski' ? (
                <a 
                  href="#egitim-baski-urunleri" 
                  className="inline-flex items-center gap-2 bg-primary text-black font-black uppercase tracking-widest text-xs sm:text-sm px-8 py-4 rounded-2xl hover:bg-white hover:text-black transition-all shadow-xl hover:scale-105"
                >
                  Eğitim Kurumları Baskı Ürünlerini İncele →
                </a>
              ) : activeKey === 'kozmetik-guzellik-merkezi-baski' ? (
                <a 
                  href="#ilgili-baski-urunleri" 
                  className="inline-flex items-center gap-2 bg-primary text-black font-black uppercase tracking-widest text-xs sm:text-sm px-8 py-4 rounded-2xl hover:bg-white hover:text-black transition-all shadow-xl hover:scale-105"
                >
                  Güzellik Merkezi Baskı Ürünlerini İncele
                </a>
              ) : activeKey === 'e-ticaret-perakende-baski' ? (
                <a 
                  href="#ilgili-baski-urunleri" 
                  className="inline-flex items-center gap-2 bg-primary text-black font-black uppercase tracking-widest text-xs sm:text-sm px-8 py-4 rounded-2xl hover:bg-white hover:text-black transition-all shadow-xl hover:scale-105"
                >
                  E-Ticaret Baskı Ürünlerini İncele →
                </a>
              ) : (
                <Link 
                  to={getProductPagePath(activeKey || "")} 
                  className="inline-flex items-center gap-2 bg-primary text-black font-black uppercase tracking-widest text-xs sm:text-sm px-8 py-4 rounded-2xl hover:bg-white hover:text-black transition-all shadow-xl hover:scale-105"
                >
                  🚀 {activeKey === 'restoran-brosur-baski' ? 'Restoran Broşür Fiyatlarını İncele' : `${page.h1} Fiyatlarını Gör & Sipariş Ver`} →
                </Link>
              )}
            </div>
          </div>

          {/* Görsel 1: Ana Hero Görseli veya Taslak Kutu (Kuaför) */}
          {activeKey === 'kuafor-kartvizit-baski' && (
            SECTOR_IMAGE_MANIFEST.kuafor["kuafor-kartvizit-baski.webp"] ? (
              <div className="md:col-span-5">
                <SeoContentImage
                  src="/images/sektor/kuafor-kartvizit/kuafor-kartvizit-baski.webp"
                  alt="Kuaför ve güzellik salonları için çift yönlü kartvizit baskı örneği"
                  width={1200}
                  height={800}
                  loading="eager"
                  fetchPriority="high"
                  figureClassName="rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900"
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
            ) : (
              <div className="md:col-span-5">
                <ImagePlaceholder
                  number={1}
                  title="Ana Kuaför Kartvizit Görseli"
                  aspectRatio="1200 / 800"
                  isDarkTheme={true}
                  className="my-0"
                />
              </div>
            )
          )}

          {/* Görsel 1: Ana Hero Görseli veya Taslak Kutu (Restoran) */}
          {activeKey === 'restoran-brosur-baski' && (
            SECTOR_IMAGE_MANIFEST.restoran["restoran-brosur-baski.webp"] ? (
              <div className="md:col-span-5">
                <SeoContentImage
                  src="/images/sektor/restoran-brosur/restoran-brosur-baski.webp"
                  alt="Restoran ve paket servis işletmeleri için katlamalı menü broşürü baskı örneği"
                  width={1200}
                  height={800}
                  loading="eager"
                  fetchPriority="high"
                  figureClassName="rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900"
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
            ) : (
              <div className="md:col-span-5">
                <ImagePlaceholder
                  number={1}
                  title="Ana Restoran Broşür Görseli"
                  aspectRatio="1200 / 800"
                  isDarkTheme={true}
                  className="my-0"
                />
              </div>
            )
          )}

          {/* Görsel 1: Ana Hero Görseli veya Taslak Kutu (Kozmetik Sağlık) */}
          {activeKey === 'kozmetik-guzellik-saglik-baski' && (
            SECTOR_IMAGE_MANIFEST.kozmetik["kozmetik-guzellik-saglik-baski-cozumleri.webp"] ? (
              <div className="md:col-span-5">
                <SeoContentImage
                  src="/images/sektor/kozmetik-guzellik-saglik/kozmetik-guzellik-saglik-baski-cozumleri.webp"
                  alt="Kozmetik ve güzellik merkezleri için kutu, broşür, kartvizit ve form baskıları"
                  width={1200}
                  height={800}
                  loading="eager"
                  fetchPriority="high"
                  figureClassName="rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900"
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
            ) : (
              <div className="md:col-span-5">
                <ImagePlaceholder
                  number={1}
                  title="Kozmetik ve Güzellik Merkezi Baskı Çözümleri"
                  aspectRatio="1200 / 800"
                  isDarkTheme={true}
                  className="my-0"
                />
              </div>
            )
          )}

          {/* Görsel 1: Ana Hero Görseli veya Taslak Kutu (Güzellik Merkezi) */}
          {activeKey === 'kozmetik-guzellik-merkezi-baski' && (
            SECTOR_IMAGE_MANIFEST.kozmetikGuzellikMerkezi["kozmetik-guzellik-merkezi-baski-cozumleri.webp"] ? (
              <div className="md:col-span-5">
                <SeoContentImage
                  src="/images/sektor/kozmetik-guzellik-merkezi/kozmetik-guzellik-merkezi-baski-cozumleri.webp"
                  alt="Güzellik merkezleri için kutu, form, kartvizit ve broşür baskı çözümleri"
                  width={1200}
                  height={800}
                  loading="eager"
                  fetchPriority="high"
                  figureClassName="rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900"
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
            ) : (
              <div className="md:col-span-5">
                <ImagePlaceholder
                  number={1}
                  title="Güzellik Merkezi ve Kozmetik Baskı Çözümleri"
                  aspectRatio="1200 / 800"
                  isDarkTheme={true}
                  className="my-0"
                />
              </div>
            )
          )}

          {/* Görsel 1: Ana Hero Görseli veya Taslak Kutu (E-Ticaret Perakende) */}
          {activeKey === 'e-ticaret-perakende-baski' && (
            SECTOR_IMAGE_MANIFEST.eTicaretPerakende["e-ticaret-perakende-baski-cozumleri.webp"] ? (
              <div className="md:col-span-5">
                <SeoContentImage
                  src="/images/sektor/e-ticaret-perakende/e-ticaret-perakende-baski-cozumleri.webp"
                  alt="E-ticaret ve perakende markaları için kargo kutusu, karton çanta, etiket ve ambalaj kâğıdı baskıları"
                  width={1200}
                  height={800}
                  loading="eager"
                  fetchPriority="high"
                  figureClassName="rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900"
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
            ) : (
              <div className="md:col-span-5">
                <ImagePlaceholder
                  number={1}
                  title="E-Ticaret ve Perakende Baskı Çözümleri"
                  aspectRatio="1200 / 800"
                  isDarkTheme={true}
                  className="my-0"
                />
              </div>
            )
          )}

          {/* Görsel 1: Ana Hero Görseli veya Taslak Kutu (Eğitim Kurumları) */}
          {activeKey === 'egitim-kurumlari-baski' && (
            SECTOR_IMAGE_MANIFEST.egitimKurumlari?.["egitim-kurumlari-baski-cozumleri.webp"] ? (
              <div className="md:col-span-5">
                <SeoContentImage
                  src="/images/sektor/egitim-kurumlari/egitim-kurumlari-baski-cozumleri.webp"
                  alt="Eğitim kurumları için deneme kitapçığı, fasikül, broşür, katalog ve kurumsal baskı çözümleri"
                  width={1200}
                  height={800}
                  loading="eager"
                  fetchPriority="high"
                  figureClassName="rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900"
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
            ) : (
              <div className="md:col-span-5">
                <ImagePlaceholder
                  number={1}
                  title="Eğitim Kurumları Baskı Çözümleri"
                  aspectRatio="1200 / 800"
                  isDarkTheme={true}
                  className="my-0"
                />
              </div>
            )
          )}

          {/* Görsel 1: Ana Hero Görseli veya Taslak Kutu (Kutu ve Ambalaj) */}
          {activeKey === 'kutu-ambalaj-baski-cozumleri' && (
            SECTOR_IMAGE_MANIFEST.kutuAmbalaj?.["kutu-ambalaj-baski-cozumleri.webp"] ? (
              <div className="md:col-span-5">
                <SeoContentImage
                  src="/images/sektor/kutu-ambalaj/kutu-ambalaj-baski-cozumleri.webp"
                  alt="İlaç, parfüm, kozmetik, fast-food ve perakende ürünleri için baskılı kutu ve ambalaj seçenekleri"
                  width={1200}
                  height={800}
                  loading="eager"
                  fetchPriority="high"
                  figureClassName="rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900"
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
            ) : (
              <div className="md:col-span-5">
                <ImagePlaceholder
                  number={1}
                  title="Kutu ve Ambalaj Baskı Çözümleri"
                  aspectRatio="1200 / 800"
                  isDarkTheme={true}
                  className="my-0"
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* Trust Factors Row */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-neutral-100 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="mx-auto w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <Truck size={20} />
            </div>
            <p className="text-xs font-black text-black">TÜRKİYE GENELİ GÖNDERİM</p>
            <p className="text-[10px] text-gray-500">Anlaşmalı Kargo ile Gönderim</p>
          </div>
          <div className="space-y-1">
            <div className="mx-auto w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <p className="text-xs font-black text-black">MÜŞTERİ DESTEK HATTI</p>
            <p className="text-[10px] text-gray-500">Mavi Basım Müşteri Hizmetleri</p>
          </div>
          <div className="space-y-1">
            <div className="mx-auto w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <CheckCircle size={20} />
            </div>
            <p className="text-xs font-black text-black">BASKI ÖNCESİ KONTROL</p>
            <p className="text-[10px] text-gray-500">Baskıya Hazır Dosya Kontrolü ve PDF Prova</p>
          </div>
          <div className="space-y-1">
            <div className="mx-auto w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <Clock size={20} />
            </div>
            <p className="text-xs font-black text-black">
              {(activeKey === 'kuafor-kartvizit-baski' || activeKey === 'kozmetik-guzellik-merkezi-baski' || activeKey === 'e-ticaret-perakende-baski' || activeKey === 'egitim-kurumlari-baski' || activeKey === 'kutu-ambalaj-baski-cozumleri') ? 'ÜRÜN VE ADET SEÇENEKLERİ' : 'ŞEFFAF FİYATLANDIRMA'}
            </p>
            <p className="text-[10px] text-gray-500">
              {(activeKey === 'kuafor-kartvizit-baski' || activeKey === 'kozmetik-guzellik-merkezi-baski' || activeKey === 'e-ticaret-perakende-baski' || activeKey === 'egitim-kurumlari-baski' || activeKey === 'kutu-ambalaj-baski-cozumleri') ? 'Güncel Ürün ve Adet Seçenekleri' : 'Net Ürün & Adet Çözümleri'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Copy Area */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Editorial Content */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-neutral-100 space-y-10">
            {page.sections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight flex items-center gap-2 border-b border-gray-100 pb-2">
                  <Briefcase size={20} className="text-primary shrink-0" />
                  {section.title}
                </h2>
                {section.paragraphs.map((para, pIdx) => (
                  <React.Fragment key={pIdx}>
                    <p className={`leading-relaxed text-sm sm:text-base ${(activeKey === 'kozmetik-guzellik-merkezi-baski' || activeKey === 'egitim-kurumlari-baski' || activeKey === 'kutu-ambalaj-baski-cozumleri' || activeKey === 'e-ticaret-perakende-baski') ? 'text-gray-700 font-normal' : 'text-gray-700 font-medium'}`}>
                      {para}
                    </p>
                    {/* Görsel 4: Dosya Kontrolü ve PDF Prova (Kuaför) */}
                    {activeKey === 'kuafor-kartvizit-baski' && sIdx === 3 && pIdx === 2 && (
                      SECTOR_IMAGE_MANIFEST.kuafor["kartvizit-dosya-kontrolu-pdf-prova.webp"] ? (
                        <SeoContentImage
                          src="/images/sektor/kuafor-kartvizit/kartvizit-dosya-kontrolu-pdf-prova.webp"
                          alt="Kuaför kartviziti baskı öncesi dosya kontrolü ve PDF prova süreci"
                          width={900}
                          height={650}
                          loading="lazy"
                          caption="Baskıya hazır dosya kontrolü ve PDF prova onayı"
                        />
                      ) : (
                        <ImagePlaceholder
                          number={4}
                          title="Dosya Kontrolü ve PDF Prova"
                          aspectRatio="900 / 650"
                        />
                      )
                    )}
                    {/* Görsel 4: Dosya Kontrolü ve PDF Prova (Restoran - 3. adımdan sonra) */}
                    {activeKey === 'restoran-brosur-baski' && sIdx === 2 && pIdx === 2 && (
                      SECTOR_IMAGE_MANIFEST.restoran["restoran-brosur-dosya-kontrolu-pdf-prova.webp"] ? (
                        <SeoContentImage
                          src="/images/sektor/restoran-brosur/restoran-brosur-dosya-kontrolu-pdf-prova.webp"
                          alt="Restoran broşürü baskı öncesi dosya kontrolü ve PDF prova süreci"
                          width={900}
                          height={650}
                          loading="lazy"
                          caption="Baskıya hazır dosya kontrolü ve PDF prova onayı"
                        />
                      ) : (
                        <ImagePlaceholder
                          number={4}
                          title="Dosya Kontrolü ve PDF Prova"
                          aspectRatio="900 / 650"
                        />
                      )
                    )}
                  </React.Fragment>
                ))}

                {/* Görsel 2: Selefon ve Yüzey Seçenekleri (Kuaför) */}
                {activeKey === 'kuafor-kartvizit-baski' && sIdx === 1 && (
                  SECTOR_IMAGE_MANIFEST.kuafor["kuafor-kartvizit-selefon-secenekleri.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/kuafor-kartvizit/kuafor-kartvizit-selefon-secenekleri.webp"
                      alt="Mat ve parlak selefonlu kuaför kartviziti baskı seçenekleri"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Mat selefon, parlak selefon, lokal lak ve oval köşe seçenekleri"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={2}
                      title="Selefon ve Yüzey Seçenekleri"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 2: Kâğıt ve Katlama Seçenekleri (Restoran) */}
                {activeKey === 'restoran-brosur-baski' && sIdx === 0 && (
                  SECTOR_IMAGE_MANIFEST.restoran["restoran-brosur-kagit-katlama-secenekleri.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/restoran-brosur/restoran-brosur-kagit-katlama-secenekleri.webp"
                      alt="Restoran broşürü için kuşe kâğıt ve katlama seçenekleri"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="115 gr ve 130 gr kuşe, tek ve çok kırımlı broşür seçenekleri"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={2}
                      title="Kâğıt ve Katlama Seçenekleri"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 2: Parfüm ve Kozmetik Kutusu Bristol Seçenekleri (Kozmetik Sağlık) */}
                {activeKey === 'kozmetik-guzellik-saglik-baski' && sIdx === 0 && (
                  SECTOR_IMAGE_MANIFEST.kozmetik["parfum-kozmetik-kutusu-bristol-secenekleri.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/kozmetik-guzellik-saglik/parfum-kozmetik-kutusu-bristol-secenekleri.webp"
                      alt="300, 350 ve 400 gr Bristol parfüm ve kozmetik kutusu seçenekleri"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="300, 350 ve 400 gr Bristol parfüm ve kozmetik kutusu seçenekleri"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={2}
                      title="Parfüm ve Kozmetik Kutusu Bristol Seçenekleri"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 2: Güzellik Merkezi Formları ve Danışan Kayıt (Güzellik Merkezi) */}
                {activeKey === 'kozmetik-guzellik-merkezi-baski' && sIdx === 0 && (
                  SECTOR_IMAGE_MANIFEST.kozmetikGuzellikMerkezi["guzellik-merkezi-formlari-danisan-kayit.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/kozmetik-guzellik-merkezi/guzellik-merkezi-formlari-danisan-kayit.webp"
                      alt="Güzellik merkezi danışan kayıt, konsültasyon ve işlem takip formları"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Güzellik merkezi danışan kayıt, konsültasyon ve işlem takip formları"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={2}
                      title="Güzellik Merkezi Formları ve Danışan Kayıt"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 2: E-Ticaret Ürün Kutusu ve Kargo Paketleme (E-Ticaret Perakende) */}
                {activeKey === 'e-ticaret-perakende-baski' && sIdx === 0 && (
                  SECTOR_IMAGE_MANIFEST.eTicaretPerakende["e-ticaret-urun-kutusu-kargo-paketleme.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/e-ticaret-perakende/e-ticaret-urun-kutusu-kargo-paketleme.webp"
                      alt="E-ticaret ürün kutuları ve kargo paketleme çözümleri"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Oluklu mukavva ve Bristol e-ticaret kargo kutusu seçenekleri"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={2}
                      title="E-Ticaret Ürün Kutusu ve Kargo Paketleme"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 2: Deneme Sınavı, Soru Kitapçığı ve Fasikül (Eğitim Kurumları) */}
                {activeKey === 'egitim-kurumlari-baski' && sIdx === 0 && (
                  SECTOR_IMAGE_MANIFEST.egitimKurumlari?.["deneme-sinavi-soru-kitapcigi-fasikul.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/egitim-kurumlari/deneme-sinavi-soru-kitapcigi-fasikul.webp"
                      alt="TYT AYT LGS deneme sınavı, soru kitapçığı, fasikül ve yaprak test baskıları"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="TYT AYT LGS deneme sınavı, soru kitapçığı, fasikül ve yaprak test baskıları"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={2}
                      title="Deneme Sınavı, Soru Kitapçığı ve Fasikül Baskıları"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 3: Randevu Kartı ve QR Kod Örneği (Kuaför) */}
                {activeKey === 'kuafor-kartvizit-baski' && sIdx === 2 && (
                  SECTOR_IMAGE_MANIFEST.kuafor["kuafor-randevu-karti-qr-kod.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/kuafor-kartvizit/kuafor-randevu-karti-qr-kod.webp"
                      alt="QR kod ve randevu alanı bulunan çift yönlü kuaför kartviziti"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="İletişim, sosyal medya, QR kod ve randevu alanı örneği"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={3}
                      title="Randevu Kartı ve QR Kod"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 3: Restoran Menü Broşürü Tasarımı (Restoran) */}
                {activeKey === 'restoran-brosur-baski' && sIdx === 1 && (
                  SECTOR_IMAGE_MANIFEST.restoran["restoran-menu-brosuru-tasarim.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/restoran-brosur/restoran-menu-brosuru-tasarim.webp"
                      alt="Yemek kategorileri ve sipariş bilgileri bulunan restoran menü broşürü tasarımı"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Menü kategorileri, iletişim bilgileri ve sipariş alanı düzeni"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={3}
                      title="Restoran Menü Broşürü Tasarımı"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 3: Epilasyon ve Botoks İşlem Takip Formları (Kozmetik Sağlık) */}
                {activeKey === 'kozmetik-guzellik-saglik-baski' && sIdx === 1 && (
                  SECTOR_IMAGE_MANIFEST.kozmetik["epilasyon-botoks-islem-takip-formlari.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/kozmetik-guzellik-saglik/epilasyon-botoks-islem-takip-formlari.webp"
                      alt="Epilasyon, botoks ve cilt bakımı işlem takip formları"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Epilasyon, botoks ve cilt bakımı işlem takip formları"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={3}
                      title="Epilasyon ve Botoks İşlem Takip Formları"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 3: Lazer Epilasyon ve Seans Takip Formu (Güzellik Merkezi) */}
                {activeKey === 'kozmetik-guzellik-merkezi-baski' && sIdx === 1 && (
                  SECTOR_IMAGE_MANIFEST.kozmetikGuzellikMerkezi["lazer-epilasyon-seans-takip-formu.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/kozmetik-guzellik-merkezi/lazer-epilasyon-seans-takip-formu.webp"
                      alt="Lazer epilasyon seans takip formu ve güzellik merkezi seans çizelgesi"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Lazer epilasyon seans takip formu ve güzellik merkezi seans çizelgesi"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={3}
                      title="Lazer Epilasyon ve Seans Takip Formu"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 3: Saten ve Polyester İpli Karton Çanta (E-Ticaret Perakende) */}
                {activeKey === 'e-ticaret-perakende-baski' && sIdx === 1 && (
                  SECTOR_IMAGE_MANIFEST.eTicaretPerakende["saten-polyester-ipli-karton-canta.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/e-ticaret-perakende/saten-polyester-ipli-karton-canta.webp"
                      alt="Saten ve polyester ipli lüks karton çanta ve kraft poşet baskısı"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="230–300 gr Bristol saten veya polyester ipli karton çantalar"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={3}
                      title="Saten ve Polyester İpli Karton Çanta"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 3: Öğrenci Kayıt ve Takip Formları (Eğitim Kurumları) */}
                {activeKey === 'egitim-kurumlari-baski' && sIdx === 1 && (
                  SECTOR_IMAGE_MANIFEST.egitimKurumlari?.["ogrenci-kayit-takip-formlari.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/egitim-kurumlari/ogrenci-kayit-takip-formlari.webp"
                      alt="Öğrenci kayıt, veli bilgi, rehberlik, etüt ve başarı takip formu baskıları"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Öğrenci kayıt, veli bilgi, rehberlik, etüt ve başarı takip formu baskıları"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={3}
                      title="Öğrenci Kayıt ve Takip Formları"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 4: Sözleşme, Tahsilat Makbuzu ve Senet Formları (Kozmetik Sağlık) */}
                {activeKey === 'kozmetik-guzellik-saglik-baski' && sIdx === 2 && (
                  SECTOR_IMAGE_MANIFEST.kozmetik["sozlesme-tahsilat-makbuzu-senet-formlari.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/kozmetik-guzellik-saglik/sozlesme-tahsilat-makbuzu-senet-formlari.webp"
                      alt="Güzellik merkezi sözleşmesi, tahsilat makbuzu ve ödeme takip formları"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Güzellik merkezi sözleşmesi, tahsilat makbuzu ve ödeme takip formları"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={4}
                      title="Sözleşme, Tahsilat Makbuzu ve Senet Formları"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 4: Güzellik Merkezi Sözleşmesi ve Tahsilat Makbuzu (Güzellik Merkezi) */}
                {activeKey === 'kozmetik-guzellik-merkezi-baski' && sIdx === 2 && (
                  SECTOR_IMAGE_MANIFEST.kozmetikGuzellikMerkezi["guzellik-merkezi-sozlesme-tahsilat-makbuzu.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/kozmetik-guzellik-merkezi/guzellik-merkezi-sozlesme-tahsilat-makbuzu.webp"
                      alt="Güzellik merkezi hizmet sözleşmesi ve otokopili tahsilat makbuzu"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Güzellik merkezi hizmet sözleşmesi ve otokopili tahsilat makbuzu"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={4}
                      title="Güzellik Merkezi Sözleşmesi ve Tahsilat Makbuzu"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 4: Baskılı Ambalaj Kâğıdı ve Teşekkür Kartı (E-Ticaret Perakende) */}
                {activeKey === 'e-ticaret-perakende-baski' && sIdx === 2 && (
                  SECTOR_IMAGE_MANIFEST.eTicaretPerakende["baskili-ambalaj-kagidi-tesekkur-karti.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/e-ticaret-perakende/baskili-ambalaj-kagidi-tesekkur-karti.webp"
                      alt="Logo baskılı pelür ambalaj kâğıdı ve müşteri teşekkür kartları"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Pelür ve sülfit ambalaj kâğıdı ile paket içi teşekkür kartları"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={4}
                      title="Baskılı Ambalaj Kâğıdı ve Teşekkür Kartı"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 4: Eğitim Broşür, Afiş ve Katalog (Eğitim Kurumları) */}
                {activeKey === 'egitim-kurumlari-baski' && sIdx === 2 && (
                  SECTOR_IMAGE_MANIFEST.egitimKurumlari?.["egitim-brosur-afis-katalog.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/egitim-kurumlari/egitim-brosur-afis-katalog.webp"
                      alt="Eğitim kurumları için kayıt broşürü, afiş, katalog ve tanıtım materyalleri"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Eğitim kurumları için kayıt broşürü, afiş, katalog ve tanıtım materyalleri"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={4}
                      title="Eğitim Broşür, Afiş ve Katalog"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 5: Randevu Kartı, Broşür ve Karton Çanta (Kozmetik Sağlık) */}
                {activeKey === 'kozmetik-guzellik-saglik-baski' && sIdx === 3 && (
                  SECTOR_IMAGE_MANIFEST.kozmetik["randevu-karti-brosur-karton-canta.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/kozmetik-guzellik-saglik/randevu-karti-brosur-karton-canta.webp"
                      alt="Hasta randevu kartı, tanıtım broşürü ve kozmetik karton çantası"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Hasta randevu kartı, tanıtım broşürü ve kozmetik karton çantası"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={5}
                      title="Randevu Kartı, Broşür ve Karton Çanta"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 5: Parfüm ve Kozmetik Kutusu Bristol Seçenekleri (Güzellik Merkezi) */}
                {activeKey === 'kozmetik-guzellik-merkezi-baski' && sIdx === 3 && (
                  SECTOR_IMAGE_MANIFEST.kozmetikGuzellikMerkezi["parfum-kozmetik-kutusu-300-350-400-gr.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/kozmetik-guzellik-merkezi/parfum-kozmetik-kutusu-300-350-400-gr.webp"
                      alt="300, 350 ve 400 gr Bristol parfüm ve kozmetik kutusu seçenekleri"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="300, 350 ve 400 gr Bristol parfüm ve kozmetik kutusu seçenekleri"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={5}
                      title="300, 350 ve 400 Gr Bristol Parfüm ve Kozmetik Kutuları"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 5: Barkod, Koli, Adres ve Ürün Etiketleri (E-Ticaret Perakende) */}
                {activeKey === 'e-ticaret-perakende-baski' && sIdx === 3 && (
                  SECTOR_IMAGE_MANIFEST.eTicaretPerakende["barkod-koli-adres-urun-etiketleri.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/e-ticaret-perakende/barkod-koli-adres-urun-etiketleri.webp"
                      alt="Rulo termal barkod, kuşe koli adres ve raf etiketleri"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Rulo termal barkod, kuşe koli adres ve suya dayanıklı etiketler"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={5}
                      title="Barkod, Koli, Adres ve Ürün Etiketleri"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 6: Randevu Kartı, Broşür, Etiket ve Karton Çanta (Güzellik Merkezi) */}
                {activeKey === 'kozmetik-guzellik-merkezi-baski' && sIdx === 4 && (
                  SECTOR_IMAGE_MANIFEST.kozmetikGuzellikMerkezi["randevu-karti-brosur-etiket-karton-canta.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/kozmetik-guzellik-merkezi/randevu-karti-brosur-etiket-karton-canta.webp"
                      alt="Randevu kartı, tanıtım broşürü, kozmetik etiketi ve karton çanta"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Randevu kartı, tanıtım broşürü, kozmetik etiketi ve karton çanta"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={6}
                      title="Randevu Kartı, Broşür, Etiket ve Karton Çanta"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 5: Baskı, Kesim ve Paketleme Süreci (Kuaför) */}
                {activeKey === 'kuafor-kartvizit-baski' && sIdx === 3 && (
                  SECTOR_IMAGE_MANIFEST.kuafor["kartvizit-baski-kesim-paketleme.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/kuafor-kartvizit/kartvizit-baski-kesim-paketleme.webp"
                      alt="Kartvizit baskı, hassas kesim ve kargo için paketleme aşamaları"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Baskı, kesim ve paketleme aşamaları"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={5}
                      title="Baskı, Kesim ve Paketleme"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 5: Baskı, Kırım ve Paketleme Süreci (Restoran) */}
                {activeKey === 'restoran-brosur-baski' && sIdx === 2 && (
                  SECTOR_IMAGE_MANIFEST.restoran["restoran-brosur-baski-kirim-paketleme.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/restoran-brosur/restoran-brosur-baski-kirim-paketleme.webp"
                      alt="Restoran broşürlerinin baskı, kırım ve kargo için paketleme aşamaları"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Baskı, kırım, paketleme ve gönderim aşamaları"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={5}
                      title="Baskı, Kırım ve Paketleme"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 5: Çocuk Etkinlik Kitapları ve Eğitici Kartlar (Eğitim Kurumları) */}
                {activeKey === 'egitim-kurumlari-baski' && sIdx === 4 && (
                  SECTOR_IMAGE_MANIFEST.egitimKurumlari?.["cocuk-etkinlik-kitabi-egitici-kart.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/egitim-kurumlari/cocuk-etkinlik-kitabi-egitici-kart.webp"
                      alt="Çocuk etkinlik kitabı, boyama kitabı, eğitici oyun kartı ve flashcard setleri"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Çocuk etkinlik kitabı, boyama kitabı, eğitici oyun kartı ve flashcard setleri"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={5}
                      title="Çocuk Etkinlik Kitabı ve Eğitici Kart Setleri"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 6: Eğitim Seti Kutusu ve Kurumsal Okul Ürünleri (Eğitim Kurumları) */}
                {activeKey === 'egitim-kurumlari-baski' && sIdx === 5 && (
                  SECTOR_IMAGE_MANIFEST.egitimKurumlari?.["egitim-seti-kutusu-kurumsal-urunler.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/egitim-kurumlari/egitim-seti-kutusu-kurumsal-urunler.webp"
                      alt="Eğitim seti kutusu, cepli dosya, karton çanta, sertifika ve kurumsal okul ürünleri"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Eğitim seti kutusu, cepli dosya, karton çanta, sertifika ve kurumsal okul ürünleri"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={6}
                      title="Eğitim Seti Kutusu ve Kurumsal Ürünler"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 2: İlaç, Medikal, Parfüm ve Kozmetik Kutuları (Kutu ve Ambalaj) */}
                {activeKey === 'kutu-ambalaj-baski-cozumleri' && sIdx === 1 && (
                  SECTOR_IMAGE_MANIFEST.kutuAmbalaj?.["ilac-medikal-parfum-kozmetik-kutulari.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/kutu-ambalaj/ilac-medikal-parfum-kozmetik-kutulari.webp"
                      alt="İlaç, medikal ürün, vitamin, parfüm ve kozmetik kutusu modelleri"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="İlaç, medikal, vitamin, parfüm ve kozmetik kutusu modelleri"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={2}
                      title="İlaç, Medikal, Parfüm ve Kozmetik Kutuları"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 3: Zurna Dürüm, Taco ve Fast-Food Kutuları (Kutu ve Ambalaj) */}
                {activeKey === 'kutu-ambalaj-baski-cozumleri' && sIdx === 2 && (
                  SECTOR_IMAGE_MANIFEST.kutuAmbalaj?.["zurna-durum-taco-fast-food-kutulari.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/kutu-ambalaj/zurna-durum-taco-fast-food-kutulari.webp"
                      alt="Zurna dürüm kutusu, klasik dürüm, taco ve fast-food servis kutusu seçenekleri"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Zurna dürüm, taco, burger ve fast-food paket servis kutuları"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={3}
                      title="Zurna Dürüm, Taco ve Fast-Food Kutuları"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 4: Popcorn, Cips ve Atıştırmalık Kutuları (Kutu ve Ambalaj) */}
                {activeKey === 'kutu-ambalaj-baski-cozumleri' && sIdx === 3 && (
                  SECTOR_IMAGE_MANIFEST.kutuAmbalaj?.["popcorn-cips-atistirmalik-kutulari.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/kutu-ambalaj/popcorn-cips-atistirmalik-kutulari.webp"
                      alt="Popcorn kutusu, patlamış mısır, cips ve atıştırmalık servis kutuları"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Popcorn, patlamış mısır, cips ve atıştırmalık servis kutuları"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={4}
                      title="Popcorn, Cips ve Atıştırmalık Kutuları"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 5: Baklava, Pasta, Kurabiye ve Çikolata Kutuları (Kutu ve Ambalaj) */}
                {activeKey === 'kutu-ambalaj-baski-cozumleri' && sIdx === 4 && (
                  SECTOR_IMAGE_MANIFEST.kutuAmbalaj?.["baklava-pasta-kurabiye-cikolata-kutulari.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/kutu-ambalaj/baklava-pasta-kurabiye-cikolata-kutulari.webp"
                      alt="Baklava kutusu, pasta, kurabiye, lokum ve pencereli çikolata kutuları"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Baklava, pasta, kurabiye, lokum ve çikolata kutusu seçenekleri"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={5}
                      title="Baklava, Pasta, Kurabiye ve Çikolata Kutuları"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                {/* Görsel 6: Etiket, Ambalaj Kâğıdı ve Karton Çanta (Kutu ve Ambalaj) */}
                {activeKey === 'kutu-ambalaj-baski-cozumleri' && sIdx === 5 && (
                  SECTOR_IMAGE_MANIFEST.kutuAmbalaj?.["etiket-ambalaj-kagidi-karton-canta.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/kutu-ambalaj/etiket-ambalaj-kagidi-karton-canta.webp"
                      alt="Kutu ve kavanoz etiketi, baskılı ambalaj kâğıdı ve karton çanta ürünleri"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Kutu ve kavanoz etiketi, pelür ambalaj kâğıdı ve karton taşıma çantaları"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={6}
                      title="Etiket, Ambalaj Kâğıdı ve Karton Çanta"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

              </section>
            ))}

            {/* Eğitim Kurumları Özel Baskı Paketleri */}
            {activeKey === 'egitim-kurumlari-baski' && (
              <div className="pt-8 border-t border-gray-100 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-black uppercase tracking-tight">
                      Eğitim Kurumları İçin Baskı Paketleri
                    </h2>
                    <p className="text-xs font-medium text-gray-500 mt-0.5">
                      İhtiyacınıza uygun ürün grubu, tiraj ve teknik özelliklere göre özel teklif hazırlanmaktadır
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Sınav Matbaası Paketi",
                      desc: "Deneme kitapçığı, soru kitapçığı, cevap anahtarı, çözüm kitapçığı ve değerlendirme formu"
                    },
                    {
                      title: "Kayıt Dönemi Paketi",
                      desc: "Broşür, afiş, katalog, cepli dosya, kayıt sözleşmesi ve kayıt formları"
                    },
                    {
                      title: "Şube Matbaası Paketi",
                      desc: "Kartvizit, antetli kâğıt, zarf, form, makbuz, dosya ve kurumsal evraklar"
                    },
                    {
                      title: "Eğitim Yayınları Paketi",
                      desc: "Soru bankası, fasikül, yaprak test, konu anlatım föyü ve deneme kitapçığı"
                    },
                    {
                      title: "Çocuk Eğitim Paketi",
                      desc: "Boyama kitabı, etkinlik kitabı, eğitici kart, flashcard ve kutulu eğitim seti"
                    },
                    {
                      title: "Kurumsal Eğitim Paketi",
                      desc: "Karton çanta, broşür, katalog, bloknot, öğrenci kartı ve sertifika"
                    }
                  ].map((pkg, pIdx) => (
                    <div key={pIdx} className="bg-neutral-50/70 border border-neutral-200/80 rounded-2xl p-5 hover:border-primary/50 transition-all flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                          <h3 className="font-black text-sm text-neutral-900 uppercase tracking-tight">{pkg.title}</h3>
                        </div>
                        <p className="text-xs text-neutral-600 leading-relaxed">{pkg.desc}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-neutral-200/50 flex items-center justify-between text-[11px] text-neutral-500 font-medium">
                        <span>Özel Ölçü & Tiraj</span>
                        <a 
                          href={`https://wa.me/905366022373?text=${encodeURIComponent(pkg.title + ' hakkında bilgi ve fiyat teklifi almak istiyorum.')}`}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-primary font-bold hover:underline inline-flex items-center gap-1"
                        >
                          Teklif İste →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-neutral-500 italic bg-neutral-50 p-3 rounded-xl border border-neutral-200/60">
                  * Eğitim paketleri sabit fiyatlı standart paket olmayıp; kurumunuzun talep ettiği sayfa sayısı, kâğıt gramajı, baskı renkleri ve sipariş adedine göre özel olarak fiyatlandırılmaktadır.
                </p>
              </div>
            )}

            {/* Sektörel Tercih Edilen Ürün Baskı Tipleri (Vertical Linking) */}
            {cluster && (
              <div id={activeKey === 'egitim-kurumlari-baski' ? "egitim-baski-urunleri" : activeKey === 'kutu-ambalaj-baski-cozumleri' ? "kutu-ambalaj-urunleri" : "ilgili-baski-urunleri"} className="pt-8 border-t border-gray-100 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-black uppercase tracking-tight">
                      {activeKey === 'kuafor-kartvizit-baski'
                        ? 'Kuaför ve Güzellik Salonları İçin Önerilen Baskı Ürünleri'
                        : activeKey === 'restoran-brosur-baski'
                        ? 'Restoranlar İçin İlgili Baskı Ürünleri'
                        : activeKey === 'kozmetik-guzellik-merkezi-baski'
                        ? 'Güzellik Merkezi ve Kozmetik Markaları İçin Baskı Ürünleri'
                        : activeKey === 'kozmetik-guzellik-saglik-baski'
                        ? 'Kozmetik ve Güzellik Merkezleri İçin İlgili Baskı Ürünleri'
                        : activeKey === 'e-ticaret-perakende-baski'
                        ? 'E-Ticaret ve Perakende İçin Baskı & Ambalaj Ürünleri'
                        : activeKey === 'egitim-kurumlari-baski'
                        ? 'Eğitim Kurumları İçin Önerilen Baskı Ürünleri'
                        : activeKey === 'kutu-ambalaj-baski-cozumleri'
                        ? 'Kutu ve Ambalaj İçin Önerilen Baskı Ürünleri'
                        : 'Bu Sektörde En Çok Tercih Edilen Baskı Tipleri'
                      }
                    </h2>
                    <p className="text-xs font-medium text-gray-500 mt-0.5">
                      {activeKey === 'kuafor-kartvizit-baski'
                        ? 'Kuaför, berber ve güzellik salonlarının kullanımına uygun baskı seçenekleri'
                        : activeKey === 'restoran-brosur-baski'
                        ? 'Restoran, lokanta ve paket servis işletmelerine uygun tamamlayıcı baskı seçenekleri'
                        : activeKey === 'kozmetik-guzellik-merkezi-baski'
                        ? 'Güzellik merkezleri ve kozmetik markaları için tamamlayıcı matbaa ve ambalaj çözümleri'
                        : activeKey === 'kozmetik-guzellik-saglik-baski'
                        ? 'Kozmetik markaları, güzellik merkezleri ve klinikler için tamamlayıcı matbaa ürünleri'
                        : activeKey === 'e-ticaret-perakende-baski'
                        ? 'E-ticaret markaları, online mağazalar ve perakende işletmeleri için tamamlayıcı ambalaj çözümleri'
                        : activeKey === 'egitim-kurumlari-baski'
                        ? 'Okullar, kurs merkezleri, etüt merkezleri ve eğitim yayıncıları için tamamlayıcı matbaa çözümleri'
                        : activeKey === 'kutu-ambalaj-baski-cozumleri'
                        ? 'İlaç, kozmetik, fast-food, tatlı, gıda ve perakende ürünleri için tamamlayıcı kutu ve ambalaj çözümleri'
                        : 'Sektörünüze özel tavsiye edilen matbaa ve baskı çözümleri'
                      }
                    </p>
                  </div>
                </div>

                {/* Görsel 6: Kuaförlere Yönelik İlgili Baskı Ürünleri */}
                {activeKey === 'kuafor-kartvizit-baski' && (
                  SECTOR_IMAGE_MANIFEST.kuafor["kuafor-guzellik-salonu-baski-urunleri.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/kuafor-kartvizit/kuafor-guzellik-salonu-baski-urunleri.webp"
                      alt="Kuaför ve güzellik salonları için kartvizit, broşür, magnet ve etiket baskıları"
                      width={1200}
                      height={800}
                      loading="lazy"
                      caption="Kuaför ve güzellik salonlarına uygun tamamlayıcı baskı ürünleri"
                      figureClassName="rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 p-2 shadow-sm my-6"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={6}
                      title="Kuaför Baskı Ürünleri"
                      aspectRatio="1200 / 800"
                    />
                  )
                )}

                {/* Görsel 6: Restoran Baskı Ürünleri */}
                {activeKey === 'restoran-brosur-baski' && (
                  SECTOR_IMAGE_MANIFEST.restoran["restoran-paket-servis-baski-urunleri.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/restoran-brosur/restoran-paket-servis-baski-urunleri.webp"
                      alt="Restoran ve paket servis işletmeleri için broşür, magnet, menü ve ambalaj baskıları"
                      width={1200}
                      height={800}
                      loading="lazy"
                      caption="Restoran ve paket servis işletmelerine uygun tamamlayıcı baskı ürünleri"
                      figureClassName="rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 p-2 shadow-sm my-6"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={6}
                      title="Restoran Baskı Ürünleri"
                      aspectRatio="1200 / 800"
                    />
                  )
                )}

                {/* Görsel 6: Kozmetik ve Güzellik Merkezi Baskı Çözümleri / Etiket ve Föy */}
                {activeKey === 'kozmetik-guzellik-saglik-baski' && (
                  SECTOR_IMAGE_MANIFEST.kozmetik["kozmetik-etiket-urun-bilgilendirme-foyu.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/kozmetik-guzellik-saglik/kozmetik-etiket-urun-bilgilendirme-foyu.webp"
                      alt="Kozmetik etiketi ve katlamalı ürün bilgilendirme föyü baskısı"
                      width={1200}
                      height={800}
                      loading="lazy"
                      caption="Kozmetik etiketi ve katlamalı ürün bilgilendirme föyü baskısı"
                      figureClassName="rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 p-2 shadow-sm my-6"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={6}
                      title="Kozmetik Etiketi ve Ürün Bilgilendirme Föyü"
                      aspectRatio="1200 / 800"
                    />
                  )
                )}

                {/* Görsel 6: Amerikan Servis ve Perakende Baskı Ürünleri (E-Ticaret Perakende) */}
                {activeKey === 'e-ticaret-perakende-baski' && (
                  SECTOR_IMAGE_MANIFEST.eTicaretPerakende["amerikan-servis-perakende-baski-urunleri.webp"] ? (
                    <SeoContentImage
                      src="/images/sektor/e-ticaret-perakende/amerikan-servis-perakende-baski-urunleri.webp"
                      alt="Amerikan servis ve perakende işletmeleri için tamamlayıcı baskı ürünleri"
                      width={900}
                      height={650}
                      loading="lazy"
                      caption="Amerikan servis, karton çanta, kargo kutusu ve etiket ürünleri"
                      figureClassName="rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 p-2 shadow-sm my-6"
                    />
                  ) : (
                    <ImagePlaceholder
                      number={6}
                      title="Amerikan Servis ve Perakende Baskı Ürünleri"
                      aspectRatio="900 / 650"
                    />
                  )
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cluster.popularPrints.map((print, pIdx) => {
                    const isExternal = print.path.startsWith('http');
                    if (isExternal) {
                      return (
                        <a 
                          key={pIdx} 
                          href={print.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group p-5 bg-neutral-50 hover:bg-neutral-900 border border-neutral-100 hover:border-neutral-900 transition-all rounded-2xl flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-primary font-bold tracking-wider uppercase bg-primary/10 px-2.5 py-1 rounded-md group-hover:bg-primary group-hover:text-black">
                                {print.tag || "Baskı Çözümü"}
                              </span>
                            </div>
                            <h4 className="text-sm sm:text-base font-extrabold text-neutral-950 group-hover:text-white transition-colors">
                              {print.text}
                            </h4>
                            <p className={`text-xs mt-2 ${(activeKey === 'kozmetik-guzellik-merkezi-baski' || activeKey === 'e-ticaret-perakende-baski') ? 'text-neutral-500 font-normal group-hover:text-neutral-300' : 'text-neutral-500 font-medium group-hover:text-neutral-400'}`}>
                              {print.spec}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-primary mt-4 group-hover:text-primary-400">
                            {(print as { cta?: string }).cta || "Fiyat Teklifi Al"} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </a>
                      );
                    }

                    return (
                      <Link 
                        key={pIdx} 
                        to={print.path} 
                        className="group p-5 bg-neutral-50 hover:bg-neutral-900 border border-neutral-100 hover:border-neutral-900 transition-all rounded-2xl flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-primary font-bold tracking-wider uppercase bg-primary/10 px-2.5 py-1 rounded-md group-hover:bg-primary group-hover:text-black">
                              {print.tag || "Baskı Çözümü"}
                            </span>
                          </div>
                          <h4 className="text-sm sm:text-base font-extrabold text-neutral-950 group-hover:text-white transition-colors">
                            {print.text}
                          </h4>
                          <p className={`text-xs mt-2 ${(activeKey === 'kozmetik-guzellik-merkezi-baski' || activeKey === 'e-ticaret-perakende-baski') ? 'text-neutral-500 font-normal group-hover:text-neutral-300' : 'text-neutral-500 font-medium group-hover:text-neutral-400'}`}>
                            {print.spec}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-primary mt-4 group-hover:text-primary-400">
                          {(print as { cta?: string }).cta || "Fiyat Listesini İncele"} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* FAQ Accordion Section */}
            <div className="pt-8 border-t border-gray-100 space-y-6">
              <h3 className="text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2">
                <HelpCircle size={24} className="text-primary" /> Sık Sorulan Sorular
              </h3>
              <div className="space-y-4">
                {page.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100 space-y-2" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                    <h4 className="text-base sm:text-lg font-bold text-primary flex items-start gap-2">
                      <span className="text-black/30">Q.</span> <span itemProp="name">{faq.question}</span>
                    </h4>
                    <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p itemProp="text" className={`leading-relaxed pl-6 text-sm sm:text-base ${(activeKey === 'kozmetik-guzellik-merkezi-baski' || activeKey === 'e-ticaret-perakende-baski') ? 'text-gray-700 font-normal' : 'text-gray-700 font-medium'}`}>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Quick CTA & SEO Link Block */}
        <div className="lg:col-span-4 space-y-8">
          {/* Main Booking Panel */}
          <div className="bg-black text-white p-8 rounded-3xl border border-neutral-800 shadow-xl relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <FileText className="mx-auto text-primary mb-4" size={44} />
            <span className="text-xs text-primary font-bold uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">Matbaa Teklif &amp; Sipariş</span>
            <h3 className="text-2xl font-black text-white mt-4 mb-3 uppercase tracking-tight">Hızlı Online İletişim</h3>
            <p className={`text-sm mb-6 leading-relaxed text-center ${(activeKey === 'kozmetik-guzellik-merkezi-baski' || activeKey === 'e-ticaret-perakende-baski') ? 'text-gray-400 font-normal' : 'text-gray-400 font-medium'}`}>
              {activeKey === 'kuafor-kartvizit-baski'
                ? "Kuaför kartviziti, randevu kartı, hizmet broşürü, el ilanı ve magnet baskısı için ürün, adet ve özellik bilgilerinize göre fiyat teklifi alın."
                : activeKey === 'restoran-brosur-baski'
                ? "Restoran broşürü, paket servis magneti, Amerikan servis ve menü baskıları için ürün ve adet bilgilerinizi ileterek teklif alın."
                : activeKey === 'kozmetik-guzellik-merkezi-baski'
                ? "Güzellik merkezi formları, lazer epilasyon seans takip formları, hizmet sözleşmesi, tahsilat makbuzu, hasta randevu kartı, kozmetik kutusu ve etiket baskısı için ürün ve adet bilgilerinizi ileterek fiyat teklifi alın."
                : activeKey === 'e-ticaret-perakende-baski'
                ? "E-ticaret kargo kutusu, karton çanta, ambalaj kâğıdı, rulo barkod etiketi ve müşteri teşekkür kartı baskısı için ürün ve adet bilgilerinizi ileterek fiyat teklifi alın."
                : "Sektörünüze özel matbaa ve baskı ihtiyaçlarınız için ürün ve adet bilgilerinizi WhatsApp üzerinden ileterek net teklif alın."
              }
            </p>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1 w-full py-4 bg-primary text-white hover:bg-white hover:text-black transition-colors rounded-2xl font-black text-sm tracking-wide uppercase shadow-lg">
              <span className="flex items-center gap-2 justify-center">
                <PhoneCall size={18} /> WhatsApp Teklif Hattı
              </span>
              <span className="text-sm tracking-wider opacity-95 block font-bold">
                {PHONE_NUMBER}
              </span>
            </a>
          </div>

          {/* Sibling Links / Benzer Baskı Çözümleri (Horizontal Linking within Cluster - Filtered to avoid duplication) */}
          {siblingLinks.length > 0 && (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
                <div className="w-8 h-8 bg-neutral-100 text-neutral-800 rounded-lg flex items-center justify-center shrink-0">
                  <Tag size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-black uppercase tracking-tight">Benzer Baskı Çözümleri</h3>
                  <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest mt-0.5">{cluster?.name}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {siblingLinks.map((link, lIdx) => (
                  <Link 
                    key={lIdx} 
                    to={link.path} 
                    className="flex items-center justify-between p-3.5 bg-neutral-50 hover:bg-primary/5 hover:text-primary rounded-xl border border-neutral-100 transition-all group"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-neutral-800 group-hover:text-primary transition-colors">{link.text}</span>
                    <ArrowRight size={14} className="text-neutral-400 group-hover:translate-x-1 group-hover:text-primary transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Sektörel Hub List / İlgili Baskı Kategorileri */}
          {activeClusterKey === 'KUAFOR' || page.path === '/sektor/kuafor-kartvizit-baski' || page.path === '/sektor/restoran-brosur-baski' ? null : (
            <>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
                <h3 className="text-sm font-black text-black mb-4 uppercase tracking-tight border-b border-gray-100 pb-3">
                  Sektörel Matbaa Çözümleri
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <Link to="/sektor/restoran-brosur-baski" className="p-3 bg-neutral-50 border border-neutral-100 hover:border-primary/30 rounded-xl text-center flex flex-col items-center justify-center gap-1.5 transition-all group">
                    <Utensils size={18} className="text-neutral-500 group-hover:text-primary" />
                    <span className="text-[10px] font-bold text-neutral-700">RESTORAN</span>
                  </Link>
                  <Link to="/sektor/emlakci-kartvizit-baski" className="p-3 bg-neutral-50 border border-neutral-100 hover:border-primary/30 rounded-xl text-center flex flex-col items-center justify-center gap-1.5 transition-all group">
                    <HomeIcon size={18} className="text-neutral-500 group-hover:text-primary" />
                    <span className="text-[10px] font-bold text-neutral-700">EMLAK</span>
                  </Link>
                  <Link to="/sektor/fast-food-cips-kutusu-baski" className="p-3 bg-neutral-50 border border-neutral-100 hover:border-primary/30 rounded-xl text-center flex flex-col items-center justify-center gap-1.5 transition-all group">
                    <Layers size={18} className="text-neutral-500 group-hover:text-primary" />
                    <span className="text-[10px] font-bold text-neutral-700">AMBALAJ</span>
                  </Link>
                  <Link to="/sektor/kafe-menu-baski" className="p-3 bg-neutral-50 border border-neutral-100 hover:border-primary/30 rounded-xl text-center flex flex-col items-center justify-center gap-1.5 transition-all group">
                    <Coffee size={18} className="text-neutral-500 group-hover:text-primary" />
                    <span className="text-[10px] font-bold text-neutral-700">KAFE</span>
                  </Link>
                </div>
              </div>

              {/* Internal Link Suggestions */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
                <h3 className="text-sm font-black text-black mb-6 uppercase tracking-tight border-b border-gray-100 pb-2">Popüler Baskı Hizmetlerimiz</h3>
                <div className="grid grid-cols-1 gap-3">
                  {page.internalLinks.map((link, lIdx) => (
                    <Link 
                      key={lIdx} 
                      to={link.path} 
                      className="flex items-center justify-between p-3 bg-neutral-50 hover:bg-primary/5 hover:text-primary rounded-xl border border-neutral-100 transition-all group"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-neutral-800 group-hover:text-primary transition-colors">{link.text}</span>
                      <ArrowRight size={14} className="text-neutral-400 group-hover:translate-x-1 group-hover:text-primary transition-all shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Türkiye Geneli Kargo Teslimatı Bilgisi */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-neutral-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold text-xs uppercase tracking-wider">
              <MapPin size={16} /> Kargo ve Teslimat Bilgilendirmesi
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-neutral-950 uppercase tracking-tight">Türkiye Geneli Kargo ve Teslimat</h3>
            <p className="text-xs sm:text-sm font-medium text-neutral-600 max-w-2xl">
              Türkiye geneline anlaşmalı kargo ile gönderim yapılmaktadır.
            </p>
          </div>
          <Link
            to="/teslimat-sartlari"
            className="px-6 py-3.5 bg-neutral-900 hover:bg-primary hover:text-black text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shrink-0"
          >
            Teslimat Koşullarını İncele →
          </Link>
        </div>
      </div>
    </div>
  );
};

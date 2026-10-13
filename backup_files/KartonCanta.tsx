import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { 
  ChevronDown, 
  ChevronRight, 
  ShoppingCart, 
  ShieldCheck, 
  Truck, 
  HeartHandshake, 
  Timer,
  Phone,
  Scale,
  Settings,
  HelpCircle,
  Clock,
  Layers,
  Sparkles,
  Scissors,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { useCart, ProductSEOSection, FireWarning } from '../App';
import { LOCAL_ASSETS } from '../constants/assets';
import { CategoryHero } from './CategoryHero';
import { WHATSAPP_LINK } from '../constants/contact';
import { RelatedBlogPosts } from './RelatedBlogPosts';
import { DeliveryBadge } from './DeliveryBadge';

export const KARTON_CANTA_DATA = [
  {
    ebat: "16x25x6 cm",
    items: [
      { code: "KC15-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "500 Adet", price: "8.900 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC15-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "500 Adet", price: "8.900 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC11-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "11.650 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC11-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "11.650 ₺", image: LOCAL_ASSETS.karton_canta },
    ]
  },
  {
    ebat: "27x16x6 cm",
    items: [
      { code: "KC25-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "500 Adet", price: "10.110 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC25-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "500 Adet", price: "10.110 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC21-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "13.520 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC21-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "13.520 ₺", image: LOCAL_ASSETS.karton_canta },
    ]
  },
  {
    ebat: "25x37x8 cm",
    items: [
      { code: "KC35-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "500 Adet", price: "10.000 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC35-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "500 Adet", price: "10.000 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC31-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "14.400 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC31-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "14.400 ₺", image: LOCAL_ASSETS.karton_canta },
    ]
  },
  {
    ebat: "51x33x13 cm",
    items: [
      { code: "KC45-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "500 Adet", price: "13.850 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC45-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "500 Adet", price: "13.850 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC41-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "21.300 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC41-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon - Uygulama Yok", miktar: "1.000 Adet", price: "21.300 ₺", image: LOCAL_ASSETS.karton_canta },
    ]
  }
];

const KARTON_CANTA_GALLERY = [
  {
    src: "/images/karton-canta/ipli-karton-canta-ornegi.webp",
    alt: "İpli karton çanta baskısı, Amerikan Bristol üzerine mat selefon kaplamalı logo baskılı mağaza poşeti",
    title: "İpli ve Selefonlu Kurumsal Karton Çanta",
    desc: "Yüksek dayanımlı Amerikan Bristol kağıt üzeri ofset baskılı, mat veya parlak selefon kaplamalı ve şık pamuk kordon ipli taşıma çantası."
  },
  {
    src: "/images/karton-canta/karton-canta-baski-detayi.webp",
    alt: "Butik giyim mağazası için logo baskılı karton poşet imalatı ve şık kordon sap detayı",
    title: "Butik Mağazası İçin Karton Poşet",
    desc: "Tekstil ve moda butikleri için özel olarak tasarlanmış, marka değerini sokağa taşıyan estetik ve prestijli körüklü karton poşetler."
  },
  {
    src: "/images/karton-canta/karton-canta-baski-fiyatlari.webp",
    alt: "Toptan karton çanta baskı fiyatları, kurumsal promosyon ve fuar çantası üretim aşaması",
    title: "Karton Çanta İmalatı ve Baskısı",
    desc: "Uygun toptan fiyatlarla, işletmenize özel ebat ve özelliklerde kaliteli ofset baskı teknikleriyle hazırlanan karton çantalar."
  },
  {
    src: "/images/karton-canta/karton-canta-tasarimi.webp",
    alt: "Özel tasarım lüks karton çanta, kabartma laklı ve gümüş varak yaldız baskılı marka ambalajı",
    title: "Kurumsal Logo Baskılı Karton Çanta",
    desc: "Ön ve yan körük alanlarında marka logo, slogan ve kurumsal kimlik çizgilerinizle donatılmış çanta tasarımları."
  },
  {
    src: "/images/karton-canta/magaza-karton-canta-baski.webp",
    alt: "Kozmetik ve saat mağazaları için özel ölçülerde üretilen ipli karton poşet modelleri",
    title: "Lüks Fuar ve Mağaza Çantaları",
    desc: "Kurumsal etkinliklerde, fuarlarda, lansmanlarda veya perakende alışveriş noktalarında müşterilerinize sunacağınız şık taşıma ambalajı."
  },
  {
    src: "/images/karton-canta/karton_canta-baski.webp",
    alt: "Türkiye geneli kargo teslimatlı, dayanıklı taban destekli toptan kraft karton çanta imalatı",
    title: "Sağlam Karton Çantalar",
    desc: "Taban kısmına yerleştirilen kalın mukavemet destek kartonu sayesinde ağır yük taşımaya dayanıklı çanta modelleri."
  }
];

const KARTON_CANTA_FAQ = [
  {
    q: "Baskılı karton poşet üretiminde minimum sipariş miktarı nedir?",
    a: "Logolu poşet veya ipli karton poşet baskılarında minimum sipariş miktarı, tercih edilen model ve ölçüye göre değişiklik göstermektedir. Güncel minimum sipariş miktarı için bizimle iletişime geçebilirsiniz."
  },
  {
    q: "Kurumsal poşet üzerine firma logosu ve kurumsal tasarım basılabilir mi?",
    a: "Evet. Özel üretim poşetler firmanızın logosu, kurumsal renkleri ve iletişim bilgileriyle firmanıza özel olarak yüksek kaliteli ofset baskı tekniğiyle üretilebilmektedir."
  },
  {
    q: "Alışveriş çantası modelleri hangi ölçülerde üretilebilmektedir?",
    a: "Standart taşıma çantası ölçülerinin yanı sıra ihtiyacınıza uygun özel ebatlarda da promosyon çantası üretimi yapılabilmektedir. Ürününüze en uygun ölçü konusunda destek sağlayabiliriz."
  },
  {
    q: "Hangi baskılı taşıma çantası malzemelerini tercih edebilirim?",
    a: "Logolu poşetler; Amerikan Bristol, Kraft ve farklı gramaj seçenekleriyle üretilebilmektedir. Kullanım alanınıza ve kurumsal kimliğinize uygun malzeme tercih edebilirsiniz."
  },
  {
    q: "Mat ve parlak selefon uygulanabiliyor mu?",
    a: "Evet. Baskının daha dayanıklı ve şık görünmesi için ipli karton poşet modellerine isteğe bağlı olarak mat veya parlak selefon kaplama uygulanabilmektedir."
  },
  {
    q: "Baskılı karton poşet modelleri dayanıklı mı?",
    a: "Evet. Kaliteli karton malzeme ve taban destek kartonu sayesinde kurumsal poşetler günlük kullanımda dayanıklı ve uzun ömürlü bir kullanım sunmaktadır."
  },
  {
    q: "Promosyon çantası baskısı kaç günde tamamlanır?",
    a: "Grafik tasarım onayının ardından alışveriş çantası üretimi genellikle 4-6 iş günü içerisinde tamamlanarak kargoya teslim edilmektedir."
  },
  {
    q: "Türkiye'nin her yerine gönderim yapıyor musunuz?",
    a: "Evet. Üretilen taşıma çantası siparişleriniz özenle paketlenerek tüm il ve ilçelere güvenli şekilde kargo ile gönderilmektedir."
  },
  {
    q: "İpli karton poşet siparişi nasıl verebilirim?",
    a: "Sipariş vermek için baskıda kullanılacak logo, tasarım ve sipariş bilgilerini bizimle paylaşmanız yeterlidir. Tasarım onayının ardından üretim süreci başlatılarak özel üretim poşetleriniz hazırlanır."
  }
];

const SECTORS = [
  "Giyim Mağazaları",
  "Kozmetik & Parfüm",
  "Ayakkabı & Deri",
  "Kuyumcu & Sarraf",
  "Saat & Aksesuar",
  "Gözlük & Optik",
  "Telefon & Teknoloji",
  "Altın & Takı Tasarım",
  "Fuarlar & Kongreler",
  "Pastaneler",
  "Çikolata & Şekerleme",
  "Cafe & Restoran",
  "Mobilya Mağazaları",
  "Ev Tekstili",
  "Bebek & Çocuk Giyim",
  "Hediyelik Eşya & Kitap",
  "Kurumsal Firmalar",
  "Oteller",
  "Spa & Güzellik",
  "Klinikler & Eczaneler"
];

const DynamicImageContainer = ({ 
  src, 
  alt, 
  title, 
  className = "",
  imgClassName = ""
}: { 
  src: string; 
  alt: string; 
  title?: string; 
  className?: string;
  imgClassName?: string;
}) => {
  return (
    <div className={`overflow-hidden rounded-xl bg-white mb-4 flex items-center justify-center p-1.5 w-full aspect-[4/3] relative transition-all duration-300 border border-gray-100 ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer"
        className={`w-full h-full object-contain rounded-lg transition-all duration-300 ${imgClassName}`} 
      />
    </div>
  );
};

export const KartonCantaPage = () => {
  const { openProductDetail } = useCart();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const openWhatsApp = (item: any, ebat: string) => {
    openProductDetail({ ...item, ebat }, "Karton Çanta");
  };

  // Flatten products for row-spanning logic in the table
  const flatItems: any[] = [];
  KARTON_CANTA_DATA.forEach((group) => {
    group.items.forEach((item, index) => {
      flatItems.push({
        ...item,
        ebat: group.ebat,
        groupIndex: index, // 0 to 3
        groupSize: group.items.length // 4
      });
    });
  });

  const halfFaqLength = Math.ceil(KARTON_CANTA_FAQ.length / 2);
  const leftFaqs = KARTON_CANTA_FAQ.slice(0, halfFaqLength);
  const rightFaqs = KARTON_CANTA_FAQ.slice(halfFaqLength);

  // --- JSON-LD Structured Data / Schema.org ---
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": KARTON_CANTA_FAQ.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Karton Çanta Baskı Fiyatları | İpli Karton Poşet İmalatı - Mavi Basım</title>
        <meta name="description" content="Karton çanta baskı, ipli karton poşet, logo baskılı mağaza çantası ve lüks karton ambalaj çözümleri. İstanbul Topkapı üretim, Türkiye geneli kargo, uygun fiyat ve hızlı teslimat." />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 text-black animate-in fade-in duration-500">
        <CategoryHero
          title="Karton Çanta Baskı Fiyatları &amp; İpli Karton Poşet İmalatı"
          badge="Amerikan Bristol / Kroma Karton - Taban Takviyeli"
          description={
            <div className="space-y-2">
              <p>
                Mavi Basım olarak İstanbul Topkapı imalat tesisimizde mağazalar, butikler ve kurumsal firmalar için taban takviyeli, ipli logo baskılı şık <strong className="text-slate-900">karton çanta</strong> imalatı yapıyoruz. Ambalaj çözümlerinizi <Link to="/kutu" className="text-primary hover:underline font-bold">karton kutu</Link>, <Link to="/etiket" className="text-primary hover:underline font-bold">yapışkanlı etiket</Link>, <Link to="/kataloglar" className="text-primary hover:underline font-bold">ürün kataloğu</Link> ve <Link to="/kartvizit" className="text-primary hover:underline font-bold">kartvizit</Link> ile tamamlayabilirsiniz.
              </p>
            </div>
          }
          relatedLinks={[
            { label: "Karton Kutu Baskı", path: "/kutu" },
            { label: "Sticker Etiket", path: "/etiket" },
            { label: "Katalog Baskı", path: "/kataloglar" },
            { label: "Cepli Dosya", path: "/dosyalar" }
          ]}
          customCtaText="Özel Ebat Çanta Teklifi Al"
        />

        {/* Dynamic Delivery Date Banner */}
        <DeliveryBadge categoryKey="karton-canta" days={5} variant="banner" className="my-6" />

        {/* FİYAT LİSTESİ TABLOSU */}
        <div className="scroll-mt-24 group mb-12">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-secondary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2 flex-wrap">
                Karton Çanta Fiyat Listesi
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-150 text-[11px] font-bold">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>210 gr. Amerikan Bristol - 4 Renk</span>
            </div>
          </div>

          <p className="text-gray-650 text-xs sm:text-sm font-semibold mb-6 px-2 leading-relaxed">
            Aşağıdaki tabloda güncel karton çanta baskı fiyatlarımızı inceleyebilirsiniz. Üretim süreçlerinde kalın destek kartonları ve mukavemetli ipler standart olarak uygulanmaktadır.
          </p>

          <div className="bg-white rounded-2xl shadow-xl border-2 border-slate-300 overflow-visible relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[11px] md:text-[13px] font-sans border-2 border-slate-300">
                <thead>
                  <tr className="bg-black text-white border-b-2 border-slate-300 text-center font-black uppercase tracking-tight">
                    <th className="p-4 w-10"></th>
                    <th className="p-4 w-24 border-r-2 border-slate-700/30">KOD</th>
                    <th className="p-4 text-center border-r-2 border-slate-700/30">ADET</th>
                    <th className="p-4 text-center border-r-2 border-slate-700/30">EBAT</th>
                    <th className="p-4 text-left border-r-2 border-slate-700/30">AÇIKLAMA</th>
                    <th className="p-4 w-32 border-r-2 border-slate-700/30">FİYAT</th>
                    <th className="p-4 w-44 text-center">SİPARİŞ</th>
                  </tr>
                </thead>
                <tbody>
                  {flatItems.map((item, idx) => {
                    const isFirstRow = idx === 0;
                    const isGroupFirstRow = item.groupIndex === 0;

                    return (
                      <tr 
                        key={idx} 
                        className={`${
                          item.groupIndex === item.groupSize - 1 && idx < flatItems.length - 1
                            ? 'border-b-4 border-primary'
                            : 'border-b-2 border-slate-200'
                        } hover:bg-primary/5 hover:shadow-[inset_4px_0_0_0_#29ADDF] transition-all cursor-default group`}
                      >
                        {isFirstRow && (
                          <td 
                            rowSpan={flatItems.length}
                            className="bg-primary text-white font-black text-center p-1 w-10 border-r-2 border-slate-300/40"
                            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                          >
                            <span className="tracking-[0.1em] uppercase text-[10px] md:text-[12px] whitespace-nowrap">KARTON ÇANTA</span>
                          </td>
                        )}
                        <td className="p-3 text-center font-bold text-primary border-r-2 border-slate-200 group-hover:text-secondary transition-colors">{item.code}</td>
                        <td className="p-3 text-center text-black font-medium border-r-2 border-slate-200">{item.miktar}</td>
                        {isGroupFirstRow && (
                          <td 
                            rowSpan={item.groupSize} 
                            className="p-3 text-center text-black font-black border-r-2 border-slate-200 align-middle text-sm md:text-base whitespace-nowrap bg-gray-50/10"
                          >
                            {item.ebat}
                          </td>
                        )}
                        <td className="p-3 text-left font-medium border-r-2 border-slate-200 text-black">
                          {item.desc}
                        </td>
                        <td className="p-3 text-center font-black text-black border-r-2 border-slate-200 bg-gray-50/30 group-hover:bg-primary/5 text-[14px] md:text-[16px] transition-colors">{item.price}</td>
                        <td className="p-3 text-center">
                          <button 
                            onClick={() => openWhatsApp(item, item.ebat)}
                            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-4 py-2 rounded-full text-xs md:text-sm font-black tracking-tight leading-none transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
                          >
                            <ShoppingCart size={14} className="shrink-0" />
                            <span>Hemen Sipariş Ver</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 px-5 py-3 border-t border-gray-150 rounded-b-2xl flex flex-col sm:flex-row justify-center items-center text-xs text-slate-500 font-medium font-sans">
              <span>* Tabloda belirtilen fiyatlarımıza %20 KDV dahil değildir.</span>
            </div>
          </div>
          <div className="mt-4">
            <FireWarning />
          </div>
        </div>

        {/* ÜRÜN FOTOĞRAFLARI GALERİSİ (6 Resim) */}
        <div className="mb-12 scroll-mt-24">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-7 bg-primary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Karton Çanta Ürün Fotoğrafları Galerisi
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {KARTON_CANTA_GALLERY.map((img, idx) => (
              <figure 
                key={idx} 
                className="bg-gray-50 border border-gray-150 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-primary/40 hover:bg-white hover:shadow-md transition-all group"
              >
                <DynamicImageContainer 
                  src={img.src} 
                  alt={img.alt} 
                  title={img.title} 
                  imgClassName="group-hover:scale-105"
                />
                <div className="mt-2">
                  <h3 className="text-sm font-black text-black uppercase mb-1.5">{img.title}</h3>
                  <figcaption className="text-gray-550 text-xs font-semibold leading-relaxed">
                    {img.desc}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>

        {/* Sipariş Oluşturma Adımları */}
        <div className="mb-12 mt-6 bg-sky-50/50 border border-sky-100 rounded-[2rem] p-5 flex flex-col sm:flex-row items-center gap-4 shadow-sm text-black">
          <span className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-lg shrink-0 font-bold">💬</span>
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-black text-slate-900 uppercase mb-0.5">Sipariş Oluşturma Adımları</h4>
            <p className="text-xs text-slate-650 font-semibold leading-relaxed">
              Fiyat listesinde dilediğiniz seçeneğin yanında yer alan <strong>"Hemen Sipariş Ver"</strong> butonuna tıklayarak WhatsApp destek hattımız üzerinden sipariş oluşturabilirsiniz. Tasarım onayınızın ardından üretim süreci başlatılır.
            </p>
          </div>
        </div>

        {/* ÖNCELİK 2: FİYATI ETKİLEYEN FAKTÖRLER */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Karton Çanta Fiyatını Neler Belirler?
            </h2>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8">
            <p className="text-sm font-semibold text-gray-650 mb-6 leading-relaxed text-justify">
              Karton çanta baskı fiyatları, siparişinizin teknik özellikleri ve üretim parametrelerine bağlı olarak değişiklik gösterir. Siparişlerinizi optimize ederek en uygun bütçeyle en yüksek kaliteyi elde etmek için aşağıdaki faktörleri inceleyebilirsiniz:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                { title: "Sipariş Adedi", desc: "Tüm matbaa süreçlerinde olduğu gibi üretim adedi arttıkça, kalıp ve kurulum maliyetleri dağılacağı için birim çanta fiyatı ciddi oranda düşer." },
                { title: "Çanta Ölçüsü (Ebat)", desc: "En, boy ve körük genişliği doğrudan kullanılan kağıt miktarını ve tabaka boyutunu belirlediği için malzeme maliyetini doğrudan etkiler." },
                { title: "Kağıt Gramajı & Türü", desc: "Genellikle tercih edilen 210 gr veya daha kalın olan 250 gr Amerikan Bristol kağıt seçimi çanta maliyetlerinde rol oynar." },
                { title: "Mat veya Parlak Selefon", desc: "Kağıt yüzeyine uygulanan koruyucu laminasyon selefonun çeşidine göre (mat veya parlak) malzeme girdi fiyatları farklılık gösterir." },
                { title: "İp / Sap Seçeneği", desc: "Çantalarda standart pamuk kordon ipler dışında uygulanan saten kurdele, PP kordon veya özel büküm kağıt saplar maliyeti etkiler." },
                { title: "Lak ve Varak Yaldız", desc: "Çantanın üzerine lokal parlatma (lak) veya altın/gümüş varak yaldız uygulamaları ekstra klişe ve işçilik süreci ekler." },
                { title: "Özel Kesim ve Kırım", desc: "Standart ebatlarımızın dışındaki pencereli kesimler veya özel geometrik formlar ekstra bıçak yapımı ve kırım işçiliği gerektirir." },
                { title: "Renk Sayısı", desc: "4 renk standart CMYK ofset baskı yerine uygulanacak özel kurumsal Pantone renk sayıları kalıp ve boya maliyetini belirler." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm">
                  <h3 className="font-black text-primary uppercase text-xs mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-650 font-semibold leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ÖNCELİK 3: ÜRETİM SÜRECİ */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-secondary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Karton Çanta Nasıl Üretiliyor? (Adım Adım Üretim Süreci)
            </h2>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8">
            <p className="text-sm font-semibold text-gray-650 mb-6 leading-relaxed">
              Mavi Basım güvencesiyle siparişini verdiğiniz karton çantaların tasarımdan kargoya kadar olan tüm hassas imalat aşamalarını aşağıda bulabilirsiniz:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Grafik Tasarım", desc: "Logonuz ve firma bilgileriniz seçilen çanta ebadının teknik bıçak şablonu üzerine milimetrik olarak yerleştirilir." },
                { step: "2", title: "PDF Prova ve Onay", desc: "Hazırlanan dijital tasarım onay için tarafınıza iletilir. Sizin onayınız alınmadan kesinlikle baskıya başlanmaz." },
                { step: "3", title: "Ofset Baskı", desc: "CTP kalıpları çekilerek yüksek teknolojili ofset baskı makinelerimizde renk geçişleri pürüzsüz şekilde kağıda aktarılır." },
                { step: "4", title: "Selefon Kaplama", desc: "Baskılı tabakalar mat veya parlak selefon makinesinde lamine edilerek neme ve yırtılmaya karşı dirençli hale getirilir." },
                { step: "5", title: "Bıçak Kesim & Kırım", desc: "Pedallı veya kazanlı kesim makinelerinde çantanın katlanma kanalları (kırım izleri) ezilerek profesyonelce kesilir." },
                { step: "6", title: "Takviye & Katlama", desc: "Çantanın tabanına kalın mukavemet kartonu yerleştirilir, ağız katlama alanları mukavva ile desteklenerek yapıştırılır." },
                { step: "7", title: "Kordon İp Montajı", desc: "Açılan deliklerden şık pamuk kordon ipler veya kurdeleler geçirilerek el işçiliğiyle sağlam şekilde düğümlenir." },
                { step: "8", title: "Paketleme & Kargo", desc: "Son kalite kontrolleri yapılan çantalar özenle kolilenerek anlaşmalı kargomuz ile Türkiye'nin 81 il ve ilçesine güvenli şekilde sevk edilir." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-black shrink-0 text-xs">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-black text-black uppercase text-xs mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-650 font-semibold leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ÖNCELİK 4: GERÇEK TEKNİK BİLGİ */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Karton Çanta Baskısında Teknik Bilgiler ve Malzeme Seçimi
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 uppercase mb-3">Amerikan Bristol Neden Kullanılır?</h3>
              <p className="text-xs text-slate-700 font-semibold leading-relaxed text-justify">
                Amerikan Bristol (Sülfat Karton), bir yüzü pürüzsüz, çok katmanlı, parlak beyazlığa sahip ve yüksek mukavemetli bir karton türüdür. Karton çanta imalatında bu malzemenin seçilmesinin temel nedeni, katlama çizgilerinde (kırımlarda) çatlama yapmaması, çantanın dik ve rijit durmasını sağlamasıdır. Ağır ürünler taşındığında esneme yapmaz ve taban yapısının bozulmasını engeller.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 uppercase mb-3">210 gr. ile 250 gr. Kağıt Arasındaki Fark</h3>
              <p className="text-xs text-slate-700 font-semibold leading-relaxed text-justify">
                210 gr Amerikan Bristol kağıt, hafif giyim, kozmetik, hediyelik eşyalar ve katalog taşımaları için ideal, standart kalitede ekonomik bir malzemedir. 250 gr Amerikan Bristol ise kâğıdın kalınlığını ve tokluğunu belirgin ölçüde artırır. Ağır palto, mont, ayakkabı kutusu veya lüks saat-mücevher kutuları taşınacaksa, yırtılma direncini maksimuma çıkarmak için 250 gr tercih edilmesi önerilir.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 uppercase mb-3">Mat Selefon Ne İşe Yarar?</h3>
              <p className="text-xs text-slate-700 font-semibold leading-relaxed text-justify">
                Mat selefon, baskı yüzeyini kaplayan yansıma önleyici ve çizilmeye dayanıklı mat lamine katmandır. Karton poşetin ipeksi bir dokuya (velvet dokusu) sahip olmasını sağlar, parmak izi lekelerini büyük ölçüde gizler ve kurumsal markalara prestijli, ağırbaşlı ve elit bir duruş kazandırır.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-black text-slate-900 uppercase mb-3">Parlak Selefon Ne İşe Yarar?</h3>
              <p className="text-xs text-slate-700 font-semibold leading-relaxed text-justify">
                Parlak selefon, baskının renklerini çok daha canlı, doygun ve ışıl ışıl gösteren şeffaf laminasyondur. Çantanın dış etkenlere (su damlaları, çamur, sürtünmeler) karşı mukavemetini en üst düzeye çıkarır. Dinamik, çok renkli veya beyaz zeminli tasarımlarda renk kontrastını vurgulamak için mükemmel bir alternatiftir.
              </p>
            </div>
          </div>
        </div>

        {/* ÖNCELİK 5: KULLANIM ALANLARI (20 Sektör bento-grid yapısı) */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Karton Çanta Kullanım Alanları ve Sektörler
            </h2>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8 text-xs sm:text-sm font-semibold leading-relaxed">
            <p className="text-gray-650 mb-6 font-semibold">
              Özel üretim ipli karton poşet ve toptan baskılı ambalaj çantalarımız, marka bilinirliğini sokaklara taşımak amacıyla geniş bir yelpazedeki sektörler tarafından aktif olarak tercih edilmektedir:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
              {SECTORS.map((sectorName, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-150 shadow-sm flex flex-col items-center text-center justify-center hover:border-primary/20 hover:shadow-md transition-all min-h-[64px]">
                  <span className="text-xs font-black text-black uppercase leading-tight">{sectorName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Karton Çanta Ölçüleri Nasıl Seçilir? */}
        <div className="mb-12 text-black">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-secondary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Karton Çanta Ölçüleri Nasıl Seçilir?
            </h2>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8">
            <p className="text-sm font-semibold text-gray-650 mb-6 leading-relaxed">
              Karton taşıma çantası siparişinizde ürünlerinizin boyutuna ve ağırlığına en uygun ölçüyü seçmek, profesyonel ambalaj görüntüsü kazandırır:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                { size: "16x25x6 cm", desc: "Küçük boy ipli karton poşet", items: "Takı kutuları, parfümler, kozmetik setleri ve hafif promosyon hediyelikleri için en çok tercih edilen ideal ebattır." },
                { size: "27x16x6 cm", desc: "Yatay orta boy baskılı karton poşet", items: "Cüzdanlar, fularlar, şallar, gözlük kutuları ve yatay formdaki şık butik hediyeleri için mükemmel bir seçimdir." },
                { size: "25x37x8 cm", desc: "Dikey standart boy karton çanta", items: "Gömlek, bluz, katalog, promosyon dökümanları ve standart kitap-dergi boylarındaki ürünler için en popüler ebatımızdır." },
                { size: "51x33x13 cm", desc: "Büyük boy lüks taşıma poşeti", items: "Mont, ceket, ayakkabı kutusu, büyük boy oyuncak veya kalın kurumsal hediyelik setlerin taşınmasında yırtılma direnciyle öne çıkar." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm">
                  <div className="text-lg font-black text-primary mb-1">{item.size}</div>
                  <h4 className="font-black text-black uppercase text-xs mb-2">{item.desc}</h4>
                  <p className="text-xs text-gray-650 font-semibold leading-relaxed">{item.items}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Karton Çanta Baskı Özellikleri */}
        <div className="mb-12 text-black">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Karton Çanta Baskı Özellikleri
            </h2>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "CMYK Ofset Baskı", desc: "Yüksek çözünürlüklü ve full renkli pürüzsüz görsel baskı kalitesi sunarak fotoğraflarınızı ve renkli logolarınızı canlı gösterir." },
                { title: "Pantone Baskı", desc: "Markanıza özel kurumsal renk kodlarının birebir tutarlılıkla basılmasına ve renk sapmalarının önlenmesine imkan tanır." },
                { title: "Mat & Parlak Selefon", desc: "Mat veya parlak selefon uygulanabilir." },
                { title: "Lokal & Kabartma Lak", desc: "Sadece logonuzun veya seçtiğiniz desenlerin üzerine parlak ve hafif kabarık doku ekleyerek göz alıcı bir estetik kazandırır." },
                { title: "Sıcak Varak Yaldız", desc: "Altın, gümüş veya bakır varak kaplamalarla logo baskılı karton çanta modelinize lüks ve prestijli bir ışıltı katar." },
                { title: "Gofre (Kabartma)", desc: "Logo veya kurumsal sembollerinizin kağıt üzerinde dışa doğru kabartılmasıyla şık bir dokunsal derinlik kazandırır." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm">
                  <h3 className="font-black text-primary uppercase text-xs mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-650 font-semibold leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>



        {/* TASARIM REHBERİ */}
        <div className="grid grid-cols-1 gap-8 mb-12 text-black">
          <section className="bg-white p-8 rounded-[32px] border border-gray-150 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Karton Çanta Tasarım Rehberi
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm font-semibold leading-relaxed text-gray-650">
              <div className="bg-gray-50/50 p-5 rounded-xl border border-gray-100">
                <h4 className="font-black text-black uppercase text-xs mb-1.5">Körük ve İç Baskı</h4>
                <p className="text-xs">Çantanın sadece ön ve arka düz kısımlarına değil, körüklü yan katlarına ve hatta şık bir kontrast için çanta içine de renk/logo tasarlayın.</p>
              </div>
              <div className="bg-gray-50/50 p-5 rounded-xl border border-gray-100">
                <h4 className="font-black text-black uppercase text-xs mb-1.5">Sıradışı Minimalizm</h4>
                <p className="text-xs">Tek renk zemin üzerine sadece varak yaldız veya lak uygulanmış bir logo, karmaşık renkli grafiklerden çok daha lüks görünür.</p>
              </div>
              <div className="bg-gray-50/50 p-5 rounded-xl border border-gray-100">
                <h4 className="font-black text-black uppercase text-xs mb-1.5">Taban Takviyesi</h4>
                <p className="text-xs">Taban kısmına yerleştirilecek kalın karton destek parçası ile çantanın ağır nesnelerde altının çöküp yırtılmasını engelleyin. Mavi Basım çantalarında taban karton desteği standarttır.</p>
              </div>
            </div>
          </section>
        </div>

        {/* SIK YAPILAN 5 HATA */}
        <section className="bg-red-50 p-8 md:p-12 rounded-[40px] border border-red-100 mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-red-600 mb-8 uppercase tracking-tight">Karton Çantada Sık Yapılan 5 Hata</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Eksik Bilgi", desc: "Logo veya iletişim bilgileri eksik kalması marka hatırlanabilirliğini azaltır." },
              { title: "Yanlış Ebat", desc: "Ürünün sığmaması veya çantanın fazla boş kalarak estetik dışı görünmesi." },
              { title: "Düşük Kağıt Kalitesi", desc: "Kolay yırtılan veya bükülen dayanıksız malzemelerin seçilmesi." },
              { title: "Renk Uyumsuzluğu", desc: "Kurumsal kimlik çizgileri ve logo ile uyuşmayan baskı renkleri." },
              { title: "Karmaşık Tasarım", desc: "Görsel etkiyi ve algıyı zorlaştıran çok karmaşık tasarımlar." }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-black shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-black text-red-600 uppercase text-sm mb-1">{item.title}</h3>
                  <p className="text-red-900/70 text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* KURUMSAL KİMLİĞİNİZİ GÜÇLENDİRİN */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight text-center">Kurumsal Kimliğinizi Güçlendirin!</h2>
          <p className="text-center text-gray-500 font-medium mb-8">Karton çanta siparişinizin yanına bunları da ekleyebilirsiniz.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Katalog", desc: "Ürünlerinizi detaylı tanıtın.", path: "/kataloglar" },
              { title: "Kartvizit", desc: "Profesyonel imaj yaratın.", path: "/kartvizit" },
              { title: "Antetli Kağıt", desc: "Resmi yazışmalarınız için.", path: "/antetli-kagit" },
              { title: "Zarf", desc: "Kurumsal gönderileriniz için.", path: "/zarf" }
            ].map((product, idx) => (
              <Link key={idx} to={product.path} className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all text-black">
                <h3 className="text-lg font-black text-black mb-2 group-hover:text-primary transition-colors">{product.title}</h3>
                <p className="text-sm font-medium text-gray-500">{product.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* SIKÇA SORULAN SORULAR */}
        <div className="mb-12 scroll-mt-24 text-black">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-6 bg-secondary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Sıkça Sorulan Sorular
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SOL SÜTUN */}
            <div className="space-y-3.5">
              {leftFaqs.map((faq, idx) => {
                const fIdx = idx;
                const isOpen = activeFaq === fIdx;
                return (
                  <div key={fIdx} className="border border-gray-150 rounded-2xl overflow-hidden bg-gray-50/50 hover:bg-white transition-all text-black">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === fIdx ? null : fIdx)}
                      className="w-full text-left p-5 flex justify-between items-center font-bold text-slate-900 focus:outline-none transition-all"
                    >
                      <h3 className="md:text-base text-sm leading-relaxed pr-4 text-black font-bold">{faq.q}</h3>
                      <ChevronDown 
                        size={20} 
                        className={`text-primary transform transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`} 
                      />
                    </button>
                    <motion.div 
                      initial={false}
                      animate={{ 
                        height: isOpen ? "auto" : 0, 
                        opacity: isOpen ? 1 : 0 
                      }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-slate-650 border-t border-gray-100/60 md:text-sm text-xs leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* SAĞ SÜTUN */}
            <div className="space-y-3.5">
              {rightFaqs.map((faq, idx) => {
                const fIdx = idx + halfFaqLength;
                const isOpen = activeFaq === fIdx;
                return (
                  <div key={fIdx} className="border border-gray-150 rounded-2xl overflow-hidden bg-gray-50/50 hover:bg-white transition-all text-black">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === fIdx ? null : fIdx)}
                      className="w-full text-left p-5 flex justify-between items-center font-bold text-slate-900 focus:outline-none transition-all"
                    >
                      <h3 className="md:text-base text-sm leading-relaxed pr-4 text-black font-bold">{faq.q}</h3>
                      <ChevronDown 
                        size={20} 
                        className={`text-primary transform transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`} 
                      />
                    </button>
                    <motion.div 
                      initial={false}
                      animate={{ 
                        height: isOpen ? "auto" : 0, 
                        opacity: isOpen ? 1 : 0 
                      }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-slate-650 border-t border-gray-100/60 md:text-sm text-xs leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <RelatedBlogPosts category="karton-canta" />

      </div>
      <ProductSEOSection categoryKey="karton_canta" />
    </div>
  );
};

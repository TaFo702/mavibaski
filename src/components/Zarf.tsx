import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ChevronDown, 
  ChevronRight, 
  ShoppingCart, 
  Zap, 
  Truck, 
  Phone 
} from 'lucide-react';
import { 
  useCart, 
  FireWarning,
  AgencyDiscountCTA
} from '../App';
import { LOCAL_ASSETS } from '../constants/assets';
import { CategoryHero } from './CategoryHero';
import { RelatedBlogPosts } from './RelatedBlogPosts';
// --- Price Data (Must be preserved for external imports) ---
import { ZARF_DATA } from '../data/extraProductData';
export { ZARF_DATA };

// --- Local Data ---
const ZARF_DETAILS = {
  breadcrumbTitle: "Zarf",
  h1Title: "Diplomat ve Torba Zarf Baskı Fiyatları | Pencereli ve Penceresiz Kurumsal Zarf Baskısı",
    subtitle: "Diplomat ve torba zarf baskı seçenekleri; ürün kodu, ölçü ve adet bilgilerine göre değerlendirilir. 110 gr 1. Hamur kağıt seçeneğiyle pencereli veya penceresiz modeller için sipariş detayları paylaşılır.",
  specifications: [
          {
      title: "Zarf Türleri",
      value: "Pencereli / Penceresiz Diplomat & Torba Zarf",
      desc: "Pencereli veya penceresiz seçenekler ürün ve sipariş detaylarına göre değerlendirilir."
    },
    {
      title: "Kağıt Seçeneği",
      value: "110 gr 1. Sınıf Hamur",
      desc: "110 gr 1. Hamur kağıt seçeneği, ürün kodu ve sipariş detaylarına göre değerlendirilir."
    },
    {
      title: "Kapatma Sistemi",
      value: "Kapatma Bilgisi",
      desc: "Kapatma bilgisi ürün modeli ve sipariş detaylarına göre paylaşılır."
    },
    {
      title: "Baskı Teknolojisi",
      value: "Tek Renk / Renkli",
      desc: "Ürün koduna göre tek renk veya renkli baskı seçenekleri değerlendirilir."
    },
    {
      title: "Sipariş Miktarları",
      value: "500 Adet / 1.000 Adet ve katları",
      desc: "Sipariş miktarı ürün kodu ve ürün detaylarına göre belirlenir."
    },
    {
      title: "Kullanım Alanları",
      value: "Fatura, Sözleşme, Teklif, Evrak Gönderimi",
      desc: "Kullanım alanı ürün ve sipariş detaylarıyla birlikte değerlendirilir."
    }
  ],
  faqList: [
    {
      q: "Zarf baskısında hangi kağıt türü kullanılır",
      a: "Zarf baskılarında 110 gr. 1. Hamur kağıt seçeneği kullanılmaktadır. Kağıt seçimi ürün kodu ve sipariş detaylarına göre değerlendirilir."
    },
    {
      q: "Pencereli ve penceresiz zarf arasındaki fark nedir",
      a: "Pencereli ve penceresiz zarf seçenekleri ürün modeli ve kullanım tercihine göre değerlendirilir."
    },
    {
      q: "Zarflar kendinden yapışkanlı mı",
      a: "Kapatma bilgisi, ürün modeli ve sipariş detaylarına göre paylaşılır."
    },
    {
      q: "Zarf üzerine firma logosu basılabilir mi",
      a: "Zarf üzerine firma logosu, iletişim bilgileri ve kurumsal kimlik unsurları için baskı talebi iletilebilir."
    },
    {
      q: "Zarf hangi ölçülerde basılabilir",
      a: "10.5x24 cm Diplomat Zarf ve 24x32 cm Torba Zarf seçenekleri bulunmaktadır."
    },
    {
      q: "Minimum sipariş adedi nedir",
      a: "Diplomat zarflarda minimum sipariş miktarı 1.000 adet, torba zarflarda ise 500 adettir."
    },
    {
      q: "Tasarım desteği sağlıyor musunuz",
      a: "Logo ve iletişim bilgileri, sipariş detaylarıyla birlikte değerlendirilir."
    },
    {
      q: "Zarf baskısı kaç günde tamamlanır",
      a: "Hazırlık ve gönderim bilgileri, ürün detayları ve sipariş bilgileri netleştirildikten sonra paylaşılır."
    },
    {
      q: "Türkiye'nin her yerine gönderim yapıyor musunuz",
      a: "Gönderim yöntemi ve teslimat bilgileri sipariş detaylarına göre paylaşılır."
    }
    ]
};

const ZARF_GALLERY = [
  {
    src: "/images/zarf/kurumsal-zarf-baski.webp",
    alt: "10.5x24 cm diplomat zarf baskı örneği",
    title: "Kurumsal Diplomat Zarf",
    desc: "10.5x24 cm ölçüsünde diplomat zarf baskı örneği."
  },
  {
    src: "/images/zarf/torba-zarf-baski-ornegi.webp",
    alt: "24x32 cm torba zarf baskı örneği",
    title: "Torba Zarf",
    desc: "24x32 cm ölçüsünde torba zarf baskı örneği."
  },
  {
    src: "/images/zarf/antetli-zarf-tasarimi.webp",
    alt: "Pencereli 10.5x24 cm diplomat zarf örneği",
    title: "Pencereli Diplomat Zarf",
    desc: "10.5x24 cm ölçüsünde pencereli diplomat zarf örneği."
  },
  {
    src: "/images/zarf/penceresiz-diplomat-zarf.webp",
    alt: "Penceresiz 10.5x24 cm diplomat zarf örneği",
    title: "Penceresiz Diplomat Zarf",
    desc: "10.5x24 cm ölçüsünde penceresiz diplomat zarf örneği."
  },
  {
    src: "/images/zarf/zarf-baski.webp",
    alt: "110 gr 1. Hamur üzerinde logo baskılı zarf örneği",
    title: "Logo Baskılı Zarf",
    desc: "110 gr 1. Hamur üzerinde logo baskılı zarf örneği."
  },
  {
    src: "/images/zarf/zarf-baski-detalleri.webp",
    alt: "Zarf kapatma detayı",
    title: "Zarf Kapatma Detayı",
    desc: "Zarf kapatma detayının yakın görünümü."
  }
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

export const ZarfPage = () => {
  const { openProductDetail } = useCart();

  const openWhatsApp = (item: { code: string; price: string; desc: string; ebat: string; miktar: string }) => {
    openProductDetail(item, "Zarf");
  };

  return (
    <div className="bg-white min-h-screen pb-20 animate-in fade-in duration-500">
            {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-100 py-3">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-xs text-gray-500 font-medium" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 flex-wrap">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400" aria-hidden="true">/</span>
                  <Link to="/matbaa" className="text-gray-600 hover:text-primary transition-colors">
                    Matbaa Ürünleri
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400" aria-hidden="true">/</span>
                  <span className="text-gray-900 font-semibold" aria-current="page">Zarf Baskı</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 text-black">
        <CategoryHero
          title="Diplomat Zarf Baskı Fiyatları & Torba Zarf"
          badge="10.5x24 cm Diplomat - Pencereli / Penceresiz"
          description={
            <div className="space-y-2">
              <p>
                Mavi Basım olarak pencereli ve penceresiz diplomat zarf ile 24x32 cm A4 torba <strong className="text-slate-900">zarf baskı</strong> seçeneklerini İstanbul Topkapı 2. Matbaacılar Sitesi hizmet ve koordinasyon noktamız üzerinden planlıyoruz. Kurumsal evrak ve yazışma gönderimleriniz için diplomat veya torba zarf seçeneklerini değerlendirebilirsiniz.
              </p>
            </div>
          }
          relatedLinks={[
            { label: "Antetli Kağıt", path: "/antetli" },
            { label: "Cepli Dosya", path: "/dosyalar" },
            { label: "Kartvizit Baskı", path: "/kartvizit" },
            { label: "Otokopili Makbuz", path: "/makbuz-ve-formlar" }
          ]}
          customCtaText="Diplomat Zarf Teklifi Al"
        />

        {/* Dynamic Delivery Date Banner */}
        
        {/* FİYAT LİSTESİ TABLOSU */}
        <div className="scroll-mt-24 group mb-12">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-secondary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2 flex-wrap">
                Zarf Baskı Fiyatları ve Adetler
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 text-[11px] font-bold">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>110 gr. 1.Hamur</span>
            </div>
          </div>

          <p className="text-gray-650 text-xs sm:text-sm font-semibold mb-6 px-2 leading-relaxed">
  Baskılı zarf fiyatları; diplomat zarf, torba zarf, ürün kodu ve adet bilgilerine göre aşağıdaki tabloda gösterilir. Diplomat zarf fiyatları, torba zarf fiyatları ve logolu zarf fiyatları için uygun ürün kodunu ve adet seçeneğini inceleyerek sipariş talebinizi iletebilirsiniz. Zarf basımı ve torba zarf baskı fiyatları, ürün türü, ölçü ve adet bilgilerine göre değerlendirilir.
</p>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-visible relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[11px] md:text-[13px]">
  <caption className="sr-only">
    Diplomat ve Torba Zarf Baskı Fiyat Listesi
  </caption>
                <thead>
                  <tr className="bg-black text-white border-b border-black">
  <th scope="col" className="p-4 w-10"></th>
  <th scope="col" className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">KOD</th>
  <th scope="col" className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ADET</th>
  <th scope="col" className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">EBAT</th>
  <th scope="col" className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">AÇIKLAMA</th>
  <th scope="col" className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">FİYAT</th>
  <th scope="col" className="p-4 w-44 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">EKSTRA ADET</th>
  <th scope="col" className="p-4 w-44 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 text-center">SİPARİŞ</th>
</tr>
                </thead>
                <tbody>
                  {ZARF_DATA[0].items.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-primary/10 hover:shadow-[inset_4px_0_0_0_#29abe2] transition-all cursor-default group">
                      {idx === 0 && (
                        <th 
  scope="rowgroup"
  rowSpan={ZARF_DATA[0].items.length}
                          className="bg-primary text-white font-black text-center p-1 w-10 border-r border-white/10"
                          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                        >
                          <span className="tracking-[0.1em] uppercase text-[10px]">ZARF</span>
                        </th>
                      )}
                      <td className="p-3 text-center font-bold text-primary border-r border-gray-100 group-hover:text-secondary transition-colors">{item.code}</td>
                      <td className="p-3 text-center text-black font-medium border-r border-gray-100">{item.miktar}</td>
                      <td className="p-3 text-center text-black font-medium border-r border-gray-100">{item.ebat}</td>
                      <td className="p-3 text-center font-medium border-r border-gray-100 text-black">
                        <div className="font-semibold">{item.desc}</div>
                        {item.note && <div className="text-[10px] text-red-600 font-extrabold mt-1">{item.note}</div>}
                      </td>
                      <td className="p-3 text-center font-black text-black border-r border-gray-100 bg-gray-50/30 group-hover:bg-primary/5 text-[14px] md:text-[16px] transition-colors">{item.price}</td>
                      <td className="p-3 text-center font-bold border-r border-gray-100 text-[11px] leading-tight">
                        <span className="text-black">{item.extra} </span>
                        <span className="text-emerald-600 font-extrabold">{item.extraPrice}</span>
                      </td>
                      <td className="p-3 text-center">
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

        {/* ÜRÜN ÖZETİ KUTUSU */}
        <div className="max-w-[1200px] mx-auto mb-10 bg-slate-50 border border-gray-150 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-black text-black uppercase tracking-tight mb-4 flex items-center gap-2">
            <Zap size={16} className="text-primary animate-pulse shrink-0" />
            Zarf Baskı Sipariş Özeti & Kriterleri
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 font-semibold text-xs sm:text-sm">
            <div className="bg-white p-3.5 rounded-xl border border-gray-150">
              <span className="block text-gray-500 font-extrabold mb-1 text-[10px] uppercase tracking-wider">Ürün</span>
              <span className="font-black text-black block leading-snug">Diplomat & Torba Zarf</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-gray-150">
              <span className="block text-gray-500 font-extrabold mb-1 text-[10px] uppercase tracking-wider">Ölçü Seçenekleri</span>
              <span className="font-black text-black block leading-snug">10.5x24 cm / 24x32 cm</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-gray-150">
              <span className="block text-gray-500 font-extrabold mb-1 text-[10px] uppercase tracking-wider">Kağıt Türü</span>
              <span className="font-black text-black block leading-snug">110 gr. 1. Hamur</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-gray-150">
              <span className="block text-gray-500 font-extrabold mb-1 text-[10px] uppercase tracking-wider">Baskı Türü</span>
              <span className="font-black text-black block leading-snug">Tek Renk / Renkli Baskı</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-gray-150">
              <span className="block text-gray-500 font-extrabold mb-1 text-[10px] uppercase tracking-wider">Pencere</span>
              <span className="font-black text-black block leading-snug">Pencereli / Penceresiz</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-gray-150">
              <span className="block text-gray-500 font-extrabold mb-1 text-[10px] uppercase tracking-wider">Sipariş Bilgisi</span>
<span className="font-black text-emerald-600 block leading-snug">Detaylar Netleştirildikten Sonra</span>
            </div>
          </div>
        </div>

        {/* Diplomat Zarf Baskı Avantajları */}
        <div className="mb-10 mt-8 text-black">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Logolu ve Kurumsal Zarf Baskısı
            </h2>
          </div>
          <div className="bg-white border border-gray-150 rounded-3xl p-6 md:p-8 space-y-6 text-xs sm:text-sm font-semibold leading-relaxed text-gray-650 shadow-sm text-justify">
            <p>
              Logolu zarf ve logo baskılı zarf seçeneklerinde firma logosu, kurumsal renkler ve iletişim bilgileri zarf üzerine baskı olarak uygulanabilir. Firmaya özel zarf baskı taleplerinde kullanılacak bilgiler, ürün ve sipariş detaylarıyla birlikte değerlendirilir.
            </p>
            <p>
  Ofis ve kurumsal evrak süreçlerinde kullanılacak zarf modeli; ürün ölçüsü, pencereli veya penceresiz seçenek ve sipariş detaylarına göre değerlendirilir. Alıcı adresinin görünmesi için pencereli diplomat zarf seçeneği tercih edilebilir.
</p>
          </div>
        </div>

        {/* DOĞRU ZARF SEÇİM REHBERİ */}
        <div className="mb-14 text-black">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Pencereli ve Penceresiz Diplomat Zarf Seçim Rehberi
            </h2>
          </div>
          
          <div className="bg-white border border-gray-150 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="text-xs sm:text-sm font-semibold leading-relaxed text-gray-650 space-y-4 text-justify">
              <p>
                İşletmenizin ihtiyaçlarına uygun zarf modelini seçmek; gönderilecek evrakın boyutu, kullanım amacı ve kurumsal görünüm açısından önemlidir. Mavi Basım olarak <strong className="text-black font-black">10.5x24 cm Diplomat Zarf</strong> ve <strong className="text-black font-black">24x32 cm Torba Zarf</strong> seçeneklerinde diplomat zarf baskı, baskılı diplomat zarf ve baskılı torba zarf taleplerini değerlendiriyoruz.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-left">
  <div className="border border-gray-150 p-5 rounded-2xl bg-slate-50/50">
    <h3 className="text-base font-black text-black uppercase mb-3 flex items-center gap-2">
      <span className="w-2.5 h-2.5 bg-primary rounded-full" />
      10.5x24 cm Diplomat Zarf
    </h3>

    <p className="mb-3">
      Diplomat zarf, günlük kurumsal yazışmalarda kullanılan zarf seçeneklerinden biridir. Fatura, teklif dosyası, resmi yazışmalar, sözleşme ve A4 belgelerin üçe katlanarak gönderildiği durumlar için değerlendirilebilir.
    </p>

    <p className="font-extrabold text-black mb-2 text-xs uppercase tracking-wider">
      Diplomat zarf seçenekleri:
    </p>

    <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-650">
      <li>
        <strong className="text-black font-bold">Pencereli Diplomat Zarf:</strong>
        Alıcı adresinin belge üzerinden görünmesine yardımcı olan pencere seçeneğidir.
      </li>
      <li>
        <strong className="text-black font-bold">Penceresiz Diplomat Zarf:</strong>
        Adres bilgileri zarf üzerine basılabilir veya etiket uygulanabilir.
      </li>
    </ul>

    <p className="mt-3 text-xs italic">
      Her iki model için baskı, logo ve iletişim bilgilerinin yerleşimi ürün kodu ve sipariş detaylarına göre değerlendirilir.
    </p>
  </div>

  <div className="border border-gray-150 p-5 rounded-2xl bg-slate-50/50">
    <h3 className="text-base font-black text-black uppercase mb-3 flex items-center gap-2">
      <span className="w-2.5 h-2.5 bg-primary rounded-full" />
      24x32 cm Torba Zarf
    </h3>

    <p className="mb-3">
      Torba zarf, büyük evrakların gönderimi için değerlendirilen 24x32 cm ölçüsündeki zarf seçeneğidir.
    </p>

    <p className="mb-3">
      Torba zarfın kullanım şekli; evrakın ölçüsü, katlanma tercihi ve sipariş detaylarına göre belirlenir.
    </p>

    <p className="font-extrabold text-black mb-2 text-xs uppercase tracking-wider">
      Hangi Zarf Size Uygun?
    </p>

    <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-650">
      <li>
        Günlük yazışmalar ve standart evrak gönderimi için
        <strong className="text-black font-bold"> 10.5x24 cm Diplomat Zarf</strong>
      </li>
      <li>
        Büyük evraklar için
        <strong className="text-black font-bold"> 24x32 cm Torba Zarf</strong>
      </li>
    </ul>
  </div>
</div>

<p className="text-center font-bold text-gray-800 bg-primary/10 p-3 rounded-xl mt-4">
  Ölçü ve baskı tercihi, ürün kodu ve sipariş detaylarına göre belirlenir.
</p>
            </div>
          </div>
        </div>

        {/* TEKNİK ÖZELLİKLER TABLOSU */}
        <div className="mb-14 text-black">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-secondary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Teknik Özellikler Karşılaştırma Tablosu
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-medium">
            {/* Diplomat Zarf Tablosu */}
            <div className="bg-white border border-gray-250 rounded-2xl shadow-sm overflow-hidden text-left">
              <div className="bg-black text-white px-5 py-3 font-black text-xs uppercase tracking-wider">
                10.5x24 cm Diplomat Zarf Özellikleri
              </div>
              <table className="w-full text-xs sm:text-sm">
                <caption className="sr-only">
                  10.5x24 cm Diplomat Zarf Teknik Özellikleri
                </caption>
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-100/60 text-left">
                    <th scope="col" className="px-5 py-3 font-bold text-gray-700 w-1/3">Özellik</th>
                    <th scope="col" className="px-5 py-3 font-bold text-gray-700">Bilgi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 bg-gray-50/30">
                    <th scope="row" className="px-5 py-3 text-gray-500 font-bold w-1/3 text-left">Ürün</th>
                    <td className="px-5 py-3 text-black font-extrabold">Diplomat Zarf</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th scope="row" className="px-5 py-3 text-gray-500 font-bold text-left">Ölçü</th>
                    <td className="px-5 py-3 text-black font-extrabold">10.5x24 cm</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50/30">
                    <th scope="row" className="px-5 py-3 text-gray-500 font-bold text-left">Kağıt</th>
                    <td className="px-5 py-3 text-black font-extrabold">110 gr. 1. Hamur</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th scope="row" className="px-5 py-3 text-gray-500 font-bold text-left">Baskı Türü</th>
                    <td className="px-5 py-3 text-black font-extrabold">Tek Renk / Renkli Baskı</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50/30">
                    <th scope="row" className="px-5 py-3 text-gray-500 font-bold text-left">Renk Modeli</th>
                    <td className="px-5 py-3 text-black font-extrabold">Tek Renk / Renkli Baskı Seçeneği</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th scope="row" className="px-5 py-3 text-gray-500 font-bold text-left">Model Seçenekleri</th>
                    <td className="px-5 py-3 text-black font-extrabold">Pencereli / Penceresiz Seçenekleri</td>
                  </tr>
                  <tr className="bg-gray-50/30">
                    <th scope="row" className="px-5 py-3 text-gray-500 font-bold text-left">Kapatma</th>
                    <td className="px-5 py-3 text-black font-extrabold">Kapatma Bilgisi Sipariş Detaylarına Göre Değerlendirilir</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Torba Zarf Tablosu */}
            <div className="bg-white border border-gray-250 rounded-2xl shadow-sm overflow-hidden text-left">
              <div className="bg-black text-white px-5 py-3 font-black text-xs uppercase tracking-wider">
                24x32 cm Torba Zarf Özellikleri
              </div>
              <table className="w-full text-xs sm:text-sm">
                <caption className="sr-only">
                  24x32 cm Torba Zarf Teknik Özellikleri
                </caption>
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-100/60 text-left">
                    <th scope="col" className="px-5 py-3 font-bold text-gray-700 w-1/3">Özellik</th>
                    <th scope="col" className="px-5 py-3 font-bold text-gray-700">Bilgi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 bg-gray-50/30">
                    <th scope="row" className="px-5 py-3 text-gray-500 font-bold w-1/3 text-left">Ürün</th>
                    <td className="px-5 py-3 text-black font-extrabold">Torba Zarf (Büyük Ebat)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th scope="row" className="px-5 py-3 text-gray-500 font-bold text-left">Ölçü</th>
                    <td className="px-5 py-3 text-black font-extrabold">24x32 cm (A4 Katlamadan Sığar)</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50/30">
                    <th scope="row" className="px-5 py-3 text-gray-500 font-bold text-left">Kağıt</th>
                    <td className="px-5 py-3 text-black font-extrabold">110 gr. 1. Hamur</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th scope="row" className="px-5 py-3 text-gray-500 font-bold text-left">Baskı Türü</th>
                    <td className="px-5 py-3 text-black font-extrabold">Renkli Baskı</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50/30">
                    <th scope="row" className="px-5 py-3 text-gray-500 font-bold text-left">Renk Modeli</th>
                    <td className="px-5 py-3 text-black font-extrabold">Renkli Baskı Seçeneği</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th scope="row" className="px-5 py-3 text-gray-500 font-bold text-left">Model Seçenekleri</th>
                    <td className="px-5 py-3 text-black font-extrabold">Penceresiz Seçenek</td>
                  </tr>
                  <tr className="bg-gray-50/30">
                    <th scope="row" className="px-5 py-3 text-gray-500 font-bold text-left">Kapatma</th>
                    <td className="px-5 py-3 text-black font-extrabold">Kendinden Yapışkanlı Silikon Bantlı</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* KULLANIM ALANLARI VE BASKI SEÇENEKLERİ (BENTO STYLE) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14 text-black text-left">
          {/* Kullanım Alanları (Sektörler) */}
          <div className="bg-white border border-gray-250 rounded-3xl p-6 md:p-8 shadow-sm">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-2 h-6 bg-primary rounded-full" />
    <h3 className="text-lg font-black text-black uppercase tracking-tight">
      Zarf Kullanım Alanları
    </h3>
  </div>

  <p className="text-xs text-gray-550 font-semibold mb-4 leading-relaxed">
    Diplomat ve torba zarf seçenekleri; ürün ölçüsü, zarf modeli, baskı bilgileri ve sipariş detaylarına göre değerlendirilir.
  </p>

  <p className="text-xs text-gray-650 font-semibold leading-relaxed">
    Kurumsal yazışmalar, teklif dosyaları, sözleşmeler ve evrak gönderimleri için uygun zarf modeli ürün detaylarına göre belirlenir.
  </p>
</div>

          <div className="bg-white border border-gray-250 rounded-3xl p-6 md:p-8 shadow-sm">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-2 h-6 bg-secondary rounded-full" />
    <h3 className="text-lg font-black text-black uppercase tracking-tight">
      Zarf Üzerine Baskı ve Logo Seçenekleri
    </h3>
  </div>

  <p className="text-xs text-gray-550 font-semibold mb-4 leading-relaxed">
    Zarf üzerine baskı ve zarf bastırma taleplerinizde baskı seçenekleri ürün kodu ve sipariş detaylarına göre değerlendirilir:
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-gray-800">
    {[
      {
        title: "Tek Renk Baskı",
        desc: "Tek renk baskı seçeneği ürün koduna göre değerlendirilir."
      },
      {
        title: "Renkli Baskı",
        desc: "Z2 diplomat ve Z3 torba zarf ürünlerinde renkli baskı seçeneği bulunur."
      },
      {
        title: "Logo Baskısı",
        desc: "Logo ve iletişim bilgilerinin yerleşimi sipariş detaylarına göre değerlendirilir."
      },
      {
        title: "Firma ve İletişim Bilgisi",
        desc: "Adres, telefon, e-posta ve diğer iletişim bilgilerinin yerleşimi sipariş detaylarına göre belirlenir."
      }
    ].map((opt, oIdx) => (
      <div key={oIdx} className="bg-slate-50/50 p-3 rounded-xl border border-gray-100">
        <h4 className="font-extrabold text-black mb-1">{opt.title}</h4>
        <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
          {opt.desc}
        </p>
      </div>
    ))}
  </div>
</div>
</div>

        {/* Zarf Baskı Dosyası Hazırlama Rehberi */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden mb-14 text-left">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-xl pointer-events-none" />
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-white">
              Zarf Baskı Dosyası Hazırlama Rehberi
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-xs sm:text-sm font-semibold relative z-10">
  {[
    {
      title: "Dosya Bilgisi",
      desc: "Logo ve tasarım dosyalarının baskıya uygun formatta iletilmesi önerilir."
    },
    {
      title: "Renk Bilgisi",
      desc: "Baskı türü ve renk seçeneği sipariş öncesinde netleştirilir."
    },
    {
      title: "Logo Yerleşimi",
      desc: "Logo ve iletişim bilgilerinin yerleşimi sipariş detaylarına göre değerlendirilir."
    },
    {
      title: "Pencereli Zarf Hizalaması",
      desc: "Pencereli diplomat zarf siparişlerinde adres ve pencere yerleşimi sipariş detaylarına göre değerlendirilir."
    }
  ].map((chk, cIdx) => (
    <div
      key={cIdx}
      className="bg-white/10 p-4 rounded-xl border border-white/5 space-y-1"
    >
      <span className="block text-primary text-xs uppercase font-black tracking-wider flex items-center gap-1.5">
        <span className="shrink-0 text-emerald-400">✔</span>
        <span>{chk.title}</span>
      </span>

      <p className="text-gray-300 text-[11px] font-semibold leading-relaxed">
        {chk.desc}
      </p>
    </div>
  ))}
</div>
</div>
        {/* Neden Mavi Basım */}
        <div className="bg-white border border-gray-250 rounded-3xl p-6 md:p-8 shadow-sm mb-14 text-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2.5 h-6 bg-secondary rounded-full shrink-0" />
            <h3 className="text-lg md:text-xl font-black text-black uppercase tracking-tight">
              Mavi Basım Neden Tercih Ediliyor?
            </h3>
          </div>
          <p className="text-xs sm:text-sm font-semibold leading-relaxed text-gray-650 text-justify">
            Mavi Basım olarak zarf baskı siparişlerini İstanbul Topkapı 2. Matbaacılar Sitesi hizmet ve koordinasyon noktamız üzerinden planlıyoruz. Pencereli ve penceresiz diplomat zarf ile torba zarf seçenekleri; ürün kodu, ebat, adet ve baskı bilgilerine göre değerlendirilir. Gönderim bilgileri sipariş detayları netleştirildikten sonra paylaşılır.
          </p>
        </div>

        {/* WHATSAPP TEKLİF AL ALTI ÇAĞRI */}
        <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-250 rounded-3xl p-8 md:p-10 shadow-sm mb-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-black">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gray-50/50 rounded-full -mr-24 -mt-24 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mb-16 blur-xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4 max-w-xl text-center md:text-left">
            <span className="inline-block bg-primary/10 text-primary text-xs md:text-sm px-3.5 py-1 rounded-full font-black uppercase tracking-wider">
              Anında İletişim & Fiyat
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight leading-tight">
              Tasarım Desteği ve Özel Teklif
            </h3>
            <p className="text-xs sm:text-sm text-gray-650 font-semibold leading-relaxed">
  Özel ebat veya tasarım desteği gerekiyorsa logo ve iletişim bilgilerinizi iletebilirsiniz. Yerleşim seçenekleri ürün ve sipariş detaylarına göre değerlendirilir.
</p>
          </div>

          <div className="relative z-10 shrink-0 flex flex-col items-center gap-3 w-full md:w-auto">
            <div className="text-center md:text-right w-full md:w-auto">
              <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Müşteri Destek Hattı</span>
              <span className="block text-lg md:text-xl font-black text-black tracking-tight flex items-center gap-1.5 justify-center md:justify-end">
                <Phone size={16} className="text-emerald-600 shrink-0" />
                WhatsApp: 0536 602 23 73
              </span>
            </div>
            <a 
              href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, kurumsal zarf baskı siparişi için tasarım desteği ve özel fiyat teklifi almak istiyorum.")}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-full text-sm md:text-base font-black tracking-tight transition-all shadow-lg hover:shadow-emerald-500/20 hover:scale-105 active:scale-95 duration-200"
            >
              <Phone size={18} className="fill-current rotate-12 shrink-0" />
              <span>WhatsApp'tan Teklif Al</span>
            </a>
          </div>
        </div>

        {/* ÜRÜN FOTOĞRAFLARI GALERİSİ */}
        <div className="mb-12 scroll-mt-24 text-black">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-7 bg-primary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Zarf Ürün Fotoğrafları Galerisi
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ZARF_GALLERY.map((img, idx) => (
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

        {/* MALZEME & TEKNİK ÖZELLİKLER */}
        <div className="mb-12 text-black">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-primary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Zarf Seçiminde Teknik Özellikler ve Kullanıcı Faydaları
              </h2>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch font-medium">
              
              {/* 110 gr Kağıt */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-black uppercase mb-3">110 gr Kağıt</h3>
                  <p className="text-xs text-gray-750 font-semibold leading-relaxed text-justify">
  Zarf ölçüsü ve model seçimi, gönderilecek evrakın boyutu ile ürün kodu ve sipariş detaylarına göre değerlendirilir.
</p>
                </div>
              </div>

              {/* Renkli Baskı */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-black uppercase mb-3">Renkli Baskı</h3>
                  <p className="text-xs text-gray-750 font-semibold leading-relaxed text-justify">
                    Z2 diplomat ve Z3 torba zarf ürünlerinde renkli baskı seçeneği bulunur. Logo ve iletişim bilgilerinin yerleşimi sipariş detaylarına göre değerlendirilir.
                  </p>
                </div>
              </div>

              {/* Kapatma Bilgisi */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-black uppercase mb-3">Kapatma Bilgisi</h3>
                  <p className="text-xs text-gray-750 font-semibold leading-relaxed text-justify">
                    Kapatma bilgisi, ürün modeli ve sipariş detaylarına göre değerlendirilir.
                  </p>
                </div>
              </div>

              {/* Ölçü Bilgileri */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-black uppercase mb-3">Ölçü Standartları</h3>
                  <p className="text-xs text-gray-750 font-semibold leading-relaxed text-justify">
  Zarf ölçüsü ve model seçimi, gönderilecek evrakın boyutu ile ürün kodu ve sipariş detaylarına göre değerlendirilir.
</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* COMPREHENSIVE SEO & DETAILED INFORMATION SECTIONS (H2 HEADINGS) */}
        <div className="space-y-12 mb-14 text-black">

          {/* Zarf Baskısının Marka Kimliğine Katkısı */}
          <section className="bg-white p-8 rounded-[32px] border border-gray-150 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-6 bg-secondary rounded-full shrink-0" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Zarf Baskısının Marka Kimliğine Katkısı
              </h2>
            </div>
                        <div className="space-y-4 text-xs sm:text-sm font-semibold leading-relaxed text-gray-650 text-justify">
              <p>
                Baskılı zarflar, firma logosu ve iletişim bilgilerinin zarf üzerinde görünmesini sağlar. Diplomat veya torba zarf seçenekleri kurumsal evrak gönderimlerinde kullanılabilir.
              </p>

              <p>
                Aynı renk paleti, logo ve adres yerleşimine sahip zarflar; antetli kağıt ve cepli dosyalarla birlikte kullanıldığında basılı materyaller arasında görsel bütünlük oluşturabilir.
              </p>

              <p>
                Zarf baskısı siparişinden önce logo, ölçü, zarf modeli ve adet bilgilerinin netleştirilmesi gerekir. Logo ve tasarım dosyalarının baskıya uygun formatta iletilmesi önerilir.
              </p>

              <p>
                10.5x24 cm Diplomat Zarf ve 24x32 cm Torba Zarf seçenekleri ürün ve sipariş detaylarına göre değerlendirilir. Pencereli veya penceresiz diplomat zarf seçimi kullanım tercihine göre yapılır.
              </p>

              <p>
                Fiyatlar; ürün ölçüsü, zarf türü, ürün kodu ve sipariş adedine göre değerlendirilir. Baskı ve gönderim bilgileri sipariş detayları netleştirildikten sonra paylaşılır.
              </p>
              </div>
          </section>



          {/* Sipariş ve Teslimat Süreci */}
          <section className="bg-white p-8 rounded-[32px] border border-gray-150 shadow-sm text-left">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Zarf Baskı Sipariş Süreci
              </h2>
            </div>
            
            {/* 6 Steps Grid */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-xs sm:text-sm font-semibold leading-relaxed text-gray-650 mb-8">
              {[
  {
    step: "1️⃣",
    title: "Ürün Bilgileri",
    desc: "Zarf türü, ürün kodu, ebat ve adet bilgileri paylaşılır."
  },
  {
    step: "2️⃣",
    title: "Dosya Bilgileri",
    desc: "Logo ve zarfta kullanılacak iletişim bilgileri sipariş sırasında iletilir."
  },
  {
    step: "3️⃣",
    title: "Sipariş Detayları",
    desc: "Baskı ve sipariş bilgileri birlikte değerlendirilir."
  },
  {
    step: "4️⃣",
    title: "Baskı Öncesi Onay",
    desc: "Baskı öncesi onay süreci, paylaşılan sipariş ve dosya bilgilerine göre ilerletilir."
  },
  {
    step: "5️⃣",
    title: "Baskı Aşaması",
    desc: "Sipariş ve onay bilgileri netleştirildikten sonra baskı süreci planlanır."
  },
  {
    step: "6️⃣",
    title: "Gönderim",
    desc: "Hazırlanan baskılı zarflar için gönderim bilgileri sipariş sırasında paylaşılır."
  }
].map((item, idx) => (
  <div
    key={idx}
    className="space-y-2 bg-gray-50/60 p-4 rounded-xl border border-gray-150 flex flex-col justify-between hover:bg-white hover:shadow-sm hover:border-primary/25 transition-all"
  >
    <div>
      <div className="text-2xl mb-1">{item.step}</div>
      <h4 className="font-black text-black uppercase text-[11px] mb-1.5 leading-snug">
        {item.title}
      </h4>
      <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
        {item.desc}
      </p>
    </div>
  </div>
))}
            </div>

            {/* Teslimat Bilgisi Bölümü */}
<div className="border-t border-gray-150 pt-6">
  <h3 className="text-base font-black text-black uppercase tracking-tight mb-4 flex items-center gap-2">
    <Truck size={18} className="text-secondary" />
    Teslimat ve Sevkiyat Bilgileri
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm font-medium">
    <div className="bg-slate-50 p-4 rounded-xl border border-gray-100">
      <span className="block font-extrabold text-black uppercase text-[11px] tracking-wider mb-1">
        Sipariş Bilgisi
      </span>
      <p className="text-gray-500 font-semibold leading-relaxed">
        Siparişin hazırlık ve gönderim bilgileri, ürün detayları netleştirildikten sonra paylaşılır.
      </p>
    </div>

    <div className="bg-slate-50 p-4 rounded-xl border border-gray-100">
      <span className="block font-extrabold text-black uppercase text-[11px] tracking-wider mb-1">
        Gönderim Bilgisi
      </span>
      <p className="text-gray-500 font-semibold leading-relaxed">
        Gönderim yöntemi ve teslimat bilgileri sipariş detaylarına göre paylaşılır.
      </p>
    </div>

    <div className="bg-slate-50 p-4 rounded-xl border border-gray-100">
      <span className="block font-extrabold text-black uppercase text-[11px] tracking-wider mb-1">
        Hizmet Noktası
      </span>
      <p className="text-gray-500 font-semibold leading-relaxed">
        İstanbul Topkapı 2. Matbaacılar Sitesi hizmet ve koordinasyon noktamız üzerinden bilgi alabilirsiniz.
      </p>
    </div>
  </div>
</div>
</section>
        </div>

        {/* Related Products / Internal Linking Section */}
        <section className="mb-14 bg-gray-50/50 border border-gray-150 p-6 md:p-8 rounded-[2rem]">
          <div className="max-w-[1200px] mx-auto text-black">
            <h2 className="text-xl md:text-2xl font-black mb-4 uppercase tracking-tight text-center md:text-left">
              Kurumsal Markanızı Güçlendirin
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-gray-650 mb-6 leading-relaxed text-justify">
              Kurumsal markanızı güçlendirmek, şirketinizin kurumsal kimliğini tamamlamak ve tanıtım faaliyetlerinizi bir üst seviyeye taşımak için farklı baskı ürünlerimizi inceleyebilirsiniz:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  title: "Kurumsal Broşür Baskı Çözümleri", 
                  desc: "Firma ve ürün tanıtımlarınızı geniş kitlelere ulaştıran katlamalı broşür modelleri.", 
                  path: "/brosur"
                },
                { 
                  title: "Profesyonel Kartvizit Baskı Siparişi", 
                  desc: "Kabartma laklı, çift yön selefonlu ve kalın sıvama prestijli kartvizit seçenekleri.", 
                  path: "/kartvizit"
                },
                { 
                  title: "Katalog Baskı ve Tasarım Hizmetleri", 
                  desc: "Ürün ve hizmet vitrininizi en prestijli şekilde yansıtan dikişli, spiralli kataloglar.", 
                  path: "/kataloglar"
                },
                { 
                  title: "Reklam Magnet Baskı Ürünleri", 
                  desc: "Buzdolaplarında ve metal yüzeylerde markanızın sürekli göz önünde kalmasını sağlayan promosyon ürünleri.", 
                  path: "/magnet"
                },
                { 
                  title: "Etiket ve Sticker Baskı Çözümleri", 
                  desc: "Koli, ambalaj ve ürünleriniz için dayanıklı, kendinden yapışkanlı şık sticker modelleri.", 
                  path: "/etiket"
                },
                { 
                  title: "Kutu Baskı Özel Üretim Seçenekleri", 
                  desc: "Ürünlerinizin güvenli ve prestijli şekilde paketlenmesini sağlayan pencereli ve kilitli mukavva kutular.", 
                  path: "/kutu"
                }
              ].map((product, idx) => (
                <Link 
                  key={idx} 
                  to={product.path} 
                  className="group bg-white p-5 rounded-2xl border border-gray-150 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-sm font-black text-black group-hover:text-primary transition-colors mb-1">
                      {product.title}
                    </h3>
                    <p className="text-xs font-semibold text-gray-500 leading-relaxed mb-4">
                      {product.desc}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-primary group-hover:text-secondary transition-all mt-auto">
                    Fiyatları İncele <ChevronRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SSS (FAQ) ALANI */}
        <div className="mb-14 text-black scroll-mt-24">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-6 bg-secondary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Sıkça Sorulan Sorular
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {ZARF_DETAILS.faqList.map((faq, idx) => (
              <div key={idx} className="h-full border border-gray-200 rounded-2xl p-5 bg-white shadow-xs flex flex-col justify-between text-black">
                <div>
                  <h3 className="md:text-base text-sm leading-relaxed mb-2.5 text-black font-bold flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-2" />
                    <span>{faq.q}</span>
                  </h3>
                  <div className="h-px bg-gray-100 my-2.5 w-full" />
                  <p className="text-slate-650 md:text-sm text-xs leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Agency Discount CTA */}
        <AgencyDiscountCTA />

        <RelatedBlogPosts category="zarf" />

      </div>
          </div>
  );
};

export default ZarfPage;

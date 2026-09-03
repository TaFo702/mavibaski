import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
  ProductSEOSection, 
  FireWarning,
  AgencyDiscountCTA
} from '../App';
import { LOCAL_ASSETS } from '../constants/assets';
import { CategoryHero } from './CategoryHero';
import { RelatedBlogPosts } from './RelatedBlogPosts';
import { DeliveryBadge } from './DeliveryBadge';

// --- Price Data (Must be preserved for external imports) ---
import { ZARF_DATA } from '../data/extraProductData';
export { ZARF_DATA };

// --- Local Data ---
const ZARF_DETAILS = {
  breadcrumbTitle: "Zarf",
  h1Title: "Diplomat ve Torba Zarf Baskı Fiyatları | Pencereli ve Penceresiz Kurumsal Zarf Baskısı",
  subtitle: "Kuruluşların, resmi dairelerin ve her ölçekten ticari işletmenin yazışma ve evrak akışını yönetmesi için diplomat zarf baskı çözümleri büyük önem taşır.\n\nOnaylanan tasarımlar doğrultusunda 110 gr 1. Sınıf Hamur kağıt seçeneğiyle üretilen pencereli veya penceresiz modeller, kendinden yapışkanlı silikonlu kapatma yapısıyla kullanım kolaylığı sunar. Hacimli evrak gönderimleri için tercih edilen torba zarf baskısı ve özel baskılı zarf çözümleri, resmi evrak sevkiyatlarında pratiklik sağlar. Üretilen tüm basılı ürünler özenle paketlenerek Türkiye geneline kargo ile ulaştırılmaktadır.",
  specifications: [
    { title: "Zarf Türleri", value: "Pencereli / Penceresiz Diplomat & Torba Zarf", desc: "Kullanım amacınıza en uygun pencereli veya penceresiz seçenekler." },
    { title: "Kağıt Seçeneği", value: "110 gr 1. Sınıf Hamur", desc: "Dayanıklı, pürüzsüz ve üst düzey mürekkep tutuşuna sahip kalın kağıt." },
    { title: "Kapatma Sistemi", value: "Silikonlu (Kendinden Yapışkanlı)", desc: "Şeridini kaldırıp bastırarak pratik ve güvenli kapatma imkanı." },
    { title: "Baskı Teknolojisi", value: "Ofset CMYK", desc: "Yüksek çözünürlüklü baskı makineleriyle net kurumsal renkler." },
    { title: "Sipariş Miktarları", value: "500 Adet / 1.000 Adet ve katları", desc: "Kalıp ve makine kurulum süreçleri nedeniyle uygun paket adetleri." },
    { title: "Kullanım Alanları", value: "Fatura, Sözleşme, Teklif, Evrak Gönderimi", desc: "Resmi yazışmalar, kurumsal evraklar ve fatura sevkıyatları için ideal." }
  ],
  faqList: [
    { q: "Zarf baskısında hangi kağıt türü kullanılır", a: "Zarf baskılarında genellikle 110 gr. 1. Hamur kağıt kullanılmaktadır. Bu kağıt türü, net baskı kalitesi ve dayanıklı yapısıyla kurumsal kullanıma uygundur." },
    { q: "Pencereli ve penceresiz zarf arasındaki fark nedir", a: "Pencereli zarflarda alıcı adresinin görünmesini sağlayan şeffaf pencere bulunur. Bu sayede adres bilgisi doğrudan belge üzerinden görüntülenebilir. Penceresiz zarflarda ise adres bilgisi zarf üzerine yazılır veya etiket uygulanır." },
    { q: "Zarflar kendinden yapışkanlı mı", a: "Evet, zarflar kendinden yapışkanlı olarak üretilmektedir. Koruyucu şerit çıkarıldıktan sonra kolayca kapatılabilir." },
    { q: "Zarf üzerine firma logosu basılabilir mi", a: "Evet, zarf üzerine firmanızın logosu, iletişim bilgileri ve kurumsal kimlik unsurları yüksek kaliteli baskı ile uygulanabilmektedir." },
    { q: "Zarf hangi ölçülerde basılabilir", a: "Firmamız bünyesinde en çok tercih edilen standart 10.5x24 cm Diplomat Zarf (pencereli veya penceresiz seçenekleriyle) ve 24x32 cm Torba Zarf basımı yapılmaktadır." },
    { q: "Minimum sipariş adedi nedir", a: "Diplomat zarflarda minimum sipariş miktarı 1.000 adet, torba zarflarda ise 500 adettir." },
    { q: "Tasarım desteği sağlıyor musunuz", a: "Evet, firmanıza ait logo ve iletişim bilgilerinizi bizimle paylaşmanız yeterlidir. Grafik ekibimiz firmanıza uygun zarf tasarımını hazırlayarak onayınıza sunmaktadır." },
    { q: "Zarf baskısı kaç günde tamamlanır", a: "Tasarım onayının ardından zarf baskıları ortalama 4-6 iş günü içerisinde tamamlanarak kargoya teslim edilmektedir." },
    { q: "Türkiye'nin her yerine gönderim yapıyor musunuz", a: "Evet, zarf siparişleri Türkiye'nin tüm il ve ilçelerine anlaşmalı kargo firmaları aracılığıyla güvenli bir şekilde ulaştırılmaktadır." }
  ]
};

const ZARF_GALLERY = [
  {
    src: "/images/zarf/kurumsal-zarf-baski.webp",
    alt: "Diplomat zarf baskısı - 10.5x24 cm ölçüsünde ofset baskılı diplomat zarfın açık ve kapalı formda kurumsal yerleşimi",
    title: "Kurumsal Zarf (Açık ve Kapalı Hali)",
    desc: "10.5x24 cm ölçüsünde ofset baskılı diplomat zarfın açık ve kapalı formda kurumsal yerleşimi."
  },
  {
    src: "/images/zarf/torba-zarf-baski-ornegi.webp",
    alt: "24x32 torba zarf baskısı - 24x32 cm standart ölçülerde, A4 evrakın katlanmadan sığdığı dayanıklı torba zarf örneği",
    title: "Torba Zarf (İçine A4 Evrak Konmuş Hali)",
    desc: "24x32 cm standart ölçülerde, A4 evrakın katlanmadan sığdığı dayanıklı torba zarf örneği."
  },
  {
    src: "/images/zarf/antetli-zarf-tasarimi.webp",
    alt: "Pencereli diplomat zarf - 10.5x24 cm ebadında alıcı adresi gösteren asetat pencereli diplomat zarf modeli",
    title: "Pencereli Diplomat Zarf",
    desc: "10.5x24 cm ebadında alıcı adresi gösteren asetat pencereli diplomat zarf modeli."
  },
  {
    src: "/images/zarf/penceresiz-diplomat-zarf.webp",
    alt: "Penceresiz diplomat zarf - 10.5x24 cm standart ölçüde, ön yüzeyi tamamen düz penceresiz kurumsal zarf seçeneği",
    title: "Penceresiz Diplomat Zarf",
    desc: "10.5x24 cm standart ölçüde, ön yüzeyi tamamen düz penceresiz kurumsal zarf seçeneği."
  },
  {
    src: "/images/zarf/zarf-baski.webp",
    alt: "Logo baskılı zarf - 110 gr 1. Sınıf Hamur kağıt üzerinde keskin ve pürüzsüz ofset logo baskısı yakın çekim",
    title: "Yüksek Kaliteli Baskı (Logo Detayı)",
    desc: "110 gr 1. Sınıf Hamur kağıt üzerinde keskin ve pürüzsüz ofset logo baskısı yakın çekim."
  },
  {
    src: "/images/zarf/zarf-baski-detalleri.webp",
    alt: "Silikon detayı - Koruyucu jelatini sökülerek saniyeler içerisinde pratik kapatma sağlayan güçlü silikon yapışkan şeridi",
    title: "Kolay Kapatma Sistemi (Silikon Detayı)",
    desc: "Koruyucu jelatini sökülerek saniyeler içerisinde pratik kapatma sağlayan güçlü silikon yapışkan şeridi."
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
      <Helmet>
        <title>Diplomat Zarf Baskı Fiyatları | Pencereli ve Penceresiz Kurumsal Zarf - Mavi Basım</title>
        <meta name="description" content="10.5x24 cm diplomat zarf ve 24x32 cm torba zarf baskı hizmeti. Pencereli ve penceresiz seçenekler, kaliteli ofset baskı, uygun fiyat ve Türkiye geneli güvenli kargo." />
      </Helmet>

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
          title="Diplomat Zarf Baskı Fiyatları &amp; Torba Zarf İmalatı"
          badge="10.5x24 cm Diplomat - Pencereli / Penceresiz Silikonlu"
          description={
            <div className="space-y-2">
              <p>
                Mavi Basım olarak Topkapı imalat tesisimizde pencereli ve penceresiz diplomat zarf ile 24x32 cm A4 torba <strong className="text-slate-900">zarf baskı</strong> üretimi gerçekleştiriyoruz. Kurumsal evrak ve yazışma setiniz için <Link to="/antetli" className="text-primary hover:underline font-bold">antetli kağıt</Link>, <Link to="/dosyalar" className="text-primary hover:underline font-bold">cepli dosya</Link>, <Link to="/kartvizit" className="text-primary hover:underline font-bold">kartvizit</Link> ve <Link to="/makbuz-ve-formlar" className="text-primary hover:underline font-bold">otokopili makbuz</Link> çözümlerimizi aynı anda sipariş verebilirsiniz.
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
        <DeliveryBadge categoryKey="zarf" days={3} variant="banner" className="my-6" />

        {/* FİYAT LİSTESİ TABLOSU */}
        <div className="scroll-mt-24 group mb-12">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-secondary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2 flex-wrap">
                {ZARF_DETAILS.breadcrumbTitle} Fiyat Listesi
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 text-[11px] font-bold">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>110 gr. 1.Hamur</span>
            </div>
          </div>

          <p className="text-gray-650 text-xs sm:text-sm font-semibold mb-6 px-2 leading-relaxed">
            Güncel zarf baskı fiyat listesi aşağıdadır.
          </p>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-visible relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[11px] md:text-[13px]">
                <thead>
                  <tr className="bg-black text-white border-b border-black">
                    <th className="p-4 w-10"></th>
                    <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">KOD</th>
                    <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ADET</th>
                    <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">EBAT</th>
                    <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">AÇIKLAMA</th>
                    <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">FİYAT</th>
                    <th className="p-4 w-44 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">EKSTRA ADET</th>
                    <th className="p-4 w-44 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 text-center">SİPARİŞ</th>
                  </tr>
                </thead>
                <tbody>
                  {ZARF_DATA[0].items.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-primary/10 hover:shadow-[inset_4px_0_0_0_#29abe2] transition-all cursor-default group">
                      {idx === 0 && (
                        <td 
                          rowSpan={ZARF_DATA[0].items.length}
                          className="bg-primary text-white font-black text-center p-1 w-10 border-r border-white/10"
                          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                        >
                          <span className="tracking-[0.1em] uppercase text-[10px]">ZARF</span>
                        </td>
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
              <span className="font-black text-black block leading-snug">Ofset CMYK</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-gray-150">
              <span className="block text-gray-500 font-extrabold mb-1 text-[10px] uppercase tracking-wider">Pencere</span>
              <span className="font-black text-black block leading-snug">Pencereli / Penceresiz</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-gray-150">
              <span className="block text-gray-500 font-extrabold mb-1 text-[10px] uppercase tracking-wider">Teslimat</span>
              <span className="font-black text-emerald-600 block leading-snug">4 - 6 İş Günü</span>
            </div>
          </div>
        </div>

        {/* Diplomat Zarf Baskı Avantajları */}
        <div className="mb-10 mt-8 text-black">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Kurumsal Zarf Kullanım Avantajları
            </h2>
          </div>
          <div className="bg-white border border-gray-150 rounded-3xl p-6 md:p-8 space-y-6 text-xs sm:text-sm font-semibold leading-relaxed text-gray-650 shadow-sm text-justify">
            <p>
              Logolu gönderiler, şirketlerin marka bilinirliğini artırır. İş ortaklarınıza ve müşterilerinize göndereceğiniz faturalar, teklifler veya resmi yazışmalar, kurumsal kimliğinizi yansıtan tasarımlarla iletildiğinde güven algısı sunar. Ofset baskı sayesinde logolar net görünür ve kurumsal görünüm korunur.
            </p>
            <p>
              Ofis kullanımı ve günlük operasyon süreçlerinde düzenli evrak yönetimi sağlamak, iş akışının hatasız ilerlemesi için önemlidir. Kapatma sisteminde yer alan kendinden yapışkanlı silikon bant, saniyeler içinde güvenli kapatma imkanı verir. Alıcı adresinin doğrudan belgedeki ilgili alandan okunabildiği pencereli modeller ise adresleme sürecini kolaylaştırarak hızlı gönderim yapılmasına olanak tanır.
            </p>
          </div>
        </div>

        {/* DOĞRU ZARF SEÇİM REHBERİ */}
        <div className="mb-14 text-black">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Doğru Zarf Seçim Rehberi
            </h2>
          </div>
          
          <div className="bg-white border border-gray-150 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="text-xs sm:text-sm font-semibold leading-relaxed text-gray-650 space-y-4 text-justify">
              <p>
                İşletmenizin ihtiyaçlarına uygun zarf modelini seçmek; gönderilecek evrakın boyutu, kullanım amacı ve kurumsal görünüm açısından önemlidir. Mavi Basım olarak <strong className="text-black font-black">10.5x24 cm Diplomat Zarf</strong> ve <strong className="text-black font-black">24x32 cm Torba Zarf</strong> baskı hizmeti sunuyoruz.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-left">
                <div className="border border-gray-150 p-5 rounded-2xl bg-slate-50/50">
                  <h3 className="text-base font-black text-black uppercase mb-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-primary rounded-full" />
                    10.5x24 cm Diplomat Zarf
                  </h3>
                  <p className="mb-3">
                    Diplomat zarf, günlük kurumsal yazışmalarda en çok tercih edilen standart zarf modelidir. Fatura, teklif dosyası, resmi yazışmalar, sözleşme, banka evrakları ve A4 belgelerin üçe katlanarak gönderildiği durumlar için idealdir.
                  </p>
                  <p className="font-extrabold text-black mb-2 text-xs uppercase tracking-wider">Diplomat zarf seçenekleri:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-650">
                    <li>
                      <strong className="text-black font-bold">Pencereli Diplomat Zarf:</strong> Alıcı adresinin belge üzerinden görünmesini sağlar. Özellikle muhasebe, resmi evrak ve toplu posta gönderilerinde zaman kazandırır.
                    </li>
                    <li>
                      <strong className="text-black font-bold">Penceresiz Diplomat Zarf:</strong> Adres bilgileri doğrudan zarf üzerine basılır veya etiket uygulanır. Kurumsal yazışmalar, teklif dosyaları ve genel ofis kullanımı için tercih edilir.
                    </li>
                  </ul>
                  <p className="mt-3 text-xs italic">
                    Her iki model de 110 gr 1. Hamur kâğıda yüksek kaliteli ofset baskı ile üretilir ve isteğe bağlı olarak firma logosu, kurumsal renkler ve iletişim bilgileriyle kişiselleştirilebilir.
                  </p>
                </div>

                <div className="border border-gray-150 p-5 rounded-2xl bg-slate-50/50">
                  <h3 className="text-base font-black text-black uppercase mb-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-primary rounded-full" />
                    24x32 cm Torba Zarf
                  </h3>
                  <p className="mb-3">
                    Torba zarf, katlanması istenmeyen A4 belgeler, sözleşmeler, kataloglar, dosyalar, raporlar ve diğer büyük evrakların güvenli şekilde gönderilmesi için kullanılır. Belgelerin kırışmadan ve düzeni bozulmadan taşınmasını sağlar.
                  </p>
                  <p className="mb-3">
                    24x32 cm torba zarflar; hukuk büroları, mali müşavirlik ofisleri, kamu kurumları, eğitim kuruluşları, sağlık sektörü ve profesyonel firmalar tarafından sıklıkla tercih edilmektedir.
                  </p>
                  <p className="font-extrabold text-black mb-2 text-xs uppercase tracking-wider">Hangi Zarf Size Uygun?</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-650">
                    <li>Günlük yazışmalar ve standart evrak gönderimi için <strong className="text-black font-bold">10.5x24 cm Diplomat Zarf</strong></li>
                    <li>Katlanmaması gereken belgeler ve büyük evraklar için <strong className="text-black font-bold">24x32 cm Torba Zarf</strong></li>
                  </ul>
                </div>
              </div>
              <p className="text-center font-bold text-gray-800 bg-primary/10 p-3 rounded-xl mt-4">
                İhtiyacınıza uygun ölçüyü seçerek firmanızın marka kimliğini yansıtan, kaliteli ve profesyonel baskılı zarf çözümlerinden yararlanabilirsiniz.
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
                <tbody>
                  <tr className="border-b border-gray-100 bg-gray-50/30">
                    <td className="px-5 py-3 text-gray-500 font-bold w-1/3">Ürün</td>
                    <td className="px-5 py-3 text-black font-extrabold">Diplomat Zarf</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-5 py-3 text-gray-500 font-bold">Ölçü</td>
                    <td className="px-5 py-3 text-black font-extrabold">10.5x24 cm</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50/30">
                    <td className="px-5 py-3 text-gray-500 font-bold">Kağıt</td>
                    <td className="px-5 py-3 text-black font-extrabold">110 gr. 1. Hamur</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-5 py-3 text-gray-500 font-bold">Baskı Türü</td>
                    <td className="px-5 py-3 text-black font-extrabold">Ofset Baskı (Yüksek Çözünürlük)</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50/30">
                    <td className="px-5 py-3 text-gray-500 font-bold">Renk Modeli</td>
                    <td className="px-5 py-3 text-black font-extrabold">Tek Renk / CMYK Renkli Seçeneği</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-5 py-3 text-gray-500 font-bold">Model Seçenekleri</td>
                    <td className="px-5 py-3 text-black font-extrabold">Pencereli / Penceresiz Seçenekleri</td>
                  </tr>
                  <tr className="bg-gray-50/30">
                    <td className="px-5 py-3 text-gray-500 font-bold">Kapatma</td>
                    <td className="px-5 py-3 text-black font-extrabold">Kendinden Yapışkanlı Silikon Bantlı</td>
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
                <tbody>
                  <tr className="border-b border-gray-100 bg-gray-50/30">
                    <td className="px-5 py-3 text-gray-500 font-bold w-1/3">Ürün</td>
                    <td className="px-5 py-3 text-black font-extrabold">Torba Zarf (Büyük Ebat)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-5 py-3 text-gray-500 font-bold">Ölçü</td>
                    <td className="px-5 py-3 text-black font-extrabold">24x32 cm (A4 Katlamadan Sığar)</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50/30">
                    <td className="px-5 py-3 text-gray-500 font-bold">Kağıt</td>
                    <td className="px-5 py-3 text-black font-extrabold">110 gr. 1. Hamur</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-5 py-3 text-gray-500 font-bold">Baskı Türü</td>
                    <td className="px-5 py-3 text-black font-extrabold">Ofset Baskı (Yüksek Kalite)</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50/30">
                    <td className="px-5 py-3 text-gray-500 font-bold">Renk Modeli</td>
                    <td className="px-5 py-3 text-black font-extrabold">CMYK Renkli Baskı Teknolojisi</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="px-5 py-3 text-gray-500 font-bold">Model Seçenekleri</td>
                    <td className="px-5 py-3 text-black font-extrabold">Penceresiz (Tam Güvenlikli Gönderim)</td>
                  </tr>
                  <tr className="bg-gray-50/30">
                    <td className="px-5 py-3 text-gray-500 font-bold">Kapatma</td>
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
                Kimler Kullanıyor? (Kullanım Alanları)
              </h3>
            </div>
            <p className="text-xs text-gray-550 font-semibold mb-4 leading-relaxed">
              Mavi Basım baskılı zarf çözümlerini Türkiye genelinde birçok farklı sektör ve profesyonel grup sıklıkla tercih etmektedir:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Avukatlar", "Mali Müşavirler", "Sigorta Acenteleri", "Emlak Ofisleri", 
                "Hastaneler", "Klinikler", "Okullar", "Belediyeler", 
                "Fabrikalar", "İnşaat Firmaları", "Turizm Firmaları"
              ].map((sector, sIdx) => (
                <span 
                  key={sIdx} 
                  className="bg-slate-100 hover:bg-primary/10 hover:text-primary transition-all text-gray-800 text-xs font-bold px-3.5 py-1.5 rounded-full border border-gray-150"
                >
                  ✓ {sector}
                </span>
              ))}
            </div>
          </div>

          {/* Baskı Seçenekleri */}
          <div className="bg-white border border-gray-250 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-6 bg-secondary rounded-full" />
              <h3 className="text-lg font-black text-black uppercase tracking-tight">
                Zarf Üzeri Baskı Seçenekleri
              </h3>
            </div>
            <p className="text-xs text-gray-550 font-semibold mb-4 leading-relaxed">
              Markanızın ihtiyaçlarına ve tasarım bütçenize göre en uygun baskı tipini belirleyebilirsiniz:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-gray-800">
              {[
                { title: "Tek Renk Baskı", desc: "Sadece logonuzun ana rengi veya siyah renkte ekonomik baskı çözümü." },
                { title: "Renkli Baskı (CMYK)", desc: "Çok renkli logolar ve kurumsal kimlik tasarımları için sınırsız renk kalitesi." },
                { title: "Logo Baskısı", desc: "Yüksek çözünürlüklü vektörel logonuzun zarfın sol üst kısmına kusursuz basımı." },
                { title: "Firma & İletişim Bilgisi", desc: "Adres, telefon, e-posta, vergi dairesi ve no gibi bilgilerin net okunaklı yerleşimi." }
              ].map((opt, oIdx) => (
                <div key={oIdx} className="bg-slate-50/50 p-3 rounded-xl border border-gray-100">
                  <h4 className="font-extrabold text-black mb-1">{opt.title}</h4>
                  <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">{opt.desc}</p>
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
              { title: "PDF, AI veya EPS formatı", desc: "Baskı kalitesini korumak için dosyanızı vektörel PDF, AI veya EPS formatında hazırlamanızı öneririz." },
              { title: "CMYK renk modu", desc: "Ekran ve baskı renklerinin uyumlu olması için tasarım CMYK renk modunda hazırlanmalıdır." },
              { title: "300 DPI çözünürlük", desc: "Kullanılan görseller en az 300 DPI çözünürlükte olmalıdır. Düşük çözünürlüklü görseller baskıda netliğini kaybedebilir." },
              { title: "3 mm taşma payı", desc: "Kesim hatalarını önlemek için tasarımın her kenarında en az 3 mm taşma payı bırakılmalıdır." },
              { title: "Yazıları eğriye çevirin", desc: "Font sorunlarını önlemek amacıyla yazılar baskıya göndermeden önce eğriye (Outline / Convert to Curves) dönüştürülmelidir." },
              { title: "Logo ve güvenli alan", desc: "Logo ve iletişim bilgileri kesim, yapıştırma ve katlama bölgelerinden en az 5 mm içeride yer almalıdır." },
              { title: "Pencereli zarf hizalaması", desc: "Pencereli diplomat zarf siparişlerinde alıcı adresi, pencere ölçüsüne tam denk gelecek şekilde yerleştirilmelidir." }
            ].map((chk, cIdx) => (
              <div key={cIdx} className="bg-white/10 p-4 rounded-xl border border-white/5 space-y-1">
                <span className="block text-primary text-xs uppercase font-black tracking-wider flex items-center gap-1.5">
                  <span className="shrink-0 text-emerald-400">✔</span> <span>{chk.title}</span>
                </span>
                <p className="text-gray-300 text-[11px] font-semibold leading-relaxed">{chk.desc}</p>
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
            Mavi Basım olarak zarf baskılarımızı İstanbul Topkapı'daki üretim tesisimizde ofset baskı teknolojisiyle hazırlıyoruz. Tüm çalışmalar baskı öncesinde grafik ekibimiz tarafından ücretsiz kontrol edilir ve müşteri onayı alınmadan üretime başlanmaz. Üretimi tamamlanan siparişler korunaklı şekilde paketlenerek Türkiye'nin her noktasına güvenli kargo ile gönderilir. Aracısız üretim yapımız sayesinde kaliteli baskıyı rekabetçi fiyatlarla sunuyoruz.
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
              Özel ebatlarda veya firmanıza özel tasarım desteğine mi ihtiyacınız var? Logolarınızı ve bilgilerinizi iletin; deneyimli grafik ekibimiz baskıya uygun yerleşim çalışmasını sizin için ücretsiz olarak hazırlasın.
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
                    İnce veya hantal değildir. Posta gönderimine en uygun kalınlıktadır. Katlanırken çatlama veya çirkin kat izi oluşturmaz, yırtılmaya karşı son derece dayanıklıdır.
                  </p>
                </div>
              </div>

              {/* CMYK Baskı */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-black uppercase mb-3">CMYK Baskı</h3>
                  <p className="text-xs text-gray-750 font-semibold leading-relaxed text-justify">
                    Logolarınızın ve marka renklerinizin birebir doğru basılmasını sağlar. Küçük yazıların ve ince detayların daha net basılmasına yardımcı olur.
                  </p>
                </div>
              </div>

              {/* Silikon Yapışkan */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-black uppercase mb-3">Silikon Yapışkan</h3>
                  <p className="text-xs text-gray-750 font-semibold leading-relaxed text-justify">
                    Ekstra yapıştırıcı sürme, bantlama veya ıslatma derdi yoktur. Koruyucu bandı sökülerek saniyeler içinde kolayca kapanır, uzun süre rafta kalsa dahi kuruyup özelliğini kaybetmez.
                  </p>
                </div>
              </div>

              {/* Ölçü Bilgileri */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-black uppercase mb-3">Ölçü Standartları</h3>
                  <p className="text-xs text-gray-750 font-semibold leading-relaxed text-justify">
                    Evraklarınızın, faturalarınızın ve resmi yazışmalarınızın tam ölçüsünde, sıkışmadan veya katlanmadan sığmasını sağlar. Gönderim amacınıza uygun milimetrik standartlardadır.
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
                Baskılı profesyonel zarflar, işletmelerin müşterileri ve iş ortaklarıyla kurduğu fiziksel temas noktalarında ilk izlenimi belirleyen en güçlü unsurlardan biridir. Teklif dosyalarınız, sözleşmeleriniz veya faturalarınız alıcıya ulaştığında, standart beyaz bir zarf yerine firmanızın logosunu ve renklerini taşıyan kaliteli bir zarfın tercih edilmesi, işinize duyduğunuz ciddiyeti ve gösterdiğiniz özeni anında hissettirir.
              </p>
              <p>
                Pratik fayda odaklı düşünüldüğünde; aynı renk paleti, logo ve adres yerleşimine sahip diplomat veya torba zarflar, kurum içi evrak yönetimini disipline ederken kargo ve lojistik süreçlerinde de gönderilerinizin güvenle ayırt edilmesini sağlar. Antetli kağıt ve cepli dosyalarınızla görsel bütünlük sağlayan bu profesyonel yaklaşım, müşterileriniz nezdinde sarsılmaz bir güven inşa ederken, markanızın daha profesyonel ve tutarlı bir görünüm sunmasına katkı sağlar.
              </p>
            </div>
          </section>
          
          {/* Zarf Baskısı Siparişinden Önce Bilmeniz Gerekenler */}
          <section className="bg-white p-8 rounded-[32px] border border-gray-150 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Zarf Baskısı Siparişinden Önce Bilmeniz Gerekenler
              </h2>
            </div>
            <div className="space-y-4 text-xs sm:text-sm font-semibold leading-relaxed text-gray-650 text-justify">
              <p>
                Profesyonel zarf baskısı sipariş vermeden önce birkaç önemli detayı planlamanız, hem üretim sürecinin daha hızlı ilerlemesini hem de baskının beklentilerinizi karşılamasını sağlar. Öncelikle kullanılacak logonun mümkün olduğunca yüksek çözünürlüklü veya vektörel formatta olması, baskıda net ve profesyonel bir görünüm elde edilmesine yardımcı olur. Düşük kaliteli görseller ise özellikle küçük logolarda ve ince yazılarda istenmeyen kalite kayıplarına neden olabilir.
              </p>
              <p>
                Baskıda renkler dijital ekranlarda görülen tonlarla birebir aynı görünmeyebilir. Bunun nedeni ekranların RGB, profesyonel baskının ise CMYK renk sistemiyle çalışmasıdır. Marka renklerinin doğru şekilde uygulanabilmesi için baskıya uygun hazırlanmış dosyalar kullanılması önemlidir. Tasarım onayı verilmeden önce hazırlanan dijital prova dikkatlice incelenmeli; logo yerleşimi, iletişim bilgileri, adres, telefon ve diğer içerikler mutlaka kontrol edilmelidir.
              </p>
              <p>
                Sipariş oluştururken doğru zarf ölçüsünü ve uygun modeli seçmek de önem taşır. Günlük yazışmalar ve standart resmi evrak gönderimleri için 10.5x24 cm Diplomat Zarf tercih edilirken, katlanmadan gönderilecek daha büyük belgeler veya dosyalar için 24x32 cm Torba Zarf en uygun seçim olacaktır. Diplomat zarf siparişlerinizde alıcı bilgilerinin doğrudan belge üzerinden görünmesini istiyorsanız pencereli diplomat zarf, daha sade ve genel gönderimler için ise penceresiz diplomat zarf modelini tercih edebilirsiniz.
              </p>
              <p>
                Sipariş adedi de maliyeti etkleyen önemli unsurlardan biridir. Yüksek adetli baskılarda birim maliyet daha avantajlı hale gelir ve düzenli zarf kullanan işletmeler için uzun vadede ekonomik bir çözüm sunar. Fiyatlar; ürün ölçüsü, zarf türü ve sipariş adedine göre değişir. Yüksek adetli baskılarda birim maliyet düşer. Bu nedenle sipariş miktarınızı yıllık sarfiyatınıza göre yüksek tutmanız birim başına ciddi tasarruf sağlar. Baskı öncesinde marka kimliğinizde kullanılan logo, renkler ve yazı karakterlerinin tasarımla uyumlu olması ise markanızın tüm basılı materyallerinde profesyonel ve tutarlı bir görünüm oluşturmanıza katkı sağlar. Bu hazırlıkların tamamlanmasıyla üretim süreci planlı şekilde ilerler ve siparişiniz onaylanan tasarıma uygun olarak baskıya alınır.
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
                { step: "1️⃣", title: "Teklif Alın", desc: "WhatsApp veya iletişim hatlarımızdan ihtiyacınız olan ebat ve adede göre net fiyat teklifinizi alın." },
                { step: "2️⃣", title: "Dosya Gönderin", desc: "Firmanıza ait logonuzu ve zarfta yer almasını istediğiniz iletişim/adres bilgilerini bize iletin." },
                { step: "3️⃣", title: "Grafik Kontrolü", desc: "Grafik ekibimiz tasarımınızı milimetrik ölçülere, pencereli/penceresiz hizaya göre düzenler." },
                { step: "4️⃣", title: "PDF Onayı", desc: "Baskı öncesinde hazırlanan dijital tasarımı tarafınıza iletip onayınızı (PDF prova) alırız." },
                { step: "5️⃣", title: "Baskı Aşaması", desc: "Onaylanan çalışma Topkapı tesisimizde yüksek hızlı ofset makinelerinde basılır ve kırıma girer." },
                { step: "6️⃣", title: "Kargo & Teslimat", desc: "Özenle paketlenen baskılı zarflarınız anlaşmalı kargo ile doğrudan adresinize sevk edilir." }
              ].map((item, idx) => (
                <div key={idx} className="space-y-2 bg-gray-50/60 p-4 rounded-xl border border-gray-150 flex flex-col justify-between hover:bg-white hover:shadow-sm hover:border-primary/25 transition-all">
                  <div>
                    <div className="text-2xl mb-1">{item.step}</div>
                    <h4 className="font-black text-black uppercase text-[11px] mb-1.5 leading-snug">{item.title}</h4>
                    <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{item.desc}</p>
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
                  <span className="block font-extrabold text-black uppercase text-[11px] tracking-wider mb-1">Ortalama Üretim Süresi</span>
                  <p className="text-gray-500 font-semibold leading-relaxed">
                    Tasarım onayınızın ardından siparişiniz kalite kontrol süreçlerinden geçirilerek ortalama <strong className="text-emerald-600 font-bold">4 - 6 iş günü</strong> içerisinde üretilir.
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-gray-100">
                  <span className="block font-extrabold text-black uppercase text-[11px] tracking-wider mb-1">Türkiye Geneli Kargo</span>
                  <p className="text-gray-500 font-semibold leading-relaxed">
                    Üretimi biten zarflarınız mukavemetli kolilerle paketlenerek anlaşmalı kargolarımızla Türkiye'nin 81 iline güvenli şekilde sevk edilir.
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-gray-100">
                  <span className="block font-extrabold text-black uppercase text-[11px] tracking-wider mb-1">İstanbul İçi Teslimat</span>
                  <p className="text-gray-500 font-semibold leading-relaxed">
                    İstanbul merkezli üretim tesisimiz sayesinde il sınırları içerisindeki adreslere kargo ve özel sevkiyat ağımız ile çok daha hızlı ulaştırılır.
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
      <ProductSEOSection categoryKey="zarf" />
    </div>
  );
};

export default ZarfPage;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { 
  ChevronDown, 
  ShoppingCart, 
  ShieldCheck, 
  Truck, 
  CheckCircle, 
  Printer, 
  FileText, 
  Layers, 
  Clock
} from 'lucide-react';
import { useCart, ANTETLI_DATA, ProductSEOSection, AgencyDiscountCTA, FireWarning } from '../App';
import { CategoryHero } from './CategoryHero';
import { RelatedBlogPosts } from './RelatedBlogPosts';
import { DeliveryBadge } from './DeliveryBadge';

const ANTETLI_FAQ = [
  {
    q: "Antetli kağıt baskısında minimum sipariş miktarı nedir?",
    a: "Antetli kağıt baskılarında minimum sipariş miktarı tercih edilen ebat ve baskı özelliklerine göre değişebilmektedir. Güncel minimum sipariş seçeneklerini fiyat tablomuzdan inceleyebilirsiniz."
  },
  {
    q: "Antetli kağıt üzerine firma logosu ve kurumsal bilgiler basılabilir mi?",
    a: "Evet. Antetli kağıtlar firmanızın logosu, unvanı, adresi, iletişim bilgileri ve kurumsal kimlik unsurlarıyla yüksek kaliteli ofset baskı tekniği kullanılarak hazırlanmaktadır."
  },
  {
    q: "Antetli kağıt hangi kağıt türüne basılmaktadır?",
    a: "Antetli kağıt baskılarında standart olarak 90 gr. 1. Hamur kağıt kullanılmaktadır. Talebe göre farklı gramaj seçenekleri de değerlendirilebilmektedir. Bu kağıt türü tüm ofis yazıcılarıyla uyumlu yapıya sahiptir."
  },
  {
    q: "Antetli kağıt tek renk ve renkli olarak basılabilir mi?",
    a: "Evet. Antetli kağıtlar tek renk veya çok renkli (CMYK) ofset baskı seçenekleriyle üretilebilmektedir. Baskı tercihi kurumsal kimliğinize ve tasarımınıza göre belirlenmektedir."
  },
  {
    q: "Antetli kağıt hangi ölçülerde basılabilir?",
    a: "En çok tercih edilen ölçüler A4 (21 × 29,7 cm) ve A5 (15 × 21 cm) ebatlarıdır. Talebe göre farklı ölçülerde antetli kağıt baskısı da yapılabilmektedir."
  },
  {
    q: "Antetli kağıt tasarımı için grafik desteği sağlıyor musunuz?",
    a: "Evet. Firmanıza ait logo ve kurumsal bilgileri bizimle paylaşmanız yeterlidir. Grafik ekibimiz antetli kağıt tasarımını hazırlayarak ücretsiz onayınıza sunmaktadır."
  },
  {
    q: "Antetli kağıt baskısı tüm yazıcılarla uyumlu mudur?",
    a: "Evet. Baskıda kullanılan 90 gr. 1. Hamur kağıt ve kaliteli ofset baskı sistemi sayesinde antetli kağıtlar farklı ofis yazıcılarında sorunsuz şekilde kullanılabilmektedir."
  },
  {
    q: "Antetli kağıt baskısı kaç günde tamamlanır?",
    a: "Grafik tasarım onayının ardından antetli kağıt baskıları genellikle 3-5 iş günü içerisinde tamamlanarak kargoya teslim edilmektedir."
  },
  {
    q: "Türkiye'nin her yerine gönderim yapıyor musunuz?",
    a: "Evet. Üretilen antetli kağıtlar özenle paketlenerek Türkiye'nin tüm il ve ilçelerine güvenli şekilde kargo ile gönderilmektedir."
  },
  {
    q: "Antetli kağıt hangi alanlarda kullanılır?",
    a: "Antetli kağıtlar; resmi yazışmalar, teklifler, sözleşmeler, fiyat teklifleri, kurumsal duyurular ve şirket içi yazışmalarda profesyonel bir kurumsal görünüm sağlamak amacıyla kullanılmaktadır."
  },
  {
    q: "Antetli kağıt siparişi nasıl verebilirim?",
    a: "Sipariş vermek için baskıda kullanılacak logo, firma bilgileri ve sipariş detaylarını bizimle paylaşmanız yeterlidir. Tasarım onayının ardından üretim süreci başlatılmaktadır."
  }
];

const ANTETLI_GALLERY = [
  {
    src: "/images/antetli-kagit/kurumsal-antetli-kagit-ornegi.webp",
    alt: "Logo baskılı antetli kağıt örneği",
    title: "Logo Baskılı Antetli Kağıt",
    desc: "Şirket içi ve dışı tüm yazılı iletişimlerinizde markanızı yansıtan şık tasarım ve yüksek çözünürlüklü baskı."
  },
  {
    src: "/images/antetli-kagit/antetli-kagit-baski-fiyatlari.webp",
    alt: "A4 antetli kağıt baskı fiyatları ve tasarım detayları",
    title: "Ekonomik Baskı Çözümleri",
    desc: "Yüksek adetli siparişlerde birim maliyetleri düşüren ekonomik baskı seçenekleri sunulur."
  },
  {
    src: "/images/antetli-kagit/antetli-kagit-tasarimi.webp",
    alt: "Profesyonel antetli kağıt tasarımı ve watermark (filigran) ayarı",
    title: "Özel Tasarım Desteği",
    desc: "Logo, firma bilgileri ve kurumsal renklerinize uygun antetli kağıt tasarımları hazırlanır."
  },
  {
    src: "/images/antetli-kagit/antetli-kagit-baski-detayi.webp",
    alt: "90 gr 1. hamur kağıt üzerine yüksek hassasiyetli ofset baskı detayı",
    title: "Hassas Ofset Baskı",
    desc: "Logonuzun marka renkleriyle (Pantone/CMYK) doğru renk tonlarıyla basılan pürüzsüz ve solmayan baskı kalitesi."
  },
  {
    src: "/images/antetli-kagit/tasarimli-antetli-kagit.webp",
    alt: "Baskı öncesi hazırlık ve matbaa kalıp dosya kontrol süreci",
    title: "Baskı Öncesi Kontrol",
    desc: "Sipariş sonrasında dosyalarınızın çözünürlük, renk formatı ve kesim payları teknik ekibimiz tarafından titizlikle kontrol edilir."
  },
  {
    src: "/images/antetli-kagit/antetli-kagit-baski-fiyatlari.webp",
    alt: "Matbaada üretilen hazır antetli kağıt yığınları",
    title: "Yüksek Adetli Seri Üretim",
    desc: "Yüksek kapasiteli ofset baskı makinelerimizle siparişleriniz en kısa sürede basılarak sevke hazır hale getirilir."
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

export const AntetliPage = () => {
  const { openProductDetail } = useCart();

  const openWhatsApp = (item: any, ebat: string) => {
    openProductDetail({ ...item, ebat }, "Antetli Kağıt");
  };

  // Group by ebat for row-spanning logic in the table
  const flatItems: any[] = [];
  const groups: { [key: string]: any[] } = {};
  
  ANTETLI_DATA.forEach((category) => {
    category.items.forEach((item) => {
      if (!groups[item.ebat]) {
        groups[item.ebat] = [];
      }
      groups[item.ebat].push(item);
    });
  });

  Object.keys(groups).forEach((ebat) => {
    groups[ebat].forEach((item, index) => {
      flatItems.push({
        ...item,
        groupIndex: index,
        groupSize: groups[ebat].length
      });
    });
  });

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Antetli Kağıt Baskı Fiyatları | A5 veya A4 Ebat - Mavi Basım</title>
        <meta name="description" content="Kurumsal yazışmalar için yüksek kaliteli 1. hamur antetli kağıt baskı hizmetleri. Topkapı fabrikasından uygun fiyatlarla hemen sipariş verin." />
      </Helmet>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 text-black animate-in fade-in duration-500">
        <CategoryHero
          title="Logolu Antetli Kağıt Baskı Fiyatları &amp; Kurumsal Yazışma Kağıtları"
          badge="A4 / A5 Ebat - 80gr / 90gr 1. Hamur Lazer Uyumlu"
          description={
            <div className="space-y-2">
              <p>
                Mavi Basım olarak Topkapı tesisimizde lazer ve mürekkep püskürtmeli ofis yazıcılarıyla %100 uyumlu 80 gr ve 90 gr 1. hamur kağıda canlı renkli <strong className="text-slate-900">antetli kağıt baskı</strong> üretimi gerçekleştiriyoruz. Kurumsal kimlik setinizi tamamlamak için <Link to="/zarf" className="text-primary hover:underline font-bold">diplomat zarf</Link>, <Link to="/dosyalar" className="text-primary hover:underline font-bold">cepli dosya</Link>, <Link to="/kartvizit" className="text-primary hover:underline font-bold">kartvizit</Link> ve <Link to="/makbuz-ve-formlar" className="text-primary hover:underline font-bold">otokopili makbuz</Link> sipariş edebilirsiniz.
              </p>
            </div>
          }
          relatedLinks={[
            { label: "Diplomat Zarf", path: "/zarf" },
            { label: "Cepli Dosya", path: "/dosyalar" },
            { label: "Kartvizit Baskı", path: "/kartvizit" },
            { label: "Makbuz & Fiş", path: "/makbuz-ve-formlar" }
          ]}
          customCtaText="Antetli Kağıt Teklifi Al"
        />

        {/* Dynamic Delivery Date Banner */}
        <DeliveryBadge categoryKey="antetli" days={3} variant="banner" className="my-6" />

        {/* FİYAT LİSTESİ TABLOSU */}
        <div className="scroll-mt-24 group mb-12">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-secondary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2 flex-wrap">
                Antetli Kağıt Fiyat Listesi
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-150 text-[11px] font-bold">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span>90 gr. 1. Hamur - Renkli Ofset Baskı</span>
            </div>
          </div>

          <p className="text-gray-650 text-xs sm:text-sm font-semibold mb-6 px-2 leading-relaxed">
            Aşağıdaki tabloda güncel logolu antetli kağıt baskı fiyatlarımızı inceleyebilirsiniz. Baskılarda 90 gr. 1. hamur kağıt kullanılmaktadır.
          </p>

          <div className="bg-white rounded-2xl shadow-xl border-2 border-slate-300 overflow-visible relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[11px] md:text-[13px] font-sans border-2 border-slate-300">
                <thead>
                  <tr className="bg-black text-white border-b-2 border-slate-300 text-center font-black uppercase tracking-tight">
                    <th className="p-4 w-10"></th>
                    <th className="p-4 w-24 border-r-2 border-slate-700/30">KOD</th>
                    <th className="p-4 text-center border-r-2 border-slate-700/30">ADET</th>
                    <th className="p-4 text-center border-r-2 border-slate-700/30">EBAT / TÜR</th>
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
                            <span className="tracking-[0.1em] uppercase text-[10px] md:text-[12px] whitespace-nowrap">ANTETLİ KAĞIT BASKI</span>
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
                        <td className="p-3 text-left font-medium border-r-2 border-slate-200 text-black whitespace-pre-line">
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

        {/* ÜRÜN FOTOĞRAFLARI GALERİSİ */}
        <div className="mb-12 scroll-mt-24">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-7 bg-primary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Antetli Kağıt Ürün Fotoğrafları Galerisi
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ANTETLI_GALLERY.map((img, idx) => (
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

        {/* Antetli Kağıt Baskısı Nasıl Sipariş Verilir? */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Antetli Kağıt Baskısı Nasıl Sipariş Verilir?
            </h2>
          </div>
          <div className="bg-sky-50/50 border border-sky-100 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center gap-4 shadow-sm">
            <span className="w-12 h-12 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-xl shrink-0 font-bold">💬</span>
            <div className="text-center sm:text-left">
              <h3 className="text-sm font-black text-slate-900 uppercase mb-1">Kolay Sipariş ve Ücretsiz Tasarım Onayı</h3>
              <p className="text-xs text-slate-650 font-semibold leading-relaxed">
                Yukarıdaki fiyat listesinde firmanıza en uygun seçeneğin yanında bulunan <strong>"Hemen Sipariş Ver"</strong> butonuna tıklayarak WhatsApp sipariş hattımıza ulaşabilirsiniz. Logonuzu ve iletişim bilgilerinizi bize ilettiğinizde, grafik ekibimiz çalışmayı hazırlar ve onayınız için <strong>PDF prova ücretsiz sunulur</strong>. Onaylanan çalışmalar üretim planına alınır ve sipariş yoğunluğuna bağlı olarak en kısa sürede baskıya başlanır.
              </p>
            </div>
          </div>
        </div>

        {/* ANTETLİ KAĞIT BASKISINDA HANGİ BASKI TÜRÜ KULLANILIR & DOSYA HAZIRLIĞI */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-base md:text-lg font-black text-black uppercase tracking-tight mb-4">
                  Antetli Kağıtta Hangi Baskı Türü Kullanılır?
                </h2>
                <p className="text-xs text-gray-650 font-semibold leading-relaxed text-justify">
                  Antetli kağıt üretiminde CTP kalıp sistemiyle hazırlanan ofset baskı makinelerinde üretim yapılmaktadır. Çok renkli veya tek renk baskılarda, marka renklerinizin tam ve doğru yansıması için <strong>CMYK</strong> standartları ile üretim yapıyoruz. Ofset baskı teknolojisi sayesinde küçük punto yazılar, logolarınız ve iletişim bilgileriniz okunaklı ve net şekilde basılır. Bu sayede yazıcıların fırınlama ünitelerinde mürekkep dağılma yapmaz.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-base md:text-lg font-black text-black uppercase tracking-tight mb-4">
                  Antetli Kağıt Tasarımı İçin Dosya Nasıl Hazırlanmalıdır?
                </h2>
                <p className="text-xs text-gray-650 font-semibold leading-relaxed text-justify">
                  Baskı kalitesinin kusursuz çıkması için tasarımlarınızı vektörel formatta (PDF, AI, CDR) hazırlayarak iletmeniz önerilir. Metinlerinizin kaymaması için tüm yazı tiplerini <strong>eğriye çevirmeniz (Convert to Curves)</strong> zorunludur. Kesim esnasında oluşabilecek ufak kaymaların önüne geçmek adına tasarımınızda her kenardan 3 mm kesim payı bırakılmalı, kritik yasal künyeler veya logolar kesim sınırlarının içerisinde konumlandırılmalıdır.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* NEDEN MAVİ BASIM? */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Neden Biz Tercih Ediliyoruz?
            </h2>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {[
                { title: "Yüksek Sektör Tecrübesi", desc: "Farklı sektörlerde edinilen üretim deneyimi sayesinde antetli kağıt üretiminde ölçü, baskı ve dosya hazırlama süreçleri standartlaştırılmıştır." },
                { title: "Hızlı Grafik Uyarlaması", desc: "Firmanızın logosu ve iletişim bilgileri mevcut tasarımınıza uygun şekilde düzenlenerek PDF prova hazırlanır." },
                { title: "Sıkışma Yapmayan Kağıt", desc: "Ofis yazıcılarının tepsilerinden sorunsuzca geçen, kıvrılma veya sıkışma yapmayan kağıtlar seçiyoruz." },
                { title: "Güvenli Koruyucu Paket", desc: "Antetli kağıtlar taşıma sırasında zarar görmemesi için koli içerisinde koruyucu ambalajla paketlenmektedir." },
                { title: "Direkt İmalatçı Fiyatı", desc: "Aracısız üretim modelimiz sayesinde en uygun fiyat avantajını sunuyoruz." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-primary w-5 h-5 shrink-0" />
                    <h3 className="font-black text-black uppercase text-[12px] leading-tight">{item.title}</h3>
                  </div>
                  <p className="text-xs text-gray-650 font-semibold leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FİYATI ETKİLEYEN FAKTÖRLER */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Antetli Kağıt Fiyatını Neler Belirler?
            </h2>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8">
            <p className="text-sm font-semibold text-gray-650 mb-6 leading-relaxed text-justify">
              Antetli kağıt baskı maliyetleri; sipariş miktarı, seçilecek ebat (A4 veya A5) ve baskı rengi seçeneklerine bağlı olarak değişkenlik gösterir.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Sipariş Adedi", desc: "Ofset üretim yapısı gereği yüksek adetli baskılarda birim maliyetler daha ekonomik hale gelir." },
                { title: "Ebat Seçeneği", desc: "Standart yazışmalar için tercih edilen A4 ebadı ile daha kompakt olan A5 ebadı arasında kağıt kullanımına bağlı fiyat farkı bulunur." },
                { title: "Kağıt Kalitesi", desc: "Yazıcılarda yüksek besleme uyumu sunan 1. Hamur kağıtlarımızın gramaj kalitesi fiyatı belirleyen bir diğer etkendir." },
                { title: "Baskı Rengi", desc: "Baskıda uygulanacak renk sayısı, kalıp hazırlık süreçlerini etkileyerek fiyatı şekillendirir." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-150 shadow-sm">
                  <h3 className="font-extrabold text-primary uppercase text-xs mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-550 font-semibold leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ÜRETİM SÜRECİ */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-secondary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Antetli Kağıt Nasıl Üretiliyor? (Adım Adım Üretim Süreci)
            </h2>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8">
            <p className="text-sm font-semibold text-gray-650 mb-6 leading-relaxed">
              Üretim tesislerimizde antetli kağıtların üretimi 4 temel aşamada gerçekleştirilmektedir:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Grafik Onayı", desc: "Logonuz ve firma bilgileriniz şablon üzerine yerleştirilip onayınız için PDF prova sunulur." },
                { step: "2", title: "CTP Kalıp Hazırlığı", desc: "Onay verdiğiniz tasarımın renk katmanları için yüksek çözünürlüklü ofset baskı kalıpları (CTP) bilgisayarlı ortamda işlenir." },
                { step: "3", title: "Ofset Baskı Üretimi", desc: "Standart yazıcılarla tam uyumlu 1. sınıf hamur kağıtlara ofset makinelerle net baskı uygulanır." },
                { step: "4", title: "Kesim & Paketleme", desc: "Basılan tabaka kağıtlar milimetrik giyotinlerle belirlenen ölçülerde kesilir, nemden etkilenmeyecek koruyucu paketlerle sevk edilir." }
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

        {/* ÖLÇÜLER VE KAĞIT ÖZELLİKLERİ */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Antetli Kağıt Ölçüleri &amp; Özellikleri
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Kağıt Karşılaştırması */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-950 uppercase mb-4">
                  Ebat Karşılaştırması
                </h3>
                <p className="text-xs text-gray-650 mb-4 font-semibold">
                  Talebinize ve kullanım amacınıza göre iki farklı antetli kağıt ebatı sunuyoruz.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold leading-relaxed mb-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-150">
                    <h4 className="font-extrabold text-primary uppercase mb-2">A4 Ebat (21x29.7 cm)</h4>
                    <p className="text-slate-650 mb-2 leading-relaxed">
                      Tüm resmi belgeler, sözleşmeler, teklif mektupları ve fatura basımları için standart ofis evrak ölçüsüdür.
                    </p>
                    <ul className="space-y-1 text-slate-700">
                      <li>✓ Standart ofis yazıcılarıyla tam uyum</li>
                      <li>✓ Resmi sözleşme ve yazışmalar</li>
                      <li>✓ Diplomat zarflarla tam entegrasyon</li>
                      <li>✓ Profesyonel görünüm</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-150">
                    <h4 className="font-extrabold text-secondary uppercase mb-2">A5 Ebat (15x21 cm)</h4>
                    <p className="text-slate-650 mb-2 leading-relaxed">
                      Bilgilendirme formları, servis formları, not kağıtları ve reçeteler gibi daha az içerikli yazışmalar için tercih edilir.
                    </p>
                    <ul className="space-y-1 text-slate-700">
                      <li>✓ Daha kompakt ve taşınabilir boyut</li>
                      <li>✓ Kısa notlar ve reçeteler için ideal</li>
                      <li>✓ Yüksek adetlerde daha ekonomik bütçe</li>
                      <li>✓ Pratik ve işlevsel evrak yapısı</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Kalite Güvencesi */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-950 uppercase mb-4">
                  Kalite Standartlarımız
                </h3>
                <p className="text-xs text-gray-650 mb-4 font-semibold">
                  Üretimde 90 gr. 1. hamur kağıt ve ofset baskıya uygun matbaa boyaları kullanılmaktadır.
                </p>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-150 flex gap-4">
                    <FileText className="text-primary w-6 h-6 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-extrabold text-black uppercase text-xs mb-1">Pürüzsüz 1. Sınıf Hamur</h4>
                      <p className="text-xs text-gray-650 font-semibold leading-relaxed">
                        Tüm ofis yazıcılarında pürüzsüz besleme sağlayan, yazdırma sırasında mürekkebi dağıtmayan yüksek standartlı kağıt dokusu sunuyoruz.
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-150 flex gap-4">
                    <Printer className="text-secondary w-6 h-6 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-extrabold text-black uppercase text-xs mb-1">Laser Yazıcılarla Uyumlu Baskı</h4>
                      <p className="text-xs text-gray-650 font-semibold leading-relaxed">
                        Kullandığımız boyalar yüksek ısıda çalışan lazer yazıcılarda yüksek ısıya dayanıklıdır ve baskıda dağılma oluşturmaz.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SSS (FAQ) ALANI */}
        <div className="mb-14 text-black scroll-mt-24">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-6 bg-secondary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Sıkça Sorulan Sorular (S.S.S.)
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {ANTETLI_FAQ.map((faq, idx) => (
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

        <AgencyDiscountCTA />
        <RelatedBlogPosts category="antetli" />
      </div>
      <ProductSEOSection categoryKey="antetli_kagit" />
    </div>
  );
};

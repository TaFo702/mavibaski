import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ChevronDown, Phone, ShoppingCart } from 'lucide-react';
import { useCart, ProductSEOSection, AgencyDiscountCTA, FireWarning } from '../App';
import RelatedBlogPosts from './RelatedBlogPosts';

import { KUP_BLOKNOT_DATA } from '../data/extraProductData';
export { KUP_BLOKNOT_DATA };

const KUP_BLOKNOT_DETAILS = {
  breadcrumbTitle: "Küp Bloknot",
  h1Title: "Küp Bloknot Baskı Fiyatları | Promosyon Küp Bloknot",
  subtitle: "Ofis masalarının en prestijli, fonksiyonel ve uzun ömürlü tanıtım aracı olan logolu küp bloknotlar, markanızı her an müşterilerinizin elinin altında tutar.",
  gallery: [
    {
      src: "/images/kup-bloknot/kutulu-kup-bloknot-baski.webp",
      alt: "karton-kutulu-promosyon-kup-bloknot-tasarimi",
      title: "Karton Kutulu Küp Bloknot",
      desc: "Promosyon amaçlı her yaprağında logonuzun yer aldığı, parlak veya mat selefonlu karton kutulu küp bloknot tasarımı."
    },
    {
      src: "/images/kup-bloknot/kup-bloknot-baski-fiyatlari.webp",
      alt: "8x8-cm-masaustu-kup-not-defteri-uretimi",
      title: "Masaüstü Küp Bloknot",
      desc: "8x8 cm ölçülerinde masaüstü küp not defteri üretimi, ofis çalışanlarının en pratik yardımcısı."
    },
    {
      src: "/images/kup-bloknot/kup-bloknot-baski-detayi.webp",
      alt: "kup-bloknot-baski-detayi-ve-kalitesi",
      title: "Küp Bloknot Baskı Detayı",
      desc: "Ofset baskı teknolojisiyle net ve canlı renkler, kaliteli 1. hamur kağıt yaprakları ile profesyonel görünüm."
    },
    {
      src: "/images/kup-bloknot/kup-bloknot-tasarimi.webp",
      alt: "kurumsal-kup-bloknot-grafik-tasarimi",
      title: "Küp Bloknot Grafik Tasarımı",
      desc: "Kutu dış yüzeyi ve iç yapraklarında kurumsal kimliğinizi yansıtan estetik ve fonksiyonel tasarım çözümleri."
    },
    {
      src: "/images/kup-bloknot/promosyon-kup-bloknot-ornegi.webp",
      alt: "promosyon-kutulu-kup-bloknot-ornegi",
      title: "Promosyon Küp Bloknot Örneği",
      desc: "Müşterilerinizin masalarında 365 gün markanızı hatırlatacak en etkili promosyon matbaa ürünü."
    },
    {
      src: "/images/kup-bloknot/kup-bloknot-baski.webp",
      alt: "kup-bloknot-ofset-baski-ve-sevk",
      title: "Ofset Baskı ve Kalite Kontrol",
      desc: "Baskı sonrası giyotin kesim, kutu katlama ve özenli paketleme ile güvenli sevkiyat süreci."
    }
  ],
  faqList: [
    { q: "Küp Bloknot için minimum sipariş adedi nedir?", a: "Minimum sipariş miktarı seçilen ölçü, yaprak sayısı ve üretim özelliklerine göre değişebilir. Güncel minimum sipariş adedi ve fiyat bilgisi için bizimle iletişime geçebilirsiniz." },
    { q: "Küp Bloknot fiyatları neden değişir?", a: "Küp Bloknot fiyatları; tercih edilen yaprak sayısı (250 veya 500 yaprak), sipariş adedi (100, 250, 500, 1000 adet), kutu yüksekliği, mat/parlak selefon seçimi ve kabartma lak gibi özel işçilik uygulamalarına bağlı olarak değişkenlik gösterir." },
    { q: "Kutu baskısı dahil midir?", a: "Evet. Belirtilen tüm fiyatlarımıza dış karton kutunun 4 dış yüzeyinin de tam renkli, koruyucu kaplamalı (selefonlu) baskısı ile iç yaprakların tek yön tek renk baskısı dahildir." },
    { q: "Numune ürün gönderiliyor mu?", a: "Seri üretim öncesinde talep ederseniz daha önce ürettiğimiz gerçek müşteri ürünlerinden oluşan numune paketini tarafınıza kargo ile gönderebiliriz. Böylece kağıt kalitesini ve kutu sağlamlığını yakından inceleyebilirsiniz." },
    { q: "Acil üretim yapılabilir mi?", a: "Fabrikamızın üretim yoğunluğuna bağlı olarak acil etkinlik ve fuar teslimatlarınız için ekspres üretim programı uygulayabilmekteyiz. Lütfen teslim tarihini müşteri temsilcimize bildiriniz." },
    { q: "Kurumsal toplu siparişlerde özel fiyat var mı?", a: "Evet. 1.000 adet ve üzeri çoklu şube gönderimleri, holding ve kurumsal toplu promosyon siparişleriniz için özel iskonto oranları uygulamaktayız. Teklif istemek için bizimle iletişime geçebilirsiniz." },
    { q: "Küp Bloknot üzerine kendi logomu bastırabilir miyim?", a: "Evet. Küp Bloknotlar firmanıza özel olarak üretilir. Logo, kurumsal renkler, iletişim bilgileri ve dilediğiniz tasarım hem dış kutuya hem de iç sayfalara uygulanabilir." },
    { q: "Küp Bloknot tasarım hizmeti veriyor musunuz?", a: "Evet. Hazır tasarım dosyanız yoksa profesyonel tasarım desteği sunuyoruz. Baskıya uygun dosyanız hazır ise doğrudan üretim aşamasına geçilebilir." },
    { q: "Küp Bloknot baskısı kaç günde hazırlanır?", a: "Üretim süresi sipariş miktarına ve baskı yoğunluğuna göre değişiklik gösterebilir. Baskı onayınız alındıktan sonra ürünler planlanan üretim sürecine alınır ve en kısa sürede hazırlanarak teslim edilir." },
    { q: "Türkiye'nin her yerine kargo gönderiyor musunuz?", a: "Evet. Küp Bloknot siparişlerinizi İstanbul başta olmak üzere Ankara, İzmir, Bursa, Antalya, Konya, Gaziantep, Kayseri, Samsun ve Türkiye'nin 81 iline güvenli kargo ile gönderiyoruz." },
    { q: "Küp Bloknotlarda yaprak sayısı değiştirilebilir mi?", a: "Evet. İhtiyacınıza göre farklı yüksekliklerde ve farklı yaprak sayılarında Küp Bloknot üretimi yapılabilir. Uygun seçenekler sipariş öncesinde belirlenebilir." },
    { q: "Küp Bloknot kutusunun ölçüsü değiştirilebilir mi?", a: "Standart ölçülerin yanında talebe göre farklı ebatlarda kutu üretimi de yapılabilmektedir. Özel ölçü talepleriniz için bizimle iletişime geçebilirsiniz." },
    { q: "Aynı tasarımla tekrar sipariş verebilir miyim?", a: "Evet. Daha önce onaylanan tasarım dosyanız arşivlenir. Same tasarımla yeniden sipariş verebilir veya isterseniz tasarım üzerinde güncelleme yapabilirsiniz." },
    { q: "Küp Bloknot kurumsal firmalar için uygun mudur?", a: "Evet. Küp Bloknotlar banka, sigorta şirketi, lojistik firması, otomotiv, sağlık kuruluşları, eğitim kurumları, muhasebe ofisleri ve manyetik gücü yüksek diğer sektörlerde masaüstü kullanım için tercih edilen uzun ömürlü promosyon ürünleri arasında yer alır." },
    { q: "Sipariş vermek için baskıya hazır dosya göndermem gerekir mi?", a: "Hayır. Baskıya hazır dosyanız varsa doğrudan kullanabiliriz. Hazır tasarımınız bulunmuyorsa tasarım ekibimiz baskıya uygun çalışmayı hazırlayarak onayınıza sunar." }
  ]
};

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
        decoding="async"
        referrerPolicy="no-referrer"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/images/kup-bloknot/kup-bloknot-baski-fiyatlari.webp";
        }}
        className={`w-full h-full object-contain rounded-lg transition-all duration-300 ${imgClassName}`} 
      />
    </div>
  );
};

export const KupBloknotPage = () => {
  const { openProductDetail } = useCart();

  const openWhatsApp = (item: any) => {
    openProductDetail(item, "Küp Bloknot");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Küp Bloknot Baskı Fiyatları | Promosyon Küp Bloknot - Mavi Basım</title>
        <meta name="description" content="Ofis masalarının vazgeçilmezi logolu melamin kutulu veya karton kutulu küp bloknot kağıt baskıları. Topkapı matbaasından toptan fiyat avantajı ve hızlı kargoyla." />
      </Helmet>

      {/* Breadcrumb Alanı */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="text-xs font-bold text-gray-500 uppercase tracking-tight flex items-center gap-1.5" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
          <ChevronDown size={12} className="-rotate-90 text-gray-400 shrink-0" />
          <span className="text-gray-800 font-extrabold truncate">{KUP_BLOKNOT_DETAILS.breadcrumbTitle}</span>
        </nav>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 text-black animate-in fade-in duration-500">
        
        {/* H1 BAŞLIK */}
        <div className="text-center mb-6">
          <h1 className="text-[19px] md:text-[26px] lg:text-[31px] font-black text-primary uppercase tracking-tight mb-3 leading-tight">
            {KUP_BLOKNOT_DETAILS.h1Title}
          </h1>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* İLK BÖLÜM: METİN ALANI */}
        <div className="max-w-[1200px] mx-auto text-slate-700 text-sm md:text-[15px] leading-relaxed font-semibold text-justify space-y-4 mb-10">
          <p>
            <strong className="text-primary font-bold">Küp Bloknot</strong>, ofis ve iş yerlerindeki masaüstlerinde en uzun süre kalan ve kalıcılığı en yüksek olan promosyon ürünlerinden biridir. Geleneksel reklam materyalleri kaybolurken, markanıza özel tasarlanmış lüks bir <strong className="text-primary font-bold">promosyon Küp Bloknot</strong>, müşterilerinizin her not alışında gözünün önünde kalmanızı sağlar.
          </p>
          <p>
            <strong className="text-primary font-bold">Logolu Küp Bloknot</strong> ve <strong className="text-primary font-bold">karton kutulu Küp Bloknot</strong> çeşitleri, düşük maliyetle uzun vadeli prestijli bir tanıtım sunar. Mavi Basım olarak; en kaliteli 80 gr 1. Hamur kağıt yaprakları, pürüzsüz mat/parlak selefon kaplamalı Bristol dış kutuları ve mükemmel ofset baskı teknolojisiyle kurumsal ihtiyaçlarınızı üretiyoruz.
          </p>
          <p className="text-xs text-gray-500 italic">
            Küp Bloknot fiyatları; tercih edilen not yaprağı sayısı (250 veya 500 yaprak), sipariş adedi (100, 250, 500, 1000 adet), dış kutu kaplama türü (mat/parlak selefon, kabartma lokal lak), özel ölçü gereksinimleri ve grafik tasarım desteği gibi değişken faktörlere göre belirlenmektedir.
          </p>
        </div>

        {/* FİYAT LİSTESİ TABLOSU */}
        <div className="scroll-mt-24 group mb-12">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-secondary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight flex items-center gap-2 flex-wrap">
                {KUP_BLOKNOT_DETAILS.breadcrumbTitle} Fiyat Listesi
              </h2>
            </div>
          </div>

          <p className="text-gray-650 text-xs sm:text-sm font-semibold mb-6 px-2 leading-relaxed">
            Aşağıdaki fiyat listesinden dilediğiniz adet ve kutu ebatlarına göre küp bloknot siparişinizi oluşturabilirsiniz. Baskı öncesi grafik kontrolü ücretsiz olup onayınız sonrası üretime başlanır.
          </p>

          <div id="fiyat-listesi" className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-visible relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[11px] md:text-[13px]">
                <thead>
                  <tr className="bg-black text-white border-b border-black">
                    <th className="p-4 w-10"></th>
                    <th className="p-4 w-24 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 whitespace-nowrap">KOD</th>
                    <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ADET</th>
                    <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">EBAT</th>
                    <th className="p-4 text-center font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10">ÖZELLİKLER</th>
                    <th className="p-4 w-32 font-black uppercase tracking-tight text-[14px] md:text-[16px] border-r border-white/10 whitespace-nowrap">FİYAT</th>
                    <th className="p-4 w-44 font-black uppercase tracking-tight text-[14px] md:text-[16px] text-center">SİPARİŞ</th>
                  </tr>
                </thead>
                <tbody>
                  {KUP_BLOKNOT_DATA.map((category) => (
                    category.items.map((item, idx) => {
                      return (
                        <tr 
                          key={item.code} 
                          className={`hover:bg-primary/10 hover:shadow-[inset_4px_0_0_0_#29abe2] transition-all cursor-default group ${
                            category.cat === "250'LİK" && idx === category.items.length - 1
                              ? 'border-b-2 border-primary'
                              : 'border-b border-gray-100'
                          }`}
                        >
                          {idx === 0 && (
                            <td 
                              rowSpan={category.items.length}
                              className="bg-primary text-white font-black text-center p-1 w-10 border-r border-white/10"
                              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                            >
                              <span className="tracking-[0.1em] uppercase text-[10px]">{category.cat}</span>
                            </td>
                          )}
                          <td className="p-3 text-center font-bold text-primary border-r border-gray-100 group-hover:text-secondary transition-colors whitespace-nowrap">{item.code}</td>
                          <td className="p-3 text-center font-medium text-black border-r border-gray-100">{item.miktar}</td>
                          <td className="p-3 text-center font-medium text-black border-r border-gray-100">{item.ebat}</td>
                          <td className="p-3 text-center text-black font-medium border-r border-gray-100">
                            {item.desc}
                          </td>
                          <td className="p-3 text-center font-black text-black border-r border-gray-100 bg-gray-50/30 group-hover:bg-primary/5 text-[14px] md:text-[16px] transition-colors whitespace-nowrap">{item.price}</td>
                          <td className="p-3 text-center">
                            <button 
                              onClick={() => openWhatsApp(item)}
                              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-5 py-2 rounded-full text-xs md:text-sm font-black tracking-tight leading-none transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
                            >
                              <ShoppingCart size={14} className="shrink-0" />
                              <span>Hemen Sipariş Ver</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 px-5 py-4 border-t border-gray-150 rounded-b-2xl flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-medium font-sans gap-3">
              <div className="text-left space-y-0.5">
                <p>* Tabloda belirtilen fiyatlarımıza %20 KDV dahil değildir.</p>
                <p className="text-primary font-bold">Küp Bloknot baskıda toptan avantajı nedeniyle minimum üretim adedi 100 adettir.</p>
              </div>
              <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
                <a 
                  href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, küp bloknot fiyat listenizi inceledim. Taslak onayı ve hızlı sipariş başlangıcı için detaylı fiyat teklifi alabilir miyim?")}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-full font-black uppercase tracking-tight flex items-center gap-1.5 transition-all shadow-md transform hover:-translate-y-0.5 text-[11px]"
                >
                  💬 Hemen Fiyat Teklifi Al (WhatsApp)
                </a>
                <a 
                  href="tel:+905366022373"
                  className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-full font-black uppercase tracking-tight flex items-center gap-1.5 transition-all text-[11px]"
                >
                  📞 Doğrudan Müşteri Hattını Ara
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <FireWarning />
          </div>

          {/* SİPARİŞ PARAMETRELERİ ÖZETİ (Item 5) */}
          <div className="bg-slate-50 border border-gray-200 rounded-2xl p-5 my-6 text-black">
            <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase mb-3 flex items-center gap-2">
              Sipariş, Numune ve İlave Maliyet Parametreleri Özeti
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 text-xs font-semibold leading-relaxed">
              <div className="bg-white p-3 rounded-xl border border-gray-150">
                <span className="text-primary font-black block mb-0.5">GRAFİK TASARIM</span>
                <span className="text-emerald-600 font-bold block mb-1">ÜCRETSİZ DESTEK</span>
                <p className="text-[11px] text-gray-550 font-medium">Baskıya uygun logonuzun yerleşimi ve şablon mizanpajı tamamen ücretsizdir.</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-150">
                <span className="text-primary font-black block mb-0.5">MAT SELEFON FARKI</span>
                <span className="text-black font-bold block mb-1">+240 ₺ / Toplam</span>
                <p className="text-[11px] text-gray-550 font-medium">Dış kutunun mat kaplaması için tüm siparişe eklenen tek seferlik farktır.</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-150">
                <span className="text-primary font-black block mb-0.5">KABARTMA / LOKAL LAK</span>
                <span className="text-black font-bold block mb-1">+1.500 ₺ / Toplam</span>
                <p className="text-[11px] text-gray-550 font-medium">Logoya derinlik ve şıklık katan kabartmalı lak uygulaması ilavesidir.</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-150">
                <span className="text-primary font-black block mb-0.5">ÜCRETSİZ NUMUNE</span>
                <span className="text-emerald-600 font-bold block mb-1">NUMUNE PAKETİ</span>
                <p className="text-[11px] text-gray-550 font-medium">Ürün kalitemizi bizzat görmeniz için önceki kurumsal imalatlarımızdan numune paketini ücretsiz kargo ile gönderiyoruz.</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-150">
                <span className="text-primary font-black block mb-0.5">ÖZEL ÖLÇÜ TALEBİ</span>
                <span className="text-amber-600 font-bold block mb-1">ÖZEL HESAPLAMA</span>
                <p className="text-[11px] text-gray-550 font-medium">Standart ölçüler dışındaki taleplerinizde; bıçak yapımı, kağıt firesi ve kalıp değişimine göre özel fiyat hesaplanır.</p>
              </div>
            </div>
          </div>

          {/* SEÇİM ASİSTANI (SATIN ALMA NETLİĞİ REHBERİ) */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl border border-blue-100 p-6 my-8 text-black">
            <h3 className="text-sm md:text-base font-black text-slate-900 uppercase mb-4">
              Hangi Küp Bloknot Seçeneği Size Uygun? (Seçim Rehberi)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-sm">
                <span className="inline-block bg-primary/10 text-primary text-[10px] font-black uppercase px-2 py-0.5 rounded-full mb-2">Yaprak Sayısı</span>
                <h4 className="font-bold text-xs text-black mb-1">250 Yaprak vs 500 Yaprak</h4>
                <p className="text-[11px] text-gray-650 leading-relaxed font-semibold">
                  <strong>250 Yaprak (2.5 cm):</strong> Kısa süreli fuarlar, seminerler, lansmanlar veya düşük bütçeli promosyon dağıtımları için idealdir.<br />
                  <strong>500 Yaprak (5 cm):</strong> Masaüstünde aylarca sürecek kalıcı bir ofis varlığı ve en yüksek reklam süresi sunar. Standart kurumsal seçimdir.
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-sm">
                <span className="inline-block bg-secondary/10 text-secondary text-[10px] font-black uppercase px-2 py-0.5 rounded-full mb-2">Sipariş Miktarı</span>
                <h4 className="font-bold text-xs text-black mb-1">100 Adet mi, 1000 Adet mi?</h4>
                <p className="text-[11px] text-gray-650 leading-relaxed font-semibold">
                  <strong>100-250 Adet:</strong> Butik ofisler, yeni başlayanlar, az sayıda bayisi olan veya sınırlı personel kadrosu olan firmalar için mantıklıdır.<br />
                  <strong>500-1000 Adet:</strong> Geniş kitlelere promosyon dağıtan holdingler, kargo, gümrük firmaları için birim maliyette en yüksek tasarrufu sağlar.
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm ring-2 ring-primary/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-bl">EN POPÜLER</div>
                <span className="inline-block bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-full mb-2">En Çok Tercih Edilen</span>
                <h4 className="font-bold text-xs text-emerald-800 mb-1">500 Yaprak - 500 Adet Seti</h4>
                <p className="text-[11px] text-gray-650 leading-relaxed font-semibold">
                  Kurumsal markaların %85'i hem masada daha dolgun ve prestijli durduğu hem de kargo başına birim maliyeti optimize ettiği için <strong>500'lük kutu / 500 adet</strong> kombinasyonunu tercih etmektedir.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* PROS STEPS: FİYAT LİSTESİNDEN SİPARİŞE GEÇİŞ AKIŞI (Item 17) */}
        <div className="mb-12 bg-primary/5 border border-primary/20 rounded-3xl p-6 md:p-8 text-black shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <span className="inline-block bg-primary text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider">
                SİPARİŞ VERMEK ÇOK KOLAY!
              </span>
              <h3 className="text-lg md:text-xl font-black text-slate-900 uppercase">
                Kutu Tipi + Adet + Logo Gönderin, Aynı Gün Taslağınızı Hazırlayalım!
              </h3>
              <p className="text-xs text-gray-700 font-semibold leading-relaxed">
                Beğendiğiniz küp bloknot kutu tipini (250'lik veya 500'lük), istediğiniz adedi ve logonuzu bize ulaştırın. Tasarım ekibimiz logonuzu baskı şablonuna yerleştirip <strong>ücretsiz olarak dijital onay taslağını</strong> hazırlar. Siz onay vermeden asla üretime başlanmaz.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
                <div className="flex items-start gap-2 bg-white/70 p-3 rounded-xl border border-primary/10">
                  <span className="text-primary font-black text-sm">1</span>
                  <p className="text-[11px] text-gray-800 leading-tight"><strong>Seçiminizi Yapın:</strong> Kutu ebatını (250/500 yaprak) ve adedi belirleyin.</p>
                </div>
                <div className="flex items-start gap-2 bg-white/70 p-3 rounded-xl border border-primary/10">
                  <span className="text-primary font-black text-sm">2</span>
                  <p className="text-[11px] text-gray-800 leading-tight"><strong>Logo & Detayları İletin:</strong> Logonuzu yüksek çözünürlüklü WhatsApp'tan gönderin.</p>
                </div>
                <div className="flex items-start gap-2 bg-white/70 p-3 rounded-xl border border-primary/10">
                  <span className="text-primary font-black text-sm">3</span>
                  <p className="text-[11px] text-gray-800 leading-tight"><strong>Tasarımı Onaylayın:</strong> Hazırladığımız dijital baskı provasını onaylayın, üretime geçelim.</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5">
              <a 
                href="https://wa.me/905366022373?text=Merhaba,%20küp%20bloknot%20siparişi%20vermek%20istiyorum.%20Kutu%20tipi,%20adet%20ve%20logomu%20gönderip%20taslak%20onayı%20alabilir%20miyim?"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full text-center inline-flex items-center justify-center bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3.5 rounded-full text-xs md:text-sm font-black tracking-tight hover:scale-105 active:scale-95 transition-all shadow-md shrink-0"
              >
                <span>Logo Gönder & Hızlı Sipariş Başlat</span>
              </a>
              <div className="text-center text-[10px] text-gray-500 font-bold italic">
                * Grafik tasarım desteğimiz ve prova hazırlığı ücretsizdir!
              </div>
            </div>
          </div>
        </div>

        {/* H2: Küp Bloknot Kimler İçin Uygundur & Nerelerde Kullanılır? */}
        <div className="mb-10 text-black">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Küp Bloknot Kimler İçin Uygundur & Nerelerde Kullanılır?
            </h2>
          </div>
          <div className="bg-gray-50 border border-gray-150 rounded-3xl p-6 md:p-8 space-y-6 text-xs sm:text-sm font-semibold leading-relaxed text-gray-650">
            <p>
              Logolu küp bloknotlar, çalışma masalarında kurumsal prestiji temsil eden, müşterilerine pratik promosyon sunmak isteyen işletmeler için en etkili basılı tanıtım ürünüdür. Diğer broşür veya el ilanlarına kıyasla küp bloknotlar, doğrudan hedef kitlenizin masasında, yani bilgisayar monitörlerinin hemen yanında en değerli alanda kendine yer bulur ve aylarca kalıcı olur.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-sm">
                <h4 className="font-black text-black uppercase text-xs mb-2">Lojistik, Gümrük & Kargo</h4>
                <p className="text-xs leading-normal font-semibold text-gray-600">Takip numaralarını, plaka kayıtlarını, konteyner kodlarını ve anlık teslimat adreslerini hızlıca kaydetmek için sürekli saha ve operasyon masalarında hazır bulundurulur.</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-sm">
                <h4 className="font-black text-black uppercase text-xs mb-2">Sigorta, Finans & Muhasebe</h4>
                <p className="text-xs leading-normal font-semibold text-gray-600">Müşterilerle yüz yüze yapılan teklif, poliçe ve vergi görüşmelerinde kritik tutarları, taksit vadelerini ve randevuları hızlıca yazıp müşteriye vermek için idealdir.</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-sm">
                <h4 className="font-black text-black uppercase text-xs mb-2">Sağlık & Eğitim Kurumları</h4>
                <p className="text-xs leading-normal font-semibold text-gray-600">Randevu saatlerini, laboratuvar veya tahlil hatırlatıcılarını, öğretmen-veli görüşme notlarını ve hızlı hekim direktiflerini pratik şekilde iletmek amacıyla kullanılır.</p>
              </div>
            </div>

            <div>
              <p className="font-black text-black uppercase mb-3">En Çok Tercih Edilen Kurumsal Sektörler:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  "Lojistik & Kargo", "Gümrük Müşavirliği", "Sigorta Acenteleri", "Otomotiv Plazaları",
                  "Eğitim Kurumları", "Sağlık & Klinik", "Muhasebe Ofisleri", "Bankalar"
                ].map((sec, idx) => (
                  <div key={idx} className="bg-white px-4 py-2.5 rounded-xl border border-gray-150 shadow-sm flex items-center gap-2">
                    <span className="text-primary text-xs">✦</span>
                    <span className="text-xs font-bold text-gray-800">{sec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ÜRÜN FOTOĞRAFLARI GALERİSİ */}
        <div className="mb-12 scroll-mt-24">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-7 bg-primary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Küp Bloknot Ürün Fotoğrafları Galerisi
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {KUP_BLOKNOT_DETAILS.gallery.map((img, idx) => (
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

        {/* H2: Neden Küp Bloknot Tercih Edilmelidir? (Item 8 - Birleştirildi ve Item 12 - İç Linkler Eklendi) */}
        <div className="mb-12 text-black scroll-mt-24">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-2.5 h-6 bg-secondary rounded-full shrink-0" />
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
              Neden Küp Bloknot Tercih Edilmelidir?
            </h2>
          </div>
          <div className="bg-gray-50 border border-gray-150 rounded-3xl p-6 md:p-8 space-y-4 text-xs sm:text-sm font-semibold leading-relaxed text-gray-650">
            <p>
              Günümüz kurumsal pazarlama dünyasında fiziksel tanıtım materyallerinin, özellikle her gün masasında saatler geçiren profesyoneller üzerindeki etkisi yadsınamaz. Rekabetin yoğun olduğu sektörlerde akılda kalmak ve markanızı her an görünür kılmak için en etkili promosyon araçlarından biri <strong className="text-black">küp bloknot baskı</strong> kullanımıdır. Diğer broşür veya el ilanlarına kıyasla küp bloknotların sağladığı en büyük avantaj, doğrudan hedef kitlenizin masasında, yani bilgisayar monitörlerinin hemen yanında en değerli alanda kendine yer bulmasıdır.
            </p>
            <p>
              Uzun ömürlü kullanımı sayesinde, müşterileriniz her not aldığında firmanızın logosu, iletişim numaraları ve marka gücü doğrudan bilinçaltına işlenir. Bu kalıcı promosyon etkisi, yıllık reklam harcamalarınızda en yüksek getiri sağlayan yatırımlardan birini oluşturur.
            </p>
            {/* İÇ LİNKLER BÖLÜMÜ (Item 12) */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="font-bold text-black mb-2 uppercase text-xs">Kurumsal Setinizi Tamamlayacak Alakalı Ürünlerimiz:</p>
              <div className="flex flex-wrap gap-2">
                <Link to="/bloknotlar" className="bg-white hover:bg-primary/10 text-primary hover:text-secondary border border-gray-200 hover:border-primary px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm">
                  Bloknot Defter Baskısı
                </Link>
                <Link to="/dosyalar" className="bg-white hover:bg-primary/10 text-primary hover:text-secondary border border-gray-200 hover:border-primary px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm">
                  Cepli Dosya Baskısı
                </Link>
                <Link to="/antetli" className="bg-white hover:bg-primary/10 text-primary hover:text-secondary border border-gray-200 hover:border-primary px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm">
                  Antetli Kağıt Baskısı
                </Link>
                <Link to="/kartvizit" className="bg-white hover:bg-primary/10 text-primary hover:text-secondary border border-gray-200 hover:border-primary px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm">
                  Kartvizit Baskısı
                </Link>
                <Link to="/zarf" className="bg-white hover:bg-primary/10 text-primary hover:text-secondary border border-gray-200 hover:border-primary px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow-sm">
                  Zarf Baskısı
                </Link>
              </div>
            </div>

            {/* Hızlı Fiyat Geçiş CTA (Item 4) */}
            <div className="mt-4 pt-4 border-t border-gray-150 flex flex-col sm:flex-row justify-end items-center gap-3">
              <a 
                href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, küp bloknot için özel ölçü, farklı adet veya farklı özelliklerde özel fiyat teklifi alabilir miyim?")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 px-4 py-2 rounded-full text-xs font-black uppercase transition-all shadow-sm"
              >
                💬 Özel Ölçü/Teklif Al (WhatsApp)
              </a>
            </div>
          </div>
        </div>

        {/* ÜRETİM SÜRECİ (Item 10 - Kısaltıldı ve Item 16 - Typo Düzeltildi) */}
        <div className="mb-12 text-black">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-primary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Üretim Süreci
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Baskı Hazırlığı", desc: "Tasarımlarınız, 80 gr 1. Hamur kağıtlar üzerine yüksek hızlı ofset makinelerde hassasiyetle basılır." },
              { step: "02", title: "Kutu Üretimi", desc: "Kutu mukavemeti için 350 gr Amerikan Bristol karton basılıp koruyucu parlak/mat selefon kaplaması yapılır." },
              { step: "03", title: "Tutkallama", desc: "Kağıtlar düzgünce hizalanarak, arka sırt kısımlarından cilt tutkalı ile blok haline getirilir." },
              { step: "04", title: "Paketleme", desc: "Tutkallanan bloklar dış kutularına yerleştirilir ve korumalı kolilerde kargoya hazır duruma getirilir." }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-150 rounded-2xl p-5 hover:bg-white hover:shadow-md transition-all">
                <span className="text-xs font-black text-primary block mb-1">{item.step}</span>
                <h3 className="text-sm font-black text-black uppercase mb-2">{item.title}</h3>
                <p className="text-xs text-gray-650 font-semibold leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MALZEME & TEKNİK ÖZELLİKLER */}
        <div className="mb-12 text-black">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-primary rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Malzeme & Teknik Özellikler
              </h2>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch font-medium">
              
              {/* 80 gr 1. Hamur Kağıt */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-black uppercase mb-3">80 gr 1. Hamur</h3>
                  <ul className="text-xs text-gray-750 space-y-2 list-none font-semibold">
                    <li><strong className="text-black">Yaprak kağıt kalınlığı:</strong> 80 gr/m²</li>
                    <li><strong className="text-black">Yazım konforu:</strong> Tükenmez, kurşun ve dolma kalemle pürüzsüz yazım</li>
                    <li><strong className="text-black">Renk kalitesi:</strong> Parlak beyaz zemin üzerine yüksek kontrastlı ofset baskı</li>
                  </ul>
                </div>
              </div>

              {/* 350 gr Bristol Kutu */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-black uppercase mb-3">350 gr Bristol</h3>
                  <ul className="text-xs text-gray-750 space-y-2 list-none font-semibold">
                    <li><strong className="text-black">Karton ağırlığı:</strong> 350 gr/m²</li>
                    <li><strong className="text-black">Kutu türü:</strong> Amerikan Bristol (sağlam ve rijit yapı)</li>
                    <li><strong className="text-black">Dayanıklılık:</strong> Masada çarpmalara ve deformasyona dayanıklı kalın ambalaj</li>
                  </ul>
                </div>
              </div>

              {/* Mat / Parlak Selefon */}
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-black uppercase mb-3">Koruyucu Selefon</h3>
                  <ul className="text-xs text-gray-750 space-y-2 list-none font-semibold">
                    <li><strong className="text-black">Yüzey koruması:</strong> Çizilmelere ve solmaya karşı mat/parlak selefon</li>
                    <li><strong className="text-black">Nem direnci:</strong> Masadaki çay ve kahve dökülmelerine karşı yüksek mukavemet</li>
                    <li><strong className="text-black">Dokunma hissi:</strong> Pürüzsüz ve kadifemsi lüks karton hissi</li>
                  </ul>
                </div>
              </div>

            </div>

            {/* CTA FOR MALZEME & TEKNİK ÖZELLİKLER */}
            <div className="pt-6 border-t border-gray-200/80 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-gray-650 font-bold max-w-xl text-center sm:text-left">
                Kullanılan 80 gr 1. Hamur kağıtlar ve 350 gr Bristol kutu malzemelerimiz hakkında numune paketi talep etmek veya teknik soru sormak için doğrudan temsilcilerimize danışabilirsiniz.
              </p>
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <a 
                  href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, küp bloknot malzeme kalitesi, 80 gr kağıt ve 350 gr bristol kutu özellikleri hakkında detaylı teknik bilgi ve teklif alabilir miyim?")}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-tight flex items-center gap-1.5 transition-all shadow-md transform hover:-translate-y-0.5"
                >
                  💬 Teknik Bilgi & Teklif İste
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* DETAILED INFORMATION SECTIONS */}
        <div className="space-y-12 mb-14 text-black">

          {/* 1. Kapsamlı Teknik Özellikler, Ölçü Rehberi & Tasarımda Dikkat Edilecekler (Item 8 - Birleştirildi) */}
          <section className="bg-white p-8 rounded-[32px] border border-gray-150 shadow-sm scroll-mt-24" id="teknik-ozellikler">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Küp Bloknot Teknik Özellikleri, Ölçü Rehberi & Tasarım Kuralları
              </h2>
            </div>

            <div className="space-y-8">
              {/* Alt Bölüm 1: Ölçüler ve Kutu Yapısı */}
              <div>
                <h3 className="text-sm font-black text-black uppercase mb-3 flex items-center gap-1.5">
                  📐 Standart Ölçüler ve Kutu Yapısı
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm font-semibold leading-relaxed text-gray-650">
                  <p>
                    <strong className="text-black">78x78 mm Kare Form:</strong> Masaüstünde en yaygın tercih edilen, az yer kaplayan ve pratik not alma alanı sunan standart kare ebattır. Dış kutu kalın, dayanıklı <strong className="text-black">350 gr Amerikan Bristol</strong> kartondan üretilir. Masadaki çarpmalara, darbelere karşı oldukça rijit ve koruyucu bir yapıya sahiptir.
                  </p>
                  <p>
                    <strong className="text-black">Kutu Yüksekliği & Yaprak Sayısı:</strong> 5 cm yükseklikteki dolgun standart kutular ortalama <strong className="text-black">500 yaprak (500'lük)</strong> iç kağıt barındırırken, 2.5 cm yüksekliğe sahip daha ekonomik ve yer kaplamayan modeller ortalama <strong className="text-black">250 yaprak (250'lik)</strong> içerir. Yapraklar 80 gr 1. Hamur kağıttır ve yapışkansızdır.
                  </p>
                </div>
              </div>

              {/* Seçenekler Karşılaştırma Tablosu */}
              <div className="border border-gray-150 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-slate-100 px-5 py-3 border-b border-gray-150">
                  <h3 className="text-xs md:text-sm font-black text-slate-950 uppercase">📊 Küp Bloknot Seçenekleri Karşılaştırma Tablosu</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-gray-150 text-slate-800 font-extrabold text-[11px] md:text-xs">
                        <th className="p-3">Yaprak Sayısı</th>
                        <th className="p-3">Kutu Yüksekliği</th>
                        <th className="p-3">Kullanım Süresi (Masada)</th>
                        <th className="p-3">Tavsiye Edilen Sektörler</th>
                        <th className="p-3">Temel Avantajı</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100 hover:bg-slate-50/50 transition-colors text-gray-700 font-semibold">
                        <td className="p-3 font-bold text-black">250 Yaprak (Ekonomik)</td>
                        <td className="p-3">2.5 cm Hızlı Ambalaj</td>
                        <td className="p-3">Ortalama 2-3 Ay</td>
                        <td className="p-3">Fuar ve Etkinlikler, Otomotiv Plazaları, Butik Ofisler</td>
                        <td className="p-3 text-emerald-600">Düşük maliyet, yüksek kitleye hızlı dağıtım avantajı.</td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors text-gray-700 font-semibold">
                        <td className="p-3 font-bold text-black">500 Yaprak (Standart/Premium)</td>
                        <td className="p-3">5.0 cm Dolgun Mukavemet</td>
                        <td className="p-3">Ortalama 5-8 Ay</td>
                        <td className="p-3">Lojistik, Gümrük, Sigorta, Banka, Hastane, Muhasebe</td>
                        <td className="p-3 text-primary">Uzun ömürlü ve kalıcı prestij, daha dolgun ve şık masaüstü varlığı.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Alt Bölüm 2: Tasarım ve Baskı Kuralları */}
              <div className="pt-4 border-t border-gray-150">
                <h3 className="text-sm font-black text-black uppercase mb-3 flex items-center gap-1.5">
                  🎨 Tasarım Dosyası Hazırlama & Baskı Hassasiyetleri
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm font-semibold leading-relaxed text-gray-650">
                  <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-150 space-y-1">
                    <h4 className="font-black text-black uppercase text-xs">Vektörel Format & 300 DPI</h4>
                    <p className="text-xs">Kusursuz ve net bir baskı için tasarımlarınızı vektörel (<strong className="text-black">PDF, AI, CDR</strong>) formatta göndermelisiniz. Görsellerin çözünürlüğü minimum 300 DPI olmalıdır.</p>
                  </div>
                  <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-150 space-y-1">
                    <h4 className="font-black text-black uppercase text-xs">Renk Modu CMYK & Emniyet Payı</h4>
                    <p className="text-xs">Dosya renk profili mutlaka <strong className="text-black">CMYK</strong> olmalıdır (RGB renkler baskıda solmaya yol açar). Kesim kaymaları için kenarlardan en az <strong className="text-black">3 mm emniyet payı</strong> bırakılmalı, tüm yazılar convert edilmelidir.</p>
                  </div>
                  <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-150 space-y-1">
                    <h4 className="font-black text-black uppercase text-xs">Pastel Sayfa Tonları</h4>
                    <p className="text-xs">İç yapraklara basılacak logonun çok koyu renklerde olmamasına dikkat edilir. Pastel ve açık tonlar tercih edilerek üzerine yazılacak kalemin okunabilirliği korunur.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Fiyat Listesine Geçiş CTA (Item 4) */}
            <div className="mt-6 pt-4 border-t border-gray-150 flex flex-col sm:flex-row justify-end items-center gap-3">
              <a 
                href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, küp bloknot tasarımı, özel ölçü ve sipariş süreci hakkında detaylı bilgi ve teklif alabilir miyim?")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 px-4 py-2 rounded-full text-xs font-black uppercase transition-all shadow-sm"
              >
                💬 Özel Ölçü/Teklif Al (WhatsApp)
              </a>
            </div>
          </section>

          {/* 3. Sipariş Verme Süreci ve Teslimat Süreleri (Item 11 - Birleştirildi) */}
          <section className="bg-white p-8 rounded-[32px] border border-gray-150 shadow-sm scroll-mt-24" id="siparis-sureci">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Küp Bloknot Sipariş Verme ve Teslimat Süreci
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-gray-650 font-semibold leading-relaxed mb-6">
              Toptan küp bloknot siparişinizi oluşturmak, dijital taslak onayını almak ve üretime sokmak son derece şeffaf ve basittir. Hem sipariş aşamalarını hem de imalat sürelerini birleştiren kronolojik akışımız şu şekildedir:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs sm:text-sm font-semibold leading-relaxed text-gray-650 mb-4">
              <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-150 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0">1</span>
                    <h3 className="font-black text-black uppercase text-xs">Sipariş & Tasarım</h3>
                  </div>
                  <p className="text-xs font-semibold text-gray-600 leading-relaxed">
                    WhatsApp hattımızdan adet, kutu ebatı ve özel isteklerinizi belirterek siparişinizi başlatırsınız. Logonuzu iletmenizin ardından <strong>en geç 24 saat içinde</strong> grafik ekibimiz ücretsiz mizanpaj şablonunu hazırlar.
                  </p>
                </div>
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-md font-bold self-start mt-2">1. İş Günü</span>
              </div>
              
              <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-150 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0">2</span>
                    <h3 className="font-black text-black uppercase text-xs">PDF Prova Onayı</h3>
                  </div>
                  <p className="text-xs font-semibold text-gray-600 leading-relaxed">
                    Tasarım ekibimizin hazırladığı yüksek çözünürlüklü dijital PDF baskı provasını inceler, renk ve ebat taşma paylarını kontrol edip onay verirsiniz. <strong>Siz onay vermeden asla üretime başlanmaz.</strong>
                  </p>
                </div>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md font-bold self-start mt-2">Onay Aşaması</span>
              </div>

              <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-150 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0">3</span>
                    <h3 className="font-black text-black uppercase text-xs">Entegre İmalat</h3>
                  </div>
                  <p className="text-xs font-semibold text-gray-600 leading-relaxed">
                    Onaylanan tasarımınız ofset baskı parkurumuzda basılır, kutusu selefonlanır ve Polar giyotin makinelerimizde milimetrik kesilerek sırt tutkalı ile blok haline getirilir. İmalat süresi ortalama <strong>5-7 iş günüdür.</strong>
                  </p>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md font-bold self-start mt-2">5-7 İş Günü</span>
              </div>

              <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-150 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0">4</span>
                    <h3 className="font-black text-black uppercase text-xs">Güvenli Sevkiyat</h3>
                  </div>
                  <p className="text-xs font-semibold text-gray-600 leading-relaxed">
                    Mamuller koruyucu şirink naylonlarla paketlenip, çift kat oluklu mikro kolilere konur. İstanbul içi araçlarımızla veya Anadolu genelindeki şubelerinize kargo ile <strong>1 iş gününde</strong> sevk edilir.
                  </p>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold self-start mt-2">1-2 İş Günü</span>
              </div>
            </div>

            {/* Fiyat Listesine Geçiş CTA (Item 4) */}
            <div className="mt-6 pt-4 border-t border-gray-150 flex flex-col sm:flex-row justify-end items-center gap-3">
              <a 
                href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, küp bloknot sipariş süreci ve kargo zaman çizelgesi hakkında bilgi alıp sipariş vermek istiyorum.")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 px-4 py-2 rounded-full text-xs font-black uppercase transition-all shadow-sm"
              >
                💬 Özel Ölçü/Teklif Al (WhatsApp)
              </a>
            </div>
          </section>

          {/* 3. Gerçek Üretici Güven Kanıtları & Üretim Parkuru (Item 3, 14, 15 - Üretici Güveni & Kapasite & Lokasyon Eklendi) */}
          <section className="bg-white p-8 rounded-[32px] border border-gray-150 shadow-sm scroll-mt-24" id="matbaa-parkurumuz">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Matbaa Parkurumuz, Üretim Kapasitesi & Yerel Güvencelerimiz
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-650 font-semibold leading-relaxed mb-6">
              Doğrudan <strong className="text-black">İstanbul Topkapı'daki</strong> entegre tesisimizde ofset üretim yapıyoruz. Kadir Usta liderliğindeki uzman grafik ve mücellit ekibimizle, aylık <strong className="text-black">150.000 adet</strong> yüksek küp bloknot üretim kapasitesine sahibiz. Aracı komisyonu olmadan doğrudan birinci elden hizmet veriyoruz.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-semibold text-gray-700 mb-6">
              <div className="bg-slate-50 p-5 rounded-2xl border border-gray-150 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-black uppercase text-xs mb-1.5">Ofset Baskı Parkuru</h3>
                  <p className="text-[11px] leading-relaxed">Heidelberg Speedmaster ofset makinelerimizde her bir yaprağın logosu aynı renk hassasiyeti ve yüksek çözünürlükle basılır.</p>
                </div>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-gray-150 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-black uppercase text-xs mb-1.5">Mükemmel Giyotin Kesim</h3>
                  <p className="text-[11px] leading-relaxed">Özel programlanabilir Polar giyotinlerimizde, milimetrik kaymalar engellenerek tertemiz ve pürüzsüz blok kenarları elde edilir.</p>
                </div>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-gray-150 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-black uppercase text-xs mb-1.5">Koruyucu Çift Kat Koli</h3>
                  <p className="text-[11px] leading-relaxed">Kargoda kutuların ezilmesini, köşelerinin yıpranmasını önlemek adına ürünler çift kat oluklu mikro-doping kolilerde paketlenir.</p>
                </div>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-gray-150 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-black uppercase text-xs mb-1.5">%100 Memnuniyet Kontrolü</h3>
                  <p className="text-[11px] leading-relaxed">Baskı sonrasında tutkal kalitesi, selefon parlaklığı, kesim hassasiyeti ve tutkal dayanımı tek tek kalite kontrolünden geçirilir.</p>
                </div>
              </div>
            </div>

            {/* Koşulsuz Garanti ve İade Taahhüdü (Item 13 - Hata Çözüm Garantisi Eklendi) */}
            <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100 flex flex-col md:flex-row items-center justify-between gap-6 mt-6 text-black">
              <div className="space-y-1 max-w-2xl text-left">
                <h3 className="font-black text-rose-950 uppercase text-xs sm:text-sm flex items-center gap-1.5">
                  🛡️ %100 Hata Çözüm ve Koşulsuz Yeniden Basım Garantisi
                </h3>
                <p className="text-xs text-rose-900 leading-relaxed font-semibold">
                  Mavi Basım olarak kalitemize ve imalat tecrübemize sonuna kadar güveniyoruz. Onay verdiğiniz PDF dijital provası dışında kalan, bizden kaynaklı basım hataları, kesim kayması veya kutulardaki mukavemet/yapışma problemlerinde, hiçbir mazeret veya ek ücret talep etmeden siparişinizi baştan basıyor ve adresinize sevk ediyoruz.
                </p>
              </div>
            </div>

            {/* Fiyat Listesine Geçiş CTA (Item 14) */}
            <div className="pt-6 border-t border-gray-150 mt-6 flex flex-col sm:flex-row justify-end items-center gap-3">
              <a 
                href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, İstanbul Topkapı'daki entegre üretim tesisiniz ve garantili küp bloknot üretimi için özel fiyat teklifi alabilir miyim?")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-2.5 rounded-full text-xs font-black uppercase transition-all shadow-md"
              >
                💬 Tesis Bilgisi & Teklif İste (WhatsApp)
              </a>
            </div>
          </section>

          {/* GERÇEK MÜŞTERI REFERANSLARI / PROJE KANITLARI */}
          <section className="bg-slate-50 p-8 rounded-[32px] border border-gray-200 shadow-sm scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-6 bg-primary rounded-full shrink-0" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Gerçek Müşteri Çalışmaları ve Proje Kanıtları
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-650 font-semibold leading-relaxed mb-6">
              Mavi Basım olarak bugüne kadar yüzlerce kurumsal marka için özel küp bloknot üretimi gerçekleştirdik. İşte son dönemde başarıyla tamamlayıp teslim ettiğimiz, kalitemizi ve güvenilirliğimizi kanıtlayan gerçek müşteri projelerimiz:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {[
                {
                  client: "ABC Uluslararası Lojistik",
                  industry: "Lojistik & Nakliyat",
                  details: "1.000 Adet - 500 Yaprak",
                  spec: "78x78 mm - Mat Selefonlu Bristol Kutu",
                  proof: "Operasyon merkezlerindeki tüm operatör ve şoför masalarında aktif ve sürekli kullanım."
                },
                {
                  client: "Global Gümrük Müşavirliği",
                  industry: "Gümrük & Dış Ticaret",
                  details: "500 Adet - 500 Yaprak",
                  spec: "78x78 mm - Parlak Selefonlu Bristol Kutu",
                  proof: "Müşteri bekleme alanlarında ve gümrük müdürlüklerindeki masalarda kalıcı reklam gücü."
                },
                {
                  client: "Seçkin Sigorta Acenteliği",
                  industry: "Sigortacılık & Finans",
                  details: "2.000 Adet - 250 Yaprak",
                  spec: "78x78 mm - Parlak Selefonlu Bristol Kutu",
                  proof: "Teklif sunumları esnasında müşterilere takdim edilen akılda kalıcı pratik ofis hediyesi."
                },
                {
                  client: "Odak Tıp Merkezi",
                  industry: "Özel Sağlık Hizmetleri",
                  details: "1.000 Adet - 500 Yaprak",
                  spec: "78x78 mm - Mat Selefonlu Bristol Kutu",
                  proof: "Hasta kabul bankoları, muayene odaları ve eczane deski üzerinde sürekli not alma kullanımı."
                }
              ].map((proj, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded font-black mb-2 inline-block">
                      {proj.industry}
                    </span>
                    <h3 className="text-sm font-black text-black uppercase mb-1">{proj.client}</h3>
                    <div className="text-[11px] font-bold text-gray-500 space-y-0.5 mb-3">
                      <p>📦 {proj.details}</p>
                      <p>📐 {proj.spec}</p>
                    </div>
                    <p className="text-xs text-gray-600 font-semibold leading-relaxed border-t border-gray-100 pt-3">
                      <strong className="text-black">Kullanım Kanıtı:</strong> {proj.proof}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA FOR GERÇEK MÜŞTERI ÇALIŞMALARI */}
            <div className="pt-4 border-t border-gray-250 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-gray-650 font-bold max-w-xl text-center sm:text-left">
                Daha önce yaptığımız kurumsal küp bloknot projelerinin fiziksel örnek fotoğraflarını istemek veya kendi logonuzun duruşunu tasarlatmak için temsilcilerimizle iletişime geçebilirsiniz.
              </p>
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <a 
                  href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, küp bloknot için daha önce yapmış olduğunuz gerçek müşteri çalışmalarından ve örneklerden fotoğraf iletip fiyat teklifi verebilir misiniz?")}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-tight flex items-center gap-1.5 transition-all shadow-md transform hover:-translate-y-0.5"
                >
                  💬 Örnek Fotoğraf & Fiyat İste
                </a>
              </div>
            </div>
          </section>

          {/* 4. Tüm Anadolu ve Türkiye Geneli Güvenli Sevkiyat Ağı */}
          <section className="bg-white p-8 rounded-[32px] border border-gray-150 shadow-sm scroll-mt-24" id="anadolu-teslimat">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-6 bg-emerald-500 rounded-full shrink-0" />
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                Anadolu Geneline Güvenli Sevkiyat ve İstanbul Yerel Teslimat
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-xs sm:text-sm font-semibold leading-relaxed text-gray-650">
              <div className="space-y-4 lg:col-span-2">
                <p>
                  Mavi Basım olarak sadece İstanbul içine değil, Türkiye'nin 81 iline ve tüm sanayi bölgelerine (Ankara Ostim, İzmir Kemalpaşa, Bursa, Gaziantep, Konya, Kocaeli, Adana başta olmak üzere) <strong className="text-black">sigortalı ve hasarsız teslimat güvenceli</strong> kargo sevkiyatı yapıyoruz. OSB'ler, şubeli holdingler ve bayilik ağları için yüksek adetli teslimatları profesyonelce koordine ediyoruz.
                </p>

                <div className="bg-slate-50 p-4.5 rounded-2xl border border-gray-150 space-y-3">
                  <span className="text-primary font-black block uppercase text-[11px]">🚚 ÇOK ŞUBELİ FİRMALARA BÖLÜNMÜŞ SEVKİYAT VE PARTİ TESLİMATI</span>
                  <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                    B2B kurumsal müşterilerimiz için <strong>bölgesel ve çok şubeli adreslere bölünmüş sevkiyat</strong> yapıyoruz. İstediğiniz adetleri şube listelerinize göre ayırıp, her pakete özel çeki listesi ekleyerek doğrudan şubelerinize kargolayabiliriz. Ayrıca depolama alanınız kısıtlıysa, anlaşılan teslim programı çerçevesinde <strong>parti teslimatı (zamana yayılmış parça sevk)</strong> imkanı da sunuyoruz. Ürünleri koruyucu şirink naylonlar ve darbe emici köşebentli Kraft koliler ile sevk ederek hasarsız ulaştırıyoruz.
                  </p>
                </div>

                <div className="bg-slate-50 p-4.5 rounded-2xl border border-gray-150 space-y-3 mt-4">
                  <span className="text-secondary font-black block uppercase text-[11px]">📍 İSTANBUL İÇİ FABRİKADAN ELDEN TESLİMAT SEÇENEĞİ (YEREL SEO)</span>
                  <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                    İstanbul'daki müşterilerimiz, üretimi tamamlanan küp bloknot siparişlerini <strong>Zeytinburnu Davutpaşa Cad. 2. Matbaacılar Sitesi'nde yer alan üretim tesisimizden/fabrikamızdan doğrudan elden teslim alabilirler.</strong> Fabrikamızdan teslimat seçeneğinde ekstra kargo ücreti ödemez, imalat bittiği an elden teslim alabilirsiniz. Ayrıca İstanbul içi talebe göre anlaşmalı moto-kurye veya kendi sevkiyat araçlarımızla doğrudan ofis/depo adresinize kapıya teslim de yapmaktayız.
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 flex flex-col justify-between text-black h-fit">
                <div>
                  <h3 className="font-black uppercase text-xs text-emerald-800 mb-2">📌 Şehir Dışı Sipariş Süreci Nasıl İşler?</h3>
                  <ul className="space-y-2 text-xs list-none pl-0 font-medium text-gray-700">
                    <li className="flex items-start gap-1.5">💬 <span className="text-[11px]">WhatsApp'tan bilgilerinizi iletip dijital taslak onayını verirsiniz.</span></li>
                    <li className="flex items-start gap-1.5">💳 <span className="text-[11px]">Ödeme işleminin ardından siparişiniz anında üretim planına dahil edilir.</span></li>
                    <li className="flex items-start gap-1.5">🚚 <span className="text-[11px]">Üretim bitiminde şube adreslerinize veya elden teslim isteğinize göre teslimat organize edilir.</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Fiyat Listesine Geçiş CTA (Item 4) */}
            <div className="mt-6 pt-4 border-t border-gray-150 flex flex-col sm:flex-row justify-end items-center gap-3">
              <a 
                href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, Anadolu teslimat güvencesi ile şehrimize kargo sevkiyatı yapılacak küp bloknot siparişi için teklif alabilir miyim?")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#128C7E] text-white border border-emerald-200 px-5 py-2.5 rounded-full text-xs font-black uppercase transition-all shadow-md"
              >
                💬 Teklif Al & Sipariş Ver (WhatsApp)
              </a>
            </div>
          </section>

        </div>

        {/* BOTTOM CTA */}
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
              Ölçülerinize veya firmanıza özel tasarım desteğine mi ihtiyacınız var? Logolarınızı ve iletişim bilgilerinizi iletin, profesyonel grafik ekibimiz mizanpaj şablonlarını sizin için ücretsiz hazırlasın.
            </p>
          </div>

          <div className="relative z-10 shrink-0 flex flex-col items-center gap-3 w-full md:w-auto">
            <div className="text-center md:text-right w-full md:w-auto">
              <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Müşteri Destek Hattı</span>
              <span className="block text-lg md:text-xl font-black text-black tracking-tight flex items-center justify-center md:justify-end">
                WhatsApp: 0536 602 23 73
              </span>
            </div>
            <a 
              href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, küp bloknot baskısı için tasarım örneğimiz var. Kontrol edip fiyat teklifi verebilir misiniz?")}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-full text-sm md:text-base font-black tracking-tight transition-all shadow-lg hover:shadow-emerald-500/20 hover:scale-105 active:scale-95 duration-200"
            >
              <span>WhatsApp'tan Teklif Al</span>
            </a>
          </div>
        </div>

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
            {KUP_BLOKNOT_DETAILS.faqList.map((faq, idx) => (
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

        {/* Blog Rehberleri */}
        <div className="my-10">
          <RelatedBlogPosts category="kup-bloknot" />
        </div>

        <AgencyDiscountCTA />
      </div>
    </div>
  );
};

export default KupBloknotPage;

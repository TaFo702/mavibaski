import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronDown, 
  ShoppingCart, 
  CheckCircle2, 
  PackageCheck, 
  FileText, 
  Printer, 
  ShieldCheck, 
  Layers, 
  Clock, 
  Truck, 
  MapPin, 
  Phone, 
  FileCode, 
  Sparkles,
  HelpCircle,
  ImageIcon
} from 'lucide-react';
import { useCart, AgencyDiscountCTA, FireWarning } from '../App';
import RelatedBlogPosts from './RelatedBlogPosts';
import { KUP_BLOKNOT_DATA } from '../data/extraProductData';
import { 
  KUP_BLOKNOT_SEO_METADATA, 
  KUP_BLOKNOT_FAQS, 
  KUP_BLOKNOT_GALLERY, 
  KUP_BLOKNOT_SCHEMAS,
  KupBloknotGalleryItem 
} from '../data/kupBloknotPageContent';
import { KUP_BLOKNOT_IMAGE_MANIFEST } from '../generated/sectorImageManifest';

export { KUP_BLOKNOT_DATA };

export const KupBloknotPage: React.FC = () => {
  const { openProductDetail } = useCart();

  const handleOrderClick = (item: { code: string; desc: string; ebat: string; miktar: string; price: string }) => {
    openProductDetail(item, "Küp Bloknot");
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 text-slate-900 font-sans">
      <Helmet>
        <title>{KUP_BLOKNOT_SEO_METADATA.title}</title>
        <meta name="description" content={KUP_BLOKNOT_SEO_METADATA.desc} />
        <link rel="canonical" href={KUP_BLOKNOT_SEO_METADATA.canonical} />
        
        {/* Open Graph */}
        <meta property="og:title" content={KUP_BLOKNOT_SEO_METADATA.title} />
        <meta property="og:description" content={KUP_BLOKNOT_SEO_METADATA.desc} />
        <meta property="og:url" content={KUP_BLOKNOT_SEO_METADATA.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={KUP_BLOKNOT_SEO_METADATA.ogImage} />
        <meta property="og:image:secure_url" content={KUP_BLOKNOT_SEO_METADATA.ogImage} />
        <meta property="og:image:width" content="1536" />
        <meta property="og:image:height" content="1024" />
        <meta property="og:image:alt" content="Mavi Basım küp bloknot baskı fiyatları ve logolu promosyon küp notluk modelleri" />
        <meta property="og:site_name" content="Mavi Basım Matbaa & Reklam" />
        <meta property="og:locale" content="tr_TR" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={KUP_BLOKNOT_SEO_METADATA.title} />
        <meta name="twitter:description" content={KUP_BLOKNOT_SEO_METADATA.desc} />
        <meta name="twitter:image" content={KUP_BLOKNOT_SEO_METADATA.ogImage} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(KUP_BLOKNOT_SCHEMAS.breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(KUP_BLOKNOT_SCHEMAS.productSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(KUP_BLOKNOT_SCHEMAS.faqSchema)}
        </script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="text-xs font-semibold text-slate-500 uppercase tracking-tight flex items-center gap-1.5" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-blue-600 transition-colors">Ana Sayfa</Link>
          <ChevronDown size={12} className="-rotate-90 text-slate-400 shrink-0" />
          <Link to="/matbaa" className="hover:text-blue-600 transition-colors">Matbaa Ürünleri</Link>
          <ChevronDown size={12} className="-rotate-90 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-bold truncate">Küp Bloknot Baskı</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-12">
        
        {/* =========================================================================
            SECTION 1: KÜP BLOKNOT BASKI (Giriş ve Ana Açıklama + Sağ Taraf Görsel ve Özet Kartı)
        ========================================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Sol Sütun: Başlık, Açıklama ve Hızlı Aksiyonlar */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 mb-4">
                  <Sparkles size={13} className="text-blue-600" />
                  Kurumsal Masaüstü Promosyon Çözümü
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight mb-6">
                  {KUP_BLOKNOT_SEO_METADATA.h1}
                </h1>
              </div>

              <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
                <p>
                  <strong>Küp bloknot</strong>; ofis çalışanlarının, yöneticilerin ve müşterilerin çalışma masalarında gün boyu aktif olarak kullanılan, hem pratik not alma ihtiyacını karşılayan hem de güçlü bir kurumsal kimlik temsili sunan masaüstü matbaa ürünlerinden biridir. Özel kesimli dış karton kutusu ve kutu içerisinden tek tek kolayca çekilerek kullanılan yapışkansız iç kağıtlarıyla masalarda düzenli ve şık bir görünüm oluşturur.
                </p>
                <p>
                  Geleneksel tanıtım broşürleri veya tek seferlik el ilanları kısa sürede elden çıkabilirken, <strong>baskılı küp bloknot</strong> çeşitleri aylarca masanın üzerinde kalır. Telefon görüşmesi yaparken, müşteriyle toplantı halindeyken veya günlük planlama sırasında alınan her notta logonuz, web adresiniz ve telefon bilgileriniz göz önünde bulunur.
                </p>
                <p className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-slate-700 text-xs sm:text-sm">
                  <strong className="text-slate-900">Yerel Hizmet Noktası:</strong> İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktamızla Türkiye geneline matbaa çözümleri sunuyoruz. Kurumsal firmalar, ajanslar ve perakende işletmeler için avantajlı fiyat ve planlı sevkiyat olanakları sağlıyoruz.
                </p>
              </div>

              {/* Hızlı Aksiyon Butonları */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#fiyat-listesi"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00a2e8] hover:bg-[#008ecb] text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
                >
                  <FileText size={16} />
                  Fiyat Listesini İncele
                </a>
                <a
                  href="https://wa.me/905366022373?text=K%C3%BCp%20bloknot%20bask%C4%B1%20fiyat%20teklifi%20almak%20istiyorum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
                >
                  <Phone size={16} />
                  WhatsApp Teklifi Al
                </a>
              </div>
            </div>

            {/* Sağ Sütun: Ürün Önizleme Görseli ve Öne Çıkan Standartlar Kartı */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-5">
              {/* Ürün Görseli */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm">
                <img
                  src="/images/kup-bloknot/kutulu-kup-bloknot-baski.webp"
                  alt="Kutulu Küp Bloknot Baskı ve Tasarım Modelleri - Mavi Basım"
                  width="1536"
                  height="1024"
                  loading="eager"
                  className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 right-2.5 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Kutulu Model
                </span>
              </div>

              {/* Öne Çıkan Standartlar & Teknik Detaylar */}
              <div className="space-y-2.5">
                <div className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Sparkles size={14} className="text-[#00a2e8]" />
                  Öne Çıkan Üretim Standartları
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-600 text-[11px] block">Dış Kutu</span>
                    <strong className="text-slate-900 font-bold block mt-0.5">350 gr Bristol</strong>
                    <span className="text-[10px] text-slate-600">Selefon korumalı</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-600 text-[11px] block">İç Kağıt</span>
                    <strong className="text-slate-900 font-bold block mt-0.5">80 gr 1. Hamur</strong>
                    <span className="text-[10px] text-slate-600">Yapışkansız yaprak</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-600 text-[11px] block">Sayfa Sayısı</span>
                    <strong className="text-slate-900 font-bold block mt-0.5">250 veya 500</strong>
                    <span className="text-[10px] text-slate-600">Yaprak seçeneği</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-600 text-[11px] block">Min. Sipariş</span>
                    <strong className="text-slate-900 font-bold block mt-0.5">100 Adet</strong>
                    <span className="text-[10px] text-slate-600">Ekonomik paket</span>
                  </div>
                </div>
              </div>

              {/* Kurumsal Güvence Notu */}
              <div className="bg-white/80 rounded-xl p-3 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
                <ShieldCheck size={16} className="text-[#00a2e8] shrink-0 mt-0.5" />
                <span>
                  Baskı öncesi grafik ve PDF prova kontrolü ücretsizdir. Dijital onayınız alınmadan baskı aşamasına geçilmez.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: KÜP BLOKNOT FİYATLARI (Fiyat Tablosu & Minimum Sipariş Netliği)
        ========================================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-sm scroll-mt-24" id="fiyat-listesi">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1.5 h-6 bg-[#00a2e8] rounded-sm shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
              KÜP BLOKNOT FİYAT LİSTESİ
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 font-medium mb-6">
            Aşağıdaki fiyat listesinden dilediğiniz adet ve kutu ebatlarına göre küp bloknot siparişinizi oluşturabilirsiniz. Baskı öncesi grafik kontrolü ücretsiz olup onayınız sonrası üretime başlanır.
          </p>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs sm:text-sm min-w-[700px]">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="p-3 w-10 sm:w-12 bg-black"></th>
                    <th className="p-3.5 font-black uppercase tracking-wider text-center text-xs sm:text-sm whitespace-nowrap">KOD</th>
                    <th className="p-3.5 font-black uppercase tracking-wider text-center text-xs sm:text-sm whitespace-nowrap">ADET</th>
                    <th className="p-3.5 font-black uppercase tracking-wider text-center text-xs sm:text-sm whitespace-nowrap">EBAT</th>
                    <th className="p-3.5 font-black uppercase tracking-wider text-center text-xs sm:text-sm">ÖZELLİKLER</th>
                    <th className="p-3.5 font-black uppercase tracking-wider text-center text-xs sm:text-sm whitespace-nowrap">FİYAT</th>
                    <th className="p-3.5 font-black uppercase tracking-wider text-center text-xs sm:text-sm whitespace-nowrap">SİPARİŞ</th>
                  </tr>
                </thead>
                <tbody>
                  {KUP_BLOKNOT_DATA.map((group, gIdx) => (
                    <React.Fragment key={gIdx}>
                      {group.items.map((item, iIdx) => {
                        const isStriped = iIdx % 2 === 0;
                        const isGroupStart = iIdx === 0;
                        const hasGroupSeparator = gIdx > 0 && isGroupStart;

                        return (
                          <tr 
                            key={item.code} 
                            className={`${isStriped ? 'bg-[#edf7fd]' : 'bg-white'} ${hasGroupSeparator ? 'border-t-4 border-slate-300' : 'border-t border-slate-100'} hover:brightness-95 transition-all`}
                          >
                            {isGroupStart && (
                              <td
                                rowSpan={group.items.length}
                                className={`bg-[#00a2e8] text-white font-black text-center p-2 w-10 sm:w-12 border-r border-white/20 select-none ${hasGroupSeparator ? 'border-t-4 border-slate-300' : ''}`}
                                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                              >
                                <span className="text-xs sm:text-sm font-black tracking-widest uppercase">{group.cat}</span>
                              </td>
                            )}
                            <td className="p-3.5 text-center font-bold text-[#00a2e8] whitespace-nowrap">
                              {item.code}
                            </td>
                            <td className="p-3.5 text-center text-black font-medium whitespace-nowrap">
                              {item.miktar}
                            </td>
                            <td className="p-3.5 text-center text-black font-medium whitespace-nowrap">
                              {item.ebat}
                            </td>
                            <td className="p-3.5 text-center text-black font-medium">
                              {item.desc}
                            </td>
                            <td className="p-3.5 text-center font-black text-black whitespace-nowrap text-sm sm:text-base">
                              {item.price}
                            </td>
                            <td className="p-3.5 text-center whitespace-nowrap">
                              <button
                                onClick={() => handleOrderClick(item)}
                                className="inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-sky-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold tracking-tight transition-all shadow-xs hover:shadow-md active:scale-95"
                              >
                                <ShoppingCart size={14} className="shrink-0" />
                                <span>Hemen Sipariş Ver</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 font-medium">
              <span>* Fiyatlarımıza %20 KDV dahil değildir. İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktası üzerinden sevk edilir.</span>
              <span className="mt-1 sm:mt-0 font-semibold text-slate-700">Minimum sipariş adedi 100 adettir.</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-600">
            <div className="space-y-1 text-center sm:text-left">
              <p>✓ Tüm fiyatlarımıza dış kutunun 4 dış yüzeyinin 4 renk CMYK selefonlu baskısı ve iç kağıtların tek renk baskısı dahildir.</p>
              <p>✓ Standart fiyat listesinde 100, 250 ve 500 adet seçenekleri bulunur; 250 yapraklı modelde 1.000 adet fiyatı listelenmiştir. 500 yapraklı modelde 1.000 adet ve üzeri siparişler için özel teklif hazırlanır.</p>
            </div>
            <a
              href={`https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, küp bloknot fiyat tablosunu inceledim. Sipariş süreci ve tasarım kontrolü hakkında bilgi almak istiyorum.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full font-bold transition-all shrink-0"
            >
              <span>WhatsApp ile Hızlı Sipariş</span>
            </a>
          </div>

          <div className="mt-4">
            <FireWarning />
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: LOGOLU, BASKILI VE PROMOSYON KÜP BLOKNOT
        ========================================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-6 bg-blue-600 rounded-full shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
              Logolu, Baskılı ve Promosyon Küp Bloknotun Kurumsal Gücü
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-sm text-slate-700 leading-relaxed">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                <Printer size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Sürekli Masaüstü Görünürlüğü</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                <strong>Promosyon küp bloknot</strong>, kullanıcının doğrudan çalışma masasının en erişilebilir noktasında durur. Her not alındığında veya not bir iş arkadaşına iletildiğinde firmanızın logosu ve iletişim kanalları doğal biçimde görünürlük kazanır.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Prestijli Kurumsal İmaj</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                <strong>Baskılı küp bloknot</strong> kutuları, 350 gr Amerikan Bristol kartondan üretilip mat veya parlak selefon ile kaplanır. Bu sayede kutu formunu korumaya yardımcı olur ve kurumsal görünümünüzü masalarda yansıtır.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
                <Layers size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Etkili Promosyon Yatırımı</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Fuar organizasyonları, kurumsal müşteri ziyaretleri, bayi toplantıları ve yılbaşı promosyon paketleri için <strong>küp bloknot promosyon</strong> tercihleri, birim maliyete oranla en uzun vadeli marka hatırlanabilirliği sunan çözümler arasındadır.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: KÜP BLOKNOT ÖLÇÜLERİ VE YAPRAK SEÇENEKLERİ
        ========================================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-6 bg-blue-600 rounded-full shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
              Küp Bloknot Ölçüleri ve Yaprak Seçenekleri
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700">
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-800 px-2.5 py-1 rounded-md">
                  Kompakt Model
                </span>
                <span className="text-xs font-bold text-slate-500">Kutu Yüksekliği: ~2,5 cm</span>
              </div>
              <h3 className="text-lg font-black text-slate-900">250 Yapraklı Küp Bloknot</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                78 × 78 mm kare yaprak ölçüsüyle üretilen 250 yapraklı model, hafif ve pratik kutu yüksekliği sayesinde özellikle fuar çantalarında, müşteri ziyaretlerinde hediye olarak dağıtılmak üzere oldukça uygundur. Taşıması kolaydır ve bütçe dostu promosyon projelerinde tercih edilir.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">✓ 78 × 78 mm standart kare iç kağıt ebadı</li>
                <li className="flex items-center gap-2">✓ 350 gr Amerikan Bristol selefonlu dış kutu</li>
                <li className="flex items-center gap-2">✓ Etkinlik ve promosyon dağıtımları için ideal ağırlık</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md">
                  Klasik Model
                </span>
                <span className="text-xs font-bold text-slate-500">Kutu Yüksekliği: ~5,0 cm</span>
              </div>
              <h3 className="text-lg font-black text-slate-900">500 Yapraklı Küp Bloknot</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Gerçek küp formunu en iyi yansıtan 500 yapraklı model, yaklaşık 5 cm yüksekliğe sahip kutusu ile masalarda dolgun ve tok bir duruş sergiler. Yüksek yaprak kapasitesi sayesinde ofis çalışanları ve müşteriler için uzun aylara yayılan kesintisiz kullanım sağlar.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">✓ 78 × 78 mm standart kare iç kağıt ebadı</li>
                <li className="flex items-center gap-2">✓ 350 gr Amerikan Bristol selefonlu dış kutu</li>
                <li className="flex items-center gap-2">✓ Uzun ömürlü masaüstü not alma kapasitesi</li>
              </ul>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: KÜP NOT KAĞIDI BASKI ÖZELLİKLERİ (Teknik Özellikler)
        ========================================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-6 bg-blue-600 rounded-full shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
              Küp Not Kağıdı Baskı Özellikleri ve Malzeme Standartları
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-blue-700 uppercase">İç Kağıt Gramajı</span>
              <h3 className="text-base font-bold text-slate-900">80 gr 1. Hamur Kağıt</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tükenmez, kurşun ve dolma kalemle pürüzsüz yazı deneyimi sunar; arka yüze mürekkep geçirgenliği yapmaz.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-blue-700 uppercase">Dış Kutu Kartonu</span>
              <h3 className="text-base font-bold text-slate-900">350 gr Amerikan Bristol</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dayanıklılık sağlayan karton yapısı ile masaüstü kullanıma uygun tok bir duruş sunar.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-blue-700 uppercase">Yüzey Koruma</span>
              <h3 className="text-base font-bold text-slate-900">Mat veya Parlak Selefon</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dış kutu yüzeyini sürtünme ve kullanım izlerine karşı korumaya yardımcı olan koruyucu selefon kaplama uygulanabilir.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-blue-700 uppercase">Yaprak Yapısı</span>
              <h3 className="text-base font-bold text-slate-900">Serbest Yapraklar</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yapraklar yapışkansızdır; kutu üst açıklığından tek tek kolayca çekilerek pratik şekilde alınır.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            ÜRÜN ÖRNEKLERİ GALERİSİ (Gerçek WebP Görseller & Güvenli Placeholder)
        ========================================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-6 bg-blue-600 rounded-full shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
              Küp Bloknot Baskı Örnekleri ve Model Detayları
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 max-w-3xl">
            Mavi Basım olarak ürettiğimiz kurumsal küp bloknot modellerinden görsel kesitler. Dış kutu selefon kalitesi, iç yaprak ofset netliği ve katlama detayları.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {KUP_BLOKNOT_GALLERY.map((img: KupBloknotGalleryItem, idx: number) => {
              const isAvailable = Boolean(KUP_BLOKNOT_IMAGE_MANIFEST[img.src as keyof typeof KUP_BLOKNOT_IMAGE_MANIFEST]);

              return (
                <div key={idx} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-xs">
                  <div className="relative aspect-[4/3] bg-slate-100 flex items-center justify-center p-2">
                    {isAvailable ? (
                      <img
                        src={img.src}
                        alt={img.title}
                        width={1536}
                        height={1024}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain rounded-xl"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-400 p-6 text-center">
                        <ImageIcon size={36} className="mb-2 text-slate-300" />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Ürün Görseli Hazırlanıyor</span>
                        <span className="text-[11px] text-slate-400 mt-1">{img.tag}</span>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider backdrop-blur-xs">
                      {img.tag}
                    </span>
                  </div>
                  <div className="p-4 bg-white flex-1 flex flex-col justify-between border-t border-slate-100">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 mb-1">{img.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{img.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: TASARIM DOSYASI HAZIRLAMA REHBERİ
        ========================================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-6 bg-blue-600 rounded-full shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
              Küp Bloknot Tasarımı ve Dosya Hazırlama Rehberi
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-700">
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileCode size={18} className="text-blue-600" />
                Teknik Dosya Kriterleri
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 min-w-28">Dosya Formatı:</span>
                  <span>PDF, AI (Adobe Illustrator) veya CDR (CorelDRAW) vektörel formatlar tercih edilmelidir.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 min-w-28">Renk Modu:</span>
                  <span>Ofset baskı standartlarına uygun olarak CMYK modunda çalışılmalıdır. RGB gönderilen işlerde ton kaymaları yaşanabilir.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 min-w-28">Çözünürlük:</span>
                  <span>Görsel veya fotoğraflar en az 300 DPI çözünürlükte gömülmelidir.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 min-w-28">Taşma Payı:</span>
                  <span>Dış kutu bıçak izi kenarlarından en az 3 mm taşma payı ve iç yazılar için 4-5 mm emniyet mesafesi bırakılmalıdır.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText size={18} className="text-blue-600" />
                İç Yaprak Tasarım İpuçları
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                İç yapraklar kullanıcıların üzerine kalemle not aldığı alanlardır. Bu sebeple orta alanda yer alacak logo, zemin filigranı veya desenlerin <strong>%10 - %15 opaklıkta (pastel ve açık tonlarda)</strong> tasarlanması tavsiye edilir. Böylece tükenmez ve kurşun kalemle alınan notlar net şekilde okunabilir.
              </p>
              <div className="pt-2 border-t border-slate-200 text-xs text-slate-500">
                💡 Hazır tasarım şablonuna ihtiyacınız varsa müşteri temsilcimizden ebadınıza uygun PDF veya AI bıçak şablonunu talep edebilirsiniz.
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: SİPARİŞ VE PROVA SÜRECİ
        ========================================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-6 bg-blue-600 rounded-full shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
              Sipariş Aşamaları, Ücretsiz Kontrol & Dijital Prova
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs">1</span>
              <h3 className="font-bold text-slate-900">Talep & Teklif</h3>
              <p className="text-xs text-slate-600">
                Seçtiğiniz yaprak adedi (250 / 500) ve sipariş miktarınızı ileterek net fiyat onayını alırsınız.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs">2</span>
              <h3 className="font-bold text-slate-900">Ücretsiz Dosya Kontrolü</h3>
              <p className="text-xs text-slate-600">
                Baskıya uygun dosyanızın teknik kontrolü ve dijital PDF prova süreci tamamen ücretsizdir.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs">3</span>
              <h3 className="font-bold text-slate-900">Onaylı Üretim</h3>
              <p className="text-xs text-slate-600">
                Dijital PDF provasına onayınız alınmadan kesinlikle baskı sürecine geçilmez. Hatalar önceden önlenir.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-xs">4</span>
              <h3 className="font-bold text-slate-900">Güvenli Sevkiyat</h3>
              <p className="text-xs text-slate-600">
                İstanbul Topkapı noktamızdan elden teslim veya çift kat koruyucu kolilerle Türkiye geneline kargo.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-900 font-medium">
            <strong>Tasarım Desteği Notu:</strong> Baskıya uygun hazır dosyalarınızın teknik kontrolü ve dijital PDF prova sunumu ücretsizdir. Yeni bir tasarım hazırlanması veya kapsamlı revizyonlar standart sipariş kapsamı dışındadır; hazır dosyanız yoksa grafik ekibimiz WhatsApp üzerinden kapsam ve fiyat konusunda yardımcı olur.
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: SIKÇA SORULAN SORULAR (SSS - FAQ)
        ========================================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-sm scroll-mt-24" id="sss">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-6 bg-blue-600 rounded-full shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
              Sıkça Sorulan Sorular
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {KUP_BLOKNOT_FAQS.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 flex items-start gap-2">
                    <HelpCircle size={17} className="text-blue-600 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            İLGİLİ KURUMSAL ÜRÜNLER (Internal Link Mesh)
        ========================================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h3 className="text-base font-bold text-slate-950 uppercase tracking-tight mb-4">
            İlgili Kurumsal Matbaa ve Tanıtım Ürünleri
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mb-4">
            Küp bloknot siparişinizle birlikte ofis ve tanıtım ihtiyaçlarınız için diğer kurumsal baskı çözümlerimizi de avantajlı fiyatlarla değerlendirebilirsiniz:
          </p>
          <div className="flex flex-wrap gap-2.5 text-xs font-semibold">
            <Link to="/matbaa" className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors">
              Tüm Matbaa Ürünleri
            </Link>
            <Link to="/bloknotlar" className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors">
              Spiralli & Tutkallı Bloknotlar
            </Link>
            <Link to="/antetli" className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors">
              Antetli Kağıt Baskı
            </Link>
            <Link to="/dosyalar" className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors">
              Cepli Sunum Dosyası
            </Link>
            <Link to="/kartvizit" className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors">
              Kartvizit Baskı Çeşitleri
            </Link>
            <Link to="/zarf" className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors">
              Kurumsal Diplomat Zarf
            </Link>
            <Link to="/karton-canta" className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors">
              İpli Karton Çanta
            </Link>
          </div>
        </section>

        {/* Blog Rehberleri */}
        <div className="my-8">
          <RelatedBlogPosts category="kup-bloknot" />
        </div>

        {/* Ajans & Toptan İndirim CTA */}
        <AgencyDiscountCTA />

      </div>
    </div>
  );
};

export default KupBloknotPage;

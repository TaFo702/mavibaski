import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  UserCheck,
  BookOpen,
  Bookmark,
  CheckCircle2,
  FileCheck,
  Layers,
  Scissors
} from 'lucide-react';
import { 
  useCart, 
  FireWarning 
} from '../App';
import { CategoryHero } from './CategoryHero';
import { BLOG_POSTS } from '../data/blogData';
import { KITAP_AYRACI_DATA } from '../data/extraProductData';

// Özel teklif WhatsApp mesajı ve linki
const SPECIAL_QUOTE_MESSAGE = "Merhaba, web sitenizdeki /kitap-ayraci sayfasından ulaşıyorum. Fiyat listesinde bulunmayan kitap ayracı adedi, özel ebat, püsküllü model, farklı kağıt türü, sıvama veya kabartma lak uygulaması için özel teklif almak istiyorum.";
const SPECIAL_QUOTE_WHATSAPP_LINK = `https://wa.me/905366022373?text=${encodeURIComponent(SPECIAL_QUOTE_MESSAGE)}`;

// Kitap Ayracı Sıkça Sorulan Sorular Listesi
export const KITAP_AYRACI_FAQS = [
  {
    q: "Kitap ayracı standart ölçüsü nedir?",
    a: "Standart kitap ayracı ölçüsü 5,2x16 cm'dir. Bu ölçü, standart roman ve ders kitaplarının boyutlarıyla tam uyumludur. İsteğe bağlı olarak 5x20 cm, 6x18 cm veya özel geometrik bıçak kesimli ebatlarda da üretim yapılabilmektedir."
  },
  {
    q: "Kitap ayracı baskısında hangi kağıt türleri kullanılır?",
    a: "Standart üretimde 350 gr kuşe karton tercih edilir. Daha tok ve prestijli bir ayrac isteyen müşterilerimiz için iki kat kartonun preslenmesiyle üretilen 700 gr kalın sıvama karton seçeneği sunulmaktadır."
  },
  {
    q: "Mat selefon ile parlak selefon arasındaki fark nedir?",
    a: "Mat selefon, parlamayan ve kurumsal bir doku sunarak üzerine kabartma lak uygulamasını mümkün kılar. Parlak selefon ise renklerin daha canlı ve parlak görünmesini sağlayarak dış etkenlere karşı dayanıklılık kazandırır."
  },
  {
    q: "Kitap ayracına kabartma lak uygulanabilir mi?",
    a: "Evet. Mat selefonlu modellerimizde (örneğin 700 gr sıvama ayracımızda) logo, yazar adı veya özel grafik detaylarına bölgesel kabartma lak uygulanarak dokunulduğunda 3D hissedilen lüks bir görünüm elde edilir."
  },
  {
    q: "Püskül veya ip deliği seçeneği var mı?",
    a: "Evet. Ayraçların üst orta kısmına standart delik delinebilir ve talep edilirse şık renkli püskül veya iplik aksesuarı eklenebilir. Standart fiyat listesi deliksiz/püskülsüz modelleri kapsar; püsküllü projeler için özel teklif alabilirsiniz."
  },
  {
    q: "Kitap ayracı siparişlerinde minimum adet ne kadardır?",
    a: "Ofset baskı standart paketlerimiz 1.000 adetlik tirajlardan başlamaktadır. 1.000 adet üzeri yüksek tirajlar veya özel ara adetler için doğrudan fiyat teklifi alabilirsiniz."
  },
  {
    q: "Kitap ayracı tasarımı nasıl hazırlanmalıdır?",
    a: "Tasarım dosyaları CMYK renk formatında ve en az 300 DPI çözünürlükte hazırlanmalıdır. Kesim toleransı için her kenardan 3 mm taşma payı bırakılmalı, metin ve logolar kesim çizgisine en az 4 mm mesafede tutulmalıdır. Tüm fontlar eğriye (convert/outline) çevrilmelidir."
  },
  {
    q: "Sipariş süreci ve kargo teslimatı ne kadar sürer?",
    a: "Grafik tasarımınızın teknik kontrolü ve PDF prova onayınızın ardından üretime geçilir. Üretimi tamamlanan ayraçlar özenle paketlenerek İstanbul Topkapı merkezimizden Türkiye genelindeki 81 ile anlaşmalı kargo ile sevk edilir."
  }
];

// 5 Görsel Galeri Alanı
export const KITAP_AYRACI_GALLERY = [
  {
    src: "/images/kitap-ayraci/kitap-ayraci-baski.webp",
    alt: "Kitap ayracı baskısı, 350 gr kuşe parlak selefonlu",
    title: "Kitap Ayracı Baskısı",
    subtitle: "350 gr Kuşe & Parlak Selefon",
    desc: "350 gr kuşe kağıt üzerine yüksek çözünürlüklü ofset baskı ve koruyucu parlak selefon kaplama."
  },
  {
    src: "/images/kitap-ayraci/kitap-ayraci-ornegi.webp",
    alt: "Püsküllü ve özel tasarımlı kitap ayracı örneği",
    title: "Püsküllü Kitap Ayracı",
    subtitle: "Delik & Şık Püskül Aksesuarı",
    desc: "Üst kısmında delik ve şık püskül detayı bulunan özel promosyon kitap ayracı modelleri."
  },
  {
    src: "/images/kitap-ayraci/kitap-ayraci-tasarimi.webp",
    alt: "Kurumsal ve yayınevi kitap ayracı tasarımı",
    title: "Özel Tasarım Kitap Ayracı",
    subtitle: "Çift Yön Renkli Kurumsal Baskı",
    desc: "Yayınevleri, yazarlar ve markalar için çift yön renkli kurumsal tasarım uygulaması."
  },
  {
    src: "/images/kitap-ayraci/ozel-kesim-kitap-ayraci.webp",
    alt: "Özel bıçak kesimli formlu kitap ayracı",
    title: "Özel Kesim Kitap Ayracı",
    subtitle: "Formlu & Bıçak Kesimli Tasarım",
    desc: "Farklı geometrik formlarda ve özel bıçak kesimli dikkat çekici ayrac modelleri."
  },
  {
    src: "/images/kitap-ayraci/promosyon-kitap-ayraci.webp",
    alt: "Promosyon kitap ayracı imalatı ve toptan fiyatlar",
    title: "Promosyon Kitap Ayracı",
    subtitle: "Fuar & Etkinlik Promosyonu",
    desc: "Fuarlar, etkinlikler ve kurumsal tanıtımlar için ekonomik ve etkili promosyon ürünü."
  }
];

export const KitapAyraciPage = () => {
  const { openProductDetail } = useCart();

  const handleOrder = (item: any) => {
    openProductDetail(item, "Kitap Ayracı");
  };

  const bookmarkGroup = KITAP_AYRACI_DATA[0] || {
    cat: "Kitap Ayracı",
    color: "bg-orange-600",
    subTitle: "350 gr. Kuşe - Çift Yön Renkli - Parlak Selefonlu - 1.000 Adet",
    items: []
  };

  return (
    <div data-page-root="kitap-ayraci" className="bg-white min-h-screen pb-16">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-100 py-3">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-xs text-gray-500 font-medium" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400" aria-hidden="true">&gt;</span>
                  <Link to="/matbaa" className="text-gray-600 hover:text-primary transition-colors">
                    Matbaa Ürünleri
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400" aria-hidden="true">&gt;</span>
                  <span className="text-gray-900 font-semibold" aria-current="page">Kitap Ayracı</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <CategoryHero
          title="Kitap Ayracı Baskı Fiyatları ve Özel Tasarım Modelleri"
          badge="350 gr Kuşe · 700 gr Sıvama · Mat / Parlak Selefon · Kabartma Lak"
          description={
            <p>
              Yayınevleri, bağımsız yazarlar, okullar ve kurumsal markalar için profesyonel <strong>kitap ayracı baskı</strong> hizmeti sunuyoruz. 5,2x16 cm standart ebatta, 350 gr kuşe karton veya ekstra tok gövde sağlayan 700 gr kalın sıvama seçenekleriyle; mat veya parlak selefon laminasyonu ve logo üzeri kabartma lak alternatifleriyle <strong>kitap ayracı yaptırma</strong> ve <strong>promosyon kitap ayracı</strong> siparişlerinizi kolaylaştırıyoruz. Siparişleriniz <strong>İstanbul Topkapı 2. Matbaacılar Sitesi koordinasyon noktamız</strong> üzerinden üretilerek Türkiye genelinde kapınıza teslim edilir.
            </p>
          }
          relatedLinks={[
            { label: "Broşür Baskı", path: "/brosur" },
            { label: "Kartvizit", path: "/kartvizit" },
            { label: "Cepli Dosya", path: "/dosyalar" },
            { label: "Küp Bloknot", path: "/kup-bloknot" }
          ]}
          customCtaText="Özel Teklif Al"
          customCtaLink={SPECIAL_QUOTE_WHATSAPP_LINK}
        />

        {/* Fiyat Tablosu Alanı */}
        <section id="fiyat-tablosu" className="mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 px-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-black">
                Kitap Ayracı Baskı Fiyatları (1.000 Adet Fiyat Listesi)
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
                350 gr kuşe ve 700 gr kalın sıvama seçenekleri, mat/parlak selefon ve kabartma lak modelleri.
              </p>
            </div>
            <div className="mt-2 md:mt-0 text-xs font-semibold text-gray-500">
              * Fiyatlarımıza %20 KDV dahil değildir.
            </div>
          </div>

          <p className="text-gray-600 text-xs sm:text-sm font-semibold mb-6 px-2 leading-relaxed">
            Aşağıdaki tabloda güncel <strong>kitap ayracı fiyatları</strong>, <strong>350 gr kuşe kitap ayracı</strong> ve <strong>700 gr sıvama kitap ayracı</strong> seçenekleri yer almaktadır. Siparişler standart olarak 1.000 adet üzerinden ofset baskı tekniğiyle üretilmektedir. Özel ölçü, püskül veya delik talepleriniz için bize ulaşabilirsiniz.
          </p>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px] text-xs sm:text-sm">
                <caption className="text-left font-bold text-gray-900 pb-2 px-2 text-sm sm:text-base sr-only">
                  Kitap Ayracı Baskı Fiyat Tablosu (350 gr Kuşe ve 700 gr Sıvama Seçenekleri)
                </caption>
                <thead>
                  <tr className="bg-gray-900 text-white text-xs uppercase tracking-wider font-bold">
                    <th scope="col" className="py-4 px-1 text-center w-7 sm:w-8" title="Grup"></th>
                    <th scope="col" className="py-4 px-3 sm:px-4 text-center w-24">Kod</th>
                    <th scope="col" className="py-4 px-3 sm:px-4 text-center w-28 whitespace-nowrap">Ebat</th>
                    <th scope="col" className="py-4 px-4 sm:px-6">Ürün Açıklaması &amp; Özellikler</th>
                    <th scope="col" className="py-4 px-3 sm:px-4 text-center w-28 whitespace-nowrap">Adet</th>
                    <th scope="col" className="py-4 px-4 sm:px-6 text-right w-32 whitespace-nowrap">FİYAT</th>
                    <th scope="col" className="py-4 px-3 sm:px-4 text-center w-40 whitespace-nowrap">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookmarkGroup.items.map((item: any, idx: number) => (
                    <tr 
                      key={item.code} 
                      className="hover:bg-orange-50/40 transition-colors group"
                    >
                      {idx === 0 && (
                        <td 
                          rowSpan={bookmarkGroup.items.length}
                          className={`${bookmarkGroup.color} text-white font-black text-center p-1 w-7 sm:w-8 border-r border-white/20 select-none`}
                          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                        >
                          <span className="tracking-[0.12em] uppercase text-[10px] font-bold inline-block py-1">
                            {bookmarkGroup.cat}
                          </span>
                        </td>
                      )}
                      <th scope="row" className="py-4 px-3 sm:px-4 text-center font-mono font-bold text-primary border-r border-gray-100">
                        {item.code}
                      </th>
                      <td className="py-4 px-3 sm:px-4 text-center font-semibold text-gray-700 border-r border-gray-100 whitespace-nowrap">
                        {item.ebat}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-gray-800 font-medium">
                        <div className="flex items-center gap-2">
                          {item.code === 'KODSEK' && (
                            <span className="bg-purple-100 text-purple-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase shrink-0">
                              Lüks Sıvama
                            </span>
                          )}
                          <span>{item.desc}</span>
                        </div>
                      </td>
                      <td className="py-4 px-3 sm:px-4 text-center font-bold text-gray-900 border-r border-gray-100 whitespace-nowrap">
                        {item.miktar || "1.000 ADET"}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-right font-black text-gray-900 text-base sm:text-lg bg-gray-50/50 group-hover:bg-orange-50/20 whitespace-nowrap">
                        {item.price}
                      </td>
                      <td className="py-4 px-3 sm:px-4 text-center">
                        <button 
                          onClick={() => handleOrder(item)}
                          className="inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-secondary text-white px-3.5 py-2 rounded-xl text-xs font-black tracking-tight transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
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
            <div className="bg-slate-50 px-5 py-3 border-t border-gray-150 flex flex-col sm:flex-row justify-center items-center text-xs text-slate-500 font-medium font-sans">
              <span>* Tabloda belirtilen fiyatlarımıza %20 KDV dahil değildir.</span>
            </div>
          </div>

          <div className="mt-4">
            <FireWarning />
          </div>
        </section>

        {/* Özel Teklif Banner Alanı */}
        <section className="my-12 bg-gradient-to-r from-orange-950 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-orange-800/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full">
                <Sparkles size={14} />
                Püsküllü, Delikli &amp; Özel Kesimli
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Fiyat Listesinde Bulunmayan Bir Kitap Ayracı Mı Arıyorsunuz?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
                Farklı adetler, fantezi dokulu özel kağıtlar, çift taraflı altın yaldız, üst delik ve püskül takımı veya özel geometrik kalıp kesimli ayraç talepleriniz için özel teklif alabilirsiniz.
              </p>
            </div>
            <div className="shrink-0">
              <a
                href={SPECIAL_QUOTE_WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary hover:bg-secondary text-white font-black text-sm uppercase px-6 py-3.5 rounded-2xl transition-all shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95"
              >
                <span>Özel Teklif Al</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* 5 Görsel Galeri Alanı */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <span className="w-2.5 h-6 bg-primary rounded-full" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Kitap Ayracı Modelleri ve Görsel Örnekler
              </h2>
              <p className="text-slate-500 font-medium text-xs sm:text-sm mt-0.5">
                Yayınevleri, yazarlar ve kurumsal tanıtımlar için hazırlanan kaliteli <strong>kitap ayracı baskı</strong> modelleri:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {KITAP_AYRACI_GALLERY.map((img, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                <div className="aspect-[3/4] bg-gray-100 overflow-hidden relative">
                  <img 
                    src={img.src} 
                    alt={img.alt}
                    title={img.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-[11px] font-bold text-white leading-tight">
                      {img.title}
                    </span>
                  </div>
                </div>
                <div className="p-3.5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1 leading-snug">
                      {img.title}
                    </h3>
                    <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2">
                      {img.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kitap Ayracı Türleri & Kağıt Seçim Rehberi */}
        <section className="mb-14 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <span className="w-2.5 h-6 bg-primary rounded-full" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Kitap Ayracı Türleri ve Malzeme Seçim Rehberi
              </h2>
              <p className="text-slate-500 font-medium text-xs sm:text-sm mt-0.5">
                Kullanım amacınıza, bütçenize ve hedef kitlenize göre en doğru kitap ayracı modelini belirleyin:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="text-xs font-black text-primary uppercase tracking-wider mb-1">Standart &amp; Ekonomik</div>
                <h3 className="text-lg font-black text-slate-900 mb-2">350 gr Kuşe (Mat / Parlak)</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed mb-4">
                  En çok tercih edilen standart kitap ayracı modelidir. Çift yön renkli ofset baskı üzerine uygulanan mat veya parlak selefon kaplama, renkleri canlandırır ve yıpranmaya karşı dayanıklılık sağlar.
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-700">
                💡 İdeal Kullanım: Fuarlar, lansman dağıtımları, yayınevi promosyonları.
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="text-xs font-black text-purple-600 uppercase tracking-wider mb-1">Maksimum Tokluk</div>
                <h3 className="text-lg font-black text-slate-900 mb-2">700 gr Kalın Sıvama</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed mb-4">
                  İki katman kartonun özel yapıştırıcı ile sıvama yapılarak birleştirilmesiyle üretilir. Yüksek rijitliğe sahiptir, bükülmez ve kitap arasında tok duruşuyla üst düzey kalite hissi yaşatır.
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-700">
                💡 İdeal Kullanım: Prestijli edebiyat yayınları, hediye ayraçlar, özel baskılar.
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="text-xs font-black text-orange-600 uppercase tracking-wider mb-1">Dokusal Etki &amp; Şıklık</div>
                <h3 className="text-lg font-black text-slate-900 mb-2">Kabartma Lak &amp; Püsküllü Modeller</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed mb-4">
                  Mat selefon kaplama üzerine yazar adı veya logo alanlarına uygulanan 3D kabartma lak, parmakla dokunulduğunda hissedilir. Delik açılarak eklenen püskül veya iplik aksesuarlarıyla şıklığı tamamlanır.
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-700">
                💡 İdeal Kullanım: Özel yazar imza günleri, koleksiyonluk ayraçlar.
              </div>
            </div>
          </div>
        </section>

        {/* Kitap Ayracı Kullanım Alanları */}
        <section className="mb-14 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
            <span className="w-2.5 h-6 bg-primary rounded-full" />
            <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
              Kitap Ayracı Kullanım Alanları ve Avantajları
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-150">
              <div className="font-black text-slate-900 mb-1 flex items-center gap-1.5">
                <BookOpen size={16} className="text-primary" />
                Yayınevleri &amp; Yazarlar
              </div>
              <p className="text-gray-600 leading-relaxed text-xs">
                Yeni çıkan kitap lansmanları, yazar imza günleri ve okur hediyeleri için markanızı daima göz önünde tutar.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-150">
              <div className="font-black text-slate-900 mb-1 flex items-center gap-1.5">
                <Bookmark size={16} className="text-primary" />
                Kurumsal Promosyon
              </div>
              <p className="text-gray-600 leading-relaxed text-xs">
                Fuar, seminer ve kurumsal etkinliklerde firmanızın logo ve mesajını taşıyan ekonomik ve kalıcı bir tanıtım aracıdır.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-150">
              <div className="font-black text-slate-900 mb-1 flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-primary" />
                Okullar &amp; Kütüphaneler
              </div>
              <p className="text-gray-600 leading-relaxed text-xs">
                Öğrenciler, kütüphane üyeleri ve eğitim kurumları için okuma alışkanlığını teşvik eden eğitici ayraçlar.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-150">
              <div className="font-black text-slate-900 mb-1 flex items-center gap-1.5">
                <Sparkles size={16} className="text-primary" />
                E-Ticaret Sipariş Hediyesi
              </div>
              <p className="text-gray-600 leading-relaxed text-xs">
                Sipariş paketlerinin içerisine eklenen şık bir teşekkür notu veya indirim kuponu taşıyan pratik bir sürpriz.
              </p>
            </div>
          </div>
        </section>

        {/* Sipariş ve Baskı Aşamaları */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight mb-4 flex items-center gap-2">
                <span className="w-2 h-5 bg-primary rounded-full"></span>
                4 Adımda Hızlı Kitap Ayracı Siparişi
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { step: "1", title: "Model & Kağıt", desc: "350 gr kuşe veya 700 gr kalın sıvama, mat/parlak selefon seçin." },
                  { step: "2", title: "Tasarım Gönderimi", desc: "5,2x16 cm ebadında hazırlanan PDF veya AI dosyanızı iletin." },
                  { step: "3", title: "Dijital Prova", desc: "Grafik ekibimizin hazırladığı dijital PDF provayı kontrol edip onaylayın." },
                  { step: "4", title: "Üretim & Teslimat", desc: "Topkapı tesisimizde basılarak anlaşmalı kargoya verilir." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                    <div className="text-primary font-black text-sm mb-1">Adım {item.step}</div>
                    <div className="font-bold text-slate-900 mb-0.5">{item.title}</div>
                    <div className="text-slate-500 font-medium text-[11px]">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-orange-50/80 p-6 sm:p-8 rounded-3xl border border-orange-200/80 flex flex-col justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-orange-950 uppercase tracking-tight mb-4 flex items-center gap-2">
                <ShieldCheck className="text-orange-600" size={22} />
                Baskı Öncesi Dosya Hazırlık Kontrolü
              </h3>
              <p className="text-xs text-orange-950 font-medium mb-3">
                Kusursuz ve net bir kitap ayracı baskısı elde etmek için tasarım dosyanızda dikkat edilmesi gerekenler:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-orange-900">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 shrink-0" />
                  <span><strong>CMYK Renk Modu:</strong> Tasarım RGB yerine CMYK ofset renk modunda kaydedilmelidir.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 shrink-0" />
                  <span><strong>3 mm Taşma Payı:</strong> Kesim toleransı için her kenardan en az 3 mm taşma payı bırakılmalıdır.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 shrink-0" />
                  <span><strong>Yazıları Eğriye Çevirme:</strong> Tüm yazı tipleri (fontlar) convert / outline edilmelidir.</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 p-3 bg-white/80 rounded-xl border border-orange-200 text-xs font-bold text-orange-900">
              💡 Baskıya hazır dosyalarınız grafik ekibimizce kontrol edilerek dijital PDF onayınıza sunulur.
            </div>
          </section>
        </div>

        {/* Sıkça Sorulan Sorular (FAQ) */}
        <section id="sss" className="mb-14">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <span className="w-2.5 h-6 bg-primary rounded-full" />
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Kitap Ayracı Baskı Hakkında Sıkça Sorulan Sorular
              </h2>
              <p className="text-slate-500 font-medium text-xs sm:text-sm mt-0.5">
                Kitap ayracı ölçüleri, kağıt gramajları, adetler ve teslimat hakkında merak edilenler:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            {KITAP_AYRACI_FAQS.map((faq, idx) => (
              <div 
                key={idx}
                className="h-full bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-extrabold text-xs sm:text-sm text-gray-900 mb-2 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <div className="h-px bg-gray-100 my-2.5 w-full" />
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* İlgili Blog Yazıları */}
        <section className="my-10 bg-gradient-to-br from-slate-50 via-white to-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/60">
            <div>
              <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest mb-1">
                <Sparkles size={16} />
                <span>Matbaa Akademisi &amp; Rehberler</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                İlgili Matbaa &amp; Tasarım Rehberleri
              </h2>
            </div>
            <Link
              to="/blog"
              title="Tüm Matbaa ve Tasarım Blog Yazılarını İnceleyin"
              className="inline-flex items-center gap-1.5 text-xs font-black text-primary hover:text-slate-900 transition-colors uppercase tracking-wider shrink-0"
            >
              <span>Tüm Rehberleri Gör</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {BLOG_POSTS.filter(p => p.slug === "baskiya-uygun-tasarim-nasil-hazirlanir" || p.slug === "baskili-urunlerle-pazarlama-markanizi-buyuten-matbaa-urunleri").map((post, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-100 mb-3 border border-slate-100">
                    <img
                      src={post.image}
                      alt={`${post.title} - Mavi Basım Matbaa Rehberi`}
                      title={`${post.title} İpuçları ve Detaylı Rehber`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-400 text-[11px] font-bold mb-2">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="text-sm font-black text-slate-800 group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-2">
                    <Link
                      to={`/blog/${post.slug}`}
                      title={post.title}
                      className="focus:outline-none"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                    <UserCheck size={13} className="text-primary" />
                    <span>Mavi Basım Editörü</span>
                  </span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                  >
                    <span>Oku</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

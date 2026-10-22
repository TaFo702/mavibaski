import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  ShoppingCart, 
  Ruler, 
  CheckCircle2,
  Image as ImageIcon,
  AlertTriangle,
  Layers,
  Sparkles,
  ShieldCheck,
  Truck,
  FileCheck,
  Store,
  UtensilsCrossed,
  Wrench,
  Flame,
  Droplets,
  Key,
  Building2,
  Car,
  Pill,
  Briefcase,
  HelpCircle,
  Clock,
  MessageCircle
} from 'lucide-react';
import { useCart, FireWarning } from '../App';
import { MAGNET_DATA } from '../data/productData';
import { MAGNET_SSS } from '../data/magnetSeo';
export { MAGNET_SSS } from '../data/magnetSeo';
import { CategoryHero } from './CategoryHero';
import { RelatedBlogPosts } from './RelatedBlogPosts';
import { WhatsAppIcon } from './WhatsAppIcon';

// 6 ADET GALERİ KARTI
const MAGNET_GALLERY = [
  {
    filename: "magnet-baski-fiyatlari.webp",
    src: "/images/magnet/magnet-baski-fiyatlari.webp",
    title: "Magnet Baskı Fiyatları ve Çeşitleri",
    desc: "48x68 mm standart, oval ve özel kesimli buzdolabı magneti çeşitleri ve modelleri.",
    badge: "0.50 mm Mıknatıs"
  },
  {
    filename: "dereceli-magnet-ornegi.webp",
    src: "/images/magnet/dereceli-magnet-ornegi.webp",
    title: "Dereceli ve Termometreli Magnet Modelleri",
    desc: "Kurumsal tanıtım ve ev kullanımı için dereceli ve termometreli magnet modelleri.",
    badge: "Buzdolabı Magneti"
  },
  {
    filename: "oval-kesim-magnet.webp",
    src: "/images/magnet/oval-kesim-magnet.webp",
    title: "Oval Kesim Reklam Magneti",
    desc: "Köşeleri yuvarlatılmış oval kesim reklam ve tanıtım magnet modelleri.",
    badge: "Oval Kesim"
  },
  {
    filename: "ozel-figur-kesimli-magnet.webp",
    src: "/images/magnet/ozel-figur-kesimli-magnet.webp",
    title: "Özel Figür ve Şekil Kesimli Magnet",
    desc: "Logonuza ve ürün formunuza uygun özel kalıp bıçaklı kesim magnet seçenekleri.",
    badge: "Özel Kesim"
  },
  {
    filename: "magnet-baski-tasarimi.webp",
    src: "/images/magnet/magnet-baski-tasarimi.webp",
    title: "Magnet Baskı ve Grafik Tasarımı",
    desc: "Canlı renkli ofset baskı ve resimli mıknatıslı magnet örnekleri.",
    badge: "Mıknatıslı Magnet"
  },
  {
    filename: "magnet-baski.webp",
    src: "/images/magnet/magnet-baski.webp",
    title: "0.50 mm Kaliteli Magnet Baskı",
    desc: "250 gr Bristol sıvama, parlak selefon koruması ve 0.50 mm magnet mıknatısı tabakası.",
    badge: "0.50 mm Mıknatıs"
  }
];

// 10 SEKTÖREL KULLANIM ALANI
const SEKTORLER = [
  { icon: UtensilsCrossed, title: "Restoran & Paket Servis", desc: "Kebap, pizza, pide ve döner salonları için restoran ve paket servis magnet seçenekleri" },
  { icon: Droplets, title: "Su Bayileri", desc: "Mutfakta tek telefonla sipariş için su bayisi tanıtım magnetleri" },
  { icon: Flame, title: "Tüp Gaz Bayileri", desc: "Mutfak ocağı ve kombi yakını tüp siparişi iletişim kartları" },
  { icon: Wrench, title: "Teknik Servis & Kombi", desc: "Kombi, klima ve beyaz eşya için teknik servis tanıtım magnetleri" },
  { icon: Key, title: "Çilingir & Anahtarcı", desc: "Kapıda kalma durumlarında hazır acil numara magnetleri" },
  { icon: Pill, title: "Eczane & Sağlık", desc: "Nöbetçi eczane ve acil danışma hatları" },
  { icon: Car, title: "Taksi Durağı & Oto Servis", desc: "Taksi çağırma ve oto servis iletişim numaraları" },
  { icon: Store, title: "Halı Yıkama & Temizlik", desc: "Periyodik ev temizliği ve koltuk yıkama siparişleri" },
  { icon: Building2, title: "Emlak & Gayrimenkul", desc: "Bölgesel kiralık ve satılık portföy duyuruları" },
  { icon: Briefcase, title: "Veteriner & Pet Shop", desc: "Evcil hayvan aşı ve veteriner kliniği hatları" }
];

export const MagnetPage: React.FC = () => {
  const { openProductDetail } = useCart();

  const openWhatsApp = (item: any) => {
    openProductDetail({ ...item, miktar: "1.000 Adet" }, "Magnet");
  };

  const customQuoteWhatsAppUrl = `https://wa.me/905366022373?text=${encodeURIComponent("Merhaba, web sitenizdeki /magnet sayfasından ulaşıyorum. Fiyat listesinde bulunmayan magnet ölçüsü, model, kesim şekli ve adet seçeneği için özel teklif almak istiyorum.")}`;

  return (
    <div className="bg-slate-50 min-h-screen pb-20 text-slate-900" data-page-root="magnet">


      {/* BREADCRUMB NAVIGATION */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
            </li>
            <li className="text-slate-400">/</li>
            <li>
              <Link to="/matbaa" className="hover:text-primary transition-colors">Matbaa Ürünleri</Link>
            </li>
            <li className="text-slate-400">/</li>
            <li className="text-slate-900 font-bold" aria-current="page">Magnet Baskı Fiyatları</li>
          </ol>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* HERO SECTION */}
        <CategoryHero
          title="Magnet Baskı Fiyatları ve Buzdolabı Magnet Modelleri"
          badge="0.50 mm Mıknatıs • Parlak Selefonlu • 1.000 Adet"
          description={
            <div className="space-y-3 text-slate-650 text-sm leading-relaxed">
              <p>
                Kurumsal tanıtım, paket servis ve bölgesel pazarlama faaliyetleriniz için <strong>0.50 mm mıknatıs</strong> tabakası, 250 gr Bristol karton sıvaması ve parlak selefon kaplamasıyla sunulan <strong>magnet baskı</strong>, <strong>buzdolabı magnet modelleri</strong>, <strong>özel kesim magnet</strong> ve <strong>mıknatıslı magnet</strong> çeşitlerimizi inceleyebilirsiniz. İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktası üzerinden Türkiye geneline anlaşmalı kargo seçeneği sunulmaktadır.
              </p>
              <p>
                Ev ve iş yerlerinde metal yüzeylerde görünürlük sağlayan <strong>buzdolabı magneti</strong> çözümleri, acil aramalarda firmanıza doğrudan ulaşılmasını kolaylaştırır. Farklı ebat, tiraj ve kesim seçenekleri için <strong>magnet siparişi</strong> oluşturabilir veya özel teklif talep edebilirsiniz. Tanıtım setinizi tamamlamak için <Link to="/kartvizit" className="text-primary hover:underline font-bold">kartvizit baskı</Link>, <Link to="/brosur" className="text-primary hover:underline font-bold">broşür</Link>, <Link to="/el-ilani" className="text-primary hover:underline font-bold">el ilanı</Link> ve <Link to="/etiket" className="text-primary hover:underline font-bold">sticker etiket</Link> sayfalarımızı inceleyebilirsiniz.
              </p>
            </div>
          }
          relatedLinks={[
            { label: "Kartvizit Baskı", path: "/kartvizit" },
            { label: "Broşür Baskı", path: "/brosur" },
            { label: "El İlanı Baskı", path: "/el-ilani" },
            { label: "Sticker Etiket", path: "/etiket" },
            { label: "Karton Çanta", path: "/karton-canta" }
          ]}
          customCtaText="Özel Teklif Al"
          customCtaLink={customQuoteWhatsAppUrl}
        />

        {/* GÜVENLİ BİLGİLENDİRME BANNERI */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border border-slate-800 shadow-md my-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary border border-primary/30 flex items-center justify-center shrink-0">
              <Truck size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-primary uppercase tracking-wider">Magnet Baskı ve Teslimat Bilgisi</span>
                <span className="text-[10px] bg-primary/20 text-sky-300 px-2 py-0.5 rounded-full font-bold">1.000 Adet Standart</span>
              </div>
              <p className="text-xs md:text-sm font-bold text-white mt-0.5">
                Üretim ve kargoya teslim süresi; adet, dosya onayı, malzeme ve sipariş yoğunluğuna göre teklif aşamasında bildirilir.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-gray-300 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 shrink-0">
            <Clock size={14} className="text-primary" />
            <span>İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktası</span>
          </div>
        </div>

        {/* FİYAT LİSTESİ TABLOSU (MAG1, MAG2, MAG3) */}
        <section id="fiyat-tablosu" className="scroll-mt-24 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-7 bg-primary rounded-full shrink-0" />
                <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                  Magnet Baskı Fiyat Listesi
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                48x68 mm standart, oval veya özel kesimli 0.50 mm mıknatıslı magnet fiyatları
              </p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>0.50 mm Mıknatıs • Renkli Baskı</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-slate-900 text-white border-b border-slate-900">
                    <th className="p-3.5 md:p-4 text-center font-black uppercase tracking-wider text-xs border-r border-slate-800 w-8 sm:w-10"></th>
                    <th className="p-3.5 md:p-4 text-center font-black uppercase tracking-wider text-xs border-r border-slate-800 w-24">KOD</th>
                    <th className="p-3.5 md:p-4 text-center font-black uppercase tracking-wider text-xs border-r border-slate-800">ADET</th>
                    <th className="p-3.5 md:p-4 text-center font-black uppercase tracking-wider text-xs border-r border-slate-800">EBAT</th>
                    <th className="p-3.5 md:p-4 text-left font-black uppercase tracking-wider text-xs border-r border-slate-800">AÇIKLAMA &amp; TEKNİK DETAY</th>
                    <th className="p-3.5 md:p-4 text-center font-black uppercase tracking-wider text-xs border-r border-slate-800 w-32 whitespace-nowrap">FİYAT</th>
                    <th className="p-3.5 md:p-4 text-center font-black uppercase tracking-wider text-xs w-44">SİPARİŞ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MAGNET_DATA[0].items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-sky-50/40 transition-colors">
                      {idx === 0 && (
                        <td 
                          rowSpan={MAGNET_DATA[0].items.length}
                          className="bg-primary text-white font-black text-center p-2 border-r border-slate-200 select-none"
                          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                        >
                          <span className="tracking-widest uppercase text-xs font-black">MAGNET</span>
                        </td>
                      )}
                      <td className="p-3.5 text-center font-black text-primary border-r border-slate-100">
                        {item.code}
                      </td>
                      <td className="p-3.5 text-center font-bold text-slate-800 border-r border-slate-100 whitespace-nowrap">
                        {item.miktar}
                      </td>
                      <td className="p-3.5 text-center font-bold text-slate-700 border-r border-slate-100 whitespace-nowrap">
                        {item.ebat}
                      </td>
                      <td className="p-3.5 text-left border-r border-slate-100">
                        <span className="font-semibold text-slate-800 block">
                          {item.desc}
                        </span>
                      </td>
                      <td className="p-3.5 text-center font-black text-base md:text-lg text-slate-900 border-r border-slate-100 bg-slate-50/50 whitespace-nowrap">
                        {item.price}
                      </td>
                      <td className="p-3.5 text-center whitespace-nowrap">
                        <button
                          onClick={() => openWhatsApp(item)}
                          className="inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-sky-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold tracking-tight transition-all shadow-xs hover:shadow-md active:scale-95"
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
            <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 font-medium">
              <span>* Fiyatlarımıza %20 KDV dahil değildir. İstanbul Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktası üzerinden sevk edilir.</span>
              <span className="mt-1 sm:mt-0 font-semibold text-slate-700">Minimum sipariş adedi: 1.000 adettir.</span>
            </div>
          </div>

          <div className="mt-3">
            <FireWarning />
          </div>
        </section>

        {/* MAGNET NEDİR, BASKI VE FİYAT HESAPLAMA REHBERİ */}
        <section id="magnet-rehberi" className="scroll-mt-24 mb-12 bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 lg:p-10">
            {/* Üst Kısım: Magnet Nedir ve Nasıl Yapılır + Sağ Görsel Vitrini */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-slate-100">
              <div className="lg:col-span-7 space-y-4 text-xs md:text-sm text-slate-650 leading-relaxed">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider">
                  <HelpCircle size={15} />
                  <span>Teknik Üretim &amp; Rehber</span>
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 uppercase tracking-tight">
                  Magnet Nedir ve Magnet Baskı Nasıl Yapılır?
                </h2>
                <p className="text-slate-700 font-medium">
                  <strong>Magnet nedir?</strong> Magnet, arkasında esnek manyetik tabaka bulunan ve buzdolabı gibi metal yüzeylere tutunan etkili bir tanıtım ürünüdür. Profesyonel <strong>magnet baskı</strong> sürecinde 250 gr Bristol karton üzerine canlı CMYK renklerle ofset baskı uygulanır, baskı yüzeyinin korunmasına yardımcı olan parlak selefon ile kaplanır ve 0.50 mm kalınlığındaki manyetik tabakaya sıvanarak pres bıçaklarıyla kesilir.
                </p>

                {/* Öne Çıkan Özellik Rozetleri */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center gap-2.5">
                    <Layers className="text-primary shrink-0" size={18} />
                    <div>
                      <div className="text-[11px] font-black text-slate-900 leading-tight">0.50 mm Mıknatıs</div>
                      <div className="text-[10px] text-slate-500 font-semibold">Güçlü Tutunma</div>
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center gap-2.5">
                    <Sparkles className="text-amber-500 shrink-0" size={18} />
                    <div>
                      <div className="text-[11px] font-black text-slate-900 leading-tight">Parlak Selefon</div>
                      <div className="text-[10px] text-slate-500 font-semibold">Çizilmez Koruma</div>
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center gap-2.5 col-span-2 sm:col-span-1">
                    <ShieldCheck className="text-emerald-600 shrink-0" size={18} />
                    <div>
                      <div className="text-[11px] font-black text-slate-900 leading-tight">250 gr Bristol</div>
                      <div className="text-[10px] text-slate-500 font-semibold">Ofset CMYK Baskı</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sağ Taraf: Canlı Magnet Görseli ve Hızlı Sipariş Kartı */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md group bg-slate-100">
                  <img
                    src="/images/magnet/magnet-baski.webp"
                    alt="0.50 mm Profesyonel buzdolabı magnet baskı üretimi"
                    width={600}
                    height={400}
                    className="w-full h-52 sm:h-60 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-4 text-white">
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-primary text-white text-[11px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">
                        1.000 Adet Paket
                      </span>
                      <span className="text-[11px] text-sky-200 font-bold flex items-center gap-1">
                        <CheckCircle2 size={13} className="text-emerald-400" />
                        Ücretsiz Teknik Kontrol
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium mt-1">
                      Özel kesimli, oval veya standart 48x68 mm buzdolabı magnetleri
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alt Kısım: Magnet Fiyatları ve Magnet Tasarımı 2 Sütun */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
              {/* Magnet Fiyatları ve Çeşitleri Kartı */}
              <div className="bg-gradient-to-br from-slate-50 to-sky-50/40 p-5 sm:p-6 rounded-2xl border border-sky-100/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 flex items-center justify-center shrink-0">
                      <ShoppingCart size={18} />
                    </div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                      Toptan Magnet Baskı ve Fiyat Seçimi
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-slate-650 leading-relaxed font-medium">
                    <strong>Toptan buzdolabı magnet fiyatları</strong> karşılaştırılırken ölçü, kesim türü ve sipariş adedi birlikte değerlendirilmelidir. Tablodaki MAG1 ve MAG2 modelleri, 48x68 mm ölçüde 1.000 adetlik paketlerdir. <strong>Toptan magnet baskı</strong> veya farklı tirajlarda <strong>toplu magnet siparişi</strong> için bu bilgileri paylaşarak teklif alabilirsiniz. Özel ebatlı MAG3 seçeneği cm² birim fiyatıyla hesaplanır; hazır paket fiyatından ayrı değerlendirilir.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-sky-200/50 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-semibold">Tiraj Standardı:</span>
                  <span className="font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">1.000 Adet Koli</span>
                </div>
              </div>

              {/* Magnet Tasarımı ve Hazırlama Kartı */}
              <div className="bg-gradient-to-br from-slate-50 to-emerald-50/40 p-5 sm:p-6 rounded-2xl border border-emerald-100/80 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                      <FileCheck size={18} />
                    </div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                      Logolu Magnet Tasarımı ve Kurumsal Tanıtım
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-slate-650 leading-relaxed font-medium">
                    <strong>Logolu magnet</strong> tasarımında işletme adı, telefon numarası ve kısa hizmet bilgileri kolay okunmalıdır. <strong>Promosyon magnet</strong> veya <strong>reklam magneti</strong> hazırlarken tek bir iletişim çağrısına odaklanmak, küçük alandaki metin kalabalığını azaltır. Kurumsal tanıtım dosyanız için grafik desteği var. Ölçü, taşma payı ve özel kesim dosyası hakkında <Link to="/blog/magnet-baski-olculeri-ve-tasarim-rehberi" className="text-primary hover:underline font-bold">magnet tasarım rehberini</Link> inceleyebilirsiniz.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-200/50 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-semibold">Grafik Desteği:</span>
                  <span className="font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">Baskı Öncesi Kontrol &amp; Prova</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="magnet-siparis-secimi" className="scroll-mt-24 mb-12 bg-white rounded-3xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-slate-900">
            Magnet Yaptırma: Model, Ölçü ve Sipariş Seçimi
          </h2>
          <p className="mt-3 text-sm text-slate-650 leading-relaxed">
            İşletmeniz için magnet bastırma sürecinde önce kullanım alanını ve iletişim bilgilerini belirleyin. Magnet basımı için hazırlanan tasarımın ölçüsü ile seçilen kesim modeli birbiriyle uyumlu olmalıdır. Baskılı magnet fiyatları karşılaştırılırken paket adedi ve teknik özellikler birlikte incelenmelidir.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Magnet Kartvizit Fiyatları</h3>
              <p className="mt-2 text-sm text-slate-650 leading-relaxed">
                Magnet kartvizit baskı, firma adı ve telefon numarasını manyetik tabakalı bir tanıtım kartında bir araya getirir. Magnet kartvizit fiyatları, seçilen ölçü ve kesim şekline göre değerlendirilir. Bu sayfadaki 50x80 mm veya özel cm² ebat talepleri MAG3 kapsamında tekliflendirilir. Standart 48x68 mm MAG1 ve MAG2 paketleriyle karşılaştırırken aynı ölçü ve adet üzerinden bilgi isteyin.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Büyük Magnet Baskı ve Özel Kesim</h3>
              <p className="mt-2 text-sm text-slate-650 leading-relaxed">
                Büyük magnet baskı talebinde en ve boy ölçüsünü, sipariş adedini ve kesim çizgisini birlikte paylaşın. Logo şeklinde magnet baskı veya ürün siluetine uygun özel magnet yaptırma taleplerinde dış kontur, tasarım dosyasında ayrıca belirtilmelidir. Özel ebat için kullanılan MAG3 cm² birim fiyatı, hazır bir ürün paketinin toplam fiyatı değildir.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Online Magnet Siparişi Nasıl Verilir?</h3>
              <p className="mt-2 text-sm text-slate-650 leading-relaxed">
                Standart model için <a href="#fiyat-tablosu" className="text-primary hover:underline font-bold">magnet baskı fiyat listesini</a> inceleyin ve seçtiğiniz satırdaki Hemen Sipariş Ver düğmesini kullanın. Listede bulunmayan ebat veya kesim için Özel Teklif Al bağlantısından talebinizi iletebilirsiniz. Buzdolabı magnetini toptan sipariş ederken aynı tasarımdan istediğiniz adedi ve teslimat adresini de belirtin.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">İstanbul Magnet Baskı ve Türkiye Geneli Gönderim</h3>
              <p className="mt-2 text-sm text-slate-650 leading-relaxed">
                İstanbul magnet baskı talepleri için iletişim ve dosya hazırlığı, Topkapı 2. Matbaacılar Sitesi’ndeki hizmet ve koordinasyon noktası üzerinden yürütülür. Türkiye geneline anlaşmalı kargo seçeneği sunulur. Kurumsal magnet baskı teklifinde logo ve iletişim bilgilerinizle birlikte net ölçüyü, kesim tercihini ve adedi paylaşabilirsiniz; üretim ve kargoya teslim süresi teklif aşamasında bildirilir.
              </p>
            </div>
          </div>
        </section>

        {/* MAGNET ÖLÇÜLERİ VE KESİM ÇEŞİTLERİ */}
        <section id="magnet-olculeri" className="scroll-mt-24 mb-12">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-primary font-black text-xs md:text-sm uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-2">
              Ölçü &amp; Kesim Seçenekleri
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
              Magnet Ölçüleri ve Kesim Çeşitleri
            </h2>
            <p className="text-slate-600 text-xs md:text-sm mt-2">
              Tanıtım alanınıza ve bütçenize uygun buzdolabı magnet modelleri seçeneklerini inceleyin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* 48x68 mm Standart */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-primary/40 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-primary text-white text-[11px] font-black px-2.5 py-0.5 rounded-md">Standart Ebat</span>
                  <span className="text-xs font-bold text-slate-500">MAG1 / MAG2</span>
                </div>
                <h3 className="text-base font-black text-slate-900 mb-1">48x68 mm Magnet</h3>
                <p className="text-xs text-primary font-bold mb-2">Standart Tanıtım Ölçüsü</p>
                <p className="text-xs text-slate-650 leading-relaxed">
                  Buzdolabı üzerinde yeterli alan sağlar. Telefon numarası, logo, web sitesi ve kısa hizmet bilgileri için pratik bir boyuttur.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-semibold">
                Kesim: Düz Kesim veya Oval Köşe
              </div>
            </div>

            {/* Oval Kesim */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-primary/40 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-emerald-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-md">Yuvarlak Köşe</span>
                  <span className="text-xs font-bold text-slate-500">MAG2</span>
                </div>
                <h3 className="text-base font-black text-slate-900 mb-1">Oval Kesim Magnet</h3>
                <p className="text-xs text-emerald-700 font-bold mb-2">Ovalize Köşeler</p>
                <p className="text-xs text-slate-650 leading-relaxed">
                  Köşeleri dairesel formda yuvarlatılmış modeldir. Estetik bir görünüm sunar ve köşelerin takılmasını önlemeye yardımcı olur.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-semibold">
                Kesim: Ovalize Pres Bıçak
              </div>
            </div>

            {/* Özel Figür Kesim */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-primary/40 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-purple-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-md">Figürlü Form</span>
                  <span className="text-xs font-bold text-slate-500">MAG1 / MAG3</span>
                </div>
                <h3 className="text-base font-black text-slate-900 mb-1">Özel Kesim Magnet</h3>
                <p className="text-xs text-purple-700 font-bold mb-2">Özel Şekil Kalıpları</p>
                <p className="text-xs text-slate-650 leading-relaxed">
                  Logonuzun dış hatlarına veya sektörel ürün formuna (su damacanası, tüp, pizza dilimi vb.) göre özel bıçakla kesilebilir.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-semibold">
                Kesim: Özel Kalıp Bıçağı
              </div>
            </div>

            {/* Mıknatıslı Kartvizit & Büyük Ebat */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-primary/40 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-amber-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-md">Özel Format</span>
                  <span className="text-xs font-bold text-slate-500">MAG3</span>
                </div>
                <h3 className="text-base font-black text-slate-900 mb-1">Mıknatıslı Kartvizit</h3>
                <p className="text-xs text-amber-800 font-bold mb-2">50x80 mm / Özel cm² Ebat</p>
                <p className="text-xs text-slate-650 leading-relaxed">
                  <strong>Magnetli kartvizit</strong>, işletmenizin logosunu ve iletişim bilgilerini manyetik tabakalı bir kartta birleştirir. Mıknatıslı kartvizit tasarımında telefon numarası ve hizmet alanı öne çıkarılabilir; özel ölçü için cm² üzerinden teklif alınır.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-semibold">
                Hesaplama: cm² Birim Fiyatı
              </div>
            </div>
          </div>
        </section>

        {/* 6 ADET GALERİ KARTI (RESPONSIVE: 2 SÜTUN MOBİL, 3 SÜTUN TABLET/DESKTOP) */}
        <section id="gorsel-galeri" className="scroll-mt-24 mb-12">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-primary font-black text-xs md:text-sm uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-2">
              Üretim &amp; Baskı Örnekleri
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
              Magnet Baskı Örnekleri
            </h2>
            <p className="text-slate-600 text-xs md:text-sm mt-2 max-w-2xl mx-auto">
              Magnet örnekleri ve resimli mıknatıslı magnet modelleri; restoran, su bayisi, teknik servis ve kurumsal buzdolabı tanıtım uygulamalarını gösterir.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
            {MAGNET_GALLERY.map((g, idx) => (
              <div 
                key={idx} 
                data-expected-filename={g.filename}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:border-primary/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[3/2] bg-slate-100 overflow-hidden border-b border-slate-100 group">
                    <img 
                      src={g.src} 
                      alt={g.title} 
                      loading="lazy" 
                      decoding="async" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider z-10">
                      {g.badge}
                    </div>
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="text-sm md:text-base font-black text-slate-900 mb-1.5 group-hover:text-primary transition-colors">
                      {g.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                      {g.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TEKNİK ÖZELLİKLER TABLOSU */}
        <section id="teknik-ozellikler" className="scroll-mt-24 mb-12">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Ruler className="text-primary shrink-0" size={28} />
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Buzdolabı Magneti Teknik Özellikler Tablosu
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs md:text-sm bg-white rounded-xl overflow-hidden border border-slate-200">
                <thead>
                  <tr className="bg-slate-900 text-white text-left font-black">
                    <th className="p-3.5 md:p-4 border-r border-slate-800">Teknik Parametre</th>
                    <th className="p-3.5 md:p-4 border-r border-slate-800">Standart Değer</th>
                    <th className="p-3.5 md:p-4">Açıklama &amp; Fonksiyon</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 md:p-4 font-black text-slate-900 border-r border-slate-200">Mıknatıs Kalınlığı</td>
                    <td className="p-3.5 md:p-4 font-bold text-primary border-r border-slate-200">0.50 mm Mıknatıs</td>
                    <td className="p-3.5 md:p-4 text-slate-650">Buzdolabı, kombi ve metal yüzeylerde tutunma sağlayan manyetik tabaka. Magnetin tutunması; yüzey türüne, temizliğine ve ürün ağırlığına göre değişebilir.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 md:p-4 font-black text-slate-900 border-r border-slate-200">Taşıyıcı Kâğıt</td>
                    <td className="p-3.5 md:p-4 font-bold text-slate-800 border-r border-slate-200">250 gr Amerikan Bristol</td>
                    <td className="p-3.5 md:p-4 text-slate-650">Baskı yüzeyinin pürüzsüz olmasını sağlayan ve renkleri net yansıtan karton sıvama.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 md:p-4 font-black text-slate-900 border-r border-slate-200">Yüzey Koruma</td>
                    <td className="p-3.5 md:p-4 font-bold text-slate-800 border-r border-slate-200">Parlak Selefon Kaplama</td>
                    <td className="p-3.5 md:p-4 text-slate-650">Parlak selefon baskı yüzeyinin korunmasına yardımcı olabilir.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 md:p-4 font-black text-slate-900 border-r border-slate-200">Baskı Yöntemi</td>
                    <td className="p-3.5 md:p-4 font-bold text-slate-800 border-r border-slate-200">Ofset CMYK Çok Renkli</td>
                    <td className="p-3.5 md:p-4 text-slate-650">Toplu siparişlerde net yazı ve renk dağılımı sunan ofset baskı yöntemi.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 md:p-4 font-black text-slate-900 border-r border-slate-200">Kesim Türü</td>
                    <td className="p-3.5 md:p-4 font-bold text-slate-800 border-r border-slate-200">Düz, Oval veya Özel Şekil</td>
                    <td className="p-3.5 md:p-4 text-slate-650">Kesim türü düz, oval veya özel şekil olarak değerlendirilebilir.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 md:p-4 font-black text-slate-900 border-r border-slate-200">Minimum Sipariş</td>
                    <td className="p-3.5 md:p-4 font-bold text-slate-800 border-r border-slate-200">1.000 Adet</td>
                    <td className="p-3.5 md:p-4 text-slate-650">Kalıp ve hazırlık süreçleri için standart üretim tirajıdır.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 6 ADIMDA PROFESYONEL MAGNET TASARIM VE BASKI HAZIRLIK REHBERİ */}
        <section id="tasarim-rehberi" className="scroll-mt-24 mb-12">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-primary font-black text-xs md:text-sm uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-2">
              Teknik Hazırlık
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
              Magnet Tasarımı Hazırlarken Dikkat Edilecek 6 Kural
            </h2>
            <p className="text-slate-600 text-xs md:text-sm mt-2">
              Baskı ve kesim kalitesini korumak için dosyanızı hazırlarken bu adımları takip edin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FileCheck,
                title: "1. 300 DPI & CMYK Renk Modu",
                desc: "Tasarım dosyanız ekran formatı olan RGB yerine matbaa standardı CMYK modunda ve en az 300 DPI çözünürlükte hazırlanmalıdır."
              },
              {
                icon: Ruler,
                title: "2. 3 mm Kesim Taşma Payı (Bleed)",
                desc: "Kesim esnasında kenarlarda beyaz çizgi kalmaması için zemin rengi ve görselleri net ebadın dışına her kenardan 3 mm taşırın."
              },
              {
                icon: ShieldCheck,
                title: "3. Güvenlik ve Emniyet Alanı",
                desc: "Telefon numarası, logo, adres ve sosyal medya ikonlarını kesim çizgisinden en az 3-4 mm içeride tutarak bıçak altında kalmasını önleyin."
              },
              {
                icon: Sparkles,
                title: "4. Yazı Tiplerini Eğriye Dönüştürme",
                desc: "Font uyumsuzluğu veya kayması yaşamamak için tüm metinleri vektörel çizgiye (Convert to Curves / Outlines) çevirin."
              },
              {
                icon: Layers,
                title: "5. Özel Kesim Bıçak Vektörü",
                desc: "Özel şekilli kesimlerde (damacana, tüp, logo) kesim çizgisini ayrı bir katmanda veya belirgin bir renkte vektörel olarak belirtin."
              },
              {
                icon: Truck,
                title: "6. Koruyucu Kutu Paketleme",
                desc: "Üretimi tamamlanan magnetler koruyucu ambalajlarla paketlenerek kargoya verilir."
              }
            ].map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-primary transition-all shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black mb-3">
                    <ItemIcon size={20} />
                  </div>
                  <h3 className="text-base font-black text-slate-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* MAGNETTE SIK YAPILAN 5 KRİTİK HATA (UYARI ALANI) */}
        <section className="bg-red-50 p-6 md:p-8 rounded-3xl border border-red-200 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="text-red-600 shrink-0" size={28} />
            <h2 className="text-xl md:text-2xl font-black text-red-900 uppercase tracking-tight">
              Magnet Tasarımında Sık Yapılan 5 Kritik Hata
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Küçük ve Okunaksız Telefon Numarası: Mutfakta buzdolabı kapağına bakıldığında telefonun veya WhatsApp hattının net okunamaması.",
              "Taşma Payı Bırakmamak: Kesim payı verilmediği için bıçak payında yazının kesilmesi veya kenarda beyaz şerit oluşması.",
              "Aşırı Kalabalık Tasarım: Küçük magnet alanına onlarca ürün fotoğrafı ve uzun metinler sığdırmaya çalışarak karmaşa yaratmak.",
              "RGB Formatında Gönderim: Dijital ekran renkleriyle hazırlanan tasarımların baskıda ton farkı oluşturması.",
              "Düşük Çözünürlüklü Logo: İnternetten kopyalanan küçük logoların baskıda pikselleşerek belirsiz görünmesi."
            ].map((err, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-red-100 shadow-xs">
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

        {/* 10 SEKTÖREL KULLANIM ALANI */}
        <section id="kullanim-alanlari" className="scroll-mt-24 mb-12">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-primary font-black text-xs md:text-sm uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-2">
              Sektörel Çözümler
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
              Buzdolabı Magnetinin Tercih Edildiği 10 Sektör
            </h2>
            <p className="text-slate-600 text-xs md:text-sm mt-2">
              Hızlı ve acil sipariş veya randevu gerektiren işletmeler için pratik bir tanıtım aracı.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {SEKTORLER.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 text-center hover:border-primary hover:shadow-md transition-all flex flex-col items-center justify-center group">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-primary group-hover:text-white text-slate-800 flex items-center justify-center transition-all mb-2 shadow-xs">
                    <IconComponent size={20} />
                  </div>
                  <h3 className="text-xs font-black text-slate-900 mb-1 group-hover:text-primary transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 font-medium leading-tight hidden md:block">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="mt-5 text-sm text-slate-650 leading-relaxed">
            Döner ve kebap salonlarında paket servis magneti için logo, sipariş telefonu ve hizmet bölgesini birlikte planlayabilirsiniz. Menü bağlantısı kullanacaksanız QR kodun baskı ölçüsünde okunabilirliğini kontrol edin. Sektöre uygun yerleşim için <Link to="/sektor/donerci-magnet-baski" className="text-primary hover:underline font-bold">dönerci magnet baskı seçeneklerini</Link> inceleyin.
          </p>
        </section>

        {/* İKİNCİ ÖZEL TEKLİF AL BAĞLANTISI (FİYAT TABLOSU DIŞINDA) */}
        <div className="bg-gradient-to-r from-sky-900 to-slate-900 rounded-3xl p-6 md:p-8 text-white mb-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md border border-slate-800">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-black uppercase tracking-tight">
              Özel Ölçü, Adet veya Farklı Kesim Şekli Mi Arıyorsunuz?
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              Fiyat listemizde bulunmayan özel magnet ebatları ve tirajlar için WhatsApp hattımız üzerinden hızlıca teklif alabilirsiniz.
            </p>
          </div>
          <a
            href={customQuoteWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs md:text-sm px-5 py-3 rounded-xl transition-all shadow-md shrink-0 active:scale-95 hover:scale-105"
          >
            <WhatsAppIcon size={18} />
            <span>Özel Teklif Al</span>
          </a>
        </div>

        {/* SSS BÖLÜMÜ (10 SORU) */}
        <section id="faq-section" className="scroll-mt-24 mb-12">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-primary font-black text-xs md:text-sm uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-2">
              Sıkça Sorulan Sorular
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
              Magnet Baskı Hakkında Sıkça Sorulan Sorular (SSS)
            </h2>
            <p className="text-slate-600 text-xs md:text-sm mt-2">
              Mıknatıs kalınlığı, kesim türleri, minimum sipariş ve teslimat şartları hakkında merak edilenler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto items-stretch">
            {MAGNET_SSS.map((faq, idx) => (
              <div 
                key={idx} 
                className="h-full border border-slate-200 rounded-2xl bg-white p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-black text-xs md:text-sm text-slate-900 mb-2.5 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    <span className="leading-snug">{faq.q}</span>
                  </h3>
                  <div className="h-px bg-slate-100 my-2.5 w-full" />
                  <p className="text-xs md:text-sm font-medium text-slate-650 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BLOG & TOPİKAL MATBAA REHBERLERİ */}
        <div className="my-10">
          <RelatedBlogPosts category="magnet" />
        </div>
      </div>
    </div>
  );
};

export default MagnetPage;


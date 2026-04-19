import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, ShoppingCart, Zap } from 'lucide-react';
import { useCart, FeatureTooltip, ProductSEOSection } from '../App';
import { LOCAL_ASSETS } from '../constants/assets';
import { WHATSAPP_LINK } from '../constants/contact';

export const KARTON_CANTA_DATA = [
  {
    ebat: "16x25x6 cm",
    items: [
      { code: "KC15-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon", miktar: "500 Adet", price: "8.400 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC15-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon", miktar: "500 Adet", price: "8.400 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC11-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon", miktar: "1.000 Adet", price: "11.150 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC11-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon", miktar: "1.000 Adet", price: "11.150 ₺", image: LOCAL_ASSETS.karton_canta },
    ]
  },
  {
    ebat: "27x16x6 cm",
    items: [
      { code: "KC25-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon", miktar: "500 Adet", price: "9.610 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC25-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon", miktar: "500 Adet", price: "9.610 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC21-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon", miktar: "1.000 Adet", price: "13.020 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC21-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon", miktar: "1.000 Adet", price: "13.020 ₺", image: LOCAL_ASSETS.karton_canta },
    ]
  },
  {
    ebat: "25x37x8 cm",
    items: [
      { code: "KC35-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon", miktar: "500 Adet", price: "9.500 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC35-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon", miktar: "500 Adet", price: "9.500 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC31-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon", miktar: "1.000 Adet", price: "13.900 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC31-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon", miktar: "1.000 Adet", price: "13.900 ₺", image: LOCAL_ASSETS.karton_canta },
    ]
  },
  {
    ebat: "51x33x13 cm",
    items: [
      { code: "KC45-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon", miktar: "500 Adet", price: "13.350 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC45-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon", miktar: "500 Adet", price: "13.350 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC41-1", desc: "210 gr. Amerikan Bristol - 4 Renk - Parlak Selefon", miktar: "1.000 Adet", price: "20.500 ₺", image: LOCAL_ASSETS.karton_canta },
      { code: "KC41-2", desc: "210 gr. Amerikan Bristol - 4 Renk - Mat Selefon", miktar: "1.000 Adet", price: "20.500 ₺", image: LOCAL_ASSETS.karton_canta },
    ]
  }
];

export const KartonCantaPage = () => {
  const { openProductDetail } = useCart();
  const openWhatsApp = (item: any, ebat: string) => {
    openProductDetail({ ...item, ebat }, "Karton Çanta");
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Karton Çanta Baskı | Mavi Basım Matbaa &amp; Reklam</title>
        <meta name="description" content="Özel tasarım karton çanta baskı hizmetleri. 210 gr Amerikan Bristol kağıt, mat/parlak selefon seçenekleri ve farklı ebatlarda kurumsal karton çantalar." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
            <ChevronRight size={20} className="rotate-180 text-secondary" />
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black whitespace-nowrap">Karton Çanta</h1>
          </div>
        </div>

        {KARTON_CANTA_DATA.map((group, gIdx) => (
          <div key={gIdx} className="mb-10 border border-gray-300 rounded-xl overflow-visible shadow-xl relative z-10">
            <div className="bg-secondary text-white p-3 flex flex-col md:flex-row justify-between items-start md:items-center">
              <h2 className="text-xl font-bold uppercase tracking-tight">Karton Çanta - {group.ebat}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[11px] md:text-[13px] font-sans">
                <thead>
                  <tr className="bg-black text-white font-black uppercase tracking-tight">
                    <th className="p-2 border border-gray-300">KOD</th>
                    <th className="p-2 border border-gray-300">AÇIKLAMA</th>
                    <th className="p-2 border border-gray-300">ADET</th>
                    <th className="p-2 border border-gray-300">FİYAT</th>
                    <th className="p-2 border border-gray-300 w-16">SİPARİŞ</th>
                  </tr>
                </thead>
                <tbody>
                  {group.items.map((item, iIdx) => (
                    <tr key={iIdx} className="bg-white hover:bg-primary/5 transition-colors">
                      <td className="p-2 border border-gray-300 text-center font-bold text-primary">{item.code}</td>
                      <td className="p-2 border border-gray-300 text-black font-medium">
                        {item.desc}
                        <FeatureTooltip code={item.code} />
                      </td>
                      <td className="p-2 border border-gray-300 text-center text-black font-medium">{item.miktar}</td>
                      <td className="p-2 border border-gray-300 text-center font-black text-black text-sm md:text-lg">{item.price}</td>
                      <td className="p-2 border border-gray-300 text-center">
                        <button onClick={() => openWhatsApp(item, group.ebat)} className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-colors">
                          <ShoppingCart size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* New Content Section */}
        <div className="mt-16 space-y-16">
          {/* Hangi Ebat Sizin İçin En Uygun? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight">Hangi Ebat Sizin İçin En Uygun?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { size: "17x25x7 cm", desc: "Optikçiler, eczaneler, küçük butikler, hediyelik eşya mağazaları" },
                { size: "20x25x10 cm", desc: "Kozmetik mağazaları, bijuteri dükkanları, küçük elektronikçiler" },
                { size: "25x35x8 cm (dikey)", desc: "Giyim mağazaları, ayakkabı dükkanları, kitapçılar, fuar boy" },
                { size: "35x25x8 cm (yatay)", desc: "Fuar katılımcıları, katalog dağıtımı yapan firmalar" },
                { size: "54x38x13 cm (yatay)", desc: "Mobilya mağazaları, ev tekstili, büyük hediye paketleri" },
                { size: "35x47x12 cm (dikey)", desc: "Elektronik mağazaları, büyük giyim zincirleri" }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 hover:shadow-xl transition-all group">
                  <h3 className="text-xl font-black text-primary mb-2 group-hover:text-secondary transition-colors">{item.size}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Karton Çanta Özellikleri */}
          <section className="bg-black rounded-[40px] p-8 md:p-12 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <h2 className="text-2xl md:text-3xl font-black mb-8 uppercase tracking-tight relative z-10">Karton Çanta Özellikleri</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                { label: "Kağıt", value: "210 gr Amerikan Bristol (Yüksek Dayanıklılık)" },
                { label: "Kaplama", value: "Mat veya Parlak Selefon (Standart)" },
                { label: "Baskı", value: "Full Renk CMYK (Logo, Slogan, İletişim)" },
                { label: "Adet", value: "100 – 1.000 Adet (Kurumsal Kullanım)" }
              ].map((item, idx) => (
                <div key={idx} className="border-l-2 border-primary pl-4">
                  <p className="text-primary font-black uppercase text-xs tracking-widest mb-1">{item.label}</p>
                  <p className="font-bold text-lg">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Karton Çanta Tasarımı Nasıl Yapılır? */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight text-center">Karton Çanta Tasarımı Nasıl Yapılır?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Hedef & Konsept", desc: "Kaç adet? Logo, slogan, iletişim bilgileri gibi detayları belirleyin." },
                { step: "2", title: "İçerik Planlama", desc: "Ön yüz: Logo, slogan. Yan yüzler: İletişim bilgileri veya görsel." },
                { step: "3", title: "Teknik Hazırlık", desc: "Dosya PDF, CMYK, 300 dpi ve +3 mm taşma payı." },
                { step: "4", title: "Onay & Baskı", desc: "Tasarımınızı gönderin, aynı gün onay ile üretim başlar." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl text-center group hover:border-primary transition-all">
                  <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black text-xl mx-auto mb-6 group-hover:bg-primary transition-colors">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-black text-black mb-4">{item.title}</h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <div className="inline-block p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <p className="text-black font-bold">🎨 Tasarım ücretimiz 400 TL'dir. Hazır tasarım getirirseniz ücretsiz!</p>
              </div>
            </div>
          </section>

          {/* Karton Çantada Sık Yapılan 5 Hata */}
          <section className="bg-red-50 p-8 md:p-12 rounded-[40px] border border-red-100">
            <h2 className="text-2xl md:text-3xl font-black text-red-600 mb-8 uppercase tracking-tight">Karton Çantada Sık Yapılan 5 Hata</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Eksik Bilgi", desc: "Logo veya iletişim bilgileri eksik kalması markayı unutturur." },
                { title: "Yanlış Ebat", desc: "Ürünün sığmaması veya çantanın fazla boş kalması." },
                { title: "Düşük Kağıt Kalitesi", desc: "Kolay yırtılan veya bükülen dayanıksız malzemeler." },
                { title: "Renk Uyumsuzluğu", desc: "Marka kimliği ile uyuşmayan baskı renkleri." },
                { title: "Karmaşık Tasarım", desc: "Görsel etkiyi azaltan çok kalabalık tasarımlar." }
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

          {/* Kurumsal Kimliğinizi Güçlendirin! */}
          <section>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-8 uppercase tracking-tight text-center">Kurumsal Kimliğinizi Güçlendirin!</h2>
            <p className="text-center text-gray-500 font-medium mb-8">Karton çanta siparişinizin yanına bunları da ekleyebilirsiniz.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Katalog", desc: "Ürünlerinizi detaylı tanıtın.", path: "/kataloglar" },
                { title: "Kartvizit", desc: "Profesyonel imaj yaratın.", path: "/kartvizit" },
                { title: "Antetli Kağıt", desc: "Resmi yazışmalarınız için.", path: "/antetli-kagit" },
                { title: "Zarf", desc: "Kurumsal gönderileriniz için.", path: "/zarf" }
              ].map((product, idx) => (
                <Link key={idx} to={product.path} className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all">
                  <h3 className="text-lg font-black text-black mb-2 group-hover:text-primary transition-colors">{product.title}</h3>
                  <p className="text-sm font-medium text-gray-500">{product.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Agency Discount CTA */}
          <section className="bg-black rounded-[40px] p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full -mr-48 -mt-48 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full -ml-48 -mb-48 blur-3xl" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">
                Matbaa ve Reklam Ajanslarına Özel İndirim!
              </h2>
              <p className="text-xl text-gray-400 mb-10 font-medium leading-relaxed">
                Toptan siparişlerde ekstra avantajlar ve ajanslara özel fiyat listemiz için hemen iletişime geçin. <span className="text-white"><strong>Mavi Basım Matbaa & Reklam</strong></span> olarak 2026'da da en uygun fiyatlı karton çanta çözümlerini sunuyoruz.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl shadow-primary/20"
                >
                  <ShoppingCart size={24} />
                  Hemen Teklif Al
                </a>
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/10 text-white border border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  <Zap size={24} />
                  Ajans İndirimi
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
      <ProductSEOSection categoryKey="karton_canta" />
    </div>
  );
};

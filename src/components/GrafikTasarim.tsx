import React from 'react';
import { Check } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { ProductSEOSection } from '../App';

export const GrafikTasarimPage = () => {
  const services = [
    { title: "Logo Tasarımı", desc: "Markanızın temel taşı olan özgün logo tasarımları" },
    { title: "Kartvizit Tasarımı", desc: "Profesyonel ilk izlenim için şık ve etkili kartvizitler" },
    { title: "Broşür & Katalog Tasarımı", desc: "Ürün/hizmet tanıtımı için detaylı ve satış odaklı tasarımlar" },
    { title: "Afiş & Poster Tasarımı", desc: "Etkinlik, kampanya ve fuar duyuruları için dikkat çekici tasarımlar" },
    { title: "Ambalaj & Etiket Tasarımı", desc: "Ürün kutusu, etiket, sticker tasarımları" },
    { title: "Kurumsal Kimlik Paketi", desc: "Logo + kartvizit + zarf + antetli + bloknot" },
  ];

  const process = [
    { title: "Brief Alma & Analiz", desc: "Markanızı, hedef kitlenizi ve beklentilerinizi detaylı öğreniyoruz." },
    { title: "Konsept & Taslak Sunumu", desc: "2-3 farklı konsept hazırlayıp ilk taslakları sunuyoruz." },
    { title: "Revizyon & Son Hal", desc: "Geri bildirimlerinizle tasarımları revize edip son haline getiriyoruz." },
    { title: "Teslim & Baskı Hazırlığı", desc: "Baskıya hazır PDF dosyalarını teslim ediyoruz. İsterseniz baskı + kargo paketiyle birlikte gönderiyoruz." },
  ];

  const pricing = [
    { service: "Logo Tasarımı", price: "500 – 4.500 TL", package: "Dahil", time: "3–7 gün" },
    { service: "Kartvizit Tasarımı", price: "200 – 800 TL", package: "Dahil", time: "1–2 gün" },
    { service: "Broşür / Flyer Tasarımı", price: "400 – 2.000 TL", package: "Dahil", time: "1–2 gün" },
    { service: "Katalog Tasarımı (8–32 sayfa)", price: "2.500 – 8.000 TL", package: "Dahil", time: "1–5 gün" },
    { service: "Afiş / Poster Tasarımı", price: "600 – 1.500 TL", package: "Dahil", time: "1–2 gün" },
    { service: "Ambalaj / Etiket Tasarımı", price: "300 – 3.500 TL", package: "Dahil", time: "1–2 gün" },
    { service: "Tam Kurumsal Kimlik Paketi", price: "—", package: "6.500 – 15.000 TL", time: "10–20 gün", isBold: true },
  ];

  const reasons = [
    "20+ yıllık sektör tecrübesi",
    "Baskı öncesi ve sonrası uyumlu tasarım (baskıya hazır dosya teslimi)",
    "Ücretsiz ilk revizyonlar (paketlere göre)",
    "Tasarım + baskı paketi indirimleri",
    "81 il kargo ile Türkiye’nin her yerine teslimat",
    "Kendi fabrikamızda üretim – aracı yok, fiyat avantajı",
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>Grafik Tasarım Hizmetleri | Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa</title>
        <meta name="description" content="Profesyonel grafik tasarım hizmetleri. Logo tasarımı, kurumsal kimlik, katalog ve broşür tasarımı. Baskıya hazır, yüksek kaliteli görsel çözümler." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter mb-6">
            Grafik Tasarım Hizmetleri
          </h1>
          <p className="text-lg text-black max-w-4xl mx-auto leading-relaxed font-medium">
            <strong>Mavi Basım Matbaa & Reklam</strong> grafik tasarım ekibi, 20 yılı aşkın tecrübesiyle markaların görsel kimliğini oluşturuyor. 
            Logo, kartvizit, broşür, katalog, afiş, ambalaj, sosyal medya görselleri ve kurumsal kimlik paketleri hazırlıyoruz. 
            Tüm tasarımlarımız baskıya hazır formatta teslim edilir – ekstra düzeltme maliyeti çıkmaz.
          </p>
        </div>

        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-20">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight text-center mb-12">
            Grafik Tasarım Hizmetlerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:translate-x-1 transition-transform">{s.title}</h3>
                <p className="text-black text-sm font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight text-center mb-12">
            Grafik Tasarım Sürecimiz (4 Adım)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {process.map((p, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-black text-xl shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">{p.title}</h3>
                  <p className="text-black font-medium leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-20">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight text-center mb-12">
            Grafik Tasarım Fiyatları (2026 Güncel – KDV Hariç)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-gray-200 text-secondary font-black uppercase text-sm">
                  <th className="p-4 text-left border border-gray-300">Hizmet</th>
                  <th className="p-4 text-center border border-gray-300">Tek Tasarım Fiyatı</th>
                  <th className="p-4 text-center border border-gray-300">Kurumsal Kimlik Paketi</th>
                  <th className="p-4 text-center border border-gray-300">Teslim Süresi</th>
                </tr>
              </thead>
              <tbody>
                {pricing.map((p, idx) => (
                  <tr key={idx} className={`hover:bg-primary/5 transition-colors ${p.isBold ? 'font-black bg-gray-50' : ''}`}>
                    <td className="p-4 border border-gray-300 text-black font-bold">{p.service}</td>
                    <td className="p-4 border border-gray-300 text-center text-black font-medium">{p.price}</td>
                    <td className="p-4 border border-gray-300 text-center text-black font-medium">{p.package}</td>
                    <td className="p-4 border border-gray-300 text-center text-black font-medium">{p.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-secondary/50 text-xs italic mt-6">
            Tasarım + baskı paketi alırsanız tasarım ücreti %50'ye varan oranda indirimli uygulanır.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight text-center mb-12">
            Neden <strong>Mavi Basım Matbaa & Reklam</strong> Grafik Tasarım Ekibini Tercih Etmelisiniz?
          </h2>
          <div className="space-y-6">
            {reasons.map((r, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                  <Check size={14} strokeWidth={4} />
                </div>
                <p className="text-secondary font-bold text-lg">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ProductSEOSection categoryKey="grafik_tasarim" />
    </div>
  );
};

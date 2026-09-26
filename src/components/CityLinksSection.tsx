import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Truck, 
  ShieldCheck, 
  Printer, 
  CheckCircle2, 
  PhoneCall, 
  MessageCircle,
  ArrowRight,
  Compass,
  Building2,
  PackageCheck
} from 'lucide-react';
import { 
  CITIES_DATA, 
  FEATURED_CITY_SLUGS, 
  FEATURED_CITIES_MAP, 
  MUGLA_DISTRICTS_DATA, 
  GEOGRAPHICAL_REGIONS 
} from '../data/cityData';

export const CityLinksSection: React.FC = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Get featured cities in exact order specified
  const featuredCities = FEATURED_CITY_SLUGS.map(slug => {
    const city = CITIES_DATA.find(c => c.slug === slug);
    return {
      name: city ? city.name : slug.replace('-matbaa', ''),
      slug,
      region: city ? city.region : '',
      sectorNote: FEATURED_CITIES_MAP[slug] || 'Kurumsal firmalar, sanayi ve yerel işletmeler.'
    };
  });

  // Group all 81 cities by region
  const citiesByRegion = GEOGRAPHICAL_REGIONS.map(regionName => {
    const cities = CITIES_DATA.filter(c => c.region === regionName);
    return {
      regionName,
      cities
    };
  });

  // ItemList schema for SEO
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Türkiye Geneli Matbaa ve Baskı Hizmeti Verilen Şehirler",
    "description": "Türkiye'nin 81 iline kargo teslimatlı online matbaa ve baskı hizmetleri.",
    "itemListElement": CITIES_DATA.map((city, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": `${city.name} Matbaa Hizmeti`,
      "url": `https://mavibasim.com/${city.slug}`
    }))
  };

  const muglaProducts = [
    "Amerikan servis",
    "Menü ve broşür",
    "El ilanı",
    "Magnet",
    "Kartvizit",
    "Etiket",
    "Karton çanta",
    "Kutu ve ambalaj",
    "Araç kiralama sözleşmesi",
    "Adisyon ve sipariş fişi"
  ];

  return (
    <section id="turkiye-geneli-matbaa" className="bg-slate-50 py-12 md:py-20 border-t border-b border-slate-200/90 text-slate-900 scroll-mt-20">
      <script type="application/ld+json">
        {JSON.stringify(itemListSchema)}
      </script>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm mb-10">
          <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest mb-3">
            <Compass size={16} />
            <span>TÜRKİYE GENELİ HİZMET AĞI</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-3.5xl font-black text-slate-900 uppercase tracking-tight mb-4 leading-tight">
            Türkiye’nin 81 İline <span className="text-primary">Online Matbaa ve Baskı</span> Hizmeti
          </h2>

          <p className="text-slate-700 font-semibold text-sm sm:text-base leading-relaxed max-w-5xl mb-6">
            Mavi Basım Matbaa &amp; Reklam; hazırladığı kartvizit, broşür, katalog, magnet, etiket, kutu, karton çanta, afiş, Amerikan servis, makbuz ve kurumsal baskı ürünlerini Türkiye’nin 81 iline güvenli kargo ile ulaştırmaktadır. Tasarım dosyanızı online olarak gönderebilir, baskı öncesi PDF prova onayınızı verebilir ve bulunduğunuz şehirden çıkmadan matbaa siparişi oluşturabilirsiniz.
          </p>

          {/* TRUST BADGES / GÜVEN MADDELERİ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-6 border-t border-slate-100 text-xs font-bold text-slate-800">
            <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <Printer className="text-primary w-4 h-4 shrink-0" />
              <span>İstanbul Topkapı’da doğrudan üretim</span>
            </div>
            <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <CheckCircle2 className="text-emerald-600 w-4 h-4 shrink-0" />
              <span>Baskı öncesi ücretsiz PDF prova</span>
            </div>
            <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <PackageCheck className="text-primary w-4 h-4 shrink-0" />
              <span>Koruyucu ve dayanıklı paketleme</span>
            </div>
            <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <Truck className="text-primary w-4 h-4 shrink-0" />
              <span>Türkiye’nin 81 iline kargo</span>
            </div>
            <div className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <PhoneCall className="text-emerald-600 w-4 h-4 shrink-0" />
              <span>Telefon ve WhatsApp üzerinden sipariş</span>
            </div>
          </div>
        </div>

        {/* FEATURED CITIES / ÖNE ÇIKAN ŞEHİRLER */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2.5">
              <span className="w-2.5 h-6 bg-primary rounded-full inline-block" />
              Öne Çıkan Şehirler
            </h3>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline-block">
              Doğrudan Üretimden Sevk
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {featuredCities.map((city) => (
              <Link
                key={city.slug}
                to={`/${city.slug}`}
                aria-label={`${city.name} matbaa ve baskı hizmetlerini incele`}
                className="group bg-white hover:bg-primary hover:text-white p-4 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-black uppercase tracking-tight group-hover:text-white transition-colors">
                      {city.name}
                    </span>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                  <p className="text-[11px] font-bold text-primary group-hover:text-white/90 transition-colors mb-2">
                    Matbaa ve baskı hizmetleri
                  </p>
                  <p className="text-[11px] font-medium text-slate-500 group-hover:text-white/80 transition-colors leading-snug line-clamp-2">
                    {city.sectorNote}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 group-hover:border-white/20 flex items-center justify-between text-[11px] font-black text-slate-900 group-hover:text-white transition-colors">
                  <span>İncele</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* MUĞLA & TURİZM BÖLGELERİ ÖZEL ALANI */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl mb-10 relative overflow-hidden border border-slate-700">
          <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start justify-between">
            <div className="max-w-4xl space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/20 text-[#00E5FF] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <Building2 size={14} /> ÖZEL BÖLGE SEVKİYATI
              </div>

              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                Muğla ve Turizm Bölgelerine Matbaa Gönderimi
              </h3>

              <p className="text-slate-200 text-xs sm:text-sm font-semibold leading-relaxed">
                Muğla merkez ile Bodrum, Fethiye, Marmaris, Milas, Ortaca, Dalaman, Datça, Köyceğiz, Ula ve Yatağan’daki otel, restoran, kafe, turizm işletmesi, emlak ofisi, araç kiralama firması, mağaza ve yerel işletmelere özel baskılı ürünler İstanbul Topkapı üretim tesisimizden kargo ile gönderilmektedir.
              </p>

              {/* District text badges */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Hizmet Verilen Muğla İlçeleri:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {MUGLA_DISTRICTS_DATA.map((dist, idx) => (
                    <span 
                      key={idx}
                      className="bg-white/10 text-slate-200 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/10"
                    >
                      {dist.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Product tags */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Popüler Turizm Baskı Ürünleri:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {muglaProducts.map((prod, idx) => (
                    <span 
                      key={idx}
                      className="bg-[#00E5FF]/10 text-[#00E5FF] text-[11px] font-bold px-2.5 py-1 rounded-lg border border-[#00E5FF]/20"
                    >
                      {prod}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="shrink-0 w-full lg:w-auto">
              <Link
                to="/mugla-matbaa"
                aria-label="Muğla matbaa ve baskı hizmetlerini incele"
                className="inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-black text-sm px-6 py-4 rounded-2xl transition-all shadow-lg w-full lg:w-auto whitespace-nowrap"
              >
                <span>Muğla Matbaa Sayfası</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* ALL CITIES ACCORDION BY 7 REGIONS */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <button
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              aria-expanded={isAccordionOpen}
              aria-controls="all-cities-regions-accordion"
              className="inline-flex items-center gap-3 bg-slate-900 hover:bg-primary text-white font-extrabold text-sm px-8 py-4 rounded-2xl transition-all shadow-md cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary/30"
            >
              <span>{isAccordionOpen ? "Daha Az Şehir Göster" : "81 İlin Tamamını Gör"}</span>
              {isAccordionOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            <p className="text-xs font-semibold text-slate-500 mt-2">
              7 coğrafi bölgemizdeki tüm il merkezlerine İstanbul Topkapı tesislerimizden hızlı sevkiyat
            </p>
          </div>

          {/* ACCORDION CONTENT */}
          <div 
            id="all-cities-regions-accordion"
            className={`transition-all duration-300 ease-in-out ${isAccordionOpen ? 'block opacity-100 mt-8 pt-6 border-t border-slate-100' : 'hidden opacity-0'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {citiesByRegion.map((reg, idx) => (
                <div key={idx} className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 border-l-4 border-primary pl-2.5">
                    {reg.regionName}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {reg.cities.map((city) => (
                      <Link
                        key={city.plateCode}
                        to={`/${city.slug}`}
                        aria-label={`${city.name} matbaa ve baskı hizmetlerini incele`}
                        className="flex items-center justify-between p-2.5 bg-white hover:bg-primary hover:text-white rounded-xl border border-slate-200/80 transition-colors text-xs font-bold text-slate-800 min-h-[44px]"
                      >
                        <span className="truncate">{city.name} Matbaa</span>
                        <span className="text-slate-400 group-hover:text-white ml-1 shrink-0">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

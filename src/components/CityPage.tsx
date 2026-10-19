import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, FileCheck2, PhoneCall, Truck } from 'lucide-react';
import { getCityBySlug, getPriorityCityContent, CITIES_DATA } from '../data/cityData';
import { CITY_PRODUCT_GROUPS, PRINT_ORDER_GUIDES, getCityOrderGuides, getCityOrderFAQ, getCityServiceSchema, getCityFAQSchema } from '../data/cityOrderGuide';
import { getCitySearchMetadata } from '../utils/citySearchMetadata';
import { PHONE_LINK, WHATSAPP_NUMBER } from '../constants/contact';
import { WhatsAppIcon } from './WhatsAppIcon';
import { getCityPriceExamples } from '../data/cityPriceExamples';

const sectionClass = 'bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-8 shadow-sm';
const headingClass = 'text-xl md:text-2xl font-black text-slate-900 mb-4';

export const CityPage: React.FC<{ citySlug?: string }> = ({ citySlug: propCitySlug }) => {
  const params = useParams<{ citySlug?: string }>();
  const citySlug = propCitySlug || params.citySlug;
  if (!citySlug) return <Navigate to="/" replace />;
  const city = getCityBySlug(citySlug);
  if (!city) return <>
    <Helmet><title>404 - Şehir Matbaa Sayfası Bulunamadı | Mavi Basım</title><meta name="robots" content="noindex, follow" /></Helmet>
    <div className="max-w-4xl mx-auto px-4 py-16"><h1 className="text-2xl font-black">Şehir Matbaa Sayfası Bulunamadı</h1><p>Aradığınız şehir sayfası bulunamadı.</p><Link to="/">Ana Sayfaya Dön</Link></div>
  </>;

  const seo = getCitySearchMetadata(city);
  const guides = getCityOrderGuides(city);
  const faq = getCityOrderFAQ(city);
  const priority = getPriorityCityContent(city.slug);
  const priceExamples = getCityPriceExamples(city.slug);
  const nearby = CITIES_DATA.filter(item => item.region === city.region && item.slug !== city.slug).slice(0, 8);
  const canonical = `https://mavibasim.com/${city.slug}`;
  const quoteText = `Merhaba, ${city.name} için matbaa fiyat teklifi almak istiyorum.\nÜrün:\nÖlçü:\nAdet / cilt adedi:\nMalzeme ve baskı tercihi:\nDosya durumu:\nTeslimat ilçesi ve ihtiyaç tarihi:`;
  const quoteLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(quoteText)}`;
  const serviceInfo = <>
    <p className="text-slate-700 leading-relaxed mb-4">Reklam, ambalaj, kurumsal evrak ve makbuz / form ihtiyaçlarında farklı ürünleri birlikte değerlendirebilirsiniz. Bu sayfadaki ürün örnekleri hizmet kapsamını sınırlandırmaz; {city.name} ve ilçelerindeki tüm işletmeler için ihtiyaca göre teklif hazırlanır.</p>
    <p className="text-sm text-slate-600 mb-5">Sipariş ve dosya iletişimi İstanbul Topkapı 2. Matbaacılar Sitesi hizmet ve koordinasyon noktası üzerinden yürütülür. Üretim ve teslim süresi ürün, adet, malzeme ve onay sürecine göre teklif aşamasında paylaşılır.</p>
  </>;

  return <>
    <Helmet>
      <title>{seo.title}</title><meta name="description" content={seo.desc} />
      <link rel="canonical" href={canonical} /><meta property="og:url" content={canonical} /><meta name="robots" content="index, follow" />
      <script type="application/ld+json">{JSON.stringify(getCityServiceSchema(city))}</script>
      <script type="application/ld+json">{JSON.stringify(getCityFAQSchema(city))}</script>
    </Helmet>

    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12" data-city-content={city.slug}>
      <nav aria-label="Sayfa yolu" className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-4">
        <Link to="/">Ana Sayfa</Link><ChevronRight size={14} /><span>{city.name} Matbaa</span>
      </nav>

      <section className={sectionClass} aria-labelledby="city-title">
        <p className="text-xs font-bold text-primary mb-2">{city.region} · Sipariş ve kargo ile gönderim</p>
        <h1 id="city-title" className="text-2xl md:text-4xl font-black text-slate-900 leading-tight mb-4">{city.name} Matbaa ve Baskı Hizmetleri</h1>
        <p className="text-base md:text-lg font-semibold text-primary mb-4">{seo.desc}</p>
        {priceExamples.length === 0 ? serviceInfo : null}
        <div className="flex flex-wrap gap-3">
          <a href={quoteLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-5 py-3 rounded-xl"><WhatsAppIcon size={18} />Teklif Bilgilerini WhatsApp ile İlet</a>
          <a href={PHONE_LINK} className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-5 py-3 rounded-xl"><PhoneCall size={18} />Müşteri Hizmetleri</a>
        </div>
        {priceExamples.length > 0 ? <>
          <section id="ornek-fiyatlar" aria-labelledby="price-examples-title" className="mt-7 pt-6 border-t border-slate-200 scroll-mt-24">
            <h2 id="price-examples-title" className={headingClass}>Örnek Baskı Fiyatları</h2>
            <p className="text-sm text-slate-600 mb-4">Belirtilen adet ve özellikler için toplam baskı bedellerini inceleyin. Kartı seçerek ürünün tüm fiyatlarına ulaşabilirsiniz.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {priceExamples.map(example => <Link key={example.path} to={example.path} data-price-example={example.item.code} className="group flex flex-col rounded-xl border border-sky-200 bg-sky-50/50 p-5 text-slate-900 transition-colors hover:border-primary hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700">
                <h3 className="text-lg font-black mb-2">{example.quantity} {example.name} Baskı</h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-3">{example.item.ebat ? `${example.item.ebat} · ` : ''}{example.item.desc}</p>
                <p className="text-xs text-slate-500 mb-3">Ürün kodu: {example.item.code}</p>
                <div className="mt-auto">
                  <p className="text-xs font-semibold text-slate-600">Toplam baskı bedeli</p>
                  <p className="text-3xl font-black text-slate-900 mt-1">{example.item.price}</p>
                  <p className="text-xs font-semibold text-slate-600 mt-1">%20 KDV dahil değildir.</p>
                  <span className="inline-flex items-center gap-2 min-h-11 text-primary font-bold mt-3">Tüm {example.name} Fiyatlarını İncele<ChevronRight size={16} /></span>
                </div>
              </Link>)}
            </div>
            <p className="text-xs text-slate-600 mt-4">Fiyatlar yalnızca gösterilen baskı seçenekleri içindir. Kargo bedeli ve gönderim planı sipariş sırasında netleştirilir.</p>
          </section>
          <div className="mt-6">{serviceInfo}</div>
        </> : null}
        <nav aria-label="Sayfa bölümleri" className="flex flex-wrap gap-x-5 gap-y-2 mt-6 text-sm font-bold text-primary">
          <a href="#urun-secimi">Ürün seçimi</a><a href="#teklif-bilgileri">Teklif bilgileri</a><a href="#tum-urunler">Tüm ürünler</a><a href="#dosya-onay">Dosya ve onay</a><a href="#kargo-plani">Gönderim</a>
        </nav>
      </section>

      <section id="urun-secimi" className="mb-8" aria-labelledby="product-guide-title">
        <h2 id="product-guide-title" className={headingClass}>Baskı Ürününü Seçerken Nelere Bakmalısınız?</h2>
        <p className="text-sm text-slate-600 mb-5">Aşağıdaki üç ürün için farklı karar noktalarını inceleyin. Diğer ürün gruplarına da bu sayfadan ulaşabilirsiniz.</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {guides.map(guide => <article key={guide.path} data-order-guide={guide.path} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col">
            <h3 className="text-lg font-black text-slate-900 mb-3">{guide.name} Baskı</h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">{guide.use}</p>
            <ul className="list-disc pl-5 space-y-3 text-sm text-slate-600 mb-5">{guide.choices.map(choice => <li key={choice}>{choice}</li>)}</ul>
            <Link to={guide.path} className="mt-auto font-bold text-primary inline-flex items-center gap-2">{guide.name} Fiyat ve Seçenekleri<ChevronRight size={16} /></Link>
          </article>)}
        </div>
      </section>

      <section id="teklif-bilgileri" className={sectionClass} aria-labelledby="quote-title">
        <h2 id="quote-title" className={headingClass}>Teklif İçin Hangi Bilgileri Göndermelisiniz?</h2>
        <p className="text-sm text-slate-600 mb-5">Farklı özellikteki işleri karşılaştırırken ölçü, malzeme ve adetlerin aynı kapsamda olduğundan emin olun. Tercihiniz belli değilse ürünün kullanım amacını ve elinizdeki örneği paylaşın.</p>
        <div className="overflow-x-auto"><table className="w-full text-left text-sm border-collapse">
          <caption className="sr-only">Seçili baskı ürünleri için teklif bilgileri</caption>
          <thead><tr className="bg-slate-100"><th scope="col" className="p-3 border border-slate-200">Ürün</th><th scope="col" className="p-3 border border-slate-200">İletilecek bilgiler</th></tr></thead>
          <tbody>{guides.map(guide => <tr key={guide.path}><th scope="row" className="p-3 border border-slate-200 font-bold">{guide.name}</th><td className="p-3 border border-slate-200">{guide.quoteFields.join(' · ')}</td></tr>)}</tbody>
        </table></div>
        <p className="text-sm text-slate-600 mt-4">Gönderim için ilçe ve açık adresi; planlama için ihtiyaç tarihinizi ekleyin. İletilen tarih, teslimat taahhüdü olarak kabul edilmez; uygun plan teklif sırasında paylaşılır.</p>
        <a href={quoteLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-bold mt-4"><WhatsAppIcon size={18} />{city.name} İçin Teklif İste</a>
      </section>

      <section id="tum-urunler" className={sectionClass} aria-labelledby="all-products-title">
        <h2 id="all-products-title" className={headingClass}>Diğer Matbaa Ürünleri ve Fiyat Sayfaları</h2>
        <p className="text-sm text-slate-600 mb-5">İhtiyacınıza uygun ürünün ölçü, malzeme ve sipariş seçeneklerini kendi sayfasında inceleyin.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">{CITY_PRODUCT_GROUPS.map(group => <div key={group.name}>
          <h3 className="font-black text-slate-900 mb-3">{group.name === 'Makbuz ve Formlar' ? <Link to="/makbuz-ve-formlar">{group.name}</Link> : group.name}</h3>
          <ul className="space-y-2 text-sm">{group.products.map(([name,path]) => <li key={path}><Link to={path} className="text-primary font-semibold hover:underline">{name} Baskı</Link></li>)}</ul>
        </div>)}</div>
      </section>

      {priority ? <section className={sectionClass} aria-labelledby="existing-products-title">
        <h2 id="existing-products-title" className={headingClass}>Ürün Görselleri ve Diğer Seçenekler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{priority.featuredProducts.map(product => {
          const guide = Object.values(PRINT_ORDER_GUIDES).find(item => item.path === product.slug);
          return <article key={product.slug} className="border border-slate-200 rounded-xl p-4 flex flex-col">
            {product.imageSrc ? <img src={product.imageSrc} alt={product.imageAlt || product.name} width={400} height={250} loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover rounded-lg mb-3" /> : null}
            <h3 className="font-bold text-slate-900 mb-2">{guide?.name || CITY_PRODUCT_GROUPS.flatMap(group => group.products).find(([,path]) => path === product.slug)?.[0] || product.name}</h3>
            <p className="text-sm text-slate-600 mb-3">{guide?.use || 'Ürünün ebat, adet, malzeme ve baskı seçeneklerini ilgili sayfadan inceleyebilir; kullanım amacınızı paylaşarak teklif isteyebilirsiniz.'}</p>
            <Link to={product.slug} className="mt-auto font-bold text-primary">Fiyat ve Seçenekleri İncele</Link>
          </article>;
        })}</div>
      </section> : null}

      <section id="dosya-onay" className={sectionClass} aria-labelledby="file-title">
        <h2 id="file-title" className={headingClass}><FileCheck2 className="inline mr-2" size={24} />Dosya Hazırlığı ve Baskı Onayı</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700 leading-relaxed">
          <div><h3 className="font-black text-slate-900 mb-2">Dosyanız hazırsa</h3><p>Ürünün ölçüsünü, baskı adedini ve son dosyayı birlikte iletin. Logo, iletişim bilgileri, sayfa sırası, kesim ve katlama alanlarını kontrol edin. Mevcut dosyanızın baskıya uygunluğu teknik kontrolde değerlendirilir.</p></div>
          <div><h3 className="font-black text-slate-900 mb-2">Dosyanız hazır değilse</h3><p>Logo, metin ve görsellerinizi, varsa önceki baskı örneğini paylaşın. Grafik desteği var. Tasarım desteğinin kapsamı ve varsa bedeli teklif aşamasında değerlendirilir.</p></div>
        </div>
        <p className="text-sm text-slate-700 mt-5">Baskıya hazır dosyanın teknik kontrolü ve PDF prova kontrolü ücretsizdir. Dijital onay alınmadan baskıya başlanmaz. Prova üzerinde metin ve yerleşim kontrol edilir; fiziksel baskının rengi, kâğıt dokusu ve karton sertliği PDF ekranda birebir değerlendirilemez.</p>
        <Link to="/grafik-tasarim" className="inline-block mt-4 text-primary font-bold text-sm">Grafik desteği hakkında bilgi</Link>
      </section>

      <section id="kargo-plani" className={sectionClass} aria-labelledby="shipping-title">
        <h2 id="shipping-title" className={headingClass}><Truck className="inline mr-2" size={24} />{city.name} Sipariş ve Gönderim Planı</h2>
        <ol className="list-decimal pl-5 space-y-3 text-sm text-slate-700 leading-relaxed">
          <li>Ürün, teknik özellikler ve adet netleştirilir; teklif kapsamı paylaşılır.</li>
          <li>Dosya ve PDF prova kontrolünden sonra dijital baskı onayı alınır.</li>
          <li>Üretim planı, varsa kesim, katlama, cilt veya yüzey işlemleriyle birlikte değerlendirilir.</li>
          <li>Gönderim adresi, ilçe ve alıcı iletişim bilgileri üzerinden kargo planı netleştirilir.</li>
        </ol>
        <p className="text-sm text-slate-600 mt-5">Üretim ve teslim süresi ürün, adet, malzeme ve onay sürecine göre teklif aşamasında paylaşılır. Üretimin tamamlanması, kargoya verilmesi ve alıcıya teslimi farklı aşamalardır.</p>
        <p className="text-sm text-slate-600 mt-3">{city.name} il merkezi ve ilçelerine gönderim için açık adresinizi iletin. {city.districts.filter(name => name !== 'Merkez').slice(0,4).join(', ')} gibi ilçelerde adres ve alıcı bilgileri sipariş sırasında teyit edilir.</p>
        <Link to="/teslimat-sartlari" className="inline-block mt-4 text-primary font-bold text-sm">Teslimat koşullarını inceleyin</Link>
      </section>

      <section id="sehir-sss" className={sectionClass} aria-labelledby="faq-title">
        <h2 id="faq-title" className={headingClass}>Baskı Siparişi Hakkında Sorular</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{faq.map(item => <article key={item.question} className="bg-slate-50 p-5 rounded-xl">
          <h3 className="font-bold text-slate-900 mb-2">{item.question}</h3><p className="text-sm text-slate-600 leading-relaxed">{item.answer}</p>
        </article>)}</div>
      </section>

      <nav aria-label="Aynı bölgedeki şehir sayfaları" className="bg-slate-100 rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-900 mb-4">{city.region.replace(/ Bölgesi$/, '')} Bölgesindeki Diğer Şehirler</h2>
        <div className="flex flex-wrap gap-3 text-sm">{nearby.map(item => <Link key={item.slug} to={`/${item.slug}`} className="bg-white rounded-lg px-3 py-2 border border-slate-200 text-primary font-bold">{item.name} Matbaa</Link>)}</div>
      </nav>
    </div>
  </>;
};

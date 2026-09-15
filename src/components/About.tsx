import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  Printer, 
  Award, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Settings, 
  PhoneCall, 
  FileText, 
  Check, 
  ArrowRight, 
  Users, 
  Building2,
  HelpCircle,
  TrendingUp,
  Briefcase,
  Eye,
  Percent,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { PHONE_LINK, PHONE_NUMBER, WHATSAPP_LINK } from '../constants/contact';

export const HakkimizdaPage = () => {
  return (
    <div>
      <Helmet>
        <title>Hakkımızda | Mavi Basım Matbaa &amp; Reklam İstanbul Topkapı</title>
        <meta name="description" content="Topkapı 2. Matbaacılar Sitesi modern tesisinde kartvizit, kuşe broşür, katalog, cepli dosya ve ambalaj baskıları üreten dijital ve ofset matbaamızla tanışın." />
      </Helmet>

      {/* Hero Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center mb-12 max-w-4xl mx-auto">
          {/* Main H1 */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-primary uppercase tracking-tight mb-2">
            Mavi Basım'ın Üretim Yolculuğu
          </h1>
          <p className="text-xs md:text-sm font-black text-slate-500 uppercase tracking-widest mb-4">
            Köklü Sektör Tecrübesi &amp; Kurumsal Baskı Çözümleri
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
          
          <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed font-medium text-left">
            <p>
              Kurucumuz <strong>Tayfun Akan</strong> tarafından temelleri atılan Mavi Basım Matbaa &amp; Reklam, İstanbul Topkapı'daki üretim merkezinde kurumsal baskı, ambalaj ve matbaa çözümleri sunmaktadır. Tayfun Akan'ın kalite, güven ve doğrudan üretim anlayışıyla kurulan firmamız, bugün de aynı vizyonla Türkiye'nin 81 iline profesyonel matbaa hizmeti vermeye devam etmektedir.
            </p>
            <p>
              Topkapı Matbaacılar Sitesi'nde faaliyet gösteren Mavi Basım, modern üretim altyapısı ve online sipariş sistemiyle Türkiye genelindeki işletmelere matbaa çözümleri sunmaktadır. <Link to="/kartvizit" className="text-primary font-bold hover:underline">Kartvizitten</Link>{' '}
              <Link to="/kataloglar" className="text-primary font-bold hover:underline">kataloğa</Link>,{' '}
              <Link to="/brosur" className="text-primary font-bold hover:underline">broşürden</Link>{' '}
              <Link to="/kutu" className="text-primary font-bold hover:underline">ambalaj ürünlerine</Link> kadar geniş ürün yelpazemizi kendi üretim süreçlerimizle hazırlıyor, kaliteli baskıyı uygun fiyat ve zamanında teslimat anlayışıyla müşterilerimize ulaştırıyoruz.
            </p>
          </div>
        </div>

        {/* Brand & Market Stats Grid (Concrete Capacity & Authority Indicators) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-16">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center hover:border-primary/30 transition-all">
            <div className="text-2xl md:text-3xl font-black text-primary mb-1">Köklü Tecrübe</div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Sektör Uzmanlığı</div>
            <p className="text-[11px] text-gray-500 mt-2">Yıllara dayanan matbaa ve online baskı tecrübesi.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center hover:border-primary/30 transition-all">
            <div className="text-3xl md:text-4xl font-black text-primary mb-1">150K+</div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Günlük Baskı</div>
            <p className="text-[11px] text-gray-500 mt-2">Yüksek hızlı ofset tesislerimizde günlük tabaka kapasitesi.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center hover:border-primary/30 transition-all">
            <div className="text-3xl md:text-4xl font-black text-primary mb-1">4M+</div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Aylık Ürün Teslimatı</div>
            <p className="text-[11px] text-gray-500 mt-2">Türkiye'nin her noktasına ulaştırılan güvenli teslimat hacmi.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center hover:border-primary/30 transition-all">
            <div className="text-3xl md:text-4xl font-black text-primary mb-1">81 İl</div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Kargo Ağı</div>
            <p className="text-[11px] text-gray-500 mt-2">Türkiye genelindeki tüm Anadolu işletmelerine hızlı gönderim.</p>
          </div>
        </div>

        {/* Dual Core Sections: Introduction & Advantages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                Rakiplerimizden Somut Farklarımız
              </h2>
              {/* Shortened and divided into two readable paragraphs (Resolves Feedback 10) */}
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Mavi Basım olarak sadece "uygun fiyat" vaat etmiyoruz. Tesislerimize entegre ettiğimiz spektrofotometre tabanlı renk kontrol sistemlerimiz sayesinde renk sapmalarını engelliyor, kurumsal kimlik renklerinizin tüm baskılarda birebir aynı çıkmasını garanti ediyoruz.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Bununla birlikte, tüm sipariş akışınızı ERP tabanlı sistemlerimiz üzerinden anlık olarak izleyerek zaman kayıplarını eliyoruz. İş ortaklarımızın operasyonel verimliliğini artırmak amacıyla, teknik tasarım kontrollerini grafik ekibimiz aracılığıyla üretime geçmeden önce tamamen ücretsiz yapıyoruz.
              </p>
            </div>

            <div className="space-y-6 pt-2">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Hassas Renk ve Fire Yönetimi</h4>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed mt-1">
                    Sektör standardı %5 olan renk sapması ve üretim firesini, dijital kalibrasyonlu sistemlerimizle minimum seviyeye indirerek bütçenizi koruyoruz.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  {/* Absolute %100 changed to realistic data metric (Resolves Feedback 13) */}
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Zamanında ve Eksiksiz Teslimat</h4>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed mt-1">
                    İşlerinizin gecikmesinin işletmenize maliyetini biliyoruz. Üretim ve termin sürelerimize %99'un üzerinde rekor bir doğruluk oranıyla tam zamanında uyum sağlıyoruz.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Ücretsiz Grafik Teknik Kontrolü</h4>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed mt-1">
                    Tasarımınızdaki teknik hatalar (taşırma payı, çözünürlük vb.) üretime girmeden önce grafik ekibimizce ücretsiz düzeltilir.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Machine Park & Customer Benefits Section (Resolves Feedback 6) */}
          <div className="relative">
            <div className="aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <img 
                src="/images/hakkimizda/tecrube-matbaa.webp" 
                alt="Zeytinburnu Topkapı Mavi Basım Matbaa Üretim Tesisleri" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="mt-4 bg-slate-50 border border-slate-100 p-5 rounded-2xl">
              <h4 className="text-xs font-black text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Settings size={14} /> Gelişmiş Baskı Teknolojilerimiz ve Altyapımız
              </h4>
              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <p>
                  Tesislerimizde yüksek tirajlı işler için <strong>Heidelberg Speedmaster</strong> ve <strong>Komori 4 Renkli Ofset</strong> baskı makineleri, az adetli acil talepleriniz için ise <strong>Konica Minolta</strong> yüksek çözünürlüklü dijital baskı makineleri kullanılır.
                </p>
                <p className="bg-primary/5 text-slate-800 p-3 rounded-xl border border-primary/20 font-semibold text-xs md:text-sm leading-relaxed">
                  Modern üretim altyapımız sayesinde baskı, kesim, yapıştırma ve diğer baskı sonrası işlemleri kendi üretim süreçlerimizde gerçekleştirerek yüksek kalite ve zamanında teslimat sağlıyoruz.
                </p>
                <div className="bg-white p-3 rounded-xl border border-slate-200/60 space-y-2 mt-1">
                  <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">Müşterilerimize Sağladığı Ticari Avantajlar:</span>
                  <div className="grid grid-cols-1 gap-2 text-[11px]">
                    <div className="flex gap-1.5 items-start">
                      <span className="text-primary font-bold">✓</span>
                      <span><strong>Heidelberg Hızlı Ofset:</strong> Kalıp pozlandırma (CTP) entegrasyonu hazırlık maliyetlerini düşürür; bu sayede yüksek adetlerde <strong>en uygun birim fiyat</strong> avantajı elde edersiniz.</span>
                    </div>
                    <div className="flex gap-1.5 items-start">
                      <span className="text-primary font-bold">✓</span>
                      <span><strong>Mücellit ve Kırım Üniteleri:</strong> Kesim, kırım ve katlama gibi son işlemler fason aracı kullanılmadan tesis bünyesinde tamamlanır. Bu size <strong>%20 bütçe tasarrufu</strong> ve <strong>2 kat hızlı sevkiyat</strong> sağlar.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Production Process Section */}
        <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
              Sipariş ve Aracısız Üretim Sürecimiz Nasıl İşler?
            </h2>
            <div className="w-12 h-1 bg-primary mx-auto mt-3 rounded-full"></div>
            <p className="text-xs md:text-sm text-gray-500 mt-2">
              Siparişinizin her aşaması dijital takip sistemimizle kayıt altına alınır ve kontrol edilir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {[
              {
                step: "01",
                title: "Grafik & Teknik Kontrol",
                desc: "Gönderdiğiniz tasarımlar; çözünürlük, taşırma payı, CMYK renk profili ve kesim payı açısından teknik onay için incelenir."
              },
              {
                step: "02",
                title: "Dijital Prova & Onay",
                desc: "Hazırlanan dijital baskı yerleşimi onayınıza sunulur. Siz yazılı veya dijital teyit vermeden üretime asla başlanmaz."
              },
              {
                step: "03",
                title: "Baskı & Mücellit",
                desc: "Onaylanan iş, kendi fabrikamızda Heidelberg ofset veya dijital parkurumuzda basılarak selefon, kırım ve kesim işlemlerine girer."
              },
              {
                step: "04",
                title: "Detaylı Kalite Kontrol",
                desc: "Baskı sonrasında uzman paketleme departmanımız ürünleri tek tek inceleyerek adet, renk ve ölçü doğruluğunu teyit eder."
              },
              {
                step: "05",
                title: "Güvenli Paketleme & Sevk",
                desc: "Koruyucu çift kat mukavva kolilerle ambalajlanan paketleriniz, kargo veya doğrudan kurumsal sevkiyatla adresinize yollanır."
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group bg-white p-5 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                <div className="text-3xl font-black text-primary/20 group-hover:text-primary/40 transition-colors mb-3">
                  {item.step}
                </div>
                <h3 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Real Production and Quality Proofs Gallery Grid (Resolves Feedback 1 - EEAT Evidence) */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">Gerçek Üretim Kanıtları</span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight mt-3">
              Topkapı Tesisimizden Gerçek Üretim ve Kalite Kanıtları
            </h2>
            <div className="w-12 h-1 bg-primary mx-auto mt-3 rounded-full"></div>
            <p className="text-xs md:text-sm text-gray-500 mt-2">
              Sadece dijital tasarımlar değil; ofset tezgahlarımızdan çıkan gerçek, tamamlanmış, üstün standartlı kurumsal işlerimizin üretim detayları.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
              <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
                <img 
                  src="/images/katalog/katalog-baski-detayi.webp" 
                  alt="Heidelberg 4 Renk Ofset Katalog Baskı Parkuru" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] text-white font-bold">Heidelberg Ofset</div>
              </div>
              <div className="p-4">
                <h4 className="text-xs font-black text-slate-950 uppercase tracking-tight mb-1">Katalog Ofset Baskı</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">Topkapı tesisimizdeki yüksek tirajlı katalog ve kitapçıkların Heidelberg ofset ünitelerimizde milimetrik hizalamayla basılması.</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
              <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
                <img 
                  src="/images/dosya/cepli-dosya-baski-detayi.webp" 
                  alt="Cepli Dosya Selefon ve Mücellit Kesim" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] text-white font-bold">Özel Bıçaklı Kesim</div>
              </div>
              <div className="p-4">
                <h4 className="text-xs font-black text-slate-950 uppercase tracking-tight mb-1">Hassas Cepli Dosya Mücellit</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">Kurumsal sunum dosyalarının pürüzsüz mat/parlak selefon kaplama ve hidrolik bıçaklı şekilli kesim işlemleri.</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
              <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
                <img 
                  src="/images/kartvizit/kartvizit-yakin-cekim.webp" 
                  alt="Kartvizit Kalite Kontrol ve Paketleme" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] text-white font-bold">Kalite Kontrol</div>
              </div>
              <div className="p-4">
                <h4 className="text-xs font-black text-slate-950 uppercase tracking-tight mb-1">Renk &amp; Ölçü Denetimi</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">Premium kartvizit ve özel çıkartmaların kutulanmadan hemen önceki son spektrofotometrik renk ve kenar kesim denetimleri.</p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
              <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
                <img 
                  src="/images/kutu/kutu-baski-detayi.webp" 
                  alt="Karton Kutu Ambalaj Şekillendirme Hattı" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] text-white font-bold">Kutu &amp; Ambalaj</div>
              </div>
              <div className="p-4">
                <h4 className="text-xs font-black text-slate-950 uppercase tracking-tight mb-1">Ambalaj Katlama &amp; Kırım</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">E-ticaret ve gıda markaları için ürettiğimiz kilitli kutuların tam otomatik tutkallama, katlama ve hacim verme hattı.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sectors and Recommended Products Table (Resolves Feedback 2) */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
              Sektörel İhtiyaçlar ve Önerilen Baskı Çözümleri
            </h2>
            <div className="w-12 h-1 bg-primary mx-auto mt-3 rounded-full"></div>
            <p className="text-xs md:text-sm text-gray-500 mt-2">
              Hangi sektörde olursanız olun, firmanıza en uygun bütçeli ve en etkili matbaa ürünlerini seçmenize yardımcı oluyoruz.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-4 text-xs font-black text-slate-800 uppercase tracking-wider">Hedef Sektör</th>
                  <th className="p-4 text-xs font-black text-slate-800 uppercase tracking-wider">Önerilen Ürünler (Satış Odaklı Geçiş)</th>
                  <th className="p-4 text-xs font-black text-slate-800 uppercase tracking-wider">Kullanım Amacı ve Sağladığı Fayda</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900">Kurumsal Firmalar &amp; Ofisler</td>
                  <td className="p-4">
                    <Link to="/kartvizit" className="text-primary font-bold hover:underline">Kartvizit Baskı</Link>,{' '}
                    <Link to="/antetli" className="text-primary font-bold hover:underline">Antetli Kağıt</Link>,{' '}
                    <Link to="/dosyalar" className="text-primary font-bold hover:underline">Cepli Dosya</Link>,{' '}
                    <Link to="/bloknotlar" className="text-primary font-bold hover:underline">Bloknot Baskı</Link>
                  </td>
                  <td className="p-4">Marka prestijini ve ciddiyetini yükseltme, resmi yazışmalarda kurumsal kimlik bütünlüğünü sağlama.</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900">E-ticaret &amp; Perakende Satış</td>
                  <td className="p-4">
                    <Link to="/etiket" className="text-primary font-bold hover:underline">Etiket Baskı</Link>,{' '}
                    <Link to="/karton-canta" className="text-primary font-bold hover:underline">Karton Çanta</Link>,{' '}
                    <Link to="/kutu" className="text-primary font-bold hover:underline">Kutu &amp; Ambalaj</Link>
                  </td>
                  <td className="p-4">Eşsiz bir paket açma (unboxing) deneyimi sunarak müşteri sadakati oluşturma ve profesyonel paketleme.</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900">Restoran, Kafe &amp; Oteller</td>
                  <td className="p-4">
                    <Link to="/amerikan-servis" className="text-primary font-bold hover:underline">Amerikan Servis</Link>,{' '}
                    <Link to="/kataloglar" className="text-primary font-bold hover:underline">Menü &amp; Katalog</Link>,{' '}
                    <Link to="/makbuz-ve-formlar" className="text-primary font-bold hover:underline">Otokopili Fiş &amp; Form</Link>,{' '}
                    <Link to="/magnet" className="text-primary font-bold hover:underline">Magnet Baskı</Link>
                  </td>
                  <td className="p-4">Hijyenik masalarda anlık görsel tanıtım yapma, pratik sipariş takibi ve doğrudan evlere ulaşıp sipariş artırma.</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900">Klinik &amp; Sağlık Kuruluşları</td>
                  <td className="p-4">
                    <Link to="/makbuz-ve-formlar" className="text-primary font-bold hover:underline">Reçete &amp; Formlar</Link>,{' '}
                    <Link to="/brosur" className="text-primary font-bold hover:underline">Broşür Baskı</Link>,{' '}
                    <Link to="/kartvizit" className="text-primary font-bold hover:underline">Randevu Kartı</Link>
                  </td>
                  <td className="p-4">Resmi ve pratik hasta muayene takibi, bilgilendirici medikal broşürlerle güven ve uzmanlık hissi aşılama.</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900">Emlak &amp; Danışmanlık</td>
                  <td className="p-4">
                    {/* Fixed 'Afis Baskı' write error to correct Turkish 'Afiş Baskı' (Resolves Feedback 14) */}
                    <Link to="/afis" className="text-primary font-bold hover:underline">Afiş Baskı</Link>,{' '}
                    <Link to="/el-ilani" className="text-primary font-bold hover:underline">El İlanı</Link>,{' '}
                    <Link to="/brosur" className="text-primary font-bold hover:underline">Broşür Baskı</Link>
                  </td>
                  <td className="p-4">Hızlı bölge pazarlaması, ilanların uzak mesafeden dahi kolayca okunmasını sağlayan yüksek kontrastlı açık hava baskıları.</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900">Eğitim Kurumları &amp; Yayınevleri</td>
                  <td className="p-4">
                    <Link to="/kataloglar" className="text-primary font-bold hover:underline">Katalog</Link>,{' '}
                    <Link to="/kup-bloknot" className="text-primary font-bold hover:underline">Küp Bloknot</Link>,{' '}
                    <Link to="/kitap-ayraci" className="text-primary font-bold hover:underline">Kitap Ayracı</Link>,{' '}
                    <Link to="/bloknotlar" className="text-primary font-bold hover:underline">Bloknotlar</Link>
                  </td>
                  <td className="p-4">Marka bilinirliğini artıran promosyonlar, sağlam ciltleme teknikleriyle uzun ömürlü kullanım sunan kitapçıklar.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Corporate Retention Workflow Section (Resolves Feedback 3 - Segmenting Target Customer Groups) */}
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl mt-8">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Briefcase size={16} className="text-primary" /> Kurumsal Cari ve Düzenli Baskı İş Ortaklığı
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Her ay düzenli katalog, ambalaj, broşür, fatura veya matbu evrak siparişi veren iş ortaklarımız için <strong>"Kurumsal Cari Çalışma"</strong> ve <strong>"Yıllık Sabit Fiyat Anlaşması"</strong> modelleri sunuyoruz. Kurumsal müşterilerimize özel atanan grafik sorumlusu ve öncelikli sevkiyat desteğiyle, matbaa tedarik süreçlerinizdeki operasyonel yükü tamamen üzerinizden alıyoruz.
            </p>
            
            <div className="border-t border-slate-200/60 pt-5">
              <span className="text-[11px] font-black text-slate-800 uppercase tracking-wider block mb-3">Bu İş Ortaklığı Modeli Kimler İçin İdealdir?</span>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { name: "Zincir Mağazalar & Marketler", desc: "Düzenli şube el ilanları, insertler ve koli etiketleri için öncelikli sevkiyat." },
                  { name: "Geniş Bayi Ağları", desc: "Tüm bayilerin kurumsal kimlik matbu evraklarının tek merkezden koordinasyonu." },
                  { name: "Üretici ve Sanayiciler", desc: "Ambalaj kutuları, ürün etiketleri ve kullanım kılavuzlarının kesintisiz sevkiyatı." },
                  { name: "Distribütörler & İthalatçılar", desc: "Dönemsel ürün tanıtım katalogları, garanti belgeleri ve lojistik makbuzları." },
                  { name: "Franchise Restoran ve Kafeler", desc: "Logolu Amerikan servis, peçete, broşür, menü ve paket servis poşetleri." },
                  { name: "Profesyonel Reklam Ajansları", desc: "Tüm fason ofset ve dijital işlerde avantajlı fiyatlarla güvenilir fason ortaklığı." }
                ].map((group, idx) => (
                  <div key={idx} className="bg-white border border-slate-200/50 p-3 rounded-xl hover:border-primary/20 transition-all">
                    <span className="font-bold text-slate-900 text-xs block mb-1">{group.name}</span>
                    <span className="text-[10px] text-gray-500 leading-tight block">{group.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Nationwide Anadolu Support Section (Resolves Feedback 4 - High-volume Industrial Regional Cities for Local SEO) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-primary/5 rounded-3xl p-8 border border-primary/10 mb-20">
          <div>
            <span className="text-xs font-black text-primary uppercase tracking-wider mb-2 block">Tüm Türkiye'ye Teslimat</span>
            <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight mb-4">
              Şehir Dışı ve Anadolu Siparişleri Güvence Altında!
            </h2>
            {/* Added high-volume commercial cities naturally, replaced 'profesyonelce yönetilir' with outcome benefit (Resolves Feedback 4, 12) */}
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed space-y-4">
              İstanbul dışından —başta <strong>Ankara, İzmir, Bursa, Gaziantep, Konya, Kayseri, Antalya, Adana, Kocaeli, Denizli ve Eskişehir</strong> olmak üzere Anadolu’nun 81 ilinden— sipariş veren kurumsal müşterilerimiz için tüm süreçler anlık görsel onaylar ve dijital renk prova takibiyle hatasız bir şekilde sonuca ulaştırılır. Böylece mesafeler fark etmeksizin işleriniz tam istediğiniz gibi basılır.
              <br /><br />
              Taşıma esnasında ezilme, yırtılma veya nemlenme yaşanmaması için siparişleriniz çift kat oluklu mukavva korumalı koliler ile paketlenir. Anlaşmalı kargo firmalarımız sayesinde şehir dışı teslimatlar en uzak mesafeye dahi 1 ila 3 iş günü içinde hasarsızlık güvencesiyle ulaştırılır.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-primary/5 shadow-sm space-y-4">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-100 pb-2">
              <Truck size={16} className="text-primary" /> Anadolu Sipariş Yol Haritası
            </h4>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex gap-2.5 items-start">
                <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold text-[10px]">1</div>
                <span>Tasarımınızı bize gönderin veya grafik ekibimizden teknik şablon desteği isteyin.</span>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold text-[10px]">2</div>
                <span>Hazırlanan dijital provayı onaylayın. Renk ve ölçü detaylarını netleştirin.</span>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold text-[10px]">3</div>
                <span>Sıfır komisyonlu aracısız üretim merkezimizde basılan ürünleriniz kargoya verilsin.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cohesive unified section combining: Trust, References, and selection logic (Resolves Feedback 5, 8, 9) */}
        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-10 mb-20 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Left Column: Trust & Reference Relevance (Resolves Feedback 8) */}
            <div className="space-y-4">
              <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-0.5 rounded-full inline-block">Güvenli ve Profesyonel Seçim</span>
              <h3 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight">
                Güçlü Referanslarımız ve Kaliteli Üretim Taahhüdümüz
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Müşteri memnuniyetini en üst düzeyde tutma misyonumuz sayesinde bugüne kadar binlerce marka ve kurumla başarılı iş birliklerine imza attık. Çalıştığımız iş ortaklarımızı, ürettiğimiz kurumsal projeleri ve matbaamızdan teslim aldıkları yüksek standartlı baskıları yerinde görmek isterseniz referanslarımızı inceleyebilirsiniz. Referanslarımız, kaliteli üretim taahhüdümüzün en somut güvencesidir.
              </p>
              <div className="pt-2">
                <Link 
                  to="/referanslar" 
                  className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl hover:bg-primary transition-all shadow-md hover:shadow-lg"
                >
                  <span>Referanslarımızı İnceleyin</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Column: Dynamic Price Selection Logic vs Custom Quote Guide (Resolves Feedback 5) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-gray-100 pb-2">
                <HelpCircle size={16} className="text-primary" /> Hangi Durumda Hangisini Tercih Etmelisiniz?
              </h4>
              
              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <span className="font-extrabold text-slate-900 flex items-center gap-1">
                    <span className="text-emerald-500 font-black">●</span> Ne Zaman Fiyat Listesini İncelemelisiniz?
                  </span>
                  <p className="text-gray-500 leading-relaxed pl-3.5">
                    Standart ölçü, düz kesim ve hazır adetli baskılarda (örn: standart kuşe broşürler, düz kesimli etiketler, klasik cepli dosyalar) bütçe planlaması yapıp doğrudan sipariş vermek için hazır fiyat listemiz en pratik seçenektir.
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="font-extrabold text-slate-900 flex items-center gap-1">
                    <span className="text-primary font-black">●</span> Ne Zaman Özel Fiyat Teklifi Almalısınız?
                  </span>
                  <p className="text-gray-500 leading-relaxed pl-3.5">
                    Özel bıçaklı kesim, kabartma lak, altın/gümüş varak yaldız, dokulu fantezi kağıt kullanımı veya listemizde bulunmayan yüksek tirajlı (adetli) kurumsal projelere özel indirim taleplerinizde WhatsApp veya telefonla anında teklif almalısınız.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <Link 
                  to="/makbuz-ve-formlar" 
                  className="text-primary font-extrabold text-xs uppercase tracking-wide hover:underline inline-flex items-center gap-1"
                >
                  <FileText size={16} /> Güncel Fiyat Listesini İnceleyin <ArrowRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* High-Converting CTA Container (Resolves Feedback 3, 13) */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
          {/* Subtle geometric background overlay for aesthetic pairing */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-40 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="bg-primary/20 text-primary border border-primary/30 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block">
              Hızlı Baskı &amp; Özel Çözümler
            </span>
            <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight mb-4">
              Sipariş Vermeye mi Hazırsınız? Hemen Teklif Alın!
            </h2>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-8">
              Projenize özel ölçü, farklı adet veya spesifik kağıt gramajları için anında en avantajlı fiyat teklifini hazırlayalım. 
              Gerekli tüm şablon hazırlama ve teknik dosya kontrolü işlemleriniz grafik ekibimizce ücretsiz gerçekleştirilir.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-black text-xs md:text-sm uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#1ebd57] transition-all shadow-lg hover:scale-[1.02]"
              >
                <PhoneCall size={18} />
                <span>WhatsApp İle Teklif Al</span>
              </a>
              <a 
                href={PHONE_LINK}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-black text-xs md:text-sm uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-slate-100 transition-all shadow-lg hover:scale-[1.02]"
              >
                <PhoneCall size={18} className="text-primary" />
                <span>Bizi Arayın: {PHONE_NUMBER}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Condensed Legal Disclaimer - Shortened as requested */}
        <div className="mt-16 text-center text-[10px] md:text-11px text-gray-400 max-w-2xl mx-auto border-t border-gray-100 pt-6">
          *Önemli Bilgilendirme: Mavi Basım Matbaa &amp; Reklam firmamızın, "Mavi Basım Yayınevi" ile hiçbir ticari veya kurumsal ilişkisi bulunmamaktadır. Firmamız Zeytinburnu Topkapı’da profesyonel ticari baskı hizmetleri vermektedir.
        </div>
      </div>
    </div>
  );
};

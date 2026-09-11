import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown } from 'lucide-react';

const WHATSAPP_NUMBER = "905366022373";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Merhaba, fiyat teklifi almak ve sipariş başlatmak istiyorum.")}`;

export const SikcaSorulanPage = () => {
  const faqs = [
    {
      q: "Siparişim Ne Kadar Sürede Elime Ulaşır? Üretim Süreci Nasıl Çalışır?",
      a: (
        <div className="space-y-4">
          <p>
            Mavi Basım'dan vereceğiniz tüm siparişler, profesyonel bir endüstriyel üretim hattından geçer. Sürecimiz sırasıyla şu aşamaları kapsar:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <span className="font-extrabold text-xs text-primary uppercase block mb-1">Standart Üretim</span>
              <p className="text-xs text-gray-500 font-medium">
                Sitemizdeki fiyat listelerinde belirtilen süreler ortalama üretim süreleridir. Ofset baskı ürünlerimizde (örneğin Broşür, Magnet veya Zarf) üretim süresi grafik onayınızdan itibaren genellikle <strong>5 ile 7 iş günü</strong> arasındadır.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <span className="font-extrabold text-xs text-primary uppercase block mb-1">Acil Sipariş Talebi</span>
              <p className="text-xs text-gray-500 font-medium">
                Zaman kısıtlaması olan acil etkinlikleriniz veya fuar hazırlıklarınız için <strong>1 - 2 iş gününde</strong> teslim edilen yüksek kaliteli Express Dijital Baskı çözümlerimiz mevcuttur. Acil iş talebinizi sipariş esnasında müşteri temsilcimize belirtmeniz yeterlidir.
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-400">
            Üretim tamamlandığında ürünlerinizi İstanbul Topkapı Matbaacılar Sitesi'ndeki teslimat ofisimizden doğrudan kendiniz alabilir veya 81 il için anlaşmalı kargo kurye ağımızla kapınıza teslim isteyebilirsiniz.
          </p>
          
          <div className="mt-6 pt-4 border-t border-gray-100">
            <span className="block text-xs font-black text-black uppercase mb-2">İlgili Sayfalar</span>
            <div className="flex flex-wrap gap-2">
              <Link to="/blog" className="text-xs bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 px-3 py-1.5 rounded-xl border border-gray-100 font-bold transition-all">Matbaa Baskı Süreçleri ve Teslimat Rehberi</Link>
              <Link to="/iletisim" className="text-xs bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 px-3 py-1.5 rounded-xl border border-gray-100 font-bold transition-all">İletişim &amp; Kargo Sevkiyat Detayları</Link>
              <Link to="/referanslar" className="text-xs bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 px-3 py-1.5 rounded-xl border border-gray-100 font-bold transition-all">Müşteri Referanslarımız</Link>
            </div>
          </div>
        </div>
      )
    },
    {
      q: "Tasarım Hizmeti Veriyor musunuz? Revizyon Sınırı Nedir?",
      a: (
        <div className="space-y-4">
          <p>
            Evet, siparişlerinizin baskıya kusursuz girmesi için profesyonel grafik tasarım desteği sağlıyoruz. Sürecimiz ve kurallarımız şu şekildedir:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-500">
            <li><strong>Revizyon Sınırı:</strong> Taslak tasarım hazırlandıktan sonra, beğeninize göre yazı tipi, renk, yerleşim ve logo boyutlarında <strong>en fazla 3 kez ücretsiz revizyon</strong> hakkınız bulunmaktadır.</li>
            <li><strong>Onay Verilmezse Süreç:</strong> Hazırlanan tasarımlara dijital imza/PDF onayı vermediğiniz sürece işiniz kesinlikle basılmaz. Tasarım aşamasında anlaşma sağlanamazsa, baskı üretime geçmediği için siparişinizi iptal edebilir ve ödemenizi kesintisiz geri alabilirsiniz.</li>
            <li><strong>Tasarım Hazırlama:</strong> Kurumsal logonuzun vektörel formatını (PDF, AI, CDR, SVG) iletmeniz durumunda standart yerleşim tasarımları ücretsizdir.</li>
          </ul>

          <div className="mt-4">
            <span className="block text-xs font-black text-black uppercase mb-3">Tasarım Süreci Karşılaştırması</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
              <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl">
                <span className="font-black text-emerald-800 uppercase block mb-1">Hazır Tasarımı Olanlar</span>
                <ul className="space-y-1 list-disc pl-4 text-emerald-700">
                  <li>Dosya doğrudan kontrol edilir.</li>
                  <li>Kesim payları ve çözünürlük ayarlanır.</li>
                  <li>Doğrudan baskı planına alınır.</li>
                  <li>Hızlı üretim sırasına girer.</li>
                </ul>
              </div>
              <div className="bg-sky-50/50 border border-sky-100 p-4 rounded-2xl">
                <span className="font-black text-sky-800 uppercase block mb-1">Tasarım Desteği İsteyenler</span>
                <ul className="space-y-1 list-disc pl-4 text-sky-700">
                  <li>Logo ve bilgiler ekibimize iletilir.</li>
                  <li>Profesyonel mizanpaj ve taslak hazırlanır.</li>
                  <li>3 kez revizyon ile tasarım netleştirilir.</li>
                  <li>Onayın ardından üretim hattına alınır.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <span className="block text-xs font-black text-black uppercase mb-2">İlgili Sayfalar</span>
            <div className="flex flex-wrap gap-2">
              <Link to="/grafik-tasarim" className="text-xs bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 px-3 py-1.5 rounded-xl border border-gray-100 font-bold transition-all">Grafik Tasarım Kılavuzu &amp; Hizmeti</Link>
              <Link to="/blog" className="text-xs bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 px-3 py-1.5 rounded-xl border border-gray-100 font-bold transition-all">Grafik Tasarım ve Mizanpaj Kuralları</Link>
              <Link to="/referanslar" className="text-xs bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 px-3 py-1.5 rounded-xl border border-gray-100 font-bold transition-all">Tasarım Örnekleri &amp; Referanslar</Link>
            </div>
          </div>
        </div>
      )
    },
    {
      q: "Baskıda Sorun Yaşamamak İçin Hangi Dosya Formatlarını Kabul Ediyorsunuz?",
      a: (
        <div className="space-y-4">
          <p>
            Baskıda piksellenme, renk kayması veya yazı kaybolması gibi sorunların önüne geçebilmek için dosya formatlarına büyük önem veriyoruz. Kabul ettiğimiz formatlar ve dikkat edilmesi gerekenler aşağıda listelenmiştir:
          </p>
          <div className="overflow-x-auto border border-gray-150 rounded-2xl">
            <table className="w-full text-left text-xs font-medium">
              <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3">Format</th>
                  <th className="p-3">Uygunluk</th>
                  <th className="p-3">Dikkat Edilmesi Gerekenler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-500">
                <tr>
                  <td className="p-3 font-bold text-black">PDF (.pdf)</td>
                  <td className="p-3 text-emerald-600 font-bold">En Uygun (Vektörel)</td>
                  <td className="p-3">Tüm fontlar convert edilmeli, CMYK ve minimum 300 DPI olmalıdır.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-black">AI / CDR</td>
                  <td className="p-3 text-emerald-600 font-bold">En Uygun (Vektörel)</td>
                  <td className="p-3">Adobe Illustrator veya CorelDraw dosyalarındaki yazılar çizgiye dönüştürülmelidir.</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-black">TIFF / JPEG</td>
                  <td className="p-3 text-amber-600 font-bold">Orta / Uygun (Pixel)</td>
                  <td className="p-3">Görsel kalitesinin bozulmaması için çözünürlük en az 300 DPI olmalıdır.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400">
            Sistemimiz üzerinden 100 MB'a kadar dosyalarınızı yükleyebilirsiniz. Daha büyük dosyalarınız için WeTransfer veya Google Drive linki iletebilirsiniz.
          </p>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <span className="block text-xs font-black text-black uppercase mb-2">İlgili Sayfalar</span>
            <div className="flex flex-wrap gap-2">
              <Link to="/blog" className="text-xs bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 px-3 py-1.5 rounded-xl border border-gray-100 font-bold transition-all">Baskı Öncesi Dosya Hazırlama ve CMYK Renk Rehberi</Link>
              <Link to="/grafik-tasarim" className="text-xs bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 px-3 py-1.5 rounded-xl border border-gray-100 font-bold transition-all">Grafik Tasarım Kılavuzu &amp; Hizmeti</Link>
            </div>
          </div>
        </div>
      )
    },
    {
      q: "Baskı Öncesi Kontrol ve PDF Prova Süreci Nasıl Çalışır?",
      a: (
        <div className="space-y-3">
          <p>
            Mavi Basım olarak baskı kalitemizi güvenceye almak için çift aşamalı kontrol sistemi uygulamaktayız:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5 text-sm text-gray-500">
            <li><strong>Teknik Kontrol:</strong> Tasarımınızın kesim payları (taşırma payı), CMYK renk uzayı ve görsel çözünürlük değerleri grafik uzmanlarımızca ücretsiz kontrol edilir.</li>
            <li><strong>PDF Prova:</strong> Baskı öncesinde işin bitmiş halini simüle eden dijital bir PDF prova dosyası hazırlanarak tarafınıza gönderilir.</li>
            <li><strong>Yazılı Onay:</strong> Siz "Baskı onayını veriyorum" demediğiniz sürece makinelerimizde üretime başlanmaz. Bu sayede sürpriz hataların önüne geçilir.</li>
          </ol>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <span className="block text-xs font-black text-black uppercase mb-2">İlgili Sayfalar</span>
            <div className="flex flex-wrap gap-2">
              <Link to="/blog" className="text-xs bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 px-3 py-1.5 rounded-xl border border-gray-100 font-bold transition-all">PDF Prova Onay Süreçleri ve Önemi</Link>
              <Link to="/grafik-tasarim" className="text-xs bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 px-3 py-1.5 rounded-xl border border-gray-100 font-bold transition-all">Grafik Tasarım &amp; Kesim Şablonları</Link>
              <Link to="/referanslar" className="text-xs bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 px-3 py-1.5 rounded-xl border border-gray-100 font-bold transition-all">Baskı Kalitesi &amp; Referanslarımız</Link>
            </div>
          </div>
        </div>
      )
    },
    {
      q: "Kargoda Hasar Olursa veya Baskıda Hata Çıkarsa Yeniden Baskı Şartları Nelerdir?",
      a: (
        <div className="space-y-4">
          <p>
            %100 müşteri memnuniyeti garantimiz kapsamında ürettiğimiz her işin arkasındayız:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-500">
            <li><strong>Kargo Hasar Güvencesi:</strong> Ürünleriniz korunaklı çift oluklu karton ambalajlarda gönderilir. Taşıma sırasında kargoda ezilme, yırtılma veya ıslanma gibi bir hasar oluşursa, kargo görevlisine "Hasar Tespit Tutanağı" tutturmanız durumunda işiniz <strong>ücretsiz olarak anında yeniden basılarak</strong> sevk edilir.</li>
            <li><strong>Yeniden Baskı Şartları:</strong> Üretim aşamasından veya kullanılan malzemeden kaynaklı herhangi bir teknik hata (yanlış kesim, aşırı renk sapması, eksik nüsha vb.) tespit edildiğinde, durumu gösteren görselleri iletmeniz yeterlidir. Kusurlu basılan ürünler en hızlı üretim programına dahil edilerek 100% ücretsiz basılır ve adresinize gönderilir.</li>
          </ul>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <span className="block text-xs font-black text-black uppercase mb-2">İlgili Sayfalar</span>
            <div className="flex flex-wrap gap-2">
              <Link to="/blog" className="text-xs bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 px-3 py-1.5 rounded-xl border border-gray-100 font-bold transition-all">Mavi Basım İade ve Yeniden Baskı Koşulları</Link>
              <Link to="/iletisim" className="text-xs bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 px-3 py-1.5 rounded-xl border border-gray-100 font-bold transition-all">Müşteri Destek &amp; İletişim Hattı</Link>
            </div>
          </div>
        </div>
      )
    },
    {
      q: "İstanbul Dışından Sipariş Verebilir miyim? Anadolu Kargo ve Sevkiyat Süreçleri",
      a: (
        <div className="space-y-4">
          <p>
            Evet! İstanbul Topkapı'da yer alan entegre modern üretim tesislerimizde ürettiğimiz tüm broşür, kartvizit, magnet ve kutu gibi matbaa ürünlerini Türkiye'nin 81 iline ve tüm ilçelerine anlaşmalı kargo firmaları ile güvenli ambalajlarda ulaştırmaktayız.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-500">
            <li><strong>Kargo Paketleme Güvenliği:</strong> Ürünlerimiz darbelere, neme ve ezilmelere karşı dayanıklı, çift mukavemetli koruyucu kolilerle sarılarak paketlenir.</li>
            <li><strong>Takip Numarası &amp; Bilgilendirme:</strong> Siparişiniz sevk edildiği anda sistemde kayıtlı telefon numaranıza ve e-postanıza kargo takip numarası ile teslimat bilgilendirme mesajları anlık olarak gönderilir.</li>
            <li><strong>Fatura Gönderimi:</strong> Mavi Basım bünyesinde yapılan her çalışma resmi ve faturalıdır. Sevkiyat yapıldığı gün, adınıza düzenlenmiş %20 KDV'li kurumsal e-Fatura sistemde kayıtlı mail adresinize otomatik olarak ulaştırılır.</li>
            <li><strong>Kurumsal Toplu Üretim:</strong> Türkiye genelindeki kurumsal şubeli zincir markalar veya ajanslar için toplu üretim sözleşmeleri, numune desteği ve indirim baremleri uyguluyoruz.</li>
          </ul>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <span className="block text-xs font-black text-black uppercase mb-2">İlgili Sayfalar</span>
            <div className="flex flex-wrap gap-2">
              <Link to="/blog" className="text-xs bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 px-3 py-1.5 rounded-xl border border-gray-100 font-bold transition-all">Anadolu Kargo ve Sevkiyat Kılavuzu</Link>
              <Link to="/iletisim" className="text-xs bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 px-3 py-1.5 rounded-xl border border-gray-100 font-bold transition-all">İrtibat &amp; İstanbul Adres Detayları</Link>
            </div>
          </div>
        </div>
      )
    },
    {
      q: "Özel Ölçü, Özel Kağıt veya Adet Taleplerinde Süreç Nasıl İşler?",
      a: (
        <div className="space-y-4">
          <p>
            Ürün sayfalarımızda yer alan standart adet ve ölçülerin dışındaki tüm özel talepleriniz için de çözümler sunmaktayız.
          </p>
          <p className="text-sm text-gray-500 font-medium">
            Farklı gramajlı kağıtlar, özel kesimli bıçak uygulamaları, varak yaldız, lak veya gofreli kabartma gibi özel matbaa teknikleri gerektiren projeleriniz için destek ekibimizle görüşerek en avantajlı toptan fiyat tekliflerini anında alabilirsiniz.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mt-4">
            <span className="block text-xs font-black text-black uppercase mb-2">Hazır Ürün vs. Özel Üretim Karşılaştırması</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
              <div className="bg-white p-3 rounded-xl border border-gray-100">
                <span className="text-emerald-700 font-bold uppercase block mb-1">Standart Hazır Ürünler</span>
                <ul className="list-disc pl-4 space-y-1 text-gray-500">
                  <li>Belirli şablon ve ölçülerdedir.</li>
                  <li>Hızlı teslimat imkanı (1-3 iş günü).</li>
                  <li>Pratik ve ekonomik fiyat avantajı.</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-100">
                <span className="text-primary font-bold uppercase block mb-1">Özel Üretim Çözümleri</span>
                <ul className="list-disc pl-4 space-y-1 text-gray-500">
                  <li>Tamamen kurumsal kimliğinize göre ölçülendirilir.</li>
                  <li>Kabartma lak, gofre, varak yaldız gibi ek lüks özellikler.</li>
                  <li>Markanıza özel bıçak ve kalıp hazırlanır.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <span className="block text-xs font-black text-black uppercase mb-2">İlgili Sayfalar</span>
            <div className="flex flex-wrap gap-2">
              <Link to="/blog" className="text-xs bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 px-3 py-1.5 rounded-xl border border-gray-100 font-bold transition-all">Matbaa Kağıt Gramajları ve Özel Baskı Teknikleri</Link>
              <Link to="/kutu" className="text-xs bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 px-3 py-1.5 rounded-xl border border-gray-100 font-bold transition-all">Kutu &amp; Ambalaj Çözümleri</Link>
              <Link to="/etiket" className="text-xs bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 px-3 py-1.5 rounded-xl border border-gray-100 font-bold transition-all">Özel Kesim Etiket Baskı</Link>
              <Link to="/kataloglar" className="text-xs bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 px-3 py-1.5 rounded-xl border border-gray-100 font-bold transition-all">Çok Sayfalı Katalog &amp; Kitapçık</Link>
            </div>
          </div>
        </div>
      )
    },
    {
      q: "Ödememi Nasıl Yapabilirim?",
      a: (
        <div className="space-y-4">
          <p className="text-gray-500 text-sm font-medium leading-relaxed">
            Banka hesap numaralarımıza Havale/EFT yapabilir veya web sitemiz üzerinden 256-bit SSL korumalı 3D Secure güvenli ödeme sistemini kullanarak tüm kredi kartları veya banka kartları ile ödemenizi hızlıca tamamlayabilirsiniz.
          </p>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <span className="block text-xs font-black text-black uppercase mb-2">İlgili Sayfalar</span>
            <div className="flex flex-wrap gap-2">
              <Link to="/blog" className="text-xs bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 px-3 py-1.5 rounded-xl border border-gray-100 font-bold transition-all">Güvenli Ödeme ve Hesap Bilgileri Kılavuzu</Link>
              <Link to="/matbaa" className="text-xs bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 px-3 py-1.5 rounded-xl border border-gray-100 font-bold transition-all">Matbaa Ürün Fiyat Listeleri</Link>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-[#fafafa] min-h-screen pt-8 pb-16 md:pt-12 md:pb-24">
      <Helmet>
        <title>Sıkça Sorulan Sorular | Sipariş ve Teslimat - Mavi Basım</title>
        <meta name="description" content="Sipariş süreçleri, tasarım uyumluluğu, CMYK renk ayarı, ödeme yolları, 81 il kargo gönderimi ve teslimat süreleri hakkında tüm merak edilen soruların yanıtı." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-black text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            Destek Merkezi
          </motion.div>
          
          <h1 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tight mb-4 leading-tight max-w-2xl mx-auto">
            Matbaa Siparişleri Sıkça Sorulan Sorular ve Yardım
          </h1>
          
          <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.3em] max-w-xl mx-auto leading-relaxed">
            <strong>Mavi Basım Matbaa &amp; Reklam</strong> ile ilgili tüm merak ettiklerinize buradan ulaşabilirsiniz.
          </p>
        </div>

        {/* Step-by-Step Flow Section */}
        <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm mb-16">
          <div className="text-center mb-8">
            <span className="text-primary font-black uppercase text-xs tracking-widest block mb-2">HIZLI SÜREÇ</span>
            <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">Siparişiniz Adım Adım Nasıl Hazırlanıyor?</h2>
            <p className="text-gray-400 font-medium text-xs md:text-sm mt-1">Siparişimizi talep anından kapınıza ulaşana kadar titizlikle takip ediyoruz.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 relative">
            {[
              { num: "01", title: "Talep", desc: "Ürün & adet seçimi yapın" },
              { num: "02", title: "Teklif", desc: "Anında net fiyat alın" },
              { num: "03", title: "Tasarım", desc: "Ücretsiz grafik desteği" },
              { num: "04", title: "PDF Onayı", desc: "Baskı öncesi son prova" },
              { num: "05", title: "Baskı", desc: "Topkapı'da yüksek kalite" },
              { num: "06", title: "Kargo", desc: "81 ile kapıya teslimat" }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center relative group">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center font-black text-sm text-gray-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 shadow-sm">
                  {step.num}
                </div>
                <h3 className="font-black text-xs md:text-sm text-black uppercase tracking-wider mt-4 mb-1">{step.title}</h3>
                <p className="text-[10px] md:text-xs text-gray-400 font-semibold leading-relaxed max-w-[120px]">{step.desc}</p>
                
                {/* Horizontal Connector Arrow */}
                {idx < 5 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+2rem)] right-[calc(-50%+2rem)] h-px bg-gray-100 z-0 pointer-events-none" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQs List Section */}
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border border-gray-100 bg-white shadow-sm rounded-3xl p-6 md:p-8 transition-all duration-300"
            >
              <div className="flex items-start gap-4 md:gap-6 mb-6">
                <span className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 text-xs font-black text-primary flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <h3 className="font-black uppercase text-base md:text-lg tracking-tight text-black leading-snug">
                  {faq.q}
                </h3>
              </div>
              <div className="ml-0 md:ml-14">
                <div className="h-px bg-gray-100 mb-6 w-full" />
                <div className="text-gray-500 font-medium leading-relaxed text-sm md:text-base">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Özel Teklif Al CTA */}
        <div className="bg-black text-white rounded-[2.5rem] p-8 md:p-12 my-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-[#00E5FF] font-black text-[10px] uppercase tracking-widest block mb-2">ÖZEL SEÇENEKLER</span>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-3">Listede Olmayan Ölçü veya Adet mi Lazım?</h2>
            <p className="text-xs md:text-sm text-gray-300 font-medium mb-6">Sitede göremediğiniz özel ölçüler, kabartma laklı lüks modeller veya çok yüksek adetli siparişleriniz için ekibimizden dakikalar içinde özel fiyat teklifi alın.</p>

            {/* Özel Ölçü veya Standart Ürün Karşılaştırma Tablosu */}
            <div className="my-8 max-w-xl mx-auto overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-xs">
              <div className="grid grid-cols-3 bg-white/10 text-white font-black p-3 border-b border-white/10 text-[9px] uppercase tracking-wider text-left">
                <div className="pl-1">Özellik</div>
                <div className="text-[#00E5FF]">Standart Ürün (Kategori)</div>
                <div className="text-amber-400">Özel Üretim (Teklif Al)</div>
              </div>
              <div className="divide-y divide-white/5 text-gray-300 font-medium text-left">
                <div className="grid grid-cols-3 p-3 hover:bg-white/5">
                  <div className="font-bold text-white pl-1">Ölçü &amp; Kesim</div>
                  <div>Sitedeki standart boyutlar</div>
                  <div>İstediğiniz milimetrik özel ölçü</div>
                </div>
                <div className="grid grid-cols-3 p-3 hover:bg-white/5">
                  <div className="font-bold text-white pl-1">Ek İşlemler</div>
                  <div>Düz kesim, selefon kaplama</div>
                  <div>Kabartma lak, gofre, altın varak</div>
                </div>
                <div className="grid grid-cols-3 p-3 hover:bg-white/5">
                  <div className="font-bold text-white pl-1">Süre &amp; Bütçe</div>
                  <div>En ekonomik fiyat, hızlı sevkiyat</div>
                  <div>Özel kalıp &amp; bıçak hazırlık süreci</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <a 
                href={WHATSAPP_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#0ea5e9] text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#0284c7] hover:scale-105 transition-all shadow-lg"
              >
                Hemen Teklif Al
              </a>
              <Link 
                to="/" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black hover:scale-105 transition-all shadow-lg"
              >
                Standart Ürünleri İncele
              </Link>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="block text-gray-400 text-[10px] font-black uppercase tracking-wider mb-3">Veya Standart Ürünleri Seçin:</span>
              <div className="flex flex-wrap justify-center gap-2">
                <Link to="/kartvizit" className="text-[11px] bg-white/5 hover:bg-white/10 text-gray-200 px-3 py-1.5 rounded-xl border border-white/10 font-bold transition-all">Kartvizit Baskı</Link>
                <Link to="/brosur" className="text-[11px] bg-white/5 hover:bg-white/10 text-gray-200 px-3 py-1.5 rounded-xl border border-white/10 font-bold transition-all">Broşür Baskı</Link>
                <Link to="/magnet" className="text-[11px] bg-white/5 hover:bg-white/10 text-gray-200 px-3 py-1.5 rounded-xl border border-white/10 font-bold transition-all">Magnet Baskı</Link>
                <Link to="/etiket" className="text-[11px] bg-white/5 hover:bg-white/10 text-gray-200 px-3 py-1.5 rounded-xl border border-white/10 font-bold transition-all">Etiket Baskı</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Fiyat Listesine Yönlendiren CTA */}
        <div className="mt-12 mb-16 text-center">
          <div className="bg-primary/5 border border-primary/25 rounded-[2.5rem] p-8 md:p-12 max-w-3xl mx-auto">
            <span className="inline-block bg-primary text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-3">Güncel Fiyat Listeleri</span>
            <h3 className="text-lg md:text-xl font-black text-black uppercase tracking-tight mb-2">Hemen Baskı Fiyatlarımızı İnceleyin</h3>
            <p className="text-xs md:text-sm text-gray-500 font-semibold mb-6 max-w-lg mx-auto">Kartvizit, broşür, magnet ve tüm tanıtım ürünlerindeki en güncel fiyat listelerimizi kategoriler halinde anında inceleyin.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/matbaa" className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-black text-xs uppercase tracking-widest rounded-full hover:bg-secondary hover:scale-105 transition-all shadow-md shadow-primary/20">
                Fiyat Listelerini Gör
              </Link>
            </div>
          </div>
        </div>

        {/* Güven Oluşturan Üretim Bilgileri */}
        <div className="mt-20 mb-16">
          <div className="text-center mb-10">
            <span className="text-[#00E5FF] font-black uppercase text-xs tracking-widest block mb-2">KALİTE STANDARTLARIMIZ</span>
            <h2 className="text-2xl font-black text-black uppercase tracking-tight">Üretim Güvencemiz ve Teknik Standartlar</h2>
            <p className="text-gray-400 font-semibold text-xs md:text-sm mt-1">Sürpriz sonuçlara yer yok. Her aşamada kurumsal denetim ve kalite güvencesi.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Topkapı Üretim Tesisi",
                desc: "İstanbul Topkapı Matbaacılar Sitesi'ndeki yüksek teknolojili Heidelberg ofset ve çok renkli dijital baskı parkurumuzda aracısız, doğrudan imalat."
              },
              {
                step: "02",
                title: "Resmi Kurumsal Fatura",
                desc: "Mavi Basım bünyesinde yapılan her çalışma resmi ve faturalıdır. Sektörel mevzuat gereği %20 KDV eklenerek e-Fatura sistem üzerinden iletilir."
              },
              {
                step: "03",
                title: "Minimum Sipariş Güvencesi",
                desc: "Sitemizde belirtilen adetler üretim verimliliği açısından en ekonomik minimum limitlerdir. Kurumsal gereksinimlerinize uygun ölçekte sipariş verilebilir."
              },
              {
                step: "04",
                title: "Yazılı PDF Prova Onayı",
                desc: "Makineler üretime girmeden önce, işin son halini gösteren PDF prova onayı yazılı/mesajlı olarak sizden alınır. Onayınız olmadan baskıya başlanmaz."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-[2rem] p-6 hover:shadow-lg transition-all duration-300">
                <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary text-[11px] font-black rounded-lg mb-4">
                  {item.step}
                </span>
                <h3 className="font-black text-xs text-black uppercase tracking-wider mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Minimum Sipariş Adetleri Tablosu */}
          <div className="bg-white border border-gray-100 rounded-[2rem] p-6 md:p-8 mt-8 shadow-sm">
            <h3 className="font-black text-sm text-black uppercase tracking-wider mb-2 text-center">Ürün Gruplarına Göre Minimum Sipariş Limitleri</h3>
            <p className="text-center text-gray-400 text-xs font-semibold mb-6 max-w-md mx-auto">Ürün adına veya İncele bağlantısına tıklayarak kategoriye gidebilir, detaylı fiyat listelerimizi karşılaştırabilirsiniz.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium">
                <thead className="bg-gray-50 text-gray-400 uppercase text-[9px] tracking-wider">
                  <tr>
                    <th className="p-3 pl-4">Ürün Grubu</th>
                    <th className="p-3">Ekonomik Minimum Sipariş</th>
                    <th className="p-3">Öne Çıkan Özellikler</th>
                    <th className="p-3 text-right pr-4">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-500">
                  {[
                    { name: "Kartvizit Baskı", min: "1.000 Adet", specs: "Standart / Laklı / Kabartma Laklı Seçenekler", path: "/kartvizit" },
                    { name: "Broşür & El İlanı", min: "1.000 / 2.000 Adet", specs: "Kuşe Kağıt, Parlak Selefon veya Katlamalı", path: "/brosur" },
                    { name: "Magnet Baskı", min: "1.000 Adet", specs: "Düz Kesim veya Özel Oval Bıçaklı", path: "/magnet" },
                    { name: "Etiket Baskı", min: "1.000 Adet", specs: "Kuşe Yapışkanlı veya Şeffaf PVC Etiket", path: "/etiket" },
                    { name: "Cepli Dosya", min: "500 Adet", specs: "350 gr. Parlak Selefonlu, Cepli İç Tasarım", path: "/dosyalar" },
                    { name: "Katalog & Kitapçık", min: "500 Adet", specs: "Tel Dikiş Ciltli, Çok Sayfalı Tasarım", path: "/kataloglar" },
                    { name: "Kutu & Ambalaj", min: "500 Adet", specs: "Gıdaya Uygun veya Kilitli Mukavva Kutu", path: "/kutu" },
                    { name: "Makbuz & Formlar", min: "5 Cilt (Defter)", specs: "Numaratörlü, Kendinden Karbonlu (Otokopili)", path: "/makbuz-ve-formlar" },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="p-3 pl-4 font-bold text-black hover:text-primary transition-colors">
                        <Link to={row.path}>{row.name}</Link>
                      </td>
                      <td className="p-3 font-semibold text-primary">{row.min}</td>
                      <td className="p-3 text-xs">{row.specs}</td>
                      <td className="p-3 text-right pr-4">
                        <Link to={row.path} className="inline-block bg-primary/5 hover:bg-primary hover:text-white text-[10px] text-primary font-black px-3 py-1.5 rounded-lg border border-primary/10 transition-all uppercase tracking-tight">İncele</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Yerel SEO Üretim Açıklaması İlişkilendirmesi */}
          <div className="bg-gray-50 border border-gray-100 rounded-[2rem] p-6 md:p-8 mt-8 text-center">
            <p className="text-xs text-gray-500 font-semibold leading-relaxed max-w-4xl mx-auto">
              <strong>İstanbul'da Profesyonel Üretim, Tüm Türkiye'ye Hızlı Sevkiyat:</strong> Modern baskı merkezimiz <strong>İstanbul Topkapı'da</strong> yer almaktadır. Gelişmiş üretim teknolojilerimiz ve uzman kadromuzla ürettiğimiz tüm matbaa ürünlerimizi, korunaklı ambalajlarında anlaşmalı kargo ağımız sayesinde <strong>Türkiye'nin 81 iline kapıya teslim</strong> gönderiyoruz. Nerede olursanız olun, başta <strong>Ankara, İzmir, Bursa, Gaziantep, Konya, Kayseri, Antalya, Adana, Kocaeli, Denizli, Eskişehir</strong> gibi büyük ticaret şehirleri olmak üzere tüm Türkiye geneline hızlı kargo ile ulaştırıyoruz. Topkapı kalitesine ve en uygun aracısız üretici fiyatlarına tek tıkla ulaşabilirsiniz!
            </p>
          </div>
        </div>

        {/* Karar Verme Bloğu: SSS -> Ürün Seçimi -> Fiyat -> Sipariş */}
        <div className="bg-gradient-to-r from-slate-50 to-gray-100 rounded-[2.5rem] p-8 md:p-12 border border-slate-200/60 my-16 text-center max-w-4xl mx-auto shadow-sm">
          <span className="text-primary font-black uppercase text-[10px] tracking-widest block mb-2">YARDIMCI SİPARİŞ REHBERİ</span>
          <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight mb-6">Bilinçli ve Hızlı Sipariş Akışımız</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-stretch text-left">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-black rounded-lg mb-3">ADIM 01</span>
                <span className="font-extrabold text-xs text-slate-800 uppercase block mb-1">SSS İnceleme</span>
                <p className="text-[11px] text-gray-500 leading-relaxed">Merak ettiğiniz tüm teknik ve lojistik soruların yanıtlarını buradan okudunuz.</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary text-xs font-black rounded-lg mb-3">ADIM 02</span>
                <span className="font-extrabold text-xs text-slate-800 uppercase block mb-1">Ürün Seçimi</span>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-2">İhtiyacınıza en uygun baskı ürün grubunu seçin.</p>
                <Link to="/matbaa" className="text-[11px] text-primary hover:underline font-bold inline-flex items-center gap-1">Matbaa Ürünlerini Gör <span>→</span></Link>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-black rounded-lg mb-3">ADIM 03</span>
                <span className="font-extrabold text-xs text-slate-800 uppercase block mb-1">Net Fiyatlandırma</span>
                <p className="text-[11px] text-gray-500 leading-relaxed">Seçtiğiniz kategori altındaki şeffaf adet/fiyat listelerimizi karşılaştırın.</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 bg-sky-50 text-sky-700 text-xs font-black rounded-lg mb-3">ADIM 04</span>
                <span className="font-extrabold text-xs text-slate-800 uppercase block mb-1">Sipariş &amp; Üretim</span>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-2">WhatsApp üzerinden dosyanızı gönderip aracısız üretimi hemen başlatın.</p>
                <a href={WHATSAPP_LINK} className="text-[11px] text-emerald-600 hover:underline font-bold inline-flex items-center gap-1">WhatsApp'tan Yazın <span>→</span></a>
              </div>
            </div>
          </div>
        </div>

        {/* Hala Sorularınız mı Var & Sipariş Vermeye Yönlendiren CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 relative overflow-hidden bg-black rounded-[40px] p-10 md:p-16 text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-[100px] -ml-32 -mb-32" />
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-4">
              Hala Sorularınız mı Var?
            </h2>
            <p className="text-gray-400 mb-10 font-bold uppercase text-xs tracking-widest">
              Uzman destek ekibimiz ve tasarımcılarımız her adımda siparişinizi başlatmak için hazır bekliyor.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a 
                href={WHATSAPP_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-primary text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-secondary hover:scale-105 transition-all shadow-lg shadow-primary/20"
              >
                WhatsApp Sipariş Başlat
              </a>
              <Link 
                to="/" 
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-black hover:scale-105 transition-all shadow-lg"
              >
                Ürün Seçin &amp; Fiyatları İnceleyin
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 max-w-2xl mx-auto">
              <span className="block text-white text-[10px] font-black uppercase tracking-widest mb-4">Hızlı Ürün Kategorileri &amp; Fiyat Listeleri</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Link to="/kartvizit" className="text-xs bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white p-3 rounded-2xl border border-white/5 font-black transition-all uppercase tracking-tight">Kartvizit</Link>
                <Link to="/brosur" className="text-xs bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white p-3 rounded-2xl border border-white/5 font-black transition-all uppercase tracking-tight">Broşür</Link>
                <Link to="/magnet" className="text-xs bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white p-3 rounded-2xl border border-white/5 font-black transition-all uppercase tracking-tight">Magnet</Link>
                <Link to="/etiket" className="text-xs bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white p-3 rounded-2xl border border-white/5 font-black transition-all uppercase tracking-tight">Etiket</Link>
                <Link to="/dosyalar" className="text-xs bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white p-3 rounded-2xl border border-white/5 font-black transition-all uppercase tracking-tight">Cepli Dosya</Link>
                <Link to="/kataloglar" className="text-xs bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white p-3 rounded-2xl border border-white/5 font-black transition-all uppercase tracking-tight">Katalog</Link>
                <Link to="/kutu" className="text-xs bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white p-3 rounded-2xl border border-white/5 font-black transition-all uppercase tracking-tight">Kutu Baskı</Link>
                <Link to="/makbuz-ve-formlar" className="text-xs bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white p-3 rounded-2xl border border-white/5 font-black transition-all uppercase tracking-tight">Makbuz &amp; Form</Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

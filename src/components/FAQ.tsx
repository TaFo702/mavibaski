import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  Truck, 
  Settings, 
  User, 
  ShieldCheck, 
  Printer, 
  ShoppingCart, 
  ChevronDown 
} from 'lucide-react';

const WHATSAPP_NUMBER = "905366022373";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Merhaba, fiyat teklifi almak istiyorum.")}`;

export const SikcaSorulanPage = () => {
  const faqs = [
    {
      q: "Siparişim Ne Kadar Sürede Elime Ulaşır - Ofisten Teslim Alabilir miyim?",
      a: "Teslimat süresi üründen ürüne farklılık göstermektedir. Ürün sayfalarındaki açıklamalarda belirtilen süreler 'üretim süresi'dir. Üretim tamamlandıktan sonra siparişinizi Zeytinburnu Topkapı'daki ofisimizden teslim alabilir veya kargo ile gönderimini talep edebilirsiniz.",
      icon: <Truck size={20} />
    },
    {
      q: "Tasarım Hizmeti Veriyor musunuz? Ya Memnun Kalmazsam?",
      a: "<strong>Mavi Basım Matbaa & Reklam</strong> olarak profesyonel tasarım desteği sunuyoruz. Tasarım ücretleri ürün bazlı değişmekte olup sipariş sırasında belirtilmektedir. Tasarım sürecinde 3 revize hakkınız bulunmaktadır. Ayrıca yakında aktif olacak 'Kendin Tasarla' modülümüz ile tasarımlarınızı sitemiz üzerinden ücretsiz yapabileceksiniz.",
      icon: <Settings size={20} />
    },
    {
      q: "Tasarım Hizmeti İçin Hangi Bilgileri Vermem Gerekiyor?",
      a: "Logonuzun vektörel formatını (PDF, AI, CDR) ve basılmasını istediğiniz adres, telefon gibi bilgileri iletmeniz yeterlidir. Vektörel logonuz yoksa, yüksek çözünürlüklü bir görselini gönderirseniz ek ücretle yeniden çizebiliriz.",
      icon: <User size={20} />
    },
    {
      q: "Baskı Öncesi Tasarım Kontrolü Yapıyor musunuz?",
      a: "Evet, gönderdiğiniz tüm çalışmalar kesim payı, çözünürlük ve yerleşim açısından ücretsiz kontrol edilir. Bir hata tespit edilirse size bilgi verilerek düzeltilmesi istenir. Onayınız alınmadan baskıya geçilmez.",
      icon: <ShieldCheck size={20} />
    },
    {
      q: "Baskıda Sorun Yaşamamak İçin Tasarımı Nasıl Göndermeliyim?",
      a: "Çalışmalarınızı CMYK renk formatında ve 300 DPI çözünürlükte hazırlamalısınız. Efekt kullandıysanız (gölge, transparanlık vb.) bunları görsele çevirmeniz renk sapmalarını önleyecektir.",
      icon: <Printer size={20} />
    },
    {
      q: "Hangi Dosya Formatlarını Kabul Ediyorsunuz?",
      a: "PDF, CDR, AI, PNG, JPEG ve TIFF formatlarını kabul ediyoruz. 100 MB'a kadar olan dosyaları sitemizden yükleyebilir, daha büyük dosyalar için WeTransfer linki iletebilirsiniz.",
      icon: <ShoppingCart size={20} />
    },
    {
      q: "İstediğim Adet veya Ürün Listede Yoksa Ne Yapmalıyım?",
      a: "Sitede görmediğiniz adetler veya özel ürünler için WhatsApp hattımızdan veya mail yoluyla bizimle iletişime geçebilirsiniz. Müşteri temsilcilerimiz size özel fiyatlandırma yapacaktır.",
      icon: <img src="/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
    },
    {
      q: "Ürünüm Hatalı veya Yanlış Basılmışsa Süreç Nasıl İşler?",
      a: "Müşteri memnuniyeti önceliğimizdir. Bizden kaynaklı bir hata durumunda, görsellerle birlikte bize bilgi vermeniz halinde işiniz ücretsiz olarak yeniden basılarak programımıza dahil edilir.",
      icon: <ShieldCheck size={20} />
    },
    {
      q: "Kargo Ücretli mi? Ne Kadar Ödemem Gerekiyor?",
      a: "Gönderimlerimizi anlaşmalı kargomuz ile 'karşı ödemeli' (alıcı ödemeli) olarak yapmaktayız. Kargo ücreti ürünün ağırlığına ve mesafeye göre değişmektedir.",
      icon: <Truck size={20} />
    },
    {
      q: "Ödememi Nasıl Yapabilirim?",
      a: "Havale/EFT veya sitemiz üzerinden 3D Secure güvenli ödeme sistemi ile kredi kartı/banka kartı kullanarak ödemenizi gerçekleştirebilirsiniz.",
      icon: <ShoppingCart size={20} />
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-[#fafafa] min-h-screen pt-8 pb-16 md:pt-12 md:pb-24">
      <Helmet>
        <title>Sıkça Sorulan Sorular | Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa</title>
        <meta name="description" content="Mavi Basım Matbaa & Reklam matbaa hizmetleri, sipariş süreci, tasarım desteği ve teslimat hakkında en çok merak edilen soruların cevapları." />
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
          <h1 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter mb-4 leading-none">
            Sıkça Sorulan <span className="text-primary">Sorular</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.3em] max-w-xl mx-auto">
            <strong>Mavi Basım Matbaa & Reklam</strong> ile ilgili tüm merak ettiklerinize buradan ulaşabilirsiniz.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div 
                key={idx} 
                initial={false}
                animate={{ 
                  backgroundColor: isOpen ? "#ffffff" : "#ffffff",
                  scale: isOpen ? 1.02 : 1
                }}
                className={`border ${isOpen ? 'border-primary/30 shadow-xl shadow-primary/5' : 'border-gray-100 shadow-sm'} rounded-3xl overflow-hidden transition-all duration-300`}
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors"
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400'}`}>
                      {faq.icon}
                    </div>
                    <span className={`font-black uppercase text-sm md:text-lg tracking-tight transition-colors ${isOpen ? 'text-black' : 'text-gray-600'}`}>
                      {faq.q}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className={`${isOpen ? 'text-primary' : 'text-gray-300'} shrink-0 ml-4`}
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8 md:pb-10 ml-0 md:ml-16">
                        <div className="h-px bg-gray-100 mb-6 w-full" />
                        <p className="text-gray-500 font-medium leading-relaxed text-sm md:text-base">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 relative overflow-hidden bg-black rounded-[40px] p-10 md:p-16 text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-[100px] -ml-32 -mb-32" />
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">
              Hala Sorularınız mı Var?
            </h3>
            <p className="text-gray-400 mb-10 font-bold uppercase text-xs tracking-widest">
              Ekibimiz size yardımcı olmak için burada.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a 
                href={WHATSAPP_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-primary text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-secondary hover:scale-105 transition-all shadow-lg shadow-primary/20"
              >
                <img src="/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
                WhatsApp Destek Hattı
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

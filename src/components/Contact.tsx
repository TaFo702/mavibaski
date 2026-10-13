import React from 'react';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { PHONE_NUMBER, PHONE_LINK, WHATSAPP_LINK, ADDRESS } from '../constants/contact';

export const IletisimPage = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>İletişim ve Fiyat Teklifi | Zeytinburnu - Mavi Basım</title>
        <meta name="description" content="Zeytinburnu Topkapı 2. Matbaacılar Sitesi dükkan adresimiz, telefon numaramız, e-posta ve WhatsApp fiyat teklifi hattımız. Detaylı yol haritası ve konum." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter mb-6">
            Mavi Basım İletişim, Konum ve Fiyat Teklifi Bilgileri
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-black font-medium max-w-2xl mx-auto">
            Sorularınız, fiyat teklifleri veya projeleriniz için bizimle iletişime geçebilirsiniz.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Phone size={32} />
              </div>
              <h2 className="text-xl font-bold text-primary mb-2">Telefon</h2>
              <p className="text-black font-medium mb-4">Hafta içi: 09:00 - 19:00</p>
              <a href={PHONE_LINK} className="text-primary font-black text-xl hover:underline">
                {PHONE_NUMBER}
              </a>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-green-500/10 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                <img src="/WhatsApp.svg" alt="WhatsApp" className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-green-600 mb-2">WhatsApp</h2>
              <p className="text-black font-medium mb-4">Hızlı fiyat teklifi için</p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-green-600 font-black text-xl hover:underline">
                {PHONE_NUMBER}
              </a>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Mail size={32} />
              </div>
              <h2 className="text-xl font-bold text-primary mb-2">E-posta</h2>
              <p className="text-black font-medium mb-4">7/24 yazabilirsiniz</p>
              <div className="flex flex-col gap-2">
                <a href="mailto:mavibasimonline@gmail.com" className="text-primary font-black text-lg hover:underline">
                  mavibasimonline@gmail.com
                </a>
                <a href="mailto:info@mavibasim.com" className="text-primary font-black text-lg hover:underline">
                  info@mavibasim.com
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 md:p-12 rounded-[40px] border border-gray-100">
            <div className="flex flex-col gap-10">
              {/* Header Section: Title */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#e1f5fe] text-primary rounded-full flex items-center justify-center shrink-0">
                  <MapPin size={28} />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-tight">Adres ve Departman Bilgilerimiz</h2>
                  <p className="text-xs md:text-sm text-slate-500 font-bold mt-1">Sipariş, tasarım ve üretim süreçleriniz için ilgili birimlerimiz:</p>
                </div>
              </div>

              {/* 3 Distinct Department Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Satış Ofisi */}
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3">
                  <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                    SATIŞ OFİSİ
                  </div>
                  <h3 className="text-base font-black text-slate-900 uppercase">Müşteri Görüşmeleri &amp; Sipariş Danışmanlığı</h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Sipariş öncesi fiyat teklifleri, ürün seçimleri ve kurumsal anlaşmalar için satış ekibimiz hizmetinizdedir.
                  </p>
                  <div className="pt-2 border-t border-gray-100 space-y-1 text-xs font-bold text-slate-800">
                    <div>📞 Tel: <a href={PHONE_LINK} className="text-primary hover:underline">{PHONE_NUMBER}</a></div>
                    <div>✉️ E-posta: <a href="mailto:info@mavibasim.com" className="text-primary hover:underline">info@mavibasim.com</a></div>
                  </div>
                </div>

                {/* 2. Grafik Tasarım Ofisi */}
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3">
                  <div className="inline-block bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                    GRAFİK TASARIM OFİSİ
                  </div>
                  <h3 className="text-base font-black text-slate-900 uppercase">Tasarım Desteği &amp; Baskı Öncesi Hazırlık</h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Dosya kontrolü, taşırma payları, renk kalibrasyonu (CMYK) ve ücretsiz dijital PDF prova onay işlemleri.
                  </p>
                  <div className="pt-2 border-t border-gray-100 space-y-1 text-xs font-bold text-slate-800">
                    <div>💬 WhatsApp: <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">{PHONE_NUMBER}</a></div>
                    <div>✉️ E-posta: <a href="mailto:mavibasimonline@gmail.com" className="text-primary hover:underline">mavibasimonline@gmail.com</a></div>
                  </div>
                </div>

                {/* 3. Üretim Tesisi */}
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3">
                  <div className="inline-block bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                    ÜRETİM TESİSİ
                  </div>
                  <h3 className="text-base font-black text-slate-900 uppercase">Topkapı Matbaacılar Sitesi</h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    Baskı üretimi, kesim, selefon, kırım, ciltleme, ambalaj paketleme ve Türkiye geneli kargo hazırlığı.
                  </p>
                  <div className="pt-2 border-t border-gray-100 space-y-1 text-xs font-bold text-slate-800">
                    <div>📍 Adres: {ADDRESS}</div>
                  </div>
                </div>
              </div>

              {/* Button Section */}
              <div>
                <a 
                  href="https://www.google.com/maps/place/2.Matbaac%C4%B1lar+Sitesi/@41.0236937,28.9187786,3a,51.3y,352.99h,103.6t/data=!3m7!1e1!3m5!1sRYiQ_iivkjBRKj3EDSHdeQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-13.59532873188705%26panoid%3DRYiQ_iivkjBRKj3EDSHdeQ%26yaw%3D352.98972298407017!7i16384!8i8192!4m6!3m5!1s0x14cabca4f6550031:0x2c2e120875705a27!8m2!3d41.0244134!4d28.9185197!16s%2Fg%2F11r8bwb1f?entry=ttu&g_ep=EgoyMDI2MDMzMS4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                >
                  Haritada Görüntüle <ChevronRight size={20} />
                </a>
              </div>

              {/* Content Section: Image and Map side by side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-[32px] overflow-hidden border border-gray-200 shadow-md h-[320px]">
                  <a 
                    href="https://www.google.com/maps/place/2.Matbaac%C4%B1lar+Sitesi/@41.0236937,28.9187786,3a,67.6y,4.92h,104.2t/data=!3m7!1e1!3m5!1sRYiQ_iivkjBRKj3EDSHdeQ!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D-14.198131347571916%26panoid%3DRYiQ_iivkjBRKj3EDSHdeQ%26yaw%3D4.923939501701568!7i16384!8i8192!4m7!3m6!1s0x14cabca4f6550031:0x2c2e120875705a27!8m2!3d41.0244134!4d28.9185197!10e5!16s%2Fg%2F11r8bwb1f?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block h-full hover:opacity-95 transition-opacity"
                  >
                    <img 
                      src="https://streetviewpixels-pa.googleapis.com/v1/thumbnail?cb_client=maps_sv.tactile&w=1200&h=800&pitch=-14.198131347571916&panoid=RYiQ_iivkjBRKj3EDSHdeQ&yaw=4.923939501701568" 
                      alt="Mavi Basım Matbaa & Reklam Giriş" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </a>
                </div>
                <div className="rounded-[32px] overflow-hidden border border-gray-200 shadow-md h-[320px]">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.518!2d28.9175434!3d41.0246024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabb8bf13e4f21%3A0x6f7152e1b85729f3!2sMavi%20Bas%C4%B1m%20Matbaa%20ve%20Reklam!5e0!3m2!1str!2str!4v1712140000000!5m2!1str!2str" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

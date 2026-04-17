import React from 'react';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { PHONE_NUMBER, PHONE_LINK, WHATSAPP_LINK, ADDRESS } from '../constants/contact';

export const IletisimPage = () => {
  return (
    <div className="bg-white min-h-screen pb-20">
      <Helmet>
        <title>İletişim | Mavi Basım Matbaa &amp; Reklam | En Uygun Fiyatlı Online Matbaa</title>
        <meta name="description" content="Mavi Basım Matbaa & Reklam ile iletişime geçin. İstanbul Zeytinburnu Topkapı 2. Matbaacılar Sitesi'ndeki adresimiz, telefon numaramız ve WhatsApp hattımız üzerinden fiyat teklifi alabilirsiniz." />
      </Helmet>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter mb-6">
            İletişim
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
                <a href="mailto:info@mavibasim.com" className="text-primary font-black text-lg hover:underline">
                  info@mavibasim.com
                </a>
                <a href="mailto:mavibasimonline@gmail.com" className="text-primary font-black text-lg hover:underline">
                  mavibasimonline@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 md:p-12 rounded-[40px] border border-gray-100">
            <div className="flex flex-col gap-10">
              {/* Header Section: Icon, Title, Address */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#e1f5fe] text-primary rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={28} />
                  </div>
                  <h2 className="text-3xl font-black text-primary uppercase tracking-tight">Adresimiz</h2>
                </div>
                <p className="text-lg text-gray-800 font-semibold leading-relaxed whitespace-pre-line">
                  {ADDRESS}
                </p>
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
                    href="https://www.google.com/maps/place/2.Matbaac%C4%B1lar+Sitesi/@41.0245828,28.9184887,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgIDksoH9vQE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAHVAweqJPA1MAXmxi0IYY_4WmKyIMiBpYNdpmfpzHo7F7lhU86iyjfd8lF1t_6BABNI8_abPkskRBZ07XOw1WrjId-Q-7Hw8o9i5dJYIZl0GtZv3hNsgtPaCZtOGINzXiJIz5rryCtJvgg%3Dw203-h114-k-no!7i1920!8i1080!4m7!3m6!1s0x14cabca4f6550031:0x2c2e120875705a27!8m2!3d41.0244134!4d28.9185197!10e5!16s%2Fg%2F11r8bwb1f?entry=ttu&g_ep=EgoyMDI2MDMzMS4wIKXMDSoASAFQAw%3D%3D" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block h-full hover:opacity-95 transition-opacity"
                  >
                    <img 
                      src="https://lh3.googleusercontent.com/gps-cs-s/AHVAweqJPA1MAXmxi0IYY_4WmKyIMiBpYNdpmfpzHo7F7lhU86iyjfd8lF1t_6BABNI8_abPkskRBZ07XOw1WrjId-Q-7Hw8o9i5dJYIZl0GtZv3hNsgtPaCZtOGINzXiJIz5rryCtJvgg=w1000-h600-k-no" 
                      alt="Mavi Basım Matbaa & Reklam" 
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

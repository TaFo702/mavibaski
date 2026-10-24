import React from 'react';
import { WHATSAPP_NUMBER } from '../constants/contact';

const message = 'Merhaba, Kayseri için 440 gr vinil branda emlakçı afişi fiyat teklifi almak istiyorum.\nEn × boy (cm):\nAdet:\nSatılık / kiralık:\nKuşgözü ve kenar işlemi:\nHazır tasarım durumu:\nTeslimat ilçesi:\nPlanlanan üretim tarihi:';

export function KayseriBrandaQuote() {
  return (
    <section id="branda-teklif" aria-labelledby="branda-teklif-baslik" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-10 scroll-mt-36">
      <div className="rounded-2xl border-2 border-primary bg-white p-6 sm:p-8">
        <h2 id="branda-teklif-baslik" className="text-2xl font-black text-neutral-900 mb-3">440 gr Branda Afiş İçin Fiyat Teklifi</h2>
        <p className="text-neutral-700 leading-relaxed mb-5">Satılık ve kiralık branda afişin fiyatı; ölçü, adet, tasarım sayısı ve istenen kenar işlemlerine göre hazırlanır. En × boy ölçüsünü, adedi ve Kayseri’deki teslimat ilçesini paylaşın; fiyatı ve üretim planını birlikte netleştirelim.</p>
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-neutral-50 rounded-xl p-4"><dt className="font-bold">Malzeme</dt><dd className="mt-1 text-neutral-700">440 gr vinil branda</dd></div>
          <div className="bg-neutral-50 rounded-xl p-4"><dt className="font-bold">Üretim planı</dt><dd className="mt-1 text-neutral-700">Yaklaşık 3 gün; uygun işlerde 1 gün de mümkün. Tarih teklif aşamasında teyit edilir.</dd></div>
          <div className="bg-neutral-50 rounded-xl p-4"><dt className="font-bold">Kargo</dt><dd className="mt-1 text-neutral-700">Üretim sonrası Kayseri’ye gönderim planlanır. Kargo teslim süresi ayrıca değerlendirilir.</dd></div>
        </dl>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">WhatsApp’tan Branda Afiş Teklifi Al</a>
      </div>
    </section>
  );
}

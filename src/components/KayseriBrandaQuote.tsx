import React from 'react';
import { WHATSAPP_NUMBER } from '../constants/contact';
import { KAYSERI_AFIS_PRICES } from '../data/kayseriAfisPrices';

const message = 'Merhaba, Kayseri için 440 gr vinil branda emlakçı afişi fiyat teklifi almak istiyorum.\nEn × boy (cm):\nAdet:\nSatılık / kiralık:\nKuşgözü ve kenar işlemi:\nHazır tasarım durumu:\nTeslimat ilçesi:\nPlanlanan üretim tarihi:';

export function KayseriBrandaQuote() {
  return (
    <section id="branda-teklif" aria-labelledby="branda-teklif-baslik" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-10 scroll-mt-36">
      <div className="rounded-2xl border-2 border-primary bg-white p-6 sm:p-8">
        <h2 id="branda-teklif-baslik" className="text-2xl font-black text-neutral-900 mb-3">Branda ve Selefonlu Folyo Afiş Fiyatları</h2>
        <p className="text-neutral-700 leading-relaxed mb-5">Satılık ve kiralık emlak ilanlarınız için selefonlu folyo ve 440 gr vinil branda seçeneklerini ölçü ve adetleriyle karşılaştırın. Farklı ölçü, adet veya kenar işlemleri için siparişinize özel teklif alın.</p>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 mb-4">
          <table data-kayseri-afis-prices className="block w-full text-left text-sm sm:table">
            <caption className="sr-only">Kayseri emlakçı afişi için bir adet selefonlu folyo ve vinil branda fiyatları</caption>
            <thead className="hidden bg-neutral-900 text-white sm:table-header-group"><tr><th scope="col" className="p-3">Ürün</th><th scope="col" className="p-3">Ölçü</th><th scope="col" className="p-3">Adet</th><th scope="col" className="p-3">Fiyat</th><th scope="col" className="p-3"><span className="sr-only">Sipariş</span></th></tr></thead>
            <tbody className="block sm:table-row-group">{KAYSERI_AFIS_PRICES.map(item => (
              <tr key={item.id} data-afis-offer={item.id} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-2 border-t border-neutral-200 p-4 text-left align-top even:bg-neutral-50 first:border-t-0 sm:table-row sm:p-0 sm:first:border-t">
                <th scope="row" className="col-span-2 font-semibold sm:p-3">{item.product}</th>
                <td className="col-start-1 row-start-2 sm:p-3"><span className="sr-only sm:hidden">Ölçü: </span>{item.size}</td><td className="col-start-1 row-start-3 self-center whitespace-nowrap sm:p-3">{item.quantity} adet</td>
                <td className="col-start-2 row-start-2 whitespace-nowrap font-black text-base sm:p-3"><span className="sr-only sm:hidden">Fiyat: </span>{item.price.toLocaleString('tr-TR')} TL</td>
                <td className="col-start-2 row-start-3 sm:p-3"><a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Merhaba, Kayseri için ${item.size} ${item.product}, ${item.quantity} adet ${item.price} TL örneği hakkında sipariş bilgisi almak istiyorum. KDV, kargo ve kenar işlemlerinin kapsamını da paylaşır mısınız?`)}`} target="_blank" rel="noopener noreferrer" aria-label={`${item.size} ${item.product} sipariş bilgisi al`} className="inline-flex min-h-11 items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 font-bold text-white hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">Bilgi Al</a></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <p className="text-sm text-neutral-600 mb-6">Fiyatlar belirtilen ürün, ölçü ve bir adet baskı içindir. KDV, kargo ve kuşgözü/kenar işlemlerinin fiyata dahil olup olmadığı sipariş öncesinde teyit edilir. Folyo ve vinil branda farklı malzemelerdir.</p>
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-neutral-50 rounded-xl p-4"><dt className="font-bold">Malzeme</dt><dd className="mt-1 text-neutral-700">440 gr vinil branda</dd></div>
          <div className="bg-neutral-50 rounded-xl p-4"><dt className="font-bold">Üretim planı</dt><dd className="mt-1 text-neutral-700">Yaklaşık 3 gün; uygun işlerde 1 gün de mümkün. Tarih teklif aşamasında teyit edilir.</dd></div>
          <div className="bg-neutral-50 rounded-xl p-4"><dt className="font-bold">Kargo</dt><dd className="mt-1 text-neutral-700">Üretim sonrası Kayseri’ye gönderim planlanır. Kargo teslim süresi ayrıca değerlendirilir.</dd></div>
        </dl>
        <a data-branda-custom-quote href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">Farklı Ölçü İçin Branda Afiş Teklifi Al</a>
      </div>
    </section>
  );
}

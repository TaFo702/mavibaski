import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { CityPriceExample } from '../data/cityPriceExamples';

export const CityImagePriceTable: React.FC<{ examples: readonly CityPriceExample[] }> = ({ examples }) => (
  <section id="ornek-fiyatlar" data-price-layout="image-table" aria-labelledby="price-examples-title" className="mt-7 pt-6 border-t border-slate-200 scroll-mt-24">
    <h2 id="price-examples-title" className="text-xl md:text-2xl font-black text-[#101828] mb-3">Örnek Baskı Fiyatları</h2>
    <p className="text-sm text-slate-600 mb-5">Ürünleri görselleri, baskı özellikleri ve toplam sipariş bedelleriyle karşılaştırın. Diğer seçeneklere ürünün fiyat listesinden ulaşabilirsiniz.</p>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {examples.map(example => <article key={example.path} data-price-example={example.item.code} className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white flex flex-col">
        <img src={example.image} alt={`${example.name} baskı örneği`} width={800} height={533} decoding="async" className="w-full aspect-[800/533] object-contain bg-white" />
        <h3 className="bg-[#101828] text-white text-base font-black px-4 py-3">{example.name} Baskı</h3>
        <table className="w-full text-sm text-[#101828] border-collapse table-fixed">
          <caption className="sr-only">{example.name} örnek baskı fiyatı ve sipariş özellikleri</caption>
          <colgroup><col className="w-[84px]" /><col /></colgroup>
          <tbody>
            <tr className="border-b border-slate-100"><th scope="row" className="text-left p-3 font-semibold bg-[#fcfcfd]">Kod</th><td className="p-3 font-bold text-[#29addf]">{example.item.code}</td></tr>
            <tr className="border-b border-slate-100"><th scope="row" className="text-left align-top p-3 font-semibold bg-[#fcfcfd]">Özellik</th><td className="p-3 align-top h-28 leading-relaxed break-words">{example.item.ebat ? <span className="block font-semibold mb-1">{example.item.ebat}</span> : null}{example.item.desc}</td></tr>
            <tr className="border-b border-slate-100"><th scope="row" className="text-left p-3 font-semibold bg-[#fcfcfd]">Adet</th><td className="p-3 font-bold">{example.quantity}</td></tr>
            <tr><th scope="row" className="text-left p-3 font-semibold bg-[#fcfcfd]">Fiyat</th><td className="p-3 bg-[#fcfcfd]"><span className="block text-xs text-slate-600 mb-1">Toplam baskı bedeli</span><strong className="text-2xl font-black">{example.item.price}</strong></td></tr>
          </tbody>
        </table>
        <div className="p-4 mt-auto border-t border-slate-100">
          <a href={example.path} aria-label={`${example.name} fiyat listesini incele`} className="inline-flex items-center justify-center gap-2 w-full min-h-11 rounded-xl bg-[#29addf] px-4 py-3 text-white font-bold text-sm hover:bg-[#168cb8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#101828]">Fiyat Listesini İncele<ChevronRight size={16} /></a>
        </div>
      </article>)}
    </div>
    <p className="text-xs text-slate-600 mt-4">Ürün görselleri örnektir. Fiyatlar belirtilen adet ve baskı özelliklerine aittir; gönderim planı sipariş sırasında netleştirilir.</p>
  </section>
);

import { Link } from 'react-router-dom';

const formUses = [
  {
    title: 'Müşteri Sipariş Formu',
    text: 'Müşteri adı, iletişim bilgileri ve sipariş tarihi aynı kayıtta tutulur. Form doldurulurken ürün veya hizmet ayrıntıları, müşterinin istediği özellikler ve sipariş notları yazılır. Numaratör, müşteriye verilen nüsha ile işletmede kalan kaydın eşleştirilmesini kolaylaştırır.',
  },
  {
    title: 'Ürün Sipariş Formu',
    text: 'Ürün kodu, model, miktar ve birim bilgileri sipariş satırlarına yerleştirilir. Sipariş üretime veya hazırlık birimine aktarılırken renk, ölçü ve benzeri seçenekler açıklama alanında belirtilebilir. Böylece siparişi hazırlayan ekip müşteriyle kaydedilen ayrıntıları aynı form üzerinden takip edebilir.',
  },
  {
    title: 'Satış Sipariş Formu',
    text: 'Birim fiyat, toplam tutar, kapora, kalan ödeme ve planlanan teslim tarihi siparişle birlikte kaydedilebilir. Bu alanların bir arada bulunması, satış ekibinin sipariş koşullarını ve sonraki işlemleri takip etmesine yardımcı olur. Alan düzeni işletmenizin kullandığı sipariş akışına göre hazırlanır.',
  },
];

export function SiparisFisiFormGuide() {
  return (
    <div className="space-y-8">
      <section id="siparis-formu-baski" aria-labelledby="siparis-formu-baski-baslik" className="scroll-mt-24 border-t border-gray-100 pt-8 space-y-4">
        <h2 id="siparis-formu-baski-baslik" className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
          Firmaya Özel Sipariş Formu Baskısı
        </h2>
        <p className="text-sm md:text-base leading-relaxed text-slate-700">
          Sipariş formu baskısı, müşteriden alınan siparişin işletmenizin kullandığı alanlarla basılı bir kayda dönüştürülmesidir. Bu sayfadaki otokopili sipariş fişi; müşteri, ürün veya satış sipariş formu olarak düzenlenebilir. Firma logosu, iletişim bilgileri ve sipariş alanları baskı öncesinde hazırlanan PDF prova üzerinde birlikte kontrol edilir.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {formUses.map((use) => (
            <div key={use.title} className="rounded-2xl border border-gray-200 bg-gray-50 p-5 space-y-2">
              <h3 className="text-sm md:text-base font-bold text-slate-900">{use.title}</h3>
              <p className="text-sm leading-relaxed text-slate-700">{use.text}</p>
            </div>
          ))}
        </div>
        <p className="text-sm md:text-base leading-relaxed text-slate-700">
          Sipariş kâğıdı üzerindeki alanları belirlerken hangi bilgilerin müşteride, satışta ve siparişi hazırlayan ekipte bulunacağını düşünün. Mevcut formunuzu veya Word/Excel taslağınızı paylaşarak bu alanların baskı düzenine aktarılmasını isteyebilirsiniz. Bu hizmet, firma bilgilerinize göre hazırlanan basılı koçan baskısıdır.
        </p>
        <p className="text-sm md:text-base leading-relaxed text-slate-700">
          Matbaa sipariş formu hazırlığı için ölçü, nüsha, cilt adedi ve kullanacağınız alanları iletin. <a href="#fiyat-tablosu" className="font-bold text-primary underline">Sipariş fişi baskı fiyatlarını</a> mevcut tablodan inceleyebilir, aynı sayfadaki sipariş seçenekleriyle talebinizi oluşturabilirsiniz.
        </p>
      </section>

      <section id="siparis-fisi-ebat-secimi" aria-labelledby="siparis-fisi-ebat-baslik" className="scroll-mt-24 border-t border-gray-100 pt-8 space-y-4">
        <h2 id="siparis-fisi-ebat-baslik" className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
          Sipariş Fişinde 14 × 20 cm ve A5 Ölçü Ayrımı
        </h2>
        <p className="text-sm md:text-base leading-relaxed text-slate-700">
          A5 sipariş fişi ararken ölçüyü santimetre olarak belirtmeniz önemlidir. Bu sayfanın fiyat tablosundaki standart ürün <strong>14 × 20 cm</strong> yarım boydur. ISO A5 ölçüsü <strong>14,8 × 21 cm</strong> olduğundan iki ölçü aynı değildir. Standart ölçünün A5 boyuna yakın olması, tablodaki ürünün tam A5 olduğu anlamına gelmez.
        </p>
        <p className="text-sm md:text-base leading-relaxed text-slate-700">
          Kullanacağınız satır sayısını, yazı alanını ve mevcut formunuzun ölçüsünü sipariş öncesinde paylaşın. Fiyat tablosu dışındaki özel ölçü taleplerinin uygunluğu ve teklifi ayrıca değerlendirilir.
        </p>
      </section>

      <p className="text-sm md:text-base leading-relaxed text-slate-700">
        Farklı bir kayıt belgesi arıyorsanız <Link to="/makbuz-ve-formlar" className="font-bold text-primary underline">otokopili form ve makbuz çeşitlerini</Link> karşılaştırabilirsiniz. Restoran ve kafe siparişleri için <Link to="/adisyon" className="font-bold text-primary underline">adisyon baskı seçenekleri</Link> ayrı ürün sayfasında yer alır.
      </p>
    </div>
  );
}

export function MakbuzFormSelectionGuide() {
  return (
    <section id="otokopili-form-secimi" aria-labelledby="otokopili-form-secimi-baslik" className="mt-12 border-t border-gray-200 pt-8 space-y-4">
      <h2 id="otokopili-form-secimi-baslik" className="text-xl md:text-2xl font-bold text-slate-900">
        Otokopili Form Baskısında Hangi Ürünü Seçmelisiniz?
      </h2>
      <p className="text-sm sm:text-base leading-relaxed text-slate-700">
        Otokopili form, üst nüshaya yazılan bilgilerin alt suretlere aktarılmasını sağlayan basılı kayıt formudur. Seçim yaparken belgenin hangi işlem için kullanılacağını, bilgi alanlarını, nüsha sayısını ve ölçüsünü birlikte belirleyin. Logo ve alan düzeniyle ilgili taleplerinizi baskı öncesinde PDF prova üzerinden kontrol edebilirsiniz.
      </p>
      <ul className="space-y-3 text-sm sm:text-base leading-relaxed text-slate-700">
        <li>Müşteri, ürün ve satış siparişlerini kaydetmek için <Link to="/siparis-fisi" className="font-bold text-primary underline">otokopili sipariş formu baskısını</Link> inceleyin.</li>
        <li>Restoran ve kafe sipariş akışı için <Link to="/adisyon" className="font-bold text-primary underline">adisyon fişi baskı seçeneklerini</Link> karşılaştırın.</li>
        <li>Alınan ödemeleri kaydetmek için <Link to="/tahsilat-makbuzu" className="font-bold text-primary underline">tahsilat makbuzu</Link>, yapılan ödemelerin kaydı için <Link to="/tediye-makbuzu" className="font-bold text-primary underline">tediye makbuzu</Link> ürünlerini inceleyin.</li>
      </ul>
    </section>
  );
}

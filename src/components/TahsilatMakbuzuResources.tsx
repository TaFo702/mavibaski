import React from 'react';
import { Link } from 'react-router-dom';

const sampleFiles = [
  { format: 'PDF', extension: 'pdf', description: 'Yazdırılabilir boş örnek' },
  { format: 'Word', extension: 'docx', description: 'Düzenlenebilir DOCX şablonu' },
  { format: 'Excel', extension: 'xlsx', description: 'Düzenlenebilir XLSX şablonu' },
];

export function TahsilatMakbuzuResources() {
  return (
    <div className="space-y-8 mt-8">
      <section id="tahsilat-ornek-dosyalari" aria-labelledby="tahsilat-ornek-dosyalari-baslik" className="scroll-mt-24 border-t border-gray-200 pt-8 space-y-4">
        <h2 id="tahsilat-ornek-dosyalari-baslik" className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
          Tahsilat Makbuzu Örneği PDF, Word ve Excel
        </h2>
        <p className="text-sm md:text-base leading-relaxed text-slate-700">
          Boş tahsilat makbuzu örneğini PDF olarak yazdırabilir, Word veya Excel dosyasındaki alanları firmanızın kullanımına göre düzenleyebilirsiniz. Örneklerde firma bilgileri, tarih, makbuz numarası, ödemeyi yapan, tahsilat tutarı, ödeme türü, açıklama ve imza alanları bulunur.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {sampleFiles.map((file) => (
            <a key={file.extension} href={`/downloads/tahsilat-makbuzu-ornegi.${file.extension}`} download className="flex min-h-11 flex-col justify-center rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <span className="font-bold text-slate-900">Tahsilat makbuzu {file.format} örneği indir</span>
              <span className="mt-1 text-sm text-slate-600">{file.description}</span>
            </a>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-slate-700">
          Dosyalar A4 sayfada hazırlanmış genel amaçlı düzenleme örnekleridir. Logolu ve otokopili koçan baskısı için seçtiğiniz ölçü, nüsha ve numaratör bilgilerine göre ayrıca PDF prova hazırlanır. Dijital onay alınmadan baskıya başlanmaz. <a href="#fiyat-tablosu" className="font-bold text-primary underline">Tahsilat makbuzu baskı fiyatlarını</a> mevcut tablodan inceleyebilirsiniz.
        </p>
      </section>

      <section id="cek-senet-tahsilat-bilgileri" aria-labelledby="cek-senet-tahsilat-baslik" className="scroll-mt-24 border-t border-gray-200 pt-8 space-y-4">
        <h2 id="cek-senet-tahsilat-baslik" className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
          Çek ve Senet İçin Tahsilat Makbuzu Bilgi Alanları
        </h2>
        <p className="text-sm md:text-base leading-relaxed text-slate-700">
          Çek tahsilat makbuzu örneği veya senet teslimine ilişkin bir kayıt hazırlarken, nakit ödeme ile çek ya da senet teslimini açıklamada ayrı belirtmek kayıt takibini kolaylaştırır. Belge numarası, vade tarihi, tutar ve gerekiyorsa banka/şube bilgileri için tasarımda ek alanlar ayrılabilir. Çek veya senedin teslim alınması ile bedelinin tahsil edilmesi farklı işlemler olduğundan açıklama alanını gerçekleşen işleme göre doldurun.
        </p>
        <p className="text-sm md:text-base leading-relaxed text-slate-700">
          İndirilebilir boş örneklerde isteğe bağlı çek/senet bilgileri için alan bulunur. Kullandığınız belge örneğini paylaşarak firma logonuzun, cari hesap veya belge takip alanlarınızın koçan tasarımına eklenmesini isteyebilirsiniz.
        </p>
      </section>

      <section id="sehir-disindan-tahsilat-siparisi" aria-labelledby="sehir-disindan-tahsilat-baslik" className="scroll-mt-24 border-t border-gray-200 pt-8 space-y-4">
        <h2 id="sehir-disindan-tahsilat-baslik" className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
          Ankara ve Diğer İllerden Tahsilat Makbuzu Siparişi
        </h2>
        <p className="text-sm md:text-base leading-relaxed text-slate-700">
          Ankara’dan tahsilat makbuzu baskı siparişi vermek için firma bilgilerinizi, logonuzu, cilt adedini, nüsha seçimini ve teslimat adresinizi WhatsApp üzerinden iletebilirsiniz. Siparişler İstanbul Topkapı 2. Matbaacılar Sitesi hizmet ve koordinasyon noktamız üzerinden alınır; Türkiye geneline kargo ile gönderim sağlanır.
        </p>
        <p className="text-sm md:text-base leading-relaxed text-slate-700">
          Baskı öncesinde tasarımınızı uzaktan PDF prova ile kontrol edebilirsiniz. Üretim ve teslim süresi ürün, adet, malzeme ve onay sürecine göre teklif aşamasında paylaşılır. Farklı matbu evrak ihtiyaçlarınız için <Link to="/makbuz-ve-formlar" className="font-bold text-primary underline">makbuz ve form baskı çeşitlerini</Link> inceleyebilirsiniz.
        </p>
      </section>
    </div>
  );
}

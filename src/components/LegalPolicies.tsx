import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Truck, RefreshCw, Scale } from 'lucide-react';

export type PolicyType = 'privacy' | 'cookies' | 'delivery' | 'refund' | 'terms';

interface LegalModalProps {
  type: PolicyType | null;
  onClose: () => void;
}

export const LEGAL_POLICIES_DATA: Record<PolicyType, { title: string; icon: React.ReactNode; content: React.ReactNode }> = {
  privacy: {
    title: "Gizlilik Politikası",
    icon: <ShieldCheck className="text-primary" size={24} />,
    content: (
      <div className="space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
        <p>
          <strong>Mavi Basım Matbaa &amp; Reklam</strong> ("Mavi Basım") olarak, kullanıcılarımızın ve müşterilerimizin kişisel verilerinin korunmasına ve gizliliğine büyük önem veriyoruz. Bu politika, mavibasim.com web sitemiz ve online sipariş kanallarımız üzerinden toplanan verilerin nasıl işlendiğini açıklamaktadır.
        </p>
        <h4 className="font-black text-slate-900 uppercase">1. Toplanan Bilgiler</h4>
        <p>
          Sipariş ve teklif süreçlerinde ad, soyad, telefon numarası, e-posta adresi, teslimat adresi ve kurumsal fatura bilgileri gibi müşteri verileri toplanmaktadır. Grafik tasarım dosyalarınız üçüncü şahıslarla kesinlikle paylaşılmaz.
        </p>
        <h4 className="font-black text-slate-900 uppercase">2. Verilerin Kullanım Amacı</h4>
        <p>
          Toplanan veriler yalnızca siparişlerin üretilmesi, faturalandırılması, kargolanması ve müşteri hizmetleri desteği sunulması amacıyla kullanılır.
        </p>
        <h4 className="font-black text-slate-900 uppercase">3. Veri Güvenliği</h4>
        <p>
          Mavi Basım, verilerinizi yetkisiz erişim, kayıp veya suiistimale karşı korumak için endüstri standardı güvenlik önlemlerini ve SSL şifreleme protokollerini uygular.
        </p>
      </div>
    )
  },
  cookies: {
    title: "Çerez Politikası",
    icon: <FileText className="text-primary" size={24} />,
    content: (
      <div className="space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
        <p>
          Mavi Basım web sitesinde kullanıcı deneyimini iyileştirmek, site trafiğini analiz etmek ve tercihlerinizi hatırlamak amacıyla çerezler (cookies) kullanılmaktadır.
        </p>
        <h4 className="font-black text-slate-900 uppercase">1. Çerez Türleri</h4>
        <p>
          Sitemizde zorunlu çerezler (sepet ve oturum yönetimi için), performans çerezleri (ziyaretçi analizi için) ve işlevsel çerezler kullanılmaktadır.
        </p>
        <h4 className="font-black text-slate-900 uppercase">2. Çerez Tercihlerinizin Yönetimi</h4>
        <p>
          Tarayıcı ayarlarınız üzerinden çerezleri dilediğiniz zaman engelleyebilir veya silebilirsiniz. Ancak zorunlu çerezlerin kapatılması sitenin bazı işlevlerini kısıtlayabilir.
        </p>
      </div>
    )
  },
  delivery: {
    title: "Teslimat Şartları",
    icon: <Truck className="text-primary" size={24} />,
    content: (
      <div className="space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
        <p>
          Mavi Basım, İstanbul Topkapı'daki entegre fabrikasından Türkiye'nin 81 iline anlaşmalı hızlı kargo ve kurye ağımızla teslimat gerçekleştirmektedir.
        </p>
        <h4 className="font-black text-slate-900 uppercase">1. Üretim ve Teslim Süreleri</h4>
        <p>
          Siparişlerinizin üretimi, dijital PDF prova onayınız alındıktan ve ödeme teyidi sağlandıktan sonra başlar. Standart ürünlerimizin üretim süresi ortalama 3–4 iş günüdür. Özel işçilikli (lak, gofre, bıçaklı kesim) ürünlerde üretim süresi değişiklik gösterebilir.
        </p>
        <h4 className="font-black text-slate-900 uppercase">2. Acil Teslimat İmkanı</h4>
        <p>
          Uygun ürün gruplarında ve üretim planına bağlı olarak acil teslimat seçeneği sunulmaktadır. Acil teslimat talebiniz varsa sipariş öncesinde bizimle iletişime geçerek uygunluk durumu hakkında bilgi alabilirsiniz.
        </p>
        <h4 className="font-black text-slate-900 uppercase">3. Kargo ve Hasarsız Paketleme</h4>
        <p>
          Tüm basılı ürünleriniz neme, bükülmeye ve basınca dayanıklı çift oluklu koruyucu kolilerde özenle ambalajlanarak kargoya teslim edilir.
        </p>
      </div>
    )
  },
  refund: {
    title: "İptal ve İade Koşulları",
    icon: <RefreshCw className="text-primary" size={24} />,
    content: (
      <div className="space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
        <p>
          Mavi Basım'da üretilen ürünlerin tamamı müşterinin şahsi veya kurumsal talepleri doğrultusunda özel olarak kişiselleştirilip basılmaktadır.
        </p>
        <h4 className="font-black text-slate-900 uppercase">1. Sipariş İptali</h4>
        <p>
          Henüz baskı aşamasına geçmemiş, PDF prova onayı verilmemiş siparişlerinizi dilediğiniz zaman ücretsiz iptal edebilirsiniz. Baskıya giren siparişlerde malzeme ve işçilik giderleri sebebiyle iptal yapılamamaktadır.
        </p>
        <h4 className="font-black text-slate-900 uppercase">2. Baskı Hataları ve Yeniden Baskı Garantisi</h4>
        <p>
          Firmamız kaynaklı imalat hatası, eksik baskı veya kargo hasarı durumunda; ürün görseli ile beyanda bulunulması halinde siparişiniz öncelikli olarak ücretsiz yeniden basılarak adresinize sevk edilir.
        </p>
      </div>
    )
  },
  terms: {
    title: "Mesafeli Satış Sözleşmesi",
    icon: <Scale className="text-primary" size={24} />,
    content: (
      <div className="space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
        <p>
          İşbu sözleşme, Mavi Basım Matbaa &amp; Reklam ("Satıcı") ile mavibasim.com üzerinden sipariş veren Alıcı arasındaki mesafeli sipariş şartlarını düzenler.
        </p>
        <h4 className="font-black text-slate-900 uppercase">1. Sözleşmenin Konusu</h4>
        <p>
          Alıcı'nın Satıcı'ya ait web sitesi üzerinden elektronik ortamda siparişini verdiği nitelikleri ve satış fiyatı belirtilen basılı matbaa ürünlerinin satışı ve teslimidir.
        </p>
        <h4 className="font-black text-slate-900 uppercase">2. Cayma Hakkı İstisnası</h4>
        <p>
          6502 sayılı Tüketicinin Korunması Hakkında Kanun uyarınca, tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan (özel basımlı) mallarda cayma hakkı kullanılamaz.
        </p>
      </div>
    )
  }
};

export const LegalPolicyModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;
  const policy = LEGAL_POLICIES_DATA[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 relative shadow-2xl max-h-[85vh] flex flex-col border border-gray-100">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center justify-center transition-colors"
          aria-label="Kapat"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
            {policy.icon}
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight">
              {policy.title}
            </h3>
            <p className="text-xs text-slate-500 font-bold">Mavi Basım Matbaa &amp; Reklam Yasal Bilgilendirme</p>
          </div>
        </div>

        <div className="overflow-y-auto pr-2 flex-1">
          {policy.content}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-primary hover:bg-primary/90 text-white font-black text-xs uppercase px-6 py-3 rounded-xl transition-all shadow-md"
          >
            Anladım, Kapat
          </button>
        </div>
      </div>
    </div>
  );
};

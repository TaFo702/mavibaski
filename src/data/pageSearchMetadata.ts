// Search copy shared by the first HTML response and client-side routes.
// Keep commercial claims grounded in the existing page; prices live elsewhere.
export interface SearchMetadata {
  title: string;
  desc: string;
}

export const PAGE_SEARCH_METADATA: Record<string, SearchMetadata> = {
  "/": {
    "title": "Online Matbaa ve Baskı Fiyatları | Mavi Basım",
    "desc": "Kartvizit, broşür, katalog, etiket, kutu ve makbuz baskı fiyatlarını inceleyin. Türkiye geneline kargo ve PDF prova ile online matbaa siparişi için teklif alın."
  },
  "/sozlesme-baski": {
    "title": "Sözleşme Baskı Fiyatları | Otokopili Sözleşme Koçanı",
    "desc": "Logolu, numaratörlü otokopili sözleşme baskı fiyatlarını inceleyin. 20,5 x 28,5 cm, 2–4 nüsha ve koçan seçenekleri için PDF prova onayıyla hemen teklif alın."
  },
  "/adisyon": {
    "title": "Adisyon Fişi Baskı Fiyatları | Numaratörlü Koçan",
    "desc": "Restoran, kafe ve lokantalar için logolu, otokopili ve numaratörlü adisyon fişi baskısı. Cilt ve nüsha seçenekleriyle fiyatları inceleyin, hemen teklif alın."
  },
  "/sigorta-policeleri": {
    "title": "Sigorta Poliçesi ve Teklif Formu Baskısı | Mavi Basım",
    "desc": "Sigorta acenteleri için firma logolu, otokopili ve numaratörlü poliçe ve teklif formu baskısı. Koçan ve nüsha seçeneklerini inceleyin, WhatsApp’tan teklif alın."
  },
  "/arac-kiralama": {
    "title": "Araç Kiralama Sözleşmesi Baskı | Rent A Car Formu",
    "desc": "Rent a car firmaları için otokopili, numaratörlü araç kiralama sözleşmesi, teslim tutanağı ve hasar tespit formu baskısı. Seçenekleri inceleyin, teklif alın."
  },
  "/gider-makbuzu": {
    "title": "Gider Makbuzu Baskı Fiyatları | Otokopili Koçan",
    "desc": "Logolu, otokopili ve numaratörlü gider makbuzu baskı fiyatlarını inceleyin. Cilt ve nüsha seçeneklerini inceleyin, PDF prova onayıyla WhatsApp’tan teklif alın."
  },
  "/giris-bileti": {
    "title": "Giriş Bileti Baskı Fiyatları | Numaratörlü Bilet",
    "desc": "Konser, tiyatro ve etkinlikler için logolu, numaratörlü ve perforeli giriş bileti baskısı. Koçan seçeneklerini ve fiyatları inceleyin, WhatsApp’tan teklif alın."
  },
  "/kataloglar": {
    "title": "Katalog Baskı Fiyatları | A4, A5 ve Cilt Seçenekleri",
    "desc": "A4 ve A5 katalog baskı fiyatlarını inceleyin. Ürün kataloğu ve dergi için sayfa sayısı, kâğıt, tel dikiş veya Amerikan cilt seçenekleriyle hemen teklif alın."
  },
  "/karton-canta": {
    "title": "Karton Çanta Baskı Fiyatları | Logolu İpli Çanta",
    "desc": "Logolu, ipli karton çanta baskı fiyatlarını inceleyin. 210 gr Amerikan Bristol, mat veya parlak selefon, ebat ve adet seçenekleri için WhatsApp’tan teklif alın."
  },
  "/kitap-ayraci": {
    "title": "Kitap Ayracı Baskı Fiyatları | Logolu ve Püsküllü",
    "desc": "Yayınevi, okul ve markalar için logolu, 350 gr kuşe kitap ayracı baskısı. Selefon ve püskül seçeneklerini, ebat ve adet bilgilerini inceleyin; teklif alın."
  },
  "/yag-karti": {
    "title": "Yağ Değişim Kartı Baskı Fiyatları | Logolu Yağ Kartı",
    "desc": "Oto servisler için logolu yağ değişim ve bakım takip kartı baskısı. 350 gr kuşe veya 700 gr sıvama seçeneklerini, ebat ve adetleri inceleyin; hemen teklif alın."
  },
  "/makbuz-ve-formlar": {
    "title": "Makbuz ve Form Baskı Fiyatları | Otokopili Koçanlar",
    "desc": "Adisyon, sipariş fişi, tahsilat ve tediye makbuzu ile matbu form baskı fiyatlarını inceleyin. Otokopili, numaratörlü cilt ve nüsha seçenekleri için teklif alın."
  },
  "/siparis-fisi-baski-fiyatlari": {
    "title": "Sipariş Fişi Fiyatları | Otokopili Cilt ve Nüsha Seçimi",
    "desc": "Otokopili sipariş fişi baskı fiyatlarını cilt, nüsha, ebat ve numaratör seçeneklerine göre inceleyin. Firma logolu koçan siparişi için WhatsApp’tan teklif alın."
  },
  "/cilt-isleri": {
    "title": "Cilt İşleri ve Mücellit Hizmetleri | Mavi Basım",
    "desc": "Katalog, dergi ve kurumsal baskılar için tel dikiş, Amerikan cilt, iplik dikiş, sert kapak ve spiral seçeneklerini inceleyin. Ciltleme işiniz için teklif alın."
  },
  "/makine-parkuru": {
    "title": "Matbaa Makine Parkuru | Baskı ve Ciltleme Süreçleri",
    "desc": "Ofset ve dijital baskı, kesim, katlama ve ciltleme süreçlerini inceleyin. Matbaa işinize uygun baskı ve mücellit seçenekleri için Mavi Basım’dan bilgi alın."
  },
  "/matbaa": {
    "title": "Mavi Basım Matbaa | Topkapı Baskı Hizmetleri",
    "desc": "Mavi Basım’ın İstanbul Topkapı hizmet ve koordinasyon noktasını, matbaa ürünlerini ve sipariş sürecini tanıyın. Baskı ihtiyaçlarınız için hemen teklif alın."
  },
  "/sikca-sorulan": {
    "title": "Matbaa Siparişi Sıkça Sorulan Sorular | Mavi Basım",
    "desc": "Matbaa siparişi, PDF prova onayı, ödeme, üretim firesi, adet toleransları ve kargo hakkında soruların yanıtlarını inceleyin. Sipariş için bilgi ve teklif alın."
  },
  "/blog": {
    "title": "Matbaa ve Baskı Rehberi | Tasarım ve Kâğıt Seçimi",
    "desc": "Broşür, kartvizit, etiket ve kutu için kâğıt seçimi, CMYK, taşma payı ve baskı dosyası hazırlama rehberlerini okuyun. Ürünleri ve baskı fiyatlarını inceleyin."
  },
  "/iletisim": {
    "title": "Matbaa İletişim ve Fiyat Teklifi | Topkapı Mavi Basım",
    "desc": "Mavi Basım’ın İstanbul Topkapı adresini ve iletişim bilgilerini inceleyin. Ürün, ebat ve adet bilgilerinizi telefon veya WhatsApp’tan paylaşarak teklif alın."
  }
};

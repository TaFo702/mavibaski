import type { SearchMetadata } from './pageSearchMetadata';

export interface CitySearchContent extends SearchMetadata {
  // Representative examples, never an exclusive city-specific service scope.
  products: readonly string[];
  // Every example must exist in the city's visible page content.
  evidence: readonly string[];
}

// All city pages serve businesses across sectors. Vary real product examples;
// do not assign a city to a single industry or invent branches / delivery claims.
export const CITY_SEARCH_CONTENT: Record<string, CitySearchContent> = {
  "adana-matbaa": {
    "title": "Adana Matbaa | Kartvizit, Broşür, Etiket | Mavi Basım",
    "desc": "Adana için kartvizit, broşür, etiket ve katalog baskı seçenekleri. İşletmenize uygun ürünleri inceleyin. İhtiyacınızı ve sipariş adedini ileterek teklif alın.",
    "products": [
      "Kartvizit",
      "Broşür",
      "Etiket"
    ],
    "evidence": [
      "Kartvizit",
      "Broşür",
      "Etiket",
      "Katalog"
    ]
  },
  "adiyaman-matbaa": {
    "title": "Adıyaman Matbaa | Kartvizit, Broşür, Kutu | Mavi Basım",
    "desc": "Adıyaman için kartvizit, broşür, kutu ve katalog baskı seçenekleri. İşletmenize uygun ürünleri inceleyin. Kâğıt, ebat ve adet seçenekleri için teklif isteyin.",
    "products": [
      "Kartvizit",
      "Broşür",
      "Kutu"
    ],
    "evidence": [
      "Kartvizit",
      "Broşür",
      "Kutu",
      "Katalog"
    ]
  },
  "afyonkarahisar-matbaa": {
    "title": "Afyonkarahisar Matbaa | Broşür, Katalog, Kutu | Mavi Basım",
    "desc": "Afyonkarahisar ve ilçelerine broşür, katalog, kutu ve magnet baskı hizmeti. Kurumsal ürünleri inceleyin. İhtiyacınızı ve sipariş adedini ileterek teklif alın.",
    "products": [
      "Broşür",
      "Katalog",
      "Kutu"
    ],
    "evidence": [
      "Broşür",
      "Katalog",
      "Kutu",
      "Magnet"
    ]
  },
  "agri-matbaa": {
    "title": "Ağrı Matbaa | Katalog, Kutu, Magnet | Mavi Basım",
    "desc": "Ağrı için katalog, kutu, magnet ve karton çanta siparişlerinizi planlayın. Baskı seçeneklerini inceleyin. Kâğıt, ebat ve adet seçenekleri için teklif isteyin.",
    "products": [
      "Katalog",
      "Kutu",
      "Magnet"
    ],
    "evidence": [
      "Katalog",
      "Kutu",
      "Magnet",
      "Karton Çanta"
    ]
  },
  "amasya-matbaa": {
    "title": "Amasya Matbaa | Katalog, Magnet, Karton Çanta | Mavi Basım",
    "desc": "Amasya için katalog, magnet, karton çanta ve makbuz baskılarını inceleyin. Kurumsal ihtiyaçlarınız için baskı adedi ve ebat bilgilerini paylaşın, teklif alın.",
    "products": [
      "Katalog",
      "Magnet",
      "Karton Çanta"
    ],
    "evidence": [
      "Katalog",
      "Magnet",
      "Karton Çanta",
      "Makbuz"
    ]
  },
  "ankara-matbaa": {
    "title": "Ankara Matbaa | Katalog, Makbuz, Zarf | Mavi Basım",
    "desc": "Ankara için katalog, makbuz, zarf ve dosya baskıları ve kurumsal ürünler. Sipariş seçeneklerini inceleyin. Sipariş adedinizi ve ölçüyü paylaşarak teklif alın.",
    "products": [
      "Katalog",
      "Makbuz",
      "Zarf"
    ],
    "evidence": [
      "Katalog",
      "Makbuz",
      "Zarf",
      "Dosya"
    ]
  },
  "antalya-matbaa": {
    "title": "Antalya Matbaa | Sipariş Fişi, Dosya, Amerikan Servis",
    "desc": "Antalya matbaa siparişlerinizde sipariş fişi, dosya, Amerikan servis ve sözleşme baskılarını inceleyin. Baskı adedi ve ebat bilgilerini paylaşın, teklif alın.",
    "products": [
      "Sipariş Fişi",
      "Dosya",
      "Amerikan Servis"
    ],
    "evidence": [
      "Sipariş Fişi",
      "Dosya",
      "Amerikan Servis",
      "Sözleşme"
    ]
  },
  "artvin-matbaa": {
    "title": "Artvin Matbaa | Etiket, Karton Çanta, Sipariş Fişi",
    "desc": "Artvin için etiket, karton çanta, sipariş fişi ve makbuz baskılarını inceleyin. Kurumsal ihtiyaçlarınız için ölçü, malzeme ve sipariş adediyle teklif isteyin.",
    "products": [
      "Etiket",
      "Karton Çanta",
      "Sipariş Fişi"
    ],
    "evidence": [
      "Etiket",
      "Karton Çanta",
      "Sipariş Fişi",
      "Makbuz"
    ]
  },
  "aydin-matbaa": {
    "title": "Aydın Matbaa | Etiket, Karton Çanta, Makbuz | Mavi Basım",
    "desc": "Aydın işletmeleri için etiket, karton çanta, makbuz ve kartvizit baskıları. Ürün seçeneklerini inceleyin. Kâğıt, ebat ve adet seçenekleri için teklif isteyin.",
    "products": [
      "Etiket",
      "Karton Çanta",
      "Makbuz"
    ],
    "evidence": [
      "Etiket",
      "Karton Çanta",
      "Makbuz",
      "Kartvizit"
    ]
  },
  "balikesir-matbaa": {
    "title": "Balıkesir Matbaa | Etiket, Makbuz, Amerikan Servis",
    "desc": "Balıkesir ve ilçelerine etiket, makbuz, Amerikan servis ve kartvizit baskı hizmeti. Kurumsal ürünleri inceleyin. Ürün, ebat ve adet bilgisiyle teklif isteyin.",
    "products": [
      "Etiket",
      "Makbuz",
      "Amerikan Servis"
    ],
    "evidence": [
      "Etiket",
      "Makbuz",
      "Amerikan Servis",
      "Kartvizit"
    ]
  },
  "bilecik-matbaa": {
    "title": "Bilecik Matbaa | Kartvizit, Broşür, Katalog | Mavi Basım",
    "desc": "Bilecik için kartvizit, broşür, katalog ve magnet baskılarını inceleyin. Kurumsal ihtiyaçlarınız için siparişinizin ölçüsünü ve adedini iletip teklif isteyin.",
    "products": [
      "Kartvizit",
      "Broşür",
      "Katalog"
    ],
    "evidence": [
      "Kartvizit",
      "Broşür",
      "Katalog",
      "Magnet"
    ]
  },
  "bingol-matbaa": {
    "title": "Bingöl Matbaa | Kartvizit, Katalog, Makbuz | Mavi Basım",
    "desc": "Bingöl için kartvizit, katalog, makbuz ve magnet siparişlerinizi planlayın. Baskı seçeneklerini inceleyin. Sipariş adedinizi ve ölçüyü paylaşarak teklif alın.",
    "products": [
      "Kartvizit",
      "Katalog",
      "Makbuz"
    ],
    "evidence": [
      "Kartvizit",
      "Katalog",
      "Makbuz",
      "Magnet"
    ]
  },
  "bitlis-matbaa": {
    "title": "Bitlis Matbaa | Kartvizit, Etiket, Sipariş Fişi | Mavi Basım",
    "desc": "Bitlis işletmeleri için kartvizit, etiket, sipariş fişi ve el ilanı seçenekleri. Matbaa siparişiniz için ihtiyacınızı ve sipariş adedini ileterek teklif alın.",
    "products": [
      "Kartvizit",
      "Etiket",
      "Sipariş Fişi"
    ],
    "evidence": [
      "Kartvizit",
      "Etiket",
      "Sipariş Fişi",
      "El İlanı"
    ]
  },
  "bolu-matbaa": {
    "title": "Bolu Matbaa | Kartvizit, Broşür, Magnet | Mavi Basım",
    "desc": "Bolu için kartvizit, broşür, magnet ve kutu siparişlerinizi planlayın. Baskı seçeneklerini inceleyin. Siparişinizin ölçüsünü ve adedini iletip teklif isteyin.",
    "products": [
      "Kartvizit",
      "Broşür",
      "Magnet"
    ],
    "evidence": [
      "Kartvizit",
      "Broşür",
      "Magnet",
      "Kutu"
    ]
  },
  "burdur-matbaa": {
    "title": "Burdur Matbaa | Broşür, Etiket, Karton Çanta | Mavi Basım",
    "desc": "Burdur işletmeleri için broşür, etiket, karton çanta ve kutu baskıları. Ürün seçeneklerini inceleyin. Siparişinizin ölçüsünü ve adedini iletip teklif isteyin.",
    "products": [
      "Broşür",
      "Etiket",
      "Karton Çanta"
    ],
    "evidence": [
      "Broşür",
      "Etiket",
      "Karton Çanta",
      "Kutu"
    ]
  },
  "bursa-matbaa": {
    "title": "Bursa Matbaa | Broşür, Kutu, Karton Çanta | Mavi Basım",
    "desc": "Bursa için broşür, kutu, karton çanta ve magnet baskı seçenekleri. İşletmenize uygun ürünleri inceleyin. İhtiyacınızı ve sipariş adedini ileterek teklif alın.",
    "products": [
      "Broşür",
      "Kutu",
      "Karton Çanta"
    ],
    "evidence": [
      "Broşür",
      "Kutu",
      "Karton Çanta",
      "Magnet"
    ]
  },
  "canakkale-matbaa": {
    "title": "Çanakkale Matbaa | Kutu, Karton Çanta, Amerikan Servis",
    "desc": "Çanakkale işletmeleri için kutu, karton çanta, Amerikan servis ve magnet seçenekleri. Matbaa siparişiniz için baskı özelliklerini ve adedi iletip teklif alın.",
    "products": [
      "Kutu",
      "Karton Çanta",
      "Amerikan Servis"
    ],
    "evidence": [
      "Kutu",
      "Karton Çanta",
      "Amerikan Servis",
      "Magnet"
    ]
  },
  "cankiri-matbaa": {
    "title": "Çankırı Matbaa | Kutu, Magnet, Karton Çanta | Mavi Basım",
    "desc": "Çankırı için kutu, magnet, karton çanta ve sipariş fişi baskı seçenekleri. İşletmenize uygun ürünleri inceleyin. Ürün, ebat ve adet bilgisiyle teklif isteyin.",
    "products": [
      "Kutu",
      "Magnet",
      "Karton Çanta"
    ],
    "evidence": [
      "Kutu",
      "Magnet",
      "Karton Çanta",
      "Sipariş Fişi"
    ]
  },
  "corum-matbaa": {
    "title": "Çorum Matbaa | Kutu, Sipariş Fişi, El İlanı | Mavi Basım",
    "desc": "Çorum için kutu, sipariş fişi, el ilanı ve makbuz baskılarını inceleyin. Kurumsal ihtiyaçlarınız için siparişinizin ölçüsünü ve adedini iletip teklif isteyin.",
    "products": [
      "Kutu",
      "Sipariş Fişi",
      "El İlanı"
    ],
    "evidence": [
      "Kutu",
      "Sipariş Fişi",
      "El İlanı",
      "Makbuz"
    ]
  },
  "denizli-matbaa": {
    "title": "Denizli Matbaa | Kutu, Magnet, Sipariş Fişi | Mavi Basım",
    "desc": "Denizli için kutu, magnet, sipariş fişi ve makbuz baskılarını inceleyin. Kurumsal ihtiyaçlarınız için siparişinizin ölçüsünü ve adedini iletip teklif isteyin.",
    "products": [
      "Kutu",
      "Magnet",
      "Sipariş Fişi"
    ],
    "evidence": [
      "Kutu",
      "Magnet",
      "Sipariş Fişi",
      "Makbuz"
    ]
  },
  "diyarbakir-matbaa": {
    "title": "Diyarbakır Matbaa | Magnet, Makbuz, Sipariş Fişi",
    "desc": "Diyarbakır işletmeleri için magnet, makbuz, sipariş fişi ve kartvizit seçenekleri. Matbaa siparişiniz için sipariş adedinizi ve ölçüyü paylaşarak teklif alın.",
    "products": [
      "Magnet",
      "Makbuz",
      "Sipariş Fişi"
    ],
    "evidence": [
      "Magnet",
      "Makbuz",
      "Sipariş Fişi",
      "Kartvizit"
    ]
  },
  "edirne-matbaa": {
    "title": "Edirne Matbaa | Kartvizit, Magnet, Makbuz | Mavi Basım",
    "desc": "Edirne için kartvizit, magnet, makbuz ve katalog baskıları ve kurumsal ürünler. Sipariş seçeneklerini inceleyin. Ürün, ebat ve adet bilgisiyle teklif isteyin.",
    "products": [
      "Kartvizit",
      "Magnet",
      "Makbuz"
    ],
    "evidence": [
      "Kartvizit",
      "Magnet",
      "Makbuz",
      "Katalog"
    ]
  },
  "elazig-matbaa": {
    "title": "Elazığ Matbaa | Kartvizit, Etiket, Makbuz | Mavi Basım",
    "desc": "Elazığ işletmeleri için kartvizit, etiket, makbuz ve katalog baskıları. Ürün seçeneklerini inceleyin. Siparişinizin ölçüsünü ve adedini iletip teklif isteyin.",
    "products": [
      "Kartvizit",
      "Etiket",
      "Makbuz"
    ],
    "evidence": [
      "Kartvizit",
      "Etiket",
      "Makbuz",
      "Katalog"
    ]
  },
  "erzincan-matbaa": {
    "title": "Erzincan Matbaa | Katalog, Etiket, Makbuz | Mavi Basım",
    "desc": "Erzincan için katalog, etiket, makbuz ve sipariş fişi baskılarını inceleyin. Kurumsal ihtiyaçlarınız için ebat, malzeme ve adet bilgisiyle fiyat teklifi alın.",
    "products": [
      "Katalog",
      "Etiket",
      "Makbuz"
    ],
    "evidence": [
      "Katalog",
      "Etiket",
      "Makbuz",
      "Sipariş Fişi"
    ]
  },
  "erzurum-matbaa": {
    "title": "Erzurum Matbaa | Katalog, Etiket, Sipariş Fişi | Mavi Basım",
    "desc": "Erzurum işletmeleri için katalog, etiket, sipariş fişi ve broşür baskıları. Ürün seçeneklerini inceleyin. Kâğıt, ebat ve adet seçenekleri için teklif isteyin.",
    "products": [
      "Katalog",
      "Etiket",
      "Sipariş Fişi"
    ],
    "evidence": [
      "Katalog",
      "Etiket",
      "Sipariş Fişi",
      "Broşür"
    ]
  },
  "eskisehir-matbaa": {
    "title": "Eskişehir Matbaa | Broşür, Katalog, Sipariş Fişi",
    "desc": "Eskişehir için broşür, katalog, sipariş fişi ve magnet siparişlerinizi planlayın. Baskı seçeneklerini inceleyin. Ürün, ebat ve adet bilgisiyle teklif isteyin.",
    "products": [
      "Broşür",
      "Katalog",
      "Sipariş Fişi"
    ],
    "evidence": [
      "Broşür",
      "Katalog",
      "Sipariş Fişi",
      "Magnet"
    ]
  },
  "gaziantep-matbaa": {
    "title": "Gaziantep Matbaa | Broşür, Magnet, Sipariş Fişi | Mavi Basım",
    "desc": "Gaziantep ve ilçelerine broşür, magnet, sipariş fişi ve karton çanta baskı hizmeti. Kurumsal ürünleri inceleyin. Ürün, ebat ve adet bilgisiyle teklif isteyin.",
    "products": [
      "Broşür",
      "Magnet",
      "Sipariş Fişi"
    ],
    "evidence": [
      "Broşür",
      "Magnet",
      "Sipariş Fişi",
      "Karton Çanta"
    ]
  },
  "giresun-matbaa": {
    "title": "Giresun Matbaa | Broşür, Magnet, Karton Çanta | Mavi Basım",
    "desc": "Giresun için broşür, magnet, karton çanta ve kartvizit siparişlerinizi planlayın. Baskı seçeneklerini inceleyin. Ürün, ebat ve adet bilgisiyle teklif isteyin.",
    "products": [
      "Broşür",
      "Magnet",
      "Karton Çanta"
    ],
    "evidence": [
      "Broşür",
      "Magnet",
      "Karton Çanta",
      "Kartvizit"
    ]
  },
  "gumushane-matbaa": {
    "title": "Gümüşhane Matbaa | Kartvizit, Magnet, Karton Çanta",
    "desc": "Gümüşhane işletmeleri için kartvizit, magnet, karton çanta ve kutu seçenekleri. Matbaa siparişiniz için baskı adedi ve ebat bilgilerini paylaşın, teklif alın.",
    "products": [
      "Kartvizit",
      "Magnet",
      "Karton Çanta"
    ],
    "evidence": [
      "Kartvizit",
      "Magnet",
      "Karton Çanta",
      "Kutu"
    ]
  },
  "hakkari-matbaa": {
    "title": "Hakkari Matbaa | Kartvizit, Kutu, Karton Çanta | Mavi Basım",
    "desc": "Hakkari işletmeleri için kartvizit, kutu, karton çanta ve makbuz baskıları. Ürün seçeneklerini inceleyin. Kâğıt, ebat ve adet seçenekleri için teklif isteyin.",
    "products": [
      "Kartvizit",
      "Kutu",
      "Karton Çanta"
    ],
    "evidence": [
      "Kartvizit",
      "Kutu",
      "Karton Çanta",
      "Makbuz"
    ]
  },
  "hatay-matbaa": {
    "title": "Hatay Matbaa | Kartvizit, Kutu, Makbuz | Mavi Basım",
    "desc": "Hatay için kartvizit, kutu, makbuz ve katalog siparişlerinizi planlayın. Baskı seçeneklerini inceleyin. Baskı adedi ve ebat bilgilerini paylaşın, teklif alın.",
    "products": [
      "Kartvizit",
      "Kutu",
      "Makbuz"
    ],
    "evidence": [
      "Kartvizit",
      "Kutu",
      "Makbuz",
      "Katalog"
    ]
  },
  "isparta-matbaa": {
    "title": "Isparta Matbaa | Katalog, Kutu, Makbuz | Mavi Basım",
    "desc": "Isparta için katalog, kutu, makbuz ve etiket baskı seçenekleri. İşletmenize uygun ürünleri inceleyin. Siparişinizin ölçüsünü ve adedini iletip teklif isteyin.",
    "products": [
      "Katalog",
      "Kutu",
      "Makbuz"
    ],
    "evidence": [
      "Katalog",
      "Kutu",
      "Makbuz",
      "Etiket"
    ]
  },
  "mersin-matbaa": {
    "title": "Mersin Matbaa | Dosya, Amerikan Servis, Oto Paspas",
    "desc": "Mersin işletmeleri için dosya, Amerikan servis, oto paspas ve etiket baskıları. Ürün seçeneklerini inceleyin. Baskı özelliklerini ve adedi iletip teklif alın.",
    "products": [
      "Dosya",
      "Amerikan Servis",
      "Oto Paspas"
    ],
    "evidence": [
      "Dosya",
      "Amerikan Servis",
      "Oto Paspas",
      "Etiket"
    ]
  },
  "istanbul-matbaa": {
    "title": "İstanbul Matbaa | Zarf, Dosya, Amerikan Servis | Mavi Basım",
    "desc": "İstanbul için zarf, dosya, Amerikan servis ve etiket baskı seçenekleri. İşletmenize uygun ürünleri inceleyin. Baskı özelliklerini ve adedi iletip teklif alın.",
    "products": [
      "Zarf",
      "Dosya",
      "Amerikan Servis"
    ],
    "evidence": [
      "Zarf",
      "Dosya",
      "Amerikan Servis",
      "Etiket"
    ]
  },
  "izmir-matbaa": {
    "title": "İzmir Matbaa | Etiket, Dosya, Oto Paspas | Mavi Basım",
    "desc": "İzmir ve ilçelerine etiket, dosya, oto paspas ve Amerikan servis baskı hizmeti. Kurumsal ürünleri inceleyin. Ölçü, malzeme ve sipariş adediyle teklif isteyin.",
    "products": [
      "Etiket",
      "Dosya",
      "Oto Paspas"
    ],
    "evidence": [
      "Etiket",
      "Dosya",
      "Oto Paspas",
      "Amerikan Servis"
    ]
  },
  "kars-matbaa": {
    "title": "Kars Matbaa | Broşür, Etiket, Sipariş Fişi | Mavi Basım",
    "desc": "Kars için broşür, etiket, sipariş fişi ve katalog baskılarını inceleyin. Kurumsal ihtiyaçlarınız için siparişinizin ölçüsünü ve adedini iletip teklif isteyin.",
    "products": [
      "Broşür",
      "Etiket",
      "Sipariş Fişi"
    ],
    "evidence": [
      "Broşür",
      "Etiket",
      "Sipariş Fişi",
      "Katalog"
    ]
  },
  "kastamonu-matbaa": {
    "title": "Kastamonu Matbaa | Broşür, Karton Çanta, Sipariş Fişi",
    "desc": "Kastamonu işletmeleri için broşür, karton çanta, sipariş fişi ve katalog seçenekleri. Matbaa siparişiniz için baskı özelliklerini ve adedi iletip teklif alın.",
    "products": [
      "Broşür",
      "Karton Çanta",
      "Sipariş Fişi"
    ],
    "evidence": [
      "Broşür",
      "Karton Çanta",
      "Sipariş Fişi",
      "Katalog"
    ]
  },
  "kayseri-matbaa": {
    "title": "Kayseri Matbaa | Katalog, Karton Çanta, Sipariş Fişi",
    "desc": "Kayseri matbaa siparişlerinizde katalog, karton çanta, sipariş fişi ve magnet baskılarını inceleyin. Siparişinizin ölçüsünü ve adedini iletip teklif isteyin.",
    "products": [
      "Katalog",
      "Karton Çanta",
      "Sipariş Fişi"
    ],
    "evidence": [
      "Katalog",
      "Karton Çanta",
      "Sipariş Fişi",
      "Magnet"
    ]
  },
  "kirklareli-matbaa": {
    "title": "Kırklareli Matbaa | Katalog, Karton Çanta, Makbuz",
    "desc": "Kırklareli işletmeleri için katalog, karton çanta, makbuz ve magnet baskıları. Ürün seçeneklerini inceleyin. Ölçü, malzeme ve sipariş adediyle teklif isteyin.",
    "products": [
      "Katalog",
      "Karton Çanta",
      "Makbuz"
    ],
    "evidence": [
      "Katalog",
      "Karton Çanta",
      "Makbuz",
      "Magnet"
    ]
  },
  "kirsehir-matbaa": {
    "title": "Kırşehir Matbaa | Katalog, Magnet, Makbuz | Mavi Basım",
    "desc": "Kırşehir işletmeleri için katalog, magnet, makbuz ve kartvizit baskıları. Ürün seçeneklerini inceleyin. Baskı adedi ve ebat bilgilerini paylaşın, teklif alın.",
    "products": [
      "Katalog",
      "Magnet",
      "Makbuz"
    ],
    "evidence": [
      "Katalog",
      "Magnet",
      "Makbuz",
      "Kartvizit"
    ]
  },
  "kocaeli-matbaa": {
    "title": "Kocaeli Matbaa | Etiket, Magnet, Makbuz | Mavi Basım",
    "desc": "Kocaeli işletmeleri için etiket, magnet, makbuz ve kartvizit baskıları. Ürün seçeneklerini inceleyin. Siparişinizin ölçüsünü ve adedini iletip teklif isteyin.",
    "products": [
      "Etiket",
      "Magnet",
      "Makbuz"
    ],
    "evidence": [
      "Etiket",
      "Magnet",
      "Makbuz",
      "Kartvizit"
    ]
  },
  "konya-matbaa": {
    "title": "Konya Matbaa | Kartvizit, Etiket, Magnet | Mavi Basım",
    "desc": "Konya için kartvizit, etiket, magnet ve kutu baskı seçenekleri. İşletmenize uygun ürünleri inceleyin. Siparişinizin ölçüsünü ve adedini iletip teklif isteyin.",
    "products": [
      "Kartvizit",
      "Etiket",
      "Magnet"
    ],
    "evidence": [
      "Kartvizit",
      "Etiket",
      "Magnet",
      "Kutu"
    ]
  },
  "kutahya-matbaa": {
    "title": "Kütahya Matbaa | Kartvizit, Etiket, Kutu | Mavi Basım",
    "desc": "Kütahya için kartvizit, etiket, kutu ve broşür siparişlerinizi planlayın. Baskı seçeneklerini inceleyin. İhtiyacınızı ve sipariş adedini ileterek teklif alın.",
    "products": [
      "Kartvizit",
      "Etiket",
      "Kutu"
    ],
    "evidence": [
      "Kartvizit",
      "Etiket",
      "Kutu",
      "Broşür"
    ]
  },
  "malatya-matbaa": {
    "title": "Malatya Matbaa | Broşür, Katalog, Magnet | Mavi Basım",
    "desc": "Malatya için broşür, katalog, magnet ve kutu baskıları ve kurumsal ürünler. Sipariş seçeneklerini inceleyin. Ölçü, malzeme ve sipariş adediyle teklif isteyin.",
    "products": [
      "Broşür",
      "Katalog",
      "Magnet"
    ],
    "evidence": [
      "Broşür",
      "Katalog",
      "Magnet",
      "Kutu"
    ]
  },
  "manisa-matbaa": {
    "title": "Manisa Matbaa | Kartvizit, Katalog, Kutu | Mavi Basım",
    "desc": "Manisa işletmeleri için kartvizit, katalog, kutu ve sipariş fişi baskıları. Ürün seçeneklerini inceleyin. Kâğıt, ebat ve adet seçenekleri için teklif isteyin.",
    "products": [
      "Kartvizit",
      "Katalog",
      "Kutu"
    ],
    "evidence": [
      "Kartvizit",
      "Katalog",
      "Kutu",
      "Sipariş Fişi"
    ]
  },
  "kahramanmaras-matbaa": {
    "title": "Kahramanmaraş Matbaa | Broşür, Katalog, Etiket | Mavi Basım",
    "desc": "Kahramanmaraş matbaa siparişlerinizde broşür, katalog, etiket ve sipariş fişi baskılarını inceleyin. Siparişinizin ölçüsünü ve adedini iletip teklif isteyin.",
    "products": [
      "Broşür",
      "Katalog",
      "Etiket"
    ],
    "evidence": [
      "Broşür",
      "Katalog",
      "Etiket",
      "Sipariş Fişi"
    ]
  },
  "mardin-matbaa": {
    "title": "Mardin Matbaa | Broşür, Etiket, Amerikan Servis | Mavi Basım",
    "desc": "Mardin için broşür, etiket, Amerikan servis ve kutu baskılarını inceleyin. Kurumsal ihtiyaçlarınız için baskı adedi ve ebat bilgilerini paylaşın, teklif alın.",
    "products": [
      "Broşür",
      "Etiket",
      "Amerikan Servis"
    ],
    "evidence": [
      "Broşür",
      "Etiket",
      "Amerikan Servis",
      "Kutu"
    ]
  },
  "mugla-matbaa": {
    "title": "Muğla Matbaa | Sözleşme, Afiş, Bloknot | Mavi Basım",
    "desc": "Muğla işletmeleri için sözleşme, afiş, bloknot ve oto paspas baskıları. Ürün seçeneklerini inceleyin. Siparişinizin ölçüsünü ve adedini iletip teklif isteyin.",
    "products": [
      "Sözleşme",
      "Afiş",
      "Bloknot"
    ],
    "evidence": [
      "Sözleşme",
      "Afiş",
      "Bloknot",
      "Oto Paspas"
    ]
  },
  "mus-matbaa": {
    "title": "Muş Matbaa | Kutu, Karton Çanta, Sipariş Fişi | Mavi Basım",
    "desc": "Muş işletmeleri için kutu, karton çanta, sipariş fişi ve makbuz baskıları. Ürün seçeneklerini inceleyin. İhtiyacınızı ve sipariş adedini ileterek teklif alın.",
    "products": [
      "Kutu",
      "Karton Çanta",
      "Sipariş Fişi"
    ],
    "evidence": [
      "Kutu",
      "Karton Çanta",
      "Sipariş Fişi",
      "Makbuz"
    ]
  },
  "nevsehir-matbaa": {
    "title": "Nevşehir Matbaa | Kutu, Makbuz, Sipariş Fişi | Mavi Basım",
    "desc": "Nevşehir için kutu, makbuz, sipariş fişi ve kartvizit baskı seçenekleri. İşletmenize uygun ürünleri inceleyin. Baskı için ürün ve adet bilgisiyle teklif alın.",
    "products": [
      "Kutu",
      "Makbuz",
      "Sipariş Fişi"
    ],
    "evidence": [
      "Kutu",
      "Makbuz",
      "Sipariş Fişi",
      "Kartvizit"
    ]
  },
  "nigde-matbaa": {
    "title": "Niğde Matbaa | Kartvizit, Makbuz, Sipariş Fişi | Mavi Basım",
    "desc": "Niğde ve ilçelerine kartvizit, makbuz, sipariş fişi ve magnet baskı hizmeti. Kurumsal ürünleri inceleyin. Kâğıt, ebat ve adet seçenekleri için teklif isteyin.",
    "products": [
      "Kartvizit",
      "Makbuz",
      "Sipariş Fişi"
    ],
    "evidence": [
      "Kartvizit",
      "Makbuz",
      "Sipariş Fişi",
      "Magnet"
    ]
  },
  "ordu-matbaa": {
    "title": "Ordu Matbaa | Dosya, Amerikan Servis, El İlanı | Mavi Basım",
    "desc": "Ordu için dosya, Amerikan servis, el ilanı ve magnet siparişlerinizi planlayın. Baskı seçeneklerini inceleyin. Baskı için ürün ve adet bilgisiyle teklif alın.",
    "products": [
      "Dosya",
      "Amerikan Servis",
      "El İlanı"
    ],
    "evidence": [
      "Dosya",
      "Amerikan Servis",
      "El İlanı",
      "Magnet"
    ]
  },
  "rize-matbaa": {
    "title": "Rize Matbaa | Zarf, Dosya, El İlanı | Mavi Basım",
    "desc": "Rize için zarf, dosya, el ilanı ve Amerikan servis baskıları ve kurumsal ürünler. Sipariş seçeneklerini inceleyin. Ölçü ve adet bilgisiyle fiyat teklifi alın.",
    "products": [
      "Zarf",
      "Dosya",
      "El İlanı"
    ],
    "evidence": [
      "Zarf",
      "Dosya",
      "El İlanı",
      "Amerikan Servis"
    ]
  },
  "sakarya-matbaa": {
    "title": "Sakarya Matbaa | Magnet, Karton Çanta, Makbuz | Mavi Basım",
    "desc": "Sakarya için magnet, karton çanta, makbuz ve kartvizit baskılarını inceleyin. Kurumsal ihtiyaçlarınız için sipariş adedinizi ve ölçüyü paylaşarak teklif alın.",
    "products": [
      "Magnet",
      "Karton Çanta",
      "Makbuz"
    ],
    "evidence": [
      "Magnet",
      "Karton Çanta",
      "Makbuz",
      "Kartvizit"
    ]
  },
  "samsun-matbaa": {
    "title": "Samsun Matbaa | Magnet, Dosya, Oto Paspas | Mavi Basım",
    "desc": "Samsun için magnet, dosya, oto paspas ve Amerikan servis baskılarını inceleyin. Kurumsal ihtiyaçlarınız için ölçü, malzeme ve sipariş adediyle teklif isteyin.",
    "products": [
      "Magnet",
      "Dosya",
      "Oto Paspas"
    ],
    "evidence": [
      "Magnet",
      "Dosya",
      "Oto Paspas",
      "Amerikan Servis"
    ]
  },
  "siirt-matbaa": {
    "title": "Siirt Matbaa | Kartvizit, Kutu, Magnet | Mavi Basım",
    "desc": "Siirt için kartvizit, kutu, magnet ve broşür baskı seçenekleri. İşletmenize uygun ürünleri inceleyin. Siparişinizin ölçüsünü ve adedini iletip teklif isteyin.",
    "products": [
      "Kartvizit",
      "Kutu",
      "Magnet"
    ],
    "evidence": [
      "Kartvizit",
      "Kutu",
      "Magnet",
      "Broşür"
    ]
  },
  "sinop-matbaa": {
    "title": "Sinop Matbaa | Kartvizit, Dosya, El İlanı | Mavi Basım",
    "desc": "Sinop işletmeleri için kartvizit, dosya, el ilanı ve Amerikan servis baskıları. Ürün seçeneklerini inceleyin. Baskı özelliklerini ve adedi iletip teklif alın.",
    "products": [
      "Kartvizit",
      "Dosya",
      "El İlanı"
    ],
    "evidence": [
      "Kartvizit",
      "Dosya",
      "El İlanı",
      "Amerikan Servis"
    ]
  },
  "sivas-matbaa": {
    "title": "Sivas Matbaa | Kartvizit, Broşür, Karton Çanta | Mavi Basım",
    "desc": "Sivas için kartvizit, broşür, karton çanta ve sipariş fişi baskı seçenekleri. İşletmenize uygun ürünleri inceleyin. Ölçü ve adet bilgisiyle fiyat teklifi alın.",
    "products": [
      "Kartvizit",
      "Broşür",
      "Karton Çanta"
    ],
    "evidence": [
      "Kartvizit",
      "Broşür",
      "Karton Çanta",
      "Sipariş Fişi"
    ]
  },
  "tekirdag-matbaa": {
    "title": "Tekirdağ Matbaa | Broşür, Katalog, Karton Çanta | Mavi Basım",
    "desc": "Tekirdağ ve ilçelerine broşür, katalog, karton çanta ve sipariş fişi baskı hizmeti. Kurumsal ürünleri inceleyin. Ürün, ebat ve adet bilgisiyle teklif isteyin.",
    "products": [
      "Broşür",
      "Katalog",
      "Karton Çanta"
    ],
    "evidence": [
      "Broşür",
      "Katalog",
      "Karton Çanta",
      "Sipariş Fişi"
    ]
  },
  "tokat-matbaa": {
    "title": "Tokat Matbaa | Broşür, Katalog, Makbuz | Mavi Basım",
    "desc": "Tokat için broşür, katalog, makbuz ve sipariş fişi baskıları ve kurumsal ürünler. Sipariş seçeneklerini inceleyin. Ölçü ve adet bilgisiyle fiyat teklifi alın.",
    "products": [
      "Broşür",
      "Katalog",
      "Makbuz"
    ],
    "evidence": [
      "Broşür",
      "Katalog",
      "Makbuz",
      "Sipariş Fişi"
    ]
  },
  "trabzon-matbaa": {
    "title": "Trabzon Matbaa | Broşür, Amerikan Servis, El İlanı",
    "desc": "Trabzon işletmeleri için broşür, Amerikan servis, el ilanı ve dosya seçenekleri. Matbaa siparişiniz için ihtiyacınızı ve sipariş adedini ileterek teklif alın.",
    "products": [
      "Broşür",
      "Amerikan Servis",
      "El İlanı"
    ],
    "evidence": [
      "Broşür",
      "Amerikan Servis",
      "El İlanı",
      "Dosya"
    ]
  },
  "tunceli-matbaa": {
    "title": "Tunceli Matbaa | Broşür, Kutu, Sipariş Fişi | Mavi Basım",
    "desc": "Tunceli için broşür, kutu, sipariş fişi ve etiket baskılarını inceleyin. Kurumsal ihtiyaçlarınız için siparişinizin ölçüsünü ve adedini iletip teklif isteyin.",
    "products": [
      "Broşür",
      "Kutu",
      "Sipariş Fişi"
    ],
    "evidence": [
      "Broşür",
      "Kutu",
      "Sipariş Fişi",
      "Etiket"
    ]
  },
  "sanliurfa-matbaa": {
    "title": "Şanlıurfa Matbaa | Etiket, Kutu, Sipariş Fişi | Mavi Basım",
    "desc": "Şanlıurfa için etiket, kutu, sipariş fişi ve magnet baskılarını inceleyin. Kurumsal ihtiyaçlarınız için baskı adedi ve ebat bilgilerini paylaşın, teklif alın.",
    "products": [
      "Etiket",
      "Kutu",
      "Sipariş Fişi"
    ],
    "evidence": [
      "Etiket",
      "Kutu",
      "Sipariş Fişi",
      "Magnet"
    ]
  },
  "usak-matbaa": {
    "title": "Uşak Matbaa | Etiket, Magnet, Sipariş Fişi | Mavi Basım",
    "desc": "Uşak için etiket, magnet, sipariş fişi ve karton çanta baskılarını inceleyin. Kurumsal ihtiyaçlarınız için sipariş adedinizi ve ölçüyü paylaşarak teklif alın.",
    "products": [
      "Etiket",
      "Magnet",
      "Sipariş Fişi"
    ],
    "evidence": [
      "Etiket",
      "Magnet",
      "Sipariş Fişi",
      "Karton Çanta"
    ]
  },
  "van-matbaa": {
    "title": "Van Matbaa | Etiket, Magnet, Amerikan Servis | Mavi Basım",
    "desc": "Van işletmeleri için etiket, magnet, Amerikan servis ve karton çanta baskıları. Ürün seçeneklerini inceleyin. Baskı özelliklerini ve adedi iletip teklif alın.",
    "products": [
      "Etiket",
      "Magnet",
      "Amerikan Servis"
    ],
    "evidence": [
      "Etiket",
      "Magnet",
      "Amerikan Servis",
      "Karton Çanta"
    ]
  },
  "yozgat-matbaa": {
    "title": "Yozgat Matbaa | Etiket, Magnet, Karton Çanta | Mavi Basım",
    "desc": "Yozgat ve ilçelerine etiket, magnet, karton çanta ve makbuz baskı hizmeti. Kurumsal ürünleri inceleyin. Baskı adedi ve ebat bilgilerini paylaşın, teklif alın.",
    "products": [
      "Etiket",
      "Magnet",
      "Karton Çanta"
    ],
    "evidence": [
      "Etiket",
      "Magnet",
      "Karton Çanta",
      "Makbuz"
    ]
  },
  "zonguldak-matbaa": {
    "title": "Zonguldak Matbaa | Kartvizit, Etiket, Karton Çanta",
    "desc": "Zonguldak ve ilçelerine kartvizit, etiket, karton çanta ve makbuz baskı hizmeti. Kurumsal ürünleri inceleyin. Baskı özelliklerini ve adedi iletip teklif alın.",
    "products": [
      "Kartvizit",
      "Etiket",
      "Karton Çanta"
    ],
    "evidence": [
      "Kartvizit",
      "Etiket",
      "Karton Çanta",
      "Makbuz"
    ]
  },
  "aksaray-matbaa": {
    "title": "Aksaray Matbaa | Kartvizit, Karton Çanta, Makbuz",
    "desc": "Aksaray işletmeleri için kartvizit, karton çanta, makbuz ve katalog seçenekleri. Matbaa siparişiniz için ihtiyacınızı ve sipariş adedini ileterek teklif alın.",
    "products": [
      "Kartvizit",
      "Karton Çanta",
      "Makbuz"
    ],
    "evidence": [
      "Kartvizit",
      "Karton Çanta",
      "Makbuz",
      "Katalog"
    ]
  },
  "bayburt-matbaa": {
    "title": "Bayburt Matbaa | Kutu, Karton Çanta, Makbuz | Mavi Basım",
    "desc": "Bayburt için kutu, karton çanta, makbuz ve katalog baskıları ve kurumsal ürünler. Sipariş seçeneklerini inceleyin. Ölçü ve adet bilgisiyle fiyat teklifi alın.",
    "products": [
      "Kutu",
      "Karton Çanta",
      "Makbuz"
    ],
    "evidence": [
      "Kutu",
      "Karton Çanta",
      "Makbuz",
      "Katalog"
    ]
  },
  "karaman-matbaa": {
    "title": "Karaman Matbaa | Broşür, Kutu, Makbuz | Mavi Basım",
    "desc": "Karaman için broşür, kutu, makbuz ve katalog baskıları ve kurumsal ürünler. Sipariş seçeneklerini inceleyin. Ölçü, malzeme ve sipariş adediyle teklif isteyin.",
    "products": [
      "Broşür",
      "Kutu",
      "Makbuz"
    ],
    "evidence": [
      "Broşür",
      "Kutu",
      "Makbuz",
      "Katalog"
    ]
  },
  "kirikkale-matbaa": {
    "title": "Kırıkkale Matbaa | Katalog, Kutu, Sipariş Fişi | Mavi Basım",
    "desc": "Kırıkkale işletmeleri için katalog, kutu, sipariş fişi ve kartvizit baskıları. Ürün seçeneklerini inceleyin. Ölçü, malzeme ve sipariş adediyle teklif isteyin.",
    "products": [
      "Katalog",
      "Kutu",
      "Sipariş Fişi"
    ],
    "evidence": [
      "Katalog",
      "Kutu",
      "Sipariş Fişi",
      "Kartvizit"
    ]
  },
  "batman-matbaa": {
    "title": "Batman Matbaa | Kartvizit, Katalog, Sipariş Fişi",
    "desc": "Batman için kartvizit, katalog, sipariş fişi ve magnet baskılarını inceleyin. Kurumsal ihtiyaçlarınız için sipariş adedinizi ve ölçüyü paylaşarak teklif alın.",
    "products": [
      "Kartvizit",
      "Katalog",
      "Sipariş Fişi"
    ],
    "evidence": [
      "Kartvizit",
      "Katalog",
      "Sipariş Fişi",
      "Magnet"
    ]
  },
  "sirnak-matbaa": {
    "title": "Şırnak Matbaa | Katalog, Magnet, Sipariş Fişi | Mavi Basım",
    "desc": "Şırnak işletmeleri için katalog, magnet, sipariş fişi ve makbuz baskıları. Ürün seçeneklerini inceleyin. İhtiyacınızı ve sipariş adedini ileterek teklif alın.",
    "products": [
      "Katalog",
      "Magnet",
      "Sipariş Fişi"
    ],
    "evidence": [
      "Katalog",
      "Magnet",
      "Sipariş Fişi",
      "Makbuz"
    ]
  },
  "bartin-matbaa": {
    "title": "Bartın Matbaa | Katalog, Makbuz, Sipariş Fişi | Mavi Basım",
    "desc": "Bartın için katalog, makbuz, sipariş fişi ve kartvizit siparişlerinizi planlayın. Baskı seçeneklerini inceleyin. Ürün, ebat ve adet bilgisiyle teklif isteyin.",
    "products": [
      "Katalog",
      "Makbuz",
      "Sipariş Fişi"
    ],
    "evidence": [
      "Katalog",
      "Makbuz",
      "Sipariş Fişi",
      "Kartvizit"
    ]
  },
  "ardahan-matbaa": {
    "title": "Ardahan Matbaa | Broşür, Makbuz, Sipariş Fişi | Mavi Basım",
    "desc": "Ardahan için broşür, makbuz, sipariş fişi ve kartvizit siparişlerinizi planlayın. Baskı seçeneklerini inceleyin. Ürün, ebat ve adet bilgisiyle teklif isteyin.",
    "products": [
      "Broşür",
      "Makbuz",
      "Sipariş Fişi"
    ],
    "evidence": [
      "Broşür",
      "Makbuz",
      "Sipariş Fişi",
      "Kartvizit"
    ]
  },
  "igdir-matbaa": {
    "title": "Iğdır Matbaa | Kartvizit, Broşür, Makbuz | Mavi Basım",
    "desc": "Iğdır için kartvizit, broşür, makbuz ve etiket siparişlerinizi planlayın. Baskı seçeneklerini inceleyin. İhtiyacınızı ve sipariş adedini ileterek teklif alın.",
    "products": [
      "Kartvizit",
      "Broşür",
      "Makbuz"
    ],
    "evidence": [
      "Kartvizit",
      "Broşür",
      "Makbuz",
      "Etiket"
    ]
  },
  "yalova-matbaa": {
    "title": "Yalova Matbaa | Broşür, Etiket, Makbuz | Mavi Basım",
    "desc": "Yalova için broşür, etiket, makbuz ve kutu baskıları ve kurumsal ürünler. Sipariş seçeneklerini inceleyin. Sipariş adedinizi ve ölçüyü paylaşarak teklif alın.",
    "products": [
      "Broşür",
      "Etiket",
      "Makbuz"
    ],
    "evidence": [
      "Broşür",
      "Etiket",
      "Makbuz",
      "Kutu"
    ]
  },
  "karabuk-matbaa": {
    "title": "Karabük Matbaa | Broşür, Etiket, Kutu | Mavi Basım",
    "desc": "Karabük için broşür, etiket, kutu ve magnet siparişlerinizi planlayın. Baskı seçeneklerini inceleyin. Siparişinizin ölçüsünü ve adedini iletip teklif isteyin.",
    "products": [
      "Broşür",
      "Etiket",
      "Kutu"
    ],
    "evidence": [
      "Broşür",
      "Etiket",
      "Kutu",
      "Magnet"
    ]
  },
  "kilis-matbaa": {
    "title": "Kilis Matbaa | Etiket, Kutu, Magnet | Mavi Basım",
    "desc": "Kilis için etiket, kutu, magnet ve karton çanta baskı seçenekleri. İşletmenize uygun ürünleri inceleyin. İhtiyacınızı ve sipariş adedini ileterek teklif alın.",
    "products": [
      "Etiket",
      "Kutu",
      "Magnet"
    ],
    "evidence": [
      "Etiket",
      "Kutu",
      "Magnet",
      "Karton Çanta"
    ]
  },
  "osmaniye-matbaa": {
    "title": "Osmaniye Matbaa | Kutu, Dosya, Oto Paspas | Mavi Basım",
    "desc": "Osmaniye için kutu, dosya, oto paspas ve Amerikan servis baskılarını inceleyin. Kurumsal ihtiyaçlarınız için ölçü, malzeme ve sipariş adediyle teklif isteyin.",
    "products": [
      "Kutu",
      "Dosya",
      "Oto Paspas"
    ],
    "evidence": [
      "Kutu",
      "Dosya",
      "Oto Paspas",
      "Amerikan Servis"
    ]
  },
  "duzce-matbaa": {
    "title": "Düzce Matbaa | Katalog, Kutu, Karton Çanta | Mavi Basım",
    "desc": "Düzce işletmeleri için katalog, kutu, karton çanta ve kartvizit baskıları. Ürün seçeneklerini inceleyin. İhtiyacınızı ve sipariş adedini ileterek teklif alın.",
    "products": [
      "Katalog",
      "Kutu",
      "Karton Çanta"
    ],
    "evidence": [
      "Katalog",
      "Kutu",
      "Karton Çanta",
      "Kartvizit"
    ]
  }
};

import type { SearchMetadata } from './pageSearchMetadata';

export interface CitySearchContent extends SearchMetadata {
  // Topics checked against the page's rendered text before publication.
  evidence: readonly string[];
}

// Editorial summaries of the actual city-page content. Do not replace this
// with a city-name-only template or invent local offices / delivery promises.
export const CITY_SEARCH_CONTENT: Record<string, CitySearchContent> = {
  "adana-matbaa": {
    "title": "Adana Matbaa | Restoran ve Gıda Ambalaj Baskıları",
    "desc": "Adana restoranları için Amerikan servis ve magnet; gıda ve tarım işletmeleri için etiket ve ambalaj kutusu seçeneklerini inceleyin. Ürün ve adetle teklif alın.",
    "evidence": [
      "restoran",
      "tarım",
      "etiket"
    ]
  },
  "adiyaman-matbaa": {
    "title": "Adıyaman Matbaa | Tekstil ve Turizm için Kurumsal Baskı",
    "desc": "Adıyaman’da tekstil, turizm ve yerel işletmeler için kartvizit, tanıtım broşürü ve ürün kataloğu baskılarını inceleyin. Ebat ve adet bilgisiyle teklif isteyin.",
    "evidence": [
      "tekstil",
      "turizm",
      "katalog"
    ]
  },
  "afyonkarahisar-matbaa": {
    "title": "Afyonkarahisar Matbaa | Gıda Etiketi ve Katalog Baskı",
    "desc": "Afyonkarahisar için gıda etiketi, ambalaj kutusu ve mermer ürün kataloğu seçenekleri. Termal turizm için broşür baskısını inceleyin, detaylı fiyat teklifi alın.",
    "evidence": [
      "gıda",
      "mermer",
      "turizm"
    ]
  },
  "agri-matbaa": {
    "title": "Ağrı Matbaa | Ticari Evrak, Kartvizit ve Broşür Baskı",
    "desc": "Ağrı’daki esnaf ve ticari işletmeler için kartvizit, broşür ve koçanlı makbuz baskıları. Doğubayazıt ve Patnos siparişlerinde ürün bilgisiyle teklif isteyin.",
    "evidence": [
      "esnaf",
      "Doğubayazıt",
      "makbuz"
    ]
  },
  "amasya-matbaa": {
    "title": "Amasya Matbaa | Elma ve Gıda Ambalajı, Etiket Baskı",
    "desc": "Amasya’da elma ve gıda ürünleri için etiket ve kutu; mağazalar için karton çanta baskılarını inceleyin. Ambalaj ölçüsü ve sipariş adedini ileterek teklif alın.",
    "evidence": [
      "elma",
      "gıda",
      "karton çanta"
    ]
  },
  "ankara-matbaa": {
    "title": "Ankara Matbaa | Antetli Kâğıt, Zarf ve Dosya Baskı",
    "desc": "Ankara ofisleri için antetli kâğıt, diplomat zarf, kartvizit ve cepli dosya; işletmelere katalog baskısı. Kurumsal evrak seçeneklerini inceleyip teklif alın.",
    "evidence": [
      "antetli",
      "zarf",
      "dosya"
    ]
  },
  "antalya-matbaa": {
    "title": "Antalya Matbaa | Turizm Broşürü ve Rent A Car Formları",
    "desc": "Antalya otel ve acenteleri için broşür, restoranlara Amerikan servis, rent a car firmalarına araç kiralama formu baskısı. Evrak ve adet bilgisiyle teklif alın.",
    "evidence": [
      "acente",
      "Amerikan servis",
      "araç kiralama"
    ]
  },
  "artvin-matbaa": {
    "title": "Artvin Matbaa | Turizm Broşürü ve Ticari Baskılar",
    "desc": "Artvin’de doğa turizmi ve dış ticaret işletmeleri için tanıtım broşürü, katalog ve kartvizit baskıları. Hopa ve Arhavi siparişlerine ebat ve adetle teklif alın.",
    "evidence": [
      "doğa turizmi",
      "dış ticaret",
      "Hopa"
    ]
  },
  "aydin-matbaa": {
    "title": "Aydın Matbaa | Tarımsal Ürün Etiketi ve Ambalaj Kutusu",
    "desc": "Aydın için zeytin ve tarımsal ürün etiketleri, ambalaj kutuları ve turizm broşürleri. Efeler, Söke ve Kuşadası siparişlerinde ürün ölçüsüne göre teklif isteyin.",
    "evidence": [
      "zeytin",
      "tarımsal",
      "Kuşadası"
    ]
  },
  "balikesir-matbaa": {
    "title": "Balıkesir Matbaa | Zeytinyağı Etiketi ve Gıda Kutusu",
    "desc": "Edremit, Ayvalık zeytinyağı markalarına şişe etiketi; Balıkesir gıda işletmelerine kutu ve restoranlara menü baskısı. Ürün seçeneklerini inceleyip teklif alın.",
    "evidence": [
      "zeytinyağı",
      "Edremit",
      "menü"
    ]
  },
  "bilecik-matbaa": {
    "title": "Bilecik Matbaa | Seramik İşletmelerine Katalog ve Etiket",
    "desc": "Bilecik’in seramik, madencilik ve sanayi işletmeleri için ürün kataloğu, etiket ve baskılar. Bozüyük ve Söğüt siparişlerinde baskı özellikleriyle teklif alın.",
    "evidence": [
      "seramik",
      "madencilik",
      "Bozüyük"
    ]
  },
  "bingol-matbaa": {
    "title": "Bingöl Matbaa | Arıcılık için Etiket ve Ambalaj Baskı",
    "desc": "Bingöl’de arıcılık ve yerel ticaret için ürün etiketi, kutu ve kartvizit seçenekleri. Genç, Solhan ve Karlıova siparişlerinde ölçü ve adetle teklif isteyin.",
    "evidence": [
      "arıcılık",
      "Solhan",
      "Karlıova"
    ]
  },
  "bitlis-matbaa": {
    "title": "Bitlis Matbaa | Bal Etiketi, Broşür ve Sipariş Fişi",
    "desc": "Bitlis ve Tatvan için bal ve gıda etiketi, karton kutu, tanıtım broşürü ve koçanlı sipariş fişi baskısını inceleyin. Nüsha, ebat ve adet bilgisiyle teklif alın.",
    "evidence": [
      "Tatvan",
      "bal",
      "Sipariş Fişi"
    ]
  },
  "bolu-matbaa": {
    "title": "Bolu Matbaa | Gıda Ambalajı ve Turizm Tanıtım Baskıları",
    "desc": "Bolu gıda ve doğa turizmi işletmeleri için kutu, etiket, broşür ve ürün kataloğu baskıları. Gerede ve Mudurnu siparişlerinde ihtiyacınıza uygun teklif isteyin.",
    "evidence": [
      "gıda",
      "doğa turizmi",
      "Gerede"
    ]
  },
  "burdur-matbaa": {
    "title": "Burdur Matbaa | Mermer Kataloğu ve Süt Ürünü Etiketleri",
    "desc": "Burdur’da mermer ihracatçıları, süt ürünleri işletmeleri için katalog, etiket ve ambalaj kutusu seçenekleri. Bucak ve Gölhisar için ölçü ve adetle teklif alın.",
    "evidence": [
      "mermer",
      "süt",
      "Gölhisar"
    ]
  },
  "bursa-matbaa": {
    "title": "Bursa Matbaa | Mobilya Kataloğu ve Tekstil Ambalajı",
    "desc": "Bursa otomotiv, tekstil ve İnegöl mobilya işletmeleri için katalog, etiket ve karton kutu baskıları. Kâğıt, sayfa ve adet seçeneklerini inceleyip teklif alın.",
    "evidence": [
      "otomotiv",
      "tekstil",
      "İnegöl"
    ]
  },
  "canakkale-matbaa": {
    "title": "Çanakkale Matbaa | Peynir Etiketi ve Turizm Broşürü",
    "desc": "Çanakkale için Ezine peynir etiketi, gıda kutusu ve turizm broşürü baskılarını inceleyin. Otel ve restoranlara menü seçenekleri için ölçü ve adetle teklif alın.",
    "evidence": [
      "Ezine",
      "peynir",
      "turizm"
    ]
  },
  "cankiri-matbaa": {
    "title": "Çankırı Matbaa | Kaya Tuzu Etiketi ve Ürün Kutusu",
    "desc": "Çankırı kaya tuzu ve gıda işletmeleri için ürün etiketi, karton kutu ve katalog baskıları. Çerkeş ve Ilgaz siparişlerinde ambalaj ölçüsüyle baskı teklifi alın.",
    "evidence": [
      "kaya tuzu",
      "gıda",
      "Ilgaz"
    ]
  },
  "corum-matbaa": {
    "title": "Çorum Matbaa | Leblebi Kutusu ve Sanayi Kataloğu",
    "desc": "Çorum leblebi ve kuruyemiş markaları için kutu ve etiket; makine işletmeleri için ürün kataloğu baskısı. Ambalaj ve katalog seçeneklerini inceleyip teklif alın.",
    "evidence": [
      "leblebi",
      "makine",
      "katalog"
    ]
  },
  "denizli-matbaa": {
    "title": "Denizli Matbaa | Ev Tekstili Kataloğu ve Ürün Etiketi",
    "desc": "Denizli ev tekstili ve kablo işletmelerine katalog ve ürün etiketi; Pamukkale turizmine tanıtım broşürü. Kâğıt, baskı ve sipariş adediyle fiyat teklifi isteyin.",
    "evidence": [
      "ev tekstili",
      "kablo",
      "Pamukkale"
    ]
  },
  "diyarbakir-matbaa": {
    "title": "Diyarbakır Matbaa | Sağlık ve Ticaret için Kurumsal Baskı",
    "desc": "Diyarbakır’da sağlık, inşaat, ticaret işletmeleri için kartvizit, katalog ve broşür baskıları. Kayapınar, Bağlar ve Yenişehir siparişlerine adetle teklif alın.",
    "evidence": [
      "sağlık",
      "inşaat",
      "Kayapınar"
    ]
  },
  "edirne-matbaa": {
    "title": "Edirne Matbaa | Gıda Etiketi ve Turizm Tanıtım Baskısı",
    "desc": "Edirne’de gıda, sınır ticareti ve turizm için etiket, karton kutu ve tanıtım broşürü seçenekleri. Keşan ve Uzunköprü siparişlerine ürün bilgisiyle teklif alın.",
    "evidence": [
      "sınır",
      "turizm",
      "Uzunköprü"
    ]
  },
  "elazig-matbaa": {
    "title": "Elazığ Matbaa | Gıda Ambalajı ve Ticari Katalog Baskı",
    "desc": "Elazığ mermer, gıda ve bağcılık işletmeleri için etiket, ambalaj kutusu ve katalog baskıları. Kovancılar, Karakoçan siparişlerine ölçü ve adetle teklif isteyin.",
    "evidence": [
      "mermer",
      "bağcılık",
      "Karakoçan"
    ]
  },
  "erzincan-matbaa": {
    "title": "Erzincan Matbaa | Peynir Etiketi ve Kurumsal Evrak Baskı",
    "desc": "Erzincan’da peynir üreticileri, bakırcılık, hizmet işletmeleri için etiket, kartvizit ve koçanlı evrak. Tercan ve Üzümlü siparişlerinde baskı için teklif alın.",
    "evidence": [
      "peynir",
      "bakırcılık",
      "Üzümlü"
    ]
  },
  "erzurum-matbaa": {
    "title": "Erzurum Matbaa | Kış Turizmi ve Restoran Broşürleri",
    "desc": "Erzurum kış turizmi, restoran ve eğitim işletmelerine tanıtım broşürü, kartvizit ve katalog baskıları. Palandöken ve Yakutiye için ebat ve adetle teklif alın.",
    "evidence": [
      "kış turizmi",
      "restoran",
      "Yakutiye"
    ]
  },
  "eskisehir-matbaa": {
    "title": "Eskişehir Matbaa | Sanayi Kataloğu ve Tanıtım Broşürü",
    "desc": "Eskişehir havacılık, raylı sistem ve hizmet işletmeleri için katalog, broşür ve kurumsal baskılar. Tepebaşı ve Odunpazarı siparişlerinde adetle teklif alın.",
    "evidence": [
      "havacılık",
      "raylı",
      "Odunpazarı"
    ]
  },
  "gaziantep-matbaa": {
    "title": "Gaziantep Matbaa | Baklava Kutusu ve Ürün Kataloğu",
    "desc": "Gaziantep gıda ve halı işletmeleri için karton kutu, etiket ve katalog baskı seçenekleri. Şahinbey, Şehitkamil ve Nizip siparişlerine ölçüyle teklif isteyin.",
    "evidence": [
      "baklava",
      "halı",
      "Şahinbey"
    ]
  },
  "giresun-matbaa": {
    "title": "Giresun Matbaa | Fındık Ambalajı ve Gıda Etiketi",
    "desc": "Giresun fındık ve gıda işletmelerine etiket, ambalaj kutusu ve tanıtım kataloğu baskıları. Bulancak, Espiye ve Görele için ürün ölçüsü ve adediyle teklif alın.",
    "evidence": [
      "fındık",
      "gıda",
      "Espiye"
    ]
  },
  "gumushane-matbaa": {
    "title": "Gümüşhane Matbaa | Pestil ve Köme için Etiket, Kutu",
    "desc": "Gümüşhane pestil ve köme ürünlerine etiket ve karton kutu, yerel işletmelere kartvizit baskısı. Kelkit ve Şiran siparişlerinde ambalaj ölçüsüyle teklif alın.",
    "evidence": [
      "pestil",
      "köme",
      "Kelkit"
    ]
  },
  "hakkari-matbaa": {
    "title": "Hakkari Matbaa | Sınır Ticareti için Kurumsal Baskılar",
    "desc": "Hakkari’de sınır ticareti, madencilik ve işletmeler için kartvizit, katalog ve makbuz baskısı. Yüksekova ve Şemdinli siparişlerine ebat ve adetle teklif alın.",
    "evidence": [
      "sınır ticareti",
      "madencilik",
      "Yüksekova"
    ]
  },
  "hatay-matbaa": {
    "title": "Hatay Matbaa | Restoran Ambalajı ve Ticari Katalog",
    "desc": "Hatay restoran, lojistik ve sanayi işletmelerine ambalaj kutusu, etiket ve ürün kataloğu baskıları. Antakya ve İskenderun için baskı bilgisiyle teklif isteyin.",
    "evidence": [
      "restoran",
      "lojistik",
      "İskenderun"
    ]
  },
  "isparta-matbaa": {
    "title": "Isparta Matbaa | Kozmetik Kutusu ve Gıda Etiketi",
    "desc": "Isparta’da gül ve kozmetik ürünleri için etiket ve kutu; elmacılık işletmelerine ambalaj baskısı. Eğirdir ve Yalvaç siparişlerinde ürün ölçüsüyle teklif alın.",
    "evidence": [
      "gül",
      "kozmetik",
      "Eğirdir"
    ]
  },
  "mersin-matbaa": {
    "title": "Mersin Matbaa | Gıda Ambalajı ve Lojistik Baskıları",
    "desc": "Mersin gıda ve paketleme işletmelerine kutu ve etiket; restoranlara Amerikan servis ve magnet baskıları. Lojistik ve tanıtım işleriniz için fiyat teklifi alın.",
    "evidence": [
      "gıda",
      "lojistik",
      "Amerikan servis"
    ]
  },
  "istanbul-matbaa": {
    "title": "İstanbul Matbaa | Kurumsal Evrak ve E-Ticaret Ambalajı",
    "desc": "İstanbul şirketleri için kartvizit, katalog, kurumsal evrak; e-ticaret markalarına kutu ve etiket baskısı. Topkapı hizmet noktasından sipariş için teklif alın.",
    "evidence": [
      "şirket",
      "E-Ticaret",
      "evrak"
    ]
  },
  "izmir-matbaa": {
    "title": "İzmir Matbaa | Ürün Etiketi, Karton Çanta ve Katalog",
    "desc": "İzmir gıda ve perakende işletmelerine etiket, karton çanta ve kutu; sanayi firmalarına katalog baskısı. Malzeme, ebat ve sipariş adedini belirleyip teklif alın.",
    "evidence": [
      "perakende",
      "sanayi",
      "karton çanta"
    ]
  },
  "kars-matbaa": {
    "title": "Kars Matbaa | Peynir Ambalajı ve Turizm Broşürleri",
    "desc": "Kars peynir işletmeleri için etiket ve ürün kutusu; kültür ve kış turizmine tanıtım broşürü baskısı. Sarıkamış ve Kağızman için ürün bilgisiyle teklif isteyin.",
    "evidence": [
      "peynir",
      "kış",
      "Sarıkamış"
    ]
  },
  "kastamonu-matbaa": {
    "title": "Kastamonu Matbaa | Sarımsak ve Pirinç Ambalaj Baskıları",
    "desc": "Kastamonu için Taşköprü sarımsağı ve Tosya pirincine yönelik etiket ve kutu seçenekleri. Ahşap işletmelerine katalog baskısını inceleyin, ölçüyle teklif alın.",
    "evidence": [
      "Taşköprü",
      "sarımsak",
      "pirinç"
    ]
  },
  "kayseri-matbaa": {
    "title": "Kayseri Matbaa | Mobilya Kataloğu ve Gıda Ambalajı",
    "desc": "Kayseri mobilya ve çelik kapı işletmeleri için katalog, gıda markalarına kutu ve etiket baskısı. Melikgazi ve Kocasinan için malzeme ve adetle teklif isteyin.",
    "evidence": [
      "mobilya",
      "çelik kapı",
      "Kocasinan"
    ]
  },
  "kirklareli-matbaa": {
    "title": "Kırklareli Matbaa | Süt Ürünü Etiketi ve Tekstil Baskıları",
    "desc": "Kırklareli mandıra ve süt ürünlerine etiket ve ambalaj; tekstil işletmelerine katalog seçenekleri. Lüleburgaz ve Babaeski için baskı bilgileriyle teklif alın.",
    "evidence": [
      "mandıra",
      "tekstil",
      "Babaeski"
    ]
  },
  "kirsehir-matbaa": {
    "title": "Kırşehir Matbaa | Ceviz Ambalajı ve Kurumsal Baskılar",
    "desc": "Kırşehir’de Kaman cevizi paketleme ve ticaret işletmelerine etiket, kutu ve kartvizit baskıları. Kaman ve Mucur siparişlerinde ebat ve adetle teklif isteyin.",
    "evidence": [
      "Kaman",
      "cevizi",
      "Mucur"
    ]
  },
  "kocaeli-matbaa": {
    "title": "Kocaeli Matbaa | Sanayi Kataloğu, Etiket ve Ticari Evrak",
    "desc": "Kocaeli sanayi ve ticaret firmaları için ürün kataloğu, etiket ve koçanlı makbuz baskıları. İzmit, Gebze ve Çayırova siparişlerine ürün ve adetle teklif alın.",
    "evidence": [
      "sanayi",
      "Gebze",
      "Çayırova"
    ]
  },
  "konya-matbaa": {
    "title": "Konya Matbaa | Tarım Makinesi Kataloğu ve Ürün Etiketi",
    "desc": "Konya’da tarım makineleri ve otomotiv yedek parça işletmeleri için katalog, etiket ve ambalaj kutusu baskısı. Sayfa, malzeme ve adet seçenekleriyle teklif alın.",
    "evidence": [
      "tarım makineleri",
      "otomotiv",
      "katalog"
    ]
  },
  "kutahya-matbaa": {
    "title": "Kütahya Matbaa | Porselen İşletmelerine Katalog ve Kutu",
    "desc": "Kütahya çini ve porselen işletmeleri için ürün kataloğu, etiket ve karton kutu baskıları. Tavşanlı, Simav ve Gediz siparişlerinde ebat ve adetle teklif isteyin.",
    "evidence": [
      "çini",
      "porselen",
      "Gediz"
    ]
  },
  "malatya-matbaa": {
    "title": "Malatya Matbaa | Kayısı Kutusu ve Gıda Etiketi Baskı",
    "desc": "Malatya kayısı ve gıda markaları için ambalaj kutusu ve ürün etiketi; tekstil işletmelerine katalog baskısı. Battalgazi ve Yeşilyurt için ölçüyle teklif alın.",
    "evidence": [
      "kayısı",
      "tekstil",
      "Yeşilyurt"
    ]
  },
  "manisa-matbaa": {
    "title": "Manisa Matbaa | Beyaz Eşya Kataloğu ve Zeytin Etiketi",
    "desc": "Manisa elektronik ve beyaz eşya işletmelerine katalog, Akhisar zeytin markalarına etiket ve kutu baskısı. Yunusemre ve Turgutlu için ürün ve adetle teklif alın.",
    "evidence": [
      "beyaz eşya",
      "Akhisar",
      "zeytin"
    ]
  },
  "kahramanmaras-matbaa": {
    "title": "Kahramanmaraş Matbaa | Tekstil Kataloğu ve Gıda Ambalajı",
    "desc": "Kahramanmaraş tekstil ve mutfak eşyası işletmelerine katalog, gıda markalarına etiket ve karton ambalaj. Onikişubat ve Elbistan için adetle baskı teklifi alın.",
    "evidence": [
      "tekstil",
      "mutfak",
      "Elbistan"
    ]
  },
  "mardin-matbaa": {
    "title": "Mardin Matbaa | Sabun Etiketi ve Yöresel Ambalaj Kutusu",
    "desc": "Mardin’de bıttım sabunu ve yöresel ürünler için etiket ve kutu; konak otel ve restoranlara menü baskısı. Ambalaj ve tanıtım seçeneklerini inceleyip teklif alın.",
    "evidence": [
      "Bıttım",
      "otel",
      "menü"
    ]
  },
  "mugla-matbaa": {
    "title": "Muğla Matbaa | Otel, Marina ve Araç Kiralama Baskıları",
    "desc": "Muğla otel ve marinalarına broşür, restoranlara Amerikan servis, araç kiralama firmalarına sözleşme baskısı. Bodrum ve Fethiye siparişleri için teklif isteyin.",
    "evidence": [
      "marina",
      "araç kiralama",
      "Fethiye"
    ]
  },
  "mus-matbaa": {
    "title": "Muş Matbaa | Tarım ve Ticaret için Etiket, Evrak Baskı",
    "desc": "Muş tarım, hayvancılık ve ticaret işletmeleri için ürün etiketi, kartvizit ve koçanlı makbuz seçenekleri. Bulanık ve Malazgirt siparişlerine adetle teklif alın.",
    "evidence": [
      "hayvancılık",
      "Bulanık",
      "Malazgirt"
    ]
  },
  "nevsehir-matbaa": {
    "title": "Nevşehir Matbaa | Turizm Broşürü ve Hediyelik Ambalajı",
    "desc": "Nevşehir’de Kapadokya otelleri ve balon acentelerine broşür, çömlekçilik ve gıda işletmelerine kutu baskısı. Ürgüp ve Avanos için ürün bilgisiyle teklif alın.",
    "evidence": [
      "Kapadokya",
      "balon",
      "Avanos"
    ]
  },
  "nigde-matbaa": {
    "title": "Niğde Matbaa | Elma ve Patates İşletmelerine Etiket Baskı",
    "desc": "Niğde’de elma ve patates işletmeleri için ambalaj etiketi, ürün kutusu ve kurumsal katalog seçenekleri. Bor siparişlerinde malzeme, ölçü ve adetle teklif alın.",
    "evidence": [
      "elma",
      "patates",
      "Bor"
    ]
  },
  "ordu-matbaa": {
    "title": "Ordu Matbaa | Fındık Etiketi, Ambalaj ve Tanıtım Baskısı",
    "desc": "Ordu fındık ve gıda markalarına etiket ve kutu; restoran ve mağazalara broşür, magnet ve karton çanta baskısı. Ünye ve Fatsa için ürün bilgisiyle teklif alın.",
    "evidence": [
      "fındık",
      "mağaza",
      "Fatsa"
    ]
  },
  "rize-matbaa": {
    "title": "Rize Matbaa | Çay Ambalajı ve Turizm Tanıtım Ürünleri",
    "desc": "Rize çay ve gıda işletmelerine ambalaj kutusu ve etiket; turizm işletmelerine broşür ve karton çanta baskısı. Çayeli ve Ardeşen siparişleri için teklif isteyin.",
    "evidence": [
      "çay",
      "turizm",
      "Ardeşen"
    ]
  },
  "sakarya-matbaa": {
    "title": "Sakarya Matbaa | Otomotiv Kataloğu ve Kurumsal Evrak",
    "desc": "Sakarya otomotiv, vagon ve süs bitkisi işletmeleri için katalog, etiket ve kurumsal evrak baskısı. Adapazarı ve Hendek siparişlerine ebat ve adetle teklif alın.",
    "evidence": [
      "otomotiv",
      "süs bitkisi",
      "Hendek"
    ]
  },
  "samsun-matbaa": {
    "title": "Samsun Matbaa | Gıda Etiketi, Katalog ve Servis Baskıları",
    "desc": "Samsun gıda ve sanayi işletmelerine etiket, kutu ve katalog; araç servislerine oto paspas ve form baskıları. Bafra ve Tekkeköy için ürün bilgisiyle teklif alın.",
    "evidence": [
      "sanayi",
      "oto paspas",
      "Bafra"
    ]
  },
  "siirt-matbaa": {
    "title": "Siirt Matbaa | Fıstık ve Bal Etiketi, Ürün Kutusu Baskı",
    "desc": "Siirt fıstığı ve Pervari balı için etiket ve ambalaj kutusu; battaniye işletmelerine katalog baskısı. Kurtalan siparişlerinde ürün ve adetle teklif isteyin.",
    "evidence": [
      "fıstığı",
      "Pervari",
      "battaniye"
    ]
  },
  "sinop-matbaa": {
    "title": "Sinop Matbaa | Su Ürünü Etiketi ve Turizm Baskıları",
    "desc": "Sinop konaklama ve restoran işletmelerine menü ve broşür; su ürünleri firmalarına etiket ve kutu baskısı. Gerze ve Ayancık siparişlerinde ölçüyle teklif alın.",
    "evidence": [
      "konaklama",
      "su ürünleri",
      "Ayancık"
    ]
  },
  "sivas-matbaa": {
    "title": "Sivas Matbaa | Teknik Katalog ve Kurumsal Evrak Baskısı",
    "desc": "Sivas demiryolu, medikal ve sanayi firmalarına ürün kataloğu, kartvizit ve koçanlı evrak baskıları. Şarkışla ve Suşehri için ebat ve adetle fiyat teklifi alın.",
    "evidence": [
      "demiryolu",
      "medikal",
      "Şarkışla"
    ]
  },
  "tekirdag-matbaa": {
    "title": "Tekirdağ Matbaa | Tekstil Kataloğu ve Gıda Ambalajı",
    "desc": "Tekirdağ tekstil, un ve yağ işletmelerine katalog, ambalaj kutusu ve etiket baskısı. Çorlu, Çerkezköy ve Kapaklı siparişlerine ürün ölçüsüyle teklif isteyin.",
    "evidence": [
      "tekstil",
      "un",
      "Çerkezköy"
    ]
  },
  "tokat-matbaa": {
    "title": "Tokat Matbaa | Gıda Etiketi ve Tekstil Tanıtım Baskısı",
    "desc": "Tokat tekstil ve gıda işletmeleri için katalog, ambalaj etiketi ve karton kutu baskıları. Erbaa, Niksar ve Turhal siparişlerine ölçü ve adetle teklif alın.",
    "evidence": [
      "tekstil",
      "Niksar",
      "Turhal"
    ]
  },
  "trabzon-matbaa": {
    "title": "Trabzon Matbaa | Konaklama Broşürü ve Gıda Ambalajı",
    "desc": "Trabzon konaklama ve restoran işletmelerine broşür ve menü; yöresel gıda markalarına etiket ve kutu baskısı. Akçaabat ve Yomra için ürün bilgisiyle teklif alın.",
    "evidence": [
      "konaklama",
      "yöresel",
      "Yomra"
    ]
  },
  "tunceli-matbaa": {
    "title": "Tunceli Matbaa | Bal ve Bakliyat Etiketi, Turizm Broşürü",
    "desc": "Tunceli bal ve bakliyat işletmeleri için etiket ve karton kutu; doğa turizmine broşür baskıları. Ovacık ve Pertek siparişlerinde ürün ve adetle teklif isteyin.",
    "evidence": [
      "bal",
      "bakliyat",
      "Pertek"
    ]
  },
  "sanliurfa-matbaa": {
    "title": "Şanlıurfa Matbaa | İsot Ambalajı ve Turizm Broşürleri",
    "desc": "Şanlıurfa’da isot ve tarımsal ürünlere etiket ve kutu; turizm işletmelerine tanıtım broşürü baskısı. Haliliye ve Karaköprü için ürün ölçüsüyle teklif isteyin.",
    "evidence": [
      "isot",
      "turizm",
      "Karaköprü"
    ]
  },
  "usak-matbaa": {
    "title": "Uşak Matbaa | Deri ve Tekstil için Katalog, Etiket Baskı",
    "desc": "Uşak deri, tekstil ve battaniye işletmelerine ürün kataloğu, etiket ve karton ambalaj seçenekleri. Banaz ve Eşme siparişlerinde baskı ve adetle teklif isteyin.",
    "evidence": [
      "deri",
      "tekstil",
      "Eşme"
    ]
  },
  "van-matbaa": {
    "title": "Van Matbaa | Otlu Peynir Etiketi ve Kahvaltı Menü Baskısı",
    "desc": "Van’da otlu peynir ve bal için etiket ve kutu; kahvaltı salonları ve otellere menü ve broşür baskısı. İpekyolu ve Erciş siparişlerinde ürünle teklif isteyin.",
    "evidence": [
      "otlu peynir",
      "kahvaltı",
      "Erciş"
    ]
  },
  "yozgat-matbaa": {
    "title": "Yozgat Matbaa | Tarım ve Gıda için Ambalaj Baskıları",
    "desc": "Yozgat tarım, gıda ve ticaret işletmelerine ürün etiketi, kutu ve kurumsal kartvizit baskıları. Sorgun ve Akdağmadeni için ebat ve adetle fiyat teklifi isteyin.",
    "evidence": [
      "tarım",
      "gıda",
      "Akdağmadeni"
    ]
  },
  "zonguldak-matbaa": {
    "title": "Zonguldak Matbaa | Sanayi Kataloğu ve Ürün Etiketleri",
    "desc": "Zonguldak demir-çelik ve ticaret firmaları için katalog, etiket ve kurumsal baskılar. Ereğli, Çaycuma ve Devrek siparişlerinde ürün ve adetle teklif isteyin.",
    "evidence": [
      "demir",
      "Çaycuma",
      "Devrek"
    ]
  },
  "aksaray-matbaa": {
    "title": "Aksaray Matbaa | Otomotiv Kataloğu ve Süt Ürünü Etiketi",
    "desc": "Aksaray otomotiv ve süt ürünleri işletmelerine katalog, kartvizit ve ambalaj etiketi baskıları. Eskil ve Ortaköy siparişlerinde ölçü ve adetle teklif isteyin.",
    "evidence": [
      "otomotiv",
      "süt",
      "Ortaköy"
    ]
  },
  "bayburt-matbaa": {
    "title": "Bayburt Matbaa | Doğal Taş Kataloğu ve Kurumsal Baskı",
    "desc": "Bayburt mermer, doğal taş ve kurumsal işletmeler için ürün kataloğu, broşür ve kartvizit. Aydıntepe ve Demirözü siparişlerinde baskı bilgisiyle teklif alın.",
    "evidence": [
      "mermer",
      "doğal taş",
      "Demirözü"
    ]
  },
  "karaman-matbaa": {
    "title": "Karaman Matbaa | Bisküvi ve Çikolata Ambalaj Baskıları",
    "desc": "Karaman’da bisküvi, çikolata ve gıda markaları için etiket ve karton ambalaj kutusu seçenekleri. Ermenek siparişlerinde ürün ölçüsü ve adediyle teklif isteyin.",
    "evidence": [
      "bisküvi",
      "çikolata",
      "Ermenek"
    ]
  },
  "kirikkale-matbaa": {
    "title": "Kırıkkale Matbaa | Makine Kataloğu ve Kurumsal Evrak",
    "desc": "Kırıkkale makine ve çelik işletmelerine ürün kataloğu, kartvizit ve koçanlı evrak baskısı. Yahşihan ve Keskin siparişlerinde kâğıt, ebat ve adetle teklif alın.",
    "evidence": [
      "makine",
      "çelik",
      "Yahşihan"
    ]
  },
  "batman-matbaa": {
    "title": "Batman Matbaa | Hazır Giyim Kataloğu ve Ticari Evrak",
    "desc": "Batman hazır giyim, gıda ve yapı işletmelerine katalog, etiket ve koçanlı evrak baskıları. Kozluk ve Sason siparişlerinde ürün, ölçü ve adetle teklif isteyin.",
    "evidence": [
      "hazır giyim",
      "gıda",
      "Kozluk"
    ]
  },
  "sirnak-matbaa": {
    "title": "Şırnak Matbaa | Sınır Ticareti için Katalog ve Makbuz",
    "desc": "Şırnak’ta sınır ticareti, lojistik ve yerel firmalara katalog, kartvizit ve makbuz baskısı. Cizre ve Silopi siparişlerinde evrak ve adet bilgisiyle teklif alın.",
    "evidence": [
      "sınır ticareti",
      "Cizre",
      "Silopi"
    ]
  },
  "bartin-matbaa": {
    "title": "Bartın Matbaa | Amasra Turizmi ve Sanayi Tanıtım Baskısı",
    "desc": "Bartın’da Amasra turizmine broşür ve kartvizit, tekne ve sanayi işletmelerine ürün kataloğu baskısı. Ulus siparişlerinde sayfa ve adet bilgisiyle teklif alın.",
    "evidence": [
      "Amasra",
      "tekne",
      "Ulus"
    ]
  },
  "ardahan-matbaa": {
    "title": "Ardahan Matbaa | Kaşar Etiketi ve Ticari Baskı Ürünleri",
    "desc": "Ardahan’da Göle kaşarı için ambalaj etiketi ve kutu; yerel esnafa kartvizit ve makbuz baskıları. Posof siparişlerinde ürün ölçüsü ve adetle fiyat teklifi alın.",
    "evidence": [
      "Göle",
      "kaşarı",
      "Posof"
    ]
  },
  "igdir-matbaa": {
    "title": "Iğdır Matbaa | Kayısı Kutusu ve Tarımsal Ürün Etiketi",
    "desc": "Iğdır kayısı ve tarım işletmelerine karton kutu ve ürün etiketi; ticari firmalara katalog baskısı. Aralık ve Tuzluca siparişlerine ebat ve adetle teklif alın.",
    "evidence": [
      "kayısı",
      "tarımsal",
      "Tuzluca"
    ]
  },
  "yalova-matbaa": {
    "title": "Yalova Matbaa | Çiçekçilik Etiketi ve Turizm Broşürü",
    "desc": "Yalova çiçekçilik ve seracılık işletmelerine etiket, termal turizme broşür ve katalog baskısı. Altınova ve Çiftlikköy için ürün ölçüsü ve adetle teklif isteyin.",
    "evidence": [
      "çiçekçilik",
      "termal",
      "Çiftlikköy"
    ]
  },
  "karabuk-matbaa": {
    "title": "Karabük Matbaa | Lokum Kutusu ve Sanayi Kataloğu",
    "desc": "Karabük için Safranbolu lokum kutuları, turizm broşürleri ve sanayi ürün katalogları. Yenice siparişlerinde kâğıt, ambalaj ölçüsü ve adetle baskı teklifi alın.",
    "evidence": [
      "Safranbolu",
      "lokum",
      "Yenice"
    ]
  },
  "kilis-matbaa": {
    "title": "Kilis Matbaa | Zeytinyağı ve Sabun Etiketi Baskısı",
    "desc": "Kilis’te zeytinyağı ve sabun markaları için ürün etiketi, karton kutu ve tanıtım broşürü. Elbeyli siparişlerinde ambalaj ölçüsü ve adetle fiyat teklifi isteyin.",
    "evidence": [
      "zeytinyağı",
      "sabun",
      "Elbeyli"
    ]
  },
  "osmaniye-matbaa": {
    "title": "Osmaniye Matbaa | Tarım, Gıda ve Sanayi Baskıları",
    "desc": "Osmaniye tarım ve gıda işletmelerine etiket ve kutu; sanayi firmalarına katalog ve form baskısı. Kadirli ve Düziçi için ürün ve sipariş adediyle teklif isteyin.",
    "evidence": [
      "tarım",
      "sanayi",
      "Kadirli"
    ]
  },
  "duzce-matbaa": {
    "title": "Düzce Matbaa | Fındık Etiketi ve Otomotiv Kataloğu",
    "desc": "Düzce fındık ve otomotiv işletmeleri için etiket ve ürün kataloğu, Akçakoca turizmine broşür baskısı. Gümüşova siparişlerine ebat ve adetle fiyat teklifi alın.",
    "evidence": [
      "fındık",
      "otomotiv",
      "Akçakoca"
    ]
  }
};

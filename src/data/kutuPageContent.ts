export interface KutuFaqItem {
  q: string;
  a: string;
}

export interface KutuH3Item {
  id: string;
  title: string;
  description: string;
  details?: string[];
}

export interface KutuH2Section {
  id: string;
  h2Title: string;
  subtitle: string;
  badge?: string;
  subsections: KutuH3Item[];
}

export interface KutuGalleryItem {
  id: string;
  title: string;
  img: string;
  desc: string;
  tag: string;
}

export const KUTU_SEO_METADATA = {
  title: "Karton Kutu Baskı & Özel Kesim Ambalaj Kutusu Fiyatları | Mavi Basım",
  desc: "Kozmetik, gıda dışı ürün, tekstil, hediyelik ve perakende ürünleri için Bristol veya kroma karton kutu baskısı. Ölçü, adet ve yüzey seçeneklerine göre teklif alın.",
  ogDescription: "Bristol, kroma ve kraft karton kutu seçenekleri; özel ölçü, baskı ve yüzey uygulamalarına göre teklif alın.",
  canonical: "https://mavibasim.com/kutu",
  h1: "Özel Kesim Ambalaj Kutusu & Karton Kutu Baskı Fiyatları",
  ogImage: "https://mavibasim.com/images/kutu/ozel-kesim-kutu-tasarimi.webp"
};

export const KUTU_FAQS: KutuFaqItem[] = [
  {
    q: "Kutu baskısında hangi karton türleri kullanılabilir?",
    a: "Kutu baskısı ve hazırlığında ağırlıklı olarak Amerikan Bristol ve kroma karton tercih edilir. Amerikan Bristol karton; çift yüzeyi beyaz, pürüzsüz yapısı ve renk doygunluğu ile kozmetik, hediyelik, tekstil ve perakende ürün ambalajlarında yaygın olarak tercih edilir. Kroma kartonun yüzey, arka yüz rengi ve lif yapısı tedarik edilen karton türüne göre değişebilir. Kullanılacak kartonun teknik özellikleri sipariş öncesinde değerlendirilmelidir. Bütçe ve tiraj dengesi; karton, ölçü, montaj, adet ve yüzey uygulamalarına göre değişir. Kraft veya özel dokulu karton seçenekleri; ürün ölçüsü, kullanım amacı, sipariş adedi ve tedarik durumuna göre ayrıca değerlendirilebilir."
  },
  {
    q: "300, 350 ve 400 gr Bristol arasından nasıl seçim yapılır?",
    a: "Karton gramajı; ürünün ölçüsü, ağırlığı, kutu geometrisi, taban ve kapak yapısı ile separatör ihtiyacı birlikte değerlendirilerek seçilir. 300 gr Bristol daha hafif ürün kutularında, 350 gr daha tok gövde istenen birçok perakende ambalajında, 400 gr ise daha yüksek rijitlik beklentisi bulunan projelerde değerlendirilebilir. Cam şişe ve kavanozlarda gramaj tek başına yeterli bir ölçüt değildir; ürün ağırlığı, kutu ölçüsü, taban yapısı ve iç destek ihtiyacı birlikte değerlendirilmelidir."
  },
  {
    q: "Kutu baskısında minimum sipariş adedi nasıl belirlenir?",
    a: "Özel bıçak hazırlığı, kalıp ve baskı öncesi hazırlık süreçleri nedeniyle kutu baskısı ve hazırlığında ekonomik birim maliyet dengesi genellikle 1.000 adet ve üzeri siparişlerde sağlanır. Özel projeler ve farklı tiraj gereksinimleri için talebinize uygun olarak özel teklif hazırlanabilir."
  },
  {
    q: "Özel ölçülü kutu için hangi bilgiler gerekir?",
    a: "Özel ölçülü kutu teklifi oluşturulabilmesi için kutunun en, boy ve yükseklik (iç veya dış) ölçüleri, içerisine yerleştirilecek ürünün yapısı ve ağırlığı, tercih edilen karton cinsi ve gramajı, baskı renk adedi ile kapak ve kilit tipi bilgilerinin iletilmesi gereklidir."
  },
  {
    q: "Kutu baskı fiyatını hangi özellikler belirler?",
    a: "Kutu ölçüsü ve açık tabaka ebadı, sipariş adedi, seçilen karton türü (Bristol/Kroma) ve gramajı (230–400 gr), baskı renk sayısı, koruyucu laminasyon türü (mat, parlak, Soft Touch) ile gofre kabartma, varak yaldız ve bölgesel lak gibi ek yüzey uygulamaları fiyatlandırmayı belirleyen temel unsurlardır."
  },
  {
    q: "Mat selefon, parlak selefon, varak ve gofre uygulanabilir mi?",
    a: "Evet. Dış yüzeyin korunmasına yardımcı olmak ve estetik görünüm sağlamak için mat veya parlak selefon kaplama, kadifemsi bir doku için Soft Touch selefon uygulanabilir. Marka logosu veya özel detaylar üzerine altın/gümüş varak yaldız, 3D gofre kabartma ve bölgesel parlaklık sağlayan lokal UV lak uygulamaları yapılabilir."
  },
  {
    q: "Baskıdan önce PDF prova gönderiliyor mu?",
    a: "Evet. Baskıya hazır tasarım dosyanızın kesim çizgileri, katlama payları, taşma payı ve mizanpajı teknik kontrolden geçirilerek dijital PDF prova hazırlanır. Dijital PDF prova yerleşim ve metin kontrolü için kullanılır; fiziksel baskı rengini ve karton yapısını birebir garanti etmez. Onayınız alındıktan sonra baskı ve kesim sürecine geçilir."
  },
  {
    q: "Fiziksel numune veya maket her siparişte hazırlanıyor mu?",
    a: "Standart sipariş süreçlerinde dijital PDF prova üzerinden onay alınarak ilerlenir. Sıfırdan grafik tasarım ve kapsamlı revizyonlar ayrıca fiyatlandırılabilir. Fiziksel numune, maket, özel bıçak ve kalıp ihtiyacı ise siparişin adet ve teknik özelliklerine göre teklif aşamasında ayrıca değerlendirilir."
  },
  {
    q: "Doğrudan gıda teması olan kutularda malzeme nasıl seçilir?",
    a: "Doğrudan gıda temasının bulunduğu projelerde kâğıt, karton, kaplama ve mürekkep seçimi; ürünün sıcaklık, yağ, nem ve kullanım süresi gibi koşulları ile tedarikçi belgelerine göre ayrıca değerlendirilmelidir. Standart karton kutu çözümleri genellikle dış ambalaj ve ikincil paketleme amaçlıdır."
  },
  {
    q: "Türkiye geneline gönderim yapılıyor mu?",
    a: "Evet. İstanbul Topkapı hizmet ve koordinasyon noktamız üzerinden koordine edilen siparişler, koruyucu ambalajlama sonrasında anlaşmalı kargo ve lojistik firmaları aracılığıyla Türkiye'nin tüm illerine sevk edilmektedir. Hazırlık ve gönderim süresi; kutunun ölçüsü, sipariş adedi, karton türü, kalıp ihtiyacı, yüzey uygulamaları ve onay sürecine göre teklif aşamasında belirlenir."
  }
];

export const KUTU_GALLERY: KutuGalleryItem[] = [
  {
    id: "img-1",
    title: "Özel Tasarım Ürün Kutusu Baskısı",
    img: "/images/kutu/urun-kutusu-baski.webp",
    desc: "350 gr Amerikan Bristol Karton, Soft Touch kadife selefon, 3D gofre kabartma ve dore altın varak yaldız uygulaması.",
    tag: "Ürün Kutusu"
  },
  {
    id: "img-2",
    title: "Butik Baklava & Çikolata Kutusu",
    img: "/images/kutu/butik-baklava-cikolata-kutusu.webp",
    desc: "300 gr Amerikan Bristol, dış yüzey mat selefon, şık sunumlu dış ambalaj kutusu çözümü.",
    tag: "Baklava & Tatlı"
  },
  {
    id: "img-3",
    title: "Karton Kutu Baskı Modelleri",
    img: "/images/kutu/karton-kutu-baski-fiyatlari.webp",
    desc: "350 gr Kroma Karton, parlak selefon kaplama, pratik kurulum sağlayan otomatik kilitli dip (oto kilit) yapısı.",
    tag: "Karton Kutu"
  },
  {
    id: "img-4",
    title: "Özel Kesim Kutu Tasarımı",
    img: "/images/kutu/ozel-kesim-kutu-tasarimi.webp",
    desc: "400 gr Amerikan Bristol Karton, kulaklı geçmeli kapak, mat selefon ve gümüş varak yaldız detayları.",
    tag: "Özel Kesim"
  },
  {
    id: "img-5",
    title: "Lüks Hediyelik Kutu Örneği",
    img: "/images/kutu/hediyelik-kutu-ornegi.webp",
    desc: "350 gr Amerikan Bristol, kadife dokulu Soft Touch selefon, bölgesel parlaklık katan lokal UV lak.",
    tag: "Hediyelik Kutu"
  },
  {
    id: "img-6",
    title: "Kutu Baskı ve Katlama Detayı",
    img: "/images/kutu/kutu-baski-detayi.webp",
    desc: "300 gr Kroma Karton, ters kilit dip yapısı, net katlama ve pilyaj hatlarıyla montaj uygulaması.",
    tag: "Baskı Detayı"
  },
  {
    id: "img-7",
    title: "Gıda & Restoran Dış Ambalaj Kutusu",
    img: "/images/kutu/gida-ambalaji-baski-ornegi.webp",
    desc: "350 gr Amerikan Bristol Karton, mat selefon kaplama, paket servis ve dış ambalaj koruması.",
    tag: "Dış Ambalaj"
  },
  {
    id: "img-8",
    title: "Özel Ürün Ambalaj Tasarımı",
    img: "/images/kutu/urun-ambalaj-tasarimi.webp",
    desc: "400 gr Amerikan Bristol, çift yüz mat selefon, 3D gofre kabartma ve damla lokal UV lak uygulaması.",
    tag: "Ürün Ambalajı"
  },
  {
    id: "img-9",
    title: "Kuşe Ambalaj Baskı Örnekleri",
    img: "/images/kutu/kuse-ambalaj-baski.webp",
    desc: "250 gr Kuşe kağıt üzerine ofset baskı ve koruyucu yüzey selefonu.",
    tag: "Kuşe Ambalaj"
  },
  {
    id: "img-10",
    title: "Ambalaj Tasarımı ve Ofset Baskı",
    img: "/images/kutu/ambalaj-tasarimi-ve-baski.webp",
    desc: "300 gr Amerikan Bristol, perfore koparma hatlı kilit mekanizması ve dış koruyucu yüzey.",
    tag: "Ambalaj Baskı"
  },
  {
    id: "img-11",
    title: "Toptan Ambalaj ve Kutu Çözümleri",
    img: "/images/kutu/ambalaj-baski-fiyatlari.webp",
    desc: "300 gr Amerikan Bristol Karton, koruyucu dış kaplama ve pratik katlamalı kutu çözümleri.",
    tag: "Toptan Teklif"
  }
];

// The exactly 9 descriptive H2 sections + 1 FAQ section = 10 H2 Sections
export const KUTU_H2_SECTIONS: KutuH2Section[] = [
  {
    id: "fiyat-ve-teklif",
    h2Title: "Karton Kutu Baskısı ve Fiyat Teklifi",
    subtitle: "Standart model seçeneklerine göre kutu modelleri, teknik özellikler ve kurumsal teklif süreci.",
    badge: "Model & Teklif Bilgileri",
    subsections: [
      {
        id: "standart-kutu-fiyatlari",
        title: "Standart Kutu Modelleri ve Teklif Bilgileri",
        description: "Standart ürün kutusu ve ambalaj modellerimiz 1.000 adetlik paketler için tekliflendirilmektedir. Listede yer alan modeller standart özellikler içindir; özel ölçü, gramaj ve ek yüzey uygulamalarına göre özel teklif hazırlanmaktadır.",
        details: [
          "KUTU1: Dürüm Kutusu (5,5x5,5x30 cm) - 300 gr Bristol, Mat Selefon, 1.000 Adet",
          "KUTU2: Hamburger Kutusu (11x11x8 cm) - 250 gr Bristol, Mat Selefon, 1.000 Adet",
          "KUTU3: Cips & Atıştırmalık Kutusu (9x11x4 cm) - 250 gr Bristol, Mat Selefon, 1.000 Adet",
          "KUTU4: Popcorn Kutusu (8,5x8,5x15 cm) - 250 gr Bristol, Mat Selefon, 1.000 Adet",
          "KUTU5: Baklava Kutusu (20x25x4 cm) - 350 gr Kroma, Mat Selefon, 1.000 Adet",
          "KUTU6: Tatlı & Kurabiye Kutusu (15x15x6 cm) - 300 gr Kroma, Mat Selefon, 1.000 Adet",
          "KUTU7: Pasta Kutusu (24x24x12 cm) - 350 gr Kroma, Parlak Selefon, 1.000 Adet",
          "KUTU8: Gömlek & Tekstil Kutusu (25x35x5 cm) - 350 gr Bristol, Mat Selefon, 1.000 Adet"
        ]
      },
      {
        id: "ozel-olcu-teklif-sureci",
        title: "Özel Ölçü ve Kurumsal Teklif Süreci",
        description: "Standart ölçülerin dışındaki tüm ürün kutuları için en, boy ve yükseklik ölçülerine göre özel bıçak çizimi hazırlanır. Kutu içine girecek ürünün ağırlığına ve kullanım amacına göre karton türü ve gramajı değerlendirilerek uygun tiraj ve maliyet dengesine göre teklif sunulur."
      }
    ]
  },
  {
    id: "karton-secenekleri",
    h2Title: "Bristol ve Kroma Karton Seçenekleri",
    subtitle: "Ürününüzün ağırlığı, raf sunumu ve maliyet hedeflerine uygun karton alternatifleri.",
    badge: "Karton Türleri & Gramajlar",
    subsections: [
      {
        id: "amerikan-bristol-karton",
        title: "Amerikan Bristol Karton (230 - 400 gr)",
        description: "Amerikan Bristol karton, ön ve arka yüzeyi beyaz, pürüzsüz selüloz yapısıyla ofset baskı netliği ve renk doygunluğu sunar. 230, 250, 300, 350 ve 400 gr seçenekleriyle kozmetik, parfüm, medikal dış ambalaj, takı, butik hediyelik ve perakende ürün ambalajlarında yaygın olarak tercih edilir. Doğru bıçak ve pilyaj yapısı katlama sırasında çatlama riskini azaltmaya yardımcı olabilir. İlaç ve medikal ambalajlarda içerik, yasal işaretler ve ölçüler müşterinin sağladığı onaylı baskıya hazır dosyaya göre uygulanır. Mavi Basım tıbbi, hukuki veya mevzuata ilişkin içerik hazırlamaz.",
        details: [
          "230 - 250 gr: Küçük ve hafif ürünler, takı ve numune kutuları.",
          "300 - 350 gr: Parfüm, krem, serum, hediyelik eşya ve tekstil kutuları.",
          "400 gr: Daha tok gövde istenen sunum kutularında değerlendirilebilir. Cam şişe ve kavanozlarda ürün ağırlığı, kutu ölçüsü, taban yapısı ve separatör ihtiyacı birlikte değerlendirilmelidir."
        ]
      },
      {
        id: "kroma-karton",
        title: "Kroma Karton (Arkası Gri, Yüksek Rijitlik)",
        description: "Kroma kartonun yüzey, arka yüz rengi ve lif yapısı tedarik edilen karton türüne göre değişebilir. Kullanılacak kartonun teknik özellikleri sipariş öncesinde değerlendirilmelidir. Bütçe ve tiraj dengesi; karton, ölçü, montaj, adet ve yüzey uygulamalarına göre değişir. Pastane, kuru gıda dış ambalajı, hırdavat ve yedek parça kutusu projelerinde değerlendirilebilir."
      },
      {
        id: "kraft-ve-ozel-kartonlar",
        title: "Kraft ve Özel Dokulu Karton Alternatifleri",
        description: "Kraft veya özel dokulu karton seçenekleri; ürün ölçüsü, kullanım amacı, sipariş adedi ve tedarik durumuna göre ayrıca değerlendirilebilir. Kraft kutu baskı seçenekleri; ürün ölçüsü, istenen baskı görünümü, sipariş adedi ve kartonun tedarik durumuna göre ayrıca değerlendirilebilir. Mikro ondüle sıvama veya benzeri güçlendirici seçenekler, sipariş özellikleri ve uygulama imkânına göre ayrıca değerlendirilebilir."
      }
    ]
  },
  {
    id: "kutu-modelleri",
    h2Title: "Kutu Modelleri ve Kullanım Alanları",
    subtitle: "Farklı sektörlerin paketleme, sunum ve koruma gereksinimlerine göre geliştirilen kutu tipleri.",
    badge: "Sektörel Kutu Modelleri",
    subsections: [
      {
        id: "kozmetik-ve-bakim-kutulari",
        title: "Kozmetik, Parfüm ve Kişisel Bakım Kutuları",
        description: "Parfüm, losyon, krem, şampuan, serum ve cilt bakım ürünleri için tasarlanan Bristol kutular. Detaylı ofset baskı, altın varak yaldız ve gofre kabartma ile kurumsal sunumu destekler.",
        details: ["Şişe ve kavanozlar için iç koruma separatörü", "Soft Touch selefon ile kadifemsi yüzey hissi", "Kilitli dip mekanizmasıyla taşımayı kolaylaştıran yapı"]
      },
      {
        id: "e-ticaret-ve-kargo-kutulari",
        title: "E-Ticaret, Kargo ve Ürün Gönderim Kutuları",
        description: "Online satış kanalları ve kargo gönderimleri için hazırlanan kargo ve ürün kutusu seçenekleri. Mukavemet ihtiyacı ürün ağırlığına, ölçüye, karton türüne ve kullanım koşullarına göre değerlendirilir. Kutu iç kapağına özel baskı ve karşılama mesajları eklenebilir."
      },
      {
        id: "tekstil-ve-hediyelik-kutulari",
        title: "Tekstil, Hediyelik ve Aksesuar Kutuları",
        description: "Gömlek, fular, kravat, çorap, cüzdan, kemer ve takı ürünleri için pencereli, geçmeli veya çekmeceli sunum kutusu alternatifleri."
      },
      {
        id: "pasta-tatli-ve-firin-kutulari",
        title: "Pasta, Tatlı ve Fırın Dış Ambalaj Kutuları",
        description: "Baklava, kuru pasta, kurabiye, makaron ve çikolata sunumları için dış ambalaj kutuları. Kulaklı kilit sistemi kutunun taşınmasını kolaylaştırır."
      },
      {
        id: "restoran-ve-paket-servis-kutulari",
        title: "Restoran ve Paket Servis Dış Sunum Kutuları",
        description: "Hamburger, dürüm, patates, nugget ve tako gibi paket servis ürünleri için katlanabilir, pratik dış sunum kutuları."
      },
      {
        id: "teshir-askili-ve-kilif-kutular",
        title: "Raf Tipi Teşhir, Askılı ve Kılıf Kutular",
        description: "Mağaza raflarında dikey sergileme sağlayan Euro delikli askılı kutular, açıldığında tezgâh standına dönüşen display kutular ve iç tepsiyi saran sleeve kılıflar."
      }
    ]
  },
  {
    id: "baski-ornekleri",
    h2Title: "Kutu ve Ambalaj Baskı Örnekleri",
    subtitle: "Bristol ve kroma karton kullanılarak hazırlanan kutu ve ambalaj baskı uygulama örnekleri.",
    badge: "Örnek Çalışmalar Galerisi",
    subsections: [
      {
        id: "uygulama-ornekleri-genel",
        title: "Hazırlanan Kutu ve Ambalaj Uygulama Çeşitleri",
        description: "Amerikan Bristol ve Kroma Karton kullanılarak hazırlanan ürün kutusu, hediyelik kutu, kozmetik ambalajı ve özel kesim kutu uygulama örneklerimizi galerimizde inceleyebilirsiniz. Her kutu projesinde ürünün boyutları ve kullanım koşulları göz önünde bulundurulur."
      },
      {
        id: "sektorel-tasarim-detaylari",
        title: "Sektörel Kutu Tasarımı ve Baskı Detayları",
        description: "Galeride yer alan örneklerde mat selefon, parlak selefon, Soft Touch kadife laminasyon, varak yaldız, gofre kabartma ve bölgesel UV lak gibi yüzey işlemlerinin uygulama örnekleri üzerindeki görsel duruşunu inceleyebilirsiniz."
      }
    ]
  },
  {
    id: "olcu-bicak-ve-kalip",
    h2Title: "Kutu Ölçüsü, Bıçak ve Kalıp Yapısı",
    subtitle: "Kutunun gövde yapısını, kapanış biçimini ve paketleme hızını belirleyen mekanik yapılar.",
    badge: "Mekanik & Bıçak Yapısı",
    subsections: [
      {
        id: "taban-kilit-mekanizmalari",
        title: "Düz Dip, Kilitli Dip ve Otomatik Kilit Mekanizmaları",
        description: "Kutunun taban yapısı, taşınacak ürünün ağırlığına ve dolum hızına göre seçilir:",
        details: [
          "Düz Dip (Kaset Taban): Taban kulakçıklarının manuel olarak içe katlandığı, hafif ürünler için ekonomik model.",
          "Ters Kilitli Dip: Karşılıklı kapakların farklı yönlerde kapandığı standart taban modellerinden biridir. Ürün ağırlığı, kutu ölçüsü ve kullanım biçimine göre ayrıca değerlendirilmelidir.",
          "Otomatik Kilitli Dip (Oto Kilit): Tabanı önceden yapıştırılmış, hafifçe bastırıldığında pratik kurulan ve paketleme sürecini hızlandıran model."
        ]
      },
      {
        id: "kapak-ve-govde-tipleri",
        title: "Geçmeli Kapak, Çekmeceli ve Kılıf (Sleeve) Yapılar",
        description: "Üst kapanış sisteminde tırnaklı kilitli kapak, çift taraflı geçme kapak, sürgülü çekmeceli mekanizma veya kutu gövdesini saran kılıf (sleeve) tasarımları uygulanabilir."
      },
      {
        id: "bicak-izi-ve-kirim-cizgileri",
        title: "Bıçak İzi, Kırım Çizgisi ve Katlama Payları",
        description: "Kutu kesim kalıbı; çelik kesim bıçakları (düz çizgi), pilyaj/kırım bıçakları (katlama çizgisi) ve perfore bıçaklarından oluşur. Özel kutu tasarımı, ürün ölçüsüne ve kutunun açık açınımına uygun hazırlanan bıçak çizimi üzerinden planlanmalıdır. Ölçülendirme teknik çizim ve kalıp toleranslarına uygun olarak yapılır."
      }
    ]
  },
  {
    id: "yuzey-uygulamalari",
    h2Title: "Selefon, Varak, Gofre ve Yüzey Uygulamaları",
    subtitle: "Kutunun dış etkenlere karşı korunmasına yardımcı olan ve markanıza şıklık katan ek işlemler.",
    badge: "Yüzey İşlemleri & Lak",
    subsections: [
      {
        id: "selefon-laminasyon",
        title: "Koruyucu Mat, Parlak ve Soft Touch Selefon",
        description: "Selefon laminasyonu, kartonun dış yüzeyini ince bir polipropilen film ile kaplayarak sürtünmeye, neme ve yıpranmaya karşı korumaya yardımcı olur. Mat selefon zarif ve kurumsal bir görünüm verirken; parlak selefon renkleri canlı gösterir. Soft Touch selefon ise dokunulduğunda ipeksi ve kadifemsi bir his sunar."
      },
      {
        id: "varak-yaldiz-baski",
        title: "Sıcak Varak Yaldız (Altın, Gümüş ve Bakır)",
        description: "Kutu üzerinde marka logosu, ürün ismi veya dekoratif çerçeveler sıcak klişe yardımıyla altın, gümüş, rose gold veya hologram varak yaldız ile kaplanır. Işık altında parlayarak ürününüze estetik bir hava katar."
      },
      {
        id: "gofre-kabartma-ve-uv-lak",
        title: "3D Gofre Kabartma ve Bölgesel Lokal UV Lak",
        description: "Gofre uygulaması, erkek-dişi klişe ile karton yüzeyine baskı yaparak logonun kabartmalı görünmesini sağlar. Lokal UV lak ise mat selefonlu kutu üzerinde belirli alanlara parlak vernik uygulayarak kontrast oluşturur."
      }
    ]
  },
  {
    id: "fiyat-belirleyen-unsurlar",
    h2Title: "Kutu Baskı Fiyatlarını Belirleyen Unsurlar",
    subtitle: "Birim maliyetleri doğrudan etkileyen teknik parametreler ve bütçe optimizasyonu.",
    badge: "Maliyet Analizi & Bütçe",
    subsections: [
      {
        id: "tabaka-ebadi-ve-fire",
        title: "Ebat, Açık Tabaka Boyutu ve Fire Optimizasyonu",
        description: "Kutunun açık açınım ebadı, ofset baskı tabakasına kaç adet kutunun sığacağını (montaj sayısını) belirler. Ofset baskılı kutu projelerinde karton türü, renk kullanımı, açık tabaka yerleşimi ve yüzey uygulamaları birlikte değerlendirilir. Uygun tabaka yerleşimi ve ebat optimizasyonu sayesinde kâğıt firesi azaltılarak birim maliyet düşürülür."
      },
      {
        id: "siparis-tiraji-ve-maliyet",
        title: "Sipariş Tirajı ve Birim Maliyet Dengesi",
        description: "Ofset baskıdaki sabit hazırlık, kalıp ve montaj giderleri daha fazla adede dağıtılabildiği için birim maliyet çoğu projede düşebilir. Kesin sonuç kutu ölçüsü ve sipariş özelliklerine göre hesaplanır."
      },
      {
        id: "gramaj-ve-ekstra-islemler",
        title: "Karton Gramajı ve Ekstra Yüzey İşlemleri",
        description: "Seçilen kartonun cinsi (Bristol veya Kroma), gramajı (230 gr ile 400 gr arası) ve talep edilen selefon, varak yaldız, gofre veya lak gibi ek uygulamalar toplam teklif tutarını şekillendirir. Özel kutu baskı ve ambalaj kutusu fiyatları; kutunun açık ebadı, karton gramajı, baskı özellikleri, bıçak veya kalıp ihtiyacı ve yüzey uygulamalarına göre hesaplanır."
      }
    ]
  },
  {
    id: "dosya-ve-pdf-prova",
    h2Title: "Baskıya Hazır Dosya ve PDF Prova",
    subtitle: "Baskı öncesinde yerleşim ve hazırlık sorunlarının azaltılması için gereken grafik dosya hazırlık adımları.",
    badge: "Grafik & Dosya Onayı",
    subsections: [
      {
        id: "vektorel-bicak-sablonu",
        title: "Vektörel Bıçak İzi ve Katlama Katmanları",
        description: "Kutu tasarımı vektörel bıçak çizimi üzerine oturtulmalıdır. Tasarım dosyasında kesim çizgileri, kırım çizgileri ve yapıştırma kulakları ayrı katmanlarda (spot renk olarak) tanımlanmalıdır."
      },
      {
        id: "cmyk-ve-tasma-payi",
        title: "CMYK Renk Ayrımı ve 3 mm Taşma Payı (Bleed)",
        description: "Tüm görseller ve renk paletleri CMYK modunda olmalı, bıçak kesim hatlarının dışına en az 3 mm taşma payı (bleed) verilmelidir. Yazı karakterleri (fontlar) konvertlenerek eğriye dönüştürülmelidir."
      },
      {
        id: "pdf-prova-ve-onay",
        title: "Dijital PDF Prova Kontrol ve Onay Adımları",
        description: "Tarafımıza iletilen tasarım dosyası teknik incelemeden geçirilir; metin, yerleşim ve kırım hatlarını gösteren dijital PDF prova hazırlanarak onayınıza sunulur. Dijital PDF prova yerleşim ve metin kontrolü için kullanılır; fiziksel baskı rengini ve karton yapısını birebir garanti etmez."
      }
    ]
  },
  {
    id: "baski-kesim-ve-gonderim",
    h2Title: "Baskı, Kesim, Kırım, Yapıştırma ve Gönderim",
    subtitle: "Sipariş onayından paket teslimine kadar aşamalı olarak yürütülen teknik süreç.",
    badge: "Süreç & Teslimat",
    subsections: [
      {
        id: "ofset-baski-sureci",
        title: "Dosya Hazırlığı ve Renk Kontrolü",
        description: "Onaylanan tasarım dosyası belirlenen baskı yöntemine göre hazırlanır. Sipariş özelliklerine göre baskı ve renk kontrolü gerçekleştirilir."
      },
      {
        id: "kazanli-kesim-ve-kirim",
        title: "Kesim, Pilyaj ve Kırım İşlemleri",
        description: "Baskısı ve yüzey uygulaması tamamlanan tabakalar, özel çelik bıçak kalıpları ile teknik çizime uygun şekilde kesilir, pilyaj ve katlama kırım izleri oluşturulur."
      },
      {
        id: "yapistirma-ve-montaj",
        title: "Kutu Modelinde Yapıştırma ve Katlama",
        description: "Yan yapıştırma ve kilitli dip taban kulakçıkları, kutu modeline uygun yapıştırıcılarla birleştirilerek sevkiyata hazır hale getirilir."
      },
      {
        id: "ambalaj-ve-sevk",
        title: "Paketleme ve Anlaşmalı Kargoya Teslim",
        description: "Tamamlanan kutular, taşıma sırasında korunmasına yardımcı olacak biçimde düz katlanmış olarak koli veya paketlere yerleştirilir. İstanbul Topkapı hizmet ve koordinasyon noktamız üzerinden anlaşmalı kargo ile Türkiye'nin tüm illerine sevk edilir. Hazırlık ve gönderim süresi; kutunun ölçüsü, sipariş adedi, karton türü, kalıp ihtiyacı, yüzey uygulamaları ve onay sürecine göre teklif aşamasında belirlenir."
      }
    ]
  }
];

/**
 * Generates semantic SSR body content for /kutu ensuring exact parity between SSR HTML and React DOM.
 */
export function generateKutuSSRBodyContent(): string {
  const meta = KUTU_SEO_METADATA;
  const sectionsHtml = KUTU_H2_SECTIONS.map((sec) => {
    let galleryHtml = "";
    if (sec.id === "baski-ornekleri") {
      galleryHtml = `\n    <div class="kutu-gallery-grid">\n${KUTU_GALLERY.map(img => `      <figure id="${img.id}">
        <img src="${img.img}" alt="${img.title} - Mavi Basım Ambalaj" title="${img.title}" loading="lazy" width="400" height="300" />
        <figcaption><strong>${img.title}</strong>: ${img.desc} (Kategori: ${img.tag})</figcaption>
      </figure>`).join("\n")}\n    </div>`;
    }

    const subsectionsHtml = sec.subsections.map((sub) => {
      let detailsHtml = "";
      if (sub.details && sub.details.length > 0) {
        detailsHtml = `\n      <ul>\n${sub.details.map(d => `        <li>${d}</li>`).join("\n")}\n      </ul>`;
      }
      return `    <article id="${sub.id}">
      <h3>${sub.title}</h3>
      <p>${sub.description}</p>${detailsHtml}
    </article>`;
    }).join("\n");

    return `  <section id="${sec.id}">
    <h2>${sec.h2Title}</h2>
    <p>${sec.subtitle}</p>${galleryHtml}
${subsectionsHtml}
  </section>`;
  }).join("\n\n");

  const faqsHtml = KUTU_FAQS.map((faq, index) => {
    return `    <article id="faq-${index + 1}">
      <h3>${faq.q}</h3>
      <p>${faq.a}</p>
    </article>`;
  }).join("\n");

  return `<div class="bg-gray-50 border-b border-gray-100 py-3">
  <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="flex text-xs text-gray-500 font-medium" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-2 flex-wrap">
        <li class="inline-flex items-center">
          <a href="/" class="text-gray-600 hover:text-primary transition-colors">Ana Sayfa</a>
        </li>
        <li>
          <div class="flex items-center">
            <span class="mx-2 text-gray-400" aria-hidden="true">/</span>
            <a href="/matbaa" class="text-gray-600 hover:text-primary transition-colors">Matbaa Ürünleri</a>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <span class="mx-2 text-gray-400" aria-hidden="true">/</span>
            <span class="text-gray-900 font-semibold" aria-current="page">Karton Kutu Baskı</span>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</div>
<main class="seo-kutu-content">
  <header>
    <h1>${meta.h1}</h1>
    <p>${meta.desc}</p>
    <p>Baskılı kutu ve baskılı karton kutu seçenekleri; ürün ölçüsü, kullanım amacı, karton türü ve sipariş adedine göre değerlendirilir.</p>
    <p>Doğrudan gıda temasının bulunduğu projelerde kâğıt, karton, kaplama ve mürekkep seçimi; ürünün sıcaklık, yağ, nem ve kullanım süresi gibi koşulları ile tedarikçi belgelerine göre ayrıca değerlendirilmelidir.</p>
    <div class="kutu-cta-box my-4">
      <a href="https://wa.me/905366022373?text=Merhaba%2C%20fiyat%20teklifi%20almak%20istiyorum." target="_blank" rel="nofollow noopener noreferrer" class="inline-flex items-center px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors">Özel Bıçaklı Kutu Teklifi Al</a>
    </div>
  </header>

${sectionsHtml}

  <aside id="ilgili-baski-kategorileri" class="my-6">
    <p class="font-bold text-slate-900">İlgili Baskı Kategorileri</p>
    <p>Karton kutu ambalaj siparişlerinizle birlikte ürün sunumu ve kurumsal kimlik bütünlüğü sağlayan diğer matbaa baskı ürünlerimizi inceleyebilirsiniz:</p>
    <ul class="ilgili-baski-list flex flex-wrap gap-3 my-3">
      <li><a href="/etiket">Yapışkanlı Etiket</a></li>
      <li><a href="/karton-canta">Karton Çanta</a></li>
      <li><a href="/ambalaj">Ambalaj Baskı</a></li>
      <li><a href="/brosur">Broşür Baskı</a></li>
      <li><a href="/kartvizit">Kartvizit Baskı</a></li>
    </ul>
  </aside>

  <section id="sikca-sorulan-sorular">
    <h2>Sıkça Sorulan Sorular</h2>
    <p>Karton kutu baskısı, karton çeşitleri, sipariş adedi, prova ve teslimat süreçleri hakkında merak edilenler.</p>
${faqsHtml}
  </section>
</main>`;
}

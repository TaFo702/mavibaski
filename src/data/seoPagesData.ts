export interface SEOPageData {
  path: string;
  title: string;
  metaDesc: string;
  h1: string;
  intro: string;
  heroImage?: string;
  sections: { title: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
  internalLinks: { text: string; path: string }[];
  offers?: { lowPrice: string; highPrice: string; count: string };
  tagline: string;
}

export const SEO_PAGES_DATA: Record<string, SEOPageData> = {
  'kuafor-kartvizit-baski': {
    path: '/sektor/kuafor-kartvizit-baski',
    title: 'Kuaför Kartvizit Baskı | Berber ve Güzellik Salonu',
    metaDesc: 'Kuaför, berber ve güzellik salonları için 350 gr kuşe kartvizit baskısı. Mat-parlak selefon, çift yön baskı, PDF prova ve Türkiye geneli kargo.',
    h1: 'Kuaför Kartvizit Baskı',
    intro: 'Kuaförler, berberler ve güzellik salonları için hazırlanan profesyonel kartvizitler; iletişim bilgilerinizi, sosyal medya hesaplarınızı ve hizmetlerinizi müşterilerinize şık ve kalıcı biçimde sunar. Baskıya hazır tasarımınızı iletebilir veya ayrıca fiyatlandırılan grafik tasarım hizmetimiz hakkında bilgi alabilirsiniz.',
    sections: [
      {
        title: 'Kuaför ve Güzellik Salonlarına Özel Kartvizitler',
        paragraphs: [
          'Profesyonel bir kartvizit, işletmenin kurumsal görünümünü destekleyebilir ve müşterilerin iletişim bilgilerine tekrar ulaşmasını kolaylaştırabilir.',
          'Kadın kuaförleri, erkek berberleri, güzellik salonları, saç tasarım merkezleri, manikür ve bakım stüdyoları ile makyaj uzmanları için hazırladığımız kartvizit tasarımları salonunuzun kurumsal görünümünü destekler. Arka yüzüne randevu tarihi ve saat alanı eklenen kartvizitler, müşteriler için randevu hatırlatma kartı olarak da kullanılabilir.',
          'Mavi Basım olarak, güzellik sektörünün standartlarına uygun, farklı kağıt, selefon ve yüzey uygulamalarına sahip kartvizit seçenekleri sunuyoruz.'
        ]
      },
      {
        title: 'Kartvizit Baskı Seçenekleri',
        paragraphs: [
          'Kuaför ve güzellik salonları için sıklıkla tercih edilen kağıt gramajı 350 gr kuşe kartondur. Tok ve dayanıklı yapısı sayesinde elde kaliteli bir hissiyat bırakır.',
          'Tasarım konseptinize göre tek veya çift yön baskı seçenekleri sunulmaktadır. Çift yön baskılarda ön yüzü marka logosu ve iletişim kanalları için, arka yüzü ise randevu tarihi/saati ve verilen hizmet listesi için pratik şekilde kullanabilirsiniz.',
          'Yüzey kaplamasında zarif bir dokunuş için mat selefon, canlı renkler ve parlak bir yüzey için parlak selefon tercih edebilirsiniz. Logonuzu öne çıkarmak isteyen işletmeler için bölgesel parlaklık sağlayan lokal lak ve şık oval köşe kesim seçenekleri mevcuttur.'
        ]
      },
      {
        title: 'Kuaför Kartvizitinde Hangi Bilgiler Bulunmalı?',
        paragraphs: [
          'Müşterilerinizin size hızlıca ulaşmasını ve verdiğiniz hizmetleri kolayca incelemesini sağlayan net ve düzenli bir kartvizit içeriği hazırlanmalıdır.',
          'İşletme adı veya uzman ismi, hızlı iletişim için Telefon ve WhatsApp hattı, açık adres bilgisi, saç ve bakım tasarımlarınızın yer aldığı sosyal medya hesabı, verilen temel hizmetler (kesim, boya, fön, cilt bakımı vb.), randevu tarihi yazım alanı ve harita konumu veya online randevu sistemine yönlendiren QR kod kartvizit üzerinde yer alabilir.'
        ]
      },
      {
        title: 'Baskı ve Sipariş Süreci',
        paragraphs: [
          '1. Ölçü, Adet ve Özelliklerin Belirlenmesi: İhtiyacınıza uygun sipariş adedini, kağıt gramajını, tek veya çift yön baskı ile selefon ve lak tercihinizi belirleyin.',
          '2. Hazır Dosya İletimi ve Baskı Öncesi Kontrol: Hazır logonuzu ve tasarım dosyanızı iletin. Gönderilen dosyalar kesim payı ve çözünürlük açısından kontrol edilir.',
          '3. Baskı Öncesi PDF Prova Onayı: Dosyanız teknik kontrolden geçirilir ve onayınız için dijital PDF prova iletilir.',
          '4. Baskı ve Tamamlama: Onaylanan tasarımınız sipariş özelliklerine uygun baskı sürecine alınır ve kesim işlemleri tamamlanır.',
          '5. Paketleme ve Kargo: Siparişleriniz özenle paketlenerek adresinize sevk edilir.'
        ]
      },
      {
        title: 'Neden Mavi Basım?',
        paragraphs: [
          'Mavi Basım, işletmelerin ihtiyaçlarına uygun matbaa ve baskı çözümleri sunar.',
          'Baskıya hazır dosyalar için teknik dosya kontrolü ve baskı öncesi dijital PDF prova sunarak baskı öncesi kontrollerinizi kolaylaştırıyoruz.',
          'Türkiye geneline anlaşmalı kargo ile gönderim yapılmakta, sipariş süreciyle ilgili WhatsApp ve telefon hatlarımız üzerinden bilgi verilmektedir.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Kuaför kartviziti için hangi kağıt tercih edilmeli?',
        answer: '350 gr kuşe karton, dayanıklı yapısı nedeniyle kuaför ve güzellik salonu kartvizitlerinde sık tercih edilen seçeneklerden biridir.'
      },
      {
        question: 'Mat mı parlak selefon mu kullanılmalı?',
        answer: 'Sade bir görünüm için mat selefon, canlı renkler ve parlak bir yüzey için ise parlak selefon kaplaması tercih edilebilir.'
      },
      {
        question: 'Çift yön baskı yapılabilir mi?',
        answer: 'Evet. Ön yüze marka logosu ve iletişim bilgileri, arka yüze ise randevu saatleri veya hizmet listesi basılarak pratik çift yön kullanım elde edilir.'
      },
      {
        question: 'Tasarım desteği var mı?',
        answer: 'Hazır dosyalarınız için teknik dosya kontrolü yapılır ve baskı öncesi PDF prova iletilir. Sıfırdan grafik tasarım veya kapsamlı revizyon talepleri ayrıca fiyatlandırılabilir.'
      },
      {
        question: 'Baskıdan önce prova gönderiliyor mu?',
        answer: 'Siparişlerinizde baskı öncesi hazırlanan dijital PDF prova onayınız alındıktan sonra baskı sürecine geçilir.'
      },
      {
        question: 'İstanbul dışına teslimat yapılıyor mu?',
        answer: 'Evet. Hazırlanan ürünler özenle ambalajlanarak Türkiye’nin 81 iline kargo ile gönderilmektedir.'
      }
    ],
    internalLinks: [
      { text: 'Kartvizit Baskı', path: '/kartvizit' },
      { text: 'Güzellik Salonu El İlanı', path: '/el-ilani' },
      { text: 'Saç ve Bakım Hizmet Broşürü', path: '/brosur' },
      { text: 'Randevu Magneti', path: '/magnet' },
      { text: 'Kozmetik Ürün Etiketi', path: '/etiket' }
    ],
    tagline: 'Kuaför ve Güzellik Salonları İçin Prestijli Kartvizit Baskısı'
  },
  'restoran-brosur-baski': {
    path: '/sektor/restoran-brosur-baski',
    title: 'Restoran Broşür Baskı | Paket Servis Menü Broşürü',
    metaDesc: 'Restoran, lokanta ve paket servis işletmeleri için katlamalı broşür baskısı. Güncel kâğıt, ölçü ve katlama seçeneklerini inceleyerek sipariş verin.',
    h1: 'Restoran Broşür Baskı',
    intro: 'Restoran broşürleri; menü seçeneklerini, kampanyaları, iletişim bilgilerini ve doğrudan sipariş kanallarını müşterilere toplu biçimde sunmak için kullanılabilir. Paket servis poşetlerine eklenebilen veya bölgesel dağıtımda kullanılabilen katlamalı broşürler, işletmenin basılı menü ve tanıtım ihtiyacını destekler. Baskıya hazır tasarımınızı iletebilir veya ayrıca fiyatlandırılan grafik tasarım hizmetimiz hakkında bilgi alabilirsiniz.',
    sections: [
      {
        title: 'Restoran Broşürlerinde Kâğıt ve Katlama Seçenekleri',
        paragraphs: [
          'Restoran, lokanta ve paket servis işletmeleri için hazırlanan katlamalı broşürlerde kâğıt gramajı ve katlama biçimi menü içeriğine göre belirlenir. Dağıtım alanına ve sipariş amacına uygun seçim yapmak hem kullanım kolaylığı sağlar hem de basılı menünün dayanıklılığını artırır.',
          'Genel tanıtım ve paket servis poşet içi kullanımlarında 115 gr veya 130 gr kuşe kâğıt tercih edilebilir. Daha uzun süreli kullanım ve tok bir duruş istenen menü broşürlerinde kâğıt gramajı sipariş aşamasında ihtiyaca göre belirlenmektedir.',
          'Broşürün katlama biçimi menüdeki kategori sayısına göre seçilmelidir. Tek kırım (ortadan katlamalı), çift kırım (akordeon veya C kırım) gibi seçenekler, içeriğin düzenli ve kolay okunabilir biçimde sunulmasını sağlar.'
        ]
      },
      {
        title: 'Restoran Broşürü Tasarımında Bulunması Gerekenler',
        paragraphs: [
          'Etkili bir restoran broşürü; net ürün başlıkları, güncel fiyatlar, doğrudan iletişim bilgileri ve varsa online sipariş kanallarına yönlendiren QR kodlar içermelidir. Karmaşık tasarımlar yerine müşterinin aradığı lezzete ve sipariş hattına kolayca ulaşmasını sağlayan sade düzenler tercih edilmelidir.',
          'Baskıda kaliteli sonuç alabilmek için dosyaların yüksek çözünürlükte hazırlanması, renk formatının CMYK düzenine ayarlanması ve kesim payı (taşma payı) olarak kenarlardan en az 3 mm alan bırakılması önerilir.'
        ]
      },
      {
        title: 'Baskı ve Sipariş Süreci',
        paragraphs: [
          '1. Ölçü, Adet ve Kâğıt Seçimi: İşletmenizin menü uzunluğuna ve dağıtım amacına uygun broşür ölçüsünü, kâğıt gramajını (115 gr veya 130 gr) ve katlama türünü belirleyin.',
          '2. Dosya İletimi ve Teknik Kontrol: Baskıya hazır tasarım dosyanızı iletin. Dosyanız çözünürlük, CMYK renk formatı ve taşma payı kriterlerine göre teknik kontrolden geçirilir.',
          '3. Baskı Öncesi PDF Prova Onayı: Kontrolü tamamlanan dosya için baskı öncesi dijital PDF prova hazırlanarak onayınıza sunulur.',
          '4. Baskı, Kırım ve Paketleme: Onaylanan sipariş belirlenen kâğıt ve katlama özelliklerine uygun olarak baskı ve kırım sürecine alınır, ardından özenle paketlenir.',
          '5. Teslimat ve Kargo: Hazırlanan broşürler anlaşmalı kargo aracılığıyla adresinize ulaştırılır.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Restoran broşürü için hangi ölçüler tercih edilebilir?',
        answer: 'A4, A5 ve siparişe göre belirlenen farklı ölçüler kullanılabilir. Katlama biçimi ve panel sayısı, menü içeriğinin uzunluğuna göre seçilmelidir.'
      },
      {
        question: 'Restoran broşüründe hangi kâğıt seçenekleri kullanılabilir?',
        answer: 'Mevcut ürün seçeneklerine göre 115 gr veya 130 gr kuşe kâğıt tercih edilebilir. Uygun gramaj; dağıtım şekli, katlama biçimi ve sipariş adedine göre belirlenir.'
      },
      {
        question: 'Broşürde yemek fotoğrafları nasıl hazırlanmalıdır?',
        answer: 'Baskıda daha net sonuç almak için görseller baskı ölçüsüne uygun çözünürlükte hazırlanmalı, renkler CMYK düzeninde kontrol edilmeli ve kesim alanlarına taşma payı eklenmelidir.'
      },
      {
        question: 'Baskı öncesinde prova gönderiliyor mu?',
        answer: 'Baskıya hazır dosya teknik olarak kontrol edilir ve baskı sürecinden önce PDF prova onaya sunulur.'
      },
      {
        question: 'Grafik tasarım hizmeti veriliyor mu?',
        answer: 'Baskıya hazır dosyalar için teknik kontrol yapılır. Sıfırdan grafik tasarım ve kapsamlı revizyon talepleri ayrıca fiyatlandırılabilir.'
      },
      {
        question: 'Türkiye geneline gönderim yapılıyor mu?',
        answer: 'Evet. Tamamlanan siparişler özenle paketlenerek Türkiye geneline anlaşmalı kargo ile gönderilir.'
      }
    ],
    internalLinks: [
      { text: 'Broşür Baskı Çözümleri', path: '/brosur' },
      { text: 'Paket Servis Magneti', path: '/magnet' },
      { text: 'Amerikan Servis Baskısı', path: '/amerikan-servis' },
      { text: 'Restoran Menü Baskısı', path: '/kataloglar' },
      { text: 'Paket Servis Karton Çanta', path: '/karton-canta' }
    ],
    tagline: 'Paket Servis ve Menü Tanıtımları İçin Katlamalı Broşürler'
  },
  'donerci-magnet-baski': {
    path: '/sektor/donerci-magnet-baski',
    title: 'Dönerci Magnet Baskı Fiyatları | Figürlü Özel Kesim Buzdolabı Magneti',
    metaDesc: 'Kebapçı ve dönerciler için en ucuz oval, özel kesimli dönerci buzdolabı magnetleri. 0.40 mm yüksek çekim gücü ve lüks parlak selefon kaplamasıyla doğrudan imalattan!',
    h1: 'Dönerci ve Kebapçı Paket Servis Magnet Baskı Hizmetleri',
    intro: 'Dükkan aramalarında kaybolmadan doğrudan telefonla paket çekmek isteyen insanların ilk refleks noktası buzdolabındaki magnetlerdir. Telefon numarasının devasa büyüklükte olması ve sıcak dürüm görselinin canlılığı sipariş adetlerini doğrudan artırır.',
    sections: [
      {
        title: 'Neden İnce ve Zayıf Fason Mıknatıs Tercih Etmemelisiniz?',
        paragraphs: [
          'Piyasada fason etiketle internetten satılan merdiven altı magnetler 0.30 mm gibi zayıf manyetik dökümlerden üretilir. Bu magnetler dolap kapağının günde 15 kez sarsılmasıyla yerçekimine yenik düşerek kayar veya zamanla kıvrılarak çöpe gider.',
          'Mavi Basım olarak dökümlerimizde ithal 0.40 mm veya en lüks serilerde 0.50 mm kalınlığında üstün manyetik çekim sunan dökülmez manyetik levhaları kullanmaktayız. 350 gr kuşe kartonla sıvama yapılarak pürüzsüz parlak selefon koruyucusuyla banyo sularına karşı dahi mukavemet kazanır.'
        ]
      },
      {
        title: 'Özel Kesim (Figürlü) Magnetin Algı Gücü',
        paragraphs: [
          'Düz dikdörtgen sıradan magnet paketlerine kıyasla, dış konturu lavaş dürüm, döner tepsisi veya pide şeklinde kesilmiş özel bıçaklı figürlü magnetler müşterilerinizin ilgisini 3 kat daha fazla çeker.',
          'Topkapı fabrikamızdaki hidrolik şekilli bıçak kalıplarında milimetrik hassas tıraşlama uygulayarak kenarları pul pul dökülmeyen elit sıvamalı magnetler satıyoruz. Siparişlerinizi 81 ilin tamamına hasarsız nakliye kolilerinde göndermekteyiz.'
        ]
      }
    ],
    faqs: [
      { question: 'Dönerci magneti için standart ebatlar nelerdir?', answer: 'Genellikle 46x68 mm, 50x70 mm veya dürümlerde 50x80 mm dikey ebatlar paket servislerde en popüler baremlerdir.' },
      { question: 'Magnet üzerine QR kod yerleşimi randıman verir mi?', answer: 'Kesinlikle. Müşterinin el ilanı aramasına gerek kalmadan telefon kamerasını doğrultarak güncel paket fiyat listesine ve sipariş hattına geçmesini sağlar.' }
    ],
    internalLinks: [
      { text: 'Uzun Ömürlü Magnet Seçenekleri', path: '/magnet' },
      { text: 'Lokanta Amerikan Servis Baskısı', path: '/lokanta-amerikan-servis-baski' },
      { text: 'Dönerci Paket El İlanları', path: '/el-ilani' },
      { text: 'Resmi Adisyon ve Sipariş Koçanları', path: '/makbuz-ve-formlar' }
    ],
    offers: { lowPrice: '480', highPrice: '2600', count: '8' },
    tagline: 'Her Gün 15 Kez Göz Önünde Duran Mıknatıslı Dönerci Elçisi'
  },
  'fast-food-cips-kutusu-baski': {
    path: '/sektor/fast-food-cips-kutusu-baski',
    title: 'Fast Food Cips Kutusu Modelleri | Logolu Patates ve Atıştırmalık Ambalajı',
    metaDesc: 'Restoranlar, büfeler ve fast food zincirleri için koku yapmayan, yağı sızdırmayan kilitli tabanlı logolu karton patates cips kutuları imalatı. Toptan fiyatlar!',
    h1: 'Fast Food ve Paket Servis İçin Logolu Karton Patates Cips Kutusu Baskısı',
    intro: 'Fast food işletmeleri, kafeler ve paket servis noktaları için sıcak patates cipsinin lezzetini ve çıtırlığını korumak mükemmel ambalaj tasarımıyla başlar. Mavi Basım olarak gıda temas onaylı kartonlardan, yağı emmeyen ve nem biriktirmeyen özgün cips kutuları üretiyoruz.',
    sections: [
      {
        title: 'Sızdırmaz Bariyerli Gıda Mukavvası',
        paragraphs: [
          'Patates cipsinin sıcak buharı ve yağı sıradan ambalajları saniyeler içinde yumuşatır ve deforme edebilir. Kullandığımız özel iç bariyerli gıda kartonları sayesinde yağın kutu dışına sızmasını önlüyoruz.',
          'Gıda temasına %100 uygun olan bu kartonlar, ısıyı korur ancak iç buharın yoğuşmasını önleyerek cipslerin yumuşamasını geciktirir. Kolay kurulan kilitli taban tasarımı ise mutfakta servis hızını katlar.'
        ]
      },
      {
        title: 'Canlı Ofset Baskı ve Marka Tasarımı',
        paragraphs: [
          'Kutularımızın dış yüzeyine markanızın renklerini, logosunu ve QR kodunu en canlı tonlarla basıyoruz. Heidelberg makinelerimizde kimyasal solvent içermeyen, kokusuz ve gıdayla uyumlu bitkisel su bazlı boyalar tercih edilir.'
        ]
      }
    ],
    faqs: [
      { question: 'Cips kutusu ölçüleri standart mıdır?', answer: 'Küçük, orta ve büyük boy olmak üzere 3 farklı hazır bıçak ölçümüz mevcuttur. Dilerseniz firmanıza özel gramajlı kesim kalıpları da hazırlayabiliriz.' },
      { question: 'Sıcak cips koyulduğunda kutuda koku olur mu?', answer: 'Hayır. Kutularımızda fırınlanmış gıda mukavvası ve su bazlı kokusuz boyalar kullandığımız için sıcak patateslerde hiçbir şekilde kimyasal koku bırakmaz.' }
    ],
    internalLinks: [
      { text: 'Kutulama Çözümlerimiz', path: '/gebze-kutu-baski' },
      { text: 'Restoran Sipariş Fişleri', path: '/restaurant-siparis-fisi' },
      { text: 'Logolu Karton Çantalar', path: '/karton-canta' },
      { text: 'Kraft Ambalaj Kağıtları', path: '/etiket' }
    ],
    offers: { lowPrice: '580', highPrice: '4200', count: '12' },
    tagline: 'Sıcak Patateslerin Çıtır Formunu Koruyan Nem Tahliyeli Cips Kutuları'
  },
  'pastane-kutu-baski': {
    path: '/sektor/pastane-kutu-baski',
    title: 'Pastane Kutu Baskı Fiyatları | Logolu Baklava ve Pasta Kutusu',
    metaDesc: 'Baklava, kurabiye, çikolata ve pasta ambalajları için gıda temas onaylı koku yapmayan pencereli pastane kutu imalatı. Topkapı fabrikasından toptan fiyatlarla!',
    h1: 'Pastane ve Fırınlar İçin Koku Yapmayan Karton Kutu İmalatı',
    intro: 'Pastane dükkanından yeni çıkan şerbetli baklavaların ya da taze yaş pastaların nefis kokusunu korumak, ambalaj imalat kalitesiyle başlar. Ekranda ne kadar şık dursa da fason endüstriyel solvent kokan bir kutu lezzetin saygınlığını gölgeler.',
    sections: [
      {
        title: 'Pastane Kutularında Gıda Güvenliği ve Koku Testleri',
        paragraphs: [
          'Topkapı 2. Matbaacılar Sitesindeki fabrikamızda, gıda ambalajı dökümlerinde asla ucuz kuruma geciktirici solvent tiner incelticileri kullanmıyoruz. Gıdaya temasla koku yaymayan bitkisel soya bazlı pigmentlerle fırınlanan Amerikan Bristol veya kromo kartonlar kullanıyoruz.',
          'Şerbetli tatlıların kartondan sızarak kutunun dış yüzeyini cıvıklaştırmaması için iç duvarlara gıda uyumlu sedef laminasyon bariyer koruyucusu kaplıyoruz. Bu bariyer kutuyu hem neme hem de yağlanmaya karşı korur.'
        ]
      },
      {
        title: 'Asetat Pencereli Yaş Pasta ve Kurabiye Kutuları',
        paragraphs: [
          'Müşterinin yaş pastanın süslemesini ve meyve tazeliğini kutuyu açmadan görebilmesi için kutunun üst paneline şeffaf asetat pencere kesimleri yerleştiriyoruz. Hidrolik pres bıçaklarımız sayesinde pürüzsüz elcik yuvaları ve tırnak kulpları açarak pastanın taşınırken devrilmesini sıfıra indiriyoruz.'
        ]
      }
    ],
    faqs: [
      { question: 'Pastane kutularında hangi karton mukavemeti iyidir?', answer: 'Genellikle iç yüzeyi temiz beyazlık veren Amerikan Bristol kartonlar gıda sağlığı ve lüks duruş açısından pastanelerin birincil seçimidir.' },
      { question: 'Kutuların üzerine marka logosunu nasıl belirginleştirirsiniz?', answer: 'İnce mat selefon kaplı üst kapaklara kabartma lak, gofre veya altın/gümüş varak yaldız uygulayarak fırınınızın prestijini taçlandırıyoruz.' }
    ],
    internalLinks: [
      { text: 'Karton Kutu Çözümlerimiz', path: '/kutu' },
      { text: 'Kutu Yapışkanı Markalı Stickerlar', path: '/etiket' },
      { text: 'Logolu Karton Taşıma Çantası', path: '/karton-canta' },
      { text: 'Paketlere Özel Kartvizit Kartı', path: '/kartvizit' }
    ],
    offers: { lowPrice: '1200', highPrice: '14000', count: '15' },
    tagline: 'Sıfır Kimyasal Koku Güvencesiyle Lezzeti Taşıyan Pastane Çözümleri'
  },
  'etiket-baski': {
    path: '/etiket-baski',
    title: 'Yapışkanlı Etiket Baskı Fiyatları | PP Opak ve Şeffaf Rulolar',
    metaDesc: 'Su, gıda, kimya ve kozmetik ürünleri için neme ve yırtılmaya karşı %100 dayanıklı PP Opak plastik etiket, kuşe etiket imalatı. Sıcak pres bıçaklı kesimle!',
    h1: 'Plaka ve Rulo Yapışkanlı Etiket İmalat Çözümleri',
    intro: 'Etiket, ambalaj üzerindeki kimliktir. Düzgün kesilmemiş, yapıştırıldıktan 3 gün sonra kenarlardan kıvrılarak sökülen bir etiket, müşterinin gözünde markanızı fason ve özensiz gösterir. Mavi Basım olarak şişelerinize ömürlük kenetlenme sunuyoruz.',
    sections: [
      {
        title: 'PP Opak vs Kuşe Kağıt Etiket Seçim Kriterleri',
        paragraphs: [
          'Eğer etiketleriniz nemli banyo ortamına girecek şampuan veya güneşe maruz kalacak zeytinyağı şişelerine basılacaksa, kağıt bazlı etiketler yırtılma ve akma yapabilir. Bu alanlar için kesinlikle plastik bazlı, su ve yağ geçirmeyen PP Opak etiketleri tercih etmelisiniz.',
          'Kuru koli kutuları, kargo ambalajları veya kuru pastane torbaları gibi nemsiz alanlar için ise en ucuz çözümü sunan 1. sınıf kuşe etiket dökümleri bütçenizi en üst düzeyde koruyacaktır.'
        ]
      },
      {
        title: 'Yapışkan Türleri ve Yüzey Tutunma Gücü',
        paragraphs: [
          'Matbaamızda cam, metal veya pp plastik yüzey tiplerine göre farklı yapışkan kalitelerine yer veriyoruz. Cam zeytinyağı şişelerinde sızan yağın etiketin altına işleyip havaya kaldırmaması için yüksek akrilik dikey yapışkan katmanı kullanmaktayız. Kargo nakliye kolilerinde ise sökülmesi imkansız olan esmer Hotmelt kauçuk tutkalını tercih etmekteyiz.'
        ]
      }
    ],
    faqs: [
      { question: 'Opak etiketlerin kesimi nasıl yapılır?', answer: 'Hidrolik dairesel veya dikey lazer kesim teknolojimiz sayesinde etiketlerinizin etrafında sıfır hata yarım kesim uygulayarak elinizle kolayca sökmenize imkan tanıyan taşıyıcı kağıtlarda teslim ediyoruz.' },
      { question: 'Şeffaf etiket üzerine beyaz renk basılıyor mu?', answer: 'Evet, şeffaf yüzeylerde renklerin mat camın arkasında kaybolmaması için logonun altına kalın mat beyaz astar mürekkep püskürtmekteyiz.' }
    ],
    internalLinks: [
      { text: 'Rulo ve Tabaka Etiketlerimiz', path: '/etiket' },
      { text: 'Özel Karton Kutu Siparişi', path: '/kutu' },
      { text: 'Siparişi Sevk Edecek Antetli Dosya', path: '/dosyalar' },
      { text: 'Ürün El Kitapçığı ve Katalogları', path: '/kataloglar' }
    ],
    offers: { lowPrice: '320', highPrice: '3800', count: '9' },
    tagline: 'Şişelerden ve Kavanozlardan Bir Milim Dahi Kaymayan Etiket Gücü'
  },
  'kozmetik-guzellik-merkezi-baski': {
    path: '/sektor/kozmetik-guzellik-merkezi-baski',
    title: 'Güzellik Merkezi ve Kozmetik Baskı Çözümleri | Mavi Basım',
    metaDesc: 'Güzellik merkezleri ve kozmetik markaları için parfüm kutusu, sözleşme, onam formu, seans takip formu, randevu kartı, broşür ve etiket baskısı.',
    h1: 'Güzellik Merkezi ve Kozmetik Baskı Çözümleri',
    intro: 'Güzellik merkezleri, estetik merkezleri ve kozmetik markaları için operasyonel süreçleri ve kurumsal sunumu destekleyen tamamlayıcı matbaa ve ürün ambalajı çözümleri sunuyoruz. Güzellik merkezi form baskısı, lazer epilasyon seans takip formu, güzellik merkezi hizmet sözleşmesi, tahsilat makbuzu, hasta randevu ve bilgi kartı, 300, 350 ve 400 gr Bristol parfüm ve kozmetik kutusu, tanıtım broşürü, neme dayanıklı kozmetik etiketi ve karton çanta ürünlerini işletmenizin ihtiyaçlarına göre özenle hazırlıyoruz.',
    sections: [
      {
        title: 'Güzellik Merkezi Formları ve Danışan Takip Belgeleri',
        paragraphs: [
          'Güzellik merkezleri, estetik merkezleri ve bakım salonlarında danışan karşılama ve hizmet sürecini düzenlemek için güzellik merkezi danışan formu, kayıt formu, müşteri takip formu ve konsültasyon formu seçenekleri hazırlanmaktadır. Uygulama sonrasında müşteri geri bildirimlerini toplamak ve hizmet kalitesini değerlendirmek amacıyla memnuniyet formu ve işlem takip formu baskıları tercih edilmektedir.',
          'Cilt bakımı işlem bilgi formu tasarımlarında danışan bilgileri, işlem tarihi, uzman notu, randevu ve imza alanı düzenli bir mizanpaj ile yerleştirilir. İşlem bilgi ve onam formlarında kullanılacak tüm metinler işletme veya yetkili danışman tarafından baskıya hazır olarak sağlanmalıdır. Mavi Basım bu belgeler için baskı öncesinde çözünürlük, ebat ve taşma payı gibi teknik dosya kontrollerini gerçekleştirir.'
        ]
      },
      {
        title: 'Lazer Epilasyon ve Seans Takip Formu Baskısı',
        paragraphs: [
          'Güzellik merkezi seans çizelgesi ve lazer epilasyon seans takip formu, seanslı bakım ve epilasyon işlemlerinin takibinde operasyonel kolaylık sağlar. Form üzerinde işlem bölgesi, seans numarası, uygulama tarihi, bir sonraki randevu tarihi ve uzman notu için özel alanlar ayrılır.',
          'Paket ve ödeme takip alanı ile danışan imzası içeren bu formlar; işletmenin tercihine göre tek yaprak, koçanlı, perforajlı veya otokopili olarak basılabilmektedir. İki veya üç nüshalı kullanım, seans bilgilerinin işletme ve danışan için ayrı kopyalarda takip edilmesini kolaylaştırabilir.'
        ]
      },
      {
        title: 'Güzellik Merkezi Sözleşmesi ve Tahsilat Makbuzu Baskısı',
        paragraphs: [
          'Güzellik merkezleri için hizmet sözleşmesi baskısı, paket ve seans sözleşmesi ile sözleşme eki ödeme planı gibi basılı evraklar hazırlanmaktadır. Tahsilat makbuzu, senet ve ödeme takip evrakı üretiminde işletmenin unvanı, logosu ve iletişim bilgileri net bir baskı kalitesiyle yer alır.',
          'Kendinden kopyalı otokopili iki veya üç nüsha olarak üretilebilen formlarda koçan, perforaj ve seri numarası seçenekleri sunulur. Sözleşme, senet, işlem bilgi ve onam formlarında kullanılacak nihai metinler müşteri veya yetkili danışman tarafından baskıya hazır olarak sağlanmalıdır. Mavi Basım bu belgelerin hukuki veya tıbbi içeriğini hazırlamaz; baskı öncesi teknik dosya kontrolü ve PDF prova süreci sunar.'
        ]
      },
      {
        title: '300, 350 ve 400 Gr Bristol Parfüm ve Kozmetik Kutuları',
        paragraphs: [
          'Kozmetik markaları ve parfümeriler için parfüm kutusu, krem kutusu, serum kutusu, esans kutusu ve kozmetik ambalaj kutusu üretimi gerçekleştirilmektedir. Şişe ve kavanozların ambalaj içinde sabit durmasını sağlayan karton iç yatak ve separatör uygulamaları kutu modeline özel olarak tasarlanır.',
          'Kutu baskılarında 300 gr Bristol, 350 gr Bristol ve 400 gr Bristol seçenekleri değerlendirilebilir. Karton gramajı; kutunun ölçüsü, kalıp yapısı, ürün ağırlığı ve kullanım amacına göre değerlendirilmelidir. Yüzey uygulamalarında mat selefon, parlak selefon, altın veya gümüş varak, gofre (kabartma), bölgesel lak ve özel kesim alternatifleri sunulmaktadır.'
        ]
      },
      {
        title: 'Randevu Kartı, Broşür, Etiket ve Karton Çanta',
        paragraphs: [
          'Danışanların sonraki seanslarını kolayca takip edebilmesi için hasta randevu ve bilgi kartı ile güzellik merkezi kartviziti hazırlanır. Yeni uygulamaları ve fiyat paketlerini tanıtmak için hizmet broşürü ve kampanya el ilanı baskıları tercih edilir.',
          'Şampuan, krem, serum ve parfüm etiketi için PP opak ve şeffaf etiket seçenekleri kullanılır. Neme ve su sıçramalarına karşı dayanıklılık sağlayabilen PP etiket seçenekleri, ambalaj yüzeyi ve kullanım ortamına göre değerlendirilir. Kozmetik ürün kullanım föyleri, ürün bilgilendirme kartları ve ambalaj kutusu içine yerleştirilen katlamalı dokümanlar, müşteri veya yetkili firma tarafından sağlanan nihai içerikle basılabilir. İpli kozmetik karton çantası ve parfümeri karton çantası ile kurumsal sunum tamamlanır.'
        ]
      },
      {
        title: 'Baskı ve Sipariş Süreci',
        paragraphs: [
          '1. Ürün, ölçü ve adet seçimi: İhtiyacınız olan ürün grubu için ebat, format ve baskı adedini belirleyin.',
          '2. Malzeme ve baskı özelliklerinin belirlenmesi: Kâğıt/karton türü, gramaj, selefon ve varsa lak veya varak gibi ek baskı özelliklerini seçin.',
          '3. Baskıya hazır dosyanın iletilmesi ve teknik kontrol: Tasarım dosyanızı iletin; dosyanız çözünürlük, renk formatı, taşma payı ve kesim çizgileri açısından kontrol edilir.',
          '4. PDF prova ve müşteri onayı: Teknik kontrolleri tamamlanan çalışma dijital PDF prova olarak onayınıza iletilir.',
          '5. Baskı, tamamlayıcı işlemler, paketleme ve gönderim: Onaylanan sipariş ofset baskı, kesim, katlama ve tamamlayıcı işlemlerden sonra özenle paketlenerek anlaşmalı kargo ile sevk edilir.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Güzellik merkezleri için hangi formlar basılabilir?',
        answer: 'Danışan kayıt formu, müşteri takip formu, seans takip çizelgesi, konsültasyon föyü, cilt bakımı bilgi formu ve memnuniyet formları basılabilmektedir.'
      },
      {
        question: 'Lazer epilasyon seans takip formunda hangi alanlar bulunabilir?',
        answer: 'Form üzerinde seans numarası, uygulama tarihi, işlem bölgesi, uygulanan cihaz veya parametre notu, bir sonraki randevu tarihi, paket ödeme bilgisi ve danışan imza alanı yer alabilir.'
      },
      {
        question: 'Güzellik merkezi onam formunun metnini matbaa hazırlıyor mu?',
        answer: 'Hayır. Hukuki, tıbbi ve kişisel veri içeren metinler işletme veya yetkili danışman tarafından baskıya hazır olarak sağlanmalıdır. Matbaa yalnızca baskı öncesi teknik dosya kontrolü yapar.'
      },
      {
        question: 'Güzellik merkezi hizmet sözleşmesi otokopili basılabilir mi?',
        answer: 'Evet. İşletmenin tercihine göre hizmet sözleşmeleri kendinden kopyalı otokopili kâğıda 2 veya 3 nüsha, koçanlı ve perforajlı olarak basılabilir.'
      },
      {
        question: 'Tahsilat makbuzu iki veya üç nüsha hazırlanabilir mi?',
        answer: 'Evet. İhtiyacınıza göre iki veya üç nüshalı otokopili tahsilat makbuzları seri numaralı ve koçanlı olarak üretilebilir.'
      },
      {
        question: 'Parfüm kutusunda 300, 350 ve 400 gr Bristol arasından nasıl seçim yapılır?',
        answer: 'Karton gramajı; kutunun ölçüsü, kalıp yapısı, şişe ağırlığı ve kullanım amacına göre değerlendirilir. Ağır cam şişeler ve özel ambalajlar için daha yüksek gramajlı kartonlar tercih edilebilir.'
      },
      {
        question: 'Kozmetik şişelerinde hangi etiket seçenekleri kullanılabilir?',
        answer: 'Kullanım ortamına ve ambalaj yüzeyine göre neme ve su sıçramalarına karşı dayanıklılık sağlayabilen PP opak etiketler veya şeffaf sticker etiketler tercih edilebilir.'
      },
      {
        question: 'Baskıdan önce PDF prova gönderiliyor mu?',
        answer: 'Evet. Baskıya hazır tasarım dosyanız çözünürlük, renk formatı ve taşma payı açısından teknik kontrolden geçirildikten sonra onayınız için dijital PDF prova iletilir.'
      }
    ],
    internalLinks: [
      { text: 'Parfüm ve Kozmetik Kutusu', path: '/kutu' },
      { text: 'Güzellik Merkezi Formları', path: '/makbuz-ve-formlar' },
      { text: 'Hizmet Sözleşmesi', path: '/sozlesme-baski' },
      { text: 'Tahsilat Makbuzu', path: '/tahsilat-makbuzu' },
      { text: 'Hasta Randevu ve Bilgi Kartı', path: '/kartvizit' },
      { text: 'Tanıtım Broşürü', path: '/brosur' },
      { text: 'Kozmetik Etiketi', path: '/etiket' },
      { text: 'Karton Çanta', path: '/karton-canta' }
    ],
    tagline: 'Parfüm kutusundan seans takip formuna, randevu kartından kozmetik etiketine tamamlayıcı baskı ürünleri'
  },
  'e-ticaret-perakende-baski': {
    path: '/sektor/e-ticaret-perakende-baski',
    title: 'E-Ticaret ve Perakende Baskı Çözümleri | Mavi Basım',
    metaDesc: 'E-ticaret ve perakende markaları için ürün kutusu, karton çanta, teşekkür kartı, ambalaj kâğıdı, Amerikan servis, barkod ve koli etiketi baskısı.',
    h1: 'E-Ticaret ve Perakende Baskı Çözümleri',
    intro: 'E-ticaret ve perakende işletmeleri için ürün sunumu, paketleme ihtiyaçları ve marka kimliğini destekleyen tamamlayıcı matbaa ve ambalaj çözümleri sunuyoruz. E-ticaret kargo kutusu, lüks kraft ve karton çanta, baskılı ambalaj ve paketleme kâğıdı, rulo ve tabaka barkod ve koli etiketi, müşteri teşekkür kartı, fatura cebi ve sevk ve teslimat takip formlarını işletmenizin ihtiyaçlarına göre özenle hazırlıyoruz.',
    sections: [
      {
        title: 'E-Ticaret Ürün Kutuları ve Kargo Paketleme Çözümleri',
        paragraphs: [
          'E-ticaret gönderilerinde kutu ölçüsü ve malzeme seçimi; ürünün ölçüsü, ağırlığı, kırılganlığı, koruyucu dolgu ihtiyacı ve taşıma koşulları dikkate alınarak planlanmalıdır. E-ticaret kargo kutusu modellerinde E-dalga veya mikro ondüle oluklu mukavva ile 230–350 gr Amerikan Bristol seçenekleri talebe, malzeme tedarikine ve teknik uygunluğa göre değerlendirilebilir.',
          'Kilitli taban, kendinden kilitli kapak, yapışkanlı bant şeritli ve kolay açılır perforajlı kutu kalıpları paketleme sürecinde pratiklik sağlar; bu seçenekler sipariş adedine ve teknik uygunluğa göre planlanabilir. Hassas ürünler için kutu içi özel kesim karton separatör ve yuva seçenekleri teknik uygunluk doğrultusunda değerlendirilebilir. Kutu yüzeyine ofset veya talebe göre flekso baskı, mat veya parlak selefon kaplama uygulanarak kurumsal marka kimliği paket üzerinde belirginleştirilir.'
        ]
      },
      {
        title: 'Saten İpli ve Polyester İpli Karton Çantalar',
        paragraphs: [
          'Mağaza içi satışlarda, butik perakendede ve teslimat siparişlerinde karton çanta ve kraft poşetler müşterilerin markanızı taşımasını sağlar. İpli Amerikan Bristol lüks karton çantalar, saten ipli veya polyester ipli tutma kulpları, büküm saplı kraft çantalar ve düz saplı paket poşetleri farklı ebat ve model seçenekleriyle değerlendirilebilir.',
          'Amerikan Bristol karton çantalarda 230 gr, 250 gr ve 300 gr gramaj seçenekleri, alt taban ve üst kulp takviye kartonları talebe ve teknik uygunluğa göre uygulanır. Yüzeyde mat selefon, parlak selefon, varak yaldız ve kabartma lak gibi tamamlayıcı baskı özellikleri tercih edilebilir. Doğal kraft kâğıt çantalarda ise sade logo baskısı ve doğal doku ön plana çıkar.'
        ]
      },
      {
        title: 'Baskılı Ambalaj Kâğıdı ve Paket İçi Marka Kartları',
        paragraphs: [
          'Tekstil, ayakkabı, kozmetik ve hediyelik eşya siparişlerinde ürünün koli içinde özenle sarılması, unboxing (kutu açılış deneyimi) anında müşteride olumlu bir ilk izlenim bırakır. Baskılı pelür kâğıt, sülfit ambalaj kâğıdı, 1. hamur ve kraft paketleme kâğıdı seçenekleri talebe ve malzeme tedarikine göre farklı gramajlarda sunulmaktadır.',
          'Pelür kâğıtlar 18–30 gr aralığında ince ve yarı saydam yapısıyla şık bir sarım sağlar. 40–70 gr sülfit veya 1. hamur kâğıtlar ise daha tok paketleme koruması sunar; bu gramajlar malzeme tedariki ve teknik uygunluğa göre değerlendirilir. Kutu içine eklenen 350 gr mat kuşe müşteri teşekkür kartı, bakım ve kullanım kartı, iade/değişim bilgi kartı ve QR kodlu paket kartları ile müşteri iletişimi desteklenir.'
        ]
      },
      {
        title: 'Barkod, Ürün ve Koli Üzeri Etiketler',
        paragraphs: [
          'Depo yönetimi, sipariş ayrıştırma ve kargo transfer süreçlerinde doğru etiketleme operasyonel düzeni sağlar. Termal rulo barkod etiketleri, kuşe koli adres etiketleri, koli uyarı etiketleri (Kırılabilir / Dikkat), fiyat ve raf etiketleri ile suya ve neme dayanıklı PP opak plastik etiketler işletme ihtiyacına göre üretilmektedir.',
          'Etiket malzemesi ve yapışkan türü (hotmelt veya akrilik yapışkan); karton, koli, plastik veya cam gibi uygulama yüzeyine, kullanım sıcaklığına, neme ve taşıma koşullarına göre teknik uygunluk doğrultusunda belirlenmelidir. Termal yazıcıda kullanılacak rulo etiketlerde ölçü, sarım yönü, göbek çapı ve yazıcı uyumluluğu sipariş öncesinde kontrol edilmelidir.'
        ]
      },
      {
        title: 'Perakende ve Yeme-İçme İşletmeleri İçin Amerikan Servis',
        paragraphs: [
          'Kafe, restoran, fırın, pastane ve paket servis işletmeleri için logo, menü, kampanya, iletişim ve QR kod alanları içerebilen baskılı Amerikan servis seçenekleri hazırlanabilir.',
          'Talebe ve teknik uygunluğa göre 80 gr 1. hamur veya kuşe kâğıt seçenekleri üzerine tek renk ya da çok renkli ofset baskı uygulanabilir. Menü, güncel kampanyalar ve marka görselleri masada müşteriye doğrudan iletilir.'
        ]
      },
      {
        title: 'Baskı ve Sipariş Süreci',
        paragraphs: [
          '1. Ürün, ölçü ve adet belirleme: İhtiyacınız olan kargo kutusu, karton çanta, etiket, teşekkür kartı veya Amerikan servis için ölçü ve baskı tirajını belirleyin.\n2. Baskıya hazır dosyanın iletilmesi: Tasarım çalışmanızı vektörel formatta (PDF, AI) iletin.\n3. Teknik dosya kontrolü: Ekibimiz çözünürlük, CMYK renk modu, kesim ve taşma paylarını teknik kontrolden geçirir.\n4. Dijital PDF prova onayı: Kontrolü tamamlanan çalışma onayınıza sunulur.\n5. Baskı, paketleme ve gönderim: Onayınızın ardından ofset veya flekso baskı, kesim, katlama işlemleri yapılarak siparişiniz kargoya teslim edilir.',
          'Sıfırdan grafik tasarım ve kapsamlı revizyon talepleri standart baskı sürecine dahil olmayıp proje kapsamına göre ayrıca fiyatlandırılabilir.'
        ]
      }
    ],
    faqs: [
      {
        question: 'E-ticaret ürün kutusu için ölçü nasıl belirlenir?',
        answer: 'Paketlenecek ürünün en, boy ve yükseklik ölçülerine kargo payı ve varsa dolgu malzemesi payı eklenerek iç net ölçü belirlenir; teknik uygunluğa göre kalıp seçimi yapılır.'
      },
      {
        question: 'Saten ipli ve polyester ipli karton çanta arasındaki fark nedir?',
        answer: 'Saten ip daha parlak ve yumuşak bir görünüm sunarken polyester ip farklı örgü ve kalınlık seçenekleriyle değerlendirilebilir. Uygun ip türü; çanta ölçüsü, taşınacak ürün, sap kalınlığı ve görsel beklentiye göre seçilmelidir.'
      },
      {
        question: 'Baskılı ambalaj kâğıdında hangi gramajlar kullanılabilir?',
        answer: 'Hafif ve yarı saydam sarımlar için 18–30 gr pelür kâğıt, daha tok sarımlar için 40–70 gr sülfit, kraft veya 1. hamur kâğıt seçenekleri talebe, malzeme tedarikine ve teknik uygunluğa göre değerlendirilebilir.'
      },
      {
        question: 'Teşekkür kartları hangi ölçülerde basılabilir?',
        answer: 'Genellikle 8.5x5.4 cm standart kartvizit ebadında veya 10x15 cm kartpostal boyutunda, 350 gr mat kuşe kâğıt üzerine mat ya da parlak selefon kaplamalı olarak basılır.'
      },
      {
        question: 'Koli üzerine uygulanacak etiket nasıl seçilir?',
        answer: 'Koli kartonunun yüzey yapısına, depo ortam sıcaklığına ve neme göre hotmelt veya akrilik yapışkanlı kuşe veya termal etiket seçenekleri teknik uygunluk doğrultusunda seçilir.'
      },
      {
        question: 'Termal barkod etiketinde hangi bilgiler gereklidir?',
        answer: 'Sipariş takip barkodu, alıcı ve gönderici adres bilgileri, koli sıra numarası ve taşıma uyarı ibareleri (Kırılabilir vb.) yer almalıdır. Sipariş öncesi yazıcının göbek ve kafa ölçüsü kontrol edilmelidir.'
      },
      {
        question: 'Amerikan servis baskısı hangi işletmelerde kullanılabilir?',
        answer: 'Kafe, restoran, fırın, pastane ve paket servis işletmeleri için logo, menü, kampanya, iletişim ve QR kod alanları içerebilen baskılı Amerikan servis seçenekleri hazırlanabilir.'
      },
      {
        question: 'Baskıdan önce PDF prova gönderiliyor mu?',
        answer: 'Evet. Baskıya hazır tasarım dosyanız çözünürlük, CMYK renk formatı ve kesim payları açısından incelendikten sonra dijital PDF prova ile onayınıza sunulur.'
      }
    ],
    internalLinks: [
      { text: 'Kargo ve Ambalaj Kutuları', path: '/kutu' },
      { text: 'Karton Çanta ve Kraft Poşet', path: '/karton-canta' },
      { text: 'Barkod ve Koli Etiketleri', path: '/etiket' },
      { text: 'Müşteri Teşekkür Kartviziti', path: '/kartvizit' },
      { text: 'Amerikan Servis Baskısı', path: '/amerikan-servis' },
      { text: 'Sevk ve Teslimat Takip Formları', path: '/makbuz-ve-formlar' }
    ],
    tagline: 'Kargo kutusundan ambalaj kâğıdına, karton çantadan koli etiketine e-ticaret ve perakende baskı ürünleri'
  },
  'egitim-kurumlari-baski': {
    path: '/sektor/egitim-kurumlari-baski',
    title: 'Eğitim Kurumları Baskı Çözümleri | Mavi Basım',
    metaDesc: 'Eğitim kurumları için deneme sınavı kitapçığı, soru kitapçığı, fasikül, yaprak test, kayıt formu, broşür, katalog, dosya ve eğitim seti baskısı.',
    h1: 'Eğitim Kurumları İçin Baskı Çözümleri',
    intro: 'Eğitim kurumları, kolejler, kurs merkezleri ve eğitim yayıncıları için deneme sınavı kitapçığı, soru kitapçığı, fasikül, yaprak test, çalışma föyü, kayıt evrakları, broşür, katalog, dosya, sertifika ve eğitim seti kutusu gibi tamamlayıcı baskı çözümleri sunuyoruz. Müşterilerimizin ilettiği baskıya hazır tasarımlar için teknik dosya kontrolü ve dijital PDF prova onayı sağlıyor; Türkiye geneline anlaşmalı kargo ile gönderim yapıyoruz.',
    sections: [
      {
        title: 'Deneme Sınavı, Soru Kitapçığı ve Eğitim Materyalleri',
        paragraphs: [
          'Türkiye geneline gönderilen deneme sınavı kitapçıkları ile TYT, AYT, LGS ve YKS deneme kitapçığı baskıları eğitim kurumlarının en temel ihtiyaçları arasında yer alır. Kurs merkezleri ve okullar için mini deneme, branş denemesi, yaprak test, konu testi ve tarama testi çözümleri sunulmaktadır. Ayrıca seviye tespit sınavı, bursluluk sınavı kitapçığı ve kurum içi sınav kitapçığı siparişleri kurumun belirlediği içerik ve sayfa düzeniyle hazırlanır.',
          'Soru kitapçığı ile birlikte basılan cevap anahtarı, çözüm kitapçığı, çalışma föyü, konu anlatım föyü, ödev föyü, etüt föyü ve fasikül gibi basılı materyaller öğrencilerin öğrenme sürecini destekler. Sınav türü, sayfa sayısı, ölçü, kâğıt türü, baskı rengi, harmanlama, tel dikiş veya tutkallı ciltleme gibi teknik özellikler işin kullanım amacına, sayfa sayısına ve sipariş adedine göre belirlenir.'
        ]
      },
      {
        title: 'Öğrenci Kayıt, Takip ve Kurum Formları',
        paragraphs: [
          'Öğrenci kayıt formu, veli kayıt sözleşmesi, öğrenci ve veli bilgi formu ile veli görüşme formu kayıt süreçlerinde düzenli bir veri akışı sağlar. Dönem içi süreçlerde basılı sınav cevap kâğıdı, öğrenci sınav kâğıdı, sınav yoklama formu, sınav sonuç formu, deneme analiz formu, sınav değerlendirme kâğıdı, öğrenci performans formu ve yoklama föyü gibi idari ve sınıf içi takip evrakları kullanılır.',
          'Öğrenci takip formu, rehberlik formu, etüt ve devamsızlık takip formu, sınav takip formu, deneme sınavı değerlendirme formu, öğrenci başarı takip formu ve öğretmen ders takip formu kurumsal düzeni pekiştirir. Mali süreçlerde ödeme takip formu, tahsilat makbuzu, tediye makbuzu ile fatura ve irsaliye klasör evrakları tercih edilirken tüm belgeler cepli dosya ve klasörlerde arşivlenir. Sözleşme, form ve resmî evrak içeriklerinin müşteri tarafından baskıya hazır şekilde sağlanması gerekmektedir.'
        ]
      },
      {
        title: 'Kayıt Dönemi Broşürü, Afiş ve Tanıtım Materyalleri',
        paragraphs: [
          'Kayıt broşürü, eğitim programı ve kurs tanıtım broşürü, LGS ve TYT–AYT broşürü, bursluluk sınavı broşürü, erken kayıt ve yaz okulu broşürü ile kayıt kampanyası broşürü gibi katlamalı tanıtım materyalleri eğitim kurumlarının kayıt dönemlerinde geniş kitlelere ulaşmasını sağlar. Ayrıca deneme sınavı ve açık gün davetiyesi, kurum tanıtım kataloğu, ücret kataloğu ve eğitim programı kitapçığı veli iletişiminde detaylı bilgi sunar.',
          'Kayıt afişi, bursluluk sınavı afişi, LGS ve YKS afişi, başarı ve derece öğrencileri afişi, deneme sınavı afişi ile erken kayıt ve kayıt kampanyası afişleri kuşe kâğıt seçenekleriyle hazırlanır. Kurum içi alanlarda ise 50×70 ve 70×100 cm sınıf içi motivasyon posteri, ders programı ve rehberlik posteri seçenekleri güçlü bir kurumsal görünürlük sağlar.'
        ]
      },
      {
        title: 'Kitap, Fasikül, Katalog ve Kurum Yayınları',
        paragraphs: [
          'Soru bankası, deneme kitabı, konu anlatım kitabı, yardımcı kitap, çalışma kitabı, öğrenci çalışma kitabı, tatil ve yaz çalışma kitabı yayınları eğitim programlarının omurgasını oluşturur. LGS, TYT ve AYT hazırlık kitabı, branş kitabı, rehberlik kitabı ile mini ve cep kitapçığı gibi yayınlar öğrencilerin çalışma düzenini destekler.',
          'Eğitim ve kurum tanıtım kataloğu, veli bilgilendirme kataloğu, yıllık eğitim kataloğu, öğrenci rehberi, kurs programı, yaz okulu kataloğu ve başarı kataloğu gibi çok sayfalı kurumsal yayınlar hazırlanmaktadır. Kurum, öğrenci ve mezun dergisi, okul yıllığı ve başarı hikâyeleri dergisi için Mavi Basım yayın içeriği hazırlamamakta; müşteriden gelen baskıya hazır PDF dosyalarının teknik kontrollerini yapıp prova onayı sonrası baskısını tamamlamaktadır.'
        ]
      },
      {
        title: 'Çocuk Etkinlik Kitapları, Eğitici Kartlar ve Kutulu Setler',
        paragraphs: [
          'Okul öncesi ve ilköğretim kademeleri için boyama kitabı ve boyama sayfaları, etkinlik kitabı, çocuk etkinlik föyü, çıkartma kitapçığı, aktivite kitapçığı, tatil etkinlik kitabı ve okul öncesi çalışma kitabı gibi basılı kaynaklar hazırlanmaktadır.',
          'Matematik kartları, İngilizce ve Türkçe kelime kartları, hafıza kartları, soru-cevap kartları, eğitici oyun kartları, meslek ve duygu kartları, hayvan, sayı ve harf kartları, flashcard ve öğretmen etkinlik kartları isteğe bağlı olarak özel baskılı kutulu set hâlinde hazırlanabilir. Deneme sınavı kutusu, öğrenci, eğitim ve kitap seti kutusu, etkinlik seti kutusu, flashcard ve oyun kartı kutusu ile öğretmen ve kırtasiye seti kutusu gibi ambalaj çözümleri kart ve kitapların ölçüsüne ve sayısına göre planlanabilir.'
        ]
      },
      {
        title: 'Kurumsal Okul ve Şube Baskı Ürünleri',
        paragraphs: [
          'Karton ve kraft çanta, cepli dosya, sertifika ve diploma, katılım, başarı ve teşekkür belgesi eğitim kurumlarının kurumsal kimliğini güçlendirir. Öğrenci, personel ve yaka kartı, kartvizit, antetli kâğıt ve zarf, not defteri ve bloknot gibi kurumsal kırtasiye materyalleri günlük okul işleyişini kolaylaştırır.',
          'Şube ve bina içi kullanımda ders programı, sınıf ve öğretmen kapı tabelası, rehberlik odası ve danışma tabelası, yönlendirme levhası, sınıf numarası, uyarı levhası, duvar posteri, motivasyon sözleri panoları, başarı panosu ve öğrenci başarı kartı gibi tamamlayıcı kurumsal ihtiyaçlar için WhatsApp teklif hattımız üzerinden özel proje teklifleri sunulmaktadır.'
        ]
      },
      {
        title: 'Baskı ve Sipariş Süreci',
        paragraphs: [
          '1. Ürün, Ölçü, Sayfa ve Adet Belirleme: İhtiyacınız olan eğitim materyali, kâğıt gramajı, baskı renkleri, sayfa adedi ve sipariş miktarını netleştirin.',
          '2. Baskıya Hazır Dosyaların İletilmesi: Sayfa düzeni tamamlanmış, yüksek çözünürlüklü ve baskıya hazır PDF dosyalarınızı iletin. Sıfırdan grafik tasarım veya kapsamlı revizyon talepleri ayrıca fiyatlandırılmaktadır.',
          '3. Teknik Dosya Kontrolü: İletilen dosyalar kesim payı, renk formatı, sayfa sıralaması ve çözünürlük açısından teknik kontrolden geçirilir.',
          '4. Dijital PDF Prova Onayı: Teknik kontrolden geçen tasarım için onayınıza dijital PDF prova sunulur. Onayınızın ardından iş baskı aşamasına alınır.',
          '5. Baskı, Ciltleme, Paketleme ve Kargo: Ofset veya dijital baskı, harmanlama, tel dikiş veya tutkallı ciltleme tamamlanarak ürünler koruyucu ambalajla paketlenir ve anlaşmalı kargo ile sevk edilir.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Eğitim kurumları için hangi sınav materyalleri basılabilir?',
        answer: 'Özel okullar, kurs merkezleri, etüt merkezleri ve eğitim yayıncıları için TYT, AYT, LGS ve YKS deneme sınavı kitapçıkları, mini ve branş denemeleri, konu ve tarama testleri, yaprak testler, soru kitapçıkları, cevap anahtarları ve çözüm kitapçıkları basılmaktadır. Tüm materyaller kurumun sayfa sayısı, ebat, kâğıt türü ve adet talebine göre ofset veya dijital baskı seçenekleriyle hazırlanır.'
      },
      {
        question: 'Deneme sınavı kitapçığında ölçü ve kâğıt nasıl belirlenir?',
        answer: 'Deneme sınavı kitapçıkları genellikle A4 veya 19×27 cm ebatlarında, 1. hamur veya kuşe kâğıt seçenekleriyle hazırlanmaktadır. Sayfa sayısı, kapak gramajı, tek renk (siyah-beyaz) veya çok renkli iç sayfa tercihleri ile tel dikiş veya tutkallı ciltleme seçenekleri kurumun sipariş detaylarına ve kullanım amacına göre belirlenmektedir.'
      },
      {
        question: 'Soru kitapçığı, cevap anahtarı ve çözüm kitapçığı birlikte hazırlanabilir mi?',
        answer: 'Evet; kurumunuzdan gelen baskıya hazır dosyalara uygun olarak soru kitapçığı, cevap anahtarı föyü ve ayrıntılı çözüm kitapçığı tek bir baskı sürecinde kombine edilerek basılabilir ve harmanlanmış şekilde teslim edilebilir.'
      },
      {
        question: 'Öğrenci kayıt ve takip formları otokopili basılabilir mi?',
        answer: 'Evet; öğrenci kayıt sözleşmeleri, veli bilgi ve görüşme formları, etüt ve devamsızlık takip formları ile tahsilat makbuzları kendinden kopyalı 2 veya 3 nüshalı otokopi kâğıdına basılabilmektedir. Formların cilt veya koçan yapısı, perforaj ve numaratör detayları kurum talebine göre belirlenir. Hukuki ve sözleşme metinlerinin baskıya hazır şekilde iletilmesi gerekmektedir.'
      },
      {
        question: 'Eğitim kurumları için broşür, afiş ve katalog basılıyor mu?',
        answer: 'Evet; erken kayıt dönemleri, bursluluk sınavları, yaz okulları ve genel kurum tanıtımları için kuşe kâğıt katlamalı broşürler, 50×70 ve 70×100 cm tanıtım afişleri ile çok sayfalı kurumsal tanıtım katalogları hazırlanmaktadır. Ürün özelliklerine ve sipariş adedine göre uygun baskı seçenekleri değerlendirilir.'
      },
      {
        question: 'Boyama kitabı ve eğitici kart seti hazırlanabilir mi?',
        answer: 'Evet; okul öncesi ve ilköğretim kurumları için boyama kitapları, çocuk etkinlik kitapları, flashcard, İngilizce ve matematik kelime kartları ile hafıza kartı setleri basılabilmektedir. Kartlar ve kitaplar isteğe bağlı olarak özel baskılı eğitim kutuları içerisinde set hâlinde hazırlanabilir.'
      },
      {
        question: 'Çok şubeli eğitim kurumları için toplu baskı yapılabilir mi?',
        answer: 'Evet; çok şubeli kolejler, kurs merkezleri ve eğitim yayıncıları için merkezi siparişler hazırlanabilmektedir. Siparişler koruyucu biçimde paketlenerek anlaşmalı kargoya teslim edilebilir. Birden fazla teslimat adresi bulunan siparişlerin dağıtım planı teklif aşamasında değerlendirilir.'
      },
      {
        question: 'Baskıdan önce PDF prova gönderiliyor mu?',
        answer: 'Evet; iletilen tüm baskıya hazır dosyalar çözünürlük, kesim payı, sayfa sıralaması ve renk formatı açısından teknik kontrolden geçirilir ve baskı aşamasına geçilmeden önce dijital PDF prova onayı alınır.'
      }
    ],
    internalLinks: [
      { text: 'Kayıt ve Tanıtım Broşürleri', path: '/brosur' },
      { text: 'Eğitim Tanıtım Afişleri', path: '/afis' },
      { text: 'Kurum Tanıtım Katalogları', path: '/kataloglar' },
      { text: 'Öğrenci Kayıt ve Takip Formları', path: '/makbuz-ve-formlar' },
      { text: 'Cepli Kurumsal Dosyalar', path: '/dosyalar' },
      { text: 'Eğitim Seti Kutusu Baskısı', path: '/kutu' },
      { text: 'Kurumsal Karton Çanta', path: '/karton-canta' },
      { text: 'Bloknot ve Not Defteri', path: '/bloknotlar' }
    ],
    tagline: 'Deneme kitapçığından kayıt evraklarına, eğitim yayınlarından kurumsal baskı ürünlerine tamamlayıcı matbaa çözümleri'
  },
  'kutu-ambalaj-baski-cozumleri': {
    path: '/sektor/kutu-ambalaj-baski-cozumleri',
    title: 'Kutu ve Ambalaj Baskı Çözümleri | Mavi Basım',
    metaDesc: 'İlaç, parfüm, kozmetik ve gıda ürünleri için baskılı kutu çözümleri. Zurna dürüm, taco, popcorn, cips, baklava ve özel ölçülü ambalaj kutuları.',
    h1: 'Kutu ve Ambalaj Baskı Çözümleri',
    intro: 'İlaç kutusu, parfüm kutusu ve kozmetik kutusu modellerinden zurna dürüm kutusu, taco kutusu, popcorn kutusu ve cips kutusu gibi fast-food ambalajlarına kadar geniş bir yelpazede baskılı kutu çözümleri sunuyoruz. Baklava ve tatlı kutusu seçeneklerimizin yanı sıra ürün etiketi, baskılı ambalaj kâğıdı ve karton çanta ürünlerimizle ambalaj sürecinizi tamamlayabilirsiniz.',
    sections: [
      {
        title: 'İlaç, Medikal Ürün ve Takviye Edici Gıda Kutuları',
        paragraphs: [
          'İlaç kutusu, medikal ürün kutusu, vitamin kutusu, takviye edici gıda kutusu ile serum ve bakım ürünü kutusu modelleri, ürünün hassas ölçülerine ve ambalaj içi koruma gereksinimlerine göre planlanmaktadır. Kutu içi kullanım föyü veya prospektüs alanı, barkod, seri numarası, parti ve son kullanma tarihi için ayrılabilecek baskı alanları ile karton iç yatak ve separatör çözümleri teknik dosyaya uygun olarak uygulanır. Braille kabartması, özel yasal işaretler ve resmî ambalaj unsurları; müşterinin onaylı baskıya hazır dosyası, talep edilen teknik özellikler ve uygulama uygunluğu doğrultusunda ayrıca değerlendirilir.',
          'Zorunlu Uyarı: Mavi Basım ilaç, medikal ürün, takviye edici gıda veya kozmetik ambalajlarının hukuki, tıbbi ya da mevzuata ilişkin içeriğini hazırlamaz. Ürün metinleri, kullanım bilgileri, barkodlar, resmî işaretler ve onaylı ambalaj tasarımı müşteri veya yetkili danışmanı tarafından baskıya hazır şekilde sağlanmalıdır.'
        ]
      },
      {
        title: '300, 350 ve 400 Gr Bristol Parfüm ve Kozmetik Kutuları',
        paragraphs: [
          'Parfüm kutusu, esans kutusu, krem kutusu, serum kutusu ile şampuan ve bakım ürünü kutusu baskılarında 300 gr, 350 gr ve 400 gr Amerikan Bristol karton seçenekleri değerlendirilmektedir. Mat veya parlak selefon kaplama, altın veya gümüş varak yaldız, gofre (kabartma), bölgesel lak, özel kesim şeffaf pencere ile ürünün şişe veya kavanozunu sabitleyen karton iç yatak ve separatör uygulamaları ambalaja kurumsal bir görünüm kazandırır.',
          'Karton gramajı ve kutu mukavemeti; kutunun net ölçüsü, kalıp yapısı, ürün ağırlığı, cam şişe kullanımı, taşıma koşulları ve iç yatak ihtiyacına göre teknik olarak belirlenmelidir. 300, 350 veya 400 gr seçeneklerinden hiçbiri tüm ürün çeşitleri için tek bir standart oluşturmaz; doğru gramaj işin fiziksel gereksinimlerine göre seçilir.'
        ]
      },
      {
        title: 'Zurna Dürüm, Taco ve Fast-Food Kutuları',
        paragraphs: [
          'Zurna dürüm kutusu, klasik dürüm kutusu, taco kutusu, hamburger kutusu, patates kutusu, menü kutusu ve paket servis kilitli kutu çözümleri ürünün porsiyon büyüklüğüne ve servis biçimine göre özel ölçülerde hazırlanabilir. Taşıma ve pratik tüketim sağlayan kilit mekanizmalı kutu modelleri, paket servis kutularının açılma, kapanma ve taşıma kullanımını kolaylaştırabilir.',
          'Doğrudan gıda teması gereken işlerde kullanılacak kâğıt, karton, kaplama ve mürekkep özellikleri; sıcaklık, yağ oranı, nem ve tüketim süresi gibi kullanım şartlarına ve tedarikçi belgelerine göre değerlendirilmelidir. Yağlı veya sıcak ürünlerin taşınmasında ambalaj malzemesi ve iç kaplama tercihi ürünün gereksinimlerine göre planlanır.'
        ]
      },
      {
        title: 'Popcorn, Cips ve Atıştırmalık Kutuları',
        paragraphs: [
          'Popcorn kutusu, patlamış mısır kutusu, cips kutusu, atıştırmalık kutusu, külah tipi kutu ve üstten açık servis kutusu seçenekleri; tek porsiyonluk mini boylardan sinema, festival, etkinlik, restoran ve fast-food zincirlerine yönelik büyük boylara kadar farklı hacimlerde planlanmaktadır.',
          'Marka logosu, kampanya mesajı ve dinamik görsel tasarımlar için geniş baskı yüzeyleri sunan atıştırmalık kutularında, kutunun taşıyacağı ürünün ağırlığına ve porsiyon servis süresine uygun karton gramajı ve taban kilit yapısı tercih edilir.'
        ]
      },
      {
        title: 'Baklava, Pasta, Kurabiye, Lokum ve Çikolata Kutuları',
        paragraphs: [
          'Baklava kutusu, pasta kutusu, kurabiye kutusu, lokum kutusu, çikolata kutusu ve geleneksel tatlı kutuları için pencereli kutu, tepsi tipi kutu, sıvama kutu, özel ölçülü kutu ve separatörlü çikolata kutusu modelleri hazırlanmaktadır.',
          'Tatlı ve çikolata ambalajlarında ürünün toplam ağırlığı, şerbet yoğunluğu veya hassasiyeti göz önünde bulundurularak taban ve yan duvar mukavemeti belirlenir. Pencere malzemesi, karton yapısı ve yüzey koruma uygulamaları ürünün saklama ve sunum biçimine göre değerlendirilir.'
        ]
      },
      {
        title: 'Kahve, Yöresel Ürün ve Perakende Ambalajları',
        paragraphs: [
          'Kahve kutusu, çay kutusu, baharat kutusu, bal ve reçel ürün kutusu, yöresel ürün kutusu, hediyelik ürün kutusu ile e-ticaret gönderi kutusu seçenekleri perakende raflarında güçlü bir sunum sağlar. Ambalajı tamamlayan kavanoz ve şişe etiketleri, paket içi teşekkür kartı ve marka logolu baskılı ambalaj kâğıdı ürünün albenisini artırır.',
          'Yöresel üreticiler ve butik markalar için karton kutu, kuşe etiket ve ambalaj kâğıdı gibi tamamlayıcı baskı materyalleri sipariş adedine ve ambalaj ölçülerine göre belirlenmektedir.'
        ]
      },
      {
        title: 'Kutu Tasarımı, Kalıp ve Yüzey Uygulamaları',
        paragraphs: [
          'Kutu hazırlığı; ürünün net en, boy, yükseklik ölçülerinin alınması ve milimetrik toleranslarla kutu açık ölçüsünün belirlenmesiyle başlar. Kilitli taban, otomatik taban, yapıştırmalı kutu, pencereli kutu veya separatörlü iç yatak gibi kalıp modelleri ambalajın kullanım kolaylığını ve mukavemetini oluşturur.',
          'Ambalaj yüzeyinde mat veya parlak selefon, altın veya gümüş varak yaldız, gofre kabartma ve bölgesel lak gibi estetik dokunuşlar uygulanabilir. Siparişin teknik özelliklerine, sipariş hacmine ve kalıp yapısına göre numune veya maket ihtiyacı önceden değerlendirilir.'
        ]
      },
      {
        title: 'Baskı ve Sipariş Süreci',
        paragraphs: [
          '1. Ürün Ölçüsü, Kullanım Amacı ve Adet Bilgisi: Kutunun taşıyacağı ürünün tam ölçüleri, kullanım şartları ve talep edilen sipariş adedi belirlenir.',
          '2. Karton, Kutu Modeli ve Yüzey Uygulamalarının Belirlenmesi: Bristol, krome veya mikro ondüle karton türü, taban yapısı, selefon, varak veya lak tercihleri netleştirilir.',
          '3. Baskıya Hazır Dosya ve Bıçak Çiziminin Teknik Kontrolü: Müşteri tarafından iletilen baskıya hazır PDF dosyası ve bıçak izi kesim payı, kırım çizgileri ve renk formatı açısından kontrol edilir. Sıfırdan grafik tasarım ve kapsamlı revizyon talepleri ayrıca fiyatlandırılmaktadır.',
          '4. Dijital PDF Prova ve Numune Değerlendirmesi: Ekran üzerinden yerleşim ve metin kontrolü sağlayan dijital PDF prova onaya sunulur; PDF prova fiziksel baskı rengini veya karton sertliğini birebir garanti etmez. Gerekli durumlarda fiziksel numune veya maket değerlendirilir.',
          '5. Baskı, Kesim, Kırım, Yapıştırma ve Teslimat: Ofset baskı, selefon kaplama, özel bıçakla kesim, kırım, katlama ve yan yapıştırma işlemleri tamamlanarak ürünler koruyucu paketlerle anlaşmalı kargoya teslim edilir.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Kutu baskısı için hangi karton türleri kullanılabilir?',
        answer: 'Kutu baskılarında ürünün ağırlığına ve kullanım amacına göre 300, 350 ve 400 gr Amerikan Bristol, krome karton veya mikro ondüle (E dalga) karton çeşitleri tercih edilmektedir.'
      },
      {
        question: 'Parfüm kutusunda 300, 350 ve 400 gr Bristol arasından nasıl seçim yapılır?',
        answer: 'Seçim; cam şişenin ağırlığına, kutunun boyutuna, iç yatak ve separatör ihtiyacına göre yapılır. Küçük ve hafif şişelerde 300–350 gr Bristol yeterli olabilirken, ağır cam şişelerde 400 gr Bristol veya iç yatak takviyesi tavsiye edilir.'
      },
      {
        question: 'İlaç ve medikal ürün kutularının içeriğini matbaa hazırlıyor mu?',
        answer: 'Hayır; Mavi Basım medikal, takviye gıda veya ilaç kutularının hukuki, tıbbi ve yasal içeriğini hazırlamaz. Ürün metinleri, kullanım bilgileri, barkod ve onaylı tasarımlar müşteri tarafından baskıya hazır dosyada iletilmelidir.'
      },
      {
        question: 'Zurna dürüm, taco ve fast-food kutuları özel ölçüde hazırlanabilir mi?',
        answer: 'Evet; zurna dürüm, taco, burger veya patates servisleriniz için porsiyon boyutlarınıza uygun özel en, boy ve kilit mekanizmasına sahip kutu modelleri hazırlanabilmektedir.'
      },
      {
        question: 'Popcorn ve cips kutularında karton seçimi nasıl yapılır?',
        answer: 'Porsiyon büyüklüğü, servis süresi, sıcaklık, yağ ve nem koşullarına göre karton ve kaplama seçenekleri değerlendirilir. Doğrudan gıda temasının bulunduğu işlerde malzeme seçimi kullanım şartları ve tedarikçi belgelerine göre yapılmalıdır.'
      },
      {
        question: 'Baklava, pasta ve çikolata kutularında pencere veya separatör uygulanabilir mi?',
        answer: 'Evet; ürün sunumunu zenginleştirmek için şeffaf pencereli kutu kapakları veya çikolata ve kurabiyeleri ayrı bölmelerde tutan karton separatörler uygulanabilmektedir.'
      },
      {
        question: 'Kutu baskısından önce PDF prova veya numune gönderiliyor mu?',
        answer: 'Evet; baskı öncesinde bıçak yerleşimi ve metin kontrolü için dijital PDF prova iletilir. PDF prova yerleşim kontrolü içindir; işin kapsamına ve adet durumuna göre fiziksel maket veya numune süreci ayrıca değerlendirilebilir.'
      },
      {
        question: 'Türkiye geneline kutu ve ambalaj gönderimi yapılıyor mu?',
        answer: 'Evet; baskı ve yapıştırma işlemleri tamamlanan kutular koruyucu paketleme ile hazırlanarak anlaşmalı kargo aracılığıyla Türkiye\'nin tüm illerine sevk edilmektedir.'
      }
    ],
    internalLinks: [
      { text: 'Özel Tasarım Kutu Baskısı', path: '/kutu' },
      { text: 'Ürün ve Ambalaj Etiketleri', path: '/etiket' },
      { text: 'Karton Çanta Baskısı', path: '/karton-canta' },
      { text: 'Katlamalı Ürün Föyü & Broşür', path: '/brosur' },
      { text: 'Matbaa & Baskı Ürünleri', path: '/matbaa' }
    ],
    tagline: 'İlaç ve parfüm kutusundan fast-food ve özel ürün ambalajlarına tamamlayıcı kutu baskı çözümleri'
  },
  'eczane-el-ilani-baski': {
    path: '/sektor/eczane-el-ilani-baski',
    title: 'Eczane ve Sağlık Bilgilendirme İlanı Baskısı | Medikal El İlanları',
    metaDesc: 'Eczaneler, klinikler ve sağlık kuruluşları için nöbetçi eczane duyuruları, hasta bilgilendirme broşürleri ve medikal tanıtım el ilanları.',
    h1: 'Eczane ve Sağlık Merkezleri İçin Tanıtım & Bilgilendirme El İlanı',
    intro: 'Eczaneler, tıp merkezleri ve sağlık danışmanları için hasta bilgilendirme broşürleri, nöbetçi eczane krokileri, mevsimsel aşı ve vitamin kampanyası el ilanları üretiyoruz. Okunaklı tipografi ve canlı renklerle basılan ilanlarımız halk sağlığı iletişimini güçlendirir.',
    sections: [
      {
        title: 'Medikal ve Eczane Standartlarına Uygun Canlı Ofset Baskı',
        paragraphs: [
          'Reçete arkası veya poşet içine yerleştirilen 115 gr veya 130 gr kuşe el ilanlarımız, ilaç kullanım uyarıları ve sağlık duyuruları için ideal netlikte basılır. Akrilik su bazlı koruyucu lak kaplama sayesinde elden ele dolaşırken solmaz.'
        ]
      }
    ],
    faqs: [
      { question: 'Eczane el ilanları ne kadar sürede basılıyor?', answer: 'Tasarım onayınızdan sonra en geç 2-3 iş günü içinde basılıp adresinize sevk edilir.' }
    ],
    internalLinks: [
      { text: 'Eczane İlaç Tarifi Etiketleri', path: '/etiket' },
      { text: 'Eczane Reçete Zarfları', path: '/zarf' },
      { text: 'Hasta Takip ve Randevu Kartı', path: '/kartvizit' }
    ],
    offers: { lowPrice: '250', highPrice: '1800', count: '6' },
    tagline: 'Eczane ve Sağlık Kuruluşları İçin Güvenilir ve Net Bilgilendirme Baskıları'
  },
  'emlakci-kartvizit-baski': {
    path: '/sektor/emlakci-kartvizit-baski',
    title: 'Emlakçı Kartvizit Baskı Fiyatları | Cam Filmi ve Branda Afişleri',
    metaDesc: 'Gayrimenkul danışmanları için lüks kabartma laklı kalın kartvizitler, kiralık/satılık emlak dış mekan yırtılmaz branda afiş dökümleri. Topkapı imalatından!',
    h1: 'Gayrimenkul Danışmanları İçin Kartvizit ve Branda Çözümleri',
    intro: 'Emlak sektöründe güven, portföyün büyüklüğü kadar danışmanın sunduğu kartvizitin kalitesinde gizlidir. İnce, hırpalanmış bir kartvizit sunmak, portföy değerinizi aşağıya çeker. Mavi Basım ile lüks kalın kartlar basın.',
    sections: [
      {
        title: '700 gr Kalın Lüks Sıvama Kartvizitlerin Saygınlığı',
        paragraphs: [
          'Büyük yatırımlara rehberlik eden gayrimenkul brokerları için standart kuşe kartlar yetersiz kalır. Markamıza özel ürettiğimiz, araya kontrast bir renkli karton sıkıştırılarak basılan 700 gr çift kat sıvamalı lüks kenar boyalı kartvizit modellerimiz, el sıkışmada elit bir itibar inşa eder.'
        ]
      },
      {
        title: 'Dış Mekan Satılık Kiralık Branda Afişleri',
        paragraphs: [
          'Caddelerde ve daire camlarında asılı duran emlak afişleri rüzgara, yağmura doğrudan direnç göstermelidir. 440 gr dökme yırtılmaz branda üzerine ultraviyole solmaz mürekkeplerle bastığımız afişler, 12 ay boyunca renklerini saklar.'
        ]
      }
    ],
    faqs: [
      { question: 'Emlak afiş kenarlarında kapsül yuva açıyor musunuz?', answer: 'Evet, rüzgar iplerinin brandayı yırtmadan bağlanabilmesi için kenarlara mukavemetli paslanmaz metal kuşgözü halkaları cakıyoruz.' }
    ],
    internalLinks: [
      { text: 'Lüks Kalın Kartvizit Çeşitleri', path: '/kartvizit' },
      { text: 'Emlakçı El İlanları', path: '/el-ilani' },
      { text: 'Kiralık/Satılık Branda Afişleri', path: '/afis' },
      { text: 'Şık Kurumsal Sunum Klasörü', path: '/dosyalar' }
    ],
    offers: { lowPrice: '450', highPrice: '3800', count: '10' },
    tagline: 'Büyük Gayrimenkul İmzalarında Güven Sayan Mürekkep İzleri'
  },
  'kafe-menu-baski': {
    path: '/sektor/kafe-menu-baski',
    title: 'Kafe Menü Baskı Fiyatları | Logolu Amerikan Servis ve Masa Kartı',
    metaDesc: 'Kafeler için kalın sıvama kapaklı, metal spiral ciltli, suya dayanıklı yırtılmaz sentetik menü, masa üstü QR kod kartları ve logolu el ilanları. Mavi Basımla!',
    h1: 'Kafeler ve Kahve Salonları İçin Özel Menü Baskı Çözümleri',
    intro: 'Müşterilerinizin kafede masaya oturduğunda eline aldığı menü, dükkanın mutfak ciddiyetidir. Sayfaları yıpranmış, yağ lekeleri bulaşmış veya spirali kırılmış menüler kafenin imajını hırpalar. Mavi Basım olarak yıpranmaz menüler üretiyoruz.',
    sections: [
      {
        title: 'Yırtılmaz Sentetik Kağıt Teknolojisi',
        paragraphs: [
          'Kafelerdeki yoğun kahve buharı ve sökülen su dökülmelerine karşı standart kağıt menüler kısa sürede çürür. Mavi Basım olarak dökümlerimizde selüloz barındırmayan, plastik bazlı yırtılmayan suya gömülse dahi deforme olmayan sentetik menü kağıtları basmaktayız.',
          'Sırt kısımlarına pürüzsüz narin metal tel çift spiraller takarak sayfaların 360 derece kopmadan ve buruşmadan dönmesini pürüzsüz kılıyoruz.'
        ]
      }
    ],
    faqs: [
      { question: 'Masaüstü QR menü kartonu yapıyor musunuz?', answer: 'Evet, masaların ortasında dik duracak şık lüks şeffaf pleksiler içine ya da kalın laklı kromo üçgen ayaklı kartonlara QR kod baskısı sağlıyoruz.' }
    ],
    internalLinks: [
      { text: 'Sıvama ve Spiral Menü Çeşitleri', path: '/kafe-menu-baski' },
      { text: 'Masalara Özel Kağıt Servis', path: '/amerikan-servis' },
      { text: 'Karton Bardak Altlığı', path: '/fiyat-sor' },
      { text: 'Kafeler İçin Broşür Menüler', path: '/brosur' }
    ],
    offers: { lowPrice: '850', highPrice: '7200', count: '11' },
    tagline: 'Yoğun Yoğrulmalara ve Kahve Islaklığına Dayanıklı Yırtılmaz Sınıf Menüler'
  },
  'lokanta-amerikan-servis-baski': {
    path: '/sektor/lokanta-amerikan-servis-baski',
    title: 'Lokanta Amerikan Servis Baskı Fiyatları | Logolu Kağıt Servis',
    metaDesc: 'Lokanta ve steakhouse masalarına şık 80 gr kraft kağıt ve 1. hamur logolu tek kullanımlık dikey kağıt amerikan servis basımı. Topkapı fabrikasından hızlı kargoyla!',
    h1: 'Lokantalar İçin Tek Kullanımlık Amerikan Servis İmalatı',
    intro: 'Restorana veya lokantaya oturan müşterilerin doğrudan tepsilerine veya masalarına serilen kağıt Amerikan Servisler, müşterinin gözünü ilk dinlendirdiği alandır. Masadaki o saniyeleri dükkanınızı tanıtarak, yan ürünlerinizi satarak değerlendirin.',
    sections: [
      {
        title: 'Ahşap Kraft Kağıt ve Kar Beyazı 1. Hamur Farkı',
        paragraphs: [
          'Steakhouse, butik köfteci ve gurme burger salonları için doğal organik kahverengi lif yapısıyla öne çıkan 80 gr Kraft kağıtlar asil bir hava katar. Balık lokantaları veya aile restoranları için ise beyazlığı temizlik saçan 80 gr 1. Hamur Amerikan Servisleri önerilmektedir.',
          'Bütün Amerikan servislerimizde gıda boyalı koku yapmayan bitki mürekkepler kullanılmakta olup, kaynar porselen tabak temasında dikey birikme ve dökülme yaşamaz.'
        ]
      }
    ],
    faqs: [
      { question: 'Amerikan servis ebat standartları nelerdir?', answer: 'Genellikle bütçe dostu 30x40 cm ve tepsileri tam kaplayan geniş 35x50 cm ebatları lokanta sektörünün evrensel sınırlarıdır.' }
    ],
    internalLinks: [
      { text: 'Logolu Kraft Amerikan Servis', path: '/amerikan-servis' },
      { text: 'Katlamalı Menü Broşürleri', path: '/brosur' },
      { text: 'Servis Altı Mıknatıslı Magnet', path: '/magnet' },
      { text: 'Kurye Paket Servis Cepli Poşet', path: '/karton-canta' }
    ],
    offers: { lowPrice: '380', highPrice: '1900', count: '5' },
    tagline: 'Masa Sirkülasyonuna Pratik, Ekonomik ve Sağlıklı Matbaa Kalkanı'
  },
  'istanbul-brosur-baski': {
    path: '/istanbul-brosur-baski',
    title: 'İstanbul Broşür Baskı Fiyatları | Topkapı Matbaacılar Sitesi İmalatı',
    metaDesc: 'İstanbul içi aynı gün kuryeyle teslim, 135 gr kuşe katlamalı el ilanları ve dikey broşür baskısı. Zeytinburnu Topkapı aracı dükkansız doğrudan fabrikadan!',
    h1: 'İstanbul Geneli Hızlı Broşür ve El İlanı Baskı Hizmetleri',
    intro: 'İstanbul içindeki işletmeler için zaman paradır. Hazırladığınız indirim kampanyasını, yeni şube açılış broşürlerini saniyeler içinde elden sevk etmek için doğrudan Topkapı fabrikasıyla çalışmalısınız. Mavi Basımla aracısız çözün.',
    sections: [
      {
        title: 'Topkapı’da Yer Alan Dev Ofset Parkurumuzun Gücü',
        paragraphs: [
          'Aracılara veya fason dükkanlara komisyon ödemeyin. İstanbul Zeytinburnu Topkapı 2. Matbaacılar Sitesindeki üretim tesislerimizde, broşürlerinizi en yüksek teknolojiye sahip Heildelberg çok renkli ofset preslerimizde basıyoruz.',
          'Taslaşınızı sitemiz üzerinden grafik panellerimize yükleyebilir veya grafik tasarımcılarımızdan pilyaj ve yerleşim desteği talep edebilirsiniz.'
        ]
      }
    ],
    faqs: [
      { question: 'İstanbul içinde elden teslim veya kurye seçeneği var mı?', answer: 'Evet, acil teslimat bütçeniz varsa motorlu kurye ve nakliye araçlarımızla dükkan kapınıza aynı gün sevk etmekteyiz.' }
    ],
    internalLinks: [
      { text: 'Topkapı Basım Broşürleri', path: '/brosur' },
      { text: 'Hızlı Kartvizit İmalat Bandı', path: '/kartvizit' },
      { text: 'Ömürlük Mıknatıslı Magnet', path: '/magnet' }
    ],
    offers: { lowPrice: '620', highPrice: '4800', count: '10' },
    tagline: 'İstanbul İşletmelerine Özel Topkapı Matbaacılık Hızı'
  },
  'ankara-magnet-baski': {
    path: '/ankara-magnet-baski',
    title: 'Ankara Magnet Baskı Fiyatları | Kamu ve Lokanta Magnetleri',
    metaDesc: 'Ankara’daki lokanta, su bayisi, veteriner ve kurumlar için 0.40 mm güçlü buzdolabı magneti modelleri. Topkapı’dan Ankara kapınıza 24 saatte hızlı sevkiyat!',
    h1: 'Ankara Bölgesine Özel Hızlı Mıknatıslı Magnet Çözümleri',
    intro: 'Ankara nın Çankaya, Yenimahalle veya Keçiören gibi yoğun yerleşim ilçelerinde paket sirkülasyonu yapan dükkanların can simidi mıknatıslı magnetlerdir. Kağıt el ilanlarının kaybolduğu evlerde buzdolabı üzeri ömürlük sipariş tabelasıdır.',
    sections: [
      {
        title: 'Kargo Takip ve Hızlı Ankara Lojistik Ağı',
        paragraphs: [
          'Topkapı fabrikamızdan kargoya teslim edilen Ankara kolileri, dikey otoyol hızı sayesinde kargolamanın ertesi günü Ankara teslim merkezlerine ulaşarak kapınıza dağıtılır. Çatlama yapmayan dikey kıvrılmaz magnetlerle Ankara piyasasında yerinizi alın.'
        ]
      }
    ],
    faqs: [
      { question: 'Ankara teslimat süreçlerinde kolilerin ezilmesi önlenir mi?', answer: 'Kesinlikle. Çift dalga oluklu kalın Kraft kutulara dizilerek şerit çemberlerle kaynatılan kolilerimiz sıfır ezilmeyle Ankara dükkanınıza sevk edilir.' }
    ],
    internalLinks: [
      { text: 'Ankara Magnet Siparişi', path: '/magnet' },
      { text: 'Ekonomik Bölgesel El İlanı', path: '/el-ilani' },
      { text: 'Logolu Lüks Karton Çanta', path: '/karton-canta' }
    ],
    offers: { lowPrice: '480', highPrice: '2600', count: '8' },
    tagline: 'Topkapı İmalat Fiyatlarıyla Ankara Kapısına 24 Saatte Sevkiyat'
  },
  'mugla-kartvizit-baski': {
    path: '/mugla-kartvizit-baski',
    title: 'Muğla Kartvizit Baskı Fiyatları | Tuale ve Sıvamalı Kalın Kartlar',
    metaDesc: 'Muğla’daki ajans, kuaför ve işletmeler için kabartma laklı, şeffaf veya dokulu tuale fantezi kartvizit imalatı. Topkapı’dan Muğla’ya 1 günde teslim!',
    h1: 'Muğla Esnafı ve Profesyonelleri İçin Premium Kartvizit Çözümleri',
    intro: 'Muğla\'nın nemli kıyı havasında çürüyen, esneyen ve mürekkebini kusan fason ucuz kartvizitler markanıza zarar verir. Muğla esnafının ciddiyetini yansıtan dikey koruyucu selefonlu kartlar üretiyoruz.',
    sections: [
      {
        title: 'Nem Dirençli 350 gr Koruyucu Kartvizitler',
        paragraphs: [
          'Ege bölgesindeki yoğun nem koşullarında kağıdın esnemesini tamamen durdurmak için kartvizitlerimizin iki yönünü birden mat selefon plastik filmiyle fırınlayarak kaplamaktayız. Kabartma lak uygulamasıyla logonuz bükülmeden Muğla\'da pırıl pırıl parlar.'
        ]
      }
    ],
    faqs: [
      { question: 'Muğla sevkiyatı kaç gündür?', answer: 'Ofset banttan dökülen kartvizit koliniz kargoya sevk edildikten sonra en fazla 24-48 saat içerisinde dükkan adresinizde teslim olur.' }
    ],
    internalLinks: [
      { text: 'Lüks Muğla Kartvizitleri', path: '/kartvizit' },
      { text: 'Katalog ve Broşür Fiyatları', path: '/brosur' },
      { text: 'Markalı Şık Karton Paket Poşeti', path: '/karton-canta' }
    ],
    offers: { lowPrice: '380', highPrice: '2900', count: '10' },
    tagline: 'Zorlu Ege Neminde Dahi Kıvrılmayan Dik Mat Koruyucu Laminasyonlu Kartlar'
  },
  'brosur-baski-fiyatlari': {
    path: '/brosur-baski-fiyatlari',
    title: 'Kuşe Broşür Baskı Fiyatları | 115 gr & 135 gr Katlama Seçenekleri',
    metaDesc: 'Broşür fiyatlarını etkileyen kağıt gramajı, ebat, adet kırımları ve selefon laminasyon farkları. En ucuz 1000 adet el ilanı fiyat tablosu kuralları.',
    h1: 'Broşür ve El İlanı Baskı Fiyatlarını Belirleyen Teknik Parametreler',
    intro: 'Broşür baskı fiyatları sadece kağıt olarak belirlenmez. Matbaa dünyasında her kalıbın ayrı bir kurulum süreci (ayarlar, fire, boya dökümleri) vardır. Bu makalede broşür bütçenizi en verimli şekilde kullanmanın matbaa içi formüllerini inceliyoruz.',
    sections: [
      {
        title: 'Broşür Fiyatlarını Etkileyen Faktörler',
        paragraphs: [
          '1. Kağıt Gramajı Farkı: 115 gr kuşe kağıt standart dağıtımlar için bütçeyi korur. 135 gr kuşe her sektörün amiral gemisidir ve yırtılmaz. 170 gr kuşe ise lüks duruş katarken yüksek bütçe baremi çeker.',
          '2. Ofset Ortak Kalıp Sistemi (Pool): Matbaamızda binlerce farklı esnafın el ilanı siparişlerini tek bir Heildelberg tabakasında harmanlıyoruz. Kalıp maliyeti ortak bölündüğü için 1000 adet fiyatı fason makinelere oranla çok daha hesaplıya mal olmaktadır.',
          '3. Kırım (Katlama) Makine İşçiliği: Broşürünüzün tek katlama mı yoksa üçe katlamalı C-kırım mı olacağı, katlama giyotinlerinin ayar süresini etkileyerek küçük dikey fiyat baremlerini değiştirir.'
        ]
      }
    ],
    faqs: [
      { question: 'Yüksek adetlerde broşür fiyatı ne kadar düşer?', answer: 'Ofset baskı teknolojisinde döküm adet limiti yükseldikçe (örn. 1000 adetten 10.000 adete) birim kağıt fiyatı neredeyse yarı yarıya ucuza gerilemektedir.' },
      { question: 'Broşür fiyatına kargo ve KDV dahil midir?', answer: 'Fiyat bültenimiz sipariş panosunda net olarak listelenmekte olup, kargo ve yasal KDV baremleri sepet alanında şeffafça kalibre edilmektedir.' }
    ],
    internalLinks: [
      { text: 'Güncel Broşür Fiyat Tablosu', path: '/brosur' },
      { text: 'Buzdolabı Magnet Fiyatları', path: '/magnet' },
      { text: 'Lüks Kartvizit Sipariş Paneli', path: '/kartvizit' }
    ],
    offers: { lowPrice: '620', highPrice: '4800', count: '10' },
    tagline: 'Ortak Ofset Kalıbıyla En Hesaplı Matbaacılık Çözümleri'
  },
  'magnet-baski-fiyatlari': {
    path: '/magnet-baski-fiyatlari',
    title: 'Buzdolabı Magnet Baskı Fiyatları | 0.40 mm Mıknatıs Levha Baremi',
    metaDesc: 'Magnet fiyatlarında oval kesim, dikey kesim, figürlü kalıp masrafları ve mıknatıs hammadde etkenleri. En ucuz dökülmeyen magnet sipariş kriterleri!',
    h1: 'Mıknatıslı Magnet Baskı Fiyatlarının Belirleyici Kriterleri',
    intro: 'Ortalıkta magnet fiyatı adı altında gezen inanılmaz ucuz rakamlar genellikle 0.30 mm sıvasız kalitesiz mıknatıs levhalarıdır. Bu sayfa üzerinden gerçek 0.40 mm dökünmez magnetlerin maliyet tahlillerini görebilirsiniz.',
    sections: [
      {
        title: 'Mıknatıs Kalınlığı ve Özel Metal Kesimli Bıçak Kalıpları',
        paragraphs: [
          '1. Manyetik Levha Kalınlığı: Matbaamızda standart olarak kaymayan, dökülmeyen 0.40 mm ithal manyetik levhaları sıvayarak kesiyoruz. 0.50 mm ise elit kalın promosyon defterli magnetlerde fiyat farksız kalibre edilir.',
          '2. Bıçak ve Şekilli Kalıp Fiyat Etkisi: Standart kare veya oval kesimli kalıplarımız havuzda açık olduğu için ek kalıp parası ödemezsiniz. Ancak tamamen firmanıza has bir dış kenar (örneğin su kuryesi, pide veya dükkan resmi) yaptıracaksanız bir kereye mahsus metal bükme bıçak kalıp ücreti bareme eklenir.'
        ]
      }
    ],
    faqs: [
      { question: 'Minimum kaç adet magnet üretilebilir?', answer: 'Verimli tabaka dökümleri dolayısıyla magnetlerimizi en az 1000 adetlik paketlerde en karlı birim fiyatlarla basmaktayız.' }
    ],
    internalLinks: [
      { text: 'Güncel Magnet Fiyat Barem Tablosu', path: '/magnet' },
      { text: 'Servis Altı Amerikan Servisleri', path: '/amerikan-servis' },
      { text: 'Paket Kurye El İlanı Modelleri', path: '/el-ilani' }
    ],
    offers: { lowPrice: '480', highPrice: '2600', count: '8' },
    tagline: 'Dolaptan Düşüp Markanızı Çöpe Attırmayacak Kaliteli Magnet Bütçesi'
  },
  'kartvizit-fiyatlari': {
    path: '/kartvizit-fiyatlari',
    title: 'Kartvizit Baskı Fiyatları | Kabartma Lak, Şeffaf ve Sıvama Kartlar',
    metaDesc: 'Kartvizit fiyatlarını etkileyen kabartma lak, gofre, varak yaldız, 350 gr kuşe vs 700 gr kabartma lüks sıvama farkları. Profesyonel kart rehberi.',
    h1: 'Kartvizit Baskı Fiyatları ve Lüks Konfeksiyon Detayları',
    intro: 'Kartvizit fiyatları sadece kağıt plakasını kesmekle bitmez. Kağıdın üzerine kaplanan koruyucu film (selefon), logonun üstüne atılan kabartma lak tabakaları, kenarlara atılan yaldızlar fiyatı belirleyen lüks sırlarımızdir.',
    sections: [
      {
        title: 'Fiyatı Belirleyen Temel Ekstra Matbaa Konfeksiyonları',
        paragraphs: [
          '1. Kabartma Lak (Spot UV): Mat selefonlu kartın sadece logo alanına şeffaf dikey kabarıklık verilir. Özel UV kurutma fırınlarından geçtiği için düz basıma göre küçük bir fırınlama maliyeti eklenir.',
          '2. 700 gr Çift Kat Sıvama: İki adet 350 gr kuşe kağıdın araya özel yapışkan dökülerek hidrolik preslerde preslenmesidir. Bükülmesi imkansızdır, özel kenar boyama işçiliği gerektirdiği için üst fiyat baremi çeker.',
          '3. Tuale ve Fantezi Kağıt Dokuları: Kendinden lifli İtalyan tuale kağıtlar ithal dalgalandırmasından dolayı standart kuşe fiyatlarına göre daha farklı baremlerde sunulmaktadır.'
        ]
      }
    ],
    faqs: [
      { question: 'Arka yüzün boş veya renkli olması kartvizit fiyatını değiştirir mi?', answer: 'Hayır, ofset ortak havuz kalıp sistemlerimizde çift yönlü (renkli/renkli) basım standart olup arka yönün boş bırakılması fiyatı kesinlikle azaltmaz.' }
    ],
    internalLinks: [
      { text: 'Güncel Kartvizit Fiyat Barem Tablosu', path: '/kartvizit' },
      { text: 'Logolu Zarflar ve Antetli Kağıtlar', path: '/zarf' },
      { text: 'Cepli Sunum Dosyası Fiyatları', path: '/dosyalar' }
    ],
    offers: { lowPrice: '380', highPrice: '2900', count: '12' },
    tagline: 'İlk El Sıkışmada İtibarınızı Kurşun Gibi Sağlam Tutacak Kartvizitler'
  },
  'kutu-baski-fiyatlari': {
    path: '/kutu-baski-fiyatlari',
    title: 'Karton Kutu Baskı Fiyatları | Baklava, Pasta ve Ambalaj Kolileri',
    metaDesc: 'Kalkanlı karton kutu fiyatlarında Bristol vs Kromo karton seçimi, asetat pencereli kesim işçilikleri ve kalkanlı gıda koruyucu yağ bariyer laminasyon fiyatları.',
    h1: 'Karton Kutu ve Ambalaj Baskı Fiyatları Tahlil Rehberi',
    intro: 'Ambalaj kutusu fiyatlarında en büyük kalem kartonun cinsidir. Bu sayfa üzerinden pastane, kozmetik ve e-ticaret kutularındaki maliyet azaltma tüyolarını izleyebilirsiniz.',
    sections: [
      {
        title: 'Kromo Karton vs Amerikan Bristol Barem Analizleri',
        paragraphs: [
          '1. Kromo Karton Ekonomisi: Arkası gri, önü sıvalı kromo kartonlar kuru pasta ve fırın kutuları gibi sirkülasyonu yüksek ve birim maliyeti en ucuz tutulması gereken ambalajlarda fiyatları %30 aşağı çeker.',
          '2. Amerikan Bristol Lüksü: İki yönü de kar beyazı olan sarmal Bristol kartonlar, kozmetik ve lüks parfüm ambalajlarında logonuzun yaldızını mükemmel taşıyarak en üst katmanda fiyatlandırılır.',
          '3. Kilit ve Yapıştırma İşçiliği: Otomatik dip kilitli makine katlama kutuları manuel el yapıştırmalarına göre daha hızlı döküldüğü için yüksek adetlerde imalat fiyatlarında ciddi tasarruf sağlar.'
        ]
      }
    ],
    faqs: [
      { question: 'Kutularda kalıp parası alınıyor mu?', answer: 'Şablon kütüphanemizde bekleyen yüzlerce hazır pasta ve koli kalıp bıçağını seçerseniz sıfır bıçak maliyetiyle basım sağlamaktayız.' }
    ],
    internalLinks: [
      { text: 'Karton Kutu Barem Panoları', path: '/kutu' },
      { text: 'Karton Ambalaj Paket Çantaları', path: '/karton-canta' },
      { text: 'PP Opak Cam Şişe Etiketleri', path: '/etiket' }
    ],
    offers: { lowPrice: '1200', highPrice: '14000', count: '15' },
    tagline: 'Ambalaj Hücrelerinde Üstün Koruma ve Aracısız İmalat Entegrasyonu'
  },
  'etiket-baski-fiyatlari': {
    path: '/etiket-baski-fiyatlari',
    title: 'Yapışkanlı Etiket Fiyatları | PP Opak vs Tabaka Kuşe Etiketler',
    metaDesc: 'Etiket fiyat tablosunda plastik bazlı PP Opak, şeffaf selefonlu etiketler ve kağıt bazlı kuşe etiket m2 fiyat farkları. Sıfır bıçak masrafıyla yarım kesim!',
    h1: 'Rulo ve Tabaka Yapışkanlı Etiket Baskı Fiyatları',
    intro: 'Etiket fiyatını etkileyen en kritik etmen suya/neme karşı dayanıklılık (malzeme cinsi) ve üretim formatıdır (bobin rulo vs plaka tabaka). Bütçenize en uygun etiket kimyasını birlikte seçelim.',
    sections: [
      {
        title: 'PP Opak, Şeffaf ve Kuşe Etiket Fiyat Tahlili',
        paragraphs: [
          '1. Kağıt Tabanlı Kuşe Etiketler: Sudan etkilenen nemsiz koliler, pastane paket mühürleri için en ekonomik fiyattır.',
          '2. Plastik Tabanlı PP Opak Etiketler: Kozmetik, şampuan, deterjan ve zeytinyağı gibi sıvı akması olan cam şişelerde suya dirençli PP Opak tercih edilir. Kağıta göre hammadde fiyatı biraz daha üst baremdedir ancak yırtılmaz ömre sahiptir.',
          '3. Bobine Sarılmış Rulo Etiketler: Yüksek adetli fabrikalarda otomatik dikey etiketleme robotları varsa rulo bobin sarımı el işçiliği maliyetini sıfıra indirir.'
        ]
      }
    ],
    faqs: [
      { question: 'Özel geometrik etiket şekillerinde fiyat farkı var mıdır?', answer: 'Hayır, dijital döner optik lazer kesim sistemlerimiz sayesinde daire, kare, oval veya amorf her türlü yapışkanlı etiketi kalıp bıçak parası almadan kesiyoruz.' }
    ],
    internalLinks: [
      { text: 'Yapışkanlı Etiket Modellerimiz', path: '/etiket' },
      { text: 'Ambalaj Karton Kutularımız', path: '/kutu' },
      { text: 'Kurumsal Kimlik Antetli Kağıdı', path: '/antetli' }
    ],
    offers: { lowPrice: '320', highPrice: '3800', count: '9' },
    tagline: 'Kavanozlardan ve Şişelerden Kalkıp Markanızı Soluk Göstermeyecek Üst Sınıf Etiketler'
  },
  'samsun-kartvizit-baski': {
    path: '/samsun-kartvizit-baski',
    title: 'Samsun Kartvizit Baskı | Uygun Fiyatlı Online Matbaa',
    metaDesc: 'Samsun’daki restoranlar, Bafra pidesi salonları, eczaneler ve gayrimenkul ofisleri için kaliteli, ucuz kartvizit baskı. Topkapı fabrikasından doğrudan kapınıza kargo!',
    h1: 'Samsun Kartvizit Baskı',
    tagline: 'Bafra\'dan Çarşamba\'ya Tüm Samsun Esnafı İçin Topkapı Güvencesiyle Kartvizit',
    intro: 'Samsun ve bağlı ilçelerindeki yerel işletmelerin prestijli bir temsil ihtiyacı bulunmaktadır. Karadeniz\'in sanayi ve ticaret merkezi olan Samsun\'da, özellikle Bafra pidesi salonları, eczaneler, emlakçılar ve dinlenme tesisleri, ilk izlenimde büyük önem taşıyan kuşe ve lüks sıvamalı kartlar tercih ediyor. Mavi Basım olarak lüks ortak ofset basım kalıplarımız sayesinde en uygun fiyat avantajını Samsun kapınıza kadar ulaştırıyoruz.',
    sections: [
      {
        title: 'Samsun Sektörel Kullanım Alanları ve Pide Salonları',
        paragraphs: [
          'Samsun\'da gıda sektörünün, özellikle meşhur Bafra pidesi yapan lokantaların en sık ihtiyaç duyduğu baskı aracı paket servis içine atılan kartvizit ve el ilanlarıdır. Kağıt kalitemiz gıda temasına uygun olup solmayan fırınlanmış canlı renklere sahiptir.',
          'Eczanelerimiz ise arkasında randevu veya nöbetçi eczane listesi bulunan çift taraflı mat kuşe kartları tercih etmektedir. Bu sayede hastalarınız size her an pratik şekilde ulaşacaktır.'
        ]
      },
      {
        title: 'Topkapı Üretim Gücü ve Hızlı Samsun Kargolama Süreci',
        paragraphs: [
          'Zeytinburnu Topkapı matbaa tesislerimizde, aracı komisyonu olmadan doğrudan Heildelberg kalıpları ile basılan kartlarınızı koruyucu sönümleyici ambalajlarla paketleyip Samsun ilimize doğrudan sevk ediyoruz. 350 gr mat selefonlu bristol kalın basımlarımız ile Samsun pazarında kalıcı bir iz bırakabilirsiniz.'
        ]
      }
    ],
    faqs: [
      { question: 'Samsun siparişleri ortalama kaç günde teslim edilir?', answer: 'Samsun ili ve çevre ilçelerine (Bafra, Çarşamba, Vezirköprü, Terme) kargolarımız ofset onayından sonra ortalama 2 ila 3 iş günü içerisinde teslim edilmektedir.' },
      { question: 'Kartvizit üzerinde lezzetli Bafra pidesi görseli kaliteli çıkar mı?', answer: 'Kesinlikle! Tesisimizdeki yüksek çözünürlüklü (300 DPI) baskı teknolojisi ile yemek resimleri canlı ve gerçeğe en yakın tonlarda basılır.' }
    ],
    internalLinks: [
      { text: 'Kartvizit Baskı', path: '/kartvizit' },
      { text: 'Broşür Baskı', path: '/brosur' },
      { text: 'Magnet Baskı', path: '/magnet' },
      { text: 'Katalog Baskı', path: '/kataloglar' },
      { text: 'Kutu Baskı', path: '/kutu' }
    ],
    offers: { lowPrice: '380', highPrice: '2900', count: '10' }
  },
  'trabzon-brosur-baski': {
    path: '/trabzon-brosur-baski',
    title: 'Trabzon Broşür Baskı | Katlamalı Kafe ve Otel Menüleri',
    metaDesc: 'Trabzon’daki turizm acenteleri, çay işletmeleri, oteller ve rent a car firmaları için yüksek kaliteli 135 gr kuşe broşür baskısı. Uygun fiyatlarla kapınızda!',
    h1: 'Trabzon Broşür Baskı',
    tagline: 'Doğu Karadeniz Turizminin Can Altyapısına Özel Yüksek Çözünürlüklü Tanıtım',
    intro: 'Trabzon, yayla turizminin, çay üreticilerinin, rent a car ağlarının ve köklü otellerin en hareketli olduğu bölgelerimizdendir. Uzungöl bungalov tesislerinden Akçaabat köftecilerine kadar tüm markaların en taze fotoğraflarla bezenmiş, asil ve canlı renklerde el ilanları ve katlamalı broşürler sunması gerekir. Mavi Basım olarak Topkapı üretim parkurumuzda basılan kırım korumalı broşürlerinizi hızlı kargo ile Trabzon adresinize teslim ediyoruz.',
    sections: [
      {
        title: 'Trabzon Çay ve Turizm Sektörüne Özel Broşür Çözümleri',
        paragraphs: [
          'Trabzon genelindeki çay imalathaneleri, çay salonları ve turizm şirketleri için katlamalı C-kırım ve Z-kırım dikey tanıtım kitapçıkları üretiyoruz. Dağıtımda yırtılmayan 135 gr kuşe kağıtlar, gerçek gezilerinizi ve turlarınızı net gösteren 300 DPI çözünürlükle basılır.',
          'Yaylalardaki bungalov ve otel işletmeleri, yeşilin her tonunu solmasız yansıtan özel Heidelberg teknolojik ofset makinelerimizden tam verim almaktadır. Böylece Karadeniz doğasını broşürde tam hissettirebilirsiniz.'
        ]
      },
      {
        title: 'Ekonomik Karadeniz Matbaa Hizmeti ve Kargo Avantajları',
        paragraphs: [
          'Yerel matbaaların yüksek fiyatlı çözümlerine mahkum kalmayıp doğrudan Topkapı fabrikamızdan en ucuz ortak kalıp fiyatlarıyla broşür basabilirsiniz. Çift yönlü renkli basımlar, ezilmeye dayanıklı mukavva kutularda Trabzon esnafına gönderilir.'
        ]
      }
    ],
    faqs: [
      { question: 'Trabzon\'a broşür teslimat süresi nedir?', answer: 'Siparişe onay vermenizin ardından broşür katlama işlemleriniz tamamlanarak ortalama 3 iş gününde Trabzon merkez ve ilçelerine ulaştırılır.' },
      { question: 'Kafe ve restoran broşürü için menü katlaması yapılıyor mu?', answer: 'Evet, özellikle Akçaabat ve Ortahisar bölgelerindeki kafeler için üçe katlamalı akordeon veya c-kırım broşür menüler en popüler tercihtir.' }
    ],
    internalLinks: [
      { text: 'Broşür Baskı', path: '/brosur' },
      { text: 'Katalog Baskı', path: '/kataloglar' },
      { text: 'Magnet Baskı', path: '/magnet' },
      { text: 'Kartvizit Baskı', path: '/kartvizit' },
      { text: 'Kutu Baskı', path: '/kutu' }
    ],
    offers: { lowPrice: '620', highPrice: '4800', count: '10' }
  },
  'ordu-magnet-baski': {
    path: '/ordu-magnet-baski',
    title: 'Ordu Magnet Baskı | Fındık Firmaları & Paket Servis',
    metaDesc: 'Ordu’daki fındık paketleme firmaları, yöresel şarküteriler ve hızlı paket servis dükkanları için 0.40 mm güçlü buzdolabı magnet baskısı. En ucuz fiyatlarla kapınızda!',
    h1: 'Ordu Magnet Baskı',
    tagline: 'Buzdolaplarında Yıllarca Solmadan Kalan Güçlü Karadeniz Mıknatısları',
    intro: 'Ordu ilimizin ana can damarı olan fındık sanayisi, yöresel gıda üreticileri ve her gün büyüyen paket servis dükkanları için buzdolabı magneti en kalıcı ve kazançlı fiziksel reklam aracıdır. Marka logonuzun ve sipariş hattınızın göz önünde yer alması sadık müşteri oranınızı doğrudan katlar. Mavi Basım olarak Ordu\'daki tüm üreticilere 0.40 mm kalınlığında, yüksek çekim gücüne sahip lüks selefonlu magnet çözümleri sunuyoruz.',
    sections: [
      {
        title: 'Ordu Fındık Üreticileri ve Şarküteriler İçin Markalı Magnetler',
        paragraphs: [
          'Fındık ambalajlama tesisleri ve kuru fındık yağı satan işletmeler için özel kesimli (figürlü) mıknatıs tasarımları yapmaktayız. 350 gr kuşe sıvamalı kart üzerinde gıda mürekkebi kullanarak basılan canlı renkler, nemli Karadeniz havasından etkilenerek bükülmez.',
          'Şarküteri ve yerel pastane paket kuryeleri, bu pratik magnetleri paketlerin içine koyarak sipariş frekansını ciddi derecede artırırlar.'
        ]
      },
      {
        title: 'Zayıf Fason Magnetlerin Zararları ve 0.40 mm Kalitemiz',
        paragraphs: [
          'Yerel piyasalarda dökülen 0.30 mm zayıf fason magnetlerin aksine, ithal manyetik levhalarla imal ettiğimiz magnetler buzdolabı kapısı sarsıldığında aşağı kaymaz veya dökülmez. Topkapı fabrikamızdan doğrudan adrese teslim edilir.'
        ]
      }
    ],
    faqs: [
      { question: 'Özel kesimli (figürlü) mıknatıslı magnet basıyor musunuz?', answer: 'Evet, dış çeperi fındık, dükkan veya yöresel ürün konseptine göre özel kesilmiş hidrolik şekilli bıçaklarla özel kesim magnetler üretiyoruz.' },
      { question: 'Fiyatlarda yüksek fındık sipariş adetlerine özel indirim var mı?', answer: 'Toptan adetlerde (5000 ve üzeri) birim fiyatlarımız inanılmaz derecede ucuzlamaktadır. WhatsApp teklif hattımızdan özel barem alabilirsiniz.' }
    ],
    internalLinks: [
      { text: 'Magnet Baskı', path: '/magnet' },
      { text: 'Broşür Baskı', path: '/brosur' },
      { text: 'Kartvizit Baskı', path: '/kartvizit' },
      { text: 'Katalog Baskı', path: '/kataloglar' },
      { text: 'Kutu Baskı', path: '/kutu' }
    ],
    offers: { lowPrice: '480', highPrice: '2600', count: '8' }
  },
  'antalya-katalog-baski': {
    path: '/antalya-katalog-baski',
    title: 'Antalya Katalog Baskı | Turizm ve İnşaat Katalogları',
    metaDesc: 'Antalya’daki imalat sanayi, tarım, turizm, inşaat ve butik oteller için lüks tel spiral veya Amerikan ciltli katalog baskı çözümleri. Doğrudan fabrikadan kargo!',
    h1: 'Antalya Katalog Baskı',
    tagline: 'Zengin Ürün Portföyünüzü Antalya\'dan Dünyaya Taşıyacak Kaliteli Kataloglar',
    intro: 'Antalya, geniş turizm tesisleri, otelleri, tarım üreticileri, imalatçıları ve inşaat müteahhitleri ile basılı ürün kataloglarına en yoğun gereksinim duyan illerimizdendir. Kurumsal görsellerinizin, teknik özelliklerin soluk ve belirsiz çıkması kurumsal vizyonunuzu olumsuz etkiler. Mavi Basım olarak Antalya\'daki tüm girişimcilere yüksek kaliteli kuşe kağıda basılmış, Amerikan ciltli, mukavemetli kurumsal katalog hizmeti veriyoruz.',
    sections: [
      {
        title: 'Antalya Otelleri ve İmalat Sanayisine Özel Katalog Mukavemeti',
        paragraphs: [
          'Sanayi yedek parçaları veya termal otel odası görsellerini içeren kataloglarda, sayfa dökülmesinin önüne geçmek için lüks dikey PUR tutkallı Amerikan ciltleme veya metal Heildelberg spiral dikişler kullanmaktayız.',
          'Katalog kapaklarına 350 gr kuşe kağıt üzerine ince koruyucu mat selefon kaplayarak neme ve tozlanmaya karşı tam dayanım kazandırıyoruz.'
        ]
      },
      {
        title: 'Topkapı Güvencesiyle Antalya\'ya Hızlı Ambalajlı Nakliye',
        paragraphs: [
          'Büyük ve ağır katalog siparişlerinizi deforme olmayacak dikey paletleme ve Kraft kutu korumalarıyla Antalya adresinize sigortalı sevkiyatla gönderiyoruz. Aracısız dürüst fiyatlar Muratpaşa\'dan Alanya\'ya tüm ilçelerde geçerlidir.'
        ]
      }
    ],
    faqs: [
      { question: 'Katalog kapağı için parlatma lakı kullanıyor musunuz?', answer: 'Evet, katalog kapaklarında logoları ön plana çıkaracak mat selefon üzeri bölgesel parlak lak (kabartma lak) uygulayarak prestij katıyoruz.' },
      { question: 'Antalya\'ya nakliye ücreti nasıl hesaplanıyor?', answer: 'Katalog ağırlığına bağlı olarak en uygun indirimli kargo anlaşmaları veya ambar teslimatı sayesinde lojistik maliyetler minimumda tutulur.' }
    ],
    internalLinks: [
      { text: 'Katalog Baskı', path: '/kataloglar' },
      { text: 'Broşür Baskı', path: '/brosur' },
      { text: 'Kutu Baskı', path: '/kutu' },
      { text: 'Kartvizit Baskı', path: '/kartvizit' },
      { text: 'Magnet Baskı', path: '/magnet' }
    ],
    offers: { lowPrice: '1400', highPrice: '18000', count: '12' }
  },
  'gebze-kutu-baski': {
    path: '/gebze-kutu-baski',
    title: 'Gebze Kutu Baskı | Logolu Yaprak ve Gıda Ambalajı',
    metaDesc: 'Gebze yaprağı paketleme firmaları, yöresel gıda üreticileri ve pastaneler için pencereli, koku yapmayan karton kutu ve ambalaj imalatı. Topkapı matbaa güvencesiyle!',
    h1: 'Gebze Kutu Baskı',
    tagline: 'Gebze\'nin Enfes Yapraklarını ve Geleneksel Tatlarını Koruyan Lüks Ambalajlar',
    intro: 'Gebze ve çevre ilçelerindeki asma yaprağı paketleme üreticileri, organik tarım markaları ve pastaneler, gıda nemini sızdırmayan ve kimyasal solvent kokusu içermeyen asil karton kutulara büyük ihtiyaç duyarlar. Mavi Basım olarak Gebze esnafına asetat pencereli, dip dikişli, gıda temas onaylı lüks ambalaj kutu imalatını en uygun online fiyatlarla sunuyoruz.',
    sections: [
      {
        title: 'Gebze Yaprağı Ambalajlarında Yağ ve Nem Sızdırmazlık Duvarları',
        paragraphs: [
          'Salamura asma yaprağı gibi sıvı ve asit salınımı olabilen gıda paketlerinde kutu kartonunun yumuşamaması veya sızdırarak yırtılmaması için kutu iç panellerine özel gıda uyumlu sedef laminasyon su bariyeri giydiriyoruz.',
          'Bantlarımızda soya bazlı organik gıda mürekkepleri kullanarak kokusuz, hijyenik ve çevre dostu bir döküm sağlıyoruz. Markanız değer kazanıyor.'
        ]
      },
      {
        title: 'Doğrudan Topkapı 2. Matbaacılar Sitesi İmalat Gücü',
        paragraphs: [
          'Komisyoncuları ve fason dükkanları ortadan kaldırarak birinci sınıf Amerikan Bristol ve kromo karton kutuları doğrudan adrese gönderiyoruz. Gebze genelinde %100 güvenli kargo kutulamasıyla ezilmez teslimat.'
        ]
      }
    ],
    faqs: [
      { question: 'Gebze\'ye nakliye süresi nedir ve ambalajlar katlanmış mı gelir?', answer: 'Kutularımız düz kırımlı olarak sevk edilir; kullanımı esnasında kilitli alt tabanından saniyeler içinde kurulur. Gebze\'ye teslimat ortalama 3 iş günüdür.' },
      { question: 'Gebze yaprağı kutusu üzerine gofraj (kabartma) yapılıyor mu?', answer: 'Evet, özellikle prestijli ihracat kutuları için logo bölgesine dikey kabartma (gofre) presi uygulayarak dokusal şıklık sağlıyoruz.' }
    ],
    internalLinks: [
      { text: 'Kutu Baskı', path: '/kutu' },
      { text: 'Etiket Baskı', path: '/etiket' },
      { text: 'Broşür Baskı', path: '/brosur' },
      { text: 'Karton Çanta', path: '/karton-canta' },
      { text: 'Katalog Baskı', path: '/kataloglar' }
    ],
    offers: { lowPrice: '1200', highPrice: '14000', count: '15' }
  },
  'giresun-kartvizit-baski': {
    path: '/giresun-kartvizit-baski',
    title: 'Giresun Kartvizit Baskı | Kalın Bristol & Fındık Ambalaj',
    metaDesc: 'Giresun’daki fındık markaları, yerel işletmeler ve esnaflar için çift taraflı mat selefonlu bristol kalın kartvizit baskı. En uygun fiyatlarla kargo imkanı!',
    h1: 'Giresun Kartvizit Baskı',
    tagline: 'Giresun Esnafına Özel Aşınmaz, Kalın ve Canlı Renkli Kartvizitler',
    intro: 'Karadeniz\'in köklü liman kenti Giresun\'da fındık mamulleri satan kooperatifler, emlak danışmanları, turizm seyahat ofisleri ve yerel esnaflar ilk tanışmada kendilerini en iyi ifade eden kartvizit modellerini kullanıyor. Nemli sahil havasında solmayan, yıpranarak ezilmeyen kalın bristol kartları en yüksek standart olan 300 DPI ve CMYK renk kalıpları ile basıp Giresun adresinize sevk ediyoruz.',
    sections: [
      {
        title: 'Giresun Yeşil-Beyaz Kimliğine Özel Profesyonel Baskı',
        paragraphs: [
          'Giresun esnafının ve kooperatiflerinin lüks logolarını birebir orijinal tonda yakalamak için bilgisayar denetimli dikey ofset mürekkep dağıtıcı Heidelberg teknolojimizi kullanıyoruz. Bu işlem yeşil ve beyaz tonlarında dalgalanmaları önler.',
          'Arka yönü randevu defteri olarak kullanılabilen tuale fantezi veya selefonsuz randevu kartvizitlerimizle de müşteri ilişkilerinizi kurumsallaştırabilirsiniz.'
        ]
      },
      {
        title: 'Komisyonsuz Topkapı Matbuat Fiyatı Giresun Kapısında',
        paragraphs: [
          'Bölgesel fason ofislere fahiş ücretler ödemek durumunda kalmadan, direkt İstanbul Topkapı\'daki dev basım havuzumuzdan online matbaa siparişinizi saniyeler içinde oluşturarak bütçenizi koruyabilirsiniz.'
        ]
      }
    ],
    faqs: [
      { question: 'Mat selefon kaplama ne işe yarar?', answer: 'Çift tarafa uygulanan mat selefon, kağıdı Karadeniz nemine, terlemeye ve yırtılmaya karşı üst düzeyde koruyan ve lüks pürüzsüz bir doku veren ince bir kaplamadır.' },
      { question: 'Giresun fındık dükkanlarına özel kabartmalı model var mı?', answer: 'Evet, 350 gr mat selefonlu kartlarımızın üzerine logo ve telefon için parlak lak kabartması atarak asil bir doku sağlıyoruz.' }
    ],
    internalLinks: [
      { text: 'Kartvizit Baskı', path: '/kartvizit' },
      { text: 'Broşür Baskı', path: '/brosur' },
      { text: 'Magnet Baskı', path: '/magnet' },
      { text: 'Katalog Baskı', path: '/kataloglar' },
      { text: 'Kutu Baskı', path: '/kutu' }
    ],
    offers: { lowPrice: '380', highPrice: '2900', count: '10' }
  },
  'rize-brosur-baski': {
    path: '/rize-brosur-baski',
    title: 'Rize Broşür Baskı | Çay Fabrikaları & Bungalov Otelleri',
    metaDesc: 'Rize\'deki çay fabrikaları, rafting kulüpleri, bungalov ve doğa turizmi tesisleri için yüksek kaliteli, neme dayanıklı 135 gr kuşe broşür. Doğrudan Topkapı\'dan!',
    h1: 'Rize Broşür Baskı',
    tagline: 'Kaçkar Yaylalarından Karadeniz Kıyılarına Uzanan Marka Tanıtım Elçileriniz',
    intro: 'Rize; Ayder Yaylası bungalovları, Fırtına Deresi rafting tesisleri, çay fabrikaları ve bal kooperatifleri ile Doğu Karadeniz turizminin kalbidir. Doğal güzelliklerin içinde yer alan tesisleriniz için üretilen yırtılmayan dayanıklı dikey broşürler, işletmenizin kalitesini doğrudan turistlere anlatır. Mavi Basım olarak suya ve neme karşı mukavemetli parlak kuşe broşürlerimizi en ucuz toplu ofset kalıp avantajıyla Rize adresinize gönderiyoruz.',
    sections: [
      {
        title: 'Rize Bungalov ve Dağa Özel Doğa Broşür Çözümleri',
        paragraphs: [
          'Doğa turizmi ve bungalov işletmelerinin en sık şikayet ettiği durum nemli dağ havasında broşürlerin dalgalanıp yapışmasıdır. Mavi Basım olarak kuşe fırınlama teknolojimiz sayesinde mürekkebin liflere tamamen geçmesini sağlayarak bunu engelliyoruz.',
          'Turlarınızı, yöresel ballarınızı, çay çeşitlerinizi ve konaklama fiyatlarınızı üçe katlamalı lüks akordeon panellerde şık bir şekilde sunabilirsiniz.'
        ]
      },
      {
        title: 'Aracısız Topkapı Matbaa Gücü ile Rize\'ye Hızlı Sevkiyat',
        paragraphs: [
          'İstanbul\'daki fabrikamızda basılan paketleriniz pürüzsüz su geçirmez bant korumalarıyla kargolanarak Rize il merkezi ve tüm ilçelerine (Ardeşen, Çamlıhemşin, Pazar) doğrudan ulaştırılır.'
        ]
      }
    ],
    faqs: [
      { question: 'Zımbalı çok sayfalı broşür katalog yapıyor musunuz?', answer: 'Evet, Rize turlarınızı, otel odalarınızı ve çay çeşitlerinizi daha geniş sergileyebilmeniz için 8, 12 veya 16 sayfalık sırtı tel dikişli broşür kataloglar da üretiyoruz.' },
      { question: 'Kaç günde kargoya teslim edilmektedir?', answer: 'Tasarım onayınızın ardından baskı ve kırım işlemleri ortalama 3 iş gününde tamamlanıp Karadeniz kargo lojistiğine verilir.' }
    ],
    internalLinks: [
      { text: 'Broşür Baskı', path: '/brosur' },
      { text: 'Katalog Baskı', path: '/kataloglar' },
      { text: 'Magnet Baskı', path: '/magnet' },
      { text: 'Kartvizit Baskı', path: '/kartvizit' },
      { text: 'Kutu Baskı', path: '/kutu' }
    ],
    offers: { lowPrice: '620', highPrice: '4800', count: '10' }
  },
  'sinop-magnet-baski': {
    path: '/sinop-magnet-baski',
    title: 'Sinop Magnet Baskı | Turizm ve Yerel Lezzetler',
    metaDesc: 'Sinop’taki butik pansiyonlar, restoran, kafe ve müze dükkanları için 0.40 mm güçlü buzdolabı magnet baskısı. En ucuz fiyatlarla Sinop\'ta!',
    h1: 'Sinop Magnet Baskı',
    tagline: 'Karadeniz Sahilinden Buzdolaplarına Uzanan Kalıcı Sinop Reklam Mıknatısları',
    intro: 'Sinop, meşhur mantısı, tarihi cezaevi müzesi, butik otelleri ve gelişen kafe-restoran esnafı ile magnet reklamcılığına özel bir ilgi gösterir. Turistlere hediye edilecek sanatsal temalı magnetlerden her gün paket servis çeken restoran magnetlerine kadar her boyutta üretim sağlamaktayız. Mavi Basım, Sinop esnafına 0.40 mm kalın manyetik levhalarla donatılmış aşınmaz magnetleri sunuyor.',
    sections: [
      {
        title: 'Sinop Mantısı ve Yöresel Ürün Tanıtımlarında Özel Kesimli Tasarımlar',
        paragraphs: [
          'Mantı figürlü, tarihi motifli veya dükkan yapınıza uygun amorf kesilmiş bıçak kalıbı mıknatıslarımız, Sinop kültürünü ve markanızı dolaplarda parlatır. Kalın kuşe sıvama yüzeyi parlak koruyucu selefon ile kaplandığı için suya dayanıklıdır.',
          'Restoranlar ve kebapçılar için hazırladığımız magnetler buzdolaplarında düşmeden yıllarca sipariş alımınızı destekler.'
        ]
      },
      {
        title: 'Topkapı Üretim Bandında Doğrudan Sinop Kapınıza Teslimat',
        paragraphs: [
          'Sinop\'un Boyabat, Gerze gibi yoğun ticaret merkezlerine sevk edilecek kolilerimiz darbe sönümleyici katmanlarla koruma altına alınır ve hasarsız teslimat sağlanır.'
        ]
      }
    ],
    faqs: [
      { question: 'Sinop\'a kargo kaç günde gelir?', answer: 'Sinop il merkezimiz ve ilçelerimize (Gerze dahil) gönderilerimiz paketlemeden sonra ortalama 2 iş gününde kargo ile ulaşır.' },
      { question: 'Magnet üzerine yerleştirilecek QR kodlar cep telefonlarınca okunur mu?', answer: 'Kesinlikle! 300 DPI gerçek ofset basım uyguladığımız için QR kodlar pürüzsüz çıkar ve müşterilerinizi anında web menünüze ulaştırır.' }
    ],
    internalLinks: [
      { text: 'Magnet Baskı', path: '/magnet' },
      { text: 'Broşür Baskı', path: '/brosur' },
      { text: 'Kartvizit Baskı', path: '/kartvizit' },
      { text: 'Kutu Baskı', path: '/kutu' },
      { text: 'Katalog Baskı', path: '/kataloglar' }
    ],
    offers: { lowPrice: '480', highPrice: '2600', count: '8' }
  },
  'bitlis-kutu-baski': {
    path: '/bitlis-kutu-baski',
    title: 'Bitlis Kutu Baskı | Markalı Bal ve Kurabiye Ambalajı',
    metaDesc: 'Bitlis bal üreticileri, kuruyemiş firmaları, pastaneler ve lokal butik üreticiler için neme dayanıklı gıda uyumlu şık karton kutu üretimi.',
    h1: 'Bitlis Kutu Baskı',
    tagline: 'Meşhur Bitlis Balı ve Butik Lezzetlerine Yakışır Lüks Ambalaj Kutuları',
    intro: 'Bitlis denildiğinde dünyaca tescilli meşhur Bitlis balı, kuruyemiş üreticileri ve lokal pastane esnafı akla gelir. Doğal lezzetleri taze tutacak, dışarıya sızıntı yapmasını ve nem girmesini engelleyecek profesyonel kutular, kalitenizi temsil eder. Mavi Basım olarak Bitlis\'teki tüm arıcılara, kooperatiflere ve esnaflara özel pencereli, kendinden kilitli karton kutular imal ediyoruz.',
    sections: [
      {
        title: 'Bitlis Balı ve Butik Gıdalar İçin Özel Tasarım Karton Kutular',
        paragraphs: [
          'Değerli Bitlis ballarının kavanozlarını güvenle korumak ve şık sunumlar yapmak için pürüzsüz taşıma mukavemeti olan kutular üretiyoruz. İç yüzeylere gerektiğinde ekstra koruyucu mukavva takviyesi yapıyoruz.',
          'Heidelberg kesim preslerimiz sayesinde ambalaj pencerelerine asil şeffaf asetatlar takarak içindeki lezzetin dışarıdan net görünmesini sağlıyoruz. Müşterileriniz ürünün kalitesini henüz ambalajı açmadan görür.'
        ]
      },
      {
        title: 'Topkapı Fabrika Fiyatları ile Doğrudan Bitlis\'e Sevkiyat',
        paragraphs: [
          'Aracı ajansları araya sokmadan doğrudan fabrikamızdan online kutu siparişi geçebilir, Bitlis ili ve tüm ilçelerine (Tatvan, Ahlat, Adilcevaz) çift kat oluklu hasarsız ambalaj kolilerimizle teslim alabilirsiniz.'
        ]
      }
    ],
    faqs: [
      { question: 'Kuruyemiş kutuları için en çok hangi karton tercih edilmektedir?', answer: 'Düşük bütçeler için arkası gri kromo kartonlar, lüks yaldız uygulamalar için ise pürüzsüz çift yönü beyaz Amerikan Bristol gıda kartonu tercih edilmektedir.' },
      { question: 'Minimum kutu basım limitleriniz nelerdir?', answer: 'Kalıp kurma ve hidrolik kesim optimizasyonları nedeniyle kutu siparişlerimizi minimum 1000 adet olacak şekilde işleme almaktayız.' }
    ],
    internalLinks: [
      { text: 'Kutu Baskı', path: '/kutu' },
      { text: 'Etiket Baskı', path: '/etiket' },
      { text: 'Broşür Baskı', path: '/brosur' },
      { text: 'Karton Çanta', path: '/karton-canta' },
      { text: 'Katalog Baskı', path: '/kataloglar' }
    ],
    offers: { lowPrice: '1200', highPrice: '14000', count: '15' }
  },
  'erzurum-katalog-baski': {
    path: '/erzurum-katalog-baski',
    title: 'Erzurum Katalog Baskı | Palandöken Otelleri & Oltu Kuyumcuları',
    metaDesc: 'Erzurum\'daki Palandöken kayak otelleri, cağ kebabı üreticileri ve Oltutaşı kuyumcuları için lüks kuşe kağıda Amerikan ciltli katalog ve broşür basımı. Doğrudan imalattan!',
    h1: 'Erzurum Katalog Baskı',
    tagline: 'Doğu Anadolu\'nun Sanayi ve Turizm Gücünü Dünyaya Tanıtan Lüks Kataloglar',
    intro: 'Erzurum, Palandöken kış turizmi otelleri, meşhur Cağ Kebabı restoran zincirleri ve Oltu Taşı imalatı yapan seçkin kuyumcu atölyeleriyle yüksek kaliteli, asil, lüks katalog baskısına en yoğun gereksinim duyan illerimizden biridir. Ürün fotoğraflarınızın pürüzsüz görünmesi ve renk doğruluğu, müşterinizin gözünde kurumsal bir itibar oluşturur. Mavi Basım olarak Erzurum\'daki tüm işletmelere giden lüks kuşe kağıtlı, Amerikan sıcak ciltli kataloglar üretiyoruz.',
    sections: [
      {
        title: 'Palandöken Otelleri ve Elit Kuyumcular İçin Parlak Kabartma Laklı Kataloglar',
        paragraphs: [
          'Takı tasarımlarındaki milimetrik işçilikleri ve kayak tesislerinizin sıcak konforunu sergilemek için kalın 170 gr kuşe kağıda doymuş renklerle basıyoruz. Katalog kapaklarına atılan lokal kabartma lak, parmağı gezdirdiğinde logonun hissedilmesini sağlar.',
          'Sayfa dökülmesi yapmayan dikey PUR tutkallı ciltleme teknolojisiyle dondurucu Erzurum kışında dahi sayfalar kopmaz veya esnemez. Kataloğunuz ömürlük olur.'
        ]
      },
      {
        title: 'Topkapı’dan Erzurum’a Özel Paletli Korumalı Ambalaj Sevkiyatı',
        paragraphs: [
          'Ağır katalog kolileri çift dalga mukavva Kraft kasalara dizilerek palet üstü shrinklenmiş olarak Erzurum adresinize hasarsız kargo teslimatlarıyla sevk edilir.'
        ]
      }
    ],
    faqs: [
      { question: 'Katalog için sayfa sayısı standart mıdır?', answer: 'Katalog sayfa sayıları ofset katlama tabakası kuralı gereğince 4, 8, 12, 16, 24, 32 veya 48 sayfa gibi 4\'ün katları şeklinde tasarlanmalı ve üretilmelidir.' },
      { question: 'Baskı öncesi katalog tasarım kontrolümüz yapılıyor mu?', answer: 'Kesinlikle! Erzurum\'dan göndereceğiniz tüm PDF tasarımları giyotin kesim payı ve çözünürlük açısından grafik ekibimizce ücretsiz denetlenmektedir.' }
    ],
    internalLinks: [
      { text: 'Katalog Baskı', path: '/kataloglar' },
      { text: 'Broşür Baskı', path: '/brosur' },
      { text: 'Kutu Baskı', path: '/kutu' },
      { text: 'Kartvizit Baskı', path: '/kartvizit' },
      { text: 'Magnet Baskı', path: '/magnet' }
    ],
    offers: { lowPrice: '1400', highPrice: '18000', count: '12' }
  },
  'kayseri-kutu-baski': {
    path: '/kayseri-kutu-baski',
    title: 'Kayseri Kutu Baskı | Sucuk, Pastırma & Mobilya Ambalajı',
    metaDesc: 'Kayseri sucuk-pastırma üreticileri, mantı imalatçıları, mobilya fabrikaları ve e-ticaret markaları için yüksek mukavemetli koku yapmayan karton ambalaj kutuları imalatı.',
    h1: 'Kayseri Kutu Baskı',
    tagline: 'Anadolu Sanayi Devine Yakışır Yağ Geçirmez ve Ağır Yük Taşıyan Güçlü Kutular',
    intro: 'Kayseri, devasa organize sanayi bölgeleri, dünyaca ünlü pastırma-sucuk entegre tesisleri, mantı üreticileri ve mobilya ihracatçılarıyla Türkiye\'nin en büyük imalat kalelerindendir. Bu zengin imalat ağının ürettiği değerli malları koruyacak ve sevk edecek ambalaj kutusunun mukavemetli olması, ürünün yolda zarar görmesini engeller. Mavi Basım olarak Kayseri sanayicisine koku yapmayan, yağ sızdırmaz sedefli dikey ambalaj kutuları üretiyoruz.',
    sections: [
      {
        title: 'Sucuk, Pastırma ve Mantı Üretiminde Koku Yapmayan Gıda Kutusu Standartları',
        paragraphs: [
          'Ete ve baharat kokusuna karışabilecek boya kimyasallarını kesin kes önleyerek tamamen soya bazlı fırınlanmış bitki mürekkepleriyle basım yapıyoruz. Gıda nemini sızdırmayacak şekilde iç çeper mat selefon veya sedef laminasyon kaplı bariyerler örüyoruz.',
          'Kişiye ve markaya özel kutu taleplerinde Amerikan Bristol ve Kroma Kartondan dayanıklı ambalaj kutuları sağlıyoruz. Dayanıklı kutular Kayseri kapınıza teslim edilir.'
        ]
      },
      {
        title: 'Topkapı’dan Kayseri Organize Sanayi Bölgelerine Hızlı Sevkiyat',
        paragraphs: [
          'Kayseri Organize Sanayi, Serbest Bölge ve Mimarsinan Gıda Sanayi bölgelerindeki tesislerinize palet bazlı siparişleriniz sorunsuz kamyon lojistik hatlarımız ve anlaşmalı hızlı kargolar ile güvenli sevk edilmektedir.'
        ]
      }
    ],
    faqs: [
      { question: 'Kayseri mantı kutularında asetat pencere açabiliyor musunuz?', answer: 'Evet, mantıların tazeliğinin ve unlu süslemesinin derin dondurucu dolabında net görünmesi için ambalaj üzerine şeffaf asetatlı pencere kesimi yerleştirebiliyoruz.' },
      { question: 'Adetler arttıkça kutu birim fiyatları düşüyor mu?', answer: 'Ofset baskı endüstrisinde adetler (örneğin 1000 adetten 5000 adete) yükseldikçe kalıp amortismanı sıfıra yaklaşır ve birim fiyat yarı yarıya ucuza geriler.' }
    ],
    internalLinks: [
      { text: 'Kutu Baskı', path: '/kutu' },
      { text: 'Etiket Baskı', path: '/etiket' },
      { text: 'Karton Çanta', path: '/karton-canta' },
      { text: 'Broşür Baskı', path: '/brosur' },
      { text: 'Katalog Baskı', path: '/kataloglar' }
    ],
    offers: { lowPrice: '1200', highPrice: '14000', count: '15' }
  },
  'adana-kartvizit-baski': {
    path: '/adana-kartvizit-baski',
    title: 'Adana’ya Özel Kartvizit Baskı Fiyatları | Mat Selefonlu Kalın Kartvizit',
    metaDesc: 'Adana’daki narenciye kooperatifleri, inşaat, mühendislik, eczane ve emlak danışmanları için en uygun fiyatlı, profesyonel kartvizit baskı çözümleri Mavi Basım’da.',
    h1: 'Adana Kartvizit Baskı',
    tagline: 'Adana Esnafına Özel Saygın, Kalın ve Aşınmaz Ortak Ofset Kartvizitler',
    intro: 'Adana ve çevre ilçelerinde faaliyet gösteren narenciye firmaları, eczaneler, sürücü kursları ve inşaat mühendisleri, iş ilişkilerini güçlendirmek için kaliteli ve ucuz kartvizit modellerini tercih ediyor. Cüzdandan çıktığında hemen bükülmeyen, yırtılmayan kalın mat selefonlu bristol kartlar Mavi Basım kalitesi ile Topkapı\'da basılarak Adana\'daki adresinize en uygun fiyatlarla kargolanmaktadır.',
    sections: [
      {
        title: 'Adana Esnafı ve Mühendisleri İçin Lüks Temsil Gücü',
        paragraphs: [
          '350 gr bristol kağıda basılan çift yönlü kartlarımızın iki yönünü mat selefon kaplayarak mürekkebe asalet katıyoruz. İnşaat ve mühendislik firmaları için en tok basımları pürüzsüz ofset makinelerimizde döküyoruz.',
          'Eczaneler ve lokal esnaflar için ise arka tarafa kalemle kolayca yazı yazılabilen tuale fantezi modellerimiz bir numaralı sadakat tercihidir.'
        ]
      },
      {
        title: 'Aracısız Topkapı Fabrika Fiyatları Adana Esnafının Hizmetinde',
        paragraphs: [
          'Şehirlerdeki kısıtlı fason matbaaların yüksek fiyat tekliflerine mahkum kalmayın. Topkapı fabrikamızdan online kartvizit sipariş paneli üzerinden en karlı fiyatlarla sepetinizi birleştirebilir ve bütçenizi koruyabilirsiniz.'
        ]
      }
    ],
    faqs: [
      { question: 'Adana\'ya teslimat süresi nedir?', answer: 'Ofset kalıp onayının ardından basılan kartvizit koliniz ortalama 2 iş günü içerisinde Adana merkez ve tüm ilçelerine (Seyhan, Çukurova, Yüreğir, Ceyhan) sevk edilmektedir.' },
      { question: 'Renklerde kayma veya solma riski var mı?', answer: 'Kesinlikle hayır! Heidelberg 4 renkli ofset parkurumuzda bilgisayarlı spektrofotometre ile renk sapmalarını sıfıra indiriyoruz.' }
    ],
    internalLinks: [
      { text: 'Kartvizit Baskı', path: '/kartvizit' },
      { text: 'Broşür Baskı', path: '/brosur' },
      { text: 'Magnet Baskı', path: '/magnet' },
      { text: 'Katalog Baskı', path: '/kataloglar' },
      { text: 'Kutu Baskı', path: '/kutu' }
    ],
    offers: { lowPrice: '380', highPrice: '2900', count: '10' }
  },
  'malatya-brosur-baski': {
    path: '/malatya-brosur-baski',
    title: 'Malatya Broşür Baskı | Kayısı Entegre & Yerel Kafeler',
    metaDesc: 'Malatya\'daki kayısı ihracat firmaları, kuruyemiş-fıstık paketleme tesisleri, düğün salonları ve cafeler için 135 gr parlak kuşe broşür ve el ilanı baskısı. En ucuz Topkapı fiyatlarıyla!',
    h1: 'Malatya Broşür Baskı',
    tagline: 'Kayısı Bahçelerinden İhracat Limanlarına Kurumsal Malatya El İlanları',
    intro: 'Malatya, dünya kayısı başkenti olmasıyla ünlü zengin entegre tesisleri, kuru meyve ihracatçıları, geniş sanayi siteleri ve dinamik lokal kafeleriyle reklam broşürüne en çok ihtiyaç duyan illerimizden biridir. Ürün listelerinizi, kayısı markanızın seçkin tarihçesini ve taze meyve fotoğraflarınızı asil renklerde sunmak için yırtılmayan 135 gr kuşe broşür dökümlerimiz birebirdir. Mavi Basım, Malatya\'ya özel en uygun ofset basımını kargo güvencesi ile sunmaktadır.',
    sections: [
      {
        title: 'Malatya Kayısı Markaları ve Kafe Esnafına Özel Kırım Modelleri',
        paragraphs: [
          'Kayısı ambalaj kutularının içine konacak tanıtım dikey broşürlerinden sokakta yüksek adetli elden dağıtılacak reklam el ilanlarına kadar geniş bir kırım alternatifimiz mevcuttur. 135 gr kuşe dökümlerimiz, solmayan zengin turuncu ve kayısı sarısı tonları ile görselin can alıcı görünmesini sağlar.',
          'Dikey ya da yatay katlama seçenekleriyle şık restoranlar, bahçeler ve kafeler zengin menü detaylarını sergileyebilir.'
        ]
      },
      {
        title: 'Topkapı Matbaa Gücü ile Malatya\'ya Hasarsız Sevkiyat',
        paragraphs: [
          'Büyük ebatlı siparişleriniz nem geçirmeyen koruyucu paletli kalkanlarla sarılır. Malatya merkez ile ilçelerine (Yeşilyurt, Battalgazi) doğrudan güvenle ulaştırılır.'
        ]
      }
    ],
    faqs: [
      { question: 'Malatya broşür kargo süresi nedir?', answer: 'Banttan çıkan broşürleriniz kırım makinelerinden geçtikten sonra ortalama 2 ila 3 iş günü içinde Malatya adresinize sevk olur.' },
      { question: 'Restoran ve bahçelere özel menü kırım tasarımları var mı?', answer: 'Evet, özellikle A4 kuşe dikey sayfanın 3\'e katlanıp 6 ayrı dikey panel oluşturduğu menü formatlarımız Malatya lokantalarının favorisidir.' }
    ],
    internalLinks: [
      { text: 'Broşür Baskı', path: '/brosur' },
      { text: 'Katalog Baskı', path: '/kataloglar' },
      { text: 'Magnet Baskı', path: '/magnet' },
      { text: 'Kartvizit Baskı', path: '/kartvizit' },
      { text: 'Kutu Baskı', path: '/kutu' }
    ],
    offers: { lowPrice: '620', highPrice: '4800', count: '10' }
  },
  'elazig-magnet-baski': {
    path: '/elazig-magnet-baski',
    title: 'Elazığ Magnet Baskı | Orcik Üreticileri & Yöresel Peynirciler',
    metaDesc: 'Elazığ orcik-pestil üreticileri, yöresel peynirciler, bakırcılar ve hızlı paket servis esnafları için 0.40 mm yüksek çekimli buzdolabı magnet baskısı. Ucuz kargolu imalat!',
    h1: 'Elazığ Magnet Baskı',
    tagline: 'Buzdolaplarının En Seçkin Köşesinde Yıllarca Kalan Dayanıklı Elazığ Magnetleri',
    intro: 'Elazığ, meşhur geleneksel orcik tatlısı, tulum peyniri imalatçıları, tarihi bakırcılar esnafı ve her geçen gün yaygınlaşan paket servis lokantalarıyla magnet reklam ürünlerine yoğun ilgi gösterir. Evlerin buzdolaplarına yapıştırılan bir dükkan magneti, sipariş hattınızın ve marka isminizin günde 15 kere hatırlanarak kalıcı yer edinmesini sağlar. Mavi Basım olarak Elazığ esnafına özel 0.40 mm kalın manyetik levhaya sıvanmış yüksek çözünürlüklü magnetler basıyor ve doğrudan kapınıza sevk ediyoruz.',
    sections: [
      {
        title: 'Elazığ Yöresel Orcik ve Şarküteri Markalarına Özel Figürlü Magnetler',
        paragraphs: [
          'Orcik rulosu şeklinde, tulum peyniri tekeri şeklinde ya da kebap tepsisi şeklinde hidrolik bıçak pres kesimlerimizle ürettiğimiz şekilli magnetler, klasik kare magnetlere kıyasla 3 kat daha fazla dikkat çekmektedir. Üzeri koruyucu parlak lüks selefon kaplıdır.',
          'Gıda temalı resimleri en enfes şekilde yansıtan 300 DPI ve CMYK döküm kalitemizle Elazığ esnafının hak ettiği matbaa kalitesini sağlıyoruz.'
        ]
      },
      {
        title: 'Topkapı Fabrika Bandından Doğrudan Elazığ Kapısına Sevk',
        paragraphs: [
          'Yerel aracıları aradan kaldırarak doğrudan İstanbul sanayimizden aldığınız güçle bütçenizi koruyorsunuz. Elazığ il merkezi ve çevre ilçelere (Kovancılar, Karakoçan, Maden) hasarsız kargo teslimat.'
        ]
      }
    ],
    faqs: [
      { question: 'Magnetler dolaptan kayıp kayıp düşer mi?', answer: 'Kesinlikle hayır! Biz piyasada kullanılan 0.30 mm ince fason mıknatıslar yerine ithal gerçek 0.40 mm kalın, dolap kapağını sarsınca kaymayan manyetik tabaka kullanıyoruz.' },
      { question: 'Orcik ambalaj kutusuna sığacak magnet ebadı nedir?', answer: 'Kutuların içine rahatlıkla sığabilecek 46x68 mm veya 50x70 mm ebatları yössel hediye paketlerinde en verimli olanıdır.' }
    ],
    internalLinks: [
      { text: 'Magnet Baskı', path: '/magnet' },
      { text: 'Broşür Baskı', path: '/brosur' },
      { text: 'Kartvizit Baskı', path: '/kartvizit' },
      { text: 'Kutu Baskı', path: '/kutu' },
      { text: 'Katalog Baskı', path: '/kataloglar' }
    ],
    offers: { lowPrice: '480', highPrice: '2600', count: '8' }
  },
  'van-kutu-baski': {
    path: '/van-kutu-baski',
    title: 'Van Kutu Baskı | Şık Otlu Peynir & Yöresel Ürün Kutusu',
    metaDesc: 'Van otlu peynir imalatçıları, bal üreticileri, kuruyemiş ve pastane dükkanları için gıda temas onaylı koku yapmayan şık karton kutu üretimi.',
    h1: 'Van Kutu Baskı',
    tagline: 'Köklü Kültürü ve Eşsiz Lezzetleri ile Van\'a Yakışır Lüks Ambalaj Kutuları',
    intro: 'Van, meşhur otlu peyniri, yayla balı, zengin kahvaltı kültürü ve yöresel gıda üreticileri ile ambalaj kutusunun en dayanıklı ve sağlıklı olması gereken kenttir. Ürünlerin nemli havada bozulmasını engelleyen, gıdaya koku vermeyen lüks karton kutular üretmek ambalaj sanatının zirvesidir. Mavi Basım olarak Van\'daki tüm yöresel üreticilere özel ambalaj kutusu imal ediyoruz.',
    sections: [
      {
        title: 'Peynir ve Yöresel Ürün Üretiminde Koku Yapmayan Sedefli İç Koruma Bariyerleri',
        paragraphs: [
          'Gıdaların temasında solvent kokusunu kesinlikle sıfırlayan tamamen soya bazlı organik mürekkepler ile döküm yapıyoruz. Kutunun iç çeperine döşediğimiz sedef laminasyon su ve yağ kalkanı, ürün sıvısının kartondan dışarı sızmasını önler, kutu bütünlüğünü tam korur.',
          'Altın varak ve gümüş yaldız dökümlerimizle de yöresel ürün kutunuza üst düzey görkem ve prestij kazandırarak Van kalitesini taçlandırıyoruz.'
        ]
      },
      {
        title: 'Doğrudan Topkapı 2. Matbaacılar Sitesi Üretim Gücü',
        paragraphs: [
          'Van genelindeki tüm sanayicilere ve ihracatçı esnaflara aracı dükkanı olmadan direkt fabrikadan kargo paletli olarak ambalaj sevkiyatı yapıyoruz. İpekyolu\'ndan Edremit, Erciş\'e tüm ilçelerde düz ambalaj kolileme kalitesiyle sevkiyat.'
        ]
      }
    ],
    faqs: [
      { question: 'Van kutularında logo kabartma (gofre) yapılıyor mu?', answer: 'Evet, lüks mat selefon kaplı üst kapaklara logo alanında kabartma gofre ve kısmi lak sürerek lüks dokunsal şıklık oluşturuyoruz.' },
      { question: 'Filtreli pencereli bal ve peynir kutusu imalatı mümkün müdür?', answer: 'Kesinlikle. Müşterilerinizin ürünün kalitesini görebilmesi için ambalaj kapaklarına asil asetatlı pencereler yerleştirebiliyoruz.' }
    ],
    internalLinks: [
      { text: 'Kutu Baskı', path: '/kutu' },
      { text: 'Etiket Baskı', path: '/etiket' },
      { text: 'Karton Çanta', path: '/karton-canta' },
      { text: 'Broşür Baskı', path: '/brosur' },
      { text: 'Katalog Baskı', path: '/kataloglar' }
    ],
    offers: { lowPrice: '1200', highPrice: '14000', count: '15' }
  },
  'konya-katalog-baski': {
    path: '/konya-katalog-baski',
    title: 'Konya Katalog Baskı | Tarım Makineleri & Sanayi Kataloğu',
    metaDesc: 'Konya\'daki tarım makineleri üreticileri, ağır sanayi dükkanları, değirmen sistemleri ve unlu mamul fabrikaları için kaliteli Amerikan ciltli katalog basımı.',
    h1: 'Konya Katalog Baskı',
    tagline: 'Konya Sanayi Gücünü Dünyaya İhraç Edecek Profesyonel Ağır Sınıf Kataloglar',
    intro: 'Konya, devasa organize sanayi siteleri, dünya çapında ihracat yapan tarım makineleri fabrikaları, değirmen ekipmanı imalatçıları ve unlu mamul tesisleriyle İç Anadolu\'nun en güçlü sanayi başkentlerindendir. Bu zengin makine parçalarını ve sistemlerini yurt dışına ve yurt içine sunarken görsellerin yüksek çözünürlükte, renk doğruluğunda ve aşınmaz kalınlıkta basılması gerekir. Mavi Basım olarak Konya sanayicisine özel Heidelberg kalıplı lüks kataloglar basıyoruz.',
    sections: [
      {
        title: 'Ağır Sanayi ve Değirmen Makineleri İçin Mukavemetli Tel Spiral & Ciltleme',
        paragraphs: [
          'Katalog sayfalarınızın yağlı sanayi atölyelerinde dağılmaması ve yırtılmaması için 170 gr kalın parlak kuşe kağıtlar basıyoruz. Sırt kısma uyguladığımız dikey çift tel metal spiral dikişleri veya PUR tutkallı Amerikan ciltleme, sayfaları kopmaktan tamamen korur.',
          'Kataloğun ön ve arka kapaklarına 350 gr kuşe karton sıvayarak neme, tozlanmaya ve yağ lekelerine karşı koruyucu mat selefon kaplıyoruz. Bu kataloğa asalet ve uzun bir dayanım ömrü katar.'
        ]
      },
      {
        title: 'Topkapı’dan Konya Organize Sanayi Bölgelerine Paletli Sevkiyat',
        paragraphs: [
          'Konya OSB\'deki tüm fabrikalara palet bazında shrinkli, neme karşı tam izole korumalı koliler halinde sigortalı hızlı lojistik lojmanlarımız kapınıza ulaştırılır.'
        ]
      }
    ],
    faqs: [
      { question: 'Konya\'ya katalog siparişimiz kaç günde ulaşır?', answer: 'Konya ili ve çevre sanayi ilçelerine (Karatay, Selçuklu, Beyşehir dikey sanayi bandı dahil) kargo veya kamyon sevkiyatlarımız baskı ve ciltleme süreci bittikten sonra ortalama 2 iş günüdür.' },
      { question: 'Katalog sayfalarında renk doğruluğu nasıl sağlanır?', answer: 'Renk onaylarında Heildelberg spektrofotmetre dijital ölçümleri kullanarak uluslararası standartlarda tutarlı renk dökümü sağlıyoruz.' }
    ],
    internalLinks: [
      { text: 'Katalog Baskı', path: '/kataloglar' },
      { text: 'Broşür Baskı', path: '/brosur' },
      { text: 'Kutu Baskı', path: '/kutu' },
      { text: 'Kartvizit Baskı', path: '/kartvizit' },
      { text: 'Magnet Baskı', path: '/magnet' }
    ],
    offers: { lowPrice: '1400', highPrice: '18000', count: '12' }
  },
  'ankara-brosur-baski': {
    path: '/ankara-brosur-baski',
    title: 'Ankara Broşür Baskı | Uygun Fiyatlı Tanıtım El İlanı',
    metaDesc: 'Ankara’daki danışmanlık büroları, sürücü kursları, kafeler ve sürücü kursları için 135 gr kuşe katlamalı broşür baskısı. Topkapı matbaa kalitesi ve hızlı kargo!',
    h1: 'Ankara Broşür Baskı',
    tagline: 'Başkentin Yoğun İş Hacmine Uygun Hızlı ve Ekonomik Tanıtım Broşürleri',
    intro: 'Ankara, kamu kurumları, sürücü kursları, eğitim kurumları, kafeler ve profesyonel mali müşavir bürolarıyla yoğun bir evrak ve tanıtım sirkülasyonunun merkezidir. Bilgilendirici ve göze hoş gelen katlamalı broşürler, ajansınızın veya işletmenizin ulaştığı kitle sayısını ve güven puanını en üst dereceye çıkarır. Mavi Basım olarak Ankara\'daki her sektöre uygun, Heidelberg kalitesinde fırınlanmış kuşe broşürleri en ucuz fiyatlarla basıyor ve hızlıca Ankara\'ya gönderiyoruz.',
    sections: [
      {
        title: 'Ankara Eğitim Kurumları ve Sürücü Kurslarına Özel Broşürler',
        paragraphs: [
          'Eğitim kurumları, sürücü kursları ve dikey danışmanlık büroları için A4 veya A5 ebatlarında içe katlamalı C-kırım broşür dökümlerimiz temel seçenektir. 135 gr parlak kuşe kağıtlar üzerindeki detaylar 300 DPI ve CMYK renk kalıbıyla pürüzsüz basılır.',
          'Harika tasarımıyla Ankara caddelerinde elden dağıtacağınız el ilanlarımız, yüksek bir bütçe tasarrufu sunan ortak ofset havuzumuzdan sevk edilmektedir. Aracıyı kaldırın, kazanın.'
        ]
      },
      {
        title: 'Topkapı Kalitesi ile Ankara Kapısına 24 Saatte Hızlı Teslimat',
        paragraphs: [
          'Siparişleriniz ezilmeyen en sert mukavva kolilere basılarak Ankara merkez ve tüm ilçelerine (Çankaya, Yenimahalle, Keçiören, Sincan, Etimesgut) hasarsız teslim edilir.'
        ]
      }
    ],
    faqs: [
      { question: 'Ankara broşür siparişi kaç günde basılıp teslim olur?', answer: 'Ortalama ofset basım ve kırım makinesi katlama işlemleriniz bittikten sonra 24-48 saat içerisinde Ankara adresinizde teslim edilmektedir.' },
      { question: 'Kuşe kağıt kalitesinde renklerin parlaması nasıl sağlanıyor?', answer: 'Matbaamızda kullandığımız 1. sınıf parlak kuşe kağıtlar üzerine uygulanan infrared kurutuculu ofset fırınlama sayesinde renkler inanılmaz derecede berrak ve ışıltılı görünür.' }
    ],
    internalLinks: [
      { text: 'Broşür Baskı', path: '/brosur' },
      { text: 'Katalog Baskı', path: '/kataloglar' },
      { text: 'Magnet Baskı', path: '/magnet' },
      { text: 'Kartvizit Baskı', path: '/kartvizit' },
      { text: 'Kutu Baskı', path: '/kutu' }
    ],
    offers: { lowPrice: '620', highPrice: '4800', count: '10' }
  },
  'mugla-kutu-baski': {
    path: '/mugla-kutu-baski',
    title: 'Muğla Kutu Baskı | Markalı Ambalaj & Hediyelik Sabun-Çam Balı Kutusu',
    metaDesc: 'Muğla\'daki e-ticaret markaları, tekstil butikleri, butik sabun ve çam balı atölyeleri için şık pencereli gıda temas onaylı kaliteli karton kutu ve ambalaj imalatı.',
    h1: 'Muğla Kutu Baskı',
    tagline: 'Ege ve Akdeniz Esintisine Yakışır Lüks Kuru ve Islak Ambalaj Kutuları',
    intro: 'Muğla, butik çam balı imalatçıları, ambalajlı sabun ve kozmetik atölyeleri, zengin butik otelleri ve gıda restoranları ile özgün tasarımlı marka kutularına en yoğun gereksinim duyan sahil ilimizdir. Sabunların rüzgar alıp taze kokmasını koruyacak asetat pencereli kutulardan tekstil kargo kolilerine kadar her ebatta imalat yapmaktayız. Mavi Basım olarak Muğla esnafına koku yapmayan, gıda uyumlu sedefli asil kutular döküyoruz.',
    sections: [
      {
        title: 'Butik Çam Balı ve Organik Kozmetik İçin Kapaklı & Pencereli Lüks Kutular',
        paragraphs: [
          'Cam kavanozlardan sızabilecek sızma çam ballarının kartonu yumuşatmasını tamamen engellemek adına kutu iç çeperlerini sedef laminasyon yağ ve nem bariyeri ile kaplıyoruz. Sabun ve hediyelik kuru kurabiye kutularımızın üst kapaklarına takılan saydam asetatlar, ürün albenisini en üst seviyeye taşır.',
          'Tüm ambalaj imalatlarımızda çevreye duyarlı, kokusuz soya bazlı organik gıda mürekkepleri ve pürüzsüz 1. sınıf Amerikan Bristol mukavvaları kullanıyoruz.'
        ]
      },
      {
        title: 'Topkapı 2. Matbaacılar Sitesi Gücü Doğrudan Ege Kapınızda',
        paragraphs: [
          'Bünyesinde her türlü kesim pres dikey döküm Heidelberg ünitelerimizin bulunduğu fabrikamızdan Muğla ilçelerine (Bodrum, Marmaris, Fethiye, Datça, Ortaca) paletli korumalı teslimat yapmaktayız.'
        ]
      }
    ],
    faqs: [
      { question: 'Muğla kutu sipariş nakliye süresi nedir?', answer: 'Üretim ardından düz katlanmış olarak koli şeritleriyle sarılan kutularımız ortalama 2 iş gününde Muğla kapınıza sevk olunur.' },
      { question: 'Açık hava pazarlarına özel neme dayanıklı ambalaj yapıyor musunuz?', answer: 'Evet, neme karşı tam izole koruma kalkanları ile sarıp sevk ettiğimiz için ambalajlar kargo dökümü esnasında kesinlikle neme maruz kalarak gevşemez.' }
    ],
    internalLinks: [
      { text: 'Kutu Baskı', path: '/kutu' },
      { text: 'Etiket Baskı', path: '/etiket' },
      { text: 'Karton Çanta', path: '/karton-canta' },
      { text: 'Broşür Baskı', path: '/brosur' },
      { text: 'Katalog Baskı', path: '/kataloglar' }
    ],
    offers: { lowPrice: '1200', highPrice: '14000', count: '15' }
  },
  'samsun-restoran-brosur-baski': {
    path: '/samsun-restoran-brosur-baski',
    title: 'Samsun Restoran Broşür Baskı | Katlamalı Restoran Sipariş Fişleri',
    metaDesc: 'Samsun\'daki lokanta ve restoranlar için yüksek kaliteli katlamalı paket servis broşürleri ve menü basımı. 135 gr parlak kuşe kağıda tam ofset baskı.',
    h1: 'Samsun Restoran Broşür Baskısı ve Restoran Sipariş Fişi Çözümleri',
    tagline: 'Samsun Lezzetlerini Evlere Taşıyan Akordeon Menü ve Broşür Baskıları',
    intro: 'Samsun\'un İlkadım, Atakum, Canik ve Tekkeköy gibi hareketli lokasyonlarındaki restoranlar ve paket servis noktaları için kaliteli bir broşür menü, en etkili kazanç kaynağıdır. Mavi Basım olarak İstanbul Topkapı üretim gücümüzle Samsun\'daki lokanta ve pide salonlarına en ucuz maliyetli ve yüksek çözünürlüklü broşür çözümleri sunuyoruz.',
    sections: [
      {
        title: 'Samsun Restoranları İçin Broşür Katlama Seçenekleri ve Kağıt Gramajları',
        paragraphs: [
          'Broşürlerde en çok tercih edilen 135 gr parlak kuşe kağıttır. Samsun\'daki pide salonları, kebapçılar ve dönerciler için üçe katlamalı akordeon veya c-kırım broşür türleri en idealken, sokak dağıtımı yapılacaksa 115 gr kuşe kağıt bütçe dostudur.',
          'Daha tok ve elit bir his yaratmak isteyen lüks restoranlar için ise 170 gr kuşe kağıt üzerine parlak şık koruyucu lak uygulaması en ideal seçimdir.'
        ]
      },
      {
        title: 'Gıda Uyumlu Baskı Mürekkepleri ile Maksimum Hijyen',
        paragraphs: [
          'Paket poşetlerinin, sıcak pidelerin ve ekmeklerin yanına yerleştirilen broşürlerin hijyen standartlarına uyması gerekir. İstanbul Topkapı tesislerimizde gıdayla temasa uygun kokusuz bitkisel soya bazlı mürekkeplerle basım gerçekleştiriyoruz.'
        ]
      }
    ],
    faqs: [
      { question: 'Samsun\'a broşür siparişleri kaç günde teslim edilir?', answer: 'Grafik tasarım onayından sonra 3-5 iş günü içinde ofset basımı tamamlanır ve kargo ile Samsun adresinize gönderilir.' },
      { question: 'Broşürlerde kesim ve taşma payı ne kadardır?', answer: 'Giyotin kesimlerinde yazıların gitmemesi için her kenardan +3 mm taşma payı bırakarak basıma hazırlıyoruz.' }
    ],
    internalLinks: [
      { text: 'Broşür Baskı', path: '/brosur' },
      { text: 'Samsun Kartvizit Baskı', path: '/samsun-kartvizit-baski' },
      { text: 'Amerikan Servis', path: '/amerikan-servis' },
      { text: 'Magnet Baskı', path: '/magnet' }
    ],
    offers: { lowPrice: '620', highPrice: '4100', count: '10' }
  },
  'trabzon-kafe-menu-baski': {
    path: '/trabzon-kafe-menu-baski',
    title: 'Trabzon Kafe Menü Baskı | Kraft Kalın Menü ve Amerikan Servis',
    metaDesc: 'Trabzon\'daki kafe ve pastaneler için kalın lüks kağıtlara laklı ve özel kesim masa üstü menü basımı. Hızlı kargo, doğrudan matbaadan uygun fiyatlar.',
    h1: 'Trabzon Kafe Menü Baskısı ve Sektörel Masa Üstü Menü Çözümleri',
    tagline: 'Karadeniz Esintisini Masalarınıza Yansıtan Özel Tasarım Menü Baskıları',
    intro: 'Trabzon\'un her geçen gün büyüyen Ortahisar, Akçaabat ve Yomra ilçelerindeki elit kafeler, kahveciler ve çay bahçeleri için menü tasarımı ve baskı kalitesi en önemli kimlik kartıdır. Mavi Basım olarak, leke tutmayan mat koruyucu selefonlu veya doğal görünümlü lüks kraft kağıtlara kafe menü imalatı sunuyoruz.',
    sections: [
      {
        title: 'Leke Tutmayan Lamine Kaplama ve Kalın Gramaj',
        paragraphs: [
          'Kafelerde menülerin üzerine dökülen kahve ve su damlalarından etkilenmemesi için çift yüzey mat veya parlak ince pvc selefon kaplama ekliyoruz. 350 gr en lüks bristol kağıt ile menüleriniz esnemez ve lüks duruşunu korur.',
          'Geniş tasarım şablonlarımız ile Karadeniz mutfağının asil ve doğal algısını tam olarak yansıtabilmekteyiz.'
        ]
      },
      {
        title: 'Spiralli ve Dikim Lüks Cilt Çözümleri',
        paragraphs: [
          'Menü sayfa sayısı çok olan kafeler için tel dikiş veya metal tel spiral ciltlemeli menü alternatifleri üreterek uzun ömürlü bir deneyim sağlıyoruz. Topkapı fabrikamızdan doğrudan sevk sağlıyoruz.'
        ]
      }
    ],
    faqs: [
      { question: 'Kafemin logosunu kabartmalı veya parlak yapabilir miyiz?', answer: 'Evet, 350 gr bristol veya kuşe kağıda mat selefon üzerine lak ve yaldız uygulaması yaparak markanızı parlatabiliyoruz.' },
      { question: 'Sipariş asgari adeti nedir?', answer: 'Lüks ciltli menülerde 10 adetten, yaprak Amerikan Servis ve broşür menülerde ise 1000 adetten başlayan baremlerimiz mevcuttur.' }
    ],
    internalLinks: [
      { text: 'Katalog Baskı', path: '/kataloglar' },
      { text: 'Trabzon Broşür Baskı', path: '/trabzon-brosur-baski' },
      { text: 'Amerikan Servis', path: '/amerikan-servis' },
      { text: 'Kutu Baskı ve Çanta', path: '/kutu' }
    ],
    offers: { lowPrice: '450', highPrice: '7500', count: '12' }
  },
  'ordu-findik-firmasi-katalog-baski': {
    path: '/ordu-findik-firmasi-katalog-baski',
    title: 'Ordu Fındık Firması Katalog Baskı | İhracat Kalite Ürün Kataloğu',
    metaDesc: 'Ordu fındık üreticileri, ihracatçıları ve tarım sanayicileri için lüks ciltli, tel dikişli veya iplik dikişli fındık ürün tanıtım kataloğu basımı.',
    h1: 'Ordu Fındık Firması Ürün Katalog Baskısı ve Tanıtım Çözümleri',
    tagline: 'Dünya Standartlarında İhracatçı Fındık Sanayisi Kataloğu İmalatı',
    intro: 'Ordu, dünya fındık üretiminin ve ticaretinin kalbidir. Altınordu, Ünye ve Fatsa\'daki fındık kırma, paketleme ve ihracat tesisleri, yurtdışı ve yurtiçi fuarlarda markalarını temsil ederken birinci sınıf bir kataloga ihtiyaç duyar. Mavi Basım olarak, fındık sanayicilerine parlak kabartma lak kapaklı, en yüksek ofset kaliteli kataloglar döküyoruz.',
    sections: [
      {
        title: 'İhracat Kalite Katalogda Kağıt ve Cilt Seçimi',
        paragraphs: [
          'Fındık firmaları için hazırladığımız kataloglarda kapak kısmı için genellikle 300 gr veya 350 gr kuşe kağıt ve mat selefon, iç sayfalar için ise 135 gr ya da 170 gr parlak kuşe kağıt kullanıyoruz. Tel dikişli veya lüks Amerikan ciltli modellerimiz mevcuttur.'
        ]
      },
      {
        title: 'Görsellerin CMYK Renk Hassasiyeti',
        paragraphs: [
          'Fındığın kahverengi ve altın sarısı tonlarının, paketlerin orijinal renklerinin katalogda soluk görünmemesi için gelişmiş Heidelberg ofset makinelerimizde 300 DPI yüksek netlik standartlarında basım yapmaktayız.'
        ]
      }
    ],
    faqs: [
      { question: 'Yabancı dilli ihracat kataloglarında dil kontrolü yapıyor musunuz?', answer: 'Göndereceğiniz tasarımlardaki dil karakterlerinin (İngilizce, Almanca vb.) baskıda bozulmaması için PDF çıktılarınızı ücretsiz dijital kontrolden geçiriyoruz.' },
      { question: 'Teslimat kaç günde gerçekleşir?', answer: 'Katalog dökümlerinin cilt çeşidine bağlı olarak üretim süresi 5 ila 7 iş günüdür.' }
    ],
    internalLinks: [
      { text: 'Katalog Baskı', path: '/kataloglar' },
      { text: 'Ordu Magnet Baskı', path: '/ordu-magnet-baski' },
      { text: 'Etiket Baskı', path: '/etiket' },
      { text: 'Kutu Baskı', path: '/kutu' }
    ],
    offers: { lowPrice: '2200', highPrice: '28000', count: '18' }
  },
  'antalya-emlakci-kartvizit-baski': {
    path: '/antalya-emlakci-kartvizit-baski',
    title: 'Antalya Emlakçı Kartvizit Baskı | Gayrimenkul Danışmanı Randevu Kartı',
    metaDesc: 'Antalya\'daki emlak ofisleri ve gayrimenkul danışmanları için lüks kabartma laklı, altın varaklı ve kalın karton emlakçı kartvizit siparişi.',
    h1: 'Antalya Emlakçılar ve Gayrimenkul Ofisleri İçin Lüks Kartvizit Baskı',
    tagline: 'Antalya Emlak Sektöründe Güven Veren Kalın ve Prestijli Kartvizit Baskıları',
    intro: 'Antalya ve çevre ilçelerinde faaliyet gösteren gayrimenkul danışmanları ve emlak ofisleri için ilk izlenim çok önemlidir. Müşteriye elden uzatılan lüks ve kalın bir emlakçı kartviziti, yapacağınız büyük konut ve arsa anlaşmalarında güvenilirlik ifadesidir. Mavi Basım olarak en ucuz maliyetli ve lüks kabartma laklı emlakçı kartvizitlerini doğrudan kapınıza sevk ediyoruz.',
    sections: [
      {
        title: 'Ayrıcalıklı Emlak Kartvizitlerinde Teknik Özellikler',
        paragraphs: [
          '350 gr kalın kuşe kartona mat selefon kaplayarak kartvizite asil bir ağırlık kazandırıyoruz. Şık bir logo için lokal lak uygulaması ile logo üzerine kabartmalı parlaklık verip kurumsal duruşunuzu destekliyoruz.'
        ]
      },
      {
        title: 'Arka Yüzeyde Portföy Tanıtım ve QR Kod Devri',
        paragraphs: [
          'Kartvizitin arkasına ekleyeceğimiz bir QR kod ile müşterilerinizin tek tıkla dijital portföy sitenize, sahibinden ilan sayfanıza veya WhatsApp konumunuza erişmesini kolaylaştırıyoruz.'
        ]
      }
    ],
    faqs: [
      { question: 'Emlakçı kartvizitlerinde kargo teslim süresi nedir?', answer: 'Üretimimiz bittikten sonra en geç 2 gün içinde Antalya\'daki ofisinize teslim edilmektedir.' },
      { question: 'Kabartma laklı kartvizitler için en az kaç adet sipariş verebilirim?', answer: 'Lüks laklı modellerimizde minimum sipariş adeti 1000\'dir.' }
    ],
    internalLinks: [
      { text: 'Kartvizit Baskı', path: '/kartvizit' },
      { text: 'Antalya Katalog Baskı', path: '/antalya-katalog-baski' },
      { text: 'Broşür Baskı', path: '/brosur' },
      { text: 'Kurumsal Matbaa', path: '/matbaa' }
    ],
    offers: { lowPrice: '380', highPrice: '2900', count: '10' }
  },
  'rize-lokanta-amerikan-servis': {
    path: '/rize-lokanta-amerikan-servis',
    title: 'Rize Lokanta Amerikan Servis Baskı | Tek Kullanımlık Kağıt Altlık',
    metaDesc: 'Rize\'deki restoran, pide salonu ve oteller için gıda mürekkepli tek kullanımlık Amerikan servis kağıt altlık basımı. Topkapı fabrikasından doğrudan imalat.',
    h1: 'Rize Lokanta Amerikan Servis Kağıt Baskı ve Sunum Çözümleri',
    tagline: 'Rize Yaylalarından Sofralara Uzanan Hijyenik Tek Kullanımlık Kağıt Altlıklar',
    intro: 'Rize Merkez, Çayeli, Ardeşen ve Pazar ilçelerindeki lokantalar, pide salonları ve turistik balık restoranlarında masaların temiz, hızlı ve şık durması Amerikan servis kağıtları ile sağlanır. Mavi Basım olarak sofralarda hijyen ve marka değerini artıracak, gıda onaylı soya mürekkepli rulo ve düz tabaka kağıt Amerikan servisleri en uygun online fiyatlarla sunuyoruz.',
    sections: [
      {
        title: 'Kullanılan Kağıt Kaliteleri ve Ebat Seçenekleri',
        paragraphs: [
          'Genellikle sofralarda kaymayı önleyen ve bardak ıslaklığına karşı dirençli olan 80 gr 1. hamur asil kağıt veya hafif grimsi nostaljik dokulu şık kraft kağıtları tercih etmekteyiz. Standart ebat olarak 33x48 cm ve 35x50 cm boyutları kullanılmaktadır.'
        ]
      },
      {
        title: 'Gıda Mürekkepli Sağlıklı Üretim Güvencesi',
        paragraphs: [
          'Porsiyon tabaklarının, çatal ve bıçakların doğrudan temas ettiği kağıtların kanserojen kimyasallar barındırmaması şarttır. Topkapı tesislerimizde gıdaya uygun sertifikalı su bazlı ofset boyalarıyla pürüzsüz baskı sağlıyoruz.'
        ]
      }
    ],
    faqs: [
      { question: 'Amerikan servisler rulo halinde mi dikey tabaka halinde mi paketlenir?', answer: 'Ürünlerimizin kırışmasını engellemek için pürüzsüz düz tabaka halinde, 500\'lü veya 1000\'li streçlenmiş kraft kolilerde sevk yapmaktayız.' },
      { question: 'Siparişlerin Rize\'ye gönderim süresi ne kadardır?', answer: 'Ofset döküm ve kuruma süreci bittikten sonra 3-4 iş gününde Rize\'deki adresinize ulaşır.' }
    ],
    internalLinks: [
      { text: 'Amerikan Servis', path: '/amerikan-servis' },
      { text: 'Rize Broşür Baskı', path: '/rize-brosur-baski' },
      { text: 'Magnet Baskı', path: '/magnet' },
      { text: 'Katalog Baskı', path: '/kataloglar' }
    ],
    offers: { lowPrice: '850', highPrice: '6200', count: '12' }
  },
  'giresun-fast-food-cips-kutusu-baski': {
    path: '/giresun-fast-food-cips-kutusu-baski',
    title: 'Giresun Fast Food Cips Kutusu Baskı | Logolu Atıştırmalık Ambalajı',
    metaDesc: 'Giresun\'daki dönerci, restoran ve büfeler için sızdırmaz iç bariyerli, sıcak patates cips kutusu üretimi. Kaliteli ofset baskı seçenekleriyle Topkapı\'dan Giresun\'a teslim.',
    h1: 'Giresun Restoran ve Büfelerine Özel Logolu Patates Cips Kutusu İmalatı',
    tagline: 'Giresun Fast Food Sektörü İçin Mukavemetli, Kilitli Taban Cips Kutusu Tasarımları',
    intro: 'Giresun Merkez, Bulancak, Espiye ve Görele\'deki lezzet durakları, dönerciler ve popüler büfeler için siparişlerin sıcaklığı ve sunum biçimi her şeydir. Mavi Basım olarak koku yapmayan, yağı dışarı vermeyen ve patatesleri dikey formda çıtır çıtır tutan kaliteli karton cips kutularını Giresun\'daki işletmelerin kapısına ulaştırıyoruz.',
    sections: [
      {
        title: 'Giresun Esnafı İçin Sızdırmaz Gıda Mukavvası Kalitesi',
        paragraphs: [
          'Patateslerin sosları veya sıcaklıkları mukavvayı gevşetip yırtılmasına neden olabilir. Bu duruma engel olmak için, gıda ambalajına özel sert ve içten koruma bariyerli Bristol karton hammaddelerini seçiyoruz.',
          'Giresun genelindeki kafe ve büfelerimiz için ürettiğimiz kutularda sıfır solvent ve bitkisel bazlı, sıcaklık etkisiyle buharlaşıp yemeğe geçmeyen güvenli su bazlı boyalar kullanıyoruz.'
        ]
      },
      {
        title: 'Ergonomik Tasarım ve Kolay Mutfak Kurulumu',
        paragraphs: [
          'Köşeli taban ve kilitli geçme kollar, kutuları yoğun saatlerde saniyeler içerisinde pratikçe kurmanızı sağlar. Katlanmış düz koli halinde sevk edildiğinden işletmenizin deposunda veya tezgahında hiç alan kaplamaz.'
        ]
      }
    ],
    faqs: [
      { question: 'Ürünlerin Giresun\'a sevkiyatı ne kadar sürer?', answer: 'Tasarım onayınızın alınmasından sonra cips kutusu üretimi 4-5 iş gününde tamamlanır ve Giresun adresinize sigortalı çift kat kolilerde sevk edilir.' },
      { question: 'Cips kutusu üzerine gofraj (kabartma) veya lak yapılabilir mi?', answer: 'Gıda teması olan iç kısımdan uzak tutularak, kutunun dış yüzeyindeki logo bölgesine parlak lokal lak çalışılabilmektedir, müşterinin eline lüks bir dokunuş hissettirilir.' }
    ],
    internalLinks: [
      { text: 'Kutulama Çözümlerimiz', path: '/gebze-kutu-baski' },
      { text: 'Giresun Kartvizit Baskı', path: '/giresun-kartvizit-baski' },
      { text: 'Restoran Sipariş Fişi', path: '/restaurant-siparis-fisi' }
    ],
    offers: { lowPrice: '620', highPrice: '4500', count: '10' }
  },
  'gebze-eczane-etiket-baski': {
    path: '/gebze-eczane-etiket-baski',
    title: 'Gebze Eczane Etiket Baskı | Reçete ve Sağlık Şişesi Yapışkanları',
    metaDesc: 'Gebze eczaneleri için özel kesim, rulo veya tabaka, ilaç ve şurup şişelerine uyumlu gıda onaylı yapışkanlı kağıt etiket basımları. Online sipariş.',
    h1: 'Gebze Eczacılarına Özel Şişe ve Kutu Tarif Etiketleri Baskısı',
    tagline: 'Gebze Eczaneleri ve Sağlık Kuruluşları İçin Güçlü Yapışkanlı Medikal Etiketler',
    intro: 'Gebze, Darıca, Çayırova ve Dilovası ilçelerinde hastaların ilaç kullanım talimatlarını göreceği eczane tarif etiketleri ve şurup şişesi sticker baskıları sağlık sektörü için kritik bir unsurdur. Mavi Basım olarak kolay soyulan akrilik yapıştırıcılı, yüksek çözünürlüklü ve neme dayanıklı eczane etiketleri imal ediyoruz.',
    sections: [
      {
        title: 'Eczane ve İlaç Şişeleri İçin Yapışkan Gücü ve Kağıt Türleri',
        paragraphs: [
          'İlaç şişelerinin kıvrımlı cam veya plastik yüzeylerinde sıradan etiketler zamanla kalkma yapabilir. Gebze\'deki eczanelerimiz için sunduğumuz yüksek tutuculuklu kuşe etiketler (farma etiket), sıvalı yüzeye sımsıkı tutunarak tozlanma veya nemlenme ile açılmaz.',
          'Reçete çıktılarında kullanılan termal etiketlerden, özel yapım şuruplar için hazırlanan şık kuşe etiket şablonlarına kadar geniş bir medikal etiket gamına sahibiz.'
        ]
      },
      {
        title: 'Medikal Standartlarda Net Yazı Karakterleri',
        paragraphs: [
          'Sağlık söz konusu olduğunda talimatların mili saniyeler içinde okunabilmesi şarttır. Heidelberg dijital ve ofset baskılarımız sayesinde, karınca duası gibi küçük puntolu ilaç kullanım mg ve cc oranları pürüzsüz netlikle (300 DPI) okunabilir kılınır.'
        ]
      }
    ],
    faqs: [
      { question: 'Eczane etiketlerini rulo mu yoksa tek tek mi gönderiyorsunuz?', answer: 'Eczane barkod makinesine veya el uygulamanıza bağlı olarak hem rulolu sarım hem de tabaka şeklinde dikey kesilmiş paketlerde gönderim sağlıyoruz.' },
      { question: 'Yapıştırıcı şişeden sökülürken leke bırakır mı?', answer: 'Ultra güçlü akrilik tutkalımız yüzeyde kalıntı bırakmayı önler; şurup veya krem kaplarında pürüzsüz temizlik sağlar.' }
    ],
    internalLinks: [
      { text: 'Etiket Baskı', path: '/etiket' },
      { text: 'Gebze Kutu Baskı', path: '/gebze-kutu-baski' },
      { text: 'Eczane Tanıtım El İlanları', path: '/sektor/eczane-el-ilani-baski' },
      { text: 'Reçete Koçanı Basımı', path: '/recete' }
    ],
    offers: { lowPrice: '290', highPrice: '3400', count: '14' }
  },
  'bitlis-restaurant-siparis-fisi': {
    path: '/bitlis-restaurant-siparis-fisi',
    title: 'Bitlis Restoran Sipariş Fişi Baskı | Numaratörlü Otokopi Fişi',
    metaDesc: 'Bitlis\'teki restoran, kebap salonları ve lokantalar için 2 veya 3 nüshalı, logolu, numaratörlü, kendinden karbonlu adisyon ve sipariş fişi baskısı.',
    h1: 'Bitlis Lokantalarına Özel Logolu Restoran Sipariş Fişi Baskısı',
    tagline: 'Bitlis Lezzetlerini Düzenli ve Hızlı Servis Etmenizi Sağlayan Ciltli Fişler',
    intro: 'Bitlis Merkez, Tatvan, Ahlat ve Adilcevaz lokantaları için servis kalitesini ve mutfak organizasyonunu artıran yegane unsur numaratörlü sipariş fişidir. Mavi Basım olarak en elit otokopili kağıtlara sipariş fişlerini basıp Bitlis adreslerinize sigortalı gönderiyoruz.',
    sections: [
      {
        title: 'Takip ve Muhasebe Kolaylığı İçin Seri Numaratör Baskıları',
        paragraphs: [
          'Sipariş ve hesap takibinizin sıfır hata ile gitmesi için her koçandaki yapraklara dikey kırmızı numaratör seri basımı gerçekleştiriyoruz. Bu sayede kafe, pastane veya kebapçınızda mali kaçakların önüne geçilir.',
          'Üstten tutkallı veya dikişli kart kapaklı cilt yapımız sayesinde garsonlarınız koçandan sayfaları koparırken yırtılma ve yıpranma yaşanmaz.'
        ]
      },
      {
        title: 'Üstün Otokopi (Karbonlu) Yazım Geçiş Şeffaflığı',
        paragraphs: [
          'Tükenmez kalemle yazarken alt sayfalara yazının silikleşmeden, pürüzsüzce geçmesini sağlayan en yüksek kalitede kimyasal reaksiyonlu otokopi kağıdı tercih etmekteyiz.'
        ]
      }
    ],
    faqs: [
      { question: 'Tasarım logosunu nasıl ekletebiliyoruz?', answer: 'Kendi logonuzu ve adres bilgilerinizi bize PDF, JPEG veya PNG formatında ilettiğinizde tasarım ekibimiz şablonu ücretsiz düzenleyip onayınıza sunar.' },
      { question: 'Bitlis kargo teslim süreci nedir?', answer: 'Fiş baskısı ve numaratör işlemleri 3-4 iş gününde tamamlanarak Bitlis adresinize korunaklı ambalajlar içerisinde hızlı kargo ile sevk edilir.' }
    ],
    internalLinks: [
      { text: 'Afiş Baskı Çözümleri', path: '/sektor/restoran-brosur-baski' },
      { text: 'Bitlis Kutu Baskı', path: '/bitlis-kutu-baski' },
      { text: 'Amerikan Servis Baskı', path: '/amerikan-servis' }
    ],
    offers: { lowPrice: '240', highPrice: '2900', count: '10' }
  },
  'erzurum-emlakci-katalog-baski': {
    path: '/erzurum-emlakci-katalog-baski',
    title: 'Erzurum Halı ve Koltuk Yıkama Baskı | Lüks Konut Portföy Kitapçığı',
    metaDesc: 'Erzurum gayrimenkul ofisleri ve inşaat firmaları için lüks metal dikişli, kalın kuşe kapaklı, 170 gr iç sayfa lüks konut ve arsa katalog döküm hizmetleri.',
    h1: 'Erzurum Emlak Yatırım Firmaları ve İnşaat Ofisleri İçin Katalog Baskısı',
    tagline: 'Doğu Anadolu\'nun Yatırım Hamlelerine Yakışır Kalın ve Lüks Gayrimenkul Katalogları',
    intro: 'Erzurum Yakutiye, Palandöken ve Aziziye\'de gelişen inşaat projeleri ve emlak ofisleri için, lüks konut ve ticari arsa portföyünün sunumu ancak elit bir katalog ile mümkündür. Mavi Basım olarak Topkapı fabrikamızdaki Heidelberg makinelerinde, karlı projelerinizi temsil edecek kalitede iplik ya da tel dikişli premium kataloglar döküyoruz.',
    sections: [
      {
        title: 'Erzurum İnşaat ve Konut Sektöründe Katalog İncelikleri',
        paragraphs: [
          'Arsa veya lüks bina görsellerinin çözünürlüğü kataloğun ilk kalite testidir. Tasarımlarınızdaki tüm mimari render çizimlerini ve peyzaj fotoğraflarını 350 DPI ultra net dökümle basıyoruz. Kapak olarak 300 gr parlak kuşe kağıda yırtılmaları önleyen kadife dokulu mat selefon giydiriyoruz.',
          'Böylece katalog elden ele gezerken parmak izi lekelerini barındırmaz ve kurumsal lüksünü muhafaza eder.'
        ]
      },
      {
        title: 'Doğu Anadolu İklimine Uygun Tel ve İplik Dikiş Mukavemeti',
        paragraphs: [
          'Sayfaların dökülmesini engelleyen esnek PUR tutkal Amerikan ciltleme veya çift noktalı metal tel dikiş uygulamalarımızla soğuk ve kuru kış aylarında dahi sayfaların kopmasına izin vermiyoruz.'
        ]
      }
    ],
    faqs: [
      { question: 'Baskı öncesinde PDF dosyamızda teknik inceleme yapıyor musunuz?', answer: 'Evet, çözünürlük, CMYK renk dönüşümü, kesim taşma payı ve katlama koordinatlarınızı grafik ekibimiz ücretsiz check-up ile kontrolden geçirir.' },
      { question: 'Erzurum teslimatları ne kadar sürede adrese ulaşır?', answer: 'Katalog döküm ve ciltleme işlemlerimiz ortalama 5-6 iş gününde biterek kargo ile Erzurum ofisinize teslim amacıyla sevk edilir.' }
    ],
    internalLinks: [
      { text: 'Katalog Baskı', path: '/kataloglar' },
      { text: 'Erzurum Katalog Baskı', path: '/erzurum-katalog-baski' },
      { text: 'Emlakçı Kartvizit Çözümleri', path: '/sektor/emlakci-kartvizit-baski' },
      { text: 'Kartvizit Baskı', path: '/kartvizit' }
    ],
    offers: { lowPrice: '2200', highPrice: '28000', count: '18' }
  },
    'kayseri-emlakci-afis-baski': {
    path: '/kayseri-emlakci-afis-baski',
    title: 'Kayseri Emlakçı Afiş Baskı | Satılık Kiralık Branda ve Bez Afişler',
    metaDesc: 'Kayseri\'deki emlak danışmanları ve emlak ofisleri için dış mekana dayanıklı, delikli kuşgözlü satılık/kiralık branda afiş basımı. Akma ve solma yapmayan dijital baskılar.',
    h1: 'Kayseri Gayrimenkul Ofisleri İçin Branda ve Satılık/Kiralık Emlakçı Afişi',
    tagline: 'İç Anadolu Rüzgarlarına ve Güneşe Meydan Okuyan Solmaz Branda Afişleri',
    intro: 'Kayseri Melikgazi, Kocasinan, Talas ilçelerindeki yoğun kentsel dönüşüm ve gayrimenkul hareketliliğinde, bir gayrimenkulün satılmasını sağlayan en etkili araç pencerelere asılan branda afiştir. Mavi Basım olarak solmaya karşı dirençli solvent-dışı UV mürekkeplerle bez ve vinil emlakçı afişlerini hızlı teslimatla döküp sevk ediyoruz.',
    sections: [
      {
        title: 'Aşırı Sıcağa ve Don Ayazına Dayanıklı Branda Malzemesi',
        paragraphs: [
          'Kayseri\'nin kış ayazı rüzgarlarına ve yaz sıcağına asılan afişlerin yırtılmaması için 440 gr döküm Avrupa branda vinil malzemesi kullanıyoruz. Kenar kırma dikişlerimizi dikey dikiş makinesi yerine ısıl frekans yapıştırmayla eritip birleştiriyoruz.',
          'Afişin binalardan uçmasını önleyen rüzgara karşı delikli gözenek gömülü "kuşgözü" (metal pullar) sayısını artırarak güvenli bağlama noktaları oluşturmaktayız.'
        ]
      },
      {
        title: 'Göz Alıcı Renk Kontrastı ve Büyük Harf Tasarımları',
        paragraphs: [
          'Yoldan geçen sürücü ve yayaların telefon numaranızı tek bakışta hafızaya kazıması için yüksek kontrastlı floresan sarısı, parlak kırmızı veya zıt siyah şablonlarla basım gerçekleştirip Kayseri adreslerinize sigortalı sevk ediyoruz.'
        ]
      }
    ],
    faqs: [
      { question: 'Kayseri rüzgarlarına karşı kuşgözü metal halkaların sıklığı nedir?', answer: 'Metrik rüzgar yükünü dikeyde paylaştırmak için paslanmaz halkalarımızı her 50 cm aralıkla yerleştiriyoruz; böylece yırtılma riski minimize edilir.' },
      { question: 'Branda afiş sevk süreci nasıldır?', answer: 'Kayseri ve çevre ilçelere özel rulo rulo sarılı sert mukavva tüplerde, hasar riski sıfırlanmış olarak en geç 3 iş gününde ulaştırıyoruz.' }
    ],
    internalLinks: [
      { text: 'Afiş Baskı Sayfası', path: '/afis' },
      { text: 'Kayseri Kutu Baskı', path: '/kayseri-kutu-baski' },
      { text: 'Emlakçı Kartvizit Çözümleri', path: '/emlakci-kartvizit' }
    ],
    offers: { lowPrice: '190', highPrice: '2800', count: '10' }
  },
  'emlakci-kartvizit': {
    path: '/emlakci-kartvizit',
    title: 'Emlakçı Kartvizit Baskı | Lüks Kabartmalı Gayrimenkul Kartları',
    metaDesc: 'Emlak danışmanları ve emlak ofisleri için lüks dokulu kalın kağıt, mat kadife selefon, gümüş/altın yaldız ve kabartma lak laklı emlakçı kartvizit çözümleri.',
    h1: 'Gayrimenkul Danışmanlarına Özel Lüks Emlakçı Kartvizit Baskıları',
    tagline: 'Milyon Liralık Portföyleri Temsil Eden Tok ve Çift Yönlü Prestij Kartları',
    intro: 'Gayrimenkul ve konut sektöründe kurumsal kimlik ve güven liralık işlemlerin anahtarıdır. Mavi Basım olarak emlak ofisi sahipleri ve profesyonel portföy yöneticileri için, üzerinde markanızın kabartmalı lakla parladığı, kalın kadife hisli elit emlakçı kartvizit modelleri basıp Topkapı\'dan kapınıza gönderiyoruz.',
    sections: [
      {
        title: 'Lüks Kabartmalı Kısmi Lak ve Kadife Dokulu Mat Selefon',
        paragraphs: [
          'Elinizde sıradan incelikte bükülen kartvizitler emlak danışmanının imajını gölgeleyebilir. Bu yüzden 350 gr kuşe kağıda yırtılmaları önleyici mat kadife selefon giydirip, üzerine sadece logonuzun ve isminizin kabartmalı lokasyonu parlatacak kısmi parlak lak atıyoruz.',
          'Böylece parmak ucuyla dokunulduğunda hissedilen o derin lüks doku, her el sıkışmanızda karşı tarafta kalıcı bir itibar oluşturur.'
        ]
      },
      {
        title: 'Seçkin Renkler İçin Ofset Hassasiyeti',
        paragraphs: [
          'Şirket logolarındaki koyu lacivertler, altın sarıları veya gök mavileri piksellenmeye maruz bırakılmadan, Heidelberg ofset kalıplarında tam renk doğruluğuyla (300 DPI) pürüzsüzce dökülür.'
        ]
      }
    ],
    faqs: [
      { question: 'Kabartma laklı kartvizitler için asgari sipariş nedir?', answer: 'Lüks kabartma laklı ve selefonlu prestij serisi kartvizitlerde asgari imalatımız 1000 adettir.' },
      { question: 'Emlakçı kartvizitlerinde arka yüze not alınabilir mi?', answer: 'Eğer arka yüze tükenmez kalemle portföy notu veya randevu saatini yazmak isterseniz, arka yüzü lamine selefonsuz bırakarak üretebiliyoruz.' }
    ],
    internalLinks: [
      { text: 'Genel Kartvizit Baskı', path: '/kartvizit' },
      { text: 'Antalya Emlakçı Kartvizit Baskı', path: '/antalya-emlakci-kartvizit-baski' },
      { text: 'Erzurum Halı ve Koltuk Yıkama', path: '/erzurum-emlakci-katalog-baski' }
    ],
    offers: { lowPrice: '340', highPrice: '2600', count: '12' }
  },
  'emlak-afis-baski': {
    path: '/emlak-afis-baski',
    title: 'Emlak Afiş Baskı | Yırtılmaz Branda ve Bez Emlak Afişleri',
    metaDesc: 'Emlak ofisleri için pencerelere ve dış cephelere asılabilen yırtılmayan paslanmaz kuşgözü delikli güneşe, don ayazına ve rüzgara dayanıklı solvent-dışı UV branda afişler.',
    h1: 'Gayrimenkul Sektörü İçin Yüksek Mukavemetli Branda Emlak Afiş Baskısı',
    tagline: 'Aylarca Dış Cephede Rüzgarla Savaşan, Solmayan Büyük Boy Satılık Afişler',
    intro: 'Bir gayrimenkulün hızlıca satılmasını veya kiralanmasını sağlayan en etkili fiziksel ilan pencerelerde asılan yırtılmaz branda afiştir. Mavi Basım olarak dış mekan rüzgarlarına ve güneş ışınlarına dayanıklı 440 gr Avrupa döküm vinil branda afişler tasarlayıp hızlı teslimat güvencesiyle basıyoruz.',
    sections: [
      {
        title: 'Dış Mekan Mukavemeti: 440 gr Avrupa Branda Kalitesi',
        paragraphs: [
          'Hafif brandalar şiddetli rüzgarlarda hemen yırtılabilir. Bunun önüne geçmek adına 440 gr kalın döküm branda malzemesi tercih ediyoruz. Çevresine attığımız çift kat kıvırma dikişlerimiz sayesinde mukavemet iki katına çıkarılır.',
          'Afişi kolayca esnetip bağlamanız amacıyla, kenarlarına her 50 cm\'de bir delikli paslanmaz metal kuşgözü perçin uyguluyoruz.'
        ]
      },
      {
        title: 'UV Işınlarına Karşı Solmaz Solvent-Dışı Mürekkep',
        paragraphs: [
          'Doğrudan güneşte uzun süre kalan afişlerin solup numaranızın silinmemesi için en yüksek kalite UV ışığı korumalı matbaacılık mürekkeplerini basıyoruz. Yağmurda dikey akmalar yapmaz.'
        ]
      }
    ],
    faqs: [
      { question: 'Brandanın asılması esnasında yırtılmaması için ne yapmalı?', answer: 'Isıl frekans birleştirme kenarlarımız ve özel kuşgözü pullarımız sayesinde branda sabitleme yükünü eşit dağıtır ve kolayca yırtılmaz.' },
      { question: 'Afişlerin üzerine emlakçı telefon numarasını ekleme şablonu nasıldır?', answer: 'Yol hizasından net ve parlak konturla okunabilmesi adına kontrastı yüksek devasa punto yazım şablonu uyguluyoruz.' }
    ],
    internalLinks: [
      { text: 'Afiş Baskı Sayfası', path: '/afis' },
      { text: 'Kayseri Emlakçı Afiş Baskı', path: '/kayseri-emlakci-afis-baski' },
      { text: 'Emlakçı Kartvizit Çözümleri', path: '/emlakci-kartvizit' }
    ],
    offers: { lowPrice: '190', highPrice: '2800', count: '10' }
  },
  'hali-koltuk-yikama-baski': {
    path: '/hali-koltuk-yikama-baski',
    title: 'Halı ve Koltuk Yıkama Baskı | Broşür, El İlanı ve Magnet Çözümleri',
    metaDesc: 'Halı yıkama, koltuk yıkama ve temizlik firmaları için suya dayanıklı kapı kolu askılı broşürler, magnetler, servis formları ve el ilanları en uygun fiyatlarla.',
    h1: 'Temizlik ve Halı Yıkama Firmalarına Özel Tanıtım Baskıları',
    tagline: 'Müşteri Sadakatini Artıran Suya Dayanıklı Magnetler ve Kapı Askılı Broşürler',
    intro: 'Halı ve koltuk yıkama sektöründe, müşterilerinizin size her mevsim doğrudan ulaşabilmesi için akılda kalıcı el ilanları ve buzdolabı magnetleri en etkili pazarlama aracıdır. Mavi Basım olarak temizlik firmaları için solmayan kaliteli baskılar, kapı kolu askılı özel kesim broşürler ve kalın dolap magnetleri basıyoruz.',
    sections: [
      {
        title: 'Suya Dayanıklı Kalın Buzdolabı Magnetleri ve Kapı Askıları',
        paragraphs: [
          'Halı yıkama firmalarının her evde görünür olmasını sağlayan en önemli tanıtım ürünü buzdolabı magnetleridir. 0.40 mm veya 0.50 mm kalın mıknatıs üzerine parlak selefon kaplamalı canlı baskılarımızla nemden ve sudan etkilenmeyen magnetler üretiyoruz.',
          'Ayrıca apartmanlarda doğrudan hedef kitleye ulaşmak için özel kesimli kapı kolu askılı broşürler tasarlayıp basıyoruz. Bu broşürler kapılarda rüzgarla düşmeyecek şekilde kavrayıcı özel delik sistemlidir.'
        ]
      },
      {
        title: 'Otokopili Sipariş ve Teslimat Fişleri',
        paragraphs: [
          'Halı ve koltuk teslim alırken müşteriye verilen profesyonel, kendinden karbonlu (otokopili) 2 veya 3 nüshalı sipariş fişleri firmalarınızın kurumsallık düzeyini gösterir. Numaratörlü fişlerle iş takibinizi kolaylaştırıyoruz.'
        ]
      }
    ],
    faqs: [
      { question: 'Halı yıkama magnetlerinde asgari sipariş adedi nedir?', answer: 'Bütçe dostu fiyat avantajından faydalanmanız için magnet siparişlerimiz asgari 1000 adetten başlamaktadır.' },
      { question: 'Kapı askılı broşürler için tasarım desteği veriyor musunuz?', answer: 'Evet, halı ve koltuk yıkama şablonlarımızdan dilediğinizi seçebilir, logonuzu ve iletişim bilgilerinizi ekibimizle tamamen ücretsiz paylaşarak tasarımınızı tamamlayabilirsiniz.' }
    ],
    internalLinks: [
      { text: 'Broşür Baskı Sayfası', path: '/brosur' },
      { text: 'Yırtılmaz Magnet Çözümleri', path: '/magnet' },
      { text: 'Emlakçı Kartvizit Çözümleri', path: '/emlakci-kartvizit' }
    ],
    offers: { lowPrice: '290', highPrice: '3800', count: '10' }
  },
  'fast-food-cips-kutusu': {
    path: '/fast-food-cips-kutusu',
    title: 'Fast Food Cips Kutusu | Çevre Dostu Logolu Karton Ambalajlar',
    metaDesc: 'Kafeler ve büfeler için sızdırmaz gıda cilalı, kolay katlanır kilitli taban, sıcak patates ve soğan halkası servis karton cips kutusu üretimi. Hemen sipariş verin.',
    h1: 'Büfe ve Restoranlara Özel Baskılı Karton Patates Cipsi Kutusu',
    tagline: 'Pratik Kurulumlu ve Sızdırmaz Yağ Bariyerli Hazır Ambalaj Çözümleri',
    intro: 'Müşterilerinizin sıcak patates cipslerini, soğan halkalarını veya atıştırmalıklarını dökülmeden keyifle tüketmesi için şık ve kullanışlı cips kutuları üretiyoruz. Mavi Basım olarak ön ve yan yüzeylerde logonuzun en canlı renklerle parlayacağı yüksek kaliteli karton ambalajlar sunuyoruz.',
    sections: [
      {
        title: 'Hızlı Servise Uygun Pratik Kilitli Taban',
        paragraphs: [
          'Fast-food mutfaklarında hız en kritik faktördür. Düz kırılmış katlar halinde teslim edilen kutularımız, kilitli taban dikey tasarımı sayesinde garson veya şefiniz tarafından saniyeler içersinde kurulup doldurulmaya hazır hale gelir. Depolamada yer kaplamaz.',
          'Ön taraftaki alçaltılmış kavis, müşterinin cipsi veya sosunu kolayca alabilmesine olanak tanıyarak üstün bir ergonomi sağlar.'
        ]
      },
      {
        title: 'Gıda Güvenliğine Uygun Su ve Yağ Mukavemeti',
        paragraphs: [
          'Karton içerisindeki bariyer cilası nemi ve kızartma yağını sızdırmaz. Bu sayede poşette veya el üstünde taşınırken leke kalıntıları bırakarak marka prestijini zedelemez.'
        ]
      }
    ],
    faqs: [
      { question: 'Minimum Cips Kutusu sipariş kotası nedir?', answer: 'Hazır bıçaklı şablonlarımızda minimum üretim limitimiz 1000 adettir. Özel ebatlar için adetlerin artırılması gerekebilir.' },
      { question: 'Markamızın logosu haricinde sosyal medya ikonları basılabiliyor mu?', answer: 'Tabii ki. Yan kulakçıklar veya arka kısımlara sosyal medya hesaplarınızı yerleştirebilir, akıllı QR kodları basarak müşterilerinizi web sitenize veya anketlerinize yönlendirebilirsiniz.' }
    ],
    internalLinks: [
      { text: 'Restoran Sipariş Fişi', path: '/restaurant-siparis-fisi' },
      { text: 'Giresun Cips Kutusu Baskı', path: '/giresun-fast-food-cips-kutusu-baski' },
      { text: 'Logolu Kafe Servis Kağıdı', path: '/amerikan-servis' }
    ],
    offers: { lowPrice: '520', highPrice: '3800', count: '10' }
  },
  'fast-food-kampanya-brosuru': {
    path: '/fast-food-kampanya-brosuru',
    title: 'Fast Food Kampanya Broşürü | Lokanta ve Büfe Menü Dağıtımları',
    metaDesc: 'Fast food büfeleri, dönerciler ve pizzacılar için cazip menü fiyatlarını, kampanya paketlerini duyuran el ilanı ve dağıtımlı katlamalı broşür baskısı.',
    h1: 'Fast Food ve Döner Salonları İçin Kampanya Broşürü Baskısı',
    tagline: 'İştah Açıcı Fotoğraflar ve Çekici Fiyat Kampanyalarıyla Siparişlerinizi Artırın',
    intro: 'Fast food büfelerinin, pizzacıların ve döner salonlarının popüler kova menülerini, indirimli pizza ve dürüm paketlerini tüm mahalleye duyurmada en hızlı sonuç veren yöntem kapılara ve posta kutularına dağıtılan kampanya broşürüdür. Mavi Basım olarak Topkapı tesislerimizde, pürüzsüz iştah açıcı renklerde ve bütçe dostu el ilanları ve el broşürleri üretiyoruz.',
    sections: [
      {
        title: 'Bütçe Dostu El İlanı ve Kampanyalar İçin 115 gr veya 135 gr Kuşe Ekonomisi',
        paragraphs: [
          'Masaüstü menüleri veya kapı dağıtım el ilanları gibi sık güncellenen kampanya dağıtımlarınız için en hesaplı model 115 gr parlak kuşe kağıttır. Binlerce adedi çok uygun bütçelerle basarak yüksek erişim gücü sağlar.',
          'Yemek fotoğraflarının netliği, sosların canlı kırmızısı ve patateslerin altın sarısının kusursuzluğu için Heidelberg makinelerimizde en hassas CMYK döküm kalitesini vaat ediyoruz.'
        ]
      },
      {
        title: 'Zenginlik Veren Özel Kırım ve Katlama Tasarımları',
        paragraphs: [
          'Sadece basit bir el ilanı değil, zengin içerikli bir paket listesi sunmak isterseniz, kırım kapağı bulunan 2 veya 3 katlamalı şablonları tercih edebilirsiniz. Bu modeller, müşteride bir ürün kataloğu etkisi uyandırarak marka prestijini yükseltir.'
        ]
      }
    ],
    faqs: [
      { question: 'Yemek fotoğraflarında renk sapmalarının önüne nasıl geçersiniz?', answer: 'Profil kartelamızı Heidelberg ofset makinelerimize uyarlayarak ekranda gördüğünüz iştah açıcı tonlarla kağıttaki tonların birebir örtüşmesini sağlıyoruz.' },
      { question: 'Kampanya broşürlerinin basım ve kargo süresi nedir?', answer: 'Onaylanan restoran el ilanları ortalama 4-5 iş gününde basılır ve sargılı korumalı ambalajlarla adresinize sevk edilir.' }
    ],
    internalLinks: [
      { text: 'Kutulama Çözümlerimiz', path: '/gebze-kutu-baski' },
      { text: 'Fast Food Cips Kutusu', path: '/fast-food-cips-kutusu' },
      { text: 'El İlanı Baskısı', path: '/el-ilani' }
    ],
    offers: { lowPrice: '580', highPrice: '3700', count: '12' }
  },
  'lokanta-amerikan-servis': {
    path: '/lokanta-amerikan-servis',
    title: 'Lokanta Amerikan Servis Baskı | Kağıt Masa Örtüsü',
    metaDesc: 'Restoran ve lokantalar için tek kullanımlık, gıda onaylı biyolojik boyalı, 80 gr 1. hamur veya şık kraft kağıda logolu amerikan servis basımı. En ucuz fiyatlar.',
    h1: 'Lokantalar ve Kebapçılar İçin Logolu Amerikan Servis Baskısı',
    tagline: 'Masalarınızda Hijyeni ve Markanızın Gücünü Birleştiren Şık Sunumlar',
    intro: 'Lokanta ve restoranlarda müşterinin önüne ilk serilen nesne kağıt amerikan servistir. Mavi Basım olarak, masalarınızı hem şık koruyan hem de sipariş esnasında göz dolduran gıda uyumlu, yüksek kaliteli tek kullanımlık amerikan servis imalatını doğrudan fabrikamızdan sağlıyoruz.',
    sections: [
      {
        title: 'Kağıt Türü Seçimi: 1. Hamur ve Kraft Dokusu',
        paragraphs: [
          'Amerikan servis baskılarımızda yaygın olarak tercih edilen 80 gr 1. sınıf hamur kağıt, mürekkebi mükemmel emerek üzerinde parlamayan mat ve net bir görünüm verir. Isıyı ve yoğuşmaları önler.',
          'Retro veya organik bir konsept planlayan gurme lokantalarımız için ise yırtılmaya yüksek mukavemet gösteren şık kahverengi Kraft esmer kağıtları öneriyoruz. Masanıza samimi ve doğal bir hava kazandırır.'
        ]
      },
      {
        title: 'Masaüstü Reklamcılığı ve Markalama Değeri',
        paragraphs: [
          'Amerikan servis sadece bir örtü değil; sipariş beklerken incelenen dinamik bir ilandır. Sosyal medya hesaplarınızı, paket numaralarınızı veya şube adreslerinizi masada oturan misafirinize pürüzsüzce ulaştırır.'
        ]
      }
    ],
    faqs: [
      { question: 'Ürünlerin gıdayla temasında herhangi bir sakınca var mıdır?', answer: 'Ürünlerimiz matbaa standartlarına uygun, kokusuz ve hijyenik mürekkeplerle basılmaktadır.' },
      { question: 'Amerikan servis ebat seçenekleriniz nelerdir?', answer: 'En yaygın kullanılan standart ebatımız pratik yerleşim sunan 35x50 cm boyutudur.' }
    ],
    internalLinks: [
      { text: 'Amerikan Servis Sayfası', path: '/amerikan-servis' },
      { text: 'Rize Lokanta Amerikan Servis', path: '/rize-lokanta-amerikan-servis' },
      { text: 'Kafe Menü Çözümleri', path: '/sektor/kafe-menu-baski' }
    ],
    offers: { lowPrice: '420', highPrice: '3200', count: '10' }
  },
  'restaurant-siparis-fisi': {
    path: '/restaurant-siparis-fisi',
    title: 'Restoran Sipariş Fişi Baskı | Otokopili Numaratörlü Fişler',
    metaDesc: 'Restoranlar ve lokantalar için 2 veya 3 nüshalı, numaratörlü, kendinden karbonlu (otokopili) şık porsiyon ve hesap sipariş fişi baskısı. En ucuz fiyatlı imalat.',
    h1: 'Lokantalar ve Restoranlar İçin Logolu Sipariş Fişi Baskısı',
    tagline: 'Masa ve Paket Servis Takibini Kolaylaştıran Kendinden Karbonlu Nüshalar',
    intro: 'Restoran, kafe ve paket servis işletmelerinde sipariş karışıklıklarını önleyen ve mali takibi hızlandıran en önemli evrak sipariş fişidir. Mavi Basım olarak kurumsal logolu, numaratörlü, ciltli ve kolay kopan kendinden karbonlu otokopili sipariş fişlerini üretip kapınıza sevk ediyoruz.',
    sections: [
      {
        title: 'Otokopili (Kendinden Karbonlu) Mukavemetli Kağıt',
        paragraphs: [
          'Üst sayfaya tükenmez kalemle yazıldığında alt nüshalara yazıyı pürüzsüzce geçiren yüksek kaliteli otokopi kağıdı kullanıyoruz. Bu sayede karbon kağıdı koyma zahmetinden kurtulursunuz.',
          'Düzgün kırım ve üstten tutkallı ciltleme yapımız sayesinde koçandan sayfaları koparırken yırtılma yaşanmaz, arşiv nüshası koçanda sağlam kalarak saklanır.'
        ]
      },
      {
        title: 'Takip Kolaylığı Sağlayan Numaratör Sistemi',
        paragraphs: [
          'Siparişlerinizin kaybolmasını önlemek ve günlük ciro hesaplarınızı sıfır hata ile tutmak için her fiş dikeyine benzersiz kırmızı numaratör baskısı uyguluyoruz. This sayede muhasebe ve mutfak takibi sorunsuz işler.'
        ]
      }
    ],
    faqs: [
      { question: 'Sipariş fişleri kaç nüshalı üretilebiliyor?', answer: 'İhtiyacınıza göre 1 asıl 1 suret (2 nüsha) veya 1 asıl 2 suret (3 nüsha) şeklinde sipariş verebilirsiniz.' },
      { question: 'Koçan içi sayfa sayısı ve ciltleme nasıldır?', answer: 'Standart olarak her koçan içerisinde 50 takım sipariş seti (toplam 100 veya 150 yaprak) bulunur, üstten dikişli veya tutkallıdır.' }
    ],
    internalLinks: [
      { text: 'Amerikan Servis Baskı', path: '/amerikan-servis' },
      { text: 'Afiş Baskı Çözümleri', path: '/sektor/restoran-brosur-baski' },
      { text: 'Giresun Kartvizit Baskı', path: '/giresun-kartvizit-baski' }
    ],
    offers: { lowPrice: '140', highPrice: '2200', count: '10' }
  }
};

// Şehir bazlı dynamic landing page generator
const CITIES_METADATA: Record<string, {
  name: string;
  districts: string;
  specialty: string;
  shipping: string;
}> = {
  ankara: {
    name: 'Ankara',
    districts: 'Çankaya, Yenimahalle, Keçiören, Kızılay, Ostim, Tunalı Hilmi ve Sincan',
    specialty: 'kamu kurumları, sivil toplum kuruluşları, Ostim sanayi siteleri, avukatlık ofisleri ve Çankaya’daki elit işletmeler',
    shipping: 'İstanbul-Ankara otoyol ve kargo aktarma merkezi entegrasyonu sayesinde onaylanan siparişleriniz 24 ila 48 saat içerisinde adresinize teslim edilir.'
  },
  izmir: {
    name: 'İzmir',
    districts: 'Alsancak, Karşıyaka, Bornova, Konak, Çeşme, Buca, Karşıyaka ve Gaziemir',
    specialty: 'Ege’nin kalbi İzmir’deki restoran zincirleri, butik kafeler, zeytinyağı üreticileri, şaraphaneler, kuaförler ve turizm acenteleri',
    shipping: 'Topkapı üretim tesisimizden çıkan koliler İzmir Alsancak ve tüm ilçelerine 24-48 saatte ekspres kargo ile ulaştırılmaktadır.'
  },
  bursa: {
    name: 'Bursa',
    districts: 'Nilüfer, Osmangazi, Yıldırım, İnegöl, Mudanya ve Gemlik',
    specialty: 'tekstil fabrikaları, otomotiv yan sanayi kuruluşları, İnegöl mobilya imalatçıları ve zengin yerel gıda üreticileri',
    shipping: 'İstanbul-Bursa otoyol ve köprü bağlantısının sağladığı lojistik hız ile siparişleriniz 24 saatte adresinize sevk edilir.'
  },
  konya: {
    name: 'Konya',
    districts: 'Selçuklu, Meram, Karatay ve Konya Organize Sanayi Bölgesi',
    specialty: 'tarım endüstrisi, makine üreticileri, un ve gıda fabrikaları ile Konya genelindeki kurumsal ticaret şirketleri',
    shipping: 'Konya lojistik aktarma merkezi üzerinden, en geç 48 saatte kapınızda olacak şekilde sigortalı ambalajlı gönderim yapılmaktadır.'
  },
  antalya: {
    name: 'Antalya',
    districts: 'Muratpaşa, Konyaaltı, Alanya, Manavgat, Belek, Kemer ve Kepez',
    specialty: 'lüks oteller, tatil köyleri, seyahat acenteleri, balık restoranları ve Antalya emlak ofisleri',
    shipping: 'Güney lojistik aktarma hattımız vasıtasıyla, 24 ila 48 saat aralığında Antalya kapınıza teslimat garantisi sunulmaktadır.'
  },
  adana: {
    name: 'Adana',
    districts: 'Seyhan, Çukurova, Yüreğir, Sarıçam ve Adana Organize Sanayi',
    specialty: 'Çukurova’nın can damarı olan restoranlar, gıda işletmeleri, tarım sanayicileri ve yerel giyim markaları',
    shipping: 'Ezilmeye dayanıklı çift dalga kalın Kraft koliler içinde, Adana adresinize 48 saatte güvenle sevk edilmektedir.'
  },
  gaziantep: {
    name: 'Gaziantep',
    districts: 'Şahinbey, Şehitkamil, Nizip ve Gaziantep Organize Sanayi Bölgesi',
    specialty: 'meşhur fıstık imalatçıları, baklava ve tatlı salonları, kuruyemiş üreticileri ve sanayi kuruluşları',
    shipping: 'Özel gıda korumalı ve koku yapmayan ambalaj dökümleriyle hazırlanan siparişler Gaziantep adresinize hasarsız ulaştırılır.'
  },
  samsun: {
    name: 'Samsun',
    districts: 'Atakum, İlkadım, Canik, Bafra, Çarşamba ve Vezirköprü',
    specialty: 'Bafra pidesi salonları, yerel medikal ve cerrahi alet üreticileri, eczaneler ve Karadeniz lojistik firmaları',
    shipping: 'Samsun Atakum ve ilçelerine, Karadeniz hızlı lojistik hattı ile 48 saatte doğrudan adrese teslimat yapılmaktadır.'
  },
  trabzon: {
    name: 'Trabzon',
    districts: 'Ortahisar, Akçaabat, Uzungöl, Yomra, Arsin ve Beşikdüzü',
    specialty: 'Uzungöl otelleri, yayla turizmi acenteleri, Akçaabat köftecileri, çay imalathaneleri ve yerel balıkçılık kuruluşları',
    shipping: 'Trabzon Ortahisar ve tüm çevre ilçelere, neme dayanıklı ambalaj korumalı koliler 48-72 saatte teslim edilmektedir.'
  },
  kayseri: {
    name: 'Kayseri',
    districts: 'Melikgazi, Kocasinan, Talas ve Kayseri Organize Sanayi Bölgesi',
    specialty: 'mobilya sanayi tesisleri, sucuk ve pastırma imalatçıları, emlak acenteleri ve İç Anadolu yerel esnafları',
    shipping: 'Kayseri OSB ve merkezi semtlere, İç Anadolu lojistik koridorumuz üzerinden en geç 48 saatte kargo teslimi yapılmaktadır.'
  }
};

const PRODUCTS_METADATA: Record<string, {
  name: string;
  tagline: string;
  desc: string;
  spec: string;
  lowPrice: string;
  highPrice: string;
}> = {
  'kartvizit': {
    name: 'Kartvizit Baskı',
    tagline: 'İlk Tanışmada Akılda Kalan Kabartma Laklı ve Sıvamalı Prestij Kartlar',
    desc: 'İşletmenizin kurumsal itibarını yansıtan 350 gr kuşe kağıt üzeri mat selefonlu, kısmi kabartma laklı (Spot UV), altın/gümüş yaldızlı veya 700 gr çift kat sıvamalı lüks kartvizitler.',
    spec: '350 Gr Kalın Bristol veya 700 Gr Çift Kat Sıvama, Mat Kadife Selefon, Kısmi Kabartma Lak Seçenekleri.',
    lowPrice: '380',
    highPrice: '2900'
  },
  'brosur': {
    name: 'Broşür Baskı',
    tagline: 'İndirim Kampanyalarınızı ve Menülerinizi Duyuran Canlı Ofset Broşürler',
    desc: 'Müşterilerinizin poşetlerine yerleştireceğiniz, elden veya posta kutularına dağıtacağınız 115 gr veya 130 gr parlak kuşe kağıda basılan A5, A4 katlamalı (kırımlı) tanıtım broşürleri.',
    spec: '115 Gr / 130 Gr Parlak Kuşe Kağıt, Çift Yön CMYK Baskı, C-Kırım veya Akordeon Katlama.',
    lowPrice: '620',
    highPrice: '4800'
  },
  'katalog': {
    name: 'Katalog Baskı',
    tagline: 'Ürünlerinizi ve Portföyünüzü Sergileyen Lüks Ciltli Tanıtım Kitapçıkları',
    desc: 'Firmanızın tüm portföyünü, ürün gruplarını ve teknik detaylarını yüksek çözünürlükte (300 DPI) gösteren, Amerikan ciltli, iplik dikişli veya tel spiral tutturmalı lüks kataloglar.',
    spec: '115-130 Gr Kuşe İç Sayfalar, 250-350 Gr Bristol Kapak, Mat Selefon Kaplama, Amerikan Cilt veya Tel Spiral Ciltleme.',
    lowPrice: '1500',
    highPrice: '18500'
  },
  'etiket': {
    name: 'Etiket Baskı',
    tagline: 'Şişelerden ve Paketlerden Sökülmeyen Suya Dayanıklı Plastik PP Opak Etiketler',
    desc: 'Gıda, kozmetik, deterjan veya cam şişe yüzeyleri için neme, suya ve güneşe dayanıklı PP Opak plastik yapışkanlı etiketler ile ekonomik kağıt bazlı kuşe tabaka yapışkanlı sticker modelleri.',
    spec: 'PP Opak Plastik veya Kuşe Yapışkanlı Kağıt, Parlak Selefon Kaplama, Dijital Optik Lazer Yarım Kesim.',
    lowPrice: '320',
    highPrice: '3800'
  },
  'kutu': {
    name: 'Kutu Baskı',
    tagline: 'Gıda Onaylı Koku Yapmayan Lüks Karton Ambalaj ve Kutu İmalatı',
    desc: 'Pastane, e-ticaret, gıda ve kozmetik markaları için iç yüzeyi sedef koruyuculu, yağı sızdırmayan gıda temas onaylı kilitli taban veya asetat pencereli lüks karton kutular.',
    spec: 'Amerikan Bristol veya Kromo Karton, Gıda Temas Onaylı Bitkisel Boya, İç Sedef Laminasyon Bariyeri.',
    lowPrice: '1200',
    highPrice: '14000'
  },
  'magnet': {
    name: 'Magnet Baskı',
    tagline: 'Buzdolaplarında Yıllarca Kalan Güçlü Çekimli Mıknatıslı Reklam Magnetleri',
    desc: 'Restoranlar, sucular ve kurumsal firmalar için 0.50 mm dökülmeyen ithal manyetik levha üzerine sıvanan, selefonlu, dikey veya özel kesim bıçaklı dolap magnetleri.',
    spec: '0.50 mm Dayanıklı Magnet Mıknatıs, Kuşe Sıvama, Koruyucu Selefon, Özel Kesim Bıçak.',
    lowPrice: '480',
    highPrice: '2600'
  }
};

// Şehir + Ürün Sayfalarını Oluştur (City-Product pages)
Object.keys(CITIES_METADATA).forEach(citySlug => {
  const city = CITIES_METADATA[citySlug];
  
  Object.keys(PRODUCTS_METADATA).forEach(prodSlug => {
    const prod = PRODUCTS_METADATA[prodSlug];
    const pageKey = `${citySlug}-${prodSlug}-baski`;
    
    // Eğer bu anahtar zaten elle tanımlanmışsa ezme
    if (SEO_PAGES_DATA[pageKey]) return;
    
    SEO_PAGES_DATA[pageKey] = {
      path: `/${pageKey}`,
      title: `${city.name} ${prod.name} Fiyatları | ${city.name} Online Matbaa`,
      metaDesc: `${city.name} genelindeki esnaflar, şirketler ve kurumlar için avantajlı ${prod.name} baskı fiyatları. 1. Sınıf malzeme ve kaliteli ofset basımıyla kapınıza hızlı teslim!`,
      h1: `${city.name} ${prod.name}`,
      tagline: `${prod.tagline}`,
      intro: `${city.name} ve çevresindeki işletmeler için marka kalitesini yükselten en doğru ${prod.name} çözümlerini sunuyoruz. ${prod.desc} Topkapı’daki hizmet ve koordinasyon merkezimizden ${city.name} ilçelerine avantajlı birim maliyetlerle sevk sağlıyoruz.`,
      sections: [
        {
          title: `${city.name}’de Sektörünüze Özel ${prod.name} Kullanım Avantajları`,
          paragraphs: [
            `${city.name} içindeki ${city.districts} semtlerindeki esnafların, özellikle ${city.specialty} grubunun sıklıkla sipariş ettiği ${prod.name} modelleri, şirketinizin kalitesini ortaya koyar.`,
            `${prod.spec} Kaliteli ofset teknolojisiyle yaptığımız basımlarda net görüntü kalitesi ve renk uyumu hedeflenmektedir.`
          ]
        },
        {
          title: "Hızlı Sevkiyat ve Güvenli Kargo",
          paragraphs: [
            `Mavi Basım Online Matbaa sistemimiz sayesinde ${city.name} esnafına şeffaf fiyat politikasıyla avantajlı ${prod.name} hizmeti sunuyoruz.`,
            `${city.shipping}`
          ]
        }
      ],
      faqs: [
        {
          question: `${city.name}’ye ${prod.name} teslimatı kaç gün sürmektedir?`,
          answer: `Ürün onayınızdan sonra ortalama 2-3 iş gününde basılan ${prod.name} kolileriniz kargo entegrasyonu ile kapınıza teslim edilir.`
        },
        {
          question: `Minimum kaç adet ${prod.name} siparişi verebilirim?`,
          answer: `Avantajlı birim maliyetleri korumak adına ${prod.name} siparişleri standart paketler halinde üretilmektedir.`
        }
      ],
      internalLinks: [
        { text: `${city.name} Matbaa Hizmetleri`, path: `/${citySlug}-matbaa` },
        { text: `${prod.name} Ürün Detayı`, path: `/${prodSlug}` }
      ],
      offers: { lowPrice: prod.lowPrice, highPrice: prod.highPrice, count: '10' }
    };
  });
});

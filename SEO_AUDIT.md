# Teknik SEO denetimi

## Düzeltme öncesi durum — 7 Ekim 2026

Yerel üretim sunucusunda 300 adresin hem HTTP yanıtı hem Chromium ile JavaScript çalıştıktan sonraki hali incelendi. Sayfa bazındaki kayıtlar `reports/seo-before.csv`, ayrıntılı etiketler ve şemalar `reports/seo-before.json` içindedir. Envanter; sitemap, açık uygulama yolları, 81 şehir, 54 blog yazısı ve sektör/ürün verilerindeki yolların birleşimidir. Bu gruplar örtüşür; sayıları toplanarak toplam sayfa sayısı çıkarılmamalıdır. Sitemap 287 URL içeriyor. Hiçbir adresin taraması eksik kalmadı.

### Kanıtlanmış teknik hatalar

- Mevcut `/kullanim-sartlari`, `/gizlilik-politikasi`, `/cerez-politikasi`, `/mesafeli-satis-sozlesmesi`, `/iptal-ve-iade-sartlari` sayfaları HTTP 404 ve `noindex` alıyor. Tarayıcıda gerçek içerikleri açılıyor. `AppRoutes` bu sayfaları tanımladığı halde `isKnownRoute` sunucu listesi bunları dışlıyor.
- `/bloknot` HTTP 200, `/teslimat-ve-iade` HTTP 404 dönüyor; uygulamanın açık `Navigate` tanımlarında hedefler sırasıyla `/bloknotlar` ve `/teslimat-sartlari`. Sunucu yönlendirme tablosu bu iki açık hedefi içermiyor.
- Tarayıcıda 278 adreste birden fazla title ve description; 280 adreste birden fazla canonical var. Sunucu etiketleri ile React 19'un yerel metadata eklemesi birlikte kalıyor. Bazı sayfalarda genel canonical ve sayfanın kendi canonical etiketi de aynı anda üretiliyor. Örneğin ana sayfa ve İstanbul sayfasının ilk HTML başlıkları ile bileşendeki başlıkları farklı; bunlar farklı sahiplerin çakışmasıdır.
- Ana sayfanın ilk HTTP HTML'inde aynı JSON-LD kayıtları iki kez var. Üretim sunucusu zaten önceden hazırlanmış ana sayfayı şablon olarak kullanıp aynı şemaları tekrar ekliyor. Bilinmeyen/yasal yolların fallback yanıtlarında da ana sayfanın gövdesi ve şemaları kalıyor.

### Gözlenen eksikler ve inceleme gerektiren bulgular

- 147 normal sayfanın ilk HTML'inde H1 yok; tarayıcıda JavaScript çalışınca H1 var. Şehir ve blog sayfalarının bir bölümü boş uygulama köküyle geliyor. Bu, başlangıç HTML'inin içerik bakımından eksik olduğunu kanıtlar; Google'ın bu sayfaları indekslemediğini kanıtlamaz.
- Tarayıcıda 131 adreste birden fazla BreadcrumbList ve 8 adreste tekrarlanan şema kimliği görüldü. Birden fazla şema türü veya breadcrumb tek başına hata değildir. Aynı üreticinin birebir kopyaları ile farklı geçerli yollar/kurumsal kayıtlar ayrılmalıdır; ticari değerler tahmin edilerek birleştirilmemelidir.
- Başlık/açıklama uzunluğu kuralları editoryal öneridir; önerilen karakter sayısının aşılması tek başına kanıtlanmış sıralama hatası değildir. Yeni ticari metin veya anahtar kelime stratejisi üretilmedi.
- Önceki `validate:metadata` statik sayfaların tümünü kapsamıyor. `validate:content` gerçek sayfa metinleri yerine sentetik şablonları karşılaştırıyor. Bu testlerin geçmesi tüm sitenin benzersiz ve doğru olduğu anlamına gelmez. Bu denetim gerçek HTTP ve tarayıcı HTML'ini ayrı ayrı kaydeder.

### Bilinmeyenler ve kapsam sınırları

- Google Search Console verisi yok. Google indeks durumu, sıralamalar, anahtar kelime performansı, gösterimler veya tıklamalar hakkında çıkarım yapılmadı.
- Canlı `mavibasim.com` erişimi ortamın ağ filtresince engellendi. Bulgular yerel üretim derlemesine aittir; canlı site hakkında doğrulanmış sonuç değildir. Dış iletişim/Street View görseli de canlı kaynaktan doğrulanamadı.
- `/reklam-urunleri` ve PDF fiyat listesi bağlantısının doğru hedefi kanıtlanamadı. Kullanıcı talimatı gereği bu bağlantılar korunuyor; fiyat listesi silinmiyor.
- Ürün fiyatları, özellikleri, teslimat/işletme vaatleri ve ticari bilgiler bu denetimde değiştirilmez. Şema tarihlerinin gerçek güncelleme tarihini yansıtıp yansıtmadığı için yayın geçmişi gerekir.
- Hiçbir değişiklik GitHub'a gönderilmez veya canlı siteye dağıtılmaz.

## Düzeltmeler ve kontrol sonuçları

1. Beş yasal yol sunucunun bilinen sayfa listesine eklendi. Başlık ve açıklamaları kendi mevcut bileşenlerinden aynen alındı. Her biri artık HTTP 200 ve `index, follow` dönüyor. `/bloknot` ve `/teslimat-ve-iade`, uygulamada zaten açıkça tanımlı hedeflerine sunucudan 301 dönüyor. Tip kontrolü, derleme, hedefli HTTP kontrolü ve `validate:http` çalıştırıldı.
2. React 19 ile sunucu etiketlerinin çakışması giderildi. `PageHead` ve `HeadRegistry`, mevcut Helmet tanımlarını tek bir etiket kümesine uygular; sayfanın kendi tanımı genel canonical tanımından önceliklidir. Bileşenlerde yalnızca metadata yöneticisi importları değişti. İlk açılışta mevcut sunucu metadata bilgisi kullanılır; uygulama içi gezinmede aynı sayfanın HTML'i yerelden okunarak fallback metadata güncellenir. Yeni başlık veya ticari açıklama yazılmadı. Tip kontrolü, lint, derleme, örnek sayfa taraması ve etkileşim kontrolleri geçti.
3. Üretim ön hazırlaması, gerçek sayfa bileşenlerini sunucuda bekleyerek işler. Şehir, blog ve diğer sayfaların gerçek H1 ve içeriği ilk HTML'e gelir; başlık/açıklama da bileşendeki mevcut değerlerle eşleşir. 293 normal sayfa hazırlanır. Bu üretim derlemesi davranışıdır; geliştirme sunucusunda sayfa gövdesi hâlâ istemcide oluşturulabilir. Geçici sunucu render paketi derlemenin sonunda silinir.
4. Ana sayfanın hazırlanmış HTML'i tekrar SEO eklenen genel şablon olarak kullanılmıyor. Ana sayfa doğrudan kendi dosyasından; bulunamayan yollar boş, temiz şablondan sunulur. Böylece ana sayfanın ilk yanıttaki çift şemaları ve 404 yanıtlarına ana sayfa içeriği karışması giderildi. Dört geçersiz adresin HTTP 404/noindex ve tarayıcı 404 ekranı kontrolü geçti.
5. Cepli dosya sayfasının eski `data-rh` temizliği yeni metadata etiketlerini siliyordu. Bu ikinci temizleyici kaldırıldı; etiketlerin tek sahibi ortak yöneticidir. `/dosyalar` dahil doğrudan açılış ve uygulama içi gezinme kontrolleri geçti.
6. Ek incelemede `/siparis-fisi-baski-fiyatlari` sayfasının mevcut kodda `/siparis-fisi` ile aynı içeriğe ve açık canonical hedefine sahip olduğu doğrulandı (`Makbuz.tsx`, `pathId` eşlemesi). Sayfa, fiyatları ve bağlantıları korundu. Yalnızca canonical olmayan kopyanın sitemap kaydı çıkarıldı; üretici listesinden de çıkarılarak tekrar eklenmesi önlendi. Diğer tarihler/URL'ler değiştirilmedi. Sitemap artık 286 URL içeriyor; kontrol ve derleme geçti.

### Sonuçların kapsamı

Son sayfa bazındaki döküm `reports/seo-after.csv`, ayrıntılar `reports/seo-after.json` dosyasındadır. `npm run validate:seo` bütün envanteri tekrar HTTP ve Chromium ile denetler. Bu test birden fazla breadcrumb veya tekrarlanan şema kimliğini inceleme işareti olarak kaydeder; bunları otomatik olarak Google hatası saymaz. Yanlış durum kodu, eksik/çoklu title-description-canonical, yanlış canonical hedefi, noindex, eksik/çoklu H1, bozuk JSON-LD veya sunucu/tarayıcı başlık-açıklama farkı testin başarısız olmasına neden olur. Sitemap içinde bilinen canonical kopyası da başarısız sayılır.

- İlk tamamlanan düzeltme sonrası tarama: 300/300 adres, eksik tarama yok; 293 HTTP 200 ve 7 HTTP 301. Normal sayfaların ilk HTML ve tarayıcı görünümünde birer title, description, canonical ve H1 var. Başlık ve açıklamalar iki aşamada aynı. Son sitemap düzeltmesi sonrası tarama da 300/300 tamamlandı ve aynı kontroller geçti; sitemap 286 URL içeriyor.
- `validate:http`: 32/32 hedef ve mevcut ayrıntılı görsel/schema kontrolleri geçti. Test beklentileri sunucudaki eski genel metin yerine depoda zaten bulunan gerçek sayfa başlıklarına eşitlendi; ürün/sayfa metinleri değiştirilmedi.
- `validate:seo-navigation`: 10 uygulama içi yol geçişi (404'ten ürüne dönüş dahil) ve gerçek alt menü bağlantısı geçti; çalışırken uygulama hatası yok. Etiketler tekil ve doğrudan HTTP yanıtıyla tutarlı.
- `validate:technical`: sepet/sipariş URL'si, mobil menü, dört genişlikte katalog taşması, altı e-ticaret görseli, noktalı blog adresi ve düzeltilmiş ürün bağlantıları geçti. Test dışarıya sipariş/mesaj göndermedi.
- `validate:routes`: 287/287; `validate:invalid`: 4/4; kontrollü bozukluk testleri: 25/25 hata yakalandı. Tip kontrolü ve derleme geçti. Lint: 0 hata, mevcut 407 uyarı (247 kullanılmayan değişken, 143 `any`, 16 React export, 1 effect bağımlılığı). Toplu otomatik düzeltme yapılmadı.

### Kalan inceleme ve doğrulanamayan bilgiler

- 131 adreste birden fazla tarayıcı BreadcrumbList var. `/el-ilani` ilk HTML'inde aynı yolun kök URL'si slashlı/slashsız iki gösterimi var; iki URL eşdeğerdir. Birden fazla geçerli breadcrumb tek başına SEO geçersizliği değildir. Ticari değerleri korumak için farklı şema kayıtları topluca birleştirilmedi.
- Ana sayfada aynı işletme/site kimliği için farklı ayrıntı düzeyinde tanımlar bulunuyor. İşletme adresi ve telefon numarası eşleşiyor; telefon biçimi ve site adı gösterimi farklı. Kimliğin tekrarı tek başına kanıtlanmış geçersizlik değildir; marka adlarının tekleştirilmesi içerik kararı gerektirir. İlk HTTP yanıtındaki birebir çift üretim ise düzeltildi.
- 10 sayfanın ilk HTML'inde JSON-LD yok: `/blog`, `/cilt-isleri`, `/grafik-tasarim`, `/hakkimizda`, `/iletisim`, `/kitap-ayraci`, `/makbuz-ve-formlar`, `/matbaa`, `/referanslar`, `/sikca-sorulan`. JSON-LD zorunlu değildir; uygun şema ve doğrulanmış bilgilerle geliştirme fırsatıdır. Eksik veri uydurularak şema eklenmedi.
- 108 normal sayfanın başlığı 60 karakterden uzun; 252 açıklama 155–160 aralığının dışında. Bunlar editoryal öneri sınırlarıdır, kanıtlanmış teknik indeksleme hatası değildir. Mevcut fiyat/ürün/ticari ifadeler korunarak sonraki içerik çalışmasında değerlendirilebilir.
- 59 benzersiz Open Graph görsel hedefinin tamamı yerelde HTTP 200 döndü. Normal sayfalardaki görsellerde `alt` özniteliği eksik değil. Bu, açıklamaların içeriğe uygunluğunu veya görsellerin Google'daki performansını kanıtlamaz.
- Blog görsel şemalarında `license: https://mavibasim.com/lisans` var; yerel HTTP kontrolü bu adresin 404 döndüğünü doğruladı. Mevcut bir lisans sayfası veya onaylı lisans URL'si bulunmadı. Lisansın gerçek adresi ve kullanım koşulları işletmeden doğrulanmadan lisans iddiası/adresi değiştirilmedi.
- Sitemap `lastmod` tarihleri ile makale yayın/güncelleme tarihleri için güvenilir yayın geçmişi yok. Tarihler tahmin edilmedi; sitemap'teki diğer tarihler korundu.
- `/reklam-urunleri` ve `/Mavi-Basim-Fiyat-Listesi.pdf` hedefleri değişmedi. Doğru hedef ve gerçek PDF dosyası için işletmenin onaylı adresi/dosyası gerekir.
- Canlı alan adı bu turda tekrar denendi: ortam proxy'si CONNECT 403 verdi. Canlı site ve dış iletişim görseli doğrulanamadı. Search Console verisi yok; sıralama/anahtar kelime sonuçları raporlanmadı.
- Git değişiklikleri yerel çalışma alanındadır; commit, GitHub gönderimi veya canlı dağıtım yapılmadı. Önceki teknik denetimin değişiklikleri korundu.

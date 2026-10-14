# Cepli dosya — inceleme ve uygulama kaydı

## Ön inceleme

Geçici puan: 68/100. İlk HTML ve hydration 9/25; metadata/canonical 20/25; yapılandırılmış veri 14/20; tarama/bağlantılar 15/15; başlık/görsel/kullanım 10/15. Bu teknik inceleme puanıdır; Google sıralaması veya Lighthouse ölçümü değildir. Yapılmayan mobil/performance kontrolleri nedeniyle geçicidir.

Yalnız doğrulanmış sorunlar:

1. Soru12/16/53: ayrı statik SSR içerik kopyası mevcut React sayfasını eksik temsil ediyor; başlangıçta createRoot kullanılıyor. Sipariş, paketleme, tasarım, sektör ve ilişkili bağlantı bölümleri ilk HTML’de eksik.
2. Soru18/56: SSR paylaşım görseli cepli-dosya-tasarimi, bileşen görseli cepli-dosya-baski-fiyatlari. Metadata iki kaynaktan hazırlanıyor.
3. Soru49: ürün kategori sayfasındaki farklı gramaj/yön/kaplama/adet seçenekleri tek Product/AggregateOffer ile aynı ürünün teklifleri gibi işaretleniyor.
4. Soru10/44: görselde doğrulanamayan körük/lak/gramaj açıklamaları; turizm görselinde tek cep görünürken çift cep anlatımı var.
5. Soru58: paketleme ve teknik özellik H2 başlıklarından H4’e geçiliyor.
6. Soru28: tablo düğmesi ürün detayını açarken sipariş açıklaması doğrudan WhatsApp akışını anlatıyor.
7. Soru40: “sevkıyat” yazımı.

## Koruma nedeniyle müdahale edilmeyecek alan

Fiyat tablosunun ilk kolon başlığı boş; kategori kolonu için erişilebilir başlık yok. Mevcut tablo caption içermiyor. Koruma kuralı nedeniyle caption, th/scope, tablo HTML, sınıflar, fiyatlar, açıklama ve düğmeler değiştirilmedi. Bu tablo konuları çözüm kapsamına alınmadı. Model karşılaştırma tablosu da aynen korundu.

## ÇÖZÜM PROMPTU

Yalnız /dosyalar ve bu rotayı doğrudan etkileyen teknik kodu düzelt. Mevcut bileşeni değiştirmeden ilk HTML’de render et; fiyat tablosunu yeniden yazma. Hydration ile DOM’u koru. Metadata/schema sahipliğini tek kaynağa bağla, kategori Product/AggregateOffer işaretlemesini kaldır ve görünür SSS’yi şemayla aynı veri kaynağından üret. Galeri metinlerini görselde gösterilen içerikle eşleştir, başlık seviyelerini ve sipariş akışı açıklamasını düzelt. Tabloları, tarifeyi, adetleri, ölçüleri, teknik özellikleri ve teslimat bilgilerini koru. Build, ilk HTML, hydration, yenileme, rota geçişi, sipariş detayı ve tablo eşitliğini doğrula. Ortak kod için antetli/zarf regresyonunu çalıştır.

## Uygulanan değişiklikler

- Ayrı statik dosya sayfası kopyası yerine mevcut DosyalarPage build sırasında render ediliyor; browser hydration aynı bileşeni kullanıyor.
- Title/meta/H1 metinleri değiştirilmedi. Paylaşım görseli ve sosyal etiketler merkezi rota kaynağından üretiliyor.
- SSS verisi ortak dosyaya taşındı; aynı dokuz soru korunuyor. CMYK’nın birebir renk garantisi sayılmasını önleyen açıklama hem görünürde hem şemada aynı.
- Category Product/AggregateOffer kaldırıldı; breadcrumb ve görünür FAQPage korundu. Stok/sepet/online ödeme yapısı eklenmedi.
- Altı galeri görseli ve dosyaları korunup başlık/açıklama/alt metinleri görüntüde görülen içerikle eşleştirildi. Desteklenmeyen özelliklerden kaçınıldı.
- H4 atlamaları H3 ile düzeltildi. Sipariş açıklaması ürün detayı → WhatsApp akışıyla eşleştirildi; sevkiyat yazımı düzeltildi.

## Doğrulama

Typecheck ve üretim build/prerender; ilk HTML, doğrudan açılış, hydration, yenileme, ana sayfa/ürün geçişleri, tekil title/meta/canonical/sosyal etiketler, görünür FAQ/schema eşitliği ve sipariş detayının açılıp kapanması kontrol edildi. Antetli ve zarf rehberi regresyon kontrolleri çalıştırıldı. İç bağlantı ve sitemap kontrolleri çalıştırıldı.

Mevcut fiyat tablosu kaynağı karakter karakter korunuyor. Yeni ilk HTML’deki iki tablo önceki React bileşeninin çıktısıyla aynıdır:

- Fiyat tablo HTML SHA-256: ec3e1077ebf58703a1544d1f7ae17c48f53cbc186433b43c88569e2374e23596
- Model karşılaştırma SHA-256: 768a5ab308b75f9199937e7caaf17edd0c97c92f6eabc22cd202082b59e976dd

Gerçek tarayıcı mobil ekran, klavye görsel odak kontrolü ve Core Web Vitals ölçülmedi; DOM kontrolleri gerçek tarayıcı ölçümü olarak sunulmadı. Google seçili canonical, URL denetimi ve Rich Results Test oturum sonucu alınmadı. Fiyat tablosu koruması yüzünden kalan erişilebilirlik sınırlamaları yukarıda açıklandı.

## Kategori başlığı — özel kullanıcı onayı

14 Ekim 2026: Kullanıcı, fiyat tablosunun boş kategori başlığının düzeltilmesine açıkça onay verdi. Yalnız ilk th hücresine aria-label="Kategori" ve scope="col" eklendi. Görünür metin, sınıflar, stiller ve tablo ölçüleri korunuyor. Fiyatlar, veriler, açıklamalar, sıra ve düğmeler değişmedi; caption eklenmedi. Önceki koruma kuralının bu başlık hücresiyle ilgili kısmına verilen özel izin esas alındı.

Doğrulama, yeni izinli iki niteliği çıkardıktan sonra tablonun önceki SHA-256 değeriyle aynı olduğunu kontrol ediyor. Model karşılaştırma tablosu da aynı hash ile korunuyor.

## Planner ve GSC analizi sonrası içerik uygulaması — 15 Ekim 2026

Kullanıcının uygulama onayıyla yalnız `/dosyalar` sayfasının doğrulanmış bilgi eksikleri tamamlandı:

- Mevcut teknik özellikler bölümüne A4 evrak uyumu, açık/kapalı ölçü ayrımı, cep alanı ve belge adedini sipariş öncesinde netleştirme açıklaması eklendi. Ürünün doğrulanmış net ölçüleri kaynakta bulunmadığı için cm değeri, evrak kapasitesi veya A4 uyum garantisi yazılmadı.
- Mevcut tasarım bölümüne galeri örneklerini değerlendirme, hazır baskı dosyası veya yalnız logo/firma bilgileriyle başvuru ayrımı eklendi.
- Bıçak izi, kesim/katlama/cep yerleşimi, güvenli alan ve baskı öncesi onay açıklaması eklendi. Model şablonunun sipariş öncesinde netleştirilmesi istendi; ücretsiz indirilebilir şablon veya yeni hizmet vaadi eklenmedi.
- Tasarım bölümünden mevcut `/blog/cmyk-ofset-baski-ve-tasima-payi-rehberi` yazısına bağlamsal bağlantı eklendi.
- Belgelerle ilgili mevcut SSS cevabı A4 kullanım kontrolüyle genişletildi; bıçak izi hakkında bir yeni soru eklendi. Görünür SSS ile JSON-LD aynı ortak veri kaynağını kullanıyor; toplam 10 soru.

Toplam: iki H3, altı açıklama paragrafı, bir mevcut SSS cevabına ek, bir yeni SSS ve bir bağlamsal bağlantı. Fiyat ve model karşılaştırma tabloları, adetler, teslimat metinleri, title/meta/H1, galeri dosyaları ve diğer ürün içerikleri korunuyor. Yeni sayfa/blog açılmadı; GSC kapsam farkı site metni değiştirilerek çözüldü sayılmadı.

Doğrulama: TypeScript ve değişen içerik dosyalarının ESLint kontrolü başarılı. Vite build, 294 URL için prerender ve sunucu build başarılı. Mevcut JSDOM/HTTP denetimi; doğrudan açılış, yenileme, hydration sırasında içerik ve fiyat tablosu düğümünün korunması, sayfalar arası geçiş, sipariş detayının açılıp kapanması, tekil metadata ve görünür SSS/şema eşleşmesini doğruladı. İki mevcut tablonun önceki hash kontrolü başarılı; site kaynaklı hata kaydedilmedi. Bu kontrol gerçek tarayıcı mobil/CWV ölçümü değildir.

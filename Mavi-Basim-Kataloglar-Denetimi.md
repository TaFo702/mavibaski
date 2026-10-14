# Kataloglar sayfası incelemesi ve kaynak düzeltmeleri

İncelenen URL: https://mavibasim.com/kataloglar
Tarih: 15 Ekim 2026 (İstanbul)
İncelenen başlangıç commit'i: 93cccfd1b4035ecfb091be2c8905439b253f749f

## İnceleme puanı: 80/100 — geçici

Bu puan teknik değerlendirmedir; Google puanı veya sıralama tahmini değildir. Gerçek kullanıcı performansı ve farklı mobil ekranlar doğrulanmadığından geçicidir. Kesintiler aynı temel sorun için tekrarlanmamıştır.

| Başlık | Puan | Kesinti nedeni |
|---|---:|---|
| Prerender, ilk HTML ve hydration | 15/25 | Mevcut HTML üreticisi tam React sayfasını üretmiyor. |
| Metadata, canonical ve rota temizliği | 25/25 | Doğrulanmış kesinti yok; title 64 karakter. |
| Yapılandırılmış veriler | 20/20 | Başlangıç incelemesinde doğrulanmış kesinti yok. |
| Tarama, URL ve bağlantı yapısı | 11/15 | Şehir bölümünün 23 bağlantısından 19'u katalog dışı ürünlere ait. |
| Başlıklar, görseller, kullanılabilirlik ve ölçülmüş performans | 9/15 | Tablo dışındaki teknik çelişki, yazım hatası ve güncel proje kurallarına aykırı ticari vaatler. |

## Doğrulanmış sorunlar

1. **Soru 12, 16, 53:** `src/utils/seoGenerator.ts` içindeki `/kataloglar` HTML üreticisi; mevcut video, üretim/onay açıklamaları, rehber bağlantıları ve alt içeriklerin tamamını üretmiyor. Tarayıcı açılışında React bu eksik gövdeyi yeniden oluşturuyor. İlk HTML ile yüklenen sayfa aynı kapsamda değil.
2. **Soru 7:** Katalog sayfasındaki “fabrikamızdan”, “modern ofset tesislerimizde”, “Topkapı üretim tesisimizde”, “en geç 1-2 saat” ve “24 saat içinde otomatik olarak başlar” metinleri `PROJECT_DECISIONS.md` içindeki 13 Eylül 2026 güncel içerik kararlarıyla çelişiyor. Gerçek işletme kapasitesi hakkında yeni bir iddia üretilmedi; onaylı hizmet/koordinasyon ve teklif aşamasında süre paylaşımı ifadeleri kullanıldı.
3. **Soru 8, 40:** “Kapak Çapı” yanlış bir başlık. “8-32 sayfa arası” tel dikiş açıklaması aynı sayfadaki toplam 36 ve 40 sayfalık tel dikiş tarife seçenekleriyle tutarsız. Yalnız tablo dışındaki açıklama düzeltildi.
4. **Soru 11, 36:** Şehir bölümünde 19 bağlantı broşür, menü, kartvizit, Amerikan servis, magnet ve kutu sayfalarına yönleniyor. Katalogla ilgili mevcut dört bağlantı korundu.

## Koruma kuralı

Fiyat ve maliyet tablolarında bu çalışma kapsamında doğrulanmış ve müdahale gerektiren bir hata raporlanmadı. Fiyat verileri, teknik tarife bilgileri, başlıklar, adetler, satırlar/sütunlar, caption/thead/header ilişkileri, tablo stilleri ve sipariş düğmeleri değiştirilmedi. Ortak CSS değiştirilmedi. Koruma kontrolü 10 fiyat tablosuyla birlikte iki açıklama/maliyet tablosunu da kapsar.

## ÇÖZÜM PROMPTU

Yalnız `/kataloglar` sayfasındaki kanıtlanan sorunları kaynak koddan düzelt. Mevcut React sayfasını tam prerender et ve aynı çıktıyı hydration ile kullan. Mevcut fiyat bileşenlerini yeniden yazma; fiyat kaynaklarını, tablo HTML yapısını, stillerini ve sipariş davranışını koru. Tablo dışındaki “Kapak Çapı” hatasını ve tel dikiş açıklamasını düzelt. Güncel proje kararlarındaki konum, dosya/prova kontrolü ve teklif aşamasında süre paylaşımı ifadelerini kullan. Şehir bölümünü mevcut dört katalog bağlantısıyla sınırla. Başka ürün içeriği, yeni bölüm, yeni görsel veya yeni özellik ekleme. Title, description ve canonical değerlerini değiştirme. Build, ilk HTML, hydration, sayfa geçişleri, metadata/schema tekilliği ve SHA-256 tablo karşılaştırmasını doğrula. Ortak kaynak değişikliklerinde diğer rotaların HTML içeriğini karşılaştır.

## Uygulama ve doğrulama

- Katalog rotası mevcut App/MemoryRouter/renderToString yöntemine eklendi. Mevcut React fiyat bileşenleri değiştirilmeden render ediliyor.
- Katalog rotası hydration listesine eklendi; tarife DOM düğümleri yerinde korunuyor.
- Tam prerender sonrasında testte görülen iki FAQ üreticisi çakışmasını önlemek için katalog bileşeninin manuel schema effect'i kaldırıldı. Mevcut RouteSEOHead aynı FAQ verisini yönetiyor.
- `validate-kataloglar-fix.cjs`: doğrudan açılış/yeniden açılış, ana sayfadan giriş, katalog–broşür gidiş/dönüş, ilk HTML/istemci metin ve link eşitliği, metadata/schema tekilliği, mevcut video, altı galeri görseli ve 12 tablonun SHA-256 kontrolü. SSR metin yorumları hash karşılaştırmasında yok sayılır; veri, öznitelik ve stiller yok sayılmaz. Hydration ayrıca aynı tablo DOM nesnelerinin korunduğunu doğrular.
- Korunan tabloların beklenen hash'leri değişiklikten önceki React çıktısından alındı.
- Diğer 294 HTML çıktısı başlangıç commit'iyle karşılaştırıldı: yeniden build nedeniyle değişen asset dosya adları hariç fark yok.
- TypeScript ve mevcut ESLint kontrolleri çalıştırıldı.
- `npm run build` içindeki `tsx` CLI, ortamın IPC dinleme kısıtı nedeniyle EPERM hatası verdi. Aynı Vite → prerender → esbuild adımları `node --import tsx scripts/prerender.ts` ile tamamlandı. Kaynak build script'i değiştirilmedi.

## Doğrulama sınırları

Hydration ve geçiş testleri JSDOM ortamındadır. Gerçek tarayıcıda düzeltilmiş sürümün mobil görünümü ve gerçek kullanıcı LCP/CLS/INP verileri ölçülmedi. Canlı ilk incelemedeki tarayıcı eklentisi hatası site hatası sayılmadı. Başlangıç incelemesi ile düzeltilmiş kaynak sürümü birbirinden ayrıdır; canlı sürüm ayrıca doğrulanmalıdır.

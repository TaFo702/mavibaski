# Zarf blogu — HTML ve içerik düzeltmesi

Kapsam: `/blog/zarf-baskisinda-diplomat-ve-torba-zarf`.

## Değişiklikler

- Bu blogun ilk HTML çıktısı, tarayıcıda kullanılan mevcut BlogPage bileşeninden üretilir. Başlıklar, bilgi/uyarı kutuları, karşılaştırma tablosu, CTA ve görünür SSS aynı veriyi kullanır.
- Bu rota için canonical, meta ve JSON-LD sahipliği RouteSEOHead üzerinden yönetilir; prerender metadata kopyası tekilleştirilir. Diğer blogların üretim yolu değiştirilmez.
- 26x35 ve mektup zarfı ölçüleri genel model karşılaştırması olarak korunur; mevcut fiyat sayfasındaki diplomat 10.5x24 ve torba 24x32 sipariş seçeneklerinden ayrılır. Yeni ürün vaadi oluşturulmaz.
- İki yıllık dayanım, kesin açılmama ve sıfır kayma iddiaları, dayanak bulunmadığından malzeme/yerleşim kontrolüne ilişkin açıklamalarla değiştirilir. Gerçek ürün desteği doğrulandığı iddia edilmez.
- Blog SSS'sindeki “and” Türkçe “ve” olarak düzeltilir; dayanım garantisi kaldırılan cevap görünür SSS ve schema için aynı veriden üretilir.

## Koruma

Zarf ürün sayfası, fiyat listeleri, fiyat/veri dosyaları, adetler, teslimat bilgileri, görseller ve ürün sayfasının title/meta/H1 bilgileri değiştirilmez. Yalnız blogun açıklama amaçlı model karşılaştırması düzenlenir; bu fiyat tablosu değildir.

294 yayımlanan rotanın başlangıç ve son HTML karşılaştırmasında yalnız hedef blog değişti. Diğer 293 rota, derlenen asset dosya adları dışında aynı kaldı. Blog veri dosyasında yalnız bu blog kaydı değişti.

## Yerel doğrulama

- Vite üretim build, 294 rota prerender ve server bundle başarılı.
- Typecheck ve lint başarılı.
- Metadata ve JSON-LD kontrolleri başarılı.
- `validate-zarf-blog-fix.cjs`: ilk HTML/JavaScript/reload metin, bağlantı ve tablo eşleşmesi; dört makale H2'si; gerçek karşılaştırma tablosu; ham biçimlendirme işaretlerinin yokluğu; görünür SSS/schema eşleşmesi; tekil canonical/meta/FAQ; blog–ürün–blog rota geçişi başarılı.
- Mevcut zarf regresyonunun DOM bölümü: hydration, fiyat tablosu DOM kimliği, sipariş detayını açma/kapatma ve rota geçişleri başarılı.

Ortamda tsx CLI'nin IPC soketi engellendiği için aynı prerender komutu `node --import tsx scripts/prerender.ts` ile çalıştırıldı. Yerel HTTP sunucu testi yapılmadı; GitHub kalite kapısı üretim HTTP kontrolünü içerir. Gerçek tarayıcı mobil görünüm ve Core Web Vitals ölçümü yapılmadı. GSC verisi çekilmedi ve sıralama kazanımı ölçülmedi.

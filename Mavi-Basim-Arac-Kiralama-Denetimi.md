# Araç Kiralama Sayfası — Denetim ve Çözüm Kaydı

İncelenen sayfa: https://mavibasim.com/arac-kiralama  
Tarih: 16 Ekim 2026  
İncelenen başlangıç commit'i: `60bb38fafd177ca3625f84328388cffa67c95b57`

## 1. İlk inceleme puanı: 64/100 — geçici

Bu teknik inceleme puanıdır; Google puanı veya sıralama tahmini değildir. Yalnız kanıtlanan sorunlardan puan düşülmüştür. Canlı tarayıcı ve mobil kontroller tamamlanamadığından nihai değerlendirme değildir; yapılmayan testler başarılı sayılmamıştır.

| İnceleme alanı | Ağırlık | Kanıtlanan puan kaybı |
| --- | ---: | ---: |
| Prerender, ilk HTML ve hydration | 25 | 18 |
| Metadata, canonical ve rota temizliği | 25 | 2 |
| Yapılandırılmış veriler | 20 | 8 |
| Tarama, URL ve bağlantı yapısı | 15 | 0 |
| Başlıklar, görseller, kullanılabilirlik ve performans | 15 | 8 |
| Toplam | 100 | 36 |

İlk HTML'deki eksik içerik ve bunun bağlantı/SSS belirtileri aynı temel sorun sayılmış, farklı başlıklarda yeniden puanlanmamıştır. Görsel boyut metadata hatası ile görsel açıklama hataları farklı kanıtlara dayanır. Title uzunluğu 69, description uzunluğu 171 karakterdir; uzunlukları tek başına hata sayılmamıştır.

## 2. Yalnız doğrulanmış sorunlar

| Öncelik | Soru | Somut kanıt | Etki |
| --- | --- | --- | --- |
| Yüksek | 12, 16, 53 | Canlı HTTP yanıtı 12.431 bayt. `#root` yalnız bir H1 ve iki paragraf içeriyor. `getRouteSEO` gövdesi yalnız bu kısa metni üretiyor; araç kiralama tam React renderer listesinde yok. | Mevcut fiyat tablosu, galeri, SSS ve önemli bağlantılar ilk HTML'de bulunmuyor. JavaScript başlangıcı kısa gövdeyi yeniden oluşturuyor. |
| Orta | 20, 22 | Kaynak uygulamanın DOM simülasyonunda iki BreadcrumbList: `Ana Sayfa → ARAC KIRALAMA` ve `Ana Sayfa → Makbuz & Formlar → Araç Kiralama`. Üreticiler `SEOMetadataManager` ve `RouteSEOHead`. | Aynı sayfa için çelişen hiyerarşiler üretiliyor. Bu bulgu canlı tarayıcı gözlemi olarak sunulmamıştır. |
| Orta | 18, 42 | Mevcut WebP dosyaları 805×1024; Open Graph 800×533, görsel bileşeni 1200×800 tanımlıyor. | Paylaşım ve HTML boyut tanımları görsellerin gerçek oranını yansıtmıyor. Ölçülmüş CLS sonucu bulunmuyor. |
| Orta | 7, 10, 40 | Tablo dışı metinlerde “aynı gün tasarım”, “24 saat içinde PDF prova”, “imalatçı garantisi”, “tam ispat gücü”, “en sağlam hukuki delil” gibi kesin ifadeler var. 13 Eylül proje kararı bu tür doğrulanmamış vaatleri dışlıyor. | Baskı hizmeti, kesin hukuki sonuç veya teslim süresi garantisi gibi anlatılıyor. |
| Düşük | 10, 44 | Görsel alt metinleri `.webp` dosya adları. Kiracı ve kefil alanları bulunan görsel, teslim tutanağı ve adet alanlarıyla tanımlanıyor. Hasar açıklaması anlaşmazlıkların biteceğini vaat ediyor. | Erişilebilir açıklamalar ve görselin gerçek içeriği arasında uyumsuzluk var. |
| Düşük | 40 | “TOC” müşteriye görünen gezinme kutusunda bulunuyor. Sipariş açıklaması doğrudan WhatsApp'a geçildiğini söylüyor; fiyat düğmesi `openProductDetail` çağırıyor. | Teknik ifade ve gerçek sipariş akışıyla uyuşmayan açıklama bulunuyor. |

Paylaşılan bağlantıda `/arac-kiralamabağlan` yazıyordu ve bu adres 404 dönüyordu. “Bağlan” komut olarak yorumlanmış, mevcut `/arac-kiralama` rotası incelenmiştir. Bu yazım sayfanın SEO puanından düşülmemiş ve yeni yönlendirme eklenmemiştir.

## 3. Koruma kuralı nedeniyle müdahale edilmeyecek sorunlar

Koruma nedeniyle bırakılan doğrulanmış bir tablo sorunu yoktur. Fiyat listesi, tablo başlıkları, verileri, açıklamaları, hesaplamaları, stilleri ve sipariş düğmeleri düzeltme kapsamının dışındadır.

## 4. Sonucu sınırlayan kontroller

- Canlı tarayıcı açma işlemi zaman aşımına uğradı; canlı sayfada ekran görüntüsü, farklı telefon ekranları, klavye odağı ve görsel yükleme davranışı doğrulanamadı.
- DOM/hydration ve sayfa geçişi kontrolleri JSDOM ile kaynak uygulama üzerinde yapıldı. Bu kontroller gerçek tarayıcı veya mobil testi değildir.
- LCP, CLS ve INP için ölçülmüş gerçek kullanıcı verisi elde edilmedi; hız veya sıralama sonucu tahmin edilmedi.
- Yerel `npm run quality`, tsx CLI'nın Unix soketi oluşturma izni nedeniyle `validate:routes` adımında durdu. İlgili tarayıcı dışı doğrulayıcılar `node --import tsx` ile ayrıca çalıştırıldı. Yerel Playwright spinner testi çalıştırılmadı.

## ÇÖZÜM PROMPTU

Yalnız `/arac-kiralama` ve bu sayfayı doğrudan etkileyen ortak teknik kodu düzelt:

1. Sayfanın mevcut React bileşenini ve değişmemiş fiyat bileşenini tam prerender çıktısına bağla. Mevcut galeri, SSS ve bağlantıları ilk HTML'ye dahil et. Yeni bölüm veya şablon üretme.
2. Bu rotada eski metadata/breadcrumb üreticilerinin devreye girmesini engelle. Önceki sayfaya ait kayıtları temizle. Görünür üç basamaklı breadcrumb ile aynı tek BreadcrumbList üret.
3. Mevcut araç kiralama görsellerinin HTML ve paylaşım boyutlarını gerçek 805×1024 ölçüsüne göre düzelt. Dosya yollarını ve görsel sayısını koru; yeni görsel oluşturma.
4. Yalnız bu sayfanın alt metinlerini ve görsel açıklamalarını gösterdikleri forma göre düzelt. Dosya adı biçimindeki alt metinleri kaldır.
5. Tablo dışındaki kesin hukuk, tasarım ve teslimat vaatlerini baskı, kayıt, PDF prova ve teklif aşamasında paylaşılan süre bilgileriyle düzelt. Mevcut sipariş açıklamasını ürün seçenekleri penceresine uygun hale getir. Bu sayfadaki TOC ifadesini kaldır.
6. Fiyatları besleyen veri kaynaklarını; fiyatları, adetleri, teknik bilgileri, satır/sütunları, tablo HTML'sini, CSS'ini, açıklamalarını, hesaplayıcısını ve sipariş düğmelerini değiştirme. Yalnız `dist` dosyalarına yama yapma; kalıcı kaynak düzeltmesi yap.
7. Mevcut build komutunu ve ilgili kontrolleri çalıştır. İlk HTML ile başlangıç sonrası DOM'da tek H1/title/description/canonical; geçerli JSON-LD; eşleşen görünür SSS ve tek breadcrumb doğrula. İlk açılış ve sayfa geçişlerinde içerik kaybını, önceki ürün metadata'sını ve uygulama hatalarını kontrol et. Ortak kodun diğer sayfalara etkisini ve fiyat alanının korunmasını karşılaştır.

## Uygulama ve doğrulama kaydı

- Kaynak düzeltmesi: tam React prerender, hydration işareti, sayfaya özgü metadata sahipliği, mevcut metin ve görsel tanımları. Sitemap'te yalnız bu URL'nin içerik değişikliği tarihi 16 Ekim 2026 yapıldı.
- `npm run build` ile 294 statik HTML üretildi. `npm run typecheck` ve mevcut lint adımı tamamlandı.
- Mevcut tarayıcı dışı doğrulamalar: 287 rota; sitemap, metadata, iç bağlantı, içerik; 25 HTTP kontrolü; 25 kontrollü hata senaryosu.
- Fiyat alanı başlangıç React çıktısı ile yeni ilk HTML arasında birebir eşleşti: 10.098 UTF-8 bayt. SHA-256: `423cd22911be530a3d026df84eec701b03e63abff8776ad96d5965336e5a7648`.
- `SiparisFisiHorizontalTable`, fiyat hesaplayıcısı, fiyat verisi sabitleri, genel CSS ve mevcut görsel dosyaları değiştirilmedi.
- Gider makbuzu, reçete, tediye makbuzu ve sözleşme sayfalarının doğrudan React çıktıları başlangıç sürümüyle aynı kaldı.
- İlk HTML 89.303 bayt; mevcut 10 SSS ve 41 iç bağlantı içeriyor. Galerinin mevcut 3 görseli, özellik görseli ve örnek görseli korunuyor; toplam 5 görsel kullanımı var.
- Kaynak uygulamanın DOM simülasyonunda ilk hydration ve araç kiralama → formlar → gider makbuzu → formlar → araç kiralama geçişi kontrol edildi. İlk hydration'da fiyat HTML'si; geri dönüşte React yorum işaretleri hariç fiyat yapısı ve metinler korunuyor. React hata kaydı oluşmadı.

Bu kayıt canlı görsel/mobil denetimin tamamlandığını veya Google ilk sayfa sonucunu göstermez.

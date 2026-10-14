# Antetli kâğıt SEO tamamlaması — 14 Ekim 2026

GSC panelinde görünürlük almış /antetli-kagit adresi canlıda 404 döndürüyordu. Mevcut /antetli ürününe sunucu ve Vercel katmanında kalıcı yönlendirme eklendi. Yeni ürün sayfası açılmadı.

## Ürün içeriği

Mevcut dosya hazırlama paragrafına, sitenin ana sayfası ve teknik rehberinde zaten açıklanan PDF/AI/CDR, CMYK, taşma payı, kesim güvenli alanı ve PDF prova kontrolü eklendi. Aynı bölümden mevcut teknik dosya rehberine bir bağlantı eklendi. Mevcut “hangi bilgiler gerekir” SSS cevabı format/prova bilgisiyle genişletildi. Yeni SSS veya H2 açılmadı.

Title, meta description, H1, fiyat listesi, adetler, ürün seçenekleri ve teslimat bilgileri korundu. 100/500/1000 adet, iki renk veya çift taraflı yeni teklif eklenmedi. Kelime varyantları zorla tekrarlanmadı.

## Mevcut antetli rehberi

Zarf rehberinde kullanılan gerçek React blog renderer’ı bu rehberin ilk HTML üretiminde de kullanıldı. Başlıklar, kartlar ve karşılaştırma artık gerçek HTML yapıları; ham özel işaretler sunulmuyor. Metadata/schema sahipliği ilk açılış ve sayfa geçişinde tek kaynağa bağlandı.

Yazıcılarla %100 uyum, sıkışmama garantisi, belgelenmeyen Pantone kalibrasyonu ve üretim tesisi anlatımları yerine cihaz özelliklerinin ve dosyanın kontrolü anlatıldı. 80 gr özel talep ile fiyat listesindeki 90 gr standart seçenek ayrımı netleştirildi. Blogun mevcut title/H1, tarihi, Tayfun Akan yazarı ve ürün dönüş bağlantısı korundu. Blog teknik karşılaştırması fiyat tablosu değildir; ürün fiyat tablolarına dokunulmadı.

## Kontroller

- TypeScript ve üretim build/prerender geçti.
- Ürün ilk HTML, hydration, yenileme, ana sayfa geçişi ve sipariş detayı kontrolleri geçti.
- Blog ilk HTML/istemci metin ve bağlantı eşitliği, dört makale H2 başlığı, gerçek karşılaştırma tablosu, görünür SSS/schema uyumu ve blog–ürün–blog geçişi geçti.
- Mevcut zarf blogu regresyon kontrolü geçti.
- İç bağlantı, metadata ve sitemap kontrolleri geçti.
- Fiyat tablosunun DOM HTML SHA-256 değeri önceki sürümle aynı: a9d2dc0fb7fb147b3b8cacc346368cf22cecec3ed61179b69f0e163512cdefca.
- Asset adları normalize edilince yalnız /antetli, antetli blogu ve /zarf üzerindeki ilgili antetli rehber kartı özeti değişti.
- Yerel lint: 0 hata; mevcut 21 uyarı.

GSC/Planner hesabına veri yazılmadı veya yeni veri çekilmedi. Analiz paneli bu repo kapsamında değil; primary URL ve tekrarlı sorgu kayıtları burada değiştirilemedi. Mobil ekran ve Core Web Vitals ölçülmedi. İlk 10 garantisi verilmez.

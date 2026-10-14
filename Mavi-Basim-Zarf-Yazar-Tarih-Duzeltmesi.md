# Zarf tutarlılığı ve blog yazarı düzeltmesi

Tarih: 14 Ekim 2026.

## Zarf ürün sayfası

- Doğrudan üretici/fabrika ve tesislerde üretim anlatımları, mevcut Topkapı hizmet/koordinasyon noktası anlatımıyla eşleştirildi.
- Kapatma SSS'si mevcut teknik özellikleri izler: diplomat için silikon bantlı veya tutkallı; mevcut 24x32 torba için silikon bantlı. Sipariş öncesi model/seçenek teyidi açıklanır. Teknik veya fiyat tabloları değiştirilmedi.
- Dosya hazırlığı ve sipariş hazırlığı açıklamalarında PDF, AI, CDR formatları belirtildi. Bu formatlar sitenin mevcut sipariş sürecinden doğrulandı; yeni format, fiyat veya teslimat taahhüdü eklenmedi.

## Bloglar — Tayfun Akan

54 blog kaydının ortak şablonu tarandı. Mehmet Başar adı yedi kaynak kullanımında Tayfun Akan olarak değiştirildi. Üst yazar satırları, yazar kartları ve Article/BlogPosting yazar şemaları Person/Tayfun Akan olarak eşleştirildi. Kaynakta Mehmet Başar kalmadı.

Yayın tarihi her blogun mevcut `date` kaydından gelir. Sabit genel yayın tarihleri kaldırıldı; güncelleme tarihi bugünkü yazar/metadata düzeltmesi olan 14 Ekim 2026'dır. Kaynak kayıtların gerçek tarihsel yayın gününün dışarıdan doğrulandığı iddia edilmez.

Zarf blogunda kaynak yayın tarihi 02 Mayıs 2026 olarak korunur; görünür yayın alanları ve schema `2026-05-02` kullanır. Güncelleme alanları/schema `2026-10-14` kullanır.

Yalnız zarf blogunun SEO title'ı 49 karakterlik `Diplomat ve Torba Zarf Seçim Rehberi | Mavi Basım` olarak kısaltıldı. Makale H1'i ve ürün sayfasının title/meta/H1 bilgileri korundu. Diğer blogların title ve makale metinleri değiştirilmedi; ortak yazar kartındaki eski ad güncellendi.

## Koruma ve test

- Zarf fiyat tablosunun DOM/HTML SHA256 değeri değişmedi: `d4a1a973a0e002ff3562cbafc931af07bc3e1c0e45f3fc964c2b75ec8d760b2c`.
- Fiyatlar, adetler, tablo başlıkları/biçimi/düğmeleri, teknik tablolar, teslimat süreleri, galeri dosyaları ve önceki keyword cümleleri korundu.
- Üretilen 294 rotada yalnız zarf ve 54 blogun çıktısı değişti. Diğer ürünlerin çıktıları asset adları dışında aynı.
- 54 blogun görünür yazar, schema yazarı, yayın/güncelleme tarihleri; zarf blogunun kısa title'ı ve değişmeyen H1'i test edildi.
- Mevcut zarf blogu ilk HTML/client/reload ve FAQ/schema regresyonu geçti.
- Mevcut zarf hydration, fiyat tablosu DOM kimliği, sipariş detayını açma/kapatma ve rota geçiş regresyonu geçti.
- Üretim Vite/prerender, TypeScript, metadata ve JSON-LD kontrolleri geçti. ESLint 0 hata; mevcut 411 uyarı kaldı.
- GSC/Planner verisi çekilmedi, sıralama kazanımı veya Core Web Vitals ölçümü yapılmadı.

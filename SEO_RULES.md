# SEO_RULES.md - SEO Standartları ve Kuralları

Bu doküman, Mavi Basım projesinde Google sıralamalarını ve organik trafiği artırmak için uygulanması gereken değişmeyen SEO kurallarını içerir.

---

## 1. Sayfa İçi (On-Page) SEO ve Meta Etiket Standartları

* **Title Etiketleri:** 
  * Her sayfanın özgün, anahtar kelime odaklı ve max 60 karakterlik title etiketi bulunmalıdır.
  * Şablon: `{Ürün/Hizmet Adı} | {Slogan/Konum} - Mavi Basım Matbaa`
* **Meta Description:** 
  * Her sayfanın dönüşüm odaklı, harekete geçirici mesaj (CTA) içeren ve 155-160 karakter arası özgün bir açıklaması olmalıdır.
* **Hiyerarşik Başlık Yapısı (H1 - H6):**
  * Sayfada kesinlikle **yalnızca 1 adet H1** etiketi bulunmalıdır.
  * H1 etiketi anahtar kelimeyi ve sayfa başlığını net içermelidir.
  * H2 ve H3 başlıkları mantıksal bir sıra takip etmeli, hiyerarşi atlanmamalıdır (örneğin H1'den H3'e geçilmemelidir).
* **Canonical URL'ler:**
  * Tüm sayfalarda self-referencing (kendini gösteren) canonical URL tanımlı olmalıdır.

---

## 2. İçerik ve Semantik Yapı

* **Özgünlük:** Tüm ürün, kategori ve blog içerikleri %100 özgün olmalı; tekrarlayan (duplicate) içerik barındırmamalıdır.
* **Semantik HTML:** `header`, `nav`, `main`, `article`, `section`, `aside`, `footer` gibi semantik HTML5 etiketleri kullanılmalıdır.
* **Structured Data (Schema.org / JSON-LD):**
  * Ürün sayfalarında `Product`, `Offer`, `AggregateRating` şemaları.
  * Yerel işletme için `LocalBusiness` / `PrintShop` şeması.
  * Sıkça Sorulan Sorular bölümlerinde `FAQPage` şeması.
  * Blog yazılarında `BlogPosting` şeması aktif olmalıdır.

---

## 3. Görsel SEO ve Medya Optimizasyonu

* **Alt Etiketleri (Alt Text):** Tüm görsellerde ürün ve anahtar kelime odaklı, tanımlayıcı `alt` etiketleri bulunmalıdır.
* **Dosya Biçimi & Boyut:** Görseller WebP formatında, yüksek sıkıştırma oranına sahip ve optimize edilmiş boyutlarda sunulmalıdır.
* **Genislik & Yükseklik:** Layout shift (CLS) yaşanmaması için görsellere `width` ve `height` veya uygun aspect-ratio değerleri atanmalıdır.

---

## 4. Bağlantı Mimarisi (Internal Linking)

* **Anahtar Kelime Odaklı Anchor Text:** İç linklerde "tıklayınız", "buraya basın" yerine hedef ürünü belirten detaylı metinler (ör. "otokopili tahsilat makbuzu basımı") kullanılmalıdır.
* **Silolama (Content Siloing):** Ana kategori sayfaları alt ürün sayfalarına, alt ürün sayfaları da birbirine ve ilgili blog makalelerine hiyerarşik bağlar kurmalıdır.

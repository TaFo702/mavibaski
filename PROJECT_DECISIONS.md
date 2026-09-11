# PROJECT_DECISIONS.md - Proje Karar Kayıt Dosyası (Architecture & SEO Decision Log)

Bu dosya, Mavi Basım projesi boyunca alınan kritik SEO, teknik mimari, ürün ve dönüşüm kararlarının tarihsel kaydını tutar. Yeni geliştirme önerilerinin geçmiş kararlarla çelişmemesi için bu dosya esas alınır.

---

## 1. Mimari ve Altyapı Kararları

* **[2026-07-23] Single Page Application (SPA) + Express Server Mimarisi:**
  * **Karar:** Frontend React (Vite) + Tailwind CSS, backend ise Express.js (`server.ts`) olarak yapılandırılmıştır.
  * **Neden:** İstemci tarafında hızlı gezinme, sunucu tarafında ise dinamik sitemap, robots.txt ve API proxy desteği sağlamak.

---

## 2. SEO ve İndekslenme Kararları

* **[2026-07-23] Ürün ve SEO Sayfa Yapısı:**
  * **Karar:** Her matbaa ürünü için özel URL ve detaylı ürün açıklama metinleri barındıran dinamik SEO bileşenleri kullanılması.
  * **Neden:** Google aramalarında uzun kuyruklu (long-tail) kelimelerde hedefleme yapmak.

* **[2026-07-23] Ana Sayfa Statik H1 ve Türkiye Geneli SEO Odağı:**
  * **Karar:** Ana sayfa Hero alanındaki H1 başlığı statik, tekil ve Türkiye geneli ticari arama niyetini karşılayacak biçimde "Online Matbaa & Baskı Hizmetleri | Türkiye Geneli Hızlı Teslimat" olarak sabitlenmiştir. Slider içerisindeki değişken kampanya başlıkları ise H2 etiketine çekilmiştir. Ana sayfadaki diğer bölümlerdeki mükerrer H1 etiketleri (Welcome SEO alanı vb.) H2/H3 etiketlerine düşürülmüştür. "Topkapı" ve benzeri yerel ifadeler açıklama metinleri ve güven unsurlarında destekleyici olarak tutulmuştur.
  * **Neden:** Sayfa genelinde birden fazla H1 bulunmasını önleyerek arama motorlarına net bir hiyerarşi sunmak, banner geçişlerinde H1 etiketinin dinamik değişmesini engellemek ve ana sayfanın H1 odağını bölgesel bir semt ismi yerine Türkiye genelindeki ana ticari matbaa aramalarına konumlandırmak.

* **[2026-07-23] Hero Alanı Çift Yönlü CTA ve Güven Sinyali Mimarisi:**
  * **Karar:** Hero alanında kampanya slaytlarına entegre çift yönlü yönlendirme mimarisi (ürün detay/fiyat sayfaları + doğrudan WhatsApp teklif hattı) kurulmuştur. Üretim tesisi tecrübesi, Türkiye geneli 81 ile gönderim ve fabrikadan direkt teslimat avantajları ilk ekranda görünür kılınmıştır.
  * **Neden:** Ziyaretçilerin fiyat inceleme veya anında sipariş verme tercihlerine doğrudan yanıt vererek dönüşüm kaybını önlemek.

* **[2026-07-23] Öne Çıkan Ürünler Taranabilir İç Linkleme ve Ticari CTA Mimarisi:**
  * **Karar:** Öne Çıkan Ürünler kartlarındaki görsel, başlık ve yönlendirme butonları JavaScript `onClick` yerini doğrudan HTML `<Link to={productPath}>` bağlantılarına bırakmıştır. Açıklama paragraflarında ise anahtar kelimeler doğrudan kategori sayfalarına yönlendiren iç linkler olarak yapılandırılmıştır.
  * **Neden:** Arama motoru örümceklerinin (Googlebot vb.) ürün sayfalarını kolayca tarayabilmesini ve iç sayfa otorite (PageRank) aktarımını desteklemek; kullanıcıların ise herhangi bir ürün kartından tek tıklamayla ilgili hesaplama ve sipariş ekranına erişebilmesini sağlamak.

* **[2026-07-23] B2B Güven Sinyalleri ve Ücretsiz Grafik Denetim CTA Yapılandırması:**
  * **Karar:** Ana sayfadaki güven kartları net ikonlar (Award, Printer, Truck, Boxes, CheckCircle2) ve gerçek imalat avantajları (20+ yıl tecrübe, Topkapı özmal makine parkuru, korumalı ambalaj, aracısız bütçe, PDF prova) ile belirginleştirilmiştir. Güven kartlarının altına "Sıfır Hatalı Baskı Güvencesi" mesajı ve WhatsApp üzerinden ücretsiz tasarım denetimi alma CTA'sı entegre edilmiştir. Sahte puan, sahte müşteri sayısı veya uydurma sertifika eklenmemiştir.
  * **Neden:** Müşterilerin sipariş öncesi endişelerini (hatalı baskı, hasarlı kargo, yüksek maliyet) gerçek B2B imalat süreçleriyle gidermek ve dönüşüm oranlarını desteklemek.

* **[2026-07-23] Kurumsal & Toptan Teklif Bölümü B2B Süreç ve İç Linkleme Mimarisi:**
  * **Karar:** Ana sayfadaki Toptan Matbaa Siparişleri alanı; ajanslar, bayiler ve kurumsal firmalara yönelik 4 maddelik imalat avantajı gridi (Doğrudan Üretici Fiyatı, Baskı Öncesi Prova & Denetim, Anlaşmalı Kurumsal Faturalama, 81 İle Güvenli Lojistik) ve 4 adımlı kurumsal sipariş süreci akışıyla yenilenmiştir. Metin içi kurumsal ürün kategorilerine (`/kartvizit`, `/brosur`, `/kataloglar`, `/kutu`, `/karton-canta`, `/etiket`) doğal iç linkler eklenmiş; CTA alanı ise hem WhatsApp toptan teklif hattı hem de kurumsal iletişim teklif formu (`/iletisim`) olarak çift yönlü yapılandırılmıştır.
  * **Neden:** B2B toplu alım yapan ticari kullanıcıların karar verme süreçlerini netleştirmek, kurumsal sipariş adımlarını şeffaflaştırmak ve arama motorlarının kurumsal kategori sayfalarına erişimini desteklemek.

* **[2026-07-23] Kategori Sayfaları Standart Hero, Tek H1, Meta Uyumlu Giriş ve Güven/İç Link Mimarisi (Görev 5):**
  * **Karar:** Tüm kategori sayfalarında (`Kartvizit`, `Broşür`, `Katalog`, `El İlanı`, `Etiket`, `Kutu`, `Karton Çanta`, `Magnet`, `Antetli Kağıt`, `Cepli Dosya`, `Diplomat Zarf` vb.) tek bir H1 başlığı, meta description ile %100 uyumlu giriş metni, micro güven sinyalleri (Topkapı İmalat Tesisimiz, Ücretsiz Grafik Kontrolü, 81 İle Güvenli Lojistik, Aracısız Fabrika Fiyatı), ilgili kategorilere bağlanan taranabilir iç linkler ve doğrudan WhatsApp teklif alma CTA yapısını barındıran modüler `<CategoryHero>` mimarisi uygulanmıştır. Çalışan fiyat hesaplama tabloları, sipariş butonları ve sayfa düzenlerine dokunulmamıştır.
  * **Neden:** Kategori sayfalarının ticari arama niyetini karşılamak, sayfa bazında birden fazla H1 kafa karışıklığını önlemek, arama motorlarının kategori hiyerarşisini ve iç link ağını kolayca taramasını sağlamak, ziyaretçilere tek bakışta B2B imalat güveni aşılayarak dönüşüm oranlarını artırmak.

* **[2026-07-23] Şehir Bazlı SEO Landing Page Mimarisi (Görev 6):**
  * **Karar:** Türkiye'nin 81 ili için dinamik çalışan SEO landing page altyapısı (`/istanbul-matbaa`, `/ankara-matbaa`, `/izmir-matbaa` vb.) oluşturulmuştur. Her şehir sayfasında tek bir H1 başlığı ("{Şehir} Matbaa Baskı Hizmetleri"), ilgili şehre ve bölgeye özel dinamik içerik paragrafları, kategorilere iç linkler (`/kartvizit`, `/brosur`, `/kataloglar`, `/kutu`, `/etiket`, `/magnet`, `/karton-canta`, `/zarf`), Topkapı imalat ve kargo teslimat bilgileri, kurumsal B2B avantajlar, SSS bölümü, özelleştirilmiş SEO title/description meta etiketleri ve LocalBusiness JSON-LD schema yer almaktadır. Ana sayfaya 81 ile kolay erişim ve taranabilirlik sağlayan "Türkiye Geneli Hizmet Verdiğimiz Şehirler" bölümü eklenmiştir. Sahte yıldız puanı, uydurma müşteri sayısı veya gerçek dışı şube adresi kullanılmamıştır.
  * **Neden:** Şehir bazlı matbaa aramalarında yüksek organik arama motoru görünürlüğü elde etmek, 81 ildeki kurumsal müşterilere doğrudan Topkapı fabrikasından aracısız baskı hizmetini şeffaf şekilde sunmak ve iç link ağı vasıtasıyla ana ürün sayfalarının SEO otoritesini yükseltmek.

* **[2026-07-24] Blog & Ürün Sayfaları Topic Cluster SEO Mimarisi (Görev 7):**
  * **Karar:** Blog içerikleri ile ana ürün kategorileri (`/kartvizit`, `/brosur`, `/kataloglar`, `/etiket`, `/karton-canta`, `/kutu`, `/magnet`, `/antetli`, `/makbuz`, `/zarf`) arasında çift yönlü semantik iç link ağı ve topic authority altyapısı kurulmuştur.
    * Tüm ürün sayfalarında (`Kartvizit`, `Broşür`, `Katalog`, `Etiket`, `Kutu`, `Magnet`, `Karton Çanta`, `Antetli Kağıt`, `Zarf`, `Makbuz`) ilgili kategorinin öne çıkan rehber makalelerini HTML `<Link>` bileşeniyle taranabilir olarak listeleyen `<RelatedBlogPosts>` bileşeni entegre edilmiştir.
    * Blog detay sayfalarının sonunda **"İlgili Matbaa Ürünleri"** başlıklı bölüm altında 4-8 alakalı ürüne commercial intent taşıyan anchor text'ler ("Kartvizit Baskı Fiyatları", "Broşür Baskı Fiyatları", "Katalog Baskı Fiyatları" vb.) ve `alt`/`title` öznitelikleri eksiksiz görsellerle HTML `<Link>` bağlantıları verilmiştir.
    * Blog kartlarında `alt`, `title` ve `link title` metinleri SEO kriterlerine uygun şekilde tamamlanmıştır.
    * Kategori sayfalarında `CategoryHero` aracılığıyla `BreadcrumbList` schema, blog sayfalarında `Article` / `BlogPosting`, `BreadcrumbList` ve `FAQPage` JSON-LD schema yapıları eksiksiz taranabilir olarak `<Helmet>` içerisine eklenmiştir.
    * Tüm yönlendirmelerde JS `navigate()` yerine doğrudan HTML `<Link>` kullanılmıştır.
  * **Neden:** Blog rehberlerindeki organik bilgilendirici trafiği ticari ürün sayfalarına aktarmak, arama motorlarına güçlü bir konu otoritesi (Topical Authority) sinyali vermek, taranabilir HTML iç linklerle PageRank akışını optimize etmek ve sıralamaları yükseltmek.

* **[2026-07-24] Yayın Öncesi Son Teknik SEO Denetimi (Görev 8):**
  * **Karar:** Yayın öncesinde sitede herhangi bir yeni tasarım veya özellik eklenmeden 11 maddelik teknik SEO denetimi ve kalite kontrolü tamamlanmıştır:
    1. **sitemap.xml:** Tüm ana sayfalar, kategoriler, 42 blog yazısı, 81 şehir landing sayfası, sektörel SEO sayfaları ve kurumsal sayfalar eksiksiz taranabilir olarak güncellendi.
    2. **robots.txt:** Sitemap yönlendirmesi (`https://mavibasim.com/sitemap.xml`) ve genel izin kuralları (`Allow: /`) kontrol edildi.
    3. **Canonical:** Tüm sayfalarda self-canonical link yapısı (`<link rel="canonical" href={canonicalUrl} />`) tam taranabilir olarak doğrulandı.
    4. **Open Graph:** Tüm sayfalarda `og:title`, `og:description`, `og:image`, `og:url`, `og:type` ve `og:site_name` etiketleri eksiksiz kontrol edildi.
    5. **Twitter Card:** Tüm sayfalarda `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` ve `twitter:url` etiketleri aktif.
    6. **JSON-LD Schema:** `Organization`, `LocalBusiness`, `WebSite`, `BreadcrumbList`, `Product` / `Service`, `Article` / `BlogPosting` ve `FAQPage` schema yapıları çakışmasız, tamamen standart Google kriterleriyle çalışmaktadır.
    7. **404 Sayfası:** Tanımlanmayan tüm rotalarda doğru 404 görünümü ve ana sayfaya taranabilir dönüş butonu sağlandı (`noindex, follow` korumalı).
    8. **Broken Link Kontrolü:** Tüm dâhili `<Link>` bileşenleri taranarak 404 oluşturan kırık linkler tespit edilip düzeltildi.
    9. **Lighthouse & Performans:** Görsellerde `alt` ve `loading="lazy"` öznitelikleri, heading hiyerarşisi (H1->H2->H3) ve erişilebilirlik iyileştirmeleri uygulandı.
    10. **Build & Derleme:** Production build sıfır hatayla başarıyla derlendi (`compile_applet` başarılı).
  * **Neden:** Yayın öncesi teknik SEO altyapısını %100 eksiksiz ve sıfır hatayla canlıya almak, indeksleme sorunlarını önlemek ve Google sıralama potansiyelini maksimize etmek.

---

## 3. Dönüşüm (CRO) ve Müşteri İlişkileri Kararları

* **[2026-07-23] Doğrudan WhatsApp Sipariş Akışı:**
  * **Karar:** Karmaşık e-ticaret ödeme adımları yerine, sepete eklenen ürünlerin detaylı özellikleri ve adetleriyle WhatsApp hattına iletilmesi akışı ana dönüşüm kanalı olarak belirlenmiştir.
  * **Neden:** Türkiye matbaa sektöründe müşterilerin sipariş öncesi grafik onay ve direkt iletişim tercih etmesi.

---

## 4. İçerik ve Kategorizasyon Kararları

*(Gelecekte alınacak kararlar buraya eklenecektir)*

---

## 5. İptal Edilen veya Değiştirilen Kararlar

*(İptal edilen veya revize edilen kararlar ve gerekçeleri buraya eklenecektir)*

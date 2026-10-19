# PROJECT_DECISIONS.md - Proje Karar Kayıt Dosyası (Architecture & SEO Decision Log)

Bu dosya, Mavi Basım projesi boyunca alınan kritik SEO, teknik mimari, ürün ve dönüşüm kararlarının tarihsel kaydını tutar. Yeni geliştirme önerilerinin geçmiş kararlarla çelişmemesi için bu dosya esas alınır.

* **[2026-10-19] Adisyon GSC İçerik ve Rehber Bağlantıları:**
  * **Hedefleme:** Ticari adisyon baskı/fiyat/örnek sorgularının ana hedefi `/adisyon`; otokopili kâğıt anlamı ve çalışma biçimi için mevcut `/blog/adisyon-ve-makbuzlarda-otokopili-kagit` rehberi kullanılır. Aynı niyete yeni URL açılmaz.
  * **İçerik:** Adisyon örneklerinde boş/doldurulmuş alan ayrımı, galeriye içindekiler bağlantısı ve rehbere geçiş eklendi. Rehberde kısa tanım, tek nüsha/otokopili ayrımı, görünür SSS ve ilgili form/koçan bağlantıları birlikte sunulur.
  * **Teknik kapsam:** Bu rehberin mevcut React içeriği ilk HTML’de render edilir ve aynı ağaç hydrate edilir. Görünür SSS ve şema aynı kaynaktan gelir; güncelleme tarihi yalnız bu yazıda 19 Ekim 2026’dır.
  * **Korunan bilgiler:** Mevcut title, meta description, H1, fiyat tabloları, fiyatlar, adetler ve teslimat bilgileri korunur. GSC sayıları veya fırsat puanları müşteri sayfasına konulmaz; sıralama garantisi verilmez.

* **[2026-10-19] Ekonomik Baskı Fiyatlarının 81 Şehre Uygulanması:**
  * **Kapsam:** Kullanıcı iki örneği inceledikten sonra üç görselli, tamamı tıklanabilir düzeni mevcut 81 şehir sayfası için onayladı. İlk ürün her zaman broşürdür. Diğer iki ürün, fiyatı ve görseli bulunan 14 gerçek ürün arasından plaka koduna göre sabit seçilir; 81 şehirde aynı ürün çifti tekrarlanmaz, ardışık şehirlerde ikinci ve üçüncü konumlar değişir.
  * **Fiyat doğruluğu:** Tutar, ebat ve özellikler mevcut ürün veri kaynaklarından okunur. Kullanıcı seçimiyle 81 şehrin ilk broşür kartında `1CA5` satırının fiyatı ve bilgileri gösterilir. Adet her ürünün kendi paket adedidir. İlave sipariş, özel cm² ve yalnız teklif istenen satırlar başlangıç paket bedeli olarak gösterilmez. Ürün fiyat verileri ve mevcut fiyat tabloları korunur.
  * **SEO ve erişim:** Mevcut şehir başlıkları, meta açıklamaları, canonical, hizmet ve SSS şemaları korunur. Yeni bölüm ilk HTML ve tarayıcıda aynı veriden oluşur. Ürün bağlantıları gerçek HTML bağlantılarıdır; görünür içerik ve görseller hedef ürünü açıklar. Ürün sıralaması şehir bazlı talep veya tek başına SEO özgünlüğü kanıtı olarak sunulmaz. Şube, süre, yerel müşteri veya sektörel iddia uydurulmaz.
  * **Sunum:** Onaylı renkler, belirgin ayraçlar ve turkuaz düğme korunur. Kullanıcı isteğiyle yeni fiyat alanında KDV metni bulunmaz. Mevcut görseller yeniden kullanılır; mobilde aşağıda kalan ikinci ve üçüncü görseller tembel yüklenir. Kullanıcının son seçimiyle 81 şehrin broşür görseli `/images/brosur/tanitim-brosuru-ornegi.webp` olarak belirlenmiştir.

* **[2026-10-19] Kütahya Ekonomik Fiyat Alanı Gezinme Düzeltmesi:**
  * **Karar:** Bölüm başlığı kullanıcı isteğiyle `Ekonomik Baskı Fiyatlarımız` olur. Her ürünün görseli, tablosu ve alt düğmesi tek bir gerçek HTML bağlantısı içinde ilgili ürün fiyat sayfasını açar; iç içe bağlantı veya yalnız JavaScript ile yönlendirme kullanılmaz.
  * **Okunabilirlik:** Satır ve sütun ayraçları ile ürünlerin dış çerçeveleri belirginleştirilir. Turkuaz `Fiyat Listesini İncele` düğmesinin görünümü korunur. Kapsam yalnız Kütahya örneğidir; fiyat verileri ve mevcut ürün fiyat tabloları değişmez.

* **[2026-10-19] Kütahya Üç Görselli Fiyat Tablosu — Karşılaştırma Örneği:**
  * **Kapsam:** Mardin'deki ilk örnek korunur. Kullanıcının görsel referansına göre yalnız `/kutahya-matbaa` için üç ürünlü ikinci örnek hazırlanır; diğer şehirlere yayılmaz.
  * **Sunum:** Mevcut kartvizit, etiket ve magnet görselleri üstte; ürün kodu, özellik, adet ve fiyat bilgileri altta gerçek HTML tablolarında gösterilir. Referanstaki koyu lacivert `#101828`, turkuaz `#29addf` ve beyaz kullanılır. Kullanıcı isteğiyle bu yeni bölümde KDV metni gösterilmez.
  * **Veri ve bağlantı:** Fiyat ve özellikler mevcut ürün verisinden okunur; özel cm² magnet fiyatı paket toplamıyla karıştırılmaz. Bağlantılar gerçek ürün fiyat sayfalarını doğrudan açar. Mevcut fiyat tabloları ve fiyat verileri değiştirilmez; yeni görsel oluşturulmaz.

* **[2026-10-18] Mardin Örnek Fiyat Kartları — Tek Sayfalık Deneme:**
  * **Kapsam:** Kullanıcı önce yalnız bir şehirde incelemek istedi. Kartlar yalnız `/mardin-matbaa` adresinde gösterilir; diğer şehirlere ayrıca talep gelmeden yayılmaz.
  * **Fiyat kaynağı:** Kartvizit ve etiket kartları mevcut `productData.ts` satırlarından 1.000 adetlik ekonomik seçeneği okur. Tutar ve özellikler ayrı kopyalanmaz; mevcut fiyat verisi ve fiyat tabloları değiştirilmez.
  * **Sunum:** Adet, özellik, ürün kodu, toplam baskı bedeli ve mevcut listelerdeki %20 KDV hariç bilgisi birlikte gösterilir. Kargo bedeli ve gönderim planı sipariş sırasında netleştirilir. Her kart ilgili ürünün fiyat sayfasına bağlanır. Genel şehir hizmeti tek ürün için `Product` şemasına dönüştürülmez.

---

* **[2026-10-19] Broşür İlk HTML, Canonical ve Katlama Rehberi Düzeltmesi:**
  * **Kapsam:** `/brosur` mevcut React bileşeniyle prerender edilir ve aynı ağaç hydrate edilir. Ürün içeriği, galeri, fiyat tabloları ve SSS ilk HTML içinde bulunur; yeni eş niyetli URL oluşturulmaz.
  * **Korunan alanlar:** Kullanıcının açık talebiyle Ebat Filtrele düğmelerinin ışıklandırma döngüsü, görünümü ve davranışı; fiyat bölümü, tablo oluşturma kodu, adetler ve ürün fiyat verileri bayt düzeyinde korunur. Title, meta description ve H1 değiştirilmez.
  * **Metadata:** Broşür kendi canonical ve JSON-LD sahibi olduğu için genel legacy kopyası bu rotada üretilmez. SSS ve şemalar ilk HTML ile tarayıcı arasında ortak kaynak kullanır; sabit entity kimlikleriyle fallback şemalar tekilleştirilir. Product şemasına mevcut broşür görseli eklenir; fiyat tutarları değiştirilmez.
  * **İçerik:** A4 iki kırımlı broşürde açık/kapalı ölçü ve panel ayrımı, C-kırım/Z-kırım farkı ile mevcut katlama rehberi ve restoran broşür sayfasına doğal bağlantılar eklenir. Galeri açıklaması örnekleri karşılaştırma kriterlerini açıklar. Yeni görsel, doğrulanmamış teslimat veya hizmet vaadi eklenmez.
  * **Doğrulama:** TypeScript ve production build geçer. Üç mevcut fiyat tablosu ve 40 satır ilk HTML’de bulunur; 12 görünür SSS cevabı ortak FAQPage şemasıyla eşleşir. Canlı yayın ve tarayıcı sonucu ayrıca doğrulanmadan tamamlandı sayılmaz.

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

* **[2026-10-18] Şehir Sayfası Sipariş İçeriği ve İlk HTML:**
  * **Karar:** Yerel sektör varsayımları ve doğrulanmamış fabrika / sabit süre ifadeleri yerine gerçek ürün seçim bilgileri, ürüne göre teklif alanları, dosya / prova onayı ve gönderim planı sunulur. Gerçek süreç aynıysa ortak anlatılır; sırf farklı görünmek için şehir hakkında bilgi uydurulmaz.
  * **Uygulama:** Şehir sayfalarının tam React içeriği ilk HTML’de bulunur ve aynı bileşen hydrate edilir. Service ve görünür SSS aynı veri kaynağından gelir. İçerik kontrolü uydurma paragrafla değil, gerçek 81 HTML çıktısıyla yapılır.
  * **Sınır:** Farklı ürün rehberi bileşimleri yerel arama talebi veya sıralama sonucu kanıtı değildir. Şehir sayfalarının ayrı faydası GSC ve dönüşüm verileriyle ayrıca değerlendirilir. Fiyatlar ve fiyat tabloları korunur.

* **[2026-10-18] Şehir Sayfalarında Genel İşletme Kapsamı (Kullanıcı Düzeltmesi):**
  * **Karar:** Her şehirde tüm işletmelerin matbaa ihtiyaçlarına hizmet verilir. Şehir başlık ve meta açıklamaları kayısı, porselen, seramik, arıcılık gibi yerel sektörlerle sınırlandırılmaz.
  * **Başlık:** Şehir adı + Matbaa + sayfanın görünür içeriğinde gerçekten bulunan birkaç temel ürün. Kullanıcının talebiyle şehirler arasında ürün örnekleri çeşitlendirilir; aynı ürün üçlüsü tekrar edilmez. Ürün seçimi şehre özel hizmet veya talep kanıtı olarak sunulmaz.
  * **H1 ve Açıklama:** Ana başlık genel matbaa ve baskı hizmetlerini kapsar. Açıklama gerçek ürün örnekleri ve teklif adımını özetler. Başlıkta sayılmayan ürünlerin de sunulduğu hizmet kapsamı korunur; ürünler sadece örnektir.
  * **Sınır:** Ürünleri veya kelimeleri çeşitlendirmek, ortak ana gövde sorununun çözüldüğü veya Google sıralamasının artacağı anlamına gelmez. Fiyat listeleri ve fiyat tabloları değiştirilmez.

* **[2026-09-13] Güvenilirlik, İçerik Doğruluğu, Görsel Yönetimi ve Schema Kuralları Güncellemesi (Tüm Eski Çelişkili Kararların Yerine Geçer):**
  * **Geçersiz Kılınan Eski İfadeler:** Eski kararlarda yer alan "fabrika", "doğrudan üretici", "imalat tesisi", "81 ile anlaşmalı kargo", "anlaşmalı kurye", "aracısız fabrika fiyatı", "ücretsiz grafik tasarımı", kesin teslimat süreleri/garantileri ve zorunlu `AggregateRating` hükümleri geçersiz kılınmıştır. Tarihsel kaydın korunması adına eski maddeler silinmemiş olup, bu yeni karar bağlayıcıdır.
  * **Görsel Yönetimi:** Görseller kullanıcı tarafından daha sonra manuel olarak yüklenir. Eksik veya bozuk görselde güvenli placeholder kullanılır. Yeni görsel oluşturulmaz, indirilmez, kopyalanmaz veya dönüştürülmez.
  * **İçerik İddiaları Sınırları:** "Fabrika", "doğrudan üretici", "imalat tesisi", "81 ile anlaşmalı kargo", "anlaşmalı kurye", kesin teslimat, garanti ve benzeri doğrulanmamış iddialar kullanılmaz.
  * **Onaylı Konum İfadesi:** `İstanbul Topkapı 2. Matbaacılar Sitesi hizmet ve koordinasyon noktası`
  * **Onaylı Prova ve Tasarım İfadeleri:** `Baskıya hazır dosyanın teknik kontrolü ve PDF prova kontrolü ücretsizdir.` / `Grafik desteği var.` / `Dijital onay alınmadan baskıya başlanmaz.`
  * **Tasarım Desteği Standart İfadesi:** Ürün sayfalarında müşteriye görünen standart ifade: `Grafik desteği var.` Ücretsiz grafik tasarım iddiası kullanılmaz. `/grafik-tasarim` sayfasının kendi açıklamalarına dokunulmaz.
  * **Üretim ve Teslim Süresi:** Kesin gün vaadi verilmez; `Üretim ve teslim süresi ürün, adet, malzeme ve onay sürecine göre teklif aşamasında paylaşılır.`
  * **Schema Değerlendirmeleri:** Review ve AggregateRating yalnız gerçek, görünür ve doğrulanabilir değerlendirme verisi varsa kullanılabilir. Doğrulanabilir veri yoksa kesinlikle eklenemez.


### 2026-10-19 — Broşür hydration ve JSON-LD sahipliği
- React 19, Helmet içindeki JSON-LD scriptlerini gövde içinde bırakır. Prerender sırasında bu scriptlerin kaldırılması istemci ağacıyla eşleşmeyi bozuyordu.
- Broşür JSON-LD kaynağı yalnız getRouteSEO/RouteSEOHead oldu; sayfa içi scriptler ve eski global yöneticinin broşür kapsamı kaldırıldı. İçerik, title, açıklama ve H1 değişmedi.
- Doğrudan yükleme ve geri gezinmede gerçek hydration, tekil şema/metadata, 12 SSS, fiyat tablosu düğümünün korunması, ebat filtresi ve mevcut ışıklandırma döngüsü CI testine eklendi.
- Fiyat verisi, tablo renderer'ı, fiyat/filtre bölümü ve 700 ms ışıklandırma kodu değişmedi.

### 2026-10-19 — Broşür 65 maddelik inceleme
- Farklı ebat, gramaj ve tirajları tek Product/AggregateOffer ve stokta var beyanıyla göstermek yerine siparişe özel baskı Service + OfferCatalog olarak tanımlandı. 40 tarife kalemi mevcut veri kaynağından salt okunur üretilir; KDV hariç durumu görünür bilgiyle eşleşir. Doğrulanmamış stok ve fiyat bitiş tarihi yoktur.
- Organization logo adresindeki 404 giderildi; adres mevcut iletişim kaydıyla eşlendi. Gerçek paylaşım görseli ölçüsü 1536×1024 olarak düzeltildi.
- Galeri açıklamaları mevcut görsellerin gerçek konusuyla eşleştirildi. Görsel dosyaları ve galeri sayısı değiştirilmedi.
- Mevcut ileri teknik bilgi düğmesinin aria-expanded/aria-controls ilişkisi ve gizli panel hedefi eklendi. Yeni bölüm veya tasarım eklenmedi.
- Yalnız /brosur sitemap lastmod değeri gerçek içerik değişikliği günü 2026-10-19 olarak güncellendi.
- Koruma: fiyat verileri, tablo renderer'ı, tüm fiyat/filtre bölümü ve ışıklandırma kodu ana daldaki sürümle aynı. Testler şema tarifesini satır satır karşılaştırır.
- İnceleme sınırı: PageSpeed API 429 döndü; farklı telefon ekranları ve bağımsız güncel hız ölçümü tamamlanmadan nihai tam puan verilmez.

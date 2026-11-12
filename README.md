# Sıfır Araç Danışmanı

Tamamlanan aşamalar: Figma header, responsive mobil menü ve ana sayfa banner slider.

- `index.html`: header HTML yapısı.
- `assets/scss/style.scss`: düzenlenecek SCSS kaynağı.
- `assets/scss/style.css`: tarayıcının kullandığı derlenmiş çıktı.
- `assets/img/`: Figma’dan alınan logo ve giriş ikonu.
- `assets/fonts/`: yerel Inter 400 ve 700 yazı tipleri.

Live Sass Compiler çıktısını `assets/scss/style.css` yoluna yönlendirin.
İlk önizleme için CSS bir kez derlenmiştir. Sonraki değişiklikleri SCSS üzerinden yapın.

Menü bağlantıları sonraki aşamalar için ayrılmış dosya adlarıdır; hedef sayfalar henüz oluşturulmadı.
Mobil menü bağlantılar ekrana sığmadığında %90 genişlikte panel olarak açılır.
Banner üç görselle Swiper olarak uygulanmıştır; sonraki içerik bölümleri henüz eklenmedi.

Klasörler: `assets/img`, `assets/scss`, `assets/js`, `assets/plugins`, `assets/video`, `assets/fonts`.
`list.html` araç listesi olarak hazırlanmıştır; `detail.html` Opel Grandland detay şablonu olarak hazırlanmıştır. Yayın adresi belirlendiğinde canonical ve sitemap eklenecek.

## Banner ve mobil menü

Banner, yerel Swiper paketi (`assets/plugins/swiper`) ile çalışır. Üç slayt, dokunmatik kaydırma, klavye okları ve tıklanabilir noktalar desteklenir; otomatik oynatma kapalıdır.
Metin HTML içindedir; ilk görsel öncelikli yüklenir, diğerleri lazy-load kullanır.

`assets/js/main.js` menü bağlantılarının doğal genişliğini ölçer; menü sığmadığında hamburger görünür. Panel %90 genişlikte açılır. Overlay tıklaması ve Escape menüyü kapatır; klavye odağı açık menü içinde kalır. Hareket azaltma tercihi desteklenir.

SCSS kaynağı `assets/scss/style.scss`, derlenen çıktı `assets/scss/style.css` olarak korunmuştur.

## Araç fırsatları slider

`vehicle-offers` bölümü Figma’daki Peugeot 408, Nissan X-Trail ve Peugeot Rifter kartlarını içerir. SVG ikonları `assets/img` altında yereldir. Kartlar hover ve klavye odağında vurgulanır.
Swiper kırılma noktaları pencereye değil slider alanına göre hesaplanır: 968px üzerinde 3, 644–967px arasında 2, 644px altında 1 kart. Tüm araçlar görünürken gezinme okları gizlenir.
Banner yazıları yalnızca Swiper parallax veri özelliklerini kullanır; özel SCSS yazı animasyonu kaldırılmıştır.

## Bilgi adımları ve marka sekmeleri

Üç bilgi bloğu ve Figma SVG ikonları eklendi. Marka sekmeleri ek bağımlılık kullanmaz; butonlar, tablist/tabpanel ilişkileri, sağ/sol okları, Home/End ve tek odaklı sekme sırası ile çalışır. Temel desen: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/ .

Varsayılan Peugeot panelinde altı kart statik HTML olarak bulunur. Diğer dokuz markanın içerikleri verilmediği için boş durumları hazırlanmıştır; ilgili panel içine kartlar eklenebilir. Markalar dar ekranda yatay kayar. Araç ızgarası kendi alanının genişliğine göre 3/2/1 sütun olur.

Figma’nın ilk kartı hover örneğidir; sabit seçili tutulmaz. Tüm katalog kartlarının hover/klavye odak durumunda bilgi alanı lacivert, metin beyaz ve fiyat turuncu olur. Üstteki fırsat sliderının kart stilleri korunur.

Figma’nın 3. ve 6. katalog kartlarında model metni 408 olmasına rağmen görseller sırasıyla 208 ve e-308 görünümündedir. Bu aşamada tasarımdaki metin/görsel eşleşmesi korunmuştur.

## Avantajlar bölümü

Lacivert avantajlar alanı eklendi. Kullanıcının iki fotoğrafı CSS grayscale ile gösterilir; fotoğraf dosyalarının asılları korunur. Alt geçiş, 356×540px kart üzerinde 356×302px olacak şekilde yüzde yüksekliğiyle ölçeklenir. `bg-opacity-white.png` iki kez, PNG’nin kendi şeffaflığıyla kullanılır; CSS ile ek opaklık uygulanmaz: solda 236×565px, sağda 259×620px referans ölçülerinin oranları korunur.

1300px altında metin üstte, görseller altta; 700px altında görseller tek sütun olur. Başlıklar ve açıklamalar HTML metnidir. Inter Light yerel font olarak eklenmiştir. Buton/kartlar daha sonra hazırlanacak `avantajlarimiz.html` sayfasını hedefler.

## Haftanın aracı ve fade güncellemesi

Yeni bölüm üç aynı örnek slayttan oluşur. Her slayt kendi üç ikonunu, Nissan Juke görselini, model/fiyat metnini ve butonunu içerir; bağımsız düzenlenebilir. Slider ve ilk banner Swiper `effect: fade`, `fadeEffect.crossFade: true` kullanır. İkon ve yazı hareketleri yalnızca yerel Swiper parallax veri özellikleriyle çalışır, ek SCSS keyframe animasyonu yoktur. Görünmeyen yeni slaytların butonları klavye odağından çıkarılır.

Tablet ve mobilde bloklar yeniden sıralanır. Dekorların masaüstü referansı: sol 236×565, üst0/sol322; sağ259×620, üst80/sol1259 (1600px bölüm içindeki koordinatlar). Sayfa64px sol payıyla Figma'daki sol386 ve1323 konumlarına karşılık gelir. Overlay şeffaf #0b2068’den tam #0b2068’e doğru 356×302 referans oranını korur.

## Son tanıtım bölümü ve footer

Tanıtım metni ve Figma’dan alınan beş görsel eklendi. Galeri 5/3/2 sütuna uyarlanır. Footer; marka logosu, özgün SVG çizgiler, açıklama bloğu, ana menü ve yasal bağlantılardan oluşur; semantik footer elementi main dışında yer alır. Instagram ikonu kullanıcının isteğiyle bağlantısızdır. Copyright yılı 2026’dır.

Tüm görseller yereldir, boyut ve alternatif metinleri tanımlıdır. Menü/yasal bağlantıların hedef sayfaları bu aşamada henüz oluşturulmamıştır. Yayın adresi belli olmadığı için canonical/sitemap/kurum adresi gibi bilgiler uydurulmamıştır. Mobil menü açıkken footer da inert olur.

## Liste sayfası

`list.html` ortak header/footer kopyaları, kullanıcının sağladığı `23feaa3f9742f508718244cf6c6817c08e4b474b.png` sabit bannerı ve sekiz örnek araç kartı içerir. Banner başlığı Araçlarımız’dır; Swiper veya slider bağımlılığı yüklenmez. Ortak JavaScript menüyü bu sayfada Swiper olmadan da çalıştırır.

Izgara kendi alanına göre 4/3/2/1 sütuna geçer (1248/932/616px eşikleri). Sol filtre yoktur; araç listesi üstünde kullanıcının tarif ettiği kategori butonları bulunur. Liste placeholder noindex kaldırılmıştır; başlık, meta açıklama ve tek h1 tanımlanmıştır. Footer hover rengi tüm sayfalarda turuncu, alt çizgisizdir.

Bu aşamada Figma MCP plan okuma sınırına ulaşıldığı için liste bannerının Figma’daki ayrıntılı ölçüleri karşılaştırılamadı; kullanıcı görseliyle responsive sabit banner hazırlanmıştır.

## Araç detayı

`detail.html` Opel Grandland örneğiyle hazırlanmıştır. Ortak header/footer, sabit araç başlığı/fiyat/teknik bilgiler, yalnızca görsel alanında Swiper, donanım listesi, Fancybox video kapağı ve JavaScript gerektirmeyen soru-cevap alanı içerir. Başlık, açıklama, tek h1, içerik yolu, görsel boyut/alt metinleri ve yükleme önceliği tanımlıdır; placeholder noindex kaldırılmıştır. Yayın adresi bilinmediğinden canonical ve gerçek alan adı gerektiren structured data uydurulmamıştır.

Kullanıcının onayıyla tek araç fotoğrafı şimdilik üç slaytta tekrar edilir. Aynı `data-fancybox="vehicle-gallery"` değeri fotoğrafları gruplar. Video bağlantıları ayrı gruplardadır; YouTube iframe’i yalnızca tıklanınca oluşturulur. Video kaynağı Opel Türkiye’nin resmî #GoGrand – Yeni Opel Grandland videosudur: https://www.youtube.com/watch?v=YWbojZVqoMI . Başlık ve yayıncı YouTube oEmbed ile doğrulanmıştır. Video kapağı kullanıcının yerel dosyasıdır.

Fancybox 6.1.15 ve Türkçe çevirisi `assets/plugins/fancybox` altındadır. Kütüphanenin kendi LICENSE.md dosyası korunur. Yerel geliştirme/staging kullanımı ve canlı kullanım lisans koşulları: https://fancyapps.com/pricing/ ve https://fancyapps.com/license/ . Herhangi bir lisans satın alınmadı.

Teknik bilgiler/donanımlar tasarımdaki örnek verilerdir; renk, eklenen kırmızı fotoğrafa göre yazıldı. Gerçek stok verileri yayından önce güncellenmelidir. Bu statik şablon URL’deki `arac` parametresine göre başka araç verisi yüklemez; tüm örnek ürünlere ait dinamik veri entegrasyonu ayrı iştir. İletişim ve tüm sorular bağlantıları sonraki sayfaları hedefler.

Kontrol: gerçek Swiper ve Fancybox dağıtımlarıyla DOM testinde fotoğraf galerisi açıldı, üç öğe görüldü, YouTube iframe’inin doğru video kimliğiyle açıldığı doğrulandı; menü/slider/sekme regresyonları geçti. Gerçek tarayıcıda görsel kontrol yapılmadı.

## Liste kategori filtreleri

Liste üstünde Otomobil, Arazi/SUV/Pickup ve Minivan/Panelvan butonları eklendi. İlk görseldeki tekrarlayan özellik etiketleri yerine, kullanıcının netleştirdiği ikinci görselin başlıkları kullanılır. Başlangıçta tüm sekiz araç görünür. Seçim tek kategoriyi gösterir; aynı butona tekrar basmak seçimi kaldırır. Sonuç sayısı canlı güncellenir, boş sonuç mesajı desteklenir. Kategori verisi her kartın `data-category` alanındadır; filtreler yalnızca `assets/js/list.js` ile liste sayfasında çalışır.

Seçili buton turuncu/beyaz; mevcut yerel ok SVG’si normalde sağ alta, seçiliyken beyaz olarak sağ üste döner. Küçük alanlarda üç buton alt alta gelir. Tüm kartlar ilk HTML içinde kalır; SEO için içerik JavaScript ile sonradan üretilmez.

## İletişim sayfası

`contact.html`, mevcut lacivert/turuncu tasarım diliyle hazırlanmıştır: tek Lorem ipsum adres kartı, info@sifiraracdanismani.com e-posta bağlantısı, statik HTML formu ve İstanbul şehir haritası. Yol tarifi bağlantıları geçici olarak # değerindedir.

Harita, İstanbul şehrini gösteren, API anahtarı gerektirmeyen bir Google Maps iframe’idir. Belirli bir işletme konumunu temsil etmez; lazy-load, erişilebilir başlık ve mobil boyutlar kullanır.

Kullanıcı yalnızca HTML form istedi: action, submit butonu, mailto taslağı, fetch/AJAX veya gönderim JavaScript’i eklenmemiştir. Dört alanın label/name/id/type/autocomplete bilgileri hazırdır; Gönder butonu type=button’dır. Backend daha sonra gönderim adresini ve submit davranışını bağlayacaktır. Ortak main.js sadece mevcut site menüsü için kullanılır.

Index/list/detail sayfalarındaki iletişim bağlantıları contact.html olarak güncellenmiştir; Instagram bağlantısız kalır. Yeni sayfa ve mevcut menü/slider/galeri/filtre regresyonları test edilmiştir. SCSS derlenmiştir. Gerçek tarayıcıda görsel QA yapılmamıştır.

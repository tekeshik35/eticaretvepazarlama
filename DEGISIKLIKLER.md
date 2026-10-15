# Panel v2.1 — Program Sürdürülebilir Yönetim Paneli

Panel, raporun özeti olarak değil, **Program Sürdürülebilir Yönetim Planı'nın**
(BK 12.06.2026, 2026/04) uygulandığı çalışma aracı olarak kurgulandı. Plandaki
PUKÖ döngüsünün her adımına bir ekran karşılık gelir:

| Plan | Panelde |
|---|---|
| §6 Misyon, vizyon, PEA, PÇ'nin belirlenmesi ve güncellenmesi | **Program Kimliği:** düzenlenebilir. Her değişiklik kurul kararıyla kaydedilir, önceki sürüm arşive alınır. |
| §7 Öğretim planının güncellenmesi | **Öğretim Planı:** yarıyıllar, seçmeli havuzları ve Ders–PÇ matrisi düzenlenebilir. "Yeni sürüm başlat" ile eski plan arşivlenir. |
| §8 APG | **APG ve PÇ Ulaşma:** APG tanımları Program Kimliği'nden gelir; sonuçlar yıllık girilir. Sapma ve "2 yıl üst üste sapma" tetikleyicisi gösterilir. |
| §10 PÇ ulaşma | **APG ve PÇ Ulaşma:** dönemlik PÇ ulaşma yüzdeleri. |
| §5 Paydaş katılımı | Paydaşlar, Toplantılar, Anketler, Görüşler sekmeleri ve öğrenci/paydaş sayfası. |
| §9 PUKÖ, kapalı döngü | **İyileştirme Döngüsü:** talep → karar → eylem → kanıt. Ayrıca **Eylem**. |
| §11 Yıllık iş takvimi | **İş Takvimi** |
| §9 Yıllık rapor | **Yıllık Rapor:** paneldeki verilerden derlenir, Word olarak indirilir. |

**Özet** sekmesi artık bir yönetim panosudur. İçinde şunlar var:

- Bu yılın PUKÖ ilerlemesi
- Bu ay yapılacak ve geciken işler
- Paydaş katılımı
- Açık iyileştirme kayıtları
- APG durumu
- Güncel öğretim planından hesaplanan MEDEK şartları

Raporun kopyası olan **Ölçütler/kanıt dizini** menüden kaldırıldı.

## Öğretim planı

- Başlangıç değeri **Ders Kataloğu 27.07.2026** (2026 KATALOG sekmesi). Toplam 124 AKTS; yarıyıllar 32 + 30 + 32 + 30.
- Ders–PÇ matrisi ÖDR'deki katkı düzeyleriyle başlar. Değişen kodlar eşlendi: SETP108 → SETP241 (İhracat Teknikleri, artık mesleki alan seçmelisi) ve SOS210 → SOZ210 (İş Yeri Eğitimi).
- Derslere dört etiket konabilir: Mesleki, PÇ11–14, Dış paydaş, İME. MEDEK şartları bu etiketlerden hesaplanır.

## Öğrenciler ve paydaşlar

Panele yetkisi olmayan herkes Google ile giriş yaptıktan sonra **Öğrenci ve Paydaş
Sayfası**'nı görür. Sayfada üç bölüm var:

1. Güncel öğretim planı (ve arşivdeki önceki planlar)
2. Program hakkında (misyon, vizyon, PEA, PÇ)
3. Görüş bildirme formu

Giriş yapmadan hiçbir şey görünmez. Yönetici planda veya program kimliğinde değişiklik
yapıp kaydettiğinde öğrenci sayfası kendiliğinden güncellenir.

## Yayına alma

1. `index.html`'i Netlify'a yükleyin.
2. `FIRESTORE_KURALLARI.md`'deki kuralları Firebase'e ekleyin. Öğrenci sayfası ve görüş formu bu kurallara bağlıdır.
3. Panele yönetici olarak bir kez girin. Plan ve program kimliği öğrenci sayfasına o anda yayımlanır.

## Veri

Eski veriler silinmedi. Yeni alanlar:

| Alan | Ne tutar |
|---|---|
| `ogretimPlani_v1` | Güncel öğretim planı |
| `ogretimPlaniArsiv_v1` | Önceki planlar |
| `programKimligi_v1` | Program kimliği |
| `programKimligiArsiv_v1` | Program kimliğinin önceki sürümleri |
| `apgSonuclari_v1` | APG sonuçları |
| `pcUlasma_v1` | PÇ ulaşma |
| `iyilestirmeDongusu_v1` | İyileştirme döngüsü |
| `takvimDurum_v1` | İş takvimi durumu |
| `yillikRaporMetinleri_v1` | Yıllık rapor metinleri |
| `kurumZiyaretiTarihi` | Kurum ziyareti tarihi |

Bunlara ek olarak yeni bir doküman (`public/program`) ve yeni bir koleksiyon (`gorusKutusu`) var.

## Geliştirme

`python3 build.py` komutu `src/` klasöründen `index.html`'i üretir:

| Dosya | İçerik |
|---|---|
| `src/katalog-2026.js` | Katalogdan üretilen başlangıç planı (`src/build_katalog.py <excel>`) |
| `src/odr-veri.js` | PEA, PÇ ve APG başlangıç tanımları, ÖDR Ders–PÇ katkı düzeyleri |
| `src/moduller.jsx` | Yönetim paneli modülleri ve öğrenci sayfası |
| `src/app.js` | Panelin ana uygulaması |
| `src/shell.html` | HTML iskeleti |

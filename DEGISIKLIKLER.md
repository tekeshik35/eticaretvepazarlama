# Panel v2.0 — ÖDR 2026 ve Sürdürülebilir Yönetim Planı uyumu (15.10.2026)

Panel, MEDEK'e sunulan ÖDR'de (30.06.2026; ET.K.2.18 ve ET.K.4.9) "Dijital Sürekli
İyileştirme Paneli" olarak gösterilmiştir. Bu sürümde panel, rapora ve Program
Sürdürülebilir Yönetim Planı'na (BK 12.06.2026, 2026/04) göre sadeleştirildi.
Sadece gereken kısımlar eklendi.

## Değişenler

| Sekme | Ne oldu | Dayanak |
|---|---|---|
| Özet | Baştan yazıldı. Akreditasyon durumu, bu ayın takvim işleri, ÖDR'deki öğretim planına göre MEDEK sayısal şartları (132 AKTS), 9 ölçüt, APG özeti. "Müfredat Reform Modülü" ve eski 8 ölçüt kaldırıldı. | ÖDR, Plan §9 |
| Program Kimliği (yeni) | Misyon, vizyon, PEA-1…4, PÇ1–PÇ14 ve PEA ilişkisi, APG tanım kartları. | ÖDR 2.1–2.6, 3.1; BKK 2026/04 |
| Ölçütler | MEDEK v1.1'in 9 ölçütü ve ÖDR alt başlıkları. 2024 puanları, 2024 gözlemi ve alınan önlem. 187 kanıt Drive bağlantılarıyla, aranabilir. Ölçüt başına kurum ziyareti notu. | ÖDR Birleşik Kanıt Dizini |
| Öğretim Planı | ÖDR'deki 2026 planı: 4 yarıyıl, seçmeli havuzları, Ders–PÇ matrisi (1–5). Eski "reform senaryoları" ekranları menüden kaldırıldı. | ÖDR 5.1–5.4 |
| APG ve PÇ Ulaşma (yeni) | Yıllık APG girişi; ilk yıl referans, sonra hedefle karşılaştırma ve "2 yıl üst üste sapma" uyarısı. Dönemlik PÇ1–14 ulaşma (%). 2025-2026 referans değerleri ET.K.2.21'den hazır yüklendi. | Plan §8, §10 |
| İyileştirme Döngüsü (yeni) | Girdi → karar → eylem → çıktı → kanıt zinciri. Döngüye bağlanmamış görüşler listelenir, "Eylem planına ekle" düğmesi var. ÖDR Tablo 4.2.2'deki 6 kapalı döngü hazır yüklendi. | Plan §9, ÖDR 4.2 |
| İş Takvimi (yeni) | Plandaki yıllık iş takvimi ve periyodik işler (16 iş). Yapıldı/ertelendi, tarih ve kanıt işaretlenir; geciken işler Özet'te görünür. | Plan §11 (§5, §7, §9, §10, §12) |
| Yıllık Rapor (yeni) | Paneldeki verilerden otomatik derlenen yıllık değerlendirme raporu; Word olarak indirilir. | Plan §9 |
| Paydaş Portalı (yeni) | Panel yetkisi olmayan ama Google ile giriş yapan kullanıcılar program kimliğini görür ve görüş gönderir. Görüntüleyiciler için "Görüş Bildir" sekmesi var. Yönetici gelen görüşleri Görüşler sekmesinden aktarır. | ÖDR 1.11, 2.7, 4.2 |
| Paydaş Konuları | Menüden kaldırıldı (2024 eski numaralandırmalı kontrol listesiydi). | — |

Değişmeyen sekmeler: Paydaşlar, Sektör Protokolleri, Toplantılar, Anketler,
Görüşler, Eylem, Kullanıcılar, Notlar.

**Veri güvenliği.** Firestore'daki mevcut veriye dokunulmadı. Yeni modüller yeni
alanlara yazar: `apgSonuclari_v1`, `pcUlasma_v1`, `iyilestirmeDongusu_v1`,
`takvimDurum_v1`, `yillikRaporMetinleri_v1`, `olcutNotlari_v1` ve
`kurumZiyaretiTarihi`. Eski müfredat ve matris verileri (`mufredat26_v7` vb.)
yerinde duruyor; yalnızca menüde görünmüyor.

## Yayına alma

1. `index.html`'i Netlify'a yükleyin. eticvepazarlama sitesinde **Deploys → "Drag and drop"**, ya da bu depo Netlify'a bağlıysa `main` dalına birleştirin.
2. Paydaş Portalı'nın görüş kaydedebilmesi için `FIRESTORE_KURALLARI.md`'deki kuralı ekleyin. Tek seferlik, yaklaşık 2 dakika sürer.

## Geliştirme

Kaynaklar `src/` klasöründe. `index.html` bunlardan üretilir:

```
npm install
python3 build.py
```

- `src/odr-veri.js` — ÖDR tablolarından üretilen veriler (PÇ, PEA, APG, öğretim planı, Ders–PÇ, 187 kanıt).
- `src/moduller.jsx` — yeni sekmeler ve Paydaş Portalı.
- `src/app.js` — panelin ana uygulaması (canlı sürümden alındı; menü ve yönlendirme güncellendi).
- `src/shell.html` — HTML iskeleti (Firebase ayarları, CDN'ler).

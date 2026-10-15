/* ============================================================
   ÖDR 2026 + PROGRAM SÜRDÜRÜLEBİLİR YÖNETİM PLANI UYUM MODÜLLERİ
   ------------------------------------------------------------
   Bu dosyadaki bileşenler, panelin MEDEK'e sunulan ÖDR (30.06.2026)
   ve Program Sürdürülebilir Yönetim Planı (BK 12.06.2026, 2026/04)
   ile birebir uyumlu çalışan kısımlarıdır. Veriler window.ODR'den
   (src/odr-veri.js) gelir; kullanıcı girdileri useKayitliState ile
   panelin tek Firestore dokümanında (panel/main) saklanır.
   Kaynak: src/moduller.jsx  →  build.py ile index.html'e gömülür.
   ============================================================ */

const { useState: uS, useMemo: uM, useEffect: uE } = React;
const O = window.ODR;

/* ---------- Program kimliği (BK 2026/04, Ek-1) ---------- */
const PROGRAM_MISYON =
  "Dijital ekonominin gerektirdiği e-ticaret, dijital pazarlama ve marka iletişimi alanlarında kuramsal ve uygulamalı bilgilerle donatılmış, mesleki etik ve hukuki sorumluluk bilinci gelişmiş, iletişim-takım çalışması-girişimcilik yetkinliklerine sahip ön lisans mezunları yetiştirmek ve sektör paydaşlarıyla iş birliği içinde uygulamalı eğitim sunmak.";
const PROGRAM_VIZYON =
  "Sektörle iş birliği içinde, uygulamalı eğitim odaklı, akreditasyon ölçütleri ve güncel sektörel beklentilerle uyumlu nitelikli mezunlar yetiştiren, kalitesini sürekli geliştiren saygın bir ön lisans programı olmak.";

/* ---------- MEDEK v1.1 — 9 ölçüt (ÖDR yapısı) ---------- */
const OLCUTLER_9 = [
  { no: 1, ad: "Öğrenciler", puan2024: 2, gozlem: "Önceki öğrenmenin tanınması, kurumsal iş birlikleri, öğrenci hareketliliği ve ölçme-değerlendirmede rubrik kullanımı gelişmeye açıktı.", onlem: "Önceki Öğrenmenin Tanınması Yönergesi; Danışma Kurulu ile sektör işbirliği niyet beyanları ve staj protokolleri; Erasmus+/Farabi/Mevlâna hareketliliği; DÖÇ-PÇ ilişki matrisi ve puanlı rubrik.",
    alt: ["1.1 Öğrencilerin akademik yeterlilik düzeyi", "1.2 Öğrenci kabul göstergelerinin izlenmesi", "1.3 Kabul süreçlerine ilişkin yazılı prosedürler", "1.4 Önceki öğrenimlerin kredilendirilmesi", "1.5 Öğrenci merkezli öğretim", "1.6 İş birlikleri ve protokoller", "1.7 Öğrenci hareketliliği", "1.8 Yetkinlik temelli öğretim ve ölçme", "1.9 Akademik gelişim ve kariyer danışmanlığı", "1.10 Ders başarısının izlenmesi ve rehberlik", "1.11 Öğrenci geri bildirim mekanizmaları", "1.12 Başarının şeffaf, adil ve tutarlı ölçülmesi", "1.13 Mezuniyet kararı ve doğrulama"] },
  { no: 2, ad: "Program Eğitim Amaçları", puan2024: 2, gozlem: "Eğitim amaçlarına ulaşmayı belirleyen ölçme-değerlendirme sistemi ve sistematik izleme yeterince tanımlı değildi; tanımlı misyon-vizyon eksikti.", onlem: "Her PEA ile eşleştirilmiş APG seti ve mezun/işveren anketleri; PUKÖ esaslı yıllık izleme; BKK (2026/04) ile kabul edilmiş misyon, vizyon, PEA ve PÇ.",
    alt: ["2.1 Eğitim amaçlarının tanımı ve paylaşımı", "2.2 Anahtar performans göstergeleri (APG)", "2.3.1 PEA'nın MEDEK ile uyumu", "2.3.2 PEA'nın üniversite misyon-vizyonu ile uyumu", "2.3.3 PEA'nın MYO misyon-vizyonu ile uyumu", "2.4.1 PEA'ya nasıl ulaşılacağı", "2.4.2 PEA ölçme-değerlendirme sistemi", "2.5 PEA ulaşma düzeyinin sistematik izlenmesi", "2.6.1 Tanımlı misyon ve vizyon", "2.6.2 Misyon-vizyonun kamuoyuyla paylaşılması", "2.7.1 İç paydaş katılımı", "2.7.2 Dış paydaş katılımı"] },
  { no: 3, ad: "Program Çıktıları", puan2024: 2, gozlem: "Program çıktılarının ölçülmesi ve izlenmesine ilişkin uygulamalar zayıftı.", onlem: "Tüm dersleri kapsayan Ders-PÇ ilişki matrisi; DÖÇ-PÇ ilişkisinin ders bilgi paketlerinde tanımlanması; rubrik temelli, çıktı odaklı ölçme.",
    alt: ["3.1.1 PÇ belirleme yöntemi", "3.1.2 Yöntemin işletilmesi", "3.1.3 PÇ–PEA tutarlılığı", "3.1.4 PÇ'lerin MEDEK çıktılarını kapsaması", "3.2.1 PÇ ulaşma düzeyi yönteminin tanımı", "3.2.2 Yöntemin işletilmesi (sınav ve ödev)"] },
  { no: 4, ad: "Sürekli İyileştirme", puan2024: 2, gozlem: "Sürekli iyileştirme mekanizmaları yeterince tanımlı ve belgeli değildi.", onlem: "Sürdürülebilir Yönetim Planı (PUKÖ); Danışma ve İstişare Kurulu geri bildiriminin karara dönüştüğü kapalı döngü; kurumsal KYS (ISO 9001) ve Birim Eğitim Komisyonu.",
    alt: ["4.1 DÖÇ ve PÇ'nin izlenmesi, değerlendirilmesi ve iyileştirilmesi", "4.2 Paydaş geri bildirimlerinin iyileştirmede kullanılması", "4.3 Mezun izleme verilerinin analizi"] },
  { no: 5, ad: "Öğretim Planı", puan2024: 3, alt: ["5.1 Mesleki dersler ve programa özgü çıktıları sağlayan dersler", "5.2 Dış paydaş önerilerini dikkate alan dersler", "5.3 İşletmede mesleki eğitim, staj, uygulamalı dersler", "5.4 Programa özgü ölçütlerin karşılanması", "5.5 AKTS iş yükü ve kamuoyu ile paylaşım", "5.6 Öğretim planının uygulanması ve iyileştirilmesi"] },
  { no: 6, ad: "Öğretim Kadrosu", puan2024: 3, alt: ["6.1 Kadronun niceliği ve niteliği", "6.2 Teşvik ve ödüllendirme", "6.3 Alım ve yükseltmede tanımlı sistem", "6.4 Adil ve şeffaf ders dağılımı"] },
  { no: 7, ad: "Altyapı", puan2024: 4, myo: true, alt: ["7.1 Eğitim ortamları ve laboratuvarlar", "7.2 Ders dışı etkinlik alanları", "7.3 Güvenlik, İSG ve ilk yardım", "7.4 Bilgiye erişim", "7.5 Özel gereksinimli öğrenciler", "7.6 BİT altyapısı"] },
  { no: 8, ad: "Yönetim ve İdari Yapı", puan2024: 3, myo: true, alt: ["8.1 Yönetim modeli ve organizasyon", "8.2 İnsan kaynakları yönetimi", "8.3 Hizmet içi eğitim", "8.4 Hesap verebilirlik ve kamuoyu"] },
  { no: 9, ad: "Programa Özgü Ölçütler", puan2024: 3, alt: ["9.1 Derslerin ölçme-değerlendirme yoluyla programa özgü ölçütleri sağlaması"] },
];

/* ---------- Yönetim Planı §11 Yıllık İş Takvimi + §3/§9/§10/§12 periyodik işler ----------
   ay: akademik yıl içi ay numarası (Eylül=9 ... Ağustos=8). bas/bit takvim ayı. */
const IS_TAKVIMI = [
  { id: "t01", bas: 9, bit: 10, is: "Yeni öğrenci oryantasyonunda misyon-vizyon-PEA tanıtımı", sorumlu: "Bölüm Başkanlığı", kaynak: "Plan §11", kanit: "Oryantasyon sunumu, fotoğraf", olcut: 2, pukö: "Uygula" },
  { id: "t02", bas: 9, bit: 10, is: "PUKÖ-Planla: misyon-vizyon, PEA, PÇ, APG hedeflerinin gözden geçirilmesi ve yıllık eylem planı", sorumlu: "Bölüm Kurulu", kaynak: "Plan §9", kanit: "Bölüm Kurulu kararı + eylem planı", olcut: 4, pukö: "Planla" },
  { id: "t03", bas: 9, bit: 10, is: "Güz yarıyılı ders bilgi paketlerinin güncellenmesi; ölçme yöntemlerinin öğrencilere duyurulması", sorumlu: "Program Öğretim Elemanları / BEK", kaynak: "Plan §7, §10", kanit: "Bologna ekran görüntüsü", olcut: 5, pukö: "Uygula" },
  { id: "t04", bas: 10, bit: 12, is: "Güz yarıyılı öğrenci temsilcisi / İstişare Kurulu görüşmesi", sorumlu: "Bölüm Başkanlığı", kaynak: "Plan §5", kanit: "Toplantı tutanağı", olcut: 2, pukö: "Uygula" },
  { id: "t05", bas: 11, bit: 12, is: "Yıllık raporun hazırlanması (APG sonuçları, paydaş geri bildirimleri, PÇ ulaşma)", sorumlu: "Program Öğretim Elemanları", kaynak: "Plan §9", kanit: "Yıllık rapor taslağı", olcut: 4, pukö: "Kontrol Et" },
  { id: "t06", bas: 12, bit: 12, is: "Yıllık raporun Bölüm Kurulu'nda görüşülerek onaylanması ve web sayfasında yayımlanması", sorumlu: "Bölüm Kurulu", kaynak: "Plan §9, §11, §13", kanit: "BK kararı + web bağlantısı", olcut: 4, pukö: "Önlem Al" },
  { id: "t07", bas: 1, bit: 2, is: "Güz dönemi Bölüm Kurulu: ders değerlendirme anketlerinin görüşülmesi", sorumlu: "Bölüm Kurulu", kaynak: "Plan §11", kanit: "BK tutanağı", olcut: 4, pukö: "Kontrol Et" },
  { id: "t08", bas: 1, bit: 2, is: "Güz dönemi DÖÇ/PÇ ulaşma verilerinin derslerden toplanması", sorumlu: "Ders sorumluları", kaynak: "Plan §10", kanit: "PÇ ulaşma raporu", olcut: 3, pukö: "Kontrol Et" },
  { id: "t09", bas: 2, bit: 3, is: "Bahar yarıyılı ders bilgi paketlerinin güncellenmesi", sorumlu: "Program Öğretim Elemanları / BEK", kaynak: "Plan §7, §10", kanit: "Bologna ekran görüntüsü", olcut: 5, pukö: "Uygula" },
  { id: "t10", bas: 3, bit: 4, is: "Öğrenci, mezun ve işveren memnuniyet anketlerinin uygulamaya açılması", sorumlu: "Program Öğretim Elemanları", kaynak: "Plan §5, §11", kanit: "Anket bağlantısı / yanıt sayıları", olcut: 2, pukö: "Uygula" },
  { id: "t11", bas: 3, bit: 5, is: "Bahar yarıyılı öğrenci temsilcisi / İstişare Kurulu görüşmesi", sorumlu: "Bölüm Başkanlığı", kaynak: "Plan §5", kanit: "Toplantı tutanağı", olcut: 2, pukö: "Uygula" },
  { id: "t12", bas: 5, bit: 6, is: "Program Danışma Kurulu olağan toplantısı", sorumlu: "Bölüm Başkanlığı", kaynak: "Plan §4, §11", kanit: "DK tutanağı + karar listesi", olcut: 2, pukö: "Kontrol Et" },
  { id: "t13", bas: 5, bit: 6, is: "Bahar dönemi Bölüm Kurulu; anket ve APG sonuçlarının değerlendirilmesi", sorumlu: "Bölüm Kurulu", kaynak: "Plan §8, §11", kanit: "BK tutanağı", olcut: 4, pukö: "Önlem Al" },
  { id: "t14", bas: 6, bit: 7, is: "Bahar dönemi DÖÇ/PÇ ulaşma verilerinin toplanması", sorumlu: "Ders sorumluları", kaynak: "Plan §10", kanit: "PÇ ulaşma raporu", olcut: 3, pukö: "Kontrol Et" },
  { id: "t15", bas: 6, bit: 6, is: "Sürdürülebilir Yönetim Planı'nın yıllık gözden geçirilmesi (değişiklik varsa yeni versiyon)", sorumlu: "Bölüm Kurulu", kaynak: "Plan §12", kanit: "BK kararı", olcut: 4, pukö: "Önlem Al" },
  { id: "t16", bas: 7, bit: 8, is: "Web sayfası ve Bologna paketinin güncellenmesi (misyon, PEA, PÇ, öğretim planı, yıllık rapor özeti)", sorumlu: "Bölüm Başkanlığı", kaynak: "Plan §11, §13", kanit: "Web ekran görüntüsü", olcut: 2, pukö: "Önlem Al" },
];
const AY_ADLARI = ["", "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
const AKADEMIK_AY_SIRA = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8];

const DONGU_KAYNAK_TURLERI = ["Danışma Kurulu", "İstişare Kurulu", "Bölüm Kurulu", "Paydaş görüşü (panel)", "Yazılı paydaş görüşü", "Anket", "APG sonucu", "PÇ ulaşma sonucu", "Kurumsal (YÖK/Rektörlük/BEK)", "Diğer"];
const DONGU_DURUMLAR = [
  { id: "acik", ad: "Açık (girdi kaydedildi)", renk: "rose" },
  { id: "karar", ad: "Karara bağlandı", renk: "amber" },
  { id: "uygulama", ad: "Uygulanıyor", renk: "blue" },
  { id: "kapandi", ad: "Kapandı (kanıtlı)", renk: "emerald" },
];
const DONGU_BASLANGIC = [
  { id: "d-odr-1", tarih: "2025-06-26", kaynakTur: "Danışma Kurulu", kaynak: "Danışma Kurulu 2025/1", girdi: "E-Ticaret Operasyonları Yönetimi dersinin müfredata eklenmesi", karar: "Müfredat Değişikliği — YKK 04.06.2026/07", cikti: "Ders, öğretim planına eklendi", kanit: "ET.K.4.21; ET.K.4.22", durum: "kapandi", kapanisTarihi: "2026-06-30" },
  { id: "d-odr-2", tarih: "2025-06-26", kaynakTur: "Danışma Kurulu", kaynak: "Danışma Kurulu 2025/1", girdi: "Yapay zekâ kullanımına yönelik ders açılması", karar: "Müfredat Değişikliği — YKK 04.06.2026/07", cikti: "Yapay Zekâ Okuryazarlığı dersi öğretim planına eklendi ve alanında uzman öğretim elemanı görevlendirildi", kanit: "ET.K.4.21; ET.K.4.22; ET.K.4.24", durum: "kapandi", kapanisTarihi: "2026-06-30" },
  { id: "d-odr-3", tarih: "2025-06-26", kaynakTur: "Danışma Kurulu", kaynak: "Danışma Kurulu 2025/1", girdi: "İş Yeri Eğitimi/staj için aranan not ortalaması koşulunun 2,00'a indirilmesi", karar: "", cikti: "Koşul 2,00'a indirilerek uygulandı", kanit: "ET.K.4.21", durum: "kapandi", kapanisTarihi: "2026-06-30" },
  { id: "d-odr-4", tarih: "2025-06-26", kaynakTur: "Danışma Kurulu", kaynak: "Danışma Kurulu 2025/1", girdi: "E-Ticaret Mevzuatı dersine ürün güvenliği konusunun eklenmesi", karar: "", cikti: "Konu derse eklendi ve rubrikli Ürün Güvenliği Vaka Raporu ödevi tasarlandı", kanit: "ET.K.4.21; ET.K.4.4", durum: "kapandi", kapanisTarihi: "2026-06-30" },
  { id: "d-odr-5", tarih: "2025-06-26", kaynakTur: "Danışma Kurulu", kaynak: "Danışma Kurulu 2025/1", girdi: "Öğretim elemanı kadrosunun e-ticaret alanına uygun biçimde zenginleştirilmesi", karar: "", cikti: "Bölümce her yıl ilgili kadro talepleri ve alana uygun ders görevlendirme talepleri yapılmaktadır", kanit: "ET.K.4.21; ET.K.4.24", durum: "uygulama" },
  { id: "d-odr-6", tarih: "2026-05-05", kaynakTur: "İstişare Kurulu", kaynak: "İstişare Kurulu 05.05.2026; YÖK İşletmede Mesleki Eğitim Modeli", girdi: "3+1 İşletmede Mesleki Eğitim modelinin tüm programlarda zorunlu hâle getirilmesi", karar: "Müfredat Değişikliği — YKK 04.06.2026/07", cikti: "Model 2026-2027'den itibaren yeni kayıtlar için zorunlu; 4. yarıyıl tamamen işyeri eğitimi olarak yapılandırıldı", kanit: "ET.K.4.22; ET.K.4.37", durum: "kapandi", kapanisTarihi: "2026-06-30" },
];


/* 2025-2026 referans değerleri: Mezun ve İşveren Anketleri Program Düzeyi Değerlendirme Raporu (ET.K.2.21, ET.K.4.33) */
const APG_KAYNAK_2526 = "Mezun ve İşveren Anketleri Program Düzeyi Değerlendirme Raporu 2025-2026 (ET.K.2.21)";
const APG_BASLANGIC = {
  "2025-2026": {
    "APG-1.1": { deger: "44", not: APG_KAYNAK_2526 },
    "APG-1.2": { deger: "75", not: APG_KAYNAK_2526 },
    "APG-2.1": { deger: "4.6", not: APG_KAYNAK_2526 },
    "APG-3.1": { deger: "4.6", not: APG_KAYNAK_2526 },
    "APG-4.1": { deger: "33", not: APG_KAYNAK_2526 },
    "APG-4.2": { deger: "22", not: APG_KAYNAK_2526 },
  },
};

const PAYDAS_PORTAL_TURLERI = ["Öğrenci", "Mezun", "Sektör temsilcisi / işveren", "Danışma Kurulu üyesi", "Öğretim elemanı", "Diğer"];
const PAYDAS_PORTAL_KONULARI = ["Öğretim planı ve dersler", "İş Yeri Eğitimi / staj", "Program çıktıları ve yetkinlikler", "Akademik danışmanlık", "Sektör iş birliği", "Altyapı ve olanaklar", "Diğer"];

/* ---------- Yardımcılar ---------- */
const akademikYil = (d = new Date()) => {
  const y = d.getFullYear();
  return d.getMonth() + 1 >= 9 ? `${y}-${y + 1}` : `${y - 1}-${y}`;
};
const yilListesi = () => {
  const simdi = akademikYil();
  const bas = parseInt(simdi.slice(0, 4), 10);
  return [`${bas - 1}-${bas}`, simdi, `${bas + 1}-${bas + 2}`];
};
// Akademik yılın bir takvim ayına karşılık gelen tarihi (ay sonu)
const akademikAyBitis = (yil, ay) => {
  const bas = parseInt(yil.slice(0, 4), 10);
  const takvimYili = ay >= 9 ? bas : bas + 1;
  return new Date(takvimYili, ay, 0, 23, 59);
};
const akademikAyBaslangic = (yil, ay) => {
  const bas = parseInt(yil.slice(0, 4), 10);
  const takvimYili = ay >= 9 ? bas : bas + 1;
  return new Date(takvimYili, ay - 1, 1);
};
const tarihTR = (s) => {
  if (!s) return "—";
  const d = new Date(s);
  if (isNaN(d)) return s;
  return d.toLocaleDateString("tr-TR");
};
const odrId = (on) => on + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const mesleki = (d) => /^SETP|^SOZ109|^SOZ117|^SOS210/.test(d.kod || "");
const kanitBul = (kod) => {
  const o = kod.split(".")[2];
  return ((O.KANIT || {})[o] || []).find((k) => k.kod === kod);
};

const RENK = {
  rose: "border-rose-800/60 bg-rose-950/30 text-rose-300",
  amber: "border-amber-800/60 bg-amber-950/30 text-amber-300",
  blue: "border-blue-800/60 bg-blue-950/30 text-blue-300",
  emerald: "border-emerald-800/60 bg-emerald-950/30 text-emerald-300",
  slate: "border-slate-700 bg-slate-900/40 text-slate-300",
  purple: "border-purple-800/60 bg-purple-950/30 text-purple-300",
};
const puanRenk = (p) => (p >= 4 ? "emerald" : p === 3 ? "amber" : "rose");

function Rozet({ renk = "slate", children, className = "" }) {
  return <span className={`inline-flex items-center gap-1 whitespace-nowrap text-[11px] font-mono px-2 py-0.5 rounded border ${RENK[renk]} ${className}`}>{children}</span>;
}
function Kart({ baslik, sag, children, className = "" }) {
  return (
    <section className={`border border-slate-800 bg-slate-900/40 rounded-lg ${className}`}>
      {(baslik || sag) && (
        <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-slate-800 flex-wrap">
          <h3 className="font-display text-lg font-semibold text-slate-100">{baslik}</h3>
          {sag}
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}
function SekmeBaslik({ baslik, alt, sag }) {
  return (
    <div className="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h2 className="font-display text-3xl font-semibold">{baslik}</h2>
        {alt && <p className="text-sm text-slate-400 mt-1 max-w-3xl">{alt}</p>}
      </div>
      {sag}
    </div>
  );
}
function YilSecici({ yil, setYil }) {
  return (
    <select value={yil} onChange={(e) => setYil(e.target.value)} className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm">
      {yilListesi().map((y) => (
        <option key={y} value={y}>{y} akademik yılı</option>
      ))}
    </select>
  );
}
const girdiSinif = "w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm focus:border-blue-600 outline-none";
function KanitLink({ kod }) {
  const k = kanitBul(kod.trim());
  if (!k || !k.url) return <span className="font-mono text-xs text-slate-400">{kod}</span>;
  return <a href={k.url} target="_blank" rel="noopener" title={k.ad} className="font-mono text-xs text-blue-400 hover:underline">{kod}</a>;
}
function KanitMetni({ metin }) {
  if (!metin) return <span className="text-slate-600">—</span>;
  const parcalar = metin.split(/(ET\.K\.\d\.\d+)/g);
  return <span className="text-xs">{parcalar.map((p, i) => (/^ET\.K\.\d\.\d+$/.test(p) ? <KanitLink key={i} kod={p} /> : /^https?:\/\//.test(p.trim()) ? <a key={i} href={p.trim()} target="_blank" rel="noopener" className="text-blue-400 hover:underline">bağlantı</a> : <span key={i} className="text-slate-400">{p}</span>))}</span>;
}

/* ---------- Ortak hesaplar ---------- */
const ogretimPlaniOzet = () => {
  const m = O.MUFREDAT;
  const toplam = m.reduce((s, d) => s + d.akts, 0);
  const meslekiZorunlu = m.filter(mesleki).reduce((s, d) => s + d.akts, 0);
  const masSlot = m.filter((d) => d.slot && /Mesleki Alan/.test(d.ad)).reduce((s, d) => s + d.akts, 0);
  const pocToplam = O.POC_DERSLER.reduce((s, d) => s + d.akts, 0);
  const disPaydas = O.DIS_PAYDAS_DERS.reduce((s, d) => s + d.akts, 0);
  const ime = m.filter((d) => d.kod === "SOS210").reduce((s, d) => s + d.akts, 0);
  const donem = [1, 2, 3, 4].map((d) => m.filter((x) => x.donem === d).reduce((s, x) => s + x.akts, 0));
  return { toplam, mesleki: meslekiZorunlu + masSlot, pocToplam, disPaydas, ime, donem };
};
const SAYISAL_SARTLAR_ODR = () => {
  const o = ogretimPlaniOzet();
  return [
    { kod: "5.1", baslik: "Alana özgü mesleki dersler", esik: 60, mevcut: o.mesleki, not: "Zorunlu mesleki dersler + 4 mesleki alan seçmelisi + İş Yeri Eğitimi" },
    { kod: "5.1", baslik: "Programa özgü çıktıları (PÇ11-14) sağlayan dersler", esik: 20, mevcut: o.pocToplam, not: "ÖDR Tablo 9.1 (zorunlu dersler)" },
    { kod: "5.2", baslik: "Dış paydaş önerilerini dikkate alan dersler", esik: 5, mevcut: o.disPaydas, not: "ÖDR Tablo 5.2" },
    { kod: "5.3", baslik: "İşletmede mesleki eğitim / staj / uygulamalı", esik: 15, mevcut: o.ime, not: "3+1 model, 4. yarıyıl İş Yeri Eğitimi" },
    { kod: "Genel", baslik: "Toplam AKTS (4 yarıyıl)", esik: 120, mevcut: o.toplam, not: `Yarıyıllar: ${o.donem.join(" + ")}` },
  ];
};
// APG değerlendirme: { durum: 'veri_yok'|'referans'|'ulasti'|'sapma', ... }
const apgDegerlendir = (apg, sonuclar, yil) => {
  const yillar = Object.keys(sonuclar || {}).filter((y) => sonuclar[y] && sonuclar[y][apg.kod] && sonuclar[y][apg.kod].deger !== "" && sonuclar[y][apg.kod].deger != null).sort();
  const v = sonuclar?.[yil]?.[apg.kod];
  if (!v || v.deger === "" || v.deger == null) return { durum: "veri_yok" };
  const deger = parseFloat(String(v.deger).replace(",", "."));
  if (isNaN(deger)) return { durum: "veri_yok" };
  if (yillar[0] === yil && v.referans !== false) return { durum: "referans", deger };
  const ulasti = deger >= apg.hedef.deger;
  const onceki = yillar.filter((y) => y < yil).pop();
  let ikiYilSapma = false;
  if (!ulasti && onceki) {
    const od = parseFloat(String(sonuclar[onceki][apg.kod].deger).replace(",", "."));
    ikiYilSapma = !isNaN(od) && od < apg.hedef.deger && yillar[0] !== onceki;
  }
  return { durum: ulasti ? "ulasti" : "sapma", deger, ikiYilSapma };
};
const APG_DURUM_ROZET = {
  veri_yok: ["slate", "Veri girilmedi"],
  referans: ["blue", "Referans yılı"],
  ulasti: ["emerald", "Hedefe ulaşıldı"],
  sapma: ["rose", "Hedeften sapma"],
};

/* ============================================================
   1) ÖZET
   ============================================================ */
function OzetSekmesiODR({ duzenlemeYetkisi, setAktifSekme }) {
  const [gorevler] = useKayitliState("gorevler", GOREVLER_INIT);
  const [gorusler] = useKayitliState("paydasGorusleri_v1", []);
  const [toplantilar] = useKayitliState("toplantilar", []);
  const [dongu] = useKayitliState("iyilestirmeDongusu_v1", DONGU_BASLANGIC);
  const [takvimDurum] = useKayitliState("takvimDurum_v1", {});
  const [apgSonuc] = useKayitliState("apgSonuclari_v1", APG_BASLANGIC);
  const [ziyaret, setZiyaret] = useKayitliState("kurumZiyaretiTarihi", "");
  const yil = akademikYil();
  const simdi = new Date();
  const ay = simdi.getMonth() + 1;
  const sartlar = SAYISAL_SARTLAR_ODR();
  const td = takvimDurum[yil] || {};
  const buAy = IS_TAKVIMI.filter((t) => akademikAyBaslangic(yil, t.bas) <= simdi && akademikAyBitis(yil, t.bit) >= simdi && td[t.id]?.durum !== "yapildi");
  const geciken = IS_TAKVIMI.filter((t) => akademikAyBitis(yil, t.bit) < simdi && td[t.id]?.durum !== "yapildi");
  const g = { yapildi: 0, devam: 0, bekliyor: 0 };
  (gorevler || []).forEach((x) => (g[x.durum] = (g[x.durum] || 0) + 1));
  const bagliGorusIdleri = new Set((dongu || []).map((d) => d.gorusId).filter(Boolean));
  const acikGorus = (gorusler || []).filter((x) => !x.arsiv && !bagliGorusIdleri.has(x.id)).length;
  const dAcik = (dongu || []).filter((d) => d.durum !== "kapandi").length;
  const buYilToplanti = (toplantilar || []).filter((t) => t.tarih && akademikYil(new Date(t.tarih)) === yil).length;
  const gunKaldi = Math.ceil((new Date("2026-12-31") - simdi) / 864e5);
  const Git = ({ id, children }) => <button onClick={() => setAktifSekme(id)} className="text-xs text-blue-400 hover:text-blue-300">{children} →</button>;

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-lg border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 p-7">
        <div className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400 mb-3">Akreditasyon Durumu</div>
        <h1 className="font-display text-3xl md:text-4xl font-semibold leading-tight">Öz Değerlendirme Raporu sunuldu<span className="text-slate-400"> · sırada kurum ziyareti ve yıllık izleme</span></h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          {[
            ["Mevcut akreditasyon", "Koşullu · 01.01.2025–31.12.2026", gunKaldi > 0 ? `${gunKaldi} gün kaldı` : "Süre doldu", "amber"],
            ["ÖDR 2026", "MEDEK'e sunuldu · 30.06.2026", "9 ölçüt · 187 kanıt", "emerald"],
            ["Kurum ziyareti", ziyaret ? tarihTR(ziyaret) : "Tarih bekleniyor", "MEDEK değerlendirme takımı", ziyaret ? "blue" : "slate"],
            ["Yıllık rapor", `${yil} · Aralık`, "Plan §9 — Bölüm Kurulu onayı", "purple"],
          ].map(([e, d, a, r]) => (
            <div key={e} className={`rounded border p-3 ${RENK[r]}`}>
              <div className="text-[10px] font-mono uppercase tracking-wider opacity-80">{e}</div>
              <div className="text-sm font-semibold text-slate-100 mt-1">{d}</div>
              <div className="text-xs opacity-80 mt-0.5">{a}</div>
            </div>
          ))}
        </div>
        {duzenlemeYetkisi && (
          <label className="mt-4 flex items-center gap-2 text-xs text-slate-400">
            Kurum ziyareti tarihi:
            <input type="date" value={ziyaret || ""} onChange={(e) => setZiyaret(e.target.value)} className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200" />
          </label>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Kart baslik={`Bu dönem yapılacaklar · ${AY_ADLARI[ay]}`} sag={<Git id="takvim">İş takvimi</Git>} className="lg:col-span-2">
          {buAy.length === 0 && geciken.length === 0 && <p className="text-sm text-slate-400">Bu ay için bekleyen takvim işi yok.</p>}
          <ul className="space-y-2">
            {geciken.map((t) => (
              <li key={t.id} className="flex gap-3 items-start text-sm"><Rozet renk="rose">Gecikti</Rozet><span className="text-slate-200">{t.is}<span className="text-slate-500"> · {AY_ADLARI[t.bas]}{t.bit !== t.bas ? "–" + AY_ADLARI[t.bit] : ""}</span></span></li>
            ))}
            {buAy.map((t) => (
              <li key={t.id} className="flex gap-3 items-start text-sm"><Rozet renk="amber">Bu ay</Rozet><span className="text-slate-200">{t.is}<span className="text-slate-500"> · {t.sorumlu}</span></span></li>
            ))}
          </ul>
        </Kart>
        <Kart baslik="Sürekli iyileştirme" sag={<Git id="dongu">Döngü</Git>}>
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between"><dt className="text-slate-400">Döngüde açık kayıt</dt><dd className="font-mono">{dAcik}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-400">Döngüye bağlanmamış görüş</dt><dd className={`font-mono ${acikGorus ? "text-amber-300" : ""}`}>{acikGorus}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-400">Bu yıl kurul/paydaş toplantısı</dt><dd className="font-mono">{buYilToplanti}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-400">Eylem planı</dt><dd className="font-mono text-xs">{g.yapildi} yapıldı · {g.devam} devam · {g.bekliyor} bekliyor</dd></div>
          </dl>
        </Kart>
      </div>

      <Kart baslik="MEDEK sayısal şartları — ÖDR 2026 öğretim planı" sag={<Git id="ogretim">Öğretim planı</Git>}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-[10px] font-mono uppercase text-slate-500 text-left"><th className="py-2 pr-3">Ölçüt</th><th className="pr-3">Şart</th><th className="pr-3 text-right">Eşik</th><th className="pr-3 text-right">ÖDR</th><th className="text-right">Durum</th></tr></thead>
            <tbody>
              {sartlar.map((s, i) => (
                <tr key={i} className="border-t border-slate-800">
                  <td className="py-2.5 pr-3 font-mono text-xs text-slate-400">{s.kod}</td>
                  <td className="pr-3">{s.baslik}<div className="text-xs text-slate-500">{s.not}</div></td>
                  <td className="pr-3 text-right font-mono text-slate-400">≥ {s.esik}</td>
                  <td className="pr-3 text-right font-mono font-semibold text-emerald-300">{s.mevcut} AKTS</td>
                  <td className="text-right"><Rozet renk={s.mevcut >= s.esik ? "emerald" : "rose"}>{s.mevcut >= s.esik ? "✓ Karşılıyor" : "✗ Eksik"}</Rozet></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Kart>

      <div>
        <div className="flex items-end justify-between mb-3 flex-wrap gap-2">
          <h3 className="font-display text-xl font-semibold">9 Ölçüt — 2024 değerlendirme puanları</h3>
          <Git id="olcutler2">Ölçütler ve kanıtlar</Git>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {OLCUTLER_9.map((o) => (
            <button key={o.no} onClick={() => setAktifSekme("olcutler2")} className={`text-left rounded-lg border p-4 hover:brightness-125 ${RENK[puanRenk(o.puan2024)]}`}>
              <div className="flex justify-between items-start"><span className="text-[10px] font-mono uppercase">Ölçüt {o.no}</span><span className="font-display text-2xl font-semibold">{o.puan2024}</span></div>
              <div className="text-sm text-slate-100 mt-2 leading-snug">{o.ad}</div>
              <div className="text-[11px] text-slate-400 mt-2">{(O.KANIT[String(o.no)] || []).length} kanıt{o.myo ? " · MYO ortak" : ""}{o.gozlem ? " · 2024'te gelişmeye açık" : ""}</div>
            </button>
          ))}
        </div>
      </div>

      <Kart baslik="APG — son girilen sonuçlar" sag={<Git id="apg">APG ve PÇ ulaşma</Git>}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {O.APG.map((a) => {
            const yillar = Object.keys(apgSonuc || {}).sort();
            const sonYil = [...yillar].reverse().find((y) => apgSonuc[y]?.[a.kod]?.deger !== undefined && apgSonuc[y]?.[a.kod]?.deger !== "");
            const d = sonYil ? apgDegerlendir(a, apgSonuc, sonYil) : { durum: "veri_yok" };
            const [r, et] = APG_DURUM_ROZET[d.durum];
            return (
              <div key={a.kod} className="border border-slate-800 rounded p-3">
                <div className="flex justify-between gap-2"><span className="font-mono text-xs text-slate-400">{a.kod}</span><Rozet renk={r}>{et}</Rozet></div>
                <div className="text-sm mt-1">{a.gosterge}</div>
                <div className="text-xs text-slate-500 mt-1">Hedef {a.hedef.metin}{sonYil ? ` · ${sonYil}: ${d.deger}${a.hedef.birim === "%" ? "%" : ""}` : ""}</div>
              </div>
            );
          })}
        </div>
      </Kart>
    </div>
  );
}

/* ============================================================
   2) PROGRAM KİMLİĞİ (misyon, vizyon, PEA, PÇ, APG tanımları)
   ============================================================ */
function ProgramKimligiIcerik({ kompakt = false }) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        {[["Misyon", PROGRAM_MISYON], ["Vizyon", PROGRAM_VIZYON]].map(([b, m]) => (
          <div key={b} className="border border-slate-800 bg-slate-900/40 rounded-lg p-5">
            <div className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2">{b}</div>
            <p className="text-slate-200 leading-relaxed">{m}</p>
          </div>
        ))}
      </div>
      <div>
        <h3 className="font-display text-xl font-semibold mb-3">Program Eğitim Amaçları (PEA)</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {O.PEA.map((p) => (
            <div key={p.kod} className="border border-slate-800 rounded-lg p-4 bg-slate-900/30">
              <div className="flex items-center gap-2"><Rozet renk="blue">{p.kod}</Rozet><span className="font-semibold">{p.baslik}</span></div>
              <p className="text-sm text-slate-300 mt-2">{p.tanim}</p>
              {!kompakt && O.PEA_DERS[p.kod] && <p className="text-xs text-slate-500 mt-2">Destekleyen dersler: {O.PEA_DERS[p.kod]}</p>}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-display text-xl font-semibold mb-1">Program Çıktıları (PÇ1–PÇ14)</h3>
        <p className="text-xs text-slate-500 mb-3">PÇ1–PÇ10 MEDEK ortak çıktılarıyla, PÇ11–PÇ14 programa özgü çıktılarla (Ölçüt 9) ilişkilidir. ● güçlü, ○ destekleyici ilişki (ÖDR Tablo 3.1.3).</p>
        <div className="overflow-x-auto border border-slate-800 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-slate-900/60"><tr className="text-[10px] font-mono uppercase text-slate-500 text-left"><th className="p-2.5">PÇ</th><th className="p-2.5">Program çıktısı</th><th className="p-2.5">Düzlem</th>{!kompakt && ["PEA-1", "PEA-2", "PEA-3", "PEA-4"].map((p) => <th key={p} className="p-2.5 text-center">{p}</th>)}</tr></thead>
            <tbody>
              {O.PC.map((p) => (
                <tr key={p.kod} className="border-t border-slate-800">
                  <td className={`p-2.5 font-mono text-xs ${parseInt(p.kod.slice(2)) > 10 ? "text-amber-300" : "text-slate-300"}`}>{p.kod}</td>
                  <td className="p-2.5 text-slate-200">{p.metin}</td>
                  <td className="p-2.5 text-xs text-slate-400">{p.duzlem}</td>
                  {!kompakt && ["PEA-1", "PEA-2", "PEA-3", "PEA-4"].map((e) => <td key={e} className="p-2.5 text-center text-blue-300">{O.PEA_PC[p.kod]?.[e] || ""}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
function KimlikSekmesi() {
  return (
    <div className="space-y-6">
      <SekmeBaslik baslik="Program Kimliği" alt="Misyon, vizyon, PEA, PÇ ve APG; 12.06.2026 tarih ve 2026/04 sayılı Bölüm Kurulu Kararı ile kabul edilmiş, 14.05.2026 Danışma Kurulu toplantısında paydaş görüşü alınmıştır (ET.K.2.1). Plan §6: her yıl izlenir, 4 yılda bir kapsamlı güncellenir." />
      <ProgramKimligiIcerik />
      <Kart baslik="Anahtar Performans Göstergeleri (APG) — tanım kartları">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-[10px] font-mono uppercase text-slate-500 text-left"><th className="py-2 pr-3">APG</th><th className="pr-3">Gösterge</th><th className="pr-3">Veri kaynağı / soru</th><th className="pr-3">Hesaplama</th><th>2. yıl ve sonrası hedefi</th></tr></thead>
            <tbody>
              {O.APG.map((a) => (
                <tr key={a.kod} className="border-t border-slate-800 align-top">
                  <td className="py-2.5 pr-3 font-mono text-xs text-blue-300">{a.kod}<div className="text-slate-500">{a.pea}</div></td>
                  <td className="pr-3 py-2.5">{a.gosterge}</td>
                  <td className="pr-3 py-2.5 text-xs text-slate-400">{a.anket}</td>
                  <td className="pr-3 py-2.5 text-xs text-slate-400">{a.hesaplama}</td>
                  <td className="py-2.5 font-mono text-emerald-300">{a.hedef.metin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3">İlk ölçüm yılı referans değer belirleme dönemidir; hedefler aşamalı uygulanır. İki yıl üst üste belirgin sapma, Plan §6 ve §8 uyarınca güncelleme tetikleyicisidir.</p>
      </Kart>
    </div>
  );
}

/* ============================================================
   3) ÖLÇÜTLER (9 ölçüt + ÖDR kanıt dizini)
   ============================================================ */
function OlcutlerSekmesiODR({ duzenlemeYetkisi }) {
  const [acik, setAcik] = uS(null);
  const [ara, setAra] = uS("");
  const [notlar, setNotlar] = useKayitliState("olcutNotlari_v1", {});
  const q = ara.trim().toLocaleLowerCase("tr");
  return (
    <div className="space-y-6">
      <SekmeBaslik baslik="Ölçütler ve Kanıtlar" alt="MEDEK Önlisans Program Ölçütleri v1.1 — ÖDR 2026 yapısı. Puanlar 2024 değerlendirmesine aittir; kanıt bağlantıları ÖDR Birleşik Kanıt Dizini'nden (187 kanıt) alınmıştır." sag={<input value={ara} onChange={(e) => setAra(e.target.value)} placeholder="Kanıt ara (ör. Danışma Kurulu, ET.K.4.7)" className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm w-72" />} />
      {OLCUTLER_9.map((o) => {
        const kanitlar = (O.KANIT[String(o.no)] || []).filter((k) => !q || (k.kod + " " + k.ad).toLocaleLowerCase("tr").includes(q));
        if (q && kanitlar.length === 0) return null;
        const ac = acik === o.no || !!q;
        return (
          <section key={o.no} className="border border-slate-800 rounded-lg bg-slate-900/30">
            <button onClick={() => setAcik(acik === o.no ? null : o.no)} className="w-full flex items-center gap-4 p-4 text-left">
              <div className={`w-12 h-12 rounded border flex items-center justify-center font-display text-2xl ${RENK[puanRenk(o.puan2024)]}`}>{o.puan2024}</div>
              <div className="flex-1">
                <div className="text-[10px] font-mono uppercase text-slate-500">Ölçüt {o.no}{o.myo ? " · MYO Müdürlüğü ile ortak" : ""}</div>
                <div className="font-display text-lg font-semibold">{o.ad}</div>
              </div>
              <div className="text-xs text-slate-400 font-mono">{(O.KANIT[String(o.no)] || []).length} kanıt</div>
              <span className="text-slate-500">{ac ? "▾" : "▸"}</span>
            </button>
            {ac && (
              <div className="px-4 pb-5 grid lg:grid-cols-2 gap-5">
                <div className="space-y-4">
                  {o.gozlem && (
                    <div className="rounded border border-amber-900/50 bg-amber-950/20 p-3 text-sm">
                      <div className="text-[10px] font-mono uppercase text-amber-400 mb-1">2024 gözlemi</div>
                      <p className="text-slate-300">{o.gozlem}</p>
                      <div className="text-[10px] font-mono uppercase text-emerald-400 mt-3 mb-1">ÖDR 2026'da alınan önlem</div>
                      <p className="text-slate-300">{o.onlem}</p>
                    </div>
                  )}
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-500 mb-2">Alt ölçütler</div>
                    <ul className="text-sm space-y-1 text-slate-300">{o.alt.map((a) => <li key={a}>· {a}</li>)}</ul>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-500 mb-1">Kurum ziyareti / izleme notu</div>
                    {duzenlemeYetkisi ? (
                      <textarea value={notlar[o.no] || ""} onChange={(e) => setNotlar({ ...notlar, [o.no]: e.target.value })} rows={3} className={girdiSinif} placeholder="Ziyarette vurgulanacaklar, eksik görülen noktalar…" />
                    ) : (
                      <p className="text-sm text-slate-400 whitespace-pre-wrap">{notlar[o.no] || "—"}</p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500 mb-2">Kanıt dizini</div>
                  <ul className="divide-y divide-slate-800 border border-slate-800 rounded max-h-96 overflow-y-auto scrollbar-thin">
                    {kanitlar.map((k) => (
                      <li key={k.kod} className="flex gap-3 px-3 py-2 text-sm">
                        <span className="font-mono text-xs text-slate-500 w-16 shrink-0 pt-0.5">{k.kod.replace("ET.K.", "")}</span>
                        {k.url ? <a href={k.url} target="_blank" rel="noopener" className="text-slate-200 hover:text-blue-300">{k.ad}</a> : <span className="text-slate-300">{k.ad}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

/* ============================================================
   4) ÖĞRETİM PLANI + DERS–PÇ MATRİSİ (ÖDR 2026)
   ============================================================ */
function OgretimPlaniSekmesiODR() {
  const [gorunum, setGorunum] = uS("plan");
  const o = ogretimPlaniOzet();
  const PCK = O.PC.map((p) => p.kod);
  const tumDersler = [...O.MUFREDAT.filter((d) => !d.slot), ...O.HAVUZ.filter((d) => O.DERS_PC[d.kod])];
  const kapsam = PCK.map((pc) => {
    const zor = O.MUFREDAT.filter((d) => !d.slot && (O.DERS_PC[d.kod]?.[pc] || 0) > 0);
    const guclu = zor.filter((d) => O.DERS_PC[d.kod][pc] >= 4);
    return { pc, ders: zor.length, guclu: guclu.length, akts: zor.reduce((s, d) => s + d.akts, 0) };
  });
  const hucre = (v) => (v ? ["", "bg-slate-800 text-slate-400", "bg-blue-950 text-blue-300", "bg-blue-900/70 text-blue-200", "bg-blue-700/70 text-white", "bg-blue-500 text-white"][v] : "");
  return (
    <div className="space-y-6">
      <SekmeBaslik baslik="Öğretim Planı" alt="ÖDR 2026 öğretim planı (Müfredat Değişikliği YKK 04.06.2026/07; 3+1 İşletmede Mesleki Eğitim modeli). Plan §7: yıllık izlenir, kapsamlı revizyon en az iki yılda bir." sag={
        <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded p-1">
          {[["plan", "Plan"], ["havuz", "Seçmeli havuzları"], ["matris", "Ders–PÇ matrisi"]].map(([id, ad]) => (
            <button key={id} onClick={() => setGorunum(id)} className={`px-3 py-1.5 text-sm rounded ${gorunum === id ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"}`}>{ad}</button>
          ))}
        </div>} />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[["Toplam", o.toplam], ["1. yarıyıl", o.donem[0]], ["2. yarıyıl", o.donem[1]], ["3. yarıyıl", o.donem[2]], ["4. yarıyıl (İYE)", o.donem[3]]].map(([e, v]) => (
          <div key={e} className="border border-slate-800 rounded p-3 bg-slate-900/40"><div className="text-[10px] font-mono uppercase text-slate-500">{e}</div><div className="font-display text-2xl">{v} <span className="text-sm text-slate-500">AKTS</span></div></div>
        ))}
      </div>
      {gorunum === "plan" && (
        <div className="grid xl:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map((d) => (
            <Kart key={d} baslik={["", "1. Sınıf — Güz", "1. Sınıf — Bahar", "2. Sınıf — Güz", "2. Sınıf — Bahar (İşletmede Uygulamalı Eğitim)"][d]} sag={<span className="font-mono text-sm text-slate-400">{o.donem[d - 1]} AKTS</span>}>
              <table className="w-full text-sm">
                <thead><tr className="text-[10px] font-mono uppercase text-slate-500 text-left"><th className="pb-2">Kod</th><th>Ders</th><th className="text-center">Z/S</th><th className="text-center">T-U-K</th><th className="text-right">AKTS</th></tr></thead>
                <tbody>
                  {O.MUFREDAT.filter((x) => x.donem === d).map((x, i) => (
                    <tr key={i} className="border-t border-slate-800">
                      <td className="py-1.5 font-mono text-xs text-slate-400">{x.kod || "—"}</td>
                      <td className={x.slot ? "text-slate-400 italic" : ""}>{x.ad}{O.DIS_PAYDAS_DERS.some((p) => x.ad.startsWith(p.ders.split(" —")[0])) && <Rozet renk="purple" className="ml-2">dış paydaş</Rozet>}</td>
                      <td className="text-center text-xs">{x.tip}</td>
                      <td className="text-center font-mono text-xs text-slate-400">{x.slot ? "" : `${x.t}-${x.u}-${x.k}`}</td>
                      <td className="text-right font-mono">{x.akts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Kart>
          ))}
        </div>
      )}
      {gorunum === "havuz" && (
        <div className="grid xl:grid-cols-3 gap-5">
          {[["MAS", "Mesleki alan seçmeli (2. sınıf güz, 4 ders)"], ["GS", "Genel seçmeli (1. sınıf bahar, 4 ders)"], ["GOS", "Ortak seçmeli (1. sınıf güz)"]].map(([k, b]) => (
            <Kart key={k} baslik={b}>
              <ul className="text-sm divide-y divide-slate-800">
                {O.HAVUZ.filter((x) => x.kategori === k).map((x) => (
                  <li key={x.kod} className="py-1.5 flex justify-between gap-3"><span><span className="font-mono text-xs text-slate-500 mr-2">{x.kod}</span>{x.ad}</span><span className="font-mono text-xs text-slate-400">{x.akts}</span></li>
                ))}
              </ul>
            </Kart>
          ))}
        </div>
      )}
      {gorunum === "matris" && (
        <>
          <Kart baslik="Zorunlu derslerin PÇ kapsamı" sag={<span className="text-xs text-slate-500">Katkı düzeyi 1–5 · ≥4 güçlü</span>}>
            <div className="grid grid-cols-7 md:grid-cols-14 gap-2" style={{ gridTemplateColumns: "repeat(14, minmax(0, 1fr))" }}>
              {kapsam.map((k) => (
                <div key={k.pc} title={`${k.ders} zorunlu ders · ${k.guclu} güçlü katkı · ${k.akts} AKTS`} className={`rounded border p-2 text-center ${parseInt(k.pc.slice(2)) > 10 ? "border-amber-800/60" : "border-slate-800"}`}>
                  <div className="font-mono text-[11px] text-slate-400">{k.pc}</div>
                  <div className="font-display text-lg">{k.ders}</div>
                  <div className="text-[10px] text-slate-500">{k.guclu} güçlü</div>
                </div>
              ))}
            </div>
          </Kart>
          <div className="overflow-x-auto border border-slate-800 rounded-lg">
            <table className="text-xs">
              <thead className="bg-slate-900/80 sticky top-0"><tr><th className="p-2 text-left font-mono text-slate-500">Ders</th>{PCK.map((p) => <th key={p} className={`p-1.5 font-mono ${parseInt(p.slice(2)) > 10 ? "text-amber-300" : "text-slate-400"}`}>{p.replace("PÇ", "")}</th>)}</tr></thead>
              <tbody>
                {tumDersler.map((d) => (
                  <tr key={d.kod} className="border-t border-slate-800/70">
                    <td className="p-1.5 whitespace-nowrap"><span className="font-mono text-slate-500 mr-2">{d.kod}</span><span className={d.kategori ? "text-slate-400" : "text-slate-200"}>{d.ad}</span></td>
                    {PCK.map((p) => { const v = O.DERS_PC[d.kod]?.[p] || 0; return <td key={p} className={`w-8 h-7 text-center font-mono ${hucre(v)}`}>{v || ""}</td>; })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">Kaynak: ÖDR 2026 Ölçüt 5.4 Ders–PÇ çizelgesi (Excel matristen üretilmiştir). Seçmeli dersler soluk renkle gösterilir. Değişiklikler Bölüm Kurulu kararıyla yapılır ve bu tabloya yansıtılır.</p>
        </>
      )}
    </div>
  );
}

/* ============================================================
   5) APG İZLEME + PÇ ULAŞMA
   ============================================================ */
function ApgSekmesi({ duzenlemeYetkisi }) {
  const [yil, setYil] = uS(akademikYil());
  const [sonuc, setSonuc] = useKayitliState("apgSonuclari_v1", APG_BASLANGIC);
  const [pcUlasma, setPcUlasma] = useKayitliState("pcUlasma_v1", {});
  const [donem, setDonem] = uS(`${yil} Güz`);
  uE(() => setDonem(`${yil} Güz`), [yil]);
  const yaz = (kod, alan, deger) => {
    const y = { ...(sonuc[yil] || {}) };
    y[kod] = { ...(y[kod] || {}), [alan]: deger, guncelleme: new Date().toISOString() };
    setSonuc({ ...sonuc, [yil]: y });
  };
  const pcYaz = (pc, deger) => {
    const d = { ...(pcUlasma[donem] || {}) };
    d[pc] = deger;
    setPcUlasma({ ...pcUlasma, [donem]: d });
  };
  const pcd = pcUlasma[donem] || {};
  const tumYillar = Array.from(new Set([...Object.keys(sonuc || {}), ...yilListesi()])).sort();
  return (
    <div className="space-y-6">
      <SekmeBaslik baslik="APG ve PÇ Ulaşma" alt="Plan §8: APG sonuçları her akademik yıl konsolide edilip yıllık rapora işlenir; hedeften sapmada nedenler Bölüm Kurulu'na sunulur. Plan §10: her yarıyıl sonunda derslerden gelen DÖÇ verileriyle PÇ ulaşma düzeyi değerlendirilir." sag={<YilSecici yil={yil} setYil={setYil} />} />
      <Kart baslik={`Anahtar performans göstergeleri · ${yil}`}>
        <div className="space-y-3">
          {O.APG.map((a) => {
            const v = sonuc?.[yil]?.[a.kod] || {};
            const d = apgDegerlendir(a, sonuc, yil);
            const [r, et] = APG_DURUM_ROZET[d.durum];
            return (
              <div key={a.kod} className="grid lg:grid-cols-12 gap-3 border border-slate-800 rounded p-3 items-start">
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-2"><span className="font-mono text-xs text-blue-300">{a.kod}</span><Rozet renk={r}>{et}</Rozet>{d.ikiYilSapma && <Rozet renk="rose">2 yıl üst üste sapma → güncelleme tetikleyicisi</Rozet>}</div>
                  <div className="text-sm mt-1">{a.gosterge} <span className="text-slate-500">({a.pea})</span></div>
                  <div className="text-xs text-slate-500 mt-1">{a.anket}</div>
                </div>
                <div className="lg:col-span-2">
                  <div className="text-[10px] font-mono uppercase text-slate-500">Hedef</div>
                  <div className="font-mono text-emerald-300">{a.hedef.metin}</div>
                </div>
                <div className="lg:col-span-2">
                  <div className="text-[10px] font-mono uppercase text-slate-500">Sonuç ({a.hedef.birim === "%" ? "%" : "1–5"})</div>
                  {duzenlemeYetkisi ? <input value={v.deger ?? ""} onChange={(e) => yaz(a.kod, "deger", e.target.value)} className={girdiSinif} inputMode="decimal" /> : <div className="font-mono">{v.deger ?? "—"}</div>}
                </div>
                <div className="lg:col-span-1">
                  <div className="text-[10px] font-mono uppercase text-slate-500">n</div>
                  {duzenlemeYetkisi ? <input value={v.n ?? ""} onChange={(e) => yaz(a.kod, "n", e.target.value)} className={girdiSinif} inputMode="numeric" /> : <div className="font-mono">{v.n ?? "—"}</div>}
                </div>
                <div className="lg:col-span-3">
                  <div className="text-[10px] font-mono uppercase text-slate-500">Kaynak / sapma nedeni</div>
                  {duzenlemeYetkisi ? <input value={v.not ?? ""} onChange={(e) => yaz(a.kod, "not", e.target.value)} className={girdiSinif} placeholder="Anket adı, dönemi; sapma varsa nedeni" /> : <div className="text-sm text-slate-400">{v.not || "—"}</div>}
                </div>
                <div className="lg:col-span-12 flex gap-2 flex-wrap text-[11px] font-mono text-slate-500">
                  Eğilim: {tumYillar.map((y) => <span key={y} className={y === yil ? "text-slate-200" : ""}>{y}: {sonuc?.[y]?.[a.kod]?.deger || "—"}</span>)}
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-slate-500 mt-3">Veri girilen ilk yıl otomatik olarak referans yılı sayılır (ÖDR 2.2: hedefler aşamalı uygulanır).</p>
      </Kart>
      <Kart baslik="Program çıktılarına ulaşma (PÇ1–PÇ14)" sag={
        <div className="flex items-center gap-2">
          <select value={donem} onChange={(e) => setDonem(e.target.value)} className="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm">
            {[`${yil} Güz`, `${yil} Bahar`].map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>}>
        <p className="text-xs text-slate-500 mb-3">Derslerden gelen DÖÇ ulaşma verilerinin PÇ düzeyinde özeti (% olarak). Kaynak: PÇ Ulaşma Ölçme sistemi raporları ve ders sorumlularının dönem sonu değerlendirmeleri.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {O.PC.map((p) => {
            const v = parseFloat(pcd[p.kod]);
            return (
              <div key={p.kod} className="border border-slate-800 rounded p-2.5" title={p.metin}>
                <div className="flex justify-between"><span className={`font-mono text-xs ${parseInt(p.kod.slice(2)) > 10 ? "text-amber-300" : "text-slate-400"}`}>{p.kod}</span><span className="font-mono text-xs">{isNaN(v) ? "—" : v + "%"}</span></div>
                <div className="h-1.5 bg-slate-800 rounded mt-1.5 overflow-hidden"><div className="h-full bg-blue-500" style={{ width: (isNaN(v) ? 0 : Math.min(100, v)) + "%" }} /></div>
                {duzenlemeYetkisi && <input value={pcd[p.kod] ?? ""} onChange={(e) => pcYaz(p.kod, e.target.value)} className="mt-2 w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs font-mono" placeholder="%" inputMode="decimal" />}
              </div>
            );
          })}
        </div>
        <div className="grid md:grid-cols-2 gap-3 mt-4">
          <label className="text-xs text-slate-400">Veri kaynağı / kapsanan dersler
            {duzenlemeYetkisi ? <input value={pcd._kaynak || ""} onChange={(e) => pcYaz("_kaynak", e.target.value)} className={girdiSinif + " mt-1"} placeholder="ör. 12 ders, PÇ Ulaşma sistemi dönem raporu" /> : <div className="text-sm text-slate-300 mt-1">{pcd._kaynak || "—"}</div>}
          </label>
          <label className="text-xs text-slate-400">Değerlendirme / iyileştirme önerisi
            {duzenlemeYetkisi ? <input value={pcd._not || ""} onChange={(e) => pcYaz("_not", e.target.value)} className={girdiSinif + " mt-1"} placeholder="Düşük kalan PÇ'ler ve önerilen önlem" /> : <div className="text-sm text-slate-300 mt-1">{pcd._not || "—"}</div>}
          </label>
        </div>
      </Kart>
    </div>
  );
}

/* ============================================================
   6) İYİLEŞTİRME DÖNGÜSÜ (girdi → karar → eylem → kanıt)
   ============================================================ */
function DonguSekmesi({ duzenlemeYetkisi, setAktifSekme }) {
  const [dongu, setDongu] = useKayitliState("iyilestirmeDongusu_v1", DONGU_BASLANGIC);
  const [gorevler, setGorevler] = useKayitliState("gorevler", GOREVLER_INIT);
  const [gorusler] = useKayitliState("paydasGorusleri_v1", []);
  const [paydaslar] = useKayitliState("paydaslar_v2", PAYDASLAR_INIT);
  const [form, setForm] = uS(null);
  const [filtre, setFiltre] = uS("hepsi");
  const bos = { tarih: new Date().toISOString().slice(0, 10), kaynakTur: "Danışma Kurulu", kaynak: "", girdi: "", karar: "", eylemId: "", cikti: "", kanit: "", durum: "acik", gorusId: "" };
  const kaydet = () => {
    if (!form.girdi.trim()) { alert("Paydaş talebi / girdi zorunludur"); return; }
    if (form.id) setDongu(dongu.map((d) => (d.id === form.id ? form : d)));
    else setDongu([{ ...form, id: odrId("d") }, ...dongu]);
    setForm(null);
  };
  const eylemOlustur = () => {
    if (!form.girdi.trim()) { alert("Önce girdiyi yazın"); return; }
    const id = Date.now();
    setGorevler([...(gorevler || []), { id, baslik: form.girdi.trim().slice(0, 140), olcut: 4, durum: "bekliyor", oncelik: "orta", sorumlu: "", tarih: "", aciklama: "İyileştirme döngüsünden oluşturuldu" }]);
    setForm({ ...form, eylemId: String(id), durum: form.durum === "acik" ? "karar" : form.durum });
  };
  const bagli = new Set(dongu.map((d) => d.gorusId).filter(Boolean));
  const bekleyenGorus = (gorusler || []).filter((g) => !g.arsiv && !bagli.has(g.id));
  const paydasAd = (id) => (paydaslar || []).find((p) => p.id === id)?.ad || "Paydaş";
  const liste = dongu.filter((d) => filtre === "hepsi" || d.durum === filtre);
  const durumObj = (id) => DONGU_DURUMLAR.find((x) => x.id === id) || DONGU_DURUMLAR[0];
  return (
    <div className="space-y-6">
      <SekmeBaslik baslik="İyileştirme Döngüsü" alt="Plan §9 (PUKÖ) ve ÖDR Ölçüt 4.2: paydaş talebi (girdi) → kurul kararı → eylem → yapılan iyileştirme (çıktı) → kanıt. Kapalı döngünün sistematik takibi buradan yapılır; kayıtlar yıllık rapora otomatik aktarılır." sag={duzenlemeYetkisi && <button onClick={() => setForm(bos)} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm font-medium">+ Yeni kayıt</button>} />
      {duzenlemeYetkisi && bekleyenGorus.length > 0 && (
        <Kart baslik={`Döngüye bağlanmamış paydaş görüşleri (${bekleyenGorus.length})`}>
          <ul className="divide-y divide-slate-800">
            {bekleyenGorus.slice(0, 8).map((g) => (
              <li key={g.id} className="py-2 flex gap-3 items-start justify-between">
                <div className="text-sm"><span className="text-slate-500 font-mono text-xs mr-2">{g.tarih}</span><span className="text-slate-300">{paydasAd(g.paydasId)}:</span> <span className="text-slate-200">{(g.konu ? g.konu + " — " : "") + (g.metin || "").slice(0, 160)}</span></div>
                <button onClick={() => setForm({ ...bos, tarih: g.tarih || bos.tarih, kaynakTur: "Paydaş görüşü (panel)", kaynak: paydasAd(g.paydasId), girdi: g.metin || "", gorusId: g.id })} className="shrink-0 text-xs px-3 py-1.5 border border-blue-800 text-blue-300 rounded hover:bg-blue-950">Döngüye al</button>
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-500 mt-2">Değerlendirilip işlem gerektirmediğine karar verilen görüşleri Görüşler sekmesinde arşivleyebilirsiniz.</p>
        </Kart>
      )}
      <div className="flex gap-2 flex-wrap">
        {[{ id: "hepsi", ad: "Hepsi" }, ...DONGU_DURUMLAR].map((d) => (
          <button key={d.id} onClick={() => setFiltre(d.id)} className={`text-xs px-3 py-1.5 rounded border ${filtre === d.id ? "border-blue-600 text-white bg-blue-950/50" : "border-slate-700 text-slate-400"}`}>{d.ad} ({d.id === "hepsi" ? dongu.length : dongu.filter((x) => x.durum === d.id).length})</button>
        ))}
      </div>
      <div className="overflow-x-auto border border-slate-800 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-slate-900/60"><tr className="text-[10px] font-mono uppercase text-slate-500 text-left"><th className="p-3">Tarih / kaynak</th><th className="p-3">Paydaş talebi (girdi)</th><th className="p-3">Karar</th><th className="p-3">Yapılan iyileştirme (çıktı)</th><th className="p-3">Kanıt</th><th className="p-3">Durum</th>{duzenlemeYetkisi && <th />}</tr></thead>
          <tbody>
            {liste.map((d) => {
              const ey = (gorevler || []).find((g) => String(g.id) === String(d.eylemId));
              const du = durumObj(d.durum);
              return (
                <tr key={d.id} className="border-t border-slate-800 align-top">
                  <td className="p-3 whitespace-nowrap"><div className="font-mono text-xs">{tarihTR(d.tarih)}{d.kapanisTarihi ? " → " + tarihTR(d.kapanisTarihi) : ""}</div><div className="text-xs text-slate-500">{d.kaynakTur}</div><div className="text-xs text-slate-400">{d.kaynak}</div></td>
                  <td className="p-3 text-slate-200 max-w-xs">{d.girdi}</td>
                  <td className="p-3 text-xs text-slate-400 max-w-[12rem]">{d.karar || "—"}{ey && <div className="mt-1"><button onClick={() => setAktifSekme("eylem")} className="text-blue-400 hover:underline">Eylem: {ey.baslik.slice(0, 40)} ({ey.durum})</button></div>}</td>
                  <td className="p-3 text-slate-300 max-w-xs">{d.cikti || <span className="text-slate-600">—</span>}</td>
                  <td className="p-3 max-w-[10rem]"><KanitMetni metin={d.kanit} /></td>
                  <td className="p-3"><Rozet renk={du.renk}>{du.ad}</Rozet></td>
                  {duzenlemeYetkisi && <td className="p-3 whitespace-nowrap"><button onClick={() => setForm({ ...bos, ...d })} className="text-xs text-blue-400 mr-3">Düzenle</button><button onClick={() => { if (confirm("Bu kayıt silinsin mi?")) setDongu(dongu.filter((x) => x.id !== d.id)); }} className="text-xs text-rose-400">Sil</button></td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {form && (
        <div className="fixed inset-0 z-[70] bg-black/70 flex items-center justify-center p-4" onClick={() => setForm(null)}>
          <div className="bg-slate-900 border border-slate-700 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-3" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-xl font-semibold">{form.id ? "Kaydı düzenle" : "Yeni döngü kaydı"}</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              <label className="text-xs text-slate-400">Tarih<input type="date" value={form.tarih} onChange={(e) => setForm({ ...form, tarih: e.target.value })} className={girdiSinif + " mt-1"} /></label>
              <label className="text-xs text-slate-400">Kaynak türü<select value={form.kaynakTur} onChange={(e) => setForm({ ...form, kaynakTur: e.target.value })} className={girdiSinif + " mt-1"}>{DONGU_KAYNAK_TURLERI.map((k) => <option key={k}>{k}</option>)}</select></label>
              <label className="text-xs text-slate-400">Kaynak (toplantı / kişi)<input value={form.kaynak} onChange={(e) => setForm({ ...form, kaynak: e.target.value })} className={girdiSinif + " mt-1"} placeholder="ör. DK-2026/1, Karar 5" /></label>
            </div>
            <label className="block text-xs text-slate-400">Paydaş talebi / tespit (girdi)<textarea rows={3} value={form.girdi} onChange={(e) => setForm({ ...form, girdi: e.target.value })} className={girdiSinif + " mt-1"} /></label>
            <label className="block text-xs text-slate-400">Karar (kurul, tarih, sayı)<input value={form.karar} onChange={(e) => setForm({ ...form, karar: e.target.value })} className={girdiSinif + " mt-1"} placeholder="ör. BK 12.06.2026 / 2026-04" /></label>
            <div className="grid sm:grid-cols-[1fr_auto] gap-2 items-end">
              <label className="text-xs text-slate-400">Bağlı eylem<select value={form.eylemId || ""} onChange={(e) => setForm({ ...form, eylemId: e.target.value })} className={girdiSinif + " mt-1"}><option value="">— bağlı eylem yok —</option>{(gorevler || []).map((g) => <option key={g.id} value={String(g.id)}>{g.baslik.slice(0, 90)} ({g.durum})</option>)}</select></label>
              {!form.eylemId && <button onClick={eylemOlustur} className="text-xs px-3 py-2.5 border border-slate-600 rounded hover:border-blue-600">Eylem planına ekle</button>}
            </div>
            <label className="block text-xs text-slate-400">Yapılan iyileştirme (çıktı)<textarea rows={2} value={form.cikti} onChange={(e) => setForm({ ...form, cikti: e.target.value })} className={girdiSinif + " mt-1"} /></label>
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="text-xs text-slate-400">Kanıt (ET.K kodu veya bağlantı)<input value={form.kanit} onChange={(e) => setForm({ ...form, kanit: e.target.value })} className={girdiSinif + " mt-1"} /></label>
              <label className="text-xs text-slate-400">Durum<select value={form.durum} onChange={(e) => setForm({ ...form, durum: e.target.value, kapanisTarihi: e.target.value === "kapandi" ? form.kapanisTarihi || new Date().toISOString().slice(0, 10) : "" })} className={girdiSinif + " mt-1"}>{DONGU_DURUMLAR.map((d) => <option key={d.id} value={d.id}>{d.ad}</option>)}</select></label>
            </div>
            {form.durum === "kapandi" && <label className="block text-xs text-slate-400">Kapanış (kanıtlandığı) tarihi<input type="date" value={form.kapanisTarihi || ""} onChange={(e) => setForm({ ...form, kapanisTarihi: e.target.value })} className={girdiSinif + " mt-1"} /></label>}
            <div className="flex justify-end gap-2 pt-2"><button onClick={() => setForm(null)} className="px-4 py-2 text-sm text-slate-400">İptal</button><button onClick={kaydet} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm font-medium">Kaydet</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   7) YILLIK İŞ TAKVİMİ (Plan §11)
   ============================================================ */
function TakvimSekmesi({ duzenlemeYetkisi }) {
  const [yil, setYil] = uS(akademikYil());
  const [durum, setDurum] = useKayitliState("takvimDurum_v1", {});
  const [acik, setAcik] = uS(null);
  const td = durum[yil] || {};
  const simdi = new Date();
  const yaz = (id, alan, v) => setDurum({ ...durum, [yil]: { ...td, [id]: { ...(td[id] || {}), [alan]: v } } });
  const yapilan = IS_TAKVIMI.filter((t) => td[t.id]?.durum === "yapildi").length;
  return (
    <div className="space-y-6">
      <SekmeBaslik baslik="Yıllık İş Takvimi" alt="Program Sürdürülebilir Yönetim Planı §11 (yönlendirici; akademik takvime göre uyarlanır) ile §5, §7, §9, §10 ve §12'deki periyodik işler. Her işin gerçekleştiği tarih ve kanıtı işaretlenir; yıllık rapora aktarılır." sag={<div className="flex items-center gap-3"><span className="text-sm font-mono text-slate-400">{yapilan}/{IS_TAKVIMI.length} tamam</span><YilSecici yil={yil} setYil={setYil} /></div>} />
      <div className="space-y-4">
        {AKADEMIK_AY_SIRA.map((ay) => {
          const isler = IS_TAKVIMI.filter((t) => t.bas === ay);
          if (!isler.length) return null;
          const buAy = simdi >= akademikAyBaslangic(yil, ay) && simdi <= akademikAyBitis(yil, ay);
          return (
            <div key={ay} className={`border rounded-lg ${buAy ? "border-blue-700 bg-blue-950/10" : "border-slate-800"}`}>
              <div className="px-4 py-2 border-b border-slate-800 flex items-center gap-2"><span className="font-display text-lg">{AY_ADLARI[ay]}</span>{buAy && <Rozet renk="blue">Şu an</Rozet>}</div>
              <ul className="divide-y divide-slate-800">
                {isler.map((t) => {
                  const d = td[t.id] || {};
                  const gecikti = akademikAyBitis(yil, t.bit) < simdi && d.durum !== "yapildi";
                  const rz = d.durum === "yapildi" ? ["emerald", "Yapıldı"] : d.durum === "ertelendi" ? ["amber", "Ertelendi"] : gecikti ? ["rose", "Gecikti"] : ["slate", "Bekliyor"];
                  return (
                    <li key={t.id} className="px-4 py-3">
                      <div className="flex gap-3 items-start">
                        <div className="flex-1">
                          <div className="text-sm text-slate-100">{t.is}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{AY_ADLARI[t.bas]}{t.bit !== t.bas ? "–" + AY_ADLARI[t.bit] : ""} · {t.sorumlu} · Ölçüt {t.olcut} · {t.pukö} · {t.kaynak}</div>
                          {(d.tarih || d.kanit || d.not) && <div className="text-xs text-slate-400 mt-1">{d.tarih && <span className="mr-3">✓ {tarihTR(d.tarih)}</span>}{d.kanit && <KanitMetni metin={d.kanit} />}{d.not && <span className="ml-3">{d.not}</span>}</div>}
                        </div>
                        <Rozet renk={rz[0]}>{rz[1]}</Rozet>
                        {duzenlemeYetkisi && <button onClick={() => setAcik(acik === t.id ? null : t.id)} className="text-xs text-blue-400">{acik === t.id ? "Kapat" : "İşaretle"}</button>}
                      </div>
                      {acik === t.id && (
                        <div className="grid sm:grid-cols-4 gap-2 mt-3">
                          <select value={d.durum || ""} onChange={(e) => yaz(t.id, "durum", e.target.value)} className={girdiSinif}><option value="">Bekliyor</option><option value="yapildi">Yapıldı</option><option value="ertelendi">Ertelendi</option></select>
                          <input type="date" value={d.tarih || ""} onChange={(e) => yaz(t.id, "tarih", e.target.value)} className={girdiSinif} />
                          <input value={d.kanit || ""} onChange={(e) => yaz(t.id, "kanit", e.target.value)} className={girdiSinif} placeholder={"Kanıt: " + t.kanit} />
                          <input value={d.not || ""} onChange={(e) => yaz(t.id, "not", e.target.value)} className={girdiSinif} placeholder="Not" />
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   8) YILLIK RAPOR (Plan §9) — önizleme + Word
   ============================================================ */
const yillikRaporVerisi = (yil, s) => {
  const icinde = (t) => t && akademikYil(new Date(t)) === yil;
  return {
    toplantilar: (s.toplantilar || []).filter((t) => icinde(t.tarih)).sort((a, b) => (a.tarih > b.tarih ? 1 : -1)),
    anketler: (s.anketler || []).filter((a) => (a.donem || "").includes(yil.slice(0, 4)) || (a.donem || "").includes(yil.slice(5)) || icinde(a.bitisTarihi) || icinde(a.baslangicTarihi)),
    gorusler: (s.gorusler || []).filter((g) => icinde(g.tarih)),
    dongu: (s.dongu || []).filter((d) => {
      const bas = `${yil.slice(0, 4)}-09-01`, son = `${yil.slice(5)}-08-31`;
      return (d.tarih || "") <= son && (!d.kapanisTarihi || d.kapanisTarihi >= bas);
    }),
    gorevler: s.gorevler || [],
    apg: O.APG.map((a) => ({ a, v: s.apg?.[yil]?.[a.kod] || {}, d: apgDegerlendir(a, s.apg, yil) })),
    pcGuz: s.pc?.[`${yil} Güz`] || {},
    pcBahar: s.pc?.[`${yil} Bahar`] || {},
    takvim: IS_TAKVIMI.map((t) => ({ t, d: s.takvim?.[yil]?.[t.id] || {} })),
  };
};
function YillikRaporSekmesi({ duzenlemeYetkisi }) {
  const [yil, setYil] = uS(akademikYil(new Date(new Date().getFullYear(), new Date().getMonth() - 3, 1)));
  const [toplantilar] = useKayitliState("toplantilar", []);
  const [anketler] = useKayitliState("anketler", []);
  const [gorusler] = useKayitliState("paydasGorusleri_v1", []);
  const [paydaslar] = useKayitliState("paydaslar_v2", PAYDASLAR_INIT);
  const [dongu] = useKayitliState("iyilestirmeDongusu_v1", DONGU_BASLANGIC);
  const [gorevler] = useKayitliState("gorevler", GOREVLER_INIT);
  const [apg] = useKayitliState("apgSonuclari_v1", APG_BASLANGIC);
  const [pc] = useKayitliState("pcUlasma_v1", {});
  const [takvim] = useKayitliState("takvimDurum_v1", {});
  const [metinler, setMetinler] = useKayitliState("yillikRaporMetinleri_v1", {});
  const R = yillikRaporVerisi(yil, { toplantilar, anketler, gorusler, dongu, gorevler, apg, pc, takvim });
  const m = metinler[yil] || {};
  const setM = (k, v) => setMetinler({ ...metinler, [yil]: { ...m, [k]: v } });
  const paydasAd = (id) => (paydaslar || []).find((p) => p.id === id)?.ad || "—";
  const paydasTip = (id) => (paydaslar || []).find((p) => p.id === id)?.tip;
  const gIc = R.gorusler.filter((g) => paydasTip(g.paydasId) === "ic").length;
  const gDis = R.gorusler.length - gIc;
  const ey = { yapildi: 0, devam: 0, bekliyor: 0 };
  R.gorevler.forEach((g) => (ey[g.durum] = (ey[g.durum] || 0) + 1));
  const takvimYapilan = R.takvim.filter((x) => x.d.durum === "yapildi").length;

  const wordIndir = async () => {
    const D = window.docx;
    if (!D) { alert("Word kütüphanesi yüklenemedi"); return; }
    const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType } = D;
    const P = (t, o = {}) => new Paragraph({ spacing: { after: 120, line: 360 }, ...o, children: [new TextRun({ text: t || "", font: "Times New Roman", size: 24, ...(o.run || {}) })] });
    const H = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 120 }, children: [new TextRun({ text: t, font: "Times New Roman", size: 26, bold: true })] });
    const tablo = (bas, satirlar) => new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: [bas, ...satirlar].map((r, i) => new TableRow({ children: r.map((c) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(c ?? ""), font: "Times New Roman", size: 20, bold: i === 0 })] })] })) })) });
    const doc = new Document({ sections: [{ children: [
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "GAZİANTEP ÜNİVERSİTESİ SOSYAL BİLİMLER MESLEK YÜKSEKOKULU", font: "Times New Roman", size: 24, bold: true })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "E-TİCARET VE PAZARLAMA PROGRAMI", font: "Times New Roman", size: 24, bold: true })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 240 }, children: [new TextRun({ text: `${yil} AKADEMİK YILI PROGRAM DEĞERLENDİRME RAPORU`, font: "Times New Roman", size: 24, bold: true })] }),
      H("1. Giriş"),
      P(`Bu rapor, Program Sürdürülebilir Yönetim Planı'nın (Bölüm Kurulu 12.06.2026, 2026/04) 9. bölümü uyarınca ${yil} akademik yılında programın hedeflerine ulaşma düzeyini; anahtar performans göstergelerini, paydaş geri bildirimlerini ve program çıktılarına ulaşma düzeyini değerlendirmek amacıyla hazırlanmıştır.`),
      m.giris ? P(m.giris) : null,
      H("2. Anahtar Performans Göstergeleri"),
      tablo(["APG", "Gösterge", "Hedef", "Sonuç", "n", "Durum"], R.apg.map(({ a, v, d }) => [a.kod, a.gosterge, a.hedef.metin, v.deger ?? "—", v.n ?? "—", APG_DURUM_ROZET[d.durum][1] + (d.ikiYilSapma ? " (2 yıl sapma)" : "")])),
      ...R.apg.filter(({ v }) => v.not).map(({ a, v }) => P(`${a.kod}: ${v.not}`)),
      H("3. Program Çıktılarına Ulaşma"),
      tablo(["PÇ", "Güz (%)", "Bahar (%)"], O.PC.map((p) => [p.kod, R.pcGuz[p.kod] ?? "—", R.pcBahar[p.kod] ?? "—"])),
      R.pcGuz._not ? P("Güz: " + R.pcGuz._not) : null,
      R.pcBahar._not ? P("Bahar: " + R.pcBahar._not) : null,
      H("4. Paydaş Katılımı ve Geri Bildirimler"),
      P(`Yıl içinde ${R.toplantilar.length} kurul/paydaş toplantısı yapılmış, ${R.anketler.length} anket kaydedilmiş, panel üzerinden ${R.gorusler.length} paydaş görüşü (${gIc} iç, ${gDis} dış) alınmıştır.`),
      R.toplantilar.length ? tablo(["Tarih", "Toplantı", "Karar sayısı"], R.toplantilar.map((t) => [tarihTR(t.tarih), t.baslik, (t.kararlar || []).length])) : null,
      R.anketler.length ? tablo(["Anket", "Dönem", "Yanıt", "Bulgular"], R.anketler.map((a) => [a.ad, a.donem || "", `${a.yanitSayisi || 0}/${a.hedefSayi || 0}`, a.bulgular || ""])) : null,
      H("5. Sürekli İyileştirme (Kapalı Döngü)"),
      tablo(["Girdi (paydaş talebi)", "Kaynak", "Yapılan iyileştirme", "Kanıt", "Durum"], R.dongu.map((d) => [d.girdi, d.kaynak || d.kaynakTur, d.cikti || "—", d.kanit || "—", (DONGU_DURUMLAR.find((x) => x.id === d.durum) || {}).ad])),
      P(`Eylem planı durumu: ${ey.yapildi} tamamlandı, ${ey.devam} devam ediyor, ${ey.bekliyor} bekliyor.`),
      H("6. Yıllık İş Takviminin Gerçekleşmesi"),
      P(`Yönetim Planı'nda tanımlı ${IS_TAKVIMI.length} periyodik işten ${takvimYapilan} tanesi gerçekleştirilmiştir.`),
      tablo(["Dönem", "İş", "Durum", "Tarih"], R.takvim.map(({ t, d }) => [AY_ADLARI[t.bas] + (t.bit !== t.bas ? "–" + AY_ADLARI[t.bit] : ""), t.is, d.durum === "yapildi" ? "Yapıldı" : d.durum === "ertelendi" ? "Ertelendi" : "Yapılmadı", d.tarih ? tarihTR(d.tarih) : ""])),
      H("7. Genel Değerlendirme ve Sonraki Yıl Öncelikleri"),
      P(m.degerlendirme || "—"),
      P(m.oncelikler || ""),
    ].filter(Boolean) }] });
    const blob = await Packer.toBlob(doc);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `Program_Degerlendirme_Raporu_${yil}.docx`;
    a.click();
  };

  const Bolum = ({ no, baslik, children }) => (<div className="border-t border-slate-800 pt-4"><h4 className="font-display text-lg font-semibold mb-2">{no}. {baslik}</h4>{children}</div>);
  return (
    <div className="space-y-6">
      <SekmeBaslik baslik="Yıllık Rapor" alt="Plan §9: her akademik yılın güz döneminde hazırlanır, Aralık'ta Bölüm Kurulu'nda görüşülerek karara bağlanır ve web sayfasında paylaşılır. Rapor panelde girilen verilerden otomatik derlenir; yorum alanlarını doldurup Word olarak indirebilirsiniz." sag={<div className="flex gap-2"><YilSecici yil={yil} setYil={setYil} /><button onClick={wordIndir} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm font-medium">Word indir</button></div>} />
      <div className="border border-slate-800 rounded-lg bg-slate-900/30 p-6 space-y-5">
        <div className="text-center"><div className="text-xs font-mono text-slate-500">GAÜN SBMYO · E-TİCARET VE PAZARLAMA PROGRAMI</div><div className="font-display text-2xl mt-1">{yil} Program Değerlendirme Raporu</div></div>
        <Bolum no={1} baslik="Giriş">
          <p className="text-sm text-slate-400">Otomatik giriş metni Word çıktısına eklenir. Ek açıklama:</p>
          {duzenlemeYetkisi ? <textarea rows={2} value={m.giris || ""} onChange={(e) => setM("giris", e.target.value)} className={girdiSinif + " mt-1"} /> : <p className="text-sm">{m.giris}</p>}
        </Bolum>
        <Bolum no={2} baslik="Anahtar performans göstergeleri">
          <table className="w-full text-sm"><tbody>{R.apg.map(({ a, v, d }) => (<tr key={a.kod} className="border-t border-slate-800/60"><td className="py-1.5 font-mono text-xs text-slate-400">{a.kod}</td><td>{a.gosterge}</td><td className="font-mono text-xs text-slate-400">{a.hedef.metin}</td><td className="font-mono">{v.deger ?? "—"}</td><td className="text-right"><Rozet renk={APG_DURUM_ROZET[d.durum][0]}>{APG_DURUM_ROZET[d.durum][1]}</Rozet></td></tr>))}</tbody></table>
        </Bolum>
        <Bolum no={3} baslik="Program çıktılarına ulaşma">
          <div className="grid grid-cols-7 gap-2 text-xs font-mono" style={{ gridTemplateColumns: "repeat(14, minmax(0,1fr))" }}>{O.PC.map((p) => <div key={p.kod} className="border border-slate-800 rounded p-1.5 text-center"><div className="text-slate-500">{p.kod}</div><div>{R.pcGuz[p.kod] ?? "—"}</div><div className="text-slate-400">{R.pcBahar[p.kod] ?? "—"}</div></div>)}</div>
          <p className="text-xs text-slate-500 mt-1">Üst satır güz, alt satır bahar (%).</p>
        </Bolum>
        <Bolum no={4} baslik="Paydaş katılımı ve geri bildirimler">
          <p className="text-sm text-slate-300">{R.toplantilar.length} toplantı · {R.anketler.length} anket · {R.gorusler.length} görüş ({gIc} iç, {gDis} dış)</p>
          <ul className="text-sm text-slate-400 mt-2 space-y-0.5">{R.toplantilar.map((t) => <li key={t.id}>· {tarihTR(t.tarih)} — {t.baslik} ({(t.kararlar || []).length} karar)</li>)}</ul>
        </Bolum>
        <Bolum no={5} baslik="Sürekli iyileştirme (kapalı döngü)">
          <p className="text-sm text-slate-300">{R.dongu.length} kayıt · eylem planı: {ey.yapildi} tamamlandı, {ey.devam} devam, {ey.bekliyor} bekliyor</p>
          <ul className="text-sm text-slate-400 mt-2 space-y-0.5">{R.dongu.slice(0, 12).map((d) => <li key={d.id}>· {d.girdi} → {d.cikti || "…"}</li>)}</ul>
        </Bolum>
        <Bolum no={6} baslik="İş takviminin gerçekleşmesi"><p className="text-sm text-slate-300">{takvimYapilan}/{IS_TAKVIMI.length} periyodik iş gerçekleştirildi.</p></Bolum>
        <Bolum no={7} baslik="Genel değerlendirme ve sonraki yıl öncelikleri">
          {duzenlemeYetkisi ? (<><textarea rows={4} value={m.degerlendirme || ""} onChange={(e) => setM("degerlendirme", e.target.value)} className={girdiSinif} placeholder="Güçlü yönler, gelişmeye açık alanlar…" /><textarea rows={3} value={m.oncelikler || ""} onChange={(e) => setM("oncelikler", e.target.value)} className={girdiSinif + " mt-2"} placeholder="Sonraki yıl öncelikleri (eylem planına aktarılacaklar)" /></>) : (<p className="text-sm whitespace-pre-wrap">{m.degerlendirme}{"\n"}{m.oncelikler}</p>)}
        </Bolum>
      </div>
    </div>
  );
}

/* ============================================================
   9) PAYDAŞ GÖRÜŞ FORMU (portal + görüntüleyici sekmesi)
   Görüşler Firestore'da "gorusKutusu" koleksiyonuna yazılır;
   yönetici Görüşler sekmesinden panele aktarır.
   ============================================================ */
function GorusFormu({ kullanici }) {
  const [v, setV] = uS({ ad: kullanici?.displayName || "", tur: "", konu: "", metin: "", onay: false });
  const [durum, setDurum] = uS(null);
  const gonder = async () => {
    if (!v.tur || !v.metin.trim() || !v.onay) { setDurum({ hata: "Paydaş türü, görüş metni ve onay kutusu zorunludur." }); return; }
    const f = fb();
    if (!f || !f.db) { setDurum({ hata: "Bağlantı kurulamadı." }); return; }
    setDurum({ gonderiliyor: true });
    try {
      await f.db.collection("gorusKutusu").add({ ad: v.ad.trim(), tur: v.tur, konu: v.konu, metin: v.metin.trim(), eposta: (kullanici?.email || "").toLowerCase(), uid: kullanici?.uid || "", tarih: new Date().toISOString(), durum: "yeni" });
      setV({ ...v, konu: "", metin: "", onay: false });
      setDurum({ tamam: true });
    } catch (e) {
      setDurum({ hata: e?.code === "permission-denied" ? "Görüş kaydedilemedi: erişim izni yok. Lütfen program yönetimine bildirin." : "Görüş gönderilemedi: " + (e?.message || "") });
    }
  };
  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="text-xs text-slate-400">Ad soyad<input value={v.ad} onChange={(e) => setV({ ...v, ad: e.target.value })} className={girdiSinif + " mt-1"} /></label>
        <label className="text-xs text-slate-400">Paydaş türü *<select value={v.tur} onChange={(e) => setV({ ...v, tur: e.target.value })} className={girdiSinif + " mt-1"}><option value="">Seçin</option>{PAYDAS_PORTAL_TURLERI.map((t) => <option key={t}>{t}</option>)}</select></label>
      </div>
      <label className="block text-xs text-slate-400">Konu<select value={v.konu} onChange={(e) => setV({ ...v, konu: e.target.value })} className={girdiSinif + " mt-1"}><option value="">Seçin</option>{PAYDAS_PORTAL_KONULARI.map((t) => <option key={t}>{t}</option>)}</select></label>
      <label className="block text-xs text-slate-400">Görüş / öneri *<textarea rows={5} value={v.metin} onChange={(e) => setV({ ...v, metin: e.target.value })} className={girdiSinif + " mt-1"} placeholder="Programın eğitim amaçları, dersleri, staj süreci veya sektör ihtiyaçlarına ilişkin görüşünüz…" /></label>
      <label className="flex items-start gap-2 text-xs text-slate-400"><input type="checkbox" checked={v.onay} onChange={(e) => setV({ ...v, onay: e.target.checked })} className="mt-0.5" />Görüşümün ad ve e-posta bilgimle birlikte programın sürekli iyileştirme çalışmalarında (kurul gündemleri, yıllık rapor, akreditasyon kanıtı) kullanılmasını kabul ediyorum.</label>
      <div className="flex items-center gap-3">
        <button onClick={gonder} disabled={durum?.gonderiliyor} className="px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded text-sm font-medium">{durum?.gonderiliyor ? "Gönderiliyor…" : "Görüşü gönder"}</button>
        {durum?.tamam && <span className="text-sm text-emerald-300">Teşekkürler, görüşünüz iletildi.</span>}
        {durum?.hata && <span className="text-sm text-rose-300">{durum.hata}</span>}
      </div>
    </div>
  );
}
function GorusBildirSekmesi({ kullanici }) {
  return (
    <div className="space-y-6 max-w-3xl">
      <SekmeBaslik baslik="Görüş Bildir" alt="Danışma Kurulu üyeleri, sektör temsilcileri, öğrenciler ve mezunlar programa ilişkin görüşlerini buradan iletebilir. Görüşler program yönetimince değerlendirilir ve iyileştirme döngüsüne alınır." />
      <Kart><GorusFormu kullanici={kullanici} /></Kart>
    </div>
  );
}
function PaydasPortali({ kullanici, cikisYap }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`.font-display{font-family:'Fraunces',serif}.font-mono{font-family:'JetBrains Mono',monospace}`}</style>
      <header className="border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3"><img src={LOGO_HEADER} alt="" className="w-11 h-11 rounded-full" /><div><div className="font-display text-lg font-semibold">E-Ticaret ve Pazarlama Programı</div><div className="text-[11px] font-mono uppercase tracking-widest text-slate-400">Paydaş Portalı · Dijital Sürekli İyileştirme Paneli</div></div></div>
          <div className="flex items-center gap-3 text-xs"><span className="text-slate-400">{kullanici?.email}</span><button onClick={cikisYap} className="text-rose-400">Çıkış</button></div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        <div>
          <h1 className="font-display text-3xl font-semibold">Hoş geldiniz</h1>
          <p className="text-slate-400 mt-2 max-w-3xl">Gaziantep Üniversitesi Sosyal Bilimler MYO E-Ticaret ve Pazarlama Programı; eğitim amaçlarını, program çıktılarını ve öğretim planını iç ve dış paydaşlarının görüşleriyle sürekli iyileştirir. Aşağıda programın kimliğini inceleyebilir ve görüşünüzü iletebilirsiniz.</p>
        </div>
        <section id="gorus" className="border border-blue-900/60 bg-blue-950/10 rounded-lg p-6">
          <h2 className="font-display text-2xl font-semibold mb-1">Görüş ve öneri bildirin</h2>
          <p className="text-sm text-slate-400 mb-4">Görüşleriniz program yönetimince değerlendirilir; uygun görülenler Bölüm Kurulu ve Danışma Kurulu gündemine alınır.</p>
          <GorusFormu kullanici={kullanici} />
        </section>
        <section>
          <h2 className="font-display text-2xl font-semibold mb-4">Program kimliği</h2>
          <ProgramKimligiIcerik kompakt />
        </section>
        <section>
          <h2 className="font-display text-2xl font-semibold mb-3">Öğretim planı özeti</h2>
          <div className="grid sm:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((d) => (
              <div key={d} className="border border-slate-800 rounded p-3">
                <div className="text-xs font-mono text-slate-500">{d}. yarıyıl · {ogretimPlaniOzet().donem[d - 1]} AKTS</div>
                <ul className="text-xs text-slate-300 mt-2 space-y-0.5">{O.MUFREDAT.filter((x) => x.donem === d).map((x, i) => <li key={i}>{x.ad}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-800 text-xs text-slate-500"><div className="max-w-5xl mx-auto px-6 py-5">Panel yönetimi ve düzenleme yalnızca yetkili program yöneticilerine açıktır.</div></footer>
    </div>
  );
}

/* ============================================================
   10) GELEN GÖRÜŞLER (yönetici; Görüşler sekmesinin üstünde)
   ============================================================ */
function GelenGorusler({ duzenlemeYetkisi }) {
  const [liste, setListe] = uS([]);
  const [hata, setHata] = uS(null);
  const [gorusler, setGorusler] = useKayitliState("paydasGorusleri_v1", []);
  const [paydaslar, setPaydaslar] = useKayitliState("paydaslar_v2", PAYDASLAR_INIT);
  uE(() => {
    if (!duzenlemeYetkisi) return;
    const f = fb();
    if (!f || !f.db || !f.db.collection) return;
    try {
      return f.db.collection("gorusKutusu").onSnapshot(
        (snap) => setListe(snap.docs.map((d) => ({ id: d.id, ref: d.ref, ...d.data() })).filter((g) => g.durum !== "aktarildi" && g.durum !== "reddedildi").sort((a, b) => (a.tarih < b.tarih ? 1 : -1))),
        (e) => setHata(e?.code === "permission-denied" ? "izin" : e?.message || "hata"),
      );
    } catch (e) { setHata(e.message); }
  }, [duzenlemeYetkisi]);
  if (!duzenlemeYetkisi) return null;
  const aktar = async (g) => {
    let p = (paydaslar || []).find((x) => g.eposta && (x.eposta || "").toLowerCase() === g.eposta);
    let yeniPaydaslar = paydaslar;
    if (!p) {
      const ic = /Öğrenci|Öğretim elemanı/.test(g.tur);
      p = { id: "p-portal-" + (g.uid || Date.now()), tip: ic ? "ic" : "dis", ad: g.ad || g.eposta || "Portal kullanıcısı", rol: g.tur, katki: "Paydaş portalı görüşü", durum: "aktif", eposta: g.eposta || "", telefon: "", kurum: "" };
      yeniPaydaslar = [...(paydaslar || []), p];
      setPaydaslar(yeniPaydaslar);
    }
    setGorusler([...(gorusler || []), { id: "g-" + Date.now(), paydasId: p.id, tarih: (g.tarih || "").slice(0, 10), kaynak: "panel", konu: g.konu || "", metin: g.metin, notlar: "Paydaş portalı (" + g.tur + ")", durum: "yeni", olusturma: new Date().toISOString() }]);
    try { await g.ref.update({ durum: "aktarildi", aktarma: new Date().toISOString() }); } catch (e) {}
  };
  const reddet = async (g) => { if (!confirm("Bu görüş aktarılmadan kapatılsın mı?")) return; try { await g.ref.update({ durum: "reddedildi" }); } catch (e) {} };
  if (hata === "izin") {
    return <div className="rounded border border-amber-800/60 bg-amber-950/20 p-4 text-sm text-amber-200 mb-6">Paydaş portalından gelen görüşler okunamıyor: Firestore kurallarında <span className="font-mono">gorusKutusu</span> koleksiyonu tanımlı değil. Kurulum adımları depo içindeki <span className="font-mono">FIRESTORE_KURALLARI.md</span> dosyasındadır.</div>;
  }
  if (!liste.length) return null;
  return (
    <div className="mb-6 border border-blue-800/60 bg-blue-950/15 rounded-lg">
      <div className="px-5 py-3 border-b border-blue-900/50 flex items-center justify-between"><h3 className="font-display text-lg font-semibold">Paydaş portalından gelen görüşler <span className="text-blue-300">({liste.length})</span></h3><span className="text-xs text-slate-400">Aktarılan görüş aşağıdaki listeye ve iyileştirme döngüsü önerilerine düşer</span></div>
      <ul className="divide-y divide-slate-800">
        {liste.map((g) => (
          <li key={g.id} className="px-5 py-3 flex gap-4 items-start">
            <div className="flex-1">
              <div className="text-xs text-slate-400"><span className="font-mono">{tarihTR(g.tarih)}</span> · {g.ad || "—"} · {g.tur} {g.konu && <>· {g.konu}</>} <span className="text-slate-600">{g.eposta}</span></div>
              <p className="text-sm text-slate-200 mt-1 whitespace-pre-wrap">{g.metin}</p>
            </div>
            <div className="flex flex-col gap-1.5 shrink-0"><button onClick={() => aktar(g)} className="text-xs px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded">Görüşlere aktar</button><button onClick={() => reddet(g)} className="text-xs px-3 py-1.5 text-slate-400 hover:text-rose-300">Kapat</button></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

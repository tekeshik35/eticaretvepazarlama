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

/* ---------- Canlı program verisi: öğretim planı ve program kimliği ----------
   Her ikisi de yöneticilerce panelden düzenlenir (panel/main → ogretimPlani_v1,
   programKimligi_v1). Öğrencilerin ve paydaşların görebilmesi için yöneticinin
   her değişikliği ayrıca public/program dokümanına yansıtılır (PublicSenkron). */
const PLAN_BASLANGIC = window.KATALOG_2026;
const KIMLIK_BASLANGIC = {
  misyon: PROGRAM_MISYON,
  vizyon: PROGRAM_VIZYON,
  dayanak: "Bölüm Kurulu Kararı 12.06.2026, 2026/04 (Ek-1)",
  pea: O.PEA.map((p) => ({ ...p, dersler: O.PEA_DERS[p.kod] || "" })),
  pc: O.PC.map((p) => ({ ...p, pea: O.PEA_PC[p.kod] || {} })),
  apg: O.APG.map((a) => ({ ...a })),
};
const usePlan = () => useKayitliState("ogretimPlani_v1", PLAN_BASLANGIC);
const useKimlik = () => useKayitliState("programKimligi_v1", KIMLIK_BASLANGIC);
const PC_KODLARI = (kimlik) => (kimlik?.pc || KIMLIK_BASLANGIC.pc).map((p) => p.kod);
const ozgunPc = (kod) => parseInt(String(kod).replace(/\D/g, ""), 10) > 10;

const GRUP_AD = { zorunlu: "Zorunlu", slot: "Seçmeli yeri", MAS: "Mesleki alan seçmeli", GS: "Genel seçmeli", GOS: "Ortak seçmeli", secmeli: "Seçmeli" };
const YY_AD = ["", "1. Sınıf — Güz", "1. Sınıf — Bahar", "2. Sınıf — Güz", "2. Sınıf — Bahar"];
const toplamAkts = (d) => (Number(d.akts) || 0) * (Number(d.adet) || 1);
const planOzet = (plan) => {
  const ds = (plan?.dersler || []).filter((d) => d.donem);
  const donem = [1, 2, 3, 4].map((x) => ds.filter((d) => d.donem === x).reduce((s, d) => s + toplamAkts(d), 0));
  const top = (f) => ds.filter(f).reduce((s, d) => s + toplamAkts(d), 0);
  const tumu = plan?.dersler || [];
  return {
    donem,
    toplam: donem.reduce((a, b) => a + b, 0),
    mesleki: top((d) => d.mesleki),
    poc: top((d) => d.poc),
    ime: top((d) => d.ime),
    disPaydas: tumu.filter((d) => d.disPaydas).reduce((s, d) => s + toplamAkts(d), 0),
  };
};
const planSartlari = (plan) => {
  const o = planOzet(plan);
  return [
    { kod: "5.1", baslik: "Alana özgü mesleki dersler", esik: 60, mevcut: o.mesleki, not: "“Mesleki” etiketli dersler + mesleki alan seçmeli yerleri" },
    { kod: "5.1", baslik: "Programa özgü çıktıları (PÇ11–14) sağlayan zorunlu dersler", esik: 20, mevcut: o.poc, not: "“PÇ11–14” etiketli dersler" },
    { kod: "5.2", baslik: "Dış paydaş önerilerini dikkate alan dersler", esik: 5, mevcut: o.disPaydas, not: "“Dış paydaş” etiketli dersler (seçmeliler dahil)" },
    { kod: "5.3", baslik: "İşletmede mesleki eğitim / staj / uygulamalı", esik: 15, mevcut: o.ime, not: "“İME” etiketli dersler" },
    { kod: "Genel", baslik: "Toplam AKTS (4 yarıyıl)", esik: 120, mevcut: o.toplam, not: `Yarıyıllar: ${o.donem.join(" + ")}` },
  ];
};

/* Yöneticinin plan/kimlik değişikliklerini öğrenci ve paydaşların okuyabildiği
   public/program dokümanına yansıtır. Görünmez; yalnızca yöneticide çalışır. */
function PublicSenkron() {
  const [plan] = usePlan();
  const [kimlik] = useKimlik();
  const [arsiv] = useKayitliState("ogretimPlaniArsiv_v1", []);
  const json = JSON.stringify({ plan, kimlik, arsiv });
  uE(() => {
    const f = fb();
    if (!f || !f.db || !f.db.collection) return;
    if (window.__publicSon === json) return;
    const t = setTimeout(() => {
      f.db.collection("public").doc("program").set({ ogretimPlani: plan, programKimligi: kimlik, planArsivi: arsiv, guncelleme: new Date().toISOString() })
        .then(() => { window.__publicSon = json; window.__publicHata = null; })
        .catch((e) => { window.__publicHata = e?.code || "hata"; });
    }, 1500);
    return () => clearTimeout(t);
  }, [json]);
  return null;
}
/* Öğrenci/paydaş tarafı: public/program dokümanını okur. */
const usePublicProgram = () => {
  const [veri, setVeri] = uS(null);
  const [hata, setHata] = uS(null);
  uE(() => {
    const f = fb();
    if (!f || !f.db || !f.db.collection) { setHata("baglanti"); return; }
    return f.db.collection("public").doc("program").onSnapshot(
      (s) => { const ok = typeof s.exists === "function" ? s.exists() : s.exists; setVeri(ok ? s.data() : {}); },
      (e) => setHata(e?.code || "hata"),
    );
  }, []);
  return { plan: veri?.ogretimPlani || null, kimlik: veri?.programKimligi || null, arsiv: veri?.planArsivi || [], guncelleme: veri?.guncelleme, hata, yukleniyor: !veri && !hata };
};

/* ---------- APG değerlendirme ---------- */
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
   1) YÖNETİM PANOSU (Özet)
   Plan §9 PUKÖ döngüsünün bu akademik yıldaki durumu.
   ============================================================ */
const PUKO = ["Planla", "Uygula", "Kontrol Et", "Önlem Al"];
function OzetSekmesiODR({ duzenlemeYetkisi, setAktifSekme }) {
  const [gorevler] = useKayitliState("gorevler", GOREVLER_INIT);
  const [gorusler] = useKayitliState("paydasGorusleri_v1", []);
  const [toplantilar] = useKayitliState("toplantilar", []);
  const [anketler] = useKayitliState("anketler", []);
  const [dongu] = useKayitliState("iyilestirmeDongusu_v1", DONGU_BASLANGIC);
  const [takvimDurum] = useKayitliState("takvimDurum_v1", {});
  const [apgSonuc] = useKayitliState("apgSonuclari_v1", APG_BASLANGIC);
  const [ziyaret, setZiyaret] = useKayitliState("kurumZiyaretiTarihi", "");
  const [plan] = usePlan();
  const [kimlik] = useKimlik();
  const yil = akademikYil();
  const simdi = new Date();
  const ay = simdi.getMonth() + 1;
  const sartlar = planSartlari(plan);
  const td = takvimDurum[yil] || {};
  const buAy = IS_TAKVIMI.filter((t) => akademikAyBaslangic(yil, t.bas) <= simdi && akademikAyBitis(yil, t.bit) >= simdi && td[t.id]?.durum !== "yapildi");
  const geciken = IS_TAKVIMI.filter((t) => akademikAyBitis(yil, t.bit) < simdi && td[t.id]?.durum !== "yapildi" && td[t.id]?.durum !== "ertelendi");
  const ey = { yapildi: 0, devam: 0, bekliyor: 0 };
  (gorevler || []).forEach((x) => (ey[x.durum] = (ey[x.durum] || 0) + 1));
  const bagli = new Set((dongu || []).map((d) => d.gorusId).filter(Boolean));
  const acikGorus = (gorusler || []).filter((x) => !x.arsiv && !bagli.has(x.id)).length;
  const dAcik = (dongu || []).filter((d) => d.durum !== "kapandi").length;
  const icinde = (t) => t && akademikYil(new Date(t)) === yil;
  const buYilToplanti = (toplantilar || []).filter((t) => icinde(t.tarih));
  const dkVar = buYilToplanti.some((t) => t.tur === "danisma");
  const buYilGorus = (gorusler || []).filter((g) => icinde(g.tarih)).length;
  const buYilAnket = (anketler || []).filter((a) => icinde(a.bitisTarihi) || icinde(a.baslangicTarihi) || (a.donem || "").includes(yil.slice(0, 4))).length;
  const apgYil = Object.keys(apgSonuc || {}).sort().reverse().find((y) => Object.values(apgSonuc[y] || {}).some((v) => v && v.deger !== "" && v.deger != null));
  const apgList = kimlik?.apg || O.APG;
  const apgDurum = apgList.map((a) => ({ a, d: apgYil ? apgDegerlendir(a, apgSonuc, apgYil) : { durum: "veri_yok" } }));
  const gunKaldi = Math.ceil((new Date("2026-12-31T23:59:00") - simdi) / 864e5);
  const Git = ({ id, children }) => <button onClick={() => setAktifSekme(id)} className="text-xs text-blue-400 hover:text-blue-300 whitespace-nowrap">{children} →</button>;
  const Sayi = ({ e, v, alt, uyari }) => (
    <div className="flex items-baseline justify-between gap-3 py-1.5 border-b border-slate-800/70 last:border-0">
      <span className="text-sm text-slate-400">{e}</span>
      <span className={`font-mono text-sm ${uyari ? "text-amber-300" : "text-slate-100"}`}>{v}{alt && <span className="text-slate-500 text-xs ml-1">{alt}</span>}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-blue-400">Program Sürdürülebilir Yönetim Paneli</div>
          <h1 className="font-display text-3xl font-semibold mt-1">{yil} akademik yılı · {AY_ADLARI[ay]}</h1>
          <p className="text-sm text-slate-400 mt-1">Planla–Uygula–Kontrol Et–Önlem Al döngüsünün bu yılki durumu (Yönetim Planı §9, §11).</p>
        </div>
        <div className="flex gap-2 flex-wrap text-xs">
          <span className={`rounded border px-3 py-1.5 ${RENK.amber}`}>Koşullu akreditasyon 31.12.2026 · {gunKaldi > 0 ? `${gunKaldi} gün` : "süre doldu"}</span>
          <span className={`rounded border px-3 py-1.5 ${ziyaret ? RENK.blue : RENK.slate}`}>Kurum ziyareti: {ziyaret ? tarihTR(ziyaret) : "tarih bekleniyor"}
            {duzenlemeYetkisi && <input type="date" value={ziyaret || ""} onChange={(e) => setZiyaret(e.target.value)} className="ml-2 bg-transparent border-b border-slate-600 text-slate-200 w-32" aria-label="Kurum ziyareti tarihi" />}
          </span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {PUKO.map((p) => {
          const isler = IS_TAKVIMI.filter((t) => t.pukö === p);
          const yapilan = isler.filter((t) => td[t.id]?.durum === "yapildi").length;
          const gec = isler.filter((t) => geciken.includes(t)).length;
          return (
            <button key={p} onClick={() => setAktifSekme("takvim")} className="text-left border border-slate-800 bg-slate-900/40 rounded-lg p-4 hover:border-slate-600">
              <div className="flex justify-between items-center"><span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">{p}</span>{gec > 0 && <Rozet renk="rose">{gec} gecikti</Rozet>}</div>
              <div className="font-display text-2xl mt-2">{yapilan}<span className="text-slate-500 text-base">/{isler.length}</span></div>
              <div className="h-1.5 bg-slate-800 rounded mt-2 overflow-hidden"><div className="h-full bg-blue-500" style={{ width: `${isler.length ? (yapilan / isler.length) * 100 : 0}%` }} /></div>
              <div className="text-xs text-slate-500 mt-2">takvim işi tamamlandı</div>
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Kart baslik={`Bu dönem yapılacaklar · ${AY_ADLARI[ay]}`} sag={<Git id="takvim">İş takvimi</Git>} className="lg:col-span-2">
          {buAy.length === 0 && geciken.length === 0 && <p className="text-sm text-slate-400">Bu ay için bekleyen takvim işi yok.</p>}
          <ul className="space-y-2.5">
            {geciken.map((t) => (<li key={t.id} className="flex gap-3 items-start text-sm"><Rozet renk="rose">Gecikti</Rozet><span className="text-slate-200">{t.is}<span className="text-slate-500"> · {t.sorumlu}</span></span></li>))}
            {buAy.map((t) => (<li key={t.id} className="flex gap-3 items-start text-sm"><Rozet renk="amber">Bu ay</Rozet><span className="text-slate-200">{t.is}<span className="text-slate-500"> · {t.sorumlu}</span></span></li>))}
          </ul>
        </Kart>
        <Kart baslik="Paydaş katılımı · bu yıl" sag={<Git id="toplantilar">Toplantılar</Git>}>
          <Sayi e="Kurul / paydaş toplantısı" v={buYilToplanti.length} />
          <Sayi e="Danışma Kurulu toplandı mı?" v={dkVar ? "Evet" : "Henüz değil"} uyari={!dkVar} />
          <Sayi e="Kaydedilen anket" v={buYilAnket} />
          <Sayi e="Panelden gelen görüş" v={buYilGorus} />
        </Kart>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Kart baslik="Sürekli iyileştirme" sag={<Git id="dongu">Döngü</Git>}>
          <Sayi e="Döngüde açık kayıt" v={dAcik} uyari={dAcik > 0} />
          <Sayi e="Döngüye alınmamış görüş" v={acikGorus} uyari={acikGorus > 0} />
          <Sayi e="Eylem — tamamlandı" v={ey.yapildi} />
          <Sayi e="Eylem — devam / bekliyor" v={`${ey.devam || 0} / ${ey.bekliyor || 0}`} />
        </Kart>
        <Kart baslik={`Eğitim amaçları (APG)${apgYil ? " · " + apgYil : ""}`} sag={<Git id="apg">APG</Git>} className="lg:col-span-2">
          <div className="grid sm:grid-cols-2 gap-x-6">
            {apgDurum.map(({ a, d }) => {
              const [r, et] = APG_DURUM_ROZET[d.durum];
              return (
                <div key={a.kod} className="flex items-center justify-between gap-3 py-1.5 border-b border-slate-800/70">
                  <span className="text-sm min-w-0"><span className="font-mono text-xs text-slate-500 mr-2">{a.kod}</span>{a.gosterge}</span>
                  <span className="flex items-center gap-2 shrink-0"><span className="font-mono text-sm">{d.deger ?? "—"}</span><Rozet renk={r}>{et}</Rozet></span>
                </div>
              );
            })}
          </div>
        </Kart>
      </div>

      <Kart baslik={`Öğretim planı göstergeleri · ${plan?.ad || ""}`} sag={<Git id="ogretim">Öğretim planı</Git>}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-[10px] font-mono uppercase text-slate-500 text-left"><th className="py-2 pr-3">MEDEK</th><th className="pr-3">Şart</th><th className="pr-3 text-right">Eşik</th><th className="pr-3 text-right">Plan</th><th className="text-right">Durum</th></tr></thead>
            <tbody>
              {sartlar.map((s, i) => (
                <tr key={i} className="border-t border-slate-800">
                  <td className="py-2.5 pr-3 font-mono text-xs text-slate-400">{s.kod}</td>
                  <td className="pr-3">{s.baslik}<div className="text-xs text-slate-500">{s.not}</div></td>
                  <td className="pr-3 text-right font-mono text-slate-400">≥ {s.esik}</td>
                  <td className="pr-3 text-right font-mono font-semibold">{s.mevcut} AKTS</td>
                  <td className="text-right"><Rozet renk={s.mevcut >= s.esik ? "emerald" : "rose"}>{s.mevcut >= s.esik ? "✓ Karşılıyor" : "✗ Eksik"}</Rozet></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-2">Öğretim planı panelde güncellendikçe bu değerler kendiliğinden yeniden hesaplanır.</p>
      </Kart>
    </div>
  );
}

/* ============================================================
   2) PROGRAM KİMLİĞİ — misyon, vizyon, PEA, PÇ, APG (düzenlenebilir)
   Plan §6 ve §8: yıllık izlenir, Bölüm Kurulu kararıyla güncellenir;
   her güncellemede önceki sürüm arşive alınır.
   ============================================================ */
const PEA_IS = ["", "○", "●"];
function ProgramKimligiIcerik({ kimlik, kompakt = false }) {
  const k = kimlik || KIMLIK_BASLANGIC;
  const peaKodlari = (k.pea || []).map((p) => p.kod);
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        {[["Misyon", k.misyon], ["Vizyon", k.vizyon]].map(([b, m]) => (
          <div key={b} className="border border-slate-800 bg-slate-900/40 rounded-lg p-5">
            <div className="text-xs font-mono uppercase tracking-widest text-blue-400 mb-2">{b}</div>
            <p className="text-slate-200 leading-relaxed">{m}</p>
          </div>
        ))}
      </div>
      <div>
        <h3 className="font-display text-xl font-semibold mb-3">Program Eğitim Amaçları (PEA)</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {(k.pea || []).map((p) => (
            <div key={p.kod} className="border border-slate-800 rounded-lg p-4 bg-slate-900/30">
              <div className="flex items-center gap-2"><Rozet renk="blue">{p.kod}</Rozet><span className="font-semibold">{p.baslik}</span></div>
              <p className="text-sm text-slate-300 mt-2">{p.tanim}</p>
              {!kompakt && p.dersler && <p className="text-xs text-slate-500 mt-2">Destekleyen dersler: {p.dersler}</p>}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-display text-xl font-semibold mb-1">Program Çıktıları</h3>
        <p className="text-xs text-slate-500 mb-3">PÇ1–PÇ10 MEDEK ortak çıktılarıyla, PÇ11 ve sonrası programa özgü çıktılarla ilişkilidir.{!kompakt && " ● güçlü, ○ destekleyici ilişki."}</p>
        <div className="overflow-x-auto border border-slate-800 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-slate-900/60"><tr className="text-[10px] font-mono uppercase text-slate-500 text-left"><th className="p-2.5">PÇ</th><th className="p-2.5">Program çıktısı</th><th className="p-2.5">Düzlem</th>{!kompakt && peaKodlari.map((p) => <th key={p} className="p-2.5 text-center">{p}</th>)}</tr></thead>
            <tbody>
              {(k.pc || []).map((p) => (
                <tr key={p.kod} className="border-t border-slate-800">
                  <td className={`p-2.5 font-mono text-xs ${ozgunPc(p.kod) ? "text-amber-300" : "text-slate-300"}`}>{p.kod}</td>
                  <td className="p-2.5 text-slate-200">{p.metin}</td>
                  <td className="p-2.5 text-xs text-slate-400">{p.duzlem}</td>
                  {!kompakt && peaKodlari.map((e) => <td key={e} className="p-2.5 text-center text-blue-300">{p.pea?.[e] || ""}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
function ApgTanimTablosu({ apg }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="text-[10px] font-mono uppercase text-slate-500 text-left"><th className="py-2 pr-3">APG</th><th className="pr-3">Gösterge</th><th className="pr-3">Veri kaynağı / soru</th><th className="pr-3">Hesaplama</th><th>Hedef</th></tr></thead>
        <tbody>
          {(apg || []).map((a) => (
            <tr key={a.kod} className="border-t border-slate-800 align-top">
              <td className="py-2.5 pr-3 font-mono text-xs text-blue-300">{a.kod}<div className="text-slate-500">{a.pea}</div></td>
              <td className="pr-3 py-2.5">{a.gosterge}</td>
              <td className="pr-3 py-2.5 text-xs text-slate-400">{a.anket || a.veriKaynagi}</td>
              <td className="pr-3 py-2.5 text-xs text-slate-400">{a.hesaplama}</td>
              <td className="py-2.5 font-mono text-emerald-300 whitespace-nowrap">{a.hedef?.metin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function KimlikDuzenleyici({ kimlik, kaydet, vazgec }) {
  const [t, setT] = uS(() => JSON.parse(JSON.stringify(kimlik)));
  const [dayanak, setDayanak] = uS("");
  const set = (yol, v) => { const k = JSON.parse(JSON.stringify(t)); let o = k; for (let i = 0; i < yol.length - 1; i++) o = o[yol[i]]; o[yol[yol.length - 1]] = v; setT(k); };
  const sil = (liste, i) => { if (!window.confirm || confirm("Bu satır silinsin mi?")) setT({ ...t, [liste]: t[liste].filter((_, j) => j !== i) }); };
  const peaKodlari = t.pea.map((p) => p.kod);
  return (
    <div className="space-y-6">
      <div className="rounded border border-amber-800/60 bg-amber-950/20 p-4 text-sm text-amber-100">Plan §6: misyon, vizyon, PEA ve PÇ değişiklikleri Danışma Kurulu görüşü alınarak Bölüm Kurulu kararıyla yapılır. Kaydederken kararın tarih ve sayısını yazın; önceki sürüm arşive alınır.</div>
      <Kart baslik="Misyon ve vizyon">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="text-xs text-slate-400">Misyon<textarea rows={6} value={t.misyon} onChange={(e) => set(["misyon"], e.target.value)} className={girdiSinif + " mt-1"} /></label>
          <label className="text-xs text-slate-400">Vizyon<textarea rows={6} value={t.vizyon} onChange={(e) => set(["vizyon"], e.target.value)} className={girdiSinif + " mt-1"} /></label>
        </div>
      </Kart>
      <Kart baslik="Program eğitim amaçları" sag={<button onClick={() => setT({ ...t, pea: [...t.pea, { kod: "PEA-" + (t.pea.length + 1), baslik: "", tanim: "", dersler: "" }] })} className="text-xs text-blue-400">+ PEA ekle</button>}>
        <div className="space-y-3">
          {t.pea.map((p, i) => (
            <div key={i} className="grid md:grid-cols-[6rem_1fr_2fr_auto] gap-2 items-start">
              <input value={p.kod} onChange={(e) => set(["pea", i, "kod"], e.target.value)} className={girdiSinif} />
              <input value={p.baslik} onChange={(e) => set(["pea", i, "baslik"], e.target.value)} className={girdiSinif} placeholder="Başlık" />
              <div className="space-y-2"><textarea rows={2} value={p.tanim} onChange={(e) => set(["pea", i, "tanim"], e.target.value)} className={girdiSinif} placeholder="Tanım" /><input value={p.dersler || ""} onChange={(e) => set(["pea", i, "dersler"], e.target.value)} className={girdiSinif} placeholder="Destekleyen dersler" /></div>
              <button onClick={() => sil("pea", i)} className="text-xs text-rose-400 pt-2">Sil</button>
            </div>
          ))}
        </div>
      </Kart>
      <Kart baslik="Program çıktıları" sag={<button onClick={() => setT({ ...t, pc: [...t.pc, { kod: "PÇ" + (t.pc.length + 1), metin: "", duzlem: "Bilgi", pea: {} }] })} className="text-xs text-blue-400">+ PÇ ekle</button>}>
        <p className="text-xs text-slate-500 mb-3">PEA sütunlarına tıklayarak ilişkiyi değiştirin: boş → ○ destekleyici → ● güçlü.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-[10px] font-mono uppercase text-slate-500 text-left"><th className="pb-2">Kod</th><th>Program çıktısı</th><th>Düzlem</th>{peaKodlari.map((p) => <th key={p} className="text-center px-1">{p}</th>)}<th /></tr></thead>
            <tbody>
              {t.pc.map((p, i) => (
                <tr key={i} className="border-t border-slate-800 align-top">
                  <td className="py-1.5 pr-2 w-20"><input value={p.kod} onChange={(e) => set(["pc", i, "kod"], e.target.value)} className={girdiSinif} /></td>
                  <td className="py-1.5 pr-2 min-w-[18rem]"><textarea rows={2} value={p.metin} onChange={(e) => set(["pc", i, "metin"], e.target.value)} className={girdiSinif} /></td>
                  <td className="py-1.5 pr-2 w-32"><select value={p.duzlem} onChange={(e) => set(["pc", i, "duzlem"], e.target.value)} className={girdiSinif}>{["Bilgi", "Beceri", "Yetkinlik"].map((d) => <option key={d}>{d}</option>)}</select></td>
                  {peaKodlari.map((e) => (<td key={e} className="text-center"><button onClick={() => { const v = p.pea?.[e] || ""; set(["pc", i, "pea"], { ...(p.pea || {}), [e]: PEA_IS[(PEA_IS.indexOf(v) + 1) % 3] }); }} className="w-9 h-9 border border-slate-700 rounded text-blue-300 hover:border-blue-500">{p.pea?.[e] || ""}</button></td>))}
                  <td className="pl-2 pt-2"><button onClick={() => sil("pc", i)} className="text-xs text-rose-400">Sil</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Kart>
      <Kart baslik="Anahtar performans göstergeleri" sag={<button onClick={() => setT({ ...t, apg: [...t.apg, { kod: "APG-" + (t.apg.length + 1), gosterge: "", pea: "PEA-1", veriKaynagi: "", anket: "", hesaplama: "", hedef: { metin: "", deger: 0, birim: "%" } }] })} className="text-xs text-blue-400">+ APG ekle</button>}>
        <div className="space-y-3">
          {t.apg.map((a, i) => (
            <div key={i} className="border border-slate-800 rounded p-3 grid md:grid-cols-6 gap-2">
              <input value={a.kod} onChange={(e) => set(["apg", i, "kod"], e.target.value)} className={girdiSinif} />
              <input value={a.gosterge} onChange={(e) => set(["apg", i, "gosterge"], e.target.value)} className={girdiSinif + " md:col-span-3"} placeholder="Gösterge" />
              <select value={a.pea} onChange={(e) => set(["apg", i, "pea"], e.target.value)} className={girdiSinif}>{peaKodlari.map((p) => <option key={p}>{p}</option>)}</select>
              <button onClick={() => sil("apg", i)} className="text-xs text-rose-400">Sil</button>
              <input value={a.anket || ""} onChange={(e) => set(["apg", i, "anket"], e.target.value)} className={girdiSinif + " md:col-span-3"} placeholder="Veri kaynağı / anket sorusu" />
              <input value={a.hesaplama || ""} onChange={(e) => set(["apg", i, "hesaplama"], e.target.value)} className={girdiSinif + " md:col-span-3"} placeholder="Hesaplama" />
              <select value={a.hedef?.birim || "%"} onChange={(e) => set(["apg", i, "hedef"], { ...a.hedef, birim: e.target.value, metin: `≥ ${e.target.value === "%" ? "%" : ""}${a.hedef?.deger ?? ""}${e.target.value === "%" ? "" : " / 5"}` })} className={girdiSinif}><option value="%">Oran (%)</option><option value="/5">Puan (1–5)</option></select>
              <label className="text-xs text-slate-400 flex items-center gap-2 md:col-span-2">Hedef ≥<input value={a.hedef?.deger ?? ""} inputMode="decimal" onChange={(e) => { const v = parseFloat(String(e.target.value).replace(",", ".")); set(["apg", i, "hedef"], { ...a.hedef, deger: isNaN(v) ? "" : v, metin: `≥ ${a.hedef?.birim === "%" ? "%" : ""}${e.target.value}${a.hedef?.birim === "%" ? "" : " / 5"}` }); }} className={girdiSinif} /></label>
            </div>
          ))}
        </div>
      </Kart>
      <div className="flex flex-wrap items-end gap-3 justify-end sticky bottom-0 bg-slate-950/95 py-3 border-t border-slate-800">
        <label className="text-xs text-slate-400 flex-1 min-w-[16rem]">Dayanak (Bölüm Kurulu kararı tarih/sayı) *<input value={dayanak} onChange={(e) => setDayanak(e.target.value)} className={girdiSinif + " mt-1"} placeholder="ör. BK 10.12.2026 / 2026-12" /></label>
        <button onClick={vazgec} className="px-4 py-2 text-sm text-slate-400">Vazgeç</button>
        <button onClick={() => { if (!dayanak.trim()) { alert("Değişikliğin dayanağı olan kararı yazın."); return; } kaydet({ ...t, dayanak: dayanak.trim() }); }} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm font-medium">Kaydet</button>
      </div>
    </div>
  );
}
function KimlikSekmesi({ duzenlemeYetkisi }) {
  const [kimlik, setKimlik] = useKimlik();
  const [arsiv, setArsiv] = useKayitliState("programKimligiArsiv_v1", []);
  const [duzenle, setDuzenle] = uS(false);
  const [arsivAcik, setArsivAcik] = uS(null);
  const kaydet = (yeni) => {
    setArsiv([{ tarih: new Date().toISOString(), dayanak: kimlik.dayanak, kimlik }, ...(arsiv || [])]);
    setKimlik(yeni);
    setDuzenle(false);
  };
  return (
    <div className="space-y-6">
      <SekmeBaslik baslik="Program Kimliği" alt={`Yürürlükteki dayanak: ${kimlik.dayanak}. Plan §6: her yıl izlenir, 4 yılda bir kapsamlı güncellenir; üst belgelerde değişiklik, APG'de iki yıl üst üste sapma, kritik paydaş bulgusu veya sektörde köklü dönüşümde periyot beklenmeden güncellenir.`} sag={duzenlemeYetkisi && !duzenle && <button onClick={() => setDuzenle(true)} className="px-4 py-2 border border-slate-600 hover:border-blue-500 rounded text-sm">Düzenle</button>} />
      {duzenle ? <KimlikDuzenleyici kimlik={kimlik} kaydet={kaydet} vazgec={() => setDuzenle(false)} /> : (
        <>
          <ProgramKimligiIcerik kimlik={kimlik} />
          <Kart baslik="Anahtar performans göstergeleri (tanımlar)"><ApgTanimTablosu apg={kimlik.apg} /><p className="text-xs text-slate-500 mt-3">Sonuçlar “APG ve PÇ Ulaşma” sekmesine yıllık girilir; ilk ölçüm yılı referans yılıdır.</p></Kart>
          {(arsiv || []).length > 0 && (
            <Kart baslik={`Önceki sürümler (${arsiv.length})`}>
              <ul className="divide-y divide-slate-800 text-sm">
                {arsiv.map((a, i) => (<li key={i} className="py-2"><button onClick={() => setArsivAcik(arsivAcik === i ? null : i)} className="text-left w-full flex justify-between"><span>{a.dayanak}</span><span className="text-xs text-slate-500">{tarihTR(a.tarih)}'e kadar yürürlükte</span></button>{arsivAcik === i && <div className="mt-3"><ProgramKimligiIcerik kimlik={a.kimlik} kompakt /></div>}</li>))}
              </ul>
            </Kart>
          )}
        </>
      )}
    </div>
  );
}

/* ============================================================
   3) ÖĞRETİM PLANI — düzenlenebilir plan, seçmeli havuzları, Ders–PÇ matrisi
   Plan §7: yıllık izlenir; değişiklik Bölüm Kurulu → BEK → GAUNEK sürecinden
   geçer. Öğrenciler yayımlanan planı Paydaş Portalı'nda görür.
   ============================================================ */
const HAVUZ_GRUPLARI = [["MAS", "Mesleki alan seçmeli dersler"], ["GS", "Genel seçmeli dersler"], ["GOS", "Ortak seçmeli dersler (GOS)"]];
const ETIKETLER = [["mesleki", "Mesleki", "MEDEK 5.1 — alana özgü mesleki ders"], ["poc", "PÇ11–14", "Programa özgü çıktıları sağlayan zorunlu ders"], ["disPaydas", "Dış paydaş", "MEDEK 5.2 — dış paydaş önerisiyle eklenen/güncellenen"], ["ime", "İME", "MEDEK 5.3 — işletmede mesleki eğitim / staj"]];
const hucreRenk = (v) => (v ? ["", "bg-slate-800 text-slate-400", "bg-blue-950 text-blue-300", "bg-blue-900/70 text-blue-200", "bg-blue-700/70 text-white", "bg-blue-500 text-white"][v] : "");

function N(props) { return <input {...props} className="w-12 bg-slate-950 border border-slate-700 rounded px-1.5 py-1 text-xs font-mono text-center" />; }
function PlanSatir({ x, duzen, degistir, sil }) {
    const slot = x.grup === "slot";
    if (!duzen) return (
      <tr className="border-t border-slate-800">
        <td className="py-1.5 font-mono text-xs text-slate-400 pr-2">{x.kod || "—"}</td>
        <td className={slot ? "text-slate-400 italic" : ""}>{x.ad}{slot && x.adet > 1 ? ` (${x.adet} ders)` : ""}
          <span className="ml-2 inline-flex gap-1 flex-wrap align-middle">{ETIKETLER.filter(([k]) => x[k] && k !== "mesleki").map(([k, e]) => <Rozet key={k} renk={k === "disPaydas" ? "purple" : k === "ime" ? "emerald" : "amber"}>{e}</Rozet>)}</span>
        </td>
        <td className="text-center text-xs">{x.tip}</td>
        <td className="text-center font-mono text-xs text-slate-400 whitespace-nowrap">{x.t}-{x.u}-{x.k}</td>
        <td className="text-right font-mono">{slot && x.adet > 1 ? `${x.adet}×${x.akts}` : x.akts}</td>
      </tr>
    );
    return (
      <tr className="border-t border-slate-800 align-top">
        <td className="py-1.5 pr-1"><input value={x.kod} onChange={(e) => degistir(x.id, "kod", e.target.value.toUpperCase())} className="w-24 bg-slate-950 border border-slate-700 rounded px-1.5 py-1 text-xs font-mono" placeholder={slot ? "—" : "Kod"} /></td>
        <td className="py-1.5 pr-1 min-w-[14rem]">
          <input value={x.ad} onChange={(e) => degistir(x.id, "ad", e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-sm" />
          <div className="flex gap-1 flex-wrap mt-1">
            {ETIKETLER.map(([k, e, acik]) => <button key={k} title={acik} onClick={() => degistir(x.id, k, !x[k])} className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${x[k] ? "border-blue-500 text-blue-200 bg-blue-950" : "border-slate-700 text-slate-500"}`}>{e}</button>)}
            {x.donem && <select value={x.donem} onChange={(e) => degistir(x.id, "donem", parseInt(e.target.value))} className="text-[10px] bg-slate-950 border border-slate-700 rounded px-1">{[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}. yarıyıl</option>)}</select>}
            {slot && <label className="text-[10px] text-slate-400 flex items-center gap-1">adet <N value={x.adet} onChange={(e) => degistir(x.id, "adet", parseInt(e.target.value) || 1)} /></label>}
          </div>
        </td>
        <td className="text-center"><select value={x.tip} onChange={(e) => degistir(x.id, "tip", e.target.value)} className="bg-slate-950 border border-slate-700 rounded text-xs px-1 py-1"><option>Z</option><option>S</option></select></td>
        <td className="text-center whitespace-nowrap"><N value={x.t} onChange={(e) => degistir(x.id, "t", e.target.value)} /><N value={x.u} onChange={(e) => degistir(x.id, "u", e.target.value)} /><N value={x.k} onChange={(e) => degistir(x.id, "k", e.target.value)} /></td>
        <td className="text-right whitespace-nowrap"><N value={x.akts} onChange={(e) => degistir(x.id, "akts", parseFloat(String(e.target.value).replace(",", ".")) || 0)} /><button onClick={() => sil(x.id)} className="text-xs text-rose-400 ml-2" title="Satırı sil">✕</button></td>
      </tr>
    );
}
function PlanTablo({ satirlar, duzen, degistir, sil }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="text-[10px] font-mono uppercase text-slate-500 text-left"><th className="pb-2">Kod</th><th>Ders</th><th className="text-center">Z/S</th><th className="text-center">T-U-K</th><th className="text-right">AKTS</th></tr></thead>
        <tbody>{satirlar.map((x) => <PlanSatir key={x.id} x={x} duzen={duzen} degistir={degistir} sil={sil} />)}</tbody>
      </table>
    </div>
  );
}

function PlanGoruntu({ plan, kimlik, gorunum, duzen, setDuzen }) {
  const d = duzen || plan;
  const PCK = PC_KODLARI(kimlik);
  const o = planOzet(d);
  const degistir = (id, alan, v) => {
    const dersler = d.dersler.map((x) => (x.id === id ? { ...x, [alan]: v } : x));
    let matris = d.matris;
    if (alan === "kod") {
      const eski = d.dersler.find((x) => x.id === id)?.kod;
      if (eski && matris[eski] && !matris[v]) { matris = { ...matris, [v]: matris[eski] }; delete matris[eski]; }
    }
    setDuzen({ ...d, dersler, matris });
  };
  const sil = (id) => setDuzen({ ...d, dersler: d.dersler.filter((x) => x.id !== id) });
  const ekle = (sablon) => setDuzen({ ...d, dersler: [...d.dersler, { id: odrId("d"), kod: "", ad: "", tip: "Z", t: 2, u: 0, k: 2, akts: 3, adet: 1, mesleki: false, poc: false, disPaydas: false, ime: false, ...sablon }] });
  const hucre = (kod, pc) => {
    if (!duzen || !kod) return;
    const v = ((d.matris[kod] || {})[pc] || 0);
    setDuzen({ ...d, matris: { ...d.matris, [kod]: { ...(d.matris[kod] || {}), [pc]: (v + 1) % 6 } } });
  };
  if (gorunum === "plan") return (
    <div className="grid xl:grid-cols-2 gap-5">
      {[1, 2, 3, 4].map((n) => (
        <Kart key={n} baslik={YY_AD[n]} sag={<span className="font-mono text-sm text-slate-400">{o.donem[n - 1]} AKTS</span>}>
          <PlanTablo duzen={duzen} degistir={degistir} sil={sil} satirlar={d.dersler.filter((x) => x.donem === n)} />
          {duzen && <div className="flex gap-3 mt-3 text-xs"><button onClick={() => ekle({ donem: n, grup: "zorunlu" })} className="text-blue-400">+ Zorunlu ders</button><button onClick={() => ekle({ donem: n, grup: "slot", tip: "S", kod: "", ad: "Seçmeli Ders", slotGrup: "GS" })} className="text-blue-400">+ Seçmeli ders yeri</button></div>}
        </Kart>
      ))}
    </div>
  );
  if (gorunum === "havuz") return (
    <div className="grid xl:grid-cols-3 gap-5">
      {HAVUZ_GRUPLARI.map(([g, b]) => (
        <Kart key={g} baslik={b} sag={<span className="text-xs text-slate-500">{d.dersler.filter((x) => x.grup === g).length} ders</span>}>
          <PlanTablo duzen={duzen} degistir={degistir} sil={sil} satirlar={d.dersler.filter((x) => x.grup === g)} />
          {duzen && <button onClick={() => ekle({ donem: null, grup: g, tip: "S", akts: g === "GOS" ? 1 : 3 })} className="text-xs text-blue-400 mt-3">+ Ders ekle</button>}
        </Kart>
      ))}
    </div>
  );
  // matris
  const matrisDersleri = d.dersler.filter((x) => x.kod && x.grup !== "GOS");
  const kapsam = PCK.map((pc) => {
    const zor = d.dersler.filter((x) => x.donem && x.kod && (d.matris[x.kod]?.[pc] || 0) > 0);
    return { pc, ders: zor.length, guclu: zor.filter((x) => d.matris[x.kod][pc] >= 4).length, akts: zor.reduce((s, x) => s + toplamAkts(x), 0) };
  });
  return (
    <div className="space-y-5">
      <Kart baslik="Zorunlu derslerin PÇ kapsamı" sag={<span className="text-xs text-slate-500">katkı 1–5 · ≥4 güçlü</span>}>
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(PCK.length, 14)}, minmax(0, 1fr))` }}>
          {kapsam.map((k) => (
            <div key={k.pc} title={`${k.ders} zorunlu ders · ${k.guclu} güçlü · ${k.akts} AKTS`} className={`rounded border p-2 text-center ${ozgunPc(k.pc) ? "border-amber-800/60" : "border-slate-800"} ${k.ders === 0 ? "bg-rose-950/40" : ""}`}>
              <div className="font-mono text-[11px] text-slate-400">{k.pc}</div>
              <div className="font-display text-lg">{k.ders}</div>
              <div className="text-[10px] text-slate-500">{k.guclu} güçlü</div>
            </div>
          ))}
        </div>
      </Kart>
      {duzen && <p className="text-xs text-amber-300">Düzenleme açık: hücreye tıkladıkça katkı düzeyi 0→1→…→5→0 olarak değişir.</p>}
      <div className="overflow-x-auto border border-slate-800 rounded-lg">
        <table className="text-xs">
          <thead className="bg-slate-900/80"><tr><th className="p-2 text-left font-mono text-slate-500">Ders</th>{PCK.map((p) => <th key={p} className={`p-1.5 font-mono ${ozgunPc(p) ? "text-amber-300" : "text-slate-400"}`}>{p.replace("PÇ", "")}</th>)}</tr></thead>
          <tbody>
            {matrisDersleri.map((x) => (
              <tr key={x.id} className="border-t border-slate-800/70">
                <td className="p-1.5 whitespace-nowrap"><span className="font-mono text-slate-500 mr-2">{x.kod}</span><span className={x.donem ? "text-slate-200" : "text-slate-400"}>{x.ad}</span></td>
                {PCK.map((p) => { const v = d.matris[x.kod]?.[p] || 0; return <td key={p} onClick={() => hucre(x.kod, p)} className={`w-8 h-7 text-center font-mono ${hucreRenk(v)} ${duzen ? "cursor-pointer hover:outline hover:outline-1 hover:outline-blue-500" : ""}`}>{v || ""}</td>; })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500">Zorunlu dersler parlak, seçmeli havuz dersleri soluk gösterilir. Ortak seçmeli (GOS) dersler matrise dahil değildir.</p>
    </div>
  );
}
function OgretimPlaniSekmesiODR({ duzenlemeYetkisi }) {
  const [plan, setPlan] = usePlan();
  const [kimlik] = useKimlik();
  const [arsiv, setArsiv] = useKayitliState("ogretimPlaniArsiv_v1", []);
  const [gorunum, setGorunum] = uS("plan");
  const [duzen, setDuzen] = uS(null);
  const [arsivSecili, setArsivSecili] = uS(null);
  const o = planOzet(duzen || plan);
  const kaydet = () => {
    if (!duzen.ad?.trim()) { alert("Plan adı boş olamaz"); return; }
    setPlan({ ...duzen, guncelleme: new Date().toISOString() });
    setDuzen(null);
  };
  const arsivle = () => {
    if (!confirm("Mevcut plan “önceki planlar” arşivine kopyalanacak; ardından yeni sürümü düzenleyebilirsiniz. Devam edilsin mi?")) return;
    setArsiv([{ tarih: new Date().toISOString(), plan }, ...(arsiv || [])]);
    setDuzen({ ...plan, ad: plan.ad + " (yeni sürüm)", gecerlilik: "", dayanak: "" });
  };
  const goster = arsivSecili !== null ? arsiv[arsivSecili]?.plan : null;
  return (
    <div className="space-y-6">
      <SekmeBaslik baslik="Öğretim Planı" alt="Programın yürürlükteki öğretim planı. Öğrenciler ve paydaşlar bu planı Paydaş Portalı'nda görür. Plan §7: yıllık izlenir, kapsamlı revizyon en az iki yılda bir; değişiklikler Bölüm Kurulu kararıyla yapılır." sag={duzenlemeYetkisi && (
        duzen ? <div className="flex gap-2"><button onClick={() => setDuzen(null)} className="px-4 py-2 text-sm text-slate-400">Vazgeç</button><button onClick={kaydet} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm font-medium">Kaydet ve yayımla</button></div>
          : <div className="flex gap-2"><button onClick={arsivle} className="px-3 py-2 border border-slate-700 rounded text-sm text-slate-300 hover:border-slate-500">Yeni sürüm başlat</button><button onClick={() => setDuzen(JSON.parse(JSON.stringify(plan)))} className="px-4 py-2 border border-slate-600 hover:border-blue-500 rounded text-sm">Düzenle</button></div>)} />
      <div className="border border-slate-800 rounded-lg bg-slate-900/40 p-4 grid md:grid-cols-3 gap-4">
        {[["ad", "Plan"], ["gecerlilik", "Kimler için geçerli"], ["dayanak", "Dayanak (karar / belge)"]].map(([k, e]) => (
          <div key={k}><div className="text-[10px] font-mono uppercase text-slate-500">{e}</div>{duzen ? <input value={duzen[k] || ""} onChange={(ev) => setDuzen({ ...duzen, [k]: ev.target.value })} className={girdiSinif + " mt-1"} /> : <div className="text-sm text-slate-100 mt-1">{plan[k] || "—"}</div>}</div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-2 flex-wrap text-xs font-mono">
          <span className="border border-slate-800 rounded px-3 py-1.5">Toplam <b className="text-slate-100">{o.toplam}</b> AKTS</span>
          {o.donem.map((v, i) => <span key={i} className="border border-slate-800 rounded px-3 py-1.5 text-slate-400">{i + 1}. yy {v}</span>)}
        </div>
        <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded p-1">
          {[["plan", "Yarıyıllar"], ["havuz", "Seçmeli havuzları"], ["matris", "Ders–PÇ matrisi"]].map(([id, ad]) => (
            <button key={id} onClick={() => setGorunum(id)} className={`px-3 py-1.5 text-sm rounded ${gorunum === id ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"}`}>{ad}</button>
          ))}
        </div>
      </div>
      {duzen && <div className="rounded border border-blue-800/60 bg-blue-950/20 px-4 py-2.5 text-sm text-blue-100">Düzenleme modundasınız. Değişiklikler “Kaydet ve yayımla” deyince panele ve öğrenci görünümüne yansır. Etiketler (Mesleki, PÇ11–14, Dış paydaş, İME) MEDEK şart hesaplarında kullanılır.</div>}
      <PlanGoruntu plan={plan} kimlik={kimlik} gorunum={gorunum} duzen={duzen} setDuzen={setDuzen} />
      {(arsiv || []).length > 0 && !duzen && (
        <Kart baslik={`Önceki planlar (${arsiv.length})`}>
          <div className="flex gap-2 flex-wrap">{arsiv.map((a, i) => <button key={i} onClick={() => setArsivSecili(arsivSecili === i ? null : i)} className={`text-xs px-3 py-1.5 rounded border ${arsivSecili === i ? "border-blue-600 text-white" : "border-slate-700 text-slate-400"}`}>{a.plan?.ad} · {a.plan?.gecerlilik || tarihTR(a.tarih)}</button>)}</div>
          {goster && <div className="mt-4"><PlanGoruntu plan={goster} kimlik={kimlik} gorunum="plan" duzen={null} setDuzen={() => {}} /></div>}
          {duzenlemeYetkisi && arsivSecili !== null && <button onClick={() => { if (confirm("Bu arşiv kaydı silinsin mi?")) { setArsiv(arsiv.filter((_, j) => j !== arsivSecili)); setArsivSecili(null); } }} className="text-xs text-rose-400 mt-3">Arşiv kaydını sil</button>}
        </Kart>
      )}
    </div>
  );
}

/* ============================================================
   5) APG İZLEME + PÇ ULAŞMA
   ============================================================ */
function ApgSekmesi({ duzenlemeYetkisi }) {
  const [kimlik] = useKimlik();
  const APGL = kimlik?.apg || O.APG;
  const PCL = kimlik?.pc || O.PC;
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
          {APGL.map((a) => {
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
          {PCL.map((p) => {
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
    pcList: s.pcList || O.PC,
    apg: (s.apgList || O.APG).map((a) => ({ a, v: s.apg?.[yil]?.[a.kod] || {}, d: apgDegerlendir(a, s.apg, yil) })),
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
  const [kimlik] = useKimlik();
  const R = yillikRaporVerisi(yil, { toplantilar, anketler, gorusler, dongu, gorevler, apg, pc, takvim, apgList: kimlik?.apg, pcList: kimlik?.pc });
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
      tablo(["PÇ", "Güz (%)", "Bahar (%)"], R.pcList.map((p) => [p.kod, R.pcGuz[p.kod] ?? "—", R.pcBahar[p.kod] ?? "—"])),
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
          <div className="grid grid-cols-7 gap-2 text-xs font-mono" style={{ gridTemplateColumns: `repeat(${Math.min(R.pcList.length, 14)}, minmax(0,1fr))` }}>{R.pcList.map((p) => <div key={p.kod} className="border border-slate-800 rounded p-1.5 text-center"><div className="text-slate-500">{p.kod}</div><div>{R.pcGuz[p.kod] ?? "—"}</div><div className="text-slate-400">{R.pcBahar[p.kod] ?? "—"}</div></div>)}</div>
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
function OgrenciPlanGorunumu({ plan, kimlik }) {
  const [g, setG] = uS("plan");
  return (
    <div className="space-y-4">
      <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded p-1 w-fit max-w-full overflow-x-auto">
        {[["plan", "Yarıyıllar"], ["havuz", "Seçmeli dersler"], ["matris", "Dersler ve program çıktıları"]].map(([id, ad]) => (
          <button key={id} onClick={() => setG(id)} className={`px-3 py-1.5 text-sm rounded whitespace-nowrap ${g === id ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"}`}>{ad}</button>
        ))}
      </div>
      <PlanGoruntu plan={plan} kimlik={kimlik} gorunum={g} duzen={null} setDuzen={() => {}} />
    </div>
  );
}
function PaydasPortali({ kullanici, cikisYap }) {
  const pub = usePublicProgram();
  const plan = pub.plan || PLAN_BASLANGIC;
  const kimlik = pub.kimlik || KIMLIK_BASLANGIC;
  const [sekme, setSekme] = uS("plan");
  const [arsivSec, setArsivSec] = uS(-1);
  const gosterilenPlan = arsivSec >= 0 ? pub.arsiv[arsivSec]?.plan || plan : plan;
  const o = planOzet(gosterilenPlan);
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`.font-display{font-family:'Fraunces',serif}.font-mono{font-family:'JetBrains Mono',monospace}`}</style>
      <header className="border-b border-slate-800 sticky top-0 bg-slate-950/95 backdrop-blur z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3"><img src={LOGO_HEADER} alt="" className="w-11 h-11 rounded-full" /><div><div className="font-display text-lg font-semibold">E-Ticaret ve Pazarlama Programı</div><div className="text-[11px] font-mono uppercase tracking-widest text-slate-400">Öğrenci ve Paydaş Sayfası</div></div></div>
          <div className="flex items-center gap-3 text-xs"><span className="text-slate-400">{kullanici?.email}</span><button onClick={cikisYap} className="text-rose-400">Çıkış</button></div>
        </div>
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto">
          {[["plan", "Öğretim Planı"], ["kimlik", "Program Hakkında"], ["gorus", "Görüş Bildir"]].map(([id, ad]) => (
            <button key={id} onClick={() => setSekme(id)} className={`px-4 py-3 text-sm whitespace-nowrap border-b-2 ${sekme === id ? "border-blue-500 text-white" : "border-transparent text-slate-400 hover:text-slate-200"}`}>{ad}</button>
          ))}
        </nav>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {sekme === "plan" && (
          <>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h1 className="font-display text-3xl font-semibold">{gosterilenPlan.ad}</h1>
                <p className="text-sm text-slate-400 mt-1">{gosterilenPlan.gecerlilik}{gosterilenPlan.dayanak ? " · " + gosterilenPlan.dayanak : ""}</p>
              </div>
              {pub.arsiv.length > 0 && (
                <select value={arsivSec} onChange={(e) => setArsivSec(parseInt(e.target.value))} className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm">
                  <option value={-1}>Güncel plan</option>
                  {pub.arsiv.map((a, i) => <option key={i} value={i}>{a.plan?.ad} — {a.plan?.gecerlilik}</option>)}
                </select>
              )}
            </div>
            <div className="flex gap-2 flex-wrap text-xs font-mono">
              <span className="border border-slate-800 rounded px-3 py-1.5">Toplam <b className="text-slate-100">{o.toplam}</b> AKTS</span>
              {o.donem.map((v, i) => <span key={i} className="border border-slate-800 rounded px-3 py-1.5 text-slate-400">{i + 1}. yarıyıl {v}</span>)}
            </div>
            {(pub.hata || (!pub.yukleniyor && !pub.plan)) && <p className="text-xs text-amber-300">Yayımlanan plan şu an okunamadı; ders kataloğundaki (27.07.2026) plan gösteriliyor.</p>}
            <OgrenciPlanGorunumu plan={gosterilenPlan} kimlik={kimlik} />
            <p className="text-xs text-slate-500">Hangi plana tabi olduğunuz kayıt yılınıza göre belirlenir. Sorularınız için akademik danışmanınıza başvurun.</p>
          </>
        )}
        {sekme === "kimlik" && (
          <>
            <h1 className="font-display text-3xl font-semibold">Program hakkında</h1>
            <p className="text-slate-400 max-w-3xl">Gaziantep Üniversitesi Sosyal Bilimler MYO E-Ticaret ve Pazarlama Programı; eğitim amaçlarını, program çıktılarını ve öğretim planını iç ve dış paydaşlarının görüşleriyle sürekli iyileştirir.</p>
            <ProgramKimligiIcerik kimlik={kimlik} kompakt />
          </>
        )}
        {sekme === "gorus" && (
          <section className="border border-blue-900/60 bg-blue-950/10 rounded-lg p-6 max-w-3xl">
            <h1 className="font-display text-2xl font-semibold mb-1">Görüş ve öneri bildirin</h1>
            <p className="text-sm text-slate-400 mb-4">Görüşleriniz program yönetimince değerlendirilir; uygun görülenler Bölüm Kurulu ve Danışma Kurulu gündemine alınır.</p>
            <GorusFormu kullanici={kullanici} />
          </section>
        )}
      </main>
      <footer className="border-t border-slate-800 text-xs text-slate-500"><div className="max-w-6xl mx-auto px-6 py-5">Gaziantep Üniversitesi · Sosyal Bilimler MYO · Pazarlama ve Reklamcılık Bölümü</div></footer>
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

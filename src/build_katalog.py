# Ders kataloğu Excel'inin ilk sekmesinden (2026 KATALOG) panelin varsayılan öğretim planını üretir → src/katalog-2026.js
import openpyxl, json, re, sys
f = sys.argv[1]
ws = openpyxl.load_workbook(f, data_only=True).worksheets[0]
rows = [[("" if c is None else str(c).strip()) for c in r] for r in ws.iter_rows(values_only=True)]
odr = json.loads(open('odr-veri.js', encoding='utf-8').read().split('window.ODR = ', 1)[1].rstrip().rstrip(';'))
def blok(r0, c0, donem, grup=None):
    out = []
    r = r0
    while r < len(rows):
        x = rows[r][c0:c0 + 7]
        if not x[0] or x[0] == "TOPLAM" or x[0] == "Ders Kodu": 
            if x[0] in ("TOPLAM", "") and out: break
            r += 1; continue
        out.append(x); r += 1
    return out
def num(v):
    try: return int(v)
    except: return v
# başlık satırlarını bul
def bul(metin):
    for i, r in enumerate(rows):
        for j, c in enumerate(r):
            if c.startswith(metin): return i, j
plan = []
def ekle(donem, satirlar):
    slot = {}
    for k in satirlar:
        kod, ad, zs, t, u, kr, akts = k
        if re.fullmatch(r"\d+", kod) or kod == "GOSXXX":
            g = "GS" if "Genel" in ad else "MAS" if "Alan" in ad else "GOS"
            key = (g, akts)
            if key in slot: slot[key]["adet"] += 1; continue
            slot[key] = {"kod": "", "ad": ("Ortak Seçmeli (GOS)" if g == "GOS" else ad), "tip": zs, "t": num(t), "u": u if "/" in u else num(u), "k": num(kr), "akts": num(akts), "adet": 1, "donem": donem, "grup": "slot", "slotGrup": g}
            plan.append(slot[key])
        else:
            plan.append({"kod": kod, "ad": ad, "tip": zs, "t": num(t), "u": num(u), "k": num(kr), "akts": num(akts), "adet": 1, "donem": donem, "grup": "zorunlu" if zs == "Z" else "secmeli"})
for metin, d in [("1. Sınıf Güz", 1), ("1. Sınıf Bahar", 2), ("2. Sınıf Güz", 3), ("2. Sınıf Bahar", 4)]:
    i, j = bul(metin); ekle(d, blok(i + 1, j, d))
havuz = []
for metin, g in [("GOS Dersi İçin", "GOS"), ("Alan Seçmeli Dersler", "MAS"), ("Genel Seçmeli Dersler", "GS")]:
    i, j = bul(metin)
    for k in blok(i + 1, j, None):
        havuz.append({"kod": k[0], "ad": k[1], "tip": k[2], "t": num(k[3]), "u": num(k[4]), "k": num(k[5]), "akts": num(k[6]), "adet": 1, "donem": None, "grup": g})
# yazım düzeltmeleri (katalogdaki bitişik yazım hataları)
duz = {"E- Ticaret Mevzuatı": "E-Ticaret Mevzuatı", "E Ticaret Operasyonları Yönetimi": "E-Ticaret Operasyonları Yönetimi"}
for d in plan + havuz: d["ad"] = duz.get(d["ad"], d["ad"])
ETIKET = {"mesleki": re.compile(r"^(SETP|SOZ109$|SOZ117$|SOZ210$)"), }
POC = {"SETP109", "SETP104", "SETP106", "SETP203", "SETP205", "SETP102", "SOZ210"}
DIS = {"SETP106", "SETP104", "SOZ108", "SOZ205", "SOS132"}
for n, d in enumerate(plan + havuz):
    d["id"] = "d" + str(n + 1)
    d["mesleki"] = bool(ETIKET["mesleki"].match(d["kod"] or "")) or (d.get("slotGrup") == "MAS")
    d["poc"] = d["kod"] in POC
    d["disPaydas"] = d["kod"] in DIS
    d["ime"] = d["kod"] == "SOZ210"
eslem = {"SETP108": "SETP241", "SOS210": "SOZ210"}
matris = {eslem.get(k, k): v for k, v in odr["DERS_PC"].items()}
kodlar = {d["kod"] for d in plan + havuz if d["kod"]}
eksik = sorted(kodlar - set(matris)); fazla = sorted(set(matris) - kodlar)
out = {"ad": "2026 Öğretim Planı (Ders Kataloğu 27.07.2026)", "gecerlilik": "2026-2027 ve sonrası girişli öğrenciler", "dayanak": "Ders Kataloğu ve Denklik Tablosu (27.07.2026)", "dersler": plan + havuz, "matris": {k: v for k, v in matris.items() if k in kodlar}}
open("katalog-2026.js", "w", encoding="utf-8").write("/* Ders Kataloğu 27.07.2026 (2026 KATALOG sekmesi) — build_katalog.py ile üretildi. Panelde düzenlenebilir planın başlangıç değeridir. */\nwindow.KATALOG_2026 = " + json.dumps(out, ensure_ascii=False, indent=1) + ";\n")
top = [sum(d["akts"] * d["adet"] for d in plan if d["donem"] == x) for x in (1, 2, 3, 4)]
print("yarıyıllar", top, "toplam", sum(top), "plan", len(plan), "havuz", len(havuz), "matrissiz", eksik, "matriste fazla", fazla)

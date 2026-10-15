/* ÖDR 2026 (30.06.2026, MEDEK'e sunulan nihai rapor) kaynaklı veriler — build_odr_veri.py ile üretildi. */
window.ODR = {
 "PC": [
  {
   "kod": "PÇ1",
   "metin": "Mesleği ile ilgili temel, güncel ve uygulamalı bilgilere sahip olur.",
   "duzlem": "Bilgi"
  },
  {
   "kod": "PÇ2",
   "metin": "İş sağlığı ve güvenliği, çevre bilinci ve kalite süreçleri hakkında bilgi sahibi olur.",
   "duzlem": "Bilgi"
  },
  {
   "kod": "PÇ3",
   "metin": "Mesleği için güncel gelişmeleri ve uygulamaları takip eder, etkin şekilde kullanır.",
   "duzlem": "Beceri"
  },
  {
   "kod": "PÇ4",
   "metin": "Mesleği ile ilgili bilişim teknolojilerini (yazılım, program, animasyon vb.) etkin kullanır.",
   "duzlem": "Beceri"
  },
  {
   "kod": "PÇ5",
   "metin": "Mesleki problemleri ve konuları bağımsız olarak analitik ve eleştirel bir yaklaşımla değerlendirme ve çözüm önerisini sunabilme becerisine sahiptir.",
   "duzlem": "Beceri"
  },
  {
   "kod": "PÇ6",
   "metin": "Bilgi ve beceriler düzeyinde düşüncelerini yazılı ve sözlü iletişim yolu ile etkin biçimde sunabilir, anlaşılır biçimde ifade eder.",
   "duzlem": "Yetkinlik"
  },
  {
   "kod": "PÇ7",
   "metin": "Alanı ile ilgili uygulamalarda karşılaşılan ve öngörülemeyen karmaşık sorunları çözmek için ekip üyesi olarak sorumluluk alır.",
   "duzlem": "Yetkinlik"
  },
  {
   "kod": "PÇ8",
   "metin": "Kariyer yönetimi ve yaşam boyu öğrenme konularında farkındalığa sahiptir.",
   "duzlem": "Yetkinlik"
  },
  {
   "kod": "PÇ9",
   "metin": "Alanı ile ilgili verilerin toplanması, uygulanması ve sonuçlarının duyurulması aşamalarında toplumsal, bilimsel, kültürel ve etik değerlere sahiptir.",
   "duzlem": "Yetkinlik"
  },
  {
   "kod": "PÇ10",
   "metin": "Bir yabancı dili kullanarak alanındaki bilgileri takip eder ve meslektaşları ile iletişim kurar.",
   "duzlem": "Yetkinlik"
  },
  {
   "kod": "PÇ11",
   "metin": "E-Ticaretin temel kavramları, hukuksal boyutu ve güvenlik konularını açıklar.",
   "duzlem": "Bilgi"
  },
  {
   "kod": "PÇ12",
   "metin": "E-Ticaret bilgi sistemleri ve lojistik arasındaki ilişkiyi tanımlar.",
   "duzlem": "Bilgi"
  },
  {
   "kod": "PÇ13",
   "metin": "E-Ticaret ile ilgili süreçleri yönetir.",
   "duzlem": "Yetkinlik"
  },
  {
   "kod": "PÇ14",
   "metin": "E-Ticaret için gerekli dijital pazarlama araç ve yöntemlerini yönetir.",
   "duzlem": "Yetkinlik"
  }
 ],
 "PEA": [
  {
   "kod": "PEA-1",
   "baslik": "İstihdam ve Mesleki Konumlanma",
   "tanim": "Mezunlar; e-ticaret, dijital pazarlama, perakende ve dış ticaret alanlarında ya da kendi girişimlerinde mesleki sorumluluk üstlenir."
  },
  {
   "kod": "PEA-2",
   "baslik": "Mesleki Yetkinlik ve Uygulama",
   "tanim": "Mezunlar; e-ticaret operasyonları, dijital pazarlama ve marka iletişimi alanlarında güncel araç, yazılım ve süreçleri etkin biçimde kullanır."
  },
  {
   "kod": "PEA-3",
   "baslik": "Etik ve Sorumlu Mesleki Davranış",
   "tanim": "Mezunlar; mesleki etik, tüketici hakları, kişisel veri koruma ve bilişim mevzuatı ilkelerine uygun şekilde mesleğini icra eder."
  },
  {
   "kod": "PEA-4",
   "baslik": "Yaşam Boyu Öğrenme ve Kariyer Gelişimi",
   "tanim": "Mezunlar; mesleki gelişimini sektörel ve teknolojik değişimi takip ederek sürdürür; lisans tamamlama veya sertifikasyon programlarıyla uzmanlaşır."
  }
 ],
 "APG": [
  {
   "kod": "APG-1.1",
   "gosterge": "Mezun istihdam oranı",
   "pea": "PEA-1",
   "veriKaynagi": "Mezun Anketi ve mezun izleme sistemi verileri",
   "hedef": {
    "metin": "≥ %50",
    "deger": 50.0,
    "birim": "%"
   },
   "anket": "Mezun Anketi — B1 (ilk 12 ayda istihdam)",
   "boyut": "Mezun istihdam durumu",
   "hesaplama": "İstihdam edilen / yanıtlayan mezun × 100"
  },
  {
   "kod": "APG-1.2",
   "gosterge": "Alanıyla uyumlu istihdam oranı",
   "pea": "PEA-1",
   "veriKaynagi": "Mezun Anketi ve mezun izleme sistemi verileri",
   "hedef": {
    "metin": "≥ %40",
    "deger": 40.0,
    "birim": "%"
   },
   "anket": "Mezun Anketi — B2 (çalışılan sektör)",
   "boyut": "Alanıyla uyumlu istihdam",
   "hesaplama": "Alanıyla uyumlu çalışan / istihdam edilen mezun × 100"
  },
  {
   "kod": "APG-2.1",
   "gosterge": "İşveren memnuniyeti — mesleki yetkinlik",
   "pea": "PEA-2",
   "veriKaynagi": "İşveren Anketi (5'li Likert)",
   "hedef": {
    "metin": "≥ 3.5 / 5",
    "deger": 3.5,
    "birim": "/5"
   },
   "anket": "İşveren Anketi — B1-B5 (e-ticaret operasyonları, dijital pazarlama araç/yazılımları, marka iletişimi, teknolojik uyum, genel yetkinlik)",
   "boyut": "Mesleki yetkinlik memnuniyeti",
   "hesaplama": "B1-B4 maddelerinin aritmetik ortalaması (1-5); B5 genel doğrulama"
  },
  {
   "kod": "APG-3.1",
   "gosterge": "İşveren memnuniyeti — etik ve sorumluluk",
   "pea": "PEA-3",
   "veriKaynagi": "İşveren Anketi (5'li Likert)",
   "hedef": {
    "metin": "≥ 4.0 / 5",
    "deger": 4.0,
    "birim": "/5"
   },
   "anket": "İşveren Anketi — C1-C5 (mesleki etik, tüketici hakları, KVKK, bilişim mevzuatı, genel)",
   "boyut": "Etik ve sorumluluk memnuniyeti",
   "hesaplama": "C1-C4 maddelerinin aritmetik ortalaması (1-5); C5 genel doğrulama"
  },
  {
   "kod": "APG-4.1",
   "gosterge": "DGS ile lisans tamamlama oranı",
   "pea": "PEA-4",
   "veriKaynagi": "ÖSYM verileri, mezun izleme sistemi ve Mezun Anketi",
   "hedef": {
    "metin": "≥ %25",
    "deger": 25.0,
    "birim": "%"
   },
   "anket": "Mezun Anketi — C1 (DGS ile lisansa devam) + ÖSYM verisi",
   "boyut": "DGS ile lisans tamamlama",
   "hesaplama": "DGS ile lisansa yerleşen / ilgili yıl mezun × 100"
  },
  {
   "kod": "APG-4.2",
   "gosterge": "Sertifika/kurs alma oranı",
   "pea": "PEA-4",
   "veriKaynagi": "Mezun Anketi ve mezun izleme sistemi verileri",
   "hedef": {
    "metin": "≥ %30",
    "deger": 30.0,
    "birim": "%"
   },
   "anket": "Mezun Anketi — C2 (sertifika/kurs/eğitim)",
   "boyut": "Sertifika/kurs alma",
   "hesaplama": "Sertifika veya kurs alan / yanıtlayan mezun × 100"
  }
 ],
 "PEA_PC": {
  "PÇ1": {
   "PEA-1": "●",
   "PEA-2": "●",
   "PEA-3": "○",
   "PEA-4": "○"
  },
  "PÇ2": {
   "PEA-1": "○",
   "PEA-2": "○",
   "PEA-3": "●",
   "PEA-4": ""
  },
  "PÇ3": {
   "PEA-1": "○",
   "PEA-2": "●",
   "PEA-3": "",
   "PEA-4": "●"
  },
  "PÇ4": {
   "PEA-1": "○",
   "PEA-2": "●",
   "PEA-3": "",
   "PEA-4": "○"
  },
  "PÇ5": {
   "PEA-1": "●",
   "PEA-2": "●",
   "PEA-3": "",
   "PEA-4": "○"
  },
  "PÇ6": {
   "PEA-1": "●",
   "PEA-2": "●",
   "PEA-3": "○",
   "PEA-4": ""
  },
  "PÇ7": {
   "PEA-1": "●",
   "PEA-2": "●",
   "PEA-3": "○",
   "PEA-4": ""
  },
  "PÇ8": {
   "PEA-1": "○",
   "PEA-2": "",
   "PEA-3": "",
   "PEA-4": "●"
  },
  "PÇ9": {
   "PEA-1": "○",
   "PEA-2": "",
   "PEA-3": "●",
   "PEA-4": ""
  },
  "PÇ10": {
   "PEA-1": "○",
   "PEA-2": "●",
   "PEA-3": "",
   "PEA-4": "●"
  },
  "PÇ11": {
   "PEA-1": "●",
   "PEA-2": "●",
   "PEA-3": "●",
   "PEA-4": ""
  },
  "PÇ12": {
   "PEA-1": "●",
   "PEA-2": "●",
   "PEA-3": "",
   "PEA-4": ""
  },
  "PÇ13": {
   "PEA-1": "●",
   "PEA-2": "●",
   "PEA-3": "○",
   "PEA-4": ""
  },
  "PÇ14": {
   "PEA-1": "●",
   "PEA-2": "●",
   "PEA-3": "",
   "PEA-4": "○"
  }
 },
 "PEA_DERS": {
  "PEA-1": "Genel İşletme, E-Ticaret, Dijital Pazarlama, Reklam, Dış Ticaret İşlemleri Yönetimi (zorunlu); Marka Yönetimi, Global Pazarlama, Girişimcilik, İhracat Teknikleri (seçmeli); İş Yeri Eğitimi (zorunlu, 30 AKTS)",
  "PEA-2": "Pazarlama İlkeleri, Tüketici Davranışları, E-Ticaret, E-Ticaret Operasyonları Yönetimi, Dijital Pazarlama, Pazarlama İletişim Teknikleri (zorunlu); Online Satış Platformları, Dijital Reklam Yazarlığı, Pazarlama Araştırması, Yapay Zeka Okuryazarlığı, Mesleki Uygulama Projesi (seçmeli)",
  "PEA-3": "Genel ve Mesleki Etik, Temel Hukuk, E-Ticaret Mevzuatı, Bilişim Mevzuatı, Sürdürülebilirlik, Toplumsal Duyarlılık Projesi I-II (zorunlu)",
  "PEA-4": "Kariyer Planlama, Mesleki Yabancı Dil, Toplumsal Duyarlılık Projesi I-II (zorunlu); Girişimcilik, İnovasyon Yönetimi, Yapay Zeka Okuryazarlığı, Temel Veri Analizi, Araştırma Yöntem ve Teknikleri, Finansal Okuryazarlık, Kriz ve Stres Yönetimi (seçmeli)"
 },
 "MUFREDAT": [
  {
   "kod": "SOZ109",
   "ad": "Temel Hukuk",
   "tip": "Z",
   "t": "3",
   "u": "0",
   "k": "3",
   "akts": 3,
   "donem": 1
  },
  {
   "kod": "SOZ117",
   "ad": "Genel İşletme",
   "tip": "Z",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 1
  },
  {
   "kod": "SETP101",
   "ad": "Dış Ticaret İşlemleri Yönetimi",
   "tip": "Z",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 1
  },
  {
   "kod": "SETP103",
   "ad": "Tüketici Davranışları",
   "tip": "Z",
   "t": "3",
   "u": "0",
   "k": "3",
   "akts": 3,
   "donem": 1
  },
  {
   "kod": "SETP105",
   "ad": "Pazarlama İlkeleri",
   "tip": "Z",
   "t": "3",
   "u": "0",
   "k": "3",
   "akts": 4,
   "donem": 1
  },
  {
   "kod": "SETP107",
   "ad": "Dijital Çağda İletişim",
   "tip": "Z",
   "t": "2",
   "u": "1",
   "k": "3",
   "akts": 4,
   "donem": 1
  },
  {
   "kod": "SETP109",
   "ad": "E-Ticaret",
   "tip": "Z",
   "t": "3",
   "u": "0",
   "k": "3",
   "akts": 4,
   "donem": 1
  },
  {
   "kod": "SETP111",
   "ad": "Pazarlama İletişim Teknikleri",
   "tip": "Z",
   "t": "3",
   "u": "0",
   "k": "3",
   "akts": 4,
   "donem": 1
  },
  {
   "kod": "TURK101",
   "ad": "Türk Dili-I",
   "tip": "Z",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 2,
   "donem": 1
  },
  {
   "kod": "YDBİ101",
   "ad": "İngilizce-I",
   "tip": "Z",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 2,
   "donem": 1
  },
  {
   "kod": "TDP101",
   "ad": "Toplumsal Duyarlılık Projesi-I",
   "tip": "Z",
   "t": "1",
   "u": "0",
   "k": "1",
   "akts": 1,
   "donem": 1
  },
  {
   "kod": null,
   "ad": "Ortak Seçmeli",
   "tip": "Z",
   "t": "1",
   "u": "0",
   "k": "0",
   "akts": 1,
   "donem": 1,
   "slot": true
  },
  {
   "kod": "SETP102",
   "ad": "Dijital Pazarlama",
   "tip": "Z",
   "t": "2",
   "u": "1",
   "k": "3",
   "akts": 3,
   "donem": 2
  },
  {
   "kod": "SETP104",
   "ad": "E-Ticaret Mevzuatı",
   "tip": "Z",
   "t": "3",
   "u": "0",
   "k": "3",
   "akts": 4,
   "donem": 2
  },
  {
   "kod": "SETP106",
   "ad": "E-Ticaret Operasyonları Yönetimi",
   "tip": "Z",
   "t": "2",
   "u": "1",
   "k": "3",
   "akts": 3,
   "donem": 2
  },
  {
   "kod": "SOZ108",
   "ad": "Sürdürülebilirlik",
   "tip": "Z",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 2
  },
  {
   "kod": "TURK102",
   "ad": "Türk Dili-II",
   "tip": "Z",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 2,
   "donem": 2
  },
  {
   "kod": "YDBİ102",
   "ad": "İngilizce-II",
   "tip": "Z",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 2,
   "donem": 2
  },
  {
   "kod": "TDP102",
   "ad": "Toplumsal Duyarlılık Projesi-II",
   "tip": "Z",
   "t": "1",
   "u": "2",
   "k": "2",
   "akts": 2,
   "donem": 2
  },
  {
   "kod": "GME100",
   "ad": "Genel ve Mesleki Etik",
   "tip": "Z",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 2,
   "donem": 2
  },
  {
   "kod": "KRY100",
   "ad": "Kariyer Planlama",
   "tip": "Z",
   "t": "0",
   "u": "2",
   "k": "1",
   "akts": 1,
   "donem": 2
  },
  {
   "kod": null,
   "ad": "Genel Seçmeli Ders (4 adet × 3 AKTS)",
   "tip": "S",
   "t": "—",
   "u": "—",
   "k": "—",
   "akts": 12,
   "donem": 2,
   "slot": true
  },
  {
   "kod": "SETP201",
   "ad": "Reklam",
   "tip": "Z",
   "t": "2",
   "u": "1",
   "k": "3",
   "akts": 4,
   "donem": 3
  },
  {
   "kod": "SETP203",
   "ad": "Lojistik",
   "tip": "Z",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 4,
   "donem": 3
  },
  {
   "kod": "SETP205",
   "ad": "Bilişim Mevzuatı",
   "tip": "Z",
   "t": "3",
   "u": "0",
   "k": "3",
   "akts": 4,
   "donem": 3
  },
  {
   "kod": "SOZ205",
   "ad": "İş Sağlığı ve Güvenliği",
   "tip": "Z",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 3
  },
  {
   "kod": "SETP207",
   "ad": "Mesleki Yabancı Dil",
   "tip": "Z",
   "t": "2",
   "u": "1",
   "k": "3",
   "akts": 3,
   "donem": 3
  },
  {
   "kod": "AİİT201",
   "ad": "Atatürk İlkeleri ve İnkılap Tarihi-I",
   "tip": "Z",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 2,
   "donem": 3
  },
  {
   "kod": null,
   "ad": "Mesleki Alan Seçmeli Ders (4 adet × 3 AKTS)",
   "tip": "S",
   "t": "—",
   "u": "—",
   "k": "—",
   "akts": 12,
   "donem": 3,
   "slot": true
  },
  {
   "kod": "SOS210",
   "ad": "İş Yeri Eğitimi",
   "tip": "Z",
   "t": "5",
   "u": "30",
   "k": "20",
   "akts": 30,
   "donem": 4
  },
  {
   "kod": "AİİT202",
   "ad": "Atatürk İlkeleri ve İnkılap Tarihi-II",
   "tip": "Z",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 2,
   "donem": 4
  }
 ],
 "HAVUZ": [
  {
   "kod": "SETP209",
   "ad": "Dijital Medya ve Popüler Kültür",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 3,
   "kategori": "MAS"
  },
  {
   "kod": "SETP211",
   "ad": "Marka Yönetimi",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 3,
   "kategori": "MAS"
  },
  {
   "kod": "SETP213",
   "ad": "Medya ve İletişim Teknolojileri",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 3,
   "kategori": "MAS"
  },
  {
   "kod": "SETP215",
   "ad": "Dijital Reklam Yazarlığı",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 3,
   "kategori": "MAS"
  },
  {
   "kod": "SETP217",
   "ad": "Pazarlama Araştırması",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 3,
   "kategori": "MAS"
  },
  {
   "kod": "SETP219",
   "ad": "Online Satış Platformları",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 3,
   "kategori": "MAS"
  },
  {
   "kod": "SETP221",
   "ad": "Araştırma Yöntem ve Teknikleri",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 3,
   "kategori": "MAS"
  },
  {
   "kod": "SETP223",
   "ad": "Oyun Endüstrisi ve Dijital Eğlence",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 3,
   "kategori": "MAS"
  },
  {
   "kod": "SETP225",
   "ad": "Medya Planlama",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 3,
   "kategori": "MAS"
  },
  {
   "kod": "SETP227",
   "ad": "Siber Güvenlik ve Adli Bilişim",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 3,
   "kategori": "MAS"
  },
  {
   "kod": "SETP229",
   "ad": "Halkla İlişkiler",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 3,
   "kategori": "MAS"
  },
  {
   "kod": "SETP231",
   "ad": "Satış ve Saha Planlaması",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 3,
   "kategori": "MAS"
  },
  {
   "kod": "SETP233",
   "ad": "Sosyal Pazarlama",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 3,
   "kategori": "MAS"
  },
  {
   "kod": "SETP235",
   "ad": "Görsel İletişim Tasarımı",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 3,
   "kategori": "MAS"
  },
  {
   "kod": "SETP237",
   "ad": "Hizmet Pazarlaması",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 3,
   "kategori": "MAS"
  },
  {
   "kod": "SETP239",
   "ad": "Global Pazarlama",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 3,
   "kategori": "MAS"
  },
  {
   "kod": "SETP108",
   "ad": "İhracat Teknikleri",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 2,
   "kategori": "GS"
  },
  {
   "kod": "SOS102",
   "ad": "Türkiye Ekonomisi",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 2,
   "kategori": "GS"
  },
  {
   "kod": "SOS106",
   "ad": "Ticaret Hukuku",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 2,
   "kategori": "GS"
  },
  {
   "kod": "SOS108",
   "ad": "İş ve Sosyal Güvenlik Hukuku",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 2,
   "kategori": "GS"
  },
  {
   "kod": "SOS112",
   "ad": "Finansal Okuryazarlık",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 2,
   "kategori": "GS"
  },
  {
   "kod": "SOS118",
   "ad": "Girişimcilik",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 2,
   "kategori": "GS"
  },
  {
   "kod": "SOS120",
   "ad": "İnovasyon Yönetimi",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 2,
   "kategori": "GS"
  },
  {
   "kod": "SOS122",
   "ad": "İnsan Kaynakları Yönetimi",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 2,
   "kategori": "GS"
  },
  {
   "kod": "SOS124",
   "ad": "Müşteri İlişkileri Yönetimi",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 2,
   "kategori": "GS"
  },
  {
   "kod": "SOS128",
   "ad": "Medya Okuryazarlığı",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 2,
   "kategori": "GS"
  },
  {
   "kod": "SOS130",
   "ad": "Etkili ve Güzel Konuşma",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 2,
   "kategori": "GS"
  },
  {
   "kod": "SOS132",
   "ad": "Yapay Zekâ Okuryazarlığı",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 2,
   "kategori": "GS"
  },
  {
   "kod": "SOS134",
   "ad": "Temel Veri Analizi",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 2,
   "kategori": "GS"
  },
  {
   "kod": "SOS136",
   "ad": "İlk Yardım",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 2,
   "kategori": "GS"
  },
  {
   "kod": "SOS138",
   "ad": "Kriz ve Stres Yönetimi",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 2,
   "kategori": "GS"
  },
  {
   "kod": "SOS142",
   "ad": "İnsan ve Toplum",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 2,
   "kategori": "GS"
  },
  {
   "kod": "SOS144",
   "ad": "Osmanlıca",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 2,
   "kategori": "GS"
  },
  {
   "kod": "SOS150",
   "ad": "Kalite Yönetim Sistemleri",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 2,
   "kategori": "GS"
  },
  {
   "kod": "SOS154",
   "ad": "Davranış Bilimleri",
   "tip": "S",
   "t": "2",
   "u": "0",
   "k": "2",
   "akts": 3,
   "donem": 2,
   "kategori": "GS"
  },
  {
   "kod": "SOS156",
   "ad": "Mesleki Uygulama Projesi",
   "tip": "S",
   "t": "0",
   "u": "0",
   "k": "0",
   "akts": 1,
   "donem": 2,
   "kategori": "GS"
  },
  {
   "kod": "GOS119",
   "ad": "Temel Spor Yaklaşımları",
   "tip": "S",
   "t": "1",
   "u": "1",
   "k": "0",
   "akts": 1,
   "donem": 1,
   "kategori": "GOS"
  },
  {
   "kod": "GOS120",
   "ad": "Yaşam Boyu Spor",
   "tip": "S",
   "t": "1",
   "u": "1",
   "k": "0",
   "akts": 1,
   "donem": 1,
   "kategori": "GOS"
  },
  {
   "kod": "GOS121",
   "ad": "Plastik Sanatlar",
   "tip": "S",
   "t": "1",
   "u": "0",
   "k": "0",
   "akts": 1,
   "donem": 1,
   "kategori": "GOS"
  },
  {
   "kod": "GOS122",
   "ad": "Sanat Tarihi",
   "tip": "S",
   "t": "1",
   "u": "0",
   "k": "0",
   "akts": 1,
   "donem": 1,
   "kategori": "GOS"
  },
  {
   "kod": "GOS123",
   "ad": "Müzik",
   "tip": "S",
   "t": "1",
   "u": "1",
   "k": "0",
   "akts": 1,
   "donem": 1,
   "kategori": "GOS"
  },
  {
   "kod": "GOS124",
   "ad": "Türk Halk Oyunları",
   "tip": "S",
   "t": "1",
   "u": "1",
   "k": "0",
   "akts": 1,
   "donem": 1,
   "kategori": "GOS"
  }
 ],
 "DERS_PC": {
  "SOZ109": {
   "PÇ1": 3,
   "PÇ5": 3,
   "PÇ9": 4,
   "PÇ11": 3
  },
  "SOZ117": {
   "PÇ1": 4,
   "PÇ3": 3,
   "PÇ5": 3,
   "PÇ7": 3,
   "PÇ13": 3
  },
  "SETP101": {
   "PÇ1": 4,
   "PÇ3": 3,
   "PÇ5": 3,
   "PÇ10": 2,
   "PÇ12": 4,
   "PÇ13": 3
  },
  "SETP103": {
   "PÇ1": 4,
   "PÇ3": 3,
   "PÇ5": 4,
   "PÇ13": 3,
   "PÇ14": 4
  },
  "SETP105": {
   "PÇ1": 5,
   "PÇ3": 3,
   "PÇ5": 4,
   "PÇ13": 3,
   "PÇ14": 4
  },
  "SETP107": {
   "PÇ1": 3,
   "PÇ3": 4,
   "PÇ4": 3,
   "PÇ6": 4,
   "PÇ14": 3
  },
  "SETP109": {
   "PÇ1": 5,
   "PÇ3": 4,
   "PÇ4": 3,
   "PÇ11": 5,
   "PÇ12": 4,
   "PÇ13": 4,
   "PÇ14": 3
  },
  "SETP111": {
   "PÇ1": 4,
   "PÇ3": 3,
   "PÇ5": 3,
   "PÇ6": 4,
   "PÇ13": 3,
   "PÇ14": 4
  },
  "TURK101": {
   "PÇ6": 4
  },
  "YDBİ101": {
   "PÇ6": 3,
   "PÇ10": 4
  },
  "TDP101": {
   "PÇ7": 3,
   "PÇ8": 3,
   "PÇ9": 3
  },
  "SETP102": {
   "PÇ1": 4,
   "PÇ3": 4,
   "PÇ4": 4,
   "PÇ5": 3,
   "PÇ13": 3,
   "PÇ14": 5
  },
  "SETP104": {
   "PÇ1": 4,
   "PÇ3": 3,
   "PÇ5": 3,
   "PÇ9": 3,
   "PÇ11": 5,
   "PÇ13": 3
  },
  "SETP106": {
   "PÇ1": 4,
   "PÇ3": 4,
   "PÇ4": 4,
   "PÇ5": 3,
   "PÇ7": 3,
   "PÇ11": 3,
   "PÇ12": 4,
   "PÇ13": 5
  },
  "SOZ108": {
   "PÇ2": 4,
   "PÇ5": 3,
   "PÇ8": 3,
   "PÇ9": 4
  },
  "TURK102": {
   "PÇ6": 4
  },
  "YDBİ102": {
   "PÇ6": 3,
   "PÇ10": 4
  },
  "TDP102": {
   "PÇ7": 4,
   "PÇ8": 3,
   "PÇ9": 3
  },
  "GME100": {
   "PÇ9": 5
  },
  "KRY100": {
   "PÇ6": 3,
   "PÇ8": 5
  },
  "SETP201": {
   "PÇ1": 4,
   "PÇ3": 3,
   "PÇ4": 3,
   "PÇ5": 3,
   "PÇ6": 4,
   "PÇ13": 3,
   "PÇ14": 4
  },
  "SETP203": {
   "PÇ1": 4,
   "PÇ3": 3,
   "PÇ4": 3,
   "PÇ5": 3,
   "PÇ12": 5,
   "PÇ13": 4
  },
  "SETP205": {
   "PÇ1": 3,
   "PÇ3": 3,
   "PÇ4": 3,
   "PÇ5": 3,
   "PÇ9": 4,
   "PÇ11": 5
  },
  "SOZ205": {
   "PÇ2": 5,
   "PÇ5": 4,
   "PÇ7": 3,
   "PÇ9": 3
  },
  "SETP207": {
   "PÇ6": 3,
   "PÇ10": 5
  },
  "AİİT201": {
   "PÇ9": 3
  },
  "SOS210": {
   "PÇ1": 5,
   "PÇ3": 4,
   "PÇ5": 5,
   "PÇ6": 4,
   "PÇ7": 4,
   "PÇ9": 4,
   "PÇ11": 4,
   "PÇ12": 4,
   "PÇ13": 5,
   "PÇ14": 4
  },
  "AİİT202": {
   "PÇ9": 3
  },
  "SETP209": {
   "PÇ1": 3,
   "PÇ3": 4,
   "PÇ4": 3,
   "PÇ6": 3,
   "PÇ14": 3
  },
  "SETP211": {
   "PÇ1": 4,
   "PÇ3": 3,
   "PÇ5": 4,
   "PÇ6": 3,
   "PÇ13": 3,
   "PÇ14": 5
  },
  "SETP213": {
   "PÇ1": 3,
   "PÇ3": 4,
   "PÇ4": 4,
   "PÇ6": 3,
   "PÇ14": 4
  },
  "SETP215": {
   "PÇ1": 3,
   "PÇ3": 3,
   "PÇ4": 3,
   "PÇ6": 4,
   "PÇ13": 3,
   "PÇ14": 5
  },
  "SETP217": {
   "PÇ1": 4,
   "PÇ3": 3,
   "PÇ4": 3,
   "PÇ5": 5,
   "PÇ13": 3,
   "PÇ14": 4
  },
  "SETP219": {
   "PÇ1": 4,
   "PÇ3": 4,
   "PÇ4": 4,
   "PÇ5": 3,
   "PÇ11": 4,
   "PÇ12": 4,
   "PÇ13": 5,
   "PÇ14": 4
  },
  "SETP221": {
   "PÇ1": 3,
   "PÇ3": 3,
   "PÇ5": 4,
   "PÇ9": 3
  },
  "SETP223": {
   "PÇ1": 3,
   "PÇ3": 4,
   "PÇ4": 4,
   "PÇ14": 4
  },
  "SETP225": {
   "PÇ1": 3,
   "PÇ3": 3,
   "PÇ4": 3,
   "PÇ5": 3,
   "PÇ13": 3,
   "PÇ14": 5
  },
  "SETP227": {
   "PÇ1": 3,
   "PÇ2": 4,
   "PÇ3": 3,
   "PÇ4": 4,
   "PÇ9": 3,
   "PÇ11": 4
  },
  "SETP229": {
   "PÇ1": 3,
   "PÇ3": 3,
   "PÇ5": 3,
   "PÇ6": 4,
   "PÇ13": 3,
   "PÇ14": 3
  },
  "SETP231": {
   "PÇ1": 4,
   "PÇ3": 3,
   "PÇ5": 4,
   "PÇ13": 4,
   "PÇ14": 3
  },
  "SETP233": {
   "PÇ1": 3,
   "PÇ3": 3,
   "PÇ5": 3,
   "PÇ9": 3,
   "PÇ14": 3
  },
  "SETP235": {
   "PÇ1": 3,
   "PÇ3": 3,
   "PÇ4": 4,
   "PÇ6": 3,
   "PÇ14": 4
  },
  "SETP237": {
   "PÇ1": 4,
   "PÇ3": 3,
   "PÇ5": 3,
   "PÇ13": 3,
   "PÇ14": 3
  },
  "SETP239": {
   "PÇ1": 4,
   "PÇ3": 3,
   "PÇ5": 3,
   "PÇ10": 2,
   "PÇ12": 3,
   "PÇ13": 3,
   "PÇ14": 4
  },
  "SETP108": {
   "PÇ1": 4,
   "PÇ3": 3,
   "PÇ5": 3,
   "PÇ10": 2,
   "PÇ12": 4,
   "PÇ13": 4
  },
  "SOS102": {
   "PÇ1": 3,
   "PÇ3": 3,
   "PÇ5": 3
  },
  "SOS106": {
   "PÇ1": 3,
   "PÇ5": 3,
   "PÇ9": 3,
   "PÇ11": 4
  },
  "SOS108": {
   "PÇ1": 3,
   "PÇ2": 3,
   "PÇ9": 3
  },
  "SOS112": {
   "PÇ1": 3,
   "PÇ5": 3,
   "PÇ8": 3
  },
  "SOS118": {
   "PÇ1": 3,
   "PÇ3": 4,
   "PÇ5": 4,
   "PÇ8": 3,
   "PÇ13": 3
  },
  "SOS120": {
   "PÇ1": 3,
   "PÇ3": 4,
   "PÇ5": 4,
   "PÇ8": 3,
   "PÇ13": 3,
   "PÇ14": 3
  },
  "SOS122": {
   "PÇ1": 3,
   "PÇ5": 3,
   "PÇ6": 3,
   "PÇ7": 4,
   "PÇ8": 3
  },
  "SOS124": {
   "PÇ1": 4,
   "PÇ3": 3,
   "PÇ5": 4,
   "PÇ6": 4,
   "PÇ13": 4,
   "PÇ14": 3
  },
  "SOS128": {
   "PÇ1": 3,
   "PÇ3": 3,
   "PÇ5": 4,
   "PÇ9": 3
  },
  "SOS130": {
   "PÇ1": 3,
   "PÇ6": 5
  },
  "SOS132": {
   "PÇ1": 3,
   "PÇ3": 4,
   "PÇ4": 5,
   "PÇ5": 3,
   "PÇ9": 3,
   "PÇ14": 3
  },
  "SOS134": {
   "PÇ1": 3,
   "PÇ4": 5,
   "PÇ5": 4,
   "PÇ14": 4
  },
  "SOS136": {
   "PÇ2": 4,
   "PÇ7": 3
  },
  "SOS138": {
   "PÇ1": 3,
   "PÇ7": 4,
   "PÇ8": 3
  },
  "SOS142": {
   "PÇ9": 3
  },
  "SOS144": {
   "PÇ1": 3,
   "PÇ6": 3,
   "PÇ9": 3
  },
  "SOS150": {
   "PÇ2": 4,
   "PÇ3": 3,
   "PÇ5": 3
  },
  "SOS154": {
   "PÇ1": 3,
   "PÇ5": 3,
   "PÇ13": 3,
   "PÇ14": 3
  },
  "SOS156": {
   "PÇ1": 4,
   "PÇ3": 5,
   "PÇ4": 5,
   "PÇ5": 5,
   "PÇ6": 5,
   "PÇ8": 4,
   "PÇ9": 4,
   "PÇ13": 4,
   "PÇ14": 4
  }
 },
 "DIS_PAYDAS_DERS": [
  {
   "ders": "E-Ticaret Operasyonları Yönetimi",
   "akts": 3,
   "dayanak": "Danışma Kurulu (2025/1; 2026/01 Karar 5)"
  },
  {
   "ders": "Yapay Zekâ Okuryazarlığı",
   "akts": 3,
   "dayanak": "Danışma Kurulu (2025/1; 2026/01 Karar 5)"
  },
  {
   "ders": "E-Ticaret Mevzuatı — ürün güvenliği konusu",
   "akts": 4,
   "dayanak": "Danışma Kurulu (2025/1)"
  },
  {
   "ders": "Sürdürülebilirlik",
   "akts": 3,
   "dayanak": "Danışma Kurulu (2026/01 Karar 5)"
  },
  {
   "ders": "İş Sağlığı ve Güvenliği",
   "akts": 3,
   "dayanak": "Danışma Kurulu (2026/01 Karar 5)"
  }
 ],
 "POC_DERSLER": [
  {
   "ders": "E-Ticaret",
   "akts": 4,
   "pc": "PÇ11, PÇ12, PÇ13, PÇ14"
  },
  {
   "ders": "E-Ticaret Mevzuatı",
   "akts": 4,
   "pc": "PÇ11, PÇ13"
  },
  {
   "ders": "E-Ticaret Operasyonları Yönetimi",
   "akts": 3,
   "pc": "PÇ11, PÇ12, PÇ13"
  },
  {
   "ders": "Lojistik",
   "akts": 4,
   "pc": "PÇ12, PÇ13"
  },
  {
   "ders": "Bilişim Mevzuatı",
   "akts": 4,
   "pc": "PÇ11"
  },
  {
   "ders": "Dijital Pazarlama",
   "akts": 3,
   "pc": "PÇ13, PÇ14"
  },
  {
   "ders": "İş Yeri Eğitimi",
   "akts": 30,
   "pc": "PÇ11, PÇ12, PÇ13, PÇ14"
  }
 ],
 "MEKANIZMA": [
  {
   "ad": "Danışma Kurulu",
   "paydas": "Dış paydaş (sektör)",
   "siklik": "Düzenli toplantı",
   "kanit": "ET.K.4.7"
  },
  {
   "ad": "İstişare Kurulu",
   "paydas": "Öğrenci ve mezun",
   "siklik": "Dönemsel",
   "kanit": "ET.K.4.8"
  },
  {
   "ad": "Dijital Sürekli İyileştirme Paneli",
   "paydas": "İç ve dış paydaş",
   "siklik": "Sürekli / anlık",
   "kanit": "ET.K.4.9"
  },
  {
   "ad": "Yazılı paydaş görüşü (görüş/tavsiye dosyası)",
   "paydas": "Dış paydaş (sektör)",
   "siklik": "Sürekli / dönemden bağımsız",
   "kanit": "ET.K.4.25"
  },
  {
   "ad": "Sektör işbirliği niyet beyanları",
   "paydas": "Dış paydaş (sektör)",
   "siklik": "Dönemsel / ihtiyaç",
   "kanit": "ET.K.4.34"
  },
  {
   "ad": "Öğrenci görüş anketleri (ÇAP/Yandal vb.)",
   "paydas": "Öğrenci",
   "siklik": "Dönemsel",
   "kanit": "ET.K.4.11"
  },
  {
   "ad": "Personel Memnuniyet Anketi",
   "paydas": "İç paydaş (personel)",
   "siklik": "Yıllık (kurumsal)",
   "kanit": "ET.K.4.10"
  },
  {
   "ad": "Akademik danışman-öğrenci görüşmeleri",
   "paydas": "Öğrenci",
   "siklik": "Sürekli / bireysel",
   "kanit": "ET.K.4.12"
  },
  {
   "ad": "Mezun anketleri ve izleme",
   "paydas": "Mezun",
   "siklik": "Yıllık (kurumsal)",
   "kanit": "ET.K.4.13, 4.14"
  }
 ],
 "DONGU_ORNEK": [
  {
   "girdi": "E-Ticaret Operasyonları Yönetimi dersinin müfredata eklenmesi (Danışma Kurulu, 26.06.2025)",
   "cikti": "Ders, öğretim planına eklendi",
   "kanit": "ET.K.4.21; ET.K.4.22"
  },
  {
   "girdi": "Yapay zekâ kullanımına yönelik ders açılması (Danışma Kurulu, 26.06.2025)",
   "cikti": "Yapay Zekâ Okuryazarlığı dersi öğretim planına eklendi ve alanında uzman öğretim elemanı görevlendirildi",
   "kanit": "ET.K.4.21; ET.K.4.22; ET.K.4.24"
  },
  {
   "girdi": "İş Yeri Eğitimi/staj için aranan not ortalaması koşulunun 2,00'a indirilmesi (Danışma Kurulu, 26.06.2025)",
   "cikti": "Koşul 2,00'a indirilerek uygulandı",
   "kanit": "ET.K.4.21"
  },
  {
   "girdi": "E-Ticaret Mevzuatı dersine ürün güvenliği konusunun eklenmesi (Danışma Kurulu, 26.06.2025)",
   "cikti": "Konu derse eklendi ve rubrikli Ürün Güvenliği Vaka Raporu ödevi tasarlandı",
   "kanit": "ET.K.4.21; ET.K.4.4"
  },
  {
   "girdi": "Öğretim elemanı kadrosunun e-ticaret alanına uygun biçimde zenginleştirilmesi (Danışma Kurulu, 26.06.2025)",
   "cikti": "Bölümce her yıl ilgili kadro talepleri ve alana uygun ders görevlendirme talepleri yapılmaktadır",
   "kanit": "ET.K.4.21; ET.K.4.24"
  },
  {
   "girdi": "3+1 İşletmede Mesleki Eğitim modelinin tüm programlarda zorunlu hâle getirilmesi (İstişare Kurulu 05.05.2026; YÖK İşletmede Mesleki Eğitim Modeli)",
   "cikti": "Model 2026-2027'den itibaren yeni kayıtlar için zorunlu uygulanacak biçimde karara bağlandı; 4. yarıyıl tamamen işyeri eğitimi olarak yapılandırıldı (BEK 03.06.2026; Yüksekokul Kurulu 04.06.2026)",
   "kanit": "ET.K.4.22; ET.K.4.37"
  }
 ],
 "DANISMA_KURULU": [
  {
   "ad": "Hakan Sarı",
   "kurum": "Trendyol",
   "gorev": "Sektör temsilcisi",
   "kategori": "İşgücü piyasası (e-ticaret platformu)"
  },
  {
   "ad": "Zeynep Ölçal",
   "kurum": "Gaziantep Sanayi Odası",
   "gorev": "Meslek odası temsilcisi",
   "kategori": "Meslek kuruluşu temsilcisi"
  },
  {
   "ad": "Murat Akdamar",
   "kurum": "Karmen Halı",
   "gorev": "E-Ticaret Yöneticisi",
   "kategori": "İşgücü piyasası (sektör)"
  },
  {
   "ad": "İsmail Demir",
   "kurum": "Eruslu Sağlık Ürünleri",
   "gorev": "E-Ticaret Operasyon Müdürü",
   "kategori": "İşgücü piyasası (sektör)"
  },
  {
   "ad": "Gazi Kayhan",
   "kurum": "Lidersan",
   "gorev": "Satış Sorumlusu",
   "kategori": "İşgücü piyasası (sektör)"
  },
  {
   "ad": "Enes Küsbeoğlu",
   "kurum": "Eruslu Sağlık Ürünleri",
   "gorev": "E-Ticaret Stok Takip Uzman Yardımcısı",
   "kategori": "Program mezunu"
  }
 ],
 "KANIT": {
  "1": [
   {
    "kod": "ET.K.1.1",
    "ad": "YÖK Atlas — Program Sayfası, Kontenjan ve Yerleşme İstatistikleri (104290290)",
    "url": "https://yokatlas.yok.gov.tr/onlisans.php?y=104290290"
   },
   {
    "kod": "ET.K.1.2",
    "ad": "Ders Bilgi Paketleri (konsolide — tüm dersler; mevcut sürüm)",
    "url": "https://drive.google.com/file/d/1jetygGkjooGPMIRVKHwfyW8fThViBPEf/view"
   },
   {
    "kod": "ET.K.1.4",
    "ad": "2025 YÖK Kontenjanlar Listesi",
    "url": "https://drive.google.com/file/d/1fxebOqpvGeQ8Zt66CMuansco26XyoA0x/view"
   },
   {
    "kod": "ET.K.1.5",
    "ad": "GAÜN Yatay Geçiş Esasları Yönergesi",
    "url": "https://www.gaziantep.edu.tr/mevzuat/icerik.php?ID=395"
   },
   {
    "kod": "ET.K.1.6",
    "ad": "Uluslararası Öğrenci Başvuru ve Kayıt Kabul Yönergesi",
    "url": "https://www.gaziantep.edu.tr/mevzuat/icerik.php?ID=428"
   },
   {
    "kod": "ET.K.1.7",
    "ad": "GAÜN Çift Anadal ve Yandal Programı Yönergesi (Üniversite Senatosu Kararı, güncel)",
    "url": "https://drive.google.com/file/d/1gLK5T1GGdQTROPUqf7yA6xmnMtTHssJY/view"
   },
   {
    "kod": "ET.K.1.9",
    "ad": "Akademik Takvim (GAÜN-Uyum 2025 Program Takvimi)",
    "url": "https://drive.google.com/file/d/1LhnqjznJNcMqL0NujnPTCPYYTdDi0EL1/view"
   },
   {
    "kod": "ET.K.1.10",
    "ad": "Önceki Öğrenmenin Tanınması Yönergesi",
    "url": "https://drive.google.com/file/d/1CYWeWcIPOPwOTc17rEm7FChVc_dnXcXd/view"
   },
   {
    "kod": "ET.K.1.11",
    "ad": "2025 Muafiyet Örnek Yazışmaları",
    "url": "https://drive.google.com/file/d/1iNbXw-XyjUEULkCGCl3lJcJoaJ6SVgRY/view"
   },
   {
    "kod": "ET.K.1.12",
    "ad": "Yeni Kayıt Muafiyet Başvurusu (örnek)",
    "url": "https://drive.google.com/file/d/11z6U1iw61nY-_aFTO04W0UWH02aNHGW1/view"
   },
   {
    "kod": "ET.K.1.13",
    "ad": "E-Ticaret ve Pazarlama Öğretim Planı / Ders Kataloğu (2026)",
    "url": "https://drive.google.com/file/d/125533OX9Bbv87W-TVSFfeXtdSFK8WUr9/view"
   },
   {
    "kod": "ET.K.1.14",
    "ad": "Uygulamalı/işyeri eğitimi çıktısı örneği — Örnek Stajyer Dosyası (3+1 İş Yeri Eğitimi Defteri ve değerlendirme)",
    "url": "https://drive.google.com/file/d/1OzTgcSvBJMZXqklV9p0C6ghPtLhw9prO/view"
   },
   {
    "kod": "ET.K.1.15",
    "ad": "Danışma Kurulu Listesi",
    "url": "https://drive.google.com/file/d/1Ehkn8bb54CqKb0y24IxkLOQ_Fv0D3FBv/view"
   },
   {
    "kod": "ET.K.1.16",
    "ad": "Danışma Kurulu Toplantı Tutanağı (2026/01)",
    "url": "https://drive.google.com/file/d/1RlgUWcydl6eRv6wVsLrLyS07vSNMLcYP/view"
   },
   {
    "kod": "ET.K.1.17",
    "ad": "Staj Evrakları Kontrol Listesi",
    "url": "https://drive.google.com/file/d/1SMs-p312aHVogC0CJOYKBGVEicNtIRaU/view"
   },
   {
    "kod": "ET.K.1.18",
    "ad": "Dijitalleşme ve Yönetim Süreçlerinin Uyumlanması (Sürekli İyileştirme Paneli) — Sektör Protokolleri",
    "url": "https://drive.google.com/file/d/1NqNJf7gcPxba4YYFrUrEpojFJGBP4S_y/view"
   },
   {
    "kod": "ET.K.1.19",
    "ad": "Erasmus+ Uygulama Yönergesi",
    "url": "https://www.gaziantep.edu.tr/mevzuat/icerik.php?ID=419"
   },
   {
    "kod": "ET.K.1.20",
    "ad": "Mevlâna Değişim Programı (Koordinatörlük)",
    "url": "https://mevlana.gaziantep.edu.tr/"
   },
   {
    "kod": "ET.K.1.21",
    "ad": "Farabi Değişim Programı (Koordinatörlük)",
    "url": "https://farabi.gaziantep.edu.tr/"
   },
   {
    "kod": "ET.K.1.22",
    "ad": "Öğrenci Değişim Programları (Erasmus/Farabi) Bilgilendirme Toplantısı — görseller dâhil (15.10.2025)",
    "url": "https://drive.google.com/file/d/1JYImiqH1pVFAes-rVWrLIwzlfYbaTlM4/view"
   },
   {
    "kod": "ET.K.1.23",
    "ad": "Ders İzlenceleri / Ders Bilgi Paketleri (konsolide; mevcut sürüm)",
    "url": "https://drive.google.com/file/d/1jetygGkjooGPMIRVKHwfyW8fThViBPEf/view"
   },
   {
    "kod": "ET.K.1.24",
    "ad": "DÖÇ-PÇ İlişki Matrisi (Matris_ve_Tum_Ders)",
    "url": "https://drive.google.com/file/d/1o4sIUuMnI-0eDLwJeeRxPMLoeg8V7lKI/view"
   },
   {
    "kod": "ET.K.1.25",
    "ad": "E-Ticaret Mevzuatı Dersi Ödev ve Puanlı Rubrik (Ürün Güvenliği)",
    "url": "https://drive.google.com/file/d/1PrvHs6UmyR6b5SNcXwj69Y1DAm48fInK/view"
   },
   {
    "kod": "ET.K.1.26",
    "ad": "GAÜN Öğrenci Danışmanlık Yönergesi",
    "url": "https://drive.google.com/file/d/1pSenLL2WCMaqPKAQ04YwQezyWE7ylTLr/view"
   },
   {
    "kod": "ET.K.1.27",
    "ad": "Akademik Danışman-Öğrenci Görüşme Formu (doldurulmuş örnek; kariyer/mezuniyet dâhil)",
    "url": "https://drive.google.com/file/d/1YLIqkD-_kMREeyz5TgrBx4T3gF4d-s0q/view"
   },
   {
    "kod": "ET.K.1.28",
    "ad": "Kariyer Planlama Dersi Bilgi Paketi (konsolide DBP içinden)",
    "url": "https://drive.google.com/file/d/1jetygGkjooGPMIRVKHwfyW8fThViBPEf/view"
   },
   {
    "kod": "ET.K.1.29",
    "ad": "Azami Öğrenim Süresi / İlişik Kesme Bölüm Kurulu Kararı (11.09.2025, 2025/06)",
    "url": "https://drive.google.com/file/d/1BbB3MWHL_zBPbqOy4x10p44nU-oJA_f9/view"
   },
   {
    "kod": "ET.K.1.31",
    "ad": "Dijitalleşme ve Yönetim Süreçlerinin Uyumlanması (Sürekli İyileştirme Paneli) — Görüşler",
    "url": "https://drive.google.com/file/d/1NqNJf7gcPxba4YYFrUrEpojFJGBP4S_y/view"
   },
   {
    "kod": "ET.K.1.32",
    "ad": "İstişare Kurulu Toplantı Tutanağı",
    "url": "https://drive.google.com/file/d/1OwSVW6qr3topbHbcm3J98dlJ1NE-NbiT/view"
   },
   {
    "kod": "ET.K.1.33",
    "ad": "Mezun Etkinlik Duyurusu 2026",
    "url": "https://drive.google.com/file/d/1tzZk3NdckRCS5mE3sEKsKd_MkmEfz9P5/view"
   },
   {
    "kod": "ET.K.1.34",
    "ad": "GAÜN Önlisans-Lisans Eğitim-Öğretim Yönetmeliği (RG 21.08.2017/30161)",
    "url": "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=23859&MevzuatTur=8&MevzuatTertip=5"
   },
   {
    "kod": "ET.K.1.35",
    "ad": "2025-2026 Mezun Aday Listesi",
    "url": "https://drive.google.com/file/d/1KdRKmb8EXgKBeODFtcvNhJuG_Q4xmVcV/view"
   },
   {
    "kod": "ET.K.1.36",
    "ad": "Sektör İşbirliği Niyet Beyanları (üç imzalı kuruluş: staj/İME, uzman katılımı, saha ziyaretleri, ortak çalışmalar)",
    "url": "https://drive.google.com/file/d/1icbmJxVy8XcXv0nup-pFg2PpW0I3pDvA/view"
   },
   {
    "kod": "ET.K.1.37",
    "ad": "Gaziantep Üniversitesi Eğitim-Öğretim Politikası",
    "url": "https://drive.google.com/file/d/1YkU5ZAC6nCQ1_Y0pKGYwL9-LVvIqOlsX/view"
   },
   {
    "kod": "ET.K.1.38",
    "ad": "Çift Anadal ve Yandal Paydaş (Öğrenci) Görüş Formu",
    "url": "https://drive.google.com/file/d/1BGdV3YSf9hAdxA9-nxRpLH2VC9AcwuWt/view"
   },
   {
    "kod": "ET.K.1.39",
    "ad": "Bölüm Kurulu Kararı (12.06.2026, 2026/04)",
    "url": "https://drive.google.com/file/d/16Edlo37GiLB_0NNRkPlv9Qq3gA-67iXS/view"
   },
   {
    "kod": "ET.K.1.40",
    "ad": "YÖK — Geçiş, ÇAP, Yandal ve Kurumlar Arası Kredi Transferi Yönetmeliği (RG 24.04.2010/27561)",
    "url": "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=13948&MevzuatTur=7&MevzuatTertip=5"
   },
   {
    "kod": "ET.K.1.41",
    "ad": "Yatay Geçiş ve Ders İntibakı Örnek İşlemleri",
    "url": "https://drive.google.com/file/d/110i9w_1H0Lk9jvUvomUNfXD-8I79QwfW/view"
   },
   {
    "kod": "ET.K.1.42",
    "ad": "GAİB (Güneydoğu Anadolu İhracatçı Birlikleri) Öğrenci Etkinlik Katılımı (13.11.2024)",
    "url": "https://drive.google.com/file/d/19x5hm7lFFCh3kTtA8WgSQcHJLDv9UDVA/view"
   },
   {
    "kod": "ET.K.1.43",
    "ad": "Trendyol E-Ticaretin Geleceği Söyleşisi — Öğrenci Etkinlik Katılımı (görseller dâhil, 23.09.2025)",
    "url": "https://drive.google.com/file/d/1VsBjV47pLZ4wKWd7gRtqvx0aQpU0GpLP/view"
   },
   {
    "kod": "ET.K.1.44",
    "ad": "Meslek Yüksekokulları Kariyer Fuarı (10 Aralık 2025) — duyuru ve katılım belgeleri",
    "url": "https://drive.google.com/drive/folders/1ablb8kJSi_efijB2FgXQE7lht3t1IkmH"
   },
   {
    "kod": "ET.K.1.45",
    "ad": "Örnek Mezun Öğrenci Transkripti (mezuniyet gerekliliklerinin doğrulanması)",
    "url": "https://drive.google.com/file/d/1Os2wjUitPq9Y7-k7Cvnq02VEqvSDUjE9/view"
   },
   {
    "kod": "ET.K.1.46",
    "ad": "İşyerinde Mesleki Eğitim ve Staj Protokolleri (örnek: Migros vb. — sektörel çeşitlilik)",
    "url": "https://drive.google.com/file/d/1O6SY2vpNBOeZdKw4bA9kxbfcbmHN3X85/view"
   },
   {
    "kod": "ET.K.1.47",
    "ad": "Öğrenci Anketleri Değerlendirme Raporu (2025-2026 Güz: ders ve memnuniyet anketleri)",
    "url": "https://drive.google.com/file/d/1k3sJfKgVYCgl2ufQeXrp-74z0T2L9xLS/view"
   },
   {
    "kod": "ET.K.1.48",
    "ad": "Çift Anadal ve Yandal Görüş Anketi Değerlendirme Raporu",
    "url": "https://drive.google.com/file/d/1jfQV8bkBeHDyqLRnT8SjGIoHfo5RYVE5/view"
   },
   {
    "kod": "ET.K.1.49",
    "ad": "Etkinlik, Akademik Danışmanlık ve Teknik Gezi Anketleri Değerlendirme Raporu (2025-2026 Bahar)",
    "url": "https://drive.google.com/file/d/1UDMuyBNSfCf8korZU5LRKuULBj3bEsFZ/view"
   },
   {
    "kod": "ET.K.1.52",
    "ad": "Program Sürdürülebilir Yönetim Planı",
    "url": "https://drive.google.com/file/d/1Unot4pdzVAoeld_NOfRB5SXYpYLqnkQP/view"
   },
   {
    "kod": "ET.K.1.53",
    "ad": "Öğrenci Memnuniyet ve Görüş Anketleri Program Değerlendirme Özeti",
    "url": "https://drive.google.com/file/d/1pdMSJJT2n2UAvTqkU2H6YILiNdwK5fqE/view"
   },
   {
    "kod": "ET.K.1.54",
    "ad": "Mezun Mutabakat Yazıları ve Mezun Aday/Mutabakat Listesi (Öğrenci İşleri ile mezuniyet kontrolü)",
    "url": "https://drive.google.com/file/d/1TRoih_vgzDqe55MmPrUuEhArp597jTJ7/view"
   },
   {
    "kod": "ET.K.1.55",
    "ad": "Yatay Geçiş Bölüm Kurulu Kararı",
    "url": "https://drive.google.com/file/d/1uWWiTVOH-kBfOr0cjqaX_eGFSU6C9m6v/view"
   },
   {
    "kod": "ET.K.1.56",
    "ad": "Azami Süre Kurulu Kararı (Sosyal Bilimler MYO)",
    "url": "https://drive.google.com/file/d/1CQtPMI5Gb1OiL-jMzYJcAgDuK1BqXULw/view"
   },
   {
    "kod": "ET.K.1.57",
    "ad": "2025 Akademik Kurul Toplantı Tutanağı",
    "url": "https://drive.google.com/file/d/1Ny2Dv4uVvy-L-tH4z2vb64bJCGb3U2nJ/view"
   },
   {
    "kod": "ET.K.1.58",
    "ad": "2025-2026 Öğrenci Oryantasyon Toplantısı",
    "url": "https://drive.google.com/file/d/12sFZm9w324d4SGzIUPCRI4LvRTgTWfDE/view"
   }
  ],
  "2": [
   {
    "kod": "ET.K.2.1",
    "ad": "Bölüm Kurulu Kararı (12.06.2026, 2026/04) — Misyon/Vizyon, PEA, PÇ, APG ve Yönetim Planı'nın kabulü",
    "url": "https://drive.google.com/file/d/16Edlo37GiLB_0NNRkPlv9Qq3gA-67iXS/view"
   },
   {
    "kod": "ET.K.2.2",
    "ad": "Program Sürdürülebilir Yönetim Planı (BKK 2026/04 Ek-2)",
    "url": "https://drive.google.com/file/d/1Unot4pdzVAoeld_NOfRB5SXYpYLqnkQP/view"
   },
   {
    "kod": "ET.K.2.3",
    "ad": "Misyon, Vizyon, PEA, PÇ, APG ve Danışma Kurulu Üyelerinin Kamuoyuna İlanı — Program Web Sayfası (canlı; ekran görüntüsü ayrıca ET.K.5.11)",
    "url": "https://sbmyopazarlama.gaziantep.edu.tr/pages.php?url=e-ticaret-ve-pazarlama-programi-hakkinda-36"
   },
   {
    "kod": "ET.K.2.4",
    "ad": "Bologna Bilgi Paketi kamuoyu paylaşımı (E-Ticaret ve Pazarlama Programı — canlı sayfa)",
    "url": "https://obs.gantep.edu.tr/oibs/bologna/index.aspx?lang=tr&curOp=showPac&curUnit=153&curSunit=11414"
   },
   {
    "kod": "ET.K.2.5",
    "ad": "Gaziantep Üniversitesi 2025-2029 Stratejik Planı",
    "url": "https://drive.google.com/file/d/1UN0p-2-N8y9fFcK1f94msMg3tCQZFcUf/view"
   },
   {
    "kod": "ET.K.2.6",
    "ad": "Türkiye Yeterlilikler Çerçevesi (TYÇ) belgesi",
    "url": "https://drive.google.com/file/d/1Wsv0zHLQ5skTeTpJMHzzCyLm6WGa18y0/view"
   },
   {
    "kod": "ET.K.2.7",
    "ad": "Sosyal Bilimler MYO Misyonu (web sayfası)",
    "url": "https://sbmyo.gaziantep.edu.tr/pages.php?url=misyonumuz-91"
   },
   {
    "kod": "ET.K.2.8",
    "ad": "Sosyal Bilimler MYO Vizyonu (web sayfası)",
    "url": "https://sbmyo.gaziantep.edu.tr/pages.php?url=vizyonumuz-92"
   },
   {
    "kod": "ET.K.2.12",
    "ad": "Danışma Kurulu Listesi (2026)",
    "url": "https://drive.google.com/file/d/1Ehkn8bb54CqKb0y24IxkLOQ_Fv0D3FBv/view"
   },
   {
    "kod": "ET.K.2.13",
    "ad": "Danışma Kurulu Toplantı Tutanağı (14.05.2026, 2026/01-DK)",
    "url": "https://drive.google.com/file/d/1RlgUWcydl6eRv6wVsLrLyS07vSNMLcYP/view"
   },
   {
    "kod": "ET.K.2.14",
    "ad": "Dış Paydaş Görüşü (Murat Akdamar)",
    "url": "https://drive.google.com/file/d/1XwWuIRIYtAYxIFPi1gDxFbvlEzLraLCM/view"
   },
   {
    "kod": "ET.K.2.15",
    "ad": "İstişare Kurulu Toplantı Tutanağı (05.05.2026)",
    "url": "https://drive.google.com/file/d/1OwSVW6qr3topbHbcm3J98dlJ1NE-NbiT/view"
   },
   {
    "kod": "ET.K.2.16",
    "ad": "Çift Anadal ve Yandal Öğrenci Görüş Formu",
    "url": "https://drive.google.com/file/d/1BGdV3YSf9hAdxA9-nxRpLH2VC9AcwuWt/view"
   },
   {
    "kod": "ET.K.2.17",
    "ad": "MEDEK Önlisans Program Ölçütleri v1.1 Rehberi (KL-004)",
    "url": "https://drive.google.com/file/d/1XVm0zuBclafSFH09S8ojB-Jp51sHv7uG/view"
   },
   {
    "kod": "ET.K.2.18",
    "ad": "Dijital Sürekli İyileştirme Paneli (Dijitalleşme ve Yönetim Süreçlerinin Uyumlanması)",
    "url": "https://drive.google.com/file/d/1NqNJf7gcPxba4YYFrUrEpojFJGBP4S_y/view"
   },
   {
    "kod": "ET.K.2.19",
    "ad": "Gaziantep Üniversitesi Danışma Kurulları Yönergesi (Senato 22.11.2022)",
    "url": "https://drive.google.com/file/d/1yqHV9A3J8rQUvHvMg1dPYEVQjYIi6Aqj/view"
   },
   {
    "kod": "ET.K.2.20",
    "ad": "Çift Anadal ve Yandal Görüş Anketi Değerlendirme Raporu",
    "url": "https://drive.google.com/file/d/1jfQV8bkBeHDyqLRnT8SjGIoHfo5RYVE5/view"
   },
   {
    "kod": "ET.K.2.21",
    "ad": "Mezun ve İşveren Anketi Program Düzeyi Değerlendirme Raporu (APG referans değerleri)",
    "url": "https://drive.google.com/file/d/1NnjNOu_r81RjmUiP2PHNI4QrvL3Psd3_/view"
   }
  ],
  "3": [
   {
    "kod": "ET.K.3.1",
    "ad": "Bölüm Kurulu Kararı (12.06.2026, 2026/04) — PÇ ve Ders-PÇ Matrisinin kabulü",
    "url": "https://drive.google.com/file/d/16Edlo37GiLB_0NNRkPlv9Qq3gA-67iXS/view"
   },
   {
    "kod": "ET.K.3.2",
    "ad": "Program Sürdürülebilir Yönetim Planı",
    "url": "https://drive.google.com/file/d/1Unot4pdzVAoeld_NOfRB5SXYpYLqnkQP/view"
   },
   {
    "kod": "ET.K.3.3",
    "ad": "Web Sayfasında PÇ, PEA, APG ve Danışma Kurulu Üyelerinin Kamuoyuna İlanı",
    "url": "https://drive.google.com/file/d/1HbIOvuuDPN919dT54eDXcg7zl2oilC-F/view"
   },
   {
    "kod": "ET.K.3.4",
    "ad": "Ders-PÇ İlişki Matrisi (Matris_ve_Tum_Ders) — BKK Ek-3",
    "url": "https://drive.google.com/file/d/1o4sIUuMnI-0eDLwJeeRxPMLoeg8V7lKI/view"
   },
   {
    "kod": "ET.K.3.5",
    "ad": "MEDEK Önlisans Program Ölçütleri v1.1 (KL-004)",
    "url": "https://drive.google.com/file/d/1EpubaUqwSIaU0wkkeMGgkXdmv3CjiczZ/view"
   },
   {
    "kod": "ET.K.3.6",
    "ad": "Türkiye Yeterlilikler Çerçevesi (TYÇ) belgesi",
    "url": "https://drive.google.com/file/d/1Wsv0zHLQ5skTeTpJMHzzCyLm6WGa18y0/view"
   },
   {
    "kod": "ET.K.3.7",
    "ad": "Danışma Kurulu Toplantı Tutanağı (14.05.2026, 2026/01-DK)",
    "url": "https://drive.google.com/file/d/1RlgUWcydl6eRv6wVsLrLyS07vSNMLcYP/view"
   },
   {
    "kod": "ET.K.3.8",
    "ad": "İstişare Kurulu Toplantı Tutanağı (05.05.2026)",
    "url": "https://drive.google.com/file/d/1OwSVW6qr3topbHbcm3J98dlJ1NE-NbiT/view"
   },
   {
    "kod": "ET.K.3.9",
    "ad": "Ders Bilgi Paketleri (DÖÇ-PÇ ilişkisi; konsolide, mevcut sürüm)",
    "url": "https://drive.google.com/file/d/1jetygGkjooGPMIRVKHwfyW8fThViBPEf/view"
   },
   {
    "kod": "ET.K.3.10",
    "ad": "E-Ticaret Mevzuatı Dersi Ödev ve Puanlı Rubriki (Ürün Güvenliği Vaka Raporu)",
    "url": "https://drive.google.com/file/d/1PrvHs6UmyR6b5SNcXwj69Y1DAm48fInK/view"
   },
   {
    "kod": "ET.K.3.11",
    "ad": "E-Ticaret Mevzuatı Ödevi Rubrik Puanlama ve PÇ Ulaşma Analizi (öğrenci bazında, puanlı)",
    "url": "https://drive.google.com/file/d/1upuRGhwuqngbDyjwlisruN6Nn0KjHQ7Y/view"
   },
   {
    "kod": "ET.K.3.12",
    "ad": "DÖÇ-PÇ Bağlantıları Matrisi (tüm dersler, satır bazında) — ölçüm sisteminin temeli",
    "url": "https://drive.google.com/file/d/1-kyplnvp395n1_P2EaebRPpJygTfGSpr/view"
   },
   {
    "kod": "ET.K.3.13",
    "ad": "Mesleki Uygulama Projesi (SOS156) Rubrik Ödev Örneği — öğrenci bazında PÇ eşlemeli değerlendirme",
    "url": "https://drive.google.com/file/d/1dORV5VYkvdDyxpUmmLFmdmzWNuvp8gUD/view"
   }
  ],
  "4": [
   {
    "kod": "ET.K.4.1",
    "ad": "Bölüm Kurulu Kararı (12.06.2026, 2026/04) — PÇ ve Yönetim Planının kabulü",
    "url": "https://drive.google.com/file/d/16Edlo37GiLB_0NNRkPlv9Qq3gA-67iXS/view"
   },
   {
    "kod": "ET.K.4.2",
    "ad": "Program Sürdürülebilir Yönetim Planı (PUKÖ döngüsü, ölçme-değerlendirme)",
    "url": "https://drive.google.com/file/d/1Unot4pdzVAoeld_NOfRB5SXYpYLqnkQP/view"
   },
   {
    "kod": "ET.K.4.3",
    "ad": "Ders-PÇ İlişki Matrisi",
    "url": "https://drive.google.com/file/d/1o4sIUuMnI-0eDLwJeeRxPMLoeg8V7lKI/view"
   },
   {
    "kod": "ET.K.4.4",
    "ad": "E-Ticaret Mevzuatı Dersi Ödev ve Puanlı Rubriki (Ürün Güvenliği Vaka Raporu)",
    "url": "https://drive.google.com/file/d/1PrvHs6UmyR6b5SNcXwj69Y1DAm48fInK/view"
   },
   {
    "kod": "ET.K.4.5",
    "ad": "TS EN ISO 9001 Kalite Yönetim Sistemi Bilgilendirme (SBMYO, 01.06.2026)",
    "url": "https://drive.google.com/file/d/1c3OEtFfrr56iOUAJelMrTOlIxeJcyc79/view"
   },
   {
    "kod": "ET.K.4.6",
    "ad": "Gaziantep Üniversitesi Eğitim-Öğretim Politikası",
    "url": "https://drive.google.com/file/d/1YkU5ZAC6nCQ1_Y0pKGYwL9-LVvIqOlsX/view"
   },
   {
    "kod": "ET.K.4.7",
    "ad": "Danışma Kurulu Toplantı Tutanağı (14.05.2026, 2026/01-DK)",
    "url": "https://drive.google.com/file/d/1RlgUWcydl6eRv6wVsLrLyS07vSNMLcYP/view"
   },
   {
    "kod": "ET.K.4.8",
    "ad": "İstişare Kurulu Toplantı Tutanağı (05.05.2026)",
    "url": "https://drive.google.com/file/d/1OwSVW6qr3topbHbcm3J98dlJ1NE-NbiT/view"
   },
   {
    "kod": "ET.K.4.9",
    "ad": "Dijital Sürekli İyileştirme Paneli (Dijitalleşme ve Yönetim Süreçlerinin Uyumlanması)",
    "url": "https://drive.google.com/file/d/1NqNJf7gcPxba4YYFrUrEpojFJGBP4S_y/view"
   },
   {
    "kod": "ET.K.4.10",
    "ad": "Personel Memnuniyet Anketi (Rektörlük yazısı, 25.02.2026)",
    "url": "https://drive.google.com/file/d/1TDw-US0p1bV6dIUXvt1iDi39wfgnQB9d/view"
   },
   {
    "kod": "ET.K.4.11",
    "ad": "ÇAP/Yandal Öğrenci Görüş Anketi",
    "url": "https://drive.google.com/file/d/1BGdV3YSf9hAdxA9-nxRpLH2VC9AcwuWt/view"
   },
   {
    "kod": "ET.K.4.12",
    "ad": "Akademik Danışman-Öğrenci Görüşme Formu (standart form)",
    "url": "https://drive.google.com/file/d/1-ZKOa0xAatVpuOizILzfY76VJ5ZoVxsh/view"
   },
   {
    "kod": "ET.K.4.13",
    "ad": "GAÜN Mezun Portalı / Mezun İzleme Sistemi",
    "url": "https://drive.google.com/file/d/1DWbsBAZx5COEOPwbv80SJjcPozovhAkj/view"
   },
   {
    "kod": "ET.K.4.14",
    "ad": "Mezun Anketleri (Rektörlük yazısı, 21.10.2025; Mezun Yeterlilik/Bilgi/İletişim)",
    "url": "https://drive.google.com/file/d/1S9ludDRWLfhmJ6U4d0Aft_691hKtw5cx/view"
   },
   {
    "kod": "ET.K.4.15",
    "ad": "E-Ticaret Mezunlar Listesi",
    "url": "https://drive.google.com/file/d/1UHTp2TnUL_DbEY1ufRi483kA8NXxC3Q0/view"
   },
   {
    "kod": "ET.K.4.16",
    "ad": "Mezun Etkinlik Duyurusu 2026",
    "url": "https://drive.google.com/file/d/1tzZk3NdckRCS5mE3sEKsKd_MkmEfz9P5/view"
   },
   {
    "kod": "ET.K.4.17",
    "ad": "GAÜN Kalite Geliştirme Koordinatörlüğü — Kurumsal Kalite Yönetim Sistemi",
    "url": "https://kalite.gaziantep.edu.tr/"
   },
   {
    "kod": "ET.K.4.18",
    "ad": "GAÜN Kalite Yönetim Sistemi — PUKÖ Döngüleri",
    "url": "https://kalite.gaziantep.edu.tr/pages.php?url=puko-donguleri-91"
   },
   {
    "kod": "ET.K.4.19",
    "ad": "GAÜN Stratejik Planı",
    "url": "http://strateji.gantep.edu.tr/page.php?url=stratejik-planlar-15"
   },
   {
    "kod": "ET.K.4.20",
    "ad": "GAÜN-PRD-05 Sürekli İyileştirme Prosedürü",
    "url": "https://kys.gantep.edu.tr/tr/DokumanYonetimi/Indir?TanimAdi=gaziantep_universitesi_surekli_iyilestirme_proseduru"
   },
   {
    "kod": "ET.K.4.21",
    "ad": "Danışma Kurulu Toplantı Tutanağı (26.06.2025, 2025/1) — sektör talepleri",
    "url": "https://drive.google.com/file/d/12i9C1c4jRD1M0pNqNMcKg9hFKtZNj8IG/view"
   },
   {
    "kod": "ET.K.4.22",
    "ad": "Müfredat Değişikliği — Yüksekokul Kurulu Kararı (04.06.2026, 07) ve program katalogları",
    "url": "https://drive.google.com/file/d/1j4wcc2Gi2mwyQHkw88pc_9cFyFvwU5lX/view"
   },
   {
    "kod": "ET.K.4.23",
    "ad": "Birim Eğitim Komisyonu (BEK) Kararı (Yönetim Kurulu, 19.11.2025, No.31)",
    "url": "https://drive.google.com/file/d/11QdTw8PIbpH240s5QFMi_oRNVppFqLlX/view"
   },
   {
    "kod": "ET.K.4.24",
    "ad": "Öğretim elemanı kadro ve ders görevlendirme talep yazıları",
    "url": "https://drive.google.com/file/d/1sYbpOFI3kSuFBUCc_qFrV_ub7SHR1kEK/view"
   },
   {
    "kod": "ET.K.4.25",
    "ad": "Dış Paydaş Yazılı Görüşü / Müfredat Tavsiye Mektubu (sektör temsilcisi, 14.05.2026)",
    "url": "https://drive.google.com/file/d/1wfW09dXjkfBRzUdZVXpKJek__kA5VK4Z/view"
   },
   {
    "kod": "ET.K.4.26",
    "ad": "Danışma Kurulu üyelerinin belirlenmesi ve güncellenmesine ilişkin yazı",
    "url": "https://drive.google.com/file/d/1LYDvW5DkVbWGqk24W12YBREv86HtdiPR/view"
   },
   {
    "kod": "ET.K.4.27",
    "ad": "2026 E-Ticaret ve Pazarlama Danışma Kurulu Üye Listesi",
    "url": "https://drive.google.com/file/d/1Ehkn8bb54CqKb0y24IxkLOQ_Fv0D3FBv/view"
   },
   {
    "kod": "ET.K.4.28",
    "ad": "Danışma Kurulu Toplantı Gündemi (Mayıs 2026)",
    "url": "https://drive.google.com/file/d/1vRgQkIcCul6IFOkLGntdWKKbDWHwI6LB/view"
   },
   {
    "kod": "ET.K.4.29",
    "ad": "Danışma Kurulu Davetiyesi",
    "url": "https://drive.google.com/file/d/190ScU6IoNOx60bYN8pmCuoxOO93QgLyz/view"
   },
   {
    "kod": "ET.K.4.30",
    "ad": "Danışma Kurulu Davet E-postası (kanıt)",
    "url": "https://drive.google.com/file/d/1rVpPhKna8FuIMx4BRhvk_TxtgPbzslsM/view"
   },
   {
    "kod": "ET.K.4.31",
    "ad": "Yüksekokul Kurulu Kararı (20.04.2026, No.05) — mezun takip sisteminin güçlendirilmesi",
    "url": "https://drive.google.com/file/d/1pI7YVIMuiDFqc9fKtEoV9HP0ZxnrBK3s/view"
   },
   {
    "kod": "ET.K.4.32",
    "ad": "Doldurulmuş akademik danışman-öğrenci görüşme formu örneği",
    "url": "https://drive.google.com/file/d/1YLIqkD-_kMREeyz5TgrBx4T3gF4d-s0q/view"
   },
   {
    "kod": "ET.K.4.33",
    "ad": "Mezun ve İşveren Anketi Program Düzeyi Değerlendirme Raporu (APG temelli)",
    "url": "https://drive.google.com/file/d/1NnjNOu_r81RjmUiP2PHNI4QrvL3Psd3_/view"
   },
   {
    "kod": "ET.K.4.34",
    "ad": "Sektör İşbirliği Niyet Beyanları (üç imzalı kuruluş: staj/İME, uzman katılımı, saha ziyaretleri, ortak çalışmalar)",
    "url": "https://drive.google.com/file/d/1icbmJxVy8XcXv0nup-pFg2PpW0I3pDvA/view"
   },
   {
    "kod": "ET.K.4.35",
    "ad": "Öğrenci Anketleri Değerlendirme Raporu (2025-2026 Güz: ders ve memnuniyet anketleri)",
    "url": "https://drive.google.com/file/d/1k3sJfKgVYCgl2ufQeXrp-74z0T2L9xLS/view"
   },
   {
    "kod": "ET.K.4.36",
    "ad": "Çift Anadal ve Yandal Görüş Anketi Değerlendirme Raporu",
    "url": "https://drive.google.com/file/d/1jfQV8bkBeHDyqLRnT8SjGIoHfo5RYVE5/view"
   },
   {
    "kod": "ET.K.4.37",
    "ad": "Müfredat Değişikliği (3+1 Zorunlu Geçiş) — Birim Eğitim Komisyonu (03.06.2026, K.02) ve Yüksekokul Kurulu (04.06.2026, K.07) Kararları ile Eğitim Koordinatörlüğüne Müdürlük Yazısı (16.06.2026)",
    "url": "https://drive.google.com/file/d/1NG3ibL-Do9YdyZ7V18pnZOb6w9SzuO_Y/view"
   }
  ],
  "5": [
   {
    "kod": "ET.K.5.1",
    "ad": "Öğretim Planı ve Ders Kataloğu (2026)",
    "url": "https://drive.google.com/file/d/125533OX9Bbv87W-TVSFfeXtdSFK8WUr9/view"
   },
   {
    "kod": "ET.K.5.2",
    "ad": "Ders-PÇ İlişki Matrisi (tüm dersler)",
    "url": "https://drive.google.com/file/d/1o4sIUuMnI-0eDLwJeeRxPMLoeg8V7lKI/view"
   },
   {
    "kod": "ET.K.5.3",
    "ad": "Ders Bilgi Paketleri (DÖÇ-PÇ ilişkisi; konsolide, mevcut sürüm)",
    "url": "https://drive.google.com/file/d/1jetygGkjooGPMIRVKHwfyW8fThViBPEf/view"
   },
   {
    "kod": "ET.K.5.4",
    "ad": "Müfredat Değişikliği — Yüksekokul Kurulu Kararı (04.06.2026, 07) ve kataloglar",
    "url": "https://drive.google.com/file/d/1j4wcc2Gi2mwyQHkw88pc_9cFyFvwU5lX/view"
   },
   {
    "kod": "ET.K.5.5",
    "ad": "Danışma Kurulu Toplantı Tutanağı (14.05.2026, 2026/01)",
    "url": "https://drive.google.com/file/d/1RlgUWcydl6eRv6wVsLrLyS07vSNMLcYP/view"
   },
   {
    "kod": "ET.K.5.6",
    "ad": "Danışma Kurulu Toplantı Tutanağı (26.06.2025, 2025/1)",
    "url": "https://drive.google.com/file/d/12i9C1c4jRD1M0pNqNMcKg9hFKtZNj8IG/view"
   },
   {
    "kod": "ET.K.5.7",
    "ad": "Dış Paydaş Yazılı Görüşü / Müfredat Tavsiye Mektubu",
    "url": "https://drive.google.com/file/d/1wfW09dXjkfBRzUdZVXpKJek__kA5VK4Z/view"
   },
   {
    "kod": "ET.K.5.8",
    "ad": "Program Sürdürülebilir Yönetim Planı",
    "url": "https://drive.google.com/file/d/1Unot4pdzVAoeld_NOfRB5SXYpYLqnkQP/view"
   },
   {
    "kod": "ET.K.5.9",
    "ad": "Birim Eğitim Komisyonu (BEK) Kararı (19.11.2025)",
    "url": "https://drive.google.com/file/d/11QdTw8PIbpH240s5QFMi_oRNVppFqLlX/view"
   },
   {
    "kod": "ET.K.5.10",
    "ad": "Bölüm Kurulu Kararı (12.06.2026, 2026/04)",
    "url": "https://drive.google.com/file/d/16Edlo37GiLB_0NNRkPlv9Qq3gA-67iXS/view"
   },
   {
    "kod": "ET.K.5.11",
    "ad": "Web sayfası ve Bologna Bilgi Sistemi (kamuoyu paylaşımı)",
    "url": "https://drive.google.com/file/d/1HbIOvuuDPN919dT54eDXcg7zl2oilC-F/view"
   },
   {
    "kod": "ET.K.5.12",
    "ad": "MEDEK Önlisans Program Ölçütleri v1.1 (KL-004)",
    "url": "https://drive.google.com/file/d/1EpubaUqwSIaU0wkkeMGgkXdmv3CjiczZ/view"
   },
   {
    "kod": "ET.K.5.13",
    "ad": "Bölüm Kurulu Kararı (01.06.2026, 2026/03) — Katalog Değişikliği ve Denklik",
    "url": "https://drive.google.com/file/d/1WBNf7YHFm1jAGCdqnAnDT9veL74EbdWQ/view"
   },
   {
    "kod": "ET.K.5.14",
    "ad": "Ders Bilgi Paketleri — AKTS öğrenci iş yükü (konsolide, mevcut sürüm)",
    "url": "https://drive.google.com/file/d/1jetygGkjooGPMIRVKHwfyW8fThViBPEf/view"
   },
   {
    "kod": "ET.K.5.15",
    "ad": "Yüksekokul Kurulu Kararı (20.04.2026, No.05) — 3+1 modeli ve MEDEK uyumlu katalog revizyonu",
    "url": "https://drive.google.com/file/d/1pI7YVIMuiDFqc9fKtEoV9HP0ZxnrBK3s/view"
   },
   {
    "kod": "ET.K.5.16",
    "ad": "Yüksekokul Kurulu Kararı (30.04.2026, No.06) — ders planı ve seçmeli ders yapısı",
    "url": "https://drive.google.com/file/d/10E5saI8rRe24ILds5-AxHV4HV5F10VD3/view"
   },
   {
    "kod": "ET.K.5.17",
    "ad": "Müfredat Değişikliği Hakkında Birim Eğitim Komisyonu (03.06.2026, K.02) ve Yüksekokul Kurulu (04.06.2026, K.07) Kararları ile Eğitim Koordinatörlüğüne Müdürlük Yazısı (16.06.2026)",
    "url": "https://drive.google.com/file/d/1NG3ibL-Do9YdyZ7V18pnZOb6w9SzuO_Y/view"
   }
  ],
  "6": [
   {
    "kod": "ET.K.6.1",
    "ad": "M. Yusuf Cinkara Özgeçmiş (YÖKSİS, fotoğraflı)",
    "url": "https://drive.google.com/file/d/1ekZaB9T8V5GdoYnbCEMrY4c0wivvrEE2/view"
   },
   {
    "kod": "ET.K.6.2",
    "ad": "Emre Gedikoğlu Özgeçmiş (YÖKSİS)",
    "url": "https://drive.google.com/file/d/1jDoAR2N7PoY-ERnfpAVnuv_7S5bXUyMl/view"
   },
   {
    "kod": "ET.K.6.3",
    "ad": "Bölüm Kurul Kararı (02.10.2025, 2025/08) ve Ders Dağılım Çizelgesi",
    "url": "https://drive.google.com/file/d/17sXZnpvtPZZ-79aQYg2jGUhXEhIbfM9H/view"
   },
   {
    "kod": "ET.K.6.4",
    "ad": "Ders Görevlendirme Talebi Yazısı — Yapay Zekâ Okuryazarlığı (10.02.2026)",
    "url": "https://drive.google.com/file/d/1Wo9rCDG1u6UQYaH4OoEbRPU6e0lTiFd3/view"
   },
   {
    "kod": "ET.K.6.5",
    "ad": "Öğretim elemanı kadro talep yazıları",
    "url": "https://drive.google.com/file/d/1sYbpOFI3kSuFBUCc_qFrV_ub7SHR1kEK/view"
   },
   {
    "kod": "ET.K.6.6",
    "ad": "Öğretim elemanı görev süresi uzatma yazısı",
    "url": "https://drive.google.com/file/d/1cTAQjnpL45O6GezBJJAC7izsi1UZ6xfn/view"
   },
   {
    "kod": "ET.K.6.7",
    "ad": "GAÜN 2026 Akademik Personel Gelişim ve Hizmet İçi Eğitim Planı",
    "url": "https://drive.google.com/file/d/1i5c5UQ3281IqFKwbLiJ1PpYc-JP3LeWC/view"
   },
   {
    "kod": "ET.K.6.8",
    "ad": "Eğiticilerin Eğitimi kapsamında alınan eğitimler listesi (SBMYO)",
    "url": "https://drive.google.com/file/d/1SU1nz5msTM8iQkrCdBFAq5L9p4w3wZZQ/view"
   },
   {
    "kod": "ET.K.6.9",
    "ad": "Kurum içi eğitim duyuru ve EBYS sevk yazısı (07.10.2025)",
    "url": "https://drive.google.com/file/d/1dyiiMgD4PSRwTdRa_gHQWqHwOwGA9jyA/view"
   },
   {
    "kod": "ET.K.6.10",
    "ad": "2547 sayılı Yükseköğretim Kanunu",
    "url": "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.2547.pdf"
   },
   {
    "kod": "ET.K.6.11",
    "ad": "Öğretim Üyesi Dışındaki Öğretim Elemanı Kadrolarına Atama Yönetmeliği",
    "url": "https://mevzuat.gov.tr/mevzuat?MevzuatNo=28947&MevzuatTur=7&MevzuatTertip=5"
   },
   {
    "kod": "ET.K.6.12",
    "ad": "Akademik Teşvik Ödeneği Yönetmeliği",
    "url": "https://www.mevzuat.gov.tr/MevzuatMetin/3.5.20158305.pdf"
   },
   {
    "kod": "ET.K.6.13",
    "ad": "M. Yusuf Cinkara hizmet içi eğitim sertifikaları",
    "url": "https://drive.google.com/drive/folders/1KPfS01bhO0opBMSaS3zvsNp5YOjGPSQx"
   },
   {
    "kod": "ET.K.6.14",
    "ad": "Emre Gedikoğlu hizmet içi eğitim sertifikaları",
    "url": "https://drive.google.com/drive/folders/1-RFN8b3oYOYt5D0HCHUvJPqqYv447V4N"
   },
   {
    "kod": "ET.K.6.15",
    "ad": "GAÜN Akademik Teşvik Ödeneği Başvuru Takvimi ve değerlendirme süreci",
    "url": "https://gatesis.gaziantep.edu.tr/blkl/Takvim.pdf"
   },
   {
    "kod": "ET.K.6.16",
    "ad": "Gaziantep Üniversitesi Bilim Ödülü Yönergesi",
    "url": "https://www.gaziantep.edu.tr/mevzuat/icerik.php?ID=448"
   },
   {
    "kod": "ET.K.6.17",
    "ad": "Gaziantep Üniversitesi Başarı ve Ödüllendirme Yönergesi (idari personel)",
    "url": "https://www.gaziantep.edu.tr/mevzuat/icerik.php?ID=701"
   },
   {
    "kod": "ET.K.6.18",
    "ad": "Cuma Ercan Özgeçmiş (YÖKSİS)",
    "url": "https://drive.google.com/file/d/1Qg7HvqBf3eaFQHWGrTPqlyQH3wEEHcBO/view"
   }
  ],
  "7": [
   {
    "kod": "ET.K.7.1",
    "ad": "SBMYO 2025 Yılı Birim Faaliyet Raporu (eğitim alanları, laboratuvarlar)",
    "url": "https://sbmyo.gaziantep.edu.tr/pages.php?url=faaliyet-raporlari-50"
   },
   {
    "kod": "ET.K.7.2",
    "ad": "GAÜN 2025 Yılı İdari Faaliyet Raporu (sosyal alanlar, kütüphane)",
    "url": "http://strateji.gantep.edu.tr/page.php?url=raporlar-8"
   },
   {
    "kod": "ET.K.7.3",
    "ad": "Temel İş Sağlığı ve Güvenliği Eğitim Belgesi",
    "url": "https://drive.google.com/file/d/1YJ5uXNje4Y0oVMVEcWL5Nb9cVt_rGss5/view"
   },
   {
    "kod": "ET.K.7.4",
    "ad": "İlk Yardım Eğitimi Belgesi",
    "url": "https://drive.google.com/file/d/1ZsAp71JbaQgeQPCJOhVRskCotrp0o_Ce/view"
   },
   {
    "kod": "ET.K.7.5",
    "ad": "Erişilebilirlik (Mavi Bayrak) — Engelli Erişim Ödülü",
    "url": "https://eob.gaziantep.edu.tr/pages.php?url=odullerimiz-12"
   },
   {
    "kod": "ET.K.7.6",
    "ad": "Engelli Öğrenci Birim Temsilcisi Görevlendirmesi",
    "url": "https://drive.google.com/file/d/1OgZib5fsyhM8UaRDEPppXCIc9kTIdrcz/view"
   },
   {
    "kod": "ET.K.7.7",
    "ad": "Engelli Öğrenci Birimi (üniversite genelinde çalışmalar)",
    "url": "https://eob.gaziantep.edu.tr/pages.php?url=universitenin-calismalari-4"
   },
   {
    "kod": "ET.K.7.8",
    "ad": "BİDB Fiziksel Yapı ve BİT olanakları",
    "url": "https://bidb.gaziantep.edu.tr/pages.php?url=fiziksel-yapi-4"
   },
   {
    "kod": "ET.K.7.9",
    "ad": "Yangın ve Afet Güvenliği Önlemleri — acil çıkış kapısı, yangın söndürme ekipmanı, yönlendirme tabelası (görseller)",
    "url": "https://drive.google.com/drive/folders/1RkOP6LzWQtyo3vxSCm1sHdPgQ3YbU_Ix"
   },
   {
    "kod": "ET.K.7.10",
    "ad": "Program Ders Dışı ve Sektör Etkinlikleri (Kariyer Fuarı, GAİB, Trendyol)",
    "url": "https://drive.google.com/drive/folders/1ablb8kJSi_efijB2FgXQE7lht3t1IkmH"
   },
   {
    "kod": "ET.K.7.11",
    "ad": "Sektör İşbirliği Niyet Beyanları (staj/İME, uzman katılımı, saha ziyaretleri, ortak çalışmalar)",
    "url": "https://drive.google.com/file/d/1icbmJxVy8XcXv0nup-pFg2PpW0I3pDvA/view"
   }
  ],
  "8": [
   {
    "kod": "ET.K.8.1",
    "ad": "SBMYO Yönetim/Organizasyon Şeması",
    "url": "https://drive.google.com/file/d/1qC_sAE_5ttzvVGdyw5DPlJCB9PZtb1Of/view"
   },
   {
    "kod": "ET.K.8.2",
    "ad": "2547 sayılı Yükseköğretim Kanunu",
    "url": "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.2547.pdf"
   },
   {
    "kod": "ET.K.8.3",
    "ad": "SBMYO Görev Tanımları (koordinatörlük, birim ve komisyonlar)",
    "url": "https://kalite.gaziantep.edu.tr/pages.php?url=gorev-tanimlari-31"
   },
   {
    "kod": "ET.K.8.4",
    "ad": "Öğretim Üyesi Dışındaki Öğretim Elemanı Kadrolarına Atama Yönetmeliği",
    "url": "https://mevzuat.gov.tr/mevzuat?MevzuatNo=28947&MevzuatTur=7&MevzuatTertip=5"
   },
   {
    "kod": "ET.K.8.5",
    "ad": "GAÜN 2026 Hizmet İçi Eğitim Planı / Öğrenme Yönetim Sistemi",
    "url": "https://oys22.gantep.edu.tr/course/view.php?id=12403"
   },
   {
    "kod": "ET.K.8.6",
    "ad": "SBMYO 2025 Yılı Birim Faaliyet Raporu (hesap verebilirlik/kalite)",
    "url": "https://sbmyo.gaziantep.edu.tr/pages.php?url=faaliyet-raporlari-50"
   },
   {
    "kod": "ET.K.8.7",
    "ad": "Program öğretim elemanları hizmet içi eğitim sertifikaları (Ölçüt 6 kanıt dizini)",
    "url": "https://drive.google.com/drive/folders/1KPfS01bhO0opBMSaS3zvsNp5YOjGPSQx"
   },
   {
    "kod": "ET.K.8.8",
    "ad": "Müdür Yardımcısı Görevlendirme Yazısı ve eki (Yüksekokul Sekreterliği)",
    "url": "https://drive.google.com/file/d/1KCgZhl7w7AE1xQ3lwp9ykF1xHvcKZ-AD/view"
   },
   {
    "kod": "ET.K.8.9",
    "ad": "Program Web Sayfası — Kamuoyu Bilgilendirme (E-Ticaret ve Pazarlama Programı)",
    "url": "https://sbmyopazarlama.gaziantep.edu.tr/pages.php?url=e-ticaret-ve-pazarlama-programi-hakkinda-36"
   }
  ],
  "9": [
   {
    "kod": "ET.K.9.1",
    "ad": "MEDEK Önlisans Program Ölçütleri v1.1 (KL-004) — programa özgü çıktılar",
    "url": "https://drive.google.com/file/d/1EpubaUqwSIaU0wkkeMGgkXdmv3CjiczZ/view"
   },
   {
    "kod": "ET.K.9.2",
    "ad": "Bölüm Kurulu Kararı (12.06.2026, 2026/04) — PÇ (Ek-1)",
    "url": "https://drive.google.com/file/d/16Edlo37GiLB_0NNRkPlv9Qq3gA-67iXS/view"
   },
   {
    "kod": "ET.K.9.3",
    "ad": "Ders-PÇ İlişki Matrisi",
    "url": "https://drive.google.com/file/d/1o4sIUuMnI-0eDLwJeeRxPMLoeg8V7lKI/view"
   },
   {
    "kod": "ET.K.9.4",
    "ad": "Öğretim Planı ve Ders Kataloğu (2026)",
    "url": "https://drive.google.com/file/d/125533OX9Bbv87W-TVSFfeXtdSFK8WUr9/view"
   },
   {
    "kod": "ET.K.9.5",
    "ad": "E-Ticaret Mevzuatı Dersi Ödev ve Puanlı Rubriki",
    "url": "https://drive.google.com/file/d/1PrvHs6UmyR6b5SNcXwj69Y1DAm48fInK/view"
   },
   {
    "kod": "ET.K.9.6",
    "ad": "Ders Bilgi Paketleri (DÖÇ-PÇ ilişkisi ve ölçme yöntemleri; konsolide, mevcut sürüm)",
    "url": "https://drive.google.com/file/d/1jetygGkjooGPMIRVKHwfyW8fThViBPEf/view"
   },
   {
    "kod": "ET.K.9.7",
    "ad": "Örnek Stajyer Dosyası (İş Yeri Eğitimi Defteri ve değerlendirme)",
    "url": "https://drive.google.com/file/d/1OzTgcSvBJMZXqklV9p0C6ghPtLhw9prO/view"
   },
   {
    "kod": "ET.K.9.8",
    "ad": "Staj Evrakları Kontrol Listesi (18.05.2026)",
    "url": "https://drive.google.com/file/d/1SMs-p312aHVogC0CJOYKBGVEicNtIRaU/view"
   },
   {
    "kod": "ET.K.9.9",
    "ad": "Sektör İşbirliği Niyet Beyanları (üç imzalı kuruluş: staj/İME, uzman katılımı, saha ziyaretleri, ortak çalışmalar)",
    "url": "https://drive.google.com/file/d/1icbmJxVy8XcXv0nup-pFg2PpW0I3pDvA/view"
   },
   {
    "kod": "ET.K.9.10",
    "ad": "Staj Protokolleri Listesi (sektör kuruluşları)",
    "url": "https://drive.google.com/file/d/1VYvNQavkFDl9p8uHaeGhFNVSWLgk4XXC/view"
   },
   {
    "kod": "ET.K.9.11",
    "ad": "İşyerinde Mesleki Eğitim ve Staj Protokol Örnekleri (Migros vb. — sektörel çeşitlilik)",
    "url": "https://drive.google.com/file/d/1O6SY2vpNBOeZdKw4bA9kxbfcbmHN3X85/view"
   }
  ]
 }
};

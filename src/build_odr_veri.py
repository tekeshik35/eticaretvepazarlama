import json,re
T=json.load(open('tables.json')); K=json.load(open('kanitlar.json'))
def rows(i): return T[str(i)][1:]
pc=[{'kod':r[0],'metin':r[1],'duzlem':r[2]} for r in rows(14)]
pea=[{'kod':r[0],'baslik':r[1],'tanim':r[2]} for r in rows(7)]
apg_hesap={r[0]:{'anket':r[1],'boyut':r[2],'hesaplama':r[3]} for r in rows(10)}
def hedef(s):
    m=re.search(r'([\d.,]+)',s); v=float(m.group(1).replace(',','.'))
    return {'metin':s,'deger':v,'birim':'%' if '%' in s else '/5'}
apg=[dict(kod=r[0],gosterge=re.sub(r'\s*\(PEA-\d\)','',r[1]),pea=re.search(r'PEA-\d',r[1]).group(0),veriKaynagi=r[2],hedef=hedef(r[3]),**apg_hesap[r[0]]) for r in rows(8)]
pea_pc={r[0]:{'PEA-%d'%(j+1):r[2+j] for j in range(4)} for r in rows(15)}
pea_ders={r[0].split(' ')[0]:r[1] for r in rows(9)}
def ders(r,donem,kat=None):
    x=dict(kod=r[0],ad=r[1],tip=r[2],t=r[3],u=r[4],k=r[5],akts=int(r[6]) if r[6].isdigit() else 0,donem=donem)
    if kat: x['kategori']=kat
    return x
mufredat=[]
for i,d in [(24,1),(25,2),(26,3),(27,4)]:
    for r in rows(i):
        if r[1].startswith('Yarıyıl Toplamı'): continue
        x=ders(r,d)
        if r[0]=='—': x['kod']=None; x['slot']=True
        mufredat.append(x)
havuz=[ders(r,3,'MAS') for r in rows(28)]+[ders(r,2,'GS') for r in rows(29)]+[ders(r,1,'GOS') for r in rows(30)]
mat={}
for i in (32,33,34):
    for r in rows(i):
        if r[0]=='—': continue
        kod='SOS210' if r[0]=='SOZ210' else r[0]
        mat[kod]={m[0]:int(m[1]) for m in re.findall(r'(PÇ\d+)\((\d)\)',r[3])}
dispaydas=[{'ders':r[0],'akts':int(r[1]),'dayanak':r[2]} for r in rows(31) if r[0]!='Toplam']
poc_dersler=[{'ders':r[0],'akts':int(r[1]),'pc':r[2]} for r in rows(23) if r[0]!='Toplam']
mekanizma=[{'ad':r[0],'paydas':r[1],'siklik':r[2],'kanit':r[3]} for r in rows(20)]
dongu=[{'girdi':r[0],'cikti':r[1],'kanit':r[2]} for r in rows(21)]
dk=[{'ad':r[0],'kurum':r[1],'gorev':r[2],'kategori':r[3]} for r in rows(11)]
kanit={}
for k,v in K.items(): kanit.setdefault(k.split('.')[2],[]).append({'kod':k,'ad':v['ad'],'url':v['url']})
for o in kanit: kanit[o].sort(key=lambda z:int(z['kod'].split('.')[3]))
out={'PC':pc,'PEA':pea,'APG':apg,'PEA_PC':pea_pc,'PEA_DERS':pea_ders,'MUFREDAT':mufredat,'HAVUZ':havuz,'DERS_PC':mat,'DIS_PAYDAS_DERS':dispaydas,'POC_DERSLER':poc_dersler,'MEKANIZMA':mekanizma,'DONGU_ORNEK':dongu,'DANISMA_KURULU':dk,'KANIT':kanit}
js="/* ÖDR 2026 (30.06.2026, MEDEK'e sunulan nihai rapor) kaynaklı veriler — build_odr_veri.py ile üretildi. */\nwindow.ODR = "+json.dumps(out,ensure_ascii=False,indent=1)+";\n"
open('/home/claude/eticaretvepazarlama/src/odr-veri.js','w').write(js)
tot=sum(d['akts'] for d in mufredat); print('mufredat',len(mufredat),'akts',tot,'havuz',len(havuz),'mat',len(mat),'kanit',sum(len(v) for v in kanit.values()))
print('no matrix:',[d['kod'] for d in mufredat+havuz if d.get('kod') and d['kod'] not in mat])
print(pea_ders.keys())

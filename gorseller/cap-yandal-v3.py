import sys
H=int(sys.argv[1]); out=sys.argv[2]
S=600 if H==675 else 560
html=f'''<!doctype html><html><head><meta charset="utf-8"><style>
*{{box-sizing:border-box;margin:0;padding:0}}
body{{width:1200px;height:{H}px;font-family:"DejaVu Sans",Arial,sans-serif;color:#fff;position:relative;overflow:hidden;
background:radial-gradient(circle at 78% 50%,#2a3f7a 0%,#152452 38%,#0b1531 75%);}}
.deco1{{position:absolute;left:-120px;bottom:-160px;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,#c0262d55,transparent 70%)}}
.deco2{{position:absolute;right:-80px;top:-120px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,#f5a62333,transparent 70%)}}
.grid{{position:absolute;inset:0;background-image:radial-gradient(#ffffff14 1.2px,transparent 1.2px);background-size:26px 26px}}
.ust{{position:absolute;left:56px;top:{38 if H==600 else 46}px;z-index:2}}
.kurum{{font-size:13px;letter-spacing:1.6px;color:#aab6d6;font-weight:700}}
.prog{{display:inline-block;margin-top:12px;background:linear-gradient(90deg,#d42f36,#f0782e);color:#fff;font-size:24px;font-weight:800;padding:9px 18px;border-radius:8px;letter-spacing:.4px;box-shadow:0 8px 24px #d42f3666}}
h1{{font-size:{44 if H==675 else 41}px;line-height:1.08;margin-top:{20 if H==675 else 16}px;font-weight:800}}
h1 span{{color:#ffb547}}
.alt{{font-size:18px;margin-top:14px;color:#d3dbf0;max-width:440px;line-height:1.45}}
.kart{{position:absolute;left:56px;bottom:{50 if H==675 else 44}px;display:flex;gap:14px;z-index:2}}
.e{{background:#ffffff12;border:1.5px solid #ffffff38;border-radius:12px;padding:13px 16px;font-size:15px;line-height:1.38;width:208px;color:#e3e8f6}}
.e b{{display:block;font-size:19px;margin-bottom:4px}}
.e:nth-child(1) b{{color:#ffb547}} .e:nth-child(2) b{{color:#ff8a6b}}
.not{{position:absolute;left:56px;bottom:{18 if H==675 else 15}px;font-size:12.5px;color:#9fabcb;z-index:2}}
svg{{position:absolute;right:{22 if H==675 else 30}px;top:{(H-S)//2}px}}
</style></head><body>
<div class="grid"></div><div class="deco1"></div><div class="deco2"></div>
<div class="ust">
 <div class="kurum">GAZİANTEP ÜNİVERSİTESİ · SBMYO · PAZARLAMA VE REKLAMCILIK BÖLÜMÜ</div>
 <div class="prog">E-TİCARET VE PAZARLAMA PROGRAMI</div>
 <h1>Çift Ana Dal ve<br><span>Yan Dal</span> Olanağı</h1>
 <p class="alt">Programımız öğrencileri, Yüksekokulumuzdaki yedi programda çift ana dal veya yan dal yapabilecek.</p>
</div>
<div class="kart">
 <div class="e"><b>Yan Dal</b>Başka bir programdan seçili derslerle ikinci bir alanda bilgi edin.</div>
 <div class="e"><b>Çift Ana Dal</b>İkinci bir programın ders planındaki dersleri tamamla.</div>
</div>
<div class="not">Ders listeleri ve uygulama esasları bölüm web sayfasında · Başvuru tarihleri ilgili birimlerce duyurulacaktır.</div>
<svg width="{S}" height="{S}" viewBox="0 0 640 640" font-family="DejaVu Sans, Arial">
 <defs>
  <radialGradient id="m" cx="40%" cy="35%"><stop offset="0" stop-color="#f0782e"/><stop offset="1" stop-color="#c0262d"/></radialGradient>
  <filter id="gl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18"/></filter>
 </defs>
 <circle cx="320" cy="320" r="232" fill="none" stroke="#ffffff22" stroke-width="2"/>
 <g id="hat" stroke="#ffb547" stroke-width="2.5" stroke-dasharray="3 9" stroke-linecap="round" opacity=".85"></g>
 <circle cx="320" cy="320" r="120" fill="#e0482f" filter="url(#gl)" opacity=".55"/>
 <circle cx="320" cy="320" r="112" fill="url(#m)"/>
 <circle cx="320" cy="320" r="112" fill="none" stroke="#ffffff55" stroke-width="2"/>
 <text x="320" y="306" fill="#fff" font-size="23" font-weight="700" text-anchor="middle">E-Ticaret ve</text>
 <text x="320" y="336" fill="#fff" font-size="23" font-weight="700" text-anchor="middle">Pazarlama</text>
 <text x="320" y="362" fill="#ffe3cf" font-size="15" text-anchor="middle">Programı</text>
 <g id="dugum"></g>
</svg>
<script>
const P=[["İşletme","Yönetimi"],["Lojistik"],["Dış","Ticaret"],["Muhasebe ve","Vergi Uyg."],["Bankacılık ve","Sigortacılık"],["Büro Yönetimi ve","Yön. Asistanlığı"],["Çağrı Merkezi","Hizmetleri"]];
const ns="http://www.w3.org/2000/svg",cx=320,cy=320,R=232,r=72;
const hat=document.getElementById('hat'),dg=document.getElementById('dugum');
P.forEach((p,i)=>{{const a=-Math.PI/2+i*2*Math.PI/P.length;const x=cx+R*Math.cos(a),y=cy+R*Math.sin(a);
 const l=document.createElementNS(ns,'line');l.setAttribute('x1',cx+118*Math.cos(a));l.setAttribute('y1',cy+118*Math.sin(a));l.setAttribute('x2',x-(r+4)*Math.cos(a));l.setAttribute('y2',y-(r+4)*Math.sin(a));hat.appendChild(l);
 const c=document.createElementNS(ns,'circle');c.setAttribute('cx',x);c.setAttribute('cy',y);c.setAttribute('r',r);c.setAttribute('fill','#ffffff');c.setAttribute('stroke','#ffb547');c.setAttribute('stroke-width','4');dg.appendChild(c);
 p.forEach((s,j)=>{{const t=document.createElementNS(ns,'text');t.setAttribute('x',x);t.setAttribute('y',y+(j-(p.length-1)/2)*20+6);t.setAttribute('text-anchor','middle');t.setAttribute('font-size',s.length>13?'14':'16');t.setAttribute('font-weight','700');t.setAttribute('fill','#152452');t.textContent=s;dg.appendChild(t)}});
}});
</script></body></html>'''
open(out,'w',encoding='utf8').write(html)

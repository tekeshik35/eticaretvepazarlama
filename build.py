#!/usr/bin/env python3
"""index.html'i kaynaklardan üretir.
   src/shell.html   : HTML iskeleti (Firebase init, CDN'ler, stiller)
   src/odr-veri.js  : ÖDR 2026 verileri (window.ODR)
   src/moduller.jsx : ÖDR/Yönetim Planı uyum modülleri (JSX → Babel)
   src/app.js       : panelin ana uygulaması (derlenmiş React kodu)
Kullanım: python3 build.py   (Babel için: npx babel --presets @babel/preset-react)"""
import subprocess, sys, pathlib, os
k = pathlib.Path(__file__).parent
babel = os.environ.get("BABEL", "npx babel")
esbuild = os.environ.get("ESBUILD", "npx esbuild")
def kucult(kod):
    # Yalnızca boşlukları sıkıştırır (isimler korunur); esbuild yoksa olduğu gibi bırakır.
    r = subprocess.run(f"{esbuild} --minify-whitespace --loader=js --charset=utf8", shell=True, input=kod, capture_output=True, text=True)
    return r.stdout if r.returncode == 0 and r.stdout.strip() else kod
jsx = subprocess.run(f'{babel} --presets @babel/preset-react --no-babelrc "{k/"src/moduller.jsx"}"', shell=True, capture_output=True, text=True)
if jsx.returncode: sys.exit(jsx.stderr)
veri = (k/"src/odr-veri.js").read_text(encoding="utf-8") + "\n" + (k/"src/katalog-2026.js").read_text(encoding="utf-8")
app = (k/"src/app.js").read_text(encoding="utf-8")
shell = (k/"src/shell.html").read_text(encoding="utf-8")
jsx_kod = kucult(jsx.stdout)
app = kucult(app)
for x in (veri, jsx_kod, app): assert "</script" not in x.lower()
out = shell.replace("<!--__ODR_MODULLER__-->", "<script>\n" + veri + "\n</script>\n  <script>\n" + jsx_kod + "\n</script>").replace("/*__APP__*/", app)
(k/"index.html").write_text(out, encoding="utf-8")
print("index.html", len(out.encode()), "bayt")

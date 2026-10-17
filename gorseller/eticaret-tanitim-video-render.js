const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1200,height:600}});
await p.goto('file://'+__dirname+'/video.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
const fps=24;require('fs').rmSync('fr',{recursive:true,force:true});require('fs').mkdirSync('fr');let i=0;
const shot=async()=>{await p.screenshot({path:`fr/${String(i++).padStart(4,'0')}.png`})};
for(let k=0;k<48;k++){await p.evaluate(([k])=>{render(3.4);hint(k<36?1:1-(k-36)/12)},[k]);await shot();}
for(let t=3.4;t<=19.5;t+=1/fps){await p.evaluate(t=>{hint(0);render(t)},t);await shot();}
await b.close();console.log(i);})();

import numpy as np, wave
sr=44100; bpm=96; beat=60/bpm; bar=4*beat; D=20.0; N=int(sr*D)
t=np.arange(N)/sr; out=np.zeros((N,2))
def hz(m): return 440*2**((m-69)/12)
prog=[[48,55,60,64],[45,52,57,60],[41,48,53,57],[43,50,55,59]]  # C Am F G
rng=np.random.default_rng(7)
def add(sig,start,pan=0.0):
    i=int(start*sr); j=min(N,i+len(sig)); 
    if i>=N: return
    s=sig[:j-i]; out[i:j,0]+=s*(1-pan)/1.0; out[i:j,1]+=s*(1+pan)/1.0
def env(n,a,r):
    e=np.ones(n); na=int(a*sr); nr=int(r*sr)
    e[:na]=np.linspace(0,1,na); e[-nr:]*=np.linspace(1,0,nr); return e
# pad
for b in range(8):
    ch=prog[b%4]; L=bar+0.6; n=int(L*sr); tt=np.arange(n)/sr; s=np.zeros(n)
    for m in ch[1:]:
        for d in (-0.07,0.07):
            f=hz(m+12)*(1+d/100*3)
            s+=sum(np.sin(2*np.pi*f*k*tt+rng.random()*6)/(k**1.6) for k in range(1,6))
    s*=env(n,0.8,0.9)*0.035
    add(s,b*bar,pan=0.0)
# bass
for b in range(8):
    root=prog[b%4][0]-12
    for q in range(4):
        if q in (0,2):
            n=int(beat*1.8*sr); tt=np.arange(n)/sr
            s=(np.sin(2*np.pi*hz(root)*tt)+0.25*np.sin(4*np.pi*hz(root)*tt))*np.exp(-tt*2.2)*env(n,0.01,0.1)*0.16
            add(s,b*bar+q*beat)
# arp (from bar 2)
pat=[0,1,2,3,2,1,2,3]
for b in range(1,8):
    ch=prog[b%4]; 
    for k in range(8):
        m=ch[pat[k]]+24; n=int(0.9*sr); tt=np.arange(n)/sr
        s=(np.sin(2*np.pi*hz(m)*tt)+0.3*np.sin(4*np.pi*hz(m)*tt)*np.exp(-tt*8))*np.exp(-tt*5)*env(n,0.005,0.05)*0.07
        add(s,b*bar+k*beat/2,pan=0.35 if k%2 else -0.35)
# soft kick + hat (from bar 3)
for b in range(2,8):
    for q in range(4):
        st=b*bar+q*beat
        if q in (0,2):
            n=int(0.35*sr); tt=np.arange(n)/sr; f=50+70*np.exp(-tt*30)
            s=np.sin(2*np.pi*np.cumsum(f)/sr)*np.exp(-tt*9)*0.22; add(s,st)
        if b>=4:
            n=int(0.06*sr); s=rng.standard_normal(n); s=np.diff(np.concatenate([[0],s]))*np.exp(-np.arange(n)/sr*70)*0.025
            add(s,st+beat/2,pan=0.2)
# reverb
ir_n=int(1.6*sr); ir=rng.standard_normal(ir_n)*np.exp(-np.arange(ir_n)/sr*3.2); ir/=np.abs(ir).sum()/6
from numpy.fft import rfft,irfft
L=N+ir_n; F=1<<int(np.ceil(np.log2(L)))
for c in range(2):
    wet=irfft(rfft(out[:,c],F)*rfft(ir,F),F)[:N]
    out[:,c]=out[:,c]*0.8+wet*0.35
# fades
fi=int(0.4*sr); fo=int(1.2*sr)
out[:fi]*=np.linspace(0,1,fi)[:,None]; out[-fo:]*=np.linspace(1,0,fo)[:,None]
out/=np.abs(out).max()/0.85
w=wave.open('muzik.wav','wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr)
w.writeframes((out*32767).astype('<i2').tobytes()); w.close(); print('ok')

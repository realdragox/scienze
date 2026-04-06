import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const rows = [
  { cat: 'Respirazione', fish: 'Branchie (sempre)', amp: 'Polmoni + Pelle (adulti)', fishC: '#00b4d8', ampC: '#66ff88' },
  { cat: 'Ambiente', fish: 'Solo acquatico', amp: 'Acqua + Terra', fishC: '#00b4d8', ampC: '#66ff88' },
  { cat: 'Pelle', fish: 'Squame impermeabili', amp: 'Umida e permeabile', fishC: '#00b4d8', ampC: '#66ff88' },
  { cat: 'Sviluppo', fish: 'Diretto (larve di pesce)', amp: 'Metamorfosi radicale', fishC: '#00b4d8', ampC: '#66ff88' },
  { cat: 'Riproduzione', fish: 'Per lo più ovipari', amp: 'Ovipari con uova in acqua', fishC: '#00b4d8', ampC: '#66ff88' },
  { cat: 'Termoregol.', fish: 'Ectotermi passivi', amp: 'Ectotermi + letargo', fishC: '#00b4d8', ampC: '#66ff88' },
];

export default function Slide09_Differenze() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.s09-head', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo('.s09-row', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.4 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="w-full h-full flex flex-col items-center justify-center px-4 max-w-4xl mx-auto">
      <div className="s09-head text-center mb-5">
        <div className="text-xs tracking-[0.3em] uppercase mb-1" style={{ color: 'rgba(150,200,255,0.7)' }}>Capitolo VIII</div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white">Pesci vs Anfibi</h2>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-3 gap-3 w-full mb-3">
        <div className="text-center">
          <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border"
                style={{ color: '#00b4d8', borderColor: '#00b4d830', background: '#00b4d815' }}>🐠 Pesci</span>
        </div>
        <div className="text-center">
          <span className="text-xs font-black uppercase tracking-widest text-white/30">Caratteristica</span>
        </div>
        <div className="text-center">
          <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border"
                style={{ color: '#66ff88', borderColor: '#66ff8830', background: '#66ff8815' }}>🐸 Anfibi</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        {rows.map((r, i) => (
          <div key={i} className="s09-row grid grid-cols-3 gap-3 items-center py-2.5 px-3 rounded-xl border hover:scale-[1.01] transition-transform duration-200"
               style={{ background: 'rgba(0,10,30,0.6)', backdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.07)' }}>
            <div className="text-xs font-semibold text-right" style={{ color: '#4dcfff' }}>{r.fish}</div>
            <div className="text-center">
              <span className="text-[10px] uppercase tracking-wider text-white/35">{r.cat}</span>
            </div>
            <div className="text-xs font-semibold text-left" style={{ color: '#66ff88' }}>{r.amp}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

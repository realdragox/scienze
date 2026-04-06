import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import frogLifecycle from '@/assets/images/frog-lifecycle.png';

const STAGES = [
  { n: '1', label: 'Uova', desc: 'Deposte in acqua in masse gelatinose. Fino a 20.000 per femmina.', c: '#66ff88' },
  { n: '2', label: 'Girino', desc: 'Nasce con coda e branchie, vive in acqua. Si nutre di alghe.', c: '#44cc88' },
  { n: '3', label: 'Metamorfosi', desc: 'Straordinaria trasformazione: arti, riassorbimento della coda, polmoni.', c: '#22aa66' },
  { n: '4', label: 'Giovane', desc: 'Struttura adulta ma in maturazione. Inizia la vita anfibica.', c: '#119944' },
  { n: '5', label: 'Adulto', desc: 'Pienamente maturo. Vive a terra ma torna in acqua per riprodursi.', c: '#008833' },
];

export default function Slide07_CicloVitale() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.s07-head', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo('.s07-img', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, delay: 0.2 });
      gsap.fromTo('.s07-stage', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'power2.out', delay: 0.4 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="w-full h-full flex flex-col items-center justify-center px-4 max-w-4xl mx-auto">
      <div className="s07-head text-center mb-4">
        <div className="text-xs tracking-[0.3em] uppercase mb-1" style={{ color: '#66ff88' }}>Capitolo VI</div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white">Il Ciclo della Vita</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full items-start">
        <div className="s07-img rounded-2xl overflow-hidden border shrink-0 w-full sm:w-48"
             style={{ borderColor: 'rgba(100,255,100,0.2)' }}>
          <img src={frogLifecycle} alt="Ciclo vitale" className="w-full object-cover" style={{ height: '200px' }} />
        </div>

        <div className="flex-1 flex flex-col gap-2">
          {STAGES.map((s, i) => (
            <div key={i} className="s07-stage flex items-start gap-3 p-3 rounded-xl border transition-all duration-300 hover:scale-[1.01]"
                 style={{ background: 'rgba(0,18,8,0.75)', backdropFilter: 'blur(12px)', borderColor: `${s.c}25` }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-black"
                   style={{ background: `${s.c}20`, color: s.c, border: `2px solid ${s.c}40` }}>{s.n}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold mb-0.5" style={{ color: s.c }}>{s.label}</div>
                <p className="text-white/55 text-xs leading-snug">{s.desc}</p>
              </div>
            </div>
          ))}
          <div className="text-center mt-1">
            <span className="text-[10px] text-white/25 tracking-widest">&#x21A9; ciclo continuo con la riproduzione</span>
          </div>
        </div>
      </div>
    </div>
  );
}

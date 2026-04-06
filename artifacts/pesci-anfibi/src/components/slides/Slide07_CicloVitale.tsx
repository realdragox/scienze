import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import frogLifecycle from '@/assets/images/frog-lifecycle.png';

const stages = [
  { label: 'Uova', icon: '●●●', desc: 'Deposte in acqua, gelatinose e aggregate in masse. Ogni femmina può depositare fino a 20.000 uova.', color: '#88ff88' },
  { label: 'Larva / Girino', icon: ')', desc: 'Il girino nasce con coda e branchie, vive completamente in acqua. Si nutre di alghe.', color: '#44cc88' },
  { label: 'Metamorfosi', icon: '◐', desc: 'Straordinaria trasformazione: spuntano gli arti, la coda si riassorbe, si sviluppano polmoni.', color: '#00aa66' },
  { label: 'Anfibio Giovane', icon: '△', desc: 'Rana giovane con struttura adulta ma ancora in maturazione. Può vivere sia in acqua che a terra.', color: '#008844' },
  { label: 'Adulto', icon: '◉', desc: 'Rana adulta pienamente matura, capace di riproduzione. Vive prevalentemente a terra ma torna in acqua per riprodursi.', color: '#006633' },
];

export default function Slide07_CicloVitale() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.s07-title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from('.s07-img', { scale: 0.8, opacity: 0, duration: 1, delay: 0.3 });
      gsap.from('.s07-stage', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        delay: 0.5
      });
      gsap.from('.s07-arrow', { opacity: 0, duration: 0.3, stagger: 0.2, delay: 1.5 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto flex flex-col items-center px-4">
      <div className="s07-title text-xs md:text-sm tracking-[0.3em] uppercase mb-2 text-center" style={{ color: '#88ff88' }}>Capitolo VI</div>
      <h2 className="s07-title text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 text-center"
          style={{ textShadow: '0 0 40px rgba(100,255,100,0.3)' }}>
        Il Ciclo della Vita
      </h2>

      <div className="flex flex-col md:flex-row gap-8 w-full items-center">
        {/* Image */}
        <div className="s07-img w-full md:w-64 rounded-2xl overflow-hidden border shrink-0"
             style={{ borderColor: 'rgba(100,255,100,0.2)' }}>
          <img src={frogLifecycle} alt="Ciclo vitale rana" className="w-full h-48 md:h-64 object-cover" />
        </div>

        {/* Stages */}
        <div className="flex-1 flex flex-col gap-3">
          {stages.map((stage, i) => (
            <React.Fragment key={i}>
              <div className="s07-stage flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02]"
                   style={{ background: 'rgba(0,20,10,0.7)', backdropFilter: 'blur(12px)', borderColor: `${stage.color}33` }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-lg"
                     style={{ background: `${stage.color}22`, color: stage.color, border: `2px solid ${stage.color}44` }}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-white text-sm mb-1" style={{ color: stage.color }}>{stage.label}</div>
                  <p className="text-white/60 text-xs leading-relaxed">{stage.desc}</p>
                </div>
              </div>
              {i < stages.length - 1 && (
                <div className="s07-arrow flex items-center justify-center">
                  <svg className="w-4 h-4" style={{ color: '#44cc8844' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
          
          {/* Loop arrow */}
          <div className="s07-arrow text-center">
            <span className="text-xs text-white/30 tracking-widest">&#x21A9; ritorna all'inizio con la riproduzione</span>
          </div>
        </div>
      </div>
    </div>
  );
}

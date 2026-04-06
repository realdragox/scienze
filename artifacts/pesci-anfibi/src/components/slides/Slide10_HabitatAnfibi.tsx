import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import amphibianOverview from '@/assets/images/amphibian-overview.png';

const HABITATS = [
  { name: 'Paludi Tropicali', accent: '#44ff88', desc: 'Biodiversità estrema. Le foreste pluviali ospitano il 90% delle specie di anfibi, tra rane arboricole, veleno-freccette e cecilie rare.', specie: 'Rana Arboricola · Dendrobate · Cecilia' },
  { name: 'Stagni Temperati', accent: '#88ddaa', desc: 'Habitat classico delle rane europee. Fondamentali per la riproduzione in primavera. La loro scomparsa è uno dei principali indicatori ambientali.', specie: 'Rana Temporaria · Rospo Comune · Tritone' },
  { name: 'Fiumi Montani', accent: '#aaffcc', desc: 'Acque fredde e ossigenate dove vivono salamandre giganti e tritoni. Le temperature basse rallentano il metabolismo ma garantiscono longevità.', specie: 'Salamandra Alpina · Tritone Alpestre' },
  { name: 'Zone Aride', accent: '#ccff88', desc: 'Anfibi nel deserto: impensabile, ma vero. Alcune specie si ibernano sottoterra per anni, attendendo le rare piogge per riprodursi in pochi giorni.', specie: 'Scafiopus · Rana Acqua di Budgett' },
];

export default function Slide10_HabitatAnfibi() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.s10-head', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });
      gsap.fromTo('.s10-tab', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3 });
      gsap.fromTo('.s10-body', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.7 });
    }, ref);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (bodyRef.current) gsap.fromTo(bodyRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35 });
  }, [active]);

  const h = HABITATS[active];
  return (
    <div ref={ref} className="w-full h-full flex flex-col items-center justify-center px-4 max-w-4xl mx-auto">
      <div className="s10-head text-center mb-4">
        <div className="text-xs tracking-[0.3em] uppercase mb-1" style={{ color: '#66ff88' }}>Capitolo IX</div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white">Habitat degli Anfibi</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-5">
        {HABITATS.map((hab, i) => (
          <button key={i} onClick={() => setActive(i)}
            className="s10-tab px-3 py-2 rounded-full text-xs font-semibold border transition-all duration-300"
            style={{
              background: active === i ? `${hab.accent}20` : 'rgba(0,0,0,0.35)',
              borderColor: active === i ? `${hab.accent}70` : 'rgba(255,255,255,0.12)',
              color: active === i ? '#fff' : 'rgba(255,255,255,0.5)',
              boxShadow: active === i ? `0 0 16px ${hab.accent}30` : 'none',
              transform: active === i ? 'scale(1.05)' : 'scale(1)'
            }}>
            {hab.name}
          </button>
        ))}
      </div>

      <div ref={bodyRef} className="s10-body w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: `${h.accent}30` }}>
          <div className="relative">
            <img src={amphibianOverview} alt="Habitat" className="w-full object-cover" style={{ height: '160px', filter: `hue-rotate(${active * 30}deg) saturate(1.2)` }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,10,5,0.8) 0%, transparent 60%)' }} />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3 p-4 rounded-2xl border"
             style={{ background: 'rgba(0,18,8,0.8)', backdropFilter: 'blur(14px)', borderColor: `${h.accent}25` }}>
          <h3 className="text-xl font-black" style={{ color: h.accent }}>{h.name}</h3>
          <p className="text-white/65 text-sm leading-relaxed">{h.desc}</p>
          <div className="border-t border-white/10 pt-3">
            <div className="text-[10px] uppercase tracking-widest text-white/35 mb-1">Specie tipiche</div>
            <div className="text-xs text-white/55 italic">{h.specie}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

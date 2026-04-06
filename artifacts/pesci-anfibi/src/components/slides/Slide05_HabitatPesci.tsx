import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import fishHabitats from '@/assets/images/fish-habitats.png';

const HABITATS = [
  { name: 'Oceano Profondo', zone: '200m–11km', accent: '#4444ff', desc: 'Oscurità totale, pressioni enormi, temperature vicine allo zero. Specie bioluminescenti e predatori abissali adattati all\'estremo.', fauna: 'Rana Pescatrice · Pesce Palla · Calamaro Gigante' },
  { name: 'Barriera Corallina', zone: '0–50m', accent: '#00cc88', desc: 'La foresta tropicale del mare. Biodiversità esplosiva dove milioni di specie condividono microhabitat in simbiosi perfetta.', fauna: 'Pesce Clown · Pesce Chirurgo · Murena · Barracuda' },
  { name: 'Acque Dolci', zone: 'Fiumi & Laghi', accent: '#44bb44', desc: 'Il 40% di tutte le specie ittiche vive qui, pur coprendo solo l\'1% della superficie terrestre. Ecosistemi fragili e preziosi.', fauna: 'Trota · Luccio · Carpa · Piranha' },
  { name: 'Zone Polari', zone: 'Artide & Antartide', accent: '#88ccff', desc: 'Acque gelide ricche di nutrienti. I pesci producono proteine anticongelanti per sopravvivere sotto il ghiaccio.', fauna: 'Nototenioidi · Merlano Polare · Boreogadus' },
];

export default function Slide05_HabitatPesci() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.s05-head', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo('.s05-tab', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3 });
      gsap.fromTo('.s05-body', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.7 });
    }, ref);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (bodyRef.current) gsap.fromTo(bodyRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35 });
  }, [active]);

  const h = HABITATS[active];
  return (
    <div ref={ref} className="w-full h-full flex flex-col items-center justify-center px-4 max-w-4xl mx-auto">
      <div className="s05-head text-center mb-4">
        <div className="text-xs tracking-[0.3em] uppercase text-cyan-400 mb-1">Capitolo IV</div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white">Habitat dei Pesci</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-5">
        {HABITATS.map((hab, i) => (
          <button key={i} onClick={() => setActive(i)}
            className="s05-tab px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-300"
            style={{
              background: active === i ? `${hab.accent}25` : 'rgba(0,0,0,0.35)',
              borderColor: active === i ? `${hab.accent}80` : 'rgba(255,255,255,0.12)',
              color: active === i ? '#fff' : 'rgba(255,255,255,0.5)',
              boxShadow: active === i ? `0 0 18px ${hab.accent}35` : 'none',
              transform: active === i ? 'scale(1.05)' : 'scale(1)'
            }}>
            {hab.name}
          </button>
        ))}
      </div>

      <div ref={bodyRef} className="s05-body w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: `${h.accent}30` }}>
          <div className="relative">
            <img src={fishHabitats} alt="Habitat" className="w-full object-cover" style={{ height: '160px', filter: `hue-rotate(${active * 45}deg) saturate(1.2)` }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,10,30,0.85) 0%, transparent 60%)` }} />
            <div className="absolute bottom-2 left-3">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${h.accent}30`, color: h.accent, border: `1px solid ${h.accent}50` }}>
                {h.zone}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3 p-4 rounded-2xl border"
             style={{ background: 'rgba(0,12,35,0.75)', backdropFilter: 'blur(14px)', borderColor: `${h.accent}25` }}>
          <h3 className="text-xl font-black" style={{ color: h.accent }}>{h.name}</h3>
          <p className="text-white/65 text-sm leading-relaxed">{h.desc}</p>
          <div className="border-t border-white/10 pt-3">
            <div className="text-[10px] uppercase tracking-widest text-white/35 mb-1">Specie tipiche</div>
            <div className="text-xs text-white/55 italic">{h.fauna}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

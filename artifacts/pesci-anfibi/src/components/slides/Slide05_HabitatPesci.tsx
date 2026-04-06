import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import fishHabitats from '@/assets/images/fish-habitats.png';

const habitats = [
  {
    name: 'Oceano Profondo',
    depth: '200m – 11km',
    color: '#0a0a2e',
    accent: '#4444ff',
    desc: 'Oscurità totale, pressioni immense, temperature vicine allo zero. Eppure vi prosperano specie bioluminescenti, pesci abissali con bocche enormi e creature adattate all\'estremo.',
    fauna: 'Pesce Palla, Rana Pescatrice Abissale, Calamaro Gigante'
  },
  {
    name: 'Barriera Corallina',
    depth: '0 – 50m',
    color: '#0a1e0a',
    accent: '#00cc88',
    desc: 'La foresta tropicale del mare. Una biodiversità esplosiva con milioni di specie che condividono microhabitat complessi in simbiosi perfetta.',
    fauna: 'Pesce Clown, Pesce Chirurgo, Murena, Barracuda'
  },
  {
    name: 'Acque Dolci',
    depth: 'Fiumi & Laghi',
    color: '#0a1a0a',
    accent: '#44bb44',
    desc: 'Fiumi, laghi, paludi e torrenti ospitano il 40% di tutte le specie ittiche pur coprendo solo l\'1% della superficie terrestre.',
    fauna: 'Trota, Luccio, Carpa, Piranha, Pesce Gatto'
  },
  {
    name: 'Zone Polari',
    depth: 'Artide & Antartide',
    color: '#0a1a2e',
    accent: '#88ccff',
    desc: 'Acque gelide ricche di nutrienti. I pesci polari producono proteine anticongelanti per sopravvivere sotto il ghiaccio.',
    fauna: 'Nototenioidi, Merlano Polare, Boreogadus saida'
  }
];

export default function Slide05_HabitatPesci() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.s05-title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from('.s05-tab', { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, delay: 0.4 });
      gsap.from('.s05-content', { y: 20, opacity: 0, duration: 0.8, delay: 0.8 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (descRef.current) {
      gsap.fromTo(descRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
    }
  }, [active]);

  const h = habitats[active];

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto flex flex-col items-center px-4">
      <div className="s05-title text-xs md:text-sm tracking-[0.3em] uppercase text-cyan-400 mb-2 text-center">Capitolo IV</div>
      <h2 className="s05-title text-4xl md:text-6xl font-black tracking-tighter text-white mb-8 text-center"
          style={{ textShadow: '0 0 40px rgba(0,200,255,0.4)' }}>
        Gli Habitat dei Pesci
      </h2>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {habitats.map((hab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`s05-tab px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 tracking-wide ${active === i ? 'text-white scale-105' : 'text-white/50 hover:text-white/80'}`}
            style={{
              background: active === i ? `${hab.accent}33` : 'rgba(0,0,0,0.3)',
              borderColor: active === i ? `${hab.accent}88` : 'rgba(255,255,255,0.1)',
              boxShadow: active === i ? `0 0 20px ${hab.accent}44` : 'none'
            }}
          >
            {hab.name}
          </button>
        ))}
      </div>

      <div ref={descRef} className="s05-content w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl overflow-hidden border"
             style={{ borderColor: `${h.accent}33`, boxShadow: `0 0 40px ${h.accent}22` }}>
          <img src={fishHabitats} alt="Habitat pesci" className="w-full h-52 md:h-64 object-cover" />
          <div className="p-4" style={{ background: `${h.color}cc` }}>
            <div className="text-xs uppercase tracking-widest mb-1" style={{ color: h.accent }}>Profondità / Zona</div>
            <div className="text-white font-bold">{h.depth}</div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4 p-6 rounded-2xl border"
             style={{ background: 'rgba(0,15,40,0.7)', backdropFilter: 'blur(16px)', borderColor: `${h.accent}33` }}>
          <h3 className="text-2xl font-bold" style={{ color: h.accent }}>{h.name}</h3>
          <p className="text-white/70 text-sm leading-relaxed">{h.desc}</p>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Specie tipiche</div>
            <div className="text-sm text-white/60 italic">{h.fauna}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

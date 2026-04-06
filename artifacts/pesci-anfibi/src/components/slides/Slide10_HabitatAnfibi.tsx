import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import amphibianOverview from '@/assets/images/amphibian-overview.png';

const habitats = [
  {
    name: 'Foresta Tropicale',
    zone: 'Amazzonia & Asia',
    color: '#0a2e0a',
    accent: '#44ff44',
    desc: 'Biodiversità esplosiva. Le rane dendrobatidi (velenose) vivono tra le foglie cadute e sulle piante epifite. Umidità costante al 90%.',
    fauna: 'Rana Freccia Velenosa, Rana di Vetro, Salamandrina'
  },
  {
    name: 'Palude & Stagno',
    zone: 'Zone Temperate',
    color: '#0a200a',
    accent: '#88cc44',
    desc: 'Habitat classico delle rane europee. Acque basse, vegetazione abbondante, ideali per la deposizione delle uova in primavera.',
    fauna: 'Rana Verde, Rospo Comune, Tritone Crestato'
  },
  {
    name: 'Ruscello di Montagna',
    zone: 'Altitudini 500-2000m',
    color: '#0a1a2e',
    accent: '#44ccff',
    desc: 'Acque fredde e ossigenate. Le salamandre prediligono le pietraie umide e le caverne. Adattamenti all\'acqua fredda e corrente.',
    fauna: 'Salamandra Pezzata, Rana Temporaria, Proteo (Olm)'
  },
  {
    name: 'Zone Semi-Aride',
    zone: 'Savane & Macchie',
    color: '#2e1a0a',
    accent: '#ffcc44',
    desc: 'Gli anfibi delle zone aride si estivano sotto terra durante la siccità, emergendo solo durante le piogge per riprodursi rapidamente.',
    fauna: 'Rana del Deserto, Spadefoot Toad, Pelobate'
  }
];

export default function Slide10_HabitatAnfibi() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.s10-title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from('.s10-tab', { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, delay: 0.4 });
      gsap.from('.s10-content', { y: 20, opacity: 0, duration: 0.8, delay: 0.8 });
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
      <div className="s10-title text-xs md:text-sm tracking-[0.3em] uppercase mb-2 text-center" style={{ color: '#88ff88' }}>Capitolo IX</div>
      <h2 className="s10-title text-4xl md:text-6xl font-black tracking-tighter text-white mb-8 text-center"
          style={{ textShadow: '0 0 40px rgba(100,255,100,0.3)' }}>
        Gli Habitat degli Anfibi
      </h2>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {habitats.map((hab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`s10-tab px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 tracking-wide ${active === i ? 'text-white scale-105' : 'text-white/50 hover:text-white/80'}`}
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

      <div ref={descRef} className="s10-content w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl overflow-hidden border"
             style={{ borderColor: `${h.accent}33`, boxShadow: `0 0 40px ${h.accent}11` }}>
          <img src={amphibianOverview} alt="Habitat anfibi" className="w-full h-52 md:h-64 object-cover" />
          <div className="p-4" style={{ background: `${h.color}cc` }}>
            <div className="text-xs uppercase tracking-widest mb-1" style={{ color: h.accent }}>Zona Geografica</div>
            <div className="text-white font-bold">{h.zone}</div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4 p-6 rounded-2xl border"
             style={{ background: 'rgba(0,15,10,0.7)', backdropFilter: 'blur(16px)', borderColor: `${h.accent}33` }}>
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

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const types = [
  {
    name: 'Pesci Cartilaginei',
    latin: 'Chondrichthyes',
    color: '#00b4d8',
    icon: '🦈',
    examples: 'Squali, Razze, Mante',
    desc: 'Scheletro interamente cartilagineo. Circa 1.100 specie. Predatori eccellenti con sensi straordinari.',
    facts: ['Esistono da oltre 450 milioni di anni', 'Denti che si rigenerano continuamente', 'Senso elettromagnetico (ampolle di Lorenzini)']
  },
  {
    name: 'Pesci Ossei',
    latin: 'Osteichthyes',
    color: '#0096c7',
    icon: '🐠',
    examples: 'Trota, Salmone, Tonno, Branzino',
    desc: 'Con scheletro osseo e vescica natatoria. Rappresentano il 96% di tutte le specie ittiche.',
    facts: ['Oltre 30.000 specie note', 'Habitat: oceani, fiumi, laghi, ghiacciai', 'Vescica natatoria per il controllo del galleggiamento']
  },
  {
    name: 'Agnati',
    latin: 'Agnatha',
    color: '#0077b6',
    icon: '🐍',
    examples: 'Lamprede, Missine',
    desc: 'Pesci primitivi senza mascelle. Tra i vertebrati viventi più antichi, risalenti al Cambriano.',
    facts: ['Bocca circolare con denti multipli', 'Parassiti o detritivori', 'Sistema immunitario unico nel regno animale']
  }
];

export default function Slide03_TipiPesci() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.s03-title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from('.s03-card', { y: 60, opacity: 0, scale: 0.9, duration: 0.8, stagger: 0.2, ease: 'back.out(1.5)', delay: 0.4 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto flex flex-col items-center text-center px-4">
      <div className="s03-title text-xs md:text-sm tracking-[0.3em] uppercase text-cyan-400 mb-3">Capitolo II</div>
      <h2 className="s03-title text-5xl md:text-7xl font-black tracking-tighter text-white mb-10"
          style={{ textShadow: '0 0 40px rgba(0,200,255,0.4)' }}>
        Tipi di Pesci
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
        {types.map((type, i) => (
          <div
            key={i}
            className="s03-card group relative rounded-2xl p-6 text-left border transition-all duration-500 hover:scale-[1.03] cursor-default overflow-hidden"
            style={{
              background: 'rgba(0,20,50,0.7)',
              backdropFilter: 'blur(16px)',
              borderColor: `${type.color}33`,
              boxShadow: `0 0 0 0 ${type.color}33`
            }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                 style={{ background: `radial-gradient(circle at 50% 0%, ${type.color}15, transparent 70%)` }} />
            
            <div className="relative z-10">
              <div className="text-5xl mb-4 filter drop-shadow-lg">{type.icon}</div>
              <h3 className="text-xl font-bold text-white mb-1">{type.name}</h3>
              <div className="text-xs italic mb-3" style={{ color: type.color }}>{type.latin}</div>
              <div className="text-xs text-white/50 mb-3">Es: {type.examples}</div>
              <p className="text-sm text-white/70 leading-relaxed mb-4">{type.desc}</p>
              <ul className="space-y-1">
                {type.facts.map((fact, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-white/50">
                    <span style={{ color: type.color }} className="mt-0.5 shrink-0">&#x25B8;</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

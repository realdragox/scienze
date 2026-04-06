import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const rows = [
  { category: 'Respirazione', fish: 'Branchie (sempre)', amphibian: 'Polmoni + Pelle (adulti), Branchie (larve)' },
  { category: 'Habitat', fish: 'Solo acquatico', amphibian: 'Acquatico + Terrestre' },
  { category: 'Temperatura', fish: 'Ectoterma (segue ambiente)', amphibian: 'Ectoterma (segue ambiente)' },
  { category: 'Pelle', fish: 'Squame impermeabili', amphibian: 'Pelle nuda, umida, permeabile' },
  { category: 'Riproduzione', fish: 'Uova (spesso esterne)', amphibian: 'Uova gelatinose in acqua' },
  { category: 'Arti', fish: 'Pinne', amphibian: '4 zampe (adulti)' },
  { category: 'Metamorfosi', fish: 'Assente (di norma)', amphibian: 'Sempre presente' },
  { category: 'Cuore', fish: '2 camere', amphibian: '3 camere (2 atri + 1 ventricolo)' },
];

export default function Slide09_Differenze() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.s09-title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from('.s09-header', { y: -20, opacity: 0, duration: 0.8, delay: 0.4 });
      gsap.from('.s09-row', { x: -40, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.6 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto flex flex-col items-center px-4">
      <div className="s09-title text-xs md:text-sm tracking-[0.3em] uppercase text-cyan-400 mb-2 text-center">Capitolo VIII</div>
      <h2 className="s09-title text-4xl md:text-6xl font-black tracking-tighter text-white mb-8 text-center"
          style={{ textShadow: '0 0 40px rgba(0,200,255,0.4)' }}>
        Pesci vs Anfibi
      </h2>

      <div className="w-full rounded-2xl overflow-hidden border border-white/10"
           style={{ background: 'rgba(0,10,30,0.7)', backdropFilter: 'blur(16px)' }}>
        {/* Header */}
        <div className="s09-header grid grid-cols-[1fr_1.2fr_1.2fr] gap-0 border-b border-white/10">
          <div className="p-4 text-xs uppercase tracking-widest text-white/40">Caratteristica</div>
          <div className="p-4 text-center border-l border-white/10">
            <span className="text-cyan-400 font-bold text-sm uppercase tracking-wide">Pesci</span>
          </div>
          <div className="p-4 text-center border-l border-white/10">
            <span className="font-bold text-sm uppercase tracking-wide" style={{ color: '#88ff88' }}>Anfibi</span>
          </div>
        </div>

        {rows.map((row, i) => (
          <div key={i} className={`s09-row grid grid-cols-[1fr_1.2fr_1.2fr] gap-0 border-b border-white/5 hover:bg-white/5 transition-colors duration-200 ${i % 2 === 0 ? 'bg-white/2' : ''}`}>
            <div className="p-3 md:p-4 text-xs font-semibold text-white/60 uppercase tracking-wider flex items-center">
              {row.category}
            </div>
            <div className="p-3 md:p-4 text-xs text-cyan-300/80 border-l border-white/5 flex items-center justify-center text-center leading-relaxed">
              {row.fish}
            </div>
            <div className="p-3 md:p-4 text-xs border-l border-white/5 flex items-center justify-center text-center leading-relaxed"
                 style={{ color: 'rgba(136,255,136,0.8)' }}>
              {row.amphibian}
            </div>
          </div>
        ))}
      </div>

      <p className="s09-title mt-4 text-white/30 text-xs italic text-center">
        Nonostante le differenze, entrambi i gruppi sono cruciali per gli ecosistemi acquatici terrestri
      </p>
    </div>
  );
}

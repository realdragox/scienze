import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const types = [
  {
    name: 'Cartilaginei', latin: 'Chondrichthyes', color: '#00b4d8',
    icon: '◈', examples: 'Squali · Razze · Mante',
    facts: ['~1.100 specie', 'Denti che si rigenerano', 'Senso elettromagnetico', 'Presenti da 450M anni']
  },
  {
    name: 'Ossei', latin: 'Osteichthyes', color: '#48cae4',
    icon: '◉', examples: 'Trota · Tonno · Branzino',
    facts: ['96% di tutte le specie', 'Vescica natatoria', 'Adattati a ogni habitat', 'Oltre 30.000 specie']
  },
  {
    name: 'Agnati', latin: 'Agnatha', color: '#0077b6',
    icon: '◌', examples: 'Lamprede · Missine',
    facts: ['Senza mascelle', 'Bocca circolare', 'Vertebrati primitivi', 'Dal Cambriano']
  },
];

export default function Slide03_TipiPesci() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.s03-head', { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo('.s03-card',
        { y: 50, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.18, ease: 'back.out(1.4)', delay: 0.3 }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="w-full h-full flex flex-col items-center justify-center px-4 max-w-5xl mx-auto">
      <div className="s03-head text-center mb-6">
        <div className="text-xs tracking-[0.3em] uppercase text-cyan-400 mb-1">Capitolo II</div>
        <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white"
            style={{ textShadow: '0 0 35px rgba(0,200,255,0.35)' }}>Tipi di Pesci</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        {types.map((t, i) => (
          <div key={i} className="s03-card group relative rounded-2xl p-5 border overflow-hidden cursor-default transition-transform duration-300 hover:scale-[1.03]"
               style={{ background: 'rgba(0,15,40,0.75)', backdropFilter: 'blur(14px)', borderColor: `${t.color}30` }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                 style={{ background: `radial-gradient(ellipse at 50% 0%, ${t.color}18, transparent 70%)` }} />
            <div className="relative z-10">
              <div className="text-3xl mb-3" style={{ color: t.color }}>{t.icon}</div>
              <div className="text-base font-black text-white mb-0.5">{t.name}</div>
              <div className="text-xs italic mb-3" style={{ color: t.color }}>{t.latin}</div>
              <div className="text-xs text-white/45 mb-4 border-t border-white/10 pt-3">{t.examples}</div>
              <div className="space-y-1.5">
                {t.facts.map((f, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-white/55">
                    <span className="w-1 h-1 rounded-full shrink-0" style={{ background: t.color }} />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

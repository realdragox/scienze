import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const facts = [
  { icon: '🐠', title: 'Pesce Pagliaccio', cat: 'Pesci', color: '#ff8800', text: 'Tutti i pesci pagliaccio nascono maschi. Quando la femmina muore, il maschio dominante cambia sesso. Nessun gender reveal, solo evoluzione.' },
  { icon: '🦈', title: 'Squalo Elettrico', cat: 'Pesci', color: '#0099ff', text: 'Lo squalo martello usa gli elettrorecettori della testa per percepire il campo elettrico del battito cardiaco dei pesci nascosti sotto la sabbia.' },
  { icon: '🐸', title: 'Rana Survival', cat: 'Anfibi', color: '#44ff88', text: 'La rana delle foreste del Nord America si congela letteralmente d\'inverno. Cuore fermo, respiro assente. In primavera si "scongela" e torna in vita.' },
  { icon: '🦎', title: 'Salamandra Fuoco', cat: 'Anfibi', color: '#ff4444', text: 'La salamandra di fuoco secerne dalla pelle un veleno così potente da uccidere un uomo adulto. Il pattern giallo-nero avvisa i predatori del pericolo.' },
  { icon: '🐡', title: 'Pesce Globo', cat: 'Pesci', color: '#ffcc00', text: 'Contiene tetrodotossina, 1.200 volte più tossica del cianuro. In Giappone il fugu è una delicatezza preparata solo da chef con licenza speciale.' },
  { icon: '🐊', title: 'Axolotl Immortale', cat: 'Anfibi', color: '#ff44ff', text: 'L\'axolotl non subisce metamorfosi e mantiene forma larvale tutta la vita (neotenia). Può rigenerare arti, cuore e persino parti del cervello.' },
];

export default function Slide11_Curiosita() {
  const [active, setActive] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.s11-head', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 });
      gsap.fromTo('.s11-card', { y: 30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.5)', delay: 0.3 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="w-full h-full flex flex-col items-center justify-center px-4 max-w-5xl mx-auto">
      <div className="s11-head text-center mb-5">
        <div className="text-xs tracking-[0.3em] uppercase mb-1" style={{ color: 'rgba(200,150,255,0.8)' }}>Capitolo X</div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white">Curiosità Straordinarie</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
        {facts.map((f, i) => (
          <button
            key={i}
            onClick={() => setActive(active === i ? null : i)}
            className="s11-card relative text-left rounded-2xl p-4 border transition-all duration-300 overflow-hidden group"
            style={{
              background: active === i ? `${f.color}18` : 'rgba(0,10,30,0.7)',
              backdropFilter: 'blur(12px)',
              borderColor: active === i ? `${f.color}60` : 'rgba(255,255,255,0.08)',
              boxShadow: active === i ? `0 0 25px ${f.color}25` : 'none',
              transform: active === i ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            <div className="text-2xl mb-2">{f.icon}</div>
            <div className="text-xs font-black text-white mb-1">{f.title}</div>
            <div className="text-[10px] px-1.5 py-0.5 rounded-full inline-block border mb-2"
                 style={{ color: f.color, borderColor: `${f.color}40`, background: `${f.color}15` }}>
              {f.cat}
            </div>
            <p className={`text-[11px] text-white/60 leading-snug transition-all duration-300 ${active === i ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden'}`}>
              {f.text}
            </p>
            {active !== i && <p className="text-[10px] text-white/25 mt-1">Tocca per scoprire →</p>}
          </button>
        ))}
      </div>
    </div>
  );
}

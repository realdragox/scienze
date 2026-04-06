import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const facts = [
  {
    icon: '◆',
    title: 'Il Polmone Africano',
    text: 'Il Protopterus (Polmone Africano) può sopravvivere fino a 4 anni senza acqua, chiuso in un bozzolo di muco nel fango, riducendo il metabolismo al minimo.',
    color: '#00ccff',
    category: 'Pesce'
  },
  {
    icon: '◈',
    title: 'Luce Bioluminescente',
    text: 'Il pesce lanterna e la rana pescatrice abissale producono luce propria attraverso reazioni chimiche con batteri simbiotici. Usata per attirare prede nel buio degli abissi.',
    color: '#44aaff',
    category: 'Pesce'
  },
  {
    icon: '✦',
    title: 'Rigenerazione Totale',
    text: 'L\'axolotl (Ambystoma mexicanum) può rigenerare completamente arti, cuore, polmoni e persino parti del cervello. Un\'abilità che gli scienziati studiano per la medicina rigenerativa.',
    color: '#88ff88',
    category: 'Anfibio'
  },
  {
    icon: '◑',
    title: 'Il Cambiasesso',
    text: 'Il pesce pagliaccio (come Nemo!) nasce maschio ma può diventare femmina. Quando la femmina dominante muore, il maschio dominante cambia sesso per mantenere il gruppo riproduttivo.',
    color: '#ffaa44',
    category: 'Pesce'
  },
  {
    icon: '⬡',
    title: 'Veleno Folgorante',
    text: 'Le rane dendrobatidi (Poison Dart Frogs) producono alcaloidi così potenti che indigeni amazzonici le usavano per avvelenare le frecce. Una sola rana può uccidere 10 uomini.',
    color: '#ff6644',
    category: 'Anfibio'
  },
  {
    icon: '◎',
    title: 'Congelamento e Rinascita',
    text: 'La rana grigia americana (Hyla versicolor) sopravvive congelata in inverno. Il glucosio funge da antigelo cellulare. In primavera si scongela e riprende vita normalmente.',
    color: '#88ccff',
    category: 'Anfibio'
  },
];

export default function Slide11_Curiosita() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState<number[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.s11-title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from('.s11-card', {
        y: 50, opacity: 0, scale: 0.9, duration: 0.6, stagger: 0.1,
        ease: 'back.out(1.5)', delay: 0.5
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const toggleReveal = (i: number) => {
    setRevealed(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto flex flex-col items-center px-4">
      <div className="s11-title text-xs md:text-sm tracking-[0.3em] uppercase text-cyan-400 mb-2 text-center">Capitolo X</div>
      <h2 className="s11-title text-4xl md:text-6xl font-black tracking-tighter text-white mb-2 text-center"
          style={{ textShadow: '0 0 40px rgba(0,200,255,0.4)' }}>
        Lo Sapevi?
      </h2>
      <p className="s11-title text-sm text-white/40 mb-8 text-center">Clicca su ogni scheda per scoprire il fatto</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {facts.map((fact, i) => (
          <button
            key={i}
            onClick={() => toggleReveal(i)}
            className={`s11-card text-left rounded-2xl p-5 border transition-all duration-400 hover:scale-[1.02] ${revealed.includes(i) ? 'scale-[1.02]' : ''}`}
            style={{
              background: revealed.includes(i) ? `rgba(0,20,40,0.9)` : 'rgba(0,10,30,0.6)',
              backdropFilter: 'blur(12px)',
              borderColor: revealed.includes(i) ? `${fact.color}66` : 'rgba(255,255,255,0.08)',
              boxShadow: revealed.includes(i) ? `0 0 30px ${fact.color}22` : 'none'
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl" style={{ color: fact.color }}>{fact.icon}</span>
              <div>
                <div className="text-xs uppercase tracking-widest mb-0.5 font-medium" style={{ color: `${fact.color}99` }}>{fact.category}</div>
                <h3 className="text-sm font-bold text-white">{fact.title}</h3>
              </div>
            </div>
            
            {revealed.includes(i) ? (
              <p className="text-white/60 text-xs leading-relaxed">{fact.text}</p>
            ) : (
              <p className="text-white/30 text-xs italic">Tocca per scoprire...</p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

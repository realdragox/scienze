import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import fishAnatomy from '@/assets/images/fish-anatomy.png';

const hotspots = [
  { id: 'dorsale', label: 'Pinna Dorsale', x: 45, y: 20, desc: 'La pinna dorsale garantisce la stabilità laterale durante il nuoto, impedendo al pesce di rovesciarsi. Può essere singola o multipla a seconda della specie. Nei pesci come il branzino è divisa in due parti: la prima ha raggi spinosi per la difesa, la seconda ha raggi molli per la propulsione.' },
  { id: 'branchie', label: 'Branchie', x: 18, y: 42, desc: 'Le branchie sono l\'organo respiratorio dei pesci. Estraggono l\'ossigeno disciolto nell\'acqua mentre questa scorre attraverso i filamenti branchiali. Ogni branchia è composta da archi branchiali ricoperti di lamelle, aumentando la superficie di scambio gassoso.' },
  { id: 'pettorali', label: 'Pinne Pettorali', x: 25, y: 52, desc: 'Le pinne pettorali sono l\'equivalente delle braccia dei vertebrati terrestri. Permettono manovre precise, frenata, e controllo della direzione. In alcune specie come il gurnardo vengono usate per "camminare" sul fondo marino.' },
  { id: 'coda', label: 'Pinna Caudale', x: 82, y: 42, desc: 'La pinna caudale (coda) è il principale organo di propulsione. La forma rivela lo stile di nuoto: a falce (tonno) per velocità, arrotondata per manovrabilità, biforcuta per efficienza in acque aperte. I muscoli caudali possono generare potentissimi scatti.' },
  { id: 'squame', label: 'Squame', x: 55, y: 38, desc: 'Le squame proteggono il corpo del pesce e riducono la resistenza idrodinamica. Nei pesci ossei sono di tipo cicloide o ctenoide. La disposizione embricata (come tegole) permette flessibilità. Gli anelli di crescita sulle squame rivelano l\'età del pesce.' },
  { id: 'vescica', label: 'Vescica Natatoria', x: 52, y: 50, desc: 'La vescica natatoria è un organo interno riempito di gas che consente al pesce di regolare il galleggiamento senza sprecare energia natatoria. Riempiendola o svuotandola il pesce sale o scende. In alcune specie primitivi funge anche da polmone.' },
  { id: 'occhio', label: 'Occhio', x: 14, y: 38, desc: 'Gli occhi dei pesci sono adattati alla visione subacquea. La cornea è piatta e il cristallino sferico per compensare la refrazione dell\'acqua. Molte specie vedono nell\'ultravioletto. I pesci degli abissi hanno occhi giganti per catturare la minima luce disponibile.' },
  { id: 'bocca', label: 'Bocca', x: 8, y: 46, desc: 'La bocca rivela le abitudini alimentari: terminale per pesci predatori, inferiore per chi si nutre sul fondo, superiore per chi cattura prede in superficie. I denti variano da puntuti (per afferrare) a piatti (per triturare alghe e molluschi).' },
];

export default function Slide04_AnatomiaPesci() {
  const [selected, setSelected] = useState<typeof hotspots[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.s04-title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from('.s04-img-wrap', { scale: 0.9, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 });
      gsap.from('.s04-hotspot', { scale: 0, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(2)', delay: 0.8 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (selected && panelRef.current) {
      gsap.fromTo(panelRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [selected]);

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto flex flex-col items-center px-4">
      <div className="s04-title text-xs md:text-sm tracking-[0.3em] uppercase text-cyan-400 mb-2 text-center">Capitolo III – Interattivo</div>
      <h2 className="s04-title text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 text-center"
          style={{ textShadow: '0 0 40px rgba(0,200,255,0.4)' }}>
        Anatomia del Pesce
      </h2>
      <p className="s04-title text-sm text-white/50 mb-6 text-center">Clicca sui punti illuminati per scoprire ogni parte</p>

      <div className="flex flex-col md:flex-row gap-6 w-full items-start">
        <div className="s04-img-wrap relative flex-1 min-h-[240px] md:min-h-[320px] rounded-2xl overflow-hidden border border-cyan-500/20"
             style={{ background: 'rgba(0,20,50,0.6)' }}>
          <img src={fishAnatomy} alt="Anatomia del pesce" className="w-full h-full object-contain p-4" />
          
          {hotspots.map((h) => (
            <button
              key={h.id}
              className="s04-hotspot absolute group"
              style={{ left: `${h.x}%`, top: `${h.y}%`, transform: 'translate(-50%, -50%)' }}
              onClick={() => setSelected(selected?.id === h.id ? null : h)}
            >
              <span className={`block w-4 h-4 rounded-full border-2 transition-all duration-300 ${selected?.id === h.id ? 'scale-150 bg-cyan-400' : 'bg-cyan-400/60 hover:scale-125 hover:bg-cyan-400'}`}
                    style={{ boxShadow: '0 0 12px rgba(0,220,255,0.8)', animation: 'hotspotPulse 2s infinite' }} />
              <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-black/80 text-cyan-300 text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {h.label}
              </span>
            </button>
          ))}
        </div>

        <div ref={panelRef} className={`md:w-80 rounded-2xl p-6 border border-cyan-500/20 transition-all duration-300 ${selected ? 'opacity-100' : 'opacity-30'}`}
             style={{ background: 'rgba(0,20,50,0.8)', backdropFilter: 'blur(16px)', minHeight: '200px' }}>
          {selected ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-cyan-300">{selected.label}</h3>
                <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white transition-colors text-xl leading-none">&times;</button>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{selected.desc}</p>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-8">
              <div className="w-12 h-12 rounded-full border-2 border-cyan-500/40 flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                </svg>
              </div>
              <p className="text-white/40 text-sm">Seleziona un punto sull'immagine</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes hotspotPulse {
          0%, 100% { box-shadow: 0 0 8px rgba(0,220,255,0.6); }
          50% { box-shadow: 0 0 20px rgba(0,220,255,1), 0 0 40px rgba(0,220,255,0.4); }
        }
      `}</style>
    </div>
  );
}

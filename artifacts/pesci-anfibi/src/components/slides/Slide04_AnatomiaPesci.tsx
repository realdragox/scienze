import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import fishAnatomy from '@/assets/images/fish-anatomy.png';

// Hotspots revealed one by one as user presses "next" inside the slide
const ALL_HOTSPOTS = [
  { id: 'occhio', label: 'Occhio', x: 13, y: 37, desc: 'Adattato alla visione sott\'acqua. La cornea piatta e il cristallino sferico compensano la refrazione. Molte specie vedono anche nell\'ultravioletto.' },
  { id: 'bocca', label: 'Bocca', x: 7, y: 46, desc: 'La forma rivela l\'alimentazione: terminale nei predatori, inferiore nei pesci di fondo, superiore in chi cattura prede in superficie.' },
  { id: 'branchie', label: 'Branchie', x: 20, y: 42, desc: 'L\'organo respiratorio dei pesci. Filamenti ricchi di capillari estraggono l\'ossigeno disciolto nell\'acqua che scorre attraverso di essi.' },
  { id: 'pettorali', label: 'Pinne Pettorali', x: 27, y: 53, desc: 'Equivalente delle braccia: permettono frenata, virata e controllo preciso della direzione. In alcune specie usate per "camminare" sul fondo.' },
  { id: 'dorsale', label: 'Pinna Dorsale', x: 47, y: 18, desc: 'Garantisce stabilità laterale durante il nuoto. Può avere raggi spinosi (difesa) e molli (propulsione). Alcune specie ne hanno due.' },
  { id: 'squame', label: 'Squame', x: 55, y: 37, desc: 'Protezione e idrodinamica. Disposte come tegole per massima flessibilità. Gli anelli di crescita rivelano l\'età del pesce.' },
  { id: 'vescica', label: 'Vescica Natatoria', x: 52, y: 50, desc: 'Organo gonfiabile interno per controllare il galleggiamento senza sprecare energia. In alcuni pesci primitivi funge anche da polmone.' },
  { id: 'coda', label: 'Pinna Caudale', x: 84, y: 42, desc: 'Il motore principale. A falce = velocità (tonno); arrotondata = manovrabilità; biforcuta = efficienza nelle acque aperte.' },
];

export default function Slide04_AnatomiaPesci() {
  const [revealedCount, setRevealedCount] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const visibleHotspots = ALL_HOTSPOTS.slice(0, revealedCount);
  const selected = ALL_HOTSPOTS.find(h => h.id === selectedId) ?? null;
  const allRevealed = revealedCount >= ALL_HOTSPOTS.length;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.s04-head', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo('.s04-img-wrap', { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 });
    }, ref);
    return () => ctx.revert();
  }, []);

  // Animate new hotspot when revealed
  useEffect(() => {
    if (revealedCount === 0) return;
    const id = ALL_HOTSPOTS[revealedCount - 1].id;
    const el = document.querySelector(`[data-hotspot="${id}"]`);
    if (el) {
      gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' });
    }
    // Auto-select the newly revealed hotspot
    setSelectedId(id);
  }, [revealedCount]);

  useEffect(() => {
    if (selected && panelRef.current) {
      gsap.fromTo(panelRef.current, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out' });
    }
  }, [selected]);

  return (
    <div ref={ref} className="w-full h-full flex flex-col items-center justify-center px-4 max-w-5xl mx-auto">
      <div className="s04-head text-center mb-3">
        <div className="text-xs tracking-[0.3em] uppercase text-cyan-400 mb-1">Capitolo III — Interattivo</div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white"
            style={{ textShadow: '0 0 35px rgba(0,200,255,0.35)' }}>Anatomia del Pesce</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full items-start">
        {/* Image with hotspots */}
        <div className="s04-img-wrap relative flex-1 rounded-2xl overflow-hidden border border-cyan-500/20"
             style={{ background: 'rgba(0,15,40,0.7)', minHeight: '200px' }}>
          <img src={fishAnatomy} alt="Pesce" className="w-full object-contain p-2" style={{ maxHeight: '220px' }} />

          {visibleHotspots.map((h) => (
            <button
              key={h.id}
              data-hotspot={h.id}
              onClick={() => setSelectedId(selectedId === h.id ? null : h.id)}
              className="absolute group"
              style={{ left: `${h.x}%`, top: `${h.y}%`, transform: 'translate(-50%,-50%)', zIndex: 20 }}
            >
              <span className={`block w-4 h-4 rounded-full border-2 border-cyan-400 transition-all duration-300 ${selectedId === h.id ? 'scale-150 bg-cyan-400' : 'bg-cyan-400/50 hover:scale-125'}`}
                    style={{ boxShadow: '0 0 12px rgba(0,220,255,0.9)', animation: 'hpulse 2s infinite' }} />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-black/90 text-cyan-300 text-[10px] px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-cyan-500/30">
                {h.label}
              </span>
            </button>
          ))}

          {/* Reveal next button */}
          {!allRevealed && (
            <button
              onClick={() => setRevealedCount(c => c + 1)}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-bold text-white border border-cyan-500/50 transition-all hover:border-cyan-400 hover:bg-cyan-500/20"
              style={{ background: 'rgba(0,20,60,0.85)', backdropFilter: 'blur(8px)', animation: 'navPulse 2s ease-in-out infinite' }}
            >
              Scopri parte {revealedCount + 1}/{ALL_HOTSPOTS.length} →
            </button>
          )}
        </div>

        {/* Info panel */}
        <div ref={panelRef} className="sm:w-64 rounded-2xl p-4 border border-cyan-500/20"
             style={{ background: 'rgba(0,15,45,0.85)', backdropFilter: 'blur(16px)', minHeight: '180px' }}>
          {selected ? (
            <>
              <h3 className="text-base font-black text-cyan-300 mb-3 border-b border-cyan-500/20 pb-2">{selected.label}</h3>
              <p className="text-white/65 text-xs leading-relaxed">{selected.desc}</p>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-center gap-2 opacity-40">
              <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                <path strokeLinecap="round" d="M12 8v4M12 16h.01" strokeWidth={2} />
              </svg>
              <p className="text-white text-xs">{revealedCount === 0 ? 'Premi il bottone sotto' : 'Clicca un punto'}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 flex gap-1.5 justify-center">
        {ALL_HOTSPOTS.map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{ background: i < revealedCount ? 'rgba(0,220,255,0.9)' : 'rgba(255,255,255,0.2)' }} />
        ))}
      </div>

      <style>{`
        @keyframes hpulse { 0%,100% { box-shadow: 0 0 8px rgba(0,220,255,0.6); } 50% { box-shadow: 0 0 20px rgba(0,220,255,1); } }
        @keyframes navPulse { 0%,100% { box-shadow: 0 0 10px rgba(0,200,255,0.2); } 50% { box-shadow: 0 0 25px rgba(0,200,255,0.5); } }
      `}</style>
    </div>
  );
}

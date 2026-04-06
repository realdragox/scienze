import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import frogAnatomy from '@/assets/images/frog-anatomy.png';

const ALL_HOTSPOTS = [
  { id: 'occhi', label: 'Occhi', x: 37, y: 18, desc: 'Grandi e sporgenti per una visione quasi a 360°. La membrana nittitante protegge l\'occhio sott\'acqua. I colori percepiti aiutano il riconoscimento del partner.' },
  { id: 'pelle', label: 'Pelle', x: 60, y: 35, desc: 'L\'organo più importante degli anfibi. Permeabile all\'acqua e ai gas: respira, assorbe, termoregola. Deve restare sempre umida per funzionare correttamente.' },
  { id: 'timpano', label: 'Timpano', x: 22, y: 30, desc: 'Membrana circolare dietro l\'occhio. Capta le vibrazioni sonore, fondamentali per la comunicazione tra rane e rospi durante la stagione riproduttiva.' },
  { id: 'polmoni', label: 'Polmoni', x: 50, y: 45, desc: 'Polmoni sacculari relativamente semplici. Integrati dalla respirazione cutanea (30–40% negli adulti, 100% durante il letargo invernale).' },
  { id: 'zampe-post', label: 'Zampe Posteriori', x: 65, y: 75, desc: 'Potenti arti muscolosi: la rana saltatrice può coprire distanze fino a 10 volte la propria lunghezza in un singolo balzo.' },
  { id: 'lingua', label: 'Lingua', x: 28, y: 50, desc: 'Attaccata nella parte anteriore della bocca, si stende fulminea (meno di 0.07 secondi) per catturare insetti. La superficie viscosissima intrappola le prede.' },
];

export default function Slide08_AnatomiaAnfibi() {
  const [revealedCount, setRevealedCount] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const visibleHotspots = ALL_HOTSPOTS.slice(0, revealedCount);
  const selected = ALL_HOTSPOTS.find(h => h.id === selectedId) ?? null;
  const allRevealed = revealedCount >= ALL_HOTSPOTS.length;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.s08-head', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
      gsap.fromTo('.s08-img-wrap', { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, delay: 0.2 });
    }, ref);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (revealedCount === 0) return;
    const id = ALL_HOTSPOTS[revealedCount - 1].id;
    const el = document.querySelector(`[data-hotspot="${id}"]`);
    if (el) gsap.fromTo(el, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' });
    setSelectedId(id);
  }, [revealedCount]);

  useEffect(() => {
    if (selected && panelRef.current)
      gsap.fromTo(panelRef.current, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out' });
  }, [selected]);

  return (
    <div ref={ref} className="w-full h-full flex flex-col items-center justify-center px-4 max-w-5xl mx-auto">
      <div className="s08-head text-center mb-3">
        <div className="text-xs tracking-[0.3em] uppercase mb-1" style={{ color: '#66ff88' }}>Capitolo VII — Interattivo</div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white">Anatomia della Rana</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full items-start">
        <div className="s08-img-wrap relative flex-1 rounded-2xl overflow-hidden border"
             style={{ background: 'rgba(0,20,10,0.7)', borderColor: 'rgba(100,255,100,0.2)', minHeight: '200px' }}>
          <img src={frogAnatomy} alt="Rana" className="w-full object-contain p-2" style={{ maxHeight: '220px' }} />

          {visibleHotspots.map((h) => (
            <button
              key={h.id}
              data-hotspot={h.id}
              onClick={() => setSelectedId(selectedId === h.id ? null : h.id)}
              className="absolute group"
              style={{ left: `${h.x}%`, top: `${h.y}%`, transform: 'translate(-50%,-50%)', zIndex: 20 }}
            >
              <span className={`block w-4 h-4 rounded-full border-2 transition-all duration-300 ${selectedId === h.id ? 'scale-150' : 'hover:scale-125'}`}
                    style={{
                      borderColor: '#66ff88',
                      background: selectedId === h.id ? '#66ff88' : 'rgba(100,255,100,0.5)',
                      boxShadow: '0 0 12px rgba(100,255,100,0.9)',
                      animation: 'hpulse2 2s infinite'
                    }} />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-black/90 text-green-300 text-[10px] px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-green-500/30">
                {h.label}
              </span>
            </button>
          ))}

          {!allRevealed && (
            <button
              onClick={() => setRevealedCount(c => c + 1)}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-bold text-white border transition-all hover:bg-green-500/20"
              style={{ background: 'rgba(0,20,10,0.85)', backdropFilter: 'blur(8px)', borderColor: 'rgba(100,255,100,0.4)', animation: 'navPulse2 2s ease-in-out infinite' }}
            >
              Scopri parte {revealedCount + 1}/{ALL_HOTSPOTS.length} →
            </button>
          )}
        </div>

        <div ref={panelRef} className="sm:w-64 rounded-2xl p-4 border"
             style={{ background: 'rgba(0,20,10,0.85)', backdropFilter: 'blur(16px)', borderColor: 'rgba(100,255,100,0.2)', minHeight: '180px' }}>
          {selected ? (
            <>
              <h3 className="text-base font-black mb-3 border-b pb-2" style={{ color: '#66ff88', borderColor: 'rgba(100,255,100,0.2)' }}>{selected.label}</h3>
              <p className="text-white/65 text-xs leading-relaxed">{selected.desc}</p>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-center gap-2 opacity-40">
              <svg className="w-8 h-8" style={{ color: '#66ff88' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                style={{ background: i < revealedCount ? 'rgba(100,255,100,0.9)' : 'rgba(255,255,255,0.2)' }} />
        ))}
      </div>

      <style>{`
        @keyframes hpulse2 { 0%,100% { box-shadow: 0 0 8px rgba(100,255,100,0.6); } 50% { box-shadow: 0 0 20px rgba(100,255,100,1); } }
        @keyframes navPulse2 { 0%,100% { box-shadow: 0 0 10px rgba(100,255,100,0.2); } 50% { box-shadow: 0 0 25px rgba(100,255,100,0.5); } }
      `}</style>
    </div>
  );
}

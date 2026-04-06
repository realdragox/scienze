import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import frogAnatomy from '@/assets/images/frog-anatomy.png';

const hotspots = [
  { id: 'pelle', label: 'Pelle Permeabile', x: 50, y: 45, desc: 'La pelle degli anfibi è uno degli adattamenti più straordinari della natura. Priva di squame o pelliccia, è umida, sottile e permeabile, permettendo scambi gassosi diretti con l\'ambiente. Molte rane respirano parzialmente attraverso la pelle, anche sott\'acqua in inverno.' },
  { id: 'occhi', label: 'Occhi Sporgenti', x: 35, y: 22, desc: 'Gli occhi bulbosi degli anfibi forniscono un campo visivo quasi a 360°. Hanno pupille orizzontali o verticali, e molte specie possono vedere in bianco e nero e a colori. Alcune rane usano i globi oculari per aiutare la deglutizione, premendoli dall\'interno.' },
  { id: 'zampe', label: 'Zampe Posteriori', x: 65, y: 72, desc: 'Le zampe posteriori degli anuri sono enormemente potenti rispetto al corpo. Permettono salti da 20 volte la lunghezza del corpo. Alcune rane arboricole hanno ventose adesive sui piedi per scalare superfici verticali. Le zampe palmate facilitano il nuoto.' },
  { id: 'timpano', label: 'Membrana Timpanica', x: 28, y: 36, desc: 'Il timpano è un disco circolare visibile dietro l\'occhio che funziona come orecchio esterno. Permette agli anfibi di percepire vibrazioni sonore, fondamentali per riconoscere canti di corteggiamento specifici della specie.' },
  { id: 'lingua', label: 'Lingua Adesiva', x: 40, y: 52, desc: 'La lingua degli anuri è attaccata alla parte anteriore della bocca, permettendo di essere proiettata verso l\'esterno con straordinaria velocità (< 0,07 secondi). La superficie è ricoperta di mucosa viscoelastica che avvolge la preda.' },
  { id: 'polmoni', label: 'Polmoni', x: 50, y: 35, desc: 'I polmoni degli anfibi sono relativamente semplici, con superficie interna spugnosa. Poiché le costole non permettono una vera respirazione toracica, il peristalsi della gola pompa l\'aria nei polmoni. La respirazione cutanea integra quella polmonare.' },
  { id: 'cuore', label: 'Cuore a 3 Camere', x: 45, y: 40, desc: 'Il cuore anfibio ha tre camere: due atri e un ventricolo. Il sangue ossigenato dai polmoni e il sangue deossigenato dal corpo si mischiano parzialmente nel ventricolo, rendendolo meno efficiente dei cuori a quattro camere dei mammiferi.' },
  { id: 'vocale', label: 'Sacco Vocale', x: 42, y: 58, desc: 'I sacchi vocali sono estensioni della cavità orale che fungono da casse di risonanza, amplificando il canto. Solo i maschi li possiedono tipicamente. Il canto serve per attrare le femmine e difendere il territorio, riconoscibile da km di distanza.' },
];

export default function Slide08_AnatomiaAnfibi() {
  const [selected, setSelected] = useState<typeof hotspots[0] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.s08-title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from('.s08-img-wrap', { scale: 0.9, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 });
      gsap.from('.s08-hotspot', { scale: 0, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(2)', delay: 0.8 });
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
      <div className="s08-title text-xs md:text-sm tracking-[0.3em] uppercase mb-2 text-center" style={{ color: '#88ff88' }}>Capitolo VII – Interattivo</div>
      <h2 className="s08-title text-4xl md:text-6xl font-black tracking-tighter text-white mb-3 text-center"
          style={{ textShadow: '0 0 40px rgba(100,255,100,0.3)' }}>
        Anatomia della Rana
      </h2>
      <p className="s08-title text-sm text-white/50 mb-6 text-center">Clicca sui punti illuminati per scoprire ogni parte</p>

      <div className="flex flex-col md:flex-row gap-6 w-full items-start">
        <div className="s08-img-wrap relative flex-1 min-h-[240px] md:min-h-[320px] rounded-2xl overflow-hidden border"
             style={{ background: 'rgba(0,20,10,0.6)', borderColor: 'rgba(100,255,100,0.2)' }}>
          <img src={frogAnatomy} alt="Anatomia della rana" className="w-full h-full object-contain p-4" />
          
          {hotspots.map((h) => (
            <button
              key={h.id}
              className="s08-hotspot absolute group"
              style={{ left: `${h.x}%`, top: `${h.y}%`, transform: 'translate(-50%, -50%)' }}
              onClick={() => setSelected(selected?.id === h.id ? null : h)}
            >
              <span className={`block w-4 h-4 rounded-full border-2 transition-all duration-300 ${selected?.id === h.id ? 'scale-150' : 'hover:scale-125'}`}
                    style={{
                      background: selected?.id === h.id ? '#88ff88' : 'rgba(100,255,100,0.6)',
                      borderColor: '#88ff88',
                      boxShadow: '0 0 12px rgba(100,255,100,0.8)',
                      animation: 'hotspotPulseGreen 2s infinite'
                    }} />
              <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-black/80 text-green-300 text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {h.label}
              </span>
            </button>
          ))}
        </div>

        <div ref={panelRef} className={`md:w-80 rounded-2xl p-6 border transition-all duration-300 ${selected ? 'opacity-100' : 'opacity-30'}`}
             style={{ background: 'rgba(0,20,10,0.8)', backdropFilter: 'blur(16px)', borderColor: 'rgba(100,255,100,0.2)', minHeight: '200px' }}>
          {selected ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold" style={{ color: '#88ff88' }}>{selected.label}</h3>
                <button onClick={() => setSelected(null)} className="text-white/40 hover:text-white transition-colors text-xl leading-none">&times;</button>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{selected.desc}</p>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-8">
              <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center" style={{ borderColor: 'rgba(100,255,100,0.4)' }}>
                <svg className="w-6 h-6" style={{ color: '#88ff88' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                </svg>
              </div>
              <p className="text-white/40 text-sm">Seleziona un punto sull'immagine</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes hotspotPulseGreen {
          0%, 100% { box-shadow: 0 0 8px rgba(100,255,100,0.6); }
          50% { box-shadow: 0 0 20px rgba(100,255,100,1), 0 0 40px rgba(100,255,100,0.4); }
        }
      `}</style>
    </div>
  );
}

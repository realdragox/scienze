import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import finaleBg from '@/assets/images/finale-bg.png';

export default function Slide12_Conclusione() {
  const containerRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.s12-title', { y: 60, opacity: 0, duration: 1.5, ease: 'power3.out', delay: 0.2 });
      gsap.from('.s12-sub', { y: 30, opacity: 0, duration: 1, ease: 'power2.out', delay: 0.8 });
      gsap.from('.s12-body', { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 1.2 });
      gsap.from('.s12-stat', { scale: 0, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(2)', delay: 1.6 });
      
      if (signatureRef.current) {
        gsap.fromTo(signatureRef.current,
          { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
          {
            opacity: 1, scale: 1, filter: 'blur(0px)',
            duration: 2,
            ease: 'power3.out',
            delay: 2.5
          }
        );
        
        gsap.to(signatureRef.current, {
          textShadow: '0 0 60px rgba(0,220,255,1), 0 0 120px rgba(0,220,255,0.5)',
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 4.5
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col items-center justify-center text-center px-6 md:px-16">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
        <img src={finaleBg} alt="Mondo acquatico" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,100,200,0.2)_0%,_transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-4xl flex flex-col items-center">
        <div className="s12-title text-xs md:text-sm tracking-[0.3em] uppercase text-cyan-400 mb-4">Fine del Viaggio</div>
        
        <h1 className="s12-title text-5xl md:text-7xl font-black tracking-tighter text-white mb-6"
            style={{ textShadow: '0 0 60px rgba(0,200,255,0.5), 0 0 120px rgba(0,200,255,0.2)' }}>
          La Meraviglia<br />del Mondo Acquatico
        </h1>
        
        <p className="s12-sub text-base md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
          Dai fondali abissali agli stagni di campagna, dal Cretaceo ai giorni nostri, pesci e anfibi
          continuano a sorprenderci con la loro straordinaria capacità di adattamento e la loro biodiversità unica.
          Proteggerli significa proteggere l'intero ecosistema del nostro pianeta.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-12 w-full max-w-lg">
          {[
            { n: '41k+', l: 'Specie totali' },
            { n: '360M', l: 'Anni di storia' },
            { n: '~40%', l: 'Specie a rischio' }
          ].map((s, i) => (
            <div key={i} className="s12-stat rounded-xl p-4 border border-cyan-500/20"
                 style={{ background: 'rgba(0,30,60,0.5)', backdropFilter: 'blur(8px)' }}>
              <div className="text-2xl font-black text-cyan-400 mb-1">{s.n}</div>
              <div className="text-xs text-white/50 uppercase tracking-wide">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Central large signature */}
        <div ref={signatureRef} className="mt-4 text-center">
          <div className="text-xs uppercase tracking-[0.4em] text-white/30 mb-3">presentazione realizzata da</div>
          <div
            className="text-3xl md:text-4xl font-bold tracking-widest lowercase"
            style={{
              color: 'rgba(0,220,255,1)',
              textShadow: '0 0 30px rgba(0,220,255,0.8), 0 0 60px rgba(0,220,255,0.4)'
            }}
          >
            scripted by jakub
          </div>
        </div>
      </div>
    </div>
  );
}

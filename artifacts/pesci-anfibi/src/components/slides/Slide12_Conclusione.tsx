import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import finaleBg from '@/assets/images/finale-bg.png';

export default function Slide12_Conclusione() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.s12-bg', { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4 }, 0)
        .fromTo('.s12-badge', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.8)
        .fromTo('.s12-title', { y: 50, opacity: 0, filter: 'blur(12px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1 }, 1)
        .fromTo('.s12-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.7)
        .fromTo('.s12-body', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 2)
        .fromTo('.s12-sig', { scale: 0.8, opacity: 0, filter: 'blur(8px)' }, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'back.out(1.5)' }, 2.5)
        .fromTo('.s12-stat', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.8)' }, 2.2);

      gsap.to('.s12-title', { y: -6, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3 });
      gsap.to('.s12-sig', { textShadow: '0 0 60px rgba(0,220,255,0.9), 0 0 120px rgba(0,200,255,0.5)', duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3.5 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Cinematic background */}
      <div className="s12-bg absolute inset-0 z-0">
        <img src={finaleBg} alt="Finale" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(0,10,40,0.7) 0%, rgba(0,3,15,0.92) 100%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(160deg, transparent, transparent 80px, rgba(0,180,255,0.03) 80px, rgba(0,180,255,0.03) 160px)' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
        <div className="s12-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 mb-5"
             style={{ background: 'rgba(0,100,200,0.1)', backdropFilter: 'blur(8px)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs tracking-[0.3em] uppercase text-cyan-400/90">Fine presentazione</span>
        </div>

        <h2 className="s12-title text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white mb-4 leading-tight"
            style={{ textShadow: '0 0 40px rgba(0,200,255,0.4)' }}>
          Natura Straordinaria
        </h2>

        <p className="s12-sub text-base sm:text-xl text-cyan-300/80 font-light tracking-wide mb-4">
          Dal fondo degli oceani alle cime delle Ande
        </p>

        <p className="s12-body text-sm text-white/45 max-w-xl leading-relaxed mb-6">
          Pesci e anfibi rappresentano oltre 41.000 specie — una finestra aperta su 500 milioni di anni di evoluzione. Proteggerli significa proteggere ogni ecosistema che li ospita, e con esso il nostro futuro.
        </p>

        <div className="flex gap-4 mb-8">
          {[
            { n: '33.000+', l: 'Specie di pesci', c: '#00c8ff' },
            { n: '8.000+', l: 'Specie di anfibi', c: '#66ff88' },
            { n: '1/3', l: 'A rischio estinzione', c: '#ff6644' },
          ].map((s, i) => (
            <div key={i} className="s12-stat flex flex-col items-center gap-0.5 px-4 py-3 rounded-xl border"
                 style={{ background: 'rgba(0,10,30,0.6)', backdropFilter: 'blur(10px)', borderColor: `${s.c}25` }}>
              <div className="text-lg sm:text-2xl font-black" style={{ color: s.c }}>{s.n}</div>
              <div className="text-[10px] text-white/40 text-center">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Author signature — large, centered, glowing */}
        <div className="s12-sig font-mono tracking-[0.35em] uppercase text-lg sm:text-2xl font-bold"
             style={{
               color: 'rgba(0,220,255,0.9)',
               textShadow: '0 0 30px rgba(0,220,255,0.6), 0 0 60px rgba(0,200,255,0.3)',
               letterSpacing: '0.3em'
             }}>
          scripted by jakub
        </div>
      </div>
    </div>
  );
}

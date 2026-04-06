import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import introBg from '@/assets/images/intro-bg.png';

export default function Slide01_Intro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(imgRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6 }, 0
      )
      .fromTo('.s01-badge', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.5)
      .fromTo('.s01-title', { y: 50, opacity: 0, filter: 'blur(12px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1 }, 0.7)
      .fromTo('.s01-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 1.2)
      .fromTo('.s01-body', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 1.5)
      .fromTo('.s01-hint', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 2);

      gsap.to('.s01-title', { y: -8, duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Cinematic image background */}
      <div ref={imgRef} className="absolute inset-0 z-0">
        <img src={introBg} alt="Oceano" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,5,20,0.85) 0%, rgba(0,10,40,0.6) 50%, rgba(0,5,20,0.9) 100%)' }} />
        {/* Light rays */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(170deg, transparent, transparent 60px, rgba(0,150,255,0.04) 60px, rgba(0,150,255,0.04) 120px)',
          animation: 'rayShift 8s ease-in-out infinite alternate'
        }} />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
        <div className="s01-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 mb-5"
             style={{ background: 'rgba(0,150,255,0.1)', backdropFilter: 'blur(8px)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs tracking-[0.3em] uppercase text-cyan-400/90">Presentazione interattiva</span>
        </div>

        <h1 className="s01-title text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white leading-none mb-4"
            style={{ textShadow: '0 0 60px rgba(0,200,255,0.5), 0 0 120px rgba(0,200,255,0.2)' }}>
          Pesci &<br />Anfibi
        </h1>

        <p className="s01-sub text-lg sm:text-xl text-cyan-300/80 font-light tracking-wide mb-5">
          Un viaggio nel cuore del mondo acquatico
        </p>

        <p className="s01-body text-sm sm:text-base text-white/50 max-w-lg leading-relaxed">
          Immergiamoci insieme tra oceani, fiumi e paludi per scoprire i segreti di due classi straordinarie di vertebrati che abitano il nostro pianeta da centinaia di milioni di anni.
        </p>

        <div className="s01-hint mt-8 flex items-center gap-2 text-white/30 text-xs tracking-widest uppercase">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
          </svg>
          Freccia destra per iniziare
        </div>
      </div>

      <style>{`
        @keyframes rayShift { from { transform: translateX(-20px); } to { transform: translateX(20px); } }
      `}</style>
    </div>
  );
}

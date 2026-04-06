import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import introBg from '@/assets/images/intro-bg.png';

export default function Slide01_Intro() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.slide01-title', { y: 60, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 });
      gsap.from('.slide01-sub', { y: 30, opacity: 0, duration: 1, ease: 'power2.out', delay: 0.6 });
      gsap.from('.slide01-body', { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 1 });
      gsap.from('.slide01-fish', { x: -200, opacity: 0, duration: 1.5, ease: 'power2.out', delay: 0.4, stagger: 0.15 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col items-center justify-center text-center px-6 md:px-16">
      {/* Background image overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
        <img src={introBg} alt="Underwater scene" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Animated fish silhouettes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="slide01-fish absolute"
            style={{
              top: `${20 + i * 12}%`,
              left: `${-5 + i * 5}%`,
              fontSize: `${1.5 + i * 0.4}rem`,
              opacity: 0.4 - i * 0.05,
              animation: `fishSwim${i} ${8 + i * 2}s linear infinite`
            }}
          >
            &#x1F41F;
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl">
        <div className="slide01-title text-[0.8rem] md:text-sm tracking-[0.3em] uppercase text-cyan-400 mb-4 font-light">
          Benvenuti nel
        </div>
        <h1 className="slide01-title text-5xl md:text-8xl font-black tracking-tighter text-white mb-6"
            style={{ textShadow: '0 0 60px rgba(0,200,255,0.5), 0 0 120px rgba(0,200,255,0.2)' }}>
          Mondo Acquatico
        </h1>
        <p className="slide01-sub text-xl md:text-3xl text-cyan-300/80 font-light tracking-wide mb-8">
          Pesci & Anfibi
        </p>
        <p className="slide01-body text-base md:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
          Immergiamoci insieme in un viaggio straordinario attraverso gli habitat acquatici della Terra,
          scoprendo i segreti dei pesci e degli anfibi — creature che hanno conquistato oceani, fiumi, laghi e paludi.
        </p>

        <div className="slide01-body mt-12 flex items-center justify-center gap-2 text-cyan-400/60 text-sm tracking-widest">
          <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Premi la freccia destra per iniziare
        </div>
      </div>

      <style>{`
        @keyframes fishSwim0 { 0% { transform: translateX(-200px); } 100% { transform: translateX(120vw); } }
        @keyframes fishSwim1 { 0% { transform: translateX(-200px); } 100% { transform: translateX(120vw); } }
        @keyframes fishSwim2 { 0% { transform: translateX(-200px); } 100% { transform: translateX(120vw); } }
        @keyframes fishSwim3 { 0% { transform: translateX(-200px); } 100% { transform: translateX(120vw); } }
        @keyframes fishSwim4 { 0% { transform: translateX(-200px); } 100% { transform: translateX(120vw); } }
      `}</style>
    </div>
  );
}

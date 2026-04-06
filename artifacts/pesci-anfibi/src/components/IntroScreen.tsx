import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface IntroScreenProps {
  onStart: () => void;
}

export function IntroScreen({ onStart }: IntroScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
      "-=0.5"
    )
    .fromTo(buttonRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
      "-=0.2"
    );

    // Subtle floating animation for title
    gsap.to(titleRef.current, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, []);

  const handleStart = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.1,
      filter: 'blur(20px)',
      duration: 1,
      ease: 'power2.inOut',
      onComplete: onStart
    });
  };

  return (
    <div ref={containerRef} className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden">
      {/* Deep water background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-black" />
      
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-[0_0_30px_rgba(0,200,255,0.6)] mb-6"
          style={{ textShadow: '0 0 40px hsl(var(--primary) / 0.5), 0 0 80px hsl(var(--primary) / 0.3)' }}
        >
          PESCI E ANFIBI
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-3xl text-primary-foreground/90 font-light tracking-widest uppercase mb-16"
        >
          Un viaggio nel mondo acquatico
        </p>
        
        <button
          ref={buttonRef}
          onClick={handleStart}
          className="group relative px-10 py-5 bg-transparent border border-primary/50 rounded-full overflow-hidden transition-all duration-500 hover:border-primary hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)]"
        >
          <div className="absolute inset-0 bg-primary/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative text-white tracking-widest uppercase text-sm md:text-base font-medium flex items-center gap-3">
            Avvia Presentazione
            <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        </button>
      </div>
    </div>
  );
}

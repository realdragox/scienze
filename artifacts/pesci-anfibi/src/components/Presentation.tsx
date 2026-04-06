import React, { useState, useRef, Suspense, useCallback } from 'react';
import gsap from 'gsap';
import { useSlideNavigation } from '@/hooks/useSlideNavigation';
import { AquaticBackground } from './AquaticBackground';

const Slide01 = React.lazy(() => import('./slides/Slide01_Intro'));
const Slide02 = React.lazy(() => import('./slides/Slide02_PesciOverview'));
const Slide03 = React.lazy(() => import('./slides/Slide03_TipiPesci'));
const Slide04 = React.lazy(() => import('./slides/Slide04_AnatomiaPesci'));
const Slide05 = React.lazy(() => import('./slides/Slide05_HabitatPesci'));
const Slide06 = React.lazy(() => import('./slides/Slide06_AnfibiOverview'));
const Slide07 = React.lazy(() => import('./slides/Slide07_CicloVitale'));
const Slide08 = React.lazy(() => import('./slides/Slide08_AnatomiaAnfibi'));
const Slide09 = React.lazy(() => import('./slides/Slide09_Differenze'));
const Slide10 = React.lazy(() => import('./slides/Slide10_HabitatAnfibi'));
const Slide11 = React.lazy(() => import('./slides/Slide11_Curiosita'));
const Slide12 = React.lazy(() => import('./slides/Slide12_Conclusione'));

const SLIDES = [
  Slide01, Slide02, Slide03, Slide04, Slide05, Slide06,
  Slide07, Slide08, Slide09, Slide10, Slide11, Slide12
];

interface PresentationProps {
  onSlideChange?: (index: number) => void;
}

export function Presentation({ onSlideChange }: PresentationProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const slideRef = useRef<HTMLDivElement>(null);
  const totalSlides = SLIDES.length;

  const handleSlideChange = useCallback((newIndex: number) => {
    if (isTransitioning || newIndex === currentSlideIndex || newIndex < 0 || newIndex >= totalSlides) return;
    const dir = newIndex > currentSlideIndex ? 'next' : 'prev';
    setDirection(dir);
    setIsTransitioning(true);

    const xOut = dir === 'next' ? -80 : 80;
    const xIn = dir === 'next' ? 80 : -80;

    gsap.to(slideRef.current, {
      x: xOut,
      opacity: 0,
      filter: 'blur(8px)',
      scale: 0.97,
      duration: 0.45,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentSlideIndex(newIndex);
        onSlideChange?.(newIndex);
        gsap.fromTo(slideRef.current,
          { x: xIn, opacity: 0, filter: 'blur(8px)', scale: 0.97 },
          { x: 0, opacity: 1, filter: 'blur(0px)', scale: 1, duration: 0.55, ease: 'power2.out', onComplete: () => setIsTransitioning(false) }
        );
      }
    });
  }, [isTransitioning, currentSlideIndex, totalSlides, onSlideChange]);

  const { onTouchStart, onTouchMove, onTouchEnd } = useSlideNavigation(
    currentSlideIndex, totalSlides, handleSlideChange
  );

  const CurrentSlideComponent = SLIDES[currentSlideIndex];
  const environment = currentSlideIndex < 5 ? 'ocean' : currentSlideIndex < 10 ? 'swamp' : 'deep';

  const canPrev = currentSlideIndex > 0 && !isTransitioning;
  const canNext = currentSlideIndex < totalSlides - 1 && !isTransitioning;

  return (
    <div
      className="relative w-full h-full select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Underwater background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="bg-background w-full h-full" />}>
          <AquaticBackground environment={environment} />
        </Suspense>
      </div>

      {/* Slide content */}
      <div
        ref={slideRef}
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{ paddingBottom: '72px' }}
      >
        <div className="w-full h-full flex items-center justify-center px-4 sm:px-10 md:px-16 py-4">
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center gap-4 text-primary">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm tracking-widest uppercase text-primary/70">Caricamento...</p>
            </div>
          }>
            <CurrentSlideComponent />
          </Suspense>
        </div>
      </div>

      {/* LEFT ARROW - big, always visible */}
      <button
        onClick={() => handleSlideChange(currentSlideIndex - 1)}
        disabled={!canPrev}
        aria-label="Slide precedente"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border transition-all duration-300 disabled:opacity-20 disabled:cursor-default"
        style={{
          background: canPrev ? 'rgba(0,30,60,0.7)' : 'rgba(0,10,30,0.4)',
          backdropFilter: 'blur(12px)',
          borderColor: canPrev ? 'rgba(0,200,255,0.5)' : 'rgba(255,255,255,0.1)',
          boxShadow: canPrev ? '0 0 20px rgba(0,200,255,0.2)' : 'none'
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* RIGHT ARROW - big, prominent */}
      <button
        onClick={() => handleSlideChange(currentSlideIndex + 1)}
        disabled={!canNext}
        aria-label="Slide successiva"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border transition-all duration-300 disabled:opacity-20 disabled:cursor-default"
        style={{
          background: canNext ? 'rgba(0,180,255,0.2)' : 'rgba(0,10,30,0.4)',
          backdropFilter: 'blur(12px)',
          borderColor: canNext ? 'rgba(0,200,255,0.7)' : 'rgba(255,255,255,0.1)',
          boxShadow: canNext ? '0 0 30px rgba(0,200,255,0.4), inset 0 0 20px rgba(0,200,255,0.1)' : 'none',
          animation: canNext ? 'navPulse 2.5s ease-in-out infinite' : 'none'
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-300">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* Bottom navigation bar */}
      <div className="absolute bottom-0 left-0 right-0 z-50 flex items-center justify-center pb-4 pt-2"
           style={{ background: 'linear-gradient(to top, rgba(0,5,20,0.8) 0%, transparent 100%)' }}>
        <div className="flex items-center gap-2 sm:gap-3 px-5 py-2 rounded-full border border-white/10"
             style={{ background: 'rgba(0,10,30,0.6)', backdropFilter: 'blur(16px)' }}>
          {/* Dot indicators */}
          <div className="hidden sm:flex items-center gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSlideChange(i)}
                disabled={isTransitioning}
                className="transition-all duration-300"
                style={{
                  width: i === currentSlideIndex ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i === currentSlideIndex ? 'rgba(0,200,255,1)' : 'rgba(255,255,255,0.25)',
                  boxShadow: i === currentSlideIndex ? '0 0 10px rgba(0,200,255,0.6)' : 'none'
                }}
              />
            ))}
          </div>

          {/* Counter */}
          <span className="text-sm font-bold tracking-widest font-mono"
                style={{ color: 'rgba(0,200,255,0.9)', minWidth: '44px', textAlign: 'center' }}>
            {currentSlideIndex + 1}<span className="text-white/30">/{totalSlides}</span>
          </span>
        </div>
      </div>

      <style>{`
        @keyframes navPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0,200,255,0.3), inset 0 0 15px rgba(0,200,255,0.1); }
          50% { box-shadow: 0 0 40px rgba(0,200,255,0.6), inset 0 0 25px rgba(0,200,255,0.2); }
        }
      `}</style>
    </div>
  );
}

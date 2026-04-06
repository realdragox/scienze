import React, { useState, useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import { useSlideNavigation } from '@/hooks/useSlideNavigation';
import { SlideContainer } from './SlideContainer';
import { AquaticBackground } from './AquaticBackground';

// Lazy load slides to improve initial performance
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
  const slideRef = useRef<HTMLDivElement>(null);
  const nextSlideRef = useRef<HTMLDivElement>(null);
  
  const totalSlides = SLIDES.length;

  const handleSlideChange = (newIndex: number) => {
    if (isTransitioning || newIndex === currentSlideIndex) return;
    
    setIsTransitioning(true);
    
    // Animate out current
    gsap.to(slideRef.current, {
      scale: 0.95,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 0.8,
      ease: 'power2.inOut'
    });

    // We change index halfway through to mount new slide, then animate it in
    setTimeout(() => {
      setCurrentSlideIndex(newIndex);
      onSlideChange?.(newIndex);
      
      gsap.fromTo(slideRef.current, 
        { scale: 1.05, opacity: 0, filter: 'blur(10px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out', onComplete: () => setIsTransitioning(false) }
      );
    }, 800);
  };

  const { onTouchStart, onTouchMove, onTouchEnd } = useSlideNavigation(
    currentSlideIndex,
    totalSlides,
    handleSlideChange
  );

  const CurrentSlideComponent = SLIDES[currentSlideIndex];
  
  // Determine environment based on slide
  const environment = currentSlideIndex < 5 ? 'ocean' : currentSlideIndex < 10 ? 'swamp' : 'deep';

  return (
    <div 
      className="relative w-full h-full"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="bg-background w-full h-full" />}>
          <AquaticBackground environment={environment} />
        </Suspense>
      </div>
      
      <div 
        ref={slideRef}
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
      >
        <div className="pointer-events-auto w-full h-full flex flex-col items-center justify-center p-8 md:p-16">
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center text-primary animate-pulse">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-xl tracking-widest uppercase">Caricamento...</p>
            </div>
          }>
            <CurrentSlideComponent />
          </Suspense>
        </div>
      </div>

      {/* Navigation UI */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-primary/20">
        <button 
          onClick={() => handleSlideChange(currentSlideIndex - 1)}
          disabled={currentSlideIndex === 0 || isTransitioning}
          className="text-white hover:text-primary disabled:opacity-30 disabled:hover:text-white transition-colors"
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        
        <span className="text-sm font-mono tracking-widest text-primary-foreground/80 font-bold w-16 text-center">
          {currentSlideIndex + 1} / {totalSlides}
        </span>
        
        <button 
          onClick={() => handleSlideChange(currentSlideIndex + 1)}
          disabled={currentSlideIndex === totalSlides - 1 || isTransitioning}
          className="text-white hover:text-primary disabled:opacity-30 disabled:hover:text-white transition-colors"
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
      
      {/* Side invisible click areas for easier desktop nav */}
      <div 
        className="absolute left-0 top-0 w-1/6 h-full z-40 cursor-pointer hidden md:block" 
        onClick={() => handleSlideChange(currentSlideIndex - 1)}
      />
      <div 
        className="absolute right-0 top-0 w-1/6 h-full z-40 cursor-pointer hidden md:block" 
        onClick={() => handleSlideChange(currentSlideIndex + 1)}
      />
    </div>
  );
}

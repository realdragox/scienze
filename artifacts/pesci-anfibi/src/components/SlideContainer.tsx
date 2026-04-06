import React, { ReactNode } from 'react';
import { useMouseParallax } from '@/hooks/useMouseParallax';

interface SlideContainerProps {
  children: ReactNode;
  title: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export function SlideContainer({ children, title, className = '', align = 'center' }: SlideContainerProps) {
  const parallax = useMouseParallax(0.015);
  
  const alignClass = align === 'left' ? 'items-start text-left' : 
                     align === 'right' ? 'items-end text-right' : 
                     'items-center text-center';

  return (
    <div 
      className={`w-full max-w-6xl mx-auto flex flex-col ${alignClass} ${className}`}
      style={{
        transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <h2 className="text-4xl md:text-6xl font-bold mb-12 tracking-tight text-white drop-shadow-[0_0_15px_rgba(0,200,255,0.4)]">
        {title}
      </h2>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}

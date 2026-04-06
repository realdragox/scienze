import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import amphibianOverview from '@/assets/images/amphibian-overview.png';

function AnimatedCounter({ target, suffix = '', duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <span>{count.toLocaleString('it-IT')}{suffix}</span>;
}

const stats = [
  { value: 8000, suffix: '+', label: 'Specie Conosciute', desc: 'Distribuiti su tutti i continenti eccetto l\'Antartide' },
  { value: 3, suffix: ' Ordini', label: 'Classificazione', desc: 'Anuri (rane), Urodeli (salamandre), Gimnofioni (ceciliane)' },
  { value: 360, suffix: 'M', label: 'Anni di Storia', desc: 'I primi anfibi colonizzarono la terraferma nel Devoniano' },
];

export default function Slide06_AnfibiOverview() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.s06-title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from('.s06-img', { scale: 0.8, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 });
      gsap.from('.s06-stat', { y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out', delay: 0.5 });
      gsap.from('.s06-trait', { x: -30, opacity: 0, duration: 0.6, stagger: 0.15, delay: 0.8 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto flex flex-col items-center text-center px-4">
      <div className="s06-title text-xs md:text-sm tracking-[0.3em] uppercase mb-3" style={{ color: '#88ff88' }}>Capitolo V</div>
      <h2 className="s06-title text-5xl md:text-7xl font-black tracking-tighter text-white mb-3"
          style={{ textShadow: '0 0 40px rgba(100,255,100,0.3)' }}>
        Gli Anfibi
      </h2>
      <p className="s06-title text-base md:text-xl text-white/50 mb-8 italic">Maestri della doppia vita</p>

      <div className="s06-img w-full max-w-2xl mb-10 rounded-2xl overflow-hidden border"
           style={{ borderColor: 'rgba(100,255,100,0.2)', boxShadow: '0 0 60px rgba(100,255,100,0.1)' }}>
        <img src={amphibianOverview} alt="Rane colorate" className="w-full h-56 md:h-72 object-cover" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-6">
        {stats.map((s, i) => (
          <div key={i} className="s06-stat rounded-2xl p-6 text-center border"
               style={{ background: 'rgba(0,20,10,0.7)', backdropFilter: 'blur(12px)', borderColor: 'rgba(100,255,100,0.15)' }}>
            <div className="text-4xl md:text-5xl font-black mb-2" style={{ color: '#66ff88' }}>
              <AnimatedCounter target={s.value} suffix={s.suffix} duration={1.5 + i * 0.3} />
            </div>
            <div className="text-white font-semibold mb-2 tracking-wide text-sm uppercase">{s.label}</div>
            <div className="text-white/50 text-xs leading-relaxed">{s.desc}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {['Doppia Vita', 'Pelle Permeabile', 'Metamorfosi', 'Ectotermia', 'Uova Gelatinose'].map((trait, i) => (
          <span key={i} className="s06-trait px-4 py-2 rounded-full text-sm border font-medium"
                style={{ background: 'rgba(50,100,50,0.3)', borderColor: 'rgba(100,255,100,0.3)', color: '#88ff88' }}>
            {trait}
          </span>
        ))}
      </div>
    </div>
  );
}

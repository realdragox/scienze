import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import fishOverview from '@/assets/images/fish-overview.png';

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
  { value: 33000, suffix: '+', label: 'Specie Conosciute', desc: 'I pesci sono i vertebrati più numerosi sulla Terra' },
  { value: 70, suffix: '%', label: 'Pesci Ossei', desc: 'La grande maggioranza appartiene alla classe Osteichthyes' },
  { value: 400, suffix: 'M', label: 'Anni di Evoluzione', desc: 'I pesci abitano i nostri oceani da centinaia di milioni di anni' },
];

export default function Slide02_PesciOverview() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.s02-title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
      gsap.from('.s02-img', { scale: 0.8, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 });
      gsap.from('.s02-stat', { y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out', delay: 0.5 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto flex flex-col items-center text-center px-4">
      <div className="s02-title text-xs md:text-sm tracking-[0.3em] uppercase text-cyan-400 mb-3">Capitolo I</div>
      <h2 className="s02-title text-5xl md:text-7xl font-black tracking-tighter text-white mb-8"
          style={{ textShadow: '0 0 40px rgba(0,200,255,0.4)' }}>
        I Pesci
      </h2>

      <div className="s02-img w-full max-w-2xl mb-10 rounded-2xl overflow-hidden border border-cyan-500/20"
           style={{ boxShadow: '0 0 60px rgba(0,150,255,0.2)' }}>
        <img src={fishOverview} alt="Pesci tropicali" className="w-full h-56 md:h-72 object-cover" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {stats.map((s, i) => (
          <div key={i} className="s02-stat rounded-2xl p-6 text-center border border-cyan-500/20"
               style={{ background: 'rgba(0,30,60,0.6)', backdropFilter: 'blur(12px)' }}>
            <div className="text-4xl md:text-5xl font-black text-cyan-400 mb-2">
              <AnimatedCounter target={s.value} suffix={s.suffix} duration={1.5 + i * 0.3} />
            </div>
            <div className="text-white font-semibold mb-2 tracking-wide text-sm uppercase">{s.label}</div>
            <div className="text-white/50 text-xs leading-relaxed">{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

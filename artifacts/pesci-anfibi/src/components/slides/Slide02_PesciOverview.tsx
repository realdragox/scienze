import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import fishOverview from '@/assets/images/fish-overview.png';

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let frame = 0;
    const total = 80;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / total;
      const ease = 1 - Math.pow(1 - progress, 3);
      setN(Math.floor(ease * target));
      if (frame >= total) { setN(target); clearInterval(timer); }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <>{n.toLocaleString('it-IT')}{suffix}</>;
}

export default function Slide02_PesciOverview() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.s02-img', { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2 }, 0)
        .fromTo('.s02-heading', { y: 40, opacity: 0, filter: 'blur(8px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9 }, 0.3)
        .fromTo('.s02-stat', { y: 30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15 }, 0.7);
    }, ref);
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 33000, suf: '+', label: 'Specie', sub: 'I vertebrati più numerosi' },
    { value: 96, suf: '%', label: 'Ossei', sub: 'Pesci con scheletro osseo' },
    { value: 400, suf: 'M', label: 'Anni', sub: 'Di evoluzione nei mari' },
  ];

  return (
    <div ref={ref} className="w-full h-full flex flex-col items-center justify-center px-4 max-w-5xl mx-auto">
      <div className="s02-heading text-center mb-5">
        <div className="text-xs tracking-[0.3em] uppercase text-cyan-400 mb-2">Capitolo I</div>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-white"
            style={{ textShadow: '0 0 40px rgba(0,200,255,0.35)' }}>I Pesci</h2>
      </div>

      <div className="s02-img w-full max-w-xl rounded-2xl overflow-hidden border border-cyan-500/20 mb-5"
           style={{ boxShadow: '0 0 50px rgba(0,150,255,0.2)', position: 'relative' }}>
        <img src={fishOverview} alt="Pesci" className="w-full h-44 sm:h-56 object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,10,30,0.7) 0%, transparent 60%)' }} />
        <div className="absolute bottom-3 left-4 text-white/60 text-xs italic">Pesci tropicali nella barriera corallina</div>
      </div>

      <div className="grid grid-cols-3 gap-3 w-full max-w-xl">
        {stats.map((s, i) => (
          <div key={i} className="s02-stat rounded-xl p-4 text-center border border-cyan-500/15"
               style={{ background: 'rgba(0,20,50,0.7)', backdropFilter: 'blur(10px)' }}>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400 leading-none mb-1">
              <Counter target={s.value} suffix={s.suf} />
            </div>
            <div className="text-white text-xs font-bold uppercase tracking-wide mb-0.5">{s.label}</div>
            <div className="text-white/40 text-[10px] leading-snug">{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

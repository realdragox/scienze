import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import amphibianOverview from '@/assets/images/amphibian-overview.png';

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let frame = 0; const total = 80;
    const t = setInterval(() => {
      frame++;
      const p = 1 - Math.pow(1 - frame / total, 3);
      setN(Math.floor(p * target));
      if (frame >= total) { setN(target); clearInterval(t); }
    }, 16);
    return () => clearInterval(t);
  }, [target]);
  return <>{n.toLocaleString('it-IT')}{suffix}</>;
}

export default function Slide06_AnfibiOverview() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.s06-img', { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2 }, 0)
        .fromTo('.s06-head', { y: 35, opacity: 0, filter: 'blur(8px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9 }, 0.3)
        .fromTo('.s06-stat', { y: 25, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15 }, 0.7)
        .fromTo('.s06-tag', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(2)' }, 1.1);
    }, ref);
    return () => ctx.revert();
  }, []);

  const stats = [
    { v: 8000, s: '+', l: 'Specie' },
    { v: 3, s: ' ordini', l: 'Classificazione' },
    { v: 360, s: 'M anni', l: 'Di storia' },
  ];

  return (
    <div ref={ref} className="w-full h-full flex flex-col items-center justify-center px-4 max-w-5xl mx-auto">
      <div className="s06-head text-center mb-4">
        <div className="text-xs tracking-[0.3em] uppercase mb-1" style={{ color: '#66ff88' }}>Capitolo V</div>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-white"
            style={{ textShadow: '0 0 40px rgba(100,255,100,0.3)' }}>Gli Anfibi</h2>
        <p className="text-white/45 text-sm italic mt-1">Maestri della doppia vita</p>
      </div>

      <div className="s06-img w-full max-w-xl rounded-2xl overflow-hidden border mb-5 relative"
           style={{ borderColor: 'rgba(100,255,100,0.2)', boxShadow: '0 0 50px rgba(100,255,100,0.1)' }}>
        <img src={amphibianOverview} alt="Anfibi" className="w-full object-cover" style={{ height: '160px' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,10,5,0.7) 0%, transparent 60%)' }} />
      </div>

      <div className="grid grid-cols-3 gap-3 w-full max-w-xl mb-4">
        {stats.map((s, i) => (
          <div key={i} className="s06-stat rounded-xl p-3 text-center border"
               style={{ background: 'rgba(0,20,10,0.7)', backdropFilter: 'blur(10px)', borderColor: 'rgba(100,255,100,0.15)' }}>
            <div className="text-xl sm:text-2xl font-black mb-0.5" style={{ color: '#66ff88' }}>
              <Counter target={s.v} suffix={s.s} />
            </div>
            <div className="text-white text-xs font-bold uppercase tracking-wide">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {['Doppia vita', 'Pelle permeabile', 'Metamorfosi', 'Ectotermia', 'Uova gelatinose'].map((t, i) => (
          <span key={i} className="s06-tag px-3 py-1 rounded-full text-xs font-semibold border"
                style={{ background: 'rgba(50,100,50,0.3)', borderColor: 'rgba(100,255,100,0.3)', color: '#88ff88' }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

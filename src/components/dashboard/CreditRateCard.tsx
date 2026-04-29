import { useEffect, useState } from "react";

export const CreditRateCard = () => {
  const value = 803;
  const max = 1000;
  const targetPct = value / max;
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      setPct(targetPct * eased);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [targetPct]);

  const r = 60;
  const C = Math.PI * r;
  const dash = C * pct;
  // angle for handle position along the half-arc (0..PI)
  const angle = Math.PI * pct;
  const cx = 80 - r * Math.cos(angle);
  const cy = 80 - r * Math.sin(angle);

  // pill follows handle
  const displayed = Math.round(value * (pct / targetPct || 1));

  return (
    <div className="glass-card rounded-[2rem] p-6 flex flex-col items-center animate-fade-in relative overflow-hidden">
      <div className="pointer-events-none absolute -bottom-16 inset-x-0 h-40 bg-[radial-gradient(ellipse,hsl(268_85%_60%/0.25),transparent_70%)] blur-2xl" />

      <p className="text-foreground text-sm mb-3 relative">Creadit rate</p>

      <div className="relative w-44 h-24">
        <svg viewBox="0 0 160 100" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(225 95% 65%)" />
              <stop offset="50%" stopColor="hsl(268 85% 72%)" />
              <stop offset="100%" stopColor="hsl(320 90% 78%)" />
            </linearGradient>
            <filter id="arcGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* track */}
          <path d="M 20 80 A 60 60 0 0 1 140 80" stroke="hsl(230 35% 16%)" strokeWidth="11" fill="none" strokeLinecap="round" />
          {/* progress */}
          <path
            d="M 20 80 A 60 60 0 0 1 140 80"
            stroke="url(#arcGrad)"
            strokeWidth="11"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${C}`}
            filter="url(#arcGlow)"
          />
          {/* end handle */}
          <circle cx={cx} cy={cy} r="7" fill="hsl(225 95% 70%)" stroke="hsl(220 30% 96%)" strokeWidth="1.5" filter="url(#arcGlow)" />
        </svg>

        {/* pill that follows */}
        <div
          className="absolute grad-button text-white text-[10px] px-2 py-0.5 rounded-full shadow-lg pointer-events-none"
          style={{
            left: `${(cx / 160) * 100}%`,
            top: `${(cy / 100) * 100}%`,
            transform: "translate(-50%, -180%)",
          }}
        >
          Apx
        </div>
      </div>

      <p className="text-3xl font-semibold tracking-tight mt-1 tabular-nums">{displayed}</p>
    </div>
  );
};

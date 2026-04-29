import { useEffect, useState } from "react";

const segs = [
  { color: "url(#g1)", len: 32, label: "24-36", labelPos: { top: "8%", right: "8%" } },
  { color: "url(#g2)", len: 26 },
  { color: "url(#g3)", len: 22, label: "18-24", labelPos: { bottom: "12%", right: "6%" } },
  { color: "url(#g4)", len: 20, label: "0-18", labelPos: { top: "46%", left: "4%" } },
];

export const AgeDonutCard = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(t);
  }, []);

  const C = 2 * Math.PI * 42;
  let acc = 0;

  return (
    <div className="glass-card card-hover rounded-[2rem] p-5 flex items-center justify-center relative overflow-hidden min-h-[200px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(268_85%_60%/0.22),transparent_65%)] animate-halo" />

      {segs.filter(s => s.label).map((s, i) => (
        <div
          key={i}
          className="absolute text-[10px] text-muted-foreground bg-secondary/70 backdrop-blur-sm px-2 py-0.5 rounded-full border border-border/50"
          style={s.labelPos}
        >
          {s.label}
        </div>
      ))}

      <svg viewBox="0 0 100 100" className="w-32 h-32 -rotate-90 relative animate-float" style={{ animationDuration: "8s" }}>
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(268 90% 78%)" />
            <stop offset="100%" stopColor="hsl(245 90% 70%)" />
          </linearGradient>
          <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(225 95% 72%)" />
            <stop offset="100%" stopColor="hsl(210 90% 65%)" />
          </linearGradient>
          <linearGradient id="g3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(195 90% 75%)" />
            <stop offset="100%" stopColor="hsl(210 85% 70%)" />
          </linearGradient>
          <linearGradient id="g4" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(320 85% 80%)" />
            <stop offset="100%" stopColor="hsl(290 80% 72%)" />
          </linearGradient>
          <filter id="donutGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* track */}
        <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(230 35% 14%)" strokeWidth="14" />

        {segs.map((s, i) => {
          const dash = mounted ? (s.len / 100) * C : 0;
          const offset = -((acc / 100) * C);
          acc += s.len;
          return (
            <circle
              key={i}
              cx="50" cy="50" r="42"
              fill="none"
              stroke={s.color}
              strokeWidth="14"
              strokeDasharray={`${dash} ${C}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
              filter="url(#donutGlow)"
              style={{ transition: "stroke-dasharray 1200ms cubic-bezier(.2,.8,.2,1)", transitionDelay: `${i * 150}ms` }}
            />
          );
        })}
      </svg>
    </div>
  );
};

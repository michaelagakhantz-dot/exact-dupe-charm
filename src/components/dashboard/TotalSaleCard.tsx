import { Calendar, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const bars = [
  { h: 55, label: "Feb" },
  { h: 65, label: "Feb" },
  { h: 70, label: "Feb" },
  { h: 60, label: "Feb" },
  { h: 95, label: "Feb", highlight: true },
  { h: 72, label: "Feb" },
  { h: 78, label: "Feb" },
];

export const TotalSaleCard = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="glass-card rounded-[2rem] p-7 animate-fade-in relative overflow-hidden group">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-24 -right-20 w-72 h-72 rounded-full bg-[radial-gradient(circle,hsl(268_85%_60%/0.25),transparent_70%)] blur-2xl" />

      <div className="flex items-start justify-between mb-2 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground bg-secondary/40">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <p className="text-muted-foreground text-base">Total sale</p>
            <p className="text-3xl font-semibold tracking-tight">
              90<span className="text-muted-foreground">,744</span>
            </p>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all">
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* chart */}
      <div className="mt-8 relative h-[200px]">
        <svg viewBox="0 0 420 200" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="barFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(230 35% 22%)" />
              <stop offset="100%" stopColor="hsl(230 35% 12%)" />
            </linearGradient>
            <linearGradient id="barHi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(268 85% 75%)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(225 95% 65%)" stopOpacity="0.15" />
            </linearGradient>
            <pattern id="hatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="8" stroke="hsl(268 85% 75%)" strokeWidth="2.5" strokeOpacity="0.85" />
            </pattern>
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {bars.map((b, i) => {
            const w = 38;
            const gap = 18;
            const x = 10 + i * (w + gap);
            const maxH = 170;
            const h = mounted ? (b.h / 100) * maxH : 0;
            const y = 180 - h;
            return (
              <g key={i} style={{ transition: `all 900ms cubic-bezier(.2,.8,.2,1)`, transitionDelay: `${i * 80}ms` }}>
                {b.highlight && (
                  <rect x={x - 4} y={y - 6} width={w + 8} height={h + 6} rx="14" fill="url(#barHi)" filter="url(#softGlow)" />
                )}
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  rx="12"
                  fill={b.highlight ? "url(#barHi)" : "url(#barFill)"}
                  stroke={b.highlight ? "hsl(268 85% 75% / 0.4)" : "transparent"}
                  strokeWidth="1"
                />
                {b.highlight && (
                  <rect x={x} y={y} width={w} height={h} rx="12" fill="url(#hatch)" />
                )}
                {/* dot on top */}
                <circle cx={x + w / 2} cy={y} r="3" fill="hsl(220 30% 96%)" opacity="0.7" />
                <text x={x + w / 2} y={196} textAnchor="middle" fill="hsl(220 15% 60%)" fontSize="11">
                  {b.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

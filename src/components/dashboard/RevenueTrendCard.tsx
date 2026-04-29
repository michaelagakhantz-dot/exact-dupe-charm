import { TrendingUp, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const trend = [
  [40, 55], [120, 50], [200, 58], [280, 62], [360, 55],
  [440, 48], [520, 50], [600, 42], [680, 35], [760, 28],
];
const base = [
  [40, 78], [120, 82], [200, 80], [280, 85], [360, 88],
  [440, 86], [520, 82], [600, 78], [680, 70], [760, 60],
];

const toPath = (pts: number[][]) =>
  pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");

export const RevenueTrendCard = () => {
  const trendRef = useRef<SVGPathElement>(null);
  const baseRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState({ t: 0, b: 0 });
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    if (trendRef.current && baseRef.current) {
      setLen({
        t: trendRef.current.getTotalLength(),
        b: baseRef.current.getTotalLength(),
      });
      requestAnimationFrame(() => setDraw(true));
    }
  }, []);

  const area = `${toPath(trend)} L 760 110 L 40 110 Z`;

  return (
    <div className="glass-card card-hover rounded-[2rem] p-7 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-20 left-1/3 w-96 h-40 bg-[radial-gradient(ellipse,hsl(225_95%_60%/0.22),transparent_70%)] blur-2xl animate-halo" />

      <div className="flex items-start justify-between mb-1 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground bg-secondary/40">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xl font-medium">Revenue trend</p>
            <p className="text-sm text-muted-foreground">Summery Statistics</p>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all">
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-6 mt-5 text-sm flex-wrap">
        <span><span className="font-semibold">1.2 </span><span className="text-muted-foreground">Min</span></span>
        <span><span className="font-semibold">5.33 </span><span className="text-muted-foreground">Max</span></span>
        <span><span className="font-semibold">2.43 </span><span className="text-muted-foreground">Average</span></span>
        <span className="ml-auto"><span className="font-semibold">1 </span><span className="text-muted-foreground">Day</span></span>
        <span><span className="font-semibold">1 </span><span className="text-muted-foreground">Week</span></span>
      </div>

      <div className="relative mt-6">
        <div className="absolute left-0 top-2 text-xs text-muted-foreground">2025</div>
        <div className="absolute left-0 bottom-10 text-xs text-muted-foreground">2024</div>

        <svg viewBox="0 0 800 130" className="w-full h-44 overflow-visible">
          <defs>
            <pattern id="stripes" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="10" stroke="hsl(225 95% 65% / 0.55)" strokeWidth="3" />
            </pattern>
            <linearGradient id="areaFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(268 85% 70%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(225 95% 65%)" stopOpacity="0" />
            </linearGradient>
            <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* soft area underlay */}
          <path d={area} fill="url(#areaFade)" />
          {/* striped overlay */}
          <path d={area} fill="url(#stripes)" />

          {/* base line */}
          <path
            ref={baseRef}
            d={toPath(base)}
            stroke="hsl(220 30% 96%)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray={len.b}
            strokeDashoffset={draw ? 0 : len.b}
            style={{ transition: "stroke-dashoffset 2200ms cubic-bezier(.22,1,.36,1)" }}
          />
          {base.map(([x, y], i) => (
            <circle
              key={i} cx={x} cy={y} r="3"
              fill="hsl(230 60% 4%)" stroke="hsl(220 30% 96%)" strokeWidth="1.5"
              opacity={draw ? 1 : 0}
              style={{ transition: `opacity 400ms`, transitionDelay: `${800 + i * 60}ms` }}
            />
          ))}

          {/* trend line */}
          <path
            ref={trendRef}
            d={toPath(trend)}
            stroke="hsl(220 30% 96%)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#lineGlow)"
            strokeDasharray={len.t}
            strokeDashoffset={draw ? 0 : len.t}
            style={{ transition: "stroke-dashoffset 2200ms cubic-bezier(.22,1,.36,1) 250ms" }}
          />
          {trend.map(([x, y], i) => (
            <circle
              key={i} cx={x} cy={y} r="3"
              fill="hsl(230 60% 4%)" stroke="hsl(220 30% 96%)" strokeWidth="1.5"
              opacity={draw ? 1 : 0}
              style={{ transition: `opacity 400ms`, transitionDelay: `${1000 + i * 60}ms` }}
            />
          ))}

          {/* +5% pill */}
          <g transform="translate(440, 60)" opacity={draw ? 1 : 0} style={{ transition: "opacity 600ms 1600ms" }}>
            <rect x="-22" y="-12" width="44" height="22" rx="11" fill="hsl(268 85% 70%)" />
            <text x="0" y="3" textAnchor="middle" fill="white" fontSize="11" fontWeight="500">+5 %</text>
          </g>
        </svg>

        <div className="relative mt-2 h-1 rounded-full bg-secondary">
          <div className="absolute left-0 top-0 h-1 w-1/2 rounded-full" style={{ background: "var(--grad-arc)" }} />
          <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-foreground border-2 border-background shadow-md" />
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">15 Jun</p>
      </div>
    </div>
  );
};

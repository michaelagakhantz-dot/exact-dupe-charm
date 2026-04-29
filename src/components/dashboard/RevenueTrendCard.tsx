import { TrendingUp, ArrowUpRight } from "lucide-react";

export const RevenueTrendCard = () => {
  // baseline points (2024) and trend points (2025)
  const trend = [
    [40, 55], [120, 50], [200, 58], [280, 62], [360, 55], [440, 48], [520, 50], [600, 42], [680, 35], [760, 28],
  ];
  const base = [
    [40, 78], [120, 82], [200, 80], [280, 85], [360, 88], [440, 86], [520, 82], [600, 78], [680, 70], [760, 60],
  ];

  const toPath = (pts: number[][]) => pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const area = `${toPath(trend)} L 760 110 L 40 110 Z`;

  return (
    <div className="glass-card rounded-[2rem] p-7 animate-fade-in">
      <div className="flex items-start justify-between mb-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xl font-medium">Revenue trend</p>
            <p className="text-sm text-muted-foreground">Summery Statistics</p>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-6 mt-5 text-sm">
        <span><span className="font-semibold">1.2 </span><span className="text-muted-foreground">Min</span></span>
        <span><span className="font-semibold">5.33 </span><span className="text-muted-foreground">Max</span></span>
        <span><span className="font-semibold">2.43 </span><span className="text-muted-foreground">Average</span></span>
        <span className="ml-auto"><span className="font-semibold">1 </span><span className="text-muted-foreground">Day</span></span>
        <span><span className="font-semibold">1 </span><span className="text-muted-foreground">Week</span></span>
      </div>

      <div className="relative mt-6">
        <div className="absolute left-0 top-2 text-xs text-muted-foreground">2025</div>
        <div className="absolute left-0 bottom-8 text-xs text-muted-foreground">2024</div>

        <svg viewBox="0 0 800 130" className="w-full h-44">
          <defs>
            <pattern id="stripes" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="10" stroke="hsl(225 95% 65% / 0.7)" strokeWidth="3" />
            </pattern>
          </defs>
          <path d={area} fill="url(#stripes)" />
          {/* trend line */}
          <path d={toPath(trend)} stroke="hsl(220 30% 96%)" strokeWidth="1.5" fill="none" />
          {trend.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="hsl(230 60% 4%)" stroke="hsl(220 30% 96%)" strokeWidth="1.5" />
          ))}
          {/* base line */}
          <path d={toPath(base)} stroke="hsl(220 30% 96%)" strokeWidth="1.5" fill="none" />
          {base.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="hsl(230 60% 4%)" stroke="hsl(220 30% 96%)" strokeWidth="1.5" />
          ))}
          {/* +5% pill */}
          <g transform="translate(440, 60)">
            <rect x="-22" y="-12" width="44" height="22" rx="11" fill="hsl(268 85% 70%)" />
            <text x="0" y="3" textAnchor="middle" fill="white" fontSize="11" fontWeight="500">+5 %</text>
          </g>
        </svg>

        {/* slider */}
        <div className="relative mt-2 h-1 rounded-full bg-secondary">
          <div className="absolute left-0 top-0 h-1 w-1/2 rounded-full" style={{ background: "var(--grad-arc)" }} />
          <div className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-foreground border-2 border-background shadow-md" />
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">15 Jun</p>
      </div>
    </div>
  );
};

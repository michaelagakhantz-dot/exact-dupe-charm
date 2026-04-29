import { Calendar, ArrowUpRight } from "lucide-react";

const bars = [
  { h: 55 }, { h: 65 }, { h: 70 }, { h: 60 }, { h: 95, highlight: true }, { h: 72 }, { h: 78 },
];

export const TotalSaleCard = () => {
  return (
    <div className="glass-card rounded-[2rem] p-7 animate-fade-in">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <p className="text-muted-foreground text-base">Total sale</p>
            <p className="text-3xl font-semibold tracking-tight">
              90<span className="text-muted-foreground">,744</span>
            </p>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-8 flex items-end justify-between gap-3 h-[180px]">
        {bars.map((b, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div className="relative w-full" style={{ height: `${b.h}%` }}>
              <div className="w-2 h-2 rounded-full bg-muted-foreground/60 absolute -top-1 left-1/2 -translate-x-1/2 z-10" />
              <div
                className={`w-full h-full rounded-t-2xl ${
                  b.highlight
                    ? "diagonal-stripes-purple bg-primary/10"
                    : "bg-secondary/80"
                }`}
              />
            </div>
            <span className="text-xs text-muted-foreground">Feb</span>
          </div>
        ))}
      </div>
    </div>
  );
};

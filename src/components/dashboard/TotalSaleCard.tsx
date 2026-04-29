import { Calendar, ArrowUpRight } from "lucide-react";
import { Bars3D } from "./three/Bars3D";

export const TotalSaleCard = () => {
  return (
    <div className="glass-card rounded-[2rem] p-7 animate-fade-in relative overflow-hidden">
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

      <div className="mt-4 relative h-[220px]">
        <Bars3D />
        <div className="absolute inset-x-0 bottom-0 flex justify-between px-4 text-xs text-muted-foreground pointer-events-none">
          {Array.from({ length: 7 }).map((_, i) => <span key={i}>Feb</span>)}
        </div>
      </div>
    </div>
  );
};

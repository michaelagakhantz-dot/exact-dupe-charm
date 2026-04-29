import { Donut3D } from "./three/Donut3D";

export const AgeDonutCard = () => {
  return (
    <div className="glass-card rounded-[2rem] p-4 flex items-center justify-center relative animate-fade-in overflow-hidden min-h-[210px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(268_85%_60%/0.18),transparent_65%)]" />

      <div className="absolute top-3 right-3 text-[10px] text-muted-foreground bg-secondary/70 backdrop-blur-sm px-2 py-0.5 rounded-full border border-border/50 z-10">24-36</div>
      <div className="absolute bottom-4 right-3 text-[10px] text-muted-foreground bg-secondary/70 backdrop-blur-sm px-2 py-0.5 rounded-full border border-border/50 z-10">18-24</div>
      <div className="absolute top-1/2 left-2 -translate-y-1/2 text-[10px] text-muted-foreground bg-secondary/70 backdrop-blur-sm px-2 py-0.5 rounded-full border border-border/50 z-10">0-18</div>

      <div className="w-full h-[200px]">
        <Donut3D />
      </div>
    </div>
  );
};

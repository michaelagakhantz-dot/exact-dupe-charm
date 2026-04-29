import { Gauge3D } from "./three/Gauge3D";
import { useEffect, useState } from "react";

export const CreditRateCard = () => {
  const value = 803;
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      setDisplayed(Math.round(value * eased));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="glass-card rounded-[2rem] p-5 flex flex-col items-center animate-fade-in relative overflow-hidden">
      <div className="pointer-events-none absolute -bottom-16 inset-x-0 h-40 bg-[radial-gradient(ellipse,hsl(268_85%_60%/0.28),transparent_70%)] blur-2xl" />

      <p className="text-foreground text-sm mb-1 relative">Creadit rate</p>

      <div className="relative w-full h-[120px]">
        <Gauge3D pct={value / 1000} />
        <div className="absolute top-3 left-1/2 -translate-x-1/2 grad-button text-white text-[10px] px-2 py-0.5 rounded-full shadow-lg">
          Apx
        </div>
      </div>

      <p className="text-3xl font-semibold tracking-tight tabular-nums relative">{displayed}</p>
    </div>
  );
};

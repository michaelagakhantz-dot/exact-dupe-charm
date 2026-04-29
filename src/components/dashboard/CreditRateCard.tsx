export const CreditRateCard = () => {
  const value = 803;
  const max = 1000;
  const pct = value / max;
  const r = 60;
  const C = Math.PI * r;
  const dash = C * pct;

  return (
    <div className="glass-card rounded-[2rem] p-6 flex flex-col items-center animate-fade-in">
      <p className="text-foreground text-sm mb-2">Creadit rate</p>
      <div className="relative w-44 h-24 overflow-hidden">
        <svg viewBox="0 0 160 90" className="w-full h-full">
          <defs>
            <linearGradient id="arc" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(225 95% 65%)" />
              <stop offset="50%" stopColor="hsl(268 85% 70%)" />
              <stop offset="100%" stopColor="hsl(320 90% 75%)" />
            </linearGradient>
          </defs>
          <path d="M 20 80 A 60 60 0 0 1 140 80" stroke="hsl(230 35% 16%)" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path
            d="M 20 80 A 60 60 0 0 1 140 80"
            stroke="url(#arc)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${C}`}
          />
          <circle cx={80 - 60 * Math.cos(Math.PI * pct)} cy={80 - 60 * Math.sin(Math.PI * pct)} r="6" fill="hsl(225 95% 70%)" />
        </svg>
        <div className="absolute top-2 left-1/2 -translate-x-1/2 grad-button text-white text-[10px] px-2 py-0.5 rounded-full">
          Apx
        </div>
      </div>
      <p className="text-3xl font-semibold tracking-tight -mt-2">{value}</p>
    </div>
  );
};

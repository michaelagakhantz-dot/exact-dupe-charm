export const AgeDonutCard = () => {
  const segs = [
    { color: "hsl(268 85% 75%)", offset: 0, len: 30 },
    { color: "hsl(225 95% 70%)", offset: 30, len: 25 },
    { color: "hsl(195 85% 70%)", offset: 55, len: 25 },
    { color: "hsl(320 80% 78%)", offset: 80, len: 20 },
  ];
  const C = 2 * Math.PI * 42;

  return (
    <div className="glass-card rounded-[2rem] p-6 flex items-center justify-center relative animate-fade-in">
      <div className="absolute top-4 right-4 text-[10px] text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded-full">24-36</div>
      <div className="absolute bottom-6 right-4 text-[10px] text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded-full">18-24</div>
      <div className="absolute top-1/2 left-3 -translate-y-1/2 text-[10px] text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded-full">0-18</div>

      <svg viewBox="0 0 100 100" className="w-32 h-32 -rotate-90">
        {segs.map((s, i) => (
          <circle
            key={i}
            cx="50" cy="50" r="42"
            fill="none"
            stroke={s.color}
            strokeWidth="14"
            strokeDasharray={`${(s.len / 100) * C} ${C}`}
            strokeDashoffset={-((s.offset / 100) * C)}
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
};

import { LayoutGrid, TrendingUp, Search, Calendar, Settings, LogOut, Zap } from "lucide-react";

const items = [
  { icon: LayoutGrid, active: true },
  { icon: TrendingUp },
  { icon: Search },
  { icon: Calendar },
  { icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="flex flex-col items-center justify-between py-6 px-3 w-[72px] glass-card rounded-[2rem] my-4 ml-4">
      <div className="flex flex-col items-center gap-8">
        <div className="w-11 h-11 rounded-full grad-button flex items-center justify-center shadow-[0_0_20px_hsl(230_95%_65%/0.5)]">
          <Zap className="w-5 h-5 text-white fill-white" />
        </div>
        <div className="w-8 h-px bg-border" />
        <nav className="flex flex-col gap-6">
          {items.map((Item, i) => (
            <button
              key={i}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-secondary ${
                Item.active ? "bg-secondary text-foreground" : "text-muted-foreground"
              }`}
            >
              <Item.icon className="w-5 h-5" />
            </button>
          ))}
        </nav>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-px bg-border" />
        <button className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-secondary transition-all">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
};

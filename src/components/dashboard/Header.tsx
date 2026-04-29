import { Calendar, MessageCircle, Bell } from "lucide-react";
import avatar from "@/assets/avatar.jpg";

export const Header = () => {
  return (
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
        Product Sales Dashboard
      </h1>
      <div className="flex items-center gap-3">
        {[Calendar, MessageCircle, Bell].map((Icon, i) => (
          <button
            key={i}
            className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
          >
            <Icon className="w-[18px] h-[18px]" />
          </button>
        ))}
        <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-border">
          <img src={avatar} alt="User" className="w-full h-full object-cover" loading="lazy" />
        </div>
      </div>
    </header>
  );
};

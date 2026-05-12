import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Upload, Sparkles, ClipboardCheck, Mic, Briefcase,
  BarChart3, User, Settings, LogOut, Compass
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/resume", label: "Resume Upload", icon: Upload },
  { to: "/skills", label: "Skill Extraction", icon: Sparkles },
  { to: "/verification", label: "Skill Verification", icon: ClipboardCheck },
  { to: "/interview", label: "AI Interview", icon: Mic },
  { to: "/jobs", label: "Job Recommendations", icon: Briefcase },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

export const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-border/60 bg-white/70 backdrop-blur-xl px-4 py-6 gap-2 sticky top-0 h-screen">
      <NavLink to="/dashboard" className="flex items-center gap-2 px-3 py-2 mb-4">
        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center glow-shadow">
          <Compass className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <div className="font-bold text-base leading-tight">Career Pilot</div>
          <div className="text-[10px] text-muted-foreground tracking-wider uppercase">AI Platform</div>
        </div>
      </NavLink>
      <nav className="flex-1 flex flex-col gap-1">
        {items.map((item) => {
          const active = pathname === item.to;
          return (
            <NavLink key={item.to} to={item.to} className="relative">
              {active && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-xl bg-gradient-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <div className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                active ? "text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </div>
            </NavLink>
          );
        })}
      </nav>
      <NavLink to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
        <LogOut className="w-4 h-4" /> Logout
      </NavLink>
    </aside>
  );
};

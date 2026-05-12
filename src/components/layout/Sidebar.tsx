import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  Sparkles,
  ClipboardCheck,
  Mic,
  Briefcase,
  BarChart3,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/resume", label: "Resume Upload", icon: Upload },
  { to: "/skills", label: "Skill Extraction", icon: Sparkles },
  { to: "/verification", label: "Verification", icon: ClipboardCheck },
  { to: "/interview", label: "AI Interview", icon: Mic },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-white border-r flex flex-col p-4 shadow-lg">

      {/* LOGO */}
      <h1 className="text-2xl font-bold text-indigo-600 mb-8">
        Career Pilot
      </h1>

      {/* MENU */}
      <nav className="flex flex-col gap-2 flex-1">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <button
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/";
        }}
        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
      >
        <LogOut size={18} />
        Logout
      </button>

    </aside>
  );
};
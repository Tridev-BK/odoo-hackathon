import { CalendarDays, LayoutDashboard, LogOut, Plus, Route } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../ui/button.jsx";
import { useAuthStore } from "../../context/authStore.js";
import { cn } from "../../utils/cn.js";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/trips", label: "My Trips", icon: Route },
  { to: "/trips/new", label: "Create", icon: Plus }
];

export const AppShell = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-white/10 bg-slate-950/70 p-5 backdrop-blur-xl lg:block">
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-300 text-slate-950">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div>
            <p className="text-lg font-bold tracking-normal">TRAVELOOP</p>
            <p className="text-xs text-slate-400">Plan beautifully</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white",
                    isActive && "bg-white/12 text-white"
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-semibold">{user?.name}</p>
          <p className="truncate text-xs text-slate-400">{user?.email}</p>
          <Button variant="ghost" size="sm" className="mt-3 w-full justify-start" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </aside>

      <main className="lg:pl-72">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl lg:hidden">
            <p className="font-bold">TRAVELOOP</p>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

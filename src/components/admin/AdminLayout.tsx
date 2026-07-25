import { useState, useEffect, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Tags,
  Image as ImageIcon,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import logoMark from "@/assets/logo-mark.png";
import { checkIsAuthenticated, logoutAdmin } from "@/lib/auth";

interface AdminLayoutProps {
  children: ReactNode;
  activeTab: "dashboard" | "menu" | "categories" | "gallery" | "settings";
  title: string;
}

export function AdminLayout({ children, activeTab, title }: AdminLayoutProps) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!checkIsAuthenticated()) {
      navigate({ to: "/admin/login" });
    } else {
      setAuthChecked(true);
    }
  }, [navigate]);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#8C1D18] border-t-transparent" />
          <p className="text-sm font-semibold text-[#8C1D18]">Verifying admin session...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out of the Admin Panel?")) {
      logoutAdmin();
      navigate({ to: "/admin/login" });
    }
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { id: "menu", label: "Menu Items", href: "/admin/menu", icon: UtensilsCrossed },
    { id: "categories", label: "Categories", href: "/admin/categories", icon: Tags },
    { id: "gallery", label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { id: "settings", label: "Site Settings", href: "/admin/settings", icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-gray-900 flex flex-col font-sans">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 bg-[#8C1D18] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Open sidebar menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/admin" className="flex items-center gap-2.5">
              <img
                src={logoMark}
                alt="Logo"
                className="h-9 w-9 object-contain rounded-lg bg-white p-0.5"
              />
              <span className="font-bold text-lg tracking-tight hidden sm:inline">
                Bari's Biryani <span className="text-amber-300 text-xs uppercase px-2 py-0.5 rounded bg-white/10 ml-1 font-mono">Admin</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold transition"
              title="Open Live Website"
            >
              <span>View Site</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
            <div className="h-4 w-px bg-white/20 hidden sm:block" />
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-700/80 hover:bg-red-800 text-white text-xs sm:text-sm font-semibold transition min-h-[44px]"
              title="Logout from session"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 gap-6">
        {/* Desktop Left Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-sm sticky top-22">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-stone-100 px-2 text-stone-500 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-[#8C1D18]" />
              <span>Management Panel</span>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <Link
                    key={item.id}
                    to={item.href}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition min-h-[44px] ${
                      isActive
                        ? "bg-[#8C1D18] text-white font-semibold shadow-sm"
                        : "text-stone-700 hover:bg-stone-100 hover:text-[#8C1D18]"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-stone-500"}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile Drawer Menu */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
            <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl flex flex-col p-5">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <img src={logoMark} alt="Logo" className="h-8 w-8 object-contain" />
                  <span className="font-bold text-[#8C1D18]">Admin Panel</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-4 space-y-1.5 flex-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <Link
                      key={item.id}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition min-h-[48px] ${
                        isActive
                          ? "bg-[#8C1D18] text-white font-semibold"
                          : "text-stone-700 hover:bg-stone-100"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="pt-4 border-t border-stone-100 flex flex-col gap-2">
                <Link
                  to="/"
                  target="_blank"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-100 text-stone-800 text-sm font-semibold min-h-[44px]"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Open Live Website</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-700 text-sm font-semibold min-h-[44px]"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">{title}</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

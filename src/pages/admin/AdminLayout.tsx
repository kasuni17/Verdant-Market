import { NavLink, Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  Package,
  Percent,
  Settings,
  ShoppingBag,
  Tag,
  Users,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const LINKS = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/inventory", label: "Inventory", icon: Boxes },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/promotions", label: "Promotions", icon: Percent },
  { to: "/admin/coupons", label: "Coupons", icon: Tag },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  if (!user || user.role !== "admin") return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen bg-ivory-100">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-charcoal-100 bg-charcoal-950 lg:flex">
        <div className="flex h-16 items-center gap-2 px-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-fern-600 text-ivory-50">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              <path d="M12 20c-4 0-7-3-7-7.5C5 8 8 5 12 5c.7 0 1.5.15 1.5.15S13 8 13 10.5c0 3 2.2 5 5 5 0 2.8-2.7 4.5-6 4.5z" fill="currentColor" />
            </svg>
          </span>
          <span className="font-display text-base font-semibold text-white">Verdant Admin</span>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 px-3 py-4">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive ? "bg-fern-700 text-white" : "text-charcoal-300 hover:bg-charcoal-800 hover:text-white"
                }`
              }
            >
              <link.icon className="h-4 w-4" /> {link.label}
            </NavLink>
          ))}
        </nav>
        <NavLink to="/" className="flex items-center gap-2 border-t border-charcoal-800 px-5 py-4 text-xs font-medium text-charcoal-400 hover:text-white">
          <ExternalLink className="h-3.5 w-3.5" /> View Storefront
        </NavLink>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between gap-3 border-b border-charcoal-100 bg-white px-5">
          <select
            value={location.pathname}
            onChange={(e) => navigate(e.target.value)}
            aria-label="Admin navigation"
            className="rounded-full border border-charcoal-200 px-3 py-2 text-xs font-medium text-charcoal-700 lg:hidden"
          >
            {LINKS.map((l) => (
              <option key={l.to} value={l.to}>{l.label}</option>
            ))}
          </select>
          <p className="hidden text-sm font-medium text-charcoal-500 lg:block">Admin Dashboard</p>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-charcoal-600 sm:inline">{user.name}</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-fern-100 text-sm font-semibold text-fern-800">
              {user.name.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

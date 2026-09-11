import { NavLink, Navigate, Outlet } from "react-router-dom";
import { CreditCard, LayoutDashboard, MapPin, Package, Settings, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const LINKS = [
  { to: "/account", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/account/orders", label: "Orders", icon: Package },
  { to: "/account/addresses", label: "Addresses", icon: MapPin },
  { to: "/account/payment", label: "Payment Methods", icon: CreditCard },
  { to: "/account/profile", label: "Personal Information", icon: User },
  { to: "/account/preferences", label: "Preferences", icon: Settings },
];

export function AccountLayout() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="container-shell py-8">
      <h1 className="mb-6 font-display text-3xl font-semibold text-charcoal-900">My Account</h1>
      <div className="grid gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <div className="rounded-2xl border border-charcoal-100 bg-white p-4">
            <div className="mb-3 flex items-center gap-3 border-b border-charcoal-100 px-2 pb-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-fern-100 text-sm font-semibold text-fern-800">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-charcoal-900">{user.name}</p>
                <p className="truncate text-xs text-charcoal-400">{user.email}</p>
              </div>
            </div>
            <nav className="flex flex-col gap-0.5">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium ${
                      isActive ? "bg-fern-50 text-fern-800" : "text-charcoal-600 hover:bg-charcoal-100"
                    }`
                  }
                >
                  <link.icon className="h-4 w-4" /> {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>
        <div className="lg:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

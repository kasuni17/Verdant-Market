import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Heart, Menu, MapPin, ShoppingCart, User, X, ChevronDown } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { categories } from "../data/categories";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { to: "/shop", label: "Shop" },
  { to: "/deals", label: "Deals" },
  { to: "/fresh", label: "Fresh" },
  { to: "/new-arrivals", label: "New Arrivals" },
  { to: "/stores", label: "Stores" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { totalItems, openDrawer } = useCart();
  const { ids } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 bg-ivory-50/95 backdrop-blur">
      <div className="hidden bg-fern-800 text-ivory-50 sm:block">
        <div className="container-shell flex h-9 items-center justify-center gap-2 text-xs font-medium">
          <span>Free delivery on orders over $75</span>
          <span className="text-fern-400">•</span>
          <span>Fresh produce delivered to your door</span>
          <span className="text-fern-400">•</span>
          <span>Weekly deals: save more on everyday essentials</span>
        </div>
      </div>

      <div className="border-b border-charcoal-100">
        <div className="container-shell flex h-16 items-center gap-4 sm:gap-6">
          <button
            className="flex items-center justify-center rounded-lg p-1.5 text-charcoal-700 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" className="flex shrink-0 items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-fern-700 text-ivory-50">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path d="M12 20c-4 0-7-3-7-7.5C5 8 8 5 12 5c.7 0 1.5.15 1.5.15S13 8 13 10.5c0 3 2.2 5 5 5 0 2.8-2.7 4.5-6 4.5z" fill="currentColor" />
              </svg>
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-xl font-semibold text-charcoal-900">Verdant Market</span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-charcoal-400">Fresh · International</span>
            </span>
          </Link>

          <div className="hidden flex-1 max-w-xl lg:block">
            <SearchBar />
          </div>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <button className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium text-charcoal-600 hover:bg-charcoal-100 md:flex">
              <MapPin className="h-4 w-4 text-fern-700" />
              Deliver to Portland, OR
            </button>

            <Link
              to={user ? "/account" : "/login"}
              className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal-600 hover:bg-charcoal-100"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>

            <Link
              to="/wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-charcoal-600 hover:bg-charcoal-100"
              aria-label={`Wishlist (${ids.length} items)`}
            >
              <Heart className="h-5 w-5" />
              {ids.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-clay-500 px-1 text-[10px] font-bold text-white">
                  {ids.length}
                </span>
              )}
            </Link>

            <button
              onClick={openDrawer}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-charcoal-600 hover:bg-charcoal-100"
              aria-label={`Cart (${totalItems} items)`}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-fern-700 px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="hidden border-t border-charcoal-100 lg:block">
          <div className="container-shell flex h-12 items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setCategoriesOpen(false)}
            >
              <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-charcoal-700 hover:bg-charcoal-100">
                Categories <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {categoriesOpen && (
                <div className="absolute left-0 top-full z-30 w-[560px] rounded-2xl border border-charcoal-100 bg-white p-4 shadow-panel">
                  <div className="grid grid-cols-2 gap-1">
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => { navigate(`/shop?category=${c.id}`); setCategoriesOpen(false); }}
                        className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-charcoal-700 hover:bg-fern-50 hover:text-fern-800"
                      >
                        <img src={c.image} alt="" className="h-8 w-8 rounded-md object-cover" />
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? "text-fern-700" : "text-charcoal-700 hover:bg-charcoal-100"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b border-charcoal-100 px-4 py-2.5 lg:hidden">
        <SearchBar compact />
      </div>

      {mobileOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Site menu">
            <div className="absolute inset-0 bg-charcoal-950/50" onClick={() => setMobileOpen(false)} />
            <div className="absolute left-0 top-0 flex h-full w-[85%] max-w-sm flex-col bg-white shadow-panel">
              <div className="flex shrink-0 items-center justify-between border-b border-charcoal-100 px-4 py-4 sm:px-5">
                <span className="font-display text-lg font-semibold text-charcoal-900">Verdant Market</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-charcoal-400 hover:bg-charcoal-100">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5">
                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal-700 hover:bg-charcoal-100"
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
                <p className="mb-2 mt-5 px-3 text-xs font-semibold uppercase tracking-wide text-charcoal-400">Categories</p>
                <nav className="flex flex-col gap-0.5 pb-2">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { navigate(`/shop?category=${c.id}`); setMobileOpen(false); }}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm text-charcoal-600 hover:bg-charcoal-100"
                    >
                      {c.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}

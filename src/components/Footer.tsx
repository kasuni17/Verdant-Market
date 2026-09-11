import { Link } from "react-router-dom";
import { Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "../context/ToastContext";

function SocialIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d={path} />
    </svg>
  );
}

const SOCIALS = [
  { label: "Facebook", path: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" },
  { label: "Instagram", path: "M12 2.2c2.7 0 3 0 4.1.06 1.1.05 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.35 1.1.4 2.2.05 1.1.06 1.4.06 4.1s0 3-.06 4.1c-.05 1.1-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1.1.35-2.2.4-1.1.05-1.4.06-4.1.06s-3 0-4.1-.06c-1.1-.05-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.35-1.1-.4-2.2C2.2 15 2.2 14.7 2.2 12s0-3 .06-4.1c.05-1.1.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1.1-.35 2.2-.4C8.1 2.2 8.3 2.2 12 2.2zm0 1.8c-2.7 0-3 0-4 .06-.9.04-1.4.18-1.7.3-.4.16-.7.35-1 .65-.3.3-.5.6-.65 1-.12.3-.26.8-.3 1.7C4.2 8.7 4.2 9 4.2 12s0 3 .06 4c.04.9.18 1.4.3 1.7.15.4.35.7.65 1 .3.3.6.5 1 .65.3.12.8.26 1.7.3 1 .06 1.3.06 4 .06s3 0 4-.06c.9-.04 1.4-.18 1.7-.3.4-.15.7-.35 1-.65.3-.3.5-.6.65-1 .12-.3.26-.8.3-1.7.06-1 .06-1.3.06-4s0-3-.06-4c-.04-.9-.18-1.4-.3-1.7-.15-.4-.35-.7-.65-1-.3-.3-.6-.5-1-.65-.3-.12-.8-.26-1.7-.3-1-.06-1.3-.06-4-.06zm0 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4zm5.7-2a1.05 1.05 0 1 1-2.1 0 1.05 1.05 0 0 1 2.1 0z" },
  { label: "X", path: "M18.24 3H21l-6.6 7.55L22.2 21h-6.3l-4.94-6.46L5.3 21H2.5l7.05-8.06L2 3h6.45l4.47 5.9L18.24 3zm-1.1 16.2h1.75L7.94 4.7H6.06l11.08 14.5z" },
  { label: "YouTube", path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.5V8.5l6.3 3.5-6.3 3.5z" },
];

const FOOTER_COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "All Products", to: "/shop" },
      { label: "Deals", to: "/deals" },
      { label: "Fresh", to: "/fresh" },
      { label: "New Arrivals", to: "/new-arrivals" },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "Fruits & Vegetables", to: "/shop?category=fruits-vegetables" },
      { label: "Pantry & Grocery", to: "/shop?category=pantry-grocery" },
      { label: "Beverages", to: "/shop?category=beverages" },
      { label: "Household", to: "/shop?category=household" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Contact Us", to: "/contact" },
      { label: "FAQ", to: "/faq" },
      { label: "Delivery Info", to: "/delivery" },
      { label: "Track Order", to: "/account/orders" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Store Locator", to: "/stores" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const { push } = useToast();

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    push("You're subscribed!", "Fresh offers will land in your inbox weekly.");
    setEmail("");
  };

  return (
    <footer className="border-t border-charcoal-100 bg-charcoal-950 text-charcoal-200">
      <div className="container-shell py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-fern-600 text-ivory-50">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path d="M12 20c-4 0-7-3-7-7.5C5 8 8 5 12 5c.7 0 1.5.15 1.5.15S13 8 13 10.5c0 3 2.2 5 5 5 0 2.8-2.7 4.5-6 4.5z" fill="currentColor" />
                </svg>
              </span>
              <span className="font-display text-lg font-semibold text-ivory-50">Verdant Market</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-charcoal-400">
              A premium international grocery destination, fresh produce, pantry essentials and everyday
              favourites, delivered when you need them.
            </p>
            <form onSubmit={subscribe} className="mt-5">
              <p className="mb-2 text-sm font-semibold text-ivory-100">Fresh offers, delivered to your inbox.</p>
              <div className="flex overflow-hidden rounded-full border border-charcoal-700 bg-charcoal-900">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  aria-label="Email address"
                  className="w-full bg-transparent px-4 py-2.5 text-sm text-ivory-100 placeholder:text-charcoal-500 focus:outline-none"
                />
                <button type="submit" aria-label="Subscribe" className="flex shrink-0 items-center gap-1.5 bg-fern-600 px-4 text-sm font-semibold text-white hover:bg-fern-500">
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-sm font-semibold text-ivory-100">{col.title}</h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-charcoal-400 hover:text-ivory-100">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-charcoal-800 pt-6 sm:flex-row">
          <p className="text-xs text-charcoal-500">© 2026 Verdant Market. All rights reserved. Demo storefront, not a real retailer.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-xs text-charcoal-500 hover:text-ivory-100">Privacy</Link>
            <Link to="/terms" className="text-xs text-charcoal-500 hover:text-ivory-100">Terms</Link>
            <div className="flex items-center gap-3 pl-2">
              {SOCIALS.map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="text-charcoal-500 hover:text-ivory-100">
                  <SocialIcon path={s.path} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

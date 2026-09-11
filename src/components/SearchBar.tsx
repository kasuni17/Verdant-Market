import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useProducts } from "../context/ProductsContext";
import { formatUSD } from "../lib/format";

export function SearchBar({ compact = false, onNavigate }: { compact?: boolean; onNavigate?: () => void }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { products } = useProducts();
  const ref = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.subcategory.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query, products]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const submit = () => {
    if (!query.trim()) return;
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
    onNavigate?.();
  };

  return (
    <div ref={ref} className="relative w-full">
      <div className={`flex items-center gap-2 rounded-full border border-charcoal-200 bg-ivory-100 px-4 ${compact ? "h-10" : "h-11"} focus-within:border-fern-500 focus-within:bg-white`}>
        <Search className="h-4 w-4 shrink-0 text-charcoal-400" />
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          type="text"
          placeholder="Search groceries, fruits, vegetables, beverages…"
          aria-label="Search products"
          className="w-full bg-transparent text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none"
        />
        {query && (
          <button onClick={() => setQuery("")} aria-label="Clear search" className="text-charcoal-400 hover:text-charcoal-700">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 max-h-96 overflow-y-auto rounded-xl border border-charcoal-100 bg-white p-2 shadow-panel">
          {results.map((p) => (
            <button
              key={p.id}
              onClick={() => { navigate(`/product/${p.id}`); setOpen(false); setQuery(""); onNavigate?.(); }}
              className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-ivory-100"
            >
              <img src={p.image} alt="" className="h-10 w-10 rounded-md object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-charcoal-900">{p.name}</p>
                <p className="text-xs text-charcoal-400">{p.brand} · {p.subcategory}</p>
              </div>
              <span className="text-sm font-semibold text-charcoal-900">{formatUSD(p.price)}</span>
            </button>
          ))}
          <button
            onClick={submit}
            className="mt-1 w-full rounded-lg px-2 py-2 text-left text-sm font-medium text-fern-700 hover:bg-fern-50"
          >
            See all results for “{query}”
          </button>
        </div>
      )}
    </div>
  );
}

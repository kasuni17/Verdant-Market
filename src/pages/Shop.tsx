import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, LayoutGrid, List, X } from "lucide-react";
import { useProducts } from "../context/ProductsContext";
import { ProductGrid } from "../components/ProductGrid";
import { ProductFilters, type ShopFilters } from "../components/ProductFilters";
import { getCategory } from "../data/categories";
import { PriceTag } from "../components/PriceTag";
import { Rating } from "../components/Rating";
import { Link } from "react-router-dom";

const SORTS = [
  { id: "recommended", label: "Recommended" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Best Rated" },
  { id: "newest", label: "Newest" },
  { id: "discount", label: "Biggest Discount" },
];

export function Shop() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const categoryParam = searchParams.get("category");
  const [sort, setSort] = useState("recommended");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const maxPrice = useMemo(() => Math.ceil(Math.max(...products.map((p) => p.price), 20)), [products]);
  const [filters, setFilters] = useState<ShopFilters>({
    categoryId: categoryParam,
    brands: [],
    maxPrice,
    minRating: 0,
    discountOnly: Boolean(searchParams.get("discount")),
    inStockOnly: false,
  });

  const brands = useMemo(() => {
    const pool = filters.categoryId ? products.filter((p) => p.categoryId === filters.categoryId) : products;
    return Array.from(new Set(pool.map((p) => p.brand))).sort();
  }, [products, filters.categoryId]);

  const filtered = useMemo(() => {
    let list = products.slice();
    if (q) {
      const query = q.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query) || p.subcategory.toLowerCase().includes(query)
      );
    }
    if (filters.categoryId) list = list.filter((p) => p.categoryId === filters.categoryId);
    if (filters.brands.length) list = list.filter((p) => filters.brands.includes(p.brand));
    list = list.filter((p) => p.price <= filters.maxPrice);
    list = list.filter((p) => p.rating >= filters.minRating);
    if (filters.discountOnly) list = list.filter((p) => p.originalPrice && p.originalPrice > p.price);
    if (filters.inStockOnly) list = list.filter((p) => p.stock > 0);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      case "discount":
        list.sort((a, b) => {
          const da = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
          const db = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
          return db - da;
        });
        break;
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [products, q, filters, sort]);

  const activeCategory = filters.categoryId ? getCategory(filters.categoryId) : null;

  return (
    <div className="container-shell py-8">
      <div className="mb-6">
        <p className="text-xs font-medium text-charcoal-400">
          <Link to="/" className="hover:text-fern-700">Home</Link> / <span className="text-charcoal-700">Shop</span>
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-charcoal-900">
          {q ? `Results for "${q}"` : activeCategory ? activeCategory.name : "All Products"}
        </h1>
        <p className="mt-1 text-sm text-charcoal-500">{filtered.length} products</p>
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 rounded-2xl border border-charcoal-100 bg-white p-5">
            <ProductFilters filters={filters} setFilters={setFilters} brands={brands} maxPrice={maxPrice} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-1.5 rounded-full border border-charcoal-200 px-4 py-2 text-sm font-medium text-charcoal-700 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>

            <div className="ml-auto flex items-center gap-2">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort by"
                className="rounded-full border border-charcoal-200 bg-white px-3.5 py-2 text-sm text-charcoal-700 focus:border-fern-500"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
              <div className="hidden items-center rounded-full border border-charcoal-200 sm:flex">
                <button
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${view === "grid" ? "bg-charcoal-900 text-white" : "text-charcoal-500"}`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  aria-label="List view"
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${view === "list" ? "bg-charcoal-900 text-white" : "text-charcoal-500"}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {(q || filters.categoryId) && (
            <div className="mb-4 flex flex-wrap gap-2">
              {q && (
                <button onClick={() => setSearchParams((p) => { p.delete("q"); return p; })} className="flex items-center gap-1 rounded-full bg-charcoal-100 px-3 py-1.5 text-xs font-medium text-charcoal-700">
                  "{q}" <X className="h-3 w-3" />
                </button>
              )}
              {filters.categoryId && (
                <button onClick={() => setFilters({ ...filters, categoryId: null })} className="flex items-center gap-1 rounded-full bg-charcoal-100 px-3 py-1.5 text-xs font-medium text-charcoal-700">
                  {getCategory(filters.categoryId)?.name} <X className="h-3 w-3" />
                </button>
              )}
            </div>
          )}

          {view === "grid" ? (
            <ProductGrid products={filtered} />
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="flex gap-4 rounded-2xl border border-charcoal-100 bg-white p-3 hover:shadow-card-hover">
                  <img src={p.image} alt={p.name} className="h-24 w-24 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-medium uppercase text-charcoal-400">{p.brand}</span>
                    <p className="font-semibold text-charcoal-900">{p.name}</p>
                    <p className="mt-0.5 line-clamp-1 text-sm text-charcoal-500">{p.description}</p>
                    <div className="mt-1.5"><Rating value={p.rating} count={p.reviewCount} /></div>
                  </div>
                  <div className="shrink-0 self-center">
                    <PriceTag price={p.price} originalPrice={p.originalPrice} unit={p.unit} />
                  </div>
                </Link>
              ))}
              {filtered.length === 0 && (
                <div className="rounded-2xl border border-dashed border-charcoal-200 py-16 text-center text-charcoal-500">
                  No products found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-charcoal-950/50" onClick={() => setShowFilters(false)} />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-xs overflow-y-auto bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-charcoal-900">Filters</h2>
              <button onClick={() => setShowFilters(false)} aria-label="Close filters"><X className="h-5 w-5" /></button>
            </div>
            <ProductFilters filters={filters} setFilters={setFilters} brands={brands} maxPrice={maxPrice} />
            <button onClick={() => setShowFilters(false)} className="mt-6 w-full rounded-full bg-fern-700 py-3 text-sm font-semibold text-white">
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

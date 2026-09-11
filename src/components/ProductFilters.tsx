import { categories } from "../data/categories";

export interface ShopFilters {
  categoryId: string | null;
  brands: string[];
  maxPrice: number;
  minRating: number;
  discountOnly: boolean;
  inStockOnly: boolean;
}

export function ProductFilters({
  filters,
  setFilters,
  brands,
  maxPrice,
}: {
  filters: ShopFilters;
  setFilters: (f: ShopFilters) => void;
  brands: string[];
  maxPrice: number;
}) {
  const toggleBrand = (brand: string) => {
    setFilters({
      ...filters,
      brands: filters.brands.includes(brand) ? filters.brands.filter((b) => b !== brand) : [...filters.brands, brand],
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-charcoal-900">Category</h3>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => setFilters({ ...filters, categoryId: null })}
            className={`rounded-lg px-2.5 py-1.5 text-left text-sm ${!filters.categoryId ? "bg-fern-50 font-semibold text-fern-800" : "text-charcoal-600 hover:bg-charcoal-100"}`}
          >
            All Categories
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilters({ ...filters, categoryId: c.id })}
              className={`rounded-lg px-2.5 py-1.5 text-left text-sm ${filters.categoryId === c.id ? "bg-fern-50 font-semibold text-fern-800" : "text-charcoal-600 hover:bg-charcoal-100"}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {brands.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-charcoal-900">Brand</h3>
          <div className="flex max-h-48 flex-col gap-2 overflow-y-auto pr-1">
            {brands.map((b) => (
              <label key={b} className="flex items-center gap-2 text-sm text-charcoal-600">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(b)}
                  onChange={() => toggleBrand(b)}
                  className="h-4 w-4 rounded border-charcoal-300 text-fern-700 focus:ring-fern-500"
                />
                {b}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="mb-3 text-sm font-semibold text-charcoal-900">
          Max Price: <span className="text-fern-700">${filters.maxPrice.toFixed(0)}</span>
        </h3>
        <input
          type="range"
          min={0}
          max={Math.ceil(maxPrice)}
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-fern-700"
        />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-charcoal-900">Minimum Rating</h3>
        <div className="flex gap-1.5">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => setFilters({ ...filters, minRating: r })}
              className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                filters.minRating === r ? "border-fern-700 bg-fern-700 text-white" : "border-charcoal-200 text-charcoal-600 hover:border-charcoal-300"
              }`}
            >
              {r === 0 ? "Any" : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <label className="flex items-center gap-2 text-sm text-charcoal-700">
          <input
            type="checkbox"
            checked={filters.discountOnly}
            onChange={(e) => setFilters({ ...filters, discountOnly: e.target.checked })}
            className="h-4 w-4 rounded border-charcoal-300 text-fern-700 focus:ring-fern-500"
          />
          On Sale Only
        </label>
        <label className="flex items-center gap-2 text-sm text-charcoal-700">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => setFilters({ ...filters, inStockOnly: e.target.checked })}
            className="h-4 w-4 rounded border-charcoal-300 text-fern-700 focus:ring-fern-500"
          />
          In Stock Only
        </label>
      </div>

      <button
        onClick={() => setFilters({ categoryId: null, brands: [], maxPrice, minRating: 0, discountOnly: false, inStockOnly: false })}
        className="text-left text-sm font-semibold text-clay-500 hover:underline"
      >
        Clear all filters
      </button>
    </div>
  );
}

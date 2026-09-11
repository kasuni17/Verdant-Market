import { useMemo, useState } from "react";
import { Minus, Plus, Search } from "lucide-react";
import { useProducts } from "../../context/ProductsContext";

export function AdminInventory() {
  const { products, adjustStock } = useProducts();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "in" | "low" | "out">("all");

  const rows = useMemo(() => {
    return products
      .filter((p) => !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.sku.toLowerCase().includes(query.toLowerCase()))
      .filter((p) => {
        if (statusFilter === "all") return true;
        if (statusFilter === "out") return p.stock === 0;
        if (statusFilter === "low") return p.stock > 0 && p.stock <= p.reorderLevel;
        return p.stock > p.reorderLevel;
      });
  }, [products, query, statusFilter]);

  const lowCount = products.filter((p) => p.stock > 0 && p.stock <= p.reorderLevel).length;
  const outCount = products.filter((p) => p.stock === 0).length;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-charcoal-900">Inventory</h1>
        <p className="text-sm text-charcoal-500">{lowCount} low stock · {outCount} out of stock</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex h-10 min-w-[220px] flex-1 items-center gap-2 rounded-full border border-charcoal-200 bg-white px-4">
          <Search className="h-4 w-4 text-charcoal-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" className="w-full bg-transparent text-sm focus:outline-none" />
        </div>
        <div className="flex rounded-full border border-charcoal-200 bg-white p-1">
          {(["all", "in", "low", "out"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize ${statusFilter === s ? "bg-charcoal-900 text-white" : "text-charcoal-600"}`}
            >
              {s === "in" ? "In Stock" : s === "low" ? "Low Stock" : s === "out" ? "Out of Stock" : "All"}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-charcoal-100 bg-white">
        <table className="w-full min-w-[680px] text-sm">
          <thead>
            <tr className="border-b border-charcoal-100 bg-ivory-100 text-left text-xs text-charcoal-500">
              <th className="px-4 py-3 font-medium">SKU</th>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Reorder Level</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Adjust</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className={`border-b border-charcoal-50 last:border-0 ${p.stock <= p.reorderLevel ? "bg-clay-100/20" : ""}`}>
                <td className="px-4 py-3 text-charcoal-500">{p.sku}</td>
                <td className="px-4 py-3 font-medium text-charcoal-900">{p.name}</td>
                <td className="px-4 py-3 text-charcoal-500">{p.subcategory}</td>
                <td className="px-4 py-3 font-semibold text-charcoal-900">{p.stock}</td>
                <td className="px-4 py-3 text-charcoal-500">{p.reorderLevel}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    p.stock === 0 ? "bg-clay-100 text-clay-500" : p.stock <= p.reorderLevel ? "bg-gold-100 text-gold-500" : "bg-fern-100 text-fern-800"
                  }`}>
                    {p.stock === 0 ? "Out of Stock" : p.stock <= p.reorderLevel ? "Low Stock" : "In Stock"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => adjustStock(p.id, -5)} aria-label="Decrease stock" className="rounded-lg border border-charcoal-200 p-1.5 text-charcoal-600 hover:bg-charcoal-100">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => adjustStock(p.id, 5)} aria-label="Increase stock" className="rounded-lg border border-charcoal-200 p-1.5 text-charcoal-600 hover:bg-charcoal-100">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

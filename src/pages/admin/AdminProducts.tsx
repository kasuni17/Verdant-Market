import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useProducts } from "../../context/ProductsContext";
import { categories } from "../../data/categories";
import { formatUSD } from "../../lib/format";
import { ProductFormModal } from "../../components/admin/ProductFormModal";
import type { Product } from "../../types";

export function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesQuery = !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.sku.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = categoryFilter === "all" || p.categoryId === categoryFilter;
      return matchesQuery && matchesCategory;
    });
  }, [products, query, categoryFilter]);

  const openEdit = (p: Product) => { setEditing(p); setShowForm(true); };
  const openAdd = () => { setEditing(null); setShowForm(true); };

  const save = (p: Product) => {
    if (products.some((x) => x.id === p.id)) updateProduct(p.id, p);
    else addProduct(p);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-charcoal-900">Products</h1>
          <p className="text-sm text-charcoal-500">{products.length} products in catalogue</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-1.5 rounded-full bg-fern-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-fern-800">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex h-10 min-w-[220px] flex-1 items-center gap-2 rounded-full border border-charcoal-200 bg-white px-4">
          <Search className="h-4 w-4 text-charcoal-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or SKU" className="w-full bg-transparent text-sm focus:outline-none" />
        </div>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-full border border-charcoal-200 bg-white px-4 py-2 text-sm">
          <option value="all">All Categories</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-charcoal-100 bg-white">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-charcoal-100 bg-ivory-100 text-left text-xs text-charcoal-500">
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">SKU</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-charcoal-50 last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                    <span className="max-w-[180px] truncate font-medium text-charcoal-900">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-charcoal-500">{p.sku}</td>
                <td className="px-4 py-3 text-charcoal-500">{p.subcategory}</td>
                <td className="px-4 py-3 font-medium text-charcoal-900">{formatUSD(p.price)}</td>
                <td className="px-4 py-3 text-charcoal-500">{p.stock}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    p.stock === 0 ? "bg-clay-100 text-clay-500" : p.stock <= p.reorderLevel ? "bg-gold-100 text-gold-500" : "bg-fern-100 text-fern-800"
                  }`}>
                    {p.stock === 0 ? "Out of Stock" : p.stock <= p.reorderLevel ? "Low Stock" : "In Stock"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openEdit(p)} aria-label="Edit product" className="rounded-lg p-1.5 text-charcoal-500 hover:bg-charcoal-100">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => deleteProduct(p.id)} aria-label="Delete product" className="rounded-lg p-1.5 text-charcoal-500 hover:bg-clay-100 hover:text-clay-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="p-8 text-center text-sm text-charcoal-400">No products match your search.</p>}
      </div>

      {showForm && <ProductFormModal product={editing} onClose={() => setShowForm(false)} onSave={save} />}
    </div>
  );
}

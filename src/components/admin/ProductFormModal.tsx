import { useState } from "react";
import { Modal } from "../Modal";
import type { Product } from "../../types";
import { categories } from "../../data/categories";
import { placeholderImage } from "../../lib/placeholder";

export function ProductFormModal({
  product,
  onClose,
  onSave,
}: {
  product: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
}) {
  const [form, setForm] = useState<Partial<Product>>(
    product ?? {
      name: "",
      brand: "",
      categoryId: categories[0].id,
      subcategory: categories[0].subcategories[0],
      description: "",
      price: 0,
      unit: "each",
      stock: 50,
      reorderLevel: 20,
      tags: [],
    }
  );

  const isEdit = Boolean(product);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = product?.id ?? `custom-${Date.now()}`;
    const image = product?.image ?? placeholderImage(id, categories.find((c) => c.id === form.categoryId)?.group ?? "default");
    const complete: Product = {
      id,
      sku: product?.sku ?? `VM-CUS-${Math.floor(Math.random() * 9000 + 1000)}`,
      name: form.name || "Untitled Product",
      brand: form.brand || "Verdant Market",
      categoryId: form.categoryId || categories[0].id,
      subcategory: form.subcategory || categories[0].subcategories[0],
      description: form.description || "",
      longDescription: form.description || "",
      price: Number(form.price) || 0,
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      unit: form.unit || "each",
      image,
      gallery: product?.gallery ?? [image],
      rating: product?.rating ?? 4.5,
      reviewCount: product?.reviewCount ?? 0,
      reviews: product?.reviews ?? [],
      stock: Number(form.stock) || 0,
      reorderLevel: Number(form.reorderLevel) || 20,
      tags: form.tags ?? [],
      organic: form.organic,
      isNew: product?.isNew ?? true,
      featured: form.featured,
      nutrition: product?.nutrition,
      ingredients: product?.ingredients,
    };
    onSave(complete);
    onClose();
  };

  const category = categories.find((c) => c.id === form.categoryId) ?? categories[0];

  return (
    <Modal onClose={onClose} maxWidth="max-w-2xl" labelledBy="product-form-title">
      <form onSubmit={submit} className="p-6">
        <h2 id="product-form-title" className="mb-5 text-lg font-semibold text-charcoal-900">
          {isEdit ? "Edit Product" : "Add Product"}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <input required placeholder="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field sm:col-span-2" />
          <input required placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="input-field" />
          <input placeholder="Unit (e.g. per lb, 12 oz)" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="input-field" />

          <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value, subcategory: categories.find((c) => c.id === e.target.value)?.subcategories[0] })} className="input-field">
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })} className="input-field">
            {category.subcategories.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>

          <input required type="number" min={0} step={0.01} placeholder="Price (USD)" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="input-field" />
          <input type="number" min={0} step={0.01} placeholder="Original price (optional)" value={form.originalPrice ?? ""} onChange={(e) => setForm({ ...form, originalPrice: e.target.value ? Number(e.target.value) : undefined })} className="input-field" />

          <input required type="number" min={0} placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} className="input-field" />
          <input type="number" min={0} placeholder="Reorder level" value={form.reorderLevel} onChange={(e) => setForm({ ...form, reorderLevel: Number(e.target.value) })} className="input-field" />

          <textarea placeholder="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field resize-none sm:col-span-2" />

          <div className="flex items-center gap-4 sm:col-span-2">
            <label className="flex items-center gap-2 text-sm text-charcoal-700">
              <input type="checkbox" checked={Boolean(form.organic)} onChange={(e) => setForm({ ...form, organic: e.target.checked })} className="h-4 w-4 rounded border-charcoal-300 text-fern-700" />
              Organic
            </label>
            <label className="flex items-center gap-2 text-sm text-charcoal-700">
              <input type="checkbox" checked={Boolean(form.featured)} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="h-4 w-4 rounded border-charcoal-300 text-fern-700" />
              Featured
            </label>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-full border border-charcoal-200 px-5 py-2.5 text-sm font-semibold text-charcoal-700">
            Cancel
          </button>
          <button type="submit" className="rounded-full bg-fern-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-fern-800">
            {isEdit ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

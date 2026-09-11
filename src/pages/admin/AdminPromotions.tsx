import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { usePromotions } from "../../context/PromotionsContext";
import { formatDate } from "../../lib/format";
import { categories } from "../../data/categories";
import { Modal } from "../../components/Modal";
import type { Promotion, PromotionType } from "../../types";

const TYPES: { id: PromotionType; label: string }[] = [
  { id: "percentage", label: "Percentage discount" },
  { id: "fixed", label: "Fixed discount" },
  { id: "bogo", label: "Buy 1 Get 1" },
  { id: "category", label: "Category discount" },
  { id: "product", label: "Product discount" },
  { id: "free_delivery", label: "Free delivery campaign" },
];

export function AdminPromotions() {
  const { promotions, addPromotion, updatePromotion, deletePromotion } = usePromotions();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Promotion>>({ type: "percentage", target: categories[0].name, discountValue: 10 });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    addPromotion({
      id: `promo-${Date.now()}`,
      name: form.name || "New Campaign",
      type: form.type || "percentage",
      discountValue: Number(form.discountValue) || 0,
      startDate: form.startDate || new Date().toISOString().slice(0, 10),
      endDate: form.endDate || new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
      target: form.target || "Storewide",
      status: "active",
    });
    setShowForm(false);
    setForm({ type: "percentage", target: categories[0].name, discountValue: 10 });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-charcoal-900">Promotions</h1>
          <p className="text-sm text-charcoal-500">{promotions.length} campaigns</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-1.5 rounded-full bg-fern-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-fern-800">
          <Plus className="h-4 w-4" /> New Campaign
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-charcoal-100 bg-white">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-charcoal-100 bg-ivory-100 text-left text-xs text-charcoal-500">
              <th className="px-4 py-3 font-medium">Campaign</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Target</th>
              <th className="px-4 py-3 font-medium">Discount</th>
              <th className="px-4 py-3 font-medium">Dates</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((p) => (
              <tr key={p.id} className="border-b border-charcoal-50 last:border-0">
                <td className="px-4 py-3 font-medium text-charcoal-900">{p.name}</td>
                <td className="px-4 py-3 capitalize text-charcoal-500">{p.type.replace("_", " ")}</td>
                <td className="px-4 py-3 text-charcoal-500">{p.target}</td>
                <td className="px-4 py-3 text-charcoal-500">{p.type === "free_delivery" ? "N/A" : `${p.discountValue}%`}</td>
                <td className="px-4 py-3 text-charcoal-500">{formatDate(p.startDate)} – {formatDate(p.endDate)}</td>
                <td className="px-4 py-3">
                  <select
                    value={p.status}
                    onChange={(e) => updatePromotion(p.id, { status: e.target.value as Promotion["status"] })}
                    className={`rounded-full border-0 px-2.5 py-1 text-xs font-semibold ${p.status === "active" ? "bg-fern-100 text-fern-800" : p.status === "scheduled" ? "bg-gold-100 text-gold-500" : "bg-charcoal-100 text-charcoal-500"}`}
                  >
                    <option value="active">Active</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="expired">Expired</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => deletePromotion(p.id)} aria-label="Delete promotion" className="rounded-lg p-1.5 text-charcoal-500 hover:bg-clay-100 hover:text-clay-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <Modal onClose={() => setShowForm(false)} maxWidth="max-w-lg" labelledBy="promo-form-title">
          <form onSubmit={submit} className="p-6">
            <h2 id="promo-form-title" className="mb-5 text-lg font-semibold text-charcoal-900">New Promotion</h2>
            <div className="grid gap-3">
              <input required placeholder="Campaign name" value={form.name ?? ""} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as PromotionType })} className="input-field">
                {TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
              <select value={form.target} onChange={(e) => setForm({ ...form, target: e.target.value })} className="input-field">
                <option value="Storewide">Storewide</option>
                {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
              <input type="number" min={0} max={100} placeholder="Discount %" value={form.discountValue ?? ""} onChange={(e) => setForm({ ...form, discountValue: Number(e.target.value) })} className="input-field" />
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={form.startDate ?? ""} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="input-field" />
                <input type="date" value={form.endDate ?? ""} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="input-field" />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setShowForm(false)} className="rounded-full border border-charcoal-200 px-5 py-2.5 text-sm font-semibold text-charcoal-700">Cancel</button>
              <button type="submit" className="rounded-full bg-fern-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-fern-800">Create Campaign</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

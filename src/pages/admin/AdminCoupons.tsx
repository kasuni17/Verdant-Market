import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { usePromotions } from "../../context/PromotionsContext";
import { formatDate } from "../../lib/format";
import { Modal } from "../../components/Modal";
import type { Coupon } from "../../types";

export function AdminCoupons() {
  const { coupons, addCoupon, deleteCoupon } = usePromotions();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Coupon>>({ type: "percentage" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    addCoupon({
      id: `cp-${Date.now()}`,
      code: (form.code || "SAVE10").toUpperCase(),
      discount: Number(form.discount) || 10,
      type: form.type || "percentage",
      usageLimit: Number(form.usageLimit) || 1000,
      used: 0,
      expiry: form.expiry || new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
      status: "active",
    });
    setShowForm(false);
    setForm({ type: "percentage" });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-charcoal-900">Coupons</h1>
          <p className="text-sm text-charcoal-500">{coupons.length} coupon codes</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-1.5 rounded-full bg-fern-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-fern-800">
          <Plus className="h-4 w-4" /> New Coupon
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {coupons.map((c) => (
          <div key={c.id} className="rounded-2xl border border-charcoal-100 bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="rounded-lg bg-charcoal-900 px-3 py-1.5 font-mono text-sm font-semibold text-white">{c.code}</span>
              <button onClick={() => deleteCoupon(c.id)} aria-label="Delete coupon" className="text-charcoal-300 hover:text-clay-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-lg font-semibold text-charcoal-900">
              {c.type === "percentage" ? `${c.discount}% off` : `$${c.discount} off`}
            </p>
            <div className="mt-2 flex items-center justify-between text-xs text-charcoal-500">
              <span>{c.used.toLocaleString()} / {c.usageLimit.toLocaleString()} used</span>
              <span className={`rounded-full px-2 py-0.5 font-semibold ${c.status === "active" ? "bg-fern-100 text-fern-800" : "bg-charcoal-100 text-charcoal-500"}`}>{c.status}</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-charcoal-100">
              <div className="h-full bg-fern-600" style={{ width: `${Math.min(100, (c.used / c.usageLimit) * 100)}%` }} />
            </div>
            <p className="mt-2 text-xs text-charcoal-400">Expires {formatDate(c.expiry)}</p>
          </div>
        ))}
      </div>

      {showForm && (
        <Modal onClose={() => setShowForm(false)} maxWidth="max-w-md" labelledBy="coupon-form-title">
          <form onSubmit={submit} className="p-6">
            <h2 id="coupon-form-title" className="mb-5 text-lg font-semibold text-charcoal-900">New Coupon</h2>
            <div className="grid gap-3">
              <input required placeholder="Code (e.g. SAVE15)" value={form.code ?? ""} onChange={(e) => setForm({ ...form, code: e.target.value })} className="input-field" />
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Coupon["type"] })} className="input-field">
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed amount</option>
              </select>
              <input required type="number" min={0} placeholder="Discount value" value={form.discount ?? ""} onChange={(e) => setForm({ ...form, discount: Number(e.target.value) })} className="input-field" />
              <input type="number" min={0} placeholder="Usage limit" value={form.usageLimit ?? ""} onChange={(e) => setForm({ ...form, usageLimit: Number(e.target.value) })} className="input-field" />
              <input type="date" value={form.expiry ?? ""} onChange={(e) => setForm({ ...form, expiry: e.target.value })} className="input-field" />
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setShowForm(false)} className="rounded-full border border-charcoal-200 px-5 py-2.5 text-sm font-semibold text-charcoal-700">Cancel</button>
              <button type="submit" className="rounded-full bg-fern-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-fern-800">Create Coupon</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

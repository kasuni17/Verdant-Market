import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import type { Address } from "../../types";

export function AccountAddresses() {
  const { user } = useAuth();
  const { push } = useToast();
  const [addresses, setAddresses] = useState<Address[]>(user!.addresses);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<Partial<Address>>({ country: "United States" });

  const removeAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    push("Address removed");
  };

  const addAddress = () => {
    if (!draft.fullName || !draft.line1 || !draft.city) return;
    setAddresses((prev) => [
      ...prev,
      {
        id: `addr-${Date.now()}`,
        label: draft.label || "Address",
        fullName: draft.fullName!,
        line1: draft.line1!,
        line2: draft.line2,
        city: draft.city!,
        state: draft.state || "",
        postalCode: draft.postalCode || "",
        country: draft.country || "United States",
        phone: draft.phone || "",
      },
    ]);
    setDraft({ country: "United States" });
    setAdding(false);
    push("Address added");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-charcoal-900">Saved Addresses</h2>
        <button onClick={() => setAdding((v) => !v)} className="flex items-center gap-1.5 rounded-full bg-fern-700 px-4 py-2 text-xs font-semibold text-white hover:bg-fern-800">
          <Plus className="h-3.5 w-3.5" /> Add Address
        </button>
      </div>

      {adding && (
        <div className="grid gap-3 rounded-2xl border border-charcoal-100 bg-white p-5 sm:grid-cols-2">
          <input placeholder="Label (e.g. Home)" value={draft.label ?? ""} onChange={(e) => setDraft({ ...draft, label: e.target.value })} className="input-field sm:col-span-2" />
          <input placeholder="Full name" value={draft.fullName ?? ""} onChange={(e) => setDraft({ ...draft, fullName: e.target.value })} className="input-field sm:col-span-2" />
          <input placeholder="Address line 1" value={draft.line1 ?? ""} onChange={(e) => setDraft({ ...draft, line1: e.target.value })} className="input-field sm:col-span-2" />
          <input placeholder="City" value={draft.city ?? ""} onChange={(e) => setDraft({ ...draft, city: e.target.value })} className="input-field" />
          <input placeholder="State" value={draft.state ?? ""} onChange={(e) => setDraft({ ...draft, state: e.target.value })} className="input-field" />
          <input placeholder="Postal code" value={draft.postalCode ?? ""} onChange={(e) => setDraft({ ...draft, postalCode: e.target.value })} className="input-field" />
          <input placeholder="Phone" value={draft.phone ?? ""} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} className="input-field" />
          <button onClick={addAddress} className="rounded-full bg-charcoal-900 py-2.5 text-sm font-semibold text-white sm:col-span-2">Save Address</button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {addresses.map((a) => (
          <div key={a.id} className="rounded-2xl border border-charcoal-100 bg-white p-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="rounded-full bg-fern-50 px-2.5 py-0.5 text-xs font-semibold text-fern-800">{a.label}</span>
              <button onClick={() => removeAddress(a.id)} aria-label="Delete address" className="text-charcoal-300 hover:text-clay-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm font-semibold text-charcoal-900">{a.fullName}</p>
            <p className="text-sm text-charcoal-500">{a.line1}{a.line2 ? `, ${a.line2}` : ""}</p>
            <p className="text-sm text-charcoal-500">{a.city}, {a.state} {a.postalCode}</p>
            <p className="text-sm text-charcoal-500">{a.country}</p>
            <p className="mt-1 text-xs text-charcoal-400">{a.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

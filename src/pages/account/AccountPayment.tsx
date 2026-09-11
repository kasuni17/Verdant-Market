import { useState } from "react";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import type { PaymentMethodInfo } from "../../types";

export function AccountPayment() {
  const { user } = useAuth();
  const { push } = useToast();
  const [methods, setMethods] = useState<PaymentMethodInfo[]>(user!.paymentMethods);

  const remove = (id: string) => {
    setMethods((prev) => prev.filter((m) => m.id !== id));
    push("Payment method removed");
  };

  const add = () => {
    setMethods((prev) => [
      ...prev,
      { id: `pm-${Date.now()}`, brand: "Visa", last4: String(1000 + Math.floor(Math.random() * 9000)).slice(-4), expiry: "01/29" },
    ]);
    push("Demo card added");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-charcoal-900">Payment Methods</h2>
        <button onClick={add} className="flex items-center gap-1.5 rounded-full bg-fern-700 px-4 py-2 text-xs font-semibold text-white hover:bg-fern-800">
          <Plus className="h-3.5 w-3.5" /> Add Card
        </button>
      </div>
      <p className="text-xs text-charcoal-400">Demo interface only, no real card data is stored or processed.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {methods.map((m) => (
          <div key={m.id} className="flex items-center justify-between rounded-2xl border border-charcoal-100 bg-white p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-charcoal-100 text-charcoal-700">
                <CreditCard className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-charcoal-900">{m.brand} •••• {m.last4}</p>
                <p className="text-xs text-charcoal-400">Expires {m.expiry}{m.isDefault ? " · Default" : ""}</p>
              </div>
            </div>
            <button onClick={() => remove(m.id)} aria-label="Remove card" className="text-charcoal-300 hover:text-clay-500">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

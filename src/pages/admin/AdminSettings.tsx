import { useState } from "react";
import { useToast } from "../../context/ToastContext";

const SECTIONS = ["Store", "Delivery", "Tax", "Notifications", "Account"] as const;

export function AdminSettings() {
  const [tab, setTab] = useState<(typeof SECTIONS)[number]>("Store");
  const { push } = useToast();

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    push("Settings saved");
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-charcoal-900">Settings</h1>
        <p className="text-sm text-charcoal-500">Manage your store configuration.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {SECTIONS.map((s) => (
          <button
            key={s}
            onClick={() => setTab(s)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${tab === s ? "bg-charcoal-900 text-white" : "border border-charcoal-200 text-charcoal-600"}`}
          >
            {s}
          </button>
        ))}
      </div>

      <form onSubmit={save} className="max-w-xl rounded-2xl border border-charcoal-100 bg-white p-6">
        {tab === "Store" && (
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-charcoal-700">Store name<input defaultValue="Verdant Market" className="input-field mt-1 w-full" /></label>
            <label className="text-sm font-medium text-charcoal-700">Support email<input defaultValue="support@verdantmarket.example" className="input-field mt-1 w-full" /></label>
            <label className="text-sm font-medium text-charcoal-700">Currency
              <select defaultValue="USD" className="input-field mt-1 w-full">
                <option value="USD">USD, US Dollar</option>
              </select>
            </label>
          </div>
        )}
        {tab === "Delivery" && (
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-charcoal-700">Free delivery threshold<input type="number" defaultValue={75} className="input-field mt-1 w-full" /></label>
            <label className="text-sm font-medium text-charcoal-700">Standard delivery fee<input type="number" defaultValue={4.99} step={0.01} className="input-field mt-1 w-full" /></label>
            <label className="text-sm font-medium text-charcoal-700">Express delivery fee<input type="number" defaultValue={12.99} step={0.01} className="input-field mt-1 w-full" /></label>
          </div>
        )}
        {tab === "Tax" && (
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-charcoal-700">Default tax rate (%)<input type="number" defaultValue={8} className="input-field mt-1 w-full" /></label>
            <label className="flex items-center gap-2 text-sm text-charcoal-700">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-charcoal-300 text-fern-700" /> Tax-inclusive pricing display
            </label>
          </div>
        )}
        {tab === "Notifications" && (
          <div className="flex flex-col gap-3">
            {["New order alerts", "Low stock alerts", "Customer messages", "Weekly performance summary"].map((n) => (
              <label key={n} className="flex items-center justify-between text-sm text-charcoal-700">
                {n}
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-charcoal-300 text-fern-700" />
              </label>
            ))}
          </div>
        )}
        {tab === "Account" && (
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-charcoal-700">Admin name<input defaultValue="Store Admin" className="input-field mt-1 w-full" /></label>
            <label className="text-sm font-medium text-charcoal-700">Admin email<input defaultValue="admin@example.com" className="input-field mt-1 w-full" /></label>
          </div>
        )}
        <button type="submit" className="mt-6 rounded-full bg-fern-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-fern-800">
          Save Settings
        </button>
      </form>
    </div>
  );
}

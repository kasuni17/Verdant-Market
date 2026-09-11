import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const OPTIONS = [
  { key: "orderUpdates", label: "Order updates", desc: "Get notified about order status changes." },
  { key: "promotions", label: "Promotions & deals", desc: "Receive weekly deals and personalized offers." },
  { key: "newsletter", label: "Newsletter", desc: "Recipes, tips and store news." },
  { key: "smsAlerts", label: "SMS delivery alerts", desc: "Text updates when your order is on its way." },
];

export function AccountPreferences() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>({ orderUpdates: true, promotions: true, newsletter: false, smsAlerts: true });
  const { logout } = useAuth();
  const { push } = useToast();

  const toggle = (key: string) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
    push("Preferences updated");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-charcoal-100 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-charcoal-900">Notification Preferences</h2>
        <div className="flex flex-col gap-4">
          {OPTIONS.map((o) => (
            <label key={o.key} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-charcoal-900">{o.label}</p>
                <p className="text-xs text-charcoal-500">{o.desc}</p>
              </div>
              <input type="checkbox" checked={prefs[o.key]} onChange={() => toggle(o.key)} className="h-5 w-9 shrink-0 appearance-none rounded-full bg-charcoal-200 checked:bg-fern-700 relative transition-colors before:absolute before:left-0.5 before:top-0.5 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-transform checked:before:translate-x-4" />
            </label>
          ))}
        </div>
      </div>
      <button onClick={logout} className="w-fit rounded-full border border-clay-500 px-6 py-2.5 text-sm font-semibold text-clay-500 hover:bg-clay-100">
        Sign Out
      </button>
    </div>
  );
}

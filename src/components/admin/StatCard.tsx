import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  change,
  icon: Icon,
}: {
  label: string;
  value: string;
  change?: string;
  icon: LucideIcon;
}) {
  const positive = change?.startsWith("+");
  return (
    <div className="rounded-2xl border border-charcoal-100 bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-fern-50 text-fern-700">
          <Icon className="h-5 w-5" />
        </span>
        {change && (
          <span className={`text-xs font-semibold ${positive ? "text-fern-700" : "text-clay-500"}`}>{change}</span>
        )}
      </div>
      <p className="mt-4 text-2xl font-semibold text-charcoal-900">{value}</p>
      <p className="text-xs text-charcoal-500">{label}</p>
    </div>
  );
}

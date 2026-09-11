import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { customers } from "../../data/customers";
import { formatDate, formatUSD } from "../../lib/format";
import type { Customer } from "../../types";

export function AdminCustomers() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Customer | null>(null);

  const filtered = useMemo(
    () => customers.filter((c) => !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.email.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-charcoal-900">Customers</h1>
        <p className="text-sm text-charcoal-500">{customers.length} customer accounts</p>
      </div>

      <div className="flex h-10 max-w-sm items-center gap-2 rounded-full border border-charcoal-200 bg-white px-4">
        <Search className="h-4 w-4 text-charcoal-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or email" className="w-full bg-transparent text-sm focus:outline-none" />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-charcoal-100 bg-white">
        <table className="w-full min-w-[680px] text-sm">
          <thead>
            <tr className="border-b border-charcoal-100 bg-ivory-100 text-left text-xs text-charcoal-500">
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Orders</th>
              <th className="px-4 py-3 font-medium">Total Spent</th>
              <th className="px-4 py-3 font-medium">Last Order</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} onClick={() => setSelected(c)} className="cursor-pointer border-b border-charcoal-50 last:border-0 hover:bg-ivory-100">
                <td className="px-4 py-3 font-medium text-charcoal-900">{c.name}</td>
                <td className="px-4 py-3 text-charcoal-500">{c.email}</td>
                <td className="px-4 py-3 text-charcoal-500">{c.orders}</td>
                <td className="px-4 py-3 font-semibold text-charcoal-900">{formatUSD(c.totalSpent)}</td>
                <td className="px-4 py-3 text-charcoal-500">{formatDate(c.lastOrder)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${c.status === "active" ? "bg-fern-100 text-fern-800" : "bg-charcoal-100 text-charcoal-500"}`}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-charcoal-950/50" onClick={() => setSelected(null)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm overflow-y-auto bg-white p-6 shadow-panel">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-charcoal-900">Customer Details</h2>
              <button onClick={() => setSelected(null)} aria-label="Close" className="rounded-full p-1.5 text-charcoal-400 hover:bg-charcoal-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-fern-100 text-lg font-semibold text-fern-800">
                {selected.name.split(" ").map((n) => n[0]).join("")}
              </span>
              <div>
                <p className="font-semibold text-charcoal-900">{selected.name}</p>
                <p className="text-sm text-charcoal-500">{selected.email}</p>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div><dt className="text-charcoal-400">Total Orders</dt><dd className="font-semibold text-charcoal-900">{selected.orders}</dd></div>
              <div><dt className="text-charcoal-400">Total Spent</dt><dd className="font-semibold text-charcoal-900">{formatUSD(selected.totalSpent)}</dd></div>
              <div><dt className="text-charcoal-400">Last Order</dt><dd className="font-semibold text-charcoal-900">{formatDate(selected.lastOrder)}</dd></div>
              <div><dt className="text-charcoal-400">Status</dt><dd className="font-semibold capitalize text-charcoal-900">{selected.status}</dd></div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}

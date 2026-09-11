import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useOrders } from "../../context/OrdersContext";
import { formatDate, formatUSD } from "../../lib/format";
import type { OrderStatus } from "../../types";

const STATUS_OPTIONS: OrderStatus[] = ["confirmed", "preparing", "packed", "out_for_delivery", "delivered", "cancelled"];

const STATUS_STYLES: Record<OrderStatus, string> = {
  confirmed: "bg-charcoal-100 text-charcoal-700",
  preparing: "bg-gold-100 text-gold-500",
  packed: "bg-gold-100 text-gold-500",
  out_for_delivery: "bg-fern-100 text-fern-800",
  delivered: "bg-fern-700 text-white",
  cancelled: "bg-clay-100 text-clay-500",
};

export function AdminOrders() {
  const { orders, updateStatus } = useOrders();
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => orders.filter((o) => !query || o.id.toLowerCase().includes(query.toLowerCase())),
    [orders, query]
  );

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-charcoal-900">Orders</h1>
        <p className="text-sm text-charcoal-500">{orders.length} total orders</p>
      </div>

      <div className="flex h-10 max-w-sm items-center gap-2 rounded-full border border-charcoal-200 bg-white px-4">
        <Search className="h-4 w-4 text-charcoal-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search order ID" className="w-full bg-transparent text-sm focus:outline-none" />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-charcoal-100 bg-white">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-charcoal-100 bg-ivory-100 text-left text-xs text-charcoal-500">
              <th className="px-4 py-3 font-medium">Order ID</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Items</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Payment</th>
              <th className="px-4 py-3 font-medium">Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-b border-charcoal-50 last:border-0">
                <td className="px-4 py-3 font-medium text-charcoal-900">#{o.id}</td>
                <td className="px-4 py-3 text-charcoal-500">{formatDate(o.date)}</td>
                <td className="px-4 py-3 text-charcoal-500">{o.items.length}</td>
                <td className="px-4 py-3 font-semibold text-charcoal-900">{formatUSD(o.total)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${o.paymentStatus === "paid" ? "bg-fern-100 text-fern-800" : o.paymentStatus === "pending" ? "bg-gold-100 text-gold-500" : "bg-clay-100 text-clay-500"}`}>
                    {o.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value as OrderStatus)}
                    className={`rounded-full border-0 px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[o.status]}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s} className="bg-white text-charcoal-900">{s.replace(/_/g, " ")}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="p-8 text-center text-sm text-charcoal-400">No orders found.</p>}
      </div>
    </div>
  );
}

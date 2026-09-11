import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DollarSign, Package, ShoppingBag, Users, AlertTriangle } from "lucide-react";
import { StatCard } from "../../components/admin/StatCard";
import { useProducts } from "../../context/ProductsContext";
import { useOrders } from "../../context/OrdersContext";
import { usePromotions } from "../../context/PromotionsContext";
import { customers } from "../../data/customers";
import { revenueSeries } from "../../data/analytics";
import { formatDate, formatUSD } from "../../lib/format";

export function AdminOverview() {
  const { products } = useProducts();
  const { orders } = useOrders();
  const { promotions } = usePromotions();

  const totalRevenue = 128450;
  const totalOrders = 2486;
  const totalCustomers = 8420;
  const totalProducts = products.length;

  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= p.reorderLevel).sort((a, b) => a.stock - b.stock).slice(0, 5);
  const topSelling = products.slice().sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5);
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-charcoal-900">Overview</h1>
        <p className="text-sm text-charcoal-500">Store performance at a glance.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Revenue" value={formatUSD(totalRevenue)} change="+12.4%" icon={DollarSign} />
        <StatCard label="Orders" value={totalOrders.toLocaleString()} change="+8.1%" icon={ShoppingBag} />
        <StatCard label="Customers" value={totalCustomers.toLocaleString()} change="+5.6%" icon={Users} />
        <StatCard label="Products" value={totalProducts.toLocaleString()} change="+2.0%" icon={Package} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-charcoal-100 bg-white p-5 lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold text-charcoal-900">Revenue Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueSeries}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2c8a48" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#2c8a48" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#8b8b70" }} />
                <YAxis hide />
                <Tooltip formatter={(v) => formatUSD(Number(v))} contentStyle={{ borderRadius: 12, borderColor: "#eaeadc", fontSize: 12 }} />
                <Area type="monotone" dataKey="revenue" stroke="#1c5a2e" strokeWidth={2} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-charcoal-100 bg-white p-5">
          <h2 className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-charcoal-900">
            <AlertTriangle className="h-4 w-4 text-clay-500" /> Low Stock Alerts
          </h2>
          <div className="flex flex-col gap-3">
            {lowStock.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <img src={p.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-charcoal-900">{p.name}</p>
                  <p className="text-[11px] text-clay-500">{p.stock} units left</p>
                </div>
              </div>
            ))}
            {lowStock.length === 0 && <p className="text-xs text-charcoal-400">All products well stocked.</p>}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-charcoal-100 bg-white p-5 lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold text-charcoal-900">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-charcoal-100 text-left text-xs text-charcoal-400">
                  <th className="pb-2 font-medium">Order</th>
                  <th className="pb-2 font-medium">Date</th>
                  <th className="pb-2 font-medium">Items</th>
                  <th className="pb-2 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b border-charcoal-50">
                    <td className="py-2.5 font-medium text-charcoal-900">#{o.id}</td>
                    <td className="py-2.5 text-charcoal-500">{formatDate(o.date)}</td>
                    <td className="py-2.5 text-charcoal-500">{o.items.length}</td>
                    <td className="py-2.5 text-right font-semibold text-charcoal-900">{formatUSD(o.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-charcoal-100 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-charcoal-900">Top Selling Products</h2>
          <div className="flex flex-col gap-3">
            {topSelling.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <img src={p.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-charcoal-900">{p.name}</p>
                  <p className="text-[11px] text-charcoal-400">{p.reviewCount} reviews · {formatUSD(p.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-charcoal-100 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-charcoal-900">Active Promotions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {promotions.filter((p) => p.status === "active").slice(0, 6).map((p) => (
            <div key={p.id} className="rounded-xl border border-charcoal-100 p-3">
              <p className="text-sm font-semibold text-charcoal-900">{p.name}</p>
              <p className="text-xs text-charcoal-400">{p.target}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-charcoal-400">Showing {customers.length} sample customer profiles for demo purposes.</p>
    </div>
  );
}

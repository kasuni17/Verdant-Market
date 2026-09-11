import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { StatCard } from "../../components/admin/StatCard";
import { DollarSign, ShoppingBag, TrendingUp, Users } from "lucide-react";
import { revenueSeries, categoryShare, customerGrowth } from "../../data/analytics";
import { formatUSD } from "../../lib/format";
import { useProducts } from "../../context/ProductsContext";

const COLORS = ["#1c5a2e", "#45a862", "#79c78e", "#b98a2f", "#c1552c", "#b1b195"];

export function AdminAnalytics() {
  const { products } = useProducts();
  const avgOrderValue = 51.68;
  const conversionRate = 3.4;
  const topCategories = products
    .reduce<Record<string, number>>((acc, p) => {
      acc[p.subcategory] = (acc[p.subcategory] ?? 0) + p.reviewCount;
      return acc;
    }, {});
  const topCategoryList = Object.entries(topCategories).sort((a, b) => b[1] - a[1]).slice(0, 6);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-charcoal-900">Analytics</h1>
        <p className="text-sm text-charcoal-500">Store performance and customer insights.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Revenue (7 mo)" value={formatUSD(revenueSeries.reduce((s, r) => s + r.revenue, 0))} change="+12.4%" icon={DollarSign} />
        <StatCard label="Avg. Order Value" value={formatUSD(avgOrderValue)} change="+3.1%" icon={ShoppingBag} />
        <StatCard label="Conversion Rate" value={`${conversionRate}%`} change="+0.4%" icon={TrendingUp} />
        <StatCard label="Customer Growth" value="+38.4%" change="+38.4%" icon={Users} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-charcoal-100 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-charcoal-900">Orders by Month</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueSeries}>
                <CartesianGrid vertical={false} stroke="#eaeadc" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#8b8b70" }} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#eaeadc", fontSize: 12 }} />
                <Bar dataKey="orders" fill="#2c8a48" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-charcoal-100 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-charcoal-900">Customer Growth</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={customerGrowth}>
                <defs>
                  <linearGradient id="cust" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#b98a2f" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#b98a2f" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#8b8b70" }} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: 12, borderColor: "#eaeadc", fontSize: 12 }} />
                <Area type="monotone" dataKey="customers" stroke="#b98a2f" strokeWidth={2} fill="url(#cust)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-charcoal-100 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-charcoal-900">Sales by Category</h2>
          <div className="flex items-center gap-6">
            <div className="h-52 w-52 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryShare} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
                    {categoryShare.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2">
              {categoryShare.map((c, i) => (
                <div key={c.name} className="flex items-center gap-2 text-xs text-charcoal-600">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                  {c.name} <span className="font-semibold text-charcoal-900">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-charcoal-100 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-charcoal-900">Best-Selling Product Types</h2>
          <div className="flex flex-col gap-3">
            {topCategoryList.map(([name, count], i) => (
              <div key={name} className="flex items-center gap-3">
                <span className="w-5 text-xs font-semibold text-charcoal-400">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-charcoal-800">{name}</span>
                    <span className="text-charcoal-400">{count} reviews</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-charcoal-100">
                    <div className="h-full bg-fern-600" style={{ width: `${Math.min(100, (count / topCategoryList[0][1]) * 100)}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

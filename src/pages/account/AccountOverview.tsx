import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../context/OrdersContext";
import { useWishlist } from "../../context/WishlistContext";
import { useProducts } from "../../context/ProductsContext";
import { formatDate, formatUSD } from "../../lib/format";
import { ProductGrid } from "../../components/ProductGrid";

export function AccountOverview() {
  const { user } = useAuth();
  const { ordersForUser } = useOrders();
  const { ids } = useWishlist();
  const { products } = useProducts();
  const orders = ordersForUser(user!.id);
  const activeOrder = orders.find((o) => o.status !== "delivered" && o.status !== "cancelled");
  const recommended = products.filter((p) => p.featured).slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Orders", value: orders.length },
          { label: "Saved Items", value: ids.length },
          { label: "Total Spent", value: formatUSD(orders.reduce((s, o) => s + o.total, 0)) },
          { label: "Member Since", value: new Date(user!.joined).getFullYear() },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-charcoal-100 bg-white p-4">
            <p className="text-xs text-charcoal-400">{s.label}</p>
            <p className="mt-1 text-xl font-semibold text-charcoal-900">{s.value}</p>
          </div>
        ))}
      </div>

      {activeOrder && (
        <div className="rounded-2xl border border-fern-200 bg-fern-50 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-fern-700">Active Order</p>
              <p className="text-lg font-semibold text-charcoal-900">#{activeOrder.id}</p>
              <p className="text-sm text-charcoal-600">
                {activeOrder.items.length} items · {formatUSD(activeOrder.total)} · Est. {formatDate(activeOrder.estimatedDelivery)}
              </p>
            </div>
            <Link to={`/orders/${activeOrder.id}`} className="rounded-full bg-fern-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-fern-800">
              Track Order
            </Link>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-charcoal-100 bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-charcoal-900">Recent Orders</h2>
          <Link to="/account/orders" className="text-sm font-semibold text-fern-700 hover:underline">View all</Link>
        </div>
        <div className="flex flex-col gap-3">
          {orders.slice(0, 3).map((o) => (
            <div key={o.id} className="flex items-center justify-between rounded-xl border border-charcoal-100 p-3">
              <div>
                <p className="text-sm font-semibold text-charcoal-900">#{o.id}</p>
                <p className="text-xs text-charcoal-400">{formatDate(o.date)} · {o.items.length} items</p>
              </div>
              <span className="text-sm font-semibold text-charcoal-900">{formatUSD(o.total)}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-charcoal-900">Recommended For You</h2>
        <ProductGrid products={recommended} />
      </div>
    </div>
  );
}

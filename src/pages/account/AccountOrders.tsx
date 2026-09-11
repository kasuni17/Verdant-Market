import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useOrders } from "../../context/OrdersContext";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { formatDate, formatUSD } from "../../lib/format";
import type { OrderStatus } from "../../types";

const STATUS_STYLES: Record<OrderStatus, string> = {
  confirmed: "bg-charcoal-100 text-charcoal-700",
  preparing: "bg-gold-100 text-gold-500",
  packed: "bg-gold-100 text-gold-500",
  out_for_delivery: "bg-fern-100 text-fern-800",
  delivered: "bg-fern-700 text-white",
  cancelled: "bg-clay-100 text-clay-500",
};

export function AccountOrders() {
  const { user } = useAuth();
  const { ordersForUser } = useOrders();
  const { addToCart } = useCart();
  const { push } = useToast();
  const orders = ordersForUser(user!.id);

  const buyAgain = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    order.items.forEach((item) => addToCart(item.productId, item.quantity));
    push("Items added to cart", `From order #${order.id}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-charcoal-900">Order History</h2>
      {orders.length === 0 && <p className="text-sm text-charcoal-500">You haven't placed any orders yet.</p>}
      {orders.map((o) => (
        <div key={o.id} className="rounded-2xl border border-charcoal-100 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-charcoal-100 pb-4">
            <div>
              <p className="text-sm font-semibold text-charcoal-900">Order #{o.id}</p>
              <p className="text-xs text-charcoal-400">Placed {formatDate(o.date)}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[o.status]}`}>
              {o.status.replace(/_/g, " ")}
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto py-4">
            {o.items.map((item) => (
              <img key={item.productId} src={item.image} alt={item.name} title={item.name} className="h-14 w-14 shrink-0 rounded-lg object-cover" />
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-charcoal-500">
              {o.items.length} items · <span className="font-semibold text-charcoal-900">{formatUSD(o.total)}</span>
            </p>
            <div className="flex gap-2">
              <button onClick={() => buyAgain(o.id)} className="rounded-full border border-fern-700 px-4 py-2 text-xs font-semibold text-fern-700 hover:bg-fern-50">
                Buy Again
              </button>
              <Link to={`/orders/${o.id}`} className="rounded-full bg-charcoal-900 px-4 py-2 text-xs font-semibold text-white hover:bg-charcoal-800">
                Track Order
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

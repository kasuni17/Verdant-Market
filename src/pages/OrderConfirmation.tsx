import { Link, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useOrders } from "../context/OrdersContext";
import { formatUSD, formatDate } from "../lib/format";

export function OrderConfirmation() {
  const { id } = useParams();
  const { getOrder } = useOrders();
  const order = id ? getOrder(id) : undefined;

  if (!order) {
    return (
      <div className="container-shell py-24 text-center">
        <p className="text-lg font-semibold text-charcoal-700">Order not found</p>
        <Link to="/" className="mt-3 inline-block text-sm font-semibold text-fern-700 hover:underline">Return home</Link>
      </div>
    );
  }

  return (
    <div className="container-shell flex flex-col items-center py-14">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-fern-100">
        <CheckCircle2 className="h-9 w-9 text-fern-700" />
      </div>
      <h1 className="mt-5 font-display text-3xl font-semibold text-charcoal-900">Order confirmed.</h1>
      <p className="mt-2 text-sm text-charcoal-500">Thank you, your order #{order.id} has been placed successfully.</p>

      <div className="mt-8 w-full max-w-xl rounded-2xl border border-charcoal-100 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-charcoal-100 pb-4">
          <div>
            <p className="text-xs text-charcoal-400">Order Number</p>
            <p className="font-semibold text-charcoal-900">{order.id}</p>
          </div>
          <div>
            <p className="text-xs text-charcoal-400">Estimated Delivery</p>
            <p className="font-semibold text-charcoal-900">{formatDate(order.estimatedDelivery)}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-4">
          {order.items.map((item) => (
            <div key={item.productId} className="flex items-center gap-3">
              <img src={item.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
              <div className="flex-1 text-sm">
                <p className="font-medium text-charcoal-900">{item.name}</p>
                <p className="text-xs text-charcoal-400">Qty {item.quantity}</p>
              </div>
              <span className="text-sm font-semibold text-charcoal-900">{formatUSD(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-charcoal-100 pt-4">
          <div className="flex justify-between text-sm text-charcoal-500">
            <span>Delivery address</span>
          </div>
          <p className="mt-1 text-sm text-charcoal-800">
            {order.address.fullName}, {order.address.line1}, {order.address.city}, {order.address.state} {order.address.postalCode}
          </p>
          <div className="mt-4 flex justify-between border-t border-charcoal-100 pt-4">
            <span className="text-base font-semibold text-charcoal-900">Total</span>
            <span className="text-xl font-semibold text-charcoal-900">{formatUSD(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link to={`/orders/${order.id}`} className="rounded-full bg-fern-700 px-6 py-3 text-sm font-semibold text-white hover:bg-fern-800">
          Track Order
        </Link>
        <Link to="/shop" className="rounded-full border border-charcoal-200 px-6 py-3 text-sm font-semibold text-charcoal-800 hover:border-charcoal-300">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

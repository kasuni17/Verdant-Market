import { Link, useParams } from "react-router-dom";
import { Check, Package, PackageCheck, Truck, Home as HomeIcon } from "lucide-react";
import { useOrders } from "../context/OrdersContext";
import { formatDate, formatUSD } from "../lib/format";
import type { OrderStatus } from "../types";

const STEPS: { status: OrderStatus; label: string; icon: typeof Package }[] = [
  { status: "confirmed", label: "Order Confirmed", icon: Check },
  { status: "preparing", label: "Preparing", icon: Package },
  { status: "packed", label: "Packed", icon: PackageCheck },
  { status: "out_for_delivery", label: "Out for Delivery", icon: Truck },
  { status: "delivered", label: "Delivered", icon: HomeIcon },
];

export function OrderTracking() {
  const { id } = useParams();
  const { getOrder } = useOrders();
  const order = id ? getOrder(id) : undefined;

  if (!order) {
    return (
      <div className="container-shell py-24 text-center">
        <p className="text-lg font-semibold text-charcoal-700">Order not found</p>
        <Link to="/account/orders" className="mt-3 inline-block text-sm font-semibold text-fern-700 hover:underline">Back to orders</Link>
      </div>
    );
  }

  if (order.status === "cancelled") {
    return (
      <div className="container-shell py-16">
        <div className="mx-auto max-w-xl rounded-2xl border border-clay-100 bg-clay-100/40 p-8 text-center">
          <p className="text-lg font-semibold text-clay-500">This order was cancelled</p>
          <p className="mt-1 text-sm text-charcoal-500">Order #{order.id}</p>
        </div>
      </div>
    );
  }

  const currentIndex = STEPS.findIndex((s) => s.status === order.status);

  return (
    <div className="container-shell py-10">
      <p className="text-xs font-medium text-charcoal-400">
        <Link to="/account/orders" className="hover:text-fern-700">My Orders</Link> / <span className="text-charcoal-700">{order.id}</span>
      </p>
      <h1 className="mt-1 mb-1 font-display text-3xl font-semibold text-charcoal-900">Track Order</h1>
      <p className="mb-8 text-sm text-charcoal-500">Order #{order.id} · Placed {formatDate(order.date)}</p>

      <div className="rounded-2xl border border-charcoal-100 bg-white p-6 sm:p-8">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-fern-700">
            {order.status === "delivered" ? "Delivered" : "Estimated arrival"}
          </span>
          <span className="text-charcoal-500">{formatDate(order.estimatedDelivery)}</span>
        </div>

        <div className="relative mt-8 flex justify-between">
          <div className="absolute left-0 right-0 top-5 h-0.5 bg-charcoal-100" />
          <div
            className="absolute left-0 top-5 h-0.5 bg-fern-600 transition-all duration-700"
            style={{ width: `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
          />
          {STEPS.map((s, i) => {
            const done = i <= currentIndex;
            return (
              <div key={s.status} className="relative z-10 flex flex-col items-center gap-2" style={{ flex: 1 }}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${done ? "border-fern-700 bg-fern-700 text-white" : "border-charcoal-200 bg-white text-charcoal-300"}`}>
                  <s.icon className="h-4 w-4" />
                </div>
                <span className={`text-center text-[11px] font-medium sm:text-xs ${done ? "text-charcoal-900" : "text-charcoal-400"}`}>{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-charcoal-100 bg-white p-6 lg:col-span-2">
          <h2 className="mb-3 text-lg font-semibold text-charcoal-900">Items</h2>
          <div className="flex flex-col gap-3">
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
        </div>
        <div className="rounded-2xl border border-charcoal-100 bg-white p-6">
          <h2 className="mb-2 text-lg font-semibold text-charcoal-900">Delivery Address</h2>
          <p className="text-sm text-charcoal-600">
            {order.address.fullName}<br />
            {order.address.line1}{order.address.line2 ? `, ${order.address.line2}` : ""}<br />
            {order.address.city}, {order.address.state} {order.address.postalCode}<br />
            {order.address.country}
          </p>
          <div className="mt-4 border-t border-charcoal-100 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-charcoal-500">Order Total</span>
              <span className="font-semibold text-charcoal-900">{formatUSD(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

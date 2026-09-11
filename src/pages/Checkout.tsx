import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, CreditCard, MapPin, Store, Truck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrdersContext";
import { formatUSD } from "../lib/format";
import { demoAddress } from "../data/users";
import { stores } from "../data/stores";
import type { Address, DeliveryMethod, Order } from "../types";

const STEPS = ["Delivery", "Address", "Payment", "Review"] as const;

const DELIVERY_OPTIONS: { id: DeliveryMethod; label: string; desc: string; fee: number }[] = [
  { id: "standard", label: "Standard Delivery", desc: "Arrives in 1–2 business days", fee: 4.99 },
  { id: "express", label: "Express Delivery", desc: "Arrives within 3 hours", fee: 12.99 },
  { id: "scheduled", label: "Scheduled Delivery", desc: "Choose your preferred time slot", fee: 6.99 },
];

export function Checkout() {
  const { activeItems, clearCart } = useCart();
  const { products } = useProducts();
  const { user } = useAuth();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [method, setMethod] = useState<DeliveryMethod>("standard");
  const [selectedStore, setSelectedStore] = useState(stores[0].id);
  const [address, setAddress] = useState<Address>(user?.addresses[0] ?? demoAddress);
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [paymentTab, setPaymentTab] = useState<"card" | "paypal" | "apple" | "google">("card");
  const [placing, setPlacing] = useState(false);

  const lines = useMemo(
    () => activeItems.map((item) => ({ item, product: products.find((p) => p.id === item.productId) })).filter((l) => l.product),
    [activeItems, products]
  );
  const subtotal = lines.reduce((s, l) => s + l.product!.price * l.item.quantity, 0);
  const discount = Math.round(subtotal * 0.05 * 100) / 100;
  const deliveryFee = method === "pickup" ? 0 : subtotal > 75 ? 0 : DELIVERY_OPTIONS.find((d) => d.id === method)?.fee ?? 4.99;
  const tax = Math.round((subtotal - discount) * 0.08 * 100) / 100;
  const total = Math.round((subtotal - discount + deliveryFee + tax) * 100) / 100;

  if (lines.length === 0 && step < 3) {
    return (
      <div className="container-shell py-24 text-center">
        <p className="text-lg font-semibold text-charcoal-700">Your cart is empty</p>
        <button onClick={() => navigate("/shop")} className="mt-3 text-sm font-semibold text-fern-700 hover:underline">
          Continue shopping
        </button>
      </div>
    );
  }

  const placeOrder = () => {
    setPlacing(true);
    const order: Order = {
      id: `VM-${100000 + Math.floor(Math.random() * 900000)}`,
      userId: user?.id ?? "user-demo",
      date: new Date().toISOString(),
      items: lines.map((l) => ({
        productId: l.product!.id,
        name: l.product!.name,
        image: l.product!.image,
        unit: l.product!.unit,
        price: l.product!.price,
        quantity: l.item.quantity,
      })),
      subtotal,
      discount,
      deliveryFee,
      tax,
      total,
      status: "confirmed",
      deliveryMethod: method,
      address,
      paymentStatus: "paid",
      estimatedDelivery: new Date(Date.now() + (method === "express" ? 0.15 : 2) * 86400000).toISOString(),
    };
    setTimeout(() => {
      addOrder(order);
      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    }, 900);
  };

  return (
    <div className="container-shell py-8">
      <h1 className="mb-6 font-display text-3xl font-semibold text-charcoal-900">Checkout</h1>

      <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-1">
        {STEPS.map((s, i) => (
          <div key={s} className="flex shrink-0 items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
              i < step ? "bg-fern-700 text-white" : i === step ? "border-2 border-fern-700 text-fern-700" : "border border-charcoal-200 text-charcoal-400"
            }`}>
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-sm font-medium ${i === step ? "text-charcoal-900" : "text-charcoal-400"}`}>{s}</span>
            {i < STEPS.length - 1 && <div className="mx-2 h-px w-8 bg-charcoal-200 sm:w-16" />}
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {step === 0 && (
            <div className="rounded-2xl border border-charcoal-100 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-charcoal-900">How would you like to receive your order?</h2>
              <div className="flex flex-col gap-3">
                {DELIVERY_OPTIONS.map((opt) => (
                  <label key={opt.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${method === opt.id ? "border-fern-600 bg-fern-50" : "border-charcoal-200"}`}>
                    <input type="radio" name="delivery" checked={method === opt.id} onChange={() => setMethod(opt.id)} className="h-4 w-4 text-fern-700" />
                    <Truck className="h-5 w-5 text-fern-700" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-charcoal-900">{opt.label}</p>
                      <p className="text-xs text-charcoal-500">{opt.desc}</p>
                    </div>
                    <span className="text-sm font-semibold text-charcoal-900">{formatUSD(opt.fee)}</span>
                  </label>
                ))}
                <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${method === "pickup" ? "border-fern-600 bg-fern-50" : "border-charcoal-200"}`}>
                  <input type="radio" name="delivery" checked={method === "pickup"} onChange={() => setMethod("pickup")} className="h-4 w-4 text-fern-700" />
                  <Store className="h-5 w-5 text-fern-700" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-charcoal-900">Store Pickup</p>
                    <p className="text-xs text-charcoal-500">Ready in about 2 hours</p>
                  </div>
                  <span className="text-sm font-semibold text-fern-700">Free</span>
                </label>
                {method === "pickup" && (
                  <select
                    value={selectedStore}
                    onChange={(e) => setSelectedStore(e.target.value)}
                    className="mt-1 rounded-xl border border-charcoal-200 px-4 py-2.5 text-sm"
                  >
                    {stores.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}, {s.city}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="rounded-2xl border border-charcoal-100 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-charcoal-900">Delivery Address</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <input value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: e.target.value })} placeholder="Full name" className="input-field sm:col-span-2" />
                <input value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} placeholder="Address line 1" className="input-field sm:col-span-2" />
                <input value={address.line2 ?? ""} onChange={(e) => setAddress({ ...address, line2: e.target.value })} placeholder="Apartment, suite (optional)" className="input-field sm:col-span-2" />
                <input value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} placeholder="City" className="input-field" />
                <input value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} placeholder="State / Province" className="input-field" />
                <input value={address.postalCode} onChange={(e) => setAddress({ ...address, postalCode: e.target.value })} placeholder="Postal code" className="input-field" />
                <input value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} placeholder="Country" className="input-field" />
                <input value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} placeholder="Phone number" className="input-field sm:col-span-2" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="rounded-2xl border border-charcoal-100 bg-white p-6">
              <h2 className="mb-4 text-lg font-semibold text-charcoal-900">Payment Method</h2>
              <div className="mb-4 flex flex-wrap gap-2">
                {(["card", "paypal", "apple", "google"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setPaymentTab(t)}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold capitalize ${paymentTab === t ? "border-fern-700 bg-fern-700 text-white" : "border-charcoal-200 text-charcoal-600"}`}
                  >
                    {t === "card" ? "Credit / Debit Card" : t === "paypal" ? "PayPal" : t === "apple" ? "Apple Pay" : "Google Pay"}
                  </button>
                ))}
              </div>
              {paymentTab === "card" ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-2 rounded-xl border border-charcoal-200 px-4 py-2.5 sm:col-span-2">
                    <CreditCard className="h-4 w-4 text-charcoal-400" />
                    <input
                      value={card.number}
                      onChange={(e) => setCard({ ...card, number: e.target.value })}
                      placeholder="Card number (demo, not processed)"
                      className="w-full bg-transparent text-sm focus:outline-none"
                    />
                  </div>
                  <input value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} placeholder="Cardholder name" className="input-field sm:col-span-2" />
                  <input value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} placeholder="MM/YY" className="input-field" />
                  <input value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} placeholder="CVV" className="input-field" />
                  <p className="text-xs text-charcoal-400 sm:col-span-2">
                    This is a demo checkout. No real payment is processed and no card details are stored.
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-charcoal-200 p-6 text-center text-sm text-charcoal-500">
                  You'll be redirected to complete payment via {paymentTab === "paypal" ? "PayPal" : paymentTab === "apple" ? "Apple Pay" : "Google Pay"} (demo).
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-charcoal-100 bg-white p-6">
                <h2 className="mb-3 text-lg font-semibold text-charcoal-900">Items ({lines.length})</h2>
                <div className="flex flex-col gap-3">
                  {lines.map(({ item, product }) => (
                    <div key={item.productId} className="flex items-center gap-3">
                      <img src={product!.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                      <div className="flex-1 text-sm">
                        <p className="font-medium text-charcoal-900">{product!.name}</p>
                        <p className="text-xs text-charcoal-400">Qty {item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold text-charcoal-900">{formatUSD(product!.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-charcoal-100 bg-white p-6">
                <h2 className="mb-2 text-lg font-semibold text-charcoal-900">Delivery Details</h2>
                <div className="flex items-start gap-2 text-sm text-charcoal-600">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-fern-700" />
                  {method === "pickup" ? (
                    <span>{stores.find((s) => s.id === selectedStore)?.name}, {stores.find((s) => s.id === selectedStore)?.address}</span>
                  ) : (
                    <span>{address.fullName}, {address.line1}, {address.city}, {address.state} {address.postalCode}, {address.country}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="rounded-full border border-charcoal-200 px-6 py-2.5 text-sm font-semibold text-charcoal-700 disabled:opacity-0"
            >
              Back
            </button>
            {step < 3 ? (
              <button
                onClick={() => setStep((s) => Math.min(3, s + 1))}
                className="rounded-full bg-fern-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-fern-800"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={placeOrder}
                disabled={placing}
                className="rounded-full bg-fern-700 px-8 py-2.5 text-sm font-semibold text-white hover:bg-fern-800 disabled:opacity-70"
              >
                {placing ? "Placing order…" : "Place Order"}
              </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-charcoal-100 bg-white p-5">
            <h2 className="mb-4 text-lg font-semibold text-charcoal-900">Order Summary</h2>
            <dl className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between"><dt className="text-charcoal-500">Subtotal</dt><dd className="font-medium text-charcoal-900">{formatUSD(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-charcoal-500">Discount</dt><dd className="font-medium text-fern-700">-{formatUSD(discount)}</dd></div>
              <div className="flex justify-between"><dt className="text-charcoal-500">Delivery</dt><dd className="font-medium text-charcoal-900">{deliveryFee === 0 ? "Free" : formatUSD(deliveryFee)}</dd></div>
              <div className="flex justify-between"><dt className="text-charcoal-500">Estimated Tax</dt><dd className="font-medium text-charcoal-900">{formatUSD(tax)}</dd></div>
            </dl>
            <div className="mt-4 flex justify-between border-t border-charcoal-100 pt-4">
              <span className="text-base font-semibold text-charcoal-900">Total</span>
              <span className="text-xl font-semibold text-charcoal-900">{formatUSD(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";
import { formatUSD } from "../lib/format";
import { Section } from "../components/Section";
import { ProductGrid } from "../components/ProductGrid";
import { useState } from "react";

export function Cart() {
  const { activeItems, savedItems, setQuantity, removeFromCart, saveForLater, moveToCart } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [applied, setApplied] = useState<string | null>(null);

  const lines = activeItems
    .map((item) => ({ item, product: products.find((p) => p.id === item.productId) }))
    .filter((l) => l.product);
  const savedLines = savedItems
    .map((item) => ({ item, product: products.find((p) => p.id === item.productId) }))
    .filter((l) => l.product);

  const subtotal = lines.reduce((s, l) => s + l.product!.price * l.item.quantity, 0);
  const discount = applied ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
  const deliveryFee = subtotal > 75 || subtotal === 0 ? 0 : 4.99;
  const tax = Math.round((subtotal - discount) * 0.08 * 100) / 100;
  const total = Math.round((subtotal - discount + deliveryFee + tax) * 100) / 100;

  const suggestions = products.filter((p) => !lines.some((l) => l.product!.id === p.id)).slice(0, 5);

  if (lines.length === 0 && savedLines.length === 0) {
    return (
      <div className="container-shell flex flex-col items-center justify-center gap-4 py-24 text-center">
        <ShoppingBag className="h-12 w-12 text-charcoal-300" />
        <h1 className="font-display text-2xl font-semibold text-charcoal-900">Your cart is empty</h1>
        <p className="max-w-sm text-sm text-charcoal-500">Looks like you haven't added anything yet. Let's find something fresh.</p>
        <Link to="/shop" className="rounded-full bg-fern-700 px-6 py-3 text-sm font-semibold text-white hover:bg-fern-800">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-shell py-8">
      <h1 className="mb-6 font-display text-3xl font-semibold text-charcoal-900">Shopping Cart</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-3">
            {lines.map(({ item, product }) => (
              <div key={item.productId} className="flex gap-4 rounded-2xl border border-charcoal-100 bg-white p-4">
                <img src={product!.image} alt={product!.name} className="h-20 w-20 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link to={`/product/${product!.id}`} className="font-semibold text-charcoal-900 hover:text-fern-700">
                        {product!.name}
                      </Link>
                      <p className="text-xs text-charcoal-400">{product!.brand} · {product!.unit}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.productId)} aria-label="Remove item" className="text-charcoal-300 hover:text-clay-500">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center rounded-full border border-charcoal-200">
                      <button onClick={() => setQuantity(item.productId, item.quantity - 1)} className="flex h-9 w-9 items-center justify-center text-charcoal-600" aria-label="Decrease quantity">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => setQuantity(item.productId, item.quantity + 1)} className="flex h-9 w-9 items-center justify-center text-charcoal-600" aria-label="Increase quantity">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => saveForLater(item.productId)} className="text-xs font-semibold text-charcoal-500 hover:text-fern-700">
                        Save for later
                      </button>
                      <span className="text-base font-semibold text-charcoal-900">{formatUSD(product!.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {savedLines.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-3 text-lg font-semibold text-charcoal-900">Saved for Later ({savedLines.length})</h2>
              <div className="flex flex-col gap-3">
                {savedLines.map(({ item, product }) => (
                  <div key={item.productId} className="flex gap-4 rounded-2xl border border-charcoal-100 bg-white p-4">
                    <img src={product!.image} alt={product!.name} className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-charcoal-900">{product!.name}</p>
                      <p className="text-xs text-charcoal-400">{formatUSD(product!.price)} · {product!.unit}</p>
                      <div className="mt-2 flex gap-3">
                        <button onClick={() => moveToCart(item.productId)} className="text-xs font-semibold text-fern-700 hover:underline">
                          Move to cart
                        </button>
                        <button onClick={() => removeFromCart(item.productId)} className="text-xs font-semibold text-clay-500 hover:underline">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-charcoal-100 bg-white p-5">
            <h2 className="mb-4 text-lg font-semibold text-charcoal-900">Order Summary</h2>
            <div className="mb-4 flex gap-2">
              <input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code"
                className="w-full rounded-full border border-charcoal-200 px-4 py-2 text-sm focus:border-fern-500 focus:outline-none"
              />
              <button
                onClick={() => { if (promoCode.trim()) setApplied(promoCode.trim().toUpperCase()); }}
                className="shrink-0 rounded-full bg-charcoal-900 px-4 py-2 text-xs font-semibold text-white hover:bg-charcoal-800"
              >
                Apply
              </button>
            </div>
            {applied && <p className="mb-3 text-xs font-medium text-fern-700">Code "{applied}" applied, 10% off</p>}
            <dl className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between"><dt className="text-charcoal-500">Subtotal</dt><dd className="font-medium text-charcoal-900">{formatUSD(subtotal)}</dd></div>
              {discount > 0 && <div className="flex justify-between"><dt className="text-charcoal-500">Discount</dt><dd className="font-medium text-fern-700">-{formatUSD(discount)}</dd></div>}
              <div className="flex justify-between"><dt className="text-charcoal-500">Delivery</dt><dd className="font-medium text-charcoal-900">{deliveryFee === 0 ? "Free" : formatUSD(deliveryFee)}</dd></div>
              <div className="flex justify-between"><dt className="text-charcoal-500">Estimated Tax</dt><dd className="font-medium text-charcoal-900">{formatUSD(tax)}</dd></div>
            </dl>
            <div className="mt-4 flex justify-between border-t border-charcoal-100 pt-4">
              <span className="text-base font-semibold text-charcoal-900">Total</span>
              <span className="text-xl font-semibold text-charcoal-900">{formatUSD(total)}</span>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="mt-5 w-full rounded-full bg-fern-700 py-3.5 text-sm font-semibold text-white hover:bg-fern-800"
            >
              Proceed to Checkout
            </button>
            {subtotal < 75 && subtotal > 0 && (
              <p className="mt-3 text-center text-xs text-charcoal-500">
                Add {formatUSD(75 - subtotal)} more for free delivery
              </p>
            )}
          </div>
        </div>
      </div>

      <Section title="You may also like" className="px-0">
        <ProductGrid products={suggestions} />
      </Section>
    </div>
  );
}

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";
import { formatUSD } from "../lib/format";

export function CartDrawer() {
  const { isDrawerOpen, closeDrawer, activeItems, setQuantity, removeFromCart } = useCart();
  const { products } = useProducts();

  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen, closeDrawer]);

  if (!isDrawerOpen) return null;

  const lines = activeItems
    .map((item) => ({ item, product: products.find((p) => p.id === item.productId) }))
    .filter((l) => l.product);
  const subtotal = lines.reduce((s, l) => s + l.product!.price * l.item.quantity, 0);

  return createPortal(
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div className="absolute inset-0 bg-charcoal-950/50 backdrop-blur-sm" onClick={closeDrawer} />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-panel animate-[drawer-in_0.28s_cubic-bezier(0.16,1,0.3,1)]">
        <div className="flex items-center justify-between border-b border-charcoal-100 px-5 py-4">
          <h2 className="text-lg font-semibold text-charcoal-900">Your Cart ({lines.length})</h2>
          <button onClick={closeDrawer} aria-label="Close cart" className="rounded-full p-1.5 text-charcoal-400 hover:bg-charcoal-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-charcoal-300" />
            <p className="text-sm text-charcoal-500">Your cart is empty.</p>
            <Link to="/shop" onClick={closeDrawer} className="rounded-full bg-fern-700 px-5 py-2 text-sm font-semibold text-white hover:bg-fern-800">
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-4">
                {lines.map(({ item, product }) => (
                  <li key={item.productId} className="flex gap-3">
                    <img src={product!.image} alt="" className="h-16 w-16 shrink-0 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <Link to={`/product/${product!.id}`} onClick={closeDrawer} className="line-clamp-1 text-sm font-medium text-charcoal-900 hover:text-fern-700">
                        {product!.name}
                      </Link>
                      <p className="text-xs text-charcoal-400">{product!.unit}</p>
                      <div className="mt-1.5 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-charcoal-200">
                          <button onClick={() => setQuantity(item.productId, item.quantity - 1)} className="flex h-7 w-7 items-center justify-center text-charcoal-600" aria-label="Decrease quantity">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                          <button onClick={() => setQuantity(item.productId, item.quantity + 1)} className="flex h-7 w-7 items-center justify-center text-charcoal-600" aria-label="Increase quantity">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-charcoal-900">{formatUSD(product!.price * item.quantity)}</span>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.productId)} aria-label="Remove item" className="self-start text-charcoal-300 hover:text-clay-500">
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-charcoal-100 px-5 py-4">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-charcoal-500">Subtotal</span>
                <span className="text-base font-semibold text-charcoal-900">{formatUSD(subtotal)}</span>
              </div>
              <Link
                to="/cart"
                onClick={closeDrawer}
                className="block w-full rounded-full bg-fern-700 py-3 text-center text-sm font-semibold text-white hover:bg-fern-800"
              >
                View Cart & Checkout
              </Link>
            </div>
          </>
        )}
      </div>
      <style>{`
        @keyframes drawer-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
    </div>,
    document.body
  );
}

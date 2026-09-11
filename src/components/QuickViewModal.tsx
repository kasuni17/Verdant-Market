import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Minus, Plus } from "lucide-react";
import type { Product } from "../types";
import { Modal } from "./Modal";
import { Rating } from "./Rating";
import { PriceTag } from "./PriceTag";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export function QuickViewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addToCart } = useCart();
  const { toggle, isSaved } = useWishlist();
  const [qty, setQty] = useState(1);
  const outOfStock = product.stock <= 0;

  return (
    <Modal onClose={onClose} maxWidth="max-w-2xl" labelledBy="quickview-title">
      <div className="grid gap-0 sm:grid-cols-2">
        <div className="aspect-square bg-ivory-100 sm:rounded-l-2xl">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover sm:rounded-l-2xl" />
        </div>
        <div className="flex flex-col gap-3 p-6">
          <span className="text-xs font-medium uppercase tracking-wide text-charcoal-400">{product.brand}</span>
          <h2 id="quickview-title" className="text-xl font-semibold text-charcoal-900">{product.name}</h2>
          <Rating value={product.rating} count={product.reviewCount} />
          <PriceTag price={product.price} originalPrice={product.originalPrice} unit={product.unit} size="lg" />
          <p className="text-sm text-charcoal-500">{product.description}</p>

          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center rounded-full border border-charcoal-200">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-9 w-9 items-center justify-center text-charcoal-600" aria-label="Decrease quantity">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="flex h-9 w-9 items-center justify-center text-charcoal-600" aria-label="Increase quantity">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              onClick={() => { addToCart(product.id, qty); onClose(); }}
              disabled={outOfStock}
              className="flex-1 rounded-full bg-fern-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-fern-800 disabled:bg-charcoal-200"
            >
              {outOfStock ? "Out of stock" : "Add to Cart"}
            </button>
            <button
              onClick={() => toggle(product.id)}
              aria-label="Toggle wishlist"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-charcoal-200 text-charcoal-500 hover:text-clay-500"
            >
              <Heart className={`h-4 w-4 ${isSaved(product.id) ? "fill-clay-500 text-clay-500" : ""}`} />
            </button>
          </div>
          <Link to={`/product/${product.id}`} onClick={onClose} className="mt-1 text-sm font-medium text-fern-700 hover:underline">
            View full details →
          </Link>
        </div>
      </div>
    </Modal>
  );
}

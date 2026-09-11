import { Link } from "react-router-dom";
import { Heart, Plus, Eye } from "lucide-react";
import type { Product } from "../types";
import { PriceTag } from "./PriceTag";
import { Rating } from "./Rating";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState } from "react";
import { QuickViewModal } from "./QuickViewModal";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toggle, isSaved } = useWishlist();
  const [quickView, setQuickView] = useState(false);
  const outOfStock = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= product.reorderLevel;

  return (
    <>
      <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-charcoal-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
        <div className="relative aspect-square overflow-hidden bg-ivory-100">
          <Link to={`/product/${product.id}`} aria-label={product.name}>
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          <div className="absolute left-2.5 top-2.5 flex flex-col gap-1.5">
            {product.originalPrice && (
              <span className="rounded-full bg-clay-500 px-2 py-1 text-[11px] font-bold text-white shadow-sm">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
            {product.isNew && (
              <span className="rounded-full bg-fern-700 px-2 py-1 text-[11px] font-bold text-white shadow-sm">
                NEW
              </span>
            )}
            {product.organic && (
              <span className="rounded-full bg-fern-100 px-2 py-1 text-[11px] font-bold text-fern-800 shadow-sm">
                ORGANIC
              </span>
            )}
          </div>

          <button
            onClick={() => toggle(product.id)}
            aria-label={isSaved(product.id) ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={isSaved(product.id)}
            className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-charcoal-500 shadow-sm backdrop-blur transition hover:text-clay-500"
          >
            <Heart className={`h-4 w-4 ${isSaved(product.id) ? "fill-clay-500 text-clay-500" : ""}`} />
          </button>

          <button
            onClick={() => setQuickView(true)}
            className="absolute inset-x-2.5 bottom-2.5 flex translate-y-2 items-center justify-center gap-1.5 rounded-lg bg-charcoal-900/90 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Eye className="h-3.5 w-3.5" /> Quick view
          </button>

          {outOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70">
              <span className="rounded-full bg-charcoal-900 px-3 py-1 text-xs font-semibold text-white">
                Out of stock
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-3.5">
          <span className="text-[11px] font-medium uppercase tracking-wide text-charcoal-400">{product.brand}</span>
          <Link to={`/product/${product.id}`} className="line-clamp-2 text-sm font-semibold text-charcoal-900 hover:text-fern-700">
            {product.name}
          </Link>
          <Rating value={product.rating} count={product.reviewCount} />
          {lowStock && <span className="text-[11px] font-medium text-clay-500">Only {product.stock} left</span>}
          <div className="mt-auto flex items-end justify-between gap-2 pt-2">
            <PriceTag price={product.price} originalPrice={product.originalPrice} unit={product.unit} size="sm" />
            <button
              onClick={() => addToCart(product.id)}
              disabled={outOfStock}
              aria-label={`Add ${product.name} to cart`}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fern-700 text-white transition hover:bg-fern-800 disabled:cursor-not-allowed disabled:bg-charcoal-200"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      {quickView && <QuickViewModal product={product} onClose={() => setQuickView(false)} />}
    </>
  );
}

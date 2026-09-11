import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Heart, Minus, Plus, ShieldCheck, Store, Truck } from "lucide-react";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Rating } from "../components/Rating";
import { PriceTag } from "../components/PriceTag";
import { Section } from "../components/Section";
import { ProductGrid } from "../components/ProductGrid";
import { relatedProducts } from "../data/products";
import { formatDate } from "../lib/format";

const TABS = ["Description", "Product Information", "Nutrition", "Reviews"] as const;

export function ProductDetails() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { toggle, isSaved } = useWishlist();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Description");

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container-shell py-20 text-center">
        <p className="text-lg font-semibold text-charcoal-700">Product not found</p>
        <Link to="/shop" className="mt-3 inline-block text-sm font-semibold text-fern-700 hover:underline">
          ← Back to Shop
        </Link>
      </div>
    );
  }

  const related = relatedProducts(product, 8)
    .map((p) => products.find((x) => x.id === p.id) ?? p)
    .filter((p) => p.id !== product.id);
  const outOfStock = product.stock <= 0;

  return (
    <div className="container-shell py-8">
      <p className="mb-6 text-xs font-medium text-charcoal-400">
        <Link to="/" className="hover:text-fern-700">Home</Link> /{" "}
        <Link to={`/shop?category=${product.categoryId}`} className="hover:text-fern-700">{product.subcategory}</Link> /{" "}
        <span className="text-charcoal-700">{product.name}</span>
      </p>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-2xl bg-ivory-100">
            <img src={product.gallery[activeImg]} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className="mt-3 flex gap-2">
            {product.gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                aria-label={`View image ${i + 1}`}
                className={`h-16 w-16 overflow-hidden rounded-lg border-2 ${activeImg === i ? "border-fern-600" : "border-transparent"}`}
              >
                <img src={g} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-charcoal-400">{product.brand}</span>
            {product.organic && <span className="rounded-full bg-fern-100 px-2 py-0.5 text-[11px] font-bold text-fern-800">ORGANIC</span>}
            {product.isNew && <span className="rounded-full bg-fern-700 px-2 py-0.5 text-[11px] font-bold text-white">NEW</span>}
          </div>
          <h1 className="font-display text-3xl font-semibold text-charcoal-900">{product.name}</h1>
          <Rating value={product.rating} count={product.reviewCount} size="md" />
          <PriceTag price={product.price} originalPrice={product.originalPrice} unit={product.unit} size="lg" />
          <p className="text-sm text-charcoal-500">{product.description}</p>

          <div className="flex items-center gap-2 text-sm">
            <span className={`h-2 w-2 rounded-full ${outOfStock ? "bg-clay-500" : "bg-fern-600"}`} />
            {outOfStock ? (
              <span className="font-medium text-clay-500">Out of stock</span>
            ) : product.stock <= product.reorderLevel ? (
              <span className="font-medium text-clay-500">Only {product.stock} left in stock</span>
            ) : (
              <span className="font-medium text-fern-700">In stock</span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <div className="flex items-center rounded-full border border-charcoal-200">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-11 w-11 items-center justify-center text-charcoal-600" aria-label="Decrease quantity">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="flex h-11 w-11 items-center justify-center text-charcoal-600" aria-label="Increase quantity">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => addToCart(product.id, qty)}
              disabled={outOfStock}
              className="flex-1 rounded-full bg-fern-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-fern-800 disabled:bg-charcoal-200 sm:flex-none"
            >
              Add to Cart
            </button>
            <button
              onClick={() => { addToCart(product.id, qty); navigate("/checkout"); }}
              disabled={outOfStock}
              className="flex-1 rounded-full border border-charcoal-900 px-6 py-3 text-sm font-semibold text-charcoal-900 transition hover:bg-charcoal-900 hover:text-white disabled:border-charcoal-200 disabled:text-charcoal-300 sm:flex-none"
            >
              Buy Now
            </button>
            <button
              onClick={() => toggle(product.id)}
              aria-label="Toggle wishlist"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal-200 text-charcoal-500 hover:text-clay-500"
            >
              <Heart className={`h-4 w-4 ${isSaved(product.id) ? "fill-clay-500 text-clay-500" : ""}`} />
            </button>
          </div>

          <div className="mt-2 flex flex-col gap-3 rounded-2xl border border-charcoal-100 p-4">
            <div className="flex items-center gap-3 text-sm text-charcoal-600">
              <Truck className="h-4 w-4 text-fern-700" /> Delivery estimate: 1–2 business days
            </div>
            <div className="flex items-center gap-3 text-sm text-charcoal-600">
              <Store className="h-4 w-4 text-fern-700" /> Pickup available at 6 nearby stores
            </div>
            <div className="flex items-center gap-3 text-sm text-charcoal-600">
              <ShieldCheck className="h-4 w-4 text-fern-700" /> Freshness guaranteed or your money back
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12 border-b border-charcoal-100">
        <div className="flex gap-6 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`shrink-0 whitespace-nowrap border-b-2 px-1 py-3 text-sm font-semibold ${
                tab === t ? "border-fern-700 text-fern-800" : "border-transparent text-charcoal-500 hover:text-charcoal-800"
              }`}
            >
              {t} {t === "Reviews" && `(${product.reviewCount})`}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-3xl py-8">
        {tab === "Description" && (
          <div className="flex flex-col gap-3 text-sm leading-relaxed text-charcoal-600">
            <p>{product.longDescription}</p>
            {product.ingredients && (
              <>
                <h3 className="mt-2 font-semibold text-charcoal-900">Ingredients</h3>
                <p>{product.ingredients}</p>
              </>
            )}
          </div>
        )}
        {tab === "Product Information" && (
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
            {[
              ["SKU", product.sku],
              ["Brand", product.brand],
              ["Category", product.subcategory],
              ["Unit", product.unit],
              ["Stock", `${product.stock} units`],
              ["Tags", product.tags.join(", ") || "None"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-charcoal-400">{label}</dt>
                <dd className="font-medium text-charcoal-800">{value}</dd>
              </div>
            ))}
          </dl>
        )}
        {tab === "Nutrition" && product.nutrition && (
          <table className="w-full max-w-sm text-sm">
            <tbody>
              {product.nutrition.map((n) => (
                <tr key={n.label} className="border-b border-charcoal-100">
                  <td className="py-2 text-charcoal-500">{n.label}</td>
                  <td className="py-2 text-right font-medium text-charcoal-800">{n.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === "Reviews" && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4 rounded-2xl bg-ivory-100 p-4">
              <span className="text-3xl font-semibold text-charcoal-900">{product.rating.toFixed(1)}</span>
              <div>
                <Rating value={product.rating} size="md" />
                <p className="mt-0.5 text-xs text-charcoal-500">{product.reviewCount} reviews</p>
              </div>
            </div>
            {product.reviews.map((r) => (
              <div key={r.id} className="border-b border-charcoal-100 pb-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-charcoal-900">{r.author}</p>
                  <p className="text-xs text-charcoal-400">{formatDate(r.date)}</p>
                </div>
                <Rating value={r.rating} />
                <p className="mt-1.5 text-sm font-medium text-charcoal-800">{r.title}</p>
                <p className="mt-0.5 text-sm text-charcoal-500">{r.body}</p>
                {r.verified && <span className="mt-1 inline-block text-xs font-medium text-fern-700">Verified purchase</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      <Section title="Frequently Bought Together" className="px-0">
        <ProductGrid products={related.slice(0, 4)} />
      </Section>

      <Section title="You May Also Like" className="px-0">
        <ProductGrid products={related.slice(4, 8)} />
      </Section>
    </div>
  );
}

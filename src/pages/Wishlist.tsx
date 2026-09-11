import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useProducts } from "../context/ProductsContext";
import { ProductGrid } from "../components/ProductGrid";

export function Wishlist() {
  const { ids } = useWishlist();
  const { products } = useProducts();
  const saved = products.filter((p) => ids.includes(p.id));

  return (
    <div className="container-shell py-8">
      <h1 className="mb-1 font-display text-3xl font-semibold text-charcoal-900">Your Wishlist</h1>
      <p className="mb-8 text-sm text-charcoal-500">{saved.length} saved items</p>

      {saved.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <Heart className="h-12 w-12 text-charcoal-300" />
          <p className="text-sm text-charcoal-500">You haven't saved anything yet.</p>
          <Link to="/shop" className="rounded-full bg-fern-700 px-6 py-3 text-sm font-semibold text-white hover:bg-fern-800">
            Browse Products
          </Link>
        </div>
      ) : (
        <ProductGrid products={saved} />
      )}
    </div>
  );
}

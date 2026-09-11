import { useProducts } from "../context/ProductsContext";
import { ProductGrid } from "../components/ProductGrid";

export function NewArrivals() {
  const { products } = useProducts();
  const arrivals = products.filter((p) => p.isNew);

  return (
    <div className="container-shell py-10">
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-fern-700">Just landed</p>
      <h1 className="mb-2 font-display text-3xl font-semibold text-charcoal-900 sm:text-4xl">New Arrivals</h1>
      <p className="mb-8 max-w-xl text-sm text-charcoal-500">
        The newest additions to our shelves: fresh finds worth adding to your cart.
      </p>
      <ProductGrid products={arrivals} />
    </div>
  );
}

import { useMemo } from "react";
import { useProducts } from "../context/ProductsContext";
import { ProductGrid } from "../components/ProductGrid";
import { Section } from "../components/Section";
import { categoryPhoto } from "../lib/productImages";
import { usePromotions } from "../context/PromotionsContext";

export function Deals() {
  const { products } = useProducts();
  const { promotions } = usePromotions();

  const discounted = useMemo(
    () => products.filter((p) => p.originalPrice && p.originalPrice > p.price).sort((a, b) => {
      const da = ((a.originalPrice! - a.price) / a.originalPrice!);
      const db = ((b.originalPrice! - b.price) / b.originalPrice!);
      return db - da;
    }),
    [products]
  );

  const flash = discounted.slice(0, 5);
  const weekly = discounted.slice(5, 15);
  const bogo = products.filter((p) => p.subcategory === "Chips & Crisps" || p.subcategory === "Nuts & Seeds").slice(0, 5);
  const bundles = products.filter((p) => p.categoryId === "pantry-grocery").slice(0, 5);

  return (
    <div>
      <section className="relative overflow-hidden bg-clay-500">
        <div className="container-shell flex flex-col items-start gap-4 py-14 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-widest text-clay-100">Limited time</p>
          <h1 className="font-display text-4xl font-semibold text-white sm:text-5xl">This Week's Deals</h1>
          <p className="max-w-lg text-sm text-clay-100">
            Real savings across the store: flash offers, weekly deals, bundles and buy-more-save-more picks.
          </p>
        </div>
      </section>

      <Section eyebrow="Ends soon" title="Flash Offers" subtitle="Limited-time savings, while stocks last.">
        <ProductGrid products={flash} />
      </Section>

      <Section eyebrow="This week" title="Weekly Deals">
        <ProductGrid products={weekly} />
      </Section>

      <section className="container-shell pb-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative flex h-40 items-center justify-between overflow-hidden rounded-2xl bg-fern-800 px-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-fern-200">Snacks</p>
              <p className="text-xl font-semibold text-white">Buy 2, Get 1 Free</p>
            </div>
            <img src={categoryPhoto("snacks", 200, 200)} alt="" loading="lazy" className="h-24 w-24 rounded-xl object-cover" />
          </div>
          <div className="relative flex h-40 items-center justify-between overflow-hidden rounded-2xl bg-gold-500 px-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-gold-100">Pantry</p>
              <p className="text-xl font-semibold text-white">Bundle & Save 15%</p>
            </div>
            <img src={categoryPhoto("pantry", 200, 200)} alt="" loading="lazy" className="h-24 w-24 rounded-xl object-cover" />
          </div>
        </div>
      </section>

      <Section eyebrow="Stock up" title="Buy 1 Get 1 Free">
        <ProductGrid products={bogo} />
      </Section>

      <Section eyebrow="Save more" title="Bundle Offers">
        <ProductGrid products={bundles} />
      </Section>

      <Section eyebrow="Active promotions" title="Category Promotions">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {promotions.filter((p) => p.status === "active").map((p) => (
            <div key={p.id} className="rounded-2xl border border-charcoal-100 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-fern-700">{p.target}</p>
              <p className="mt-1 text-lg font-semibold text-charcoal-900">{p.name}</p>
              <p className="mt-1 text-sm text-charcoal-500">
                {p.type === "percentage" || p.type === "category" ? `${p.discountValue}% off` : p.type === "free_delivery" ? "Free delivery" : "Special offer"}
                {" · "}Through {new Date(p.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

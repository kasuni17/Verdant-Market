import { Link } from "react-router-dom";
import { ArrowRight, Leaf, ShieldCheck, Truck, Undo2 } from "lucide-react";
import { Section } from "../components/Section";
import { ProductGrid } from "../components/ProductGrid";
import { ProductCard } from "../components/ProductCard";
import { CategoryCard } from "../components/CategoryCard";
import { categories } from "../data/categories";
import { useProducts } from "../context/ProductsContext";
import { discountedProducts, featuredProducts, newProducts } from "../data/products";
import { categoryPhoto } from "../lib/productImages";

const PERKS = [
  { icon: Truck, title: "Free delivery over $75", desc: "Standard delivery on qualifying orders." },
  { icon: Leaf, title: "Freshness guaranteed", desc: "Quality-checked before it ships." },
  { icon: ShieldCheck, title: "Secure checkout", desc: "Your data is always protected." },
  { icon: Undo2, title: "Easy returns", desc: "Not happy? We'll make it right." },
];

const CAMPAIGNS = [
  { title: "Weekly Savings", tag: "SAVE UP TO 30%", desc: "Pantry & Grocery essentials", to: "/deals", group: "pantry" },
  { title: "Fresh Picks", tag: "20% OFF", desc: "Fruits & vegetables this week", to: "/fresh", group: "produce" },
  { title: "Under $10", tag: "EVERYDAY VALUE", desc: "Snacks, breakfast & more", to: "/shop?maxPrice=10", group: "snacks" },
];

const FRESH_DEPARTMENTS = [
  { label: "Fruits", group: "produce", to: "/shop?category=fruits-vegetables" },
  { label: "Vegetables", group: "organic", to: "/shop?category=fruits-vegetables" },
  { label: "Herbs", group: "produce", to: "/shop?category=fruits-vegetables" },
  { label: "Organic", group: "organic", to: "/shop?category=organic-natural" },
  { label: "Bakery", group: "bakery", to: "/shop?category=bakery" },
  { label: "Dairy", group: "dairy", to: "/shop?category=dairy-eggs" },
  { label: "Meat", group: "meat", to: "/shop?category=meat-poultry" },
  { label: "Seafood", group: "seafood", to: "/shop?category=seafood" },
];

export function Home() {
  const { products } = useProducts();
  const deals = discountedProducts()
    .map((p) => products.find((x) => x.id === p.id) ?? p)
    .slice(0, 10);
  const featured = featuredProducts()
    .map((p) => products.find((x) => x.id === p.id) ?? p)
    .slice(0, 10);
  const arrivals = newProducts()
    .map((p) => products.find((x) => x.id === p.id) ?? p)
    .slice(0, 5);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-fern-50">
        <div className="container-shell grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:py-16">
          <div className="max-w-xl motion-safe:animate-[fade-in-up_0.7s_ease-out]">
            <p className="mb-3 inline-flex items-center rounded-full bg-fern-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-fern-800">
              Fresh · International · Trusted
            </p>
            <h1 className="text-balance font-display text-4xl font-semibold leading-[1.08] text-charcoal-900 sm:text-5xl lg:text-6xl">
              Fresh food.
              <br /> Better living.
            </h1>
            <p className="mt-4 max-w-md text-base text-charcoal-600 sm:text-lg">
              Premium produce, pantry essentials and everyday favourites, sourced with care and delivered
              when you need them, wherever you call home.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/fresh"
                className="rounded-full bg-fern-700 px-7 py-3.5 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-fern-800 hover:shadow-card-hover"
              >
                Shop Fresh
              </Link>
              <Link
                to="/shop"
                className="flex items-center gap-1.5 rounded-full border border-charcoal-200 bg-white px-7 py-3.5 text-sm font-semibold text-charcoal-800 transition hover:-translate-y-0.5 hover:border-charcoal-300"
              >
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-charcoal-500">
              <div>
                <p className="text-xl font-semibold text-charcoal-900">1,200+</p>
                <p>Quality products</p>
              </div>
              <div className="h-8 w-px bg-charcoal-200" />
              <div>
                <p className="text-xl font-semibold text-charcoal-900">6</p>
                <p>International cities</p>
              </div>
              <div className="h-8 w-px bg-charcoal-200" />
              <div>
                <p className="text-xl font-semibold text-charcoal-900">4.8★</p>
                <p>Average rating</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md motion-safe:animate-[fade-in-up_0.9s_ease-out] lg:max-w-none">
            <div className="overflow-hidden rounded-3xl shadow-panel ring-1 ring-charcoal-900/5">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&h=900&q=80"
                srcSet="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&h=525&q=80 700w, https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&h=900&q=80 1200w"
                sizes="(min-width: 1024px) 560px, 90vw"
                alt="Fresh produce and grocery display in a premium supermarket"
                className="aspect-[4/3] w-full object-cover sm:aspect-[6/5] lg:aspect-[6/5]"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div className="absolute -left-4 bottom-6 hidden rounded-2xl border border-charcoal-100 bg-white p-4 shadow-panel sm:block">
              <p className="text-xs font-semibold uppercase tracking-wide text-fern-700">This week</p>
              <p className="text-lg font-semibold text-charcoal-900">20% off Fresh Produce</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fresh promo */}
      <section className="relative overflow-hidden bg-fern-950">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&h=800&q=80"
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-fern-950/95 via-fern-950/80 to-fern-950/40" />
        <div className="container-shell relative grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-fern-200">Farm to Table</p>
            <h2 className="text-balance font-display text-3xl font-semibold text-white sm:text-4xl">
              Fresh, every single day.
            </h2>
            <p className="mt-4 max-w-lg text-sm text-fern-100 sm:text-base">
              Explore our fresh departments: produce, bakery, dairy, meat and seafood, sourced with care
              and quality-checked before it reaches you.
            </p>
            <Link
              to="/fresh"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-fern-900 transition hover:-translate-y-0.5 hover:bg-fern-50"
            >
              Explore Fresh <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-4">
            {FRESH_DEPARTMENTS.map((d) => (
              <Link
                key={d.label}
                to={d.to}
                className="group flex flex-col items-center gap-2 rounded-xl bg-white/10 p-2.5 text-center backdrop-blur transition hover:bg-white/20"
              >
                <span className="h-12 w-12 overflow-hidden rounded-full ring-1 ring-white/30 sm:h-14 sm:w-14">
                  <img
                    src={categoryPhoto(d.group, 120, 120)}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                </span>
                <span className="text-[11px] font-semibold text-white sm:text-xs">{d.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="border-y border-charcoal-100 bg-white">
        <div className="container-shell grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
          {PERKS.map((p) => (
            <div key={p.title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fern-50 text-fern-700">
                <p.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-charcoal-900">{p.title}</p>
                <p className="text-xs text-charcoal-500">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category grid */}
      <Section eyebrow="Browse" title="Shop by Category" subtitle="Everything you need, organized the way you shop.">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6">
          {categories.slice(0, 12).map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </Section>

      {/* Campaign banners */}
      <section className="container-shell pb-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {CAMPAIGNS.map((c) => (
            <Link
              key={c.title}
              to={c.to}
              className="group relative flex h-44 flex-col justify-end overflow-hidden rounded-2xl p-5 shadow-card transition hover:shadow-card-hover"
            >
              <img src={categoryPhoto(c.group, 600, 300)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-charcoal-950/10 to-transparent" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-wide text-fern-200">{c.tag}</p>
                <p className="text-lg font-semibold text-white">{c.title}</p>
                <p className="text-xs text-ivory-100/80">{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Deals */}
      <Section eyebrow="Save more" title="Today's Deals" subtitle="Handpicked savings across the store." viewAllTo="/deals">
        <div className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-5">
          {deals.map((p) => (
            <div key={p.id} className="w-40 shrink-0 snap-start sm:w-auto">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </Section>

      {/* Featured */}
      <Section eyebrow="Curated" title="Featured Products" subtitle="Popular picks our customers keep coming back for." viewAllTo="/shop">
        <ProductGrid products={featured} />
      </Section>

      {/* New arrivals */}
      <Section eyebrow="Just landed" title="New Arrivals" subtitle="The newest additions to our shelves." viewAllTo="/new-arrivals">
        <ProductGrid products={arrivals} />
      </Section>
    </div>
  );
}

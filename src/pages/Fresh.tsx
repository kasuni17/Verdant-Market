import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { Section } from "../components/Section";
import { ProductGrid } from "../components/ProductGrid";
import { categoryPhoto } from "../lib/productImages";

const FRESH_CATEGORIES = [
  { id: "fruits-vegetables", label: "Fruits", group: "produce", filterSub: "Fresh Fruit" },
  { id: "fruits-vegetables", label: "Vegetables", group: "produce", filterSub: "Fresh Vegetables" },
  { id: "fruits-vegetables", label: "Herbs", group: "produce", filterSub: "Herbs" },
  { id: "organic-natural", label: "Organic", group: "organic" },
  { id: "bakery", label: "Bakery", group: "bakery" },
  { id: "dairy-eggs", label: "Dairy", group: "dairy" },
  { id: "meat-poultry", label: "Meat", group: "meat" },
  { id: "seafood", label: "Seafood", group: "seafood" },
];

export function Fresh() {
  const { products } = useProducts();
  const freshIds = ["fruits-vegetables", "bakery", "dairy-eggs", "meat-poultry", "seafood", "organic-natural"];
  const freshProducts = products.filter((p) => freshIds.includes(p.categoryId));

  return (
    <div>
      <section className="relative mt-5 overflow-hidden bg-fern-900 sm:mt-6 lg:mt-8">
        <img src={categoryPhoto("produce", 1600, 500)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="container-shell relative flex flex-col items-start gap-4 py-16 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-widest text-fern-200">Farm to Table</p>
          <h1 className="max-w-2xl text-balance font-display text-4xl font-semibold text-white sm:text-5xl">
            Fresh, every single day.
          </h1>
          <p className="max-w-lg text-sm text-fern-100">
            Explore our fresh departments: produce, bakery, dairy, meat and seafood, sourced with care and
            quality-checked before it reaches you.
          </p>
        </div>
      </section>

      <section className="container-shell mt-5 pb-8 sm:mt-6 lg:mt-8">
        <div className="rounded-3xl bg-white p-4 shadow-panel sm:p-5 lg:p-6">
          <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto pb-1 sm:gap-3.5 lg:grid lg:grid-cols-8 lg:gap-4 lg:overflow-visible lg:pb-0">
            {FRESH_CATEGORIES.map((c, i) => (
              <Link
                key={i}
                to={`/shop?category=${c.id}`}
                className="group flex w-24 shrink-0 snap-start flex-col items-center gap-2.5 rounded-2xl border border-charcoal-100 bg-white p-3 text-center shadow-card transition lg:w-auto lg:p-3.5 lg:hover:-translate-y-1 lg:hover:shadow-card-hover"
              >
                <span className="block h-16 w-16 overflow-hidden rounded-xl ring-1 ring-charcoal-900/5 sm:h-20 sm:w-20 lg:h-24 lg:w-24">
                  <img
                    src={categoryPhoto(c.group, 200, 200)}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover lg:transition-transform lg:duration-300 lg:group-hover:scale-110"
                  />
                </span>
                <span className="text-xs font-semibold text-charcoal-800 sm:text-sm">{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Section eyebrow="Handpicked" title="Fresh This Week" subtitle="A rotating selection of the season's best.">
        <ProductGrid products={freshProducts.slice(0, 15)} />
      </Section>

      <section className="bg-ivory-100">
        <div className="container-shell grid gap-4 py-12 sm:grid-cols-3">
          {[
            { title: "Grown with care", desc: "We partner directly with trusted growers around the world." },
            { title: "Checked for quality", desc: "Every fresh item is inspected before it's packed for delivery." },
            { title: "Delivered fast", desc: "From our stores to your door, as quickly as same-day." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-charcoal-100 bg-white p-6">
              <p className="text-lg font-semibold text-charcoal-900">{f.title}</p>
              <p className="mt-1.5 text-sm text-charcoal-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Section eyebrow="Certified" title="Organic & Natural" subtitle="Trusted organic options across every fresh department." viewAllTo="/shop?category=organic-natural">
        <ProductGrid products={freshProducts.filter((p) => p.organic).slice(0, 10)} />
      </Section>
    </div>
  );
}

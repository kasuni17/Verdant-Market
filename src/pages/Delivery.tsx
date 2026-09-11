import { StaticPage } from "../components/StaticPage";

export function Delivery() {
  return (
    <StaticPage eyebrow="Getting your order to you" title="Delivery Information">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { title: "Standard", desc: "1–2 business days", price: "$4.99 (free over $75)" },
          { title: "Express", desc: "Within 3 hours", price: "$12.99" },
          { title: "Scheduled", desc: "Choose your time slot", price: "$6.99" },
        ].map((d) => (
          <div key={d.title} className="rounded-xl border border-charcoal-100 p-4">
            <p className="font-semibold text-charcoal-900">{d.title}</p>
            <p className="text-sm text-charcoal-500">{d.desc}</p>
            <p className="mt-1 text-sm font-medium text-fern-700">{d.price}</p>
          </div>
        ))}
      </div>
      <p>
        Store pickup is available at all Verdant Market locations, typically ready within two hours of
        ordering. Delivery availability and fees are demo figures for this storefront.
      </p>
    </StaticPage>
  );
}

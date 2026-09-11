import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { StaticPage } from "../components/StaticPage";

const FAQS = [
  { q: "How does delivery work?", a: "Choose standard, express or scheduled delivery at checkout. Standard orders typically arrive within 1–2 business days." },
  { q: "Can I pick up my order in-store?", a: "Yes, select Store Pickup at checkout and choose a nearby location. Most pickup orders are ready within 2 hours." },
  { q: "What is your return policy?", a: "If something isn't right, contact support within 7 days of delivery for a refund or replacement." },
  { q: "Do you offer free delivery?", a: "Orders over $75 qualify for free standard delivery automatically." },
  { q: "How do I track my order?", a: "Visit My Account → Orders and select Track Order on any active order to see live status." },
  { q: "Can I reorder previous purchases?", a: "Yes, use the Buy Again button on any past order to add all items back to your cart instantly." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <StaticPage eyebrow="Support" title="Frequently Asked Questions">
      <div className="flex flex-col divide-y divide-charcoal-100">
        {FAQS.map((f, i) => (
          <div key={f.q} className="py-3">
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-3 text-left">
              <span className="text-sm font-semibold text-charcoal-900">{f.q}</span>
              <ChevronDown className={`h-4 w-4 shrink-0 text-charcoal-400 transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && <p className="mt-2 text-sm text-charcoal-500">{f.a}</p>}
          </div>
        ))}
      </div>
    </StaticPage>
  );
}

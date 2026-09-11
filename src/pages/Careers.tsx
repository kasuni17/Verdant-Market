import { StaticPage } from "../components/StaticPage";

const ROLES = [
  { title: "Store Operations Associate", location: "New York, US", type: "Full-time" },
  { title: "Supply Chain Analyst", location: "London, UK", type: "Full-time" },
  { title: "Frontend Engineer", location: "Remote", type: "Full-time" },
  { title: "Customer Experience Lead", location: "Singapore", type: "Full-time" },
];

export function Careers() {
  return (
    <StaticPage eyebrow="Join us" title="Careers at Verdant Market">
      <p>We're building a better everyday grocery experience for customers around the world. Explore open roles below.</p>
      <div className="flex flex-col divide-y divide-charcoal-100 rounded-2xl border border-charcoal-100 bg-white">
        {ROLES.map((r) => (
          <div key={r.title} className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-semibold text-charcoal-900">{r.title}</p>
              <p className="text-xs text-charcoal-400">{r.location} · {r.type}</p>
            </div>
            <span className="rounded-full border border-charcoal-200 px-4 py-1.5 text-xs font-semibold text-charcoal-700">Apply</span>
          </div>
        ))}
      </div>
    </StaticPage>
  );
}

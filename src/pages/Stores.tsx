import { Clock, MapPin, Truck } from "lucide-react";
import { stores } from "../data/stores";

export function Stores() {
  return (
    <div className="container-shell py-10">
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-fern-700">Find us</p>
      <h1 className="mb-2 font-display text-3xl font-semibold text-charcoal-900 sm:text-4xl">Store Locator</h1>
      <p className="mb-8 max-w-xl text-sm text-charcoal-500">
        Visit one of our international locations for pickup, or explore delivery in your area. Locations shown are fictional and for demonstration only.
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stores.map((s) => (
          <div key={s.id} className="rounded-2xl border border-charcoal-100 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-fern-700">{s.city}, {s.country}</p>
            <h2 className="mt-1 text-lg font-semibold text-charcoal-900">{s.name}</h2>
            <div className="mt-3 flex items-start gap-2 text-sm text-charcoal-600">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-charcoal-400" /> {s.address}
            </div>
            <div className="mt-2 flex items-start gap-2 text-sm text-charcoal-600">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-charcoal-400" /> {s.hours}
            </div>
            {s.pickupAvailable && (
              <div className="mt-2 flex items-start gap-2 text-sm text-fern-700">
                <Truck className="mt-0.5 h-4 w-4 shrink-0" /> Pickup available
              </div>
            )}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {s.services.map((svc) => (
                <span key={svc} className="rounded-full bg-ivory-100 px-2.5 py-1 text-xs font-medium text-charcoal-600">{svc}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

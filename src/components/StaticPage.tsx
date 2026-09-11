import type { ReactNode } from "react";

export function StaticPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <div className="container-shell py-12">
      <div className="mx-auto max-w-2xl">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-fern-700">{eyebrow}</p>
        <h1 className="mb-6 font-display text-3xl font-semibold text-charcoal-900 sm:text-4xl">{title}</h1>
        <div className="flex flex-col gap-4 text-sm leading-relaxed text-charcoal-600">{children}</div>
      </div>
    </div>
  );
}

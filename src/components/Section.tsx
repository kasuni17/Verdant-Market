import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  subtitle,
  viewAllTo,
  children,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  viewAllTo?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`container-shell py-10 sm:py-14 ${className}`}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
        <div>
          {eyebrow && <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-fern-700">{eyebrow}</p>}
          <h2 className="text-2xl font-semibold text-charcoal-900 sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-1.5 max-w-xl text-sm text-charcoal-500">{subtitle}</p>}
        </div>
        {viewAllTo && (
          <Link to={viewAllTo} className="flex items-center gap-1 text-sm font-semibold text-fern-700 hover:gap-1.5 transition-all">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

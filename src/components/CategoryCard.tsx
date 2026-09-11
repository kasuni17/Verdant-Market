import { Link } from "react-router-dom";
import type { CategoryDef } from "../data/categories";

export function CategoryCard({ category }: { category: CategoryDef }) {
  return (
    <Link
      to={`/shop?category=${category.id}`}
      className="group flex flex-col items-center gap-3 rounded-2xl border border-charcoal-100 bg-white p-4 text-center shadow-card transition hover:-translate-y-1 hover:shadow-card-hover"
    >
      <span className="h-16 w-16 overflow-hidden rounded-full ring-1 ring-charcoal-900/5 transition group-hover:scale-105">
        <img
          src={category.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </span>
      <span className="text-sm font-semibold text-charcoal-800">{category.name}</span>
    </Link>
  );
}

import { Star } from "lucide-react";

export function Rating({ value, count, size = "sm" }: { value: number; count?: number; size?: "sm" | "md" }) {
  const starSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => {
          const filled = i + 1 <= Math.round(value);
          return (
            <Star
              key={i}
              className={`${starSize} ${filled ? "fill-gold-500 text-gold-500" : "fill-charcoal-100 text-charcoal-100"}`}
            />
          );
        })}
      </div>
      <span className="text-xs font-medium text-charcoal-600">
        {value.toFixed(1)}
        {typeof count === "number" && <span className="text-charcoal-400"> ({count})</span>}
      </span>
    </div>
  );
}

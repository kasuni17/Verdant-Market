import { formatUSD, discountPct } from "../lib/format";

export function PriceTag({
  price,
  originalPrice,
  unit,
  size = "md",
}: {
  price: number;
  originalPrice?: number;
  unit?: string;
  size?: "sm" | "md" | "lg";
}) {
  const pct = discountPct(price, originalPrice);
  const priceSize = size === "lg" ? "text-2xl" : size === "md" ? "text-lg" : "text-base";
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <span className={`${priceSize} font-semibold text-charcoal-900`}>{formatUSD(price)}</span>
      {originalPrice && pct && (
        <span className="text-sm text-charcoal-400 line-through">{formatUSD(originalPrice)}</span>
      )}
      {unit && <span className="text-xs text-charcoal-400">{unit}</span>}
      {pct && (
        <span className="rounded-full bg-clay-100 px-1.5 py-0.5 text-[11px] font-semibold text-clay-500">
          SAVE {pct}%
        </span>
      )}
    </div>
  );
}

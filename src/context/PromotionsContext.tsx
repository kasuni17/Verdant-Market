import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Coupon, Promotion } from "../types";
import { readStorage, writeStorage } from "../lib/storage";
import { promotions as basePromotions, coupons as baseCoupons } from "../data/promotions";

interface PromotionsContextValue {
  promotions: Promotion[];
  coupons: Coupon[];
  addPromotion: (p: Promotion) => void;
  updatePromotion: (id: string, patch: Partial<Promotion>) => void;
  deletePromotion: (id: string) => void;
  addCoupon: (c: Coupon) => void;
  updateCoupon: (id: string, patch: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;
}

const PromotionsContext = createContext<PromotionsContextValue | null>(null);
const PKEY = "vm_promotions";
const CKEY = "vm_coupons";

export function PromotionsProvider({ children }: { children: ReactNode }) {
  const [promotions, setPromotions] = useState<Promotion[]>(() => readStorage(PKEY, basePromotions));
  const [coupons, setCoupons] = useState<Coupon[]>(() => readStorage(CKEY, baseCoupons));

  useEffect(() => writeStorage(PKEY, promotions), [promotions]);
  useEffect(() => writeStorage(CKEY, coupons), [coupons]);

  return (
    <PromotionsContext.Provider
      value={{
        promotions,
        coupons,
        addPromotion: (p) => setPromotions((prev) => [p, ...prev]),
        updatePromotion: (id, patch) => setPromotions((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p))),
        deletePromotion: (id) => setPromotions((prev) => prev.filter((p) => p.id !== id)),
        addCoupon: (c) => setCoupons((prev) => [c, ...prev]),
        updateCoupon: (id, patch) => setCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c))),
        deleteCoupon: (id) => setCoupons((prev) => prev.filter((c) => c.id !== id)),
      }}
    >
      {children}
    </PromotionsContext.Provider>
  );
}

export function usePromotions() {
  const ctx = useContext(PromotionsContext);
  if (!ctx) throw new Error("usePromotions must be used within PromotionsProvider");
  return ctx;
}

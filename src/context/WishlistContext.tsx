import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { readStorage, writeStorage } from "../lib/storage";
import { useToast } from "./ToastContext";
import { useProducts } from "./ProductsContext";

interface WishlistContextValue {
  ids: string[];
  toggle: (productId: string) => void;
  isSaved: (productId: string) => boolean;
  remove: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const KEY = "vm_wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => readStorage<string[]>(KEY, []));
  const { push } = useToast();
  const { products } = useProducts();

  useEffect(() => {
    writeStorage(KEY, ids);
  }, [ids]);

  const toggle = (productId: string) => {
    const exists = ids.includes(productId);
    const product = products.find((p) => p.id === productId);
    setIds((prev) => (exists ? prev.filter((id) => id !== productId) : [...prev, productId]));
    push(exists ? "Removed from wishlist" : "Saved to wishlist", product?.name);
  };

  const remove = (productId: string) => setIds((prev) => prev.filter((id) => id !== productId));
  const isSaved = (productId: string) => ids.includes(productId);

  return <WishlistContext.Provider value={{ ids, toggle, isSaved, remove }}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}

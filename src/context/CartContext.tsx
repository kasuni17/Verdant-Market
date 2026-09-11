import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem } from "../types";
import { readStorage, writeStorage } from "../lib/storage";
import { useProducts } from "./ProductsContext";
import { useToast } from "./ToastContext";

interface CartContextValue {
  items: CartItem[];
  activeItems: CartItem[];
  savedItems: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  saveForLater: (productId: string) => void;
  moveToCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "vm_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readStorage<CartItem[]>(KEY, []));
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { products } = useProducts();
  const { push } = useToast();

  useEffect(() => {
    writeStorage(KEY, items);
  }, [items]);

  const addToCart = (productId: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId && !i.savedForLater);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId && !i.savedForLater ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { productId, quantity, savedForLater: false }];
    });
    const product = products.find((p) => p.id === productId);
    push("Added to cart", product?.name);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const setQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)));
  };

  const saveForLater = (productId: string) => {
    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, savedForLater: true } : i)));
  };

  const moveToCart = (productId: string) => {
    setItems((prev) => prev.map((i) => (i.productId === productId ? { ...i, savedForLater: false } : i)));
  };

  const clearCart = () => setItems([]);

  const activeItems = useMemo(() => items.filter((i) => !i.savedForLater), [items]);
  const savedItems = useMemo(() => items.filter((i) => i.savedForLater), [items]);
  const totalItems = useMemo(() => activeItems.reduce((s, i) => s + i.quantity, 0), [activeItems]);

  return (
    <CartContext.Provider
      value={{
        items,
        activeItems,
        savedItems,
        addToCart,
        removeFromCart,
        setQuantity,
        saveForLater,
        moveToCart,
        clearCart,
        totalItems,
        isDrawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

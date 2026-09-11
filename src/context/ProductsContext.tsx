import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "../types";
import { products as baseProducts } from "../data/products";
import { readStorage, writeStorage } from "../lib/storage";

interface ProductsContextValue {
  products: Product[];
  updateProduct: (id: string, patch: Partial<Product>) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  adjustStock: (id: string, delta: number) => void;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);
const KEY = "vm_products";

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => readStorage<Product[]>(KEY, baseProducts));

  useEffect(() => {
    writeStorage(KEY, products);
  }, [products]);

  const updateProduct = (id: string, patch: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const adjustStock = (id: string, delta: number) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p)));
  };

  return (
    <ProductsContext.Provider value={{ products, updateProduct, addProduct, deleteProduct, adjustStock }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Order, OrderStatus } from "../types";
import { readStorage, writeStorage } from "../lib/storage";
import { seedOrders } from "../data/seedOrders";

interface OrdersContextValue {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateStatus: (id: string, status: OrderStatus) => void;
  getOrder: (id: string) => Order | undefined;
  ordersForUser: (userId: string) => Order[];
}

const OrdersContext = createContext<OrdersContextValue | null>(null);
const KEY = "vm_orders";

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => readStorage<Order[]>(KEY, seedOrders));

  useEffect(() => {
    writeStorage(KEY, orders);
  }, [orders]);

  const addOrder = (order: Order) => setOrders((prev) => [order, ...prev]);

  const updateStatus = (id: string, status: OrderStatus) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));

  const getOrder = (id: string) => orders.find((o) => o.id === id);
  const ordersForUser = (userId: string) => orders.filter((o) => o.userId === userId);

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateStatus, getOrder, ordersForUser }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}

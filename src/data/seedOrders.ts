import type { Order, OrderItem } from "../types";
import { products } from "./products";
import { demoAddress } from "./users";

function toOrderItem(id: string, quantity: number): OrderItem {
  const p = products.find((x) => x.id === id)!;
  return { productId: p.id, name: p.name, image: p.image, unit: p.unit, price: p.price, quantity };
}

function buildOrder(id: string, daysAgo: number, itemDefs: [string, number][], status: Order["status"]): Order {
  const items = itemDefs.map(([pid, qty]) => toOrderItem(pid, qty));
  const subtotal = Math.round(items.reduce((s, i) => s + i.price * i.quantity, 0) * 100) / 100;
  const discount = Math.round(subtotal * 0.05 * 100) / 100;
  const deliveryFee = subtotal > 75 ? 0 : 4.99;
  const tax = Math.round((subtotal - discount) * 0.08 * 100) / 100;
  const total = Math.round((subtotal - discount + deliveryFee + tax) * 100) / 100;
  const date = new Date(Date.now() - daysAgo * 86400000).toISOString();
  return {
    id,
    userId: "user-demo",
    date,
    items,
    subtotal,
    discount,
    deliveryFee,
    tax,
    total,
    status,
    deliveryMethod: "standard",
    address: demoAddress,
    paymentStatus: status === "cancelled" ? "failed" : "paid",
    estimatedDelivery: new Date(Date.now() - daysAgo * 86400000 + 2 * 86400000).toISOString(),
  };
}

export const seedOrders: Order[] = [
  buildOrder(
    "VM-100241",
    1,
    [
      ["fruits-vegetables-0", 3],
      ["dairy-eggs-0", 1],
      ["bakery-0", 2],
    ],
    "out_for_delivery"
  ),
  buildOrder(
    "VM-100198",
    9,
    [
      ["meat-poultry-0", 2],
      ["fruits-vegetables-4", 1],
      ["pantry-grocery-1", 1],
      ["beverages-0", 1],
    ],
    "delivered"
  ),
  buildOrder(
    "VM-100143",
    23,
    [
      ["snacks-0", 2],
      ["frozen-foods-3", 1],
      ["breakfast-1", 1],
    ],
    "delivered"
  ),
  buildOrder(
    "VM-100087",
    41,
    [
      ["seafood-0", 1],
      ["fruits-vegetables-9", 2],
      ["household-0", 1],
    ],
    "delivered"
  ),
];

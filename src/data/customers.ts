import type { Customer } from "../types";

const FIRST = ["Amelia", "James", "Priya", "Noah", "Isabella", "Lucas", "Chloe", "Ethan", "Sofia", "Mason", "Olivia", "Liam", "Ava", "Benjamin", "Mia", "Henry", "Grace", "Daniel", "Ella", "Jack"];
const LAST = ["Reyes", "Turner", "Sharma", "Kim", "Moretti", "Bennett", "Walsh", "Diaz", "Garcia", "Long", "Fischer", "Wallace", "Nakamura", "Osei", "Petrov", "Nilsson", "Rossi", "Novak", "Abara", "Lindqvist"];

function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const customers: Customer[] = Array.from({ length: 42 }, (_, i) => {
  const rnd = seededRandom(i + 101);
  const first = FIRST[i % FIRST.length];
  const last = LAST[(i * 3 + 1) % LAST.length];
  const orders = 1 + Math.floor(rnd() * 38);
  const totalSpent = Math.round(orders * (28 + rnd() * 90) * 100) / 100;
  const daysAgo = Math.floor(rnd() * 40);
  return {
    id: `cust-${i + 1}`,
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@example.com`,
    orders,
    totalSpent,
    lastOrder: new Date(Date.now() - daysAgo * 86400000).toISOString(),
    status: rnd() > 0.12 ? "active" : "inactive",
  };
});

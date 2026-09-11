import type { Address, User } from "../types";

export const demoAddress: Address = {
  id: "addr-1",
  label: "Home",
  fullName: "Jordan Avery",
  line1: "482 Riverside Drive",
  line2: "Apt 6B",
  city: "Portland",
  state: "OR",
  postalCode: "97201",
  country: "United States",
  phone: "+1 (503) 555-0148",
  isDefault: true,
};

const secondAddress: Address = {
  id: "addr-2",
  label: "Office",
  fullName: "Jordan Avery",
  line1: "900 SW Fifth Avenue",
  line2: "Suite 1200",
  city: "Portland",
  state: "OR",
  postalCode: "97204",
  country: "United States",
  phone: "+1 (503) 555-0148",
};

export const demoCustomer: User = {
  id: "user-demo",
  name: "Jordan Avery",
  email: "jordan@example.com",
  role: "customer",
  phone: "+1 (503) 555-0148",
  addresses: [demoAddress, secondAddress],
  paymentMethods: [
    { id: "pm-1", brand: "Visa", last4: "4242", expiry: "09/28", isDefault: true },
    { id: "pm-2", brand: "Mastercard", last4: "8821", expiry: "02/27" },
  ],
  joined: "2024-03-11",
};

export const demoAdmin: User = {
  id: "user-admin",
  name: "Store Admin",
  email: "admin@example.com",
  role: "admin",
  addresses: [],
  paymentMethods: [],
  joined: "2023-01-01",
};

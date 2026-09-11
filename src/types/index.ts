export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  subcategories: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  categoryId: string;
  subcategory: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  stock: number;
  reorderLevel: number;
  tags: string[];
  organic?: boolean;
  isNew?: boolean;
  featured?: boolean;
  nutrition?: { label: string; value: string }[];
  ingredients?: string;
}

export type DeliveryMethod = "standard" | "express" | "scheduled" | "pickup";

export interface Address {
  id: string;
  label: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface PaymentMethodInfo {
  id: string;
  brand: "Visa" | "Mastercard" | "Amex";
  last4: string;
  expiry: string;
  isDefault?: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  savedForLater?: boolean;
}

export type OrderStatus =
  | "confirmed"
  | "preparing"
  | "packed"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  unit: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: OrderStatus;
  deliveryMethod: DeliveryMethod;
  address: Address;
  paymentStatus: "paid" | "pending" | "failed";
  estimatedDelivery: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  phone?: string;
  addresses: Address[];
  paymentMethods: PaymentMethodInfo[];
  joined: string;
}

export type PromotionType =
  | "percentage"
  | "fixed"
  | "bogo"
  | "category"
  | "product"
  | "free_delivery";

export interface Promotion {
  id: string;
  name: string;
  type: PromotionType;
  discountValue: number;
  startDate: string;
  endDate: string;
  target: string;
  status: "active" | "scheduled" | "expired";
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  usageLimit: number;
  used: number;
  expiry: string;
  status: "active" | "expired";
}

export interface Store {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  hours: string;
  services: string[];
  pickupAvailable: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
  status: "active" | "inactive";
}

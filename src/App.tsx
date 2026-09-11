import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { ProductsProvider } from "./context/ProductsContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { OrdersProvider } from "./context/OrdersContext";
import { PromotionsProvider } from "./context/PromotionsContext";

import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Deals } from "./pages/Deals";
import { Fresh } from "./pages/Fresh";
import { NewArrivals } from "./pages/NewArrivals";
import { ProductDetails } from "./pages/ProductDetails";
import { Cart } from "./pages/Cart";
import { Wishlist } from "./pages/Wishlist";
import { Checkout } from "./pages/Checkout";
import { OrderConfirmation } from "./pages/OrderConfirmation";
import { OrderTracking } from "./pages/OrderTracking";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Stores } from "./pages/Stores";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { FAQ } from "./pages/FAQ";
import { Delivery } from "./pages/Delivery";
import { Careers } from "./pages/Careers";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { NotFound } from "./pages/NotFound";

import { AccountLayout } from "./pages/account/AccountLayout";
import { AccountOverview } from "./pages/account/AccountOverview";
import { AccountOrders } from "./pages/account/AccountOrders";
import { AccountAddresses } from "./pages/account/AccountAddresses";
import { AccountPayment } from "./pages/account/AccountPayment";
import { AccountProfile } from "./pages/account/AccountProfile";
import { AccountPreferences } from "./pages/account/AccountPreferences";

import { AdminLayout } from "./pages/admin/AdminLayout";
const AdminOverview = lazy(() => import("./pages/admin/AdminOverview").then((m) => ({ default: m.AdminOverview })));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts").then((m) => ({ default: m.AdminProducts })));
const AdminInventory = lazy(() => import("./pages/admin/AdminInventory").then((m) => ({ default: m.AdminInventory })));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders").then((m) => ({ default: m.AdminOrders })));
const AdminCustomers = lazy(() => import("./pages/admin/AdminCustomers").then((m) => ({ default: m.AdminCustomers })));
const AdminPromotions = lazy(() => import("./pages/admin/AdminPromotions").then((m) => ({ default: m.AdminPromotions })));
const AdminCoupons = lazy(() => import("./pages/admin/AdminCoupons").then((m) => ({ default: m.AdminCoupons })));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics").then((m) => ({ default: m.AdminAnalytics })));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings").then((m) => ({ default: m.AdminSettings })));

function AdminFallback() {
  return (
    <div className="flex h-64 items-center justify-center text-sm text-charcoal-400">
      Loading admin dashboard…
    </div>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <WishlistProvider>
              <OrdersProvider>
                <PromotionsProvider>{children}</PromotionsProvider>
              </OrdersProvider>
            </WishlistProvider>
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="deals" element={<Deals />} />
            <Route path="fresh" element={<Fresh />} />
            <Route path="new-arrivals" element={<NewArrivals />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-confirmation/:id" element={<OrderConfirmation />} />
            <Route path="orders/:id" element={<OrderTracking />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="stores" element={<Stores />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="delivery" element={<Delivery />} />
            <Route path="careers" element={<Careers />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />

            <Route path="account" element={<AccountLayout />}>
              <Route index element={<AccountOverview />} />
              <Route path="orders" element={<AccountOrders />} />
              <Route path="addresses" element={<AccountAddresses />} />
              <Route path="payment" element={<AccountPayment />} />
              <Route path="profile" element={<AccountProfile />} />
              <Route path="preferences" element={<AccountPreferences />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>

          <Route
            path="admin"
            element={
              <Suspense fallback={<AdminFallback />}>
                <AdminLayout />
              </Suspense>
            }
          >
            <Route index element={<AdminOverview />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="promotions" element={<AdminPromotions />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Providers>
    </BrowserRouter>
  );
}

export default App;

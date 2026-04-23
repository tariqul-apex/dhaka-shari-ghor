import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";

export const Layout = () => (
  <CartProvider>
    <WishlistProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1"><Outlet /></main>
        <Footer />
        <CartDrawer />
      </div>
    </WishlistProvider>
  </CartProvider>
);

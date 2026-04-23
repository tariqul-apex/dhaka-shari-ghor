import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/products";

interface WishlistContextValue {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  toggle: (product: Product) => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

const STORAGE_KEY = "bloom-wishlist";

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    setItems((prev) => (prev.find((p) => p.id === product.id) ? prev : [...prev, product]));
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const isWishlisted = (id: string) => items.some((p) => p.id === id);

  const toggle = (product: Product) => {
    isWishlisted(product.id) ? removeItem(product.id) : addItem(product);
  };

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isWishlisted, toggle, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
};

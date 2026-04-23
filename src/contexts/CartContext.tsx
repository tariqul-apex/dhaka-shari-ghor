import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (idx: number) => void;
  updateQty: (idx: number, qty: number) => void;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
  subtotal: number;
  count: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const i = prev.findIndex(
        (p) => p.product.id === item.product.id && p.size === item.size && p.color === item.color,
      );
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], quantity: next[i].quantity + item.quantity };
        return next;
      }
      return [...prev, item];
    });
    setOpen(true);
  };

  const removeItem = (idx: number) => setItems((prev) => prev.filter((_, i) => i !== idx));
  const updateQty = (idx: number, qty: number) =>
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, quantity: Math.max(1, qty) } : it)));

  const { subtotal, count } = useMemo(() => {
    const subtotal = items.reduce((s, it) => s + it.product.price * it.quantity, 0);
    const count = items.reduce((s, it) => s + it.quantity, 0);
    return { subtotal, count };
  }, [items]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, isOpen, setOpen, subtotal, count }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};

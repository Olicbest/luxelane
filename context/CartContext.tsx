"use client";

import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";
import toast from "react-hot-toast";

// --------------------
// Types
// --------------------
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  decreaseQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

// --------------------
// Context
// --------------------
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) setCart(JSON.parse(stored));
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cart]);

  // --------------------
  // Helpers
  // --------------------
  const normalizeProduct = (product: CartItem) => {
    return {
      ...product,
      image: product.image || (product as any).images?.[0] || "/placeholder.png",
    };
  };

  // --------------------
  // Cart Operations
  // --------------------
  const addToCart = (product: Omit<CartItem, "quantity"> & { images?: string[] }) => {
  const normalized = normalizeProduct(product as CartItem);
  let message = "";

  setCart((prev) => {
    const existing = prev.find((item) => item.id === normalized.id);

    if (existing) {
      message = `${normalized.name} quantity increased 🛒`;
      return prev.map((item) =>
        item.id === normalized.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    message = `${normalized.name} added to cart ✅`;
    return [...prev, { ...normalized, quantity: 1 }];
  });

  toast.success(message);
};

  const decreaseQuantity = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // --------------------
  // Totals
  // --------------------
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const itemCount = useMemo(() => cart.reduce((count, item) => count + item.quantity, 0), [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, decreaseQuantity, removeItem, clearCart, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

// --------------------
// Hook
// --------------------
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
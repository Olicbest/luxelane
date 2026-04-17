"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import toast from "react-hot-toast";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

type CartProductInput = Omit<CartItem, "quantity"> & {
  images?: string[];
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartProductInput) => void;
  decreaseQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getStoredCart = () => {
  if (typeof window === "undefined") {
    return [] as CartItem[];
  }

  try {
    const stored = localStorage.getItem("cart");
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch (error) {
    console.error("Failed to load cart:", error);
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => getStoredCart());

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cart]);

  const normalizeProduct = (product: CartProductInput): CartItem => ({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    image: product.image || product.images?.[0] || "/placeholder.png",
  });

  const addToCart = (product: CartProductInput) => {
    const normalized = normalizeProduct({ ...product, quantity: product.quantity ?? 1 });
    let message = "";

    setCart((prev) => {
      const existing = prev.find((item) => item.id === normalized.id);

      if (existing) {
        message = `${normalized.name} quantity increased`;
        return prev.map((item) =>
          item.id === normalized.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      message = `${normalized.name} added to cart`;
      return [...prev, { ...normalized, quantity: 1 }];
    });

    toast.success(message);
  };

  const decreaseQuantity = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );
  const itemCount = useMemo(
    () => cart.reduce((count, item) => count + item.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, decreaseQuantity, removeItem, clearCart, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

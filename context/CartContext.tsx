"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart safely
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) setCart(JSON.parse(stored));
    } catch (error) {
      console.error("Failed to load cart:", error);
    }
  }, []);

  // Persist cart safely
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cart]);

  // Normalize product before adding
  const normalizeProduct = (product) => {
    return {
      ...product,
      image: product.image || product.images?.[0] || "/placeholder.png", // ✅ fallback
    };
  };

  // Add to cart
 

const addToCart = (product) => {
  const normalized = normalizeProduct(product);

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

  // ✅ SAFE PLACE (outside React render)
  toast.success(message);
};

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item completely
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear cart
  const clearCart = () => setCart([]);

  // Total price
  const total = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cart]);

  // Total items count
  const itemCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQuantity,
        removeItem,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
};
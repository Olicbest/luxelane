"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";
import CartItem from "../../components/CartItem";

export default function CartPage() {
  const { cart, total, clearCart } = useCart();

  // Empty Cart State
  if (!cart.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-semibold mb-2">
          Your cart is empty 🛒
        </h2>
        <p className="text-gray-500 mb-4">
          Looks like you haven’t added anything yet.
        </p>

        <Link
          href="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Summary Section */}
      <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Total */}
        <h2 className="text-2xl font-bold">
          Total: ${total.toFixed(2)}
        </h2>

        {/* Actions */}
        <div className="flex gap-3">

          <button
            onClick={clearCart}
            className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
          >
            Clear Cart
          </button>

          <Link
            href="/checkout"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium"
          >
            Checkout
          </Link>

        </div>
      </div>

    </div>
  );
}
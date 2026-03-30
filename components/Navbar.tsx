"use client";
import Link from "next/link";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  // Total items in cart
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo / Home Link */}
      <Link href="/" className="text-2xl font-bold text-blue-600">
        LuxeLane
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <Link
          href="/"
          className="text-gray-700 hover:text-blue-600 transition font-medium"
        >
          Home
        </Link>

        <Link href="/cart" className="relative text-gray-700 hover:text-blue-600 transition">
          <FaShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>

        <Link
          href="/checkout"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-medium"
        >
          Checkout
        </Link>
      </div>
    </nav>
  );
}
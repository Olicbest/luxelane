"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  FaShoppingCart,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const totalItems = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          LuxeLane
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>

          {user && (
            <Link href="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
          )}

          {/* Cart */}
          <Link href="/cart" className="relative">
            <FaShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Checkout */}
          <Link
            href="/checkout"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Checkout
          </Link>

          {/* Auth */}
          {!user ? (
            <>
              <Link href="/login">Login</Link>
              <Link
                href="/register"
                className="bg-gray-200 px-3 py-1 rounded"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2"
              >
                <FaUserCircle size={24} />
                <span>{user.name}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4 bg-white shadow">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Home
          </Link>

          {user && (
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="block"
            >
              Dashboard
            </Link>
          )}

          <Link
            href="/cart"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Cart ({totalItems})
          </Link>

          <Link
            href="/checkout"
            onClick={() => setMenuOpen(false)}
            className="block text-blue-600 font-medium"
          >
            Checkout
          </Link>

          {!user ? (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <p className="text-gray-500">Hi, {user.name}</p>

              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="text-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
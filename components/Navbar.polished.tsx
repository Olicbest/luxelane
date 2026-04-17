"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import {
  FaBars,
  FaSearch,
  FaShoppingCart,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import products from "../data/products";

export default function Navbar() {
  const pathname = usePathname();
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const navLinks = [
    { href: "/", label: "Home", requiresAuth: false },
    { href: "/dashboard", label: "Dashboard", requiresAuth: true },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 shadow-[0_10px_35px_-22px_rgba(15,23,42,0.35)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:gap-4 md:px-6">
          <Link
            href="/"
            className="flex items-center gap-3 whitespace-nowrap rounded-full pr-2 transition-transform duration-200 hover:scale-[1.01]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 text-lg font-black text-white shadow-lg shadow-blue-200">
              L
            </span>
            <span className="hidden sm:block">
              <span className="block text-lg font-black tracking-tight text-slate-900">
                LuxeLane
              </span>
              <span className="block text-[11px] uppercase tracking-[0.28em] text-slate-400">
                Modern essentials
              </span>
            </span>
          </Link>

          <div className="relative hidden max-w-xl flex-1 md:flex">
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-11 pr-32 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button className="absolute right-1.5 top-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600">
              Search
            </button>

            {query && (
              <div className="absolute top-14 z-50 max-h-72 w-full overflow-y-auto rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-200/60">
                {filteredProducts.length > 0 ? (
                  filteredProducts.slice(0, 5).map((item) => (
                    <Link
                      key={item.id}
                      href={`/product/${item.id}`}
                      onClick={() => setQuery("")}
                      className="flex items-center gap-3 rounded-2xl p-3 transition hover:bg-slate-50"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="h-11 w-11 rounded-xl object-cover"
                      />
                      <div className="min-w-0">
                        <span className="block truncate font-medium text-slate-800">
                          {item.name}
                        </span>
                        <span className="text-xs text-slate-400">
                          View product
                        </span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="p-4 text-sm text-slate-500">No results</p>
                )}
              </div>
            )}
          </div>

          <div className="ml-auto hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1">
              {navLinks
                .filter((link) => !link.requiresAuth || user)
                .map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        isActive
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
            </div>

            <Link
              href="/cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600 hover:shadow-md"
              aria-label="Open cart"
            >
              <FaShoppingCart size={18} />
              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold text-white ring-4 ring-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              href="/checkout"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-600"
            >
              Checkout
            </Link>

            {!user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 transition hover:border-slate-300 hover:bg-slate-200"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                >
                  <FaUserCircle size={22} className="text-slate-500" />
                  <span className="max-w-28 truncate text-sm font-medium text-slate-700">
                    {user.name}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-200/70">
                    <Link
                      href="/dashboard"
                      className="block rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm md:hidden"
            aria-label="Open cart"
          >
            <FaShoppingCart size={17} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold text-white ring-2 ring-white">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-900 text-lg text-white shadow-sm md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <FaBars />
          </button>
        </div>

        <div className="px-4 pb-4 md:hidden">
          <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 shadow-inner shadow-slate-100">
            <FaSearch className="text-sm text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent px-3 py-3 text-sm text-slate-700 outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white">
              Go
            </button>
          </div>

          {query && (
            <div className="mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60">
              {filteredProducts.length > 0 ? (
                filteredProducts.slice(0, 4).map((item) => (
                  <Link
                    key={item.id}
                    href={`/product/${item.id}`}
                    onClick={() => setQuery("")}
                    className="flex items-center gap-3 px-4 py-3 transition hover:bg-slate-50"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="h-10 w-10 rounded-xl object-cover"
                    />
                    <span className="truncate text-sm font-medium text-slate-700">
                      {item.name}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="px-4 py-3 text-sm text-slate-500">No results</p>
              )}
            </div>
          )}
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 z-50 flex h-full w-80 max-w-[88vw] flex-col overflow-hidden bg-white shadow-2xl"
            >
              <div className="border-b border-slate-200 bg-gradient-to-br from-slate-900 via-blue-900 to-sky-600 px-6 py-5 text-white">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/65">
                      Menu
                    </p>
                    <h2 className="mt-1 text-xl font-bold">LuxeLane</h2>
                  </div>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10"
                    aria-label="Close menu"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>

                <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-sm">
                  {user ? (
                    <>
                      <p className="text-sm text-white/70">Signed in as</p>
                      <p className="mt-1 text-lg font-semibold">{user.name}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-white/70">Welcome back</p>
                      <p className="mt-1 text-lg font-semibold">
                        Discover your next favorite find
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex h-full flex-col gap-6 overflow-y-auto p-6">
                <div className="flex flex-col gap-2">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Navigation
                  </p>

                  {navLinks
                    .filter((link) => !link.requiresAuth || user)
                    .map((link) => {
                      const isActive =
                        link.href === "/"
                          ? pathname === "/"
                          : pathname.startsWith(link.href);

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                            isActive
                              ? "bg-blue-50 text-blue-700"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                      Cart Preview
                    </p>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                      {totalItems} item{totalItems === 1 ? "" : "s"}
                    </span>
                  </div>

                  {cart.length === 0 ? (
                    <p className="text-sm text-slate-500">Cart is empty</p>
                  ) : (
                    <div className="flex max-h-48 flex-col gap-3 overflow-y-auto">
                      {cart.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 rounded-2xl bg-white p-2.5 shadow-sm"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-12 w-12 rounded-xl object-cover"
                          />
                          <div className="min-w-0 text-sm">
                            <p className="truncate font-medium text-slate-800">
                              {item.name}
                            </p>
                            <p className="text-slate-500">
                              {item.quantity} x ${item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link
                    href="/cart"
                    onClick={() => setMenuOpen(false)}
                    className="mt-4 inline-flex text-sm font-semibold text-blue-600"
                  >
                    View full cart
                  </Link>
                </div>

                <div className="flex flex-col gap-3">
                  <Link
                    href="/checkout"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-600"
                  >
                    Checkout
                  </Link>

                  {!user ? (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setMenuOpen(false)}
                        className="rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setMenuOpen(false)}
                        className="rounded-2xl bg-slate-100 px-4 py-3 text-center text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                      >
                        Register
                      </Link>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                      }}
                      className="rounded-2xl border border-red-200 px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

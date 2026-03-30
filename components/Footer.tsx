"use client";
import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-8">
        
        {/* Brand */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold text-blue-600">MyStore</h1>
          <p className="text-gray-400 max-w-xs">
            Your one-stop shop for premium products. Quality you can trust.
          </p>
          <div className="flex space-x-4 mt-2">
            <Link href="#" className="hover:text-blue-500"><FaFacebookF /></Link>
            <Link href="#" className="hover:text-blue-500"><FaTwitter /></Link>
            <Link href="#" className="hover:text-blue-500"><FaInstagram /></Link>
            <Link href="#" className="hover:text-blue-500"><FaLinkedinIn /></Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h2 className="font-semibold text-gray-200">Quick Links</h2>
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/cart" className="hover:text-white">Cart</Link>
          <Link href="/checkout" className="hover:text-white">Checkout</Link>
          <Link href="/about" className="hover:text-white">About Us</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col space-y-2 max-w-xs">
          <h2 className="font-semibold text-gray-200">Subscribe to our Newsletter</h2>
          <p className="text-gray-400">Get updates on new products and promotions.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 rounded-l bg-gray-800 text-white focus:outline-none"
            />
            <button className="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 text-gray-500 text-center py-4">
        &copy; {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
}
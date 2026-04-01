"use client";

import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50">

        {/* ✅ Paystack Script (FIXED) */}
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="afterInteractive"
        />

        {/* ✅ Providers (Auth FIRST, then Cart) */}
        <AuthProvider>
          <CartProvider>
            
            {/* Navbar */}
            <Navbar />

            {/* Toast Notifications */}
            <Toaster position="top-right" reverseOrder={false} />

            {/* Main Content */}
            <main className="flex-1">
              {children}
            </main>

            {/* Footer */}
            <Footer />

          </CartProvider>
        </AuthProvider>

      </body>
    </html>
  );
}
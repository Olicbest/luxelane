"use client";

import { CartProvider } from "../context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        
        {/* ✅ Paystack Script (Correct Way) */}
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="beforeInteractive"
        />

        <CartProvider>
          <Navbar />

          {/* Toast Notifications */}
          <Toaster position="top-right" reverseOrder={false} />

          <main className="flex-1">{children}</main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
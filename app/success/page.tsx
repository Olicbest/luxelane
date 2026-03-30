"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function SuccessPage() {
  const [orderId, setOrderId] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  useEffect(() => {
    // Generate Order ID
    const id = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(id);

    // Generate delivery date (3–5 days ahead)
    const today = new Date();
    today.setDate(today.getDate() + 4);
    setDeliveryDate(today.toDateString());

    // 🎉 Confetti animation
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">

      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center">

        {/* Icon */}
        <div className="bg-green-100 text-green-600 w-20 h-20 flex items-center justify-center rounded-full text-3xl mx-auto mb-6 shadow">
          ✓
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-3">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Your order has been confirmed and is being processed.
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2 mb-6">
          <p>
            <span className="font-semibold">Order ID:</span> {orderId}
          </p>
          <p>
            <span className="font-semibold">Estimated Delivery:</span>{" "}
            {deliveryDate}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span className="text-green-600 font-medium">
              Processing
            </span>
          </p>
        </div>

        {/* Email Notice */}
        <p className="text-sm text-gray-500 mb-6">
          📧 A confirmation email has been sent to your inbox.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">

          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>

          <button
            onClick={() => window.print()}
            className="border px-6 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Download Receipt
          </button>

        </div>

      </div>

    </div>
  );
}
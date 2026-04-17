"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function SuccessPage() {
  const [orderId] = useState(
    () => `ORD-${Math.floor(100000 + Math.random() * 900000)}`
  );
  const [deliveryDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 4);
    return date.toDateString();
  });

  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600 shadow">
          ?
        </div>

        <h1 className="mb-3 text-3xl font-bold">Payment Successful</h1>

        <p className="mb-6 text-gray-600">
          Your order has been confirmed and is being processed.
        </p>

        <div className="mb-6 space-y-2 rounded-xl bg-gray-50 p-4 text-left">
          <p>
            <span className="font-semibold">Order ID:</span> {orderId}
          </p>
          <p>
            <span className="font-semibold">Estimated Delivery:</span>{" "}
            {deliveryDate}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span className="font-medium text-green-600">Processing</span>
          </p>
        </div>

        <p className="mb-6 text-sm text-gray-500">
          A confirmation email has been sent to your inbox.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
          >
            Continue Shopping
          </Link>

          <button
            onClick={() => window.print()}
            className="rounded-lg border px-6 py-2 transition hover:bg-gray-100"
          >
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
}

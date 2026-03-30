"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    if (!form.name || !form.address || !form.email) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_KEY, // 🔥 your key
      email: form.email,
      amount: total * 100,

      metadata: {
        custom_fields: [
          {
            display_name: "Full Name",
            variable_name: "name",
            value: form.name,
          },
          {
            display_name: "Address",
            variable_name: "address",
            value: form.address,
          },
        ],
      },

      callback: function () {
        clearCart();
        router.push("/success");
      },

      onClose: function () {
        setLoading(false);
        alert("Payment cancelled");
      },
    });

    handler.openIframe();
  };

  if (!cart.length) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold mb-3">
          Your cart is empty 🛒
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">

      {/* LEFT: FORM */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        {/* Shipping Info */}
        <div className="mb-6">
          <h2 className="font-semibold mb-3">Shipping Details</h2>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              className="border w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email Address"
              className="border w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Delivery Address"
              className="border w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />
          </div>
        </div>

        {/* 💳 PAYSTACK NOTICE */}
        <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 mb-4">
          💳 Payment will be handled securely via Paystack
        </div>

        {/* PAY BUTTON */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="bg-green-600 text-white w-full py-3 rounded-lg mt-2 hover:bg-green-700 transition font-medium shadow-md"
        >
          {loading
            ? "Opening Payment..."
            : `Pay $${total.toFixed(2)}`}
        </button>

        <p className="text-sm text-gray-500 mt-3 text-center">
          🔒 Secure payment powered by Paystack (Test Mode)
        </p>
      </div>

      {/* RIGHT: ORDER SUMMARY */}
      <div className="bg-white shadow-lg rounded-2xl p-6 h-fit">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <div className="space-y-4 max-h-64 overflow-y-auto">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t mt-6 pt-4 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

    </div>
  );
}
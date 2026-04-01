"use client";

import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth(); // ✅ auth check
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ PROTECT ROUTE
  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/checkout");
    } else {
      // autofill user email if available
      setForm((prev) => ({
        ...prev,
        email: user.email || "",
        name: user.name || "",
      }));
    }
  }, [user, router]);

  // ⛔ prevent rendering before redirect
  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Redirecting to login...</p>
      </div>
    );
  }

  // 🛒 Empty cart check
  if (!cart.length) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">Your cart is empty 🛒</h2>
      </div>
    );
  }

  // 💳 Payment Handler
  const handlePayment = () => {
    const key = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

    if (!form.name || !form.address || !form.email) {
      alert("Please fill all fields");
      return;
    }

    if (!key) {
      alert("Payment key missing");
      return;
    }

    if (!total || total <= 0) {
      alert("Invalid payment amount");
      return;
    }

    if (!form.email.includes("@")) {
      alert("Invalid email");
      return;
    }

    if (!window.PaystackPop) {
      alert("Payment system not ready. Refresh page.");
      return;
    }

    setLoading(true);

    const handler = window.PaystackPop.setup({
      key,
      email: form.email,
      amount: Math.round(total * 100), // kobo
      currency: "NGN",

      callback: function (response: any) {
        alert(`Payment successful! Ref: ${response.reference}`);
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

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
      
      {/* LEFT: FORM */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <input
          type="text"
          placeholder="Full Name"
          className="border w-full p-3 rounded-lg mb-3"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-3 rounded-lg mb-3"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Delivery Address"
          className="border w-full p-3 rounded-lg mb-3"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
        />

        <button
          onClick={handlePayment}
          disabled={loading}
          className="bg-green-600 text-white w-full py-3 rounded-lg hover:bg-green-700 transition font-medium"
        >
          {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
        </button>
      </div>

      {/* RIGHT: ORDER SUMMARY */}
      <div className="bg-white shadow-lg rounded-2xl p-6 h-fit">
        <h2 className="text-xl font-semibold mb-4">
          Order Summary
        </h2>

        <div className="space-y-4 max-h-64 overflow-y-auto">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center"
            >
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
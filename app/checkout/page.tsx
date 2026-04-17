"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }) => {
        openIframe: () => void;
      };
    };
  }
}

const PAYSTACK_SCRIPT_SRC = "https://js.paystack.co/v1/inline.js";

const ensurePaystackReady = async () => {
  if (window.PaystackPop) {
    return true;
  }

  await new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${PAYSTACK_SCRIPT_SRC}"]`
    );

    const onLoad = () => resolve();
    const onError = () => reject(new Error("Failed to load Paystack"));

    if (existingScript) {
      existingScript.addEventListener("load", onLoad, { once: true });
      existingScript.addEventListener("error", onError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = PAYSTACK_SCRIPT_SRC;
    script.async = true;
    script.addEventListener("load", onLoad, { once: true });
    script.addEventListener("error", onError, { once: true });
    document.body.appendChild(script);
  }).catch(() => undefined);

  return Boolean(window.PaystackPop);
};

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState(() => ({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
  }));
  const [loading, setLoading] = useState(false);
  const [paymentReady, setPaymentReady] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/checkout");
    }
  }, [user, router]);

  useEffect(() => {
    let mounted = true;

    ensurePaystackReady().then((ready) => {
      if (mounted) {
        setPaymentReady(ready);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (!user) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">Redirecting to login...</p>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
      </div>
    );
  }

  const handlePayment = async () => {
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

    setLoading(true);

    const ready = await ensurePaystackReady();
    setPaymentReady(ready);

    if (!ready || !window.PaystackPop) {
      setLoading(false);
      alert("Secure checkout is still loading. Please try again.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key,
      email: form.email,
      amount: Math.round(total * 100),
      currency: "NGN",
      callback: (response) => {
        setLoading(false);
        alert(`Payment successful! Ref: ${response.reference}`);
        clearCart();
        router.push("/success");
      },
      onClose: () => {
        setLoading(false);
        alert("Payment cancelled");
      },
    });

    handler.openIframe();
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-10 md:grid-cols-2">
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold">Checkout</h1>

        <input
          type="text"
          placeholder="Full Name"
          className="mb-3 w-full rounded-lg border p-3"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="mb-3 w-full rounded-lg border p-3"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="text"
          placeholder="Delivery Address"
          className="mb-3 w-full rounded-lg border p-3"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <button
          onClick={handlePayment}
          disabled={loading || !paymentReady}
          className="w-full rounded-lg bg-green-600 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-300"
        >
          {loading
            ? "Processing..."
            : paymentReady
              ? `Pay $${total.toFixed(2)}`
              : "Preparing secure checkout..."}
        </button>
      </div>

      <div className="h-fit rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

        <div className="max-h-64 space-y-4 overflow-y-auto">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>

              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between border-t pt-4 text-lg font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

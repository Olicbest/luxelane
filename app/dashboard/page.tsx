"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { cart, total } = useCart();
  const { user } = useAuth();

  const router = useRouter();

    useEffect(() => {
        if (!user) {
        router.push("/login");
        }
    }, [user]);
    
  // Mock orders (since no backend)
  const orders = [
    { id: "ORD-1001", total: 120, status: "Delivered" },
    { id: "ORD-1002", total: 80, status: "Processing" },
  ];

  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {user?.name || "User"} 👋
      </h1>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-gray-500">Cart Items</h2>
          <p className="text-2xl font-bold">{cart.length}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-gray-500">Total Spent</h2>
          <p className="text-2xl font-bold">${totalSpent}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-gray-500">Orders</h2>
          <p className="text-2xl font-bold">{orders.length}</p>
        </div>

      </div>

      {/* Profile Section */}
      <div className="bg-white shadow rounded-xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>

        <p><strong>Name:</strong> {user?.name || "N/A"}</p>
        <p><strong>Email:</strong> {user?.email || "N/A"}</p>
      </div>

      {/* Orders Section */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between border-b pb-2"
              >
                <span>{order.id}</span>
                <span>${order.total}</span>
                <span className="text-sm text-gray-500">
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
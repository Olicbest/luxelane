"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.password) {
      alert("All fields required");
      return;
    }

    register(form.name, form.email, form.password);
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto py-20 px-6">
      <h1 className="text-2xl font-bold mb-6">Create Account</h1>

      <input
        placeholder="Name"
        className="border w-full p-3 mb-3 rounded"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        className="border w-full p-3 mb-3 rounded"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="border w-full p-3 mb-3 rounded"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white w-full py-3 rounded"
      >
        Register
      </button>
    </div>
  );
}
"use client";

import { useState } from "react";
import ProductCard from "../components/ProductCard";
import HeroSection from "../components/HeroSection"; // new
import products from "../data/products";

export default function HomePage() {
  const [category, setCategory] = useState("all");
  const categories = ["all", "shoes", "watches", "clothing"];
  const filteredProducts =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* HERO */}
      <HeroSection />

      {/* CATEGORY TABS */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2 rounded-full border transition ${
              category === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div id="products">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import products from "../data/products";

const categories = ["all", "shoes", "watches", "clothing"] as const;

type Category = (typeof categories)[number];

const normalizeCategory = (category?: string): Category =>
  categories.includes(category as Category) ? (category as Category) : "all";

export default function HomeCatalog({
  initialCategory,
}: {
  initialCategory?: string;
}) {
  const [category, setCategory] = useState<Category>(
    normalizeCategory(initialCategory)
  );

  const filteredProducts = useMemo(
    () =>
      category === "all"
        ? products
        : products.filter((product) => product.category === category),
    [category]
  );

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-center gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-full border px-5 py-2 transition ${
              category === cat
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div id="products">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  images: string[];
  description: string;
  rating?: number;
  reviews?: number;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="group relative bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* CATEGORY BADGE */}
      <span className="absolute top-3 left-3 z-10 text-xs bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow">
        {product.category}
      </span>

      {/* IMAGE */}
      <div className="relative w-full h-56 overflow-hidden">
        <motion.img
          src={product.images[currentImage] || "/placeholder.jpg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />

        {/* QUICK ADD BUTTON */}
        <button
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
              image: product.images?.[0],
            })
          }
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-5 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition hover:bg-gray-900"
        >
          Quick Add
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-1">
        {/* TITLE */}
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h2>

        {/* RATING */}
        <div className="flex items-center gap-2 mt-1">
          <div className="flex text-yellow-500 text-sm">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.round(product.rating || 4)
                    ? "opacity-100"
                    : "opacity-30"
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            ({product.reviews ?? 120})
          </span>
        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {product.description}
        </p>

        {/* PRICE + BUTTON */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <p className="text-xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </p>

          <button
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.images?.[0],
              })
            }
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow"
          >
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}
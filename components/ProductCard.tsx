"use client";
import React, { useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition flex flex-col justify-between">
      {/* Image Carousel */}
      <div className="relative w-full h-48 mb-4">
        <img
          src={product.images[currentImage]}
          alt={product.name}
          className="w-full h-full object-cover rounded-md"
        />

        {/* Navigation */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 p-1 rounded-full hover:bg-gray-300"
            >
              ◀
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 p-1 rounded-full hover:bg-gray-300"
            >
              ▶
            </button>
          </>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 mb-4">
        <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="font-bold text-blue-600 mb-2">${product.price.toFixed(2)}</p>
      </div>

      <button
        onClick={() => addToCart(product)}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
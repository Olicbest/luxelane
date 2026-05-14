"use client";

import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";

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
  const currentImage = 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white/70 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <span className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-xs shadow backdrop-blur">
        {product.category}
      </span>

      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={product.images[currentImage] || "/placeholder.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

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
          className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black px-5 py-2 text-sm text-white opacity-0 transition hover:bg-gray-900 group-hover:opacity-100"
        >
          Quick Add
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="line-clamp-1 text-lg font-semibold text-gray-800">
          {product.name}
        </h2>

        <div className="mt-1 flex items-center gap-2">
          <div className="flex text-sm text-yellow-500">
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
          <span className="text-xs text-gray-500">({product.reviews ?? 120})</span>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {product.description}
        </p>

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
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white shadow transition hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

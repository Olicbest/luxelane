"use client";
import React from "react";
import { useCart } from "../context/CartContext";
import { CartItem as CartItemType } from "../context/CartContext";

export default function CartItem({ item }: { item: CartItemType }) {
  const { addToCart, decreaseQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center justify-between border rounded-xl p-4 shadow-sm hover:shadow-md transition">

      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg"
      />

      {/* Info */}
      <div className="flex-1 ml-4">
        <h3 className="font-semibold text-lg line-clamp-1">
          {item.name}
        </h3>

        <p className="text-gray-500">
          ${item.price.toFixed(2)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center mt-3 gap-2">
          <button
            onClick={() => decreaseQuantity(item.id)}
            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            -
          </button>

          <span className="font-medium">{item.quantity}</span>

          <button
            onClick={() =>
              addToCart({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: 1,
                image: item.image,
              })
            }
            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            +
          </button>
        </div>
      </div>

      {/* Price + Remove */}
      <div className="flex flex-col items-end gap-2">
        <p className="font-bold text-lg">
          ${(item.price * item.quantity).toFixed(2)}
        </p>

        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500 text-sm hover:underline"
        >
          Remove
        </button>
      </div>

    </div>
  );
}
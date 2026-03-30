"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import products from "../../../data/products";
import { useCart } from "../../../context/CartContext";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();
  const [currentImage, setCurrentImage] = useState(0);

  if (!product) return <p className="p-6">Product not found.</p>;

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  // --- Generate stars for rating ---
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (rating + 0.5 >= i) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-10">

      {/* LEFT: IMAGE SECTION */}
      <div>
        {/* Main Image */}
        <div className="relative w-full h-96 mb-4">
          <img
            src={product.images[currentImage]}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl shadow"
          />

          {product.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full hover:bg-gray-100"
              >
                ◀
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full hover:bg-gray-100"
              >
                ▶
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 overflow-x-auto">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumbnail"
              onClick={() => setCurrentImage(index)}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition
                ${
                  currentImage === index
                    ? "border-blue-600"
                    : "border-transparent hover:border-gray-300"
                }`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT: PRODUCT INFO */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center mb-4 gap-2">
            <div className="flex">{renderStars(product.rating || 4.5)}</div>
            <span className="text-gray-500 text-sm">
              ({product.reviews || 120} reviews)
            </span>
          </div>

          <p className="text-gray-600 mb-4">{product.description}</p>

          <p className="text-blue-600 font-bold text-2xl mb-6">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition font-medium shadow-md"
        >
          Add to Cart
        </button>
      </div>

    </div>
  );
}
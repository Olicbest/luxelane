"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const banners = [
  {
    id: 1,
    title: "Explore Latest Shoes",
    subtitle: "Top trends in footwear",
    image: "/hero1.jpg",
    cta: "Shop Shoes",
    link: "/?category=shoes",
  },
  {
    id: 2,
    title: "Style Meets Comfort",
    subtitle: "Discover new watches & accessories",
    image: "/hero2.jpg",
    cta: "Shop Watches",
    link: "/?category=watches",
  },
  {
    id: 3,
    title: "Fashion For Everyone",
    subtitle: "Look your best everyday",
    image: "/hero3.jpg",
    cta: "Shop Clothing",
    link: "/?category=clothing",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  // Auto-rotate banners every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden mb-10">
      <div className="relative max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {banners.map(
            (banner, index) =>
              index === current && (
                <motion.div
                  key={banner.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 1 }}
                  className="flex flex-col md:flex-row items-center justify-between rounded-2xl bg-blue-600 text-white p-8 md:p-16"
                >
                  <div className="md:w-1/2 mb-6 md:mb-0">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                      {banner.title}
                    </h1>
                    <p className="text-lg md:text-xl mb-6">{banner.subtitle}</p>
                    <motion.a
                      href={banner.link}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow hover:bg-gray-100 transition"
                    >
                      {banner.cta}
                    </motion.a>
                  </div>
                  <div className="md:w-1/2">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>

        {/* BANNER INDICATORS */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition ${
                idx === current ? "bg-white" : "bg-white/50"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
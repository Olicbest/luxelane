"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";

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
  const [paused, setPaused] = useState(false);

  // Auto-slide
  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [paused]);

  const next = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prev = () =>
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));

  return (
    <section
      className="relative w-full h-[80vh] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        {banners.map(
          (banner, index) =>
            index === current && (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                {/* BACKGROUND IMAGE */}
                <motion.img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 6 }}
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/50" />

                {/* CONTENT */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="max-w-7xl w-full px-6">
                    <div className="max-w-xl text-white">

                      {/* TEXT ANIMATION */}
                      <motion.h1
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
                      >
                        {banner.title}
                      </motion.h1>

                      <motion.p
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl mb-6 text-gray-200"
                      >
                        {banner.subtitle}
                      </motion.p>

                      {/* CTA */}
                      <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Link
                          href={banner.link}
                          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition"
                        >
                          {banner.cta}
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* LEFT ARROW */}
      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/40 transition"
      >
        <FaChevronLeft />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/40 transition"
      >
        <FaChevronRight />
      </button>

      {/* DOT INDICATORS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === current
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
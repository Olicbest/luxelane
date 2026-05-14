"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import hero1 from "../public/hero1-optimized.jpg";
import hero2 from "../public/hero2.jpg";
import hero3 from "../public/hero3-optimized.jpg";

const banners = [
  {
    id: 1,
    title: "Explore Latest Shoes",
    subtitle: "Top trends in footwear",
    image: hero1,
    cta: "Shop Shoes",
    link: "/?category=shoes",
  },
  {
    id: 2,
    title: "Style Meets Comfort",
    subtitle: "Discover new watches & accessories",
    image: hero2,
    cta: "Shop Watches",
    link: "/?category=watches",
  },
  {
    id: 3,
    title: "Fashion For Everyone",
    subtitle: "Look your best everyday",
    image: hero3,
    cta: "Shop Clothing",
    link: "/?category=clothing",
  },
] satisfies {
  id: number;
  title: string;
  subtitle: string;
  image: StaticImageData;
  cta: string;
  link: string;
}[];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

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
  const activeBanner = banners[current];

  return (
    <section
      className="relative mb-4 h-[70vh] min-h-[480px] w-full overflow-hidden rounded-[2rem] bg-slate-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div key={activeBanner.id} className="absolute inset-0 hero-slide">
        <Image
          src={activeBanner.image}
          alt={activeBanner.title}
          fill
          preload={current === 0}
          sizes="100vw"
          className="hero-image object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-slate-950/30" />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="hero-copy max-w-xl text-white">
              <h1 className="mb-4 text-4xl font-bold leading-tight md:text-6xl">
                {activeBanner.title}
              </h1>
              <p className="mb-6 text-lg text-slate-200 md:text-xl">
                {activeBanner.subtitle}
              </p>
              <Link
                href={activeBanner.link}
                className="inline-block rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3 font-semibold text-white shadow-lg shadow-blue-950/30 transition-transform duration-200 hover:scale-105"
              >
                {activeBanner.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white backdrop-blur-md transition hover:bg-white/30 md:left-6"
        aria-label="Show previous banner"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white backdrop-blur-md transition hover:bg-white/30 md:right-6"
        aria-label="Show next banner"
      >
        <FaChevronRight />
      </button>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${
              idx === current ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

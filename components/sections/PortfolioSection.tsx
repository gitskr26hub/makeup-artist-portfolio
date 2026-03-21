"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { PortfolioData } from "@/lib/content";

export default function PortfolioSection({ data }: { data: PortfolioData }) {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered =
    active === "All"
      ? data.items
      : data.items.filter((item) => item.category === active);


  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % filtered.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);


  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 60) nextSlide(); // swipe left
    if (distance < -60) prevSlide(); // swipe right
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightbox) return;

      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") setLightbox(null);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox]);




  return (
    <section id="portfolio" className="py-32 bg-obsidian-950">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14 space-y-5">
          <div className="inline-flex items-center gap-3">
            <div className="h-px w-12 bg-champagne-600" />
            <span className="font-body text-xs text-champagne-400 tracking-[0.25em] uppercase">
              {data.badge}
            </span>
            <div className="h-px w-12 bg-champagne-600" />
          </div>

          <h2 className="font-display text-5xl lg:text-6xl text-champagne-50 font-light leading-tight">
            {data.headline}
          </h2>

          <p className="font-body text-champagne-200/60 max-w-xl mx-auto leading-relaxed">
            {data.subheadline}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {data.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2.5 rounded-full font-body text-sm tracking-wider transition-all duration-300 ${active === cat
                ? "btn-gold"
                : "btn-outline-gold text-champagne-300/70 hover:text-champagne-300"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

          {filtered.map((item, index) => {
            // console.log("filtered==>",{item})
            return (<div
              key={item.id}
              className="relative group cursor-pointer rounded-xl overflow-hidden img-zoom"
              onClick={() => {
                setLightbox(item.image.url);
                setCurrent(index)
              }}
            >

              {/* Image Container */}
              <div className="relative w-full aspect-[3/4]">

                <Image
                  src={item?.image?.url?.trim()}
                  alt={item.title}  
                  fill
                  sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-display text-sm text-champagne-100 font-medium">
                  {item.title}
                </p>

                <p className="font-body text-xs text-champagne-400/80 tracking-wider uppercase">
                  {item.category}
                </p>
              </div>

            </div>)

          }
          )}
        </div>

        {/* View Portfolio Button */}
        <div className="text-center mt-14">
          <a
            href="#contact"
            className="btn-outline-gold px-8 py-4 rounded-full font-body text-sm tracking-widest uppercase inline-block"
          >
            View Full Portfolio
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
          onClick={(e) => { setLightbox(null); e.stopPropagation() }}
        >
          <div
            className="relative max-w-5xl w-full overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >

            {/* Close Button */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 z-50 bg-white/30 backdrop-blur 
        text-white color-red w-10 h-10 rounded-full flex items-center justify-center"
            >
              ✕
            </button>

            {/* Slider */}
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {filtered.map((item, index) => (
                <div key={item?.image?.url + index} className="min-w-full flex justify-center">
                  <Image
                    src={item?.image?.url?.trim()}
                    alt="Portfolio"
                    width={1400}
                    height={900}
                    priority={index === current}
                    className="object-contain max-h-[90vh] w-full rounded-xl"
                  />
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button
              onClick={(e) => { prevSlide(); e.stopPropagation() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 px-3 py-2 rounded-full"
            >
              ‹
            </button>

            <button
              onClick={(e) => { nextSlide(); e.stopPropagation() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 px-3 py-2 rounded-full"
            >
              ›
            </button>

            {/* Progress Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {filtered
                .slice(
                  Math.max(0, current - 2),
                  Math.min(filtered.length, current + 3)
                )
                .map((_, i) => {
                  const realIndex = i + Math.max(0, current - 2);

                  return (
                    <button
                      key={realIndex}
                      onClick={() => setCurrent(realIndex)}
                      className={`w-2 h-2 rounded-full transition-all ${current === realIndex
                        ? "bg-white scale-125"
                        : "bg-white/40"
                        }`}
                    />
                  );
                })}
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
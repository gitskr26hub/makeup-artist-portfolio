"use client";

import { useState } from "react";
import Image from "next/image";
import type { PortfolioData } from "@/lib/content";

export default function PortfolioSection({ data }: { data: PortfolioData }) {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered =
    active === "All"
      ? data.items
      : data.items.filter((item) => item.category === active);

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
              className={`px-6 py-2.5 rounded-full font-body text-sm tracking-wider transition-all duration-300 ${
                active === cat
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

          {filtered.map((item) => (
            <div
              key={item.id}
              className="relative group cursor-pointer rounded-xl overflow-hidden img-zoom"
              onClick={() => setLightbox(item.image)}
            >

              {/* Image Container */}
              <div className="relative w-full aspect-[3/4]">

                <Image
                  src={item.image}
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

            </div>
          ))}
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
          onClick={() => setLightbox(null)}
        >

          <div className="relative max-w-5xl w-full">

            <Image
              src={lightbox}
              alt="Portfolio image"
              width={1400}
              height={900}
              className="object-contain max-h-[90vh] w-full rounded-xl"
            />

          </div>

        </div>
      )}
    </section>
  );
}
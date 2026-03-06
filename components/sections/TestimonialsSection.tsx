"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import type { TestimonialsData } from "@/lib/content";

export default function TestimonialsSection({ data }: { data: TestimonialsData }) {
  return (
    <section id="testimonials" className="py-32 bg-obsidian-900 relative overflow-hidden">
      {/* BG decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-champagne-900/10 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 space-y-5">
          <div className="inline-flex items-center gap-3">
            <div className="h-px w-12 bg-champagne-600" />
            <span className="font-body text-xs text-champagne-400 tracking-[0.25em] uppercase">{data.badge}</span>
            <div className="h-px w-12 bg-champagne-600" />
          </div>
          <h2 className="font-display text-5xl lg:text-6xl text-champagne-50 font-light leading-tight">
            {data.headline}
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {data.items.map((item, i) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl p-8 hover-lift group relative"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Quote icon */}
              <Quote
                size={40}
                className="text-champagne-800/40 absolute top-6 right-6"
                fill="currentColor"
              />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-champagne-500 fill-champagne-500" />
                ))}
              </div>

              {/* Text */}
              <p className="font-body text-champagne-200/75 leading-relaxed mb-8 italic text-sm relative z-10">
                &ldquo;{item.text}&rdquo;
              </p>

              {/* Gold divider */}
              <div className="gold-divider mb-6" />

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-champagne-700/30">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-champagne-100">{item.name}</p>
                  <p className="font-body text-xs text-champagne-400/60">{item.role}</p>
                  <p className="font-body text-xs text-champagne-500/40">{item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

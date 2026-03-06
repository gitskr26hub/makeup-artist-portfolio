"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import type { AboutData } from "@/lib/content";

export default function AboutSection({ data }: { data: AboutData }) {
  return (
    <section id="about" className="py-32 bg-obsidian-950 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-champagne-900/10 blur-[100px] -translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left - Image */}
          <div className="relative">
            {/* Decorative frame */}
            <div className="absolute top-8 -left-8 w-full h-full rounded-2xl border border-champagne-700/20" />

            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-champagne-900/30 img-zoom">
              <Image
                src={data.image}
                alt="About Roma"
                width={600}
                height={750}
                className="object-cover w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/40 to-transparent" />
            </div>

            {/* Floating experience badge */}
            <div className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-6 border border-champagne-700/30">
              <div className="font-display text-5xl text-champagne-400 font-semibold leading-none">2+</div>
              <div className="font-body text-xs text-champagne-300/70 tracking-wider uppercase mt-2">Years of<br />Artistry</div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-12 bg-champagne-600" />
              <span className="font-body text-xs text-champagne-400 tracking-[0.25em] uppercase">{data.badge}</span>
            </div>

            <h2 className="font-display text-5xl lg:text-6xl text-champagne-50 font-light leading-tight">
              {data.headline}
            </h2>

            <div className="space-y-4">
              <p className="font-body text-champagne-200/65 leading-relaxed">{data.bio}</p>
              <p className="font-body text-champagne-200/65 leading-relaxed">{data.bio2}</p>
            </div>

            {/* Skills */}
            <div className="grid grid-cols-2 gap-3">
              {data.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle size={14} className="text-champagne-500 flex-shrink-0" />
                  <span className="font-body text-sm text-champagne-200/80">{skill}</span>
                </div>
              ))}
            </div>

            {/* Gold divider */}
            <div className="gold-divider my-6" />

            {/* Signature */}
            <div>
              <p className="font-display text-3xl italic text-champagne-400">{data.signature}</p>
              <p className="font-body text-xs text-champagne-300/50 tracking-wider uppercase mt-1">Makeup Artist | Mehndi Designer</p>
            </div>

            <a href="#contact" className="btn-gold inline-block px-8 py-4 rounded-full font-body text-sm tracking-widest uppercase">
              Work with Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

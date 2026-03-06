"use client";

import { Heart, Camera, Sparkles, GraduationCap, Check } from "lucide-react";
import type { ServicesData } from "@/lib/content";

const iconMap: Record<string, React.ReactNode> = {
  heart: <Heart size={24} className="text-champagne-400" />,
  camera: <Camera size={24} className="text-champagne-400" />,
  sparkles: <Sparkles size={24} className="text-champagne-400" />,
  "graduation-cap": <GraduationCap size={24} className="text-champagne-400" />,
};

export default function ServicesSection({ data }: { data: ServicesData }) {
  return (
    <section id="services" className="py-32 bg-obsidian-900 relative overflow-hidden">
      {/* BG decoration */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(200,146,44,0.8) 1px, transparent 0)", backgroundSize: "40px 40px" }}
      />

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
          <p className="font-body text-champagne-200/60 max-w-xl mx-auto leading-relaxed">{data.subheadline}</p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.items.map((service, i) => (
            <div
              key={service.id}
              className="glass-card rounded-2xl p-8 hover-lift group transition-all duration-300 hover:border-champagne-600/40"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-champagne-900/50 flex items-center justify-center mb-6 group-hover:bg-champagne-800/50 transition-colors">
                {iconMap[service.icon] || <Sparkles size={24} className="text-champagne-400" />}
              </div>

              {/* Title & Price */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-display text-xl text-champagne-100 font-medium leading-snug">{service.title}</h3>
              </div>

              <p className="font-body text-sm text-champagne-200/60 leading-relaxed mb-6">{service.description}</p>

              {/* Features */}
              <ul className="space-y-2.5 mb-6">
                {service.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-2.5">
                    <Check size={12} className="text-champagne-500 flex-shrink-0" />
                    <span className="font-body text-xs text-champagne-300/70">{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className="pt-4 border-t border-champagne-800/20 ">
                <span className="font-display fs-40 text-lg text-champagne-400">{service.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 rounded-2xl border border-champagne-700/20 bg-champagne-900/10 p-10 text-center">
          <h3 className="font-display text-3xl text-champagne-100 mb-3 font-light">
            Not sure which service is right for you?
          </h3>
          <p className="font-body text-champagne-200/60 mb-6">Let&apos;s talk about your vision and find the perfect fit.</p>
          <a href="#contact" className="btn-gold inline-block px-8 py-4 rounded-full font-body text-sm tracking-widest uppercase">
            Get a Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}

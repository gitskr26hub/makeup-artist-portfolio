"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, Star } from "lucide-react";
import type { HeroData } from "@/lib/content";

export default function HeroSection({ data }: { data: HeroData }) {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const [current, setCurrent] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrent((prev) => (prev + 1) % data?.heroImage?.length);
  //   }, 4000); // change every 4 sec

  //   return () => clearInterval(interval);
  // }, [data?.heroImage?.length]);


  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % data.heroImage.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + data.heroImage.length) % data.heroImage.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-obsidian-950">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-champagne-900/10 blur-[120px] translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-champagne-800/8 blur-[100px] -translate-x-1/4 translate-y-1/4" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(200,146,44,0.5) 60px, rgba(200,146,44,0.5) 61px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center ">
        {/* Left - Text content */}
        <div className="space-y-8  order-2 lg:order-1 ">
          {/* Badge */}
          <div
            className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full border border-champagne-700/40 bg-champagne-900/20"
            style={{ transitionDelay: "0.1s" }}
          >
            <Star size={12} className="text-champagne-400 fill-champagne-400" />
            <span className="font-body text-xs text-champagne-300 tracking-[0.2em] uppercase">
              {data.badge}
            </span>
            <Star size={12} className="text-champagne-400 fill-champagne-400" />
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="reveal font-display text-7xl lg:text-8xl xl:text-9xl font-light leading-[0.9] tracking-tight text-champagne-50"
            style={{ transitionDelay: "0.2s" }}
          >
            {data.headline}
            <br />
            <span className="italic gold-shimmer">{data.headlineAccent}</span>
          </h1>

          {/* Subheadline */}
          <p
            className="reveal font-body text-lg text-champagne-200/60 leading-relaxed max-w-md"
            style={{ transitionDelay: "0.35s" }}
          >
            {data.subheadline}
          </p>

          {/* CTAs */}
          <div
            className="reveal flex flex-wrap gap-4"
            style={{ transitionDelay: "0.5s" }}
          >
            <a
              href="#contact"
              className="btn-gold px-8 py-4 rounded-full font-body text-sm tracking-widest uppercase"
            >
              {data.ctaPrimary}
            </a>
            <a
              href="#portfolio"
              className="btn-outline-gold px-8 py-4 rounded-full font-body text-sm tracking-widest uppercase"
            >
              {data.ctaSecondary}
            </a>
          </div>

          {/* Stats */}
          <div
            className="reveal grid grid-cols-4 gap-6 pt-6 border-t border-champagne-800/20"
            style={{ transitionDelay: "0.65s" }}
          >
            {data.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-3xl text-champagne-400 font-semibold">
                  {stat.value}
                </div>
                <div className="font-body text-xs text-champagne-300/50 tracking-wider uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Hero image */}
        <div
          className="reveal relative order-1 lg:order-2"
          style={{ transitionDelay: "0.3s" }}
        >
          {/* Frame decoration */}
          <div className="absolute -inset-4 rounded-3xl border border-champagne-700/20" />
          <div className="absolute -inset-8 rounded-3xl border border-champagne-800/10" />

          {/* Floating accent */}
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-champagne-600/20 blur-xl" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-champagne-700/15 blur-xl" />

          <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl shadow-champagne-900/40">


            <div className="relative w-full h-full overflow-hidden">

              {/* Images */}
              {data.heroImage.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100 z-10" : "opacity-0"
                    }`}
                >
                  <Image
                    src={img}
                    alt="Roma Rawat- Makeup Artist"
                    fill
                    priority={index === 0}
                   
                    sizes="100vw"
                    className="object-cover scale-110 transition-transform duration-[6000ms]"
                  />
                </div>
              ))}

              {/* Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 z-30 -translate-y-1/2 bg-white/30 backdrop-blur px-3 py-2 rounded-full"
              >
                ‹
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 z-30 -translate-y-1/2 bg-white/30 backdrop-blur px-3 py-2 rounded-full"
              >
                ›
              </button>

              {/* Dots */}
              {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {data?.heroImage?.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full ${
              current === i ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div> */}

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/60 via-transparent to-transparent" />
              {/* Floating card */}
              <div className="absolute z-30 bottom-6 left-6 right-6 glass-card rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-champagne-600 flex items-center justify-center">
                    <Star size={16} className="text-obsidian-950 fill-obsidian-950" />
                  </div>
                  <div>
                    <div className="font-display text-xl text-champagne-100 font-semibold">
                      Roma Rawat
                    </div>
                    <div className="font-body text-xs text-champagne-400/70">
                      Lucknow · Available across India
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>





        </div>
      </div>

      {/* Scroll indicator */}
      {/* <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-champagne-500/50 hover:text-champagne-400 transition-colors"
      >
        <span className="font-body text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a> */}
    </section>
  );
}

"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import type { AboutData } from "@/lib/content";
import { useEffect, useState } from "react";

export default function AboutSection({ data }: { data: AboutData }) {


  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % data.aboutImages.length);
    }, 3000); // change image every 3 seconds

    return () => clearInterval(interval);
  }, [data.aboutImages.length]);




  return (
    <section id="about" className="py-32 bg-obsidian-950 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-champagne-900/10 blur-[100px] -translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left - Image */}
          <div className="relative max-w-[600px]">

            {/* Decorative Frame */}
            <div className="absolute top-8 -left-8 w-full h-full rounded-2xl border border-champagne-700/20 pointer-events-none" />

            {/* Slider */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-champagne-900/30 img-zoom">

              {data?.aboutImages?.map((img, index) => (
                <div
                  key={index}


                  className={`transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0 absolute inset-0"
                    }`}
                >
                  <Image
                    src={img}
                    alt="About"
                    width={600}
                    height={750}
                    className="object-cover w-full transition-all duration-700 hover:scale-110 hover:brightness-110"
                    // className="w-full h-auto object-contain"
                    priority={index === 0}
                  />
                </div>
              ))}

            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-6 border border-champagne-700/30">
              <div className="font-display text-5xl text-champagne-400 font-semibold leading-none">
                {data.experienceYear}+ 
              </div>
              <div className="font-body text-xs text-champagne-300/70 tracking-wider uppercase mt-2">
                Years of<br />Artistry
              </div>
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
              <p className="font-body text-xs text-champagne-300/50 tracking-wider uppercase mt-1">{data.profession}</p>
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

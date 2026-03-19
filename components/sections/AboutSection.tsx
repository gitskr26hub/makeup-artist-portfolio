"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { AboutData } from "@/lib/content";

export default function AboutSection({ data }: { data: AboutData }) {
  const images = data.aboutImages ?? [];
  const total = images.length;
  const [current, setCurrent] = useState(0);

  // 🔥 Optimized slider
  useEffect(() => {
    if (total <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 3500);

    return () => clearInterval(interval);
  }, [total]);

  // 🔥 Animation variants (reusable)
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const stagger = {
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section className="relative overflow-hidden py-28 lg:py-36 bg-obsidian-950">
      
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 w-[36rem] h-[36rem] -translate-x-1/2 rounded-full bg-champagne-900/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* 🔥 LEFT IMAGE */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
              
              <div className="relative aspect-[4/5]">

                {/* 🔥 AnimatePresence for smooth image transition */}
                <AnimatePresence mode="wait">
                  {images.length > 0 && (
                    <motion.div
                      key={current}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1.1 }}
                      exit={{ opacity: 0, scale: 1 }}
                      transition={{ duration: 1.5 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={images[current].url}
                        alt="About"
                        fill
                        priority
                        sizes="(min-width: 1024px) 600px, 100vw"
                        className="object-cover will-change-transform"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/70 to-transparent" />

                {/* Controls */}
                {total > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrent((prev) => (prev - 1 + total) % total)
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 backdrop-blur p-2 rounded-full"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <button
                      onClick={() =>
                        setCurrent((prev) => (prev + 1) % total)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 backdrop-blur p-2 rounded-full"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Floating Years Badge */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-6 border border-champagne-700/30"
            >
               <div className="font-display text-5xl text-champagne-400 font-semibold leading-none">
                {data.experienceYear}+ 
              </div>
              <div className="font-body text-xs text-champagne-300/70 tracking-wider uppercase mt-2">
                Years of<br />Experience
              </div>
            </motion.div>
          </motion.div>

          {/* 🔥 RIGHT CONTENT */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-10"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <div className="h-px w-12 bg-champagne-600" />
              <span className="text-xs tracking-[0.3em] uppercase text-champagne-400">
                {data.badge}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              className="text-5xl lg:text-6xl font-display text-champagne-50"
            >
              {data.headline}
            </motion.h2>

            {/* Text */}
            <motion.div variants={fadeUp} className="space-y-4">
              <p className="text-champagne-200/70">{data.bio}</p>
              <p className="text-champagne-200/60">{data.bio2}</p>
            </motion.div>

            {/* Skills */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
              {data.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-champagne-500" />
                  <span className="text-sm">{skill}</span>
                </div>
              ))}
            </motion.div>


 {/* Gold divider */}
 <div className="gold-divider my-6" />
            {/* CTA */}
            <motion.div variants={fadeUp} >

           


            {/* Signature */}
            <div>
              <p className="font-display text-3xl italic text-champagne-400">{data.signature}</p>
              <p className="font-body text-xs text-champagne-300/50 tracking-wider uppercase mt-1">{data.profession}</p>
            </div>

            <div className="flex mt-3  gap-6 sm:block">
              <a href="#contact" className="btn-gold inline-block px-8 py-4 rounded-full font-body text-sm tracking-widest uppercase">
              Work with Me
            </a>
                      
              {/* <a
                href="#portfolio"
                className="btn-outline-gold px-8 py-4 rounded-full"
              >
                View Work
              </a>  */}
            </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
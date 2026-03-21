"use client";

import { Heart, Camera, Sparkles, GraduationCap, Check } from "lucide-react";
import { motion } from "framer-motion";
import type { ServicesData } from "@/lib/content";

const iconMap: Record<string, React.ReactNode> = {
  heart: <Heart size={24} className="text-champagne-400" />,
  camera: <Camera size={24} className="text-champagne-400" />,
  sparkles: <Sparkles size={24} className="text-champagne-400" />,
  "graduation-cap": <GraduationCap size={24} className="text-champagne-400" />,
};

// 🔥 Motion Variants
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardHover = {
  hover: {
    y: -10,
    scale: 1.03,
    transition: { duration: 0.3 },
  },
};

export default function ServicesSection({ data }: { data: ServicesData }) {
  return (
    <section id="services" className="py-32 bg-obsidian-900 relative overflow-hidden">
      
      {/* BG */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(200,146,44,0.8) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">

        {/* 🔥 HEADER */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="text-center mb-20 space-y-5"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3">
            <div className="h-px w-12 bg-champagne-600" />
            <span className="text-xs text-champagne-400 tracking-[0.25em] uppercase">
              {data.badge}
            </span>
            <div className="h-px w-12 bg-champagne-600" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-display text-5xl lg:text-6xl text-champagne-50 font-light"
          >
            {data.headline}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-champagne-200/60 max-w-xl mx-auto"
          >
            {data.subheadline}
          </motion.p>
        </motion.div>

        {/* 🔥 CARDS */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {data.items.map((service) => (
            <motion.div
              key={service.id}
              variants={fadeUp}
              whileHover="hover"
              className="glass-card rounded-2xl p-8 group border border-transparent hover:border-champagne-600/40 transition"
            >
              <motion.div variants={cardHover}>
                
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-champagne-900/50 flex items-center justify-center mb-6 group-hover:bg-champagne-800/50 transition-colors">
                  {iconMap[service.icon] || (
                    <Sparkles size={24} className="text-champagne-800" />
                  )}
                </div>

                {/* Title */}
                <h3 className="font-display text-xl text-champagne-100 mb-3">
                  {service.title}
                </h3>

                {/* Desc */}
                <p className="text-sm text-champagne-200/60 mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5 mb-6">
                  {service.features.map((feat, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: j * 0.05 }}
                      className="flex items-center gap-2.5"
                    >
                      <Check size={12} className="text-champagne-500" />
                      <span className="text-xs text-champagne-300/70">
                        {feat}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Price */}
                <div className="pt-4 border-t border-champagne-800/20">
                  <span className="font-display text-2xl">
                    {service.price}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* 🔥 CTA */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 rounded-2xl border border-champagne-700/20 bg-champagne-900/10 p-10 text-center"
        >
          <h3 className="font-display text-3xl   mb-3 font-light">
            Not sure which service is right for you?
          </h3>

          <p className="text-champagne-200/60 mb-6">
            Let&apos;s talk about your vision and find the perfect fit.
          </p>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="btn-gold inline-block px-10 py-4 rounded-full text-sm tracking-widest uppercase"
          >
            Get a Free Consultation
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
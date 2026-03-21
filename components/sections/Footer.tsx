"use client";

import Link from "next/link";
import { Instagram, Mail, Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { ContactData, firstName, lastName } from "@/lib/content";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function Footer({
  contact,
  firstName,
  lastName,
}: {
  contact: ContactData;
  firstName: firstName;
  lastName: lastName;
}) {
  return (
    <footer className="bg-obsidian-900 border-t border-champagne-900/20 py-16 relative overflow-hidden">
      {/* subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-champagne-900/10 blur-[120px]" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            variants={fadeUp}
            className="md:col-span-2 space-y-4"
          >
            <div>
              <span className="font-display text-2xl text-champagne-100">
                {firstName}{" "}
                <em className="text-champagne-400">{lastName}</em>
              </span>
              <p className="font-body text-xs text-champagne-400/50 tracking-widest uppercase mt-1">
                Makeup Artistry
              </p>
            </div>

            <p className="font-body text-sm text-champagne-200/50 leading-relaxed max-w-xs">
              Transformative makeup artistry for weddings, editorials, film &
              fashion. Available across India.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={`https://instagram.com/${contact?.instagram.replace(
                  "@",
                  ""
                )}`}
                target="_blank"
                className="w-9 h-9 rounded-full border border-champagne-800/30 flex items-center justify-center text-champagne-500/60 hover:text-champagne-400 hover:border-champagne-600/50 transition-all"
              >
                <Instagram size={15} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={`mailto:${contact.email}`}
                className="w-9 h-9 rounded-full border border-champagne-800/30 flex items-center justify-center text-champagne-500/60 hover:text-champagne-400 hover:border-champagne-600/50 transition-all"
              >
                <Mail size={15} />
              </motion.a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={fadeUp}>
            <p className="font-body text-xs text-champagne-400/60 tracking-[0.2em] uppercase mb-4">
              Navigation
            </p>
            <ul className="space-y-3">
              {["About", "Services", "Portfolio", "Testimonials", "Contact"].map(
                (item, i) => (
                  <motion.li
                    key={item}
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="font-body text-sm text-champagne-200/50 hover:text-champagne-300 transition-colors"
                    >
                      {item}
                    </a>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp}>
            <p className="font-body text-xs text-champagne-400/60 tracking-[0.2em] uppercase mb-4">
              Contact
            </p>

            <ul className="space-y-3">
              <li className="text-sm text-champagne-200/50">
                {contact.email}
              </li>
              <li className="text-sm text-champagne-200/50">
                {contact.phone}
              </li>
              <li className="text-sm text-champagne-200/50">
                {contact.location}
              </li>

              <motion.li whileHover={{ x: 6 }}>
                <Link
                  href="/admin/login"
                  className="text-xs text-champagne-700/40 hover:text-champagne-500 transition-colors"
                >
                  Admin Portal
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div variants={fadeUp}>
          <div className="gold-divider mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-champagne-400/30">
              © {new Date().getFullYear()} Roma Makeup Studio. All rights reserved.
            </p>

            <motion.p
              whileHover={{ scale: 1.05 }}
              className="text-xs text-champagne-400/30 flex items-center gap-1"
            >
              Made with{" "}
              <Heart
                size={10}
                className="text-champagne-600 fill-champagne-600"
              />{" "}
              in Lucknow City, India.
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
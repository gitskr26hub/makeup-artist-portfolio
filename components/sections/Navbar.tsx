"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Instagram } from "lucide-react";
import type { ContactData, firstName, lastName } from "@/lib/content";

export default function Navbar({ contact, firstName, lastName }:
  { contact: ContactData, firstName: firstName, lastName: lastName }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-obsidian-900/95 backdrop-blur-md border-b border-champagne-800/20 py-3"
          : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-champagne-400/60 flex items-center justify-center">
            <span className="text-champagne-400 text-xs font-display font-semibold">R</span>
          </div>
          <span className="text-4xl font-display text-champagne-100 tracking-wide group-hover:text-champagne-300 transition-colors">
            {firstName}<span className="italic text-champagne-400"> {lastName}</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-champagne-200/70 hover:text-champagne-300 transition-colors tracking-wider uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + Social */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={`https://instagram.com/${contact?.instagram?.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-champagne-400/60 hover:text-champagne-400 transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a
            href="#contact"
            className="btn-gold px-5 py-2.5 rounded-full text-sm font-body tracking-wide"
          >
            Book Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-champagne-300"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-obsidian-900/98 backdrop-blur-md border-t border-champagne-800/20 px-6 py-6 space-y-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block font-body text-champagne-200/80 hover:text-champagne-300 transition-colors tracking-wider uppercase text-sm py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-gold block text-center px-5 py-3 rounded-full text-sm font-body tracking-wide mt-4"
          >
            Book Now
          </a>
        </div>
      )}
    </nav>
  );
}

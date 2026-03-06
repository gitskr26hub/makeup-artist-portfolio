import Link from "next/link";
import { Instagram, Mail, Heart } from "lucide-react";
import type { SiteData } from "@/lib/content";

export default function Footer({ data }: { data: SiteData }) {
  return (
    <footer className="bg-obsidian-900 border-t border-champagne-900/20 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <span className="font-display text-2xl text-champagne-100">Roma <em className="text-champagne-400">Rawat</em></span>
              <p className="font-body text-xs text-champagne-400/50 tracking-widest uppercase mt-1">Makeup Artistry</p>
            </div>
            <p className="font-body text-sm text-champagne-200/50 leading-relaxed max-w-xs">
              Transformative makeup artistry for weddings, editorials, film & fashion. Available across India.
            </p>
            <div className="flex gap-3">
              <a href={`https://instagram.com/${data.contact.instagram.replace("@","")}`} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-champagne-800/30 flex items-center justify-center text-champagne-500/60 hover:text-champagne-400 hover:border-champagne-600/50 transition-colors">
                <Instagram size={15} />
              </a>
              <a href={`mailto:${data.contact.email}`}
                className="w-9 h-9 rounded-full border border-champagne-800/30 flex items-center justify-center text-champagne-500/60 hover:text-champagne-400 hover:border-champagne-600/50 transition-colors">
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-body text-xs text-champagne-400/60 tracking-[0.2em] uppercase mb-4">Navigation</p>
            <ul className="space-y-3">
              {["About", "Services", "Portfolio", "Testimonials", "Contact"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="font-body text-sm text-champagne-200/50 hover:text-champagne-300 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-xs text-champagne-400/60 tracking-[0.2em] uppercase mb-4">Contact</p>
            <ul className="space-y-3">
              <li className="font-body text-sm text-champagne-200/50">{data.contact.email}</li>
              <li className="font-body text-sm text-champagne-200/50">{data.contact.phone}</li>
              <li className="font-body text-sm text-champagne-200/50">{data.contact.location}</li>
              <li>
                <Link href="/admin" className="font-body text-xs text-champagne-700/40 hover:text-champagne-500 transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="gold-divider mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-champagne-400/30">
            © {new Date().getFullYear()} Roma Makeup Studio. All rights reserved.
          </p>
          <p className="font-body text-xs text-champagne-400/30 flex items-center gap-1">
            Made with <Heart size={10} className="text-champagne-600 fill-champagne-600" /> in New York City
          </p>
        </div>
      </div>
    </footer>
  );
}

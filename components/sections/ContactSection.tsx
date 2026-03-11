"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Instagram, Send,AppWindow } from "lucide-react";
import toast from "react-hot-toast";
import type { ContactData } from "@/lib/content";

export default function ContactSection({ data }: { data: ContactData }) {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success("Message sent! I'll be in touch soon.");
    setForm({ name: "", email: "", service: "", message: "" });
    setLoading(false);
  };

  return (
    <section id="contact" className="py-32 bg-obsidian-950 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-champagne-900/8 blur-[100px]" />

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
          <p className="font-body text-champagne-200/60 max-w-xl mx-auto">{data.subheadline}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <div className="space-y-10">
            <p className="font-body text-champagne-200/70 leading-relaxed text-lg">
              {data.availability}
            </p>

            <div className="space-y-6">
              {[
                { icon: <Mail size={18} />, label: "Email", value: data.email, href: `mailto:${data.email}` },
                { icon: <Phone size={18} />, label: "Phone", value: data.phone, href: `tel:${data.phone}` },
                { icon: <svg role="img" viewBox="-8 -8 40 40" fill="#D4AF37"  >
                  <title>WhatsApp</title>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>,
                   label: "WhatsApp", value: data.phone, 
                   href: `https://wa.me/${data.whatsapp}?text=Hello%20I%20want%20to%20book%20a%20makeup%20appointment` },
                { icon: <MapPin size={18} />, label: "Location", value: data.location, 
                href: `https://www.google.com/maps/place/Lucknow,+Uttar+Pradesh/@26.8485965,80.7777009,11z/data=!3m1!4b1!4m6!3m5!1s0x399bfd991f32b16b:0x93ccba8909978be7!8m2!3d26.8466937!4d80.946166!16zL20vMDIydHE0?entry=ttu&g_ep=EgoyMDI2MDMwMi4wIKXMDSoASAFQAw%3D%3D` },
                { icon: <Instagram size={18} />, label: "Instagram", value: data?.instagram, href: `https://instagram.com/${data?.instagram?.replace("@","")}` },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-champagne-900/40 border border-champagne-800/30 flex items-center justify-center text-champagne-500 group-hover:bg-champagne-800/40 transition-colors flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-body text-xs text-champagne-400/50 tracking-wider uppercase mb-1">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                        className="font-body text-champagne-200/80 hover:text-champagne-300 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-body text-champagne-200/80">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Process */}
            <div className="glass-card rounded-2xl p-8">
              <h3 className="font-display text-xl text-champagne-200 mb-6 font-light">How it works</h3>
              <div className="space-y-4">
                {["Send your inquiry", "Free 15-min consultation", "Confirm booking & details", "Transform on your big day"].map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-champagne-700/30 border border-champagne-600/40 flex items-center justify-center flex-shrink-0">
                      <span className="text-champagne-500 text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="font-body text-sm text-champagne-300/70">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          {/* <div className="glass-card rounded-2xl p-8">
            <h3 className="font-display text-2xl text-champagne-100 mb-8 font-light">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-xs text-champagne-400/60 tracking-wider uppercase mb-2 block">Name</label>
                  <input
                    type="text" required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-obsidian-800/50 border border-champagne-800/30 rounded-xl px-4 py-3 font-body text-sm text-champagne-100 placeholder-champagne-400/30 focus:outline-none focus:border-champagne-600/60 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="font-body text-xs text-champagne-400/60 tracking-wider uppercase mb-2 block">Email</label>
                  <input
                    type="email" required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-obsidian-800/50 border border-champagne-800/30 rounded-xl px-4 py-3 font-body text-sm text-champagne-100 placeholder-champagne-400/30 focus:outline-none focus:border-champagne-600/60 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="font-body text-xs text-champagne-400/60 tracking-wider uppercase mb-2 block">Service</label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full bg-obsidian-800/50 border border-champagne-800/30 rounded-xl px-4 py-3 font-body text-sm text-champagne-100 focus:outline-none focus:border-champagne-600/60 transition-colors"
                >
                  <option value="">Select a service</option>
                  <option>Bridal Makeup</option>
                  <option>Editorial & Fashion</option>
                  <option>Special Occasions</option>
                  <option>Makeup Masterclass</option>
                </select>
              </div>
              <div>
                <label className="font-body text-xs text-champagne-400/60 tracking-wider uppercase mb-2 block">Message</label>
                <textarea
                  rows={5} required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-obsidian-800/50 border border-champagne-800/30 rounded-xl px-4 py-3 font-body text-sm text-champagne-100 placeholder-champagne-400/30 focus:outline-none focus:border-champagne-600/60 transition-colors resize-none"
                  placeholder="Tell me about your event, vision, and date..."
                />
              </div>
              <button
                type="submit" disabled={loading}
                className="btn-gold w-full px-8 py-4 rounded-xl font-body text-sm tracking-widest uppercase flex items-center justify-center gap-3 disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
                {!loading && <Send size={16} />}
              </button>
            </form>
          </div> */}
        </div>
      </div>
    </section>
  );
}

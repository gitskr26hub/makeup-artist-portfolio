"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Lock, Eye, EyeOff } from "lucide-react";
import { COOKIE_NAME } from "@/lib/auth";

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Welcome back!");
        // console.log("LOGIN SUCCESS");

        // console.log({ data })
        sessionStorage.setItem(COOKIE_NAME, data.token);      
        // router.push("/admin/dashboard");
        // const cookies = document.cookie;
        // console.log("BROWSER COOKIES==>:", {cookies});

   

        router.push("/admin/dash");
        router.refresh();
       


      } else {
        toast.error(data.message || "Invalid credentials!!");
      }
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-full border border-champagne-400/40 flex items-center justify-center mx-auto mb-4">
            <Lock size={20} className="text-champagne-400" />
          </div>
          <h1 className="font-display text-3xl text-champagne-100">Admin Portal</h1>
          <p className="font-body text-sm text-champagne-400/50 mt-2">Studio CMS</p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-body text-xs text-champagne-400/60 tracking-wider uppercase mb-2 block">Email</label>
              <input
                type="email" required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-obsidian-800/50 border border-champagne-800/30 rounded-xl px-4 py-3 font-body text-sm text-champagne-100 placeholder-champagne-400/30 focus:outline-none focus:border-champagne-600/60 transition-colors"
                placeholder="admin@glamourstudio.com"
              />
            </div>
            <div className="relative">
              <label className="font-body text-xs text-champagne-400/60 tracking-wider uppercase mb-2 block">Password</label>
              <input
                type={showPassword ? "text" : "password"} required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-obsidian-800/50 border border-champagne-800/30 rounded-xl px-4 py-3 pr-12 font-body text-sm text-champagne-100 placeholder-champagne-400/30 focus:outline-none focus:border-champagne-600/60 transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[calc(50%+10px)] text-champagne-500/50 hover:text-champagne-400"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button
              type="submit" disabled={loading}
              className="btn-gold w-full px-8 py-4 rounded-xl font-body text-sm tracking-widest uppercase disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* <p className="text-center font-body text-xs text-champagne-400/30 mt-6">
          Set credentials in your <code className="text-champagne-600">.env.local</code> file
        </p> */}
      </div>
    </div>
  );
}

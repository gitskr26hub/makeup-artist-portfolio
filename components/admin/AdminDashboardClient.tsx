

"use client";

import { useState, useRef, SetStateAction, Dispatch } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Home, User, Briefcase, Grid, MessageSquare, Phone,
  LogOut, Upload, Save, Plus, Trash2, X, Settings, Eye, Menu,
  Star
} from "lucide-react";
import type { SiteData, HeroData, AboutData, ServicesData, PortfolioData, ContactData, heroImage } from "@/lib/content";
import { updateContentRepo } from "@/repositories/admin.repository";
import { deleteImage } from "@/lib/cloudinary";
import { Loader } from "../sections/Loader";
import { ProcessingBtn } from "../sections/ProcessingBtn";

const tabs = [
  { id: "hero", label: "Hero", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "portfolio", label: "Portfolio", icon: Grid },
  { id: "testimonials", label: "Reviews", icon: MessageSquare },
  { id: "contact", label: "Contact", icon: Phone },
  { id: "seo", label: "SEO", icon: Settings },
];

export default function AdminDashboardClient({ initialData }: { initialData: SiteData }) {
  const [data, setData] = useState<SiteData>(initialData);
  const [activeTab, setActiveTab] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const saveSection = async (section: keyof SiteData) => {
    if (saving) return;
    setSaving(true);

    try {
      console.log(data);
      const isUpdated: any = await updateContentRepo(data);
      if (isUpdated) {
        toast.success("Changes saved successfully!");
      } else {
        toast.error("Save failed. Please try again.");
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setSaving(false);
    }
  };

  const uploadImage = async (file: File, onSuccess: (url: string) => void) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const result = await res.json();
      if (result.url) {
        onSuccess(result.url);
        toast.success("Image uploaded!");
      } else {
        toast.error("Upload failed.");
      }
    } catch {
      toast.error("Upload error.");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  if (saving) return <ProcessingBtn />

  return (
    <div className="min-h-screen bg-obsidian-900 flex ">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
      fixed md:static top-0 left-0 h-full w-64
      bg-obsidian-900 border-r border-champagne-800/20
      flex flex-col flex-shrink-0
      transform transition-transform duration-300 z-40
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0
    `}
      >
        <div className="p-6 border-b border-champagne-800/20 flex items-center justify-between">
          <div>
            <p className="font-display text-xl text-champagne-100">
              Roma <em className="text-champagne-400"> Rawat</em>
            </p>
            <p className="font-body text-xs text-champagne-400/50 mt-1">
              CMS Dashboard
            </p>
          </div>

          {/* Close button mobile */}
          <button
            className="md:hidden text-champagne-300"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm transition-all ${activeTab === tab.id
                  ? "bg-champagne-800/30 text-champagne-300 border border-champagne-700/30"
                  : "text-champagne-400/60 hover:text-champagne-300 hover:bg-champagne-900/30"
                  }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 space-y-2 border-t border-champagne-800/20">
          <a
            href="/"
            target="_blank"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm text-champagne-400/60 hover:text-champagne-300 transition-colors"
          >
            <Eye size={16} />
            View Site
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm text-champagne-400/60 hover:text-red-400 transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto w-full">

        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-champagne-800/20 bg-obsidian-900">

          <button
            onClick={() => setSidebarOpen(true)}
            className="text-champagne-300"
          >
            <Menu size={22} />
          </button>

          <p className="font-display text-lg text-champagne-200">
            Dashboard
          </p>

          <div />
        </div>

        <div className="max-w-4xl mx-auto p-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-2xl text-champagne-100 capitalize">
                {activeTab} Settings
              </h1>

              <p className="font-body text-sm text-champagne-400/50 mt-1">
                Edit your site content
              </p>
            </div>

            <button
              onClick={() => saveSection(activeTab as keyof SiteData)}
              disabled={saving}
              className="btn-gold px-6 py-3 rounded-xl font-body text-sm tracking-wide flex items-center gap-2 disabled:opacity-60"
            >
              <Save size={15} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {/* Tab content */}

          {activeTab === "hero" && (
            <HeroEditor
              data={data.hero}
              onChange={(h) => setData({ ...data, hero: h })}
              uploadImage={uploadImage}
              uploading={uploading}
              wholeData={data}
            />
          )}

          {activeTab === "about" && (
            <AboutEditor
              data={data.about}
              onChange={(a) => setData({ ...data, about: a })}
              uploadImage={uploadImage}
              uploading={uploading}
            />
          )}

          {activeTab === "services" && (
            <ServicesEditor
              data={data.services}
              onChange={(s) => setData({ ...data, services: s })}
            />
          )}

          {activeTab === "portfolio" && (
            <PortfolioEditor
              data={data.portfolio}
              onChange={(p) => setData({ ...data, portfolio: p })}
              uploadImage={uploadImage}
              uploading={uploading}
            />
          )}

          {activeTab === "contact" && (
            <ContactEditor
              data={data.contact}
              onChange={(c) => setData({ ...data, contact: c })}
            />
          )}

          {activeTab === "seo" && (
            <SEOEditor
              data={data.seo}
              onChange={(s) => setData({ ...data, seo: s })}
            />
          )}

          {activeTab === "testimonials" && (
            <TestimonialsEditor
              data={data.testimonials}
              onChange={(t) =>
                setData({ ...data, testimonials: t })
              }
              uploadImage={uploadImage}
              uploading={uploading}
            />
          )}

        </div>
      </main>
    </div>
  );
}

/* ── Field Components ── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="font-body text-xs text-champagne-400/60 tracking-wider uppercase mb-2 block">{label}</label>
      {children}
    </div>
  );
}

const inputCls = `w-full bg-obsidian-800/50 border border-champagne-800/30
 rounded-xl px-4 py-3 font-body text-sm text-champagne-100 placeholder-champagne-400/30 focus:outline-none focus:border-champagne-600/60 transition-colors`;



async function deleteImageFromCloudinary({ collectionName, ImgArrName, imgItem }: {
  collectionName: string;
  imgItem: { url: string, publicId: string };
  ImgArrName: string;
}) {

  try {

    const res = await fetch("/api/delete-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ imgItem, collectionName, ImgArrName, }),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success("SUCCESSFULLY Deleted!");
      // console.log("LOGIN SUCCESS");
      return true;

    } else {
      toast.error(data.message || "Invalid credentials!!");
      return false;
    }
  } catch (err) {
    throw new Error()
  }
}


function HeroEditor({ data, onChange, uploadImage, uploading, wholeData }: { wholeData: SiteData; data: HeroData; onChange: (d: HeroData) => void; uploadImage: (f: File, cb: (url: string) => void) => void; uploading: boolean }) {
  //  console.log("HeroData",{data})
  const [loading, setLoading] = useState(false);

  const DeleteHeroImage = async ({ item, i }: { item: { url: string, publicId: string }, i: number }) => {
    try {

      if (data?.heroImage.length <= 1) {
        return alert("Can not delete this last Image! Atleat one image should present!")
      }

      setLoading(true)
      const confirmDelete = window.confirm(
        "Do you really want to delete this image?"
      );

      if (!confirmDelete) { return setLoading(false); }
      // first delete from cloudanary . then remove from database 
      await deleteImageFromCloudinary({ collectionName: "hero", ImgArrName: "heroImage", imgItem: item })

      onChange({ ...data, heroImage: data?.heroImage.filter((_, j) => j !== i) });
      // console.log({data});


    } catch (err) {
      throw new Error();
    }
    finally {
      setLoading(false)
    }



  }

  const handleImageUpload = async (files: FileList) => {
    setLoading(true)
    try {
      const formData = new FormData();

      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });
      // extra data
      formData.append("collectionName", "hero");
      formData.append("ImgArrName", "heroImage");

      const res = await fetch("/api/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }
      const DATA_ = await res.json()
      console.log({ DATA_ })

      if (DATA_?.images?.length > 0) onChange({ ...data, heroImage: [...data?.heroImage, ...DATA_?.images] });

      toast.success("Successfully updated Images!");

    } catch (error) {

      console.error(error);

    } finally {
      setLoading(false)
    }
  }

  const fileRef = useRef<HTMLInputElement>(null);

  if (loading) return <Loader />
  return (
    <section className="relative min-h-screen flex items-center bg-obsidian-950 text-white!">




      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center ">

        {/* Right - Hero image */}
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg text-champagne-200">HERO Images ({data?.heroImage?.length})</h3>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
            onChange={(e) => {
              const files = e.target.files;
              if (!files) return;
              handleImageUpload(files);
            }}
          />
          <button onClick={() => fileRef.current?.click()} className="btn-gold px-4 py-2 rounded-lg font-body text-xs flex items-center gap-2">
            <Upload size={13} /> Add Image
          </button>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data?.heroImage?.map((item, i) => (
            <div key={item.url} className="space-y-2">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <img src={item.url} className="object-cover" />
                {!loading && <button
                  onClick={() => DeleteHeroImage({ item, i })}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full 
                  flex items-center justify-center hover:bg-red-900"
                >
                  <X size={12} className="text-white" />
                </button>}
              </div>

            </div>
          ))}
        </div>











        {/* Left - Text content */}
        <div className="space-y-8  order-2 lg:order-1 ">
          {/* Badge */}
          <div
            className=" inline-flex items-center gap-2 px-4 py-2 rounded-full border border-champagne-700/40 bg-champagne-900/20"
            style={{ transitionDelay: "0.1s" }}
          >
            <Star size={12} className="text-champagne-400 fill-champagne-400" />

            <span className="font-body text-xs text-champagne-300 tracking-[0.2em] uppercase">

              <input type="text"
                value={data?.badge} onChange={(e) => onChange({ ...data, badge: e.target.value })} className={inputCls} />
              {data?.badge}
            </span>
            <Star size={12} className="text-champagne-400 fill-champagne-400" />
          </div>

          {/* Headline */}
          <h1

            className=" font-display text-7xl lg:text-8xl xl:text-9xl font-light leading-[0.9] tracking-tight text-champagne-50"
            style={{ transitionDelay: "0.2s" }}
          >

            {data?.headline}

            <span className="italic gold-shimmer">{data.headlineAccent}</span>
          </h1>

          {/* Subheadline */}
          <p
            className=" font-body text-lg text-champagne-200/60 leading-relaxed max-w-md"

          >
            <textarea
              value={data.subheadline} onChange={(e) => onChange({ ...data, subheadline: e.target.value })} className={inputCls} />
            {data.subheadline}
          </p>

          {/* CTAs */}
          <div
            className=" flex flex-wrap gap-4"
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

          {data.stats.map((stat, i) => (
            <div key={i} className="grid grid-cols-2 gap-3">
              <Field label={`Stat ${i + 1} Value`}><input type="text" value={stat.value} onChange={(e) => { const s = [...data.stats]; s[i] = { ...s[i], value: e.target.value }; onChange({ ...data, stats: s }); }} className={inputCls} /></Field>
              <Field label="Label"><input type="text" value={stat.label} onChange={(e) => { const s = [...data.stats]; s[i] = { ...s[i], label: e.target.value }; onChange({ ...data, stats: s }); }} className={inputCls} /></Field>
            </div>
          ))}
          <div
            className=" grid grid-cols-4 gap-6 pt-6 border-t border-champagne-800/20"
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



      </div>


    </section>
  );
}






function AboutEditor({ data, onChange, uploadImage, uploading }: { data: AboutData; onChange: (d: AboutData) => void; uploadImage: (f: File, cb: (url: string) => void) => void; uploading: boolean }) {



  const [loading, setLoading] = useState(false);

  const DeleteImage = async ({ item, i }: { item: { url: string, publicId: string }, i: number }) => {
    try {

      if (data?.aboutImages.length <= 1) {
        return alert("Can not delete this last Image! Atleat one image should present!");
      }
      setLoading(true)
      const confirmDelete = window.confirm(
        "Do you really want to delete this image?"
      );

      if (!confirmDelete) { return setLoading(false); }
      // first delete from cloudanary . then remove from database 
      await deleteImageFromCloudinary({ collectionName: "about", ImgArrName: "aboutImages", imgItem: item })

      onChange({ ...data, aboutImages: data?.aboutImages.filter((_, j) => j !== i) });
      // console.log({data});


    } catch (err) {
      throw new Error();
    }
    finally {
      setLoading(false)
    }



  }



  const handleImageUpload = async (files: FileList) => {
    setLoading(true)
    try {
      const formData = new FormData();

      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });
      // extra data
      formData.append("collectionName", "about");
      formData.append("ImgArrName", "aboutImages");

      const res = await fetch("/api/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }
      const DATA_ = await res.json()
      console.log({ DATA_ })

      if (DATA_?.images?.length > 0) onChange({ ...data, aboutImages: [...data?.aboutImages, ...DATA_?.images] });

      toast.success("Successfully updated Images!");

    } catch (error) {

      console.error(error);
      
    } finally {
      setLoading(false)
    }
  }

  const fileRef = useRef<HTMLInputElement>(null);

  if (loading) return <Loader />

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6 space-y-5">
        <h3 className="font-display text-lg text-champagne-200">Profile Image</h3>
        {/* <ImageUploader current={data.image} uploading={uploading} onUpload={(url) => onChange({ ...data, image: url })} /> */}


        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
          onChange={(e) => {
            const files = e.target.files;
            if (!files) return;
            handleImageUpload(files);
          }}
        />
        <button onClick={() => fileRef.current?.click()} className="btn-gold px-4 py-2 rounded-lg font-body text-xs flex items-center gap-2">
          <Upload size={13} /> Add Image
        </button>



        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data?.aboutImages?.map((item, i) => (
            <div key={item.url + i} className="space-y-2">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <img src={item.url} className="object-cover" />
                {!loading && <button
                  onClick={() => DeleteImage({ item, i })}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full 
                  flex items-center justify-center hover:bg-red-900"
                >
                  <X size={12} className="text-white" />
                </button>}
              </div>

            </div>
          ))}
        </div>





















      </div>
      <div className="glass-card rounded-2xl p-6 space-y-5">
        <h3 className="font-display text-lg text-champagne-200">Text Content</h3>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Badge"><input type="text" value={data.badge} onChange={(e) => onChange({ ...data, badge: e.target.value })} className={inputCls} /></Field>
          <Field label="Headline"><input type="text" value={data.headline} onChange={(e) => onChange({ ...data, headline: e.target.value })} className={inputCls} /></Field>
        </div>

        <Field label="Years of experience"><input type="number" value={data.experienceYear} onChange={(e) => onChange({ ...data, experienceYear: e.target.value })} className={inputCls} /></Field>

        <Field label="Bio Paragraph 1"><textarea rows={3} value={data.bio} onChange={(e) => onChange({ ...data, bio: e.target.value })} className={inputCls} /></Field>
        <Field label="Bio Paragraph 2"><textarea rows={3} value={data.bio2} onChange={(e) => onChange({ ...data, bio2: e.target.value })} className={inputCls} /></Field>
        <Field label="Signature"><input type="text" value={data.signature} onChange={(e) => onChange({ ...data, signature: e.target.value })} className={inputCls} /></Field>
      </div>
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="font-display text-lg text-champagne-200">Skills</h3>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-3">
          {data.skills.map((skill, i) => (
            <div key={i} className="flex gap-2">
              <input type="text" value={skill} onChange={(e) => { const s = [...data.skills]; s[i] = e.target.value; onChange({ ...data, skills: s }); }} className={inputCls} />
              <button onClick={() => onChange({ ...data, skills: data.skills.filter((_, j) => j !== i) })} className="text-red-400/60 hover:text-red-400"><X size={14} /></button>
            </div>
          ))}
        </div>
        <button onClick={() => onChange({ ...data, skills: [...data.skills, "New Skill"] })} className="btn-outline-gold px-4 py-2 rounded-lg font-body text-xs flex items-center gap-2">
          <Plus size={13} /> Add Skill
        </button>
      </div>
    </div>
  );
}

function ServicesEditor({ data, onChange }: { data: ServicesData; onChange: (d: ServicesData) => void }) {
  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="font-display text-lg text-champagne-200">Section Header</h3>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Badge"><input type="text" value={data.badge} onChange={(e) => onChange({ ...data, badge: e.target.value })} className={inputCls} /></Field>
          <Field label="Headline"><input type="text" value={data.headline} onChange={(e) => onChange({ ...data, headline: e.target.value })} className={inputCls} /></Field>
        </div>
        <Field label="Subheadline"><input type="text" value={data.subheadline} onChange={(e) => onChange({ ...data, subheadline: e.target.value })} className={inputCls} /></Field>
      </div>
      {data.items.map((service, i) => (
        <div key={service.id} className="glass-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg text-champagne-200">Service {i + 1}</h3>
            <button onClick={() => onChange({ ...data, items: data.items.filter((_, j) => j !== i) })} className="text-red-400/60 hover:text-red-400"><Trash2 size={15} /></button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Title"><input type="text" value={service.title} onChange={(e) => { const it = [...data.items]; it[i] = { ...it[i], title: e.target.value }; onChange({ ...data, items: it }); }} className={inputCls} /></Field>
            <Field label="Price"><input type="text" value={service.price} onChange={(e) => { const it = [...data.items]; it[i] = { ...it[i], price: e.target.value }; onChange({ ...data, items: it }); }} className={inputCls} /></Field>
          </div>
          <Field label="Description"><textarea rows={2} value={service.description} onChange={(e) => { const it = [...data.items]; it[i] = { ...it[i], description: e.target.value }; onChange({ ...data, items: it }); }} className={inputCls} /></Field>
          <div>
            <label className="font-body text-xs text-champagne-400/60 tracking-wider uppercase mb-2 block">Features</label>
            <div className="space-y-2">
              {service.features.map((feat, j) => (
                <div key={j} className="flex gap-2">
                  <input type="text" value={feat} onChange={(e) => { const it = [...data.items]; const f = [...it[i].features]; f[j] = e.target.value; it[i] = { ...it[i], features: f }; onChange({ ...data, items: it }); }} className={inputCls} />
                  <button onClick={() => { const it = [...data.items]; it[i] = { ...it[i], features: it[i].features.filter((_, k) => k !== j) }; onChange({ ...data, items: it }); }} className="text-red-400/60 hover:text-red-400"><X size={14} /></button>
                </div>
              ))}
              <button onClick={() => { const it = [...data.items]; it[i] = { ...it[i], features: [...it[i].features, "New feature"] }; onChange({ ...data, items: it }); }} className="btn-outline-gold px-3 py-1.5 rounded-lg font-body text-xs flex items-center gap-1.5">
                <Plus size={12} /> Add Feature
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PortfolioEditor({ data, onChange, uploadImage, uploading }: { data: PortfolioData; onChange: (d: PortfolioData) => void; uploadImage: (f: File, cb: (url: string) => void) => void; uploading: boolean }) {
  const [loading, setLoading] = useState(false);
  console.log(JSON.stringify(data))
  
  
  const handleImageUpload = async (files: FileList) => {
    setLoading(true)
    try {
      const formData = new FormData();

      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });
      // extra data
      formData.append("collectionName", "portfolio");
      formData.append("ImgArrName", "items");

      const res = await fetch("/api/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      };
      const DATA_ = await res.json();
      // console.log({ DATA_ })

      if (DATA_?.images?.length > 0) onChange({ ...data, items: [...data?.items, ...DATA_?.images] });

      toast.success("Successfully updated Images!");

    } catch (error) {

      console.error(error);
     
    } finally {
      setLoading(false)
    }
  }

  const DeleteImage = async ({ item, i }: { item: { url: string, publicId: string }, i: number }) => {
    try {

      if (data?.items.length <= 1) {
        return alert("Can not delete this last Image! Atleat one image should present!");
      };
      setLoading(true);
      const confirmDelete = window.confirm("Do you really want to delete this image?");

      if (!confirmDelete) { return setLoading(false); }
      // first delete from cloudanary . then remove from database 
      await deleteImageFromCloudinary({ collectionName: "portfolio", ImgArrName: "items", imgItem: item });

      onChange({ ...data, items: data?.items.filter((_, j) => j !== i) });
      // console.log({data});


    } catch (err) {
      throw new Error();
    }
    finally {
      setLoading(false)
    }



  };

  const fileRef = useRef<HTMLInputElement>(null);

  if (loading) return <Loader />
  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="font-display text-lg text-champagne-200">Section Header</h3>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Badge"><input type="text" value={data.badge} onChange={(e) => onChange({ ...data, badge: e.target.value })} className={inputCls} /></Field>
          <Field label="Headline"><input type="text" value={data.headline} onChange={(e) => onChange({ ...data, headline: e.target.value })} className={inputCls} /></Field>
        </div>
        <Field label="Subheadline"><input type="text" value={data.subheadline} onChange={(e) => onChange({ ...data, subheadline: e.target.value })} className={inputCls} /></Field>
      </div>
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg text-champagne-200">Portfolio Images ({data.items.length})</h3>


          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
            onChange={(e) => {
              const files = e.target.files;
              if (!files) return;
              handleImageUpload(files);
            }}
          />
          <button onClick={() => fileRef.current?.click()} className="btn-gold px-4 py-2 rounded-lg font-body text-xs flex items-center gap-2">
            <Upload size={13} /> Add Images
          </button>
        </div>
        <div className="grid grid-cols-2  gap-4">
          {data.items.map((item, i) => (
            <div key={item.id} className="space-y-2">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image src={item.image.url} alt={item.title} fill className="object-cover" />
                {!loading && <button
                  onClick={() => DeleteImage({ item: item.image, i })}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full 
                  flex items-center justify-center hover:bg-red-900"
                >
                  <X size={12} className="text-white" />
                </button>}
              </div>
              <input type="text" value={item.title} onChange={(e) => { const it = [...data.items]; it[i] = { ...it[i], title: e.target.value }; onChange({ ...data, items: it }); }} className={`${inputCls} text-xs py-2`} placeholder="Title" />
              <select value={item.category} onChange={(e) => { const it = [...data.items]; it[i] = { ...it[i], category: e.target.value }; onChange({ ...data, items: it }); }} className={`${inputCls} text-xs py-2`}>
                {data.categories.map((cat) => <option key={cat}>{cat === "All" ? "" : cat}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TestimonialsEditor({ data, onChange, uploadImage, uploading }: { data: SiteData["testimonials"]; onChange: (d: SiteData["testimonials"]) => void; uploadImage: (f: File, cb: (url: string) => void) => void; uploading: boolean }) {
  return (
    <div className="space-y-6">
      {data.items.map((item, i) => (
        <div key={item.id} className="glass-card rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-lg text-champagne-200">Review from {item.name}</h3>
            <button onClick={() => onChange({ ...data, items: data.items.filter((_, j) => j !== i) })} className="text-red-400/60 hover:text-red-400"><Trash2 size={15} /></button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name"><input type="text" value={item.name} onChange={(e) => { const it = [...data.items]; it[i] = { ...it[i], name: e.target.value }; onChange({ ...data, items: it }); }} className={inputCls} /></Field>
            <Field label="Role"><input type="text" value={item.role} onChange={(e) => { const it = [...data.items]; it[i] = { ...it[i], role: e.target.value }; onChange({ ...data, items: it }); }} className={inputCls} /></Field>
          </div>
          <Field label="Review Text"><textarea rows={3} value={item.text} onChange={(e) => { const it = [...data.items]; it[i] = { ...it[i], text: e.target.value }; onChange({ ...data, items: it }); }} className={inputCls} /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Date"><input type="text" value={item.date} onChange={(e) => { const it = [...data.items]; it[i] = { ...it[i], date: e.target.value }; onChange({ ...data, items: it }); }} className={inputCls} /></Field>
            <Field label="Photo URL"><input type="url" value={item.image} onChange={(e) => { const it = [...data.items]; it[i] = { ...it[i], image: e.target.value }; onChange({ ...data, items: it }); }} className={inputCls} /></Field>
          </div>
        </div>
      ))}
      <button onClick={() => onChange({ ...data, items: [...data.items, { id: Date.now().toString(), name: "New Client", role: "Client", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200", text: "Amazing experience!", rating: 5, date: "2025" }] })} className="btn-outline-gold w-full px-4 py-3 rounded-xl font-body text-sm flex items-center justify-center gap-2">
        <Plus size={15} /> Add Review
      </button>
    </div>
  );
}

function ContactEditor({ data, onChange }: { data: ContactData; onChange: (d: ContactData) => void }) {
  return (
    <div className="glass-card rounded-2xl p-6 space-y-5">
      <h3 className="font-display text-lg text-champagne-200">Contact Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Email"><input type="email" value={data.email} onChange={(e) => onChange({ ...data, email: e.target.value })} className={inputCls} /></Field>
        <Field label="Phone"><input type="text" value={data.phone} onChange={(e) => onChange({ ...data, phone: e.target.value })} className={inputCls} /></Field>
        <Field label="Location"><input type="text" value={data.location} onChange={(e) => onChange({ ...data, location: e.target.value })} className={inputCls} /></Field>
        <Field label="Instagram"><input type="text" value={data.instagram} onChange={(e) => onChange({ ...data, instagram: e.target.value })} className={inputCls} /></Field>
      </div>
      <Field label="Headline"><input type="text" value={data.headline} onChange={(e) => onChange({ ...data, headline: e.target.value })} className={inputCls} /></Field>
      <Field label="Subheadline"><input type="text" value={data.subheadline} onChange={(e) => onChange({ ...data, subheadline: e.target.value })} className={inputCls} /></Field>
      <Field label="Availability Notice"><textarea rows={2} value={data.availability} onChange={(e) => onChange({ ...data, availability: e.target.value })} className={inputCls} /></Field>
    </div>
  );
}

function SEOEditor({ data, onChange }: { data: SiteData["seo"]; onChange: (d: SiteData["seo"]) => void }) {
  return (
    <div className="glass-card rounded-2xl p-6 space-y-5">
      <h3 className="font-display text-lg text-champagne-200">SEO & Meta Tags</h3>
      <Field label="Page Title"><input type="text" value={data.title} onChange={(e) => onChange({ ...data, title: e.target.value })} className={inputCls} /></Field>
      <Field label="Meta Description"><textarea rows={3} value={data.description} onChange={(e) => onChange({ ...data, description: e.target.value })} className={inputCls} /></Field>
      <Field label="Keywords (comma separated)"><input type="text" value={data.keywords} onChange={(e) => onChange({ ...data, keywords: e.target.value })} className={inputCls} /></Field>
    </div>
  );
}

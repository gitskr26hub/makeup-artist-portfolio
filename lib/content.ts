// import { getContentRepo } from "@/repositories/admin.repository";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "lib", "site-data.json");
// const DATA_FILE = getContentRepo();
export type timeStamp = string;
export type firstName = string;
export type lastName = string;


export type SiteData = {
  timeStamp: timeStamp;
  firstName: firstName;
  lastName: lastName;

  hero: HeroData;
  about: AboutData;
  services: ServicesData;
  portfolio: PortfolioData;
  testimonials: TestimonialsData;
  contact: ContactData;
  seo: SEOData;
};


export type heroImage = {
  url: string,
  publicId: string
}

export type aboutImages = {
  url: string,
  publicId: string
}







export type HeroData = {
  badge: string;
  headline: string;
  headlineAccent: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  heroImage: Array<heroImage>;
  stats: Array<{ value: string; label: string }>;
};

export type AboutData = {
  badge: string;
  profession: string;
  experienceYear: string;
  headline: string;
  bio: string;
  bio2: string;
  aboutImages: Array<aboutImages>;
  skills: string[];
  signature: string;
};

export type ServiceItem = {
  id: string;
  icon: string;
  title: string;
  description: string;
  price: string;
  features: string[];
};

export type ServicesData = {
  badge: string;
  headline: string;
  subheadline: string;
  items: ServiceItem[];
};


export type portfolioImage = {
  url: string,
  publicId: string
};

export type PortfolioItem = {
  id: string;
  category: string;
  title: string;
  image: portfolioImage;
};

export type PortfolioData = {
  badge: string;
  headline: string;
  subheadline: string;
  categories: string[];
  items: PortfolioItem[];
};

export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  image: string;
  text: string;
  rating: number;
  date: string;
};

export type TestimonialsData = {
  badge: string;
  headline: string;
  items: TestimonialItem[];
};

export type ContactData = {
  badge: string;
  firstName: string;
  lastName: string;
  headline: string;
  subheadline: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  instagram: string;
  availability: string;
};

export type SEOData = {
  title: string;
  description: string;
  keywords: string;
};

export function getSiteData(): SiteData {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as SiteData;
  } catch {
    throw new Error("Failed to read site data");
  }
}

export function saveSiteData(data: Partial<SiteData>): void {
  try {
    const current = getSiteData();
    const updated = { ...current, ...data };
    fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch {
    throw new Error("Failed to save site data");
  }
}

export function updateSection<K extends keyof SiteData>(
  section: K,
  data: SiteData[K]
): void {
  const current = getSiteData();
  current[section] = data;
  fs.writeFileSync(DATA_FILE, JSON.stringify(current, null, 2), "utf-8");
}

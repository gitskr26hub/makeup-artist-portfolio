import type { Metadata } from "next";
import "./globals.css";
import { getSiteData } from "@/lib/content";
import { Toaster } from "react-hot-toast";


export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = getSiteData();
    return {
      title: data.seo.title,
      description: data.seo.description,
      keywords: data.seo.keywords,
      icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/favicon.ico",
      },
      openGraph: {
        title: data.seo.title,
        description: data.seo.description,
        type: "website",
      },
    };
  } catch {
    return {
      title: "Mehndi Designer | Makeup Artist",
      description: "Professional makeup artistry for weddings, editorial, film & fashion.",
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="grain">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#141414",
              color: "#f9f1e1",
              border: "1px solid rgba(200,146,44,0.3)",
            },
          }}
        />
      </body>
    </html>
  );
}

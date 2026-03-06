# 💄 Makeup Artist Website

A professional, fully-editable Next.js website for makeup artists with Cloudinary image storage, a built-in CMS admin panel, and one-click Vercel deployment.

## ✨ Features

- **Stunning Design** — Obsidian + champagne gold luxury aesthetic with smooth animations
- **Fully Editable CMS** — Admin panel to edit all text, images, services, portfolio, testimonials & SEO
- **Cloudinary Integration** — Professional image storage, optimization & CDN delivery
- **Portfolio Gallery** — Filterable masonry grid with lightbox viewer
- **Contact Form** — Inquiry form with service selection
- **Mobile Responsive** — Perfect on all screen sizes
- **SEO Ready** — Dynamic meta tags, Open Graph, structured data
- **Vercel Optimized** — Edge-ready, fast builds

## 📁 Project Structure

```
glamour-studio/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout + SEO
│   ├── globals.css           # Global styles
│   ├── admin/
│   │   ├── page.tsx          # Admin login
│   │   └── dashboard/        # CMS dashboard
│   └── api/
│       ├── auth/             # Login/logout endpoints
│       ├── content/          # Save content endpoint
│       └── upload/           # Cloudinary upload endpoint
├── components/
│   ├── sections/             # All page sections
│   └── admin/                # Admin UI components
├── lib/
│   ├── site-data.json        # 📝 ALL site content (edit this!)
│   ├── content.ts            # Content read/write utilities
│   ├── cloudinary.ts         # Image upload helpers
│   └── auth.ts               # Admin authentication
└── middleware.ts             # Route protection
```

---

## 🔒 Security Notes

- Admin route is protected by JWT cookie (24h expiry)
- All API routes verify admin authentication
- Change default credentials in `.env.local` before deploying
- Keep `.env.local` out of version control (it's in `.gitignore`)

---

## 📸 Image Recommendations

For best results, use images:
- **Hero**: 900×1200px portrait (3:4 ratio)
- **About**: 600×750px portrait
- **Portfolio**: 600×600px or 600×800px
- **Testimonials**: 200×200px square (profile photos)



---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 14 | React framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Cloudinary | Image storage & CDN |
| Framer Motion | Animations |
| Vercel | Hosting & deployment |
| JWT | Admin authentication |

---



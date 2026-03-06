# 💄 Glamour Studio — Luxury Makeup Artist Website

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

---

## 🚀 Quick Deploy

### 1. Clone & Install
```bash
git clone <your-repo>
cd glamour-studio
npm install
```

### 2. Set Up Cloudinary
1. Create free account at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard → copy your **Cloud Name**, **API Key**, **API Secret**

### 3. Configure Environment Variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
# Cloudinary (from your dashboard)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your_api_secret_here

# Admin login credentials (CHANGE THESE!)
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=YourSecurePassword123!

# Security keys (generate random strings)
JWT_SECRET=your_random_32_char_string_here
NEXTAUTH_SECRET=another_random_32_char_string
NEXTAUTH_URL=http://localhost:3000
```

> **Generate secrets**: Run `openssl rand -base64 32` in terminal

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🌐 Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Add environment variables (same as `.env.local` but without `NEXTAUTH_URL`)
5. Set `NEXTAUTH_URL` = `https://your-domain.vercel.app`
6. Click **Deploy** 🎉

### Option B: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```
Follow prompts and add environment variables when asked.

---

## 🎨 Customizing Your Site

### Through Admin Panel (`/admin`)
Log in with your admin credentials and edit:
- **Hero** — Main image, headline, CTA buttons, stats
- **About** — Profile photo, bio, skills
- **Services** — All service cards, pricing, features
- **Portfolio** — Upload/remove images, set categories
- **Reviews** — Add/edit client testimonials
- **Contact** — Email, phone, social links
- **SEO** — Title, meta description, keywords

### Content File
All content is stored in `/lib/site-data.json` — you can edit this directly.

### Branding
- Colors: Edit `tailwind.config.ts` (`champagne` and `obsidian` color scales)
- Fonts: Edit the Google Fonts import in `app/globals.css`
- Artist name: Update throughout `lib/site-data.json`

---

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

Cloudinary automatically optimizes and serves images via CDN.

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

Built with ❤️ for makeup artists everywhere.

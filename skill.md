# Skill Boundaries & Guidelines

## Project: Adv. Krupal Savjani Portfolio Website

### Theme Colors
- Primary Gold: #EAB308 (yellow-500)
- Background Light: #FFFFFF
- Background Dark: #0F172A (slate-900)
- Accent: #1E293B (slate-800)
- Text Primary: #0F172A
- Text Muted: #64748B (slate-500)
- Border: #E2E8F0 (slate-200)

### Typography
- Font: Inter (Google Fonts)
- Headings: Bold, tracked wide
- Body: Regular weight, relaxed leading

### Required Skills & Tech
- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- shadcn/ui component library
- Convex DB (real-time database)
- framer-motion (animations)
- lucide-react (icons)

### Component Boundaries
- All UI components go in `/components/ui/`
- Page-level components go in `/components/`
- Convex schema & mutations in `/convex/`
- All pages use App Router (`/app/`)

### Design Principles
- Minimalist, professional aesthetic
- Gold (#EAB308) as accent color
- Clean typography with wide letter-spacing
- Smooth animations with framer-motion
- Fully responsive (mobile-first)
- Accessible (ARIA labels, semantic HTML)

### Content Restrictions
- Do NOT provide legal advice
- Always include legal disclaimer
- Professional tone only
- Images should be law-related (courtrooms, justice, scales)

### Pages
1. `/` — Home (Hero + Services Slideshow + About snippet)
2. `/contact` — Contact page with form
3. `/blog` — Blog listing (structure only)
4. `/not-found` — 404 page with animation

### Terms & Conditions
- Users must accept T&C modal before accessing the site
- T&C stored in localStorage after acceptance
- Legal disclaimer included in T&C

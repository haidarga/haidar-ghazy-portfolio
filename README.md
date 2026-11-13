# Portofolio Personal — Haidar Ghazy Arkan

Website portofolio single-page berbasis Next.js 14 (static export), Tailwind CSS, GSAP ScrollTrigger, Lenis, dan Motion (`motion/react`). Dibangun untuk memperkenalkan profil, studi kasus berbasis data, sistem produksi AI (`CAKETING`, `CakVisual`, `CakAI Pro`), galeri karya lintas 6 brand, karya film/motion (`Craft`), perjalanan karier, perangkat kerja, dan kontak rekrutmen dalam satu alur scroll storytelling.

## Struktur Folder Utama

- `app/` — Root layout (`app/layout.tsx`), global design tokens (`app/globals.css`), favicon SVG (`app/icon.svg`), dan entry page (`app/page.tsx`).
- `components/` — Seluruh section interaktif (`HeroSection`, `ProofStrip`, `CaseStudiesSection`, `SystemsSection`, `WorkGallerySection`, `GalleryLightbox`, `CraftSection`, `TimelineSection`, `SkillsSection`, `AboutSection`, `ContactFooter`, `Navbar`, `IntroLoader`, `CustomCursor`, `AppProviders`).
- `content/` — Satu sumber data bilingual (`ID` default / `EN`) terstruktur per modul:
  - `content/site-data.ts`: identitas, hero copy, angka kunci, proof strip, about, kontak, serta daftar `[ISI: ...]`.
  - `content/case-studies.ts`: 3 studi kasus (`OPPO Diologtech`, `Cak Investment Club`, `AceKid / Syailendra / Golden Rama / Rahasia Beauty`).
  - `content/systems.ts`: data dan alur diagram `CAKETING`, `CakVisual`, dan `CakAI Pro`.
  - `content/gallery.ts`: 19 item karya video AI dan slideshow lintas 6 brand.
  - `content/craft.ts`: 8 proyek film, dokumenter pendek, animasi 3D, visual mapping + 3 penghargaan.
  - `content/experience.ts`: 5 pengalaman kerja kronologis.
  - `content/skills.ts`: 4 kelompok perangkat dan keahlian yang terhubung ke proyek nyata.
- `public/assets/` — Aset gambar WebP yang sudah dioptimasi & dibersihkan dari data privat, serta PDF CV.
- `ASSET-INVENTORY.md`, `LINKS.md`, `PLAN.md`, `DESIGN-DIRECTION.md` — Dokumentasi discovery dan desain proyek.

## Menjalankan Secara Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Build Static Export (`out/`)

```bash
npm run build
npx tsc --noEmit
```

Output siap deploy berada di folder `out/`.

## Deploy ke Vercel atau Cloudflare Pages

### Vercel
1. Hubungkan repositori atau jalankan `npx vercel --prod`.
2. Build command: `npm run build`
3. Output directory: `out`

### Cloudflare Pages
1. Buat project Pages baru.
2. Build command: `npm run build`
3. Build output directory: `out`

## Cara Mengubah Data Konten & Menutup Item `[ISI: ...]`

1. **Teks & Angka Studi Kasus / Profil:** edit file terkait di dalam `content/*.ts` (setiap entri memiliki properti `{ id: '...', en: '...' }`).
2. **Checklist `[ISI: ...]`:** daftar item yang menunggu konfirmasi final berada di `content/site-data.ts` (`missingDataChecklist`) dan bisa langsung ditinjau di bagian bawah footer website sebelum publish.
3. **Domain Produksi:** perbarui `SITE_URL` di `app/layout.tsx`, `public/sitemap.xml`, dan `public/robots.txt` sebelum go-live ke domain final.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Next.js 16 — read the bundled docs first

This repo runs **Next.js 16.2.7**, which has breaking changes versus older versions you may know. Before writing or changing Next.js code, read the relevant guide under `node_modules/next/dist/docs/` (`01-app/` for the App Router, which this project uses). The docs contain version-specific behavior and AI-agent hints — e.g. fixing slow client-side navigation requires exporting `unstable_instant` from the route, not just wrapping in Suspense. Do not assume conventions from memory.

## Commands

This project uses **pnpm** (note `pnpm-workspace.yaml` and `pnpm-lock.yaml`; there is no `package-lock.json`).

- `pnpm dev` — start the dev server at http://localhost:3000
- `pnpm build` — production build
- `pnpm start` — serve the production build
- `pnpm lint` — run ESLint (flat config in `eslint.config.mjs`)

There is no test runner configured.

## Architecture

A single-page marketing site for **SHM**, a lashes & nails salon in Villeurbanne (Lyon). The UI is split into a thin page that composes section/helper components:

- `app/layout.tsx` — root layout. Loads Geist, Geist Mono, and Playfair Display via `next/font/google`, exposing them as CSS variables (`--font-geist-sans`, `--font-geist-mono`, `--font-playfair`) on `<html>`. Holds the page `metadata`.
- `app/page.tsx` — the `'use client'` page shell. Owns the two pieces of shared state (`isLoading`, and `activeCategory`, lifted so `SiteMenu` and `ServicesSection` stay in sync) and composes the components below.
- `app/components/` — one file per piece. Sections: `hero-section`, `services-section`, `info-section`, `cta-section`, `site-footer`, `site-menu`. Effects/helpers: `scene-3d` (WebGL background), `loader`, `custom-cursor`, `floating-particles`, `magnetic-button`. All are `'use client'` except `site-footer` (static). Each imports its data from `lib/content.ts`.
- `lib/content.ts` — all static content and its types: `services`, `categories` (with per-category `icon`/colors), `reviews`, `openingHours`, `HERO_IMAGES`, and the Planity booking URL (`PLANITY_URL`). The `SiteMenu` nav is derived from `categories`, not duplicated. No `'use client'` — safe to import from server or client components.

Key libraries and where they're used:
- **@react-three/fiber + three + @react-three/drei** — 3D/WebGL background visuals (`Canvas`, `useFrame`, `useLoader`) in `app/components/scene-3d.tsx`.
- **framer-motion** — scroll and entrance animations (`useScroll`, `useTransform`, `motion`, `AnimatePresence`) across the section components.
- **lucide-react** — icons.

Styling is **Tailwind CSS v4** via the PostCSS plugin (`postcss.config.mjs`); global styles and theme live in `app/globals.css` (no `tailwind.config` file).

`@/*` is aliased to the repo root (`tsconfig.json`). Site photography is served locally from `public/`; configure `images.remotePatterns` in `next.config.ts` before adding remote sources to `next/image`.

# The First System — Website

A bilingual (English / Arabic, with full RTL) marketing website for **The First System (TFS)** — exclusive agent for PROTECTIVE COATINGS Concepts in Saudi Arabia. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

## Pages

| Route | Description |
| --- | --- |
| `/` | Redirects to default locale based on `Accept-Language` |
| `/[locale]` | **Home** — hero, intro, values, services grid, sample CTA, partners, newsletter |
| `/[locale]/about` | **About** — story, stats, values, CTA |
| `/[locale]/services` | **Services** — 10 systems, 4-step process, sample request form |
| `/[locale]/products` | **Products** — 5 categories, technical documents CTA |
| `/[locale]/brands` | **Brands** — 6 partner brand cards (with exclusive badge for CCC) |
| `/[locale]/contact` | **Contact** — 3 office cards, full form, animated SVG coverage map |

Where `[locale]` is `en` or `ar`.

## Highlights

- **Two languages**, switchable from the header (`Globe` toggle).
- **Right-to-left layout** for Arabic, with logical CSS properties (`start`/`end`) so the entire UI mirrors automatically.
- **Bilingual fonts**: Inter + Space Grotesk (Latin) and IBM Plex Sans Arabic.
- **Dark, editorial palette** — charcoal surfaces with a refined gold accent (`#d6a86b`).
- **No heavy client JS** — all pages are server-rendered/SSG'd; only forms and the header are `"use client"`.
- **Locale-aware metadata** with `alternates.languages` pointing each page to its other-language counterpart.
- **Middleware-based locale detection** (`Accept-Language`) for first visit.

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              Root passthrough
│   ├── page.tsx                Redirect to /[defaultLocale]
│   ├── not-found.tsx
│   ├── globals.css             Tailwind v4 + theme tokens + utilities
│   └── [locale]/
│       ├── layout.tsx          HTML lang/dir, Header + Footer
│       ├── page.tsx            Home
│       ├── about/page.tsx
│       ├── services/page.tsx
│       ├── products/page.tsx
│       ├── brands/page.tsx
│       └── contact/page.tsx
├── components/
│   ├── Header.tsx              Sticky, responsive, mobile drawer, locale switch
│   ├── Footer.tsx              4-column footer with HQ, links, support
│   ├── Logo.tsx                Inline SVG mark
│   ├── Icon.tsx                Inline SVG icon set (no external deps)
│   ├── Section.tsx             Section + SectionHeader primitives
│   ├── Button.tsx              Polymorphic link/button with variants
│   ├── Card.tsx
│   ├── PageHero.tsx            Reusable page-hero block
│   ├── NewsletterForm.tsx
│   ├── SampleRequestForm.tsx   Used on /services and /contact
│   └── WhatsAppFab.tsx
└── i18n/
    ├── config.ts               locales, dir, htmlLang
    ├── getDictionary.ts
    └── dictionaries/
        ├── types.ts            Shared Dictionary interface
        ├── en.ts               English content
        └── ar.ts               Arabic content
```

## Adding / Editing Copy

All copy lives in `src/i18n/dictionaries/en.ts` and `src/i18n/dictionaries/ar.ts`. The shape is enforced by `types.ts`, so adding a field to one locale will produce a TypeScript error on the other until both are updated.

## Branding Tokens

| Token | Value |
| --- | --- |
| `--color-bg` | `#05070c` |
| `--color-surface` | `#0a0d14` |
| `--color-fg` | `#e6ebf2` |
| `--color-accent` | `#00bd3a` (vibrant green) |
| `--color-accent-2` | `#8e9aa8` (cool silver-gray) |

Update them in `src/app/globals.css` to rebrand globally.

## Notes on RTL

- The layout uses **logical properties** (`me-`, `ms-`, `ps-`, `pe-`, `start-*`, `end-*`) throughout, so RTL flips automatically.
- Phone numbers and emails are wrapped in `dir="ltr"` to preserve their reading direction inside Arabic paragraphs.
- The directional arrow icon switches between `ArrowRight` and `ArrowLeft` based on locale where appropriate.

## License

© 2026 The First System.

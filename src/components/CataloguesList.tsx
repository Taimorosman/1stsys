"use client";

import * as React from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { Icon } from "./Icon";
import { cataloguesData, type CatalogueItem } from "@/i18n/cataloguesData";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

type CategoryFilter = "all" | "ccc" | "pavecrete" | "topcrete" | "specialized";

export function CataloguesList({ locale, dict }: Props) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<CategoryFilter>("all");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get("category");
      if (catParam) {
        const validCategories: CategoryFilter[] = ["ccc", "pavecrete", "topcrete", "specialized"];
        if (validCategories.includes(catParam as CategoryFilter)) {
          setSelectedCategory(catParam as CategoryFilter);
        }
      }
    }
  }, []);

  const t = dict.catalogues;
  const isAr = locale === "ar";

  // Filter logic
  const filteredCatalogues = cataloguesData.filter((item) => {
    // Category match
    const categoryMatch = selectedCategory === "all" || item.category === selectedCategory;

    // Search query match
    const query = searchQuery.toLowerCase().trim();
    if (!query) return categoryMatch;

    const titleEn = item.en.title.toLowerCase();
    const titleAr = item.ar.title.toLowerCase();
    const subtitleEn = item.en.subtitle.toLowerCase();
    const subtitleAr = item.ar.subtitle.toLowerCase();
    const filename = item.filename.toLowerCase();

    const searchMatch =
      titleEn.includes(query) ||
      titleAr.includes(query) ||
      subtitleEn.includes(query) ||
      subtitleAr.includes(query) ||
      filename.includes(query);

    return categoryMatch && searchMatch;
  });

  const categories: { value: CategoryFilter; label: string }[] = [
    { value: "all", label: t.categories.all },
    { value: "ccc", label: t.categories.ccc },
    { value: "pavecrete", label: t.categories.pavecrete },
    { value: "topcrete", label: t.categories.topcrete },
    { value: "specialized", label: t.categories.specialized },
  ];

  // Helper to get localized badge for category
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "ccc":
        return t.categories.ccc;
      case "pavecrete":
        return t.categories.pavecrete;
      case "topcrete":
        return t.categories.topcrete;
      case "specialized":
        return t.categories.specialized;
      default:
        return "";
    }
  };

  const renderTitle = (title: string) => {
    if (title.includes("\n")) {
      const parts = title.split("\n");
      return (
        <span className="flex flex-col items-center">
          <span>{parts[0]}</span>
          {parts.slice(1).map((part, index) => (
            <span key={index} className="font-normal text-[10px] text-[var(--color-fg-subtle)] tracking-widest mt-1 uppercase leading-normal">
              {part}
            </span>
          ))}
        </span>
      );
    }
    return title;
  };

  const renderDocPreview = (item: CatalogueItem) => {
    const filenameLower = item.filename.toLowerCase();
    const isColorChart =
      filenameLower.includes("color chart") || filenameLower.includes("color palette");
    const isMatsOrAggregates =
      filenameLower.includes("texturing mats") ||
      filenameLower.includes("deco aggregates") ||
      filenameLower.includes("terrazzo");
    const isTds =
      item.filename.startsWith("TopCrete") ||
      item.filename.startsWith("ArtCrete") ||
      item.filename.startsWith("InsuCrete");

    if (isColorChart) {
      // Color swatches chart mockup
      const colors = [
        { name: "Terracotta", hex: "#c05a46" },
        { name: "Slate Gray", hex: "#5a6b7c" },
        { name: "Desert Gold", hex: "#d1a153" },
        { name: "Sandstone", hex: "#d8c3a5" },
        { name: "Charcoal", hex: "#2d3135" },
        { name: "Olive Green", hex: "#6b7c5a" },
        { name: "Brick Red", hex: "#9e3d2d" },
        { name: "Sand Beige", hex: "#bca88a" },
      ];
      return (
        <div className="flex flex-col gap-4 p-5 transition-transform duration-[8000ms] ease-linear group-hover:-translate-y-[50%]">
          <div className="flex items-center gap-2 border-b border-[var(--color-fg)]/20 pb-3">
            <div className="h-2 w-10 bg-[var(--color-accent)] rounded" />
            <span className="text-[9px] font-mono text-[var(--color-accent)] uppercase">COLOR CHART SPECIFICATION</span>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {colors.map((c) => (
              <div key={c.name} className="flex items-center gap-2 border border-[var(--color-border)]/50 rounded p-1.5 bg-[var(--color-bg)]/40">
                <div className="h-6 w-6 rounded shrink-0 border border-[var(--color-border)]/40" style={{ backgroundColor: c.hex, opacity: 0.8 }} />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-semibold text-[var(--color-fg)] leading-none">{c.name}</span>
                  <span className="text-[7px] font-mono text-[var(--color-fg-subtle)] leading-none">{c.hex}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 border border-dashed border-[var(--color-accent)]/20 rounded p-2 text-center text-[8px] font-mono text-[var(--color-accent)]">
            OFFICIAL COLOR SPECS SECTION
          </div>
        </div>
      );
    }

    if (isMatsOrAggregates) {
      // Aggregate/mats grid mockup
      return (
        <div className="flex flex-col gap-4 p-5 transition-transform duration-[8000ms] ease-linear group-hover:-translate-y-[50%]">
          <div className="flex items-center gap-2 border-b border-[var(--color-fg)]/20 pb-3">
            <div className="h-2 w-10 bg-[var(--color-accent)] rounded" />
            <span className="text-[9px] font-mono text-[var(--color-accent)] uppercase">PATTERNS & COATINGS</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center justify-center border border-[var(--color-border)]/50 rounded-lg p-2 bg-[var(--color-bg)]/40 aspect-square">
                {/* Visual texture shape */}
                <div className="h-6 w-6 rounded-full border border-dashed border-[var(--color-accent)]/40 flex items-center justify-center text-[10px] text-[var(--color-accent)] font-mono">
                  {i % 2 === 0 ? "▤" : "●"}
                </div>
                <span className="text-[7px] font-mono text-[var(--color-fg-subtle)] mt-1.5">Mould {i}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 text-[8px] font-mono text-[var(--color-fg-subtle)] leading-relaxed">
            * Decorative aggregate options include size 3-6mm and stamped concrete templates.
          </div>
        </div>
      );
    }

    if (isTds) {
      // Technical specs datasheet mockup
      const specsMap: Record<string, { label: string; val: string }[]> = {
        "TopCrete 220": [
          { label: "Compressive Strength", val: "70 MPa" },
          { label: "Mohs Hardness", val: "7" },
          { label: "Cure Time (Full)", val: "28 days" },
          { label: "Application Rate", val: "5 kg/m²" },
        ],
        "TopCrete 700": [
          { label: "Compressive Strength", val: "55 MPa" },
          { label: "Flexural Strength", val: "8.5 MPa" },
          { label: "Layer Thickness", val: "10-40 mm" },
          { label: "Adhesion Strength", val: "1.5 MPa" },
        ],
        "TopCrete 711": [
          { label: "Flowability", val: "Self-Leveling" },
          { label: "Working Time", val: "30 mins" },
          { label: "Foot Traffic", val: "4 hours" },
          { label: "Compressive", val: "45 MPa" },
        ],
        "InsuCrete ST": [
          { label: "Density", val: "350 kg/m³" },
          { label: "Thermal Cond.", val: "0.08 W/mK" },
          { label: "Fire Rating", val: "Class A1" },
          { label: "Acoustic Atten.", val: "22 dB" },
        ],
        default: [
          { label: "Active Chemistry", val: "Acrylic polymer" },
          { label: "Solid Content", val: "22%" },
          { label: "Drying Time", val: "2-4 hours" },
          { label: "Coverage Rate", val: "6-8 m²/L" },
        ],
      };

      const key = Object.keys(specsMap).find((k) => item.filename.startsWith(k)) || "default";
      const specs = specsMap[key];

      return (
        <div className="flex flex-col gap-4 p-5 transition-transform duration-[8000ms] ease-linear group-hover:-translate-y-[55%]">
          <div className="flex items-center justify-between border-b border-[var(--color-fg)]/20 pb-3">
            <span className="text-[9px] font-mono text-[var(--color-accent)] uppercase">TECHNICAL DATASHEET (TDS)</span>
            <div className="h-1.5 w-8 bg-[var(--color-fg)]/30 rounded" />
          </div>
          
          <div className="mt-1 space-y-1.5">
            <div className="h-4 w-40 bg-[var(--color-fg)]/10 rounded font-semibold text-[9px] text-[var(--color-fg)] flex items-center px-1">PRODUCT SPECIFICATIONS</div>
            <div className="border border-[var(--color-border)]/50 rounded-lg overflow-hidden bg-[var(--color-bg)]/40 text-[8px] font-mono">
              {specs.map((s, idx) => (
                <div key={idx} className="flex justify-between border-b border-[var(--color-border)]/20 p-2 last:border-b-0">
                  <span className="text-[var(--color-fg-muted)]">{s.label}</span>
                  <span className="text-[var(--color-accent)] font-semibold">{s.val}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-3 flex flex-col gap-1.5">
            <span className="text-[8px] font-bold text-[var(--color-fg)]">APPLICATION PROCEDURE</span>
            <div className="h-1 w-full bg-[var(--color-fg)]/10 rounded" />
            <div className="h-1 w-11/12 bg-[var(--color-fg)]/10 rounded" />
            <div className="h-1 w-5/6 bg-[var(--color-fg)]/10 rounded" />
          </div>
        </div>
      );
    }

    // Default Brochure layout (CCC / PaveCrete general files)
    return (
      <div className="flex flex-col gap-4 p-5 transition-transform duration-[8000ms] ease-linear group-hover:-translate-y-[55%]">
        <div className="flex items-center gap-2 border-b border-[var(--color-fg)]/20 pb-3">
          <div className="h-2 w-10 bg-[var(--color-accent)] rounded" />
          <span className="text-[9px] font-mono text-[var(--color-accent)] uppercase">PRODUCT BROCHURE</span>
        </div>
        
        <div className="flex flex-col gap-1 mt-1">
          <div className="h-5 w-5/6 bg-[var(--color-fg)] rounded font-semibold text-[10px] flex items-center text-[var(--color-fg)] px-1 uppercase leading-none">{item.filename.split(".")[0]}</div>
          <div className="h-3 w-1/3 bg-[var(--color-fg)]/30 rounded mt-1" />
        </div>

        <div className="mt-3 space-y-2">
          <div className="h-1.5 w-full bg-[var(--color-fg)]/10 rounded" />
          <div className="h-1.5 w-full bg-[var(--color-fg)]/10 rounded" />
          <div className="h-1.5 w-4/5 bg-[var(--color-fg)]/10 rounded" />
        </div>

        <div className="mt-3 flex flex-col gap-2">
          <div className="h-2.5 w-24 bg-[var(--color-accent)]/20 rounded" />
          <ul className="space-y-1.5">
            <li className="flex items-center gap-2">
              <div className="h-1 w-1.5 rounded-full bg-[var(--color-accent)]" />
              <div className="h-1.5 w-3/4 bg-[var(--color-fg)]/10 rounded" />
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1 w-1.5 rounded-full bg-[var(--color-accent)]" />
              <div className="h-1.5 w-5/6 bg-[var(--color-fg)]/10 rounded" />
            </li>
            <li className="flex items-center gap-2">
              <div className="h-1 w-1.5 rounded-full bg-[var(--color-accent)]" />
              <div className="h-1.5 w-2/3 bg-[var(--color-fg)]/10 rounded" />
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* Search and Filters panel */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-[var(--color-border)] pb-8 mb-10">
        {/* Category Pills (horizontal scrollable on mobile) */}
        <div className="flex overflow-x-auto gap-2 order-2 md:order-1 max-w-full pb-3 md:pb-0 scrollbar-none sm:flex-wrap">
          {categories.map((cat) => {
            const active = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all duration-300 border shrink-0 ${
                  active
                    ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-black shadow-lg shadow-[var(--color-accent)]/10"
                    : "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-fg-muted)] hover:border-[var(--color-accent-green)]/60 hover:text-[var(--color-fg)]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-sm order-1 md:order-2">
          <Icon
            name="Search"
            size={16}
            className="absolute start-4 top-1/2 -translate-y-1/2 text-[var(--color-fg-subtle)]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="h-11 w-full rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] pe-4 ps-11 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-muted)] focus:border-[var(--color-accent)]/50 focus:outline-none transition-colors duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute end-4 top-1/2 -translate-y-1/2 text-[var(--color-fg-subtle)] hover:text-[var(--color-fg)] transition-colors"
              aria-label="Clear search"
            >
              <Icon name="X" size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Grid of PDF cards */}
      {filteredCatalogues.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCatalogues.map((item, idx) => {
            const fileUrl = `/catalogues/${encodeURIComponent(item.filename)}`;
            const label = isAr ? item.ar : item.en;
            
            return (
              <div
                key={item.filename}
                className="ui-card group relative h-[330px] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] border-s-4 border-s-[var(--color-accent)] transition-all duration-500 hover:border-[var(--color-accent)]/40 hover:shadow-2xl hover:shadow-[var(--color-accent)]/5"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                {/* 1. MOCK DOCUMENT BACKGROUND (Scrolls up on hover) */}
                <div className="catalog-doc-preview absolute inset-x-0 top-0 h-[600px] opacity-[0.06] group-hover:opacity-[0.20] transition-all duration-700 ease-in-out select-none pointer-events-none z-0 overflow-hidden">
                  {renderDocPreview(item)}
                </div>

                {/* 2. COVER LAYER (Actual PDF Cover Page Image background, fades on hover) */}
                <div 
                  className="catalog-cover-layer absolute inset-0 flex flex-col justify-between p-6 transition-all duration-500 z-10 group-hover:opacity-0 group-hover:scale-95 group-hover:pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(249, 247, 243, 0.55), rgba(249, 247, 243, 0.85)), url(${item.thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-[var(--color-border)]/30 pb-3">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--color-accent)] font-semibold">
                      {getCategoryLabel(item.category)}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--color-fg-subtle)] font-medium">{item.size}</span>
                  </div>

                  {/* Center / Body */}
                  <div className="my-auto flex flex-col items-center text-center px-2">
                    <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[var(--color-bg)]/85 ring-1 ring-[var(--color-border)] text-[var(--color-accent)] shadow-md">
                      <Icon name="FileText" size={28} />
                    </div>
                    <h4 className="text-display text-base font-bold leading-snug text-[var(--color-fg)]">
                      {renderTitle(label.title)}
                    </h4>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-[var(--color-fg-subtle)] border-t border-[var(--color-border)]/30 pt-3">
                    <span className="font-semibold text-[9px] uppercase tracking-wider text-[var(--color-accent)]">Creative Concrete</span>
                    <span className="uppercase text-[var(--color-fg-subtle)] font-medium">PDF DOCUMENT</span>
                  </div>
                </div>

                {/* 3. SLIDE-UP DETAILS LAYER (Slides up to occupy bottom 200px, leaving top for document preview) */}
                <div className="catalog-details-layer absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-surface)]/98 to-[var(--color-surface)]/85 backdrop-blur-md border-t border-[var(--color-border)]/40 p-5 z-20 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 rounded-b-2xl flex flex-col justify-between">
                  <div>
                    <span className="inline-block rounded-full bg-[var(--color-accent-soft)] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[var(--color-accent)] mb-2">
                      {getCategoryLabel(item.category)}
                    </span>
                    <h4 className="text-display text-sm font-semibold leading-snug text-[var(--color-fg)] line-clamp-1">
                      {label.title.replace(/\n/g, " ")}
                    </h4>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-[var(--color-fg-muted)] line-clamp-2">
                      {label.subtitle}
                    </p>
                  </div>

                  {/* Footer Buttons */}
                  <div className="flex items-center gap-2 border-t border-[var(--color-border)]/20 pt-3">
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/30 py-2 text-xs font-semibold text-[var(--color-fg-muted)] hover:border-[var(--color-accent)]/30 hover:text-[var(--color-fg)] hover:bg-[var(--color-bg)] transition-all duration-300"
                    >
                      <Icon name={isAr ? "ArrowLeft" : "ArrowRight"} size={10} />
                      <span>{t.actions.view}</span>
                    </a>
                    <a
                      href={fileUrl}
                      download={item.filename}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[var(--color-accent)] py-2 text-xs font-semibold text-black transition-all duration-300 shadow-md hover:shadow-lg shadow-[var(--color-accent)]/5 hover:shadow-[var(--color-accent)]/10"
                    >
                      <Icon name="Download" size={10} />
                      <span>{t.actions.download}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="ui-card flex flex-col items-center justify-center rounded-3xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] py-16 px-6 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--color-bg)] text-[var(--color-fg-subtle)] mb-4">
            <Icon name="FileText" size={24} className="opacity-50" />
          </div>
          <h4 className="text-display text-lg font-semibold text-[var(--color-fg)]">
            {isAr ? "لا توجد نتائج" : "No Results"}
          </h4>
          <p className="mt-2 max-w-sm text-sm text-[var(--color-fg-muted)]">
            {t.noResults}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-5 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent-soft)] px-4 py-2 text-xs font-semibold text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-black transition-all"
            >
              {isAr ? "مسح البحث" : "Clear Search"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

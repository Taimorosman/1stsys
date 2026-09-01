"use client";

import * as React from "react";
import type { Locale } from "@/i18n/config";
import { useLanguage } from "@/context/LanguageContext";

export function WhatsAppFab({ locale: propLocale }: { locale?: Locale }) {
  const label = "Chat on WhatsApp";
  
  return (
    <a
      href="https://wa.me/966569444664"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="fixed bottom-6 end-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.5)] hover:scale-105 active:scale-95 transition"
      style={{ height: 56, width: 56 }}
    >
      <svg width={26} height={26} viewBox="0 0 32 32" fill="currentColor" aria-hidden>
        <path d="M19.11 17.69c-.31-.16-1.83-.9-2.11-1.01-.28-.1-.49-.16-.69.16-.21.31-.79 1-.97 1.21-.18.21-.36.23-.66.08-.31-.16-1.31-.48-2.49-1.54-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.13-.63.14-.14.31-.36.46-.55.16-.18.21-.31.31-.51.1-.21.05-.39-.03-.55-.08-.16-.69-1.66-.95-2.27-.25-.6-.5-.51-.69-.52H9.06c-.18 0-.49.07-.74.34-.25.27-.97.95-.97 2.32 0 1.37.99 2.69 1.13 2.88.13.18 1.95 2.97 4.72 4.16.66.28 1.18.45 1.58.58.66.21 1.27.18 1.74.11.53-.08 1.63-.66 1.86-1.31.23-.65.23-1.21.16-1.32-.06-.13-.25-.21-.55-.36zM16.04 5.33C9.97 5.33 5.04 10.26 5.04 16.33c0 1.94.51 3.85 1.48 5.52L5 27l5.32-1.4c1.61.88 3.43 1.34 5.28 1.34h.01c6.07 0 11-4.93 11-11C26.61 12.93 25.05 9.62 22.55 7.12 20.05 4.62 16.74 5.33 16.04 5.33z" />
      </svg>
    </a>
  );
}

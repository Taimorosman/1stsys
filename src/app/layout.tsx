import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The First System",
  description:
    "Decorative and construction chemicals — exclusive agent for Creative Concrete Concepts in Saudi Arabia. Engineering reliability since 2015.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=5", type: "image/x-icon" },
      { url: "/icon.png?v=5", type: "image/png", sizes: "128x128" },
      { url: "/icon.svg?v=5", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico?v=5",
    apple: "/favicon.ico?v=5",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

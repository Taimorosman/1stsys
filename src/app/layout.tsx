import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The First System",
  description:
    "Decorative and construction chemicals — exclusive agent for Creative Concrete Concepts in Saudi Arabia. Engineering reliability since 2015.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

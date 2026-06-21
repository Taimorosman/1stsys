import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The First System",
  description:
    "Decorative and construction chemicals — exclusive agent for Creative Concrete Concepts in Saudi Arabia. Engineering reliability since 2015.",
  icons: {
    icon: "/favicon.ico?v=4",
    shortcut: "/favicon.ico?v=4",
    apple: "/favicon.ico?v=4",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

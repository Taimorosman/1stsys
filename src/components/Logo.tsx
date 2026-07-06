import * as React from "react";

export function Logo({
  size = 42,
  variant = "icon",
  locale = "en",
  className = "",
}: {
  size?: number;
  variant?: "icon" | "full" | "text";
  locale?: string;
  className?: string;
}) {
  // Since the user requested to replace the previous logo with the new tfs signage PDF logo,
  // we render the newly converted SVG logo.
  // The logo has an aspect ratio of 3:1 (viewBox 0 0 8503.937 2834.646).
  const height = size;
  const width = size * 3;

  return (
    <img
      src="/images/tfs_logo.svg"
      alt="The First System"
      width={width}
      height={height}
      className={`h-auto object-contain ${className}`}
      style={{ height: `${height}px` }}
      loading="eager"
    />
  );
}

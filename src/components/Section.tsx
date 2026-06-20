import * as React from "react";

interface Props extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
  size?: "sm" | "md" | "lg";
  bleed?: boolean;
}

export function Section({
  as: Tag = "section",
  size = "md",
  bleed = false,
  className = "",
  children,
  ...rest
}: Props) {
  const padding =
    size === "sm"
      ? "py-12 md:py-16"
      : size === "lg"
        ? "py-28 md:py-36"
        : "py-24 md:py-28";

  return (
    <Tag className={`relative ${padding} ${className}`} {...rest}>
      {bleed ? children : <div className="container-page">{children}</div>}
    </Tag>
  );
}

interface HeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "start" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "start",
  className = "",
}: HeaderProps) {
  const alignment = align === "center" ? "text-center mx-auto items-center" : "text-start";
  return (
    <div className={`flex flex-col ${alignment} max-w-3xl ${className}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
          <span className="h-px w-6 bg-[var(--color-accent)]" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-display mt-4 text-3xl font-medium md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

import * as React from "react";
import Link from "next/link";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  trailingIcon?: IconName | null;
  leadingIcon?: IconName | null;
  className?: string;
  children: React.ReactNode;
}

interface AsLink extends BaseProps {
  href: string;
  external?: boolean;
}

interface AsButton extends BaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  href?: undefined;
}

type Props = AsLink | AsButton;

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none";

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-6 text-base",
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[#1D1D1D] text-[#F9F7F3] hover:bg-[var(--color-accent)] hover:text-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_20px_-8px_rgba(0,189,58,0.3)]",
  secondary:
    "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg)] hover:bg-[#1D1D1D]/5 hover:border-[#1D1D1D]/30 hover:shadow-sm",
  ghost:
    "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-elevated)]",
};

export function Button(props: Props) {
  const {
    variant = "primary",
    size = "md",
    leadingIcon,
    trailingIcon,
    className = "",
    children,
  } = props;

  const cls = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const inner = (
    <>
      {leadingIcon && <Icon name={leadingIcon} size={size === "sm" ? 14 : 16} />}
      <span>{children}</span>
      {trailingIcon && <Icon name={trailingIcon} size={size === "sm" ? 14 : 16} />}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const isExternal =
      props.external ||
      props.href.startsWith("http") ||
      props.href.startsWith("mailto:") ||
      props.href.startsWith("tel:");
    if (isExternal) {
      return (
        <a
          href={props.href}
          className={cls}
          target={props.external ? "_blank" : undefined}
          rel={props.external ? "noopener noreferrer" : undefined}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={props.href} className={cls}>
        {inner}
      </Link>
    );
  }

  const { href: _href, leadingIcon: _l, trailingIcon: _t, variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as AsButton & { href?: undefined };
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}

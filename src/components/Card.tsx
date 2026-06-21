import * as React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function Card({ interactive = false, className = "", children, ...rest }: Props) {
  return (
    <div
      className={`ui-card relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all duration-300 ${
        interactive
          ? "hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-surface-elevated)] hover:-translate-y-0.5"
          : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

import { clsx } from "clsx";
import React, { ButtonHTMLAttributes } from "react";

interface GameButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "success" | "error" | "warning";
  className?: string;
}

export default function GameButton({
  onClick,
  children,
  variant,
  className,
  ...props
}: GameButtonProps) {
  const variantStyles = {
    primary: "is-primary",
    warning: "is-warning",
    success: "is-success",
    error: "is-error",
  } as const;

  return (
    <button
      onClick={onClick}
      className={clsx("nes-btn", variant && variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "ghost" | "white";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

interface ButtonAsButton extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
  target?: string;
  rel?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-blue text-white hover:bg-brand-blue-dark focus:ring-brand-blue/50 shadow-sm",
  accent:
    "bg-brand-orange text-white hover:bg-brand-orange-dark focus:ring-brand-orange/50 shadow-sm",
  secondary:
    "bg-brand-navy text-white hover:bg-brand-navy-light focus:ring-brand-navy/50 shadow-sm",
  outline:
    "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white focus:ring-brand-blue/50",
  ghost:
    "text-brand-gray-dark hover:bg-brand-gray-light focus:ring-brand-gray-dark/50",
  white:
    "bg-white text-brand-gray-dark hover:bg-gray-100 focus:ring-white/50 shadow-sm",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;

  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, target, rel, ...rest } = props;
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = props as ButtonAsButton & { href?: undefined };
  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  );
}

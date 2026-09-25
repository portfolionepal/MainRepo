import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "blue" | "orange" | "navy" | "green" | "gray";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "default", size = "sm", className }: BadgeProps) {
  const variantClasses = {
    default: "bg-brand-gray-light text-brand-gray-dark",
    blue: "bg-brand-blue text-white shadow-sm",
    orange: "bg-brand-orange text-white shadow-sm",
    navy: "bg-brand-navy text-white shadow-sm",
    green: "bg-emerald-50 text-emerald-700",
    gray: "bg-gray-100 text-gray-600",
  };

  const sizeClasses = {
    sm: "text-xs px-2.5 py-0.5",
    md: "text-sm px-3 py-1",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}

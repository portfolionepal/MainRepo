import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
  size?: "default" | "narrow" | "wide" | "full";
}

export function Container({
  as: Tag = "div",
  size = "default",
  className,
  children,
  ...props
}: ContainerProps) {
  const sizeClasses = {
    default: "max-w-7xl",
    narrow: "max-w-4xl",
    wide: "max-w-screen-2xl",
    full: "max-w-none",
  };

  return (
    <Tag
      className={cn("mx-auto px-4 sm:px-6 lg:px-8", sizeClasses[size], className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

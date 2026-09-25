import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <div className={cn("max-w-3xl", alignClasses[align], className)}>
      {label && (
        <span
          className={cn(
            "inline-block text-sm font-semibold tracking-widest uppercase mb-3",
            light ? "text-brand-blue-light" : "text-brand-blue"
          )}
        >
          {label}
        </span>
      )}
      <h2
        className={cn(
          "font-display font-bold leading-tight mb-4",
          "text-3xl md:text-4xl lg:text-5xl",
          light ? "text-white" : "text-brand-gray-dark"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-lg leading-relaxed",
            light ? "text-gray-300" : "text-brand-gray"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

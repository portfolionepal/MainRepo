import Link from "next/link";
import { ArrowRight, LucideIcon, PenTool, Leaf, Zap, ShieldCheck, Factory, Lightbulb } from "lucide-react";
import { Service } from "@/data/services";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  className?: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
  PenTool,
  Leaf,
  Zap,
  ShieldCheck,
  Factory,
  Lightbulb,
};

export function ServiceCard({ service, className }: ServiceCardProps) {
  const Icon = ICON_MAP[service.icon] || PenTool;

  return (
    <article className={cn("group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-brand-blue/30 hover:shadow-lg transition-all duration-300", className)}>
      {/* Image placeholder area */}
      <div className="relative h-40 bg-gradient-to-br from-brand-navy to-brand-navy-light overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-brand-blue/20 rounded-2xl border border-brand-blue/30 flex items-center justify-center">
            <Icon className="w-8 h-8 text-brand-blue" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-display font-bold text-brand-gray-dark text-lg mb-3 group-hover:text-brand-blue transition-colors leading-snug">
          {service.name}
        </h3>
        <p className="text-brand-gray text-sm leading-relaxed flex-1 mb-5">
          {service.shortDescription}
        </p>

        {service.benefits.length > 0 && (
          <ul className="space-y-1.5 mb-5">
            {service.benefits.slice(0, 2).map((benefit) => (
              <li key={benefit} className="flex items-start gap-2 text-xs text-gray-500">
                <span className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-1.5 flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        )}

        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-brand-blue text-sm font-semibold hover:gap-3 transition-all"
          aria-label={`Learn more about ${service.name}`}
        >
          Learn More <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}

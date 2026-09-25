import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { PortfolioItem, PORTFOLIO_CATEGORIES } from "@/data/portfolio";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface PortfolioCardProps {
  item: PortfolioItem;
  className?: string;
}

function getCategoryLabel(category: string): string {
  return PORTFOLIO_CATEGORIES.find((c) => c.value === category)?.label ?? category;
}

export function PortfolioCard({ item, className }: PortfolioCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      {/* Image */}
      <div className="relative h-52 bg-gradient-to-br from-brand-navy-light to-brand-navy overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="w-14 h-14 bg-brand-blue/20 rounded-xl border border-brand-blue/30 flex items-center justify-center mx-auto mb-2">
              <svg
                viewBox="0 0 32 32"
                className="w-8 h-8 text-brand-blue"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="2" y="12" width="28" height="18" rx="2" />
                <path d="M2 18h28M10 12V8a6 6 0 0112 0v4" />
              </svg>
            </div>
            <p className="text-white/70 text-xs">{item.client}</p>
          </div>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <ExternalLink className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="blue">{getCategoryLabel(item.category)}</Badge>
          <span className="text-xs text-gray-400">{item.year}</span>
        </div>
        <h3 className="font-display font-bold text-brand-gray-dark text-base mb-1 group-hover:text-brand-blue transition-colors leading-snug">
          {item.title}
        </h3>
        <p className="text-xs text-gray-400 mb-3">{item.client}</p>
        <p className="text-brand-gray text-sm leading-relaxed flex-1 mb-4 line-clamp-2">
          {item.description}
        </p>
        <Link
          href={`/portfolio/${item.slug}`}
          className="inline-flex items-center gap-1.5 text-brand-blue text-sm font-semibold hover:gap-3 transition-all"
        >
          View Project <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}

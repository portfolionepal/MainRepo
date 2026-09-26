import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Product, PRODUCT_CATEGORIES } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/lib/api";

interface ProductCardProps {
  product: Product;
  className?: string;
}

function getCategoryLabel(category: string): string {
  return PRODUCT_CATEGORIES.find((c) => c.value === category)?.label ?? category;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <article className={cn("group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-brand-blue/30 hover:shadow-lg transition-all duration-300", className)}>
      {/* Image area */}
      <div className="relative h-48 bg-gradient-to-br from-brand-gray-light to-gray-200 overflow-hidden">
        <Image
          src={getImageUrl(product.image)}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Category badge overlay */}
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="blue">{getCategoryLabel(product.category)}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-display font-bold text-brand-gray-dark text-lg mb-2 group-hover:text-brand-blue transition-colors leading-snug">
          {product.name}
        </h3>
        <p className="text-brand-gray text-sm leading-relaxed flex-1 mb-5">
          {product.shortDescription}
        </p>

        {/* Features preview */}
        {product.features.length > 0 && (
          <ul className="space-y-1.5 mb-5">
            {product.features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-xs text-gray-500">
                <span className="w-1.5 h-1.5 bg-brand-blue rounded-full mt-1.5 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center gap-1.5 text-brand-blue text-sm font-semibold hover:gap-3 transition-all"
          aria-label={`View details for ${product.name}`}
        >
          View Details <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}

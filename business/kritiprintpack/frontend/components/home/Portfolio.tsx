import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { getFeaturedPortfolioItems } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PORTFOLIO_CATEGORIES } from "@/data/portfolio";

function getCategoryLabel(category: string): string {
  return PORTFOLIO_CATEGORIES.find((c) => c.value === category)?.label ?? category;
}

export function Portfolio() {
  const featured = getFeaturedPortfolioItems().slice(0, 4);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <SectionHeading
            label="Our Work"
            title="Projects We're Proud Of"
            subtitle="A selection of packaging projects delivered for leading brands across Nepal and the region."
            align="left"
            className="max-w-xl"
          />
          <Button href="/portfolio" variant="outline" size="md" className="flex-shrink-0">
            View Full Portfolio
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featured.map((item, i) => (
            <Link
              key={item.id}
              href={`/portfolio/${item.slug}`}
              className="group relative bg-brand-gray-light rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              {/* Actual Image */}
              <div className="relative h-52 bg-gradient-to-br from-brand-gray-light to-gray-200 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <ExternalLink className="w-8 h-8 text-white drop-shadow-md" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="blue">{getCategoryLabel(item.category)}</Badge>
                  <span className="text-xs text-gray-400">{item.year}</span>
                </div>
                <h3 className="font-display font-bold text-brand-gray-dark text-lg mb-1.5 group-hover:text-brand-blue transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mb-3">{item.client}</p>
                <p className="text-brand-gray text-sm leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

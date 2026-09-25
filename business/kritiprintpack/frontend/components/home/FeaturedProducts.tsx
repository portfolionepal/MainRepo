import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FeaturedProducts() {
  const featured = getFeaturedProducts().slice(0, 6);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <SectionHeading
            label="Our Products"
            title="Packaging Solutions for Every Need"
            subtitle="From corrugated master cartons to custom branded mailer boxes — engineered for protection, designed for impact."
            align="left"
            className="max-w-xl"
          />
          <Button href="/products" variant="outline" size="md" className="flex-shrink-0">
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}

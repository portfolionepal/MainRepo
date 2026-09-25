import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPortfolioItemBySlug, portfolioItems, PORTFOLIO_CATEGORIES } from "@/data/portfolio";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolioItems.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioItemBySlug(slug);
  if (!item) return { title: "Project Not Found" };
  return {
    title: item.title,
    description: item.description,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getPortfolioItemBySlug(slug);
  if (!item) notFound();

  const categoryLabel = PORTFOLIO_CATEGORIES.find((c) => c.value === item.category)?.label;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-brand-navy pt-24 pb-2">
        <Container>
          <nav className="flex items-center gap-2 text-sm text-gray-400 py-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
            <span>/</span>
            <span className="text-white">{item.title}</span>
          </nav>
        </Container>
      </div>

      {/* Hero */}
      <section className="bg-brand-navy pb-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden bg-brand-navy-light border border-white/10 aspect-[4/3] flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-brand-orange/20 rounded-2xl border border-brand-orange/30 flex items-center justify-center mx-auto mb-4">
                  <svg viewBox="0 0 48 48" className="w-10 h-10 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="4" y="20" width="40" height="24" rx="2" />
                    <path d="M4 28h40M16 20V12a8 8 0 0116 0v8" />
                  </svg>
                </div>
                <p className="text-white font-medium">{item.title}</p>
                <p className="text-gray-400 text-sm mt-1">{item.client}</p>
              </div>
            </div>

            {/* Info */}
            <div className="lg:py-4">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="orange">{categoryLabel}</Badge>
                <span className="text-gray-400 text-sm">{item.year}</span>
              </div>
              <h1 className="font-display font-bold text-white text-3xl lg:text-4xl leading-tight mb-2">
                {item.title}
              </h1>
              <p className="text-brand-orange font-medium mb-6">{item.client}</p>
              <p className="text-gray-300 leading-relaxed mb-6">{item.fullDescription}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {item.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <Button href="/request-quote" variant="primary" size="md">
                Request Similar Packaging <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Back to Portfolio */}
      <section className="py-10 bg-white border-t border-gray-100">
        <Container>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-brand-orange font-semibold hover:text-brand-orange-dark transition-colors"
          >
            ← Back to Portfolio
          </Link>
        </Container>
      </section>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { PORTFOLIO_CATEGORIES, type PortfolioCategory, PortfolioItem } from "@/data/portfolio";
import { fetchAPI } from "@/lib/api";
import { PortfolioCard } from "@/components/portfolio/PortfolioCard";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory | "all">("all");
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchAPI('/portfolio');
      if (data) setPortfolioItems(data);
      setLoading(false);
    };
    loadItems();
  }, []);

  const filtered =
    activeCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Page Hero */}
      <section className="bg-brand-navy pt-32 pb-16">
        <Container>
          <div className="max-w-2xl">
            <span className="inline-block text-brand-orange text-sm font-semibold tracking-widest uppercase mb-4">
              Portfolio
            </span>
            <h1 className="font-display font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
              Our Completed Projects
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              A selection of packaging projects delivered for leading brands across Nepal and the region.
              Every project showcases our commitment to quality, precision, and client collaboration.
            </p>
          </div>
        </Container>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 bg-brand-gray-light">
        <Container>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeCategory === "all"
                  ? "bg-brand-navy text-white shadow"
                  : "bg-white text-brand-gray border border-gray-200 hover:border-brand-navy hover:text-brand-gray-dark"
              )}
            >
              All Projects
            </button>
            {PORTFOLIO_CATEGORIES.map((cat) => {
              const count = portfolioItems.filter((p) => p.category === cat.value).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    activeCategory === cat.value
                      ? "bg-brand-orange text-white shadow"
                      : "bg-white text-brand-gray border border-gray-200 hover:border-brand-orange hover:text-brand-orange"
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="text-center py-20 text-brand-gray">Loading projects...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filtered.map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20 text-brand-gray">
              No projects found in this category.
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

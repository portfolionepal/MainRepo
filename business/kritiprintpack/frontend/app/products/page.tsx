"use client";

import { useState, useEffect } from "react";
import { PRODUCT_CATEGORIES, type ProductCategory, Product } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { fetchAPI } from "@/lib/api";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchAPI('/products');
      if (data) setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Page Hero */}
      <section className="bg-brand-navy pt-32 pb-16">
        <Container>
          <div className="max-w-2xl">
            <span className="inline-block text-brand-orange text-sm font-semibold tracking-widest uppercase mb-4">
              Our Products
            </span>
            <h1 className="font-display font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
              Custom Packaging Products
            </h1>
            <p className="text-gray-300 text-lg">
              Browse our full range of corrugated and specialty packaging products — all available
              with custom dimensions, printing, and finishes.
            </p>
          </div>
        </Container>
      </section>

      {/* Products Grid */}
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
              All Products
            </button>
            {PRODUCT_CATEGORIES.map((cat) => {
              const count = products.filter((p) => p.category === cat.value).length;
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
            <div className="text-center py-20 text-brand-gray">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20 text-brand-gray">
              No products found in this category.
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

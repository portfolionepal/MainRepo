"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, ArrowRight, Layers, Printer, Weight, Package, Star, Droplet, Settings } from "lucide-react";
import { PRODUCT_CATEGORIES, Product } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { fetchAPI, getImageUrl } from "@/lib/api";

function getSpecIcon(key: string) {
  const k = key.toLowerCase();
  if (k.includes("board") || k.includes("material") || k.includes("flute")) return <Layers className="w-5 h-5 text-brand-orange" />;
  if (k.includes("printing") || k.includes("ink")) return <Printer className="w-5 h-5 text-brand-orange" />;
  if (k.includes("strength") || k.includes("ect") || k.includes("load") || k.includes("weight")) return <Weight className="w-5 h-5 text-brand-orange" />;
  if (k.includes("moq") || k.includes("pack") || k.includes("config")) return <Package className="w-5 h-5 text-brand-orange" />;
  if (k.includes("cert")) return <Star className="w-5 h-5 text-brand-orange" />;
  if (k.includes("coat") || k.includes("finish") || k.includes("closure")) return <Droplet className="w-5 h-5 text-brand-orange" />;
  return <Settings className="w-5 h-5 text-brand-orange" />;
}

function ProductDetailContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) {
      setError(true);
      setLoading(false);
      return;
    }

    async function loadProduct() {
      try {
        const data = await fetchAPI(`/products/${slug}`);
        if (data) {
          setProduct(data);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-brand-navy min-h-screen pt-32 pb-16 flex items-center justify-center">
        <div className="text-brand-orange text-xl font-display">Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-brand-navy min-h-screen pt-32 pb-16 flex flex-col items-center justify-center">
        <h1 className="text-white text-3xl font-display font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-400 mb-8">We couldn't find the product you're looking for.</p>
        <Button href="/products" variant="primary">Return to Products</Button>
      </div>
    );
  }

  const categoryLabel = PRODUCT_CATEGORIES.find((c) => c.value === product.category)?.label;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-brand-navy pt-24 pb-2">
        <Container>
          <nav className="flex items-center gap-2 text-sm text-gray-400 py-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </nav>
        </Container>
      </div>

      {/* Product Hero */}
      <section className="bg-brand-navy pb-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Product image */}
            <div className="relative rounded-2xl overflow-hidden bg-white border border-white/10 aspect-[4/3] shadow-xl">
              <Image
                src={getImageUrl(product.image)}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Product info */}
            <div className="lg:py-4">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="orange">{categoryLabel}</Badge>
              </div>
              <h1 className="font-display font-bold text-white text-3xl lg:text-4xl leading-tight mb-4">
                {product.name}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button href="/request-quote" variant="primary" size="md">
                  Request a Quote
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button href="/contact" variant="outline" size="md" className="border-white/30 text-white hover:bg-white hover:text-brand-gray-dark">
                  Talk to an Expert
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Details */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Features */}
            <div className="lg:col-span-1">
              <h2 className="font-display font-bold text-brand-gray-dark text-xl mb-5">Key Features</h2>
              <ul className="space-y-3">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-brand-gray text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications */}
            <div className="lg:col-span-1">
              <h2 className="font-display font-bold text-brand-gray-dark text-xl mb-5">Applications</h2>
              <ul className="space-y-3">
                {product.applications.map((app) => (
                  <li key={app} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-brand-orange rounded-full flex-shrink-0 mt-2" />
                    <span className="text-brand-gray text-sm">{app}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="lg:col-span-1">
                <h2 className="font-display font-bold text-brand-gray-dark text-xl mb-5">Specifications</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-brand-orange/30 hover:shadow-sm transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                        {getSpecIcon(key)}
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-brand-gray-dark uppercase tracking-wider mb-1">{key}</p>
                        <p className="text-sm text-brand-gray font-medium">{value as React.ReactNode}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-navy">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-display font-bold text-white text-2xl mb-1">
                Interested in this product?
              </h2>
              <p className="text-gray-400">Request a quote and we'll get back to you within 24 hours.</p>
            </div>
            <Button href="/request-quote" variant="primary" size="lg">
              Request a Quote
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={<div className="bg-brand-navy min-h-screen pt-32 pb-16 flex items-center justify-center"><div className="text-brand-orange text-xl font-display">Loading...</div></div>}>
      <ProductDetailContent />
    </Suspense>
  );
}

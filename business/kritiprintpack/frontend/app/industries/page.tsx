import type { Metadata } from "next";
import {
  ShoppingCart,
  UtensilsCrossed,
  Package,
  Factory,
  Pill,
  Store,
  Sprout,
  Truck,
  LucideIcon,
} from "lucide-react";
import { industries } from "@/data/industries";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Kriti Print & Pack serves FMCG, food & beverage, e-commerce, industrial, pharmaceutical, retail, agriculture, and logistics sectors with custom corrugated packaging solutions.",
};

const ICON_MAP: Record<string, LucideIcon> = {
  ShoppingCart, UtensilsCrossed, Package, Factory, Pill, Store, Sprout, Truck,
};

export default function IndustriesPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-brand-navy pt-32 pb-16">
        <Container>
          <div className="max-w-2xl">
            <span className="inline-block text-brand-orange text-sm font-semibold tracking-widest uppercase mb-4">
              Industries
            </span>
            <h1 className="font-display font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
              Packaging for Every Industry
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Our corrugated packaging expertise spans a wide range of industries. Whatever your
              sector, we have the knowledge, materials, and manufacturing capability to deliver
              packaging that meets your specific requirements.
            </p>
          </div>
        </Container>
      </section>

      {/* Industries Grid */}
      <section className="py-16 bg-brand-gray-light">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {industries.map((industry) => {
              const Icon = ICON_MAP[industry.icon] || Package;
              return (
                <div
                  key={industry.id}
                  className="bg-white rounded-xl p-7 border border-gray-100 hover:border-brand-orange/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-brand-orange" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-display font-bold text-brand-gray-dark text-xl mb-2">
                        {industry.name}
                      </h2>
                      <p className="text-brand-gray text-sm leading-relaxed mb-4">
                        {industry.description}
                      </p>
                      <div>
                        <span className="text-xs font-semibold text-brand-gray-dark uppercase tracking-wider block mb-2">
                          Common Products
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {industry.products.map((p) => (
                            <span
                              key={p}
                              className="text-xs bg-brand-gray-light text-brand-gray-dark px-2.5 py-1 rounded-full"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}

import Link from "next/link";
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
import { Industry } from "@/data/industries";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { fetchAPI } from "@/lib/api";

const ICON_MAP: Record<string, LucideIcon> = {
  ShoppingCart,
  UtensilsCrossed,
  Package,
  Factory,
  Pill,
  Store,
  Sprout,
  Truck,
};

export async function Industries() {
  const industries: Industry[] = (await fetchAPI('/industries')) || [];
  return (
    <section className="py-20 lg:py-28 bg-white">
      <Container>
        <div className="text-center mb-14">
          <SectionHeading
            label="Industries We Serve"
            title="Packaging for Every Sector"
            subtitle="Our manufacturing capabilities cover a wide range of industries, each with their own unique packaging requirements."
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-6">
          {industries.map((industry) => {
            const Icon = ICON_MAP[industry.icon] || Package;
            return (
              <div
                key={industry.id}
                className="group flex flex-col items-center text-center p-5 lg:p-6 rounded-xl border border-gray-100 bg-brand-gray-light hover:bg-brand-navy hover:border-brand-navy transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 bg-white group-hover:bg-brand-blue/20 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 shadow-sm">
                  <Icon className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="font-semibold text-brand-gray-dark group-hover:text-white text-sm leading-snug mb-1.5 transition-colors duration-300">
                  {industry.name}
                </h3>
                <p className="text-xs text-gray-500 group-hover:text-gray-300 leading-relaxed transition-colors duration-300 hidden sm:block">
                  {industry.description.split(".")[0]}.
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:text-brand-blue-dark transition-colors text-sm"
          >
            Learn more about industries we serve →
          </Link>
        </div>
      </Container>
    </section>
  );
}

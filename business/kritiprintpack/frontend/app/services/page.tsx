import type { Metadata } from "next";
import { Service } from "@/data/services";
import { fetchAPI } from "@/lib/api";
import { ServiceCard } from "@/components/services/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Kriti Print & Pack's packaging services — custom design, sustainable packaging, rapid prototyping, FMCG food-grade production, and large-volume manufacturing.",
};

export default async function ServicesPage() {
  const services: Service[] = (await fetchAPI('/services')) || [];
  return (
    <>
      {/* Page Hero */}
      <section className="bg-brand-navy pt-32 pb-16">
        <Container>
          <div className="max-w-2xl">
            <span className="inline-block text-brand-orange text-sm font-semibold tracking-widest uppercase mb-4">
              Services
            </span>
            <h1 className="font-display font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
              End-to-End Packaging Services
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              From initial design concept to full production delivery, we provide a complete range
              of packaging manufacturing services tailored to your industry and requirements.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-brand-gray-light">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}

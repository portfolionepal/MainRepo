import Link from "next/link";
import {
  PenTool,
  Leaf,
  Zap,
  ShieldCheck,
  Factory,
  Lightbulb,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import { Service } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { fetchAPI } from "@/lib/api";

const ICON_MAP: Record<string, LucideIcon> = {
  PenTool,
  Leaf,
  Zap,
  ShieldCheck,
  Factory,
  Lightbulb,
};

export async function Services() {
  const services: Service[] = (await fetchAPI('/services')) || [];
  const featured = services.filter((s) => s.isFeatured);

  return (
    <section className="py-20 lg:py-28 bg-brand-gray-light">
      <Container>
        <div className="text-center mb-14">
          <SectionHeading
            label="What We Do"
            title="End-to-End Packaging Services"
            subtitle="We don't just manufacture boxes — we partner with you from design concept to full-volume production."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((service) => {
            const Icon = ICON_MAP[service.icon] || PenTool;
            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-xl p-7 border border-gray-100 hover:border-brand-blue/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-brand-blue transition-colors duration-300">
                  <Icon className="w-6 h-6 text-brand-blue group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-display font-bold text-brand-gray-dark text-lg mb-3 group-hover:text-brand-blue transition-colors">
                  {service.name}
                </h3>
                <p className="text-brand-gray text-sm leading-relaxed mb-5">
                  {service.shortDescription}
                </p>
                <span className="inline-flex items-center gap-1.5 text-brand-blue text-sm font-semibold group-hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button href="/services" variant="secondary" size="md">
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, LucideIcon, PenTool, Leaf, Zap, ShieldCheck, Factory, Lightbulb } from "lucide-react";
import { Service } from "@/data/services";
import { fetchAPI } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

interface Props {
  params: Promise<{ slug: string }>;
}

const ICON_MAP: Record<string, LucideIcon> = {
  PenTool, Leaf, Zap, ShieldCheck, Factory, Lightbulb,
};

export async function generateStaticParams() {
  const services: Service[] = (await fetchAPI('/services')) || [];
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service: Service = await fetchAPI(`/services/${slug}`);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.name,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service: Service = await fetchAPI(`/services/${slug}`);
  if (!service) notFound();

  const Icon = ICON_MAP[service.icon] || PenTool;

  return (
    <>
      {/* Breadcrumb & Hero */}
      <section className="bg-brand-navy pt-24 pb-16">
        <Container>
          <nav className="flex items-center gap-2 text-sm text-gray-400 py-4 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white">{service.name}</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-14 h-14 bg-brand-orange/20 rounded-xl border border-brand-orange/30 flex items-center justify-center mb-6">
                <Icon className="w-7 h-7 text-brand-orange" />
              </div>
              <h1 className="font-display font-bold text-white text-3xl lg:text-4xl leading-tight mb-4">
                {service.name}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">{service.description}</p>
              <Button href="/request-quote" variant="primary" size="md">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="bg-brand-navy-light rounded-2xl p-8 border border-white/10">
              <h3 className="font-semibold text-white text-sm tracking-wider uppercase mb-4">Key Benefits</h3>
              <ul className="space-y-3">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-white">
        <Container size="narrow">
          <h2 className="font-display font-bold text-brand-gray-dark text-2xl lg:text-3xl mb-10 text-center">
            Our Process
          </h2>
          <div className="space-y-6">
            {service.process.map((step, i) => (
              <div key={step.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center font-bold text-white text-sm">
                  {step.step}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-semibold text-brand-gray-dark text-base mb-1">{step.title}</h3>
                  <p className="text-brand-gray text-sm leading-relaxed">{step.description}</p>
                </div>
                {i < service.process.length - 1 && (
                  <div className="absolute left-[1.25rem] mt-10 w-0.5 h-6 bg-gray-200 hidden" />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-navy">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-display font-bold text-white text-2xl mb-1">
                Ready to get started?
              </h2>
              <p className="text-gray-400">Tell us your requirements and we&apos;ll be in touch within 24 hours.</p>
            </div>
            <div className="flex gap-3">
              <Button href="/request-quote" variant="primary" size="md">
                Request a Quote
              </Button>
              <Button href="/contact" variant="outline" size="md" className="border-white/30 text-white hover:bg-white hover:text-brand-gray-dark">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

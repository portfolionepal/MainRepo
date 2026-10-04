"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Service } from "@/data/services";
import { fetchAPI } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getIconComponent } from "@/lib/icons";

function ServiceDetailContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) {
      setError(true);
      setLoading(false);
      return;
    }

    async function loadService() {
      try {
        const data = await fetchAPI(`/services/${slug}`);
        if (data) {
          setService(data);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadService();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-brand-navy min-h-screen pt-32 pb-16 flex items-center justify-center">
        <div className="text-brand-orange text-xl font-display">Loading service details...</div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="bg-brand-navy min-h-screen pt-32 pb-16 flex flex-col items-center justify-center">
        <h1 className="text-white text-3xl font-display font-bold mb-4">Service Not Found</h1>
        <p className="text-gray-400 mb-8">We couldn't find the service you're looking for.</p>
        <Button href="/services" variant="primary">Return to Services</Button>
      </div>
    );
  }

  const Icon = getIconComponent(service.icon);

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
              <p className="text-gray-400">Tell us your requirements and we'll be in touch within 24 hours.</p>
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

export default function ServiceDetailPage() {
  return (
    <Suspense fallback={<div className="bg-brand-navy min-h-screen pt-32 pb-16 flex items-center justify-center"><div className="text-brand-orange text-xl font-display">Loading...</div></div>}>
      <ServiceDetailContent />
    </Suspense>
  );
}

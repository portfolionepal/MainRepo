import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Award, Users, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE_NAME } from "@/lib/constants";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE_NAME} — our history, values, and commitment to delivering premium packaging solutions in Nepal since 2009.`,
};

const VALUES = [
  { icon: Award, title: "Quality First", description: "Every product we produce undergoes rigorous quality checks before leaving our facility." },
  { icon: Users, title: "Client Partnership", description: "We build long-term relationships with our clients, acting as a packaging partner rather than just a supplier." },
  { icon: CheckCircle, title: "Precision Manufacturing", description: "Tight dimensional tolerances and consistent print quality delivered run after run." },
  { icon: Clock, title: "Reliable Delivery", description: "On-time delivery is not optional — it's our standard operating procedure." },
];

const MILESTONES = [
  { year: "2009", title: "Company Founded", description: "Kriti Print & Pack was established in Biratnagar with a single corrugated board production line." },
  { year: "2013", title: "FMCG Expansion", description: "Expanded into FMCG packaging as demand from Nepal's food and consumer goods sector grew." },
  { year: "2017", title: "Capacity Doubling", description: "Invested in additional production lines to double throughput capacity and reduce lead times." },
  { year: "2020", title: "Eco-Friendly Range", description: "Launched our sustainable packaging line using recycled and FSC-certified materials." },
  { year: "2023", title: "Digital Prepress", description: "Upgraded to fully digital prepress workflow for faster job setup and improved color accuracy." },
  { year: "2025", title: "New Corrugator Line", description: "Commissioned a new high-speed corrugator, further expanding capacity to serve growing client demand." },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-brand-navy pt-32 pb-20">
        <Container>
          <div className="max-w-3xl">
            <span className="inline-block text-brand-orange text-sm font-semibold tracking-widest uppercase mb-4">
              About Us
            </span>
            <h1 className="font-display font-bold text-white text-4xl lg:text-5xl leading-tight mb-6">
              Nepal&apos;s Trusted Packaging Manufacturer
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Since 2009, Kriti Print & Pack Industries has been manufacturing premium corrugated
              packaging solutions for FMCG, food, industrial, and e-commerce businesses across
              Nepal and the wider region. Based in Katahari, Biratnagar, we combine
              manufacturing expertise with responsive client service to deliver packaging that
              works as hard as you do.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission & Story */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                label="Our Mission"
                title="Packaging that Protects, Prints, and Performs"
                subtitle="We exist to help businesses across Nepal access world-class packaging without world-class complexity. Our mission is to make high-quality custom packaging accessible, reliable, and delivered on time."
                align="left"
              />
              <div className="mt-8 space-y-4">
                <p className="text-brand-gray leading-relaxed">
                  We understand that your packaging is often the first physical interaction a customer
                  has with your product. It must protect what&apos;s inside, communicate your brand
                  accurately, and perform reliably throughout the supply chain.
                </p>
                <p className="text-brand-gray leading-relaxed">
                  That&apos;s why we invest continuously in our manufacturing capabilities, quality systems,
                  and our team — so that every order we produce reflects the same care and precision
                  we&apos;d want if the product were our own.
                </p>
              </div>
              <div className="mt-8">
                <Button href="/request-quote" variant="primary" size="md">
                  Work With Us
                </Button>
              </div>
            </div>
            <div className="bg-brand-gray-light rounded-2xl p-10 lg:p-12">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-4xl font-display font-bold text-brand-orange mb-1">15+</p>
                  <p className="text-brand-gray text-sm">Years in Business</p>
                </div>
                <div>
                  <p className="text-4xl font-display font-bold text-brand-orange mb-1">200+</p>
                  <p className="text-brand-gray text-sm">Active Clients</p>
                </div>
                <div>
                  <p className="text-4xl font-display font-bold text-brand-orange mb-1">50M+</p>
                  <p className="text-brand-gray text-sm">Units Produced</p>
                </div>
                <div>
                  <p className="text-4xl font-display font-bold text-brand-orange mb-1">500+</p>
                  <p className="text-brand-gray text-sm">Products Delivered</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 bg-brand-gray-light">
        <Container>
          <div className="text-center mb-14">
            <SectionHeading
              label="Our Values"
              title="What We Stand For"
              subtitle="Our core values guide every decision we make — from how we set up a production run to how we respond to a client's urgent request."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="bg-white rounded-xl p-6 border border-gray-100">
                  <div className="w-11 h-11 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-brand-orange" />
                  </div>
                  <h3 className="font-display font-bold text-brand-gray-dark text-base mb-2">{value.title}</h3>
                  <p className="text-brand-gray text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <Container size="narrow">
          <div className="text-center mb-14">
            <SectionHeading
              label="Our Journey"
              title="15 Years of Growth"
              subtitle="Key milestones in the Kriti Print & Pack story."
            />
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 md:transform md:-translate-x-0.5" />
            <div className="space-y-10">
              {MILESTONES.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex flex-col md:flex-row gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-brand-orange rounded-full border-2 border-white shadow-sm transform md:-translate-x-1.5 mt-1.5" />
                  <div className={`md:w-1/2 pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="inline-block text-brand-orange font-bold font-display text-xl mb-1">
                      {m.year}
                    </span>
                    <h3 className="font-semibold text-brand-gray-dark text-base mb-1">{m.title}</h3>
                    <p className="text-brand-gray text-sm leading-relaxed">{m.description}</p>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}

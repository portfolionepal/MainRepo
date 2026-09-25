import { Award, Clock, Cog, Users, CheckCircle, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

const REASONS = [
  {
    icon: Award,
    title: "Uncompromising Quality",
    description:
      "Every carton leaves our facility after rigorous quality inspection. We maintain consistent burst strength, dimensional accuracy, and print fidelity across every production run.",
  },
  {
    icon: Clock,
    title: "Reliable Lead Times",
    description:
      "We understand that your production schedule depends on your packaging supply. Our production planning ensures on-time delivery, even for large-volume orders.",
  },
  {
    icon: Cog,
    title: "Custom-Made Solutions",
    description:
      "No two businesses are identical. We work with you to engineer packaging that fits your product, brand, and supply chain — not just a catalog item.",
  },
  {
    icon: Users,
    title: "Dedicated Account Support",
    description:
      "A dedicated account manager works with you from initial brief through production and delivery, ensuring smooth communication throughout your project.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Capacity",
    description:
      "From prototype runs to millions of units, our facility scales with your business. Start small and grow your packaging program without changing suppliers.",
  },
  {
    icon: CheckCircle,
    title: "15+ Years of Experience",
    description:
      "Since our founding, we've delivered packaging for hundreds of FMCG, food, and industrial clients across Nepal. Our experience protects your investment.",
  },
];

export function WhyKriti() {
  return (
    <section className="py-20 lg:py-28 bg-brand-gray-light relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#64748b" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <Container className="relative">
        <div className="text-center mb-14">
          <SectionHeading
            label="Why Kriti"
            title="Why Businesses Choose Us"
            subtitle="We combine manufacturing precision with responsive service to deliver packaging that works as hard as you do."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-xl p-7 shadow-sm border border-brand-gray-dark/5 hover:border-brand-blue/30 hover:shadow-md transition-all duration-300"
              >
                <div className="w-11 h-11 bg-brand-blue/10 rounded-lg flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-brand-blue-light" />
                </div>
                <h3 className="font-display font-bold text-brand-navy text-lg mb-3">
                  {reason.title}
                </h3>
                <p className="text-brand-gray text-sm leading-relaxed">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

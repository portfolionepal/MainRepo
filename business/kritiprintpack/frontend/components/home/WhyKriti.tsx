import { Award, Clock, Cog, Users, CheckCircle, TrendingUp, LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { fetchAPI } from "@/lib/api";

const ICON_MAP: Record<string, LucideIcon> = {
  Award, Clock, Cog, Users, CheckCircle, TrendingUp
};

export async function WhyKriti() {
  const reasons = (await fetchAPI('/why-choose-us')) || [];

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
          {reasons.map((reason: any) => {
            const Icon = ICON_MAP[reason.icon] || CheckCircle;
            return (
              <div
                key={reason.id}
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

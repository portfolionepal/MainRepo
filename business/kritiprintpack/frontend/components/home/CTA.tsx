import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { COMPANY_INFO } from "@/lib/constants";

export function CTA() {
  return (
    <section className="py-20 lg:py-28 bg-brand-blue relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full" />
        <div className="absolute -left-10 -bottom-20 w-60 h-60 bg-white/10 rounded-full" />
        <div className="absolute right-1/4 bottom-0 w-40 h-40 bg-white/5 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-white/70 text-sm font-semibold tracking-widest uppercase mb-4">
            Get Started Today
          </span>
          <h2 className="font-display font-bold text-white text-4xl lg:text-5xl leading-tight mb-6">
            Ready to Start Your Packaging Project?
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-10">
            Tell us about your packaging requirements and we&apos;ll provide a detailed quote
            within 24 hours. No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/request-quote"
              variant="white"
              size="lg"
            >
              Request a Free Quote
              <ArrowRight className="w-5 h-5" />
            </Button>
            <a
              href={`tel:${COMPANY_INFO.mobile}`}
              className="inline-flex items-center gap-2 text-white font-semibold text-base hover:text-white/80 transition-colors px-6 py-3.5"
            >
              <Phone className="w-5 h-5" />
              {COMPANY_INFO.mobile}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

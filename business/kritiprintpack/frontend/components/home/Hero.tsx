"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

interface Stat {
  id?: string;
  value: string;
  label: string;
}

interface HeroProps {
  stats: Stat[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

const HIGHLIGHTS = [
  "ISO-quality corrugated manufacturing",
  "Custom packaging for FMCG & food sector",
  "15+ years serving Nepal's industry leaders",
];

export function Hero({ stats }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-gray-light">
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#ffffff_0%,#F4F5F7_60%)]" />
        {/* Diagonal accent lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="diagonal-lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <line x1="0" y1="40" x2="40" y2="0" stroke="#1A2332" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
        </svg>
        {/* Orange accent gradient */}
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-brand-orange/5 blur-3xl" />
        <div className="absolute top-1/4 right-0 w-1/4 h-1/2 bg-brand-blue/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-display font-bold text-brand-navy leading-tight mb-6"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
            >
              Professional{" "}
              <span className="text-brand-orange">Printing</span> &{" "}
              <span className="text-brand-navy-light">Packaging</span>{" "}
              Solutions
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-brand-gray text-lg leading-relaxed mb-8 max-w-xl"
            >
              From corrugated master cartons to custom FMCG packaging — we design and
              manufacture high-quality packaging solutions that protect your products
              and represent your brand with precision.
            </motion.p>

            {/* Highlights */}
            <motion.ul
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="space-y-3.5 mb-10"
            >
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-center gap-3.5">
                  <CheckCircle2 className="w-6 h-6 text-brand-orange flex-shrink-0" />
                  <span className="text-brand-gray-dark text-base font-medium">{item}</span>
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-wrap gap-4"
            >
              <Button href="/request-quote" variant="accent" size="lg">
                Request a Quote
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button href="/products" variant="outline" size="lg" className="border-brand-gray-dark/30 text-brand-gray-dark hover:bg-brand-gray-dark hover:text-white">
                View Products
              </Button>
            </motion.div>
          </div>

          {/* Right: Visual element */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            {/* Main card */}
            <div className="relative bg-white rounded-3xl overflow-hidden border border-brand-gray-light shadow-2xl aspect-[4/3] w-full transform lg:scale-100 xl:scale-105 hover:scale-[1.02] xl:hover:scale-[1.07] transition-transform duration-700 origin-center z-10">
              <Image 
                src="/hero-main.jpg" 
                alt="Corrugated Packaging Factory"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Orange accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-brand-orange z-10" />
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-10 border-t border-brand-gray-dark/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl lg:text-4xl font-display font-bold text-brand-navy mb-1">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="text-brand-gray text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

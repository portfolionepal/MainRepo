"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { cn } from "@/lib/utils";

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
  "Quality Corrugated Manufacturing",
  "Custom Packaging for FMCG & Food Sector",
  "41+ Years Serving Nepal's Industry Leaders",
];

const HERO_SLIDES = [
  {
    src: "/hero-main.jpg",
    alt: "Corrugated Packaging Factory Warehouse",
    title: "Corrugated Manufacturing Plant",
  },
  {
    src: "/hero-floating-1.jpg",
    alt: "High-Speed Production and Printing Lines",
    title: "Automated Production Lines",
  },
  {
    src: "/hero-floating-2.jpg",
    alt: "Precision Box Packaging and Quality Assurance",
    title: "Precision Box Packaging",
  },
  {
    src: "/images/products/industrial-shipping-boxes.jpg",
    alt: "Custom Industrial Shipping & Master Cartons",
    title: "Industrial Shipping Cartons",
  },
];

export function Hero({ stats }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 3 seconds in a continuous loop
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

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

          {/* Right: Visual element (4-Image Auto Slider) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative block mt-6 lg:mt-0"
          >
            {/* Main card */}
            <div className="relative bg-white rounded-3xl overflow-hidden border border-brand-gray-light shadow-2xl aspect-[4/3] w-full transform lg:scale-100 xl:scale-105 transition-all duration-500 origin-center z-10 group">
              {/* Slides */}
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={HERO_SLIDES[currentSlide].src}
                    alt={HERO_SLIDES[currentSlide].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={currentSlide === 0}
                  />
                  {/* Subtle gradient overlay for badge & dots readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25 pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Slide badge / title */}
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-navy/80 backdrop-blur-md text-white border border-white/15 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                  {HERO_SLIDES[currentSlide].title}
                </span>
              </div>

              {/* Prev / Next controls (appear on hover) */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-brand-navy/60 hover:bg-brand-navy/90 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg border border-white/10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-brand-navy/60 hover:bg-brand-navy/90 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg border border-white/10"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Slide navigation indicators (dots) */}
              <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      currentSlide === idx
                        ? "w-8 bg-brand-orange shadow-md"
                        : "w-2 bg-white/70 hover:bg-white"
                    )}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Orange accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-brand-orange z-20" />
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

"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Services } from "@/components/home/Services";
import { Portfolio } from "@/components/home/Portfolio";
import { WhyKriti } from "@/components/home/WhyKriti";
import { Industries } from "@/components/home/Industries";
import { CTA } from "@/components/home/CTA";
import { fetchAPI } from "@/lib/api";

export function HomeClient() {
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    fetchAPI('/stats').then((data) => {
      setStats(data || []);
    });
  }, []);

  return (
    <>
      <Hero stats={stats} />
      <FeaturedProducts />
      <Services />
      <Portfolio />
      <WhyKriti />
      <Industries />
      <CTA />
    </>
  );
}

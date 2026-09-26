import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Services } from "@/components/home/Services";
import { Portfolio } from "@/components/home/Portfolio";
import { WhyKriti } from "@/components/home/WhyKriti";
import { Industries } from "@/components/home/Industries";
import { CTA } from "@/components/home/CTA";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { fetchAPI } from "@/lib/api";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Professional Printing & Packaging in Nepal`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} | Professional Printing & Packaging in Nepal`,
    description: SITE_DESCRIPTION,
  },
};

export default async function HomePage() {
  const stats = (await fetchAPI('/stats')) || [];
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

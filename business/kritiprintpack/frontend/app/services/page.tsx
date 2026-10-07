import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Kriti Print & Pack's packaging services — custom design, sustainable packaging, rapid prototyping, FMCG food-grade production, and large-volume manufacturing.",
};

import { ServicesClient } from "./ServicesClient";

export default function ServicesPage() {
  return <ServicesClient />;
}

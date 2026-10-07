import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Kriti Print & Pack serves FMCG, food & beverage, e-commerce, industrial, pharmaceutical, retail, agriculture, and logistics sectors with custom corrugated packaging solutions.",
};

import { IndustriesClient } from "./IndustriesClient";

export default function IndustriesPage() {
  return <IndustriesClient />;
}

import type { Metadata } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Professional Printing & Packaging in Nepal`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} | Professional Printing & Packaging in Nepal`,
    description: SITE_DESCRIPTION,
  },
};

import { HomeClient } from "./HomeClient";

export default function HomePage() {
  return <HomeClient />;
}

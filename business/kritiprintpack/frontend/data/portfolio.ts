export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: PortfolioCategory;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  year: string;
  isFeatured?: boolean;
}

export type PortfolioCategory =
  | "fmcg"
  | "food-beverage"
  | "industrial"
  | "ecommerce"
  | "retail";

export const PORTFOLIO_CATEGORIES: { value: PortfolioCategory; label: string }[] = [
  { value: "fmcg", label: "FMCG" },
  { value: "food-beverage", label: "Food & Beverage" },
  { value: "industrial", label: "Industrial" },
  { value: "ecommerce", label: "E-Commerce" },
  { value: "retail", label: "Retail" },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    slug: "wai-wai-noodles-master-carton",
    title: "Wai Wai Noodles Master Carton",
    client: "CG Foods (Wai Wai)",
    category: "fmcg",
    description: "Custom 40-pack master carton solution for Nepal's iconic instant noodle brand.",
    fullDescription:
      "Developed a high-volume master carton solution for Wai Wai noodles that accommodates 40 individual noodle packets with zero movement during transit. The tight-fit corrugated geometry reduces internal padding requirements while maintaining burst strength ratings. Full-color flexographic printing accurately reproduces the Wai Wai brand palette across high-speed production runs.",
    image: "/images/portfolio/wai-wai-carton.jpg",
    tags: ["corrugated", "food-grade", "flexographic", "high-volume"],
    year: "2023",
    isFeatured: true,
  },
  {
    id: "2",
    slug: "dhara-sunflower-oil-packaging",
    title: "Dhara Sunflower Oil Packaging",
    client: "Dhara Oils",
    category: "fmcg",
    description: "Heavy-duty 12-bottle carton for 1-liter sunflower oil bottles with reinforced base.",
    fullDescription:
      "Engineered a specialized 12-bottle carrier carton for Dhara 1L sunflower oil bottles. The 5-ply double-wall construction handles up to 14 kg gross weight, with an oil-resistant internal coating that prevents bottle leakage from degrading the structural integrity. Top-load tested at 120 kg to ensure safe warehouse stacking.",
    image: "/images/portfolio/dhara-oil-packaging.jpg",
    tags: ["5-ply", "heavy-duty", "oil-resistant", "corrugated"],
    year: "2023",
    isFeatured: true,
  },
  {
    id: "3",
    slug: "ecommerce-mailer-box-series",
    title: "E-Commerce Mailer Box Series",
    client: "Multiple E-Commerce Brands",
    category: "ecommerce",
    description: "Custom branded self-locking mailer boxes for direct-to-consumer e-commerce shipments.",
    fullDescription:
      "Designed and produced a series of custom mailer boxes for three regional e-commerce businesses. Each series featured unique brand colors, inside printing with brand messaging, and perforated tear strips for easy opening. The self-locking design eliminated tape requirements, reducing packing time and cost for fulfillment centers.",
    image: "/images/portfolio/ecommerce-mailer-boxes.jpg",
    tags: ["mailer-box", "self-locking", "brand-printing", "ecommerce"],
    year: "2024",
    isFeatured: true,
  },
  {
    id: "4",
    slug: "industrial-moving-box-series",
    title: "Industrial Moving Box Series",
    client: "Confidential (Manufacturing Sector)",
    category: "industrial",
    description: "Triple-wall heavy-duty boxes for exporting precision machined parts internationally.",
    fullDescription:
      "Created a series of triple-wall industrial shipping boxes for an international manufacturing export client. The boxes required ECT ratings of 71+ to pass international freight certification, with custom foam insert templates fitted inside each box. Produced 5,000 units in a single run with consistent dimensional tolerances of ±1mm.",
    image: "/images/portfolio/industrial-boxes.jpg",
    tags: ["triple-wall", "export", "industrial", "heavy-duty"],
    year: "2023",
    isFeatured: true,
  },
  {
    id: "5",
    slug: "rumpum-noodles-carton",
    title: "Rum Pum Noodles Master Carton",
    client: "Arun Foods (Rum Pum)",
    category: "food-beverage",
    description: "50-pack noodle master carton with high-fidelity brand color reproduction.",
    fullDescription:
      "Produced master cartons for Rum Pum instant noodles in 50-pack configuration. The design challenge was accurately reproducing the brand's vibrant color scheme in flexographic printing at scale. After color profiling and plate adjustment, we achieved consistent, accurate colors across a run of 50,000 units.",
    image: "/images/portfolio/rumpum-noodles-carton.jpg",
    tags: ["food-packaging", "flexographic", "noodles", "fmcg"],
    year: "2024",
  },
  {
    id: "6",
    slug: "baba-refined-oil-packaging",
    title: "Baba Refined Oil Packaging",
    client: "Baba Oils",
    category: "fmcg",
    description: "Corrugated packaging for 5-liter refined oil containers with handle cutout design.",
    fullDescription:
      "Engineered a 4-pack carton for Baba 5L refined oil containers featuring ergonomic handle cutouts for easy carrying by retailers. The heavy-gauge 5-ply construction with reinforced base handles up to 22 kg per carton. Water-resistant coating applied to protect against condensation in cold-storage environments.",
    image: "/images/portfolio/baba-oil-packaging.jpg",
    tags: ["heavy-duty", "5-ply", "oil-packaging", "handle-cutout"],
    year: "2024",
  },
];

export function getPortfolioItemBySlug(slug: string): PortfolioItem | undefined {
  return portfolioItems.find((p) => p.slug === slug);
}

export function getFeaturedPortfolioItems(): PortfolioItem[] {
  return portfolioItems.filter((p) => p.isFeatured);
}

export function getPortfolioByCategory(category: PortfolioCategory): PortfolioItem[] {
  return portfolioItems.filter((p) => p.category === category);
}

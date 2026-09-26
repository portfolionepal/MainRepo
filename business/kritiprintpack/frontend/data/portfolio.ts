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



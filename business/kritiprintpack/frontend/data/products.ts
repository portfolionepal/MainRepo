export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  category: ProductCategory;
  features: string[];
  applications: string[];
  isFeatured?: boolean;
  specifications?: Record<string, string>;
}

export type ProductCategory =
  | "corrugated-boxes"
  | "fmcg-packaging"
  | "food-packaging"
  | "mailer-boxes"
  | "industrial-packaging"
  | "display-packaging";

export const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: "corrugated-boxes", label: "Corrugated Boxes" },
  { value: "fmcg-packaging", label: "FMCG Packaging" },
  { value: "food-packaging", label: "Food Packaging" },
  { value: "mailer-boxes", label: "Mailer Boxes" },
  { value: "industrial-packaging", label: "Industrial" },
  { value: "display-packaging", label: "Display Packaging" },
];



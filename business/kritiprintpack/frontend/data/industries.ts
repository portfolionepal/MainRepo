export interface Industry {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  products: string[];
  image?: string;
}

export const industries: Industry[] = [
  {
    id: "1",
    slug: "fmcg",
    name: "FMCG",
    description:
      "Fast-moving consumer goods companies rely on us for high-volume, consistent packaging that protects products and represents their brand at scale.",
    icon: "ShoppingCart",
    products: ["Corrugated Master Cartons", "FMCG Packaging Cartons", "Display Boxes"],
  },
  {
    id: "2",
    slug: "food-beverage",
    name: "Food & Beverage",
    description:
      "Food-grade packaging for noodles, snacks, beverages, edible oils, and dairy products with full compliance to food contact regulations.",
    icon: "UtensilsCrossed",
    products: ["Food Packaging Cartons", "Noodle Cartons", "Edible Oil Boxes"],
  },
  {
    id: "3",
    slug: "ecommerce",
    name: "E-Commerce",
    description:
      "Custom mailer boxes and shipping cartons designed for the direct-to-consumer e-commerce experience — strong, branded, and easy to open.",
    icon: "Package",
    products: ["Custom Mailer Boxes", "Eco-Friendly Kraft Boxes", "Display Packaging"],
  },
  {
    id: "4",
    slug: "industrial",
    name: "Industrial & Manufacturing",
    description:
      "Heavy-duty corrugated boxes for industrial equipment, machinery parts, and bulk goods requiring maximum protection during freight and export.",
    icon: "Factory",
    products: ["Industrial Shipping Boxes", "Heavy-Duty Cartons", "Export Packaging"],
  },
  {
    id: "5",
    slug: "pharmaceuticals",
    name: "Pharmaceuticals",
    description:
      "Clean, precise corrugated outer packaging for pharmaceutical distribution — meeting regulatory requirements with dimensional accuracy.",
    icon: "Pill",
    products: ["Corrugated Master Cartons", "Custom Printed Cartons"],
  },
  {
    id: "6",
    slug: "retail",
    name: "Retail & Consumer",
    description:
      "Point-of-sale displays, shelf-ready packaging, and retail cartons that showcase products and drive purchase decisions on the shop floor.",
    icon: "Store",
    products: ["Display Packaging Boxes", "Custom Mailer Boxes", "Retail Cartons"],
  },
  {
    id: "7",
    slug: "agriculture",
    name: "Agriculture & Produce",
    description:
      "Ventilated corrugated boxes and produce packaging for fresh fruit, vegetables, and agricultural exports to regional and international markets.",
    icon: "Sprout",
    products: ["Ventilated Cartons", "Produce Boxes", "Agricultural Packaging"],
  },
  {
    id: "8",
    slug: "logistics",
    name: "Logistics & Distribution",
    description:
      "Standardized shipping boxes, heavy-duty master cartons, and pallet-compatible packaging for third-party logistics and distribution companies.",
    icon: "Truck",
    products: ["Industrial Shipping Boxes", "Master Cartons", "Pallet Packaging"],
  },
];

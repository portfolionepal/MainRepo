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

export const products: Product[] = [
  {
    id: "1",
    slug: "corrugated-master-cartons",
    name: "Corrugated Master Cartons",
    shortDescription:
      "Heavy-duty 3-ply and 5-ply corrugated master cartons for bulk product packaging and distribution.",
    description:
      "Our corrugated master cartons are engineered for superior strength and protection during transit. Available in 3-ply and 5-ply configurations, these cartons are ideal for bulk FMCG packaging, warehouse storage, and long-distance shipping. Each carton is precision-cut using advanced die-cutting machinery and can be custom printed with your branding, product information, and barcodes.",
    image: "/images/products/corrugated-master-cartons.jpg",
    category: "corrugated-boxes",
    isFeatured: true,
    features: [
      "3-ply and 5-ply board options",
      "Burst strength up to 250 kg/cm²",
      "Moisture-resistant coating available",
      "Custom dimensions to the millimeter",
      "High-definition flexographic printing",
      "Eco-friendly kraft paper construction",
    ],
    applications: [
      "FMCG product distribution",
      "Noodle and food packaging",
      "Edible oil bottle packaging",
      "Retail warehouse storage",
      "Export and logistics",
    ],
    specifications: {
      "Board Type": "3-ply / 5-ply corrugated",
      "Flute Type": "B-Flute, C-Flute, E-Flute",
      "Burst Strength": "Up to 250 kg/cm²",
      Printing: "Flexographic up to 4 colors",
      MOQ: "500 units",
    },
  },
  {
    id: "2",
    slug: "custom-printed-mailer-boxes",
    name: "Custom Printed Mailer Boxes",
    shortDescription:
      "Premium mailer boxes with full-color custom printing for e-commerce, gifting, and subscription brands.",
    description:
      "Elevate your unboxing experience with our custom printed mailer boxes. Constructed from high-quality kraft or white corrugated board, these boxes offer a premium feel that makes a lasting impression. Perfect for e-commerce businesses, subscription boxes, and retail brands looking to differentiate their packaging. Available with self-locking tabs — no tape required.",
    image: "/images/products/custom-mailer-boxes.jpg",
    category: "mailer-boxes",
    isFeatured: true,
    features: [
      "Self-locking design — no tape needed",
      "Full-color CMYK printing inside and out",
      "Kraft, white, and custom colored board",
      "Matte, gloss, and soft-touch finishes",
      "Tear strip and perforated options",
      "Recyclable and sustainable materials",
    ],
    applications: [
      "E-commerce product delivery",
      "Subscription boxes",
      "Gift and premium packaging",
      "Cosmetics and beauty products",
      "Electronics accessories",
    ],
    specifications: {
      "Board Type": "2mm–4mm solid board / corrugated",
      Printing: "Offset / Digital CMYK + spot colors",
      Finish: "Matte / Gloss / Soft-touch lamination",
      Closure: "Self-locking / magnetic / tuck-end",
      MOQ: "200 units",
    },
  },
  {
    id: "3",
    slug: "fmcg-food-packaging-cartons",
    name: "FMCG Food Packaging Cartons",
    shortDescription:
      "Food-safe corrugated cartons designed for noodles, snacks, beverages, and other FMCG products.",
    description:
      "Our FMCG food packaging cartons are designed specifically for the fast-moving consumer goods industry. Manufactured to food-safe standards with food-grade inks and coatings, these cartons ensure your products remain protected and compliant throughout the supply chain. Ideal for noodle manufacturers, snack brands, beverage companies, and dairy product packaging.",
    image: "/images/products/fmcg-food-packaging.jpg",
    category: "fmcg-packaging",
    isFeatured: true,
    features: [
      "Food-grade inks and coatings",
      "FDA-compliant materials",
      "Moisture and humidity resistant",
      "Stackable design for efficient warehousing",
      "Barcode and QR code printing ready",
      "Custom inserts and dividers available",
    ],
    applications: [
      "Instant noodle packaging",
      "Snack food packaging",
      "Beverage can multipacks",
      "Dairy product cartons",
      "Biscuit and confectionery packaging",
    ],
    specifications: {
      "Board Type": "3-ply corrugated (food-grade)",
      Printing: "Flexographic food-safe inks",
      Coating: "Food-safe lacquer available",
      Certifications: "Food-grade compliant",
      MOQ: "1,000 units",
    },
  },
  {
    id: "4",
    slug: "edible-oil-packaging-boxes",
    name: "Edible Oil Packaging Boxes",
    shortDescription:
      "Heavy-duty packaging cartons specially designed to hold edible oil bottles and containers securely.",
    description:
      "Designed to withstand the weight and bulk of edible oil bottles, our specialized oil packaging cartons provide exceptional load-bearing capacity and structural rigidity. The precision-engineered internal structure securely holds multiple bottles, preventing movement and breakage during transport. Available for 1L, 2L, and 5L bottle configurations.",
    image: "/images/products/edible-oil-packaging.jpg",
    category: "fmcg-packaging",
    isFeatured: true,
    features: [
      "Reinforced base and sidewalls",
      "Oil-resistant interior coating",
      "Configurable bottle count (6, 12, 24 pack)",
      "Top-load tested to 150 kg",
      "Custom branding and product info printing",
      "Handle cutout options",
    ],
    applications: [
      "Refined sunflower oil packaging",
      "Mustard oil bottle packaging",
      "Palm oil containers",
      "Cooking oil distribution",
      "Restaurant bulk supply packaging",
    ],
    specifications: {
      "Board Type": "5-ply heavy-duty corrugated",
      "Load Capacity": "Up to 30 kg per carton",
      Configuration: "6-pack / 12-pack / 24-pack",
      Printing: "Flexographic 4-color",
      MOQ: "500 units",
    },
  },
  {
    id: "5",
    slug: "industrial-shipping-boxes",
    name: "Industrial Shipping Boxes",
    shortDescription:
      "Heavy-duty industrial grade shipping boxes for manufacturing, logistics, and export operations.",
    description:
      "Our industrial shipping boxes are built for the toughest logistics environments. Engineered with high burst strength and edge crush resistance, these boxes protect heavy machinery parts, industrial equipment, and bulk goods during long-distance freight and export. Available in double-wall and triple-wall configurations for maximum protection.",
    image: "/images/products/industrial-shipping-boxes.jpg",
    category: "industrial-packaging",
    features: [
      "Double-wall and triple-wall construction",
      "Edge Crush Test (ECT) rated",
      "Heavy-duty stapled or glued joints",
      "Weatherproof moisture barrier",
      "Pallet-compatible dimensions",
      "Custom stencil printing available",
    ],
    applications: [
      "Machinery parts export packaging",
      "Industrial goods logistics",
      "Automotive components shipping",
      "Electronics export packaging",
      "Factory-to-warehouse bulk movement",
    ],
    specifications: {
      "Board Type": "Double-wall / Triple-wall corrugated",
      "ECT Rating": "44 to 71 ECT",
      "Max Load": "Up to 100 kg",
      Printing: "Stencil / basic flexographic",
      MOQ: "200 units",
    },
  },
  {
    id: "6",
    slug: "display-packaging-boxes",
    name: "Display Packaging Boxes",
    shortDescription:
      "Retail-ready display boxes with vivid printing that showcase products on store shelves and POS displays.",
    description:
      "Make your products stand out on retail shelves with our eye-catching display packaging boxes. Designed for point-of-sale displays, countertop units, and shelf-ready packaging, these boxes combine premium printing with structural display functionality.",
    image: "/images/products/display-packaging-boxes.jpg",
    category: "display-packaging",
    features: [
      "Open-front display design",
      "High-definition CMYK printing",
      "Retail-ready shelf placement",
      "Perforated tear-off display conversion",
      "Countertop and floor-standing options",
      "Custom window cutouts",
    ],
    applications: [
      "Retail shelf displays",
      "POS countertop displays",
      "Promotional product packaging",
      "Cosmetics and beauty retail",
      "Confectionery display packaging",
    ],
    specifications: {
      "Board Type": "3-ply display board",
      Printing: "Offset / flexographic high-resolution",
      Finish: "Gloss / matte lamination",
      Display: "Countertop / floor-standing",
      MOQ: "300 units",
    },
  },
  {
    id: "7",
    slug: "noodle-packaging-cartons",
    name: "Noodle Packaging Cartons",
    shortDescription:
      "Specialized cartons for instant noodle manufacturers with optimized stacking and branding options.",
    description:
      "Specifically engineered for Nepal's instant noodle industry, our noodle packaging cartons are designed to the exact specifications required by major noodle brands. With optimized internal geometry for 30, 40, and 50 pack configurations, these cartons minimize material waste while maximizing stacking efficiency.",
    image: "/images/products/noodle-packaging-cartons.jpg",
    category: "food-packaging",
    isFeatured: true,
    features: [
      "Optimized for 30/40/50 pack noodle packets",
      "Tight-fit internal geometry reduces movement",
      "Compatible with major FMCG brands",
      "High-fidelity brand color printing",
      "Ventilation holes for freshness",
      "Recyclable materials",
    ],
    applications: [
      "Instant noodle bulk packaging",
      "Cup noodle cartons",
      "Noodle export packaging",
      "FMCG distribution packaging",
    ],
    specifications: {
      "Pack Size": "30, 40, 50, 60 packs per carton",
      "Board Type": "3-ply corrugated",
      Printing: "Flexographic 4-color",
      Certification: "Food-grade",
      MOQ: "1,000 units",
    },
  },
  {
    id: "8",
    slug: "eco-friendly-kraft-boxes",
    name: "Eco-Friendly Kraft Boxes",
    shortDescription:
      "100% recyclable and biodegradable kraft packaging boxes for environmentally conscious brands.",
    description:
      "Our eco-friendly kraft boxes are crafted from 100% recycled and sustainably sourced kraft paper, offering brands a genuine green packaging solution without compromising on quality or printability.",
    image: "/images/products/eco-friendly-kraft-boxes.jpg",
    category: "mailer-boxes",
    features: [
      "100% recycled and recyclable kraft board",
      "FSC-certified materials available",
      "Soy-based and water-based inks",
      "Naturally biodegradable",
      "Unbleached natural brown finish",
      "Compostable options available",
    ],
    applications: [
      "Organic food product packaging",
      "Natural and eco cosmetics",
      "Artisan and handcraft brands",
      "Farmers market retail packaging",
      "Restaurant takeaway packaging",
    ],
    specifications: {
      Material: "Recycled kraft board",
      Certification: "FSC / PEFC available",
      Inks: "Soy-based / water-based",
      Finish: "Uncoated natural / minimal coating",
      MOQ: "300 units",
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

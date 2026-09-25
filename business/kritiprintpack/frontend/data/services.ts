export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  icon: string;
  process: ProcessStep[];
  benefits: string[];
  isFeatured?: boolean;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    id: "1",
    slug: "custom-packaging-design",
    name: "Custom Packaging Design & Production",
    shortDescription:
      "End-to-end custom packaging from initial concept and structural design through full-volume production.",
    description:
      "We work closely with your team to develop packaging that perfectly represents your brand and protects your products. Our in-house design team creates structural prototypes, tests for durability, and refines the design until it's exactly right — then scales to full production volume with consistent quality.",
    image: "/images/services/custom-packaging-design.jpg",
    icon: "PenTool",
    isFeatured: true,
    process: [
      { step: 1, title: "Brief & Requirements", description: "We gather your product dimensions, weight, branding guidelines, and distribution requirements." },
      { step: 2, title: "Structural Design", description: "Our designers create box structures optimized for protection, material efficiency, and shelf appeal." },
      { step: 3, title: "Prototype & Sample", description: "A physical prototype is produced for your review, testing, and approval." },
      { step: 4, title: "Production Run", description: "Full-volume production with rigorous quality control at every stage." },
      { step: 5, title: "Delivery", description: "On-time delivery to your warehouse or distribution center." },
    ],
    benefits: [
      "Dedicated packaging engineer assigned to your project",
      "Rapid prototyping — samples within 5-7 business days",
      "No minimum order for sampling",
      "Structural design optimized for your supply chain",
    ],
  },
  {
    id: "2",
    slug: "sustainable-packaging",
    name: "Sustainable & Eco-Friendly Packaging",
    shortDescription:
      "Environmentally responsible packaging solutions using recycled, recyclable, and biodegradable materials.",
    description:
      "As sustainability becomes a brand imperative, we help companies transition to greener packaging without sacrificing performance or printability. Our eco-range uses FSC-certified materials, soy-based inks, and minimal-waste structural designs to reduce your environmental footprint.",
    image: "/images/services/sustainable-packaging.jpg",
    icon: "Leaf",
    isFeatured: true,
    process: [
      { step: 1, title: "Sustainability Audit", description: "We assess your current packaging and identify opportunities for greener alternatives." },
      { step: 2, title: "Material Selection", description: "Choose from recycled kraft, FSC-certified board, biodegradable coatings, and soy inks." },
      { step: 3, title: "Design Optimization", description: "Right-size your packaging to eliminate excess material and reduce shipping weight." },
      { step: 4, title: "Certification Support", description: "We help you document material certifications for your sustainability reports." },
    ],
    benefits: [
      "FSC-certified and PEFC-certified board options",
      "Soy-based and water-based printing inks",
      "100% recyclable end products",
      "Reduced packaging weight without compromising strength",
    ],
  },
  {
    id: "3",
    slug: "rapid-prototyping-sampling",
    name: "Rapid Prototyping & Sampling",
    shortDescription:
      "Fast physical prototypes and pre-production samples so you can test, validate, and approve packaging before committing to a production run.",
    description:
      "Speed to market matters. Our rapid prototyping service delivers physical samples within 5–7 business days so your product development team can test fit, feel, and function before ordering full production quantities. We use the same materials and printing methods as production to ensure complete accuracy.",
    image: "/images/services/rapid-prototyping.jpg",
    icon: "Zap",
    isFeatured: true,
    process: [
      { step: 1, title: "Design Submission", description: "Submit your artwork files or brief and we'll prepare the sample layout." },
      { step: 2, title: "Sample Production", description: "Physical samples produced on production-grade equipment within 5–7 days." },
      { step: 3, title: "Review & Feedback", description: "Review the sample and request any adjustments needed." },
      { step: 4, title: "Approval & Production", description: "Once approved, we proceed directly to full production." },
    ],
    benefits: [
      "Samples in 5–7 business days",
      "No minimum quantity for samples",
      "Production-accurate materials and print",
      "Multiple sample revisions included",
    ],
  },
  {
    id: "4",
    slug: "fmcg-food-grade-packaging",
    name: "FMCG & Food Grade Packaging",
    shortDescription:
      "Specialist food-safe packaging for FMCG brands, meeting all food contact material requirements.",
    description:
      "Food packaging requires more than good looks — it must meet stringent safety standards and protect product freshness. Our food-grade packaging line uses approved inks, coatings, and board grades that comply with food contact material regulations, ensuring your product reaches consumers safely.",
    image: "/images/services/fmcg-packaging.jpg",
    icon: "ShieldCheck",
    process: [
      { step: 1, title: "Compliance Review", description: "We review your food contact requirements and applicable regulations." },
      { step: 2, title: "Material Specification", description: "Select from our range of food-grade approved boards, inks, and coatings." },
      { step: 3, title: "Production & Testing", description: "Production with quality testing for moisture resistance and structural integrity." },
      { step: 4, title: "Documentation", description: "Full material certificates and compliance documentation provided." },
    ],
    benefits: [
      "Food contact material compliant",
      "Odor-free inks and coatings",
      "Moisture and humidity resistance",
      "Full traceability documentation",
    ],
  },
  {
    id: "5",
    slug: "large-volume-manufacturing",
    name: "Large Volume Manufacturing",
    shortDescription:
      "High-capacity production runs with consistent quality for brands with large-scale packaging requirements.",
    description:
      "With our high-capacity corrugated board production lines, we can handle large-volume orders without compromising on quality or lead times. Our automated production ensures consistent dimensions, print quality, and structural integrity across every unit in your order.",
    image: "/images/services/large-volume-manufacturing.jpg",
    icon: "Factory",
    process: [
      { step: 1, title: "Volume Assessment", description: "We review your annual volume requirements and create an optimal production schedule." },
      { step: 2, title: "Pre-Production Setup", description: "Die-cutting tools, printing plates, and quality benchmarks established." },
      { step: 3, title: "Production", description: "Continuous production run with inline quality monitoring." },
      { step: 4, title: "QC & Dispatch", description: "Final quality inspection, palletization, and delivery to your facility." },
    ],
    benefits: [
      "Capacity for millions of units annually",
      "Competitive pricing at scale",
      "Consistent quality across large runs",
      "Scheduled production for predictable inventory",
    ],
  },
  {
    id: "6",
    slug: "brand-print-consultation",
    name: "Brand & Print Consultation",
    shortDescription:
      "Expert guidance on optimizing your packaging design for maximum print quality, cost-efficiency, and shelf impact.",
    description:
      "Our experienced print and packaging specialists work with your marketing and supply chain teams to optimize every aspect of your packaging program — from artwork preparation and color management to structural design and cost reduction without quality compromise.",
    image: "/images/services/brand-consultation.jpg",
    icon: "Lightbulb",
    process: [
      { step: 1, title: "Current Packaging Review", description: "We analyze your existing packaging for quality, cost, and improvement opportunities." },
      { step: 2, title: "Recommendations", description: "Detailed recommendations covering materials, print, structure, and cost savings." },
      { step: 3, title: "Implementation", description: "We help you implement the recommended changes with minimal disruption." },
      { step: 4, title: "Ongoing Support", description: "Continued support as your product range evolves." },
    ],
    benefits: [
      "Artwork optimization for flexographic printing",
      "Color management and brand consistency",
      "Cost reduction without quality compromise",
      "Packaging consolidation strategies",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getFeaturedServices(): Service[] {
  return services.filter((s) => s.isFeatured);
}

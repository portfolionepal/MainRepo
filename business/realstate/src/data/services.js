import { 
  Building, 
  Map, 
  Droplet, 
  Road, 
  Trees, 
  FileText 
} from 'lucide-react';

export const services = [
  {
    id: 1,
    title: "Land Purchase & Sale Assistance",
    description: "Guidance and documentation support for buying and selling land parcels securely with due diligence.",
    detailedFeatures: [
      "Title search and verification",
      "Field measurement and area calculation",
      "Property valuation assessment",
      "Documentation support for land transfer",
      "Dispute resolution and boundary settlement"
    ],
    fullDescription: "We provide comprehensive end-to-end support for individuals and businesses looking to buy or sell land. Our team ensures that all land transactions are secure, legally compliant, and accurately measured. We conduct thorough due diligence, including title searches and field verifications, to protect your investments and prevent future disputes.",
    icon: Building,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000"
  },
  {
    id: 2,
    title: "Land & Property Consultation",
    description: "Expert advice on land value, legal verification, property feasibility, boundaries, and ownership questions.",
    detailedFeatures: [
      "Feasibility studies for construction",
      "Land use and zoning consultation",
      "Legal and regulatory compliance checks",
      "Boundary dispute consultation",
      "Investment and development advice"
    ],
    fullDescription: "Navigating the complexities of land ownership and development requires expert guidance. We offer specialized consultation services to help you understand land values, resolve boundary conflicts, and determine the feasibility of your property for various types of development. Our deep knowledge of local regulations ensures you make informed decisions.",
    icon: Map,
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1000"
  },
  {
    id: 3,
    title: "Hydropower Project Survey",
    description: "Specialized surveying for hydropower projects including topographic, contour, and feasibility surveys.",
    detailedFeatures: [
      "High-precision topographic mapping",
      "River cross-section and profile leveling",
      "Dam site and powerhouse layout marking",
      "Transmission line route surveying",
      "Geodetic control establishment"
    ],
    fullDescription: "Hydropower development requires extreme precision. We utilize advanced electronic distance measurement (EDM) and total station technology to conduct detailed topographic and contour surveys for hydropower sites. From preliminary feasibility mapping to final construction layout, our data ensures your infrastructure is planned on a solid, accurate foundation.",
    icon: Droplet,
    image: "https://images.unsplash.com/photo-1544441892-794166f1e3fd?q=80&w=1000"
  },
  {
    id: 4,
    title: "Road Survey",
    description: "Accurate road alignment, contour mapping, and terrain analysis for new road design and existing road assessment.",
    detailedFeatures: [
      "Route alignment and center-line marking",
      "Cross-section and longitudinal profiling",
      "Earthwork volume calculation (Cut & Fill)",
      "Bridge and culvert site surveying",
      "As-built road surveys"
    ],
    fullDescription: "Whether it's a local access road or a major highway, accurate terrain analysis is critical. Our road surveying services provide the detailed topographic data required by engineers to design safe, cost-effective alignments. We also offer earthwork volume calculations to help contractors accurately estimate cut-and-fill requirements.",
    icon: Road,
    image: "https://images.unsplash.com/photo-1542152862-2432d01a3ce2?q=80&w=1000"
  },
  {
    id: 5,
    title: "Park & Public Land Survey",
    description: "Survey services for parks, public spaces, community land, and government development projects.",
    detailedFeatures: [
      "Public land demarcation and fencing lines",
      "Landscape and park planning topography",
      "Community forest boundary mapping",
      "Encroachment assessment and reporting",
      "Master plan baseline surveys"
    ],
    fullDescription: "We partner with local municipalities, communities, and landscape architects to survey public lands for development and protection. Our surveys provide the baseline mapping required for designing public parks, recreational areas, and community forests, while also helping to identify and resolve issues of land encroachment.",
    icon: Trees,
    image: "https://images.unsplash.com/photo-1502014822147-1aedfb0676e0?q=80&w=1000"
  },
  {
    id: 6,
    title: "Cadastral Survey",
    description: "Precise measurement and mapping of land boundaries for legal documentation and registration with land record offices.",
    detailedFeatures: [
      "Official boundary determination",
      "Subdivision of land parcels (Kitta Kat)",
      "Area discrepancy resolution",
      "Blue-print map preparation",
      "Coordination with government survey offices"
    ],
    fullDescription: "Cadastral surveys are essential for defining legal property boundaries and securing land tenure. We conduct precise measurements to create accurate maps that comply with the standards set by government land record offices. Whether you are subdividing a plot or resolving an area discrepancy, our surveys provide legally defensible results.",
    icon: FileText,
    image: "https://images.unsplash.com/photo-1616421045958-3d1cdfb5bbce?q=80&w=1000"
  }
];

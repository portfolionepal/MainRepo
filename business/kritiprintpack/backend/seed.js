// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
// const bcrypt = require('bcrypt');

// const seedData = async () => {
//   try {
//     console.log('Cleaning up existing data...');
//     await prisma.companyStat.deleteMany();
//     await prisma.whyChooseUs.deleteMany();
//     await prisma.product.deleteMany();
//     await prisma.service.deleteMany();
//     await prisma.portfolio.deleteMany();
//     await prisma.industry.deleteMany();
//     await prisma.contactInfo.deleteMany();
    
//     // We do not delete admin users here so we don't accidentally remove actual admin credentials,
//     // but you can uncomment this if you want a fresh start
//     // await prisma.adminUser.deleteMany();

//     console.log('Seeding Contact Info...');
//     await prisma.contactInfo.create({
//       data: {
//         name: "Kriti Print & Pack Industries",
//         address: "Katahari, Biratnagar, Morang, Province No. 1, Nepal",
//         phone: "+977-21-XXXXXX",
//         mobile: "+977-98XXXXXXXX",
//         email: "info@kritiprintpack.com",
//         mapUrl: "https://maps.google.com/?q=Katahari,Biratnagar,Nepal",
//         facebookUrl: "https://www.facebook.com/kritiprintpack",
//         twitterUrl: "https://twitter.com/kritiprintpack",
//         linkedinUrl: "https://www.linkedin.com/company/kritiprintpack",
//         workingHours: "Sun – Fri: 9:00 AM – 6:00 PM"
//       }
//     });

//     console.log('Seeding Company Stats...');
//     const stats = [
//       { value: "15+", label: "Years of Experience", order: 1 },
//       { value: "500+", label: "Products Delivered", order: 2 },
//       { value: "200+", label: "Happy Clients", order: 3 },
//       { value: "50M+", label: "Units Produced", order: 4 },
//     ];
//     await prisma.companyStat.createMany({ data: stats });

//     console.log('Seeding Why Choose Us...');
//     const reasons = [
//       { icon: "Award", title: "Uncompromising Quality", description: "Every carton leaves our facility after rigorous quality inspection. We maintain consistent burst strength, dimensional accuracy, and print fidelity across every production run.", order: 1 },
//       { icon: "Clock", title: "Reliable Lead Times", description: "We understand that your production schedule depends on your packaging supply. Our production planning ensures on-time delivery, even for large-volume orders.", order: 2 },
//       { icon: "Cog", title: "Custom-Made Solutions", description: "No two businesses are identical. We work with you to engineer packaging that fits your product, brand, and supply chain — not just a catalog item.", order: 3 },
//       { icon: "Users", title: "Dedicated Account Support", description: "A dedicated account manager works with you from initial brief through production and delivery, ensuring smooth communication throughout your project.", order: 4 },
//       { icon: "TrendingUp", title: "Scalable Capacity", description: "From prototype runs to millions of units, our facility scales with your business. Start small and grow your packaging program without changing suppliers.", order: 5 },
//       { icon: "CheckCircle", title: "15+ Years of Experience", description: "Since our founding, we've delivered packaging for hundreds of FMCG, food, and industrial clients across Nepal. Our experience protects your investment.", order: 6 },
//     ];
//     await prisma.whyChooseUs.createMany({ data: reasons });

//     console.log('Seeding Products...');
//     const products = [
//       {
//         slug: "corrugated-master-cartons",
//         name: "Corrugated Master Cartons",
//         shortDescription: "Heavy-duty 3-ply and 5-ply corrugated master cartons for bulk product packaging and distribution.",
//         description: "Our corrugated master cartons are engineered for superior strength and protection during transit. Available in 3-ply and 5-ply configurations...",
//         image: "/images/products/corrugated-master-cartons.jpg",
//         category: "corrugated-boxes",
//         isFeatured: true,
//         features: ["3-ply and 5-ply board options", "Burst strength up to 250 kg/cm²", "Moisture-resistant coating available"],
//         applications: ["FMCG product distribution", "Noodle and food packaging", "Retail warehouse storage"],
//         specifications: { "Board Type": "3-ply / 5-ply corrugated", "Burst Strength": "Up to 250 kg/cm²", "MOQ": "500 units" }
//       },
//       {
//         slug: "custom-printed-mailer-boxes",
//         name: "Custom Printed Mailer Boxes",
//         shortDescription: "Premium mailer boxes with full-color custom printing for e-commerce, gifting, and subscription brands.",
//         description: "Elevate your unboxing experience with our custom printed mailer boxes. Constructed from high-quality kraft or white corrugated board...",
//         image: "/images/products/custom-mailer-boxes.jpg",
//         category: "mailer-boxes",
//         isFeatured: true,
//         features: ["Self-locking design — no tape needed", "Full-color CMYK printing inside and out", "Recyclable and sustainable materials"],
//         applications: ["E-commerce product delivery", "Subscription boxes", "Gift and premium packaging"],
//         specifications: { "Board Type": "2mm–4mm solid board / corrugated", "Printing": "Offset / Digital CMYK + spot colors", "MOQ": "200 units" }
//       },
//       {
//         slug: "fmcg-food-packaging-cartons",
//         name: "FMCG Food Packaging Cartons",
//         shortDescription: "Food-safe corrugated cartons designed for noodles, snacks, beverages, and other FMCG products.",
//         description: "Our FMCG food packaging cartons are designed specifically for the fast-moving consumer goods industry. Manufactured to food-safe standards...",
//         image: "/images/products/fmcg-food-packaging.jpg",
//         category: "fmcg-packaging",
//         isFeatured: true,
//         features: ["Food-grade inks and coatings", "FDA-compliant materials", "Moisture and humidity resistant"],
//         applications: ["Instant noodle packaging", "Snack food packaging", "Dairy product cartons"],
//         specifications: { "Board Type": "3-ply corrugated (food-grade)", "Printing": "Flexographic food-safe inks", "MOQ": "1,000 units" }
//       },
//       {
//         slug: "edible-oil-packaging-boxes",
//         name: "Edible Oil Packaging Boxes",
//         shortDescription: "Heavy-duty packaging cartons specially designed to hold edible oil bottles and containers securely.",
//         description: "Designed to withstand the weight and bulk of edible oil bottles, our specialized oil packaging cartons provide exceptional load-bearing capacity...",
//         image: "/images/products/edible-oil-packaging.jpg",
//         category: "fmcg-packaging",
//         isFeatured: true,
//         features: ["Reinforced base and sidewalls", "Oil-resistant interior coating", "Configurable bottle count (6, 12, 24 pack)"],
//         applications: ["Refined sunflower oil packaging", "Mustard oil bottle packaging", "Cooking oil distribution"],
//         specifications: { "Board Type": "5-ply heavy-duty corrugated", "Load Capacity": "Up to 30 kg per carton", "MOQ": "500 units" }
//       },
//       {
//         slug: "industrial-shipping-boxes",
//         name: "Industrial Shipping Boxes",
//         shortDescription: "Heavy-duty industrial grade shipping boxes for manufacturing, logistics, and export operations.",
//         description: "Our industrial shipping boxes are built for the toughest logistics environments. Engineered with high burst strength and edge crush resistance...",
//         image: "/images/products/industrial-shipping-boxes.jpg",
//         category: "industrial-packaging",
//         isFeatured: false,
//         features: ["Double-wall and triple-wall construction", "Edge Crush Test (ECT) rated", "Heavy-duty stapled or glued joints"],
//         applications: ["Machinery parts export packaging", "Industrial goods logistics", "Automotive components shipping"],
//         specifications: { "Board Type": "Double-wall / Triple-wall corrugated", "ECT Rating": "44 to 71 ECT", "MOQ": "200 units" }
//       },
//       {
//         slug: "display-packaging-boxes",
//         name: "Display Packaging Boxes",
//         shortDescription: "Retail-ready display boxes with vivid printing that showcase products on store shelves and POS displays.",
//         description: "Make your products stand out on retail shelves with our eye-catching display packaging boxes. Designed for point-of-sale displays...",
//         image: "/images/products/display-packaging-boxes.jpg",
//         category: "display-packaging",
//         isFeatured: false,
//         features: ["Open-front display design", "High-definition CMYK printing", "Retail-ready shelf placement"],
//         applications: ["Retail shelf displays", "POS countertop displays", "Promotional product packaging"],
//         specifications: { "Board Type": "3-ply display board", "Printing": "Offset / flexographic high-resolution", "MOQ": "300 units" }
//       },
//       {
//         slug: "noodle-packaging-cartons",
//         name: "Noodle Packaging Cartons",
//         shortDescription: "Specialized cartons for instant noodle manufacturers with optimized stacking and branding options.",
//         description: "Specifically engineered for Nepal's instant noodle industry, our noodle packaging cartons are designed to the exact specifications...",
//         image: "/images/products/noodle-packaging-cartons.jpg",
//         category: "food-packaging",
//         isFeatured: true,
//         features: ["Optimized for 30/40/50 pack noodle packets", "Tight-fit internal geometry reduces movement", "Compatible with major FMCG brands"],
//         applications: ["Instant noodle bulk packaging", "Cup noodle cartons", "Noodle export packaging"],
//         specifications: { "Pack Size": "30, 40, 50, 60 packs per carton", "Board Type": "3-ply corrugated", "MOQ": "1,000 units" }
//       },
//       {
//         slug: "eco-friendly-kraft-boxes",
//         name: "Eco-Friendly Kraft Boxes",
//         shortDescription: "100% recyclable and biodegradable kraft packaging boxes for environmentally conscious brands.",
//         description: "Our eco-friendly kraft boxes are crafted from 100% recycled and sustainably sourced kraft paper, offering brands a genuine green packaging solution...",
//         image: "/images/products/eco-friendly-kraft-boxes.jpg",
//         category: "mailer-boxes",
//         isFeatured: false,
//         features: ["100% recycled and recyclable kraft board", "FSC-certified materials available", "Soy-based and water-based inks"],
//         applications: ["Organic food product packaging", "Natural and eco cosmetics", "Artisan and handcraft brands"],
//         specifications: { "Material": "Recycled kraft board", "Certification": "FSC / PEFC available", "MOQ": "300 units" }
//       }
//     ];
//     for (const p of products) {
//       await prisma.product.create({ data: p });
//     }

//     console.log('Seeding Services...');
//     const services = [
//       {
//         slug: "custom-packaging-design",
//         name: "Custom Packaging Design & Production",
//         shortDescription: "End-to-end custom packaging from initial concept and structural design through full-volume production.",
//         description: "We work closely with your team to develop packaging that perfectly represents your brand...",
//         image: "/images/services/custom-packaging-design.jpg",
//         icon: "PenTool",
//         isFeatured: true,
//         process: [{ step: 1, title: "Brief & Requirements", description: "We gather your product dimensions, weight, branding guidelines, and distribution requirements." }],
//         benefits: ["Dedicated packaging engineer assigned to your project", "Rapid prototyping — samples within 5-7 business days"]
//       },
//       {
//         slug: "sustainable-packaging",
//         name: "Sustainable & Eco-Friendly Packaging",
//         shortDescription: "Environmentally responsible packaging solutions using recycled, recyclable, and biodegradable materials.",
//         description: "As sustainability becomes a brand imperative, we help companies transition to greener packaging...",
//         image: "/images/services/sustainable-packaging.jpg",
//         icon: "Leaf",
//         isFeatured: true,
//         process: [{ step: 1, title: "Sustainability Audit", description: "We assess your current packaging and identify opportunities for greener alternatives." }],
//         benefits: ["FSC-certified and PEFC-certified board options", "Soy-based and water-based printing inks"]
//       },
//       {
//         slug: "rapid-prototyping-sampling",
//         name: "Rapid Prototyping & Sampling",
//         shortDescription: "Fast physical prototypes and pre-production samples so you can test, validate, and approve packaging...",
//         description: "Speed to market matters. Our rapid prototyping service delivers physical samples within 5–7 business days...",
//         image: "/images/services/rapid-prototyping.jpg",
//         icon: "Zap",
//         isFeatured: true,
//         process: [{ step: 1, title: "Design Submission", description: "Submit your artwork files or brief and we'll prepare the sample layout." }],
//         benefits: ["Samples in 5–7 business days", "No minimum quantity for samples"]
//       }
//     ];
//     for (const s of services) {
//       await prisma.service.create({ data: s });
//     }

//     console.log('Seeding Portfolio...');
//     const portfolio = [
//       {
//         slug: "wai-wai-noodles-master-carton",
//         title: "Wai Wai Noodles Master Carton",
//         client: "CG Foods (Wai Wai)",
//         category: "fmcg",
//         description: "Custom 40-pack master carton solution for Nepal's iconic instant noodle brand.",
//         fullDescription: "Developed a high-volume master carton solution for Wai Wai noodles that accommodates 40 individual noodle packets...",
//         image: "/images/portfolio/wai-wai-carton.jpg",
//         tags: ["corrugated", "food-grade", "flexographic", "high-volume"],
//         year: "2023",
//         isFeatured: true
//       },
//       {
//         slug: "dhara-sunflower-oil-packaging",
//         title: "Dhara Sunflower Oil Packaging",
//         client: "Dhara Oils",
//         category: "fmcg",
//         description: "Heavy-duty 12-bottle carton for 1-liter sunflower oil bottles with reinforced base.",
//         fullDescription: "Engineered a specialized 12-bottle carrier carton for Dhara 1L sunflower oil bottles. The 5-ply double-wall construction...",
//         image: "/images/portfolio/dhara-oil-packaging.jpg",
//         tags: ["5-ply", "heavy-duty", "oil-resistant", "corrugated"],
//         year: "2023",
//         isFeatured: true
//       }
//     ];
//     for (const p of portfolio) {
//       await prisma.portfolio.create({ data: p });
//     }

//     console.log('Seeding Industries...');
//     const industries = [
//       {
//         slug: "fmcg",
//         name: "FMCG",
//         description: "Fast-moving consumer goods companies rely on us for high-volume, consistent packaging that protects products and represents their brand at scale.",
//         icon: "ShoppingCart",
//         products: ["Corrugated Master Cartons", "FMCG Packaging Cartons", "Display Boxes"]
//       },
//       {
//         slug: "food-beverage",
//         name: "Food & Beverage",
//         description: "Food-grade packaging for noodles, snacks, beverages, edible oils, and dairy products with full compliance to food contact regulations.",
//         icon: "UtensilsCrossed",
//         products: ["Food Packaging Cartons", "Noodle Cartons", "Edible Oil Boxes"]
//       }
//     ];
//     for (const ind of industries) {
//       await prisma.industry.create({ data: ind });
//     }

//     console.log('Seeding successful!');
//     process.exit(0);
//   } catch (error) {
//     console.error('Error seeding data:', error);
//     process.exit(1);
//   }
// };

// seedData();

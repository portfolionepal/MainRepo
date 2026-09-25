import Link from "next/link";
import Image from "next/image";
import {
  Package,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { COMPANY_INFO, NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { Container } from "@/components/ui/Container";

const PRODUCT_LINKS = [
  { label: "Corrugated Master Cartons", href: "/products/corrugated-master-cartons" },
  { label: "Custom Mailer Boxes", href: "/products/custom-printed-mailer-boxes" },
  { label: "FMCG Food Packaging", href: "/products/fmcg-food-packaging-cartons" },
  { label: "Edible Oil Packaging", href: "/products/edible-oil-packaging-boxes" },
  { label: "Industrial Shipping Boxes", href: "/products/industrial-shipping-boxes" },
  { label: "Eco-Friendly Kraft Boxes", href: "/products/eco-friendly-kraft-boxes" },
];

const SERVICE_LINKS = [
  { label: "Custom Packaging Design", href: "/services/custom-packaging-design" },
  { label: "Sustainable Packaging", href: "/services/sustainable-packaging" },
  { label: "Rapid Prototyping", href: "/services/rapid-prototyping-sampling" },
  { label: "FMCG & Food Grade", href: "/services/fmcg-food-grade-packaging" },
  { label: "Large Volume Manufacturing", href: "/services/large-volume-manufacturing" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy-dark text-brand-gray">
      {/* Main Footer */}
      <Container as="div" className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-5">
              <Image 
                src="/logo.png" 
                alt="Kriti Print & Pack Logo" 
                width={240} 
                height={64} 
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-brand-gray text-sm leading-relaxed mb-6">
              Professional printing and packaging solutions for FMCG, food, industrial, and
              e-commerce sectors across Nepal and the region.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                <span className="text-sm text-brand-gray">{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <span className="text-sm text-brand-gray">{COMPANY_INFO.mobile}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-sm text-brand-gray hover:text-brand-blue transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-blue flex-shrink-0" />
                <span className="text-sm text-brand-gray">{COMPANY_INFO.workingHours}</span>
              </div>
            </div>
            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <a
                href={COMPANY_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-9 h-9 bg-brand-gray-dark/5 rounded-md flex items-center justify-center hover:bg-brand-blue transition-colors"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-brand-gray-dark group-hover:fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={COMPANY_INFO.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-9 h-9 bg-brand-gray-dark/5 rounded-md flex items-center justify-center hover:bg-brand-blue transition-colors"
                aria-label="X (Twitter)"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-brand-gray-dark group-hover:fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={COMPANY_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-9 h-9 bg-brand-gray-dark/5 rounded-md flex items-center justify-center hover:bg-brand-blue transition-colors"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-brand-gray-dark group-hover:fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-brand-gray-dark font-semibold text-sm tracking-wider uppercase mb-5">
              Products
            </h3>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-gray hover:text-brand-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-brand-gray-dark font-semibold text-sm tracking-wider uppercase mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-gray hover:text-brand-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-brand-gray-dark font-semibold text-sm tracking-wider uppercase mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-gray hover:text-brand-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/request-quote"
                  className="text-sm text-brand-orange hover:text-brand-orange-dark font-medium transition-colors"
                >
                  Request a Quote →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-brand-gray-dark/10">
        <Container as="div" className="py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-brand-gray">
            <p>
              &copy; {currentYear} {SITE_NAME}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/contact" className="hover:text-brand-blue transition-colors">
                Contact Us
              </Link>
              <Link href="/request-quote" className="hover:text-brand-blue transition-colors">
                Get a Quote
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

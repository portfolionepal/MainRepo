"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Package,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { COMPANY_INFO as DEFAULT_COMPANY_INFO, NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { fetchAPI } from "@/lib/api";
import { useEffect, useState } from "react";
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
  const [COMPANY_INFO, setCompanyInfo] = useState(DEFAULT_COMPANY_INFO);

  useEffect(() => {
    fetchAPI('/contact').then(data => {
      if (data) {
        setCompanyInfo({
          ...DEFAULT_COMPANY_INFO,
          ...data,
          social: {
            ...DEFAULT_COMPANY_INFO.social,
            facebook: data.facebookUrl || DEFAULT_COMPANY_INFO.social.facebook,
            whatsapp: data.whatsappUrl || DEFAULT_COMPANY_INFO.social.whatsapp,
            instagram: data.instagramUrl || DEFAULT_COMPANY_INFO.social.instagram,
          }
        });
      }
    });
  }, []);

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

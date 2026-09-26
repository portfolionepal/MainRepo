import { MetadataRoute } from "next";
import { Product } from "@/data/products";
import { Service } from "@/data/services";
import { PortfolioItem } from "@/data/portfolio";
import { SITE_URL } from "@/lib/constants";
import { fetchAPI } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = (await fetchAPI('/products')) || [];
  const services = (await fetchAPI('/services')) || [];
  const portfolioItems = (await fetchAPI('/portfolio')) || [];
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/products`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/portfolio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/industries`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/request-quote`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.9 },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((p: Product) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((s: Service) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const portfolioPages: MetadataRoute.Sitemap = portfolioItems.map((p: PortfolioItem) => ({
    url: `${SITE_URL}/portfolio/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...servicePages, ...portfolioPages];
}

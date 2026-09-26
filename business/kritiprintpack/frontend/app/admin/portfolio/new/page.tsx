"use client";
import { AdminForm } from "@/components/admin/AdminForm";

const PORTFOLIO_FIELDS = [
  { name: 'title', label: 'Project Title', required: true, placeholder: 'e.g. Wai Wai Noodles Master Carton' },
  { name: 'slug', label: 'URL Slug', required: true, placeholder: 'e.g. wai-wai-noodles-master-carton' },
  { name: 'client', label: 'Client Name', required: true, placeholder: 'e.g. CG Foods' },
  { name: 'category', label: 'Category', required: true, placeholder: 'e.g. fmcg' },
  { name: 'year', label: 'Year', required: true, placeholder: '2024' },
  { name: 'image', label: 'Project Image', type: 'file' as const },
  { name: 'isFeatured', label: 'Show on homepage (Featured)', type: 'checkbox' as const },
  { name: 'description', label: 'Short Description', type: 'textarea' as const, required: true, rows: 2 },
  { name: 'fullDescription', label: 'Full Description', type: 'textarea' as const, required: true, rows: 4 },
  { name: 'tags', label: 'Tags (one per line)', type: 'list' as const, placeholder: 'e.g. Corrugated' },
];

export default function NewPortfolioPage() {
  return <AdminForm title="Create Portfolio Project" apiEndpoint="/portfolio" redirectPath="/admin/portfolio" fields={PORTFOLIO_FIELDS} useFormData />;
}

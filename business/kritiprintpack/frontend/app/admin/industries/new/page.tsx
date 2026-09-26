"use client";
import { AdminForm } from "@/components/admin/AdminForm";

const INDUSTRY_FIELDS = [
  { name: 'name', label: 'Industry Name', required: true, placeholder: 'e.g. FMCG' },
  { name: 'slug', label: 'URL Slug', required: true, placeholder: 'e.g. fmcg' },
  { name: 'icon', label: 'Icon Name', required: true, placeholder: 'e.g. ShoppingCart' },
  { name: 'image', label: 'Industry Image', type: 'file' as const },
  { name: 'description', label: 'Description', type: 'textarea' as const, required: true, rows: 3 },
  { name: 'products', label: 'Products we provide for this industry (one per line)', type: 'list' as const, placeholder: 'e.g. Corrugated Master Cartons' },
];

export default function NewIndustryPage() {
  return <AdminForm title="Create New Industry" apiEndpoint="/industries" redirectPath="/admin/industries" fields={INDUSTRY_FIELDS} useFormData />;
}

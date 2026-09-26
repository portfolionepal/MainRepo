"use client";
import { AdminForm } from "@/components/admin/AdminForm";
import { AdminEditWrapper } from "@/components/admin/AdminEditWrapper";
import { use } from "react";

const PORTFOLIO_FIELDS = [
  { name: 'title', label: 'Project Title', required: true },
  { name: 'slug', label: 'URL Slug', required: true },
  { name: 'client', label: 'Client Name', required: true },
  { name: 'category', label: 'Category', required: true },
  { name: 'year', label: 'Year', required: true },
  { name: 'image', label: 'Project Image (leave empty to keep current)', type: 'file' as const },
  { name: 'isFeatured', label: 'Show on homepage (Featured)', type: 'checkbox' as const },
  { name: 'description', label: 'Short Description', type: 'textarea' as const, required: true, rows: 2 },
  { name: 'fullDescription', label: 'Full Description', type: 'textarea' as const, required: true, rows: 4 },
  { name: 'tags', label: 'Tags (one per line)', type: 'list' as const, placeholder: 'e.g. Corrugated' },
];

export default function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <AdminEditWrapper apiEndpoint="/portfolio" itemId={id}>
      {(data) => <AdminForm title="Edit Portfolio Project" apiEndpoint="/portfolio" redirectPath="/admin/portfolio" fields={PORTFOLIO_FIELDS} initialData={data} isEdit useFormData />}
    </AdminEditWrapper>
  );
}

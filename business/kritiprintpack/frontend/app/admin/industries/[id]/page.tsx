"use client";
import { AdminForm } from "@/components/admin/AdminForm";
import { AdminEditWrapper } from "@/components/admin/AdminEditWrapper";
import { use } from "react";

const INDUSTRY_FIELDS = [
  { name: 'name', label: 'Industry Name', required: true },
  { name: 'slug', label: 'URL Slug', required: true },
  { name: 'icon', label: 'Icon Name', required: true, placeholder: 'e.g. ShoppingCart' },
  { name: 'image', label: 'Industry Image (leave empty to keep current)', type: 'file' as const },
  { name: 'description', label: 'Description', type: 'textarea' as const, required: true, rows: 3 },
  { name: 'products', label: 'Products we provide for this industry (one per line)', type: 'list' as const, placeholder: 'e.g. Corrugated Master Cartons' },
];

export default function EditIndustryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <AdminEditWrapper apiEndpoint="/industries" itemId={id}>
      {(data) => <AdminForm title="Edit Industry" apiEndpoint="/industries" redirectPath="/admin/industries" fields={INDUSTRY_FIELDS} initialData={data} isEdit useFormData />}
    </AdminEditWrapper>
  );
}

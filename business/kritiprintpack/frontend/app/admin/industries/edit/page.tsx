"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AdminForm } from "@/components/admin/AdminForm";
import { AdminEditWrapper } from "@/components/admin/AdminEditWrapper";

const INDUSTRY_FIELDS = [
  { name: 'name', label: 'Industry Name', required: true },
  { name: 'slug', label: 'URL Slug', required: true },
  { name: 'icon', label: 'Icon Name', required: true, placeholder: 'e.g. ShoppingCart' },
  { name: 'image', label: 'Industry Image (leave empty to keep current)', type: 'file' as const },
  { name: 'description', label: 'Description', type: 'textarea' as const, required: true, rows: 3 },
  { name: 'products', label: 'Products we provide for this industry (one per line)', type: 'list' as const, placeholder: 'e.g. Corrugated Master Cartons' },
];

function EditIndustryContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    return <div className="text-red-500 py-10 text-center">Missing industry ID.</div>;
  }

  return (
    <AdminEditWrapper apiEndpoint="/industries" itemId={id}>
      {(data) => <AdminForm title="Edit Industry" apiEndpoint="/industries" redirectPath="/admin/industries" fields={INDUSTRY_FIELDS} initialData={data} isEdit useFormData />}
    </AdminEditWrapper>
  );
}

export default function EditIndustryPage() {
  return (
    <Suspense fallback={<div className="text-gray-500 py-10 text-center">Loading...</div>}>
      <EditIndustryContent />
    </Suspense>
  );
}

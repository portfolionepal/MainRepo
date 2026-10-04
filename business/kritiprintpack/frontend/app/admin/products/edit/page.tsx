"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AdminForm } from "@/components/admin/AdminForm";
import { AdminEditWrapper } from "@/components/admin/AdminEditWrapper";

const PRODUCT_FIELDS = [
  { name: 'name', label: 'Product Name', required: true },
  { name: 'slug', label: 'URL Slug', required: true },
  { name: 'category', label: 'Category', required: true },
  { name: 'image', label: 'Product Image (leave empty to keep current)', type: 'file' as const },
  { name: 'isFeatured', label: 'Show on homepage (Featured)', type: 'checkbox' as const },
  { name: 'shortDescription', label: 'Short Description', type: 'textarea' as const, required: true, rows: 2 },
  { name: 'description', label: 'Full Description', type: 'textarea' as const, required: true, rows: 4 },
  { name: 'specifications', label: 'Specifications (Name → Value pairs)', type: 'keyvalue' as const },
  { name: 'features', label: 'Features (one per line)', type: 'list' as const, placeholder: 'e.g. Water-resistant coating' },
  { name: 'applications', label: 'Applications (one per line)', type: 'list' as const, placeholder: 'e.g. Food packaging' },
];

function EditProductContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    return <div className="text-red-500 py-10 text-center">Missing product ID.</div>;
  }

  return (
    <AdminEditWrapper apiEndpoint="/products" itemId={id}>
      {(data) => <AdminForm title="Edit Product" apiEndpoint="/products" redirectPath="/admin/products" fields={PRODUCT_FIELDS} initialData={data} isEdit useFormData />}
    </AdminEditWrapper>
  );
}

export default function EditProductPage() {
  return (
    <Suspense fallback={<div className="text-gray-500 py-10 text-center">Loading...</div>}>
      <EditProductContent />
    </Suspense>
  );
}

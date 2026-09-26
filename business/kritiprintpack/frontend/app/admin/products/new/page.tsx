"use client";
import { AdminForm } from "@/components/admin/AdminForm";

const PRODUCT_FIELDS = [
  { name: 'name', label: 'Product Name', required: true, placeholder: 'e.g. Corrugated Master Cartons' },
  { name: 'slug', label: 'URL Slug', required: true, placeholder: 'e.g. corrugated-master-cartons' },
  { name: 'category', label: 'Category', required: true, placeholder: 'e.g. Corrugated Cartons' },
  { name: 'image', label: 'Product Image', type: 'file' as const },
  { name: 'isFeatured', label: 'Show on homepage (Featured)', type: 'checkbox' as const },
  { name: 'shortDescription', label: 'Short Description', type: 'textarea' as const, required: true, rows: 2, placeholder: 'Brief description shown in product cards' },
  { name: 'description', label: 'Full Description', type: 'textarea' as const, required: true, rows: 4, placeholder: 'Detailed product description' },
  { name: 'specifications', label: 'Specifications (Name → Value pairs)', type: 'keyvalue' as const },
  { name: 'features', label: 'Features (one per line)', type: 'list' as const, placeholder: 'e.g. Water-resistant coating' },
  { name: 'applications', label: 'Applications (one per line)', type: 'list' as const, placeholder: 'e.g. Food packaging' },
];

export default function NewProductPage() {
  return <AdminForm title="Create New Product" apiEndpoint="/products" redirectPath="/admin/products" fields={PRODUCT_FIELDS} useFormData />;
}

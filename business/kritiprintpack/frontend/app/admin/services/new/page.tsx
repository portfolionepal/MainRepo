"use client";
import { AdminForm } from "@/components/admin/AdminForm";

const SERVICE_FIELDS = [
  { name: 'name', label: 'Service Name', required: true, placeholder: 'e.g. Custom Packaging Design' },
  { name: 'slug', label: 'URL Slug', required: true, placeholder: 'e.g. custom-packaging-design' },
  { name: 'icon', label: 'Icon Name', required: true, placeholder: 'e.g. Palette' },
  { name: 'image', label: 'Service Image', type: 'file' as const },
  { name: 'isFeatured', label: 'Show on homepage (Featured)', type: 'checkbox' as const },
  { name: 'shortDescription', label: 'Short Description', type: 'textarea' as const, required: true, rows: 2 },
  { name: 'description', label: 'Full Description', type: 'textarea' as const, required: true, rows: 4 },
  {
    name: 'process', label: 'Process Steps', type: 'objectlist' as const,
    objectFields: [
      { name: 'step', label: 'Step Number', placeholder: '1' },
      { name: 'title', label: 'Step Title', placeholder: 'e.g. Consultation' },
      { name: 'description', label: 'Step Description', placeholder: 'Brief description of this step' },
    ]
  },
  { name: 'benefits', label: 'Benefits (one per line)', type: 'list' as const, placeholder: 'e.g. Cost-effective solutions' },
];

export default function NewServicePage() {
  return <AdminForm title="Create New Service" apiEndpoint="/services" redirectPath="/admin/services" fields={SERVICE_FIELDS} useFormData />;
}

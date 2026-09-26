"use client";
import { AdminForm } from "@/components/admin/AdminForm";

const WHY_FIELDS = [
  { name: 'title', label: 'Title', required: true },
  { name: 'icon', label: 'Icon (Lucide name)', required: true, placeholder: 'e.g. Shield' },
  { name: 'order', label: 'Display Order', type: 'number' as const },
  { name: 'description', label: 'Description', type: 'textarea' as const, required: true, rows: 3 },
];

export default function NewWhyChooseUsPage() {
  return <AdminForm title="Create Why Choose Us Entry" apiEndpoint="/why-choose-us" redirectPath="/admin/why-choose-us" fields={WHY_FIELDS} />;
}

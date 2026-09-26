"use client";
import { AdminForm } from "@/components/admin/AdminForm";
import { AdminEditWrapper } from "@/components/admin/AdminEditWrapper";
import { use } from "react";

const WHY_FIELDS = [
  { name: 'title', label: 'Title', required: true },
  { name: 'icon', label: 'Icon (Lucide name)', required: true, placeholder: 'e.g. Shield' },
  { name: 'order', label: 'Display Order', type: 'number' as const },
  { name: 'description', label: 'Description', type: 'textarea' as const, required: true, rows: 3 },
];

export default function EditWhyChooseUsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <AdminEditWrapper apiEndpoint="/why-choose-us" itemId={id}>
      {(data) => <AdminForm title="Edit Why Choose Us Entry" apiEndpoint="/why-choose-us" redirectPath="/admin/why-choose-us" fields={WHY_FIELDS} initialData={data} isEdit />}
    </AdminEditWrapper>
  );
}

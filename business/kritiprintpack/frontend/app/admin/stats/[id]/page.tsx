"use client";
import { AdminForm } from "@/components/admin/AdminForm";
import { AdminEditWrapper } from "@/components/admin/AdminEditWrapper";
import { use } from "react";

const STAT_FIELDS = [
  { name: 'value', label: 'Value (e.g. 500+)', required: true },
  { name: 'label', label: 'Label (e.g. Products Delivered)', required: true },
  { name: 'order', label: 'Display Order', type: 'number' as const },
];

export default function EditStatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <AdminEditWrapper apiEndpoint="/stats" itemId={id}>
      {(data) => <AdminForm title="Edit Stat" apiEndpoint="/stats" redirectPath="/admin/stats" fields={STAT_FIELDS} initialData={data} isEdit />}
    </AdminEditWrapper>
  );
}

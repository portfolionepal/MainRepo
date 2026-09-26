"use client";
import { AdminForm } from "@/components/admin/AdminForm";

const STAT_FIELDS = [
  { name: 'value', label: 'Value (e.g. 500+)', required: true },
  { name: 'label', label: 'Label (e.g. Products Delivered)', required: true },
  { name: 'order', label: 'Display Order', type: 'number' as const },
];

export default function NewStatPage() {
  return <AdminForm title="Create New Stat" apiEndpoint="/stats" redirectPath="/admin/stats" fields={STAT_FIELDS} />;
}

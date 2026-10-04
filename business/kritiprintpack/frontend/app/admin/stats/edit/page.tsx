"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AdminForm } from "@/components/admin/AdminForm";
import { AdminEditWrapper } from "@/components/admin/AdminEditWrapper";

const STAT_FIELDS = [
  { name: 'value', label: 'Value (e.g. 500+)', required: true },
  { name: 'label', label: 'Label (e.g. Products Delivered)', required: true },
  { name: 'order', label: 'Display Order', type: 'number' as const },
];

function EditStatContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    return <div className="text-red-500 py-10 text-center">Missing stat ID.</div>;
  }

  return (
    <AdminEditWrapper apiEndpoint="/stats" itemId={id}>
      {(data) => <AdminForm title="Edit Stat" apiEndpoint="/stats" redirectPath="/admin/stats" fields={STAT_FIELDS} initialData={data} isEdit />}
    </AdminEditWrapper>
  );
}

export default function EditStatPage() {
  return (
    <Suspense fallback={<div className="text-gray-500 py-10 text-center">Loading...</div>}>
      <EditStatContent />
    </Suspense>
  );
}

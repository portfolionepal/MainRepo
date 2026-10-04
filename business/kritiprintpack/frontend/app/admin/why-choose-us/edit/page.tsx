"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AdminForm } from "@/components/admin/AdminForm";
import { AdminEditWrapper } from "@/components/admin/AdminEditWrapper";

const WHY_FIELDS = [
  { name: 'title', label: 'Title', required: true },
  { name: 'icon', label: 'Icon (Lucide name)', required: true, placeholder: 'e.g. Shield' },
  { name: 'order', label: 'Display Order', type: 'number' as const },
  { name: 'description', label: 'Description', type: 'textarea' as const, required: true, rows: 3 },
];

function EditWhyChooseUsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    return <div className="text-red-500 py-10 text-center">Missing item ID.</div>;
  }

  return (
    <AdminEditWrapper apiEndpoint="/why-choose-us" itemId={id}>
      {(data) => <AdminForm title="Edit Why Choose Us Entry" apiEndpoint="/why-choose-us" redirectPath="/admin/why-choose-us" fields={WHY_FIELDS} initialData={data} isEdit />}
    </AdminEditWrapper>
  );
}

export default function EditWhyChooseUsPage() {
  return (
    <Suspense fallback={<div className="text-gray-500 py-10 text-center">Loading...</div>}>
      <EditWhyChooseUsContent />
    </Suspense>
  );
}

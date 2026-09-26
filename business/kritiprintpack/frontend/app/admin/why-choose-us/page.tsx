"use client";

import { AdminCrudTable } from "@/components/admin/AdminCrudTable";

export default function AdminWhyChooseUsPage() {
  return (
    <AdminCrudTable
      title="Manage Why Choose Us"
      apiEndpoint="/why-choose-us"
      createHref="/admin/why-choose-us/new"
      editHref={(item) => `/admin/why-choose-us/${item.id}`}
      columns={[
        { key: "title", label: "Title", render: (item) => (
          <span className="font-medium text-gray-900">{item.title}</span>
        )},
        { key: "icon", label: "Icon", render: (item) => (
          <span className="text-xs text-gray-500 font-mono">{item.icon}</span>
        )},
        { key: "order", label: "Order", render: (item) => (
          <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">{item.order}</span>
        )},
      ]}
    />
  );
}

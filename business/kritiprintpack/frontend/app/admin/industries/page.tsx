"use client";

import { AdminCrudTable } from "@/components/admin/AdminCrudTable";

export default function AdminIndustriesPage() {
  return (
    <AdminCrudTable
      title="Manage Industries"
      apiEndpoint="/industries"
      createHref="/admin/industries/new"
      editHref={(item) => `/admin/industries/${item.id}`}
      columns={[
        { key: "name", label: "Name", render: (item) => (
          <div>
            <div className="font-medium text-gray-900">{item.name}</div>
            <div className="text-xs text-gray-400">{item.slug}</div>
          </div>
        )},
        { key: "icon", label: "Icon", render: (item) => (
          <span className="text-xs text-gray-500 font-mono">{item.icon}</span>
        )},
      ]}
    />
  );
}

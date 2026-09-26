"use client";

import { AdminCrudTable } from "@/components/admin/AdminCrudTable";

export default function AdminServicesPage() {
  return (
    <AdminCrudTable
      title="Manage Services"
      apiEndpoint="/services"
      createHref="/admin/services/new"
      editHref={(item) => `/admin/services/${item.id}`}
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
        { key: "isFeatured", label: "Featured", render: (item) => (
          <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${item.isFeatured ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
            {item.isFeatured ? "Yes" : "No"}
          </span>
        )},
      ]}
    />
  );
}

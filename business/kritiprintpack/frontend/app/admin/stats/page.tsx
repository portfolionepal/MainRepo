"use client";

import { AdminCrudTable } from "@/components/admin/AdminCrudTable";

export default function AdminStatsPage() {
  return (
    <AdminCrudTable
      title="Manage Company Stats"
      apiEndpoint="/stats"
      createHref="/admin/stats/new"
      editHref={(item) => `/admin/stats/${item.id}`}
      columns={[
        { key: "value", label: "Value", render: (item) => (
          <span className="text-lg font-bold text-gray-900">{item.value}</span>
        )},
        { key: "label", label: "Label" },
        { key: "order", label: "Order", render: (item) => (
          <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">{item.order}</span>
        )},
      ]}
    />
  );
}

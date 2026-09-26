"use client";

import { AdminCrudTable } from "@/components/admin/AdminCrudTable";

export default function AdminPortfolioPage() {
  return (
    <AdminCrudTable
      title="Manage Portfolio"
      apiEndpoint="/portfolio"
      createHref="/admin/portfolio/new"
      editHref={(item) => `/admin/portfolio/${item.id}`}
      columns={[
        { key: "title", label: "Title", render: (item) => (
          <div>
            <div className="font-medium text-gray-900">{item.title}</div>
            <div className="text-xs text-gray-400">{item.slug}</div>
          </div>
        )},
        { key: "client", label: "Client" },
        { key: "category", label: "Category", render: (item) => (
          <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-purple-50 text-purple-700">{item.category}</span>
        )},
        { key: "year", label: "Year" },
        { key: "isFeatured", label: "Featured", render: (item) => (
          <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${item.isFeatured ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
            {item.isFeatured ? "Yes" : "No"}
          </span>
        )},
      ]}
    />
  );
}

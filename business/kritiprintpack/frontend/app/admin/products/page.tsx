"use client";

import { AdminCrudTable } from "@/components/admin/AdminCrudTable";

export default function AdminProductsPage() {
  return (
    <AdminCrudTable
      title="Manage Products"
      apiEndpoint="/products"
      createHref="/admin/products/new"
      editHref={(item) => `/admin/products/${item.id}`}
      columns={[
        { key: "name", label: "Name", render: (item) => (
          <div>
            <div className="font-medium text-gray-900">{item.name}</div>
            <div className="text-xs text-gray-400">{item.slug}</div>
          </div>
        )},
        { key: "category", label: "Category", render: (item) => (
          <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-700">{item.category}</span>
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

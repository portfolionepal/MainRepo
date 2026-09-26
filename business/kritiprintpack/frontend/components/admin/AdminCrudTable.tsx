"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface AdminCrudTableProps {
  title: string;
  apiEndpoint: string;
  columns: { key: string; label: string; render?: (item: any) => React.ReactNode }[];
  createHref?: string;
  editHref?: (item: any) => string;
  idField?: string;
}

export function AdminCrudTable({ title, apiEndpoint, columns, createHref, editHref, idField = 'id' }: AdminCrudTableProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadItems = async () => {
    try {
      const res = await fetch(`${API_URL}${apiEndpoint}`, { cache: 'no-store' });
      const json = await res.json();
      setItems(json.data || []);
    } catch (err) {
      console.error("Failed to load items", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadItems(); }, []);

  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_URL}${apiEndpoint}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setItems(items.filter(item => item[idField] !== id));
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  };

  if (loading) return <div className="text-gray-500 py-10 text-center">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        {createHref && (
          <Link href={createHref} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:from-orange-600 hover:to-orange-700 text-sm font-medium shadow-sm transition-all">
            <Plus className="w-4 h-4" /> Add New
          </Link>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map(col => (
                  <th key={col.key} className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{col.label}</th>
                ))}
                <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item[idField]} className="hover:bg-gray-50 transition-colors">
                  {columns.map(col => (
                    <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    {editHref && (
                      <Link href={editHref(item)} className="text-indigo-600 hover:text-indigo-900 inline-block">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                    )}
                    <button onClick={() => handleDelete(item[idField])} className="text-red-500 hover:text-red-700 inline-block">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-gray-400">
                    No items found. Click &quot;Add New&quot; to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

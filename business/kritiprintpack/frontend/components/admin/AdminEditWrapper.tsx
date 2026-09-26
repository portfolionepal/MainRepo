"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface AdminEditWrapperProps {
  apiEndpoint: string;
  itemId: string;
  children: (data: any) => React.ReactNode;
}

export function AdminEditWrapper({ apiEndpoint, itemId, children }: AdminEditWrapperProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_URL}${apiEndpoint}`, { cache: 'no-store' });
        const json = await res.json();
        const items = json.data;
        const item = Array.isArray(items)
          ? items.find((i: any) => i.id.toString() === itemId)
          : items;
        if (!item) {
          setError("Item not found");
        } else {
          setData(item);
        }
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [apiEndpoint, itemId]);

  if (loading) return <div className="text-gray-500 py-10 text-center">Loading...</div>;
  if (error) return <div className="text-red-500 py-10 text-center">{error}</div>;

  return <>{children(data)}</>;
}

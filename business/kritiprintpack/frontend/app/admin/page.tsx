"use client";

import { useEffect, useState } from "react";
import { Package, Briefcase, Settings, BarChart, PenTool, Globe } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    services: 0,
    portfolio: 0,
    industries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const endpoints = ['/products', '/services', '/portfolio', '/industries'];
        const results = await Promise.all(
          endpoints.map(ep =>
            fetch(`${API_URL}${ep}`, { cache: 'no-store' })
              .then(r => r.json())
              .then(d => d.data?.length || 0)
              .catch(() => 0)
          )
        );
        setStats({
          products: results[0],
          services: results[1],
          portfolio: results[2],
          industries: results[3],
        });
      } catch (err) {
        console.error("Error loading dashboard stats", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const cards = [
    { title: "Products", value: stats.products, icon: Package, color: "from-blue-500 to-blue-600" },
    { title: "Services", value: stats.services, icon: PenTool, color: "from-emerald-500 to-emerald-600" },
    { title: "Portfolio", value: stats.portfolio, icon: Briefcase, color: "from-purple-500 to-purple-600" },
    { title: "Industries", value: stats.industries, icon: Globe, color: "from-orange-500 to-orange-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  {loading ? "..." : card.value}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Quick Start</h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Use the sidebar to manage your website content. You can add, edit, or delete Products, Services, Portfolio projects,
          Industries, Company Stats, and Why Choose Us entries. All changes are reflected on the public website in real-time.
        </p>
      </div>
    </div>
  );
}

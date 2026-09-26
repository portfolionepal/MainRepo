"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, Package, Image, PenTool, LayoutDashboard, Briefcase, BarChart, Settings, Phone } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('adminToken');
    if (!token && !pathname.includes('/admin/login')) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (pathname.includes('/admin/login')) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  const NAV_LINKS = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Services", href: "/admin/services", icon: PenTool },
    { label: "Portfolio", href: "/admin/portfolio", icon: Image },
    { label: "Industries", href: "/admin/industries", icon: Briefcase },
    { label: "Stats", href: "/admin/stats", icon: BarChart },
    { label: "Why Choose Us", href: "/admin/why-choose-us", icon: Settings },
    { label: "Contact", href: "/admin/contact", icon: Phone },
  ];

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-navy text-white flex flex-col">
        <div className="p-6">
          <Link href="/admin" className="text-xl font-bold font-display text-white">
            Kriti Admin
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1 mt-6">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? "bg-brand-orange text-white" : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{link.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
          <h2 className="font-semibold text-brand-gray-dark">Admin Panel</h2>
          <Link href="/" target="_blank" className="text-sm text-brand-blue font-medium hover:underline flex items-center gap-1">
            Visit Website ↗
          </Link>
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

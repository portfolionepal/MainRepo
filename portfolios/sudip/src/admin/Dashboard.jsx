import React from 'react';
import { useAdminContext } from '../context/AdminContext';
import { FileText, Layout, Activity, Settings, Sidebar, Edit3, Save, Globe } from 'lucide-react';

export default function Dashboard() {
  const { siteContent } = useAdminContext();

  return (
    <div className="max-w-6xl mx-auto py-4">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-accent p-10 mb-10 text-white shadow-xl">
        <div className="relative z-10">
          <h1 className="text-4xl font-serif font-bold mb-4">Welcome to your Dashboard</h1>
          <p className="text-white/80 text-lg max-w-xl">Manage the content of your website quickly and easily with our dynamic CMS engine.</p>
        </div>
        {/* Background decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 right-10 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"></div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: 'Pages Managed', value: Object.keys(siteContent).length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Dynamic Components', value: '24+', icon: Layout, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'System Status', value: 'Online', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center group cursor-default">
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mr-5 group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800 tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* How to use */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 overflow-hidden relative group hover:shadow-lg transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-8 flex items-center">
            <Settings className="w-6 h-6 mr-3 text-primary" />
            How to use this CMS
          </h2>
          <ul className="space-y-6">
            {[
              { icon: Sidebar, text: <>Use the <strong className="text-primary">sidebar on the left</strong> to navigate.</> },
              { icon: Edit3, text: "Make your changes in the dynamic text fields." },
              { icon: Save, text: <>Click <strong className="text-primary">Save Changes</strong> to apply.</> },
              { icon: Globe, text: "Changes are instantly reflected on the live website." }
            ].map((item, i) => (
              <li key={i} className="flex items-start text-gray-600">
                <div className="mt-1 bg-gray-50 p-2 rounded-lg mr-4 text-gray-500 border border-gray-100 shadow-sm">
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="leading-relaxed pt-1 text-[15px]">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

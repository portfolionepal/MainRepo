import React from 'react';
import { useAdminContext } from '../context/AdminContext';
import {
  FileText,
  Layout,
  Activity,
  Settings,
  Sidebar,
  Edit3,
  Save,
  Globe
} from 'lucide-react';

export default function Dashboard() {
  const { siteContent } = useAdminContext();

  return (
    <div className="max-w-6xl mx-auto py-4">

      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white p-10 mb-10 border border-gray-200 shadow-sm">

        <div className="relative z-10">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Manage your Dashboard
          </h1>

          <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
            Manage the content of your website quickly and easily.
          </p>
        </div>

        {/* Subtle Background */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-gray-100 rounded-full blur-3xl"></div>

        <div className="absolute -bottom-32 right-20 w-64 h-64 bg-gray-50 rounded-full blur-3xl"></div>

        {/* Subtle Accent */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gray-300"></div>
      </div>


      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {[
          {
            label: 'Pages Managed',
            value: Object.keys(siteContent).length,
            icon: FileText,
            color: 'text-blue-600',
            bg: 'bg-blue-50'
          },
          {
            label: 'Dynamic Components',
            value: '24+',
            icon: Layout,
            color: 'text-purple-600',
            bg: 'bg-purple-50'
          },
          {
            label: 'System Status',
            value: 'Online',
            icon: Activity,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50'
          }
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex items-center group"
          >
            <div
              className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mr-5 group-hover:scale-110 transition-transform duration-300`}
            >
              <stat.icon className="w-7 h-7" />
            </div>

            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                {stat.label}
              </p>

              <p className="text-2xl font-bold text-gray-900 tracking-tight">
                {stat.value}
              </p>
            </div>
          </div>
        ))}

      </div>


      {/* How To Use Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 overflow-hidden relative group hover:shadow-lg transition-all duration-300">

          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>

          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 flex items-center">
            <Settings className="w-6 h-6 mr-3 text-gray-700" />
            How to use this CMS
          </h2>

          <ul className="space-y-6">

            {[
              {
                icon: Sidebar,
                text: (
                  <>
                    Use the{' '}
                    <strong className="text-gray-900">
                      sidebar on the left
                    </strong>{' '}
                    to navigate.
                  </>
                )
              },
              {
                icon: Edit3,
                text: 'Make your changes in the dynamic text fields.'
              },
              {
                icon: Save,
                text: (
                  <>
                    Click{' '}
                    <strong className="text-gray-900">
                      Save Changes
                    </strong>{' '}
                    to apply.
                  </>
                )
              },
              {
                icon: Globe,
                text: 'Changes are instantly reflected on the live website.'
              }
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start text-gray-600"
              >
                <div className="mt-1 bg-gray-50 p-2 rounded-lg mr-4 text-gray-500 border border-gray-200 shadow-sm">
                  <item.icon className="w-4 h-4" />
                </div>

                <span className="leading-relaxed pt-1 text-[15px]">
                  {item.text}
                </span>
              </li>
            ))}

          </ul>

        </div>

      </div>

    </div>
  );
}
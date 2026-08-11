import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import Login from './Login';
import { useAdminContext } from '../context/AdminContext';
import { LogOut } from 'lucide-react';

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAdminContext();

  if (!isAuthenticated) {
    return <Login />;
  }
  return (
    <div className="flex h-screen bg-[#F5F5F5] font-sans">
      {/* Sidebar Navigation */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8 justify-between shrink-0">
          <h2 className="text-xl font-serif font-bold text-gray-800">CMS Administration</h2>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" rel="noreferrer" className="text-sm font-medium text-primary hover:text-primary-light transition-colors">
              View Live Site &rarr;
            </a>
            <button 
              onClick={logout}
              className="flex items-center text-sm font-medium text-gray-500 hover:text-red-500 transition-colors ml-4 border-l border-gray-200 pl-4"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

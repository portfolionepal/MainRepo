import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Layers, FileText, MessageSquare, Settings, LogOut, Menu, X, User, HelpCircle, Home, Globe } from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Services', path: '/admin/services', icon: Layers },
    { name: 'Projects', path: '/admin/projects', icon: FileText },
    { name: 'Properties', path: '/admin/properties', icon: Home },
    { name: 'FAQs', path: '/admin/faqs', icon: HelpCircle },
    { name: 'Pages', path: '/admin/pages', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-body">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-64 bg-[#0F172A] border-r border-slate-800 shadow-2xl transition-transform duration-300
        lg:translate-x-0 lg:sticky lg:top-0 lg:shrink-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-20 flex items-center px-6 border-b border-slate-800 bg-[#0B1120]">
          <Link to="/" className="font-heading font-bold text-2xl text-white tracking-wide">
            GodMoon<span className="text-blue-500">.</span>
            <span className="text-[10px] ml-2 text-slate-400 font-medium uppercase tracking-[0.2em] border border-slate-700 px-2 py-0.5 rounded-full">Admin</span>
          </Link>
        </div>

        <div className="p-4 flex flex-col h-[calc(100vh-4rem)] justify-between">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }
                  `}
                >
                  <item.icon className={`mr-3 h-5 w-5 transition-transform duration-200 ${isActive ? 'text-white scale-110' : 'text-slate-500 group-hover:text-white group-hover:scale-110'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="space-y-2 pt-4 border-t border-slate-800">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-200 group"
            >
              <Globe className="mr-3 h-5 w-5 text-slate-500 group-hover:text-white transition-transform duration-200 group-hover:scale-110" />
              Visit Site
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
            >
              <LogOut className="mr-3 h-5 w-5 text-slate-500 group-hover:text-red-400 transition-transform duration-200 group-hover:-translate-x-1" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F1F5F9]">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm flex items-center justify-between px-4 sm:px-8 z-30 sticky top-0 transition-all">
          <button 
            className="lg:hidden p-2 -ml-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-1 flex justify-end">
            <div className="flex items-center gap-4 p-1.5 pr-4 rounded-full bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-inner">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col hidden sm:flex">
                <span className="text-sm font-bold text-slate-800 leading-none mb-1">Admin User</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 leading-none">Super Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

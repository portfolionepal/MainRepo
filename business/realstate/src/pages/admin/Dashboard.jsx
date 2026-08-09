import React, { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { Users, FileText, Camera, Activity, ArrowUpRight, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { projects, services, messages } = useContext(DataContext);
  const unreadMessages = messages.filter(m => !m.read).length;
  const navigate = useNavigate();

  const stats = [
    { name: 'Total Projects', value: projects.length.toString(), icon: Camera, color: 'from-blue-500 to-blue-600', shadow: 'shadow-blue-500/20' },
    { name: 'Active Services', value: services.length.toString(), icon: FileText, color: 'from-emerald-400 to-emerald-600', shadow: 'shadow-emerald-500/20' },
    { name: 'New Messages', value: unreadMessages.toString(), icon: Users, color: 'from-purple-500 to-purple-600', shadow: 'shadow-purple-500/20' },
    { name: 'Site Visits', value: '2.4K', icon: Activity, color: 'from-orange-400 to-orange-600', shadow: 'shadow-orange-500/20' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-heading font-bold text-slate-900 mb-2">Welcome back, Admin! 👋</h1>
        <p className="text-slate-500">Here's what's happening with your website today.</p>
      </div>
      
      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.name} 
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xl shadow-slate-200/40 relative overflow-hidden group cursor-pointer"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-bl-full opacity-10 group-hover:scale-110 transition-transform duration-500`}></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg ${stat.shadow}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</h3>
              <p className="text-sm font-medium text-slate-500">{stat.name}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity Section */}
      <div className="max-w-3xl">

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">Quick Links</h3>
            <p className="text-xs text-slate-500 mt-1">Jump to content management</p>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <Link to="/admin/projects" className="group flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-200 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
              <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300">
                <Camera className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-blue-700 transition-colors">Manage Projects</span>
            </Link>
            
            <Link to="/admin/services" className="group flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-100 rounded-2xl hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all">
              <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-emerald-500 transition-all duration-300">
                <FileText className="h-6 w-6 text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-emerald-700 transition-colors">Manage Services</span>
            </Link>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Dashboard;

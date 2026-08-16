import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Phone, Users, Briefcase, GraduationCap, Image, Calendar, MessageSquare, Settings } from 'lucide-react';

const mainPages = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
  { name: 'Home Page', path: '/admin/pages/home', icon: FileText },
  { name: 'About Page', path: '/admin/pages/about', icon: Users },
  { name: 'Training Process', path: '/admin/pages/trainingProcess', icon: FileText },
  { name: 'Mission & Vision', path: '/admin/pages/missionVision', icon: FileText },
  { name: 'Contact Page', path: '/admin/pages/contact', icon: Phone },
  { name: 'Clientele', path: '/admin/pages/clients', icon: Briefcase },
  { name: 'Testimonials', path: '/admin/pages/testimonials', icon: MessageSquare },
  { name: 'Gallery', path: '/admin/pages/gallery', icon: Image },
  { name: 'Events', path: '/admin/pages/events', icon: Calendar },
  { name: 'Blog', path: '/admin/pages/blog', icon: FileText },
];

const trainingPages = [
  { name: 'Manager as Coach', path: '/admin/pages/managerCoach' },
  { name: 'Leadership Dev', path: '/admin/pages/leadershipDevelopment' },
  { name: 'Let\'s Play Sales', path: '/admin/pages/letsPlaySales' },
  { name: 'Team Building', path: '/admin/pages/teamBuilding' },
  { name: 'Motivational', path: '/admin/pages/motivational' },
  { name: 'TOT', path: '/admin/pages/tot' },
  { name: 'Wellbeing', path: '/admin/pages/wellbeing' },
  { name: 'Customer Service', path: '/admin/pages/customerService' },
];

const coachingPages = [
  { name: 'What is Coaching?', path: '/admin/pages/whatIsCoaching' },
  { name: 'Life Coaching', path: '/admin/pages/lifeCoaching' },
  { name: 'Leadership Coaching', path: '/admin/pages/leadershipCoaching' },
];

export default function AdminSidebar() {
  const renderLink = (link) => {
    const Icon = link.icon || FileText;
    return (
      <NavLink
        key={link.path}
        to={link.path}
        end={link.exact}
        className={({ isActive }) =>
          `flex items-center px-4 py-2 mt-1 rounded-md text-sm font-medium transition-colors ${
            isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`
        }
      >
        <Icon className="w-4 h-4 mr-3" />
        {link.name}
      </NavLink>
    );
  };

  const renderSubLink = (link) => (
    <NavLink
      key={link.path}
      to={link.path}
      className={({ isActive }) =>
        `block px-4 py-2 mt-1 rounded-md text-sm transition-colors pl-11 ${
          isActive ? 'bg-primary/10 text-primary font-medium' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
        }`
      }
    >
      {link.name}
    </NavLink>
  );

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col shadow-sm flex-shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <span className="text-2xl font-bold font-serif text-primary">Sudip <span className="text-accent">Basnet</span></span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        <div>
          <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Main Pages</h3>
          {mainPages.map(renderLink)}
        </div>

        <div>
          <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center">
            <GraduationCap className="w-4 h-4 mr-2" /> Trainings
          </h3>
          {trainingPages.map(renderSubLink)}
        </div>

        <div>
          <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center">
            <Settings className="w-4 h-4 mr-2" /> Coaching
          </h3>
          {coachingPages.map(renderSubLink)}
        </div>
      </div>
    </div>
  );
}

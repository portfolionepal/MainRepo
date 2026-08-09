
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import PropertyDetail from './pages/PropertyDetail';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop'; // ADDED

// Admin Imports
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageProjects from './pages/admin/ManageProjects';
import ManageServices from './pages/admin/ManageServices';
import ManageProperties from './pages/admin/ManageProperties';
import ManagePages from './pages/admin/ManagePages';
import ManageFAQs from './pages/admin/ManageFAQs';

import { DataProvider } from './context/DataContext';

const PublicLayout = () => (
  <div className="bg-base min-h-screen text-text font-body selection:bg-accent/30 selection:text-white">
    <Navbar />
    <Outlet />
    <Footer />
  </div>
);

// Protected Route Component for Admin Panel
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminLoggedIn') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  // ADDED: stop the browser's native scroll-restoration from fighting React
  // Router's instant route swaps on mobile back/forward navigation.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <DataProvider>
      <Router>
        <ScrollToTop /> {/* ADDED */}
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/service/:slug" element={<ServiceDetail />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="services" element={<ManageServices />} />
            <Route path="properties" element={<ManageProperties />} />
            <Route path="pages" element={<ManagePages />} />
            <Route path="faqs" element={<ManageFAQs />} />
          </Route>
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
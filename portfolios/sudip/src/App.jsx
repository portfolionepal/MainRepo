import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import GenericEditor from './admin/GenericEditor';
import Home from './pages/Home';
import About from './pages/About';
// Placeholder imports for scaffolded pages
import Trainings from './pages/Trainings';
import ManagerCoach from './pages/ManagerCoach';
import LeadershipDevelopment from './pages/LeadershipDevelopment';
import LetsPlaySales from './pages/LetsPlaySales';
import TeamBuilding from './pages/TeamBuilding';
import Motivational from './pages/Motivational';
import Tot from './pages/Tot';
import Wellbeing from './pages/Wellbeing';
import CustomerService from './pages/CustomerService';
import Coaching from './pages/Coaching';
import Contact from './pages/Contact';
import Clients from './pages/Clients';
import Testimonials from './pages/Testimonials';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import WhatIsCoaching from './pages/WhatIsCoaching';
import LifeCoaching from './pages/LifeCoaching';
import LeadershipCoaching from './pages/LeadershipCoaching';
import TrainingProcess from './pages/TrainingProcess';
import MissionVision from './pages/MissionVision';
import Events from './pages/Events';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="about/process" element={<TrainingProcess />} />
          <Route path="about/mission" element={<MissionVision />} />
          
          <Route path="trainings" element={<Trainings />} />
          <Route path="trainings/manager-coach" element={<ManagerCoach />} />
          <Route path="trainings/leadership" element={<LeadershipDevelopment />} />
          <Route path="trainings/sales" element={<LetsPlaySales />} />
          <Route path="trainings/team-building" element={<TeamBuilding />} />
          <Route path="trainings/motivational" element={<Motivational />} />
          <Route path="trainings/tot" element={<Tot />} />
          <Route path="trainings/wellbeing" element={<Wellbeing />} />
          <Route path="trainings/customer-service" element={<CustomerService />} />
          
          <Route path="coaching" element={<Coaching />} />
          <Route path="coaching/what-is" element={<WhatIsCoaching />} />
          <Route path="coaching/life" element={<LifeCoaching />} />
          <Route path="coaching/leadership" element={<LeadershipCoaching />} />
          
          <Route path="clients" element={<Clients />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="events" element={<Events />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pages/:pageId" element={<GenericEditor />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

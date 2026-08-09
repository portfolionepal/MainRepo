import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { doc, setDoc, addDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import ProfileAdmin from './admin/ProfileAdmin';
import AboutAdmin from './admin/AboutAdmin';
import HighlightsAdmin from './admin/HighlightsAdmin';
import SkillsAdmin from './admin/SkillsAdmin';
import EducationAdmin from './admin/EducationAdmin';
import ExperienceAdmin from './admin/ExperienceAdmin';
import WorkshopsAdmin from './admin/WorkshopsAdmin';
import SocialLinksAdmin from './admin/SocialLinksAdmin';
import ResumeAdmin from './admin/ResumeAdmin';
import ArticlesAdmin from './admin/ArticlesAdmin';
import './AdminDashboard.css';

const TABS = [
  { key: 'profile', label: 'Profile' },
  { key: 'about', label: 'About' },
  { key: 'highlights', label: 'Highlights' },
  { key: 'skills', label: 'Skills' },
  { key: 'education', label: 'Education' },
  { key: 'experience', label: 'Experience' },
  { key: 'workshops', label: 'Workshops' },
  { key: 'articles', label: 'Articles' },
  { key: 'socialLinks', label: 'Social Links' },
  { key: 'resume', label: 'Resume' },
];



export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleLogout = () => {
    logout();
    navigate('/adminaccess');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-top">
          <div className="admin-brand">
            <span className="admin-brand-logo">B</span>
            <span className="admin-brand-name">Admin Panel</span>
          </div>
          <nav className="admin-nav">
            {TABS.map(tab => (
              <button
                key={tab.key}
                className={`admin-nav-btn${activeTab === tab.key ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
                id={`admin-tab-${tab.key}`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="admin-sidebar-bottom">
          <a href="/" target="_blank" className="admin-view-site">View Site ↗</a>
          <button className="admin-logout-btn" onClick={handleLogout} id="admin-logout-btn">Logout</button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-content">
          {toast && (
            <div className={`admin-toast${toast.type === 'error' ? ' error' : ''}`}>
              {toast.msg}
            </div>
          )}
          {activeTab === 'profile' && <ProfileAdmin showToast={showToast} db={db} />}
          {activeTab === 'about' && <AboutAdmin showToast={showToast} db={db} />}
          {activeTab === 'highlights' && <HighlightsAdmin showToast={showToast} db={db} />}
          {activeTab === 'skills' && <SkillsAdmin showToast={showToast} db={db} />}
          {activeTab === 'education' && <EducationAdmin showToast={showToast} db={db} />}
          {activeTab === 'experience' && <ExperienceAdmin showToast={showToast} db={db} />}
          {activeTab === 'workshops' && <WorkshopsAdmin showToast={showToast} db={db} />}
          {activeTab === 'articles' && <ArticlesAdmin showToast={showToast} db={db} />}
          {activeTab === 'socialLinks' && <SocialLinksAdmin showToast={showToast} db={db} />}
          {activeTab === 'resume' && <ResumeAdmin showToast={showToast} db={db} />}
        </div>
      </main>
    </div>
  );
}

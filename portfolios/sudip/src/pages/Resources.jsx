import { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { Calendar, ArrowRight, BookOpen, X } from 'lucide-react';
import { useAdminContext } from '../context/AdminContext';
import { getImageUrl } from '../utils/cloudinary';

function Events() {
  const { siteContent } = useAdminContext();
  const events = siteContent.events?.items || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {events.map((event, index) => (
        <AnimatedSection key={event.id || index} delay={index * 0.1}>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all h-full flex flex-col group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-bl-[60px] -z-10 group-hover:bg-accent/10 transition-colors"></div>
            <div className="flex items-center text-accent text-sm font-bold mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              {event.date}
            </div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-2">{event.title}</h3>
            <p className="text-gray-500 mb-6 flex-grow">{event.location}</p>
            
            <div className="flex items-center justify-between mt-auto">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">{event.type}</span>
              <button className="text-primary font-medium hover:text-accent transition-colors">RSVP</button>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}

function Blog() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const { siteContent } = useAdminContext();
  const blogs = siteContent.blog?.items || [];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {blogs.map((blog, index) => (
          <AnimatedSection key={blog.id || index} delay={index * 0.1}>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all h-full flex flex-col group overflow-hidden">
              <div className="relative h-48 overflow-hidden cursor-pointer" onClick={() => setSelectedBlog(blog)}>
                <img src={getImageUrl(blog.image || blog.imageUrl || blog.coverImage)} alt={blog.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 flex flex-col flex-grow relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-bl-[60px] -z-10 group-hover:bg-secondary/10 transition-colors"></div>
                <div className="flex items-center text-secondary text-sm font-bold mb-4">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {blog.category}
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-4 cursor-pointer hover:text-accent transition-colors" onClick={() => setSelectedBlog(blog)}>
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-8 flex-grow leading-relaxed">{blog.excerpt}</p>
                
                <div className="flex items-center justify-between mt-auto border-t border-gray-100 pt-6">
                  <span className="text-gray-400 text-sm">{blog.date}</span>
                  <button 
                    onClick={() => setSelectedBlog(blog)}
                    className="flex items-center text-primary font-medium group-hover:text-secondary transition-colors"
                  >
                    Read More <ArrowRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Blog Modal Popup */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedBlog(null)}>
          <div 
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative h-64 w-full shrink-0">
              <img src={getImageUrl(selectedBlog.image || selectedBlog.imageUrl || selectedBlog.coverImage)} alt={selectedBlog.title} className="w-full h-full object-cover" />
              <button 
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-8 md:p-10 overflow-y-auto">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-secondary text-sm font-bold flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {selectedBlog.category}
                </span>
                <span className="text-gray-400 text-sm">{selectedBlog.date}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8 leading-tight">
                {selectedBlog.title}
              </h2>
              
              <div className="prose prose-lg prose-primary max-w-none text-gray-600 whitespace-pre-wrap">
                {selectedBlog.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function Resources() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { siteContent } = useAdminContext();
  const content = siteContent.resources || {};

  return (
    <div className="py-24 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-serif font-bold text-primary mb-6">{content.pageTitle || 'Resources'}</h1>
          <p className="text-xl text-gray-600">
            {content.pageSubtitle || 'Stay updated with our latest public seminars and dive into insights on leadership and corporate growth.'}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex justify-center border-b border-gray-200 mb-8">
            <div className="flex space-x-8">
              <Link 
                to="/resources/events"
                className={`py-4 px-2 text-lg font-medium border-b-2 transition-colors ${
                  currentPath.includes('events') 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Upcoming Events
              </Link>
              <Link 
                to="/resources/blog"
                className={`py-4 px-2 text-lg font-medium border-b-2 transition-colors ${
                  currentPath.includes('blog') 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Latest Blog Posts
              </Link>
            </div>
          </div>
        </AnimatedSection>

        <Routes>
          <Route path="/" element={<Navigate to="events" replace />} />
          <Route path="events" element={<Events />} />
          <Route path="blog" element={<Blog />} />
        </Routes>

      </div>
    </div>
  );
}

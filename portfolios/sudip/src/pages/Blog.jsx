import { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { ArrowRight, BookOpen, X, ExternalLink } from 'lucide-react';
import { useAdminContext } from '../context/AdminContext';
import { getImageUrl } from '../utils/cloudinary';

export default function Blog() {
  const { siteContent } = useAdminContext();
  const blogs = siteContent.blog?.items || [];
  const [selectedBlog, setSelectedBlog] = useState(null);

  const renderContent = (content) => {
    if (!content) return null;
    return content.split('\n\n').map((paragraph, idx) => {
      if (paragraph.trim().match(/^[0-9]+\.\s*|^-\s*/)) {
        const items = paragraph.split('\n');
        return (
          <ul key={idx} className="list-none space-y-4 my-8 pl-0">
            {items.map((item, i) => {
              const isNumbered = item.trim().match(/^[0-9]+\./);
              const text = item.replace(/^[0-9]+\.\s*|^-\s*/, '');
              const parts = text.split(/\*\*(.*?)\*\*/g);
              
              return (
                <li key={i} className="flex items-start bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold mr-4 mt-0.5">
                    {isNumbered ? i + 1 : '•'}
                  </span>
                  <p className="m-0 leading-relaxed text-gray-700">
                    {parts.map((part, j) => 
                      j % 2 === 1 ? <strong key={j} className="text-primary font-bold">{part}</strong> : part
                    )}
                  </p>
                </li>
              );
            })}
          </ul>
        );
      }
      return <p key={idx} className="mb-6 leading-relaxed text-gray-700">{paragraph}</p>;
    });
  };

  const renderBlogCard = (blog) => {
    const isExternal = !!blog.url;
    
    const CardContent = (
      <>
        {/* Image Section */}
        <div className="h-44 w-full overflow-hidden relative">
          <img src={getImageUrl(blog.image || blog.imageUrl)} alt={blog.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Content Section */}
        <div className="p-6 md:p-8 flex flex-col flex-grow relative">
          <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-bl-[60px] -z-10 group-hover:bg-accent/10 transition-colors"></div>
          <div className="flex items-center text-accent text-sm font-bold mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            {blog.category}
          </div>
          <h3 className="text-2xl font-serif font-bold text-primary mb-4 transition-colors group-hover:text-accent">
            {blog.title}
          </h3>
          <p className="text-gray-600 mb-6 flex-grow leading-relaxed line-clamp-3">{blog.description || blog.content}</p>
          
          <div className="flex items-center justify-between mt-auto border-t border-gray-100 pt-6">
            <span className="text-gray-400 text-sm">{blog.date}</span>
            <span className="flex items-center text-primary font-medium group-hover:text-accent transition-colors">
              {isExternal ? 'Read external article' : 'Read More'} 
              {isExternal ? <ExternalLink className="ml-2 w-4 h-4" /> : <ArrowRight className="ml-2 w-4 h-4" />}
            </span>
          </div>
        </div>
      </>
    );

    const baseClasses = "bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all h-full flex flex-col group relative overflow-hidden hover:-translate-y-1 duration-300 text-left";

    if (isExternal) {
      return (
        <a 
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
        >
          {CardContent}
        </a>
      );
    }

    return (
      <button 
        onClick={() => setSelectedBlog(blog)}
        className={baseClasses}
      >
        {CardContent}
      </button>
    );
  };

  return (
    <div className="py-24 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-serif font-bold text-primary mb-6">{siteContent.blog?.pageTitle || 'Latest Insights'}</h1>
          <p className="text-xl text-gray-600">
            {siteContent.blog?.pageSubtitle || 'Dive into our articles on leadership, communication, and achieving personal excellence.'}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {blogs.map((blog, index) => (
            <AnimatedSection key={blog.id} delay={index * 0.1}>
              {renderBlogCard(blog)}
            </AnimatedSection>
          ))}
        </div>

        {/* Blog Modal Popup for internal blogs */}
        {selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedBlog(null)}>
            <div 
              className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header Image */}
              <div className="relative h-64 w-full shrink-0">
                <img src={getImageUrl(selectedBlog.image || selectedBlog.imageUrl)} alt={selectedBlog.title} className="w-full h-full object-cover" />
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
                
                <div className="max-w-none text-gray-600">
                  {renderContent(selectedBlog.content)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

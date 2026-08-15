import AnimatedSection from '../components/AnimatedSection';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useAdminContext } from '../context/AdminContext';
import { getImageUrl } from '../utils/cloudinary';

export default function Blog() {
  const { siteContent } = useAdminContext();
  const blogs = siteContent.blog?.items || [];

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
              <a 
                href={blog.url || '#'}
                target={blog.url ? "_blank" : "_self"}
                rel={blog.url ? "noopener noreferrer" : ""}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all h-full flex flex-col group relative overflow-hidden hover:-translate-y-1 duration-300"
              >
                {/* Image Section */}
                <div className="h-48 w-full overflow-hidden relative">
                  <img src={getImageUrl(blog.image || blog.imageUrl)} alt={blog.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Content Section */}
                <div className="p-8 flex flex-col flex-grow relative">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-bl-[60px] -z-10 group-hover:bg-accent/10 transition-colors"></div>
                  <div className="flex items-center text-accent text-sm font-bold mb-4">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {blog.category}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-8 flex-grow leading-relaxed">{blog.excerpt || blog.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto border-t border-gray-100 pt-6">
                    <span className="text-gray-400 text-sm">{blog.date}</span>
                    <span className="flex items-center text-primary font-medium group-hover:text-accent transition-colors">
                      Read More <ArrowRight className="ml-1 w-4 h-4" />
                    </span>
                  </div>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}

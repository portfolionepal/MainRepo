import { Link, useLocation } from 'react-router-dom';
import AnimatedSection from './AnimatedSection';

export default function SidebarLayout({ title, links, children }) {
  const location = useLocation();

  return (
    <div className="py-24 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-primary">{title}</h1>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sidebar */}
          <div className="lg:col-span-3 lg:sticky lg:top-32 order-2 lg:order-1">
            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-primary p-4">
                  <h3 className="font-serif font-bold text-white text-lg">Programs</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {links.map((link, idx) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link 
                        key={idx} 
                        to={link.path}
                        className={`block px-6 py-4 text-sm font-medium transition-colors ${
                          isActive 
                            ? 'bg-primary/5 text-primary border-l-4 border-primary' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-primary border-l-4 border-transparent'
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
              
              {/* Contact Callout */}
              <div className="mt-8 bg-secondary/10 rounded-2xl p-6 text-center border border-secondary/20">
                <h4 className="font-serif font-bold text-primary mb-2">Need a Custom Program?</h4>
                <p className="text-sm text-gray-600 mb-4">We tailor our training to meet your organization's specific goals.</p>
                <Link to="/contact" className="inline-block px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-light transition-colors">
                  Contact Us
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            <AnimatedSection delay={0.2}>
              <div className="prose prose-lg prose-indigo max-w-none text-gray-600">
                {children}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}

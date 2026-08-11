import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { trainingLinks, trainingData } from '../data/content';
import { ArrowRight } from 'lucide-react';

export default function Trainings() {
  return (
    <div className="py-24 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-serif font-bold text-primary mb-6">Corporate Trainings</h1>
          <p className="text-xl text-gray-600">Tailored corporate training solutions designed to elevate your team's performance, motivation, and leadership capabilities.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainingLinks.map((link, idx) => {
            const data = trainingData[link.id];
            return (
              <AnimatedSection key={link.id} delay={idx * 0.1}>
                <Link to={link.path} className="block h-full group">
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col overflow-hidden">
                    {/* Card Image */}
                    <div className="h-48 w-full overflow-hidden relative">
                      <img 
                        src={data.image} 
                        alt={data.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Card Content */}
                    <div className="p-8 flex flex-col flex-grow relative">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-secondary/5 rounded-bl-[80px] -z-10 group-hover:bg-secondary/10 transition-colors"></div>
                      <h3 className="font-serif font-bold text-2xl text-primary mb-4">{data.title}</h3>
                      <p className="text-gray-600 mb-8 flex-grow line-clamp-3">{data.overview}</p>
                      <div className="flex items-center text-accent font-medium mt-auto group-hover:text-accent-hover transition-colors">
                        View Details <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </div>
  );
}

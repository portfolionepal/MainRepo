import AnimatedSection from '../components/AnimatedSection';
import { Target, Lightbulb, Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdminContext } from '../context/AdminContext';
import { getImageUrl } from '../utils/upload';

export default function WhatIsCoaching() {
  const { siteContent } = useAdminContext();
  const program = siteContent.whatIsCoaching;

  return (
    <div className="bg-surface min-h-screen">
      
      {/* Hero Banner */}
      <div className="relative pt-32 pb-24 bg-[#1A2634] text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-[center_top] opacity-50"
          style={{ backgroundImage: `url('${getImageUrl(program.image) || 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2000'}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2634] via-transparent to-transparent opacity-80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-white mb-6 leading-tight max-w-4xl">{program.title || 'What is Coaching?'}</h2>
          </AnimatedSection>
        </div>
      </div>

      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24">
          <AnimatedSection>
            <img 
              src={getImageUrl(program.image) || "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"} 
              alt="Coaching Session" 
              className="rounded-3xl shadow-xl w-full object-cover object-top h-[500px]"
            />
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <h2 className="text-3xl font-bold text-primary mb-6">What is coaching?</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed whitespace-pre-line">
              {program.overview}
            </p>
            
            <div className="space-y-6">
              {program.objectives && program.objectives.map((obj, i) => (
                <div key={i} className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mr-4 mt-1">
                    {i % 2 === 0 ? <Target className="w-6 h-6 text-accent" /> : <Compass className="w-6 h-6 text-accent" />}
                  </div>
                  <div>
                    <p className="text-gray-600 leading-relaxed pt-2">{obj}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection className="bg-background text-primary rounded-[40px] p-12 text-center shadow-xl border border-gray-100">
          <h3 className="text-3xl font-serif font-bold mb-6">Ready to start your journey?</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Whether you are looking to elevate your career or find balance in your personal life, coaching can be the catalyst you need.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/coaching/life" className="bg-accent text-white font-bold px-8 py-4 rounded-full hover:bg-accent-hover transition-colors shadow-lg">
              Explore Life Coaching
            </Link>
            <Link to="/coaching/leadership" className="border-2 border-primary text-primary font-bold px-8 py-4 rounded-full hover:bg-transparent hover:ring-1 hover:ring-primary transition-all">
              Explore Leadership Coaching
            </Link>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}

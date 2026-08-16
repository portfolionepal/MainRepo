import AnimatedSection from '../components/AnimatedSection';
import { Heart, Activity, Sun, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdminContext } from '../context/AdminContext';
import { getImageUrl } from '../utils/cloudinary';

export default function LifeCoaching() {
  const { siteContent } = useAdminContext();
  const program = siteContent.lifeCoaching;

  return (
    <div className="bg-surface min-h-screen overflow-hidden">
      
      {/* Hero Banner */}
      <div className="relative pt-32 pb-24 bg-[#1A2634] text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-[center_top] opacity-50"
          style={{ backgroundImage: `url('${getImageUrl(program.image) || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000'}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2634] via-transparent to-transparent opacity-80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-white mb-6 leading-tight max-w-4xl">{program.title || 'Design a Life You Actually Love.'}</h2>
          </AnimatedSection>
        </div>
      </div>

      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24">
          <AnimatedSection>
            <img 
              src={getImageUrl(program.image) || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"} 
              alt="Life Coaching" 
              className="rounded-3xl shadow-xl w-full object-cover object-top h-[500px]"
            />
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <h2 className="text-3xl font-bold text-primary mb-6">Transform Your Life</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed whitespace-pre-line">
              {program.overview || 'Life coaching is a dedicated partnership to help you navigate transitions, overcome personal barriers, and find profound fulfillment and balance in your everyday life.'}
            </p>
            <Link to="/contact" className="inline-flex items-center bg-accent text-white font-bold px-8 py-4 rounded-full hover:bg-accent-hover transition-colors shadow-lg">
              Book a Discovery Call <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>

        {/* Benefits Grid */}
        <AnimatedSection className="text-center mb-16">
          <h3 className="text-3xl font-serif font-bold text-primary mb-4">How Life Coaching Helps</h3>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {program.objectives && program.objectives.map((obj, i) => {
            const icons = [<Heart className="w-8 h-8 text-accent" />, <Sun className="w-8 h-8 text-accent" />, <Activity className="w-8 h-8 text-accent" />];
            return (
              <AnimatedSection key={i} delay={(i + 1) * 0.1}>
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all h-full text-center group flex flex-col items-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    {icons[i % icons.length]}
                  </div>
                  <p className="text-gray-600 leading-relaxed">{obj}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

      </div>
    </div>
  );
}

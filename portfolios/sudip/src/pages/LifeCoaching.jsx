import AnimatedSection from '../components/AnimatedSection';
import { Heart, Activity, Sun, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdminContext } from '../context/AdminContext';

export default function LifeCoaching() {
  const { siteContent } = useAdminContext();
  const program = siteContent.lifeCoaching;

  return (
    <div className="bg-surface min-h-screen overflow-hidden">
      
      {/* Hero Banner */}
      <div className="relative pt-32 pb-24 bg-[#1A2634] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-widest text-accent uppercase mb-4">Personal Growth</h1>
            <h2 className="text-2xl font-serif font-bold text-white mb-6 leading-tight">{program.title || 'Design a Life You Actually Love.'}</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed whitespace-pre-line">
              {program.overview || 'Life coaching is a dedicated partnership to help you navigate transitions, overcome personal barriers, and find profound fulfillment and balance in your everyday life.'}
            </p>
            <Link to="/contact" className="inline-flex items-center bg-accent text-white font-bold px-8 py-4 rounded-full hover:bg-accent-hover transition-colors shadow-lg">
              Book a Discovery Call <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </AnimatedSection>
        </div>
      </div>

      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Benefits Grid */}
        <AnimatedSection className="text-center mb-16">
          <h3 className="text-3xl font-serif font-bold text-primary mb-4">How Life Coaching Helps</h3>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {program.objectives && program.objectives.slice(0, 3).map((obj, i) => {
            const icons = [<Heart className="w-8 h-8 text-accent" />, <Sun className="w-8 h-8 text-accent" />, <Activity className="w-8 h-8 text-accent" />];
            return (
              <AnimatedSection key={i} delay={(i + 1) * 0.1}>
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all h-full text-center group flex flex-col items-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    {icons[i]}
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

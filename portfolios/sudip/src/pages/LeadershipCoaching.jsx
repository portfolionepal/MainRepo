import AnimatedSection from '../components/AnimatedSection';
import { Briefcase, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdminContext } from '../context/AdminContext';

export default function LeadershipCoaching() {
  const { siteContent } = useAdminContext();
  const program = siteContent.leadershipCoaching;

  return (
    <div className="bg-surface min-h-screen">
      
      {/* Dark Hero Section */}
      <div className="bg-[#1A2634] pt-32 pb-24 text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url('${program.image || 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2000'}')` }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <AnimatedSection>
              <h1 className="text-3xl font-bold tracking-widest text-white uppercase mb-4">Executive & Leadership</h1>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6 leading-tight">{program.title || 'Elevate Your Executive Presence.'}</h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-10 whitespace-pre-line">
                {program.overview || 'Leadership can be lonely. Executive Coaching provides a confidential sounding board for senior professionals to enhance their decision-making, emotional intelligence, and strategic vision.'}
              </p>
              <Link to="/contact" className="inline-flex items-center bg-accent text-white font-bold px-8 py-4 rounded-full hover:bg-accent-hover transition-colors shadow-lg">
                Schedule a Consultation <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </div>

      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Focus Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <AnimatedSection>
            <h3 className="text-3xl font-serif font-bold text-primary mb-6">Who is this for?</h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {program.audience || 'This specialized coaching track is designed exclusively for C-Suite Executives, Founders, Directors, and High-Potential Managers preparing for significant transitions.'}
            </p>
            <ul className="space-y-4 text-gray-700">
              {program.objectives && program.objectives.slice(0, 4).map((obj, i) => (
                <li key={i} className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center shrink-0 mr-3 mt-1 text-sm font-bold">✓</span>
                  <span className="leading-relaxed text-gray-600">{obj}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10"></div>
              <h3 className="text-2xl font-bold text-primary mb-8">Coaching Outcomes</h3>
              
              <div className="space-y-8">
                <div className="flex">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mr-4">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Strategic Clarity</h4>
                    <p className="text-gray-600 text-sm">Make high-stakes decisions with confidence.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mr-4">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Team Alignment</h4>
                    <p className="text-gray-600 text-sm">Foster a culture of accountability and high performance.</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 mr-4">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Authentic Presence</h4>
                    <p className="text-gray-600 text-sm">Command the room without relying on micromanagement.</p>
                  </div>
                </div>
              </div>

            </div>
          </AnimatedSection>
        </div>

      </div>
    </div>
  );
}

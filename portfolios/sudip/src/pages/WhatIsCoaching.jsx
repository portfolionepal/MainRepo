import AnimatedSection from '../components/AnimatedSection';
import { Target, Lightbulb, Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdminContext } from '../context/AdminContext';

export default function WhatIsCoaching() {
  const { siteContent } = useAdminContext();
  const program = siteContent.whatIsCoaching;

  return (
    <div className="bg-surface min-h-screen">
      
      {/* Hero Banner */}
      <div className="relative pt-32 pb-24 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">What is Coaching?</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Coaching is a thought-provoking and creative process that inspires you to maximize your personal and professional potential.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <AnimatedSection>
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" 
              alt="Coaching Session" 
              className="rounded-3xl shadow-xl w-full object-cover h-[500px]"
            />
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <h2 className="text-3xl font-bold text-primary mb-6">Not Mentoring. Not Consulting. Coaching.</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Unlike consulting, where an expert tells you what to do, or mentoring, where a senior colleague shares their experience, coaching operates on the belief that you are the expert in your own life and business.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              A coach acts as a catalyst, using deep listening, powerful questioning, and actionable frameworks to help you uncover your own blind spots, overcome limiting beliefs, and forge a clear path forward.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mr-4">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Clarity of Purpose</h4>
                  <p className="text-gray-600">Define exactly what you want and why it matters.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mr-4">
                  <Compass className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Actionable Strategy</h4>
                  <p className="text-gray-600">Break down massive goals into achievable daily steps.</p>
                </div>
              </div>
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

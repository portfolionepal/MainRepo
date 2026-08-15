import AnimatedSection from '../components/AnimatedSection';
import { Target, Eye, Heart, Shield, Zap, TrendingUp } from 'lucide-react';
import { useAdminContext } from '../context/AdminContext';
import { getImageUrl } from '../utils/cloudinary';

export default function MissionVision() {
  const { siteContent } = useAdminContext();
  const content = siteContent.missionVision || {};

  const icons = [<Zap className="w-8 h-8 text-accent" />, <Heart className="w-8 h-8 text-accent" />, <Shield className="w-8 h-8 text-accent" />, <TrendingUp className="w-8 h-8 text-accent" />];
  const values = content.values || [];

  return (
    <div className="bg-surface min-h-screen">
      
      {/* Hero Banner */}
      <div className="relative pt-32 pb-24 bg-[#1A2634] text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-[center_top] opacity-50"
          style={{ backgroundImage: `url('${getImageUrl(content.heroImage) || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000'}')` }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">{content.pageTitle || 'Mission, Vision & Values'}</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {content.pageSubtitle || 'The foundational principles that drive our coaching and training philosophy.'}
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mission & Vision Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <AnimatedSection>
            <div className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 h-full relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10 group-hover:bg-primary/10 transition-colors"></div>
              <Target className="w-12 h-12 text-primary mb-8" />
              <h2 className="text-3xl font-serif font-bold text-primary mb-6">{content.missionTitle || 'Our Mission'}</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {content.missionDescription}
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <div className="bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 h-full relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-[100px] -z-10 group-hover:bg-accent/10 transition-colors"></div>
              <Eye className="w-12 h-12 text-accent mb-8" />
              <h2 className="text-3xl font-serif font-bold text-primary mb-6">{content.visionTitle || 'Our Vision'}</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {content.visionDescription}
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Core Values */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-primary mb-4">{content.valuesTitle || 'Our Core Values'}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {content.valuesSubtitle || 'These values are not just words on a page; they are the standard by which we operate every single day.'}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <AnimatedSection key={value.id || index} delay={index * 0.1}>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center h-full hover:-translate-y-2 transition-transform duration-300">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  {icons[index % icons.length]}
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </div>
  );
}

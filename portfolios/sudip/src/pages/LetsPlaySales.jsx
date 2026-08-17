import AnimatedSection from '../components/AnimatedSection';
import { Target, Users, Check } from 'lucide-react';
import { useAdminContext } from '../context/AdminContext';
import { getImageUrl } from '../utils/upload';

export default function LetsPlaySales() {
  const { siteContent } = useAdminContext();
  const program = siteContent.letsPlaySales;

  return (
    <div className="bg-surface min-h-screen">
      
      {/* Dynamic Hero Banner */}
      <div className="relative pt-32 pb-24 bg-[#1A2634] text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-[center_top] opacity-50"
          style={{ backgroundImage: `url('${getImageUrl(program.image)}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2634] via-transparent to-transparent opacity-80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-white mb-6 leading-tight max-w-4xl">{program.title}</h2>
          </AnimatedSection>
        </div>
      </div>

      {/* Overview Section - Below Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <AnimatedSection>
            <p className="text-lg text-gray-700 max-w-3xl leading-relaxed font-medium">
              {program.overview}
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Objectives */}
            <AnimatedSection delay={0.1}>
              <div className="flex items-center mb-8">
                <Target className="h-8 w-8 text-accent mr-4" />
                <h3 className="text-3xl font-serif font-bold text-primary m-0">Key Objectives</h3>
              </div>
              <ul className="space-y-6">
                {program.objectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <span className="w-6 h-6 rounded-full bg-secondary/20 text-secondary flex items-center justify-center shrink-0 mr-3 mt-1 text-sm font-bold">✓</span>
                    <span className="text-gray-700 leading-relaxed text-lg">{obj}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            {/* Methodology */}
            <AnimatedSection delay={0.2}>
              <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10"></div>
                <div className="flex items-center mb-6">
                  <Users className="h-8 w-8 text-primary mr-4" />
                  <h3 className="text-3xl font-serif font-bold text-primary m-0">Training Methodology</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {program.methodology}
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Sticky Sidebar Info */}
          <div className="lg:col-span-1">
            <AnimatedSection delay={0.3} className="sticky top-32 space-y-8">
              <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 text-center">
                <h3 className="text-xl font-serif font-bold text-primary mb-4">Who Should Attend?</h3>
                <div className="w-16 h-1 bg-accent mx-auto mb-6 rounded-full"></div>
                <p className="text-gray-700 leading-relaxed font-medium">
                  {program.audience}
                </p>
              </div>

              <div className="bg-[#FCFFF5] text-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 text-center">
                <h3 className="text-2xl font-serif font-bold mb-4 text-gray-900">Ready to Transform Your Team?</h3>
                <p className="text-gray-600 mb-8">
                  Book this training program today or customize it to fit your exact organizational needs.
                </p>
                <a href="/contact" className="inline-block bg-[#00a651] text-white font-bold px-8 py-4 rounded-full hover:bg-[#008f45] transition-colors w-full shadow-md">
                  Request a Quote
                </a>
              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </div>
  );
}
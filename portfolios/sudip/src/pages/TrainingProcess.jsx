import AnimatedSection from '../components/AnimatedSection';
import { Search, PenTool, PlayCircle, BarChart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TrainingProcess() {
  const steps = [
    {
      id: 1,
      title: 'Discovery & Needs Analysis',
      icon: <Search className="w-8 h-8 text-white" />,
      desc: 'We start by deeply understanding your organizational goals, culture, and specific pain points. Through stakeholder interviews and surveys, we pinpoint the exact skills your team needs to develop.',
    },
    {
      id: 2,
      title: 'Custom Curriculum Design',
      icon: <PenTool className="w-8 h-8 text-white" />,
      desc: 'No two teams are alike. We build a tailored curriculum incorporating real-world scenarios, gamified modules, and relevant NLP techniques to ensure maximum engagement and relevance.',
    },
    {
      id: 3,
      title: 'Interactive Delivery',
      icon: <PlayCircle className="w-8 h-8 text-white" />,
      desc: 'Sudeep delivers the training with high energy, humor, and interactive experiential learning. We move beyond traditional lectures to ensure concepts are immediately applied and understood.',
    },
    {
      id: 4,
      title: 'Evaluation & Follow-up',
      icon: <BarChart className="w-8 h-8 text-white" />,
      desc: 'Learning doesn\'t stop when the session ends. We provide post-training assessments, follow-up coaching, and actionable feedback to ensure long-term behavioral change and ROI.',
    }
  ];

  return (
    <div className="bg-surface min-h-screen">
      
      {/* Hero Banner */}
      <div className="relative pt-32 pb-24 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">Our Training Process</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              A proven, four-step methodology designed to deliver measurable results and lasting behavioral change.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Timeline Steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <AnimatedSection key={step.id} delay={index * 0.1}>
              <div className="relative flex items-start group mb-12 last:mb-0">
                {/* Connecting Line */}
                {index !== steps.length - 1 && (
                  <div className="absolute top-16 left-[2.25rem] w-0.5 h-full -mb-12 bg-gray-200 group-hover:bg-accent transition-colors duration-500"></div>
                )}
                
                {/* Step Icon */}
                <div className="relative z-10 flex-shrink-0 w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg border-4 border-white mr-8 group-hover:scale-110 group-hover:bg-accent transition-all duration-300">
                  {step.icon}
                </div>
                
                {/* Step Content */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex-grow hover:shadow-md transition-shadow">
                  <span className="text-accent font-bold text-sm tracking-widest uppercase mb-2 block">Step 0{step.id}</span>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {step.desc}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.4} className="mt-24 text-center bg-background rounded-[40px] p-12 md:p-16 border border-primary/10">
          <h3 className="text-3xl font-serif font-bold text-primary mb-4">Ready to start the process?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
            Let's work together to design a training program that perfectly aligns with your team's needs.
          </p>
          <Link to="/contact" className="inline-block bg-accent text-white font-semibold px-8 py-4 rounded-full hover:bg-accent-hover transition-colors shadow-lg">
            Book a Discovery Call
          </Link>
        </AnimatedSection>

      </div>
    </div>
  );
}

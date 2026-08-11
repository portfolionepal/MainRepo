import { useEffect } from 'react';
import AnimatedSection from '../components/AnimatedSection';

export default function About() {
  return (
    <div className="relative min-h-screen bg-[#F5F5F5] flex items-center pt-20 overflow-hidden">
      
      {/* The Background Image (Right) */}
      <div 
        className="absolute top-20 right-0 w-full lg:w-[65%] h-[calc(100vh-5rem)] bg-cover bg-right"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=2000')` }}
      >
        <div className="absolute inset-0 bg-black/10 lg:hidden"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex justify-start">
        
        {/* The Floating White Card (Left) */}
        <AnimatedSection className="w-full lg:w-[55%] xl:w-[50%] mt-10 lg:mt-0 lg:py-12">
          <div className="bg-white p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col rounded-sm">
             
             {/* Header */}
             <div className="flex-shrink-0 mb-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">Sudeep Basnet</h1>
                <p className="text-gray-500 text-sm md:text-base font-medium">Inspirational Business Speaker & Certified Leadership Coach</p>
             </div>
             
             {/* Scrollable Text Area */}
             <div className="flex-grow text-gray-600 text-sm leading-relaxed space-y-5">
                <p>
                  For over 17 years, Sudeep has been working with hundreds of organization to improve teamwork, increase motivation, and develop customer service strategies. He is an effective motivator, trainer and certified leadership coach from Academy of Leadership Coaching and NLP, USA. Every year Sudeep speaks with thousands of people of different age group and shares his message with powerful content mixed in with humor, for an unforgettable experience that positively influences his audience life.
                </p>
                <p>
                  Sudeep is recognized for his unique ability to connect with audiences about real issues. His listeners receive practical techniques that can be used immediately. His passion is to help make a difference in the lives of all those who attend his trainings and seminars. Through his personal experiences, humor, and insights Sudeep shares the principles and skill that are essential to the development of leaders. 
                </p>
                <p>
                  He knows that personal and professional success begins from within, therefore his mission is to empower people with the skill and attitudes needed in order to reach new height and make a meaningful difference in their personal and professional lives.
                </p>
                <p>
                  Sound personality and calm nature's Sudeep has already conducted various kind of training as a solo and combined way. Sudeep offers motivational trainings, sales trainings, provides professional development training, life coaching and delivers keynote speeches for businesses, associations and other organizations.
                </p>
                <p>
                  No matter what Sudeep does, whether it is training a handful of people, life coaching session, or speaking to a large group, he gives 101% to the effort. He always concerns about people to feel that they have received more than their money's worth from his services.
                </p>
                <p>
                  As a trainer for personal and organization effectiveness, Sudeep has guided people from different industry like; Pharmaceuticals, Financial Institutions, Insurance companies, IT industry, Manufacturing, Service Industry, Real Estate and many more.
                </p>
             </div>

             {/* Footer Logos using actual image tags */}
             <div className="flex-shrink-0 pt-6 mt-4 flex items-center justify-between gap-4">
                
                {/* NLP Logo Placeholder (Random Image) */}
                <img 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=220&h=70" 
                  alt="Academy of Leadership Coaching & NLP" 
                  className="h-10 md:h-12 w-[150px] object-cover border border-gray-100 rounded-sm p-1"
                />
                
                {/* ICF Logo */}
                <img 
                  src="https://coachingfederation.org/app/themes/icf/assets/images/icf-logo.svg" 
                  alt="International Coach Federation" 
                  className="h-10 md:h-12 object-contain"
                />
                
                {/* Signature Logo (Real URL) */}
                <div className="ml-auto text-right flex flex-col items-end">
                  <img 
                    src="https://successinc.com.np/wp-content/uploads/2023/10/sudeep-sign.png" 
                    alt="Sudeep Basnet Signature" 
                    className="h-10 md:h-12 object-contain mb-0.5"
                  />
                  <p className="text-[7px] md:text-[9px] tracking-[0.2em] text-gray-400 uppercase font-medium">Leadership Coach</p>
                </div>
                
             </div>
             
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}

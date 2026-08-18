import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCircleCheck, FaArrowRight, FaArrowLeft, FaComments, FaFileSignature, FaPassport, FaPlaneDeparture } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const TravelVisa = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-24 lg:pt-32 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 lg:p-16 shadow-lg border border-gray-100 relative"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-blue font-semibold mb-6 sm:mb-8 transition-all duration-300 w-fit group border border-gray-200 rounded-full px-4 sm:px-5 py-2 hover:border-brand-blue/30 hover:bg-brand-blue/5 text-sm sm:text-base">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>

          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-brand-navy font-serif">Travel Visa</h1>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mt-8 sm:mt-12">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-navy mb-3 sm:mb-4">Explore Europe Seamlessly</h2>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Expert assistance for securing tourist and short-stay visas. We handle the complexities of documentation, flight itineraries, and embassy appointments so you can focus entirely on your travel itinerary.
              </p>
              
              <h3 className="text-lg sm:text-xl font-bold text-brand-navy mb-3 sm:mb-4">Our Services Include:</h3>
              <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                {['Comprehensive Document Verification', 'Fast-Track Application Processing', 'Mock Interview Preparation', 'Travel Insurance & Flight Booking Guidance'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 font-medium">
                    <FaCircleCheck className="text-brand-blue mt-1 shrink-0" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/#contact" className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-brand-blue text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base">
                Start Your Application
                <FaArrowRight />
              </Link>
            </div>
            
            <div className="rounded-2xl overflow-hidden shadow-lg h-[250px] sm:h-[400px] md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop" 
                alt="Traveling in Europe" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Our Streamlined Process Section */}
          <div className="mt-16 sm:mt-24 pt-10 sm:pt-16 border-t border-gray-100 pb-8 sm:pb-12">
            <div className="text-center mb-12 sm:mb-20">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-3 sm:mb-4 font-serif">Our Streamlined Process</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">We've simplified the journey to traveling in Europe into clear, manageable steps to ensure your peace of mind.</p>
            </div>
            
            <div className="relative max-w-5xl mx-auto px-2 sm:px-4 md:px-0">
              {/* Horizontal Dashed Line Background */}
              <div className="hidden md:block absolute top-[32px] left-[10%] w-[80%] h-0 border-t-[3px] border-dotted border-gray-300 z-0"></div>

              <div className="flex flex-col md:flex-row justify-between gap-8 sm:gap-10 md:gap-4 relative z-10">
                {[
                  { step: '01', title: 'Consultation', desc: 'Initial assessment of your profile and eligibility.', icon: FaComments },
                  { step: '02', title: 'Documentation', desc: 'Gathering, translating, and legalizing all paperwork.', icon: FaFileSignature },
                  { step: '03', title: 'Application', desc: 'Filing your tourist visa application.', icon: FaPassport },
                  { step: '04', title: 'Destination', desc: 'Post-approval support for flight and travel planning.', icon: FaPlaneDeparture }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center w-full md:w-1/4 group cursor-pointer">
                    
                    {/* Icon Node */}
                    <div className="w-16 h-16 rounded-full bg-brand-navy text-white flex items-center justify-center border-[6px] border-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] mb-6 relative z-10 group-hover:-translate-y-2 group-hover:bg-brand-blue group-hover:shadow-[0_8px_25px_rgba(6,97,221,0.4)] transition-all duration-300">
                       <item.icon size={24} />
                       
                       {/* Step Number Badge */}
                       <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-brand-sky text-brand-navy font-bold text-xs flex items-center justify-center border-2 border-white shadow-sm">
                         {i + 1}
                       </div>
                    </div>

                    {/* Content */}
                    <div className="bg-transparent px-4 py-2 transition-all duration-300 group-hover:-translate-y-1">
                       <h4 className="text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-blue transition-colors duration-300">{item.title}</h4>
                       <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default TravelVisa;

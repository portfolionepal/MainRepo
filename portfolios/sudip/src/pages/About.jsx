import AnimatedSection from '../components/AnimatedSection';
import { useAdminContext } from '../context/AdminContext';
import { getImageUrl } from '../utils/upload';

export default function About() {
  const { siteContent } = useAdminContext();
  const content = siteContent.about;

  return (
    <div className="relative min-h-screen bg-[#F5F5F5] flex items-center pt-20 overflow-hidden">
      
      {/* The Background Image (Right) */}
      <div 
        className="absolute top-20 right-0 w-full lg:w-[65%] h-[calc(100vh-5rem)] bg-cover bg-[center_top] lg:bg-[top_right]"
        style={{ backgroundImage: `url('${getImageUrl(content.bgImage) || 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=2000'}')` }}
      >
        <div className="absolute inset-0 bg-black/10 lg:hidden"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex justify-start">
        
        {/* The Floating White Card (Left) */}
        <AnimatedSection className="w-full lg:w-[55%] xl:w-[50%] mt-10 lg:mt-0 lg:py-12">
          <div className="bg-white p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col rounded-sm">
             
             {/* Header */}
             <div className="flex-shrink-0 mb-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">{content.title}</h1>
                <p className="text-gray-500 text-sm md:text-base font-medium">{content.subtitle}</p>
             </div>
             
             {/* Scrollable Text Area */}
             <div className="flex-grow text-gray-600 text-sm leading-relaxed space-y-5">
                {content.paragraph1 && <p>{content.paragraph1}</p>}
                {content.paragraph2 && <p>{content.paragraph2}</p>}
                {content.paragraph3 && <p>{content.paragraph3}</p>}
                {content.paragraph4 && <p>{content.paragraph4}</p>}
             </div>

             {/* Footer Logos using actual image tags */}
             <div className="flex-shrink-0 pt-6 mt-4 flex items-center justify-between gap-4">
                
                {/* NLP Logo */}
                {content.nlpLogo && (
                  <img 
                    src={getImageUrl(content.nlpLogo)} 
                    alt="Academy of Leadership Coaching & NLP" 
                    className="h-10 md:h-12 w-[150px] object-cover border border-gray-100 rounded-sm p-1"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                
                {/* ICF Logo */}
                {content.icfLogo && (
                  <img 
                    src={getImageUrl(content.icfLogo)} 
                    alt="International Coach Federation" 
                    className="h-10 md:h-12 object-contain"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                
                {/* Signature Logo */}
                <div className="ml-auto text-right flex flex-col items-end">
                  {content.signatureImage && (
                    <img 
                      src={getImageUrl(content.signatureImage)} 
                      alt="Signature" 
                      className="h-10 md:h-12 object-contain mb-0.5"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}
                </div>
                
             </div>
             
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
}

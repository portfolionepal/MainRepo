import { Quote } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useAdminContext } from '../context/AdminContext';
import { getImageUrl } from '../utils/cloudinary';

export default function Testimonials() {
  const { siteContent } = useAdminContext();
  const testimonials = siteContent.testimonials.items;
  return (
    <div className="py-24 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
         
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-6">{siteContent.testimonials.pageTitle || 'What People Say'}</h2>
          <p className="text-xl text-gray-600">
            {siteContent.testimonials.pageSubtitle || 'Real stories of transformation, leadership development, and organizational growth from our clients.'}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.id} delay={index * 0.1}>
              <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative h-full flex flex-col">
                <div className="mb-6">
                  <Quote className="w-10 h-10 text-rose-400 rotate-180" fill="currentColor" strokeWidth={0} />
                </div>
                <div className="flex-grow">
                  <p className="text-slate-700 italic text-lg leading-relaxed mb-8 font-medium">
                    {testimonial.text}
                  </p>
                </div>
                <div className="flex items-center mt-auto">
                  <div className="w-14 h-14 rounded-full overflow-hidden mr-4 shrink-0 shadow-sm border border-gray-100">
                    {getImageUrl(testimonial.image || testimonial.imageUrl) ? (
                      <img src={getImageUrl(testimonial.image || testimonial.imageUrl)} alt={testimonial.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold font-serif text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1e3a5f] text-lg leading-tight">{testimonial.name}</h4>
                    <p className="text-sm text-[#556B2F] font-medium mt-1">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </div>
  );
}

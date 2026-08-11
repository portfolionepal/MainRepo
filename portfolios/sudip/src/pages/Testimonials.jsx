import { Quote } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useAdminContext } from '../context/AdminContext';

export default function Testimonials() {
  const { siteContent } = useAdminContext();
  const testimonials = siteContent.testimonials.items;
  return (
    <div className="py-24 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-2xl font-bold tracking-widest text-secondary uppercase mb-3">Client Success</h1>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-6">What People Say</h2>
          <p className="text-xl text-gray-600">
            Real stories of transformation, leadership development, and organizational growth from our clients.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.id} delay={index * 0.1}>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative h-full flex flex-col">
                <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/5" />
                <div className="flex-grow">
                  <p className="text-gray-700 italic leading-relaxed mb-8 relative z-10">
                    "{testimonial.text}"
                  </p>
                </div>
                <div className="flex items-center mt-auto border-t border-gray-100 pt-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 shrink-0 shadow-sm">
                    {testimonial.image ? (
                      <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold font-serif text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">{testimonial.name}</h4>
                    <p className="text-sm text-[#556B2F] font-medium">{testimonial.role}</p>
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

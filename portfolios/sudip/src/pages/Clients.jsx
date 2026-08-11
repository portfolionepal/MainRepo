import AnimatedSection from '../components/AnimatedSection';
import { useAdminContext } from '../context/AdminContext';

export default function Clients() {
  const { siteContent } = useAdminContext();
  const clientLogos = siteContent.clients.items;
  return (
    <div className="py-24 bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-2xl font-bold tracking-widest text-secondary uppercase mb-3">Our Partners</h1>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-6">{siteContent.clients.pageTitle || "Trusted Across Industries"}</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {siteContent.clients.pageSubtitle || "We are proud to have partnered with some of the most forward-thinking organizations, helping them transform their teams, boost performance, and achieve exceptional results."}
          </p>
        </AnimatedSection>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {clientLogos.map((client, index) => (
            <AnimatedSection key={index} delay={index * 0.05}>
              <div className="bg-white rounded-full w-36 h-36 mx-auto flex items-center justify-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer overflow-hidden relative">
                <img 
                  src={client.url} 
                  alt={client.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-500 rounded-full"
                />
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA Section */}
        <AnimatedSection delay={0.4} className="mt-24 text-center bg-primary/5 rounded-[40px] p-12 md:p-16 border border-primary/10">
          <h3 className="text-3xl font-serif font-bold text-primary mb-4">Ready to transform your organization?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
            Join the ranks of these successful organizations and let us help you unlock your team's true potential.
          </p>
          <a href="/contact" className="inline-block bg-accent text-white font-semibold px-8 py-4 rounded-full hover:bg-accent-hover transition-colors shadow-lg">
            Let's Work Together
          </a>
        </AnimatedSection>

      </div>
    </div>
  );
}

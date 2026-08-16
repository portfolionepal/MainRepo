import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, TrendingUp, Users, Target, Award, Play, ChevronRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import Counter from '../components/Counter';
import { useAdminContext } from '../context/AdminContext';
import { getImageUrl } from '../utils/cloudinary';

export default function Home() {
  const { siteContent } = useAdminContext();
  const content = siteContent.home;
  
  const programs = [
    { title: siteContent.managerCoach.title, desc: siteContent.managerCoach.overview, image: siteContent.managerCoach.image, path: '/trainings/manager-coach' },
    { title: siteContent.leadershipDevelopment.title, desc: siteContent.leadershipDevelopment.overview, image: siteContent.leadershipDevelopment.image, path: '/trainings/leadership' },
    { title: siteContent.letsPlaySales.title, desc: siteContent.letsPlaySales.overview, image: siteContent.letsPlaySales.image, path: '/trainings/sales' },
    { title: siteContent.teamBuilding.title, desc: siteContent.teamBuilding.overview, image: siteContent.teamBuilding.image, path: '/trainings/team-building' },
    { title: siteContent.motivational.title, desc: siteContent.motivational.overview, image: siteContent.motivational.image, path: '/trainings/motivational' },
    { title: siteContent.tot.title, desc: siteContent.tot.overview, image: siteContent.tot.image, path: '/trainings/tot' }
  ];

  const industryLogos = siteContent.clients.items || [];
  const testimonials = (siteContent.testimonials.items || []).slice(0, 3);

  return (
    <div className="overflow-hidden">

      {/* Hero Section */}
      <section className="relative bg-surface pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div className="max-w-2xl">
              <AnimatedSection>
                <h1 className="text-5xl lg:text-7xl font-serif  text-primary leading-tight mb-6 tracking-tight">
                  {content.heroTitle} <br /> 
                  <span className="text-accent font-serif italic relative inline-block">
                    {content.heroHighlight}
                    <svg 
                      className="absolute -bottom-1 left-0 w-full h-3 sm:h-4 text-accent" 
                      viewBox="0 0 200 20" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                    >
                      <path 
                        d="M0 15 Q 100 -5 200 15" 
                        stroke="currentColor" 
                        strokeWidth="4" 
                        strokeLinecap="round" 
                      />
                    </svg>
                  </span>
                </h1>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                  {content.heroSubtitle}
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.4} className="flex flex-wrap gap-4">
                <Link to="/contact" className="px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-accent-hover transition-all flex items-center shadow-lg hover:shadow-xl">
                  {content.heroButtonPrimary} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/about" className="px-8 py-4 border-2 border-primary text-primary rounded-full font-medium hover:bg-transparent hover:ring-1 hover:ring-primary transition-all">
                  {content.heroButtonSecondary}
                </Link>
              </AnimatedSection>
            </div>

            {/* Right Image Design */}
            <AnimatedSection delay={0.3} className="relative mt-12 lg:mt-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/10 rounded-full blur-3xl -z-10"></div>

              <div className="relative rounded-[40px] rounded-br-[120px] rounded-tl-[120px] overflow-hidden shadow-2xl border-8 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src={getImageUrl(content.heroImage) || "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"}
                  alt="Professional Coaching"
                  className="w-full h-[500px] lg:h-[600px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-8 lg:bottom-12 -left-4 lg:-left-12 bg-white p-5 rounded-2xl shadow-xl flex items-center gap-4 animate-[bounce_3s_infinite]">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-bold text-primary text-lg leading-tight">{content.statsExperience || "20+"}</p>
                  <p className="text-sm text-gray-500">Years Experience</p>
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-16 relative -mt-12 z-20 mx-4 sm:mx-6 lg:mx-8 rounded-3xl shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-primary-light">
            <AnimatedSection className="text-center md:text-left px-4">
              <p className="text-4xl font-serif font-bold text-white mb-2">
                <Counter end={parseInt(content.statsExperience) || 20} suffix={content.statsExperience?.replace(/[0-9]/g, '') || "+"} />
              </p>
              <p className="text-gray-300 text-sm">Years of Experience</p>
            </AnimatedSection>
            <AnimatedSection delay={0.1} className="text-center md:text-left px-4 pt-8 md:pt-0">
              <p className="text-4xl font-serif font-bold text-white mb-2">
                <Counter end={parseInt(content.statsCountries) || 5} suffix={content.statsCountries?.replace(/[0-9]/g, '') || "+"} />
              </p>
              <p className="text-gray-300 text-sm">Recognized Training</p>
            </AnimatedSection>
            <AnimatedSection delay={0.2} className="text-center md:text-left px-4 pt-8 md:pt-0">
              <p className="text-4xl font-serif font-bold text-white mb-2">
                <Counter end={parseInt(content.statsIndividuals?.replace(/,/g, '')) || 10000} suffix={content.statsIndividuals?.replace(/[0-9,]/g, '') || "+"} />
              </p>
              <p className="text-gray-300 text-sm">Happy Clientele</p>
            </AnimatedSection>
            <AnimatedSection delay={0.3} className="text-center md:text-left px-4 pt-8 md:pt-0">
              <p className="text-4xl font-serif font-bold text-white mb-2">
                <Counter end={parseInt(content.statsOrganizations) || 100} suffix={content.statsOrganizations?.replace(/[0-9]/g, '') || "+"} />
              </p>
              <p className="text-gray-300 text-sm">Professionals Trained</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div className="aspect-[4/5] bg-gray-200 rounded-2xl overflow-hidden relative shadow-xl">
                <img
                  src={getImageUrl(siteContent.about?.coachPhoto || siteContent.about?.bgImage) || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800'}
                  alt={siteContent.about?.title || 'Sudeep Basnet'}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 bg-white/95 backdrop-blur-md p-6 rounded-tr-2xl shadow-md border-t border-r border-gray-100">
                  <p className="font-serif font-bold text-primary text-xl">{siteContent.about?.title || 'Sudeep Basnet'}</p>
                  <p className="text-sm text-secondary font-medium">{siteContent.about?.subtitle || 'Master Trainer & Coach'}</p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <h2 className="text-xl font-bold tracking-widest text-secondary uppercase mb-3">About The Coach</h2>
              <h3 className="text-4xl font-serif font-bold text-primary mb-6 leading-tight">{siteContent.about?.title || 'Sudeep Basnet'}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {siteContent.about?.paragraph1 || siteContent.about?.paragraph2}
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {siteContent.about?.paragraph3 || siteContent.about?.paragraph4}
              </p>
              <Link to="/about" className="inline-flex items-center text-accent font-medium hover:text-accent-hover transition-colors group">
                Read Full Bio <ChevronRight className="ml-1 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Training Programs Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xl font-bold tracking-widest text-secondary uppercase mb-3">Corporate Trainings</h2>
            <h3 className="text-4xl font-serif font-bold text-primary mb-6">Signature Programs</h3>
            <p className="text-gray-600">Tailored corporate training solutions designed to elevate your team's performance, motivation, and leadership capabilities.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <Link to={program.path} className="block h-full group">
                  <div className="relative h-96 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                    <img
                      src={getImageUrl(program.image)}
                      alt={program.title}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                      <h4 className="font-serif font-bold text-2xl text-white mb-3">{program.title}</h4>
                      <p className="text-gray-200 text-sm mb-4 line-clamp-2">{program.desc}</p>
                      <span className="text-white text-sm font-medium flex items-center opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-4 group-hover:translate-x-0">
                        Explore Program <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Coaching Section */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-4xl font-bold tracking-widest text-white uppercase mb-6">Professional Coaching</h2>
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                Coaching is a powerful partnership that facilitates self-discovery and meaningful growth. Whether you are navigating a career transition, seeking to enhance your leadership impact, or striving for personal balance, tailored coaching sessions provide the clarity and accountability needed to succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/coaching/leadership" className="px-6 py-3 bg-white text-primary rounded-full font-medium hover:bg-gray-100 transition-colors text-center">
                  Leadership Coaching
                </Link>
                <Link to="/coaching/life" className="px-6 py-3 border border-gray-500 text-white rounded-full font-medium hover:border-white transition-colors text-center">
                  Life Coaching
                </Link>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2} className="relative">
              <div className="aspect-square rounded-full border border-gray-700 p-8 flex items-center justify-center relative">
                <div className="absolute inset-4 rounded-full border border-gray-600 p-8">
                  <div className="absolute inset-4 rounded-full bg-primary-light flex items-center justify-center text-center shadow-inner overflow-hidden group">
                    <img
                      src={getImageUrl(content.coachingSectionImage) || "https://successinc.com.np/wp-content/uploads/2023/11/coaches.jpg"}
                      alt="Coaching success"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"; }}
                    />
                    {/* Dark overlay to make the text readable */}
                    <div className="absolute inset-0 bg-primary/70 group-hover:bg-primary/50 transition-colors duration-500"></div>

                    <p className="font-serif text-2xl italic relative z-10 p-8">{content.coachingSectionQuote || '"Success begins from within."'}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Industries Served (Marquee) */}
      <section className="py-16 bg-white overflow-hidden shadow-inner border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <AnimatedSection>
            <h3 className="text-sm font-bold tracking-widest text-gray-500 uppercase">Trusted Across Industries</h3>
          </AnimatedSection>
        </div>

        {/* Infinite Scroll Container */}
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee flex whitespace-nowrap items-center group-hover:[animation-play-state:paused]">
            {/* We duplicate the array to create a seamless loop */}
            {[...industryLogos, ...industryLogos, ...industryLogos, ...industryLogos].map((logo, index) => (
              <div
                key={index}
                className="mx-6 w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-50 shrink-0 p-4 overflow-hidden transform transition-transform hover:scale-105"
              >
                <img
                  src={getImageUrl(logo.url || logo.imageUrl || logo)}
                  alt={logo.name}
                  className="w-full h-full object-contain"
                  onError={(e) => { e.target.src = `https://placehold.co/200x200/F8F9FA/333?text=${logo.name.charAt(0)}`; }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-primary">Words of Appreciation</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="bg-surface p-8 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
                  <div className="text-accent mb-6">
                    <svg className="h-8 w-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 italic mb-8 flex-grow">{t.text}</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={getImageUrl(t.image || t.imageUrl || t)}
                      alt={t.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                    />
                    <div>
                      <p className="font-serif font-bold text-primary">{t.name}</p>
                      <p className="text-sm text-[#556B2F] font-medium">{t.role}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-secondary/5 -z-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-serif font-bold text-primary mb-6">{content.ctaTitle || 'Ready to Elevate Your Team?'}</h2>
            <p className="text-xl text-gray-600 mb-10">{content.ctaSubtitle || 'Connect with us today to discuss how we can customize a training or coaching program to meet your specific goals.'}</p>
            <Link to="/contact" className="inline-block px-10 py-5 bg-accent text-white rounded-full font-medium text-lg hover:bg-accent-hover transition-colors shadow-lg hover:shadow-xl">
              {content.ctaButton || 'Request a Consultation'}
            </Link>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}

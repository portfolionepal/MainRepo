import { MapPin, Phone, Mail, CheckCircle2, Loader2 } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useAdminContext } from '../context/AdminContext';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const { siteContent } = useAdminContext();
  const content = siteContent.contact;
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      form.current.reset();
      setTimeout(() => setSubmitStatus(null), 5000);
    }, (error) => {
      console.log(error.text);
      setIsSubmitting(false);
      setSubmitStatus('error');
    });
  };
  return (
    <div className="bg-surface pt-24 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left Column - Contact Info */}
          <AnimatedSection>
            <div className="bg-[#FCFFF5] rounded-[30px] p-10 lg:p-12 text-gray-900 h-full shadow-xl border border-gray-100">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">{content.title}</h2>
              <p className="text-gray-600 mb-10 text-lg">
                {content.subtitle}
              </p>

              {/* Social Icons */}
              <div className="flex gap-4 mb-12">
                <a href={content.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-[#1877F2] hover:bg-gray-100 transition-colors group">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5 fill-current transition-transform duration-300 group-hover:scale-125" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                </a>
                <a href={content.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-[#0A66C2] hover:bg-gray-100 transition-colors group">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5 fill-current transition-transform duration-300 group-hover:scale-125" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
                <a href={content.twitterUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-[#1DA1F2] hover:bg-gray-100 transition-colors group">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5 fill-current transition-transform duration-300 group-hover:scale-125" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                </a>
                <a href={content.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-[#E1306C] hover:bg-gray-100 transition-colors group">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5 fill-current transition-transform duration-300 group-hover:scale-125" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                <a href={content.youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 text-[#FF0000] hover:bg-gray-100 transition-colors group">
                  <span className="sr-only">YouTube</span>
                  <svg className="w-5 h-5 fill-current transition-transform duration-300 group-hover:scale-125" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </a>
              </div>

              {/* Contact Details */}
              <div className="space-y-8">
                {/* Phone */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 shrink-0">
                    <Phone className="w-5 h-5 text-[#0B7A38]" />
                  </div>
                  <div className="ml-6 pl-6 border-l border-gray-200">
                    <p className="font-semibold text-lg">{content.phone}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 shrink-0">
                    <Mail className="w-5 h-5 text-[#0B7A38]" />
                  </div>
                  <div className="ml-6 pl-6 border-l border-gray-200">
                    <p className="font-semibold text-lg">{content.email}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 shrink-0">
                    <MapPin className="w-5 h-5 text-[#0B7A38]" />
                  </div>
                  <div className="ml-6 pl-6 border-l border-gray-200">
                    <p className="font-semibold text-lg">{content.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column - Form */}
          <AnimatedSection delay={0.2} className="py-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Request a quote</h2>
            <p className="text-gray-500 mb-10 text-lg">We will get back to you within 24 hours, or call us.</p>

            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Name"
                  className="w-full bg-[#F5F7F6] border-0 rounded-xl px-6 py-4 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#0B7A38] outline-none transition-all"
                />
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Subject"
                  className="w-full bg-[#F5F7F6] border-0 rounded-xl px-6 py-4 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#0B7A38] outline-none transition-all"
                />
              </div>

              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className="w-full bg-[#F5F7F6] border-0 rounded-xl px-6 py-4 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#0B7A38] outline-none transition-all"
              />

              <div className="relative">
                <select name="topic" required defaultValue="" className="w-full bg-[#F5F7F6] border-0 rounded-xl px-6 py-4 text-gray-500 appearance-none focus:ring-2 focus:ring-[#0B7A38] outline-none transition-all">
                  <option value="" disabled>Select an Enquiry Topic</option>
                  {[
                    siteContent.managerCoach?.title,
                    siteContent.leadershipDevelopment?.title,
                    siteContent.letsPlaySales?.title,
                    siteContent.teamBuilding?.title,
                    siteContent.motivational?.title,
                    siteContent.tot?.title,
                    siteContent.wellbeing?.title,
                    siteContent.customerService?.title,
                  ].filter(Boolean).map((title, idx) => (
                    <option key={idx} value={title}>{title}</option>
                  ))}
                  <option value="Other Enquiry">Other Enquiry</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-6 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

              <textarea
                name="message"
                required
                placeholder="Your Message"
                rows="5"
                className="w-full bg-[#F5F7F6] border-0 rounded-xl px-6 py-4 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-[#0B7A38] outline-none transition-all resize-none"
              ></textarea>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#0B7A38] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#09632d] transition-colors shadow-lg shadow-green-900/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit request'}
              </button>
              
              {submitStatus === 'success' && (
                <AnimatedSection className="flex items-center gap-2 text-green-600 mt-4 p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Your message has been sent successfully!</span>
                </AnimatedSection>
              )}
              {submitStatus === 'error' && (
                <AnimatedSection className="text-red-500 mt-4 p-3 bg-red-50 rounded-lg font-medium">
                  Failed to send message. Please try again later.
                </AnimatedSection>
              )}
            </form>
          </AnimatedSection>
        </div>
      </div>

    </div>
  );
}

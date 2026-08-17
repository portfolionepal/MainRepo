import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaMapLocationDot, FaPhoneVolume, FaEnvelope, FaPaperPlane, FaSpinner, FaUser, FaTag, FaCommentDots, FaCircleCheck, FaInstagram, FaTiktok, FaWhatsapp, FaPhone, FaLocationDot } from 'react-icons/fa6';
const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
      .then((result) => {
          setIsSubmitting(false);
          setSubmitStatus('success');
          form.current.reset();
          setTimeout(() => setSubmitStatus(null), 5000);
      }, (error) => {
          setIsSubmitting(false);
          setSubmitStatus('error');
          setTimeout(() => setSubmitStatus(null), 5000);
      });
  };

  return (
    <section id="contact" className="py-24 bg-[#FAFBFC] relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern-grid pointer-events-none opacity-[0.3]"></div>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-accent font-bold tracking-widest uppercase text-sm mb-4 font-sans">Get In Touch</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-brand-navy mb-6">Let's Plan Your Future</h3>
          <p className="text-gray-600 text-base md:text-lg">
            Ready to start your journey? Contact our experts today for a consultation.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-white border border-gray-200 p-8 rounded-2xl h-full flex flex-col justify-between shadow-sm">
              <div>
                <h4 className="text-xl md:text-2xl font-extrabold text-brand-navy mb-8">Contact Information</h4>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-sky rounded-xl flex items-center justify-center shrink-0 shadow-[0_4px_10px_rgba(6,97,221,0.2)] group-hover:scale-105 transition-transform">
                      <FaLocationDot className="text-white" size={22} />
                    </div>
                    <div>
                      <h5 className="text-brand-navy font-bold mb-1">Our Location</h5>
                      <p className="text-gray-600 leading-relaxed font-medium">
                        New Baneshwor<br />
                        Kathmandu, Nepal
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-sky rounded-xl flex items-center justify-center shrink-0 shadow-[0_4px_10px_rgba(6,97,221,0.2)] group-hover:scale-105 transition-transform">
                      <FaPhone className="text-white" size={22} />
                    </div>
                    <div>
                      <h5 className="text-brand-navy font-bold mb-1">Phone Number</h5>
                      <p className="text-gray-600 font-medium">+977 (Phone Number Here)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-sky rounded-xl flex items-center justify-center shrink-0 shadow-[0_4px_10px_rgba(6,97,221,0.2)] group-hover:scale-105 transition-transform">
                      <FaEnvelope className="text-white" size={22} />
                    </div>
                    <div>
                      <h5 className="text-brand-navy font-bold mb-1">Email Address</h5>
                      <p className="text-gray-600 font-medium">info@trusteurohr.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h5 className="text-brand-navy font-bold mb-4">Follow Us</h5>
                <div className="flex flex-wrap gap-3">
                  <a href="#" className="w-11 h-11 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-xl flex items-center justify-center text-white hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(220,39,67,0.4)] transition-all">
                    <FaInstagram size={20} />
                  </a>
                  <a href="#" className="w-11 h-11 bg-black rounded-xl flex items-center justify-center text-white hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(0,0,0,0.4)] transition-all">
                    <FaTiktok size={18} />
                  </a>
                  <a href="#" className="w-11 h-11 bg-[#25D366] rounded-xl flex items-center justify-center text-white hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(37,211,102,0.4)] transition-all">
                    <FaWhatsapp size={22} />
                  </a>
                  <a href="#" className="w-11 h-11 bg-brand-blue rounded-xl flex items-center justify-center text-white hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(6,97,221,0.4)] transition-all">
                    <FaPhone size={18} />
                  </a>
                  <a href="#" className="w-11 h-11 bg-brand-sky rounded-xl flex items-center justify-center text-white hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(43,158,245,0.4)] transition-all">
                    <FaEnvelope size={18} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-white border border-gray-200 p-8 md:p-10 rounded-2xl shadow-sm relative overflow-hidden">
              <form ref={form} onSubmit={sendEmail} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-brand-navy mb-2">Your Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        name="user_name" 
                        required 
                        className="w-full bg-[#F7F9FC]/80 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-brand-navy focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/40 transition-all font-medium"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-brand-navy mb-2">Email Address</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="email" 
                        name="user_email" 
                        required 
                        className="w-full bg-[#F7F9FC]/80 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-brand-navy focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/40 transition-all font-medium"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-brand-navy mb-2">Subject</label>
                  <div className="relative">
                    <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      name="subject" 
                      required 
                      className="w-full bg-[#F7F9FC]/80 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-brand-navy focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/40 transition-all font-medium"
                      placeholder="e.g., Working Visa for Slovakia"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-brand-navy mb-2">Message</label>
                  <div className="relative">
                    <FaCommentDots className="absolute left-4 top-4 text-gray-400" size={18} />
                    <textarea 
                      name="message" 
                      required 
                      rows="4"
                      className="w-full bg-[#F7F9FC]/80 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-brand-navy focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/40 transition-all resize-none font-medium"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full bg-brand-blue text-white font-bold py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 hover:bg-brand-navy disabled:opacity-70 disabled:cursor-not-allowed group shadow-sm"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <FaSpinner className="animate-spin" size={20} />
                        Sending...
                      </span>
                    ) : submitStatus === 'success' ? (
                      <span className="flex items-center gap-2">
                        <FaCircleCheck size={20} />
                        Message Sent!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message <FaPaperPlane size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                    )}
                  </button>
                  {submitStatus === 'error' && (
                    <p className="text-brand-red text-center text-sm font-bold mt-4 animate-pulse">Failed to send message. Please try again.</p>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl overflow-hidden border border-gray-200 h-[450px] shadow-sm relative"
        >
          <iframe 
            src="https://maps.google.com/maps?q=New%20Baneshwor,%20Kathmandu,%20Nepal&t=&z=14&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
            title="Office Location Map"
          ></iframe>

          {/* Location Info Card Popup */}
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-[0_10px_30px_rgba(2,25,91,0.15)] border border-white z-10 flex items-center gap-4 max-w-[280px]">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-sky flex items-center justify-center shrink-0 shadow-inner text-white">
              <FaLocationDot size={22} />
            </div>
            <div>
              <h5 className="text-brand-navy font-extrabold text-sm mb-0.5">TrustEuroHR Office</h5>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">New Baneshwor, Kathmandu 44600, Nepal</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

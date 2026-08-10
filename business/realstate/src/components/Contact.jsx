// import { useState, useContext } from 'react';
// import { DataContext } from '../context/DataContext';
// import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
// import { FaLinkedinIn, FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// const Contact = () => {
//   const { siteConfig } = useContext(DataContext);
//   const [status, setStatus] = useState('idle'); // idle, submitting, success

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setStatus('submitting');
    
//     // Simulate API call
//     setTimeout(() => {
//       setStatus('success');
//       e.target.reset();
      
//       // Reset success message after 5 seconds
//       setTimeout(() => {
//         setStatus('idle');
//       }, 5000);
//     }, 1000);
//   };

//   return (
//     <section id="contact" className="py-24 bg-base">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="text-center max-w-3xl mx-auto mb-16"
//         >
//           <h2 className="text-sm text-accent uppercase tracking-widest font-medium mb-3">Get In Touch</h2>
//           <h3 className="text-3xl md:text-4xl font-heading font-semibold text-text mb-4">
//             Contact Us
//           </h3>
//           <p className="text-text-muted">
//             Have a question about land surveying or a property listing? Send a message and I'll get back to you shortly.
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-3 gap-12">
          
//           {/* Contact Info */}
//           <motion.div 
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="lg:col-span-1 space-y-8"
//           >
//             <div className="flex items-start gap-4">
//               <div className="w-12 h-12 rounded-md bg-surface border border-surface-border flex items-center justify-center flex-shrink-0 shadow-sm">
//                 <MapPin className="text-accent" size={24} strokeWidth={1.5} />
//               </div>
//               <div>
//                 <h4 className="text-lg font-heading font-semibold text-text mb-1">Location</h4>
//                 <p className="text-text-muted">{siteConfig.location}</p>
//               </div>
//             </div>
            
//             <div className="flex items-start gap-4">
//               <div className="w-12 h-12 rounded-md bg-surface border border-surface-border flex items-center justify-center flex-shrink-0 shadow-sm">
//                 <Phone className="text-accent" size={24} strokeWidth={1.5} />
//               </div>
//               <div>
//                 <h4 className="text-lg font-heading font-semibold text-text mb-1">Phone</h4>
//                 <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="text-text-muted hover:text-accent transition-colors">
//                   {siteConfig.phone}
//                 </a>
//               </div>
//             </div>
            
//             <div className="flex items-start gap-4">
//               <div className="w-12 h-12 rounded-md bg-surface border border-surface-border flex items-center justify-center flex-shrink-0 shadow-sm">
//                 <Mail className="text-accent" size={24} strokeWidth={1.5} />
//               </div>
//               <div>
//                 <h4 className="text-lg font-heading font-semibold text-text mb-1">Email</h4>
//                 <a href={`mailto:${siteConfig.email}`} className="text-text-muted hover:text-accent transition-colors">
//                   {siteConfig.email}
//                 </a>
//               </div>
//             </div>

//             <div className="pt-4 border-t border-surface-border">
//               <h4 className="text-lg font-heading font-semibold text-text mb-4">Connect with us</h4>
//               <div className="flex space-x-3">
//                 <a href={siteConfig.socialLinks.linkedin} className="w-10 h-10 rounded-full bg-surface border border-surface-border flex items-center justify-center text-[#0a66c2] hover:text-white hover:bg-[#0a66c2] hover:border-[#0a66c2] transition-all shadow-sm" aria-label="LinkedIn">
//                   <FaLinkedinIn size={18} />
//                 </a>
//                 <a href={siteConfig.socialLinks.facebook} className="w-10 h-10 rounded-full bg-surface border border-surface-border flex items-center justify-center text-[#1877f2] hover:text-white hover:bg-[#1877f2] hover:border-[#1877f2] transition-all shadow-sm" aria-label="Facebook">
//                   <FaFacebookF size={18} />
//                 </a>
//                 <a href={siteConfig.socialLinks.instagram} className="w-10 h-10 rounded-full bg-surface border border-surface-border flex items-center justify-center text-[#E1306C] hover:text-white hover:bg-[#E1306C] hover:border-[#E1306C] transition-all shadow-sm" aria-label="Instagram">
//                   <FaInstagram size={18} />
//                 </a>
//                 <a href={siteConfig.socialLinks.youtube} className="w-10 h-10 rounded-full bg-surface border border-surface-border flex items-center justify-center text-[#ff0000] hover:text-white hover:bg-[#ff0000] hover:border-[#ff0000] transition-all shadow-sm" aria-label="YouTube">
//                   <FaYoutube size={18} />
//                 </a>
//                 <a href={siteConfig.socialLinks.whatsapp} className="w-10 h-10 rounded-full bg-surface border border-surface-border flex items-center justify-center text-[#25D366] hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all shadow-sm" aria-label="WhatsApp">
//                   <FaWhatsapp size={18} />
//                 </a>
//               </div>
//             </div>
//           </motion.div>

//           {/* Contact Form */}
//           <motion.div 
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="lg:col-span-2"
//           >
//             <div className="bg-surface border border-surface-border rounded-md p-8 shadow-sm">
//               {status === 'success' ? (
//                 <motion.div 
//                   initial={{ scale: 0.9, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   className="flex flex-col items-center justify-center text-center py-12 px-4 h-full"
//                 >
//                   <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
//                     <CheckCircle2 className="text-success w-8 h-8" />
//                   </div>
//                   <h4 className="text-2xl font-heading font-semibold text-text mb-2">Message Sent</h4>
//                   <p className="text-text-muted">Thank you for reaching out. I will get back to you as soon as possible.</p>
//                 </motion.div>
//               ) : (
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-2">Full Name</label>
//                       <input 
//                         type="text" 
//                         id="name" 
//                         required
//                         className="w-full bg-base border border-surface-border rounded-md px-4 py-3 text-text focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
//                         placeholder="Enter the name"
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-2">Email Address</label>
//                       <input 
//                         type="email" 
//                         id="email" 
//                         required
//                         className="w-full bg-base border border-surface-border rounded-md px-4 py-3 text-text focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
//                         placeholder="Enter the email address"
//                       />
//                     </div>
//                   </div>
                  
//                   <div>
//                     <label htmlFor="subject" className="block text-sm font-medium text-text-muted mb-2">Subject</label>
//                     <input 
//                       type="text" 
//                       id="subject" 
//                       required
//                       className="w-full bg-base border border-surface-border rounded-md px-4 py-3 text-text focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
//                       placeholder="How can I help you?"
//                     />
//                   </div>
                  
//                   <div>
//                     <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-2">Message</label>
//                     <textarea 
//                       id="message" 
//                       rows={5}
//                       required
//                       className="w-full bg-base border border-surface-border rounded-md px-4 py-3 text-text focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
//                       placeholder="Write your message here..."
//                     ></textarea>
//                   </div>
                  
//                   <button 
//                     type="submit" 
//                     disabled={status === 'submitting'}
//                     className="w-full bg-accent hover:bg-accent-hover text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-70 flex justify-center items-center"
//                   >
//                     {status === 'submitting' ? (
//                       <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
//                     ) : (
//                       'Send Message'
//                     )}
//                   </button>
//                 </form>
//               )}
//             </div>
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;






import { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { siteConfig, addMessage } = useContext(DataContext);
  const [status, setStatus] = useState('idle'); // idle, submitting, success

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const formData = new FormData(e.target);
      const messageData = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };

      // Save to Firestore
      await addMessage(messageData);

      // Send Email Notification
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      e.target.reset();
      setStatus('success');
      
      // Auto reset success message
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting message:', error);
      setStatus('idle');
    }
  };

  return (
    <section id="contact" className="py-24 bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-sm text-accent uppercase tracking-widest font-medium mb-3">Get In Touch</h2>
          <h3 className="text-3xl md:text-4xl font-heading font-semibold text-text mb-4">
            Contact Us
          </h3>
          <p className="text-text-muted">
            Have a question about land surveying or a property listing? Send a message and I'll get back to you shortly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-md bg-surface border border-surface-border flex items-center justify-center flex-shrink-0 shadow-sm">
                <MapPin className="text-accent" size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-lg font-heading font-semibold text-text mb-1">Location</h4>
                <p className="text-text-muted">{siteConfig.location}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-md bg-surface border border-surface-border flex items-center justify-center flex-shrink-0 shadow-sm">
                <Phone className="text-accent" size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-lg font-heading font-semibold text-text mb-1">Phone</h4>
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="text-text-muted hover:text-accent transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-md bg-surface border border-surface-border flex items-center justify-center flex-shrink-0 shadow-sm">
                <Mail className="text-accent" size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-lg font-heading font-semibold text-text mb-1">Email</h4>
                <a href={`mailto:${siteConfig.email}`} className="text-text-muted hover:text-accent transition-colors">
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-surface-border">
              <h4 className="text-lg font-heading font-semibold text-text mb-4">Connect with us</h4>
              <div className="flex space-x-3">
                <a href={siteConfig.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface border border-surface-border flex items-center justify-center text-[#0a66c2] hover:text-white hover:bg-[#0a66c2] hover:border-[#0a66c2] transition-all shadow-sm" aria-label="LinkedIn">
                  <FaLinkedinIn size={18} />
                </a>
                <a href={siteConfig.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface border border-surface-border flex items-center justify-center text-[#1877f2] hover:text-white hover:bg-[#1877f2] hover:border-[#1877f2] transition-all shadow-sm" aria-label="Facebook">
                  <FaFacebookF size={18} />
                </a>
                <a href={siteConfig.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface border border-surface-border flex items-center justify-center text-[#E1306C] hover:text-white hover:bg-[#E1306C] hover:border-[#E1306C] transition-all shadow-sm" aria-label="Instagram">
                  <FaInstagram size={18} />
                </a>
                <a href={siteConfig.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface border border-surface-border flex items-center justify-center text-[#ff0000] hover:text-white hover:bg-[#ff0000] hover:border-[#ff0000] transition-all shadow-sm" aria-label="YouTube">
                  <FaYoutube size={18} />
                </a>
                <a href={siteConfig.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface border border-surface-border flex items-center justify-center text-[#25D366] hover:text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all shadow-sm" aria-label="WhatsApp">
                  <FaWhatsapp size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-surface border border-surface-border rounded-md p-8 shadow-sm">
              {status === 'success' ? (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 px-4 h-full"
                >
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="text-success w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-heading font-semibold text-text mb-2">Message Sent</h4>
                  <p className="text-text-muted">Thank you for reaching out. I will get back to you as soon as possible.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-2">Full Name</label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        required
                        className="w-full bg-base border border-surface-border rounded-md px-4 py-3 text-text focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        placeholder="Enter the name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-2">Email Address</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        required
                        className="w-full bg-base border border-surface-border rounded-md px-4 py-3 text-text focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        placeholder="Enter the email address"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-text-muted mb-2">Subject</label>
                    <input 
                      type="text" 
                      id="subject"
                      name="subject"
                      required
                      className="w-full bg-base border border-surface-border rounded-md px-4 py-3 text-text focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                      placeholder="How can I help you?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-muted mb-2">Message</label>
                    <textarea 
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full bg-base border border-surface-border rounded-md px-4 py-3 text-text focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full bg-accent hover:bg-accent-hover text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-70 flex justify-center items-center"
                  >
                    {status === 'submitting' ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
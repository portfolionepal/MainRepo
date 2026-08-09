import { useState, useRef, memo } from 'react';
import emailjs from '@emailjs/browser';

function Contact({ profileData, socialLinks }) {
  const address = profileData?.address || 'Makawanpurgadhi Rural Municipality-2, Makawanpur, Nepal';
  const contact = profileData?.contact || '';
  const email = profileData?.email || '';

  const getLink = (key) => {
    if (!socialLinks) return { url: '', show: false };
    const val = socialLinks[key];
    if (typeof val === 'string') return { url: val, show: !!val };
    return val || { url: '', show: false };
  };
  
  const form = useRef();
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setStatus('success');
      form.current.reset();
      setTimeout(() => setStatus(''), 5000);
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    });
  };

  const platforms = [
    { key: 'facebook', label: 'Facebook', id: 'social-facebook', iconClass: 'fa-brands fa-facebook-f', brandColor: 'text-[#1877F2]', hoverBorder: 'hover:border-[#1877F2]', hoverBg: 'hover:bg-[#f0f5ff]', hoverText: 'hover:text-[#1877F2]' },
    { key: 'instagram', label: 'Instagram', id: 'social-instagram', iconClass: 'fa-brands fa-instagram', brandColor: 'text-[#E4405F]', hoverBorder: 'hover:border-[#E4405F]', hoverBg: 'hover:bg-[#fff0f5]', hoverText: 'hover:text-[#E4405F]' },
    { key: 'linkedin', label: 'LinkedIn', id: 'social-linkedin', iconClass: 'fa-brands fa-linkedin-in', brandColor: 'text-[#0A66C2]', hoverBorder: 'hover:border-[#0A66C2]', hoverBg: 'hover:bg-[#f0f7ff]', hoverText: 'hover:text-[#0A66C2]' },
    { key: 'whatsapp', label: 'WhatsApp', id: 'social-whatsapp', iconClass: 'fa-brands fa-whatsapp', brandColor: 'text-[#25D366]', hoverBorder: 'hover:border-[#25D366]', hoverBg: 'hover:bg-[#e8fbf0]', hoverText: 'hover:text-[#25D366]' },
    { key: 'youtube', label: 'YouTube', id: 'social-youtube', iconClass: 'fa-brands fa-youtube', brandColor: 'text-[#FF0000]', hoverBorder: 'hover:border-[#FF0000]', hoverBg: 'hover:bg-[#fff0f0]', hoverText: 'hover:text-[#FF0000]' },
    { key: 'tiktok', label: 'TikTok', id: 'social-tiktok', iconClass: 'fa-brands fa-tiktok', brandColor: 'text-ink', hoverBorder: 'hover:border-ink', hoverBg: 'hover:bg-surface-alt', hoverText: 'hover:text-ink' },
    { key: 'twitter', label: 'Twitter / X', id: 'social-twitter', iconClass: 'fa-brands fa-x-twitter', brandColor: 'text-ink', hoverBorder: 'hover:border-ink', hoverBg: 'hover:bg-surface-alt', hoverText: 'hover:text-ink' },
  ];

  const activeSocials = platforms.map(p => ({ ...p, data: getLink(p.key) })).filter(p => p.data.show);

  return (
    <section id="contact" className="py-22 bg-surface-alt">
      <div className="max-w-[1120px] mx-auto px-7">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-merlot-subtle rounded-full mb-4 text-merlot text-lg">
            <i className="fa-solid fa-envelope" />
          </div>
          <h2 className="font-serif text-[clamp(1.7rem,3vw,2.3rem)] font-semibold text-ink mb-2.5">Get In Touch</h2>
          <span className="block w-11 h-[3px] bg-gradient-to-r from-merlot to-merlot-light mx-auto rounded-full mb-3" />
          <p className="text-[0.92rem] text-ink-light">Reach out for educational inquiries, collaborations, or advisory services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 max-w-[960px] mx-auto">
          {/* Contact Info */}
          <div className="flex flex-col gap-7">
            {/* Address */}
            <div className="flex gap-3.5 items-start">
              <div className="w-[42px] h-[42px] min-w-[42px] bg-merlot-subtle rounded-xl flex items-center justify-center text-merlot text-[0.95rem] shrink-0">
                <i className="fa-solid fa-location-dot" />
              </div>
              <div>
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-ink-light mb-1">Address</p>
                <p className="text-[0.95rem] text-ink font-medium">{address}</p>
              </div>
            </div>

            {/* Phone */}
            {contact && (
              <div className="flex gap-3.5 items-start">
                <div className="w-[42px] h-[42px] min-w-[42px] bg-merlot-subtle rounded-xl flex items-center justify-center text-merlot text-[0.95rem] shrink-0">
                  <i className="fa-solid fa-phone" />
                </div>
                <div>
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-ink-light mb-1">Phone</p>
                  <p className="text-[0.95rem] text-ink font-medium">{contact}</p>
                </div>
              </div>
            )}

            {/* Email */}
            {email && (
              <div className="flex gap-3.5 items-start">
                <div className="w-[42px] h-[42px] min-w-[42px] bg-merlot-subtle rounded-xl flex items-center justify-center text-merlot text-[0.95rem] shrink-0">
                  <i className="fa-solid fa-envelope" />
                </div>
                <div>
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-ink-light mb-1">Email</p>
                  <p className="text-[0.95rem] text-ink font-medium">{email}</p>
                </div>
              </div>
            )}

            {/* Social Links */}
            <div>
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-ink-light mb-3.5">Connect Online</p>
              <div className="flex flex-col gap-2.5">
                {activeSocials.map(s => (
                  <a key={s.id} href={s.data.url || '#'} target="_blank" rel="noopener noreferrer" id={s.id}
                    className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-[1.5px] border-border-soft text-[0.9rem] font-semibold text-ink bg-surface w-fit
                      transition-all duration-200 ${s.hoverBorder} ${s.hoverBg} ${s.hoverText}`}>
                    <i className={`${s.iconClass} ${s.brandColor} text-base w-5 text-center`} />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-surface border border-border-soft rounded-2xl p-7
            hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-shadow duration-300">
            <h3 className="text-[1.1rem] font-bold text-ink mb-1.5">
              <i className="fa-solid fa-paper-plane text-merlot mr-2 text-[0.95rem]" />
              Send a Message
            </h3>
            <p className="text-[0.86rem] text-ink-light mb-5">Fill in the form and I will get back to you shortly.</p>
            <form ref={form} className="flex flex-col gap-4" onSubmit={sendEmail}>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="text-[0.82rem] font-semibold text-ink">
                  <i className="fa-solid fa-user mr-1.5 text-[0.72rem] text-ink-light" />Name
                </label>
                <input type="text" id="contact-name" name="from_name" placeholder="Your full name" required
                  className="border-[1.5px] border-border-soft rounded-xl px-3.5 py-2.5 text-[0.93rem] font-sans text-ink bg-surface outline-none
                    focus:border-merlot focus:ring-2 focus:ring-merlot/10 transition-all duration-200" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="text-[0.82rem] font-semibold text-ink">
                  <i className="fa-solid fa-envelope mr-1.5 text-[0.72rem] text-ink-light" />Email
                </label>
                <input type="email" id="contact-email" name="from_email" placeholder="your@email.com" required
                  className="border-[1.5px] border-border-soft rounded-xl px-3.5 py-2.5 text-[0.93rem] font-sans text-ink bg-surface outline-none
                    focus:border-merlot focus:ring-2 focus:ring-merlot/10 transition-all duration-200" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-[0.82rem] font-semibold text-ink">
                  <i className="fa-solid fa-message mr-1.5 text-[0.72rem] text-ink-light" />Message
                </label>
                <textarea id="contact-message" name="message" rows={4} placeholder="Write your message..." required
                  className="border-[1.5px] border-border-soft rounded-xl px-3.5 py-2.5 text-[0.93rem] font-sans text-ink bg-surface outline-none resize-y
                    focus:border-merlot focus:ring-2 focus:ring-merlot/10 transition-all duration-200" />
              </div>
              
              {status === 'success' && <p className="text-[#16a34a] text-[0.85rem] font-semibold"><i className="fa-solid fa-circle-check mr-1.5" /> Message sent successfully!</p>}
              {status === 'error' && <p className="text-red-500 text-[0.85rem] font-semibold"><i className="fa-solid fa-circle-xmark mr-1.5" /> Failed to send. Please try again.</p>}
              
              <button type="submit" id="contact-submit-btn" disabled={status === 'sending'}
                className="w-full inline-flex items-center justify-center gap-2 bg-merlot text-white px-7 py-3.5 rounded-xl font-semibold text-[0.93rem]
                  hover:bg-merlot-dark hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(184,50,50,0.2)] active:translate-y-0 transition-all duration-200 cursor-pointer border-none disabled:opacity-70 disabled:cursor-not-allowed">
                {status === 'sending' ? (
                  <><i className="fa-solid fa-spinner fa-spin" /> Sending...</>
                ) : (
                  <><i className="fa-solid fa-paper-plane" /> Send Message</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Contact);

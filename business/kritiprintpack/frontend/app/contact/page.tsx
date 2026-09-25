"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  return (
    <>
      {/* Page Hero */}
      <section className="bg-brand-navy pt-32 pb-16">
        <Container>
          <div className="max-w-2xl">
            <span className="inline-block text-brand-orange text-sm font-semibold tracking-widest uppercase mb-4">
              Contact Us
            </span>
            <h1 className="font-display font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
              Get in Touch
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Have a packaging requirement? Questions about our products or services? Reach out
              and we&apos;ll get back to you within one business day.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-brand-gray-light">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <h2 className="font-display font-bold text-brand-gray-dark text-xl mb-6">Our Office</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-gray-dark text-sm mb-1">Address</p>
                    <p className="text-brand-gray text-sm leading-relaxed">{COMPANY_INFO.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-gray-dark text-sm mb-1">Phone</p>
                    <a href={`tel:${COMPANY_INFO.mobile}`} className="text-brand-gray text-sm hover:text-brand-orange transition-colors">
                      {COMPANY_INFO.mobile}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-gray-dark text-sm mb-1">Email</p>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-brand-gray text-sm hover:text-brand-orange transition-colors">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-gray-dark text-sm mb-1">Working Hours</p>
                    <p className="text-brand-gray text-sm">{COMPANY_INFO.workingHours}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-5 bg-white rounded-xl border border-gray-100">
                <p className="text-sm font-semibold text-brand-gray-dark mb-2">Looking for a quote?</p>
                <p className="text-xs text-brand-gray mb-4">
                  Use our quote form for detailed packaging requirements — we&apos;ll respond within 24 hours.
                </p>
                <Link href="/request-quote" className="text-brand-orange text-sm font-semibold hover:text-brand-orange-dark transition-colors">
                  Request a Quote →
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-display font-bold text-brand-gray-dark text-2xl mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-brand-gray mb-6">
                    Thank you for reaching out. We&apos;ll get back to you within one business day.
                  </p>
                  <Button onClick={() => { setForm(INITIAL_STATE); setSubmitted(false); }} variant="outline" size="md">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 p-8">
                  <h2 className="font-display font-bold text-brand-gray-dark text-xl mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-brand-gray-dark mb-1.5">
                          Full Name <span className="text-brand-orange">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange/30 ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300 focus:border-brand-orange"}`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-brand-gray-dark mb-1.5">
                          Company Name
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Your company"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm transition-colors hover:border-gray-300 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-brand-gray-dark mb-1.5">
                          Email Address <span className="text-brand-orange">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange/30 ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300 focus:border-brand-orange"}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-brand-gray-dark mb-1.5">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+977-XXXXXXXXXX"
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm transition-colors hover:border-gray-300 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-brand-gray-dark mb-1.5">
                        Message <span className="text-brand-orange">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange/30 resize-none ${errors.message ? "border-red-400 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300 focus:border-brand-orange"}`}
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>
                    <Button type="submit" variant="primary" size="md">
                      Send Message
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

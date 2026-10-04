"use client";

import { useState } from "react";
import { CheckCircle, Send, Loader2 } from "lucide-react";
import { useEffect } from "react";
import emailjs from '@emailjs/browser';
import { fetchAPI } from "@/lib/api";
import { COMPANY_INFO as DEFAULT_COMPANY_INFO } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface QuoteFormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  productOrService: string;
  quantity: string;
  requirements: string;
  message: string;
}

const INITIAL_STATE: QuoteFormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  productOrService: "",
  quantity: "",
  requirements: "",
  message: "",
};

const BENEFITS = [
  "Quote turnaround within 24 hours",
  "No commitment required",
  "Free packaging consultation included",
  "Sample available before bulk order",
  "Dedicated account manager assigned",
];

export default function RequestQuotePage() {
  const [form, setForm] = useState<QuoteFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<QuoteFormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [productOptions, setProductOptions] = useState<string[]>([]);
  const [serviceOptions, setServiceOptions] = useState<string[]>([]);
  const [COMPANY_INFO, setCompanyInfo] = useState(DEFAULT_COMPANY_INFO);

  useEffect(() => {
    async function loadOptions() {
      const p = await fetchAPI('/products');
      if (p) setProductOptions(p.map((x: any) => x.name));
      const s = await fetchAPI('/services');
      if (s) setServiceOptions(s.map((x: any) => x.name));
      const c = await fetchAPI('/contact');
      if (c) {
        setCompanyInfo((prev) => ({ ...prev, ...c }));
      }
    }
    loadOptions();
  }, []);

  function validate(): boolean {
    const newErrors: Partial<QuoteFormState> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.company.trim()) newErrors.company = "Company name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.productOrService) newErrors.productOrService = "Please select a product or service";
    if (!form.requirements.trim()) newErrors.requirements = "Please describe your requirements";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setSubmitError("");
      try {
        await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_QUOTE_SERVICE_ID || '',
          process.env.NEXT_PUBLIC_EMAILJS_QUOTE_TEMPLATE_ID || '',
          {
            from_name: form.name,
            company: form.company,
            from_email: form.email,
            phone: form.phone,
            product_or_service: form.productOrService,
            quantity: form.quantity,
            requirements: form.requirements,
            message: form.message,
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
        );
        setSubmitted(true);
      } catch (error) {
        console.error('Failed to send quote request:', error);
        setSubmitError('Failed to send request. Please check your connection or try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof QuoteFormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  const inputClass = (field: keyof QuoteFormState) =>
    `w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange/30 ${
      errors[field]
        ? "border-red-400 bg-red-50"
        : "border-gray-200 bg-white hover:border-gray-300 focus:border-brand-orange"
    }`;

  return (
    <>
      {/* Page Hero */}
      <section className="bg-brand-navy pt-32 pb-16">
        <Container>
          <div className="max-w-2xl">
            <span className="inline-block text-brand-orange text-sm font-semibold tracking-widest uppercase mb-4">
              Get a Quote
            </span>
            <h1 className="font-display font-bold text-white text-4xl lg:text-5xl leading-tight mb-4">
              Request a Free Quote
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Tell us about your packaging requirements and we&apos;ll prepare a detailed quote
              within 24 hours — no commitment required.
            </p>
          </div>
        </Container>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-brand-gray-light">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-brand-navy rounded-2xl p-8 text-white sticky top-24">
                <h2 className="font-display font-bold text-xl mb-5">What to Expect</h2>
                <ul className="space-y-4">
                  {BENEFITS.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-sm text-gray-400">Prefer to call?</p>
                  <a
                    href={`tel:${COMPANY_INFO.mobile}`}
                    className="text-white font-semibold hover:text-brand-orange transition-colors mt-1 block"
                  >
                    {COMPANY_INFO.mobile}
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="font-display font-bold text-brand-gray-dark text-2xl mb-2">
                    Quote Request Received!
                  </h3>
                  <p className="text-brand-gray mb-2">
                    Thank you, <strong>{form.name}</strong>. We&apos;ve received your request for{" "}
                    <strong>{form.productOrService}</strong>.
                  </p>
                  <p className="text-brand-gray mb-8">
                    Our team will prepare your quote and get back to you at{" "}
                    <strong>{form.email}</strong> within 24 hours.
                  </p>
                  <Button
                    onClick={() => { setForm(INITIAL_STATE); setSubmitted(false); }}
                    variant="outline"
                    size="md"
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 p-8">
                  <h2 className="font-display font-bold text-brand-gray-dark text-xl mb-6">
                    Your Packaging Requirements
                  </h2>
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Name + Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-brand-gray-dark mb-1.5">
                          Full Name <span className="text-brand-orange">*</span>
                        </label>
                        <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClass("name")} />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-brand-gray-dark mb-1.5">
                          Company Name <span className="text-brand-orange">*</span>
                        </label>
                        <input id="company" name="company" type="text" value={form.company} onChange={handleChange} placeholder="Your company" className={inputClass("company")} />
                        {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                      </div>
                    </div>

                    {/* Email + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-brand-gray-dark mb-1.5">
                          Email Address <span className="text-brand-orange">*</span>
                        </label>
                        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputClass("email")} />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-brand-gray-dark mb-1.5">Phone Number</label>
                        <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+977-XXXXXXXXXX" className={inputClass("phone")} />
                      </div>
                    </div>

                    {/* Product/Service */}
                    <div>
                      <label htmlFor="productOrService" className="block text-sm font-medium text-brand-gray-dark mb-1.5">
                        Product / Service <span className="text-brand-orange">*</span>
                      </label>
                      <select
                        id="productOrService"
                        name="productOrService"
                        value={form.productOrService}
                        onChange={handleChange}
                        className={`${inputClass("productOrService")} cursor-pointer`}
                      >
                        <option value="">Select a product or service...</option>
                        <optgroup label="Products">
                          {productOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </optgroup>
                        <optgroup label="Services">
                          {serviceOptions.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </optgroup>
                        <option value="Other / Not Listed">Other / Not Listed</option>
                      </select>
                      {errors.productOrService && <p className="text-red-500 text-xs mt-1">{errors.productOrService}</p>}
                    </div>

                    {/* Quantity */}
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-brand-gray-dark mb-1.5">
                        Estimated Quantity
                      </label>
                      <input id="quantity" name="quantity" type="text" value={form.quantity} onChange={handleChange} placeholder="e.g. 1,000 units / month" className={inputClass("quantity")} />
                    </div>

                    {/* Requirements */}
                    <div>
                      <label htmlFor="requirements" className="block text-sm font-medium text-brand-gray-dark mb-1.5">
                        Packaging Requirements <span className="text-brand-orange">*</span>
                      </label>
                      <textarea
                        id="requirements"
                        name="requirements"
                        rows={4}
                        value={form.requirements}
                        onChange={handleChange}
                        placeholder="Describe your product dimensions, weight, printing requirements, board type, or any special requirements..."
                        className={`${inputClass("requirements")} resize-none`}
                      />
                      {errors.requirements && <p className="text-red-500 text-xs mt-1">{errors.requirements}</p>}
                    </div>

                    {/* Additional Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-brand-gray-dark mb-1.5">
                        Additional Notes
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Any other information that would help us prepare an accurate quote..."
                        className={`${inputClass("message")} resize-none`}
                      />
                    </div>

                    <div className="pt-2">
                      {submitError && (
                        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm mb-4">
                          {submitError}
                        </div>
                      )}
                      <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            Submitting...
                            <Loader2 className="w-4 h-4 animate-spin ml-2" />
                          </>
                        ) : (
                          <>
                            Submit Quote Request
                            <Send className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                      <p className="text-xs text-gray-400 mt-3">
                        We&apos;ll respond within 24 hours. Your information will never be shared.
                      </p>
                    </div>
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

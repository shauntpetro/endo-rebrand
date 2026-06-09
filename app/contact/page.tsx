"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MapPin, Linkedin, Twitter, Send, CheckCircle2, AlertCircle } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterHoneypot, setNewsletterHoneypot] = useState("");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (formError) setFormError("");
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name as keyof typeof formData]);
  };

  const validateField = (name: string, value: string): boolean => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required.";
        break;
      case "email":
        if (!value.trim()) error = "Email is required.";
        else if (!EMAIL_REGEX.test(value.trim())) error = "Please enter a valid email address.";
        break;
      case "subject":
        if (!value.trim()) error = "Please select a subject.";
        break;
      case "message":
        if (!value.trim()) error = "Message is required.";
        else if (value.trim().length < 10) error = "Message must be at least 10 characters.";
        break;
    }
    if (error) {
      setFieldErrors((prev) => ({ ...prev, [name]: error }));
      return false;
    }
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
    return true;
  };

  const validateForm = (): boolean => {
    const nameValid = validateField("name", formData.name);
    const emailValid = validateField("email", formData.email);
    const subjectValid = validateField("subject", formData.subject);
    const messageValid = validateField("message", formData.message);
    // Mark all as touched
    setTouchedFields({ name: true, email: true, subject: true, message: true });
    return nameValid && emailValid && subjectValid && messageValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _honeypot: honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setFormError(data.error || "Something went wrong. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", company: "", subject: "", message: "" });
        setTouchedFields({});
        setFieldErrors({});
      }, 4000);
    } catch {
      setFormError("Network error. Please check your connection and try again.");
      setIsSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError("");

    if (!newsletterEmail.trim()) {
      setNewsletterError("Email is required.");
      return;
    }
    if (!EMAIL_REGEX.test(newsletterEmail.trim())) {
      setNewsletterError("Please enter a valid email address.");
      return;
    }

    setNewsletterSubmitting(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newsletterEmail.trim(),
          _honeypot: newsletterHoneypot,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setNewsletterError(data.error || "Something went wrong. Please try again.");
        setNewsletterSubmitting(false);
        return;
      }

      setNewsletterSubmitting(false);
      setNewsletterSuccess(true);

      setTimeout(() => {
        setNewsletterSuccess(false);
        setNewsletterEmail("");
      }, 4000);
    } catch {
      setNewsletterError("Network error. Please check your connection and try again.");
      setNewsletterSubmitting(false);
    }
  };

  const getFieldClassName = (fieldName: string, baseClass: string) => {
    const hasError = touchedFields[fieldName] && fieldErrors[fieldName];
    return `${baseClass} ${hasError ? "border-red-500 focus:border-red-500 focus:ring-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]" : "border-gray-mid focus:border-gold-primary focus:ring-gold-primary focus:shadow-[0_0_0_3px_rgba(201,169,97,0.1)]"}`;
  };

  return (
    <main className="min-h-screen bg-white flex flex-col font-sans selection:bg-gold-primary selection:text-white">
      <Navbar />

      <div className="pt-24 md:pt-32 pb-12 md:pb-20 container mx-auto px-6 flex-grow max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl leading-none font-serif font-bold mb-6 tracking-tight text-black-primary">
            Get in Touch
          </h1>
          <div className="w-16 h-0.5 bg-gold-primary mb-6" />
          <p className="text-xl md:text-2xl text-black-soft leading-relaxed font-light max-w-2xl">
            We&apos;re here to answer your questions and explore opportunities for collaboration. Reach out to learn more about our innovative therapeutics.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="space-y-8">
              {/* Office Location */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-start gap-3 mb-4 group">
                  <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-gold-primary/20 group-hover:scale-110 transition-all duration-300">
                    <MapPin className="text-gold-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-black-primary mb-2">Office</h3>
                    <p className="text-black-soft leading-relaxed">
                      Irvine, California<br />
                      United States
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-start gap-3 mb-4 group">
                  <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-gold-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Mail className="text-gold-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-black-primary mb-2">Email</h3>
                    <a
                      href="mailto:info@endocyclic.com"
                      className="text-black-soft hover:text-gold-primary transition-colors"
                    >
                      info@endocyclic.com
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-start gap-3 mb-4 group">
                  <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-gold-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Linkedin className="text-gold-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-black-primary mb-2">Connect</h3>
                    <div className="flex gap-4">
                      <a
                        href="https://www.linkedin.com/company/endocyclic-therapeutics"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-full bg-black-primary/5 hover:bg-gold-primary/10 flex items-center justify-center transition-colors group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="text-black-soft group-hover:text-gold-primary transition-colors" size={18} />
                      </a>
                      <a
                        href="https://twitter.com/EndoCyclic"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-full bg-black-primary/5 hover:bg-gold-primary/10 flex items-center justify-center transition-colors group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary"
                        aria-label="Twitter"
                      >
                        <Twitter className="text-black-soft group-hover:text-gold-primary transition-colors" size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Additional Info */}
              <div className="pt-8 border-t border-gray-mid">
                <p className="text-sm text-black-soft/70 leading-relaxed">
                  For media inquiries, partnership opportunities, or general questions, please use the contact form or reach out directly via email.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-gray-light rounded-xl p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-16 h-16 rounded-full bg-gold-primary/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="text-gold-primary" size={32} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-black-primary mb-3">
                    Thank You
                  </h3>
                  <p className="text-black-soft">
                    Your message has been sent. We&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
                  }}
                >
                  {/* Honeypot field - hidden from humans, bots will fill it */}
                  <div className="absolute opacity-0 -z-10" aria-hidden="true">
                    <label htmlFor="contact_website">Website</label>
                    <input
                      type="text"
                      id="contact_website"
                      name="_honeypot"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Form-level error */}
                  {formError && (
                    <div role="alert" className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                      <p className="text-sm text-red-700">{formError}</p>
                    </div>
                  )}

                  <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-black-primary mb-2 uppercase tracking-wider">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        aria-describedby={touchedFields.name && fieldErrors.name ? "name-error" : undefined}
                        aria-invalid={touchedFields.name && !!fieldErrors.name}
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getFieldClassName(
                          "name",
                          "w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-1 transition-colors text-black-primary"
                        )}
                        placeholder="Your name"
                      />
                      {touchedFields.name && fieldErrors.name && (
                        <p id="name-error" role="alert" className="mt-1.5 text-sm text-red-600">{fieldErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-black-primary mb-2 uppercase tracking-wider">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        aria-describedby={touchedFields.email && fieldErrors.email ? "email-error" : undefined}
                        aria-invalid={touchedFields.email && !!fieldErrors.email}
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={getFieldClassName(
                          "email",
                          "w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-1 transition-colors text-black-primary"
                        )}
                        placeholder="your.email@example.com"
                      />
                      {touchedFields.email && fieldErrors.email && (
                        <p id="email-error" role="alert" className="mt-1.5 text-sm text-red-600">{fieldErrors.email}</p>
                      )}
                    </div>
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
                    <label htmlFor="company" className="block text-sm font-semibold text-black-primary mb-2 uppercase tracking-wider">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-mid rounded-lg focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-colors text-black-primary"
                      placeholder="Your company or organization"
                    />
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
                    <label htmlFor="subject" className="block text-sm font-semibold text-black-primary mb-2 uppercase tracking-wider">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      aria-describedby={touchedFields.subject && fieldErrors.subject ? "subject-error" : undefined}
                      aria-invalid={touchedFields.subject && !!fieldErrors.subject}
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getFieldClassName(
                        "subject",
                        "w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-1 transition-colors text-black-primary"
                      )}
                    >
                      <option value="">Select a subject</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="media">Media Inquiry</option>
                      <option value="investor">Investor Relations</option>
                      <option value="career">Career Opportunities</option>
                      <option value="general">General Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                    {touchedFields.subject && fieldErrors.subject && (
                      <p id="subject-error" role="alert" className="text-red-500 text-xs mt-1.5 font-medium">{fieldErrors.subject}</p>
                    )}
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}>
                    <label htmlFor="message" className="block text-sm font-semibold text-black-primary mb-2 uppercase tracking-wider">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      aria-describedby={touchedFields.message && fieldErrors.message ? "message-error" : undefined}
                      aria-invalid={touchedFields.message && !!fieldErrors.message}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getFieldClassName(
                        "message",
                        "w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-1 transition-colors text-black-primary resize-none"
                      )}
                      placeholder="Tell us how we can help... (minimum 10 characters)"
                    />
                    {touchedFields.message && fieldErrors.message && (
                      <p id="message-error" role="alert" className="mt-1.5 text-sm text-red-600">{fieldErrors.message}</p>
                    )}
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-8 py-4 bg-black-primary text-white font-semibold uppercase tracking-wider text-sm rounded-lg hover:bg-gold-primary hover:shadow-[0_4px_20px_rgba(201,169,97,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.div>
                </motion.form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="bg-black-primary py-20 text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Stay Informed</h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Subscribe to receive updates on our clinical progress, scientific publications, and company news.
              </p>
            </div>
            <div>
              {newsletterSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-6 bg-white/10 rounded-lg"
                >
                  <CheckCircle2 className="text-gold-primary flex-shrink-0" size={24} />
                  <p className="text-white">Thank you for subscribing! We&apos;ll keep you updated.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  {/* Honeypot */}
                  <div className="absolute opacity-0 -z-10" aria-hidden="true">
                    <label htmlFor="nl_contact_website">Website</label>
                    <input
                      type="text"
                      id="nl_contact_website"
                      name="_honeypot"
                      value={newsletterHoneypot}
                      onChange={(e) => setNewsletterHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      aria-label="Newsletter email address"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        if (newsletterError) setNewsletterError("");
                      }}
                      className={`flex-1 px-4 py-3 bg-white/10 border rounded-lg text-white placeholder:text-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-2 focus-visible:ring-offset-plum-dark transition-colors ${
                        newsletterError ? "border-red-400 focus:border-red-400" : "border-white/20 focus:border-gold-primary"
                      }`}
                    />
                    <button
                      type="submit"
                      disabled={newsletterSubmitting}
                      className="px-6 py-3 bg-gold-primary text-black-primary font-semibold uppercase tracking-wider text-sm rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-2"
                    >
                      {newsletterSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black-primary/30 border-t-black-primary rounded-full animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        "Subscribe"
                      )}
                    </button>
                  </div>
                  {newsletterError && (
                    <p role="alert" className="text-sm text-red-400">{newsletterError}</p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

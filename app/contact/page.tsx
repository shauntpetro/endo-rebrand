"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, Linkedin, Twitter, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after showing success message
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-white flex flex-col font-sans selection:bg-gold-primary selection:text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-6 flex-grow max-w-7xl">
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
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="text-gold-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-black-primary mb-2">Office</h3>
                    <p className="text-black-soft leading-relaxed">
                      San Diego, California<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="text-gold-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-black-primary mb-2">Email</h3>
                    <a 
                      href="mailto:info@endometbiosciences.com" 
                      className="text-black-soft hover:text-gold-primary transition-colors"
                    >
                      info@endometbiosciences.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Linkedin className="text-gold-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-black-primary mb-2">Connect</h3>
                    <div className="flex gap-4">
                      <a 
                        href="#" 
                        className="w-10 h-10 rounded-full bg-black-primary/5 hover:bg-gold-primary/10 flex items-center justify-center transition-colors group"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="text-black-soft group-hover:text-gold-primary transition-colors" size={18} />
                      </a>
                      <a 
                        href="#" 
                        className="w-10 h-10 rounded-full bg-black-primary/5 hover:bg-gold-primary/10 flex items-center justify-center transition-colors group"
                        aria-label="Twitter"
                      >
                        <Twitter className="text-black-soft group-hover:text-gold-primary transition-colors" size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

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
            <div className="bg-gray-light rounded-sm p-8 md:p-10">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-black-primary mb-2 uppercase tracking-wider">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-mid rounded-sm focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-colors text-black-primary"
                        placeholder="Your name"
                      />
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
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-mid rounded-sm focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-colors text-black-primary"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-black-primary mb-2 uppercase tracking-wider">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-mid rounded-sm focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-colors text-black-primary"
                      placeholder="Your company or organization"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-black-primary mb-2 uppercase tracking-wider">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-mid rounded-sm focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-colors text-black-primary"
                    >
                      <option value="">Select a subject</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="media">Media Inquiry</option>
                      <option value="investor">Investor Relations</option>
                      <option value="career">Career Opportunities</option>
                      <option value="general">General Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-black-primary mb-2 uppercase tracking-wider">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-mid rounded-sm focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-colors text-black-primary resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-8 py-4 bg-black-primary text-white font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-gold-primary transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
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
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}


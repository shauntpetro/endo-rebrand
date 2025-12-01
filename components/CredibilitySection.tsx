"use client";

import { motion } from "framer-motion";

const logos = [
  { name: "NIH", label: "National Institutes of Health" },
  { name: "UCLA", label: "University of California, Los Angeles" },
  { name: "Milken Institute", label: "Milken Institute" },
  { name: "White House", label: "White House Recognition" },
  { name: "Nature", label: "Nature Medicine" },
];

export default function CredibilitySection() {
  return (
    <section className="py-20 bg-white border-b border-gray-mid">
      <div className="container mx-auto px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-therapeutics mb-12">
          Recognized for Innovation by
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 hover:opacity-100 transition-opacity duration-500">
          {logos.map((logo, index) => (
            <motion.div 
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center group cursor-default"
            >
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-black-primary group-hover:text-gold-primary transition-colors">
                {logo.name}
              </h3>
              <span className="block text-[10px] font-sans uppercase tracking-wider mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-therapeutics">
                {logo.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


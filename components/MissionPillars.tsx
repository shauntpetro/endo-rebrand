"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const pillars = [
  {
    id: "01",
    title: "Women’s Health",
    description: "Developing the first potential “curative” non-hormonal therapeutic for endometriosis to eliminate both the disease and its associated symptoms.",
    link: "/pipeline",
    icon: "❈" // Stylized icon
  },
  {
    id: "02",
    title: "Oncology",
    description: "Representing a new era of precision treatment, selectively accessing targets once beyond the limits of traditional therapy and turning cold tumors responsive.",
    link: "/pipeline",
    icon: "◈" 
  },
  {
    id: "03",
    title: "Diagnostics",
    description: "Pioneering first-in-class targeted, non-invasive, definitive imaging probes, including endometriosis and colon cancer.",
    link: "/imaging",
    icon: "◎"
  }
];

export default function MissionPillars() {
  return (
    <section className="bg-gradient-to-b from-[#E8E4F0] via-[#F3F0F7] to-white border-b border-black-primary relative overflow-hidden">
      {/* Background Pattern - Subtle texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#4A3B52 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-plum-primary/10 border-x border-plum-primary/10">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative p-12 flex flex-col h-full hover:bg-white transition-all duration-500 ease-out hover:shadow-xl z-10"
            >
              {/* Hover Accent Bar */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-primary to-plum-primary"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
              />

              <div className="flex justify-between items-start mb-8">
                <motion.span 
                  className="text-xs font-bold text-gold-primary tracking-widest font-sans border border-gold-primary/30 px-3 py-1 rounded-full"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {pillar.id}
                </motion.span>
                <motion.span 
                  className="text-2xl text-plum-primary/20 group-hover:text-gold-primary transition-colors duration-500 font-serif"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  {pillar.icon}
                </motion.span>
              </div>

              <motion.h3 
                className="text-3xl lg:text-4xl font-serif font-bold text-plum-primary mb-6 tracking-tight"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {pillar.title}
              </motion.h3>
              
              <p className="text-black-soft text-lg leading-relaxed mb-12 flex-grow font-sans font-normal border-l-2 border-transparent group-hover:border-gold-primary/50 pl-0 group-hover:pl-4 transition-all duration-300">
                {pillar.description}
              </p>
              
              <Link 
                href={pillar.link}
                className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-plum-primary group-hover:text-gold-primary transition-colors font-sans mt-auto"
              >
                <span className="border-b border-current pb-1">Learn More</span>
                <motion.span 
                  className="ml-3 text-lg leading-none"
                  whileHover={{ x: 4 }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

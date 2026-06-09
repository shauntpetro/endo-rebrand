"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  { name: "NIH", label: "National Institutes of Health", src: "/NIH_2013_logo_vertical.svg", width: 80, height: 80 },
  { name: "UCLA", label: "University of California, Los Angeles", src: "/University_of_California,_Los_Angeles_logo.svg", width: 90, height: 50 },
  { name: "Milken Institute", label: "Milken Institute", src: "/Milken_Institute_logo.svg", width: 120, height: 40 },
  { name: "White House", label: "White House Recognition", src: "/white-house.webp", width: 70, height: 70 },
  { name: "Nature", label: "Nature Medicine", src: null, width: 0, height: 0 },
];

export default function CredibilitySection() {
  return (
    <section className="py-20 bg-white border-b border-gray-mid">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-therapeutics mb-12 font-sans">
          Recognized for Innovation by
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 lg:gap-24">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group cursor-default flex flex-col items-center justify-center"
            >
              {logo.src ? (
                <div className="relative flex items-center justify-center h-16 md:h-20 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                  <Image
                    src={logo.src}
                    alt={logo.label}
                    width={logo.width}
                    height={logo.height}
                    className="object-contain max-h-full"
                  />
                </div>
              ) : (
                <div className="h-16 md:h-20 flex items-center justify-center">
                  <span className="text-2xl md:text-3xl font-serif font-bold italic text-black-primary/40 group-hover:text-gold-primary transition-colors duration-500">
                    {logo.name}
                  </span>
                </div>
              )}
              <span className="block text-[10px] font-sans uppercase tracking-wider mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-gray-therapeutics text-center max-w-[140px]">
                {logo.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

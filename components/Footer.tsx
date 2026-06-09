"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Footer() {
  return (
    <footer role="contentinfo" aria-label="Site footer" className="bg-plum-dark text-white pt-16 lg:pt-24 pb-12 border-t border-plum-dark relative overflow-hidden">
       {/* Background Decor */}
       <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gold-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="mb-12 lg:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
        >
          {/* Top row: Logo/description + link columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <motion.div variants={staggerItem} className="lg:col-span-4 mb-2 lg:mb-0">
              <Link href="/" className="relative block h-12 w-56 mb-6 lg:mb-8">
                 <Image
                    src="/logo.avif"
                    alt="EndoCyclic Therapeutics"
                    fill
                    sizes="224px"
                    className="object-contain object-left brightness-0 invert"
                 />
              </Link>
              <p className="text-gray-300 text-base lg:text-lg leading-relaxed font-normal max-w-sm font-sans mb-6 lg:mb-8">
                Clinical-stage precision medicine company developing first-in-class, targeted, non-hormonal therapeutics for endometriosis and oncology.
              </p>
              <div className="flex items-center space-x-2 text-gold-primary/80 font-mono text-xs uppercase tracking-widest">
                 <span className="w-2 h-2 rounded-full bg-gold-primary animate-pulse" />
                 <span>Irvine, CA</span>
              </div>
            </motion.div>

            {/* Link columns — 3-col on mobile, fits into 12-col on desktop */}
            <div className="grid grid-cols-3 lg:contents gap-6">
              <motion.div variants={staggerItem} className="lg:col-span-2 lg:col-start-7">
                <h4 className="font-bold mb-4 lg:mb-8 text-xs uppercase tracking-widest text-gold-primary font-sans">Platform</h4>
                <ul className="space-y-3 lg:space-y-4 text-sm text-gray-300 font-medium font-sans">
                  <li><Link href="/innovation" className="group hover:text-white transition-all duration-300 inline-flex items-center gap-2"><span className="w-0 group-hover:w-2 h-px bg-gold-primary transition-all duration-300" />Innovation</Link></li>
                  <li><Link href="/pipeline" className="group hover:text-white transition-all duration-300 inline-flex items-center gap-2"><span className="w-0 group-hover:w-2 h-px bg-gold-primary transition-all duration-300" />Pipeline</Link></li>
                  <li><Link href="/imaging" className="group hover:text-white transition-all duration-300 inline-flex items-center gap-2"><span className="w-0 group-hover:w-2 h-px bg-gold-primary transition-all duration-300" />Imaging</Link></li>
                </ul>
              </motion.div>

              <motion.div variants={staggerItem} className="lg:col-span-2">
                <h4 className="font-bold mb-4 lg:mb-8 text-xs uppercase tracking-widest text-gold-primary font-sans">Company</h4>
                <ul className="space-y-3 lg:space-y-4 text-sm text-gray-300 font-medium font-sans">
                  <li><Link href="/team" className="group hover:text-white transition-all duration-300 inline-flex items-center gap-2"><span className="w-0 group-hover:w-2 h-px bg-gold-primary transition-all duration-300" />Team</Link></li>
                  <li><Link href="/impact" className="group hover:text-white transition-all duration-300 inline-flex items-center gap-2"><span className="w-0 group-hover:w-2 h-px bg-gold-primary transition-all duration-300" />Impact</Link></li>
                  <li><Link href="/news" className="group hover:text-white transition-all duration-300 inline-flex items-center gap-2"><span className="w-0 group-hover:w-2 h-px bg-gold-primary transition-all duration-300" />News</Link></li>
                  <li><Link href="/investors" className="group hover:text-white transition-all duration-300 inline-flex items-center gap-2"><span className="w-0 group-hover:w-2 h-px bg-gold-primary transition-all duration-300" />Investors</Link></li>
                  <li><Link href="/media" className="group hover:text-white transition-all duration-300 inline-flex items-center gap-2"><span className="w-0 group-hover:w-2 h-px bg-gold-primary transition-all duration-300" />Media Kit</Link></li>
                </ul>
              </motion.div>

              <motion.div variants={staggerItem} className="lg:col-span-2">
                <h4 className="font-bold mb-4 lg:mb-8 text-xs uppercase tracking-widest text-gold-primary font-sans">Connect</h4>
                <ul className="space-y-3 lg:space-y-4 text-sm text-gray-300 font-medium font-sans">
                  <li><a href="https://www.linkedin.com/company/endocyclic-therapeutics" target="_blank" rel="noopener noreferrer" className="group hover:text-white transition-all duration-300 inline-flex items-center gap-2"><span className="w-0 group-hover:w-2 h-px bg-gold-primary transition-all duration-300" />LinkedIn</a></li>
                  <li><a href="https://twitter.com/EndoCyclic" target="_blank" rel="noopener noreferrer" className="group hover:text-white transition-all duration-300 inline-flex items-center gap-2"><span className="w-0 group-hover:w-2 h-px bg-gold-primary transition-all duration-300" />Twitter</a></li>
                  <li><Link href="/contact" className="group hover:text-white transition-all duration-300 inline-flex items-center gap-2"><span className="w-0 group-hover:w-2 h-px bg-gold-primary transition-all duration-300" />Contact</Link></li>
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Gold accent line */}
        <div className="flex items-center gap-4 mb-0">
          <div className="flex-1 h-px bg-white/10" />
          <div className="w-8 h-px bg-gold-primary/40" />
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/60 font-bold uppercase tracking-widest font-sans"
        >
          <p>EndoCyclic Therapeutics, Inc. &copy;2026</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
             <Link href="/contact?subject=terms" className="hover:text-white transition-colors">Terms of Use</Link>
             <Link href="/contact?subject=privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

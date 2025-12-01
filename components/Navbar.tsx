"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const isDarkHeader = pathname === "/imaging";

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const links = [
    { name: "Innovation", href: "/innovation" },
    { name: "Pipeline", href: "/pipeline" },
    { name: "Imaging", href: "/imaging" },
    { name: "Impact", href: "/impact" },
    { name: "Team", href: "/team" },
    { name: "News & Media", href: "/news" },
    { name: "Contact", href: "/contact" },
  ];

  // Animation timing based on page
  const logoDelay = isHomepage ? 0.2 : 0;
  const logoDuration = isHomepage ? 1.0 : 0.3;
  const linkBaseDelay = isHomepage ? 0.8 : 0.1;
  const linkStagger = isHomepage ? 0.08 : 0.03;
  const linkDuration = isHomepage ? 0.6 : 0.3;

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md border-black-primary/10 py-4" 
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -10, filter: isHomepage ? 'blur(10px)' : 'blur(0px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: logoDuration, delay: logoDelay, ease: "easeOut" }}
        >
          <Link href="/" className="relative block h-14 w-48 md:h-16 md:w-64">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img 
                src="/logo.avif" 
                alt="EndoCyclic Therapeutics" 
                className={clsx(
                  "h-full w-full object-contain object-left transition-all duration-300",
                  !isScrolled && isDarkHeader ? "brightness-0 invert" : ""
                )}
             />
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {links.map((link, index) => {
            const isActive = pathname === link.href;
            return (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: linkBaseDelay + index * linkStagger, duration: linkDuration, ease: "easeOut" }}
            >
              <Link
                href={link.href}
                className={clsx(
                  "text-xs font-bold uppercase tracking-[0.1em] transition-colors relative group",
                  isActive 
                    ? "text-gold-primary" 
                    : (!isScrolled && isDarkHeader ? "text-white hover:text-gold-primary" : "text-black-primary hover:text-gold-primary")
                )}
              >
                {link.name}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-primary group-hover:w-full transition-all duration-300"
                  initial={{ width: isActive ? "100%" : 0 }}
                  animate={{ width: isActive ? "100%" : 0 }}
                  whileHover={{ width: "100%" }}
                />
              </Link>
            </motion.div>
          )})}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: linkBaseDelay + links.length * linkStagger, duration: linkDuration, ease: "easeOut" }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={clsx(
                "px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors duration-300 rounded-sm shadow-sm",
                !isScrolled && isDarkHeader 
                  ? "bg-white text-plum-primary hover:bg-gold-primary hover:text-white" 
                  : "bg-plum-primary text-white hover:bg-gold-primary"
              )}
            >
              Partnership
            </motion.button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={clsx(
            "md:hidden p-2 transition-colors duration-300",
            !isScrolled && isDarkHeader ? "text-white" : "text-black-primary"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} className={!isScrolled && isDarkHeader ? "text-black-primary" : ""} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 bg-white z-40 md:hidden flex flex-col px-6 py-8 space-y-6 overflow-y-auto"
          >
            {links.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="text-2xl font-bold text-black-primary hover:text-gold-primary uppercase tracking-tighter block"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.05 }}
            >
              <button
                className="mt-8 w-full py-4 bg-plum-primary text-white text-sm font-bold uppercase tracking-widest rounded-sm"
                onClick={() => setIsOpen(false)}
              >
                Partnership Portal
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

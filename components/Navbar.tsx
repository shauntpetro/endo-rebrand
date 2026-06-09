"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
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

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [isOpen, closeMenu]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close menu on route change (update-during-render pattern)
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

  const links = [
    { name: "Innovation", href: "/innovation" },
    { name: "Pipeline", href: "/pipeline" },
    { name: "Imaging", href: "/imaging" },
    { name: "Impact", href: "/impact" },
    { name: "Team", href: "/team" },
    { name: "News & Media", href: "/news" },
    { name: "Investors", href: "/investors" },
    { name: "Contact", href: "/contact" },
  ];

  // Animation timing based on page
  const logoDelay = isHomepage ? 0.2 : 0;
  const logoDuration = isHomepage ? 1.0 : 0.3;
  const linkBaseDelay = isHomepage ? 0.8 : 0.1;
  const linkStagger = isHomepage ? 0.08 : 0.03;
  const linkDuration = isHomepage ? 0.6 : 0.3;

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isScrolled
            ? "bg-white/90 backdrop-blur-md border-black-primary/10 py-4 shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
            : "bg-transparent border-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: logoDuration, delay: logoDelay, ease: "easeOut" }}
          >
            <Link href="/" className="relative block h-14 w-48 lg:h-16 lg:w-52 xl:w-64">
               <Image
                  src="/logo.avif"
                  alt="EndoCyclic Therapeutics"
                  fill
                  sizes="(max-width: 1024px) 192px, (max-width: 1280px) 208px, 256px"
                  priority
                  className={clsx(
                    "object-contain object-left transition-all duration-300",
                    !isScrolled && isDarkHeader ? "brightness-0 invert" : ""
                  )}
               />
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-8">
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
                  aria-current={isActive ? "page" : undefined}
                  className={clsx(
                    "text-[10px] xl:text-xs font-bold uppercase tracking-[0.08em] xl:tracking-[0.1em] transition-colors relative group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary rounded-lg whitespace-nowrap",
                    isActive
                      ? "text-gold-primary"
                      : (!isScrolled && isDarkHeader ? "text-white hover:text-gold-primary" : "text-black-primary hover:text-gold-primary")
                  )}
                >
                  {link.name}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-gold-primary origin-left w-full"
                    initial={{ scaleX: isActive ? 1 : 0 }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </Link>
              </motion.div>
            )})}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: linkBaseDelay + links.length * linkStagger, duration: linkDuration, ease: "easeOut" }}
            >
              <Link href="/contact?subject=partnership">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={clsx(
                    "block px-4 xl:px-6 py-2.5 xl:py-3 text-[10px] xl:text-xs font-bold uppercase tracking-widest transition-colors duration-300 rounded-lg shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary",
                    !isScrolled && isDarkHeader
                      ? "bg-white text-plum-primary hover:bg-gold-primary hover:text-white hover:shadow-[0_0_20px_rgba(201,169,97,0.3)]"
                      : "bg-plum-primary text-white hover:bg-gold-primary hover:shadow-[0_0_20px_rgba(201,169,97,0.3)]"
                  )}
                >
                  Partnership
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className={clsx(
              "lg:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-primary rounded-lg relative z-[60]",
              !isScrolled && isDarkHeader && !isOpen ? "text-white" : "text-black-primary"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Backdrop — outside nav to avoid backdrop-filter containing block */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={closeMenu}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu — outside nav to avoid backdrop-filter containing block */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-20 bg-white z-50 lg:hidden flex flex-col px-6 py-8 space-y-6 overflow-y-auto"
          >
            {links.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={clsx(
                    "text-2xl font-bold hover:text-gold-primary hover:translate-x-2 transition-all duration-300 uppercase tracking-tighter block",
                    pathname === link.href ? "text-gold-primary" : "text-black-primary"
                  )}
                  onClick={closeMenu}
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
              <Link
                href="/contact?subject=partnership"
                className="mt-8 block w-full py-4 bg-plum-primary text-white text-sm font-bold uppercase tracking-widest rounded-lg text-center"
                onClick={closeMenu}
              >
                Partnership Portal
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

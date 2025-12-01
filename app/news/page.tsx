"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowUpRight, Download, Calendar, Tag, Search, Mail } from "lucide-react";
import clsx from "clsx";

// Types
type ArticleType = "All" | "Press Release" | "Publication" | "Award" | "Interview";

interface Article {
  id: number;
  type: ArticleType;
  date: string;
  source: string;
  title: string;
  excerpt?: string;
  image: string;
  link: string;
  featured?: boolean;
}

// Data - Real articles and press releases
const articles: Article[] = [
  {
    id: 1,
    type: "Award",
    date: "Sep 16, 2025",
    source: "BioSpace",
    title: "EndoCyclic Therapeutics Awarded Rare NIH 'Perfect 10' Grant for Endometriosis Therapeutic",
    excerpt: "EndoCyclic Therapeutics received a highly competitive NIH Commercialization Readiness Pilot (CRP) Program grant from NICHD, earning an exceptionally rare perfect overall impact score of 10. This funding accelerates the commercialization of ENDO-205, a non-hormonal, disease-modifying therapeutic designed to treat endometriosis.",
    image: "/recognition-perfect10.jpg",
    link: "https://www.biospace.com/press-releases/endocyclic-therapeutics-awarded-rare-nih-perfect-10-grant-for-endometriosis-therapeutic",
    featured: true
  },
  {
    id: 2,
    type: "Press Release",
    date: "Sep 17, 2025",
    source: "EndoCyclic Therapeutics",
    title: "EndoCyclic Therapeutics Named Founding Member of Milken Institute's Women's Health Network",
    excerpt: "EndoCyclic Therapeutics joins the Milken Institute's Women's Health Network as a founding member, furthering its commitment to advancing women's health initiatives and fostering collaboration in addressing critical health issues affecting women globally.",
    image: "/Milken_Institute_logo.svg",
    link: "https://www.endocyclictherapeutics.com/news",
    featured: false
  },
  {
    id: 3,
    type: "Press Release",
    date: "Sep 17, 2025",
    source: "BioWorld",
    title: "EndoCyclic's ENDO-205 Awarded NIH Grant for Endometriosis",
    excerpt: "BioWorld reports on EndoCyclic Therapeutics' NIH CRP grant award, highlighting the therapeutic's potential in addressing unmet needs in endometriosis treatment and the significance of this funding in advancing ENDO-205 toward commercialization.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2940&auto=format&fit=crop",
    link: "https://www.bioworld.com/articles/724279-endocyclics-endo-205-awarded-nih-grant-for-endometriosis",
    featured: false
  },
  {
    id: 4,
    type: "Press Release",
    date: "Sep 16, 2025",
    source: "BioSpace",
    title: "ENDO-205: First Non-Hormonal, Disease-Modifying Therapeutic for Endometriosis",
    excerpt: "EndoCyclic Therapeutics' ENDO-205 employs a pH-sensitive peptide mechanism that selectively eliminates lesions at the disease site while preserving healthy tissue. This innovative approach has the potential to become the first-ever disease-modifying therapy for endometriosis, affecting over 190 million women globally.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2940&auto=format&fit=crop",
    link: "https://www.biospace.com/press-releases/endocyclic-therapeutics-awarded-rare-nih-perfect-10-grant-for-endometriosis-therapeutic",
    featured: false
  },
  {
    id: 5,
    type: "Award",
    date: "Sep 16, 2025",
    source: "NIH NICHD",
    title: "NIH Commercialization Readiness Pilot Program Grant Awarded",
    excerpt: "The Eunice Kennedy Shriver National Institute of Child Health and Human Development (NICHD) awarded EndoCyclic Therapeutics a Commercialization Readiness Pilot Program grant with a perfect impact score, recognizing the company's innovative approach to addressing endometriosis, a condition affecting 10% of women of reproductive age.",
    image: "/NIH_2013_logo_vertical.svg",
    link: "https://seed.nih.gov/portfolio/nih-portfolio-company-showcase/endocyclic-therapeutics",
    featured: false
  },
  {
    id: 6,
    type: "Press Release",
    date: "Sep 16, 2025",
    source: "EndoCyclic Therapeutics",
    title: "Dr. Tanya Petrossian on ENDO-205's Transformative Potential",
    excerpt: "Dr. Tanya Petrossian, CEO of EndoCyclic Therapeutics, emphasizes that ENDO-205 has the potential to deliver a safe, effective, and transformative solution for women living with endometriosis, addressing a condition with an economic burden exceeding $100 billion annually in the U.S. alone.",
    image: "/team/tanya-petrossian.avif",
    link: "https://www.biospace.com/press-releases/endocyclic-therapeutics-awarded-rare-nih-perfect-10-grant-for-endometriosis-therapeutic",
    featured: false
  }
];

const categories: ArticleType[] = ["All", "Press Release", "Publication", "Award", "Interview"];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ArticleType>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.type === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         article.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find(a => a.featured) || articles[0];
  // Don't show featured article in the grid if we are on "All" view and no search, 
  // but if we filter, we might want to just show everything in a grid.
  // Let's keep it simple: If "All" and no search, show featured separately. 
  // Otherwise just show grid.
  const showFeaturedLayout = selectedCategory === "All" && !searchQuery;
  
  const gridArticles = showFeaturedLayout 
    ? filteredArticles.filter(a => a.id !== featuredArticle.id) 
    : filteredArticles;

  return (
    <main className="min-h-screen bg-white flex flex-col selection:bg-gold-primary/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-pastel-plum overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
           <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gold-primary/20 blur-[100px]" />
           <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-plum-primary/10 blur-[80px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h5 className="text-gold-primary font-bold tracking-widest uppercase mb-4 text-sm">Newsroom</h5>
              <h1 className="text-5xl md:text-7xl font-serif font-medium text-plum-primary mb-8 leading-tight">
                Pioneering Progress in <br/>
                <span className="italic">Women's Health</span>
              </h1>
              <p className="text-xl text-gray-therapeutics max-w-2xl leading-relaxed mb-10">
                Stay up to date with our latest breakthroughs, clinical milestones, and corporate announcements as we work to redefine standard of care.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-plum-primary text-white rounded-sm font-bold uppercase tracking-wider text-xs hover:bg-gold-primary transition-colors shadow-lg shadow-plum-primary/20">
                  <Mail size={16} /> Subscribe to Updates
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-sm text-plum-primary font-bold uppercase tracking-wider text-xs hover:border-gold-primary hover:text-gold-primary transition-colors shadow-sm">
                  <Download size={16} /> Media Kit
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-10 border-b border-gray-100 sticky top-[88px] bg-white/90 backdrop-blur-md z-30">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Categories */}
          <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={clsx(
                  "px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300",
                  selectedCategory === category
                    ? "bg-plum-primary text-white shadow-md"
                    : "bg-gray-light text-gray-500 hover:bg-gray-200"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72 group">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-light border border-transparent focus:bg-white focus:border-plum-primary focus:outline-none transition-all text-sm placeholder:text-gray-400"
            />
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-plum-primary transition-colors" />
          </div>
        </div>
      </section>

      <div className="flex-grow bg-white pb-24 pt-12">
        <div className="container mx-auto px-6">
          
          {/* Featured Article */}
          <AnimatePresence mode="wait">
            {showFeaturedLayout && (
              <motion.a 
                key="featured"
                href={featuredArticle.link}
                target={featuredArticle.link.startsWith('http') ? '_blank' : '_self'}
                rel={featuredArticle.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-16 block"
              >
                 <div className="group relative rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100 grid grid-cols-1 lg:grid-cols-12 hover:shadow-2xl transition-shadow">
                    <div className="lg:col-span-7 relative h-96 lg:h-auto overflow-hidden bg-gray-100">
                        {featuredArticle.image.endsWith('.svg') ? (
                            <div className="absolute inset-0 flex items-center justify-center p-12 bg-gradient-to-br from-plum-primary/5 to-gold-primary/5">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                    src={featuredArticle.image} 
                                    alt={featuredArticle.title}
                                    className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        ) : (
                            <>
                                <div 
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{ backgroundImage: `url(${featuredArticle.image})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden" />
                            </>
                        )}
                    </div>
                    <div className="lg:col-span-5 p-10 lg:p-14 flex flex-col justify-center relative bg-white">
                        <div className="flex items-center gap-3 mb-6">
                             <span className="px-3 py-1 rounded-full bg-gold-primary/10 text-gold-dark font-bold uppercase tracking-wider text-xs">
                                {featuredArticle.type}
                             </span>
                             <span className="text-gray-400 text-sm flex items-center gap-1">
                                <Calendar size={14} /> {featuredArticle.date}
                             </span>
                        </div>
                        
                        <h2 className="text-3xl md:text-4xl font-serif text-plum-primary mb-6 group-hover:text-gold-dark transition-colors leading-tight">
                            {featuredArticle.title}
                        </h2>
                        
                        {featuredArticle.excerpt && (
                            <p className="text-gray-therapeutics mb-8 leading-relaxed">
                                {featuredArticle.excerpt}
                            </p>
                        )}

                        <div className="flex items-center gap-2 text-plum-primary font-bold uppercase tracking-widest text-xs group-hover:translate-x-2 transition-transform mt-auto">
                            Read Story <ArrowUpRight size={16} />
                        </div>
                    </div>
                 </div>
              </motion.a>
            )}
          </AnimatePresence>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
                {gridArticles.map((article, index) => (
                    <motion.a 
                        key={article.id}
                        layout
                        href={article.link}
                        target={article.link.startsWith('http') ? '_blank' : '_self'}
                        rel={article.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                    >
                        <div className="relative h-60 overflow-hidden bg-gray-100">
                            {article.image.endsWith('.svg') ? (
                                <div className="absolute inset-0 flex items-center justify-center p-8 bg-gradient-to-br from-plum-primary/5 to-gold-primary/5">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img 
                                        src={article.image} 
                                        alt={article.title}
                                        className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            ) : (
                                <div 
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${article.image})` }}
                                />
                            )}
                            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur text-[10px] font-bold uppercase tracking-wider text-plum-primary shadow-sm">
                                {article.source}
                            </div>
                        </div>
                        <div className="p-8 flex flex-col flex-grow">
                             <div className="flex items-center gap-3 mb-4 text-xs text-gray-400 font-medium uppercase tracking-widest">
                                 <span className="text-gold-dark">{article.type}</span>
                                 <span>•</span>
                                 <span>{article.date}</span>
                             </div>
                             <h3 className="text-xl font-bold text-plum-primary mb-3 group-hover:text-gold-dark transition-colors line-clamp-3">
                                 {article.title}
                             </h3>
                             {article.excerpt && (
                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
                                    {article.excerpt}
                                </p>
                             )}
                             <div className="mt-auto pt-4 flex items-center text-xs font-bold uppercase tracking-wider text-plum-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                                 Read More <ArrowUpRight size={14} className="ml-1" />
                             </div>
                        </div>
                    </motion.a>
                ))}
            </AnimatePresence>
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-20">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={24} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-plum-primary mb-2">No articles found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                <button 
                    onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                    className="mt-6 text-gold-dark font-bold hover:underline"
                >
                    Clear filters
                </button>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="bg-plum-primary py-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-serif mb-6">Stay connected with our journey</h2>
                    <p className="text-white/70 text-lg mb-8 max-w-md">
                        Join our newsletter to receive the latest updates on our clinical progress, scientific publications, and company news.
                    </p>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 text-sm text-white/60">
                            <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-gold-primary" /> Quarterly Updates</span>
                            <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-gold-primary" /> Key Milestones Only</span>
                            <span className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-gold-primary" /> No Spam</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest mb-2 text-gold-primary">Email Address</label>
                            <input 
                                type="email" 
                                id="email"
                                placeholder="name@company.com" 
                                className="w-full px-4 py-3 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-primary transition-colors"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-widest mb-2 text-gold-primary">First Name</label>
                                <input 
                                    type="text" 
                                    id="firstName"
                                    className="w-full px-4 py-3 rounded bg-white/10 border border-white/20 text-white focus:outline-none focus:border-gold-primary transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-widest mb-2 text-gold-primary">Last Name</label>
                                <input 
                                    type="text" 
                                    id="lastName"
                                    className="w-full px-4 py-3 rounded bg-white/10 border border-white/20 text-white focus:outline-none focus:border-gold-primary transition-colors"
                                />
                            </div>
                        </div>
                        <button type="submit" className="w-full py-4 bg-gold-primary text-plum-primary font-bold uppercase tracking-widest rounded hover:bg-white transition-colors mt-2">
                            Subscribe
                        </button>
                        <p className="text-xs text-white/40 text-center">
                            By subscribing, you agree to our Privacy Policy.
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

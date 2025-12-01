import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-plum-dark text-white pt-24 pb-12 border-t border-plum-dark relative overflow-hidden">
       {/* Background Decor */}
       <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gold-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/4 pointer-events-none" />
       
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-4">
            <Link href="/" className="relative block h-12 w-56 mb-8">
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img 
                  src="/logo.avif" 
                  alt="EndoCyclic Therapeutics" 
                  className="h-full w-full object-contain object-left brightness-0 invert"
               />
            </Link>
            <p className="text-gray-400 text-lg leading-relaxed font-normal max-w-sm font-sans mb-8">
              Leading a new era in women's health with first-in-class, targeted, non-hormonal therapeutics.
            </p>
            <div className="flex items-center space-x-2 text-gold-primary/80 font-mono text-xs uppercase tracking-widest">
               <span className="w-2 h-2 rounded-full bg-gold-primary animate-pulse" />
               <span>San Diego, CA</span>
            </div>
          </div>
          
          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="font-bold mb-8 text-xs uppercase tracking-widest text-gold-primary font-sans">Platform</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium font-sans">
              <li><Link href="/innovation" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Innovation</Link></li>
              <li><Link href="/pipeline" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Pipeline</Link></li>
              <li><Link href="/imaging" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Imaging</Link></li>
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="font-bold mb-8 text-xs uppercase tracking-widest text-gold-primary font-sans">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium font-sans">
              <li><Link href="/team" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Team</Link></li>
              <li><Link href="/impact" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Impact</Link></li>
              <li><Link href="/news" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">News</Link></li>
            </ul>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="font-bold mb-8 text-xs uppercase tracking-widest text-gold-primary font-sans">Connect</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium font-sans">
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Twitter</a></li>
              <li><Link href="/contact" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-bold uppercase tracking-widest font-sans">
          <p>EndoMet Biosciences, Inc. &copy;2025</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
             <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

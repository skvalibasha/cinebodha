import { useState } from "react";
import { Link } from "wouter";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Play, Menu, X, Instagram, ArrowUp, Mail, MessageCircle, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/contexts/LanguageContext";
import { InstallAppButton } from "@/components/PWAInstallPrompt";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledFar, setIsScrolledFar] = useState(false);
  const [isScrolledContact, setIsScrolledContact] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const { lang, setLang, t } = useLang();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
    setIsScrolledContact(latest > 200);
    setIsScrolledFar(latest > 400);
  });

  const navLinks = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.topics, href: "#topics" },
    { name: t.nav.videos, href: "#videos" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.faq, href: "#faq" },
    { name: t.nav.contact, href: "#contact" },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[60] origin-left"
        style={{ scaleX: scrollYProgress, opacity: isScrolled ? 1 : 0 }}
      />

      <AnimatePresence>
        {isScrolledFar && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-6 z-[60] w-12 h-12 rounded-full glass-card border border-primary text-primary flex items-center justify-center hover:bg-primary/10 hover:scale-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isScrolledContact && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed bottom-6 left-6 z-[60] flex flex-col gap-3"
          >
            <a
              href="https://wa.me/918639?text=Hi%20CineBodha!%20I%20visited%20your%20website."
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp CineBodha"
              className="w-12 h-12 rounded-full flex items-center justify-center bg-[#25D366] text-white hover:scale-110 transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)]"
            >
              <MessageCircle className="w-5 h-5" fill="currentColor" />
            </a>
            <a
              href="mailto:lovelyprince8639@gmail.com"
              title="Email CineBodha"
              className="w-12 h-12 rounded-full glass-card border border-primary text-primary flex items-center justify-center hover:bg-primary/10 hover:scale-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-white/5 py-4 shadow-2xl"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-3 group cursor-pointer">
            <img
              src={`${import.meta.env.BASE_URL}logo.jpg`}
              alt="CineBodha"
              className="w-10 h-10 rounded-full object-cover border-2 border-primary/60 group-hover:border-primary transition-colors duration-300"
            />
            <span className="font-display text-2xl font-bold tracking-wider text-foreground">
              CineBodha
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors tracking-wide uppercase"
              >
                {link.name}
              </button>
            ))}
          </div>
          
          {/* Install App */}
          <InstallAppButton />

          {/* Language Toggle */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10">
            <Globe className="w-3.5 h-3.5 text-muted-foreground mr-1" />
            <button
              onClick={() => setLang("en")}
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-bold transition-all",
                lang === "en" ? "bg-primary text-background" : "text-muted-foreground hover:text-foreground"
              )}
            >
              EN
            </button>
            <button
              onClick={() => setLang("te")}
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-bold transition-all",
                lang === "te" ? "bg-primary text-background" : "text-muted-foreground hover:text-foreground"
              )}
            >
              TE
            </button>
          </div>

          <div className="flex items-center gap-4 border-r border-white/10 pr-6">
            <a 
              href="https://youtube.com/@cinebodha" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              title="YouTube"
            >
              <Play className="w-5 h-5" fill="currentColor" />
            </a>
            <a 
              href="https://www.instagram.com/cinebodhaofficial" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
          
          <a 
            href="https://youtube.com/@cinebodha" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full bg-white/5 border border-primary/30 text-primary font-medium hover:bg-primary hover:text-background transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center gap-2"
          >
            <Play className="w-4 h-4" fill="currentColor" />
            {t.nav.subscribe}
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile Language Toggle */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10">
            <button
              onClick={() => setLang("en")}
              className={cn(
                "px-2 py-0.5 rounded-full text-xs font-bold transition-all",
                lang === "en" ? "bg-primary text-background" : "text-muted-foreground"
              )}
            >
              EN
            </button>
            <button
              onClick={() => setLang("te")}
              className={cn(
                "px-2 py-0.5 rounded-full text-xs font-bold transition-all",
                lang === "te" ? "bg-primary text-background" : "text-muted-foreground"
              )}
            >
              TE
            </button>
          </div>
          <button 
            className="text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/10 px-6 py-8 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="text-lg font-medium text-foreground hover:text-primary transition-colors text-left"
            >
              {link.name}
            </button>
          ))}
          <a 
            href="https://youtube.com/@cinebodha" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 mt-4 rounded-full bg-primary text-background font-bold text-center flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" fill="currentColor" />
            {t.nav.subscribe}
          </a>
          <a 
            href="https://www.instagram.com/cinebodhaofficial" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-white/5 border border-primary/30 text-primary font-bold text-center flex items-center justify-center gap-2"
          >
            <Instagram className="w-4 h-4" />
            Follow on Instagram
          </a>
        </motion.div>
      )}
    </motion.nav>
    </>
  );
}

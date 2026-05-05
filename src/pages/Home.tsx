import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import confetti from "canvas-confetti";
import { Play, BookOpen, History, FlaskConical, Quote, Palette, Brain, ArrowRight, Eye, Users, Video as VideoIcon, Calendar, Instagram, X, Search, SearchX, Copy, Bell, MessageCircle, Bookmark, BookmarkCheck, Send, Bot, ChevronRight, Zap } from "lucide-react";
import { ParticleCanvas } from "@/components/ParticleCanvas";
import { useGetVideos, useGetTopics, useGetStats } from "@/api-client";
import { useLang } from "@/contexts/LanguageContext";

type ChatMessage = { role: "user" | "assistant"; content: string };

function CineBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "నమస్కారం! నేను CineBot 🎬 — CineBodha AI assistant. Videos, topics, లేదా channel గురించి ఏమైనా అడగండి!" }
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const sendMessage = useCallback(async () => {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: msg }]);
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history: messages.slice(-6) }),
      });
      const data = await res.json();
      const reply: string = data.reply || "Sorry, reply రాలేదు. మళ్ళీ try చేయండి! 🙏";
      setLoading(false);
      // Typewriter effect
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);
      let i = 0;
      const tick = () => {
        i++;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: reply.slice(0, i) };
          return updated;
        });
        if (i < reply.length) setTimeout(tick, 18);
      };
      setTimeout(tick, 18);
    } catch {
      setLoading(false);
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry! Connection problem. మళ్ళీ try చేయండి. 🙏" }]);
    }
  }, [input, loading, messages]);

  const QUICK = ["మంచి video suggest చేయండి", "Latest video ఏది?", "Iron Man video గురించి చెప్పు", "Subscribe ఎలా?"];

  return (
    <>
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-[300] w-14 h-14 rounded-full bg-primary shadow-[0_0_25px_rgba(212,175,55,0.5)] flex items-center justify-center text-background hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] transition-shadow"
        title="CineBot తో మాట్లాడు"
      >
        {open ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 left-4 z-[299] w-[340px] max-h-[520px] flex flex-col glass-card border border-primary/30 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-primary/10 border-b border-primary/20">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="w-4 h-4 text-background" />
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">CineBot</p>
                <p className="text-xs text-primary">CineBodha AI Assistant</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed font-telugu ${
                    m.role === "user"
                      ? "bg-primary text-background rounded-br-sm"
                      : "bg-white/10 text-foreground rounded-bl-sm border border-white/10"
                  }`}>
                    {m.content || <span className="opacity-50 italic">...</span>}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 border border-white/10 px-4 py-2 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 1 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {QUICK.map(q => (
                  <button key={q} onClick={() => { setInput(q); setTimeout(() => inputRef.current?.focus(), 0); }}
                    className="text-xs px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors font-telugu truncate max-w-[150px]">
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex items-center gap-2 p-3 border-t border-white/10">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="ఏమైనా అడగండి..."
                className="flex-1 bg-white/5 border border-white/15 rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 font-telugu"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-background hover:bg-primary/90 transition-all disabled:opacity-40 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const YT_CHANNEL = "https://youtube.com/@cinebodha";
const IG_URL = "https://www.instagram.com/cinebodhaofficial";

// Fallback data in case API fails to ensure the UI still looks stunning
const FALLBACK_STATS = { subscribers: "1K+", videos: "24", views: "10K+", years: "1" };

const FALLBACK_TOPICS = [
  { id: 1, name: "Behavioral Architecture", nameTelugu: "ప్రవర్తన నిర్మాణం", description: "How characters in stories reveal deep psychology and behavior patterns", tag: "PSYCHOLOGY", image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80", icon: "Brain" },
  { id: 2, name: "Applied Science", nameTelugu: "అనువర్తిత విజ్ఞానం", description: "Real physics and science decoded through cinematic storytelling", tag: "SCIENCE", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80", icon: "Flask" },
  { id: 3, name: "History & Culture", nameTelugu: "చరిత్ర & సంస్కృతి", description: "Civilizations, empires, and cultural heritage decoded", tag: "HISTORY", image: "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?w=800&q=80", icon: "History" },
  { id: 4, name: "Strategic Motivation", nameTelugu: "వ్యూహాత్మక ప్రేరణ", description: "Life lessons and mindset shifts from powerful cinematic characters", tag: "MINDSET", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80", icon: "Book" },
  { id: 5, name: "Global Intel", nameTelugu: "గ్లోబల్ ఇంటెల్", description: "World affairs and intellectual concepts explained in Telugu", tag: "GLOBAL", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80", icon: "Globe" },
  { id: 6, name: "Life Lessons", nameTelugu: "జీవిత పాఠాలు", description: "Timeless wisdom from iconic heroes and human experiences", tag: "WISDOM", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80", icon: "Mind" },
];

const FALLBACK_VIDEOS = [
  { id: 1, title: "భారత్ లో 5,000 సంవత్సరాల నగరం!", titleTelugu: "Indus Valley Telugu | CineBodha", category: "History", duration: "7:19", views: "14", publishedAt: "7 hours ago", youtubeUrl: "https://www.youtube.com/watch?v=ciWyfgE7e98", thumbnail: "https://img.youtube.com/vi/ciWyfgE7e98/maxresdefault.jpg" },
  { id: 2, title: "నాన్న చిన్నవాడు అయిపోయాడు!", titleTelugu: "Interstellar Science Telugu | Time Dilation", category: "Science", duration: "7:23", views: "70", publishedAt: "6 days ago", youtubeUrl: "https://www.youtube.com/watch?v=tYUACKUtFYU", thumbnail: "https://img.youtube.com/vi/tYUACKUtFYU/maxresdefault.jpg" },
  { id: 3, title: "Iron Man నేర్పిన 5 Life Lessons", titleTelugu: "మీ Trauma మీ Superpower | CineBodha", category: "Psychology", duration: "5:45", views: "203", publishedAt: "2 weeks ago", youtubeUrl: "https://www.youtube.com/watch?v=LiDzeG0a3eY", thumbnail: "https://img.youtube.com/vi/LiDzeG0a3eY/maxresdefault.jpg" },
  { id: 4, title: "మనం ఎందుకు భయపడతాం?", titleTelugu: "Fear Psychology | CineBodha", category: "Psychology", duration: "8:12", views: "342", publishedAt: "1 month ago", youtubeUrl: "https://www.youtube.com/watch?v=ciWyfgE7e98", thumbnail: "https://img.youtube.com/vi/ciWyfgE7e98/maxresdefault.jpg" },
  { id: 5, title: "సినిమాల్లో కలర్స్ సీక్రెట్", titleTelugu: "Color Theory in Movies", category: "Visual Storytelling", duration: "6:30", views: "415", publishedAt: "2 months ago", youtubeUrl: "https://www.youtube.com/watch?v=tYUACKUtFYU", thumbnail: "https://img.youtube.com/vi/tYUACKUtFYU/maxresdefault.jpg" },
  { id: 6, title: "చాణక్య నీతి - నేటి జీవితం", titleTelugu: "Chanakya Niti | Strategy", category: "Mindset", duration: "9:05", views: "589", publishedAt: "3 months ago", youtubeUrl: "https://www.youtube.com/watch?v=LiDzeG0a3eY", thumbnail: "https://img.youtube.com/vi/LiDzeG0a3eY/maxresdefault.jpg" },
];

const CATEGORIES = ["All", "History", "Science", "Psychology", "Mindset", "Visual Storytelling"];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

function CountUp({ value, duration = 2 }: { value: string; duration?: number }) {
  const [count, setCount] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (!isInView) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    const suffix = value.replace(/[0-9.]/g, "");
    if (isNaN(num)) { setCount(value); return; }
    let start = 0;
    const steps = 60;
    const increment = num / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      start += increment;
      if (step >= steps) { setCount(value); clearInterval(timer); return; }
      setCount(Math.floor(start) + suffix);
    }, (duration * 1000) / steps);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);
  
  return <span ref={ref}>{count}</span>;
}

function NotifyForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/notify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("ok");
        setMsg("మీరు notify అవుతారు! 🎬");
        setEmail("");
      } else {
        setStatus("error");
        setMsg(data.error || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMsg("Network error. Please try again.");
    }
  };

  if (status === "ok") {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center gap-3"
      >
        <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-2xl">🎬</div>
        <p className="font-display text-xl font-bold text-primary">{msg}</p>
        <p className="text-muted-foreground text-sm font-telugu">కొత్త video వచ్చినప్పుడు మీకు తెలుసు!</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
      <input
        type="email"
        placeholder="మీ email చెప్పండి..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 px-5 py-3 rounded-full bg-white/5 border border-white/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm font-telugu"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-7 py-3 rounded-full bg-primary text-background font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50 shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
      >
        <Bell className="w-4 h-4" fill="currentColor" />
        {status === "loading" ? "..." : "Notify Me"}
      </button>
      {status === "error" && (
        <p className="w-full text-center text-xs text-red-400 mt-1">{msg}</p>
      )}
    </form>
  );
}

function VideoSkeleton() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="aspect-video bg-white/10 animate-pulse" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-white/10 rounded animate-pulse w-3/4" />
        <div className="h-3 bg-white/10 rounded animate-pulse w-1/2" />
        <div className="h-3 bg-white/10 rounded animate-pulse w-1/4 mt-4" />
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useLang();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<typeof FALLBACK_VIDEOS[0] | null>(null);
  const [copied, setCopied] = useState(false);
  const [watchlist, setWatchlist] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem("cinebodha_watchlist") || "[]"); } catch { return []; }
  });
  const [sortMode, setSortMode] = useState<"latest" | "trending">("latest");
  const [visibleCount, setVisibleCount] = useState(6);

  const toggleWatchlist = (id: number) => {
    setWatchlist(prev => {
      const next = prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id];
      localStorage.setItem("cinebodha_watchlist", JSON.stringify(next));
      return next;
    });
  };

  const closeModal = () => setSelectedVideo(null);

  const fireConfetti = () => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.8 }, colors: ["#D4AF37", "#FDE047", "#B45309", "#ffffff"] });
    confetti({ particleCount: 60, spread: 50, origin: { y: 0.8, x: 0.3 }, colors: ["#D4AF37", "#FDE047"] });
    confetti({ particleCount: 60, spread: 50, origin: { y: 0.8, x: 0.7 }, colors: ["#D4AF37", "#FDE047"] });
  };

  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus("sending");
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      if (res.ok) {
        setContactStatus("sent");
        setContactForm({ name: "", email: "", message: "" });
      } else {
        setContactStatus("error");
      }
    } catch {
      setContactStatus("error");
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    const hasSeenToast = localStorage.getItem("cinebodha_toast_seen");
    if (!hasSeenToast) {
      const timer1 = setTimeout(() => {
        setShowToast(true);
      }, 8000);
      
      const timer2 = setTimeout(() => {
        setShowToast(false);
        localStorage.setItem("cinebodha_toast_seen", "true");
      }, 20000); // 8s + 12s = 20s

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, []);

  const dismissToast = () => {
    setShowToast(false);
    localStorage.setItem("cinebodha_toast_seen", "true");
  };

  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory, searchQuery, sortMode]);

  // Use React Query hooks
  const { data: statsData, isError: statsError } = useGetStats();
  const { data: topicsData, isError: topicsError } = useGetTopics();
  const { data: videosData, isError: videosError } = useGetVideos();

  // Prefer API data, fallback to dummy data for aesthetic presentation if backend isn't ready
  const stats = (!statsError && statsData) ? statsData : FALLBACK_STATS;
  const topics = (!topicsError && topicsData && topicsData.length > 0) ? topicsData : FALLBACK_TOPICS;
  const videos = (!videosError && videosData && videosData.length > 0) ? videosData : FALLBACK_VIDEOS;

  const filteredVideos = videos.filter(v => {
    const matchesCategory = activeCategory === "All" || v.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = searchQuery === "" || 
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.titleTelugu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const isLoadingVideos = !videosData && !videosError;

  const isNewVideo = (publishedAt: string) => {
    if (publishedAt.toLowerCase().includes("hour")) return true;
    const dayMatch = publishedAt.match(/^(\d+)\s+day/);
    return dayMatch ? parseInt(dayMatch[1]) <= 6 : false;
  };

  const topViewedIds = [...videos]
    .sort((a, b) => parseInt(b.views.replace(/[^0-9]/g, "")) - parseInt(a.views.replace(/[^0-9]/g, "")))
    .slice(0, 3).map(v => v.id);

  const sortedFilteredVideos = sortMode === "trending"
    ? [...filteredVideos].sort((a, b) => parseInt(b.views.replace(/[^0-9]/g, "")) - parseInt(a.views.replace(/[^0-9]/g, "")))
    : filteredVideos;

  const visibleVideos = sortedFilteredVideos.slice(0, visibleCount);
  const hasMore = visibleCount < sortedFilteredVideos.length;

  return (
    <>
    <main className="w-full bg-background relative selection:bg-primary/30">
      
      {/* Grain overlay for cinematic feel */}
      <div 
        className="fixed inset-0 z-50 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat" }}
      />

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
          <ParticleCanvas />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <img
                src={`${import.meta.env.BASE_URL}logo.jpg`}
                alt="CineBodha Logo"
                className="w-20 h-20 rounded-full object-cover border-2 border-primary/60 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
              />
            </div>
            <span className="inline-block py-1 px-3 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm tracking-widest uppercase mb-6 backdrop-blur-sm">
              {t.hero.badge}
            </span>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-foreground mb-6 leading-tight">
              Cine<span className="gold-gradient-text">Bodha</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4 font-light">
              {t.hero.tagline}
            </p>
            <p className="font-telugu text-xl md:text-2xl text-foreground/70 mb-10 font-light tracking-wide">
              {t.hero.sub}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href={YT_CHANNEL}
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative px-8 py-4 rounded-full bg-primary text-background font-bold text-lg flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <Play className="w-5 h-5 relative z-10" fill="currentColor" />
                <span className="relative z-10">{t.hero.subscribeCta}</span>
              </a>
              <button 
                onClick={() => document.querySelector('#videos')?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 rounded-full border border-white/20 text-foreground font-medium text-lg hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
              >
                {t.hero.watchCta}
              </button>
            </div>

            {/* Hero Notify Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-10 w-full max-w-xl mx-auto"
            >
              <div className="relative rounded-2xl border border-primary/25 bg-primary/5 backdrop-blur-sm px-6 py-5">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary rounded-full flex items-center gap-2">
                  <Bell className="w-3 h-3 text-background" fill="currentColor" />
                  <span className="text-background text-xs font-bold tracking-widest uppercase">కొత్త Video Alert</span>
                </div>
                <p className="font-telugu text-sm text-muted-foreground text-center mb-4 mt-1">
                  కొత్త video వచ్చినప్పుడు మొదటగా తెలుసుకోండి!
                </p>
                <NotifyForm />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* MARQUEE SECTION */}
      <section className="w-full bg-[#03050a] border-y border-white/5 py-3 overflow-hidden flex items-center">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-primary text-xs md:text-sm font-medium tracking-[0.2em] uppercase mx-4">
            Behavioral Architecture ✦ Applied Science ✦ History & Culture ✦ Strategic Motivation ✦ Global Intel ✦ Life Lessons ✦ Psychology ✦ Visual Storytelling ✦
          </span>
          <span className="text-primary text-xs md:text-sm font-medium tracking-[0.2em] uppercase mx-4">
            Behavioral Architecture ✦ Applied Science ✦ History & Culture ✦ Strategic Motivation ✦ Global Intel ✦ Life Lessons ✦ Psychology ✦ Visual Storytelling ✦
          </span>
          <span className="text-primary text-xs md:text-sm font-medium tracking-[0.2em] uppercase mx-4">
            Behavioral Architecture ✦ Applied Science ✦ History & Culture ✦ Strategic Motivation ✦ Global Intel ✦ Life Lessons ✦ Psychology ✦ Visual Storytelling ✦
          </span>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative z-20 -mt-12 mb-24 px-6 md:px-12 max-w-6xl mx-auto pt-16">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="glass-card rounded-3xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10"
        >
          {[
            { label: t.stats.subscribers, value: stats.subscribers, icon: Users },
            { label: t.stats.videos, value: stats.videos, icon: VideoIcon },
            { label: t.stats.views, value: stats.views, icon: Eye },
            { label: t.stats.years, value: stats.years, icon: Calendar },
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeUp} className="flex flex-col items-center justify-center text-center px-4 first:pl-0 last:pr-0">
              <stat.icon className="w-6 h-6 text-primary mb-4 opacity-80" />
              <h3 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2"><CountUp value={String(stat.value)} /></h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* LATEST VIDEO SPOTLIGHT */}
      {videos.length > 0 && (
        <section className="py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-1/3 h-[400px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex items-center gap-4 mb-10"
            >
              <div className="h-px w-12 bg-primary" />
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-wide">{t.sections.latestRelease}</h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="w-full rounded-3xl glass-card overflow-hidden border border-primary/20 flex flex-col lg:flex-row relative group"
            >
              <div className="lg:w-[40%] p-10 md:p-14 flex flex-col justify-center order-2 lg:order-1 relative z-10 bg-background/80 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none">
                <div className="inline-flex px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold tracking-widest uppercase mb-6 w-max shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  NEW
                </div>
                
                <h3 className="font-display text-3xl md:text-5xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
                  {videos[0].title}
                </h3>
                <h4 className="font-telugu text-xl text-muted-foreground mb-8">
                  {videos[0].titleTelugu}
                </h4>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-medium mb-10 uppercase tracking-wider">
                  <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-white/90">{videos[0].category}</span>
                  <div className="flex items-center gap-1.5"><Eye className="w-4 h-4" /> {videos[0].views} Views</div>
                  <div className="w-1 h-1 rounded-full bg-primary/50" />
                  <div>{videos[0].duration}</div>
                </div>

                <a 
                  href={videos[0].youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary text-background font-bold text-lg hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] w-max hover:scale-105"
                >
                  <Play className="w-5 h-5" fill="currentColor" />
                  Watch Now
                </a>
              </div>
              
              <div className="lg:w-[60%] order-1 lg:order-2 relative aspect-video lg:aspect-auto h-full overflow-hidden min-h-[300px] lg:min-h-[500px]">
                <div className="absolute inset-0 bg-primary/20 blur-[100px] z-0" />
                <img 
                  src={videos[0].thumbnail}
                  alt={videos[0].title}
                  loading="lazy"
                  className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:bg-gradient-to-r lg:from-background lg:via-background/50 lg:to-transparent z-20" />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* WHY CINEBODHA SECTION */}
      <section className="py-24 relative bg-[#03050a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold">Why <span className="gold-gradient-text">CineBodha</span>?</h2>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: "🎬", title: "Cinema as Classroom", desc: "Har movie ek lesson hai. Har character ek teacher." },
              { icon: "🧠", title: "Deep Psychology", desc: "Human behavior, emotions, and mindset decoded through stories." },
              { icon: "🔬", title: "Real Science", desc: "Physics, biology, neuroscience — explained through cinematic moments." },
              { icon: "📜", title: "Living History", desc: "Civilizations decoded through the lens of visual storytelling." }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp}
                className="glass-card rounded-2xl p-8 hover:border-primary/50 hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW WE CREATE PROCESS SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Behind Every <span className="gold-gradient-text">Video</span></h2>
            <p className="text-xl text-muted-foreground font-light">Our creative process — from idea to screen</p>
          </motion.div>

          <div className="relative">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-px bg-primary/20 -translate-y-1/2 z-0" />
            {/* Mobile connecting line */}
            <div className="block md:hidden absolute top-[5%] bottom-[5%] left-10 w-px bg-primary/20 z-0" />

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 relative z-10"
            >
              {[
                { id: "01", icon: "🔍", title: "Deep Research", desc: "We dig into real science, history, and psychology — cross-referencing multiple sources" },
                { id: "02", icon: "📝", title: "Cinematic Script", desc: "Every word is crafted to flow like a movie narrative — engaging and precise" },
                { id: "03", icon: "🎬", title: "Visual Edit", desc: "Cut, color, music — every frame is deliberate. Cinema meets classroom" },
                { id: "04", icon: "🚀", title: "Published", desc: "Released on YouTube with subtitles, chapters, and timestamp navigation" }
              ].map((step, i) => (
                <motion.div key={step.id} variants={fadeUp} className="relative group pl-16 md:pl-0">
                  <div className="absolute -top-6 -left-4 md:-top-10 md:-left-2 text-7xl font-display font-bold text-primary/20 z-0 select-none group-hover:text-primary/30 transition-colors duration-500">
                    {step.id}
                  </div>
                  <div className="glass-card rounded-2xl p-8 relative z-10 h-full hover:-translate-y-2 transition-transform duration-500 hover:border-primary/40">
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <h3 className="font-display text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* MILESTONES SECTION */}
      <section className="py-24 relative bg-[#03050a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Our <span className="gold-gradient-text">Milestones</span></h2>
            <p className="text-xl text-muted-foreground font-light">Every number tells a story of dedication</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {[
              { icon: "🏆", value: "1K+", label: "YouTube Subscribers", sublabel: "Growing every day" },
              { icon: "🎬", value: "24+", label: "Videos Published", sublabel: "Each one a masterpiece" },
              { icon: "👁️", value: "10K+", label: "Total Views", sublabel: "Minds awakened" },
              { icon: "🌍", value: "5+", label: "Knowledge Pillars", sublabel: "Disciplines decoded" },
            ].map((milestone, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp}
                className="glass-card rounded-2xl p-8 text-center hover:border-primary/60 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-500 group"
              >
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{milestone.icon}</div>
                <h3 className="font-display text-4xl md:text-5xl font-bold mb-2 gold-gradient-text">
                  {milestone.value}
                </h3>
                <p className="font-bold text-white mb-1 tracking-wide">{milestone.label}</p>
                <p className="text-muted-foreground italic text-sm">{milestone.sublabel}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CONCEPT / ABOUT SECTION */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-primary" />
                <span className="text-primary tracking-widest uppercase text-sm font-semibold">Our Mission</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                Not Just Videos.<br/>
                <span className="text-muted-foreground italic">Intellectual Awakening.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-light">
                CineBodha uses the power of visual storytelling — movies, characters, and cinematic moments — as a lens to teach you real psychology, science, history, and life lessons. Every video is a decoded experience.
              </p>
              <p className="font-telugu text-xl text-foreground/90 leading-relaxed mb-10 border-l-2 border-primary pl-6 py-2">
                సినిమా ఒక కిటికీ. ఆ కిటికీ నుండి జీవితాన్ని, మనస్తత్వాన్ని, శాస్త్రాన్ని చూద్దాం — CineBodha తో.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: "Deep Research", icon: BookOpen },
                  { title: "Visual Storytelling", icon: Palette },
                  { title: "Philosophical Depth", icon: Brain },
                  { title: "Historical Context", icon: History },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-foreground/80">{item.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden glass-card group"
            >
              {/* landing page hero scenic mountain landscape - using as abstract epic background */}
              <img 
                src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&h=1080&fit=crop" 
                alt="Epic landscape representing knowledge"
                loading="lazy"
                className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-10">
                <Quote className="w-12 h-12 text-primary opacity-50 mb-6" />
                <p className="font-display text-3xl font-bold leading-tight mb-4">
                  "Knowledge is the only wealth that multiplies when shared."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TOPICS SECTION */}
      <section id="topics" className="py-24 bg-[#050810] relative border-y border-white/5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">Pillars of <span className="gold-gradient-text">Wisdom</span></h2>
            <p className="text-xl text-muted-foreground font-light">Explore our carefully curated categories designed to expand your consciousness and understanding.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {topics.map((topic, i) => (
              <motion.div 
                key={topic.id}
                variants={fadeUp}
                className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
              >
                <img 
                  src={topic.image} 
                  alt={topic.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-colors duration-500" />
                
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-primary text-sm tracking-widest uppercase mb-2 block">{topic.tag}</span>
                      <h3 className="font-display text-3xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{topic.name}</h3>
                      <h4 className="font-telugu text-lg text-white/70 mb-3">{topic.nameTelugu}</h4>
                      <p className="text-white/60 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        {topic.description}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURED VIDEOS SECTION */}
      <section id="videos" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-12 bg-primary" />
                <span className="text-primary tracking-widest uppercase text-sm font-semibold">Curated Masterpieces</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">{t.sections.videosTitle} <span className="italic text-muted-foreground">{t.sections.videosItalic}</span></h2>
            </motion.div>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Sort toggle */}
              <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
                <button
                  onClick={() => setSortMode("latest")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${sortMode === "latest" ? "bg-primary text-background" : "text-muted-foreground hover:text-white"}`}
                >
                  Latest
                </button>
                <button
                  onClick={() => setSortMode("trending")}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${sortMode === "trending" ? "bg-primary text-background" : "text-muted-foreground hover:text-white"}`}
                >
                  🔥 Trending
                </button>
              </div>
              <motion.a 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                href={YT_CHANNEL}
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-primary hover:text-white transition-colors"
              >
                <span className="font-medium tracking-wide uppercase text-sm">{t.sections.viewAll}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </div>

          {/* Video Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t.sections.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full px-5 py-3 pl-11 focus:outline-none focus:border-primary/50 text-foreground placeholder:text-muted-foreground transition-colors"
              />
            </div>
          </motion.div>

          {/* Video Category Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 scrollbar-hide"
          >
            {CATEGORIES.map(category => {
              const count = category === "All" ? videos.length : videos.filter(v => v.category.toLowerCase() === category.toLowerCase()).length;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap px-6 py-2 rounded-full transition-all duration-300 font-medium flex items-center gap-2 ${
                    activeCategory === category 
                      ? "bg-primary text-background" 
                      : "glass-card text-muted-foreground hover:text-primary hover:border-primary/50"
                  }`}
                >
                  {category}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeCategory === category ? "bg-background/20 text-background" : "bg-white/10 text-muted-foreground"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {isLoadingVideos ? (
                Array.from({ length: 6 }).map((_, i) => <VideoSkeleton key={i} />)
              ) : visibleVideos.map((video) => (
                <motion.div 
                  key={video.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedVideo(video as any)}
                  className="group flex flex-col glass-card rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-primary/90 text-background flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.6)] scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play className="w-6 h-6 translate-x-[2px]" fill="currentColor" />
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-xs font-mono text-white">
                      {video.duration}
                    </div>
                    <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-background text-xs font-bold uppercase tracking-wider rounded-full">
                      {video.category}
                    </div>
                    {isNewVideo(video.publishedAt) && !topViewedIds.slice(0,1).includes(video.id) && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-xs font-bold uppercase tracking-widest rounded-full badge-pulse">
                        NEW
                      </div>
                    )}
                    {sortMode === "trending" && topViewedIds[0] === video.id && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-orange-500 text-white text-xs font-bold uppercase tracking-widest rounded-full badge-pulse">
                        🔥 #1
                      </div>
                    )}
                    {sortMode === "trending" && topViewedIds[1] === video.id && (
                      <div className="absolute top-4 right-4 px-2 py-1 bg-orange-400/80 text-white text-xs font-bold rounded-full">
                        🔥 #2
                      </div>
                    )}
                    {sortMode === "trending" && topViewedIds[2] === video.id && (
                      <div className="absolute top-4 right-4 px-2 py-1 bg-orange-300/80 text-white text-xs font-bold rounded-full">
                        🔥 #3
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-display text-2xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <h4 className="font-telugu text-muted-foreground mb-6 line-clamp-1">
                      {video.titleTelugu}
                    </h4>
                    
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>{video.views}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="hidden sm:inline">{video.publishedAt}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const text = `🎬 ${video.title}\n\nCineBodha లో చూడండి 👇\n${video.youtubeUrl}`;
                            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
                          }}
                          title="WhatsApp లో share చేయండి"
                          className="text-white/30 hover:text-green-400 transition-colors"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const text = `🎬 ${video.title} | CineBodha Telugu\n${video.youtubeUrl}`;
                            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
                          }}
                          title="X లో share చేయండి"
                          className="text-white/30 hover:text-sky-400 transition-colors"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleWatchlist(video.id); }}
                          title={watchlist.includes(video.id) ? t.modal.removeWatch : t.modal.addWatch}
                          className={`transition-colors ${watchlist.includes(video.id) ? "text-primary" : "text-white/30 hover:text-primary"}`}
                        >
                          {watchlist.includes(video.id)
                            ? <BookmarkCheck className="w-4 h-4" />
                            : <Bookmark className="w-4 h-4" />
                          }
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {!isLoadingVideos && sortedFilteredVideos.length === 0 && (
              <div className="col-span-full py-16 text-center text-muted-foreground flex flex-col items-center justify-center">
                <SearchX className="w-12 h-12 mb-4 opacity-20" />
                <p>{t.sections.noResults}</p>
                <p className="text-sm mt-1 opacity-60">{t.sections.noResultsSub}</p>
              </div>
            )}
          </motion.div>

          {/* Load More */}
          {hasMore && !isLoadingVideos && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 flex flex-col items-center gap-3"
            >
              <button
                onClick={() => setVisibleCount(v => v + 6)}
                className="px-10 py-4 rounded-full border border-primary/40 text-primary font-bold tracking-wide hover:bg-primary hover:text-background transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4 rotate-90" />
                Load More Videos ({sortedFilteredVideos.length - visibleCount} remaining)
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* COMMUNITY VOICE SECTION */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-primary" />
              <span className="text-primary tracking-widest uppercase text-sm font-semibold">Community</span>
              <div className="h-px w-12 bg-primary" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">మీ <span className="gold-gradient-text">అభిప్రాయం</span> చెప్పండి</h2>
            <p className="text-muted-foreground text-lg font-telugu">మీరు ఏమి అనుకుంటున్నారో YouTube లో comment చేయండి — మీ voice మాకు చాలా important!</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="glass-card rounded-3xl p-10 md:p-16 border-primary/20 relative overflow-hidden"
          >
            <motion.div
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute inset-0 bg-primary/5 pointer-events-none"
            />
            <div className="relative z-10 flex flex-col items-center gap-8">
              <div className="text-7xl">💬</div>
              <p className="font-telugu text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl">
                మా videos మీకు ఏమైనా నేర్పించాయా? మీ thoughts share చేయండి — మీ comment మరొకరికి inspire చేయవచ్చు!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <a
                  href="https://youtube.com/@cinebodha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-8 py-4 rounded-full bg-primary text-background font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                >
                  <Play className="w-5 h-5" fill="currentColor" />
                  Comment చేయండి
                </a>
                <a
                  href="https://www.instagram.com/cinebodhaofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-8 py-4 rounded-full border border-primary/40 text-primary font-bold flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  DM చేయండి
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* COMING SOON TEASER */}
      <section id="coming-soon" className="py-24 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative glass-card rounded-3xl p-10 md:p-16 border-primary/30 overflow-hidden"
          >
            <motion.div 
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-primary/10 blur-3xl z-0" 
            />
            <div className="relative z-10">
              <span className="inline-block px-4 py-1 rounded-full border border-primary/50 text-primary text-xs font-bold tracking-widest uppercase mb-6">
                Coming Soon
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
                {t.sections.notifyTitle}
              </h2>
              <p className="font-telugu text-xl text-muted-foreground mb-8">
                {t.sections.notifySub}
              </p>
              
              <div className="flex items-center justify-center gap-4 mb-10">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="w-3 h-3 rounded-full bg-primary/50" />
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
              </div>

              <NotifyForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOLLOW US SOCIAL SECTION */}
      <section className="py-24 relative overflow-hidden bg-[#03050a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold">Join Our <span className="gold-gradient-text">Community</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* YouTube Card */}
            <motion.a
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              href={YT_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-3xl p-[2px] overflow-hidden bg-gradient-to-br from-[#D4AF37]/40 via-white/5 to-[#D4AF37]/10 hover:shadow-[0_0_40px_rgba(212,175,55,0.2)] transition-all duration-500 hover:-translate-y-2 block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="h-full w-full bg-background rounded-[22px] p-8 md:p-12 relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Play className="w-8 h-8 text-red-500" fill="currentColor" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">Subscribe on YouTube</h3>
                <p className="text-primary font-medium tracking-wide mb-4">@cinebodha</p>
                <div className="px-4 py-2 rounded-full bg-white/5 text-sm text-muted-foreground mb-8">
                  {stats.subscribers} Subscribers
                </div>
                <span className="inline-flex items-center gap-2 text-red-400 font-medium group-hover:text-red-300 transition-colors">
                  Go to Channel <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.a>

            {/* Instagram Card */}
            <motion.a
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-3xl p-[2px] overflow-hidden bg-gradient-to-br from-pink-500/40 via-purple-500/20 to-orange-400/10 hover:shadow-[0_0_40px_rgba(236,72,153,0.2)] transition-all duration-500 hover:-translate-y-2 block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="h-full w-full bg-background rounded-[22px] p-8 md:p-12 relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-pink-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Instagram className="w-8 h-8 text-pink-500" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">Follow on Instagram</h3>
                <p className="text-pink-400 font-medium tracking-wide mb-4">@cinebodhaofficial</p>
                <div className="px-4 py-2 rounded-full bg-white/5 text-sm text-muted-foreground mb-8">
                  Behind the scenes & clips
                </div>
                <span className="inline-flex items-center gap-2 text-pink-400 font-medium group-hover:text-pink-300 transition-colors">
                  View Profile <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section id="contact" className="py-24 bg-[#050810] relative border-y border-white/5">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/4 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-primary" />
              <span className="text-primary tracking-widest uppercase text-sm font-semibold">Contact</span>
              <div className="h-px w-12 bg-primary" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">మాతో <span className="gold-gradient-text">మాట్లాడండి</span></h2>
            <p className="text-muted-foreground font-telugu">Collaboration, feedback, లేదా ఏదైనా — మేము reply చేస్తాం</p>
          </motion.div>

          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            onSubmit={handleContactSubmit}
            className="glass-card rounded-3xl p-8 md:p-12 border-primary/20 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground tracking-wide uppercase">{t.contact.name}</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                  placeholder={t.contact.name}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-foreground placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground tracking-wide uppercase">Email</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-foreground placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground tracking-wide uppercase">{t.contact.message}</label>
              <textarea
                required
                rows={5}
                value={contactForm.message}
                onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                placeholder={t.contact.messagePlaceholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-foreground placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors resize-none font-telugu"
              />
            </div>

            {contactStatus === "sent" && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="px-5 py-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-telugu text-center">
                ✓ {t.contact.successMsg}
              </motion.div>
            )}
            {contactStatus === "error" && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="px-5 py-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-telugu text-center">
                ✗ {t.contact.errorMsg}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={contactStatus === "sending" || contactStatus === "sent"}
              className="w-full py-4 rounded-xl bg-primary text-background font-bold text-lg tracking-wide hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {contactStatus === "sending" ? (
                <><span className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />{t.contact.sending}</>
              ) : contactStatus === "sent" ? (
                <>✓ {t.contact.sent}</>
              ) : (
                <>{t.contact.send}</>
              )}
            </button>
          </motion.form>
        </div>
      </section>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8"
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl glass-card rounded-2xl overflow-hidden border-primary/30"
            >
              <button onClick={closeModal} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-primary/30 transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeUrl.split('v=')[1]?.split('&')[0]}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-display text-lg md:text-xl font-bold mb-0.5 truncate">{selectedVideo.title}</h3>
                  <p className="font-telugu text-muted-foreground text-sm">{selectedVideo.titleTelugu}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  {/* Watchlist */}
                  <button
                    onClick={() => toggleWatchlist(selectedVideo.id)}
                    className={`px-3 py-2 rounded-full text-sm font-bold flex items-center gap-1.5 transition-all border ${watchlist.includes(selectedVideo.id) ? "bg-primary/20 border-primary text-primary" : "bg-white/5 border-white/10 text-muted-foreground hover:border-primary/40 hover:text-primary"}`}
                  >
                    {watchlist.includes(selectedVideo.id) ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                    {watchlist.includes(selectedVideo.id) ? t.modal.removeWatch : t.modal.addWatch}
                  </button>
                  {/* Copy Link */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedVideo.youtubeUrl);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="px-3 py-2 rounded-full text-sm font-bold flex items-center gap-1.5 bg-white/5 border border-white/15 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copied ? "Copied! ✓" : "Copy Link"}
                  </button>
                  {/* X/Twitter Share */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`🎬 "${selectedVideo.title}" | CineBodha Telugu\n${selectedVideo.youtubeUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-full text-sm font-bold flex items-center gap-1.5 bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500/20 transition-all"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    Share on X
                  </a>
                  {/* WhatsApp Share */}
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`🎬 CineBodha: ${selectedVideo.title}\n${selectedVideo.youtubeUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-full text-sm font-bold flex items-center gap-1.5 bg-[#25D366]/10 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/20 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5" fill="currentColor" />
                    {t.modal.shareWA}
                  </a>
                  {/* YouTube */}
                  <a href={selectedVideo.youtubeUrl} target="_blank" rel="noopener noreferrer"
                     className="px-3 py-2 rounded-full bg-primary text-background font-bold text-sm flex items-center gap-1.5 hover:scale-105 transition-transform">
                    <Play className="w-3.5 h-3.5" fill="currentColor" />
                    {t.modal.watchYT}
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 relative">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">{t.sections.faq} <span className="gold-gradient-text">{t.sections.faqGold}</span></h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: "CineBodha ఎలాంటి content చేస్తుంది?", a: "మేము movies, web series, మరియు cinematic moments ని ఒక lens గా వాడి — psychology, science, history, మరియు life lessons ని Telugu లో explain చేస్తాము. ప్రతి video ఒక decoded experience." },
              { q: "Videos ఎంత తరచుగా upload అవుతాయి?", a: "మేము regular గా upload చేస్తాము. Latest videos కోసం YouTube channel subscribe చేయండి మరియు bell icon press చేయండి." },
              { q: "CineBodha ని ఎవరు start చేశారు?", a: "CineBodha ని ఒక passionate Telugu knowledge creator start చేశారు — cinema తో జ్ఞానాన్ని, curiosity తో world ని explore చేయడం లక్ష్యంగా." },
              { q: "Videos కి Telugu subtitles ఉంటాయా?", a: "అవును, అన్ని videos Telugu లోనే ఉంటాయి. మేము clear, natural Telugu లో మాట్లాడతాము — అందరికీ అర్థమయ్యేలా." },
              { q: "Channel కి suggest చేయడానికి topics ఏమైనా ఉన్నాయా?", a: "తప్పకుండా! Instagram @cinebodhaofficial లో DM చేయండి లేదా YouTube comments లో మీ topic suggest చేయండి." }
            ].map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 border-l-4 ${openFaq === i ? 'border-l-primary' : 'border-l-transparent'}`}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-display text-lg font-bold pr-8">{faq.q}</span>
                  <div className={`text-primary transition-transform duration-300 ${openFaq === i ? 'rotate-45' : 'rotate-0'}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-muted-foreground font-telugu leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK WISDOM — YouTube Shorts + Instagram Reels */}
      <section className="py-24 relative bg-[#03050a] border-y border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-10 blur-[150px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, #E1306C, #833AB4)" }} />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
          >
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="h-px w-12 bg-primary" />
                <span className="text-primary tracking-widest uppercase text-sm font-semibold flex items-center gap-2">
                  <Zap className="w-4 h-4" fill="currentColor" /> Quick Wisdom
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">Shorts & <span className="gold-gradient-text">Reels</span></h2>
              <p className="font-telugu text-muted-foreground mt-2">YouTube Shorts + Instagram Reels — 60 seconds లో knowledge!</p>
            </div>
            {/* Platform links */}
            <div className="flex gap-3 shrink-0 flex-wrap">
              <a
                href="https://www.youtube.com/@cinebodha/shorts"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 text-primary text-sm font-medium hover:bg-primary/10 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                YouTube Shorts
              </a>
              <a
                href="https://www.instagram.com/cinebodhaofficial/reels/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E1306C]/40 text-[#E1306C] text-sm font-medium hover:bg-[#E1306C]/10 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                Instagram Reels
              </a>
            </div>
          </motion.div>

          {/* Unified Grid — YouTube Short + Instagram Reels */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {/* ── YouTube Short (real) ── */}
            <motion.a
              variants={fadeUp}
              href="https://www.youtube.com/shorts/lhjlhbj-Vfg"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden border border-primary/40 hover:border-primary transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
              style={{ aspectRatio: "9/16" }}
            >
              {/* blurred fill for portrait letterboxing */}
              <img
                src="https://img.youtube.com/vi/lhjlhbj-Vfg/hqdefault.jpg"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover scale-125 blur-lg opacity-70 pointer-events-none"
              />
              {/* real thumbnail contained */}
              <img
                src="https://img.youtube.com/vi/lhjlhbj-Vfg/hqdefault.jpg"
                alt="CineBodha Short"
                loading="lazy"
                className="relative w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute top-2 left-2">
                <span className="px-2 py-0.5 bg-primary text-background text-[10px] font-bold rounded-full uppercase tracking-wide flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5" fill="currentColor" /> YT Short
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.6)]">
                  <Play className="w-5 h-5 text-background translate-x-0.5" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <p className="text-white text-xs font-medium font-telugu leading-tight">CineBodha Short</p>
                <p className="text-primary text-[10px] mt-0.5">Watch Now ▶</p>
              </div>
            </motion.a>

            {/* ── Instagram Reel cards (3) ── */}
            {[
              { label: "మన మనసు 🧠", topic: "Psychology", accent: "#833AB4" },
              { label: "చరిత్ర రహస్యాలు 🏛️", topic: "History", accent: "#E1306C" },
              { label: "Life Lesson 💡", topic: "Mindset", accent: "#F77737" },
            ].map((reel) => (
              <motion.a
                key={reel.topic}
                variants={fadeUp}
                href="https://www.instagram.com/cinebodhaofficial/reels/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl overflow-hidden border border-[#E1306C]/30 hover:border-[#E1306C]/70 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                style={{ aspectRatio: "9/16" }}
              >
                {/* CineBodha logo as background fill */}
                <img
                  src="/logo.jpg"
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover scale-125 blur-xl opacity-30 pointer-events-none"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${reel.accent}55 0%, #000000cc 100%)` }} />

                {/* Center: logo + label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 shadow-lg group-hover:scale-110 transition-transform" style={{ borderColor: reel.accent }}>
                    <img src="/logo.jpg" alt="CineBodha" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-white text-[11px] font-bold font-telugu text-center leading-tight mt-1">{reel.label}</p>
                </div>

                {/* IG badge */}
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 text-white text-[10px] font-bold rounded-full uppercase tracking-wide flex items-center gap-1" style={{ background: "linear-gradient(90deg,#833AB4,#E1306C)" }}>
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    Reel
                  </span>
                </div>

                {/* Hover play */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#833AB4,#E1306C)" }}>
                    <Play className="w-5 h-5 text-white translate-x-0.5" fill="currentColor" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <p className="text-[10px]" style={{ color: "#F77737" }}>@cinebodhaofficial</p>
                </div>
              </motion.a>
            ))}

            {/* ── View More YouTube Shorts ── */}
            <motion.a
              variants={fadeUp}
              href="https://www.youtube.com/@cinebodha/shorts"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/60 transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-gradient-to-b from-primary/10 to-black/60"
              style={{ aspectRatio: "9/16" }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-3 text-center">
                <div className="w-11 h-11 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </div>
                <p className="text-primary text-[11px] font-bold uppercase tracking-wide">More Shorts</p>
                <p className="text-muted-foreground text-[10px] font-telugu">YouTube లో చూడు</p>
              </div>
            </motion.a>

            {/* ── View More Instagram Reels ── */}
            <motion.a
              variants={fadeUp}
              href="https://www.instagram.com/cinebodhaofficial/reels/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden border border-[#E1306C]/20 hover:border-[#E1306C]/60 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              style={{ aspectRatio: "9/16", background: "linear-gradient(180deg, rgba(131,58,180,0.15) 0%, rgba(0,0,0,0.6) 100%)" }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-3 text-center">
                <div className="w-11 h-11 rounded-full flex items-center justify-center group-hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(135deg,#833AB4,#E1306C,#F77737)" }}>
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: "#E1306C" }}>More Reels</p>
                <p className="text-muted-foreground text-[10px] font-telugu">Instagram లో చూడు</p>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-8">Join the <span className="gold-gradient-text">Journey</span></h2>
            <p className="text-xl text-muted-foreground mb-12 font-light">
              Become part of a growing community dedicated to intellectual growth and uncovering the truth.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href={YT_CHANNEL}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex px-10 py-5 rounded-full bg-primary text-background font-bold text-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:scale-105 items-center gap-3 w-full sm:w-auto justify-center"
              >
                <Play className="w-6 h-6" fill="currentColor" />
                Subscribe on YouTube
              </a>
              <a 
                href={IG_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex px-10 py-5 rounded-full border border-primary text-primary font-bold text-lg hover:bg-primary/10 transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.2)] hover:scale-105 items-center gap-3 w-full sm:w-auto justify-center"
              >
                <Instagram className="w-6 h-6" />
                Follow on Instagram
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </main>

      {/* AI CHATBOT */}
      <CineBot />

      {/* FLOATING SUBSCRIBE TOAST */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-[200] max-w-sm w-[calc(100vw-3rem)] glass-card border-primary/40 shadow-2xl rounded-2xl p-5"
          >
            <button 
              onClick={dismissToast}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex gap-4 items-start">
              <img
                src={`${import.meta.env.BASE_URL}logo.jpg`}
                alt="CineBodha Logo"
                className="w-10 h-10 rounded-full border border-primary/50 flex-shrink-0"
              />
              <div>
                <h4 className="font-display font-bold text-lg mb-1 text-white">Join 1K+ Knowledge Seekers</h4>
                <p className="text-sm text-muted-foreground mb-4">New video every week on CineBodha</p>
                <a
                  href={YT_CHANNEL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { dismissToast(); fireConfetti(); }}
                  className="inline-flex items-center gap-2 bg-primary text-background font-bold px-5 py-2 rounded-full text-sm hover:scale-105 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                >
                  Subscribe <Play className="w-3 h-3 fill-background" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

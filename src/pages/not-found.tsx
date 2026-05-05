import { motion } from "framer-motion";
import { Link } from "wouter";
import { Home, Play } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-primary/3 blur-[100px] rounded-full" />
      </div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212,175,55,0.5) 2px, rgba(212,175,55,0.5) 4px)`,
          backgroundSize: "100% 4px"
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center max-w-2xl mx-auto px-6"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="font-display text-[10rem] md:text-[14rem] font-black leading-none"
            style={{
              background: "linear-gradient(135deg, #D4AF37 0%, #F5E27D 50%, #D4AF37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 40px rgba(212,175,55,0.3))"
            }}
          >
            404
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary tracking-widest uppercase text-sm font-semibold">Scene Not Found</span>
            <div className="h-px w-12 bg-primary" />
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">
            ఈ Page Cut చేశారు
          </h1>
          <p className="text-muted-foreground text-lg mb-2">
            This scene was left on the editing room floor.
          </p>
          <p className="text-muted-foreground font-telugu mb-10">
            మీరు వెతుకుతున్న page దొరకలేదు — కానీ మా మిగతా content చాలా ఉంది!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-background font-bold cursor-pointer shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-shadow"
              >
                <Home className="w-5 h-5" />
                Home కి వెళ్ళండి
              </motion.a>
            </Link>
            <a
              href="https://youtube.com/@cinebodha"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 rounded-full border border-primary/40 text-primary font-bold cursor-pointer hover:bg-primary/10 transition-colors"
              >
                <Play className="w-5 h-5" fill="currentColor" />
                Videos చూడండి
              </motion.span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 flex items-center justify-center gap-3"
        >
          <img
            src={`${import.meta.env.BASE_URL}logo.jpg`}
            alt="CineBodha"
            className="w-10 h-10 rounded-full object-cover border-2 border-primary/40"
          />
          <span className="font-display text-xl font-bold text-muted-foreground">CineBodha</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

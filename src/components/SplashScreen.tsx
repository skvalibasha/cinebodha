import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        sessionStorage.setItem("cinebodha_loaded", "true");
        onDone();
      }, 500); // Wait for exit animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          {/* Shimmer line */}
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent -translate-y-1/2"
          />

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <img
                src={`${import.meta.env.BASE_URL}logo.jpg`}
                alt="CineBodha"
                className="w-32 h-32 rounded-full object-cover border-2 border-primary/50 shadow-[0_0_40px_rgba(212,175,55,0.4)] relative z-10"
              />
            </div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="font-display text-4xl md:text-5xl font-bold tracking-wider text-foreground"
            >
              Cine<span className="gold-gradient-text">Bodha</span>
            </motion.h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

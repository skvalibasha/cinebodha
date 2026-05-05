import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { Link } from "wouter";

export function CookieConsent() {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cinebodha_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cinebodha_cookie_consent", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("cinebodha_cookie_consent", "declined");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-[198] max-w-sm glass-card border border-primary/20 rounded-2xl p-5 shadow-[0_0_40px_rgba(0,0,0,0.6)]"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Cookie className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.cookie.msg}{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                {t.cookie.policy}
              </Link>.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={accept}
              className="flex-1 py-2 rounded-xl bg-primary text-background font-bold text-sm hover:bg-primary/90 transition-colors"
            >
              {t.cookie.accept}
            </button>
            <button
              onClick={decline}
              className="flex-1 py-2 rounded-xl bg-white/5 border border-white/10 text-muted-foreground font-medium text-sm hover:border-white/20 transition-colors"
            >
              {t.cookie.decline}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

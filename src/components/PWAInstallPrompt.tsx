import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Smartphone, Share, Star, Zap, Wifi } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

function isIOS() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isInStandaloneMode() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true
  );
}

function isSafariBrowser() {
  return (
    /safari/i.test(navigator.userAgent) &&
    !/chrome|crios|fxios|edg/i.test(navigator.userAgent)
  );
}

const STORAGE_KEY = "cinebodha_pwa_dismissed";

export function PWAInstallPrompt() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [platform, setPlatform] = useState<"android" | "ios" | "desktop" | null>(null);

  useEffect(() => {
    if (isInStandaloneMode()) return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    const ios = isIOS();
    const android = /android/i.test(navigator.userAgent);

    if (ios && isSafariBrowser()) {
      setPlatform("ios");
      setTimeout(() => setShow(true), 1800);
      return;
    }

    // Android or Desktop Chrome/Edge — wait for beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
      setPlatform(android ? "android" : "desktop");
      setTimeout(() => setShow(true), 1800);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    const { outcome } = await installEvent.userChoice;
    setShow(false);
    localStorage.setItem(STORAGE_KEY, outcome === "accepted" ? "installed" : "true");
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  if (isInStandaloneMode()) return null;
  if ((platform === "android" || platform === "desktop") && !installEvent) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[250] flex items-end sm:items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleDismiss}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative w-full max-w-sm z-10"
          >
            <div
              className="rounded-2xl p-6 shadow-2xl border border-primary/30"
              style={{ background: "linear-gradient(135deg, #0a1628 0%, #04070f 100%)" }}
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 70%)" }} />

              {/* Close */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-4 mb-5">
                <div className="relative">
                  <img
                    src={`${import.meta.env.BASE_URL}logo.jpg`}
                    alt="CineBodha"
                    className="w-14 h-14 rounded-xl object-cover border border-primary/40 shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow">
                    <Download className="w-2.5 h-2.5 text-background" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white leading-tight">CineBodha App</h3>
                  <p className="text-xs text-primary font-medium">Install చేయండి — Free!</p>
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { icon: <Zap className="w-4 h-4 text-primary" />, label: "Super Fast" },
                  { icon: <Wifi className="w-4 h-4 text-green-400" />, label: "Offline కూడా" },
                  { icon: <Star className="w-4 h-4 text-yellow-400" />, label: "App Experience" },
                ].map((b) => (
                  <div key={b.label} className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-white/5">
                    {b.icon}
                    <span className="text-[10px] text-white/70 font-medium text-center leading-tight">{b.label}</span>
                  </div>
                ))}
              </div>

              {/* Android / Desktop */}
              {(platform === "android" || platform === "desktop") && (
                <>
                  <p className="text-sm text-white/70 mb-4 text-center font-telugu">
                    {platform === "android"
                      ? "Phone లో app లా install చేయండి — home screen నుండి directly open అవుతుంది!"
                      : "Desktop పై app లా install చేయండి — taskbar నుండి directly open అవుతుంది!"}
                  </p>
                  <button
                    onClick={handleInstall}
                    className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
                    style={{ background: "linear-gradient(135deg, #D4AF37 0%, #f0cc55 100%)", color: "#04070f" }}
                  >
                    <Download className="w-4 h-4" />
                    Install CineBodha App
                  </button>
                </>
              )}

              {/* iOS */}
              {platform === "ios" && (
                <>
                  <p className="text-sm text-white/70 mb-4 text-center font-telugu">
                    iPhone లో 3 steps లో app లా add చేయండి!
                  </p>
                  <div className="space-y-2 mb-4">
                    {[
                      {
                        icon: <Share className="w-4 h-4 text-blue-400" />,
                        bg: "bg-blue-500/15",
                        step: "1",
                        text: 'Safari లో Share (⬆) button tap చేయండి',
                      },
                      {
                        icon: <Smartphone className="w-4 h-4 text-primary" />,
                        bg: "bg-primary/15",
                        step: "2",
                        text: '"Add to Home Screen" select చేయండి',
                      },
                      {
                        icon: <span className="text-green-400 font-bold text-sm">✓</span>,
                        bg: "bg-green-500/15",
                        step: "3",
                        text: '"Add" tap చేయండి — Done!',
                      },
                    ].map((s) => (
                      <div key={s.step} className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5">
                        <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}>
                          {s.icon}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-primary uppercase tracking-wide">Step {s.step} </span>
                          <span className="text-xs text-white/75 font-telugu">{s.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleDismiss}
                    className="w-full py-2.5 rounded-xl text-sm text-white/50 hover:text-white/80 transition-colors"
                  >
                    తర్వాత చేస్తాను
                  </button>
                </>
              )}

              {/* Later link */}
              {(platform === "android" || platform === "desktop") && (
                <button
                  onClick={handleDismiss}
                  className="w-full mt-2 py-2 text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  తర్వాత చేస్తాను
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Small install button for navbar use
export function InstallAppButton({ className = "" }: { className?: string }) {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [ready, setReady] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    if (isInStandaloneMode()) return;

    if (isIOS() && isSafariBrowser()) {
      setReady(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setInstallEvent(e as BeforeInstallPromptEvent);
      setReady(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (isInStandaloneMode() || !ready) return null;

  const handleClick = async () => {
    if (isIOS()) {
      setShowIOSGuide(true);
      return;
    }
    if (installEvent) {
      await installEvent.prompt();
      await installEvent.userChoice;
      setReady(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold hover:bg-primary/20 transition-all ${className}`}
        title="Install CineBodha App"
      >
        <Download className="w-3 h-3" />
        <span className="hidden sm:inline">Install App</span>
        <span className="sm:hidden">Install</span>
      </button>

      <AnimatePresence>
        {showIOSGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-end justify-center p-6"
            onClick={() => setShowIOSGuide(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ y: 40, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 40, scale: 0.95 }}
              className="relative w-full max-w-sm rounded-2xl p-6 border border-primary/40 shadow-2xl"
              style={{ background: "linear-gradient(135deg, #0a1628 0%, #04070f 100%)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowIOSGuide(false)} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-5">
                <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="CineBodha" className="w-12 h-12 rounded-xl border border-primary/30" />
                <div>
                  <h4 className="font-display font-bold text-white">iPhone లో Install చేయండి</h4>
                  <p className="text-xs text-primary">3 simple steps</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { icon: <Share className="w-4 h-4 text-blue-400" />, bg: "bg-blue-500/20", step: "1", text: "Safari లో bottom toolbar లో Share (⬆) button tap చేయండి" },
                  { icon: <Smartphone className="w-4 h-4 text-primary" />, bg: "bg-primary/20", step: "2", text: '"Add to Home Screen" option select చేయండి' },
                  { icon: <span className="text-green-400 font-bold text-sm">✓</span>, bg: "bg-green-500/20", step: "3", text: '"Add" tap చేయండి — Done! App home screen లో ఉంటుంది' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
                    <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center shrink-0 mt-0.5`}>{item.icon}</div>
                    <div>
                      <span className="text-xs font-bold text-primary uppercase tracking-wide">Step {item.step} </span>
                      <p className="text-sm text-white/80 font-telugu">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

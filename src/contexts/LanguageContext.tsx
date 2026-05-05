import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "te";

const translations = {
  en: {
    nav: {
      home: "Home", topics: "Topics", videos: "Videos",
      about: "About", faq: "FAQ", contact: "Contact", subscribe: "Subscribe",
    },
    hero: {
      badge: "Telugu Knowledge Channel",
      tagline: "Decoding the hidden psychology of visual storytelling",
      sub: "Behavioral Architecture · Applied Science · History & Culture · Life Lessons — in Telugu",
      subscribeCta: "Subscribe Now",
      watchCta: "Watch Videos",
      scroll: "Scroll",
    },
    stats: {
      subscribers: "Subscribers", videos: "Videos",
      views: "Total Views", years: "Years Active",
    },
    sections: {
      latestRelease: "Latest Release",
      topics: "Pillars of Wisdom",
      topicsSub: "Six lenses through which we explore the world",
      videosLabel: "Curated Masterpieces",
      videosTitle: "Featured",
      videosItalic: "Expositions",
      viewAll: "View All Videos",
      search: "Search videos, topics...",
      noResults: "No videos found",
      noResultsSub: "Try a different keyword or category",
      about: "About CineBodha",
      whoWeAre: "Who We Are",
      milestones: "Our Journey",
      milestonesLabel: "Milestones",
      community: "Join the Conversation",
      communitySub: "Connect with us on YouTube and Instagram",
      notifyTitle: "Next Masterpiece",
      notifySub: "Coming soon... you can't imagine",
      notifyBtn: "Notify Me",
      notifyPlaceholder: "Enter your email...",
      faq: "Frequently Asked",
      faqGold: "Questions",
      contactTitle: "Get in",
      contactGold: "Touch",
      contactSub: "Have a topic suggestion or collaboration idea? We'd love to hear from you.",
      watchlist: "My Watchlist",
      watchlistEmpty: "No saved videos yet",
      watchlistEmptySub: "Bookmark videos to watch later",
    },
    modal: {
      watchYT: "Watch on YouTube",
      shareWA: "Share on WhatsApp",
      copyLink: "Copy Link",
      copied: "Copied!",
      addWatch: "Save",
      removeWatch: "Saved",
    },
    contact: {
      name: "Your Name", email: "Email",
      message: "Message", messagePlaceholder: "What would you like to tell us?",
      send: "Send Message", sending: "Sending...", sent: "Sent!",
      successMsg: "Message sent! We'll reply soon.",
      errorMsg: "Error sending. Please try again.",
    },
    cookie: {
      msg: "We use cookies to improve your experience. By continuing, you accept our",
      policy: "Privacy Policy",
      accept: "Accept",
      decline: "Decline",
    },
    footer: {
      quickLinks: "Quick Links",
      privacy: "Privacy Policy",
      made: "Made with",
      for: "for knowledge seekers",
    },
  },
  te: {
    nav: {
      home: "హోమ్", topics: "విషయాలు", videos: "వీడియోలు",
      about: "గురించి", faq: "సందేహాలు", contact: "సంప్రదించు", subscribe: "Subscribe చేయండి",
    },
    hero: {
      badge: "Telugu జ్ఞాన ఛానల్",
      tagline: "విజువల్ స్టోరీటెల్లింగ్ వెనక మనస్తత్వాన్ని decode చేయడం",
      sub: "మనస్తత్వ శాస్త్రం · అనువర్తిత విజ్ఞానం · చరిత్ర & సంస్కృతి · జీవిత పాఠాలు — Telugu లో",
      subscribeCta: "Subscribe చేయండి",
      watchCta: "వీడియోలు చూడండి",
      scroll: "స్క్రోల్",
    },
    stats: {
      subscribers: "సభ్యులు", videos: "వీడియోలు",
      views: "మొత్తం వీక్షణలు", years: "సంవత్సరాలు",
    },
    sections: {
      latestRelease: "తాజా వీడియో",
      topics: "జ్ఞానస్తంభాలు",
      topicsSub: "ప్రపంచాన్ని అర్థం చేసుకునే ఆరు కోణాలు",
      videosLabel: "ఎంచుకున్న మాస్టర్‌పీస్‌లు",
      videosTitle: "ప్రత్యేక",
      videosItalic: "వీడియోలు",
      viewAll: "అన్ని వీడియోలు చూడండి",
      search: "వీడియోలు, topics వెతకండి...",
      noResults: "వీడియోలు దొరకలేదు",
      noResultsSub: "వేరే keyword లేదా category try చేయండి",
      about: "CineBodha గురించి",
      whoWeAre: "మేము ఎవరు",
      milestones: "మా ప్రయాణం",
      milestonesLabel: "మైలురాళ్ళు",
      community: "సంభాషణలో చేరండి",
      communitySub: "YouTube మరియు Instagram లో మాతో connect అవ్వండి",
      notifyTitle: "తదుపరి మాస్టర్‌పీస్",
      notifySub: "త్వరలో వస్తుంది... మీరు ఊహించలేరు",
      notifyBtn: "నోటిఫై చేయండి",
      notifyPlaceholder: "మీ email చెప్పండి...",
      faq: "తరచుగా అడిగే",
      faqGold: "సందేహాలు",
      contactTitle: "సంప్రదించండి",
      contactGold: "",
      contactSub: "ఏదైనా topic suggestion లేదా collaboration idea ఉందా? మాకు తెలియజేయండి.",
      watchlist: "నా watchlist",
      watchlistEmpty: "ఇంకా videos save చేయలేదు",
      watchlistEmptySub: "తర్వాత చూడడానికి bookmark చేయండి",
    },
    modal: {
      watchYT: "YouTube లో చూడు",
      shareWA: "WhatsApp లో share చేయి",
      copyLink: "Link copy చేయి",
      copied: "Copy అయింది!",
      addWatch: "Save చేయి",
      removeWatch: "Save అయింది",
    },
    contact: {
      name: "మీ పేరు", email: "Email",
      message: "Message", messagePlaceholder: "మీకు ఏమి చెప్పాలని ఉంది?",
      send: "Message పంపండి", sending: "పంపుతున్నాం...", sent: "పంపబడింది!",
      successMsg: "Message పంపబడింది! మేము త్వరలో reply చేస్తాం.",
      errorMsg: "పంపడంలో error వచ్చింది. దయచేసి మళ్ళీ try చేయండి.",
    },
    cookie: {
      msg: "మేము మీ అనుభవాన్ని మెరుగుపరచడానికి cookies వాడతాము. కొనసాగించడం ద్వారా, మీరు మా",
      policy: "Privacy Policy",
      accept: "అంగీకరించు",
      decline: "వద్దు",
    },
    footer: {
      quickLinks: "త్వరిత లింకులు",
      privacy: "గోప్యతా విధానం",
      made: "తయారు చేయబడింది",
      for: "జ్ఞాన అన్వేషకుల కోసం",
    },
  },
};

type Translations = typeof translations.en;

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("cinebodha_lang");
    return (saved === "te" ? "te" : "en") as Lang;
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("cinebodha_lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[200px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 mb-16 relative z-10">
          <div className="col-span-1 md:col-span-6 lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <img
                src={`${import.meta.env.BASE_URL}logo.jpg`}
                alt="CineBodha"
                className="w-12 h-12 rounded-full object-cover border-2 border-primary/60"
              />
              <span className="font-display text-3xl font-bold tracking-wider text-foreground">
                CineBodha
              </span>
            </div>
            <p className="text-muted-foreground mb-3 text-base leading-relaxed">
              Decoding the hidden psychology of visual storytelling
            </p>
            <p className="text-muted-foreground mb-8 text-sm font-telugu leading-relaxed">
              Behavioral Architecture · Applied Science · History & Culture · Strategic Motivation · Global Intel in Telugu
            </p>
            <a 
              href="https://youtube.com/@cinebodha"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex px-8 py-4 rounded-full bg-primary text-background font-bold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:-translate-y-1 items-center gap-3 mb-6"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Subscribe on YouTube
            </a>

            <div className="flex items-center gap-4">
              <a 
                href="https://youtube.com/@cinebodha"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300"
                title="YouTube"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/cinebodhaofficial"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-pink-500 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-300"
                title="Instagram"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://wa.me/918639?text=Hi%20CineBodha!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-[#25D366] hover:border-[#25D366]/50 hover:bg-[#25D366]/10 transition-all duration-300"
                title="WhatsApp"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 lg:col-span-3">
            <h3 className="font-display text-xl mb-6 text-foreground">Quick Links</h3>
            <ul className="space-y-4">
              <li><button onClick={() => document.querySelector('#home')?.scrollIntoView({ behavior: "smooth" })} className="text-muted-foreground hover:text-primary transition-colors">Home</button></li>
              <li><button onClick={() => document.querySelector('#topics')?.scrollIntoView({ behavior: "smooth" })} className="text-muted-foreground hover:text-primary transition-colors">Topics</button></li>
              <li><button onClick={() => document.querySelector('#videos')?.scrollIntoView({ behavior: "smooth" })} className="text-muted-foreground hover:text-primary transition-colors">Videos</button></li>
              <li><button onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: "smooth" })} className="text-muted-foreground hover:text-primary transition-colors">About</button></li>
              <li><button onClick={() => document.querySelector('#faq')?.scrollIntoView({ behavior: "smooth" })} className="text-muted-foreground hover:text-primary transition-colors">FAQ</button></li>
              <li>
                <button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: "smooth" })} className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </button>
              </li>
              <li>
                <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3 lg:col-span-4">
            <h3 className="font-display text-xl mb-6 text-foreground">About CineBodha</h3>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              We use cinematic storytelling as a window to explore real psychology, science, history, and life lessons — all in Telugu.
            </p>
            <p className="text-muted-foreground leading-relaxed italic text-sm font-telugu mb-6">
              "సినిమా ఒక కిటికీ. ఆ కిటికీ నుండి జీవితాన్ని, మనస్తత్వాన్ని, శాస్త్రాన్ని చూద్దాం."
            </p>
            <div className="flex flex-col gap-2">
              <a href="https://youtube.com/@cinebodha" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                YouTube: @cinebodha
              </a>
              <a href="https://www.instagram.com/cinebodhaofficial" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                Instagram: @cinebodhaofficial
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} CineBodha. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span className="text-white/10">|</span>
            <span className="flex items-center gap-2">Made with <span className="text-primary">✦</span> for knowledge seekers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

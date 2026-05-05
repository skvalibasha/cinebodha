import { motion } from "framer-motion";
import { Shield, ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">Privacy Policy</h1>
              <p className="text-muted-foreground text-sm mt-1">Last updated: May 2025</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="glass-card rounded-2xl p-8 border border-white/5">
              <h2 className="font-display text-xl font-bold text-primary mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to CineBodha ("we", "our", "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website <strong className="text-foreground">cinebodha.com</strong>.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8 border border-white/5">
              <h2 className="font-display text-xl font-bold text-primary mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We collect information you voluntarily provide to us, such as:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-primary mt-1">✦</span><span><strong className="text-foreground">Contact Form:</strong> Name, email address, and message content when you reach out to us.</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">✦</span><span><strong className="text-foreground">Notification Sign-ups:</strong> Email address when you choose to receive new video notifications.</span></li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We do <strong className="text-foreground">not</strong> collect browsing history, cookies for tracking, or any data without your explicit action.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8 border border-white/5">
              <h2 className="font-display text-xl font-bold text-primary mb-4">3. How We Use Your Information</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-primary mt-1">✦</span><span>To respond to your contact messages and inquiries.</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">✦</span><span>To notify you about new CineBodha videos (only if you subscribed to notifications).</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">✦</span><span>To improve our website and user experience.</span></li>
              </ul>
              <p className="text-muted-foreground mt-4">
                We do <strong className="text-foreground">not</strong> sell, trade, or rent your personal information to third parties.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8 border border-white/5">
              <h2 className="font-display text-xl font-bold text-primary mb-4">4. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">Our website embeds content and links from:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-primary mt-1">✦</span><span><strong className="text-foreground">YouTube</strong> — for video embeds. Subject to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google's Privacy Policy</a>.</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">✦</span><span><strong className="text-foreground">Instagram</strong> — for social links. Subject to <a href="https://privacycenter.instagram.com/policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Meta's Privacy Policy</a>.</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">✦</span><span><strong className="text-foreground">Google Fonts</strong> — for typography rendering.</span></li>
              </ul>
            </section>

            <section className="glass-card rounded-2xl p-8 border border-white/5">
              <h2 className="font-display text-xl font-bold text-primary mb-4">5. Data Storage & Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                All data submitted through our contact or notification forms is securely stored in an encrypted PostgreSQL database hosted on Replit's infrastructure. We implement industry-standard security measures including rate limiting and input validation to prevent misuse. Only the CineBodha team has access to this data.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8 border border-white/5">
              <h2 className="font-display text-xl font-bold text-primary mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-primary mt-1">✦</span><span>Request access to the personal data we hold about you.</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">✦</span><span>Request deletion of your data at any time.</span></li>
                <li className="flex items-start gap-2"><span className="text-primary mt-1">✦</span><span>Unsubscribe from notifications by contacting us.</span></li>
              </ul>
              <p className="text-muted-foreground mt-4">
                To exercise any of these rights, email us at{" "}
                <a href="mailto:lovelyprince8639@gmail.com" className="text-primary hover:underline">
                  lovelyprince8639@gmail.com
                </a>
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8 border border-white/5">
              <h2 className="font-display text-xl font-bold text-primary mb-4">7. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we will delete it immediately.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8 border border-white/5">
              <h2 className="font-display text-xl font-bold text-primary mb-4">8. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last updated" date at the top of this page. We encourage you to review this policy periodically.
              </p>
            </section>

            <section className="glass-card rounded-2xl p-8 border border-primary/20">
              <h2 className="font-display text-xl font-bold text-primary mb-4">9. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="flex flex-col gap-2">
                <a href="mailto:lovelyprince8639@gmail.com" className="text-primary hover:underline flex items-center gap-2">
                  <span>✦</span> lovelyprince8639@gmail.com
                </a>
                <a href="https://youtube.com/@cinebodha" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-2">
                  <span>✦</span> youtube.com/@cinebodha
                </a>
                <a href="https://www.instagram.com/cinebodhaofficial" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-2">
                  <span>✦</span> @cinebodhaofficial
                </a>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

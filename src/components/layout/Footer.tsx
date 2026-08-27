import { Feather, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { FacebookIcon, InstagramIcon, XIcon, YoutubeIcon } from "../ui/SocialIcons";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Books", href: "#books" },
  { label: "About Me", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Membership", href: "#membership" },
  { label: "Contact", href: "#contact" },
];

const SUPPORT_LINKS = [
  { label: "Help Center", href: "#help" },
  { label: "Contact", href: "#contact" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
];

const SOCIALS = [
  { label: "Facebook", icon: FacebookIcon, href: "#" },
  { label: "Instagram", icon: InstagramIcon, href: "#" },
  { label: "X / Twitter", icon: XIcon, href: "#" },
  { label: "YouTube", icon: YoutubeIcon, href: "#" },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-ink pt-16">
      <div className="container-page grid grid-cols-1 gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
              <Feather className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div className="leading-none">
              <p className="font-display text-lg font-medium tracking-wide text-cream">Emeriverse</p>
              <p className="mt-1 text-[0.6rem] font-semibold tracking-[0.2em] text-cream/50">A UNIVERSE OF LEARNING</p>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/55">
            Educational books and Easy Learning Flash Cards by Ifeanyi Emeribe, built to make
            grammar, idioms, vocabulary, and general knowledge simple for every learner.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label="Quick links">
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-cream/40">Quick Links</h3>
          <ul className="mt-5 space-y-3">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-cream/70 transition-colors hover:text-gold-pale">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Support">
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-cream/40">Support</h3>
          <ul className="mt-5 space-y-3">
            {SUPPORT_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-cream/70 transition-colors hover:text-gold-pale">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div id="community">
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-cream/40">Community</h3>
          <p className="mt-5 text-sm leading-relaxed text-cream/70">
            Be part of a growing community of learners, parents, and educators.
          </p>
          <Button variant="outline-light" href="#membership" size="md" className="mt-5" icon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}>
            Join the Community
          </Button>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6">
        <p className="container-page text-center text-xs text-cream/40">
          © 2026 Emeriverse — Ifeanyi Emeribe. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

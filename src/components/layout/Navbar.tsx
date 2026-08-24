import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search, Moon, Sun, Feather } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "../../lib/cn";
import type { NavLink } from "../../types";

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Books", href: "#books" },
  { label: "About Me", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Community", href: "#community" },
  { label: "Membership", href: "#membership" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-ink/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(255,255,255,0.08)]" : "bg-transparent",
      )}
    >
      <nav className="container-page flex h-[72px] items-center justify-between" aria-label="Primary">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
            <Feather className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-medium text-cream">James Whitaker</span>
            <span className="mt-1 text-[0.6rem] font-semibold tracking-[0.2em] text-cream/50">
              AUTHOR &amp; STORYTELLER
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "relative text-sm text-cream/80 transition-colors hover:text-cream",
                  link.label === "Home" && "text-gold-pale hover:text-gold-pale",
                )}
              >
                {link.label}
                {link.label === "Home" && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-gold" aria-hidden="true" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 lg:flex">
          <button
            type="button"
            aria-label="Search the site"
            className="text-cream/80 transition-colors hover:text-gold-pale"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={!isDark}
            onClick={() => setIsDark((v) => !v)}
            className="text-cream/80 transition-colors hover:text-gold-pale"
          >
            {isDark ? <Moon className="h-[18px] w-[18px]" strokeWidth={1.75} /> : <Sun className="h-[18px] w-[18px]" strokeWidth={1.75} />}
          </button>
          <a href="#login" className="text-sm text-cream/80 transition-colors hover:text-cream">
            Login
          </a>
          <Button variant="primary" size="md" href="#membership">
            Join Premium
          </Button>
        </div>

        <button
          type="button"
          className="text-cream lg:hidden"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="h-6 w-6" strokeWidth={1.75} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="ml-auto flex h-full w-[82%] max-w-sm flex-col bg-ink px-6 py-6"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-medium text-cream">James Whitaker</span>
                <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} className="text-cream">
                  <X className="h-6 w-6" strokeWidth={1.75} />
                </button>
              </div>

              <ul className="mt-10 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block border-b border-cream/10 py-3.5 font-display text-lg text-cream/90 hover:text-gold-pale"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-3 pt-8">
                <Button variant="outline-light" href="#login" fullWidth>
                  Login
                </Button>
                <Button variant="primary" href="#membership" fullWidth>
                  Join Premium
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

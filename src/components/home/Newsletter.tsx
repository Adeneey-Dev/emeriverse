import { useState, type FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mail, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "../ui/Button";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      setError("That email address doesn't look quite right.");
      return;
    }

    // No backend yet — this is where `POST /api/newsletter` will go.
    setError(null);
    setSubmitted(true);
  };

  return (
    <section
      className="bg-surface-alt py-16 lg:py-20"
      aria-labelledby="newsletter-heading"
    >
      <div className="container-page">
        <div className="mx-auto flex max-w-2xl flex-col items-center rounded-sm border border-surface-line bg-surface px-6 py-12 text-center sm:px-12">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-gold">
            <Mail className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </span>

          <h2
            id="newsletter-heading"
            className="mt-5 font-display text-2xl font-medium text-fg sm:text-3xl"
          >
            Stay Connected
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-muted sm:text-base">
            Be the first to know about new flash card releases, learning
            resources, and special offers.
          </p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                className="mt-7 flex items-center gap-2 rounded-sm bg-fg/5 px-5 py-3 text-sm font-medium text-fg"
                role="status"
              >
                <CheckCircle2 className="h-4 w-4 text-gold" strokeWidth={2} />
                You&rsquo;re on the list - welcome aboard.
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={shouldReduceMotion ? undefined : { opacity: 0 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                onSubmit={handleSubmit}
                className="mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row"
                noValidate
              >
                <div className="flex-1 text-left">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "newsletter-error" : undefined}
                    className="w-full rounded-sm border border-surface-line bg-surface px-4 py-3 text-sm text-fg placeholder:text-fg-faint focus:border-gold"
                  />
                  {error && (
                    <p
                      id="newsletter-error"
                      className="mt-1.5 text-xs text-left text-red-700"
                    >
                      {error}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="sm:w-auto"
                >
                  Subscribe
                </Button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="mt-5 flex items-center gap-1.5 text-xs text-fg-muted">
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

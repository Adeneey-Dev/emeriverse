import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ExternalLink, ShoppingCart } from "lucide-react";
import type { Book } from "../../types";
import { Badge } from "../ui/Badge";
import { BookCover } from "../ui/BookCover";
import { formatNaira } from "../../lib/currency";
import { useCart } from "../../providers/useCart";
import { cn } from "../../lib/cn";

interface BookCardProps {
  book: Book;
  index: number;
}

export function BookCard({ book, index }: BookCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(book);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: shouldReduceMotion ? 0 : Math.min(index, 4) * 0.07,
      }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-surface-line bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl"
    >
      {/* Cover area */}
      <a
        href={book.amazonUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${book.title} by ${book.author} on Amazon (opens in a new tab)`}
        className="relative block bg-surface-alt p-3 sm:p-4"
      >
        <div className="absolute left-5 top-5 z-10 sm:left-6 sm:top-6">
          <Badge type={book.accessType} />
        </div>

        <div className="overflow-hidden rounded-[4px] shadow-[0_14px_28px_-14px_rgba(0,0,0,0.5)]">
          <div className="transition-transform duration-500 ease-out group-hover:scale-[1.04]">
            <BookCover book={book} />
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center gap-1.5 rounded-b-[4px] bg-ink/85 py-2 text-xs font-medium tracking-wide text-cream opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:inset-x-4 sm:bottom-4"
          aria-hidden="true"
        >
          View on Amazon
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
        </div>
      </a>

      {/* Details */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold">
          {book.genre}
        </span>

        <h3 className="mt-1.5 line-clamp-2 min-h-[2.65rem] font-display text-[0.95rem] font-medium leading-snug text-fg">
          <a
            href={book.amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold"
          >
            {book.title}
          </a>
        </h3>

        <p className="mt-1 truncate text-xs text-fg-muted">
          {book.author}{" "}
          <span className="text-fg-faint">&middot; {book.year}</span>
        </p>

        {/* Pinned to the bottom so every card's price + button line up */}
        <div className="mt-auto pt-4">
          <div className="flex items-end justify-between gap-2 border-t border-surface-line pt-3">
            <span className="font-display text-xl font-medium leading-none text-fg">
              {formatNaira(book.price)}
            </span>
            <a
              href={book.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[0.7rem] font-medium text-fg-muted transition-colors hover:text-gold"
            >
              Amazon
              <ExternalLink
                className="h-3 w-3"
                strokeWidth={2}
                aria-hidden="true"
              />
            </a>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${book.title} to cart`}
            className={cn(
              "mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 active:scale-[0.98]",
              justAdded
                ? "bg-emerald-600 text-white"
                : "bg-gold text-ink hover:bg-gold-deep hover:text-cream",
            )}
          >
            {justAdded ? (
              <>
                <Check className="h-4 w-4" strokeWidth={2.5} />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" strokeWidth={2} />
                Add to cart
              </>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

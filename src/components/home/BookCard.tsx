import { motion, useReducedMotion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import type { Book } from "../../types";
import { Badge } from "../ui/Badge";
import { BookCover } from "../ui/BookCover";

interface BookCardProps {
  book: Book;
  index: number;
}

export function BookCard({ book, index }: BookCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const hasRating = typeof book.rating === "number" && typeof book.reviewCount === "number";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : Math.min(index, 4) * 0.08 }}
      className="group flex w-full flex-shrink-0 flex-col"
    >
      <a
        href={book.amazonUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${book.title} by ${book.author} on Amazon (opens in a new tab)`}
        className="relative block overflow-hidden rounded-[3px] transition-transform duration-300 ease-out group-hover:-translate-y-1.5"
      >
        <div className="absolute left-2.5 top-2.5 z-10">
          <Badge type={book.accessType} />
        </div>

        <div className="overflow-hidden rounded-[3px]">
          <div className="transition-transform duration-500 ease-out group-hover:scale-[1.04]">
            <BookCover book={book} />
          </div>
        </div>

        {/* page-peel corner, appears on hover to reinforce the outbound link */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-0 w-0 border-b-[26px] border-l-[26px] border-b-surface border-l-transparent opacity-0 shadow-[-2px_-2px_6px_rgba(0,0,0,0.15)] transition-opacity duration-300 group-hover:opacity-90"
          aria-hidden="true"
        />

        <div
          className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-center gap-1.5 bg-ink/85 py-2 text-xs font-medium tracking-wide text-cream opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          aria-hidden="true"
        >
          View on Amazon
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
        </div>
      </a>

      <div className="mt-3.5 px-0.5">
        <h3 className="font-display text-base font-medium leading-snug text-fg">
          <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold-deep">
            {book.title}
          </a>
        </h3>
        <p className="mt-0.5 text-sm text-fg-muted">
          {book.author} <span className="text-fg-faint">· {book.year}</span>
        </p>
        {hasRating && (
          <div className="mt-1.5 flex items-center gap-1 text-sm text-fg">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" strokeWidth={0} />
            <span className="font-medium">{book.rating!.toFixed(1)}</span>
            <span className="text-fg-faint">({book.reviewCount})</span>
          </div>
        )}
      </div>
    </motion.article>
  );
}

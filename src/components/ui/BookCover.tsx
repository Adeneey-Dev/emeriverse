import type { Book } from "../../types";
import { cn } from "../../lib/cn";

interface BookCoverProps {
  book: Book;
  className?: string;
}

/**
 * Renders the real cover photo when `book.coverImage` is set. Falls back
 * to a generated typographic cover (gradient + title) for any book that
 * doesn't have a photo yet, so new titles never look broken while
 * waiting on real cover art.
 */
export function BookCover({ book, className }: BookCoverProps) {
  if (book.coverImage) {
    return (
      <div
        className={cn(
          "relative aspect-[2/3] w-full overflow-hidden rounded-[3px]",
          className,
        )}
      >
        <img
          src={book.coverImage}
          alt={`Cover of ${book.title} by ${book.author}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  const [from, to] = book.coverPalette;

  return (
    <div
      className={cn(
        "relative aspect-[2/3] w-full overflow-hidden rounded-[3px]",
        "shadow-[3px_4px_0_0_rgba(0,0,0,0.08),0_10px_24px_-12px_rgba(0,0,0,0.45)]",
        className,
      )}
      style={{ background: `linear-gradient(155deg, ${from} 0%, ${to} 130%)` }}
    >
      <div className="absolute inset-y-0 left-0 w-[8%] bg-black/25" />
      <div className="absolute inset-y-1 right-0 w-[3px] bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.35),rgba(255,255,255,0.35)_1px,transparent_1px,transparent_3px)]" />

      <div className="relative flex h-full flex-col justify-between p-5">
        <span className="eyebrow !text-[0.6rem] !tracking-[0.2em] text-cream/70">
          {book.genre}
        </span>

        <div>
          <p className="font-display text-xl font-medium leading-[1.15] text-cream sm:text-2xl">
            {book.title}
          </p>
          <div className="mt-3 h-px w-8 bg-gold-pale/70" />
          <p className="mt-3 font-display text-xs italic text-cream/70">
            {book.author}
          </p>
        </div>
      </div>
    </div>
  );
}

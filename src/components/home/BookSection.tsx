import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { BookCard } from "./BookCard";
import { books } from "../../data/books";
import { cn } from "../../lib/cn";

const AMAZON_AUTHOR_URL = "https://www.amazon.com/Ifeanyi-Emeribe/e/B0B248BPR6";

export function BookSection() {
  const genres = useMemo(
    () => ["All", ...Array.from(new Set(books.map((book) => book.genre)))],
    [],
  );
  const [activeGenre, setActiveGenre] = useState("All");

  const visibleBooks =
    activeGenre === "All"
      ? books
      : books.filter((book) => book.genre === activeGenre);

  return (
    <section
      id="books"
      className="bg-surface py-20 lg:py-28"
      aria-labelledby="books-heading"
    >
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Discover the Catalogue"
            heading={<span id="books-heading">Easy Learning Flash Cards</span>}
            description="A growing library of practical, easy-to-follow books on grammar, idioms, vocabulary, and general knowledge - for learners of every age."
          />
          <Button
            variant="outline-dark"
            href={AMAZON_AUTHOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            icon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
            className="hidden sm:inline-flex"
          >
            View All on Amazon
          </Button>
        </div>

        {/* Genre filter chips */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
            role="group"
            aria-label="Filter books by subject"
          >
            {genres.map((genre) => {
              const active = genre === activeGenre;
              return (
                <button
                  key={genre}
                  type="button"
                  onClick={() => setActiveGenre(genre)}
                  aria-pressed={active}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200",
                    active
                      ? "border-gold bg-gold text-ink shadow-sm"
                      : "border-surface-line bg-surface text-fg-muted hover:border-gold/60 hover:text-fg",
                  )}
                >
                  {genre}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-fg-faint" aria-live="polite">
            Showing {visibleBooks.length} of {books.length} books
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
          {visibleBooks.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <Button
            variant="outline-dark"
            href={AMAZON_AUTHOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            icon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
            fullWidth
          >
            View All on Amazon
          </Button>
        </div>
      </div>
    </section>
  );
}

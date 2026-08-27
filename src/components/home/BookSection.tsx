import { ArrowRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { BookCard } from "./BookCard";
import { books } from "../../data/books";

export function BookSection() {
  return (
    <section id="books" className="bg-surface py-20 lg:py-28" aria-labelledby="books-heading">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Discover the Catalogue"
            heading={<span id="books-heading">Easy Learning Flash Cards</span>}
            description="A growing library of practical, easy-to-follow books on grammar, idioms, vocabulary, and general knowledge — for learners of every age."
          />
          <Button
            variant="outline-dark"
            href="https://www.amazon.com/Ifeanyi-Emeribe/e/B0B248BPR6"
            target="_blank"
            rel="noopener noreferrer"
            icon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
            className="hidden sm:inline-flex"
          >
            View All on Amazon
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:mt-16 lg:grid-cols-4 lg:gap-x-7 xl:grid-cols-5">
          {books.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <Button
            variant="outline-dark"
            href="https://www.amazon.com/Ifeanyi-Emeribe/e/B0B248BPR6"
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

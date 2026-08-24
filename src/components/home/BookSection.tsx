import { ArrowRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { BookCard } from "./BookCard";
import { mockBooks } from "../../data/books";

export function BookSection() {
  return (
    <section id="books" className="bg-cream py-20 lg:py-28" aria-labelledby="books-heading">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Discover My Books"
            heading={<span id="books-heading">Latest Books</span>}
            description="Explore stories written to inspire, challenge, and stay with you long after the final page."
          />
          <Button variant="outline-dark" href="#books" icon={<ArrowRight className="h-4 w-4" strokeWidth={2} />} className="hidden sm:inline-flex">
            View All Books
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:mt-16 lg:grid-cols-4 lg:gap-x-7 xl:grid-cols-5">
          {mockBooks.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <Button variant="outline-dark" href="#books" icon={<ArrowRight className="h-4 w-4" strokeWidth={2} />} fullWidth>
            View All Books
          </Button>
        </div>
      </div>
    </section>
  );
}

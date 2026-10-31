
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

const featuredBooks = [
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    image: "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg",
    category: "Fiction",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    image: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    category: "Self Development",
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    image: "https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg",
    category: "Science",
  },
];

const FeaturedBooks = () => {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-emerald-700">
            Handpicked Collection
          </p>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Featured Books
          </h2>
          <p className="mt-3 text-slate-500">
            Discover some of our most loved reads.
          </p>
        </div>

        <Link
          href="/books"
          className="inline-flex items-center gap-2 font-semibold text-emerald-700 hover:text-emerald-900"
        >
          View All <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredBooks.map((book) => (
          <div
            key={book.title}
            className="group flex gap-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex h-44 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-emerald-50">
              <img
                src={book.image}
                alt={book.title}
                className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col justify-center">
              <span className="mb-3 w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {book.category}
              </span>

              <h3 className="text-lg font-bold text-slate-900">
                {book.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500">{book.author}</p>

              <Link
                href="/books"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900"
              >
                Explore <BookOpen size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBooks;

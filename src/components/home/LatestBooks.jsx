
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

const books = [
  {
    id: "1",
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    image: "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg",
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Others",
    image: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
  },
  {
    id: "3",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    image: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
  },
  {
    id: "4",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    image: "https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg",
  },
  {
    id: "5",
    title: "The Little Prince",
    author: "Antoine de Saint-Exupery",
    category: "Kids",
    image: "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg",
  },
  {
    id: "6",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    category: "Others",
    image: "https://covers.openlibrary.org/b/isbn/9781585424337-L.jpg",
  },
];

const LatestBooks = () => {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-emerald-700">
              Fresh From Our Library
            </p>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Latest Books
            </h2>
            <p className="mt-3 text-slate-500">
              Find your next great read from our collection.
            </p>
          </div>

          <Link
            href="/books"
            className="inline-flex items-center gap-2 font-semibold text-emerald-700 hover:text-emerald-900"
          >
            Browse All <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {books.map((book) => (
            <Link
              key={book.id}
              href={`/book/${book.id}`}
              className="group overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-48 items-center justify-center overflow-hidden rounded-xl bg-emerald-50 p-2 sm:h-56">
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="px-1 pb-2 pt-4">
                <span className="text-xs font-semibold text-emerald-700">
                  {book.category}
                </span>

                <h3 className="mt-2 line-clamp-2 min-h-12 font-bold text-slate-900 group-hover:text-emerald-700">
                  {book.title}
                </h3>

                <p className="mt-2 truncate text-xs text-slate-500">
                  {book.author}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBooks;

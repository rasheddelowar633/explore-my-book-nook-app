
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Loader2 } from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const LatestBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/books`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load latest books.");
        }

        const data = await response.json();

        const bookList = Array.isArray(data) ? data : data.books;

        if (!Array.isArray(bookList)) {
          throw new Error("Invalid books API response.");
        }

        // Latest 6 books
        setBooks(bookList.slice(0, 6));
      } catch (err) {
        console.error("Latest books error:", err);
        setError("Unable to load latest books.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBooks();
  }, []);

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

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2
              size={35}
              className="animate-spin text-emerald-600"
            />
          </div>
        ) : error ? (
          <div className="rounded-xl bg-red-50 py-10 text-center text-red-600">
            {error}
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {books.map((book) => (
              <Link
                key={book._id}
                href={`/book/${book._id}`}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-48 items-center justify-center overflow-hidden rounded-xl bg-emerald-50 p-2 sm:h-56">
                  {book.image ? (
                    <img
                      src={book.image}
                      alt={book.title || "Book cover"}
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <BookOpen
                      size={55}
                      className="text-emerald-600"
                    />
                  )}
                </div>

                <div className="px-1 pb-2 pt-4">
                  <span className="text-xs font-semibold text-emerald-700">
                    {book.category || "General"}
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
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center">
            <BookOpen
              size={45}
              className="mx-auto mb-3 text-emerald-600"
            />

            <h3 className="font-bold text-slate-800">
              No Books Available
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Add some books to see them here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestBooks;

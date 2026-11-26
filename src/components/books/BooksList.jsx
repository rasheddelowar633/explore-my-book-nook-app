
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, BookOpen, ArrowRight, Loader2 } from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const categories = [
  "All",
  "Fiction",
  "Science",
  "History",
  "Kids",
  "Others",
  "Productivity",
];

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/books`);

        if (!response.ok) {
          throw new Error("Failed to load books.");
        }

        const data = await response.json();

        // Supports both array and { books: [] } responses.
        const bookList = Array.isArray(data) ? data : data.books;

        if (!Array.isArray(bookList)) {
          throw new Error("Invalid books API response.");
        }

        setBooks(bookList);
      } catch (err) {
        console.error("Books fetching error:", err);
        setError("Unable to load books. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title?.toLowerCase().includes(search.toLowerCase()) ||
        book.author?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        book.category?.toLowerCase() === category.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [books, search, category]);

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Our Collection
          </span>

          <h1 className="text-3xl font-bold text-slate-900 md:text-5xl">
            Explore All Books
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-slate-500">
            Discover amazing books, explore new knowledge and find your next
            favorite read.
          </p>
        </div>

        <div className="mx-auto mb-8 max-w-2xl">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm focus-within:border-emerald-500">
            <Search className="text-emerald-600" size={22} />

            <input
              type="text"
              placeholder="Search by book title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                category === item
                  ? "bg-emerald-600 text-white shadow-md"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-500 hover:text-emerald-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">
            Available Books
          </h2>

          <span className="text-sm text-slate-500">
            {filteredBooks.length} Books Found
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-emerald-600" size={40} />
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-red-50 py-12 text-center text-red-600">
            {error}
          </div>
        ) : filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-emerald-50 p-5">
                  {book.image ? (
                    <Image
                      src={book.image}
                      alt={book.title}
                      width={180}
                      height={230}
                      unoptimized
                      className="h-full w-auto object-contain transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <BookOpen size={60} className="text-emerald-600" />
                  )}

                  <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
                    {book.category || "General"}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="line-clamp-1 text-lg font-bold text-slate-800">
                    {book.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    By {book.author}
                  </p>

                  <p className="mt-2 text-sm text-emerald-700">
                    Available copies: {book.quantity ?? 0}
                  </p>

                  <Link
                    href={`/book/${book._id}`}
                    className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
                  >
                    <BookOpen size={18} />
                    View Details
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <BookOpen className="mx-auto mb-4 text-slate-400" size={45} />

            <h3 className="text-xl font-bold text-slate-700">
              No Books Found
            </h3>

            <p className="mt-2 text-slate-500">
              Try another search or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-5 rounded-lg bg-emerald-600 px-5 py-2 text-white hover:bg-emerald-700"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

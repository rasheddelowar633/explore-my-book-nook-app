
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, BookOpen, ArrowRight } from "lucide-react";

const demoBooks = [
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
    author: "Antoine de Saint-Exupéry",
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

const categories = ["All", "Fiction", "Science", "History", "Kids", "Others"];

export default function BooksList() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredBooks = useMemo(() => {
    return demoBooks.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || book.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
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

        {/* Search */}
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

        {/* Categories */}
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

        {/* Result Count */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">
            Available Books
          </h2>

          <span className="text-sm text-slate-500">
            {filteredBooks.length} Books Found
          </span>
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-emerald-50 p-5">
                  <Image
                    src={book.image}
                    alt={book.title}
                    width={180}
                    height={230}
                    unoptimized
                    className="h-full w-auto object-contain transition duration-300 group-hover:scale-105"
                  />

                  <span className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
                    {book.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="line-clamp-1 text-lg font-bold text-slate-800">
                    {book.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    By {book.author}
                  </p>

                  <Link
                    href={`/book/${book.id}`}
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

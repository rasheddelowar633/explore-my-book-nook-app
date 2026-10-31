
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  UserRound,
  Bookmark,
  Library,
  CheckCircle,
} from "lucide-react";

const demoBooks = [
  {
    id: "1",
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    image: "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg",
    description:
      "The Alchemist is a beautiful story about following your dreams and discovering your personal legend. It inspires readers to listen to their hearts and follow their dreams.",
    totalCopies: 10,
    availableCopies: 7,
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Others",
    image: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    description:
      "Atomic Habits explains how small daily improvements can lead to remarkable results. Learn practical strategies to build good habits and break bad ones.",
    totalCopies: 12,
    availableCopies: 8,
  },
  {
    id: "3",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    image: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
    description:
      "Sapiens explores the history of humankind, from ancient times to the modern world, and explains how humans shaped the world around them.",
    totalCopies: 8,
    availableCopies: 5,
  },
  {
    id: "4",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    image: "https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg",
    description:
      "A Brief History of Time explores fascinating questions about the universe, black holes, space, time, and the origins of everything.",
    totalCopies: 6,
    availableCopies: 3,
  },
  {
    id: "5",
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    category: "Kids",
    image: "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg",
    description:
      "The Little Prince is a timeless story about friendship, love, imagination, and the important things in life.",
    totalCopies: 9,
    availableCopies: 6,
  },
  {
    id: "6",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    category: "Others",
    image: "https://covers.openlibrary.org/b/isbn/9781585424337-L.jpg",
    description:
      "Think and Grow Rich shares principles of success, personal development, goal setting, and positive thinking.",
    totalCopies: 10,
    availableCopies: 0,
  },
];

export async function generateMetadata({ params }) {
  const { id } = await params;
  const book = demoBooks.find((item) => item.id === id);

  return {
    title: book ? `${book.title} | BookNook` : "Book Not Found | BookNook",
    description: book?.description || "Book details in BookNook.",
  };
}

export default async function BookDetailsPage({ params }) {
  const { id } = await params;

  const book = demoBooks.find((item) => item.id === id);

  if (!book) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Back Button */}
        <Link
          href="/books"
          className="mb-8 inline-flex items-center gap-2 font-semibold text-emerald-700 transition hover:text-emerald-900"
        >
          <ArrowLeft size={20} />
          Back to All Books
        </Link>

        {/* Details Card */}
        <div className="grid overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg md:grid-cols-2">

          {/* Book Image */}
          <div className="flex min-h-[400px] items-center justify-center bg-emerald-50 p-8 md:p-12">
            <Image
              src={book.image}
              alt={book.title}
              width={300}
              height={420}
              unoptimized
              priority
              className="max-h-[420px] w-auto rounded-lg object-contain shadow-xl"
            />
          </div>

          {/* Book Information */}
          <div className="flex flex-col justify-center p-6 md:p-12">

            <span className="mb-5 w-fit rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              {book.category}
            </span>

            <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              {book.title}
            </h1>

            <div className="mt-4 flex items-center gap-2 text-slate-500">
              <UserRound size={19} className="text-emerald-600" />
              <span>Written by {book.author}</span>
            </div>

            <div className="my-7 border-t border-slate-100" />

            <h2 className="mb-3 text-xl font-bold text-slate-800">
              About This Book
            </h2>

            <p className="leading-8 text-slate-600">
              {book.description}
            </p>

            {/* Book Statistics */}
            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <Library size={18} />
                  <span className="text-sm">Total Copies</span>
                </div>

                <p className="text-2xl font-bold text-slate-800">
                  {book.totalCopies}
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-emerald-700">
                  <BookOpen size={18} />
                  <span className="text-sm">Available</span>
                </div>

                <p className="text-2xl font-bold text-emerald-700">
                  {book.availableCopies}
                </p>
              </div>
            </div>

            {/* Availability */}
            <div className="mt-6 flex items-center gap-2">
              {book.availableCopies > 0 ? (
                <>
                  <CheckCircle size={19} className="text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-700">
                    This book is currently available.
                  </span>
                </>
              ) : (
                <>
                  <Bookmark size={19} className="text-red-500" />
                  <span className="text-sm font-semibold text-red-600">
                    Currently unavailable.
                  </span>
                </>
              )}
            </div>

            {/* Borrow Button - UI only */}
            <button
              disabled={book.availableCopies === 0}
              className="mt-8 w-full rounded-xl bg-emerald-600 px-6 py-4 font-bold text-white shadow-md transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {book.availableCopies > 0
                ? "Borrow This Book"
                : "Currently Unavailable"}
            </button>

            <p className="mt-3 text-center text-xs text-slate-400">
              Borrow functionality will be connected with the backend later.
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}

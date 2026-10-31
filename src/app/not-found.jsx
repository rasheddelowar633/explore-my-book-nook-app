
import Link from "next/link";
import { BookOpen, ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-slate-100 px-4 py-12">

      <div className="w-full max-w-xl rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-xl md:p-12">

        {/* Icon */}
        <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
          <SearchX size={48} className="text-emerald-600" />
        </div>

        {/* Error Code */}
        <h1 className="text-7xl font-extrabold text-emerald-600 md:text-8xl">
          404
        </h1>

        <h2 className="mt-5 text-2xl font-bold text-slate-800 md:text-3xl">
          Oops! Page Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-md leading-7 text-slate-500">
          Sorry, the page or book you are looking for does not exist.
          Let&apos;s help you find your next favorite book!
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            <ArrowLeft size={19} />
            Back Home
          </Link>

          <Link
            href="/books"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-600 px-6 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            <BookOpen size={19} />
            Explore Books
          </Link>

        </div>

        <p className="mt-10 text-sm text-slate-400">
          BookNook — Discover Your Next Favorite Book.
        </p>

      </div>
    </main>
  );
}

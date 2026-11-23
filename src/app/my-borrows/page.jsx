
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  Clock,
  RotateCcw,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Library,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const formatDate = (date) => {
  if (!date) return "Not available";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function MyBorrowsPage() {
  const { data: session, isPending: authLoading } =
    authClient.useSession();

  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);
  const [activeTab, setActiveTab] = useState("borrowed");
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const userEmail = session?.user?.email;

  // Fetch User Borrow Records
  const fetchBorrows = useCallback(async () => {
    if (!userEmail) {
      setBorrows([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/borrows?userEmail=${encodeURIComponent(userEmail)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load borrow records");
      }

      setBorrows(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch Borrow Error:", error);

      setMessage({
        type: "error",
        text: error.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    if (!authLoading) {
      fetchBorrows();
    }
  }, [authLoading, fetchBorrows]);

  // Return Book
  const handleReturn = async (borrowId) => {
    const confirmed = window.confirm(
      "Are you sure you want to return this book?"
    );

    if (!confirmed) return;

    try {
      setReturningId(borrowId);
      setMessage({ type: "", text: "" });

      const response = await fetch(
        `${API_URL}/borrows/${borrowId}/return`,
        {
          method: "PATCH",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to return book");
      }

      setMessage({
        type: "success",
        text: data.message || "Book returned successfully!",
      });

      await fetchBorrows();
    } catch (error) {
      console.error("Return Book Error:", error);

      setMessage({
        type: "error",
        text: error.message || "Could not return this book",
      });
    } finally {
      setReturningId(null);
    }
  };

  // Filter Borrow Records
  const filteredBorrows = borrows.filter((borrow) => {
    const matchesTab = borrow.status === activeTab;

    const matchesSearch =
      borrow.bookTitle
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      borrow.bookAuthor
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const borrowedCount = borrows.filter(
    (borrow) => borrow.status === "borrowed"
  ).length;

  const returnedCount = borrows.filter(
    (borrow) => borrow.status === "returned"
  ).length;

  // Authentication Loading
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
      </div>
    );
  }

  // User Not Logged In
  if (!session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
            <BookOpen className="h-8 w-8 text-emerald-700" />
          </div>

          <h1 className="mb-3 text-2xl font-bold text-slate-900">
            Login Required
          </h1>

          <p className="mb-7 text-sm leading-6 text-slate-500">
            Please sign in to see your borrowed books and manage your returns.
          </p>

          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            Sign In
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>

          <div className="mt-5">
            <Link
              href="/"
              className="text-sm font-medium text-slate-500 hover:text-emerald-600"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/books"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-emerald-100 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Browse Books
          </Link>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-emerald-50">
                <Library className="h-4 w-4" />
                Your Personal Library
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
                My Borrowed Books
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-emerald-100 sm:text-base">
                Keep track of your reading journey, check due dates,
                and return books whenever you finish reading.
              </p>

              <p className="mt-3 text-sm text-emerald-200">
                Signed in as: {userEmail}
              </p>
            </div>

            <Link
              href="/books"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-emerald-800 shadow-lg transition hover:bg-emerald-50"
            >
              <BookOpen className="h-5 w-5" />
              Explore Books
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Statistics */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Currently Borrowed
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {borrowedCount}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
                <BookOpen className="h-7 w-7 text-emerald-700" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Successfully Returned
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {returnedCount}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                <CheckCircle2 className="h-7 w-7 text-blue-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-6 flex items-center gap-3 rounded-xl border p-4 ${
              message.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0" />
            )}

            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}

        {/* Search and Tabs */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search by book title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("borrowed")}
                className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  activeTab === "borrowed"
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Borrowed ({borrowedCount})
              </button>

              <button
                onClick={() => setActiveTab("returned")}
                className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  activeTab === "returned"
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Returned ({returnedCount})
              </button>
            </div>
          </div>
        </div>

        {/* Borrow Records */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="h-48 rounded-xl bg-slate-200" />
                <div className="mt-5 h-5 w-3/4 rounded bg-slate-200" />
                <div className="mt-3 h-4 w-1/2 rounded bg-slate-200" />
                <div className="mt-6 h-10 rounded-lg bg-slate-200" />
              </div>
            ))}
          </div>
        ) : filteredBorrows.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
              <BookOpen className="h-8 w-8 text-emerald-600" />
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              {searchTerm
                ? "No Matching Books Found"
                : activeTab === "borrowed"
                  ? "No Borrowed Books Yet"
                  : "No Returned Books Yet"}
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              {searchTerm
                ? "Try searching with a different book title or author."
                : activeTab === "borrowed"
                  ? "Your borrowed books will appear here. Explore our library and find your next favorite read."
                  : "Books you return successfully will appear here."}
            </p>

            {!searchTerm && activeTab === "borrowed" && (
              <Link
                href="/books"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
              >
                <BookOpen className="h-5 w-5" />
                Browse Books
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBorrows.map((borrow) => {
              const isOverdue =
                borrow.status === "borrowed" &&
                new Date(borrow.dueDate).getTime() < Date.now();

              return (
                <article
                  key={borrow._id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Book Cover */}
                  <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-50">
                    {borrow.image ? (
                      <img
                        src={borrow.image}
                        alt={borrow.bookTitle || "Book cover"}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <BookOpen className="h-20 w-20 text-emerald-300" />
                    )}

                    <div className="absolute right-4 top-4">
                      {borrow.status === "borrowed" ? (
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                            isOverdue
                              ? "bg-red-100 text-red-700"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {isOverdue ? "Overdue" : "Borrowed"}
                        </span>
                      ) : (
                        <span className="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-700">
                          Returned
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="p-5">
                    <h3 className="line-clamp-1 text-xl font-bold text-slate-900">
                      {borrow.bookTitle || "Untitled Book"}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      By {borrow.bookAuthor || "Unknown Author"}
                    </p>

                    <div className="my-5 space-y-3 border-y border-slate-100 py-4">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="flex items-center gap-2 text-slate-500">
                          <CalendarDays className="h-4 w-4" />
                          Borrowed
                        </span>

                        <span className="font-semibold text-slate-700">
                          {formatDate(borrow.borrowedAt)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="flex items-center gap-2 text-slate-500">
                          <Clock className="h-4 w-4" />
                          Due Date
                        </span>

                        <span
                          className={`font-semibold ${
                            isOverdue
                              ? "text-red-600"
                              : "text-slate-700"
                          }`}
                        >
                          {formatDate(borrow.dueDate)}
                        </span>
                      </div>

                      {borrow.returnedAt && (
                        <div className="flex items-center justify-between gap-3 text-sm">
                          <span className="flex items-center gap-2 text-slate-500">
                            <CheckCircle2 className="h-4 w-4" />
                            Returned
                          </span>

                          <span className="font-semibold text-slate-700">
                            {formatDate(borrow.returnedAt)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Return Button */}
                    {borrow.status === "borrowed" ? (
                      <button
                        onClick={() => handleReturn(borrow._id)}
                        disabled={returningId === borrow._id}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {returningId === borrow._id ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Returning...
                          </>
                        ) : (
                          <>
                            <RotateCcw className="h-5 w-5" />
                            Return Book
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="flex items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-3 font-semibold text-blue-700">
                        <CheckCircle2 className="h-5 w-5" />
                        Successfully Returned
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}


"use client";
src/components/books/BookDetailsClient.jsx

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  UserRound,
  Bookmark,
  Library,
  CheckCircle,
  Loader2,
  CalendarDays,
  Check,
  AlertCircle,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function BookDetailsClient({ book: initialBook }) {
  const router = useRouter();

  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  const [book, setBook] = useState(initialBook);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const userEmail = session?.user?.email;

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  const handleBorrow = async () => {
    setMessage("");

    if (sessionLoading) return;

    if (!session || !userEmail) {
      router.push(
        `/login?callbackURL=${encodeURIComponent(
          `/book/${book._id}`
        )}`
      );
      return;
    }

    if (book.quantity <= 0) {
      showMessage("This book is currently unavailable.", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: book._id,
          userEmail,
          borrowDays: 7,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        showMessage(
          result.message || "Unable to borrow this book.",
          "error"
        );
        return;
      }

      setBook((previous) => ({
        ...previous,
        quantity: Math.max(0, Number(previous.quantity) - 1),
      }));

      showMessage(
        "Book borrowed successfully! You can see it in My Borrows.",
        "success"
      );

      router.refresh();
    } catch (error) {
      console.error("Borrow Error:", error);

      showMessage(
        "Server connection failed. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const isAvailable = Number(book.quantity) > 0;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/books"
          className="mb-8 inline-flex items-center gap-2 font-semibold text-emerald-700 transition hover:text-emerald-900"
        >
          <ArrowLeft size={20} />
          Back to All Books
        </Link>

        <div className="grid overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg md:grid-cols-2">

          <div className="flex min-h-[400px] items-center justify-center bg-emerald-50 p-8 md:p-12">
            {book.image ? (
              <Image
                src={book.image}
                alt={book.title}
                width={300}
                height={420}
                unoptimized
                priority
                className="max-h-[420px] w-auto rounded-lg object-contain shadow-xl"
              />
            ) : (
              <div className="flex h-[350px] w-[250px] flex-col items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <BookOpen size={70} />
                <p className="mt-4 font-semibold">
                  No Book Cover
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center p-6 md:p-12">

            <span className="mb-5 w-fit rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              {book.category || "General"}
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
              {book.description ||
                "No description available for this book."}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <Library size={18} />
                  <span className="text-sm">Book Status</span>
                </div>

                <p className="text-lg font-bold text-slate-800">
                  {isAvailable ? "Available" : "Unavailable"}
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-4">
                <div className="mb-2 flex items-center gap-2 text-emerald-700">
                  <BookOpen size={18} />
                  <span className="text-sm">Available Copies</span>
                </div>

                <p className="text-2xl font-bold text-emerald-700">
                  {book.quantity ?? 0}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {isAvailable ? (
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

            <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays size={18} className="text-emerald-600" />
              Borrow duration: 7 days
            </div>

            {message && (
              <div
                role="status"
                className={`mt-5 flex items-start gap-2 rounded-xl border p-4 text-sm font-medium ${
                  messageType === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {messageType === "success" ? (
                  <Check size={18} />
                ) : (
                  <AlertCircle size={18} />
                )}

                <span>{message}</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleBorrow}
              disabled={!isAvailable || loading || sessionLoading}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-4 font-bold text-white shadow-md transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Borrowing...
                </>
              ) : !isAvailable ? (
                "Currently Unavailable"
              ) : sessionLoading ? (
                "Checking Login..."
              ) : (
                <>
                  <BookOpen size={20} />
                  Borrow This Book
                </>
              )}
            </button>

            <Link
              href="/my-borrows"
              className="mt-4 text-center text-sm font-semibold text-emerald-700 transition hover:text-emerald-900"
            >
              View My Borrowed Books →
            </Link>

            <p className="mt-4 text-center text-xs text-slate-400">
              You can borrow this book for 7 days.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

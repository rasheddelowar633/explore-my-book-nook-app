"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function MyBooks() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const userEmail = session?.user?.email;

  const fetchBooks = useCallback(async () => {
    if (!userEmail) {
      setBooks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/books?userEmail=${encodeURIComponent(userEmail)}`,
        { cache: "no-store" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load your books.");
      }

      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    if (!isPending) {
      fetchBooks();
    }
  }, [isPending, fetchBooks]);

  const handleDelete = async (bookId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) return;

    setDeletingId(bookId);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${API_URL}/books/${bookId}?userEmail=${encodeURIComponent(userEmail)}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete book.");
      }

      setBooks((previous) =>
        previous.filter((book) => book._id !== bookId)
      );

      setMessage("Book deleted successfully.");
    } catch (err) {
      setError(err.message || "Unable to delete this book.");
    } finally {
      setDeletingId("");
    }
  };

  const filteredBooks = books.filter((book) => {
    const searchText = search.toLowerCase();

    return (
      book.title?.toLowerCase().includes(searchText) ||
      book.author?.toLowerCase().includes(searchText) ||
      book.category?.toLowerCase().includes(searchText)
    );
  });

  if (isPending) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center">
        Checking your account...
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Login Required
        </h2>
        <p className="mt-2 text-gray-600">
          Please login to see the books you have added.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="mt-5 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          Login Now
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Your Book Collection
          </h2>
          <p className="mt-1 text-gray-500">
            Manage the books you have added to BookNook.
          </p>
        </div>

        <button
          onClick={fetchBooks}
          disabled={loading}
          className="rounded-xl border border-emerald-600 px-5 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50 disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh Books"}
        </button>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Books</p>
          <p className="mt-2 text-3xl font-bold text-emerald-700">
            {books.length}
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Available Copies</p>
          <p className="mt-2 text-3xl font-bold text-emerald-700">
            {books.reduce(
              (total, book) => total + Number(book.quantity || 0),
              0
            )}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by book title, author or category..."
          className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      {message && (
        <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="h-48 rounded-xl bg-gray-200" />
              <div className="mt-4 h-5 w-3/4 rounded bg-gray-200" />
              <div className="mt-3 h-4 w-1/2 rounded bg-gray-200" />
              <div className="mt-5 h-10 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-emerald-200 bg-white px-6 py-16 text-center">
          <div className="mb-4 text-5xl">📚</div>
          <h3 className="text-xl font-bold text-gray-800">
            {search ? "No Matching Books" : "No Books Added Yet"}
          </h3>
          <p className="mt-2 text-gray-500">
            {search
              ? "Try searching with another title or author."
              : "Start building your collection by adding your first book."}
          </p>

          {!search && (
            <button
              onClick={() => router.push("/add-book")}
              className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Add Your First Book
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <article
              key={book._id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-56 items-center justify-center bg-emerald-50">
                {book.image ? (
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <span className="text-6xl">📖</span>
                )}
              </div>

              <div className="p-5">
                <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {book.category || "General"}
                </span>

                <h3 className="mt-3 line-clamp-1 text-xl font-bold text-gray-900">
                  {book.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  By {book.author}
                </p>

                <p className="mt-3 line-clamp-3 min-h-12 text-sm text-gray-600">
                  {book.description || "No description available."}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <span className="text-sm text-gray-500">
                    Available copies
                  </span>
                  <span className="font-bold text-emerald-700">
                    {book.quantity ?? 0}
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(book._id)}
                  disabled={deletingId === book._id}
                  className="mt-5 w-full rounded-xl border border-red-200 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                >
                  {deletingId === book._id ? "Deleting..." : "Delete Book"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
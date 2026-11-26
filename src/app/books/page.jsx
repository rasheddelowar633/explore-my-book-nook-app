
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const initialForm = {
  title: "",
  author: "",
  category: "",
  description: "",
  image: "",
  quantity: "1",
};

export default function BooksPage() {
  const router = useRouter();

  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  const userEmail = session?.user?.email;

  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch Books
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/books`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load books.");
      }

      const data = await response.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Search
  const filteredBooks = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return books.filter((book) =>
      book.title?.toLowerCase().includes(searchText) ||
      book.author?.toLowerCase().includes(searchText) ||
      book.category?.toLowerCase().includes(searchText)
    );
  }, [books, search]);

  // Ownership
  const isOwner = (book) =>
    !!userEmail &&
    book.userEmail?.toLowerCase() === userEmail.toLowerCase();

  // Input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Reset
  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  // Login
  const redirectToLogin = () => {
    router.push(
      `/sign-in?callbackURL=${encodeURIComponent("/books")}`
    );
  };

  // Add / Update
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (sessionLoading) return;

    if (!session || !userEmail) {
      redirectToLogin();
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const bookData = {
        ...form,
        quantity: Number(form.quantity),
        userEmail,
      };

      const url = editingId
        ? `${API_URL}/books/${editingId}`
        : `${API_URL}/books`;

      const method = editingId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save book.");
      }

      setMessage(
        editingId
          ? "Book updated successfully!"
          : "New book added successfully!"
      );

      resetForm();
      await fetchBooks();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  // Edit
  const handleEdit = (book) => {
    if (!session || !userEmail) {
      redirectToLogin();
      return;
    }

    if (!isOwner(book)) {
      setError("You can only edit your own books.");
      return;
    }

    setEditingId(book._id);

    setForm({
      title: book.title || "",
      author: book.author || "",
      category: book.category || "",
      description: book.description || "",
      image: book.image || "",
      quantity: String(book.quantity ?? 1),
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete
  const handleDelete = async (id) => {
    if (!session || !userEmail) {
      redirectToLogin();
      return;
    }

    const book = books.find((item) => item._id === id);

    if (!book || !isOwner(book)) {
      setError("You can only delete your own books.");
      return;
    }

    try {
      setDeletingId(id);
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_URL}/books/${id}?userEmail=${encodeURIComponent(userEmail)}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete book.");
      }

      setBooks((previous) =>
        previous.filter((item) => item._id !== id)
      );

      setMessage("Book deleted successfully!");
      setConfirmDeleteId(null);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-800 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-emerald-600">
              <BookOpen size={25} />
              <span className="font-bold tracking-wide">BOOKNOOK</span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Explore Our Books
            </h1>

            <p className="mt-2 text-slate-500">
              Discover, manage and organize your favorite books.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (!session && !sessionLoading) {
                redirectToLogin();
                return;
              }

              resetForm();

              document
                .getElementById("book-form")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            disabled={sessionLoading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-700 disabled:opacity-50"
          >
            <Plus size={20} />
            Add New Book
          </button>
        </div>

        {/* Messages */}
        {message && (
          <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Add / Edit */}
        <section
          id="book-form"
          className="mb-12 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">
                {editingId ? "Update Book" : "Add a New Book"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {editingId
                  ? "Update the information of this book."
                  : "Fill in the information to add a book to your library."}
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-red-600"
                aria-label="Cancel editing"
              >
                <X size={21} />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Book Title *
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter book title"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Author Name *
                </label>

                <input
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="Enter author name"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Category
                </label>

                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="e.g. Fiction, Science, History"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Quantity *
                </label>

                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  min="1"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold">
                  Book Image URL
                </label>

                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://example.com/book-image.jpg"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Write a short description about this book..."
                  className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving || sessionLoading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <LoaderCircle className="animate-spin" size={19} />
                ) : (
                  <Plus size={19} />
                )}

                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Book"
                    : "Add Book"}
              </button>

              {(editingId || form.title || form.author) && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  Clear
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Books */}
        <section>
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold">All Books</h2>

              <p className="mt-1 text-sm text-slate-500">
                {books.length} books in your library
              </p>
            </div>

            <div className="flex gap-2">
              <div className="relative flex-1 sm:w-72">
                <Search
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search books..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="button"
                onClick={fetchBooks}
                disabled={loading}
                aria-label="Refresh books"
                className="rounded-xl border border-slate-200 bg-white px-3 text-slate-600 transition hover:bg-slate-100"
              >
                <RefreshCw
                  size={19}
                  className={loading ? "animate-spin" : ""}
                />
              </button>
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="h-56 bg-slate-200" />

                  <div className="space-y-3 p-5">
                    <div className="h-5 w-3/4 rounded bg-slate-200" />
                    <div className="h-4 w-1/2 rounded bg-slate-200" />
                    <div className="h-4 w-full rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
              <BookOpen
                size={48}
                className="mx-auto mb-4 text-slate-300"
              />

              <h3 className="text-xl font-bold">
                {search ? "No books found" : "Your library is empty"}
              </h3>

              <p className="mt-2 text-slate-500">
                {search
                  ? "Try searching with another title or author."
                  : "Add your first book to get started."}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredBooks.map((book) => (
                <article
                  key={book._id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative flex h-56 items-center justify-center overflow-hidden bg-emerald-50">
                    {book.image ? (
                      <img
                        src={book.image}
                        alt={book.title || "Book cover"}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <BookOpen
                        size={65}
                        className="text-emerald-200"
                      />
                    )}

                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-emerald-700 shadow-sm">
                      {book.category || "General"}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <h3 className="line-clamp-1 text-lg font-bold">
                      {book.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      By {book.author}
                    </p>

                    <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
                      {book.description || "No description available."}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-sm text-slate-500">
                        Available copies
                      </span>

                      <span className="rounded-lg bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                        {book.quantity ?? 0}
                      </span>
                    </div>

                    {/* Actions */}
                    <div
                      className={`mt-4 grid gap-3 ${
                        isOwner(book)
                          ? "grid-cols-1 sm:grid-cols-3"
                          : "grid-cols-1"
                      }`}
                    >
                      <Link
                        href={`/book/${book._id}`}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                      >
                        <BookOpen size={16} />
                        Details
                      </Link>

                      {isOwner(book) && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleEdit(book)}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                          >
                            <Pencil size={16} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(book._id)}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </>
                      )}
                    </div>

                    {/* Delete Confirmation */}
                    {confirmDeleteId === book._id && (
                      <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3">
                        <p className="text-sm font-medium text-red-700">
                          Are you sure you want to delete this book?
                        </p>

                        <div className="mt-3 flex gap-2">
                          <button
                            type="button"
                            disabled={deletingId === book._id}
                            onClick={() => handleDelete(book._id)}
                            className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                          >
                            {deletingId === book._id
                              ? "Deleting..."
                              : "Yes, Delete"}
                          </button>

                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

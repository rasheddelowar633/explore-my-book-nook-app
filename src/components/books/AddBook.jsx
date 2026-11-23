"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function AddBook() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!session?.user?.email) {
      setError("Please login before adding a book.");
      return;
    }

    if (!form.title.trim() || !form.author.trim()) {
      setError("Book title and author are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity),
          userEmail: session.user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add book.");
      }

      setMessage("Your book has been added successfully!");
      setForm(initialForm);

      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading...
      </div>
    );
  }

  if (!session?.user?.email) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
        <h2 className="text-xl font-bold text-gray-800">
          Login Required
        </h2>
        <p className="mt-2 text-gray-600">
          Please login to add a new book to BookNook.
        </p>
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="mt-5 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-100 bg-white p-6 shadow-lg sm:p-10">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">
          📚
        </div>

        <h2 className="text-3xl font-bold text-gray-900">
          Add a New Book
        </h2>

        <p className="mt-2 text-gray-500">
          Share your favorite books with the BookNook community.
        </p>
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

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block font-semibold text-gray-700">
            Book Title *
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-gray-700">
            Author *
          </label>
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-emerald-500"
          >
            <option value="">Select a category</option>
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="Technology">Technology</option>
            <option value="History">History</option>
            <option value="Biography">Biography</option>
            <option value="Self Development">Self Development</option>
            <option value="Children">Children</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-semibold text-gray-700">
            Book Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Write a short description about this book..."
            className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-gray-700">
            Book Image URL
          </label>
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/book-image.jpg"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="mb-2 block font-semibold text-gray-700">
            Available Quantity *
          </label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            min="0"
            step="1"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-emerald-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-emerald-600 px-6 py-4 font-bold text-white shadow-md transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Adding Book..." : "Add Book"}
        </button>
      </form>
    </div>
  );
}
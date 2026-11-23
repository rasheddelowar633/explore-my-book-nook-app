
import { notFound } from "next/navigation";
import BookDetailsClient from "@/components/books/BookDetailsClient";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function getBook(id) {
  if (!/^[a-fA-F0-9]{24}$/.test(id)) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/books/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) return null;

    const book = await response.json();

    return book?._id ? book : null;
  } catch (error) {
    console.error("Book fetching error:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const book = await getBook(id);

  return {
    title: book ? `${book.title} | BookNook` : "Book Not Found | BookNook",
    description: book?.description || "Discover books at BookNook.",
  };
}

export default async function BookDetailsPage({ params }) {
  const { id } = await params;
  const book = await getBook(id);

  if (!book) {
    notFound();
  }

  return <BookDetailsClient book={book} />;
}

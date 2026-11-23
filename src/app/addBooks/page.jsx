import AddBook from "@/components/books/AddBook";

export const metadata = {
  title: "Add Book | BookNook",
  description: "Add a new book to the BookNook library.",
};

export default function AddBookPage() {
  return (
    <main className="min-h-screen bg-emerald-50/40 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Add a Book
          </h1>
          <p className="mt-3 text-gray-600">
            Add your favorite book to the BookNook library.
          </p>
        </div>

        <AddBook />
      </div>
    </main>
  );
}
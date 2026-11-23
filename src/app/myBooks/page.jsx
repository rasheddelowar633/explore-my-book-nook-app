import MyBooks from "@/components/books/MyBooks";

export const metadata = {
  title: "My Books | BookNook",
  description: "Manage the books you have added to BookNook.",
};

export default function MyBooksPage() {
  return (
    <main className="min-h-screen bg-emerald-50/40 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            My Books
          </h1>
          <p className="mt-3 text-gray-600">
            All the books you have added to BookNook.
          </p>
        </div>

        <MyBooks />
      </div>
    </main>
  );
}
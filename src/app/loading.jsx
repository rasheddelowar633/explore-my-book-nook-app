
import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Loading Heading */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 h-5 w-32 animate-pulse rounded-full bg-emerald-100" />

          <div className="mx-auto h-10 w-64 animate-pulse rounded-lg bg-slate-200" />

          <div className="mx-auto mt-4 h-4 w-80 max-w-full animate-pulse rounded bg-slate-200" />
        </div>

        {/* Search Skeleton */}
        <div className="mx-auto mb-8 h-14 max-w-2xl animate-pulse rounded-2xl bg-white shadow-sm" />

        {/* Category Skeleton */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="h-10 w-24 animate-pulse rounded-full bg-slate-200"
            />
          ))}
        </div>

        {/* Books Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <div className="flex h-64 items-center justify-center bg-emerald-50">
                <BookOpen
                  size={45}
                  className="animate-pulse text-emerald-200"
                />
              </div>

              <div className="space-y-4 p-5">
                <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />

                <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />

                <div className="h-11 w-full animate-pulse rounded-xl bg-emerald-100" />
              </div>
            </div>
          ))}
        </div>

        {/* Loading Message */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />

          <p className="font-medium text-emerald-700">
            Loading your favorite books...
          </p>
        </div>
      </div>
    </main>
  );
}

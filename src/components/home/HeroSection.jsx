
import Link from "next/link";
import { ArrowRight, Search, BookOpen, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="overflow-hidden bg-emerald-50">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24 lg:px-8">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800">
            <Sparkles size={16} />
            Your Next Chapter Starts Here
          </div>

          <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Discover Your Next
            <span className="block text-emerald-700">Favorite Book.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 md:text-lg">
            Explore thousands of stories, discover new knowledge, and find
            the perfect book for every moment of your life.
          </p>

          <form
            action="/books"
            method="GET"
            className="mt-8 flex max-w-lg items-center gap-2 rounded-2xl border border-emerald-100 bg-white p-2 shadow-lg shadow-emerald-900/5"
          >
            <Search className="ml-3 shrink-0 text-emerald-600" size={22} />
            <input
              type="search"
              name="search"
              placeholder="Search books, authors..."
              className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Search
            </button>
          </form>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              href="/books"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-800"
            >
              Explore Books
              <ArrowRight size={18} />
            </Link>

            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <BookOpen size={19} className="text-emerald-700" />
              Read. Learn. Grow.
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-emerald-200/60 blur-2xl" />
          <div className="absolute -bottom-8 -left-6 h-40 w-40 rounded-full bg-yellow-200/60 blur-2xl" />

          <div className="relative rounded-3xl border border-white bg-white p-4 shadow-2xl shadow-emerald-900/10">
            <img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1000&q=85"
              alt="Beautiful library filled with books"
              className="h-80 w-full rounded-2xl object-cover sm:h-96"
            />

            <div className="absolute bottom-9 left-8 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur">
              <p className="text-xs font-medium text-slate-500">
                A world of stories
              </p>
              <p className="mt-1 text-xl font-bold text-emerald-900">
                Endless Discovery
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

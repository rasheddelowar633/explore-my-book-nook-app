
import Link from "next/link";
import {
  BookOpen,
  FlaskConical,
  Landmark,
  Baby,
  Library,
} from "lucide-react";

const categories = [
  { name: "Fiction", icon: BookOpen, color: "bg-emerald-50 text-emerald-700" },
  { name: "Science", icon: FlaskConical, color: "bg-blue-50 text-blue-700" },
  { name: "History", icon: Landmark, color: "bg-amber-50 text-amber-700" },
  { name: "Kids", icon: Baby, color: "bg-pink-50 text-pink-700" },
  { name: "Others", icon: Library, color: "bg-purple-50 text-purple-700" },
];

const Categories = () => {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
          Explore Collections
        </p>
        <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Browse By Category
        </h2>
        <p className="mt-3 text-slate-500">
          Find books that match your interests.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Link
              key={category.name}
              href={`/books?category=${category.name}`}
              className="group flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
            >
              <div className={`rounded-2xl p-5 ${category.color}`}>
                <Icon size={30} />
              </div>
              <h3 className="mt-4 font-bold text-slate-800 group-hover:text-emerald-700">
                {category.name}
              </h3>
              <span className="mt-2 text-xs text-slate-400">
                Explore Books
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;

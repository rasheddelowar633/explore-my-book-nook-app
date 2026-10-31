
import { BookOpen, Search, BookmarkCheck } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Vast Collection",
    description:
      "Explore a growing collection of books across different categories and interests.",
  },
  {
    icon: Search,
    title: "Easy Discovery",
    description:
      "Find your favorite books quickly with simple search and category browsing.",
  },
  {
    icon: BookmarkCheck,
    title: "Easy Borrowing",
    description:
      "Manage your borrowed books and keep track of your reading journey.",
  },
];

const WhyBookNook = () => {
  return (
    <section id="about" className="bg-emerald-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-300">
            The BookNook Experience
          </p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            More Than Just a Library
          </h2>
          <p className="mt-4 leading-7 text-emerald-100/80">
            A simple and friendly place to discover books, explore ideas,
            and make reading part of your everyday life.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-emerald-700 bg-emerald-800/70 p-8 transition hover:-translate-y-1 hover:bg-emerald-800"
              >
                <div className="mb-5 inline-flex rounded-xl bg-emerald-700 p-4 text-emerald-100">
                  <Icon size={28} />
                </div>

                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="mt-3 leading-7 text-emerald-100/80">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyBookNook;

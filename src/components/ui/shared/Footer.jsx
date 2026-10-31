
import Link from "next/link";
import { BookOpen, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="sm:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-xl bg-emerald-700 p-2 text-white">
              <BookOpen size={24} />
            </div>
            <span className="text-2xl font-extrabold text-white">
              Book<span className="text-emerald-400">Nook</span>
            </span>
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
            Discover stories, explore knowledge, and make every reading
            moment special with BookNook.
          </p>
        </div>

        <div>
          <h3 className="mb-5 font-bold text-white">Quick Links</h3>
          <div className="flex flex-col gap-3 text-sm">
            <Link href="/" className="hover:text-emerald-400">Home</Link>
            <Link href="/books" className="hover:text-emerald-400">All Books</Link>
            <Link href="/sign-in" className="hover:text-emerald-400">Sign In</Link>
            <Link href="/sign-up" className="hover:text-emerald-400">Register</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-bold text-white">Contact</h3>
          <div className="flex flex-col gap-4 text-sm text-slate-400">
            <p className="flex items-center gap-3">
              <Mail size={18} className="text-emerald-400" />
              support@booknook.com
            </p>
            <p className="flex items-center gap-3">
              <MapPin size={18} className="text-emerald-400" />
              Bangladesh
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 px-5 py-6 text-center text-sm text-slate-500">
      © 2026 BookNook. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Menu,
  X,
  UserRound,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const router = useRouter();

  // Better Auth session
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  // Navbar links
  const links = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
    { name: "Add Book", href: "/add-book", private: true },
    { name: "My Books", href: "/my-books", private: true },
    { name: "My Borrows", href: "/my-borrows", private: true },
  ];

  // Logout
  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        throw new Error(error.message || "Logout failed");
      }

      setProfileOpen(false);
      setMenuOpen(false);

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenus}
          className="flex items-center gap-2"
        >
          <div className="rounded-xl bg-emerald-700 p-2 text-white">
            <BookOpen size={25} />
          </div>

          <span className="text-2xl font-extrabold tracking-tight text-emerald-900">
            Book<span className="text-emerald-600">Nook</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-slate-600 transition hover:text-emerald-700"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 md:flex">

          {!isPending && !user && (
            <>
              <Link
                href="/sign-in"
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
              >
                <UserRound size={17} />
                Login
              </Link>

              <Link
                href="/sign-up"
                className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
              >
                Register
              </Link>
            </>
          )}

          {/* Logged-in User Profile */}
          {!isPending && user && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-full border border-emerald-100 p-1 pr-3 transition hover:bg-emerald-50"
                aria-expanded={profileOpen}
                aria-label="Open profile menu"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    className="h-10 w-10 rounded-full border-2 border-emerald-100 object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <UserRound size={21} />
                  </div>
                )}

                <ChevronDown size={17} className="text-emerald-800" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-xl">

                  <div className="border-b border-emerald-100 px-4 py-4">
                    <p className="truncate font-bold text-slate-800">
                      {user.name || "BookNook User"}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href="/profile"
                    onClick={closeMenus}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <User size={18} />
                    My Profile
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    <LogOut size={18} />
                    {loggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-emerald-900 hover:bg-emerald-50 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-emerald-100 bg-white px-5 py-5 md:hidden">

          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenus}
                className="font-medium text-slate-700 transition hover:text-emerald-700"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="mt-5 border-t border-emerald-100 pt-5">

            {/* Logged Out Mobile */}
            {!isPending && !user && (
              <div className="flex flex-col gap-3">
                <Link
                  href="/sign-in"
                  onClick={closeMenus}
                  className="rounded-xl border border-emerald-700 px-4 py-3 text-center font-semibold text-emerald-800 transition hover:bg-emerald-50"
                >
                  Login
                </Link>

                <Link
                  href="/sign-up"
                  onClick={closeMenus}
                  className="rounded-xl bg-emerald-700 px-4 py-3 text-center font-semibold text-white transition hover:bg-emerald-800"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Logged In Mobile */}
            {!isPending && user && (
              <div>
                <div className="mb-4 flex items-center gap-3">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <UserRound size={22} />
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate font-bold text-slate-800">
                      {user.name || "BookNook User"}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={closeMenus}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 font-medium text-slate-700 transition hover:bg-emerald-50"
                >
                  <User size={19} />
                  My Profile
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                >
                  <LogOut size={19} />
                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
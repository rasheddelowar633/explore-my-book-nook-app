
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  BookOpen,
  Eye,
  EyeOff,
  Mail,
  Lock,
  UserRound,
  ArrowRight,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function AuthForm({ mode = "login" }) {
  const isSignup = mode === "signup";

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // Sign Up and Sign In
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData
      .get("confirmPassword")
      ?.toString();

    // Confirm Password Validation
    if (isSignup && password !== confirmPassword) {
      setMessageType("error");
      setMessage("Passwords do not match.");
      return;
    }

    // Password Validation
    if (
      isSignup &&
      !/(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)
    ) {
      setMessageType("error");
      setMessage(
        "Password must contain uppercase, lowercase and at least 6 characters."
      );
      return;
    }

    setIsLoading(true);

    try {
      let result;

      if (isSignup) {
        // Create New Account
        result = await authClient.signUp.email({
          name,
          email,
          password,
        });
      } else {
        // Existing User Login
        result = await authClient.signIn.email({
          email,
          password,
        });
      }

      if (result.error) {
        throw new Error(
          result.error.message || "Authentication failed."
        );
      }

      setMessageType("success");

      setMessage(
        isSignup
          ? "Account created successfully!"
          : "Login successful!"
      );

      router.push("/");
      router.refresh();
    } catch (error) {
      setMessageType("error");

      setMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setMessage("");
    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      setMessageType("error");
      setMessage(
        error.message || "Google authentication failed."
      );
      setIsLoading(false);
    }
  };

  // GitHub Login
  const handleGithubLogin = async () => {
    setMessage("");
    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      setMessageType("error");
      setMessage(
        error.message || "GitHub authentication failed."
      );
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-slate-100 px-4 py-12">

      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden flex-col justify-between bg-emerald-700 p-10 text-white md:flex">

          <Link href="/" className="flex items-center gap-3">
            <div className="rounded-xl bg-white p-2 text-emerald-700">
              <BookOpen size={28} />
            </div>

            <span className="text-2xl font-bold">
              BookNook
            </span>
          </Link>

          <div>
            <h1 className="text-4xl font-bold leading-tight">
              Discover Your Next Favorite Book.
            </h1>

            <p className="mt-5 leading-8 text-emerald-100">
              Explore thousands of stories, discover new knowledge and
              make reading a part of your everyday life.
            </p>
          </div>

          <p className="text-sm text-emerald-200">
            © 2026 BookNook. All rights reserved.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-6 sm:p-10 md:p-12">

          <Link
            href="/"
            className="mb-8 flex items-center gap-2 text-xl font-bold text-emerald-700 md:hidden"
          >
            <BookOpen size={27} />
            BookNook
          </Link>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              {isSignup ? "Create Account" : "Welcome Back!"}
            </h2>

            <p className="mt-3 text-slate-500">
              {isSignup
                ? "Join BookNook and start your reading journey."
                : "Sign in to continue your reading journey."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            {isSignup && (
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full Name
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-emerald-500">
                  <UserRound size={19} className="text-slate-400" />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    required
                    autoComplete="name"
                    className="w-full outline-none"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-emerald-500">
                <Mail size={19} className="text-slate-400" />

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="w-full outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-emerald-500">
                <Lock size={19} className="text-slate-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                  autoComplete={
                    isSignup ? "new-password" : "current-password"
                  }
                  pattern={
                    isSignup
                      ? "(?=.*[a-z])(?=.*[A-Z]).{6,}"
                      : undefined
                  }
                  title={
                    isSignup
                      ? "Password must contain uppercase, lowercase and at least 6 characters."
                      : undefined
                  }
                  className="w-full outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-emerald-600"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>

              {isSignup && (
                <p className="mt-2 text-xs text-slate-400">
                  Minimum 6 characters, including uppercase and lowercase letters.
                </p>
              )}
            </div>

            {/* Confirm Password */}
            {isSignup && (
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Confirm Password
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-emerald-500">
                  <Lock size={19} className="text-slate-400" />

                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    className="w-full outline-none"
                  />
                </div>
              </div>
            )}

            {/* Remember Me */}
            {!isSignup && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input
                    type="checkbox"
                    className="accent-emerald-600"
                  />
                  Remember me
                </label>

                <span className="text-slate-400">
                  Forgot password?
                </span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 font-bold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? "Please wait..."
                : isSignup
                  ? "Create Account"
                  : "Sign In"}

              {!isLoading && <ArrowRight size={19} />}
            </button>

            {/* Success / Error Message */}
            {message && (
              <p
                role="status"
                aria-live="polite"
                className={`rounded-lg p-3 text-center text-sm ${
                  messageType === "error"
                    ? "bg-red-50 text-red-600"
                    : "bg-emerald-50 text-emerald-700"
                }`}
              >
                {message}
              </p>
            )}

          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-sm text-slate-400">
              OR
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3 font-semibold text-slate-700 transition hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {/* Google Official Logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-5 w-5"
            >
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 5.8 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5Z"
              />
              <path
                fill="#FF3D00"
                d="m6.3 14.7 6.6 4.8C14.7 15.6 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 5.8 29.3 4 24 4c-7.7 0-14.4 4.3-17.7 10.7Z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.1 0 9.8-1.9 13.3-5.1l-6.1-5.2C29.2 35.2 26.7 36 24 36c-5.3 0-9.8-3.4-11.4-8.1l-6.6 5.1C9.3 39.5 16.1 44 24 44Z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.1 5.2C36.9 39 44 34 44 24c0-1.2-.1-2.3-.4-3.5Z"
              />
            </svg>

            Continue with Google
          </button>

          {/* GitHub Login */}
          <button
            type="button"
            onClick={handleGithubLogin}
            disabled={isLoading}
            className="mt-3 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3 font-semibold text-slate-700 transition hover:bg-slate-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {/* GitHub Official Logo */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current"
            >
              <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
            </svg>

            Continue with GitHub
          </button>

          {/* Switch Login / Signup */}
          <p className="mt-8 text-center text-sm text-slate-500">
            {isSignup
              ? "Already have an account?"
              : "Don't have an account?"}

            <Link
              href={isSignup ? "/sign-in" : "/sign-up"}
              className="ml-2 font-bold text-emerald-600 hover:text-emerald-700"
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </Link>
          </p>

          <p className="mt-6 text-center text-xs text-slate-400">
            By continuing, you agree to BookNook&apos;s Terms and Privacy Policy.
          </p>

        </div>
      </div>
    </main>
  );
}

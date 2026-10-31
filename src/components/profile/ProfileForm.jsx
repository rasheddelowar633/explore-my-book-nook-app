"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRound, Mail, Camera, Save } from "lucide-react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export default function ProfileForm({ user }) {
  const router = useRouter();

  const [name, setName] = useState(user.name || "");
  const [image, setImage] = useState(user.image || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (image.trim()) {
      try {
        new URL(image);
      } catch {
        toast.error("Please enter a valid image URL.");
        return;
      }
    }

    try {
      setLoading(true);

      const { error } = await authClient.updateUser({
        name: name.trim(),
        ...(image.trim() ? { image: image.trim() } : {}),
      });

      if (error) {
        throw new Error(error.message || "Profile update failed");
      }

      toast.success("Profile updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const avatar = image.trim() || user.image;

  return (
    <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 px-6 py-8 text-white sm:px-10">
        <div className="flex flex-col items-center gap-4 sm:flex-row">

          {avatar ? (
            <img
              src={avatar}
              alt={name || "Profile"}
              className="h-24 w-24 rounded-full border-4 border-white/80 object-cover shadow-lg"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/80 bg-white/20">
              <UserRound size={42} />
            </div>
          )}

          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">
              {name || "BookNook User"}
            </h2>
            <p className="mt-1 text-sm text-emerald-100">
              {user.email}
            </p>
            <p className="mt-2 text-xs text-emerald-100">
              BookNook Member
            </p>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-10">

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Full Name
          </label>

          <div className="relative">
            <UserRound
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700"
            />

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700"
            />

            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-slate-500 outline-none"
            />
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Your registered email address.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Profile Picture URL
          </label>

          <div className="relative">
            <Camera
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700"
            />

            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/profile.jpg"
              className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Paste a publicly accessible image URL to change your photo.
          </p>
        </div>

        <div className="flex justify-end border-t border-slate-100 pt-5">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

import { Suspense } from "react";
import { requireAuth } from "@/lib/require-auth";
import ProfileForm from "@/components/profile/ProfileForm";

export const metadata = {
  title: "My Profile | BookNook",
  description: "Manage your BookNook profile.",
};

// Loading UI
function ProfileLoading() {
  return (
    <main className="min-h-screen bg-emerald-50/40 px-4 py-12">
      <div className="mx-auto max-w-4xl animate-pulse">
        <div className="mb-8 h-10 w-48 rounded-lg bg-emerald-100" />
        <div className="h-80 rounded-2xl bg-white shadow-sm" />
      </div>
    </main>
  );
}

// Profile Content
async function ProfileContent() {
  const session = await requireAuth();

  return (
    <main className="min-h-screen bg-emerald-50/40 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-extrabold text-emerald-950">
          My Profile
        </h1>

        <ProfileForm user={session.user} />
      </div>
    </main>
  );
}

// Main Profile Page
export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileLoading />}>
      <ProfileContent />
    </Suspense>
  );
}

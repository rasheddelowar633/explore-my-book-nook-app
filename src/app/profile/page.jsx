import { requireAuth } from "@/lib/require-auth";
import ProfileForm from "@/components/profile/ProfileForm";

export const metadata = {
  title: "My Profile | BookNook",
  description: "Manage your BookNook profile.",
};

export default async function ProfilePage() {
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
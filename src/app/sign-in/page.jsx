
import AuthForm from "@/components/auth/AuthForm";

export const metadata = {
  title: "Sign In | BookNook",
  description: "Sign in to your BookNook account.",
};

export default function SignInPage() {
  return <AuthForm mode="login" />;
}

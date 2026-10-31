
import AuthForm from "@/components/auth/AuthForm";

export const metadata = {
  title: "Sign Up | BookNook",
  description: "Create your BookNook account.",
};

export default function SignUpPage() {
  return <AuthForm mode="signup" />;
}

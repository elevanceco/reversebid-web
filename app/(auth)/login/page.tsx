import { LoginForm } from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | ReverseBid",
  description: "Sign in to your ReverseBid workspace.",
};

export default function LoginPage() {
  return <LoginForm />;
}

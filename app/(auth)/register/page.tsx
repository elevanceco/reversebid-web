import { RegisterForm } from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | ReverseBid",
  description:
    "Create your ReverseBid account to start running sourcing events.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}

import Link from "next/link";
import LogoTextOnly from "../ui/LogoTextOnly";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="ReverseBid Logo"
              width={32}
              height={32}
            />
            <span className="font-bold text-xl tracking-tight">
              <LogoTextOnly />
            </span>
          </div>
          <span className="text-sm text-slate-500">
            © {new Date().getFullYear()} ReverseBid. All rights reserved.
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-600">
          <Link
            href="#how-it-works"
            className="hover:text-slate-900 transition-colors"
          >
            Product
          </Link>
          <Link
            href="#pricing"
            className="hover:text-slate-900 transition-colors"
          >
            Pricing
          </Link>
          <Link href="#faq" className="hover:text-slate-900 transition-colors">
            FAQ
          </Link>
          <Link
            href="/privacy"
            className="hover:text-slate-900 transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-slate-900 transition-colors"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}

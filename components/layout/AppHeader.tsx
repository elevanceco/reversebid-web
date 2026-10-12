"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Menu,
  LayoutDashboard,
  FileText,
  Building2,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LogoTextOnly from "../ui/LogoTextOnly";
import { authClient } from "@/lib/auth/auth-client";

interface AppHeaderProps {
  user: { name: string; email: string; image?: string | null };
  organization: { name: string; slug: string };
  role: string;
}

export function AppHeader({ user, organization, role }: AppHeaderProps) {
  const firstName = user.name?.split(" ")[0] || "there";
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Events", href: "/events", icon: FileText },
    { name: "Suppliers", href: "/suppliers", icon: Building2 },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Mobile Menu (Sheet) */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <button
            type="button"
            className="-m-2.5 p-2.5 text-slate-700 md:hidden hover:bg-slate-100 rounded-md transition-colors"
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-72 p-0 flex flex-col bg-slate-900 text-slate-300 border-r-slate-800"
        >
          <SheetHeader className="hidden">
            <SheetTitle>Mobile Menu</SheetTitle>
          </SheetHeader>

          {/* Branding */}
          <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-800">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 text-white font-bold tracking-tight"
            >
              <Image
                src="/logo.png"
                alt="ReverseBid"
                width={28}
                height={28}
                className="w-7 h-7 rounded"
                priority
              />
              <LogoTextOnly isDarkMode />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 ${isActive ? "text-blue-200" : "text-slate-400"}`}
                  />
                  {item.name}
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t border-slate-800">
              <Link
                href="/settings"
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname.startsWith("/settings")
                    ? "bg-slate-800 text-white"
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Settings className="h-5 w-5 text-slate-400" />
                Settings
              </Link>
            </div>
          </nav>

          {/* Mobile Footer / User Profile */}
          <div className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-3 overflow-hidden mb-4 px-2">
              <div className="flex flex-col items-start truncate">
                <span className="text-sm font-medium text-white truncate w-48 text-left">
                  {organization.name}
                </span>
                <span className="text-xs text-slate-400 truncate w-48 text-left">
                  {user.name} • {role.replace("_", " ")}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-red-400 rounded-md hover:bg-slate-800 hover:text-red-300 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Log out
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Header Content */}
      <div className="flex flex-1 items-center justify-between gap-x-4 lg:gap-x-6 ml-4 md:ml-0">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-slate-900">
            Welcome back, {firstName}
          </h1>
        </div>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
            <Link href="/events/new">Create Event</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

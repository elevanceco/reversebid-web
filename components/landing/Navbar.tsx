"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { authClient } from "@/lib/auth/auth-client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoTextOnly from "../ui/LogoTextOnly";

export default function Navbar() {
  const router = useRouter();

  const { data, isPending } = authClient.useSession();
  const user = data?.user;
  const isLoggedIn = !!user;

  const getInitials = (name?: string) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <Link
        href="#how-it-works"
        className={`text-slate-600 hover:text-slate-900 transition-colors ${
          mobile ? "text-lg py-2" : "text-sm"
        }`}
      >
        How It Works
      </Link>
      <Link
        href="#features"
        className={`text-slate-600 hover:text-slate-900 transition-colors ${
          mobile ? "text-lg py-2" : "text-sm"
        }`}
      >
        Features
      </Link>
      <Link
        href="#pricing"
        className={`text-slate-600 hover:text-slate-900 transition-colors ${
          mobile ? "text-lg py-2" : "text-sm"
        }`}
      >
        Pricing
      </Link>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Side: Logo & Desktop Links */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-xl tracking-tight z-50"
          >
            <Image
              src="/logo.png"
              alt="ReverseBid Logo"
              width={32}
              height={32}
              className="w-8 h-8"
              priority
            />
            <LogoTextOnly />
          </Link>
          <div className="hidden md:flex gap-6 font-medium">
            <NavLinks />
          </div>
        </div>

        {/* Right Side: Desktop Auth & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {isPending ? (
              <div className="h-10 w-10 rounded-full bg-slate-200 animate-pulse" />
            ) : isLoggedIn ? (
              <DropdownMenu>
                {/* 👈 FIX 1: Removed asChild and inner <Button>. Trigger handles the click. */}
                <DropdownMenuTrigger className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950">
                  <Avatar className="h-10 w-10 border border-slate-200 hover:opacity-90 transition-opacity">
                    <AvatarImage src={user?.image || ""} alt={user?.name} />
                    <AvatarFallback className="bg-slate-100 text-slate-900 font-semibold">
                      {getInitials(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.name}
                        </p>
                        <p className="text-xs leading-none text-slate-500">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <Link href="/dashboard">
                    <DropdownMenuItem className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/settings">
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Sign In
                </Link>
                <Link href="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Start Free
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu (Sheet) */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger className="md:hidden -mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950">
                <Menu className="h-6 w-6 text-slate-900" />
                <span className="sr-only">Toggle menu</span>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-75 sm:w-100 flex flex-col pt-12 px-6 h-full"
              >
                <SheetHeader className="hidden">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                {isLoggedIn && user && (
                  <div className="flex items-center gap-3 pb-6 mb-2 border-b border-slate-100">
                    <Avatar className="h-12 w-12 border border-slate-200">
                      <AvatarImage src={user.image || ""} />
                      <AvatarFallback className="bg-slate-100 text-slate-900 font-semibold">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-900">
                        {user.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        {user.email}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2 font-medium mt-4">
                  <NavLinks mobile={true} />
                </div>

                <div className="mt-auto flex flex-col gap-4 pb-8">
                  {isLoggedIn ? (
                    <div className="flex flex-col gap-4 pt-4 border-t border-slate-100">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 text-slate-600 hover:text-slate-900 text-lg"
                      >
                        <LayoutDashboard className="h-5 w-5" /> Dashboard
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-3 text-slate-600 hover:text-slate-900 text-lg"
                      >
                        <Settings className="h-5 w-5" /> Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 text-red-600 text-left text-lg mt-2"
                      >
                        <LogOut className="h-5 w-5" /> Log out
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
                      <Link href="/register" className="w-full">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base">
                          Start Free
                        </Button>
                      </Link>
                      <Link href="/login" className="w-full">
                        <Button
                          variant="outline"
                          className="w-full h-12 text-base border-slate-200 text-slate-700 hover:bg-slate-50"
                        >
                          Sign In
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

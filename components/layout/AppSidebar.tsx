"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Building2,
  Settings,
  LogOut,
  ChevronsUpDown,
} from "lucide-react";
import LogoTextOnly from "../ui/LogoTextOnly";
import { authClient } from "@/lib/auth/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppSidebarProps {
  user: { name: string; email: string; image?: string | null };
  organization: { name: string; slug: string };
  role: string;
}

export function AppSidebar({ user, organization, role }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

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
    <div className="h-full w-64 flex-col bg-slate-900 text-slate-300 border-r border-slate-800 hidden md:flex">
      {/* Branding */}
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-800">
        <Link
          href="/"
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
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
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

      {/* Footer / User Menu */}
      <div className="p-4 border-t border-slate-800">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center justify-between rounded-md p-2 hover:bg-slate-800 transition-colors focus:outline-none">
            <div className="flex items-center gap-3 overflow-hidden">
              <Avatar className="h-9 w-9 border border-slate-700 bg-slate-800">
                <AvatarFallback className="text-xs bg-slate-800 text-white">
                  {user.name?.substring(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start truncate">
                <span className="text-sm font-medium text-white truncate w-32 text-left">
                  {organization.name}
                </span>
                <span className="text-xs text-slate-400 truncate w-32 text-left">
                  {user.name}
                </span>
              </div>
            </div>
            <ChevronsUpDown className="h-4 w-4 text-slate-500 shrink-0" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" side="top">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium text-slate-900">
                    {organization.name}
                  </span>
                  <span className="text-xs text-slate-500 uppercase mt-0.5">
                    {role.replace("_", " ")}
                  </span>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/settings" className="cursor-pointer">
                Account Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

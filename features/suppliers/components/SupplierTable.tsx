"use client";

import { useTransition } from "react";
import Link from "next/link";
import { MoreHorizontal, Eye, Edit, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { archiveSupplier } from "@/features/suppliers/server/archiveSupplier";

type Supplier = {
  id: string;
  legalName: string;
  countryCode: string | null;
  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
};

// Extracted to manage local transition state per row
function SupplierRowActions({ supplierId }: { supplierId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleArchive = () => {
    startTransition(async () => {
      const result = await archiveSupplier(supplierId);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Supplier archived successfully");
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-400 hover:text-slate-600"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MoreHorizontal className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem className="cursor-pointer">
          <Link
            href={`/suppliers/${supplierId}`}
            className="flex w-full items-center"
          >
            <Eye className="mr-2 h-4 w-4 text-slate-500" /> View
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <Link
            href={`/suppliers/${supplierId}/edit`}
            className="flex w-full items-center"
          >
            <Edit className="mr-2 h-4 w-4 text-slate-500" /> Edit
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            handleArchive();
          }}
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          disabled={isPending}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {isPending ? "Archiving..." : "Archive"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SupplierTable({ suppliers }: { suppliers: Supplier[] }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">Supplier</th>
              <th className="px-6 py-4 font-medium">Country</th>
              <th className="px-6 py-4 font-medium">Contact</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {suppliers.map((supplier) => (
              <tr
                key={supplier.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-slate-900">
                  {supplier.legalName}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {supplier.countryCode || "—"}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {supplier.contactName || "—"}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {supplier.contactEmail || "—"}
                </td>
                <td className="px-6 py-4 text-right">
                  <SupplierRowActions supplierId={supplier.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

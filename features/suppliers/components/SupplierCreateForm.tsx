"use client";

import { useState } from "react";
import { createSupplier } from "@/features/suppliers/server/createSupplier";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, User, Globe, FileText } from "lucide-react";
import Link from "next/link";

export function SupplierCreateForm() {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    try {
      await createSupplier(formData);
    } catch (error) {
      console.error(error);
      setIsPending(false);
      // In a production app, trigger a toast notification here
    }
  }

  return (
    <form
      action={handleSubmit}
      className="max-w-2xl bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mt-6"
    >
      <div className="p-6 border-b border-slate-200 bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-slate-400" />
          Company Details
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Add a new vendor to your private directory.
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="legalName"
              className="text-sm font-medium text-slate-900"
            >
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              id="legalName"
              name="legalName"
              type="text"
              required
              placeholder="e.g. Acme Packaging"
              className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="countryCode"
              className="text-sm font-medium text-slate-900 flex items-center gap-2"
            >
              <Globe className="h-4 w-4 text-slate-400" /> Country Code
            </label>
            <input
              id="countryCode"
              name="countryCode"
              type="text"
              placeholder="e.g. US, ID, SG"
              maxLength={2}
              className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent uppercase"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="website"
              className="text-sm font-medium text-slate-900"
            >
              Website
            </label>
            <input
              id="website"
              name="website"
              type="url"
              placeholder="https://..."
              className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* Row 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="contactName"
              className="text-sm font-medium text-slate-900 flex items-center gap-2"
            >
              <User className="h-4 w-4 text-slate-400" /> Contact Name
            </label>
            <input
              id="contactName"
              name="contactName"
              type="text"
              placeholder="Jane Doe"
              className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="contactEmail"
              className="text-sm font-medium text-slate-900"
            >
              Contact Email
            </label>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              placeholder="jane@example.com"
              className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="contactPhone"
              className="text-sm font-medium text-slate-900"
            >
              Phone
            </label>
            <input
              id="contactPhone"
              name="contactPhone"
              type="tel"
              placeholder="+1 234 567 890"
              className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className="space-y-2">
          <label
            htmlFor="notes"
            className="text-sm font-medium text-slate-900 flex items-center gap-2"
          >
            <FileText className="h-4 w-4 text-slate-400" /> Internal Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Additional context about this supplier..."
            className="flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
          />
        </div>
      </div>

      <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
        <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
          <Link href="/suppliers">
            <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
          </Link>
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white min-w-30"
        >
          {isPending ? "Saving..." : "Save Supplier"}
        </Button>
      </div>
    </form>
  );
}

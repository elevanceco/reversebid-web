"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, User, Globe, FileText } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// Extract submit button to hook into useFormStatus
function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-blue-600 hover:bg-blue-700 text-white min-w-30"
    >
      {pending ? "Saving..." : isEdit ? "Save Changes" : "Save Supplier"}
    </Button>
  );
}

type SupplierData = {
  id?: string;
  legalName: string;
  countryCode: string | null;
  website: string | null;
  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  notes: string | null;
};

type SupplierFormProps = {
  supplier?: SupplierData;
  action: (formData: FormData) => Promise<{ error?: string } | void>;
};

export function SupplierForm({ supplier, action }: SupplierFormProps) {
  const isEdit = !!supplier;

  async function clientAction(formData: FormData) {
    const result = await action(formData);
    if (result?.error) {
      toast.error(result.error);
    }
    // Success will trigger Next.js redirect() from the server action
  }

  return (
    <form
      action={clientAction}
      className="max-w-2xl bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mt-6"
    >
      <div className="p-6 border-b border-slate-200 bg-slate-50/50">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-slate-400" />
          {isEdit ? "Edit Company Details" : "Company Details"}
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          {isEdit
            ? "Update vendor information."
            : "Add a new vendor to your private directory."}
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
              defaultValue={supplier?.legalName}
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
              defaultValue={supplier?.countryCode || ""}
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
              defaultValue={supplier?.website || ""}
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
              defaultValue={supplier?.contactName || ""}
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
              defaultValue={supplier?.contactEmail || ""}
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
              defaultValue={supplier?.contactPhone || ""}
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
            defaultValue={supplier?.notes || ""}
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
        <SubmitButton isEdit={isEdit} />
      </div>
    </form>
  );
}

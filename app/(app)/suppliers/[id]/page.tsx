import { resolveOrganizationContext } from "@/features/organizations/server/resolveOrganization";
import { getSupplier } from "@/features/suppliers/server/getSupplier";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Edit,
  Building2,
  Mail,
  Phone,
  User,
  FileText,
} from "lucide-react";

export default async function SupplierDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await resolveOrganizationContext();
  if (context.state !== "RESOLVED" || !context.organization) redirect("/login");

  const supplier = await getSupplier(params.id);

  return (
    <div className="py-2 animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-slate-500 mb-6">
        <Link
          href="/suppliers"
          className="hover:text-slate-900 transition-colors"
        >
          Suppliers
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-slate-400" />
        <span className="text-slate-900 font-medium">{supplier.legalName}</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {supplier.legalName}
            </h1>
            <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
              {supplier.countryCode && (
                <span className="uppercase">{supplier.countryCode}</span>
              )}
              {supplier.countryCode && supplier.website && <span>•</span>}
              {supplier.website && (
                <a
                  href={supplier.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 hover:underline"
                >
                  {supplier.website.replace(/^https?:\/\//, "")}
                </a>
              )}
            </p>
          </div>
        </div>
        <Button variant="outline" className="bg-white">
          <Link
            href={`/suppliers/${supplier.id}/edit`}
            className="flex items-center"
          >
            <Edit className="mr-2 h-4 w-4" /> Edit Supplier
          </Link>
        </Button>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
            Primary Contact
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {supplier.contactName || "No contact name"}
                </p>
                <p className="text-xs text-slate-500">Name</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {supplier.contactEmail ? (
                    <a
                      href={`mailto:${supplier.contactEmail}`}
                      className="hover:text-blue-600 hover:underline"
                    >
                      {supplier.contactEmail}
                    </a>
                  ) : (
                    "—"
                  )}
                </p>
                <p className="text-xs text-slate-500">Email</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-slate-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {supplier.contactPhone || "—"}
                </p>
                <p className="text-xs text-slate-500">Phone</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
            Internal Notes
          </h3>
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-slate-400 shrink-0" />
            <div className="text-sm text-slate-700 whitespace-pre-wrap">
              {supplier.notes || (
                <span className="text-slate-400 italic">
                  No internal notes added.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

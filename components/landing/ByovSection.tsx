import {
  Mail,
  ArrowRight,
  MousePointerClick,
  FileSignature,
} from "lucide-react";
import LogoTextOnly from "../ui/LogoTextOnly";

export default function ByovSection() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Your suppliers don't need another complicated platform.
        </h2>
        <p className="text-lg text-slate-600">
          <LogoTextOnly /> operates on a Bring Your Own Vendors (BYOV) model.
          Invite the suppliers you already trust, without forcing them into a
          public marketplace.
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center text-center max-w-[200px]">
            <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm mb-4">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-slate-900 text-sm">
              1. Email Invitation
            </h4>
            <p className="text-xs text-slate-500 mt-2">
              Supplier receives a secure link directly to your event.
            </p>
          </div>

          <ArrowRight className="text-slate-300 hidden md:block w-8 h-8" />

          <div className="flex flex-col items-center text-center max-w-[200px]">
            <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm mb-4">
              <MousePointerClick className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-slate-900 text-sm">
              2. One-Click Join
            </h4>
            <p className="text-xs text-slate-500 mt-2">
              No bidding fees, no marketplace listing required.
            </p>
          </div>

          <ArrowRight className="text-slate-300 hidden md:block w-8 h-8" />

          <div className="flex flex-col items-center text-center max-w-[200px]">
            <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm mb-4">
              <FileSignature className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-slate-900 text-sm">
              3. Submit Quote
            </h4>
            <p className="text-xs text-slate-500 mt-2">
              Supplier reviews requirements and submits standard bids.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

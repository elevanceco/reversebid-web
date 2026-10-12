import { CheckCircle2, AlertCircle } from "lucide-react";

export default function ResultsShowcase() {
  return (
    <section className="py-24 px-4 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 font-mono text-sm">
            <div className="border-b border-slate-200 pb-4 mb-6">
              <h4 className="font-semibold font-sans text-slate-900 text-base">
                EVENT RESULTS: Packaging Materials Q4
              </h4>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex justify-between">
                <span className="text-slate-500">Initial Best Quote</span>
                <span className="text-slate-900">$54,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Final Best Quote</span>
                <span className="font-bold text-slate-900">$48,500</span>
              </div>
              <div className="flex justify-between bg-emerald-50 p-2 rounded border border-emerald-100">
                <span className="text-emerald-700 font-medium font-sans">
                  Potential Savings
                </span>
                <span className="font-bold text-emerald-700">
                  $5,500 (10.2%)
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-md p-4 opacity-75 bg-slate-50">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-500 font-sans uppercase tracking-wider">
                    Lowest Bidder
                  </span>
                </div>
                <div className="font-semibold text-slate-900 text-base mb-1">
                  Supplier A
                </div>
                <div className="text-slate-500 text-xs">$48,500</div>
              </div>

              <div className="border-2 border-blue-500 bg-blue-50/30 rounded-md p-4 relative">
                <div className="absolute -top-3 -right-3 bg-blue-100 text-blue-700 border border-blue-200 rounded-full p-1">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-blue-700 font-sans uppercase tracking-wider mb-2">
                  Awarded Supplier
                </div>
                <div className="font-semibold text-slate-900 text-base mb-1">
                  Supplier B
                </div>
                <div className="text-slate-700 text-xs mb-3">$48,850</div>
                <div className="text-xs font-sans text-slate-600 bg-white p-2 rounded border border-blue-100">
                  <span className="font-semibold block mb-1">
                    Award Reason:
                  </span>
                  Better lead time and delivery terms.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Lowest price doesn't automatically mean awarded supplier.
          </h2>
          <p className="text-lg text-slate-600 mb-6">
            ReverseBid is a serious procurement software, not just a bidding
            game. Procurement teams retain complete control over the final
            decision.
          </p>
          <ul className="space-y-4 text-slate-700">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span>
                Make award decisions based on price, lead time, and delivery
                terms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span>
                Provide clear, documented justifications for awarding a supplier
                other than the lowest bidder.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span>
                Keep an immutable, audit-ready trail of every sourcing decision.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

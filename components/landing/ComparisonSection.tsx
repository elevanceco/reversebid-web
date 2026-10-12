import { XCircle, CheckCircle2 } from "lucide-react";
import LogoTextOnly from "../ui/LogoTextOnly";

export default function ComparisonSection() {
  const beforeFeatures = [
    "Quotations spread across email and WhatsApp",
    "Manual Excel comparison prone to copy-paste errors",
    "Hard to track negotiation rounds and price drops",
    "No clear event history or audit trail",
    "Supplier submissions in inconsistent formats",
  ];

  const afterFeatures = [
    "One centralized sourcing event dashboard",
    "Automated, standardized digital quotations",
    "Live supplier bidding with tracked history",
    "Exportable, immutable audit-ready results",
    "Consistent formatting across all suppliers",
  ];

  return (
    <section className="py-24 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            From spreadsheet chaos to a structured sourcing process.
          </h2>
          <p className="text-slate-600">
            See the difference when your procurement team stops acting as
            data-entry clerks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <XCircle className="text-red-500 w-6 h-6" /> Before{" "}
              <LogoTextOnly />
            </h3>
            <ul className="space-y-4">
              {beforeFeatures.map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 mt-2"></span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-50 p-8 rounded-xl border border-blue-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <CheckCircle2 className="text-blue-600 w-6 h-6" /> With{" "}
              <LogoTextOnly />
            </h3>
            <ul className="space-y-4">
              {afterFeatures.map((text, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-slate-700 font-medium"
                >
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

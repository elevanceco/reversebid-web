import { FileText, Gavel, Users, ShieldCheck } from "lucide-react";
import LogoTextOnly from "../ui/LogoTextOnly";

export default function FeaturesSection() {
  const features = [
    {
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      title: "Structured RFQs",
      description:
        "Stop rebuilding quotation templates in Excel for every sourcing event. Standardize how you collect requirements and pricing.",
    },
    {
      icon: <Gavel className="w-6 h-6 text-blue-600" />,
      title: "Live Reverse Auctions",
      description:
        "Let suppliers compete in real time with clear bidding rules, automated minimum decrements, and fair extensions.",
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Supplier Invitations",
      description:
        "Invite your existing vendors directly. No public marketplace required, and suppliers never pay to submit a quote.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: "Audit-Ready Results",
      description:
        "Keep every bid, participation record, and award decision in an immutable, server-timestamped history.",
    },
  ];

  return (
    <section
      id="features"
      className="py-24 px-4 bg-slate-50 border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Everything you need to run a professional sourcing event.
          </h2>
          <p className="text-slate-600">
            <LogoTextOnly /> is designed to be more structured than Excel, but
            much easier to deploy than enterprise procurement software.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

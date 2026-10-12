"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Do suppliers need to pay?",
      a: "No. Suppliers can participate in private ReverseBid sourcing events completely for free. We do not charge marketplace listing fees or take a percentage of the winning bid.",
    },
    {
      q: "Do I need to move my entire supplier database?",
      a: "No. ReverseBid uses a Bring Your Own Vendors (BYOV) model. You simply invite the specific suppliers you want for each event via their email address.",
    },
    {
      q: "Does ReverseBid automatically award the cheapest supplier?",
      a: "No. Procurement teams retain complete control over the final supplier award. You can award a higher bidder if they offer better lead times, quality, or commercial terms.",
    },
    {
      q: "Can I run a normal RFQ without a live auction?",
      a: "Yes. Reverse auctions are completely optional. You can run standard RFQs where suppliers simply submit their best quotation by a specific deadline.",
    },
    {
      q: "Can suppliers see each other's identities?",
      a: "No. Supplier visibility is strictly controlled. By default, a supplier can only see their own bid, their current rank, and the current lowest price, but never competitor company names.",
    },
    {
      q: "Does ReverseBid handle supplier payments or purchase orders?",
      a: "No. ReverseBid currently focuses exclusively on optimizing the sourcing, quotation, and bidding process. Once a supplier is awarded, you generate POs and process payments through your existing systems.",
    },
  ];

  return (
    <section id="faq" className="py-24 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border border-slate-200 rounded-lg bg-white overflow-hidden"
          >
            <button
              className="w-full text-left px-6 py-4 font-semibold text-slate-900 flex justify-between items-center hover:bg-slate-50 transition-colors"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              {faq.q}
              <ChevronDown
                className={`w-5 h-5 text-slate-400 transition-transform ${openIdx === idx ? "rotate-180" : ""}`}
              />
            </button>
            {openIdx === idx && (
              <div className="px-6 pb-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

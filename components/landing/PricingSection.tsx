export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Simple, transparent pricing.
          </h2>
          <p className="text-slate-400">
            Suppliers always participate for free. You only pay for what you
            use.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 flex flex-col">
            <h3 className="text-xl font-semibold mb-2">Free</h3>
            <p className="text-slate-400 text-sm mb-6">
              Test the platform with a real sourcing event.
            </p>
            <div className="text-4xl font-bold mb-8">$0</div>
            <ul className="space-y-4 mb-8 text-sm text-slate-300 flex-1">
              <li>✓ 1 Active sourcing event</li>
              <li>✓ Unlimited suppliers</li>
              <li>✓ Standard RFQ capabilities</li>
            </ul>
            <button className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-md transition-colors font-medium">
              Start Free
            </button>
          </div>

          {/* Pay Per Event */}
          <div className="bg-blue-600 border border-blue-500 rounded-xl p-8 flex flex-col shadow-xl transform md:-translate-y-4">
            <h3 className="text-xl font-semibold mb-2">Pay Per Event</h3>
            <p className="text-blue-200 text-sm mb-6">
              For occasional procurement needs.
            </p>
            <div className="text-4xl font-bold mb-2">$25</div>
            <div className="text-blue-200 text-sm mb-6">per event</div>
            <ul className="space-y-4 mb-8 text-sm text-blue-50 flex-1">
              <li>✓ Everything in Free</li>
              <li>✓ Live Reverse Auctions</li>
              <li>✓ Exportable audit history</li>
              <li>✓ Pay as you go</li>
            </ul>
            <button className="w-full bg-white text-blue-700 hover:bg-blue-50 py-2 rounded-md transition-colors font-bold">
              Get Started
            </button>
          </div>

          {/* Team */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 flex flex-col">
            <h3 className="text-xl font-semibold mb-2">Team</h3>
            <p className="text-slate-400 text-sm mb-6">
              For recurring procurement teams.
            </p>
            <div className="text-4xl font-bold mb-2">$99</div>
            <div className="text-slate-400 text-sm mb-6">per month</div>
            <ul className="space-y-4 mb-8 text-sm text-slate-300 flex-1">
              <li>✓ Unlimited sourcing events</li>
              <li>✓ Team access & roles</li>
              <li>✓ Advanced bidding rules</li>
              <li>✓ Priority support</li>
            </ul>
            <button className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-md transition-colors font-medium">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Clock, TrendingDown } from "lucide-react";

export default function AuctionShowcase() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-6">
          Turn negotiation rounds into a live, structured competition.
        </h2>
        <p className="text-lg text-slate-600 mb-8">
          Stop making endless phone calls to negotiate. Run an optional live
          reverse auction where suppliers compete securely in real time.
        </p>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="mt-1 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <TrendingDown className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Minimum Next Bid</h4>
              <p className="text-sm text-slate-600 mt-1">
                Automatically enforce price drops so suppliers must submit
                genuinely competitive offers to take the lead.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mt-1 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">
                Anti-Sniping (Soft Close)
              </h4>
              <p className="text-sm text-slate-600 mt-1">
                Last-minute bids automatically extend the auction clock, giving
                every supplier a fair chance to respond to late price drops.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Auction UI Mockup */}
      <div className="bg-slate-900 rounded-xl p-4 sm:p-6 shadow-2xl font-mono text-sm select-none border border-slate-800">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-700">
          <div>
            <div className="font-semibold text-white font-sans">
              Corporate Laptops FY26
            </div>
            <div className="text-red-400 text-xs mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Ends in 00:01:45
            </div>
          </div>
          <div className="text-right">
            <div className="text-slate-400 text-xs mb-1">Current Best Bid</div>
            <div className="text-xl font-bold text-emerald-400">$112,000</div>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-md overflow-hidden">
          <table className="w-full text-left text-slate-300">
            <thead className="bg-slate-800/50 border-b border-slate-700 text-xs text-slate-400">
              <tr>
                <th className="p-3 font-medium">Rank</th>
                <th className="p-3 font-medium">Supplier</th>
                <th className="p-3 font-medium text-right">Latest Bid</th>
                <th className="p-3 font-medium text-right">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-700 bg-blue-900/20">
                <td className="p-3 font-bold text-white">#1</td>
                <td className="p-3 text-white">Supplier C</td>
                <td className="p-3 font-bold text-white text-right">
                  $112,000
                </td>
                <td className="p-3 text-slate-400 text-right text-xs">
                  12s ago
                </td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="p-3">#2</td>
                <td className="p-3">Supplier A</td>
                <td className="p-3 text-right">$113,500</td>
                <td className="p-3 text-slate-400 text-right text-xs">
                  1m ago
                </td>
              </tr>
              <tr>
                <td className="p-3">#3</td>
                <td className="p-3">Supplier B</td>
                <td className="p-3 text-right">$115,000</td>
                <td className="p-3 text-slate-400 text-right text-xs">
                  4m ago
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 bg-slate-800 border border-slate-700 rounded p-3 text-xs text-slate-400 flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-500" />
          Auction was extended by 2 minutes due to a late bid.
        </div>
      </div>
    </section>
  );
}

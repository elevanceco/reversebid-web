"use client";

import { motion, Variants } from "framer-motion";

interface ProductMockupProps {
  variants?: Variants;
}

export function ProductMockup({ variants }: ProductMockupProps) {
  return (
    <motion.div
      variants={variants}
      className="w-full max-w-4xl perspective-[2000px]"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-blue-900/20 p-4 sm:p-6 font-mono text-sm select-none overflow-hidden relative"
      >
        {/* Glossy top reflection */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none"></div>

        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800 relative z-10">
          <div className="flex gap-2 mb-4 absolute -top-2 -left-2 sm:-top-2 sm:left-0">
            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16">
            <div className="font-semibold text-slate-200 font-sans text-base">
              Packaging Materials Q4
            </div>
            <div className="text-slate-400 text-xs mt-1">Ends in 01:42:16</div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-md border border-emerald-400/20 mt-4 sm:mt-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            LIVE
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
          <div className="bg-slate-800/50 p-4 border border-slate-700/50 rounded-xl">
            <div className="text-slate-400 text-xs mb-1 uppercase tracking-wider">
              Current Best
            </div>
            <div className="text-2xl font-bold text-white">$48,500</div>
          </div>
          <div className="bg-slate-800/50 p-4 border border-slate-700/50 rounded-xl">
            <div className="text-slate-400 text-xs mb-1 uppercase tracking-wider">
              Potential Savings
            </div>
            <div className="text-2xl font-bold text-blue-400">8.7%</div>
          </div>
        </div>

        <div className="bg-slate-950/50 border border-slate-800 rounded-xl overflow-hidden relative z-10">
          <table className="w-full text-left">
            <thead className="bg-slate-900 border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider">
              <tr>
                <th className="p-4 font-medium">Rank</th>
                <th className="p-4 font-medium">Supplier</th>
                <th className="p-4 font-medium">Latest Bid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              <tr className="bg-blue-900/20 relative">
                <td className="p-4 font-bold text-blue-400">#1</td>
                <td className="p-4 text-slate-200">Supplier A</td>
                <td className="p-4 font-bold text-white">$48,500</td>
                {/* Highlight indicator for leader */}
                <td className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4 text-slate-500">#2</td>
                <td className="p-4 text-slate-300">Supplier B</td>
                <td className="p-4 text-slate-400">$48,850</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4 text-slate-500">#3</td>
                <td className="p-4 text-slate-300">Supplier C</td>
                <td className="p-4 text-slate-400">$49,300</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}

"use client";

import { motion, Variants } from "framer-motion";
import { FileSpreadsheet, Mail, MessageSquare } from "lucide-react";

export default function ProblemSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  const plusVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
  };

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-16 tracking-tight"
        >
          Still managing supplier quotes like this?
        </motion.h2>

        {/* Supplier Cards Flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 mb-16"
        >
          {/* Card 1 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm w-full md:w-56 h-44 flex flex-col items-center justify-center gap-4 transition-shadow hover:shadow-md cursor-default"
          >
            <MessageSquare
              className="text-green-500 w-10 h-10"
              strokeWidth={1.5}
            />
            <div className="text-center">
              <div className="text-slate-800 font-semibold mb-1">
                Supplier A
              </div>
              <div className="text-sm text-slate-500">WhatsApp message</div>
            </div>
          </motion.div>

          {/* Plus Sign */}
          <motion.div
            variants={plusVariants}
            className="text-slate-300 font-light text-4xl hidden md:block"
          >
            +
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm w-full md:w-56 h-44 flex flex-col items-center justify-center gap-4 transition-shadow hover:shadow-md cursor-default"
          >
            <Mail className="text-blue-500 w-10 h-10" strokeWidth={1.5} />
            <div className="text-center">
              <div className="text-slate-800 font-semibold mb-1">
                Supplier B
              </div>
              <div className="text-sm text-slate-500">Email attachment</div>
            </div>
          </motion.div>

          {/* Plus Sign */}
          <motion.div
            variants={plusVariants}
            className="text-slate-300 font-light text-4xl hidden md:block"
          >
            +
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm w-full md:w-56 h-44 flex flex-col items-center justify-center gap-4 transition-shadow hover:shadow-md cursor-default"
          >
            <FileSpreadsheet
              className="text-emerald-600 w-10 h-10"
              strokeWidth={1.5}
            />
            <div className="text-center">
              <div className="text-slate-800 font-semibold mb-1">
                Supplier C
              </div>
              <div className="text-sm text-slate-500">Custom Excel file</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Resolution Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            delay: 0.6,
            duration: 0.7,
            type: "spring",
            stiffness: 70,
          }}
          className="bg-slate-900 text-white p-8 md:p-10 rounded-2xl max-w-3xl mx-auto shadow-xl"
        >
          <p className="font-medium text-lg md:text-xl mb-3 tracking-wide">
            Procurement manually compares everything in Excel.
          </p>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            ReverseBid brings the entire sourcing process into one structured
            place.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { ProductMockup } from "../ui/ProductMockup";

// The coordinated background light trails
const AnimatedBackground = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  // Pre-calculated sweeping paths to look random yet deliberate
  const paths = [
    "M-10% 20% C 30% 10%, 60% 40%, 110% 20%",
    "M-10% 60% C 20% 80%, 70% 30%, 110% 50%",
    "M110% 70% C 80% 90%, 30% 50%, -10% 80%",
    "M20% -10% C 40% 30%, 30% 70%, 10% 110%",
    "M80% -10% C 60% 40%, 90% 80%, 70% 110%",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-slate-950">
      <svg className="absolute w-full h-full">
        <defs>
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient
            id="glowGradientAlt"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {paths.map((path, i) => (
          <motion.path
            key={i}
            d={path}
            fill="transparent"
            stroke={
              i % 2 === 0 ? "url(#glowGradient)" : "url(#glowGradientAlt)"
            }
            strokeWidth={i % 2 === 0 ? "2" : "1"}
            initial={{ pathLength: 0, opacity: 0, pathOffset: 0 }}
            animate={{
              pathLength: [0, 0.5, 0.5, 0],
              opacity: [0, 1, 1, 0],
              pathOffset: [0, 0, 0.5, 1],
            }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.2,
            }}
          />
        ))}
      </svg>
      {/* Radial gradient overlay to fade the edges and focus the center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/80 to-slate-950"></div>
    </div>
  );
};

export default function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
      <AnimatedBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto"
      >
        {/* Text Content */}
        <div className="max-w-4xl text-center mb-16">
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-8"
          >
            Run supplier RFQs without the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              spreadsheet chaos.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            Invite suppliers, collect quotations, run reverse auctions, compare
            offers, and award vendors—all in one structured sourcing workflow.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-500 transition-colors w-full sm:w-auto shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
              Start Free Trial
            </button>
            <button className="border border-slate-700 bg-slate-900/50 backdrop-blur-sm text-slate-300 px-8 py-4 rounded-lg font-semibold hover:bg-slate-800 transition-colors w-full sm:w-auto">
              See How It Works
            </button>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-sm text-slate-500 mt-6"
          >
            No credit card required.
          </motion.p>
        </div>

        {/* Product UI Mockup */}
        <ProductMockup variants={itemVariants} />
      </motion.div>
    </section>
  );
}

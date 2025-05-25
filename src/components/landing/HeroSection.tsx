import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, BarChart2, Sparkles } from 'lucide-react';
import Link from 'next/link';

// Define variants if they are not imported
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const LOGO_TEXT = "TweetForge"; // Our product name

function HeroSection() {
  return (
    <motion.section
      className="min-h-screen pt-32 pb-16 md:pt-24 md:pb-12 flex items-center bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Animated background shapes (decorative) */}
      <div className="absolute inset-0 opacity-10"> {/* Low opacity for background elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-sky-500 rounded-full filter blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600 rounded-full filter blur-3xl"
          animate={{ scale: [1, 1.1, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
        ></motion.div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6">
          Automate Your <span className="text-sky-400">Twitter</span>, <br className="hidden md:block" />Amplify Your Reach.
        </motion.h1>
        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
          {LOGO_TEXT} helps developers and solopreneurs schedule engaging content, analyze performance, and grow their audience on Twitter effortlessly.
        </motion.p>
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16 md:mb-20"> {/* Increased bottom margin */}
          {/* <input
            type="email"
            placeholder="Enter your email"
            className="py-3 px-5 rounded-lg bg-slate-800/60 border border-slate-700 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none w-full sm:w-auto sm:max-w-xs placeholder-slate-400"
          /> */}
          <Link href="/login"> 
          <button  className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg text-lg w-full sm:w-auto">
            Get Started Now
          </button>
          </Link>
        </motion.div>

        {/* --- IMPROVED FEATURE HIGHLIGHTS / "EXTRA ELEMENTS AT BOTTOM" --- */}
        <motion.div variants={fadeInUp} className="text-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-6 max-w-3xl mx-auto text-slate-200">
            <div className="flex items-center justify-center sm:justify-start bg-slate-800/40 p-3 rounded-lg shadow-md">
              <CheckCircle size={20} className="mr-2.5 text-green-400 flex-shrink-0" />
              <span className="text-sm">Instant Thread Scheduling</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start bg-slate-800/40 p-3 rounded-lg shadow-md">
              <BarChart2 size={20} className="mr-2.5 text-sky-400 flex-shrink-0" />
              <span className="text-sm">In-Depth Analytics</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start bg-slate-800/40 p-3 rounded-lg shadow-md">
              <Sparkles size={20} className="mr-2.5 text-purple-400 flex-shrink-0" />
              <span className="text-sm">AI-Powered Suggestions</span>
            </div>
          </div>
          <motion.p variants={fadeInUp} className="mt-6 text-xs text-slate-400">
            Join thousands of developers. Get started free — no credit card required for basic plan.
          </motion.p>
        </motion.div>
        {/* --- END OF IMPROVED FEATURE HIGHLIGHTS --- */}

      </div>

      {/* --- IMPROVED DECORATIVE CIRCULAR UI ELEMENT --- */}
      {/* This element is positioned to be partially off-screen or in the lower-right, behind text content or with enough opacity. */}
      <motion.div
        variants={fadeInUp} // It can use the same fadeInUp or a custom variant
        className="absolute -right-16 -bottom-16 md:right-5 md:bottom-5 lg:right-10 lg:bottom-10 w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] pointer-events-none"
        // Pointer-events-none so it doesn't interfere with text selection
      >
        <div className="relative w-full h-full opacity-20 md:opacity-30 lg:opacity-35"> {/* Opacity on inner container */}
          {/* Outermost ring - subtle, pulsing */}
          <div className="absolute inset-0 rounded-full border-2 border-sky-400/30 animate-pulse"></div>
          {/* Second ring - slightly more prominent */}
          <div className="absolute inset-[12%] rounded-full border-2 border-sky-500/40"></div>
          {/* Third ring - different color, pulsing */}
          <div
            className="absolute inset-[24%] rounded-full border-2 border-purple-500/50 animate-pulse"
            style={{animationDelay: '0.5s', animationDuration: '2.5s'}}
          ></div>
          {/* Innermost circle with icon - core visual */}
          <div className="absolute inset-[36%] rounded-full bg-gradient-to-br from-sky-600/60 via-purple-600/40 to-indigo-700/60 flex items-center justify-center shadow-2xl">
            <CheckCircle // Or your preferred central icon, e.g., Twitter icon if more brand-aligned
              className="w-1/3 h-1/3 text-white/90"
            />
          </div>
          {/* Small floating decorative elements (simplified) */}
          <motion.div
            className="absolute top-[15%] left-[20%] w-3 h-3 md:w-4 md:h-4 bg-white/40 rounded-full"
            animate={{ y: [0, -6, 0], x: [0, 3, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            className="absolute bottom-[20%] right-[15%] w-4 h-4 md:w-5 md:h-5 bg-white/40 rounded-full"
            animate={{ y: [0, 6, 0], x: [0, -3, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
          ></motion.div>
          <motion.div
            className="absolute top-[50%] left-[5%] w-2 h-2 md:w-3 md:h-3 bg-purple-400/50 rounded-full"
            animate={{ y: [0, 4, -4, 0], x: [0, 5, -2, 0], scale: [1, 1.2, 0.8, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1.2 }}
          ></motion.div>
        </div>
      </motion.div>
      {/* --- END OF DECORATIVE CIRCULAR UI ELEMENT --- */}

    </motion.section>
  );
}

export default HeroSection; 
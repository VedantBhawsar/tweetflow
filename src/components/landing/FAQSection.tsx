// app/page.tsx
"use client";

import React, {useState, useEffect} from 'react';
import {AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { BarChart2, CheckCircle, ChevronDown, ChevronUp, Code, Edit3, DollarSign, Activity, Settings, Zap, UserCheck, Menu, Sparkles, Twitter, X, ThumbsUp, Send, Layers } from 'lucide-react';


export default function FAQItem({ q, a }: { q: string, a: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
      <motion.div className="bg-slate-800 rounded-lg shadow-md overflow-hidden border border-slate-700 hover:border-slate-600 transition-colors">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-between items-center text-left p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-lg"
            aria-expanded={isOpen}
            aria-controls={`faq-answer-${q.replace(/\s+/g, '-')}`}
        >
          <span className="text-base md:text-lg font-medium text-white">{q}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-sky-400' : 'text-slate-400'}`} />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.section
              id={`faq-answer-${q.replace(/\s+/g, '-')}`}
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto", marginTop: '0px' },
                collapsed: { opacity: 0, height: 0, marginTop: '0px' }
              }}
              transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }} // Smooth cubic bezier
              className="overflow-hidden" // Crucial for height animation
            >
              <div className="px-5 pb-5 pt-2 text-slate-300 text-sm leading-relaxed">
                {a}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </motion.div>
  )
}
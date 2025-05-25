// UseCasesSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Code, PenTool, Send, Users } from 'lucide-react'; // Added more icons
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2, 
    },
  },
};

const LOGO_TEXT = "TweetForge";

const useCasesData = [
  {
    icon: Code,
    iconColor: "text-sky-400",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/20",
    title: "Developers Sharing Knowledge",
    description: "Schedule beautifully formatted code snippets, tech insights, and tutorial threads. Engage with the dev community consistently without daily manual effort, and track which content resonates most.",
    imagePlaceholder: ( 
      <div className="w-full h-full bg-slate-700 rounded-lg flex items-center justify-center p-4">
        <Code size={64} className="text-sky-400 opacity-50" />
      </div>
    )
  },
  {
    icon: Send,
    iconColor: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    title: "Solopreneurs Building in Public",
    description: "Automate progress updates, new feature announcements, and user engagement. Focus on building your product while {LOGO_TEXT} ensures your journey is shared consistently and effectively, growing your audience.",
    imagePlaceholder: (
      <div className="w-full h-full bg-slate-700 rounded-lg flex items-center justify-center p-4">
        <Send size={64} className="text-purple-400 opacity-50" />
      </div>
    )
  },
  {
    icon: PenTool,
    iconColor: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/20",
    title: "Content Creators & Educators",
    description: "Distribute your educational content, promote articles, videos, or courses with a planned content calendar. Nurture an engaged audience with timely and valuable information, automated by {LOGO_TEXT}.",
    imagePlaceholder: (
      <div className="w-full h-full bg-slate-700 rounded-lg flex items-center justify-center p-4">
        <PenTool size={64} className="text-indigo-400 opacity-50" />
      </div>
    )
  },
   { // Example of another use case
    icon: Users,
    iconColor: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    title: "Community Managers & Agencies",
    description: "Manage multiple client accounts, schedule consistent brand messaging, and analyze cross-account performance. Streamline client reporting and maintain active community engagement.",
    imagePlaceholder: (
      <div className="w-full h-full bg-slate-700 rounded-lg flex items-center justify-center p-4">
        <Users size={64} className="text-green-400 opacity-50" />
      </div>
    )
  },
];


function UseCasesSection() {
  return (
    <motion.section
      id="use-cases"
      className="py-16 md:py-24 bg-gradient-to-b from-slate-900 via-slate-900 to-purple-900/30 text-white relative overflow-hidden"
      // Changed gradient for variety
    >
      {/* Decorative background elements - more subtle */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500 rounded-full filter blur-[150px]"
          animate={{ x: [-50, 50, -50], y: [-30, 30, -30] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600 rounded-full filter blur-[120px]"
          animate={{ x: [50, -50, 50], y: [30, -30, 30] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: 5 }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div variants={fadeInUp} className="text-center mb-12 md:mb-16">
            <p className="text-sky-400 font-semibold mb-2 text-sm uppercase tracking-wider">
            Who Benefits?
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Powering Diverse Twitter Strategies
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            {LOGO_TEXT} is a versatile tool for anyone looking to enhance their Twitter presence, from individual creators to growing businesses.
            </p>
        </motion.div>
        
        <motion.div className="space-y-16 md:space-y-24" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.1 }}>
          {useCasesData.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              variants={fadeInUp} 
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 p-6 md:p-8 rounded-2xl bg-slate-800/50 border ${useCase.borderColor} shadow-xl backdrop-blur-md hover:shadow-purple-500/10 transition-all duration-300 ease-out
                         ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`} 
            >
              <div className="md:w-1/2 lg:w-[55%] text-center md:text-left">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${useCase.bgColor} ${useCase.iconColor}`}>
                  <useCase.icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                  {useCase.title}
                </h3>
                <p className="text-slate-300 text-base lg:text-lg leading-relaxed mb-6">
                  {useCase.description.replace('{LOGO_TEXT}', LOGO_TEXT)}
                </p>
                <a 
                    href="#pricing"
                    className="inline-flex items-center text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors group"
                >
                  Learn How It Helps
                  <span className="ml-1.5 transform transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                </a>
              </div>

              <div className="md:w-1/2 lg:w-[45%] w-full aspect-video md:aspect-square rounded-xl overflow-hidden shadow-lg border-2 border-slate-700/50">
                {useCase.imagePlaceholder}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-16 md:mt-20 text-center">
            <Link href="#features" className="bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white font-semibold py-3.5 px-10 rounded-lg transition-all duration-300 shadow-xl hover:shadow-purple-500/30 text-base md:text-lg">
                See All Features
            </Link>
        </motion.div>

      </div>
    </motion.section>
  );
}

export default UseCasesSection;
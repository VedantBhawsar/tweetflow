import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

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

function AboutSection() {
  return (
    <motion.section
      id="about"
      className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-sky-500 rounded-full filter blur-[100px] opacity-10"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full filter blur-[100px] opacity-10"
          animate={{ scale: [1, 1.1, 1], rotate: [0, -45, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.p variants={fadeInUp} className="text-center text-sky-400 font-semibold mb-2">About Us</motion.p>
        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
          Built for Smarter Twitter Workflows
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-center text-slate-300 mb-12 max-w-2xl mx-auto">
          Our cutting-edge Twitter automation platform is designed to simplify complex workflows, boost productivity, and drive innovation for developers and solopreneurs.
        </motion.p>
        
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div 
            variants={fadeInUp}
            className="relative"
          >
            {/* Analytics UI mockup with gradient overlay */}
            <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl p-1 shadow-2xl">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-8 backdrop-blur-xl">
                <div className="space-y-4">
                  {/* Mock analytics UI elements */}
                  <div className="h-2 bg-sky-400/20 rounded-full w-3/4" />
                  <div className="h-2 bg-purple-400/20 rounded-full w-1/2" />
                  <div className="h-2 bg-sky-400/20 rounded-full w-5/6" />
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="h-28 bg-sky-400/10 rounded-lg" />
                    <div className="h-28 bg-purple-400/10 rounded-lg" />
                    <div className="h-28 bg-sky-400/10 rounded-lg" />
                  </div>
                  <div className='mt-6'>
                    <div className="h-40 bg-sky-400/10 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 bg-sky-500/10 rounded-full"
              animate={{ y: [-10, 10, -10], rotate: [0, 45, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500/10 rounded-full"
              animate={{ y: [10, -10, 10], rotate: [0, -45, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6">
            {/* <h3 className="text-2xl font-semibold text-white mb-4">Our Story, Your Automation Partner</h3> */}
            {[
              { 
                title: "Vision",
                text: "To empower every developer and solopreneur with the tools to master Twitter automation and amplify their voice effectively.",
                color: "from-sky-900/50 to-sky-800/50",
                bgColor: "bg-sky-400/10"
              },
              { 
                title: "Mission",
                text: "Provide an intuitive, powerful, and reliable Twitter scheduling and analytics platform that saves time and delivers results.",
                color: "from-purple-900/50 to-purple-800/50",
                bgColor: "bg-purple-400/10"
              },
              { 
                title: "Values",
                text: "Simplicity, Power, Developer-First, Data-Driven Insights, Continuous Improvement.",
                color: "from-indigo-900/50 to-indigo-800/50",
                bgColor: "bg-indigo-400/10"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`${item.bgColor} backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-white/5`}
              >
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-sky-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sky-400 text-lg mb-2">{item.title}</h4>
                    <p className="text-slate-300 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default AboutSection; 
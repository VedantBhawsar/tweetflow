import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
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

function TrustedBySection() {
  const companies = [
    { 
      name: "GitHub", 
      logo: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      )
    },
    { 
      name: "Vercel", 
      logo: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M24 22.525H0l12-21.05 12 21.05z" />
        </svg>
      )
    },
    { 
      name: "Netlify", 
      logo: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
          <path d="M16.934 8.519a1.044 1.044 0 0 1 .303.23l2.349-1.045-2.192-2.171-.491 2.954zM12.06 6.546a1.305 1.305 0 0 1 .209.574l3.497 1.482a1.044 1.044 0 0 1 .355-.177l.574-3.55-2.13-2.234-2.505 3.852v.053zm11.933 5.491l-3.748-3.748-2.548 1.044 6.264 2.662s.053.042.032.042zm-.627.606l-6.013-2.569a1.044 1.044 0 0 1-.7.407l-.647 3.957a1.044 1.044 0 0 1 .303.731l3.633.762 3.33-3.31v-.062zM15.4 9.25L12.132 7.86a1.2 1.2 0 0 1-1.044.543h-.199L8.185 12.58l7.225-3.132v.01a.887.887 0 0 1 0-.167.052.052 0 0 0-.01-.041zm3.967 7.308l-3.195-.658a1.096 1.096 0 0 1-.46.344l-.761 4.72 4.437-4.396s-.01.02-.021.02zm-4.469-.324a1.044 1.044 0 0 1-.616-.71l-.657-3.816a.933.933 0 0 1-.167-.115l-7.129 3.09c.031.052.031.115.031.188a1.044 1.044 0 0 1-.367.731l2.349 2.336 6.607-1.346-.051-.02zm-3.086-6.628a1.044 1.044 0 0 1-.73-.407l-2.39 3.79 3.155-3.352-.035-.031zM11.46 10.87a1.044 1.044 0 0 1-.657-.135l-2.296 3.622 3.132-3.132-.18-.355zm-2.962 5.744a1.044 1.044 0 0 1-.135-.543l-2.203-2.203L4.01 18.51l4.437-1.896zm-3.6 1.284L2.38 19.066l4.437-4.437-.367.365-1.95 2.234zm1.827 1.033l2.234-1.106-2.084-2.068-.15 3.174z" />
        </svg>
      )
    },
    { 
      name: "Next.js", 
      logo: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
        </svg>
      )
    },
    { 
      name: "React", 
      logo: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M12 13.5V10" />
          <path d="M12 21.26c6.07 0 11-2.35 11-5.26s-4.93-5.26-11-5.26S1 12.09 1 16s4.93 5.26 11 5.26Z" />
          <path d="M8.4 19.3c-1 1.4-2 2-2.4 1.8-.63-.25-.4-2.08.6-4.3.37-.83.8-1.7 1.3-2.6" />
          <path d="M15.7 19.3c1 1.4 2 2 2.4 1.8.63-.25.4-2.08-.6-4.3-.37-.83-.8-1.7-1.3-2.6" />
          <path d="M8.4 12.7c-1-1.4-2-2-2.4-1.8-.63.25-.4 2.08.6 4.3.37.83.8 1.7 1.3 2.6" />
          <path d="M15.7 12.7c1-1.4 2-2 2.4-1.8.63.25.4 2.08-.6 4.3-.37.83-.8 1.7-1.3 2.6" />
          <path d="M12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
          <path d="M12 9c5.04 0 9.13-1.88 9.13-4.2S17.04.6 12 .6 2.87 2.48 2.87 4.8 6.96 9 12 9Z" />
          <path d="M12 9v4.5" />
        </svg>
      )
    },
  ];

  return (
    <motion.section
      className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 left-1/4 w-64 h-64 bg-sky-500 rounded-full filter blur-[100px] opacity-20"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full filter blur-[100px] opacity-20"
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.h3 
          variants={fadeInUp} 
          className="text-center text-sky-400 font-semibold mb-4 uppercase tracking-wider text-sm"
        >
          Trusted by Developers & Solopreneurs Worldwide
        </motion.h3>
        
        <motion.div 
          variants={fadeInUp} 
          className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center max-w-5xl mx-auto mt-12"
        >
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 aspect-video flex items-center justify-center group hover:scale-105 transition-transform duration-300 border border-slate-700 hover:border-sky-600"
            >
              <div className="flex flex-col items-center justify-center">
                <div className="text-white group-hover:text-sky-400 transition-colors duration-300">
                  {company.logo()}
                </div>
                <span className="mt-2 text-sm font-medium text-slate-400 group-hover:text-sky-400 transition-colors duration-300">
                  {company.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto"
        >
          {[
            { value: 10000, suffix: "+", label: "Active Users", duration: 2 },
            { value: 1000000, suffix: "+", label: "Tweets Scheduled", duration: 2.5 },
            { value: 99.9, suffix: "%", label: "Uptime", duration: 1.5 },
          ].map((stat, index) => (
            <CountingNumber
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={0.2 + index * 0.1}
              duration={stat.duration}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

// Counting number component with animation
interface CountingNumberProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  duration: number;
}

function CountingNumber({ value, suffix, label, delay, duration }: CountingNumberProps) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      
      // Start counting animation
      let startValue = 0;
      const increment = value / (duration * 60); // 60fps animation
      const timer = setInterval(() => {
        startValue += increment;
        if (startValue >= value) {
          clearInterval(timer);
          setCount(value);
        } else {
          setCount(Math.floor(startValue));
        }
      }, 16); // ~60fps
      
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration, controls]);
  
  // Format the number for display
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toFixed(1).replace(/\.0$/, '');
  };
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } }
      }}
      className="text-center"
    >
      <div className="text-4xl font-bold bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent mb-2">
        {formatNumber(count)}{suffix}
      </div>
      <div className="text-slate-400">{label}</div>
    </motion.div>
  );
}

export default TrustedBySection; 
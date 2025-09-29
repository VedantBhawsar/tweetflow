import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-[#6E00FF] to-[#00D4FF] rounded-2xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold">Start Growing Your Twitter with Smart Automation Today</h2>
            <p className="mt-4 max-w-2xl mx-auto">
              Join thousands of creators, marketers, and businesses who trust TweetFlow to streamline their social media workflow.
            </p>
            <button className="mt-8 bg-white text-violet-600 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-200 transition-colors">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
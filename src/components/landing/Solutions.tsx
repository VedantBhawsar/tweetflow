
import React from 'react';

const SolutionsMockup: React.FC = () => (
  <div className="bg-white p-4 rounded-xl shadow-2xl border border-gray-100 w-full max-w-md mx-auto relative overflow-hidden">
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-100 rounded-full"></div>
    <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-cyan-50 rounded-full"></div>
    <div className="relative z-10">
      <div className="p-3 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-gray-700">Posts</span>
          <span className="text-xs text-gray-400">This week</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-1/2 p-2 bg-white rounded">
            <p className="text-xs text-gray-500">Scheduled</p>
            <p className="font-bold text-gray-800">12</p>
          </div>
          <div className="w-1/2 p-2 bg-white rounded">
            <p className="text-xs text-gray-500">Published</p>
            <p className="font-bold text-gray-800">34</p>
          </div>
        </div>
      </div>
      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
        <p className="font-semibold text-gray-700 mb-2">Upcoming</p>
        <div className="flex items-center space-x-3 p-2 bg-white rounded">
          <div className="w-8 h-8 rounded-full bg-green-200"></div>
          <p className="text-sm text-gray-600 flex-grow">"How to boost engagement by 200%..."</p>
          <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">Approved</span>
        </div>
      </div>
    </div>
  </div>
);


const SolutionItem: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center text-xl">
            {icon}
        </div>
        <div>
            <h4 className="text-lg font-bold text-gray-800">{title}</h4>
            <p className="text-gray-600 mt-1">{description}</p>
        </div>
    </div>
);


const Solutions: React.FC = () => {
  return (
    <section id="solutions" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <span className="text-sm font-bold text-indigo-600">Use Cases</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">AI Solutions Built for Your Needs</h2>
            <p className="text-gray-600 mt-4">
              Our platform is designed to adapt to your unique challenges, no matter your industry or business size.
            </p>
            <div className="mt-8 space-y-6">
                <SolutionItem icon="🛒" title="E-commerce" description="Optimize expense tracking, compliance checks, and fraud detection for better decision-making." />
                <SolutionItem icon="✍️" title="Content Creators" description="Streamline your content pipeline, schedule posts across platforms, and analyze what resonates with your audience." />
                <SolutionItem icon="📈" title="Marketing" description="Enhance campaigns with automated social media management, lead nurturing, and performance analytics." />
            </div>
             <button className="mt-8 bg-violet-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-violet-700 transition-colors">
                Learn More
              </button>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <SolutionsMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;

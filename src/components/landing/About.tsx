
import React from 'react';

const DashboardMockup: React.FC = () => (
  <div className="relative bg-white p-4 rounded-xl shadow-2xl border border-gray-100 w-full max-w-lg mx-auto">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-gray-800">Insights</h3>
      <div className="flex space-x-1">
        <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
      </div>
    </div>
    <div className="flex space-x-4">
      <div className="w-1/3 bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-500">Impressions</h4>
        <p className="text-2xl font-bold text-gray-800">27k</p>
        <div className="h-16 mt-2 flex items-end space-x-1">
          {[4, 6, 8, 5, 7, 9, 6].map((h, i) => (
            <div key={i} className="w-full bg-indigo-200 rounded-t-sm" style={{ height: `${h * 10}%` }}></div>
          ))}
        </div>
      </div>
      <div className="w-2/3 bg-gray-50 p-4 rounded-lg flex items-center justify-center">
        <div className="relative w-24 h-24">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path className="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
            <path className="text-indigo-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="68, 100" strokeDashoffset="-25" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-800">68%</div>
        </div>
      </div>
    </div>
  </div>
);


const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <span className="text-sm font-bold text-indigo-600">About Us</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Built for Smarter Social Media Workflows</h2>
        <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
          Our cutting-edge AI automation platform is designed to simplify complex workflows, boost productivity, and drive innovation.
        </p>
      </div>
      <div className="container mx-auto px-6 mt-12">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <DashboardMockup />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-800">Our Story, Your Automation Partner</h3>
            <div className="mt-6 space-y-6">
              <div>
                <h4 className="font-semibold text-gray-700">Vision</h4>
                <p className="text-gray-600 mt-1">We are constantly pushing the boundaries of what's possible, at the forefront of AI advancements.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">Mission</h4>
                <p className="text-gray-600 mt-1">We are constantly pushing the boundaries of what's possible, at the forefront of AI advancements.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700">Values</h4>
                <p className="text-gray-600 mt-1">We are constantly pushing the boundaries of what's possible, at the forefront of AI advancements.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

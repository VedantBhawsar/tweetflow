
import React from 'react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  isComingSoon?: boolean;
}

const FeatureCard: React.FC<Feature> = ({ icon, title, description, isComingSoon }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow relative h-full flex flex-col">
    {isComingSoon && (
      <div className="absolute top-4 right-4 bg-gray-200 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
        Coming Soon
      </div>
    )}
    <div className="bg-violet-100 text-violet-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 flex-shrink-0">
      {icon}
    </div>
    <div className="flex-grow">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
    </div>
    <a href="#" className="font-semibold text-violet-600 hover:text-violet-800 mt-auto">Learn More →</a>
  </div>
);

const Features: React.FC = () => {
  const featuresData: Feature[] = [
    {
      icon: <IconSchedule />,
      title: 'Tweet Scheduling',
      description: 'Plan your content calendar in advance and automate your posting schedule for maximum impact.'
    },
    {
      icon: <IconAnalytics />,
      title: 'Advanced Analytics',
      description: 'Gain deep insights into your audience, engagement rates, and content performance with our powerful analytics dashboard.'
    },
    {
      icon: <IconAi />,
      title: 'AI Tweet Suggestions',
      description: 'Overcome writer\'s block with AI-powered suggestions to generate engaging tweet ideas and content.',
      isComingSoon: true,
    },
    {
      icon: <IconThread />,
      title: 'Thread Scheduling',
      description: 'Craft and schedule entire Twitter threads in advance to tell longer stories and maximize engagement.',
      isComingSoon: true,
    },
    {
      icon: <IconEngagement />,
      title: 'Engagement Automation',
      description: 'Automatically reply, like, and retweet based on custom rules to boost your visibility and interaction.'
    },
    {
      icon: <IconIntegrations />,
      title: 'Seamless Integrations',
      description: 'Connect with your favorite tools like Zapier, Slack, and more to create a fully integrated workflow.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <span className="text-sm font-bold text-indigo-600">Our Features</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Unlock the Power of Automation</h2>
        <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
          Discover how our AI-driven automation tools can streamline repetitive tasks, improve accuracy, and save you hours every day.
        </p>
      </div>
      <div className="container mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

const IconSchedule = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const IconAnalytics = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const IconEngagement = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h6l2-2h2l-2 2z" />
  </svg>
);

const IconIntegrations = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const IconAi = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

const IconThread = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-4 4v-4z" />
    </svg>
);

export default Features;

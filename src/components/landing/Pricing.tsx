
import React, { useState } from 'react';

const CheckMarkIcon: React.FC = () => (
    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);

const ComingSoonTag: React.FC = () => (
    <span className="ml-2 text-xs font-semibold bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
        Coming Soon
    </span>
);

interface Feature {
    text: string;
    isComingSoon: boolean;
}

interface Plan {
    name: string;
    price: { monthly: number; yearly: number };
    description: string;
    features: Feature[];
    isFeatured?: boolean;
    cta: string;
}

const plans: Plan[] = [
    {
        name: 'Solo Dev',
        price: { monthly: 0, yearly: 0 },
        description: 'Perfect for individual developers starting out.',
        features: [
            { text: 'Schedule up to 30 tweets/month', isComingSoon: true },
            { text: 'Basic analytics', isComingSoon: true },
            { text: 'Markdown editor', isComingSoon: true },
            { text: '1 Connected Account', isComingSoon: true },
        ],
        cta: 'Get Started Free'
    },
    {
        name: 'Pro Creator',
        price: { monthly: 19, yearly: 190 },
        description: 'For active solopreneurs & content creators.',
        features: [
            { text: 'Schedule unlimited tweets', isComingSoon: true },
            { text: 'Advanced analytics', isComingSoon: true },
            { text: 'Thread scheduling', isComingSoon: true },
            { text: 'AI Tweet Suggestions (Beta)', isComingSoon: true },
            { text: '3 Connected Accounts', isComingSoon: true },
            { text: 'Priority support', isComingSoon: true },
        ],
        isFeatured: true,
        cta: 'Choose Pro'
    },
    {
        name: 'Dev Agency',
        price: { monthly: 49, yearly: 490 },
        description: 'For agencies managing multiple client accounts.',
        features: [
            { text: 'All Pro features', isComingSoon: true },
            { text: 'Team collaboration (3 users)', isComingSoon: true },
            { text: '10 Connected Accounts', isComingSoon: true },
            { text: 'Client reporting', isComingSoon: true },
            { text: 'API Access', isComingSoon: true },
        ],
        cta: 'Choose Agency'
    }
];

const PricingCard: React.FC<{plan: Plan, isYearly: boolean}> = ({ plan, isYearly }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const cardClasses = plan.isFeatured 
        ? "bg-gray-800 text-white border-violet-500" 
        : "bg-white text-gray-800 border-gray-200";
    
    const buttonClasses = plan.isFeatured
        ? "bg-white text-gray-800 hover:bg-gray-200"
        : "bg-violet-600 text-white hover:bg-violet-700";

    const featuresToShow = isExpanded ? plan.features : plan.features.slice(0, 4);

    return (
        <div className={`border-2 rounded-2xl p-8 flex flex-col ${cardClasses} shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <div className="mt-4">
                <span className="text-5xl font-extrabold">${isYearly ? plan.price.yearly : plan.price.monthly}</span>
                <span className="text-gray-400">/{isYearly ? 'year' : 'month'}</span>
            </div>
            <p className={`mt-2 min-h-[40px] ${plan.isFeatured ? 'text-gray-300' : 'text-gray-600'}`}>{plan.description}</p>
            <button className={`w-full py-3 mt-8 font-semibold rounded-full transition-colors ${buttonClasses}`}>
                {plan.cta}
            </button>
            <ul className="mt-8 space-y-4 flex-grow">
                {featuresToShow.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                        <CheckMarkIcon />
                        <span className="flex-1">
                            {feature.text}
                            {feature.isComingSoon && <ComingSoonTag />}
                        </span>
                    </li>
                ))}
            </ul>
            {plan.features.length > 4 && (
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`w-full py-3 mt-8 font-semibold rounded-full transition-colors text-sm ${plan.isFeatured ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                    {isExpanded ? 'See less features' : 'See all features'}
                </button>
            )}
        </div>
    );
};

const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Choose your plan</h2>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          14 days unlimited free trial. No contract or credit card required.
        </p>
        <div className="mt-8 flex justify-center items-center space-x-4">
          <span className={`font-semibold ${!isYearly ? 'text-violet-600' : 'text-gray-500'}`}>Monthly</span>
          <label htmlFor="billing-toggle" className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="billing-toggle" className="sr-only peer" checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
            <div className="w-14 h-8 bg-gray-200 rounded-full peer peer-checked:bg-violet-600 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
          <span className={`font-semibold ${isYearly ? 'text-violet-600' : 'text-gray-500'}`}>
            Yearly <span className="text-sm text-green-500">(Save 15%)</span>
          </span>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {plans.map((plan, i) => <PricingCard key={i} plan={plan} isYearly={isYearly}/>)}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

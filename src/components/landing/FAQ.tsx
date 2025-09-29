import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800"
      >
        <span>{question}</span>
        <div className="relative flex h-6 w-6 items-center justify-center">
          <span
            className="absolute h-[2px] w-4 rounded-full bg-violet-500 transition-all duration-300 ease-in-out"
          ></span>
          <span
            className={`absolute h-4 w-[2px] rounded-full bg-violet-500 transition-all duration-300 ease-in-out ${
              isOpen ? 'rotate-90' : 'rotate-0'
            }`}
          ></span>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen mt-4' : 'max-h-0'}`}
      >
        <p className="text-gray-600">
          {answer}
        </p>
      </div>
    </div>
  );
};


const faqData = [
  {
    question: 'Is there a free trial available?',
    answer: 'Yes! You can start using TweetFlow for free with no credit card required. Our free plan provides access to basic tools for scheduling and analytics.'
  },
  {
    question: 'How do I connect my Twitter account?',
    answer: 'Connecting your account is simple. Once you sign up, you will be prompted to authorize your Twitter account. Just follow the on-screen instructions, and you\'ll be set up in under a minute.'
  },
  {
    question: 'Do you offer analytics reports?',
    answer: 'Absolutely. Our platform includes a comprehensive analytics dashboard where you can track key metrics, download reports, and gain insights into your account\'s performance.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, you can cancel your subscription at any time. If you cancel, you will retain access to your plan\'s features until the end of your billing cycle.'
  },
  {
    question: 'How secure is my financial data?',
    answer: 'We take security very seriously. All financial data is encrypted and handled by our secure payment processing partners. We do not store your credit card information on our servers.'
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <span className="text-sm font-bold text-indigo-600">Questions & Answers</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Frequently Ask Questions</h2>
            <p className="text-gray-600 mt-4">
              Find answers to common questions about our platform, features, and billing.
            </p>
          </div>
          <div className="md:w-2/3">
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => handleClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
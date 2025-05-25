"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart2, CheckCircle, Edit3, Layers, Settings, Sparkles, Twitter, Zap } from "lucide-react"; // Example icons
import HeroSection from "@/components/landing/HeroSection";
import TrustedBySection from "@/components/landing/TrustedBySection";
import AboutSection from "@/components/landing/AboutSection";
import Navbar from "@/components/landing/Navbar";
import FAQItem from "@/components/landing/FAQSection";
import UseCasesSection from "@/components/landing/UseCasesSection";
import { APP_PATH_ROUTES_MANIFEST } from "next/dist/shared/lib/constants";
import toast from "react-hot-toast";

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

const LOGO_TEXT = "TweetForge"; // Our product name

export default function LandingPage() {
  const [pricingTier, setPricingTier] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      q: "Is there a free trial available?",
      a: "Yes! Our 'Solo Dev' plan is free forever for basic scheduling and analytics. Try it out with no credit card required.",
    },
    {
      q: "How secure is my Twitter data?",
      a: "We use industry-standard encryption and OAuth 2.0 for Twitter authentication. Your data privacy and security are our top priorities.",
    },
    {
      q: "Can I connect multiple Twitter accounts?",
      a: "Multiple account management is available on our 'Pro' and 'Agency' plans.",
    },
    {
      q: "How do I cancel my subscription?",
      a: "You can cancel your subscription anytime from your account dashboard. No questions asked.",
    },
    {
      q: "Do you offer customer support?",
      a: "Absolutely! We offer email support for all plans, and priority support for 'Pro' and 'Agency' users.",
    },
  ];

  const pricingPlans = [
    {
      name: "Solo Dev",
      priceMonthly: "$0",
      priceYearly: "$0",
      description: "Perfect for individual developers starting out.",
      features: [
        "Schedule up to 30 tweets/month",
        "Basic analytics",
        "Markdown editor",
        "1 Connected Account",
      ],
      buttonText: "Get Started Free",
      highlighted: false,
    },
    {
      name: "Pro Creator",
      priceMonthly: "$19",
      priceYearly: "$15",
      description: "For active solopreneurs & content creators.",
      features: [
        "Schedule unlimited tweets",
        "Advanced analytics",
        "Thread scheduling",
        "AI Tweet Suggestions (Beta)",
        "3 Connected Accounts",
        "Priority support",
      ],
      buttonText: "Choose Pro",
      highlighted: true,
    },
    {
      name: "Dev Agency",
      priceMonthly: "$49",
      priceYearly: "$39",
      description: "For agencies managing multiple client accounts.",
      features: [
        "All Pro features",
        "Team collaboration (3 users)",
        "10 Connected Accounts",
        "Client reporting",
        "API Access",
      ],
      buttonText: "Choose Agency",
      highlighted: false,
    },
  ];

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Trusted By Section */}
      <TrustedBySection />

      {/* About Section (Built for Smarter Workflows) */}
      <AboutSection />

      {/* Features Section (Unlock the Power of Automation) */}
      <motion.section
        id="features"
        className="py-16 md:py-24 bg-slate-800" // Dark background for dark mode theme
        initial="initial"
        whileInView="animate" // Animate when the section comes into view
        viewport={{ once: true, amount: 0.15 }} // Trigger animation when 15% is visible
        variants={staggerContainer} // Apply stagger animation to children
      >
        <div className="container mx-auto px-6">
          <motion.p
            variants={fadeInUp}
            className="text-center text-sky-400 font-semibold mb-2 text-sm uppercase tracking-wider"
          >
            Core Capabilities
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-center text-white mb-6"
          >
            Unlock the Power of Twitter Automation
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-center text-slate-300 mb-12 max-w-2xl mx-auto text-lg"
          >
            Discover how our dev-friendly tools can streamline repetitive tasks,
            improve accuracy, and save you hours every day.
          </motion.p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Edit3, // Lucide icon component
                title: "Smart Tweet & Thread Scheduler",
                description:
                  "Plan and auto-post individual tweets or entire threads with our intuitive calendar. Markdown and code snippet support included.",
              },
              {
                icon: BarChart2,
                title: "Advanced Analytics Dashboard",
                description:
                  "Track impressions, engagement, link clicks, and follower growth. Identify your best content and optimize your strategy.",
              },
              {
                icon: Sparkles,
                title: "AI Content Assistance",
                description:
                  "Leverage AI to generate tweet ideas, rephrase content, or get inspired from topics or blog posts. (Beta)",
              },
              {
                icon: Layers, // Changed from "🔗"
                title: "Workflow Automation Canvas",
                description:
                  "Visually design custom automation workflows. Auto-reply to DMs, engage with mentions, and more. (Coming in Phase 2)",
              },
              {
                icon: Zap, // Changed from "🔄"
                title: "Seamless Integrations",
                description:
                  "Connect with tools like Zapier, Notion, or Google Sheets to extend functionality and automate further. (Optional)",
              },
              {
                icon: Settings, // New icon for a more generic "power" feature
                title: "Powerful Customization",
                description:
                  "Tailor scheduling patterns, define content categories, and manage multiple accounts with ease (Pro/Agency plans).",
              },
            ].map((feature, index) => (
              <motion.div
                variants={fadeInUp}
                key={feature.title}
                className="bg-slate-900 p-6 rounded-xl shadow-lg hover:shadow-sky-500/20 transition-all duration-300 border border-slate-700 hover:border-sky-600 group flex flex-col" // Added flex flex-col and dark mode styling
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 text-sky-400 mb-5 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                  {/* Render the icon component */}
                  <feature.icon size={24} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-300 text-sm mb-4 flex-grow">
                  {feature.description}
                </p>
                <a
                  href="#contact" // Example link, or link to specific feature page
                  className="inline-block mt-auto text-sm font-semibold text-sky-400 hover:text-sky-300 group-hover:underline transition-colors"
                >
                  Learn More <span aria-hidden="true">→</span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>




      {/* Use Cases Section (AI Solutions Built for Your Needs - adapted for Twitter Automation) */}
      {/* <UseCasesSection/> */}

      {/* Pricing Section */}
      <motion.section
        id="pricing"
        className="py-16 md:py-24 bg-slate-900 text-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
          >
            Choose Your Plan
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-center text-slate-300 mb-8"
          >
            14-day unlimited free trial for Pro/Agency. No contract or credit
            card required for &apos;Solo Dev&apos;.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex justify-center items-center mb-10"
          >
            <span
              className={`px-3 py-1 rounded-l-md cursor-pointer ${
                pricingTier === "monthly"
                  ? "bg-sky-500 text-white"
                  : "bg-slate-700 text-slate-300"
              }`}
              onClick={() => setPricingTier("monthly")}
            >
              Monthly
            </span>
            <span
              className={`px-3 py-1 rounded-r-md cursor-pointer ${
                pricingTier === "yearly"
                  ? "bg-sky-500 text-white"
                  : "bg-slate-700 text-slate-300"
              }`}
              onClick={() => setPricingTier("yearly")}
            >
              Yearly{" "}
              <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full ml-1">
                Save 20%
              </span>
            </span>
            {/* For a better toggle, Radix UI Switch component would be great here */}
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                variants={fadeInUp}
                key={plan.name}
                className={`rounded-xl p-8 flex flex-col ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-sky-500 to-sky-600 shadow-2xl scale-105 ring-4 ring-sky-400"
                    : "bg-slate-800 shadow-xl"
                }`}
              >
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <p
                  className={`text-4xl font-bold mb-1 ${
                    plan.highlighted ? "text-white" : "text-sky-400"
                  }`}
                >
                  {pricingTier === "monthly"
                    ? plan.priceMonthly
                    : plan.priceYearly}
                  <span className="text-sm font-normal text-slate-300">
                    {plan.priceMonthly !== "$0" && plan.priceYearly !== "$0"
                      ? pricingTier === "monthly"
                        ? "/month"
                        : "/month (billed yearly)"
                      : ""}
                  </span>
                </p>
                <p className="text-sm text-slate-300 mb-6 h-10">
                  {plan.description}
                </p>
                <ul className="space-y-2 mb-8 text-slate-200 text-sm flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle
                        size={16}
                        className="mr-2 text-green-400 flex-shrink-0"
                      />{" "}
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`${
                    plan.highlighted
                      ? "bg-white text-sky-600 hover:bg-slate-100"
                      : "bg-sky-500 text-white hover:bg-sky-600"
                  } font-semibold py-3 px-6 rounded-lg transition-colors w-full mt-auto`}
                >
                  {plan.buttonText}
                </button>
                <a
                  href="#"
                  className={`text-center text-xs mt-4 ${
                    plan.highlighted
                      ? "text-sky-100 hover:text-white"
                      : "text-slate-400 hover:text-sky-300"
                  }`}
                >
                  See all features
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      {/* <motion.section
        id="testimonials"
        className="py-16 md:py-24 bg-slate-50"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-6">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12"
          >
            Loved by Devs & Solopreneurs
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex P.",
                role: "Full-stack Developer",
                quote: `${LOGO_TEXT} changed how I share my projects. Scheduling threads is a breeze! My engagement is up 300%.`,
                avatar: "AP",
              },
              {
                name: "Sarah K.",
                role: "Indie SaaS Founder",
                quote:
                  "As a solopreneur, time is gold. This tool automates my Twitter, letting me focus on product. The analytics are insightful.",
                avatar: "SK",
              },
              {
                name: "Mike B.",
                role: "Tech Educator",
                quote:
                  "Finally, a Twitter tool that understands developers. Markdown support and code snippet formatting are fantastic.",
                avatar: "MB",
              },
            ].map((testimonial) => (
              <motion.div
                variants={fadeInUp}
                key={testimonial.name}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center text-xl font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-600 italic mb-4">
                  "{testimonial.quote}"
                </p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section> */}

      {/* FAQ Section */}
      <motion.section
        id="faq"
        className="py-16 md:py-24 bg-slate-900 text-white"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.p
            variants={fadeInUp}
            className="text-center text-sky-400 font-semibold mb-2"
          >
            Questions & Answers
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-4">
            <AnimatePresence>
              {faqData.map((item, index) => (
                <FAQItem key={index} q={item.q} a={item.a} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <a
                href="#"
                className="text-2xl font-bold text-white flex items-center mb-4"
              >
                <Twitter className="h-7 w-7 mr-2 text-sky-400" /> {LOGO_TEXT}
              </a>
              <p className="text-sm text-slate-400 mb-4">
                The ultimate Twitter automation platform for developers and
                solopreneurs. Schedule, analyze, and grow.
              </p>
              {/* Social Icons would go here */}
            </div>
            <div>
              <h5 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#features"
                    className="hover:text-sky-400 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-sky-400 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="/docs"
                    className="hover:text-sky-400 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-sky-400 transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold text-white mb-4">
                Stay Connected
              </h5>
              <p className="text-sm text-slate-400 mb-3">
                Subscribe to our newsletter for updates and tips.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="py-2 px-3 rounded-l-md bg-slate-800 border border-slate-700 text-white focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none text-sm w-full"
                />
                <button onClick={() => {
                  new Promise((resolve, reject) => {
                    setTimeout(() => {
                      resolve("Success");
                    }, 1000);
                  }).then((data) => {
                    toast.success("Subscribed successfully!");
                  });
                }} className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-r-md text-sm transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-500">
            <p>
              © {new Date().getFullYear()} {LOGO_TEXT}. All rights reserved.
              Built by Developers, for Developers.
            </p>
            <p className="mt-2">
              <a href="/privacy" className="hover:text-sky-400">
                Privacy Policy
              </a>{" "}
              ·{" "}
              <a href="/terms" className="hover:text-sky-400">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

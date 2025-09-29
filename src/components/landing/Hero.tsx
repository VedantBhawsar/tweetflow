import React from 'react'

const CheckIcon: React.FC = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 6L9 17L4 12"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const HeroIllustration: React.FC = () => (
  <div className="relative w-80 h-80 lg:w-96 lg:h-96 flex items-center justify-center">
    <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-[#6E00FF]/20 to-[#00D4FF]/20 blur-2xl"></div>
    <div className="absolute w-5/6 h-5/6 rounded-full border-2 border-white/10 animate-pulse"></div>
    <div
      className="absolute w-2/3 h-2/3 rounded-full border-2 border-white/20 animate-pulse"
      style={{ animationDelay: '0.5s' }}
    ></div>
    <div className="absolute w-1/2 h-1/2 rounded-full bg-gradient-to-br from-[#6E00FF] to-[#00D4FF] flex items-center justify-center shadow-2xl shadow-[#6E00FF]/50">
      <CheckIcon />
    </div>
    {[
      { icon: '📄', pos: 'top-10 left-10' },
      { icon: '📊', pos: 'top-20 right-5' },
      { icon: '💬', pos: 'bottom-16 left-5' },
      { icon: '🔗', pos: 'bottom-10 right-10' },
    ].map((item, index) => (
      <div
        key={index}
        className={`absolute ${item.pos} bg-white/10 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center text-xl`}
      >
        {item.icon}
      </div>
    ))}
  </div>
)

const CompanyLogos: React.FC = () => {
  const logos = ['Stitch', 'Brass', 'Identity', 'Unbanx', 'HitPay']
  return (
    <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-12 mt-16 text-gray-400">
      {logos.map((logo) => (
        <div
          key={logo}
          className="flex items-center font-bold text-lg grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
        >
          {logo}
        </div>
      ))}
    </div>
  )
}

const Hero: React.FC = () => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#6E00FF]/30 to-[#00D4FF]/30 via-transparent opacity-50 z-0"></div>
      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Automate Your Twitter Growth with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6E00FF] to-[#00D4FF]">
                Smarter
              </span>{' '}
              Scheduling
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-xl mx-auto lg:mx-0">
              Save time, schedule posts, analyze performance, and grow your
              audience effortlessly. Experience the future of automation
              tailored to your business needs.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="bg-white text-[#111827] font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-200 transition-colors w-full sm:w-auto">
                Get Started Free
              </button>
              <button className="border-2 border-white/50 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition-colors w-full sm:w-auto">
                Book a Demo
              </button>
            </div>
            <div className="mt-8 text-sm text-gray-400 flex justify-center lg:justify-start space-x-6">
              <span>✓ Trusted by 4,000+ companies</span>
              <span>✓ Free Forever</span>
              <span>✓ Set up in just 1 day</span>
            </div>
          </div>
          <div className="mt-16 lg:mt-0 lg:w-1/2 flex justify-center">
            <HeroIllustration />
          </div>
        </div>
        <CompanyLogos />
      </div>
    </div>
  )
}

export default Hero

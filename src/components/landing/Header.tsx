import Link from 'next/link'
import React from 'react'

const Logo: React.FC = () => (
  <div className="flex items-center space-x-2">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
        fill="url(#grad1)"
        stroke="url(#grad2)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 7L12 12L22 7"
        stroke="url(#grad3)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 22V12"
        stroke="url(#grad4)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="grad1"
          x1="12"
          y1="2"
          x2="12"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6E00FF" stopOpacity="0.3" />
          <stop offset="1" stopColor="#00D4FF" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="grad2"
          x1="12"
          y1="2"
          x2="12"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6E00FF" />
          <stop offset="1" stopColor="#00D4FF" />
        </linearGradient>
        <linearGradient
          id="grad3"
          x1="2"
          y1="7"
          x2="22"
          y2="7"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6E00FF" />
          <stop offset="1" stopColor="#00D4FF" />
        </linearGradient>
        <linearGradient
          id="grad4"
          x1="12"
          y1="12"
          x2="12"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6E00FF" />
          <stop offset="1" stopColor="#00D4FF" />
        </linearGradient>
      </defs>
    </svg>
    <span className="text-white font-bold text-xl">TweetFlow</span>
  </div>
)

const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 py-6">
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between text-white">
          <Logo />
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-gray-300 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Features
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Pricing
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Support
            </a>
          </div>
          <Link href={'/login'}>
            <button className="hidden md:block border border-cyan-400 text-cyan-400 px-6 py-2 rounded-full hover:bg-cyan-400 hover:text-white transition-colors">
              Login
            </button>
          </Link>
          <button className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header

import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { toast } from 'sonner'
import z from 'zod'

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
        fill="url(#grad1_footer)"
        stroke="url(#grad2_footer)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 7L12 12L22 7"
        stroke="url(#grad3_footer)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 22V12"
        stroke="url(#grad4_footer)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="grad1_footer"
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
          id="grad2_footer"
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
          id="grad3_footer"
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
          id="grad4_footer"
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

async function mutationFn(email: string) {
  const res = await fetch('/api/subscribe-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong')
  }

  return data
}

const emailSchema = z.string().email({ message: 'Invalid email address' })

const Footer: React.FC = () => {
  const [email, setEmail] = React.useState('')
  const mutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: (data) => {
      setEmail('')
      console.log('data', data)
      toast.success('Subscribed successfully!')
    },
    onError: () => {
      toast.error('Something went wrong')
    },
  })

  const handleSubmit = async () => {
    const result = emailSchema.safeParse(email)
    if (result.error) {
      toast.error(JSON.parse(result.error.message)[0].message)
      return
    }
    await mutation.mutateAsync(email)
  }

  return (
    <footer className="bg-[#111827] text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-gray-400">
              Streamline your workflows, boost productivity and reduce costs
              with our cutting-edge AI-powered SaaS solutions.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-white">
                Overview
              </a>
              <a href="#" className="hover:text-white">
                About Us
              </a>
              <a href="#" className="hover:text-white">
                Products
              </a>
              <a href="#" className="hover:text-white">
                Careers
              </a>
              <a href="#" className="hover:text-white">
                Help
              </a>
              <a href="#" className="hover:text-white">
                Privacy
              </a>
            </div>
          </div>
          <div className="md:col-span-2 flex justify-end">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Stay Connected:
              </h3>
              <p className="text-lg text-white">
                Subscribe to TweetFlow Updates
              </p>
              <div className="mt-4 flex">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded-l-full bg-gray-700 text-white border-0 focus:ring-2 focus:ring-violet-500"
                />
                <button
                  onClick={handleSubmit}
                  className="bg-white text-gray-800 font-semibold px-6 py-2 rounded-r-full hover:bg-gray-200 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} TweetFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

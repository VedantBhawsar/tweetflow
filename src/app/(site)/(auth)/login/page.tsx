'use client'

import { Suspense, useEffect, useState } from 'react'
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers/index'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import LoginForm from '@/app/(site)/(auth)/login/login-form'

// Create a client component that uses searchParams
function LoginContent() {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    fetchProviders()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <div className="max-w-sm w-full p-8 bg-slate-800 rounded-lg shadow-xl">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-2">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-sky-400 mr-2"
            >
              <path d="M22.46,6C21.69,6.35,20.86,6.58,20,6.69C20.88,6.16,21.56,5.32,21.88,4.31C21.05,4.81,20.13,5.16,19.16,5.36 C18.37,4.5,17.26,4,16,4C13.65,4,11.73,5.92,11.73,8.29C11.73,8.63,11.77,8.96,11.84,9.27C8.28,9.09,5.11,7.38,3,4.79 C2.63,5.42,2.42,6.16,2.42,6.94C2.42,8.43,3.17,9.75,4.33,10.5C3.62,10.5,2.96,10.3,2.38,10 C2.38,10.03,2.38,10.05,2.38,10.08C2.38,12.18,3.86,13.95,5.83,14.34C5.47,14.44,5.1,14.46,4.72,14.46 C4.46,14.46,4.2,14.44,3.96,14.39C4.49,16.08,6.16,17.23,8.18,17.27C6.71,18.39,4.85,19.08,2.83,19.08 C2.47,19.08,2.12,19.06,1.76,19C3.78,20.29,6.15,21.08,8.75,21.08C16.01,21.08,20.24,15.21,20.24,10.05 C20.24,9.86,20.24,9.66,20.23,9.48C20.96,8.98,21.63,8.29,22.21,7.49C21.54,7.8,20.79,7.99,20.02,8.05 C20.72,7.6,21.26,6.87,21.51,6.04L22.46,6Z"></path>
            </svg>
            <span className="text-2xl font-bold text-white">TweetFlow</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-4">Welcome back</h2>
          <p className="mt-1 text-sm text-slate-400">
            Please sign in to your account
          </p>
        </div>

        {providers?.google && (
          <button
            onClick={() =>
              signIn('google', {
                callbackUrl: searchParams?.get('callbackUrl') || '/dashboard',
              })
            }
            className="w-full flex items-center justify-center px-4 py-2 bg-white text-slate-700 text-sm font-medium rounded-md shadow hover:bg-gray-100 transition-colors mb-4"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56,12.25C22.56,11.47,22.5,10.72,22.38,10H12V14.5H18.24C17.96,16.09,17.06,17.41,15.62,18.31V21.09H19.5C21.51,19.24,22.56,16.08,22.56,12.25Z"
              ></path>
              <path
                fill="#34A853"
                d="M12,24C15.41,24,18.25,22.81,20.11,20.93L16.16,18.09C14.94,18.92,13.56,19.43,12,19.43C8.96,19.43,6.36,17.44,5.33,14.78L1.25,17.7C3.25,21.5,7.3,24,12,24Z"
              ></path>
              <path
                fill="#FBBC05"
                d="M5.25,14.75C5,13.97,4.88,13.15,4.88,12.25C4.88,11.35,5,10.53,5.25,9.75V6.88L1.17,3.91C0.43,5.5,0,7.42,0,9.5C0,11.58,0.43,13.5,1.17,15.09L5.25,14.75Z"
              ></path>
              <path
                fill="#EA4335"
                d="M12,4.5C14.09,4.5,15.93,5.27,17.32,6.64L20.72,3.24C18.71,1.44,15.7,0,12,0C7.3,0,3.25,2.5,1.25,6.25L5.33,9.13C6.36,6.48,8.96,4.5,12,4.5Z"
              ></path>
            </svg>
            Continue with Google
          </button>
        )}

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-slate-700"></div>
          <span className="flex-shrink mx-4 text-slate-500 text-sm">
            Or continue with email
          </span>
          <div className="flex-grow border-t border-slate-700"></div>
        </div>

        <LoginForm />

        <p className="mt-6 text-center text-sm text-slate-400">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="font-medium text-sky-500 hover:text-sky-400 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

// Main page component that wraps the content in a Suspense boundary
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
          Loading...
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  )
}

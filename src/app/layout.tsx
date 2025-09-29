// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css' // Your global styles
import SessionProviderWrapper from '@/components/providers/SessionProviderWrapper' // Adjust path
import { Toaster } from '@/components/ui/sonner'
import QueryProviderWrapper from '@/components/providers/QueryProviderWrapper'
import { ThemeProvider } from 'next-themes'
import ThemeProviderWrapper from '@/components/providers/ThemeProviderWrapper'
import type { User } from 'lucide-react'
import UserLoadingProviderWrapper from '@/components/providers/UserLoadingProviderWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TweetForge', // Your app name
  description: 'Twitter Automation Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster richColors theme="dark" />
        <SessionProviderWrapper>
          <QueryProviderWrapper>
            <ThemeProviderWrapper>
              <UserLoadingProviderWrapper>
                {children}
              </UserLoadingProviderWrapper>
            </ThemeProviderWrapper>
          </QueryProviderWrapper>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}

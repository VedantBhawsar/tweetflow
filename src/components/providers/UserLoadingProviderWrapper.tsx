'use client'

import { useSession } from 'next-auth/react'
import { LoaderFive } from '../ui/loader'

export default function UserLoadingProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  if (typeof window === 'undefined') return null

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <LoaderFive text="Loading..." />
        </div>
      </div>
    )
  }

  if (status === 'authenticated' && session?.user) {
    return <>{children}</>
  }
}

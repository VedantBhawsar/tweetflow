'use client'

import React, { useState } from 'react'
import {
  Home,
  LayoutGrid,
  Settings,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Twitter,
  BarChart2,
  Calendar,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button' // Ensure this path is correct
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { data: session } = useSession()
  const user = session?.user
  const pathname = usePathname()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Workflows', href: '/dashboard/workflows', icon: Zap },
    { name: 'Scheduled Tweets', href: '/dashboard/scheduled', icon: Calendar },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  return (
    <div className="flex h-screen  text-foreground">
      {/* Sidebar for desktop */}
      <div
        className={`${
          sidebarOpen ? 'min-w-52' : 'w-20'
        } transition-all duration-300 bg-card border-r border-border p-4 flex flex-col justify-between`}
      >
        <div>
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/dashboard"
              className={`flex items-center ${
                !sidebarOpen && 'justify-center'
              }`}
            >
              <Twitter className="h-8 w-8 text-primary" />
              {sidebarOpen && (
                <span className="ml-2 text-xl font-bold">TweetFlow</span>
              )}
            </Link>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center p-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {sidebarOpen && (
                        <span className="ml-2 text-sm">{item.name}</span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
        <div className="pt-4 border-t border-border ">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="py-2 w-full justify-start">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="h-6 w-6 rounded-full border border-border"
                  />
                ) : (
                  <User className="h-6 w-6 p-1 rounded-full bg-muted" />
                )}
                {sidebarOpen && (
                  <div className="overflow-hidden text-start">
                    <p className="text-sm font-medium truncate text-foreground">
                      {user?.name && user.name.split(' ')[0]}
                    </p>
                  </div>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <div className="flex flex-col overflow-hidden">
                <div className="flex items-center gap-3 p-4 border-b">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full border border-border"
                    />
                  ) : (
                    <User className="h-10 w-10 p-2 rounded-full bg-muted" />
                  )}
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium truncate text-foreground">
                      {user?.name || user?.email}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                {/* Sign Out Option */}
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none px-4 py-3 text-sm font-normal"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Sign out
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-card border-b border-border p-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center">
          <Twitter className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">TweetFlow</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-muted-foreground hover:text-foreground"
        >
          {sidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-10 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-64 bg-card p-4 flex flex-col">
            <div className="h-14"></div> {/* Spacer for the header */}
            <nav className="flex-1 mt-4">
              <ul className="space-y-2">
                {navigation.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`)
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center p-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="ml-3">{item.name}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
            <div className="mt-auto pt-4 border-t border-border">
              <div className="flex items-center p-3 text-muted-foreground">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full border border-border"
                  />
                ) : (
                  <User className="h-8 w-8 p-1 rounded-full bg-muted" />
                )}
                <div className="ml-3 overflow-hidden">
                  <p className="text-sm font-medium truncate text-foreground">
                    {user?.name || user?.email}
                  </p>
                  {user?.name && (
                    <p className="text-xs truncate">{user.email}</p>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => signOut({ callbackUrl: '/' })}
                className="mt-2 flex items-center w-full justify-start p-3 text-muted-foreground hover:text-destructive-foreground hover:bg-destructive/80"
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-3">Sign out</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 md:mt-0 mt-16">
          <div className="mb-3">{children}</div>
        </main>
      </div>
    </div>
  )
}

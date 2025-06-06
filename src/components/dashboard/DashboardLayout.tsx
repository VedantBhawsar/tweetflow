"use client";

import React, { useState } from 'react';
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
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Workflows', href: '/dashboard/workflows', icon: Zap },
    { name: 'Scheduled Tweets', href: '/dashboard/scheduled', icon: Calendar },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      {/* Sidebar for desktop */}
      <div 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} hidden md:block transition-all duration-300 bg-slate-800 border-r border-slate-700 p-4 flex flex-col`}
      >
        <div className="flex items-center justify-between mb-8">
          <Link href="/dashboard" className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
            <Twitter className="h-8 w-8 text-sky-500" />
            {sidebarOpen && <span className="ml-2 text-xl font-bold">TweetFlow</span>}
          </Link>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className={`flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-sky-500/20 text-sky-400' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
                  >
                    <item.icon className="h-5 w-5" />
                    {sidebarOpen && <span className="ml-3">{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto pt-4 border-t border-slate-700">
          <div className={`flex items-center ${!sidebarOpen && 'justify-center'} p-3 text-slate-400`}>
            {user.image ? (
              <Image 
                src={user.image} 
                alt="Profile" 
                width={32}
                height={32}
                className="h-8 w-8 rounded-full border border-slate-600" 
              />
            ) : (
              <User className="h-8 w-8 p-1 rounded-full bg-slate-700" />
            )}
            {sidebarOpen && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium truncate text-white">{user.name || user.email}</p>
                {user.name && <p className="text-xs truncate">{user.email}</p>}
              </div>
            )}
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className={`mt-2 flex items-center ${!sidebarOpen && 'justify-center'} w-full p-3 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors`}
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Sign out</span>}
          </button>
        </div>
      </div>

      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-slate-800 border-b border-slate-700 p-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center">
          <Twitter className="h-6 w-6 text-sky-500" />
          <span className="ml-2 text-lg font-bold">TweetFlow</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-slate-400 hover:text-white transition-colors"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-10 bg-slate-900/80">
          <div className="fixed inset-y-0 left-0 w-64 bg-slate-800 p-4 flex flex-col">
            <div className="h-14"></div> {/* Spacer for the header */}
            <nav className="flex-1 mt-4">
              <ul className="space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <li key={item.name}>
                      <Link 
                        href={item.href}
                        className={`flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-sky-500/20 text-sky-400' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="ml-3">{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-auto pt-4 border-t border-slate-700">
              <div className="flex items-center p-3 text-slate-400">
                {user.image ? (
                  <Image 
                    src={user.image} 
                    alt="Profile" 
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full border border-slate-600" 
                  />
                ) : (
                  <User className="h-8 w-8 p-1 rounded-full bg-slate-700" />
                )}
                <div className="ml-3 overflow-hidden">
                  <p className="text-sm font-medium truncate text-white">{user.name || user.email}</p>
                  {user.name && <p className="text-xs truncate">{user.email}</p>}
                </div>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="mt-2 flex items-center w-full p-3 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="ml-3">Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 md:mt-0 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}

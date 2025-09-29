"use client";

import React from "react";
import Link from "next/link"; // For navigation links
import { CheckCircle, LogOut, Twitter } from "lucide-react"; // Example icons

export default function LogoutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-4 text-white">
      <div className="w-full max-w-md text-center">
        <div className="bg-slate-800 p-8 md:p-12 rounded-xl shadow-2xl">
          <div className="flex items-center justify-center mb-8">
            <Twitter className="w-10 h-10 text-sky-400 mr-2" />
            <span className="text-2xl font-bold text-white">TweetForge</span>
          </div>
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-3">Logout Successful!</h1>
            <p className="text-slate-300 text-lg">
              You have been successfully logged out.
            </p>
            <p className="text-slate-400 mt-2">
              We hope to see you back at TweetForge soon!
            </p>
          </div>

          <div className="mt-8 flex flex-col space-y-4">
            <Link href="/">
              <span className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 cursor-pointer transition-colors">
                Go to Homepage
              </span>
            </Link>
            <Link href="/login">
              <span className="w-full flex justify-center items-center py-3 px-4 border border-slate-600 rounded-lg shadow-sm text-sm font-medium text-sky-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 cursor-pointer transition-colors">
                Sign In Again
                <LogOut className="w-4 h-4 ml-2" />
              </span>
            </Link>
          </div>
        </div>
        <p className="mt-8 text-xs text-slate-500">
          © {new Date().getFullYear()} TweetForge. All rights reserved.
        </p>
      </div>
    </div>
  );
}

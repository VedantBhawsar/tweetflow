import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Twitter } from 'lucide-react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
];

const LOGO_TEXT = "TweetForge";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 py-4"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-lg font-bold text-white flex items-center">
          <Twitter className="h-5 w-5 mr-2 text-sky-400" /> {LOGO_TEXT}
        </Link>
        <div className="hidden md:flex space-x-6 items-center mx-auto">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-200 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          
        </div>
        <Link
            href="/login"
            className="hidden md:block bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-xl transition-colors text-sm"
          >
            Sign Up / Log In
          </Link>
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-200 hover:text-white">
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-800/95 backdrop-blur-sm mt-2 mx-2 rounded-lg shadow-xl overflow-hidden"
          >
            <div className="flex flex-col space-y-1 p-4">
              {NAV_LINKS.map(link => (
                <Link key={link.href} href={link.href} className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-700 hover:text-white">
                  {link.label}
                </Link>
              ))}
              <Link href="/login" className="block mt-2 w-full text-center bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors">
                Sign Up / Log In
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar; 
'use client'

import React from 'react'
import Header from '@/components/landing/Header'
import Hero from '@/components/landing/Hero'
import About from '@/components/landing/About'
import Features from '@/components/landing/Features'
import Solutions from '@/components/landing/Solutions'
import Pricing from '@/components/landing/Pricing'
import Testimonials from '@/components/landing/Testimonials'
import CTA from '@/components/landing/CTA'
import FAQ from '@/components/landing/FAQ'
import Footer from '@/components/landing/Footer'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <div className="bg-white font-sans">
      <div className="relative bg-[#111827]">
        <Button>Button</Button>
        <Header />
        <Hero />
      </div>
      <main>
        <About />
        <Features />
        <Solutions />
        <Pricing />
        <Testimonials />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

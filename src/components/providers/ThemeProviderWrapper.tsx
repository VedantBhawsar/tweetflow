'use client'
import { ThemeProvider } from 'next-theme'

export default function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
}

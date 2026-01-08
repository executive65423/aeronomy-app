import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Metadata } from 'next'
import { cn } from '../lib/utils'
import { Toaster } from '../components/ui/toaster'
import { TailwindIndicator } from '../components/tailwind-indicator'
import { ThemeProvider } from '../components/theme-provider'
import { SiteHeader } from '../components/site-header'
import { SiteFooter } from '../components/site-footer'

import '../styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <ThemeProvider defaultTheme="system">
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
          <TailwindIndicator />
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
} 
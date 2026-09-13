'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function PageLoader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [loading, setLoading] = useState(false)
  const [exiting, setExiting] = useState(false)

  // This relies on Next.js 13+ App router navigating fast, we'll just show a quick
  // animation when the route changes. Since we don't have route change events in App Router
  // as easily as pages router, we just watch pathname and searchParams and show loader
  // briefly. Or we can just do an initial load animation.
  // Because creating a true inter-page loader in App router is tricky without a custom Link component,
  // let's do an initial load animation for all routes, and a brief overlay when pathname changes.

  useEffect(() => {
    // Show loading state on path change
    setLoading(true)
    setExiting(false)

    // Fake the completion since we can't accurately wait for Next.js rendering
    // to complete in App router layout without complex Suspense boundaries.
    const timer = setTimeout(() => {
      setExiting(true)
      setTimeout(() => {
        setLoading(false)
      }, 400) // matches transition duration
    }, 600)

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  if (!loading) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B3D24] transition-opacity duration-400 ease-in-out ${
        exiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-8">
        {/* Glow effect backround */}
        <div className="absolute inset-0 rounded-full bg-[#4CAF50]/20 blur-xl animate-pulse" />

        {/* Outer ring */}
        <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="46" stroke="#123524" strokeWidth="4" />
          <circle cx="50" cy="50" r="46" stroke="#4CAF50" strokeWidth="4" strokeDasharray="60 200" strokeLinecap="round" className="opacity-80" />
        </svg>

        {/* Inner ring */}
         <svg className="absolute inset-0 w-full h-full animate-spin-reverse-slower p-2" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="#8BC34A" strokeWidth="2" strokeDasharray="30 220" strokeLinecap="round" className="opacity-90" />
          <circle cx="50" cy="50" r="40" stroke="#4CAF50" strokeWidth="2" strokeDasharray="30 220" strokeDashoffset="125" strokeLinecap="round" className="opacity-90" />
        </svg>

        {/* Center Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
        </div>
      </div>
      <div className="flex gap-2">
         <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-bounce" style={{ animationDelay: '0ms' }} />
         <span className="w-2 h-2 rounded-full bg-[#8BC34A] animate-bounce" style={{ animationDelay: '150ms' }} />
         <span className="w-2 h-2 rounded-full bg-[#c8dfcb] animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}

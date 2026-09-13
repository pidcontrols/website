'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSiteAssets } from '@/components/SiteAssetsContext'

const navLinks = [
  { href: '/', label: 'Home' },
  {
    label: 'Services',
    dropdown: [
      { href: '/services#building-management-system', label: 'Building Management System (BMS)' },
      { href: '/services#hvac-integration', label: 'HVAC Integration' },
      { href: '/services#environmental-monitoring-system', label: 'Environmental Monitoring System (EMS)' },
      { href: '/services#energy-monitoring-system', label: 'Energy Monitoring System (EnMS)' },
      { href: '/services#chiller-plant-manager', label: 'Chiller Plant Manager (CPM)' },
      { href: '/services#iaq-monitoring', label: 'IAQ Monitoring' },
      { href: '/services#control-panels', label: 'Control Panels' },
      { href: '/services#hmi-solutions', label: 'HMI Solutions' },
    ],
  },
  {
    label: 'Products',
    dropdown: [
      { href: '/products', label: 'Human Machine Interface (HMI)' },
    ],
  },
  { href: '/clients', label: 'Our Clients' },
  {
    label: 'About',
    dropdown: [
      { href: '/about#vision', label: 'Vision' },
      { href: '/about#mission', label: 'Mission' },
      { href: '/about#why-us', label: 'Why Us' },
      { href: '/about#our-process', label: 'Our Process' },
    ],
  },
  { href: '/contact', label: 'Contact' },
  { href: '/careers', label: 'Careers' },
]

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const pathname = usePathname()
  const isHome = !mounted ? false : pathname === '/'
  const { logo } = useSiteAssets()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    setScrolled(window.scrollY > 5)
    const onScroll = () => setScrolled(window.scrollY > 5)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || !isHome ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 sm:h-28 md:h-36">
          <Link href="/" className="flex items-center gap-2 z-10">
            <img src={logo} alt="PID Controls" className="logo-img" loading="eager" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.label} className="relative">
                {'dropdown' in link ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(link.label)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 ${
                        scrolled || !isHome
                          ? 'text-gray-700 hover:text-[#4CAF50] hover:bg-green-50'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {link.label}
                      <svg className={`w-3 h-3 transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openDropdown === link.label && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)} />
                        <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[220px] z-20">
                          {link.dropdown.map((item) => (
                            <Link key={item.href} href={item.href}
                              className={`block px-4 py-2.5 text-sm transition-colors ${
                                pathname === item.href
                                  ? 'text-[#4CAF50] bg-green-50 font-medium'
                                  : 'text-gray-700 hover:text-[#4CAF50] hover:bg-green-50'
                              }`}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <Link href={link.href}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors relative ${
                      pathname === link.href
                        ? scrolled || !isHome ? 'text-[#4CAF50] bg-green-50' : 'text-white bg-white/20'
                        : scrolled || !isHome ? 'text-gray-700 hover:text-[#4CAF50] hover:bg-green-50' : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <span className="absolute -bottom-0.5 left-2 right-2 h-0.5 bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] rounded-full" />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden p-2 z-10" onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu">
            {mobileOpen ? (
              <svg className={`w-6 h-6 ${scrolled || !isHome ? 'text-[#0B3D24]' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className={`w-6 h-6 ${scrolled || !isHome ? 'text-[#0B3D24]' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="bg-white border-t border-gray-100 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                {'dropdown' in link ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(link.label)}
                      className="flex items-center justify-between w-full px-3 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-green-50 hover:text-[#4CAF50]"
                    >
                      {link.label}
                      <svg className={`w-4 h-4 transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openDropdown === link.label && (
                      <div className="ml-4 space-y-1 pb-2">
                        {link.dropdown.map((item) => (
                          <Link key={item.href} href={item.href}
                            onClick={() => { setMobileOpen(false); setOpenDropdown(null) }}
                            className={`block px-3 py-2 text-sm rounded-lg ${
                              pathname === item.href
                                ? 'text-[#4CAF50] bg-green-50 font-medium'
                                : 'text-gray-600 hover:text-[#4CAF50] hover:bg-green-50'
                            }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={link.href}
                    className={`block px-3 py-2.5 font-medium rounded-lg ${
                      pathname === link.href
                        ? 'text-[#4CAF50] bg-green-50'
                        : 'text-gray-700 hover:text-[#4CAF50] hover:bg-green-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

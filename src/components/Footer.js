'use client'

import Link from 'next/link'
import { useSiteAssets } from '@/components/SiteAssetsContext'

export default function Footer() {
  const { logo } = useSiteAssets()
  return (
    <footer className="gradient-dark text-white relative overflow-hidden">
      <div className="footer-circuit" />
      <div className="footer-energy" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logo} alt="PID Controls" className="logo-img logo-glow-soft" loading="lazy" />
                </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Smart Automation. Sustainable Performance. Intelligent Building Automation & Energy Management Solutions.
              </p>
              <div className="flex gap-3">
                <a href="mailto:sales@pid-controls.com" className="footer-icon w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#4CAF50]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </a>
                <a href="tel:+918317639869" className="footer-icon w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#4CAF50]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-heading font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2.5">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/about', label: 'About Us' },
                  { href: '/services', label: 'Services' },
                  { href: '/clients', label: 'Our Clients' },
                  { href: '/industries', label: 'Industries' },
                  { href: '/about#why-us', label: 'Why Choose Us' },
                  { href: '/about#our-process', label: 'Our Process' },
                  { href: '/contact', label: 'Contact' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link text-gray-300 text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-bold text-lg mb-4">Our Services</h3>
              <ul className="space-y-2.5">
                {[
                  'Building Management System',
                  'HVAC Integration',
                  'Environmental Monitoring',
                  'Energy Monitoring',
                  'Chiller Plant Manager',
                  'IAQ Monitoring',
                  'Control Panels',
                  'HMI Solutions',
                ].map((s) => (
                  <li key={s}>
                    <Link href="/services" className="footer-link text-gray-300 text-sm">
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-bold text-lg mb-4">Contact Info</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex gap-2">
                  <svg className="w-5 h-5 mt-0.5 shrink-0 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>2-3-703/1/A/37/1/2, 2nd Floor, Tirumala Nagar, Quadribagh Lane, Maruthi Nagar, Amberpet, Hyderabad, Telangana 500013</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 shrink-0 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <a href="tel:+918317639869" className="footer-link">+91 8317639869</a>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 shrink-0 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <a href="mailto:sales@pid-controls.com" className="footer-link">sales@pid-controls.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 shrink-0 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                  <a href="https://www.pid-controls.com" className="footer-link">www.pid-controls.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} PID Controls. All rights reserved.</p>
            <p>Smart Automation. Sustainable Performance.</p>
          </div>
        </div>
    </footer>
  )
}

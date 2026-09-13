import './globals.css'
import { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import BackToTop from '@/components/BackToTop'
import PageLoader from '@/components/PageLoader'
import { SiteAssetsProvider } from '@/components/SiteAssetsContext'

export const metadata = {
  title: {
    default: 'PID Controls | Smart Automation. Sustainable Performance.',
    template: '%s | PID Controls',
  },
  description: 'Intelligent Building Automation & Energy Management Solutions. BMS, HVAC Automation, Energy Monitoring in Hyderabad, India.',
  keywords: 'BMS, Building Management System, HVAC Automation, Energy Management, PID Controls, Hyderabad, Telangana, building automation',
  openGraph: {
    title: 'PID Controls | Smart Automation. Sustainable Performance.',
    description: 'Intelligent Building Automation & Energy Management Solutions',
    url: 'https://www.pid-controls.com',
    siteName: 'PID Controls',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@600;700;800;900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'PID Controls',
              image: 'https://www.pid-controls.com/logo.png',
              description: 'Intelligent Building Automation & Energy Management Solutions',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '2-3-703/1/A/37/1/2, 2nd Floor, Tirumala Nagar, Quadribagh Lane, Maruthi Nagar, Amberpet',
                addressLocality: 'Hyderabad',
                addressRegion: 'Telangana',
                postalCode: '500013',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 17.3888,
                longitude: 78.5125,
              },
              url: 'https://www.pid-controls.com',
              telephone: '+918317639869',
              email: 'sales@pid-controls.com',
              foundingYear: '2014',
              areaServed: ['Hyderabad', 'Telangana', 'India'],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Building Automation Services',
                itemListElement: [
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Building Management System' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'HVAC Integration' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Environmental Monitoring' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Energy Monitoring' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Chiller Plant Manager' } },
                ],
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <SiteAssetsProvider>
          <Suspense>
            <PageLoader />
          </Suspense>
          <Navbar />
          <main className="flex-1 bg-[url('data:image/svg+xml,%3Csvg width=''60'' height=''60'' viewBox=''0 0 60 60'' xmlns=''http://www.w3.org/2000/svg''%3E%3Cg fill=''none'' fill-rule=''evenodd''%3E%3Cg fill=''%234CAF50'' fill-opacity=''0.02''%3E%3Ccircle cx=''30'' cy=''30'' r=''1''/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]">{children}</main>
          <Footer />
          <WhatsAppButton />
          <BackToTop />
        </SiteAssetsProvider>
      </body>
    </html>
  )
}

'use client'

import { useSiteAssets } from '@/components/SiteAssetsContext'

export default function PartnerMarquee() {
  const { partners } = useSiteAssets()
  const partnerLogos = (partners || []).map((p) => ({ src: p.src, alt: p.alt }))

  return (
    <div className="partner-marquee-container">
      <div className="partner-marquee-track">
        {[...partnerLogos, ...partnerLogos].map((logo, i) => (
          <div key={i} className="partner-logo-cell">
            <img src={logo.src} alt={logo.alt} className="partner-logo-img" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  )
}

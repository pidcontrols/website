'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import defaultAssets from '@/data/site-assets.json'

const SiteAssetsContext = createContext(defaultAssets)

export function SiteAssetsProvider({ children }) {
  const [assets, setAssets] = useState(defaultAssets)

  useEffect(() => {
    let active = true
    fetch('/api/site-assets', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (active && data && typeof data === 'object') setAssets(data)
      })
      .catch(() => {})
    return () => { active = false }
  }, [])

  return <SiteAssetsContext.Provider value={assets}>{children}</SiteAssetsContext.Provider>
}

export const useSiteAssets = () => useContext(SiteAssetsContext)
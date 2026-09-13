export const SLOT_SPECS = {
  logo: {
    label: 'Header & Footer Logo',
    recW: 1536, recH: 1024, maxW: 2400, maxH: 1600, maxKB: 400,
    aspect: '3 : 2 landscape',
    note: 'PNG with transparent background strongly recommended',
    format: 'PNG (preferred) / WebP / JPG',
  },
  yearsBadge: {
    label: 'Years of Excellence Badge',
    recW: 1536, recH: 1024, maxW: 2400, maxH: 1600, maxKB: 400,
    aspect: '3 : 2 landscape',
    note: 'PNG with transparency preferred',
    format: 'PNG / WebP / JPG',
  },
  brandsStrip: {
    label: 'Brands Strip — Why Choose Us',
    recW: 2400, recH: 400, maxW: 4800, maxH: 1000, maxKB: 500,
    aspect: 'wide panoramic strip (6 : 1)',
    note: 'A single wide banner with all brand logos side by side',
    format: 'PNG / JPG',
  },
  partner: {
    label: 'Technology Partner Logo',
    recW: 900, recH: 400, maxW: 2000, maxH: 1200, maxKB: 250,
    aspect: 'wide logo — any ratio, display box is 150 × 90 px',
    note: 'Transparent PNG; logo fills the box, keep margins minimal',
    format: 'PNG (preferred) / WebP / SVG',
  },
  client: {
    label: 'Client Logo',
    recW: 1200, recH: 600, maxW: 2400, maxH: 1600, maxKB: 250,
    aspect: 'wide logo — any ratio, display box is ~half page wide',
    note: 'High-resolution company logo; no screenshots',
    format: 'PNG / JPG / WebP',
  },
  service: {
    label: 'Service Image',
    recW: 1536, recH: 1024, maxW: 2000, maxH: 1500, maxKB: 800,
    aspect: '3 : 2 landscape',
    note: 'High-quality photo; no embedded text or watermarks',
    format: 'JPG / PNG / WebP',
  },
  industry: {
    label: 'Industry Image',
    recW: 1000, recH: 1500, maxW: 1600, maxH: 2000, maxKB: 800,
    aspect: '2 : 3 portrait',
    note: 'Keep a consistent look across all six industries',
    format: 'JPG / PNG / WebP',
  },
}

export const UPLOAD_RULES = {
  maxGlobalBytes: 5 * 1024 * 1024,
  allowedExtensions: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'avif'],
}
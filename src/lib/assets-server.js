import { createHmac, timingSafeEqual } from 'crypto'
import path from 'path'
import defaultAssets from '@/data/site-assets.json'
import { SLOT_SPECS } from '@/data/image-specs'
import { dbDeleteImages, dbReadManifest, dbSaveImage, dbWriteManifest } from '@/lib/db'

export const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024
export const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.avif']

const IMAGE_PATH = /^\/(images|api\/images)\/[A-Za-z0-9._-]+$/
const SLUG = /^[a-z0-9][a-z0-9-]*$/

function getSecret() {
  return process.env.ADMIN_PASSWORD || ''
}

function b64urlEncode(input) {
  return Buffer.from(input, 'utf8').toString('base64url')
}

function b64urlDecode(input) {
  return Buffer.from(input, 'base64url').toString('utf8')
}

export function signToken() {
  const payload = b64urlEncode(JSON.stringify({ exp: Date.now() + TOKEN_TTL_MS }))
  const sig = createHmac('sha256', getSecret()).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

export function verifyToken(token) {
  try {
    if (!token || typeof token !== 'string') return false
    const [payload, sig] = token.split('.')
    if (!payload || !sig) return false
    const expected = createHmac('sha256', getSecret()).update(payload).digest('base64url')
    const a = Buffer.from(sig)
    const b = Buffer.from(expected)
    if (a.length !== b.length) return false
    if (!timingSafeEqual(a, b)) return false
    const { exp } = JSON.parse(b64urlDecode(payload))
    return typeof exp === 'number' && exp > Date.now()
  } catch {
    return false
  }
}

export function getSessionToken(request) {
  const cookieHeader = request.headers.get('cookie') || ''
  const match = cookieHeader.match(/(?:^|;\s*)admin_session=([^;]+)/)
  return match ? match[1] : null
}

export function isAuthed(request) {
  return verifyToken(getSessionToken(request))
}

export function sessionCookie(token) {
  return `admin_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(TOKEN_TTL_MS / 1000)}`
}

export function expiredCookie() {
  return 'admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0'
}

export async function readAssets() {
  const stored = await dbReadManifest()
  if (!stored || !stored.version) return defaultAssets
  return {
    ...defaultAssets,
    ...stored,
    partners: Array.isArray(stored.partners) ? stored.partners : defaultAssets.partners,
    clients: Array.isArray(stored.clients) ? stored.clients : defaultAssets.clients,
    serviceImages: { ...defaultAssets.serviceImages, ...(stored.serviceImages || {}) },
    industryImages: { ...defaultAssets.industryImages, ...(stored.industryImages || {}) },
  }
}

export async function writeAssets(assets) {
  await dbWriteManifest(assets)
}

function isImgPath(value) {
  return typeof value === 'string' && value.length <= 300 && IMAGE_PATH.test(value)
}

function isShortString(value, max) {
  return typeof value === 'string' && value.length > 0 && value.length <= max
}

function sanitizeImageMap(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null
  const out = {}
  for (const [key, value] of Object.entries(input)) {
    if (!SLUG.test(String(key)) || key.length > 60) return null
    if (!isImgPath(value)) return null
    out[key] = value
  }
  return out
}

export function sanitizeAssets(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input) || input.version == null) return null

  const result = {}
  for (const field of ['logo', 'yearsBadge', 'brandsStrip']) {
    if (field === 'brandsStrip' && input[field] === '') { result[field] = ''; continue }
    if (!isImgPath(input[field])) return null
    result[field] = input[field]
  }

  if (!Array.isArray(input.partners) || !Array.isArray(input.clients)) return null

  result.partners = []
  for (const p of input.partners) {
    if (!p || typeof p !== 'object') return null
    if (!isShortString(p.id, 60) || !isShortString(p.alt, 140) || !isImgPath(p.src)) return null
    result.partners.push({ id: p.id, alt: p.alt, src: p.src })
  }

  result.clients = []
  for (const c of input.clients) {
    if (!c || typeof c !== 'object') return null
    if (!isShortString(c.id, 60) || !isShortString(c.name, 180) || !isImgPath(c.src)) return null
    result.clients.push({ id: c.id, name: c.name, src: c.src })
  }

  const serviceImages = sanitizeImageMap(input.serviceImages)
  const industryImages = sanitizeImageMap(input.industryImages)
  if (!serviceImages || !industryImages) return null

  result.serviceImages = { ...defaultAssets.serviceImages, ...serviceImages }
  result.industryImages = { ...defaultAssets.industryImages, ...industryImages }
  result.version = Number(input.version) || 1

  return result
}

export function safeUploadFilename(originalName) {
  const ext = path.extname(originalName || '').toLowerCase()
  if (!ALLOWED_EXTENSIONS.includes(ext)) return null
  const base = path.basename(originalName, ext).toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || 'image'
  return `${base}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`
}

export function contentTypeFor(ext) {
  const map = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.avif': 'image/avif',
  }
  return map[ext] || 'application/octet-stream'
}

export async function saveUploadedImage(filename, buffer, contentType) {
  await dbSaveImage(filename, contentType, buffer)
}

export function getImageSize(buffer) {
  const b = buffer
  if (!Buffer.isBuffer(b) || b.length < 32) return null
  const sig = (s) => {
    const ascii = Buffer.from(s, 'latin1')
    return ascii.length <= b.length && b.subarray(0, ascii.length).equals(ascii)
  }
  if (sig('\u0089PNG\r\n\u001a\n')) {
    return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) }
  }
  if (b[0] === 0xff && b[1] === 0xd8) {
    let offset = 2
    while (offset < b.length - 9) {
      if (b[offset] !== 0xff) { offset += 1; continue }
      const marker = b[offset + 1]
      if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) { offset += 2; continue }
      const size = b.readUInt16BE(offset + 2)
      const sof = [0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]
      if (sof.includes(marker)) {
        return { width: b.readUInt16BE(offset + 7), height: b.readUInt16BE(offset + 5) }
      }
      offset += 2 + size
    }
    return null
  }
  if (sig('GIF87a') || sig('GIF89a')) {
    return { width: b.readUInt16LE(6), height: b.readUInt16LE(8) }
  }
  if (sig('RIFF') && b.toString('latin1', 8, 12) === 'WEBP') {
    const kind = b.toString('latin1', 12, 16)
    if (kind === 'VP8 ') return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff }
    if (kind === 'VP8L') {
      const bits = b.readUInt32LE(21)
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 }
    }
    if (kind === 'VP8X') {
      const w = (b[24] | (b[25] << 8) | (b[26] << 16)) + 1
      const h = (b[27] | (b[28] << 8) | (b[29] << 16)) + 1
      return { width: w, height: h }
    }
    return null
  }
  if (b.toString('latin1', 4, 8) === 'ftyp') {
    const idx = b.indexOf('ispe')
    if (idx !== -1 && idx + 16 <= b.length) {
      return { width: b.readUInt32BE(idx + 8), height: b.readUInt32BE(idx + 12) }
    }
    return null
  }
  if (sig('<?xml') || sig('<svg')) {
    const s = b.toString('latin1', 0, Math.min(b.length, 16384))
    const mv = s.match(/viewBox\s*=\s*["']\s*[\d.]+\s+[\d.]+\s+([\d.]+)\s+([\d.]+)/i)
    const mw = s.match(/width\s*=\s*["']([\d.]+)/i)
    const mh = s.match(/height\s*=\s*["']([\d.]+)/i)
    const vbW = mv ? Math.round(parseFloat(mv[1])) : 0
    const vbH = mv ? Math.round(parseFloat(mv[2])) : 0
    const w = mw ? Math.round(parseFloat(mw[1])) : vbW
    const h = mh ? Math.round(parseFloat(mh[1])) : vbH
    if (w && h) return { width: w, height: h }
  }
  return null
}

export function validateUpload({ slot, ext, sizeBytes, buffer }) {
  const sizeKB = sizeBytes / 1024
  if (!SLOT_SPECS[slot]) return null

  const spec = SLOT_SPECS[slot]
  if (sizeBytes > spec.maxKB * 1024) {
    return `${spec.label}: file is ${sizeKB.toFixed(1)} KB. Maximum allowed for this section is ${spec.maxKB} KB. Recommended: ${spec.recW} × ${spec.recH} px (${spec.aspect}).`
  }

  const size = getImageSize(buffer)
  if (size && (size.width > spec.maxW || size.height > spec.maxH)) {
    return `${spec.label}: image is ${size.width} × ${size.height} px. Maximum allowed is ${spec.maxW} × ${spec.maxH} px. Recommended: ${spec.recW} × ${spec.recH} px (${spec.aspect}).`
  }

  return null
}

const UPLOAD_NAME = /^[a-z0-9_-]+-\d{10,}-[a-z0-9]{6}\.(png|jpg|jpeg|webp|gif|svg|avif)$/

export function collectImageRefs(assets) {
  const refs = new Set()
  for (const field of ['logo', 'yearsBadge', 'brandsStrip']) {
    if (assets[field]) refs.add(assets[field])
  }
  for (const list of ['partners', 'clients']) {
    for (const item of assets[list] || []) {
      if (item && item.src) refs.add(item.src)
    }
  }
  for (const map of ['serviceImages', 'industryImages']) {
    for (const value of Object.values(assets[map] || {})) {
      if (value) refs.add(value)
    }
  }
  return refs
}

export async function gcUnusedUploads(oldAssets, newAssets) {
  const oldRefs = collectImageRefs(oldAssets)
  const newRefs = collectImageRefs(newAssets)
  const unused = []
  for (const ref of oldRefs) {
    if (newRefs.has(ref)) continue
    const name = ref.split('/').pop()
    if (!name || !UPLOAD_NAME.test(name)) continue
    unused.push(name)
  }
  if (unused.length) await dbDeleteImages(unused)
  return unused
}
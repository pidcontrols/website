'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import defaultAssets from '@/data/site-assets.json'
import { SLOT_SPECS } from '@/data/image-specs'

const serviceLabels = {
  'building-management-system': 'BMS',
  'hvac-integration': 'HVAC Integration',
  'environmental-monitoring-system': 'Environmental Monitoring',
  'energy-monitoring-system': 'Energy Monitoring',
  'chiller-plant-manager': 'Chiller Plant Manager',
  'hmi-solutions': 'HMI Solutions',
  'iaq-monitoring': 'IAQ Monitoring',
  'control-panels': 'Control Panels',
}

const industryLabels = {
  commercial: 'Commercial Buildings',
  healthcare: 'Healthcare Facilities',
  pharmaceutical: 'Pharmaceutical',
  industrial: 'Industrial Facilities',
  education: 'Educational Institutions',
  datacenter: 'Data Centers',
}

const brandingSlots = [
  { key: 'logo', label: 'Header & Footer Logo' },
  { key: 'yearsBadge', label: 'Years of Excellence Badge' },
  { key: 'brandsStrip', label: 'Brands Strip — Why Choose Us' },
]

async function uploadImage(file, slot) {
  const fd = new FormData()
  fd.append('file', file)
  if (slot) fd.append('slot', slot)
  const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Upload failed')
  return data.url
}

function ReplaceButton({ busy, onFile, children }) {
  const inputRef = useRef(null)
  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          e.target.value = ''
          if (f) onFile(f)
        }}
      />
      <button
        type="button"
        disabled={!!busy}
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:border-[#4CAF50] hover:text-[#4CAF50] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {busy ? 'Uploading...' : children}
      </button>
    </>
  )
}

function Thumb({ src, label }) {
  return (
    <div className="w-full h-24 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0">
      {src ? (
        <img src={src} alt={label} className="max-w-full max-h-full object-contain p-1" />
      ) : (
        <span className="text-xs text-gray-400 px-2 text-center">No image</span>
      )}
    </div>
  )
}

function SlotHint({ slot }) {
  const s = SLOT_SPECS[slot]
  if (!s) return null
  return (
    <div className="mt-2 rounded-lg bg-gray-50 border border-gray-100 px-3 py-2 text-[11px] leading-relaxed text-gray-500 space-y-0.5">
      <p><span className="font-medium text-gray-600">Recommended:</span> {s.recW} × {s.recH} px ({s.aspect})</p>
      <p><span className="font-medium text-gray-600">Max:</span> {s.maxW} × {s.maxH} px &middot; {s.maxKB} KB</p>
      <p><span className="font-medium text-gray-600">Format:</span> {s.format}</p>
      {s.note && <p className="italic text-gray-400">{s.note}</p>}
    </div>
  )
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(null)
  const [assets, setAssets] = useState(defaultAssets)
  const [saving, setSaving] = useState('')
  const [notice, setNotice] = useState(null)
  const [loginError, setLoginError] = useState('')
  const [loginBusy, setLoginBusy] = useState(false)
  const assetsRef = useRef(defaultAssets)

  const setBoth = (next) => {
    assetsRef.current = next
    setAssets(next)
  }

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/assets', { cache: 'no-store' })
      if (res.status === 401) { setAuthed(false); return }
      const data = await res.json()
      if (!res.ok || !data.assets) { setAuthed(false); return }
      setBoth(data.assets)
      setAuthed(true)
    } catch {
      setAuthed(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const save = useCallback(async (next, label = 'Saved') => {
    const prev = assetsRef.current
    setSaving(label)
    setNotice(null)
    setBoth(next)
    try {
      const res = await fetch('/api/admin/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...next, version: (prev.version || 1) + 1 }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || 'Save failed')
      setBoth(data.assets)
      setNotice({ type: 'ok', text: 'Saved' })
    } catch (e) {
      setBoth(prev)
      setNotice({ type: 'err', text: e.message })
    } finally {
      setSaving('')
    }
  }, [])

  const handleFile = useCallback(async (file, apply, doneLabel, slot) => {
    setSaving('Uploading image...')
    try {
      const url = await uploadImage(file, slot)
      await save(apply(url), doneLabel || 'Saved')
    } catch (e) {
      setNotice({ type: 'err', text: e.message })
      setSaving('')
    }
  }, [save])

  const handleLogin = async (e) => {
    e.preventDefault()
    const password = e.target.password.value
    setLoginBusy(true)
    setLoginError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      setLoginBusy(false)
      await load()
    } catch (err) {
      setLoginBusy(false)
      setLoginError(err.message)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    setBoth(defaultAssets)
    setAuthed(false)
    setNotice(null)
  }

  if (authed === null) {
    return (
      <section className="flex items-center justify-center min-h-[70vh] pt-24 sm:pt-28 md:pt-36">
        <p className="text-gray-500">Checking session...</p>
      </section>
    )
  }

  if (!authed) {
    return (
      <section className="flex items-center justify-center min-h-[70vh] px-4 pt-24 sm:pt-28 md:pt-36">
        <div className="card w-full max-w-md">
          <h1 className="font-heading font-bold text-2xl text-[#0B3D24] mb-1">Admin Login</h1>
          <p className="text-sm text-gray-500 mb-6">Enter the admin password to manage images.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
              <input id="password" name="password" type="password" required autoFocus
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors" />
            </div>
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm" role="alert">{loginError}</div>
            )}
            <button type="submit" disabled={loginBusy} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
              {loginBusy ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-4">Password is set via the <code className="bg-gray-100 px-1 rounded">ADMIN_PASSWORD</code> environment variable.</p>
        </div>
      </section>
    )
  }

  const a = assets

  return (
    <section className="section-padding bg-gray-50 min-h-screen !pt-24 sm:!pt-28 md:!pt-36">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-heading font-bold text-3xl text-[#0B3D24]">Image Manager</h1>
            <p className="text-gray-500 text-sm mt-1">Update company logos and website images. Changes apply immediately.</p>
          </div>
          <div className="flex items-center gap-3">
            {saving ? (
              <span className="text-sm font-medium text-[#4CAF50] animate-pulse">{saving}</span>
            ) : notice ? (
              <span className={`text-sm font-medium ${notice.type === 'ok' ? 'text-[#4CAF50]' : 'text-red-600'}`}>{notice.text}</span>
            ) : null}
            <button onClick={handleLogout} className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:border-red-300 hover:text-red-600 transition-colors">
              Logout
            </button>
          </div>
        </div>

        <div className="card mb-6">
          <h2 className="font-heading font-bold text-xl text-[#0B3D24] mb-5">Branding</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {brandingSlots.map((slot) => (
              <div key={slot.key} className="border border-gray-100 rounded-xl p-4 flex flex-col justify-between gap-3 bg-white">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">{slot.label}</p>
                  <Thumb src={a[slot.key]} label={slot.label} />
                  <SlotHint slot={slot.key} />
                </div>
                <ReplaceButton busy={saving} onFile={(f) => handleFile(f, (url) => ({ ...a, [slot.key]: url }), 'Saved', slot.key)}>
                  Replace Image
                </ReplaceButton>
              </div>
            ))}
          </div>
        </div>

        <LogoEditor
          title="Technology Partners — Homepage Marquee"
          kind="partner"
          assets={a}
          busy={saving}
          save={save}
          handleFile={handleFile}
        />

        <LogoEditor
          title="Client Logos — Our Clients Page"
          kind="client"
          assets={a}
          busy={saving}
          save={save}
          handleFile={handleFile}
        />

        <div className="card mb-6">
          <h2 className="font-heading font-bold text-xl text-[#0B3D24] mb-5">Website Images</h2>

          <h3 className="font-heading font-semibold text-[#0B3D24] text-base mb-1 mt-2">Service Images</h3>
          <p className="text-xs text-gray-400 mb-3">Landscape 3 : 2 photos, 1536 × 1024 px recommended</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(serviceLabels).map(([key, label]) => (
              <div key={key} className="border border-gray-100 rounded-xl p-4 flex flex-col justify-between gap-3 bg-white">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
                  <Thumb src={a.serviceImages[key]} label={label} />
                  <SlotHint slot="service" />
                </div>
                <ReplaceButton busy={saving} onFile={(f) => handleFile(f, (url) => ({ ...a, serviceImages: { ...a.serviceImages, [key]: url } }), 'Saved', 'service')}>
                  Replace Image
                </ReplaceButton>
              </div>
            ))}
          </div>

          <h3 className="font-heading font-semibold text-[#0B3D24] text-base mb-1 mt-8">Industry Images</h3>
          <p className="text-xs text-gray-400 mb-3">Portrait 2 : 3, 1000 × 1500 px recommended</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(industryLabels).map(([key, label]) => (
              <div key={key} className="border border-gray-100 rounded-xl p-4 flex flex-col justify-between gap-3 bg-white">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
                  <Thumb src={a.industryImages[key]} label={label} />
                  <SlotHint slot="industry" />
                </div>
                <ReplaceButton busy={saving} onFile={(f) => handleFile(f, (url) => ({ ...a, industryImages: { ...a.industryImages, [key]: url } }), 'Saved', 'industry')}>
                  Replace Image
                </ReplaceButton>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function LogoEditor({ title, kind, assets, busy, save, handleFile }) {
  const isPartner = kind === 'partner'
  const slot = isPartner ? 'partner' : 'client'
  const listKey = isPartner ? 'partners' : 'clients'
  const labelField = isPartner ? 'alt' : 'name'
  const items = assets[listKey] || []
  const addLabel = isPartner ? 'Add Partner' : 'Add Client'

  const [showAdd, setShowAdd] = useState(false)
  const [addBusy, setAddBusy] = useState(false)
  const [addErr, setAddErr] = useState('')
  const [pendingFile, setPendingFile] = useState(null)

  const updateItems = (nextItems, label) => save({ ...assets, [listKey]: nextItems }, label)

  const replaceItem = (entry, file) =>
    handleFile(file, (url) => ({ ...assets, [listKey]: items.map((it) => (it.id === entry.id ? { ...it, src: url } : it)) }), 'Saved', slot)

  const removeItem = (entry) => updateItems(items.filter((it) => it.id !== entry.id), 'Item removed')

  const commitLabel = (entry, value) => {
    const clean = (value || '').trim()
    const other = items.map((it) => (it.id === entry.id ? { ...it, [labelField]: clean } : it))
    if (clean && clean !== entry[labelField]) save({ ...assets, [listKey]: other })
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    const text = e.target.text.value.trim()
    const file = pendingFile
    if (!file) { setAddErr('Choose an image file first.'); return }
    if (!text) { setAddErr(isPartner ? 'Enter an alt text for the partner.' : 'Enter a client name.'); return }
    setAddBusy(true)
    setAddErr('')
    try {
      const url = await uploadImage(file, slot)
      const entry = { id: `${kind}-${Date.now()}`, src: url, [labelField]: text }
      await save({ ...assets, [listKey]: [...items, entry] }, 'Saved')
      setShowAdd(false)
      e.target.reset()
    } catch (err) {
      setAddErr(err.message)
    } finally {
      setAddBusy(false)
    }
  }

  return (
    <div className="card mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
        <h2 className="font-heading font-bold text-xl text-[#0B3D24]">{title}</h2>
        <button
          type="button"
          onClick={() => setShowAdd((v) => !v)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#4CAF50] to-[#8BC34A] text-white text-sm font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all"
        >
          {showAdd ? 'Cancel' : `+ ${addLabel}`}
        </button>
      </div>
      <p className="text-xs text-gray-400 mb-4">{SLOT_SPECS[slot].recW} × {SLOT_SPECS[slot].recH} px recommended · max {SLOT_SPECS[slot].maxKB} KB</p>

      <div className="space-y-3">
        {items.map((entry) => (
          <div key={entry.id} className="border border-gray-100 rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4 bg-white">
            <div className="w-full md:w-36 shrink-0">
              <Thumb src={entry.src} label={entry[labelField] || entry.id} />
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                {isPartner ? 'Alt text' : 'Client name'}
              </label>
              <input
                type="text"
                defaultValue={entry[labelField]}
                onBlur={(e) => commitLabel(entry, e.target.value)}
                maxLength={isPartner ? 140 : 180}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <ReplaceButton busy={busy} onFile={(f) => replaceItem(entry, f)}>
                Replace
              </ReplaceButton>
              <button
                type="button"
                disabled={!!busy}
                onClick={() => removeItem(entry)}
                className="inline-flex items-center px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:border-red-300 hover:text-red-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {items.length === 0 && !showAdd && (
          <p className="text-sm text-gray-400 text-center py-6">No entries. Click &ldquo;{addLabel}&rdquo; to add one.</p>
        )}

        {showAdd && (
          <form onSubmit={handleAdd} className="border border-dashed border-[#4CAF50]/40 rounded-xl p-4 space-y-3 bg-green-50/40">
            <p className="text-sm font-medium text-[#0B3D24]">{addLabel}</p>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">
                  {isPartner ? 'Alt text / partner name' : 'Client name'}
                </label>
                <input name="text" type="text" required maxLength={isPartner ? 140 : 180}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wide">Logo image</label>
                <input
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPendingFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-gray-600 file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#4CAF50] file:text-white hover:file:bg-[#388E3C] transition-colors"
                />
              </div>
            </div>
            <SlotHint slot={slot} />
            {addErr && <p className="text-sm text-red-600">{addErr}</p>}
            <button
              type="submit"
              disabled={addBusy}
              className="btn-primary text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {addBusy ? 'Adding...' : addLabel}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
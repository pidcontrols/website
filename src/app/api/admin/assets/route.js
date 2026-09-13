import { gcUnusedUploads, isAuthed, readAssets, sanitizeAssets, writeAssets } from '@/lib/assets-server'

export async function GET(request) {
  if (!isAuthed(request)) return Response.json({ error: 'Unauthorized.' }, { status: 401 })
  try {
    return Response.json({ assets: await readAssets() })
  } catch (error) {
    console.error('Failed to read assets:', error.message)
    return Response.json({ error: 'Could not load images.' }, { status: 500 })
  }
}

export async function POST(request) {
  if (!isAuthed(request)) return Response.json({ error: 'Unauthorized.' }, { status: 401 })

  let body
  try { body = await request.json() } catch { body = null }

  const sanitized = sanitizeAssets(body)
  if (!sanitized) {
    return Response.json({ error: 'Invalid assets payload.' }, { status: 400 })
  }

  try {
    const previous = await readAssets()
    await writeAssets(sanitized)
    const removed = await gcUnusedUploads(previous, sanitized)
    const latest = await readAssets()
    return Response.json({ success: true, assets: latest, removed })
  } catch (error) {
    console.error('Failed to write assets manifest:', error.message)
    return Response.json({ error: 'Could not save changes.' }, { status: 500 })
  }
}
import { readAssets } from '@/lib/assets-server'

export async function GET() {
  try {
    const assets = await readAssets()
    return Response.json(assets, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('Failed to read assets:', error.message)
    return Response.json({ error: 'Could not load assets.' }, { status: 500 })
  }
}
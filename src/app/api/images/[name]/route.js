import { dbGetImage } from '@/lib/db'

const SAFE_NAME = /^[A-Za-z0-9._-]{1,120}$/

export async function GET(request, { params }) {
  const { name } = await params
  if (!SAFE_NAME.test(name)) return new Response('Not found', { status: 404 })

  const image = await dbGetImage(name)
  if (!image) return new Response('Not found', { status: 404 })

  return new Response(image.data, {
    headers: {
      'Content-Type': image.contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
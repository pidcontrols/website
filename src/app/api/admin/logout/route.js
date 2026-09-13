import { expiredCookie } from '@/lib/assets-server'

export async function POST() {
  return Response.json({ success: true }, {
    headers: { 'Set-Cookie': expiredCookie() },
  })
}
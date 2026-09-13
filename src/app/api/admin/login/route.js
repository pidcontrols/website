import { sessionCookie, signToken } from '@/lib/assets-server'

export async function POST(request) {
  const { password } = await request.json().catch(() => ({}))

  const envPassword = process.env.ADMIN_PASSWORD || ''
  if (!envPassword) {
    return Response.json({ error: 'ADMIN_PASSWORD is not configured on the server.' }, { status: 503 })
  }

  if (typeof password !== 'string' || password.length === 0 || password !== envPassword) {
    return Response.json({ error: 'Invalid password.' }, { status: 401 })
  }

  const token = signToken()
  return Response.json({ success: true }, {
    headers: { 'Set-Cookie': sessionCookie(token) },
  })
}
import nodemailer from 'nodemailer'
import path from 'path'
import { readFileSync } from 'fs'

const rateLimitMap = new Map()

function getRateLimit(ip) {
  const now = Date.now()
  const windowMs = 60000
  const maxRequests = 3
  const entry = rateLimitMap.get(ip)
  if (!entry || now - entry.timestamp > windowMs) {
    rateLimitMap.set(ip, { count: 1, timestamp: now })
    return false
  }
  if (entry.count >= maxRequests) return true
  entry.count++
  return false
}

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    if (getRateLimit(ip)) {
      return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await request.json()
    const { name, company, email, phone, service, message, _hp } = body

    if (_hp) {
      return Response.json({ success: true })
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    if (name.trim().length > 200 || company?.trim().length > 200 || email.trim().length > 254 || phone?.trim().length > 50 || service?.trim().length > 200 || message.trim().length > 5000) {
      return Response.json({ error: 'Input too long.' }, { status: 400 })
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM, EMAIL_TO } = process.env
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !EMAIL_FROM || !EMAIL_TO) {
      console.error('Contact email is not fully configured.')
      return Response.json({ error: 'We could not send your message right now. Please try again later.' }, { status: 503 })
    }

    const escapeHtml = (value) => String(value || '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character])
    const details = [
      ['Name', name.trim()],
      ['Email', email.trim()],
      ['Company', company?.trim() || 'N/A'],
      ['Phone', phone?.trim() || 'N/A'],
      ['Service', service?.trim() || 'Not specified'],
      ['Message', message.trim()],
    ]
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      // Zoho displays app passwords in spaced groups; SMTP expects the continuous token.
      auth: { user: SMTP_USER.trim(), pass: SMTP_PASS.replace(/\s/g, '') },
    })

    await transporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: email.trim(),
      subject: `New Website Enquiry - ${name.trim().replace(/[\r\n]/g, ' ')}`,
      text: details.map(([label, value]) => `${label}: ${value}`).join('\n\n'),
      html: `<h2>New Website Enquiry</h2><table>${details.map(([label, value]) => `<tr><th align="left" style="padding: 4px 12px 4px 0; vertical-align: top;">${escapeHtml(label)}</th><td style="white-space: pre-wrap;">${escapeHtml(value)}</td></tr>`).join('')}</table>`,
    })

    let logoAttachments = []
    try {
      const logoPath = path.join(process.cwd(), 'public', 'images', 'logo.png')
      const logoBuffer = readFileSync(logoPath)
      logoAttachments = [{ filename: 'logo.png', content: logoBuffer, cid: 'pid_logo' }]
    } catch { /* logo unavailable — send without it */ }

    const logoHtml = logoAttachments.length
      ? `<img src="cid:pid_logo" alt="PID Controls" style="display:block;height:40px;width:auto;" />`
      : `<span style="font-size:20px;font-weight:700;color:#ffffff;">PID Controls</span>`

    await transporter.sendMail({
      from: EMAIL_FROM,
      to: email.trim(),
      attachments: logoAttachments,
      subject: 'We have received your enquiry — PID Controls',
      text: `Hello ${name.trim()},\n\nYour response is noted. Thank you for contacting PID Controls.\n\nWe have received your enquiry${service?.trim() ? ` about ${service.trim()}` : ''} and our team will get back to you soon.\n\nRegards,\nPID Controls\nwww.pid-controls.com`,
      html: `<!doctype html>
        <html lang="en">
          <body style="margin:0;padding:0;background:#f3f7f4;font-family:Arial,Helvetica,sans-serif;color:#25352b;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f7f4;padding:32px 16px;">
              <tr><td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 28px rgba(11,61,36,.10);">
                  <tr><td style="background:#0B3D24;padding:30px 36px;">
                    <div style="font-size:24px;line-height:1.2;font-weight:700;letter-spacing:.2px;color:#ffffff;">${logoHtml}</div>
                    <div style="margin-top:7px;font-size:12px;line-height:1.4;letter-spacing:1.4px;text-transform:uppercase;color:#c8dfcb;">Smarter facility solutions</div>
                  </td></tr>
                  <tr><td style="padding:36px;">
                    <div style="width:46px;height:46px;line-height:46px;text-align:center;border-radius:50%;background:#e7f5e8;color:#238b42;font-size:24px;font-weight:700;">✓</div>
                    <h1 style="margin:18px 0 10px;font-size:26px;line-height:1.25;color:#0B3D24;font-weight:700;">Your response is noted.</h1>
                    <p style="margin:0;font-size:16px;line-height:1.65;color:#526158;">Hello ${escapeHtml(name.trim())}, thank you for reaching out to PID Controls. Our team has received your enquiry and will get back to you soon.</p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:28px 0 0;background:#f6faf6;border:1px solid #d9eadb;border-radius:10px;">
                      <tr><td style="padding:18px 20px;">
                        <div style="font-size:12px;line-height:1.4;letter-spacing:1px;text-transform:uppercase;font-weight:700;color:#54825a;">Your enquiry</div>
                        <div style="margin-top:7px;font-size:16px;line-height:1.5;font-weight:700;color:#0B3D24;">${escapeHtml(service?.trim() || 'Consultation request')}</div>
                      </td></tr>
                    </table>
                    <p style="margin:28px 0 0;font-size:15px;line-height:1.65;color:#526158;">We look forward to helping you build a smarter, more efficient facility.</p>
                  </td></tr>
                  <tr><td style="padding:21px 36px;background:#f6faf6;border-top:1px solid #dfeae0;">
                    <div style="font-size:13px;line-height:1.6;color:#617167;">PID Controls &nbsp;•&nbsp; Hyderabad, India<br><a href="https://www.pid-controls.com" style="color:#238b42;text-decoration:none;font-weight:700;">www.pid-controls.com</a></div>
                  </td></tr>
                </table>
              </td></tr>
            </table>
          </body>
        </html>`,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Contact form email error:', error.message)
    return Response.json({ error: 'We could not send your message right now. Please try again or contact us directly at sales@pid-controls.com.' }, { status: 500 })
  }
}

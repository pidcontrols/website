import { ALLOWED_EXTENSIONS, contentTypeFor, isAuthed, MAX_UPLOAD_BYTES, safeUploadFilename, saveUploadedImage, validateUpload } from '@/lib/assets-server'

export async function POST(request) {
  if (!isAuthed(request)) return Response.json({ error: 'Unauthorized.' }, { status: 401 })

  let formData
  try { formData = await request.formData() } catch { formData = null }
  if (!formData) return Response.json({ error: 'Missing form data.' }, { status: 400 })

  const file = formData.get('file')
  if (!file || typeof file !== 'object' || !('arrayBuffer' in file) || file.size === 0) {
    return Response.json({ error: 'No file uploaded.' }, { status: 400 })
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return Response.json({ error: 'File is too large. Maximum size is 5 MB.' }, { status: 400 })
  }

  const ext = `.${(file.name.split('.').pop() || '').toLowerCase()}`
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return Response.json({ error: `Unsupported file type. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}` }, { status: 400 })
  }

  const filename = safeUploadFilename(file.name)
  if (!filename) return Response.json({ error: 'Unsupported file type.' }, { status: 400 })

  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const slot = formData.get('slot') || null
    const specError = validateUpload({ slot, ext, sizeBytes: file.size, buffer })
    if (specError) return Response.json({ error: specError }, { status: 400 })
    await saveUploadedImage(filename, buffer, contentTypeFor(ext))
    return Response.json({ success: true, url: `/api/images/${filename}` })
  } catch (error) {
    console.error('Upload failed:', error.message)
    return Response.json({ error: `Upload failed: ${error.message}` }, { status: 500 })
  }
}
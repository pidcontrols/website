const fs = require('fs')
const path = require('path')
const PDFDocument = require('pdfkit')

const ROOT = path.resolve(__dirname, '..')
const OUT = path.join(ROOT, 'docs', 'Image-Upload-Guide.pdf')
fs.mkdirSync(path.dirname(OUT), { recursive: true })

const SLOT_SPECS = {
  logo:        { label: 'Header & Footer Logo',       recW: 1536, recH: 1024, maxW: 2400, maxH: 1600, maxKB: 400, aspect: '3 : 2',  note: 'PNG with transparency strongly recommended', format: 'PNG (preferred) / WebP / JPG' },
  yearsBadge:  { label: 'Years of Excellence Badge',  recW: 1536, recH: 1024, maxW: 2400, maxH: 1600, maxKB: 400, aspect: '3 : 2',  note: 'PNG with transparency preferred',           format: 'PNG / WebP / JPG' },
  brandsStrip: { label: 'Brands Strip (Why Choose Us)', recW: 2400, recH: 400,  maxW: 4800, maxH: 1000, maxKB: 500, aspect: '6 : 1',  note: 'Wide panoramic strip of all brand logos',    format: 'PNG / JPG' },
  partner:     { label: 'Technology Partner Logo',    recW: 900,  recH: 400,  maxW: 2000, maxH: 1200, maxKB: 250, aspect: 'wide',   note: 'Transparent PNG; logo fills the 150 × 90 px display box', format: 'PNG (preferred) / WebP / SVG' },
  client:      { label: 'Client Logo',                recW: 1200, recH: 600,  maxW: 2400, maxH: 1600, maxKB: 250, aspect: 'varies', note: 'High-res company logo, no screenshots',     format: 'PNG / JPG / WebP' },
  service:     { label: 'Service Image',              recW: 1536, recH: 1024, maxW: 2000, maxH: 1500, maxKB: 800, aspect: '3 : 2',  note: 'Crisp photo, no embedded text or watermarks', format: 'JPG / PNG / WebP' },
  industry:    { label: 'Industry Image',             recW: 1000, recH: 1500, maxW: 1600, maxH: 2000, maxKB: 800, aspect: '2 : 3',  note: 'Consistent look across all 6 industries',   format: 'JPG / PNG / WebP' },
}

const CURRENT_IMAGES = [
  { file: 'logo.png',                 slot: 'logo',        dims: '1536 × 1024', size: '132.9 KB' },
  { file: '10-years-excellence.png',  slot: 'yearsBadge',  dims: '1536 × 1024', size: '327.8 KB' },
  { file: 'company1.png',             slot: 'partner',     dims: '1280 × 591',  size: '89.3 KB' },
  { file: 'company2.png',             slot: 'partner',     dims: '1280 × 524',  size: '61.7 KB' },
  { file: 'company3.png',             slot: 'partner',     dims: '1280 × 574',  size: '80.0 KB' },
  { file: 'company4.png',             slot: 'partner',     dims: '1280 × 539',  size: '64.6 KB' },
  { file: 'company5.png',             slot: 'partner',     dims: '1280 × 527',  size: '30.6 KB' },
  { file: 'company6.png',             slot: 'partner',     dims: '1280 × 693',  size: '99.5 KB' },
  { file: 'company7.png',             slot: 'partner',     dims: '1280 × 518',  size: '99.2 KB' },
  { file: 'company8.png',             slot: 'partner',     dims: '1280 × 328',  size: '51.9 KB' },
  { file: 'company9.png',             slot: 'partner',     dims: '1280 × 557',  size: '107.3 KB' },
  { file: 'aurigene.jpg',             slot: 'client',      dims: '1600 × 947',  size: '47.0 KB' },
  { file: 'camfil.jpg',               slot: 'client',      dims: '1340 × 484',  size: '32.4 KB' },
  { file: 'ichor.png',                slot: 'client',      dims: '714 × 172',   size: '23.7 KB' },
  { file: 'ilean.jpg',                slot: 'client',      dims: '485 × 401',   size: '24.5 KB' },
  { file: 'popvax.png',               slot: 'client',      dims: '914 × 326',   size: '24.9 KB' },
  { file: 'bms.png',                  slot: 'service',     dims: '1536 × 1024', size: '467.2 KB' },
  { file: 'hvac.png',                 slot: 'service',     dims: '1536 × 1024', size: '500.9 KB' },
  { file: 'ems.png',                  slot: 'service',     dims: '1536 × 1024', size: '452.1 KB' },
  { file: 'Enms.png',                 slot: 'service',     dims: '1536 × 1024', size: '380.7 KB' },
  { file: 'chillerplant.png',         slot: 'service',     dims: '1536 × 1024', size: '462.1 KB' },
  { file: 'hmi.png',                  slot: 'service',     dims: '1536 × 1024', size: '491.6 KB' },
  { file: 'IAQ.png',                  slot: 'service',     dims: '1536 × 1024', size: '462.1 KB' },
  { file: 'controlpanels.png',        slot: 'service',     dims: '1536 × 1024', size: '674.1 KB' },
  { file: 'commercial.png',           slot: 'industry',    dims: '1010 × 1558', size: '577.2 KB' },
  { file: 'healthcare.png',           slot: 'industry',    dims: '1024 × 1535', size: '492.7 KB' },
  { file: 'pharmaceutical.png',       slot: 'industry',    dims: '1009 × 1558', size: '522.5 KB' },
  { file: 'industrial.png',           slot: 'industry',    dims: '1030 × 1526', size: '532.8 KB' },
  { file: 'educational.png',          slot: 'industry',    dims: '1009 × 1559', size: '488.8 KB' },
  { file: 'datacenters.png',          slot: 'industry',    dims: '1086 × 1448', size: '610.5 KB' },
]

const GREEN  = '#0B3D24'
const MID    = '#4CAF50'
const LIME   = '#8BC34A'
const LIGHT  = '#E8F5E9'
const GRAY   = '#F5F5F5'
const TXT    = '#333333'
const SUBTXT = '#666666'

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 52, bottom: 52, left: 50, right: 50 },
  font: 'Helvetica',
})

const stream = fs.createWriteStream(OUT)
doc.pipe(stream)

let y = doc.y
const pageW = 595.28 - 100
const colW = (pageW - 12) / 2

/* ── helpers ──────────────────────────────────────────── */

let pageNo = 0
function renderFooter() {
  const bottom = doc.page.height - 52 - 10
  doc.fontSize(8).fillColor(SUBTXT)
  doc.text('PID Controls — Image Upload Guide', 50, bottom, { width: pageW / 2, align: 'left' })
  doc.text(`Page ${pageNo + 1}`, 50, bottom, { width: pageW, align: 'center' })
  doc.text('Internal — Admin use only', 50, bottom, { width: pageW, align: 'right' })
}
function newPage() {
  renderFooter()
  doc.addPage()
  pageNo += 1
  y = doc.y
}

function h1(text) { doc.fontSize(22).fillColor(GREEN).font('Helvetica-Bold').text(text, 50, y, { width: pageW }); y = doc.y + 6 }
function h2(text) { doc.fontSize(15).fillColor(GREEN).font('Helvetica-Bold').text(text, 50, y, { width: pageW }); y = doc.y + 4 }
function h3(text) { doc.fontSize(12).fillColor(MID).font('Helvetica-Bold').text(text, 50, y, { width: pageW }); y = doc.y + 3 }
function p(text, opts = {}) { doc.fontSize(opts.size || 10).fillColor(opts.color || TXT).font(opts.bold ? 'Helvetica-Bold' : 'Helvetica').text(text, opts.x || 50, y, { width: opts.w || pageW, align: opts.align || 'left', lineGap: opts.lineGap || 1.5 }); y = doc.y + (opts.mb || 4) }
function bullet(text, indent = 62) { doc.fontSize(10).fillColor(TXT).font('Helvetica').text('  \u2022  ' + text, indent, y, { width: pageW - (indent - 50) }); y = doc.y + 2 }
function smallSep() { doc.save().moveTo(50, y).lineTo(50 + pageW, y).lineWidth(0.5).strokeColor(LIGHT).stroke().restore(); y += 8 }
function checkPage(needed = 80) { if (y + needed > doc.page.height - 80) newPage() }

function table(headers, rows, opts = {}) {
  const cw = opts.colWidths || headers.map(() => pageW / headers.length)
  const lh = 14
  const padX = 4, padY = 3

  // header
  doc.rect(50, y, pageW, lh + padY * 2).fill(LIGHT)
  let x = 50 + padX
  doc.fontSize(9).fillColor(GREEN).font('Helvetica-Bold')
  headers.forEach((h, i) => { doc.text(h, x, y + padY, { width: cw[i] - padX * 2 }); x += cw[i] })
  y += lh + padY * 2 + 1

  // rows
  rows.forEach((row) => {
    checkPage(lh + padY * 2 + 4)
    row.forEach((cell, ci) => {
      let x2 = 50 + padX + cw.slice(0, ci).reduce((a, b) => a + b, 0)
      doc.fontSize(8).fillColor(TXT).font(ci === 0 ? 'Helvetica-Bold' : 'Helvetica')
      doc.text(String(cell), x2, y + padY, { width: cw[ci] - padX * 2, lineGap: 1 })
    })
    const rowH = Math.max(lh, ...row.map((cell, ci) => {
      const w = cw[ci] - padX * 2
      return doc.fontSize(8).heightOfString(String(cell), { width: w }) + padY * 2
    }))
    y += rowH + 1
    if (y + lh + padY * 2 > doc.page.height - 80) newPage()
  })
  y += 6
}

/* ══════════════════════════════════════════════════════
   COVER PAGE
   ══════════════════════════════════════════════════════ */
doc.rect(0, 0, 595.28, 200).fill(GREEN)
doc.fontSize(30).fillColor('#ffffff').font('Helvetica-Bold')
  .text('PID Controls', 50, 58, { width: pageW, align: 'left' })
doc.fontSize(18).fillColor(LIME)
  .text('Building Automation & HVAC Solutions', 50, 95, { width: pageW, align: 'left' })
doc.fontSize(26).fillColor('#ffffff').font('Helvetica-Bold')
  .text('Website Image Manager', 50, 140, { width: pageW, align: 'left' })
doc.fontSize(14).fillColor(LIME)
  .text('Complete Image Upload & Dimensions Guide', 50, 172, { width: pageW, align: 'left' })

y = 230
doc.fontSize(11).fillColor(TXT).font('Helvetica')
doc.text('Version 1.0  \u2022  September 2026', 50, y, { width: pageW }); y = doc.y + 4
doc.text('Prepared for the site administrator \u2014 how to upload, size limits, exact pixel dimensions,', 50, y, { width: pageW }); y = doc.y + 2
doc.text('file restrictions, and step-by-step instructions for every image section on the website.', 50, y, { width: pageW }); y = doc.y + 18

smallSep()

h2('Table of Contents')
y = doc.y + 4
const toc = [
  '1.  Overview & Access',
  '2.  How to Upload an Image',
  '3.  Image Dimensions & Size Rules  (Master Table)',
  '4.  Per-Section Dimension Reference',
  '5.  Enforced Upload Restrictions',
  '6.  Design & Quality Guidelines',
  '7.  Adding & Removing Partners / Clients',
  '8.  Deleting Unused Files',
  '9.  Current Live Image Inventory',
  '10. FAQ & Troubleshooting',
]
toc.forEach(t => { doc.fontSize(10).fillColor(TXT).font('Helvetica').text(t, 62, y, { width: pageW - 12 }); y = doc.y + 3 })

/* ══════════════════════════════════════════════════════
   1  OVERVIEW
   ══════════════════════════════════════════════════════ */
newPage()
h1('1.  Overview & Access')
p('The PID Controls website admin panel lets you manage all website images from a single dashboard.')
y += 4

h2('Access the Admin Panel')
bullet('Open  http://localhost:3000/admin  (or your live domain /admin)')
bullet('Enter the admin password stored in the ADMIN_PASSWORD environment variable on your server')
bullet('The session lasts 7 days; after that you must log in again')
y += 6

h2('What You Can Manage')
bullet('Header & Footer Logo  \u2014  the PID Controls logo shown on every page')
bullet('Years of Excellence Badge  \u2014  10+ years badge on the home page')
bullet('Brands Strip  \u2014  panoramic banner of technology brand logos (Why Choose Us page)')
bullet('Technology Partner Logos  \u2014  scrolling marquee on the home page')
bullet('Client Logos  \u2014  grid on the Our Clients page')
bullet('Service Images  \u2014  one image per service on the Services page (8 images)')
bullet('Industry Images  \u2014  one image per industry on the Industries page (6 images)')
y += 6

p('All image paths are stored in a single JSON manifest: src/data/site-assets.json.', { bold: true })

/* ══════════════════════════════════════════════════════
   2  HOW TO UPLOAD
   ══════════════════════════════════════════════════════ */
newPage()
h1('2.  How to Upload an Image')

h2('Replace an Existing Image')
bullet('Navigate to the relevant section (Branding, Partners, Clients, Services, or Industries)')
bullet('Click "Replace Image" next to the image you want to swap')
bullet('Select your new file from your computer')
bullet('The upload runs automatically, then click "Save"')
y += 6

h2('Add a New Partner or Client')
bullet('Click "+ Add Partner" or "+ Add Client"')
bullet('Fill in the alt text or client name')
bullet('Select an image file (PNG with transparent background for partners)')
bullet('Click "Add Partner" / "Add Client" to save')
y += 6

h2('Remove a Partner or Client')
bullet('Click "Remove" next to the entry')
bullet('The file is automatically deleted from the server (garbage-collected)')
y += 6

checkPage(60)
h2('Upload Flow Under the Hood')
p('1.  Browser sends the file to  POST /api/admin/upload  with your session cookie')
p('2.  Server validates: file type, global 5 MB limit, slot-specific size & dimension limits')
p('3.  Server writes the file to  public/images/  with a unique timestamped filename')
p('4.  The new image URL is added to the manifest, and the old file (if unreferenced) is deleted')
y += 4
p('Tip: Always prepare your image before uploading \u2014 resize it to the recommended dimensions', { color: MID, bold: true })
p('listed below. The server will reject uploads that exceed the per-section maximum.', { color: MID })

/* ══════════════════════════════════════════════════════
   3  MASTER TABLE
   ══════════════════════════════════════════════════════ */
newPage()
h1('3.  Image Dimensions & Size Rules  \u2014  Master Table')
p('Every image upload is validated against the rules below. Use the "Recommended" column', { size: 10 })
p('to prepare your image for the best visual quality on the website.', { size: 10, mb: 10 })

const masterHeaders = ['Section', 'Rec. Dims (px)', 'Rec. Size', 'Max Dims', 'Max KB', 'Aspect', 'Format']
const masterCW = [92, 64, 52, 64, 40, 80, 103]
const masterRows = [
  ['Logo',              '1536 × 1024', '< 135 KB', '2400 × 1600', '400',  '3 : 2', 'PNG transparent'],
  ['Years Badge',       '1536 × 1024', '< 330 KB', '2400 × 1600', '400',  '3 : 2', 'PNG / JPG'],
  ['Brands Strip',      '2400 × 400',  '< 500 KB', '4800 × 1000', '500',  '6 : 1', 'PNG / JPG'],
  ['Partner Logo',      '900 × 400',   '< 110 KB', '2000 × 1200', '250',  'wide',  'PNG transparent'],
  ['Client Logo',       '1200 × 600',  '< 50 KB',  '2400 × 1600', '250',  'varies','PNG / JPG / WebP'],
  ['Service Image',     '1536 × 1024', '< 680 KB', '2000 × 1500', '800',  '3 : 2', 'JPG / PNG / WebP'],
  ['Industry Image',    '1000 × 1500', '< 610 KB', '1600 × 2000', '800',  '2 : 3', 'JPG / PNG / WebP'],
]
table(masterHeaders, masterRows, { colWidths: masterCW })

p('Note: "Rec. Size" shows the current live file size. The "Max KB" is a hard server-side limit.', { size: 9, color: SUBTXT })
p('All uploads are also capped at a global 5 MB per file regardless of section.', { size: 9, color: SUBTXT })

/* ══════════════════════════════════════════════════════
   4  PER-SECTION DETAILS
   ══════════════════════════════════════════════════════ */
newPage()
h1('4.  Per-Section Dimension Reference')
y += 2

const sections = [
  { key: 'logo', title: 'Header & Footer Logo', location: 'Visible on every page in the header and footer' },
  { key: 'yearsBadge', title: 'Years of Excellence Badge', location: 'Home page, right side of the hero section' },
  { key: 'brandsStrip', title: 'Brands Strip', location: 'Why Choose Us page, full-width panoramic strip below the intro' },
  { key: 'partner', title: 'Technology Partner Logos', location: 'Home page, scrolling marquee between Services and Why Choose Us' },
  { key: 'client', title: 'Client Logos', location: 'Our Clients page, 3-column responsive grid' },
  { key: 'service', title: 'Service Images', location: 'Services page, alternating left/right of each service description' },
  { key: 'industry', title: 'Industry Images', location: 'Industries page, 3-column card grid' },
]

sections.forEach((s, i) => {
  const spec = SLOT_SPECS[s.key]
  checkPage(120)
  h2(`${i + 1}.  ${s.title}`)
  p(`Where:  ${s.location}`, { color: SUBTXT, size: 9 })
  y += 2

  p(`Recommended dimensions:   ${spec.recW} × ${spec.recH} px`, { bold: true })
  p(`Aspect ratio:                ${spec.aspect}`)
  p(`Maximum allowed:          ${spec.maxW} × ${spec.maxH} px`)
  p(`File size limit:              ${spec.maxKB} KB (global cap: 5 MB)`)
  p(`Format:                     ${spec.format}`)
  if (spec.note) p(`Note:                       ${spec.note}`, { color: MID, bold: true })
  y += 4
})

/* ══════════════════════════════════════════════════════
   5  RESTRICTIONS
   ══════════════════════════════════════════════════════ */
newPage()
h1('5.  Enforced Upload Restrictions')
p('The server enforces every rule below. If any rule fails, the upload is rejected', { size: 10 })
p('with a clear error message explaining what needs to change.', { size: 10, mb: 10 })

h2('Global Rules  (all uploads)')
bullet('File type:  PNG, JPG/JPEG, WebP, GIF, SVG, or AVIF  (anything else is rejected)')
bullet('File size:  maximum 5 MB per file')
bullet('Upload destination:  public/images/  \u2014 files are saved with a unique timestamped name')
bullet('No files with special characters or spaces in the name  (server sanitizes automatically)')
bullet('Old unreferenced uploaded files are deleted automatically when the manifest is saved')
y += 8

h2('Per-Section Rules  (enforced at upload time)')
p('When you upload an image from a specific section, the server also checks:')
bullet('Maximum pixel dimensions for that section  (see Master Table above)')
bullet('Maximum file size for that section  (stricter than the global 5 MB)')
bullet('If either limit is exceeded, the error message shows the recommended dimensions and limit')
y += 8

h2('Filename Rules')
bullet('Server generates a safe filename:  original-name-timestamp-random.ext')
bullet('Maximum 40 characters before the extension')
bullet('Only lowercase letters, numbers, hyphens, and underscores are kept')
bullet('Spaces, symbols, and non-ASCII characters are stripped')
bullet('Uploaded files cannot overwrite existing files  (timestamp + random suffix guarantees uniqueness)')
y += 6

h2('About SVG Files')
bullet('SVG files are allowed for partner logos (max 250 KB)')
bullet('SVG files do not have pixel dimensions \u2014 dimension checks are skipped for SVG')
bullet('Make sure your SVG is properly optimized and uses a reasonable viewBox')
y += 6

h2('About AVIF Files')
bullet('AVIF files are allowed and may offer the best compression at high quality')
bullet('Dimension limits still apply; AVIF headers are parsed by the server')

/* ══════════════════════════════════════════════════════
   6  DESIGN GUIDELINES
   ══════════════════════════════════════════════════════ */
newPage()
h1('6.  Design & Quality Guidelines')

h2('General Best Practices')
bullet('Always resize your image to the recommended dimensions before uploading')
bullet('Compress with TinyPNG, Squoosh, or Photopea  \u2014 aim for < 500 KB where possible')
bullet('Use descriptive filenames before uploading (the server will add a unique suffix)')
bullet('Avoid text, watermarks, or logos baked into photos  \u2014 keep the image clean')
y += 6

h2('Logos (Header / Footer / Years Badge)')
bullet('Use a PNG with transparent background whenever possible')
bullet('Place the logo on a transparent canvas, not white')
bullet('Keep a small margin around the logo so it does not touch the edge')
bullet('For the header logo: target width = 512 \u2013 1024 px')
y += 6

h2('Brands Strip')
bullet('Create one wide image containing all partner logos side by side')
bullet('Recommended canvas: 2400 × 400 px (6 : 1 aspect)')
bullet('Logos should have transparent backgrounds and sit on a transparent canvas')
bullet('Alternatively, a very light (#FAFAFA) background works')
bullet('Keep the strip visually balanced  \u2014 equal spacing between logos')
y += 6

checkPage(120)
h2('Partner & Client Logos')
bullet('Transparent PNGs preferred; WebP and SVG also accepted for partners')
bullet('The partner marquee display box is 150 × 90 px  \u2014 keep the logo tight in the frame')
bullet('Client logos appear in a half-page-wide box  \u2014 use a resolution of at least 600 px wide')
bullet('Avoid screenshots, low-resolution raster images, or pixelated exports')
y += 6

h2('Service Images (3 : 2 Landscape)')
bullet('Use a crisp photograph at 1536 × 1024 px')
bullet('Subject should fill the frame  \u2014 no borders, no rounded corners baked in')
bullet('Keep file under 800 KB; the current live files range from 380 \u2013 674 KB')
bullet('Suggested subjects: BMS panels, HVAC equipment, monitoring dashboards, control rooms')
y += 6

h2('Industry Images (2 : 3 Portrait)')
bullet('Portrait format at 1000 × 1500 px (2 : 3)')
bullet('All six industry images should have a consistent visual style')
bullet('Current live images use dark-toned, moody photography with a professional feel')
bullet('Do not add text or labels  \u2014 the industry title is already shown on the page')

/* ══════════════════════════════════════════════════════
   7  ADDING / REMOVING PARTNERS & CLIENTS
   ══════════════════════════════════════════════════════ */
newPage()
h1('7.  Adding & Removing Partners / Clients')

h2('Adding a New Partner')
bullet('Click "+ Add Partner" at the top of the Technology Partners section')
bullet('Enter the partner name as alt text  (this text appears on hover and is good for accessibility)')
bullet('Select the logo image file  (PNG with transparency recommended)')
bullet('Click "Add Partner"  \u2014 the file uploads, then the new partner appears in the list')
bullet('Partners display in a continuous scrolling marquee on the home page')
y += 6

h2('Adding a New Client')
bullet('Click "+ Add Client" at the top of the Client Logos section')
bullet('Enter the client company name')
bullet('Select the client logo image file')
bullet('Click "Add Client"  \u2014 the new client appears in the grid on the Our Clients page')
y += 6

h2('Editing a Partner / Client Name')
bullet('Click on the alt text or client name field next to any image')
bullet('Type the corrected text and click away (blur) to save')
y += 6

h2('Removing a Partner or Client')
bullet('Click "Remove" next to the entry you want to delete')
bullet('The entry disappears immediately')
bullet('If the uploaded file is no longer referenced anywhere else, it is deleted from public/images/')
bullet('If the same file was used in another section, it is kept until fully unreferenced')
y += 8

p('Important: partner order in the marquee is the same order shown in the admin list.', { bold: true })
p('Reorder by editing the JSON manifest directly if you need a specific sequence.', { color: SUBTXT, size: 9 })

/* ══════════════════════════════════════════════════════
   8  DELETING UNUSED FILES
   ══════════════════════════════════════════════════════ */
newPage()
h1('8.  Deleting Unused Files')
p('The admin panel includes automatic garbage collection (GC) to keep public/images/ tidy.', { mb: 8 })

h2('How It Works')
bullet('When you save the manifest (any edit), the server compares old vs new image references')
bullet('Any uploaded file that is no longer referenced is automatically deleted')
bullet('Only files uploaded via the admin panel are subject to GC  \u2014 original repo images are safe')
bullet('Uploaded files match the pattern:  name-timestamp-random.ext')
y += 6

h2('Example')
bullet('You upload a replacement for partner "Siemens"  \u2014 the new file is saved, old file deleted')
bullet('You remove a client whose logo was unique  \u2014 the logo file is deleted')
bullet('You remove a client whose logo was also used by a partner  \u2014 file stays (still referenced)')
y += 6

h2('Manual Cleanup')
bullet('If you need to delete a file manually, use your server\'s file manager or run:')
bullet('   rm public/images/filename.png')
bullet('Then update the manifest via the admin panel to point to a new image or clear the slot')

/* ══════════════════════════════════════════════════════
   9  LIVE INVENTORY
   ══════════════════════════════════════════════════════ */
newPage()
h1('9.  Current Live Image Inventory')
p('The table below lists every image currently referenced by the website, with exact', { size: 10 })
p('measured pixel dimensions and file sizes as of September 2026.', { size: 10, mb: 10 })

const invHeaders = ['File', 'Section', 'Dimensions (px)', 'File Size']
const invCW = [145, 80, 105, 80]
const invRows = CURRENT_IMAGES.map(i => [i.file, i.slot, i.dims, i.size])
table(invHeaders, invRows, { colWidths: invCW })

p('All files are located in  public/images/', { size: 9, color: SUBTXT, bold: true })
p('Dimensions were measured programmatically from image headers (PNG IHDR, JPEG SOF, etc.)', { size: 9, color: SUBTXT })

/* ══════════════════════════════════════════════════════
   10  FAQ
   ══════════════════════════════════════════════════════ */
newPage()
h1('10.  FAQ & Troubleshooting')

const faqs = [
  { q: 'My upload was rejected with "File too large"', a: 'The file exceeds 5 MB (global) or the section-specific limit. Resize and compress using TinyPNG or Squoosh.' },
  { q: 'My upload was rejected with "image is XXX × YYY px"', a: 'The image exceeds the maximum pixel dimensions for that section. Use an image editor (Photopea, GIMP, Photoshop) to resize to the recommended dimensions.' },
  { q: 'I get a 404 on a brands strip image', a: 'The Brands Strip slot is empty. Go to Admin > Branding > Brands Strip and upload your panoramic banner.' },
  { q: 'I removed a partner but the image file is still in public/images/', a: 'This happens if another slot references the same file. Check the full manifest. Files are only deleted when completely unreferenced.' },
  { q: 'My image looks blurry on the website', a: 'The image is being scaled up beyond its native resolution. Upload a larger source file matching the recommended dimensions.' },
  { q: 'I need to add more than one brand to the Brands Strip', a: 'Combine all brand logos into a single wide image (2400 × 400 px recommended) before uploading.' },
  { q: 'Can I use WebP for the logo?', a: 'Yes, WebP is accepted for all slots. However, PNG with transparency is strongly recommended for the header/footer logo.' },
  { q: 'How do I change the order of partners in the marquee?', a: 'The marquee order follows the partners array order in the JSON manifest. Edit the file directly at src/data/site-assets.json or re-add partners in the desired order.' },
  { q: 'Can I upload SVG files?', a: 'Yes, but only for partner logos (and client logos). SVG files skip dimension validation since they have no fixed pixel size.' },
  { q: 'The "Add Partner" form says "Choose an image file first"', a: 'You must select a file before clicking the submit button. The file picker may appear unresponsive in some browsers \u2014 try clicking it again.' },
]

faqs.forEach(({ q, a }, i) => {
  checkPage(70)
  doc.fontSize(10).fillColor(GREEN).font('Helvetica-Bold').text(`Q:  ${q}`, 50, y, { width: pageW }); y = doc.y + 2
  doc.fontSize(9).fillColor(TXT).font('Helvetica').text(`A:  ${a}`, 56, y, { width: pageW - 6 }); y = doc.y + 10
})

/* ── save ───────────────────────────────────────────── */
renderFooter()
doc.end()
stream.on('finish', () => console.log('PDF generated:', OUT))
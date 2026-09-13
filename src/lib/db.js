import pg from 'pg'

const connectionString = process.env.DATABASE_URL

let pool = null
let schemaPromise = null

function getPool() {
  if (!connectionString) return null
  if (!pool) {
    pool = new pg.Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 4,
      connectionTimeoutMillis: 10000,
      idleTimeoutMillis: 30000,
    })
    pool.on('error', () => {})
  }
  return pool
}

export function isDbConfigured() {
  return !!connectionString
}

export function ensureSchema() {
  if (!schemaPromise) {
    const p = getPool()
    if (!p) return Promise.reject(new Error('DATABASE_URL is not set.'))
    schemaPromise = p.query(`
      CREATE TABLE IF NOT EXISTS manifest (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
      CREATE TABLE IF NOT EXISTS site_images (
        name TEXT PRIMARY KEY,
        data BYTEA NOT NULL,
        content_type TEXT NOT NULL,
        bytes INTEGER NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `).then(null, (e) => { schemaPromise = null; throw e })
  }
  return schemaPromise
}

export async function dbReadManifest() {
  const p = getPool()
  if (!p) return null
  await ensureSchema()
  const { rows } = await p.query('SELECT data::text AS data FROM manifest WHERE id = $1', ['default'])
  return rows.length ? JSON.parse(rows[0].data) : null
}

export async function dbWriteManifest(assets) {
  const p = getPool()
  if (!p) throw new Error('DATABASE_URL is not set.')
  await ensureSchema()
  await p.query(
    `INSERT INTO manifest (id, data, updated_at) VALUES ('default', $1::jsonb, now())
     ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
    [JSON.stringify(assets)],
  )
}

export async function dbSaveImage(name, contentType, buffer) {
  const p = getPool()
  if (!p) throw new Error('DATABASE_URL is not set.')
  await ensureSchema()
  await p.query(
    'INSERT INTO site_images (name, data, content_type, bytes) VALUES ($1, $2, $3, $4)',
    [name, buffer, contentType, buffer.length],
  )
}

export async function dbGetImage(name) {
  const p = getPool()
  if (!p) return null
  await ensureSchema()
  const { rows } = await p.query('SELECT data, content_type FROM site_images WHERE name = $1', [name])
  return rows.length ? { data: rows[0].data, contentType: rows[0].content_type } : null
}

export async function dbDeleteImages(names) {
  const p = getPool()
  if (!p || !names.length) return
  await ensureSchema()
  await p.query('DELETE FROM site_images WHERE name = ANY($1)', [names])
}

export async function dbListImageNames() {
  const p = getPool()
  if (!p) return []
  await ensureSchema()
  const { rows } = await p.query('SELECT name FROM site_images')
  return rows.map((r) => r.name)
}
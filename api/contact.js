/**
 * Vercel Serverless Function: POST /api/contact
 * Handles contact/inquiry submissions with validation, honeypot, and rate-limit.
 * For local dev, same logic is reused via Vite middleware (see vite.config.ts)
 */
const RATE_LIMIT_WINDOW = 10 * 60 * 1000 // 10 min
const RATE_LIMIT_MAX = 5
const ipMap = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const arr = ipMap.get(ip) || []
  const fresh = arr.filter(t => now - t < RATE_LIMIT_WINDOW)
  if (fresh.length >= RATE_LIMIT_MAX) {
    ipMap.set(ip, fresh)
    return true
  }
  fresh.push(now)
  ipMap.set(ip, fresh)
  return false
}

function validate(body) {
  const errors = {}
  const name = (body.name || '').trim()
  const email = (body.email || '').trim()
  const message = (body.message || '').trim()
  const phone = (body.phone || '').trim()
  const honeypot = (body.website || '').trim()

  if (honeypot) errors._form = 'Spam detected'

  if (name.length < 2) errors.name = 'Nama minimal 2 karakter'
  else if (name.length > 100) errors.name = 'Nama maksimal 100 karakter'

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(email)) errors.email = 'Email tidak valid'

  if (message.length < 10) errors.message = 'Pesan minimal 10 karakter'
  else if (message.length > 2000) errors.message = 'Pesan maksimal 2000 karakter'

  if (phone && !/^\+?[0-9\s\-()]{8,20}$/.test(phone)) errors.phone = 'Nomor WhatsApp tidak valid'

  return { errors, data: { name, email, message, phone, service: (body.service || '').trim() } }
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' })

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ ok: false, error: 'Terlalu banyak permintaan. Coba lagi dalam 10 menit.' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch { body = {} }
  }
  if (!body || typeof body !== 'object') body = {}

  const { errors, data } = validate(body)
  if (Object.keys(errors).length) {
    return res.status(400).json({ ok: false, errors })
  }

  // Persist to file in dev / Vercel tmp (best-effort) + log
  try {
    const fs = await import('node:fs')
    const path = await import('node:path')
    const dir = '/tmp'
    // On Vercel, use /tmp; locally, use data/ if writable
    let targetDir = dir
    try {
      // try project data dir
      const projData = path.resolve(process.cwd(), 'data')
      if (fs.existsSync(projData) || (() => { fs.mkdirSync(projData, { recursive: true }); return true })()) targetDir = projData
    } catch {}
    const file = path.join(targetDir, 'inquiries.json')
    let arr = []
    if (fs.existsSync(file)) {
      try { arr = JSON.parse(fs.readFileSync(file, 'utf8')) } catch { arr = [] }
    }
    arr.push({ ...data, ip, at: new Date().toISOString() })
    // keep last 500
    if (arr.length > 500) arr = arr.slice(-500)
    fs.writeFileSync(file, JSON.stringify(arr, null, 2), 'utf8')
  } catch (e) {
    console.warn('[contact] persist failed', e?.message)
  }
  console.log('[contact]', new Date().toISOString(), ip, data)

  return res.status(200).json({ ok: true, message: 'Pesan terkirim! Kami akan balas via WhatsApp/email dalam 1x24 jam.' })
}

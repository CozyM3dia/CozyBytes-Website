import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

function apiMiddleware() {
  return {
    name: 'cozybytes-api',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (!req.url?.startsWith('/api/')) return next()
        // CORS
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        if (req.method === 'OPTIONS') { res.statusCode = 200; return res.end() }

        if (req.url.startsWith('/api/health')) {
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 200
          return res.end(JSON.stringify({ ok: true, status: 'healthy', timestamp: new Date().toISOString() }))
        }

        if (req.url.startsWith('/api/contact')) {
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.setHeader('Content-Type', 'application/json')
            return res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }))
          }
          let body = ''
          req.on('data', (c: any) => body += c)
          await new Promise<void>(r => req.on('end', () => r()))
          let data: any = {}
          try { data = body ? JSON.parse(body) : {} } catch { data = {} }
          // simple validation duplicate of api/contact.js
          const errors: Record<string,string> = {}
          const name = (data.name||'').trim()
          const email = (data.email||'').trim()
          const message = (data.message||'').trim()
          const phone = (data.phone||'').trim()
          if ((data.website||'').trim()) errors._form = 'Spam detected'
          if (name.length < 2) errors.name = 'Nama minimal 2 karakter'
          const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRe.test(email)) errors.email = 'Email tidak valid'
          if (message.length < 10) errors.message = 'Pesan minimal 10 karakter'
          if (phone && !/^\+?[0-9\s\-()]{8,20}$/.test(phone)) errors.phone = 'Nomor tidak valid'
          if (Object.keys(errors).length) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            return res.end(JSON.stringify({ ok: false, errors }))
          }
          console.log('[api:contact] dev', { name, email, phone, service: data.service })
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          return res.end(JSON.stringify({ ok: true, message: 'Pesan terkirim! Kami akan balas dalam 1x24 jam.' }))
        }
        return next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), apiMiddleware()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    cssMinify: true,
    minify: 'esbuild',
    modulePreload: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'framer'
            if (id.includes('react-markdown') || id.includes('remark') || id.includes('micromark') || id.includes('unified') || id.includes('mdast') || id.includes('hast')) return 'markdown'
            if (id.includes('react-router')) return 'router'
            if (id.includes('lucide-react')) return 'icons'
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-helmet')) return 'react-vendor'
            return 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 60,
  },
})

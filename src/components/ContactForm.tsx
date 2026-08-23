import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm({ serviceDefault = '' }: { serviceDefault?: string }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', service: serviceDefault, website: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [state, setState] = useState<FormState>('idle')
  const [msg, setMsg] = useState('')

  const update = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (form.website) return // honeypot filled -> spam, silently succeed
    setState('loading')
    setErrors({})
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors)
        setMsg(data.error || 'Gagal mengirim. Coba lagi.')
        setState('error')
      } else {
        setMsg(data.message)
        setState('success')
        setForm({ name: '', email: '', phone: '', message: '', service: serviceDefault, website: '' })
      }
    } catch {
      setMsg('Koneksi gagal. Periksa internet atau hubungi via WhatsApp.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center">
        <CheckCircle className="mx-auto h-10 w-10 text-emerald-400" />
        <h3 className="mt-4 font-display text-xl font-medium text-white">Pesan terkirim!</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{msg}</p>
        <button onClick={() => setState('idle')} className="mt-6 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white hover:bg-white/10">Kirim lagi</button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-7">
      <div className="mb-6">
        <h3 className="font-display text-xl font-medium text-white">Kirim pesan</h3>
        <p className="mt-1 text-sm text-white/45">Balasan via WhatsApp/email dalam 1×24 jam. Gratis konsultasi.</p>
      </div>

      {/* honeypot */}
      <input type="text" value={form.website} onChange={e => update('website', e.target.value)} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-4">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50">Nama</label>
          <input id="cf-name" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Budi Santoso" className={`w-full rounded-xl border bg-zinc-900/50 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/10 focus:ring-[#00FFFF]/30'}`} required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} />
          {errors.name && <p id="err-name" className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50">Email</label>
            <input id="cf-email" type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="budi@email.com" className={`w-full rounded-xl border bg-zinc-900/50 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/10 focus:ring-[#00FFFF]/30'}`} required aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined} />
            {errors.email && <p id="err-email" className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="cf-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50">WhatsApp <span className="normal-case tracking-normal text-white/30">(opsional)</span></label>
            <input id="cf-phone" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="0858..." className={`w-full rounded-xl border bg-zinc-900/50 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/10 focus:ring-[#00FFFF]/30'}`} aria-invalid={!!errors.phone} />
            {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="cf-service" className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50">Layanan <span className="normal-case tracking-normal text-white/30">(opsional)</span></label>
          <select id="cf-service" value={form.service} onChange={e => update('service', e.target.value)} className="w-full rounded-xl border border-white/10 bg-zinc-900/50 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/30">
            <option value="">Pilih layanan</option>
            <option value="company-profile">Company Profile</option>
            <option value="landing-page">Landing Page</option>
            <option value="ecommerce">Toko Online</option>
            <option value="uiux">UI/UX Redesign</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div>
          <label htmlFor="cf-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-white/50">Pesan</label>
          <textarea id="cf-message" value={form.message} onChange={e => update('message', e.target.value)} placeholder="Ceritakan kebutuhan website kamu..." rows={4} className={`w-full rounded-xl border bg-zinc-900/50 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 ${errors.message ? 'border-red-500/50 focus:ring-red-500/30' : 'border-white/10 focus:ring-[#00FFFF]/30'}`} required aria-invalid={!!errors.message} aria-describedby={errors.message ? 'err-message' : undefined} />
          {errors.message && <p id="err-message" className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
        </div>
      </div>

      <AnimatePresence>
        {state === 'error' && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" /> <span>{msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <button type="submit" disabled={state === 'loading'} className="btn-primary mt-6 w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
        {state === 'loading' ? <><Loader2 className="h-4 w-4 animate-spin" /> Mengirim...</> : <><Send className="h-4 w-4" /> Kirim Pesan</>}
      </button>
      <p className="mt-3 text-center text-xs text-white/30">Atau langsung <a href="https://wa.me/6285894514719" target="_blank" rel="noopener noreferrer" className="text-[#00FFFF] hover:underline">chat WhatsApp</a></p>
    </form>
  )
}

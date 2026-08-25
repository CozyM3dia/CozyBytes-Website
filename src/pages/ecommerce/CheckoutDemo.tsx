import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BadgeCheck, Check, Mail, MessageCircle } from 'lucide-react'
import {
  CART_SUBTOTAL,
  ORDER_ID,
  VA_NUMBER,
  cartItem,
  couriers,
  orderStates,
  orderToasts,
  payMethods,
} from './data'
import type { CourierId, PayMethodId } from './data'
import { EASE } from './data'

const rupiah = (n: number) => `Rp ${n.toLocaleString('id-ID')}`

/* ================================================================== *
 * Toast — notifikasi otomatis pasca-pembayaran.
 * role="status" + aria-live supaya perubahan ini diumumkan ke screen
 * reader; dulu muncul diam-diam dan memakai teks 6–8px.
 * ================================================================== */

function Toast({ toast, index }: { toast: (typeof orderToasts)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.45, delay: index * 0.5, ease: EASE }}
      className="pointer-events-auto flex w-64 items-start gap-2.5 rounded-xl border border-white/[0.1] bg-[#101014]/95 p-3 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-sm"
    >
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00FFFF]/12 text-[#00FFFF]">
        {toast.id === 'wa' ? (
          <MessageCircle className="h-3.5 w-3.5" />
        ) : (
          <Mail className="h-3.5 w-3.5" />
        )}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[11px] font-semibold text-white/85">
          {toast.title}
        </span>
        <span className="mt-0.5 block text-[11px] leading-snug text-white/50">{toast.body}</span>
      </span>
    </motion.div>
  )
}

/* ================================================================== *
 * ChoiceGroup — pasrah tombol toggle berlabel.
 * Semantics "group + aria-pressed" dipilih daripada radiogroup karena
 * tanpa manajemen fokus panah, role="radio" justru menjanjikan pola
 * keyboard yang tidak dijalankan. aria-pressed diumumkan apa adanya.
 * ================================================================== */

function ChoiceGroup<T extends string>({
  labelId,
  label,
  options,
  value,
  onChange,
}: {
  labelId: string
  label: string
  options: { id: T; label: string }[]
  value: T
  onChange: (id: T) => void
}) {
  return (
    <div>
      <span id={labelId} className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
        {label}
      </span>
      <div role="group" aria-labelledby={labelId} className="mt-2 grid grid-cols-2 gap-2">
        {options.map((opt) => {
          const on = value === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(opt.id)}
              className={`flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-[11px] font-semibold transition-colors ${
                on
                  ? 'border-[#00FFFF]/45 bg-[#00FFFF]/10 text-[#00FFFF]'
                  : 'border-white/[0.09] text-white/55 hover:border-white/20 hover:text-white/80'
              }`}
            >
              {on && <Check className="h-3 w-3" strokeWidth={3} aria-hidden />}
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ================================================================== *
 * CheckoutDemo — struk interaktif.
 *
 * Motif halaman ini: kuitansi. Angka memakai tabular-nums, pemisah
 * garis putus-putus seperti struk fisik, dan stepper status pesanan
 * (Menunggu → Terbayar → Dikirim) di kepala panel. Panel memakai
 * tingkat teks ≥11px — versi lama memeras 7 baris konten ke
 * aspect-[4/3] sehingga tombol utamanya hanya 10px.
 * ================================================================== */

export default function CheckoutDemo() {
  const [courier, setCourier] = useState<CourierId>('jnt')
  const [payMethod, setPayMethod] = useState<PayMethodId>('qris')
  const [paid, setPaid] = useState(false)
  // Toast dianggap "kedaluwarsa" 6 detik setelah pembayaran; reset dilakukan
  // di event handler (bukan di effect) supaya tidak ada setState sinkron
  // yang memicu render berantai.
  const [toastsExpired, setToastsExpired] = useState(false)

  const shipping = couriers.find((c) => c.id === courier)?.cost ?? 0
  const total = CART_SUBTOTAL + shipping
  const payDisplay = payMethods.find((p) => p.id === payMethod)?.display ?? ''
  const stateIndex = paid ? 1 : 0

  const restart = () => {
    setPaid(false)
    setToastsExpired(false)
  }

  // Toast hanya relevan selama status "Terbayar".
  useEffect(() => {
    if (!paid) return
    const hide = window.setTimeout(() => setToastsExpired(true), 6000)
    return () => window.clearTimeout(hide)
  }, [paid])

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[#00FFFF]/[0.05] blur-3xl"
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b0b0e]/92 shadow-[0_40px_90px_-24px_rgba(0,0,0,0.85)] backdrop-blur-sm">
        {/* Kepala struk: id pesanan + stepper status */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-white/[0.07] bg-black/40 px-5 py-3.5">
          <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
            Order {ORDER_ID}
          </span>
          <ol className="flex items-center gap-1.5">
            {orderStates.map((state, i) => (
              <li key={state} className="flex items-center gap-1.5">
                <span
                  aria-current={i === stateIndex ? 'step' : undefined}
                  className={`rounded-full border px-2 py-0.5 font-mono text-[11px] transition-colors ${
                    i <= stateIndex
                      ? 'border-[#00FFFF]/40 bg-[#00FFFF]/10 text-[#00FFFF]'
                      : 'border-white/[0.08] text-white/30'
                  }`}
                >
                  {state}
                </span>
                {i < orderStates.length - 1 && (
                  <span aria-hidden className="h-px w-2 bg-white/15" />
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="relative px-5 py-5 md:px-6">
          {/* Notifikasi otomatis — diumumkan ke screen reader */}
          <div
            role="status"
            aria-live="polite"
            className="pointer-events-none absolute right-4 top-4 z-20 flex flex-col gap-2"
          >
            <AnimatePresence>
              {paid &&
                !toastsExpired &&
                orderToasts.map((toast, i) => <Toast key={toast.id} toast={toast} index={i} />)}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {paid ? (
              /* ---------- Panel sukses ---------- */
              <motion.div
                key="success"
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex min-h-[300px] flex-col items-center justify-center py-6 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00FFFF]/12">
                  <BadgeCheck className="h-7 w-7 text-[#00FFFF]" strokeWidth={1.75} />
                </span>
                <p className="mt-5 font-display text-xl font-medium tracking-tight text-white">
                  Pembayaran Berhasil!
                </p>
                <p className="mt-2.5 max-w-xs text-[13px] leading-relaxed text-white/50">
                  Sistem payment gateway otomatis mendeteksi transaksi Anda. Notifikasi konfirmasi
                  dan resi telah otomatis dikirim ke nomor WhatsApp pembeli.
                </p>
                <button
                  type="button"
                  onClick={restart}
                  className="mt-6 rounded-full border border-white/[0.12] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/65 transition-colors hover:border-[#00FFFF]/35 hover:text-white"
                >
                  Ulangi Simulasi
                </button>
              </motion.div>
            ) : (
              /* ---------- Struk ---------- */
              <motion.div
                key="cart"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <p className="font-display text-lg font-medium tracking-tight text-white">
                  Ringkasan Pembayaran
                </p>

                {/* Baris item */}
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00FFFF]/10 font-mono text-[11px] font-bold text-[#00FFFF]"
                  >
                    ITEM
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-semibold text-white/85">
                      {cartItem.name}
                    </span>
                    <span className="block text-[11px] text-white/45">{cartItem.variant}</span>
                  </span>
                </div>

                {/* Rincian angka — garis putus-putus ala struk */}
                <dl className="mt-4 space-y-2.5 font-mono text-[12px]">
                  {[
                    ['Subtotal', rupiah(CART_SUBTOTAL)],
                    [`Ongkos Kirim (${courier.toUpperCase()})`, rupiah(shipping)],
                  ].map(([term, value]) => (
                    <div key={term} className="flex items-baseline gap-2">
                      <dt className="shrink-0 text-white/45">{term}</dt>
                      <span aria-hidden className="flex-1 border-b border-dotted border-white/15" />
                      <dd className="tabular-nums text-white/75">{value}</dd>
                    </div>
                  ))}
                  <div className="flex items-baseline gap-2 pt-1 text-[13px]">
                    <dt className="shrink-0 font-semibold text-white">Total Pembayaran</dt>
                    <span aria-hidden className="flex-1 border-b border-dotted border-white/15" />
                    <dd className="tabular-nums font-semibold text-[#00FFFF]">{rupiah(total)}</dd>
                  </div>
                </dl>

                {/* Metode bayar */}
                <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-3">
                  <span className="text-[11px] text-white/45">Metode Pembayaran</span>
                  <span className="text-right">
                    <span className="block text-[12px] font-semibold text-white/85">
                      {payDisplay}
                    </span>
                    {payMethod === 'va' && (
                      <span className="block font-mono text-[12px] tabular-nums tracking-[0.14em] text-white/55">
                        {VA_NUMBER}
                      </span>
                    )}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setPaid(true)}
                  className="group relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#00FFFF] px-5 py-3.5 text-[13px] font-bold text-black shadow-[0_0_30px_rgba(0,255,255,0.24)] transition-shadow hover:shadow-[0_0_46px_rgba(0,255,255,0.38)]"
                >
                  Simulasikan Pembayaran Berhasil
                  <span
                    aria-hidden
                    className="absolute inset-y-0 -left-full w-1/3 bg-white/50 group-hover:[animation:sheen_0.9s_ease-out]"
                  />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Kontrol simulator */}
        <div className="grid gap-4 border-t border-white/[0.07] bg-black/35 px-5 py-4 sm:grid-cols-2 md:px-6">
          <ChoiceGroup
            labelId="demo-courier-label"
            label="Kurir (RajaOngkir)"
            options={couriers}
            value={courier}
            onChange={(id) => {
              setCourier(id)
              restart()
            }}
          />
          <ChoiceGroup
            labelId="demo-pay-label"
            label="Metode Pembayaran"
            options={payMethods}
            value={payMethod}
            onChange={(id) => {
              setPayMethod(id)
              restart()
            }}
          />
        </div>
      </div>

      <p className="mt-3.5 text-[11px] leading-relaxed text-white/50">
        Ilustrasi alur checkout, bukan toko yang sedang berjalan.
      </p>
    </div>
  )
}

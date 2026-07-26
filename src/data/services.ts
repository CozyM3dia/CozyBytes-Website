/**
 * Satu sumber kebenaran untuk daftar layanan yang PUNYA halaman sendiri.
 *
 * Sebelum ini daftarnya diulang di Navbar (desktop dropdown + menu mobile) dan
 * tidak ada di tempat lain, sehingga tidak satu pun halaman hasil prerender
 * memuat link internal ke /layanan/*. Navbar, Footer, dan halaman hub sekarang
 * membaca dari sini supaya tidak bisa lagi saling menyimpang.
 *
 * Catatan: ServicesSection di homepage menampilkan lima item, termasuk
 * "Custom Website" yang belum punya halaman. Item itu sengaja tidak ada di sini
 * karena daftar ini khusus untuk rute yang benar-benar ada.
 */

export type Service = {
  /** Path absolut, harus cocok dengan rute di AppRoutes dan STATIC_ROUTES di scripts/prerender.mjs */
  href: string
  label: string
  desc: string
}

export const SERVICES: Service[] = [
  {
    href: '/layanan/website',
    label: 'Company Profile',
    desc: 'Tampilan profesional bisnis Anda',
  },
  {
    href: '/layanan/landing-page',
    label: 'Landing Page',
    desc: 'Konversi tinggi untuk iklan',
  },
  {
    href: '/layanan/ecommerce',
    label: 'E-Commerce',
    desc: 'Toko online mudah dikelola',
  },
  {
    href: '/layanan/uiux',
    label: 'UI/UX Design',
    desc: 'Desain modern & user-friendly',
  },
]

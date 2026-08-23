export const EASE = [0.22, 1, 0.36, 1] as unknown as [number, number, number, number]
export const SPRING = { stiffness: 120, damping: 18, mass: 0.6 }

export interface TeamMember {
  role: string
  name: string
  image: string
  owns: string
  desc: string
}

export const teamMembers: TeamMember[] = [
  {
    role: 'Founder',
    name: 'Sibgha Alfirdausi Rambe',
    image: '/team/sibgha-alfirdausi-rambe.jpg',
    owns: 'Visi & Kreatif',
    desc: 'Mengarahkan visi Cozybytes Media, menjaga standar kreatif, dan memastikan setiap proyek terasa strategis untuk bisnis klien.',
  },
  {
    role: 'Co-Founder',
    name: 'Ubaidillah Rafi Ussalam',
    image: '/team/ubaidillah-rafi-ussalam.jpg',
    owns: 'Outreach & Marketing',
    desc: 'Menangani research, sales, marketing, dan outreach agar solusi Cozybytes tepat sasaran dan dekat dengan kebutuhan pasar.',
  },
  {
    role: 'Co-Founder',
    name: 'Hanan Ghaffari',
    image: '/team/hanan-ghaffari.jpg',
    owns: 'Technology',
    desc: 'Memimpin sisi teknis, engineering, dan implementasi website supaya desain yang rapi juga kuat, cepat, dan stabil.',
  },
]

export interface Value {
  title: string
  desc: string
}

export const values: Value[] = [
  {
    title: 'Personal & Intim',
    desc: 'Karena kami tim kecil, komunikasi jauh lebih luwes. Kami dengar cerita bisnismu seperti partner, bukan sekadar vendor.',
  },
  {
    title: 'Kualitas Premium',
    desc: 'Ukuran tim tidak membatasi standar. Setiap baris kode dan setiap piksel dikerjakan dengan estetika tertinggi.',
  },
  {
    title: 'Fokus pada Hasil',
    desc: 'Desain cantik percuma tanpa konversi. Tiap halaman dioptimasi untuk SEO dan psikologi pengguna.',
  },
]
